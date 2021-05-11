import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { useAuthState } from "../../hook";

const OwnerShopList = () => {
  const [shopList, setShopList] = useState([]);

  const user = useAuthState();

  useEffect(() => {
    axios
      .get(`https://warm-earth-68639.herokuapp.com/v1/shop`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((result) => {
        setShopList(result.data.data);
      });
  });

  return (
    <div className="lg:w-2/3 mx-auto sm:w-full">
      {shopList.length > 0 ? (
        <div>
          {shopList.map((shop, index) => (
            <Link to={`user/shop/detail/${shop.shopId}`}>
              <div key={index} className="shadow-lg m-3 p-3">
                <h1 className="font-bold">{shop.shopName}</h1>
                <h2>{shop.addressDetail}</h2>
                <h3>{shop.contactNumber}</h3>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <h1 className="text-center py-12">No Shop Yet</h1>
      )}
    </div>
  );
};

export default OwnerShopList;
