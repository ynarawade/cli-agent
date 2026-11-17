import { ChatGroq } from "@langchain/groq";
import { type AIMessageChunk } from "langchain";
import { getApiKey } from "../../utils/file.utils.js";
import { fileTools } from "../tools/file.tools.js";

export async function AiNode(state: any) {
  const apiKey = (await getApiKey()).apiKey;
  const model = new ChatGroq({
    model: "openai/gpt-oss-20b",
    apiKey: apiKey,
  });

  const modelWithTools = model.bindTools([
    fileTools.upsertFileTool,
    fileTools.readFileTool,
    fileTools.listAllFilesAndFoldersTool,
    fileTools.deleteFileOrFolderTool,
  ]);

  const stream = await modelWithTools.stream(state.messages);
  process.stdout.write("[AI]: ");

  let aiMessage: AIMessageChunk | null = null;
  for await (const chunk of stream) {
    process.stdout.write(chunk.text);
    // console.log(chunk);
    aiMessage = aiMessage ? aiMessage.concat(chunk) : chunk;
  }
  process.stdout.write("\n");
  return {
    messages: [...state.messages, aiMessage],
  };
}

export async function ToolNode(state: any, config: any) {
  const messages = state.messages;
  const aiMessage = messages[messages.length - 1];
  const toolCalls = aiMessage.tool_calls;
  const toolResults = await Promise.all(
    toolCalls.map(async (toolCall: any) => {
      const toolName = toolCall.name as keyof typeof fileTools;
      const selectedTool = fileTools[toolName] as any;
      return await selectedTool.invoke(toolCall);
    }),
  );
  return {
    messages: [...state.messages, ...toolResults],
  };
}
