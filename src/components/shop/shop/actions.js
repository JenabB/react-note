import axios from "axios";

const host = "https://svc-not-e.herokuapp.com/v1";

export const getAllCountries = async () => {
  return fetch(`${host}/area/country`).then((response) => response.json());
};

export const getAllProvinces = async (selectedCountry) => {
  return fetch(`${host}/area/province?countryId=${selectedCountry}`).then(
    (response) => response.json()
  );
};

export const getAllRegencies = async (selectedProvince) => {
  return fetch(`${host}/area/regency?provinceId=${selectedProvince}`).then(
    (response) => response.json()
  );
};

export const createShop = async (
  shopName,
  selectedCountry,
  selectedProvince,
  selectedRegency,
  address,
  contactNumber,
  token
) => {
  return await axios.post(
    `${host}/shop`,
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
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getShopDetail = async () => {
  return;
};

export const updateShop = async (
  shopId,
  shopName,
  selectedCountry,
  selectedProvince,
  selectedRegency,
  address,
  contactNumber,
  token
) => {
  return await axios.put(
    `${host}/shop/${shopId}`,
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
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteShop = async (shopId, token) => {
  return await axios.delete(`${host}/shop/${shopId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
