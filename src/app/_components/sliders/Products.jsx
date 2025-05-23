"use client";
import NetworkInstance from "../../api/NetworkInstance";

import { useEffect, useState } from "react";
import { SliderProps } from "@common/sliderProps";
import { Swiper, SwiperSlide } from "swiper/react";

import Data from "@data/sliders/products";
import Link from "next/link";

import MenuItem from "@components/menu/MenuItem";
import ProductItem from "@components/products/ProductItem";

const ProductsSlider = ({
  setLoading,
  items,
  title,
  description,
  button = {},
  slidesPerView,
  paddingTop = 0,
  bgType,
  itemType,
}) => {
  var moreType = "";

  if (slidesPerView == 3) {
    moreType = 2;
  }
  const [products, setProducts] = useState([]);
  const networkInstance = NetworkInstance();

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProducts = async () => {
    try {
      const res = await networkInstance.get("product/get-all-products");
      setProducts(res.data);
      console.log(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  return (
    <>
      {/* short menu */}
      <section className={`sb-short-menu sb-p-${paddingTop}-90`}>
        {bgType == 2 ? (
          <div className="sb-bg-1" style={{ marginTop: "-120px" }}>
            <div></div>
          </div>
        ) : (
          <div className="sb-bg-2">
            <div></div>
          </div>
        )}
        <div className="container">
          <div className="sb-group-title sb-mb-30">
            <div className="sb-left sb-mb-30">
              <h2
                className="sb-mb-30"
                dangerouslySetInnerHTML={{ __html: title ? title : Data.title }}
              />
              <p
                className="sb-text"
                dangerouslySetInnerHTML={{
                  __html: description ? description : Data.description,
                }}
              />
            </div>
            <div className="sb-right sb-mb-30">
              {/* slider navigation */}
              <div className="sb-slider-nav">
                <div className="sb-prev-btn sb-short-menu-prev">
                  <i className="fas fa-arrow-left"></i>
                </div>
                <div className="sb-next-btn sb-short-menu-next">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
              {/* slider navigation end */}
              {/* button */}
              {button != 0 && (
                <Link
                  onClick={() => setLoading(true)}
                  href="menu-2"
                  className="sb-btn"
                >
                  <span className="sb-icon">
                    <img
                      src={button.icon ? button.icon : Data.button.icon}
                      alt="icon"
                    />
                  </span>
                  <span>{button.label ? button.label : Data.button.label}</span>
                </Link>
              )}
              {/* button end */}
            </div>
          </div>

          <Swiper
            {...SliderProps.shortMenuSlider4}
            className={`swiper-container sb-short-menu-slider-4i`}
          >
            {products.slice(0, 8).map((product, key) => (
              <SwiperSlide
                className="swiper-slide"
                key={`products-slider-item-${key}`}
              >
                {/* {itemType == "product" ? ( */}
                {/* <ProductItem
                  item={product}
                  index={key}
                  marginBottom={0}
                  moreType={moreType}
                /> */}
                {/* {/* ) : ( */}
                <MenuItem
                  setLoading={setLoading}
                  item={product}
                  index={key}
                  marginBottom={0}
                />
                {/* )} */}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      {/* short menu end */}
    </>
  );
};
export default ProductsSlider;
