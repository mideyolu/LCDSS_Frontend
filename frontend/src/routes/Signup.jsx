// // Signup.jsx
// import { Image } from "antd";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { signup } from "../api/api"; // Import the signup API function
// import FormComponent from "../components/FormComponent";
// import Loader from "../components/Loader";

// const Signup = () => {
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);

//     const handleSignup = async (formData) => {
//         setLoading(true);
//         try {
//             const response = await signup({
//                 provider_username: formData.provider_username,
//                 provider_email: formData.provider_email,
//                 provider_password: formData.provider_password,
//             });

//             toast.success("Signup successful!");

//             setTimeout(() => {
//                 navigate("/login");
//             }, 1500);
//         } catch (error) {
//             if (error.response) {
//                 console.error(
//                     "Error occurred:",
//                     JSON.stringify(error.response.data, null, 2),
//                 );
//                 toast.error(error.response.data.detail || "Login failed!");
//             } else {
//                 console.error("Error occurred:", error || "Unknown error");

//                 toast.error(`${error}`);
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     const fields = [
//         {
//             label: "Username",
//             name: "provider_username",
//             type: "text",
//             placeholder: "Enter your username",
//             required: true,
//         },
//         {
//             label: "Email",
//             name: "provider_email",
//             type: "email",
//             placeholder: "Enter your email",
//             required: true,
//         },
//         {
//             label: "Password",
//             name: "provider_password",
//             type: "password",
//             placeholder: "Enter your password",
//             required: true,
//         },
//     ];

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setLoading(false);
//         }, 1000);

//         return () => clearTimeout(timer);
//     }, []);

//     if (loading) {
//         return <Loader />;
//     }

//     return (
//         <div className="min-h-screen flex flex-col justify-center md:justify-normal md:flex-row">
//             <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 py-6 sm:mt-12">
//                 <FormComponent
//                     title="Signup"
//                     fields={fields}
//                     onSubmit={handleSignup}
//                     submitButtonText={loading ? <Loader /> : "Register"}
//                     redirect={{
//                         text: "Already Have an Account? Login Here",
//                         path: "/login",
//                     }}
//                     showTermsAndConditions={true} // Pass the flag here
//                 />
//             </div>

//             <div className="w-full md:w-1/2 flex items-center justify-center">
//                 <Image
//                     src={"/signup.png"}
//                     alt="Signup Illustration"
//                     className="w-[100%] max-w-sm md:block hidden"
//                 />
//             </div>
//         </div>
//     );
// };

// export default Signup;




import { Image } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signup } from "../api/api";
import FormComponent from "../components/FormComponent";
import Loader from "../components/Loader";

const Signup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSignup = async (formData) => {
        setLoading(true);
        try {
            await signup({
                provider_username: formData.provider_username,
                provider_email: formData.provider_email,
                provider_password: formData.provider_password,
            });

            toast.success("Signup successful!");
            setTimeout(() => navigate("/login"), 1500);
        } catch (error) {
            console.error("Error:", error);
            toast.error(error.response?.data?.detail || "Signup failed!");
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

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-6">
                <FormComponent
                    title="Signup"
                    fields={fields}
                    onSubmit={handleSignup}
                    submitButtonText={loading ? <Loader /> : "Register"}
                    redirect={{
                        text: "Already Have an Account? Login Here",
                        path: "/login",
                    }}
                />
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
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
