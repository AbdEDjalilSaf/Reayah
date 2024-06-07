import React from "react";
import Hero_img from "../../../public/Home/Hero.png";
import search_image from "../../../public/search.svg";
import trend_up from "../../../public/Home/trend_up.svg";
import { useAppContext } from "../../AppContext";
import { useNavigate } from "react-router";
import { useState } from "react";
function Hero() {
    const Navigate = useNavigate();
    const { isAuth } = useAppContext();
    const [search, setSearch] = useState("");
    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    };
    const doctorId = window.localStorage.getItem("doctorId");
    return (
        <div>
            <div className=" flex flex-col md:flex-row items-center justify-center gap-6 py-12 md:py-28">
                <div>
                    <div className=" text-2xl font-semibold w-[300px] md:w-[350px] text-black_text   ">
                        <span className=" relative  ">
                            Your Health
                            <span className="hidden md:block absolute  left-0 -z-10 bottom-[2px] w-[130px] h-2 rounded-xl bg-green "></span>
                        </span>{" "}
                        in Our <br className=" block md:hidden" /> Care,
                        <br /> Smart and <br className=" block md:hidden" />{" "}
                        Effective <br className=" block md:hidden" />
                        <span className=" relative  ">
                            Healthcare
                            <span className=" hidden md:block absolute  left-0 -z-10 bottom-[2px] w-[125px] h-2 rounded-xl bg-green "></span>
                        </span>
                        <br className=" block md:hidden" /> for a Better Life
                    </div>
                    {isAuth && doctorId == "null" ? (
                        <div className=" flex flex-col md:flex-row justify-center items-start gap-2  mt-6 ">
                            <div className=" flex items-center justify-start shadow-lg py-2 px-2 border-b-2  border-perpol rounded-xl w-[300px]">
                                <img
                                    src={search_image}
                                    alt=""
                                    className=" w-5 mx-4 cursor-pointer"
                                    onClick={() => {
                                        if (search.length > 0)
                                            Navigate(`/Search?q=${search}`);
                                    }}
                                />
                                <input
                                    type="text"
                                    className="  text-gray  outline-0  placeholder:text-perpol placeholder:font-light "
                                    placeholder="I have pain in my acetabulum ..."
                                    onChange={handleChangeSearch}
                                />
                            </div>
                            <div className=" pt-2">
                                <div className=" w-2 h-2 bg-green rounded-full"></div>
                                <div className=" text-[12px]">
                                    115 Doctors are
                                </div>
                                <div className=" font-semibold">Online</div>
                            </div>
                        </div>
                    ) : null}
                </div>
                <div>
                    <img src={Hero_img} alt="" className=" w-[300px]" />
                </div>
            </div>
            <div
                className=" bg-perpol flex flex-col md:flex-row items-center justify-center 
            gap-2 py-14"
            >
                <div className=" text-white ml-6 md:ml-0 md:w-[400px] ">
                    <div>The most common in Algeria</div>
                    <div className=" flex items-center gap-2 pt-1 pb-3 text-green text-2xl font-semibold">
                        <img src={trend_up} alt="" className=" w-8" />
                        Popular topics
                    </div>
                    <div className=" text-[14px]">
                        Avoid waiting and crowding in clinics and book with a
                        doctor through Reayah
                    </div>
                </div>
                <div className=" hidden md:flex flex-wrap gap-2 w-[550px]">
                    <div className=" flex flex-wrap gap-2 w-[550px] ">
                        <div className=" px-2  py-1 rounded-lg bg-green h-fit">
                            Heart disease
                        </div>
                        <div className=" px-2  py-1 rounded-lg bg-green h-fit">
                            Mental health
                        </div>
                        <div className=" px-2  py-1 rounded-lg bg-green h-fit">
                            COVID-19
                        </div>
                    </div>
                    <div className="  flex flex-wrap gap-2 w-[550px]">
                        <div className=" px-2  py-1 rounded-lg bg-green h-fit">
                            Exercise and fitness
                        </div>
                        <div className=" px-2  py-1 rounded-lg bg-green h-fit">
                            Cancer
                        </div>
                        <div className=" px-2  py-1 rounded-lg bg-green h-fit">
                            Skin Care
                        </div>
                    </div>
                </div>
                <div className=" flex md:hidden flex-wrap gap-2 w-[320px] ml-6 mt-3">
                    <div className=" flex flex-wrap gap-2 w-[350px] ">
                        <div className=" px-2  py-1 rounded-lg bg-green h-fit">
                            Heart disease
                        </div>
                        <div className=" px-2  py-1 rounded-lg bg-green h-fit">
                            Mental health
                        </div>
                    </div>
                    <div className=" flex flex-wrap gap-2 w-[350px] ">
                        <div className=" px-2  py-1 rounded-lg bg-green h-fit">
                            COVID-19
                        </div>
                        <div className=" px-2  py-1 rounded-lg bg-green h-fit">
                            Exercise and fitness
                        </div>
                    </div>
                    <div className="  flex flex-wrap gap-2 w-[350px]">
                        <div className=" px-2  py-1 rounded-lg bg-green h-fit">
                            Cancer
                        </div>
                        <div className=" px-2  py-1 rounded-lg bg-green h-fit">
                            Skin Care
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
