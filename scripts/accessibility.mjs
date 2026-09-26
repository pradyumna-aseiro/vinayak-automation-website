import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = [];
for (const width of [1440, 390]) {
  const context = await browser.newContext({
    viewport: { width, height: 1000 },
  });
  const page = await context.newPage();
  for (const path of [
    "/",
    "/about",
    "/products",
    "/products/drives-and-automation",
    "/products/drives-and-automation/vss",
    "/contact",
    "/privacy",
    "/products/process-control-instruments",
  ]) {
    await page.goto("http://localhost:3100" + path, {
      waitUntil: "domcontentloaded",
    });
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    results.push({
      width,
      path,
      violations: result.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    });
  }
  await context.close();
}
await browser.close();
fs.writeFileSync(
  "artifacts/accessibility.json",
  JSON.stringify(results, null, 2),
);
console.log(results.filter((r) => r.violations.length));
if (results.some((r) => r.violations.length)) process.exitCode = 1;
