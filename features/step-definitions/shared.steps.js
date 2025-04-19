// Importing required modules for testing
const { Given, When } = require("@wdio/cucumber-framework");

// Importing the HomePage and CartPreviewPage objects (page object model)
const HomePage = require("../pageobjects/home.page");
const CartPreviewPage = require("../pageobjects/cartpreview.page");

// Step: Visit the homepage and verify the main banner is present
Given(/^I am on the homepage$/, async () => {
  // Navigate to the homepage of the site
  await browser.url("https://magento.softwaretestingboard.com");

  // Ensure the main banner on the homepage is loaded
  await HomePage.getMainBanner();
});

// Step: Visit the "What's New" page
Given(/^I am on the what's new page$/, async () => {
  // Pause for a moment to simulate a delay (could be useful for page loading)
  await browser.pause(1000);

  // Navigate to the "What's New" page
  await browser.url(
    "https://magento.softwaretestingboard.com/what-is-new.html"
  );
});

// Step: Click on the cart icon to view the cart preview
When(/^I click on the cart icon$/, async () => {
  // Pause for a moment to simulate a delay (could be useful for UI interactions)
  await browser.pause(1000);

  // Click the cart icon to open the cart preview
  await CartPreviewPage.clickOnCartIcon();
});
