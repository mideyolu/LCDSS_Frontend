import { Card, Col, Image, Row, Typography, Skeleton } from "antd";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { service } from "../../utils/service";
import { CustomParagraph, CustomTitle } from "../Typography/CustomTypography";

const FeaturesSection = ({ featuresRef }) => {
    const { Paragraph } = Typography;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a loading state (e.g., fetching data)
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const getParagraphStyle = (id) => {
        return { marginTop: id === 1 || id === 2 ? "50px" : "30px" };
    };

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
        <section
            ref={featuresRef}
            className="py-20 px-6 md:px-16 mb-[3rem] rounded-2xl mx-[1.2rem]"
        >
            <CustomTitle className="text-center" level={5}>
                Built for Lung Cancer Detection
            </CustomTitle>
            <CustomParagraph className="text-[0.9rem] text-center mb-5">
                <span className="block">
                    Revolutionize patient management effortlessly. Boost
                    diagnostic accuracy with AI-powered detection and streamline
                    workflows with intuitive, user-friendly tools.
                </span>
                <span className="block">
                    Experience faster, smarter lung cancer care.
                </span>
            </CustomParagraph>
            <Row gutter={[16, 16]} justify="center" className="py-10">
                {service.map((item, id) => {
                    const direction =
                        id === 0 ? "left" : id === 1 ? "right" : "top";

                    return (
                        <Col key={id} xs={24} sm={12} md={12} lg={8}>
                            <motion.div
                                custom={direction}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ amount: 0.3 }}
                                variants={cardVariants}
                            >
                                <Card
                                    title={
                                        loading ? (
                                            <Skeleton active />
                                        ) : (
                                            item.caption
                                        )
                                    }
                                    className="w-[100%] hover:scale-105 cursor-pointer duration-300 ease-in-out flex flex-col items-center justify-center"
                                    bordered={false}
                                >
                                    {loading ? (
                                        <Skeleton.Image
                                            style={{ width: 150, height: 100 }}
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center">
                                            <Image
                                                width={id === 1 ? 190 : 150}
                                                height={id === 1 ? 100 : "auto"}
                                                src={item.img}
                                                preview={false}
                                            />
                                        </div>
                                    )}

                                    {loading ? (
                                        <Skeleton
                                            active
                                            paragraph={{ rows: 2 }}
                                        />
                                    ) : (
                                        <Paragraph
                                            style={getParagraphStyle(id)}
                                            className="text-[0.9rem] md:text-[1.05rem]"
                                        >
                                            {item.desc}
                                        </Paragraph>
                                    )}
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
