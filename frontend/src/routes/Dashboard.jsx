import { Button, Calendar, Empty, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { IoIosNotificationsOutline } from "react-icons/io";
import NotificationCard from "../components/Card/Notificationcard";
import BarChart from "../components/Charts/BarChart";
import PieChart from "../components/Charts/PieChart";
import Footer from "../components/Footer/Footer";
import Loader from "../components/Loader/Loader";
import PatientTable from "../components/Table/PatientTable";
import SearchBar from "../components/Searchbar/SearchBar";
import SummaryBox from "../components/SummaryBox";
import useAuth from "../hooks/useAuth";
import { userInfo } from "../hooks/userInfo";
import { fetchData } from "../services/dashboard";
import { fetchLogData } from "../services/log";
import { handleSearch } from "../utils/search";

const Dashboard = ({ sidebarCollapsed }) => {
    const { username } = userInfo();
    const [filteredData, setFilteredData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [greeting, setGreeting] = useState("Good Morning");
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
    const [value, setValue] = useState(new Date());

    // Custom hook for authentication check
    useAuth();

    // Function to fetch log data
    const fetchLog = () => {
        fetchLogData(setLog, setLoading, setError);
    };

    const notifications = log.map((item) => ({
        message: item.action,
        timestamp: item.created_at,
        type: "info",
    }));

    // Toggle notifications visibility
    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    // Update greeting message based on time of day
    const updateGreeting = () => {
        const hours = new Date().getHours();
        if (hours < 12) {
            setGreeting("Good Morning");
        } else if (hours < 18) {
            setGreeting("Good Afternoon");
        } else {
            setGreeting("Good Evening");
        }
    };

    useEffect(() => {
        // Fetch initial data
        fetchData(
            setSummaryData,
            setOriginalData,
            setFilteredData,
            setLoading,
            setError,
        );
        fetchLog();
        updateGreeting(); // Update greeting message on mount

        // Update greeting every minute
        const intervalId = setInterval(updateGreeting, 60 * 1000);
        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    // Custom date cell render for the calendar
    const dateCellRender = (value) => {
        const date = value.format("YYYY-MM-DD");
        const events = notifications.filter(
            (event) => event.timestamp === date,
        );
        return events.length > 0 ? (
            <div className="custom-event">
                <IoIosNotificationsOutline size={16} />
                <span>{events.length} Event</span>
            </div>
        ) : null;
    };

    // CSV headers for patient data export
    const csvHeaders = [
        { label: "S/N", key: "sn" },
        { label: "Name", key: "name" },
        { label: "Age", key: "age" },
        { label: "Gender", key: "gender" },
        { label: "Email", key: "email" },
        { label: "Notes", key: "notes" },
        { label: "Status", key: "status" },
    ];

    return (
        <div
            className={`min-h-screen py-2 lg:py-4 p-8 transition-all duration-300 ${
                sidebarCollapsed
                    ? "ml-[40px] md:ml-[70px]"
                    : "md:ml-[200px] lg:ml-[150px]"
            }`}
            style={{ transition: "margin-left 0.3s" }}
        >
            <div>
                {/* Header section */}
                <div className="mb-8 text-left block md:flex md:items-center md:justify-between">
                    <Typography.Title
                        level={3}
                        color="blue-gray"
                        style={{ fontFamily: "Roboto, sans-serif" }}
                    >
                        {greeting}, {username || "."}
                    </Typography.Title>
                    <div className="flex items-center">
                        <IoIosNotificationsOutline
                            size={20}
                            className="cursor-pointer absolute top-4 right-6 md:relative md:top-0 md:right-0"
                            onClick={toggleNotifications}
                        />
                    </div>
                </div>

                {/* Notification card */}
                {showNotifications && (
                    <NotificationCard
                        notifications={notifications}
                        onClose={() => setShowNotifications(false)}
                    />
                )}

                {/* Summary Boxes and Calendar */}
                <div className="md:flex text-white md:items-center md:justify-between">
                    <div className="mb-8 w-[80%] text-white md:w-[85%] lg:w-[50%] grid grid-cols-1 md:grid-cols-2 gap-8">
                        {summaryData.some((item) => item.value > 0) ? (
                            summaryData.map((item, index) => (
                                <SummaryBox
                                    key={index}
                                    title={item.title}
                                    value={item.value}
                                    color={item.color}
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
                        <Calendar
                            className="mt-[-2rem] w-full max-w-[500px] h-[350px] overflow-hidden"
                            CellRender={dateCellRender}
                        />
                    </div>
                </div>

                {/* Patient Table and Export Section */}
                <div className="flex-[30%] p-1 mt-[4rem]">
                    <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
                        <Typography.Title
                            level={3}
                            color="blue-gray"
                            className="mb-2"
                        >
                            Information
                        </Typography.Title>
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
                    <PatientTable data={filteredData} />

                    {/* Export Button */}
                    <div className="my-4">
                        <Button type="primary">
                            <CSVLink
                                data={filteredData}
                                headers={csvHeaders}
                                filename="patient_data.csv"
                                style={{ color: "white" }}
                            >
                                Export Data
                            </CSVLink>
                        </Button>
                    </div>

                    <div className=" mt-3 md:mt-0 flex items-center justify-between gap-10 flex-col lg:flex-row min-h-[50vh]">
                        <div className="left">
                            <PieChart />
                        </div>
                        <div>
                            <BarChart />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="my-4">
                    <Footer className="mt-[6rem]" />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
