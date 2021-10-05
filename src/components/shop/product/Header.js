import { useState, useEffect } from "react";
import { useAuthState } from "../../../hook";
import { formatRp } from "../../../utils/formatRp";

const Header = () => {
  const user = useAuthState();
  const [products, setProducts] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setProducts([]);
    user.shopProduct.forEach((el) => {
      products.push(el.productPrice);
    });

    const total = products.reduce((prev, curr) => prev + curr, 0);

    setTotalPrice(total);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.shopProduct]);

  return (
    <div className="bg-blue-600 pt-5 rounded-b-3xl" style={{ height: "100px" }}>
      <div
        style={{ height: "100px" }}
        className="p-6 bg-white flex justify-between shadow-lg font-bold rounded-lg w-5/6 mx-auto text-center"
      >
        <div>
          <h1 className>Total Products</h1>
          <p className="text-gray-400">{user.shopProduct.length}</p>
        </div>
        <div>
          <h1>Total Price</h1>
          <p className="text-gray-400">{formatRp(totalPrice)}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
