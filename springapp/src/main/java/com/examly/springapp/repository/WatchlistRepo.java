package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Investment;
import com.examly.springapp.model.Watchlist;

@Repository
public interface WatchlistRepo extends JpaRepository<Watchlist, Long> {

    List<Watchlist> findByUserId(@Param("userId") Long userId);
    boolean existsByUserIdAndInvestment(Long userId, Investment investment);
}
