import { saveOrUpdateToken, readAllTokens } from "./storage";
import { TokenRecord } from "./types";

console.log("=== TestStorage Start ===");

const token: TokenRecord = {
  token: "test123",
  email: "foo@bar.com",
  createdAt: new Date().toISOString(),
  usage: { "2025-10-15": 100 }
};

saveOrUpdateToken(token);

console.log("After save:", readAllTokens());
