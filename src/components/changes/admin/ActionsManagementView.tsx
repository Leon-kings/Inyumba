
// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable react-hooks/immutability */
// import React, { useState, useEffect, useCallback, type JSX } from "react";
// import { format, parseISO, formatDistanceToNow } from "date-fns";
// import axios from "axios";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import {
//   Search as SearchIcon,
//   Refresh as RefreshIcon,
//   Person as PersonIcon,
//   Home as HomeIcon,
//   BookOnline as BookOnlineIcon,
//   ContactMail as ContactMailIcon,
//   Message as MessageIcon,
//   RateReview as RateReviewIcon,
//   Settings as SettingsIcon,
//   Info as InfoIcon,
//   Clear as ClearIcon,
//   Download as DownloadIcon,
//   Visibility as VisibilityIcon,
//   Login as LoginIcon,
//   PersonAdd as PersonAddIcon,
//   Dashboard as DashboardIcon,
//   TrendingUp as TrendingUpIcon,
//   People as PeopleIcon,
//   EventNote as EventNoteIcon,
//   FilterList as FilterListIcon,
//   Close as CloseIcon,
//   Error as ErrorIcon,
//   Schedule as ScheduleIcon,
//   Public as PublicIcon,
// } from "@mui/icons-material";

// // API Base URL
// const API_BASE_URL = "https://inyumbaproject.eu1.hubfly.app";

// // Types
// interface ActivityLog {
//   _id: string;
//   userId:
//     | string
//     | {
//         _id: string;
//         name: string;
//         email: string;
//         phone: string;
//         role: string;
//       };
//   userName: string;
//   userEmail: string;
//   action: string;
//   description: string;
//   ipAddress: string;
//   ipv4Address?: string;
//   userAgent: string;
//   createdAt: string;
//   updatedAt: string;
//   timeHappened: string;
//   __v?: number;
// }

// interface FilterOptions {
//   action: string;
//   dateRange: "today" | "week" | "month" | "all";
//   searchTerm: string;
// }

// interface Stats {
//   totalActivities: number;
//   uniqueUsers: number;
//   actionsByType: { [key: string]: number };
// }

// // Helper function to safely format dates
// const formatDateSafe = (
//   timestamp: string | undefined | null,
//   formatStr: string,
// ): string => {
//   if (!timestamp) return "N/A";
//   try {
//     return format(parseISO(timestamp), formatStr);
//   } catch {
//     return "Invalid Date";
//   }
// };

// const formatDistanceSafe = (timestamp: string | undefined | null): string => {
//   if (!timestamp) return "N/A";
//   try {
//     return formatDistanceToNow(parseISO(timestamp), { addSuffix: true });
//   } catch {
//     return "Invalid Date";
//   }
// };

// // Type guard to check if userId is an object
// const isUserIdObject = (
//   userId:
//     | string
//     | { _id: string; name: string; email: string; phone: string; role: string },
// ): userId is {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
//   role: string;
// } => {
//   return typeof userId === "object" && userId !== null && "_id" in userId;
// };

// // Helper functions to safely access user data
// const getUserId = (log: ActivityLog): string => {
//   if (isUserIdObject(log.userId)) return log.userId._id;
//   return log.userId as string;
// };

// const getUserName = (log: ActivityLog): string => {
//   if (log.userName) return log.userName;
//   if (isUserIdObject(log.userId) && log.userId.name) return log.userId.name;
//   return "Unknown User";
// };

// const getUserEmail = (log: ActivityLog): string => {
//   if (log.userEmail) return log.userEmail;
//   if (isUserIdObject(log.userId) && log.userId.email) return log.userId.email;
//   return "";
// };

// const getUserRole = (log: ActivityLog): string => {
//   if (isUserIdObject(log.userId) && log.userId.role) return log.userId.role;
//   return "";
// };

// const getUserPhone = (log: ActivityLog): string => {
//   if (isUserIdObject(log.userId) && log.userId.phone) return log.userId.phone;
//   return "";
// };

// // Create axios instance with interceptors
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Add request interceptor for authentication
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// export const ActionsManagement: React.FC = () => {
//   // State
//   const [logs, setLogs] = useState<ActivityLog[]>([]);
//   const [filteredLogs, setFilteredLogs] = useState<ActivityLog[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);
//   const [detailDialogOpen, setDetailDialogOpen] = useState(false);
//   const [filters, setFilters] = useState<FilterOptions>({
//     action: "all",
//     dateRange: "all",
//     searchTerm: "",
//   });
//   const [stats, setStats] = useState<Stats>({
//     totalActivities: 0,
//     uniqueUsers: 0,
//     actionsByType: {},
//   });

//   // Fetch logs using axios
//   const fetchLogs = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await api.get("/auth/activities");

//       let activities: ActivityLog[] = [];

//       if (response.data.activities && Array.isArray(response.data.activities)) {
//         activities = response.data.activities;
//       } else if (Array.isArray(response.data)) {
//         activities = response.data;
//       } else if (response.data.data && Array.isArray(response.data.data)) {
//         activities = response.data.data;
//       } else {
//         console.warn("Unexpected API response structure:", response.data);
//         activities = [];
//       }

//       setLogs(activities);
//       calculateStats(activities);
//       applyFilters(activities, filters);
//     } catch (err) {
//       const errorMessage = axios.isAxiosError(err)
//         ? err.response?.data?.message || err.message
//         : "An error occurred while fetching logs";
//       setError(errorMessage);
//       console.error("Error fetching logs:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [filters]);

//   // Calculate statistics
//   const calculateStats = (logsData: ActivityLog[]) => {
//     const uniqueUsers = new Set(
//       logsData.map((log) => getUserEmail(log) || getUserId(log)),
//     ).size;

//     const actionsByType: { [key: string]: number } = {};

//     logsData.forEach((log) => {
//       actionsByType[log.action] = (actionsByType[log.action] || 0) + 1;
//     });

//     setStats({
//       totalActivities: logsData.length,
//       uniqueUsers,
//       actionsByType,
//     });
//   };

//   // Apply filters
//   const applyFilters = (
//     logsData: ActivityLog[],
//     currentFilters: FilterOptions,
//   ) => {
//     let filtered = [...logsData];

//     if (currentFilters.action !== "all") {
//       filtered = filtered.filter((log) => log.action === currentFilters.action);
//     }

//     const now = new Date();
//     if (currentFilters.dateRange === "today") {
//       const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//       filtered = filtered.filter((log) => {
//         if (!log.createdAt) return false;
//         try {
//           return new Date(parseISO(log.createdAt)) >= today;
//         } catch {
//           return false;
//         }
//       });
//     } else if (currentFilters.dateRange === "week") {
//       const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
//       filtered = filtered.filter((log) => {
//         if (!log.createdAt) return false;
//         try {
//           return new Date(parseISO(log.createdAt)) >= weekAgo;
//         } catch {
//           return false;
//         }
//       });
//     } else if (currentFilters.dateRange === "month") {
//       const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
//       filtered = filtered.filter((log) => {
//         if (!log.createdAt) return false;
//         try {
//           return new Date(parseISO(log.createdAt)) >= monthAgo;
//         } catch {
//           return false;
//         }
//       });
//     }

//     if (currentFilters.searchTerm.trim()) {
//       const search = currentFilters.searchTerm.toLowerCase().trim();
//       filtered = filtered.filter((log) => {
//         return (
//           getUserEmail(log).toLowerCase().includes(search) ||
//           getUserName(log).toLowerCase().includes(search) ||
//           log.action.toLowerCase().includes(search) ||
//           log.description?.toLowerCase().includes(search) ||
//           log.ipAddress?.includes(search)
//         );
//       });
//     }

//     setFilteredLogs(filtered);
//   };

//   // Handle filter changes
//   const handleFilterChange = (key: keyof FilterOptions, value: string) => {
//     const newFilters = { ...filters, [key]: value };
//     setFilters(newFilters);
//     applyFilters(logs, newFilters);
//   };

//   // Handle search
//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     handleFilterChange("searchTerm", event.target.value);
//   };

//   // Clear filters
//   const clearFilters = () => {
//     const defaultFilters: FilterOptions = {
//       action: "all",
//       dateRange: "all",
//       searchTerm: "",
//     };
//     setFilters(defaultFilters);
//     applyFilters(logs, defaultFilters);
//   };

//   // Handle pagination
//   const handleChangePage = (newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLSelectElement>,
//   ) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // View log details
//   const handleViewDetails = (log: ActivityLog) => {
//     setSelectedLog(log);
//     setDetailDialogOpen(true);
//   };

//   // Export logs as PDF
//   const exportLogsPDF = () => {
//     if (filteredLogs.length === 0) return;

//     const doc = new jsPDF({
//       orientation: "landscape",
//       unit: "mm",
//       format: "a4",
//     });

//     // Add header with gradient effect
//     doc.setFillColor(52, 58, 64);
//     doc.rect(0, 0, doc.internal.pageSize.getWidth(), 40, "F");

//     // Title
//     doc.setFontSize(22);
//     doc.setTextColor(255, 255, 255);
//     doc.text("Activity Logs Report", 14, 22);

//     // Subtitle
//     doc.setFontSize(10);
//     doc.setTextColor(200, 200, 200);
//     doc.text(`Generated: ${format(new Date(), "PPpp")}`, 14, 32);
//     doc.text(`Total Records: ${filteredLogs.length}`, doc.internal.pageSize.getWidth() - 14, 32, { align: "right" });

//     // Prepare table data
//     const tableData = filteredLogs.map((log) => [
//       formatDateSafe(log.createdAt, "MMM d, yyyy HH:mm"),
//       getUserName(log),
//       getUserEmail(log),
//       log.action.replace("_", " "),
//       log.description?.substring(0, 50) + (log.description?.length > 50 ? "..." : ""),
//       log.ipAddress || log.ipv4Address || "N/A",
//     ]);

