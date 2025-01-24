// BarChart.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import Loader from "./Loader";
import useChartData from "../hooks/useChartData"; // Import the custom hook

const BarChart = () => {
    const { data, loading, error } = useChartData("bar");

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: "Bar Chart Data",
                data: data.values,
                backgroundColor: ["#2c3968", "#36A2EB", "#005A9C"],
            },
        ],
    };

    const options = {
        barPercentage: 0.6,
        categoryPercentage: 0.9,
        scales: {
            y: {
                beginAtZero: true,
                max: 10,
            },
        },
        plugins: {
            title: {
                display: true,
                text: "Distribution of Cases",
                font: {
                    family: "Roboto, sans-serif",
                    size: 16,
                },
            },
        },
    };

    return (
        <Bar
            data={chartData}
            options={options}
            className="flex items-center justify-center sm:h-[120px] sm:w-[100px] md:w-auto md:h-[300px] md:block"
        />
    );
};

export default BarChart;
