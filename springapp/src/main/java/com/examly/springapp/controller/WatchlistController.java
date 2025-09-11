package com.examly.springapp.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.examly.springapp.model.Watchlist;
import com.examly.springapp.service.WatchlistService;

@RestController
@RequestMapping("api/watchlist")
public class WatchlistController {
    WatchlistService watchlistService;

    @Autowired
    public WatchlistController(WatchlistService watchlistService) {
        this.watchlistService = watchlistService;
    }

    @PostMapping()
    public ResponseEntity<Watchlist> addToWatchlist(@RequestBody Watchlist watchlist) {
        Watchlist newWatchlist = watchlistService.addToWatchlist(watchlist);
        if (newWatchlist == null) {
            return ResponseEntity.status(400).build();
        }
        return ResponseEntity.status(201).body(newWatchlist);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Watchlist>> getWatchlist(@PathVariable Long userId) {
        List<Watchlist> watchlist = watchlistService.getUserWatchlist(userId);
        if (watchlist == null) {
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.status(200).body(watchlist);
    }

    @DeleteMapping("/{watchlistId}")
    public ResponseEntity<Boolean> deleteWatchlistById(@PathVariable Long watchlistId) {
        if (!watchlistService.deleteWatchlistById(watchlistId)) {
            return ResponseEntity.status(204).body(false);
        }
        return ResponseEntity.status(200).body(true);
    }
}