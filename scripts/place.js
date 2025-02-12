document.addEventListener("DOMContentLoaded", () => {
    updateFooter();
    displayWindChill();
});

function updateFooter() {
    const currentYear = new Date().getFullYear();
    const lastModified = document.lastModified;
    document.getElementById("footer-year").textContent = currentYear;
    document.getElementById("footer-modified").textContent = lastModified;
}

function calculateWindChill(temp, windSpeed) {
    if (temp <= 10 && windSpeed > 4.8) {
        return (
            13.12 +
            0.6215 * temp -
            11.37 * Math.pow(windSpeed, 0.16) +
            0.3965 * temp * Math.pow(windSpeed, 0.16)
        ).toFixed(1) + " °C";
    } else {
        return "N/A";
    }
}

function displayWindChill() {
    const temperature = 10; // Static temperature value in Celsius
    const windSpeed = 5; // Static wind speed value in km/h
    const windChill = calculateWindChill(temperature, windSpeed);
    document.getElementById("windchill").textContent = windChill;
}