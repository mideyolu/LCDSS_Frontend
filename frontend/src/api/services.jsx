export const service = [
    {
        id: 1,
        img: "/form.png",
        caption: "Form Filling",
        desc: "Quickly input patient details with our streamlined form interface.",
    },
    {
        id: 2,
        img: "/AI.png",
        caption: "AI Image Analyzer",
        desc: "Utilize advanced AI to analyze CT scan images for precise results.",
    },
    {
        id: 3,
        img: "/report.png",
        caption: "Report Generation",
        desc: "Receive comprehensive generated reports on the dashboard",
    },
];

export const faqData = [
    {
        question: "What is the AI-Powered Lung Cancer Detection System?",
        answer: "Our platform uses advanced AI algorithms to assist medical professionals in diagnosing lung cancer more efficiently and accurately.",
    },
    {
        question: "How accurate is the detection system?",
        answer: "The system has undergone rigorous testing and validation, ensuring high accuracy in detecting lung cancer from medical imaging. We acheived an accuracy of 97% and F1 Score of 93%",
    },
    {
        question: "What is the data used to train this model?",
        answer: "The data used to train this model is sourced from Mendeley Hospital's open-source dataset, which is available on Kaggle. It has been anonymized to protect patient privacy, and the dataset has been provided for research and development purposes.",
    },

    {
        question: "Who can use this platform?",
        answer: "This platform is designed for medical professionals, healthcare providers, and researchers who require accurate diagnostic tools.",
    },
    {
        question: "How do I get started?",
        answer: "Simply click the 'Get Started' button on the homepage or the 'Try it Now' button at the navigation bar to begin the onboarding process.",
    },
    {
        question: "Is my data secure?",
        answer: "Yes, we prioritize user data privacy and comply with medical data security standards such as HIPAA.",
    },
];

//
export const handleSearch = (value, originalData, setFilteredData) => {
    if (!value) {
        setFilteredData(originalData); // Reset to original data when search is empty
    } else {
        const searchResult = originalData.filter((patient) =>
            Object.values(patient)
                .join(" ")
                .toLowerCase()
                .includes(value.toLowerCase()),
        );
        setFilteredData(searchResult);
    }
};


// services.js
import { dashboardData, patientData } from "../api/api";

export const fetchData = async (setSummaryData, setOriginalData, setFilteredData, setLoading, setError) => {
    try {
        // Fetch dashboard data
        const dashboard = await dashboardData();
        setSummaryData([
            {
                title: "Total Patients",
                value: dashboard.total_patients,
                color: "#034694",
            },
            {
                title: "Normal Case",
                value: dashboard.normal_cases,
                color: "#6CB4EE",
            },
            {
                title: "Benign Case",
                value: dashboard.benign_cases,
                color: "#3457D5",
            },
            {
                title: "Malignant Case",
                value: dashboard.malignant_cases,
                color: "#6495ED",
            },
        ]);

        // Fetch patient data
        const patients = await patientData();
        const formattedData = patients.map((item, index) => ({
            key: index,
            sn: index + 1,
            name: item.patient_name,
            age: item.patient_age,
            gender: item.patient_gender,
            email: item.patient_email,
            status: item.prediction.endsWith("s") ? item.prediction.slice(0, -1) : item.prediction,
        }));
        setOriginalData(formattedData);
        setFilteredData(formattedData); // Initialize filteredData with original data

        // Simulate delay to stop loader after 1 second
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data.");
        setLoading(false);
    }
};
