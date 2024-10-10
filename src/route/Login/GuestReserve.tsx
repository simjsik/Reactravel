import React, { useEffect } from "react";
import { mediaState, modalState, Reservation, reserveDataState, reserveIdState, reserveToggleState, roomState } from "../../recoil";
import { useRecoilState, useRecoilValue } from "recoil";
import { db } from "../../firebaseconfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const GuestReserve: React.FC = () => {
    const navigate = useNavigate();
    const [reserveId, setReserveId] = useRecoilState<string>(reserveIdState)
    const [guestToggle, setGuestToggle] = useRecoilState<boolean>(reserveToggleState)
    const [room, setRoom] = useRecoilState<number>(roomState)
    const media = useRecoilValue<number>(mediaState)
    const [modal, setModal] = useRecoilState<boolean>(modalState)


    const [reservations, setReservations] = React.useState<Reservation[]>(() => {
        const saved = sessionStorage.getItem("reservation");
        return saved ? JSON.parse(saved) : [];
    });

    const handleLoginToggle = () => {
        setGuestToggle((prev) => !prev)
        if (media > 1) {
            setModal((prev) => !prev)
        }
    }

    const handleReserve = async (e: React.FormEvent) => {
        e.preventDefault();

        const getReservedId = async (reservationId: string): Promise<Reservation[]> => {
            try {
                const q = query(collection(db, 'reservations'), where('id', '==', reservationId));

                const querySnapShot = await getDocs(q);
                const reservations: Reservation[] = querySnapShot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        reservedId: data.reservedId,  // 예약 ID를 매핑
                        reservedTitle: data.reservedTitle, // 예약 제목 매핑
                        reservedGrade: data.reservedGrade, // 예약 등급 매핑
                        reservedCheckIn: new Date(data.reservedCheckIn.seconds * 1000), // 타임스탬프를 Date로 변환
                        reservedCheckOut: new Date(data.reservedCheckOut.seconds * 1000), // 타임스탬프를 Date로 변환
                        reservedPrice: data.reservedPrice, // 가격 매핑
                        reservedNight: data.reservedNight, // 숙박 일수 매핑
                        reservedRoom: data.reservedRoom,
                        reservedRoomEtc: room,
                        reservedTotal: data.reservedTotal, // 총 금액 매핑
                    } as Reservation; // TypeScript 타입 단언 사용
                });

                return reservations;
            } catch (error) {
                console.error("예약 목록 가져오기 실패:", error);
                return [];
            }
        }

        const reservationData = await getReservedId(reserveId);
        if (reservationData.length > 0) {
            setReservations(reservationData);
            sessionStorage.setItem("reservation", JSON.stringify(reservationData)); // 세션 저장소에 저장
            navigate(`/reserve_confirm?query=${reserveId}`)
            setGuestToggle((prev) => !prev)
        } else {
            alert('예약된 정보가 없습니다.')
        }
    };

    useEffect(() => {
        if (reservations) {
            sessionStorage.setItem("reservation", JSON.stringify(reservations));
        }
    }, [reservations]);

    return (
        <>
            {media > 1 ?
                <>
                    <div className="login_bg" onClick={handleLoginToggle}></div>
                    <div className="guest_wrap">
                        <div>
                            <h2>비회원 예약 조회</h2>
                            <button className="login_close_btn" onClick={handleLoginToggle}>닫기</button>
                        </div>
                        <form onSubmit={handleReserve} className="login_box">
                            <div className="login_password">
                                <span>예약 아이디</span>
                                <input type="text" onChange={(e) => setReserveId(e.target.value)} required />
                            </div>
                            <button type="submit">조회하기</button>
                        </form>
                    </div>
                </>
                :
                <>
                    <div className="login_bg" onClick={handleLoginToggle}></div>
                    <div className="guest_wrap">
                        <div>
                            <button className="login_close_btn" onClick={handleLoginToggle}>
                                <svg viewBox="-2 -3 24 24" className="login_undo_svg">
                                    <g id="prevIcon" data-name="prevIcon"><g id="prev" data-name="prev">
                                        <rect className="cls-1" width="18" height="18" />
                                        <polyline className="cls-2" points="11.57 3.87 6.43 9 11.56 14.13" />
                                    </g></g>
                                </svg>
                            </button>
                            <h2>비회원 예약 조회</h2>
                        </div>
                        <form onSubmit={handleReserve} className="login_box">
                            <div className="login_password">
                                <span>예약 아이디</span>
                                <input type="text" onChange={(e) => setReserveId(e.target.value)} required />
                            </div>
                            <button type="submit">조회하기</button>
                        </form>
                    </div>
                </>
            }
        </>
    )
}

export default GuestReserve