//     // Add table with professional styling
//     autoTable(doc, {
//       head: [["Time", "User", "Email", "Action", "Description", "IP Address"]],
//       body: tableData,
//       startY: 48,
//       styles: {
//         fontSize: 7,
//         cellPadding: 3,
//         valign: "middle",
//       },
//       headStyles: {
//         fillColor: [33, 37, 41],
//         textColor: [255, 255, 255],
//         fontSize: 8,
//         fontStyle: "bold",
//         halign: "center",
//       },
//       alternateRowStyles: {
//         fillColor: [245, 247, 250],
//       },
//       columnStyles: {
//         0: { cellWidth: 35, halign: "center" },
//         1: { cellWidth: 30 },
//         2: { cellWidth: 35 },
//         3: { cellWidth: 25, halign: "center" },
//         4: { cellWidth: 55 },
//         5: { cellWidth: 30, halign: "center" },
//       },
//       margin: { left: 14, right: 14 },
//       didDrawPage: (data) => {
//         // Footer
//         const pageCount = doc.getNumberOfPages();
//         doc.setFontSize(8);
//         doc.setTextColor(108, 117, 125);
//         doc.text(
//           `Page ${data.pageNumber} of ${pageCount} - © ${new Date().getFullYear()} Activity Logs`,
//           doc.internal.pageSize.getWidth() / 2,
//           doc.internal.pageSize.getHeight() - 8,
//           { align: "center" },
//         );
//       },
//     });

//     doc.save(`activity-logs-${format(new Date(), "yyyy-MM-dd")}.pdf`);
//   };

//   // Get action icon
//   const getActionIcon = (action: string) => {
//     const iconMap: { [key: string]: JSX.Element } = {
//       user_login: (
//         <LoginIcon className="text-blue-600" style={{ fontSize: "20px" }} />
//       ),
//       user_created: (
//         <PersonAddIcon
//           className="text-green-600"
//           style={{ fontSize: "20px" }}
//         />
//       ),
//       user_updated: (
//         <SettingsIcon
//           className="text-orange-500"
//           style={{ fontSize: "20px" }}
//         />
//       ),
//       user_deleted: (
//         <ClearIcon className="text-red-600" style={{ fontSize: "20px" }} />
//       ),
//       house_created: (
//         <HomeIcon className="text-green-600" style={{ fontSize: "20px" }} />
//       ),
//       house_updated: (
//         <SettingsIcon
//           className="text-orange-500"
//           style={{ fontSize: "20px" }}
//         />
//       ),
//       house_deleted: (
//         <ClearIcon className="text-red-600" style={{ fontSize: "20px" }} />
//       ),
//       booking_created: (
//         <BookOnlineIcon
//           className="text-blue-600"
//           style={{ fontSize: "20px" }}
//         />
//       ),
//       booking_updated: (
//         <SettingsIcon
//           className="text-orange-500"
//           style={{ fontSize: "20px" }}
//         />
//       ),
//       booking_deleted: (
//         <ClearIcon className="text-red-600" style={{ fontSize: "20px" }} />
//       ),
//       contact_created: (
//         <ContactMailIcon
//           className="text-purple-600"
//           style={{ fontSize: "20px" }}
//         />
//       ),
//       message_created: (
//         <MessageIcon className="text-blue-600" style={{ fontSize: "20px" }} />
//       ),
//       testimonial_created: (
//         <RateReviewIcon
//           className="text-green-600"
//           style={{ fontSize: "20px" }}
//         />
//       ),
//     };
//     return (
//       iconMap[action] || (
//         <InfoIcon className="text-gray-600" style={{ fontSize: "20px" }} />
//       )
//     );
//   };

//   // Get entity type icon
//   const getEntityIcon = (action: string) => {
//     if (action.includes("user"))
//       return (
//         <PersonIcon className="text-gray-600" style={{ fontSize: "18px" }} />
//       );
//     if (action.includes("house"))
//       return (
//         <HomeIcon className="text-gray-600" style={{ fontSize: "18px" }} />
//       );
//     if (action.includes("booking"))
//       return (
//         <BookOnlineIcon
//           className="text-gray-600"
//           style={{ fontSize: "18px" }}
//         />
//       );
//     if (action.includes("contact"))
//       return (
//         <ContactMailIcon
//           className="text-gray-600"
//           style={{ fontSize: "18px" }}
//         />
//       );
//     if (action.includes("message"))
//       return (
//         <MessageIcon className="text-gray-600" style={{ fontSize: "18px" }} />
//       );
//     if (action.includes("testimonial"))
//       return (
//         <RateReviewIcon
//           className="text-gray-600"
//           style={{ fontSize: "18px" }}
//         />
//       );
//     return <InfoIcon className="text-gray-600" style={{ fontSize: "18px" }} />;
//   };

//   // Get entity type from action
//   const getEntityType = (action: string): string => {
//     if (action.includes("user")) return "User";
//     if (action.includes("house")) return "House";
//     if (action.includes("booking")) return "Booking";
//     if (action.includes("contact")) return "Contact";
//     if (action.includes("message")) return "Message";
//     if (action.includes("testimonial")) return "Testimonial";
//     return action;
//   };

//   // Get action badge style
//   const getActionBadgeStyle = (action: string): string => {
//     const styleMap: { [key: string]: string } = {
//       user_login: "bg-blue-50 text-blue-700 border-blue-200",
//       user_created: "bg-emerald-50 text-emerald-700 border-emerald-200",
//       user_updated: "bg-amber-50 text-amber-700 border-amber-200",
//       user_deleted: "bg-red-50 text-red-700 border-red-200",
//       house_created: "bg-emerald-50 text-emerald-700 border-emerald-200",
//       house_updated: "bg-amber-50 text-amber-700 border-amber-200",
//       house_deleted: "bg-red-50 text-red-700 border-red-200",
//       booking_created: "bg-blue-50 text-blue-700 border-blue-200",
//       booking_updated: "bg-amber-50 text-amber-700 border-amber-200",
//       booking_deleted: "bg-red-50 text-red-700 border-red-200",
//       contact_created: "bg-purple-50 text-purple-700 border-purple-200",
//       message_created: "bg-indigo-50 text-indigo-700 border-indigo-200",
//       testimonial_created: "bg-emerald-50 text-emerald-700 border-emerald-200",
//     };
//     return styleMap[action] || "bg-gray-50 text-gray-700 border-gray-200";
//   };

//   useEffect(() => {
//     fetchLogs();
//   }, [fetchLogs]);

//   // Loading state with professional skeleton
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-6 mt-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="animate-pulse">
//             {/* Header Skeleton */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 mb-8">
//               <div className="flex justify-between items-center mb-6">
//                 <div className="h-10 w-56 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl"></div>
//                 <div className="flex gap-3">
//                   <div className="h-12 w-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl"></div>
//                   <div className="h-12 w-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl"></div>
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
//                 {[1, 2, 3, 4].map((i) => (
//                   <div
//                     key={i}
//                     className="p-5 bg-gradient-to-br from-slate-100 to-slate-200/50 rounded-2xl border border-slate-200/50"
//                   >
//                     <div className="h-4 w-28 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg mb-3"></div>
//                     <div className="h-10 w-20 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl"></div>
//                   </div>
//                 ))}
//               </div>
//               <div className="flex flex-wrap gap-4">
//                 <div className="h-12 flex-1 min-w-[200px] bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl"></div>
//                 <div className="h-12 w-44 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl"></div>
//                 <div className="h-12 w-44 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl"></div>
//                 <div className="h-12 w-28 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl"></div>
//               </div>
//             </div>
//             {/* Table Skeleton */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
//               <div className="p-6">
//                 {[1, 2, 3, 4, 5].map((i) => (
//                   <div
//                     key={i}
//                     className="flex items-center gap-4 py-4 border-b border-slate-100"
//                   >
//                     <div className="h-12 w-36 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl"></div>
//                     <div className="h-12 w-44 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl"></div>
//                     <div className="h-12 w-28 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl"></div>
//                     <div className="h-12 flex-1 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl"></div>
//                     <div className="h-12 w-24 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl"></div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Get unique action types for filters
//   const actionTypes = Array.from(new Set(logs.map((log) => log.action)));

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-4 sm:p-6 lg:p-8 mt-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Modern Header with Glass Effect */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-6 sm:p-8 mb-8 hover:shadow-3xl transition-all duration-500 mt-4">
//           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-2xl shadow-lg shadow-blue-500/25">
//                 <DashboardIcon className="text-white" style={{ fontSize: "28px" }} />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
//                   Activity Logs
//                 </h1>
//                 <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
//                   Real-time monitoring & analytics
//                 </p>
//               </div>
//             </div>
//             <div className="flex flex-wrap gap-3">
//               <button
//                 onClick={fetchLogs}
//                 className="group inline-flex items-center gap-2.5 px-5 py-2.5 bg-white text-slate-700 border border-slate-200 rounded-2xl hover:bg-slate-50 hover:border-slate-300 hover:shadow-lg transition-all duration-300 text-sm font-medium"
//               >
//                 <RefreshIcon className="text-slate-500 group-hover:rotate-180 transition-transform duration-500" style={{ fontSize: "18px" }} />
//                 Refresh
//               </button>
//               <button
//                 onClick={exportLogsPDF}
//                 className="group inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 text-white rounded-2xl hover:from-rose-600 hover:via-rose-700 hover:to-pink-700 hover:shadow-xl shadow-rose-500/25 transition-all duration-300 text-sm font-medium"
//               >
//                 <DownloadIcon className="group-hover:scale-110 transition-transform duration-300" style={{ fontSize: "18px" }} />
//                 Export PDF
//               </button>
//             </div>
//           </div>

