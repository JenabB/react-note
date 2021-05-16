import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuthState, useAuthDispatch } from "../../hook";

const OwnerShopList = () => {
  const dispatch = useAuthDispatch();
  const user = useAuthState();

  const HOST = "https://warm-earth-68639.herokuapp.com";

  useEffect(() => {
    axios
      .get(`${HOST}/v1/shop`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((result) => {
        console.log(result);
        dispatch({ type: "GET_SHOP_LIST_SUCCESS", payload: result.data.data });
      });
  });

  return (
    <div className="lg:w-2/3 mx-auto sm:w-full">
      {user.shopList ? (
        <div>
          {user.shopList.map((shop, index) => (
            <Link to={`user/shop/${shop.shopId}/detail`}>
              <div key={index} tabofindex={index} className="shadow-lg m-3 p-3">
                <h1 className="font-bold">{shop.shopName}</h1>
                <h2>{shop.addressDetail}</h2>
                <h3>{shop.contactNumber}</h3>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <h1>No Shop Yet</h1>
      )}
    </div>
  );
};

export default OwnerShopList;
