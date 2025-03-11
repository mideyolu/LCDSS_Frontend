import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography } from "antd";
import { toast } from "react-toastify";


const { Title } = Typography;

const ChangePassword = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log("Password change values: ", values);


        toast.success("Password changed successfully!");
        setTimeout(() => {
            navigate("/login"); // Redirect to login page after success
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                <Title level={ 2 } className="text-center mb-5" style={ {
                    fontFamily: "Robotto"
                }}>
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
                        <Input.Password className="w-full" />
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

                    <Form.Item className="">
                        <Button
                            type="primary"
                            htmlType="submit"

                            className="bg-blue-600"
                        >
                            Change Password
                        </Button>

                        <span className=" cursor-pointer text-blue-800" onClick={()=> navigate("/login")}>
                            Go Back
                        </span>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ChangePassword;
