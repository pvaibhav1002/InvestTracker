package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.UserInvestment;

@Repository
public interface UserInvestmentRepo extends JpaRepository<UserInvestment, Long> {
    @Query("SELECT SUM(ui.quantityBought * ui.purchasePrice) FROM UserInvestment ui")
    double getTotalMoneyInvestedByAllUsers();

    @Query("SELECT SUM(ui.quantityBought * ui.purchasePrice) FROM UserInvestment ui WHERE ui.user.userId = :userId")
    Double getTotalInvestedByUser(@Param("userId") Long userId);

    @Query("SELECT SUM(ui.quantityBought * i.price) FROM UserInvestment ui JOIN ui.investment i WHERE ui.user.userId = :userId")
    Double getCurrentInvestmentByUser(@Param("userId") Long userId);

    // Count investments by type for a specific user
    @Query("SELECT ui.investment.type, COUNT(ui) FROM UserInvestment ui WHERE ui.user.userId = :userId GROUP BY ui.investment.type")
    List<Object[]> countInvestmentsByTypeForUser(@Param("userId") Long userId);

    // Count investments by sector for a specific user
    @Query("SELECT ui.investment.sector, COUNT(ui) FROM UserInvestment ui WHERE ui.user.userId = :userId GROUP BY ui.investment.sector")
    List<Object[]> countInvestmentsBySectorForUser(@Param("userId") Long userId);

    // Count investments by cap size for a specific user
    @Query("SELECT ui.investment.capSize, COUNT(ui) FROM UserInvestment ui WHERE ui.user.userId = :userId GROUP BY ui.investment.capSize")
    List<Object[]> countInvestmentsByCapSizeForUser(@Param("userId") Long userId);

}