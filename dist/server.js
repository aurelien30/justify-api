"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const uuid_1 = require("uuid");
const justify_js_1 = require("./justify.js");
const storage_js_1 = require("./storage.js");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const DAILY_LIMIT_WORDS = 80000;
app.use(body_parser_1.default.json({ type: "application/json" }));
app.post("/api/token", (req, res) => {
    const { email } = req.body || {};
    if (!email || typeof email !== "string") {
        return res.status(400).json({ error: "Missing email in body" });
    }
    const token = (0, uuid_1.v4)();
    const record = {
        token,
        email,
        createdAt: new Date().toISOString(),
        usage: {}
    };
    (0, storage_js_1.saveOrUpdateToken)(record);
    res.json({ token });
});
app.use("/api/justify", body_parser_1.default.text({ type: "text/plain", limit: "5mb" }));
function extractToken(req) {
    const auth = req.header("authorization") || req.header("Authorization");
    if (!auth)
        return null;
    const parts = auth.split(" ");
    if (parts.length === 2 && parts[0].toLowerCase() === "bearer")
        return parts[1];
    return null;
}
app.post("/api/justify", (req, res) => {
    const token = extractToken(req);
    if (!token)
        return res.status(401).json({ error: "Unauthorized: token required" });
    const record = (0, storage_js_1.findToken)(token);
    if (!record)
        return res.status(401).json({ error: "Unauthorized: token invalid" });
    const text = req.body;
    if (typeof text !== "string")
        return res.status(400).json({ error: "Content-Type must be text/plain with raw text body" });
    const words = text.trim().length === 0 ? 0 : text.trim().split(/\s+/).filter(Boolean).length;
    const today = new Date().toISOString().slice(0, 10);
    const usedToday = record.usage[today] || 0;
    if (usedToday + words > DAILY_LIMIT_WORDS) {
        return res.status(402).json({ error: "Payment Required: daily word limit exceeded" });
    }
    record.usage[today] = usedToday + words;
    (0, storage_js_1.saveOrUpdateToken)(record);
    const justified = (0, justify_js_1.justifyText)(text, 80);
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send(justified);
});
// Sert les fichiers du dossier "public"
app.use(express_1.default.static(path_1.default.join(process.cwd(), "public")));
app.get("/", (_, res) => {
    res.send("Justify API - up. POST /api/token and POST /api/justify with Authorization: Bearer <token>");
});
// Si aucune route ne correspond, renvoie index.html
app.get("*", (_, res) => {
    res.sendFile(path_1.default.join(process.cwd(), "public", "index.html"));
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
