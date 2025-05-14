"use client";

import Link from "next/link";

const CartItem = ({ item, key, updateQuantity, deleteItem }) => {
  return (
    <>
      <div className={`sb-cart-item sb-cart-item-${key}`}>
        <div className="row align-items-center">
          <div className="col-lg-6">
            <Link className="sb-product" href={`/product`}>
              <div className="sb-cover-frame">
                <img src={item.productDetails.image[0].url} alt={item.title} />
              </div>
              <div className="sb-prod-description">
                <h4 className="media-heading sb-mb-10"></h4>
                <p className="sb-text sb-text-sm">{item.productDetails.name}</p>
              </div>
            </Link>
          </div>
          <div className="col-6 col-lg-3">
            <div className="sb-input-number-frame">
              <div
                className="sb-input-number-btn sb-sub"
                onClick={() =>
                  updateQuantity(item.productDetails._id, "decrease")
                }
              >
                -
              </div>
              <input type="number" value={item.quantity} readOnly />
              <div
                className="sb-input-number-btn sb-add"
                onClick={() =>
                  updateQuantity(item.productDetails._id, "increase")
                }
              >
                +
              </div>
            </div>
          </div>
          <div className="col-3 col-lg-1">
            <div className="sb-price-1">
              <span>Price: </span>₦{item.productDetails.price}
            </div>
          </div>
          <div className="col-3 col-lg-1">
            <div className="sb-price-2">
              <span>Total: </span>₦{item.productDetails.price * item.quantity}
            </div>
          </div>
          <div className="col-1">
            <a
              href="#."
              className="sb-remove"
              onClick={() => deleteItem(item.productDetails._id)}
            >
              +
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default CartItem;
