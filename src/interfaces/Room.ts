export type Reviews={
    userId:string,
    name:string,
    rating:number | null,
    comment:string
}

export interface Room{
    id:string,
    name:string,
    description:string,
    image:string,
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
    category:'King' | 'Single' | 'Twins',
    reviews:Reviews[]
    userId:string
}
