// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Feature hours mapping
const featureHours = {
    'E-commerce': {
        'Product Listing': 30,
        'Payment Integration': 25
    },
    'Social Media': {
        'User Profiles': 30,
        'Chat System': 40
    },
    'Cloud Kitchen': {
        'Menu Display': 25,
        'Online Ordering': 40
    }
};

app.post('/calculate-cost', (req, res) => {
    const { category, features } = req.body;
    let totalHours = 0;

    if (featureHours[category]) {
        features.forEach(feature => {
            totalHours += featureHours[category][feature] || 0;
        });
    }

    const totalCost = totalHours * 10; // $10/hour
    res.json({ totalCost });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
$.ajax({
    url: 'https://calculator-8ikt.onrender.com', // Update with your actual URL
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ features: selectedFeatures }),
    success: function(response) {
        $('#total-cost').text(response.total);
    },
    error: function() {
        alert('Error calculating cost. Please try again.');
    }
});
