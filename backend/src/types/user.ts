import { ObjectId, Timestamp } from "mongodb";

export interface UserData {
  _id: ObjectId,
  username: string,
  uid: string,
  roles: Array<string>,
  accessToken: string
}

export interface Store{
  _id:ObjectId,
  uid:string,
  image:object,
  date:Timestamp,
}

export interface SharedResource{
    _id:ObjectId,
    fromId:string,
    toId:string,
    date:Timestamp,
    image:object,
    access:Boolean // 1-edit 0-view
}

