"use client";
import NetworkInstance from "../../api/NetworkInstance";
import { Formik } from "formik";
import { useState } from "react";
import Toast from "../Toast";

const ReservationForm = () => {
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
        initialValues={{
          name: "",
          email: "",
          phone: "",
          period: "",
          person: 1,
        }}
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
            const response = await networkInstance.post("/reserve", values, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (response.status === 200 || response.status === 201) {
              setToast({
                message: "Reservation Succesful!",
                type: "success",
              });
              resetForm();
            }
          } catch (error) {
            console.error("Submission error:", error?.response?.data || error);
            setToast({
              message: "Login to book reservation.",
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
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} id="reservationForm">
            <div className="row">
              <div className="col-lg-12">
                <div className="sb-group-input">
                  <input
                    type="text"
                    placeholder=" "
                    name="name"
                    required="required"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  <span className="sb-bar"></span>
                  <label>Name</label>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="sb-group-input">
                  <input
                    type="email"
                    placeholder=" "
                    name="email"
                    required="required"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <span className="sb-bar"></span>
                  <label>Email</label>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="sb-group-input">
                  <input
                    type="tel"
                    placeholder=" "
                    name="phone"
                    required="required"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                  />
                  <span className="sb-bar"></span>
                  <label>Phone</label>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="sb-group-input">
                  <input
                    type="text"
                    placeholder=" "
                    name="period"
                    required="required"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.period}
                  />
                  <span className="sb-bar"></span>
                  <label>Time and Date</label>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="sb-group-input">
                  <input
                    type="number"
                    placeholder=" "
                    name="person"
                    required="required"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.person}
                    min={1}
                    max={6}
                  />
                  <span className="sb-bar"></span>
                  <label>Person</label>
                </div>
              </div>
            </div>

            {/* button */}
            <button
              type="submit"
              className="sb-btn sb-cf-submit sb-show-success"
            >
              <span className="sb-icon">
                <img src="/img/ui/icons/arrow.svg" alt="icon" />
              </span>
              <span>Reserve</span>
            </button>
            {/* button end */}
          </form>
        )}
      </Formik>
      {/* contact form end */}
    </>
  );
};
export default ReservationForm;
