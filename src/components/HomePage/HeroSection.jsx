import { Image, Skeleton } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    CustomButton,
    CustomParagraph,
    CustomSubtitle,
    CustomTitle,
} from "../Typography/CustomTypography";

const HeroSection = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating a loading delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const reDirect = () => navigate("/onboarding");

    return (
        <div className="pt-20 min-h-[85vh] md:min-h-[60vh] lg:min-h-[80vh] flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-16 gap-[1rem]">
            {/* Left Section - Text */}
            <div className="text-center mt-[3rem] md:mt-0 md:text-left md:w-1/2">
                {loading ? (
                    <>
                        <Skeleton.Input active className="w-[80%] h-10 mb-4" />
                        <Skeleton.Input active className="w-[60%] h-6 mb-4" />
                        <Skeleton.Input active className="w-[90%] h-6 mb-6" />
                    </>
                ) : (
                    <>
                        <CustomTitle className="!leading-tight">
                            Seamless AI-Powered
                            <CustomSubtitle
                                className="my-[0.4rem]"
                                color={"blue"}
                            >
                                <span className="text-[1.2rem]">
                                    Lung Cancer
                                </span>
                            </CustomSubtitle>
                            Detection System
                        </CustomTitle>
                        <CustomParagraph className="text-base max-w-lg">
                            Fast, accurate, and early detection of lung cancer
                            using deep learning technology.
                        </CustomParagraph>
                    </>
                )}

                {/* Button Section */}
                <div className="mt-6 flex flex-col justify-center md:justify-normal sm:flex-row items-center gap-4">
                    {loading ? (
                        <Skeleton.Button active className="w-40 h-10" />
                    ) : (
                        <CustomButton
                            type="primary"
                            size="large"
                            className="py-[1.5rem] shadow-lg outline-none hover:border-b-[#32de84]"
                            onClick={reDirect}
                        >
                            Get Started
                        </CustomButton>
                    )}
                </div>
            </div>

            {/* Right Section - Image */}
            <div className="md:w-3/4 flex justify-center">
                {loading ? (
                    <Skeleton.Image active className="w-[80%] h-[250px]" />
                ) : (
                    <Image
                        src="/home.png"
                        alt="Home.jpg"
                        className="shadow-sm w-full object-contain max-w-[300px] sm:max-w-[350px] md:max-w-[550px] h-auto"
                        preview={false}
                    />
                )}
            </div>
        </div>
    );
};

export default HeroSection;
