// loginGuest.ts
import { signInAnonymously } from "firebase/auth";
import { auth } from "../../firebaseconfig";

const loginGuest = async () => {
    try {
        const userCredential = await signInAnonymously(auth);
        return userCredential.user;
    } catch (error) {
        return null;
    }
};

export default loginGuest;