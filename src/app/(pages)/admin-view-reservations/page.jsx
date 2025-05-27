"use client";
import AdminLayout from "../../_layouts/admin/AdminLayout";
import { IoTrashBin } from "react-icons/io5";
import NetworkInstance from "../../api/NetworkInstance";
import Toast from "../../_components/Toast";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function AdminReservations() {
  const networkInstance = NetworkInstance();
  const [toast, setToast] = useState(null);

  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    getOrders();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getOrders = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await networkInstance.get("reserve/reservation", {});
      setReservations(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  const deleteReservation = async (reservationId) => {
    if (!confirm("Are you sure you want to delete this reservation?")) return;
    try {
      const token = localStorage.getItem("token");
      await NetworkInstance().delete(`/reserve/reservation/${reservationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setToast({ message: "Reservation deleted!", type: "success" });
    } catch (error) {
      console.error("Failed to delete reservation:", error);
      alert("Failed to delete reservation!");
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
      <div className="p-8">
        <p className="text-[#394849] font-bold ms-5 text-xl">Reservations</p>

        {reservations.length === 0 ? (
          <p>No reservations found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-y border-[#EFF4FA] mt-4">
              <thead className="bg-[#FAFAFB] text-[#8F9BB3]">
                <tr>
                  <th className="font-extralight py-3 px-4 text-center">
                    Name
                  </th>
                  <th className="font-extralight py-3 px-4 text-center">
                    Email
                  </th>
                  <th className="font-extralight py-3 px-4 text-center">
                    Phone
                  </th>
                  <th className="font-extralight py-3 px-4 text-center">
                    Date/Time
                  </th>
                  <th className="font-extralight py-3 px-4 text-center">
                    Persons
                  </th>
                  <th className="font-extralight py-3 px-4 text-center">
                    Created At
                  </th>
                  <th className="font-extralight py-3 px-4 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((r) => (
                  <tr
                    key={r._id}
                    className="border-b border-[#EFF4FA] hover:bg-gray-50 text-center"
                  >
                    <td className="py-3 px-4 text-sm">{r.name}</td>
                    <td className="py-3 px-4 text-sm">{r.email}</td>
                    <td className="py-3 px-4 text-sm">{r.phone}</td>
                    <td className="py-3 px-4 text-sm">{r.period}</td>
                    <td className="py-3 px-4 text-sm">{r.person}</td>
                    <td className="py-3 px-4 text-sm">
                      {new Date(r.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <button
                        onClick={() => deleteReservation(r._id)}
                        className="text-[#C5CEE0] hover:text-red-500 transition-colors"
                      >
                        <IoTrashBin size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
