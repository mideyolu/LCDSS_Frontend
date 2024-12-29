import React from "react";
import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

const SummaryBox = ({ title, value, color }) => {
    return (
        <Card
            className="flex flex-col w-[90%] md:w-[85%] text-white h-[120px] md:h-[150px] items-start justify-center p-4"
            style={{
                fontFamily: "Robotto, sans-serif",
                backgroundColor: color,
            }}
        >
            <Title
                level={5}
                style={{
                    marginBottom: "8px",
                    textAlign: "left",
                    fontSize: "1.03rem",
                    whiteSpace: "nowrap",
                    color: "#fff",
                    fontFamily: "Robotto, sans-serif",
                }}
            >
                {title}
            </Title>
            <Paragraph
                style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: "#fff",
                    fontFamily: "Robotto, sans-serif",
                }}
            >
                {value}
            </Paragraph>
        </Card>
    );
};

export default SummaryBox;
