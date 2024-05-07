import { useState, useEffect } from "react";
import { useAppContext } from "../../AppContext";
import { useLocation } from "react-router";
import axios from "axios";
import Laptop_Nav_Items from "./Laptop_Nav_Items";
import Swal from "sweetalert2";

import Mobile_Nav from "./Mobile_Nav";

function NavBar({ Active_nav, setActive_nav }) {
    const location = useLocation();
    const {
        isAuth,
        FirstName,
        LastName,
        _id,
        Notifications,
        set_Auth,
        store_login,
    } = useAppContext();
    // const [MobileNav_Open, set_MobileNav_Open] = useState(false);
    // function Toogle_Menu_Bar() {
    //     set_MobileNav_Open(!MobileNav_Open);
    // }
    const [user_Open, set_User_Open] = useState(false);
    function Toogle_User_Open() {
        set_User_Open(!user_Open);
    }
    const [LogoutClicked, setLogoutClicked] = useState(false);
    const Logout = async () => {
        setLogoutClicked(true);
        try {
            // Send a request to the logout endpoint on the server
            const response = await axios.post(
                // "https://backend.skate.dz/logout",
                {},
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );

            if (response.status == 204) {
                // Successfully logged out, you may want to redirect to the login page or update the UI accordingly
                store_login({
                    FirstName: "",
                    LastName: "",
                    Email: "",
                    Gender: null,
                    Age: null,
                    Courses: [],
                    _id: null,
                });
                set_Auth(false);
                // You can use state or context to handle the logout state in your application
            } else if (response.status == 429) {
                Swal.fire(
                    "Error!",
                    `Too many requests ,try again latter\n  ${response.data.message}`,
                    "error"
                );
            } else {
                Swal.fire("Error!", `Something Went Wrong ,`, "error");
            }
        } catch (error) {
            Swal.fire("Error!", `Something Went Wrong `, "error");
        }
        setLogoutClicked(false);
    };

    useEffect(() => {
        setActive_nav(location.pathname.split("/")[1]);
    }, [location.pathname]);

    // const [unReaded_Notif, SetunReaded_Notif] = useState(false);
    // useEffect(() => {
    //     if (isAuth && Notifications) {
    //         const hasUnreadNotification = Notifications.some(
    //             (notification) => !notification.Readed
    //         );
    //         SetunReaded_Notif(hasUnreadNotification);
    //     }
    // }, [Notifications]);
    return (
        <div
            className={` fixed  h-[50px] md:h-[60px] m-0  z-40 w-full bg-perpol_b `}
            // className={`   h-[50px] md:h-[60px] m-0  z-40 w-full bg-perpol_b `}
        >
            <Laptop_Nav_Items
                Active_nav={Active_nav}
                isAuth={isAuth}
                FirstName={FirstName}
                LastName={LastName}
                _id={_id}
                user_Open={user_Open}
                Toogle_User_Open={Toogle_User_Open}
                Logout={Logout}
                LogoutClicked={LogoutClicked}
            />

            <Mobile_Nav
                Active_nav={Active_nav}
                Logout={Logout}
                LogoutClicked={LogoutClicked}
            />
        </div>
    );
}

export default NavBar;
