import React, { useEffect } from "react";
import { useAuthState, useAuthDispatch } from "hook";
import { getInvoices } from "./actions";
import InvoiceCard from "./InvoiceCard";

const ShopInvoiceList = () => {
  const dispatch = useAuthDispatch();
  const { shopId, shopInvoice } = useAuthState();

  useEffect(() => {
    getInvoices(shopId).then((result) => {
      dispatch({ type: "GET_SHOP_INVOICE", payload: result.data.data });
    });
  });

  return (
    <div className=" h-screen">
      {shopInvoice && shopInvoice.length > 0 ? (
        <div className="pt-4">
          {shopInvoice.map((invoice, index) => (
            <InvoiceCard invoice={invoice} key={index} />
          ))}
        </div>
      ) : (
        <h1 className="text-center py-12">No Invoice Yet</h1>
      )}
    </div>
  );
};

export default ShopInvoiceList;
