// src/storage.ts
import fs from "fs";
import path from "path";
import { TokenRecord } from "./types";

const DATA_FILE = path.resolve(__dirname, "../data/tokens.json");

/**
 * Vérifie que le fichier JSON existe et est valide.
 * Si le fichier ou le contenu est absent ou corrompu, il est initialisé avec [].
 */
function ensureFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]", { encoding: "utf8" });
  } else {
    try {
      const content = fs.readFileSync(DATA_FILE, "utf8");
      JSON.parse(content);
    } catch (err) {
      console.warn("tokens.json corrompu ou invalide, réinitialisation...");
      fs.writeFileSync(DATA_FILE, "[]", { encoding: "utf8" });
    }
  }
}

/** Lit tous les tokens depuis le fichier JSON */
export function readAllTokens(): TokenRecord[] {
  ensureFile();
  const raw = fs.readFileSync(DATA_FILE, "utf8");
  return JSON.parse(raw) as TokenRecord[];
}

/** Ajoute ou met à jour un token dans le fichier JSON */
export function saveOrUpdateToken(record: TokenRecord) {
  ensureFile();
  const tokens = readAllTokens();
  const idx = tokens.findIndex(t => t.token === record.token);
  if (idx >= 0) tokens[idx] = record;
  else tokens.push(record);
  fs.writeFileSync(DATA_FILE, JSON.stringify(tokens, null, 2), { encoding: "utf8" });
}
