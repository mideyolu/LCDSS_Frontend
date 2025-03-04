import { useState, useEffect } from "react";
import { fetchBarChartData, fetchPieChartData } from "../services/chart";

const useChartData = (chartType) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let fetchedData;

                if (chartType === "bar") {
                    fetchedData = await fetchBarChartData();
                } else if (chartType === "pie") {
                    fetchedData = await fetchPieChartData();
                }

                if (!fetchedData) {
                    throw new Error("No data available.");
                }

                setData(fetchedData);
                setError(null); // Clear any previous error
            } catch (err) {
                setError(err.message);
                setData(null); // Clear any previous data
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [chartType]);

    return { data, loading, error };
};

export default useChartData;
