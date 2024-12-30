import React, { useEffect, useState } from "react";
import { message, Typography } from "antd";
import SummaryBox from "../components/SummaryBox";
import PatientTable from "../components/PatientTable";
import SearchBar from "../components/SearchBar";
import NotificationCard from "../components/Notificationcard";
import { IoIosNotificationsOutline } from "react-icons/io";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { handleSearch, fetchData, fetchLogData } from "../api/services"; // Import fetchLogData
import useAuth from "../hooks/useAuth";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Dashboard = ({ sidebarCollapsed }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [summaryData, setSummaryData] = useState([
        { title: "Total Patients", value: 0, color: "#034694" },
        { title: "Normal Case", value: 0, color: "#6CB4EE" },
        { title: "Benign Case", value: 0, color: "#3457D5" },
        { title: "Malignant Case", value: 0, color: "#6495ED" },
    ]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showNotifications, setShowNotifications] = useState(false);
    const [log, setLog] = useState([]);

    // Use the custom hook for authentication check
    useAuth();

    // Fetch log data using modular function
    const fetchLog = () => {
        fetchLogData(setLog, setLoading, setError); // Using fetchLogData from services
    };

    const notifications = log.map((item) => ({
        message: item.action,
        timestamp: item.created_at,
        type: "info",
    }));

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const { Title } = Typography;

    useEffect(() => {
        fetchData(
            setSummaryData,
            setOriginalData,
            setFilteredData,
            setLoading,
            setError,
        );
        fetchLog(); // Fetch the logs as well
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div
            className={`min-h-screen py-2 lg:py-4 p-8 ${
                sidebarCollapsed ? " ml-[40px] md:ml-[70px]" : ""
            }`}
            style={{ transition: "margin-left 0.3s" }}
        >
            <div>
                <div className="mb-8 text-left block md:flex md:items-center md:justify-between">
                    <Title
                        level={3}
                        color="blue-gray"
                        style={{ fontFamily: "Roboto, sans-serif" }}
                    >
                        Respirix Healthcare Provider Dashboard
                    </Title>
                    <div className="flex items-center">
                        <IoIosNotificationsOutline
                            size={20}
                            className="cursor-pointer absolute top-4 right-6 md:relative md:top-0 md:right-0"
                            onClick={toggleNotifications}
                        />
                        {/* <span className="absolute top-0 right-[6%] md:top-3 lg:top-5 lg:right-[4%]">{log.length}</span> */}
                    </div>
                </div>

                {showNotifications && (
                    <NotificationCard
                        notifications={notifications}
                        onClose={() => setShowNotifications(false)}
                    />
                )}
                <div className="md:flex md:items-center md:justify-between">
                    {/* Summary Box */}
                    <div className=" mb-8 w-[80%] md:w-[75%] lg:w-[50%] grid grid-cols-1 md:grid-cols-2 gap-8">
                        {summaryData.map((item, index) => (
                            <SummaryBox
                                key={index}
                                title={item.title}
                                value={item.value}
                                color={item.color}
                            />
                        ))}
                    </div>
                    <div
                        className="hidden lg:flex flex-col gap-4 justify-between mt-7 pt-1 ml-5"
                        style={{ width: "350px", fontSize: "0.55rem" }}
                    >
                        <FullCalendar
                            plugins={[dayGridPlugin]}
                            initialView="dayGridMonth"
                            height={200}
                            className="z-[0]"
                            contentHeight={"10px"}
                            aspectRatio={0.7}
                        />
                    </div>
                </div>
                <div className=" flex-[30%] p-1 mt-[4rem]">
                    <div className=" flex flex-col items-start justify-between md:flex-row md:items-center">
                        <Title level={3} color="blue-gray" className="mb-2">
                            Patient Information
                        </Title>
                        {/* SearchBar */}
                        <SearchBar
                            placeholder="Search by name, email, or status"
                            onSearch={(value) =>
                                handleSearch(
                                    value,
                                    originalData,
                                    setFilteredData,
                                )
                            }
                        />
                    </div>
                    {/* Table */}
                    <PatientTable data={filteredData} />
                </div>
                <div className="my-4">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
