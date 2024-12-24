import React from "react";
import { Layout, Typography } from "antd";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
    const { Text } = Typography;
    return (
        <Layout style={{ background: "#fff" }}>
            <Text
                style={{ color: "gray", fontSize: "14px" }}
                className="flex items-center justify-between"
            >
                © {new Date().getFullYear()} Respirix Healthcare Dashboard. All
                rights reserved. <br />
                <strong className="flex items-center gap-5">
                    Made by Project Group 9{" "}
                    <Link>
                        <FaGithub size={18} style={{color: "#000"}} />
                    </Link>
                </strong>
            </Text>
        </Layout>
    );
};

export default Footer;
