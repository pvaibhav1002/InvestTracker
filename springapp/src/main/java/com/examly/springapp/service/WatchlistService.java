package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.model.Investment;
import com.examly.springapp.model.Watchlist;

public interface WatchlistService {
    Watchlist addToWatchlist(Watchlist watchlist);
    List<Investment> getUserWatchlist(Long userId);
}
