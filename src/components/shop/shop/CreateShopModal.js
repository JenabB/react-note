import { useEffect, useState } from "react";
import { useAuthState } from "../../../hook";

import { useNavigate } from "react-router-dom";

import Select from "react-select";
import { motion } from "framer-motion";
import {
  createShop,
  getAllCountries,
  getAllProvinces,
  getAllRegencies,
} from "./actions";
import { handleError, handleSuccess } from "../../../utils/responseHandler";

const CreateShopModal = ({ setIsOpen }) => {
  const user = useAuthState();

  const [data, setData] = useState({
    shopName: "",
    address: "",
    contactNumber: "",
  });

  const { shopName, address, contactNumber } = data;

  let navigate = useNavigate();
  const [loading, setLoading] = useState("create");

  const [allCountries, setAllCountries] = useState([]);
  const [allProvinces, setAllProvinces] = useState([]);
  const [allRegencies, setAllRegencies] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("100");
  const [selectedProvince, setSelectedProvince] = useState("9");
  const [selectedRegency, setSelectedRegency] = useState("10");

  useEffect(() => {
    getAllCountries()
      .then((data) => {
        setAllCountries(data.data);
      })
      .catch((error) => console.log(error));

    getAllProvinces(selectedCountry)
      .then((data) => {
        setAllProvinces(data.data);
      })
      .catch((error) => console.log(error));

    getAllRegencies(selectedProvince)
      .then((data) => {
        setAllRegencies(data.data);
      })
      .catch((error) => console.log(error));
  }, [selectedCountry, selectedProvince]);

  const countriesOptions = allCountries.map((c) => ({
    value: c.countryId,
    label: c.niceName,
  }));

  const provinciesOptions = allProvinces.map((c) => ({
    value: c.provinceId,
    label: c.provinceName,
  }));

  const regenciesOptions = allRegencies.map((c) => ({
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("Loading...");
    try {
      setData({ ...data, error: null });
      const res = await createShop(
        shopName,
        selectedCountry,
        selectedProvince,
        selectedRegency,
        address,
        contactNumber,
        user.token
      );
      handleSuccess(res);
      setLoading("create");
    } catch (error) {
      setLoading("create");
      if (error.response.data.status === 401) {
        handleError(error);
        navigate("login");
      } else {
        handleError(error);
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
      <div className="modal absolute z-50 bg-white shadow-lg p-4 rounded-lg">
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
