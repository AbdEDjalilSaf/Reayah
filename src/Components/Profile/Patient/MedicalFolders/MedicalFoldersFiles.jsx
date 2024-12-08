import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../../../../AppContext";
import { FiTrash, FiEdit, FiDownload } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import  Add  from "../MedicalFolders/Add";
import Swal from "sweetalert2";
import Logo_perpole from "../../../../../public/Logo_perpole.png";
// import { HiOutlineFolderAdd } from "react-icons/hi";
// import { Link } from "react-router-dom";
   

const MedicalFoldersFiles = () => {
    const [loading, setLoading] = useState(true);
    const [Files, setFiles] = useState([]);
    const [sizeFile,setSizeFile] = useState();
    const [activeFileId, setActiveFileId] = useState(null);
    const { isAuth, set_Auth, set_user, user } = useAppContext();
    const patientId = window.localStorage.getItem("patientId");
    const folderPatientId = window.localStorage.getItem("folderPatientId");



    const fetchData = async () => {
        setLoading(true);
        console.log("Patient ID:", patientId);
        console.log("Files ID:", folderPatientId);
        try {
            const response = await axios.get(
                `https://api.reayahmed.com/patient/${patientId}/folder/${folderPatientId}/file/`,
                {
                    withCredentials: true,
                    // validateStatus: () => true,
                }
            );
            console.log("response from  get Files :", response.data);
            if (response.status == 200) {
                setFiles(response.data);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            }
        } catch (error) {
            console.log("error from  Get files :", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "no files went wrong!",
            });
        } finally {
            setLoading(false);
        }
    };
    
    // const [Loading_UploadFile, setLoading_UploadFile] = useState(false);
    // const filetes = acceptedFiles;

const handleFileChange = async (event) => {
    setLoading(true);
const file = event.target.files?.[0]
console.log(" the file name is :",file.name);
console.log(" the file type is :",file.type);
    if (file) {
        try {
            const response = await axios.post(
                `https://api.reayahmed.com/patient/${patientId}/folder/${folderPatientId}/file/`,
                {
                    name: file.name,
                    file: file.type, 
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            // const fileSize = (file.size / (1024 * 1024)).toFixed(1);
            // console.log("Upload response:", response.data);
            // console.log("File size:", fileSize);

            // setFiles([...Files, {...response.data, size: fileSize}]); // Update file list with response and size
            // console.log("File uploaded successfully:", response.data);

             const newFile = {
                    name: file.name,
                    created_at: new Date().toISOString().split('T')[0],
                    size: (file.size / (1024 * 1024)).toFixed(1),
                  };
                setFiles(prevFiles => [...prevFiles, newFile]);
                console.log("File uploaded successfully:", response.data);
          
        } catch (error) {
            console.error("Error uploading file:", error);
           
        } finally {
            setLoading(false);
            toogleUploadFile(); // Reset upload modal or state
        }
    }
};
    

const handleUploadClick = () => {
    document.getElementById('file-upload')?.click()
}


useEffect(() => {
    fetchData();
},[]);




const [uploadFile, setUploadFile] = useState(false);


function toogleUploadFile() {
    setUploadFile(!uploadFile);
}

  
    const [activeDropdown, setActiveDropdown] = useState(null);
  
    const toggleDropdown = (index) => {
      setActiveDropdown(prevState => prevState === index ? null : index);
    };
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (activeDropdown !== null && !event.target.closest('td')) {
          setActiveDropdown(null);
        }
      };
  
      document.addEventListener('click', handleClickOutside);
  
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
}, [activeDropdown]);


const handleRemoveFile = async (id) => {
    setLoading(true);
    console.log("id to be sent file:", id);
    try {
        // Set the isDeleting flag for the file
        setFiles(prevFiles => prevFiles.map(file => 
            file.id === id ? { ...file, isDeleting: true } : file
        ));

        const response = await axios.delete(
            `https://api.reayahmed.com/patient/folder/${folderPatientId}/update-file-name-or-delete/${id}/`,
            {
                withCredentials: true,
            }
        );
        
        setActiveDropdown(null);
        console.log("File deleting successfully:", response.data);
        
        // Remove the file from the Files state after a short delay
        setTimeout(() => {
            setFiles(prevFiles => prevFiles.filter(file => file.id !== id));
        }, 300); // 500ms to match the animation duration
        
    } catch (error) {
        console.error("Error deleting file:", error);
        // You can add an error notification here if needed
    } finally {
        setLoading(false);
    }
};


const [loading_RenameFile,setLoading_RenameFile] = useState(false);


const handleRenameFile = async (name) => {
    setLoading_RenameFile(true);
    // console.log("id to be sent file:", id);
    try {
        // Set the isDeleting flag for the file
        // setFiles(prevFiles => prevFiles.map(file => 
        //     file.name !== name ? { ...file, isDeleting: true } : file
        // ));

        const response = await axios.put(
            `https://api.reayahmed.com/patient/folder/${folderPatientId}/update-file-name-or-delete/${activeFileId}/`,
            {
                name: name,
            },
            {
                withCredentials: true,
            }
        );
        
        setActiveDropdown(null);
        console.log("File deleting successfully:", response.data);
        
        setFiles(prevFiles => prevFiles.map(file =>
            file.id === activeFileId ? { ...file, name: name } : file
        ));

        // Remove the file from the Files state after a short delay
        // setTimeout(() => {
        //     setFiles(prevFiles => prevFiles.filter(file => file.id !== id));
        // }, 300); // 500ms to match the animation duration
        
    } catch (error) {
        console.error("Error deleting file:", error);
        // You can add an error notification here if needed
    } finally {
        setLoading_RenameFile(false);
        toogleRenameFile();
    }
};


