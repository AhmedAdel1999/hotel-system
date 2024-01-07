export const AddConfigObj = (token:string) =>{
    return{
        headers: {
            "Content-Type": "application/JSON",
            "Authorization": `Bearer ${token}`
        }
    }
}