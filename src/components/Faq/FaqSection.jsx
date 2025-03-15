import { Collapse } from "antd";
import React from "react";
import { faqData } from "../../utils/faq";
import {
    CustomPanel,
    CustomParagraph,
    CustomTitle,
} from "../Typography/CustomTypography";

const FaqSection = ({ faqRef }) => {
    return (
        <section
            ref={faqRef}
            className=" py-10 flex flex-col md:flex-row items-center justify-between min-h-[60vh] mx-[1.2rem] gap-8  px-6 md:px-16"
        >
            {/* Left Side */}
            <div className="left w-full md:w-[35%] flex flex-col items-start">
                <CustomTitle>Explore Respirix</CustomTitle>
                <CustomParagraph className="text-gray-600 text-lg leading-7">
                    Here are some of the most commonly asked questions about our
                    system.
                </CustomParagraph>
            </div>

            {/* Right Side - FAQ Section */}
            <div className="w-full md:w-[60%]">
                <CustomTitle className="text-center mb-6">
                    Frequently Asked Questions
                </CustomTitle>
                <Collapse
                    accordion
                    className="max-w-[800px] md:max-w-[400px] lg:max-w-[600px] mx-auto bg-gray-50 border-none"
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
            </div>
        </section>
    );
};

export default FaqSection;
