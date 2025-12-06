const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../../database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS sales (
      transaction_id TEXT PRIMARY KEY,
      date TEXT,
      customer_id TEXT,
      customer_name TEXT,
      phone_number TEXT,
      gender TEXT,
      age INTEGER,
      customer_region TEXT,
      customer_type TEXT,
      product_id TEXT,
      product_name TEXT,
      brand TEXT,
      product_category TEXT,
      tags TEXT,
      quantity INTEGER,
      price_per_unit REAL,
      discount_percentage REAL,
      total_amount REAL,
      final_amount REAL,
      payment_method TEXT,
      order_status TEXT,
      delivery_type TEXT,
      store_id TEXT,
      store_location TEXT,
      salesperson_id TEXT,
      employee_name TEXT
    )`, (err) => {
        if (err) {
            console.error("Error creating table:", err.message);
        } else {
            // Create indexes for search and filtering
            const indexes = [
                "CREATE INDEX IF NOT EXISTS idx_customer_name ON sales(customer_name)",
                "CREATE INDEX IF NOT EXISTS idx_phone_number ON sales(phone_number)",
                "CREATE INDEX IF NOT EXISTS idx_customer_region ON sales(customer_region)",
                "CREATE INDEX IF NOT EXISTS idx_product_category ON sales(product_category)",
                "CREATE INDEX IF NOT EXISTS idx_date ON sales(date)",
                "CREATE INDEX IF NOT EXISTS idx_quantity ON sales(quantity)"
            ];
            
            indexes.forEach(idx => {
                db.run(idx, (err) => {
                    if (err) console.error("Error creating index:", err.message);
                });
            });
        }
    });
  }
});

module.exports = db;
