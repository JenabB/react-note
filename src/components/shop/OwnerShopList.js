import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom"

const OwnerShopList = () => {
    const [shopList, setShopList] = useState([])


    useEffect(() => {

        axios.get(`https://warm-earth-68639.herokuapp.com/v1/shop`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            }).then(result => {
                console.log(result)
                setShopList(result.data.data)
            })
    }, [])
    console.log("data", shopList)
    return (
        <div>
            {shopList.map((shop) => (
                <Link to={`user/shop/detail/${shop.shopId}`}>
                    <div key={shop.shopId} className="shadow-lg m-3 p-3">
                        <h1 className="font-bold">{shop.shopName}</h1>
                        <h2>{shop.addressDetail}</h2>
                        <h3>{shop.contactNumber}</h3>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default OwnerShopList
