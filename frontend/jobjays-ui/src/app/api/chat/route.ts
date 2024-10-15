import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    });

    const assistantMessage = completion.choices[0].message;

    return NextResponse.json({ assistantMessage });
  } catch (error) {
    console.error('Error fetching from OpenAI API:', error);
    return NextResponse.json({ error: 'Error fetching from OpenAI API' }, { status: 500 });
  }
}
