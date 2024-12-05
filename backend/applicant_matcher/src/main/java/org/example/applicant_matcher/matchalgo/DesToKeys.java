package org.example.applicant_matcher.matchalgo;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class DesToKeys {

    private static final Logger logger = LoggerFactory.getLogger(DesToKeys.class);

    private static final Set<String> JOB_RELATED_KEYWORDS = new HashSet<>() {{
        add("java"); add("python"); add("c++"); add("javascript"); add("html"); add("css"); add("sql");
        add("nosql"); add("database"); add("mysql"); add("mongodb"); add("oracle"); add("postgresql");
        add("git"); add("docker"); add("kubernetes"); add("aws"); add("azure"); add("gcp"); add("cloud");
        add("devops"); add("linux"); add("windows"); add("macos"); add("bash"); add("shell");
        add("networking"); add("tcp/ip"); add("http"); add("https"); add("firewall"); add("vpn");
        add("security"); add("encryption"); add("ssl"); add("tls"); add("ci/cd"); add("jenkins");
        add("agile"); add("scrum"); add("kanban"); add("project management"); add("leadership");
        add("communication"); add("problem solving"); add("critical thinking"); add("data analysis");
        add("data visualization"); add("excel"); add("powerpoint"); add("word"); add("tableau");
        add("power bi"); add("statistics"); add("r"); add("sas"); add("machine learning");
        add("deep learning"); add("neural networks"); add("nlp"); add("natural language processing");
        add("computer vision"); add("opencv"); add("tensorflow"); add("pytorch"); add("keras");
        add("data science"); add("big data"); add("hadoop"); add("spark"); add("etl"); add("data mining");
        add("data warehousing"); add("sql server"); add("oracle database"); add("salesforce");
        add("crm"); add("customer service"); add("marketing"); add("seo"); add("content marketing");
        add("digital marketing"); add("social media"); add("advertising"); add("branding");
        add("market research"); add("business analysis"); add("business intelligence"); add("bi");
        add("ux"); add("ui"); add("user experience"); add("user interface"); add("wireframing");
        add("prototyping"); add("figma"); add("adobe xd"); add("sketch"); add("illustrator");
        add("photoshop"); add("graphic design"); add("design thinking"); add("usability testing");
        add("quality assurance"); add("testing"); add("manual testing"); add("automation testing");
        add("selenium"); add("cypress"); add("java testing"); add("unit testing"); add("integration testing");
        add("regression testing"); add("load testing"); add("performance testing"); add("api testing");
        add("rest"); add("graphql"); add("json"); add("xml"); add("swagger"); add("software development");
        add("web development"); add("backend"); add("frontend"); add("fullstack"); add("mobile development");
        add("android"); add("ios"); add("swift"); add("kotlin"); add("react native"); add("flutter");
        add("react"); add("angular"); add("vue"); add("node.js"); add("express"); add("django");
        add("flask"); add("spring"); add("spring boot"); add("hibernate"); add("mvc"); add("microservices");
        add("architecture"); add("design patterns"); add("oop"); add("functional programming");
        add("data structures"); add("algorithms"); add("blockchain"); add("cryptocurrency");
        add("smart contracts"); add("solidity"); add("financial analysis"); add("accounting");
        add("budgeting"); add("forecasting"); add("risk management"); add("investment");
        add("supply chain"); add("logistics"); add("warehouse"); add("procurement"); add("inventory");
        add("e-commerce"); add("sales"); add("retail"); add("b2b"); add("b2c"); add("saas");
        add("healthcare"); add("biotechnology"); add("pharmaceuticals"); add("medical devices");
        add("regulatory compliance"); add("environmental health"); add("occupational safety");
        add("construction"); add("engineering"); add("civil engineering"); add("electrical engineering");
        add("mechanical engineering"); add("chemical engineering"); add("software engineering");
        add("product management"); add("product design"); add("product lifecycle"); add("requirements gathering");
    }};

    public static Map<String, Integer> extractKeywordsWithFrequency(String text) {
        Map<String, Integer> keywordFrequency = new HashMap<>();
        String[] words = text.toLowerCase().split("\\W+");
        for (String word : words) {
            if (JOB_RELATED_KEYWORDS.contains(word)) {
                keywordFrequency.put(word, keywordFrequency.getOrDefault(word, 0) + 1);
            }
        }
        logger.info("Extracted keywords: {}", keywordFrequency);
        return keywordFrequency;
    }

    public static String extractTextFromPdf(byte[] pdfData) {
        try (PDDocument document = PDDocument.load(pdfData)) {
            PDFTextStripper pdfStripper = new PDFTextStripper();
            return pdfStripper.getText(document);
        } catch (IOException e) {
            logger.error("Failed to extract text from PDF", e);
            return "";
        }
    }

    public static Map<String, Integer> matchKeywordsInPdf(byte[] pdfData, Map<String, Integer> jobKeywords) {
        String pdfText = extractTextFromPdf(pdfData).toLowerCase();
        Map<String, Integer> resumeKeywords = new HashMap<>();
        for (String keyword : jobKeywords.keySet()) {
            resumeKeywords.put(keyword, 0);
        }
        for (String word : pdfText.split("\\W+")) {
            if (resumeKeywords.containsKey(word)) {
                resumeKeywords.put(word, resumeKeywords.get(word) + 1);
            }
        }
        logger.info("Matched keywords in resume: {}", resumeKeywords);
        return resumeKeywords;
    }


    public static double compareKeywordFrequencies(Map<String, Integer> jobKeywords, Map<String, Integer> resumeKeywords,
                                                   int overlapWeight, double frequencyWeight) {
        int overlapCount = 0;
        double frequencyScore = 0.0;
        for (String keyword : jobKeywords.keySet()) {
            if (resumeKeywords.containsKey(keyword)) {
                overlapCount++;
                frequencyScore += Math.min(jobKeywords.get(keyword), resumeKeywords.get(keyword)) * frequencyWeight;
            }
        }
        return overlapCount * overlapWeight + frequencyScore;
    }
}
