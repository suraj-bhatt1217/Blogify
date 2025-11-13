# Fixing Vercel Deployment - 405 Error

## Problem
You're getting 405 (Method Not Allowed) errors because:
1. **The backend is NOT deployed** - Only the frontend is deployed
2. **VITE_API_URL is pointing to the frontend URL** (`blogify-7gvk.vercel.app`) instead of a backend URL
3. **The API URL is missing `https://` protocol**

## Solution: Deploy Backend Separately

### Step 1: Deploy Backend on Vercel

1. Go to **Vercel Dashboard** → **New Project**
2. Import the same repository: `suraj-bhatt1217/Blogify`
3. Configure:
   - **Root Directory:** `blogify-backend`
   - **Framework Preset:** "Other"
   - **Build Command:** (leave empty)
   - **Output Directory:** (leave empty)
   - **Install Command:** `npm install`
4. **Environment Variables:**
   ```
   DATABASE_URL=your-mongodb-connection-string
   FIREBASE_CREDENTIALS={"type":"service_account","project_id":"...","private_key":"..."}
   NODE_ENV=production
   ```
   **Important:** For `FIREBASE_CREDENTIALS`, copy the entire JSON from `blogify-backend/credentials.json` and paste it as a single line (all on one line).
5. **Click "Deploy"**
6. **Copy the backend URL** (e.g., `https://blogify-backend-abc123.vercel.app`)

### Step 2: Update Frontend Environment Variables

1. Go to your **frontend Vercel project** → **Settings** → **Environment Variables**
2. **Update `VITE_API_URL`:**
   - Remove the old value (if it exists)
   - Add new value: `https://your-backend-url.vercel.app`
   - Example: `https://blogify-backend-abc123.vercel.app`
3. **Save** and **Redeploy** the frontend

### Step 3: Verify

1. After redeployment, check the browser console
2. You should see: `Using API URL: https://your-backend-url.vercel.app`
3. Try upvoting and commenting - should work now!

---

## Quick Fix: Update VITE_API_URL in Vercel

**Right now, in your frontend Vercel project:**

1. Go to **Settings** → **Environment Variables**
2. Find `VITE_API_URL`
3. **Delete it** or **update it** to your backend URL (once backend is deployed)
4. **Redeploy** frontend

**Until the backend is deployed:**
- The frontend will try to call API endpoints on the frontend URL
- This causes 405 errors because the frontend doesn't have API routes
- You need to deploy the backend first!

---

## Alternative: Deploy Both Together (Monorepo)

If you want to deploy both frontend and backend in one project:

1. **Delete** `blogify-fe/vercel.json` (or rename it)
2. **Rename** `vercel-monorepo.json` to `vercel.json` in the root
3. **Root Directory:** `./` (root of repository)
4. **Set all environment variables** (both frontend and backend)
5. **Deploy**

But **separate deployments are recommended** for easier management!

---

## Current Status

✅ **Fixed:** API URL normalization (automatically adds `https://` if missing)
✅ **Fixed:** Created API utility for consistent URL handling
⏳ **Pending:** Deploy backend separately
⏳ **Pending:** Update VITE_API_URL to point to backend

---

## Next Steps

1. **Deploy backend** (follow Step 1 above)
2. **Update VITE_API_URL** in frontend project (Step 2)
3. **Redeploy frontend**
4. **Test** - upvote and comment should work!

