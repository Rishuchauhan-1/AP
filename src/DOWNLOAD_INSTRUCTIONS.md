# 📥 How to Download AiPedia from Figma Make

Your AiPedia project is currently in **Figma Make**. To deploy it to GitHub, you first need to download it to your computer.

## 🎯 Method 1: Export from Figma Make (Easiest)

### Step 1: Look for Export/Download Button
Look in the Figma Make interface for one of these:
- **"Export"** button (usually top-right)
- **"Download"** button with ⬇️ icon
- **Menu** → **"Download Project"**
- **File** → **"Export"** or **"Download"**

### Step 2: Download as ZIP
- Click the export/download button
- Select "Download as ZIP" or "Export Project"
- Save to your **Desktop**

### Step 3: Extract the Files
**On Windows:**
1. Find the downloaded ZIP file (usually in Downloads folder)
2. Right-click → "Extract All..."
3. Choose Desktop as destination
4. Click "Extract"

**On Mac:**
1. Find the ZIP file in Downloads
2. Double-click to extract
3. Move the extracted folder to Desktop

### Step 4: You're Ready!
Now you have a folder `aipedia` on your Desktop with all files.

**Continue to Step 2 in the main guide below.**

---

## 🎯 Method 2: Manual Download (If No Export Button)

If Figma Make doesn't have an export button, follow these steps:

### Step 1: Install Node.js and VS Code
1. Download Node.js: https://nodejs.org/ (LTS version)
2. Install Node.js
3. Download VS Code: https://code.visualstudio.com/
4. Install VS Code

### Step 2: Create Project Folder
1. Open File Explorer (Windows) or Finder (Mac)
2. Go to Desktop
3. Right-click → New Folder
4. Name it `aipedia`

### Step 3: Open in VS Code
1. Open VS Code
2. File → Open Folder
3. Select the `aipedia` folder you just created
4. Click "Select Folder"

### Step 4: Create Files
Now you need to recreate the file structure. Here's the list of essential files:

**Required Files to Copy:**
```
/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── .gitignore
├── package.json
├── vite.config.ts
├── README.md
├── App.tsx
├── index.html
├── components/
│   ├── HomePage.tsx
│   ├── ToolsPage.tsx
│   ├── AboutPage.tsx
│   ├── ContactPage.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Chatbot.tsx
│   ├── AuthModal.tsx
│   └── ... (all other components)
├── data/
│   └── tools.ts
├── styles/
│   └── globals.css
├── utils/
│   ├── auth.tsx
│   └── supabase/
└── types/
    └── index.ts
```

### Step 5: Copy Each File
For each important file:
1. In Figma Make, click the file
2. Select all code (`Ctrl+A` or `Cmd+A`)
3. Copy (`Ctrl+C` or `Cmd+C`)
4. In VS Code, create new file with same name and path
5. Paste the code
6. Save (`Ctrl+S` or `Cmd+S`)

**Start with these essential files in this order:**
1. `package.json`
2. `vite.config.ts`
3. `.gitignore`
4. `App.tsx`
5. `index.html` (create if doesn't exist)
6. All files in `components/`
7. `data/tools.ts`
8. `styles/globals.css`

---

## 🎯 Method 3: Ask for GitHub Integration

Some Figma Make projects can be directly pushed to GitHub.

**Check if you see:**
- Git icon in the sidebar
- "Connect to GitHub" option
- Repository settings

If yes, you can skip downloading and directly push to GitHub from Figma Make!

---

## 📋 After Downloading - Next Steps

Once you have the project on your computer:

### Step 1: Install Dependencies
Open terminal in your project folder:
```bash
npm install
```

### Step 2: Test Locally (Optional)
```bash
npm run dev
```
Open browser to `http://localhost:5173` to verify it works.

### Step 3: Continue with GitHub Deployment
Now follow the **GITHUB_DEPLOYMENT_GUIDE.md** starting from "STEP 2: Open Terminal/Command Prompt"

---

## ❓ Which Method Should You Use?

**Use Method 1** if Figma Make has an export button (easiest!)

**Use Method 2** if no export option (takes 30-60 minutes)

**Use Method 3** if you see GitHub integration in Figma Make (fastest!)

---

## 🆘 Need Help?

Tell me:
1. Do you see an "Export" or "Download" button in Figma Make?
2. What options do you see in the top menu?
3. Screenshot of your Figma Make interface (optional)

I'll help you find the easiest way to download your project!
