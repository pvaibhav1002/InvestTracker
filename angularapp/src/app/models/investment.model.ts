import { User } from "./user.model";

export interface Investment{
    investmentId?:number;
    name?:string;
    description?:string;
    type?:string;
    price?:number;
    quantity?:number;
    postedDate?:string;
    status?:string;   
}