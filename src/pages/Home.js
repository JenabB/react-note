import React, { useEffect, useState } from "react";
import jwt from "jwt-decode";
import CreateShop from "../components/shop/CreateShop";
import OwnerShopList from "../components/shop/OwnerShopList";

const Home = (props) => {
    const [user, setUser] = useState({});

    let token = localStorage.getItem("token");

    useEffect(() => {
        try {
            setUser(jwt(token));
        } catch (error) {
            console.log("no token")
        }

    }, [token]);

    if (!localStorage.getItem("token")) {
        props.history.push("/user/login");
    }
    return (
        <div>
            <div className="jumbotron py-12">
                <div className="jumbotron-inner text-center text-white">
                    <h1 className="font-bold  text-lg">Welcome {user.fullName}</h1>
                    <h2>Create Shop, Btw Ziva unch kali</h2>
                </div>
            </div>

            <div className="m-5">
                <CreateShop />
            </div>

            <div>
                <OwnerShopList />
            </div>
        </div>
    );
};

export default Home;
