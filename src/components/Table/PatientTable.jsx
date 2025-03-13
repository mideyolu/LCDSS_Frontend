import { Table } from "antd";
import React from "react";
import Loader from "../Loader/Loader";

const PatientTable = ({ data, loading }) => {
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
            width: 50,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: 150,
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age",
            width: 80,
        },
        {
            title: "Gender",
            dataIndex: "gender",
            key: "gender",
            width: 80,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: 200,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: 120,
            render: (text) => {
                const statusColor = getStatusColor(text);
                return <span style={{ color: statusColor }}>{text}</span>;
            },
        },
    ];

    return (
        <Table
            className="whitespace-pre"
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 5 }}
            scroll={{ x: 700 }}
            bordered={false}
            loading={loading ? { indicator: <Loader /> } : false}
        />
    );
};

export default PatientTable;
