import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//lib
import Swal from "sweetalert2";
import axios from "axios";
import Select from "react-select";
import { formatRp } from "../utils/formatRp";

//utils
import options from "../components/shop/invoice/utils/insertOptions";

//components
import NavWithBack from "../components/common/NavWithBack";

//context
import { useAuthDispatch, useAuthState } from "../hook";

import { formInput } from "../theme/formInput";
import OutsideMode from "../components/shop/invoice/OutsideMode";

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
  console.log(addProduct, "add prod");

  const [invoiceCode] = useState("1");
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

  const handleClickProduct = (e) => {
    e.preventDefault();
    console.log(e);
  };

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
          invoiceCode: invoiceCode,
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
      console.log(res);
      Swal.fire({
        icon: "success",
        text: res.data.message,
        confirmButtonText: "ok",
      });
    } catch (error) {
      if (error.response.data.status === 401) {
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
          confirmButtonText: "ok",
        });
        navigate("login");
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
                  {user.shopProduct.map((product, index) => (
                    <div
                      key={index}
                      className="m-2 shadow-lg rounded p-4"
                      onClick={handleClickProduct}
                    >
                      <h1 className="text-blue-800">{product.productName}</h1>
                      <h2 className="text-gray-500">
                        {formatRp(product.productPrice)}
                      </h2>
                      <input
                        placeholder="0"
                        value={addProduct.quantity}
                        onChange={(e) =>
                          setAddProduct({
                            ...addProduct,
                            quantity: e.target.value,
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <OutsideMode
                    addProduct={addProduct}
                    handleProductChange={handleProductChange}
                    handleUpdateProduct={handleUpdateProduct}
                  />
                </div>
              )}
              <div className="text-center">
                <input
                  type="submit"
                  value="create"
                  className="text-white bg-blue-700 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 px-3 py-1 rounded-lg"
                />
              </div>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
