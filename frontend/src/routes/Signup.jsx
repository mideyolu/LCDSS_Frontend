import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormComponent from "../components/FormComponent";
// import { loginAdmin } from "../../api/api";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { Image } from "antd";

const Signup = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const handleLogin = async (formData) => {
        try {
            // const response = await loginAdmin({
            //     username: formData.username,
            //     password: formData.password,
            // });

            // localStorage.setItem("token", response.data.access_token); // Save JWT token
            // localStorage.setItem("username", formData.username); // Save username
            // localStorage.setItem("role", "admin"); // Save role as admin

            toast.success("Login Successful!");

            // Wait for 2 seconds before navigating to the dashboard
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            toast.error("Login Failed: Invalid credentials");
        }
    };

    const fields = [
        {
            label: "Username",
            name: "username",
            type: "text",
            placeholder: "Enter your username",
            required: true,
        },
        {
            label: "Email",
            name: "email",
            type: "eamil",
            placeholder: "Enter your email",
            required: true,
        },
        {
            label: "Password",
            name: "password",
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
                    onSubmit={handleLogin}
                    submitButtonText="Register"
                    redirect={{
                        text: "Already Have an Account? Login Here",
                        path: "/login",
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

export default Signup;
