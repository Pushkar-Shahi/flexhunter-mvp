# FlexHunter MVP - Deployment & Submission Guide

This guide walks you through publishing your GitHub repository, deploying your live link, and recording the 2-minute demo.

---

## 1. Push to GitHub (Regular Commits Already Staged)

Your local repository already has clean, progressive commits for each feature:
- `docs: add product brief, build log, paper wireframe sketches, and mvp specification`
- `feat: scaffold React 18 + Vite app with Tailwind CSS and student job seed data`
- `feat: implement strict remote/part-time filter (Feature 1) and college schedule matcher (Feature 2)`
- `feat: implement upfront commitment cards (Feature 3) and application pipeline CRM (Feature 4)`
- `docs: update build log with progressive feature sessions and verification details`

To push to your GitHub account:
1. Create a new empty repository on [GitHub](https://github.com/new) named `flexhunter-mvp`.
2. In your terminal, run:
```bash
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/flexhunter-mvp.git
git push -u origin main
```

---

## 2. Deploy to a Free Live Host (Vercel or Netlify)

### Option A: 1-Click Deploy via Vercel (Recommended)
1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account.
2. Click **"Add New Project"** and select `flexhunter-mvp`.
3. In the project configuration:
   - **Root Directory**: Click "Edit" and choose `app`.
   - **Framework Preset**: Vite (detected automatically).
4. Click **Deploy**. In under 45 seconds, you will receive a live URL (e.g. `https://flexhunter-mvp.vercel.app`) that works on both phones and desktops!

### Option B: Deploy via Vercel CLI Directly
Run inside `./app`:
```bash
cd app
npx vercel
```
Follow the prompt (default settings), and your live link is instantly live.

---

## 3. 2-Minute Screen-Recorded Demo Checklist

When recording your video (using QuickTime Player, Loom, or phone camera):
1. **0:00 - 0:30 (Problem & Filter)**: Open the live URL. Explain: *"College students with morning lectures struggle with full-time offline roles. Here, the strict Remote and Part-Time filters eliminate all 40h conflicts."*
2. **0:30 - 1:00 (Schedule Matcher)**: Change class availability to *"Morning Classes (Free after 1 PM)"* and set bandwidth slider to 12 hrs/week. Show how cards dynamically update with green match badges.
3. **1:00 - 1:30 (Upfront Decision Cards & Modal)**: Click *"Inspect & Apply"* on a role. Show the Schedule Compatibility verification and the pre-written application note.
4. **1:30 - 2:00 (Application Pipeline CRM)**: Click *"Apply & Track in Pipeline"*. Switch to the *"My Pipeline"* tab to demonstrate the Kanban board and the *"Follow-up in 5 days"* reminder. Refresh the browser to prove persistence.

---

## 4. Final Submission Checklist

- [ ] **Live link to the MVP** (from Vercel / Netlify)
- [ ] **GitHub repository link** with the regular feature commits
- [ ] **2-minute screen-recorded demo**
- [ ] **Product Brief & Implementation Plan**: [`PRODUCT_BRIEF.md`](file:///Users/shahi/Desktop/Learn/Product%20Development%20/PRODUCT_BRIEF.md) and [`mvp_implementation_plan.md`](file:///Users/shahi/.gemini/antigravity/brain/7a44b73e-1787-47fa-9817-75a8231d223e/mvp_implementation_plan.md)
- [ ] **Build Log**: [`BUILD_LOG.md`](file:///Users/shahi/Desktop/Learn/Product%20Development%20/BUILD_LOG.md)
- [ ] **Feature Checklist**: Included in the Walkthrough and Build Log (all 4 Must-haves marked DONE)
