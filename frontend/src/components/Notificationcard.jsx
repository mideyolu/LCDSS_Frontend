import React from "react";
import { Card, List, Typography } from "antd";
import { XOutlined } from "@ant-design/icons";

const { Text } = Typography;

const NotificationCard = ({ notifications, onClose }) => {
    return (
        <Card
            style={{
                position: "absolute",
                zIndex: 80,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                fontFamily: "Robotto, sans-serif",
            }}
            className="w-[60%] top-[5%] right-4 md:w-[30%] lg:w-[25%] md:right-[9%] lg:right-[5%] lg:top-[10%]"
            title="Notifications"
            extra={
                <a onClick={onClose}>
                    <XOutlined />
                </a>
            }
        >
            <List
                style={{
                    fontFamily: "Robotto, sans-serif",
                    
                }}
                dataSource={notifications}
                renderItem={(item) => (
                    <List.Item>
                        <Text>{item}</Text>
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default NotificationCard;
