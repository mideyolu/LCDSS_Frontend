// import { XOutlined } from "@ant-design/icons";
// import { Button, Card, Checkbox, Input, Typography } from "antd";
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import Loader from "./Loader";

// const FormComponent = ({
//     title,
//     fields,
//     onSubmit,
//     submitButtonText,
//     redirect,
//     showTermsAndConditions = false,
// }) => {
//     const { Title, Paragraph } = Typography;
//     const [loading, setLoading] = useState(false);
//     const [termsAccepted, setTermsAccepted] = useState(false); // State to track checkbox status
//     const navigate = useNavigate();

//     const [open, setOpen] = useState(false);

//     const handleClick = () => {
//         setOpen(!open);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = Object.fromEntries(new FormData(e.target).entries());

//         // Check for required fields
//         const missingFields = fields.filter(
//             (field) => field.required && !formData[field.name],
//         );

//         if (missingFields.length > 0) {
//             toast.error(
//                 `Please fill out: ${missingFields
//                     .map((field) => field.label)
//                     .join(", ")}`,
//             );
//             return;
//         }

//         if (showTermsAndConditions && !termsAccepted) {
//             toast.error(
//                 "You must accept the Terms and Conditions to continue.",
//             );
//             return;
//         }

//         setLoading(true);
//         try {
//             await onSubmit(formData); // Pass formData to onSubmit (which is handleSignup in Signup)
//         } catch (error) {
//             toast.error(`Error: ${error.message || "Something went wrong!"}`);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleRedirect = () => {
//         navigate(redirect.path); // Redirect to the specified path
//     };

//     const handleBackToOnboarding = () => {
//         navigate("/onboarding"); // Replace with the correct path for your onboarding screen
//     };

//     return (
//         <Card bordered={false}>
//             <Title
//                 className="text-center"
//                 level={5}
//                 style={{
//                     fontFamily: "Robotto, sans-serif",
//                 }}
//             >
//                 {title}
//             </Title>
//             <form
//                 className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 px-4 py-2 lg:px-8 lg:py-4"
//                 onSubmit={handleSubmit}
//             >
//                 <div className="mb-1 flex flex-col gap-6">
//                     {fields.map((field, index) => (
//                         <div key={index}>
//                             <Typography className="-mb-3">
//                                 {field.label}
//                             </Typography>
//                             <Input
//                                 type={field.type}
//                                 name={field.name}
//                                 placeholder={field.placeholder}
//                                 size="large"
//                                 className="!border-t-blue-gray-200 mt-2 focus:mt-3 focus:!border-t-gray-900"
//                             />
//                         </div>
//                     ))}
//                 </div>

//                 <div className="flex flex-col items-start">
//                     {/* Terms and Conditions Checkbox */}
//                     {showTermsAndConditions && (
//                         <Checkbox
//                             className="mt-4"
//                             checked={termsAccepted}
//                             onChange={(e) => setTermsAccepted(e.target.checked)}
//                         >
//                             I agree to the{" "}
//                             <Link href="" onClick={handleClick}>
//                                 Terms and Conditions
//                             </Link>
//                         </Checkbox>
//                     )}

//                     {open && (
//                         <Card className="w-[60%] absolute top-[40%] right-[20%] z-40">
//                             <Title level={5}>Please Note</Title>

//                             <XOutlined
//                                 className="p-3 absolute top-0 right-0 hover:text-blue-600"
//                                 onClick={handleClick}
//                             />

//                             <Paragraph>
//                                 <ul>
//                                     <li>1</li>
//                                     <li>2</li>
//                                 </ul>
//                             </Paragraph>
//                         </Card>
//                     )}

//                     <Button type="primary" className="mt-6" htmlType="submit">
//                         {loading ? <Loader /> : submitButtonText}
//                     </Button>
//                 </div>

//                 <Typography
//                     className="mt-4 text-blue-600 text-center cursor-pointer"
//                     onClick={handleRedirect}
//                 >
//                     {redirect.text}
//                 </Typography>
//                 <span
//                     className="mt-4 text-sm absolute cursor-pointer top-[100%] right-[5%] lg:right-[-30%]"
//                     onClick={handleBackToOnboarding}
//                 >
//                     Back
//                 </span>
//             </form>
//         </Card>
//     );
// };

// export default FormComponent;

import { XOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input, Typography } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    const { Title, Paragraph } = Typography;
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false); // State to track checkbox status
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleSubmit = async (values) => {
        if (showTermsAndConditions && !termsAccepted) {
            toast.error(
                "You must accept the Terms and Conditions to continue.",
            );
            return;
        }

        setLoading(true);
        try {
            await onSubmit(values); // Pass form values to the onSubmit function
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
            <Form
                form={form}
                className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 px-4 py-2 lg:px-8 lg:py-4"
                onFinish={handleSubmit}
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
                                className="!border-t-blue-gray-200 mt-2 focus:mt-3 focus:!border-t-gray-900"
                            />
                        </Form.Item>
                    ))}
                </div>

                <div className="flex flex-col items-start">
                    {/* Terms and Conditions Checkbox */}
                    {showTermsAndConditions && (
                        <Form.Item>
                            <Checkbox
                                className="mt-4"
                                checked={termsAccepted}
                                onChange={(e) =>
                                    setTermsAccepted(e.target.checked)
                                }
                            >
                                I agree to the{" "}
                                <Link href="" onClick={handleClick}>
                                    Terms and Conditions
                                </Link>
                            </Checkbox>
                        </Form.Item>
                    )}

                    {open && (
                        <Card className="w-[60%] absolute top-[40%] right-[20%] z-40">
                            <Title level={5}>Please Note</Title>

                            <XOutlined
                                className="p-3 absolute top-0 right-0 hover:text-blue-600"
                                onClick={handleClick}
                            />

                            <Paragraph>
                                <ul>
                                    <li>1</li>
                                    <li>2</li>
                                </ul>
                            </Paragraph>
                        </Card>
                    )}

                    <Form.Item>
                        <Button
                            type="primary"
                            className="mt-6"
                            htmlType="submit"
                            loading={loading}
                        >
                            {loading ? <Loader /> : submitButtonText}
                        </Button>
                    </Form.Item>
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
            </Form>
        </Card>
    );
};

export default FormComponent;
