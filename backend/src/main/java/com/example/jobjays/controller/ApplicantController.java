package com.example.jobjays.controller;

import com.example.jobjays.authentication.TokenGenerator;
import com.example.jobjays.dto.applicant.*;
import com.example.jobjays.dto.jobPost.ResponseJobPostDto;
import com.example.jobjays.dto.profile.ResponseApplicantProfileDto;
import com.example.jobjays.dto.profile.ResponseProfileDto;
import com.example.jobjays.model.Applicant;
import com.example.jobjays.model.ApplicantProfile;
import com.example.jobjays.model.ApplicantResume;
import com.example.jobjays.model.JobPost;
import com.example.jobjays.repository.ApplicantRepository;
import com.example.jobjays.service.ApplicantService;
import com.example.jobjays.service.JobPostService;
import com.example.jobjays.service.ResponseMapperService;
import com.example.jobjays.service.ResumeService;
import com.example.jobjays.wrapper.EmailSendWrapper;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.net.http.HttpClient;
import java.util.HashMap;
import java.util.List;
import java.util.Set;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/applicants")
public class ApplicantController {

  private final ApplicantService applicantService;
  private final JobPostService jobPostService;
  private final ResponseMapperService responseMapperService;

  // Define the email pattern
  private static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$";
  private static final Pattern EMAIL_PATTERN = Pattern.compile(EMAIL_REGEX);

  @Autowired
  private EmailSendWrapper emailSendWrapper;
  @Autowired
  private ResumeService resumeService;
  @Autowired
  private ApplicantRepository applicantRepository;

  public ApplicantController(ApplicantService applicantService, JobPostService jobPostService, ResponseMapperService responseMapperService) {
    this.applicantService = applicantService;
    this.jobPostService = jobPostService;
    this.responseMapperService = responseMapperService;
  }

  // Method to validate email
  public boolean isValidEmail(String email) {
    if (email == null) {
      return false;
    }
    Matcher matcher = EMAIL_PATTERN.matcher(email);
    return matcher.matches();
  }

  @GetMapping("/verify")
  public RedirectView verifyUser(@RequestParam("token") String token) {
    Applicant applicant = applicantService.findByVerificationToken(token);
    UpdateApplicantDto user = new UpdateApplicantDto();

    if (applicant == null) {
      RedirectView redirectView = new RedirectView("http://localhost:3000/invalid-token");
      redirectView.setExposeModelAttributes(false);
      return redirectView;
    }

    user.setEnabled(true); // Enable the user
    user.setToken(null); // Clear the token
    applicantService.updateApplicant(user, applicant.getID());

    RedirectView redirectView = new RedirectView("http://localhost:3000/signin");
    redirectView.setExposeModelAttributes(false);
    return redirectView;
  }

