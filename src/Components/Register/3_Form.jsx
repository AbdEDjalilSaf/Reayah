import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import handleRegister from "./Post_Register";
import Swal from "sweetalert2";
import Axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router";
async function handleRegister(values, user, { setSubmitting }) {
    try {
        let response = null;
        if (user.Type == "Patient") {
            response = await Axios.post(
                "https://api.reayahmed.com/auth/sign_up/patient/",
                {
                    first_name: values.FirstName,
                    last_name: values.LastName,
                    email: values.Email,
                    password: values.Password,
                },
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
        } else if (user.Type == "Doctor") {
            response = await Axios.post(
                "https://api.reayahmed.com/auth/sign_up/doctor/",
                {
                    first_name: values.FirstName,
                    last_name: values.LastName,
                    email: values.Email,
                    password: values.Password,
                },
                {
                    withCredentials: true,
                    // validateStatus: () => true,
                }
            );
        }
        console.log("response from server : ", response);
        // Swal.fire("Done!", "Account Created Successfully", "success");
        window.location.href = "/";
        // try {
        //     let Login_response = await Axios.post(
        //         "http://localhost:3000/Login",
        //         values,
        //         {
        //             withCredentials: true,
        //             validateStatus: () => true,
        //         }
        //     );
        //     if (Login_response.status == 200) {
        //         // Navigate("/Profile");
        //         Swal.fire("Done!", "Account Login Successfully", "success");
        //         // window.location.href = "/Profile";
        //     } else {
        //         // window.location.href = "/Login";
        //         Swal.fire(
        //             "Error!",
        //             "Username or Password isn't correct",
        //             "error"
        //         );
        //         // Navigate("/Login");
        //     }
        //     } catch (error) {
        //         console.log("error ducring regestration : ", error);
        //         Swal.fire("Error!", "Something Went Wrong", "error");
        //         // window.location.href = "/Login";
        //     }
        //     Swal.fire("Done!", "Account Created Successfully", "success");
        // } else if (response.status == 400) {
        //     Swal.fire("Error", `${response.data.message} `, "error");
        // } else if (response.status == 409) {
        //     Swal.fire("Error!", `${response.data.message} `, "error");
        // } else if (response.status == 500) {
        //     Swal.fire("Error!", `Internal Server Error   `, "error");
        // } else if (response.status == 429) {
        //     Swal.fire(
        //         "Error!",
        //         `Too many requests ,try again latter\n  `,
        //         "error"
        //     );
        // } else {

        //     Swal.fire(
        //         "Error!",
        //         `Something Went Wrong ,please trye again latter, ${response.data.message} `,
        //         "error"
        //     );
        // }
    } catch (error) {
        console.log("response from server : ", error);
        Swal.fire("Error!", `Something Went Wrong .`, "error");
    }
    setSubmitting(false);
}

function Form_component({ user, change_user, Toogle_Form_Done }) {
    return (
        <div className=" flex flex-col md:flex-row justify-center  items-center gap-6 pt-28">
            <div className=" w-[300px] text-2xl font-semibold ">
                <div className=" text-green text-center md:text-start ">
                    Hi {user.Type == "Patient" ? "Patient" : "Doctor"}
                </div>
                <div className=" text-perpol">
                    Expand your reach. Connect with <br />
                    new patients.{" "}
                </div>
            </div>
            <div className=" flex items-center justify-center">
                <Formik
                    initialValues={{
                        FirstName: "",
                        LastName: "",
                        Email: user.Email,
                        Password: "",
                        Confirm_Password: "",
                    }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.FirstName) {
                            errors.FirstName = "First Name is Required";
                        }
                        if (!values.LastName)
                            errors.LastName = "Last Name is Required";
                        if (!values.Password) {
                            errors.Password = "Password is Required";
                        } else if (values.Password.length < 8) {
                            errors.Password =
                                "Password must be at least 8 characters long";
                        }
                        if (!values.Confirm_Password)
                            errors.Confirm_Password =
                                "Please Confirm your Password";
                        if (values.Password != values.Confirm_Password)
                            errors.Confirm_Password =
                                "Passwords Does not match";
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        handleRegister(values, user, { setSubmitting });
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="  flex flex-col text-sm md:text-lg  gap-10 text-black_text">
                            <div className=" flex items-center justify-center gap-4 w-full ">
                                <div className=" w-[50%] relative">
                                    <div className="  font-semibold text-sm pb-1">
                                        First Name
                                    </div>
                                    <Field
                                        placeholder="Prénom"
                                        type="text"
                                        name="FirstName"
                                        disabled={isSubmitting}
                                        className="w-full border border-gray_white px-4 py-2 rounded-lg  text-sm "
                                    />
                                    <ErrorMessage
                                        name="FirstName"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>
                                <div className="  w-[50%] relative">
                                    <div className="font-semibold text-sm pb-1">
                                        Last Name
                                    </div>
                                    <Field
                                        placeholder="Nom de famille"
                                        type="text"
                                        name="LastName"
                                        disabled={isSubmitting}
                                        className="border border-gray_white px-4 py-2 rounded-lg  text-sm  w-full"
                                    />
                                    <ErrorMessage
                                        name="LastName"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>
                            </div>

                            <div className=" relative">
                                <div className=" font-semibold text-sm pb-1">
                                    Password{" "}
                                </div>
                                <div className=" flex items-center">
                                    <Field
                                        placeholder="•••••••••••••••••••"
                                        type="text"
                                        name="Password"
                                        disabled={isSubmitting}
                                        className="border border-gray_white px-4 py-2  rounded-lg text-sm  w-full"
                                    />
                                </div>

                                <ErrorMessage
                                    name="Password"
                                    component="div"
                                    style={errorInputMessage}
                                />
                            </div>
                            <div className=" relative">
                                <div className=" font-semibold text-sm pb-1">
                                    Re-enter your password{" "}
                                </div>
                                <Field
                                    placeholder="example.google@gmail.com"
                                    type="text"
                                    name="Confirm_Password"
                                    disabled={isSubmitting}
                                    className="border border-gray_white px-4 py-2 rounded-lg  text-sm  w-full"
                                />
                                <ErrorMessage
                                    name="Confirm_Password"
                                    component="div"
                                    style={errorInputMessage}
                                />
                            </div>
                            {isSubmitting ? (
                                <span className="small-loader my-5  w-full m-auto"></span>
                            ) : (
                                <button
                                    type="submit"
                                    className=" bg-perpol w-fit m-auto px-4 py-2 mt-4 rounded-2xl text-white font-semibold "
                                    disabled={isSubmitting}
                                >
                                    Get Started
                                </button>
                            )}
                        </Form>
                    )}
                </Formik>
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
export default Form_component;
