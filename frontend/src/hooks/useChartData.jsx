// src/hooks/useChartData.jsx
import { useState, useEffect } from "react";
import { fetchBarChartData, fetchPieChartData } from "../services/chart"; // Import functions

const useChartData = (chartType) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (chartType === "bar") {
                    await fetchBarChartData(setData, setLoading, setError);
                } else if (chartType === "pie") {
                    await fetchPieChartData(setData, setLoading, setError);
                }
            } catch (e) {
                setError("Failed to load chart data.");
                setLoading(false);
            }
        };

        fetchData();
    }, [chartType]);

    return { data, loading, error };
};

export default useChartData;
