import { FaRegHandshake } from "react-icons/fa";
import { FaBook } from "react-icons/fa";

import { MdEventAvailable } from "react-icons/md";
import { RiArticleFill } from "react-icons/ri";
import { IoCall } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAppContext } from "../../AppContext"; // Import your context hook
import { AiFillHome } from "react-icons/ai";

import { TbLogout } from "react-icons/tb";

function Mobile_Nav_Items({
    MobileNav_Open,
    Toogle_Menu_Bar,
    Logout,
    LogoutClicked,
    Active_nav,
}) {
    const { isAuth, _id } = useAppContext();

    return (
        <div className="flex md:hidden">
            <div
                className={`  ${
                    MobileNav_Open
                        ? " translate-x-[0vw]"
                        : " -translate-x-[200vh] "
                } absolute   transition-transform duration-300 select-none w-[100vw]  z-50 bg-perpol_b   text-white font-semibold `}
            >
                <div className=" w-[90%] ml-6 h-screen text-xl  mt-12 ">
                    {/* {!isAuth && (
                        <>
                            <div className="flex gap-2 mb-4 justify-center ">
                                <Link
                                    onClick={Toogle_Menu_Bar}
                                    to={"/Login"}
                                    className="select-none bg-green text-[#fff] px-3 py-2 rounded-lg "
                                >
                                    Login
                                </Link>
                                <Link
                                    onClick={Toogle_Menu_Bar}
                                    to={"/Register"}
                                    className="select-none bg-blue text-white px-3 py-2 rounded-lg"
                                >
                                    SignUp
                                </Link>
                            </div>
                            <div className=" w-full rounded-xl ml-6 mt-6 h-[2px]  bg-gray_white mb-4"></div>
                        </>
                    )} */}

                    <Link
                        onClick={Toogle_Menu_Bar}
                        to={"/"}
                        className={`select-none flex gap-2 mb-4 w-[120px] ml-6 mt-6 ${
                            Active_nav === ""
                                ? " text-green hover:text-green"
                                : "text-white hover:text-green "
                        }`}
                    >
                        {/* <AiFillHome className=" text-2xl" /> */}
                        Home
                    </Link>
                    <Link
                        onClick={Toogle_Menu_Bar}
                        to={"/Blogs"}
                        className={`select-none flex  gap-2 mb-4 w-[120px] ml-6 mt-6 ${
                            Active_nav === "Blogs"
                                ? " text-green hover:text-green"
                                : "text-white hover:text-green "
                        }`}
                    >
                        {/* <RiArticleFill className=" text-3xl" /> */}
                        Blogs
                    </Link>
                    <Link
                        onClick={Toogle_Menu_Bar}
                        to={"/Contact"}
                        className={`select-none flex   gap-2 mb-4 w-[120px] ml-6 mt-6
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
                        className={`select-none flex  gap-2  mb-4 w-[120px] ml-6 mt-6 ${
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
                    {/* <div className=" w-full rounded-xl ml-6 mt-6 h-[2px]  bg-gray_white mb-4"></div> */}

                    {isAuth ? (
                        <>
                            {!LogoutClicked ? (
                                <div
                                    className="text-red-600   flex items-center  gap-2 mt-10 w-[120px] ml-6 "
                                    onClick={() => {
                                        Logout();
                                    }}
                                >
                                    <TbLogout />
                                    Logout
                                </div>
                            ) : (
                                <div className=" w-full flex items-center justify-center mt-10  text-red-600">
                                    <span className="small-loader"></span>
                                </div>
                            )}
                        </>
                    ) : null}
                </div>
                
            </div>
        </div>
    );
}

export default Mobile_Nav_Items;
