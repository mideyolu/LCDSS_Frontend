import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import SummaryBox from "../components/SummaryBox"; // Import the reusable component
import PatientTable from "../components/PatientTable";
import { patientData } from "../api/services";
import SearchBar from "../components/SearchBar";
import NotificationCard from "../components/Notificationcard";
import { IoIosNotificationsOutline } from "react-icons/io";
import Footer from "../components/Footer";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Dashboard = ( { sidebarCollapsed } ) => {
    const navigate = useNavigate()
    const [totalPatient, setTotalPatient] = useState(10);
    const [filteredData, setFilteredData] = useState(patientData);
    const [showNotifications, setShowNotifications] = useState(false);

    const summaryData = [
        {
            title: "Total Patients",
            value: totalPatient,
            color: "#034694",
        },
        { title: "Normal Case", value: 5, color: "#6CB4EE" },
        { title: "Benign Case", value: 2, color: "#3457D5" },
        { title: "Malignant Case", value: 8, color: "#6495ED" },
    ];

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const notifications = [
        "New patient admitted",
        "Report uploaded",
        "Discharge completed",
        "Reminder: Weekly meeting",
    ];

    const { Title } = Typography;

    // Handle search functionality
    const handleSearch = (value) => {
        if (value) {
            const searchResult = patientData.filter((patient) =>
                Object.values(patient)
                    .join(" ")
                    .toLowerCase()
                    .includes(value.toLowerCase()),
            );
            setFilteredData(searchResult);
        } else {
            setFilteredData(patientData); // Reset to full data if search is cleared
        }
    };

    // Check if the user is authenticated
    useEffect(() => {
        const token = Cookies.get("access_token"); // Retrieve the access token from cookies
        if (!token) {
            // Show a toast and redirect to login if no token is found
            toast.error("You need to log in to access the dashboard.");
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div
            className="min-h-screen py-2 lg:py-4 p-8"
            style={{
                marginLeft: sidebarCollapsed ? "35px" : "150px", // Adjust margin based on sidebar state
                transition: "margin-left 0.3s",
            }}
        >
            <div className="">
                <div className="mb-8 text-left md:flex md:items-center md:justify-between">
                    <Title level={3} color="blue-gray">
                        Respirix Healthcare Provider Dashboard
                    </Title>
                    <IoIosNotificationsOutline
                        size={20}
                        className="cursor-pointer absolute top-10 right-0 md:relative md:top-0 md:right-0"
                        onClick={toggleNotifications}
                    />
                </div>
                {showNotifications && (
                    <NotificationCard
                        notifications={notifications}
                        onClose={() => setShowNotifications(false)}
                    />
                )}
                <div className="">
                    {/* Summary Box */}
                    <div
                        className={` mb-8 w-full grid grid-cols-1 md:grid-cols-2 gap-8`}
                    >
                        {summaryData.map((item, index) => (
                            <SummaryBox
                                key={index}
                                title={item.title}
                                value={item.value}
                                color={item.color}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className=" flex-[30%] p-1">
                <div className=" flex flex-col items-start justify-between md:flex-row md:items-center">
                    <Title level={3} color="blue-gray" className="mb-2">
                        Patient Information
                    </Title>

                    {/* SearchBar */}
                    <SearchBar
                        placeholder="Search by name, email, or status"
                        onSearch={handleSearch}
                    />
                </div>
                {/*Table */}
                <PatientTable data={filteredData} />
            </div>
            {/*
            <div className="">
                <div className="left">1</div>
                <div className="right">2</div>
            </div> */}

            <div className="my-4">
                <Footer />
            </div>
        </div>
    );
};

export default Dashboard;
