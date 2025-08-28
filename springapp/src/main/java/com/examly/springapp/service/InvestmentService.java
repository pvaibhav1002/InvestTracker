package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.model.Investment;

public interface InvestmentService {
    Investment addInvestment(Investment investment);
    Investment updateInvestment(Long investmentId,Investment updatedInvestment);
    Investment getInvestmentById(Long investmentId);
    List<Investment> getAllInvestments();
    List<Investment> getInvestmentByType(String type);
    List<Investment> getInvestmentByStatus(String status);
    List<Investment> searchInvestments(String keyword);
    Boolean deleteInvestment(Long investmentId);

}
