import json
import random

json_file_path = "street_lamps.json"

# Read the existing data from the file
with open(json_file_path, "r") as file:
    street_lamps_data = json.load(file)


# Function to add a state attribute
def add_state_to_lamps(lamps_data):
    for street, lamps in lamps_data.items():
        for lamp in lamps:
            lamp["state"] = random.choice(["on", "off"])


# Add the state attribute to each lamp
add_state_to_lamps(street_lamps_data)

# Write the modified data back to the file
with open(json_file_path, "w") as file:
    json.dump(street_lamps_data, file, indent=4)

print(f"Updated street lamp data with 'state' attribute saved to '{json_file_path}'")
