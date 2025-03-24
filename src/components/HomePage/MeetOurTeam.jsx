import { Card, Image } from "antd";
import { motion } from "framer-motion";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"; // Import carousel styles
import {
    CustomParagraph,
    CustomSubtitle,
    CustomTitle,
} from "../Typography/CustomTypography";

const teamMembers = [
    {
        name: "Oluwuyi Olumide",
        role: "Lead Developer (CTO)",
        description:
            "Building solutions using cutting-edge technologies with strong expertise in backend development and machine learning.",
        image: "/ismail.jpg",
    },
    {
        name: "John Smith",
        role: "Full-Stack Engineer",
        description: "Developing robust and scalable AI solutions.",
        image: "/AI.png",
    },
    {
        name: "Alice Johnson",
        role: "UI/UX Designer",
        description: "Designing intuitive and user-friendly interfaces.",
        image: "/icon.png",
    },
];

// Responsive breakpoints
const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 3 },
    desktop: { breakpoint: { max: 1024, min: 768 }, items: 2 },
    tablet: { breakpoint: { max: 768, min: 480 }, items: 1 },
    mobile: { breakpoint: { max: 480, min: 0 }, items: 1 },
};

const MeetOurTeam = ({ teamRef }) => {
    return (
        <section
            ref={teamRef}
            className="pt-20 pb-10 px-6 md:px-16 mb-[3rem] text-center w-full"
        >
            <CustomTitle className="mb-4">Meet Our Team</CustomTitle>
            <CustomParagraph className="mb-6 text-sm md:text-base">
                A passionate group of experts dedicated to AI-powered healthcare
                solutions.
            </CustomParagraph>

            {/* Responsive Carousel */}
            <div className="max-w-5xl mx-auto w-full">
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
                        <div key={index} className="flex justify-center w-full">
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
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        className="rounded-full w-24 h-24 mx-auto object-cover mb-3"
                                        preview={false}
                                    />
                                    <CustomSubtitle
                                        level={5}
                                        className="text-sm"
                                    >
                                        {member.name}
                                    </CustomSubtitle>
                                    <CustomParagraph className="text-xs font-semibold text-blue-600">
                                        {member.role}
                                    </CustomParagraph>
                                    <CustomParagraph className="text-xs leading-tight">
                                        {member.description}
                                    </CustomParagraph>
                                </Card>
                            </motion.div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </section>
    );
};

export default MeetOurTeam;
