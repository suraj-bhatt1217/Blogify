# Quick Fix for Vercel Deployment

## Your URLs:
- **Backend:** `https://blogify-7gvk.vercel.app`
- **Frontend:** `https://blogify-five-theta.vercel.app`

## ✅ What I Fixed:

1. ✅ Added frontend URL to backend CORS allowed origins
2. ✅ Added root route to backend (no more "Cannot GET /" error)
3. ✅ Added health check endpoint (`/health`)
4. ✅ Created API utility that automatically adds `https://` protocol

## 🔧 What You Need to Do:

### Step 1: Commit and Push Backend Changes

```bash
git add .
git commit -m "Fix backend for Vercel deployment - add root route and CORS"
git push
```

This will automatically redeploy your backend on Vercel.

### Step 2: Update Frontend Environment Variable in Vercel

1. Go to **Vercel Dashboard** → **blogify-five-theta** project
2. Click **Settings** → **Environment Variables**
3. Find or add `VITE_API_URL`
4. Set value to: `https://blogify-7gvk.vercel.app`
   - ⚠️ **Must include `https://`**
   - ⚠️ **No trailing slash**
5. Click **Save**
6. Go to **Deployments** tab
7. Click **"..."** (three dots) on the latest deployment
8. Click **Redeploy**

### Step 3: Verify It Works

1. Visit backend: `https://blogify-7gvk.vercel.app/`
   - Should show JSON with API info (not "Cannot GET /")

2. Visit frontend: `https://blogify-five-theta.vercel.app`
   - Open browser console (F12)
   - Should see: `Using API URL: https://blogify-7gvk.vercel.app`
   - Try upvoting and commenting - should work!

---

## 🎯 Summary:

**Backend:** ✅ Already configured correctly
**Frontend:** ⚠️ Needs `VITE_API_URL` environment variable set in Vercel

Once you set `VITE_API_URL=https://blogify-7gvk.vercel.app` in Vercel and redeploy, everything should work!

