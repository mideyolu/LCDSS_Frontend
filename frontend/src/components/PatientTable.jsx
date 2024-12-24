import React from "react";
import { Table } from "antd";

const PatientTable = ({ data }) => {
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
            width: 120,
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age",
            width: 30,
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
            width: 80,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: 50,
        },
    ];

    return (
        <Table
            columns={columns}
            className="bg-gray-100  p-2 rounded-md"
            dataSource={data}
            pagination={{ pageSize: 7 }}
            scroll={{ x: 800 }}
            bordered={false}
        />
    );
};

export default PatientTable;
