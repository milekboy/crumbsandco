"use client";
import LoadingOverlay from "../LoadingOverlay";
import Link from "next/link";
import Toast from "../Toast";
import { useState, useEffect } from "react";
import NetworkInstance from "../../api/NetworkInstance";
import CartData from "@data/cart.json";

const ProductItem = ({ item, index, marginBottom, moreType }) => {
  const [cartTotal, setCartTotal] = useState(CartData.total);
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState(null);

  const [loading, setLoading] = useState(false);
  const stars = ["", "", "", "", ""];
  useEffect(() => {
    const cartNumberEl = document.querySelector(".sb-cart-number");
    cartNumberEl.innerHTML = cartTotal;
  }, [cartTotal]);

  // const addToCart = (e) => {
  //   e.preventDefault();
  //   const cartNumberEl = document.querySelector(".sb-cart-number");
  //   setCartTotal(cartTotal + quantity);

  //   cartNumberEl.classList.add("sb-added");
  //   e.currentTarget.classList.add("sb-added");

  //   setTimeout(() => {
  //     cartNumberEl.classList.remove("sb-added");
  //   }, 600);
  // };

  const addToCart = async (e) => {
    e.preventDefault();
    const cartNumberEl = document.querySelector(".sb-cart-number");
    setCartTotal(cartTotal + quantity);

    cartNumberEl.classList.add("sb-added");
    e.currentTarget.classList.add("sb-added");

    setTimeout(() => {
      cartNumberEl.classList.remove("sb-added");
    }, 600);

    if (!item._id || !item.category) {
      setToast({ message: "Missing product or category ID.", type: "error" });
      return;
    }

    const payload = {
      productId: item._id,
      categoryId: item.category,
      quantity: 1,
    };

    const existingCartId = localStorage.getItem("cartId");
    if (existingCartId) {
      payload.cartId = existingCartId;
    }

    try {
      const response = await NetworkInstance().post("/cart/add", payload, {
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
      }
    } catch (err) {
      console.error("Not added to cart:", err?.response?.data || err, payload);
      setToast({ message: "Failed to add to cart.", type: "error" });
    }
  };

  return (
    <>
      {loading && <LoadingOverlay />}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className={`sb-menu-item sb-mb-${marginBottom}`}>
        <Link
          onClick={() => setLoading(true)}
          href={`/product/${item._id}`}
          className="sb-cover-frame"
        >
          {item.productImages?.[0]?.url && (
            <img src={item.productImages[0].url} alt={item.title} />
          )}
          <div dangerouslySetInnerHTML={{ __html: item.badge }} />
        </Link>
        <div className="sb-card-tp">
          <h4 className="sb-card-title">
            <Link href={`/product`}>{item.name}</Link>
          </h4>
          <div className="sb-price">
            <sub>₦</sub> {item.price}
          </div>
        </div>
        <div className="sb-description">
          <p className="sb-text sb-mb-15">{item.description}</p>
        </div>
        <ul className="sb-stars sb-mb-15">
          {stars
            .slice(0, item.ratings?.[0]?.rating || 1)
            .map((star_item, star_key) => (
              <li key={`products-item-${index}-rating-star-${star_key}`}>
                <i className="fas fa-star"></i>
              </li>
            ))}
          <li>
            <span>({item.ratings?.[0]?.rating || 0} ratings)</span>
          </li>
        </ul>
        <div className="sb-card-buttons-frame">
          {/* button */}
          {moreType != 2 ? (
            <Link
              onClick={() => setLoading(true)}
              href={`/product/${item._id}`}
              className="sb-btn sb-btn-2 sb-btn-gray sb-btn-icon sb-m-0"
            >
              <span className="sb-icon">
                <img src="/img/ui/icons/arrow.svg" alt="icon" />
              </span>
            </Link>
          ) : (
            <Link href={`/product/${item._id}`} className="sb-btn sb-btn-gray">
              <span className="sb-icon">
                <img src="/img/ui/icons/arrow.svg" alt="icon" />
              </span>
              <span>Details</span>
            </Link>
          )}
          {/* button end */}
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
      </div>
    </>
  );
};
export default ProductItem;
