import React from "react";

const ChartAnalytics = ({ sidebarCollapsed }) => {
    return (
        <div
            style={{
                marginLeft: sidebarCollapsed ? "35px" : "150px", // Adjust margin based on sidebar state
                transition: "margin-left 0.3s",
            }}
        >
            <div className="">ChartAnalytics</div>
        </div>
    );
};

export default ChartAnalytics;
