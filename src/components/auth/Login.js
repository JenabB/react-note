import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Swal from "sweetalert2";

const Login = (props) => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = data;

    console.log(data);
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setData({ ...data, error: null });
            const res = await axios.post(
                "https://warm-earth-68639.herokuapp.com/v1/user/login/owner",
                {
                    email: email,
                    password: password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(res.data);
            Swal.fire({
                icon: 'success',
                text: "login success",
                confirmButtonText: "ok"
            })
            localStorage.setItem("token", res.data.data.token);
            props.history.push("/");
            window.location.reload()
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: error.response.data.message,
                confirmButtonText: "ok"
            })
        }
    };

    return (
        <div className="mt-10 w-2/3 mx-auto">
            <h4 className="text-muted text-center mb-2">Login</h4>
            <div className="py-2 px-1 shadow">
                <form className="text-center">
                    <div className="mt-4">
                        <h1>Email</h1>
                        <input
                            className="p-2 bg-green-400"
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <h1>Password</h1>
                        <input
                            className="p-2 bg-green-400"
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            required
                        /></div>


                    <div className="my-5">
                        <button className="text-white bg-green-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 px-3 py-1 rounded-lg" onClick={handleSubmit}>
                            Login
            </button>
                    </div>
                    <p className="mt-3 text-center">
                        Dont have an account?
                            <button className="font-bold text-green-600"><Link to="/user/register">Register</Link></button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;