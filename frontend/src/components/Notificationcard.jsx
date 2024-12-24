import React from "react";
import { Card, List, Typography } from "antd";
import { XOutlined } from "@ant-design/icons";

const { Text } = Typography;

const NotificationCard = ({ notifications, onClose }) => {
    return (
        <Card
            style={{
                position: "absolute",
                zIndex: 1000,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
            className="w-[40%] right-1 md:w-[30%] lg:w-[25%] md:right-[8%] lg:right-[8%] lg:top-[10%]"
            title="Notifications"
            extra={
                <a onClick={onClose}>
                    <XOutlined />
                </a>
            }
        >
            <List
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
