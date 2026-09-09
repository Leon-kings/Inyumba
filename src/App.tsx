// /* eslint-disable no-useless-assignment */
// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState, useEffect, useRef, useCallback } from "react";
// import {
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
//   useNavigate,
// } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Material Icons
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import LogoutIcon from "@mui/icons-material/Logout";
// import PersonIcon from "@mui/icons-material/Person";
// import PeopleIcon from "@mui/icons-material/People";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import HomeIcon from "@mui/icons-material/Home";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import EmailIcon from "@mui/icons-material/Email";
// import HouseIcon from "@mui/icons-material/House";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import StarIcon from "@mui/icons-material/Star";
// import ContactMailIcon from "@mui/icons-material/ContactMail";
// import HistoryIcon from "@mui/icons-material/History";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import WarningIcon from "@mui/icons-material/Warning";
// import CancelIcon from "@mui/icons-material/Cancel";
// import BookmarkIcon from "@mui/icons-material/Bookmark";
// import RefreshIcon from "@mui/icons-material/Refresh";
// import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
// import {
//   HouseRounded,
//   Info,
//   LoginSharp,
//   People,
//   TextSnippet,
// } from "@mui/icons-material";

// // Components
// import { Dashboard } from "./components/dashboard/admin/Dashboard";
// import { Home } from "./pages/home/Home";
// import { About } from "./pages/about/About";
// import { Services } from "./pages/services/Services";
// import { NotFound } from "./pages/notfound/NotFound";
// import { FAQ } from "./components/faq/FAQ";
// import { Help } from "./components/faq/Help";
// import { Navbar } from "./components/navbar/Navbar";
// import { Footer } from "./components/footer/Footer";
// import { UserManagement } from "./components/dashboard/admin/components/users/UserManagement";
// import { RequestManagement } from "./components/dashboard/admin/components/request/RequestManagement";
// import { MessageManagement } from "./components/dashboard/admin/components/messages/MessageManagement";
// import { BookingManagement } from "./components/dashboard/admin/components/bookings/BookingManagement";
// import { UserDashboard } from "./components/dashboard/users/UserDashboard";
// import { HostDashboard } from "./components/dashboard/host/HostDashboard";
// import { MeManagement } from "./components/dashboard/users/components/me/MeManagement";
// import { UserBookingManagement } from "./components/dashboard/users/components/bookings/UserBookingManagement";
// import { UserRequestManagement } from "./components/dashboard/users/components/request/UserRequestManagement";
// import { UserMessageManagement } from "./components/dashboard/users/components/messages/UserMessageManagement";
// import { HostBookingManagement } from "./components/dashboard/host/components/bookings/HostBookingManagement";
// import { HostRequestManagement } from "./components/dashboard/host/components/requests/HostRequestManagement";
// import { HostMessageManagement } from "./components/dashboard/host/components/messages/HostMessageManagement";
// import { HostManagement } from "./components/dashboard/host/components/host/HostManagement";
// import { HouseOnRent } from "./pages/houses/HouseOnRent";
// import { Testimonials } from "./pages/testimonials/Testimonials";
// import { TeamMemberManagement } from "./components/dashboard/admin/components/team/TeamManagemnt";
// import axios from "axios";
// import { TestimonialManagement } from "./components/dashboard/admin/components/testimonials/TestimonialManagement";
// import { VerificationPage } from "./components/verify/Verification";
// import { HouseManagement } from "./components/dashboard/admin/components/house/HouseManagement";
// import { ManagersDashboard } from "./components/dashboard/managers/ManagerDashboard";
// import { ManagerUserManagement } from "./components/dashboard/managers/components/users/ManagerUserManagement";
// import { ManagerBookingManagement } from "./components/dashboard/managers/components/bookings/ManagerBookingManagement";
// import { ManagerHouseManagement } from "./components/dashboard/managers/components/houses/ManagerHouseManagement";
// import { ManagerMessageManagement } from "./components/dashboard/managers/components/messages/ManagerMessagesManagement";
// import { ManagerTestimonialManagement } from "./components/dashboard/managers/components/testimonials/ManagerTestimonialManagement";
// import { ManagerRequestManagement } from "./components/dashboard/managers/components/request/ManagerRequestManagement";
// import { ActivitiesManagement } from "./components/changes/manager/ActivitiesManagement";
// import { ActionsManagement } from "./components/changes/admin/ActionsManagementView";
// import { HostClientManagement } from "./components/dashboard/host/components/client/HostClientManagement";
// import { QuestionManagement } from "./components/dashboard/admin/components/question/QuestionManagement";
// import { ResetPassword } from "./components/verify/ResetPassword";

// // Types
// interface UserData {
//   id: number;
//   name: string;
//   email: string;
//   role: "admin" | "user" | "host" | "manager";
// }

// // Unified Notification
// interface Notification {
//   id: string;
//   title: string;
//   message: string;
//   type: "info" | "success" | "warning" | "error";
//   read: boolean;
//   createdAt: string;
//   source:
//     | "house"
//     | "booking"
//     | "contact"
//     | "request"
//     | "user"
//     | "activity"
//     | "testimonial"
//     | "question";
//   data?: any;
//   groupKey?: string;
//   duplicateCount?: number;
//   allIds?: string[]; // ALL duplicate IDs for this notification group
// }

// // API endpoints
// const API_BASE_URL = "https://inyumbaproject.eu1.hubfly.app";

// // ============================================================
// // NOTIFICATION API ENDPOINTS
// // ============================================================
// const API_ENDPOINTS = {
//   notifications: `${API_BASE_URL}/auth/notifications`,
//   notificationsByEmail: (email: string) =>
//     `${API_BASE_URL}/auth/notifications/email/${email}`,
//   notificationRead: (id: string) =>
//     `${API_BASE_URL}/auth/notifications/${id}/read`,
//   notificationBulkRead: `${API_BASE_URL}/auth/notifications/bulk-read`,
//   notificationDelete: (id: string) =>
//     `${API_BASE_URL}/auth/notifications/${id}`,
//   notificationBulkDelete: `${API_BASE_URL}/auth/notifications/bulk`,
//   activityDelete: (id: string) => `${API_BASE_URL}/auth/notifications/${id}`,
//   bookingNotifications: `${API_BASE_URL}/bookings/notifications`,
//   bookingNotificationsByEmail: (email: string) =>
//     `${API_BASE_URL}/bookings/notifications/email/${email}`,
//   bookingNotificationRead: (id: string) =>
//     `${API_BASE_URL}/bookings/notifications/${id}/read`,
//   bookingNotificationMarkAllRead: `${API_BASE_URL}/bookings/notifications/mark-all-read`,
//   bookingNotificationDelete: (id: string) =>
//     `${API_BASE_URL}/bookings/notifications/${id}`,
//   contactNotifications: `${API_BASE_URL}/contact/notifications`,
//   contactNotificationsByEmail: (email: string) =>
//     `${API_BASE_URL}/contact/notifications/${email}`,
//   contactNotificationRead: (id: string) =>
//     `${API_BASE_URL}/contact/notifications/${id}/read`,
//   contactNotificationMarkAllRead: `${API_BASE_URL}/contact/notifications/mark-all-read`,
//   contactNotificationDelete: (id: string) =>
//     `${API_BASE_URL}/contact/notifications/${id}`,
//   houseNotifications: `${API_BASE_URL}/houses/notifications`,
//   houseNotificationsByEmail: (email: string) =>
//     `${API_BASE_URL}/houses/notifications/${email}`,
//   houseUnreadCount: `${API_BASE_URL}/houses/notifications/unread-count`,
//   houseNotificationRead: (id: string) =>
//     `${API_BASE_URL}/houses/notifications/${id}/read`,
//   houseNotificationMarkAllRead: `${API_BASE_URL}/houses/notifications/mark-all-read`,
//   houseNotificationDelete: (id: string) =>
//     `${API_BASE_URL}/houses/notifications/${id}`,
//   houseNotificationBulkDelete: `${API_BASE_URL}/houses/notifications/bulk`,
//   requestNotifications: `${API_BASE_URL}/requests/notifications`,
//   requestNotificationsByEmail: (email: string) =>
//     `${API_BASE_URL}/requests/notifications/${email}`,
//   requestNotificationRead: (id: string) =>
//     `${API_BASE_URL}/requests/notifications/${id}/read`,
//   requestNotificationMarkAllRead: (id: string) =>
//     `${API_BASE_URL}/requests/notifications/${id}/mark-all-read`,
//   requestNotificationDelete: (id: string) =>
//     `${API_BASE_URL}/requests/notifications/${id}`,
//   testimonials: `${API_BASE_URL}/testimonials`,
//   testimonialNotificationRead: (id: string) =>
//     `${API_BASE_URL}/testimonials/notifications/${id}/read`,
//   testimonialNotificationDelete: (id: string) =>
//     `${API_BASE_URL}/testimonials/notifications/${id}`,
//   questionNotifications: `${API_BASE_URL}/questions/notifications`,
//   questionNotificationsByEmail: (email: string) =>
//     `${API_BASE_URL}/questions/notifications/email/${email}`,
//   questionNotificationRead: (id: string) =>
//     `${API_BASE_URL}/questions/notifications/${id}/read`,
//   questionNotificationDelete: (id: string) =>
//     `${API_BASE_URL}/questions/notifications/${id}`,
// };

// // ============================================================
// // NOTIFICATION COMPONENTS
// // ============================================================

// const getSourceIcon = (source: Notification["source"]) => {
//   switch (source) {
//     case "house":
//       return <HouseIcon className="w-5 h-5 text-green-500" />;
//     case "booking":
//       return <BookmarkIcon className="w-5 h-5 text-blue-500" />;
//     case "contact":
//       return <ContactMailIcon className="w-5 h-5 text-orange-500" />;
//     case "request":
//       return <TrendingUpIcon className="w-5 h-5 text-purple-500" />;
//     case "testimonial":
//       return <StarIcon className="w-5 h-5 text-yellow-500" />;
//     case "user":
//       return <PersonIcon className="w-5 h-5 text-purple-500" />;
//     case "activity":
//       return <HistoryIcon className="w-5 h-5 text-indigo-500" />;
//     case "question":
//       return <QuestionAnswerIcon className="w-5 h-5 text-teal-500" />;
//     default:
//       return <NotificationsIcon className="w-5 h-5 text-gray-500" />;
//   }
// };

// const getSourceLabel = (source: Notification["source"]) => {
//   return source.charAt(0).toUpperCase() + source.slice(1);
// };

// const getSourceColor = (source: Notification["source"]) => {
//   switch (source) {
//     case "house":
//       return "border-green-200 bg-green-50";
//     case "booking":
//       return "border-blue-200 bg-blue-50";
//     case "contact":
//       return "border-orange-200 bg-orange-50";
//     case "request":
//       return "border-purple-200 bg-purple-50";
//     case "testimonial":
//       return "border-yellow-200 bg-yellow-50";
//     case "user":
//       return "border-purple-200 bg-purple-50";
//     case "activity":
//       return "border-indigo-200 bg-indigo-50";
//     case "question":
//       return "border-teal-200 bg-teal-50";
//     default:
//       return "border-gray-200 bg-gray-50";
//   }
// };

// // ============================================================
// // CONFIRMATION MODAL
// // ============================================================
// const ConfirmationModal = ({
//   isOpen,
//   onClose,
//   onConfirm,
//   title,
//   message,
//   confirmText = "Confirm",
//   cancelText = "Cancel",
//   confirmColor = "bg-red-600",
//   icon = <WarningIcon className="w-12 h-12 text-red-500" />,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: () => void;
//   title: string;
//   message: string;
//   confirmText?: string;
//   cancelText?: string;
//   confirmColor?: string;
//   icon?: React.ReactNode;
// }) => {
//   if (!isOpen) return null;

//   return (
//     <>
//       <div
//         className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1100]"
//         onClick={onClose}
//       />
//       <div className="fixed inset-0 z-[1101] flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-300">
//           <div className="text-center">
//             <div className="flex justify-center mb-4">{icon}</div>
//             <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
//             <p className="text-gray-600 mb-6">{message}</p>
//             <div className="flex gap-3 justify-center">
//               <button
//                 onClick={onClose}
//                 className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
//               >
//                 {cancelText}
//               </button>
//               <button
//                 onClick={onConfirm}
//                 className={`px-6 py-2.5 text-white rounded-lg hover:opacity-90 transition-opacity font-medium ${confirmColor}`}
//               >
//                 {confirmText}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// // ============================================================
// // STATUS MODAL
// // ============================================================
// const StatusModal = ({
//   isOpen,
//   onClose,
//   title,
//   message,
//   type = "success",
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   message: string;
//   type?: "success" | "error" | "info";
// }) => {
//   if (!isOpen) return null;

//   const isSuccess = type === "success";
//   const isInfo = type === "info";
//   const icon = isSuccess ? (
//     <CheckCircleIcon className="w-12 h-12 text-green-500" />
//   ) : isInfo ? (
//     <Info className="w-12 h-12 text-blue-500" />
//   ) : (
//     <CancelIcon className="w-12 h-12 text-red-500" />
//   );
//   const bgColor = isSuccess
//     ? "bg-green-50 border-green-200"
//     : isInfo
//       ? "bg-blue-50 border-blue-200"
//       : "bg-red-50 border-red-200";
//   const buttonColor = isSuccess
//     ? "bg-green-600"
//     : isInfo
//       ? "bg-blue-600"
//       : "bg-red-600";

//   return (
//     <>
//       <div
//         className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1100]"
//         onClick={onClose}
//       />
//       <div className="fixed inset-0 z-[1101] flex items-center justify-center p-4">
//         <div
//           className={`bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 border-2 ${bgColor} animate-in fade-in zoom-in duration-300`}
//         >
//           <div className="text-center">
//             <div className="flex justify-center mb-4">{icon}</div>
//             <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
//             <p className="text-gray-600 mb-6">{message}</p>
//             <button
//               onClick={onClose}
//               className={`px-6 py-2.5 text-white rounded-lg hover:opacity-90 transition-opacity font-medium ${buttonColor}`}
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// // ============================================================
// // NOTIFICATIONS MODAL - RESPONSIVE VERSION
// // ============================================================
// const NotificationsModal = ({
//   isOpen,
//   onClose,
//   notifications,
//   onMarkAsRead,
//   onMarkAllAsRead,
//   onDelete,
//   onDeleteAll,
//   onRefresh,
//   isLoading = false,
//   userRole,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   notifications: Notification[];
//   onMarkAsRead: (id: string) => void;
//   onMarkAllAsRead: () => void;
//   onDelete: (id: string) => void;
//   onDeleteAll: () => void;
//   onRefresh: () => void;
//   isLoading?: boolean;
//   userRole?: string;
// }) => {
//   const unreadCount = notifications.filter((n) => !n.read).length;
//   const canDelete = userRole === "admin" || userRole === "manager";

//   if (!isOpen) return null;

//   return (
//     <>
//       <div
//         className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
//         onClick={onClose}
//       />

//       <div className="fixed inset-0 z-[1000] flex items-center justify-center p-2 sm:p-4">
//         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-300 mx-2 sm:mx-4">
//           {/* Header - Responsive */}
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl gap-3 sm:gap-0">
//             <div>
//               <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
//                 <NotificationsIcon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
//                 Notifications
//               </h2>
//               {unreadCount > 0 && (
//                 <p className="text-xs sm:text-sm text-blue-600 mt-1">
//                   {unreadCount} unread notification{unreadCount > 1 ? "s" : ""}
//                 </p>
//               )}
//             </div>
//             <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
//               <button
//                 onClick={onRefresh}
//                 disabled={isLoading}
//                 className={`p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors ${
//                   isLoading ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//                 title="Refresh notifications"
//               >
//                 <RefreshIcon
//                   className={`w-4 h-4 sm:w-5 sm:h-5 ${isLoading ? "animate-spin" : ""}`}
//                 />
//               </button>

