package com.askrida.web.service.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PengontrolHalaman {

    @GetMapping("/")
    public String halamanUtama() {
        return "forward:/index.html";
    }
    
    @GetMapping("/beranda")
    public String beranda() {
        return "forward:/index.html";
    }
}
