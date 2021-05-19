import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useAuthDispatch, logout, useAuthState } from "./hook";
import { useHistory } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ShopInvoiceList from "./components/shop/ShopInvoiceList";
import InvoiceDetail from "./components/shop/InvoiceDetail";
import OwnerShopDetails from "./components/shop/OwnerShopDetails";
import ProductDetails from "./components/shop/ProductDetails";

import AddShopProduct from "./components/shop/AddShopProduct";
import GetShopProduct from "./components/shop/GetShopProduct";
import back from "./images/icons/back.png";

const Navigation = () => {
  const [isLogin, SetIsLogin] = useState(false);

  const dispatch = useAuthDispatch();
  const user = useAuthState();

  const history = useHistory();

  function goBack() {
    history.goBack();
  }

  useEffect(() => {
    let token = user.token;
    if (token) {
      SetIsLogin(true);
    } else {
      SetIsLogin(false);
    }
  }, [user.token]);

  return (
    <Router>
      {isLogin ? (
        ""
      ) : (
        <nav className="sticky top-0 z-10 shadow-lg flex justify-between bg-blue-700 text-white p-4">
          <div>
            <Link to="/">
              <h1 className="font-bold text-xl">NOT E</h1>
            </Link>
          </div>
          <div className="flex">
            <div className="mr-5">
              <Link to="/user/register">
                <h1 className="bg-white text-blue-600 px-1 rounded">
                  Register
                </h1>
              </Link>
            </div>
            <div>
              <Link to="/user/login">Login</Link>
            </div>
          </div>
        </nav>
      )}

      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/user" component={Home} />
        <Route exact path="/user/register" component={Register} />
        <Route exact path="/user/login" component={Login} />

        <Route path="/user/shop/:id" component={OwnerShopDetails} />
      </Switch>

      <Route
        exact
        path="/user/shop/:id/product/:id"
        component={ProductDetails}
      />
    </Router>
  );
};
export default Navigation;
