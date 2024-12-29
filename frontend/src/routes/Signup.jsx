// Signup.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormComponent from "../components/FormComponent";
import { signup } from "../api/api"; // Import the signup API function
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { Image } from "antd";

const Signup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const handleSignup = async (formData) => {
        setLoading(true);
        try {
            const response = await signup({
                provider_username: formData.provider_username,
                provider_email: formData.provider_email,
                provider_password: formData.provider_password,
            });

            toast.success("Signup successful!");

            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (error) {
            if (error.response) {
                console.error(
                    "Error occurred:",
                    JSON.stringify(error.response.data, null, 2),
                );
                toast.error(error.response.data.detail || "Login failed!");
            } else {
                console.error(
                    "Error occurred:",
                    error.message || "Unknown error",
                );
                toast.error("Something went wrong!");
            }
        } finally {
            setLoading(false);
        }
    };

    const fields = [
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

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen flex flex-col justify-center md:justify-normal md:flex-row">
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 py-6 sm:mt-12">
                <FormComponent
                    title="Signup"
                    fields={fields}
                    onSubmit={handleSignup}
                    submitButtonText={loading ? <Loader /> : "Register"}
                    redirect={{
                        text: "Already Have an Account? Login Here",
                        path: "/login",
                    }}
                    showTermsAndConditions={true} // Pass the flag here
                />
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center">
                <Image
                    src={"/onboarding.png"}
                    alt="Signup Illustration"
                    className="w-[100%] max-w-sm md:block hidden"
                />
            </div>
        </div>
    );
};

export default Signup;