//           {/* Premium Stats Cards */}
//           <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
//             <div className="group bg-gradient-to-br from-blue-50 to-blue-100/50 p-5 rounded-2xl border border-blue-200/50 hover:shadow-xl hover:shadow-blue-500/10 hover:scale-[1.02] transition-all duration-300">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <div className="text-sm font-medium text-blue-700/80 flex items-center gap-2">
//                     <EventNoteIcon style={{ fontSize: "16px" }} />
//                     Total Activities
//                   </div>
//                   <div className="text-3xl font-bold text-blue-900 mt-2">
//                     {stats.totalActivities.toLocaleString()}
//                   </div>
//                 </div>
//                 <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
//                   <EventNoteIcon className="text-white" style={{ fontSize: "28px" }} />
//                 </div>
//               </div>
//               <div className="mt-3 flex items-center gap-2">
//                 <span className="text-xs font-medium text-blue-600 bg-blue-200/60 px-3 py-1 rounded-full">
//                   Last 30 days
//                 </span>
//               </div>
//             </div>

//             <div className="group bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-5 rounded-2xl border border-emerald-200/50 hover:shadow-xl hover:shadow-emerald-500/10 hover:scale-[1.02] transition-all duration-300">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <div className="text-sm font-medium text-emerald-700/80 flex items-center gap-2">
//                     <PeopleIcon style={{ fontSize: "16px" }} />
//                     Unique Users
//                   </div>
//                   <div className="text-3xl font-bold text-emerald-900 mt-2">
//                     {stats.uniqueUsers.toLocaleString()}
//                   </div>
//                 </div>
//                 <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
//                   <PeopleIcon className="text-white" style={{ fontSize: "28px" }} />
//                 </div>
//               </div>
//               <div className="mt-3 flex items-center gap-2">
//                 <span className="text-xs font-medium text-emerald-600 bg-emerald-200/60 px-3 py-1 rounded-full">
//                   Active users
//                 </span>
//               </div>
//             </div>

//             <div className="group bg-gradient-to-br from-purple-50 to-purple-100/50 p-5 rounded-2xl border border-purple-200/50 hover:shadow-xl hover:shadow-purple-500/10 hover:scale-[1.02] transition-all duration-300">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <div className="text-sm font-medium text-purple-700/80 flex items-center gap-2">
//                     <TrendingUpIcon style={{ fontSize: "16px" }} />
//                     Most Active
//                   </div>
//                   <div className="text-lg font-bold text-purple-900 mt-2 truncate max-w-[140px]">
//                     {Object.entries(stats.actionsByType)
//                       .sort((a, b) => b[1] - a[1])[0]?.[0]
//                       ?.replace("_", " ") || "N/A"}
//                   </div>
//                 </div>
//                 <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">
//                   <TrendingUpIcon className="text-white" style={{ fontSize: "28px" }} />
//                 </div>
//               </div>
//               <div className="mt-3 flex items-center gap-2">
//                 <span className="text-xs font-medium text-purple-600 bg-purple-200/60 px-3 py-1 rounded-full">
//                   {Object.entries(stats.actionsByType).sort(
//                     (a, b) => b[1] - a[1],
//                   )[0]?.[1] || 0}{" "}
//                   occurrences
//                 </span>
//               </div>
//             </div>

//             <div className="group bg-gradient-to-br from-amber-50 to-amber-100/50 p-5 rounded-2xl border border-amber-200/50 hover:shadow-xl hover:shadow-amber-500/10 hover:scale-[1.02] transition-all duration-300">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <div className="text-sm font-medium text-amber-700/80 flex items-center gap-2">
//                     <FilterListIcon style={{ fontSize: "16px" }} />
//                     Action Types
//                   </div>
//                   <div className="text-3xl font-bold text-amber-900 mt-2">
//                     {Object.keys(stats.actionsByType).length}
//                   </div>
//                 </div>
//                 <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform duration-300">
//                   <FilterListIcon className="text-white" style={{ fontSize: "28px" }} />
//                 </div>
//               </div>
//               <div className="mt-3 flex items-center gap-2">
//                 <span className="text-xs font-medium text-amber-600 bg-amber-200/60 px-3 py-1 rounded-full">
//                   Different types
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Premium Filters with Glass Effect */}
//           <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-start sm:items-center p-4 bg-gradient-to-br from-slate-50/80 to-white/80 rounded-2xl border border-slate-200/50 backdrop-blur-sm">
//             <div className="relative flex-1 min-w-[200px] w-full sm:w-auto">
//               <input
//                 type="text"
//                 placeholder="Search logs by user, action, IP, description..."
//                 value={filters.searchTerm}
//                 onChange={handleSearch}
//                 className="w-full px-4 py-3 pl-12 bg-white/80 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 text-sm placeholder:text-slate-400"
//               />
//               <SearchIcon
//                 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
//                 style={{ fontSize: "20px" }}
//               />
//             </div>

//             <select
//               value={filters.action}
//               onChange={(e) => handleFilterChange("action", e.target.value)}
//               className="px-4 py-3 bg-white/80 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-sm min-w-[150px] transition-all duration-200 hover:border-slate-300 cursor-pointer"
//             >
//               <option value="all">All Actions</option>
//               {actionTypes.map((action) => (
//                 <option key={action} value={action}>
//                   {action.replace("_", " ")}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={filters.dateRange}
//               onChange={(e) => handleFilterChange("dateRange", e.target.value)}
//               className="px-4 py-3 bg-white/80 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-sm min-w-[150px] transition-all duration-200 hover:border-slate-300 cursor-pointer"
//             >
//               <option value="all">All Time</option>
//               <option value="today">Today</option>
//               <option value="week">This Week</option>
//               <option value="month">This Month</option>
//             </select>

//             <button
//               onClick={clearFilters}
//               className="inline-flex items-center gap-1.5 px-5 py-3 bg-white/80 border border-slate-200 rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 text-sm text-slate-700 font-medium hover:shadow-lg"
//             >
//               <ClearIcon style={{ fontSize: "18px" }} />
//               Clear
//             </button>
//           </div>
//         </div>

//         {/* Error message with glass effect */}
//         {error && (
//           <div className="p-5 px-7 bg-gradient-to-br from-red-50/90 to-red-100/50 backdrop-blur-sm text-red-700 rounded-2xl mb-6 border border-red-200 flex items-center gap-4 shadow-lg shadow-red-500/10 mt-4">
//             <div className="p-2 bg-red-200/50 rounded-xl">
//               <ErrorIcon className="text-red-500" style={{ fontSize: "24px" }} />
//             </div>
//             <span className="flex-1 font-medium">{error}</span>
//             <button
//               onClick={() => setError(null)}
//               className="p-2 hover:bg-red-200/50 rounded-xl transition-colors duration-200 text-red-500 hover:text-red-700"
//             >
//               <CloseIcon style={{ fontSize: "20px" }} />
//             </button>
//           </div>
//         )}

