import json
import googlemaps

# Replace with your actual API key
API_KEY = "AIzaSyCAo1c_UMQLk_BpLwkxqZM3fwB-DH6azdw"

# Load your JSON file
with open("london_cams.json", "r") as file:
    cameras = json.load(file)

gmaps = googlemaps.Client(key=API_KEY)


def get_geocode(address):
    geocode_result = gmaps.geocode(address)
    if geocode_result:
        return geocode_result[0]["geometry"]["location"]
    else:
        raise ValueError(f"No results for {address}")


# Update the cameras list with coordinates
for camera in cameras:
    address = f"{camera['Location']}, {camera['Zone']}, London, UK"
    try:
        location = get_geocode(address)
        camera["GPS"] = location
    except ValueError as e:
        print(e)
        camera["GPS"] = "Not found"

# Save the updated data back to a JSON file
with open("london_cams_google.json", "w") as f:
    json.dump(cameras, f, indent=4)

print("Updated camera data with GPS saved to 'updated_london_cams.json'")
