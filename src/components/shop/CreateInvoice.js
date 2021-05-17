import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import axios from "axios";
import Select from "react-select";
import { useAuthDispatch, useAuthState } from "../../hook";

const CreateInvoice = () => {
  const HOST = "https://svc-not-e.herokuapp.com";
  const dispatch = useAuthDispatch();
  const user = useAuthState();

  const [product, setProduct] = useState([]);
  const [addProduct, setAddProduct] = useState({
    productName: "",
    productPrice: "",
    quantity: "",
  });

  const [invoiceCode] = useState("1");
  const [productInsertMode, setProductInsertMode] = useState("inside");

  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({
    customerName: "",
  });

  const options = [
    { value: "inside", label: "inside" },
    { value: "outside", label: "outside" },
  ];

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    setProduct([...product, addProduct]);
    setAddProduct({
      productName: "",
      productPrice: "",
      quantity: "",
    });
  };

  useEffect(() => {
    axios
      .get(`${HOST}/v1/shop/${user.shopId}/product`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((result) => {
        dispatch({ type: "GET_SHOP_PRODUCT", payload: result.data.data });
      });
  }, [dispatch, user.shopId, user.token]);

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
        `https://svc-not-e.herokuapp.com/v1/shop/${user.shopId}/invoice`,
        {
          invoiceCode: invoiceCode,
          productInsertMode: productInsertMode,
          customerName: customerName,
          products: product,
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
                {productInsertMode === "inside" ? (
                  <div className="grid grid-cols-4">
                    {user.shopProduct.map((product, index) => (
                      <div key={index} className="m-2 shadow rounded p-2">
                        <h1>{product.productName}</h1>
                        <h2>{product.productPrice}</h2>
                      </div>
                    ))}
                  </div>
                ) : (
                  <form onSubmit={handleUpdateProduct}>
                    <input
                      type="text"
                      placeholder="product name"
                      value={addProduct.productName}
                      onChange={(e) =>
                        setAddProduct({
                          ...addProduct,
                          productName: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      placeholder="product price"
                      value={addProduct.productPrice}
                      onChange={(e) =>
                        setAddProduct({
                          ...addProduct,
                          productPrice: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      placeholder="quantity"
                      value={addProduct.quantity}
                      onChange={(e) =>
                        setAddProduct({
                          ...addProduct,
                          quantity: e.target.value,
                        })
                      }
                    />
                    <button>Submit</button>
                  </form>
                )}
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
