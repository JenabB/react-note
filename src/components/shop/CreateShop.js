import React, { useState } from "react";

import axios from "axios";

const CreateShop = () => {
    const [data, setData] = useState({
        shopName: "",
        countryId: "",
        provinceId: "",
        districtId: "",
        addressDetail: "",
        contactNumber: "",
    });

    const { shopName, countryId, provinceId, districtId, addressDetail, contactNumber } = data;

    console.log(data);
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setData({ ...data, error: null });
            await axios.post(
                "https://warm-earth-68639.herokuapp.com/v1/user/register/owner",
                {
                    shopName: shopName,
                    countryId: countryId,
                    provinceId: provinceId,
                    districtId: districtId,
                    addressDetail: addressDetail,
                    contactNumber: contactNumber,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                });

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <div className="form mt-4 auth-container">
                <h4 className="text-muted text-center mb-2">Create Shop</h4>

                <div className="card py-2 px-5 shadow">
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                className="form-control"
                                type="name"
                                name="shopName"
                                value={shopName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contactNumber">contactNumber</label>
                            <input
                                className="form-control"
                                type="name"
                                name="contactNumber"
                                value={contactNumber}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="text-center">
                            <button className="btn bg-green-500 text-white px-3 py-1 rounded-lg" onClick={handleSubmit}>Create</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateShop;
