"use client";

import React, { useState, useEffect } from "react";
import { formatDate } from "@/utils/date-utils";
import { toastError, toastSuccess } from "@/components/common/toast";
import { getUsers, deleteUser } from "@/app/api/users";

import SearchBar from "../common/search-bar";
import Breadcrumb from "../common/breadcrumb";
import Table from "./user-table";
import EditUser from "./edit-user";
import Dialog from "@/components/ui/custom-dialog";
import AddUser from "./add-user";
import MultiSelectInput from "@/components/ui/multi-select-input";
import ColumnFilter from "../common/column-filter";
import LoadingPage from "@/components/ui/loading";
import { Button } from "@/components/ui/button-comp";

import { IoIosAdd } from "react-icons/io";

const Users = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isDetailVisible, setIsDetailVisible] = useState(false);
    const [isAddUserVisible, setIsAddUserVisible] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(["phone", "type", "position", "company"]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortBy, setSortBy] = useState("");
    const [orderBy, setOrderBy] = useState<"asc" | "desc" | undefined>("asc");

    const availableColumns = [
        { header: "Phone", accessor: "phone" },
        { header: "Type", accessor: "type" },
        { header: "Position", accessor: "position" },
        { header: "Company", accessor: "company" },
        { header: "District", accessor: "district" },
        { header: "Ward", accessor: "ward" },
        { header: "City", accessor: "city" },
        { header: "Country", accessor: "country" },
        { header: "Facebook", accessor: "facebook" },
        { header: "Twitter", accessor: "twitter" },
        { header: "LinkedIn", accessor: "linkedin" },
        { header: "Instagram", accessor: "instagram" },
        { header: "Created At", accessor: "created_at" },
        { header: "Created By", accessor: "created_by" },
        { header: "Updated At", accessor: "update_at" },
        { header: "Updated By", accessor: "update_by" }
    ];

    const columns = availableColumns.filter((column) => selectedColumns.includes(column.accessor));

    const handleColumnSelect = (accessor: string) => {
        setSelectedColumns((prevSelectedColumns) =>
            prevSelectedColumns.includes(accessor)
                ? prevSelectedColumns.filter((col) => col !== accessor)
                : [...prevSelectedColumns, accessor]
        );
    };

    useEffect(() => {
        fetchUsers(currentPage, rowsPerPage);
    }, [currentPage, rowsPerPage, searchTerm, sortBy, orderBy]);

    const fetchUsers = async (page: number, limit: number) => {
        setLoading(true);
        try {
            const response = await getUsers({
                page,
                limit,
                search: searchTerm,
                sort_by: sortBy || undefined,
                order_by: orderBy || undefined
            });
            const usersData = response.data.results.map((user: any) => ({
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                phone: user.phone,
                position: user.position,
                company: user.company,
                type: user.type,
                district: user.district,
                ward: user.ward,
                city: user.city,
                country: user.country,
                facebook: user.facebook,
                twitter: user.twitter,
                linkedin: user.linkedin,
                instagram: user.instagram,
                created_at: formatDate(user.created_at),
                created_by: user.created_by,
                update_at: formatDate(user.update_at),
                update_by: user.updated_by
            }));
            setUsers(usersData);
            setTotalPages(response.data.total_page);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        } finally {
            setLoading(false);
            setHasLoaded(true);
        }
    };

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const handleSortOrder = (column: string, order: any) => {
        setSortBy(column);
        setOrderBy(order);
        fetchUsers(currentPage, rowsPerPage);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (rows: number) => {
        setRowsPerPage(rows);
        setCurrentPage(1);
    };

    const handleRowClick = (user: any) => {
        setSelectedUser(user);
        setIsDetailVisible(true);
    };

    const handleCloseDetail = () => {
        setIsDetailVisible(false);
    };

    const handleOpenAddUser = () => {
        setIsAddUserVisible(true);
    };

    const handleCloseAddUser = () => {
        setIsAddUserVisible(false);
    };

    const handleConfirmDelete = async () => {
        if (userToDelete) {
            try {
                await deleteUser(userToDelete);
                fetchUsers(currentPage, rowsPerPage);
                toastSuccess("User deleted successfully");
            } catch (error) {
                console.error("Failed to delete user:", error);
                toastError("Failed to delete user");
            } finally {
                setIsDialogOpen(false);
            }
        }
    };

    const handleRowDelete = (user: any) => {
        setUserToDelete(user);
        setIsDialogOpen(true);
    };

    const handleUserUpdate = () => {
        fetchUsers(currentPage, rowsPerPage);
    };

    return (
        <>
            {(isDetailVisible && selectedUser) || isAddUserVisible ? (
                <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}>
                    <div
                        className="absolute inset-0"
                        onClick={isDetailVisible ? handleCloseDetail : handleCloseAddUser}
                    ></div>
                    <div className="relative z-10 w-full max-w-4xl p-4">
                        {isDetailVisible && selectedUser ? (
                            <EditUser user={selectedUser} onClose={handleCloseDetail} onUserUpdate={handleUserUpdate} />
                        ) : (
                            <AddUser onClose={handleCloseAddUser} onUserCreate={handleUserUpdate} />
                        )}
                    </div>
                </div>
            ) : (
                <div className="container mx-auto flex flex-col max-w-screen-2xl p-4">
                    {loading && !hasLoaded ? (
                        <LoadingPage />
                    ) : (
                        <>
                            <Breadcrumb pageName="Users" />
                            <div className="flex flex-col p-6 rounded-2xl space-y-6 bg-surface dark:bg-dark">
                                <div className="flex flex-col md:flex-row md:justify-between items-center md:space-x-4 ">
                                    <div className="w-full md:w-1/3">
                                        <SearchBar onSearch={handleSearch} />
                                    </div>
                                    <div className="flex justify-between space-x-4 mt-2 md:mt-0">
                                        <ColumnFilter
                                            availableColumns={availableColumns}
                                            selectedColumns={selectedColumns}
                                            onColumnSelect={handleColumnSelect}
                                        />
                                        <Button type="button" onClick={handleOpenAddUser} className="px-2 md:px-4 py-2">
                                            <IoIosAdd size={24} className="mr-1" />
                                            Add User
                                        </Button>
                                    </div>
                                </div>
                                <div className="w-full overflow-x-auto rounded-lg shadow-lg">
                                    <Table
                                        columns={columns}
                                        data={users}
                                        totalPages={totalPages}
                                        rowsPerPage={rowsPerPage}
                                        currentPage={currentPage}
                                        onSortOrder={handleSortOrder}
                                        onRowClick={handleRowClick}
                                        onRowDelete={handleRowDelete}
                                        onPageChange={handlePageChange}
                                        onRowsPerPageChange={handleRowsPerPageChange}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
            <Dialog
                isOpen={isDialogOpen}
                title="Xác nhận xóa"
                message="Bạn có chắc chắn muốn xóa người dùng này không?"
                onConfirm={handleConfirmDelete}
                onCancel={() => setIsDialogOpen(false)}
            />
        </>
    );
};

export default Users;