//         {/* Premium Table with Glass Effect */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden hover:shadow-3xl transition-all duration-500 mt-4">
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse text-sm">
//               <thead>
//                 <tr className="bg-gradient-to-br from-slate-50/80 to-slate-100/50">
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
//                     <div className="flex items-center gap-2">
//                       <ScheduleIcon style={{ fontSize: "14px" }} />
//                       Time
//                     </div>
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
//                     <div className="flex items-center gap-2">
//                       <PersonIcon style={{ fontSize: "14px" }} />
//                       User
//                     </div>
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
//                     <div className="flex items-center gap-2">
//                       <SettingsIcon style={{ fontSize: "14px" }} />
//                       Action
//                     </div>
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
//                     Description
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
//                     <div className="flex items-center gap-2">
//                       <PublicIcon style={{ fontSize: "14px" }} />
//                       IP Address
//                     </div>
//                   </th>
//                   <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
//                     Details
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100">
//                 {filteredLogs.length === 0 ? (
//                   <tr>
//                     <td colSpan={6} className="py-20 text-center">
//                       <div className="flex flex-col items-center gap-3">
//                         <div className="p-4 bg-slate-100 rounded-full">
//                           <InfoIcon
//                             className="text-slate-300"
//                             style={{ fontSize: "56px" }}
//                           />
//                         </div>
//                         <p className="text-slate-500 font-semibold text-lg">
//                           No logs found
//                         </p>
//                         <p className="text-sm text-slate-400">
//                           Try adjusting your filters or search terms
//                         </p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredLogs
//                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                     .map((log, index) => (
//                       <tr
//                         key={log._id}
//                         className={`hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-transparent transition-all duration-300 group ${
//                           index % 2 === 0 ? "bg-white/50" : "bg-slate-50/30"
//                         }`}
//                       >
//                         <td className="px-6 py-4">
//                           <div className="flex flex-col">
//                             <span className="text-sm font-semibold text-slate-700">
//                               {formatDistanceSafe(log.createdAt)}
//                             </span>
//                             <span className="text-xs text-slate-400 mt-0.5">
//                               {formatDateSafe(
//                                 log.createdAt,
//                                 "MMM d, yyyy HH:mm",
//                               )}
//                             </span>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="flex items-center gap-3">
//                             <div className="relative">
//                               <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/25">
//                                 {getUserName(log).charAt(0).toUpperCase()}
//                               </div>
//                               <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
//                             </div>
//                             <div className="flex flex-col">
//                               <span className="text-sm font-semibold text-slate-800">
//                                 {getUserName(log)}
//                               </span>
//                               <span className="text-xs text-slate-500">
//                                 {getUserEmail(log)}
//                               </span>
//                               {getUserRole(log) && (
//                                 <span className="text-xs font-medium text-slate-400 capitalize">
//                                   {getUserRole(log)}
//                                 </span>
//                               )}
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4">
//                           <span
//                             className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border ${getActionBadgeStyle(log.action)} shadow-sm`}
//                           >
//                             {getActionIcon(log.action)}
//                             {log.action.replace("_", " ")}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="flex flex-col gap-0.5 max-w-[240px]">
//                             <span className="text-sm text-slate-700 truncate">
//                               {log.description}
//                             </span>
//                             <span className="flex items-center gap-1.5 text-xs text-slate-400">
//                               {getEntityIcon(log.action)}
//                               {getEntityType(log.action)}
//                             </span>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4">
//                           <code className="text-xs font-mono bg-slate-100/80 px-3 py-1.5 rounded-xl text-slate-600 border border-slate-200/50">
//                             {log.ipAddress || log.ipv4Address || "N/A"}
//                           </code>
//                         </td>
//                         <td className="px-6 py-4 text-right">
//                           <button
//                             onClick={() => handleViewDetails(log)}
//                             className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 hover:shadow-lg shadow-blue-500/25 transition-all duration-300 text-sm font-medium group"
//                           >
//                             <VisibilityIcon className="group-hover:scale-110 transition-transform duration-300" style={{ fontSize: "16px" }} />
//                             View
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Premium Pagination */}
//           {filteredLogs.length > 0 && (
//             <div className="px-6 py-4 flex flex-wrap justify-between items-center border-t border-slate-100 gap-3 bg-gradient-to-br from-slate-50/30 to-transparent backdrop-blur-sm">
//               <div className="flex items-center gap-3">
//                 <span className="text-sm text-slate-600 font-medium">Rows per page:</span>
//                 <select
//                   value={rowsPerPage}
//                   onChange={handleChangeRowsPerPage}
//                   className="px-3 py-2 bg-white/80 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 hover:border-slate-300 cursor-pointer"
//                 >
//                   <option value={5}>5</option>
//                   <option value={10}>10</option>
//                   <option value={25}>25</option>
//                   <option value={50}>50</option>
//                 </select>
//               </div>
//               <div className="text-sm text-slate-600 font-medium">
//                 <span className="text-slate-800">{filteredLogs.length}</span> total
//                 logs
//                 <span className="mx-2 text-slate-300">|</span>
//                 <span className="text-slate-800">
//                   {page * rowsPerPage + 1}
//                 </span> -{" "}
//                 <span className="text-slate-800">
//                   {Math.min((page + 1) * rowsPerPage, filteredLogs.length)}
//                 </span>
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleChangePage(page - 1)}
//                   disabled={page === 0}
//                   className={`px-5 py-2 border rounded-xl text-sm font-medium transition-all duration-200 ${
//                     page === 0
//                       ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
//                       : "bg-white/80 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:shadow-lg"
//                   }`}
//                 >
//                   Previous
//                 </button>
//                 <button
//                   onClick={() => handleChangePage(page + 1)}
//                   disabled={
//                     page >= Math.ceil(filteredLogs.length / rowsPerPage) - 1
//                   }
//                   className={`px-5 py-2 border rounded-xl text-sm font-medium transition-all duration-200 ${
//                     page >= Math.ceil(filteredLogs.length / rowsPerPage) - 1
//                       ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
//                       : "bg-white/80 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:shadow-lg"
//                   }`}
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="mt-8 text-center">
//           <p className="text-xs text-slate-400 font-medium">
//             Showing <span className="text-slate-600">{filteredLogs.length}</span> of{" "}
//             <span className="text-slate-600">{logs.length}</span> total activities
//           </p>
//         </div>
//       </div>

//       {/* Premium Detail Dialog */}
//       {detailDialogOpen && selectedLog && (
//         <div
//           className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-50 p-4 animate-in fade-in duration-300"
//           onClick={() => setDetailDialogOpen(false)}
//         >
//           <div
//             className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl shadow-black/25 animate-in slide-in-from-bottom-10 duration-300"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Modal Header */}
//             <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 px-8 py-5 border-b border-slate-100 flex justify-between items-start gap-4">
//               <div>
//                 <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
//                   <span className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl text-white shadow-lg shadow-blue-500/25">
//                     <InfoIcon style={{ fontSize: "22px" }} />
//                   </span>
//                   Activity Details
//                 </h2>
//                 <span
//                   className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border mt-2 ${getActionBadgeStyle(selectedLog.action)}`}
//                 >
//                   {getActionIcon(selectedLog.action)}
//                   {selectedLog.action.replace("_", " ")}
//                 </span>
//               </div>
//               <button
//                 onClick={() => setDetailDialogOpen(false)}
//                 className="p-2 hover:bg-slate-100 rounded-2xl transition-colors duration-200 text-slate-400 hover:text-slate-600"
//               >
//                 <CloseIcon style={{ fontSize: "24px" }} />
//               </button>
//             </div>

//             {/* Modal Content */}
//             <div className="p-8">
//               {/* User Information */}
//               <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl p-5 border border-slate-200/50 mb-6">
//                 <h4 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
//                   <div className="p-1.5 bg-blue-500/10 rounded-lg">
//                     <PersonIcon className="text-blue-600" style={{ fontSize: "18px" }} />
//                   </div>
//                   User Information
//                 </h4>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div className="flex flex-col">
//                     <span className="text-xs text-slate-500 font-medium">Name</span>
//                     <span className="text-sm font-semibold text-slate-900 mt-1">
//                       {getUserName(selectedLog)}
//                     </span>
//                   </div>
//                   <div className="flex flex-col">
//                     <span className="text-xs text-slate-500 font-medium">Email</span>
//                     <span className="text-sm text-slate-700 mt-1">
//                       {getUserEmail(selectedLog)}
//                     </span>
//                   </div>
//                   {getUserRole(selectedLog) && (
//                     <div className="flex flex-col">
//                       <span className="text-xs text-slate-500 font-medium">Role</span>
//                       <span className="text-sm capitalize font-semibold text-slate-800 mt-1">
//                         {getUserRole(selectedLog)}
//                       </span>
//                     </div>
//                   )}
//                   {getUserPhone(selectedLog) && (
//                     <div className="flex flex-col">
//                       <span className="text-xs text-slate-500 font-medium">Phone</span>
//                       <span className="text-sm text-slate-700 mt-1">
//                         {getUserPhone(selectedLog)}
//                       </span>
//                     </div>
//                   )}
//                   <div className="flex flex-col col-span-full">
//                     <span className="text-xs text-slate-500 font-medium">User ID</span>
//                     <code className="text-xs font-mono bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 truncate mt-1">
//                       {getUserId(selectedLog)}
//                     </code>
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
//                 <div className="flex flex-col">
//                   <span className="text-xs text-slate-500 font-medium">Entity Type</span>
//                   <div className="flex items-center gap-2 mt-1.5">
//                     <div className="p-1.5 bg-slate-100 rounded-lg">
//                       {getEntityIcon(selectedLog.action)}
//                     </div>
//                     <span className="text-sm font-semibold text-slate-800">
//                       {getEntityType(selectedLog.action)}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="flex flex-col">
//                   <span className="text-xs text-slate-500 font-medium">Action</span>
//                   <span className="text-sm font-semibold text-slate-800 mt-1.5">
//                     {selectedLog.action.replace("_", " ")}
//                   </span>
//                 </div>
//               </div>

//               {/* Description */}
//               <div className="mb-5">
//                 <span className="text-xs text-slate-500 font-medium">Description</span>
//                 <div className="mt-1.5 p-4 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl border border-slate-200/50">
//                   <p className="text-sm text-slate-700 leading-relaxed">
//                     {selectedLog.description}
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                 <div className="flex flex-col">
//                   <span className="text-xs text-slate-500 font-medium">IP Address</span>
//                   <code className="text-sm font-mono bg-white px-3 py-2 rounded-xl border border-slate-200 text-slate-600 mt-1.5">
//                     {selectedLog.ipAddress || selectedLog.ipv4Address || "N/A"}
//                   </code>
//                 </div>
//                 <div className="flex flex-col">
//                   <span className="text-xs text-slate-500 font-medium">User Agent</span>
//                   <span className="text-xs text-slate-600 mt-1.5 break-all line-clamp-2 bg-white p-3 rounded-xl border border-slate-200">
//                     {selectedLog.userAgent || "N/A"}
//                   </span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6 pt-6 border-t border-slate-100">
//                 <div className="flex flex-col">
//                   <span className="text-xs text-slate-500 font-medium">Created At</span>
//                   <span className="text-sm font-semibold text-slate-800 mt-1">
//                     {formatDateSafe(selectedLog.createdAt, "PPpp")}
//                   </span>
//                   <span className="text-xs text-slate-400 mt-0.5">
//                     {formatDistanceSafe(selectedLog.createdAt)}
//                   </span>
//                 </div>
//                 <div className="flex flex-col">
//                   <span className="text-xs text-slate-500 font-medium">Time Happened</span>
//                   <span className="text-sm font-semibold text-slate-800 mt-1">
//                     {selectedLog.timeHappened || "N/A"}
//                   </span>
//                 </div>
//               </div>

//               {selectedLog.updatedAt &&
//                 selectedLog.updatedAt !== selectedLog.createdAt && (
//                   <div className="mt-6 pt-6 border-t border-slate-100">
//                     <span className="text-xs text-slate-500 font-medium">Updated At</span>
//                     <span className="text-sm font-semibold text-slate-800 block mt-1">
//                       {formatDateSafe(selectedLog.updatedAt, "PPpp")}
//                     </span>
//                   </div>
//                 )}
//             </div>

//             {/* Modal Footer */}
//             <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm px-8 py-5 border-t border-slate-100 flex justify-end">
//               <button
//                 onClick={() => setDetailDialogOpen(false)}
//                 className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 hover:shadow-xl shadow-blue-500/25 transition-all duration-300 text-sm font-semibold"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };












