import json

# Path to your JSON file
json_file_path = "street_lamps.json"


def calculate_lighting_percentages(lamps_data):
    lighting_percentages = {}
    for street_name, lamps in lamps_data.items():
        total_lamps = len(lamps)
        on_lamps = sum(lamp["state"] == "on" for lamp in lamps)
        if total_lamps == 0:
            lighting_percentage = 0
        else:
            lighting_percentage = (on_lamps / total_lamps) * 100
        lighting_percentages[street_name] = lighting_percentage
    return lighting_percentages


# Read the data from the JSON file
with open(json_file_path, "r") as file:
    street_lamps_data = json.load(file)

# Calculate lighting percentages for all streets
all_lighting_percentages = calculate_lighting_percentages(street_lamps_data)

# Output the lighting percentage for each street
for street, percentage in all_lighting_percentages.items():
    print(f"The lighting percentage for {street} is {percentage}%")
