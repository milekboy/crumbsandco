"use client";
import { useState, useEffect } from "react";
import Toast from "../../_components/Toast";
import NetworkInstance from "../../api/NetworkInstance";
import AppData from "@data/app.json";
import CartData from "@data/cart.json";

import PageBanner from "@components/PageBanner";
import CartItem from "@components/products/CartItem";

import Link from "next/link";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [toast, setToast] = useState(null);

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

  const updateQuantity = async (productId, type) => {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) {
      console.log("No cart ID found.");
      return;
    }

    const currentItem = cartItems.find(
      (item) => item.productDetails._id === productId
    );

    if (!currentItem) return;

    const newQuantity =
      type === "increase"
        ? currentItem.quantity + 1
        : Math.max(1, currentItem.quantity - 1);

    try {
      const response = await networkInstance.put(
        `/cart/update-quantity/${cartId}`,
        {
          productId,
          quantity: newQuantity,
        }
      );

      if (response.status === 200) {
        setCartItems((prevCart) =>
          prevCart.map((item) =>
            item.productDetails._id === productId
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
        setToast({ message: "Quantity updated!", type: "success" });
      }
    } catch (err) {
      console.error("Error updating quantity:", err?.response?.data || err);
    }
  };

  const deleteItem = async (productId) => {
    try {
      const cartId = localStorage.getItem("cartId");
      if (!cartId) {
        console.log("No cart ID found.");
        return;
      }

      await networkInstance.delete(`/cart/remove/${cartId}`, {
        headers: {
          cartid: cartId,
        },
        data: {
          productId,
        },
      });

      await getCart();
      setToast({ message: "Product deleted from cart!", type: "warning" });
    } catch (error) {
      console.error("Error deleting item:", error?.response?.data || error);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.productDetails.price * item.quantity,

    0
  );
  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <PageBanner pageTitle={"Your order."} breadTitle={"Cart"} type={1} />

      {/* cart */}
      <section className="sb-p-90-90">
        <div className="container">
          <div className="sb-cart-table">
            <div className="sb-cart-table-header">
              <div className="row">
                <div className="col-lg-6">Product</div>
                <div className="col-lg-3">Quantity</div>
                <div className="col-lg-1">Price</div>
                <div className="col-lg-1">Total</div>
                <div className="col-lg-1"></div>
              </div>
            </div>

            {cartItems.map((item, key) => (
              <CartItem
                item={item}
                key={key}
                updateQuantity={updateQuantity}
                deleteItem={deleteItem}
              />
            ))}

            <div className="row justify-content-end">
              <div className="col-lg-6">
                <div className="sb-cart-total">
                  <div className="sb-sum">
                    <div className="row">
                      <div className="col-8">
                        <div className="sb-total-title">Subtotal:</div>
                      </div>
                      <div className="col-4">
                        <div className="sb-price-1 text-right">₦{subtotal}</div>
                      </div>
                    </div>
                  </div>
                  <div className="sb-sum">
                    <div className="row">
                      <div className="col-8">
                        <div className="sb-total-title">
                          Estimated shipping:
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="sb-price-1 text-right">₦0</div>
                      </div>
                    </div>
                  </div>
                  <div className="sb-realy-sum">
                    <div className="row">
                      <div className="col-8">
                        <div className="sb-total-title">Total:</div>
                      </div>
                      <div className="col-4">
                        <div className="sb-price-2 text-right">₦{subtotal}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sb-cart-btns-frame text-right">
                  {/* button */}
                  <Link href="/shop" className="sb-btn sb-btn-2 sb-btn-gray">
                    <span className="sb-icon">
                      <img src="/img/ui/icons/arrow-2.svg" alt="icon" />
                    </span>
                    <span>Continue shopping</span>
                  </Link>
                  {/* button end */}
                  {/* button */}
                  <Link href="/checkout" className="sb-btn sb-m-0">
                    <span className="sb-icon">
                      <img src="/img/ui/icons/arrow.svg" alt="icon" />
                    </span>
                    <span>Checkout</span>
                  </Link>
                  {/* button end */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* cart end */}
    </>
  );
};
export default Cart;
