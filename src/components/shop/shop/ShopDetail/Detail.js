import React from "react";
import { Link } from "react-router-dom";

const Detail = ({ user, detail }) => {
  return (
    <div className="lg:p-5 sm:p-2 py-4 bg-blue-400">
      <div className="text-white m-4 lg:px-10 sm:px-0">
        <div className="">
          <div className="flex items-center">
            <div>
              <h1 className="font-bold text-lg ml-2">{detail.shopName}</h1>
              <div>
                <div>
                  <div className="inline-block p-2 text-center">
                    <h1 className="text-xs">Products</h1>
                    {user.shopProduct ? (
                      <h2 className="text-blue-700 bg-white font-bold text-xs">
                        {user.shopProduct.length}
                      </h2>
                    ) : (
                      <h2 className="text-blue-700 bg-white font-bold text-xs">
                        0
                      </h2>
                    )}
                  </div>

                  <div className="inline-block rounded-xl p-2 text-center">
                    <h1 className="text-xs">Invoices</h1>
                    {user.shopInvoice ? (
                      <h2 className="text-blue-700 bg-white font-bold text-xs">
                        {user.shopInvoice.length}
                      </h2>
                    ) : (
                      <h2 className="text-blue-700 bg-white font-bold text-xs">
                        0
                      </h2>
                    )}
                  </div>
                </div>
              </div>
              {detail.Country ? (
                <div className="flex flex-wrap items-center">
                  <h2 className="mx-2">{detail.Country.niceName}</h2>
                  <h3 className="mx-1">{detail.Province.provinceName}</h3>
                  <h4 className="mx-2">{detail.Regency.regencyName}</h4>
                </div>
              ) : (
                <h1>Loading...</h1>
              )}
            </div>
          </div>

          <Link to={`update-shop`}>
            <button className="bg-white text-blue-600 px-2 rounded-lg my-4">
              Edit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Detail;
