import React, { useState, useEffect } from "react";
import TopBar from "@/components/employees/TopBar";
import { useNavigate } from "react-router-dom";

const generateStudentId = () => Math.floor(10000000 + Math.random() * 90000000).toString();

const AddStudent = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [savedStudentId, setSavedStudentId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [courses, setCourses] = useState([]);

  const [student, setStudent] = useState({
    id: generateStudentId(),
    fullName: "",
    course: "",
    phone: "",
    email: "",
    addressText: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
    img: "",
    status: "active",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSave = () => {
    const newErrors = {};
    if (!student.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!student.course) newErrors.course = "Course is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setFormError("Please fill in all required fields.");
      return;
    }

    setFormError("");
    const existing = JSON.parse(localStorage.getItem("students")) || [];
    const updated = [student, ...existing];
    localStorage.setItem("students", JSON.stringify(updated));

    setSavedStudentId(student.id);
    setShowSuccessModal(true);
  };

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("courses"));
    if (!storedCourses || storedCourses.length === 0) {
      const defaultCourses = [
        { name: "Frontend Development" },
        { name: "Backend Development" },
        { name: "UI/UX Design" },
        { name: "Data Science" },
      ];
      localStorage.setItem("courses", JSON.stringify(defaultCourses));
      setCourses(defaultCourses);
    } else {
      setCourses(storedCourses);
    }
  }, []);

  return (
    <div className="p-6 space-y-6">
      <TopBar />

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Add Student</h2>
        <div className="space-x-2">
          <button className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100">
            Export
          </button>
          <button
            onClick={handleSave}
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
          >
            Save
          </button>
        </div>
      </div>

      {formError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {formError}
        </div>
      )}

      <div className="bg-gray p-6 rounded shadow space-y-6">
        <h3 className="text-lg font-semibold mb-2">General Information</h3>


        <div className="flex items-center gap-6">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-full ring-2 ring-green-400"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
              No Image
            </div>
          )}
          <div className="space-y-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block text-sm text-gray-600"
            />
            {imagePreview && (
              <button
                onClick={handleDeleteImage}
                className="text-xs text-red-500 hover:underline"
              >
                Remove Image
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={student.fullName}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
            />
            {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Course</label>
            <select
              name="course"
              value={student.course}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
            >
              <option value="">Select a course</option>
              {courses.map((course, idx) => (
                <option key={idx} value={course.name}>
                  {course.name}
                </option>
              ))}
            </select>
            {errors.course && <p className="text-red-500 text-xs">{errors.course}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Telephone</label>
            <input
              type="text"
              name="phone"
              value={student.phone}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={student.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Address Text</label>
          <textarea
            name="addressText"
            value={student.addressText}
            onChange={handleChange}
            rows={3}
            className="w-full mt-1 px-4 py-2 border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              name="country"
              value={student.country}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={student.city}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Street Address</label>
            <input
              type="text"
              name="address"
              value={student.address}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={student.postalCode}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">User Status</label>
            <select
              name="status"
              value={student.status}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <span className="text-sm text-gray-500">Student ID: #{student.id}</span>
          <div className="space-x-2">
            <button
              onClick={() => navigate("/students")}
              className="px-4 py-2 border border-gray-400 text-gray-600 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
            >
              Save & Continue
            </button>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md text-center space-y-4">
            <h2 className="text-2xl font-semibold text-green-600">Student Added Successfully!</h2>
            <p className="text-gray-600">Student ID: #{savedStudentId}</p>
            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={() => navigate(`/students/${savedStudentId}/edit`)}
                className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
              >
                View Profile
              </button>
              <button
                onClick={() => {
                  setStudent({
                    id: generateStudentId(),
                    fullName: "",
                    course: "",
                    phone: "",
                    email: "",
                    addressText: "",
                    country: "",
                    city: "",
                    address: "",
                    postalCode: "",
                    img: "",
                    status: "active",
                  });
                  setImagePreview(null);
                  setShowSuccessModal(false);
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
              >
                Add Another Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddStudent;
