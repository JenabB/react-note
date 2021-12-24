import { useAuthState } from "hook";

import ProductItem from "./productItem";

const GetShopProduct = () => {
  const { shopProduct } = useAuthState();

  return (
    <div className=" mx-auto sm:w-full">
      {shopProduct?.length > 0 ? (
        shopProduct.map((product, index) => (
          <ProductItem key={index} product={product} />
        ))
      ) : (
        <div>
          <h1 className="text-center">No Product Yet</h1>
        </div>
      )}
    </div>
  );
};

export default GetShopProduct;
