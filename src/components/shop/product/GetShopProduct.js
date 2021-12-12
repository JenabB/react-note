import React, { useState } from "react";

import { formatRp } from "../../../utils/formatRp";
import { useAuthDispatch, useAuthState } from "../../../hook";
import { Link } from "react-router-dom";

import {
  handleAreYouSure,
  handleError,
  handleSuccess,
} from "../../../utils/responseHandler";
import { deleteProduct } from "./actions";
import EditProductModal from "./EditProductModal";

const GetShopProduct = ({ id }) => {
  const [query, setQuery] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const user = useAuthState();
  const dispatch = useAuthDispatch();
  const productList = user.shopProduct;
  // let { path, url } = useRouteMatch();

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

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

  const items = user.shopProduct
    // eslint-disable-next-line array-callback-return
    .filter((data) => {
      if (query == null) return data;
      else if (data.productName.toLowerCase().includes(query.toLowerCase())) {
        return data;
      }
    })
    .map((product, index) => {
      return (
        <div
          key={index}
          className="shadow m-3 flex justify-between rounded-lg p-4"
        >
          <div>
            <h1 className="font-bold text-blue-600">{product.productName}</h1>
            <h1 className="text-gray-600">{formatRp(product.productPrice)}</h1>
          </div>

          <div className="flex">
            <button className="material-icons mx-4" onClick={handleEditOpen}>
              edit
            </button>
            <h1
              className="material-icons text-red-600"
              onClick={() => handleDeleteProduct(product.productId)}
            >
              delete
            </h1>
          </div>
          <EditProductModal open={editOpen} handleEditClose={handleEditClose} />
        </div>
      );
    });

  return (
    <div className="lg:w-2/3 mx-auto sm:w-full">
      <div className="text-center">
        <input
          type="search"
          className="bg-gray-200 px-2 py-1 rounded-lg my-6"
          placeholder="search"
          onChange={handleQueryChange}
        />
      </div>
      {productList?.length > 0 ? (
        items
      ) : (
        <div>
          <h1 className="text-center">No Product Yet</h1>
        </div>
      )}
    </div>
  );
};

export default GetShopProduct;
