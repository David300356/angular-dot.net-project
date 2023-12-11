export interface SideNavItem {
    title: string;
    link: string;
    icon:string;
  }
export interface Station{
    id:number;
    code:string;
    name:string;
    phone:string;
    city:string;
    address:string;
  }
export interface Police{
    id:number;
    name:string;
    email:string;
    phone:string;
    serialNumber:string;
    idNumber:string;
    rankId:number;
    createdOn:string;
    stationId:number;

}
export interface Rank {
   rankName:string;
   id:number;
}
export enum UserType {
  ADMIN,
  USER,
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  blocked: boolean;
  active: boolean;
  createdOn: string;
  userType: UserType;
  fine: number;
}