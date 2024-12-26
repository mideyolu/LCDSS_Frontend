import React from "react";
import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

const SummaryBox = ({ title, value, color }) => {
    return (
        <Card
            className="flex flex-col w-[100%] text-white h-[150px] items-start justify-center p-4"
            style={{ backgroundColor: color }}
        >
            <Title
                level={4}
                style={{
                    marginBottom: "8px",
                    textAlign: "left",
                    fontSize: "1.03rem",
                    whiteSpace: "nowrap",
                    color: "#fff",
                }}
            >
                {title}
            </Title>
            <Paragraph
                style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: "#fff",
                }}
            >
                {value}
            </Paragraph>
        </Card>
    );
};

export default SummaryBox;
