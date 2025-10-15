// --- Email Validation ---
// Checks if the given email is in a valid format
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

// --- Phone Validation ---
// Checks if the given phone number contains exactly 10 digits
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone.trim());
};

// --- Get Validation Error ---
// Returns a specific error message if validation fails, otherwise null
export const getValidationError = (
  type: "email" | "phone",
  value: string,
  customMessage?: string
): string | null => {
  switch (type) {
    case "email":
      return validateEmail(value)
        ? null
        : customMessage || "Please enter a valid email address.";
    case "phone":
      return validatePhone(value)
        ? null
        : customMessage || "Phone number must be exactly 10 digits.";
    default:
      return "Invalid validation type.";
  }
};