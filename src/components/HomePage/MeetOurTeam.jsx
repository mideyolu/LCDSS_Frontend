import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Skeleton } from "antd";
import { teamMembers } from "../../utils/service";
import TeamMemberCard from "../Card/TeamMemberCard";
import { CustomParagraph, CustomTitle } from "../Typography/CustomTypography";

// Responsive breakpoints
const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 3 },
    desktop: { breakpoint: { max: 1024, min: 768 }, items: 2 },
    tablet: { breakpoint: { max: 768, min: 480 }, items: 1 },
    mobile: { breakpoint: { max: 480, min: 0 }, items: 1 },
};

// 🟣 Main Component
const MeetOurTeam = ({ teamRef }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section
            ref={teamRef}
            className="pt-20 pb-10 px-6 md:px-16 mb-[3rem] text-center w-full"
        >
            {/* Title with Skeleton */}
            <Skeleton loading={loading} active paragraph={{ rows: 0 }}>
                <CustomTitle className="mb-4">Meet Our Team</CustomTitle>
            </Skeleton>

            {/* Description with Skeleton */}
            <Skeleton loading={loading} active paragraph={{ rows: 2 }}>
                <CustomParagraph className="mb-6 text-sm md:text-base">
                    A passionate group of experts dedicated to AI-powered
                    healthcare solutions.
                </CustomParagraph>
            </Skeleton>

            {/* Responsive Carousel */}
            <div className="max-w-5xl mx-auto w-full">
                {loading ? (
                    <div className="flex justify-center gap-4">
                        {[...Array(3)].map((_, index) => (
                            <Skeleton.Button
                                key={index}
                                active
                                shape="round"
                                size="large"
                                style={{ width: "250px", height: "180px" }}
                            />
                        ))}
                    </div>
                ) : (
                    <Carousel
                        responsive={responsive}
                        infinite
                        autoPlay
                        autoPlaySpeed={2000}
                        showDots
                        arrows={false}
                        containerClass="w-full"
                    >
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className="flex justify-center w-full px-2 hover:scale-105 transition-all duration-100"
                            >
                                <TeamMemberCard member={member} />
                            </div>
                        ))}
                    </Carousel>
                )}
            </div>
        </section>
    );
};

export default MeetOurTeam;
