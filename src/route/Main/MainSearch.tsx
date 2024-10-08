import React, { useEffect, useRef, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ReactSlider from 'react-slider';
import MainFinder from "./MainFinder";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper as SwiperClass } from 'swiper'
import { priceRangeState, searchResultDataState, Hotel, gradeState, rateState, filteredHotelSelector, defaultLat, defaultLng, searchTermState, defaultZoom, defaultMap, finderState, modalState, roomState, adultState, childState, defaultCheckInState, defaultCheckOutState, mapSlideIndexState, mediaState, footerYState } from "../../recoil";
import './MainSearch.css';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import MapView from "../Map/MapView";
import 'swiper/css';
import { currentZoomState } from "../../MapState";
const MainSearch: React.FC = () => {
    const swiperRef = useRef<SwiperClass | null>(null);
    const rightFilterRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
    const [mapFilter, setMapFilter] = useState<boolean>(false)
    const [filterOn, setFilterOn] = useState<boolean>(false)

    const [finderOn, setFinderOn] = useRecoilState<boolean>(finderState)
    const [grade, setGrade] = useRecoilState<string>(gradeState)
    const [rate, setRate] = useRecoilState<number>(rateState)
    const [map, setMap] = useRecoilState<boolean>(defaultMap)
    const [priceRange, setPriceRange] = useRecoilState<number[]>(priceRangeState);
    const [lat, setLat] = useRecoilState<number>(defaultLat)
    const [lng, setLng] = useRecoilState<number>(defaultLng)
    const [zoom, setZoom] = useRecoilState<number>(defaultZoom)
    const [currentZoom, setCurrentZoom] = useRecoilState<number>(currentZoomState)
    const [modal, setModal] = useRecoilState<boolean>(modalState)
    const [mapSlideIndex, setSlideIndex] = useRecoilState<number>(mapSlideIndexState)

    const allHotels = useRecoilValue<Hotel[]>(filteredHotelSelector)
    const [filteredHotels, setFilteredHotels] = useRecoilState<Hotel[]>(searchResultDataState);
    const [copyFilteredHotels, setCopyFilteredHotels] = useState<Hotel[]>([]);


    const checkIn = useRecoilValue<Date | null>(defaultCheckInState)
    const checkOut = useRecoilValue<Date | null | string>(defaultCheckOutState)
    const search = useRecoilValue(searchTermState)
    const room = useRecoilValue(roomState)
    const adult = useRecoilValue(adultState)
    const child = useRecoilValue(childState)
    const media = useRecoilValue(mediaState)
    const footerY = useRecoilValue(footerYState)
    // state

    const priceSlider = (newRange: number[]) => {
        const minDistance = 10000; // 최소간격
        const [newMin, newMax] = newRange;

        // 슬라이더가 배열이 아니면 반환
        if (!Array.isArray(newRange)) {
            return;
        }

        // 최소값과 최댓값 슬라이더가 서로 겹치지 않게
        if (newMin >= newMax - minDistance) { // 최소값이 최대값보다 크거나 같고, 간격이 최소 간격보다 작아질 때
            if (newMin === priceRange[0]) {
                // 최소값 조절 시
                setPriceRange([newMin, newMin + minDistance]);
            } else {
                // 최댓값 조절 시
                setPriceRange([newMax - minDistance, newMax]);
            }
        } else {
            // 새 값 그대로 설정
            setPriceRange(newRange);
        }
    } // 가격 필터 슬라이드

    const priceNumber = (value: number) => {
        return new Intl.NumberFormat('ko-KR', {
            maximumFractionDigits: 0, // 소수점 최대 자릿수
            minimumFractionDigits: 0, // 소수점 최소 자릿수
        }).format(value);
    } // 원화

    const detailClick = (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
        event.stopPropagation();

        const hotelId = event.currentTarget.getAttribute('data-hotel-id');
        setMap(false)
        if (hotelId) {
            navigate(`/detail?query=${hotelId}`)
        }
    }; // 디테일 이동

    const minPrice = priceRange[0]
    const maxPrice = priceRange[1]
    const priceRanges = (priceNumber(minPrice)) + ' - ' + (priceNumber(maxPrice))

    useEffect(() => { // 비어있을 호텔 데이터를 채워주기
        if (filteredHotels.length === 0) {
            setFilteredHotels(allHotels);
            setCopyFilteredHotels(allHotels)
        }
        if (filteredHotels.length > 0) {
            setCopyFilteredHotels(filteredHotels);
        }
    }, [filteredHotels])

    useEffect(() => {
        const hotelFilter = () => {
            const filtered = filteredHotels.filter(hotel => {
                // 가격 true는 모든 가격을 허용함
                const priceFilter = hotel.price > priceRange[0] && (priceRange[1] === 320000 ? true : hotel.price <= priceRange[1]);
                // 평점
                const rateFilter = hotel.review >= rate;
                // 등급, grade를 숫자로 변환하여 비교
                const gradeFilter = parseInt(hotel.grade) >= parseInt(grade);

                return priceFilter && rateFilter && gradeFilter
            });
            setCopyFilteredHotels(filtered)
        };
        setLoading(true)

        const skeletonTimer = setTimeout(() => {
            setLoading(false)
            hotelFilter();
        }, 2000);

        // 타이머 정리 및 갱신 (cleanup 함수)
        return () => {
            clearTimeout(skeletonTimer); // 타이머 초기화
        };
    }, [priceRange, grade, rate, filteredHotels]);
    // 필터링

    const rateHandle = (r: number) => {
        setRate(r)
    } // 평점 필터

    const gradeHandle = (g: string) => {
        setGrade(g)
    } // 등급 필터

    const goMap = () => {
        setMap((prev) => !prev)
        if (map) {
            navigate('/search?query=')
        } else {
            navigate('/search?query=map')
        }
    } // 지도 보기 이동

    const setLocation = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>, mlat: number, mlng: number) => {
        event.stopPropagation();
        setLat((prev) => (prev === mlat - 0.0005) ? mlat - 0.0005000001 : mlat - 0.0005)
        setLng((prev) => (prev === (mlng + 0.0005)) ? mlng + 0.0005000001 : mlng + 0.0005)
        // 같은 좌표면 이동하지 않기 때문에 미세한 차이 주기
        setZoom((prev) => (prev === 18) ? 17.9 : 18)
        setCurrentZoom((prev) => (prev === 18) ? 17.9 : 18)
        if (!map) {
            goMap()
        }
    } // 지도 화면 이동

    const formatDate = (date: Date | string | null) => {
        if (typeof date === 'string') return date;
        if (!date) return '날짜를 선택해 주세요';
        return `${String(date.getMonth() + 1)}월 ${String(date.getDate())}일`;
    } // 날짜 변환

    const handleFinder = () => {
        setFinderOn((prev) => !prev)
        setModal((prev) => !prev)
    } // finder 토글

    const handleFilter = () => {
        setFilterOn((prev) => !prev)
        setModal((prev) => !prev)
        setMapFilter((prev) => !prev)
    } // 필터 토글

    const handleUndoBtn = () => {
        if (map) {
            setMap(false)
        }
        navigate(-1)
    } // 뒤로가기 버튼

    const handleSwiper = (index: number) => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(index);
        }
    } // 슬라이드 이동 

    useEffect(() => {
        handleSwiper(mapSlideIndex)
    }, [mapSlideIndex]) // 슬라이더 이동

    return (
        <>
            <div className={`search_wrap ${map && 'map_on_wrap'}`}>
                {media < 2 &&
                    <>
                        {finderOn &&
                            <div className="mb_finder_wrap">
                                <button className="mb_finder_close_btn" onClick={handleFinder}></button>
                                <MainFinder />
                            </div>
                        }
                        <div className="mb_finder_btn_wrap">
                            {media < 2 && <div className="search_undo_btn" onClick={handleUndoBtn}>
                                <svg viewBox="-2 -3 24 24" className="search_undo_svg">
                                    <g id="prevIcon" data-name="prevIcon"><g id="prev" data-name="prev">
                                        <rect className="cls-1" width="18" height="18" />
                                        <polyline className="cls-2" points="11.57 3.87 6.43 9 11.56 14.13" />
                                    </g></g>
                                </svg>
                            </div>}

                            <div className="mb_finder_btn" onClick={handleFinder}>
                                <div className="mb_search_top">
                                    <div></div>
                                    <p>{search === '' ? '대한민국' : search}</p>
                                </div>
                                <div className="mb_search_bottom">
                                    <div>
                                        <span>{formatDate(checkIn)} ~ {formatDate(checkOut)}</span>
                                    </div>
                                    <div>
                                        <div></div>
                                        <span>{room}</span>
                                    </div>
                                    <div>
                                        <div></div>
                                        <span>{adult + child}</span>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`mb_filter_btn ${map && 'mb_map_filter'}`}>
                            <div className="mb_filter_map" onClick={goMap}>
                                <div className="mb_filter_map_icon">
                                </div>
                                {map ? <span>지도 닫기</span> : <span>지도 열기</span>}
                            </div>
                            <div className="mb_filter_options" onClick={handleFilter}>
                                <div className="mb_filter_icon"></div>
                                <span>필터</span>
                            </div>
                        </div>
                    </>
                }
                {media > 1 &&
                    <MainFinder />
                }

                {map &&
                    <>
                        <MapView copyFilteredHotels={copyFilteredHotels} />
                        {mapFilter &&
                            <div className={`search_cont ${map && 'map_on_filter'}`}>
                                <div className="map_on_filter_bg" onClick={handleFilter}></div>
                                <div className="search_right">
                                    <button className="map_on_filter_close_btn" onClick={handleFilter}></button>
                                    <div className="search_map">
                                        <button className="map_view_btn" onClick={() => goMap}>{map ? <p>지도 닫기</p> : <p>지도에서 보기</p>}</button>
                                    </div>
                                    <div className="search_filter">
                                        {media === 0 &&
                                            <div className="mb_search_filter_top">
                                                <button className="mb_search_filter_btn" onClick={handleFilter}></button>
                                                <span>조건 내 검색</span>
                                            </div>
                                        }
                                        <div>
                                            <div className="price_section">
                                                <div>
                                                    <p>요금</p>
                                                    <span>
                                                        (
                                                        {
                                                            minPrice === 0 && maxPrice === 320000 ? (priceNumber(minPrice)) + ' - ' + (priceNumber(310000) + '+') :
                                                                minPrice > 0 && minPrice < 310000 && maxPrice === 320000 ? ' > ' + (priceNumber(minPrice)) :
                                                                    minPrice === 310000 && maxPrice === 320000 ? ' > ' + (priceNumber(minPrice) + '+') :
                                                                        priceRanges
                                                        }
                                                        )
                                                    </span>
                                                </div>
                                                <div className="price_range">
                                                    <ReactSlider
                                                        className="horizontal-slider"
                                                        thumbClassName="thumb"
                                                        trackClassName="track"
                                                        markClassName="mark"
                                                        defaultValue={[0, 320000]}
                                                        value={priceRange}
                                                        min={0}
                                                        max={320000}
                                                        step={10000}
                                                        onChange={priceSlider}
                                                        renderThumb={(props, state) =>
                                                            <div {...props}>
                                                                <div className="thumb_value">
                                                                    {state.valueNow === 320000 ? "310,000+" : priceNumber(state.valueNow)}
                                                                </div>
                                                            </div>} />
                                                </div>
                                                <div className="price_btn">
                                                    <button className="price_box" onClick={() => setPriceRange([0, 80000])}>0원 - 80,000원</button>
                                                    <button className="price_box" onClick={() => setPriceRange([80000, 120000])}>80,000원 - 120,000원</button>
                                                    <button className="price_box" onClick={() => setPriceRange([120000, 160000])}>120,000원 - 160,000원</button>
                                                    <button className="price_box" onClick={() => setPriceRange([160000, 220000])}>160,000원 - 220,000원</button>
                                                    <button className="price_box" onClick={() => setPriceRange([220000, 310000])}>220,000원 - 310,000원</button>
                                                    <button className="price_box" onClick={() => setPriceRange([310000, 320000])}>310,000원+</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="by_rating">
                                                <p>후기 평점</p>
                                                <div>
                                                    {[0, 1, 2, 3, 4].map((r, rateIndex) => (
                                                        <button key={rateIndex} className={`rate_box ${r === rate && 'onFilter'}`} onClick={() => rateHandle(r)}>{r + '+'}</button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="by_grade">
                                                <p>호텔 등급</p>
                                                <div>
                                                    {['1', '2', '3', '4', '5'].map((g, gradeIndex) => (
                                                        <button key={gradeIndex} className={`grade_box ${g === grade && 'onFilter'}`} onClick={() => gradeHandle(g)}>{g}</button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className={`search_cont ${map && 'map_on'}`}>

                            <div className="search_right">
                                <div className="search_map">
                                    <button className="map_view_btn" onClick={goMap}>{map ? '지도 닫기' : '지도에서 보기'}</button>
                                </div>
                                <div className="search_filter">
                                    <button className="map_on_filter_btn" onClick={handleFilter}>조건 내 검색</button>
                                </div>
                            </div>

                            <div className={`search_main`}>
                                <div className="main_top">
                                    <p>숙소 검색 결과 {copyFilteredHotels.length}개</p>
                                </div>
                                {media === 0 ?
                                    <Swiper
                                        spaceBetween={20}
                                        slidesPerView={1}
                                        loop={true}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        navigation={true}
                                        modules={[Navigation]}
                                        onSwiper={(swiper: SwiperClass) => {
                                            swiperRef.current = swiper
                                        }}
                                    >
                                        {copyFilteredHotels.map((hotel: Hotel, index: number) => (
                                            <SwiperSlide key={index}>
                                                <div className="result_box">
                                                    <div className="hotel_img" style={{ backgroundImage: `url(${hotel.img})` }}></div>
                                                    <div className="hotel_info">
                                                        <div className="hotel_title" data-hotel-id={hotel.hotelId} onClick={detailClick}>
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
                                                        <div className="hotel_rating">
                                                            <p>{hotel.review.toFixed(1)} <span>/ 5.0</span></p>
                                                            <span>+999개의 후기</span>
                                                        </div>
                                                        <div className="hotel_location">
                                                            <div className="location_icon" style={{ backgroundImage: "url('https://github.com/user-attachments/assets/b7a9fa5d-e126-47b2-835f-ae85545dbd2b')" }}></div>
                                                            <p>{hotel.region[0]} · </p>
                                                            <button onClick={(event,) => setLocation(event, hotel.lat, hotel.lng)}>지도에서 호텔보기</button>
                                                        </div>
                                                        <div className="hotel_bottom">
                                                            <div className="hotel_price_box">
                                                                <p className="check_inOut"></p>
                                                                <div className="hotel_price_cont">
                                                                    <p className="hotel_price">{priceNumber(hotel.price)}원</p>
                                                                    <span>세금 포함</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    :
                                    media === 1 ?
                                        <Swiper
                                            spaceBetween={20}
                                            slidesPerView={1.25}
                                            loop={true}
                                            pagination={{
                                                clickable: true,
                                            }}
                                            navigation={true}
                                            modules={[Navigation]}
                                            onSwiper={(swiper: SwiperClass) => {
                                                swiperRef.current = swiper
                                            }}
                                        >
                                            {copyFilteredHotels.map((hotel: Hotel, index: number) => (
                                                <SwiperSlide key={index}>
                                                    <div className="result_box" onClick={(event) => setLocation(event, hotel.lat, hotel.lng)}>
                                                        <div className="hotel_img" style={{ backgroundImage: `url(${hotel.img})` }}></div>
                                                        <div className="hotel_info">
                                                            <div className="hotel_title">
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
                                                            <div className="hotel_rating">
                                                                <p>{hotel.review.toFixed(1)} <span>/ 5.0</span></p>
                                                                <span>+999개의 후기</span>
                                                            </div>
                                                            <div className="hotel_location">
                                                                <div className="location_icon" style={{ backgroundImage: "url('https://github.com/user-attachments/assets/b7a9fa5d-e126-47b2-835f-ae85545dbd2b')" }}></div>
                                                                <p>{hotel.region[0]} · </p>
                                                                <button onClick={(event) => setLocation(event, hotel.lat, hotel.lng)}>지도에서 호텔보기</button>
                                                            </div>
                                                            <div className="hotel_bottom">
                                                                <div className="hotel_price_box">
                                                                    <p className="check_inOut"></p>
                                                                    <div className="hotel_price_cont">
                                                                        <p className="hotel_price">{priceNumber(hotel.price)}원</p>
                                                                        <span>세금 포함</span>
                                                                    </div>
                                                                    <button
                                                                        className="reservation_btn"
                                                                        data-hotel-id={hotel.hotelId}
                                                                        onClick={detailClick}
                                                                    >
                                                                        예약하러 가기
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                        :
                                        <Swiper
                                            spaceBetween={20}
                                            breakpoints={{
                                                768: { slidesPerView: 2 },
                                                1024: { slidesPerView: 2.1 },
                                                1280: { slidesPerView: 3.1 },
                                                1600: { slidesPerView: 4.1 }
                                            }}
                                            loop={true}
                                            pagination={{
                                                clickable: true,
                                            }}
                                            navigation={true}
                                            modules={[Navigation]}
                                            onSwiper={(swiper: SwiperClass) => {
                                                swiperRef.current = swiper
                                            }}
                                        >
                                            {copyFilteredHotels.map((hotel: Hotel, index: number) => (
                                                <SwiperSlide key={index}>
                                                    <div className="result_box" onClick={(event) => setLocation(event, hotel.lat, hotel.lng)}>
                                                        <div className="hotel_img" style={{ backgroundImage: `url(${hotel.img})` }}></div>
                                                        <div className="hotel_info">
                                                            <div className="hotel_title">
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
                                                            <div className="hotel_rating">
                                                                <p>{hotel.review.toFixed(1)} <span>/ 5.0</span></p>
                                                                <span>+999개의 후기</span>
                                                            </div>
                                                            <div className="hotel_location">
                                                                <div className="location_icon" style={{ backgroundImage: "url('https://github.com/user-attachments/assets/b7a9fa5d-e126-47b2-835f-ae85545dbd2b')" }}></div>
                                                                <p>{hotel.region[0]} · </p>
                                                                <button onClick={(event) => setLocation(event, hotel.lat, hotel.lng)}>지도에서 호텔보기</button>
                                                            </div>
                                                            <div className="hotel_bottom">
                                                                <div className="hotel_price_box">
                                                                    <p className="check_inOut"></p>
                                                                    <div className="hotel_price_cont">
                                                                        <p className="hotel_price">{priceNumber(hotel.price)}원</p>
                                                                        <span>세금 포함</span>
                                                                    </div>
                                                                    <button
                                                                        className="reservation_btn"
                                                                        data-hotel-id={hotel.hotelId}
                                                                        onClick={detailClick}
                                                                    >
                                                                        예약하러 가기
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                }
                            </div>
                        </div>
                    </>
                }
                {/* 지도 ON */}

                <div className={`search_cont ${map && 'close'}`}>
                    {(media > 1 || filterOn) &&
                        <div className='search_right' ref={rightFilterRef}>
                            <div className="search_map">
                                <button className="map_view_btn" onClick={goMap}>{map ? <p>지도 닫기</p> : <p>지도에서 보기</p>}</button>
                            </div>
                            <div className="search_filter">
                                <div className="search_filter_wrap">
                                    {media < 2 && <button className="mb_filter_close_btn" onClick={handleFilter}></button>}
                                    <div>
                                        <div className="price_section">
                                            <div>
                                                <p>요금</p>
                                                <span>
                                                    (
                                                    {
                                                        minPrice === 0 && maxPrice === 320000 ? (priceNumber(minPrice)) + ' - ' + (priceNumber(310000) + '+') :
                                                            minPrice > 0 && minPrice < 310000 && maxPrice === 320000 ? ' > ' + (priceNumber(minPrice)) :
                                                                minPrice === 310000 && maxPrice === 320000 ? ' > ' + (priceNumber(minPrice) + '+') :
                                                                    priceRanges
                                                    }
                                                    )
                                                </span>
                                            </div>
                                            <div className="price_range">
                                                <ReactSlider
                                                    className="horizontal-slider"
                                                    thumbClassName="thumb"
                                                    trackClassName="track"
                                                    markClassName="mark"
                                                    defaultValue={[0, 320000]}
                                                    value={priceRange}
                                                    min={0}
                                                    max={320000}
                                                    step={10000}
                                                    onChange={priceSlider}
                                                    renderThumb={(props, state) =>
                                                        <div {...props}>
                                                            <div className="thumb_value">
                                                                {state.valueNow === 320000 ? "310,000+" : priceNumber(state.valueNow)}
                                                            </div>
                                                        </div>} />
                                            </div>
                                            <div className="price_btn">
                                                <button className="price_box" onClick={() => setPriceRange([0, 80000])}>0원 - 80,000원</button>
                                                <button className="price_box" onClick={() => setPriceRange([80000, 120000])}>80,000원 - 120,000원</button>
                                                <button className="price_box" onClick={() => setPriceRange([120000, 160000])}>120,000원 - 160,000원</button>
                                                <button className="price_box" onClick={() => setPriceRange([160000, 220000])}>160,000원 - 220,000원</button>
                                                <button className="price_box" onClick={() => setPriceRange([220000, 310000])}>220,000원 - 310,000원</button>
                                                <button className="price_box" onClick={() => setPriceRange([310000, 320000])}>310,000원+</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="by_rating">
                                            <p>후기 평점</p>
                                            <div>
                                                {[0, 1, 2, 3, 4].map((r, rateIndex) => (
                                                    <button key={rateIndex} className={`rate_box ${r === rate && 'onFilter'}`} onClick={() => rateHandle(r)}>{r + '+'}</button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="by_grade">
                                            <p>호텔 등급</p>
                                            <div>
                                                {['1', '2', '3', '4', '5'].map((g, gradeIndex) => (
                                                    <button key={gradeIndex} className={`grade_box ${g === grade && 'onFilter'}`} onClick={() => gradeHandle(g)}>{g}</button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    <div className="search_main" ref={mainRef}>
                        {media < 2 && <div className="mb_alert_box"><p>＊비회원 예약 시 꼭 예약번호를 저장하세요</p></div>}
                        <div className="main_top">
                            {loading ?
                                <p>숙소 검색 결과</p>
                                :
                                <p>숙소 검색 결과 {copyFilteredHotels.length}개</p>}
                        </div>
                        <div>
                            {loading && copyFilteredHotels.length > 0 ?
                                <>
                                    <div className="result_box result_skeleton">
                                        <div className="hotel_img">
                                            <Skeleton style={{ width: '100%', height: '100%' }}></Skeleton>
                                        </div>
                                        <div className="hotel_info">
                                            <div className="hotel_title">
                                                <Skeleton style={{ width: '100%', height: '100%' }}></Skeleton>
                                            </div>
                                            <div className="hotel_rating">
                                                <Skeleton style={{ width: '100%', height: '100%' }}></Skeleton>
                                            </div>
                                            <div className="hotel_bottom">
                                                <Skeleton style={{ width: '100%', height: '100%' }}></Skeleton>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="result_box result_skeleton">
                                        <div className="hotel_img">
                                            <Skeleton style={{ width: '100%', height: '100%' }}></Skeleton>
                                        </div>
                                        <div className="hotel_info">
                                            <div className="hotel_title">
                                                <Skeleton style={{ width: '100%', height: '100%' }}></Skeleton>
                                            </div>
                                            <div className="hotel_rating">
                                                <Skeleton style={{ width: '100%', height: '100%' }}></Skeleton>
                                            </div>
                                            <div className="hotel_bottom">
                                                <Skeleton style={{ width: '100%', height: '100%' }}></Skeleton>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                :
                                copyFilteredHotels.map((hotel: Hotel, index: number) => (
                                    <div key={index} className="result_box">
                                        <div className="hotel_img">
                                            <img src={`${hotel.img}`} alt="호텔 이미지" />
                                        </div>
                                        <div className="hotel_info">
                                            <div className="hotel_title">
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
                                            <div className="hotel_rating">
                                                <p>{hotel.review.toFixed(1)} <span>/ 5.0</span></p>
                                                <span>+999개의 후기</span>
                                            </div>
                                            <div className="hotel_location">
                                                <div className="location_icon" style={{ backgroundImage: "url('https://github.com/user-attachments/assets/b7a9fa5d-e126-47b2-835f-ae85545dbd2b')" }}></div>
                                                <p>{hotel.region[0]} · </p>
                                                <button onClick={(event) => setLocation(event, hotel.lat, hotel.lng)}>지도에서 호텔보기</button>
                                            </div>
                                            <div className="hotel_bottom">
                                                <div className="hotel_price_box">
                                                    <div className="hotel_price_cont">
                                                        <p className="hotel_price">{priceNumber(hotel.price)}원</p>
                                                        <span>세금 포함</span>
                                                    </div>
                                                    <button
                                                        className="reservation_btn"
                                                        data-hotel-id={hotel.hotelId}
                                                        onClick={detailClick}
                                                    >
                                                        예약하러 가기
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div >
                {/* 지도 OFF */}
            </div >
        </>
    );
}

export default MainSearch;
