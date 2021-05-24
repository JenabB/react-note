import React, { useState, useEffect } from "react";
import axios from "axios";
import { Switch, useHistory } from "react-router-dom";
import moment from "moment";
import { BrowserRouter as Route, Link, useRouteMatch } from "react-router-dom";
import { useAuthState, useAuthDispatch } from "../../hook";
import ShopInvoiceList from "./ShopInvoiceList";
import CreateInvoice from "./CreateInvoice";

// import ProductDetails from "./ProductDetails";
import lady from "../../images/home1.png";
import location from "../../images/location.png";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Product from "./Product";

const OwnerShopDetails = (props) => {
  const [detail, setDetail] = useState([]);
  const shopId = props.match.params.id;
  const dispatch = useAuthDispatch();
  const user = useAuthState();

  let { path, url } = useRouteMatch();
  let history = useHistory();

  function goBack() {
    history.goBack();
  }
  const dateFormat = "dddd, MMMM Do YYYY, h:mm:ss a";

  useEffect(() => {
    axios
      .get(`https://svc-not-e.herokuapp.com/v1/shop/${shopId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((result) => {
        setDetail(result.data.data);
        dispatch({ type: "GET_SHOP_DETAIL", payload: result.data.data });
        dispatch({ type: "GET_SHOP_ID", payload: shopId });
      });
  }, [dispatch, shopId]);

  return (
    <div>
      <nav className="sticky top-0 z-10 shadow-lg flex justify-between bg-blue-700 text-white p-4">
        <div>
          <button onClick={goBack}>
            <AiOutlineArrowLeft size="28px" />
          </button>
        </div>
        <div>
          <Link to="/user">Home</Link>
        </div>
        <div></div>
      </nav>

      <div className="mx-auto sm:w-full bg-white h-screen">
        <div className="lg:p-10 sm:p-2 py-5">
          <div className=" mt-5 flex justify-between shadow-lg lg:px-10 sm:px-0 h-2/6">
            <div className="flex">
              <div className="w-2/4">
                <img src={lady} alt="lady" width="200px" />
              </div>
              <div className="w-2/4">
                <h1 className="font-bold text-lg">{detail.shopName}</h1>
                {detail.Country ? (
                  <div className="flex flex-wrap items-center">
                    <img src={location} width="30px" alt="location" />
                    <h2 className="mx-2">{detail.Country.niceName}</h2>
                    <h3 className="mx-1">{detail.Province.provinceName}</h3>
                    <h4 className="mx-2">{detail.Regency.regencyName}</h4>
                  </div>
                ) : (
                  <h1>Loading...</h1>
                )}
              </div>
            </div>

            <div>
              <div className="rounded shadow-lg inline-block p-2 text-center">
                <h1>Products</h1>
                {user.shopProduct ? (
                  <h2 className="text-blue-700 font-bold">
                    {user.shopProduct.length}
                  </h2>
                ) : (
                  <h2 className="text-blue-700 font-bold">0</h2>
                )}
              </div>

              <div className="rounded shadow-lg inline-block p-2 text-center">
                <h1>Invoices</h1>
                {user.shopInvoice ? (
                  <h2 className="text-blue-700 font-bold">
                    {user.shopInvoice.length}
                  </h2>
                ) : (
                  <h2 className="text-blue-700 font-bold">0</h2>
                )}
              </div>
            </div>
          </div>
        </div>

        <nav className="bg-blue-400 font-bold flex justify-center px-8 py-2 text-white">
          <div className="mx-4">
            <Link to={`${url}/`}>Details</Link>
          </div>
          <div className="mx-4">
            <Link to={`${url}/product`}>Product</Link>
          </div>
          <div className="mx-4">
            <Link to={`${url}/invoice`}>invoice</Link>
          </div>
        </nav>

        <Switch>
          <Route exact path={`${path}/`}>
            <Link to="/user/setting">
              <div className="px-4">
                <div className="lg:w-2/3 mx-auto sm:w-full">
                  <h1 className="font-bold text-lg">{detail.shopName}</h1>
                  <h2>{detail.addressDetail}</h2>
                  <h3>
                    Created: {moment(detail.createdAt).format(dateFormat)}
                  </h3>
                  <p>{detail.contactNumber}</p>
                </div>
              </div>
            </Link>
          </Route>
          <Route exact path={`${path}/product`}>
            <Product />
          </Route>
          <Route exact path={`${path}/invoice`}>
            <div className="px-4">
              <CreateInvoice />
              <ShopInvoiceList id={shopId} />
            </div>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default OwnerShopDetails;
