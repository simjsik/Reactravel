import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
// import { Swiper as SwiperClass } from 'swiper/types';
import 'swiper/css';
import './MainHome.css'
import MainFinder from "./MainFinder";
import { finderState, Hotel, hotelDataState, mediaState, modalState, searchTermState } from "../../recoil";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
const MainHome: React.FC = () => {
    const navigate = useNavigate();

    const [finderOn, setFinderOn] = useRecoilState<boolean>(finderState)
    const [modal, setModal] = useRecoilState<boolean>(modalState)
    const [searchTerm, setSearchTerm] = useRecoilState(searchTermState)

    const hotels = useRecoilValue(hotelDataState)
    const media = useRecoilValue(mediaState)

    const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
    const [hotpicHotels, setHotpicHotels] = useState<any[]>([])
    const hotelRegion = ['한국', '일본', '태국', '필리핀']

    const koreaSlice = []
    koreaSlice.push(hotels.slice(0, 3));

    const japanSlice = []
    japanSlice.push(hotels.slice(4, 7));

    const thaiSlice = []
    thaiSlice.push(hotels.slice(8, 11));

    const philSlice = []
    philSlice.push(hotels.slice(12, 15));
    // 호텔 3개씩만


    const formatPrice = (value: number) => {
        return new Intl.NumberFormat('ko-KR').format(value)
    }
    const goSearch = (id: null | string) => {
        if (id === null) {
            navigate(`/search?query=${id}`)
        } else {
            navigate(`/search?query=`)
            setSearchTerm(id)
        }
    }
    // 검색 이동

    const handleHomeHotel = (event: React.MouseEvent<HTMLDivElement>) => {
        const id = event.currentTarget.getAttribute('hotpic-id')
        navigate(`/detail?query=${id}`)
    }
    // 검색 이동


    const handleFinder = () => {
        setFinderOn((prev) => !prev)
        setModal((prev) => !prev)
    }


    useEffect(() => {
        // 로딩 스켈레톤
        const fishedHotels = [...hotels]
        const hotpicSlice: any[] = [];

        for (let i = fishedHotels.length - 1; i > 0; i--) {
            const array = Math.floor(Math.random() * (i + 1));
            [fishedHotels[i], fishedHotels[array]] = [fishedHotels[array], fishedHotels[i]];
        }

        const randomHotels = fishedHotels.slice(0, 9)

        for (let i = 0; i < randomHotels.length; i += 3) {
            hotpicSlice.push(randomHotels.slice(i, i + 3));
        }


        setTimeout(() => {
            setHotpicHotels(hotpicSlice);
            setLoading(false); // 로딩 완료
        }, 3000); // 2초 후에 로딩 완료로 설정
        // 랜덤 호텔

    }, [hotels])
    return (
        <>
            <section className="home_wrap">
                {media < 2 && finderOn &&
                    <div className="mb_finder_wrap">
                        <button className="mb_finder_close_btn" onClick={handleFinder}></button>
                        <MainFinder />
                    </div>
                }
                <div className="home_top">
                    <h3>새로운 세상을 리액트립과 함께 즐겨보세요.</h3>
                    {media < 2 &&
                        <div className="mb_finder_btn_wrap">
                            <div className="mb_finder_btn" onClick={handleFinder}>
                                <div className="mb_finder_btn_icon">

                                </div>
                                <p>도시, 호텔 또는 랜드마크</p>
                            </div>
                        </div>
                    }
                    {media > 1 &&
                        <MainFinder />
                    }
                </div>
            </section >
            <section id="homeVisual">
                <div className="home_bg">
                    <div className="home_cont">
                        <div className="month_event">
                            <p>이달의 혜택</p>
                            <div className="event_wrap">

                                <Swiper
                                    spaceBetween={20}
                                    breakpoints={{
                                        480: {
                                            slidesPerView: 1,
                                            spaceBetween: 25
                                        },
                                        768: {
                                            slidesPerView: 3,
                                            spaceBetween: 10
                                        },
                                    }}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    navigation={true}
                                    modules={[Navigation, Autoplay]}
                                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                                >
                                    {loading
                                        ?
                                        Array.from({ length: 3 }).map((_, idx) => (
                                            <SwiperSlide>
                                                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: '100%' }}>
                                                    <div className="event_skeleton" style={{ flex: '1 0 24%', display: 'block', height: '100%' }}>
                                                        <Skeleton style={{ width: '100%', height: '100%' }} />
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        )) :
                                        <>
                                            <SwiperSlide>
                                                <div className="event_box">
                                                    <img src="https://github.com/user-attachments/assets/cad73db3-6c69-47f2-a6cc-e6abcdf88419" alt="이벤트 배너" />
                                                    <div className="event_box_dark"></div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="event_box">
                                                    <img src="https://github.com/user-attachments/assets/0308278b-1b30-4c17-83cb-0a333bac5d0b" alt="이벤트 배너" />
                                                    <div className="event_box_dark"></div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="event_box">
                                                    <img src="https://github.com/user-attachments/assets/c7a7740f-75cc-4b17-859f-b390df4ffc80" alt="이벤트 배너" />
                                                    <div className="event_box_dark"></div>
                                                </div>
                                            </SwiperSlide>
                                        </>
                                    }
                                </Swiper>
                            </div>
                        </div>
                        <div className="hotpic">
                            <p>요즘 인기 호텔 및 숙소</p>
                            <div className="hotpic_wrap">
                                <Swiper
                                    breakpoints={{
                                        480: {
                                            slidesPerView: 1,
                                            spaceBetween: 20
                                        },
                                    }}
                                    loop={true}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    navigation={true}
                                    modules={[Navigation]}
                                >
                                    {loading
                                        ?
                                        Array.from({ length: 1 }).map((_, idx) => (
                                            <SwiperSlide key={`loading_skeleton_${idx}`}>
                                                {media === 0 ?
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                                        <div className="hotpic_skeleton" style={{ flex: '1 0 24%', display: 'block', height: '100%' }}>
                                                            <Skeleton style={{ width: '100%', height: '100%' }} />
                                                        </div>
                                                        <div className="hotpic_skeleton" style={{ flex: '1 0 24%', display: 'block', height: '100%' }}>
                                                            <Skeleton style={{ width: '100%', height: '100%' }} />
                                                        </div>
                                                    </div>
                                                    : media === 1 ?
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                                            <div className="hotpic_skeleton" style={{ flex: '1 0 24%', display: 'block', height: '100%' }}>
                                                                <Skeleton style={{ width: '100%', height: '100%' }} />
                                                            </div>
                                                            <div className="hotpic_skeleton" style={{ flex: '1 0 24%', display: 'block', height: '100%' }}>
                                                                <Skeleton style={{ width: '100%', height: '100%' }} />
                                                            </div>
                                                            <div className="hotpic_skeleton" style={{ flex: '1 0 24%', display: 'block', height: '100%' }}>
                                                                <Skeleton style={{ width: '100%', height: '100%' }} />
                                                            </div>
                                                        </div>
                                                        :
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                                            <div className="hotpic_skeleton" style={{ flex: '1 0 24%', display: 'block', height: '100%' }}>
                                                                <Skeleton style={{ width: '100%', height: '100%' }} />
                                                            </div>
                                                            <div className="hotpic_skeleton" style={{ flex: '1 0 24%', display: 'block', height: '100%' }}>
                                                                <Skeleton style={{ width: '100%', height: '100%' }} />
                                                            </div>
                                                            <div className="hotpic_skeleton" style={{ flex: '1 0 24%', display: 'block', height: '100%' }}>
                                                                <Skeleton style={{ width: '100%', height: '100%' }} />
                                                            </div>
                                                            <div className="hotpic_skeleton" style={{ flex: '1 0 24%', display: 'block', height: '100%' }}>
                                                                <Skeleton style={{ width: '100%', height: '100%' }} />
                                                            </div>
                                                        </div>
                                                }

                                            </SwiperSlide>
                                        )) :
                                        hotpicHotels.map((hotpic: Hotel[], hotpicIndex) => (
                                            <SwiperSlide key={`hotpic_${hotpicIndex}`}>
                                                {hotpic.map((hottels, hottelsIndex) => (
                                                    <div key={`hotpic_box_${hottelsIndex}`}
                                                        className="hotpic_box" hotpic-id={hottels.hotelId}
                                                        onClick={handleHomeHotel}
                                                    >
                                                        <div style={{ backgroundImage: `url(${hottels.img})` }}>
                                                            <div className="hotpic_bg"></div>
                                                        </div>
                                                        <div className="hotpic_text">
                                                            <p>{hottels.title}</p>
                                                            <div className="hotpic_grade">
                                                                {hottels.grade === '2' ?
                                                                    <>
                                                                        <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                                        <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                                    </>
                                                                    : hottels.grade === '3' ?
                                                                        <>
                                                                            <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                                            <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                                            <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                                        </>
                                                                        : hottels.grade === '4' ?
                                                                            <>
                                                                                <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                                                <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                                                <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                                                <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                                            </>
                                                                            : hottels.grade === '5' ?
                                                                                <>
                                                                                    <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                                                    <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                                                    <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                                                    <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                                                    <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>
                                                                                </>
                                                                                : <div style={{ backgroundImage: "url('https://github.com/user-attachments/assets/17543e67-901c-4023-a3d6-12a0cec324b5')" }}></div>}
                                                            </div>
                                                            <div className="hotpic_price">
                                                                <p>{formatPrice(hottels.price)}원</p>
                                                                <span>최저가</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className='hotpic_main'>
                                                    <div className="hotpic_bg"></div>
                                                    <div className="main_text_box">
                                                        <p>전국 초특가 호텔</p>
                                                        <button onClick={() => goSearch(null)}>호텔 보러가기</button>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                </Swiper>
                            </div>
                        </div>
                        <div className="most_travel">
                            <p>최근 많이 찾는 여행지</p>
                            <div className="most_wrap">

                                <Swiper
                                    breakpoints={{
                                        480: {
                                            slidesPerView: 1,
                                            spaceBetween: 20
                                        },
                                    }}
                                    loop={true}
                                    navigation={true}
                                    modules={[Navigation]}
                                >
                                    {loading
                                        ?
                                        Array.from({ length: 1 }).map((_, idx) => (
                                            <SwiperSlide key={`loading_skeleton_${idx}`}>
                                                {media === 0 ?
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                                        <div className="most_skeleton" style={{ flex: '1 0 24%', display: 'block', height: '100%' }}>
                                                            <Skeleton style={{ width: '100%', height: '100%' }} />
                                                        </div>
                                                        <div className="most_skeleton" style={{ flex: '1 0 24%', display: 'block', height: '100%' }}>
                                                            <Skeleton style={{ width: '100%', height: '100%' }} />
                                                        </div>
                                                    </div>
                                                    : media === 1 ?
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                                            <div className="most_skeleton" style={{ flex: '1 0 24%', display: 'block', height: '100%' }}>
                                                                <Skeleton style={{ width: '100%', height: '100%' }} />
                                                            </div>
                                                            <div className="most_skeleton" style={{ flex: '1 0 24%', display: 'block', height: '100%' }}>
                                                                <Skeleton style={{ width: '100%', height: '100%' }} />
                                                            </div>
                                                            <div className="most_skeleton" style={{ flex: '1 0 24%', display: 'block', height: '100%' }}>
                                                                <Skeleton style={{ width: '100%', height: '100%' }} />
                                                            </div>
                                                        </div>
                                                        :
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                                            <div className="most_skeleton" style={{ flex: '1 0 24%', display: 'block', height: '100%' }}>
                                                                <Skeleton style={{ width: '100%', height: '100%' }} />
                                                            </div>
                                                            <div className="most_skeleton" style={{ flex: '1 0 24%', display: 'block', height: '100%' }}>
                                                                <Skeleton style={{ width: '100%', height: '100%' }} />
                                                            </div>
                                                            <div className="most_skeleton" style={{ flex: '1 0 24%', display: 'block', height: '100%' }}>
                                                                <Skeleton style={{ width: '100%', height: '100%' }} />
                                                            </div>
                                                            <div className="most_skeleton" style={{ flex: '1 0 24%', display: 'block', height: '100%' }}>
                                                                <Skeleton style={{ width: '100%', height: '100%' }} />
                                                            </div>
                                                        </div>
                                                }
                                            </SwiperSlide>
                                        )) :
                                        <>
                                            {koreaSlice.map((korea, koreaIndex) => (
                                                <SwiperSlide key={`korea_${koreaIndex}`}>
                                                    {hotelRegion && <div className="most_main korea">
                                                        <div className="most_bg"></div>
                                                        <div className="main_text_box">
                                                            <p>{hotelRegion[0]}</p>
                                                            <button onClick={() => goSearch('대한민국')}>호텔 보러가기</button>
                                                        </div>
                                                    </div>}
                                                    {korea.map((koreaBox, koreaBoxIndex) => (
                                                        <div key={`koreaBox_${koreaBoxIndex}`} className="most_box">
                                                            <div style={{ backgroundImage: `url(${koreaBox.img})` }}>
                                                                <div className="most_bg"></div>
                                                            </div>
                                                            <p>{koreaBox.region[0]} · {koreaBox.region[1]}</p>
                                                        </div>
                                                    ))}
                                                </SwiperSlide>
                                            ))}
                                            {japanSlice.map((japan, japanIndex) => (
                                                <SwiperSlide key={`japan_${japanIndex}`}>
                                                    {hotelRegion && <div className="most_main japan">
                                                        <div className="most_bg"></div>
                                                        <div className="main_text_box">
                                                            <p>{hotelRegion[1]}</p>
                                                            <button onClick={() => goSearch('일본')}>호텔 보러가기</button>
                                                        </div>
                                                    </div>}
                                                    {japan.map((japanBox, japanBoxIndex) => (
                                                        <div key={`japanBox_${japanBoxIndex}`} className="most_box">
                                                            <div style={{ backgroundImage: `url(${japanBox.img})` }}>
                                                                <div className="most_bg"></div>
                                                            </div>
                                                            <p>{japanBox.region[0]} · {japanBox.region[1]}</p>
                                                        </div>
                                                    ))}
                                                </SwiperSlide>
                                            ))}
                                            {thaiSlice.map((thai, thaiIndex) => (
                                                <SwiperSlide key={`thai_${thaiIndex}`}>
                                                    {hotelRegion && <div className="most_main thai">
                                                        <div className="most_bg"></div>
                                                        <div className="main_text_box">
                                                            <p>{hotelRegion[2]}</p>
                                                            <button onClick={() => goSearch('태국')}>호텔 보러가기</button>
                                                        </div>
                                                    </div>}
                                                    {thai.map((thaiBox, thaiBoxIndex) => (
                                                        <div key={`thaiBox_${thaiBoxIndex}`} className="most_box">
                                                            <div style={{ backgroundImage: `url(${thaiBox.img})` }}>
                                                                <div className="most_bg"></div>
                                                            </div>
                                                            <p>{thaiBox.region[0]} · {thaiBox.region[1]}</p>
                                                        </div>
                                                    ))}
                                                </SwiperSlide>
                                            ))}
                                            {philSlice.map((phil, philIndex) => (
                                                <SwiperSlide key={`phil_${philIndex}`}>
                                                    {hotelRegion && <div className="most_main phil">
                                                        <div className="most_bg"></div>
                                                        <div className="main_text_box">
                                                            <p>{hotelRegion[3]}</p>
                                                            <button onClick={() => goSearch('필리핀')}>호텔 보러가기</button>
                                                        </div>
                                                    </div>}
                                                    {phil.map((philBox, philBoxIndex) => (
                                                        <div key={`philBox_${philBoxIndex}`} className="most_box">
                                                            <div style={{ backgroundImage: `url(${philBox.img})` }}>
                                                                <div className="most_bg"></div>
                                                            </div>
                                                            <p>{philBox.region[0]} · {philBox.region[1]}</p>
                                                        </div>
                                                    ))}
                                                </SwiperSlide>
                                            ))}
                                        </>
                                    }
                                </Swiper>

                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default MainHome