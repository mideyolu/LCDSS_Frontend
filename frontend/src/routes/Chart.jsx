import { Empty, Typography } from "antd";
import React, { useEffect, useState } from "react";
import BarChart from "../components/BarChart";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import PieChart from "../components/PieChart";
import SummaryBox from "../components/SummaryBox";
import useAuth from "../hooks/useAuth"; // Import the custom hook
import { fetchBarChartData, fetchPieChartData } from "../services/chart"; // Import fetch functions

const Chart = ({ sidebarCollapsed }) => {
    const [loading, setLoading] = useState(true);
    const [barChartData, setBarChartData] = useState(null);
    const [pieChartData, setPieChartData] = useState(null);
    const [error, setError] = useState(null);

    const summaryData = [
        { title: "Cases in Nigeria", value: 1789, color: "#6CB4EE" },
        { title: "Annual Death", value: 1643, color: "#034694" },
    ];

    // Use the custom hook for authentication check
    useAuth(); // This will handle token validation and expiration

    const { Title } = Typography;

    useEffect(() => {
        const fetchData = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                await fetchBarChartData(setBarChartData, setLoading, setError);
                await fetchPieChartData(setPieChartData, setLoading, setError);
            } catch (e) {
                setError("Failed to load chart data.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <Typography.Title level={3} style={{ color: "red" }}>
                    {error}
                </Typography.Title>
            </div>
        );
    }

    const isBarChartDataAvailable =
        barChartData &&
        barChartData.values &&
        barChartData.values.some((value) => value > 0);

    const isPieChartDataAvailable =
        pieChartData &&
        (pieChartData.totalFemale > 0 || pieChartData.totalMale > 0);

    const hasData = isBarChartDataAvailable || isPieChartDataAvailable;

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
                        style={{
                            fontFamily: "Roboto, sans-serif",
                        }}
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

            {hasData ? (
                <div className="flex items-center justify-between gap-10 flex-col lg:flex-row min-h-[50vh]">
                    {isPieChartDataAvailable && (
                        <div className="left">
                            <PieChart data={pieChartData} />
                        </div>
                    )}
                    {isBarChartDataAvailable && (
                        <div>
                            <BarChart data={barChartData} />
                        </div>
                    )}
                </div>
            ) : (
                <Empty
                    className="flex flex-col items-center justify-center min-h-[30vh]"
                    style={{ width: "190px" }}
                ></Empty>
            )}

            <div className="my-4">
                <Footer className="mt-[6rem]" />
            </div>
        </div>
    );
};

export default Chart;
