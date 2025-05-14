"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

import NetworkInstance from "../../../api/NetworkInstance";
import PageBanner from "@components/PageBanner";
import ReviewItem from "@components/reviews/ReviewItem";
import ProductImage from "@components/products/ProductImage";
import ProductButtons from "@components/products/ProductButtons";
import CallToActionTwoSection from "@components/sections/CallToActionTwo";
import ProductsData from "@data/products.json";

const ProductsSlider = dynamic(() => import("@components/sliders/Products"), {
  ssr: false,
});
const ProductTabs = dynamic(() => import("@components/products/ProductTabs"), {
  ssr: false,
});

const Products = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const res = await NetworkInstance().get("product/get-all-products");
      const matchedProduct = res.data.find((p) => p._id === params?.id);
      setProduct(matchedProduct || null);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  if (!product) {
    return <div className="text-center text-xl">Loading Product...</div>;
  }

  const ProductAtts = () => {
    const AttsData = [
      { label: "Numquam", value: "1 pack" },
      { label: "Cupiditate", value: "150g" },
      { label: "Adipisicing", value: "500g" },
      { label: "Dolorem obcaecati", value: "3 Teaspoon" },
      { label: "Porro", value: "2 pack" },
      { label: "Facilis", value: "1kg" },
      { label: "Goluptatem", value: "1 Teaspoon" },
      { label: "Vel fuga", value: "300g" },
    ];
    return (
      <ul className="sb-list">
        {AttsData.map((item, i) => (
          <li key={i}>
            <b>{item.label}</b>
            <span>{item.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  const ProductDescription = () => (
    <div className="sb-text">{product.description}</div>
  );

  const ProductReviews = () => (
    <div className="row">
      {(product.ratings || []).map((item, i) => (
        <div className="col-lg-6" key={i}>
          <ReviewItem item={item} marginBottom={60} />
        </div>
      ))}
    </div>
  );

  const tabs = [
    { slug: "ingredients", name: "Ingredients" },
    { slug: "details", name: "Product details" },
    { slug: "reviews", name: "Reviews" },
  ];

  return (
    <>
      <PageBanner
        pageTitle="Product Detail"
        breadTitle="Product Detail"
        type={1}
      />

      <section className="sb-p-90-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              {product.productImages?.[0]?.url && (
                <ProductImage
                  src={product.productImages[0].url}
                  alt={product.name}
                />
              )}
            </div>
            <div className="col-lg-6">
              <div className="sb-product-description sb-mb-90">
                <div className="sb-price-frame sb-mb-30">
                  <h3>{product.name}</h3>
                  <div className="sb-price">
                    <sub>₦</sub> {product.price}
                  </div>
                </div>

                <ul className="sb-stars sb-mb-25">
                  {Array.from({
                    length: Math.round(product.ratings?.[0]?.rating || 0),
                  }).map((_, i) => (
                    <li key={i}>
                      <i className="fas fa-star"></i>
                    </li>
                  ))}
                  <li>
                    <span>{product.ratings?.[0]?.rating || 0}</span>
                  </li>
                </ul>

                <p className="sb-text sb-mb-30">{product.description}</p>

                <div className="row">
                  {[1, 2, 3].map((step) => (
                    <div className="col-lg-4" key={step}>
                      <div className="sb-features-item sb-features-item-sm sb-mb-30">
                        <div className="sb-number">0{step}</div>
                        <div className="sb-feature-text">
                          <h4 className="sb-mb-15">
                            {step === 1
                              ? "Add to the cart and place an order"
                              : step === 2
                              ? "Enter your phone number and address"
                              : "Enjoy your favorite food at home!"}
                          </h4>
                          <p className="sb-text sb-text-sm">
                            Sample description step {step}.
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <ProductButtons />
              </div>
            </div>
          </div>

          <ProductTabs items={tabs} active="ingredients" />

          <div className="sb-masonry-grid sb-tabs">
            <div className="sb-grid-sizer" />
            {tabs.map((tab) => (
              <div key={tab.slug} className={`sb-grid-item sb-${tab.slug}-tab`}>
                <div className="sb-tab">
                  {tab.slug === "ingredients" && <ProductAtts />}
                  {tab.slug === "details" && <ProductDescription />}
                  {tab.slug === "reviews" && <ProductReviews />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProductsSlider
        items={ProductsData.items}
        title="It is usually bought together with this product"
        description="Consectetur numquam poro nemo veniam<br>eligendi rem adipisci quo modi."
        button={0}
        slidesPerView={4}
        itemType="product"
      />

      <CallToActionTwoSection />
    </>
  );
};

export default Products;
