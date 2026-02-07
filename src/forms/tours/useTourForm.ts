import { useFormik, type FormikHelpers } from "formik";
/**
 * @format
 */

import * as Yup from "yup";
import type { IRequestTours } from "../../interfaces/tours.types";

const defaultValues: IRequestTours = {
  title: "",
  shortDescription: "",
  description: "",

  city: "",
  country: "",
  address: "",

  latitude: 0,
  longitude: 0,

  durationInMinutes: 0,

  minGuests: 1,
  maxGuests: 1,

  priceFrom: 0,
  currency: "USD",

  coverImageUrl: "",
  imageUrls: [],

  categoryIds: [],

  metaTitle: "",
  metaDescription: "",
};

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  shortDescription: Yup.string().required("Short description is required"),
  description: Yup.string().required("Description is required"),

  // city: Yup.string().required("City is required"),
  // country: Yup.string().required("Country is required"),
  // address: Yup.string().required("Address is required"),

  // latitude: Yup.number()
  //   .required("Latitude is required")
  //   .min(-90, "Latitude must be between -90 and 90")
  //   .max(90, "Latitude must be between -90 and 90"),
  // longitude: Yup.number()
  //   .required("Longitude is required")
  //   .min(-180, "Longitude must be between -180 and 180")
  //   .max(180, "Longitude must be between -180 and 180"),

  // durationInMinutes: Yup.number()
  //   .required("Duration is required")
  //   .min(1, "Duration must be at least 1 minute"),

  // minGuests: Yup.number()
  //   .required("Minimum guests is required")
  //   .min(1, "Minimum guests must be at least 1"),
  // maxGuests: Yup.number()
  //   .required("Maximum guests is required")
  //   .min(
  //     Yup.ref("minGuests"),
  //     "Maximum guests must be greater than or equal to minimum guests"
  //   ),

  // priceFrom: Yup.number()
  //   .required("Price is required")
  //   .min(0, "Price must be at least 0"),

  // currency: Yup.string().required("Currency is required"),

  // coverImageUrl: Yup.string().url("Cover image must be a valid URL"),

  // imageUrls: Yup.array()
  //   .of(Yup.string().url("Each image URL must be a valid URL"))
  //   .min(1, "At least one image URL is required"),

  // categoryIds: Yup.array()
  //   .of(Yup.number().integer("Category ID must be an integer"))
  //   .min(1, "At least one category ID is required"),

  // metaTitle: Yup.string().required("Meta title is required"),
});

const useTourForm = (
  onSubmit: (
    values: IRequestTours,
    formikHelpers: FormikHelpers<IRequestTours>,
  ) => void | Promise<unknown>,
  initialValues: IRequestTours = defaultValues,
) => {
  return useFormik<IRequestTours>({
    initialValues,
    enableReinitialize: true,
    validationSchema: schema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit,
  });
};

export default useTourForm;
