import React from "react";
import { Modal, Form, Input, Select, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const { Option } = Select;

const DetectionForm = ({ visible, onClose, onPredict }) => {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        toast.success("Prediction initiated successfully!", {
            position: "top-right",
        });
        onPredict(values);
    };

    const handleCancel = () => {
        toast.info("Form canceled.");
        onClose();
    };

    return (
        <Modal
            title="Patient Detection Form"
            visible={visible}
            onCancel={handleCancel}
            footer={null}
            destroyOnClose
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{
                    name: "",
                    age: "",
                    gender: "",
                    notes: "",
                }}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        { required: true, message: "Please enter the name" },
                    ]}
                >
                    <Input placeholder="Enter patient name" />
                </Form.Item>

                <Form.Item
                    name="age"
                    label="Age"
                    rules={[
                        { required: true, message: "Please enter the age" },
                    ]}
                >
                    <Input type="number" placeholder="Enter patient age" />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[
                        { required: true, message: "Please select a gender" },
                    ]}
                >
                    <Select placeholder="Select gender">
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                    </Select>
                </Form.Item>

                <Form.Item name="notes" label="Notes">
                    <Input.TextArea
                        rows={4}
                        placeholder="Enter additional notes"
                    />
                </Form.Item>

                <Form.Item
                    name="image"
                    label="Image"
                    valuePropName="fileList"
                    getValueFromEvent={(e) =>
                        Array.isArray(e) ? e : e?.fileList
                    }
                >
                    <Upload
                        name="image"
                        listType="picture"
                        beforeUpload={() => false}
                    >
                        <Button icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>
                </Form.Item>

                <div className="flex justify-end gap-4">
                    <Button danger onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Predict
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default DetectionForm;
