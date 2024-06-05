import { useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useAppContext } from "../../../../../AppContext";
import { TbLogout2 } from "react-icons/tb";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
function Mobile_Nav_Items({ MobileNav_Open, Toogle_Menu_Bar }) {
    const Navigate = useNavigate();
    const { set_Auth } = useAppContext();
    const [Active_nav, setActive_nav] = useState("Home");
    const location = useLocation();
    useEffect(() => {
        setActive_nav(location.pathname.split("/")[1]);
    }, [location.pathname]);

    const [LogoutClicked, setLogoutClicked] = useState(false);
    const handleLogout = async () => {
        setLogoutClicked(true);
        try {
            // Send a request to the logout endpoint on the server
            const response = await axios.post(
                "http://localhost:3000/logout",
                {},
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            console.log("response from Logout : ", response);
            if (response.status == 204) {
                set_Auth(false);
                Swal.fire("Success!", `Logged Out Successfully`, "success");
                Navigate("/Login");
            } else {
                Swal.fire("Error!", `Something Went Wrong ,`, "error");
            }
        } catch (error) {
            Swal.fire("Error!", `Something Went Wrong `, "error");
        }
        setLogoutClicked(false);
    };
    return (
        <div className="flex md:hidden">
            <div
                className={`  ${
                    MobileNav_Open
                        ? " translate-x-[0vw]"
                        : " translate-x-[200vh] "
                } absolute   transition-transform duration-300 select-none w-[100vw]
                  z-50    text-black_text  bg-white `}
            >
                <div className="flex flex-col gap-8 text-sm text-gray pl-8 py-4 h-screen overflow-auto">
                    <div>
                        <div className=" font-semibold pb-4">Home</div>
                        <div className=" flex flex-col gap-2 pl-2  ">
                            <Link
                                to={"/Home"}
                                onClick={Toogle_Menu_Bar}
                                className={` ${
                                    Active_nav == "Home"
                                        ? "bg-blue_v text-gray px-4 "
                                        : "bg-white hover:text-perpol"
                                }  transition-all duration-150  cursor-pointer py-1 select-none  w-[150px] rounded-full  `}
                            >
                                <span>Home</span>
                            </Link>
                            <Link
                                to={"/Users"}
                                onClick={Toogle_Menu_Bar}
                                className={` ${
                                    Active_nav == "Users"
                                        ? "bg-blue_v text-gray px-4 "
                                        : "bg-white hover:text-perpol"
                                }  transition-all duration-150  cursor-pointer py-1 select-none  w-[150px] rounded-full  `}
                            >
                                <span>Users</span>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div className="  font-semibold pb-4">Prjects</div>
                        <div className=" flex flex-col gap-2 pl-2 ">
                            <Link
                                to={"/Projects_Requests"}
                                onClick={Toogle_Menu_Bar}
                                className={` ${
                                    Active_nav == "Projects_Requests"
                                        ? "bg-blue_v text-gray px-4 "
                                        : "bg-white hover:text-perpol"
                                }  transition-all duration-150  cursor-pointer py-1 select-none  w-[150px] rounded-full  `}
                            >
                                <span>Request</span>
                            </Link>
                            <Link
                                to={"/Projects_Applications"}
                                onClick={Toogle_Menu_Bar}
                                className={` ${
                                    Active_nav == "Projects_Applications"
                                        ? "bg-blue_v text-gray px-4 "
                                        : "bg-white hover:text-perpol"
                                }  transition-all duration-150  cursor-pointer py-1 select-none  w-[150px] rounded-full  `}
                            >
                                <span>Applications</span>
                            </Link>
                            <Link
                                to={"/Projects_Accepted"}
                                onClick={Toogle_Menu_Bar}
                                className={` ${
                                    Active_nav == "Projects_Accepted"
                                        ? "bg-blue_v text-gray px-4 "
                                        : "bg-white hover:text-perpol"
                                }  transition-all duration-150  cursor-pointer py-1 select-none  w-[150px] rounded-full  `}
                            >
                                <span>Accepted</span>
                            </Link>
                            <Link
                                to={"/Projects_Paying"}
                                onClick={Toogle_Menu_Bar}
                                className={` ${
                                    Active_nav == "Projects_Paying"
                                        ? "bg-blue_v text-gray px-4 "
                                        : "bg-white hover:text-perpol"
                                }  transition-all duration-150  cursor-pointer py-1 select-none  w-[150px] rounded-full  `}
                            >
                                <span>Paying</span>
                            </Link>
                            <Link
                                to={"/Projects_At_Work"}
                                onClick={Toogle_Menu_Bar}
                                className={` ${
                                    Active_nav == "Projects_At_Work"
                                        ? "bg-blue_v text-gray px-4 "
                                        : "bg-white hover:text-perpol"
                                }  transition-all duration-150  cursor-pointer py-1 select-none  w-[150px] rounded-full  `}
                            >
                                <span>At Work</span>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div className="  font-semibold pb-4">Feedbacks</div>
                        <div className=" flex flex-col gap-2 pl-2 ">
                            <Link
                                to={"/Feedbacks_Clients"}
                                onClick={Toogle_Menu_Bar}
                                className={` ${
                                    Active_nav == "Feedbacks_Clients"
                                        ? "bg-blue_v text-gray px-4 "
                                        : "bg-white hover:text-perpol"
                                }  transition-all duration-150  cursor-pointer py-1 select-none  w-[150px] rounded-full  `}
                            >
                                <span>Clients</span>
                            </Link>
                            <Link
                                to={"/Feedbacks_Freelancers"}
                                onClick={Toogle_Menu_Bar}
                                className={` ${
                                    Active_nav == "Feedbacks_Freelancers"
                                        ? "bg-blue_v text-gray px-4 "
                                        : "bg-white hover:text-perpol"
                                }  transition-all duration-150  cursor-pointer py-1 select-none  w-[150px] rounded-full  `}
                            >
                                <span>Freelancers</span>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div className="  font-semibold pb-4">Messages</div>
                        <div className=" flex flex-col gap-2 pl-2 ">
                            <Link
                                to={"/Messages"}
                                onClick={Toogle_Menu_Bar}
                                className={` ${
                                    Active_nav == "Messages"
                                        ? "bg-blue_v text-gray px-4 "
                                        : "bg-white hover:text-perpol"
                                }  transition-all duration-150  cursor-pointer py-1 select-none  w-[150px] rounded-full  `}
                            >
                                <span>All messages</span>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div className="  font-semibold pb-4">Terms</div>
                        <div className=" flex flex-col gap-2 pl-2 ">
                            <Link
                                to={"/Terms"}
                                onClick={Toogle_Menu_Bar}
                                className={` ${
                                    Active_nav == "Terms"
                                        ? "bg-blue_v text-gray px-4 "
                                        : "bg-white hover:text-perpol"
                                }  transition-all duration-150  cursor-pointer py-1 select-none  w-[150px] rounded-full  `}
                            >
                                <span>Terms of service</span>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div className="  font-semibold pb-4">Contact</div>
                        <div className=" flex flex-col gap-2 pl-2  ">
                            <Link
                                to={"/Contact"}
                                onClick={Toogle_Menu_Bar}
                                className={` ${
                                    Active_nav == "Contact"
                                        ? "bg-blue_v text-gray px-4 "
                                        : "bg-white hover:text-perpol"
                                }  transition-all duration-150  cursor-pointer py-1 select-none  w-[150px] rounded-full  `}
                            >
                                <span> Messages</span>
                            </Link>
                        </div>
                    </div>
                    <div className="pb-20">
                        {LogoutClicked ? (
                            <div className="w-full ">
                                <span className="small-loader font-bold  w-full m-auto"></span>
                            </div>
                        ) : (
                            <div
                                className="cursor-pointer w-full 
                                    flex items-center gap-3 text-red-500"
                                onClick={() => {
                                    handleLogout();
                                }}
                            >
                                <TbLogout2 className="  text-xl" />
                                Logout
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mobile_Nav_Items;
