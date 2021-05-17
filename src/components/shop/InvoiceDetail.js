import React, { useEffect } from "react";
import axios from "axios";

const InvoiceDetail = () => {
  useEffect(() => {
    axios
      .get(`https://svc-not-e.herokuapp.comv1/shop/42/invoice/3`, {
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
