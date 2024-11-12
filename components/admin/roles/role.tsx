"use client";

import React, { useState, useEffect } from "react";
import { formatDate } from "@/utils/date-utils";
import { toastError, toastSuccess } from "@/components/common/toast";
import { getRoles, deleteRole } from "@/app/api/roles";

import SearchBar from "../common/search-bar";
import Breadcrumb from "../common/breadcrumb";
import Table from "../common/table";
import ReactLoading from "react-loading";
import Dialog from "@/components/ui/custom-dialog";
import ColumnFilter from "../common/column-filter";
import AddRole from "./add-role";

import { IoIosAdd } from "react-icons/io";

const Role = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(null);
    const [isDetailVisible, setIsDetailVisible] = useState(false);
    const [isAddVisible, setIsAddVisible] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [selectedColumns, setSelectedColumns] = useState<string[]>([
        "name",
        "description",
        "parent_role_id",
        "parent_role_name",
        "user_type",
        "is_hidden",
        "status"
    ]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortBy, setSortBy] = useState("");
    const [orderBy, setOrderBy] = useState<"asc" | "desc" | undefined>("asc");
    const [load, setLoad] = useState(true);

    const availableColumns = [
        { header: "Name", accessor: "name" },
        { header: "Description", accessor: "description" },
        { header: "Parent Role ID", accessor: "parent_role_id" },
        { header: "Parent Role Name", accessor: "parent_role_name" },
        { header: "User Type", accessor: "user_type" },
        { header: "Is Hidden", accessor: "is_hidden" },
        { header: "Status", accessor: "status" },
        { header: "Permissions", accessor: "permissions" },
        { header: "Created At", accessor: "created_at" },
        { header: "Created By", accessor: "created_by" },
        { header: "Updated At", accessor: "updated_at" },
        { header: "Updated By", accessor: "updated_by" }
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
        fetchData(currentPage, rowsPerPage);
    }, [currentPage, rowsPerPage, searchTerm, sortBy, orderBy]);

    const fetchData = async (page: number, limit: number) => {
        setLoading(true);
        try {
            const response = await getRoles({
                page,
                limit,
                search: searchTerm,
                sort_by: sortBy || undefined,
                order_by: orderBy || undefined
            });
            const data = response.data.results.map((item: any) => ({
                id: item._id,
                name: item.name,
                description: item.description,
                parent_role_id: item.parent_role_id,
                parent_role_name: item.parent_role_name,
                user_type: item.user_type,
                is_hidden: item.is_hidden,
                status: item.status,
                permissions: item.permissions,
                created_at: formatDate(item.created_at),
                created_by: item.created_by,
                updated_at: formatDate(item.updated_at),
                updated_by: item.updated_by
            }));
            setItems(data);
            setTotalPages(response.data.total_page);
        } catch (error) {
            console.error("Failed to fetch roles:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const handleSortOrder = (column: string, order: any) => {
        setSortBy(column);
        setOrderBy(order);
        fetchData(currentPage, rowsPerPage);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (rows: number) => {
        setRowsPerPage(rows);
        setCurrentPage(1);
    };

    const handleRowClick = (item: any) => {
        setSelected(item);
        setIsDetailVisible(true);
    };

    const handleCloseDetail = () => {
        setIsDetailVisible(false);
    };

    const handleOpenAdd = () => {
        setIsAddVisible(true);
    };

    const handleCloseAdd = () => {
        setIsAddVisible(false);
    };

    const handleConfirmDelete = async () => {
        if (itemToDelete) {
            try {
                await deleteRole(itemToDelete);
                fetchData(currentPage, rowsPerPage);
                toastSuccess("Role deleted successfully");
            } catch (error) {
                console.error("Failed to delete role:", error);
                toastError("Failed to delete role");
            } finally {
                setIsDialogOpen(false);
            }
        }
    };

    const handleRowDelete = (item: any) => {
        setItemToDelete(item);
        setIsDialogOpen(true);
    };

    const handleUpdate = () => {
        fetchData(currentPage, rowsPerPage);
    };

    return (
        <>
            {isDetailVisible && selected ? (
                //     <div className="w-full md:fixed md:inset-0 md:z-50 md:flex md:items-center md:justify-center md:bg-black md:bg-opacity-50">
                //         <div className="absolute inset-0" onClick={handleCloseDetail}></div>
                //         <div className="relative z-10 w-full max-w-4xl">
                //             <EditRole role={selected} onClose={handleCloseDetail} onUpdate={handleUpdate} />
                //         </div>
                //     </div>
                <> </>
            ) : isAddVisible ? (
                <div className="w-full md:fixed md:inset-0 md:z-50 md:flex md:items-center md:justify-center md:bg-black md:bg-opacity-50">
                    <div className="absolute inset-0" onClick={handleCloseAdd}></div>
                    <div className="relative z-10 w-full max-w-4xl">
                        <AddRole onClose={handleCloseAdd} onUpdate={handleUpdate} />
                    </div>
                </div>
            ) : (
                <div className="container mx-auto flex flex-col max-w-screen-2xl p-4">
                    {load ? (
                        <></>
                    ) : (
                        <>
                            <Breadcrumb pageName="Users" />
                            <div className="flex flex-col p-6 rounded-2xl space-y-6 bg-white dark:bg-dark">
                                <div className="flex flex-row justify-between items-center space-x-4">
                                    <div className="w-1/3">
                                        <SearchBar onSearch={handleSearch} />
                                    </div>
                                    <div className="flex justify-between space-x-4">
                                        <ColumnFilter
                                            availableColumns={availableColumns}
                                            selectedColumns={selectedColumns}
                                            onColumnSelect={handleColumnSelect}
                                        />
                                        <button
                                            type="button"
                                            className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:opacity-80"
                                            onClick={handleOpenAdd}
                                        >
                                            <IoIosAdd size={24} className="mr-1" />
                                            Add Role
                                        </button>
                                    </div>
                                </div>
                                {loading ? (
                                    <div className="flex justify-center">
                                        <ReactLoading type="spinningBubbles" color="#2176ae" />
                                    </div>
                                ) : (
                                    <div className="w-full overflow-x-auto rounded-lg shadow-lg">
                                        <Table
                                            columns={columns}
                                            data={items}
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
                                )}
                            </div>
                        </>
                    )}
                </div>
            )}

            <Dialog
                isOpen={isDialogOpen}
                title="Xác nhận xóa"
                message="Bạn có chắc chắn muốn xóa role này không?"
                onConfirm={handleConfirmDelete}
                onCancel={() => setIsDialogOpen(false)}
            />
        </>
    );
};

export default Role;
