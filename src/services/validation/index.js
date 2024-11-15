import * as Yup from "yup";

export const signupSchemaValidataon = Yup.object().shape({
  refid: Yup.string().required("Referral Code is required"),
  pass: Yup.string()
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is required"),
  confirmpass: Yup.string()
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is required"),
  name: Yup.string()
    .required("Name is required"),
  mobile: Yup.string()
    .matches(
      /^[0-9]{10}$/,
      "Invalid mobile number format. It must be a 10-digit number."
    )
    .required("Mobile number is required"),
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
});
export const signupSchemaValidataonEmail = Yup.object().shape({
  invite_code: Yup.string().required("Referral Code is required"),
  password: Yup.string()
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is required"),
  confirmed_password: Yup.string()
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is required"),
  name: Yup.string()
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
});
export const withdrawAmountSchemaValidaton = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, {
      message:
        "Invalid mobile number format. It must be a 10-digit number without dots.",
    })
    .max(10, "Mobile should not be more than 10 character")
    .test(
      "no-dots",
      "Dots are not allowed in the mobile number.",
      (value) => !/\./.test(value)
    )
    .required("Mobile number is required"),
  bank_name: Yup.string().required("Bank Name is required"),
  name: Yup.string().required("Holder Name is required"),
  ifsc_code: Yup.string()
    .matches(/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/, "IFSC code is invalid. It should follow the pattern: XXXX0XXXXXX")
    .min(11, "IFSC must be 11 characters at minimum")
    .max(11, "IFSC should not be more than 11 character")
    .required("IFSC is required"),
  account_number: Yup.string().required("Account Number is required"),
});