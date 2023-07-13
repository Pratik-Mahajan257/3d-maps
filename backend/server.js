const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  next();
});

// Endpoint to capture and return the map image
app.get('/api/map/image', async (req, res) => {
  try {
    // Launch a headless Chrome browser with Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the viewport size and navigate to the map page
    await page.setViewport({ width: 800, height: 600 });
    await page.goto('https://www.example.com'); // Replace with your map URL

    // Capture a screenshot of the map viewport
    const screenshot = await page.screenshot({ type: 'png' });

    // Close the browser
    await browser.close();

    // Send the image data as the response
    res.setHeader('Content-Type', 'image/png');
    res.send(screenshot);
  } catch (error) {
    console.log('Error capturing map image:', error);
    res.status(500).send('An error occurred');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
