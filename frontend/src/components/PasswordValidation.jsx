import { LoadingOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import React from "react";

const PasswordValidation = ({
    validation,
    allRequirementsMet,
    showSuccess,
}) => {
    const { Paragraph } = Typography;

    // Define validation rules in order
    const requirements = [
        { key: "hasUppercase", text: "At least one uppercase letter" },
        { key: "hasSpecialChar", text: "At least one special character" },
        { key: "hasNumber", text: "At least one number" },
        { key: "hasMinLength", text: "At least 8 characters" },
    ];

    // Find the first unmet requirement
    const firstUnmetRequirement = requirements.find(
        (req) => !validation[req.key],
    );

    return (
        <>
            {/* Password Validation Messages */}
            {!showSuccess && firstUnmetRequirement && (
                <div className="text-left mt-2">
                    <Paragraph style={{ fontFamily: "Roboto" }}>
                        Requirements:
                    </Paragraph>
                    <ul
                        className="list-disc pl-5"
                        style={{ fontFamily: "Roboto" }}
                    >
                        <li className="text-red-500">
                            {firstUnmetRequirement.text}
                        </li>
                    </ul>
                </div>
            )}

            {/* Loader and Success Message */}
            {allRequirementsMet && !showSuccess && (
                <div className="flex items-center mt-2 text-blue-500">
                    <LoadingOutlined className="mr-2" />
                    Checking requirements...
                </div>
            )}

            {showSuccess && (
                <div className="flex items-center mt-2 text-green-500">
                    Password Requirements met ✅
                </div>
            )}
        </>
    );
};

export default PasswordValidation;
