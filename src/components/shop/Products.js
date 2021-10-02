import React from "react";

const Products = ({ products }) => {
  return (
    <div className="mt-10 px-4">
      <h1>Product List</h1>
      {products.map((p, i) => (
        <div key={i} className="shadow-lg m-4 p-4">
          <h1 className="text-blue-600 text-bold">{p.productName}</h1>
          <p>{p.productPrice}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
