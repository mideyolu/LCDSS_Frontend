import React from "react";
import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

const SummaryBox = ({ title, value }) => {
    return (
        <Card className="flex flex-col w-[100%] h-[150px] items-start justify-center p-4">
            <Title
                level={4}
                style={{
                    marginBottom: "8px",
                    textAlign: "left",
                    fontSize: "0.8rem",
                    whiteSpace: "nowrap"
                }}
            >
                {title}
            </Title>
            <Paragraph style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                {value}
            </Paragraph>
        </Card>
    );
};

export default SummaryBox;
