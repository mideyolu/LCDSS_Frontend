import { Button, Form, Input, Typography } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import PasswordValidation from "../components/PasswordValidation";
import { handleChangePassword } from "../services/auth";
import { ChangePasswordValidation } from "../utils/password";


const { Title } = Typography;

const ChangePassword = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState({
        hasUppercase: false,
        hasSpecialChar: false,
        hasNumber: false,
        hasMinLength: false,
    });
    const [allRequirementsMet, setAllRequirementsMet] = useState(false);

    const onFinish = (values) =>
        handleChangePassword(values, setIsLoading, navigate);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                <Title level={2} className="text-center mb-5">
                    Change Password
                </Title>
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Email"
                        name="provider_email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your email!",
                            },
                            {
                                type: "email",
                                message: "Please enter a valid email!",
                            },
                        ]}
                    >
                        <Input className="w-full" />
                    </Form.Item>

                    <Form.Item
                        label="New Password"
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: "Please input your new password!",
                            },
                        ]}
                    >
                        <Input.Password
                            className="w-full"
                            onChange={(e) =>
                                ChangePasswordValidation(
                                    e.target.value,
                                    setPasswordValidation,
                                    setAllRequirementsMet,
                                )
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        label="Confirm New Password"
                        name="confirmPassword"
                        dependencies={["newPassword"]}
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your new password!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("newPassword") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            "The two passwords do not match!",
                                        ),
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password className="w-full" />
                    </Form.Item>

                    <PasswordValidation
                        validation={passwordValidation}
                        allRequirementsMet={allRequirementsMet}
                        showSuccess={allRequirementsMet}
                    />

                    <div className="flex items-center justify-between mt-5">
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="bg-blue-600 flex items-center justify-center gap-2"
                                disabled={!allRequirementsMet || isLoading}
                            >
                                {isLoading ? (
                                    <Loader size="small" />
                                ) : (
                                    "Change Password"
                                )}
                            </Button>
                        </Form.Item>

                        <span
                            className="cursor-pointer text-blue-800 ml-2 text-[0.8rem]"
                            onClick={() => navigate("/login")}
                        >
                            Go Back
                        </span>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default ChangePassword;
