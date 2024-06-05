import { useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useAppContext } from "../../../../AppContext";
import { TbLogout2 } from "react-icons/tb";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";

function Laptop() {
    const Navigate = useNavigate();
    const { set_Auth, user } = useAppContext();
    const [Active_nav, setActive_nav] = useState("Profile");
    const location = useLocation();
    useEffect(() => {
        setActive_nav(location.pathname.split("/")[3]);
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
        <div className="flex flex-col justify-around  text-lg font-semibold text-perpol  pl-8 py-4 w-full">
            <div className="   mx-auto">
                {user?.picture ? (
                    <img
                        src={user?.picture}
                        className=" w-24 h-24 border-2 border-t-green border-l-green border-r-green rounded-full border-b-transparent "
                        alt=""
                    />
                ) : (
                    <div className=" w-24 h-24 border-2 border-t-green border-l-green border-r-green rounded-full border-b-transparent text-8xl text-gray_white flex items-center justify-center ">
                        <FaCircleUser />
                    </div>
                )}
            </div>
            <div className=" flex flex-col gap-4 ">
                <Link
                    to={`/Patients/${user?.id}/Patient_Profile`}
                    className={` ${
                        Active_nav == "Patient_Profile"
                            ? "bg-green text-perpol  px-4 "
                            : "bg-white hover:text-green"
                    }  transition-all duration-150  cursor-pointer py-1 select-none  w-[200px] rounded-full  `}
                >
                    <span>Profile</span>
                </Link>
                <Link
                    to={`/Patients/${user?.id}/Patient_Appoints`}
                    className={` ${
                        Active_nav == "Patient_Appoints"
                            ? "bg-green text-perpol  px-4 "
                            : "bg-white hover:text-green"
                    }  transition-all duration-150  cursor-pointer py-1 select-none  w-[200px] rounded-full  `}
                >
                    <span>Appoints</span>
                </Link>

                <Link
                    to={`/Patients/${user?.id}/Patient_Medical_Folders`}
                    className={` ${
                        Active_nav == "Patient_Medical_Folders"
                            ? "bg-green text-perpol  px-4 "
                            : "bg-white hover:text-green"
                    }  transition-all duration-150  cursor-pointer py-1 select-none  w-[200px] rounded-full  `}
                >
                    <span>Medical Folders</span>
                </Link>
                <Link
                    to={`/Patients/${user?.id}/Patient_Consultations`}
                    className={` ${
                        Active_nav == "Patient_Consultations"
                            ? "bg-green text-perpol  px-4 "
                            : "bg-white hover:text-green"
                    }  transition-all duration-150  cursor-pointer py-1 select-none  w-[200px] rounded-full  `}
                >
                    <span>Consultations</span>
                </Link>
                <Link
                    to={`/Patients/${user?.id}/Patient_Inbox`}
                    className={` ${
                        Active_nav == "Patient_Inbox"
                            ? "bg-green text-perpol  px-4 "
                            : "bg-white hover:text-green"
                    }  transition-all duration-150  cursor-pointer py-1 select-none  w-[200px] rounded-full  `}
                >
                    <span>Inbox</span>
                </Link>
                <Link
                    to={`/Patients/${user?.id}/Patient_Settings`}
                    className={` ${
                        Active_nav == "Patient_Settings"
                            ? "bg-green text-perpol  px-4 "
                            : "bg-white hover:text-green"
                    }  transition-all duration-150  cursor-pointer py-1 select-none  w-[200px] rounded-full  `}
                >
                    <span>Settings</span>
                </Link>
            </div>
            <div>
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
    );
}

export default Laptop;
