package com.examly.springapp.service;
import com.examly.springapp.model.AdminConsoleDTO;
import com.examly.springapp.model.UserInvestment;
import com.examly.springapp.model.UserPortfolioDTO;
public interface ChartService {
    public AdminConsoleDTO getAdminConsoleData();
    public UserPortfolioDTO getUserPortfolioData(Long userId);
    UserInvestment buyInvestment(UserInvestment request);
}
