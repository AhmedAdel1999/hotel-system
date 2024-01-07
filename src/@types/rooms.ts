import { Reviews, Room } from "../interfaces/Room"

export type allRoomsType={
    rooms:Room[],
    page:number,
    pages:number,
    count:number
}

export type getAllRoomsType={
    currentPage:Number,
    numOfBeds:number|string,
    roomType:string,
    search:string
}

export type AddNewRoomType = {
    token:string,
    data:Omit<Room,"_id"|"ratings"|"numOfReviews"|"reviews"|"user">
}
export type updateRoomType = {
    token:string,
    roomId:string | undefined,
    data:Omit<Room,"_id"|"ratings"|"numOfReviews"|"reviews"|"user">
}

export type deleteRoomType = {
    id:string,
    token:string
}

export type addRoomReviewType = {
    data:Reviews,
    token:string,
    roomId:string
}