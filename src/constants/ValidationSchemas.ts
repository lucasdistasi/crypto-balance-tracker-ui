import * as Yup from "yup";

const QUANTITY_REGEX = /^(?=.*[1-9])\d{0,16}(\.\d{1,12})?$/;
const INVALID_QUANTITY_MESSAGE = "Enter a number between 0 and 9999999999999999.999999999999";

const addUpdateCryptoCommonValidationSchema = {
  quantity: Yup.string()
    .required("Quantity is required")
    .matches(QUANTITY_REGEX, INVALID_QUANTITY_MESSAGE),
  platform: Yup.string()
    .required("Platform is required")
};

const cryptoNameValidationSchema = {
  cryptoName: Yup.string()
    .required("Crypto name or id is required")
    .min(1, "Crypto name or id must have at least 1 character")
    .max(64, "Crypto name or id can not have more than 64 characters")
    .matches(/^(?!\s)(?!.*\s{2,})\S.*?(?<!\s)$/i, "Invalid crypto name or id")
};

const addUpdateGoalCommonValidationSchema = {
  goalQuantity: Yup.string()
    .required("Goal quantity is required")
    .matches(QUANTITY_REGEX, INVALID_QUANTITY_MESSAGE)
};

export const platformValidationsSchema = Yup.object({
  platformName: Yup.string()
    .required("Platform name is required")
    .matches(/^[a-zA-Z](?:(?!\s{2,})[a-zA-Z\s]){0,22}[a-zA-Z]$/, "Platform name must be 1-24 characters long, no numbers, special characters or subsequents whitespaces allowed")
});

export const updatePriceTargetValidationsSchema = Yup.object({
  priceTarget: Yup.string()
    .required("Price target quantity is required")
    .matches(QUANTITY_REGEX, INVALID_QUANTITY_MESSAGE)
});

export const addPriceTargetValidationsSchema = Yup.object({
  cryptoNameOrId: Yup.string()
    .required("Crypto name or id is required")
    .min(1, "Crypto name or id must have at least 1 character")
    .max(64, "Crypto name or id can not have more than 64 characters")
    .matches(/^(?!\s)(?!.*\s{2,})\S.*?(?<!\s)$/i, "Invalid crypto name or id"),
  priceTarget: Yup.string()
    .required("Price target quantity is required")
    .matches(QUANTITY_REGEX, INVALID_QUANTITY_MESSAGE)
});

export const addCryptoValidationSchema = Yup.object({
  ...addUpdateCryptoCommonValidationSchema,
  ...cryptoNameValidationSchema
});

export const updateCryptoValidationSchema = Yup.object({
  ...addUpdateCryptoCommonValidationSchema
});

export const addGoalValidationSchema = Yup.object({
  ...cryptoNameValidationSchema,
  ...addUpdateGoalCommonValidationSchema
});

export const updateGoalValidationSchema = Yup.object({
  ...addUpdateGoalCommonValidationSchema
});