import { Skeleton } from "antd";
import { useState, useEffect } from "react";
import PieChart from "../Charts/PieChart";
import BarChart from "../Charts/BarChart";

const ChartsSection = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate data fetching
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="mt-3 md:mt-0 flex items-center justify-between gap-10 flex-col lg:flex-row min-h-[50vh]">
            <div className="left">
                {loading ? (
                    <Skeleton.Image active size={200} shape="circle" />
                ) : (
                    <PieChart />
                )}
            </div>
            <div>
                {loading ? (
                    <Skeleton.Image active paragraph={{ rows: 6 }} />
                ) : (
                    <BarChart />
                )}
            </div>
        </div>
    );
};

export default ChartsSection;
