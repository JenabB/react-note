import React, { useEffect, useState } from "react";
import { useAuthDispatch } from "../../hook";
const AllCountries = () => {
  const dispatch = useAuthDispatch();

  useEffect(() => {
    try {
      fetch(`https://warm-earth-68639.herokuapp.com/v1/area/country`)
        .then((response) => response.json())
        .then((data) =>
          dispatch({ type: "GET_ALL_COUNTRIES", payload: data.data })
        );
    } catch (error) {
      console.log(error);
    }
  });
  return <div></div>;
};

export default AllCountries;