//               {unreadCount > 0 && (
//                 <button
//                   onClick={onMarkAllAsRead}
//                   className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-1 sm:gap-2"
//                 >
//                   <CheckCircleIcon className="w-3 h-3 sm:w-4 sm:h-4" />
//                   <span className="hidden xs:inline">Mark all as read</span>
//                   <span className="xs:hidden">Read all</span>
//                 </button>
//               )}
//               {canDelete && notifications.length > 0 && (
//                 <button
//                   onClick={onDeleteAll}
//                   className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-1 sm:gap-2"
//                 >
//                   <DeleteIcon className="w-3 h-3 sm:w-4 sm:h-4" />
//                   <span className="hidden xs:inline">Delete all</span>
//                   <span className="xs:hidden">Delete</span>
//                 </button>
//               )}
//               <button
//                 onClick={onClose}
//                 className="p-2 hover:bg-gray-200 rounded-full transition-colors"
//               >
//                 <CloseIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
//               </button>
//             </div>
//           </div>

//           {/* Notifications List - Responsive */}
//           <div className="flex-1 overflow-y-auto p-3 sm:p-6">
//             {isLoading ? (
//               <div className="text-center py-8 sm:py-12">
//                 <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
//                 <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-500">
//                   Loading notifications...
//                 </p>
//               </div>
//             ) : notifications.length === 0 ? (
//               <div className="text-center py-8 sm:py-12">
//                 <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
//                   <NotificationsIcon className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
//                 </div>
//                 <p className="text-lg sm:text-xl text-gray-500 font-medium">
//                   No notifications yet
//                 </p>
//                 <p className="text-xs sm:text-sm text-gray-400 mt-2">
//                   New notifications will appear here
//                 </p>
//               </div>
//             ) : (
//               <div className="grid gap-3 sm:gap-4">
//                 {notifications.map((notification) => (
//                   <div
//                     key={notification.id}
//                     className={`p-3 sm:p-5 rounded-xl border-2 transition-all ${
//                       notification.read
//                         ? "bg-white border-gray-200"
//                         : `${getSourceColor(notification.source)} border-2`
//                     }`}
//                   >
//                     <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
//                       <div className="flex-shrink-0 mt-0 sm:mt-1">
//                         {getSourceIcon(notification.source)}
//                       </div>

//                       <div className="flex-1 min-w-0 w-full">
//                         <div className="flex flex-wrap items-center gap-2 mb-1">
//                           <span
//                             className={`text-xs font-medium px-2 py-1 rounded-full ${
//                               notification.read
//                                 ? "bg-gray-100 text-gray-600"
//                                 : "bg-blue-100 text-blue-700"
//                             }`}
//                           >
//                             {getSourceLabel(notification.source)}
//                           </span>
//                           <span className="text-xs text-gray-400">
//                             {new Date(
//                               notification.createdAt,
//                             ).toLocaleDateString("en-US", {
//                               month: "short",
//                               day: "numeric",
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             })}
//                           </span>
//                           {!notification.read && (
//                             <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
//                               New
//                             </span>
//                           )}
//                           {notification.duplicateCount &&
//                             notification.duplicateCount > 1 && (
//                               <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded-full">
//                                 {notification.duplicateCount} copies
//                               </span>
//                             )}
//                         </div>
//                         <h3 className="text-base sm:text-lg font-semibold text-gray-800">
//                           {notification.title}
//                         </h3>
//                         <p className="text-sm sm:text-base text-gray-600 mt-1">
//                           {notification.message}
//                         </p>
//                         {notification.duplicateCount &&
//                           notification.duplicateCount > 1 && (
//                             <p className="text-xs text-purple-600 mt-1">
//                               This notification has{" "}
//                               {notification.duplicateCount} copies. Actions will
//                               apply to all copies.
//                             </p>
//                           )}
//                       </div>

//                       <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-end sm:justify-start">
//                         {!notification.read && (
//                           <button
//                             onClick={() => onMarkAsRead(notification.id)}
//                             className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                             title={
//                               notification.duplicateCount &&
//                               notification.duplicateCount > 1
//                                 ? `Mark all ${notification.duplicateCount} copies as read`
//                                 : "Mark as read"
//                             }
//                           >
//                             <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
//                           </button>
//                         )}
//                         {canDelete && (
//                           <button
//                             onClick={() => onDelete(notification.id)}
//                             className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                             title={
//                               notification.duplicateCount &&
//                               notification.duplicateCount > 1
//                                 ? `Delete all ${notification.duplicateCount} copies`
//                                 : "Delete"
//                             }
//                           >
//                             <DeleteIcon className="w-4 h-4 sm:w-5 sm:h-5" />
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Footer - Responsive */}
//           {notifications.length > 0 && !isLoading && (
//             <div className="p-3 sm:p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
//               <p className="text-xs sm:text-sm text-gray-500 text-center">
//                 Showing {notifications.length} notification
//                 {notifications.length > 1 ? "s" : ""}
//                 {unreadCount > 0 && ` • ${unreadCount} unread`}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// // ============================================================
// // SIDEBAR COMPONENT
// // ============================================================
// const Sidebar = ({
//   user,
//   onLogout,
//   isOpen,
//   onToggle,
//   location,
//   onNotificationsClick,
//   unreadCount,
// }: {
//   user: UserData | null;
//   onLogout: () => void;
//   isOpen: boolean;
//   onToggle: () => void;
//   location: any;
//   onNotificationsClick: () => void;
//   unreadCount: number;
// }) => {
//   const navigate = useNavigate();

//   const adminMenuItems = [
//     { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
//     { id: "users", label: "Users", icon: <PeopleIcon /> },
//     { id: "team", label: "Team", icon: <PeopleIcon /> },
//     { id: "bookings", label: "Bookings", icon: <AttachMoneyIcon /> },
//     { id: "requests", label: "Requests", icon: <TrendingUpIcon /> },
//     { id: "houses", label: "Houses", icon: <HouseRounded /> },
//     { id: "messages", label: "Messages", icon: <EmailIcon /> },
//     { id: "testimonials", label: "Testimonials", icon: <TextSnippet /> },
//     { id: "logs", label: "Logs", icon: <LoginSharp /> },
//     { id: "question", label: "Question", icon: <QuestionAnswerIcon /> },
//   ];

//   const userMenuItems = [
//     { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
//     { id: "profile", label: "My Profile", icon: <PersonIcon /> },
//     { id: "bookings", label: "My Bookings", icon: <AttachMoneyIcon /> },
//     { id: "requests", label: "My Requests", icon: <TrendingUpIcon /> },
//     { id: "messages", label: "My Messages", icon: <EmailIcon /> },
//   ];

//   const hostMenuItems = [
//     { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
//     { id: "houses", label: " Houses", icon: <HouseIcon /> },
//     { id: "bookings", label: "Bookings", icon: <AttachMoneyIcon /> },
//     { id: "clients", label: "Occupied house", icon: <People /> },
//   ];

//   const managerMenuItems = [
//     { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
//     { id: "users", label: "Users", icon: <PeopleIcon /> },
//     { id: "bookings", label: "Bookings", icon: <AttachMoneyIcon /> },
//     { id: "houses", label: "Houses", icon: <HouseRounded /> },
//     { id: "messages", label: "Messages", icon: <EmailIcon /> },
//     { id: "testimonials", label: "Testimonials", icon: <TextSnippet /> },
//     { id: "requests", label: "Requests", icon: <TrendingUpIcon /> },
//     { id: "logs", label: "Logs", icon: <LoginSharp /> },
//     { id: "question", label: "Question", icon: <QuestionAnswerIcon /> },
//   ];

//   const getMenuItems = () => {
//     if (user?.role === "admin") return adminMenuItems;
//     if (user?.role === "host") return hostMenuItems;
//     if (user?.role === "manager") return managerMenuItems;
//     return userMenuItems;
//   };

//   const getItemPath = (itemId: string) => {
//     if (user?.role === "admin") {
//       const pathMap: Record<string, string> = {
//         dashboard: "/dashboard",
//         users: "/dashboard/users",
//         team: "/dashboard/team",
//         bookings: "/dashboard/bookings",
//         houses: "/dashboard/houses",
//         requests: "/dashboard/request",
//         messages: "/dashboard/messages",
//         testimonials: "/dashboard/testimonials",
//         logs: "/dashboard/logs",
//         question: "/dashboard/questions",
//       };
//       return pathMap[itemId] || "/dashboard";
//     } else if (user?.role === "user") {
//       const pathMap: Record<string, string> = {
//         dashboard: "/user/dashboard",
//         profile: "/user/management",
//         bookings: "/user/bookings",
//         requests: "/user/requests",
//         messages: "/user/messages",
//         favorites: "/user/favorites",
//       };
//       return pathMap[itemId] || "/user/dashboard";
//     } else if (user?.role === "host") {
//       const pathMap: Record<string, string> = {
//         dashboard: "/host/dashboard",
//         houses: "/host/management",
//         bookings: "/host/bookings",
//         clients: "/host/clients",
//       };
//       return pathMap[itemId] || "/host/dashboard";
//     } else if (user?.role === "manager") {
//       const pathMap: Record<string, string> = {
//         dashboard: "/manager/dashboard",
//         users: "/manager/users",
//         bookings: "/manager/bookings",
//         houses: "/manager/houses",
//         messages: "/manager/messages",
//         testimonials: "/manager/testimonials",
//         requests: "/manager/requests",
//         logs: "/manager/logs",
//         question: "/manager/questions",
//       };
//       return pathMap[itemId] || "/manager/dashboard";
//     }
//     return "/dashboard";
//   };

//   const getPanelLabel = () => {
//     if (user?.role === "admin") return "Admin Panel";
//     if (user?.role === "host") return "Host Panel";
//     if (user?.role === "manager") return "Manager Panel";
//     return "User Panel";
//   };

//   const handleNavigation = (path: string) => {
//     navigate(path);
//     if (window.innerWidth < 1024) {
//       onToggle();
//     }
//   };

//   const menuItems = getMenuItems();

//   return (
//     <>
//       <button
//         onClick={onToggle}
//         className={`lg:hidden fixed z-50 p-2.5 bg-white rounded-xl shadow-lg hover:bg-gray-50 transition-all duration-200 ${
//           isOpen ? "top-4 left-4" : "top-20 left-4"
//         }`}
//         style={{
//           top: isOpen ? "1rem" : "5rem",
//           left: "1rem",
//           boxShadow:
//             "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
//         }}
//       >
//         {isOpen ? (
//           <CloseIcon className="w-6 h-6 text-gray-700" />
//         ) : (
//           <MenuIcon className="w-6 h-6 text-gray-700" />
//         )}
//       </button>

//       <div
//         className={`fixed top-0 left-0 h-full bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:translate-x-0 w-64 sm:w-72 md:w-80 lg:w-64 xl:w-72 2xl:w-80`}
//       >
//         <div className="flex flex-col h-full">
//           <div className="p-4 sm:p-5 md:p-6 border-b border-gray-200">
//             <div className="flex items-center space-x-3">
//               <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl flex-shrink-0">
//                 <HomeIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
//               </div>
//               <div className="min-w-0">
//                 <h1 className="text-lg sm:text-xl font-bold text-gray-800 truncate">
//                   Inyumba
//                 </h1>
//                 <p className="text-xs text-gray-500 truncate">
//                   {getPanelLabel()}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="p-3 sm:p-4 border-b border-gray-200 bg-gray-50">
//             <div className="flex items-center space-x-3">
//               <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
//                 <PersonIcon className="text-white text-sm sm:text-base" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-medium text-gray-800 truncate">
//                   {user?.name}
//                 </p>
//                 <p className="text-xs text-gray-500 truncate">{user?.email}</p>
//                 <span className="text-xs text-blue-600 font-medium capitalize">
//                   {user?.role}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <nav className="flex-1 p-3 sm:p-4 overflow-y-auto">
//             {menuItems.map((item) => {
//               const itemPath = getItemPath(item.id);
//               const isActive = location.pathname === itemPath;

//               return (
//                 <button
//                   key={item.id}
//                   onClick={() => handleNavigation(itemPath)}
//                   className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all duration-200 mb-1 ${
//                     isActive
//                       ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
//                       : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   <span className="w-5 h-5 flex-shrink-0">{item.icon}</span>
//                   <span className="font-medium text-sm sm:text-base truncate">
//                     {item.label}
//                   </span>
//                 </button>
//               );
//             })}
//           </nav>

//           <div className="p-3 sm:p-4 border-t border-gray-200 space-y-2">
//             <button
//               onClick={onNotificationsClick}
//               className="w-full flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-200 relative"
//             >
//               <NotificationsIcon className="w-5 h-5 flex-shrink-0" />
//               <span className="font-medium text-sm sm:text-base">
//                 Notifications
//               </span>
//               {unreadCount > 0 && (
//                 <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
//                   {unreadCount}
//                 </span>
//               )}
//             </button>

//             <button
//               onClick={() => {
//                 onLogout();
//                 onToggle();
//               }}
//               className="w-full bg-gradient-to-t from-red-400 to-red-600 flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
//             >
//               <LogoutIcon className="w-5 h-5 text-white flex-shrink-0" />
//               <span className="font-medium text-sm text-white sm:text-base">
//                 Logout
//               </span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-30 lg:hidden"
//           onClick={onToggle}
//         />
//       )}
//     </>
//   );
// };

// // ============================================================
// // DASHBOARD LAYOUT WITH NOTIFICATIONS
// // ============================================================
// const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [user, setUser] = useState<UserData | null>(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   const [confirmationModal, setConfirmationModal] = useState<{
//     isOpen: boolean;
//     title: string;
//     message: string;
//     confirmText: string;
//     confirmColor: string;
//     onConfirm: () => void;
//     type: "delete" | "delete-all";
//     duplicateIds?: string[];
//   }>({
//     isOpen: false,
//     title: "",
//     message: "",
//     confirmText: "Confirm",
//     confirmColor: "bg-red-600",
//     onConfirm: () => {},
//     type: "delete",
//   });

//   const [statusModal, setStatusModal] = useState<{
//     isOpen: boolean;
//     title: string;
//     message: string;
//     type: "success" | "error" | "info";
//   }>({
//     isOpen: false,
//     title: "",
//     message: "",
//     type: "success",
//   });

//   const previousDataRef = useRef<{
//     notifications: any[];
//   }>({
//     notifications: [],
//   });

//   // ============================================================
//   // FETCH NOTIFICATIONS FROM ALL SOURCES
//   // ============================================================

//   const fetchAuthNotifications = useCallback(async (userData: UserData) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return [];

//       let url = "";
//       if (userData.role === "admin" || userData.role === "manager") {
//         url = API_ENDPOINTS.notifications;
//       } else {
//         url = API_ENDPOINTS.notificationsByEmail(userData.email);
//       }

//       const response = await axios.get(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.data?.success && Array.isArray(response.data.data)) {
//         return response.data.data;
//       }
//       if (Array.isArray(response.data)) {
//         return response.data;
//       }
//       return [];
//     } catch (error) {
//       return [];
//     }
//   }, []);

//   const fetchBookingNotifications = useCallback(async (userData: UserData) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return [];

//       let url = "";
//       if (
//         userData.role === "admin" ||
//         userData.role === "manager" ||
//         userData.role === "host"
//       ) {
//         url = API_ENDPOINTS.bookingNotifications;
//       } else {
//         url = API_ENDPOINTS.bookingNotificationsByEmail(userData.email);
//       }

//       const response = await axios.get(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (
//         response.data?.success &&
//         Array.isArray(response.data.notifications)
//       ) {
//         return response.data.notifications;
//       }
//       if (response.data?.success && Array.isArray(response.data.data)) {
//         return response.data.data;
//       }
//       if (Array.isArray(response.data)) {
//         return response.data;
//       }
//       return [];
//     } catch (error) {
//       return [];
//     }
//   }, []);

//   const fetchHouseNotifications = useCallback(async (userData: UserData) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return [];

//       let url = "";
//       if (userData.role === "admin" || userData.role === "manager") {
//         url = API_ENDPOINTS.houseNotifications;
//       } else {
//         url = API_ENDPOINTS.houseNotificationsByEmail(userData.email);
//       }

