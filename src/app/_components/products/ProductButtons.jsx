"use client";

import { useState } from "react";
import NetworkInstance from "../../api/NetworkInstance";
import Toast from "../Toast";

const ProductButtons = ({ productId, categoryId }) => {
  const networkInstance = NetworkInstance();

  const [quantity, setQuantity] = useState(1);
  const [cartTotal, setCartTotal] = useState(0);
  const [toast, setToast] = useState(null);

  const minQuantity = 1;
  const maxQuantity = 10;

  const addToCart = async (e) => {
    e.preventDefault();

    if (!productId || !categoryId) {
      setToast({ message: "Missing product or category ID.", type: "error" });
      return;
    }

    const payload = {
      productId,
      categoryId,
      quantity,
    };

    const existingCartId = localStorage.getItem("cartId");
    if (existingCartId) {
      payload.cartId = existingCartId;
    }

    try {
      const response = await networkInstance.post("/cart/add", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response?.status === 200 || response?.status === 201) {
        const newCartId = response.data?.cartId;
        if (newCartId) {
          localStorage.setItem("cartId", newCartId);
        }

        setCartTotal((prev) => prev + 1);
        setToast({ message: "Product added to cart!", type: "success" });

        // Optional: update bubble count in DOM
        const cartNumberEl = document.querySelector(".sb-cart-number");
        if (cartNumberEl) {
          cartNumberEl.innerHTML = Number(cartNumberEl.innerHTML || 0) + 1;
          cartNumberEl.classList.add("sb-added");
          setTimeout(() => {
            cartNumberEl.classList.remove("sb-added");
          }, 600);
        }
      }
    } catch (err) {
      console.error("Not added to cart:", err?.response?.data || err, payload);
      setToast({ message: "Failed to add to cart.", type: "error" });
    }
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
        {/* Quantity Controls */}
        <div className="sb-input-number-frame">
          <div
            className="sb-input-number-btn sb-sub"
            onClick={() => setQuantity((q) => (q > minQuantity ? q - 1 : q))}
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
            onClick={() => setQuantity((q) => (q < maxQuantity ? q + 1 : q))}
          >
            +
          </div>
        </div>

        {/* Add to Cart Button */}
        <a href="#." className="sb-btn sb-atc" onClick={addToCart}>
          <span className="sb-icon">
            <img src="/img/ui/icons/cart.svg" alt="icon" />
          </span>
          <span className="sb-add-to-cart-text">Add to cart</span>
          <span className="sb-added-text">Added</span>
        </a>
      </div>
    </>
  );
};

export default ProductButtons;
