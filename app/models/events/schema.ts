import * as yup from "yup";

export const eventSchema = yup
    .object({
        organizer_id: yup.string().required("Organizer Id is required"),
        title: yup.string().required("Title is required"),
        thumbnail: yup.string(),
        description: yup.string().required("Description is required"),
        link: yup.string().url("Invalid URL"),
        start_date: yup.string().required("Start Date is required"),
        end_date: yup.string().required("End Date is required"),
        is_online: yup.boolean().required("Is Online is required"),
        address: yup.string(),
        district: yup.string(),
        ward: yup.string(),
        city: yup.string(),
        country: yup.string()
    })
    .required();

export const updateEventSchema = eventSchema.shape({
    id: yup.string().required("Id is required"),
    organizer_id: yup.string(),
    title: yup.string(),
    thumbnail: yup.string().url("Invalid URL"),
    description: yup.string(),
    link: yup.string().url("Invalid URL"),
    start_date: yup.string(),
    end_date: yup.string(),
    is_online: yup.boolean(),
    address: yup.string(),
    district: yup.string(),
    ward: yup.string(),
    city: yup.string(),
    country: yup.string()
});