const [renameFile, setRenameFile] = useState(false);

function toogleRenameFile() {
    setRenameFile(!renameFile);
}


const handleDownloadFile = (file) => {
    const blob = new Blob([file.content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', file.name);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
};


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
            <div className="flex gap-10 space-x-5 ">
                <Add />
                <div className=" text-3xl pt-6 pl-5 text-perpol font-bold ">
                    FolderName Files
                </div>
                </div>


                {renameFile && (
                    <div
                        className="absolute z-40 top-0 left-50 -translate-x-50 -translate-y-50 w-full h-full mx-auto rounded-lg
                     bg-opacity-50 flex items-center justify-center  transition-all duration bg-gray "
                    >
                        <div className=" w-[90%] md:w-[50%] rounded-lg p-6 bg-white">
                            <div className=" text-3xl text-perpol font-bold text-center pb-4">
                                Rename File
                            </div>
                            <div className=" text-md pb-2 text-gray   font-semibold">
                                New Name
                            </div>
                            <input
                                type="text"
                                id="name_input"
                                className=" w-full h-12 border-2 border-gray_white rounded-lg px-4"
                            />
                            <div className=" flex items-center justify-between gap-6">
                                {loading_RenameFile ? (
                                    <div className="mx-auto mt-2 small-loader"></div>
                                ) : (
                                    <button
                                        className=" w-1/2 h-12 bg-perpol text-white rounded-lg mt-4"
                                        onClick={() => {
                                            const name =
                                                document.getElementById(
                                                    "name_input"
                                                ).value;
                                            handleRenameFile(name);
                                        }}
                                    >
                                        Rename
                                    </button>
                                )}

                                <button
                                    onClick={toogleRenameFile}
                                    className=" w-1/2 h-12 bg-red-500 text-white rounded-lg mt-4"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}



                <div
                    // onClick={toogleUploadFile}
                    className=" flex items-center justify-center pt-6 gap-5 cursor-pointer"
                >
        <input 
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileChange} />
                    {/* <HiOutlineFolderAdd className=" text-3xl text-perpol" /> */}
<button onClick={handleUploadClick} className="flex items-center justify-center bg-purple-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400">
<svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 mr-3">
<path d="M15 2L9 2C4 2 2 4 2 9L2 15C2 20 4 22 9 22L15 22C20 22 22 20 22 15L22 9C22 4 20 2 15 2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M15 12.4902L12 9.49023L9 12.4902" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12 9.49023L12 17.4902" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M18 7.49023C14.11 6.19023 9.89 6.19023 6 7.49023" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
      Upload a File
    </button>
</div>
            </div>


{/* 
            {uploadFile && (
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
                                onClick={toogleUploadFile}
                                className=" w-1/2 h-12 bg-red-500 text-white rounded-lg mt-4"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )} */}

            
            <div className=" py-12">
                {Files.length == 0 ? (
                    <div className=" flex flex-col gap-4 ">
                        <div className=" text-center pt-12 text-xl text-gray font-semibold">
                            You have no Files
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
                                <th className=" py-2 px-4 text-left  ">
                                    Size
                                </th>
                                <th className=" py-2 px-4 text-left rounded-tr-lg">
                                    Options
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Files.map((file, index) => (
                                <tr key={index} id={file?.id} className="">
                                    <td className="border-b-[1px] border-l-[1px] border-gray py-2 px-4  flex gap-5 text-gray text-sm font-semibold">
<svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7">
<path d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M22 10H18C15 10 14 9 14 6V2L22 10Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M7 13H13" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M7 17H11" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
                                        {file?.name}
                                    </td>
                                    <td className="  border-b-[1px] border-gray py-1 md:py-2 px-4 w-[15%] text-gray text-[0.78rem] md:text-sm font-semibold ">
                                        {file?.created_at}
                                    </td>
                                    <td className="  border-b-[1px] border-gray py-1 md:py-2 px-4 w-[10%] text-gray text-sm font-semibold ">
                                        15.3mb
                                    </td>
                                    <td  className="  border-b-[1px] border-r-[1px] border-gray py-1 md:py-2 px-4 w-[10%] text-gray relative text-sm font-semibold text-center">
                                    {activeDropdown === index && 
<div  id={`dropdown-${index}`} className={`bg-white  shadow-md absolute  right-[56px] top-6  rounded-lg  p-4 space-y-4 `}>
    <div onClick={()=> 
    handleRemoveFile(file?.id)
    } className="flex items-center cursor-pointer group  space-x-2">
        <FiTrash className="text-gray-600 text-xl group-hover:text-red-400" />
        <span className="text-gray-700 font-medium group-hover:text-red-400">Delete</span>
      </div>
      <div onClick={()=>{ setActiveFileId(file?.id); toogleRenameFile(); }} className="flex items-center cursor-pointer group space-x-2">
        <FiEdit className="text-gray-600 text-xl group-hover:text-blue-400" />
        <span className="text-gray-700 font-medium group-hover:text-blue-400">Rename</span>
      </div>
      <div onClick={() => handleDownloadFile(file)}  className="flex items-center cursor-pointer group  space-x-2">
        <FiDownload className="text-gray-600 text-xl group-hover:text-emerald-400" />
        <span className="text-gray-700 font-medium group-hover:text-emerald-400">Download</span>
    </div>
</div>
                                    }
                                    <button  
                                    onClick={() => toggleDropdown(index)}
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
        </div>
    </div>
  )
}

export default MedicalFoldersFiles
