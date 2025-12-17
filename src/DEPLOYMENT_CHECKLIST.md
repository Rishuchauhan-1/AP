# ✅ AiPedia Deployment Checklist

Print this out or keep it open while deploying!

---

## 📥 PART 1: Download from Figma Make

- [ ] Looked for Export/Download button in Figma Make
- [ ] Downloaded project as ZIP file
- [ ] Saved ZIP to Desktop or Downloads folder
- [ ] Extracted/Unzipped the file
- [ ] Can see `aipedia` folder with files inside
- [ ] Can see `App.tsx`, `package.json`, `components` folder

---

## 🏗️ PART 2: GitHub Account & Repository

- [ ] Have GitHub account (or created new one at github.com)
- [ ] Logged into GitHub
- [ ] Clicked "+" → "New repository"
- [ ] Named repository: `aipedia`
- [ ] Selected "Public"
- [ ] Did NOT check "Add README"
- [ ] Did NOT select any .gitignore template
- [ ] Did NOT select any license
- [ ] Clicked "Create repository"
- [ ] Copied the repository URL (https://github.com/YOUR_USERNAME/aipedia.git)

---

## 💻 PART 3: Install Required Software

- [ ] Installed Git (https://git-scm.com/downloads)
  - Verify: Open terminal, type `git --version`
- [ ] Installed Node.js (https://nodejs.org/)
  - Verify: Open terminal, type `node --version`

---

## 📤 PART 4: Push Code to GitHub

- [ ] Opened terminal/command prompt in project folder
  - Windows: File Explorer → aipedia folder → address bar → type `cmd`
  - Mac: Right-click aipedia folder → "New Terminal at Folder"

- [ ] Verified I'm in correct folder
  - Ran: `dir` (Windows) or `ls` (Mac/Linux)
  - Can see: App.tsx, package.json, components, etc.

- [ ] Ran command 1: `git init`
  - Saw: "Initialized empty Git repository"

- [ ] Ran command 2: `git add .`
  - No error message = success

- [ ] Ran command 3: `git commit -m "Initial commit: AiPedia with 500+ AI tools"`
  - Saw: List of files committed

- [ ] Ran command 4: `git remote add origin https://github.com/YOUR_USERNAME/aipedia.git`
  - Replaced YOUR_USERNAME with my actual GitHub username
  - No error message = success

- [ ] Ran command 5: `git branch -M main`
  - No error message = success

- [ ] Ran command 6: `git push -u origin main`
  - Entered GitHub username when asked
  - Entered Personal Access Token as password (not GitHub password)
  - Saw: "Branch 'main' set up to track remote branch"

- [ ] Verified upload: Opened https://github.com/YOUR_USERNAME/aipedia in browser
  - Can see all files listed
  - Can see: App.tsx, components, data, styles, etc.

---

## 🔐 PART 5: GitHub Personal Access Token (if needed)

If git asked for password:

- [ ] Went to: https://github.com/settings/tokens
- [ ] Clicked "Generate new token" → "Generate new token (classic)"
- [ ] Named token: "AiPedia Deployment"
- [ ] Selected expiration duration
- [ ] Checked: ✅ repo (all sub-items)
- [ ] Checked: ✅ workflow
- [ ] Clicked "Generate token"
- [ ] Copied the token (saved it somewhere safe)
- [ ] Used token as password when git asked

---

## 🔧 PART 6: Configure Supabase Secrets

- [ ] Opened my Supabase dashboard: https://supabase.com/dashboard
- [ ] Selected my project
- [ ] Went to: Settings → API
- [ ] Copied "Project URL" (https://xxxxx.supabase.co)
- [ ] Copied "anon public" key (starts with eyJ...)

**Add to GitHub:**

- [ ] Went to GitHub repository: https://github.com/YOUR_USERNAME/aipedia
- [ ] Clicked "Settings" tab
- [ ] Clicked "Secrets and variables" in left sidebar
- [ ] Clicked "Actions"
- [ ] Clicked "New repository secret"

**First Secret:**
- [ ] Name: `VITE_SUPABASE_URL`
- [ ] Secret: Pasted my Supabase Project URL
- [ ] Clicked "Add secret"

**Second Secret:**
- [ ] Clicked "New repository secret" again
- [ ] Name: `VITE_SUPABASE_ANON_KEY`
- [ ] Secret: Pasted my Supabase anon public key
- [ ] Clicked "Add secret"

- [ ] Verified: Can see both secrets listed (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY)

---

## 🌐 PART 7: Enable GitHub Pages

- [ ] In repository Settings, scrolled down left sidebar
- [ ] Clicked "Pages"
- [ ] Under "Build and deployment"
- [ ] Source: Selected "GitHub Actions" from dropdown
- [ ] Saw confirmation message about GitHub Actions

---

## 🚀 PART 8: Deploy the Website

- [ ] Clicked "Actions" tab at top of repository
- [ ] Checked if workflow is already running (yellow circle 🟡)

If no workflow running:
- [ ] Clicked "Deploy to GitHub Pages" in left sidebar
- [ ] Clicked "Run workflow" button (right side)
- [ ] Clicked green "Run workflow" button in dropdown
- [ ] Saw new workflow appear in list

**Monitoring Deployment:**
- [ ] Clicked on the running workflow
- [ ] Watched progress of "build" job
- [ ] Waited for "build" to show ✅ green checkmark
- [ ] Watched progress of "deploy" job
- [ ] Waited for "deploy" to show ✅ green checkmark

**Deployment Time:** ⏱️ Started at: ___:___ | Finished at: ___:___

---

## 🎉 PART 9: Access Your Live Website

- [ ] Deployment shows ✅ green checkmarks (both build and deploy)
- [ ] Waited extra 2-3 minutes for DNS propagation
- [ ] Opened browser
- [ ] Went to: `https://YOUR_USERNAME.github.io/aipedia/`
  - Replaced YOUR_USERNAME with my actual GitHub username
- [ ] Website loaded successfully! 🎉

**My Live Website URL:** 
```
https://________________________.github.io/aipedia/
```

---

## ✨ PART 10: Test Website Features

- [ ] Homepage loads correctly
- [ ] Can see "500+ AI Tools" mentioned
- [ ] Navigation bar visible (Home, AI Tools, About Us, Contact Us)
- [ ] Clicked "AI Tools" → Tools page loads
- [ ] Can see AI tools listed
- [ ] Search functionality works
- [ ] Category filters work
- [ ] Clicked "About Us" → About page loads
  - Shows: Ritesh Thakur and Rishu Kumar
- [ ] Clicked "Contact Us" → Contact page loads
  - Shows: ritesh_2503mc03@iitp.ac.in
  - Shows: rishu_2503ct03@iitp.ac.in
- [ ] Chatbot "Foi" appears and works
- [ ] Website is responsive on mobile (tested with browser DevTools)

---

## 📱 PART 11: Share Your Website

- [ ] Copied my website URL
- [ ] Shared on social media
- [ ] Added to my resume
- [ ] Emailed to friends/colleagues
- [ ] Posted in relevant communities

---

## 🔄 PART 12: How to Update Later (Save for Future)

When I want to update my website:

**Step 1: Make Changes**
- [ ] Edited files in my local project folder
- [ ] Saved all changes

**Step 2: Push Updates**
- [ ] Opened terminal in project folder
- [ ] Ran: `git add .`
- [ ] Ran: `git commit -m "Description of changes"`
- [ ] Ran: `git push`
- [ ] Waited 2-5 minutes for automatic redeployment

**Step 3: Verify**
- [ ] Checked Actions tab for green checkmark
- [ ] Refreshed website to see updates

---

## ✅ FINAL VERIFICATION

- [ ] Website is live and accessible
- [ ] All pages work correctly
- [ ] All features functional
- [ ] Shared with others
- [ ] Saved website URL
- [ ] Saved GitHub repository URL
- [ ] Bookmarked website
- [ ] Added to portfolio

---

## 🏆 SUCCESS METRICS

- **Total Time Taken:** _____ minutes
- **Issues Encountered:** _____
- **Final Website URL:** https://________________________.github.io/aipedia/
- **Deployment Date:** ___/___/______

---

## 📧 SUPPORT

If any step fails, contact:

- **Ritesh Thakur**: ritesh_2503mc03@iitp.ac.in
- **Rishu Kumar**: rishu_2503ct03@iitp.ac.in

---

## 🎊 CONGRATULATIONS!

You've successfully deployed **AiPedia** with **500+ AI Tools** to the internet!

**Share your achievement! 🎉**

---

**Date Completed:** ___/___/______

**Signature:** ________________

---

*Keep this checklist for future reference and for deploying other projects!*
