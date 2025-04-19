Feature: Cart

Scenario: The cart is empty
Given I am on the homepage
When I click on the cart icon
Then I see the you have no items in your shopping cart message in the cart preview modal

Scenario: Add a product to the cart
Given I am on the what's new page
When I click on the add to cart button for the "Wayfarer Messenger Bag" product
And I click on the cart icon
Then I see the item is added correctly to the cart
And a confirmation message appears

Scenario: Add another a product to the cart
Given I am on the what's new page
When I click on the add to cart button for the "Dash Digital Watch" product
And I click on the cart icon
Then I see that all items are displayed correctly in the cart
And a confirmation message appears
And the number of the items in cart increased by one

Scenario: Add an out-of-stock product
Given I am on the what's new page
When I click on the add to cart button for the "Summit Watch" product
Then I am redirected to the "Summit Watch" product's page
And a message indicating that the requested qyt is not available

Scenario: Delete a product from the cart preview
Given I am on the homepage
When I click on the cart icon
And I click on the delete button for the "Dash Digital Watch" product
Then A modal opens stating whether I want to delete the product or not
And I choose OK
And the cart preview does not have that product "Dash Digital Watch"

Scenario: Increase the quantity of a product in the cart preview
Given I am on the homepage
When I click on the cart icon
And I type 2 in the qty field of the "Wayfarer Messenger Bag" product
And I click on the update button
Then I see the quantity updated correctly as 2

Scenario: Decrease the quantity of a product in the cart preview with an invalid value
Given I am on the homepage
When I click on the cart icon
And I type 0 in the qty field of the "Wayfarer Messenger Bag" product
Then the quantity doesn't update and stays as it is

Scenario: Decrease the quantity of a product in the cart preview with an invalid value
Given I am on the homepage
When I click on the cart icon
And I type -1 in the qty field of the "Wayfarer Messenger Bag" product
Then the quantity doesn't update and stays as it is