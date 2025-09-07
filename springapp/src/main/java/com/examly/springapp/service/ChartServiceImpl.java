package com.examly.springapp.service;

import com.examly.springapp.model.*;
import com.examly.springapp.repository.InvestmentRepo;
import com.examly.springapp.repository.UserInvestmentRepo;
import com.examly.springapp.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class ChartServiceImpl implements ChartService {
    private final UserRepo userRepo;
    private final InvestmentRepo investmentRepo;
    private final UserInvestmentRepo userInvestmentRepo;

    @Autowired
    public ChartServiceImpl(UserRepo userRepo, InvestmentRepo investmentRepo, UserInvestmentRepo userInvestmentRepo) {
        this.userRepo = userRepo;
        this.investmentRepo = investmentRepo;
        this.userInvestmentRepo = userInvestmentRepo;
    }

    public AdminConsoleDTO getAdminConsoleData() {
        AdminConsoleDTO dto = new AdminConsoleDTO();
        dto.setTotalUsers(userRepo.countByUserRole("User"));
        dto.setTotalInvestments(investmentRepo.count());
        dto.setTotalInvestedAmount(userInvestmentRepo.getTotalMoneyInvestedByAllUsers());
        dto.setDistributionByType(getInvestmentDistributionByType());
        dto.setDistributionBySector(getInvestmentDistributionBySector());
        dto.setDistributionByCapSize(getInvestmentDistributionByCapSize());

        List<AdminConsoleDTO.UserInvestmentSummary> userSummaries = new ArrayList<>();
        for (User user : userRepo.findByUserRole("User")) {
            Double totalInvested = userInvestmentRepo.getTotalInvestedByUser(user.getUserId());
            totalInvested = totalInvested != null ? totalInvested : 0.0;
            Double currentInvestment = userInvestmentRepo.getCurrentInvestmentByUser(user.getUserId());
            currentInvestment = currentInvestment != null ? currentInvestment : 0.0;
            double currentProfit = currentInvestment - totalInvested;
            AdminConsoleDTO.UserInvestmentSummary summary = new AdminConsoleDTO.UserInvestmentSummary(user.getUserId(), user.getUsername(), user.isAccountStatus(), totalInvested, currentInvestment, currentProfit);
            userSummaries.add(summary);
        }
        dto.setUserSummaries(userSummaries);
        return dto;
    }

    private Map<String, Long> getInvestmentDistributionByType() {
        Map<String, Long> distribution = new HashMap<>();
        List<Object[]> results = investmentRepo.countInvestmentsByType();
        for (Object[] result : results) {
            String type = (String) result[0];
            Long count = (Long) result[1];
            distribution.put(type, count);
        }
        return distribution;
    }

    private Map<String, Long> getInvestmentDistributionBySector() {
        Map<String, Long> distribution = new HashMap<>();
        List<Object[]> results = investmentRepo.countInvestmentsBySector();
        for (Object[] result : results) {
            String sector = (String) result[0];
            Long count = (Long) result[1];
            distribution.put(sector, count);
        }
        return distribution;
    }

    private Map<String, Long> getInvestmentDistributionByCapSize() {
        Map<String, Long> distribution = new HashMap<>();
        List<Object[]> results = investmentRepo.countInvestmentsByCapSize();
        for (Object[] result : results) {
            String capSize = (String) result[0];
            Long count = (Long) result[1];
            distribution.put(capSize, count);
        }
        return distribution;
    }

    public UserPortfolioDTO getUserPortfolioData(Long userId) {
        Double totalInvested = userInvestmentRepo.getTotalInvestedByUser(userId);
        Double currentValue = userInvestmentRepo.getCurrentInvestmentByUser(userId);
        totalInvested = totalInvested != null ? totalInvested : 0.0;
        currentValue = currentValue != null ? currentValue : 0.0;
        Double profitOrLossAmount = currentValue - totalInvested;
        String profitOrLossLabel = getProfitOrLossLabel(profitOrLossAmount);
        Map<String, Long> distributionByType = getInvestmentDistributionByTypeForUser(userId);
        Map<String, Long> distributionBySector = getInvestmentDistributionBySectorForUser(userId);
        Map<String, Long> distributionByCapSize = getInvestmentDistributionByCapSizeForUser(userId);

        List<UserInvestment> userInvestments = userInvestmentRepo.findByUserUserId(userId);
        List<UserPortfolioDTO.InvestmentSummary> investmentSummaries = userInvestments.stream().map(ui -> {
            Investment inv = ui.getInvestment();
            double investedAmount = ui.getPurchasePrice() * ui.getQuantityBought();
            double currentAmount = inv.getPrice() * ui.getQuantityBought();
            double profitOrLoss = currentAmount - investedAmount;

            return new UserPortfolioDTO.InvestmentSummary(inv.getInvestmentId(), inv.getName(), inv.getType(), inv.getSector(), // ✅ add sector
                    inv.getCapSize(), // ✅ add capSize
                    ui.getQuantityBought(), ui.getPurchasePrice(), inv.getPrice(), profitOrLoss);
        }).toList();

        return new UserPortfolioDTO(totalInvested, currentValue, profitOrLossAmount, profitOrLossLabel, distributionByType, distributionBySector, distributionByCapSize, investmentSummaries);
    }

    private String getProfitOrLossLabel(Double profitOrLossAmount) {
        if (profitOrLossAmount > 0) {
            return "Profit";
        } else if (profitOrLossAmount < 0) {
            return "Loss";
        } else {
            return "No Change";
        }
    }

    public Map<String, Long> getInvestmentDistributionByTypeForUser(Long userId) {
        Map<String, Long> distribution = new HashMap<>();
        List<Object[]> results = userInvestmentRepo.countInvestmentsByTypeForUser(userId);
        for (Object[] result : results) {
            String type = (String) result[0];
            Long count = (Long) result[1];
            distribution.put(type, count);
        }
        return distribution;
    }

    public Map<String, Long> getInvestmentDistributionBySectorForUser(Long userId) {
        Map<String, Long> distribution = new HashMap<>();
        List<Object[]> results = userInvestmentRepo.countInvestmentsBySectorForUser(userId);
        for (Object[] result : results) {
            String sector = (String) result[0];
            Long count = (Long) result[1];
            distribution.put(sector, count);
        }
        return distribution;
    }

    public Map<String, Long> getInvestmentDistributionByCapSizeForUser(Long userId) {
        Map<String, Long> distribution = new HashMap<>();
        List<Object[]> results = userInvestmentRepo.countInvestmentsByCapSizeForUser(userId);
        for (Object[] result : results) {
            String capSize = (String) result[0];
            Long count = (Long) result[1];
            distribution.put(capSize, count);
        }
        return distribution;
    }


    public UserInvestment buyInvestment(UserInvestment request) {
        User user = userRepo.findById(request.getUser().getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        Investment investment = investmentRepo.findById(request.getInvestment().getInvestmentId()).orElseThrow(() -> new RuntimeException("Investment not found"));
        if (request.getQuantityBought() <= 0) {
            throw new IllegalStateException("Quantity must be greater than zero");
        }

        if (investment.getQuantity() < request.getQuantityBought()) {
            throw new IllegalStateException("Not enough quantity available");
        }

        int quantityToBuy = request.getQuantityBought();
        double currentPrice = investment.getPrice();

        investment.setQuantity(investment.getQuantity() - request.getQuantityBought());
        investmentRepo.save(investment);

        Optional<UserInvestment> existingInvestmentOpt = userInvestmentRepo.findByUserAndInvestment(user, investment);


        UserInvestment userInvestment;
        if (existingInvestmentOpt.isPresent()) {
            userInvestment = existingInvestmentOpt.get();

            int existingQuantity = userInvestment.getQuantityBought();
            double existingPrice = userInvestment.getPurchasePrice();

            int totalQuantity = existingQuantity + quantityToBuy;

            double weightedPrice = ((existingQuantity * existingPrice) + (quantityToBuy * currentPrice)) / totalQuantity;


            userInvestment.setQuantityBought(totalQuantity);
            userInvestment.setPurchasePrice(weightedPrice);
            userInvestment.setPurchaseDate(LocalDate.now());
        } else {
            userInvestment = new UserInvestment();
            userInvestment.setUser(user);
            userInvestment.setInvestment(investment);
            userInvestment.setQuantityBought(quantityToBuy);
            userInvestment.setPurchaseDate(LocalDate.now());
            userInvestment.setPurchasePrice(currentPrice);
        }

        return userInvestmentRepo.save(userInvestment);
    }

}
