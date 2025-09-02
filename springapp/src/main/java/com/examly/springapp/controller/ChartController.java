package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.model.AdminConsoleDTO;
import com.examly.springapp.model.UserPortfolioDTO;
import com.examly.springapp.service.ChartService;

@RestController
@RequestMapping("/api")
public class ChartController {
    private ChartService chartService;

    @Autowired
    public ChartController(ChartService chartService) {
        this.chartService = chartService;
    }

    @GetMapping("/admin/console")
    public ResponseEntity<AdminConsoleDTO> getConsoleData() {
        AdminConsoleDTO adminConsoleData = chartService.getAdminConsoleData();
        if (adminConsoleData == null) {
            return ResponseEntity.status(500).build();
        }
        return ResponseEntity.status(200).body(adminConsoleData);
    }

    @GetMapping("/user/{userId}/portfolio")
    public ResponseEntity<UserPortfolioDTO> getPortfolioData(@PathVariable Long userId) {
        UserPortfolioDTO portfolio = chartService.getUserPortfolioData(userId);
        if (portfolio == null) {
            return ResponseEntity.status(500).build();
        }
        return ResponseEntity.status(200).body(portfolio);
    }

}