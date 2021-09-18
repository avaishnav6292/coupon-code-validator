# Coupon Code Validator - Backend

## Implemented With
- Node.js
- Express.js
- AWS - S3 (to store product images)
- AWS - DynamoDB (To store app data)
- Heroku

## URL
[https://coupon-code-validator.herokuapp.com/](https://coupon-code-validator.herokuapp.com)

## API Endpoints
- GET `https://coupon-code-validator.herokuapp.com/items`   (Get all products data)
- GET `https://coupon-code-validator.herokuapp.com/items/:id`   (Get product data by id)
- 
- GET `https://coupon-code-validator.herokuapp.com/cart`   (Get get all cart id's)
- POST `https://coupon-code-validator.herokuapp.com/cart/:id`   (Add new product id to cart)
- DELETE `https://coupon-code-validator.herokuapp.com/cart/:id`   (Delete a product id from cart)
- 
- GET `https://coupon-code-validator.herokuapp.com/coupons`   (Get all coupons data)
- POST `https://coupon-code-validator.herokuapp.com/coupons`   (Add new coupon to cart)

- GET `https://coupon-code-validator.herokuapp.com/checkout?cartValue=<totalCartValue>&couponCode=<couponCodeApplied>`   (Verify coupon code with minimum cart value and return discounted cart value)
