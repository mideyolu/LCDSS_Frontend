import { Typography, Skeleton } from "antd";
import { IoIosNotificationsOutline } from "react-icons/io";
import NotificationCard from "../Card/Notificationcard";
import { useState, useEffect } from "react";

const DashboardHeader = ({
    greeting,
    username,
    showNotifications,
    toggleNotifications,
    log,
}) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate data fetching
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const notifications = log.map((item) => ({
        message: item?.action || "No action specified",
        timestamp: item?.created_at || new Date().toISOString(),
        type: "info",
    }));

    const { Title } = Typography;

    return (
        <div className=" mt-[10%] md:mt-0 mb-8 text-left block md:flex md:items-center md:justify-between relative">
            {loading ? (
                <Skeleton.Input active size="large" className="w-[200px]" />
            ) : (
                <Title level={3}>
                    {greeting}, {username || "."}
                </Title>
            )}
            <div className="absolute top-[-100%] right-[-30%] md:flex md:relative md:items-center md:top-0 md:right-0  ">
                {loading ? (
                    <Skeleton.Avatar active size="small" shape="circle" />
                ) : (
                    <IoIosNotificationsOutline
                        size={20}
                        className="cursor-pointer absolute top-4 right-6 md:relative md:top-0 md:right-0"
                        onClick={toggleNotifications}
                    />
                )}
            </div>
            {showNotifications && !loading && (
                <NotificationCard
                    notifications={notifications}
                    onClose={toggleNotifications}
                />
            )}
        </div>
    );
};

export default DashboardHeader;