//       const response = await axios.get(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.data?.success && Array.isArray(response.data.data)) {
//         return response.data.data;
//       }
//       if (
//         response.data?.success &&
//         Array.isArray(response.data.notifications)
//       ) {
//         return response.data.notifications;
//       }
//       if (Array.isArray(response.data)) {
//         return response.data;
//       }
//       return [];
//     } catch (error) {
//       return [];
//     }
//   }, []);

//   const fetchContactNotifications = useCallback(async (userData: UserData) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return [];

//       let url = "";
//       if (userData.role === "admin" || userData.role === "manager") {
//         url = API_ENDPOINTS.contactNotifications;
//       } else {
//         url = API_ENDPOINTS.contactNotificationsByEmail(userData.email);
//       }

//       const response = await axios.get(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.data?.success && Array.isArray(response.data.data)) {
//         return response.data.data;
//       }
//       if (Array.isArray(response.data)) {
//         return response.data;
//       }
//       return [];
//     } catch (error) {
//       return [];
//     }
//   }, []);

//   const fetchRequestNotifications = useCallback(async (userData: UserData) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return [];

//       let url = "";
//       if (userData.role === "admin" || userData.role === "manager") {
//         url = API_ENDPOINTS.requestNotifications;
//       } else {
//         url = API_ENDPOINTS.requestNotificationsByEmail(userData.email);
//       }

//       const response = await axios.get(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.data?.success && Array.isArray(response.data.data)) {
//         return response.data.data;
//       }
//       if (Array.isArray(response.data)) {
//         return response.data;
//       }
//       return [];
//     } catch (error) {
//       return [];
//     }
//   }, []);

//   const fetchTestimonialNotifications = useCallback(
//     async (userData: UserData) => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return [];

//         const response = await axios.get(API_ENDPOINTS.testimonials, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         let data = [];
//         if (response.data?.success && Array.isArray(response.data.data)) {
//           data = response.data.data;
//         } else if (Array.isArray(response.data)) {
//           data = response.data;
//         } else {
//           return [];
//         }

//         if (userData.role === "user" || userData.role === "host") {
//           return data.filter(
//             (notif: any) =>
//               notif.userEmail === userData.email ||
//               notif.email === userData.email,
//           );
//         }

//         return data;
//       } catch (error) {
//         return [];
//       }
//     },
//     [],
//   );

//   const fetchQuestionNotifications = useCallback(async (userData: UserData) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return [];

//       let url = "";
//       if (userData.role === "admin" || userData.role === "manager") {
//         url = API_ENDPOINTS.questionNotifications;
//       } else {
//         url = API_ENDPOINTS.questionNotificationsByEmail(userData.email);
//       }

//       const response = await axios.get(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       let data = [];
//       if (response.data?.success && Array.isArray(response.data.data)) {
//         data = response.data.data;
//       } else if (
//         response.data?.success &&
//         Array.isArray(response.data.notifications)
//       ) {
//         data = response.data.notifications;
//       } else if (Array.isArray(response.data)) {
//         data = response.data;
//       } else {
//         return [];
//       }

//       return data;
//     } catch (error) {
//       return [];
//     }
//   }, []);

//   // ============================================================
//   // FETCH ALL NOTIFICATIONS - COMBINED
//   // ============================================================
//   const fetchAllNotifications = useCallback(async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const userDataStr = localStorage.getItem("user");
//       const userData = userDataStr ? JSON.parse(userDataStr) : null;

//       if (!token || !userData) return [];

//       const [
//         authNotifs,
//         bookingNotifs,
//         houseNotifs,
//         contactNotifs,
//         requestNotifs,
//         testimonialNotifs,
//         questionNotifs,
//       ] = await Promise.all([
//         fetchAuthNotifications(userData),
//         fetchBookingNotifications(userData),
//         fetchHouseNotifications(userData),
//         fetchContactNotifications(userData),
//         fetchRequestNotifications(userData),
//         fetchTestimonialNotifications(userData),
//         fetchQuestionNotifications(userData),
//       ]);

//       let allNotifications: any[] = [];

//       if (Array.isArray(authNotifs)) {
//         allNotifications = [...allNotifications, ...authNotifs];
//       }
//       if (Array.isArray(bookingNotifs)) {
//         allNotifications = [...allNotifications, ...bookingNotifs];
//       }
//       if (Array.isArray(houseNotifs)) {
//         allNotifications = [...allNotifications, ...houseNotifs];
//       }
//       if (Array.isArray(contactNotifs)) {
//         allNotifications = [...allNotifications, ...contactNotifs];
//       }
//       if (Array.isArray(requestNotifs)) {
//         allNotifications = [...allNotifications, ...requestNotifs];
//       }
//       if (Array.isArray(testimonialNotifs)) {
//         allNotifications = [...allNotifications, ...testimonialNotifs];
//       }
//       if (Array.isArray(questionNotifs)) {
//         allNotifications = [...allNotifications, ...questionNotifs];
//       }

//       const seenIds = new Set();
//       const uniqueRawNotifications = allNotifications.filter((notif) => {
//         const id = notif._id || notif.id;
//         if (seenIds.has(id)) {
//           return false;
//         }
//         seenIds.add(id);
//         return true;
//       });

//       return uniqueRawNotifications;
//     } catch (error) {
//       return [];
//     }
//   }, [
//     fetchAuthNotifications,
//     fetchBookingNotifications,
//     fetchHouseNotifications,
//     fetchContactNotifications,
//     fetchRequestNotifications,
//     fetchTestimonialNotifications,
//     fetchQuestionNotifications,
//   ]);

//   // ============================================================
//   // PROCESS NOTIFICATIONS - GENERATE UNIFIED FORMAT
//   // ============================================================
//   const processNotifications = useCallback((rawNotifications: any[]) => {
//     const newNotifications: Notification[] = [];

//     rawNotifications.forEach((notif) => {
//       let source: Notification["source"] = "activity";
//       let title = "📋 Notification";

//       if (notif.type === "welcome") {
//         source = "user";
//         title = "👋 Welcome!";
//       } else if (notif.type === "verification") {
//         source = "user";
//         title = "📧 Email Verification";
//       } else if (notif.type === "password_reset") {
//         source = "user";
//         title = "🔑 Password Reset";
//       } else if (notif.type === "profile_update") {
//         source = "user";
//         title = "✏️ Profile Updated";
//       } else if (notif.type === "account_deletion") {
//         source = "user";
//         title = "🗑️ Account Deleted";
//       } else if (notif.type === "booking_created") {
//         source = "booking";
//         title = "📅 New Booking";
//       } else if (notif.type === "booking_updated") {
//         source = "booking";
//         title = "📝 Booking Updated";
//       } else if (notif.type === "booking_cancelled") {
//         source = "booking";
//         title = "❌ Booking Cancelled";
//       } else if (notif.type === "booking_confirmed") {
//         source = "booking";
//         title = "✅ Booking Confirmed";
//       } else if (
//         notif.type === "contact_created" ||
//         notif.type?.startsWith("contact_")
//       ) {
//         source = "contact";
//         title = "📩 New Contact Message";
//       } else if (notif.type === "request_created") {
//         source = "request";
//         title = "📋 New Request";
//       } else if (notif.type === "request_deleted") {
//         source = "request";
//         title = "🗑️ Request Deleted";
//       } else if (notif.type === "house_created") {
//         source = "house";
//         title = "🏠 New House Listed";
//       } else if (notif.type === "house_updated") {
//         source = "house";
//         title = "📝 House Updated";
//       } else if (notif.type === "house_status_changed") {
//         source = "house";
//         title = "🔄 House Status Changed";
//       } else if (notif.type === "testimonial_created") {
//         source = "testimonial";
//         title = "⭐ New Testimonial";
//       } else if (notif.type === "question_submitted") {
//         source = "question";
//         title = "❓ New Question Submitted";
//       } else if (notif.type === "question_answered") {
//         source = "question";
//         title = "✅ Question Answered";
//       } else if (notif.type?.startsWith("question_")) {
//         source = "question";
//         title = "❓ Question Notification";
//       } else if (notif.action) {
//         if (
//           notif.action === "register" ||
//           notif.action === "registration" ||
//           notif.action === "new_registration" ||
//           notif.action === "user_registered" ||
//           notif.action === "signup"
//         ) {
//           return;
//         }

//         source = "activity";
//         if (notif.action === "login") {
//           title = "🔐 User Login";
//         } else if (notif.action === "logout") {
//           title = "🚪 User Logout";
//         } else if (notif.action === "update_profile") {
//           title = "✏️ Profile Updated";
//         } else if (notif.action === "booking_created") {
//           title = "📅 Booking Created";
//         } else if (notif.action === "booking_cancelled") {
//           title = "❌ Booking Cancelled";
//         } else if (notif.action === "house_created") {
//           title = "🏠 House Created";
//         } else if (notif.action === "house_updated") {
//           title = "📝 House Updated";
//         } else if (notif.action === "house_deleted") {
//           title = "🗑️ House Deleted";
//         } else {
//           return;
//         }
//       } else {
//         return;
//       }

//       if (notif.title) {
//         title = notif.title;
//       }

//       let message = notif.message || "";

//       if (notif.type?.startsWith("booking_") && notif.houseName) {
//         message = `${title} for "${notif.houseName}"`;
//         if (notif.userName) message += ` by ${notif.userName}`;
//         if (notif.status) message += ` - Status: ${notif.status}`;
//       }

//       if (notif.type?.startsWith("question_") && notif.question) {
//         message = notif.question || message;
//         if (notif.questionerName) {
//           message = `From ${notif.questionerName}: ${message}`;
//         }
//       }

//       const notificationId = notif._id || notif.id;
//       const groupKey = `${title}|${message}|${source}`;

//       newNotifications.push({
//         id: notificationId,
//         title: title,
//         message: message,
//         type: "info",
//         read: notif.isRead || false,
//         createdAt: notif.createdAt || new Date().toISOString(),
//         source: source,
//         data: notif,
//         groupKey: groupKey,
//       });
//     });

//     return newNotifications.filter((notif) => {
//       if (notif.source === "activity" && notif.title.includes("Student")) {
//         return false;
//       }
//       if (
//         notif.title.includes("New Registration") ||
//         notif.message.includes("registered")
//       ) {
//         return false;
//       }
//       if (notif.message.includes("Student")) {
//         return false;
//       }
//       return true;
//     });
//   }, []);

//   // ============================================================
//   // FETCH AND PROCESS ALL DATA - SHOW ONLY ONE NOTIFICATION PER GROUP
//   // ============================================================
//   const fetchAndProcessData = useCallback(async () => {
//     try {
//       const rawNotifications = await fetchAllNotifications();
//       const processedNotifs = processNotifications(rawNotifications);

//       // Group notifications by groupKey
//       const groups: Record<string, Notification[]> = {};
//       processedNotifs.forEach((notif) => {
//         const key = notif.groupKey || `${notif.id}`;
//         if (!groups[key]) {
//           groups[key] = [];
//         }
//         groups[key].push(notif);
//       });

//       // Build final notification list - ONE per group with ALL IDs tracked
//       const finalNotifications: Notification[] = [];
//       Object.values(groups).forEach((group) => {
//         // Sort by createdAt to get the latest one
//         group.sort(
//           (a, b) =>
//             new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
//         );

//         // Take the first (latest) notification as the representative
//         const representative = group[0];
//         // Collect ALL IDs from this group for bulk delete
//         const allIds = group.map((n) => n.id);

//         finalNotifications.push({
//           ...representative,
//           duplicateCount: group.length,
//           allIds: allIds, // ALL IDs including duplicates
//         });
//       });

//       // Sort by createdAt (newest first)
//       finalNotifications.sort(
//         (a, b) =>
//           new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
//       );

//       setNotifications(finalNotifications);

//       previousDataRef.current = {
//         notifications: rawNotifications,
//       };
//     } catch (error) {
//       // Silent fail
//     }
//   }, [fetchAllNotifications, processNotifications]);

//   // ============================================================
//   // HANDLE REFRESH
//   // ============================================================
//   const handleRefresh = useCallback(async () => {
//     setIsRefreshing(true);
//     await fetchAndProcessData();
//     setIsRefreshing(false);
//   }, [fetchAndProcessData]);

//   // ============================================================
//   // SHOW STATUS MODAL
//   // ============================================================
//   const showStatusModal = (
//     title: string,
//     message: string,
//     type: "success" | "error" | "info",
//   ) => {
//     setStatusModal({
//       isOpen: true,
//       title,
//       message,
//       type,
//     });
//   };

//   // ============================================================
//   // FIND ALL DUPLICATE IDs FOR A NOTIFICATION
//   // ============================================================
//   const getDuplicateIds = useCallback(
//     (notificationId: string) => {
//       const targetNotif = notifications.find((n) => n.id === notificationId);
//       if (!targetNotif || !targetNotif.allIds) {
//         return [notificationId];
//       }
//       // Returns ALL 4 duplicate IDs
//       return targetNotif.allIds;
//     },
//     [notifications],
//   );

//   // ============================================================
//   // MARK NOTIFICATION AS READ - APPLY TO ALL COPIES
//   // ============================================================
//   const handleMarkAsRead = useCallback(
//     async (id: string) => {
//       const allIds = getDuplicateIds(id);

//       // Optimistically update UI - mark ALL as read
//       setNotifications((prev) =>
//         prev.map((n) => (allIds.includes(n.id) ? { ...n, read: true } : n)),
//       );

//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return;

//         const markPromises = [];
//         let successCount = 0;

//         // Mark ALL duplicates as read
//         for (const notifId of allIds) {
//           const notification = notifications.find((n) => n.id === notifId);
//           if (!notification) continue;

//           const source = notification.source;
//           let url = "";

//           switch (source) {
//             case "user":
//               url = API_ENDPOINTS.notificationRead(notifId);
//               break;
//             case "booking":
//               url = API_ENDPOINTS.bookingNotificationRead(notifId);
//               break;
//             case "contact":
//               url = API_ENDPOINTS.contactNotificationRead(notifId);
//               break;
//             case "request":
//               url = API_ENDPOINTS.requestNotificationRead(notifId);
//               break;
//             case "house":
//               url = API_ENDPOINTS.houseNotificationRead(notifId);
//               break;
//             case "testimonial":
//               successCount++;
//               continue;
//             case "question":
//               url = API_ENDPOINTS.questionNotificationRead(notifId);
//               break;
//             case "activity":
//               successCount++;
//               continue;
//             default:
//               continue;
//           }

//           if (url) {
//             markPromises.push(
//               axios
//                 .put(url, {}, { headers: { Authorization: `Bearer ${token}` } })
//                 .then(() => successCount++)
//                 .catch(() => {}),
//             );
//           }
//         }

//         await Promise.allSettled(markPromises);
//         await fetchAndProcessData();

//         if (successCount > 0) {
//           showStatusModal(
//             "Success",
//             `${successCount} notification(s) marked as read`,
//             "success",
//           );
//         }
//       } catch (error) {
//         // Revert optimistic update
//         setNotifications((prev) =>
//           prev.map((n) => (allIds.includes(n.id) ? { ...n, read: false } : n)),
//         );
//         showStatusModal(
//           "Error",
//           "Failed to mark notifications as read",
//           "error",
//         );
//       }
//     },
//     [notifications, fetchAndProcessData, getDuplicateIds],
//   );

//   // ============================================================
//   // MARK ALL NOTIFICATIONS AS READ
//   // ============================================================
//   const handleMarkAllAsRead = useCallback(async () => {
//     const unreadNotifications = notifications.filter((n) => !n.read);
//     const unreadIds = unreadNotifications.map((n) => n.id);

//     if (unreadNotifications.length === 0) {
//       showStatusModal("Info", "No unread notifications", "info");
//       return;
//     }

//     setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const allUnreadIds: string[] = [];
//       for (const notification of unreadNotifications) {
//         if (notification.allIds) {
//           allUnreadIds.push(...notification.allIds);
//         } else {
//           allUnreadIds.push(notification.id);
//         }
//       }

