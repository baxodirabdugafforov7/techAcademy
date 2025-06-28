import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopBar from "@/components/employees/TopBar";

const paymentMethods = ["Visa", "MasterCard", "PayPal", "Cash", "Bank Transfer"];
const statuses = ["Paid", "Pending", "Failed"];

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [payment, setPayment] = useState({
    method: "",
    amount: "",
    date: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const target = students.find((s) => s.id === id);
    if (target) {
      setStudent(target);
      setImagePreview(target.img || null);
      setTransactionId(generateTransactionId());
    } else {
      navigate("/students");
    }
  }, [id]);

  const generateTransactionId = () => {
    return "TX" + Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPayment({ ...payment, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setStudent({ ...student, img: imageUrl });
    }
  };

  const handleDeleteImage = () => {
    setImagePreview(null);
    setStudent({ ...student, img: "" });
  };

  const handleUpdate = () => {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const updated = students.map((s) => (s.id === student.id ? student : s));
    localStorage.setItem("students", JSON.stringify(updated));
    setShowModal(true);
  };

  if (!student) return null;
  const handleDelete = () => {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const updated = students.filter((s) => s.id !== student.id);
    localStorage.setItem("students", JSON.stringify(updated));
    navigate("/students");
  };



  return (
    <div className="p-6 space-y-6">
      <TopBar />

      <h2 className="text-2xl font-bold">{student.fullName}</h2>

      <div className="bg-gray p-6 rounded shadow space-y-6">
        <h3 className="text-lg font-semibold mb-2">General Information</h3>

        <div className="flex items-center gap-4">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-full ring-2 ring-red-500"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          <div className="space-y-1">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && (
              <button className="text-xs text-red-500 hover:underline" onClick={handleDeleteImage}>
                Delete Image
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={student.fullName}
              onChange={handleInputChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Course</label>
            <input
              type="text"
              name="course"
              value={student.course}
              onChange={handleInputChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Telephone</label>
            <input
              type="text"
              name="phone"
              value={student.phone}
              onChange={handleInputChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={student.email}
              onChange={handleInputChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Address Text</label>
          <textarea
            name="addressText"
            value={student.addressText}
            onChange={handleInputChange}
            rows={3}
            className="w-full mt-1 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="country"
            value={student.country}
            onChange={handleInputChange}
            placeholder="Country"
            className="w-full mt-1 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
          />
          <input
            type="text"
            name="city"
            value={student.city}
            onChange={handleInputChange}
            placeholder="City"
            className="w-full mt-1 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
          />
          <input
            type="text"
            name="address"
            value={student.address}
            onChange={handleInputChange}
            placeholder="Street Address"
            className="w-full mt-1 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
          />
          <input
            type="text"
            name="postalCode"
            value={student.postalCode}
            onChange={handleInputChange}
            placeholder="Postal Code"
            className="w-full mt-1 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
          />
          <select
            name="status"
            value={student.status || ""}
            onChange={handleInputChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 text-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>

          <input
            type="text"
            value={student.id}
            disabled
            className="w-full mt-1 px-4 py-2 border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
          />
        </div>
      </div>

      <div className="bg-gray p-6 rounded shadow space-y-6">
        <h3 className="text-lg font-semibold mb-2">Payment Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={transactionId}
            disabled
            className="w-full mt-1 px-4 py-2 border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
            placeholder="Transaction ID"
          />
          <select
            name="method"
            value={payment.method}
            onChange={handlePaymentChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
          >
            <option value="">Select Payment Method</option>
            {paymentMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="amount"
            value={payment.amount}
            onChange={handlePaymentChange}
            placeholder="Amount"
            className="w-full mt-1 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
          />
          <input
            type="date"
            name="date"
            value={payment.date}
            onChange={handlePaymentChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
          />
          <input
            type="text"
            name="description"
            value={payment.description}
            onChange={handlePaymentChange}
            placeholder="Description"
            className="w-full mt-1 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
          />
          <select
            name="status"
            value={payment.status}
            onChange={handlePaymentChange}
            className="w-full mt-1 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
          >
            <option value="">Select Status</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-end mt-4 flex-wrap gap-4">
        <div className="flex gap-3 justify-end">
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-white hover:bg-red-600 border border-red-500 px-4 py-2 rounded-xl transition"
          >
            Delete Student
          </button>
          <button
            onClick={() => navigate("/students")}
            className="px-4 py-2 border border-gray-400 text-gray-700 rounded-xl hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-500"
          >
            Update
          </button>
        </div>
      </div>


      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl space-y-4 w-full max-w-md text-center">
            <h2 className="text-xl font-bold text-green-600">Student Updated Successfully</h2>
            <p className="text-gray-600">What would you like to do next?</p>
            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={() => navigate("/students")}
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl"
              >
                Go to Students
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-xl"
              >
                Continue Editing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditStudent;
