

import { Collapse, Typography } from "antd";
import React from "react";
import { faqData } from "../utils/faq";

const FaqSection = () => {
    const { Panel } = Collapse;
    const { Title } = Typography;
    return (
        <section
            className="min-h-screen"
            style={{
                fontFamily: "Robotto",
            }}
        >
            <Title
                level={3}
                style={{
                    fontFamily: "Robotto",
                }}
                className="text-center mb-6"
            >
                Frequently Asked Questions
            </Title>
            <Collapse
                accordion
                className="max-w-[800px] mx-auto"
                style={{
                    fontFamily: "Robotto",
                }}
            >
                {faqData.map((faq, index) => (
                    <Panel header={faq.question} key={index}>
                        <p className="text-[0.95rem] leading-6">{faq.answer}</p>
                    </Panel>
                ))}
            </Collapse>
        </section>
    );
};

export default FaqSection;
