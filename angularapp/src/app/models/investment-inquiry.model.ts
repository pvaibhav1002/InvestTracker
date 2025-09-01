import { Investment } from "./investment.model";
import { User } from "./user.model";

export interface InvestmentInquiry {
    inquiryId?: number;
    questions?: string;
    reasonOfInterest?: string;
    inquiryDate?: string
    riskTolerance?: string;
    expectedReturn?: number;
    status?: string;
    responseDate?: string;
    adminResponse?: string;
    contactDetails?: string;
    user: User;
    investment: Investment;
}