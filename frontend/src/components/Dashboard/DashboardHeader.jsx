import { Typography } from "antd";
import { IoIosNotificationsOutline } from "react-icons/io";
import NotificationCard from "../Card/Notificationcard";

const DashboardHeader = ({
    greeting,
    username,
    showNotifications,
    toggleNotifications,
    log,
}) => {
    const notifications = log.map((item) => ({
        message: item?.action || "No action specified",
        timestamp: item?.created_at || new Date().toISOString(),
        type: "info",
    }));

    const { Title } = Typography;

    return (
        <div className="mb-8 text-left block md:flex md:items-center md:justify-between">
            <Title level={3} style={{ fontFamily: "Robotto" }}>
                {greeting}, {username || "."}
            </Title>
            <div className="flex items-center">
                <IoIosNotificationsOutline
                    size={20}
                    className="cursor-pointer absolute top-4 right-6 md:relative md:top-0 md:right-0"
                    onClick={toggleNotifications}
                />
            </div>
            {showNotifications && (
                <NotificationCard
                    notifications={notifications}
                    onClose={toggleNotifications}
                />
            )}
        </div>
    );
};

export default DashboardHeader;
