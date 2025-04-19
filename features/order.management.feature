Feature: Order Management

Scenario: redirection to the shipping page 
Given I am on the what's new page
And  I click on the add to cart button for the "Wayfarer Messenger Bag" product
When I click on the cart icon
And click on the proceed to checkout button
Then I should be redirected to the shipping page 

Scenario: attempting to place an order
Given I'm on the shipping page
When I fill all the fields with valid data and click next button: 
  | field             | value                   |
  | emailAddress      | nhussein@example.com    |
  | firstName         | Nada                    |
  | lastName          | Hussein                 |
  | company           | N/A                     |
  | streetAddress     | Zamalek, Mohandeseen    |
  | city              | Giza                    |
  | state             | Armed Forces Middle East|                   
  | postalCode        | 12655                   |
  | country           | Egypt                   |
  | phoneNumber       | 11223344556             |

Then I should be redirected to the payements page

Scenario: finishing the placement of an order
Given I'm on the payements page
When I click on the place order button
Then I should be redirected a page of a successful order placement 
And I should see a message about order confirmation
And I should see the order id


Scenario: attempting to place an order with an invalid email format
Given I am on the what's new page
And  I click on the add to cart button for the "Wayfarer Messenger Bag" product
And I click on the cart icon
And click on the proceed to checkout button
When I fill all the fields with valid data EXCEPT for the email field: 
  | field             | value                   |
  | emailAddress      | nnodomainemail          |
  | firstName         | Nada                    |
  | lastName          | Hussein                 |
  | company           | N/A                     |
  | streetAddress     | Zamalek, Mohandeseen    |
  | city              | Giza                    |
  | state             | Armed Forces Middle East|                   
  | postalCode        | 12655                   |
  | country           | Egypt                   |
  | phoneNumber       | 11223344556             |

Then I should see an error message under the email address field