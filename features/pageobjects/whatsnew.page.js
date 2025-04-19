// Define WhatsNewPage class containing functions to interact with the 'What's New' page elements
class WhatsNewPage {
  // Getter for the list of product items displayed on the page
  get productItems() {
    return $$('li[class="product-item"]');
  }

  // Getter for the product image inside the product item
  get productImg() {
    return $("img[class='product-image-photo']");
  }

  // Getter for the message displayed when a product's quantity is not available
  get quantityNotAvailableMsg() {
    return $('div[class="message-error error message"]');
  }

  // Method to retrieve the 'Add to Cart' button for a specific product
  // This is an async method to ensure we get the button within the product element
  async getAddToCartButton(productElement) {
    return await productElement.$('button[type="submit"]');
  }

  // Method to add a product to the cart by its name
  // It searches through the list of products and clicks 'Add to Cart' for the matching product
  async addProductToCart(productName) {
    const products = await this.productItems;

    // Loop through each product to find the one that matches the given product name
    for (const product of products) {
      const title = await product.$(".product-item-link");
      const titleText = await title.getText();

      // Check if the product name matches
      if (titleText.trim().toLowerCase() === productName.trim().toLowerCase()) {
        // Hover over the product to reveal the 'Add to Cart' button
        await product.moveTo();

        // Wait for the 'Add to Cart' button to appear and be clickable
        const addToCartBtn = await this.getAddToCartButton(product);

        // Wait until the button is visible before clicking
        await browser.waitUntil(async () => await addToCartBtn.isDisplayed(), {
          timeout: 5000, // Timeout after 5 seconds
          timeoutMsg: `Add to Cart button not visible for "${productName}"`,
        });

        // Click the 'Add to Cart' button to add the product to the cart
        await addToCartBtn.click();
        return; // Exit the method after adding the product to the cart
      }
    }

    // If the product wasn't found, throw an error
    throw new Error(
      `Product with name "${productName}" not found on What's New page.`
    );
  }

  // Method to retrieve the 'quantity not available' error message
  async getNotAvailableQytMsg() {
    return await this.quantityNotAvailableMsg.getText();
  }
}

// Export an instance of the WhatsNewPage class for reuse
module.exports = new WhatsNewPage();
