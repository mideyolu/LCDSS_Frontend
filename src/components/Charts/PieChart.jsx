import { Empty } from "antd"; // Import Empty component from Ant Design
import React from "react";
import { Pie } from "react-chartjs-2";
import useChartData from "../../hooks/useChartData";
import Loader from "../Loader/Loader";

const PieChart = () => {
    const { data, loading, error } = useChartData("pie");

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

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
            },
        },
    };

    return (
        <Pie
            data={chartData}
            options={options}
            style={{
                fontFamily: "Robotto",
            }}
            className="h-[150px] md:h-[150px]"
        />
    );
};

export default PieChart;
