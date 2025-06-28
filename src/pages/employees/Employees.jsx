import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TopBar from "@/components/employees/TopBar";
import MentorHeader from "@/components/employees/MentorHeader";
import MentorControls from "@/components/employees/MentorControls";
import MentorTable from "@/components/employees/MentorTable";
import PaginationFooter from "@/components/employees/PaginationFooter";

const Employees = () => {
  const location = useLocation();

  const [mentors, setMentors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    dateFrom: "",
    dateTo: "",
  });

  const [sortKey, setSortKey] = useState("id");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [lang, setLang] = useState("English");

  const itemsPerPage = 10;

  useEffect(() => {
    loadMentors();
  }, [location]);

  const loadMentors = () => {
    const localData = JSON.parse(localStorage.getItem("mentors")) || [];
    setMentors(localData);
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // Filter logic
  const filteredMentors = mentors.filter((mentor) => {
    const text = `${mentor.fullName || ""} ${mentor.status || ""}`.toLowerCase();
    const matchesSearch = text.includes(searchTerm.toLowerCase());
    const matchesStatus = !filters.status || mentor.status === filters.status;
    const matchesDate =
      (!filters.dateFrom || mentor.dateJoined >= filters.dateFrom) &&
      (!filters.dateTo || mentor.dateJoined <= filters.dateTo);

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Sorting
  const sortedMentors = [...filteredMentors].sort((a, b) => {
    const aValue = a?.[sortKey] ?? "";
    const bValue = b?.[sortKey] ?? "";

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const paginatedMentors = sortedMentors.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredMentors.length / itemsPerPage);

  return (
    <div className="p-6 space-y-6">
      <TopBar lang={lang} setLang={setLang} />
      <MentorHeader />
      <MentorControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
      />
      <MentorTable
        mentors={paginatedMentors}
        handleSort={handleSort}
        sortKey={sortKey}
        sortOrder={sortOrder}
        refreshMentors={loadMentors}
      />
      <PaginationFooter
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        totalItems={filteredMentors.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default Employees;
