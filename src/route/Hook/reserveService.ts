import { db } from "../../firebaseconfig";
import { collection, addDoc } from "firebase/firestore";
import { Reservation } from "../../recoil";

export const createReservation = async (reservation: Omit<Reservation, 'reservedId'>) => {
    const reservationId = Math.random().toString(36).substr(2, 9);
    const reservationWithId = { ...reservation, id: reservationId };

    try {
        const docRef = await addDoc(collection(db, 'reservations'), reservationWithId);
        return reservationId;
    } catch (error) {
        console.error('에러 발생', error)
        throw error;
    }
}