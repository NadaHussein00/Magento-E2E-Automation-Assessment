# Magento E2E Automation Project

This project automates end-to-end test scenarios for a Magento-based eCommerce website using WebdriverIO and Cucumber.

## Notes

- It is preferred to run a specific feature at a time to avoid any unexpected behaviours.
- Ensure a really good internet connectio.
- These tests were done based on a previous version of this website, as in 18 April 2025 at 9:30 PM nearly, the website is updated to have a (What's New Page) that include different products from the ones mentioned here in the tests. And in the final hours, to stick to the new update, it was impossible due to the dependency of these tests on that prticular page, and no reports are generated due to that change that caused the tests to throw unexpected behaviours.
- I'll try to work soon on refactoring the code to adapt to the new website's updates.

## Features Covered

- Cart Management
- Product Search
- Filter Application
- Checkout Process
- Order Placement

## Tech Stack

- **Language:** JavaScript
- **Framework:** WebdriverIO
- **BDD Tool:** Cucumber

## Installation

Installed dependencies

- npm install
- wdio install and configuration

## Running Tests

- To execute all scenarios (with maximum one instance):
  npx wdio run wdio.conf.js

- To run a specific feature:
  npx wdio run wdio.conf.js --spec features/featureName.feature
