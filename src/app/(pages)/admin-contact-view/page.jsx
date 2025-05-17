"use client";
import AdminLayout from "@/src/app/_layouts/admin/AdminLayout";
import NetworkInstance from "@/src/app/api/NetworkInstance";
import { useEffect, useState } from "react";

export default function AdminContactMessages() {
  const [messages, setMessages] = useState([]);

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

  return (
    <AdminLayout>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
