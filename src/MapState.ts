import { atom } from 'recoil';

export const mapCenterLatState = atom<number>({
    key: 'mapCenterLatState',
    default: 0
})
export const mapCenterLngState = atom<number>({
    key: 'mapCenterLngState',
    default: 0
})
export const centerDistanceState = atom<number>({
    key: 'centerDistanceState',
    default: 0
})