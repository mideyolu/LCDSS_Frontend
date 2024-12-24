import React from "react";
import { Button, Collapse, Typography } from "antd";
import { faqData } from "../api/services";
import { Link } from "react-router-dom";

const FaqSection = () => {
    const { Panel } = Collapse;
    const { Title } = Typography;
    return (
        <section className="min-h-screen">
            <Title level={3} className="text-center mb-6">
                Frequently Asked Questions
            </Title>
            <Collapse accordion className="max-w-[800px] mx-auto">
                {faqData.map((faq, index) => (
                    <Panel header={faq.question} key={index}>
                        <p className="text-[0.95rem] leading-6">{faq.answer}</p>
                    </Panel>
                ))}
            </Collapse>

            <section className="text-center my-8">
                <Title level={4}>Still Have Questions?</Title>
                <p>
                    If you didn't find what you were looking for, feel free to
                    reach out to us directly.
                </p>
                <Button type="primary">
                    <Link to={"/"}>Contact Us</Link>
                </Button>
            </section>
        </section>
    );
};

export default FaqSection;
