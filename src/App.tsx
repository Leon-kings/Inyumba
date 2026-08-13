// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useRef, useCallback } from "react";
// import {
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
//   useNavigate,
// } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
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
// import { AccessTime, HouseRounded, TextSnippet } from "@mui/icons-material";
// import { VerificationPage } from "./components/verify/Verification";
// import { HouseManagement } from "./components/dashboard/admin/components/house/HouseManagement";
// import { ManagersDashboard } from "./components/dashboard/managers/ManagerDashboard";
// import { ManagerUserManagement } from "./components/dashboard/managers/components/users/ManagerUserManagement";
// import { ManagerBookingManagement } from "./components/dashboard/managers/components/bookings/ManagerBookingManagement";
// import { ManagerHouseManagement } from "./components/dashboard/managers/components/houses/ManagerHouseManagement";
// import { ManagerMessageManagement } from "./components/dashboard/managers/components/messages/ManagerMessagesManagement";
// import { ManagerTestimonialManagement } from "./components/dashboard/managers/components/testimonials/ManagerTestimonialManagement";
// import { ManagerRequestManagement } from "./components/dashboard/managers/components/request/ManagerRequestManagement";

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
//     | "testimonial";
//   data?: any;
// }

// // API endpoints
// const API_BASE_URL = "https://rene-inyumba-nodejs.onrender.com";
// const API_ENDPOINTS = {
//   houses: `${API_BASE_URL}/houses/notifications`,
//   bookings: `${API_BASE_URL}/bookings/notifications`,
//   bookingsByEmail: (email: string) =>
//     `${API_BASE_URL}/bookings/notifications/email/${email}`,
//   contact: `${API_BASE_URL}/contact/notifications`,
//   request: `${API_BASE_URL}/request`,
//   testimonials: `${API_BASE_URL}/testimonials`,
//   activities: `${API_BASE_URL}/auth/activities`,
//   userNotifications: `${API_BASE_URL}/auth/notifications`,
//   notifications: `${API_BASE_URL}/houses/notifications`,
// };

// // Protected Route Component
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

// // Get source icon based on notification source
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
//     default:
//       return "border-gray-200 bg-gray-50";
//   }
// };

// // Confirmation Modal Component
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

// // Success/Error Toast Replacement Modal
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
//   type?: "success" | "error";
// }) => {
//   if (!isOpen) return null;

//   const isSuccess = type === "success";
//   const icon = isSuccess ? (
//     <CheckCircleIcon className="w-12 h-12 text-green-500" />
//   ) : (
//     <CancelIcon className="w-12 h-12 text-red-500" />
//   );
//   const bgColor = isSuccess
//     ? "bg-green-50 border-green-200"
//     : "bg-red-50 border-red-200";

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
//               className={`px-6 py-2.5 text-white rounded-lg hover:opacity-90 transition-opacity font-medium ${
//                 isSuccess ? "bg-green-600" : "bg-red-600"
//               }`}
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// // Centered Notifications Modal
// const NotificationsModal = ({
//   isOpen,
//   onClose,
//   notifications,
//   onMarkAsRead,
//   onMarkAllAsRead,
//   onDelete,
//   onDeleteAll,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   notifications: Notification[];
//   onMarkAsRead: (id: string) => void;
//   onMarkAllAsRead: () => void;
//   onDelete: (id: string) => void;
//   onDeleteAll: () => void;
// }) => {
//   const unreadCount = notifications.filter((n) => !n.read).length;

//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
//         onClick={onClose}
//       />

//       {/* Centered Modal */}
//       <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-300">
//           {/* Header */}
//           <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//                 <NotificationsIcon className="w-7 h-7 text-blue-600" />
//                 Notifications
//               </h2>
//               {unreadCount > 0 && (
//                 <p className="text-sm text-blue-600 mt-1">
//                   {unreadCount} unread notification{unreadCount > 1 ? "s" : ""}
//                 </p>
//               )}
//             </div>
//             <div className="flex items-center space-x-3">
//               {unreadCount > 0 && (
//                 <button
//                   onClick={onMarkAllAsRead}
//                   className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
//                 >
//                   <CheckCircleIcon className="w-4 h-4" />
//                   Mark all as read
//                 </button>
//               )}
//               {notifications.length > 0 && (
//                 <button
//                   onClick={onDeleteAll}
//                   className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
//                 >
//                   <DeleteIcon className="w-4 h-4" />
//                   Delete all
//                 </button>
//               )}
//               <button
//                 onClick={onClose}
//                 className="p-2 hover:bg-gray-200 rounded-full transition-colors"
//               >
//                 <CloseIcon className="w-6 h-6 text-gray-500" />
//               </button>
//             </div>
//           </div>

//           {/* Notifications List */}
//           <div className="flex-1 overflow-y-auto p-6">
//             {notifications.length === 0 ? (
//               <div className="text-center py-12">
//                 <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <NotificationsIcon className="w-12 h-12 text-gray-400" />
//                 </div>
//                 <p className="text-xl text-gray-500 font-medium">
//                   No notifications yet
//                 </p>
//                 <p className="text-sm text-gray-400 mt-2">
//                   New notifications will appear here
//                 </p>
//               </div>
//             ) : (
//               <div className="grid gap-4">
//                 {notifications.map((notification) => (
//                   <div
//                     key={notification.id}
//                     className={`p-5 rounded-xl border-2 transition-all ${
//                       notification.read
//                         ? "bg-white border-gray-200"
//                         : `${getSourceColor(notification.source)} border-2`
//                     }`}
//                   >
//                     <div className="flex items-start gap-4">
//                       {/* Icon */}
//                       <div className="flex-shrink-0 mt-1">
//                         {getSourceIcon(notification.source)}
//                       </div>

//                       {/* Content */}
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center gap-3 mb-1 flex-wrap">
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
//                         </div>
//                         <h3 className="text-lg font-semibold text-gray-800">
//                           {notification.title}
//                         </h3>
//                         <p className="text-gray-600 mt-1 text-base">
//                           {notification.message}
//                         </p>
//                       </div>

//                       {/* Action Buttons */}
//                       <div className="flex items-center gap-2 flex-shrink-0">
//                         {!notification.read && (
//                           <button
//                             onClick={() => onMarkAsRead(notification.id)}
//                             className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                             title="Mark as read"
//                           >
//                             <CheckCircleIcon className="w-5 h-5" />
//                           </button>
//                         )}
//                         <button
//                           onClick={() => onDelete(notification.id)}
//                           className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                           title="Delete notification"
//                         >
//                           <DeleteIcon className="w-5 h-5" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Footer */}
//           {notifications.length > 0 && (
//             <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
//               <p className="text-sm text-gray-500 text-center">
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

// // Sidebar Component
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

//   // Admin Menu Items
//   const adminMenuItems = [
//     { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
//     { id: "users", label: "Users", icon: <PeopleIcon /> },
//     { id: "team", label: "Team", icon: <PeopleIcon /> },
//     { id: "bookings", label: "Bookings", icon: <AttachMoneyIcon /> },
//     { id: "requests", label: "Requests", icon: <TrendingUpIcon /> },
//     { id: "houses", label: "Houses", icon: <HouseRounded /> },
//     { id: "messages", label: "Messages", icon: <EmailIcon /> },
//     { id: "testimonials", label: "Testimonials", icon: <TextSnippet /> },
//     { id: "logs", label: "Logs", icon: <AccessTime /> },
//   ];

//   // User Menu Items
//   const userMenuItems = [
//     { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
//     { id: "profile", label: "My Profile", icon: <PersonIcon /> },
//     { id: "bookings", label: "My Bookings", icon: <AttachMoneyIcon /> },
//     { id: "requests", label: "My Requests", icon: <TrendingUpIcon /> },
//     { id: "messages", label: "Messages", icon: <EmailIcon /> },
//   ];

//   // Host Menu Items
//   const hostMenuItems = [
//     { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
//     { id: "houses", label: "My Houses", icon: <HouseIcon /> },
//     { id: "bookings", label: "Bookings", icon: <AttachMoneyIcon /> },
//   ];

//   // Manager Menu Items
//   const managerMenuItems = [
//     { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
//     { id: "users", label: "Users", icon: <PeopleIcon /> },
//     { id: "bookings", label: "Bookings", icon: <AttachMoneyIcon /> },
//     { id: "houses", label: "Houses", icon: <HouseRounded /> },
//     { id: "messages", label: "Messages", icon: <EmailIcon /> },
//     { id: "testimonials", label: "Testimonials", icon: <TextSnippet /> },
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
//             {/* Notifications Button */}
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

//             {/* Logout Button */}
//             <button
//               onClick={() => {
//                 onLogout();
//                 onToggle();
//               }}
//               className="w-full flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
//             >
//               <LogoutIcon className="w-5 h-5 flex-shrink-0" />
//               <span className="font-medium text-sm sm:text-base">Logout</span>
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

// // Layout with Sidebar
// const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [user, setUser] = useState<UserData | null>(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
//   const [notifications, setNotifications] = useState<Notification[]>([]);

//   // Modal states
//   const [confirmationModal, setConfirmationModal] = useState<{
//     isOpen: boolean;
//     title: string;
//     message: string;
//     confirmText: string;
//     confirmColor: string;
//     onConfirm: () => void;
//     type: "delete" | "delete-all";
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
//     type: "success" | "error";
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

