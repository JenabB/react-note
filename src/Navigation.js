import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import OwnerShopDetails from './components/shop/OwnerShopDetails';
import Setting from './pages/Setting';
import ChangePassword from './components/auth/ChangePassword';
import UpdateProfile from './components/auth/UpdateProfile';
import ChangeShop from './components/shop/ChangeShop';

import ShopDetails from './components/shop/ShopDetails';
import Product from './components/shop/product/Product';
import Invoice from './components/shop/invoice/Invoice';

const Navigation = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/user" component={Home} />
        <Route path="/user/register" component={Register} />
        <Route path="/user/login" component={Login} />
        <Route exact path="/user/shop/:id" component={OwnerShopDetails} />

        <Route exact path="/user/setting" component={Setting} />
        <Route
          path="/user/setting/change-password"
          component={ChangePassword}
        />
        <Route path="/user/setting/update-profile" component={UpdateProfile} />
        <Route path="/user/shop/:id/change" component={ChangeShop} />

        <Switch>
          <Route exact path="/user/shop/:id" component={ShopDetails} />
          <Route path="/user/shop/:id/product" component={Product} />
          <Route path="/user/shop/:id/invoice" component={Invoice} />
        </Switch>
      </Switch>
    </Router>
  );
};
export default Navigation;
