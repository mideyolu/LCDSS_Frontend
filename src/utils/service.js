import { FaGithub } from "react-icons/fa";

export const service = [
    {
        id: 1,
        img: "/form.png",
        caption: "Form Filling",
        desc: "Quickly input patient details with our streamlined form interface.",
    },
    {
        id: 2,
        img: "/AI.png",
        caption: "AI Image Analyzer",
        desc: "Utilize advanced AI to analyze CT scan images for precise results.",
    },
    {
        id: 3,
        img: "/report.png",
        caption: "Report Generation",
        desc: "Receive comprehensive generated reports on the dashboard.",
    },
];

export const csvHeaders = [
    { label: "S/N", key: "sn" },
    { label: "Name", key: "name" },
    { label: "Age", key: "age" },
    { label: "Gender", key: "gender" },
    { label: "Email", key: "email" },
    { label: "Notes", key: "notes" },
    { label: "Status", key: "status" },
];

export const teamMembers = [
    {
        name: "Oluwuyi Olumide",
        role: "Lead Developer (CTO)",
        description:
            "Building solutions using cutting-edge technologies with strong expertise in backend development and Ds/ML.",
        image: "/ismail.jpg",
    },
    {
        name: "Njoku Mckenzie",
        role: "Machine Learning & Data Analyst",
        description:
            "Specializing in data-driven solutions with expertise in machine learning, data analysis",
        image: "/12.png",
    },
    {
        name: "Achumnu Akachukwu",
        role: "UI/UX Designer",
        description: "Designing intuitive and user-friendly interfaces.",
        image: "/akachukwu.jpg",
    },
];

// Social media links array
export const socialLinks = [
    { icon: FaGithub, url: "https://github.com/mideyolu/LCDSS" },
];
