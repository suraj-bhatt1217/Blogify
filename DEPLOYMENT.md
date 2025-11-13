# Vercel Deployment Guide for Blogify

## Step-by-Step Deployment Instructions

### On the Vercel Deployment Screen:

#### 1. **Framework Preset**
   - Keep it as **"Other"** (this is correct for our setup)

#### 2. **Root Directory**
   - Change from `./` to **`blogify-fe`** 
   - This tells Vercel to build and deploy the frontend from the `blogify-fe` folder

#### 3. **Build and Output Settings**
   - Click on **"> Build and Output Settings"** to expand it
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

#### 4. **Environment Variables**
   - Click on **"> Environment Variables"** to expand it
   - Add the following environment variables:

   **For Frontend:**
   ```
   VITE_API_URL=https://your-backend-url.vercel.app
   VITE_FIREBASE_API_KEY=your-firebase-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
   VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
   VITE_FIREBASE_MESSING_SENDER_ID=your-firebase-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-firebase-app-id
   ```

   **Note:** You'll need to deploy the backend first to get the backend URL, then update `VITE_API_URL` with that URL.

#### 5. **Click "Deploy"**
   - Click the **"Deploy"** button at the bottom
   - Wait for the deployment to complete

---

## Deploying the Backend (Separate Project)

### Option 1: Deploy Backend as a Separate Vercel Project (Recommended)

1. **Create a new Vercel project** for the backend:
   - Go to Vercel Dashboard
   - Click "New Project"
   - Import the same GitHub repository
   - Select **"Other"** as Framework Preset
   - **Root Directory:** `blogify-backend`
   - **Build Command:** Leave empty (or `npm install`)
   - **Output Directory:** Leave empty

2. **Environment Variables for Backend:**
   ```
   DATABASE_URL=your-mongodb-connection-string
   FIREBASE_CREDENTIALS={"type":"service_account","project_id":"...","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}
   NODE_ENV=production
   ```

   **Important:** For `FIREBASE_CREDENTIALS`, you need to:
   - Open your `credentials.json` file
   - Copy the entire JSON content
   - Paste it as the value for `FIREBASE_CREDENTIALS` environment variable (make sure it's all on one line or properly escaped)

3. **Update vercel.json in backend:**
   Create a `vercel.json` file in `blogify-backend/`:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "src/server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "src/server.js"
       }
     ]
   }
   ```

4. **Update Frontend API URL:**
   - After backend deployment, copy the backend URL (e.g., `https://blogify-backend.vercel.app`)
   - Go to your frontend Vercel project settings
   - Update `VITE_API_URL` environment variable to the backend URL
   - Redeploy the frontend

---

### Option 2: Deploy Both Together (Monorepo)

If you want to deploy both frontend and backend in one project:

1. **Keep Root Directory as `./`** (root of repository)

2. **Update vercel.json** (already done in the repo):
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "blogify-backend/src/server.js",
         "use": "@vercel/node"
       },
       {
         "src": "blogify-fe/package.json",
         "use": "@vercel/static-build",
         "config": {
           "distDir": "dist"
         }
       }
     ],
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "blogify-backend/src/server.js"
       },
       {
         "src": "/(.*)",
         "dest": "/blogify-fe/$1"
       }
     ],
     "installCommand": "cd blogify-fe && npm install && cd ../blogify-backend && npm install",
     "buildCommand": "cd blogify-fe && npm run build"
   }
   ```

3. **Environment Variables** (add all at once):
   - Frontend variables (VITE_*)
   - Backend variables (DATABASE_URL, FIREBASE_CREDENTIALS)

4. **Click "Deploy"**

---

## Post-Deployment Steps

1. **Seed the Database:**
   - After deployment, you may need to seed the database
   - You can do this locally by running:
     ```bash
     cd blogify-backend
     npm run seed
     ```
   - Make sure your `DATABASE_URL` in `.env` points to your production MongoDB

2. **Update CORS:**
   - Make sure your backend allows requests from your Vercel frontend URL
   - The backend code already handles this, but verify the URL matches

3. **Test the Deployment:**
   - Visit your Vercel frontend URL
   - Test login, upvoting, and commenting
   - Check browser console for any errors

---

## Troubleshooting

### Build Fails
- Check that all environment variables are set
- Verify the root directory is correct
- Check build logs in Vercel dashboard

### API Not Working
- Verify `VITE_API_URL` is set to your backend URL
- Check that backend is deployed and running
- Verify CORS settings in backend

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check MongoDB Atlas IP whitelist (allow all IPs: `0.0.0.0/0`)
- Verify database user has proper permissions

### Firebase Authentication Issues
- Verify all Firebase environment variables are set
- Check that `FIREBASE_CREDENTIALS` is properly formatted (single line JSON)
- Verify Firebase project settings

---

## Recommended Approach

**For easier management, I recommend:**

1. **Deploy Frontend First:**
   - Root Directory: `blogify-fe`
   - Set all frontend environment variables
   - Deploy

2. **Deploy Backend Second:**
   - Create a new Vercel project
   - Root Directory: `blogify-backend`
   - Set all backend environment variables
   - Deploy

3. **Update Frontend:**
   - Update `VITE_API_URL` in frontend project with backend URL
   - Redeploy frontend

This approach is cleaner and easier to manage!

