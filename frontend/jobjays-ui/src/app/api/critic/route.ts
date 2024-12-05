// app/api/critic/route.ts

import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const runtime = 'nodejs'; // Ensure we use Node.js runtime

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    console.log("IN POST");
    try {
        const { resumeText } = await req.json();

        // console.log("THIS IS THE RESUME TEXT", resumeText);

        if (!resumeText) {
            console.log("NOOOOOOOOO");
            return NextResponse.json({ error: 'No resume text provided' }, { status: 400 });
        }

        console.log("AFTER ERROR IN POST");

        // Now, send the resume text to OpenAI API
        const prompt = `You are a professional resume critic. Analyze the following resume and provide feedback in JSON format as follows:

{
  "positive_points": ["...", "..."],
  "negative_points": ["...", "..."]
}

Resume Content:
${resumeText}`;

        console.log("THIS IS THE PROMPT", prompt);

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
        });

        const assistantMessage = completion.choices[0].message?.content;

        console.log("THIS IS THE ASSISTANTS MESSAGE", assistantMessage);

        let feedback;
        try {
            if (assistantMessage) {
                feedback = JSON.parse(assistantMessage);
            } else {
                throw new Error('No assistant message');
            }
        } catch (e) {
            console.error('Error parsing assistant response:', e);
            return NextResponse.json({ error: 'Error parsing assistant response' }, { status: 500 });
        }

        return NextResponse.json({ feedback });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
    }
}
