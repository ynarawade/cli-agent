#!/usr/bin/env node
import os from "node:os";
import path from "node:path";
import app from "./app.js";

export const HOME_DIR = os.homedir();
export const CONFIG_DIR = path.join(HOME_DIR, ".boxy-ai");

app();
