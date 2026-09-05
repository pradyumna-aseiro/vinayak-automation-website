import fs from "node:fs";
import sharp from "sharp";
const background = await sharp("public/media/factory.webp")
  .resize(1200, 630, { fit: "cover" })
  .modulate({ brightness: 0.35, saturation: 0.5 })
  .toBuffer();
const svg = Buffer.from(
  `<svg width="1200" height="630"><rect x="0" y="0" width="730" height="630" fill="#f9f8f5"/><rect x="65" y="78" width="12" height="12" fill="#a13236"/><text x="94" y="91" font-family="Arial" font-size="18" letter-spacing="3" fill="#616765">VINAYAK AUTOMATION PRODUCTS</text><text x="65" y="255" font-family="Arial" font-size="64" fill="#212525">The right products.</text><text x="65" y="340" font-family="Arial" font-size="64" fill="#212525">The power to</text><text x="65" y="425" font-family="Arial" font-size="64" fill="#a13236">move forward.</text><text x="65" y="545" font-family="Arial" font-size="20" fill="#616765">PRODUCT SUPPLY · SYSTEM INTEGRATION · SINCE 2007</text></svg>`,
);
await sharp(background)
  .composite([{ input: svg }])
  .jpeg({ quality: 90 })
  .toFile("public/media/social.jpg");
fs.writeFileSync(
  "docs/legacy-redirects.json",
  JSON.stringify(
    (await import("../next.config.mjs")).legacyRedirects,
    null,
    2,
  ) + "\n",
);
