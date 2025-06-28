import React, { useEffect, useState } from "react";
import TopBar from "@/components/employees/TopBar";
import GroupsHeader from "@/components/groups/GroupsHeader";
import GroupsControls from "@/components/groups/GroupsControls";
import GroupsTable from "@/components/groups/GroupsTable";
import Pagination from "@/components/employees/PaginationFooter";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [filters, setFilters] = useState({ search: "", status: "", startDate: "", endDate: "" });
  const [page, setPage] = useState(1);
  const itemsPerPage = 6; // or any number you prefer

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("groups")) || [];
    setGroups(stored);
  }, []);

  // Filtering logic
  const filteredGroups = groups.filter(group => {
    const nameMatch = group.name.toLowerCase().includes(filters.search.toLowerCase());
    const statusMatch = filters.status ? group.status === filters.status : true;
    const startMatch = filters.startDate ? new Date(group.startDate) >= new Date(filters.startDate) : true;
    const endMatch = filters.endDate ? new Date(group.startDate) <= new Date(filters.endDate) : true;
    return nameMatch && statusMatch && startMatch && endMatch;
  });

  // Pagination logic
  const totalItems = filteredGroups.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedGroups = filteredGroups.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Reset page to 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [filters]);

  return (
    <div className="p-6 space-y-6">
      <TopBar />
      <GroupsHeader />
      <GroupsControls onApplyFilters={setFilters} />
      <GroupsTable groups={paginatedGroups} />
      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default Groups;
