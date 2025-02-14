import React, { useEffect, useState } from "react";
import { fetchData } from "../services/dashboard";
import { fetchLogData } from "../services/log";

import ChartsSection from "../components/Dashboard/ChartsSection";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import PatientDataSection from "../components/Dashboard/PatientDataSection";
import SummarySection from "../components/Dashboard/SummarySection";
import Footer from "../components/Footer/Footer";
import Loader from "../components/Loader/Loader";
import useAuth from "../hooks/useAuth"
import { userInfo } from "../hooks/userInfo";


const Dashboard = ({ sidebarCollapsed }) => {
    useAuth();
    const { username } = userInfo();

    const [filteredData, setFilteredData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [summaryData, setSummaryData] = useState([
        { title: "Total Patients", value: 0 },
        { title: "Normal Case", value: 0 },
        { title: "Benign Case", value: 0 },
        { title: "Malignant Case", value: 0 },
    ]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showNotifications, setShowNotifications] = useState(false);
    const [log, setLog] = useState([]);
    const [greeting, setGreeting] = useState("Good Morning");

    useEffect(() => {
        fetchData(
            setSummaryData,
            setOriginalData,
            setFilteredData,
            setLoading,
            setError,
        );

        fetchLogData(setLog, setLoading, setError);

        const updateGreeting = () => {
            const hours = new Date().getHours();
            setGreeting(
                hours < 12
                    ? "Good Morning"
                    : hours < 18
                    ? "Good Afternoon"
                    : "Good Evening",
            );
        };
        updateGreeting();
        const intervalId = setInterval(updateGreeting, 60000);
        return () => clearInterval(intervalId);
    }, []);

    if (loading) return <Loader />;
    if (error) return <p className="text-red-500">{error}</p>;

    const toggleNotifications = () => setShowNotifications(!showNotifications);

    return (
        <div
            className={`min-h-screen py-2 lg:py-4 p-8 transition-all duration-300 ${
                sidebarCollapsed
                    ? "ml-[40px] md:ml-[70px]"
                    : "md:ml-[200px] lg:ml-[150px]"
            }`}
        >
            <DashboardHeader
                greeting={greeting}
                username={username}
                showNotifications={showNotifications}
                toggleNotifications={toggleNotifications}
                log={log}
            />
            <SummarySection summaryData={summaryData} />
            <PatientDataSection
                originalData={originalData}
                filteredData={filteredData}
                setFilteredData={setFilteredData}
            />
            <ChartsSection />
            <Footer />
        </div>
    );
};

export default Dashboard;
