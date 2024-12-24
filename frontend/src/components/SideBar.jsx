import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Layout, Typography, Button, Image } from "antd";
import {
    HomeOutlined,
    UserOutlined,
    RadarChartOutlined,
    LogoutOutlined,
    MenuOutlined,
    XOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;
const { Text } = Typography;

const Sidebar = ({ username, onLogout, onCollapseChange }) => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {}, []);

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleCollapse = (value) => {
        setCollapsed(value);
        onCollapseChange(value); // Pass the collapse state to the parent
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        navigate("/");
    };

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={handleCollapse}
            className="fixed min-h-screen left-0 top-0 z-50 "
            style={{
                backgroundColor: "#001529",
                width: collapsed ? "80px" : "1300px",
                transition: "width 0.3s",
            }}
        >
            <section className="flex items-center justify-center min-h-[30vh] py-4 px-4">
                <Image
                    // src="/logo.jpg"
                    alt="Logo"
                    className={`${
                        collapsed ? "hidden" : " rounded-3xl w-12 text-white"
                    }`}
                    width={{ width: collapsed ? "50%" : "60%" }}
                />
            </section>

            <section className="text-center mb-[1.2rem] text-white">
                <Text className="text-white ">
                    {collapsed ? "" : " Welcome Back"}
                    {/* {username.charAt(0).toUpperCase() + username.slice(1)} */}
                </Text>
            </section>

            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["1"]}
                items={[
                    {
                        key: "1",
                        icon: <HomeOutlined />,
                        label: "Dashboard",
                        onClick: () => handleNavigate("/dashboard"),
                    },
                    {
                        key: "2",
                        icon: <UserOutlined />,
                        label: "Add Patient",
                        onClick: () => handleNavigate("/detect"),
                    },
                    {
                        key: "3",
                        icon: <RadarChartOutlined />,
                        label: "Chart Analytics",
                        onClick: () => handleNavigate("/chart-dashboard"),
                    },
                    {
                        key: "4",
                        icon: <LogoutOutlined />,
                        label: "Logout",
                        onClick: handleLogout,
                    },
                ].filter(Boolean)}
            />

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
