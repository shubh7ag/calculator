// frontend/src/App.js
import React, { useState } from 'react';
import axios from 'axios';

const categories = ['E-commerce', 'Social Media', 'Cloud Kitchen'];
const featuresMap = {
    'E-commerce': ['Product Listing', 'Payment Integration'],
    'Social Media': ['User Profiles', 'Chat System'],
    'Cloud Kitchen': ['Menu Display', 'Online Ordering']
};

function App() {
    const [category, setCategory] = useState('');
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [totalCost, setTotalCost] = useState(0);

    const handleFeatureChange = (event) => {
        const { value, checked } = event.target;
        setSelectedFeatures(prev =>
            checked ? [...prev, value] : prev.filter(feature => feature !== value)
        );
    };

    const calculateCost = async () => {
        if (!category || selectedFeatures.length === 0) {
            alert("Please select a category and at least one feature.");
            return;
        }
        const response = await axios.post('http://localhost:5000/calculate-cost', {
            category,
            features: selectedFeatures
        });
        setTotalCost(response.data.totalCost);
    };

    return (
        <div className="container">
            <h1>App Cost Calculator</h1>
            <select onChange={(e) => setCategory(e.target.value)} value={category}>
                <option value="">Select Category</option>
                {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>

            {category && (
                <div>
                    {featuresMap[category].map(feature => (
                        <div key={feature}>
                            <input
                                type="checkbox"
                                value={feature}
                                onChange={handleFeatureChange}
                            />
                            {feature}
                        </div>
                    ))}
                </div>
            )}

            <button onClick={calculateCost}>Calculate Cost</button>
            <h2>Total Cost: ${totalCost}</h2>
        </div>
    );
}

export default App;
