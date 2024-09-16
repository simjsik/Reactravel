import React from "react";
import { useSetRecoilState } from "recoil";
import { loginState, loginToggleState, userState } from "../../recoil";
import { onAuthStateChanged} from "firebase/auth";
import { auth } from "../../firebaseconfig";

const useLoginListener = () => {
    const setUser = useSetRecoilState(userState)
    const setLogin = useSetRecoilState(loginState)
    const setLoginToggle = useSetRecoilState(loginToggleState)
    
    React.useEffect(() => {
        // firebase 인증 상태 감지
        const subscribeRead = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user.uid)
                setLogin(true)
            } else {
                setUser(null)
                setLogin(false)
            }
        });
        return () => subscribeRead();
    }, [setUser, setLogin, setLoginToggle]);
};

export default useLoginListener