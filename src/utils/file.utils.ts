import fs from "fs/promises";
import path from "path";
import { CONFIG_DIR } from "../index.js";

export async function getSettingsContent() {
  // check .boxy-ai folder exist or not, else create it.
  try {
    await fs.access(CONFIG_DIR);
  } catch (error) {
    await fs.mkdir(CONFIG_DIR, {
      recursive: true,
    });
  }

  const settingsFilePath = path.join(CONFIG_DIR, "settings.json");

  try {
    await fs.access(settingsFilePath);
    const content = await fs.readFile(settingsFilePath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    await fs.writeFile(settingsFilePath, JSON.stringify({}));
    return {};
  }
}

export async function saveApiKey(apiKey: string) {
  const settingsFilePath = path.join(CONFIG_DIR, "settings.json");
  const content = await getSettingsContent();
  await fs.writeFile(settingsFilePath, JSON.stringify({ ...content, apiKey }));
}
export async function getApiKey() {
  const content = await getSettingsContent();
  const apiKey = content.apiKey || null;
  if (!apiKey) {
    return {
      error: "Api key not found!",
    };
  }
  try {
    const res = await fetch("https://api.groq.com/openai/v1/models", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    if (!res.ok) {
      if (res.status === 401) {
        return {
          error: "Invalid or Expired api key!",
        };
      }
      return {
        error: `Request failed with status ${res.status}`,
      };
    }
    return { apiKey };
  } catch (error: any) {
    return {
      error: error instanceof Error ? error.message : "Network error occurred",
    };
  }
}
