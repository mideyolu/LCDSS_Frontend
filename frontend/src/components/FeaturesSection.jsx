import { Card, Col, Image, Row, Typography } from "antd";
import React from "react";
import { service } from "../utils/service";


const FeaturesSection = () => {
    const { Title, Paragraph } = Typography;

    // Helper function to calculate margin based on id
    const getParagraphStyle = (id) => {
        if (id === 1) {
            return { marginTop: "50px" }; // Specific margin for id 1
        }
        if (id === 2) {
            return { marginTop: "30px" }; // Specific margin for id 2
        }
        return { marginTop: "0px" }; // Default margin
    };

    return (
        <section className="px-5 py-3 mb-[3rem]  bg-blue-500 rounded-md">
            <Title
                className="text-center mb-4"
                level={5}
                style={{
                    color: "white",
                    // fontSize: "1.5rem",
                    fontFamily: "Robotto, sans-serif",
                }}
            >
                Built for Lung Cancer Detection
            </Title>
            <Paragraph
                className="text-[0.9rem] text-center text-white"
                style={{
                    fontFamily: "Robotto, sans-serif",
                }}
            >
                <span className=" block">
                    Revolutionize patient management effortlessly. Boost
                    diagnostic accuracy with AI-powered detection and streamline
                    workflows with intuitive, user-friendly tools.
                </span>

                <span className="block">
                    Experience faster, smarter lung cancer care.
                </span>
            </Paragraph>
            <Row gutter={[16, 16]} justify="center">
                {service.map((item, id) => (
                    <Col
                        key={id}
                        xs={24}
                        sm={12}
                        md={12} // Two cards per row on medium screens
                        lg={8} // Three cards per row on large screens
                    >
                        <Card
                            title={item.caption}
                            className="w-[100%] hover:scale-105 cursor-pointer duration-300 ease-in-out"
                            bordered={false}
                        >
                            <Image width={150} src={item.img} />
                            <Paragraph
                                style={getParagraphStyle(id)}
                                className="text-[0.9rem] md:text-[1.05rem]"
                            >
                                {item.desc}
                            </Paragraph>
                        </Card>
                    </Col>
                ))}
            </Row>
        </section>
    );
};

export default FeaturesSection;
