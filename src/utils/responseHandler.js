import Swal from "sweetalert2";

export const handleSuccess = (result) => {
  Swal.fire({
    icon: "success",
    text: result.data.message,
    confirmButtonText: "ok",
  });
};

export const handleWarning = (result) => {
  Swal.fire({
    icon: "warning",
    text: result.message,
    confirmButtonText: "ok",
  });
};

export const handleError = (error) => {
  Swal.fire({
    icon: "error",
    text: error.response.data.message,
    confirmButtonText: "ok",
  });
};
