import * as Yup from "yup";

export const platformValidationsSchema = Yup.object({
  platformName: Yup.string()
    .required("Platform name is required")
    .matches(/^[a-zA-Z]{1,24}$/, "Platform name must be 1-24 characters long, no numbers, special characters or whitespace allowed")
});