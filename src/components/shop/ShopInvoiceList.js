import React, { useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useAuthState, useAuthDispatch } from "../../hook";
import { Link } from "react-router-dom";

const ShopInvoiceList = ({ id }) => {
  const dispatch = useAuthDispatch();
  const user = useAuthState();

  useEffect(() => {
    axios
      .get(`https://svc-not-e.herokuapp.com/v1/shop/${id}/invoice`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((result) => {
        dispatch({ type: "GET_SHOP_INVOICE", payload: result.data.data });
      });
  });

  return (
    <div className="lg:w-2/3 mx-auto sm:w-full">
      {user.shopInvoice && user.shopInvoice.length > 0 ? (
        <div>
          {user.shopInvoice.map((invoice, index) => (
            <Link to={`invoice/${invoice.invoiceId}`}>
              <div key={index} className="shadow-lg m-3 p-3">
                <h1 className="font-bold">{invoice.customerName}</h1>
                <h2>{moment(invoice.createdAt).startOf("hour").fromNow()}</h2>
                {Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(invoice.totalPrice)}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <h1 className="text-center py-12">No Invoice Yet</h1>
      )}
    </div>
  );
};

export default ShopInvoiceList;
