import { MenuOutlined, XOutlined } from "@ant-design/icons";
import { Button, Image, Skeleton } from "antd";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomParagraph } from "../Typography/CustomTypography";

const Navbar = ({ faqRef, featuresRef }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true); // Skeleton state

    useEffect(() => {
        // Simulating a loading delay (e.g., fetching user info, etc.)
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const reDirect = () => navigate("/onboarding");
    const menu = () => setOpen((prev) => !prev);

    const scrollToSection = (ref, e) => {
        e.preventDefault();
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <nav className="flex items-center justify-between px-6 md:px-16">
            {/* Logo Section */}
            <Link to={"/"} className="flex items-center justify-center">
                {loading ? (
                    <Skeleton.Avatar active size="large" shape="circle" />
                ) : (
                    <Image
                        src="/logo.jpg"
                        width={40}
                        className="rounded-3xl"
                        preview={false}
                    />
                )}
                {loading ? (
                    <Skeleton.Input active className="ml-2 w-24" size="small" />
                ) : (
                    <CustomParagraph className="flex mt-2 items-center justify-center ml-2">
                        Res
                        <span className="text-blue-900 font-bold">pirix</span>
                    </CustomParagraph>
                )}
            </Link>

            {/* Desktop Navigation */}
            <section className="hidden md:flex gap-9">
                {loading ? (
                    <Skeleton.Input active className="w-16" size="small" />
                ) : (
                    <Link to={"/"}>Home</Link>
                )}
                {loading ? (
                    <Skeleton.Input active className="w-16" size="small" />
                ) : (
                    <button
                        onClick={(e) => scrollToSection(featuresRef, e)}
                        className="cursor-pointer"
                    >
                        Features
                    </button>
                )}
                {loading ? (
                    <Skeleton.Input active className="w-16" size="small" />
                ) : (
                    <button
                        onClick={(e) => scrollToSection(faqRef, e)}
                        className="cursor-pointer"
                    >
                        FAQ
                    </button>
                )}
            </section>

            {/* Try It Now Button (Desktop) */}
            <section className="right">
                {loading ? (
                    <Skeleton.Button active className="h-[2.5rem] w-24" />
                ) : (
                    <Button
                        onClick={reDirect}
                        className="my-[1.5rem] py-[0.5rem] shadow-lg h-[2.5rem] hidden md:block"
                        type="primary"
                    >
                        Try It Now
                    </Button>
                )}
            </section>

            {/* Mobile Menu Toggle */}
            <section className="cursor-pointer md:hidden" onClick={menu}>
                {loading ? (
                    <Skeleton.Avatar active size="small" />
                ) : open ? (
                    <XOutlined className="opacity-100" />
                ) : (
                    <MenuOutlined className="opacity-100" />
                )}
            </section>

            {/* Mobile Menu */}
            {open && !loading && (
                <div
                    className="transition-all ease-out duration-300 mt-2 rounded-lg z-100 place-items-center gap-3 p-[2rem] flex flex-col bg-gray-50 m-3 items-start absolute right-0 top-10 text-[0.9rem] md:hidden z-[99]"
                    onClick={menu}
                >
                    <Link to={"/"}>Home</Link>
                    <button
                        onClick={(e) => scrollToSection(featuresRef, e)}
                        className="cursor-pointer"
                    >
                        Features
                    </button>
                    <button
                        onClick={(e) => scrollToSection(faqRef, e)}
                        className="cursor-pointer"
                    >
                        FAQ
                    </button>
                    <Button
                        onClick={reDirect}
                        className="py-[0.5rem] shadow-lg h-[2.5rem]"
                        type="primary"
                    >
                        Try It Now
                    </Button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
