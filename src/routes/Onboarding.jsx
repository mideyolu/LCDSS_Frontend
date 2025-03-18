import { Image, Typography, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { FaUser, FaUserShield } from "react-icons/fa"; // Import icons
import { useNavigate } from "react-router-dom";
import ChoiceCard from "../components/Card/ChoiceCard";
import Loader from "../components/Loader/Loader";

const Onboarding = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState(true); // Track image loading

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
        <div className="onboarding min-h-screen flex md:flex-row px-6 md:px-16">
            {/* Left Section */}
            <div className="left w-full md:w-1/2 flex flex-col justify-center px-8 py-6">
                {loading ? (
                    <Skeleton.Input active className="w-40 h-6 mb-6" />
                ) : (
                    <Typography.Title
                        level={4}
                        className="text-gray-800 font-bold mb-6 text-center md:text-left"
                    >
                        Choose Your Option
                    </Typography.Title>
                )}

                <div className="cursor-pointer flex flex-col md:flex-row py-10 gap-[3rem]">
                    {loading ? (
                        <>
                            <Skeleton.Button active className="w-40 h-16" />
                            <Skeleton.Button active className="w-40 h-16" />
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                </div>

                {loading ? (
                    <Skeleton.Input active className="w-20 h-5 mt-6" />
                ) : (
                    <span
                        className="mt-[2.7rem] md:mt-4 text-sm absolute cursor-pointer left-[55%] top-[80%]"
                        onClick={handleBackToHome}
                    >
                        Home
                    </span>
                )}
            </div>

            {/* Right Section with Skeleton Loader */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center py-6 sm:bg-transparent">
                {imageLoading && (
                    <Skeleton.Image
                        active
                        className="w-[40%] max-w-sm h-[250px]"
                    />
                )}
                <Image
                    src="/onboarding1.png"
                    alt="Onboarding Illustration"
                    preview={false}
                    className={`${
                        imageLoading ? "hidden" : "block"
                    } w-[40%] max-w-sm`}
                    onLoad={() => setImageLoading(false)} // Hide Skeleton when image loads
                />
            </div>
        </div>
    );
};

export default Onboarding;