//   // Fetch booking notifications based on user role
//   const fetchBookingNotifications = useCallback(async (userData: UserData) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return [];

//       let url = "";
//       // Admin and Host and Manager get all booking notifications
//       if (
//         userData.role === "admin" ||
//         userData.role === "host" ||
//         userData.role === "manager"
//       ) {
//         url = API_ENDPOINTS.bookings;
//       } else {
//         // Users get booking notifications by email
//         url = API_ENDPOINTS.bookingsByEmail(userData.email);
//       }

//       const response = await axios.get(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // Handle different response structures
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
//       console.error("Error fetching booking notifications:", error);
//       return [];
//     }
//   }, []);

//   // Fetch all notifications
//   const fetchAllNotifications = useCallback(async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const userDataStr = localStorage.getItem("user");
//       const userData = userDataStr ? JSON.parse(userDataStr) : null;

//       if (!token || !userData) return [];

//       // Fetch booking notifications based on role
//       const bookingNotifications = await fetchBookingNotifications(userData);

//       // Fetch user notifications
//       const userResponse = await axios.get(API_ENDPOINTS.userNotifications, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // Fetch activities
//       const activityResponse = await axios.get(API_ENDPOINTS.activities, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // Fetch house notifications
//       const houseResponse = await axios.get(API_ENDPOINTS.houses, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // Combine all notifications
//       let allNotifications: any[] = [];

//       // Add booking notifications
//       if (Array.isArray(bookingNotifications)) {
//         allNotifications = [...allNotifications, ...bookingNotifications];
//       }

//       // Add user notifications
//       if (userResponse.data?.success && Array.isArray(userResponse.data.data)) {
//         allNotifications = [...allNotifications, ...userResponse.data.data];
//       } else if (Array.isArray(userResponse.data)) {
//         allNotifications = [...allNotifications, ...userResponse.data];
//       }

//       // Add activities
//       if (Array.isArray(activityResponse.data)) {
//         allNotifications = [...allNotifications, ...activityResponse.data];
//       } else if (
//         activityResponse.data?.data &&
//         Array.isArray(activityResponse.data.data)
//       ) {
//         allNotifications = [...allNotifications, ...activityResponse.data.data];
//       }

//       // Add house notifications
//       if (
//         houseResponse.data?.success &&
//         Array.isArray(houseResponse.data.data)
//       ) {
//         allNotifications = [...allNotifications, ...houseResponse.data.data];
//       }

//       return allNotifications;
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//       return [];
//     }
//   }, [fetchBookingNotifications]);

//   // Process notifications and generate unified format
//   const processNotifications = useCallback((rawNotifications: any[]) => {
//     const newNotifications: Notification[] = [];

//     rawNotifications.forEach((notif) => {
//       // Determine source based on notification type
//       let source: Notification["source"] = "activity";
//       let title = "📋 Notification";

//       // Booking notifications
//       if (notif.type === "booking_created") {
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
//       }
//       // Contact notifications
//       else if (notif.type === "contact_created") {
//         source = "contact";
//         title = "📩 New Contact Message";
//       }
//       // Request notifications
//       else if (notif.type === "request_created") {
//         source = "request";
//         title = "📋 New Request";
//       } else if (notif.type === "request_deleted") {
//         source = "request";
//         title = "🗑️ Request Deleted";
//       }
//       // House notifications
//       else if (notif.type === "house_created") {
//         source = "house";
//         title = "🏠 New House Listed";
//       } else if (notif.type === "house_updated") {
//         source = "house";
//         title = "📝 House Updated";
//       } else if (notif.type === "house_status_changed") {
//         source = "house";
//         title = "🔄 House Status Changed";
//       }
//       // User notifications
//       else if (notif.type === "welcome") {
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
//       }
//       // Activity notifications
//       else if (notif.action) {
//         source = "activity";
//         if (notif.action === "login") title = "🔐 User Login";
//         else if (notif.action === "logout") title = "🚪 User Logout";
//         else if (notif.action === "register") title = "📝 New Registration";
//         else if (notif.action === "update_profile")
//           title = "✏️ Profile Updated";
//         else if (notif.action === "booking_created")
//           title = "📅 Booking Created";
//         else if (notif.action === "booking_cancelled")
//           title = "❌ Booking Cancelled";
//         else if (notif.action === "house_created") title = "🏠 House Created";
//         else if (notif.action === "house_updated") title = "📝 House Updated";
//         else if (notif.action === "house_deleted") title = "🗑️ House Deleted";
//       }
//       // Testimonial notifications
//       else if (notif.type === "testimonial_created") {
//         source = "testimonial";
//         title = "⭐ New Testimonial";
//       }

//       // Use existing title if available
//       if (notif.title) {
//         title = notif.title;
//       }

//       // Use message from notification or generate one
//       let message = notif.message || notif.message || "";

//       // For booking notifications, generate a more detailed message
//       if (notif.type?.startsWith("booking_") && notif.houseName) {
//         message = `${title} for "${notif.houseName}"`;
//         if (notif.userName) message += ` by ${notif.userName}`;
//         if (notif.status) message += ` - Status: ${notif.status}`;
//       }

//       newNotifications.push({
//         id: notif._id || notif.id,
//         title: title,
//         message: message,
//         type: "info",
//         read: notif.isRead || false,
//         createdAt: notif.createdAt || new Date().toISOString(),
//         source: source,
//         data: notif,
//       });
//     });

//     return newNotifications;
//   }, []);

//   // Fetch and process all data
//   const fetchAndProcessData = useCallback(async () => {
//     try {
//       // Fetch all notifications
//       const rawNotifications = await fetchAllNotifications();

//       // Process all notifications into unified format
//       const processedNotifs = processNotifications(rawNotifications);

//       // Sort by createdAt (newest first)
//       processedNotifs.sort(
//         (a, b) =>
//           new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
//       );

//       // Update state
//       setNotifications(processedNotifs);

//       // Update previous data ref
//       previousDataRef.current = {
//         notifications: rawNotifications,
//       };
//     } catch (error) {
//       console.error("Error fetching notification data:", error);
//     }
//   }, [fetchAllNotifications, processNotifications]);

//   // Show status modal
//   const showStatusModal = (
//     title: string,
//     message: string,
//     type: "success" | "error",
//   ) => {
//     setStatusModal({
//       isOpen: true,
//       title,
//       message,
//       type,
//     });
//   };

//   // Mark notification as read
//   const handleMarkAsRead = useCallback(
//     async (id: string) => {
//       // Optimistically update UI
//       setNotifications((prev) =>
//         prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
//       );

//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return;

//         // Determine which API to call based on notification source
//         const notification = notifications.find((n) => n.id === id);
//         if (!notification) return;

//         const source = notification.source;
//         let url = "";

//         // Updated routes following the provided booking routes
//         if (source === "booking") {
//           url = `${API_ENDPOINTS.bookings}/${id}/read`;
//         } else if (source === "contact") {
//           url = `${API_ENDPOINTS.contact}/${id}/read`;
//         } else if (source === "request") {
//           url = `${API_ENDPOINTS.request}/${id}/read`;
//         } else if (source === "house") {
//           url = `${API_ENDPOINTS.notifications}/${id}/read`;
//         } else if (source === "user") {
//           url = `${API_ENDPOINTS.userNotifications}/${id}/read`;
//         } else if (source === "activity") {
//           url = `${API_ENDPOINTS.activities}/${id}/read`;
//         } else if (source === "testimonial") {
//           url = `${API_ENDPOINTS.testimonials}/${id}/read`;
//         }

//         if (url) {
//           await axios.put(
//             url,
//             {},
//             { headers: { Authorization: `Bearer ${token}` } },
//           );
//         }
//       } catch (error) {
//         console.error("Error marking notification as read:", error);
//         // Revert on error
//         setNotifications((prev) =>
//           prev.map((n) => (n.id === id ? { ...n, read: false } : n)),
//         );
//         showStatusModal(
//           "Error",
//           "Failed to mark notification as read",
//           "error",
//         );
//       }
//     },
//     [notifications],
//   );

//   // Mark all notifications as read
//   const handleMarkAllAsRead = useCallback(async () => {
//     const unreadIds = notifications.filter((n) => !n.read).map((n) => n.id);

//     // Optimistically update UI
//     setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       // Separate notifications by source
//       const sources: Notification["source"][] = [
//         "booking",
//         "contact",
//         "request",
//         "house",
//         "user",
//         "activity",
//         "testimonial",
//       ];
//       const promises = [];

//       for (const source of sources) {
//         const ids = unreadIds.filter((id) =>
//           notifications.find((n) => n.id === id && n.source === source),
//         );

//         if (ids.length > 0) {
//           let url = "";
//           if (source === "booking")
//             url = `${API_ENDPOINTS.bookings}/mark-all-read`;
//           else if (source === "contact")
//             url = `${API_ENDPOINTS.contact}/mark-all-read`;
//           else if (source === "request")
//             url = `${API_ENDPOINTS.request}/mark-all-read`;
//           else if (source === "house")
//             url = `${API_ENDPOINTS.notifications}/mark-all-read`;
//           else if (source === "user")
//             url = `${API_ENDPOINTS.userNotifications}/mark-all-read`;
//           else if (source === "activity")
//             url = `${API_ENDPOINTS.activities}/read-all`;
//           else if (source === "testimonial")
//             url = `${API_ENDPOINTS.testimonials}/mark-all-read`;

