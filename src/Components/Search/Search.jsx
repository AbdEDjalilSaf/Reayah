import React from "react";
import { useLocation } from "react-router";
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "../../AppContext";
import { FaCircleUser } from "react-icons/fa6";
import axios from "axios";
function Search() {
    const [user, set_user] = useState(null);
    const patientId = window.localStorage.getItem("patientId");
    console.log(user);
    const [search_result, set_search_result] = useState([]);
    const [loading, setLoading] = useState(true);
    const query = useQuery();
    const searchQuery = query.get("q");
    const fetchData = async () => {
        try {
            const refresh = window.localStorage.getItem("refresh");
            // console.log("refresh token from  Get Profile :", refresh);
            if (refresh) {
                const response = await axios.post(
                    `https://api.reayahmed.com/base/recommendation_doctor/backup/v0/`,
                    { input: searchQuery },
                    {
                        withCredentials: true,
                        // validateStatus: () => true,
                    }
                );
                console.log("response from  search :", response.data);
                set_search_result(response.data.Doctors);
            } else {
                set_search_result([]);
            }
        } catch (error) {
            set_search_result([]);
        }
    };
    const fetchuser = async () => {
        try {
            const response = await axios.get(
                `https://api.reayahmed.com/patient/${patientId}/`,
                {
                    withCredentials: true,
                    // validateStatus: () => true,
                }
            );
            console.log("response from  get Profile :", response.data);
            if (response.status == 200) {
                set_user(response.data);
            } else {
                set_Auth(false);
                Navigate("/");
            }
        } catch (error) {
            console.log("error from  Get Profile :", error);
            set_Auth(false);
            Navigate("/");
        }
    };
    useEffect(() => {
        setLoading(true);
        Promise.all([fetchuser()])
            .then(() => {
                setLoading(false);
                // Navigate(`/Patients/${patientId}/Profile`);
            })
            .catch(() => {
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [searchQuery]);
    useEffect(() => {
        console.log("search_result : ", search_result);
    }, [search_result]);
    if (loading)
        return (
            <div className=" w-screen h-screen flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );

    return (
        <div className=" w-[90%] mx-auto pt-6 ">
            <div className=" flex flex-col gap-2 mb-6">
                <div className=" flex gap-6 items-center ">
                    {user?.picture ? (
                        <img src={user?.picture} alt="" />
                    ) : (
                        <div className=" w-16 h-16 border-2 border-t-green border-l-green border-r-green rounded-full border-b-transparent text-8xl text-gray_white flex items-center justify-center ">
                            <FaCircleUser />
                        </div>
                    )}
                    <div className=" text-sm font-semibold text-gray">
                        {user?.full_name}
                    </div>
                </div>
                <div className=" bg-green bg-opacity-15 border-2 border-green p-2 rounded-b-xl px-12">
                    you are searching for : <span className=" font-semibold text-gray">{query.get("q")}</span>
                </div>
            </div>

            {search_result.length == 0 ? (
                <div className=" min-h-[calc(100vh-60px)]">
                    No Recommended Doctores Found
                </div>
            ) : (
                <div>Recomondation : </div>
            )}
        </div>
    );
}

export default Search;
