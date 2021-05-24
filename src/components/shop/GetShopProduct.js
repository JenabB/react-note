import React, { useEffect } from "react";
import axios from "axios";
import { useAuthDispatch, useAuthState } from "../../hook";
import { Link } from "react-router-dom";

const GetShopProduct = ({ id }) => {
  const user = useAuthState();
  const dispatch = useAuthDispatch();
  const productList = user.shopProduct;
  // let { path, url } = useRouteMatch();
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

  return (
    <div className="lg:w-2/3 mx-auto sm:w-full">
      {productList ? (
        <div>
          <div className="text-center m-4">
            <input
              className="bg-gray-200 p-2 rounded-lg"
              type="search"
              placeholder="search product"
            />
          </div>
          <div className="grid grid-cols-3">
            {productList.map((product, index) => (
              <Link
                to={`/user/shop/${user.shopId}/product/${product.productId}`}
              >
                <div key={index} className="shadow-lg m-3 p-3">
                  <h1 className="font-bold">{product.productName}</h1>
                  {Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(product.productPrice)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-center">No Product Yet</h1>
        </div>
      )}
    </div>
  );
};

export default GetShopProduct;
