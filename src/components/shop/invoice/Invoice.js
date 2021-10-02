import React from "react";
import NavWithBack from "../../NavWithBack";

import FloatingCreateInvoiceButton from "./FloatingCreateInvoiceButton";
import ShopInvoiceList from "./ShopInvoiceList";

const Invoice = () => {
  return (
    <div>
      <NavWithBack />
      <FloatingCreateInvoiceButton />
      <ShopInvoiceList />
    </div>
  );
};

export default Invoice;
