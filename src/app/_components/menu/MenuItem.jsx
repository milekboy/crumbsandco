"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Link from "next/link";
const MenuItem = ({ item, index, noImage, marginBottom, setLoading }) => {
  const stars = ["", "", "", "", ""];

  const [img, setImg] = useState(false);
  const [imgValue, setImgValue] = useState([]);

  return (
    <>
      <Link
        href={`/product/${item._id}`}
        className={`sb-menu-item sb-mb-${marginBottom}`}
        onClick={() => setLoading(true)}
      >
        {noImage != 1 && (
          <div className="sb-cover-frame">
            <img src={item.productImages[0].url} alt={item.title} />
            <div dangerouslySetInnerHTML={{ __html: item.badge }} />
          </div>
        )}
        <div className="sb-card-tp">
          <h4 className="sb-card-title">{item.name}</h4>
          <div className="sb-price px-2">
            <sub>₦</sub> {item.price}
          </div>
        </div>
        <div className="sb-description">
          <p className="sb-text sb-mb-15">{item.description}</p>
          {/* <ul className="sb-stars">
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
          </ul> */}
        </div>
      </Link>

      <Lightbox
        open={img}
        close={() => setImg(false)}
        slides={imgValue}
        styles={{ container: { backgroundColor: "rgba(38, 31, 65, .85)" } }}
        render={{
          buttonPrev: imgValue.length <= 1 ? () => null : undefined,
          buttonNext: imgValue.length <= 1 ? () => null : undefined,
        }}
      />
    </>
  );
};
export default MenuItem;
