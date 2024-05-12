import React from "react";
import { useState } from "react";
import Choose from "./1_Choose";
function Register() {
    // const [step, setStep] = useState(1);
    
    const [user, setUser] = useState({
        Type: "Patient",
        Fitst_Name: "",
        Last_Name: "",
        Phone_Number: "",
        Email: "",
        Password: "",
    });
    const change_user =(key, value)=>{
        setUser({
            ...user,
            [key]: value
        })
    }
    const [userType_Done, setUserType_Done] = useState(false)
    const [EmailVerification_Done, setEmailVerification_Done] = useState(false)
    const [Form_Done, setForm_Done] = useState(false)

    return (
        <div>
            <div>
                <Choose
                    setUserType_Done={setUserType_Done}
                    user={user}
                    change_user={change_user}
                />
            </div>
        </div>
    );
}

export default Register;
