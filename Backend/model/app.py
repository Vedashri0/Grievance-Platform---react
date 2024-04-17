from flask import Flask, request, jsonify
from sklearn.impute import SimpleImputer
import joblib

app = Flask(__name__)

# Load your trained machine learning model
decision_tree_model = joblib.load('C:/Users/vedashri\OneDrive\Desktop\Janseva\JANSEVA---A_Public_Grievance_Platform-main (1)\JANSEVA---A_Public_Grievance_Platform-main\Backend\model\decision_tree_model.joblib')

# Define routes
@app.route('/')
def index():
    return 'Welcome to your Flask server!'

@app.route('/predict', methods=['POST'])
def predict():
    # Extract data from the request
    data = request.get_json()
    
    # Ensure that the data is in the expected format for prediction
    features = [data[' schoolCount'], data['hospitalCount'], data['upvotes'], data['time']]

    
    # Call your machine learning model to make predictions
    prediction = decision_tree_model.predict([features])
    
    # Return the prediction as JSON
    return jsonify({'prediction': prediction.tolist()})  # Convert prediction to list

@app.route("/predictions")
def predictions():
    # Call your machine learning model to make predictions
    predicted_values = decision_tree_model.predict(X_test)  # Example: Replace X_test with your input data
    # Return the predicted values as JSON
    return jsonify(predicted_values.tolist())  # Convert prediction to list




if __name__ == '__main__':
    app.run(debug=True)  # Run the Flask application in debug mode
