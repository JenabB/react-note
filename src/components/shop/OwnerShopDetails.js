import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useHistory } from "react-router-dom";

const OwnerShopDetails = (props) => {
    const [detail, setDetail] = useState([])
    const shopId = props.match.params.id

    let history = useHistory();
    function goBack() {
        history.goBack();
    }
    useEffect(() => {
        axios.get(`https://warm-earth-68639.herokuapp.com/v1/shop/${shopId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        }).then(result => {

            setDetail(result.data.data)
        })
    }, [shopId])

    console.log(detail)
    return (
        <div>
            <button
                className=" top-1 bg-green-400 text-white px-2 py-1 rounded-lg"
                onClick={goBack}
            >
                Back
      </button>
            <h1>{detail.shopName}</h1>
            <h2>{detail.addressDetail}</h2>

        </div>
    )
}

export default OwnerShopDetails
