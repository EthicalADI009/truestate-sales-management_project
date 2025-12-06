# TrueState Retail Sales Management System

## Overview
A full-stack Retail Sales Management System built for the TrueState SDE Intern Assignment. It visualizes sales data with advanced search, filtering, sorting, and pagination capabilities, handling a dataset of 1 million records efficiently.

## Tech Stack
- **Backend**: Node.js, Express.js, SQLite3
- **Frontend**: React (Vite), Tailwind CSS
- **Database**: SQLite

## Search Implementation Summary
- **Backend**: SQL `LIKE` operator with wildcards (`%query%`) on `customer_name` and `phone_number`.
- **Frontend**: Debounced input (500ms) to prevent excessive API calls.
- **Performance**: Database indexes on searchable columns ensure fast lookups.

## Filter Implementation Summary
- **Multi-Select**: Supports multiple values for Region, Category, Payment Method. Implemented using SQL `IN` clause.
- **Range**: Supports Date and Age ranges using SQL `BETWEEN`.
- **Combination**: All filters work together using dynamic `AND` conditions in the SQL query.

## Sorting Implementation Summary
- **Dynamic Sorting**: Supports sorting by Date, Quantity, Price, etc.
- **Direction**: Ascending and Descending.
- **Persistence**: Sorting state is maintained while filtering or searching.

## Pagination Implementation Summary
- **Server-Side**: Uses SQL `LIMIT` and `OFFSET` for efficient data retrieval.
- **UI**: Pagination controls show current page and allow navigation to Next/Previous/Specific pages.
- **State**: Page resets to 1 on new search or filter application.

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- npm

### Backend Setup
1. Navigate to `backend`:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Import Data (if not already done):
   ```bash
   node scripts/importData.js
   ```
   *Note: This may take a few minutes for large datasets.*
4. Start Server:
   ```bash
   node src/index.js
   ```
   Server runs on `http://localhost:5000`.

### Frontend Setup
1. Navigate to `frontend`:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start Dev Server:
   ```bash
   npm run dev
   ```
   App runs on `http://localhost:5173`.

## Documentation
See [docs/architecture.md](docs/architecture.md) for detailed architecture.
