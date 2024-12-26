import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Layout, Typography, Button, Image } from "antd";
import {
    HomeOutlined,
    UserOutlined,
    RadarChartOutlined,
    LogoutOutlined,
    XOutlined,
    MenuOutlined,
} from "@ant-design/icons";
import Cookies from "js-cookie"; // Import js-cookie

const { Sider } = Layout;
const { Text } = Typography;
const { Item } = Menu;

const Sidebar = ({ username, onLogout, onCollapseChange }) => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState("1"); // Track selected key

    useEffect(() => {}, []);

    const handleNavigate = (path, key) => {
        navigate(path);
        setSelectedKey(key); // Set the selected key when navigating
    };

    const handleCollapse = (value) => {
        setCollapsed(value);
        onCollapseChange(value); // Pass the collapse state to the parent
    };

    const handleLogout = () => {
        // Clear cookies
        Cookies.remove("access_token");

        navigate("/");
    };

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={handleCollapse}
            className="fixed min-h-screen left-0 top-0 z-50"
            style={{
                backgroundColor: "#0E3386",
                width: collapsed ? "80px" : "250px", // Adjusted width here
                transition: "width 0.3s ease-in-out", // Smooth transition for width change
                color: "#fff",
            }}
        >
            <section className="flex items-center justify-center min-h-[30vh] py-4 px-4">
                <Image
                    src="/logo.jpg"
                    alt="Logo"
                    width={120}
                    className={`${
                        collapsed ? "hidden" : "block"
                    } rounded-full `}
                    // width={{ width: collapsed ? "30%" : "20%" }}
                />
            </section>

            <section className="text-center mb-[1.2rem] text-white">
                <Text className="text-white ">
                    {collapsed ? "" : " Welcome Back"}
                </Text>
            </section>

            <Menu
                mode="inline"
                selectedKeys={[selectedKey]} // Ensure the selected key updates
                style={{
                    backgroundColor: "#0E3386",
                    color: "white", // Ensure the text is white
                }}
            >
                <Item
                    key="1"
                    icon={<HomeOutlined />}
                    onClick={() => handleNavigate("/dashboard", "1")}
                    style={{
                        backgroundColor:
                            selectedKey === "1" ? "black" : "transparent", // Change background for selected item
                    }}
                >
                    <span
                        style={{
                            color: selectedKey === "1" ? "white" : "white",
                        }}
                    >
                        Dashboard
                    </span>
                </Item>
                <Item
                    key="2"
                    icon={<UserOutlined />}
                    onClick={() => handleNavigate("/detect", "2")}
                    style={{
                        backgroundColor:
                            selectedKey === "2" ? "black" : "transparent", // Change background for selected item
                    }}
                >
                    <span
                        style={{
                            color: selectedKey === "2" ? "white" : "white",
                        }}
                    >
                        Add Patient
                    </span>
                </Item>
                <Item
                    key="3"
                    icon={<RadarChartOutlined />}
                    onClick={() => handleNavigate("/chart-dashboard", "3")}
                    style={{
                        backgroundColor:
                            selectedKey === "3" ? "black" : "transparent", // Change background for selected item
                    }}
                >
                    <span
                        style={{
                            color: selectedKey === "3" ? "white" : "white",
                        }}
                    >
                        Chart Analytics
                    </span>
                </Item>
                <Item
                    key="4"
                    icon={<LogoutOutlined />}
                    onClick={() => handleLogout()}
                    style={{
                        backgroundColor:
                            selectedKey === "4" ? "black" : "transparent", // Change background for selected item
                    }}
                >
                    <span
                        style={{
                            color: selectedKey === "4" ? "white" : "white",
                        }}
                    >
                        Logout
                    </span>
                </Item>
            </Menu>

            {/* <div style={{ textAlign: "center", marginTop: "auto" }}>
                <Button
                    type="link"
                    style={{ color: "white" }}
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {collapsed ? <MenuOutlined /> : <XOutlined />}
                </Button>
            </div> */}
        </Sider>
    );
};

export default Sidebar;
