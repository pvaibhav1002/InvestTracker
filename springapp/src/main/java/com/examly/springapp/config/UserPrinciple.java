package com.examly.springapp.config;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.examly.springapp.model.User;

public class UserPrinciple implements UserDetails {

    private final String username;
    private final String password;
    private final boolean accountStatus;
    private final Collection<? extends GrantedAuthority> authorities;

    public UserPrinciple(User user) {
        this.username = user.getEmail();
        this.password = user.getPassword();
        this.accountStatus = user.isAccountStatus();
        this.authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getUserRole()));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        if (!accountStatus) {
            throw new LockedException("Account is locked. Please contact support.");
        }
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}