/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/immutability */
import React, { useState, useEffect, useCallback, type JSX } from "react";
import { format, parseISO, formatDistanceToNow } from "date-fns";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Person as PersonIcon,
  Home as HomeIcon,
  BookOnline as BookOnlineIcon,
  ContactMail as ContactMailIcon,
  Message as MessageIcon,
  RateReview as RateReviewIcon,
  Settings as SettingsIcon,
  Info as InfoIcon,
  Clear as ClearIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
  Dashboard as DashboardIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  EventNote as EventNoteIcon,
  FilterList as FilterListIcon,
  Close as CloseIcon,
  Error as ErrorIcon,
  Schedule as ScheduleIcon,
  Public as PublicIcon,
  Delete as DeleteIcon,
  DeleteSweep as DeleteSweepIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";

// API Base URL
const API_BASE_URL = "https://inyumbaproject.eu1.hubfly.app";

// Types
interface ActivityLog {
  _id: string;
  userId:
    | string
    | {
        _id: string;
        name: string;
        email: string;
        phone: string;
        role: string;
      };
  userName: string;
  userEmail: string;
  action: string;
  description: string;
  ipAddress: string;
  ipv4Address?: string;
  userAgent: string;
  createdAt: string;
  updatedAt: string;
  timeHappened: string;
  __v?: number;
}

interface FilterOptions {
  action: string;
  dateRange: "today" | "week" | "month" | "all";
  searchTerm: string;
}

interface Stats {
  totalActivities: number;
  uniqueUsers: number;
  actionsByType: { [key: string]: number };
}

// Helper function to safely format dates
const formatDateSafe = (
  timestamp: string | undefined | null,
  formatStr: string,
): string => {
  if (!timestamp) return "N/A";
  try {
    return format(parseISO(timestamp), formatStr);
  } catch {
    return "Invalid Date";
  }
};

const formatDistanceSafe = (timestamp: string | undefined | null): string => {
  if (!timestamp) return "N/A";
  try {
    return formatDistanceToNow(parseISO(timestamp), { addSuffix: true });
  } catch {
    return "Invalid Date";
  }
};

// Type guard to check if userId is an object
const isUserIdObject = (
  userId:
    | string
    | { _id: string; name: string; email: string; phone: string; role: string },
): userId is {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
} => {
  return typeof userId === "object" && userId !== null && "_id" in userId;
};

// Helper functions to safely access user data
const getUserId = (log: ActivityLog): string => {
  if (isUserIdObject(log.userId)) return log.userId._id;
  return log.userId as string;
};

const getUserName = (log: ActivityLog): string => {
  if (log.userName) return log.userName;
  if (isUserIdObject(log.userId) && log.userId.name) return log.userId.name;
  return "Unknown User";
};

const getUserEmail = (log: ActivityLog): string => {
  if (log.userEmail) return log.userEmail;
  if (isUserIdObject(log.userId) && log.userId.email) return log.userId.email;
  return "";
};

const getUserRole = (log: ActivityLog): string => {
  if (isUserIdObject(log.userId) && log.userId.role) return log.userId.role;
  return "";
};

const getUserPhone = (log: ActivityLog): string => {
  if (isUserIdObject(log.userId) && log.userId.phone) return log.userId.phone;
  return "";
};

// Create axios instance with interceptors
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const ActionsManagement: React.FC = () => {
  // State
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    action: "all",
    dateRange: "all",
    searchTerm: "",
  });
  const [stats, setStats] = useState<Stats>({
    totalActivities: 0,
    uniqueUsers: 0,
    actionsByType: {},
  });
  // State for delete functionality
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  // State for success/failure modals
  const [resultModal, setResultModal] = useState<{
    open: boolean;
    type: "success" | "error";
    title: string;
    message: string;
    details?: string;
  }>({
    open: false,
    type: "success",
    title: "",
    message: "",
    details: "",
  });

  // Fetch logs using axios
  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/auth/activities");

      let activities: ActivityLog[] = [];

      if (response.data.activities && Array.isArray(response.data.activities)) {
        activities = response.data.activities;
      } else if (Array.isArray(response.data)) {
        activities = response.data;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        activities = response.data.data;
      } else {
        console.warn("Unexpected API response structure:", response.data);
        activities = [];
      }

      setLogs(activities);
      calculateStats(activities);
      applyFilters(activities, filters);
      setSelectedIds([]);
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : "An error occurred while fetching logs";
      setError(errorMessage);
      console.error("Error fetching logs:", err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Calculate statistics
  const calculateStats = (logsData: ActivityLog[]) => {
    const uniqueUsers = new Set(
      logsData.map((log) => getUserEmail(log) || getUserId(log)),
    ).size;

    const actionsByType: { [key: string]: number } = {};

    logsData.forEach((log) => {
      actionsByType[log.action] = (actionsByType[log.action] || 0) + 1;
    });

    setStats({
      totalActivities: logsData.length,
      uniqueUsers,
      actionsByType,
    });
  };

  // Apply filters
  const applyFilters = (
    logsData: ActivityLog[],
    currentFilters: FilterOptions,
  ) => {
    let filtered = [...logsData];

    if (currentFilters.action !== "all") {
      filtered = filtered.filter((log) => log.action === currentFilters.action);
    }

    const now = new Date();
    if (currentFilters.dateRange === "today") {
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      filtered = filtered.filter((log) => {
        if (!log.createdAt) return false;
        try {
          return new Date(parseISO(log.createdAt)) >= today;
        } catch {
          return false;
        }
      });
    } else if (currentFilters.dateRange === "week") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter((log) => {
        if (!log.createdAt) return false;
        try {
          return new Date(parseISO(log.createdAt)) >= weekAgo;
        } catch {
          return false;
        }
      });
    } else if (currentFilters.dateRange === "month") {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter((log) => {
        if (!log.createdAt) return false;
        try {
          return new Date(parseISO(log.createdAt)) >= monthAgo;
        } catch {
          return false;
        }
      });
    }

    if (currentFilters.searchTerm.trim()) {
      const search = currentFilters.searchTerm.toLowerCase().trim();
      filtered = filtered.filter((log) => {
        return (
          getUserEmail(log).toLowerCase().includes(search) ||
          getUserName(log).toLowerCase().includes(search) ||
          log.action.toLowerCase().includes(search) ||
          log.description?.toLowerCase().includes(search) ||
          log.ipAddress?.includes(search)
        );
      });
    }

    setFilteredLogs(filtered);
  };

  // Handle filter changes
  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    applyFilters(logs, newFilters);
  };

  // Handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterChange("searchTerm", event.target.value);
  };

  // Clear filters
  const clearFilters = () => {
    const defaultFilters: FilterOptions = {
      action: "all",
      dateRange: "all",
      searchTerm: "",
    };
    setFilters(defaultFilters);
    applyFilters(logs, defaultFilters);
  };

  // Handle pagination
  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // View log details
  const handleViewDetails = (log: ActivityLog) => {
    setSelectedLog(log);
    setDetailDialogOpen(true);
  };

  // Handle checkbox selection
  const handleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const currentPageIds = filteredLogs
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((log) => log._id);
    const allSelected = currentPageIds.every((id) => selectedIds.includes(id));
    
    if (allSelected) {
      setSelectedIds(selectedIds.filter((id) => !currentPageIds.includes(id)));
    } else {
      const newIds = [...selectedIds];
      currentPageIds.forEach((id) => {
        if (!newIds.includes(id)) newIds.push(id);
      });
      setSelectedIds(newIds);
    }
  };

  // Delete single activity
  const handleDeleteSingle = (id: string) => {
    setDeleteTarget(id);
    setDeleteConfirmOpen(true);
  };

  // Delete bulk activities
  const handleDeleteBulk = () => {
    if (selectedIds.length === 0) return;
    setDeleteTarget("bulk");
    setDeleteConfirmOpen(true);
  };

  // Show result modal
  const showResultModal = (
    type: "success" | "error",
    title: string,
    message: string,
    details?: string
  ) => {
    setResultModal({
      open: true,
      type,
      title,
      message,
      details,
    });
  };

  // Confirm delete
