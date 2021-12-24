import React, { useState } from "react";

import { formatRp } from "utils/formatRp";
import { useAuthState } from "hook";

import {
  handleAreYouSure,
  handleError,
  handleSuccess,
} from "utils/responseHandler";
import { deleteProduct } from "./actions";
import EditProductModal from "./EditProductModal";

const ProductItem = ({ product }) => {
  const [editOpen, setEditOpen] = useState(false);
  const user = useAuthState();
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const handleDeleteProduct = (productId) => {
    handleAreYouSure().then((result) => {
      if (result.isConfirmed) {
        try {
          deleteProduct(user.shopId, productId, user.token).then((result) => {
            handleSuccess(result);
          });
        } catch (error) {
          handleError(error);
        }
      }
    });
  };

  return (
    <div className="shadow bg-white m-3 flex justify-between rounded-sm p-4">
      <div>
        <h1 className="font-bold text-blue-600">{product.productName}</h1>
        <h1 className="text-gray-600">{formatRp(product.productPrice)}</h1>
      </div>

      <div className="flex items-center">
        <button
          className="material-icons mx-2 text-blue-700"
          onClick={handleEditOpen}
        >
          edit
        </button>
        <h1
          className="material-icons text-red-600"
          onClick={() => handleDeleteProduct(product.productId)}
        >
          delete
        </h1>
      </div>
      <EditProductModal
        open={editOpen}
        productName={product.productName}
        productPrice={product.productPrice}
        handleEditClose={handleEditClose}
      />
    </div>
  );
};

export default ProductItem;
