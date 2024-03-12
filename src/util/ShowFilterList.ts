import { PostState } from '@/recoil/atoms/postState'

export const sortFunction: {
    [key: string]: (a: PostState, b: PostState) => number
} = {
    latest: (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),

    oldest: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    priceHigh: (a, b) => b.price - a.price,
    priceLow: (a, b) => a.price - b.price,
}

export const recommendedFilter: {
    [key: string]: (a: PostState, b: PostState) => number
} = {
    recommendTickets: (a, b) => b.like - a.like,
    ticketRanking: (a, b) => a.quantity - b.quantity,
}
