import fs from "fs/promises";
import { tool } from "langchain";
import { z } from "zod";
// create,update multiple files at once.
const upsertFileTool = tool(
  async function ({ files }) {
    await Promise.all(
      files.map(async (file) => await fs.writeFile(file.path, file.content)),
    )
      .then((res) => {
        console.log("Response of files", res);
      })
      .catch((err) => {
        console.log("Error of files", err);
      });

    return "Files Upserted Successfully!";
  },
  {
    name: "upsertFile",
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

export { upsertFileTool };
