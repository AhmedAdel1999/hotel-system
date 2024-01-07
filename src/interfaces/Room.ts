
export type Image={
    image:string,
    _id?:string
}
export type Reviews={
    user:string,
    name:string,
    rating:number | null,
    comment:string
}

export interface Room{
    _id:string,
    name:string,
    description:string,
    images:Image[],
    pricePerNight:number,
    address:string
    guestCapacity:number,
    numOfBeds:number,
    internet:boolean,
    breakfast:boolean
    airConditioned:boolean,
    petsAllowed:boolean
    roomCleaning:boolean,
    ratings:number
    numOfReviews:number
    category:'King' | 'Single' | 'Twins',
    reviews:Reviews[]
    user:string
}
