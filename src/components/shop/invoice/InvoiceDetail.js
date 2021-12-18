import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavWithBack from "../../common/NavWithBack";
import { useAuthState } from "../../../hook";

const InvoiceDetail = () => {
  // const [invoice, setInvoice] = useState(null);
  const { id } = useParams();
  const { shopId } = useAuthState();

  useEffect(() => {
    axios
      .get(`https://svc-not-e.herokuapp.comv1/shop/${shopId}/invoice/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((result) => {
        console.log(result);
      });
  });
  return (
    <div>
      <NavWithBack />
      <h1>Ini invoice kau</h1>
    </div>
  );
};

export default InvoiceDetail;
