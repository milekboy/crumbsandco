"use client";
import { useState, useEffect } from "react";
import NetworkInstance from "../../api/NetworkInstance";
import Link from "next/link";

const MiniCart = () => {
  const [cartItems, setCartItems] = useState([]);

  const networkInstance = NetworkInstance();
  useEffect(() => {
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
    getCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);
  return (
    <>
      <div className="sb-minicart-content">
        <div className="sb-ib-title-frame sb-mb-30">
          <h4>Your order.</h4>
          <i className="fas fa-arrow-down" />
        </div>
        {cartItems.map((item, key) => (
          <Link
            href="/product"
            className="sb-menu-item sb-menu-item-sm sb-mb-15"
            key={`mini-cart-item-${key}`}
          >
            <div className="sb-cover-frame">
              <img src={item.productDetails.image[0].url} alt={item.title} />
            </div>
            <div className="sb-card-tp">
              <h4 className="text-gray-600">{item.quantity}X</h4>
              <h4 className="sb-card-title">{item.productDetails.name}</h4>
              <div className="sb-price">
                <sub>₦</sub> {item.productDetails.price * item.quantity}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="sb-minicart-footer">
        {/* button */}
        <Link href="/cart" className="sb-btn sb-btn-gray sb-btn-text">
          <span>View order</span>
        </Link>
        {/* button end */}
        {/* button */}
        <Link href="/checkout" className="sb-btn sb-btn-text">
          <span>Checkout</span>
        </Link>
        {/* button end */}
      </div>
    </>
  );
};
export default MiniCart;
