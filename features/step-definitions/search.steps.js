// Importing required modules for testing
const { Given, When, Then } = require("@wdio/cucumber-framework");

// Importing the HomePage object (page object model)
const HomePage = require("../pageobjects/home.page");

// Step to search for a product on the homepage
When(/^I search for "(.*)"$/, async (desiredSearch) => {
  // Calls the search method in the HomePage object with the desired search term
  await HomePage.search(desiredSearch);
});

// Step to verify if the search results contain the desired product
Then(/^I should see the product "(.*)"$/, async (desiredSearch) => {
  // Retrieves the title of the first product from the result page
  const expectedTitle = await $("a[class='product-item-link']").getText();

  // Compares the product title (case-insensitive) with the search term to check if it's included
  expect(expectedTitle.toLowerCase()).toContain(desiredSearch.toLowerCase());
});

// Step to verify if a "no results" message appears when no products are found
Then(
  /^I should see a message indicating that there're no results$/,
  async () => {
    try {
      // Retrieves the text of the "no results" message
      const actualMsg = await $("div[class='message notice']").getText();

      // Defines the expected message when no products are found
      const expectedMsg = "Your search returned no results.";

      // Asserts that the actual message contains the expected message
      expect(actualMsg).toContain(expectedMsg);
    } catch (error) {
      // Logs and throws an error if the expected "no results" message is not found
      console.error("Expected a (Your search returned no results) message");
      throw error;
    }
  }
);
