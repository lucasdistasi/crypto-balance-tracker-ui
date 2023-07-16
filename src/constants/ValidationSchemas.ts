import * as Yup from "yup";

export const platformValidationsSchema = Yup.object({
  platformName: Yup.string()
    .required("Platform name is required")
    .matches(/^[a-zA-Z]{1,24}$/, "Platform name must be 1-24 characters long, no numbers, special characters or whitespace allowed")
});

const addUpdateCryptoCommonValidationSchema = {
  quantity: Yup.string()
    .required("Quantity is required")
    .matches(/^(?=.*[1-9])\d{0,16}(\.\d{1,12})?$/, "Enter a number between 0 and 9999999999999999.999999999999"),
  platform: Yup.string()
    .required("Platform is required")
};

export const addCryptoValidationSchema = Yup.object({
  ...addUpdateCryptoCommonValidationSchema,
  cryptoName: Yup.string()
    .required("Crypto name is required")
    .matches(/^(?! )(?!.* {2})[a-zA-Z0-9]+(?:[ {2}][a-zA-Z0-9]+)*$(?<! )/, "Crypto name must be 1-64 characters, using only letters, numbers, and whitespaces"),
});

export const updateCryptoValidationSchema = Yup.object({
  ...addUpdateCryptoCommonValidationSchema
});