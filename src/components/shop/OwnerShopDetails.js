import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useHistory } from "react-router-dom";
import moment from "moment";


const OwnerShopDetails = (props) => {
    const [detail, setDetail] = useState([])
    const shopId = props.match.params.id

    let history = useHistory();
    function goBack() {
        history.goBack();
    }

    const dateFormat = "dddd, MMMM Do YYYY, h:mm:ss a";

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

    return (
        <div>
            <button
                className="absolute top-20 left-3 bg-green-400 text-white px-2 py-1 rounded-lg"
                onClick={goBack}
            >
                Back
      </button>

            <div className="jumbotron-detail text-center py-12">
                <h1 className="font-bold text-lg">{detail.shopName}</h1>
            </div>
            <h1>{detail.shopName}</h1>
            <h2>{detail.addressDetail}</h2>
            <h3>Created: {moment(detail.createdAt).format(dateFormat)}</h3>
            <p>{detail.contactNumber}</p>
        </div>
    )
}

export default OwnerShopDetails
