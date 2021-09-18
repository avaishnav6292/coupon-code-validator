import React from "react";
import "./styles/Item.css";
import {config} from "../ipconfig";

export default class Item extends React.Component {

    getUrl = () => {
        const url = `${config.backendEndpoint}/cart/${this.props.item._id}`;
        return url;
    }

    addItemToCart = async() => {
        var url = this.getUrl();
        try {
            await fetch(url, {
                method: "POST"
            });
        }
        catch(err) {
            alert("Error connecting to server");
            console.log("Error:", err);
        }
    }


    render() {
        var available = this.props.item.quantity ? "" : "out-of-stock"
        return(
            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 my-3">
                <div className="card" style={{height:"100%", width:"100%"}}>
                    <img className={`card-img-top ${available}` } src={this.props.item.image} alt="item" />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.item.brand}</h5>
                        <p className="card-text">{this.props.item.name}</p>
                        <p>{`Rs. ${this.props.item.price}`}</p>
                    </div>
                    <a onClick={this.addItemToCart} className="btn btn-primary w-100 pt-3" style={{height:"50px"}}>Add to Cart</a>
                </div>                
            </div>
        );
    }
}