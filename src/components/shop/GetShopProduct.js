import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthDispatch, useAuthState } from "../../hook";
import Skeleton from "react-loading-skeleton";

const GetShopProduct = ({ id }) => {
  const user = useAuthState();
  const dispatch = useAuthDispatch();
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    axios
      .get(`https://warm-earth-68639.herokuapp.com/v1/shop/${id}/product`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((result) => {
        setProductList(result.data.data);
        dispatch({ type: "GET_SHOP_PRODUCT", payload: result.data.data });
      });
  });

  return (
    <div className="lg:w-2/3 mx-auto sm:w-full">
      {productList ? (
        <div className="grid grid-cols-3">
          {productList.map((product, index) => (
            <div key={index} className="shadow-lg m-3 p-3">
              <h1 className="font-bold">{product.productName}</h1>
              <h2>{product.productPrice}</h2>
            </div>
          ))}
        </div>
      ) : (
        <Skeleton count={5} />
      )}
    </div>
  );
};

export default GetShopProduct;
