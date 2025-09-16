import React, { useEffect, useRef, useState } from "react";
import { basePath } from "../../config";
import DownloadIcon from "../../assets/images/download.svg";
import { generateHeader } from "../../helper";
import DateRangeFilter from "../../app/DateRangeFilter";
import Pagination from "../../app/Pagination";

const Reports = ({ status, setEditableBooking }) => {
    const today = new Date();
    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(today.getDate() - 15);
    const formatDate = (date) => date.toISOString().split('T')[0];

    const [startDate, setStartDate] = useState(formatDate(fifteenDaysAgo));
    const [endDate, setEndDate] = useState(formatDate(today));
    const [dataLoader, setDataLoader] = useState(false)
    const [data, setData] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [downloadLoading, setDownloadLoading] = useState(false)

    const timerRef = useRef();

    const downloadExcelFile = async () => {
        setDownloadLoading(true);
        try {
            let params = new URLSearchParams({
                page: currentPage - 1,
                size: 100,
                startDate: startDate,
                endDate: endDate
            }).toString();

            let apiUurl = `${basePath}/booking-export/excel-client?${params}`;

            const response = await fetch(apiUurl, {
                method: 'GET',
                headers: generateHeader(),
            });

            if (!response.ok) {
                throw new Error('Failed to download file');
            }

            const blob = await response.blob();

            // Create a link element
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;

            // Set the default file name
            a.download = 'report.xlsx';
            document.body.appendChild(a);
            a.click();

            // Cleanup
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download error:', error);
        } finally {
            setDownloadLoading(false)
        }
    };

    useEffect(() => {
        if (timerRef.current != null) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            getReports();
            timerRef.current = null;
        }, 2000);
    }, [currentPage])

    async function getReports(formattedStart, formattedEnd) {
        setDataLoader(true);
        let params = new URLSearchParams({
            page: currentPage - 1,
            size: 100,
            startDate: formattedStart || startDate,
            endDate: formattedEnd || endDate
        }).toString();

        let url = `${basePath}/booking-export/data-client?${params}`;
        await fetch(url, {
            method: "GET",
            headers: generateHeader(),
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                let p = parseInt(res.total / res.size) + 1
                setTotalPages(p);
                setData(res.data);
                console.log("res", res);
            })
            .catch((err) => {
                setData([]);
                console.log("err", err);
            }).finally(() => {
                setDataLoader(false);
            })
    }

    const handleDateChange = (start, end) => {
        // Format to YYYY-MM-DD for API
        const formattedStart = start.toISOString().split("T")[0];
        const formattedEnd = end.toISOString().split("T")[0];

        if (timerRef.current != null) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            getReports(formattedStart, formattedEnd);
            timerRef.current = null;
        }, 2000);
    };

    return (
        <div className="booking-table-container mt-4">
            <div className="main-top-container d-flex justify-content-between">
                <h2 className="font-30">Reports</h2>
                <DateRangeFilter
                    containerClasses="m-0 w-max pe-0"
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    onChange={handleDateChange}
                />
                <button className={`admin-primary-btn ${downloadLoading ? "px-4" : ""}`}
                    onClick={downloadExcelFile}
                    disabled={dataLoader || !data?.length > 0}>
                    {downloadLoading ? (
                        <div className="btn-loader-white"></div>
                    ) : (
                        <>
                            <img src={DownloadIcon} alt="download" />
                            <span>Download</span>
                        </>
                    )}

                </button>
            </div>

            {dataLoader ? <main className="full-page">
                <div className="loader"></div>
            </main> : <div className="table-responsive">
                <table className="table table-hover booking-table align-middle">
                    <thead className="table-light">
                        <tr>
                            <th className="font-14 py-3">Invoice Number</th>
                            <th className="font-14 py-3">Trip ID</th>
                            <th className="font-14 py-3">Booking Date</th>
                            <th className="font-14 py-3">City</th>
                            <th className="font-14 py-3">State</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data?.length ? (
                            <>
                                {data.map((b) => (
                                    <tr key={b?.bookingId}>
                                        <td className="admin-label-text font-14">
                                            {b?.invoiceNo}
                                        </td>
                                        <td className="admin-label-text font-14">{b?.tripId}</td>
                                        <td className="admin-label-text font-14">
                                            {new Date(b?.bookingDate).toLocaleDateString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </td>

                                        <td className="admin-label-text font-14">
                                            {b?.city}
                                        </td>
                                        <td className="admin-label-text font-14">

                                            <p>{b?.state}</p>

                                        </td>

                                    </tr>
                                ))}
                            </>
                        ) : (
                            <tr>
                                <td colSpan={13} className="text-center">
                                    No Data Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {data && data?.length > 0 && <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                />}
            </div>}
        </div>
    );
};

export default Reports;
