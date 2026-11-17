import intiGraph from "./ai/graph/graph.js";
import {
  getApiKey,
  getSettingsContent,
  saveApiKey,
} from "./utils/file.utils.js";
import rl from "./utils/readlin.utils.js";

async function app() {
  const settings = await getSettingsContent();
  if (!settings.apiKey) {
    console.error("No Api Key found!!");
    const apiKey = await rl.question("Enter your api key here: ");
    await saveApiKey(apiKey);
  }
  const res = await getApiKey();
  if (res!.error) {
    console.log("Invalid or Expired Api Key!");
    const apiKey = await rl.question("Enter your api key here: ");
    await saveApiKey(apiKey);
    return app();
  }
  await intiGraph();
  rl.close();
}

export default app;
