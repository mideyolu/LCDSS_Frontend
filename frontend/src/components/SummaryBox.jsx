import { Card, Typography } from "antd";
import React from "react";

const { Title, Paragraph } = Typography;

const SummaryBox = ({ title, value, color }) => {
    return (
        <Card
            className="flex flex-col w-full text-white h-[120px] md:h-[150px] items-start justify-center p-4"
            style={{
                backgroundColor: color,
            }}
        >
            <Title
                level={5}
                className="mb-[8px] text-center text-[1.03rem] whitespace-nowrap text-[#ffffff]"
                style={{
                    color: "#fff",
                }}
            >
                {title}
            </Title>
            <Paragraph className="text-[1.2rem] font-bold text-white">
                {value}
            </Paragraph>
        </Card>
    );
};

export default SummaryBox;
