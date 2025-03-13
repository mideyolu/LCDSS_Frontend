import { Layout, Typography } from "antd";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Footer = ({ className }) => {
    const { Text } = Typography;
    const location = useLocation(); // Get current route

    const isDashboard = location.pathname === "/dashboard"; // Check if user is on dashboard

    return (
        <Layout
            style={{
                background: "#fff",
            }}
            className={`${className}`}
        >
            <Text
                style={{
                    color: "gray",
                    fontSize: "14px",
                }}
                className="flex flex-col text-center md:flex-row items-center justify-between"
            >
                © {new Date().getFullYear()} Respirix Healthcare. All rights
                reserved. <br />
                {isDashboard && ( // Conditionally render if on /dashboard
                    <strong className="flex mt-3 md:mt-0 items-center gap-5">
                        Dashboard | Made by Project Group 9{" "}
                        <Link to={"https://github.com/mideyolu/LCDSS"}>
                            <FaGithub size={18} style={{ color: "#000" }} />
                        </Link>
                    </strong>
                )}
            </Text>
        </Layout>
    );
};

export default Footer;
