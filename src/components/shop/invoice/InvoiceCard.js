import React from "react";
import { Link } from "react-router-dom";
import { formatRp } from "utils/formatRp";
import moment from "moment";
import {
  handleAreYouSure,
  handleSuccess,
  handleError,
} from "utils/responseHandler";
import { deleteInvoice } from "./actions";
import { useAuthState } from "hook";

const InvoiceCard = ({ invoice }) => {
  const { shopId, token } = useAuthState();

  const handleDeleteInvoice = (invoiceId) => {
    handleAreYouSure().then((result) => {
      if (result.isConfirmed) {
        try {
          deleteInvoice(shopId, invoiceId, token).then((result) => {
            handleSuccess(result);
          });
        } catch (error) {
          handleError(error);
        }
      }
    });
  };

  return (
    <div className="shadow-lg flex bg-white justify-between m-3 p-4">
      <Link to={`/invoice/${invoice.invoiceId}`}>
        <h1 className="font-bold text-yellow-500">{invoice.customerName}</h1>
        <h2 className="text-xs">
          {moment(invoice.createdAt).startOf("hour").fromNow()}
        </h2>
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
          onClick={() => handleDeleteInvoice(invoice.invoiceId)}
        >
          delete
        </h1>
      </div>
    </div>
  );
};

export default InvoiceCard;
