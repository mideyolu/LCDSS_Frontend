import { Button, Card, Checkbox, Form, Input, Typography } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { handlePasswordChange, handleSubmit } from "../utils/formhandlers"; // Import functions
import {
    areAllRequirementsMet,
    initialValidationState,
} from "../utils/password";
import PasswordValidation from "./PasswordValidation"; // Import PasswordValidation

const FormComponent = ({
    title,
    fields,
    onSubmit,
    submitButtonText,
    redirect,
    showTermsAndConditions = false,
}) => {
    const { Title } = Typography;
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState(initialValidationState);
    const [allRequirementsMet, setAllRequirementsMet] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleRedirect = () => {
        navigate(redirect.path);
    };

    const handleBackToOnboarding = () => {
        navigate("/onboarding"); // Replace with the correct path for your onboarding screen
    };

    return (
        <Card bordered={false}>
            <Title className="text-center" level={5}>
                {title}
            </Title>
            <Form
                form={form}
                className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 px-4 py-2 lg:px-8 lg:py-4"
                onFinish={(values) =>
                    handleSubmit(
                        values,
                        showTermsAndConditions,
                        termsAccepted,
                        onSubmit,
                        setLoading,
                    )
                }
                layout="vertical"
            >
                <div className="mb-1 flex flex-col gap-6">
                    {fields.map((field, index) => (
                        <Form.Item
                            key={index}
                            label={field.label}
                            name={field.name}
                            rules={[
                                {
                                    required: field.required,
                                    message: `Please enter ${field.label.toLowerCase()}!`,
                                },
                            ]}
                        >
                            <Input
                                type={field.type}
                                placeholder={field.placeholder}
                                size="large"
                                onChange={(e) =>
                                    field.name === "provider_password"
                                        ? handlePasswordChange(
                                              e.target.value,
                                              setPassword,
                                              setValidation,
                                              setAllRequirementsMet,
                                              setShowSuccess,
                                          )
                                        : null
                                }
                            />
                        </Form.Item>
                    ))}

                    {/* Password Validation */}
                    {fields.some(
                        (field) => field.name === "provider_password",
                    ) && (
                        <PasswordValidation
                            validation={validation}
                            allRequirementsMet={allRequirementsMet}
                            showSuccess={showSuccess}
                        />
                    )}
                </div>

                {/* Terms and Conditions */}
                {showTermsAndConditions && (
                    <Form.Item>
                        <Checkbox
                            className="mt-4"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                        >
                            I agree to the{" "}
                            <Link href="/terms">Terms and Conditions</Link>
                        </Checkbox>
                    </Form.Item>
                )}

                {/* Submit Button */}
                <Form.Item>
                    <Button
                        type="primary"
                        className="mt-6"
                        htmlType="submit"
                        loading={loading}
                        disabled={!areAllRequirementsMet(validation)}
                    >
                        {loading ? <Loader /> : submitButtonText}
                    </Button>
                </Form.Item>

                {/* Redirect Link */}
                <Typography
                    className="mt-4 text-blue-600 text-center cursor-pointer"
                    onClick={handleRedirect}
                >
                    {redirect.text}
                </Typography>

                <span
                    className="mt-4 text-sm absolute cursor-pointer top-[100%] right-[5%] lg:right-[-30%]"
                    onClick={handleBackToOnboarding}
                >
                    Back
                </span>
            </Form>
        </Card>
    );
};

export default FormComponent;
