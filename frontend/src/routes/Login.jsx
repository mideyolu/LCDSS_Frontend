import { Image } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../api/api";
import FormComponent from "../components/FormComponent";
import Loader from "../components/Loader";
import { userInfo } from "../hooks/userInfo"; // Import your custom hook

const Login = () => {
    const navigate = useNavigate();
    const { setFullname, setUsername, setEmail } = userInfo(); // Use the hook
    const [loading, setLoading] = useState(false);

    const handleLogin = async (formData) => {
        setLoading(true);
        try {
            const response = await login({
                provider_email: formData.provider_email,
                provider_password: formData.provider_password,
            });

            localStorage.setItem("access_token", response.access_token);
            localStorage.setItem("id", response.provider_id);
            localStorage.setItem("fullname", response.provider_username);
            localStorage.setItem("email", response.provider_email);
            localStorage.setItem(
                "username",
                response.provider_username.split(" ").pop(),
            );

            setFullname(response.provider_username); // Set user info using the hook
            setUsername(response.provider_username.split(" ").pop());
            setEmail(response.provider_email);

            toast.success("Login successful!");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error:", error);
            toast.error(error.response?.data?.detail || "Login failed!");
        } finally {
            setLoading(false);
        }
    };

    const fields = [
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
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-6">
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
            <div className="w-full md:w-1/2 flex justify-center">
                <Image
                    src="/login.png"
                    alt="Login Illustration"
                    className="w-full max-w-sm hidden md:block"
                />
            </div>
        </div>
    );
};

export default Login;
