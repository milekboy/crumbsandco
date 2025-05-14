"use client";

import { useState, useEffect } from "react";
import NetworkInstance from "../../api/NetworkInstance";
import Toast from "../Toast";

const ProductButtons = ({ productId, categoryId }) => {
  const networkInstance = NetworkInstance();
  const [cartTotal, setCartTotal] = useState(0);
  const [toast, setToast] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const minQuantity = 1;
  const maxQuantity = 10;

  const addToCart = async (e) => {
    e.preventDefault();

    const payload = {
      productId,
      categoryId,
      quantity: 1,
    };

    const existingCartId = localStorage.getItem("cartId");
    if (existingCartId) {
      payload.cartId = existingCartId;
    }

    try {
      const response = await networkInstance.post(`/cart/add`, payload);

      if (response?.status === 200 || response?.status === 201) {
        const newCartId = response.data?.cartId;
        if (newCartId) {
          localStorage.setItem("cartId", newCartId);
        }

        const newTotal = cartTotal + quantity;
        setCartTotal(newTotal);

        setToast({
          message: "Product added to cart!",
          type: "success",
        });
      }
    } catch (err) {
      console.error("Not added to cart:", err?.response?.data || err, payload);
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
