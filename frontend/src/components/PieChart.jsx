import React from "react";
import { Pie } from "react-chartjs-2";

import {
    Chart as ChartJS,
    ArcElement, // Import ArcElement for Pie charts
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
    ArcElement, // Register ArcElement for Pie charts
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

const PieChart = () => {
    const data = {
        labels: ["Male", "Female"],
        datasets: [
            {
                label: "Gender Distribution",
                data: [30, 40],
                backgroundColor: ["#034694", "#36A2EB"],
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                max: 1000,
            },
        },
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
        <Pie data={data} options={options} className="h-[150px] md:h-[200px]" />
    );
};

export default PieChart;