//       const markPromises = [];
//       let successCount = 0;

//       for (const notifId of allUnreadIds) {
//         const notification = notifications.find((n) => n.id === notifId);
//         if (!notification) continue;

//         const source = notification.source;
//         let url = "";

//         switch (source) {
//           case "user":
//             url = API_ENDPOINTS.notificationRead(notifId);
//             break;
//           case "booking":
//             url = API_ENDPOINTS.bookingNotificationRead(notifId);
//             break;
//           case "contact":
//             url = API_ENDPOINTS.contactNotificationRead(notifId);
//             break;
//           case "request":
//             url = API_ENDPOINTS.requestNotificationRead(notifId);
//             break;
//           case "house":
//             url = API_ENDPOINTS.houseNotificationRead(notifId);
//             break;
//           case "testimonial":
//             successCount++;
//             continue;
//           case "question":
//             url = API_ENDPOINTS.questionNotificationRead(notifId);
//             break;
//           case "activity":
//             successCount++;
//             continue;
//           default:
//             continue;
//         }

//         if (url) {
//           markPromises.push(
//             axios
//               .put(
//                 url,
//                 {},
//                 {
//                   headers: { Authorization: `Bearer ${token}` },
//                 },
//               )
//               .then(() => successCount++)
//               .catch(() => {}),
//           );
//         }
//       }

//       await Promise.allSettled(markPromises);
//       await fetchAndProcessData();

//       if (successCount > 0) {
//         showStatusModal(
//           "Success",
//           `${successCount} notification(s) marked as read`,
//           "success",
//         );
//       }
//     } catch (error) {
//       setNotifications((prev) =>
//         prev.map((n) => (unreadIds.includes(n.id) ? { ...n, read: false } : n)),
//       );
//       showStatusModal("Error", "Failed to mark notifications as read", "error");
//     }
//   }, [notifications, fetchAndProcessData]);

//   // ============================================================
//   // DELETE NOTIFICATION - DELETE ALL 4 COPIES AT ONCE
//   // ============================================================
//   const handleDelete = useCallback(
//     async (id: string) => {
//       if (!user || (user.role !== "admin" && user.role !== "manager")) {
//         showStatusModal(
//           "Permission Denied",
//           "You do not have permission to delete notifications",
//           "error",
//         );
//         return;
//       }

//       // Get ALL duplicate IDs (all 4 of them)
//       const allIds = getDuplicateIds(id);
//       const duplicateCount = allIds.length;

//       setConfirmationModal({
//         isOpen: true,
//         title:
//           duplicateCount > 1
//             ? `Delete ${duplicateCount} Duplicate Notifications`
//             : "Delete Notification",
//         message:
//           duplicateCount > 1
//             ? `This notification has ${duplicateCount} copies. They will all be deleted automatically.`
//             : "Are you sure you want to delete this notification? This action cannot be undone.",
//         confirmText:
//           duplicateCount > 1 ? `Delete All ${duplicateCount}` : "Delete",
//         confirmColor: "bg-red-600",
//         onConfirm: async () => {
//           setConfirmationModal((prev) => ({ ...prev, isOpen: false }));

//           // Remove the SINGLE displayed notification from UI immediately
//           setNotifications((prev) =>
//             prev.filter((n) => n.id !== id),
//           );

//           try {
//             const token = localStorage.getItem("token");
//             if (!token) return;

//             const deletePromises = [];
//             let deleteCount = 0;

//             // Find ALL notifications with these IDs (all 4 duplicates)
//             const notificationsToDelete = notifications.filter((n) =>
//               allIds.includes(n.id),
//             );

//             // Delete ALL duplicate notifications from database
//             for (const notif of notificationsToDelete) {
//               const source = notif.source;
//               let url = "";

//               switch (source) {
//                 case "activity":
//                   url = API_ENDPOINTS.activityDelete(notif.id);
//                   break;
//                 case "user":
//                   url = API_ENDPOINTS.notificationDelete(notif.id);
//                   break;
//                 case "booking":
//                   url = API_ENDPOINTS.bookingNotificationDelete(notif.id);
//                   break;
//                 case "contact":
//                   url = API_ENDPOINTS.contactNotificationDelete(notif.id);
//                   break;
//                 case "request":
//                   url = API_ENDPOINTS.requestNotificationDelete(notif.id);
//                   break;
//                 case "house":
//                   url = API_ENDPOINTS.houseNotificationDelete(notif.id);
//                   break;
//                 case "testimonial":
//                   url = API_ENDPOINTS.testimonialNotificationDelete(notif.id);
//                   break;
//                 case "question":
//                   url = API_ENDPOINTS.questionNotificationDelete(notif.id);
//                   break;
//                 default:
//                   url = API_ENDPOINTS.notificationDelete(notif.id);
//                   break;
//               }

//               deletePromises.push(
//                 axios
//                   .delete(url, {
//                     headers: { Authorization: `Bearer ${token}` },
//                   })
//                   .then(() => deleteCount++)
//                   .catch(() => {}),
//               );
//             }

//             await Promise.allSettled(deletePromises);

//             if (deleteCount > 0) {
//               showStatusModal(
//                 "Success",
//                 `${deleteCount} notification(s) deleted successfully`,
//                 "success",
//               );
//             }

//             // Refresh to sync with server
//             setTimeout(() => fetchAndProcessData(), 500);
//           } catch (error) {
//             await fetchAndProcessData();
//             showStatusModal(
//               "Error",
//               "Failed to delete notifications. Please try again.",
//               "error",
//             );
//           }
//         },
//         type: "delete",
//         duplicateIds: allIds,
//       });
//     },
//     [notifications, fetchAndProcessData, user, getDuplicateIds],
//   );

//   // ============================================================
//   // DELETE ALL NOTIFICATIONS
//   // ============================================================
//   const handleDeleteAll = useCallback(async () => {
//     if (!user || (user.role !== "admin" && user.role !== "manager")) {
//       showStatusModal(
//         "Permission Denied",
//         "You do not have permission to delete notifications",
//         "error",
//       );
//       return;
//     }

//     setConfirmationModal({
//       isOpen: true,
//       title: "Delete All Notifications",
//       message: `Are you sure you want to delete all ${notifications.length} notifications? This action cannot be undone.`,
//       confirmText: "Delete All",
//       confirmColor: "bg-red-600",
//       onConfirm: async () => {
//         setConfirmationModal((prev) => ({ ...prev, isOpen: false }));

//         try {
//           const token = localStorage.getItem("token");
//           if (!token) {
//             setNotifications([]);
//             return;
//           }

//           const allIds: string[] = [];
//           for (const notif of notifications) {
//             if (notif.allIds) {
//               allIds.push(...notif.allIds);
//             } else {
//               allIds.push(notif.id);
//             }
//           }

//           const deletePromises = [];
//           let deleteCount = 0;

//           for (const notifId of allIds) {
//             const notification = notifications.find((n) => n.id === notifId);
//             if (!notification) continue;

//             const source = notification.source;
//             let url = "";

//             switch (source) {
//               case "activity":
//                 url = API_ENDPOINTS.activityDelete(notifId);
//                 break;
//               case "user":
//                 url = API_ENDPOINTS.notificationDelete(notifId);
//                 break;
//               case "booking":
//                 url = API_ENDPOINTS.bookingNotificationDelete(notifId);
//                 break;
//               case "contact":
//                 url = API_ENDPOINTS.contactNotificationDelete(notifId);
//                 break;
//               case "request":
//                 url = API_ENDPOINTS.requestNotificationDelete(notifId);
//                 break;
//               case "house":
//                 url = API_ENDPOINTS.houseNotificationDelete(notifId);
//                 break;
//               case "testimonial":
//                 url = API_ENDPOINTS.testimonialNotificationDelete(notifId);
//                 break;
//               case "question":
//                 url = API_ENDPOINTS.questionNotificationDelete(notifId);
//                 break;
//               default:
//                 url = API_ENDPOINTS.notificationDelete(notifId);
//                 break;
//             }

//             deletePromises.push(
//               axios
//                 .delete(url, {
//                   headers: { Authorization: `Bearer ${token}` },
//                 })
//                 .then(() => deleteCount++)
//                 .catch(() => {}),
//             );
//           }

//           setNotifications([]);

//           await Promise.allSettled(deletePromises);

//           if (deleteCount > 0) {
//             showStatusModal(
//               "Success",
//               `${deleteCount} notification(s) deleted`,
//               "success",
//             );
//           }

//           await fetchAndProcessData();
//         } catch (error) {
//           await fetchAndProcessData();
//           showStatusModal(
//             "Error",
//             "Failed to delete all notifications",
//             "error",
//           );
//         }
//       },
//       type: "delete-all",
//     });
//   }, [notifications, fetchAndProcessData, user]);

//   const unreadCount = notifications.filter((n) => !n.read).length;

//   // ============================================================
//   // USE EFFECT - INITIAL SETUP AND POLLING
//   // ============================================================
//   useEffect(() => {
//     try {
//       const token = localStorage.getItem("token");
//       const userDataStr = localStorage.getItem("user");

//       if (!token || !userDataStr) {
//         navigate("/");
//         return;
//       }

//       const userData = JSON.parse(userDataStr) as UserData;

//       if (!userData || !userData.role) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         navigate("/");
//         return;
//       }

//       setUser(userData);
//       setLoading(false);

//       const handleResize = () => {
//         setIsSidebarOpen(window.innerWidth >= 1024);
//       };

//       window.addEventListener("resize", handleResize);
//       handleResize();

//       fetchAndProcessData();

//       const interval = setInterval(fetchAndProcessData, 30000);

//       return () => {
//         window.removeEventListener("resize", handleResize);
//         clearInterval(interval);
//       };
//     } catch (error) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       navigate("/");
//     }
//   }, [navigate, fetchAndProcessData]);

//   // ============================================================
//   // HANDLE LOGOUT
//   // ============================================================
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("userName");
//     localStorage.removeItem("userEmail");
//     localStorage.removeItem("userRole");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("isUserMenuOpen");
//     localStorage.removeItem("isDashboardOpen");

//     setStatusModal({
//       isOpen: true,
//       type: "info",
//       title: "👋 Logged Out",
//       message: "You have been logged out successfully.",
//     });

//     window.location.href = "/";
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!user) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//         style={{ top: "4rem" }}
//       />

//       <Sidebar
//         user={user}
//         onLogout={handleLogout}
//         isOpen={isSidebarOpen}
//         onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
//         location={location}
//         onNotificationsClick={() => setIsNotificationsOpen(true)}
//         unreadCount={unreadCount}
//       />

//       <NotificationsModal
//         isOpen={isNotificationsOpen}
//         onClose={() => setIsNotificationsOpen(false)}
//         notifications={notifications}
//         onMarkAsRead={handleMarkAsRead}
//         onMarkAllAsRead={handleMarkAllAsRead}
//         onDelete={handleDelete}
//         onDeleteAll={handleDeleteAll}
//         onRefresh={handleRefresh}
//         isLoading={isRefreshing}
//         userRole={user?.role}
//       />

//       <ConfirmationModal
//         isOpen={confirmationModal.isOpen}
//         onClose={() =>
//           setConfirmationModal((prev) => ({ ...prev, isOpen: false }))
//         }
//         onConfirm={confirmationModal.onConfirm}
//         title={confirmationModal.title}
//         message={confirmationModal.message}
//         confirmText={confirmationModal.confirmText}
//         cancelText="Cancel"
//         confirmColor={confirmationModal.confirmColor}
//       />

//       <StatusModal
//         isOpen={statusModal.isOpen}
//         onClose={() => setStatusModal((prev) => ({ ...prev, isOpen: false }))}
//         title={statusModal.title}
//         message={statusModal.message}
//         type={statusModal.type}
//       />

//       <div
//         className={`transition-all duration-300 ${
//           isSidebarOpen ? "lg:ml-54 xl:ml-70 2xl:ml-80" : "ml-0"
//         }`}
//       >
//         <div className="p-3 sm:p-4 md:p-6 lg:p-8">{children}</div>
//       </div>
//     </div>
//   );
// };

// // ============================================================
// // PROTECTED ROUTE COMPONENT
// // ============================================================
// const ProtectedRoute = ({
//   children,
//   allowedRoles = [],
// }: {
//   children: React.ReactNode;
//   allowedRoles?: string[];
// }) => {
//   const token = localStorage.getItem("token");
//   const userDataStr = localStorage.getItem("user");
//   const userData = userDataStr ? (JSON.parse(userDataStr) as UserData) : null;

//   if (!token || !userData) {
//     return <Navigate to="/" replace />;
//   }

//   if (allowedRoles.length > 0 && !allowedRoles.includes(userData.role)) {
//     return <Navigate to="/" replace />;
//   }

//   return <>{children}</>;
// };

// // ============================================================
// // MAIN APP COMPONENT
// // ============================================================
// export default function App() {
//   const location = useLocation();

//   const isDashboardRoute =
//     location.pathname.startsWith("/dashboard") ||
//     location.pathname.startsWith("/user") ||
//     location.pathname.startsWith("/host") ||
//     location.pathname.startsWith("/manager");

//   return (
//     <div className="w-full">
//       <Navbar />
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/services" element={<Services />} />
//         <Route path="/faq" element={<FAQ />} />
//         <Route path="/help" element={<Help />} />
//         <Route path="/house/rent" element={<HouseOnRent />} />
//         <Route path="/testimonials" element={<Testimonials />} />
//         <Route
//           path="/verification/email/status"
//           element={<VerificationPage />}
//         />
//         <Route path="/reset-password" element={<ResetPassword />} />

//         {/* Admin Routes */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//               <DashboardLayout>
//                 <Dashboard />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard/houses"
//           element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//               <DashboardLayout>
//                 <HouseManagement />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard/users"
//           element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//               <DashboardLayout>
//                 <UserManagement />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard/team"
//           element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//               <DashboardLayout>
//                 <TeamMemberManagement />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard/bookings"
//           element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//               <DashboardLayout>
//                 <BookingManagement />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard/request"
//           element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//               <DashboardLayout>
//                 <RequestManagement />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard/logs"
//           element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//               <DashboardLayout>
//                 <ActionsManagement />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard/messages"
//           element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//               <DashboardLayout>
//                 <MessageManagement />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard/testimonials"
//           element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//               <DashboardLayout>
//                 <TestimonialManagement />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard/questions"
//           element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//               <DashboardLayout>
//                 <QuestionManagement />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         {/* User Routes */}
//         <Route
//           path="/user/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["user"]}>
//               <DashboardLayout>
//                 <UserDashboard />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/user/management"
//           element={
//             <ProtectedRoute allowedRoles={["user"]}>
//               <DashboardLayout>
//                 <MeManagement />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/user/bookings"
//           element={
//             <ProtectedRoute allowedRoles={["user"]}>
//               <DashboardLayout>
//                 <UserBookingManagement />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/user/requests"
//           element={
//             <ProtectedRoute allowedRoles={["user"]}>
//               <DashboardLayout>
//                 <UserRequestManagement />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/user/messages"
//           element={
//             <ProtectedRoute allowedRoles={["user"]}>
//               <DashboardLayout>
//                 <UserMessageManagement />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         {/* Host Routes */}
//         <Route
//           path="/host/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["host"]}>
//               <DashboardLayout>
//                 <HostDashboard />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/host/management"
//           element={
//             <ProtectedRoute allowedRoles={["host"]}>
//               <DashboardLayout>
//                 <HostManagement />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/host/bookings"
//           element={
//             <ProtectedRoute allowedRoles={["host"]}>
//               <DashboardLayout>
//                 <HostBookingManagement />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/host/clients"
//           element={
//             <ProtectedRoute allowedRoles={["host"]}>
//               <DashboardLayout>
//                 <HostClientManagement />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/host/requests"
//           element={
//             <ProtectedRoute allowedRoles={["host"]}>
//               <DashboardLayout>
//                 <HostRequestManagement />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/host/messages"
//           element={
//             <ProtectedRoute allowedRoles={["host"]}>
//               <DashboardLayout>
//                 <HostMessageManagement />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         {/* Manager Routes */}
//         <Route
//           path="/manager/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["manager"]}>
//               <DashboardLayout>
//                 <ManagersDashboard />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/manager/users"
//           element={
//             <ProtectedRoute allowedRoles={["manager"]}>
//               <DashboardLayout>
//                 <ManagerUserManagement />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/manager/questions"
//           element={
//             <ProtectedRoute allowedRoles={["manager"]}>
//               <DashboardLayout>
//                 <QuestionManagement />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/manager/bookings"
//           element={
//             <ProtectedRoute allowedRoles={["manager"]}>
//               <DashboardLayout>
//                 <ManagerBookingManagement />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/manager/houses"
//           element={
//             <ProtectedRoute allowedRoles={["manager"]}>
//               <DashboardLayout>
//                 <ManagerHouseManagement />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/manager/logs"
//           element={
//             <ProtectedRoute allowedRoles={["manager"]}>
//               <DashboardLayout>
//                 <ActivitiesManagement />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/manager/requests"
//           element={
//             <ProtectedRoute allowedRoles={["manager"]}>
//               <DashboardLayout>
//                 <ManagerRequestManagement />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/manager/messages"
//           element={
//             <ProtectedRoute allowedRoles={["manager"]}>
//               <DashboardLayout>
//                 <ManagerMessageManagement />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/manager/testimonials"
//           element={
//             <ProtectedRoute allowedRoles={["manager"]}>
//               <DashboardLayout>
//                 <ManagerTestimonialManagement />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

