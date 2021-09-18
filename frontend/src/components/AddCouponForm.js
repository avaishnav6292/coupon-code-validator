import React from "react";
import {config} from "../ipconfig";

export default class AddCouponForm extends React.Component {

    getUrl = () => {
        const url = `${config.backendEndpoint}/coupons`;
        return url;
    }

    onFormSubmit = async(event) => {
        event.preventDefault();
        console.log(event.target);
        var [couponCode, startDate, expiryDate, couponType, minCartValue, discountValue, ...rest] = Object.keys(event.target).map(
            (key) => event.target[key].value
        )
        let url = this.getUrl();
        try{
            let apiResponse = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    couponCode: couponCode.toUpperCase(),
                    startDate: startDate,
                    expiryDate: expiryDate,
                    type: couponType,
                    minCartValue: parseInt(minCartValue),
                    discountValue: parseInt(discountValue)
                })
            });
            // let data = await apiResponse.json();
            alert(`Coupon Code '${couponCode}' added successfully.`)
        }
        catch(err) {
            console.log("Error connecting to server", err);
        }

        
    }

    render() {
        return(
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add New Coupon</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={this.onFormSubmit}>
                            <label className="w-100">Coupon Code:</label>
                            <input name="coupon-code" className="w-100" type="text" placeholder="Enter Coupon Code" />
                            <hr/>

                            <label className="w-100">Start Dat:</label>
                            <input name="start-date" className="w-100" type="date" placeholder="Select Coupon Start Date" />
                            <hr/>

                            <label className="w-100">Expiry Date:</label>
                            <input name="expiry-date" className="w-100" type="date" placeholder="Select Coupon Start Date" />
                            <hr/>

                            <label className="w-100">Type:</label>
                            <select name="coupon-type">
                                <option value="0" selected disabled>Select Coupon Code Type</option>
                                <option value="flat">Flat</option>
                                <option value="percentage" >Percentage</option>
                            </select>
                            <hr/>

                            <label className="w-100">Min Cart Value:</label>
                            <input  name="min-cart-value" className="w-100" type="number" placeholder="Enter Minimum Cart Value" />
                            <hr/>

                            <label className="w-100">Discount Value:</label>
                            <input  name="discount-value" className="w-100" type="number" placeholder="Enter Discount Value" />
                            <hr/>

                            <div className="d-flex flex-row justify-content-end">
                                <button type="submit" className="btn btn-primary">Save changes</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>  
                            </div>
                        </form>
                    </div>
                    {/* <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div> */}
                    </div>
                </div>
            </div>
        );
    }
}