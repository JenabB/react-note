import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import NavWithBack from "components/common/NavWithBack";
import { useAuthState } from "hook";
import moment from "moment";
import { formatRp } from "utils/formatRp";
import { getOneInvoice } from "./actions";
import InvoiceSkeleton from "./InvoiceSkeleton";

const InvoiceDetail = () => {
  const [invoice, setInvoice] = useState(null);
  // const [totalPrice, setTotalPrice] = useState(0);
  const { id } = useParams();
  const { shopId } = useAuthState();

  useEffect(() => {
    getOneInvoice(shopId, id).then((result) => {
      setInvoice(result.data.data);
    });
  }, [id, shopId]);

  useEffect(() => {});

  return (
    <div className="bg-gray-100 h-screen">
      <NavWithBack />
      <div>
        {invoice ? (
          <div>
            <div className="p-4 bg-white m-2">
              <h1 className="text-red-500 text-2xl font-bold">
                {invoice.customerName}
              </h1>
              <h1>{moment(invoice.createdAt).format("YYYY MMM dddd")}</h1>
              <p>Total: {invoice.products.length} products</p>
            </div>
            {invoice.products.map((el, index) => (
              <div key={index} className="m-4 p-4 bg-white shadow-lg">
                <h1>{el.productName}</h1>
                <h1>{formatRp(el.productPrice)}</h1>
                <h1>{el.quantity}</h1>
                <h2>{formatRp(el.productPrice * el.quantity)}</h2>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4">
            <InvoiceSkeleton />
            <InvoiceSkeleton />
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceDetail;
