const HOST = "https://warm-earth-68639.herokuapp.com";

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
