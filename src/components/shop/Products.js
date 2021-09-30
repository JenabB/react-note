import React from "react";
import { useAuthState } from "../../hook";

const Products = ({ products }) => {
  return (
    <div className="mt-10 px-4">
      <h1>Product List</h1>
      {products.map((p, i) => (
        <div key={i}>
          <h1>{p.productName}</h1>
        </div>
      ))}
    </div>
  );
};

export default Products;
