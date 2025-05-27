"use client";
import AdminLayout from "@/src/app/_layouts/admin/AdminLayout";
import NetworkInstance from "@/src/app/api/NetworkInstance";
import { IoTrashBin } from "react-icons/io5";
import { useEffect, useState } from "react";
import Toast from "../../_components/Toast";
export default function AdminContactMessages() {
  const [messages, setMessages] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await NetworkInstance().get("/contact/contact-us");
        setMessages(res.data);
      } catch (error) {
        console.error("Failed to fetch contact messages:", error);
      }
    }

    fetchMessages();
  }, []);

  const deleteContact = async (contactId) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;
    try {
      const token = localStorage.getItem("token");
      await NetworkInstance().delete(`/contact/contact-us/${contactId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setToast({ message: "Contact message deleted!", type: "success" });
    } catch (error) {
      console.error("Failed to delete contact:", error);
      alert("Failed to delete contact!");
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
        <p className="text-[#394849] font-bold ms-5 text-xl">
          Contact Messages
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-y border-[#EFF4FA] mt-4">
            <thead className="bg-[#FAFAFB] text-[#8F9BB3]">
              <tr>
                <th className="font-extralight py-3 px-4 text-center">Name</th>
                <th className="font-extralight py-3 px-4 text-center">Email</th>
                <th className="font-extralight py-3 px-4 text-center">Phone</th>
                <th className="font-extralight py-3 px-4 text-center">
                  Message
                </th>
                <th className="font-extralight py-3 px-4 text-center">Date</th>
                <th className="font-extralight py-3 px-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr
                  key={msg._id}
                  className="border-b border-[#EFF4FA] hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-center text-sm">{msg.name}</td>
                  <td className="py-3 px-4 text-center text-sm">{msg.email}</td>
                  <td className="py-3 px-4 text-center text-sm">{msg.phone}</td>
                  <td className="py-3 px-4 text-center text-sm">
                    {msg.message}
                  </td>
                  <td className="py-3 px-4 text-center text-sm">
                    {new Date(msg.createdAt).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <button
                      onClick={() => deleteContact(msg._id)}
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
      </div>
    </AdminLayout>
  );
}
