import React, { useEffect, useState } from "react";

const GroupInfoForm = ({ group, setGroup }) => {
  const [courses, setCourses] = useState([]);
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    setCourses(JSON.parse(localStorage.getItem("courses")) || []);
    setMentors(JSON.parse(localStorage.getItem("mentors")) || []);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroup((prev) => ({ ...prev, [name]: value }));
  };

  const inputClass =
    "w-full mt-1 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all";
  const labelClass = "text-sm font-medium text-gray-700";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray  border border-gray-300 p-4">
      <div>
        <label className={labelClass}>Group Name</label>
        <input
          type="text"
          name="name"
          value={group.name || ""}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Course</label>
        <select
          name="course"
          value={group.course || ""}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Select course</option>
          {courses.map((c, i) => (
            <option key={i} value={c.name}>{c.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Mentor</label>
        <select
          name="mentorId"
          value={group.mentorId || ""}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Select mentor</option>
          {mentors.map((m, i) => (
            <option key={i} value={m.id}>{m.fullName}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Lesson Days</label>
        <select
          name="days"
          value={group.days || ""}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Select days</option>
          <option value="Mon-Wed-Fri">Mon-Wed-Fri</option>
          <option value="Tue-Thu-Sat">Tue-Thu-Sat</option>
        </select>
      </div>
    </div>
  );
};

export default GroupInfoForm;