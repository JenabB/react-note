import React from "react";
import { useAuthState } from "../../../../hook";
import moment from "moment";

const Detail = () => {
  const { shopDetails, shopProduct, shopInvoice } = useAuthState();
  return (
    <div>
      <div className="lg:p-5 sm:p-2 py-4">
        <div className=" m-4 lg:px-10 sm:px-0">
          <div className="">
            <div className="flex items-center">
              <div>
                <h1 className="font-bold text-2xl text-blue-700">
                  {shopDetails.shopName}
                </h1>
                <p className="text-gray-500 text-sm">
                  Created {moment(shopDetails.createdAt).format("YYYY MMMM DD")}
                </p>
                <div className="my-8">
                  <div>
                    <div className="inline-block px-4 py-3 mx-2 rounded bg-green-500 text-white text-center">
                      <h1 className="text-md">Products</h1>
                      {shopProduct ? (
                        <h2 className="font-bold text-2xl">
                          {shopProduct.length}
                        </h2>
                      ) : (
                        <h2 className=" font-bold text-xs">0</h2>
                      )}
                    </div>

                    <div className="inline-block px-4 py-3 mx-2 rounded bg-yellow-500 text-white text-center">
                      <h1 className="text-md">Invoices</h1>
                      {shopInvoice ? (
                        <h2 className=" font-bold text-2xl">
                          {shopInvoice.length}
                        </h2>
                      ) : (
                        <h2 className="font-bold text-2xl">0</h2>
                      )}
                    </div>
                  </div>
                </div>
                {shopDetails.Country ? (
                  <div>
                    {" "}
                    <div>
                      <div className="flex flex-wrap items-center">
                        <h2 className="">{shopDetails.Country.niceName}</h2>
                        <h3 className="mx-1">
                          {shopDetails.Province.provinceName}
                        </h3>
                        <h4 className="mx-2">
                          {shopDetails.Regency.regencyName}
                        </h4>
                      </div>

                      <div className="my-4 bg-white shadow-sm p-4 w-full">
                        <h1>{shopDetails.address}</h1>
                        <h2>{shopDetails.contactNumber}</h2>
                      </div>
                    </div>
                  </div>
                ) : (
                  <h1>Loading...</h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;

// import React from "react";
// import { Link } from "react-router-dom";
// import moment from "moment";

// const Detail = ({ user, detail }) => {
//   return (
//     <div className="lg:p-5 sm:p-2 py-4 bg-yellow-500">
//       <div className="text-white m-4 lg:px-10 sm:px-0">
//         <div className="">
//           <div className="flex items-center">
//             <div>
//               <h1 className="font-bold text-lg">{detail.shopName}</h1>

//               <div>
//                 <div>
//                   <div className="inline-block p-2 text-center">
//                     <h1 className="text-xs">Products</h1>
//                     {user.shopProduct ? (
//                       <h2 className="text-blue-700 bg-white font-bold text-xs">
//                         {user.shopProduct.length}
//                       </h2>
//                     ) : (
//                       <h2 className="text-blue-700 bg-white font-bold text-xs">
//                         0
//                       </h2>
//                     )}
//                   </div>

//                   <div className="inline-block rounded-xl p-2 text-center">
//                     <h1 className="text-xs">Invoices</h1>
//                     {user.shopInvoice ? (
//                       <h2 className="text-blue-700 bg-white font-bold text-xs">
//                         {user.shopInvoice.length}
//                       </h2>
//                     ) : (
//                       <h2 className="text-blue-700 bg-white font-bold text-xs">
//                         0
//                       </h2>
//                     )}
//                   </div>
//                 </div>
//               </div>
//               {detail.Country ? (
//                 <div>
//                   {" "}
//                   <div>
//                     <div className="flex flex-wrap items-center">
//                       <h2 className="mx-2">{detail.Country.niceName}</h2>
//                       <h3 className="mx-1">{detail.Province.provinceName}</h3>
//                       <h4 className="mx-2">{detail.Regency.regencyName}</h4>
//                     </div>
//                     <h1>
//                       {" "}
//                       Created {moment(detail.createdAt).format("YYYY MMMM DD")}
//                     </h1>
//                     <h2>{detail.contactNumber}</h2>
//                     <h3>{detail.address}</h3>
//                   </div>
//                 </div>
//               ) : (
//                 <h1>Loading...</h1>
//               )}
//             </div>
//           </div>

//           <Link to={`update-shop`}>
//             <button className="bg-white text-blue-600 px-2 rounded-lg my-4">
//               Edit
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Detail;
