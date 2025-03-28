export const initialValidationState = {
    hasUppercase: false,
    hasSpecialChar: false,
    hasNumber: false,
    hasMinLength: false,
};

export const validatePassword = (password) => {
    return {
        hasUppercase: /[A-Z]/.test(password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        hasNumber: /\d/.test(password),
        hasMinLength: password.length >= 8,
    };
};

export const areAllRequirementsMet = (validation) => {
    return Object.values(validation).every(Boolean);
};


export const ChangePasswordValidation = (
    password,
    setPasswordValidation,
    setAllRequirementsMet,
) => {
    const validationRules = {
        hasUppercase: /[A-Z]/.test(password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        hasNumber: /\d/.test(password),
        hasMinLength: password.length >= 8,
    };

    setPasswordValidation(validationRules);
    setAllRequirementsMet(Object.values(validationRules).every(Boolean));
};
