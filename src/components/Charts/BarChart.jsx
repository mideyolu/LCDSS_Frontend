import { Empty } from "antd";
import React from "react";
import { Bar } from "react-chartjs-2";
import useChartData from "../../hooks/useChartData";
import Loader from "../Loader/Loader";

const BarChart = () => {
    const { data, loading, error } = useChartData("bar");

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (
        !data ||
        !data.labels ||
        !data.values ||
        data.labels.length === 0 ||
        data.values.length === 0 ||
        data.values.every((value) => value === 0)
    ) {
        return <Empty description="No data available for the Bar Chart" />;
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
        responsive: true,
        maintainAspectRatio: false,
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
                    family: "Roboto",
                    size: 16,
                },
            },
        },
    };

    return (
        <div className=" md:w-full lg:w-[450px] h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default BarChart;
