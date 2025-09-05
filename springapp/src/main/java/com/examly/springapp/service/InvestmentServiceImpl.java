package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exception.DuplicateInvestmentException;
import com.examly.springapp.exception.InvestmentException;
import com.examly.springapp.model.Feedback;
import com.examly.springapp.model.Investment;
import com.examly.springapp.model.UserInvestment;
import com.examly.springapp.model.Watchlist;
import com.examly.springapp.repository.FeedbackRepo;
import com.examly.springapp.repository.InvestmentRepo;
import com.examly.springapp.repository.UserInvestmentRepo;
import com.examly.springapp.repository.WatchlistRepo;

@Service
public class InvestmentServiceImpl implements InvestmentService {
    InvestmentRepo investmentRepo;
    UserInvestmentRepo userInvestmentRepo;
    WatchlistRepo watchlistRepo;
    FeedbackRepo feedbackRepo;

    @Autowired
    public InvestmentServiceImpl(InvestmentRepo investmentRepo, UserInvestmentRepo userInvestmentRepo,
            WatchlistRepo watchlistRepo, FeedbackRepo feedbackRepo) {
        this.investmentRepo = investmentRepo;
        this.userInvestmentRepo = userInvestmentRepo;
        this.watchlistRepo = watchlistRepo;
        this.feedbackRepo = feedbackRepo;
    }

    @Override
    public Investment addInvestment(Investment investment) {
        if (investmentRepo.existsByName(investment.getName())) {
            throw new DuplicateInvestmentException("Investment already exists");
        }
        if (investment.getPrice() < 0) {
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

            List<UserInvestment> userInvestments = userInvestmentRepo.findByInvestment(invest);
            userInvestmentRepo.deleteAll(userInvestments);

            List<Watchlist> watchlistEntries = watchlistRepo.findByInvestment(invest);
            watchlistRepo.deleteAll(watchlistEntries);

            List<Feedback> feedbackEntries = feedbackRepo.findByInvestment_InvestmentId(investmentId);
            feedbackRepo.deleteAll(feedbackEntries);

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
                        keyword, keyword, keyword);
    }

    @Override
    public Investment updateInvestment(Long investmentId, Investment updatedInvestment) {
        Optional<Investment> optInvest = investmentRepo.findById(investmentId);
        if (optInvest.isPresent()) {
            Investment invest = optInvest.get();
            invest.setDescription(updatedInvestment.getDescription());
            invest.setName(updatedInvestment.getName());
            invest.setPostedDate(updatedInvestment.getPostedDate());
            invest.setPrice(updatedInvestment.getPrice());
            invest.setQuantity(updatedInvestment.getQuantity());
            invest.setStatus(updatedInvestment.getStatus());
            invest.setType(updatedInvestment.getType());
            return investmentRepo.save(invest);
        }
        return null;
    }

}
