import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function FormikFormWithYUP() {
    const formik = useFormik({
        initialValues: {
            name: "",
            email: ""
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(15, "Must be 15 characters or less.")
                .required("Name must not be empty."),
            email: Yup.string()
                .email("Please enter a valid email.")
                .required("Email must not be empty."),
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            resetForm();
        }
    });

    const showNameError = formik.touched.name && formik.errors.name;
    const showEmailError = formik.touched.email && formik.errors.email;

    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Your Name</label>
            <input
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
            />
            {showNameError ? <div>{formik.errors.name}</div> : null}

            <label htmlFor="email">Your Email</label>
            <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
            />
            {showEmailError ? <div>{formik.errors.email}</div> : null}

            <button type="submit">Submit</button>
        </form>
    );
}
