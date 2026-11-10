# Product Brief: FlexHunter MVP

## 1. One-Line MVP Scope Statement
> **"My MVP lets college students discover and track verified remote, part-time internships matching their class schedules so that they gain career experience without compromising their studies. It will not include employer job-posting accounts, in-app recruiter messaging, or automated video interview prep."**

---

## 2. Target User & Core Problem
* **User Persona**: College students (like Tanmay at MSOT) with fixed daily lectures (e.g., mornings until 1:00 PM) who want practical career experience in marketing, design, or tech.
* **Problem**: Mainstream job platforms (Internshala, LinkedIn, Indeed) flood students with rigid 40 hr/week or mandatory in-person offline internships that conflict with college attendance policies. There is no simple way to filter roles strictly by hourly bandwidth and lecture compatibility.

---

## 3. User Journey (6 Steps)
1. **Trigger**: Student needs an internship that fits around morning college classes.
2. **Availability Setup**: Student sets hard preferences: `Remote Only`, `Max 15 hrs/week`, and blocks out morning class hours.
3. **Curated Discovery**: Feed displays verified remote, part-time opportunities with upfront hourly commitments matching the student's free afternoon/weekend blocks.
4. **Schedule Verification**: Student opens a role card and reviews the **Schedule Compatibility breakdown** confirming daily asynchronous expectations with no offline conflicts.
5. **Application**: Student applies directly using a tailored note highlighting their portfolio and weekly afternoon availability.
6. **Pipeline Tracking**: Role is logged into the student's personal Kanban CRM (`Applied` column with a 5-day follow-up reminder).

---

## 4. The 4 Must-Have Features (Strictly Scoped)
1. **Feature 1: Strict Remote & Part-Time Filtering**: Hard toggle eliminating 40h/week full-time and offline jobs.
2. **Feature 2: College Schedule Matcher**: Interactive availability grid/selector that flags or hides roles requiring conflicting hours.
3. **Feature 3: Upfront Time-Commitment Cards**: Displays weekly hours, daily time expectations, and stipend directly on the card before clicking.
4. **Feature 4: Basic Application Tracker (CRM)**: Multi-stage pipeline board (`Saved`, `Applied`, `Interview`, `Follow-up`) with persistent local storage.

---

## 5. Wireframe References
* **Figma Clickable Prototype**: [https://www.figma.com/design/cUSqziKBG0hMgspxI9M1vs](https://www.figma.com/design/cUSqziKBG0hMgspxI9M1vs)
* **Paper Prototype**: Saved locally at `photo.jpg` (showing v1 rejected and v2 approved design).

---

## 6. Technology Stack Choice
* **Frontend Framework**: React 18 + Vite (fast build, instant HMR, standard modern web app).
* **Styling**: Tailwind CSS (clean, responsive, matches low-fidelity wireframe look).
* **Icons**: Lucide-React.
* **Data Persistence**: `localStorage` with initial seed database of realistic, verified student internships (zero backend friction, instant mobile & desktop responsiveness, 100% free, ready to deploy to Vercel/Netlify).
* **Deployment Target**: Vercel / Netlify / GitHub Pages.
