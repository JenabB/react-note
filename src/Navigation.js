import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

//pages
import LandingPage from "pages/LandingPage";
import Home from "pages/Home";

//auth
import Register from "components/auth/Register";
import Login from "components/auth/Login";
import Setting from "pages/Setting";
import ChangePassword from "components/auth/ChangePassword";
import UpdateProfile from "components/auth/UpdateProfile";

//shop
import OwnerShopDetails from "components/shop/shop/OwnerShopDetails";
import ChangeShop from "components/shop/shop/ChangeShop";

//product
import Product from "components/shop/shop-product/Products";
import Detail from "components/shop/shop/ShopDetail/Detail";

//invoice
import Invoice from "components/shop/invoice/Invoices";

//context
import { useAuthState } from "hook";
import CreateInvoice from "pages/CreateInvoice";
import InvoiceDetail from "components/shop/invoice/InvoiceDetail";

const Navigation = () => {
  const { user } = useAuthState();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />

        <Route path="home" element={<Home />} />

        <Route path="shop/:id" element={<OwnerShopDetails />}>
          <Route index element={<Detail />} />
          <Route path="products" element={<Product />} />
          <Route path="invoices" element={<Invoice />} />
          <Route path="update-shop" element={<ChangeShop />} />
        </Route>

        <Route path="/setting" element={<Setting />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/update-profile" element={<UpdateProfile />} />

        <Route
          path="shop/:id/invoices/create-invoice"
          element={<CreateInvoice />}
        />

        <Route path="/invoices/:id" element={<InvoiceDetail />} />

        {new Date().toLocaleString() > new Date(user.exp).toLocaleString() ? (
          <Route path="/home" element={<Home />} />
        ) : (
          <Navigate to="login" />
        )}
      </Routes>
    </Router>
  );
};
export default Navigation;
