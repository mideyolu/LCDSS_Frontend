// utils/logout.js
import { toast } from "react-toastify";
import { logout } from "../api/api"; // Adjust the path as necessary

export const handleLogout = async (navigate) => {
    try {
        const response = await logout();
        toast.success(`${response}`);
        navigate("/onboarding");
    } catch (error) {
        console.error("Logout failed:", error);
        toast.error("An error occurred while logging out.");
    }
};
