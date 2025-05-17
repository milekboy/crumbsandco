"use client";
import AdminLayout from "../../_layouts/admin/AdminLayout";
import NetworkInstance from "../../api/NetworkInstance";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function AdminReservations() {
  const networkInstance = NetworkInstance();
  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    getOrders();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getOrders = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await networkInstance.get("reserve/reservation", {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });
      setReservations(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <AdminLayout>
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
                </tr>
              </thead>
              <tbody>
                {reservations.map((r) => (
                  <tr
                    key={r._id}
                    className="border-b border-[#EFF4FA] hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-center text-sm">{r.name}</td>
                    <td className="py-3 px-4 text-center text-sm">{r.email}</td>
                    <td className="py-3 px-4 text-center text-sm">{r.phone}</td>
                    <td className="py-3 px-4 text-center text-sm">
                      {r.period}
                    </td>
                    <td className="py-3 px-4 text-center text-sm">
                      {r.person}
                    </td>
                    <td className="py-3 px-4 text-center text-sm">
                      {new Date(r.createdAt).toLocaleString()}
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
