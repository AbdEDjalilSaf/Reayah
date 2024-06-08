import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAppContext } from "../../../../AppContext";
import Swal from "sweetalert2";
import Logo_perpole from "../../../../../public/Logo_perpole.png";
import { HiOutlineFolderAdd } from "react-icons/hi";
import { Link } from "react-router-dom";
function Folders() {
    const [loading, setLoading] = useState(true);
    const [Folders, setFolders] = useState([]);
    const { isAuth, set_Auth, set_user, user } = useAppContext();
    const patientId = window.localStorage.getItem("patientId");
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://api.reayahmed.com/patient/${patientId}/folder`,
                {
                    withCredentials: true,
                    // validateStatus: () => true,
                }
            );
            console.log("response from  get Folders :", response.data);
            if (response.status == 200) {
                setFolders(response.data);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            }
        } catch (error) {
            console.log("error from  Get Folders :", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    if (loading) {
        return (
            <div
                className=" w-screen h-screen flex items-center 
            justify-center gap-5 flex-col"
            >
                <img src={Logo_perpole} className=" w-24" alt="" />
                <span className="loader"></span>
            </div>
        );
    }
    return (
        <div className=" bg-perpol bg-opacity-40 flex items-center justify-center w-full min-h-screen">
            <div className=" w-[96%] min-h-[95vh] mx-auto bg-white rounded-lg  ">
                <div className=" flex justify-between mx-10">
                    <div className=" text-3xl pt-6 pl-6 text-perpol font-bold ">
                        Folders
                    </div>
                    <Link
                        to={`/Patients/${patientId}/Medical_Folders/Add`}
                        className=" flex items-center justify-center pt-6 gap-2"
                    >
                        <HiOutlineFolderAdd className=" text-3xl text-perpol" />
                        <div className=" text-2xl text-perpol">Add Folder</div>
                    </Link>
                </div>

                <div className=" pt-12">
                    {Folders.length == 0 ? (
                        <div className=" flex flex-col gap-4 ">
                            <div className=" text-center pt-12 text-xl text-gray font-semibold">
                                You have no Folders
                            </div>
                        </div>
                    ) : (
                        Folders.map((folder) => {
                            return (
                                <div className=" flex items-center justify-between border-b-2 border-gray-200 p-4">
                                    <div className=" text-lg font-semibold text-gray-600">
                                        {folder.name}
                                    </div>
                                    <div className=" text-lg font-semibold text-gray-600">
                                        {folder.date}
                                    </div>
                                    <div className=" text-lg font-semibold text-gray-600">
                                        {folder.time}
                                    </div>
                                    <div className=" text-lg font-semibold text-gray-600">
                                        {folder.status}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
                {/* <div
                    div
                    className=" w-[90%] rounded-lg bg-perpol text-white text-3xl mx-auto mt-6 py-8 
                font-semibold flex items-center justify-between px-12"
                >
                    <div>
                        <div>Next folderment</div>
                        <div>Dr.Mohamed</div>
                    </div>
                    <div className=" text-green">April 18th</div>
                </div> */}
            </div>
        </div>
    );
}

export default Folders;
