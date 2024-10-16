package com.example.jobjays.dto.employer;

import com.example.jobjays.dto.profile.ResponseProfileDto;
import lombok.Data;

@Data
public class ResponseEmployerDto {

    public Long employer_id;

    public String username;

    public ResponseProfileDto employerProfile;

    public String failReason;
}
