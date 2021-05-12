import React, { useState } from "react";
import Modal from "react-modal";
import { useAuthState } from "../../hook";
import Swal from "sweetalert2";
import axios from "axios";

const AddShopProduct = ({ id }) => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({
    productName: "",
    productPrice: "",
  });
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
    try {
      setData({ ...data, error: null });
      const res = await axios.post(
        `https://warm-earth-68639.herokuapp.com/v1/shop/${id}/product`,
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
      console.log(res);
      Swal.fire({
        icon: "success",
        text: res.data.message,
        confirmButtonText: "ok",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="mt-4">
        <button
          className="bg-green-500 p-2 rounded-lg hover:px-5 text-white"
          onClick={handleOpenModal}
        >
          Add Product
        </button>
        <Modal isOpen={showModal}>
          <div>
            <button onClick={handleCloseModal}>Close</button>
            <h4 className="text-center mb-2 text-white">Add Product</h4>
            <div className="card py-2 px-5 shadow">
              <form className="text-center">
                <div className="my-2">
                  <h1>Product Name</h1>
                  <input
                    className="bg-blue-200 px-2 py-1"
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
                    className="bg-blue-200 px-2 py-1"
                    type="number"
                    name="productPrice"
                    value={productPrice}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="text-center">
                  <button
                    className="btn bg-green-500 text-white px-3 py-1 rounded-lg"
                    onClick={handleSubmit}
                  >
                    Create
                  </button>
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
