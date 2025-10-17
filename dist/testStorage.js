"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage_js_1 = require("./storage.js");
console.log("=== TestStorage Start ===");
const token = {
    token: "test123",
    email: "foo@bar.com",
    createdAt: new Date().toISOString(),
    usage: { "2025-10-15": 100 }
};
(0, storage_js_1.saveOrUpdateToken)(token);
console.log("After save:", (0, storage_js_1.readAllTokens)());
