import json
import googlemaps
from googlemaps.convert import decode_polyline
import random

import numpy as np


def interpolate_points(p1, p2, division_factor=10):
    """Interpolate points between two coordinates."""
    latitudes = np.linspace(p1["lat"], p2["lat"], division_factor)
    longitudes = np.linspace(p1["lng"], p2["lng"], division_factor)
    return [{"lat": lat, "lng": lng} for lat, lng in zip(latitudes, longitudes)]


def enhanced_route(route, division_factor=10):
    """Increase the number of points along the route."""
    enhanced_route = []
    for i in range(len(route) - 1):
        enhanced_route.extend(
            interpolate_points(route[i], route[i + 1], division_factor)
        )
    enhanced_route.append(route[-1])  # Ensure the last point is added
    return enhanced_route


# Replace with your actual API key
API_KEY = "AIzaSyCAo1c_UMQLk_BpLwkxqZM3fwB-DH6azdw"

# streets = {
#     "4 Parkside, Finchley, London": "12-2 Parkside, Finchley, London",
#     "37-45 The Ridgeway, Finchley, London": "7 The Ridgeway,Finchley,London",
#     "24 Willow Way, Finchley,London": "1 Willow Way,Finchley,London",
#     "24-2 St Paul's Way,Finchley,London": "15A Long Ln, Church End,Finchley,London",
#     "42a Long Ln,Finchley,London": "116 Ballards Ln, Finchley, London",
#     "116 Ballards Ln, Finchley, London": "88 Ballards Ln, Finchley, London",
#     "94 Ballards Ln,Finchley,London": "17a Falkland Ave,Finchley,London",
#     "17a Falkland Ave, Finchley, London": "Lovers Walk, Finchley, London",
# }

streets = {
    "116 Ballards Ln, Finchley, London": "177 Ballards Ln, Finchley, London",
    "170B Ballards Ln, Finchley, London": "15a St Paul's Way, Finchley, London",
}

gmaps = googlemaps.Client(key=API_KEY)


def get_route(start_address, end_address):
    directions_result = gmaps.directions(start_address, end_address)[0]
    polyline = directions_result["overview_polyline"]["points"]
    return decode_polyline(polyline)


def place_lamps_on_route(route, number_of_lamps):
    print(len(route))
    if len(route) < number_of_lamps:
        raise ValueError(
            "The route does not have enough points to place the number of requested lamps."
        )
    interval = max(len(route) // number_of_lamps, 1)
    lamp_positions = []
    for i in range(number_of_lamps):
        index = min(i * interval, len(route) - 1)
        lamp_positions.append(route[index])
    return lamp_positions


street_lamps_data = {}

for start_point, end_point in streets.items():
    route = get_route(start_point, end_point)
    route_with_more_points = enhanced_route(route, division_factor=10)
    number_of_lamps = random.randint(7, 11)
    street_lamps_data[start_point] = place_lamps_on_route(
        route_with_more_points, number_of_lamps
    )

# Save the street lamp coordinates to a JSON file
with open("street_lamps_accurate.json", "w") as f:
    json.dump(street_lamps_data, f, indent=4)

print("Accurate street lamp data saved to 'street_lamps_accurate.json'")

# def place_lamps_on_route(route):
#     number_of_lamps = random.randint(10, 15)
#     interval = len(route) // number_of_lamps
#     return [route[i * interval] for i in range(number_of_lamps)]


# street_lamps_data = {}

# for start_point, end_point in streets.items():
#     route = get_route(start_point, end_point)
#     street_lamps_data[start_point] = place_lamps_on_route(route)

# # Save the street lamp coordinates to a JSON file
# with open("street_lamps_accurate.json", "w") as f:
#     json.dump(street_lamps_data, f, indent=4)

# print("Accurate street lamp data saved to 'street_lamps_accurate.json'")
