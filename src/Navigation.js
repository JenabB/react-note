import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import OwnerShopDetails from "./components/shop/OwnerShopDetails";
import Setting from "./pages/Setting";

import ChangePassword from "./components/auth/ChangePassword";
import UpdateProfile from "./components/auth/UpdateProfile";
import ChangeShop from "./components/shop/ChangeShop";
const Navigation = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/user" component={Home} />
        <Route exact path="/user/register" component={Register} />
        <Route exact path="/user/login" component={Login} />
        <Route exact path="/user/shop/:id" component={OwnerShopDetails} />

        <Route exact path="/user/setting">
          <Setting />
        </Route>
        <Route exact path="/user/setting/change-password">
          <ChangePassword />
        </Route>
        <Route exact path="/user/setting/update-profile">
          <UpdateProfile />
        </Route>
        <Route path="/user/shop/:id/change" component={ChangeShop} />
      </Switch>
    </Router>
  );
};
export default Navigation;
