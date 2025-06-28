import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopBar from "@/components/employees/TopBar";
import GroupInfoForm from "@/components/groups/GroupInfoForm";
import MoreGroupInfo from "@/components/groups/MoreGroupInfo";
import AssignedStudentList from "@/components/groups/AssignedStudentList";
import AttendanceList from "@/components/groups/AttendanceList";
import AttendanceManager from "@/components/groups/AttendanceManager";
import StudentAssignModal from "@/components/groups/StudentAssignModal";

const EditGroup = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [group, setGroup] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    const foundGroup = storedGroups.find((g) => g.id === groupId);
    if (foundGroup) {
      setGroup(foundGroup);
      setAttendanceRecords(foundGroup.attendance || []);
    }
  }, [groupId]);

  const handleSave = () => {
    const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    const updatedGroups = storedGroups.map((g) =>
      g.id === group.id ? { ...group, attendance: attendanceRecords } : g
    );
    localStorage.setItem("groups", JSON.stringify(updatedGroups));
    setShowSuccess(true);
  };

  const confirmDelete = () => {
    const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    const filteredGroups = storedGroups.filter((g) => g.id !== group.id);
    localStorage.setItem("groups", JSON.stringify(filteredGroups));
    navigate("/groups");
  };

  const handleAssignStudents = (updatedList) => {
    setGroup((prev) => ({
      ...prev,
      students: [...updatedList],
    }));
    setShowAssignModal(false);
  };

  if (!group) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <TopBar />

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Edit Group</h1>
        <div className="space-x-3">
          <button className="px-4 py-2 bg-gray-200 rounded">Export</button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-700 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">
            Group Information
          </h3>

          {!showMore ? (
            <>
              <GroupInfoForm group={group} setGroup={setGroup} />

              <div className="flex justify-between items-center mt-8">
                <h3 className="text-lg font-semibold">Assigned Students</h3>
                <button
                  onClick={() => setShowAssignModal(true)}
                  className="px-3 py-2 bg-blue-600 text-white rounded text-sm"
                >
                   Edit Students
                </button>
              </div>
              <AssignedStudentList assignedStudents={group.students || []} />


              <div className="flex justify-end mt-8 gap-4">
                <button
                  onClick={() => navigate("/groups")}
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 border border-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowConfirmDelete(true)}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded border border-red-300 hover:bg-red-200"
                >
                  Delete Group
                </button>
                <button
                  onClick={() => setShowMore(true)}
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded border hover:bg-gray-200"
                >
                  Show More
                </button>
              </div>
            </>
          ) : (
            <>
              <MoreGroupInfo group={group} setGroup={setGroup} />

              <div className="flex justify-between items-center mt-8">
                <h3 className="text-lg font-semibold">Assigned Students</h3>
                <button
                  onClick={() => setShowAssignModal(true)}
                  className="px-3 py-2 bg-blue-600 text-white rounded text-sm"
                >
                  Edit Students
                </button>
              </div>
              <AssignedStudentList assignedStudents={group.students || []} />

              <div className="flex justify-between items-center mt-8">
                <h3 className="text-lg font-semibold">Attendance</h3>
                <button
                  onClick={() => setShowAttendanceModal(true)}
                  className="px-3 py-2 bg-green-600 text-white rounded text-sm"
                >
                  Manage Attendance
                </button>
              </div>
              <AttendanceList records={attendanceRecords} />


              <div className="flex justify-end mt-8 gap-4">
                <button
                  onClick={() => setShowMore(false)}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded border border-blue-300 hover:bg-blue-200"
                >
                  Show Less
                </button>
                <button
                  onClick={() => setShowConfirmDelete(true)}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded border border-red-300 hover:bg-red-200"
                >
                  Delete Group
                </button>
              </div>
            </>
          )}
        </div>
      </div>


      <StudentAssignModal
        open={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        onSave={handleAssignStudents}
        assignedStudents={group.students || []}
        isEditMode={true}
      />

      {showAttendanceModal && (
        <AttendanceManager
          assignedStudents={group.students || []}
          attendanceRecords={attendanceRecords}
          setAttendanceRecords={setAttendanceRecords}
          onClose={() => setShowAttendanceModal(false)}
        />
      )}

      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow p-6 w-[90%] max-w-md text-center space-y-4">
            <h2 className="text-2xl font-bold text-green-700">
              Group Updated Successfully!
            </h2>
            <p className="text-gray-600">Your changes have been saved.</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setShowSuccess(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Close
              </button>
              <button
                onClick={() => navigate("/groups")}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Return to Groups Page
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow p-6 w-[90%] max-w-md text-center space-y-4">
            <h2 className="text-xl font-semibold text-red-700">
              Are you sure you want to delete this group?
            </h2>
            <p className="text-gray-600">This action cannot be undone.</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditGroup;
