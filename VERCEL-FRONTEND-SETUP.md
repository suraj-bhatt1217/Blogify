# Fix Frontend to Use Backend API

## Current URLs:
- **Backend:** `https://blogify-7gvk.vercel.app`
- **Frontend:** `https://blogify-five-theta.vercel.app`

## Steps to Fix:

### 1. Update Frontend Environment Variable in Vercel

1. Go to **Vercel Dashboard** → Your **Frontend Project** (`blogify-five-theta`)
2. Go to **Settings** → **Environment Variables**
3. Find `VITE_API_URL` or add it if it doesn't exist
4. Set the value to: `https://blogify-7gvk.vercel.app`
   - **Important:** Include `https://` and NO trailing slash
5. **Save** the environment variable
6. **Redeploy** the frontend (go to Deployments tab → Click "..." → Redeploy)

### 2. Verify Backend is Working

Visit in browser:
- `https://blogify-7gvk.vercel.app/` - Should show API info JSON
- `https://blogify-7gvk.vercel.app/health` - Should show `{"status":"ok",...}`
- `https://blogify-7gvk.vercel.app/api/articles/learn-react` - Should show article data (if database is seeded)

### 3. Test Frontend

1. Visit `https://blogify-five-theta.vercel.app`
2. Open browser console (F12)
3. Check logs - should see: `Using API URL: https://blogify-7gvk.vercel.app`
4. Try upvoting and commenting - should work now!

---

## If Still Not Working:

### Check Environment Variable:
1. Make sure `VITE_API_URL` is set correctly in Vercel
2. Make sure you **redeployed** after setting the variable
3. Check browser console for the actual API URL being used

### Check CORS:
- Backend now allows `https://blogify-five-theta.vercel.app`
- Backend allows all `.vercel.app` domains
- Should work automatically

### Check Backend Logs:
1. Go to Vercel Dashboard → Backend Project
2. Check Function Logs
3. Look for any errors

---

## Quick Test:

After redeploying frontend, check browser console:
- Should see: `Using API URL: https://blogify-7gvk.vercel.app`
- Should NOT see: `blogify-7gvk.vercel.app` (without https://)
- Should NOT see: `blogify-five-theta.vercel.app` (frontend URL)

If you see the correct backend URL, everything should work!

