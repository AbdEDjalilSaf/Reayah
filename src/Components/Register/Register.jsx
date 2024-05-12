import React from "react";
import { useState } from "react";
import Choose from "./1_Choose";
import EmailVerification from "./2_EmailVerification";
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
    const change_user = (key, value) => {
        setUser({
            ...user,
            [key]: value,
        });
    };
    const [userType_Done, setUserType_Done] = useState(false);
    const Toogle_userType_Done = () => {
        setUserType_Done(true);
    };
    const [EmailVerification_Done, setEmailVerification_Done] = useState(false);
    const Toogle_EmailVerification_Done = () => {
        setUserType_Done(true);
    };
    const [Form_Done, setForm_Done] = useState(false);
    console.log(userType_Done);
    return (
        <div>
            {!userType_Done ? (
                <Choose
                    user={user}
                    change_user={change_user}
                    Toogle_userType_Done={Toogle_userType_Done}
                />
            ) : !EmailVerification_Done ? (
                <EmailVerification
                    user={user}
                    change_user={change_user}
                    Toogle_EmailVerification_Done={
                        Toogle_EmailVerification_Done
                    }
                />
            ) : (
                <div>chopap</div>
            )}
        </div>
    );
}

export default Register;
