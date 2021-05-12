const HOST = "https://warm-earth-68639.herokuapp.com";

export async function ownerShopList(dispatch) {
  try {
    dispatch({ type: "GET_SHOP_LIST" });
    let response = await fetch(`${HOST}/v1/shop`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    let data = response.json();

    if (data) {
      console.log("shoplist response", data);
      dispatch({ type: "GET_SHOP_LIST_SUCCESS", payload: data });
      return data;
    }

    dispatch({ type: "GET_SHOP_LIST_ERROR", error: data.error });
    console.log("getshoplist error", data.error);
    return;
  } catch (error) {
    dispatch({ type: "GET_SHOP_LIST_ERROR", error: error });
    console.log("getshoplist error", error);
  }
}

export async function registerUser(dispatch, registerPayload) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registerPayload),
  };

  try {
    dispatch({ type: "REQUEST_REGISTER" });
    let response = await fetch(
      `${HOST}/v1/user/register/owner`,
      requestOptions
    );
    let data = await response.json();

    if (data) {
      console.log("register response", data);
      dispatch({ type: "REGISTER_SUCCESS", payload: data });

      return data;
    }

    dispatch({ type: "REGISTER_ERROR", error: data.error });
    console.log("register error", data.error);
    return;
  } catch (error) {
    dispatch({ type: "REGISTER_ERROR", error: error });
    console.log("catch error", error);
  }
}

export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginPayload),
  };

  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let response = await fetch(`${HOST}/v1/user/login/owner`, requestOptions);
    let data = await response.json();

    if (data) {
      console.log("data", data);
      dispatch({ type: "LOGIN_SUCCESS", payload: data.data });
      localStorage.setItem("token", JSON.stringify(data.data.token));
      return data;
    }

    dispatch({ type: "LOGIN_ERROR", error: data.error });
    console.log(data.error);
    return;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
    console.log(error);
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("token");
  window.location.reload();
}