//           if (url) {
//             promises.push(
//               axios.put(
//                 url,
//                 {},
//                 { headers: { Authorization: `Bearer ${token}` } },
//               ),
//             );
//           }
//         }
//       }

//       await Promise.all(promises);

//       showStatusModal("Success", "All notifications marked as read", "success");
//     } catch (error) {
//       console.error("Error marking all notifications as read:", error);
//       // Revert on error
//       setNotifications((prev) =>
//         prev.map((n) => (unreadIds.includes(n.id) ? { ...n, read: false } : n)),
//       );
//       showStatusModal(
//         "Error",
//         "Failed to mark all notifications as read",
//         "error",
//       );
//     }
//   }, [notifications]);

//   // Delete a single notification
//   const handleDelete = useCallback(
//     async (id: string) => {
//       // Show confirmation modal first
//       setConfirmationModal({
//         isOpen: true,
//         title: "Delete Notification",
//         message:
//           "Are you sure you want to delete this notification? This action cannot be undone.",
//         confirmText: "Delete",
//         confirmColor: "bg-red-600",
//         onConfirm: async () => {
//           // Close confirmation modal
//           setConfirmationModal((prev) => ({ ...prev, isOpen: false }));

//           // Optimistically update UI
//           setNotifications((prev) => prev.filter((n) => n.id !== id));

//           try {
//             const token = localStorage.getItem("token");
//             if (!token) return;

//             const notification = notifications.find((n) => n.id === id);
//             if (!notification) return;

//             const source = notification.source;
//             let url = "";

//             // Updated routes following the provided booking routes
//             if (source === "booking") {
//               url = `${API_ENDPOINTS.bookings}/${id}`;
//             } else if (source === "contact") {
//               url = `${API_ENDPOINTS.contact}/${id}`;
//             } else if (source === "request") {
//               url = `${API_ENDPOINTS.request}/${id}`;
//             } else if (source === "house") {
//               url = `${API_ENDPOINTS.notifications}/${id}`;
//             } else if (source === "user") {
//               url = `${API_ENDPOINTS.userNotifications}/${id}`;
//             } else if (source === "activity") {
//               url = `${API_ENDPOINTS.activities}/${id}`;
//             } else if (source === "testimonial") {
//               url = `${API_ENDPOINTS.testimonials}/${id}`;
//             }

//             if (url) {
//               await axios.delete(url, {
//                 headers: { Authorization: `Bearer ${token}` },
//               });
//             }

//             showStatusModal(
//               "Success",
//               "Notification deleted successfully",
//               "success",
//             );
//           } catch (error) {
//             console.error("Error deleting notification:", error);
//             // Revert on error
//             await fetchAndProcessData();
//             showStatusModal("Error", "Failed to delete notification", "error");
//           }
//         },
//         type: "delete",
//       });
//     },
//     [notifications, fetchAndProcessData],
//   );

//   // Delete all notifications
//   const handleDeleteAll = useCallback(async () => {
//     // Show confirmation modal first
//     setConfirmationModal({
//       isOpen: true,
//       title: "Delete All Notifications",
//       message:
//         "Are you sure you want to delete all notifications? This action cannot be undone.",
//       confirmText: "Delete All",
//       confirmColor: "bg-red-600",
//       onConfirm: async () => {
//         // Close confirmation modal
//         setConfirmationModal((prev) => ({ ...prev, isOpen: false }));

//         const notificationIds = notifications.map((n) => n.id);

//         // Optimistically update UI
//         setNotifications([]);

//         try {
//           const token = localStorage.getItem("token");
//           if (!token) return;

//           // Separate notifications by source
//           const sources: Notification["source"][] = [
//             "booking",
//             "contact",
//             "request",
//             "house",
//             "user",
//             "activity",
//             "testimonial",
//           ];
//           const promises = [];

//           for (const source of sources) {
//             const ids = notificationIds.filter((id) =>
//               notifications.find((n) => n.id === id && n.source === source),
//             );

//             if (ids.length > 0) {
//               let url = "";
//               if (source === "booking")
//                 url = `${API_ENDPOINTS.bookings}/delete-all`;
//               else if (source === "contact")
//                 url = `${API_ENDPOINTS.contact}/delete-all`;
//               else if (source === "request")
//                 url = `${API_ENDPOINTS.request}/delete-all`;
//               else if (source === "house")
//                 url = `${API_ENDPOINTS.notifications}/delete-all`;
//               else if (source === "user")
//                 url = `${API_ENDPOINTS.userNotifications}/delete-all`;
//               else if (source === "activity")
//                 url = `${API_ENDPOINTS.activities}/delete-all`;
//               else if (source === "testimonial")
//                 url = `${API_ENDPOINTS.testimonials}/delete-all`;

//               if (url) {
//                 promises.push(
//                   axios.delete(url, {
//                     headers: { Authorization: `Bearer ${token}` },
//                   }),
//                 );
//               }
//             }
//           }

//           await Promise.all(promises);

//           showStatusModal(
//             "Success",
//             "All notifications deleted successfully",
//             "success",
//           );
//         } catch (error) {
//           console.error("Error deleting all notifications:", error);
//           // Revert on error
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
//   }, [notifications, fetchAndProcessData]);

//   const unreadCount = notifications.filter((n) => !n.read).length;

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

//       // Initial data fetch
//       fetchAndProcessData();

//       // Set up polling every 15 seconds for real-time updates
//       const interval = setInterval(fetchAndProcessData, 15000);

//       return () => {
//         window.removeEventListener("resize", handleResize);
//         clearInterval(interval);
//       };
//     } catch (error) {
//       console.error("Error in DashboardLayout:", error);
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       navigate("/");
//     }
//   }, [navigate, fetchAndProcessData]);

//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       if (token) {
//         await axios.post(
//           "https://rene-inyumba-nodejs.onrender.com/auth/logout",
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           },
//         );
//       }

//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       localStorage.removeItem("isLoggedIn");
//       localStorage.removeItem("userName");
//       localStorage.removeItem("userEmail");
//       localStorage.removeItem("userRole");
//       localStorage.removeItem("userId");
//       localStorage.removeItem("isUserMenuOpen");
//       localStorage.removeItem("isDashboardOpen");

//       toast.success("👋 Logged Out Successfully!");
//       navigate("/");
//     } catch (error) {
//       console.error("Logout error:", error);
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       localStorage.removeItem("isLoggedIn");
//       localStorage.removeItem("userName");
//       localStorage.removeItem("userEmail");
//       localStorage.removeItem("userRole");
//       localStorage.removeItem("userId");
//       localStorage.removeItem("isUserMenuOpen");
//       localStorage.removeItem("isDashboardOpen");

//       toast.success("👋 Logged Out Successfully!");
//       navigate("/");
//     }
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
//       />

//       {/* Confirmation Modal */}
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

//       {/* Status Modal */}
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

//         {/* ============================================================ */}
//         {/* ADMIN ROUTES */}
//         {/* ============================================================ */}
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

//         {/* ============================================================ */}
//         {/* USER ROUTES */}
//         {/* ============================================================ */}
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

//         {/* ============================================================ */}
//         {/* HOST ROUTES */}
//         {/* ============================================================ */}
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

//         {/* ============================================================ */}
//         {/* MANAGER ROUTES */}
//         {/* ============================================================ */}
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

//                 <Route
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

// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable @typescript-eslint/no-explicit-any */
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
// import { HouseRounded, Info, TextSnippet } from "@mui/icons-material";
// import { VerificationPage } from "./components/verify/Verification";
// import { HouseManagement } from "./components/dashboard/admin/components/house/HouseManagement";
// import { ManagersDashboard } from "./components/dashboard/managers/ManagerDashboard";
// import { ManagerUserManagement } from "./components/dashboard/managers/components/users/ManagerUserManagement";
// import { ManagerBookingManagement } from "./components/dashboard/managers/components/bookings/ManagerBookingManagement";
// import { ManagerHouseManagement } from "./components/dashboard/managers/components/houses/ManagerHouseManagement";
// import { ManagerMessageManagement } from "./components/dashboard/managers/components/messages/ManagerMessagesManagement";
// import { ManagerTestimonialManagement } from "./components/dashboard/managers/components/testimonials/ManagerTestimonialManagement";
// import { ManagerRequestManagement } from "./components/dashboard/managers/components/request/ManagerRequestManagement";

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
//     | "testimonial";
//   data?: any;
// }

// // API endpoints
// const API_BASE_URL = "https://rene-inyumba-nodejs.onrender.com";
// const API_ENDPOINTS = {
//   houses: `${API_BASE_URL}/houses/notifications`,
//   bookings: `${API_BASE_URL}/bookings/notifications`,
//   bookingsByEmail: (email: string) =>
//     `${API_BASE_URL}/bookings/notifications/email/${email}`,
//   contact: `${API_BASE_URL}/contact/notifications`,
//   request: `${API_BASE_URL}/request`,
//   testimonials: `${API_BASE_URL}/testimonials`,
//   activities: `${API_BASE_URL}/auth/activities`,
//   userNotifications: `${API_BASE_URL}/auth/notifications`,
//   notifications: `${API_BASE_URL}/houses/notifications`,
// };

