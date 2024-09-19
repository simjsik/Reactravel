import React, { useEffect, useRef, useState } from "react"
import './TopHeader.css'
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { defaultMap, loginToggleState, mediaState, modalState, reserveIdState, reserveToggleState, searchTermState, userState } from "../../recoil"
import { getAuth, signOut } from "firebase/auth"
import { useLocation, useNavigate } from "react-router-dom"
import Login from "../Login/Login"
import GuestReserve from "../Login/GuestReserve"
import useAuthListener from '../Hook/useLoginListener'

const TopHeader: React.FC = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  // data

  const [navToggle, setNavToggle] = useState<boolean>(false)
  const [fixed, setFixed] = useState<boolean>(false)

  const media = useRecoilValue<number>(mediaState)
  const [loginToggle, setLoginToggle] = useRecoilState<boolean>(loginToggleState)
  const [reserveToggle, setReserveToggle] = useRecoilState<boolean>(reserveToggleState)
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermState)
  const [map, setMap] = useRecoilState<boolean>(defaultMap)

  const [user, setUser] = useRecoilState(userState);

  const setModal = useSetRecoilState<boolean>(modalState)
  // state

  useAuthListener();
  // hook

  const homeClick = () => {
    setSearchTerm('')
    setMap(false)
    setModal(false)
    navigate('/home')

  } // 홈 이동

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      alert('로그아웃에 성공했습니다.')
      setModal((prev) => !prev)
      if (location.pathname === '/reserve_confirm') {
        navigate('/home')
      }
    } catch (error) {
      alert('로그아웃 중 오류가 발생했습니다.' + error)
    }
  } // 로그아웃

  const handleLoginToggle = () => {
    setLoginToggle((prev) => !prev);
    if(media > 1){
      setModal((prev) => !prev)
    }
    setNavToggle((prev) => !prev)
  } // 로그인 토글

  const handleNav = () => {
    setNavToggle((prev) => !prev)
    if (media < 2) {
      setModal((prev) => !prev)
    }
  } // nav

  const handleReserve = () => {
    setReserveToggle((prev) => !prev);
    setNavToggle((prev) => !prev)
    if (media > 1) {
      setModal((prev) => !prev)
    }
  } // 예약 조회

  useEffect(() => { // 요소 외 클릭 시 닫기 기능.
    const clickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setNavToggle(false);
      }
    };
    if (media > 1) {
      document.addEventListener('click', clickOutside);
    }
    return () => {
      document.removeEventListener('click', clickOutside);
    }
  }, [navRef])

  useEffect(() => {
    const scrolledTop = () => {
      const currentY = window.scrollY
      const mainY = 260
      const topLogin = document.querySelector('.topHeader .nav_box') as HTMLElement
      const topPath = document.querySelector('.topHeader .nav_svg path') as HTMLElement
      if (media === 0) {
        if (mainY <= currentY) {
          setFixed(true)
        } else {
          setFixed(false)
        }

        if (location.pathname === '/detail') {
          if (currentY >= 280) {
            topLogin.style.background = 'none'
            topPath.style.stroke = '#191919'
          } else {
            topLogin.style.cssText = ''
            topPath.style.cssText = ''
          }
        }

      }
    }

    document.addEventListener('scroll', scrolledTop)

    return () => {
      document.removeEventListener('scroll', scrolledTop)
    }
  }, [])
  // 스크롤 스타일

  return (
    <>
      <header className={`topHeader 
      ${location.pathname === '/home' ? 'home_header'
          : location.pathname === '/search' ? 'search_header nav'
            : location.pathname === '/detail' ? 'detail_header nav'
              : location.pathname === '/reserve' ? 'reserve_header nav'
                : location.pathname === '/reserve_confirm' ? 'confirm_header nav'
                  : ''
        }`}>
        {loginToggle && <Login />}
        {reserveToggle && <GuestReserve />}
        <div className='header_wrap'>
          <div className='header_logo' onClick={homeClick}>
            {media === 0 ? <> <img src="https://github.com/user-attachments/assets/39bd586f-e9cf-4b15-87e5-9d04e57a39ed" alt="홈" /><span>홈</span></>
              : media === 1 ? <img src="https://github.com/simjsik/savefile/assets/39624384/70f2dcbd-dd21-4d16-9aa3-fa0756ecc062" alt="로고" />
                : <img src="https://github.com/simjsik/savefile/assets/39624384/70f2dcbd-dd21-4d16-9aa3-fa0756ecc062" alt="로고" />
            }
          </div>
          <div className='header_right' onClick={handleNav} ref={navRef}>
            <div className={`nav_box ${navToggle ? 'on_nav' : 'off_nav'}`}>
              <svg viewBox="0 0 18 18">
                <g className="nav_svg" data-name="nav_svg">
                  <rect className="cls-1" width="18" height="18" />
                  <path className="cls-2" d="M6,10c-2.41.92-2.47,2.62-2.74,4.56a.26.26,0,0,0,.27.29H14.79a9.19,9.19,0,0,0-.37-2.76c-.76-2.39-2.85-3.18-5.17-3.27a2.85,2.85,0,0,1,0-5.69,3,3,0,0,1,2.39,1.31,2.34,2.34,0,0,1,0,2.75" />
                </g>
              </svg>
              {navToggle && media > 1 &&
                <div className="nav_on_box">
                  {
                    user ?
                      <button onClick={handleLogout} className="header_logout">
                        로그아웃
                      </button>
                      :
                      <button className='header_login' onClick={handleLoginToggle}>
                        로그인
                      </button>
                  }
                  <button className="guest_reserve" onClick={handleReserve}>
                    비회원 예약 조회
                  </button>
                </div>
              }
              {((location.pathname === '/reserve_confirm' || location.pathname === '/home' || location.pathname === '/') && media < 1) && <span>로그인</span>}
            </div>
          </div>
        </div>

      </header >
      {
        navToggle && media < 2 &&
        <div className="nav_on_box">
          <button className="nav_close_btn" onClick={handleNav}>
            <svg viewBox="-2 -3 24 24" className="login_undo_svg">
              <g id="prevIcon" data-name="prevIcon"><g id="prev" data-name="prev">
                <rect className="cls-1" width="18" height="18" />
                <polyline className="cls-2" points="11.57 3.87 6.43 9 11.56 14.13" />
              </g></g>
            </svg>
          </button>
          <p>로그인 / 예약 조회</p>
          <div className="mb_nav_event_wrap">
            <div className="mb_nav_event">
              <div className="mb_nav_icon"></div>
              <span>회원 / 비회원 모두 예약가능</span>
            </div>
            <div className="mb_nav_event">
              <div className="mb_nav_icon"></div>
              <span>회원 예약 시 다양한 혜택</span>
            </div>
          </div>
          {
            user ?
              <button onClick={handleLogout} className="header_logout">
                로그아웃
              </button>
              :
              <button className='header_login' onClick={handleLoginToggle}>
                로그인
              </button>
          }
          <button className="guest_reserve" onClick={handleReserve}>
            비회원 예약 조회
          </button>
        </div>
      }
    </>
  )
}

export default TopHeader
