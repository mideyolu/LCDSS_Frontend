import { Button, Image, Skeleton, Typography } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
    const { Title, Paragraph } = Typography;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // State to track image loading

    const reDirect = () => {
        navigate("/onboarding");
    };

    return (
        <section className=" mt-[4rem] md:mt-0 min-h-[70vh] md:min-h-screen flex items-center justify-center md:justify-between mx-[1.2rem]">
            <section className="mt-2">
                <Title level={1} className="mb-8">
                    Seamless AI-Powered
                    <span className="text-blue-800 mb-[1rem] block">
                        Lung Cancer
                    </span>
                    Detection System!{" "}
                </Title>
                <Paragraph className="mt-[1.5rem] text-[0.85rem]">
                    Streamline Lung Cancer Diagnosis with a platform powered by{" "}
                    <span className="text-blue-800">AI!</span>
                </Paragraph>
                <Button
                    onClick={reDirect}
                    className="mt-[1.5rem] py-[1.5rem] shadow-lg"
                    variant="solid"
                    color="primary"
                >
                    Get Started
                </Button>
            </section>

            {/* Image with Skeleton Loading Effect */}
            <section className="hidden md:flex md:w-[40%] lg:w-[50%] items-center justify-center">
                {loading && (
                    <Skeleton.Image active className="w-[80%] h-[250px]" />
                )}

                <Image
                    src="/home.png"
                    alt="Home.jpg"
                    className={`w-[80%] object-contain shadow-sm p-1 ${
                        loading ? "hidden" : "block"
                    }`}
                    preview={false}
                    onLoad={() => setLoading(false)} // Hide Skeleton when image loads
                />
            </section>
        </section>
    );
};

export default HeroSection;
