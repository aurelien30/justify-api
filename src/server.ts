import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import { justifyText } from "./justify.js";
import { findToken, saveOrUpdateToken } from "./storage.js";
import type { TokenRecord } from "./types.js";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const DAILY_LIMIT_WORDS = 80000;

app.use(bodyParser.json({ type: "application/json" }));

app.post("/api/token", (req, res) => {
  const { email } = req.body || {};
  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Missing email in body" });
  }
  const token = uuidv4();
  const record: TokenRecord = {
    token,
    email,
    createdAt: new Date().toISOString(),
    usage: {}
  };
  saveOrUpdateToken(record);
  res.json({ token });
});

app.use("/api/justify", bodyParser.text({ type: "text/plain", limit: "5mb" }));

function extractToken(req: express.Request): string | null {
  const auth = req.header("authorization") || req.header("Authorization");
  if (!auth) return null;
  const parts = auth.split(" ");
  if (parts.length === 2 && parts[0].toLowerCase() === "bearer") return parts[1];
  return null;
}

app.post("/api/justify", (req, res) => {
  const token = extractToken(req);
  if (!token) return res.status(401).json({ error: "Unauthorized: token required" });

  const record = findToken(token);
  if (!record) return res.status(401).json({ error: "Unauthorized: token invalid" });

  const text = req.body as string;
  if (typeof text !== "string") return res.status(400).json({ error: "Content-Type must be text/plain with raw text body" });

  const words = text.trim().length === 0 ? 0 : text.trim().split(/\s+/).filter(Boolean).length;

  const today = new Date().toISOString().slice(0, 10);
  const usedToday = record.usage[today] || 0;
  if (usedToday + words > DAILY_LIMIT_WORDS) {
    return res.status(402).json({ error: "Payment Required: daily word limit exceeded" });
  }

  record.usage[today] = usedToday + words;
  saveOrUpdateToken(record);

  const justified = justifyText(text, 80);
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.send(justified);
});

app.get("/", (_, res) => {
  res.send("Justify API - up. POST /api/token and POST /api/justify with Authorization: Bearer <token>");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
