import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { adultState, defaultCheckInState, defaultCheckOutState, defaultLat, defaultLng, defaultMap, defaultZoom, hotelDataState, mapSlideIndexState, mediaState, modalState } from "../../recoil";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import useHotelDetail from "../Hook/useHotelDetail";
import './DetailView.css'
import MainFinder from "../Main/MainFinder";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
const DetailView: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();


    const [handleVisible, setHandleVisible] = useState<string[]>(['01', '02', '03']);
    const [pMore, setPMore] = useState<boolean>(false)
    const [popupId, setPopupId] = useState<string | null>(null)
    const [fixed, setFixed] = useState<boolean>(false)

    const [map, setMap] = useRecoilState<boolean>(defaultMap)
    const [modal, setModal] = useRecoilState(modalState)
    const setLat = useSetRecoilState<number>(defaultLat)
    const setLng = useSetRecoilState<number>(defaultLng)
    const setZoom = useSetRecoilState<number>(defaultZoom)
    const setSlideIndex = useSetRecoilState<number>(mapSlideIndexState)
    const adult = useRecoilValue<number>(adultState)

    const hotelData = useRecoilValue(hotelDataState);
    const checkIn = useRecoilValue<Date | null>(defaultCheckInState)
    const checkOut = useRecoilValue<Date | null | string>(defaultCheckOutState)
    const media = useRecoilValue(mediaState)

    // state

    const { hotelDetail, error } = useHotelDetail();
    // hook

    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    const hotel = hotelData.find(h => h.hotelId === query);
    const hotelDetails = hotelDetail.find(data => data.hotelId === query);
    const roomSection = useRef<HTMLDivElement>(null)
    // data

    const handleScroll = () => {
        if (roomSection) {
            const roomRect = roomSection.current?.getBoundingClientRect();
            if (roomRect) {
                const roomOffset = window.pageYOffset + roomRect.top - 20
                window.scrollTo({
                    top: roomOffset,
                    behavior: 'smooth'
                })
            }
        }
    } // 객실 선택 까지 스크롤

    const toggleVisible = (roomId: string) => {
        setHandleVisible(prevId =>
            prevId.includes(roomId) ? prevId.filter(id => id !== roomId) : [...prevId, roomId]
        )
    } // 더보기 버튼

    const priceNumber = (value: number) => {
        return new Intl.NumberFormat('ko-KR', {
            maximumFractionDigits: 0, // 소수점 최대 자릿수
            minimumFractionDigits: 0, // 소수점 최소 자릿수
        }).format(value);
    } // 가격

    const reserveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const roomId = event.currentTarget.getAttribute('data-room-id')
        const onlinepay = event.currentTarget.getAttribute('data-onlinepay') === 'true' ? 1 : 0;
        const breakfast = event.currentTarget.getAttribute('data-break') === 'true' ? 1 : 0;

        const thisRoom = hotelDetails?.hotelRoom.find(h => h.roomId === roomId)

        if (roomId && thisRoom) {
            const roomCapacity = parseInt(thisRoom.roomCapacity, 10)
            if (roomCapacity < adult) {
                alert(`해당 객실은 ${roomCapacity}인 객실입니다.`)
            } else {
                navigate(`/reserve?query=${query}_${roomId}&breakfast=${breakfast}&onlinepay=${onlinepay}`)
                setModal(false)
            }
        }
    } // 예약 화면 이동

    const pMoreToggle = () => {
        setPMore((prev) => !prev)
    } // 설명 더보기

    const popupHandle = (id: string) => {
        setPopupId(prevId => (prevId === id ? null : id))
        setModal((prev) => !prev)
    } // 모달창

    const formatDate = (date: Date | string | null) => {
        if (typeof date === 'string') return date;
        if (!date) return;
        return `${String(date.getMonth() + 1)}월 ${String(date.getDate())}일`
    } // 날짜 

    const handleUndoBtn = () => {
        navigate(-1)
    } // 뒤로가기

    useEffect(() => {
        const scrolledTop = () => {
            const currentY = window.scrollY
            const mainY = 260
            const topP = document.querySelector('.mb_detail_top_nav p') as HTMLElement
            const topSpan = document.querySelector('.mb_detail_top_nav span') as HTMLElement
            const topRight = document.querySelector('.detail_header .nav_box') as HTMLElement
            const topRightSvg = document.querySelector('.detail_header .cls-2') as HTMLElement
            if (topP && topSpan && topRight && topRightSvg) {
                if (mainY <= currentY) {
                    setFixed(true)
                } else {
                    setFixed(false)
                }

                if (currentY >= 280) {
                    topP.style.opacity = '1'
                    topP.style.marginTop = '10px'
                    topRight.style.background = 'transparent'
                    topRightSvg.style.stroke = '#191919'

                } else {
                    topP.style.cssText = ''
                    topRight.style.cssText = ''
                    topRightSvg.style.cssText = ''
                }

                if (currentY >= 520) {
                    topSpan.style.opacity = '1'
                    topSpan.style.marginTop = '0px'
                    topP.style.marginTop = '0px'
                } else {
                    topSpan.style.cssText = ''
                }
            }

        }
        document.addEventListener('scroll', scrolledTop)

        return () => {
            document.removeEventListener('scroll', scrolledTop)
        }
    }, [])
    // 스크롤 스타일


    const goMap = () => {
        if (hotel) {
            setLat(hotel?.lat - 0.005)
            setLng(hotel?.lng + 0.0015)
            setZoom(15)
            setSlideIndex(parseInt(hotel?.hotelId, 10) - 1)
        }
        setMap((prev) => !prev)
        setModal(false)
        navigate('/search?query=map')
    }
    return (
        <div className="detail_wrap">
            {media < 2 &&
                <div className={`mb_detail_top_nav ${fixed && 'onFixed'}`}>
                    {hotel && <>
                        <p>{hotel.title}</p>
                        <span>{formatDate(checkIn)} ~ {formatDate(checkOut)}</span>
                        <button className="detail_undo_btn" onClick={handleUndoBtn}>
                            <svg viewBox="-2 -3 24 24" className="detail_undo_svg">
                                <g id="prevIcon" data-name="prevIcon"><g id="prev" data-name="prev">
                                    <rect className="cls-1" width="18" height="18" />
                                    <polyline className="cls-2" points="11.57 3.87 6.43 9 11.56 14.13" />
                                </g></g>
                            </svg>
                        </button>
                    </>}
                </div>
            }

            {hotelDetails && hotelDetails.hotelRoom.map((room, roomIndex) => (
                popupId === room.roomId &&
                (<div key={roomIndex} className={`room_popup_box_${room.roomId}`}>
                    <div className="room_popup_bg" onClick={() => popupHandle('')}></div>
                    <div className="room_popup_wrap">
                        <div className="room_popup_cont">
                            {media < 2 ?
                                <Swiper pagination={true} modules={[Pagination]} className="room_popup_img_wrap">
                                    {room.roomImg && room.roomImg.map((mbRoomImg, mbRoomIndex) => (
                                        <SwiperSlide key={mbRoomIndex}>
                                            <div className="room_popup_img" style={{ backgroundImage: `url(${mbRoomImg})` }}>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                :
                                <div className="room_popup_img">
                                    {room.roomImg && room.roomImg.map((roomImg, roomImgIndex) => (
                                        <img key={roomImgIndex} src={roomImg} alt={room.roomTitle}></img>
                                    ))}
                                </div>
                            }
                            <div key={roomIndex} className="room_popup_info">
                                {room.roomDetail && room.roomDetail.map((roomDetail, roomDetailIndex) => (
                                    <div key={roomDetailIndex} className="room_popup_info_box">
                                        <div className="room_more_main room_more">
                                            <p>{room.roomTitle}</p>
                                            <div>
                                                {roomDetail.roomDetailMain.map((popupDetail, popupDetailIndex) => (
                                                    <div key={popupDetailIndex}>
                                                        <div className="detail_icon" style={{ backgroundImage: `url(${popupDetail.imgUrl})` }}></div>
                                                        <span>{popupDetail.title}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="room_more_toiletries room_more">
                                            <p>세면도구</p>
                                            <div>
                                                {roomDetail.roomToiletries.map((popupToilet, popupToiletIndex) => (
                                                    <div key={popupToiletIndex}>
                                                        <div className="detail_icon" style={{ backgroundImage: `url(${popupToilet.imgUrl})` }}></div>
                                                        <span>{popupToilet.title}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="room_more_cleaning room_more">
                                            <p>객실 청소</p>
                                            <div>
                                                <div>
                                                    <div className="detail_icon" style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/8624b990-f132-4195-b44d-e2286eb84df7")' }}></div>
                                                    <span>{roomDetail.roomCleaning}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="room_more_disability room_more">
                                            <p>장애인 편의시설</p>
                                            <div>
                                                {roomDetail.roomFacilityDisability.map((popupDisability, popupDisabilityIndex) => (
                                                    <div>
                                                        <div key={popupDisabilityIndex} className="detail_icon" style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/8624b990-f132-4195-b44d-e2286eb84df7")' }}></div>
                                                        <span >{popupDisability}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="room_more_rayout room_more">
                                            <p>객실 레이아웃</p>
                                            <div>
                                                {roomDetail.roomRayout.map((popupRayout, popupRayoutIndex) => (
                                                    <div key={popupRayoutIndex}>
                                                        <div className="detail_icon" style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/8624b990-f132-4195-b44d-e2286eb84df7")' }}></div>
                                                        <span>{popupRayout}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="room_more_device room_more">
                                            <p>객실 기기</p>
                                            <div>
                                                {roomDetail.roomDevice.map((popupDevice, popupDeviceIndex) => (
                                                    <div key={popupDeviceIndex}>
                                                        <div className="detail_icon" style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/8624b990-f132-4195-b44d-e2286eb84df7")' }}></div>
                                                        <span >{popupDevice}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="room_more_food room_more">
                                            <p>객실 식사 & 음료</p>
                                            <div>
                                                {roomDetail.roomFood.map((popupFood, popupFoodIndex) => (
                                                    <div key={popupFoodIndex}>
                                                        <div className="detail_icon" style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/8624b990-f132-4195-b44d-e2286eb84df7")' }}></div>
                                                        <span >{popupFood}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="room_more_bathroom room_more">
                                            <p>욕실 시설</p>
                                            <div>
                                                {roomDetail.roomBathroom.map((popupBathroom, popupBathroomIndex) => (
                                                    <div key={popupBathroomIndex}>
                                                        <div className="detail_icon" style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/8624b990-f132-4195-b44d-e2286eb84df7")' }}></div>
                                                        <span >{popupBathroom}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="room_more_facility room_more">
                                            <p>객실 시설</p>
                                            <div>
                                                {roomDetail.roomFacility.map((popupFacility, popupFacilityIndex) => (
                                                    <div key={popupFacilityIndex}>
                                                        <div className="detail_icon" style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/8624b990-f132-4195-b44d-e2286eb84df7")' }}></div>
                                                        <span >{popupFacility}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="room_more_child">
                                            <p>어린이 정책</p>
                                            <div className="room_child_info">
                                                <div>
                                                    <div className="room_child_icon" style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/84828adf-63bf-49f9-84e3-04966d271420")' }}></div>
                                                    <span>모든 연령의 어린이 투숙 가능 호텔입니다.</span>
                                                </div>
                                                <p>검색 기준에 정확한 어린이 인원수와 나이를 추가하면, 적합한 객실 유형을 안내해 드리겠습니다</p>
                                            </div>
                                            <div className="room_child_bed">
                                                <p>유아용 침대 및 엑스트라 베드</p>
                                                {!roomDetail.roomChild ? <span className="child_bed_off">유아용 침대 및 침대 추가 요청이 불가능한 객실 유형입니다</span> : <span className="child_bed_on">유아용 침대 및 침대 추가 요청이 가능한 객실 유형입니다</span>}
                                            </div>
                                        </div>
                                        <div className="room_more_info">
                                            <p>객실 정보</p>
                                            <span>기준 인원을 초과하는 경우, 추가 요금이 발생합니다. 이 요금은 도착 시 숙소에서 직접 결제해 주셔야 합니다. 기재된 요금은 기준 인원에 적용되며, 최대 허용 인원수로 예약할 경우에도 숙소에서 추가 인원에 대한 추가 요금이 발생할 수 있습니다. 객실의 최대 인원(영유아 포함) 초과는 엄격히 금지됩니다.</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className="room_popup_close" onClick={() => popupHandle('')} style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/bdc11b7c-1801-45da-8939-f1ae58eb3342")' }}></button>
                    </div>
                </div>)
            ))
            }
            {media < 2 &&
                <Swiper pagination={true} modules={[Pagination]} className="mb_top_img">
                    {hotelDetails && hotelDetails.hotelImg.map((mbImg, mbImgIndex) => (
                        <SwiperSlide key={mbImgIndex}>
                            <div className="detail_img" style={{ backgroundImage: `url(${mbImg})` }}>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            }
            <div className="detail_cont">
                {hotel ? (
                    <>
                        <div className="hotel_detail_top">
                            <div className="hotel_detail_top_left">
                                <div className="hotel_detail_title">
                                    <p>{hotel.title}</p>
                                    <div className="hotel_grade">
                                        {hotel.grade === '2' ?
                                            <>
                                                <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                            </>
                                            : hotel.grade === '3' ?
                                                <>
                                                    <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                    <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                    <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                </>
                                                : hotel.grade === '4' ?
                                                    <>
                                                        <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                        <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                        <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                        <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                    </>
                                                    : hotel.grade === '5' ?
                                                        <>
                                                            <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                            <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                            <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                            <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                            <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                        </>
                                                        : <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>}
                                    </div>
                                </div>
                                <div className="hotel_detail_region">
                                    <div className="hotel_region_img" style={{ backgroundImage: "url('https://github.com/user-attachments/assets/b7a9fa5d-e126-47b2-835f-ae85545dbd2b')" }}></div>
                                    <p>{hotel.region[0]} · {hotel.region[1]}</p>
                                    <span onClick={goMap}>지도에서 호텔보기</span>
                                </div>

                            </div>
                            <div className="hotel_detail_top_right">
                                <div className="hotel_detail_price">
                                    <p>{priceNumber(hotel.price)}원</p>
                                </div>
                                <button className="hotel_roomSelect_btn" onClick={handleScroll}>객실 선택</button>
                            </div>
                            <div className="hotel_detail">
                                <p className={`${pMore ? 'p_more' : ''}`}>{hotelDetails && hotelDetails.hotelDetail.join(',')}</p>
                                <button className='detail_more_btn' onClick={pMoreToggle}>{!pMore ? '더 보기' : '숨기기'}</button>
                            </div>
                            {media > 1 ? <div className="hotel_detail_img">
                                {hotelDetails && (
                                    <div className="detail_img">
                                        <img src={hotelDetails.hotelImg[0]} alt={`Hotel_${hotel.hotelId}_Image 0`} />
                                    </div>
                                )}
                                <div className="detail_img_right">
                                    {hotelDetails && hotelDetails.hotelImg.slice(1).map((imgUrl, index) => (
                                        <div className="detail_img" key={index}>
                                            <img src={imgUrl} alt={`Hotel ${hotel.hotelId} Image ${index}`} />
                                        </div>
                                    ))}
                                </div>
                            </div> : null}

                        </div>
                        {/* top */}
                        <MainFinder />
                        <div className="hotel_detail_center">
                            <div className="hotel_point">
                                <span>이 숙소의 포인트</span>
                                <div>
                                    {hotelDetails?.hotelPoint.map((point, pointIndex) => (
                                        <div className="hotel_point_box" key={pointIndex}>
                                            <div className="point_icon" style={{ backgroundImage: `url(${point.imgUrl})` }}></div>
                                            <p>{point.title}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="hotel_facility">
                                <span>이 숙소의 시설</span>
                                <div>
                                    {hotelDetails?.hotelFacility.map((facility, facilityIndex) => (
                                        <div className="hotel_facility_box" key={facilityIndex}>
                                            <div className="facility_icon" style={{ backgroundImage: `url(${facility.imgUrl})` }}></div>
                                            <p>{facility.title}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* center */}
                        <div ref={roomSection} className="hotel_detail_bottom">
                            {hotelDetails && hotelDetails.hotelRoom.map((room, index) => (
                                <div key={index} className="hotel_detail_room">
                                    <div className="hotel_room">
                                        <div className="room_box">
                                            <div className="room_box_left">
                                                <p>{room.roomTitle}</p>
                                                <div className="room_box_cont" popup-id={room.roomId} onClick={() => popupHandle(room.roomId)}>
                                                    <img src={room.roomImg[0]} alt={room.roomTitle}></img>
                                                    <img src={room.roomImg[1]} alt={room.roomTitle}></img>
                                                    <div className="room_length_box">
                                                        <div className="room_length_icon"></div>
                                                        <span>{room.roomImg.length}</span>
                                                    </div>
                                                </div>
                                                {room.roomDetail && room.roomDetail.map((roomD, detailIndex) => (
                                                    <div key={detailIndex} className="room_detail_main">
                                                        {room.roomDetail && roomD.roomDetailMain.map((detailMain, detailImgIndex) => (
                                                            <div className="detail_main_box">
                                                                <div className="detail_icon" style={{ backgroundImage: `url(${detailMain.imgUrl})` }}></div>
                                                                <p key={detailImgIndex}>{detailMain.title}</p>
                                                            </div>
                                                        ))}
                                                        <button className="detail_main_btn" onClick={() => popupHandle(room.roomId)}>객실 정보</button>
                                                    </div>
                                                ))}
                                            </div>

                                            {media < 2 ?
                                                <div className="room_box_right">
                                                    <div className="room_list_wrap">
                                                        <div data-room-id={room.roomId} className="room_list">
                                                            <div>
                                                                <div className="room_capacity">
                                                                    <p>성인 {room.roomCapacity}명 요금</p>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="room_options">
                                                                    <div className="room_repund">
                                                                        {room.roomRepund ? <p>환불 가능</p> : <p>환불 불가</p>}
                                                                    </div>
                                                                    <div className="room_breakfast">
                                                                        {!room.roomBreakfast ? <p className="break_yes">조식 2인 포함</p> : <p className="break_no">조식 22,000원 (선택 사항)</p>}
                                                                    </div>
                                                                    <div className="room_onlinepay">
                                                                        {room.roomOnlinePay ? <p>온라인 사전 결제</p> : <p>호텔 결제</p>}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <div className="room_reservation">
                                                                    <div>
                                                                        {
                                                                            room.roomId === '02' ? (
                                                                                <p>{priceNumber((room.roomPrice * hotel.price * (parseInt(room.roomCapacity, 10) * 0.4)))}원</p>
                                                                            )
                                                                                : room.roomId === '03' ? (
                                                                                    <p>{priceNumber(room.roomPrice * hotel.price * (parseInt(room.roomCapacity, 10) * 0.35))}원</p>
                                                                                ) : (
                                                                                    <p>{priceNumber(room.roomPrice * hotel.price)}원</p>
                                                                                )
                                                                        }
                                                                        <span>세금 포함</span>
                                                                    </div>
                                                                    <button className='room_reservation_btn' data-room-id={room.roomId} data-break={!room.roomBreakfast} data-onlinepay={room.roomOnlinePay} onClick={reserveClick}>예약</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div data-room-id={room.roomId} className="room_list">
                                                            <div>
                                                                <div className="room_capacity">
                                                                    <p>성인 {room.roomCapacity}명 요금</p>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="room_options">
                                                                    <div className="room_repund">
                                                                        {room.roomRepund ? <p>환불 가능</p> : <p>환불 불가</p>}
                                                                    </div>
                                                                    <div className="room_breakfast">
                                                                        {room.roomBreakfast ? <p className="break_yes">조식 2인 포함</p> : <p className="break_no">조식 22,000원 (선택 사항)</p>}
                                                                    </div>
                                                                    <div className="room_onlinepay">
                                                                        {room.roomOnlinePay ? <p>온라인 사전 결제</p> : <p>호텔 결제</p>}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <div className="room_reservation">
                                                                    <div>
                                                                        {
                                                                            room.roomId === '02' ? (
                                                                                <p>{priceNumber(((room.roomPrice * hotel.price * (parseInt(room.roomCapacity, 10) * 0.4) + 22000)))}원</p>
                                                                            )
                                                                                : room.roomId === '03' ? (
                                                                                    <p>{priceNumber((room.roomPrice * hotel.price * (parseInt(room.roomCapacity, 10) * 0.35) + 22000))}원</p>
                                                                                ) : (
                                                                                    <p>{priceNumber(room.roomPrice * hotel.price + 22000)}원</p>
                                                                                )
                                                                        }
                                                                        <span>세금 포함</span>
                                                                    </div>
                                                                    <button className='room_reservation_btn' data-room-id={room.roomId} data-break={!room.roomBreakfast} data-onlinepay={room.roomOnlinePay} onClick={reserveClick}>예약</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={`room_list room_reservation_more ${handleVisible.includes(room.roomId) ? 'invisible' : ''}`}
                                                            data-room-id={room.roomId}>
                                                            <div>
                                                                <div className="room_capacity">
                                                                    <p>성인 {room.roomCapacity}명 요금</p>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="room_options">
                                                                    <div className="room_repund">
                                                                        {room.roomRepund ? <p>환불 가능</p> : <p>환불 불가</p>}
                                                                    </div>
                                                                    <div className="room_breakfast">
                                                                        {!room.roomBreakfast ? <p className="breck_yes">조식 2인 포함</p> : <p className="breck_no">조식 22,000원 (선택 사항)</p>}
                                                                    </div>
                                                                    <div className="room_onlinepay">
                                                                        {!room.roomOnlinePay ? <p>온라인 사전 결제</p> : <p>호텔 결제</p>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="room_reservation">
                                                                    <div>
                                                                        {
                                                                            room.roomId === '02' ? (
                                                                                <p>{priceNumber((room.roomPrice * hotel.price) * 1.20 * (parseInt(room.roomCapacity, 10) * 0.35))}원</p>
                                                                            )
                                                                                : room.roomId === '03' ? (
                                                                                    <p>{priceNumber((room.roomPrice * hotel.price) * 1.20 * (parseInt(room.roomCapacity, 10) * 0.35))}원</p>
                                                                                ) : (
                                                                                    <p>{priceNumber((room.roomPrice * hotel.price) * 1.20)}원</p>
                                                                                )
                                                                        }
                                                                        <span>세금 포함</span>
                                                                    </div>
                                                                    <button className="room_reservation_btn" data-room-id={room.roomId} data-break={!room.roomBreakfast} data-onlinepay={!room.roomOnlinePay} onClick={reserveClick}>예약</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={`room_list room_reservation_more ${handleVisible.includes(room.roomId) ? 'invisible' : ''}`}
                                                            data-room-id={room.roomId}>
                                                            <div>
                                                                <div className="room_capacity">
                                                                    <p>성인 {room.roomCapacity}명 요금</p>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="room_options">
                                                                    <div className="room_repund">
                                                                        {room.roomRepund ? <p>환불 가능</p> : <p>환불 불가</p>}
                                                                    </div>
                                                                    <div className="room_breakfast">
                                                                        {room.roomBreakfast ? <p className="break_yes">조식 2인 포함</p> : <p className="break_no">조식 22,000원 (선택 사항)</p>}
                                                                    </div>
                                                                    <div className="room_onlinepay">
                                                                        {!room.roomOnlinePay ? <p>온라인 사전 결제</p> : <p>호텔 결제</p>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="room_reservation">
                                                                    <div>
                                                                        {
                                                                            room.roomId === '02' ? (
                                                                                <p>{priceNumber(((room.roomPrice * hotel.price) * 1.20 * (parseInt(room.roomCapacity, 10) * 0.35) + 22000))}원</p>
                                                                            )
                                                                                : room.roomId === '03' ? (
                                                                                    <p>{priceNumber(((room.roomPrice * hotel.price) * 1.20 * (parseInt(room.roomCapacity, 10) * 0.35) + 22000))}원</p>
                                                                                ) : (
                                                                                    <p>{priceNumber((room.roomPrice * hotel.price) * 1.20 + 22000)}원</p>
                                                                                )
                                                                        }
                                                                        <span>세금 포함</span>
                                                                    </div>
                                                                    <button className="room_reservation_btn" data-room-id={room.roomId} data-break={!room.roomBreakfast} data-onlinepay={!room.roomOnlinePay} onClick={reserveClick}>예약</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button className="room_reservation_more_btn" onClick={() => toggleVisible(room?.roomId || '')}>{
                                                        !handleVisible.includes(room.roomId) ? '숨기기' : '객실 2개 더 보기'
                                                    }</button>
                                                </div>
                                                :
                                                <div className="room_box_right">
                                                    <table>
                                                        <thead>
                                                            <th>
                                                                <p>객실 옵션 상세</p>
                                                            </th>
                                                            <th>
                                                                <p>정원</p>
                                                            </th>
                                                            <th>
                                                                <p>객실 요금</p>
                                                            </th>
                                                        </thead>
                                                        <tbody data-room-id={room.roomId}>
                                                            <td>
                                                                <div className="room_options">
                                                                    <div className="room_repund">
                                                                        {room.roomRepund ? <p>환불 가능</p> : <p>환불 불가</p>}
                                                                    </div>
                                                                    <div className="room_breakfast">
                                                                        {!room.roomBreakfast ? <p className="break_yes">조식 2인 포함</p> : <p className="break_no">조식 22,000원 (선택 사항)</p>}
                                                                    </div>
                                                                    <div className="room_onlinepay">
                                                                        {room.roomOnlinePay ? <p>온라인 사전 결제</p> : <p>호텔 결제</p>}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="room_capacity">
                                                                    <p>{room.roomCapacity}</p>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="room_reservation">
                                                                    <div>
                                                                        {
                                                                            room.roomId === '02' ? (
                                                                                <p>{priceNumber((room.roomPrice * hotel.price))}원</p>
                                                                            )
                                                                                : room.roomId === '03' ? (
                                                                                    <p>{priceNumber(room.roomPrice * hotel.price)}원</p>
                                                                                ) : (
                                                                                    <p>{priceNumber(room.roomPrice * hotel.price)}원</p>
                                                                                )
                                                                        }
                                                                        <span>세금 포함</span>
                                                                    </div>
                                                                    <button className='room_reservation_btn' data-room-id={room.roomId} data-break={!room.roomBreakfast} data-onlinepay={room.roomOnlinePay} onClick={reserveClick}>예약</button>
                                                                </div>
                                                            </td>
                                                        </tbody>
                                                        <tbody data-room-id={room.roomId}>
                                                            <td>
                                                                <div className="room_options">
                                                                    <div className="room_repund">
                                                                        {room.roomRepund ? <p>환불 가능</p> : <p>환불 불가</p>}
                                                                    </div>
                                                                    <div className="room_breakfast">
                                                                        {room.roomBreakfast ? <p className="break_yes">조식 2인 포함</p> : <p className="break_no">조식 22,000원 (선택 사항)</p>}
                                                                    </div>
                                                                    <div className="room_onlinepay">
                                                                        {room.roomOnlinePay ? <p>온라인 사전 결제</p> : <p>호텔 결제</p>}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="room_capacity">
                                                                    <p>{room.roomCapacity}</p>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="room_reservation">
                                                                    <div>
                                                                        {
                                                                            room.roomId === '02' ? (
                                                                                <p>{priceNumber((room.roomPrice * hotel.price) + 22000)}원</p>
                                                                            )
                                                                                : room.roomId === '03' ? (
                                                                                    <p>{priceNumber((room.roomPrice * hotel.price) + 22000)}원</p>
                                                                                ) : (
                                                                                    <p>{priceNumber((room.roomPrice * hotel.price) + 22000)}원</p>
                                                                                )
                                                                        }
                                                                        <span>세금 포함</span>
                                                                    </div>
                                                                    <button className="room_reservation_btn" data-room-id={room.roomId} data-break={room.roomBreakfast} data-onlinepay={room.roomOnlinePay} onClick={reserveClick}>예약</button>
                                                                </div>
                                                            </td>
                                                        </tbody>
                                                        <tbody className={`room_reservation_more ${handleVisible.includes(room.roomId) ? 'invisible' : ''}`}
                                                            data-room-id={room.roomId}>
                                                            <td>
                                                                <div className="room_options">
                                                                    <div className="room_repund">
                                                                        {room.roomRepund ? <p>환불 가능</p> : <p>환불 불가</p>}
                                                                    </div>
                                                                    <div className="room_breakfast">
                                                                        {!room.roomBreakfast ? <p className="break_yes">조식 2인 포함</p> : <p className="break_no">조식 22,000원 (선택 사항)</p>}
                                                                    </div>
                                                                    <div className="room_onlinepay">
                                                                        {!room.roomOnlinePay ? <p>온라인 사전 결제</p> : <p>호텔 결제</p>}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="room_capacity">
                                                                    <p>{room.roomCapacity}</p>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="room_reservation">
                                                                    <div>
                                                                        {
                                                                            room.roomId === '02' ? (
                                                                                <p>{priceNumber((room.roomPrice * hotel.price) * 1.20)}원</p>
                                                                            )
                                                                                : room.roomId === '03' ? (
                                                                                    <p>{priceNumber((room.roomPrice * hotel.price) * 1.20)}원</p>
                                                                                ) : (
                                                                                    <p>{priceNumber((room.roomPrice * hotel.price) * 1.20)}원</p>
                                                                                )
                                                                        }
                                                                        <span>세금 포함</span>
                                                                    </div>
                                                                    <button className="room_reservation_btn" data-room-id={room.roomId} data-break={!room.roomBreakfast} data-onlinepay={!room.roomOnlinePay} onClick={reserveClick}>예약</button>
                                                                </div>
                                                            </td>
                                                        </tbody>
                                                        <tbody className={`room_reservation_more ${handleVisible.includes(room.roomId) ? 'invisible' : ''}`}
                                                            data-room-id={room.roomId}>
                                                            <td>
                                                                <div className="room_options">
                                                                    <div className="room_repund">
                                                                        {room.roomRepund ? <p>환불 가능</p> : <p>환불 불가</p>}
                                                                    </div>
                                                                    <div className="room_breakfast">
                                                                        {room.roomBreakfast ? <p className="break_yes">조식 2인 포함</p> : <p className="break_no">조식 22,000원 (선택 사항)</p>}
                                                                    </div>
                                                                    <div className="room_onlinepay">
                                                                        {!room.roomOnlinePay ? <p>온라인 사전 결제</p> : <p>호텔 결제</p>}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="room_capacity">
                                                                    <p>{room.roomCapacity}</p>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="room_reservation">
                                                                    <div>
                                                                        {
                                                                            room.roomId === '02' ? (
                                                                                <p>{priceNumber(((room.roomPrice * hotel.price) * 1.20) + 22000)}원</p>
                                                                            )
                                                                                : room.roomId === '03' ? (
                                                                                    <p>{priceNumber(((room.roomPrice * hotel.price) * 1.20) + 22000)}원</p>
                                                                                ) : (
                                                                                    <p>{priceNumber(((room.roomPrice * hotel.price) * 1.20) + 22000)}원</p>
                                                                                )
                                                                        }
                                                                        <span>세금 포함</span>
                                                                    </div>
                                                                    <button className="room_reservation_btn" data-room-id={room.roomId} data-break={room.roomBreakfast} data-onlinepay={!room.roomOnlinePay} onClick={reserveClick}>예약</button>
                                                                </div>
                                                            </td>
                                                        </tbody>
                                                    </table>
                                                    <button className="room_reservation_more_btn" onClick={() => toggleVisible(room?.roomId || '')}>{
                                                        !handleVisible.includes(room.roomId) ? '숨기기' : '객실 2개 더 보기'
                                                    }</button>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* bottom */}
                        {media === 0 &&
                            <div className="mb_bottom_fixed">
                                <div className="mb_bottom_price">
                                    <p>객실 특가</p>
                                    {hotel && <span>{priceNumber(hotel?.price)}원</span>}
                                </div>
                                <button className="mb_bottom_move_reserve_btn" onClick={handleScroll}>객실 선택</button>
                            </div>
                        }
                    </>
                ) : (
                    <p>찾으시는 호텔이 존재하지 않습니다.</p>
                )
                }
            </div >

        </div >
    );
};

export default DetailView;
