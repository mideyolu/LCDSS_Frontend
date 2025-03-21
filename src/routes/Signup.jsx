import { Image, Skeleton } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormComponent from "../components/Form/FormComponent";
import Loader from "../components/Loader/Loader";
import { handleSignup } from "../services/auth"; // Import the auth function

const Signup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(true); // Track image loading

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
        <div className="flex items-center justify-center min-h-screen px-6 md:px-16">
            <div className="w-full md:w-[60%] flex flex-col justify-center items-center lg:flex-[55%]">
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

            {/* Image Section */}
            <div className="hidden md:flex md:flex-[35%] lg:flex-[45%] w-full items-center justify-center">
                {imageLoading && (
                    <Skeleton.Image
                        active
                        className="w-full max-w-sm h-[300px] hidden md:block"
                    />
                )}
                <Image
                    src="/signup.png"
                    alt="Signup Illustration"
                    preview={false}
                    className={`${
                        imageLoading ? "hidden" : "block"
                    } w-full max-w-sm`}
                    onLoad={() => setImageLoading(false)} // Hide Skeleton when image loads
                />
            </div>
        </div>
    );
};

export default Signup;
