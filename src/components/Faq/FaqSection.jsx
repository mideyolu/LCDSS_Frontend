import { Collapse, Skeleton } from "antd";
import React, { useState, useEffect } from "react";
import { faqData } from "../../utils/faq";
import {
    CustomPanel,
    CustomParagraph,
    CustomTitle,
} from "../Typography/CustomTypography";

const FaqSection = ({ faqRef }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a loading state (e.g., fetching data)
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section
            ref={faqRef}
            className="py-10 flex flex-col md:flex-row items-center justify-between min-h-[60vh] mx-[1.2rem] gap-8 px-6 md:px-16"
        >
            {/* Left Side */}
            <div className="left w-full md:w-[35%] flex flex-col items-start">
                {loading ? (
                    <>
                        <Skeleton.Input active className="w-40 h-6 mb-2" />
                        <Skeleton paragraph={{ rows: 2 }} active />
                    </>
                ) : (
                    <>
                        <CustomTitle>Explore Respirix</CustomTitle>
                        <CustomParagraph className="text-gray-600 text-lg leading-7">
                            Here are some of the most commonly asked questions
                            about our system.
                        </CustomParagraph>
                    </>
                )}
            </div>

            {/* Right Side - FAQ Section */}
            <div className="w-full md:w-[60%]">
                {loading ? (
                    <>
                        <Skeleton.Input active className="w-60 h-6 mb-4" />
                        <Skeleton paragraph={{ rows: 3 }} active />
                        <Skeleton
                            paragraph={{ rows: 2 }}
                            active
                            className="mt-3"
                        />
                    </>
                ) : (
                    <>
                        <CustomTitle className="text-center mb-6">
                            Frequently Asked Questions
                        </CustomTitle>
                        <Collapse
                            accordion
                            className="max-w-[800px] md:max-w-[400px] lg:max-w-[800px] mx-auto bg-gray-50 border-none"
                        >
                            {faqData.map((faq, index) => (
                                <CustomPanel
                                    header={faq.question}
                                    key={index}
                                    className="bg-white text-gray-800 rounded-md mb-2 shadow-md"
                                >
                                    <CustomParagraph className="leading-6">
                                        {faq.answer}
                                    </CustomParagraph>
                                </CustomPanel>
                            ))}
                        </Collapse>
                    </>
                )}
            </div>
        </section>
    );
};

export default FaqSection;
