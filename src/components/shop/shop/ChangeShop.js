import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//context
import { useAuthState } from "../../../hook";

import Select from "react-select";
import { motion } from "framer-motion";
import {
  handleAreYouSure,
  handleError,
  handleSuccess,
} from "../../../utils/responseHandler";
import {
  deleteShop,
  getAllCountries,
  getAllProvinces,
  getAllRegencies,
  updateShop,
} from "./actions";

const ChangeShop = () => {
  //context

  const user = useAuthState();

  //state
  const [data, setData] = useState({
    shopName: user.shopDetails.shopName,
    address: user.shopDetails.address,
    contactNumber: user.shopDetails.contactNumber,
  });
  const { shopName, address, contactNumber } = data;

  let navigate = useNavigate();

  const [selectedCountry, setSelectedCountry] = useState(
    user.shopDetails.countryId
  );
  const [selectedProvince, setSelectedProvince] = useState(
    user.shopDetails.provinceId
  );

  const [allCountries, setAllCountries] = useState([]);
  const [allProvinces, setAllProvinces] = useState([]);
  const [allRegencies, setAllRegencies] = useState([]);
  const [selectedRegency, setSelectedRegency] = useState(
    user.shopDetails.regencyId
  );

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
    updateShop(
      user.shopId,
      shopName,
      selectedCountry,
      selectedProvince,
      selectedRegency,
      address,
      contactNumber,
      user.token
    )
      .then((result) => {
        setLoading("change");
        handleSuccess(result);

        navigate(-1);
      })
      .catch((error) => {
        setLoading("change");
        handleError(error);
        if (error.response.data.status === 401) {
          navigate("login");
        }
      });
  };

  const handleDeleteShop = () => {
    handleAreYouSure().then((result) => {
      if (result.isConfirmed) {
        try {
          deleteShop(user.shopId, user.token).then((result) => {
            handleSuccess(result);

            navigate("/home");
          });
        } catch (error) {
          handleError(error);
        }
      }
    });
  };

  return (
    <motion.div
      className="h-screen"
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
      <div className="w-5/6 mx-auto ">
        <div className="mt-4">
          <div>
            <div className="card py-2">
              <form onSubmit={handleShopChange}>
                <div>
                  <h1>Shop name</h1>
                  <input
                    className="bg-white shadow-md p-2 rounded  w-full"
                    type="name"
                    name="shopName"
                    value={shopName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="my-4">
                  <h1>Domicile</h1>
                  <Select
                    className="my-2"
                    options={countriesOptions}
                    placeholder="Indonesia"
                    onChange={handleSelectCountry}
                  />
                  <Select
                    className="my-2"
                    options={provincesOptions}
                    onChange={handleSelectProvince}
                  />
                  <Select
                    className="my-2"
                    options={regenciesOptions}
                    onChange={handleSelectRegency}
                  />
                </div>

                <div className="my-2">
                  <h1>Address Detail</h1>
                  <textarea
                    className="bg-white shadow-md px-2 py-1 w-full"
                    type="name"
                    name="address"
                    rows={5}
                    value={address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="my-2">
                  <h1>Contact Number</h1>
                  <input
                    className="bg-white shadow-md px-2 my-2 py-1 w-full"
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
            className="bg-red-500 text-white w-full"
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
