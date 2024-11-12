import * as yup from "yup";

export const userSchema = yup
    .object({
        id: yup.string().required("id is required"),
        fullname: yup.string().required("fullname is required"),
        email: yup.string().email("invalid email").required("email is required"),
        phone: yup
            .string()
            .min(10, "Phone number must be at least 10 digits")
            .max(15, "Phone number must be at most 15 digits")
            .matches(/^[0-9]+$/, "Phone number must contain only digits")
            .nullable(),  
        position: yup.string().nullable(),  
        company: yup.string().nullable(),  
        district: yup.string().nullable(),  
        ward: yup.string().nullable(),  
        city: yup.string().nullable(),  
        country: yup.string().nullable(),  
        facebook: yup.string().url("Invalid URL").nullable(),  
        twitter: yup.string().url("Invalid URL").nullable(),  
        linkedin: yup.string().url("Invalid URL").nullable(),  
        instagram: yup.string().url("Invalid URL").nullable()  
        // avatar: yup.string().url("Invalid URL").nullable() 
    })
    .required();

export const resgistationSchema = yup.object({
    fullname: yup.string().required("fullname is required"),
    email: yup.string().email("invalid email").required("email is required"),
    phone: yup
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number must be at most 15 digits")
        .matches(/^[0-9]+$/, "Phone number must contain only digits")
        .nullable(), 
    password: yup.string().min(8, "Password must be at least 8 characters").required("password is required")
});
