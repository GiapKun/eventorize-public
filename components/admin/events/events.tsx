"use client";

import React, { useState, useEffect } from "react";
import { formatDateToDateTimeLocal, formatDate } from "@/utils/date-utils";
import { toastError, toastSuccess } from "@/components/common/toast";
import { getEvents, deleteEvent } from "@/app/api/events";
import { Button } from "@/components/ui/button-comp";

import SearchBar from "../common/search-bar";
import Breadcrumb from "../common/breadcrumb";
import Table from "./event-table";
import Dialog from "@/components/ui/custom-dialog";
import EditEvent from "./edit-event";
import AddEvent from "./add-event";
import ColumnFilter from "../common/column-filter";
import LoadingPage from "@/components/ui/loading";

import { IoIosAdd } from "react-icons/io";
import { t } from "i18next";

const Organizers = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [selected, setSelected] = useState();
    const [isDetailVisible, setIsDetailVisible] = useState(false);
    const [isAddVisible, setIsAddVisible] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [selectedColumns, setSelectedColumns] = useState<string[]>([
        "title",
        "description",
        "start_date",
        "end_date",
        "address",
        "country"
    ]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortBy, setSortBy] = useState("");
    const [orderBy, setOrderBy] = useState<"asc" | "desc" | undefined>("asc");

    const availableColumns = [
        { header: "Title", accessor: "title" },
        { header: "Start Date", accessor: "start_date" },
        { header: "End Date", accessor: "end_date" },
        { header: "Address", accessor: "address" },
        { header: "Country", accessor: "country" },
        { header: "City", accessor: "city" },
        { header: "District", accessor: "district" },
        { header: "Ward", accessor: "ward" },
        { header: "Description", accessor: "description" }
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
        fetchEvents(currentPage, rowsPerPage);
    }, [currentPage, rowsPerPage, searchTerm, sortBy, orderBy]);

    const fetchEvents = async (page: number, limit: number) => {
        setLoading(true);
        try {
            const res = await getEvents({
                page,
                limit,
                search: searchTerm,
                sort_by: sortBy || undefined,
                order_by: orderBy || undefined
            });
            const data = res.data.results.map((item: any) => ({
                id: item._id,
                organizer_id: item.organizer_id,
                title: item.title,
                thumbnail: item.thumbnail,
                description: item.description,
                link: item.link,
                start_date: formatDate(item.start_date),
                end_date: formatDate(item.end_date),
                is_online: item.is_online,
                address: item.address,
                district: item.district,
                ward: item.ward,
                city: item.city,
                country: item.country
            }));
            setItems(data);
            setTotalPages(res.data.total_page);
        } catch (error) {
            console.error("Failed to fetch events:", error);
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
        fetchEvents(currentPage, rowsPerPage);
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
                await deleteEvent(itemToDelete);
                fetchEvents(currentPage, rowsPerPage);
                toastSuccess("Event deleted successfully");
            } catch (error) {
                console.error("Failed to delete event:", error);
                toastError("Failed to delete event");
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
        fetchEvents(currentPage, rowsPerPage);
    };

    return (
        <>
            {(isDetailVisible && selected) || isAddVisible ? (
                <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}>
                    <div
                        className="absolute inset-0"
                        onClick={isDetailVisible ? handleCloseDetail : handleCloseAdd}
                    ></div>
                    <div className="relative z-10 w-full max-w-4xl p-4">
                        {isDetailVisible && selected ? (
                            <EditEvent event={selected} onClose={handleCloseDetail} onUpdate={handleUpdate} />
                        ) : (
                            <AddEvent onClose={handleCloseAdd} onUpdate={handleUpdate} />
                        )}
                    </div>
                </div>
            ) : (
                <div className="container mx-auto flex flex-col max-w-screen-2xl p-4">
                    {loading && !hasLoaded ? (
                        <LoadingPage />
                    ) : (
                        <>
                            <Breadcrumb pageName="Organizers" />
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
                                        <Button type="button" onClick={handleOpenAdd} className="px-2 md:px-4 py-2 ">
                                            <IoIosAdd size={24} className="mr-1" />
                                            Add Event
                                        </Button>
                                    </div>
                                </div>
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
                            </div>
                        </>
                    )}
                </div>
            )}
            <Dialog
                isOpen={isDialogOpen}
                title="Xác nhận xóa"
                message="Bạn có chắc chắn muốn xóa event này không?"
                onConfirm={handleConfirmDelete}
                onCancel={() => setIsDialogOpen(false)}
            />
        </>
    );
};

export default Organizers;