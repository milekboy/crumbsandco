"use client";
import AdminLayout from "@/src/app/_layouts/admin/AdminLayout";
import NetworkInstance from "@/src/app/api/NetworkInstance";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderReview() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const networkInstance = NetworkInstance();

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function fetchOrderDetails() {
      try {
        const res = await networkInstance.get(`/order/view/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrder(res.data);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      }
    }

    if (id) fetchOrderDetails();
  }, [id]);

  if (!order) {
    return (
      <AdminLayout>
        <div className="p-10 text-center">Loading order details...</div>
      </AdminLayout>
    );
  }

  const shipping = order.shippingAddress || {};
  const item = order.items[0] || {};

  return (
    <AdminLayout>
      <div className="flex flex-col items-center mt-10 pb-10">
        <div className="w-[966px] bg-white  rounded-xl  space-y-4">
          <div className="grid grid-cols-3 shadow-lg border p-6 border-gray-200 justify-between gap-y-5 text-sm text-gray-700">
            <div className="space-y-2">
              <p className="font-semibold">Food</p>
              <p>{item.productName}</p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">Quantity</p>
              <p>{item.quantity}</p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">Amount</p>
              <p> ₦{Number(order.totalAmount).toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">Owner</p>
              <p>{shipping.fullName}</p>
            </div>

            <div className="space-y-2">
              <p className="font-semibold">Status</p>
              <p className=" ">{order.status}</p>
            </div>
          </div>

          <div className="bg-white border-gray-200 border rounded-lg p-4 mt-6">
            <p className="font-semibold">Address</p>
            <p className="text-sm text-gray-600">
              {/* {shipping.houseNumber}, {shipping.street}, {shipping.city},{" "}
              {shipping.state}, {shipping.country} */}
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
