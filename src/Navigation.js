import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

//pages
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";

//auth
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Setting from "./pages/Setting";
import ChangePassword from "./components/auth/ChangePassword";
import UpdateProfile from "./components/auth/UpdateProfile";

//shop
import OwnerShopDetails from "./components/shop/OwnerShopDetails";
import ChangeShop from "./components/shop/ChangeShop";
import ShopDetails from "./components/shop/ShopDetails";
import Product from "./components/shop/product/Product";
import Invoice from "./components/shop/invoice/Invoice";

//context
import { useAuthState } from "./hook";

const Navigation = () => {
  const user = useAuthState();

  return (
    <Router>
      <Switch>
        {/* landing */}
        <Route exact path="/" component={LandingPage} />

        {/* auth */}
        <Route path="/user/register" component={Register} />
        <Route path="/user/login" component={Login} />
        {new Date().toLocaleString() >
        new Date(user.user.exp).toLocaleString() ? (
          <Route exact path="/user" component={Home} />
        ) : (
          <Redirect to="/user/login" />
        )}
        <Route exact path="/user/setting" component={Setting} />
        <Route
          path="/user/setting/change-password"
          component={ChangePassword}
        />
        <Route path="/user/setting/update-profile" component={UpdateProfile} />

        {/* shop */}
        <Route exact path="/shop/:id" component={OwnerShopDetails} />
        <Route path="/shop/:id/change" component={ChangeShop} />

        <Switch>
          <Route exact path="/shop/:id" component={ShopDetails} />
          <Route path="/shop/:id/product" component={Product} />
          <Route path="/shop/:id/invoice" component={Invoice} />
        </Switch>
      </Switch>
    </Router>
  );
};
export default Navigation;