// // Protected Route Component
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

// // Get source icon based on notification source
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
//     default:
//       return "border-gray-200 bg-gray-50";
//   }
// };

// // Confirmation Modal Component
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

// // Success/Error Toast Replacement Modal
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

// // Centered Notifications Modal
// const NotificationsModal = ({
//   isOpen,
//   onClose,
//   notifications,
//   onMarkAsRead,
//   onMarkAllAsRead,
//   onDelete,
//   onDeleteAll,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   notifications: Notification[];
//   onMarkAsRead: (id: string) => void;
//   onMarkAllAsRead: () => void;
//   onDelete: (id: string) => void;
//   onDeleteAll: () => void;
// }) => {
//   const unreadCount = notifications.filter((n) => !n.read).length;

//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
//         onClick={onClose}
//       />

//       {/* Centered Modal */}
//       <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-300">
//           {/* Header */}
//           <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//                 <NotificationsIcon className="w-7 h-7 text-blue-600" />
//                 Notifications
//               </h2>
//               {unreadCount > 0 && (
//                 <p className="text-sm text-blue-600 mt-1">
//                   {unreadCount} unread notification{unreadCount > 1 ? "s" : ""}
//                 </p>
//               )}
//             </div>
//             <div className="flex items-center space-x-3">
//               {unreadCount > 0 && (
//                 <button
//                   onClick={onMarkAllAsRead}
//                   className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
//                 >
//                   <CheckCircleIcon className="w-4 h-4" />
//                   Mark all as read
//                 </button>
//               )}
//               {notifications.length > 0 && (
//                 <button
//                   onClick={onDeleteAll}
//                   className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
//                 >
//                   <DeleteIcon className="w-4 h-4" />
//                   Delete all
//                 </button>
//               )}
//               <button
//                 onClick={onClose}
//                 className="p-2 hover:bg-gray-200 rounded-full transition-colors"
//               >
//                 <CloseIcon className="w-6 h-6 text-gray-500" />
//               </button>
//             </div>
//           </div>

//           {/* Notifications List */}
//           <div className="flex-1 overflow-y-auto p-6">
//             {notifications.length === 0 ? (
//               <div className="text-center py-12">
//                 <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <NotificationsIcon className="w-12 h-12 text-gray-400" />
//                 </div>
//                 <p className="text-xl text-gray-500 font-medium">
//                   No notifications yet
//                 </p>
//                 <p className="text-sm text-gray-400 mt-2">
//                   New notifications will appear here
//                 </p>
//               </div>
//             ) : (
//               <div className="grid gap-4">
//                 {notifications.map((notification) => (
//                   <div
//                     key={notification.id}
//                     className={`p-5 rounded-xl border-2 transition-all ${
//                       notification.read
//                         ? "bg-white border-gray-200"
//                         : `${getSourceColor(notification.source)} border-2`
//                     }`}
//                   >
//                     <div className="flex items-start gap-4">
//                       {/* Icon */}
//                       <div className="flex-shrink-0 mt-1">
//                         {getSourceIcon(notification.source)}
//                       </div>

//                       {/* Content */}
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center gap-3 mb-1 flex-wrap">
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
//                         </div>
//                         <h3 className="text-lg font-semibold text-gray-800">
//                           {notification.title}
//                         </h3>
//                         <p className="text-gray-600 mt-1 text-base">
//                           {notification.message}
//                         </p>
//                       </div>

//                       {/* Action Buttons */}
//                       <div className="flex items-center gap-2 flex-shrink-0">
//                         {!notification.read && (
//                           <button
//                             onClick={() => onMarkAsRead(notification.id)}
//                             className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                             title="Mark as read"
//                           >
//                             <CheckCircleIcon className="w-5 h-5" />
//                           </button>
//                         )}
//                         <button
//                           onClick={() => onDelete(notification.id)}
//                           className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                           title="Delete notification"
//                         >
//                           <DeleteIcon className="w-5 h-5" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Footer */}
//           {notifications.length > 0 && (
//             <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
//               <p className="text-sm text-gray-500 text-center">
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

// // Sidebar Component
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

//   // Admin Menu Items
//   const adminMenuItems = [
//     { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
//     { id: "users", label: "Users", icon: <PeopleIcon /> },
//     { id: "team", label: "Team", icon: <PeopleIcon /> },
//     { id: "bookings", label: "Bookings", icon: <AttachMoneyIcon /> },
//     { id: "requests", label: "Requests", icon: <TrendingUpIcon /> },
//     { id: "houses", label: "Houses", icon: <HouseRounded /> },
//     { id: "messages", label: "Messages", icon: <EmailIcon /> },
//     { id: "testimonials", label: "Testimonials", icon: <TextSnippet /> },
//     // { id: "logs", label: "Logs", icon: <AccessTime /> },
//   ];

//   // User Menu Items
//   const userMenuItems = [
//     { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
//     { id: "profile", label: "My Profile", icon: <PersonIcon /> },
//     { id: "bookings", label: "My Bookings", icon: <AttachMoneyIcon /> },
//     { id: "requests", label: "My Requests", icon: <TrendingUpIcon /> },
//     { id: "messages", label: "Messages", icon: <EmailIcon /> },
//   ];

//   // Host Menu Items
//   const hostMenuItems = [
//     { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
//     { id: "houses", label: "My Houses", icon: <HouseIcon /> },
//     { id: "bookings", label: "Bookings", icon: <AttachMoneyIcon /> },
//   ];

//   // Manager Menu Items
//   const managerMenuItems = [
//     { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
//     { id: "users", label: "Users", icon: <PeopleIcon /> },
//     { id: "bookings", label: "Bookings", icon: <AttachMoneyIcon /> },
//     { id: "houses", label: "Houses", icon: <HouseRounded /> },
//     { id: "messages", label: "Messages", icon: <EmailIcon /> },
//     { id: "testimonials", label: "Testimonials", icon: <TextSnippet /> },
//     { id: "requests", label: "Requests", icon: <TrendingUpIcon /> },
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
//             {/* Notifications Button */}
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

//             {/* Logout Button */}
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

// // Layout with Sidebar
// const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [user, setUser] = useState<UserData | null>(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
//   const [notifications, setNotifications] = useState<Notification[]>([]);

//   // Modal states
//   const [confirmationModal, setConfirmationModal] = useState<{
//     isOpen: boolean;
//     title: string;
//     message: string;
//     confirmText: string;
//     confirmColor: string;
//     onConfirm: () => void;
//     type: "delete" | "delete-all";
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

//   // Fetch booking notifications based on user role
//   const fetchBookingNotifications = useCallback(async (userData: UserData) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return [];

//       let url = "";
//       // Admin and Host and Manager get all booking notifications
//       if (
//         userData.role === "admin" ||
//         userData.role === "host" ||
//         userData.role === "manager"
//       ) {
//         url = API_ENDPOINTS.bookings;
//       } else {
//         // Users get booking notifications by email
//         url = API_ENDPOINTS.bookingsByEmail(userData.email);
//       }

//       const response = await axios.get(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // Handle different response structures
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
//       console.error("Error fetching booking notifications:", error);
//       return [];
//     }
//   }, []);

//   // Fetch all notifications
//   const fetchAllNotifications = useCallback(async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const userDataStr = localStorage.getItem("user");
//       const userData = userDataStr ? JSON.parse(userDataStr) : null;

//       if (!token || !userData) return [];

//       // Fetch booking notifications based on role
//       const bookingNotifications = await fetchBookingNotifications(userData);

//       // Fetch user notifications
//       const userResponse = await axios.get(API_ENDPOINTS.userNotifications, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // Fetch activities
//       const activityResponse = await axios.get(API_ENDPOINTS.activities, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // Fetch house notifications
//       const houseResponse = await axios.get(API_ENDPOINTS.houses, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // Combine all notifications
//       let allNotifications: any[] = [];

//       // Add booking notifications
//       if (Array.isArray(bookingNotifications)) {
//         allNotifications = [...allNotifications, ...bookingNotifications];
//       }

//       // Add user notifications
//       if (userResponse.data?.success && Array.isArray(userResponse.data.data)) {
//         allNotifications = [...allNotifications, ...userResponse.data.data];
//       } else if (Array.isArray(userResponse.data)) {
//         allNotifications = [...allNotifications, ...userResponse.data];
//       }

//       // Add activities
//       if (Array.isArray(activityResponse.data)) {
//         allNotifications = [...allNotifications, ...activityResponse.data];
//       } else if (
//         activityResponse.data?.data &&
//         Array.isArray(activityResponse.data.data)
//       ) {
//         allNotifications = [...allNotifications, ...activityResponse.data.data];
//       }

//       // Add house notifications
//       if (
//         houseResponse.data?.success &&
//         Array.isArray(houseResponse.data.data)
//       ) {
//         allNotifications = [...allNotifications, ...houseResponse.data.data];
//       }

//       return allNotifications;
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//       return [];
//     }
//   }, [fetchBookingNotifications]);

//   // Process notifications and generate unified format
//   const processNotifications = useCallback((rawNotifications: any[]) => {
//     const newNotifications: Notification[] = [];

