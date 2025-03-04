import { logData } from "../api/api";

// Function to fetch data for the Log
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
