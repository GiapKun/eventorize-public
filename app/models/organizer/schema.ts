import * as yup from "yup";

export const organizerSchema = yup
    .object({
        id: yup.string().required("Id is required"),
        name: yup.string().required("Name is required"),
        email: yup.string().email("Invalid email").required("Email is required"),
        logo: yup.string().url("Invalid URL").nullable(),
        phone: yup
            .string()
            .min(10, "Phone number must be at least 10 digits")
            .max(15, "Phone number must be at most 15 digits")
            .matches(/^[0-9]+$/, "Phone number must contain only digits")
            .nullable(),
        description: yup.string().nullable(),
        district: yup.string().nullable(),
        ward: yup.string().nullable(),
        city: yup.string().nullable(),
        country: yup.string().nullable(),
        facebook: yup.string().url("Invalid URL").nullable(),
        twitter: yup.string().url("Invalid URL").nullable(),
        linkedin: yup.string().url("Invalid URL").nullable(),
        instagram: yup.string().url("Invalid URL").nullable()
    })
    .required();

export const updateOrganizerSchema = organizerSchema.clone().shape({
    name: yup.string().notRequired(),
    email: yup.string().email("Invalid email").notRequired()
});
