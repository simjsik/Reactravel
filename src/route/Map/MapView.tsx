import React, { useCallback, useEffect, useRef, useState } from "react";
import './MapView.css'
import { GoogleMap, OverlayView, OverlayViewF, MarkerF } from '@react-google-maps/api';
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultLat, defaultLng, defaultMap, defaultZoom, filterDataState, filteredHotelSelector, Hotel, hotelDataState, mapSlideIndexState, mediaState, searchResultDataState } from "../../recoil";
import { useNavigate } from "react-router-dom";
import { mapCenterLatState, mapCenterLngState } from "../../MapState";
import { debounce, throttle } from "lodash";

interface MapViewComponent {
    copyFilteredHotels: Hotel[]; // copyFilteredHotels의 타입을 정의합니다.
}
interface count {
    seoul: position,
    busan: position
}
interface position {
    lat: number,
    lng: number,
    count: number
}
const MapView: React.FC<MapViewComponent> = ({ copyFilteredHotels }) => {
    const navigate = useNavigate()

    const [hotelBoxId, setHotelBoxId] = useState<number | null>(null)
    const [hotelBoxTime, setHotelBoxTime] = useState<NodeJS.Timeout | null>(null)
    const [maps, setMaps] = useState<google.maps.Map | null>(null)
    const [overlayHotels, setOverlayHotels] = useState<Hotel[]>([])

    const [map, setMap] = useRecoilState<boolean>(defaultMap)
    const [slideIndex, setSlideIndex] = useRecoilState<number>(mapSlideIndexState)
    const [filteredHotels, setFilteredHotels] = useRecoilState<Hotel[]>(searchResultDataState);
    const allHotels = useRecoilValue(filteredHotelSelector)

    const hotels = useRecoilValue(filterDataState)
    const zoom = useRecoilValue(defaultZoom)

    const [currentZoom, setCurrentZoom] = useState(10);
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
        // console.log(id)
    }

    // 지도가 로드될 때 map 객체 저장
    const handleMapLoad = (m: google.maps.Map) => {
        setMaps(m)
    }

    const hotelCounts = [
        {
            seoul:
            {
                lat: 37.5, lng: 126.7, count: 2
            }
            ,
            busan:
            {
                lat: 35.1, lng: 129.16, count: 1
            }

        }
    ]


    const overlayDistance = (newCenter: { lat: number, lng: number }) => {
        const maxDistance = 100000;
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


    const onZoomChanged = useCallback(() => {
        if (maps) {
            const newZoom = maps.getZoom();
            if (typeof newZoom === 'number' && !Number.isNaN(newZoom)) {
                setCurrentZoom(newZoom)
            }
            console.log(newZoom)
        }
    }, [maps])

    const zoomHandle = useCallback(() => {
        if (maps) {
            google.maps.event.addListener(maps, 'zoom_changed', () => onZoomChanged);
        }
    }, [maps, onZoomChanged])

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
                    {overlayHotels.map((hotels, hotelIndex) => (
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
                    {overlayHotels.length === 0 &&
                        <div>
                            {hotelCounts.map((count: count, countIndex) => (
                                <>
                                    <OverlayViewF
                                        key={countIndex}
                                        position={{ lat: count.seoul.lat, lng: count.seoul.lng }}
                                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                                    >
                                    </OverlayViewF>
                                </>
                            ))}
                        </div>
                    }
                </>

            </GoogleMap>
        </div >
    )
}

export default MapView