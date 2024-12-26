import React from "react";
import { service } from "../api/services";
import { Card, Col, Row, Typography, Image } from "antd";
import Title from "antd/es/skeleton/Title";

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
        <section className="p-3 mb-[3rem]">
            <Title level={5} className="text-center m-[.5rem] p-[0.5rem]">
                What We Offer
            </Title>
            <Row gutter={[16, 16]} justify="center">
                {service.map((item, id) => (
                    <Col
                        key={id}
                        xs={24}
                        sm={12}
                        md={12} // Two cards per row on medium screens
                        lg={8}  // Three cards per row on large screens
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
