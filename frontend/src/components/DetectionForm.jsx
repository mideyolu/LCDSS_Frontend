import React, { useState } from "react";
import { Form, Input, Select, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { predict, registerPatient, registerResults } from "../api/api";
import { toast } from "react-toastify";

const { Option } = Select;

const DetectionForm = () => {
    const provider_id = localStorage.getItem("id");
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFileChange = ({ file, fileList }) => {
        setFileList(fileList);
    };

    const handleSubmit = async (values) => {
        if (fileList.length === 0) {
            toast.error("Please upload a CT scan image!");
            return;
        }

        try {
            setLoading(true);
            const file = fileList[0]?.originFileObj;

            // Step 2: Predict diagnosis from the uploaded file
            const predictionResponse = await predict(file);
            const prediction = predictionResponse?.predicted_category;

            if (!prediction) {
                toast.error("Prediction result is missing. Please try again.");
                return;
            }

            // Step 3: Register Patient
            const patientPayload = {
                patient_name: values.patient_name,
                patient_age: values.patient_age,
                patient_gender: values.patient_gender,
                patient_email: values.patient_email,
                patient_notes: values.patient_notes,
            };

            const patientResponse = await registerPatient(patientPayload);
            if (!patientResponse || !patientResponse.patient_id) {
                throw new Error(
                    "Patient registration failed. No patient_id returned.",
                );
            }

            const patientId = patientResponse.patient_id;

            // Step 4: Register Diagnosis
            const diagnosisPayload = {
                provider_id: provider_id, // Replace with actual provider ID
                patient_id: patientId,
                prediction,
            };

            const registerResponse = await registerResults(diagnosisPayload);
            toast.success(
                "Patient data and diagnosis registered successfully!",
            );
            form.resetFields();
            setFileList([]);
        } catch (error) {
            console.error("Error during submission:", error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Form
                form={form}
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
                        beforeUpload={() => false} // Prevent automatic upload
                        onChange={handleFileChange}
                    >
                        <Button icon={<UploadOutlined />}>Upload File</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default DetectionForm;
