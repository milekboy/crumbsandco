"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import LoadingOverlay from "@/src/app/_components/LoadingOverlay";
import NetworkInstance from "@/src/app/api/NetworkInstance";
import Toast from "@/src/app/_components/Toast";
import AdminLayout from "@/src/app/_layouts/admin/AdminLayout";

export default function EditProductPage() {
  const { id } = useParams();
  const [toast, setToast] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [color, setColor] = useState("");

  const networkInstance = NetworkInstance();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await networkInstance.get(`/category/get-category/${id}`);
        const data = res.data;
        setProduct(data);

        setProductName(data.name);

        if (data.productImages && data.productImages.length > 0) {
          // convert string array to object array
          const formattedPreviews = data.productImages.map((url) => ({ url }));
          setPreviews(formattedPreviews);
        }
      } catch (err) {
        console.log("Failed to fetch product:", err);
      }
    }

    fetchProduct();
  }, [id]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    setPreviews((prevPreviews) => [
      ...prevPreviews,
      ...files.map((file) => ({ url: URL.createObjectURL(file), file })),
    ]);
  };

  const updateProduct = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("name", productName || product?.name);

      if (selectedFiles.length > 0) {
        selectedFiles.forEach((file) => {
          formData.append("image", file);
        });
      }

      const res = await networkInstance.put(
        `/category/update-category/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        setLoading(false);
        setToast({
          message: "Category updated successfully!",
          type: "success",
        });
      }
    } catch (err) {
      setLoading(false);
      console.log("Update error:", err?.response?.data || err);

      const errorMessage =
        err?.response?.data && err.response.data !== "undefined"
          ? err.response.data
          : "Reduce your image size";

      setToast({
        message: `Update Failed!: ${errorMessage}`,
        type: "error",
      });
    }
  };
  const handleRemovePreview = (indexToRemove) => {
    setPreviews((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setSelectedFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <AdminLayout>
      <div className="p-6 w-[500px] space-y-4">
        {loading && <LoadingOverlay />}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
        <h2 className="text-2xl font-bold">Edit Category</h2>

        <div>
          <div className="flex items-center gap-6">
            {previews.map((srcObj, idx) => (
              <div key={idx} className="relative w-24 h-24">
                <Image
                  width={500}
                  height={500}
                  src={srcObj.url}
                  alt={`Preview ${idx + 1}`}
                  className="w-full h-full object-cover rounded-md bg-gray-100"
                />
                <button
                  type="button"
                  onClick={() => handleRemovePreview(idx)}
                  className="absolute cursor-pointer -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}

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
      <div className="w-[500px]">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Category Name
          </label>
          <input
            type="text"
            className="border   border-gray-300 p-2 h-14 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Input Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <button
          onClick={updateProduct}
          className="py-2 w-full mt-5 text-center cursor-pointer text-white px-3 rounded-lg bg-[#f1c126]"
        >
          Update Category
        </button>
      </div>
    </AdminLayout>
  );
}
