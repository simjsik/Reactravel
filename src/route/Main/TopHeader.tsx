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
      if (location.pathname === '/reserve_confirm') {
        navigate('/home')
      }
    } catch (error) {
      alert('로그아웃 중 오류가 발생했습니다.' + error)
    }
  } // 로그아웃

  const handleLoginToggle = () => {
    setLoginToggle((prev) => !prev);
    if (media > 1) {
      setModal((prev) => !prev)
    }
  } // 로그인 토글

  const handleNav = () => {
    setNavToggle((prev) => !prev)
    if (media < 2) {
      setModal((prev) => !prev)
    }
  } // nav

  const handleReserve = () => {
    setReserveToggle((prev) => !prev);
    if (media > 1) {
      setModal((prev) => !prev)
    }
  } // 예약 조회

  useEffect(() => { // 요소 외 클릭 시 닫기 기능.
    if (media > 1) {
      const clickOutside = (event: MouseEvent) => {
        if (navRef.current && !navRef.current.contains(event.target as Node)) {
          setNavToggle(false);
        }
      };
      document.addEventListener('click', clickOutside);
      return () => {
        document.removeEventListener('click', clickOutside);
      }
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
        <div className='header_wrap'>
          <div className='header_logo' onClick={homeClick}>
            {media === 0 ? <>
              <img src="https://github.com/user-attachments/assets/39bd586f-e9cf-4b15-87e5-9d04e57a39ed" alt="로고" />
              <span>홈</span>
            </>
              :
              media < 2 ? <img src="https://github.com/user-attachments/assets/71aa6b25-f221-4d95-b1fc-a65e4397cefa" alt="로고" />
                :
                <svg viewBox="0 0 65.42 9.89">
                  <g id="logo_hotel">
                    <path className="logo_path_h" d="M8.16.27V9.75H6V5.87H2.19V9.75H0V.27H2.19V3.94H6V.27Z" />
                    <path className="logo_path_o" d="M12.76,9.89a4.23,4.23,0,0,1-1.6-.29A3.65,3.65,0,0,1,10,8.81a3.57,3.57,0,0,1-.73-1.15,4,4,0,0,1,0-2.72A3.57,3.57,0,0,1,10,3.79,3.65,3.65,0,0,1,11.16,3a4.23,4.23,0,0,1,1.6-.29A4.14,4.14,0,0,1,14.35,3a3.76,3.76,0,0,1,1.18.79,3.57,3.57,0,0,1,.73,1.15,3.66,3.66,0,0,1,.25,1.37,3.63,3.63,0,0,1-.25,1.35,3.57,3.57,0,0,1-.73,1.15,3.76,3.76,0,0,1-1.18.79A4.14,4.14,0,0,1,12.76,9.89ZM11.2,6.31a2.12,2.12,0,0,0,.2.93,1.54,1.54,0,0,0,.56.62,1.55,1.55,0,0,0,1.59,0,1.49,1.49,0,0,0,.56-.63,2.11,2.11,0,0,0,.2-.92,2.13,2.13,0,0,0-.2-.94,1.47,1.47,0,0,0-.56-.62,1.55,1.55,0,0,0-1.59,0,1.61,1.61,0,0,0-.56.62A2.13,2.13,0,0,0,11.2,6.31Z" />
                    <path className="logo_path_t" d="M21.74,9.38l-.65.24a5.72,5.72,0,0,1-.74.19,4,4,0,0,1-.76.08,2.64,2.64,0,0,1-1-.18,1.44,1.44,0,0,1-.7-.59A1.92,1.92,0,0,1,17.64,8V4.44h-.9V2.82h.9V.59h2.13V2.82H21.2V4.44H19.77V7.3a.61.61,0,0,0,.18.49.63.63,0,0,0,.44.15,1.85,1.85,0,0,0,.49-.08,2.67,2.67,0,0,0,.44-.18Z" />
                    <path className="logo_path_e" d="M25.57,9.89A4.21,4.21,0,0,1,24,9.6a3.45,3.45,0,0,1-1.18-.77,3.26,3.26,0,0,1-.74-1.13,3.59,3.59,0,0,1-.26-1.34,3.72,3.72,0,0,1,.45-1.82,3.47,3.47,0,0,1,1.29-1.32,3.85,3.85,0,0,1,2-.51,3.94,3.94,0,0,1,2,.5,3.47,3.47,0,0,1,1.27,1.31,3.56,3.56,0,0,1,.44,1.76,2.17,2.17,0,0,1,0,.36c0,.12,0,.22,0,.31H24.08a1.41,1.41,0,0,0,.26.76,1.37,1.37,0,0,0,.56.48,1.73,1.73,0,0,0,.74.16,1.88,1.88,0,0,0,.9-.23,1.18,1.18,0,0,0,.58-.61L28.94,8a3.17,3.17,0,0,1-.76,1A3.56,3.56,0,0,1,27,9.65,4.32,4.32,0,0,1,25.57,9.89ZM24,5.64h3.05a1.67,1.67,0,0,0-.26-.73,1.39,1.39,0,0,0-.53-.49,1.63,1.63,0,0,0-.73-.17,1.66,1.66,0,0,0-.75.17,1.44,1.44,0,0,0-.52.49A1.67,1.67,0,0,0,24,5.64Z" />
                  </g>
                  <g id="logo_leact">
                    <path className="logo_path_l" d="M30,0h2.14V7.27a1,1,0,0,0,.16.63.59.59,0,0,0,.46.18,1.39,1.39,0,0,0,.4-.06,1.59,1.59,0,0,0,.37-.14l.28,1.61a4.15,4.15,0,0,1-.92.29,5,5,0,0,1-1,.11A2,2,0,0,1,30.5,9.4,1.84,1.84,0,0,1,30,8Z" />
                    <path className="logo_path_e_2" d="M37.58,9.89A4.21,4.21,0,0,1,36,9.6a3.55,3.55,0,0,1-1.18-.77,3.41,3.41,0,0,1-.74-1.13,3.58,3.58,0,0,1-.25-1.34,3.71,3.71,0,0,1,.44-1.82,3.47,3.47,0,0,1,1.29-1.32,3.85,3.85,0,0,1,2-.51,3.92,3.92,0,0,1,2,.5,3.47,3.47,0,0,1,1.27,1.31,3.56,3.56,0,0,1,.44,1.76,2.17,2.17,0,0,1,0,.36c0,.12,0,.22,0,.31H36.09a1.41,1.41,0,0,0,.26.76,1.34,1.34,0,0,0,.57.48,1.66,1.66,0,0,0,.73.16,1.88,1.88,0,0,0,.9-.23,1.18,1.18,0,0,0,.58-.61L41,8a3.29,3.29,0,0,1-.75,1,3.72,3.72,0,0,1-1.15.66A4.28,4.28,0,0,1,37.58,9.89ZM36,5.64h3a1.8,1.8,0,0,0-.25-.73,1.49,1.49,0,0,0-.54-.49,1.63,1.63,0,0,0-.73-.17,1.58,1.58,0,0,0-.74.17,1.39,1.39,0,0,0-.53.49A1.67,1.67,0,0,0,36,5.64Z" />
                    <path className="logo_path_a" d="M41.59,7.69A1.92,1.92,0,0,1,42,6.49a2.62,2.62,0,0,1,1.07-.81,3.81,3.81,0,0,1,1.56-.3,4.6,4.6,0,0,1,.84.08,3.08,3.08,0,0,1,.72.21V5.36a1,1,0,0,0-.34-.85,1.61,1.61,0,0,0-1.06-.3,3.07,3.07,0,0,0-1.1.2A5.74,5.74,0,0,0,42.58,5l-.64-1.36a5.46,5.46,0,0,1,3-.91,3.72,3.72,0,0,1,2.46.74,2.67,2.67,0,0,1,.87,2.14v1.8a.79.79,0,0,0,.1.44.55.55,0,0,0,.36.15V9.75a3.43,3.43,0,0,1-.5.08l-.41,0a1.51,1.51,0,0,1-.92-.24A1,1,0,0,1,46.55,9l0-.31a3.15,3.15,0,0,1-1.12.91A3,3,0,0,1,44,9.89a2.68,2.68,0,0,1-1.25-.29,2.4,2.4,0,0,1-.88-.79A2.09,2.09,0,0,1,41.59,7.69Zm4.25.25a1,1,0,0,0,.24-.26.48.48,0,0,0,.09-.27v-.6a2.41,2.41,0,0,0-.59-.16A3.4,3.4,0,0,0,45,6.59a1.71,1.71,0,0,0-1,.25.76.76,0,0,0-.39.66.73.73,0,0,0,.13.43.93.93,0,0,0,.37.3,1.2,1.2,0,0,0,.55.12,1.87,1.87,0,0,0,.65-.12A1.58,1.58,0,0,0,45.84,7.94Z" />
                    <path className="logo_path_c" d="M53,9.89a4.14,4.14,0,0,1-1.59-.29,3.65,3.65,0,0,1-1.18-.79,3.46,3.46,0,0,1-.75-1.15,3.87,3.87,0,0,1-.25-1.37,3.57,3.57,0,0,1,.45-1.76,3.47,3.47,0,0,1,1.29-1.32,3.94,3.94,0,0,1,2-.5,3.77,3.77,0,0,1,2,.52,3.26,3.26,0,0,1,1.24,1.34l-2.08.63a1.36,1.36,0,0,0-.51-.5,1.51,1.51,0,0,0-.7-.17,1.46,1.46,0,0,0-.8.22,1.57,1.57,0,0,0-.56.61,1.94,1.94,0,0,0-.21.93,1.89,1.89,0,0,0,.22.94,1.64,1.64,0,0,0,.56.63,1.4,1.4,0,0,0,.79.22,1.69,1.69,0,0,0,.5-.08,1.51,1.51,0,0,0,.42-.25,1.25,1.25,0,0,0,.3-.36L56.25,8a3,3,0,0,1-.73,1,3.57,3.57,0,0,1-1.12.66A4.08,4.08,0,0,1,53,9.89Z" />
                    <path className="logo_path_t" d="M61.49,9.38l-.65.24a6.17,6.17,0,0,1-.74.19,4.11,4.11,0,0,1-.77.08,2.63,2.63,0,0,1-1-.18,1.46,1.46,0,0,1-.71-.59A2,2,0,0,1,57.38,8V4.44h-.89V2.82h.89V.59h2.14V2.82H61V4.44H59.52V7.3a.61.61,0,0,0,.18.49.63.63,0,0,0,.44.15,1.72,1.72,0,0,0,.48-.08,2.47,2.47,0,0,0,.45-.18Z" />
                  </g>
                  <g id="logo_circle">
                    <circle className="logo_circle" cx="64.05" cy="8.43" r="1.37" />
                  </g>
                </svg>
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
        <>
          <div className="nav_on_box">
            <button className="nav_close_btn" onClick={handleNav}>
              <svg viewBox="-2 -3 24 24" className="login_undo_svg">
                <g id="prevIcon" data-name="prevIcon"><g id="prev" data-name="prev">
                  <rect className="cls-1" width="18" height="18" />
                  <polyline className="cls-2" points="11.57 3.87 6.43 9 11.56 14.13" />
                </g></g>
              </svg>
            </button>
            <div className="mobile_login_art"></div>
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
          {loginToggle && <Login />}
          {reserveToggle && <GuestReserve />}
        </>
      }
      {
        media >= 2 &&
        <>
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
          {loginToggle && <Login />}
          {reserveToggle && <GuestReserve />}
        </>
      }
    </>
  )
}

export default TopHeader
