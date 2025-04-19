Feature: search Filters

Scenario: Search for a product and the default filter is set to relevance 
Given I am on the homepage
When I search with a product keyword "jacket" 
Then The filter is set to relevance by default

Scenario: Search for a product and then choose the price filter 
Given I am on the homepage
When I search with a product keyword "jacket" 
And I choose the price filter after searching 
Then I should be redirected to a page with the applied filter 
And I should see the products filtered based on their prices descendingly

Scenario: Search for a product, choose the price filter, and then choose the ascending order
Given I am on the homepage
When I search with a product keyword "jacket" 
And I choose the price filter after searching 
Then I should be redirected to a page with the applied filter 
And I should see the products filtered based on their prices descendingly
And When setting the direction to ascending, I'm redirected to a page with the applied filter and order
And I should see the products filtered based on their prices ascendingly


Scenario: Search for a product and then choose the product name flter
Given I am on the homepage
When I search with a product keyword "jacket" 
And I choose the product name filter after searching
Then I should be redirected to a page with the product name filter 
And I should see the products only with titles containing the search term "jacket"