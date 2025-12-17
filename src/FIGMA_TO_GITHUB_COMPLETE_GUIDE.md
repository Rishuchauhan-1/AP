# 🚀 Complete Guide: Deploy AiPedia from Figma Make to GitHub

## 📍 Current Situation
✅ Your AiPedia project is in **Figma Make** (web-based)  
✅ All code files are ready (500+ AI tools database)  
✅ Configuration files created for GitHub deployment  
❌ Not yet on your computer  
❌ Not yet on GitHub  

---

## 🎯 Goal
Get your website live at: `https://YOUR_USERNAME.github.io/aipedia/`

---

## 📋 Complete Step-by-Step Process

### **PART 1: Download from Figma Make to Your Computer**

#### Option A: Using Figma Make Export (Easiest - 5 minutes)

1. **Look for Export Button in Figma Make**
   - Check top-right corner of Figma Make
   - Look for buttons like:
     - "Download Project" 📥
     - "Export" 📦
     - "Download as ZIP" 🗜️
     - Three dots menu (⋮) → Export

2. **Download the Project**
   - Click the export/download button
   - Choose "Download as ZIP" or "Export Project"
   - Save to your **Desktop** or **Downloads** folder

3. **Extract the ZIP File**
   - **Windows**: Right-click ZIP → "Extract All..." → Choose Desktop → Extract
   - **Mac**: Double-click ZIP file → It auto-extracts
   - You now have a folder called `aipedia` (or similar name)

4. **✅ Done with Part 1!** Your project is now on your computer.

---

#### Option B: Manual Copy (If No Export Button - 30-60 minutes)

If you don't see an export button, you'll need to manually download the code:

**Prerequisites:**
- Install **Node.js**: https://nodejs.org/ (choose LTS version)
- Install **VS Code**: https://code.visualstudio.com/
- Install **Git**: https://git-scm.com/

**Steps:**

1. **Create Project Folder**
   - Open Desktop
   - Create new folder named `aipedia`

2. **Open VS Code**
   - Launch VS Code
   - File → Open Folder
   - Select the `aipedia` folder

3. **Copy Essential Files from Figma Make**
   
   Copy these files in this order (most important first):

   **Configuration Files:**
   - `package.json` ⭐ CRITICAL
   - `vite.config.ts` ⭐ CRITICAL
   - `.gitignore` ⭐ CRITICAL
   - `index.html` ⭐ CRITICAL
   - `main.tsx` ⭐ CRITICAL
   - `README.md`

   **Main Files:**
   - `App.tsx` ⭐ CRITICAL
   - `data/tools.ts` ⭐ CRITICAL (your 500+ tools!)

   **Components (create `components` folder first):**
   - `components/HomePage.tsx`
   - `components/ToolsPage.tsx`
   - `components/AboutPage.tsx`
   - `components/ContactPage.tsx`
   - `components/Header.tsx`
   - `components/Footer.tsx`
   - `components/Chatbot.tsx`
   - `components/AuthModal.tsx`
   - All other component files...

   **Other Folders:**
   - `styles/globals.css`
   - `utils/auth.tsx`
   - `utils/supabase/client.tsx`
   - `utils/supabase/info.tsx`
   - `types/index.ts`

   **GitHub Workflow (create `.github/workflows` folders first):**
   - `.github/workflows/deploy.yml` ⭐ CRITICAL

4. **How to Copy Each File:**
   - In Figma Make: Click file → Select all (`Ctrl+A`) → Copy (`Ctrl+C`)
   - In VS Code: Create new file → Paste (`Ctrl+V`) → Save (`Ctrl+S`)

5. **✅ Done with Part 1!** All files copied to your computer.

---

### **PART 2: Upload to GitHub (10 minutes)**

#### Step 1: Create GitHub Account (if you don't have one)
- Go to https://github.com
- Click "Sign up"
- Follow the registration process

