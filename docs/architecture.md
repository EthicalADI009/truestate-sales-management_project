# Architecture Document

## Backend Architecture

### Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite3
- **Language**: JavaScript

### Design Pattern
The backend follows the **MVC (Model-View-Controller)** pattern (minus the View, as it's an API).
- **Controllers**: Handle incoming HTTP requests, validate input, and send responses.
- **Services**: Contain business logic and database interactions.
- **Routes**: Define API endpoints and map them to controllers.
- **Utils**: Helper functions (e.g., database connection).

### Data Flow
1. **Request**: Client sends HTTP GET to `/api/sales` with query params (search, filters, sort, page).
2. **Route**: `salesRoutes` forwards request to `salesController`.
3. **Controller**: `salesController` parses parameters (JSON filters) and calls `salesService`.
4. **Service**: `salesService` constructs a dynamic SQL query based on parameters.
    - Uses parameterized queries to prevent SQL injection.
    - Handles complex filtering logic (multi-select, ranges).
5. **Database**: SQLite executes the query. Indexes on `customer_name`, `phone_number`, `date`, etc., ensure performance.
6. **Response**: Data is returned to the controller, which formats it as JSON (including pagination metadata) and sends it to the client.

### Folder Structure
```
backend/
 ├── src/
 │    ├── controllers/   # Request handlers
 │    ├── services/      # Business logic & DB queries
 │    ├── routes/        # API route definitions
 │    ├── utils/         # DB connection, helpers
 │    └── index.js       # Entry point
 ├── scripts/            # Data import scripts
 └── package.json
```

## Frontend Architecture

### Technology Stack
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Design Pattern
Component-based architecture with a clear separation of concerns.
- **Components**: Reusable UI elements (`SalesTable`, `FilterPanel`, `Pagination`).
- **Layout**: Main wrapper for consistent structure.
- **State Management**: React `useState` and `useEffect` hooks in `App.jsx` manage the application state (sales data, loading, filters, pagination).

### Data Flow
1. **User Action**: User types in search, selects a filter, or changes page.
2. **State Update**: React state (`search`, `filters`, `page`) updates.
3. **Effect Trigger**: `useEffect` detects state change and triggers `fetchSales`.
4. **API Call**: Axios sends request to backend with updated parameters.
5. **Update UI**: Response data updates `sales` state, re-rendering `SalesTable`.

### Folder Structure
```
frontend/
 ├── src/
 │    ├── components/    # Reusable UI components
 │    ├── App.jsx        # Main application logic
 │    ├── main.jsx       # Entry point
 │    └── index.css      # Global styles (Tailwind)
 ├── public/
 └── package.json
```
