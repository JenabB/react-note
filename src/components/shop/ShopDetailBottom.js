import React from "react";
import {
  BrowserRouter as Link,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";

import Product from "./Product";
import Invoice from "./Invoice";
import { useAuthState } from "../../hook";

const ShopDetailBottom = () => {
  const user = useAuthState();
  let { path, url } = useRouteMatch();
  return (
    <div>
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
                <h1 className="font-bold text-lg">
                  {user.shopDetails.shopName}
                </h1>
                <h2>{user.shopDetails.address}</h2>
                <p>{user.shopDetails.contactNumber}</p>
              </div>
            </div>
          </Link>
        </Route>
        <Route exact path={`${path}/product`}>
          <Product />
        </Route>
        <Route exact path={`${path}/invoice`}>
          <Invoice />
        </Route>
      </Switch>
    </div>
  );
};

export default ShopDetailBottom;
