import { Card, Image, Skeleton } from "antd";
import { motion } from "framer-motion";
import {
    CustomParagraph,
    CustomSubtitle,
} from "../Typography/CustomTypography";
import React, { useState, useEffect } from "react";

const TeamMemberCard = ({ member }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full flex justify-center"
        >
            <Card
                hoverable
                className="shadow-md rounded-xl overflow-hidden p-4 my-6 bg-white w-full max-w-sm mx-auto"
            >
                <Skeleton
                    loading={loading}
                    active
                    avatar={{ size: 96 }}
                    paragraph={{ rows: 0 }}
                >
                    <Image
                        src={member.image}
                        alt={member.name}
                        className="rounded-full w-24 h-24 mx-auto object-cover mb-3"
                        preview={false}
                    />
                </Skeleton>

                <Skeleton loading={loading} active paragraph={{ rows: 0 }}>
                    <CustomSubtitle level={5} className="text-sm">
                        {member.name}
                    </CustomSubtitle>
                </Skeleton>

                <Skeleton loading={loading} active paragraph={{ rows: 0 }}>
                    <CustomParagraph className="text-xs font-semibold text-blue-600">
                        {member.role}
                    </CustomParagraph>
                </Skeleton>

                <Skeleton loading={loading} active paragraph={{ rows: 2 }}>
                    <CustomParagraph className="text-xs leading-tight">
                        {member.description}
                    </CustomParagraph>
                </Skeleton>
            </Card>
        </motion.div>
    );
};

export default TeamMemberCard;
