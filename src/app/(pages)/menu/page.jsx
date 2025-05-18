"use client";
import { useState, useEffect } from "react";
import MenuData from "@data/menu.json";
import LoadingOverlay from "../../_components/LoadingOverlay";
import PageBanner from "@components/PageBanner";
import MenuGrid from "@components/menu/MenuGrid";
import PromoSection from "@components/sections/Promo";
import NetworkInstance from "../../api/NetworkInstance";
const Menu1 = () => {
  const networkInstance = NetworkInstance();
  const [products, setProducts] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [starters, setStarters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drinks, setDrinks] = useState([]);
  useEffect(
    () => {
      getFilteredProducts();
      getDesserts();
      getStarters();
      getDrinks();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  async function getFilteredProducts() {
    try {
      const res = await networkInstance.get(
        `product/filter/category-name?name=${"Main Dishes"}`
      );
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  async function getDesserts() {
    try {
      const res = await networkInstance.get(
        `product/filter/category-name?name=${"Desserts"}`
      );
      setDesserts(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  async function getStarters() {
    try {
      const res = await networkInstance.get(
        `product/filter/category-name?name=${"Starters"}`
      );
      setStarters(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  async function getDrinks() {
    try {
      const res = await networkInstance.get(
        `product/filter/category-name?name=${"Drinks"}`
      );
      setDrinks(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      {loading && <LoadingOverlay />}
      <PageBanner pageTitle={"Starbelly menu."} breadTitle={"Menu"} type={1} />

      {/* menu section 1 */}
      <section className="sb-menu-section sb-p-90-60">
        <div className="sb-bg-1">
          <div></div>
        </div>
        <div className="container">
          <div className="sb-mb-60">
            <h2 className="sb-cate-title sb-mb-15">Starters</h2>
            <p
              className="sb-text"
              dangerouslySetInnerHTML={{
                __html: MenuData.categories[0].description,
              }}
            />
          </div>

          <MenuGrid items={starters} setLoading={setLoading} />
        </div>
      </section>
      {/* menu section 1 end */}

      {/* menu section 2 */}
      <section className="sb-menu-section sb-p-0-60">
        <div className="sb-bg-2">
          <div></div>
        </div>
        <div className="container">
          <div className="sb-mb-60">
            <h2 className="sb-cate-title sb-mb-15">
              {MenuData.categories[1].name}
            </h2>
            <p
              className="sb-text"
              dangerouslySetInnerHTML={{
                __html: MenuData.categories[1].description,
              }}
            />
          </div>

          <MenuGrid items={products} setLoading={setLoading} />
        </div>
      </section>
      {/* menu section 2 end */}

      {/* menu section 3 */}
      <section className="sb-menu-section sb-p-0-60">
        <div className="sb-bg-1">
          <div></div>
        </div>
        <div className="container">
          <div className="sb-mb-60">
            <h2 className="sb-cate-title sb-mb-15">Drinks</h2>
            <p
              className="sb-text"
              dangerouslySetInnerHTML={{
                __html: MenuData.categories[2].description,
              }}
            />
          </div>

          <MenuGrid items={drinks} setLoading={setLoading} />
        </div>
      </section>
      {/* menu section 3 end */}

      {/* menu section 4 */}
      <section className="sb-menu-section sb-p-0-60">
        <div className="container">
          <div className="sb-mb-60">
            <h2 className="sb-cate-title sb-mb-15">Desserts</h2>
            <p
              className="sb-text"
              dangerouslySetInnerHTML={{
                __html: MenuData.categories[3].description,
              }}
            />
          </div>

          <MenuGrid items={desserts} setLoading={setLoading} />
        </div>
      </section>
      {/* menu section 4 end */}

      {/* <PromoSection /> */}
    </>
  );
};
export default Menu1;
