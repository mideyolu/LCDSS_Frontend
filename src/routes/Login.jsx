import { Image, Skeleton } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormComponent from "../components/Form/FormComponent";
import Loader from "../components/Loader/Loader";
import { handleLogin } from "../services/auth";
import { userInfo } from "../hooks/userInfo"; // Ensure this hook returns setFullname, setUsername, and setEmail

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    const { setFullname, setUsername, setEmail } = userInfo();

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
        <div className="flex items-center justify-center min-h-screen px-6 md:px-16">
            <div className="w-full md:w-[60%] flex flex-col justify-center items-center lg:flex-[55%]">
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
                    changePasswordRedirect={{
                        text: "Change Password",
                        path: "/change-password",
                    }}
                />
            </div>

            {/* Image Section */}
            <div className="hidden md:flex md:flex-[35%] lg:flex-[45%] w-full items-center justify-center">
                {imageLoading && (
                    <Skeleton.Image
                        active
                        className="w-full h-[300px] hidden md:block"
                    />
                )}
                <Image
                    src="/login.png"
                    alt="Login Illustration"
                    preview={false}
                    className={`${imageLoading ? "hidden" : "block"} w-full`}
                    onLoad={() => setImageLoading(false)}
                />
            </div>
        </div>
    );
};

export default Login;
