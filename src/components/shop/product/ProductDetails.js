import { useState, useEffect } from 'react';
import { useAuthState } from '../../../hook';
import axios from 'axios';

const ProductDetails = (props) => {
  const [product, setProduct] = useState([]);
  const user = useAuthState();
  const productId = props.match.params.id;
  console.log(product);
  useEffect(() => {
    axios
      .get(
        `https://svc-not-e.herokuapp.com/v1/shop/${user.shopId}/product/${productId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem('token')
            )}`,
          },
        }
      )
      .then((result) => {
        setProduct(result.data.data);
      });
  }, [user.shopId, productId]);

  return (
    <div>
      <h1>{product.productName}</h1>
      <h1>{product.productPrice}</h1>
    </div>
  );
};

export default ProductDetails;
