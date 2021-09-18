import React from "react";
import Header from "./Header";
import {config} from "../ipconfig";

export default class ViewCoupons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coupons:[]
        }
    }

    getAllCoupons = async() => {
        let url = `${config.backendEndpoint}/coupons`;
        let apiResponse = await fetch(url);
        let data = await apiResponse.json();
        console.log(data);
        this.setState({
            coupons: data
        })
    }

    componentDidMount = async() => {
        await this.getAllCoupons();
    }


    render() {
        return(
            <>
                <Header/>
                <div className="container mt-5">
                    <h4>Coupons</h4>
                    <table>
                        <thead>
                            <tr style={{border:"2px solid black", backgroundColor:"gray"}}>
                                <th className="px-2">Coupon Code</th>
                                <th className="px-2">Minimum Cart Value</th>
                                <th className="px-2">Discount Type</th>
                                <th className="px-2">Discount Value</th>
                                <th className="px-2">Start Date</th>
                                <th className="px-2">Expiry Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.coupons.length && this.state.coupons.map(
                                    (coupon) => <tr>
                                                    <td>{coupon.couponCode}</td>
                                                    <td>{coupon.minCartValue}</td>
                                                    <td>{coupon.type}</td>
                                                    <td>{coupon.discountValue}</td>
                                                    <td>{coupon.startDate}</td>
                                                    <td>{coupon.expiryDate}</td>
                                                </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}