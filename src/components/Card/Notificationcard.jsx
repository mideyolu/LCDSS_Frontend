import { XOutlined } from "@ant-design/icons";
import { Card, List, Typography } from "antd";
import React from "react";

const { Text } = Typography;

const NotificationCard = ({ notifications, onClose }) => {
    return (
        <Card
            style={{
                position: "absolute",
                zIndex: 80,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                fontFamily: "Robtto",
            }}
            className="w-[95%] top-[30%] md:top-[100%] right-[-25%] sm:w-[35%] md:w-[50%] lg:w-[25%] md:right-[-2%] lg:right-[0%] lg:top-[70%]"
            title="Notifications"
            extra={
                <a onClick={onClose}>
                    <XOutlined />
                </a>
            }
        >
            <List
                style={{
                    fontFamily: "Robotto",
                }}
                dataSource={notifications}
                renderItem={(item) => (
                    <List.Item>
                        <Text style={{ fontFamily: "Robtto" }}>
                            {item.message}
                        </Text>{" "}
                        {/* Access the 'message' property */}
                        <br />
                        <Text style={{ fontFamily: "Robtto" }} type="secondary">
                            {item.timestamp}
                        </Text>{" "}
                        {/* Access the 'timestamp' property */}
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default NotificationCard;
