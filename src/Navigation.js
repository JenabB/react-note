import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import InvoiceDetail from "./components/shop/InvoiceDetail";

import OwnerShopDetails from "./components/shop/OwnerShopDetails"
import cart from "./images/cart.png";

const Navigation = () => {
  const [isLogin, SetIsLogin] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      SetIsLogin(true);

    } else {
      SetIsLogin(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    SetIsLogin(false)
  };

  return (
    <Router>
      {isLogin ? (
        <div className='sticky top-0 flex justify-between bg-green-500 text-white p-4'>
          <div>
            <Link to='/user/login' onClick={logout}>
              Logout
            </Link>
          </div>
          <div>
            <Link><img src={cart} alt="cart" width="30px" /></Link>
          </div>

        </div>
      ) : (
        <div className='sticky top-0 flex justify-between bg-green-500 text-white p-4'>
          <div>
            <Link to='/user'>Home</Link>
          </div>
          <div className='flex'>
            <div className='mr-2'>
              <Link to='/user/register'>Register</Link>
            </div>
            <div>
              <Link to='/user/login'>Login</Link>
            </div>
          </div>
        </div>
      )}

      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/user/register' component={Register} />
        <Route exact path='/user/login' component={Login} />
        <Route exact path='/user/shop/detail/:id' component={OwnerShopDetails} />
        <Route exact path='/user/shop/:id/invoice' component={InvoiceDetail} />
        <Route exact path='/user/shop/:id/invoice/:id' component={InvoiceDetail} />
      </Switch>
    </Router>
  );
};
export default Navigation;