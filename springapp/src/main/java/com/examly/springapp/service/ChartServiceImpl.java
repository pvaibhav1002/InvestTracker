package com.examly.springapp.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.AdminConsoleDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.FeedbackRepo;
import com.examly.springapp.repository.InvestmentInquiryRepo;
import com.examly.springapp.repository.InvestmentRepo;
import com.examly.springapp.repository.UserRepo;

@Service
public class ChartServiceImpl implements ChartService {
    FeedbackRepo feedbackRepo;
    InvestmentInquiryRepo investmentInquiryRepo;
    InvestmentRepo investmentRepo;
    UserRepo userRepo;

    @Autowired
    public ChartServiceImpl(FeedbackRepo feedbackRepo, InvestmentInquiryRepo investmentInquiryRepo,
            InvestmentRepo investmentRepo, UserRepo userRepo) {
        this.feedbackRepo = feedbackRepo;
        this.investmentInquiryRepo = investmentInquiryRepo;
        this.investmentRepo = investmentRepo;
        this.userRepo = userRepo;
    }

    public AdminConsoleDTO getAdminConsoleData() {
        AdminConsoleDTO dto = new AdminConsoleDTO();

        dto.setTotalUsers(userRepo.countByUserRole("User"));
        dto.setTotalInvestments(investmentRepo.count());

        Double totalInvestedAmount = investmentRepo.getTotalInvestedAmount();
        dto.setTotalInvestedAmount(totalInvestedAmount != null ? totalInvestedAmount : 0.0);

        List<User> users = userRepo.findAll();
        List<AdminConsoleDTO.UserInvestmentSummary> summaries = new ArrayList<>();

        for (User user : users) {
            AdminConsoleDTO.UserInvestmentSummary summary = new AdminConsoleDTO.UserInvestmentSummary();
            summary.setUserId(user.getUserId());
            summary.setUsername(user.getUsername());
            summary.setActive(user.isAccountActiveStatus());
            dto.setDistributionByType(convertToMap(investmentRepo.getTypeDistribution()));
            dto.setDistributionBySector(convertToMap(investmentRepo.getSectorDistribution()));
            dto.setDistributionByCapSize(convertToMap(investmentRepo.getCapSizeDistribution()));

            Double totalInvested = investmentRepo.getTotalInvestedByUser(user.getUserId());
            Double currentInvestment = investmentRepo.getCurrentInvestmentByUser(user.getUserId());
            Double profit = investmentRepo.getProfitByUser(user.getUserId());

            summary.setTotalInvested(totalInvested != null ? totalInvested : 0.0);
            summary.setCurrentInvestment(currentInvestment != null ? currentInvestment : 0.0);
            summary.setCurrentProfit(profit != null ? profit : 0.0);

            summaries.add(summary);
        }

        dto.setUserSummaries(summaries);
        return dto;
    }

    private Map<String, Long> convertToMap(List<Object[]> rawData) {
        Map<String, Long> map = new HashMap<>();
        for (Object[] row : rawData) {
            String key = row[0] != null ? row[0].toString() : "Unknown";
            Long value = row[1] != null ? ((Number) row[1]).longValue() : 0L;
            map.put(key, value);
        }
        return map;
    }

}
