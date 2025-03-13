import { MenuOutlined, XOutlined } from "@ant-design/icons";
import { Button, Image, Typography } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ faqRef }) => {
    const { Paragraph } = Typography;
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

    return (
        <nav
            className="flex items-center justify-between"
    
        >
            <Link to={"/"} className="flex items-center justify-center">
                <Image
                    src="/logo.jpg"
                    width={50}
                    className="rounded-3xl"
                    preview={false}
                />
                <Paragraph className="flex mt-2 items-center justify-center ml-2">
                    Res<span className="text-blue-900 font-bold">pirix</span>
                </Paragraph>
            </Link>

            <section className="hidden md:flex gap-9">
                <Link to={"/"}>Home</Link>
                <a href="#faq" onClick={scrollToFaq} className="cursor-pointer">
                    FAQ
                </a>
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
                    className="transition-all ease-out duration-300 mt-2 rounded-lg z-100 place-items-center gap-3 p-[2rem] flex flex-col bg-gray-100 m-3 items-start absolute right-0 top-10 text-[0.9rem] block md:hidden z-[99]"
                    onClick={menu}
                >
                    <Link to={"/"}>Home</Link>
                    <a
                        href="#faq"
                        onClick={scrollToFaq}
                        className="cursor-pointer"
                    >
                        FAQ
                    </a>
                    <Button
                        onClick={reDirect}
                        className="my-[1.5rem] py-[0.5rem] shadow-lg h-[2.5rem]"
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
