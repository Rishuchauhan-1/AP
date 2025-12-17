# AiPedia - GitHub Deployment Guide

This guide will help you deploy your AiPedia website to GitHub Pages and get your free `github.io` domain.

## 📋 Prerequisites

Before you begin, make sure you have:
- A GitHub account (create one at https://github.com if you don't have one)
- Git installed on your computer (download from https://git-scm.com/)
- Node.js installed (download from https://nodejs.org/)

## 🚀 Step-by-Step Deployment Instructions

### Step 1: Create a GitHub Repository

1. Go to https://github.com and log in
2. Click the "+" icon in the top-right corner
3. Select "New repository"
4. Fill in the details:
   - **Repository name**: `aipedia` (or your preferred name)
   - **Description**: "AiPedia - A comprehensive directory of 500+ AI tools"
   - **Public/Private**: Choose Public (required for free GitHub Pages)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these files)
5. Click "Create repository"

### Step 2: Initialize Git in Your Project

Open your terminal/command prompt in your project folder and run:

```bash
# Initialize git repository
git init

# Add all files to git
git add .

# Create your first commit
git commit -m "Initial commit: AiPedia with 500+ AI tools"

# Add your GitHub repository as remote (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/aipedia.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

**Important**: Replace `YOUR_USERNAME` with your actual GitHub username!

### Step 3: Add Supabase Secrets to GitHub

Your app uses Supabase for authentication. You need to add your Supabase credentials as GitHub Secrets:

1. Go to your repository on GitHub
2. Click "Settings" tab
3. In the left sidebar, click "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. Add two secrets:
   - **Name**: `VITE_SUPABASE_URL`
     **Value**: Your Supabase project URL (from your Supabase dashboard)
   
   - **Name**: `VITE_SUPABASE_ANON_KEY`
     **Value**: Your Supabase anonymous key (from your Supabase dashboard)

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. In the left sidebar, click "Pages"
4. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
5. The deployment will start automatically!

### Step 5: Update Vite Config for Your Repository Name

If your repository name is NOT "aipedia", you need to update the `vite.config.ts` file:

1. Open `/vite.config.ts`
2. Change this line:
   ```typescript
   base: process.env.NODE_ENV === 'production' ? '/aipedia/' : '/',
   ```
   Replace `'/aipedia/'` with `'/YOUR_REPO_NAME/'`

3. Commit and push the change:
   ```bash
   git add vite.config.ts
   git commit -m "Update base path for GitHub Pages"
   git push
   ```

### Step 6: Access Your Website

After the deployment completes (usually 2-5 minutes):

Your website will be available at:
```
https://YOUR_USERNAME.github.io/aipedia/
```

Replace `YOUR_USERNAME` with your GitHub username and `aipedia` with your repository name.

## 🔄 Making Updates

Whenever you want to update your website:

```bash
# Make your changes to the code

# Add the changes
git add .

# Commit with a descriptive message
git commit -m "Description of your changes"

# Push to GitHub
git push

# GitHub Actions will automatically rebuild and deploy your site!
```

## 🌐 Custom Domain (Optional)

If you want to use a custom domain like `aipedia.com`:

1. Purchase a domain from a domain registrar (GoDaddy, Namecheap, etc.)
2. In your repository Settings → Pages, add your custom domain
3. Configure your domain's DNS settings to point to GitHub Pages
4. GitHub will provide detailed instructions in the Pages settings

## 📊 Monitoring Deployments

To check deployment status:
1. Go to your repository on GitHub
2. Click the "Actions" tab
3. You'll see all deployment runs and their status

## 🐛 Troubleshooting

### Issue: Deployment fails
- Check the Actions tab for error logs
- Ensure you added the Supabase secrets correctly
- Verify all files are committed and pushed

### Issue: Site shows 404 error
- Make sure GitHub Pages is enabled
- Check that the `base` path in `vite.config.ts` matches your repository name
- Wait a few minutes for DNS propagation

### Issue: Images or assets not loading
- Verify the `base` path in `vite.config.ts` is correct
- Check browser console for 404 errors
- Ensure all assets are included in the git repository

## 📧 Support

If you encounter issues, contact:
- **Ritesh Thakur**: ritesh_2503mc03@iitp.ac.in
- **Rishu Kumar**: rishu_2503ct03@iitp.ac.in

## 🎉 Success!

Once deployed, your AiPedia website with 500+ AI tools will be live on the internet with a free GitHub Pages domain!

Share your link:
```
https://YOUR_USERNAME.github.io/aipedia/
```

---

**Note**: The first deployment might take 5-10 minutes. Subsequent deployments are usually faster (2-3 minutes).
