package com.examly.springapp.controller;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
 
import com.examly.springapp.model.AdminConsoleDTO;
import com.examly.springapp.service.ChartService;
 
@RestController
@RequestMapping("/api/admin")
public class AdminChartController {
    private ChartService chartService;    
    @Autowired
    public AdminChartController(ChartService chartService) {
        this.chartService = chartService;
    }
 
    @GetMapping("/console")
    public ResponseEntity<AdminConsoleDTO> getConsoleData() {
        AdminConsoleDTO adminConsoleData=chartService.getAdminConsoleData();
        if (adminConsoleData==null) {
            return ResponseEntity.status(500).build();
        }
        return ResponseEntity.status(200).body(adminConsoleData);
    }
 
}