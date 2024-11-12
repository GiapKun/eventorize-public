import * as yup from "yup";

export const permissionSchema = yup
    .object({
        id: yup.string().required("Id is required"),
        name: yup.string().required("Name is required"),
        scope: yup.string().required("Scope is required"),
        api_path: yup.string().required("URL is required"),
        method: yup.string().required("Method is required"),
        group: yup.string().required("Group is required"),
        status: yup.string().required("Status is required"),
        description: yup.string().nullable()
    })
    .required();

export const updatePermissionSchema = permissionSchema.clone().shape({
    name: yup.string().notRequired(),
    scope: yup.string().notRequired(),
    api_path: yup.string().notRequired(),
    method: yup.string().notRequired(),
    group: yup.string().notRequired(),
    status: yup.string().notRequired()
});
