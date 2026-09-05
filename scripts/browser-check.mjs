import fs from "node:fs";
import { chromium } from "@playwright/test";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const data = JSON.parse(fs.readFileSync("data/catalogue.json", "utf8"));
const origin = process.env.CHECK_ORIGIN || "http://localhost:3100";
const results = [];
fs.mkdirSync("artifacts", { recursive: true });
for (const [device, width] of [
  ["desktop", 1440],
  ["tablet", 820],
  ["mobile", 390],
]) {
  const page = await browser.newPage({
    viewport: { width, height: 1000 },
    deviceScaleFactor: 1,
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const [name, path] of [
    ["home", "/"],
    ["about", "/about"],
    ["products", "/products"],
    ["category", "/products/drives-and-automation"],
    ["product", "/products/drives-and-automation/vss"],
    ["contact", "/contact?product=Emotron%20VSS"],
  ]) {
    await page.goto(origin + path, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(async () => {
      document.documentElement.style.scrollBehavior = "auto";
      for (let y = 0; y < document.body.scrollHeight; y += 800) {
        scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 80));
      }
      scrollTo(0, 0);
      await new Promise((r) =>
        requestAnimationFrame(() => requestAnimationFrame(r)),
      );
    });
    for (const img of await page.locator("img").all()) {
      await img.scrollIntoViewIfNeeded();
      await img.evaluate((e) => e.decode());
    }
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForFunction(() => scrollY === 0);
    await page.screenshot({
      path: `artifacts/${device}-${name}.jpg`,
      fullPage: true,
      type: "jpeg",
      quality: 70,
    });
    const state = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      brokenImages: [...document.images]
        .filter((i) => !i.complete || i.naturalWidth === 0)
        .map((i) => i.src),
    }));
    results.push({ device, path, ...state });
  }
  if (width === 390) {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Products", exact: true })
      .click();
    await page.waitForURL("**/products");
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page.keyboard.press("Escape");
    if (
      (await page
        .getByRole("button", { name: "Open navigation" })
        .getAttribute("aria-expanded")) !== "false"
    )
      throw new Error("Escape failed");
  }
  await page.goto(origin + "/contact?product=Emotron%20VSS");
  if ((await page.locator("#product_name").inputValue()) !== "Emotron VSS")
    throw new Error("Prefill failed");
  // Intercept all submissions: browser tests never send an email.
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 502,
      contentType: "application/json",
      body: JSON.stringify({ error: "Test: service unavailable." }),
    }),
  );
  await page.getByLabel("Your name", { exact: true }).fill("QA Test");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("qa@example.com");
  await page
    .getByLabel("Phone number", { exact: true })
    .fill("+91 98765 43210");
  await page
    .getByLabel("Tell us about your requirement")
    .fill("A locally intercepted form test.");
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await page
    .getByRole("status")
    .filter({ hasText: "Test: service unavailable." })
    .waitFor();
  if ((await page.locator("#name").inputValue()) !== "QA Test")
    throw new Error("Failed form cleared user input");
  await page.unroute("**/api/contact");
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: '{"success":true}',
    }),
  );
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await page
    .getByRole("status")
    .filter({ hasText: "accepted for sending" })
    .waitFor();
  if ((await page.locator("#name").inputValue()) !== "")
    throw new Error("Accepted form did not reset");
  results.push({
    device,
    formFailureRecovery: true,
    formSuccess: true,
    browserErrors: errors,
  });
  await page.close();
}
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
for (const c of data) {
  await page.goto(origin + "/products/" + c.slug, {
    waitUntil: "domcontentloaded",
  });
  await page.screenshot({
    path: `artifacts/range-${c.slug}.jpg`,
    fullPage: true,
    type: "jpeg",
    quality: 55,
  });
}
await browser.close();
fs.writeFileSync("artifacts/browser.json", JSON.stringify(results, null, 2));
console.log(results);
if (
  results.some(
    (r) => r.overflow || r.brokenImages?.length || r.browserErrors?.length,
  )
)
  process.exitCode = 1;
