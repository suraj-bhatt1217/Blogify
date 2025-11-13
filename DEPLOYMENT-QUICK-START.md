# Quick Deployment Guide for Vercel

## 🚀 Deploy Frontend First (What you're doing now)

### On Current Vercel Screen:

1. **Root Directory:** Change to `blogify-fe`
2. **Framework Preset:** Keep as "Other"
3. **Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. **Environment Variables:** Add these:
   ```
   VITE_FIREBASE_API_KEY=AIzaSyAxjVA1CqPqlJD6ikJWigzdgaYcunz3qWY
   VITE_FIREBASE_AUTH_DOMAIN=blogify-ba132.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=blogify-ba132
   VITE_FIREBASE_STORAGE_BUCKET=blogify-ba132.appspot.com
   VITE_FIREBASE_MESSING_SENDER_ID=542829974982
   VITE_FIREBASE_APP_ID=1:542829974982:web:8f5956b60f669af811cec7
   ```
   **Leave `VITE_API_URL` blank for now - we'll add it after backend deployment**

5. **Click "Deploy"**

---

## 🔧 Deploy Backend Second (After frontend)

### Create New Vercel Project:

1. Go to Vercel Dashboard → "New Project"
2. Import same repository: `suraj-bhatt1217/Blogify`
3. **Root Directory:** `blogify-backend`
4. **Framework Preset:** "Other"
5. **Build Settings:**
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
   - Install Command: `npm install`
6. **Environment Variables:**
   ```
   DATABASE_URL=your-mongodb-connection-string
   FIREBASE_CREDENTIALS=your-firebase-credentials-json-as-single-line
   NODE_ENV=production
   ```
   
   **For FIREBASE_CREDENTIALS:**
   - Open your `blogify-backend/credentials.json` file
   - Copy entire JSON content
   - Paste it as value (make sure it's all on one line)
   - Example: `{"type":"service_account","project_id":"...","private_key":"..."}`
   
7. **Click "Deploy"**

---

## 🔗 Connect Frontend to Backend

1. After backend deployment, copy the backend URL (e.g., `https://blogify-backend-xyz.vercel.app`)
2. Go to your frontend Vercel project → Settings → Environment Variables
3. Add/Update: `VITE_API_URL=https://your-backend-url.vercel.app`
4. Redeploy the frontend

---

## ✅ Final Steps

1. **Seed Database:**
   ```bash
   cd blogify-backend
   npm run seed
   ```
   (Make sure DATABASE_URL in your local .env points to production MongoDB)

2. **Test Deployment:**
   - Visit frontend URL
   - Test login, upvoting, commenting
   - Check browser console for errors

---

## 📝 Important Notes

- **MongoDB Atlas:** Make sure your MongoDB Atlas allows connections from anywhere (`0.0.0.0/0`) or add Vercel's IPs
- **CORS:** Backend already handles CORS for Vercel URLs
- **Firebase Credentials:** Must be valid JSON on a single line in environment variable
- **Database URL:** Must be URL-encoded (special characters like `@`, `#`, etc.)

---

## 🆘 Troubleshooting

### Build Fails
- Check environment variables are all set
- Verify root directory is correct
- Check build logs in Vercel dashboard

### API Not Working
- Verify `VITE_API_URL` is set correctly
- Check backend is deployed and running
- Verify CORS settings

### Database Connection Issues
- Check MongoDB Atlas IP whitelist
- Verify DATABASE_URL is correct
- Check database user permissions

