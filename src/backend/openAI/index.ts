import { OpenAI as openai } from "openai";

const openAIApiKey = process.env.OPENAI_API_KEY;

if (!openAIApiKey) {
  throw new Error("Please define the OPENAI_API_KEY environment variable");
}

export const OpenAI = new openai({
  apiKey: openAIApiKey,
});
