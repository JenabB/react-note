import React, { useEffect, useState } from "react";
import jwt from "jwt-decode"; // import dependency
import CreateShop from "../components/shop/CreateShop";

const Home = (props) => {
    const [user, setUser] = useState({});

    let token = localStorage.getItem("token");

    useEffect(() => {
        setUser(jwt(token));
    }, [token]);

    console.log(user);

    const logout = () => {
        localStorage.removeItem("token");
        props.history.push("/user/login");
    };

    if (!localStorage.getItem("token")) {
        props.history.push("/user/login");
    }
    return (
        <div>
            <nav className="">
                <p className="lead">Welcome {user.fullName}</p>
                <button className="btn btn-danger" onClick={logout}>
                    Logout
        </button>
            </nav>
            <div className="m-5">
                <CreateShop />
            </div>
        </div>
    );
};

export default Home;
