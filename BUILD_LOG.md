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
* **Outcome**: Implementation Plan approved by user.

---

## Session 1: Project Scaffolding & Seed Data (Phase 0)
* **Prompt**: "proceed"
* **Date**: 2026-11-10
* **What Worked**:
  - Created `./app` directory with React 18, Vite 6, Tailwind CSS 3, and Lucide Icons.
  - Initialized `app/src/data/jobs.js` with realistic internship listings across Marketing, Graphic Design, and UI/UX.
* **Outcome**: Clean build environment established. Git commit `f98b9a3`.

---

## Session 2: Feature 1 & Feature 2 (FilterBar & ScheduleSelector)
* **Date**: 2026-11-10
* **What Worked**:
  - Built `FilterBar.jsx` with strict toggle pills: `[Remote Only]` and `[Part-Time (<15h/wk)]`.
  - Built `ScheduleSelector.jsx` with an interactive bandwidth slider (5h–30h/wk) and quick class schedule chips.
* **Outcome**: Git commit `385470d`.

---

## Session 3: Feature 3 & Feature 4 (JobCards, Modal & CRM Pipeline)
* **Date**: 2026-11-10
* **What Worked**:
  - Built `JobCard.jsx`, `JobDetailModal.jsx`, and `KanbanBoard.jsx`.
  - Wired `localStorage` persistence.
* **Outcome**: Git commit `518852b`.

---

## Session 4: Figma Wireframe Alignment (cUSqziKBG0hMgspxI9M1vs)
* **Prompt**: "here make mvp using this figma wireframe" & prototype link node-id=1-4.
* **Date**: 2026-11-10
* **What Worked**:
  - Built 240px light wireframe sidebar matching the low-fi prototype.
  - Built weekly schedule matrix (8 AM–7 PM) with college lecture blocks.
  - Rebuilt Match Feed with split-pane layout (40% left cards, 60% sticky inspection panel).
  - Built 5-column Kanban board and 380px Chrome extension simulation overlay.
* **Outcome**: Git commit `ada957f`.

---

## Session 5: Color-Coding & Actionable Email Generator (/grill-me)
* **Prompt**: "can u think we can imporve in it also can u colour code it /grill-me"
* **Date**: 2026-11-10
* **What Worked**:
  - Implemented **Functional Semantic Accents**: Emerald Green for match/availability, Amber for follow-up timers, Blue for primary actions, Purple for stipends.
  - Built **Actionable Follow-Up Email Generator** (`EmailDraftModal.jsx`): Clicking "Draft Follow-Up Email" generates a tailored email with 1-click clipboard copy.
* **Outcome**: Git commit `b53de18`.

---

## Session 6: Fixing Missing Saved Jobs & Resume Studio Views
* **Prompt**: "saved jobs and resume not working" (with screenshots)
* **Date**: 2026-11-10
* **What Broke**:
  - Clicking "Resume Studio" in the sidebar left the main canvas blank because no view component was rendered for `activeView === 'resume'`.
  - Clicking "Saved Jobs" rerouted to the entire 5-column Kanban board instead of a dedicated saved collection.
* **How It Was Fixed**:
  - Built `ResumeStudioView.jsx`: Features the uploaded `resume_2026.pdf` file card, a 94/100 student ATS score meter, extracted skills management, and an AI Application Pitch Generator with 1-click copy.
  - Built `SavedJobsView.jsx`: Dedicated grid for all bookmarked jobs with status badges, direct "Apply via Extension" triggers, and delete actions.
  - Updated `Sidebar.jsx` and `App.jsx` to route both tabs directly.
* **Verification**:
  - `npm run build`: Success in 1.50s (0 errors).
  - Tested both views live via browser screenshots (`resume_studio_screenshot.png` and `saved_jobs_screenshot.png`).
* **Outcome**: Both views fully operational. Git commit `c14f17c`.

---

## Session 7: Full Dark Mode Implementation
* **Prompt**: "we need a dark mode too"
* **Date**: 2026-11-10
* **What Worked**:
  - Configured `darkMode: 'class'` in `app/tailwind.config.js`.
  - Added theme state (`'light' | 'dark'`) and sync with `localStorage` and `document.documentElement.classList` in `App.jsx`.
  - Added a dedicated Sun / Moon theme toggle button in `TopBar.jsx`.
  - Applied cohesive dark palettes (`bg-slate-900`, `bg-slate-950`, `border-slate-800`, `text-slate-100`) across all 5 views and modals:
    1. `ProfileAvailabilityView.jsx` (Constraints, lecture matrix, and skills upload)
    2. `MatchFeedView.jsx` (Split-feed, circular match badges, AI breakdown panel)
    3. `ApplicationTrackerView.jsx` (5-column Kanban board, cards, and urgency pills)
    4. `ExtensionSimulationView.jsx` (Simulated browser frame and 380px extension sidebar)
    5. `SavedJobsView.jsx` (Saved card collection and actions)
    6. `ResumeStudioView.jsx` (ATS meter, skills cloud, and tailored pitch generator)
    7. `EmailDraftModal.jsx` (Follow-up email generator overlay)
* **Verification**:
  - `npm run build`: Compiled production bundle in 1.46s with 0 errors.
  - Headless Chrome testing captured 7 high-resolution screenshots across all screens verifying theme contrast and aesthetic fidelity.
* **Outcome**: Full dark mode operational. Git commit `44d449f`.
