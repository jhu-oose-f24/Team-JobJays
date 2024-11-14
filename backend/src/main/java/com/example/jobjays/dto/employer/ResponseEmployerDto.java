package com.example.jobjays.dto.employer;

import com.example.jobjays.dto.profile.ResponseProfileDto;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class ResponseEmployerDto {

    public Long employer_id;

    public String username;

    public ResponseProfileDto employerProfile;

    public String failReason;
}
