# Vercel Deployment Configuration

## ⚠️ Important: Root vercel.json has been removed

The root `vercel.json` was causing conflicts when deploying the frontend with Root Directory set to `blogify-fe`.

## Frontend Deployment (blogify-fe)

When deploying the frontend:
1. **Root Directory:** `blogify-fe`
2. **Framework Preset:** "Other"
3. **Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. **vercel.json:** Located in `blogify-fe/vercel.json` (handles routing)

## Backend Deployment (blogify-backend)

When deploying the backend:
1. **Root Directory:** `blogify-backend`
2. **Framework Preset:** "Other"
3. **vercel.json:** Located in `blogify-backend/vercel.json` (handles serverless functions)

## Monorepo Deployment (if needed)

If you want to deploy both together, use `vercel-monorepo.json`:
1. Rename `vercel-monorepo.json` to `vercel.json`
2. Set Root Directory to `./` (root)
3. Configure environment variables for both frontend and backend

