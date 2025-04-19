// Importing required modules for testing
const { Given, When, Then, Before } = require("@wdio/cucumber-framework");
const assert = require("assert");

// Importing the page objects (page object model)
const HomePage = require("../pageobjects/home.page");
const SearchPage = require("../pageobjects/search.page");
const WhatsNewPage = require("../pageobjects/whatsnew.page");
const CartPreviewPage = require("../pageobjects/cartpreview.page");
const ShippingPage = require("../pageobjects/shipping.page");

// Step: Navigate to the shipping page
Given(/^I'm on the shipping page$/, async () => {
  // Open the shipping page of the checkout process
  await browser.url(
    "https://magento.softwaretestingboard.com/checkout/#shipping"
  );
});

// Step: Navigate to the payments page
Given(/^I'm on the payements page$/, async () => {
  // Open the payments page of the checkout process
  await browser.url(
    "https://magento.softwaretestingboard.com/checkout/#payment"
  );
});

// Step: Click on the "Proceed to Checkout" button
When(/^click on the proceed to checkout button$/, async () => {
  // Click on the proceed to checkout button
  await CartPreviewPage.clickOnProceedToCheckOutButton();
});

// Step: Fill in all fields with valid data and click the next button
When(
  /^I fill all the fields with valid data and click next button:$/,
  async (table) => {
    // Convert table rows into an object with field names and corresponding values
    const data = table.rowsHash();

    // Fill the shipping fields using the provided data
    await ShippingPage.fillShippingFields(data);

    // Pause for UI interaction (if necessary)
    await browser.pause(3000);

    // Click the next button to proceed in the checkout process
    await ShippingPage.clickOnNextButton();
  }
);

// Step: Click on the "Place Order" button
When(/^I click on the place order button$/, async () => {
  // Click on the "Place Order" button to finalize the checkout
  await ShippingPage.cickOnPlaceOrderButton();

  // Pause to simulate the delay for the order placement
  await browser.pause(3000);
});

// Step: Fill in all fields except for the email field with valid data
When(
  /^I fill all the fields with valid data EXCEPT for the email field:$/,
  async (table) => {
    // Convert table rows into an object with field names and corresponding values
    const data = table.rowsHash();

    // Fill the shipping fields with data except for the email
    await ShippingPage.fillShippingFields(data);

    // Pause to simulate the delay for the UI
    await browser.pause(3000);

    // Click the next button to proceed
    await ShippingPage.clickOnNextButton();
  }
);

// Step: Verify that user is redirected to the shipping page
Then(/^I should be redirected to the shipping page$/, async () => {
  // Pause to simulate the delay for the page load
  await browser.pause(3000);

  // Check if the shipping page title is displayed correctly
  const actualTitle = await ShippingPage.isShippingPageTitleDisplayed();

  // Assert that the page title is correct
  assert.strictEqual(actualTitle, "Shipping Address");
});

// Step: Verify that user is redirected to the payments page
Then(/^I should be redirected to the payements page$/, async () => {
  // Pause for a short moment to simulate page load
  await browser.pause(1000);

  // Get the current URL of the page
  const actualUrl = await browser.getUrl();

  // Assert that the current URL is the payments page URL
  assert.strictEqual(
    actualUrl,
    "https://magento.softwaretestingboard.com/checkout/#payment"
  );
});

// Step: Verify that user is redirected to a page confirming successful order placement
Then(
  /^I should be redirected a page of a successful order placement$/,
  async () => {
    // Pause to simulate the delay
    await browser.pause(1000);

    // Get the current URL of the page
    const actualUrl = await browser.getUrl();

    // Assert that the current URL is the success page URL
    assert.strictEqual(
      actualUrl,
      "https://magento.softwaretestingboard.com/checkout/onepage/success/"
    );
  }
);

// Step: Verify that a success message about order confirmation is shown
Then(/^I should see a message about order confirmation$/, async () => {
  // Pause to simulate the delay for the UI
  await browser.pause(3000);

  // Get the success message displayed after the order is placed
  const actualMsg = await ShippingPage.getOrderPlacementSuccessMsg();

  // Assert that the success message is correct
  assert.strictEqual(
    actualMsg,
    "We'll email you an order confirmation with details and tracking info."
  );
});

// Step: Verify that the order ID is displayed
Then(/^I should see the order id$/, async () => {
  // Ensure the order ID is visible after the order is placed
  await ShippingPage.isOrderIdDisplayed();
});

// Step: Verify that an error message is displayed for an invalid email address
Then(
  /^I should see an error message under the email address field$/,
  async () => {
    // Pause to simulate the delay for UI loading
    await browser.pause(3000);

    // Get the error message under the email address field
    const actualMsg = await ShippingPage.getInvalidEmailErrorMsg();

    // Assert that the email error message is correct
    assert.strictEqual(
      actualMsg,
      "Please enter a valid email address (Ex: johndoe@domain.com)."
    );
  }
);
