import { Button, Card, Checkbox, Input, Typography } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "./Loader";

const FormComponent = ({
    title,
    fields,
    onSubmit,
    submitButtonText,
    redirect,
    showTermsAndConditions = false,
}) => {
    const { Title } = Typography;
    const [loading, setLoading] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false); // State to track checkbox status
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target).entries());

        // Check for required fields
        const missingFields = fields.filter(
            (field) => field.required && !formData[field.name],
        );

        if (missingFields.length > 0) {
            toast.error(
                `Please fill out: ${missingFields
                    .map((field) => field.label)
                    .join(", ")}`,
            );
            return;
        }

        if (showTermsAndConditions && !termsAccepted) {
            toast.error(
                "You must accept the Terms and Conditions to continue.",
            );
            return;
        }

        setLoading(true);
        try {
            await onSubmit(formData); // Pass formData to onSubmit (which is handleSignup in Signup)
        } catch (error) {
            toast.error(`Error: ${error.message || "Something went wrong!"}`);
        } finally {
            setLoading(false);
        }
    };

    const handleRedirect = () => {
        navigate(redirect.path); // Redirect to the specified path
    };

    const handleBackToOnboarding = () => {
        navigate("/onboarding"); // Replace with the correct path for your onboarding screen
    };

    return (
        <Card bordered={false}>
            <Title
                className="text-center"
                level={5}
                style={{
                    fontFamily: "Robotto, sans-serif",
                }}
            >
                {title}
            </Title>
            <form
                className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 px-4 py-2 lg:px-8 lg:py-4"
                onSubmit={handleSubmit}
            >
                <div className="mb-1 flex flex-col gap-6">
                    {fields.map((field, index) => (
                        <div key={index}>
                            <Typography className="-mb-3">
                                {field.label}
                            </Typography>
                            <Input
                                type={field.type}
                                name={field.name}
                                placeholder={field.placeholder}
                                size="large"
                                className="!border-t-blue-gray-200 mt-2 focus:mt-3 focus:!border-t-gray-900"
                            />
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-start">
                    {/* Terms and Conditions Checkbox */}
                    {showTermsAndConditions && (
                        <Checkbox
                            className="mt-4"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                        >
                            I agree to the <a href="">Terms and Conditions</a>
                        </Checkbox>
                    )}

                    <Button type="primary" className="mt-6" htmlType="submit">
                        {loading ? <Loader /> : submitButtonText}
                    </Button>
                </div>

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
            </form>
        </Card>
    );
};

export default FormComponent;
