"use client";

import { useState, useEffect } from "react";

import CartData from "@data/cart.json";
import NetworkInstance from "../../api/NetworkInstance";
import Toast from "../Toast";
const ProductButtons = ({ productId, categoryId }) => {
  const networkInstance = NetworkInstance();
  const [cartTotal, setCartTotal] = useState(0);
  const [toast, setToast] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const minQuantity = 1;
  const maxQuantity = 10;

  useEffect(() => {
    const cartNumberEl = document.querySelector(".sb-cart-number");
    cartNumberEl.innerHTML = cartTotal;
  }, [cartTotal]);

  const addToCart = async (e) => {
    const payload = { productId, categoryId, quantity };

    const existingCartId = localStorage.getItem("cartId");
    if (existingCartId) {
      payload.cartId = existingCartId;
    }

    try {
      const response = await networkInstance.post(`/cart/add`, payload);

      if (response?.status === 200 || response?.status === 201) {
        // fetchCartCount();
        setToast({
          message: "Product added to cart!",
          type: "success",
        });
        console.log("success");
        const { cartId: newCart } = response.data;

        if (newCart) {
          localStorage.setItem("cartId", newCart);
          console.log(`cart ID: ${newCart}`);
        } else {
          console.log(`cart ID: not found`);
        }
      }
    } catch (err) {
      console.log("Not added to cart:", err?.response?.data || err, payload);
    }
    e.preventDefault();
    const cartNumberEl = document.querySelector(".sb-cart-number");
    setCartTotal(cartTotal + quantity);

    cartNumberEl.classList.add("sb-added");

    setTimeout(() => {
      cartNumberEl.classList.remove("sb-added");
    }, 600);
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="sb-buttons-frame">
        <div className="sb-input-number-frame">
          <div
            className="sb-input-number-btn sb-sub"
            onClick={() =>
              setQuantity(quantity > minQuantity ? quantity - 1 : quantity)
            }
          >
            -
          </div>
          <input
            type="number"
            readOnly
            value={quantity}
            min={minQuantity}
            max={maxQuantity}
          />
          <div
            className="sb-input-number-btn sb-add"
            onClick={() =>
              setQuantity(quantity < maxQuantity ? quantity + 1 : quantity)
            }
          >
            +
          </div>
        </div>
        {/* button */}
        <a href="#." className="sb-btn sb-atc" onClick={(e) => addToCart(e)}>
          <span className="sb-icon">
            <img src="/img/ui/icons/cart.svg" alt="icon" />
          </span>
          <span className="sb-add-to-cart-text">Add to cart</span>
          <span className="sb-added-text">Added</span>
        </a>
        {/* button end */}
      </div>
    </>
  );
};
export default ProductButtons;
