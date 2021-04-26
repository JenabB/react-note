import { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home"
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

const Navigation = (props) => {
  const [isLogin, setIsLogin] = useState(false)


  let token = localStorage.getItem("token")


  useEffect(() => {
    token ? (setIsLogin(true)
    ) : (setIsLogin(false))
  }, [token])

  return (

    <Router>
      {isLogin ? (
        <div className="flex justify-between bg-green-500 text-white p-4">
          <div>
            <Link
              to="/user/login"
              onClick={() => localStorage.removeItem("token")}
            >
              Logout
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex justify-between bg-green-500 text-white p-4">
          <div>
            <Link to="/user">Home</Link>
          </div>
          <div className="flex">
            <div className="mr-2">
              <Link to="/user/register">Register</Link>
            </div>
            <div>
              <Link to="/user/login">Login</Link>
            </div>
          </div>
        </div>
      )}

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/user" component={Home} />
        <Route exact path="/user/register" component={Register} />
        <Route exact path="/user/login" component={Login} />
      </Switch>
    </Router>

  )
}


export default Navigation;