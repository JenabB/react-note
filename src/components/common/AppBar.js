import React from "react";
import { useNavigate } from "react-router-dom";

const AppBar = () => {
  let navigate = useNavigate();

  function goBack() {
    navigate("/home");
  }

  return (
    <nav className="sticky top-0 z-10 shadow-lg flex justify-between bg-blue-700 text-white p-4">
      <div>
        <button onClick={goBack}>
          <span class="material-icons">arrow_back</span>
        </button>
      </div>
      <div></div>
      <div></div>
    </nav>
  );
};

export default AppBar;
