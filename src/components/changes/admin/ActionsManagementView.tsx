// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable react-hooks/immutability */
// import React, { useState, useEffect, useCallback, type JSX } from 'react';
// import { format, parseISO, formatDistanceToNow } from 'date-fns';
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
// } from '@mui/icons-material';

// // Types - Updated to handle both string and object for userId
// interface ActivityLog {
//   _id: string;
//   userId: string | {
//     _id: string;
//     name: string;
//     email: string;
//     phone: string;
//     role: string;
//   };
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
//   dateRange: 'today' | 'week' | 'month' | 'all';
//   searchTerm: string;
// }

// interface Stats {
//   totalActivities: number;
//   uniqueUsers: number;
//   actionsByType: { [key: string]: number };
// }

// // Helper function to safely format dates
// const formatDateSafe = (timestamp: string | undefined | null, formatStr: string): string => {
//   if (!timestamp) return 'N/A';
//   try {
//     return format(parseISO(timestamp), formatStr);
//   } catch {
//     return 'Invalid Date';
//   }
// };

// const formatDistanceSafe = (timestamp: string | undefined | null): string => {
//   if (!timestamp) return 'N/A';
//   try {
//     return formatDistanceToNow(parseISO(timestamp), { addSuffix: true });
//   } catch {
//     return 'Invalid Date';
//   }
// };

// // Type guard to check if userId is an object
// const isUserIdObject = (userId: string | { _id: string; name: string; email: string; phone: string; role: string; }): userId is { _id: string; name: string; email: string; phone: string; role: string; } => {
//   return typeof userId === 'object' && userId !== null && '_id' in userId;
// };

// // Helper functions to safely access user data
// const getUserId = (log: ActivityLog): string => {
//   if (isUserIdObject(log.userId)) return log.userId._id;
//   return log.userId as string;
// };

// const getUserName = (log: ActivityLog): string => {
//   if (log.userName) return log.userName;
//   if (isUserIdObject(log.userId) && log.userId.name) return log.userId.name;
//   return 'Unknown User';
// };

// const getUserEmail = (log: ActivityLog): string => {
//   if (log.userEmail) return log.userEmail;
//   if (isUserIdObject(log.userId) && log.userId.email) return log.userId.email;
//   return '';
// };

// const getUserRole = (log: ActivityLog): string => {
//   if (isUserIdObject(log.userId) && log.userId.role) return log.userId.role;
//   return '';
// };

// const getUserPhone = (log: ActivityLog): string => {
//   if (isUserIdObject(log.userId) && log.userId.phone) return log.userId.phone;
//   return '';
// };

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
//     action: 'all',
//     dateRange: 'all',
//     searchTerm: '',
//   });
//   const [stats, setStats] = useState<Stats>({
//     totalActivities: 0,
//     uniqueUsers: 0,
//     actionsByType: {},
//   });

//   // Fetch logs
//   const fetchLogs = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await fetch('https://rene-inyumba-nodejs.onrender.com/auth/activities', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch activities: ${response.statusText}`);
//       }

//       const data = await response.json();

//       let activities: ActivityLog[] = [];

//       // Handle the API response structure - it has { success, count, activities: [...] }
//       if (data.activities && Array.isArray(data.activities)) {
//         activities = data.activities;
//       } else if (Array.isArray(data)) {
//         activities = data;
//       } else if (data.data && Array.isArray(data.data)) {
//         activities = data.data;
//       } else {
//         console.warn('Unexpected API response structure:', data);
//         activities = [];
//       }

//       setLogs(activities);
//       calculateStats(activities);
//       applyFilters(activities, filters);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An error occurred while fetching logs');
//       console.error('Error fetching logs:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, [filters]);

//   // Calculate statistics
//   const calculateStats = (logsData: ActivityLog[]) => {
//     const uniqueUsers = new Set(logsData.map(log => getUserEmail(log) || getUserId(log))).size;

//     const actionsByType: { [key: string]: number } = {};

//     logsData.forEach(log => {
//       actionsByType[log.action] = (actionsByType[log.action] || 0) + 1;
//     });

//     setStats({
//       totalActivities: logsData.length,
//       uniqueUsers,
//       actionsByType,
//     });
//   };

