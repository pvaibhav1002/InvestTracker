package com.examly.springapp.service;
 
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
 
import com.examly.springapp.model.AdminConsoleDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.InvestmentRepo;
import com.examly.springapp.repository.UserRepo;
import com.examly.springapp.repository.UserInvestmentRepo;
 
@Service
public class ChartServiceImpl implements ChartService {
    private UserRepo userRepo;
    private InvestmentRepo investmentRepo;
    private UserInvestmentRepo userInvestmentRepo;
 
    @Autowired
    public ChartServiceImpl(UserRepo userRepo,InvestmentRepo investmentRepo,UserInvestmentRepo userInvestmentRepo) {
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
        for (User user : userRepo.findAll()) {
            Double totalInvested = userInvestmentRepo.getTotalInvestedByUser(user.getUserId());
            totalInvested = totalInvested != null ? totalInvested : 0.0;
            Double currentInvestment = userInvestmentRepo.getCurrentInvestmentByUser(user.getUserId());
            currentInvestment = currentInvestment != null ? currentInvestment : 0.0;
 
            double currentProfit = currentInvestment - totalInvested;
 
            AdminConsoleDTO.UserInvestmentSummary summary = new AdminConsoleDTO.UserInvestmentSummary(
                    user.getUserId(),
                    user.getUsername(),
                    user.isAccountStatus(),
                    totalInvested,
                    currentInvestment,
                    currentProfit);
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
 
}
