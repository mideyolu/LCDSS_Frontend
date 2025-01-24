import {
    HomeOutlined,
    LogoutOutlined,
    RadarChartOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Button } from "antd";

export const menuItems = (handleNavigate, handleLogout) => [
    {
        key: "1",
        icon: <HomeOutlined />,
        label: "Dashboard",
        onClick: () => handleNavigate("/dashboard", "1"),
    },
    {
        key: "2",
        icon: <UserOutlined />,
        label: <Button>Add Patient</Button>,
        onClick: () => handleNavigate("/detect", "2"),
    },
    {
        key: "3",
        icon: <RadarChartOutlined />,
        label: "Chart Analytics",
        onClick: () => handleNavigate("/chart-dashboard", "3"),
    },
    {
        key: "4",
        icon: <LogoutOutlined />,
        label: "Logout",
        onClick: handleLogout,
    },
];
