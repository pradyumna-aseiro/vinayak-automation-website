import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import fs from "node:fs";
const chrome = await launch({
  chromePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  chromeFlags: ["--headless=new", "--disable-gpu"],
});
const summaries = [];
try {
  for (const [name, path] of [
    ["home", "/"],
    ["category", "/products/drives-and-automation"],
    ["product", "/products/drives-and-automation/vss"],
    ["contact", "/contact"],
  ]) {
    const report = await lighthouse("http://localhost:3100" + path, {
      port: chrome.port,
      output: "json",
      logLevel: "error",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    });
    fs.writeFileSync(`artifacts/lighthouse-${name}.json`, report.report);
    const lhr = report.lhr;
    const summary = {
      name,
      url: lhr.finalDisplayedUrl,
      scores: Object.fromEntries(
        Object.entries(lhr.categories).map(([key, c]) => [
          key,
          Math.round(c.score * 100),
        ]),
      ),
      metrics: {
        LCP: lhr.audits["largest-contentful-paint"].displayValue,
        CLS: lhr.audits["cumulative-layout-shift"].displayValue,
        TBT: lhr.audits["total-blocking-time"].displayValue,
      },
      failures: Object.values(lhr.audits)
        .filter(
          (a) =>
            a.score !== null &&
            a.score < 0.9 &&
            a.scoreDisplayMode !== "informative",
        )
        .map((a) => ({ id: a.id, title: a.title, display: a.displayValue })),
    };
    summaries.push(summary);
    console.log(summary);
  }
} finally {
  fs.writeFileSync(
    "artifacts/lighthouse-summary.json",
    JSON.stringify(summaries, null, 2),
  );
  try {
    await chrome.kill();
  } catch (e) {
    if (e.code !== "EPERM") throw e;
    console.log("Chrome exited; Windows retained its temporary profile.");
  }
}