#### Step 2: Create New Repository
1. Log in to GitHub
2. Click **"+"** (top-right) → **"New repository"**
3. **Repository name**: `aipedia`
4. **Description**: "AiPedia - Comprehensive directory of 500+ AI tools"
5. **Public** (required for free GitHub Pages)
6. ❌ **DO NOT** check "Add a README file"
7. ❌ **DO NOT** select any .gitignore template
8. ❌ **DO NOT** choose a license
9. Click **"Create repository"**
10. **Copy the repository URL** (looks like: `https://github.com/YOUR_USERNAME/aipedia.git`)

#### Step 3: Open Terminal in Project Folder

**Windows Method 1 (Easiest):**
1. Open File Explorer
2. Navigate to your `aipedia` folder (where you can see App.tsx, package.json, etc.)
3. Click the **address bar** at the top
4. Type `cmd` and press Enter
5. ✅ Command Prompt opens in your project folder!

**Windows Method 2:**
1. Press `Windows + R`
2. Type `cmd` and press Enter
3. Type: `cd Desktop\aipedia` (adjust path if needed)
4. Press Enter

**Mac:**
1. Open Terminal (Cmd + Space, type "Terminal")
2. Type: `cd ~/Desktop/aipedia` (adjust path if needed)
3. Press Enter

**Verify you're in the right folder:**
```bash
dir         # Windows
ls          # Mac/Linux
```
You should see: App.tsx, package.json, components, etc.

#### Step 4: Push Code to GitHub

**Copy and paste these commands ONE BY ONE:**

```bash
# 1. Initialize Git
git init
```
Press Enter. Wait for: "Initialized empty Git repository"

```bash
# 2. Add all files
git add .
```
Press Enter. (No output is normal)

```bash
# 3. Create first commit
git commit -m "Initial commit: AiPedia with 500+ AI tools"
```
Press Enter. You'll see list of files committed.

```bash
# 4. Add GitHub remote (REPLACE YOUR_USERNAME!)
git remote add origin https://github.com/YOUR_USERNAME/aipedia.git
```
⚠️ **IMPORTANT**: Replace `YOUR_USERNAME` with your actual GitHub username!

```bash
# 5. Rename branch to main
git branch -M main
```
Press Enter.

```bash
# 6. Push to GitHub
git push -u origin main
```

**If it asks for credentials:**
- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (not your GitHub password)

**How to create Personal Access Token:**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name: `AiPedia Deployment`
4. Expiration: Choose duration (or "No expiration")
5. Select scopes:
   - ✅ `repo` (all checkboxes)
   - ✅ `workflow`
