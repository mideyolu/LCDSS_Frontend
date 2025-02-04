import axios from "axios";

// Create Axios instance
const api = axios.create({
    baseURL: "http://127.0.0.1:8000", // Replace with your backend base URL
    headers: {
        "Content-Type": "application/json",
    },
});

// Function to set Authorization token
export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common["Authorization"];
    }
};

// Generalized GET request function
const getRequest = async (url, returnDataOnly = true) => {
    try {
        const response = await api.get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        return returnDataOnly ? response.data : response;
    } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        throw new Error(error.response?.data?.detail || "Failed to fetch data");
    }
};

// Generalized POST request function
const postRequest = async (url, data = {}, returnDataOnly = true) => {
    try {
        const response = await api.post(url, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        return returnDataOnly ? response.data : response;
    } catch (error) {
        console.error(`Error posting to ${url}:`, error);
        throw new Error(
            error.response?.data?.detail || "Failed to process request",
        );
    }
};

// Authentication APIs
// // Signup API call
export const signup = (data) => postRequest("/auth/signup", data);
// Login API call
export const login = (data) => postRequest("/auth/login", data);

// Patient & Diagnosis APIs
export const registerPatient = (patientData) =>
    postRequest("/auth/patients", patientData);
export const registerResults = (patientData) =>
    postRequest("/auth/results", patientData);

// Dashboard & Analytics APIs
export const dashboardData = () => getRequest("/auth/dashboard");
export const patientData = () => getRequest("/auth/patients_data");
export const chartData = () => getRequest("/auth/chart_data");
export const logData = () => getRequest("/auth/provider_log");

// Function to predict
export async function predict(file) {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(
            `http://127.0.0.1:8000/auth/detect`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem(
                        "access_token",
                    )}`, // Include token in header
                },
                withCredentials: true, // Ensure cookies are sent with the request
            },
        );
        return response.data;
    } catch (error) {
        console.error("Error during prediction:", error);
        throw error;
    }
}

export const logout = async () => {
    try {
        const response = await api.post("/auth/logout", null, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        // Clear the stored token and data
        localStorage.clear();
        setAuthToken(null); // Remove token from headers

        return response.data.message;
    } catch (error) {
        console.error("Error during logout:", error);
        throw (
            error.response?.data?.detail || "An error occurred during logout."
        );
    }
};

export default api;
