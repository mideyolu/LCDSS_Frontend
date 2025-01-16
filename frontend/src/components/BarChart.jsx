import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { fetchBarChartData } from "../services/chart"; // Import the service function
import Loader from "./Loader";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Title,
    Legend,
);

const BarChart = ({ sidebarCollapsed }) => {
    const [data, setData] = useState({ labels: [], values: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBarChartData(setData, setLoading, setError); // Fetch data on mount
    }, []);

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
            className="h-[250px] flex items-center justify-center md:h-[300px] md:block"
        />
    );
};

export default BarChart;
