import { Card, Typography } from "antd";
import React from "react";

const { Title, Paragraph } = Typography;

const SummaryBox = ({ title, value, color }) => {
    return (
        <Card
            className="flex flex-col w-full text-black h-[120px] md:h-[150px] items-start justify-center p-4"
            style={{
                borderColor: color,
            }}
        >
            <Title
                level={5}
                className="mb-[8px] text-center text-[1.03rem] whitespace-nowrap text-[#ffffff]"
            >
                {title}
            </Title>
            <Paragraph
                className="text-[1.2rem] font-bold "
            >
                {value}
            </Paragraph>
        </Card>
    );
};

export default SummaryBox;
