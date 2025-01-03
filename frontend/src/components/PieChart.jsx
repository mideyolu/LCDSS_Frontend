import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from "chart.js";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { fetchPieChartData } from "../api/services"; // Import the service function
import Loader from "./Loader";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = () => {
    const [data, setData] = useState({ totalMale: 0, totalFemale: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPieChartData(setData, setLoading, setError); // Fetch data on mount
    }, []);

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
