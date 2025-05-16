"use client";
import { useState } from "react";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import NetworkInstance from "../../api/NetworkInstance";
import Toast from "../../_components/Toast";
import AdminLayout from "../../_layouts/admin/AdminLayout";
export default function AdminUpload() {
  const [toast, setToast] = useState(null);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const categoryOptions = ["Turkey"];

  const networkInstance = NetworkInstance();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    setPreviews((prevPreviews) => [
      ...prevPreviews,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const addProduct = async () => {
    const formData = new FormData();

    formData.append("name", productName);
    formData.append("price", productPrice);
    formData.append("description", productDescription);

    formData.append("categoryName", selectedCategory);

    selectedFiles.forEach((file, idx) => {
      formData.append(`productImages`, file);
    });

    try {
      const token = localStorage.getItem("token");
      const response = await networkInstance.post(
        `/product/create-product`,
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
          message: "Product Successfully uploaded!",
          type: "success",
        });
      }
    } catch (err) {
      const errorMessage =
        err?.response?.data && err.response.data !== "undefined"
          ? err.response.data
          : "Reduce your image size";

      setToast({
        message: `Not uploaded: ${errorMessage}`,
        type: "error",
      });

      console.log("Product not added:", err);
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
          <h2 className="text-lg font-semibold mb-4">Upload Products</h2>

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
            Product Name
          </label>
          <input
            type="text"
            className="border   border-gray-300 p-2 h-14 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Input Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Product Category
          </label>
          <select
            className="border cursor-pointer  border-gray-300 p-2 h-14 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="" disabled>
              Select Category
            </option>
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-gray-700">Price</label>
          <input
            type="number"
            className="border   border-gray-300 p-2 h-14 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Input Product Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Description
          </label>
          <textarea
            type="text"
            className="border   border-gray-300 p-2 h-14 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </div>

        <button
          onClick={addProduct}
          className={`py-2 w-full mt-5 text-center cursor-pointer text-white px-3 rounded-lg bg-[#f1c126]`}
        >
          Upload
        </button>
      </div>
    </AdminLayout>
  );
}
