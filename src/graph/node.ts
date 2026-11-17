import { ChatGroq } from "@langchain/groq";
import { AIMessage } from "langchain";
import { getApiKey } from "../utils/file.utils.js";
export async function AiNode(state: any) {
  const apiKey = (await getApiKey()).apiKey;
  const model = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey: apiKey,
  });

  const stream = await model.stream(state.messages);
  process.stdout.write("[AI]: ");
  let aiMessage = "";

  for await (const chunk of stream) {
    process.stdout.write(chunk.text);
    // console.log(chunk.text);
    aiMessage += chunk.text;
  }
  process.stdout.write("\n");
  return {
    messages: [...state.messages, new AIMessage(aiMessage)],
  };
}
