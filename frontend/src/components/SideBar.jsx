import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Layout, Typography, Image } from "antd";
import {
    HomeOutlined,
    UserOutlined,
    RadarChartOutlined,
    LogoutOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;
const { Text } = Typography;
const { Item } = Menu;

const Sidebar = ({ onLogout, onCollapseChange }) => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState("1"); // Track selected key
    const [username, setUsername] = useState(""); // State to store the username

    // Get username from localStorage when the component mounts
    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleNavigate = (path, key) => {
        navigate(path);
        setSelectedKey(key); // Set the selected key when navigating
    };

    const handleCollapse = (value) => {
        setCollapsed(value);
        onCollapseChange(value); // Pass the collapse state to the parent
    };

    const handleLogout = () => {
        localStorage.clear("access_token");
        localStorage.clear("id");
        localStorage.clear("username"); // Clear the username as well

        navigate("/onboarding");
    };

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={handleCollapse}
            collapsedWidth="65px"
            className="fixed min-h-screen left-0 top-0 z-[99] transition-all duration-300 w-12 md:w-32 lg:w-48"
            style={{
                backgroundColor: "#0E3386",
                color: "#fff",
            }}
        >
            <section className="flex items-center justify-center min-h-[30vh] py-4 px-4">
                <Image
                    src="/icon.png"
                    alt="Logo"
                    width={230}
                    className={`${
                        collapsed ? "hidden" : "block"
                    } rounded-full bg-[#0E3375] shadow-md `}
                />
            </section>

            <section className="text-center mb-[1.2rem] text-white">
                <Text className="text-white ">
                    {collapsed ? "" : `Welcome Back, ${username}`}
                </Text>
            </section>

            <Menu
                mode="inline"
                className="flex flex-col gap-2 mt-9"
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
        </Sider>
    );
};

export default Sidebar;
