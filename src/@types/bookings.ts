import { Booking } from "../interfaces/Booking"

export type CheckBookingType = Pick<Booking,"room"|"checkInDate"|"checkOutDate">

export type allBookingsType = {
  count:number,
  page:number,
  pages:number,
  bookings:Booking[]
}

export type newBookingType = {
    data:Omit<Booking,"paidAt">,
    token:string
}

export type deleteBookingType = {
    token:string,
    id:string
}

export type getAllBookingType = {
    token:string,
    currentPage:number
}