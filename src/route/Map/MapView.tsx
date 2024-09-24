import React, { useCallback, useEffect, useState } from "react";
import './MapView.css'
import { GoogleMap, OverlayView, OverlayViewF, MarkerF } from '@react-google-maps/api';
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultLat, defaultLng, defaultMap, defaultZoom, filterDataState, filteredHotelSelector, Hotel, hotelDataState, mapSlideIndexState, mediaState, searchResultDataState } from "../../recoil";
import { useNavigate } from "react-router-dom";
import { centerDistanceState, mapCenterLatState, mapCenterLngState } from "../../MapState";
import { throttle } from "lodash";

interface MapViewComponent {
    copyFilteredHotels: Hotel[]; // copyFilteredHotels의 타입을 정의합니다.
}
const MapView: React.FC<MapViewComponent> = ({ copyFilteredHotels }) => {
    const navigate = useNavigate()

    const [hotelBoxId, setHotelBoxId] = useState<number | null>(null)
    const [hotelBoxTime, setHotelBoxTime] = useState<NodeJS.Timeout | null>(null)
    const [maps, setMaps] = useState<google.maps.Map | null>(null)

    const [map, setMap] = useRecoilState<boolean>(defaultMap)
    const [slideIndex, setSlideIndex] = useRecoilState<number>(mapSlideIndexState)
    const [filteredHotels, setFilteredHotels] = useRecoilState<Hotel[]>(searchResultDataState);
    const allHotels = useRecoilValue(filteredHotelSelector)

    const hotels = useRecoilValue(filterDataState)
    const zoom = useRecoilValue(defaultZoom)

    const [lat, setLat] = useRecoilState(defaultLat)
    const [lng, setLng] = useRecoilState(defaultLng)
    const [center, setCenter] = useState({ lat: lat, lng: lng });

    const media = useRecoilValue(mediaState)
    const [centerLat, setCenterLat] = useRecoilState<number>(mapCenterLatState)
    const [centerLng, setCenterLng] = useRecoilState<number>(mapCenterLngState)
    const [mapCenter, setMapCenter] = useState({ lat: mapCenterLatState, lng: mapCenterLngState });
    const [distance, setDistance] = useRecoilState<number>(centerDistanceState)

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
        // console.log(id)
    }

    // 지도가 로드될 때 map 객체 저장
    const handleMapLoad = (m: google.maps.Map) => {
        setMaps(m)
    }

    const onCenterChanged = useCallback(() => { // state로 maps가 받아져 있기때문에 객체를 받지 않음.
        if (maps) {
            const newCenter = maps.getCenter()?.toJSON();  // 중앙 좌표를 가져옴
            if (newCenter) {
                setCenterLat(newCenter.lat)
                setCenterLng(newCenter.lng)
            }
        }
    }, [maps]);

    useEffect(() => {
        return () => {
            if (hotelBoxTime) {
                clearTimeout(hotelBoxTime)
            }
        }
    }, [hotelBoxTime])


    useEffect(() => {
        const mapInstance = maps
        if (mapInstance) {
            maps.panTo({ lat, lng })
        }
    }, [lat, lng])
    // 구글 화면 이동, 처리해주지 않으면 이동안함.

    const calculateDistance = useCallback(() => {
        if (map && google.maps.geometry) {
            const centerLatLng = new google.maps.LatLng(centerLat, centerLng);
            Object.values(filteredHotels).flat().forEach(overlay => {

                const overlayLatLng = new google.maps.LatLng(overlay.lat, overlay.lng)

                const distance = google.maps.geometry.spherical.computeDistanceBetween(centerLatLng, overlayLatLng);
                console.log(distance)

                setDistance(distance)

            })
        }
    }, []);

    useEffect(() => {
        throttle(() => {
            calculateDistance();
        }, 500)
    }, [centerLat])
    return (
        <div className="map_wrap">
            <GoogleMap mapContainerStyle={{ height: "100%", width: "100%" }} // 지도의 크기 설정
                zoom={zoom} // 초기 줌 레벨 설정
                center={center}
                options={{
                    gestureHandling: "greedy", // 사용자가 의도한 제스처에만 반응하도록 설정
                    disableDefaultUI: true, // 기본 UI 비활성화
                    keyboardShortcuts: false, // 키보드 단축키 비활성화
                    clickableIcons: false, // 아이콘 클릭 비활성화
                }}
                onLoad={handleMapLoad}
            >
                <>
                    {copyFilteredHotels.map((hotels, hotelIndex) => (
                        <OverlayViewF
                            key={hotelIndex}
                            position={{ lat: hotels.lat, lng: hotels.lng }}
                            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                        >
                            <div className={`hotel_marker ${slideIndex === hotelIndex && 'hover_on'}`}
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
                    ))}
                </>

            </GoogleMap>
        </div >
    )
}

export default MapView