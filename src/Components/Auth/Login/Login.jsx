import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import handleLogin from "./Post_Register";
import Swal from "sweetalert2";
import Axios from "axios";
import { Link } from "react-router-dom";
import Facbook_icon from "../../../../public/icons/facebook.png";
import Google_icon from "../../../../public/icons/google.png";
import { useAppContext } from "../../../AppContext";
async function handleLogin(values, store_login, set_Auth, { setSubmitting }) {
    try {
        let response = await Axios.post(
            "https://api.reayahmed.com/auth/custom_token/",
            {
                username: values.Email,
                password: values.Password,
            },
            {
                withCredentials: true,
                // validateStatus: () => true,
            }
        );

        console.log("response from server : ", response);
        Swal.fire("Done!", "Logged in successfully", "success");
        store_login(
            response.data.user_id,
            response.data.patient_id,
            response.data.doctor_id
        );
        set_Auth(true);
        // window.location.href = "/";
    } catch (error) {
        console.log("response from server : ", error);
        Swal.fire("Error!", `Something Went Wrong .`, "error");
    }
    setSubmitting(false);
}

function Login() {
    const { isAuth, set_Auth, store_login } = useAppContext();
    return (
        <div className=" flex flex-col md:flex-row justify-center  items-center md:items-start md:gap-6">
            <div className=" w-[250px] lg:w-[300px] text-2xl font-semibold py-6  md:py-28 text-center md:text-start">
                <div className=" text-green text-center md:text-start ">
                    Welcome Back
                </div>
                <div className=" text-perpol">
                    We take your privacy very seriously.
                </div>
            </div>
            <div className=" w-fit flex flex-col items-center justify-center pb-6 md:pb-0">
                <div className="text-gray md:pt-6 pb-6 md:pb-16 text-3xl font-semibold">
                    Sign in
                </div>
                <Formik
                    initialValues={{
                        Email: "",
                        Password: "",
                    }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.Email) errors.Email = "Email is Required";
                        else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                values.Email
                            )
                        ) {
                            errors.Email = "Invalid email address";
                        }
                        if (!values.Password) {
                            errors.Password = "Password is Required";
                        } else if (values.Password.length < 8) {
                            errors.Password =
                                "Password must be at least 8 characters long";
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        handleLogin(values, store_login, set_Auth, {
                            setSubmitting,
                        });
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className=" px-6 md:px-0 flex flex-col text-sm md:text-base  gap-10 text-black_text">
                            <div className=" relative w-[350px] ">
                                <div className=" font-semibold  pb-1">
                                    Email{" "}
                                </div>
                                <Field
                                    // placeholder="example.google@gmail.com"
                                    type="text"
                                    name="Email"
                                    disabled={isSubmitting}
                                    className="border-2  px-4 py-2  bg-perpol bg-opacity-25 border-perpol rounded-lg   w-full"
                                />
                                <ErrorMessage
                                    name="Email"
                                    component="div"
                                    style={errorInputMessage}
                                />
                            </div>
                            <div className=" relative w-[350px] ">
                                <div className=" font-semibold  pb-1">
                                    Password{" "}
                                </div>
                                <div className=" flex items-center">
                                    <Field
                                        // placeholder="•••••••••••••••••••"
                                        type="text"
                                        name="Password"
                                        disabled={isSubmitting}
                                        className="border-2  px-4 py-2  bg-perpol bg-opacity-25 border-perpol rounded-lg   w-full"
                                    />
                                </div>

                                <ErrorMessage
                                    name="Password"
                                    component="div"
                                    style={errorInputMessage}
                                />
                            </div>

                            {isSubmitting ? (
                                <span className="small-loader mt-4 mb-2  w-full m-auto"></span>
                            ) : (
                                <button
                                    type="submit"
                                    className=" bg-perpol w-fit m-auto px-4 py-2  rounded-2xl text-white font-semibold "
                                    disabled={isSubmitting}
                                >
                                    Login
                                </button>
                            )}
                        </Form>
                    )}
                </Formik>
                <div className=" font-semibold text-gray py-3">
                    Don't Have an Account ? {" "}
                    <Link to={"/Register"} className=" text-green">
                        SignUp
                    </Link>
                </div>
                <div className=" pt-3 flex flex-col items-center justify-center ">
                    <div className=" pb-6">OR</div>
                    <div className=" cursor-not-allowed w-[300px] mb-4 px-2 py-1 rounded-lg border border-gray text-gray flex items-center justify-center gap-6 ">
                        <img
                            src={Google_icon}
                            alt=""
                            className="  object-cover w-6"
                        />
                        Continue with Google
                    </div>
                    <div className="cursor-not-allowed w-[300px] px-2 py-1 border  rounded-lg bg-[#0047FF]  text-white flex items-center justify-center gap-2 ">
                        <img
                            src={Facbook_icon}
                            alt=""
                            className="  object-cover w-6"
                        />
                        Continue with Facebook{" "}
                    </div>
                </div>
                <div className=" text-sm py-8 px-6">
                    By creating account you agree to our{" "}
                    <span className=" text-perpol">Terms of Service</span> and{" "}
                    <span className=" text-perpol">Privacy Policy.</span>
                </div>
            </div>
        </div>
    );
}
const errorInputMessage = {
    position: "absolute",
    bottom: "-22px",
    left: "5px",
    fontSize: "12px",
    color: "red",
};
export default Login;
