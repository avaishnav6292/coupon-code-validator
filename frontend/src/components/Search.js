import React from "react";
import {config} from "../ipconfig";
import Item from "./Item";
import Header from "./Header";
import AddCouponForm from "./AddCouponForm";

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.items = [];
        this.state = {
            searchResult: []
        }
    }

    getUrl = () => {
        const url = `${config.backendEndpoint}/items`;
        return url;
    }

    getItemsData = async(url) => {
        const apiResponse = await fetch(url);
        const data = await apiResponse.json();
        return data;
    }

    componentDidMount = async() => {
        const url = this.getUrl();
        const data = await this.getItemsData(url);
        this.items = data;
        this.setState({
            searchResult: data
        })
        console.log(this.state.searchResult);
    }

    onSearchInputChange = (e) => {
        var searchQuery = e.target.value;
        this.setState({
            searchResult: this.items.filter(
                (item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.image.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.brand.toLowerCase().includes(searchQuery.toLowerCase())
            )
        });
    }

    render() {
        return(
            <>
                <Header >
                    <form class="form-inline d-flex flex-row">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search by name, brand, category" aria-label="Search" onChange={this.onSearchInputChange} />
                    </form>
                </Header>
                <div className="container">
                    <div className="row my-2 d-flex flex-row justify-content-around">
                        <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Add Coupon</button>
                        <a href="/coupons" className="btn btn-primary">View Coupons</a>
                        <a href="/cart" className="btn btn-primary">Go to Cart</a>
                    </div>
                    <div className="row">
                        { this.state.searchResult.map(
                            (item) => <Item item={item} />
                            ) 
                        } 
                    </div>
                </div>
                <AddCouponForm/>
            </>
        );
    }
}