package com.examly.springapp.model;

public class LoginDTO {
    private String token;

    public LoginDTO() {
        this.token = "";
    }

    public LoginDTO(String token) {
        this.token = token;

    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

}
