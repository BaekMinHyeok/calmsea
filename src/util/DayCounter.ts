// import moment from 'moment'

export const DayCounter = (createdAt: Date): string => {
    // createdAt이 문자열인 경우 Date 객체로 변환
    const createdAtDate =
        typeof createdAt === 'string' ? new Date(createdAt) : createdAt

    console.log('Converted createdAt:', createdAtDate)

    // createdAtDate가 Date 객체가 아닌 경우 유효하지 않은 날짜로 처리
    if (!(createdAtDate instanceof Date) || isNaN(createdAtDate.getTime())) {
        return '유효하지 않은 날짜'
    }

    const now = new Date()
    const diffInMillis = now.getTime() - createdAtDate.getTime()

    const minutes = Math.floor(diffInMillis / (1000 * 60))
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) {
        return `${days}일 전`
    } else if (hours > 0) {
        return `${hours}시간 전`
    } else if (minutes > 0) {
        return `${minutes}분 전`
    } else {
        return '방금 전'
    }
}