//   // Apply filters
//   const applyFilters = (logsData: ActivityLog[], currentFilters: FilterOptions) => {
//     let filtered = [...logsData];

//     if (currentFilters.action !== 'all') {
//       filtered = filtered.filter(log => log.action === currentFilters.action);
//     }

//     const now = new Date();
//     if (currentFilters.dateRange === 'today') {
//       const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//       filtered = filtered.filter(log => {
//         if (!log.createdAt) return false;
//         try {
//           return new Date(parseISO(log.createdAt)) >= today;
//         } catch {
//           return false;
//         }
//       });
//     } else if (currentFilters.dateRange === 'week') {
//       const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
//       filtered = filtered.filter(log => {
//         if (!log.createdAt) return false;
//         try {
//           return new Date(parseISO(log.createdAt)) >= weekAgo;
//         } catch {
//           return false;
//         }
//       });
//     } else if (currentFilters.dateRange === 'month') {
//       const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
//       filtered = filtered.filter(log => {
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
//       filtered = filtered.filter(log => {
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
//     handleFilterChange('searchTerm', event.target.value);
//   };

//   // Clear filters
//   const clearFilters = () => {
//     const defaultFilters: FilterOptions = {
//       action: 'all',
//       dateRange: 'all',
//       searchTerm: '',
//     };
//     setFilters(defaultFilters);
//     applyFilters(logs, defaultFilters);
//   };

//   // Handle pagination
//   const handleChangePage = (newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // View log details
//   const handleViewDetails = (log: ActivityLog) => {
//     setSelectedLog(log);
//     setDetailDialogOpen(true);
//   };

//   // Get action icon
//   const getActionIcon = (action: string) => {
//     const iconMap: { [key: string]: JSX.Element } = {
//       'user_login': <LoginIcon className="text-blue-600" style={{ fontSize: '20px' }} />,
//       'user_created': <PersonAddIcon className="text-green-600" style={{ fontSize: '20px' }} />,
//       'user_updated': <SettingsIcon className="text-orange-500" style={{ fontSize: '20px' }} />,
//       'user_deleted': <ClearIcon className="text-red-600" style={{ fontSize: '20px' }} />,
//       'house_created': <HomeIcon className="text-green-600" style={{ fontSize: '20px' }} />,
//       'house_updated': <SettingsIcon className="text-orange-500" style={{ fontSize: '20px' }} />,
//       'house_deleted': <ClearIcon className="text-red-600" style={{ fontSize: '20px' }} />,
//       'booking_created': <BookOnlineIcon className="text-blue-600" style={{ fontSize: '20px' }} />,
//       'booking_updated': <SettingsIcon className="text-orange-500" style={{ fontSize: '20px' }} />,
//       'booking_deleted': <ClearIcon className="text-red-600" style={{ fontSize: '20px' }} />,
//       'contact_created': <ContactMailIcon className="text-purple-600" style={{ fontSize: '20px' }} />,
//       'message_created': <MessageIcon className="text-blue-600" style={{ fontSize: '20px' }} />,
//       'testimonial_created': <RateReviewIcon className="text-green-600" style={{ fontSize: '20px' }} />,
//     };
//     return iconMap[action] || <InfoIcon className="text-gray-600" style={{ fontSize: '20px' }} />;
//   };

//   // Get action color
//   const getActionColor = (action: string): string => {
//     const colorMap: { [key: string]: string } = {
//       'user_login': 'bg-blue-100 text-blue-800 border-blue-300',
//       'user_created': 'bg-green-100 text-green-800 border-green-300',
//       'user_updated': 'bg-orange-100 text-orange-800 border-orange-300',
//       'user_deleted': 'bg-red-100 text-red-800 border-red-300',
//       'house_created': 'bg-green-100 text-green-800 border-green-300',
//       'house_updated': 'bg-orange-100 text-orange-800 border-orange-300',
//       'house_deleted': 'bg-red-100 text-red-800 border-red-300',
//       'booking_created': 'bg-blue-100 text-blue-800 border-blue-300',
//       'booking_updated': 'bg-orange-100 text-orange-800 border-orange-300',
//       'booking_deleted': 'bg-red-100 text-red-800 border-red-300',
//       'contact_created': 'bg-purple-100 text-purple-800 border-purple-300',
//       'message_created': 'bg-blue-100 text-blue-800 border-blue-300',
//       'testimonial_created': 'bg-green-100 text-green-800 border-green-300',
//     };
//     return colorMap[action] || 'bg-gray-100 text-gray-800 border-gray-300';
//   };

