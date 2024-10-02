import React, { useCallback, useEffect, useRef, useState } from "react";
import './MapView.css'
import { GoogleMap, OverlayView, OverlayViewF, MarkerF } from '@react-google-maps/api';
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultLat, defaultLng, defaultMap, defaultZoom, filterDataState, filteredHotelSelector, Hotel, hotelDataState, mapSlideIndexState, mediaState, searchResultDataState } from "../../recoil";
import { useNavigate } from "react-router-dom";
import { currentZoomState, mapCenterLatState, mapCenterLngState } from "../../MapState";
import { debounce, throttle } from "lodash";
import { motion } from 'framer-motion';
import { useSpring, animated, useSprings } from '@react-spring/web';

interface MapViewComponent {
    copyFilteredHotels: Hotel[]; // copyFilteredHotels의 타입을 정의합니다.
}
const MapView: React.FC<MapViewComponent> = ({ copyFilteredHotels }) => {
    const navigate = useNavigate()

    const [hotelBoxId, setHotelBoxId] = useState<number | null>(null)
    const [hotelBoxTime, setHotelBoxTime] = useState<NodeJS.Timeout | null>(null)
    const [maps, setMaps] = useState<google.maps.Map | null>(null)
    const [overlayHotels, setOverlayHotels] = useState<Hotel[]>([])
    const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)


    const [map, setMap] = useRecoilState<boolean>(defaultMap)

    const hotels = useRecoilValue(filterDataState)
    const [zoom, setZoom] = useRecoilState(defaultZoom)

    const [currentZoom, setCurrentZoom] = useRecoilState<number>(currentZoomState);
    const [lat, setLat] = useRecoilState(defaultLat)
    const [lng, setLng] = useRecoilState(defaultLng)
    const [center, setCenter] = useState({ lat: lat, lng: lng });

    const [centerLat, setCenterLat] = useRecoilState(mapCenterLatState)
    const [centerLng, setCenterLng] = useRecoilState(mapCenterLngState)
    const [mapCenter, setMapCenter] = useState({ lat: centerLat, lng: centerLng });
    const media = useRecoilValue(mediaState)

    const centerRef = useRef(center)
    // state



    const formatPrice = (value: number) => {
        return new Intl.NumberFormat('ko-KR').format(value);
    }

    const hotelBoxEnter = (id: number | null, event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation();

        if (media > 2) {
            if (hotelBoxTime) {
                clearTimeout(hotelBoxTime)
            }
            if (hotelBoxId !== id) {
                setHotelBoxId(id)
            }
        }
    }

    const hotelBoxOut = () => {
        const outTime = setTimeout(() => {
            setHotelBoxId(null)
        }, 500);

        setHotelBoxTime(outTime)
    }

    const hotelBoxClick = (id: number) => {
        setHotelBoxId(id)
        setMap(false)
        navigate(`/detail?query=${'0' + (id + 1)}`)
    }

    const handleMapLoad = (m: google.maps.Map) => {
        setMaps(m)
    }// 지도가 로드될 때 map 객체 저장

    const overlayDistance = (newCenter: { lat: number, lng: number }) => {
        const maxDistance = 500000;
        const hotels = copyFilteredHotels.filter(hotel => {
            const hotelPosition = new google.maps.LatLng(hotel.lat, hotel.lng);
            const centerPosition = new google.maps.LatLng(newCenter.lat, newCenter.lng);

            const distance = google.maps.geometry.spherical.computeDistanceBetween(centerPosition, hotelPosition)
            return distance <= maxDistance
        })
        setOverlayHotels(hotels)
    }

    const throttleOverlay = useCallback(
        debounce((newCenter: { lat: number, lng: number }) => {
            overlayDistance(newCenter)
        }, 1000), []
    )

    const onCenterChanged = useCallback(() => {// state로 maps가 받아져 있기때문에 객체를 받지 않음.
        if (maps) {
            const newCenter = maps.getCenter()?.toJSON();  // 중앙 좌표를 가져옴
            if (newCenter) {
                // 좌표가 달라질 때만 실행
                if (newCenter.lat !== centerRef.current.lat || newCenter.lng !== centerRef.current.lng) {
                    centerRef.current = newCenter
                    setMapCenter(newCenter)
                    throttleOverlay(newCenter)
                }
            }
        }
    }, [maps, throttleOverlay]);


    const onZoomChanged = useCallback(debounce(() => {
        if (maps) {
            const newZoom = maps.getZoom();
            if (newZoom) {
                setCurrentZoom(newZoom)
            }
        }
    }, 500), [maps])

    const zoomHandle = useCallback(() => {
        if (maps) {
            google.maps.event.addListener(maps, 'zoom_changed', onZoomChanged);
        }
    }, [maps, onZoomChanged])

    // 같은 방법이지만, loadash 기능을 사용하기 위해 useCallback 두 개로 분리.

    // useEffect(() => {
    //     if (maps) {
    //         google.maps.event.addListener(maps, 'zoom_changed', () => {
    //             const newZoom = maps.getZoom();
    //             console.log('Zoom level changed:', newZoom);
    //             if (newZoom) {
    //                 setCurrentZoom(newZoom); // 상태 업데이트
    //             }
    //         });
    //     }
    // }, [maps])

    const countryCenterPosition: { [key: string]: { lat: number, lng: number } } =
    {
        "대한민국": { lat: 37.5665, lng: 126.9780 },  // 서울
        "서울": { lat: 37.5665, lng: 126.9780 },  // 서울
        "부산": { lat: 35.1796, lng: 129.0756 },  // 부산
        "제주": { lat: 33.4996, lng: 126.5312 },  // 제주

        "일본": { lat: 37, lng: 137.3 },  // 도쿄
        "도쿄": { lat: 35.682839, lng: 139.759455 },  // 도쿄
        "오사카": { lat: 34.6937, lng: 135.5023 },
        "홋카이도": { lat: 43.0642, lng: 141.3469 },

        "필리핀": { lat: 14.5995, lng: 120.9842 },  // 마닐라
        "마닐라": { lat: 14.5995, lng: 120.9842 },  // 마닐라
        "세부": { lat: 10.3157, lng: 123.8854 },
        "라푸라푸 시티": { lat: 10.3050, lng: 123.9560 },

        "태국": { lat: 16.7563, lng: 100.5018 },  // 방콕
        "방콕": { lat: 13.7563, lng: 100.5018 },  // 방콕
        "파타야": { lat: 12.9289, lng: 100.8850 },
        //  hotelData.js의 country 필드와 이름이 같아야 함
    } // 오버레이 포지션

    const hotelByCoutry = copyFilteredHotels.reduce((acc: { [key: string]: Hotel[] }, hotel) => {
        if (!acc[hotel.country]) {
            acc[hotel.country] = [];
        }
        acc[hotel.country].push(hotel);
        return acc;
    }, {}) // 나라 별 오버레이 객체

    const hotelByRegion = copyFilteredHotels.reduce((acc: { [key: string]: Hotel[] }, hotel) => {
        if (!acc[hotel.region[0]]) {
            acc[hotel.region[0]] = [];
        }
        acc[hotel.region[0]].push(hotel);
        return acc;
    }, {}) // 국가 별 오버레이 객체

    const hotelByObject = currentZoom < 7 ? Object.keys(hotelByCoutry) : Object.keys(hotelByRegion);
    // 줌 레벨에 따른 데이터 

    const [springs, api] = useSprings(hotelByObject.length, () => ({ // hotelByObject 배열의 길이에 따른 Springs
        background: 'linear-gradient(45deg, #0b59ff, #5900FF)',
        scale: 1,
        config: { tension: 300, friction: 10 },
    }))

    const handleSpringEnter = (index: number) => {
        api.start((i) => i === index ? { background: 'linear-gradient(45deg, #5900FF, #0b59ff)', scale: 1.1 } : {})
    } // 오버레이 마우스 진입

    const handleSpringLeave = (index: number) => {
        api.start((i) => i === index ? { background: 'linear-gradient(45deg, #0b59ff, #5900FF)', scale: 1 } : {})
    } // 오버레이 마우스 퇴장

    const handleOverlayClick = (mlat: number, mlng: number) => {
        if (currentZoom < 7) {
            setZoom((prev) => (prev === 9 ? 9.1 : 9))
            // 조금씩 차이를 주어야 변경됨
        } else {
            setZoom((prev) => (prev === 12 ? 12.1 : 12))
        }
        setLat((prev) => (prev === mlat - 0.0005) ? mlat - 0.00050001 : mlat - 0.0005)
        setLng((prev) => (prev === (mlng + 0.0005)) ? mlng + 0.00050001 : mlng + 0.0005)
        console.log(mlat, mlng)
    }
    useEffect(() => {
        console.log('Zoom Changed', currentZoom)
    }, [currentZoom]) // 줌 레벨 확인

    useEffect(() => {
        return () => {
            if (hotelBoxTime) {
                clearTimeout(hotelBoxTime)
            }
        }
    }, [hotelBoxTime])


    useEffect(() => {
        if (maps) {
            maps.panTo({ lat, lng })
        }
    }, [lat, lng])
    // 구글 화면 이동, 처리해주지 않으면 이동안함.


    return (
        <div className="map_wrap">
            <GoogleMap mapContainerStyle={{ height: "100%", width: "100%" }} // 지도의 크기 설정
                zoom={zoom} // 초기 줌 레벨 설정
                center={center}
                options={{
                    minZoom: 5,
                    maxZoom: 18,
                    gestureHandling: "greedy", // 사용자가 의도한 제스처에만 반응하도록 설정
                    disableDefaultUI: true, // 기본 UI 비활성화
                    keyboardShortcuts: false, // 키보드 단축키 비활성화
                    clickableIcons: false, // 아이콘 클릭 비활성화
                }}
                onLoad={handleMapLoad}
                onCenterChanged={onCenterChanged}
                onZoomChanged={zoomHandle}
            >
                <>
                    {
                        // 나라 별 오버레이
                        currentZoom < 7 ?
                            <>
                                {
                                    Object.keys(hotelByCoutry).map((country, countryIndex) => {
                                        const hotelInCountry = hotelByCoutry[country];
                                        const hotelCount = hotelInCountry.length;
                                        const countryCenter = countryCenterPosition[country];

                                        // react-spring 스타일
                                        if (hotelCount > 0) {
                                            // 구글 맵에 마커 추가 (나라 중심에 호텔 수 표시)
                                            return (
                                                <OverlayViewF
                                                    key={country}
                                                    position={{ lat: countryCenter.lat, lng: countryCenter.lng }}
                                                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                                                >
                                                    <animated.div
                                                        style={
                                                            springs[countryIndex]
                                                        }
                                                        onMouseEnter={() =>
                                                            handleSpringEnter(countryIndex)
                                                        }
                                                        onMouseLeave={() =>
                                                            handleSpringLeave(countryIndex)
                                                        }
                                                        onClick={() => handleOverlayClick(countryCenter.lat, countryCenter.lng)}
                                                        className="country_overlay"
                                                    >
                                                        <p>{hotelCount}</p>
                                                    </animated.div>
                                                </OverlayViewF>
                                            );
                                        }
                                        return null;
                                    })
                                }
                            </>
                            :
                            // 지역 별 오버레이
                            currentZoom >= 7 && currentZoom < 12 ?
                                <>
                                    {
                                        Object.keys(hotelByRegion).map((region, regionIndex) => {
                                            const hotelInRegion = hotelByRegion[region];
                                            const hotelCount = hotelInRegion.length;
                                            const hotelPosition = countryCenterPosition[region]
                                            // react-spring 스타일
                                            if (hotelCount > 0) {
                                                return (
                                                    <OverlayViewF
                                                        key={region}
                                                        position={{ lat: hotelPosition.lat, lng: hotelPosition.lng }}
                                                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                                                        <animated.div
                                                            style={
                                                                springs[regionIndex]
                                                            }
                                                            onMouseEnter={() =>
                                                                handleSpringEnter(regionIndex)
                                                            }
                                                            onMouseLeave={() =>
                                                                handleSpringLeave(regionIndex)
                                                            }
                                                            onClick={() => handleOverlayClick(hotelPosition.lat, hotelPosition.lng)}
                                                            className="region_overlay"
                                                        >
                                                            <p>{hotelCount}</p>
                                                        </animated.div>
                                                    </OverlayViewF>
                                                )
                                            }

                                        })
                                    }
                                </>
                                :
                                // 호텔 별 오버레이
                                <>
                                    {
                                        overlayHotels.map((hotels, hotelIndex) => (
                                            <OverlayViewF
                                                key={hotelIndex}
                                                position={{ lat: hotels.lat, lng: hotels.lng }}
                                                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                                            >
                                                <div className='hotel_marker'
                                                    onMouseEnter={(e) => hotelBoxEnter(hotelIndex, e)}
                                                    onMouseLeave={hotelBoxOut}
                                                    onClick={() => hotelBoxClick(hotelIndex)}
                                                    data-marker-id={hotels.hotelId}
                                                >
                                                    <p>{formatPrice(hotels.price)}원</p>
                                                    {hotelBoxId === hotelIndex &&
                                                        <div className="hotel_map_box">
                                                            <div style={{ backgroundImage: `url(${hotels.img})` }}></div>
                                                            <div>
                                                                <div>
                                                                    <p>{hotels.title}</p>
                                                                    <div className="hotel_map_grade">
                                                                        {hotels.grade === '2'
                                                                            ?
                                                                            <>
                                                                                <div style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5")' }}></div>
                                                                                <div style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5")' }}></div>
                                                                            </>
                                                                            : hotels.grade === '3' ?
                                                                                <>
                                                                                    <div style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5")' }}></div>
                                                                                    <div style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5")' }}></div>
                                                                                    <div style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5")' }}></div>
                                                                                </>
                                                                                : hotels.grade === '4' ?
                                                                                    <>
                                                                                        <div style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5")' }}></div>
                                                                                        <div style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5")' }}></div>
                                                                                        <div style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5")' }}></div>
                                                                                        <div style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5")' }}></div>
                                                                                    </>
                                                                                    : hotels.grade === '5' ?
                                                                                        <>
                                                                                            <div style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5")' }}></div>
                                                                                            <div style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5")' }}></div>
                                                                                            <div style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5")' }}></div>
                                                                                            <div style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5")' }}></div>
                                                                                            <div style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5")' }}></div>
                                                                                        </>
                                                                                        : <div style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5")' }}></div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div>
                                                                        <p>{hotels.review.toFixed(1)}</p>
                                                                        <span>/ 5.0</span>
                                                                    </div>
                                                                    <p>이용자 리뷰 +999개</p>
                                                                </div>
                                                                <div>
                                                                    <p>{formatPrice(hotels.price)}원</p>
                                                                    <span>1박 당 객실요금 ( 세금 포함 )</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                    <span className="outer_triangle">
                                                        <span className="triangle"></span>
                                                    </span>
                                                </div>
                                            </OverlayViewF>
                                        ))
                                    }
                                </>
                    }
                </>

            </GoogleMap>
        </div >
    )
}

export default MapView