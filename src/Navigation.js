import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { useAuthState } from "./hook";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
// import ShopInvoiceList from "./components/shop/ShopInvoiceList";
// import InvoiceDetail from "./components/shop/InvoiceDetail";
import OwnerShopDetails from "./components/shop/OwnerShopDetails";
// import ProductDetails from "./components/shop/ProductDetails";
import Setting from "./pages/Setting";

import ChangePassword from "./components/auth/ChangePassword";

// import AddShopProduct from "./components/shop/AddShopProduct";
// import GetShopProduct from "./components/shop/GetShopProduct";

const Navigation = () => {
  // const user = useAuthState();

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/user" component={Home} />
        <Route exact path="/user/register" component={Register} />
        <Route exact path="/user/login" component={Login} />
        <Route path="/user/shop/:id" component={OwnerShopDetails} />

        <Route exact path="/user/setting">
          <Setting />
        </Route>

        <Route exact path="/user/setting/change-password">
          <ChangePassword />
        </Route>
      </Switch>
    </Router>
  );
};
export default Navigation;
