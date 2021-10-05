import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

//lib
import Swal from "sweetalert2";
import axios from "axios";
import Select from "react-select";
import { formatRp } from "../utils/formatRp";

//utils
import options from "../components/shop/invoice/utils/insertOptions";

//components
import NavWithBack from "../components/NavWithBack";

//context
import { useAuthDispatch, useAuthState } from "../hook";

import CurrencyInput from "react-currency-input-field";

const CreateInvoice = () => {
  const HOST = "https://svc-not-e.herokuapp.com";
  const dispatch = useAuthDispatch();
  const user = useAuthState();
  let history = useHistory();
  const [product, setProduct] = useState([]);
  const [addProduct, setAddProduct] = useState({
    productName: "",
    productPrice: "",
    quantity: "",
  });

  const [invoiceCode] = useState("1");
  const [productInsertMode, setProductInsertMode] = useState("inside");

  const [data, setData] = useState({
    customerName: "",
  });

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

    const insertedProduct = user.shopProduct;
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
          products: product,
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
    <div>
      <NavWithBack />
      <div className="mt-4">
        <div>
          <h4 className="text-muted text-center mb-2">Create Invoice</h4>

          <div
            className="sticky top-10 z-10 bg-white shadow-lg p-4 m-4"
            style={{ minHeight: "200px" }}
          >
            <h1>{customerName}</h1>
            <h2>Insert Mode: {productInsertMode}</h2>
          </div>

          <div className="card py-2 px-5">
            <div className="">
              <div className="my-2 text-center">
                <h1>Customer name</h1>
                <input
                  className="bg-blue-200 px-2 py-1 w-full"
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
                <form onSubmit={handleUpdateProduct} className="my-4">
                  <input
                    className="w-full text-center bg-blue-100 px-2 py-2 my-2"
                    type="name"
                    placeholder="product name"
                    value={addProduct.productName}
                    onChange={(e) =>
                      setAddProduct({
                        ...addProduct,
                        productName: e.target.value,
                      })
                    }
                    required
                  />

                  <CurrencyInput
                    className="w-full bg-blue-100 text-right my-2 px-2 py-1"
                    prefix="Rp"
                    placeholder="0"
                    name="productPrice"
                    onValueChange={(value) =>
                      setAddProduct({
                        ...addProduct,
                        productPrice: value,
                      })
                    }
                  />
                  {/* <input
                      type="text"
                      placeholder="product price"
                      value={addProduct.productPrice}
                      onChange={(e) =>
                        setAddProduct({
                          ...addProduct,
                          productPrice: e.target.value,
                        })
                      }
                      required
                    /> */}

                  <input
                    type="number"
                    className="text-right w-4/5 bg-blue-100 px-2 py-2 my-2 mr-2"
                    placeholder="quantity"
                    value={addProduct.quantity}
                    onChange={(e) =>
                      setAddProduct({
                        ...addProduct,
                        quantity: e.target.value,
                      })
                    }
                    required
                  />
                  <input
                    type="submit"
                    value="add"
                    className="text-white bg-blue-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 px-3 py-1 rounded-lg"
                  />
                </form>
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
