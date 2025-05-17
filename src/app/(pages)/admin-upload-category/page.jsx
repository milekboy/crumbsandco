"use client";
import { useState } from "react";
import Image from "next/image";
import NetworkInstance from "../../api/NetworkInstance";
import Toast from "../../_components/Toast";
import AdminLayout from "../../_layouts/admin/AdminLayout";
export default function AdminUploadCategory() {
  const [toast, setToast] = useState(null);

  const [productName, setProductName] = useState("");

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const networkInstance = NetworkInstance();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    setPreviews((prevPreviews) => [
      ...prevPreviews,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const addCategory = async () => {
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("image", selectedFiles[0]);

    try {
      const token = localStorage.getItem("token");
      const response = await networkInstance.post(
        `/category/create-category`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.status === 200 || response?.status === 201) {
        setToast({
          message: "Category Successfully uploaded!",
          type: "success",
        });
        console.log(response);
      }
    } catch (err) {
      console.log("Product not added:", err?.response?.data || err);
    }
  };
  return (
    <AdminLayout>
      <div className="space-y-4 w-[500px] ps-8 mt-5 pb-8">
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
        <div className="">
          <h2 className="text-lg font-semibold mb-4">Upload Category</h2>

          <div>
            <div className="flex items-center gap-6">
              <div className="flex gap-3 flex-wrap">
                {previews.map((src, idx) => (
                  <Image
                    width={500}
                    height={500}
                    key={idx}
                    src={src}
                    alt={`Preview ${idx + 1}`}
                    className="w-24 h-24 object-cover rounded-md bg-gray-100"
                  />
                ))}
              </div>

              <div>
                <p className="text-sm text-gray-600">
                  Please upload square image
                </p>
                <label className="mt-3 inline-block cursor-pointer">
                  <input
                    multiple
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <span className="px-4 py-2 border rounded-md bg-gray-50 text-gray-700 hover:bg-gray-100">
                    Choose Files
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Caregory Name
          </label>
          <input
            type="text"
            className="border   border-gray-300 p-2 h-14 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Input Category Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <button
          onClick={addCategory}
          className={`py-2 w-full mt-5 text-center cursor-pointer text-white px-3 rounded-lg bg-[#f1c126]`}
        >
          Upload
        </button>
      </div>
    </AdminLayout>
  );
}
