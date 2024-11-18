import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router";
import { useAppContext } from "../../../../AppContext";
import { FiTrash, FiEdit, FiDownload } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Add } from "./Add";
import Swal from "sweetalert2";
import Logo_perpole from "../../../../../public/Logo_perpole.png";
import { HiOutlineFolderAdd } from "react-icons/hi";
// import { Link } from "react-router-dom";
   

const MedicalFoldersFiles = () => {
    const [loading, setLoading] = useState(true);
    const [toggleThreeDots,setToggleThreeDots] = useState(false);
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
    
    const [Loading_UploadFile, setLoading_UploadFile] = useState(false);


    const handleUploadFile = async (name) => {
        console.log("data to be sent : ", name);
        if (!name) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please enter a name",
            });
            return;
        }
        setLoading_UploadFile(true);
        try {
            const response = await axios.post(
                `https://api.reayahmed.com/patient/${patientId}/folder/`,
                { name: name },
                {
                    withCredentials: true,
                    // validateStatus: () => true,
                }
            );
            console.log("response from  get Folders :", response.data);
            // if (response.status == 200) {
            setFolders([...Folders, { name, patient: patientId }]);
            console.log("Folders : ", Folders);
            // } else {
            //     Swal.fire({
            //         icon: "error",
            //         title: "Oops...",
            //         text: "Something went wrong!",
            //     });
            // }
        } catch (error) {
            console.log("error from  Get Folders :", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        } finally {
            setLoading_UploadFile(false);
            toogleAddFolder();
        }
    };


    useEffect(() => {
        fetchData();
    }, []);


function toggleThreeDotsPoints() {
    setToggleThreeDots(!toggleThreeDots);
}


if (loading) {
    return (
        <div
            className=" w-screen md:w-[80vw] h-screen flex items-center justify-center gap-5 flex-col"
        >
            <img src={Logo_perpole} className=" w-24" alt="" />
            <span className="loader"></span>
        </div>
    );
}

return (
    <div className=" bg-perpol bg-opacity-40 flex items-center justify-center w-full min-h-screen ">
        <div className=" w-[96%] min-h-[95vh] mx-auto bg-white rounded-lg  relative">
            <div className=" flex flex-col md:flex-row  justify-between mx-10  h-full">
                <Add />
                <div className=" text-3xl pt-6 pl-6 text-perpol font-bold ">
                    FolderName Files
                </div>

                <div
                    onClick={toogleAddFolder}
                    className=" flex items-center justify-center pt-6 gap-2 cursor-pointer"
                >
                    {/* <HiOutlineFolderAdd className=" text-3xl text-perpol" /> */}
<svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 bg-perpol">
<path d="M15 2L9 2C4 2 2 4 2 9L2 15C2 20 4 22 9 22L15 22C20 22 22 20 22 15L22 9C22 4 20 2 15 2Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 12.4902L12 9.49023L9 12.4902" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 9.49023L12 17.4902" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18 7.49023C14.11 6.19023 9.89 6.19023 6 7.49023" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                    <div className=" text-2xl text-perpol">Upload a Files</div>
                </div>
            </div>


            {addFolder && (
                <div
                    className="absolute top-0 left-50 -translate-x-50 -translate-y-50 w-full h-full mx-auto rounded-lg
                 bg-opacity-50 flex items-center justify-center  transition-all duration bg-gray "
                >
                    <div className=" w-[90%] md:w-[50%] rounded-lg p-6 bg-white">
                        <div className=" text-3xl text-perpol font-bold text-center pb-4">
                            Add Folder
                        </div>
                        <div className=" text-md pb-2 text-gray   font-semibold">
                            Name
                        </div>
                        <input
                            type="text"
                            id="name_input"
                            className=" w-full h-12 border-2 border-gray_white rounded-lg px-4"
                        />
                        <div className=" flex items-center justify-between gap-6">
                            {Loading_UploadFile ? (
                                <div className="mx-auto mt-2 small-loader"></div>
                            ) : (
                                <button
                                    className=" w-1/2 h-12 bg-perpol text-white rounded-lg mt-4"
                                    onClick={() => {
                                        const name =
                                            document.getElementById(
                                                "name_input"
                                            ).value;
                                        handleUploadFile(name);
                                    }}
                                >
                                    Add
                                </button>
                            )}

                            <button
                                onClick={toogleAddFolder}
                                className=" w-1/2 h-12 bg-red-500 text-white rounded-lg mt-4"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            
            <div className=" py-12">
                {Folders.length == 0 ? (
                    <div className=" flex flex-col gap-4 ">
                        <div className=" text-center pt-12 text-xl text-gray font-semibold">
                            You have no Folders
                        </div>
                    </div>
                ) : (
                    <table className="w-[90%] mx-auto rounded-lg  ">
                        <thead>
                            <tr className="bg-perpol text-white font-semibold">
                                <th className=" py-2 px-4 text-left rounded-tl-lg border-r">
                                    Name
                                </th>
                                <th className=" py-2 px-4 text-left border-r">
                                    Created at
                                </th>
                                <th className=" py-2 px-4 text-left rounded-tr-lg">
                                    Size
                                </th>
                                <th className=" py-2 px-4 text-left rounded-tr-lg">
                                    Options
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Folders.map((folder) => (
                                <tr key={folder?.id} className="">
                                    <td className="border border-gray py-2 px-4 w-[50%] flex gap-5 text-gray text-sm font-semibold">
<svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7">
<path d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22 10H18C15 10 14 9 14 6V2L22 10Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7 13H13" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7 17H11" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                                        {folder?.name}
                                    </td>
                                    <td className="border border-gray py-2 px-4 w-[35%] text-gray text-sm font-semibold text-center">
                                        {folder?.created_at}
                                    </td>
                                    <td className="border border-gray py-2 px-4 w-[15%] text-gray text-sm font-semibold text-center">
                                        15.1mb
                                    </td>
                                    <td className="border border-gray py-2 px-4 w-[15%] text-gray relative text-sm font-semibold text-center">
                                    {toggleThreeDots && 
<div className="bg-white shadow-md rounded-lg p-4 space-y-4">
    <div className="flex items-center space-x-2">
        <FiTrash className="text-gray-600 text-xl" />
        <span className="text-gray-700 font-medium">Delete</span>
      </div>
      <div className="flex items-center space-x-2">
        <FiEdit className="text-gray-600 text-xl" />
        <span className="text-gray-700 font-medium">Rename</span>
      </div>
      <div className="flex items-center space-x-2">
        <FiDownload className="text-gray-600 text-xl" />
        <span className="text-gray-700 font-medium">Download</span>
    </div>
</div>
                                    }
                                    <button onClick={toggleThreeDotsPoints} className="curser-pointer">
                                    <BsThreeDotsVertical />
                                    </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
  )
}

export default MedicalFoldersFiles
