import React, { useEffect, useState } from "react";
import SummaryBox from "../components/SummaryBox";
import { Typography } from "antd";
import Footer from "../components/Footer";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import useAuth from "../hooks/useAuth"; // Import the custom hook
import Loader from "../components/Loader";

const Chart = ({ sidebarCollapsed }) => {
    const [loading, setLoading] = useState(true);
    const summaryData = [
        { title: "Cases in Nigeria", value: 1789, color: "#6CB4EE" },
        { title: "Annual Death", value: 1643, color: "#034694" },
    ];

    // Use the custom hook for authentication check
    useAuth(); // This will handle token validation and expiration

    const { Title } = Typography;

    useEffect(() => {
        // Simulate a loading process (or replace this with actual data fetching)
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer); // Cleanup on component unmount
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div
            className={`min-h-screen py-2 lg:py-4 p-8 ${
                sidebarCollapsed ? " ml-[60px] md:ml-[70px]" : ""
            } `}
            style={{
                transition: "margin-left 0.3s",
            }}
        >
            <div className="top">
                <div className="mb-8 text-left block md:flex md:items-center md:justify-between">
                    <Title
                        level={3}
                        color="blue-gray"
                        style={{
                            fontFamily: "Roboto, sans-serif",
                        }}
                    >
                        Chart Analytics Dashboard
                    </Title>
                </div>
                {/* Summary Box */}
                <div className="mb-8 w-[55%] grid grid-cols-1 md:grid-cols-2 gap-8">
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

            <div className="flex items-center justify-between gap-10 flex-col lg:flex-row min-h-[70vh]">
                <div className="left">
                    <PieChart />
                </div>

                <div className="right">
                    <BarChart />
                </div>
            </div>

            <div className="bottom md:mt-[5rem]">
                <Footer />
            </div>
        </div>
    );
};

export default Chart;
