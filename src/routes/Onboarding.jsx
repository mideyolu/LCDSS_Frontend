import { Image, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { FaUser, FaUserShield } from "react-icons/fa"; // Import icons
import { useNavigate } from "react-router-dom";
import ChoiceCard from "../components/Card/ChoiceCard";
import Loader from "../components/Loader/Loader";

const Onboarding = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const loginPage = () => {
        navigate("/login");
    };
    const signupPage = () => {
        navigate("/signup");
    };

    const handleBackToHome = () => {
        navigate("/");
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="onboarding min-h-screen flex md:flex-row">
            {/* Left Section */}
            <div className="left w-full md:w-1/2 flex flex-col justify-center px-8 py-6">
                <Typography.Title
                    level={4}
                    className="text-gray-800 font-bold mb-6 text-center md:text-left"
                    style={{
                        fontFamily: "Robotto",
                    }}
                >
                    Choose Your Option
                </Typography.Title>

                <div className="cursor-pointer grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Using ChoiceCard component */}
                    <ChoiceCard
                        icon={
                            <FaUser className="text-blue-gray-900 text-2xl" />
                        }
                        title="Signup"
                        paragraph={"Create your account"}
                        onClick={signupPage}
                    />
                    <ChoiceCard
                        icon={
                            <FaUserShield className="text-blue-gray-900 text-2xl" />
                        }
                        title="Login"
                        paragraph={"Sign-in to your account"}
                        onClick={loginPage}
                    />
                </div>

                <span
                    className="mt-[2.7rem] md:mt-4 text-sm absolute cursor-pointer left-[55%] top-[80%]"
                    onClick={handleBackToHome}
                >
                    Home
                </span>
            </div>

            {/* Right Section */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center py-6 sm:bg-transparent">
                <Image
                    src="/onboarding1.png"
                    alt="Onboarding Illustration"
                    className="w-[40%] max-w-sm md:block hidden"
                />
            </div>
        </div>
    );
};

export default Onboarding;
