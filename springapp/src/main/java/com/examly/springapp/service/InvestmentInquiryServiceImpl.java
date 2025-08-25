package com.examly.springapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.InvestmentInquiry;
import com.examly.springapp.repository.InvestmentInquiryRepo;

@Service
public class InvestmentInquiryServiceImpl implements InvestmentInquiryService {
    InvestmentInquiryRepo investmentInquiryRepo;

    @Autowired
    public InvestmentInquiryServiceImpl(InvestmentInquiryRepo investmentInquiryRepo) {
        this.investmentInquiryRepo = investmentInquiryRepo;
    }

    @Override
    public InvestmentInquiry createInquiry(InvestmentInquiry investmentInquiry) {
        return investmentInquiryRepo.save(investmentInquiry);
    }

    @Override
    public Boolean deleteInquiry(Long inquiryId) {
        Optional<InvestmentInquiry> optInvest = investmentInquiryRepo.findById(inquiryId);
        if (optInvest.isPresent()) {
            InvestmentInquiry investIq = optInvest.get();
            investmentInquiryRepo.delete(investIq);
            return true;
        }
        return false;
    }

    @Override
    public List<InvestmentInquiry> getAllInquiries() {
        return investmentInquiryRepo.findAll();
    }

    @Override
    public List<InvestmentInquiry> getInquiriesByInvestmentId(Long investmentInquiryId) {
        Optional<List<InvestmentInquiry>> optInvest = investmentInquiryRepo
                .findByInvestment_InvestmentId(investmentInquiryId);
        if (optInvest.isPresent()) {
            return optInvest.get();
        }
        return new ArrayList<>();
    }

    @Override
    public List<InvestmentInquiry> getInquiriesByPriority(String priority) {
        return investmentInquiryRepo.findByPriority(priority);
    }

    @Override
    public InvestmentInquiry getInquiryById(Long inquiryId) {
        Optional<InvestmentInquiry> optInq = investmentInquiryRepo.findById(inquiryId);
        if (optInq.isPresent()) {
            return optInq.get();
        }
        return null;
    }

    @Override
    public List<InvestmentInquiry> getInquiriesByUserId(Long userId) {
        return investmentInquiryRepo.findByUser_UserId(userId);
    }

    @Override
    public List<InvestmentInquiry> getUnresolvedInquiries() {
        return investmentInquiryRepo.findByStatus("Pending");
    }

    @Override
    public InvestmentInquiry updateInquiry(Long inquiryId, InvestmentInquiry updatedInvestmentInquiry) {
        Optional<InvestmentInquiry> optInvest = investmentInquiryRepo.findById(inquiryId);
        if (optInvest.isPresent()) {
            InvestmentInquiry investInq = optInvest.get();
            investInq.setAdminResponse(updatedInvestmentInquiry.getAdminResponse());
            investInq.setContactDetails(updatedInvestmentInquiry.getContactDetails());
            investInq.setInquiryDate(updatedInvestmentInquiry.getInquiryDate());
            investInq.setInvestment(updatedInvestmentInquiry.getInvestment());
            investInq.setMessage(updatedInvestmentInquiry.getMessage());
            investInq.setPriority(updatedInvestmentInquiry.getPriority());
            investInq.setResponseDate(updatedInvestmentInquiry.getResponseDate());
            investInq.setStatus(updatedInvestmentInquiry.getStatus());
            return investmentInquiryRepo.save(investInq);
        }
        return null;
    }
}
