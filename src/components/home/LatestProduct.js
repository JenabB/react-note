import React from "react";

const LatestProduct = () => {
  const mock = [
    {
      id: 1,
      customerName: "Ziva Magnolya",
      productInsertMode: "inside",
      product: [],
    },
  ];
  return (
    <div>
      <h1 className="mt-2 ml-4 font-bold mb-4">Latest Invoice</h1>
      <div>
        {mock.length > 0 ? (
          <>
            {mock.map((invoice, index) => (
              <div>
                <h1>{invoice.customerName}</h1>
                <h1>total Pricce</h1>
              </div>
            ))}
          </>
        ) : (
          <h1>no invoice yet</h1>
        )}
      </div>
    </div>
  );
};

export default LatestProduct;
