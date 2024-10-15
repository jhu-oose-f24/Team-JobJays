package com.example.jobjays.controller;

import com.example.jobjays.dto.prefence.ApplicantPreferenceDto;
import com.example.jobjays.service.ApplicantPreferenceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/applicant-preferences")
public class ApplicantPreferenceController {

    private  final ApplicantPreferenceService preferenceService;

    public ApplicantPreferenceController(ApplicantPreferenceService preferenceService) {
        this.preferenceService = preferenceService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApplicantPreferenceDto> getPreferenceByUserId(@PathVariable Long userId) {
        ApplicantPreferenceDto preference = preferenceService.getPreferenceByUserId(userId);
        return preference != null ? ResponseEntity.ok(preference) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<ApplicantPreferenceDto> createOrUpdatePreference(
            @RequestBody ApplicantPreferenceDto preferenceDto) {
        ApplicantPreferenceDto updatedPreference = preferenceService.createOrUpdatePreference(preferenceDto);
        return ResponseEntity.ok(updatedPreference);
    }
}
