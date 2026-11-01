export const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-binary" },
  { value: "other", label: "Other" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function isValidPhoneNumber(phone) {
  const value = phone.trim();

  if (!/^\+?[0-9\s().-]+$/.test(value)) {
    return false;
  }

  const digitCount = value.replace(/\D/g, "").length;

  return digitCount >= 7 && digitCount <= 15;
}

export function validateBasicInformation(formData = {}) {
  const errors = {};
  const fullName = formData.fullName?.trim() || "";
  const email = formData.email?.trim() || "";
  const phoneNumber = formData.phoneNumber?.trim() || "";
  const whatsappNumber = formData.whatsappNumber?.trim() || "";
  const dateOfBirth = formData.dateOfBirth || "";
  const gender = formData.gender || "";

  if (!fullName) {
    errors.fullName = "Full name is required.";
  } else if (fullName.length < 2) {
    errors.fullName = "Name must contain at least 2 characters.";
  } else if (fullName.length > 100) {
    errors.fullName = "Name cannot exceed 100 characters.";
  }

  if (!email) {
    errors.email = "Email address is required.";
  } else if (email.length > 254 || !isValidEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!phoneNumber) {
    errors.phoneNumber = "Phone number is required.";
  } else if (!isValidPhoneNumber(phoneNumber)) {
    errors.phoneNumber = "Please enter a valid phone number.";
  }

  if (!whatsappNumber) {
    errors.whatsappNumber = "WhatsApp number is required.";
  } else if (!isValidPhoneNumber(whatsappNumber)) {
    errors.whatsappNumber = "Please enter a valid WhatsApp number.";
  }

  if (!dateOfBirth) {
    errors.dateOfBirth = "Date of birth is required.";
  } else {
    const dob = new Date(`${dateOfBirth}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (Number.isNaN(dob.getTime())) {
      errors.dateOfBirth = "Please enter a valid date.";
    } else if (dob > today) {
      errors.dateOfBirth = "Date of birth cannot be in the future.";
    }
  }

  if (!gender) {
    errors.gender = "Please select your gender.";
  } else if (!GENDER_OPTIONS.some((option) => option.value === gender)) {
    errors.gender = "Please select a valid gender option.";
  }

  return errors;
}
