

Feature: Product Search and Cart

  #  Scenario for searching a product Circe Hooded Ice Fleece CIRCE HOODED ICE FLEECE  rjgnjrlefdkjsk   %$@!!#
  Scenario: Search for a product with its fullname
    Given I am on the homepage
    When I search for "Circe Hooded Ice Fleece"
    Then I should see the product "Circe Hooded Ice Fleece"
    
  Scenario: Search for a product with its fullname capitalizied
    Given I am on the homepage
    When I search for "CIRCE HOODED ICE FLEECE"
    Then I should see the product "CIRCE HOODED ICE FLEECE"

    Scenario: Search for a product with an invalid name
    Given I am on the homepage
    When I search for "rjgnjrlefdkjsk"
    Then I should see a message indicating that there're no results

    Scenario: Search for a product with an invalid name (special characters)
    Given I am on the homepage
    When I search for "%$@!!#"
    Then I should see a message indicating that there're no results


