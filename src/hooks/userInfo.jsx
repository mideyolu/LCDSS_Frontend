import { useEffect, useState } from "react";

export const userInfo = () => {
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        setFullname(localStorage.getItem("fullname") || "");
        setUsername(localStorage.getItem("username") || "");
        setEmail(localStorage.getItem("email") || "");
    }, []);

    return { fullname, setFullname, username, setUsername, email, setEmail };
};
