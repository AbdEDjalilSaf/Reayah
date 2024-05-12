import React from "react";
import { useAppContext } from "../../AppContext";
import { useState } from "react";
import Menu_Toogler from "./Menu_Toogler";
import Mobile_Nav_Items from "./Mobile_Nav_Items";
import { Link } from "react-router-dom";
import Logo from "../../../public/Logo.svg";
function Mobile_Nav({ Active_nav, Logout, LogoutClicked }) {
    const {
        isAuth,
        FirstName,
        LastName,
        _id,
        Notifications,
        set_Auth,
        store_login,
    } = useAppContext();
    const [MobileNav_Open, set_MobileNav_Open] = useState(false);
    function Toogle_Menu_Bar() {
        set_MobileNav_Open(!MobileNav_Open);
    }

    return (
        <>
            <div className=" flex gap-5 items-center justify-between mx-3 md:hidden h-full">
                {/*<div className=" cursor-pointer flex items-center h-full gap-5 text-gray ">
                     {isAuth && (
                        <>
                            <div className="relative">
                                <Link
                                    onClick={Toogle_Menu_Bar}
                                    to={`/Profile/${_id}/Notifications`}
                                    className="select-none flex "
                                >
                                    <MdNotificationsNone className=" text-2xl  " />
                                    {isAuth && unReaded_Notif && (
                                        <div className=" absolute w-2 h-2 rounded-full bg-red-600 right-0">
                                            {" "}
                                        </div>
                                    )}
                                </Link>
                            </div>

                            <Link
                                onClick={Toogle_Menu_Bar}
                                to={`/Profile/${_id}`}
                                className="select-none flex  items-center gap-2 "
                            >
                                <FaUserTie className="text-xl" />
                            </Link>
                        </>
                    )} 
                </div>*/}
                <Menu_Toogler
                    MobileNav_Open={MobileNav_Open}
                    set_MobileNav_Open={set_MobileNav_Open}
                    Toogle_Menu_Bar={Toogle_Menu_Bar}
                />
                <div>
                    <Link to={"/"} className="select-none">
                        <img
                            src={Logo}
                            alt="Logo"
                            className=" w-[100px] lg:w-[145px] "
                        />
                    </Link>
                </div>

                {isAuth ? (
                    <Link to={"/Dashboard"} className=" w-8 h-8 rounded-full bg-gray_white"></Link>
                ) : (
                    <div className=" w-8 h-8"></div>
                )}
            </div>
            <Mobile_Nav_Items
                Active_nav={Active_nav}
                MobileNav_Open={MobileNav_Open}
                Toogle_Menu_Bar={Toogle_Menu_Bar}
                Logout={Logout}
                LogoutClicked={LogoutClicked}
            />
        </>
    );
}

export default Mobile_Nav;
