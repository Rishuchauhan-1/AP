# ⚡ Quick Start - Deploy AiPedia in 20 Minutes

## 📍 You Are Here
Your AiPedia is in **Figma Make** → Need to get it to **GitHub Pages**

---

## 🎯 3 Simple Parts

### **PART 1: Export from Figma Make (5 min)**

Look for **"Download"** or **"Export"** button in Figma Make:
- Top-right corner
- Menu (☰ or ⋮)
- File menu

Click it → Download as ZIP → Save to Desktop → Extract ZIP file

**✅ You now have `aipedia` folder on Desktop**

---

### **PART 2: Push to GitHub (10 min)**

1. **Create repository**: https://github.com/new
   - Name: `aipedia`
   - Public
   - Don't add README/gitignore/license
   - Click "Create"

2. **Open terminal in your aipedia folder**
   - Windows: Click address bar → type `cmd` → Enter
   - Mac: Right-click folder → "New Terminal at Folder"

3. **Run these commands** (one by one):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: AiPedia with 500+ AI tools"
   git remote add origin https://github.com/YOUR_USERNAME/aipedia.git
   git branch -M main
   git push -u origin main
   ```
   Replace `YOUR_USERNAME` with your GitHub username!

**✅ Your code is now on GitHub**

---

### **PART 3: Enable GitHub Pages (5 min)**

1. **Add Supabase secrets**:
   - Repo → Settings → Secrets and variables → Actions
   - Add: `VITE_SUPABASE_URL` (your Supabase URL)
   - Add: `VITE_SUPABASE_ANON_KEY` (your Supabase key)

2. **Enable Pages**:
   - Repo → Settings → Pages
   - Source: "GitHub Actions"

3. **Deploy**:
   - Repo → Actions tab
   - Click "Deploy to GitHub Pages"
   - Click "Run workflow"
   - Wait 5-10 minutes

**✅ Your site is live!**

---

## 🌐 Your Website URL

```
https://YOUR_USERNAME.github.io/aipedia/
```

---

## 🆘 Problems?

**Can't find Export in Figma Make?**
→ Read: `/DOWNLOAD_INSTRUCTIONS.md`

**Git commands failing?**
→ Install Git: https://git-scm.com/downloads

**Deployment failed?**
→ Check: Did you add both Supabase secrets?

**Need detailed guide?**
→ Read: `/FIGMA_TO_GITHUB_COMPLETE_GUIDE.md`

---

## 📧 Contact

- Ritesh Thakur: ritesh_2503mc03@iitp.ac.in
- Rishu Kumar: rishu_2503ct03@iitp.ac.in

---

**Let's go! 🚀**
