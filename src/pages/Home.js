
import CreateShop from "../components/shop/CreateShop";
import OwnerShopList from "../components/shop/OwnerShopList";

import { useAuthDispatch, useAuthState } from '../hook';

const Home = (props) => {
    const userDetails = useAuthState();

    console.log(userDetails)
    if (!localStorage.getItem("token")) {
        props.history.push("/user/login");
    }
    return (
        <div>
            <div className="jumbotron py-20">
                <div className="text-center text-white">
                    <h1 className="text-lg">Welcome <b>{userDetails.user.fullName}</b></h1>
                    <h2>Create Shop, Inovice & More</h2>
                    <CreateShop />
                </div>
            </div>

            <div className="mt-4">
                <h1 className="mt-2 ml-4 font-bold">Your Shop</h1>
                <OwnerShopList />
            </div>
        </div>
    );
};

export default Home;
