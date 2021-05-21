import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useHistory } from "react-router-dom";
const NavWithBack = () => {
  let history = useHistory();

  function goBack() {
    history.goBack();
  }

  return (
    <nav className="sticky top-0 z-10 shadow-lg flex justify-between bg-blue-700 text-white p-4">
      <div>
        <button onClick={goBack}>
          <AiOutlineArrowLeft size="28px" />
        </button>
      </div>
      <div></div>
      <div></div>
    </nav>
  );
};

export default NavWithBack;
