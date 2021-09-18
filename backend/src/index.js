const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

// support parsing of application/json type post data

const port = process.env.PORT || 8082;
const docClient = require("./dynamodbConfig");

const app = express();
app.use(cors());
app.use(bodyParser.json());


// GET ALL ITEMS 
app.get("/items", (req, res) => {
    var params = {
        TableName: "items"
    };

    docClient.scan(params, (err, data) => {
        if (err) {
            console.log(err);
            res.send();
        } else {
            var items = [];
            for (var i in data.Items)
                items.push(data.Items[i]);
            res.contentType = 'application/json';
            res.send(items);
        }
    });
});

app.get("/items/:id", (req, res) => {
    const {id} = req.params;
    var params = {
        TableName: "items",
        Key: {
            _id: id
        }
    };

    docClient.get(params, (err, data) => {
        if (err) {
            console.log(err);
            res.send();
        } else {
            res.contentType = 'application/json';
            res.send(data.Item);
        }
    });
});


// GET ALL DATA FROM CART - /cart
app.get("/cart", (req, res) => {
    var params = {
        TableName: "cart",
    };

    docClient.scan(params, (err, data) => {
        if (err) {
            console.log(err);
            res.send();
        } else {
            var items = [];
            for (var i in data.Items)
                items.push(data.Items[i]);
            console.log(items);
            res.contentType = 'application/json';
            res.send(items);
        }
    });
});

// POST CART ITEM BY ID - /cart/:id
app.post("/cart/:id", (req, res) => {
    const {id} = req.params;
    var params = {
        TableName: "cart",
        Item: {
            "item_id": id
        }
    };
    console.log("Adding a new item...");
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            res.send();
        }
    });

});

// DELETE CART ITEM BY ID - /cart/:id
app.delete("/cart/:id", (req, res) => {
    const {id} = req.params;
    var params = {
        TableName: "cart",
        Key: {
            item_id: id
        }
    };

       docClient.delete(params, function(err, data) {
         if(err) 
            console.log(err, err.stack); 
         else     
            console.log("Item Deleted :", id); 
            res.send(params.Key);         
       });

})


//GET ALL COUPONS
app.get("/coupons", (req, res) => {
    var params = {
        TableName: "coupons",
    };
    docClient.scan(params, (err, data) => {
        if (err) {
            console.log(err);
            res.send();
        } else {
            var items = [];
            for (var i in data.Items)
                items.push(data.Items[i]);
            res.contentType = 'application/json';
            res.send(items);
        }
    });
})


//ADD COUPON
app.post("/coupons", (req, res) => {
    var data = req.body;
    // console.log("Added Coupon ::", data.couponCode);
    var params = {
        TableName: "coupons",
        Item: data
    };
    console.log("Adding a new coupon...");
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add coupon. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            res.send(data);
        }
    });
})



// APPLY COUPON CODE
app.get("/checkout", (req, res) => {
    var {cartValue, couponCode} = req.query;
    var params = {
        TableName: "coupons",
        Key: {
            couponCode: couponCode
        }
    };

    docClient.get(params, (err, data) => {
        if (err) {
            console.log(err);
            res.status(400).send({"Error": err});
        } else {
            res.contentType = 'application/json';
            var couponData = data.Item;
            var todayDate = new Date().toISOString().slice(0, 10);
            if(couponData === undefined) {
                res.status(404).send({"Error": "Coupon Code is invalid"});
            }
            else if(parseInt(cartValue) < couponData.minCartValue) {
                res.status(400).send({"Error": "Cart total is less than min coupon cart value"})
            }
            else if(couponData.startDate > todayDate ) {
                res.status(400).send({"Error": "Coupon Code is invalid"})
            }
            else if(todayDate > couponData.expiryDate) {
                res.status(400).send({"Error": "Coupon Code is expired"})
            }
            else {
                if(couponData.type == "percentage") {
                    let discount = couponData.discountValue;
                    if(discount > 40) {
                        discount = 40;
                    }
                    cartValue = parseInt(parseInt(cartValue) * (100 - discount) / 100);  //Max 40% DISCOUNT
                }
                else {
                    cartValue = parseInt(cartValue) - couponData.discountValue;
                }
                res.status(200).send({
                    couponCode: couponCode,
                    finalCartValue: cartValue
                });
            }
        }
    });
})


//APP RUNNING ON PORT 8082
app.listen(port, () => {
    console.log(`App running on port ${port}`);
})