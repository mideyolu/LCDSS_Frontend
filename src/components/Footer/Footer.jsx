import { Layout, Typography } from "antd";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = ({ className }) => {
    const { Text } = Typography;
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
                © {new Date().getFullYear()} Respirix Healthcare Dashboard. All
                rights reserved. <br />
                <strong className="flex mt-3 md:mt-0 items-center gap-5">
                    Made by Project Group 9{" "}
                    <Link to={"https://github.com/mideyolu/LCDSS"}>
                        <FaGithub size={18} style={{ color: "#000" }} />
                    </Link>
                </strong>
            </Text>
        </Layout>
    );
};

export default Footer;
