import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthState } from "../../../hook";
import Swal from "sweetalert2";
import axios from "axios";

const AddProductModal = ({ setIsOpen }) => {
  const [data, setData] = useState({
    productName: "",
    productPrice: "",
  });
  const [loading, setLoading] = useState("create");
  const { productName, productPrice } = data;
  const user = useAuthState();
  let history = useHistory();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading("Loading...");
    try {
      const res = await axios.post(
        `https://svc-not-e.herokuapp.com/v1/shop/${user.shopId}/product`,
        {
          productName: productName,
          productPrice: productPrice,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setLoading("create");
      Swal.fire({
        icon: "success",
        text: res.data.message,
        confirmButtonText: "ok",
      });
      setData({ ...data, productName: "", productPrice: "" });
    } catch (error) {
      setLoading("create");
      if (error.response.data.status === 401) {
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
          confirmButtonText: "ok",
        });
        history.push("/user/login");
      } else {
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
          confirmButtonText: "ok",
        });
      }
    }
  };

  return (
    <div className="modal absolute bg-white shadow-lg p-4 rounded-lg">
      <div className="text-right">
        <button
          className="bg-red-400 px-3 py-1 rounded-lg text-white"
          onClick={() => setIsOpen(false)}
        >
          X
        </button>
      </div>
      <div>
        <h4 className="text-center mb-2 text-white">Add Product</h4>
        <div className="card py-2 px-5">
          <form className="text-center" onSubmit={handleSubmit}>
            <div className="my-2">
              <h1>Product Name</h1>
              <input
                className=" text-center bg-blue-200 px-2 py-1 w-full"
                type="name"
                name="productName"
                value={productName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="my-2">
              <h1>Product Price</h1>
              <input
                className="w-full text-right p-2"
                placeholder="0"
                type="number"
                min="0"
                name="productPrice"
                value={productPrice}
                onChange={handleChange}
                required
              />
            </div>

            <div className="text-center">
              <input
                type="submit"
                value={loading}
                className="text-white bg-blue-700 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 px-3 py-1 rounded-lg"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
