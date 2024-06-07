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
import image_not_found from "../../../public/image_not_found.png";
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
                        <img
                            className=" w-16 h-16 border-2 object-cover border-t-green border-l-green border-r-green rounded-full border-b-transparent  text-gray_white flex items-center justify-center"
                            src={`https://api.reayahmed.com/${user?.picture}`}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = image_not_found;
                            }}
                            alt=""
                        />
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
                <div className=" w-[90%] mx-auto  md:min-w-[50%] md:max-w-[70%] flex flex-col gap-4 ">
                    {search_result?.["Recommended specialty"] && (
                        <div className=" bg-green rounded-xl py-3 px-5 text-sm">
                            Recommended specialty :{" "}
                            <span className=" font-semibold">
                                {search_result?.["Recommended specialty"]}
                            </span>
                        </div>
                    )}
                    <div className=" bg-green rounded-xl py-3 px-5 text-sm font-semibold">
                        Give your eyes a break: If you spend a lot of time
                        looking at screens, take breaks every 20 minutes or so
                        to look away for 20 seconds at something 20 feet away.
                    </div>
                    <div className=" bg-green rounded-xl py-3 px-5 text-sm font-semibold">
                        Don't smoke: Smoking is a major risk factor for macular
                        degeneration, a leading cause of vision loss.
                    </div>
                </div>
            </div>
            <div className="  text-2xl text-center py-4 text-perpol font-bold">
                Reayah Doctors{" "}
            </div>
            {search_result.Doctors.length == 0 ? (
                <div className=" min-h-[40vh] text-xl font-semibold text-gray flex items-center justify-center">
                    No Recommended Doctors Found
                </div>
            ) : (
                <div className=" flex flex-col gap-2 max-w-[90%] mx-auto">
                    {search_result.Doctors.map((doctor) => (
                        <div
                            key={doctor?.id}
                            className=" flex gap-8 items-center justify-between
                             bg-green bg-opacity-10 p-4 rounded-xl border-2 border-green"
                        >
                            <div className=" flex gap-4 items-center">
                                {doctor?.picture ? (
                                    <img
                                        src={`https://api.reayahmed.com/${doctor?.picture}`}
                                        className=" w-16 h-16 object-cover border-2 border-t-green border-l-green border-r-green rounded-full border-b-transparent "
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = image_not_found;
                                        }}
                                        alt=""
                                    />
                                ) : (
                                    <div className=" w-16 h-16 border-2 border-t-green border-l-green border-r-green rounded-full border-b-transparent text-8xl text-gray_white flex items-center justify-center ">
                                        <FaCircleUser />
                                    </div>
                                )}
                                <div className=" text-sm font-semibold text-gray">
                                    {doctor?.full_name}
                                </div>
                            </div>
                            <div className=" flex gap-4 items-center">
                                <div className=" bg-green rounded-xl py-1 px-3 text-sm font-semibold">
                                    {doctor?.specialization_name}
                                </div>
                                <div className=" bg-green rounded-xl py-1 px-3 text-sm font-semibold">
                                    {doctor?.experience} years of experience
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Search;
