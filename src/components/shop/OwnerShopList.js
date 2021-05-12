import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { ownerShopList, useAuthDispatch } from "../../hook";

const OwnerShopList = () => {
  const [shopList, setShopList] = useState([]);
  const dispatch = useAuthDispatch();

  useEffect(() => {
    try {
      ownerShopList(dispatch).then((response) => {
        setShopList(response.data);
        dispatch({ type: "GET_SHOP_LIST_SUCCESS", payload: response.data });
      });
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  return (
    <div className="lg:w-2/3 mx-auto sm:w-full">
      {shopList ? (
        <div>
          {shopList.map((shop, index) => (
            <Link to={`user/shop/${shop.shopId}/detail`}>
              <div key={index} className="shadow-lg m-3 p-3">
                <h1 className="font-bold">{shop.shopName}</h1>
                <h2>{shop.addressDetail}</h2>
                <h3>{shop.contactNumber}</h3>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default OwnerShopList;
