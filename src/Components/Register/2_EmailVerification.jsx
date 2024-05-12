import React from "react";
import { Link } from "react-router-dom";
function EmailVerification() {
    return (
        <div className=" flex flex-col md:flex-row justify-center  items-center gap-6 pt-6">
            <div className=" w-[300px] text-2xl font-semibold ">
                <div className=" text-green text-center md:text-start ">Welcome</div>
                <div className=" text-perpol">
                    Before we begin We need to check if you have an account
                </div>
            </div>
            <div className=" flex flex-col ">
                <div>
                    
                        <div className=" pb-1 pl-2 text-lg font-semibold text-gray">
                            Email Adress
                        </div>
                        <input
                            className="  text-md text-black_text border-2 border-perpol bg-perpol bg-opacity-15 rounded-lg p-2 w-[300px]"
                            type="email"
                        />
                    

                    <div className=" text-sm text-gray text-center pt-4">
                        Already have an account?{" "}
                        <Link className="text-green " to={"/Login"}>
                            Log In
                        </Link>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default EmailVerification;
