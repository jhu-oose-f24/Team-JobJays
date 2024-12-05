import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const runtime = 'nodejs';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    console.log("IN POST SKILLS");
    try {
        const { resumeText } = await req.json();

        if (!resumeText) {
            console.log("NO RESUME TEXT PROVIDED");
            return NextResponse.json({ error: 'No resume text provided' }, { status: 400 });
        }

        const prompt = `Extract all the skills, technologies, and keywords mentioned in the following resume. Provide the results as a JSON array of strings. **Only output the JSON array and nothing else.**

Resume Content:
${resumeText}`;

        console.log("THIS IS THE PROMPT SKILLS:", prompt);

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
        });

        const assistantMessage = completion.choices[0].message?.content;

        console.log("THIS IS THE ASSISTANT'S MESSAGE SKILLS:", assistantMessage);

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
