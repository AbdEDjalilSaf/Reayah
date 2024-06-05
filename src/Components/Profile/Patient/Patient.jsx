import React from "react";
import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import axios from "axios";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import Appointments_icon from "../../../../public/Profiles/Nav/Appointments.svg";

import Articles_icon from "../../../../public/Profiles/Nav/Articles.svg";
import inbox_icon from "../../../../public/Profiles/Nav/inbox.svg";
import Overview_icon from "../../../../public/Profiles/Nav/Overview.svg";
// import icon_user from "../../../../public/Profiles/Nav/icon_user.svg";
import Patients_icon from "../../../../public/Profiles/Nav/Patients.svg";
import Logo from "../../../../public/Logo.svg";
import Settings_icon from "../../../../public/Profiles/Nav/Settings.svg";
import Wallet_icon from "../../../../public/Profiles/Nav/Wallet.svg";
import Logout_icon from "../../../../public/Logout.svg";
// import notification from "../../../../public/notification.svg";
// import user from "../../../../public/user.svg";
import Menu_Toogler from "../../../../public/Menu_Toogler.svg";
import { useAppContext } from "../../../AppContext";
import NavBar from "./NavBar/NavBar";
function Patient() {
    const { isAuth, set_Auth, set_user, user } = useAppContext();
    const [loading, setLoading] = useState(true);
    const [Active_nav, setActive_nav] = useState("Home");
    const Navigate = useNavigate();
    const patientId = window.localStorage.getItem("patientId");

    useEffect(() => {
        const fetch_images = () => {
            return new Promise((resolve, reject) => {
                const images = [
                    Appointments_icon,
                    Articles_icon,
                    inbox_icon,
                    Overview_icon,
                    icon_user,
                    Patients_icon,
                    Logo,
                    Settings_icon,
                    Wallet_icon,
                    Logout_icon,
                    // user,
                    // notification,
                    Menu_Toogler,
                ];
                let loadedCount = 0;
                if (images.length === 0) resolve();
                images.forEach((imageSrc) => {
                    const img = new Image();
                    img.onload = () => {
                        loadedCount++;
                        if (loadedCount === images.length) {
                            resolve(); // Resolve promise when all images are loaded
                        }
                    };
                    img.onerror = () => {
                        resolve(); // Reject if any image fails to load
                    };
                    img.src = imageSrc;
                });
            });
        };
        const fetch_fonts = () => {
            return new Promise((resolve, reject) => {
                const fontURL =
                    "https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap";

                const loadFont = (url) => {
                    return new Promise((resolve, reject) => {
                        const link = document.createElement("link");
                        link.href = url;
                        link.rel = "stylesheet";
                        link.onload = () => {
                            resolve(); // Resolve promise when font is loaded
                        };
                        link.onerror = () => {
                            document.getElementById("root").style.fontFamily =
                                "sans-serif";
                            resolve(); // Resolve even if font fails to load
                        };
                        document.head.appendChild(link);
                        document.getElementById("root").style.fontFamily =
                            "Outfit";
                    });
                };

                // Load the font
                loadFont(fontURL)
                    .then(resolve)
                    .catch(() => {
                        document.getElementById("root").style.fontFamily =
                            "sans-serif";
                        resolve();
                    });
            });
        };
        const fetchData = async () => {
            try {
                const refresh = window.localStorage.getItem("refresh");
                // console.log("refresh token from  Get Profile :", refresh);
                if (refresh) {
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
                        // window.localStorage.removeItem("refresh");
                        // window.localStorage.removeItem("access");
                        // window.location.href = "/";
                    }
                } else {
                    set_Auth(false);
                    // window.localStorage.removeItem("refresh");
                    // window.localStorage.removeItem("access");
                    // window.location.href = "/";
                }
            } catch (error) {
                console.log("error from  Get Profile :", error);
                set_Auth(false);
                // window.localStorage.removeItem("refresh");
                // window.localStorage.removeItem("access");
                // window.location.href = "/";
            }
        };
        if (!patientId) Navigate("/");
        else
            Promise.all([fetch_fonts(), fetch_images(), fetchData()])
                .then(() => {
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
    }, []);
    useEffect(() => {
        console.log("user : ", user);
    }, [user]);
    if (loading) {
        return (
            <div className=" w-screen h-screen flex items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    }

    return (
        <div className="relative max-h-screen overflow-y-auto custom-overflow overflow-x-hidden ">
            <NavBar Active_nav={Active_nav} setActive_nav={setActive_nav} />
            <div className="   bg-perpol">
                <Outlet />
            </div>
        </div>
    );
}

export default Patient;