//     rawNotifications.forEach((notif) => {
//       // Determine source based on notification type
//       let source: Notification["source"] = "activity";
//       let title = "📋 Notification";

//       // Booking notifications
//       if (notif.type === "booking_created") {
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
//       }
//       // Contact notifications
//       else if (notif.type === "contact_created") {
//         source = "contact";
//         title = "📩 New Contact Message";
//       }
//       // Request notifications
//       else if (notif.type === "request_created") {
//         source = "request";
//         title = "📋 New Request";
//       } else if (notif.type === "request_deleted") {
//         source = "request";
//         title = "🗑️ Request Deleted";
//       }
//       // House notifications
//       else if (notif.type === "house_created") {
//         source = "house";
//         title = "🏠 New House Listed";
//       } else if (notif.type === "house_updated") {
//         source = "house";
//         title = "📝 House Updated";
//       } else if (notif.type === "house_status_changed") {
//         source = "house";
//         title = "🔄 House Status Changed";
//       }
//       // User notifications
//       else if (notif.type === "welcome") {
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
//       }
//       // Activity notifications
//       else if (notif.action) {
//         source = "activity";
//         if (notif.action === "login") title = "🔐 User Login";
//         else if (notif.action === "logout") title = "🚪 User Logout";
//         else if (notif.action === "register") title = "📝 New Registration";
//         else if (notif.action === "update_profile")
//           title = "✏️ Profile Updated";
//         else if (notif.action === "booking_created")
//           title = "📅 Booking Created";
//         else if (notif.action === "booking_cancelled")
//           title = "❌ Booking Cancelled";
//         else if (notif.action === "house_created") title = "🏠 House Created";
//         else if (notif.action === "house_updated") title = "📝 House Updated";
//         else if (notif.action === "house_deleted") title = "🗑️ House Deleted";
//       }
//       // Testimonial notifications
//       else if (notif.type === "testimonial_created") {
//         source = "testimonial";
//         title = "⭐ New Testimonial";
//       }

//       // Use existing title if available
//       if (notif.title) {
//         title = notif.title;
//       }

//       // Use message from notification or generate one
//       let message = notif.message || notif.message || "";

//       // For booking notifications, generate a more detailed message
//       if (notif.type?.startsWith("booking_") && notif.houseName) {
//         message = `${title} for "${notif.houseName}"`;
//         if (notif.userName) message += ` by ${notif.userName}`;
//         if (notif.status) message += ` - Status: ${notif.status}`;
//       }

//       newNotifications.push({
//         id: notif._id || notif.id,
//         title: title,
//         message: message,
//         type: "info",
//         read: notif.isRead || false,
//         createdAt: notif.createdAt || new Date().toISOString(),
//         source: source,
//         data: notif,
//       });
//     });

//     return newNotifications;
//   }, []);

//   // Fetch and process all data
//   const fetchAndProcessData = useCallback(async () => {
//     try {
//       // Fetch all notifications
//       const rawNotifications = await fetchAllNotifications();

//       // Process all notifications into unified format
//       const processedNotifs = processNotifications(rawNotifications);

//       // Sort by createdAt (newest first)
//       processedNotifs.sort(
//         (a, b) =>
//           new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
//       );

//       // Update state
//       setNotifications(processedNotifs);

//       // Update previous data ref
//       previousDataRef.current = {
//         notifications: rawNotifications,
//       };
//     } catch (error) {
//       console.error("Error fetching notification data:", error);
//     }
//   }, [fetchAllNotifications, processNotifications]);

//   // Show status modal
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

//   // Mark notification as read
//   const handleMarkAsRead = useCallback(
//     async (id: string) => {
//       // Optimistically update UI
//       setNotifications((prev) =>
//         prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
//       );

//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return;

//         // Determine which API to call based on notification source
//         const notification = notifications.find((n) => n.id === id);
//         if (!notification) return;

//         const source = notification.source;
//         let url = "";

//         // Updated routes following the provided booking routes
//         if (source === "booking") {
//           url = `${API_ENDPOINTS.bookings}/${id}/read`;
//         } else if (source === "contact") {
//           url = `${API_ENDPOINTS.contact}/${id}/read`;
//         } else if (source === "request") {
//           url = `${API_ENDPOINTS.request}/${id}/read`;
//         } else if (source === "house") {
//           url = `${API_ENDPOINTS.notifications}/${id}/read`;
//         } else if (source === "user") {
//           url = `${API_ENDPOINTS.userNotifications}/${id}/read`;
//         } else if (source === "activity") {
//           url = `${API_ENDPOINTS.activities}/${id}/read`;
//         } else if (source === "testimonial") {
//           url = `${API_ENDPOINTS.testimonials}/${id}/read`;
//         }

//         if (url) {
//           await axios.put(
//             url,
//             {},
//             { headers: { Authorization: `Bearer ${token}` } },
//           );
//         }
//       } catch (error) {
//         console.error("Error marking notification as read:", error);
//         // Revert on error
//         setNotifications((prev) =>
//           prev.map((n) => (n.id === id ? { ...n, read: false } : n)),
//         );
//         showStatusModal(
//           "Error",
//           "Failed to mark notification as read",
//           "error",
//         );
//       }
//     },
//     [notifications],
//   );

//   // Mark all notifications as read
//   const handleMarkAllAsRead = useCallback(async () => {
//     const unreadIds = notifications.filter((n) => !n.read).map((n) => n.id);

//     // Optimistically update UI
//     setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       // Separate notifications by source
//       const sources: Notification["source"][] = [
//         "booking",
//         "contact",
//         "request",
//         "house",
//         "user",
//         "activity",
//         "testimonial",
//       ];
//       const promises = [];

//       for (const source of sources) {
//         const ids = unreadIds.filter((id) =>
//           notifications.find((n) => n.id === id && n.source === source),
//         );

//         if (ids.length > 0) {
//           let url = "";
//           if (source === "booking")
//             url = `${API_ENDPOINTS.bookings}/mark-all-read`;
//           else if (source === "contact")
//             url = `${API_ENDPOINTS.contact}/mark-all-read`;
//           else if (source === "request")
//             url = `${API_ENDPOINTS.request}/mark-all-read`;
//           else if (source === "house")
//             url = `${API_ENDPOINTS.notifications}/mark-all-read`;
//           else if (source === "user")
//             url = `${API_ENDPOINTS.userNotifications}/mark-all-read`;
//           else if (source === "activity")
//             url = `${API_ENDPOINTS.activities}/read-all`;
//           else if (source === "testimonial")
//             url = `${API_ENDPOINTS.testimonials}/mark-all-read`;

//           if (url) {
//             promises.push(
//               axios.put(
//                 url,
//                 {},
//                 { headers: { Authorization: `Bearer ${token}` } },
//               ),
//             );
//           }
//         }
//       }

//       await Promise.all(promises);

//       showStatusModal("Success", "All notifications marked as read", "success");
//     } catch (error) {
//       console.error("Error marking all notifications as read:", error);
//       // Revert on error
//       setNotifications((prev) =>
//         prev.map((n) => (unreadIds.includes(n.id) ? { ...n, read: false } : n)),
//       );
//       showStatusModal(
//         "Error",
//         "Failed to mark all notifications as read",
//         "error",
//       );
//     }
//   }, [notifications]);

//   // Delete a single notification
//   const handleDelete = useCallback(
//     async (id: string) => {
//       // Show confirmation modal first
//       setConfirmationModal({
//         isOpen: true,
//         title: "Delete Notification",
//         message:
//           "Are you sure you want to delete this notification? This action cannot be undone.",
//         confirmText: "Delete",
//         confirmColor: "bg-red-600",
//         onConfirm: async () => {
//           // Close confirmation modal
//           setConfirmationModal((prev) => ({ ...prev, isOpen: false }));

//           // Optimistically update UI
//           setNotifications((prev) => prev.filter((n) => n.id !== id));

//           try {
//             const token = localStorage.getItem("token");
//             if (!token) return;

//             const notification = notifications.find((n) => n.id === id);
//             if (!notification) return;

//             const source = notification.source;
//             let url = "";

//             // Updated routes following the provided booking routes
//             if (source === "booking") {
//               url = `${API_ENDPOINTS.bookings}/${id}`;
//             } else if (source === "contact") {
//               url = `${API_ENDPOINTS.contact}/${id}`;
//             } else if (source === "request") {
//               url = `${API_ENDPOINTS.request}/${id}`;
//             } else if (source === "house") {
//               url = `${API_ENDPOINTS.notifications}/${id}`;
//             } else if (source === "user") {
//               url = `${API_ENDPOINTS.userNotifications}/${id}`;
//             } else if (source === "activity") {
//               url = `${API_ENDPOINTS.activities}/${id}`;
//             } else if (source === "testimonial") {
//               url = `${API_ENDPOINTS.testimonials}/${id}`;
//             }

//             if (url) {
//               await axios.delete(url, {
//                 headers: { Authorization: `Bearer ${token}` },
//               });
//             }

//             showStatusModal(
//               "Success",
//               "Notification deleted successfully",
//               "success",
//             );
//           } catch (error) {
//             console.error("Error deleting notification:", error);
//             // Revert on error
//             await fetchAndProcessData();
//             showStatusModal("Error", "Failed to delete notification", "error");
//           }
//         },
//         type: "delete",
//       });
//     },
//     [notifications, fetchAndProcessData],
//   );

