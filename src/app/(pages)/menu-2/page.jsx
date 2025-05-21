"use client";
import { useState, useEffect } from "react";
import MenuData from "@data/menu.json";
import LoadingOverlay from "../../_components/LoadingOverlay";
import PageBanner from "@components/PageBanner";
import MenuGrid from "@components/menu/MenuGrid";
import CallToActionTwoSection from "@components/sections/CallToActionTwo";
import CallToActionThreeSection from "@components/sections/CallToActionThree";
import NetworkInstance from "../../api/NetworkInstance";
const Menu2 = () => {
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
      <PageBanner
        pageTitle={
          "Only <span>appetite</span><br/>can be lacking in <span>cooking</span>"
        }
        description={
          "We bring you a delicious selection crafted with passion and precision. Explore our menu and treat yourself."
        }
        breadTitle={"Menu"}
        type={2}
      />

      {/* menu section 1 */}
      <section className="sb-menu-section sb-p-90-60">
        <div className="sb-bg-1">
          <div></div>
        </div>
        <div className="container">
          <div className="text-center sb-mb-60">
            <h2 className="sb-mb-30">{MenuData.categories[0].name}</h2>
            <p
              className="sb-text"
              dangerouslySetInnerHTML={{
                __html: MenuData.categories[0].description,
              }}
            />
          </div>

          <MenuGrid items={starters} setLoading={setLoading} columns={3} />
        </div>
      </section>
      {/* menu section 1 end */}

      {/* menu section 2 */}
      <section className="sb-menu-section sb-p-0-60">
        <div className="sb-bg-2">
          <div></div>
        </div>
        <div className="container">
          <div className="text-center sb-mb-60">
            <h2 className="sb-mb-30">{MenuData.categories[1].name}</h2>
            <p
              className="sb-text"
              dangerouslySetInnerHTML={{
                __html: MenuData.categories[1].description,
              }}
            />
          </div>

          <MenuGrid items={products} setLoading={setLoading} columns={3} />
        </div>
      </section>
      {/* menu section 2 end */}

      {/* <CallToActionThreeSection /> */}

      {/* menu section 3 */}
      <section className="sb-menu-section sb-p-90   ">
        <div className="sb-bg-1">
          <div></div>
        </div>
        <div className="container">
          <div className="text-center sb-mb-60">
            <h2 className="sb-mb-30">{MenuData.categories[2].name}</h2>
            <p
              className="sb-text"
              dangerouslySetInnerHTML={{
                __html: MenuData.categories[2].description,
              }}
            />
          </div>

          <MenuGrid items={drinks} setLoading={setLoading} columns={3} />
        </div>
      </section>
      {/* menu section 3 end */}

      {/* menu section 4 */}
      <section className="sb-menu-section sb-p-0-60">
        <div className="container">
          <div className="text-center sb-mb-60">
            <h2 className="sb-mb-30">{MenuData.categories[3].name}</h2>
            <p
              className="sb-text"
              dangerouslySetInnerHTML={{
                __html: MenuData.categories[3].description,
              }}
            />
          </div>

          <MenuGrid items={desserts} setLoading={setLoading} columns={3} />
        </div>
      </section>
      {/* menu section 4 end */}

      {/* <CallToActionTwoSection /> */}
    </>
  );
};
export default Menu2;
