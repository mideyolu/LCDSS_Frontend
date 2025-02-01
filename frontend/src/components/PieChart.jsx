import { Empty } from "antd"; // Import Empty component from Ant Design
import React from "react";
import { Pie } from "react-chartjs-2";
import useChartData from "../hooks/useChartData"; // Import the custom hook
import Loader from "./Loader";

const PieChart = () => {
    const { data, loading, error } = useChartData("pie");

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    console.log(data);

    // Check if data is empty or invalid
    if (!data || (data.totalMale === 0 && data.totalFemale === 0)) {
        return <Empty description="No data available for the Pie Chart" />;
    }

    const chartData = {
        labels: ["Male", "Female"],
        datasets: [
            {
                label: "Gender Distribution",
                data: [data.totalMale, data.totalFemale],
                backgroundColor: ["#36A2EB", "#034694"],
            },
        ],
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: "Distribution of Gender",
                font: {
                    family: "Roboto, sans-serif",
                    size: 16,
                },
            },
            legend: {
                labels: {
                    font: {
                        family: "Roboto, sans-serif",
                        size: 16,
                    },
                },
            },
        },
    };

    return (
        <Pie
            data={chartData}
            options={options}
            className="h-[150px] md:h-[150px]"
        />
    );
};

export default PieChart;