//   // Get entity type icon
//   const getEntityIcon = (action: string) => {
//     if (action.includes('user')) return <PersonIcon className="text-gray-600" style={{ fontSize: '18px' }} />;
//     if (action.includes('house')) return <HomeIcon className="text-gray-600" style={{ fontSize: '18px' }} />;
//     if (action.includes('booking')) return <BookOnlineIcon className="text-gray-600" style={{ fontSize: '18px' }} />;
//     if (action.includes('contact')) return <ContactMailIcon className="text-gray-600" style={{ fontSize: '18px' }} />;
//     if (action.includes('message')) return <MessageIcon className="text-gray-600" style={{ fontSize: '18px' }} />;
//     if (action.includes('testimonial')) return <RateReviewIcon className="text-gray-600" style={{ fontSize: '18px' }} />;
//     return <InfoIcon className="text-gray-600" style={{ fontSize: '18px' }} />;
//   };

//   // Get entity type from action
//   const getEntityType = (action: string): string => {
//     if (action.includes('user')) return 'User';
//     if (action.includes('house')) return 'House';
//     if (action.includes('booking')) return 'Booking';
//     if (action.includes('contact')) return 'Contact';
//     if (action.includes('message')) return 'Message';
//     if (action.includes('testimonial')) return 'Testimonial';
//     return action;
//   };

//   useEffect(() => {
//     fetchLogs();
//   }, [fetchLogs]);

//   // Loading state
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
//       </div>
//     );
//   }

//   // Get unique action types for filters
//   const actionTypes = Array.from(new Set(logs.map(log => log.action)));

//   return (
//     <div className="p-6 font-sans">
//       {/* Header */}
//       <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-2xl font-bold m-0">Activity Logs</h1>
//           <div className="flex gap-2">
//             <button
//               onClick={fetchLogs}
//               className="p-2 bg-transparent border-none cursor-pointer rounded hover:bg-gray-100 text-blue-700 transition-colors"
//             >
//               <RefreshIcon />
//             </button>
//             <button
//               className="p-2 bg-transparent border-none cursor-pointer rounded hover:bg-gray-100 text-blue-700 transition-colors"
//             >
//               <DownloadIcon />
//             </button>
//           </div>
//         </div>
//         <hr className="my-4 border-gray-200" />

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//           <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
//             <div className="text-gray-600 text-sm">Total Activities</div>
//             <div className="text-3xl font-bold mt-1">{stats.totalActivities}</div>
//           </div>
//           <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
//             <div className="text-gray-600 text-sm">Unique Users</div>
//             <div className="text-3xl font-bold mt-1">{stats.uniqueUsers}</div>
//           </div>
//           <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
//             <div className="text-gray-600 text-sm">Most Active Action</div>
//             <div className="text-xl font-bold mt-1">
//               {Object.entries(stats.actionsByType).sort((a, b) => b[1] - a[1])[0]?.[0]?.replace('_', ' ') || 'N/A'}
//             </div>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="flex flex-wrap gap-4 items-center mt-4">
//           <div className="relative flex-1 min-w-[200px]">
//             <input
//               type="text"
//               placeholder="Search logs by user, action, IP, description..."
//               value={filters.searchTerm}
//               onChange={handleSearch}
//               className="w-full px-3 py-2 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//             <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" style={{ fontSize: '20px' }} />
//           </div>

//           <select
//             value={filters.action}
//             onChange={(e) => handleFilterChange('action', e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-w-[150px]"
//           >
//             <option value="all">All Actions</option>
//             {actionTypes.map(action => (
//               <option key={action} value={action}>{action.replace('_', ' ')}</option>
//             ))}
//           </select>

//           <select
//             value={filters.dateRange}
//             onChange={(e) => handleFilterChange('dateRange', e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-w-[150px]"
//           >
//             <option value="all">All Time</option>
//             <option value="today">Today</option>
//             <option value="week">This Week</option>
//             <option value="month">This Month</option>
//           </select>

