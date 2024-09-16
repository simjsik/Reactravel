import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { HotelDetail, hotelDetailState } from '../../recoil';
import { db } from '../../firebaseconfig';
import { collection, getDocs } from 'firebase/firestore';

const useHotelDetail = () => {
    const [hotelDetail, setHotelDetail] = useRecoilState<HotelDetail[]>(hotelDetailState)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchHotelDetail = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "hotels"));
                const hotelDetailData: HotelDetail[] = querySnapshot.docs.map(doc => ({
                    hotelId: doc.id,
                    hotelImg: doc.data().hotelImg,
                    hotelDetail: doc.data().hotelDetail,
                    hotelPoint: doc.data().hotelPoint,
                    hotelFacility: doc.data().hotelFacility,
                    hotelRoom: doc.data().hotelRoom,
                }));
                setHotelDetail(hotelDetailData);
                setError(null); // 성공 시 에러 초기화
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError('호텔 이미지를 불러오는 중 오류가 발생했습니다.' + error.message)
                } else {
                    setError('알 수 없는 이유로 호텔 이미지를 불러 올 수 없습니다.')
                }
            }
        };
        fetchHotelDetail();
    }, [setHotelDetail]);

    return { hotelDetail, error };
};

export default useHotelDetail;
