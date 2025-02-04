// src/routes/Signup.js

import { Image } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormComponent from "../components/Form/FormComponent";
import Loader from "../components/Loader/Loader";
import { handleSignup } from "../services/auth"; // Import the auth function

const Signup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const formFields = [
        {
            label: "Username",
            name: "provider_username",
            type: "text",
            placeholder: "Enter your username",
            required: true,
        },
        {
            label: "Email",
            name: "provider_email",
            type: "email",
            placeholder: "Enter your email",
            required: true,
        },
        {
            label: "Password",
            name: "provider_password",
            type: "password",
            placeholder: "Enter your password",
            required: true,
        },
    ];

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="lg:flex-[55%]">
                <FormComponent
                    title="Signup"
                    fields={formFields}
                    onSubmit={(formData) =>
                        handleSignup(formData, setLoading, navigate)
                    }
                    submitButtonText={loading ? <Loader /> : "Register"}
                    redirect={{
                        text: "Already Have an Account? Login Here",
                        path: "/login",
                    }}
                />
            </div>
            <div className="lg:flex-[45%] w-full">
                <Image
                    src="/signup.png"
                    alt="Signup Illustration"
                    className="w-full max-w-sm hidden md:block"
                />
            </div>
        </div>
    );
};

export default Signup;
