import * as yup from "yup";
// yup signInSchema
const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format"),
  password: yup.string().required("Password is required"),
});

export default signInSchema;
