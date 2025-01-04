import { toast } from "react-toastify";
import { predict, registerPatient, registerResults } from "../api/api";


export const handleSubmitDetection = async ({
    values,
    fileList,
    provider_id,
    form,
    setFileList,
    navigate,
    setLoading,
}) => {
    if (fileList.length === 0) {
        toast.error("Please upload a CT scan image!");
        return;
    }

    try {
        setLoading(true);

        // Step 1: Load the uploaded file
        const file = fileList[0]?.originFileObj;

        // Step 2: Predict diagnosis from the uploaded file
        const predictionResponse = await predict(file);
        const prediction = predictionResponse?.predicted_category;

        if (!prediction) {
            toast.error("Prediction result is missing. Please try again.");
            return;
        }

        // Step 3: Register Patient
        const patientPayload = {
            patient_name: values.patient_name,
            patient_age: values.patient_age,
            patient_gender: values.patient_gender,
            patient_email: values.patient_email,
            patient_notes: values.patient_notes,
        };

        const patientResponse = await registerPatient(patientPayload);
        if (!patientResponse || !patientResponse.patient_id) {
            throw new Error(
                "Patient registration failed. No patient_id returned.",
            );
        }

        const patientId = patientResponse.patient_id;

        // Step 4: Register Diagnosis
        const diagnosisPayload = {
            provider_id: provider_id, // Replace with actual provider ID
            patient_id: patientId,
            prediction,
        };

        await registerResults(diagnosisPayload);
        toast.success("Patient data and diagnosis registered successfully!");

        setTimeout(() => {
            form.resetFields();
            setFileList([]);
            navigate("/dashboard");
        }, 1500);
    } catch (error) {
        console.error("Error during submission:", error);
        toast.error("An error occurred. Please try again.");
    } finally {
        setLoading(false);
    }
};
