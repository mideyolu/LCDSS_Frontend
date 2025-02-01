// PasswordValidation.js
import { CheckOutlined, LoadingOutlined, XOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import React from "react";

const PasswordValidation = ({
    validation,
    allRequirementsMet,
    showSuccess,
}) => {
    const { Paragraph } = Typography;

    return (
        <>
            {/* Password Validation Messages */}
            {!showSuccess && (
                <div className="text-left mt-2">
                    <Paragraph>Requirements:</Paragraph>
                    <ul className="list-disc pl-5">
                        <li
                            className={`${
                                validation.hasUppercase
                                    ? "text-green-500"
                                    : "text-red-500"
                            }`}
                        >
                            {validation.hasUppercase ? (
                                <CheckOutlined />
                            ) : (
                                <XOutlined />
                            )}{" "}
                            At least one uppercase letter
                        </li>
                        <li
                            className={`${
                                validation.hasSpecialChar
                                    ? "text-green-500"
                                    : "text-red-500"
                            }`}
                        >
                            {validation.hasSpecialChar ? (
                                <CheckOutlined />
                            ) : (
                                <XOutlined />
                            )}{" "}
                            At least one special character
                        </li>
                        <li
                            className={`${
                                validation.hasNumber
                                    ? "text-green-500"
                                    : "text-red-500"
                            }`}
                        >
                            {validation.hasNumber ? (
                                <CheckOutlined />
                            ) : (
                                <XOutlined />
                            )}{" "}
                            At least one number
                        </li>
                        <li
                            className={`${
                                validation.hasMinLength
                                    ? "text-green-500"
                                    : "text-red-500"
                            }`}
                        >
                            {validation.hasMinLength ? (
                                <CheckOutlined />
                            ) : (
                                <XOutlined />
                            )}{" "}
                            At least 8 characters
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
