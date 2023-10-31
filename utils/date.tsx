import { DAYS_OF_THE_WEEK } from './constants'

export const day = () => DAYS_OF_THE_WEEK[new Date().getDay()]

export const prevDay = (num: number) => {
    let date = new Date()
    
    date.setDate(date.getDate() - (num || 1))
    
    return DAYS_OF_THE_WEEK[date.getDay()]
}

export const isValidDay = (day: string) => DAYS_OF_THE_WEEK.includes(day)

export const formatDate = (date: string) => new Date(date).toLocaleDateString("en-US")