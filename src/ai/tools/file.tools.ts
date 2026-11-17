import fs from "fs/promises";
import { tool } from "langchain";
import path from "path";
import { z } from "zod";
// create,update multiple files at once.
const upsertFileTool = tool(
  async function ({ files }) {
    await Promise.all(
      files.map(async (file) => await fs.writeFile(file.path, file.content)),
    );
    return "Files Upserted Successfully!";
  },
  {
    name: "upsertFileTool",
    description: "Create or Update multiple files at once!",
    schema: z.object({
      files: z.array(
        z.object({
          path: z
            .string()
            .describe("The absolute path of file want to create/update"),
          content: z
            .string()
            .describe("The content of file to be created/updated"),
        }),
      ),
    }),
  },
);
// Reads content of files
const readFileTool = tool(
  async function ({ files }) {
    const results = await Promise.all(
      files.map(async (file) => {
        const content = await fs.readFile(file.path, "utf-8");
        return { path: file.path, content };
      }),
    );
    return JSON.stringify(results);
  },
  {
    name: "readFileTool",
    description: "Reads the content inside multiple files",
    schema: z.object({
      files: z.array(
        z.object({
          path: z.string().describe("The absolute path of files"),
        }),
      ),
    }),
  },
);

// Lists all files/folders inside current dir (recursive)
const listAllFilesAndFoldersTool = tool(
  async ({ folder }) => {
    const results: string[] = [];

    async function traverse(currFolder: string) {
      const entries = await fs.readdir(currFolder, { withFileTypes: true });
      for (const entry of entries) {
        // Use path.join for cross-platform compatibility (Windows/Linux/macOS)
        const fullPath = path.join(currFolder, entry.name);

        if (entry.isDirectory()) {
          if (entry.name === "node_modules" || entry.name.startsWith(".")) {
            continue; // Skip node_modules and hidden folders
          }
          results.push(fullPath); // Include the directory itself if desired
          await traverse(fullPath);
        } else {
          results.push(fullPath);
        }
      }
    }

    await traverse(folder);
    return JSON.stringify(results);
  },
  {
    name: "listAllFilesAndFoldersTool",
    description:
      "Returns the list of all files/folders present in current directory recursively (ignore folders like node_modules, or temporary files)",
    schema: z.object({
      folder: z.string().describe("The absolute path to folder"),
    }),
  },
);

// Deletes all files/ folders
const deleteFileOrFolderTool = tool(
  async ({ path }) => {
    await fs.rm(path, { recursive: true, force: true });
    return `Successfully deleted: ${path}`;
  },
  {
    name: "deleteFileOrFolderTool",
    description:
      "Deletes a file or a folder (recursively) at the specified path",
    schema: z.object({
      path: z
        .string()
        .describe("The absolute path of the file or folder to delete"),
    }),
  },
);
export const fileTools = {
  upsertFileTool,
  readFileTool,
  listAllFilesAndFoldersTool,
  deleteFileOrFolderTool,
};
