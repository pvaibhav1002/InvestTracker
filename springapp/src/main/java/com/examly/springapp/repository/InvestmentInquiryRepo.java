package com.examly.springapp.repository;
 
import java.util.List;
import java.util.Optional;
 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
 
import com.examly.springapp.model.InvestmentInquiry;
 
@Repository
public interface InvestmentInquiryRepo extends JpaRepository<InvestmentInquiry, Long> {
    List<InvestmentInquiry> findByUser_UserId(Long userId);
    List<InvestmentInquiry> findByPriority(String priority);
    List<InvestmentInquiry> findByStatus(String status);
 
    Optional<List<InvestmentInquiry>> findByInvestment_InvestmentId(Long investmentId);
 
}

