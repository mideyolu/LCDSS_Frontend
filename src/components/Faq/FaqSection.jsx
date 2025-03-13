import { Collapse, Typography } from "antd";
import React from "react";
import { faqData } from "../../utils/faq";

const FaqSection = ({ faqRef }) => {
    const { Panel } = Collapse;
    const { Title } = Typography;

    return (
        <section
            ref={faqRef}
            className=" my-12 md:my-[4rem] flex flex-col md:flex-row items-center justify-between min-h-[60vh] mx-[1.2rem] gap-8 py-3"
        >
            {/* Left Side */}
            <div className="left w-full md:w-[35%] flex flex-col items-start">
                <Title level={2} className="text-blue-900 font-bold">
                    Explore Respirix
                </Title>
                <p className="text-gray-600 text-lg leading-7">
                    Here are some of the most commonly asked questions about our
                    system.
                </p>
            </div>

            {/* Right Side - FAQ Section */}
            <div className="w-full md:w-[60%]">
                <Title level={3} className="text-center mb-6">
                    Frequently Asked Questions
                </Title>
                <Collapse
                    accordion
                    className="max-w-[800px] mx-auto bg-gray-50 border-none"
                >
                    {faqData.map((faq, index) => (
                        <Panel
                            header={faq.question}
                            key={index}
                            className="bg-white text-gray-800 rounded-md mb-2 shadow-md"
                        >
                            <p className="text-[0.95rem] leading-6">
                                {faq.answer}
                            </p>
                        </Panel>
                    ))}
                </Collapse>
            </div>
        </section>
    );
};

export default FaqSection;
