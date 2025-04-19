class ShippingPage {
  // Selectors for various shipping page elements
  get pageTitle() {
    return $('div[class="step-title"]');
  }

  get emailField() {
    return $("#customer-email");
  }

  get firstNameField() {
    return $('input[name="firstname"]');
  }

  get lastNameField() {
    return $('input[name="lastname"]');
  }

  get companyField() {
    return $('input[name="company"]');
  }

  get streetAddressField() {
    return $('input[name="street[0]"]');
  }

  get cityField() {
    return $('input[name="city"]');
  }

  get selectStateField() {
    return $('select[name="region_id"]');
  }

  get selectCountryField() {
    return $('select[name="country_id"]');
  }

  get postalCodeField() {
    return $('input[name="postcode"]');
  }

  get phoneNumberField() {
    return $('input[name="telephone"]');
  }

  get nextButton() {
    return $('button[class="button action continue primary"]');
  }

  get placeAnOrderButton() {
    return $('button[title="Place Order"]');
  }

  get orderConfirmationInfo() {
    return $$("div.checkout-success p");
  }

  // Grab the <span> inside the first <p>, which has the order ID
  get orderIdSpan() {
    return $("div.checkout-success p span");
  }

  get emailFieldErrorMsg() {
    return $('div[id="customer-email-error"]');
  }

  // Method to check if the page title is displayed
  async isShippingPageTitleDisplayed() {
    return await this.pageTitle.getText();
  }

  // Method to fill in shipping details on the page
  async fillShippingFields(data) {
    await $('body[data-container="body"]').waitForDisplayed({ timeout: 10000 });
    await $('div[class="control _with-tooltip"]');
    await browser.pause(1000);

    // Helper function to wait & fill fields
    const fillField = async (field, value) => {
      await field.waitForDisplayed({ timeout: 10000 });
      await field.waitForEnabled({ timeout: 10000 });
      await field.setValue(value);
    };

    // Fill out the fields with provided data
    await fillField(await this.emailField, data["emailAddress"]);
    await fillField(await this.firstNameField, data["firstName"]);
    await fillField(await this.lastNameField, data["lastName"]);
    await fillField(await this.companyField, data["company"]);
    await fillField(await this.streetAddressField, data["streetAddress"]);
    await fillField(await this.cityField, data["city"]);

    // Handle dropdown for state and country selection
    const stateDropdown = await this.selectStateField;
    await stateDropdown.waitForDisplayed({ timeout: 10000 });
    await stateDropdown.selectByVisibleText(data["state"]);

    const countryDropdown = await this.selectCountryField;
    await countryDropdown.waitForDisplayed({ timeout: 10000 });
    await countryDropdown.selectByVisibleText(data["country"]);

    // Fill out postal code and phone number
    await fillField(await this.postalCodeField, data["postalCode"]);
    await fillField(await this.phoneNumberField, data["phoneNumber"]);
    await browser.pause(1000);
  }

  // Method to click on the Next button to continue
  async clickOnNextButton() {
    await this.nextButton.click();
  }

  // Method to click on the Place Order button
  async clickOnPlaceOrderButton() {
    await this.placeAnOrderButton.click();
  }

  // Method to check if the Order ID is displayed after order placement
  async isOrderIdDisplayed() {
    const orderSpan = await this.orderIdSpan;
    await orderSpan.waitForDisplayed({ timeout: 5000 });
    // return await orderSpan.getText(); // returns "000050469" if needed
  }

  // Method to get the success message after placing the order
  async getOrderPlacementSuccessMsg() {
    const paragraphs = await this.orderConfirmationInfo;
    if (paragraphs.length < 2) {
      throw new Error("Order confirmation message not found.");
    }
    return await paragraphs[1].getText(); // Return success message from the second paragraph
  }

  // Method to get the error message for invalid email field
  async getInvalidEmailErrorMsg() {
    await browser.pause(1000);
    return await this.emailFieldErrorMsg.getText();
  }
}

// Export the ShippingPage instance for reuse
module.exports = new ShippingPage();
