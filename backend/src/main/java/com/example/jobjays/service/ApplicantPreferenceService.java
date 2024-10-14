package com.example.jobjays.service;

import com.example.jobjays.dto.prefence.ApplicantPreferenceDto;
import com.example.jobjays.dto.prefence.LocationDto;
import com.example.jobjays.dto.prefence.NotificationPreferenceDto;
import com.example.jobjays.kafka.PreferencePublisherService;
import com.example.jobjays.model.ApplicantPreference;
import com.example.jobjays.model.Location;
import com.example.jobjays.model.NotificationPreference;
import com.example.jobjays.model.NotificationFrequency;
import com.example.jobjays.repository.ApplicantPreferenceRepository;
import com.example.jobjays.repository.ApplicantRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicantPreferenceService {

    private final ApplicantPreferenceRepository preferenceRepository;

    private final ApplicantRepository applicantRepository;

    private final PreferencePublisherService preferencePublisherService;

    private ApplicantPreferenceService(ApplicantPreferenceRepository preferenceRepository, ApplicantRepository applicantRepository, PreferencePublisherService preferencePublisherService) {
        this.preferenceRepository = preferenceRepository;
        this.applicantRepository = applicantRepository;
        this.preferencePublisherService = preferencePublisherService;
    }

    public ApplicantPreferenceDto getPreferenceByUserId(Long applicantId) {
        ApplicantPreference preference = preferenceRepository.findByApplicantId(applicantId);
        return convertToDto(preference);
    }

    public ApplicantPreferenceDto createOrUpdatePreference(ApplicantPreferenceDto preferenceDto) {
        ApplicantPreference preference = preferenceRepository.findByApplicantId(preferenceDto.getApplicantId());

        // If the preference exists, update it. Otherwise, create a new one.
        if (preference != null) {
            updateExistingPreference(preference, preferenceDto);
        } else {
            preference = convertToEntity(preferenceDto);
        }
        // call the preference kafka service
        preference = preferenceRepository.save(preference);

        preferencePublisherService.publishApplicantPreference(preference);
        return convertToDto(preference);
    }

    private void updateExistingPreference(ApplicantPreference preference, ApplicantPreferenceDto dto) {
        preference.setIndustries(dto.getIndustries());
        preference.setJobTitles(dto.getJobTitles());
        preference.setMinMonthlySalary(dto.getMinMonthlySalary());
        preference.setJobTypes(dto.getJobTypes());
        preference.setWorkTimings(dto.getWorkTimings());

        List<Location> locations = dto.getLocations().stream()
                .map(locDto -> new Location(locDto.getCountry(), locDto.getState(), locDto.getCity()))
                .collect(Collectors.toList());
        preference.setLocations(locations);

        if (dto.getNotificationPreference() != null) {
            NotificationPreference notificationPreference = new NotificationPreference();
            notificationPreference.setNotificationFrequency(
                    (dto.getNotificationPreference().getNotificationFrequency()));
            preference.setNotificationPreference(notificationPreference);
        }
    }

    private ApplicantPreferenceDto convertToDto(ApplicantPreference preference) {
        ApplicantPreferenceDto dto = new ApplicantPreferenceDto(
                preference.getApplicant().getID(),
                preference.getIndustries(),
                preference.getJobTitles(),
                preference.getMinMonthlySalary(),
                preference.getLocations().stream()
                        .map(loc -> new LocationDto(loc.getCountry(), loc.getState(), loc.getCity()))
                        .collect(Collectors.toList()),
                preference.getJobTypes(),
                preference.getWorkTimings(),
                preference.getNotificationPreference().toDto()

        );

        if (preference.getNotificationPreference() != null) {
            NotificationPreferenceDto notificationDto = new NotificationPreferenceDto(preference.getNotificationPreference().getNotificationFrequency());
            dto.setNotificationPreference(notificationDto);
        }

        return dto;
    }

    private ApplicantPreference convertToEntity(ApplicantPreferenceDto dto) {
        ApplicantPreference preference = new ApplicantPreference();
        preference.setApplicant(applicantRepository.findById(dto.getApplicantId()).orElseThrow());
        preference.setIndustries(dto.getIndustries());
        preference.setJobTitles(dto.getJobTitles());
        preference.setMinMonthlySalary(dto.getMinMonthlySalary());
        preference.setJobTypes(dto.getJobTypes());
        preference.setWorkTimings(dto.getWorkTimings());

        List<Location> locations = dto.getLocations().stream()
                .map(locDto -> new Location(locDto.getCountry(), locDto.getState(), locDto.getCity()))
                .collect(Collectors.toList());
        preference.setLocations(locations);

        if (dto.getNotificationPreference() != null) {
            NotificationPreference notificationPreference = new NotificationPreference();
            notificationPreference.setNotificationFrequency(
                    (dto.getNotificationPreference().getNotificationFrequency()));
            preference.setNotificationPreference(notificationPreference);
        }

        return preference;
    }
}
