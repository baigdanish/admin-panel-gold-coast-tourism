import { useFormik, type FormikHelpers } from "formik";
/**
 * @format
 */

import type { ILoginRequest } from "../../interfaces/auth/auth.types";
import ErrorMessages from "../../constants/errorMessages/auth";
import * as Yup from "yup";

const defaultValues: ILoginRequest = {
  phone: "",
  password: "",
};

const schema = Yup.object().shape({
  phone: Yup.string()
    .required(ErrorMessages.login.phone || "Phone number or email is required")
    .test("is-valid-phone-or-email", "", function (value) {
      const { createError, path } = this;

      if (!value)
        return createError({
          path,
          message: "Phone number or email is required",
        });

      const phoneRegex = /^\d{10}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const isOnlyDigits = /^\d+$/.test(value);

      if (isOnlyDigits && !phoneRegex.test(value)) {
        return createError({
          path,
          message: "Enter a valid 10-digit phone number",
        });
      }

      if (!isOnlyDigits && !emailRegex.test(value)) {
        return createError({ path, message: "Enter a valid email address" });
      }

      return true;
    }),
  password: Yup.string().required(
    ErrorMessages.login.password || "Password is required"
  ),
});

const useLoginForm = (
  onSubmit: (
    values: ILoginRequest,
    formikHelpers: FormikHelpers<ILoginRequest>
  ) => void | Promise<unknown>,
  initialValues: ILoginRequest = defaultValues
) => {
  return useFormik<ILoginRequest>({
    initialValues,
    enableReinitialize: true,
    validationSchema: schema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit,
  });
};

export default useLoginForm;
