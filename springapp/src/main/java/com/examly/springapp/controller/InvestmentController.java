package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Investment;
import com.examly.springapp.service.InvestmentService;

@RestController
@RequestMapping("api/investments")
public class InvestmentController {
    InvestmentService investmentService;

    @Autowired
    public InvestmentController(InvestmentService investmentService) {
        this.investmentService = investmentService;
    }

    @PostMapping
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<Investment> addInvestment(@RequestBody Investment investment) {
        Investment newInvestment = investmentService.addInvestment(investment);
        if (newInvestment == null) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.status(201).body(newInvestment);
    }

    @GetMapping
    public ResponseEntity<List<Investment>> viewAllInvestments() {
        List<Investment> newInvestment = investmentService.getAllInvestments();
        if (newInvestment == null) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.status(200).body(newInvestment);

    }

    @GetMapping("/{investmentId}")
    public ResponseEntity<Investment> viewInvestmentById(@PathVariable long investmentId) {
        Investment newInvestment = investmentService.getInvestmentById(investmentId);
        if (newInvestment == null) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.status(200).body(newInvestment);
    }

    @PutMapping("/{investmentId}")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<Investment> updateInvestment(@PathVariable long investmentId,
            @RequestBody Investment updatedInvestment) {
        Investment newInvestment = investmentService.updateInvestment(investmentId, updatedInvestment);
        if (newInvestment == null) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.status(200).body(newInvestment);
    }

    @DeleteMapping("/{investmentId}")
    public ResponseEntity<Boolean> deleteInvestment(@PathVariable long investmentId) {
        boolean newInvestment = investmentService.deleteInvestment(investmentId);
        if (newInvestment) {
            return ResponseEntity.status(200).body(true);
        }
        return ResponseEntity.status(403).body(false);
    }
}
