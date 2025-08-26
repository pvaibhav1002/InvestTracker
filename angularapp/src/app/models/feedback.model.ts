import { Investment } from "./investment.model";

export interface Feedback{
    feedbackId?:number;
    feedbackText:string;
    date:string;
    user:User;
    investment:Investment;
    category:string;
}