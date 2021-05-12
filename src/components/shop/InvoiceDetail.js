import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthState } from "../../hook";

const InvoiceDetail = () => {
  const [invoiceDetail, setinvoiceDetail] = useState([]);

  useEffect(() => {
    axios
      .get(`https://warm-earth-68639.herokuapp.com/v1/shop/42/invoice/3`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((result) => {
        console.log(result);
      });
  });
  return (
    <div>
      <h1>Ini invoice kau</h1>
    </div>
  );
};

export default InvoiceDetail;
