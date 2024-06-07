import React from "react";
import { useLocation } from "react-router";
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
function Search() {
    const [search_result, set_search_result] = useState([]);
    const [loading, setLoading] = useState(true);
    const query = useQuery();
    const searchQuery = query.get("q");
    const fetchData = async () => {
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
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
    else if (search_result?.length == 0)
        return (
            <div className=" min-h-[calc(100vh-60px)]">No Recommended Doctores Found</div>
        );
    return (
        <div className=" min-h-[calc(100vh-60px)]">
            Search Query: {searchQuery}
        </div>
    );
}

export default Search;
