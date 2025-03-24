import {
    Button,
    Card,
    Checkbox,
    Form,
    Input,
    Skeleton,
    Typography,
} from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handlePasswordChange, handleSubmit } from "../../utils/formhandlers";
import { initialValidationState } from "../../utils/password";
import Loader from "../Loader/Loader";
import PasswordValidation from "../PasswordValidation";

const FormComponent = ({
    title,
    fields,
    onSubmit,
    submitButtonText,
    redirect,
    changePasswordRedirect,
    showTermsAndConditions = false,
}) => {
    const { Title } = Typography;
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState(initialValidationState);
    const [allRequirementsMet, setAllRequirementsMet] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();
    const [formLoading, setFormLoading] = useState(true);

    // Simulate form loading state
    React.useEffect(() => {
        const timer = setTimeout(() => setFormLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleRedirect = () => navigate(redirect.path);
    const handleChangePasswordRedirect = () =>
        changePasswordRedirect && navigate(changePasswordRedirect.path);
    const handleBackToOnboarding = () => navigate("/onboarding");

    return (
        <Card
            bordered={false}
            className="w-full lg:w-[60%] md:px-4 md:py-2 lg:px-8 lg:py-4"
        >
            <Title className="text-center" level={5}>
                {formLoading ? (
                    <Skeleton.Input active className="w-40" />
                ) : (
                    title
                )}
            </Title>
            <Form
                form={form}
                className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
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
                            label={
                                formLoading ? (
                                    <Skeleton.Input active className="w-32" />
                                ) : (
                                    field.label
                                )
                            }
                            name={field.name}
                            rules={[
                                {
                                    required: field.required,
                                    message: `Please enter ${field.label.toLowerCase()}!`,
                                },
                            ]}
                        >
                            {formLoading ? (
                                <Skeleton.Input
                                    active
                                    className="w-full h-10"
                                />
                            ) : field.type === "password" ? (
                                <Input.Password
                                    placeholder={field.placeholder}
                                    size="large"
                                    className="max-w-[280px] md:max-w-[550px] lg:max-w-[600px] lg:w-[90%] sm:w-3/4 md:w-[80%]"
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
                            ) : (
                                <Input
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    size="large"
                                    className="max-w-[280px] md:max-w-[550px] lg:max-w-[600px] lg:w-[90%] sm:w-3/4 md:w-[80%]"
                                />
                            )}
                        </Form.Item>
                    ))}

                    {/* Password Validation */}

                    {formLoading ? (
                        <Skeleton.Input active className="w-full h-10" />
                    ) : fields.some(
                          (field) => field.name === "provider_password",
                      ) ? (
                        <PasswordValidation
                            validation={validation}
                            allRequirementsMet={allRequirementsMet}
                            showSuccess={showSuccess}
                        />
                    ) : null}
                </div>

                {/* Terms and Conditions */}
                {showTermsAndConditions && (
                    <Form.Item>
                        {formLoading ? (
                            <Skeleton.Input active className="w-60 h-6" />
                        ) : (
                            <Checkbox
                                className="mt-4"
                                checked={termsAccepted}
                                onChange={(e) =>
                                    setTermsAccepted(e.target.checked)
                                }
                            >
                                I agree to the{" "}
                                <Link to="/terms">Terms and Conditions</Link>
                            </Checkbox>
                        )}
                    </Form.Item>
                )}

                {/* Submit Button with Skeleton */}
                <Form.Item>
                    {formLoading ? (
                        <Skeleton.Button active className="w-full" />
                    ) : (
                        <Button
                            type="primary"
                            className="mt-6 p-[1.3rem] text-center w-full sm:w-3/4 md:w-[80%] max-w-[280px] md:max-w-[550px] lg:max-w-[600px] lg:w-[90%]"
                            htmlType="submit"
                            disabled={showTermsAndConditions && !termsAccepted}
                        >
                            {loading ? <Loader /> : submitButtonText}
                        </Button>
                    )}
                </Form.Item>

                {/* Main Redirect Link */}
                {formLoading ? (
                    <Skeleton.Input active className="w-40 h-5 mx-auto block" />
                ) : (
                    <Typography
                        className="mt-4 text-blue-600 text-center cursor-pointer"
                        onClick={handleRedirect}
                    >
                        {redirect.text}
                    </Typography>
                )}

                {/* Change Password Redirect Link (only visible if prop provided) */}
                {changePasswordRedirect &&
                    (formLoading ? (
                        <Skeleton.Input
                            active
                            className="w-60 h-5 mx-auto block"
                        />
                    ) : (
                        <Typography
                            className="mt-4 text-blue-600 text-center cursor-pointer"
                            onClick={handleChangePasswordRedirect}
                        >
                            {changePasswordRedirect.text}
                        </Typography>
                    ))}

                {/* Back Button */}
                {formLoading ? (
                    <Skeleton.Input
                        active
                        className="w-20 h-5 mt-5 mx-auto block"
                    />
                ) : (
                    <span
                        className="mt-4 text-sm absolute cursor-pointer top-[100%] right-[5%] lg:top-[90%] lg:right-[-70%]"
                        onClick={handleBackToOnboarding}
                    >
                        Back
                    </span>
                )}
            </Form>
        </Card>
    );
};

export default FormComponent;
