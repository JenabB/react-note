import React from "react";
import { formInput } from "../../../theme/formInput";
import { formatRp } from "../../../utils/formatRp";

const ModeOutside = ({
  addProduct,
  handleProductChange,
  handleUpdateProduct,
}) => {
  return (
    <div>
      <h1 className="my-4 mt-12">Insert product here</h1>
      {addProduct.map((product, index) => (
        <div className="my-4 bg-white shadow-md p-4">
          <input
            className={formInput}
            type="name"
            name="productName"
            placeholder="product name"
            value={product.productName}
            onChange={(e) => handleProductChange(index, e)}
            required
          />

          <input
            type="number"
            className={formInput}
            name="productPrice"
            placeholder="product price"
            value={product.productPrice}
            onChange={(e) => handleProductChange(index, e)}
            required
          />

          <input
            type="number"
            name="quantity"
            className="text-right w-2/5 bg-blue-100 px-2 py-2 my-2 mr-2"
            placeholder="quantity"
            value={product.quantity}
            onChange={(e) => handleProductChange(index, e)}
            required
          />
          <div className="p-2 shadow-sm bg-gray-200 rounded-sm">
            <h1>Total: {formatRp(product.productPrice * product.quantity)}</h1>
          </div>
        </div>
      ))}
      <button
        onClick={handleUpdateProduct}
        className="text-white bg-blue-600  px-3 py-1 rounded-lg"
      >
        Add
      </button>
    </div>
  );
};

export default ModeOutside;
