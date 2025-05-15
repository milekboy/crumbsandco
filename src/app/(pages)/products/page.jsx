"use client";

import { useEffect, useState } from "react";
import NetworkInstance from "../../api/NetworkInstance";
import PageBanner from "@components/PageBanner";
import ProductsGrid from "@components/products/ProductsGrid";
import PromoSection from "@components/sections/Promo";

const Products = () => {
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
      <PageBanner
        pageTitle={"Main dishes"}
        breadTitle={"Main dishes"}
        type={1}
      />

      {/* shop list */}
      <section className="sb-menu-section sb-p-90-60">
        <div className="sb-bg-1">
          <div />
        </div>
        <div className="container">
          <ProductsGrid items={products} />

          <div>
            <ul className="sb-pagination">
              <li className="sb-active">
                <a href="#.">1</a>
              </li>
              <li>
                <a href="#">2</a>
              </li>
              <li>
                <a href="#">3</a>
              </li>
              <li>
                <a href="#">4</a>
              </li>
              <li>
                <a href="#">...</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* shop list end */}

      <PromoSection />
    </>
  );
};
export default Products;
