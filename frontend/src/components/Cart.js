import React from "react";
import Header from "./Header";
import {config} from "../ipconfig";

export default class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartIds: [],
            cartItems: []
        }
    }

    getUrl = () => {
        // const url = `${config.backendEndpoint}`;
        const url = `${config.backendEndpoint}`;
        return url;
    }

    getCartData = async(url) => {
        try {
            var apiResponse = await fetch(url);
            var cartData = await apiResponse.json();
            this.setState({
                cartIds: cartData.map(
                    (data) => data.item_id
                )
            })
        }
        catch(err) {
            console.log(err);
        }
    }

    getCartItems = async(url) => {
        try {
            var apiResponse = await fetch(url);
            var cartItems = await apiResponse.json();
            this.setState({
                cartItems: cartItems.filter(
                    (item) => this.state.cartIds.includes(item._id)
                )
            })
        }
        catch(err) {
            console.log(err);
        }
    }

    removeCartItem = async(event) => {
        var id = event.target.value;
        await fetch(`${config.backendEndpoint}/cart/${id}`, {
            method: "DELETE"
        });
        var url = this.getUrl();
        await this.getCartData(url + "/cart");
        await this.getCartItems(url + "/items");
        var discValue = document.getElementById("discounted-value");
        discValue.innerHTML = "-";
        var total = this.getCartTotalValue();
        var finalValue = document.getElementById("final-cart-value");
        finalValue.innerHTML = `Rs. ${total}`;
    }

    getCartTotalValue = () => {
        var prices = this.state.cartItems.map(
            (item) => item.price
        )
        let total = prices.reduce(add, 0);
        function add(accumulator, a) {
            return accumulator + a;
        }
        return total;
    }

    verifyCouponCode = async() => {
        var input = document.getElementById("coupon-code");
        var total = this.getCartTotalValue();
        
        var url = this.getUrl() + "/checkout?"+ new URLSearchParams({
            cartValue: total,
            couponCode: input.value.toUpperCase(),
        });

        var apiResponse = await fetch(url);
        var data = await apiResponse.json();
        
        if(data.Error) {
            alert(data.Error);
        }
        else {
            var discValue = document.getElementById("discounted-value");
        discValue.innerHTML = this.getCartTotalValue() - data.finalCartValue;
        
        var finalValue = document.getElementById("final-cart-value");
        finalValue.innerHTML = `Rs. ${data.finalCartValue}`;
        }

    }

    componentDidMount = async() => {
        var url = this.getUrl();
        await this.getCartData(url + "/cart");
        await this.getCartItems(url + "/items");
    }

    render() {
        return(
            <>
                <Header />
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-xs-12 col-md-8">
                            {this.state.cartItems && this.state.cartItems.map(
                                (item) => <div className="row py-1 my-2" style={{boxShadow:"1px 1px 2px 2px silver"}}>
                                                <div className="col-2"><img className="w-100" src={item.image} alt="cart item"/></div>
                                                <div className="col-10">
                                                    <h5>{item.brand}</h5>
                                                    <p>{item.name}</p>
                                                    <p>{item.price}</p>
                                                    <button className="btn btn-primary" value={item._id} onClick={this.removeCartItem}>Remove</button>
                                                </div>
                                            </div>
                                )
                            }

                            {
                                this.state.cartIds.length === 0 && <div>Cart is empty. Add items to cart to checkout.</div>
                            }
                        </div>


                        <div className="col-xs-12 col-md-4">
                            <input className="w-100 my-3" id="coupon-code" placeholder="Enter coupon code" type="text" />
                            <button className="btn btn-primary w-100" onClick={this.verifyCouponCode}>Apply Coupon</button>

                            <div className="mt-3 d-flex flex-row justify-content-between">
                                <strong>Total Items:</strong>
                                <div>{this.state.cartIds.length}</div>
                            </div>
                            <hr/>
                            <div className="d-flex flex-row justify-content-between">
                                <strong>Total Cart Value:</strong>
                                <div>Rs. {this.getCartTotalValue()}</div>
                            </div>
                            <hr/>
                            <div className="d-flex flex-row justify-content-between">
                                <strong>Discount Value:</strong>
                                <div id="discounted-value">-</div>
                            </div>
                            <hr/>
                            <div className="d-flex flex-row justify-content-between">
                                <strong>Cart Value after Discount</strong>
                                <div id="final-cart-value">Rs. {this.getCartTotalValue()}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
} 