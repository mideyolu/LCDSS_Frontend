import { Card, Typography } from "antd";
import React from "react";

const { Title, Paragraph } = Typography;

const SummaryBox = ({ title, value, color }) => {
    return (
        <Card
            className="flex flex-col w-full h-[130px] md:h-[160px] px-6 py-4 shadow-md border-l-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
            style={{
                borderColor: color,
            }}
        >
            <Title
                level={5}
                className="text-lg font-medium text-gray-800"
            >
                {title}
            </Title>
            <Paragraph className="text-2xl font-semibold text-gray-900">
                {value}
            </Paragraph>
        </Card>
    );
};

export default SummaryBox;