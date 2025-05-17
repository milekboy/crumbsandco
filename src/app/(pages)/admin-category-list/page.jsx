"use client";
import AdminLayout from "../../_layouts/admin/AdminLayout";
import LoadingOverlay from "../../_components/LoadingOverlay";
import { useState, useEffect } from "react";
import CategoryTable from "../../_components/CategoryTable";

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
      .get(`category/get-all-categories`)
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
      <CategoryTable products={products} setLoading={setLoading} />
    </AdminLayout>
  );
}
