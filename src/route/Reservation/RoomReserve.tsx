import React, { useEffect, useRef, useState } from "react";
import './RoomReserve.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { adultState, calenderState, childState, defaultCheckInState, defaultCheckOutState, footerYState, hotelDataState, mbSetterState, mediaState, modalState, nightState, Reservation, reserveDataState, roomState, userState } from "../../recoil";
import { createReservation } from "../Hook/reserveService";
import useHotelDetail from "../Hook/useHotelDetail";
import MainFinder from "../Main/MainFinder";

const RoomReserve: React.FC = () => {
    let hotelQuery: string | null = null;
    let roomQuery: string | null = null;
    const reserveBoxRef = useRef<HTMLDivElement>(null)
    const reserveBtnRef = useRef<HTMLDivElement>(null)
    const location = useLocation();
    const navigate = useNavigate();

    const [reservedId, setReservedId] = useState('');
    const [reservation, setReservation] = useRecoilState<Reservation[]>(reserveDataState)
    const [calender, setCalender] = useRecoilState<boolean>(calenderState);
    const [setter, setSetter] = useRecoilState<boolean>(mbSetterState);

    const reservedCheckIn = useRecoilValue<Date | null>(defaultCheckInState);
    const reservedCheckOut = useRecoilValue<Date | string | null>(defaultCheckOutState);
    const reservedNight = useRecoilValue<number | null>(nightState);
    // - reserve -
    const [price, setPrice] = useState<number>(0);
    const [confirm, setConfirm] = useState(false)
    const [showAllRoom, setShowAllRoom] = useState<boolean>(false)
    const [photoId, setPhotoId] = useState(0)
    const [reserveCenter, setReserveCenter] = useState<{ lat: number, lng: number }>({ lat: 1, lng: 1 })
    const [reserveZoom, setReserveZoom] = useState<number>(15)
    const [fixed, setFixed] = useState<boolean>(false)
    const [reserveMap, setReserveMap] = useState<boolean>(false)
    const [modal, setModal] = useRecoilState<boolean>(modalState)

    const room = useRecoilValue<number | null>(roomState)
    const adult = useRecoilValue<number | null>(adultState)
    const child = useRecoilValue<number | null>(childState)
    const user = useRecoilValue<string | null>(userState)
    const night = useRecoilValue<number | null>(nightState)
    const hotelData = useRecoilValue(hotelDataState);
    const media = useRecoilValue(mediaState)
    const footer = useRecoilValue(footerYState)
    const checkIn = useRecoilValue<Date | null>(defaultCheckInState)
    const checkOut = useRecoilValue<Date | null | string>(defaultCheckOutState)

    const params = new URLSearchParams(location.search)
    const query = params.get('query')
    const breakfast = params.get('breakfast')
    const onlinepay = params.get('onlinepay')

    if (query) {
        const parts = query.split('_');
        if (parts.length === 2) {
            hotelQuery = parts[0]
            roomQuery = parts[1]
        }
    }

    const { hotelDetail, error } = useHotelDetail();

    const thisHotel = hotelData.find(id => id.hotelId === hotelQuery);
    const thisRoom = hotelDetail.find(id => id.hotelId === hotelQuery);
    const reserveRoom = thisRoom?.hotelRoom.find(id => id.roomId === roomQuery);



    const priceNumber = (value: number) => {
        return new Intl.NumberFormat('ko-KR', {
            maximumFractionDigits: 0, // 소수점 최대 자릿수
            minimumFractionDigits: 0, // 소수점 최소 자릿수
        }).format(value);
    }
    const priceService = (value: number) => {
        return Math.round(value * 0.05);
    }


    const confirmToggle = () => {
        setConfirm((prev) => !prev)
        setModal((prev) => !prev)
    }

    const photoPrev = (setData: React.Dispatch<React.SetStateAction<number>>, min: number) => {
        setData((prevData) => Math.max(prevData - 1, min));
    };
    const photoNext = (setData: React.Dispatch<React.SetStateAction<number>>, max: number) => {
        setData((prevData) => Math.min(prevData + 1, max - 1));
    }

    const roomImg = showAllRoom ? reserveRoom?.roomImg : reserveRoom?.roomImg.slice(0, 4)
    const priceFewNight = price * (night ?? 1) * (room ?? 1);
    const totalPay = priceFewNight + priceService(priceFewNight) // hotel.? 는 undefinde , null 속성 방지

    const reserver = async (): Promise<string | null> => {
        const newReservation = {
            reservedUser: user || '',
            reservedTitle: thisHotel?.title || '',
            reservedGrade: thisHotel?.grade || '',
            reservedCheckIn,
            reservedCheckOut,
            reservedPrice: price,
            reservedNight: reservedNight || 1,
            reservedRoom: reserveRoom?.roomTitle || '',
            reservedRoomEtc: room || 1,
            reservedTotal: totalPay,
        }
        try {
            const id = await createReservation(newReservation);
            const updateReserve = [...reservation, newReservation]
            sessionStorage.setItem("reservation", JSON.stringify(updateReserve)); // 세션 저장소에 저장
            alert(`예약 성공! 당신의 예약 ID : ${id}, ${reservedId}`)
            return id;
        } catch (error) {
            console.error('예약 실패', error);
            return null;
        }
    }

    const confirmNavigate = async () => {
        if (confirm && user) {
            try {
                const id = await reserver();
                if (id) {
                    setReservedId(id)
                }
            } catch (error) {
                console.error('예약 중 오류 발생:', error);
                alert('예약 중 오류가 발생했습니다. 다시 시도해 주세요.');
            }
        } else {
            alert('로그인 후 이용 가능합니다.')
            setConfirm(false)
            setModal(false)
        }
    }

    const handleMap = () => {
        setReserveMap((prev) => !prev)
        setModal((prev) => !prev)
    }

    const handleUndoBtn = () => {
        navigate(-1)
    }

    const formatDate = (date: Date | string | null) => {
        if (typeof date === 'string') return date;
        if (!date) return;
        return `${String(date.getMonth() + 1)}월 ${String(date.getDate())}일`
    } // 날짜 

    const toggleCalender = () => {
        setCalender((prev) => !prev)
        setModal((prev) => !prev)
    }
    const toggleSetter = () => {
        setSetter((prev) => !prev)
        setModal((prev) => !prev)
    }
    // 모바일 캘린더 & 세팅

    useEffect(() => {
        if (hotelQuery && roomQuery) {
            if (thisHotel && reserveRoom) {
                let basePrice = thisHotel.price;

                if (onlinepay !== '1') basePrice *= 1.20;
                if (reserveRoom.roomId === '02') basePrice *= 1.15
                if (reserveRoom.roomId === '03') basePrice *= 1.25
                if (breakfast === '1') basePrice += 22000;

                setPrice(basePrice);
            }
        }
    }, [breakfast, onlinepay, thisHotel, reserveRoom])
    // 방 가격 처리

    useEffect(() => {
        if (thisHotel) {
            setReserveCenter({ lat: thisHotel.lat, lng: thisHotel.lng })
            setReserveZoom(17)
        }
    }, [thisHotel])
    // 예약 하려는 숙소 위치

    useEffect(() => {
        if (reservedId !== '') {
            navigate(`/reserve_confirm?query=${reservedId}`)
        }
        setModal((prev) => !prev)
    }, [reservedId])
    // 예약 성공 시 이동
    
    const showRoomHandle = () => {
        setShowAllRoom((prev) => !prev)
        setModal((prev) => !prev)
    }
    useEffect(() => {
        const fixedHandle = () => {
            const currentY = window.scrollY; // 스크롤 이벤트 발생 시마다 최신 값 계산
            const targetY = 70;

            // console.log("currentY:", currentY, "footerY:", footerY); // 매번 값 확인
            if (media > 1) {
                if (targetY <= currentY) {
                    setFixed(true);
                } else {
                    setFixed(false)
                };
            }

        }

        window.addEventListener('scroll', fixedHandle);

        return () => {
            window.removeEventListener('scroll', fixedHandle)
        };
    }, []) // 스크롤

    return (
        <>
            {showAllRoom && reserveRoom &&
                <div className="reserve_room_photo_wrap">
                    <div className="reserve_room_photo_bg" onClick={showRoomHandle}>
                    </div>
                    <div className="reserve_room_photo_cont">
                        <button className="reserve_room_photo_close_btn" onClick={showRoomHandle}></button>
                        <div className="reserve_room_photo_view">
                            <div className="photo_prev" onClick={() => photoPrev(setPhotoId, 0)}>
                                <div style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/07969943-db2a-4af3-96d1-4d66f8d1a604")' }}></div>
                            </div>
                            {roomImg &&
                                <div>
                                    <img src={roomImg[photoId]} alt={reserveRoom.roomTitle + photoId} />
                                </div>
                            }
                            <div className="photo_next" onClick={() => photoNext(setPhotoId, reserveRoom.roomImg.length)}>
                                <div style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/88bc4b88-e958-4478-9dc1-1579810ec7c2")' }}></div>
                            </div>
                        </div>
                        <div className="reserve_room_photo_box">
                            {roomImg && roomImg.map((rpImg, rpImgIndex) => (
                                <div key={rpImgIndex} onClick={() => setPhotoId(rpImgIndex)}>
                                    <img src={rpImg} alt={reserveRoom.roomTitle + rpImgIndex} />
                                </div>
                            ))}
                        </div>
                        <span>{photoId + 1} / {reserveRoom.roomImg.length}</span>
                    </div>
                </div>
            }
            {thisHotel &&
                <div className="reserve_wrap">
                    {media < 2 &&
                        <div className='mb_reserve_top_nav'>
                            <p>{thisHotel.title}</p>
                            <button className="reserve_undo_btn" onClick={handleUndoBtn}>
                                <svg viewBox="-2 -3 24 24" className="reserve_undo_svg">
                                    <g id="prevIcon" data-name="prevIcon"><g id="prev" data-name="prev">
                                        <rect className="cls-1" width="18" height="18" />
                                        <polyline className="cls-2" points="11.57 3.87 6.43 9 11.56 14.13" />
                                    </g></g>
                                </svg>
                            </button>
                        </div>
                    }
                    {/* 모바일 탑 */}

                    <div className="reserve_cont">
                        {media > 1 ?
                            <>
                                <div className="reserve_main">
                                    <div className="reserve_room_title_wrap">
                                        <div className="reserve_room_title">
                                            <p>{thisHotel.title}</p>
                                            <div className="hotel_grade">
                                                {thisHotel.grade === '2' ?
                                                    <>
                                                        <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                        <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                    </>
                                                    : thisHotel.grade === '3' ?
                                                        <>
                                                            <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                            <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                            <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                        </>
                                                        : thisHotel.grade === '4' ?
                                                            <>
                                                                <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                                <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                                <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                                <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                            </>
                                                            : thisHotel.grade === '5' ?
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
                                        <div className="hotel_history">
                                            <div>
                                                <div className="hotel_history_icon" style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/b7a9fa5d-e126-47b2-835f-ae85545dbd2b")' }}></div>
                                                <p>{thisHotel.country}</p>
                                            </div>
                                            <div>
                                                <p>|  {thisHotel.region[0]} · {thisHotel.region[1]}</p>
                                            </div>
                                        </div>
                                        <div className="reserve_room_img_box">
                                            {thisRoom &&
                                                <Swiper pagination={true} modules={[Pagination]} className="mb_top_img">
                                                    {thisRoom.hotelImg.map
                                                        ((rImg, rImgIndex) => (
                                                            <SwiperSlide key={rImgIndex}>
                                                                <div>
                                                                    <img src={rImg} alt={thisHotel.title} />
                                                                </div>
                                                            </SwiperSlide>
                                                        ))}
                                                </Swiper>
                                            }
                                        </div>
                                    </div>
                                    {/* 탑 */}

                                    <div className="reserve_room_info_wrap">
                                        <p>예약 상세</p>
                                        {reserveRoom && (
                                            <div className="reserve_room_info_cont">
                                                <div className="reserve_room_info">
                                                    <p>객실 정보</p>
                                                    <div>
                                                        <div className="reserve_room_bed_title">
                                                            <p>{reserveRoom.roomTitle}</p>
                                                        </div>
                                                        <div className="reserve_room_bed_img">
                                                            {roomImg && roomImg.map((rRImg, rRImgIndex) => (
                                                                <div key={rRImgIndex} className="reserve_room_bed" onClick={showRoomHandle}>
                                                                    <img src={rRImg} alt={reserveRoom.roomTitle} />
                                                                </div>
                                                            ))}
                                                            <div className="reserve_room_photo_icon">
                                                                <div></div>
                                                                <span>{reserveRoom.roomImg.length}</span>
                                                            </div>
                                                        </div>
                                                        {reserveRoom.roomDetail && reserveRoom.roomDetail.map((reserve, reserveIndex) => (
                                                            <>
                                                                <div key={reserveIndex} className="reserve_room_info_detail">
                                                                    {reserve.roomDetailMain.map((rdm, rdmIndex) => (
                                                                        <div>
                                                                            <div className="reserve_room_icon" style={{ backgroundImage: `url(${rdm.imgUrl})` }}></div>
                                                                            <p key={rdmIndex}>{rdm.title}</p>
                                                                        </div>
                                                                    ))}
                                                                </div>

                                                            </>
                                                        ))}
                                                    </div>
                                                </div>
                                                {/* 객실 정보 */}

                                                <div className="reserve_detail">
                                                    <p>객실 옵션 상세</p>
                                                    <div>
                                                        {reserveRoom.roomDetail.map((rd, rdIndex) => ( // roomDetail의 각 속성을 명시적으로 접근
                                                            <div key={rdIndex}>
                                                                <div className="reserve_detail_box">
                                                                    <div>
                                                                        <p>세면 도구</p>
                                                                        <div className="reserve_detail_more"></div>
                                                                    </div>
                                                                    <div>
                                                                        {rd.roomToiletries.map((rdToilet, rdToiletIndex) => (
                                                                            <div key={rdToiletIndex}>
                                                                                <div className="reserve_detail_more_icon" style={{ backgroundImage: `url(${rdToilet.imgUrl})` }}></div>
                                                                                <span>
                                                                                    {rdToilet.title}
                                                                                </span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                <div className="reserve_detail_box">
                                                                    <div>
                                                                        <p>청소 서비스</p>
                                                                        <div className="reserve_detail_more"></div>
                                                                    </div>
                                                                    <div>
                                                                        <div>
                                                                            <div className="reserve_detail_more_icon" style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/8624b990-f132-4195-b44d-e2286eb84df7")' }}></div>
                                                                            <span>
                                                                                {rd.roomCleaning}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="reserve_detail_box">
                                                                    <div>
                                                                        <p>장애인 편의시설</p>
                                                                        <div className="reserve_detail_more"></div>
                                                                    </div>
                                                                    <div>
                                                                        {rd.roomFacilityDisability.map((rdfd, rdfdIndex) => (
                                                                            <div key={rdfdIndex}>
                                                                                <div className="reserve_detail_more_icon" style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/8624b990-f132-4195-b44d-e2286eb84df7")' }}></div>
                                                                                <span>
                                                                                    {rdfd}
                                                                                </span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                <div className="reserve_detail_box">
                                                                    <div>
                                                                        <p>객실 레이아웃</p>
                                                                        <div className="reserve_detail_more"></div>
                                                                    </div>
                                                                    <div>
                                                                        {rd.roomRayout.map((rdr, rdrIndex) => (
                                                                            <div key={rdrIndex}>
                                                                                <div className="reserve_detail_more_icon" style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/8624b990-f132-4195-b44d-e2286eb84df7")' }}></div>
                                                                                <span>
                                                                                    {rdr}
                                                                                </span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                <div className="reserve_detail_box">
                                                                    <div>
                                                                        <p>객실 기기</p>
                                                                        <div className="reserve_detail_more"></div>
                                                                    </div>
                                                                    <div>
                                                                        {rd.roomDevice.map((rddv, rddvIndex) => (
                                                                            <div key={rddvIndex}>
                                                                                <div className="reserve_detail_more_icon" style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/8624b990-f132-4195-b44d-e2286eb84df7")' }}></div>
                                                                                <span>
                                                                                    {rddv}
                                                                                </span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                <div className="reserve_detail_box">
                                                                    <div>
                                                                        <p>객실 식사 & 음료</p>
                                                                        <div className="reserve_detail_more"></div>
                                                                    </div>
                                                                    <div>
                                                                        {rd.roomFood.map((rdfo, rdfoIndex) => (
                                                                            <div key={rdfoIndex}>
                                                                                <div className="reserve_detail_more_icon" style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/8624b990-f132-4195-b44d-e2286eb84df7")' }}></div>
                                                                                <span>
                                                                                    {rdfo}
                                                                                </span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                <div className="reserve_detail_box">
                                                                    <div>
                                                                        <p>욕실</p>
                                                                        <div className="reserve_detail_more"></div>
                                                                    </div>
                                                                    <div>
                                                                        {rd.roomBathroom.map((rdbr, rdbrIndex) => (
                                                                            <div key={rdbrIndex}>
                                                                                <div className="reserve_detail_more_icon" style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/8624b990-f132-4195-b44d-e2286eb84df7")' }}></div>
                                                                                <span>
                                                                                    {rdbr}
                                                                                </span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                <div className="reserve_detail_box">
                                                                    <div>
                                                                        <p>객실 시설</p>
                                                                        <div className="reserve_detail_more"></div>
                                                                    </div>
                                                                    <div>
                                                                        {rd.roomFacility.map((rdfc, rdfcIndex) => (
                                                                            <div key={rdfcIndex}>
                                                                                <div className="reserve_detail_more_icon" style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/8624b990-f132-4195-b44d-e2286eb84df7")' }}></div>
                                                                                <span>
                                                                                    {rdfc}
                                                                                </span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                {/* 객실 옵션 상세 */}
                                                <div className="room_service_wrap">
                                                    <p>포함된 서비스</p>
                                                    <div>
                                                        <div>
                                                            {reserveRoom.roomRepund ?
                                                                <>
                                                                    <div className="reserve_ok_icon" style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/8624b990-f132-4195-b44d-e2286eb84df7")' }}></div><span>무료 취소</span>
                                                                </>
                                                                :
                                                                <>
                                                                    <div className="reserve_no_icon" style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/6cea69a3-26c0-43c5-b01f-c6ed61c96b49")' }}></div><span>환불 불가</span>
                                                                </>
                                                            }
                                                        </div>
                                                        <div>
                                                            {breakfast === '1' ?
                                                                <>
                                                                    <div className="reserve_ok_icon" style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/dab685c4-dc07-42a0-ace3-4e2fb6441c65")' }}></div> <span>조식 2인 포함</span>
                                                                </>
                                                                :
                                                                <>
                                                                    <div className="reserve_no_icon" style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/6cea69a3-26c0-43c5-b01f-c6ed61c96b49")' }}></div><span>조식 미 포함</span>
                                                                </>
                                                            }
                                                        </div>
                                                        <div>
                                                            {onlinepay === '1' ?
                                                                <>
                                                                    <div className="reserve_ok_icon" style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/d6d7af89-6a5f-4081-b0d2-eb49b507040e")' }}></div> <span>온라인 사전 결제</span>
                                                                </>
                                                                :
                                                                <>
                                                                    <div className="reserve_no_icon" style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/dbd56dbd-6720-41de-90cf-8110fa43a50d")' }}></div><span>호텔 결제</span>
                                                                </>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* 서비스 */}

                                            </div>
                                        )}
                                    </div >
                                    {/* 예약 정보 */}

                                    <div className="room_location" >
                                        <p>지도 | 숙소 위치</p>
                                        <div className="room_location_detail">
                                            <div className="hotel_history_icon" style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/b7a9fa5d-e126-47b2-835f-ae85545dbd2b")' }}></div>
                                            <p>3 React-1-1 React. React GU, 123-0001 {thisHotel.region[0]}, {thisHotel.region[1]} 구, {thisHotel.country}</p>
                                        </div>
                                        <div className="room_location_box">
                                            <GoogleMap mapContainerStyle={{ height: "100%", width: "100%" }} // 지도의 크기 설정
                                                zoom={reserveZoom} // 초기 줌 레벨 설정
                                                center={reserveCenter}
                                                options={{
                                                    gestureHandling: "none", // 사용자가 의도한 제스처에만 반응하도록 설정
                                                    disableDefaultUI: true, // 기본 UI 비활성화
                                                    keyboardShortcuts: false, // 키보드 단축키 비활성화
                                                    clickableIcons: false, // 아이콘 클릭 비활성화
                                                }}
                                            >
                                                <MarkerF
                                                    key={thisHotel && thisHotel.hotelId}
                                                    position={reserveCenter}
                                                >
                                                </MarkerF>
                                            </GoogleMap>
                                        </div>
                                    </div >
                                    {/* 지도 */}
                                </div>
                                <div className={`reserve_box ${fixed ? 'onFixed' : ''}`} ref={reserveBoxRef}>
                                    {reserveRoom && thisHotel &&
                                        <>
                                            <MainFinder />
                                            <div className="reserve_box_price">
                                                <p>￦{priceNumber(price)}원</p>
                                                <span>/박</span>
                                            </div>
                                            <div className="reserve_rent">
                                                <p>숙박 총액 + 세금 및 기타 요금</p>
                                                <div>
                                                    <p>￦{priceNumber(price)}원 x {night}박 x 객실 {room}개</p>
                                                    <span>￦{priceNumber(priceFewNight)}원</span>
                                                </div>
                                                <div>
                                                    <p>리액트립 서비스 수수료</p>
                                                    <span>￦{priceNumber(priceService(priceFewNight))}원</span>

                                                </div>
                                            </div>
                                            <div className="reserve_box_circle_wrap">
                                                <div className="reserve_box_circle"></div>
                                                <div className="reserve_box_circle"></div>
                                            </div>
                                            <div className="reserve_totalpay">
                                                <p>총 금액</p>
                                                <span>￦{priceNumber(totalPay)}원</span>
                                            </div>
                                            <div className="reserve_btn_wrap">
                                                <p>* 예약 확정 전에는 요금이 청구되지 않습니다.</p>
                                                <button className="reserve_btn" onClick={confirmToggle}>예약하기</button>
                                            </div>
                                        </>
                                    }
                                </div>
                                {/* fiexd info */}
                            </> // pc
                            :
                            <>
                                <div className="reserve_room_title_wrap">
                                    <div className="reserve_room_title">
                                        <p>{thisHotel.title}</p>
                                        <div className="hotel_grade">
                                            {thisHotel.grade === '2' ?
                                                <>
                                                    <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                    <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                </>
                                                : thisHotel.grade === '3' ?
                                                    <>
                                                        <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                        <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                        <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                    </>
                                                    : thisHotel.grade === '4' ?
                                                        <>
                                                            <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                            <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                            <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                            <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                        </>
                                                        : thisHotel.grade === '5' ?
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
                                    <div className="hotel_history">
                                        <div>
                                            <div className="hotel_history_icon" style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/b7a9fa5d-e126-47b2-835f-ae85545dbd2b")' }}></div>
                                            <p>{thisHotel.country}</p>
                                        </div>
                                        <div>
                                            <p>|  {thisHotel.region[0]} · {thisHotel.region[1]}</p>
                                        </div>
                                    </div>
                                    <div className="reserve_room_img_box">
                                        {thisRoom &&
                                            <Swiper pagination={true} modules={[Pagination]} className="mb_top_img">
                                                {thisRoom.hotelImg.map
                                                    ((rImg, rImgIndex) => (
                                                        <SwiperSlide key={rImgIndex}>
                                                            <div>
                                                                <img src={rImg} alt={thisHotel.title} />
                                                            </div>
                                                        </SwiperSlide>
                                                    ))}
                                            </Swiper>
                                        }
                                    </div>
                                    <div className="room_location" onClick={handleMap}>
                                        <div className="room_location_bg">
                                            <div className="room_location_icon" style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/b7a9fa5d-e126-47b2-835f-ae85545dbd2b")' }}></div>
                                            <p>3 React-1-1 React. React GU, 123-0001 {thisHotel.region[0]}, {thisHotel.region[1]} 구, {thisHotel.country}</p>
                                            <div className="room_location_right">
                                                <div className="room_location_map_icon" style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/a27f39bf-e1d1-446e-b8f9-ff554ed96d21")' }}>
                                                </div>
                                                <span>지도</span>
                                            </div>
                                        </div>
                                    </div >
                                    {/* 지도 */}
                                </div>
                                {/* 탑 */}
                                <div className='reserve_box' ref={reserveBoxRef}>
                                    {reserveRoom && thisHotel &&
                                        <>
                                            <div className="hs_check" onClick={toggleCalender}>
                                                <div className="check_in">
                                                    <p>체크인</p>
                                                    <div className='hs_check_in'>{formatDate(checkIn)}</div>
                                                </div>
                                                <div className="center_line"></div>
                                                <div className="check_out">
                                                    <p>체크아웃</p>
                                                    <div className='hs_check_out'>{formatDate(checkOut)}</div>
                                                </div>
                                            </div>
                                            <div className='hs_person'>
                                                <p>객실당 인원 수</p>
                                                <div className="hs_person_cont" onClick={toggleSetter}>
                                                    <span>{`객실 ${room}개, 성인 ${adult}명, 어린이 ${child}명`}</span>
                                                </div>
                                            </div>

                                            <div className="reserve_price">
                                                <p>객실 요금</p>
                                                <div className="reserve_box_price">
                                                    <p>￦{priceNumber(price)}원</p>
                                                    <span>/박</span>
                                                </div>
                                            </div>
                                            <div className="reserve_rent">
                                                <p>숙박 총액 + 세금 및 기타 요금</p>
                                                <div>
                                                    <p>￦{priceNumber(price)}원 x {night}박 x 객실 {room}개</p>
                                                    <span>￦{priceNumber(priceFewNight)}원</span>
                                                </div>
                                                <div>
                                                    <p>리액트립 서비스 수수료</p>
                                                    <span>￦{priceNumber(priceService(priceFewNight))}원</span>

                                                </div>
                                            </div>
                                            <div className="reserve_box_circle_wrap">
                                                <div className="reserve_box_circle"></div>
                                                <div className="reserve_box_circle"></div>
                                            </div>
                                            <div className="reserve_totalpay">
                                                <p>총 금액</p>
                                                <span>￦{priceNumber(totalPay)}원</span>
                                            </div>

                                        </>
                                    }
                                </div>
                                {/* fiexd info */}
                                {
                                    reserveMap && media < 2 &&
                                    <div className="room_location_box">
                                        <button className="room_location_box_btn" onClick={handleMap}>
                                            <svg viewBox="0 0 54 54">
                                                <g className="reserve_close" data-name="reserve_close">
                                                    <rect className="cls-1" x="1" y="1" width="52" height="52" rx="26" />
                                                    <line className="cls-2" x1="17.1" y1="17.1" x2="36.9" y2="36.9" />
                                                    <line className="cls-2" x1="36.9" y1="17.1" x2="17.1" y2="36.9" />
                                                </g>
                                            </svg>
                                        </button>
                                        <GoogleMap mapContainerStyle={{ height: "100%", width: "100%" }} // 지도의 크기 설정
                                            zoom={reserveZoom} // 초기 줌 레벨 설정
                                            center={reserveCenter}
                                            options={{
                                                gestureHandling: "greedy", // 사용자가 의도한 제스처에만 반응하도록 설정
                                                disableDefaultUI: true, // 기본 UI 비활성화
                                                keyboardShortcuts: false, // 키보드 단축키 비활성화
                                                clickableIcons: false, // 아이콘 클릭 비활성화
                                            }}
                                        >
                                            <MarkerF
                                                key={thisHotel && thisHotel.hotelId}
                                                position={reserveCenter}
                                            >
                                            </MarkerF>
                                        </GoogleMap>
                                    </div>
                                }
                                <div className="reserve_btn_wrap">
                                    <div className="reserve_btn_top">
                                        <div className="reserve_btn_top_icon"></div>
                                        <span>리액트립 가격 보장제</span>
                                    </div>
                                    <p>* 예약 확정 전에는 요금이 청구되지 않습니다.</p>
                                    <div className="reserve_btn_bottom">
                                        <span>￦{priceNumber(totalPay)}원</span>
                                        <button className="reserve_btn" onClick={confirmToggle}>예약하기</button>
                                    </div>
                                </div>
                            </> // mobile
                        }
                    </div>
                </div >
            }
            {media < 2 && (calender || setter) && <MainFinder />}
            {
                confirm && <div className="reserve_confirm_bg" onClick={confirmToggle}>
                    <div className="reserve_confirm" ref={reserveBtnRef} onClick={(e) => e.stopPropagation()}>
                        <p>예약 하시겠습니까?</p>
                        <div className="reserve_confirm_btn">
                            <button onClick={confirmNavigate}>확인</button>
                            <button onClick={confirmToggle}>취소</button>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}

export default RoomReserve