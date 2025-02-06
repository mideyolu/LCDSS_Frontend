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

    // Check if data is empty, has no values, or if all values are zero
    if (
        !data ||
        !data.labels ||
        !data.values ||
        data.labels.length === 0 ||
        data.values.length === 0 ||
        data.values.every((value) => value === 0) // Check if all values are 0
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
        <Bar
            style={{ fontFamily: "Roboto" }}
            data={chartData}
            options={options}
            className="flex items-center justify-center sm:h-[120px] sm:w-[100px] md:w-auto md:h-[300px] md:block"
        />
    );
};

export default BarChart;
