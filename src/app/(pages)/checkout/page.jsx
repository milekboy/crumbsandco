"use client";
import { useState, useEffect, useContext } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { CartContext } from "../../_components/CartContext";
import LoadingOverlay from "../../_components/LoadingOverlay";
import NetworkInstance from "../../api/NetworkInstance";

import PageBanner from "@components/PageBanner";
import CheckoutForm from "@components/forms/CheckoutForm";

import Link from "next/link";

const Checkout = () => {
  const router = useRouter();
  const { setCartCount } = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [shippingDetails, setShippingDetails] = useState(false);
  const [flutterwaveLoaded, setFlutterwaveLoaded] = useState(false);

  const networkInstance = NetworkInstance();

  async function getCart() {
    try {
      const cartId = localStorage.getItem("cartId");
      if (!cartId) {
        console.log("No cart ID found.");
        return;
      }
      // console.log(cartId);
      const res = await networkInstance.get(`/cart/view/${cartId}`);
      // console.log("Fetched cart:", res.data.items);
      setCartItems(res.data.items);
    } catch (err) {
      console.log("Error fetching cart:", err?.response?.data || err);
    }
  }
  useEffect(() => {
    getCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.productDetails.price * item.quantity,

    0
  );

  //fultterwave
  const publicKey = "FLWPUBK_TEST-f797b2a19e6d343574e84c5c036b2d44-X";
  function initiateFlutter(transactionRef, amount, customer) {
    if (!flutterwaveLoaded || typeof FlutterwaveCheckout !== "function") {
      console.log("script has not been loaded");
      alert("Payment system not ready. Please wait a moment.");
      return;
    }
    console.log("-payment");

    FlutterwaveCheckout({
      public_key: publicKey,
      tx_ref: transactionRef,
      amount: amount,
      currency: "NGN",
      customer: {
        email: customer.email,
        phonenumber: customer.phoneNumber,
        name: `${customer.firstName} ${customer.lastName}`,
      },
      callback: async function (data) {
        console.log("Flutterwave response:", data);

        try {
          await networkInstance.post("/order/webhook", {
            data: {
              status: data.status,
              tx_ref: data.tx_ref,
              transaction_id: data.transaction_id,
            },
          });

          if (data.status === "successful") {
            setCartCount(0);
            console.log("Payment successful! Your order is confirmed.");

            localStorage.removeItem("cartId");
            localStorage.removeItem("shippingId");

            router.push("/payment-successful");

            console.log("Payment successful! Your order is confirmed.");
          } else {
            console.log("❌ Payment failed or was cancelled.");
          }
        } catch (err) {
          console.error("Error sending status to webhook:", err);
          alert("Something went wrong while updating your payment status.");
        }
      },
      onclose: function () {
        console.log("Payment popup closed");
      },
      customizations: {
        title: "Product Payment",
        description: "Payment for product",
      },
    });
  }

  const makePayment = async (e) => {
    setLoading(true);
    const cartId = localStorage.getItem("cartId");
    const ShippingAddressId = localStorage.getItem("shippingId");
    let shippingDetails;
    try {
      const shippingId = localStorage.getItem("shippingId");
      if (!shippingId) {
        console.log("No shipping ID found.");
        return;
      }

      const res = await networkInstance.get(
        `/shipping-address/get/${shippingId}`
      );

      shippingDetails = res.data;
      console.log("shipping details", shippingDetails.fullName);
    } catch (err) {
      console.log("Error fetching shipping details:", err);
    }
    if (!cartId) {
      console.log("No cart ID found.");
      setLoading(false);
      return;
    }

    try {
      const cartRes = await networkInstance.get(`/cart/view/${cartId}`);

      // Check for missing products
      if (!cartRes.data.items || cartRes.data.items.length === 0) {
        console.log("No valid items found in cart.");
        return;
      }

      const validItems = cartRes.data.items.filter(
        (item) => item.productDetails && item.productDetails.name
      );

      if (validItems.length === 0) {
        console.log("Cart items contain invalid products.");
        return;
      }

      const response = await networkInstance.post(`/order/create/${cartId}`, {
        ShippingAddressId: ShippingAddressId,
      });

      if (response?.status === 200 || response?.status === 201) {
        console.log(response);
        const transactionId = response.data.transactionId;
        const customer = {
          email: shippingDetails.email,
          phoneNumber: shippingDetails.phoneNumber,
          firstName: shippingDetails.fullName.split(" ")[0],
          lastName: shippingDetails.fullName.split(" ")[1] || "",
          ShippingAddressId: ShippingAddressId,
        };
        console.log("starting");
        initiateFlutter(transactionId, subtotal, customer);
        setLoading(false);
      }
    } catch (err) {
      if (
        err.response?.data?.message?.includes("duplicate key") ||
        err.message?.includes("duplicate key")
      ) {
        localStorage.removeItem("cartId");
        console.log(ShippingAddressId);
        localStorage.removeItem("shippingId");
        alert("You've already placed an order for this cart.");
      }
      setLoading(false);
      console.log("Payment error:", err);
    }
  };

  return (
    <>
      <Script
        src="https://checkout.flutterwave.com/v3.js"
        strategy="lazyOnload"
        onLoad={() => {
          setFlutterwaveLoaded(true);
          console.log("script loaded successfully");
        }}
      />
      {loading && <LoadingOverlay />}
      <PageBanner pageTitle={"Checkout"} breadTitle={"Checkout"} type={1} />

      {/* checkout */}
      <section className="sb-p-90-90">
        <div className="container" data-sticky-container>
          <div className="row">
            <div className="col-lg-8">
              <CheckoutForm onSuccess={makePayment} />
            </div>
            <div className="col-lg-4">
              <div className="sb-pad-type-2 sb-sticky" data-margin-top="120">
                <div className="sb-co-cart-frame">
                  <div className="sb-cart-table">
                    <div className="sb-cart-table-header">
                      <div className="row">
                        <div className="col-lg-9">Product</div>
                        <div className="col-lg-3 text-right">Total</div>
                      </div>
                    </div>

                    {cartItems.map((item, key) => (
                      <div className="sb-cart-item">
                        <div className="row align-items-center">
                          <div className="col-lg-9">
                            <Link className="sb-product" href="/product">
                              <div className="sb-cover-frame">
                                <img
                                  src={item.productDetails.image[0].url}
                                  alt={item.title}
                                />
                              </div>
                              <div className="sb-prod-description">
                                <h4 className="sb-mb-10">
                                  {item.productDetails.name}
                                </h4>
                                <p className="sb-text sb-text-sm">
                                  x{item.quantity}
                                </p>
                              </div>
                            </Link>
                          </div>
                          <div className="col-lg-3 text-md-right">
                            <div className="sb-price-2">
                              <span>Total: </span>₦
                              {item.productDetails.price * item.quantity}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="sb-cart-total sb-cart-total-2">
                      <div className="sb-sum">
                        <div className="row">
                          <div className="col-6">
                            <div className="sb-total-title">Subtotal:</div>
                          </div>
                          <div className="col-6">
                            <div className="sb-price-1 text-right">
                              ₦{subtotal}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="sb-realy-sum">
                        <div className="row">
                          <div className="col-6">
                            <div className="sb-total-title">Total:</div>
                          </div>
                          <div className="col-6">
                            <div className="sb-price-2 text-right">
                              ₦{subtotal}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* checkout end */}
    </>
  );
};
export default Checkout;