//         {/* 404 Routes */}
//         <Route path="/404" element={<NotFound />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//       {!isDashboardRoute && <Footer />}
//     </div>
//   );
// }










/* eslint-disable no-useless-assignment */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

// Material Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import HouseIcon from "@mui/icons-material/House";
import NotificationsIcon from "@mui/icons-material/Notifications";
import StarIcon from "@mui/icons-material/Star";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import HistoryIcon from "@mui/icons-material/History";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import CancelIcon from "@mui/icons-material/Cancel";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import RefreshIcon from "@mui/icons-material/Refresh";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import {
  HouseRounded,
  Info,
  LoginSharp,
  People,
  TextSnippet,
} from "@mui/icons-material";

// Components
import { Dashboard } from "./components/dashboard/admin/Dashboard";
import { Home } from "./pages/home/Home";
import { About } from "./pages/about/About";
import { Services } from "./pages/services/Services";
import { NotFound } from "./pages/notfound/NotFound";
import { FAQ } from "./components/faq/FAQ";
import { Help } from "./components/faq/Help";
import { Navbar } from "./components/navbar/Navbar";
import { Footer } from "./components/footer/Footer";
import { UserManagement } from "./components/dashboard/admin/components/users/UserManagement";
import { RequestManagement } from "./components/dashboard/admin/components/request/RequestManagement";
import { MessageManagement } from "./components/dashboard/admin/components/messages/MessageManagement";
import { BookingManagement } from "./components/dashboard/admin/components/bookings/BookingManagement";
import { UserDashboard } from "./components/dashboard/users/UserDashboard";
import { HostDashboard } from "./components/dashboard/host/HostDashboard";
import { MeManagement } from "./components/dashboard/users/components/me/MeManagement";
import { UserBookingManagement } from "./components/dashboard/users/components/bookings/UserBookingManagement";
import { UserRequestManagement } from "./components/dashboard/users/components/request/UserRequestManagement";
import { UserMessageManagement } from "./components/dashboard/users/components/messages/UserMessageManagement";
import { HostBookingManagement } from "./components/dashboard/host/components/bookings/HostBookingManagement";
import { HostRequestManagement } from "./components/dashboard/host/components/requests/HostRequestManagement";
import { HostMessageManagement } from "./components/dashboard/host/components/messages/HostMessageManagement";
import { HostManagement } from "./components/dashboard/host/components/host/HostManagement";
import { HouseOnRent } from "./pages/houses/HouseOnRent";
import { Testimonials } from "./pages/testimonials/Testimonials";
import { TeamMemberManagement } from "./components/dashboard/admin/components/team/TeamManagemnt";
import axios from "axios";
import { TestimonialManagement } from "./components/dashboard/admin/components/testimonials/TestimonialManagement";
import { VerificationPage } from "./components/verify/Verification";
import { HouseManagement } from "./components/dashboard/admin/components/house/HouseManagement";
import { ManagersDashboard } from "./components/dashboard/managers/ManagerDashboard";
import { ManagerUserManagement } from "./components/dashboard/managers/components/users/ManagerUserManagement";
import { ManagerBookingManagement } from "./components/dashboard/managers/components/bookings/ManagerBookingManagement";
import { ManagerHouseManagement } from "./components/dashboard/managers/components/houses/ManagerHouseManagement";
import { ManagerMessageManagement } from "./components/dashboard/managers/components/messages/ManagerMessagesManagement";
import { ManagerTestimonialManagement } from "./components/dashboard/managers/components/testimonials/ManagerTestimonialManagement";
import { ManagerRequestManagement } from "./components/dashboard/managers/components/request/ManagerRequestManagement";
import { ActivitiesManagement } from "./components/changes/manager/ActivitiesManagement";
import { ActionsManagement } from "./components/changes/admin/ActionsManagementView";
import { HostClientManagement } from "./components/dashboard/host/components/client/HostClientManagement";
import { QuestionManagement } from "./components/dashboard/admin/components/question/QuestionManagement";
import { ResetPassword } from "./components/verify/ResetPassword";


// Translations for UI text
const translations = {
  en: {
    inyumba: "Inyumba",
    adminPanel: "Admin Panel",
    hostPanel: "Host Panel",
    managerPanel: "Manager Panel",
    userPanel: "User Panel",
    dashboard: "Dashboard",
    users: "Users",
    team: "Team",
    bookings: "Bookings",
    requests: "Requests",
    houses: "Houses",
    messages: "Messages",
    testimonials: "Testimonials",
    logs: "Logs",
    question: "Question",
    myProfile: "My Profile",
    myBookings: "My Bookings",
    myRequests: "My Requests",
    myMessages: "My Messages",
    housesLabel: "Houses",
    clients: "Occupied house",
    logout: "Logout",
    notifications: "Notifications",
    noNotifications: "No notifications yet",
    newNotificationsHere: "New notifications will appear here",
    loadingNotifications: "Loading notifications...",
    markAllAsRead: "Mark all as read",
    readAll: "Read all",
    deleteAll: "Delete all",
    delete: "Delete",
    markAsRead: "Mark as read",
    unread: "Unread",
    new: "New",
    copies: "copies",
    showing: "Showing",
    notification: "notification",
    notificationsCount: "notifications",
    unreadCount: "unread",
    confirmDelete: "Delete Notification",
    confirmDeleteMessage: "Are you sure you want to delete this notification? This action cannot be undone.",
    confirmDeleteAll: "Delete All Notifications",
    confirmDeleteAllMessage: "Are you sure you want to delete all {count} notifications? This action cannot be undone.",
    confirmBulkDelete: "Delete {count} Duplicate Notifications",
    confirmBulkDeleteMessage: "This notification has {count} copies. They will all be deleted automatically.",
    cancel: "Cancel",
    success: "Success",
    error: "Error",
    info: "Info",
    permissionDenied: "Permission Denied",
    noPermission: "You do not have permission to delete notifications",
    loggedOut: "Logged Out",
    loggedOutMessage: "You have been logged out successfully.",
    loadingDashboard: "Loading dashboard...",
    dataLoaded: "Data loaded successfully!",
    failedToFetch: "Failed to fetch data",
    refresh: "Refresh",
    export: "Export",
    print: "Print",
    total: "total",
    housesLabelShort: "houses",
    guests: "guests",
    newUsers: "new users",
    topRatedHouses: "Top Rated Houses",
    houseDistributionByProvince: "House Distribution by Province",
    exporting: "Exporting data...",
    noUsersFound: "No users found",
    noRecentActivity: "No recent activity",
    justNow: "Just now",
    daysAgo: "d ago",
    hoursAgo: "h ago",
    minutesAgo: "m ago",
    activeUserAccountCreated: "Active user account created",
    userAccountCreatedInactive: "User account created (inactive)",
    totalBookingsCount: "{count} total bookings",
    newUsersCount: "+{count} new users",
    activeUsersLabel: "Active users",
  },
  fr: {
    inyumba: "Inyumba",
    adminPanel: "Panneau Admin",
    hostPanel: "Panneau Hôte",
    managerPanel: "Panneau Gestionnaire",
    userPanel: "Panneau Utilisateur",
    dashboard: "Tableau de Bord",
    users: "Utilisateurs",
    team: "Équipe",
    bookings: "Réservations",
    requests: "Demandes",
    houses: "Maisons",
    messages: "Messages",
    testimonials: "Témoignages",
    logs: "Journaux",
    question: "Question",
    myProfile: "Mon Profil",
    myBookings: "Mes Réservations",
    myRequests: "Mes Demandes",
    myMessages: "Mes Messages",
    housesLabel: "Maisons",
    clients: "Maison occupée",
    logout: "Déconnexion",
    notifications: "Notifications",
    noNotifications: "Aucune notification",
    newNotificationsHere: "Les nouvelles notifications apparaîtront ici",
    loadingNotifications: "Chargement des notifications...",
    markAllAsRead: "Tout marquer comme lu",
    readAll: "Tout lire",
    deleteAll: "Tout supprimer",
    delete: "Supprimer",
    markAsRead: "Marquer comme lu",
    unread: "Non lu",
    new: "Nouveau",
    copies: "copies",
    showing: "Affichage",
    notification: "notification",
    notificationsCount: "notifications",
    unreadCount: "non lus",
    confirmDelete: "Supprimer la Notification",
    confirmDeleteMessage: "Êtes-vous sûr de vouloir supprimer cette notification ? Cette action est irréversible.",
    confirmDeleteAll: "Supprimer Toutes les Notifications",
    confirmDeleteAllMessage: "Êtes-vous sûr de vouloir supprimer toutes les {count} notifications ? Cette action est irréversible.",
    confirmBulkDelete: "Supprimer {count} Notifications Dupliquées",
    confirmBulkDeleteMessage: "Cette notification a {count} copies. Elles seront toutes supprimées automatiquement.",
    cancel: "Annuler",
    success: "Succès",
    error: "Erreur",
    info: "Info",
    permissionDenied: "Permission Refusée",
    noPermission: "Vous n'avez pas la permission de supprimer les notifications",
    loggedOut: "Déconnecté",
    loggedOutMessage: "Vous avez été déconnecté avec succès.",
    loadingDashboard: "Chargement du tableau de bord...",
    dataLoaded: "Données chargées avec succès !",
    failedToFetch: "Échec du chargement des données",
    refresh: "Rafraîchir",
    export: "Exporter",
    print: "Imprimer",
    total: "total",
    housesLabelShort: "maisons",
    guests: "invités",
    newUsers: "nouveaux utilisateurs",
    topRatedHouses: "Maisons les Mieux Notées",
    houseDistributionByProvince: "Distribution des Maisons par Province",
    exporting: "Exportation des données...",
    noUsersFound: "Aucun utilisateur trouvé",
    noRecentActivity: "Aucune activité récente",
    justNow: "À l'instant",
    daysAgo: "j",
    hoursAgo: "h",
    minutesAgo: "min",
    activeUserAccountCreated: "Compte utilisateur actif créé",
    userAccountCreatedInactive: "Compte utilisateur créé (inactif)",
    totalBookingsCount: "{count} réservations au total",
    newUsersCount: "+{count} nouveaux utilisateurs",
    activeUsersLabel: "Utilisateurs actifs",
  },
  rw: {
    inyumba: "Inyumba",
    adminPanel: "Ubuyobozi",
    hostPanel: "Akarere k'Umukoresha",
    managerPanel: "Akarere k'Umuyobozi",
    userPanel: "Akarere k'Umukoresha",
    dashboard: "Ibikorwa",
    users: "Abakoresha",
    team: "Ikipe",
    bookings: "Ibyanditswe",
    requests: "Ibisabwa",
    houses: "Amazu",
    messages: "Ubutumwa",
    testimonials: "Ubuhamya",
    logs: "Ibyakozwe",
    question: "Ikibazo",
    myProfile: "Indangamuntu",
    myBookings: "Ibyanditswe Byanjye",
    myRequests: "Ibisabwa Byanjye",
    myMessages: "Ubutumwa Bwanjye",
    housesLabel: "Amazu",
    clients: "Inzu y'Abakoresha",
    logout: "Sohoka",
    notifications: "Imenyesha",
    noNotifications: "Nta menyesha",
    newNotificationsHere: "Imenyesha nshya zizagaragara hano",
    loadingNotifications: "Imenyesha zirakururwa...",
    markAllAsRead: "Zose zisomwe",
    readAll: "Soma Zose",
    deleteAll: "Siba Zose",
    delete: "Siba",
    markAsRead: "Soma",
    unread: "Ntizisomwe",
    new: "Nshya",
    copies: "kopi",
    showing: "Kwerekana",
    notification: "imenyesha",
    notificationsCount: "imenyesha",
    unreadCount: "ntizisomwe",
    confirmDelete: "Siba Imenyesha",
    confirmDeleteMessage: "Uri gushaka niba ushaka gusiba iyi menyesha? Iyi nkora ntishobora gusubizwa.",
    confirmDeleteAll: "Siba Imenyesha Zose",
    confirmDeleteAllMessage: "Uri gushaka niba ushaka gusiba {count} imenyesha zose? Iyi nkora ntishobora gusubizwa.",
    confirmBulkDelete: "Siba {count} Imenyesha Zikubiyemo",
    confirmBulkDeleteMessage: "Iyi menyesha ifite {count} kopi. Zose zizasibwa mu buryo bwihuse.",
    cancel: "Hagarika",
    success: "Byagenze Neza",
    error: "Ikosa",
    info: "Amakuru",
    permissionDenied: "Ntabwo Uruhushya",
    noPermission: "Ntabwo ufite uruhushya rwo gusiba imenyesha",
    loggedOut: "Wasohotse",
    loggedOutMessage: "Wasohotse neza.",
    loadingDashboard: "Ibikorwa birakururwa...",
    dataLoaded: "Amakuru yakuwe neza!",
    failedToFetch: "Amakuru ntabwo yakuwe",
    refresh: "Vugurura",
    export: "Kuvanamo",
    print: "Capa",
    total: "byose",
    housesLabelShort: "amazu",
    guests: "abashyitsi",
    newUsers: "abakoresha bashya",
    topRatedHouses: "Amazu Afite Ibipimo Byinshi",
    houseDistributionByProvince: "Ibyiciro by'Amazu mu Ntara",
    exporting: "Amakuru arimo gusohoka...",
    noUsersFound: "Nta bakoresha babonetse",
    noRecentActivity: "Nta bikorwa vubi",
    justNow: "Ubu",
    daysAgo: "iminsi ishize",
    hoursAgo: "amasaha ishize",
    minutesAgo: "iminota ishize",
    activeUserAccountCreated: "Konti y'umukoresha ikora yaremwe",
    userAccountCreatedInactive: "Konti y'umukoresha yaremwe (ntikora)",
    totalBookingsCount: "{count} ibyanditswe byose",
    newUsersCount: "+{count} abakoresha bashya",
    activeUsersLabel: "Abakoresha bakora",
  },
};

// Types
interface UserData {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "host" | "manager";
}

// Unified Notification
interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
  source:
    | "house"
    | "booking"
    | "contact"
    | "request"
    | "user"
    | "activity"
    | "testimonial"
    | "question";
  data?: any;
  groupKey?: string;
  duplicateCount?: number;
  allIds?: string[];
}

// Helper function to get language from cookies
const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
  const lang = Cookies.get("language") as "en" | "fr" | "rw";
  return lang || "en";
};

