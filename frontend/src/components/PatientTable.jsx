import { Table } from "antd";
import React from "react";

const PatientTable = ({ data }) => {
    const getStatusColor = (text) => {
        let statusColor;
        const caseType = text.toLowerCase().includes("normal")
            ? "Normal"
            : text.toLowerCase().includes("benign")
            ? "Benign"
            : text.toLowerCase().includes("malignant")
            ? "Malignant"
            : "Unknown";

        switch (caseType) {
            case "Normal":
                statusColor = "#73d13d"; // Green
                break;
            case "Benign":
                statusColor = "#ffec3d"; // Yellow
                break;
            case "Malignant":
                statusColor = "#f5222d"; // Red
                break;
            case "Unknown":
                statusColor = "#bfbfbf"; // Gray
                break;
            default:
                statusColor = "#000"; // Default color for any undefined status
                break;
        }

        return statusColor;
    };

    const columns = [
        {
            title: "S/N",
            dataIndex: "sn",
            key: "sn",
            width: 10,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: 160,
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age",
            width: 10,
        },
        {
            title: "Gender",
            dataIndex: "gender",
            key: "gender",
            width: 30,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: 160,
        },
        {
            title: "Notes",
            dataIndex: "notes",
            key: "notes",
            width: 120,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: 50,
            render: (text) => {
                const statusColor = getStatusColor(text); // Get the status color dynamically
                return <span style={{ color: statusColor }}>{text}</span>;
            },
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 5 }}
            scroll={{ x: 800 }}
            bordered={false}
        />
    );
};

export default PatientTable;
