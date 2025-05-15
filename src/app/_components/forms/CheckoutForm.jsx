"use client";
import { useState } from "react";
import { Formik } from "formik";
import NetworkInstance from "../../api/NetworkInstance";
import Toast from "../Toast";
const CheckoutForm = ({ onSuccess }) => {
  const [toast, setToast] = useState(null);
  const networkInstance = NetworkInstance();

  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        phoneNumber: "",
        country: "",
        city: "",
        state: "",
        street: "",
        apartment: "",
      }}
      validate={() => ({})}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const status = document.getElementById("checkoutFormStatus");

        try {
          const response = await networkInstance.post(
            "/shipping-address/create",
            values
          );

          if (response.status === 200 || response.status === 201) {
            const shippingId = response.data.shippingAddress._id;
            localStorage.setItem("shippingId", shippingId);
            console.log(shippingId, "-shippingID");
            setToast({ message: "Shipping details updated", type: "success" });
            if (onSuccess) {
              onSuccess(shippingId);
            }
            resetForm();
          } else {
            setToast({ message: "Oops! something went wrong", type: "error" });
          }
        } catch (error) {
          console.log(values);
          status.innerHTML = "<h5>Oops! Could not submit the form.</h5>";
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
      }) => (
        <form
          onSubmit={handleSubmit}
          id="checkoutForm"
          className="sb-checkout-form"
        >
          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          )}
          <div className="sb-mb-30">
            <h3>Billing details</h3>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="sb-group-input">
                <input
                  type="text"
                  placeholder=" "
                  name="fullName"
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fullName}
                />
                <span className="sb-bar"></span>
                <label>Full name</label>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="sb-group-input">
                <input
                  type="text"
                  placeholder=" "
                  name="country"
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.country}
                />
                <span className="sb-bar"></span>
                <label>Country</label>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="sb-group-input">
                <input
                  type="text"
                  placeholder=" "
                  name="city"
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                />
                <span className="sb-bar"></span>
                <label>City</label>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="sb-group-input">
                <input
                  type="text"
                  placeholder=" "
                  name="state"
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.state}
                />
                <span className="sb-bar"></span>
                <label>State / Province</label>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="sb-group-input">
                <input
                  type="text"
                  placeholder=" "
                  name="street"
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.street}
                />
                <span className="sb-bar"></span>
                <label>Address</label>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="sb-group-input">
                <input
                  type="tel"
                  placeholder=" "
                  name="phoneNumber"
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                />
                <span className="sb-bar"></span>
                <label>Phone</label>
              </div>
            </div>
            <div className="col-lg-6">
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
              </div>
            </div>
          </div>

          <button type="submit" className="sb-btn sb-m-0">
            <span className="sb-icon">
              <img src="/img/ui/icons/arrow.svg" alt="icon" />
            </span>
            <span>Place order</span>
          </button>

          <div id="checkoutFormStatus" className="form-status"></div>
        </form>
      )}
    </Formik>
  );
};

export default CheckoutForm;