//           <button
//             onClick={clearFilters}
//             className="px-4 py-2 border border-gray-300 rounded bg-white hover:bg-gray-50 cursor-pointer flex items-center gap-1 text-sm transition-colors"
//           >
//             <ClearIcon style={{ fontSize: '18px' }} />
//             Clear
//           </button>
//         </div>
//       </div>

//       {/* Error message */}
//       {error && (
//         <div className="p-3 px-4 bg-red-50 text-red-700 rounded mb-4 border border-red-200">
//           {error}
//         </div>
//       )}

//       {/* Logs Table */}
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse text-sm">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-4 py-3 text-left border-b-2 border-gray-200 font-semibold text-gray-700">Time</th>
//                 <th className="px-4 py-3 text-left border-b-2 border-gray-200 font-semibold text-gray-700">User</th>
//                 <th className="px-4 py-3 text-left border-b-2 border-gray-200 font-semibold text-gray-700">Action</th>
//                 <th className="px-4 py-3 text-left border-b-2 border-gray-200 font-semibold text-gray-700">Description</th>
//                 <th className="px-4 py-3 text-left border-b-2 border-gray-200 font-semibold text-gray-700">IP Address</th>
//                 <th className="px-4 py-3 text-right border-b-2 border-gray-200 font-semibold text-gray-700">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredLogs.length === 0 ? (
//                 <tr>
//                   <td colSpan={6} className="py-10 text-center text-gray-600">
//                     No logs found matching the current filters
//                   </td>
//                 </tr>
//               ) : (
//                 filteredLogs
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((log) => (
//                     <tr key={log._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
//                       <td className="px-4 py-3">
//                         <div>
//                           <span className="text-sm">{formatDistanceSafe(log.createdAt)}</span>
//                           <div className="text-xs text-gray-500">{log.timeHappened || formatDateSafe(log.createdAt, 'PPpp')}</div>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="flex items-center gap-2">
//                           <PersonIcon className="text-gray-500" style={{ fontSize: '16px' }} />
//                           <div>
//                             <div className="font-medium">{getUserName(log)}</div>
//                             <div className="text-xs text-gray-500">{getUserEmail(log)}</div>
//                             {getUserRole(log) && (
//                               <div className="text-xs text-gray-400 capitalize">{getUserRole(log)}</div>
//                             )}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="flex items-center gap-2">
//                           {getActionIcon(log.action)}
//                           <span className={`px-2 py-0.5 rounded-full text-xs border ${getActionColor(log.action)}`}>
//                             {log.action.replace('_', ' ')}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="max-w-[250px]">
//                           <div className="text-sm text-gray-700">{log.description}</div>
//                           <div className="flex items-center gap-1 mt-0.5">
//                             {getEntityIcon(log.action)}
//                             <span className="text-xs text-gray-500">{getEntityType(log.action)}</span>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="text-sm font-mono">{log.ipAddress || log.ipv4Address || 'N/A'}</div>
//                       </td>
//                       <td className="px-4 py-3 text-right">
//                         <button
//                           onClick={() => handleViewDetails(log)}
//                           className="p-1 bg-transparent border-none cursor-pointer text-blue-600 rounded hover:bg-blue-50 transition-colors"
//                           title="View Details"
//                         >
//                           <VisibilityIcon style={{ fontSize: '20px' }} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="p-4 flex flex-wrap justify-between items-center border-t border-gray-200 gap-2">
//           <div className="flex items-center gap-2">
//             <span className="text-sm text-gray-600">Rows per page:</span>
//             <select
//               value={rowsPerPage}
//               onChange={handleChangeRowsPerPage}
//               className="px-2 py-1 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={25}>25</option>
//               <option value={50}>50</option>
//             </select>
//           </div>
//           <div className="text-sm text-gray-600">
//             {filteredLogs.length > 0 ? `${page * rowsPerPage + 1} - ${Math.min((page + 1) * rowsPerPage, filteredLogs.length)} of ${filteredLogs.length}` : '0 of 0'}
//           </div>
//           <div className="flex gap-1">
//             <button
//               onClick={() => handleChangePage(page - 1)}
//               disabled={page === 0}
//               className={`px-3 py-1 border border-gray-300 rounded bg-white ${
//                 page === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'
//               } transition-colors`}
//             >
//               Previous
//             </button>
//             <button
//               onClick={() => handleChangePage(page + 1)}
//               disabled={page >= Math.ceil(filteredLogs.length / rowsPerPage) - 1}
//               className={`px-3 py-1 border border-gray-300 rounded bg-white ${
//                 page >= Math.ceil(filteredLogs.length / rowsPerPage) - 1
//                   ? 'opacity-50 cursor-not-allowed'
//                   : 'hover:bg-gray-50 cursor-pointer'
//               } transition-colors`}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Detail Dialog */}
//       {detailDialogOpen && selectedLog && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//           <div className="bg-white rounded-lg max-w-[700px] w-full max-h-[90vh] overflow-auto shadow-xl">
//             <div className="p-5 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
//               <h2 className="text-xl font-bold m-0">Activity Details</h2>
//               <span className={`px-3 py-0.5 rounded-full text-xs border ${getActionColor(selectedLog.action)}`}>
//                 {selectedLog.action.replace('_', ' ')}
//               </span>
//             </div>

//             <div className="p-6">
//               <div className="mb-4">
//                 <div className="text-sm text-gray-600 mb-1">User Information</div>
//                 <div className="text-base font-medium">{getUserName(selectedLog)}</div>
//                 <div className="text-sm text-gray-600">{getUserEmail(selectedLog)}</div>
//                 {getUserRole(selectedLog) && (
//                   <div className="text-sm text-gray-500 capitalize">Role: {getUserRole(selectedLog)}</div>
//                 )}
//                 {getUserPhone(selectedLog) && (
//                   <div className="text-sm text-gray-500">Phone: {getUserPhone(selectedLog)}</div>
//                 )}
//                 <div className="text-xs text-gray-500">User ID: {getUserId(selectedLog)}</div>
//               </div>

//               <hr className="my-4 border-gray-200" />

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <div className="text-sm text-gray-600 mb-1">Action</div>
//                   <div className="flex items-center gap-2">
//                     {getActionIcon(selectedLog.action)}
//                     <span className="text-sm">{selectedLog.action.replace('_', ' ')}</span>
//                   </div>
//                 </div>
//                 <div>
//                   <div className="text-sm text-gray-600 mb-1">Entity Type</div>
//                   <div className="flex items-center gap-2">
//                     {getEntityIcon(selectedLog.action)}
//                     <span className="text-sm">{getEntityType(selectedLog.action)}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <div className="text-sm text-gray-600 mb-1">Description</div>
//                 <div className="p-3 bg-gray-50 rounded border border-gray-200">
//                   <div className="text-sm">{selectedLog.description}</div>
//                 </div>
//               </div>

//               <hr className="my-4 border-gray-200" />

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <div className="text-sm text-gray-600 mb-1">IP Address</div>
//                   <div className="text-sm font-mono">{selectedLog.ipAddress || selectedLog.ipv4Address || 'N/A'}</div>
//                 </div>
//                 <div>
//                   <div className="text-sm text-gray-600 mb-1">User Agent</div>
//                   <div className="text-xs break-all">{selectedLog.userAgent || 'N/A'}</div>
//                 </div>
//               </div>

//               <hr className="my-4 border-gray-200" />

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <div className="text-sm text-gray-600 mb-1">Created At</div>
//                   <div className="text-sm">{formatDateSafe(selectedLog.createdAt, 'PPpp')}</div>
//                   <div className="text-xs text-gray-500">{formatDistanceSafe(selectedLog.createdAt)}</div>
//                 </div>
//                 <div>
//                   <div className="text-sm text-gray-600 mb-1">Time Happened</div>
//                   <div className="text-sm">{selectedLog.timeHappened || 'N/A'}</div>
//                 </div>
//               </div>

//               {selectedLog.updatedAt && selectedLog.updatedAt !== selectedLog.createdAt && (
//                 <>
//                   <hr className="my-4 border-gray-200" />
//                   <div>
//                     <div className="text-sm text-gray-600 mb-1">Updated At</div>
//                     <div className="text-sm">{formatDateSafe(selectedLog.updatedAt, 'PPpp')}</div>
//                   </div>
//                 </>
//               )}
//             </div>

//             <div className="p-3 px-6 border-t border-gray-200 flex justify-end sticky bottom-0 bg-white">
//               <button
//                 onClick={() => setDetailDialogOpen(false)}
//                 className="px-6 py-2 bg-blue-600 text-white border-none rounded cursor-pointer text-sm hover:bg-blue-700 transition-colors"
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
} from "@mui/icons-material";

// Types - Updated to handle both string and object for userId
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

export const ActionsManagement: React.FC = () => {
  // State
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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

  // Fetch logs
  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://rene-inyumba-nodejs.onrender.com/auth/activities",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch activities: ${response.statusText}`);
      }

      const data = await response.json();

      let activities: ActivityLog[] = [];

      if (data.activities && Array.isArray(data.activities)) {
        activities = data.activities;
      } else if (Array.isArray(data)) {
        activities = data;
      } else if (data.data && Array.isArray(data.data)) {
        activities = data.data;
      } else {
        console.warn("Unexpected API response structure:", data);
        activities = [];
      }

      setLogs(activities);
      calculateStats(activities);
      applyFilters(activities, filters);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching logs",
      );
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

  // Get action color

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

  // Loading state with skeleton
  if (loading) {
    return (
      <div className="p-6 font-sans bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            {/* Header Skeleton */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <div className="h-8 w-48 bg-gray-200 rounded"></div>
                <div className="flex gap-2">
                  <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                  <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="p-4 bg-gray-50 rounded-xl border border-gray-100"
                  >
                    <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                    <div className="h-8 w-16 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="h-10 flex-1 min-w-[200px] bg-gray-200 rounded"></div>
                <div className="h-10 w-40 bg-gray-200 rounded"></div>
                <div className="h-10 w-40 bg-gray-200 rounded"></div>
                <div className="h-10 w-24 bg-gray-200 rounded"></div>
              </div>
            </div>
            {/* Table Skeleton */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 py-3 border-b border-gray-100"
                  >
                    <div className="h-10 w-32 bg-gray-200 rounded"></div>
                    <div className="h-10 w-40 bg-gray-200 rounded"></div>
                    <div className="h-10 w-24 bg-gray-200 rounded"></div>
                    <div className="h-10 flex-1 bg-gray-200 rounded"></div>
                    <div className="h-10 w-20 bg-gray-200 rounded"></div>
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
    <div className="p-4 sm:p-6 font-sans bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 hover:shadow-md transition-shadow duration-300">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <DashboardIcon
                  className="text-blue-600"
                  style={{ fontSize: "28px" }}
                />
                Activity Logs
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Monitor and track all user activities across the platform
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={fetchLogs}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm font-medium cursor-pointer"
              >
                <RefreshIcon style={{ fontSize: "18px" }} />
                Refresh
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white border-none rounded-xl hover:bg-blue-700 transition-all duration-200 text-sm font-medium cursor-pointer shadow-sm hover:shadow-md">
                <DownloadIcon style={{ fontSize: "18px" }} />
                Export
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 rounded-xl border border-blue-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-blue-700 font-medium">
                    Total Activities
                  </div>
                  <div className="text-3xl font-bold text-blue-900 mt-1">
                    {stats.totalActivities.toLocaleString()}
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-200/50 rounded-xl flex items-center justify-center">
                  <EventNoteIcon
                    className="text-blue-700"
                    style={{ fontSize: "24px" }}
                  />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-blue-600">Last 30 days</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-4 rounded-xl border border-emerald-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-emerald-700 font-medium">
                    Unique Users
                  </div>
                  <div className="text-3xl font-bold text-emerald-900 mt-1">
                    {stats.uniqueUsers.toLocaleString()}
                  </div>
                </div>
                <div className="w-12 h-12 bg-emerald-200/50 rounded-xl flex items-center justify-center">
                  <PeopleIcon
                    className="text-emerald-700"
                    style={{ fontSize: "24px" }}
                  />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-emerald-600">Active users</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-4 rounded-xl border border-purple-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-purple-700 font-medium">
                    Most Active
                  </div>
                  <div className="text-lg font-bold text-purple-900 mt-1 truncate max-w-[140px]">
                    {Object.entries(stats.actionsByType)
                      .sort((a, b) => b[1] - a[1])[0]?.[0]
                      ?.replace("_", " ") || "N/A"}
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-200/50 rounded-xl flex items-center justify-center">
                  <TrendingUpIcon
                    className="text-purple-700"
                    style={{ fontSize: "24px" }}
                  />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-purple-600">
                  {Object.entries(stats.actionsByType).sort(
                    (a, b) => b[1] - a[1],
                  )[0]?.[1] || 0}{" "}
                  occurrences
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 p-4 rounded-xl border border-amber-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-amber-700 font-medium">
                    Action Types
                  </div>
                  <div className="text-3xl font-bold text-amber-900 mt-1">
                    {Object.keys(stats.actionsByType).length}
                  </div>
                </div>
                <div className="w-12 h-12 bg-amber-200/50 rounded-xl flex items-center justify-center">
                  <FilterListIcon
                    className="text-amber-700"
                    style={{ fontSize: "24px" }}
                  />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-amber-600">
                  Different action types
                </span>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-start sm:items-center">
            <div className="relative flex-1 min-w-[200px] w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search logs by user, action, IP, description..."
                value={filters.searchTerm}
                onChange={handleSearch}
                className="w-full px-4 py-2.5 pl-11 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              />
              <SearchIcon
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                style={{ fontSize: "20px" }}
              />
            </div>

            <select
              value={filters.action}
              onChange={(e) => handleFilterChange("action", e.target.value)}
              className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm min-w-[150px] transition-all duration-200"
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
              className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm min-w-[150px] transition-all duration-200"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>

            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 text-sm text-gray-700 cursor-pointer"
            >
              <ClearIcon style={{ fontSize: "18px" }} />
              Clear
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-4 px-6 bg-red-50 text-red-700 rounded-xl mb-4 border border-red-200 flex items-center gap-3">
            <InfoIcon className="text-red-500" style={{ fontSize: "20px" }} />
            <span>{error}</span>
          </div>
        )}

        {/* Logs Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    IP Address
                  </th>
                  <th className="px-4 py-3.5 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <InfoIcon
                          className="text-gray-300"
                          style={{ fontSize: "48px" }}
                        />
                        <p className="text-gray-500 font-medium">
                          No logs found
                        </p>
                        <p className="text-sm text-gray-400">
                          Try adjusting your filters or search terms
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredLogs
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((log) => (
                      <tr
                        key={log._id}
                        className="hover:bg-gray-50/50 transition-colors duration-150"
                      >
                        <td className="px-4 py-3.5">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-700">
                              {formatDistanceSafe(log.createdAt)}
                            </span>
                            <span className="text-xs text-gray-400">
                              {formatDateSafe(
                                log.createdAt,
                                "MMM d, yyyy HH:mm",
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 font-semibold text-xs">
                              {getUserName(log).charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-800">
                                {getUserName(log)}
                              </span>
                              <span className="text-xs text-gray-500">
                                {getUserEmail(log)}
                              </span>
                              {getUserRole(log) && (
                                <span className="text-xs text-gray-400 capitalize">
                                  {getUserRole(log)}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${getActionBadgeStyle(log.action)}`}
                          >
                            {getActionIcon(log.action)}
                            {log.action.replace("_", " ")}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex flex-col gap-0.5 max-w-[220px]">
                            <span className="text-sm text-gray-700 truncate">
                              {log.description}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                              {getEntityIcon(log.action)}
                              {getEntityType(log.action)}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">
                            {log.ipAddress || log.ipv4Address || "N/A"}
                          </code>
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <button
                            onClick={() => handleViewDetails(log)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 text-sm font-medium cursor-pointer"
                          >
                            <VisibilityIcon style={{ fontSize: "16px" }} />
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredLogs.length > 0 && (
            <div className="px-4 py-3.5 flex flex-wrap justify-between items-center border-t border-gray-100 gap-3 bg-gray-50/50">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Rows per page:</span>
                <select
                  value={rowsPerPage}
                  onChange={handleChangeRowsPerPage}
                  className="px-2 py-1.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">{filteredLogs.length}</span> total
                logs
                <span className="mx-2 text-gray-300">|</span>
                <span className="font-medium">
                  {page * rowsPerPage + 1}
                </span> -{" "}
                <span className="font-medium">
                  {Math.min((page + 1) * rowsPerPage, filteredLogs.length)}
                </span>
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={() => handleChangePage(page - 1)}
                  disabled={page === 0}
                  className={`px-4 py-1.5 border rounded-lg text-sm transition-all duration-200 ${
                    page === 0
                      ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 cursor-pointer"
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => handleChangePage(page + 1)}
                  disabled={
                    page >= Math.ceil(filteredLogs.length / rowsPerPage) - 1
                  }
                  className={`px-4 py-1.5 border rounded-lg text-sm transition-all duration-200 ${
                    page >= Math.ceil(filteredLogs.length / rowsPerPage) - 1
                      ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 cursor-pointer"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Dialog - Modern Modal */}
      {detailDialogOpen && selectedLog && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          onClick={() => setDetailDialogOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 px-6 py-4 border-b border-gray-100 flex justify-between items-start gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <InfoIcon
                    className="text-blue-600"
                    style={{ fontSize: "24px" }}
                  />
                  Activity Details
                </h2>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border mt-1.5 ${getActionBadgeStyle(selectedLog.action)}`}
                >
                  {getActionIcon(selectedLog.action)}
                  {selectedLog.action.replace("_", " ")}
                </span>
              </div>
              <button
                onClick={() => setDetailDialogOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200 text-gray-500 hover:text-gray-700"
              >
                <CloseIcon style={{ fontSize: "20px" }} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* User Information */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-4 border border-gray-200 mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <PersonIcon style={{ fontSize: "18px" }} />
                  User Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Name</span>
                    <span className="text-sm font-medium text-gray-900">
                      {getUserName(selectedLog)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Email</span>
                    <span className="text-sm text-gray-700">
                      {getUserEmail(selectedLog)}
                    </span>
                  </div>
                  {getUserRole(selectedLog) && (
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Role</span>
                      <span className="text-sm capitalize">
                        {getUserRole(selectedLog)}
                      </span>
                    </div>
                  )}
                  {getUserPhone(selectedLog) && (
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Phone</span>
                      <span className="text-sm">
                        {getUserPhone(selectedLog)}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col col-span-full">
                    <span className="text-xs text-gray-500">User ID</span>
                    <code className="text-xs font-mono bg-white px-2 py-1 rounded border border-gray-200 text-gray-600 truncate">
                      {getUserId(selectedLog)}
                    </code>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-medium">
                    Entity Type
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    {getEntityIcon(selectedLog.action)}
                    <span className="text-sm font-medium">
                      {getEntityType(selectedLog.action)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-medium">
                    Action
                  </span>
                  <span className="text-sm mt-1">
                    {selectedLog.action.replace("_", " ")}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <span className="text-xs text-gray-500 font-medium">
                  Description
                </span>
                <div className="mt-1.5 p-3 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200">
                  <p className="text-sm text-gray-700">
                    {selectedLog.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-medium">
                    IP Address
                  </span>
                  <code className="text-sm font-mono bg-white px-2 py-1 rounded border border-gray-200 text-gray-600 mt-1">
                    {selectedLog.ipAddress || selectedLog.ipv4Address || "N/A"}
                  </code>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-medium">
                    User Agent
                  </span>
                  <span className="text-xs text-gray-600 mt-1 break-all line-clamp-2">
                    {selectedLog.userAgent || "N/A"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-medium">
                    Created At
                  </span>
                  <span className="text-sm font-medium mt-1">
                    {formatDateSafe(selectedLog.createdAt, "PPpp")}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatDistanceSafe(selectedLog.createdAt)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-medium">
                    Time Happened
                  </span>
                  <span className="text-sm mt-1">
                    {selectedLog.timeHappened || "N/A"}
                  </span>
                </div>
              </div>

              {selectedLog.updatedAt &&
                selectedLog.updatedAt !== selectedLog.createdAt && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500 font-medium">
                      Updated At
                    </span>
                    <span className="text-sm block mt-1">
                      {formatDateSafe(selectedLog.updatedAt, "PPpp")}
                    </span>
                  </div>
                )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm px-6 py-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setDetailDialogOpen(false)}
                className="px-6 py-2.5 bg-blue-600 text-white border-none rounded-xl hover:bg-blue-700 transition-all duration-200 text-sm font-medium cursor-pointer shadow-sm hover:shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
