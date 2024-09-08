# Changelog

All notable changes to the "Range Slider Panel" plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.4] - 2024-09-08

- Use custom range slider

## [1.2.3] - 2024-07-17

- Update error messages

## [1.2.2] - 2024-07-16

- Handle negative values for minimum and maximum thresholds

## [1.2.1] - 2024-07-16

- Fix panel crashing when max value is less than min value
- Add test case to find min and max values

## [1.1.12] - 2024-04-29

- Fix panel crashing when selected variable value is undefined
- Fix plugin chosing "TO" as default delimiter, when delimiter field is empty

## [1.1.11] - 2024-02-12

- Add sign plugin step in github workflow

## [1.1.1] - 2024-01-23

- Fix min and max threshold not being displayed
- Add screenshot to plugin.json

## [1.1.0] - 2024-01-23

- Allow only variables of type `textbox` to be selected
- Remove default min and max values and use the values from the current variable value
- Fix the bug where setting min and max values above the threshold crashed the panel
- Add `delimiterSpace` variable to allow adding/removing space before and after the delimeter

## [1.0.1] - 2024-01-18

- Add default prefix, delimiter and suffix if it is not defined
- Allow select of variable from options

## [1.0.0] - 2024-01-08

- Initial release of the Range Slider Panel plugin.
- Dynamic range slider for selecting value ranges.
- Customizable range delimiter, prefix, and suffix for different query languages.
- Options for setting default minimum and maximum values of the slider.
