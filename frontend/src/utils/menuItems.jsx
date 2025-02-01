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
        style: { color: "white" }, // Ensuring the text is white
    },
    {
        key: "2",
        icon: <UserOutlined />,
        label: <Button type="primary">Add Patient</Button>,
        onClick: () => handleNavigate("/detect", "2"),
        style: { color: "white" }, // Ensuring the text is white
    },
    {
        key: "3",
        icon: <RadarChartOutlined />,
        label: "Chart Analytics",
        onClick: () => handleNavigate("/chart-dashboard", "3"),
        style: { color: "white" }, // Ensuring the text is white
    },
    {
        key: "4",
        icon: <LogoutOutlined />,
        label: "Logout",
        onClick: handleLogout,
        style: { color: "white" }, // Ensuring the text is white
    },
];
