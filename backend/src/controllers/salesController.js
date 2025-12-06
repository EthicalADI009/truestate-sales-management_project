const salesService = require('../services/salesService');

exports.getSales = (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', sort = '', filters } = req.query;

        // Parse filters if it's a string (JSON)
        let parsedFilters = {};
        if (filters) {
            try {
                parsedFilters = JSON.parse(filters);
            } catch (e) {
                console.error("Error parsing filters:", e);
            }
        }

        salesService.getSales({
            page: parseInt(page),
            limit: parseInt(limit),
            search,
            sort,
            filters: parsedFilters
        }, (err, data) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json(data);
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
