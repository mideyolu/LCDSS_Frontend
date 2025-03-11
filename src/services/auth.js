// src/services/auth.js

import { toast } from "react-toastify";
import { login, signup } from "../api/api";

// --------------------
// Login Functions
// --------------------

// Function to store user data in local storage and update state
export const storeUserData = (response, setFullname, setUsername, setEmail) => {
    localStorage.setItem("access_token", response.access_token);
    localStorage.setItem("id", response.provider_id);
    localStorage.setItem("fullname", response.provider_username);
    localStorage.setItem("email", response.provider_email);
    localStorage.setItem(
        "username",
        response.provider_username.split(" ").pop(),
    );

    setFullname(response.provider_username);
    setUsername(response.provider_username.split(" ").pop());
    setEmail(response.provider_email);
};

// Function to handle login
export const handleLogin = async (
    formData,
    setLoading,
    navigate,
    setFullname,
    setUsername,
    setEmail,
) => {
    setLoading(true);
    try {
        const response = await login({
            provider_email: formData.provider_email,
            provider_password: formData.provider_password,
        });

        storeUserData(response, setFullname, setUsername, setEmail);
        toast.success("Login successful!");
        navigate("/dashboard");
    } catch (error) {
        toast.error(`${error ? error : "Signup failed!"}`);
    } finally {
        setLoading(false);
    }
};

// --------------------
// Signup Functions
// --------------------

// Function to handle signup
export const handleSignup = async (formData, setLoading, navigate) => {
    setLoading(true);
    try {
        await signup({
            provider_username: formData.provider_username,
            provider_email: formData.provider_email,
            provider_password: formData.provider_password,
        });

        toast.success("Signup successful!");
        setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
        console.error("Signup Error:", error);
        toast.error(
            `${error ? error.response?.data?.detail : "Signup failed!"}`,
        );
    } finally {
        setLoading(false);
    }
};
