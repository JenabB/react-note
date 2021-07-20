import React from 'react';
import { useAuthState } from '../../hook';

const ShopDetails = () => {
  const user = useAuthState();
  return (
    <div>
      <div className="px-4">
        <div className="lg:w-2/3 mx-auto sm:w-full">
          <h1 className="font-bold text-lg">{user.shopDetails.shopName}</h1>
          <h2>{user.shopDetails.address}</h2>
          <p>{user.shopDetails.contactNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;