// API endpoints
const API_BASE_URL = "https://inyumbaproject.eu1.hubfly.app";

// ============================================================
// NOTIFICATION API ENDPOINTS
// ============================================================
const API_ENDPOINTS = {
  notifications: `${API_BASE_URL}/auth/notifications`,
  notificationsByEmail: (email: string) =>
    `${API_BASE_URL}/auth/notifications/email/${email}`,
  notificationRead: (id: string) =>
    `${API_BASE_URL}/auth/notifications/${id}/read`,
  notificationBulkRead: `${API_BASE_URL}/auth/notifications/bulk-read`,
  notificationDelete: (id: string) =>
    `${API_BASE_URL}/auth/notifications/${id}`,
  notificationBulkDelete: `${API_BASE_URL}/auth/notifications/bulk`,
  activityDelete: (id: string) => `${API_BASE_URL}/auth/notifications/${id}`,
  bookingNotifications: `${API_BASE_URL}/bookings/notifications`,
  bookingNotificationsByEmail: (email: string) =>
    `${API_BASE_URL}/bookings/notifications/email/${email}`,
  bookingNotificationRead: (id: string) =>
    `${API_BASE_URL}/bookings/notifications/${id}/read`,
  bookingNotificationMarkAllRead: `${API_BASE_URL}/bookings/notifications/mark-all-read`,
  bookingNotificationDelete: (id: string) =>
    `${API_BASE_URL}/bookings/notifications/${id}`,
  contactNotifications: `${API_BASE_URL}/contact/notifications`,
  contactNotificationsByEmail: (email: string) =>
    `${API_BASE_URL}/contact/notifications/${email}`,
  contactNotificationRead: (id: string) =>
    `${API_BASE_URL}/contact/notifications/${id}/read`,
  contactNotificationMarkAllRead: `${API_BASE_URL}/contact/notifications/mark-all-read`,
  contactNotificationDelete: (id: string) =>
    `${API_BASE_URL}/contact/notifications/${id}`,
  houseNotifications: `${API_BASE_URL}/houses/notifications`,
  houseNotificationsByEmail: (email: string) =>
    `${API_BASE_URL}/houses/notifications/${email}`,
  houseUnreadCount: `${API_BASE_URL}/houses/notifications/unread-count`,
  houseNotificationRead: (id: string) =>
    `${API_BASE_URL}/houses/notifications/${id}/read`,
  houseNotificationMarkAllRead: `${API_BASE_URL}/houses/notifications/mark-all-read`,
  houseNotificationDelete: (id: string) =>
    `${API_BASE_URL}/houses/notifications/${id}`,
  houseNotificationBulkDelete: `${API_BASE_URL}/houses/notifications/bulk`,
  requestNotifications: `${API_BASE_URL}/requests/notifications`,
  requestNotificationsByEmail: (email: string) =>
    `${API_BASE_URL}/requests/notifications/${email}`,
  requestNotificationRead: (id: string) =>
    `${API_BASE_URL}/requests/notifications/${id}/read`,
  requestNotificationMarkAllRead: (id: string) =>
    `${API_BASE_URL}/requests/notifications/${id}/mark-all-read`,
  requestNotificationDelete: (id: string) =>
    `${API_BASE_URL}/requests/notifications/${id}`,
  testimonials: `${API_BASE_URL}/testimonials`,
  testimonialNotificationRead: (id: string) =>
    `${API_BASE_URL}/testimonials/notifications/${id}/read`,
  testimonialNotificationDelete: (id: string) =>
    `${API_BASE_URL}/testimonials/notifications/${id}`,
  questionNotifications: `${API_BASE_URL}/questions/notifications`,
  questionNotificationsByEmail: (email: string) =>
    `${API_BASE_URL}/questions/notifications/email/${email}`,
  questionNotificationRead: (id: string) =>
    `${API_BASE_URL}/questions/notifications/${id}/read`,
  questionNotificationDelete: (id: string) =>
    `${API_BASE_URL}/questions/notifications/${id}`,
};

// ============================================================
// NOTIFICATION COMPONENTS
// ============================================================

const getSourceIcon = (source: Notification["source"]) => {
  switch (source) {
    case "house":
      return <HouseIcon className="w-5 h-5 text-green-500" />;
    case "booking":
      return <BookmarkIcon className="w-5 h-5 text-blue-500" />;
    case "contact":
      return <ContactMailIcon className="w-5 h-5 text-orange-500" />;
    case "request":
      return <TrendingUpIcon className="w-5 h-5 text-purple-500" />;
    case "testimonial":
      return <StarIcon className="w-5 h-5 text-yellow-500" />;
    case "user":
      return <PersonIcon className="w-5 h-5 text-purple-500" />;
    case "activity":
      return <HistoryIcon className="w-5 h-5 text-indigo-500" />;
    case "question":
      return <QuestionAnswerIcon className="w-5 h-5 text-teal-500" />;
    default:
      return <NotificationsIcon className="w-5 h-5 text-gray-500" />;
  }
};

const getSourceLabel = (source: Notification["source"]) => {
  return source.charAt(0).toUpperCase() + source.slice(1);
};

const getSourceColor = (source: Notification["source"]) => {
  switch (source) {
    case "house":
      return "border-green-200 bg-green-50";
    case "booking":
      return "border-blue-200 bg-blue-50";
    case "contact":
      return "border-orange-200 bg-orange-50";
    case "request":
      return "border-purple-200 bg-purple-50";
    case "testimonial":
      return "border-yellow-200 bg-yellow-50";
    case "user":
      return "border-purple-200 bg-purple-50";
    case "activity":
      return "border-indigo-200 bg-indigo-50";
    case "question":
      return "border-teal-200 bg-teal-50";
    default:
      return "border-gray-200 bg-gray-50";
  }
};

