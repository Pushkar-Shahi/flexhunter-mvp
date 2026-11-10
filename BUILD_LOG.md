# FlexHunter MVP - Build Log

This build log documents every step of development, tracking prompts used, what worked, what broke, and how it was resolved.

---

## Session 0: Setup, Product Brief & Implementation Planning
* **Prompt**: User requested MVP implementation based on product brainstorm and wireframes.
* **Date**: 2026-11-10
* **What Worked**: 
  - Validated Node.js v26.8.2 and npm 11.19.1 installed on macOS.
  - Finalized 1-page `PRODUCT_BRIEF.md` with 1-line scope, 6-step journey, and 4 Must-Haves.
  - Generated detailed implementation plan artifact for user approval.
* **What Broke / Challenges**:
  - Node and npm were initially not in default PATH (`/opt/homebrew/bin`); configured execution scripts to ensure homebrew bin is included.
* **Outcome**: Implementation Plan approved by user.

---

## Session 1: Project Scaffolding & Seed Data (Phase 0)
* **Prompt**: "proceed"
* **Date**: 2026-11-10
* **What Worked**:
  - Created `./app` directory with React 18, Vite 6, Tailwind CSS 3, and Lucide Icons.
  - Initialized `app/src/data/jobs.js` with realistic internship listings across Marketing, Graphic Design, and UI/UX, explicitly featuring hourly bandwidths (10h, 12h, 15h, 25h, 40h) and schedule requirements.
* **What Broke / Challenges**:
  - `npm create vite` prompted for interactive terminal confirmation. Resolved by writing clean deterministic configuration files (`package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`) and running `npm install` directly.
* **Outcome**: Clean build environment established. Git commit `f98b9a3`.

---

## Session 2: Feature 1 & Feature 2 (FilterBar & ScheduleSelector)
* **Date**: 2026-11-10
* **What Worked**:
  - Built `FilterBar.jsx` with strict toggle pills: `[Remote Only]` and `[Part-Time (<15h/wk)]`.
  - Built `ScheduleSelector.jsx` with an interactive bandwidth slider (5h–30h/wk) and quick class schedule chips (e.g., *Free Afternoons after 1 PM*, matching Tanmay's interview profile).
  - Toggling filters immediately excludes full-time 40h and offline roles from the feed.
* **Outcome**: Git commit `385470d`.

---

## Session 3: Feature 3 & Feature 4 (JobCards, Modal & CRM Pipeline)
* **Date**: 2026-11-10
* **What Worked**:
  - Built `JobCard.jsx` displaying upfront decision badges (`100% Remote`, `12 hrs/wk`, `~2 hrs/day flexible`, `₹9,000/mo`) and college schedule compatibility badges.
  - Built `JobDetailModal.jsx` featuring the schedule fit breakdown and an automated pre-tailored application note generator.
  - Built `KanbanBoard.jsx` with 4 status columns (`Saved`, `Applied`, `Interviewing`, `Offers Received`) with automated 5-day follow-up reminder indicators.
  - Wired `localStorage` persistence in `App.jsx` so applications and filter settings survive browser refreshes.
* **Verification & Testing**:
  - Executed `npm run build`: Success in 1.45s (0 errors).
  - Launched background Vite server on `http://127.0.0.1:5175/`: HTTP 200 OK verified.
  - Captured live browser screenshot: `app_live_screenshot.png`.
* **Outcome**: Full MVP completed and verified. Git commit `518852b`.
