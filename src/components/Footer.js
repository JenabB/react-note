import React from "react";
import WhatsApp from "../images/icons/007-whatsapp.png";
import Facebook from "../images/icons/045-facebook.png";
import Instagram from "../images/icons/034-instagram.png";

const Footer = () => {
  return (
    <footer className="grid sm:grid-cols-1 lg:grid-cols-3 bg-gray-100 p-5">
      <div className="my-2">
        <h1 className="font-bold">About Us</h1>
        <p>
          Phasellus varius, erat sed posuere tempor, est leo faucibus urna, vel
          feugiat augue augue non tortor. Fusce id justo ipsum. Nulla lacinia,
          urna sed lobortis interdum, neque turpis maximus mauris, at finibus
          purus ligula in justo. Nunc sit amet tortor non est condimentum
          pulvinar.
        </p>
      </div>
      <div className="my-2">
        <h1 className="font-bold">Contributors</h1>
        <p>BackEnd: Muhammad Randi Pratama</p>
        <p>FrontEnd: Yogi Surya Pranata</p>
        <p>KotaKode.com</p>
        <p>Flaticons.com</p>
        <p>icons8.com</p>
      </div>
      <div className="my-2">
        <h1 className="font-bold">Contact</h1>
        <div className="flex items-center">
          <img src={WhatsApp} alt="whatsapp" width="28px" />
          <h1 className="ml-3">081274627547</h1>
        </div>
        <div className="flex items-center my-3">
          <img src={Facebook} alt="whatsapp" width="28px" />
          <h1 className="ml-3">Yogi Surya Pranata</h1>
        </div>
        <div className="flex items-center">
          <img src={Instagram} alt="whatsapp" width="28px" />
          <h1 className="ml-3">@yogii.js</h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
