package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.examly.springapp.model.Watchlist;
import com.examly.springapp.repository.InvestmentRepo;
import com.examly.springapp.repository.WatchlistRepo;

@Service
public class WatchlistServiceImpl implements WatchlistService {
    WatchlistRepo watchlistRepo;
    InvestmentRepo investmentRepo;

    @Autowired
    public WatchlistServiceImpl(WatchlistRepo watchlistRepo) {
        this.watchlistRepo = watchlistRepo;
    }

    @Override
    public Watchlist addToWatchlist(Watchlist watchlist) {
        if (watchlist.getUserId() == 0L || watchlist.getInvestment().getInvestmentId() == null) {
            return null;
        }
        if (watchlistRepo.existsByUserIdAndInvestment(watchlist.getUserId(), watchlist.getInvestment())) {
            return null;
        }
        return watchlistRepo.save(watchlist);
    }

    @Override
    public List<Watchlist> getUserWatchlist(Long userId) {
        return watchlistRepo.findByUserId(userId);
    }
    
    @Override
    public boolean deleteWatchlistById(Long watchlistId) {
        Optional<Watchlist> optWatchlist = watchlistRepo.findById(watchlistId);
        if (optWatchlist.isPresent()) {
            watchlistRepo.deleteById(watchlistId);
            return true;
        }
        return false;
    }

}
