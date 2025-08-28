package com.examly.springapp.service;
 
import java.util.List;
 
import com.examly.springapp.model.InvestmentInquiry;
 
public interface InvestmentInquiryService {
    InvestmentInquiry createInquiry(InvestmentInquiry investmentInquiry);
    InvestmentInquiry updateInquiry(Long inquiryId, InvestmentInquiry updatedInvestmentInquiry);
    List<InvestmentInquiry> getInquiriesByUserId(Long userId);
    List<InvestmentInquiry>getInquiriesByInvestmentId(Long investmentId);
    List<InvestmentInquiry>getUnresolvedInquiries();
    List<InvestmentInquiry>getInquiriesByPriority(String priority);
    List<InvestmentInquiry>getAllInquiries();
    InvestmentInquiry getInquiryById(Long inquiryId);
    Boolean deleteInquiry(Long inquiryId);
 
}