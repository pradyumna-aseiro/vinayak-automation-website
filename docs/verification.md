# Verification — Vinayak rebuild

## Implementation

- Rebuild commit: `c3a2474d62f9f99e07e09f1f8caf76278e432fe0`.
- Draft review: https://github.com/pradyumna-aseiro/vinayak-automation-website/pull/1
- Successful Vercel preview: https://vinayak-automation-website-gmp4cbiuq.vercel.app
- Production remains at `07f918d943442707744c44539544e5ef2ba4e608`. No merge or production deployment was performed.

## Passed checks

- Next.js production build, TypeScript and ESLint.
- 10 contact-handler, catalogue and redirect tests. All provider calls mocked.
- Full local crawl: 118 pages, 111 image URLs, 27 redirects; no failures.
- Six page templates at 1440px desktop, 820px tablet and 390px mobile: no horizontal overflow, broken images or browser exceptions.
- Mobile navigation and Escape handling; quotation prefill; form failure preserves input; accepted submission resets input. Browser email requests were intercepted.
- Axe WCAG A/AA checks: zero violations on six templates at desktop and mobile widths.
- GitHub Actions clean-install/build checks passed on Linux: https://github.com/pradyumna-aseiro/vinayak-automation-website/actions/runs/33943933048
- Vercel Git integration build passed. Existing project retained.

## Local mobile Lighthouse

| Page            | Performance | Accessibility | Best practices | SEO |   LCP | CLS |
| --------------- | ----------: | ------------: | -------------: | --: | ----: | --: |
| Home            |          96 |           100 |            100 | 100 | 2.8 s |   0 |
| Drives category |          97 |           100 |            100 | 100 | 2.7 s |   0 |
| Emotron VSS     |          97 |           100 |            100 | 100 | 2.6 s |   0 |
| Contact         |          97 |           100 |            100 | 100 | 2.5 s |   0 |

These are local simulated-mobile lab measurements, not field Core Web Vitals or deployed preview scores. Remaining performance opportunities are mostly framework JavaScript and network/render dependencies; no field ranking or traffic improvement is claimed.

## Remaining launch requirements

1. The Vercel preview uses the project's existing authentication protection. Unauthenticated requests redirect to Vercel login; the remote page content could not be independently crawled. Sign in with the project account to review it. Preview protection has not been disabled.
2. Configure `CONTACT_FROM_EMAIL` using a verified Resend sending domain and confirm the existing API key is available in the preview environment. The intended recipient is `info@vinayakautomation.com`. The local Vercel CLI is logged out, so environment variables and sender verification were not inspected or changed.
3. Authorise one labelled test email after configuration, then verify receipt in the Vinayak inbox. No real email has been sent. The form is implemented and tested with mocks; end-to-end delivery is not yet verified.
4. Approve the preview before merging to `master` and publishing production.

## Workspace

`Company Websites` now contains separate `Aseiro Website` and `Vinayak Automation Website` folders. All 36 pre-existing Aseiro files were preserved and verified by SHA-256 during the move. The parent has no Git repository; each child has its own Git metadata.

Windows holds the original task directory open. Its contents were moved, leaving `C:\Users\Pradyumna\Documents\ChatGPT\Aseiro Website` empty. Open `C:\Users\Pradyumna\Documents\ChatGPT\Company Websites` as the Codex project to finish the app-level workspace switch. The app has no available tool to change the current task's saved project path.
