# 📱 Device Info

Device information display showing hardware details and memory statistics.

## Features

- **Device Information Display** showing name, board, model, and battery status
- **Memory Statistics** with detailed RAM and PSRAM usage information
- **Auto-refresh** updates information every 5 seconds
- **Manual Refresh** capability with Select button
- **Responsive Design** that adapts to different display sizes

## Controls

- **Next Button**: Navigate to next information page
- **Previous Button**: Navigate to previous information page
- **Select Button**: Manually refresh current page
- **Exit/ESC**: Close the application

## Information Pages

### Page 1: Basic Device Info

- Device Name
- Board Type
- Model Information
- Battery Charge Percentage

### Page 2: Memory Statistics

- RAM Free (available memory)
- RAM Size (total memory)
- RAM Min Free (minimum free memory recorded)
- PSRAM Free (external RAM available)
- PSRAM Size (total external RAM)

## Usage

1. Run the script on your Bruce device
2. The device info page will display automatically
3. Use Next/Previous buttons to navigate between pages
4. Information refreshes automatically every 5 seconds
5. Press Select to manually refresh current page
6. Press Exit to close the application

## Installation

Place the `Device Info.js` file in your Bruce device's `/scripts` directory and run it through the `JS Interpreter` menu.
