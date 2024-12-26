// api.js
import axios from "axios";

// Base URL for FastAPI backend
const API_URL = "http://localhost:8000"; // FastAPI backend is running on localhost:8000



export const signup = async (formData) => {
    try {
        console.log("Sending Signup request with data:", formData); // Add this log for debugging
        const response = await axios.post(
            `${API_URL}/signup`, // Make sure this matches your FastAPI endpoint
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        return response.data; // Return the response data for use in handleLogin
    } catch (error) {
        console.error("API call failed:", error);
        throw error; // This will propagate the error to the calling function
    }
};

export const login = async (formData) => {
    try {
        console.log("Sending login request with data:", formData); // Add this log for debugging
        const response = await axios.post(
            `${API_URL}/login`, // Make sure this matches your FastAPI endpoint
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        return response.data; // Return the response data for use in handleLogin
    } catch (error) {
        console.error("API call failed:", error);
        throw error; // This will propagate the error to the calling function
    }
};
