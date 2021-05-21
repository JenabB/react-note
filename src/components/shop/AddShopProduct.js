import React, { useState } from "react";
import Modal from "react-modal";
import { useAuthState } from "../../hook";
import Swal from "sweetalert2";
import axios from "axios";
import CurrencyInput from "react-currency-input-field";
import add1 from "../../images/icons/add1.png";

const AddShopProduct = ({ id }) => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({
    productName: "",
    productPrice: "",
  });
  const [loading, setLoading] = useState("create");
  const { productName, productPrice } = data;
  const user = useAuthState();

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("Loading...");
    try {
      const res = await axios.post(
        `https://svc-not-e.herokuapp.com/v1/shop/${id}/product`,
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
      Swal.fire({
        icon: "error",
        text: error.response.data.message,
        confirmButtonText: "ok",
      });
    }
  };

  return (
    <div className="lg:w-2/3 mx-auto sm:w-full">
      <div className="mt-4">
        <button className="fixed bottom-4 right-4" onClick={handleOpenModal}>
          <img src={add1} alt="add" width="60px" />
        </button>
        <Modal isOpen={showModal}>
          <div>
            <button onClick={handleCloseModal}>Close</button>
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
                  <CurrencyInput
                    className="w-full text-right p-2"
                    prefix="Rp"
                    placeholder="0"
                    name="productPrice"
                    onValueChange={(value) =>
                      setData({ ...data, productPrice: value })
                    }
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
        </Modal>
      </div>
    </div>
  );
};

export default AddShopProduct;
