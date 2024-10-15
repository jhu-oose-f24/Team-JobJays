package com.example.jobjays.wrapper;

import com.alibaba.fastjson.JSON;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.auth.BasicSessionCredentials;
import com.amazonaws.auth.policy.Policy;
import com.amazonaws.auth.policy.Principal;
import com.amazonaws.auth.policy.Statement;
import com.amazonaws.auth.policy.actions.S3Actions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.S3ObjectResource;
import com.amazonaws.services.s3.model.Bucket;
import com.amazonaws.services.s3.model.S3Object;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AmazonS3Wrapper {

    @Value("jobjays.test")
    private String bucketName;

    @Autowired
    private AmazonS3 s3Client;

    public static void main(String[] args) {

//        Statement allowPublicReadStatement = new Statement(Statement.Effect.Allow)
//                .withPrincipals(Principal.AllUsers)
//                .withActions(S3Actions.GetObject)
//                .withResources(new S3ObjectResource(myBucketName, "*"));
//        Statement allowRestrictedWriteStatement = new Statement(Statement.Effect.Allow)
//                .withPrincipals(new Principal("123456789"), new Principal("876543210"))
//                .withActions(S3Actions.PutObject)
//                .withResources(new S3ObjectResource(myBucketName, "*"));

//        Policy policy = new Policy()
//                .withStatements(allowPublicReadStatement, allowRestrictedWriteStatement);


        //listBuckets(s3Client);
        //System.out.println(new AmazonS3Wrapper().s3Client.getObject(new AmazonS3Wrapper().bucketName,));

    }
    public String getObject(String bucketName,String key){
        S3Object s3Object = s3Client.getObject(bucketName,key);
        return JSON.toJSONString(s3Object);
    }

    /**
     * Lists all the S3 buckets associated with the provided AWS S3 client.
     *
     */
    public static void listBuckets(AmazonS3 s3client) {
        List<Bucket> buckets = s3client.listBuckets();

// Display the bucket names
        System.out.println("Buckets:");
        for (Bucket bucket : buckets) {
            System.out.println(bucket.getName());
        }
    }
}
