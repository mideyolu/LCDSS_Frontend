import { MenuOutlined, XOutlined } from "@ant-design/icons";
import { Button, Image } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomParagraph } from "../Typography/CustomTypography";

const Navbar = ({ faqRef, featuresRef }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const reDirect = () => {
        navigate("/onboarding");
    };

    const menu = () => {
        setOpen((prev) => !prev);
    };

    const scrollToFaq = (e) => {
        e.preventDefault();
        if (faqRef && faqRef.current) {
            faqRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };
    const scrollToFeatures = (e) => {
        e.preventDefault();
        if (featuresRef && featuresRef.current) {
            featuresRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <nav className="flex items-center justify-between px-6 md:px-16">
            <Link to={"/"} className="flex items-center justify-center">
                <Image
                    src="/logo.jpg"
                    width={40}
                    className="rounded-3xl"
                    preview={false}
                />
                <CustomParagraph className="flex mt-2 items-center justify-center ml-2">
                    Res<span className="text-blue-900 font-bold">pirix</span>
                </CustomParagraph>
            </Link>

            <section className="hidden md:flex gap-9">
                <Link to={"/"}>Home</Link>
                <button onClick={scrollToFeatures} className="cursor-pointer">
                    Features
                </button>

                <button onClick={scrollToFaq} className="cursor-pointer">
                    Faq
                </button>
            </section>

            <section className="right">
                <Button
                    onClick={reDirect}
                    className="my-[1.5rem] py-[0.5rem] shadow-lg h-[2.5rem] hidden md:block"
                    type="primary"
                >
                    Try It Now
                </Button>
            </section>

            <section className="cursor-pointer md:hidden" onClick={menu}>
                {open ? (
                    <XOutlined className="opacity-100" />
                ) : (
                    <MenuOutlined className="opacity-100" />
                )}
            </section>

            {open && (
                <div
                    className="transition-all ease-out duration-300 mt-2 rounded-lg z-100 place-items-center gap-3 p-[2rem] flex flex-col bg-gray-50 m-3 items-start absolute right-0 top-10 text-[0.9rem]  md:hidden z-[99]"
                    onClick={menu}
                >
                    <Link to={"/"}>Home</Link>
                    <button
                        onClick={scrollToFeatures}
                        className="cursor-pointer"
                    >
                        Features
                    </button>

                    <button onClick={scrollToFaq} className="cursor-pointer">
                        Faq
                    </button>
                    <Button
                        onClick={reDirect}
                        className="py-[0.5rem] shadow-lg h-[2.5rem]"
                        variant="solid"
                        color="primary"
                    >
                        Try It Now
                    </Button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
