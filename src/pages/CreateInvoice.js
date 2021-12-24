import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//lib

import axios from "axios";
import Select from "react-select";

//utils
import options from "components/shop/shop-invoice/utils/insertOptions";

//components
import NavWithBack from "components/common/NavWithBack";

//context
import { useAuthDispatch, useAuthState } from "hook";

import { formInput } from "theme/formInput";
import ModeOutside from "components/shop/shop-invoice/create-invoice/ModeOutside";
import ModeInside from "components/shop/shop-invoice/create-invoice/ModeInside";
import { handleError, handleSuccess } from "utils/responseHandler";

const CreateInvoice = () => {
  const HOST = "https://svc-not-e.herokuapp.com";
  const dispatch = useAuthDispatch();
  const user = useAuthState();
  let navigate = useNavigate();

  const [addProduct, setAddProduct] = useState([
    {
      productName: "",
      productPrice: "",
      quantity: "",
    },
  ]);

  // const [insertProduct, setInsertProduct] = useState([]);
  console.log(addProduct, "add prod");

  const [productInsertMode, setProductInsertMode] = useState("inside");

  const [data, setData] = useState({
    customerName: "",
  });

  const handleProductChange = (index, e) => {
    let produks = [...addProduct];
    let produk = produks[index];
    produks[index] = { ...produk, [e.target.name]: e.target.value };
    setAddProduct(produks);
  };

  // const handleAddInsertMode = (productId) => {
  //   setAddProduct();
  // };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    // const prod = [...product];
    // setAddProduct({
    //   productName: "",
    //   productPrice: "",
    //   quantity: "",
    // });

    setAddProduct([
      ...addProduct,
      { productName: "", productPrice: "", quantity: 0 },
    ]);
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

  // const handleClickProduct = (e) => {
  //   // e.preventDefault();
  //   console.log(e);
  // };

  const { customerName } = data;

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
          invoiceCode: "INV002",
          productInsertMode: productInsertMode,
          customerName: customerName,
          products: addProduct,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );

      handleSuccess(res);
    } catch (error) {
      if (error.response.data.status === 401) {
        handleError(error);
        navigate("login");
      } else {
        handleError(error);
      }
    }
  };

  return (
    <div>
      <NavWithBack />
      <div className="mt-4">
        <div>
          <h4 className="text-muted text-center mb-2">Create Invoice</h4>

          <div
            className="sticky top-10 z-10 bg-white shadow-lg p-4 m-4"
            style={{ minHeight: "100px" }}
          >
            <h1 className="text-blue-800 text-xl font-bold">Summary</h1>
            <h1>{customerName}</h1>
            <h2>Insert Mode: {productInsertMode}</h2>
            <div>
              {addProduct.length > 0 ? (
                <div>
                  <h1>total {addProduct.length} product</h1>
                  <h1>Total:</h1>
                </div>
              ) : (
                <h1>no product</h1>
              )}
            </div>
          </div>

          <div className="card py-2 px-5">
            <div className="">
              <div className="my-2 text-center">
                <h1>Customer name</h1>
                <input
                  className={formInput}
                  type="name"
                  name="customerName"
                  value={customerName}
                  onChange={handleChange}
                  required
                />
              </div>
              <Select options={options} onChange={handleInsertMode} />
              {productInsertMode === "inside" ? (
                <div className="mt-10">
                  <ModeInside user={user} />
                </div>
              ) : (
                <div>
                  <ModeOutside
                    addProduct={addProduct}
                    handleProductChange={handleProductChange}
                    handleUpdateProduct={handleUpdateProduct}
                  />
                </div>
              )}
              <div className="text-center">
                <button
                  className="text-white bg-blue-700 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 px-3 py-1 rounded-lg"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
