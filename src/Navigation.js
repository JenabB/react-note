import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
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
import OwnerShopDetails from "./components/shop/shop/OwnerShopDetails";
import ChangeShop from "./components/shop/shop/ChangeShop";

//product
import Product from "./components/shop/product/Product";
import EditProduct from "./components/shop/product/EditProduct";

//invoice
import Invoice from "./components/shop/invoice/Invoice";

//context
import { useAuthState } from "./hook";
import CreateInvoice from "./pages/CreateInvoice";

const Navigation = () => {
  const user = useAuthState();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />

        <Route path="home" element={<Home />} />

        <Route path="shop/:id" element={<OwnerShopDetails />}>
          <Route index path="product" element={<Product />} />
          <Route path="invoice" element={<Invoice />} />
        </Route>
        {/* {new Date().toLocaleString() >
        new Date(user.user.exp).toLocaleString() ? (
          <Route path="/home" element={<Home />} />
        ) : (
          <Navigate to="login" />
        )}
        <Route exact path="/user/setting" component={Setting} />
        <Route
          path="/user/setting/change-password"
          component={ChangePassword}
        />
        <Route path="/user/setting/update-profile" component={UpdateProfile} />

    
        <Route exact path="/shop/:id" component={OwnerShopDetails} />
        <Route path="/shop/:id/change" component={ChangeShop} />
        <Route exact path="/shop/:id/product" component={Product} />

        <Route path="/shop/:id/product/:id/edit" component={EditProduct} />
        <Route exact path="/shop/:id/invoice" component={Invoice} />
        <Route path="/shop/:id/invoice/create" component={CreateInvoice} /> */}
      </Routes>
    </Router>
  );
};
export default Navigation;
