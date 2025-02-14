

import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader/Loader";

const { Option } = Select;
const { TextArea } = Input;

/**
 * Reusable Input Field Component (Handles both Input and TextArea)
 */
const FormInput = ({
    label,
    name,
    type = "text",
    rules,
    placeholder,
    isTextArea = false,
}) => (
    <Form.Item label={label} name={name} rules={rules}>
        {isTextArea ? (
            <TextArea placeholder={placeholder} rows={4} />
        ) : (
            <Input type={type} placeholder={placeholder} />
        )}
    </Form.Item>
);

/**
 * Reusable Select Dropdown Component
 */
const FormSelect = ({ label, name, rules, options, placeholder }) => (
    <Form.Item label={label} name={name} rules={rules}>
        <Select placeholder={placeholder}>
            {options.map((option) => (
                <Option key={option.value} value={option.value}>
                    {option.label}
                </Option>
            ))}
        </Select>
    </Form.Item>
);

/**
 * Reusable File Upload Component
 */
const FileUpload = ({ fileList, setFileList }) => {
    const handleFileChange = ({ fileList }) => setFileList(fileList);

    return (
        <Form.Item
            label="Upload CT Scan"
            rules={[
                { required: true, message: "Please upload a CT scan file!" },
            ]}
        >
            <Upload
                multiple={false}
                fileList={fileList}
                beforeUpload={() => false}
                onChange={handleFileChange}
            >
                <Button icon={<UploadOutlined />}>Upload File</Button>
            </Upload>
        </Form.Item>
    );
};

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

                {/* Patient Notes now uses TextArea */}
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