//   // Delete all notifications
//   const handleDeleteAll = useCallback(async () => {
//     // Show confirmation modal first
//     setConfirmationModal({
//       isOpen: true,
//       title: "Delete All Notifications",
//       message:
//         "Are you sure you want to delete all notifications? This action cannot be undone.",
//       confirmText: "Delete All",
//       confirmColor: "bg-red-600",
//       onConfirm: async () => {
//         // Close confirmation modal
//         setConfirmationModal((prev) => ({ ...prev, isOpen: false }));

//         const notificationIds = notifications.map((n) => n.id);

//         // Optimistically update UI
//         setNotifications([]);

//         try {
//           const token = localStorage.getItem("token");
//           if (!token) return;

//           // Separate notifications by source
//           const sources: Notification["source"][] = [
//             "booking",
//             "contact",
//             "request",
//             "house",
//             "user",
//             "activity",
//             "testimonial",
//           ];
//           const promises = [];

//           for (const source of sources) {
//             const ids = notificationIds.filter((id) =>
//               notifications.find((n) => n.id === id && n.source === source),
//             );

//             if (ids.length > 0) {
//               let url = "";
//               if (source === "booking")
//                 url = `${API_ENDPOINTS.bookings}/delete-all`;
//               else if (source === "contact")
//                 url = `${API_ENDPOINTS.contact}/delete-all`;
//               else if (source === "request")
//                 url = `${API_ENDPOINTS.request}/delete-all`;
//               else if (source === "house")
//                 url = `${API_ENDPOINTS.notifications}/delete-all`;
//               else if (source === "user")
//                 url = `${API_ENDPOINTS.userNotifications}/delete-all`;
//               else if (source === "activity")
//                 url = `${API_ENDPOINTS.activities}/delete-all`;
//               else if (source === "testimonial")
//                 url = `${API_ENDPOINTS.testimonials}/delete-all`;

//               if (url) {
//                 promises.push(
//                   axios.delete(url, {
//                     headers: { Authorization: `Bearer ${token}` },
//                   }),
//                 );
//               }
//             }
//           }

//           await Promise.all(promises);

//           showStatusModal(
//             "Success",
//             "All notifications deleted successfully",
//             "success",
//           );
//         } catch (error) {
//           console.error("Error deleting all notifications:", error);
//           // Revert on error
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
//   }, [notifications, fetchAndProcessData]);

//   const unreadCount = notifications.filter((n) => !n.read).length;

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

//       // Initial data fetch
//       fetchAndProcessData();

//       // Set up polling every 15 seconds for real-time updates
//       const interval = setInterval(fetchAndProcessData, 15000);

//       return () => {
//         window.removeEventListener("resize", handleResize);
//         clearInterval(interval);
//       };
//     } catch (error) {
//       console.error("Error in DashboardLayout:", error);
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       navigate("/");
//     }
//   }, [navigate, fetchAndProcessData]);

//   // Updated handleLogout function - removed API call
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     // Remove any additional localStorage items
//     localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("userName");
//     localStorage.removeItem("userEmail");
//     localStorage.removeItem("userRole");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("isUserMenuOpen");
//     localStorage.removeItem("isDashboardOpen");

//     // Show status modal instead of toast
//     setStatusModal({
//       isOpen: true,
//       type: "info",
//       title: "👋 Logged Out",
//       message: "You have been logged out successfully.",
//     });

//     // Redirect to home page
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
//       />

//       {/* Confirmation Modal */}
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

//       {/* Status Modal */}
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

//         {/* ============================================================ */}
//         {/* ADMIN ROUTES */}
//         {/* ============================================================ */}
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

//         {/* ============================================================ */}
//         {/* USER ROUTES */}
//         {/* ============================================================ */}
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

//         {/* ============================================================ */}
//         {/* HOST ROUTES */}
//         {/* ============================================================ */}
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

//         {/* ============================================================ */}
//         {/* MANAGER ROUTES */}
//         {/* ============================================================ */}
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

/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { HouseRounded, Info, LoginSharp, TextSnippet } from "@mui/icons-material";
import { VerificationPage } from "./components/verify/Verification";
import { HouseManagement } from "./components/dashboard/admin/components/house/HouseManagement";
import { ManagersDashboard } from "./components/dashboard/managers/ManagerDashboard";
import { ManagerUserManagement } from "./components/dashboard/managers/components/users/ManagerUserManagement";
import { ManagerBookingManagement } from "./components/dashboard/managers/components/bookings/ManagerBookingManagement";
import { ManagerHouseManagement } from "./components/dashboard/managers/components/houses/ManagerHouseManagement";
import { ManagerMessageManagement } from "./components/dashboard/managers/components/messages/ManagerMessagesManagement";
import { ManagerTestimonialManagement } from "./components/dashboard/managers/components/testimonials/ManagerTestimonialManagement";
import { ManagerRequestManagement } from "./components/dashboard/managers/components/request/ManagerRequestManagement";
import { LogsManagement } from "./components/dashboard/admin/components/logs/LogsManagement";
// import { LogsManagement } from "./components/dashboard/admin/components/logs/LogsManagement";

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
    | "testimonial";
  data?: any;
}

// API endpoints
const API_BASE_URL = "https://rene-inyumba-nodejs.onrender.com";

// ============================================================
// API ENDPOINTS - MATCHING BACKEND ROUTES
// ============================================================
const API_ENDPOINTS = {
  // HOUSE ENDPOINTS
  houses: `${API_BASE_URL}/houses`,
  houseNotifications: `${API_BASE_URL}/houses/notifications`,
  houseNotificationsUnread: `${API_BASE_URL}/houses/notifications/unread-count`,
  houseNotificationRead: (id: string) =>
    `${API_BASE_URL}/houses/notifications/${id}/read`,
  houseNotificationMarkAllRead: `${API_BASE_URL}/houses/notifications/mark-all-read`,
  houseNotificationDelete: (id: string) =>
    `${API_BASE_URL}/houses/notifications/${id}`,

  // BOOKING ENDPOINTS
  bookings: `${API_BASE_URL}/bookings`,
  bookingsByEmail: (email: string) => `${API_BASE_URL}/bookings/email/${email}`,
  bookingNotifications: `${API_BASE_URL}/bookings/notifications`,
  bookingNotificationsByEmail: (email: string) =>
    `${API_BASE_URL}/bookings/notifications/email/${email}`,
  bookingNotificationRead: (id: string) =>
    `${API_BASE_URL}/bookings/notifications/${id}/read`,
  bookingNotificationMarkAllRead: `${API_BASE_URL}/bookings/notifications/mark-all-read`,
  bookingNotificationDelete: (id: string) =>
    `${API_BASE_URL}/bookings/notifications/${id}`,

  // CONTACT ENDPOINTS
  contact: `${API_BASE_URL}/contact`,
  contactNotifications: `${API_BASE_URL}/contact/notifications`,
  contactNotificationsByEmail: (email: string) =>
    `${API_BASE_URL}/contact/notifications/${email}`,
  contactNotificationRead: (id: string) =>
    `${API_BASE_URL}/contact/notifications/${id}/read`,
  contactNotificationMarkAllRead: `${API_BASE_URL}/contact/notifications/mark-all-read`,
  contactNotificationDelete: (id: string) =>
    `${API_BASE_URL}/contact/notifications/${id}`,
  contactUnreadCount: `${API_BASE_URL}/contact/notifications/unread-count`,

  // REQUEST ENDPOINTS
  request: `${API_BASE_URL}/requests`,
  requestNotifications: `${API_BASE_URL}/requests/notifications`,
  requestNotificationRead: (id: string) =>
    `${API_BASE_URL}/requests/notifications/${id}/read`,
  requestNotificationMarkAllRead: (id: string) =>
    `${API_BASE_URL}/requests/notifications/${id}/mark-all-read`,
  requestNotificationDelete: (id: string) =>
    `${API_BASE_URL}/requests/notifications/${id}`,
  requestBulkDelete: `${API_BASE_URL}/requests/notifications/bulk-delete`,

  // TESTIMONIAL ENDPOINTS
  testimonials: `${API_BASE_URL}/testimonials`,
};

// Protected Route Component
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

// Get source icon based on notification source
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
    default:
      return "border-gray-200 bg-gray-50";
  }
};

// Confirmation Modal Component
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

// Success/Error Toast Replacement Modal
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

