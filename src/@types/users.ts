import { User, UserRegister } from "../interfaces/User"

export type userInfo = Omit<User,'password'>

export type allUsers ={
  count:number,
  page:number,
  pages:number,
  users:User[]
}

export type updateProfileType ={
    data:Omit<UserRegister,'password'>,
    token:string
}

export type updatePasswordType = {
    token:string,
    data:{oldPassword:string,newPassword:string}
}

export type updateUserType={
  token:string,
  userId:string | undefined,
  data:{email:string,name:string,isAdmin:boolean}
}

export type getAllUsersType = {
  token:string,
  currentPage:number
}

export type deleteUserType = {
  token:string,
  id:string
}