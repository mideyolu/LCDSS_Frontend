import { Calendar, Empty, Skeleton } from "antd";
import SummaryBox from "../Summary/SummaryBox";
import { useState, useEffect } from "react";

const SummarySection = ({ summaryData, dateCellRender }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate data fetching
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="md:flex text-black md:items-center md:justify-between">
            <div className="mb-8 w-[80%] text-black md:w-[85%] lg:w-[50%] grid grid-cols-1 md:grid-cols-2 gap-8">
                {loading ? (
                    <Skeleton active paragraph={{ rows: 4 }} />
                ) : summaryData.some((item) => item.value > 0) ? (
                    summaryData.map((item, index) => (
                        <SummaryBox
                            key={index}
                            title={item.title}
                            value={item.value}
                            color={"#034694"}
                        />
                    ))
                ) : (
                    <Empty
                        className="flex flex-col items-center justify-center min-h-[30vh]"
                        style={{ width: "190px" }}
                    />
                )}
            </div>
            <div className="hidden w-[350px] text-[0.55rem] lg:flex flex-col gap-4 justify-between mt-7 pt-1">
                {loading ? (
                    <Skeleton active paragraph={{ rows: 4 }} />
                ) : (
                    <Calendar
                        className="mt-[-2rem] w-full max-w-[500px] h-[350px] overflow-hidden"
                        cellRender={dateCellRender}
                    />
                )}
            </div>
        </div>
    );
};

export default SummarySection;
