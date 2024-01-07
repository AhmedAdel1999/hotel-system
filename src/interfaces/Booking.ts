export type PaymentInfo={
    id:string
    email_address:string
}
export interface Booking{
    room:string
    user:string
    checkInDate:Date
    checkOutDate:Date
    amountPaid:number
    daysOfStay:number
    paymentInfo:PaymentInfo
    paidAt:Date
}