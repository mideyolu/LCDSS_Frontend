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
// Signup API call
export const signup = async (data) => {
    try {
        const response = await api.post("/auth/signup", data);
        return response.data; // { access_token, token_type }
    } catch (error) {
        throw (
            error.response?.data?.detail || "An error occurred during signup."
        );
    }
};
// Login API call
export const login = async (data) => {
    try {
        const response = await api.post("/auth/login", data);
        return response.data; // { access_token, token_type }
    } catch (error) {
        throw error.response?.data?.detail || "An error occurred during login.";
    }
};
// Register patient
export const registerPatient = async (patientData) => {
    try {
        const response = await api.post("/auth/patients", patientData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        console.log("Register Patient Response:", response); // Log response
        return response.data; // Ensure you return the response data
    } catch (error) {
        console.error("Error registering Patient:", error);
        throw error;
    }
};
// Function to register results
export const registerResults = async (patientData) => {
    try {
        const response = await api.post("/auth/results", patientData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Add token to header
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error registering results:", error);
        throw error;
    }
};
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
export const dashboardData = async () => {
    try {
        const response = await api.get("/auth/dashboard", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error Fetching dashbaord stats ${error}`);
    }
};
export const patientData = async () => {
    try {
        const response = await api.get("/auth/patients_data", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error Fetching dashbaord stats ${error}`);
        throw new Error("Failed to fetch patient data");
    }
};

export const chartData = async () => {
    try {
        const response = await api.get("/auth/chart_data", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error Fetching dashbaord stats ${error}`);
        throw new Error("Failed to fetch patient data");
    }
};

export const logData = async () => {
    try {
        const response = await api.get("/auth/provider_log", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error(`Error fetching provider logs: ${error}`);
        throw new Error("Failed to fetch provider log data"); // Updated error message
    }
};

export default api;
