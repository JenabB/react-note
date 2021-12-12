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
          <Route index s element={<Product />} />
          <Route path="invoice" element={<Invoice />} />
        </Route>

        <Route path="/setting" element={<Setting />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/update-profile" element={<UpdateProfile />} />

        <Route path="shop/:id/update-shop" element={<ChangeShop />} />
        <Route
          path="shop/:id/invoice/create-invoice"
          element={<CreateInvoice />}
        />

        {/* {new Date().toLocaleString() >
        new Date(user.user.exp).toLocaleString() ? (
          <Route path="/home" element={<Home />} />
        ) : (
          <Navigate to="login" />
        )}
       

    
        <Route exact path="/shop/:id" component={OwnerShopDetails} />
   
    

        <Route path="/shop/:id/product/:id/edit" component={EditProduct} />
        <Route exact path="/shop/:id/invoice" component={Invoice} />
         */}
      </Routes>
    </Router>
  );
};
export default Navigation;
