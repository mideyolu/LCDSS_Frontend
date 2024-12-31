import { Modal } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DetectionForm from "../components/DetectionForm";
import useAuth from "../hooks/useAuth"; // Import the custom hook

const Detection = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(true);

    const handleCancel = () => {
        setVisible(false);
        navigate("/dashboard"); // Navigate back to home or desired route on close
    };

    // Use the custom hook for authentication check
    useAuth(); // This will handle token validation and expiration

    return (
        <Modal
            title="Patient Detection Form"
            visible={visible}
            onCancel={handleCancel}
            footer={null} // Remove default footer buttons
        >
            <DetectionForm />
        </Modal>
    );
};

export default Detection;
