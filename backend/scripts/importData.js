const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const db = require('../src/utils/db');

const csvFilePath = path.resolve(__dirname, '../../truestate_assignment_dataset.csv');

// Check if CSV file exists
if (!fs.existsSync(csvFilePath)) {
    console.log('CSV file not found at:', csvFilePath);
    console.log('Skipping data import. Database will be empty.');
    process.exit(0);
}

// Wait for table creation (simple delay, or better use promise in db.js, but for script this is fine)
setTimeout(() => {
    console.log("Starting data import...");
    const results = [];

    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (data) => {
            // Map CSV headers to DB columns
            results.push({
                transaction_id: data['Transaction ID'],
                date: data['Date'],
                customer_id: data['Customer ID'],
                customer_name: data['Customer Name'],
                phone_number: data['Phone Number'],
                gender: data['Gender'],
                age: parseInt(data['Age']),
                customer_region: data['Customer Region'],
                customer_type: data['Customer Type'],
                product_id: data['Product ID'],
                product_name: data['Product Name'],
                brand: data['Brand'],
                product_category: data['Product Category'],
                tags: data['Tags'],
                quantity: parseInt(data['Quantity']),
                price_per_unit: parseFloat(data['Price per Unit']),
                discount_percentage: parseFloat(data['Discount Percentage']),
                total_amount: parseFloat(data['Total Amount']),
                final_amount: parseFloat(data['Final Amount']),
                payment_method: data['Payment Method'],
                order_status: data['Order Status'],
                delivery_type: data['Delivery Type'],
                store_id: data['Store ID'],
                store_location: data['Store Location'],
                salesperson_id: data['Salesperson ID'],
                employee_name: data['Employee Name']
            });
        })
        .on('end', () => {
            console.log(`Parsed ${results.length} rows. Inserting into DB...`);

            db.serialize(() => {
                const stmt = db.prepare(`INSERT OR IGNORE INTO sales VALUES (
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
                )`);

                db.run("BEGIN TRANSACTION");

                let count = 0;
                results.forEach(row => {
                    stmt.run(
                        row.transaction_id, row.date, row.customer_id, row.customer_name, row.phone_number,
                        row.gender, row.age, row.customer_region, row.customer_type,
                        row.product_id, row.product_name, row.brand, row.product_category, row.tags,
                        row.quantity, row.price_per_unit, row.discount_percentage, row.total_amount, row.final_amount,
                        row.payment_method, row.order_status, row.delivery_type, row.store_id, row.store_location,
                        row.salesperson_id, row.employee_name
                    );
                    count++;
                    if (count % 1000 === 0) console.log(`Inserted ${count} rows...`);
                });

                db.run("COMMIT", (err) => {
                    if (err) console.error("Transaction commit error:", err);
                    else console.log("Data import completed successfully.");
                    stmt.finalize();
                });
            });
        });
}, 2000);
