import { justifyText } from "../src/justify.js";

describe("justifyText", () => {
  it("lines are <= width", () => {
    const sample = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(8);
    const out = justifyText(sample, 80);
    const lines = out.split("\n");
    for (const line of lines) {
      expect(line.length).toBeLessThanOrEqual(80);
    }
  });

  it("keeps words intact", () => {
    const s = "one two three four";
    const out = justifyText(s, 20);
    expect(out.includes("one")).toBeTruthy();
    expect(out.includes("two")).toBeTruthy();
  });
});

