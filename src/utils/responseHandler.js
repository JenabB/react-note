import Swal from "sweetalert2";

export const handleAreYouSure = () => {
  return Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
};

export const handleSuccess = (result) => {
  return Swal.fire({
    icon: "success",
    text: result.data.message,
    confirmButtonText: "ok",
  });
};

export const handleWarning = (result) => {
  return Swal.fire({
    icon: "warning",
    text: result.message,
    confirmButtonText: "ok",
  });
};

export const handleError = (error) => {
  return Swal.fire({
    icon: "error",
    text: error.response.data.message,
    confirmButtonText: "ok",
  });
};
