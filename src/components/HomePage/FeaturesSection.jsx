import { Card, Col, Image, Row, Typography } from "antd";
import { motion } from "framer-motion";
import React from "react";
import { service } from "../../utils/service";

const FeaturesSection = () => {
    const { Title, Paragraph } = Typography;

    // Helper function to calculate margin based on id
    const getParagraphStyle = (id) => {
        if (id === 1) {
            return { marginTop: "50px" }; // Specific margin for id 1 (second element)
        }
        if (id === 2) {
            return { marginTop: "50px" }; // Specific margin for id 2
        }
        return { marginTop: "30px" }; // Default margin
    };

    // Animation variants for cards
    const cardVariants = {
        hidden: (direction) => ({
            opacity: 0,
            x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
            y: direction === "top" ? -100 : 0,
        }),
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    return (
        <section className="px-5 py-3 mb-[3rem] bg-blue-500 rounded-2xl">
            <Title
                className="text-center mb-4"
                level={5}
                style={{
                    color: "white",
                    fontFamily: "Robotto",
                }}
            >
                Built for Lung Cancer Detection
            </Title>
            <Paragraph
                className="text-[0.9rem] text-center text-white"
                style={{
                    fontFamily: "Robotto",
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
                {service.map((item, id) => {
                    const direction =
                        id === 0 ? "left" : id === 1 ? "right" : "top"; // Determine animation direction
                    return (
                        <Col key={id} xs={24} sm={12} md={12} lg={8}>
                            <motion.div
                                custom={direction}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ amount: 0.3 }} // Triggers animation when the element enters the viewport
                                variants={cardVariants}
                            >
                                <Card
                                    style={{
                                        fontFamily: "Robotto",
                                    }}
                                    title={item.caption}
                                    className="w-[100%] hover:scale-105 cursor-pointer duration-300 ease-in-out flex flex-col items-center justify-center"
                                    bordered={false}
                                >
                                    <div className="flex items-center justify-center">
                                        <Image
                                            width={id === 1 ? 190 : 150} // Increase width for second image
                                            height={id === 1 ? 100 : "auto"} // Increase height for second image
                                            src={item.img}
                                        />
                                    </div>

                                    <Paragraph
                                        style={{
                                            ...getParagraphStyle(id), // Combine margin style with the next style
                                            fontFamily: "Robotto",
                                        }}
                                        className="text-[0.9rem] md:text-[1.05rem]"
                                    >
                                        {item.desc}
                                    </Paragraph>
                                </Card>
                            </motion.div>
                        </Col>
                    );
                })}
            </Row>
        </section>
    );
};

export default FeaturesSection;
