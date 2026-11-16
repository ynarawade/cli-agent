# BoxyAI - CLI Agent with LangChain & LangGraph

A command-line AI agent built with **Node.js**, **TypeScript**, **LangChain**, and **LangGraph**. This project demonstrates autonomous agent architecture, state management, and tool calling to interact directly with the local file system (reading, creating, updating, and deleting files).

---

## 🚀 Features

- **Agentic Workflow with LangGraph**: State-driven agent loop orchestrating model reasoning and tool execution.
- **File System Operations**: Autonomous tools allowing the agent to:
  - 📖 **Read**: Inspect and analyze contents of files on the system.
  - ✍️ **Create & Write**: Generate new files and project assets.
  - 🔄 **Update**: Modify, append, or refactor existing files.
  - 🗑️ **Delete**: Remove files when explicitly tasked.
- **Fast Inference with Groq**: Powered by `@langchain/groq` for low-latency reasoning and tool dispatch.
- **Type-Safe Validation**: Tool inputs and graph schemas defined and validated with **Zod**.
- **CLI Interface**: Packaged as an interactive terminal utility (`boxy-ai`).

---

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Agent Frameworks**:
  - [`@langchain/langgraph`](https://github.com/langchain-ai/langgraphjs): Agent orchestration and cyclic graph execution
  - [`langchain`](https://github.com/langchain-ai/langchainjs): Core agent abstractions, tools, and prompts
  - [`@langchain/groq`](https://github.com/langchain-ai/langchainjs/tree/main/libs/langchain-groq): Groq LLM integration
- **Validation**: [Zod](https://zod.dev/)
- **Dev Tools**: `tsx`, `dotenv`

---

## 📁 Project Structure

```text
├── src/
│   └── index.ts          # CLI entry point and agent initialization
├── dist/                 # Compiled JavaScript output
├── .env                  # Environment variables & API keys (ignored)
├── .gitignore            # Git ignore configuration
├── package.json          # Project metadata, dependencies, and scripts
├── pnpm-lock.yaml        # Lockfile
├── tsconfig.json         # TypeScript compiler configuration
└── README.md             # Project documentation
```

---

## 🏁 Getting Started

### Prerequisites

- **Node.js**: v18+ or v20+ recommended
- **pnpm**: v9+ (project configured with `pnpm@12.21.0`)
- A **Groq API Key** (or provider key based on your configured model)

### 1. Installation

Clone this repository and install dependencies using `pnpm`:

```bash
pnpm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```bash
touch .env
```

Add your API credentials:

```env
GROQ_API_KEY=your_groq_api_key_here
```

> **Security Note**: Never commit your `.env` file to version control. It is protected by `.gitignore`.

### 3. Running the Project

#### Development Mode (with hot-reloading)

```bash
pnpm dev
```

#### Type Checking

```bash
pnpm check
```

#### Production Build & Run

Compile TypeScript to `dist/` and run the CLI binary:

```bash
pnpm build
pnpm start
```

You can also link the CLI command locally:

```bash
pnpm link --global
boxy-ai
```

---

## ⚠️ Security & Safety Warning

This AI agent possesses capabilities to read, modify, and delete files on your local file system.
- Always run the agent inside safe, dedicated working directories.
- Ensure sensitive directories and system files are protected.
- Review agent actions and tool calls before confirming destructive commands.

---

## 📜 License

This project is licensed under the ISC License.
