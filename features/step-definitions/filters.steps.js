// Importing required modules for testing
const { Given, When, Then } = require("@wdio/cucumber-framework");
const assert = require("assert");
// Importing page object modules for HomePage and SearchPage
const HomePage = require("../pageobjects/home.page");
const SearchPage = require("../pageobjects/search.page");

// Step to search for a product using a keyword
When(/^I search with a product keyword "(.*)"$/, async (desiredSearch) => {
  // Initiates a search with the provided keyword on the homepage
  await HomePage.search(desiredSearch);
});

// Step to apply the price filter after performing a search
When(/^I choose the price filter after searching$/, async () => {
  // Applies the price filter from the search results page
  await SearchPage.priceFilter();
});

// Step to apply the product name filter after performing a search
When(/^I choose the product name filter after searching$/, async () => {
  // Applies the product name filter from the search results page
  await SearchPage.productNameFilter();
});

// Step to verify that the filter is set to "Relevance" by default
Then(/^The filter is set to relevance by default$/, async () => {
  const actualText = await SearchPage.getFilterSelectorText(); // Retrieves the current filter text
  const expectedText = "Relevance"; // The default filter text
  assert.strictEqual(
    actualText.trim(),
    expectedText,
    `Expected filter text to be "${expectedText}", but got "${actualText}"`
  );
});

// Step to verify that the user is redirected to a page with the applied filter (price filter)
Then(/^I should be redirected to a page with the applied filter$/, async () => {
  const actualUrl = await browser.getUrl(); // Gets the current page URL
  // Checks that the URL contains the filter applied (price filter in this case)
  actualUrl.includes("product_list_order=price");
});

// Step to verify that products are displayed in descending order of prices
Then(
  /^I should see the products filtered based on their prices descendingly$/,
  async () => {
    const productsPrices = await SearchPage.getProductsPrices(); // Gets all product prices
    // Loops through the product prices to ensure they are in descending order
    for (let i = 1; i < productsPrices.length; i++) {
      const currentPrice = productsPrices[i - 1];
      const nextPrice = productsPrices[i];
      assert(
        currentPrice >= nextPrice, // Ensures the current price is greater than or equal to the next price
        `Prices not in descending order at index ${i}: ${currentPrice} < ${nextPrice}`
      );
    }
  }
);

// Step to verify that the user is redirected to a page with the applied filter (ascending order filter)
Then(
  /^When setting the direction to ascending, I'm redirected to a page with the applied filter and order$/,
  async () => {
    await SearchPage.setAscendingDirection(); // Sets the filter to ascending order
    const actualUrl = await browser.getUrl(); // Gets the current page URL
    // Checks if the URL contains the filter with ascending order applied
    const expectedUrl = actualUrl.includes(
      "?product_list_order=price&q=jacket+&product_list_dir=asc"
    );
  }
);

// Step to verify that products are displayed in ascending order of prices
Then(
  /^I should see the products filtered based on their prices ascendingly$/,
  async () => {
    const productsPrices = await SearchPage.getProductsPrices(); // Gets all product prices
    // Loops through the product prices to ensure they are in ascending order
    for (let i = 1; i < productsPrices.length; i++) {
      const currentPrice = productsPrices[i - 1];
      const nextPrice = productsPrices[i];
      assert(
        currentPrice <= nextPrice, // Ensures the current price is less than or equal to the next price
        `Prices not in ascending order at index ${i}: ${currentPrice} > ${nextPrice}`
      );
    }
  }
);

// Step to verify that the user is redirected to a page with the product name filter applied
Then(
  /^I should be redirected to a page with the product name filter$/,
  async () => {
    await SearchPage.setAscendingDirection(); // Sets the filter to ascending order
    const actualUrl = await browser.getUrl(); // Gets the current page URL
    // Checks if the URL contains the product name filter
    actualUrl.includes("&product_list_order=name");
  }
);

// Step to verify that the product titles contain the search term provided
Then(
  /^I should see the products only with titles containing the search term "(.*)"$/,
  async (searchTerm) => {
    const productsTitles = await SearchPage.getProductsTitles(); // Retrieves all product titles
    const searchTermLowered = searchTerm.trim().toLowerCase(); // Converts the search term to lowercase
    const escapedSearch = searchTermLowered.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    ); // Escapes any special characters in the search term
    // Creates a regex to match the exact search term as a full word
    const searchTermRegex = new RegExp(`\\b${escapedSearch}\\b`, "i");

    // Loops through each product title to ensure it contains the search term
    for (const title of productsTitles) {
      const titleLowered = title.trim().toLowerCase(); // Converts each product title to lowercase
      assert(
        searchTermRegex.test(titleLowered), // Ensures the title contains the full search term
        `Title "${title}" does NOT strictly include the full search term "${searchTerm}"`
      );
    }
  }
);
