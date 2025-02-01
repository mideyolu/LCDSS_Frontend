// import { chartData } from "../api/api";

// // Function to fetch data for the Bar Chart
// export const fetchBarChartData = async (setData, setLoading, setError) => {
//     try {
//         const response = await chartData(); // Assume this API call fetches chart data
//         setData({
//             labels: ["Normal", "Benign", "Malignant"], // Set chart labels
//             values: [
//                 response.total_normal,
//                 response.total_benign,
//                 response.total_malignant,
//             ], // Map response to values
//         });

//         setLoading(false);
//     } catch (error) {
//         console.error("Error fetching bar chart data:", error);
//         setError("Failed to load bar chart data.");
//         setLoading(false);
//     }
// };

// // Function to fetch data for the Pie Chart
// export const fetchPieChartData = async (setData, setLoading, setError) => {
//     try {
//         const response = await chartData(); // Assume this API call fetches chart data
//         setData({
//             totalFemale: response.total_female,
//             totalMale: response.total_male,
//         });
//         setLoading(false);
//     } catch (error) {
//         console.error("Error fetching pie chart data:", error);
//         setError("Failed to load pie chart data.");
//         setLoading(false);
//     }
// };



import { chartData } from "../api/api"; // Assume this is your API client

// Function to fetch data for the Bar Chart
export const fetchBarChartData = async () => {
    try {
        const response = await chartData(); // Fetch data from the API
        return {
            labels: ["Normal", "Benign", "Malignant"], // Set chart labels
            values: [
                response.total_normal,
                response.total_benign,
                response.total_malignant,
            ], // Map response to values
        };
    } catch (error) {
        console.error("Error fetching bar chart data:", error);
        throw new Error("Failed to load bar chart data.");
    }
};

// Function to fetch data for the Pie Chart
export const fetchPieChartData = async () => {
    try {
        const response = await chartData(); // Fetch data from the API
        return {
            totalFemale: response.total_female,
            totalMale: response.total_male,
        };
    } catch (error) {
        console.error("Error fetching pie chart data:", error);
        throw new Error("Failed to load pie chart data.");
    }
};
