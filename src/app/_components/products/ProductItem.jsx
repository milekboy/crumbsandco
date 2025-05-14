"use client";
import LoadingOverlay from "../LoadingOverlay";
import Link from "next/link";
import { useState, useEffect } from "react";

import CartData from "@data/cart.json";

const ProductItem = ({ item, index, marginBottom, moreType }) => {
  const [cartTotal, setCartTotal] = useState(CartData.total);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const stars = ["", "", "", "", ""];
  useEffect(() => {
    const cartNumberEl = document.querySelector(".sb-cart-number");
    cartNumberEl.innerHTML = cartTotal;
  }, [cartTotal]);

  const addToCart = (e) => {
    e.preventDefault();
    const cartNumberEl = document.querySelector(".sb-cart-number");
    setCartTotal(cartTotal + quantity);

    cartNumberEl.classList.add("sb-added");
    e.currentTarget.classList.add("sb-added");

    setTimeout(() => {
      cartNumberEl.classList.remove("sb-added");
    }, 600);
  };

  return (
    <>
      {loading && <LoadingOverlay />}
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
