import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';
import TopHeader from './route/Main/TopHeader';
import MainSearch from './route/Main/MainSearch';
import MainHome from './route/Main/MainHome';
import MainFinder from './route/Main/MainFinder';
import DetailView from './route/Detail/DetailView';
import RoomReserve from './route/Reservation/RoomReserve';
import RoomReserveConfirmed from './route/Reservation/RoomReserveConfirmed';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultMap, footerYState, mediaState, modalState } from './recoil';
import { useEffect, useRef } from 'react';

function App() {
  const location = useLocation();
  const { pathname } = useLocation();
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const footerRef = useRef<HTMLDivElement>(null);

  // data

  const map = useRecoilValue(defaultMap)
  const modal = useRecoilValue<boolean>(modalState)
  const [media, setMedia] = useRecoilState(mediaState)
  const [footerY, setFooterY] = useRecoilState<number>(footerYState)

  // state

  const mainBg: React.CSSProperties | undefined =
    location.pathname === '/' ?
      { backgroundImage: 'url("https://github.com/user-attachments/assets/315be9e6-20cb-411e-8c8d-6e394d2c1732")', height: '100vh' }
      :
      undefined
  // style

  const topHandle = () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    })
  }


  const handleMedia = () => {
    const w = window.innerWidth

    if (w < 480) {
      setMedia(0)
    } else if (480 < w && w < 768) {
      setMedia(1)
    } else if (768 <= w && 1024 > w) {
      setMedia(2)
    } else if (1024 <= w && 1280 > w) {
      setMedia(3)
    } else if (1280 <= w) {
      setMedia(4)
    }
  }

  useEffect(() => {
    handleMedia()
    const handleResize = () => handleMedia();

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])


  useEffect(() => {
    console.log(media)
  }, [window.innerWidth])


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = 'hidden';
      console.log('Modal True!')
    } else if (!modal) {
      document.body.style.overflow = 'auto'
      console.log('Modal False!')
    }
  }, [modal])

  useEffect(() => {
    const setFooterPosition = () => {
      if (footerRef.current) {
        const footerPosition = footerRef.current.getBoundingClientRect().y;
        setFooterY(footerPosition)
      }
    }
    setFooterPosition()
    window.addEventListener('scroll', setFooterPosition)

    return () => {
      window.removeEventListener('scroll', setFooterPosition)
    }
  }, [])

  return (
    <>
      <TopHeader />
      <main className={`main_wrap ${media === 0 ? 'mb' : media === 1 ? 'tb' : 'pc'}`}>
        <div className='main_bg' style={mainBg}>
          <div id={`${location.pathname === '/home' ? 'home_section'
            : location.pathname === '/search' ? 'search_section'
              : location.pathname === '/detail' ? 'detail_section'
                : location.pathname === '/reserve' ? 'reserve_section'
                  : location.pathname === '/reserva_confirm' ? 'reseve_confirm_section'
                    : 'main_section'
            }`}>
            {googleMapsApiKey &&
              <LoadScript googleMapsApiKey={googleMapsApiKey}>
                <Routes>
                  <Route path='/' element={<MainFinder />} />
                  <Route path='/home' element={<MainHome />} />
                  <Route path='/search' element={<MainSearch />} />
                  <Route path='/detail' element={<DetailView />} />
                  <Route path='/reserve' element={<RoomReserve />} />
                  <Route path='/reserve_confirm' element={<RoomReserveConfirmed />} />
                </Routes>
              </LoadScript>
            }
          </div>
        </div>
      </main >
      {
        location.pathname !== '/' && !map &&
        <footer id="homeFooter" ref={footerRef}>
          <div className="footer_wrap">
            <div className="footer_top">
              <div className="customer">
                <p>고객 문의</p>
                <ul>
                  <li>고객센터</li>
                  <li>서비스 보장제</li>
                  <li>서비스 상세내용</li>
                  <li>웹사이트 피드백</li>
                </ul>
              </div>
              <div className="business">
                <p>회사 소개</p>
                <ul>
                  <li>리액트립 소개</li>
                  <li>뉴스</li>
                  <li>이용약관</li>
                  <li>개인정보 처리방침</li>
                </ul>
              </div>
              <div className="etc">
                <p>기타 서비스</p>
                <ul>
                  <li>숙소 등록</li>
                  <li>모든 호텔</li>
                  <li>보안</li>
                </ul>
              </div>
              <div className="payment">
                <div>
                  <p>결제 방법</p>
                  <ul className='pay_wrap'>
                    <li>
                      <div className='pay_icon' style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/ad809f19-8018-408d-a86e-14b836c13a10")' }}></div>
                    </li>
                    <li>
                      <div className='pay_icon' style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/c66236d8-a297-43b5-b16a-ad7056c3bce8")' }}></div>
                    </li>
                    <li>
                      <div className='pay_icon' style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/8be85846-bb40-4b0d-8931-36082be66759")' }}></div>
                    </li>
                    <li>
                      <div className='pay_icon' style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/951a97ad-5075-4665-9cdc-43a90c6c28d3")' }}></div>
                    </li>
                    <li>
                      <div className='pay_icon' style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/7ec88d65-ef34-4f8e-a92d-b54a08b8c93b")' }}></div>
                    </li>
                    <li>
                      <div className='pay_icon' style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/67a70d52-c340-4db3-8ee1-44552ce66516")' }}></div>
                    </li>
                  </ul>
                </div>
                <div>
                  <p>SNS</p>
                  <ul className='sns_wrap'>
                    <li>
                      <div className='sns_icon' style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/db12b0be-a441-49c2-a043-c8a0e9938ee2")' }}></div>
                    </li>
                    <li>
                      <div className='sns_icon' style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/8452a273-0ba4-451a-b558-78dba16f8562")' }}></div>
                    </li>
                    <li>
                      <div className='sns_icon' style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/616cb88b-fea5-4fdc-bbf8-f2dc572cc819")' }}></div>
                    </li>
                    <li>
                      <div className='sns_icon' style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/658012c7-e5d9-4604-bfe9-b8e3722adf57")' }}></div>
                    </li>
                    <li>
                      <div className='sns_icon' style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/ff3c657e-3f5f-44b4-82ad-87b443e95080")' }}></div>
                    </li>
                    <li>
                      <div className='sns_icon' style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/b12f5c62-693e-442f-80e3-290b05f8c9b9")' }}></div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="footer_bottom">
              <div className="bottom_top">
                <div className="portfolio_cont">
                  <div style={{ backgroundImage: 'url("https://github.com/user-attachments/assets/1f28fa14-1106-45c4-b2a2-5c51615057d2")' }}></div>
                  <span>React 2024 Portfolio of the Sim Hyeok Bo</span>
                </div>
              </div>
              <div className="bottom_under">
                <span>ⓒ 2024 Sim Hyeok Bo All right reserved.</span>
                <span>Contact. 010-8532-3126 | simjsik75@naver.com</span>
              </div>
            </div>
          </div>
        </footer>
      }
      {
        !map && location.pathname !== '/' && media === 2 && < button className='top_view_btn' onClick={topHandle}></button >
      }
    </>
  );
}

export default App;
