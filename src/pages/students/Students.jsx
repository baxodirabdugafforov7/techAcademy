import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import TopBar from "@/components/employees/TopBar";
import StudentHeader from "@/components/students/StudentHeader";
import StudentControls from "@/components/students/StudentControls";
import StudentTable from "@/components/students/StudentTable";
import PaginationFooter from "@/components/employees/PaginationFooter";

const Students = () => {
  const location = useLocation();
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    startDate: "",
    endDate: "",
  });
  const [sortKey, setSortKey] = useState("id");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(data);
  }, [location]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const filteredAndSorted = useMemo(() => {
    const filtered = students.filter((student) => {
      const nameMatch = (student.fullName || "")
        .toLowerCase()
        .includes(filters.search.toLowerCase());

      const statusMatch = filters.status
        ? student.status === filters.status
        : true;

      const enrollmentDate = student.enrollmentDate
        ? new Date(student.enrollmentDate)
        : null;
      const startDate = filters.startDate ? new Date(filters.startDate) : null;
      const endDate = filters.endDate ? new Date(filters.endDate) : null;

      const dateMatch =
        (!startDate || (enrollmentDate && enrollmentDate >= startDate)) &&
        (!endDate || (enrollmentDate && enrollmentDate <= endDate));

      return nameMatch && statusMatch && dateMatch;
    });

    const sorted = [...filtered].sort((a, b) => {
      const aVal = a?.[sortKey] ?? "";
      const bVal = b?.[sortKey] ?? "";

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [students, filters, sortKey, sortOrder]);

  const paginated = filteredAndSorted.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);

  return (
    <div className="p-6 space-y-6">
      <TopBar />
      <StudentHeader />
      <StudentControls onApplyFilters={setFilters} />
      <StudentTable
        students={paginated}
        onSort={handleSort}
        sortKey={sortKey}
        sortOrder={sortOrder}
      />
      <PaginationFooter
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        totalItems={filteredAndSorted.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default Students;
