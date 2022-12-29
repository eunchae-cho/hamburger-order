package com.ec.hbg.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
@RestController
@RequestMapping("/home")
class HomeController {

    @GetMapping()
    fun home(): String {
        return "TEST!"
    }
}