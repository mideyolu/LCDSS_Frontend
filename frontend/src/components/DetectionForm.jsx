import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader/Loader";

const { Option } = Select;

const DetectionForm = ({ onSubmit }) => {
    const navigate = useNavigate();
    const provider_id = localStorage.getItem("id");
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFileChange = ({ file, fileList }) => {
        setFileList(fileList);
    };

    // The onFinish handler uses the injected onSubmit prop.
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
                initialValues={{
                    patient_name: "",
                    patient_age: "",
                    patient_gender: "",
                    patient_email: "",
                    patient_notes: "",
                }}
            >
                <Form.Item
                    label="Patient Name"
                    name="patient_name"
                    rules={[
                        {
                            required: true,
                            message: "Please enter the patient's name!",
                        },
                    ]}
                >
                    <Input placeholder="Enter patient name" />
                </Form.Item>

                <Form.Item
                    label="Patient Age"
                    name="patient_age"
                    rules={[
                        {
                            required: true,
                            message: "Please enter the patient's age!",
                        },
                    ]}
                >
                    <Input type="number" placeholder="Enter patient age" />
                </Form.Item>

                <Form.Item
                    label="Gender"
                    name="patient_gender"
                    rules={[
                        { required: true, message: "Please select a gender!" },
                    ]}
                >
                    <Select placeholder="Select gender">
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Patient Email"
                    name="patient_email"
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
                >
                    <Input placeholder="Enter patient email" />
                </Form.Item>

                <Form.Item label="Patient Notes" name="patient_notes">
                    <Input.TextArea placeholder="Enter any notes about the patient" />
                </Form.Item>

                <Form.Item
                    label="Upload CT Scan"
                    rules={[
                        {
                            required: true,
                            message: "Please upload a CT scan file!",
                        },
                    ]}
                >
                    <Upload
                        multiple={false}
                        fileList={fileList}
                        beforeUpload={() => false}
                        onChange={handleFileChange}
                        data-testid="file-upload"
                    >
                        <Button icon={<UploadOutlined />}>Upload File</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        { loading ? <Loader/> : "Submit" }
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default DetectionForm;
