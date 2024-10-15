package com.example.jobjays.wrapper.beans;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.auth.BasicSessionCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class RpcBeansFactory {
    @Value("ASIA4HWJT7LXV7DTBGPB")
    private String accessKey;

    @Value("46cOj+4ltgfYMZhAufvHuXMJq2CCzwWeIfcj1ilH")
    private String secretKey;


    @Bean
    AmazonS3 amazonS3() {
        String sessionToken = "IQoJb3JpZ2luX2VjEHkaCXVzLWVhc3QtMSJGMEQCIGVbRbA1/ruWb/TK2hkURxkSWggJ5+eN2rj4jYh/w+unAiAa1D81spomCsXpRZf3je3YQoxDDA8qxxrUSHRchGCxjyrvAgjS//////////8BEAAaDDg0MTE2MjY4NTE2NyIMQgAQ9i4Tf7lijUAwKsMCQNgL2kFFGYlXVDp7n7xvCMMq68t0fISilERRcRHdX0vbCJhFVm+PfY383Y+VCmxKFWlfZG1cuDH7N1Pi+qyJ1evUQfrk4swBZx0kS4Z/f5DQMl3FB9jIYflZI/t+koXFZzruOJ1f6pY8UjToZhA+XiGePA6yvoh/+cs1C1ZUDf+zfncJjIW2PfPNiBvGNS8Gsp5vbfsnO0tp1UCUNtC6kTV4/jH5D3aKOvW/5BxsWAG00ajFwhGIGR7V9VGO1NSy33sIfAwQmECYR0xRzYPDmjUUiFhcSGTSdgyn6V0aM4bl4ng+8vquBfxWaJBnuB8OJNXLS+kEUt6uzwct5HClGS2/ObGrZboHBYRvsIzCy2PE69RswenfGde4WNXaSK0J1eLw8e6EnkWoRrSqhz66aP5Ci3VkKkSqrP0qEqmtpBMFZbMwkauzuAY6qAEJC4r2FHMof+2ymMelN0ly2bNY40N9tbIkMaPa6C7IsoNuBTJgJMMlth+79vZSfMpuJjRPQIJ45bQTYeLnuvBHy4ag+WW5U1I4tmVAh5jeU20pg6hHKzU4IuznntBrLuMRc09rxzbTN7lcFwFJgi2Onl0Ya4vBkjOPCDgVdmCcgEvCxRprWy4k6SvEaTTbq4/b2ReBOLR4Wsrl5bFpLG3i54SSSKlDrzI=";
        BasicSessionCredentials awsCreds = new BasicSessionCredentials(accessKey, secretKey, sessionToken);
        AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
                .build();
        return s3Client;
    }
}
