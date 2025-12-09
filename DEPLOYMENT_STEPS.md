# Step-by-Step Render Deployment Guide

Follow these steps to deploy your TrueState Sales Management System on Render.

## Prerequisites
- GitHub repository is pushed (✅ Already done)
- Render account (sign up at https://render.com if needed)

## Option 1: Deploy Using Blueprint (Easiest - Recommended)

1. **Go to Render Dashboard**
   - Visit https://dashboard.render.com
   - Sign in or create an account

2. **Create New Blueprint**
   - Click **"New +"** button
   - Select **"Blueprint"**
   - Connect your GitHub account if not already connected
   - Select repository: `truestate-sales-management_project`

3. **Review Configuration**
   - Render will automatically detect `render.yaml`
   - You'll see two services:
     - `truestate-backend` (Web Service)
     - `truestate-frontend` (Static Site)
   - Click **"Apply"**

4. **Wait for Backend Deployment**
   - Backend will deploy first
   - **Copy the backend URL** (e.g., `https://truestate-backend.onrender.com`)
   - Note: Database will be empty initially (CSV file is too large for GitHub)

5. **Configure Environment Variables**

   **Backend Service:**
   - Go to your backend service settings
   - Navigate to **"Environment"** tab
   - Set `FRONTEND_URL` = (leave empty for now, we'll set after frontend deploys)

   **Frontend Service:**
   - Go to your frontend service settings  
   - Navigate to **"Environment"** tab
   - Set `VITE_API_URL` = `https://truestate-backend.onrender.com/api`
     (Replace with your actual backend URL)

6. **Update Backend CORS**
   - After frontend deploys, copy the frontend URL
   - Go back to backend settings → Environment
   - Set `FRONTEND_URL` = your frontend URL (e.g., `https://truestate-frontend.onrender.com`)

7. **Import Data (Important!)**
   - The database will be empty initially
   - You have two options:

   **Option A: Manual Import via Render Shell**
   - Go to backend service → **"Shell"** tab
   - Upload `truestate_assignment_dataset.csv` to Render
   - Run: `node scripts/importData.js`

   **Option B: Use Render's File Upload**
   - Use Render's file system to upload the CSV
   - Or connect via SSH and upload the file

## Option 2: Manual Deployment

### Deploy Backend First

1. **Create Web Service**
   - Click **"New +"** → **"Web Service"**
   - Connect repository: `truestate-sales-management_project`
   - Click **"Connect"**

2. **Configure Backend**
   - **Name**: `truestate-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (or choose paid for better performance)

3. **Environment Variables**
   - Click **"Advanced"** → **"Add Environment Variable"**
   - Add:
     - `NODE_ENV` = `production`
     - `PORT` = `10000` (Render will override, but set it)
     - `FRONTEND_URL` = (leave empty for now)

4. **Create Service**
   - Click **"Create Web Service"**
   - Wait for deployment (5-10 minutes)
   - **Copy the URL** when done

### Deploy Frontend

1. **Create Static Site**
   - Click **"New +"** → **"Static Site"**
   - Connect repository: `truestate-sales-management_project`
   - Click **"Connect"**

2. **Configure Frontend**
   - **Name**: `truestate-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

3. **Environment Variables**
   - Add: `VITE_API_URL` = `https://truestate-backend.onrender.com/api`
     (Use your actual backend URL)

4. **Create Static Site**
   - Click **"Create Static Site"**
   - Wait for deployment

5. **Update Backend CORS**
   - Copy frontend URL
   - Go to backend → Environment
   - Set `FRONTEND_URL` = frontend URL
   - Save (will trigger redeploy)

## Important Notes

### Database Initialization
- The CSV file (224 MB) is too large for GitHub
- Database will be empty after initial deployment
- You need to import data manually:

**Method 1: Via Render Shell**
```bash
# In Render Shell for backend service
# First, upload CSV file to Render (use file manager or SCP)
node scripts/importData.js
```

**Method 2: Use Git LFS (Advanced)**
```bash
# Install Git LFS
git lfs install
git lfs track "*.csv"
git add .gitattributes
git add truestate_assignment_dataset.csv
git commit -m "Add CSV via LFS"
git push
```

### Free Tier Limitations
- Services spin down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- Limited build minutes per month
- Ephemeral filesystem (data may be lost on redeploy)

### Production Recommendations
- Upgrade to paid plan for always-on service
- Use Render PostgreSQL for persistent database
- Set up automated backups
- Use environment variables for all sensitive data

## Verification

After deployment:
1. ✅ Backend health check: Visit `https://your-backend.onrender.com/` - should show "TrueState Assignment Backend"
2. ✅ Frontend loads: Visit your frontend URL
3. ✅ API connection: Check browser console for API calls
4. ✅ Data loads: If data imported, it should display

## Troubleshooting

**Backend won't start:**
- Check build logs in Render dashboard
- Verify `npm start` script exists in package.json
- Check PORT environment variable

**Frontend can't connect to API:**
- Verify `VITE_API_URL` is set correctly
- Check CORS settings in backend
- Ensure backend URL includes `/api` in VITE_API_URL

**Database empty:**
- This is expected - CSV file needs manual import
- Use Render Shell to run import script
- Or use Git LFS to include CSV in repo

**CORS errors:**
- Set `FRONTEND_URL` in backend environment variables
- Ensure it matches your frontend URL exactly

## Next Steps After Deployment

1. Import your sales data (see Database Initialization above)
2. Test all features (search, filter, pagination)
3. Monitor logs for any errors
4. Set up custom domain (optional, paid feature)

