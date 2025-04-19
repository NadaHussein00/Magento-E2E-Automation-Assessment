const { Given, When, Then } = require("@wdio/cucumber-framework");
const assert = require("assert");
// Import page objects for interaction with different pages
const HomePage = require("../pageobjects/home.page");
const SearchPage = require("../pageobjects/search.page");
const WhatsNewPage = require("../pageobjects/whatsnew.page");
const CartPreviewPage = require("../pageobjects/cartpreview.page");

let totalItemsInCart = 0;
let productNamesInCart = [];

// Action for clicking on the 'Add to Cart' button for a specific product
When(
  /^I click on the add to cart button for the "(.*)" product$/,
  async (productName) => {
    await WhatsNewPage.addProductToCart(productName); // Add product to cart
    // await browser.pause(1000); // Optional pause (for debugging)
    productNamesInCart.push(productName); // Add product to the cart list
  }
);

// Action for clicking the 'Delete' button for a specific product in the cart
When(
  /^I click on the delete button for the "(.*)" product$/,
  async (productName) => {
    await CartPreviewPage.deleteAProduct(productName); // Delete product from cart
  }
);

// Action for updating the quantity of a product in the cart
When(
  /^I type (-?\d+) in the qty field of the "([^"]+)" product$/,
  async (qty, productName) => {
    await CartPreviewPage.updateQtyField(productName, qty); // Update the quantity
    // await browser.keys("Tab"); // Optional action (for focus)
  }
);

// Action for clicking the 'Update' button to update cart quantity
When(/^I click on the update button$/, async () => {
  await CartPreviewPage.updateQtyField(); // Update the quantity in the cart
});

// Assertion to check if the "No items in cart" message is displayed when the cart is empty
Then(
  /^I see the you have no items in your shopping cart message in the cart preview modal$/,
  async () => {
    const actualMsg = await CartPreviewPage.getCartEmptyMessage(); // Get the message
    const expectedMsg = "You have no items in your shopping cart."; // Expected message
    assert(
      actualMsg === expectedMsg,
      "Something went wrong. Empty cart is not identified." // Assertion error message
    );
  }
);

// Assertion to check if the product is added correctly to the cart
Then(/^I see the item is added correctly to the cart$/, async () => {
  await CartPreviewPage.clickOnCartIcon(); // Click on the cart icon
  await CartPreviewPage.cartPreviewIsDisplayed(); // Ensure cart preview is displayed
  await browser.pause(1000); // Optional pause (for debugging)
  const actualCount = await CartPreviewPage.getTotalNumOfItemsInCart(); // Get total items in the cart
  totalItemsInCart = actualCount; // Update the total items count
  assert(totalItemsInCart > 0, "Something went wrong!"); // Check if items are added
});

// Assertion to check if all products in the cart are displayed correctly
Then(/^I see that all items are displayed correctly in the cart$/, async () => {
  await CartPreviewPage.clickOnCartIcon(); // Click on the cart icon
  await CartPreviewPage.displayCartPreview(); // Display cart preview
  await browser.pause(1000); // Optional pause (for debugging)
  const actualCount = await CartPreviewPage.getTotalNumOfItemsInCart(); // Get total items in the cart
  totalItemsInCart = actualCount; // Update the total items count
  assert(totalItemsInCart > 0, "Something went wrong!"); // Ensure the cart is not empty
  console.log("array: ", productNamesInCart); // Log the array of product names
  for (let i = 0; i < totalItemsInCart; i++) {
    const productName = await CartPreviewPage.getProductsNamesInPreview(i); // Get product name from cart preview

    assert(
      productName.trim().toLowerCase() ===
        productNamesInCart[totalItemsInCart - 1 - i].trim().toLowerCase(),
      `Product ${
        productNamesInCart[totalItemsInCart - 1 - i]
      } not found in preview` // Check if the product matches
    );
  }
});

// Assertion to confirm that an "added to cart" message appears
Then(/^a confirmation message appears$/, async () => {
  await CartPreviewPage.getAddedToCartMsg(); // Get the added to cart message
});

// Assertion to check if the number of items in the cart increased by one
Then(/^the number of the items in cart increased by one$/, async () => {
  const actualCount = await CartPreviewPage.getTotalNumOfItemsInCart(); // Get total items in cart
  assert(
    actualCount === totalItemsInCart,
    `Expected ${totalItemsInCart} items, but found ${actualCount}` // Verify item count
  );
  totalItemsInCart = actualCount; // Update total items count
});

// Assertion to check if the user is redirected to a product's page
Then(/^I am redirected to the "(.*)" product's page$/, async (productName) => {
  const actualUrl = await browser.getUrl(); // Get the current URL
  actualUrl.includes(`${productName}.html`); // Check if the URL includes the product name
});

// Assertion to check if a message about unavailable quantity is shown
Then(
  /^a message indicating that the requested qyt is not available$/,
  async () => {
    const actualMsg = await WhatsNewPage.getNotAvailableQytMsg(); // Get the message
    const expectedMsg = "The requested qty is not available"; // Expected message
    assert.strictEqual(actualMsg, expectedMsg); // Compare messages
  }
);

// Optional pause for modal (for debugging or waiting)
Then(
  /^A modal opens stating whether I want to delete the product or not$/,
  async () => {
    await browser.pause(1000); // Pause for modal to open
  }
);

// Action to choose 'OK' in a confirmation modal
Then(/^I choose OK$/, async () => {
  await browser.pause(1000); // Optional pause (for debugging)
  await CartPreviewPage.confirmDeletion(); // Confirm deletion
});

// Assertion to check if the product is removed from the cart
Then(
  /^the cart preview does not have that product "(.*)"$/,
  async (productName) => {
    const isProductInCart = await CartPreviewPage.isProductInCart(productName); // Check if product exists in cart
    assert(
      isProductInCart === false,
      "Something went wrong! The product is still in the cart." // Ensure product is deleted
    );
  }
);

// Assertion to check if the quantity of a product is updated correctly
Then(/^I see the quantity updated correctly as (\d+)$/, async (qtyValue) => {
  const actualValue = await CartPreviewPage.getQtyValue(); // Get the quantity value from the cart
  assert(
    actualValue === qtyValue,
    "Something went wrong! Quantity values aren't matched" // Ensure quantity matches the expected value
  );
});

// Assertion to check if the quantity remains unchanged (i.e., doesn't update)
Then(/^the quantity doesn't update and stays as it is$/, async () => {
  const actualValue = await CartPreviewPage.getQtyValue(); // Get the quantity value from the cart
  assert(
    actualValue !== 0,
    "Something went wrong! Quantity has been updated to an invalid value!" // Ensure quantity hasn't been incorrectly updated
  );
});
