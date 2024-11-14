import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
//import jwt from 'jsonwebtoken';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Replace with your actual JWT secret (store securely in .env.local)
// const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Mock functions to simulate database queries
async function getUserProfile(userId: number) {
  // Replace this with an actual database query
  return {
    name: 'John Doe',
    skills: ['JavaScript', 'React', 'Node.js'],
    experience: '5 years in full-stack development',
    // ...additional profile data
  };
}

async function getUserSavedJobs(userId: number) {
  // Replace this with an actual database query
  return [
    { title: 'Frontend Developer at Company A', requirements: ['JavaScript', 'React'] },
    { title: 'Backend Developer at Company B', requirements: ['Node.js', 'Express'] },
    // ...additional saved jobs
  ];
}

export async function POST(req: NextRequest) {
  try {

    // // Extract the token from cookies or headers
    // const authHeader = req.headers.get('Authorization');
    // let token;

    // if (authHeader && authHeader.startsWith('Bearer ')) {
    //   token = authHeader.substring(7); // Remove 'Bearer ' prefix
    // } else {
    //   // Try to get the token from cookies
    //   const cookie = req.cookies.get('token');
    //   if (cookie) {
    //     token = cookie.value;
    //   }
    // }

    // if (!token) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // // Verify the token and extract the user ID
    // let decodedToken;
    // try {
    //   decodedToken = jwt.verify(token, JWT_SECRET);
    // } catch (err) {
    //   console.error('Invalid token:', err);
    //   return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    // }

    // const userId = decodedToken.userId; // Assuming the payload contains userId
    // if (!userId) {
    //   return NextResponse.json({ error: 'User ID not found in token' }, { status: 401 });
    // }

    const { messages } = await req.json();

    if (!messages) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    const userId = 1;

    // Fetch user profile and saved jobs from the database
    const userProfile = await getUserProfile(userId);
    const userSavedJobs = await getUserSavedJobs(userId);

    const systemPrompt = `
      You are a helpful assistant.

      User Profile:
      - Name: ${userProfile.name}
      - Skills: ${userProfile.skills.join(', ')}
      - Experience: ${userProfile.experience}

      Saved Jobs:
      ${userSavedJobs.map((job, index) => `${index + 1}. ${job.title}`).join('\n')}

      Use this information to assist the user with their queries.
      `;

    // Prepare the conversation with the updated system prompt
    const conversation = [
      {
        role: 'system',
        content: systemPrompt.trim(),
      },
      // Include previous messages, excluding any prior system prompts
      ...messages.filter((msg: any) => msg.role !== 'system'),
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: conversation,
    });

    const assistantMessage = completion.choices[0].message;

    return NextResponse.json({ assistantMessage });
  } catch (error) {
    console.error('Error fetching from OpenAI API:', error);
    return NextResponse.json({ error: 'Error fetching from OpenAI API' }, { status: 500 });
  }
}