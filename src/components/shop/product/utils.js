import Swal from "sweetalert2";

export const handleSuccess = () => {
  Swal.fire({
    icon: "success",
    text: "product success created",
    confirmButtonText: "ok",
  });
};
