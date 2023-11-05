import requests
import json

# Replace with the actual date you want to query for
date = "2023-06"

# An array of (latitude, longitude) tuples
locations = [
    (51.603935, -0.185761),
    (51.604401, -0.186475),
    (51.605018, -0.186067),
    (51.604828, -0.187301),
    (51.605141, -0.188250),
    (51.604286, -0.189315),
    (51.604366, -0.190554)
    # Add more (latitude, longitude) tuples as needed
]


# Function to fetch crime data for a given location and date
def fetch_crime_data(date, lat, lng):
    base_url = "https://data.police.uk/api/crimes-at-location"
    params = {"date": date, "lat": lat, "lng": lng}
    response = requests.get(base_url, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to retrieve data: {response.status_code}")
        return None


# Dictionary to hold crime data for all locations
all_crime_data = {}

# Fetch and store crime data for each location
for lat, lng in locations:
    crimes = fetch_crime_data(date, lat, lng)
    if crimes is not None:
        all_crime_data[f"{lat},{lng}"] = crimes

# Do something with the fetched crime data
# For example, save to a JSON file
with open("crime_data.json", "w") as f:
    json.dump(all_crime_data, f, indent=4)

print("Crime data has been saved to 'crime_data.json'")
