import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatRp } from "../../../utils/formatRp";
import { useAuthDispatch, useAuthState } from "../../../hook";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const GetShopProduct = ({ id }) => {
  const [query, setQuery] = useState(null);
  const user = useAuthState();
  const dispatch = useAuthDispatch();
  const productList = user.shopProduct;
  // let { path, url } = useRouteMatch();

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };
  useEffect(() => {
    axios
      .get(`https://svc-not-e.herokuapp.com/v1/shop/${user.shopId}/product`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((result) => {
        dispatch({ type: "GET_SHOP_PRODUCT", payload: result.data.data });
      });
  });

  const handleDeleteProduct = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios
            .delete(
              `https://svc-not-e.herokuapp.com/v1/shop/${user.shopId}/product/${productId}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${user.token}`,
                },
              }
            )
            .then((result) => {
              Swal.fire({
                icon: "success",
                text: result.data.message,
                confirmButtonText: "ok",
              });
            });
        } catch (error) {
          Swal.fire({
            icon: "error",
            text: error.response.data.message,
            confirmButtonText: "ok",
          });
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
            <Link
              to={`product/${product.productId}/edit`}
              onClick={() =>
                dispatch({ type: "GET_ONE_PRODUCT", payload: product })
              }
            >
              <h1 className="material-icons mx-4">edit</h1>
            </Link>
            <h1
              className="material-icons text-red-600"
              onClick={() => handleDeleteProduct(product.productId)}
            >
              delete
            </h1>
          </div>
        </div>
      );
    });

  return (
    <div className="lg:w-2/3 mx-auto sm:w-full">
      <div className="text-center">
        <input
          type="search"
          className="bg-gray-200 px-2 py-1 rounded-full my-10"
          placeholder="search"
          onChange={handleQueryChange}
        />
      </div>
      {productList ? (
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
