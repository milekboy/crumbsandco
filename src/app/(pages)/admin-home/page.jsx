"use client";
import AdminLayout from "../../_layouts/admin/AdminLayout";
import LoadingOverlay from "../../_components/LoadingOverlay";
import { useState, useEffect } from "react";
import ProductTable from "../../_components/ProductTable";
import NetworkInstance from "../../api/NetworkInstance";
export default function AdminHome() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const networkInstance = NetworkInstance();

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  async function getProducts() {
    await networkInstance
      .get(`product/get-all-products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <AdminLayout>
      {loading && <LoadingOverlay />}
      <ProductTable products={products} setLoading={setLoading} />
    </AdminLayout>
  );
}
