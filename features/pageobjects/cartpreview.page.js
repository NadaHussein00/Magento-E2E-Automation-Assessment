class CartPreviewPage {
  // Getter for the cart icon, used to open the cart preview
  get cartIcon() {
    return $('a[class*="action showcart"]');
  }

  // Getter for the cart preview section
  get cartPreview() {
    return $('div[class*="block block-minicart"]');
  }

  // Getter for the empty cart message (when the cart has no items)
  get emptyCartMessage() {
    return $('strong[class="subtitle empty"]');
  }

  // Getter for a preview of a product in the cart
  get productPreview() {
    return $('div[class="product"]');
  }

  // Getter for a list of all product items in the cart preview
  get productItemsInCartPreview() {
    return $$('li[data-role="product-item"]'); // Adjust selector based on actual cart preview structure
  }

  // Getter for the close button of the cart preview
  get closePreviewButton() {
    return $('button[id="btn-minicart-close"]');
  }

  // Getter for the remove product button for a product in the cart preview
  get removeProductButton() {
    return $('div[class="product"]')
      .$('div[class="product-item-details"]')
      .$('div[class="product actions"]')
      .$('div[class="secondary"]')
      .$('a[title="Remove item"]');
  }

  // Getter for the number of items in the cart (displayed in the cart icon)
  get numberOfItemsInCart() {
    return $('span[class="counter-number"]');
  }

  // Getter for the proceed to checkout button in the cart preview
  get proceedToCheckoutButton() {
    return $('div[class="block-content"]')
      .$('div[class="actions"]')
      .$('div[class="primary"]')
      .$('button[id="top-cart-btn-checkout"]');
  }

  // Getter for the view and edit cart button
  get viewAndEditCartButton() {
    return $('div[class="actions"]').$('div[class="secondary"]').$("span");
  }

  // Getter for the quantity input field for a product in the cart preview
  get qtyField() {
    return $('input[class="item-qty cart-item-qty"]');
  }

  // Getter for the update quantity button
  get updateQtyButton() {
    return $('button[class="update-cart-item"]');
  }

  // Getter for the "added to cart" message (displayed when a product is added to the cart)
  get addedToCartMsg() {
    return $('div[class*="message-success"]').$("div").$("a");
  }

  // Getter for the delete confirmation modal that appears when removing a product from the cart
  get deleteConfirmationModal() {
    return $('div[class="modal-inner-wrap"]');
  }

  // Getter for the "OK" button on the delete confirmation modal
  get deleteConfirmationOkButton() {
    return $('button[class="action-primary action-accept"]');
  }

  // Method to click on the cart icon to open the cart preview
  async clickOnCartIcon() {
    await this.cartIcon.click();
    await browser.pause(1000); // Pause to wait for the cart to open
  }

  // Method to get the value of the quantity field for a product
  async getQtyValue() {
    const qtyAsText = await this.qtyField.getValue();
    return parseInt(qtyAsText.trim(), 10); // Parse the quantity as an integer
  }

  // Method to wait for the cart preview to be displayed
  async getCartPreview() {
    await this.cartPreview.waitForDisplayed({ timeout: 5000 });
  }

  // Method to click on the "Update Quantity" button
  async clickOnUpdateQtyButton() {
    await this.updateQtyButton.click();
  }

  // Method to update the quantity of a product in the cart
  async updateQtyField(productName, qtyValue) {
    const products = await $$('li[data-role="product-item"]'); // Get all product items in the cart preview
    for (const product of products) {
      const nameElement = await product.$("strong.product-item-name a");
      const nameText = await nameElement.getText();

      // If the product name matches the one passed, update the quantity
      if (nameText === productName) {
        const qtyField = await product.$(
          'input[class="item-qty cart-item-qty"]'
        );
        await browser.pause(1000);
        await qtyField.waitForDisplayed({ timeout: 10000 });
        await qtyField.waitForEnabled({ timeout: 10000 });
        await qtyField.click();
        await browser.keys(["Control", "a"]); // Select all text
        await browser.keys("Backspace"); // Clear existing value
        await qtyField.setValue(qtyValue); // Set new quantity value
        break;
      }
    }
    if (qtyValue > 0) {
      await this.clickOnUpdateQtyButton(); // Update the quantity if it's greater than 0
    } else {
      await browser.keys("Tab"); // Trigger blur or validation if quantity is 0
    }
  }

  // Method to click on the "Remove Product" button
  async clickOnRemoveProductButton() {
    await this.removeProductButton.click();
  }

  // Method to click on the "OK" button in the delete confirmation modal
  async clickOnDeleteConfirmButton() {
    await this.deleteConfirmationOkButton.click();
  }

  // Method to get the empty cart message if the cart is empty
  async getCartEmptyMessage() {
    await this.getCartPreview();
    return await this.emptyCartMessage.getText();
  }

  // Method to get the total number of items in the cart
  async getTotalNumOfItemsInCart() {
    const countText = await this.numberOfItemsInCart.getText();
    return parseInt(countText.trim(), 10); // Parse the number of items as an integer
  }

  // Method to check if the cart preview is displayed correctly
  async cartPreviewIsDisplayed() {
    await Promise.all([
      this.proceedToCheckoutButton.waitForExist({
        timeout: 5000,
        timeoutMsg: '"Proceed to Checkout" button did not appear in time',
      }),
      this.removeProductButton.waitForExist({
        timeout: 5000,
        timeoutMsg: '"Remove Product" button did not appear in time',
      }),
      this.productPreview.waitForExist({
        timeout: 5000,
        timeoutMsg: '"Product Preview" element did not appear in time',
      }),
    ]);
  }

  // Method to get the name of the product at a specific index in the cart preview
  async getProductsNamesInPreview(indexOfProduct) {
    const productItems = await this.productItemsInCartPreview;
    const productItem = productItems[indexOfProduct];
    const productName = await productItem.$("strong.product-item-name a");

    return await productName.getText();
  }

  // Method to delete a product from the cart
  async deleteAProduct(productToDelete) {
    const productsInCart = await this.productItemsInCartPreview;
    for (const product of productsInCart) {
      const productName = await product.$("strong.product-item-name a");
      const productNameText = await productName.getText();

      // If the product name matches, click the delete button
      if (productNameText.trim() === productToDelete.trim()) {
        const deleteButton = await product
          .$('div[class="product"]')
          .$('div[class="product-item-details"]')
          .$('div[class="product actions"]')
          .$('div[class="secondary"]')
          .$('a[title="Remove item"]');
        await deleteButton.click();
        break;
      }
    }
  }

  // Method to confirm the product deletion in the modal
  async confirmDeletion() {
    const modalWrapper = await $("div.modals-wrapper");
    await modalWrapper.waitForDisplayed({ timeout: 15000 });

    const modal = await $("footer.modal-footer");
    await modal.waitForDisplayed({ timeout: 5000 });

    const confirmButton = await modal.$(
      "footer.modal-footer button.action-accept"
    );
    await confirmButton.waitForClickable({ timeout: 5000 });
    await confirmButton.click();
  }

  // Method to check if a product is still in the cart
  async isProductInCart(isProductThere) {
    const cart = await $('div[class*="block block-minicart"]');
    await cart.waitForDisplayed({ timeout: 7000 });

    const productsInCart = await $$('li[data-role="product-item"]');

    for (const product of productsInCart) {
      const productName = await product.$("strong.product-item-name a");
      const isDisplayed = await productName.isDisplayed().catch(() => false); // Check if the product is displayed
      if (!isDisplayed) continue; // Skip if the product is not displayed

      const nameText = await productName.getText();

      // Return true if the product is found in the cart
      if (nameText.trim() === isProductThere.trim()) {
        return true;
      }
    }

    return false; // Product is not in the cart
  }

  // Method to get the "added to cart" message text
  async getAddedToCartMsg() {
    await this.addedToCartMsg.getText();
  }

  // Method to click on the "Proceed to Checkout" button
  async clickOnProceedToCheckOutButton() {
    await this.proceedToCheckoutButton.click();
  }
}

// Export an instance of the CartPreviewPage class for reuse
module.exports = new CartPreviewPage();
