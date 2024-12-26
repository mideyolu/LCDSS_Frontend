import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DetectionForm from "../components/DetectionForm";

const Detection = ({ sidebarCollapsed }) => {
    const [isFormVisible, setIsFormVisible] = useState(true);
    const navigate = useNavigate();

    const handleClose = () => {
        toast.info("You have exited the detection form.", {
        
        });
        setIsFormVisible(false);
        navigate("/dashboard"); // Redirect after closing
    };

    const handlePredict = (values) => {
        console.log("Prediction Data: ", values);
        toast.success("Prediction request sent successfully!", {
            position: "top-right",
        });
        setIsFormVisible(false);
        navigate("/dashboard"); // Redirect after prediction
    };

    return (
        <div
            style={{
                marginLeft: sidebarCollapsed ? "25px" : "150px", // Adjust margin based on sidebar state
                transition: "margin-left 0.3s",
            }}
        >
            <DetectionForm
                visible={isFormVisible}
                onClose={handleClose}
                onPredict={handlePredict}
            />
        </div>
    );
};

export default Detection;
