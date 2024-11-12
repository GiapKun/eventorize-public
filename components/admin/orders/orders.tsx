"use client";

import React, { useState, useEffect } from "react";
import { formatDate } from "@/utils/date-utils";
import { toastError, toastSuccess } from "@/components/common/toast";
import { getOrders, deleteOrder } from "@/app/api/orders";
import { Button } from "@/components/ui/button-comp";

import SearchBar from "../common/search-bar";
import Breadcrumb from "../common/breadcrumb";
import Table from "./orders-table";
import Dialog from "@/components/ui/custom-dialog";
import ColumnFilter from "../common/column-filter";
import LoadingPage from "@/components/ui/loading";

import { IoIosAdd } from "react-icons/io";
import { t } from "i18next";

const Orders = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [selected, setSelected] = useState();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [selectedColumns, setSelectedColumns] = useState<string[]>([
        "_id",
        "amount",
        "discount_amount",
        "tax_rate",
        "vat_amount",
        "total_amount",
        "promotion_code",
        "notes"
    ]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortBy, setSortBy] = useState("");
    const [orderBy, setOrderBy] = useState<"asc" | "desc" | undefined>("asc");

    const availableColumns = [
        { header: "Id", accessor: "_id" },
        { header: "Status", accessor: "status" },
        { header: "Amount", accessor: "amount" },
        { header: "Discount Amount", accessor: "discount_amount" },
        { header: "Tax Rate", accessor: "tax_rate" },
        { header: "VAT Amount", accessor: "vat_amount" },
        { header: "Total Amount", accessor: "total_amount" },
        { header: "Promotion Code", accessor: "promotion_code" },
        { header: "Notes", accessor: "notes" },
        { header: "Created At", accessor: "created_at" },
        { header: "Created By", accessor: "created_by" }
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
            const res = await getOrders({
                page,
                limit,
                search: searchTerm,
                sort_by: sortBy || undefined,
                order_by: orderBy || undefined
            });
            const data = res.data.results.map((item: any) => ({
                id: item._id,
                status: item.status,
                amount: item.amount,
                discount_amount: item.discount_amount,
                tax_rate: item.tax_rate,
                vat_amount: item.vat_amount,
                total_amount: item.total_amount,
                promotion_code: item.promotion_code,
                notes: item.notes,
                order_items: item.order_items,
                created_at: formatDate(item.created_at),
                created_by: item.created_by
            }));
            setItems(data);
            setTotalPages(res.data.total_page);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
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

    const handleConfirmDelete = async () => {
        if (itemToDelete) {
            try {
                await deleteOrder(itemToDelete);
                fetchEvents(currentPage, rowsPerPage);
                toastSuccess("Order deleted successfully");
            } catch (error) {
                console.error("Failed to delete order:", error);
                toastError("Failed to delete order");
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
            <div className="container mx-auto flex flex-col max-w-screen-2xl p-4">
                {loading && !hasLoaded ? (
                    <LoadingPage />
                ) : (
                    <>
                        <Breadcrumb pageName="Orders" />
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
                                    onRowDelete={handleRowDelete}
                                    onPageChange={handlePageChange}
                                    onRowsPerPageChange={handleRowsPerPageChange}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
            <Dialog
                isOpen={isDialogOpen}
                title="Xác nhận xóa"
                message="Bạn có chắc chắn muốn xóa order này không?"
                onConfirm={handleConfirmDelete}
                onCancel={() => setIsDialogOpen(false)}
            />
        </>
    );
};

export default Orders;
