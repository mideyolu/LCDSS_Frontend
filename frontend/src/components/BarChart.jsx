import React from "react";
import { Bar } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register Chart.js elements
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

const BarChart = () => {
    const data = {
        labels: ["Category A", "Category B", "Category C"],
        datasets: [
            {
                label: "Database Distribution of Cases", // Add label for the dataset
                data: [992, 999, 993],
                backgroundColor: ["#2c3968", "#36A2EB", "#005A9C"],
                font: {
                    family: "Roboto, sans-serif",
                    size: 16,
                },
            },
        ],
    };

    const options = {
        barPercentage: 0.6,
        categoryPercentage: 0.9,
        scales: {
            y: {
                beginAtZero: true,
                max: 1000,
            },
        },
    };

    return (
        <Bar data={data} options={options} className="h-[150px] md:h-[300px]" />
    );
};

export default BarChart;
