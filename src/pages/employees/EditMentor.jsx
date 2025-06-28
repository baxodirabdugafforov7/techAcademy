// src/pages/EditMentor.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopBar from "@/components/employees/TopBar";
import MentorForm from "@/components/employees/MentorForm";

const EditMentor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mentor, setMentor] = useState(null);
  const [groups, setGroups] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const mentors = JSON.parse(localStorage.getItem("mentors")) || [];
    const foundMentor = mentors.find((m) => m.id === id);
    if (!foundMentor) return navigate("/employees");
    setMentor(foundMentor);

    const loadedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    const loadedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    const loadedStudents = JSON.parse(localStorage.getItem("students")) || [];

    setGroups(loadedGroups);
    setCourses(loadedCourses);
    setStudents(loadedStudents);
  }, [id, navigate]);

  const handleDelete = () => {
    const confirmed = window.confirm("Are you sure you want to delete this mentor?");
    if (confirmed) {
      const mentors = JSON.parse(localStorage.getItem("mentors")) || [];
      const updated = mentors.filter((m) => m.id !== id);
      localStorage.setItem("mentors", JSON.stringify(updated));
      navigate("/employees");
    }
  };

  const handleSave = () => {
    const mentors = JSON.parse(localStorage.getItem("mentors")) || [];
    const updatedMentors = mentors.map((m) => (m.id === id ? mentor : m));
    localStorage.setItem("mentors", JSON.stringify(updatedMentors));
    localStorage.setItem("groups", JSON.stringify(groups));
    navigate("/employees");
  };

  const handleModalSave = () => {
    const updated = groups.map((g) => (g.id === selectedGroup.id ? selectedGroup : g));
    setGroups(updated);
    closeModal();
  };

  const closeModal = () => {
    setSelectedGroup(null);
    setShowModal(false);
  };

  const assignedGroups = groups.filter((g) => g.mentorId === mentor?.id);

  if (!mentor) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <TopBar lang="English" setLang={() => { }} />

      {/* Header */}
      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md">
        <div>
          <h2 className="text-xl font-semibold">Edit Mentor</h2>
          <p className="text-sm text-gray-600">Update mentor details</p>
        </div>
        <div className="space-x-3">
          <button className="border px-4 py-2 rounded-md text-sm">Export</button>
          <button
            onClick={handleSave}
            className="bg-green-700 text-white px-4 py-2 rounded-md text-sm hover:bg-green-800"
          >
            Save
          </button>
        </div>
      </div>

      {/* Mentor Form */}
      <MentorForm
        mentor={mentor}
        setMentor={setMentor}
        assignedGroups={assignedGroups}
        setShowModal={setShowModal}
        setSelectedGroup={setSelectedGroup}
        isEditMode={true}

      />

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
          Save Changes
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
        >
          Delete Account
        </button>
      </div>

      {/* Group Edit Modal */}
      {showModal && selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg space-y-4">
            <h3 className="text-lg font-semibold">Edit Group Details</h3>

            <div className="space-y-3">
              {/* Group Name */}
              <div>
                <label className="text-sm font-medium">Group Name</label>
                <input
                  type="text"
                  value={selectedGroup.name}
                  onChange={(e) =>
                    setSelectedGroup({ ...selectedGroup, name: e.target.value })
                  }
                  className="w-full mt-1 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
                />
              </div>

              {/* Course Selector */}
              <div>
                <label className="text-sm font-medium">Course</label>
                <select
                  value={selectedGroup.courseId}
                  onChange={(e) =>
                    setSelectedGroup({ ...selectedGroup, courseId: e.target.value })
                  }
                  className="w-full mt-1 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
                >
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time & Duration */}
              <div>
                <label className="text-sm font-medium">Time</label>
                <input
                  type="text"
                  value={selectedGroup.time}
                  onChange={(e) =>
                    setSelectedGroup({ ...selectedGroup, time: e.target.value })
                  }
                  className="w-full mt-1 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Duration</label>
                <input
                  type="text"
                  readOnly
                  value={
                    courses.find((c) => c.id === selectedGroup.courseId)?.duration || ""
                  }
                  className="w-full mt-1 px-4 py-2 border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
                />
              </div>

              {/* Lesson Days */}
              <div>
                <label className="text-sm font-medium">Lesson Days</label>
                <input
                  type="text"
                  readOnly
                  value={
                    courses.find((c) => c.id === selectedGroup.courseId)?.lessonDays?.join(", ") || ""
                  }
                  className="w-full mt-1 px-4 py-2 border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
                />
              </div>

              {/* Student List */}
              <div>
                <label className="text-sm font-medium">Students</label>
                <div className="bg-gray-100 border rounded-md p-2 mt-1 max-h-32 overflow-y-auto">
                  <ul className="list-disc pl-5 text-sm">
                    {selectedGroup.studentIds.map((sid) => {
                      const student = students.find((s) => s.id === sid);
                      return <li key={sid}>{student?.name || "Unknown Student"}</li>;
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-between pt-4">
              <button
                onClick={closeModal}
                className="text-sm text-gray-600 hover:text-black underline"
              >
                Close
              </button>
              <button
                onClick={handleModalSave}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default EditMentor;
