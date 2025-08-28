package com.examly.springapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Investment;
import com.examly.springapp.model.InvestmentInquiry;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.InvestmentInquiryRepo;
import com.examly.springapp.repository.InvestmentRepo;
import com.examly.springapp.repository.UserRepo;

@Service
public class InvestmentInquiryServiceImpl implements InvestmentInquiryService {
    InvestmentInquiryRepo investmentInquiryRepo;
    InvestmentRepo investmentRepo;
    UserRepo userRepo;

    @Autowired
    public InvestmentInquiryServiceImpl(InvestmentInquiryRepo investmentInquiryRepo,UserRepo userRepo,InvestmentRepo investmentRepo) {
        this.investmentInquiryRepo = investmentInquiryRepo;
        this.userRepo=userRepo;
        this.investmentRepo=investmentRepo;
    }

    @Override
    public InvestmentInquiry createInquiry(InvestmentInquiry investmentInquiry) {
        if (investmentInquiry.getUser().getUserId()==null) {
            return null;
        }
        if (investmentInquiry.getInvestment().getInvestmentId()==null) {
            return null;
        }
        Optional<User> user=userRepo.findById(investmentInquiry.getUser().getUserId());
        Optional<Investment> investment=investmentRepo.findById(investmentInquiry.getInvestment().getInvestmentId());

        if (user.isPresent() && investment.isPresent()) {
            investmentInquiry.setContactDetails(user.get().getMobileNumber());
            System.out.println("impl"+investmentInquiry);
            return investmentInquiryRepo.save(investmentInquiry);
        }
        return null;
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
