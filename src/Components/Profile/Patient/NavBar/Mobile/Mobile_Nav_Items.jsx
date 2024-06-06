import { FaRegHandshake } from "react-icons/fa";
import { FaBook } from "react-icons/fa";

import { MdEventAvailable } from "react-icons/md";
import { RiArticleFill } from "react-icons/ri";
import { IoCall } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../../../AppContext"; // Import your context hook
import { AiFillHome } from "react-icons/ai";

import { TbLogout } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import Appointments_icon from "../../../../../../public/Profiles/Nav/Appointments.svg";
import Medical_Folders from "../../../../../../public/Profiles/Nav/Medical_Folders.svg";
import Consultation from "../../../../../../public/Profiles/Nav/Consultation.svg";
import inbox_icon from "../../../../../../public/Profiles/Nav/inbox.svg";
import Settings_icon from "../../../../../../public/Profiles/Nav/Settings.svg";

function Mobile_Nav_Items({
    MobileNav_Open,
    Toogle_Menu_Bar,
    Logout,
    LogoutClicked,
    Active_nav,
}) {
    const { isAuth, _id } = useAppContext();
    const patientId = window.localStorage.getItem("patientId");
    const doctorId = window.localStorage.getItem("doctorId");
    return (
        <div className="flex md:hidden">
            <div
                className={`  ${
                    MobileNav_Open
                        ? " translate-x-[0vw]"
                        : " -translate-x-[200vh] "
                } absolute   transition-transform duration-300 select-none w-[100vw]  z-50 bg-white   text-white font-semibold `}
            >
                <div className=" w-[90%] ml-6 h-screen text-xl  mt-12 ">
                    <div className=" flex flex-col justify-between h-[80%] ">
                        <div>
                            <Link
                                onClick={Toogle_Menu_Bar}
                                to={`/Patients/${patientId}/Profile`}
                                className={`select-none flex items-center gap-2 mb-4 w-[120px] ml-6 mt-6 ${
                                    Active_nav === "Profile"
                                        ? " text-green hover:text-green"
                                        : "text-white hover:text-green "
                                }`}
                            >
                                <FiUser className=" text-2xl" />
                                Profile
                            </Link>
                            <Link
                                onClick={Toogle_Menu_Bar}
                                to={`/Patients/${patientId}/Profile`}
                                className={`select-none flex items-center gap-2 mb-4 w-[120px] ml-6 mt-6 ${
                                    Active_nav === "Profile"
                                        ? " text-green hover:text-green"
                                        : "text-white hover:text-green "
                                }`}
                            >
                                <img
                                    src={Appointments_icon}
                                    className="  text-2xl"
                                />
                                Appoints
                            </Link>

                            <Link
                                onClick={Toogle_Menu_Bar}
                                to={"/Contact"}
                                className={`select-none flex items-center   gap-2 mb-4 w-[120px] ml-6 mt-6
                        ${
                            Active_nav === "Contact"
                                ? " text-green hover:text-green"
                                : "text-white hover:text-green "
                        }`}
                            >
                                {/* <IoCall className=" text-3xl" /> */}
                                Contact Us
                            </Link>
                            <Link
                                onClick={Toogle_Menu_Bar}
                                to={"/About"}
                                className={`select-none flex items-center  gap-2  mb-4 w-[120px] ml-6 mt-6 ${
                                    Active_nav === "About"
                                        ? " text-green hover:text-green"
                                        : "text-white hover:text-green "
                                }`}
                            >
                                {/* <FaRegHandshake className=" text-3xl" /> */}
                                About us
                            </Link>
                            <Link
                                onClick={Toogle_Menu_Bar}
                                to={"/FAQ"}
                                className={`select-none flex items-center   gap-2  mb-4 w-[120px] ml-6 mt-6 ${
                                    Active_nav === "FAQ"
                                        ? " text-green hover:text-green"
                                        : "text-white hover:text-green "
                                }`}
                            >
                                {/* <FaBook className=" text-2xl" /> */}
                                FAQ
                            </Link>
                        </div>
                        <div>
                            <>
                                {!LogoutClicked ? (
                                    <div
                                        className="text-white   flex items-center  gap-2  w-[120px] ml-6 "
                                        onClick={() => {
                                            Logout();
                                        }}
                                    >
                                        <TbLogout />
                                        Logout
                                    </div>
                                ) : (
                                    <div className=" w-full flex items-center justify-center   text-white">
                                        <span className="small-loader"></span>
                                    </div>
                                )}
                            </>
                        </div>
                    </div>

                    {/* <div className=" w-full rounded-xl ml-6 mt-6 h-[2px]  bg-gray_white mb-4"></div> */}
                </div>
            </div>
        </div>
    );
}

export default Mobile_Nav_Items;
