// const express = require("express");
// const { getComplaintsAdmin, assignWorkerToAComplaint, updateComplaintStatus } = require("../controllers/adminController");

// const router = express.Router();

// // router.use(requireAuth);
// router.get("/complaints", getComplaintsAdmin);
// router.patch("/complaints/:complaintId/assign", assignWorkerToAComplaint);
// router.patch("/complaints/:complaintId/status", updateComplaintStatus);


// admin.js

// Define a function to fetch data from the Flask server
// async function fetchDataFromServer() {
//     try {
//         const response = await fetch('/predict', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 // Provide input data for prediction if required
//             })
//         });

//         if (!response.ok) {
//             throw new Error('Failed to fetch data from server');
//         }

//         const data = await response.json();
//         return data.predicted_values; // Assuming predicted_values is returned by Flask

//     } catch (error) {
//         console.error('Error fetching data from server:', error);
//         return null;
//     }
// }

// // Call the function to fetch data and update the table
// async function updateTable() {
//     const predictedValues = await fetchDataFromServer();

//     if (predictedValues) {
//         const tableBody = document.querySelector('tbody');
//         predictedValues.forEach(value => {
//             const row = document.createElement('tr');
//             row.innerHTML = `<td>Value 1</td><td>Value 2</td><td>${value}</td>`;
//             tableBody.appendChild(row);
//         });
//     } else {
//         // Handle error or display a message
//     }
// }

// // Call the function to update the table when the page loads
// window.addEventListener('DOMContentLoaded', updateTable);



// module.exports = router;



// admin.js

const express = require("express");
const fetch = require("node-fetch"); // Assuming you have installed node-fetch
const router = express.Router();
const axios = require("axios");

// Define a function to fetch data from the Flask server
async function fetchDataFromServer() {
    try {
        const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // Provide input data for prediction if required
            })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data from server');
        }

        const data = await response.json();
        return data.predicted_values; // Assuming predicted_values is returned by Flask

    } catch (error) {
        console.error('Error fetching data from server:', error);
        return null;
    }
}

// Call the function to fetch data and update the table
async function updateTable() {
    const predictedValues = await fetchDataFromServer();

    if (predictedValues) {
        const tableBody = document.querySelector('tbody');
        // Clear existing rows
        tableBody.innerHTML = '';
        predictedValues.forEach(value => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>Value 1</td><td>Value 2</td><td>${value}</td>`;
            tableBody.appendChild(row);
        });
    } else {
        // Handle error or display a message
    }
}

// Call the function to update the table when the page loads
window.addEventListener('DOMContentLoaded', updateTable);



// Route to fetch data from Flask server
router.get("/predictions", async (req, res) => {
    try {
        // Make a GET request to your Flask server
        const response = await axios.get("http://localhost:5000/predictions");
        // Extract predicted values from the response
        const predictedValues = response.data;
        // Send the predicted values as a response
        res.json(predictedValues);
    } catch (error) {
        console.error("Error fetching predictions from Flask server:", error);
        res.status(500).json({ error: "Failed to fetch predictions" });
    }
});

module.exports = router;
