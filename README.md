# QMH Behavioral Partners — Denial Analysis Suite

A lightweight React dashboard modeled after the structure of the Alpaca case-study app, rebuilt for denial analysis.

## What is included
- Overview
- Denial Patterns
- By Payer
- By Provider
- Claims Log
- 90-Day Plan

## Fictional setup
- Company: QMH Behavioral Partners
- Practice type: Multi-specialty behavioral health group
- Specialties: Psychiatry, Therapy, ABA
- State: Georgia
- Payers: Georgia Medicaid, TRICARE East, BCBS of Georgia, Aetna, UnitedHealthcare
- Core denial story: credentialing gap / PR-170 style issues
- Dataset size: 300 synthetic claims

## Files
- `public/index.html`
- `src/index.js`
- `src/index.css`
- `src/App.js`
- `src/data/claims.js`
- `src/components/OverviewPage.js`
- `src/components/DenialPatternsPage.js`
- `src/components/PayerPage.js`
- `src/components/ProviderPage.js`
- `src/components/ClaimsLogPage.js`
- `src/components/PlanPage.js`
- `src/components/utils.js`

## Local setup
1. Install Node.js LTS.
2. Open a terminal in this folder.
3. Run `npm install`.
4. Run `npm start`.
5. Open the local URL shown in the terminal.

## Deploy to GitHub + Vercel
1. Create a new GitHub repository.
2. Upload all files from this folder.
3. In Vercel, choose **Add New Project**.
4. Import the GitHub repository.
5. Framework preset: **Create React App**.
6. Build command: `npm run build`
7. Output directory: `build`
8. Deploy.

## Notes
This project is intentionally simple and dependency-light so it is easy to edit.
