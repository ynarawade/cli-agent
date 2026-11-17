import { START, StateGraph } from "@langchain/langgraph";
import { HumanMessage, SystemMessage, type BaseMessage } from "langchain";
import { z } from "zod";
import rl from "../utils/readlin.utils.js";
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
      "You are an expert IT career consultant for freshers. Give pragmatic, structured advice on tech roles, skill roadmaps, resumes, and interviews. Ask clarifying questions when needed.",
    ),
  ];
  while (true) {
    const userInput = await rl.question(`[USER]: `);
    messages.push(new HumanMessage(userInput));
    const response = await graph.invoke({
      messages: messages,
    });
    messages = response.messages;
  }
}
