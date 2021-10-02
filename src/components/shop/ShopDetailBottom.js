import React from "react";
import { Link } from "react-router-dom";

//context
import { useAuthState } from "../../hook";

const ShopDetailBottom = () => {
  const user = useAuthState();
  return (
    <div>
      <nav className="bg-blue-400 font-bold flex justify-center px-8 py-2 text-white">
        <div className="mx-4">
          <Link to={`${user.shopId}/product`}>Product</Link>
        </div>
        <div className="mx-4">
          <Link to={`${user.shopId}/invoice`}>invoice</Link>
        </div>
      </nav>
    </div>
  );
};

export default ShopDetailBottom;
