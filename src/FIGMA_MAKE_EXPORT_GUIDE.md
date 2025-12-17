# 📤 How to Export Your Project from Figma Make

## 🎯 Goal
Download all your AiPedia files from Figma Make to your computer.

---

## 🔍 Method 1: Look for Built-in Export (Check First!)

Figma Make might have a built-in export feature. Let's find it:

### Where to Look:

**1. Top Navigation Bar**
Check the top of Figma Make interface for:
- "File" menu → Look for "Download" or "Export"
- "Share" button → Look for "Download Project"
- Three dots (⋮) menu → Look for "Export"
- Download icon (⬇️)

**2. Right-Click Context Menu**
- Right-click anywhere in the file explorer (left sidebar)
- Look for "Export" or "Download" option

**3. Project Settings**
- Look for Settings icon (⚙️)
- Check for "Export Project" or "Download" option

**4. Bottom Bar**
- Some tools have export options in the bottom toolbar

### If You Find an Export Option:

**Steps:**
1. Click the Export/Download button
2. Choose "Download as ZIP" or "Export Project"
3. Select destination: **Desktop** (easiest to find)
4. Wait for download to complete
5. Go to your Downloads folder or Desktop
6. Find the ZIP file (probably named `aipedia.zip` or similar)
7. **Extract the ZIP**:
   - **Windows**: Right-click → "Extract All..." → Choose Desktop → Extract
   - **Mac**: Double-click the ZIP file (auto-extracts)
8. **✅ Done!** You now have an `aipedia` folder with all your files

**Continue to GitHub upload steps in the main guide.**

---

## 🔍 Method 2: Figma Make Might Support Git Integration

Some web IDEs allow direct Git integration.

### Check for These Features:

**1. Look for Git Icon**
- Check left sidebar for Git icon (looks like a branching tree)
- Or Source Control icon

**2. Look for Terminal**
- Check if Figma Make has a built-in terminal
- Menu → View → Terminal
- Or look for terminal icon

**If you find Git integration or Terminal:**

### Option A: Direct Push (If Git is Available)

If there's a terminal in Figma Make:

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: AiPedia with 500+ AI tools"

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/aipedia.git

# Push to GitHub
git push -u origin main
```

**If this works, you can skip downloading and go straight to GitHub Pages setup!**

### Option B: Clone URL

If Figma Make shows a repository URL or clone URL:
- Copy that URL
- On your computer, open terminal
- Run: `git clone [URL]`
- **✅ Done!** Files downloaded to your computer

---

## 🔍 Method 3: Manual File Download (If No Export Available)

If there's no export button, you'll need to download files manually.

### What You Need:
- Text editor (Notepad, VS Code, Sublime Text, etc.)
- 30-60 minutes of time
- Patience 😊

### Step-by-Step:

#### A. Create Folder Structure

1. **On your Desktop**, create a folder named `aipedia`
2. **Inside aipedia**, create these folders:
   ```
   aipedia/
   ├── .github/
   │   └── workflows/
   ├── components/
   │   └── ui/
   ├── data/
   ├── styles/
   ├── utils/
   │   └── supabase/
   └── types/
   ```

#### B. Download Essential Files (In This Order)

**Priority 1 - Critical Configuration Files:**

1. **`.gitignore`**
   - In Figma Make, click on `.gitignore`
   - Select all (`Ctrl+A` or `Cmd+A`)
   - Copy (`Ctrl+C` or `Cmd+C`)
   - On your computer, create file `.gitignore` in `aipedia` folder
   - Paste and save

2. **`package.json`**
   - Same process as above
   - Save in root `aipedia` folder

3. **`vite.config.ts`**
   - Same process
   - Save in root `aipedia` folder

4. **`index.html`**
   - Same process
   - Save in root `aipedia` folder

5. **`main.tsx`**
   - Same process
   - Save in root `aipedia` folder

6. **`.github/workflows/deploy.yml`**
   - Create folders: `.github` → `workflows`
   - Save `deploy.yml` inside workflows folder

**Priority 2 - Main Application Files:**

7. **`App.tsx`**
   - Save in root `aipedia` folder

8. **`data/tools.ts`**
   - This is your 500+ tools database!
   - Save inside `data` folder

9. **`styles/globals.css`**
   - Save inside `styles` folder

**Priority 3 - Components:**

10. Copy all files from `components/` folder:
    - `HomePage.tsx`
    - `ToolsPage.tsx`
    - `AboutPage.tsx`
    - `ContactPage.tsx`
    - `Header.tsx`
    - `Footer.tsx`
    - `Chatbot.tsx`
    - `AuthModal.tsx`
    - And all other component files...

11. Copy all files from `components/ui/` folder:
    - All the UI component files

**Priority 4 - Utilities:**

12. Copy `utils/` folder contents:
    - `auth.tsx`
    - `supabase/client.tsx`
    - `supabase/info.tsx`

13. Copy `types/index.ts`

**Priority 5 - Other Files:**

14. **`README.md`** - Save in root folder
15. **`GITHUB_DEPLOYMENT_GUIDE.md`** - Save in root folder

#### C. Verify Your Files

After copying, your folder should look like this:

```
aipedia/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── .gitignore
├── package.json
├── vite.config.ts
├── index.html
├── main.tsx
├── App.tsx
├── README.md
├── components/
│   ├── HomePage.tsx
│   ├── ToolsPage.tsx
│   ├── AboutPage.tsx
│   ├── ContactPage.tsx
│   ├── Chatbot.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── AuthModal.tsx
│   ├── figma/
│   │   └── ImageWithFallback.tsx
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       └── ... (all UI components)
├── data/
│   └── tools.ts
├── styles/
│   └── globals.css
├── utils/
│   ├── auth.tsx
│   └── supabase/
│       ├── client.tsx
│       └── info.tsx
└── types/
    └── index.ts
