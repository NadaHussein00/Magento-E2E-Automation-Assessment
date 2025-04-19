// Define SearchPage class containing functions to interact with search results and filters
class SearchPage {
  // Getter for the order direction button used to toggle sorting direction
  get orderDirectionButton() {
    return $('a[class*="action sorter-action"]');
  }

  // Getter for the filter dropdown used to select different sorting options
  get filterSelector() {
    return $('select[id="sorter"]');
  }

  // Method to get the text of the currently selected filter in the filter dropdown
  async getFilterSelectorText() {
    const selector = await this.filterSelector;
    const currentlySelectedFilter = await selector.$("option:checked");
    return currentlySelectedFilter.getText();
  }

  // Method to click the order direction button to change sorting direction (ascending/descending)
  async setAscendingDirection() {
    await this.orderDirectionButton.click(); // Toggle the sorting direction
  }

  // Method to apply a price filter by selecting the 'price' option from the filter dropdown
  async priceFilter() {
    await this.filterSelector.selectByAttribute("value", "price"); // Select the price filter option
  }

  // Method to apply a product name filter by selecting the 'name' option from the filter dropdown
  async productNameFilter() {
    await this.filterSelector.selectByAttribute("value", "name"); // Select the name filter option
  }

  // Method to get the prices of all products listed on the search results page
  async getProductsPrices() {
    const productsList = await $$('div[class="product-item-info"]'); // Get all product items
    const productsPrices = []; // Array to store product prices

    // Loop through each product item and extract the price
    for (const product of productsList) {
      try {
        // Extract the price of the product
        const stringPrice = await product
          .$('div[class="product details product-item-details"]')
          .$('div[class="price-box price-final_price"]')
          .$('span[class="normal-price"]')
          .$('span[class="price-container price-final_price tax weee"]')
          .$('span[data-price-type="finalPrice"]')
          .$('span[class="price"]')
          .getText();

        // Clean the price string and convert it to a float
        const price = parseFloat(stringPrice.replace(/[^0-9.]/g, ""));
        if (!isNaN(price)) {
          productsPrices.push(price); // Add valid price to the array
        }
      } catch (error) {
        console.warn("Price element not found for a product:", error.message); // Handle missing price element
      }
    }
    return productsPrices; // Return the array of product prices
  }

  // Method to get the titles of all products listed on the search results page
  async getProductsTitles() {
    const productsList = await $$('div[class="product-item-info"]'); // Get all product items
    const productsTitles = []; // Array to store product titles

    // Loop through each product item and extract the title
    for (const product of productsList) {
      try {
        // Extract the title of the product
        const title = await product
          .$('div[class="product details product-item-details"]')
          .$('strong[class="product name product-item-name"]')
          .$('a[class="product-item-link"]')
          .getText();

        productsTitles.push(title); // Add title to the array
      } catch (error) {
        console.warn("Title element not found for a product:", error.message); // Handle missing title element
      }
    }
    return productsTitles; // Return the array of product titles
  }
}

// Export an instance of the SearchPage class for reuse in other parts of the code
module.exports = new SearchPage();
