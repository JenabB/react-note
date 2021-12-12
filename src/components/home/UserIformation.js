import React from "react";

const UserIformation = ({ name }) => {
  return (
    <div className="bg-blue-600 rounded-b-3xl py-8" style={{ height: "150px" }}>
      <div className="px-4 text-white">
        <h1 className="text-lg">
          Hi, <span className="text-2xl font-bold">{name}</span>
        </h1>
        <p>Have a nice day</p>
      </div>
    </div>
  );
};

export default UserIformation;
