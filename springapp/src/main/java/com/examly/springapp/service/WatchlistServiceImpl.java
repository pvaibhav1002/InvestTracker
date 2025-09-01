package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.examly.springapp.model.Investment;
import com.examly.springapp.model.User;
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
        if (watchlist.getUser_id() == 0L || watchlist.getInvestment().getInvestmentId() == null) {
            return null;
        }
        return watchlistRepo.save(watchlist);
    }

    @Override
    public List<Investment> getUserWatchlist(Long userId) {
        return watchlistRepo.findInvestmentsByUserId(userId);
    }

}
