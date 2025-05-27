"use client";
import AdminLayout from "../../_layouts/admin/AdminLayout";
import { IoTrashBin } from "react-icons/io5";
import Toast from "../../_components/Toast";
import NetworkInstance from "../../api/NetworkInstance";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function AdminOrders() {
  const networkInstance = NetworkInstance();
  const [orders, setOrders] = useState([]);
  const [toast, setToast] = useState(null);
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
  const deleteOrder = async (orderId) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      const token = localStorage.getItem("token");
      await NetworkInstance().delete(`/order/delete/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setToast({ message: "Order deleted!", type: "success" });
    } catch (error) {
      console.error("Failed to delete order:", error);
      alert("Failed to delete order!");
    }
  };
  return (
    <AdminLayout>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="px-8 mt-5 py-4 overflow-x-auto ">
        <p className="text-[#394849] font-bold ms-5 text-xl">View Orders</p>
        <table className="min-w-full bg-white border-y border-[#EFF4FA] mt-4">
          <thead className="border-b border-[#EFF4FA] bg-[#FAFAFB] text-[#8F9BB3]">
            <tr>
              <th className="font-extralight py-3 px-4 text-sm text-center">
                Product Name
              </th>
              <th className="font-extralight py-3 px-4 text-sm text-center">
                Quantity
              </th>
              <th className="font-extralight py-3 px-4 text-sm text-center">
                Location
              </th>
              <th className="font-extralight py-3 px-4 text-sm text-center">
                Price
              </th>
              <th className="font-extralight py-3 px-4 text-sm text-center">
                Time of Order
              </th>
              <th className="font-extralight py-3 px-4 text-sm text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((product) => (
              <tr
                key={product._id}
                className="border-b border-[#EFF4FA] hover:bg-gray-50"
              >
                <td className="py-3 px-4 text-sm text-center">
                  {product.items[0].productName}
                </td>
                <td className="py-3 px-4 text-sm text-center">
                  {product.items[0].quantity}
                </td>
                <td className="py-3 px-4 text-sm text-center">
                  {product.shippingAddress?.city || "N/A"}
                </td>
                <td className="py-3 px-4 text-sm text-center">
                  ₦{Number(product.totalAmount).toLocaleString()}
                </td>
                <td className="py-3 px-4 text-sm text-center">
                  {formatDateTime(product.createdAt)}
                </td>
                <td className="py-3 px-4 text-sm text-center">
                  <div className="flex justify-center gap-2">
                    <Link href={`/admin-order-details/${product._id}`}>
                      <button className="border px-3 py-2 rounded-lg hover:text-white hover:bg-[#f1c126]">
                        View Order
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteOrder(product._id)}
                      className="text-[#C5CEE0] hover:text-red-500 transition-colors"
                    >
                      <IoTrashBin size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
