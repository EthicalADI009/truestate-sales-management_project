# Deployment Guide

Follow these steps to deploy the TrueState Sales Management System.

## 1. Deploy Backend (Render)
We will deploy the Node.js backend to Render.

1.  **Sign up/Login** to [Render](https://render.com/).
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub account and select the `truestate-sales-management` repository.
4.  **Configure the Service**:
    *   **Name**: `truestate-backend` (or similar)
    *   **Root Directory**: `backend` (Important!)
    *   **Runtime**: Node
    *   **Build Command**: `npm install`
    *   **Start Command**: `node src/index.js`
5.  **Environment Variables**:
    *   Add `NODE_ENV` = `production`
6.  Click **Create Web Service**.
7.  Wait for the deployment to finish. **Copy the URL** (e.g., `https://truestate-backend.onrender.com`).

## 2. Deploy Frontend (Vercel)
We will deploy the React frontend to Vercel.

1.  **Sign up/Login** to [Vercel](https://vercel.com/).
2.  Click **Add New...** -> **Project**.
3.  Import the `truestate-sales-management` repository.
4.  **Configure Project**:
    *   **Framework Preset**: Vite
    *   **Root Directory**: Click "Edit" and select `frontend`.
5.  **Environment Variables**:
    *   Name: `VITE_API_URL`
    *   Value: The **Backend URL** you copied from Render (e.g., `https://truestate-backend.onrender.com/api`). **Make sure to add `/api` at the end if your backend routes expect it, but based on our code, the base URL should be just the domain or domain + /api depending on how you set it. In our code we append `/sales`, so set it to `https://truestate-backend.onrender.com/api`**.
6.  Click **Deploy**.

## 3. Final Verification
1.  Open the Vercel deployment URL.
2.  Test the search, filters, and pagination.
3.  If data loads, you are done!
