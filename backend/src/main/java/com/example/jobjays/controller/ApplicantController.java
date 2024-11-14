package com.example.jobjays.controller;

import com.example.jobjays.auth.AuthService;
import com.example.jobjays.auth.CustomAuthenticationDetails;
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
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.net.http.HttpClient;
import java.time.LocalDateTime;
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
  private final AuthService authService;

  // Define the email pattern
  private static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$";
  private static final Pattern EMAIL_PATTERN = Pattern.compile(EMAIL_REGEX);

  @Autowired
  private EmailSendWrapper emailSendWrapper;
  @Autowired
  private ResumeService resumeService;
  @Autowired
  private ApplicantRepository applicantRepository;

  public ApplicantController(ApplicantService applicantService, JobPostService jobPostService, ResponseMapperService responseMapperService, AuthService authService) {
    this.applicantService = applicantService;
    this.jobPostService = jobPostService;
    this.responseMapperService = responseMapperService;
    this.authService = authService;
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
    String username = authService.extractUsername(token);
    Applicant applicant = applicantService.findApplicantByUsername(username);
    UpdateApplicantDto user = new UpdateApplicantDto();

    if (applicant == null) {
      return new RedirectView("http://localhost:3000/invalid-token");
//      RedirectView redirectView = new RedirectView("http://localhost:3000/invalid-token");
//      redirectView.setExposeModelAttributes(false);
//      return redirectView;
    }

    user.setEnabled(true); // Enable the user
    user.setToken(null); // Clear the token
    applicantService.updateApplicant(user, applicant.getID());

    RedirectView redirectView = new RedirectView("http://localhost:3000/signin");
    redirectView.setExposeModelAttributes(false);
    return redirectView;
  }

  @PostMapping("/register")
  public ResponseEntity<ResponseApplicantDto> addApplicant(@RequestBody CreateApplicantDto createApplicantDto) {
//    // check the email formation
//    if (!isValidEmail(createApplicantDto.getEmail())) {
//      throw new ServiceException("Email format is wrong");
//    }
//
//    createApplicantDto.setEnabled(false);
//    String token = TokenGenerator.generateToken();
//    createApplicantDto.setVerificationToken(token);
//    createApplicantDto.setEnabled(false); // User is disabled until they v
//    // rify
//    // Before adding the applicant, check if the email is already in use
//    // Synchronize on the email or use a unique constraint to prevent race
//    // conditions
//    synchronized (this) {
//      // Before adding the applicant, check if the email is already in use
//      if (applicantService.isEmailInUse(createApplicantDto.getEmail())) {
//        Map<String, String> response = new HashMap<>();
//        response.put("message", "Email is already in use.");
//        response.put("status", "BAD_REQUEST");
//        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//      }
//    }
    createApplicantDto.setEnabled(false);
    String token = authService.getApplicantEnablementToken(createApplicantDto);
    createApplicantDto.setEnabled(false);
    Applicant applicant = applicantService.addApplicant(createApplicantDto);
    emailSendWrapper.sendVerificationEmail(applicant.getEmail(), token);
    ResponseApplicantDto responseApplicantDto = mapToResponseApplicantDto(applicant);
    return new ResponseEntity<>(responseApplicantDto, HttpStatus.CREATED);
  }

  @PutMapping("/profile")
  public ResponseEntity<ResponseApplicantDto> updateApplicant(@RequestBody UpdateApplicantDto updateApplicantDto) {
    // Retrieve authentication details
    System.out.println("In Update!!!");
    String currentUserId = getCurrentUserId();
    System.out.println("Current User Id" + currentUserId);
//    System.out.println("Applicant Id" + id);


    System.out.println("going to update applicat service");
    // Proceed with the update if authorized
    Applicant updatedApplicant = applicantService.updateApplicant(updateApplicantDto, Long.valueOf(currentUserId));
    if (updatedApplicant == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(mapToResponseApplicantDto(updatedApplicant));
  }

  private String getCurrentUserId() {
    CustomAuthenticationDetails details = (CustomAuthenticationDetails)
            SecurityContextHolder.getContext().getAuthentication().getDetails();
    return details != null ? details.getUserId() : null;
  }

  @DeleteMapping("/profile")
  public ResponseEntity<Void> deleteApplicant() {
    String currentUserId = getCurrentUserId();
    applicantService.deleteApplicant(Long.valueOf(currentUserId));
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

  @GetMapping("/profile")
  public ResponseEntity<ResponseProfileDto> getApplicantProfileById() {
    String currentUserId = getCurrentUserId();
    System.out.println("in applicant controller get by id" + currentUserId);
    ApplicantProfile applicantProfile = applicantService.findApplicantProfileById(Long.valueOf(currentUserId));
    if (applicantProfile == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(mapToResponseProfileDto(applicantProfile));
  }

  @GetMapping("/photos/{applicantId}")
  public ResponseEntity<byte[]> fetchPhotoByApplicantId(@PathVariable Long applicantId) {
    Applicant applicant = applicantService.findApplicantById(applicantId);

    if (applicant == null || applicant.getPhoto() == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    byte[] photo = applicant.getPhoto();
    return ResponseEntity.ok()
            .contentType(MediaType.IMAGE_JPEG) // Or MediaType.IMAGE_PNG based on the type
            .body(photo);
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


  @PostMapping("/photo")
  public ResponseEntity<ResponseApplicantDto> uploadPhoto(@RequestParam("applicantId") Long applicantId,
                                                           @RequestParam("photo") MultipartFile photo) {
    ResponseApplicantDto responseApplicantDto = ResponseApplicantDto.builder().build();
    responseApplicantDto.setApplicantId(applicantId);
    if (photo.isEmpty() || !photo.getContentType().equals("image/jpeg") && !photo.getContentType().equals("image/png") ) {
      responseApplicantDto.setFailReason("the file is not the jpg/png format");
      return ResponseEntity.badRequest().body(responseApplicantDto);
    }

    if (photo.getSize() > 5 * 1024 * 1024) {
      responseApplicantDto.setFailReason("Photo size exceeds the limit");
      return ResponseEntity.badRequest().body(responseApplicantDto);
    }

    Applicant applicant = applicantService.findApplicantById(applicantId);
    if (applicant == null) {
      responseApplicantDto.setFailReason("cannot find applicant");
      return ResponseEntity.badRequest().body(responseApplicantDto);
    }


    try {
      String fileName = photo.getOriginalFilename();
      byte[] photoBytes = photo.getBytes();
      UpdateApplicantDto applicantDto = new UpdateApplicantDto();
      applicantDto.setPhoto(photoBytes);
      Applicant applicantRes = applicantService.updateApplicant(applicantDto,applicantId);
    } catch (IOException e) {
      return ResponseEntity.badRequest().body(
              ResponseApplicantDto.builder().username(applicant.getUsername()).failReason("IO Exception" + e).build());
    }

    return ResponseEntity.ok().body(ResponseApplicantDto.builder().username(applicant.getUsername())
            .applicantId(applicant.getID()).build());
  }

  @DeleteMapping("/photo")
  public ResponseEntity<ResponseApplicantDto> deletePhoto(@RequestParam("applicantId") Long applicantId) {
    ResponseApplicantDto responseApplicantDto = ResponseApplicantDto.builder().build();
    responseApplicantDto.setApplicantId(applicantId);

    Applicant applicant = applicantService.findApplicantById(applicantId);
    if (applicant == null || applicant.getPhoto() == null) {
      responseApplicantDto.setFailReason("No photo to delete or applicant not found");
      return ResponseEntity.badRequest().body(responseApplicantDto);
    }

    try {
      applicant.setPhoto(null); // Remove photo from the database
      UpdateApplicantDto newApplicant = new UpdateApplicantDto();
      newApplicant.setPhoto(null);
      applicantService.deleteFromApplicant(newApplicant, applicantId); // Save the change
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
              ResponseApplicantDto.builder().username(applicant.getUsername())
                      .failReason("Error deleting photo: " + e.getMessage()).build());
    }

    return ResponseEntity.ok().body(ResponseApplicantDto.builder().username(applicant.getUsername())
            .applicantId(applicant.getID()).build());
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

  @GetMapping("/profile/saved-jobs")
  public ResponseEntity<Set<ResponseJobPostDto>> getSavedJobsByApplicantId() {
    String currentUserId = getCurrentUserId();
    Set<JobPost> savedJobs = applicantService.findSavedJobsByApplicantId(Long.valueOf(currentUserId));
    Set<ResponseJobPostDto> responseList = savedJobs.stream()
        .map(this::mapToResponseJobPostDto)
        .collect(Collectors.toSet());
    return ResponseEntity.ok(responseList);
  }

  @PutMapping("/profile/saved-jobs/{jobId}")
  public ResponseEntity<ResponseApplicantProfileDto> saveJob(@PathVariable Long jobId) {
    String currentUserId = getCurrentUserId();
    Applicant applicant = applicantService.findApplicantById(Long.valueOf(currentUserId));
    JobPost jobPost = jobPostService.getJobPostById(jobId);
    if (applicant == null || jobPost == null) {
      return ResponseEntity.badRequest().build();
    }
    ApplicantProfile applicantProfile = applicant.getProfile();
    applicantService.addSavedJob(applicant, jobPost);
    applicantRepository.save(applicant);
    //return ResponseEntity.ok(mapToResponseProfileDto(applicantProfile));
    return ResponseEntity.ok().build();
  }

  @PutMapping("/apply/{jobID}")
  public ResponseEntity<ResponseJobPostDto> applyForJob(@PathVariable Long jobID) {
    String currentUserId = getCurrentUserId();
    JobPost jobPost = jobPostService.getJobPostById(jobID);
    Applicant applicant = applicantService.findApplicantById(Long.valueOf(currentUserId));
    if (jobPost == null || applicant == null) {
      return ResponseEntity.badRequest().build();
    }
    JobPost updatedJobPost = jobPostService.addApplicantToJobPost(jobPost, applicant);
    //return ResponseEntity.ok(responseMapperService.mapToResponseJobPostDto(updatedJobPost));
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
    responseProfileDto.dateOfBirth = profile.getDateOfBirth();
    responseProfileDto.education  = profile.getEducation();
    responseProfileDto.experience = profile.getExperience();
    responseProfileDto.gender = profile.getGender();
    responseProfileDto.maritalStatus = profile.getMaritalStatus();
    responseProfileDto.nationality = profile.getNationality();
    responseProfileDto.website = profile.getWebsite();
    responseProfileDto.title = profile.getTitle();
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
