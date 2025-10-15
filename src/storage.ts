import fs from "fs";
import path from "path";
import { TokenRecord } from "./types";

const DATA_FILE = path.resolve(__dirname, "../data/tokens.json");

function ensureFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

export function readAllTokens(): TokenRecord[] {
  ensureFile();
  const raw = fs.readFileSync(DATA_FILE, "utf8");
  return JSON.parse(raw) as TokenRecord[];
}

export function saveOrUpdateToken(record: TokenRecord) {
  ensureFile();
  const tokens = readAllTokens();
  const idx = tokens.findIndex(t => t.token === record.token);
  if (idx >= 0) tokens[idx] = record;
  else tokens.push(record);
  fs.writeFileSync(DATA_FILE, JSON.stringify(tokens, null, 2));
}