  @PostMapping
  public ResponseEntity<?> addApplicant(@RequestBody CreateApplicantDto createApplicantDto) {
    // check the email formation
    if (!isValidEmail(createApplicantDto.getEmail())) {
      throw new ServiceException("Email format is wrong");
    }

    createApplicantDto.setEnabled(false);
    String token = TokenGenerator.generateToken();
    createApplicantDto.setVerificationToken(token);
    createApplicantDto.setEnabled(false); // User is disabled until they v
    // rify
    // Before adding the applicant, check if the email is already in use
    // Synchronize on the email or use a unique constraint to prevent race
    // conditions
    synchronized (this) {
      // Before adding the applicant, check if the email is already in use
      if (applicantService.isEmailInUse(createApplicantDto.getEmail())) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Email is already in use.");
        response.put("status", "BAD_REQUEST");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
      }
    }
    Applicant applicant = applicantService.addApplicant(createApplicantDto);
    emailSendWrapper.sendVerificationEmail(applicant.getEmail(), token);
    ResponseApplicantDto responseApplicantDto = mapToResponseApplicantDto(applicant);
    return new ResponseEntity<>(responseApplicantDto, HttpStatus.CREATED);
  }

  @PutMapping("/profile/{id}")
  public ResponseEntity<ResponseApplicantDto> updateApplicant(@RequestBody UpdateApplicantDto updateApplicantDto,
      @PathVariable Long id) {
    Applicant updatedApplicant = applicantService.updateApplicant(updateApplicantDto, id);
    if (updatedApplicant == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(mapToResponseApplicantDto(updatedApplicant));
  }

  @DeleteMapping("/profile/{id}")
  public ResponseEntity<Void> deleteApplicant(@PathVariable Long id) {
    applicantService.deleteApplicant(id);
    return ResponseEntity.noContent().build();
  }

  //
  // etMapping("/profile/{id}")
  // blic ResponseEntity<Resp
  // plicant applicant = applicantService.find
  // i
  // return ResponseEntity.notFound().build();
  // }
  // return ResponseEntity.ok(mapToResponseApplicantDto(applicant));
  // }

  @GetMapping
  public ResponseEntity<List<ResponseApplicantDto>> getAllApplicants() {
    List<Applicant> applicants = applicantService.findAllApplicants();
    List<ResponseApplicantDto> responseList = applicants.stream()
        .map(this::mapToResponseApplicantDto)
        .collect(Collectors.toList());
    return ResponseEntity.ok(responseList);
  }

  @GetMapping("/profile/{id}")
  public ResponseEntity<ResponseProfileDto> getApplicantProfileById(@PathVariable Long id) {
    ApplicantProfile applicantProfile = applicantService.findApplicantProfileById(id);
    if (applicantProfile == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(mapToResponseProfileDto(applicantProfile));
  }

  @GetMapping("/resume/fetch")
  public ResponseEntity<ResponseApplicantDto> fetchResumesByApplicantId(@RequestParam("applicantId") Long applicantId) {
    ResponseApplicantDto responseApplicantDto = ResponseApplicantDto.builder().build();
    responseApplicantDto.setApplicantId(applicantId);

    Applicant applicant = applicantService.findApplicantById(applicantId);
    if (applicant == null) {
      responseApplicantDto.setFailReason("cannot find applicant");
      return ResponseEntity.badRequest().body(responseApplicantDto);
    }

    List<ApplicantResume> applicantResume = null;

    try {
      applicantResume = resumeService.getAllResumesByUserId(applicant.getID());

    } catch (Exception e) {
      return ResponseEntity.badRequest().body(
          ResponseApplicantDto.builder().username(applicant.getUsername()).failReason("IO Exception" + e).build());
    }

    return ResponseEntity.ok().body(ResponseApplicantDto.builder().username(applicant.getUsername())
        .applicantId(applicant.getID()).resumes(applicantResume).build());
  }

  @PostMapping("/resume/delete")
  public ResponseEntity<ResponseApplicantDto> deleteResumesByResumeId(@RequestParam("resumeId") Long resumeId) {
    ResponseApplicantDto responseApplicantDto = ResponseApplicantDto.builder().build();
    responseApplicantDto.setApplicantResume(null);
    ApplicantResume applicantResume = null;
    try {
      applicantResume = resumeService.getResumeById(resumeId);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(ResponseApplicantDto.builder().failReason("IO Exception" + e).build());
    }

    if (applicantResume == null) {
      return ResponseEntity.badRequest()
          .body(ResponseApplicantDto.builder().failReason("this resume doesn't exist").build());
    }

    resumeService.deleteById(resumeId);
    return ResponseEntity.ok().body(ResponseApplicantDto.builder().applicantResume(applicantResume).build());
  }

  @PostMapping("/resume")
  public ResponseEntity<ResponseApplicantDto> uploadResume(@RequestParam("applicantId") Long applicantId,
      @RequestParam("resume") MultipartFile resume) {
    ResponseApplicantDto responseApplicantDto = ResponseApplicantDto.builder().build();
    responseApplicantDto.setApplicantId(applicantId);
    if (resume.isEmpty() || !resume.getContentType().equals("application/pdf")) {
      responseApplicantDto.setFailReason("the file is not the pdf format");
      return ResponseEntity.badRequest().body(responseApplicantDto);
    }

    Applicant applicant = applicantService.findApplicantById(applicantId);
    if (applicant == null) {
      responseApplicantDto.setFailReason("cannot find applicant");
      return ResponseEntity.badRequest().body(responseApplicantDto);
    }

    ApplicantResume applicantResume = null;

    try {
      applicantResume = resumeService.saveResume(resume, applicant.getUsername(), applicant.getID());
    } catch (IOException e) {
      return ResponseEntity.badRequest().body(
          ResponseApplicantDto.builder().username(applicant.getUsername()).failReason("IO Exception" + e).build());
    }

    return ResponseEntity.ok().body(ResponseApplicantDto.builder().username(applicant.getUsername())
        .applicantId(applicant.getID()).applicantResume(applicantResume).build());
  }

  @GetMapping("/profile/search/username")
  public ResponseEntity<ResponseApplicantProfileDto> getApplicantProfileByUsername(
      @RequestParam("username") String username) {
    ApplicantProfile applicantProfile = applicantService.findApplicantProfileByUsername(username);
    if (applicantProfile == null) {
      return ResponseEntity.notFound().build();
    }

    ResponseApplicantProfileDto responseApplicantProfileDto = mapToResponseProfileDto(applicantProfile);
    return new ResponseEntity<>(responseApplicantProfileDto, HttpStatus.OK);
  }


  @GetMapping("/profile/search/name")
  public ResponseEntity<List<ResponseProfileDto>> getApplicantsByName(@RequestParam("name") String name) {
    List<ApplicantProfile> profiles = applicantService.findApplicantProfilesByUsername(name);
    List<ResponseProfileDto> responseList = profiles.stream()
        .map(this::mapToResponseProfileDto)

        .collect(Collectors.toList());
    return ResponseEntity.ok(responseList);
  }

  @GetMapping("/profile/{applicantId}/saved-jobs")
  public ResponseEntity<Set<ResponseJobPostDto>> getSavedJobsByApplicantId(@PathVariable Long applicantId) {
    Set<JobPost> savedJobs = applicantService.findSavedJobsByApplicantId(applicantId);
    Set<ResponseJobPostDto> responseList = savedJobs.stream()
        .map(this::mapToResponseJobPostDto)
        .collect(Collectors.toSet());
    return ResponseEntity.ok(responseList);
  }

  @PutMapping("/profile/{applicantId}/saved-jobs/{jobId}")
  public ResponseEntity<ResponseApplicantProfileDto> saveJob(@PathVariable Long applicantId, @PathVariable Long jobId) {
    Applicant applicant = applicantService.findApplicantById(applicantId);
    JobPost jobPost = jobPostService.getJobPostById(jobId);
    if (applicant == null || jobPost == null) {
      return ResponseEntity.badRequest().build();
    }
    ApplicantProfile applicantProfile = applicant.getProfile();
    applicantService.addSavedJob(applicant, jobPost);
    System.out.println(jobPost.getTitle());

    applicantRepository.save(applicant);
    //return ResponseEntity.ok(mapToResponseProfileDto(applicantProfile));
    return ResponseEntity.ok().build();
  }



  // TODO: refactor into class
  public ResponseJobPostDto mapToResponseJobPostDto(JobPost jobPost) {

    ResponseJobPostDto responseJobPostDto = new ResponseJobPostDto();
    responseJobPostDto.id = jobPost.getID();
    responseJobPostDto.setCompanyName(jobPost.getEmployer().getProfile().getName());
    responseJobPostDto.title = jobPost.getTitle();
    responseJobPostDto.description = jobPost.getDescription();
    responseJobPostDto.location = jobPost.getLocation();
    responseJobPostDto.minSalary = jobPost.getMinSalary();
    responseJobPostDto.maxSalary = jobPost.getMaxSalary();
    responseJobPostDto.postedDate = jobPost.getPostedDate();
    responseJobPostDto.closedDate = jobPost.getClosedDate();
    responseJobPostDto.numApplicants = jobPost.getApplicants().size();
    return responseJobPostDto;

  }

  ResponseApplicantProfileDto mapToResponseProfileDto(ApplicantProfile profile) {
    ResponseApplicantProfileDto responseProfileDto = new ResponseApplicantProfileDto();
    responseProfileDto.name = profile.getName();

    responseProfileDto.bio = profile.getBio();
    responseProfileDto.appliedJobs = profile.getAppliedJobs().stream().map(this::mapToResponseJobPostDto)
        .collect(Collectors.toList());
    responseProfileDto.savedJobs = profile.getSavedJobs().stream().map(this::mapToResponseJobPostDto).collect(Collectors.toSet());
    return responseProfileDto;
  }

  // Utility method to map Applicant entity to ResponseApplicantDto
  private ResponseApplicantDto mapToResponseApplicantDto(Applicant applicant) {
    ResponseApplicantDto responseApplicantDto = ResponseApplicantDto.builder().build();
    responseApplicantDto.applicantId = applicant.getID();
    responseApplicantDto.username = applicant.getUsername();
    responseApplicantDto.applicantProfile = mapToResponseProfileDto(applicant.getProfile());
    return responseApplicantDto;
  }





}
