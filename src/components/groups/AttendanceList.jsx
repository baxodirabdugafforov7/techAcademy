import React from "react";

const AssignedStudentList = ({ assignedStudents = [], courseDurationDays = 90 }) => {
  const calculateProgress = (enrollmentDate) => {
    const start = new Date(enrollmentDate);
    const now = new Date();
    const end = new Date(start);
    end.setDate(start.getDate() + courseDurationDays);

    const total = end - start;
    const elapsed = now - start;
    const percent = Math.min(100, Math.max(0, (elapsed / total) * 100));

    return Math.round(percent);
  };

  return (
    <div className="mt-6 space-y-5">
      <h4 className="text-lg font-semibold text-gray-800">Assigned Students</h4>

      {assignedStudents.length === 0 ? (
        <p className="text-sm text-gray-500 italic">No students assigned yet.</p>
      ) : (
        <div className="space-y-4">
          {assignedStudents.map((student, i) => {
            const progress = calculateProgress(student.enrollmentDate);
            return (
              <div
                key={i}
                className="flex justify-between items-center border border-red-200 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition"
              >
                <div>
                  <p className="font-semibold text-gray-900">
                    {student.fullName || "Unnamed"}
                  </p>
                  <p className="text-sm text-gray-600">{student.email}</p>
                  <p className="text-sm text-gray-500">
                    Enrolled:{" "}
                    <span className="font-medium">
                      {new Date(student.enrollmentDate).toLocaleDateString()}
                    </span>
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600 mb-1">Progress</p>
                  <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{progress}%</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AssignedStudentList;
