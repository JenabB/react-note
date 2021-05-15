import React, { useState } from "react";
import { useAuthState } from "../../hook";
import Modal from "react-modal";
import Swal from "sweetalert2";
import axios from "axios";

const CreateShop = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({
    shopName: "",
    countryId: 1,
    provinceId: 1,
    districtId: 1,
    addressDetail: "",
    contactNumber: "",
  });

  const user = useAuthState();

  const {
    shopName,
    countryId,
    provinceId,
    districtId,
    addressDetail,
    contactNumber,
  } = data;

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
        "https://warm-earth-68639.herokuapp.com/v1/shop",
        {
          shopName: shopName,
          countryId: countryId,
          provinceId: provinceId,
          districtId: districtId,
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="mt-4">
        <button
          className="bg-green-500 p-2 rounded-lg hover:px-5"
          onClick={handleOpenModal}
        >
          Create Shop
        </button>
        <Modal isOpen={showModal}>
          <div>
            <button onClick={handleCloseModal}>Close</button>
            <h4 className="text-muted text-center mb-2">Create Shop</h4>
            <div className="card py-2 px-5 shadow">
              <form className="text-center">
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
                  <button
                    className="btn bg-green-500 text-white px-3 py-1 rounded-lg w-full"
                    onClick={handleSubmit}
                  >
                    Create
                  </button>
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
