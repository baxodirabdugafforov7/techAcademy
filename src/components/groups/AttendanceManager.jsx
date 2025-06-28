import React, { useState } from "react";

const AttendanceManager = ({
  assignedStudents = [],
  attendanceRecords = [],
  setAttendanceRecords,
  onClose,
}) => {
  const [showAdd, setShowAdd] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("present");
  const [editIndex, setEditIndex] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleStartAdd = (student) => {
    setSelectedStudent(student);
    setDate("");
    setStatus("present");
    setShowAdd(true);
    setSuccess(false);
    setEditIndex(null);
  };

  const handleEditRecord = (record, index) => {
    setSelectedStudent({ id: record.studentId, fullName: record.fullName });
    setDate(record.date);
    setStatus(record.status);
    setShowAdd(true);
    setEditIndex(index);
  };

  const handleSaveRecord = () => {
    if (!selectedStudent || !date || !status) return;

    const newRecord = {
      studentId: selectedStudent.id,
      fullName: selectedStudent.fullName,
      date,
      status,
    };

    if (editIndex !== null) {
      const updatedRecords = [...attendanceRecords];
      updatedRecords[editIndex] = newRecord;
      setAttendanceRecords(updatedRecords);
    } else {
      setAttendanceRecords([...attendanceRecords, newRecord]);
    }

    setShowAdd(false);
    setSuccess(true);
    setEditIndex(null);
  };

  const handleAddAgain = () => {
    setSuccess(false);
    setSelectedStudent(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
        <h2 className="text-xl font-bold text-red-600 mb-4">Attendance</h2>

        {!showAdd && !success && (
          <div className="space-y-6">
            {assignedStudents.length === 0 ? (
              <p className="text-gray-500 text-sm italic">No students assigned.</p>
            ) : (
              assignedStudents.map((student) => (
                <div
                  key={student.id}
                  className="border border-red-200 p-4 rounded-xl bg-gray-50"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-800">{student.fullName}</span>
                    <button
                      onClick={() => handleStartAdd(student)}
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-500 transition"
                    >
                      + Add Attendance
                    </button>
                  </div>

                  {attendanceRecords.filter((r) => r.studentId === student.id).length > 0 ? (
                    <div className="space-y-2">
                      {attendanceRecords
                        .filter((r) => r.studentId === student.id)
                        .map((record, i) => (
                          <div
                            key={i}
                            className="flex justify-between items-center bg-white border border-gray-200 px-4 py-2 rounded-md"
                          >
                            <div>
                              <p className="text-sm font-medium text-gray-800">{record.date}</p>
                              <p className="text-xs text-gray-500 capitalize">{record.status}</p>
                            </div>
                            <button
                              onClick={() =>
                                handleEditRecord(record, attendanceRecords.findIndex((r) => r === record))
                              }
                              className="text-sm text-red-600 underline hover:text-red-500 transition"
                            >
                              Edit
                            </button>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 italic">No attendance recorded.</p>
                  )}
                </div>
              ))
            )}

            <div className="flex gap-2 mt-6 justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {showAdd && (
          <div className="mt-4 space-y-4 bg-white p-4 border border-red-200 rounded-xl">
            <h4 className="text-lg font-semibold text-gray-800">
              {editIndex !== null ? "Edit Attendance" : "Add Attendance"}
            </h4>
            <p className="text-sm text-gray-600">
              Name: <strong>{selectedStudent?.fullName}</strong>
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
              >
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="not taken">Not Taken</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setShowAdd(false);
                  setEditIndex(null);
                }}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRecord}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-500 rounded transition"
              >
                {editIndex !== null ? "Update" : "Save"}
              </button>
            </div>
          </div>
        )}

        {success && !showAdd && (
          <div className="mt-6 text-center space-y-4">
            <h2 className="text-red-600 font-semibold text-lg">Attendance Saved Successfully!</h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleAddAgain}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
              >
                Add Again
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceManager;
