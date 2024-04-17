import requests
import json

# Define the URL of your Flask server
url = 'http://127.0.0.1:5000/predict'

# Prepare the JSON data
data = {
    ' schoolCount': 20,
    'hospitalCount': 30,
    'upvotes': 40,
    'time': '(6 to 9)'
}

# Convert the data to JSON format
json_data = json.dumps(data)

# Send the POST request
response = requests.post(url, json=json_data)

# Print the response
print(response.text)
