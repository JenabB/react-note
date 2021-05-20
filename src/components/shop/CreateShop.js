import React, { useEffect, useState } from "react";
import { useAuthState } from "../../hook";
import Modal from "react-modal";
import Swal from "sweetalert2";
import axios from "axios";
import Select from "react-select";

const CreateShop = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({
    shopName: "",
    addressDetail: "",
    contactNumber: "",
  });

  const [allCountries, setAllCounties] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("100");
  const [allProvincies, setAllProvincies] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("9");
  const [allRegencies, setAllRegencies] = useState([]);
  const [selectedRegency, setSelectedRegency] = useState("10");

  const host = "https://svc-not-e.herokuapp.com";
  useEffect(() => {
    fetch(`${host}/v1/area/country`)
      .then((response) => response.json())
      .then((data) => setAllCounties(data.data))
      .catch((error) => console.log(error));

    fetch(`${host}/v1/area/province?countryId=${selectedCountry}`)
      .then((response) => response.json())
      .then((data) => setAllProvincies(data.data))
      .catch((error) => console.log(error));

    fetch(`${host}/v1/area/regency?provinceId=${selectedProvince}`)
      .then((response) => response.json())
      .then((data) => setAllRegencies(data.data))
      .catch((error) => console.log(error));
  }, [data, selectedCountry, selectedProvince]);

  const user = useAuthState();

  const countriesOptions = allCountries.map((c) => ({
    value: c.countryId,
    label: c.niceName,
  }));

  const provinciesOptions = allProvincies.map((c) => ({
    value: c.provinceId,
    label: c.provinceName,
  }));

  const regenciesOptions = allRegencies.map((c) => ({
    value: c.regencyId,
    label: c.regencyName,
  }));

  const { shopName, addressDetail, contactNumber } = data;

  const handleSelectCountry = (e) => {
    setSelectedCountry(e.value);
  };

  const handleSelectProvince = (e) => {
    setSelectedProvince(e.value);
  };

  const handleSelectRegency = (e) => {
    setSelectedRegency(e.value);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setData({ ...data, error: null });
      const res = await axios.post(
        `${host}/v1/shop`,
        {
          shopName: shopName,
          countryId: selectedCountry,
          provinceId: selectedProvince,
          regencyId: selectedRegency,
          addressDetail: addressDetail,
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

      setData({ ...data, shopName: "", addressDetail: "", contactNumber: "" });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response.data.message,
        confirmButtonText: "ok",
      });
    }
  };

  return (
    <div>
      <div className="mt-4">
        <button
          className="bg-blue-700 p-2 rounded-lg hover:px-5 text-white"
          onClick={handleOpenModal}
        >
          Create Shop
        </button>
        <Modal isOpen={showModal}>
          <div>
            <button onClick={handleCloseModal}>Close</button>
            <h4 className="text-muted text-center mb-2">Create Shop</h4>
            <div className="card py-2 px-5 shadow">
              <form className="text-center" onSubmit={handleSubmit}>
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
                    name="addressDetail"
                    value={addressDetail}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="my-2">
                  <h1>contactNumber</h1>
                  <input
                    className="bg-blue-200 px-2 py-1 w-full"
                    type="name"
                    name="contactNumber"
                    value={contactNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="text-center">
                  <input
                    type="submit"
                    value="create"
                    className="text-white bg-blue-700 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 px-3 py-1 rounded-lg"
                  />
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CreateShop;
