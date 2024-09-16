import { atom } from 'recoil';

export const reserveCheckInState = atom({
    key: 'reserveCheckInState',
    default: ''
})

export const reserveCheckOutState = atom({
    key: 'reserveCheckOutState',
    default: ''
})

export const reserveRoomState = atom({
    key: 'reservePersonState',
    default: 0
})

export const reserveAdultState = atom({
    key: 'reserveAdultState',
    default: 0
})

export const reserveChildState = atom({
    key: 'reserveChildState',
    default: 0
})
