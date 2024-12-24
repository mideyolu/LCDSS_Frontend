import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button, Image, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { MenuOutlined, XOutlined } from "@ant-design/icons";

const Navbar = () => {
    const { Paragraph } = Typography;
    const navigate = useNavigate();

    const reDirect = () => {
        navigate("/onboarding");
    };

    const [open, setOpen] = useState(false);

    const menu = (prev) => {
        setOpen((prev) => !prev);
    };
    return (
        <nav className="flex items-center justify-between">
            <section className="flex items-center justify-center">
                <Image src="/logo.jpg" width={50} className="rounded-3xl" />

                <Paragraph className="flex items-center justify-center ml-2">
                    Res<span className="text-blue-900">pirix</span>
                </Paragraph>
            </section>
            <section className=" hidden md:flex gap-9">
                <Link to={"/"}>Home</Link>
                <Link to={"/faq"}>FAQ</Link>
            </section>
            <section className="right">
                <Button
                    onClick={reDirect}
                    className="my-[1.5rem] py-[0.5rem] shadow-lg h-[2.5rem] hidden md:block"
                    variant="solid"
                    color="primary"
                >
                    Try It Now
                </Button>
            </section>

            <section className=" cursor-pointer md:hidden" onClick={menu}>
                {open ? (
                    <XOutlined
                        className={`${open ? "opacity-100" : "opacity-0"}`}
                    />
                ) : (
                    <MenuOutlined
                        className={`${open ? "opacity-0" : "opacity-100"}`}
                    />
                )}
            </section>

            {open && (
                <div
                    className={` ${
                        open ? "translate-y-0" : "translate-y-[100%]"
                    }  transition-all ease-out duration-300 mt-2 rounded-lg z-100 place-items-center gap-3 p-[2rem] flex flex-col bg-gray-100 m-3 items-start absolute right-0 top-10 text-[0.9rem]`}
                    onClick={menu}
                >
                    <Link to={"/"}>Home</Link>
                    <Link to={"/faq"}>FAQ</Link>
                    <Link to={"/login"}>Login</Link>
                    <Link to={"/signup"}>Signup</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
