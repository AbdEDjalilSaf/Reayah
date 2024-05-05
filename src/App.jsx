import React from "react";
import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import axios from "axios";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import Hero from "../public/Home/Hero.png";
import Are_You_Doctore from "../public/Home/Are_You_Doctore.png";
import icon_paper from "../public/Home/icon_paper.svg";
import icon_secure from "../public/Home/icon_secure.svg";
import icon_user from "../public/Home/icon_user.svg";
import trend_up from "../public/Home/trend_up.svg";
import Logo from "../public/Logo/Logo.svg";
import search from "../public/search.svg";
import Bot from "../public/Bot.png";
import user1 from "../public/user1.jpg";
import user2 from "../public/user2.jpg";
import { useAppContext } from "./AppContext";
function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch_images = () => {
            return new Promise((resolve, reject) => {
                const images = [
                    Hero,
                    Are_You_Doctore,
                    icon_paper,
                    icon_secure,
                    icon_user,
                    trend_up,
                    Logo,
                    search,
                    user1,
                    user2,
                    Bot,
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

        Promise.all([fetch_fonts(), fetch_images()])
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);
    if (loading) {
        return (
            <div className=" w-screen h-screen flex items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    }
    return <Outlet />;
}

export default App;
