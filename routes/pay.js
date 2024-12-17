const router = require("express").Router();
const playwright = require('playwright');

let browser; // Browser instance
let context; // Browser context

// Function to initialize the browser once
async function initializeBrowser() {
    if (!browser) {
        browser = await playwright.chromium.launch({
            headless: true, // Keep it headless for performance
        });
        context = await browser.newContext(); // Single context shared across pages
        console.log("Browser initialized!");
    }
}

// Function to load the URL and click the submit button
async function loadAndSubmit(url) {
    const page = await context.newPage(); // Create a new page
    try {
        await page.goto(url, { timeout: 10000 }); // Set timeout for navigation
        const submitButtonSelector = 'button[type="submit"]';

        // Wait for the submit button and click it
        await page.waitForSelector(submitButtonSelector, { timeout: 5000 });
        await page.click(submitButtonSelector);

        console.log("Submit button clicked successfully:", url);
    } catch (error) {
        console.error("Error processing URL:", url, error.message);
    } finally {
        await page.close(); // Clean up the page after processing
    }
}

// Route to receive URL from Biva app
router.post('/submit-url', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        await initializeBrowser(); // Ensure the browser is running
        loadAndSubmit(url); // Process the URL in the background
        res.status(200).json({ message: "URL submitted for payment processing" });
    } catch (error) {
        console.error("Error in POST /submit-url:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

//test app
router.get("/home", (req, res) => {
    console.log(" --- Route accessed --- ")
    res.status(200).send("BivaPay | We are home to everything great!");
});
//

// Gracefully close the browser on server shutdown
process.on('SIGINT', async () => {
    if (browser) {
        await browser.close();
        console.log("Browser closed!");
    }
    process.exit(0);
});

module.exports = router;
