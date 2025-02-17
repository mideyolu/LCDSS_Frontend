import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, Select, Upload, Button } from "antd";

const { Option } = Select;
const { TextArea } = Input;

/**
 * Reusable Input Field Component (Handles both Input and TextArea)
 */
export const FormInput = ({
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
export const FormSelect = ({ label, name, rules, options, placeholder }) => (
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
export const FileUpload = ({ fileList, setFileList }) => {
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
