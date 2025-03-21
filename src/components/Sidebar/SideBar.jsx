import { Image, Layout, Menu, Typography } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userInfo } from "../../hooks/userInfo";
import { handleLogout } from "../../utils/logout";
import { menuItems } from "../../utils/menuItems";

const { Sider } = Layout;
const { Text } = Typography;

// Constants for path mapping and styles
const PATH_TO_KEY_MAP = {
    "/dashboard": "1",
    "/detect": "2",
};

const SIDER_STYLE = {
    backgroundColor: "#0E3386",
    color: "#fff",
};

const MENU_STYLE = {
    color: "white",
};

const Sidebar = ({ collapsed, setCollapsed }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { fullname, email } = userInfo();
    const [selectedKey, setSelectedKey] = useState("");

    // Memoized navigation handler
    const handleNavigate = useCallback(
        (path, key) => {
            navigate(path);
            setSelectedKey(key);
        },
        [navigate, setSelectedKey],
    );

    // Memoized menu items
    const items = useMemo(
        () => menuItems(handleNavigate, () => handleLogout(navigate)),
        [handleNavigate, navigate],
    );

    // Update selected key based on route
    useEffect(() => {
        setSelectedKey(PATH_TO_KEY_MAP[location.pathname] || "1");
    }, [location.pathname]);

    // Memoized user info section
    const userInfoSection = useMemo(
        () => (
            <div>
                <span className="block my-4">Respirix Dashboard</span>
                <span className="block my-4">{fullname}</span>
                <span className="mb-4 bg-[#0E4675] py-1 flex items-center justify-center">
                    {email}
                </span>
                <span className="block">Welcome Back</span>
            </div>
        ),
        [fullname, email],
    );

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            width={220}
            collapsedWidth={70}
            className="fixed min-h-[110vh] left-0 top-0 z-[99] transition-all duration-300"
            style={SIDER_STYLE}
        >
            <section className="flex items-center justify-center min-h-[30vh] py-4 px-4">
                <Image
                    src="/icon.png"
                    alt="Logo"
                    preview={false}
                    width={430}
                    className={`rounded-full bg-[#0E4675] shadow-md ${
                        collapsed ? "hidden" : "block"
                    }`}
                />
            </section>

            <section className="text-center mb-[1.2rem] text-white">
                <Text className="text-white">
                    {!collapsed && userInfoSection}
                </Text>
            </section>

            <div>
                <Menu
                    mode="inline"
                    className="flex flex-col gap-2 mt-9 bg-[#0E3386]"
                    selectedKeys={[selectedKey]}
                    items={items}
                    style={MENU_STYLE}
                    theme="dark"
                />
            </div>
        </Sider>
    );
};

export default React.memo( Sidebar );
