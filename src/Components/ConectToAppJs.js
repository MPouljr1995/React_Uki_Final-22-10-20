import React, { Component } from "react";
// import HomePageProductView from "./Common/HomPageProductView";
import Footer from "./Common/Footer";

import HomePage from "./Common/HomePage";
import RoutePath from "./Route_Path";
import { Data } from "./Card/Data";
// import AddProduct from "./Product/AddProduct";
// import AddToCard from "./Card/AddToCard";
// import Profile from "./Common/Profile";
// import SignUp from "./Common/SignUp";
// import SignIn from "./Common/SignIn";

// import CreateShop from "./Shop/CreateShop";
// import AddProduct from "./Product/AddProduct";

// import Search from "./Common/Search";
// import ShopProfile from "./Shop/ShopProfile";
// import OneShopProfile from "./Shop/OneShopProfile";
// import ProductView from "./Product/ProductView";
// import AdminBord from "./Admin/AdminBord";
// import ShopDetail from "./Admin/ShopDetail";
// import OrderDetail from "./Admin/OderDetail";
// import UserDetails from "./Admin/UserDetail";
// import ProductDetails from "./Admin/ProductDetail";
// import EditUser from "./Admin/EditUser";
// import EditProduct from "./Admin/EditProduct";


class ConectToAppJs extends Component {
    render() {
        return (
            <div>
                <Data>
                     <HomePage/>
                    <RoutePath/>
                    <Footer/>

                    

                    {/* <SignUp/> */}
                    {/* <SignIn/> */}
                    {/* <CreateShop/> */}
                    {/* <Footer/> */}
                    {/* <AddProduct/> */}
                    {/* <Search/> */}
                    {/* <ShopProfile/> */}
                    {/* <ProductView/> */}
                    {/* <AdminBord/> */}
                    {/* <ShopDetail/> */}
                    {/* <OrderDetail/> */}
                    {/* <UserDetails/> */}
                    {/* <ProductDetails/> */}
                    {/* <EditUser/> */}
                    {/* <EditProduct/> */}
                    {/* <HomePageProductView/> */}
                    {/* <OneShopProfile/> */}
                    {/* <Profile/> */}
                    {/* <AddProduct/> */}
                    {/* <AddToCard/> */}
                </Data>
            </div>
        )
    }
}

export default ConectToAppJs;