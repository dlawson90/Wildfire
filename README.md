# Wildfire Paperless Restaurant Ordering System

## Instructions

1. Install Node.js
2. Install MongoDB
3. In MongoDB, create a database called 'wildfire'
4. Inside the wildfire database, make a collection called 'products'
5. Import the products.json file to the 'products' collection
6. In the root folder called 'wildfire-new', run the command 'npm install'
7. Run the command 'node server.js'
8. Open your web browser and visit 'localhost:8000'

### Authentication

- To have full admin privileges, register an account called 'admin'.
- Register an account with any other name to use the app without admin privileges. 


## 4.4 - Order Discount Feature


On the **counter** view, each order has a button that lets the cashier apply a discount to the order. The cashier has to click the button and enter a numerical value to apply a discount. E.g. Inputting 20 applies a 20% discount. This effects the price of the whole order and the discount is saved in the database.


