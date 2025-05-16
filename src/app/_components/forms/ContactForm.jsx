"use client";
import NetworkInstance from "../../api/NetworkInstance";
import { Formik } from "formik";
import { useState } from "react";
import Toast from "../Toast";

const ContactForm = () => {
  const networkInstance = NetworkInstance();
  const [toast, setToast] = useState(null);

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <Formik
        initialValues={{ email: "", name: "", message: "", phone: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const token = localStorage.getItem("token");
          try {
            const response = await networkInstance.post("/contact", values, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (response.status === 200 || response.status === 201) {
              setToast({
                message: "Message sent successfully!",
                type: "success",
              });
              resetForm();
            }
          } catch (error) {
            console.error("Submission error:", error?.response?.data || error);
            setToast({
              message: "Submission failed. Please try again.",
              type: "error",
            });
          }
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} id="contactForm">
            <div className="sb-group-input">
              <input
                type="text"
                placeholder=" "
                name="name"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <span className="sb-bar"></span>
              <label>Name</label>
            </div>

            <div className="sb-group-input">
              <input
                type="email"
                placeholder=" "
                name="email"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <span className="sb-bar"></span>
              <label>Email</label>
              {errors.email && touched.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="sb-group-input">
              <input
                type="text"
                placeholder=" "
                name="phone"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />
              <span className="sb-bar"></span>
              <label>Phone Number</label>
            </div>

            <div className="sb-group-input">
              <textarea
                placeholder=" "
                name="message"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.message}
              />
              <span className="sb-bar"></span>
              <label>Message</label>
            </div>

            <p className="sb-text sb-text-xs sb-mb-30">
              *We promise not to disclose your <br />
              personal information to third parties.
            </p>

            <button
              type="submit"
              className="sb-btn sb-cf-submit sb-show-success"
              disabled={isSubmitting}
            >
              <span className="sb-icon">
                <img src="/img/ui/icons/arrow.svg" alt="icon" />
              </span>
              <span>{isSubmitting ? "Sending..." : "Send"}</span>
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ContactForm;
