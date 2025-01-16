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
        const startTime = performance.now(); // Start time for inference using performance.now()

        const predictionResponse = await predict(file);
        const prediction = predictionResponse?.predicted_category;

        const endTime = performance.now(); // End time for inference using performance.now()
        let inferenceTime = endTime - startTime; // Time in milliseconds with high precision

        if (!prediction) {
            toast.error("Prediction result is missing. Please try again.");
            return;
        }

        // Convert time to a readable format (milliseconds, seconds, or minutes)
        let timeUnit = "ms"; // Default unit is milliseconds
        let formattedTime = inferenceTime.toFixed(2); // Default to milliseconds

        if (inferenceTime >= 1000) {
            // Convert to seconds if time exceeds 1000 milliseconds
            formattedTime = (inferenceTime / 1000).toFixed(2);
            timeUnit = "s"; // seconds
        }

        if (inferenceTime >= 60000) {
            // Convert to minutes if time exceeds 60000 milliseconds (1 minute)
            formattedTime = (inferenceTime / 60000).toFixed(2);
            timeUnit = "min"; // minutes
        }

        // Show the inference time toast with dynamic time unit
        toast.info(`Inference completed in ${formattedTime} ${timeUnit}.`);

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
        toast.success(`Successfully!..`);

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
