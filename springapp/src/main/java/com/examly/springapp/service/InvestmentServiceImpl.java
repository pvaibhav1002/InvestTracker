package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exception.DuplicateInvestmentException;
import com.examly.springapp.exception.InvestmentException;
import com.examly.springapp.model.Investment;
import com.examly.springapp.repository.InvestmentRepo;

@Service
public class InvestmentServiceImpl implements InvestmentService {
    InvestmentRepo investmentRepo;

    @Autowired
    public InvestmentServiceImpl(InvestmentRepo investmentRepo) {
        this.investmentRepo = investmentRepo;
    }

    @Override
    public Investment addInvestment(Investment investment) {
        if (investmentRepo.existsByName(investment.getName())) {
            throw new DuplicateInvestmentException("Investment already exists");
        }
        if (investment.getCurrentPrice() < 0 || investment.getPurchasePrice() < 0) {
            throw new InvestmentException("Price can't be negative");
        }
        if (investment.getQuantity() < 0) {
            throw new InvestmentException("Quantity can't be negative");
        }
        return investmentRepo.save(investment);
    }

    @Override
    public Boolean deleteInvestment(Long investmentId) {
        Optional<Investment> optInvest = investmentRepo.findById(investmentId);
        if (optInvest.isPresent()) {
            Investment invest = optInvest.get();
            investmentRepo.delete(invest);
            return true;
        }
        return false;
    }

    @Override
    public List<Investment> getAllInvestments() {
        return investmentRepo.findAll();
    }

    @Override
    public Investment getInvestmentById(Long investmentId) {
        Optional<Investment> optInvest = investmentRepo.findById(investmentId);
        if (optInvest.isPresent()) {
            return optInvest.get();
        }
        return null;
    }

    @Override
    public List<Investment> getInvestmentByStatus(String status) {
        return investmentRepo.findByStatus(status);
    }

    @Override
    public List<Investment> getInvestmentByType(String type) {
        return investmentRepo.findByType(type);
    }

    @Override
    public List<Investment> searchInvestments(String keyword) {
        return investmentRepo
                .findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrTypeContainingIgnoreCase(
                        keyword, keyword,keyword);
    }

    @Override
    public Investment updateInvestment(Long investmentId, Investment updatedInvestment) {
        Optional<Investment> optInvest = investmentRepo.findById(investmentId);
        if (optInvest.isPresent()) {
            Investment invest = optInvest.get();
            invest.setCurrentPrice(updatedInvestment.getCurrentPrice());
            invest.setDescription(updatedInvestment.getDescription());
            invest.setName(updatedInvestment.getName());
            invest.setPurchaseDate(updatedInvestment.getPurchaseDate());
            invest.setPurchasePrice(updatedInvestment.getPurchasePrice());
            invest.setQuantity(updatedInvestment.getQuantity());
            invest.setStatus(updatedInvestment.getStatus());
            invest.setType(updatedInvestment.getType());
            return investmentRepo.save(invest);
        }
        return null;
    }

}
