import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useAuthDispatch } from "../../hook";
import ShopInvoiceList from "./ShopInvoiceList";
import CreateInvoice from "./CreateInvoice";
import AddShopProduct from "./AddShopProduct";
import GetShopProduct from "./GetShopProduct";

const OwnerShopDetails = (props) => {
  const [detail, setDetail] = useState([]);
  const shopId = props.match.params.id;
  const dispatch = useAuthDispatch();

  let history = useHistory();
  function goBack() {
    history.goBack();
  }

  const dateFormat = "dddd, MMMM Do YYYY, h:mm:ss a";

  useEffect(() => {
    axios
      .get(`https://warm-earth-68639.herokuapp.com/v1/shop/${shopId}`, {
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
      <button
        className="absolute top-20 left-3 bg-green-400 text-white px-2 py-1 rounded-lg"
        onClick={goBack}
      >
        Back
      </button>

      <div className="jumbotron-detail text-center py-24">
        <h1 className="font-bold text-lg">{detail.shopName}</h1>
        <h2>{detail.addressDetail}</h2>
        <h3>Created: {moment(detail.createdAt).format(dateFormat)}</h3>
        <p>{detail.contactNumber}</p>
      </div>

      <Router>
        <nav className="bg-green-400 font-bold flex justify-center px-8 py-2 text-white">
          <div className="mx-4">
            <Link to={`/user/shop/detail/${shopId}/product`}>Product</Link>
          </div>
          <div className="mx-4">
            <Link to={`/user/shop/detail/${shopId}/invoice`}>invoice</Link>
          </div>
          <div className="mx-4">
            <Link to={`/user/shop/detail/${shopId}/details`}>Details</Link>
          </div>
        </nav>
        <Switch>
          <Route exact path="/user/shop/detail/:id/product">
            <div className="px-4">
              <AddShopProduct id={shopId} />
              <GetShopProduct id={shopId} />
            </div>
          </Route>
          <Route path="/user/shop/detail/:id/invoice">
            <div className="px-4">
              <CreateInvoice />
              <ShopInvoiceList id={shopId} />
            </div>
          </Route>
          <Route path="/user/shop/detail/:id/detail">
            <div className="px-4">
              <h1>Ini detail</h1>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default OwnerShopDetails;
