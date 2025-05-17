import { CiEdit } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoTrashBin } from "react-icons/io5";
import Toast from "./Toast";
import NetworkInstance from "../api/NetworkInstance";

export default function CategoryTable({ products, setLoading }) {
  const router = useRouter();
  const [toast, setToast] = useState(null);

  const deleteProduct = async (productId) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      const token = localStorage.getItem("token");
      await NetworkInstance().delete(`/category/delete-category/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setToast({ message: "Category deleted!", type: "success" });
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product!");
    }
  };

  const handleNavigate = (product) => {
    setLoading(true);
    router.push(`/admin-edit-category/${product._id}`);
  };

  return (
    <div className="px-8 mt-2 py-4 overflow-x-auto ">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <p className="text-[#394849] font-bold ms-5 text-xl">
        List of Categories
      </p>
      <table className="min-w-full bg-white border-y border-[#EFF4FA] mt-4">
        <thead className="bg-[#FAFAFB] text-[#8F9BB3]">
          <tr>
            <th className="font-extralight py-3 px-4 text-center">
              Category Name
            </th>

            <th className="font-extralight py-3 px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product._id}
              className="border-b border-[#EFF4FA] hover:bg-gray-50"
            >
              <td className="py-3 px-4 text-center text-sm">{product.name}</td>

              <td className="py-3 px-4 text-center">
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleNavigate(product)}
                    className="text-[#C5CEE0]"
                  >
                    <CiEdit />
                  </button>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="text-[#C5CEE0]"
                  >
                    <IoTrashBin />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
