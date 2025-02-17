import React, { useState } from "react";
import { Button, Form } from "antd";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { FormInput, FormSelect, FileUpload } from "./DetectionFormComponent"; // Import reusable components

/**
 * Main DetectionForm Component
 */
const DetectionForm = ({ onSubmit }) => {
    const navigate = useNavigate();
    const provider_id = localStorage.getItem("id");
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        await onSubmit({
            values,
            fileList,
            provider_id,
            form,
            setFileList,
            navigate,
            setLoading,
        });
    };

    return (
        <div>
            <Form
                form={form}
                role="form"
                layout="vertical"
                onFinish={handleSubmit}
            >
                <FormInput
                    label="Patient Name"
                    name="patient_name"
                    placeholder="Enter patient name"
                    rules={[
                        {
                            required: true,
                            message: "Please enter the patient's name!",
                        },
                    ]}
                />

                <FormInput
                    label="Patient Age"
                    name="patient_age"
                    type="number"
                    placeholder="Enter patient age"
                    rules={[
                        {
                            required: true,
                            message: "Please enter the patient's age!",
                        },
                    ]}
                />

                <FormSelect
                    label="Gender"
                    name="patient_gender"
                    placeholder="Select gender"
                    rules={[
                        { required: true, message: "Please select a gender!" },
                    ]}
                    options={[
                        { value: "Male", label: "Male" },
                        { value: "Female", label: "Female" },
                    ]}
                />

                <FormInput
                    label="Patient Email"
                    name="patient_email"
                    type="email"
                    placeholder="Enter patient email"
                    rules={[
                        {
                            required: true,
                            message: "Please enter the patient's email!",
                        },
                        {
                            type: "email",
                            message: "Please enter a valid email!",
                        },
                    ]}
                />

                <FormInput
                    label="Patient Notes"
                    name="patient_notes"
                    placeholder="Enter any notes about the patient"
                    isTextArea={true}
                />

                <FileUpload fileList={fileList} setFileList={setFileList} />

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {loading ? <Loader /> : "Submit"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default DetectionForm;
