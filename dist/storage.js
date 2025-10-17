"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readAllTokens = readAllTokens;
exports.saveOrUpdateToken = saveOrUpdateToken;
exports.findToken = findToken;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const DATA_FILE = path_1.default.resolve("./data/tokens.json");
function ensureFile() {
    const dir = path_1.default.dirname(DATA_FILE);
    if (!fs_1.default.existsSync(dir))
        fs_1.default.mkdirSync(dir, { recursive: true });
    if (!fs_1.default.existsSync(DATA_FILE))
        fs_1.default.writeFileSync(DATA_FILE, JSON.stringify([]));
}
function readAllTokens() {
    ensureFile();
    const raw = fs_1.default.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(raw);
}
function saveOrUpdateToken(record) {
    ensureFile();
    const tokens = readAllTokens();
    const idx = tokens.findIndex(t => t.token === record.token);
    if (idx >= 0)
        tokens[idx] = record;
    else
        tokens.push(record);
    fs_1.default.writeFileSync(DATA_FILE, JSON.stringify(tokens, null, 2));
}
function findToken(token) {
    const tokens = readAllTokens();
    return tokens.find(t => t.token === token) || null;
}
