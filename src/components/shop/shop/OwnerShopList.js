import React, { useEffect } from "react";
import { Link } from "react-router-dom";

//lib
import axios from "axios";

//context
import { useAuthState, useAuthDispatch } from "../../../hook";

const OwnerShopList = () => {
  //context
  const dispatch = useAuthDispatch();
  const user = useAuthState();

  //host
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

  const sorted = user.shopList.sort((a, b) => a.shopId - b.shopId);

  return (
    <div className="">
      {user.shopList ? (
        user.shopList.length > 0 ? (
          <div
            className="flex overflow-x-auto mx-auto"
            style={{ maxWidth: "90%" }}
          >
            {sorted.map((shop, index) => (
              <Link to={`shop/${shop.shopId}`}>
                <div
                  key={index}
                  tabofindex={index}
                  className="shadow-lg m-1 p-3 bg-blue-400 text-white rounded-lg"
                  style={{ width: "250px", height: "150px" }}
                >
                  <h1 className="font-bold">{shop.shopName}</h1>
                  <h2>{shop.Regency.regencyName}</h2>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <h1 className="text-center py-20">No shop yet</h1>
        )
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default OwnerShopList;
