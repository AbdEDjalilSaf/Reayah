import React from "react";
import Hero from "./Hero";
import Say_Aboutus from "./Say_Aboutus";
function Home() {
    return (
        <div>
            <Hero />
            <div className=" my-10">
                <Say_Aboutus />
            </div>
        </div>
    );
}

export default Home;
