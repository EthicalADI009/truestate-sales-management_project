const db = require('../utils/db');

exports.getSales = ({ page, limit, search, sort, filters }, callback) => {
    const offset = (page - 1) * limit;
    let query = "SELECT * FROM sales";
    let countQuery = "SELECT COUNT(*) as total FROM sales";
    let conditions = [];
    let params = [];

    // Search
    if (search) {
        conditions.push("(customer_name LIKE ? OR phone_number LIKE ?)");
        params.push(`%${search}%`, `%${search}%`);
    }

    // Filters
    if (filters) {
        // Multi-select filters (arrays)
        if (filters.customer_region && filters.customer_region.length > 0) {
            const placeholders = filters.customer_region.map(() => '?').join(',');
            conditions.push(`customer_region IN (${placeholders})`);
            params.push(...filters.customer_region);
        }
        if (filters.gender && filters.gender.length > 0) {
            const placeholders = filters.gender.map(() => '?').join(',');
            conditions.push(`gender IN (${placeholders})`);
            params.push(...filters.gender);
        }
        if (filters.product_category && filters.product_category.length > 0) {
            const placeholders = filters.product_category.map(() => '?').join(',');
            conditions.push(`product_category IN (${placeholders})`);
            params.push(...filters.product_category);
        }
        if (filters.payment_method && filters.payment_method.length > 0) {
            const placeholders = filters.payment_method.map(() => '?').join(',');
            conditions.push(`payment_method IN (${placeholders})`);
            params.push(...filters.payment_method);
        }

        // Range filters
        if (filters.age_min !== undefined && filters.age_max !== undefined) {
            conditions.push("age BETWEEN ? AND ?");
            params.push(filters.age_min, filters.age_max);
        }

        if (filters.date_start && filters.date_end) {
            conditions.push("date BETWEEN ? AND ?");
            params.push(filters.date_start, filters.date_end);
        }

        // Tags (partial match for each tag selected? Or exact match? Assignment says "Multi-select")
        // Tags in DB are "tag1,tag2".
        // If filter is ["tag1"], we need `tags LIKE '%tag1%'`.
        // If multiple tags, usually OR or AND. Let's assume OR for now (contains any of the selected tags).
        if (filters.tags && filters.tags.length > 0) {
            const tagConditions = filters.tags.map(() => "tags LIKE ?").join(' OR ');
            conditions.push(`(${tagConditions})`);
            filters.tags.forEach(tag => params.push(`%${tag}%`));
        }
    }

    if (conditions.length > 0) {
        const whereClause = " WHERE " + conditions.join(" AND ");
        query += whereClause;
        countQuery += whereClause;
    }

    // Sorting
    if (sort) {
        // sort format: "field:order" e.g. "date:desc"
        const [field, order] = sort.split(':');
        const validFields = ['date', 'quantity', 'customer_name', 'price_per_unit', 'total_amount'];
        const validOrders = ['asc', 'desc'];

        if (validFields.includes(field) && validOrders.includes(order?.toLowerCase())) {
            query += ` ORDER BY ${field} ${order.toUpperCase()}`;
        } else {
            // Default sort
            query += " ORDER BY date DESC";
        }
    } else {
        query += " ORDER BY date DESC";
    }

    // Pagination
    query += " LIMIT ? OFFSET ?";
    const queryParams = [...params, limit, offset];

    // Execute
    db.get(countQuery, params, (err, row) => {
        if (err) return callback(err);
        const total = row.total;

        db.all(query, queryParams, (err, rows) => {
            if (err) return callback(err);
            callback(null, {
                data: rows,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit)
                }
            });
        });
    });
};
