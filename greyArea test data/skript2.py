import requests
import json


API_KEY = "3feb9ba669cc792ee3ae1367f0599efb"
input_filename = "london_cams.json"
output_filename = "cams_gps.json"

# Define London's bounding box (approximately)
LONDON_BOUNDS = {
    "min_lat": 51.2868,
    "max_lat": 51.6919,
    "min_lng": -0.5104,
    "max_lng": 0.3340,
}


def is_within_london(lat, lng):
    return (
        LONDON_BOUNDS["min_lat"] <= lat <= LONDON_BOUNDS["max_lat"]
        and LONDON_BOUNDS["min_lng"] <= lng <= LONDON_BOUNDS["max_lng"]
    )


def get_location_coordinates(address):
    parameters = {
        "access_key": API_KEY,
        "query": address,
        "limit": 2,
        "output": "json",
        "country": "GB",  # Limit to Great Britain
    }
    response = requests.get(
        "http://api.positionstack.com/v1/forward", params=parameters
    )

    if response.status_code == 200:
        data = response.json()
        if data["data"]:
            lat = data["data"][0]["latitude"]
            lng = data["data"][0]["longitude"]
            # Check if the coordinates are within the London bounding box
            if is_within_london(lat, lng):
                return lat, lng
            else:
                print(f"Location found for {address}, but it's not within London.")
        else:
            print(f"No data found for {address}")
    else:
        print(f"Geocoding API error: {response.text}")
    return None, None


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
