import { Card, Typography } from "antd";
import React from "react";

const { Title, Paragraph } = Typography;

const SummaryBox = ({ title, value, color }) => {
    return (
        <Card
            className="flex flex-col w-full h-[150px] md:h-[180px] px-6 py-5 shadow-xl border-l-4 rounded-xl transition-all duration-300 hover:scale-[1.07] hover:shadow-2xl relative overflow-hidden"
            style={{
                borderColor: color,
                background: "rgba(30, 41, 59, 0.9)", // Deeper glass effect
                backdropFilter: "blur(15px)", // Smoother blur
            }}
        >
            {/* Background Gradient Overlay for Depth */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    background: `linear-gradient(135deg, ${color}33, transparent)`,
                }}
            />

            {/* Content Wrapper */}
            <div className="relative z-10">
                <Title level={5} className="mb-1 text-lg font-semibold text-white">
                    {title}
                </Title>
                <Paragraph className="text-4xl font-bold text-gray-100">
                    {value}
                </Paragraph>
            </div>
        </Card>
    );
};

export default SummaryBox;