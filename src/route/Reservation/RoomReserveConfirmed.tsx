import React, { useEffect, useState } from "react";
import TopHeader from "../Main/TopHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { hotelDataState, mediaState, Reservation, reserveDataState, userState } from "../../recoil";
import useHotelDetail from "../Hook/useHotelDetail";
import './RoomReserveConfirmed.css'

const RoomReserveConfirmed: React.FC = () => {

    // Url
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const query = params.get('query');

    // State
    const [reservation, setReservation] = React.useState<Reservation[]>(() => {
        const saved = sessionStorage.getItem("reservation");
        return saved ? JSON.parse(saved) : [];
    });

    const user = useRecoilValue(userState)
    const media = useRecoilValue(mediaState)


    // Data
    const reservedId = query


    const priceNumber = (value: number) => {
        return new Intl.NumberFormat('ko-KR', {
            maximumFractionDigits: 0, // 소수점 최대 자릿수
            minimumFractionDigits: 0, // 소수점 최소 자릿수
        }).format(value);
    }

    const priceService = (value: number) => {
        return Math.round(value * 0.05)
    }
    const priceTotal = (value_1: number, value_2: number, value_3: number) => {
        return Math.round((value_1 * value_2) * value_3)
    }
    const days = ['일', '월', '화', '수', '목', '금', '토'];

    const formatDateWithDay = (dateString: Date): string => {
        const date = new Date(dateString);
        const day = days[date.getDay()]; // 요일 인덱스를 사용해 배열에서 축약형 요일 가져오기
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${day})`;
    };
    const idCopyHandle = (reserveId: string | null) => {
        if (reserveId) {
            navigator.clipboard.writeText(reserveId)
        }
    }
    const handleUndoBtn = () => {
        navigate(-1)
    }
    return (
        <div className="reserve_confirm_wrap">
            {media < 2 &&
                <div className={`mb_confirm_top_nav`}>
                    <button className="mb_undo_btn" onClick={handleUndoBtn}>
                        <svg viewBox="-2 -3 24 24" className="detail_undo_svg">
                            <g id="prevIcon" data-name="prevIcon"><g id="prev" data-name="prev">
                                <rect className="cls-1" width="18" height="18" />
                                <polyline className="cls-2" points="11.57 3.87 6.43 9 11.56 14.13" />
                            </g></g>
                        </svg>
                    </button>
                    <p>예약 완료</p>
                </div>
            }
            <p>예약이 완료되었습니다!</p>
            <div className="reserve_progress">
                <div className="reserve_progress_circle"></div>
                <div className="reserve_progress_circle"></div>
                <div className="reserve_progress_circle"></div>
                <p>예약 신청</p>
                <p>확인 중</p>
                <p>예약 완료</p>
            </div>
            {reservation && reservation.map((reserve, reserveIndex) => (
                <div className="reserve_box_gradient" key={reserveIndex}>
                    <div className="reserve_confirm_box">
                        <div className="reserve_id">
                            <p>예약 ID</p>
                            <div className="reserve_id_text" onClick={() => idCopyHandle(reservedId)}>
                                <span>{reservedId}</span>
                                <div className="mb_id_copy"></div>
                            </div>
                            <div className="alert_box">
                                <span>* 비회원 고객님들께서는 반드시 예약 ID를 저장해주세요.</span>
                            </div>
                        </div>
                        {/* 예약 ID */}

                        < div className="reserve_title">
                            <div>
                                <p>숙소명</p>
                                <span>{reserve.reservedTitle}</span>
                            </div>
                            <div>
                                <p>객실</p>
                                <span>{reserve.reservedRoom}</span>
                            </div>
                        </div>
                        {/* 숙소 */}

                        <div className="reserve_check">
                            <div>
                                <p>체크인</p>
                                <span>
                                    {reserve.reservedCheckIn
                                        ? formatDateWithDay(new Date(reserve.reservedCheckIn))
                                        : "날짜 정보 없음"}
                                </span>
                            </div>
                            <div>
                                <p>체크아웃</p>
                                <span>
                                    {reserve.reservedCheckOut
                                        ? formatDateWithDay(new Date(reserve.reservedCheckOut))
                                        : "날짜 정보 없음"}
                                </span>
                            </div>
                        </div>
                        {/* 체크인 / 아웃 */}

                        <div className="reserve_confirm_room_price">
                            <div>
                                <p>
                                    숙소 요금
                                </p>
                            </div>
                            <div>
                                <p>￦{priceNumber(reserve.reservedPrice)}원</p>
                                <span>/박</span>
                            </div>
                        </div>
                        {/* 숙소 요금 */}

                        <div className="reserve_confirm_totalpay">
                            <div className="reserve_box_rent">
                                <p>숙박 총액 + 세금 및 기타 요금</p>
                                <span>￦{priceNumber(priceTotal(reserve.reservedPrice, reserve.reservedNight, reserve.reservedRoomEtc))}원</span>
                                <p>리액트립 서비스 수수료</p>
                                <span>￦{priceNumber(priceService(reserve.reservedPrice || 0))}원</span>
                            </div>
                            <div>
                                <p>총 금액</p>
                                <span>￦{priceNumber(reserve.reservedTotal)}원</span>
                            </div>
                        </div>
                        {/* 총 금액 */}
                    </div>
                </div>
            ))
            }
            {/* fiexd info */}
        </div >
    )
}

export default RoomReserveConfirmed