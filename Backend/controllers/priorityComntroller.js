// priorityController.js

const { DecisionTreeClassifier } = require('scikit-learn');
const path = require('path');
const { createPriorityItem, getPriorityItems } = require('../services/priorityService'); // Assuming you have priority service functions

// Define the path to the model file
const MODEL_FILE_PATH = path.join(__dirname, '../model/decision_tree_model.joblib');

// Load the model from the file
const decisionTreeModel = DecisionTreeClassifier.load(MODEL_FILE_PATH);

// Controller function to get all priority items
const getPriorityItems = async (req, res) => {
  try {
    // Your logic to fetch priority items, including using the decision tree model if needed
    const prediction = decisionTreeModel.predict(data); // Assuming `data` is the input for prediction
    const priorityItems = await fetchPriorityItems(); // Assuming you have a function to fetch priority items from your database or another source
    
    // Return the priority items along with the prediction
    res.json({ priorityItems, prediction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to create a new priority item
const createPriorityItem = async (req, res) => {
  try {
    // Your logic to create a new priority item, including using the decision tree model if needed
    const prediction = decisionTreeModel.predict(data); // Assuming `data` is the input for prediction
    const newPriorityItem = await createPriorityItem(req.body); // Assuming you have a function to create a new priority item
    
    // Return the created priority item along with the prediction
    res.json({ newPriorityItem, prediction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getPriorityItems, createPriorityItem };
