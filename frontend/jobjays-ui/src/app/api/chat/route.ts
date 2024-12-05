import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import savedJobs from "@/components/candidate/SavedJobs";
import {getSavedJobsAPI} from "@/lib/serverApi";
// import {fetchAllJobPosts, useGetSavedJobs} from "@/lib/api";


// Import your API functions
 // Adjust the import path accordingly

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const functions = [
  {
    name: 'useGetSavedJobs',
    description:
        'Get all the saved jobs for the logged-in user. Call this whenever you need to take a look at all the jobs saved by the user, for example when they ask something like "Which of my saved jobs..."',
    parameters: {
      type: 'object',
      properties: {}, // No parameters
    },
  },
  {
    name: 'fetchAllJobPosts',
    description:
        'Get all the jobs that have been posted. Call this whenever you need to take a look at all the jobs being offered, for example when the user asks something like "Which of the posted jobs is..."',
    parameters: {
      type: 'object',
      properties: {}, // No parameters
    },
  },
];

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    // Call the OpenAI API with function definitions
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      functions: functions,
      function_call: 'auto',
    });

    console.log("Before Responsse Message");

    let responseMessage = completion.choices[0].message;

    console.log("After Response");

    // Check if the assistant wants to call a function
    if (responseMessage.function_call) {
      console.log("TWOOOOOO");
      const functionName = responseMessage.function_call.name;

      // Since the functions have no parameters, we don't need to parse arguments
      let functionResponse;

      if (functionName === 'useGetSavedJobs') {
        console.log("ONEEEEEEEEEEE")
        functionResponse = await getSavedJobsAPI(); // Call your actual API function
      } else if (functionName === 'fetchAllJobPosts') {
        console.log("REMMMMMMMM");
        //functionResponse = await fetchAllJobPosts(); // Call your actual API function
      } else {
        return NextResponse.json({ error: 'Function not found' }, { status: 400 });
      }

      // Convert function response to string, if necessary
      const functionResponseContent = JSON.stringify(functionResponse);

      // Add the assistant's function call and the function response to the messages
      messages.push(responseMessage); // Assistant's function call
      messages.push({
        role: 'function',
        name: functionName,
        content: functionResponseContent,
      });

      // Call the OpenAI API again to get the assistant's final response
      const secondCompletion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
      });

      responseMessage = secondCompletion.choices[0].message;

      return NextResponse.json({ assistantMessage: responseMessage });
    } else {
      // Assistant didn't call a function; return the response as is
      return NextResponse.json({ assistantMessage: responseMessage });
    }
  } catch (error) {
    console.error('Error fetching from OpenAI API:', error);
    return NextResponse.json({ error: 'Error fetching from OpenAI API' }, { status: 500 });
  }
}
