import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import './Login.css'
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { loginToggleState, mediaState, modalState, userState } from "../../recoil"
import { auth } from "../../firebaseconfig";
import useAuthListener from '../Hook/useLoginListener'
import loginGuest from '../Hook/loginGuest'

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string>('');

    const user = useRecoilValue(userState)
    const media = useRecoilValue<number>(mediaState)

    const [loginToggle, setLoginToggle] = useRecoilState<boolean>(loginToggleState)

    const [modal, setModal] = useRecoilState<boolean>(modalState)
    // state

    useAuthListener();
    // hook

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setLoginToggle((prev) => !prev);
            setModal(false)
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError('로그인에 실패했습니다.' + error.message);
            } else {
                setError('로그인 중 알 수 없는 오류가 발생했습니다.')
            }
        }
    }; // 로그인 기능

    const handleGuestLogin = async () => {
        const guestUser = await loginGuest();
        setLoginToggle(false);
        if (!guestUser) {
            setError('게스트 로그인에 실패했습니다.');
        }
    }; // 게스트 로그인 기능

    const handleLoginToggle = () => {
        setLoginToggle((prev) => !prev);
    } // 로그인 창 토글
    return (
        <>
            <div className="login_bg" onClick={handleLoginToggle}></div>

            <div className="login_wrap">
                <div>
                    {media > 1 ?
                        <button className="login_close_btn" onClick={handleLoginToggle}>닫기</button>
                        :
                        <button className="login_close_btn" onClick={handleLoginToggle}>
                            <svg viewBox="-2 -3 24 24" className="login_undo_svg">
                                <g id="prevIcon" data-name="prevIcon"><g id="prev" data-name="prev">
                                    <rect className="cls-1" width="18" height="18" />
                                    <polyline className="cls-2" points="11.57 3.87 6.43 9 11.56 14.13" />
                                </g></g>
                            </svg>
                        </button>
                    }
                    <h2>리액트립 로그인</h2>
                </div>
                <form onSubmit={handleLogin} className="login_box">
                    <div className="login_email">
                        <span>이메일</span>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="login_password">
                        <span>비밀번호</span>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="login_btn">
                        <button type="submit">로그인</button>
                    </div>

                    <div className="guest_login_btn">
                        <button onClick={handleGuestLogin}>게스트 로그인</button>
                    </div>

                    {error && <p className="login_error">{error}</p>}
                </form>
            </div>
        </>

    )
};

export default Login;