// PieChart.jsx
import React from "react";
import { Pie } from "react-chartjs-2";
import Loader from "./Loader";
import useChartData from "../hooks/useChartData"; // Import the custom hook

const PieChart = () => {
    const { data, loading, error } = useChartData("pie");

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
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