// Centered Notifications Modal
const NotificationsModal = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onDeleteAll,
}: {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDelete: (id: string) => void;
  onDeleteAll: () => void;
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
        onClick={onClose}
      />

      {/* Centered Modal */}
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <NotificationsIcon className="w-7 h-7 text-blue-600" />
                Notifications
              </h2>
              {unreadCount > 0 && (
                <p className="text-sm text-blue-600 mt-1">
                  {unreadCount} unread notification{unreadCount > 1 ? "s" : ""}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-3">
              {unreadCount > 0 && (
                <button
                  onClick={onMarkAllAsRead}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                >
                  <CheckCircleIcon className="w-4 h-4" />
                  Mark all as read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={onDeleteAll}
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
                >
                  <DeleteIcon className="w-4 h-4" />
                  Delete all
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <CloseIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto p-6">
            {notifications.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <NotificationsIcon className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-xl text-gray-500 font-medium">
                  No notifications yet
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  New notifications will appear here
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-5 rounded-xl border-2 transition-all ${
                      notification.read
                        ? "bg-white border-gray-200"
                        : `${getSourceColor(notification.source)} border-2`
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0 mt-1">
                        {getSourceIcon(notification.source)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
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
                              New
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {notification.title}
                        </h3>
                        <p className="text-gray-600 mt-1 text-base">
                          {notification.message}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {!notification.read && (
                          <button
                            onClick={() => onMarkAsRead(notification.id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Mark as read"
                          >
                            <CheckCircleIcon className="w-5 h-5" />
                          </button>
                        )}
                        <button
                          onClick={() => onDelete(notification.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete notification"
                        >
                          <DeleteIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              <p className="text-sm text-gray-500 text-center">
                Showing {notifications.length} notification
                {notifications.length > 1 ? "s" : ""}
                {unreadCount > 0 && ` • ${unreadCount} unread`}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// Sidebar Component
const Sidebar = ({
  user,
  onLogout,
  isOpen,
  onToggle,
  location,
  onNotificationsClick,
  unreadCount,
}: {
  user: UserData | null;
  onLogout: () => void;
  isOpen: boolean;
  onToggle: () => void;
  location: any;
  onNotificationsClick: () => void;
  unreadCount: number;
}) => {
  const navigate = useNavigate();

  // Admin Menu Items
  const adminMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    { id: "users", label: "Users", icon: <PeopleIcon /> },
    { id: "team", label: "Team", icon: <PeopleIcon /> },
    { id: "bookings", label: "Bookings", icon: <AttachMoneyIcon /> },
    { id: "requests", label: "Requests", icon: <TrendingUpIcon /> },
    { id: "houses", label: "Houses", icon: <HouseRounded /> },
    { id: "messages", label: "Messages", icon: <EmailIcon /> },
    { id: "testimonials", label: "Testimonials", icon: <TextSnippet /> },
    { id: "logs", label: "Logs", icon: <LoginSharp /> },
  ];

  // User Menu Items
  const userMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    { id: "profile", label: "My Profile", icon: <PersonIcon /> },
    { id: "bookings", label: "My Bookings", icon: <AttachMoneyIcon /> },
    { id: "requests", label: "My Requests", icon: <TrendingUpIcon /> },
    { id: "messages", label: "Messages", icon: <EmailIcon /> },
  ];

  // Host Menu Items
  const hostMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    { id: "houses", label: "My Houses", icon: <HouseIcon /> },
    { id: "bookings", label: "Bookings", icon: <AttachMoneyIcon /> },
  ];

  // Manager Menu Items
  const managerMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    { id: "users", label: "Users", icon: <PeopleIcon /> },
    { id: "bookings", label: "Bookings", icon: <AttachMoneyIcon /> },
    { id: "houses", label: "Houses", icon: <HouseRounded /> },
    { id: "messages", label: "Messages", icon: <EmailIcon /> },
    { id: "testimonials", label: "Testimonials", icon: <TextSnippet /> },
    { id: "requests", label: "Requests", icon: <TrendingUpIcon /> },
    { id: "logs", label: "Logs", icon: <LoginSharp /> },
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
      };
      return pathMap[itemId] || "/manager/dashboard";
    }
    return "/dashboard";
  };

  const getPanelLabel = () => {
    if (user?.role === "admin") return "Admin Panel";
    if (user?.role === "host") return "Host Panel";
    if (user?.role === "manager") return "Manager Panel";
    return "User Panel";
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
                  Inyumba
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
            {/* Notifications Button */}
            <button
              onClick={onNotificationsClick}
              className="w-full flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-200 relative"
            >
              <NotificationsIcon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium text-sm sm:text-base">
                Notifications
              </span>
              {unreadCount > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Logout Button */}
            <button
              onClick={() => {
                onLogout();
                onToggle();
              }}
              className="w-full bg-gradient-to-t from-red-400 to-red-600 flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
            >
              <LogoutIcon className="w-5 h-5 text-white flex-shrink-0" />
              <span className="font-medium text-sm text-white sm:text-base">
                Logout
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
// LAYOUT WITH SIDEBAR - MAIN COMPONENT
// ============================================================
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Modal states
  const [confirmationModal, setConfirmationModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    confirmColor: string;
    onConfirm: () => void;
    type: "delete" | "delete-all";
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

  // ============================================================
  // FETCH BOOKING NOTIFICATIONS
  // ============================================================
  const fetchBookingNotifications = useCallback(async (userData: UserData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return [];

      let url = "";
      if (
        userData.role === "admin" ||
        userData.role === "host" ||
        userData.role === "manager"
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
      console.error("Error fetching booking notifications:", error);
      return [];
    }
  }, []);

  // ============================================================
  // FETCH HOUSE NOTIFICATIONS
  // ============================================================
  const fetchHouseNotifications = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return [];

      const response = await axios.get(API_ENDPOINTS.houseNotifications, {
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
      console.error("Error fetching house notifications:", error);
      return [];
    }
  }, []);

  // ============================================================
  // FETCH CONTACT NOTIFICATIONS
  // ============================================================
  const fetchContactNotifications = useCallback(async (userData: UserData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return [];

      let url = API_ENDPOINTS.contactNotifications;

      // For users, get notifications by email
      if (userData.role === "user") {
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
      console.error("Error fetching contact notifications:", error);
      return [];
    }
  }, []);

  // ============================================================
  // FETCH REQUEST NOTIFICATIONS
  // ============================================================
  const fetchRequestNotifications = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return [];

      const response = await axios.get(API_ENDPOINTS.requestNotifications, {
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
      console.error("Error fetching request notifications:", error);
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

      // Fetch all notification types in parallel
      const [bookingNotifs, houseNotifs, contactNotifs, requestNotifs] =
        await Promise.all([
          fetchBookingNotifications(userData),
          fetchHouseNotifications(),
          fetchContactNotifications(userData),
          fetchRequestNotifications(),
        ]);

      // Combine all notifications
      let allNotifications: any[] = [];

      // Add booking notifications
      if (Array.isArray(bookingNotifs)) {
        allNotifications = [...allNotifications, ...bookingNotifs];
      }

      // Add house notifications
      if (Array.isArray(houseNotifs)) {
        allNotifications = [...allNotifications, ...houseNotifs];
      }

      // Add contact notifications
      if (Array.isArray(contactNotifs)) {
        allNotifications = [...allNotifications, ...contactNotifs];
      }

      // Add request notifications
      if (Array.isArray(requestNotifs)) {
        allNotifications = [...allNotifications, ...requestNotifs];
      }

      return allNotifications;
    } catch (error) {
      console.error("Error fetching all notifications:", error);
      return [];
    }
  }, [
    fetchBookingNotifications,
    fetchHouseNotifications,
    fetchContactNotifications,
    fetchRequestNotifications,
  ]);

  // ============================================================
  // PROCESS NOTIFICATIONS - GENERATE UNIFIED FORMAT
  // ============================================================
  const processNotifications = useCallback((rawNotifications: any[]) => {
    const newNotifications: Notification[] = [];

    rawNotifications.forEach((notif) => {
      // Determine source based on notification type
      let source: Notification["source"] = "activity";
      let title = "📋 Notification";

      // Booking notifications
      if (notif.type === "booking_created") {
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
      }
      // Contact notifications
      else if (
        notif.type === "contact_created" ||
        notif.type?.startsWith("contact_")
      ) {
        source = "contact";
        title = "📩 New Contact Message";
      }
      // Request notifications
      else if (notif.type === "request_created") {
        source = "request";
        title = "📋 New Request";
      } else if (notif.type === "request_deleted") {
        source = "request";
        title = "🗑️ Request Deleted";
      }
      // House notifications
      else if (notif.type === "house_created") {
        source = "house";
        title = "🏠 New House Listed";
      } else if (notif.type === "house_updated") {
        source = "house";
        title = "📝 House Updated";
      } else if (notif.type === "house_status_changed") {
        source = "house";
        title = "🔄 House Status Changed";
      }
      // User notifications
      else if (notif.type === "welcome") {
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
      }
      // Activity notifications
      else if (notif.action) {
        source = "activity";
        if (notif.action === "login") title = "🔐 User Login";
        else if (notif.action === "logout") title = "🚪 User Logout";
        else if (notif.action === "register") title = "📝 New Registration";
        else if (notif.action === "update_profile")
          title = "✏️ Profile Updated";
        else if (notif.action === "booking_created")
          title = "📅 Booking Created";
        else if (notif.action === "booking_cancelled")
          title = "❌ Booking Cancelled";
        else if (notif.action === "house_created") title = "🏠 House Created";
        else if (notif.action === "house_updated") title = "📝 House Updated";
        else if (notif.action === "house_deleted") title = "🗑️ House Deleted";
      }
      // Testimonial notifications
      else if (notif.type === "testimonial_created") {
        source = "testimonial";
        title = "⭐ New Testimonial";
      }

      // Use existing title if available
      if (notif.title) {
        title = notif.title;
      }

      let message = notif.message || notif.message || "";

      // For booking notifications, generate a more detailed message
      if (notif.type?.startsWith("booking_") && notif.houseName) {
        message = `${title} for "${notif.houseName}"`;
        if (notif.userName) message += ` by ${notif.userName}`;
        if (notif.status) message += ` - Status: ${notif.status}`;
      }

      newNotifications.push({
        id: notif._id || notif.id,
        title: title,
        message: message,
        type: "info",
        read: notif.isRead || false,
        createdAt: notif.createdAt || new Date().toISOString(),
        source: source,
        data: notif,
      });
    });

    return newNotifications;
  }, []);

  // ============================================================
  // FETCH AND PROCESS ALL DATA
  // ============================================================
  const fetchAndProcessData = useCallback(async () => {
    try {
      const rawNotifications = await fetchAllNotifications();
      const processedNotifs = processNotifications(rawNotifications);

      // Sort by createdAt (newest first)
      processedNotifs.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

      setNotifications(processedNotifs);

      previousDataRef.current = {
        notifications: rawNotifications,
      };
    } catch (error) {
      console.error("Error fetching notification data:", error);
    }
  }, [fetchAllNotifications, processNotifications]);

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
  // MARK NOTIFICATION AS READ
  // ============================================================
  const handleMarkAsRead = useCallback(
    async (id: string) => {
      // Optimistically update UI
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
      );

      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const notification = notifications.find((n) => n.id === id);
        if (!notification) return;

        const source = notification.source;
        let url = "";

        switch (source) {
          case "booking":
            url = API_ENDPOINTS.bookingNotificationRead(id);
            break;
          case "contact":
            url = API_ENDPOINTS.contactNotificationRead(id);
            break;
          case "request":
            url = API_ENDPOINTS.requestNotificationRead(id);
            break;
          case "house":
            url = API_ENDPOINTS.houseNotificationRead(id);
            break;
          case "testimonial":
            url = `${API_ENDPOINTS.testimonials}/${id}/read`;
            break;
          default:
            return;
        }

        await axios.put(
          url,
          {},
          { headers: { Authorization: `Bearer ${token}` } },
        );
      } catch (error) {
        console.error("Error marking notification as read:", error);
        // Revert on error
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, read: false } : n)),
        );
        showStatusModal(
          "Error",
          "Failed to mark notification as read",
          "error",
        );
      }
    },
    [notifications],
  );

  // ============================================================
  // MARK ALL NOTIFICATIONS AS READ
  // ============================================================
  const handleMarkAllAsRead = useCallback(async () => {
    const unreadIds = notifications.filter((n) => !n.read).map((n) => n.id);

    // Optimistically update UI
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const sources: Notification["source"][] = [
        "booking",
        "contact",
        "request",
        "house",
        "user",
        "activity",
        "testimonial",
      ];
      const promises = [];

      for (const source of sources) {
        const sourceNotifs = notifications.filter(
          (n) => n.source === source && !n.read,
        );

        if (sourceNotifs.length > 0) {
          let url = "";
          switch (source) {
            case "booking":
              url = API_ENDPOINTS.bookingNotificationMarkAllRead;
              break;
            case "contact":
              url = API_ENDPOINTS.contactNotificationMarkAllRead;
              break;
            case "request":
              // The request route requires an id parameter
              url = API_ENDPOINTS.requestNotificationMarkAllRead("all");
              break;
            case "house":
              url = API_ENDPOINTS.houseNotificationMarkAllRead;
              break;
            case "testimonial":
              url = `${API_ENDPOINTS.testimonials}/mark-all-read`;
              break;
            default:
              continue;
          }

          promises.push(
            axios.put(
              url,
              {},
              { headers: { Authorization: `Bearer ${token}` } },
            ),
          );
        }
      }

      await Promise.all(promises);
      showStatusModal("Success", "All notifications marked as read", "success");
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      // Revert on error
      setNotifications((prev) =>
        prev.map((n) => (unreadIds.includes(n.id) ? { ...n, read: false } : n)),
      );
      showStatusModal(
        "Error",
        "Failed to mark all notifications as read",
        "error",
      );
    }
  }, [notifications]);

  // ============================================================
  // DELETE A SINGLE NOTIFICATION
  // ============================================================
  const handleDelete = useCallback(
    async (id: string) => {
      setConfirmationModal({
        isOpen: true,
        title: "Delete Notification",
        message:
          "Are you sure you want to delete this notification? This action cannot be undone.",
        confirmText: "Delete",
        confirmColor: "bg-red-600",
        onConfirm: async () => {
          setConfirmationModal((prev) => ({ ...prev, isOpen: false }));

          // Optimistically update UI
          setNotifications((prev) => prev.filter((n) => n.id !== id));

          try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const notification = notifications.find((n) => n.id === id);
            if (!notification) return;

            const source = notification.source;
            let url = "";

            switch (source) {
              case "booking":
                url = API_ENDPOINTS.bookingNotificationDelete(id);
                break;
              case "contact":
                url = API_ENDPOINTS.contactNotificationDelete(id);
                break;
              case "request":
                url = API_ENDPOINTS.requestNotificationDelete(id);
                break;
              case "house":
                url = API_ENDPOINTS.houseNotificationDelete(id);
                break;
              case "testimonial":
                url = `${API_ENDPOINTS.testimonials}/${id}`;
                break;
              default:
                return;
            }

            await axios.delete(url, {
              headers: { Authorization: `Bearer ${token}` },
            });

            showStatusModal(
              "Success",
              "Notification deleted successfully",
              "success",
            );
          } catch (error) {
            console.error("Error deleting notification:", error);
            await fetchAndProcessData();
            showStatusModal("Error", "Failed to delete notification", "error");
          }
        },
        type: "delete",
      });
    },
    [notifications, fetchAndProcessData],
  );

  // ============================================================
  // DELETE ALL NOTIFICATIONS
  // ============================================================
  const handleDeleteAll = useCallback(async () => {
    setConfirmationModal({
      isOpen: true,
      title: "Delete All Notifications",
      message:
        "Are you sure you want to delete all notifications? This action cannot be undone.",
      confirmText: "Delete All",
      confirmColor: "bg-red-600",
      onConfirm: async () => {
        setConfirmationModal((prev) => ({ ...prev, isOpen: false }));

        // Optimistically update UI
        setNotifications([]);

        try {
          const token = localStorage.getItem("token");
          if (!token) return;

          const sources: Notification["source"][] = [
            "booking",
            "contact",
            "request",
            "house",
            "user",
            "activity",
            "testimonial",
          ];
          const promises = [];

          for (const source of sources) {
            const sourceNotifs = notifications.filter(
              (n) => n.source === source,
            );

            if (sourceNotifs.length > 0) {
              let url = "";
              switch (source) {
                case "booking":
                  url = `${API_ENDPOINTS.bookings}/notifications/delete-all`;
                  break;
                case "contact":
                  url = `${API_ENDPOINTS.contact}/notifications/delete-all`;
                  break;
                case "request":
                  url = API_ENDPOINTS.requestBulkDelete;
                  break;
                case "house":
                  url = `${API_ENDPOINTS.houses}/notifications/delete-all`;
                  break;
                case "testimonial":
                  url = `${API_ENDPOINTS.testimonials}/delete-all`;
                  break;
                default:
                  continue;
              }

              promises.push(
                axios.delete(url, {
                  headers: { Authorization: `Bearer ${token}` },
                }),
              );
            }
          }

          await Promise.all(promises);
          showStatusModal(
            "Success",
            "All notifications deleted successfully",
            "success",
          );
        } catch (error) {
          console.error("Error deleting all notifications:", error);
          await fetchAndProcessData();
          showStatusModal(
            "Error",
            "Failed to delete all notifications",
            "error",
          );
        }
      },
      type: "delete-all",
    });
  }, [notifications, fetchAndProcessData]);

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

      // Initial data fetch
      fetchAndProcessData();

      // Set up polling every 15 seconds for real-time updates
      const interval = setInterval(fetchAndProcessData, 15000);

      return () => {
        window.removeEventListener("resize", handleResize);
        clearInterval(interval);
      };
    } catch (error) {
      console.error("Error in DashboardLayout:", error);
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
      title: "👋 Logged Out",
      message: "You have been logged out successfully.",
    });

    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
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
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onDelete={handleDelete}
        onDeleteAll={handleDeleteAll}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={() =>
          setConfirmationModal((prev) => ({ ...prev, isOpen: false }))
        }
        onConfirm={confirmationModal.onConfirm}
        title={confirmationModal.title}
        message={confirmationModal.message}
        confirmText={confirmationModal.confirmText}
        cancelText="Cancel"
        confirmColor={confirmationModal.confirmColor}
      />

      {/* Status Modal */}
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

        {/* ============================================================ */}
        {/* ADMIN ROUTES */}
        {/* ============================================================ */}
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
                <LogsManagement />
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

        {/* ============================================================ */}
        {/* USER ROUTES */}
        {/* ============================================================ */}
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

        {/* ============================================================ */}
        {/* HOST ROUTES */}
        {/* ============================================================ */}
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

        {/* ============================================================ */}
        {/* MANAGER ROUTES */}
        {/* ============================================================ */}
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
                <LogsManagement />
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