// Confirm delete
const confirmDelete = async () => {
  try {
    setDeleting(true);
    setError(null);

    let deletedCount = 0;
    let deletedIds: string[] = [];

    if (deleteTarget === "bulk") {
      // Bulk delete
      await api.delete("/auth/activities/bulk", {
        data: { ids: selectedIds },
      });
      deletedCount = selectedIds.length;
      deletedIds = selectedIds;
      
      // Remove deleted items from state
      const remainingLogs = logs.filter((log) => !selectedIds.includes(log._id));
      setLogs(remainingLogs);
      calculateStats(remainingLogs);
      applyFilters(remainingLogs, filters);
      setSelectedIds([]);

      // Show success modal
      showResultModal(
        "success",
        "Bulk Delete Successful",
        `Successfully deleted ${deletedCount} activity log(s).`,
        `IDs: ${deletedIds.slice(0, 5).join(", ")}${deletedIds.length > 5 ? ` and ${deletedIds.length - 5} more` : ""}`
      );
    } else if (deleteTarget) {
      // Single delete
      await api.delete(`/auth/activities/${deleteTarget}`);
      deletedCount = 1;
      deletedIds = [deleteTarget];
      
      const remainingLogs = logs.filter((log) => log._id !== deleteTarget);
      setLogs(remainingLogs);
      calculateStats(remainingLogs);
      applyFilters(remainingLogs, filters);
      setSelectedIds(selectedIds.filter((id) => id !== deleteTarget));

      // Show success modal
      showResultModal(
        "success",
        "Delete Successful",
        "Activity log has been deleted successfully.",
        `ID: ${deleteTarget}`
      );
    }

    setDeleteConfirmOpen(false);
    setDeleteTarget(null);
  } catch (err) {
    const errorMessage = axios.isAxiosError(err)
      ? err.response?.data?.message || err.message
      : "An error occurred while deleting logs";
    setError(errorMessage);
    
    // Show error modal
    showResultModal(
      "error",
      "Delete Failed",
      errorMessage,
      axios.isAxiosError(err) && err.response?.data?.details 
        ? err.response.data.details 
        : "Please try again later."
    );
    
    console.error("Error deleting logs:", err);
  } finally {
    setDeleting(false);
  }
};

  // Export logs as PDF
  const exportLogsPDF = () => {
    if (filteredLogs.length === 0) return;

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    // Add header with gradient effect
    doc.setFillColor(52, 58, 64);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 40, "F");

    // Title
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text("Activity Logs Report", 14, 22);

    // Subtitle
    doc.setFontSize(10);
    doc.setTextColor(200, 200, 200);
    doc.text(`Generated: ${format(new Date(), "PPpp")}`, 14, 32);
    doc.text(`Total Records: ${filteredLogs.length}`, doc.internal.pageSize.getWidth() - 14, 32, { align: "right" });

    // Prepare table data
    const tableData = filteredLogs.map((log) => [
      formatDateSafe(log.createdAt, "MMM d, yyyy HH:mm"),
      getUserName(log),
      getUserEmail(log),
      log.action.replace("_", " "),
      log.description?.substring(0, 50) + (log.description?.length > 50 ? "..." : ""),
      log.ipAddress || log.ipv4Address || "N/A",
    ]);

    // Add table with professional styling
    autoTable(doc, {
      head: [["Time", "User", "Email", "Action", "Description", "IP Address"]],
      body: tableData,
      startY: 48,
      styles: {
        fontSize: 7,
        cellPadding: 3,
        valign: "middle",
      },
      headStyles: {
        fillColor: [33, 37, 41],
        textColor: [255, 255, 255],
        fontSize: 8,
        fontStyle: "bold",
        halign: "center",
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250],
      },
      columnStyles: {
        0: { cellWidth: 35, halign: "center" },
        1: { cellWidth: 30 },
        2: { cellWidth: 35 },
        3: { cellWidth: 25, halign: "center" },
        4: { cellWidth: 55 },
        5: { cellWidth: 30, halign: "center" },
      },
      margin: { left: 14, right: 14 },
      didDrawPage: (data) => {
        // Footer
        const pageCount = doc.getNumberOfPages();
        doc.setFontSize(8);
        doc.setTextColor(108, 117, 125);
        doc.text(
          `Page ${data.pageNumber} of ${pageCount} - © ${new Date().getFullYear()} Activity Logs`,
          doc.internal.pageSize.getWidth() / 2,
          doc.internal.pageSize.getHeight() - 8,
          { align: "center" },
        );
      },
    });

    doc.save(`activity-logs-${format(new Date(), "yyyy-MM-dd")}.pdf`);
  };

  // Get action icon
  const getActionIcon = (action: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      user_login: (
        <LoginIcon className="text-blue-600" style={{ fontSize: "20px" }} />
      ),
      user_created: (
        <PersonAddIcon
          className="text-green-600"
          style={{ fontSize: "20px" }}
        />
      ),
      user_updated: (
        <SettingsIcon
          className="text-orange-500"
          style={{ fontSize: "20px" }}
        />
      ),
      user_deleted: (
        <ClearIcon className="text-red-600" style={{ fontSize: "20px" }} />
      ),
      house_created: (
        <HomeIcon className="text-green-600" style={{ fontSize: "20px" }} />
      ),
      house_updated: (
        <SettingsIcon
          className="text-orange-500"
          style={{ fontSize: "20px" }}
        />
      ),
      house_deleted: (
        <ClearIcon className="text-red-600" style={{ fontSize: "20px" }} />
      ),
      booking_created: (
        <BookOnlineIcon
          className="text-blue-600"
          style={{ fontSize: "20px" }}
        />
      ),
      booking_updated: (
        <SettingsIcon
          className="text-orange-500"
          style={{ fontSize: "20px" }}
        />
      ),
      booking_deleted: (
        <ClearIcon className="text-red-600" style={{ fontSize: "20px" }} />
      ),
      contact_created: (
        <ContactMailIcon
          className="text-purple-600"
          style={{ fontSize: "20px" }}
        />
      ),
      message_created: (
        <MessageIcon className="text-blue-600" style={{ fontSize: "20px" }} />
      ),
      testimonial_created: (
        <RateReviewIcon
          className="text-green-600"
          style={{ fontSize: "20px" }}
        />
      ),
    };
    return (
      iconMap[action] || (
        <InfoIcon className="text-gray-600" style={{ fontSize: "20px" }} />
      )
    );
  };

  // Get entity type icon
  const getEntityIcon = (action: string) => {
    if (action.includes("user"))
      return (
        <PersonIcon className="text-gray-600" style={{ fontSize: "18px" }} />
      );
    if (action.includes("house"))
      return (
        <HomeIcon className="text-gray-600" style={{ fontSize: "18px" }} />
      );
    if (action.includes("booking"))
      return (
        <BookOnlineIcon
          className="text-gray-600"
          style={{ fontSize: "18px" }}
        />
      );
    if (action.includes("contact"))
      return (
        <ContactMailIcon
          className="text-gray-600"
          style={{ fontSize: "18px" }}
        />
      );
    if (action.includes("message"))
      return (
        <MessageIcon className="text-gray-600" style={{ fontSize: "18px" }} />
      );
    if (action.includes("testimonial"))
      return (
        <RateReviewIcon
          className="text-gray-600"
          style={{ fontSize: "18px" }}
        />
      );
    return <InfoIcon className="text-gray-600" style={{ fontSize: "18px" }} />;
  };

  // Get entity type from action
  const getEntityType = (action: string): string => {
    if (action.includes("user")) return "User";
    if (action.includes("house")) return "House";
    if (action.includes("booking")) return "Booking";
    if (action.includes("contact")) return "Contact";
    if (action.includes("message")) return "Message";
    if (action.includes("testimonial")) return "Testimonial";
    return action;
  };

  // Get action badge style
  const getActionBadgeStyle = (action: string): string => {
    const styleMap: { [key: string]: string } = {
      user_login: "bg-blue-50 text-blue-700 border-blue-200",
      user_created: "bg-emerald-50 text-emerald-700 border-emerald-200",
      user_updated: "bg-amber-50 text-amber-700 border-amber-200",
      user_deleted: "bg-red-50 text-red-700 border-red-200",
      house_created: "bg-emerald-50 text-emerald-700 border-emerald-200",
      house_updated: "bg-amber-50 text-amber-700 border-amber-200",
      house_deleted: "bg-red-50 text-red-700 border-red-200",
      booking_created: "bg-blue-50 text-blue-700 border-blue-200",
      booking_updated: "bg-amber-50 text-amber-700 border-amber-200",
      booking_deleted: "bg-red-50 text-red-700 border-red-200",
      contact_created: "bg-purple-50 text-purple-700 border-purple-200",
      message_created: "bg-indigo-50 text-indigo-700 border-indigo-200",
      testimonial_created: "bg-emerald-50 text-emerald-700 border-emerald-200",
    };
    return styleMap[action] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  // Loading state with professional skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-6 mt-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            {/* Header Skeleton */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 mb-8">
              <div className="flex justify-between items-center mb-6">
                <div className="h-10 w-56 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl"></div>
                <div className="flex gap-3">
                  <div className="h-12 w-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl"></div>
                  <div className="h-12 w-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl"></div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="p-5 bg-gradient-to-br from-slate-100 to-slate-200/50 rounded-2xl border border-slate-200/50"
                  >
                    <div className="h-4 w-28 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg mb-3"></div>
                    <div className="h-10 w-20 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl"></div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="h-12 flex-1 min-w-[200px] bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl"></div>
                <div className="h-12 w-44 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl"></div>
                <div className="h-12 w-44 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl"></div>
                <div className="h-12 w-28 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl"></div>
              </div>
            </div>
            {/* Table Skeleton */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
              <div className="p-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 py-4 border-b border-slate-100"
                  >
                    <div className="h-12 w-36 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl"></div>
                    <div className="h-12 w-44 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl"></div>
                    <div className="h-12 w-28 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl"></div>
                    <div className="h-12 flex-1 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl"></div>
                    <div className="h-12 w-24 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get unique action types for filters
  const actionTypes = Array.from(new Set(logs.map((log) => log.action)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-4 sm:p-6 lg:p-8 mt-4">
      <div className="max-w-7xl mx-auto">
        {/* Modern Header with Glass Effect */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-6 sm:p-8 mb-8 hover:shadow-3xl transition-all duration-500 mt-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-2xl shadow-lg shadow-blue-500/25">
                <DashboardIcon className="text-white" style={{ fontSize: "28px" }} />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Activity Logs
                </h1>
                <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Real-time monitoring & analytics
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {/* Bulk Delete Button */}
              {selectedIds.length > 0 && (
                <button
                  onClick={handleDeleteBulk}
                  className="group inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-red-500 via-red-600 to-rose-600 text-white rounded-2xl hover:from-red-600 hover:via-red-700 hover:to-rose-700 hover:shadow-xl shadow-red-500/25 transition-all duration-300 text-sm font-medium"
                >
                  <DeleteSweepIcon className="group-hover:scale-110 transition-transform duration-300" style={{ fontSize: "18px" }} />
                  Delete Selected ({selectedIds.length})
                </button>
              )}
              <button
                onClick={fetchLogs}
                className="group inline-flex items-center gap-2.5 px-5 py-2.5 bg-white text-slate-700 border border-slate-200 rounded-2xl hover:bg-slate-50 hover:border-slate-300 hover:shadow-lg transition-all duration-300 text-sm font-medium"
              >
                <RefreshIcon className="text-slate-500 group-hover:rotate-180 transition-transform duration-500" style={{ fontSize: "18px" }} />
                Refresh
              </button>
              <button
                onClick={exportLogsPDF}
                className="group inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 text-white rounded-2xl hover:from-rose-600 hover:via-rose-700 hover:to-pink-700 hover:shadow-xl shadow-rose-500/25 transition-all duration-300 text-sm font-medium"
              >
                <DownloadIcon className="group-hover:scale-110 transition-transform duration-300" style={{ fontSize: "18px" }} />
                Export PDF
              </button>
            </div>
          </div>

          {/* Premium Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100/50 p-5 rounded-2xl border border-blue-200/50 hover:shadow-xl hover:shadow-blue-500/10 hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-blue-700/80 flex items-center gap-2">
                    <EventNoteIcon style={{ fontSize: "16px" }} />
                    Total Activities
                  </div>
                  <div className="text-3xl font-bold text-blue-900 mt-2">
                    {stats.totalActivities.toLocaleString()}
                  </div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                  <EventNoteIcon className="text-white" style={{ fontSize: "28px" }} />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs font-medium text-blue-600 bg-blue-200/60 px-3 py-1 rounded-full">
                  Last 30 days
                </span>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-5 rounded-2xl border border-emerald-200/50 hover:shadow-xl hover:shadow-emerald-500/10 hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-emerald-700/80 flex items-center gap-2">
                    <PeopleIcon style={{ fontSize: "16px" }} />
                    Unique Users
                  </div>
                  <div className="text-3xl font-bold text-emerald-900 mt-2">
                    {stats.uniqueUsers.toLocaleString()}
                  </div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                  <PeopleIcon className="text-white" style={{ fontSize: "28px" }} />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs font-medium text-emerald-600 bg-emerald-200/60 px-3 py-1 rounded-full">
                  Active users
                </span>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-purple-50 to-purple-100/50 p-5 rounded-2xl border border-purple-200/50 hover:shadow-xl hover:shadow-purple-500/10 hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-purple-700/80 flex items-center gap-2">
                    <TrendingUpIcon style={{ fontSize: "16px" }} />
                    Most Active
                  </div>
                  <div className="text-lg font-bold text-purple-900 mt-2 truncate max-w-[140px]">
                    {Object.entries(stats.actionsByType)
                      .sort((a, b) => b[1] - a[1])[0]?.[0]
                      ?.replace("_", " ") || "N/A"}
                  </div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUpIcon className="text-white" style={{ fontSize: "28px" }} />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs font-medium text-purple-600 bg-purple-200/60 px-3 py-1 rounded-full">
                  {Object.entries(stats.actionsByType).sort(
                    (a, b) => b[1] - a[1],
                  )[0]?.[1] || 0}{" "}
                  occurrences
                </span>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-amber-50 to-amber-100/50 p-5 rounded-2xl border border-amber-200/50 hover:shadow-xl hover:shadow-amber-500/10 hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-amber-700/80 flex items-center gap-2">
                    <FilterListIcon style={{ fontSize: "16px" }} />
                    Action Types
                  </div>
                  <div className="text-3xl font-bold text-amber-900 mt-2">
                    {Object.keys(stats.actionsByType).length}
                  </div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform duration-300">
                  <FilterListIcon className="text-white" style={{ fontSize: "28px" }} />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs font-medium text-amber-600 bg-amber-200/60 px-3 py-1 rounded-full">
                  Different types
                </span>
              </div>
            </div>
          </div>

          {/* Premium Filters with Glass Effect */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-start sm:items-center p-4 bg-gradient-to-br from-slate-50/80 to-white/80 rounded-2xl border border-slate-200/50 backdrop-blur-sm">
            <div className="relative flex-1 min-w-[200px] w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search logs by user, action, IP, description..."
                value={filters.searchTerm}
                onChange={handleSearch}
                className="w-full px-4 py-3 pl-12 bg-white/80 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 text-sm placeholder:text-slate-400"
              />
              <SearchIcon
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
                style={{ fontSize: "20px" }}
              />
            </div>

            <select
              value={filters.action}
              onChange={(e) => handleFilterChange("action", e.target.value)}
              className="px-4 py-3 bg-white/80 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-sm min-w-[150px] transition-all duration-200 hover:border-slate-300 cursor-pointer"
            >
              <option value="all">All Actions</option>
              {actionTypes.map((action) => (
                <option key={action} value={action}>
                  {action.replace("_", " ")}
                </option>
              ))}
            </select>

            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange("dateRange", e.target.value)}
              className="px-4 py-3 bg-white/80 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-sm min-w-[150px] transition-all duration-200 hover:border-slate-300 cursor-pointer"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>

            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 px-5 py-3 bg-white/80 border border-slate-200 rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 text-sm text-slate-700 font-medium hover:shadow-lg"
            >
              <ClearIcon style={{ fontSize: "18px" }} />
              Clear
            </button>
          </div>
        </div>

        {/* Error message with glass effect */}
        {error && (
          <div className="p-5 px-7 bg-gradient-to-br from-red-50/90 to-red-100/50 backdrop-blur-sm text-red-700 rounded-2xl mb-6 border border-red-200 flex items-center gap-4 shadow-lg shadow-red-500/10 mt-4">
            <div className="p-2 bg-red-200/50 rounded-xl">
              <ErrorIcon className="text-red-500" style={{ fontSize: "24px" }} />
            </div>
            <span className="flex-1 font-medium">{error}</span>
            <button
              onClick={() => setError(null)}
              className="p-2 hover:bg-red-200/50 rounded-xl transition-colors duration-200 text-red-500 hover:text-red-700"
            >
              <CloseIcon style={{ fontSize: "20px" }} />
            </button>
          </div>
        )}

        {/* Premium Table with Glass Effect */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden hover:shadow-3xl transition-all duration-500 mt-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gradient-to-br from-slate-50/80 to-slate-100/50">
                  <th className="px-4 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={
                        filteredLogs.length > 0 &&
                        filteredLogs
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .every((log) => selectedIds.includes(log._id))
                      }
                      onChange={handleSelectAll}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <ScheduleIcon style={{ fontSize: "14px" }} />
                      Time
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <PersonIcon style={{ fontSize: "14px" }} />
                      User
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <SettingsIcon style={{ fontSize: "14px" }} />
                      Action
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <PublicIcon style={{ fontSize: "14px" }} />
                      IP Address
                    </div>
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="p-4 bg-slate-100 rounded-full">
                          <InfoIcon
                            className="text-slate-300"
                            style={{ fontSize: "56px" }}
                          />
                        </div>
                        <p className="text-slate-500 font-semibold text-lg">
                          No logs found
                        </p>
                        <p className="text-sm text-slate-400">
                          Try adjusting your filters or search terms
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredLogs
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((log, index) => (
                      <tr
                        key={log._id}
                        className={`hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-transparent transition-all duration-300 group ${
                          index % 2 === 0 ? "bg-white/50" : "bg-slate-50/30"
                        } ${selectedIds.includes(log._id) ? "bg-blue-50/50" : ""}`}
                      >
                        <td className="px-4 py-4">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(log._id)}
                            onChange={() => handleSelect(log._id)}
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-700">
                              {formatDistanceSafe(log.createdAt)}
                            </span>
                            <span className="text-xs text-slate-400 mt-0.5">
                              {formatDateSafe(
                                log.createdAt,
                                "MMM d, yyyy HH:mm",
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/25">
                                {getUserName(log).charAt(0).toUpperCase()}
                              </div>
                              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-slate-800">
                                {getUserName(log)}
                              </span>
                              <span className="text-xs text-slate-500">
                                {getUserEmail(log)}
                              </span>
                              {getUserRole(log) && (
                                <span className="text-xs font-medium text-slate-400 capitalize">
                                  {getUserRole(log)}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border ${getActionBadgeStyle(log.action)} shadow-sm`}
                          >
                            {getActionIcon(log.action)}
                            {log.action.replace("_", " ")}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-0.5 max-w-[240px]">
                            <span className="text-sm text-slate-700 truncate">
                              {log.description}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-slate-400">
                              {getEntityIcon(log.action)}
                              {getEntityType(log.action)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <code className="text-xs font-mono bg-slate-100/80 px-3 py-1.5 rounded-xl text-slate-600 border border-slate-200/50">
                            {log.ipAddress || log.ipv4Address || "N/A"}
                          </code>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleViewDetails(log)}
                              className="inline-flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 hover:shadow-lg shadow-blue-500/25 transition-all duration-300 text-xs font-medium group"
                            >
                              <VisibilityIcon className="group-hover:scale-110 transition-transform duration-300" style={{ fontSize: "16px" }} />
                              View
                            </button>
                            <button
                              onClick={() => handleDeleteSingle(log._id)}
                              className="inline-flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 hover:shadow-lg shadow-red-500/25 transition-all duration-300 text-xs font-medium group"
                            >
                              <DeleteIcon className="group-hover:scale-110 transition-transform duration-300" style={{ fontSize: "16px" }} />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>

          {/* Premium Pagination */}
          {filteredLogs.length > 0 && (
            <div className="px-6 py-4 flex flex-wrap justify-between items-center border-t border-slate-100 gap-3 bg-gradient-to-br from-slate-50/30 to-transparent backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-600 font-medium">Rows per page:</span>
                <select
                  value={rowsPerPage}
                  onChange={handleChangeRowsPerPage}
                  className="px-3 py-2 bg-white/80 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 hover:border-slate-300 cursor-pointer"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-sm text-slate-500">
                  {selectedIds.length} selected
                </span>
              </div>
              <div className="text-sm text-slate-600 font-medium">
                <span className="text-slate-800">{filteredLogs.length}</span> total
                logs
                <span className="mx-2 text-slate-300">|</span>
                <span className="text-slate-800">
                  {page * rowsPerPage + 1}
                </span> -{" "}
                <span className="text-slate-800">
                  {Math.min((page + 1) * rowsPerPage, filteredLogs.length)}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleChangePage(page - 1)}
                  disabled={page === 0}
                  className={`px-5 py-2 border rounded-xl text-sm font-medium transition-all duration-200 ${
                    page === 0
                      ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                      : "bg-white/80 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:shadow-lg"
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => handleChangePage(page + 1)}
                  disabled={
                    page >= Math.ceil(filteredLogs.length / rowsPerPage) - 1
                  }
                  className={`px-5 py-2 border rounded-xl text-sm font-medium transition-all duration-200 ${
                    page >= Math.ceil(filteredLogs.length / rowsPerPage) - 1
                      ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                      : "bg-white/80 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:shadow-lg"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400 font-medium">
            Showing <span className="text-slate-600">{filteredLogs.length}</span> of{" "}
            <span className="text-slate-600">{logs.length}</span> total activities
          </p>
        </div>
      </div>

      {/* Premium Detail Dialog */}
      {detailDialogOpen && selectedLog && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-50 p-4 animate-in fade-in duration-300"
          onClick={() => setDetailDialogOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl shadow-black/25 animate-in slide-in-from-bottom-10 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 px-8 py-5 border-b border-slate-100 flex justify-between items-start gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl text-white shadow-lg shadow-blue-500/25">
                    <InfoIcon style={{ fontSize: "22px" }} />
                  </span>
                  Activity Details
                </h2>
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border mt-2 ${getActionBadgeStyle(selectedLog.action)}`}
                >
                  {getActionIcon(selectedLog.action)}
                  {selectedLog.action.replace("_", " ")}
                </span>
              </div>
              <button
                onClick={() => setDetailDialogOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-2xl transition-colors duration-200 text-slate-400 hover:text-slate-600"
              >
                <CloseIcon style={{ fontSize: "24px" }} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              {/* User Information */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl p-5 border border-slate-200/50 mb-6">
                <h4 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                  <div className="p-1.5 bg-blue-500/10 rounded-lg">
                    <PersonIcon className="text-blue-600" style={{ fontSize: "18px" }} />
                  </div>
                  User Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 font-medium">Name</span>
                    <span className="text-sm font-semibold text-slate-900 mt-1">
                      {getUserName(selectedLog)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 font-medium">Email</span>
                    <span className="text-sm text-slate-700 mt-1">
                      {getUserEmail(selectedLog)}
                    </span>
                  </div>
                  {getUserRole(selectedLog) && (
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500 font-medium">Role</span>
                      <span className="text-sm capitalize font-semibold text-slate-800 mt-1">
                        {getUserRole(selectedLog)}
                      </span>
                    </div>
                  )}
                  {getUserPhone(selectedLog) && (
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500 font-medium">Phone</span>
                      <span className="text-sm text-slate-700 mt-1">
                        {getUserPhone(selectedLog)}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col col-span-full">
                    <span className="text-xs text-slate-500 font-medium">User ID</span>
                    <code className="text-xs font-mono bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 truncate mt-1">
                      {getUserId(selectedLog)}
                    </code>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-medium">Entity Type</span>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="p-1.5 bg-slate-100 rounded-lg">
                      {getEntityIcon(selectedLog.action)}
                    </div>
                    <span className="text-sm font-semibold text-slate-800">
                      {getEntityType(selectedLog.action)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-medium">Action</span>
                  <span className="text-sm font-semibold text-slate-800 mt-1.5">
                    {selectedLog.action.replace("_", " ")}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-5">
                <span className="text-xs text-slate-500 font-medium">Description</span>
                <div className="mt-1.5 p-4 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl border border-slate-200/50">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {selectedLog.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-medium">IP Address</span>
                  <code className="text-sm font-mono bg-white px-3 py-2 rounded-xl border border-slate-200 text-slate-600 mt-1.5">
                    {selectedLog.ipAddress || selectedLog.ipv4Address || "N/A"}
                  </code>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-medium">User Agent</span>
                  <span className="text-xs text-slate-600 mt-1.5 break-all line-clamp-2 bg-white p-3 rounded-xl border border-slate-200">
                    {selectedLog.userAgent || "N/A"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6 pt-6 border-t border-slate-100">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-medium">Created At</span>
                  <span className="text-sm font-semibold text-slate-800 mt-1">
                    {formatDateSafe(selectedLog.createdAt, "PPpp")}
                  </span>
                  <span className="text-xs text-slate-400 mt-0.5">
                    {formatDistanceSafe(selectedLog.createdAt)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-medium">Time Happened</span>
                  <span className="text-sm font-semibold text-slate-800 mt-1">
                    {selectedLog.timeHappened || "N/A"}
                  </span>
                </div>
              </div>

              {selectedLog.updatedAt &&
                selectedLog.updatedAt !== selectedLog.createdAt && (
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <span className="text-xs text-slate-500 font-medium">Updated At</span>
                    <span className="text-sm font-semibold text-slate-800 block mt-1">
                      {formatDateSafe(selectedLog.updatedAt, "PPpp")}
                    </span>
                  </div>
                )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm px-8 py-5 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => handleDeleteSingle(selectedLog._id)}
                className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl hover:from-red-600 hover:to-red-700 hover:shadow-xl shadow-red-500/25 transition-all duration-300 text-sm font-semibold flex items-center gap-2"
              >
                <DeleteIcon style={{ fontSize: "18px" }} />
                Delete
              </button>
              <button
                onClick={() => setDetailDialogOpen(false)}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 hover:shadow-xl shadow-blue-500/25 transition-all duration-300 text-sm font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-50 p-4 animate-in fade-in duration-300"
          onClick={() => {
            if (!deleting) {
              setDeleteConfirmOpen(false);
              setDeleteTarget(null);
            }
          }}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full shadow-2xl shadow-black/25 animate-in slide-in-from-bottom-10 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                  <WarningIcon className="text-red-600" style={{ fontSize: "40px" }} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-center text-slate-800 mb-3">
                {deleteTarget === "bulk" ? "Bulk Delete" : "Delete Activity"}
              </h3>
              <p className="text-center text-slate-600 mb-6">
                {deleteTarget === "bulk"
                  ? `Are you sure you want to delete ${selectedIds.length} selected activity log(s)? This action cannot be undone.`
                  : "Are you sure you want to delete this activity log? This action cannot be undone."}
              </p>
              {deleteTarget === "bulk" && selectedIds.length > 0 && (
                <div className="bg-slate-50 rounded-xl p-4 mb-6 max-h-32 overflow-y-auto">
                  <p className="text-xs text-slate-500 font-medium mb-2">
                    Selected Items ({selectedIds.length}):
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {selectedIds.slice(0, 10).map((id) => (
                      <span
                        key={id}
                        className="text-xs font-mono bg-white px-2 py-1 rounded border border-slate-200 text-slate-600"
                      >
                        {id.slice(0, 8)}...
                      </span>
                    ))}
                    {selectedIds.length > 10 && (
                      <span className="text-xs text-slate-400">
                        +{selectedIds.length - 10} more
                      </span>
                    )}
                  </div>
                </div>
              )}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setDeleteConfirmOpen(false);
                    setDeleteTarget(null);
                  }}
                  disabled={deleting}
                  className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-2xl hover:bg-slate-200 transition-all duration-200 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl hover:from-red-600 hover:to-red-700 hover:shadow-xl shadow-red-500/25 transition-all duration-300 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <DeleteIcon style={{ fontSize: "18px" }} />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success/Error Result Modal */}
      {resultModal.open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-50 p-4 animate-in fade-in duration-300"
          onClick={() => {
            if (!deleting) {
              setResultModal({ ...resultModal, open: false });
            }
          }}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full shadow-2xl shadow-black/25 animate-in slide-in-from-bottom-10 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-center justify-center mb-6">
                <div
                  className={`w-24 h-24 rounded-full flex items-center justify-center ${
                    resultModal.type === "success"
                      ? "bg-emerald-100"
                      : "bg-red-100"
                  }`}
                >
                  {resultModal.type === "success" ? (
                    <CheckCircleIcon
                      className="text-emerald-600"
                      style={{ fontSize: "56px" }}
                    />
                  ) : (
                    <ErrorIcon
                      className="text-red-600"
                      style={{ fontSize: "56px" }}
                    />
                  )}
                </div>
              </div>
              <h3
                className={`text-2xl font-bold text-center mb-3 ${
                  resultModal.type === "success"
                    ? "text-emerald-800"
                    : "text-red-800"
                }`}
              >
                {resultModal.title}
              </h3>
              <p className="text-center text-slate-600 mb-4">
                {resultModal.message}
              </p>
              {resultModal.details && (
                <div className="bg-slate-50 rounded-xl p-4 mb-6 max-h-32 overflow-y-auto">
                  <p className="text-xs text-slate-500 font-medium mb-2">Details:</p>
                  <code className="text-xs font-mono text-slate-700 break-all">
                    {resultModal.details}
                  </code>
                </div>
              )}
              <div className="flex gap-3">
                <button
                  onClick={() => setResultModal({ ...resultModal, open: false })}
                  className={`flex-1 px-6 py-3 text-white rounded-2xl transition-all duration-300 text-sm font-semibold shadow-lg ${
                    resultModal.type === "success"
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-emerald-500/25"
                      : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-red-500/25"
                  }`}
                >
                  {resultModal.type === "success" ? "Done" : "Close"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};