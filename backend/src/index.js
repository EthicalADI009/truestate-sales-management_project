const express = require('express');
const cors = require('cors');
const db = require('./utils/db');
const salesRoutes = require('./routes/salesRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));
app.use(express.json());

app.use('/api/sales', salesRoutes);

app.get('/', (req, res) => {
    res.send('TrueState Assignment Backend');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
