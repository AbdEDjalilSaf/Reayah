import React from "react";
import { useLocation } from "react-router";
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "../../AppContext";
import { FaCircleUser } from "react-icons/fa6";
// import bot_icon from "../../../public/bot.png";
import bot_icon from "../../../public/Bot.png";
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
                set_search_result(response.data);
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
        Promise.all([fetchuser(), fetchData()])
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
        <div className="  pt-6 ">
            <div className=" flex flex-col gap-2 mb-6 mx-6 md:mx-24">
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
                    you are searching for :{" "}
                    <span className=" font-semibold text-gray">
                        {query.get("q")}
                    </span>
                </div>
            </div>
            <div className=" w-full min-h-[90vh]  bg-perpol flex flex-col md:flex-row items-center justify-center gap-6 ">
                <img
                    src={bot_icon}
                    className=" max-w-24 md:max-w-44 animate-up-down"
                    alt=""
                /> 
                <div className=" w-[90%] mx-auto  md:min-w-[50%] md:max-w-[70%] flex flex-col gap-4">
                    {search_result?.["Recommended specialty"] && (
                        <div className=" bg-green rounded-xl py-3 px-5 text-sm">
                            Recommended specialty :{" "}
                            <span className=" font-semibold">
                                {search_result?.["Recommended specialty"]}
                            </span>
                        </div>
                    )}
                    <div className=" bg-green rounded-xl py-3 px-5 text-sm">
                        Give your eyes a break: If you spend a lot of time
                        looking at screens, take breaks every 20 minutes or so
                        to look away for 20 seconds at something 20 feet away.
                    </div>
                    <div className=" bg-green rounded-xl py-3 px-5 text-sm">
                        Don't smoke: Smoking is a major risk factor for macular
                        degeneration, a leading cause of vision loss.
                    </div>
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
