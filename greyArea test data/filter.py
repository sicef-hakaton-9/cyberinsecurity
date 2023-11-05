import json


def filter_json_by_gps(input_filename, output_filename):
    # Load the data from the input file
    with open(input_filename, "r") as file:
        data = json.load(file)

    # Check if the data is a list, as we expect a list of objects
    if not isinstance(data, list):
        raise ValueError("JSON data is not a list")

    # Filter objects that have a 'gps' key
    filtered_data = [obj for obj in data if "gps" in obj]

    # Write the filtered data to the output file
    with open(output_filename, "w") as file:
        json.dump(filtered_data, file, indent=4)

    print(f"Filtered JSON has been written to {output_filename}")


# Usage
input_filename = "cams_gps.json"
output_filename = "filter.json"
filter_json_by_gps(input_filename, output_filename)
