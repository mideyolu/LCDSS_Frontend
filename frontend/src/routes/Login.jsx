// Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormComponent from "../components/FormComponent";
import { login } from "../api/api"; // Import the login function
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { Image } from "antd";
import Cookies from "js-cookie";

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const handleLogin = async (formData) => {
        setLoading(true);
        try {
            const response = await login({
                provider_email: formData.provider_email,
                provider_password: formData.provider_password,
            });

            // Save the token to localStorage
            localStorage.setItem("access_token", response.access_token);
            localStorage.setItem("id", response.provider_id);
            localStorage.setItem("username", response.provider_username.split(" ").pop());

            toast.success("Login successful!");
            navigate("/dashboard");
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
            label: "Email",
            name: "provider_email", // Match backend field
            type: "email",
            placeholder: "Enter your email",
            required: true,
        },
        {
            label: "Password",
            name: "provider_password", // Match backend field
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
                    title="Login"
                    fields={fields}
                    onSubmit={handleLogin}
                    submitButtonText={loading ? <Loader /> : "Login"}
                    redirect={{
                        text: "Don't Have an Account? Signup Here",
                        path: "/signup",
                    }}
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

export default Login;
