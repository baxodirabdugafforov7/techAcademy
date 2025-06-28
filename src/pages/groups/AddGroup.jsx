import React, { useState, useEffect } from "react";
import TopBar from "@/components/employees/TopBar";
import { useNavigate } from "react-router-dom";
import StudentAssignModal from "@/components/groups/StudentAssignModal";
import AssignedStudentList from "@/components/groups/AssignedStudentList";
import AttendanceManager from "@/components/groups/AttendanceManager";

const AddGroup = () => {
    const navigate = useNavigate();
    const [group, setGroup] = useState({
        id: `GR${Date.now().toString().slice(-6)}`,
        name: "",
        course: "",
        mentorId: "",
        days: "",
        time: "",
        price: "",
        classroom: "",
        startDate: "",
        studentIds: [],
        status: "active"
    });
    const [showAttendance, setShowAttendance] = useState(false);
    const [attendanceRecords, setAttendanceRecords] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [assignedStudents, setAssignedStudents] = useState([]);

    const [mentors, setMentors] = useState([]);
    const [courses, setCourses] = useState([]);
    const [warning, setWarning] = useState(false);

    useEffect(() => {
        const storedCourses = JSON.parse(localStorage.getItem("courses"));
        if (!storedCourses || storedCourses.length === 0) {
            const defaultCourses = [
                { name: "Frontend Development" },
                { name: "Backend Development" },
                { name: "UI/UX Design" },
                { name: "Data Science" }
            ];
            localStorage.setItem("courses", JSON.stringify(defaultCourses));
            setCourses(defaultCourses);
        } else {
            setCourses(storedCourses);
        }

        setMentors(JSON.parse(localStorage.getItem("mentors")) || []);
    }, []);

    const handleInput = (field, value) => {
        setGroup({ ...group, [field]: value });
    };

    const handleSave = () => {
        const allFilled = Object.values(group).every((val) => val !== "" && val !== null);
        if (!allFilled) return setWarning(true);

        const stored = JSON.parse(localStorage.getItem("groups")) || [];

        const fullGroup = {
            ...group,
            studentIds: assignedStudents.map((s) => s.id),     // for quick reference
            students: assignedStudents,                        // ✅ full student info for Edit page
            attendance: attendanceRecords,                     // ✅ attendance for Edit page
        };

        localStorage.setItem("groups", JSON.stringify([fullGroup, ...stored]));
        navigate("/groups");
    };


    const handleStudentSave = (students) => {
        setAssignedStudents(students);
        setShowModal(false);
    };

    const groupedAttendance = {};
    attendanceRecords.forEach((record) => {
        if (!groupedAttendance[record.date]) {
            groupedAttendance[record.date] = {};
        }
        groupedAttendance[record.date][record.studentId] = record.status;
    });

    return (
        <div className="p-6 space-y-6">
            <TopBar />

            <div className="flex gap-2 justify-end">
                <button
                    onClick={() => navigate("/groups")}
                    className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800"
                >
                    Save
                </button>
            </div>


            {warning && (
                <div className="bg-red-100 text-red-700 px-4 py-2 rounded border border-red-400">
                    Please fill in all required fields.
                </div>
            )}

            <h3 className="text-lg font-semibold">Group Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
                    <input
                        type="text"
                        value={group.name}
                        onChange={(e) => handleInput("name", e.target.value)}
                        className="w-full border px-3 py-2 rounded border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                    <select
                        value={group.course}
                        onChange={(e) => handleInput("course", e.target.value)}
                        className="w-full border px-3 py-2 rounded border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    >
                        <option value="">Select course</option>
                        {courses.map((c, i) => (
                            <option key={i} value={c.name}>{c.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mentor</label>
                    <select
                        value={group.mentorId}
                        onChange={(e) => handleInput("mentorId", e.target.value)}
                        className="w-full border px-3 py-2 rounded border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    >
                        <option value="">Select mentor</option>
                        {mentors.map((m, i) => (
                            <option key={i} value={m.id}>{m.fullName}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Days</label>
                    <select
                        value={group.days}
                        onChange={(e) => handleInput("days", e.target.value)}
                        className="w-full border px-3 py-2 rounded border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    >
                        <option value="">Select days</option>
                        <option value="Mon-Wed-Fri">Mon-Wed-Fri</option>
                        <option value="Tue-Thu-Sat">Tue-Thu-Sat</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Time</label>
                    <input
                        type="text"
                        placeholder="e.g. 14:00 - 16:00"
                        value={group.time}
                        onChange={(e) => handleInput("time", e.target.value)}
                        className="w-full border px-3 py-2 rounded border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                        type="number"
                        value={group.price}
                        onChange={(e) => handleInput("price", e.target.value)}
                        className="w-full border px-3 py-2 rounded border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Classroom</label>
                    <input
                        type="text"
                        value={group.classroom}
                        onChange={(e) => handleInput("classroom", e.target.value)}
                        className="w-full border px-3 py-2 rounded border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                        type="date"
                        value={group.startDate}
                        onChange={(e) => handleInput("startDate", e.target.value)}
                        className="w-full border px-3 py-2 rounded border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                </div>
            </div>


            <h3 className="text-lg font-semibold mt-8">Students</h3>
            <div className="flex flex-wrap justify-between gap-3 mt-2">
                <button
                    onClick={() => {
                        setIsEditMode(false);
                        setShowModal(true);
                    }}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 text-sm"
                >
                    + Add Student
                </button>
                {assignedStudents.length > 0 && (
                    <button
                        onClick={() => {
                            setIsEditMode(true);
                            setShowModal(true);
                        }}
                        className="bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700 text-sm"
                    >
                        ✏️ Edit Assigned
                    </button>
                )}
            </div>


            <StudentAssignModal open={showModal} onClose={() => setShowModal(false)} onSave={handleStudentSave} assignedStudents={assignedStudents} isEditMode={isEditMode} />

            <AssignedStudentList assignedStudents={assignedStudents} groupStartDate={group.startDate} />

            <h3 className="text-lg font-semibold mt-8">Attendance</h3>
            <div className="flex flex-wrap justify-between gap-3 mt-2">
                <button
                    onClick={() => setShowAttendance(true)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 text-sm"
                >
                    + Add Attendance
                </button>
                {attendanceRecords.length > 0 && (
                    <button
                        onClick={() => setShowAttendance(true)}
                        className="bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700 text-sm"
                    >
                        ✏️ Edit Attendance
                    </button>
                )}
            </div>


            {showAttendance && (
                <AttendanceManager
                    assignedStudents={assignedStudents}
                    attendanceRecords={attendanceRecords}
                    setAttendanceRecords={setAttendanceRecords}
                    onClose={() => setShowAttendance(false)}
                />
            )}

            {attendanceRecords.length > 0 && (
                <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-4">Attendance Overview</h3>

                    <div className="overflow-auto max-w-5xl rounded-lg shadow border bg-white">
                        <table className="min-w-full text-sm text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100 border-b">
                                    <th className="px-4 py-3 font-semibold text-gray-700 text-left whitespace-nowrap border-r">
                                        Date
                                    </th>
                                    {assignedStudents.map((student) => (
                                        <th
                                            key={student.id}
                                            className="px-4 py-3 font-semibold text-gray-700 text-left whitespace-nowrap border-r"
                                        >
                                            {student.fullName}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(groupedAttendance).map((date, index) => (
                                    <tr
                                        key={date}
                                        className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                            } border-b hover:bg-gray-100`}
                                    >
                                        <td className="px-4 py-2 font-medium text-gray-800 border-r">
                                            {date}
                                        </td>
                                        {assignedStudents.map((student) => (
                                            <td
                                                key={student.id}
                                                className="px-4 py-2 text-gray-700 text-center capitalize border-r"
                                            >
                                                {groupedAttendance[date][student.id] || "-"}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AddGroup;
