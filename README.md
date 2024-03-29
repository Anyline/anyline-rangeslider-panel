# Range Slider Panel Plugin for Grafana

<img width="1105" alt="Screenshot 2024-01-22 at 10 26 40" src="https://github.com/Anyline/anyline-rangeslider-panel/assets/156062632/206268af-7a4c-4ebf-bf75-a607e0949db7">

## Description

The Range Slider Panel Plugin is an interactive slider component for Grafana that allows users to dynamically select a range of values to filter dashboard data. It's especially useful for creating more interactive and user-friendly dashboards. This plugin can be adapted to various data sources and supports customizing range formats, making it ideal for use with both SQL and NoSQL databases.

## Features

- Dynamic range selection for filtering dashboard data.
- Customizable range formats, including the ability to change the delimiter and range syntax (e.g., brackets).
- Easy-to-use slider interface with configurable default minimum and maximum values.
- Compatibility with various data sources, including Elasticsearch, SQL, and NoSQL databases.

## Installation

To install the Range Slider Panel Plugin, follow these steps:

1. Download the zip file of the plugin.
2. Unzip the file into your Grafana's plugin directory (default is `/var/lib/grafana/plugins`).
3. Restart the Grafana server.
4. Go to Grafana Dashboard, and you should now be able to add the Range Slider Panel to your dashboards.

## Usage

After installation, you can add the Range Slider Panel to any dashboard:

1. Edit your dashboard.
2. Add a new panel and select the Range Slider Panel from the visualization options.
3. In the panel settings, configure the following options:

   - `Variable Name`: Select the textbox type variable that will be controlled by the slider.
   - `Variable Label`: Variable label that is shown on the panel 
   - `Minimum Threshold`: Lower threshold for the variable
   - `Maximum Threshold`: Upper threshold for the variable
   - `Range Prefix`: Define a prefix for the range (e.g., '[').
   - `Range Suffix`: Define a suffix for the range (e.g., ']').
   - `Range Delimiter`: Specify a delimiter for the range (e.g., 'TO').

4. Use the slider to select the range and filter your dashboard data accordingly.

## License

This plugin is released under the [Apache 2.0 License](https://github.com/Anyline/anyline-rangeslider-panel/blob/main/LICENSE).

## Author

Anyline GmbH
