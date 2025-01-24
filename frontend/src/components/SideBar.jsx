import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../api/api";

import { Image, Layout, Menu, Typography } from "antd";
import { menuItems } from "../utils/menuItems";

const { Sider } = Layout;
const { Text } = Typography;

const Sidebar = ({ onCollapseChange, fullname, email }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState("");

    // Update selected key based on the current route
    useEffect(() => {
        const pathToKeyMap = {
            "/dashboard": "1",
            "/detect": "2",
            "/chart-dashboard": "3",
        };
        setSelectedKey(pathToKeyMap[location.pathname] || "1");
    }, [location.pathname]);

    const handleNavigate = (path, key) => {
        navigate(path);
        setSelectedKey(key);
    };

    const handleCollapse = (value) => {
        setCollapsed(value);
        onCollapseChange(value);
    };

    const handleLogout = async () => {
        try {
            const response = await logout();
            toast.success(`${response}`);
            navigate("/onboarding");
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error("An error occurred while logging out.");
        }
    };

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={handleCollapse}
            collapsedWidth="65px"
            width={270}
            className="fixed min-h-[100vh] left-0 top-0 z-[99] transition-all duration-300"
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
                        collapsed ? "hidden" : "block"
                    } rounded-full bg-[#0E4675] shadow-md`}
                />
            </section>

            <section className="text-center mb-[1.2rem] text-white">
                <Text className="text-white">
                    {collapsed ? (
                        ""
                    ) : (
                        <div>
                            <span className="block my-4">
                                Respirix Dashboard
                            </span>
                            <span className="block my-4">{fullname}</span>
                            <span className="mb-4 bg-[#0E4675] py-1 flex items-center justify-center">
                                {email}
                            </span>
                            <span className="block">Welcome Back</span>
                        </div>
                    )}
                </Text>
            </section>

            <Menu
                mode="inline"
                className="flex flex-col gap-2 mt-9"
                selectedKeys={[selectedKey]}
                style={{
                    backgroundColor: "#0E3386",
                    color: "white",
                }}
                items={menuItems(handleNavigate, handleLogout)} // Pass handlers to menuItems
            />
        </Sider>
    );
};

export default Sidebar;
