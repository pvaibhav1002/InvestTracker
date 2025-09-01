import { Investment } from "./investment.model";
import { User } from "./user.model";
 
export interface Feedback{
    feedbackId?:number;
    feedbackText?:string;
    date?:string;
    category?:string;
    user?:User;
    investment?:Investment;
}