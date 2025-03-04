import { Image, Skeleton } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormComponent from "../components/Form/FormComponent";
import Loader from "../components/Loader/Loader";
import { userInfo } from "../hooks/userInfo"; // Import the hook
import { handleLogin } from "../services/auth"; // Import auth functions

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(true); // Track image loading
    const { setFullname, setUsername, setEmail } = userInfo(); // Use the hook inside the component

    const formFields = [
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
                    title="Login"
                    fields={formFields}
                    onSubmit={(formData) =>
                        handleLogin(
                            formData,
                            setLoading,
                            navigate,
                            setFullname,
                            setUsername,
                            setEmail,
                        )
                    }
                    submitButtonText={loading ? <Loader /> : "Login"}
                    redirect={{
                        text: "Don't Have an Account? Signup Here",
                        path: "/signup",
                    }}
                />
            </div>

            {/* Image with Skeleton Loader */}
            <div className="lg:flex-[45%] w-full hidden md:block">
                {imageLoading && (
                    <Skeleton.Image active className="w-full h-[300px]" />
                )}
                <Image
                    src="/login.png"
                    alt="Login Illustration"
                    preview={false}
                    className={`${imageLoading ? "hidden" : "block"} w-full`}
                    onLoad={() => setImageLoading(false)} // Hide Skeleton when image loads
                />
            </div>
        </div>
    );
};

export default Login;
