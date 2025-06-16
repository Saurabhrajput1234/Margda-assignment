const express = require('express');
const cors = require('cors');
const accountRoutes = require('./routes/accountRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', accountRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Something broke!'
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 