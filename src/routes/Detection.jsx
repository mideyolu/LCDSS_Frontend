import { Modal } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DetectionForm from "../components/Form/DetectionForm";
import useAuth from "../hooks/useAuth";
import { handleSubmitDetection } from "../services/detection";

const Detection = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(true);

    const handleCancel = () => {
        setVisible(false);
        toast.info("Detection Form Closed");
        navigate("/dashboard");
    };

    // Use the custom hook for authentication check
    useAuth();

    return (
        <Modal
            title="Patient Detection Form"
            open={true}
            onCancel={handleCancel}
            footer={null}
        >
            {/* Pass the submission handler as the onSubmit prop */}
            <DetectionForm onSubmit={handleSubmitDetection} />
        </Modal>
    );
};

export default Detection;
