// Define HomePage class containing functions to interact with homepage elements
class HomePage {
  // Getter for the main banner element on the homepage
  get mainBanner() {
    return $('body[data-container="body"]');
  }

  // Getter for the search input field where users type their search queries
  get searchInput() {
    return $("input[id='search']");
  }

  // Getter for the search button that initiates the search action
  get searchButton() {
    return $('button[title="Search"]');
  }

  // Getter for the filter dropdown that allows users to sort search results
  get chooseFilter() {
    return $('select[id="sorter"]');
  }

  // Getter for the price filter option in the filter dropdown
  get selectPrice() {
    return $('option[value="price"]');
  }

  // Waits for the main banner element to be visible on the page
  async getMainBanner() {
    await this.mainBanner.waitForDisplayed({ timeout: 15000 });
  }

  // Method to perform a search action
  // First, it types the search query in the input field and then clicks the search button
  async search(desiredSearch) {
    await this.searchInput.setValue(desiredSearch); // Type the search term
    await this.searchButton.click(); // Click the search button
  }

  // Method to apply the price filter in the filter dropdown
  async priceFilter() {
    await this.chooseFilter(); // Select the filter dropdown
    await this.selectPrice().click(); // Click the price filter option
  }
}

// Export an instance of the HomePage class for reuse in other parts of the code
module.exports = new HomePage();
