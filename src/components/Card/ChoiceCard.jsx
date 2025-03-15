import { Typography } from "antd";
import React from "react";

const { Title, Paragraph } = Typography;

const ChoiceCard = ({ icon, title, paragraph, onClick, className }) => {
    return (
        <div
            className={`flex flex-col items-center space-y-2 p-4 bg-gray-50 rounded-lg w-[90%] mx-auto md:w-1/2 hover:scale-105 transition-all duration-100 ease-in-out ${className}`}
            onClick={onClick}
        >
            {icon}
            <Title
                level={5}
                className="text-gray-800  text-center"
            >
                {title}
            </Title>

            <Paragraph

                className="text-gray-600 text-center"
            >
                {paragraph}
            </Paragraph>
        </div>
    );
};

export default ChoiceCard;
