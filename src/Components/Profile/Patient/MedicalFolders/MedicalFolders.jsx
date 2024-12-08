import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router";
import { useAppContext } from "../../../../AppContext";
import Swal from "sweetalert2";
import { BsThreeDotsVertical } from "react-icons/bs";
import Logo_perpole from "../../../../../public/Logo_perpole.png";
import { Link } from "react-router-dom";
import { HiOutlineFolderAdd } from "react-icons/hi";
// import { Link } from "react-router-dom";
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
    const [Loading_AddFolder, setLoading_AddFolder] = useState(false);


    const handleAddFolder = async (name) => {
        console.log("data to be sent : ", name);
        if (!name) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please enter a name",
            });
            return;
        }
        setLoading_AddFolder(true);
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
            setLoading_AddFolder(false);
            toogleAddFolder();
        }
    };

    // const [Loading_ReadFolder, setLoading_ReadFolder] = useState(false);

const handelReadFolder = async(id) => {
    console.log("id to be sent : ", id);
    window.localStorage.setItem("folderPatientId",id);
    // setLoading_ReadFolder(true);
    try {
        const response = await axios.get(
            `https://api.reayahmed.com/patient/${patientId}/folder/${id}/`,
            {
                withCredentials: true,
                // validateStatus: () => true,
            }
        );
        console.log("response from  get Folders :", response.data);
        console.log(" local storage make it");

        // if (response.status == 200) {
        // } else {
        //     Swal.fire({
        //         icon: "error",
        //         title: "Oops...",
        //         text: "Something went wrong!",
        //     });
        // }
    } catch (error) {
        console.log("error from  Get Folders :", error);
      
    } finally {
console.log(" Folders read finally");
    }

}


    useEffect(() => {
        fetchData();
    }, []);


    const [addFolder, setaddFolder] = useState(false);


    function toogleAddFolder() {
        setaddFolder(!addFolder);
    }


    const [activeDropdown, setActiveDropdown] = useState(null);







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
                    <div className=" text-3xl pt-6 pl-6 text-perpol font-bold ">
                        Folders
                    </div>

                    <div
                        onClick={toogleAddFolder}
                        className=" flex items-center justify-center pt-6 gap-2 cursor-pointer"
                    >
                        <HiOutlineFolderAdd className=" text-3xl text-perpol" />
                        <div className=" text-2xl text-perpol">Add Folder</div>
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
                                {Loading_AddFolder ? (
                                    <div className="mx-auto mt-2 small-loader"></div>
                                ) : (
                                    <button
                                        className=" w-1/2 h-12 bg-perpol text-white rounded-lg mt-4"
                                        onClick={() => {
                                            const name =
                                                document.getElementById(
                                                    "name_input"
                                                ).value;
                                            handleAddFolder(name);
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
                                <tr className="bg-[#7C2CBF] text-white font-semibold">
                                    <th className=" py-2 px-4 text-left rounded-tl-lg ">
                                        Name
                                    </th>
                                    <th className=" py-2 px-4 text-left ">
                                        Created at
                                    </th>
                                    <th className=" py-2 px-4 text-left ">
                                        Size
                                    </th>
                                    <th className=" py-2 px-4 text-left rounded-tr-lg">
                                    Options
                                    </th>
                                </tr>
                            </thead> 
                            <tbody>
                                {Folders.map((folder,index) => (
                                    <tr key={folder?.id} id={folder?.id} className="">
                                        <td className="border-b-[1px] border-l-[1px] border-gray py-2 px-4 w-[50%] text-gray text-sm font-semibold" 
                                         onClick={() => {
                                            handelReadFolder(folder?.id);
                                        }}>
                                        <Link to={`/Patients/${patientId}/Medical_Folders/${folder?.id}`}>
                                            {/* <Link to={`/Patients/${patientId}/Medical_Folders`}> */}
                                            {folder?.name}
                                            {/* </Link> */}
                                            </Link>
                                        </td>
                                        <td className="  border-b-[1px] border-gray py-1 md:py-2 px-4 w-[15%] text-gray text-[0.78rem] md:text-sm font-semibold ">
                                            {folder?.created_at}
                                        </td>
                                        <td className="  border-b-[1px] border-gray py-1 md:py-2 px-4 w-[10%] text-gray text-sm font-semibold ">
                                            15.1mb
                                        </td>
                                        <td  className="  border-b-[1px] border-r-[1px] border-gray py-1 md:py-2 px-4 w-[10%] text-gray relative text-sm font-semibold text-center">
                                    <button  
                                    className={`curser-pointer hover:bg-slate-200 ${activeDropdown === index ? 'bg-slate-200 rounded-full p-1 ' : ''} hover:p-1 transition rounded-full`}>
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
    );
}

export default Folders;














// import React, { useEffect, useState } from "react";
// import axios from "axios";
// // import { useNavigate } from "react-router";
// import { useAppContext } from "../../../../AppContext";
// import { FiTrash, FiEdit, FiDownload } from "react-icons/fi";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import  Add  from "../MedicalFolders/Add";
// import Swal from "sweetalert2";
// import Logo_perpole from "../../../../../public/Logo_perpole.png";
// import { HiOutlineFolderAdd } from "react-icons/hi";
// // import { Link } from "react-router-dom";
   

// const MedicalFoldersFiles = () => {
//     const [loading, setLoading] = useState(true);
//     const [toggleThreeDots,setToggleThreeDots] = useState(false);
//     const [Files, setFiles] = useState([]);
//     const { isAuth, set_Auth, set_user, user } = useAppContext();
//     const patientId = window.localStorage.getItem("patientId");
//     const folderPatientId = window.localStorage.getItem("folderPatientId");

//     const fetchData = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get(
//                 `https://api.reayahmed.com/patient/${patientId}/folder/${folderPatientId}/file/`,
//                 {
//                     withCredentials: true,
//                     // validateStatus: () => true,
//                 }
//             );
//             console.log("response from  get Files :", response.data);
//             if (response.status == 200) {
//                 setFiles(response.data);
//             } else {
//                 Swal.fire({
//                     icon: "error",
//                     title: "Oops...",
//                     text: "Something went wrong!",
//                 });
//             }
//         } catch (error) {
//             console.log("error from  Get Folders :", error);
//             Swal.fire({
//                 icon: "error",
//                 title: "Oops...",
//                 text: "no files went wrong!",
//             });
//         } finally {
//             setLoading(false);
//         }
//     };
    
//     const [Loading_UploadFile, setLoading_UploadFile] = useState(false);


//     const handleUploadFile = async (name) => {
//         console.log("data to be sent : ", name);
//         if (!name) {
//             Swal.fire({
//                 icon: "error",
//                 title: "Oops...",
//                 text: "Please enter a name",
//             });
//             return;
//         }
//         setLoading_UploadFile(true);
//         try {
//             const response = await axios.post(
//                 `https://api.reayahmed.com/patient/${patientId}/folder/`,
//                 { name: name },
//                 {
//                     withCredentials: true,
//                     // validateStatus: () => true,
//                 }
//             );
//             console.log("response from  get Files :", response.data);
//             // if (response.status == 200) {
//             setFiles([...Files, { name, patient: patientId }]);
//             console.log("Files : ", Files);
//             // } else {
//             //     Swal.fire({
//             //         icon: "error",
//             //         title: "Oops...",
//             //         text: "Something went wrong!",
//             //     });
//             // }
//         } catch (error) {
//             console.log("error from  Get Files :", error);
//             Swal.fire({
//                 icon: "error",
//                 title: "Oops...",
//                 text: "Something went wrong!",
//             });
//         } finally {
//             setLoading_UploadFile(false);
//             toogleUploadFile();
//             // toggleThreeDotsPoints();
//         }
//     };


// useEffect(() => {
//     fetchData();
// }, []);


// const [selectedFile, setSelectedFile] = useState(null)

//   const handleFileChange = (event) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       setSelectedFile(file)
//       // You can handle the file upload here
//       console.log('Selected file:', file)
//     }
//   }

//   const handleUploadClick = () => {
//     document.getElementById('file-upload')?.click()
//   }


// const [uploadFile, setUploadFile] = useState(false);


// function toogleUploadFile() {
//     setUploadFile(!uploadFile);
// }


// function toggleThreeDotsPoints() {
//     setToggleThreeDots(!toggleThreeDots);
// }


// if (loading) {
//     return (
//         <div
//             className=" w-screen md:w-[80vw] h-screen flex items-center justify-center gap-5 flex-col"
//         >
//             <img src={Logo_perpole} className=" w-24" alt="" />
//             <span className="loader"></span>
//         </div>
//     );
// }

// return (
//     <div className=" bg-perpol bg-opacity-40 flex items-center justify-center w-full min-h-screen ">
//         <div className=" w-[96%] min-h-[95vh] mx-auto bg-white rounded-lg  relative">
//             <div className=" flex flex-col md:flex-row  justify-between mx-10  h-full">
//             <div className="flex gap-10 space-x-5 ">
//                 <Add />
//                 <div className=" text-3xl pt-6 pl-5 text-perpol font-bold ">
//                     FolderName Files
//                 </div>
//                 </div>
//     <input
//         type="file"
//         id="file-upload"
//         className="hidden"
//         onChange={handleFileChange}
//     />
//                 <div
//                     onClick={toogleUploadFile}
//                     className=" flex items-center justify-center pt-6 gap-5 cursor-pointer"
//                 >
//                     {/* <HiOutlineFolderAdd className=" text-3xl text-perpol" /> */}
// <button onClick={handleUploadClick} className="flex items-center justify-center bg-purple-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400">
// <svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 mr-3">
// <path d="M15 2L9 2C4 2 2 4 2 9L2 15C2 20 4 22 9 22L15 22C20 22 22 20 22 15L22 9C22 4 20 2 15 2Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
// <path d="M15 12.4902L12 9.49023L9 12.4902" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
// <path d="M12 9.49023L12 17.4902" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
// <path d="M18 7.49023C14.11 6.19023 9.89 6.19023 6 7.49023" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
// </svg>

//       Upload a File
//     </button>

// {/* 
//       <button
        
//         className="bg-[#9747FF] hover:bg-[#8A35FF] text-white rounded-full px-8 py-6 text-xl font-medium flex gap-2 transition-colors"
//       >
//         Upload a File
//       </button> */}
//     </div>
//             </div>


// {/* 
//             {uploadFile && (
//                 <div
//                     className="absolute top-0 left-50 -translate-x-50 -translate-y-50 w-full h-full mx-auto rounded-lg
//                  bg-opacity-50 flex items-center justify-center  transition-all duration bg-gray "
//                 >
//                     <div className=" w-[90%] md:w-[50%] rounded-lg p-6 bg-white">
//                         <div className=" text-3xl text-perpol font-bold text-center pb-4">
//                             Add Folder
//                         </div>
//                         <div className=" text-md pb-2 text-gray   font-semibold">
//                             Name
//                         </div>
//                         <input
//                             type="text"
//                             id="name_input"
//                             className=" w-full h-12 border-2 border-gray_white rounded-lg px-4"
//                         />
//                         <div className=" flex items-center justify-between gap-6">
//                             {Loading_UploadFile ? (
//                                 <div className="mx-auto mt-2 small-loader"></div>
//                             ) : (
//                                 <button
//                                     className=" w-1/2 h-12 bg-perpol text-white rounded-lg mt-4"
//                                     onClick={() => {
//                                         const name =
//                                             document.getElementById(
//                                                 "name_input"
//                                             ).value;
//                                         handleUploadFile(name);
//                                     }}
//                                 >
//                                     Add
//                                 </button>
//                             )}

//                             <button
//                                 onClick={toogleUploadFile}
//                                 className=" w-1/2 h-12 bg-red-500 text-white rounded-lg mt-4"
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )} */}

            
//             <div className=" py-12">
//                 {Files.length == 0 ? (
//                     <div className=" flex flex-col gap-4 ">
//                         <div className=" text-center pt-12 text-xl text-gray font-semibold">
//                             You have no Files
//                         </div>
//                     </div>
//                 ) : (
//                     <table className="w-[90%] mx-auto rounded-lg  ">
//                         <thead>
//                             <tr className="bg-[#7C2CBF] text-white font-semibold">
//                                 <th className=" py-2 px-4 text-left rounded-tl-lg ">
//                                     Name
//                                 </th>
//                                 <th className=" py-2 px-4 text-left ">
//                                     Created at
//                                 </th>
//                                 <th className=" py-2 px-4 text-left  ">
//                                     Size
//                                 </th>
//                                 <th className=" py-2 px-4 text-left rounded-tr-lg">
//                                     Options
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {Files.map((file) => (
//                                 <tr key={file?.id} className="">
//                                     <td className="border-b-[1px] border-l-[1px] border-gray py-2 px-4  flex gap-5 text-gray text-sm font-semibold">
// <svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7">
// <path d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
// <path d="M22 10H18C15 10 14 9 14 6V2L22 10Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
// <path d="M7 13H13" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
// <path d="M7 17H11" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
// </svg>
//                                         {file?.name}
//                                     </td>
//                                     <td className="  border-b-[1px] border-gray py-1 md:py-2 px-4 w-[15%] text-gray text-[0.78rem] md:text-sm font-semibold ">
//                                         {file?.created_at}
//                                     </td>
//                                     <td className="  border-b-[1px] border-gray py-1 md:py-2 px-4 w-[10%] text-gray text-sm font-semibold ">
//                                         15.1mb
//                                     </td>
//                                     <td className="  border-b-[1px] border-r-[1px] border-gray py-1 md:py-2 px-4 w-[10%] text-gray relative text-sm font-semibold text-center">
//                                     {toggleThreeDots && 
// <div className="bg-white shadow-md absolute left-4 rounded-lg p-4 space-y-4">
//     <div className="flex items-center space-x-2">
//         <FiTrash className="text-gray-600 text-xl" />
//         <span className="text-gray-700 font-medium">Delete</span>
//       </div>
//       <div className="flex items-center space-x-2">
//         <FiEdit className="text-gray-600 text-xl" />
//         <span className="text-gray-700 font-medium">Rename</span>
//       </div>
//       <div className="flex items-center space-x-2">
//         <FiDownload className="text-gray-600 text-xl" />
//         <span className="text-gray-700 font-medium">Download</span>
//     </div>
// </div>
//                                     }
//                                     <button onClick={toggleThreeDotsPoints} className="curser-pointer">
//                                     <BsThreeDotsVertical />
//                                     </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//             </div>
//             {/* <div
//                 div
//                 className=" w-[90%] rounded-lg bg-perpol text-white text-3xl mx-auto mt-6 py-8 
//             font-semibold flex items-center justify-between px-12"
//             >
//                 <div>
//                     <div>Next folderment</div>
//                     <div>Dr.Mohamed</div>
//                 </div>
//                 <div className=" text-green">April 18th</div>
//             </div> */}
//         </div>
//     </div>
//   )
// }

// export default MedicalFoldersFiles
