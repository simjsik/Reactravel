import { atom } from 'recoil';

export const mapCenterLatState = atom({
    key: 'mapCenterLatState',
    default: 1
})
export const mapCenterLngState = atom({
    key: 'mapCenterLngState',
    default: 1
})
export const currentZoomState = atom<number>({
    key: 'currentZoomState',
    default: 5
})

