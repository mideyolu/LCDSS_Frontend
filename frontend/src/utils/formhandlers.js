import { toast } from "react-toastify";
import { areAllRequirementsMet, validatePassword } from "../utils/password";

export const handlePasswordChange = (
    value,
    setPassword,
    setValidation,
    setAllRequirementsMet,
    setShowSuccess,
) => {
    setPassword(value);

    // Validate password
    const newValidation = validatePassword(value);
    setValidation(newValidation);

    // Check if all requirements are met
    if (areAllRequirementsMet(newValidation)) {
        setAllRequirementsMet(true);
        setTimeout(() => {
            setShowSuccess(true); // Show success message after loader
        }, 1200);
    } else {
        setAllRequirementsMet(false);
        setShowSuccess(false);
    }
};

// Define the initial validation state here if not imported
export const initialValidationState = {
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
};

export const handleSubmit = async (
    values,
    showTermsAndConditions,
    termsAccepted,
    onSubmit,
    setLoading,
) => {
    if (showTermsAndConditions && !termsAccepted) {
        toast.error("You must accept the Terms and Conditions to continue.");
        return;
    }

    setLoading(true);
    try {
        await onSubmit(values);
    } catch (error) {
        toast.error(`Error: ${error.message || "Something went wrong!"}`);
    } finally {
        setLoading(false);
    }
};
