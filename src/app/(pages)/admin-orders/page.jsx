"use client";
import AdminLayout from "../../_layouts/admin/AdminLayout";
import NetworkInstance from "../../api/NetworkInstance";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function AdminOrders() {
  const networkInstance = NetworkInstance();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getOrders();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getOrders = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await networkInstance.get("order/view-all-order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);

    const time = date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const formattedDate = date.toLocaleDateString("en-GB").replace(/\//g, "."); // DD.MM.YYYY

    return `${time}       ${formattedDate}`;
  };

  return (
    <AdminLayout>
      <div className="px-8 mt-5 py-4 overflow-x-auto ">
        <p className="text-[#394849] font-bold ms-5">View Orders</p>
        <table className="min-w-full bg-white border-y border-[#EFF4FA] mt-4">
          <thead className="border-b border-[#EFF4FA] bg-[#FAFAFB] text-[#8F9BB3]">
            <tr>
              <th className="font-extralight py-3 text-sm text-center">
                Product Name
              </th>
              <th className="font-extralight py-3 text-sm text-center">
                Quantity
              </th>
              <th className="font-extralight py-3 text-sm text-center">
                Location
              </th>
              <th className="font-extralight py-3 text-sm text-center">
                Price
              </th>
              <th className="font-extralight py-3 text-sm text-center">
                Time of Order
              </th>
              <th className="font-extralight py-3 text-sm text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((product) => (
              <tr
                key={product._id}
                className="border-b border-[#EFF4FA] hover:bg-gray-50 text-center"
              >
                <td className="py-3 text-sm">{product.items[0].productName}</td>
                <td className="py-3 text-sm">{product.items[0].quantity}</td>
                <td className="py-3 text-sm">
                  {product.shippingAddress?.city || "N/A"}
                </td>
                <td className="py-3 text-sm">
                  ₦{Number(product.totalAmount).toLocaleString()}
                </td>
                <td className="py-3 text-sm">
                  {formatDateTime(product.createdAt)}
                </td>
                <td className="py-3 text-sm">
                  <Link href={`/admin-order-details/${product._id}`}>
                    <button className="border px-3 py-2 rounded-lg hover:text-white hover:bg-[#f1c126] ">
                      View Order
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
