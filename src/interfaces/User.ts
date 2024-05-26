export type PaymentInfo={
    id:string
    email_address:string
}
export type Booking={
    roomName:string
    bookingId:string
    userName:string
    checkInDate:Date
    checkOutDate:Date
    amountPaid:number
    daysOfStay:number
}
export interface UserLogin{
    email:string,
    password:string,
}
export interface UserRegister extends UserLogin{
    name:string,
    avatar?:string,
    isAdmin:boolean,
    bookings:Booking[]
}
export interface User extends UserRegister{
    id:string
}