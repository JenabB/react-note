import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

//lib
import axios from "axios";

//context
import { useAuthState, useAuthDispatch } from "../../../hook";

import Select from "react-select";
import Swal from "sweetalert2";
import NavWithBack from "../../NavWithBack";
import { motion } from "framer-motion";

const ChangeShop = () => {
  //context
  const dispatch = useAuthDispatch();
  const user = useAuthState();

  //state
  const [data, setData] = useState({
    shopName: user.shopDetails.shopName,
    address: user.shopDetails.address,
    contactNumber: user.shopDetails.contactNumber,
  });
  const { shopName, address, contactNumber } = data;

  let history = useHistory();

  const [selectedCountry, setSelectedCountry] = useState(
    user.shopDetails.countryId
  );
  const [selectedProvince, setSelectedProvince] = useState(
    user.shopDetails.provinceId
  );

  const [allProvinces, setAllProvinces] = useState([]);
  const [allRegencies, setAllRegencies] = useState([]);
  const [selectedRegency, setSelectedRegency] = useState(
    user.shopDetails.regencyId
  );

  const host = "https://svc-not-e.herokuapp.com";

  useEffect(() => {
    fetch(`${host}/v1/area/province?countryId=${selectedCountry}`)
      .then((response) => response.json())
      .then((data) => {
        setAllProvinces(data.data);
      })
      .catch((error) => console.log(error));

    fetch(`${host}/v1/area/regency?provinceId=${selectedProvince}`)
      .then((response) => response.json())
      .then((data) => {
        setAllRegencies(data.data);
        dispatch({ type: "GET_ALL_REGENCIES", payload: data.data });
      })
      .catch((error) => console.log(error));
  }, [dispatch, selectedCountry, selectedProvince]);

  const countriesOptions = user.allCountries.map((c) => ({
    value: c.countryId,
    label: c.niceName,
  }));

  const provincesOptions =
    allProvinces &&
    allProvinces.map((c) => ({
      value: c.provinceId,
      label: c.provinceName,
    }));

  const regenciesOptions =
    allRegencies &&
    allRegencies.map((c) => ({
      value: c.regencyId,
      label: c.regencyName,
    }));

  const handleSelectCountry = (e) => {
    setSelectedCountry(e.value);
  };

  const handleSelectProvince = (e) => {
    setSelectedProvince(e.value);
  };

  const handleSelectRegency = (e) => {
    setSelectedRegency(e.value);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState("change");

  const handleShopChange = (e) => {
    e.preventDefault();
    setLoading("loading...");
    axios
      .put(
        `https://svc-not-e.herokuapp.com/v1/shop/${user.shopId}`,
        {
          shopName: shopName,
          countryId: selectedCountry,
          provinceId: selectedProvince,
          regencyId: selectedRegency,
          address: address,
          contactNumber: contactNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((result) => {
        setLoading("change");
        Swal.fire({
          icon: "success",
          text: result.data.message,
          confirmButtonText: "ok",
        });

        history.goBack();
      })
      .catch((error) => {
        setLoading("change");
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
          confirmButtonText: "ok",
        });
        if (error.response.data.status === 401) {
          history.push("/user/login");
        }
      });
  };

  const handleDeleteShop = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios
            .delete(`https://svc-not-e.herokuapp.com/v1/shop/${user.shopId}`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            })
            .then((result) => {
              Swal.fire({
                icon: "success",
                text: result.data.message,
                confirmButtonText: "ok",
              });

              history.push("/user");
            });
        } catch (error) {
          Swal.fire({
            icon: "error",
            text: error.response.data.message,
            confirmButtonText: "ok",
          });
        }
      }
    });
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {
          scale: 0.8,
          opacity: 0,
        },
        visible: {
          scale: 1,
          opacity: 1,
          transition: {
            delay: 0.9,
          },
        },
      }}
    >
      <NavWithBack />
      <div className="w-5/6 mx-auto">
        <div className="mt-4">
          <div>
            <h4 className="text-muted text-center mb-2">
              Change Shop Information
            </h4>
            <div className="card py-2">
              <form className="text-center" onSubmit={handleShopChange}>
                <div className="my-2">
                  <h1>Shop name</h1>
                  <input
                    className="bg-blue-200 px-2 py-1 w-full"
                    type="name"
                    name="shopName"
                    value={shopName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Select
                  options={countriesOptions}
                  placeholder="Indonesia"
                  onChange={handleSelectCountry}
                />
                <Select
                  options={provincesOptions}
                  onChange={handleSelectProvince}
                />
                <Select
                  options={regenciesOptions}
                  onChange={handleSelectRegency}
                />

                <div className="my-2">
                  <h1>Address Detail</h1>
                  <input
                    className="bg-blue-200 px-2 py-1 w-full"
                    type="name"
                    name="address"
                    value={address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="my-2">
                  <h1>Contact Number</h1>
                  <input
                    className="bg-blue-200 px-2 py-1 w-full"
                    type="number"
                    name="contactNumber"
                    value={contactNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex bottom-0">
                  <input
                    type="submit"
                    value={loading}
                    className="text-white w-screen bg-blue-700 hover:bg-purple-700 px-3 py-1"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div>
          <button
            className="bg-red-500 text-white w-screen"
            onClick={handleDeleteShop}
          >
            <span class="material-icons">delete</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChangeShop;
