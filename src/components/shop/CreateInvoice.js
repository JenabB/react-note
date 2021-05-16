import React, { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import axios from "axios";
import Select from "react-select";
import { useAuthState } from "../../hook";

const CreateInvoice = () => {
  const user = useAuthState();

  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({
    customerName: "",
  });

  const [invoiceCode, setInvoiceCode] = useState("1");
  const [productInsertMode, setProductInsertMode] = useState("inside");

  const [products, setProduct] = useState([]);

  const options = [
    { value: "inside", label: "inside" },
    { value: "outside", label: "outside" },
  ];
  const handleInsertMode = (e) => {
    setProductInsertMode(e.value);
  };
  const { customerName } = data;

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
        "https://warm-earth-68639.herokuapp.com/v1/shop",
        {
          invoiceCode: invoiceCode,
          productInsertMode: productInsertMode,
          customerName: customerName,
          products: products,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
          className="bg-green-500 p-2 rounded-lg text-white hover:px-5"
          onClick={handleOpenModal}
        >
          Create Invoice
        </button>
        <Modal isOpen={showModal}>
          <div>
            <button onClick={handleCloseModal}>Close</button>
            <h4 className="text-muted text-center mb-2">Create Invoice</h4>
            <div className="card py-2 px-5 shadow">
              <form className="text-center">
                <div className="my-2">
                  <h1>Customer name</h1>
                  <input
                    className="bg-blue-200 px-2 py-1"
                    type="name"
                    name="customerName"
                    value={customerName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Select options={options} onChange={handleInsertMode} />
                <div className="grid grid-cols-4">
                  {user.shopProduct.map((product, index) => (
                    <div key={index} className="m-2 shadow rounded p-2">
                      <h1>{product.productName}</h1>
                      <h2>{product.productPrice}</h2>
                    </div>
                  ))}
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

export default CreateInvoice;
