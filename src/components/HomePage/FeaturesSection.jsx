import { Card, Col, Image, Row, Typography, Skeleton } from "antd";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { service } from "../../utils/service";
import { CustomParagraph, CustomTitle } from "../Typography/CustomTypography";

const FeaturesSection = ({ featuresRef }) => {
    const { Paragraph } = Typography;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a loading state
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const getParagraphStyle = (id) => ({
        marginTop: id === 1 ? "55px" : "0px",
    });

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
            className="pt-20 lg:pb-5 px-6 md:px-16 mb-[1.6rem] md:mb-[1.3rem] rounded-2xl max-w-full w-full overflow-hidden"
        >
            {/* Section Title */}
            <CustomTitle className="text-center" level={5}>
                {loading ? (
                    <Skeleton.Input active className="w-60 h-6" />
                ) : (
                    "Built for Lung Cancer Detection"
                )}
            </CustomTitle>

            {/* Description */}
            <CustomParagraph className="text-[0.9rem] text-center mb-5">
                {loading ? (
                    <>
                        <Skeleton.Input active className="w-[80%] h-5 my-1" />
                        <Skeleton.Input active className="w-[60%] h-5 my-1" />
                    </>
                ) : (
                    <>
                        <span className="block">
                            Revolutionize patient management effortlessly. Boost
                            diagnostic accuracy with AI-powered detection and
                            streamline workflows with intuitive, user-friendly
                            tools.
                        </span>
                        <span className="block">
                            Experience faster, smarter lung cancer care.
                        </span>
                    </>
                )}
            </CustomParagraph>

            {/* Feature Cards */}
            <Row
                gutter={[16, 16]}
                justify="center"
                className="py-10 w-full flex flex-wrap items-center justify-center"
            >
                {service.map((item, id) => {
                    const direction =
                        id === 0 ? "left" : id === 1 ? "right" : "top";

                    return (
                        <Col key={id} xs={24} sm={12} md={12} lg={6} className="flex justify-center">
                            <motion.div
                                custom={direction}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ amount: 0.3 }}
                                variants={cardVariants}
                                className="w-full flex justify-center"
                            >
                                <Card
                                    title={loading ? (
                                        <Skeleton.Input active className="w-40 h-5" />
                                    ) : (
                                        item.caption
                                    )}
                                    className="max-w-sm w-full mx-auto hover:scale-105 cursor-pointer duration-300 ease-in-out flex flex-col items-center justify-center"
                                    bordered={false}
                                >
                                    {/* Image Loading Placeholder */}
                                    {loading ? (
                                        <Skeleton.Image style={{ width: "100%", height: "auto" }} />
                                    ) : (
                                        <div className="flex items-center justify-center">
                                            <Image
                                                width="100%"
                                                height="auto"
                                                className="max-w-[150px] md:max-w-[190px]"
                                                src={item.img}
                                                preview={false}
                                            />
                                        </div>
                                    )}

                                    {/* Description Loading Placeholder */}
                                    {loading ? (
                                        <Skeleton paragraph={{ rows: 2 }} active />
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
