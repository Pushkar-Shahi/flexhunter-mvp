# FlexHunter MVP — Feature Checklist (MoSCoW Prioritization)

This document tracks every feature brainstormed against direct student user interview evidence (Tanmay, MSOT Student), marking each feature as **DONE**, **PARTIAL**, or **CUT** with an explicit rationale.

---

## 1. Must-Have Features (Core MVP)

| # | Feature | Interview Evidence Link | Status | Rationale & Implementation Details |
|---|---|---|---|---|
| 1 | **Strict Remote & Part-Time Filter** | *"They were full time and expected me offline... It should be part time."* | **DONE** | Hard filters for `Remote Only`, `Part-Time (<15h/wk)`, and `Weekend Only`. Completely excludes 40h/week and offline clashes across both the settings screen and discovery feed. |
| 2 | **College Schedule Matcher** | *"The hardest part was to find an internship that goes parallel with my college."* | **DONE** | Built interactive 8 AM – 7 PM timetable matrix for Monday–Sunday blocking out lectures (`Calculus`, `Economics`, `Physics Lab`, `Statistics`) with a live `68 free hrs / week` counter. Flags conflicts directly on job inspection. |
| 3 | **Upfront Time-Commitment Card** | *"If I could wave a magic wand I would wish for flexible workers."* | **DONE** | Outer card displays stipend (`₹10k / mo`), mode (`Remote`), weekly hours (`12–20 hrs/wk`), and circular match badge ($92\%$) before clicking. Right inspection panel displays pros and schedule warnings. |
| 4 | **Basic Application Tracker (CRM)** | *"...across that whole journey from finding the role to applying to waiting for feedback..."* | **DONE** | 5-column Kanban pipeline (`Saved`, `Applied`, `Screening / Interview`, `Offers`, `Rejected / Ghosted`) with local persistence, stage progression (`Move →`), and urgent follow-up timer pills (`Follow-up due in 2 days`). |

---

## 2. Should-Have Features (V2 / Iterations)

| # | Feature | Status | Rationale & Implementation Details |
|---|---|---|---|
| 5 | **Automated Follow-Up Reminders** | **DONE** | Color-coded alert badges (`Follow-up due in 2 days`, `Offer expires in 5 days`, `No reply: 6 days`) integrated into cards. |
| 6 | **In-Browser Form Auto-Filler** | **DONE** | Built interactive 380px Chrome Extension simulation over `internshala.com` with 1-click autofill and CRM sync. |
| 7 | **AI Resume Match Score** | **DONE** | Implemented circular percentage score ($92\%$, $89\%$, $86\%$) and dedicated 94/100 Student ATS meter in Resume Studio. |
| 8 | **Minimum Stipend Filter** | **DONE** | Built `Stipend Required` toggle to skip unpaid roles, plus purple badge accents for stipend visibility. |
| 9 | **Direct Email Generator** | **DONE** | Built `EmailDraftModal.jsx`: Generates 3-paragraph tailored outreach note referencing student afternoon schedule with 1-click clipboard copy. |

---

## 3. Could-Have Features (Nice Extras)

| # | Feature | Status | Rationale & Implementation Details |
|---|---|---|---|
| 10 | **Dark Mode Theme Toggle** | **DONE** | Added universal Sun/Moon toggle in TopBar with deep slate palette across all 5 views and modals. |
| 11 | **Drag-and-Drop / Stage Movement** | **DONE** | Built `Move →` stage advance buttons on all Kanban cards and drag-indicator handles. |
| 12 | **Dedicated Saved Jobs Collection** | **DONE** | Built `SavedJobsView.jsx` grid with direct "Apply via Extension" triggers. |
| 13 | **AI Application Pitch Generator** | **DONE** | Built in `ResumeStudioView.jsx` for Graphic Design, Content Marketing, and Frontend roles. |
| 14 | **Telegram / WhatsApp Alerts** | **CUT** | Cut from MVP scope to keep product zero-API-key and zero-backend dependent. |
| 15 | **Exam Blackout Mode** | **CUT** | Cut for initial validation; lecture matrix blocking handles schedule constraints. |

---

## 4. Won't-Have Features (Parked on Purpose)

| # | Feature | Status | Rationale |
|---|---|---|---|
| 16 | **Employer Job-Posting Portal** | **CUT** | Aggregating verified student listings; two-sided marketplace introduces unnecessary chicken-and-egg complexity. |
| 17 | **AI Mock Video Interviews** | **CUT** | Out of scope for MVP; primary student friction was schedule clash and ghosting, not interview performance. |
| 18 | **In-App Direct Recruiter Chat** | **CUT** | Direct email and external extension autofill fit existing student behavior better. |
| 19 | **Stipend Negotiation Simulator** | **CUT** | Entry-level student internships have fixed stipends; low validation priority. |
