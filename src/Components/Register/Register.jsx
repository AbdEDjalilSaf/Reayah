import React from 'react'
import ImageLoader from '../ImageLoader'
import image from "../../../public/Logo.svg";
import Doctore from "../../../public/Register/Doctore.png";
import Patient from "../../../public/Register/Patient.png";
function Register() {
    return (
        <div className=" w-screen h-screen bg-red-600 ">
            <div className=" w-60 h-60 bg-blue-500">
                <ImageLoader src={Doctore} />
            </div>
        </div>
    );
}

export default Register