// ============================================================
// CONFIRMATION MODAL
// ============================================================
const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "bg-red-600",
  icon = <WarningIcon className="w-12 h-12 text-red-500" />,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
  icon?: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1100]"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[1101] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-300">
          <div className="text-center">
            <div className="flex justify-center mb-4">{icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                className={`px-6 py-2.5 text-white rounded-lg hover:opacity-90 transition-opacity font-medium ${confirmColor}`}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ============================================================
// STATUS MODAL
// ============================================================
const StatusModal = ({
  isOpen,
  onClose,
  title,
  message,
  type = "success",
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: "success" | "error" | "info";
}) => {
  if (!isOpen) return null;

  const isSuccess = type === "success";
  const isInfo = type === "info";
  const icon = isSuccess ? (
    <CheckCircleIcon className="w-12 h-12 text-green-500" />
  ) : isInfo ? (
    <Info className="w-12 h-12 text-blue-500" />
  ) : (
    <CancelIcon className="w-12 h-12 text-red-500" />
  );
  const bgColor = isSuccess
    ? "bg-green-50 border-green-200"
    : isInfo
      ? "bg-blue-50 border-blue-200"
      : "bg-red-50 border-red-200";
  const buttonColor = isSuccess
    ? "bg-green-600"
    : isInfo
      ? "bg-blue-600"
      : "bg-red-600";

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1100]"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[1101] flex items-center justify-center p-4">
        <div
          className={`bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 border-2 ${bgColor} animate-in fade-in zoom-in duration-300`}
        >
          <div className="text-center">
            <div className="flex justify-center mb-4">{icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600 mb-6">{message}</p>
            <button
              onClick={onClose}
              className={`px-6 py-2.5 text-white rounded-lg hover:opacity-90 transition-opacity font-medium ${buttonColor}`}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// ============================================================
// NOTIFICATIONS MODAL - RESPONSIVE VERSION
// ============================================================
const NotificationsModal = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onDeleteAll,
  onRefresh,
  isLoading = false,
  userRole,
  t,
}: {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDelete: (id: string) => void;
  onDeleteAll: () => void;
  onRefresh: () => void;
  isLoading?: boolean;
  userRole?: string;
  t: any;
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;
  const canDelete = userRole === "admin" || userRole === "manager";

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-2 sm:p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-300 mx-2 sm:mx-4">
          {/* Header - Responsive */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl gap-3 sm:gap-0">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
                <NotificationsIcon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
                {t.notifications}
              </h2>
              {unreadCount > 0 && (
                <p className="text-xs sm:text-sm text-blue-600 mt-1">
                  {unreadCount} {t.unreadCount} {t.notification}{unreadCount > 1 ? "s" : ""}
                </p>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <button
                onClick={onRefresh}
                disabled={isLoading}
                className={`p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                title={t.refresh}
              >
                <RefreshIcon
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${isLoading ? "animate-spin" : ""}`}
                />
              </button>

              {unreadCount > 0 && (
                <button
                  onClick={onMarkAllAsRead}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-1 sm:gap-2"
                >
                  <CheckCircleIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">{t.markAllAsRead}</span>
                  <span className="xs:hidden">{t.readAll}</span>
                </button>
              )}
              {canDelete && notifications.length > 0 && (
                <button
                  onClick={onDeleteAll}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-1 sm:gap-2"
                >
                  <DeleteIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">{t.deleteAll}</span>
                  <span className="xs:hidden">{t.delete}</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <CloseIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Notifications List - Responsive */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6">
            {isLoading ? (
              <div className="text-center py-8 sm:py-12">
                <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-500">
                  {t.loadingNotifications}
                </p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <NotificationsIcon className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
                </div>
                <p className="text-lg sm:text-xl text-gray-500 font-medium">
                  {t.noNotifications}
                </p>
                <p className="text-xs sm:text-sm text-gray-400 mt-2">
                  {t.newNotificationsHere}
                </p>
              </div>
            ) : (
              <div className="grid gap-3 sm:gap-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 sm:p-5 rounded-xl border-2 transition-all ${
                      notification.read
                        ? "bg-white border-gray-200"
                        : `${getSourceColor(notification.source)} border-2`
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                      <div className="flex-shrink-0 mt-0 sm:mt-1">
                        {getSourceIcon(notification.source)}
                      </div>

                      <div className="flex-1 min-w-0 w-full">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded-full ${
                              notification.read
                                ? "bg-gray-100 text-gray-600"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {getSourceLabel(notification.source)}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(
                              notification.createdAt,
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          {!notification.read && (
                            <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                              {t.new}
                            </span>
                          )}
                          {notification.duplicateCount &&
                            notification.duplicateCount > 1 && (
                              <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded-full">
                                {notification.duplicateCount} {t.copies}
                              </span>
                            )}
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                          {notification.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        {notification.duplicateCount &&
                          notification.duplicateCount > 1 && (
                            <p className="text-xs text-purple-600 mt-1">
                              This notification has{" "}
                              {notification.duplicateCount} copies. Actions will
                              apply to all copies.
                            </p>
                          )}
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-end sm:justify-start">
                        {!notification.read && (
                          <button
                            onClick={() => onMarkAsRead(notification.id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title={
                              notification.duplicateCount &&
                              notification.duplicateCount > 1
                                ? `Mark all ${notification.duplicateCount} copies as read`
                                : t.markAsRead
                            }
                          >
                            <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        )}
                        {canDelete && (
                          <button
                            onClick={() => onDelete(notification.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title={
                              notification.duplicateCount &&
                              notification.duplicateCount > 1
                                ? `Delete all ${notification.duplicateCount} copies`
                                : t.delete
                            }
                          >
                            <DeleteIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer - Responsive */}
          {notifications.length > 0 && !isLoading && (
            <div className="p-3 sm:p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              <p className="text-xs sm:text-sm text-gray-500 text-center">
                {t.showing} {notifications.length} {t.notification}
                {notifications.length > 1 ? "s" : ""}
                {unreadCount > 0 && ` • ${unreadCount} ${t.unreadCount}`}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// ============================================================
// SIDEBAR COMPONENT
// ============================================================
const Sidebar = ({
  user,
  onLogout,
  isOpen,
  onToggle,
  location,
  onNotificationsClick,
  unreadCount,
  t,
}: {
  user: UserData | null;
  onLogout: () => void;
  isOpen: boolean;
  onToggle: () => void;
  location: any;
  onNotificationsClick: () => void;
  unreadCount: number;
  t: any;
}) => {
  const navigate = useNavigate();

  const adminMenuItems = [
    { id: "dashboard", label: t.dashboard, icon: <DashboardIcon /> },
    { id: "users", label: t.users, icon: <PeopleIcon /> },
    { id: "team", label: t.team, icon: <PeopleIcon /> },
    { id: "bookings", label: t.bookings, icon: <AttachMoneyIcon /> },
    { id: "requests", label: t.requests, icon: <TrendingUpIcon /> },
    { id: "houses", label: t.houses, icon: <HouseRounded /> },
    { id: "messages", label: t.messages, icon: <EmailIcon /> },
    { id: "testimonials", label: t.testimonials, icon: <TextSnippet /> },
    { id: "logs", label: t.logs, icon: <LoginSharp /> },
    { id: "question", label: t.question, icon: <QuestionAnswerIcon /> },
  ];

  const userMenuItems = [
    { id: "dashboard", label: t.dashboard, icon: <DashboardIcon /> },
    { id: "profile", label: t.myProfile, icon: <PersonIcon /> },
    { id: "bookings", label: t.myBookings, icon: <AttachMoneyIcon /> },
    { id: "requests", label: t.myRequests, icon: <TrendingUpIcon /> },
    { id: "messages", label: t.myMessages, icon: <EmailIcon /> },
  ];

  const hostMenuItems = [
    { id: "dashboard", label: t.dashboard, icon: <DashboardIcon /> },
    { id: "houses", label: t.housesLabel, icon: <HouseIcon /> },
    { id: "bookings", label: t.bookings, icon: <AttachMoneyIcon /> },
    { id: "clients", label: t.clients, icon: <People /> },
  ];

  const managerMenuItems = [
    { id: "dashboard", label: t.dashboard, icon: <DashboardIcon /> },
    { id: "users", label: t.users, icon: <PeopleIcon /> },
    { id: "bookings", label: t.bookings, icon: <AttachMoneyIcon /> },
    { id: "houses", label: t.houses, icon: <HouseRounded /> },
    { id: "messages", label: t.messages, icon: <EmailIcon /> },
    { id: "testimonials", label: t.testimonials, icon: <TextSnippet /> },
    { id: "requests", label: t.requests, icon: <TrendingUpIcon /> },
    { id: "logs", label: t.logs, icon: <LoginSharp /> },
    { id: "question", label: t.question, icon: <QuestionAnswerIcon /> },
  ];

  const getMenuItems = () => {
    if (user?.role === "admin") return adminMenuItems;
    if (user?.role === "host") return hostMenuItems;
    if (user?.role === "manager") return managerMenuItems;
    return userMenuItems;
  };

  const getItemPath = (itemId: string) => {
    if (user?.role === "admin") {
      const pathMap: Record<string, string> = {
        dashboard: "/dashboard",
        users: "/dashboard/users",
        team: "/dashboard/team",
        bookings: "/dashboard/bookings",
        houses: "/dashboard/houses",
        requests: "/dashboard/request",
        messages: "/dashboard/messages",
        testimonials: "/dashboard/testimonials",
        logs: "/dashboard/logs",
        question: "/dashboard/questions",
      };
      return pathMap[itemId] || "/dashboard";
    } else if (user?.role === "user") {
      const pathMap: Record<string, string> = {
        dashboard: "/user/dashboard",
        profile: "/user/management",
        bookings: "/user/bookings",
        requests: "/user/requests",
        messages: "/user/messages",
        favorites: "/user/favorites",
      };
      return pathMap[itemId] || "/user/dashboard";
    } else if (user?.role === "host") {
      const pathMap: Record<string, string> = {
        dashboard: "/host/dashboard",
        houses: "/host/management",
        bookings: "/host/bookings",
        clients: "/host/clients",
      };
      return pathMap[itemId] || "/host/dashboard";
    } else if (user?.role === "manager") {
      const pathMap: Record<string, string> = {
        dashboard: "/manager/dashboard",
        users: "/manager/users",
        bookings: "/manager/bookings",
        houses: "/manager/houses",
        messages: "/manager/messages",
        testimonials: "/manager/testimonials",
        requests: "/manager/requests",
        logs: "/manager/logs",
        question: "/manager/questions",
      };
      return pathMap[itemId] || "/manager/dashboard";
    }
    return "/dashboard";
  };

  const getPanelLabel = () => {
    if (user?.role === "admin") return t.adminPanel;
    if (user?.role === "host") return t.hostPanel;
    if (user?.role === "manager") return t.managerPanel;
    return t.userPanel;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  const menuItems = getMenuItems();

  return (
    <>
      <button
        onClick={onToggle}
        className={`lg:hidden fixed z-50 p-2.5 bg-white rounded-xl shadow-lg hover:bg-gray-50 transition-all duration-200 ${
          isOpen ? "top-4 left-4" : "top-20 left-4"
        }`}
        style={{
          top: isOpen ? "1rem" : "5rem",
          left: "1rem",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        {isOpen ? (
          <CloseIcon className="w-6 h-6 text-gray-700" />
        ) : (
          <MenuIcon className="w-6 h-6 text-gray-700" />
        )}
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64 sm:w-72 md:w-80 lg:w-64 xl:w-72 2xl:w-80`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 sm:p-5 md:p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl flex-shrink-0">
                <HomeIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold text-gray-800 truncate">
                  {t.inyumba}
                </h1>
                <p className="text-xs text-gray-500 truncate">
                  {getPanelLabel()}
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 sm:p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <PersonIcon className="text-white text-sm sm:text-base" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                <span className="text-xs text-blue-600 font-medium capitalize">
                  {user?.role}
                </span>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-3 sm:p-4 overflow-y-auto">
            {menuItems.map((item) => {
              const itemPath = getItemPath(item.id);
              const isActive = location.pathname === itemPath;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(itemPath)}
                  className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all duration-200 mb-1 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="w-5 h-5 flex-shrink-0">{item.icon}</span>
                  <span className="font-medium text-sm sm:text-base truncate">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="p-3 sm:p-4 border-t border-gray-200 space-y-2">
            <button
              onClick={onNotificationsClick}
              className="w-full flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-200 relative"
            >
              <NotificationsIcon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium text-sm sm:text-base">
                {t.notifications}
              </span>
              {unreadCount > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                onLogout();
                onToggle();
              }}
              className="w-full bg-gradient-to-t from-red-400 to-red-600 flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
            >
              <LogoutIcon className="w-5 h-5 text-white flex-shrink-0" />
              <span className="font-medium text-sm text-white sm:text-base">
                {t.logout}
              </span>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
};

// ============================================================
// DASHBOARD LAYOUT WITH NOTIFICATIONS
// ============================================================
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lang, setLang] = useState<"en" | "fr" | "rw">(
    getLanguageFromCookies(),
  );

  const [confirmationModal, setConfirmationModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    confirmColor: string;
    onConfirm: () => void;
    type: "delete" | "delete-all";
    duplicateIds?: string[];
  }>({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "Confirm",
    confirmColor: "bg-red-600",
    onConfirm: () => {},
    type: "delete",
  });

  const [statusModal, setStatusModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "success" | "error" | "info";
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "success",
  });

  const previousDataRef = useRef<{
    notifications: any[];
  }>({
    notifications: [],
  });

  const t = translations[lang];

  // Listen for language changes in cookies
  useEffect(() => {
    const handleCookieChange = () => {
      const newLang = getLanguageFromCookies();
      if (newLang !== lang) {
        setLang(newLang);
      }
    };

    const interval = setInterval(handleCookieChange, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  // ============================================================
  // FETCH NOTIFICATIONS FROM ALL SOURCES
  // ============================================================

  const fetchAuthNotifications = useCallback(async (userData: UserData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return [];

      let url = "";
      if (userData.role === "admin" || userData.role === "manager") {
        url = API_ENDPOINTS.notifications;
      } else {
        url = API_ENDPOINTS.notificationsByEmail(userData.email);
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data?.success && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      if (Array.isArray(response.data)) {
        return response.data;
      }
      return [];
    } catch (error) {
      return [];
    }
  }, []);

  const fetchBookingNotifications = useCallback(async (userData: UserData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return [];

      let url = "";
      if (
        userData.role === "admin" ||
        userData.role === "manager" ||
        userData.role === "host"
      ) {
        url = API_ENDPOINTS.bookingNotifications;
      } else {
        url = API_ENDPOINTS.bookingNotificationsByEmail(userData.email);
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (
        response.data?.success &&
        Array.isArray(response.data.notifications)
      ) {
        return response.data.notifications;
      }
      if (response.data?.success && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      if (Array.isArray(response.data)) {
        return response.data;
      }
      return [];
    } catch (error) {
      return [];
    }
  }, []);

  const fetchHouseNotifications = useCallback(async (userData: UserData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return [];

      let url = "";
      if (userData.role === "admin" || userData.role === "manager") {
        url = API_ENDPOINTS.houseNotifications;
      } else {
        url = API_ENDPOINTS.houseNotificationsByEmail(userData.email);
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data?.success && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      if (
        response.data?.success &&
        Array.isArray(response.data.notifications)
      ) {
        return response.data.notifications;
      }
      if (Array.isArray(response.data)) {
        return response.data;
      }
      return [];
    } catch (error) {
      return [];
    }
  }, []);

  const fetchContactNotifications = useCallback(async (userData: UserData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return [];

      let url = "";
      if (userData.role === "admin" || userData.role === "manager") {
        url = API_ENDPOINTS.contactNotifications;
      } else {
        url = API_ENDPOINTS.contactNotificationsByEmail(userData.email);
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data?.success && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      if (Array.isArray(response.data)) {
        return response.data;
      }
      return [];
    } catch (error) {
      return [];
    }
  }, []);

  const fetchRequestNotifications = useCallback(async (userData: UserData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return [];

      let url = "";
      if (userData.role === "admin" || userData.role === "manager") {
        url = API_ENDPOINTS.requestNotifications;
      } else {
        url = API_ENDPOINTS.requestNotificationsByEmail(userData.email);
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data?.success && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      if (Array.isArray(response.data)) {
        return response.data;
      }
      return [];
    } catch (error) {
      return [];
    }
  }, []);

  const fetchTestimonialNotifications = useCallback(
    async (userData: UserData) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return [];

        const response = await axios.get(API_ENDPOINTS.testimonials, {
          headers: { Authorization: `Bearer ${token}` },
        });

        let data = [];
        if (response.data?.success && Array.isArray(response.data.data)) {
          data = response.data.data;
        } else if (Array.isArray(response.data)) {
          data = response.data;
        } else {
          return [];
        }

        if (userData.role === "user" || userData.role === "host") {
          return data.filter(
            (notif: any) =>
              notif.userEmail === userData.email ||
              notif.email === userData.email,
          );
        }

        return data;
      } catch (error) {
        return [];
      }
    },
    [],
  );

  const fetchQuestionNotifications = useCallback(async (userData: UserData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return [];

      let url = "";
      if (userData.role === "admin" || userData.role === "manager") {
        url = API_ENDPOINTS.questionNotifications;
      } else {
        url = API_ENDPOINTS.questionNotificationsByEmail(userData.email);
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      let data = [];
      if (response.data?.success && Array.isArray(response.data.data)) {
        data = response.data.data;
      } else if (
        response.data?.success &&
        Array.isArray(response.data.notifications)
      ) {
        data = response.data.notifications;
      } else if (Array.isArray(response.data)) {
        data = response.data;
      } else {
        return [];
      }

      return data;
    } catch (error) {
      return [];
    }
  }, []);

  // ============================================================
  // FETCH ALL NOTIFICATIONS - COMBINED
  // ============================================================
  const fetchAllNotifications = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const userDataStr = localStorage.getItem("user");
      const userData = userDataStr ? JSON.parse(userDataStr) : null;

      if (!token || !userData) return [];

      const [
        authNotifs,
        bookingNotifs,
        houseNotifs,
        contactNotifs,
        requestNotifs,
        testimonialNotifs,
        questionNotifs,
      ] = await Promise.all([
        fetchAuthNotifications(userData),
        fetchBookingNotifications(userData),
        fetchHouseNotifications(userData),
        fetchContactNotifications(userData),
        fetchRequestNotifications(userData),
        fetchTestimonialNotifications(userData),
        fetchQuestionNotifications(userData),
      ]);

      let allNotifications: any[] = [];

      if (Array.isArray(authNotifs)) {
        allNotifications = [...allNotifications, ...authNotifs];
      }
      if (Array.isArray(bookingNotifs)) {
        allNotifications = [...allNotifications, ...bookingNotifs];
      }
      if (Array.isArray(houseNotifs)) {
        allNotifications = [...allNotifications, ...houseNotifs];
      }
      if (Array.isArray(contactNotifs)) {
        allNotifications = [...allNotifications, ...contactNotifs];
      }
      if (Array.isArray(requestNotifs)) {
        allNotifications = [...allNotifications, ...requestNotifs];
      }
      if (Array.isArray(testimonialNotifs)) {
        allNotifications = [...allNotifications, ...testimonialNotifs];
      }
      if (Array.isArray(questionNotifs)) {
        allNotifications = [...allNotifications, ...questionNotifs];
      }

      const seenIds = new Set();
      const uniqueRawNotifications = allNotifications.filter((notif) => {
        const id = notif._id || notif.id;
        if (seenIds.has(id)) {
          return false;
        }
        seenIds.add(id);
        return true;
      });

      return uniqueRawNotifications;
    } catch (error) {
      return [];
    }
  }, [
    fetchAuthNotifications,
    fetchBookingNotifications,
    fetchHouseNotifications,
    fetchContactNotifications,
    fetchRequestNotifications,
    fetchTestimonialNotifications,
    fetchQuestionNotifications,
  ]);

  // ============================================================
  // PROCESS NOTIFICATIONS - GENERATE UNIFIED FORMAT
  // ============================================================
  const processNotifications = useCallback((rawNotifications: any[]) => {
    const newNotifications: Notification[] = [];

    rawNotifications.forEach((notif) => {
      let source: Notification["source"] = "activity";
      let title = "📋 Notification";

      if (notif.type === "welcome") {
        source = "user";
        title = "👋 Welcome!";
      } else if (notif.type === "verification") {
        source = "user";
        title = "📧 Email Verification";
      } else if (notif.type === "password_reset") {
        source = "user";
        title = "🔑 Password Reset";
      } else if (notif.type === "profile_update") {
        source = "user";
        title = "✏️ Profile Updated";
      } else if (notif.type === "account_deletion") {
        source = "user";
        title = "🗑️ Account Deleted";
      } else if (notif.type === "booking_created") {
        source = "booking";
        title = "📅 New Booking";
      } else if (notif.type === "booking_updated") {
        source = "booking";
        title = "📝 Booking Updated";
      } else if (notif.type === "booking_cancelled") {
        source = "booking";
        title = "❌ Booking Cancelled";
      } else if (notif.type === "booking_confirmed") {
        source = "booking";
        title = "✅ Booking Confirmed";
      } else if (
        notif.type === "contact_created" ||
        notif.type?.startsWith("contact_")
      ) {
        source = "contact";
        title = "📩 New Contact Message";
      } else if (notif.type === "request_created") {
        source = "request";
        title = "📋 New Request";
      } else if (notif.type === "request_deleted") {
        source = "request";
        title = "🗑️ Request Deleted";
      } else if (notif.type === "house_created") {
        source = "house";
        title = "🏠 New House Listed";
      } else if (notif.type === "house_updated") {
        source = "house";
        title = "📝 House Updated";
      } else if (notif.type === "house_status_changed") {
        source = "house";
        title = "🔄 House Status Changed";
      } else if (notif.type === "testimonial_created") {
        source = "testimonial";
        title = "⭐ New Testimonial";
      } else if (notif.type === "question_submitted") {
        source = "question";
        title = "❓ New Question Submitted";
      } else if (notif.type === "question_answered") {
        source = "question";
        title = "✅ Question Answered";
      } else if (notif.type?.startsWith("question_")) {
        source = "question";
        title = "❓ Question Notification";
      } else if (notif.action) {
        if (
          notif.action === "register" ||
          notif.action === "registration" ||
          notif.action === "new_registration" ||
          notif.action === "user_registered" ||
          notif.action === "signup"
        ) {
          return;
        }

        source = "activity";
        if (notif.action === "login") {
          title = "🔐 User Login";
        } else if (notif.action === "logout") {
          title = "🚪 User Logout";
        } else if (notif.action === "update_profile") {
          title = "✏️ Profile Updated";
        } else if (notif.action === "booking_created") {
          title = "📅 Booking Created";
        } else if (notif.action === "booking_cancelled") {
          title = "❌ Booking Cancelled";
        } else if (notif.action === "house_created") {
          title = "🏠 House Created";
        } else if (notif.action === "house_updated") {
          title = "📝 House Updated";
        } else if (notif.action === "house_deleted") {
          title = "🗑️ House Deleted";
        } else {
          return;
        }
      } else {
        return;
      }

      if (notif.title) {
        title = notif.title;
      }

      let message = notif.message || "";

      if (notif.type?.startsWith("booking_") && notif.houseName) {
        message = `${title} for "${notif.houseName}"`;
        if (notif.userName) message += ` by ${notif.userName}`;
        if (notif.status) message += ` - Status: ${notif.status}`;
      }

      if (notif.type?.startsWith("question_") && notif.question) {
        message = notif.question || message;
        if (notif.questionerName) {
          message = `From ${notif.questionerName}: ${message}`;
        }
      }

      const notificationId = notif._id || notif.id;
      const groupKey = `${title}|${message}|${source}`;

      newNotifications.push({
        id: notificationId,
        title: title,
        message: message,
        type: "info",
        read: notif.isRead || false,
        createdAt: notif.createdAt || new Date().toISOString(),
        source: source,
        data: notif,
        groupKey: groupKey,
      });
    });

    return newNotifications.filter((notif) => {
      if (notif.source === "activity" && notif.title.includes("Student")) {
        return false;
      }
      if (
        notif.title.includes("New Registration") ||
        notif.message.includes("registered")
      ) {
        return false;
      }
      if (notif.message.includes("Student")) {
        return false;
      }
      return true;
    });
  }, []);

  // ============================================================
  // FETCH AND PROCESS ALL DATA - SHOW ONLY ONE NOTIFICATION PER GROUP
  // ============================================================
  const fetchAndProcessData = useCallback(async () => {
    try {
      const rawNotifications = await fetchAllNotifications();
      const processedNotifs = processNotifications(rawNotifications);

      const groups: Record<string, Notification[]> = {};
      processedNotifs.forEach((notif) => {
        const key = notif.groupKey || `${notif.id}`;
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(notif);
      });

      const finalNotifications: Notification[] = [];
      Object.values(groups).forEach((group) => {
        group.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

        const representative = group[0];
        const allIds = group.map((n) => n.id);

        finalNotifications.push({
          ...representative,
          duplicateCount: group.length,
          allIds: allIds,
        });
      });

      finalNotifications.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

      setNotifications(finalNotifications);

      previousDataRef.current = {
        notifications: rawNotifications,
      };
    } catch (error) {
      // Silent fail
    }
  }, [fetchAllNotifications, processNotifications]);

  // ============================================================
  // HANDLE REFRESH
  // ============================================================
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchAndProcessData();
    setIsRefreshing(false);
  }, [fetchAndProcessData]);

  // ============================================================
  // SHOW STATUS MODAL
  // ============================================================
  const showStatusModal = (
    title: string,
    message: string,
    type: "success" | "error" | "info",
  ) => {
    setStatusModal({
      isOpen: true,
      title,
      message,
      type,
    });
  };

  // ============================================================
  // FIND ALL DUPLICATE IDs FOR A NOTIFICATION
  // ============================================================
  const getDuplicateIds = useCallback(
    (notificationId: string) => {
      const targetNotif = notifications.find((n) => n.id === notificationId);
      if (!targetNotif || !targetNotif.allIds) {
        return [notificationId];
      }
      return targetNotif.allIds;
    },
    [notifications],
  );

  // ============================================================
  // MARK NOTIFICATION AS READ - APPLY TO ALL COPIES
  // ============================================================
  const handleMarkAsRead = useCallback(
    async (id: string) => {
      const allIds = getDuplicateIds(id);

      setNotifications((prev) =>
        prev.map((n) => (allIds.includes(n.id) ? { ...n, read: true } : n)),
      );

      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const markPromises = [];
        let successCount = 0;

        for (const notifId of allIds) {
          const notification = notifications.find((n) => n.id === notifId);
          if (!notification) continue;

          const source = notification.source;
          let url = "";

          switch (source) {
            case "user":
              url = API_ENDPOINTS.notificationRead(notifId);
              break;
            case "booking":
              url = API_ENDPOINTS.bookingNotificationRead(notifId);
              break;
            case "contact":
              url = API_ENDPOINTS.contactNotificationRead(notifId);
              break;
            case "request":
              url = API_ENDPOINTS.requestNotificationRead(notifId);
              break;
            case "house":
              url = API_ENDPOINTS.houseNotificationRead(notifId);
              break;
            case "testimonial":
              successCount++;
              continue;
            case "question":
              url = API_ENDPOINTS.questionNotificationRead(notifId);
              break;
            case "activity":
              successCount++;
              continue;
            default:
              continue;
          }

          if (url) {
            markPromises.push(
              axios
                .put(url, {}, { headers: { Authorization: `Bearer ${token}` } })
                .then(() => successCount++)
                .catch(() => {}),
            );
          }
        }

        await Promise.allSettled(markPromises);
        await fetchAndProcessData();

        if (successCount > 0) {
          showStatusModal(
            t.success,
            `${successCount} ${t.notification}${successCount > 1 ? "s" : ""} ${t.markAsRead}`,
            "success",
          );
        }
      } catch (error) {
        setNotifications((prev) =>
          prev.map((n) => (allIds.includes(n.id) ? { ...n, read: false } : n)),
        );
        showStatusModal(t.error, "Failed to mark notifications as read", "error");
      }
    },
    [notifications, fetchAndProcessData, getDuplicateIds, t],
  );

  // ============================================================
  // MARK ALL NOTIFICATIONS AS READ
  // ============================================================
  const handleMarkAllAsRead = useCallback(async () => {
    const unreadNotifications = notifications.filter((n) => !n.read);
    const unreadIds = unreadNotifications.map((n) => n.id);

    if (unreadNotifications.length === 0) {
      showStatusModal(t.info, "No unread notifications", "info");
      return;
    }

    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const allUnreadIds: string[] = [];
      for (const notification of unreadNotifications) {
        if (notification.allIds) {
          allUnreadIds.push(...notification.allIds);
        } else {
          allUnreadIds.push(notification.id);
        }
      }

      const markPromises = [];
      let successCount = 0;

      for (const notifId of allUnreadIds) {
        const notification = notifications.find((n) => n.id === notifId);
        if (!notification) continue;

        const source = notification.source;
        let url = "";

        switch (source) {
          case "user":
            url = API_ENDPOINTS.notificationRead(notifId);
            break;
          case "booking":
            url = API_ENDPOINTS.bookingNotificationRead(notifId);
            break;
          case "contact":
            url = API_ENDPOINTS.contactNotificationRead(notifId);
            break;
          case "request":
            url = API_ENDPOINTS.requestNotificationRead(notifId);
            break;
          case "house":
            url = API_ENDPOINTS.houseNotificationRead(notifId);
            break;
          case "testimonial":
            successCount++;
            continue;
          case "question":
            url = API_ENDPOINTS.questionNotificationRead(notifId);
            break;
          case "activity":
            successCount++;
            continue;
          default:
            continue;
        }

        if (url) {
          markPromises.push(
            axios
              .put(
                url,
                {},
                {
                  headers: { Authorization: `Bearer ${token}` },
                },
              )
              .then(() => successCount++)
              .catch(() => {}),
          );
        }
      }

      await Promise.allSettled(markPromises);
      await fetchAndProcessData();

      if (successCount > 0) {
        showStatusModal(
          t.success,
          `${successCount} ${t.notification}${successCount > 1 ? "s" : ""} ${t.markAsRead}`,
          "success",
        );
      }
    } catch (error) {
      setNotifications((prev) =>
        prev.map((n) => (unreadIds.includes(n.id) ? { ...n, read: false } : n)),
      );
      showStatusModal(t.error, "Failed to mark notifications as read", "error");
    }
  }, [notifications, fetchAndProcessData, t]);

  // ============================================================
  // DELETE NOTIFICATION - DELETE ALL 4 COPIES AT ONCE
  // ============================================================
  const handleDelete = useCallback(
    async (id: string) => {
      if (!user || (user.role !== "admin" && user.role !== "manager")) {
        showStatusModal(
          t.permissionDenied,
          t.noPermission,
          "error",
        );
        return;
      }

      const allIds = getDuplicateIds(id);
      const duplicateCount = allIds.length;

      setConfirmationModal({
        isOpen: true,
        title:
          duplicateCount > 1
            ? t.confirmBulkDelete.replace("{count}", String(duplicateCount))
            : t.confirmDelete,
        message:
          duplicateCount > 1
            ? t.confirmBulkDeleteMessage.replace("{count}", String(duplicateCount))
            : t.confirmDeleteMessage,
        confirmText:
          duplicateCount > 1 ? `Delete All ${duplicateCount}` : t.delete,
        confirmColor: "bg-red-600",
        onConfirm: async () => {
          setConfirmationModal((prev) => ({ ...prev, isOpen: false }));

          setNotifications((prev) =>
            prev.filter((n) => n.id !== id),
          );

          try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const deletePromises = [];
            let deleteCount = 0;

            const notificationsToDelete = notifications.filter((n) =>
              allIds.includes(n.id),
            );

            for (const notif of notificationsToDelete) {
              const source = notif.source;
              let url = "";

              switch (source) {
                case "activity":
                  url = API_ENDPOINTS.activityDelete(notif.id);
                  break;
                case "user":
                  url = API_ENDPOINTS.notificationDelete(notif.id);
                  break;
                case "booking":
                  url = API_ENDPOINTS.bookingNotificationDelete(notif.id);
                  break;
                case "contact":
                  url = API_ENDPOINTS.contactNotificationDelete(notif.id);
                  break;
                case "request":
                  url = API_ENDPOINTS.requestNotificationDelete(notif.id);
                  break;
                case "house":
                  url = API_ENDPOINTS.houseNotificationDelete(notif.id);
                  break;
                case "testimonial":
                  url = API_ENDPOINTS.testimonialNotificationDelete(notif.id);
                  break;
                case "question":
                  url = API_ENDPOINTS.questionNotificationDelete(notif.id);
                  break;
                default:
                  url = API_ENDPOINTS.notificationDelete(notif.id);
                  break;
              }

              deletePromises.push(
                axios
                  .delete(url, {
                    headers: { Authorization: `Bearer ${token}` },
                  })
                  .then(() => deleteCount++)
                  .catch(() => {}),
              );
            }

            await Promise.allSettled(deletePromises);

            if (deleteCount > 0) {
              showStatusModal(
                t.success,
                `${deleteCount} ${t.notification}${deleteCount > 1 ? "s" : ""} ${t.delete}d successfully`,
                "success",
              );
            }

            setTimeout(() => fetchAndProcessData(), 500);
          } catch (error) {
            await fetchAndProcessData();
            showStatusModal(
              t.error,
              "Failed to delete notifications. Please try again.",
              "error",
            );
          }
        },
        type: "delete",
        duplicateIds: allIds,
      });
    },
    [notifications, fetchAndProcessData, user, getDuplicateIds, t],
  );

  // ============================================================
  // DELETE ALL NOTIFICATIONS
  // ============================================================
  const handleDeleteAll = useCallback(async () => {
    if (!user || (user.role !== "admin" && user.role !== "manager")) {
      showStatusModal(
        t.permissionDenied,
        t.noPermission,
        "error",
      );
      return;
    }

    setConfirmationModal({
      isOpen: true,
      title: t.confirmDeleteAll,
      message: t.confirmDeleteAllMessage.replace("{count}", String(notifications.length)),
      confirmText: "Delete All",
      confirmColor: "bg-red-600",
      onConfirm: async () => {
        setConfirmationModal((prev) => ({ ...prev, isOpen: false }));

        try {
          const token = localStorage.getItem("token");
          if (!token) {
            setNotifications([]);
            return;
          }

          const allIds: string[] = [];
          for (const notif of notifications) {
            if (notif.allIds) {
              allIds.push(...notif.allIds);
            } else {
              allIds.push(notif.id);
            }
          }

          const deletePromises = [];
          let deleteCount = 0;

          for (const notifId of allIds) {
            const notification = notifications.find((n) => n.id === notifId);
            if (!notification) continue;

            const source = notification.source;
            let url = "";

            switch (source) {
              case "activity":
                url = API_ENDPOINTS.activityDelete(notifId);
                break;
              case "user":
                url = API_ENDPOINTS.notificationDelete(notifId);
                break;
              case "booking":
                url = API_ENDPOINTS.bookingNotificationDelete(notifId);
                break;
              case "contact":
                url = API_ENDPOINTS.contactNotificationDelete(notifId);
                break;
              case "request":
                url = API_ENDPOINTS.requestNotificationDelete(notifId);
                break;
              case "house":
                url = API_ENDPOINTS.houseNotificationDelete(notifId);
                break;
              case "testimonial":
                url = API_ENDPOINTS.testimonialNotificationDelete(notifId);
                break;
              case "question":
                url = API_ENDPOINTS.questionNotificationDelete(notifId);
                break;
              default:
                url = API_ENDPOINTS.notificationDelete(notifId);
                break;
            }

            deletePromises.push(
              axios
                .delete(url, {
                  headers: { Authorization: `Bearer ${token}` },
                })
                .then(() => deleteCount++)
                .catch(() => {}),
            );
          }

          setNotifications([]);

          await Promise.allSettled(deletePromises);

          if (deleteCount > 0) {
            showStatusModal(
              t.success,
              `${deleteCount} ${t.notification}${deleteCount > 1 ? "s" : ""} ${t.delete}d`,
              "success",
            );
          }

          await fetchAndProcessData();
        } catch (error) {
          await fetchAndProcessData();
          showStatusModal(
            t.error,
            "Failed to delete all notifications",
            "error",
          );
        }
      },
      type: "delete-all",
    });
  }, [notifications, fetchAndProcessData, user, t]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // ============================================================
  // USE EFFECT - INITIAL SETUP AND POLLING
  // ============================================================
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const userDataStr = localStorage.getItem("user");

      if (!token || !userDataStr) {
        navigate("/");
        return;
      }

      const userData = JSON.parse(userDataStr) as UserData;

      if (!userData || !userData.role) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
        return;
      }

      setUser(userData);
      setLoading(false);

      const handleResize = () => {
        setIsSidebarOpen(window.innerWidth >= 1024);
      };

      window.addEventListener("resize", handleResize);
      handleResize();

      fetchAndProcessData();

      const interval = setInterval(fetchAndProcessData, 30000);

      return () => {
        window.removeEventListener("resize", handleResize);
        clearInterval(interval);
      };
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    }
  }, [navigate, fetchAndProcessData]);

  // ============================================================
  // HANDLE LOGOUT
  // ============================================================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("isUserMenuOpen");
    localStorage.removeItem("isDashboardOpen");

    setStatusModal({
      isOpen: true,
      type: "info",
      title: t.loggedOut,
      message: t.loggedOutMessage,
    });

    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">{t.loadingDashboard}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ top: "4rem" }}
      />

      <Sidebar
        user={user}
        onLogout={handleLogout}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        location={location}
        onNotificationsClick={() => setIsNotificationsOpen(true)}
        unreadCount={unreadCount}
        t={t}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onDelete={handleDelete}
        onDeleteAll={handleDeleteAll}
        onRefresh={handleRefresh}
        isLoading={isRefreshing}
        userRole={user?.role}
        t={t}
      />

      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={() =>
          setConfirmationModal((prev) => ({ ...prev, isOpen: false }))
        }
        onConfirm={confirmationModal.onConfirm}
        title={confirmationModal.title}
        message={confirmationModal.message}
        confirmText={confirmationModal.confirmText}
        cancelText={t.cancel}
        confirmColor={confirmationModal.confirmColor}
      />

      <StatusModal
        isOpen={statusModal.isOpen}
        onClose={() => setStatusModal((prev) => ({ ...prev, isOpen: false }))}
        title={statusModal.title}
        message={statusModal.message}
        type={statusModal.type}
      />

      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-54 xl:ml-70 2xl:ml-80" : "ml-0"
        }`}
      >
        <div className="p-3 sm:p-4 md:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
};

// ============================================================
// PROTECTED ROUTE COMPONENT
// ============================================================
const ProtectedRoute = ({
  children,
  allowedRoles = [],
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) => {
  const token = localStorage.getItem("token");
  const userDataStr = localStorage.getItem("user");
  const userData = userDataStr ? (JSON.parse(userDataStr) as UserData) : null;

  if (!token || !userData) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userData.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// ============================================================
// MAIN APP COMPONENT
// ============================================================
export default function App() {
  const location = useLocation();

  const isDashboardRoute =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/user") ||
    location.pathname.startsWith("/host") ||
    location.pathname.startsWith("/manager");

  return (
    <div className="w-full">
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/help" element={<Help />} />
        <Route path="/house/rent" element={<HouseOnRent />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route
          path="/verification/email/status"
          element={<VerificationPage />}
        />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Admin Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/houses"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardLayout>
                <HouseManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardLayout>
                <UserManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/team"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardLayout>
                <TeamMemberManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/bookings"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardLayout>
                <BookingManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/request"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardLayout>
                <RequestManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/logs"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardLayout>
                <ActionsManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/messages"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardLayout>
                <MessageManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/testimonials"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardLayout>
                <TestimonialManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/questions"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardLayout>
                <QuestionManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* User Routes */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <DashboardLayout>
                <UserDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/management"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <DashboardLayout>
                <MeManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/bookings"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <DashboardLayout>
                <UserBookingManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/requests"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <DashboardLayout>
                <UserRequestManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/messages"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <DashboardLayout>
                <UserMessageManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Host Routes */}
        <Route
          path="/host/dashboard"
          element={
            <ProtectedRoute allowedRoles={["host"]}>
              <DashboardLayout>
                <HostDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/host/management"
          element={
            <ProtectedRoute allowedRoles={["host"]}>
              <DashboardLayout>
                <HostManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/host/bookings"
          element={
            <ProtectedRoute allowedRoles={["host"]}>
              <DashboardLayout>
                <HostBookingManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/host/clients"
          element={
            <ProtectedRoute allowedRoles={["host"]}>
              <DashboardLayout>
                <HostClientManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/host/requests"
          element={
            <ProtectedRoute allowedRoles={["host"]}>
              <DashboardLayout>
                <HostRequestManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/host/messages"
          element={
            <ProtectedRoute allowedRoles={["host"]}>
              <DashboardLayout>
                <HostMessageManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Manager Routes */}
        <Route
          path="/manager/dashboard"
          element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <DashboardLayout>
                <ManagersDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/users"
          element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <DashboardLayout>
                <ManagerUserManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/questions"
          element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <DashboardLayout>
                <QuestionManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/bookings"
          element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <DashboardLayout>
                <ManagerBookingManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/houses"
          element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <DashboardLayout>
                <ManagerHouseManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/logs"
          element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <DashboardLayout>
                <ActivitiesManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/requests"
          element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <DashboardLayout>
                <ManagerRequestManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/messages"
          element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <DashboardLayout>
                <ManagerMessageManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/testimonials"
          element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <DashboardLayout>
                <ManagerTestimonialManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* 404 Routes */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isDashboardRoute && <Footer />}
    </div>
  );
}