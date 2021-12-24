import React from "react";
import { formatRp } from "../../../../utils/formatRp";

const ModeInside = ({ user }) => {
  return (
    <div>
      {" "}
      {user.shopProduct.length > 0 ? (
        user.shopProduct.map((product, index) => (
          <div
            key={index}
            className="m-2 shadow-lg rounded p-4"
            //   onClick={handleClickProduct}
          >
            <h1 className="text-blue-800">{product.productName}</h1>
            <h2 className="text-gray-500">{formatRp(product.productPrice)}</h2>
            <input
              placeholder="0"
              // value={addProduct.quantity}
              // onChange={(e) =>
              //   setAddProduct({
              //     ...addProduct,
              //     quantity: e.target.value,
              //   })
              // }
            />
          </div>
        ))
      ) : (
        <h1>No product yet</h1>
      )}
    </div>
  );
};

export default ModeInside;
