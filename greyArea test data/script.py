import requests
import json

# Your original JSON file with the camera data
API_KEY = "3feb9ba669cc792ee3ae1367f0599efb"
input_filename = "london_cams.json"
output_filename = "cameras_with_gps.json"


# Function to get the coordinates using Positionstack API
def get_location_coordinates(address):
    parameters = {
        "access_key": API_KEY,
        "query": address,
        "limit": 1,  # Assuming you want the most relevant result
        "output": "json",
    }
    response = requests.get(
        "http://api.positionstack.com/v1/forward", params=parameters
    )

    if response.status_code == 200:
        data = response.json()
        if data["data"]:
            # We take the first result (most relevant one usually)
            return data["data"][0]["latitude"], data["data"][0]["longitude"]
    else:
        print(f"Geocoding API error: {response.text}")
    return None, None


# Read the input JSON file
with open(input_filename, "r") as file:
    cameras = json.load(file)

# Geocode each camera's location
for camera in cameras:
    address = camera["Location"]  # Make sure this matches your JSON key for location
    lat, lng = get_location_coordinates(address)
    if lat and lng:
        camera["gps"] = {"latitude": lat, "longitude": lng}
    else:
        print(f"No GPS coordinates found for location: {address}")

# Write the updated data to a new JSON file
with open(output_filename, "w") as file:
    json.dump(cameras, file, indent=4)

print(f"Updated camera data saved to {output_filename}")
