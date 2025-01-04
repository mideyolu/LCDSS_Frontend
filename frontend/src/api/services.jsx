// services.js
import { toast } from "react-toastify";
import {
    chartData,
    logData,
    predict,
    registerPatient,
    registerResults,
} from "../api/api";



// Function to fetch data for the Bar Chart
export const fetchBarChartData = async (setData, setLoading, setError) => {
    try {
        const response = await chartData(); // Assume this API call fetches chart data
        setData({
            labels: ["Normal", "Benign", "Malignant"], // Set chart labels
            values: [
                response.total_normal,
                response.total_benign,
                response.total_malignant,
            ], // Map response to values
        });

        setLoading(false);
    } catch (error) {
        console.error("Error fetching bar chart data:", error);
        setError("Failed to load bar chart data.");
        setLoading(false);
    }
};

// Function to fetch data for the Pie Chart
export const fetchPieChartData = async (setData, setLoading, setError) => {
    try {
        const response = await chartData(); // Assume this API call fetches chart data
        setData({
            totalMale: response.total_male,
            totalFemale: response.total_female,
        });
        setLoading(false);
    } catch (error) {
        console.error("Error fetching pie chart data:", error);
        setError("Failed to load pie chart data.");
        setLoading(false);
    }
};


export const fetchLogData = async (setLog, setLoading, setError) => {
    try {
        const response = await logData();
        setLog(response);
        setLoading(false);
    } catch (error) {
        setError("Failed to load logs.");
        setLoading(false);
    }
};
