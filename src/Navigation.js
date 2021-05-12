import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useAuthDispatch, logout, useAuthState } from "./hook";

import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ShopInvoiceList from "./components/shop/ShopInvoiceList";
import InvoiceDetail from "./components/shop/InvoiceDetail";
import OwnerShopDetails from "./components/shop/OwnerShopDetails";

import cart from "./images/cart.png";

const Navigation = () => {
  const [isLogin, SetIsLogin] = useState(false);

  const dispatch = useAuthDispatch();
  const user = useAuthState();

  useEffect(() => {
    let token = user.token;
    if (token) {
      SetIsLogin(true);
    } else {
      SetIsLogin(false);
    }
  }, [user.token]);

  const handleLogout = () => {
    logout(dispatch);
    SetIsLogin(false);
  };

  return (
    <Router>
      {isLogin ? (
        <nav className="sticky top-0 z-10 shadow-lg flex justify-between bg-green-500 text-white p-4">
          <div>
            <Link to="/user/login" onClick={handleLogout}>
              Logout
            </Link>
          </div>
          <div>
            <Link to="/user">Home</Link>
          </div>
          <div>
            <Link to={`/user/shop/${user.shopId}/invoice/${user.inovoiceId}`}>
              <img src={cart} alt="cart" width="30px" />
            </Link>
          </div>
        </nav>
      ) : (
        <nav className="sticky top-0 z-10 shadow-lg flex justify-between bg-green-500 text-white p-4">
          <div>
            <Link to="/">NOTE</Link>
          </div>
          <div className="flex">
            <div className="mr-5">
              <Link to="/user/register">
                <h1 className="bg-white text-green-400 px-1 rounded">
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
        <Route
          exact
          path="/user/shop/:id/detail"
          component={OwnerShopDetails}
        />
        <Route
          exact
          path="/user/shop/:id/invoice"
          component={ShopInvoiceList}
        />
        <Route
          exact
          path="/user/shop/:id/invoice/:id"
          component={InvoiceDetail}
        />
      </Switch>
    </Router>
  );
};
export default Navigation;
