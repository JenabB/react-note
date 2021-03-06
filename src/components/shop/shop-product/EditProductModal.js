import React, { useState } from "react";
import { useAuthState } from "hook";
import { editProduct } from "./actions";

import { handleSuccess, handleError } from "utils/responseHandler";
import { formInput } from "theme/formInput";

const EditProductModal = ({
  open,
  handleEditClose,
  productName,
  productPrice,
}) => {
  const user = useAuthState();
  const [name, setProductName] = useState(productName);
  const [price, setProductPrice] = useState(productPrice);

  const handleNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setProductPrice(e.target.value);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await editProduct(
        productName,
        productPrice,
        user.shopId,
        user.selectedProduct.productId,
        user.token
      );

      handleSuccess(res);
      handleEditClose();
    } catch (error) {
      if (error.response.data.status === 401) {
        handleError(error);
      } else {
        handleError(error);
      }
    }
  };

  return (
    <>
      {open && (
        <div className="modal absolute bg-white shadow-lg p-4 rounded-l">
          <div className="text-right">
            <button
              className="bg-red-400 px-3 py-1 rounded-lg text-white"
              onClick={handleEditClose}
            >
              X
            </button>
          </div>
          <div className="mt-10 text-center">
            <h1>Edit Product</h1>
            <form className="mt-10" onSubmit={handleUpdate}>
              <h1>Product Name</h1>
              <input
                type="text"
                className={formInput}
                value={name}
                onChange={handleNameChange}
                required
              />
              <h1>Product Price</h1>
              <input
                type="number"
                className={formInput}
                value={price}
                onChange={handlePriceChange}
                required
              />
              <br />
              <button
                type="submit"
                className="bg-blue-600 px-3 py-2 rounded-lg text-white"
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProductModal;
