import { START, StateGraph } from "@langchain/langgraph";
import { HumanMessage, SystemMessage, type BaseMessage } from "langchain";
import { z } from "zod";
import rl from "../../utils/readlin.utils.js";
import { AiNode } from "./node.js";
const state = z.object({
  messages: z.array(z.any()),
});

const graph = new StateGraph(state)
  .addNode("AiNode", AiNode)
  .addEdge(START, "AiNode")
  .addEdge("AiNode", "__end__")
  .compile();

export default async function intiGraph() {
  let messages: BaseMessage[] = [
    new SystemMessage(
      `You are a CLI assistant for file management, project scaffolding, and shell commands. Current working directory: ${process.cwd()}. Always use absolute paths for file operations. Confirm before deleting files or overwriting existing data.`,
    ),
  ];
  while (true) {
    const userInput = await rl.question(`[USER]: `);
    if (
      userInput.toLocaleLowerCase() === "/bye" ||
      userInput.toLocaleLowerCase() === "exit"
    ) {
      break;
    }
    messages.push(new HumanMessage(userInput));
    const response = await graph.invoke({
      messages: messages,
    });
    messages = response.messages;
  }
}
