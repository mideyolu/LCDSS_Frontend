import {
    HomeOutlined,
    LogoutOutlined,
    RadarChartOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Image, Layout, Menu, Typography } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;
const { Text } = Typography;
const { Item } = Menu;

const Sidebar = ({ onLogout, onCollapseChange, username }) => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState("1"); // Track selected key

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
            width={240}
            className="fixed min-h-screen left-0 top-0 z-[99] transition-all duration-300"
            style={{
                backgroundColor: "#0E3386",
                color: "#fff",
            }}
        >
            <section className="flex items-center justify-center min-h-[30vh] py-4 px-4">
                <Image
                    src="/icon.png"
                    alt="Logo"
                    width={430}
                    className={`${
                        collapsed ? "hidden" : "block "
                    } rounded-full bg-[#0E4675] shadow-md `}
                />
            </section>

            <section className="text-center mb-[1.2rem] text-white">
                <Text className="text-white">
                    {collapsed ? (
                        ""
                    ) : (
                        <div className="">
                            <span className="block my-4">
                                Respirix Dashboard
                            </span>
                            <span className="block">Welcome Back</span>
                        </div>
                    )}
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
