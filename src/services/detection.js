
import { toast } from "react-toastify";
import { predict, registerPatient, registerResults } from "../api/api";

// Handle patient registration
const registerNewPatient = async (values) => {
    const patientPayload = {
        patient_name: values.patient_name,
        patient_age: values.patient_age,
        patient_gender: values.patient_gender,
        patient_email: values.patient_email,
        patient_notes: values.patient_notes,
    };

    const patientResponse = await registerPatient(patientPayload);
    if (!patientResponse || !patientResponse.patient_id) {
        throw new Error("Patient registration failed.");
    }

    return patientResponse.patient_id;
};

// Handle file upload and prediction
const processFileUpload = async (file) => {
    const predictionResponse = await predict(file);
    const prediction = predictionResponse?.predicted_category;
    const inferenceTime = predictionResponse?.inference_time_ms;

    if (!prediction || inferenceTime === undefined) {
        throw new Error("Prediction result or inference time is missing.");
    }

    return { prediction, inferenceTime };
};

// Handle diagnosis registration
const registerDiagnosis = async (provider_id, patientId, prediction) => {
    const diagnosisPayload = {
        provider_id,
        patient_id: patientId,
        prediction,
    };

    await registerResults(diagnosisPayload);
};

// Main function (simplified)
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

        const file = fileList[0]?.originFileObj;

        // Step 1: Process file (upload and prediction)
        const { prediction, inferenceTime } = await processFileUpload(file);

        // Step 2: Show prediction time
        let timeUnit = "ms";
        let formattedTime = inferenceTime.toFixed(2);
        if (inferenceTime >= 1000) {
            formattedTime = (inferenceTime / 1000).toFixed(2);
            timeUnit = "s";
        }
        if (inferenceTime >= 60000) {
            formattedTime = (inferenceTime / 60000).toFixed(2);
            timeUnit = "min";
        }

        toast.info(`Inference completed in ${formattedTime} ${timeUnit}.`);

        // Step 3: Register patient
        const patientId = await registerNewPatient(values);

        // Step 4: Register diagnosis
        await registerDiagnosis(provider_id, patientId, prediction);

        toast.success("Successful!");

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
