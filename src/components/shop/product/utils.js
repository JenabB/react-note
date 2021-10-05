import Swal from "sweetalert2";

export const handleSuccess = () => {
  Swal.fire({
    icon: "success",
    text: "product success created",
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