```

**✅ Done!** You now have all files on your computer.

---

## 🧪 Test Before Deploying (Optional but Recommended)

After downloading files, test if everything works:

### Step 1: Install Dependencies

Open terminal in your `aipedia` folder:

**Windows:**
- File Explorer → Open `aipedia` folder
- Click address bar → Type `cmd` → Enter

**Mac:**
- Open Terminal
- Run: `cd ~/Desktop/aipedia`

### Step 2: Run Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Step 3: Test in Browser

- Open browser
- Go to: `http://localhost:5173`
- Check if your website loads
- Test navigation, tools page, etc.
- Press `Ctrl+C` in terminal to stop server

**If it works locally, it will work on GitHub Pages!**

---

## 📊 File Download Progress Tracker

Use this to track which files you've copied:

### Critical Files (Must Have):
- [ ] `.gitignore`
- [ ] `package.json`
- [ ] `vite.config.ts`
- [ ] `index.html`
- [ ] `main.tsx`
- [ ] `.github/workflows/deploy.yml`
- [ ] `App.tsx`
- [ ] `data/tools.ts`

### Important Files:
- [ ] `styles/globals.css`
- [ ] `utils/auth.tsx`
- [ ] `utils/supabase/client.tsx`
- [ ] `utils/supabase/info.tsx`
- [ ] `types/index.ts`

### Component Files:
- [ ] `components/HomePage.tsx`
- [ ] `components/ToolsPage.tsx`
- [ ] `components/AboutPage.tsx`
- [ ] `components/ContactPage.tsx`
- [ ] `components/Header.tsx`
- [ ] `components/Footer.tsx`
- [ ] `components/Chatbot.tsx`
- [ ] `components/AuthModal.tsx`
- [ ] All `components/ui/*.tsx` files

### Documentation:
- [ ] `README.md`
- [ ] `GITHUB_DEPLOYMENT_GUIDE.md`

---

## ❓ Troubleshooting Export Issues

### Issue: Can't Find Export Button
**Solution**: Try Method 2 (Git integration) or Method 3 (Manual download)

### Issue: Downloaded ZIP is Corrupted
**Solution**: 
1. Delete the ZIP file
2. Clear browser cache
3. Try downloading again
4. Try a different browser

### Issue: ZIP File is Too Large
**Solution**:
1. Check if it includes `node_modules` folder (shouldn't)
2. Only download source code files, not dependencies
3. Dependencies will be installed later with `npm install`

### Issue: Missing Files After Extract
**Solution**:
1. Check if hidden files are visible
   - **Windows**: File Explorer → View → Show hidden files
   - **Mac**: Finder → Cmd+Shift+. (dot)
2. `.gitignore` and `.github` start with dot (hidden by default)

### Issue: File Names Look Wrong
**Solution**:
1. Make sure file extensions are visible
   - **Windows**: File Explorer → View → File name extensions
2. Files should end with `.tsx`, `.ts`, `.css`, etc.

---

## 🆘 Still Having Issues?

### Take Screenshots:
1. Figma Make interface (show what options you see)
2. Your folder structure after download
3. Any error messages

### Contact Support:
- **Ritesh Thakur**: ritesh_2503mc03@iitp.ac.in
- **Rishu Kumar**: rishu_2503ct03@iitp.ac.in

Include:
- Which method you tried
- What went wrong
- Screenshots (if possible)

---

## ✅ Next Steps After Export

Once you have all files on your computer:

1. **Verify** you have the essential files listed above
2. **Open** `GITHUB_DEPLOYMENT_GUIDE.md`
3. **Continue** with "STEP 2: Open Terminal/Command Prompt"
4. **Follow** the rest of the deployment steps

---

## 💡 Pro Tips

1. **Use Method 1** if available (easiest and fastest)
2. **Use Method 2** if you see Git integration (fast and reliable)
3. **Use Method 3** only as last resort (time-consuming but works)
4. **Double-check** you have all critical files before proceeding
5. **Test locally** before deploying (optional but recommended)
6. **Keep a backup** of your downloaded files

---

**Good luck with the export! Once you have the files, deployment is easy! 🚀**
