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

import com.examly.springapp.model.InvestmentInquiry;

import com.examly.springapp.service.InvestmentInquiryService;

@RestController

@RequestMapping("/api/inquiries")

public class InvestmentInquiryController {

    InvestmentInquiryService investmentInquiryService;

    @Autowired

    public InvestmentInquiryController(InvestmentInquiryService investmentInquiryService) {

        this.investmentInquiryService = investmentInquiryService;

    }

    @PostMapping

    @PreAuthorize("hasRole('User')")

    public ResponseEntity<InvestmentInquiry> addInvestmentInquiry(@RequestBody InvestmentInquiry investmentinquiry) {

        System.out.println("control" + investmentinquiry);

        InvestmentInquiry newInvest = investmentInquiryService.createInquiry(investmentinquiry);

        System.out.println("control" + newInvest);

        if (newInvest == null) {

            return ResponseEntity.status(403).build();

        }

        return ResponseEntity.status(201).body(newInvest);

    }

    @GetMapping("/{inquiryId}")

    public ResponseEntity<InvestmentInquiry> viewInvestmentInquiryById(@PathVariable long inquiryId) {

        InvestmentInquiry newInvest = investmentInquiryService.getInquiryById(inquiryId);

        if (newInvest == null) {

            return ResponseEntity.status(403).build();

        }

        return ResponseEntity.status(201).body(newInvest);

    }

    @GetMapping()

    @PreAuthorize("hasRole('Admin')")

    public ResponseEntity<List<InvestmentInquiry>> viewAllInquiries() {

        List<InvestmentInquiry> newInvest = investmentInquiryService.getAllInquiries();

        if (newInvest == null) {

            return ResponseEntity.status(403).build();

        }

        return ResponseEntity.status(200).body(newInvest);

    }

    @GetMapping("/user/{userId}")

    public ResponseEntity<List<InvestmentInquiry>> viewInvestmentInquiryByUserId(@PathVariable long userId) {

        List<InvestmentInquiry> newInvest = investmentInquiryService.getInquiriesByUserId(userId);

        if (newInvest == null) {

            return ResponseEntity.status(403).build();

        }

        return ResponseEntity.status(200).body(newInvest);

    }

    @PutMapping("/{inquiryId}")

    public ResponseEntity<InvestmentInquiry> updateInvestmentInquiry(@PathVariable long inquiryId,

            @RequestBody InvestmentInquiry updatedInquiry) {

        InvestmentInquiry newInvest = investmentInquiryService.updateInquiry(inquiryId, updatedInquiry);

        if (newInvest == null) {

            return ResponseEntity.status(403).build();

        }

        return ResponseEntity.status(201).body(newInvest);

    }

    @DeleteMapping("/{inquiryId}")

    public ResponseEntity<Boolean> deleteInvestmentInquiry(@PathVariable long inquiryId) {

        boolean newInvest = investmentInquiryService.deleteInquiry(inquiryId);

        if (newInvest) {

            return ResponseEntity.status(201).body(true);

        }

        return ResponseEntity.status(403).body(false);

    }

}
