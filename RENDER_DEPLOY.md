# Render Deployment Guide

This guide will help you deploy both the backend and frontend to Render.

## Prerequisites

1. A GitHub account with this repository pushed
2. A Render account (sign up at https://render.com)

## Step 1: Deploy Backend

1. **Go to Render Dashboard** → Click **New +** → **Web Service**

2. **Connect Repository**:
   - Connect your GitHub account if not already connected
   - Select the repository: `truestate-sales-management_project`

3. **Configure Backend Service**:
   - **Name**: `truestate-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free tier is fine for testing

4. **Environment Variables**:
   - `NODE_ENV` = `production`
   - `PORT` = `10000` (Render will override this, but set it anyway)
   - `FRONTEND_URL` = Leave empty for now (we'll update after frontend deployment)

5. **Click "Create Web Service"**

6. **Wait for deployment** and copy the backend URL (e.g., `https://truestate-backend.onrender.com`)

## Step 2: Deploy Frontend

1. **Go to Render Dashboard** → Click **New +** → **Static Site**

2. **Connect Repository**:
   - Select the same repository: `truestate-sales-management_project`

3. **Configure Frontend Service**:
   - **Name**: `truestate-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. **Environment Variables**:
   - `VITE_API_URL` = `https://truestate-backend.onrender.com/api`
     (Replace with your actual backend URL from Step 1)

5. **Click "Create Static Site"**

6. **Wait for deployment** and copy the frontend URL

## Step 3: Update Backend CORS

1. Go back to your **Backend Service** settings
2. Update the `FRONTEND_URL` environment variable with your frontend URL
3. Click **Save Changes** - this will trigger a redeploy

## Step 4: Verify Deployment

1. Open your frontend URL in a browser
2. Test the application:
   - Search functionality
   - Filters
   - Pagination
   - Data loading

## Troubleshooting

### Backend Issues

- **Database not initialized**: The build script will try to import data from `truestate_assignment_dataset.csv`. Make sure this file is in the repository root.
- **Port issues**: Render automatically sets the PORT environment variable, so your code should use `process.env.PORT`
- **CORS errors**: Make sure `FRONTEND_URL` is set correctly in backend environment variables

### Frontend Issues

- **API connection errors**: Verify `VITE_API_URL` is set correctly and includes `/api` at the end
- **Build failures**: Check the build logs in Render dashboard for specific errors

## Alternative: Using render.yaml (Blueprints)

If you prefer to use Render Blueprints:

1. Make sure `render.yaml` is in your repository root
2. Go to Render Dashboard → **New +** → **Blueprint**
3. Connect your repository
4. Render will automatically detect and deploy both services

**Note**: You'll still need to manually set the environment variables:
- Backend: `FRONTEND_URL` (after frontend is deployed)
- Frontend: `VITE_API_URL` (set to your backend URL)

## Database Notes

- The SQLite database file (`database.sqlite`) is stored in the backend directory
- On Render's free tier, the filesystem is ephemeral, meaning data may be lost on redeployments
- For production, consider migrating to a persistent database service (PostgreSQL on Render)

## Cost

- Both services can run on Render's free tier
- Free tier has limitations:
  - Services spin down after 15 minutes of inactivity
  - First request after spin-down may take 30-60 seconds
  - Limited build minutes per month

