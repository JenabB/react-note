import React, { useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useAuthState, useAuthDispatch } from "../../../hook";
import { Link } from "react-router-dom";
import { formatRp } from "../../../utils/formatRp";

const ShopInvoiceList = () => {
  const dispatch = useAuthDispatch();
  const user = useAuthState();

  useEffect(() => {
    axios
      .get(`https://svc-not-e.herokuapp.com/v1/shop/${user.shopId}/invoice`, {
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
            <div>
              <div
                key={index}
                className="shadow-lg flex justify-between m-3 p-3"
              >
                <Link to={`/invoice/${invoice.invoiceId}`}>
                  <h1 className="font-bold">{invoice.customerName}</h1>
                  <h2>{moment(invoice.createdAt).startOf("hour").fromNow()}</h2>
                  {formatRp(invoice.totalPrice)}
                </Link>
                <div className="flex items-center">
                  <button
                    className="material-icons mx-2 text-blue-700"
                    // onClick={handleEditOpen}
                  >
                    edit
                  </button>
                  <h1
                    className="material-icons text-red-600"
                    // onClick={() => handleDeleteProduct(product.productId)}
                  >
                    delete
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-center py-12">No Invoice Yet</h1>
      )}
    </div>
  );
};

export default ShopInvoiceList;
