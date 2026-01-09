// Mapping logic for the Brightness Chart
brightnessChart.data.datasets[0].data = readings.slice(-15).map(r => {
    const raw = r.brightness || 0;
    // Assuming 0-255 range from hardware; adjust 255 to 1023 if needed
    const percentage = (raw / 255) * 100; 
    return percentage.toFixed(1); 
});