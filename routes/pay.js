const router = require("express").Router();
const playwright = require('playwright');  // Import Playwright

//function to run the url and click the submit button
async function loadAndSubmit(url) {
  // Launch a headless browser
  const browser = await playwright.chromium.launch();  // You can choose 'chromium', 'firefox', or 'webkit'
  const page = await browser.newPage();

  try {
    // Navigate to the URL
    await page.goto(url);

    // Wait for the submit button to appear (adjust the selector as needed)
    const submitButtonSelector = 'button[type="submit"]'; // Update the selector if necessary
    //
    await page.waitForSelector(submitButtonSelector);

    // Click the submit button
    await page.click(submitButtonSelector);

    console.log("Submit button clicked successfully!");

  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the browser
    await browser.close();
  }
}


//route to receive url from Biva app

router.post('/submit-url', async (req, res) => {
  //
  const url = req.body.url;  // Replace with the URL you want to interact with
  //
  try {
    //load url
    //
    loadAndSubmit(url);

    //end ===
    res.status(200).send("URL submitted for payment processing");
    //
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("An error occurred");
  }
});

//
module.exports = router;
