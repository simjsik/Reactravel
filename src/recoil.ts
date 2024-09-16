import { atom, selector, } from 'recoil';
import { KoreanHotels, JapanHotels, ThailandHotels, PhilipinesHotels } from './data/hotelData.js'
import { Korean, Japan, Thailand, Philipines } from "./data/regionData";

export interface Hotel {
    title: string;
    region: string[];
    country: string;
    price: number;
    grade: string;
    review: number;
    img: string;
    hotelId: string;
    lat: number;
    lng: number;
    searchWord: string[];
}

export interface HotelDetail {
    hotelId: string;
    hotelImg: string[];
    hotelDetail: string[];
    hotelPoint: SubIcon[];
    hotelFacility: SubIcon[];
    hotelRoom: HotelRoom[];
}

export interface HotelRoom {
    roomId: string;
    roomTitle: string;
    roomImg: string[];
    roomPrice: number;
    roomRepund: boolean;
    roomBreakfast: boolean,
    roomOnlinePay: boolean,
    roomCapacity: string;
    roomDetail: RoomDetail[];
}

export interface RoomDetail {
    roomDetailMain: SubIcon[];
    roomToiletries: SubIcon[];
    roomCleaning: string;
    roomFacilityDisability: string[];
    roomRayout: string[];
    roomDevice: string[];
    roomFood: string[];
    roomBathroom: string[];
    roomFacility: string[];
    roomChild: boolean;
    roomInfo: string;
}

export interface SubIcon {
    title: string;
    imgUrl: string;
}

export interface Reservation {
    reservedId: string;
    reservedUser: string;
    reservedTitle: string;
    reservedGrade: string;
    reservedCheckIn: Date | null;
    reservedCheckOut: Date | string | null;
    reservedPrice: number;
    reservedNight: number;
    reservedRoomEtc: number;
    reservedRoom: string;
    reservedTotal: number;
}

// Interface

const today = new Date()
const nextDay = new Date(today.getTime() + 86400000)

export const footerYState = atom<number>({
    key: 'footerYState',
    default: 0
})
export const finderState = atom<boolean>({
    key: 'finderState',
    default: false
})

export const mediaState = atom<number>({
    key: 'mediaState',
    default: 0
})

export const roomState = atom<number>({
    key: 'roomState',
    default: 1,
})

export const adultState = atom<number>({
    key: 'adultState',
    default: 3
})

export const childState = atom<number>({
    key: 'childState',
    default: 0,
})

export const setterState = atom({
    key: 'setterState',
    default: false,
})

export const previewState = atom({
    key: 'previewState',
    default: false
})

export const searchTermState = atom({
    key: 'searchTermState',
    default: '',
})

export const filterDataState = atom<any[]>({
    key: 'filterDataState',
    default: [],
})

export const defaultCheckInState = atom<Date | null>({
    key: 'defaultCheckInState',
    default: today,
})

export const defaultCheckOutState = atom<Date | string | null>({
    key: 'defaultCheckOutState',
    default: nextDay,
})

export const nightState = atom<number>({
    key: 'nightState',
    default: 1,
})

export const searchResultDataState = atom<Hotel[]>({
    key: 'searchResultDataState',
    default: [],
})

export const hotelDataState = atom<Hotel[]>({ // 모든 호텔 데이터를 하나의 배열로 합침.
    key: 'hotelDataState',
    default: [...KoreanHotels, ...JapanHotels, ...ThailandHotels, ...PhilipinesHotels],
})

export const regionDataState = atom({ // 모든 지역 데이터를 하나의 배열로 합침.
    key: 'regionDataState',
    default: [...Korean, ...Japan, ...Thailand, ...Philipines]
})

export const priceRangeState = atom<number[]>({
    key: 'priceRangeState',
    default: [0, 310000]
})

export const gradeState = atom<string>({
    key: 'gradeState',
    default: '1'
})

export const rateState = atom<number>({
    key: 'rateState',
    default: 1
})

export const hotelPriceState = atom<number | null>({
    key: 'hotelPriceState',
    default: null,
})

export const hotelDetailState = atom<HotelDetail[]>({
    key: 'hotelDetailState',
    default: []
})

export const userState = atom<string | null>({
    key: 'userState',
    default: null,
})

export const loginState = atom<boolean>({
    key: 'loginState',
    default: false,
})
export const loginToggleState = atom<boolean>({
    key: 'loginToggleState',
    default: false,
})
export const reserveToggleState = atom<boolean>({
    key: 'reserveToggleState',
    default: false,
})

export const defaultMap = atom<boolean>({
    key: 'defaultMap',
    default: false,
})
export const defaultLat = atom<number>({
    key: 'defaultLat',
    default: 35.16,
})
export const defaultLng = atom<number>({
    key: 'defaultLng',
    default: 129.1603,
})
export const defaultZoom = atom<number>({
    key: 'defaultZoom',
    default: 5,
})
export const mapSlideIndexState = atom<number>({
    key: 'mapSlideIndexState',
    default: 0
})
export const modalState = atom<boolean>({
    key: 'modalState',
    default: false
})
export const reserveIdState = atom<string>({
    key: 'reserveIdState',
    default: ''
})
export const reserveDataState = atom<Reservation[]>({
    key: 'reserveDataState',
    default: [],
})
export const filteredHotelSelector = selector({
    key: 'filteredHotelSelector',
    get: ({ get }) => {
        const searchTerm = get(searchTermState);
        const hotelData = get(hotelDataState);
        const queryArray = searchTerm.split(',').map(q => q.trim().toLowerCase().replace(/\s+/g, ''));

        return hotelData.filter(hotel =>
            queryArray.every(q =>
                hotel.country.toLowerCase().includes(q)
                ||
                (Array.isArray(hotel.region) && hotel.region.some(region => region.toLowerCase().includes(q)))
                ||
                hotel.title.toLowerCase().includes(q)
                ||
                (Array.isArray(hotel.searchWord) && hotel.searchWord.some(search => search.toLowerCase().replace(/\s+/g, '').includes(q)))
            )
        );
    }
});