6. Click "Generate token"
7. **COPY THE TOKEN** (you won't see it again!)
8. Paste as password when git asks

#### Step 5: Verify Upload
1. Go to: `https://github.com/YOUR_USERNAME/aipedia`
2. You should see all your files! ✅

---

### **PART 3: Configure GitHub Pages (5 minutes)**

#### Step 1: Add Supabase Secrets
1. On your GitHub repository page, click **"Settings"** tab
2. Left sidebar: **"Secrets and variables"** → **"Actions"**
3. Click **"New repository secret"**

**Add First Secret:**
- Name: `VITE_SUPABASE_URL`
- Secret: Your Supabase project URL
  - Get from: https://supabase.com/dashboard → Your Project → Settings → API
  - Format: `https://xxxxxxxxxxxxx.supabase.co`
- Click "Add secret"

**Add Second Secret:**
- Click "New repository secret" again
- Name: `VITE_SUPABASE_ANON_KEY`
- Secret: Your Supabase anonymous key
  - Same location: Settings → API → `anon` `public` key
  - Long string starting with `eyJ...`
- Click "Add secret"

#### Step 2: Enable GitHub Pages
1. Still in **"Settings"**, scroll down left sidebar
2. Click **"Pages"**
3. Under **"Build and deployment"**:
   - Source: Select **"GitHub Actions"**
4. ✅ Done! (no need to click Save)

#### Step 3: Trigger Deployment
1. Click **"Actions"** tab (top of repository)
2. You might see a workflow already running (yellow dot 🟡)
3. If not: Click "Deploy to GitHub Pages" → "Run workflow" → "Run workflow" button

#### Step 4: Wait for Deployment (5-10 minutes)
1. Stay on **Actions** tab
2. Watch the progress:
   - 🟡 Yellow = Running
   - ✅ Green = Success
   - ❌ Red = Failed (check error logs)
3. Both "build" and "deploy" jobs must show ✅

---

### **PART 4: Access Your Live Website! 🎉**

Your website is now live at:
```
https://YOUR_USERNAME.github.io/aipedia/
```

**Replace `YOUR_USERNAME` with your GitHub username!**

Example:
- If your username is `ritesh123`, your site is at:
- `https://ritesh123.github.io/aipedia/`

---

## 🔄 How to Update Your Website Later

Whenever you make changes:

```bash
# 1. Make your code changes in VS Code

# 2. Add changes
git add .

# 3. Commit
git commit -m "Updated AI tools database"

# 4. Push to GitHub
git push

# GitHub automatically rebuilds and deploys! (2-5 minutes)
```

---

## ✅ Quick Checklist

### Part 1: Download
- [ ] Found export button in Figma Make OR
- [ ] Manually copied all essential files to computer
- [ ] Project folder exists on Desktop
- [ ] Can see App.tsx, package.json, etc. in folder

### Part 2: GitHub Upload
- [ ] Created GitHub account
- [ ] Created repository named `aipedia`
- [ ] Opened terminal in project folder
- [ ] Ran all 6 git commands successfully
- [ ] Can see files on GitHub repository page

### Part 3: Configuration
- [ ] Added VITE_SUPABASE_URL secret
- [ ] Added VITE_SUPABASE_ANON_KEY secret
- [ ] Set GitHub Pages source to "GitHub Actions"
- [ ] Triggered deployment workflow
- [ ] Deployment shows green checkmark ✅

### Part 4: Success!
- [ ] Website is live at github.io URL
- [ ] Can see homepage with 500+ AI tools
- [ ] Navigation works (Home, AI Tools, About, Contact)
- [ ] Chatbot "Foi" appears

---

## ❓ Troubleshooting

### Issue: Can't find Export button in Figma Make
**Solution**: Look for these alternatives:
- Menu icon (☰ or ⋮) → Download/Export
- File menu → Export Project
- Share button → Download
- If nothing works, use Manual Copy method (Option B)

### Issue: "git: command not found"
**Solution**: Install Git from https://git-scm.com/downloads

### Issue: Git asks for password but it doesn't work
**Solution**: Use Personal Access Token instead:
- Go to https://github.com/settings/tokens
- Generate token with `repo` and `workflow` scopes
- Use token as password

### Issue: Deployment fails (red X in Actions)
**Solution**: Check these:
1. Are both Supabase secrets added correctly?
2. Click on failed workflow → Read error message
3. Common fixes:
   - Re-add Supabase secrets
   - Check `vite.config.ts` base path matches repository name
   - Verify `package.json` has all required dependencies

### Issue: Website shows 404 error
**Solution**:
1. Wait 5-10 minutes (DNS propagation)
2. Check GitHub Pages is enabled (Settings → Pages)
3. Verify deployment succeeded (Actions tab shows ✅)
4. Check URL is correct: `https://USERNAME.github.io/aipedia/`
5. If repository name isn't "aipedia", update `vite.config.ts`

### Issue: Images/styles not loading
**Solution**:
1. Check browser console for errors (F12)
2. Verify `base` in `vite.config.ts` matches repo name
3. Make sure all files were uploaded to GitHub

---

## 📧 Support Contacts

**Created by:**
- **Ritesh Thakur**: ritesh_2503mc03@iitp.ac.in
- **Rishu Kumar**: rishu_2503ct03@iitp.ac.in

---

## 🎉 Congratulations!

Once you complete all steps, your **AiPedia** website with **500+ AI tools** will be live on the internet!

Share it with the world:
```
https://YOUR_USERNAME.github.io/aipedia/
```

---

**Next Steps After Launch:**
- Share on social media
- Add to your resume/portfolio
- Gather user feedback
- Keep adding more AI tools
- Consider custom domain (optional)

Good luck! 🚀
