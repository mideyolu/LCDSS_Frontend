// Chart.jsx
import { Typography } from "antd";
import React, { useState } from "react";
import BarChart from "../components/BarChart";
import Footer from "../components/Footer";
import PieChart from "../components/PieChart";
import SummaryBox from "../components/SummaryBox";
import useAuth from "../hooks/useAuth"; // Import the custom hook

const Chart = ({ sidebarCollapsed }) => {
    const [error, setError] = useState(null);

    // Sample data
    const summaryData = [
        { title: "Cases in Nigeria", value: 1789, color: "#6CB4EE" },
        { title: "Annual Death", value: 1643, color: "#034694" },
    ];

    useAuth(); // Handle token validation

    const { Title } = Typography;

    return (
        <div
            className={`min-h-screen py-2 lg:py-4 p-8 ${
                sidebarCollapsed
                    ? "ml-[40px] md:ml-[70px]"
                    : "md:ml-[200px] lg:ml-[150px]"
            }`}
            style={{ transition: "margin-left 0.3s" }}
        >
            <div className="top">
                <div className="mb-8 text-left block md:flex md:items-center md:justify-between">
                    <Title
                        level={3}
                        color="blue-gray"
                        style={{ fontFamily: "Roboto, sans-serif" }}
                    >
                        Chart Analytics Dashboard
                    </Title>
                </div>

                {/* Summary Box */}
                <div className="mb-8 w-[80%] md:w-[85%] lg:w-[50%] grid grid-cols-1 md:grid-cols-2 gap-8">
                    {summaryData.map((item, index) => (
                        <SummaryBox
                            key={index}
                            title={item.title}
                            value={item.value}
                            color={item.color}
                        />
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between gap-10 flex-col lg:flex-row min-h-[50vh]">
                <div className="left">
                    <PieChart />
                </div>
                <div>
                    <BarChart />
                </div>
            </div>

            <div className="my-4">
                <Footer className="mt-[6rem]" />
            </div>
        </div>
    );
};

export default Chart;
