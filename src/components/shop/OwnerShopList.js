import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuthState, useAuthDispatch } from "../../hook";

const OwnerShopList = () => {
  const dispatch = useAuthDispatch();
  const user = useAuthState();

  const HOST = "https://svc-not-e.herokuapp.com";

  useEffect(() => {
    axios
      .get(`${HOST}/v1/shop`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((result) => {
        dispatch({ type: "GET_SHOP_LIST_SUCCESS", payload: result.data.data });
      });
  });

  return (
    <div className="lg:w-2/3 mx-auto sm:w-full">
      {user.shopList.length > 0 ? (
        <div>
          {user.shopList.map((shop, index) => (
            <Link to={`user/shop/${shop.shopId}`}>
              <div key={index} tabofindex={index} className="shadow-lg m-3 p-3">
                <h1 className="font-bold">{shop.shopName}</h1>
                <h2>{shop.Regency.regencyName}</h2>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <h1 className="text-center py-20">No Shop Yet</h1>
      )}
    </div>
  );
};

export default OwnerShopList;
