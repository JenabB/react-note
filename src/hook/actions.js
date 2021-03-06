import Swal from "sweetalert2";
const HOST = "https://svc-not-e.herokuapp.com";

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

    if (data.status === 200) {
      dispatch({ type: "LOGIN_SUCCESS", payload: data.data });
      localStorage.setItem("token", JSON.stringify(data.data.token));
      return data;
    } else {
      console.log("err", data);
      Swal.fire({
        icon: "error",
        text: data.message,
        confirmButtonText: "ok",
      });
      dispatch({ type: "LOGIN_ERROR", error: data.error });
    }

    return;
  } catch (error) {
    console.log("error", error);
    Swal.fire({
      icon: "error",
      text: error.response.message,
      confirmButtonText: "ok",
    });
    dispatch({ type: "LOGIN_ERROR", error: error });
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("token");
}
