// Import required modules for display, keyboard, and device functionality
const display = require("display");
const keyboard = require("keyboard");
const device = require("device");

// Define color palette for the device info display
// Colors are defined using RGB values (red, green, blue)
const colours = [
    display.color(0, 0, 0),       // black - used for background
    display.color(127, 127, 127), // grey - used for labels
    display.color(255, 255, 255), // white - used for values
    display.color(255, 255, 0),   // yellow - used for highlights
];

// Application state variables
var currentPage = 0;    // Current page being displayed
var totalPages = 2;     // Total number of info pages
var exitApp = false;    // Controls main application loop
var refreshInterval = 0; // Counter for auto-refresh

// Get display dimensions for responsive layout
const displayWidth = display.width();
const displayHeight = display.height();
// Scale font size based on display width (larger screens get bigger fonts)
const fontScale = (displayWidth > 300 ? 1 : 0);

// Show the initial device info screen
displayDeviceInfo();

/**
 * Displays basic device information (page 0)
 */
function displayBasicInfo() {
    // Clear screen with black background
    display.fill(colours[0]);
    // Left-align text for better readability
    display.setTextAlign('left', 'middle');

    // Display page title
    display.setTextSize(2 + fontScale);
    display.setTextColor(BRUCE_PRICOLOR);
    display.drawText("Device Info", 10, 12);

    // Display basic device information
    display.setTextSize(1 + fontScale);
    display.setTextColor(colours[1]);
    var y = 25 + fontScale * 10;

    display.drawText("Name:", 10, y);
    display.setTextColor(colours[2]);
    display.drawText(device.getName(), displayWidth / 3 + 10, y);

    y += 12 + fontScale * 5;
    display.setTextColor(colours[1]);
    display.drawText("Board:", 10, y);
    display.setTextColor(colours[2]);
    display.drawText(device.getBoard(), displayWidth / 3 + 10, y);

    y += 12 + fontScale * 5;
    display.setTextColor(colours[1]);
    display.drawText("Model:", 10, y);
    display.setTextColor(colours[2]);
    display.drawText(device.getModel(), displayWidth / 3 + 10, y);

    y += 12 + fontScale * 5;
    display.setTextColor(colours[1]);
    display.drawText("Battery:", 10, y);
    display.setTextColor(colours[3]);
    display.drawText(device.getBatteryCharge() + "%", displayWidth / 3 + 10, y);

    // Display navigation info
    display.setTextSize(1 + fontScale);
    display.setTextAlign('left', 'middle');
    display.setTextColor(colours[1]);
    display.drawText("Next: Memory Info", 10, displayHeight - 42 - fontScale * 5);
    display.drawText("Exit: Close", 10, displayHeight - 25 - fontScale * 5);

    // Display author credit in white at bottom
    display.setTextSize(1 + fontScale);
    display.setTextAlign('center', 'middle');
    display.setTextColor(colours[2]);
    display.drawText("By github.com/emericklaw", displayWidth / 2, displayHeight - 5 - fontScale * 5);

}

/**
 * Displays memory information (page 1)
 */
function displayMemoryInfo() {
    // Clear screen with black background
    display.fill(colours[0]);
    // Left-align text for better readability
    display.setTextAlign('left', 'middle');

    // Display page title
    display.setTextSize(2 + fontScale);
    display.setTextColor(BRUCE_PRICOLOR);
    display.drawText("Memory Info", 10, 12);

    // Get memory statistics
    const memoryStats = device.getFreeHeapSize();

    // Display memory information
    display.setTextSize(1 + fontScale);
    display.setTextAlign('left', 'middle');
    display.setTextColor(colours[1]);
    var y = 25 + fontScale * 10;

    display.drawText("RAM Free:", 10, y);
    display.setTextAlign('right', 'middle');
    display.setTextColor(colours[2]);
    display.drawText(formatBytes(memoryStats.ram_free), displayWidth / 8 * 7, y);

    y += 12 + fontScale * 5;
    display.setTextAlign('left', 'middle');
    display.setTextColor(colours[1]);
    display.drawText("RAM Size:", 10, y);
    display.setTextAlign('right', 'middle');
    display.setTextColor(colours[2]);
    display.drawText(formatBytes(memoryStats.ram_size), displayWidth / 8 * 7, y);

    y += 12 + fontScale * 5;
    display.setTextAlign('left', 'middle');
    display.setTextColor(colours[1]);
    display.drawText("RAM Min Free:", 10, y);
    display.setTextAlign('right', 'middle');
    display.setTextColor(colours[2]);
    display.drawText(formatBytes(memoryStats.ram_min_free), displayWidth / 8 * 7, y);

    y += 12 + fontScale * 5;
    display.setTextAlign('left', 'middle');
    display.setTextColor(colours[1]);
    display.drawText("PSRAM Free:", 10, y);
    display.setTextAlign('right', 'middle');
    display.setTextColor(colours[2]);
    display.drawText(formatBytes(memoryStats.psram_free), displayWidth / 8 * 7, y);

    y += 12 + fontScale * 5;
    display.setTextAlign('left', 'middle');
    display.setTextColor(colours[1]);
    display.drawText("PSRAM Size:", 10, y);
    display.setTextAlign('right', 'middle');
    display.setTextColor(colours[2]);
    display.drawText(formatBytes(memoryStats.psram_size), displayWidth / 8 * 7, y);

    // Display navigation info
    display.setTextSize(1 + fontScale);
    display.setTextAlign('left', 'middle');
    display.setTextColor(colours[1]);
    display.drawText("Next: Device Info", 10, displayHeight - 42 - fontScale * 5);
    display.drawText("Exit: Close", 10, displayHeight - 25 - fontScale * 5);

    // Display author credit in white at bottom
    display.setTextSize(1 + fontScale);
    display.setTextAlign('center', 'middle');
    display.setTextColor(colours[2]);
    display.drawText("By github.com/emericklaw", displayWidth / 2, displayHeight - 5 - fontScale * 5);

}

/**
 * Helper function to format bytes into readable units
 */
function formatBytes(bytes) {
    if (bytes === 0) return '0.0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i];
}

/**
 * Main display function that shows the current page
 */
function displayDeviceInfo() {
    if (currentPage === 0) {
        displayBasicInfo();
    } else if (currentPage === 1) {
        displayMemoryInfo();
    }
}

// Main application loop - continues until exitApp becomes true
while (!exitApp) {
    // Check for exit button press (ESC key)
    if (keyboard.getEscPress()) {
        exitApp = true;
        break;
    }

    // Handle Next button press - go to next page
    if (keyboard.getNextPress()) {
        currentPage++;
        if (currentPage >= totalPages) {
            currentPage = 0;  // Wrap around to first page
        }
        displayDeviceInfo();
    }

    // Handle Previous button press - go to previous page
    if (keyboard.getPrevPress()) {
        currentPage--;
        if (currentPage < 0) {
            currentPage = totalPages - 1;  // Wrap around to last page
        }
        displayDeviceInfo();
    }

    // Handle Select button press - refresh current page
    if (keyboard.getSelPress()) {
        displayDeviceInfo();
    }

    // Auto-refresh every 5 seconds (100 * 50ms = 5000ms)
    refreshInterval++;
    if (refreshInterval >= 100) {
        displayDeviceInfo();
        refreshInterval = 0;
    }

    // Small delay to prevent excessive CPU usage and button bouncing
    delay(50);
}
