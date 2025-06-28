import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "@/components/employees/TopBar";
import MentorForm from "@/components/employees/MentorForm";

const generateId = () => `${Math.floor(10000000 + Math.random() * 90000000)}`;

const AddMentor = () => {
  const navigate = useNavigate();

  const [mentor, setMentor] = useState({
    id: generateId(),
    fullName: "",
    telephone: "",
    dateJoined: "",
    email: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
    userId: "",
    userStatus: "Active",
    image: null,
  });

  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const resetForm = () => {
    setMentor({
      id: generateId(),
      fullName: "",
      telephone: "",
      dateJoined: "",
      email: "",
      country: "",
      city: "",
      address: "",
      postalCode: "",
      userId: "",
      userStatus: "Active",
      image: null,
    });
    setError("");
  };

  const handleSave = () => {
    if (!mentor.fullName || !mentor.email || !mentor.dateJoined || !mentor.telephone) {
      setError("Please fill all required fields.");
      return;
    }

    const existing = JSON.parse(localStorage.getItem("mentors")) || [];
    localStorage.setItem("mentors", JSON.stringify([mentor, ...existing]));

    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/employees");
  };

  const handleAddAnother = () => {
    resetForm();
    setShowModal(false);
  };

  return (
    <div className="p-6 space-y-6">
      <TopBar lang="English" setLang={() => {}} />

      {/* Header Section */}
      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md">
        <div>
          <h2 className="text-xl font-semibold">Add Mentor</h2>
          <p className="text-sm text-gray-600">Add mentor and get started</p>
        </div>
        <div className="space-x-3">
          <button className="border px-4 py-2 rounded-md text-sm">Export</button>
          <button
            onClick={handleSave}
            className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 text-sm"
          >
            Save
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="text-red-600 bg-red-100 border border-red-400 px-4 py-2 rounded">
          {error}
        </div>
      )}

      {/* Form Section */}
      <MentorForm mentor={mentor} setMentor={setMentor} />

      {/* Bottom Buttons */}
      <div className="flex justify-end gap-4 mt-10">
        <button
          onClick={() => navigate("/employees")}
          className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800"
        >
          Save Mentor
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center space-y-4">
            <h3 className="text-lg font-semibold text-green-700">Mentor added successfully!</h3>
            <p className="text-sm text-gray-600">Your new mentor has been saved.</p>
            <div className="flex justify-center gap-4 pt-2">
              <button
                onClick={handleAddAnother}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Add Another
              </button>
              <button
                onClick={handleModalClose}
                className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMentor;
