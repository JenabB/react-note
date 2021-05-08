import React, { useState, useEffect } from 'react'
import axios from "axios";
import moment from "moment"
import { Link } from "react-router-dom"

const ShopInvoiceList = ({ id }) => {
    const [invoiceList, setInvoiceList] = useState([])

    useEffect(() => {

        axios.get(`https://warm-earth-68639.herokuapp.com/v1/shop/${id}/invoice`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            }).then(result => {
                setInvoiceList(result.data.data)
            })
    }, [id])

    console.log(invoiceList)
    return (
        <div className="lg:w-2/3 mx-auto sm:w-full">
            {invoiceList.length > 0 ? (
                <div>
                    {invoiceList.map((invoice, index) => (
                        <Link to={`user/shop/detail/${invoice.invoiceId}`}>
                            <div key={index} className="shadow-lg m-3 p-3">
                                <h1 className="font-bold">{invoice.customerName}</h1>
                                <h2>{moment(invoice.createdAt).startOf('hour').fromNow()}</h2>
                                <h3>{invoice.totalPrice}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (<h1 className="text-center py-12">No Invoice Yet</h1>)}
        </div>
    )
}

export default ShopInvoiceList;
