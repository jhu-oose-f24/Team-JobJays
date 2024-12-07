package com.example.jobjays.controller;

import com.example.jobjays.dto.prefence.ApplicantPreferenceDto;
import com.example.jobjays.service.ApplicantPreferenceService;
import com.example.jobjays.service.TokenParserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/applicant-preferences")
public class ApplicantPreferenceController {

    private  final ApplicantPreferenceService preferenceService;

    private final TokenParserService tokenParserService;

    public ApplicantPreferenceController(ApplicantPreferenceService preferenceService, TokenParserService tokenParserService) {
        this.preferenceService = preferenceService;
        this.tokenParserService = tokenParserService;
    }
    @PreAuthorize("hasAuthority('APPLICANT')")
    @GetMapping("/me")
    public ResponseEntity<ApplicantPreferenceDto> getPreferenceByUserId() {
        Long userId = tokenParserService.getCurrentUserId();
        if(userId == null) {
            return ResponseEntity.status(401).build();
        }
        // get user id from token

        ApplicantPreferenceDto preference = preferenceService.getPreferenceByUserId(userId);
        return preference != null ? ResponseEntity.ok(preference) : ResponseEntity.notFound().build();
    }

    @PreAuthorize("hasAuthority('APPLICANT')")
    @PostMapping
    public ResponseEntity<ApplicantPreferenceDto> createOrUpdatePreference(
            @RequestBody ApplicantPreferenceDto preferenceDto) {
        // get user id from token
        Long userId = tokenParserService.getCurrentUserId();
        if(userId == null) {
            return ResponseEntity.status(401).build();
        }
        preferenceDto.setApplicantId(userId);
        ApplicantPreferenceDto updatedPreference = preferenceService.createOrUpdatePreference(preferenceDto);
        return ResponseEntity.ok(updatedPreference);
    }
}
