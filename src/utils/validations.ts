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

// --- Checks if a value is empty or only spaces ---
export const isEmptyOrSpaces = (value: string): boolean => {
  return !value || value.trim() === "";
};

export const hasLeadingOrTrailingSpaces = (value: string): boolean => {
  return value.startsWith(" ") || value.endsWith(" ");
};

// --- Get Validation Error ---
// Returns a specific error message if validation fails, otherwise null
export const getValidationError = (
  type: "email" | "phone" | "required" | "numeric" | "noSpaces",
  value: string,
  customMessage?: string
): string | null => {
  switch (type) {
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
        ? null
        : customMessage || "Please enter a valid email address.";
    case "phone":
      return /^\d{10}$/.test(value.trim())
        ? null
        : customMessage || "Phone number must be exactly 10 digits.";
    case "required":
      return !isEmptyOrSpaces(value)
        ? null
        : customMessage || "This field is required.";
    case "noSpaces":
      return hasLeadingOrTrailingSpaces(value)
        ? customMessage || "Value cannot start or end with a space"
        : null;
    default:
      return "Invalid validation type.";
  }
};