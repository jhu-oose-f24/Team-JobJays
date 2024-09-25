package com.example.jobjays.controller;

import com.example.jobjays.model.Book;
import com.example.jobjays.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    @GetMapping
    public String showBooks(Model model) {
        model.addAttribute("books", bookRepository.findAll());
        return "index";
    }

    @PostMapping("/add")
    public String addBook(Book book) {
        bookRepository.save(book);
        return "redirect:/";
    }
}
