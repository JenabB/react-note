import { useEffect, useState } from "react";
import { useAuthDispatch, useAuthState } from "../../hook";

import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Select from "react-select";
import { motion } from "framer-motion";

const CreateShopModal = ({ setIsOpen }) => {
  const user = useAuthState();
  const dispatch = useAuthDispatch();
  const [data, setData] = useState({
    shopName: "",
    address: "",
    contactNumber: "",
  });

  let history = useHistory();
  const [loading, setLoading] = useState("create");

  const [selectedCountry, setSelectedCountry] = useState("100");
  const [selectedProvince, setSelectedProvince] = useState("9");
  const [allRegencies, setAllRegencies] = useState([]);
  const [selectedRegency, setSelectedRegency] = useState("10");

  const host = "https://svc-not-e.herokuapp.com";
  useEffect(() => {
    fetch(`${host}/v1/area/country`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "GET_ALL_COUNTRIES", payload: data.data });
      })
      .catch((error) => console.log(error));

    fetch(`${host}/v1/area/province?countryId=${selectedCountry}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "GET_ALL_PROVINCES", payload: data.data });
      })
      .catch((error) => console.log(error));

    fetch(`${host}/v1/area/regency?provinceId=${selectedProvince}`)
      .then((response) => response.json())
      .then((data) => {
        setAllRegencies(data.data);
        dispatch({ type: "GET_ALL_REGENCIES", payload: data.data });
      })
      .catch((error) => console.log(error));
  }, [data, dispatch, selectedCountry, selectedProvince]);

  const countriesOptions = user.allCountries.map((c) => ({
    value: c.countryId,
    label: c.niceName,
  }));

  const provinciesOptions = user.allProvinces.map((c) => ({
    value: c.provinceId,
    label: c.provinceName,
  }));

  const regenciesOptions = allRegencies.map((c) => ({
    value: c.regencyId,
    label: c.regencyName,
  }));

  const { shopName, address, contactNumber } = data;

  const handleSelectCountry = (e) => {
    setSelectedCountry(e.value);
    dispatch({ type: "GET_COUNTRY_ID", payload: e.value });
  };

  const handleSelectProvince = (e) => {
    setSelectedProvince(e.value);
    dispatch({ type: "GET_PROVINCE_ID", payload: e.value });
  };

  const handleSelectRegency = (e) => {
    setSelectedRegency(e.value);
    dispatch({ type: "GET_REGENCY_ID", payload: e.value });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("Loading...");
    try {
      setData({ ...data, error: null });
      const res = await axios.post(
        `${host}/v1/shop`,
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
      );

      Swal.fire({
        icon: "success",
        text: res.data.message,
        confirmButtonText: "ok",
      });
      setLoading("create");

      setData({ ...data, shopName: "", addressDetail: "", contactNumber: "" });
    } catch (error) {
      setLoading("create");
      if (error.response.data.status === 401) {
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
          confirmButtonText: "ok",
        });
        history.push("/user/login");
      } else {
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
          confirmButtonText: "ok",
        });
      }
    }
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {
          scale: 0.1,
          opacity: 0.1,
        },
        visible: {
          scale: 1,
          opacity: 1,
          transition: {
            delay: 0.5,
          },
        },
      }}
    >
      <div className="modal absolute bg-white shadow-lg p-4 rounded-lg">
        <div className="text-right">
          <button
            className="bg-red-400 px-3 py-1 rounded-lg text-white"
            onClick={() => setIsOpen(false)}
          >
            X
          </button>
        </div>
        <div>
          <div>
            <h4 className="text-muted text-center mb-2">Create Shop</h4>
            <div className="card py-2 sm:px-10">
              <form className="text-center p-4 " onSubmit={handleSubmit}>
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
                  options={provinciesOptions}
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

                <div className="text-center mt-10">
                  <input
                    type="submit"
                    value={loading}
                    className="text-white bg-blue-700 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 px-3 py-1 rounded-lg"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CreateShopModal;
