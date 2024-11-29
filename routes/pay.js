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

//test app
router.get("/home", (req, res) => {
  console.log(" --- Route accessed --- ")
  res.status(200).send("BivaPay | We are home to everything great!");
});


//route to receive url from Biva app

router.post('/submit-url', async (req, res) => {
  //
  const { url } = req.body;

  console.log(url);

  if (!url) {
    // If the URL is missing, respond with an error
    return res.status(400).json({ error: 'URL is required' });
  } else {

    //load url
    //
    loadAndSubmit(url);

    //end ===
    res.status(200).send("URL submitted for payment processing");
    //
  }
});

//
module.exports = router;
