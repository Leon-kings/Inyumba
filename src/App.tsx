
// /* eslint-disable @typescript-eslint/no-explicit-any */
// // App.jsx
// import { useState, useEffect } from "react";
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

// // Types
// interface UserData {
//   id: number;
//   name: string;
//   email: string;
//   role: "admin" | "user" | "host";
// }

// interface Notification {
//   id: number;
//   title: string;
//   message: string;
//   type: "info" | "success" | "warning" | "error";
//   read: boolean;
//   createdAt: string;
// }

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

// // Notifications Component
// const NotificationsModal = ({
//   isOpen,
//   onClose,
//   notifications,
//   onMarkAsRead,
//   onMarkAllAsRead,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   notifications: Notification[];
//   onMarkAsRead: (id: number) => void;
//   onMarkAllAsRead: () => void;
// }) => {
//   const unreadCount = notifications.filter((n) => !n.read).length;

//   if (!isOpen) return null;

//   return (
//     <>
//       <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
//       <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
//         <div className="flex flex-col h-full">
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 border-b border-gray-200">
//             <div>
//               <h2 className="text-lg font-semibold text-gray-800">
//                 Notifications
//               </h2>
//               {unreadCount > 0 && (
//                 <p className="text-sm text-blue-600">
//                   {unreadCount} unread notification{unreadCount > 1 ? "s" : ""}
//                 </p>
//               )}
//             </div>
//             <div className="flex items-center space-x-2">
//               {unreadCount > 0 && (
//                 <button
//                   onClick={onMarkAllAsRead}
//                   className="text-sm text-blue-600 hover:text-blue-800 font-medium"
//                 >
//                   Mark all as read
//                 </button>
//               )}
//               <button
//                 onClick={onClose}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <CloseIcon className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>
//           </div>

//           {/* Notifications List */}
//           <div className="flex-1 overflow-y-auto p-4">
//             {notifications.length === 0 ? (
//               <div className="text-center py-8">
//                 <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <NotificationsIcon className="w-8 h-8 text-gray-400" />
//                 </div>
//                 <p className="text-gray-500">No notifications yet</p>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {notifications.map((notification) => (
//                   <div
//                     key={notification.id}
//                     className={`p-4 rounded-lg border transition-all ${
//                       notification.read
//                         ? "bg-white border-gray-200"
//                         : "bg-blue-50 border-blue-200"
//                     }`}
//                   >
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <h3 className="font-medium text-gray-800">
//                           {notification.title}
//                         </h3>
//                         <p className="text-sm text-gray-600 mt-1">
//                           {notification.message}
//                         </p>
//                         <p className="text-xs text-gray-400 mt-2">
//                           {new Date(notification.createdAt).toLocaleDateString(
//                             "en-US",
//                             {
//                               month: "short",
//                               day: "numeric",
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             },
//                           )}
//                         </p>
//                       </div>
//                       {!notification.read && (
//                         <button
//                           onClick={() => onMarkAsRead(notification.id)}
//                           className="ml-2 w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 hover:scale-125 transition-transform"
//                           title="Mark as read"
//                         />
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
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

//   const getMenuItems = () => {
//     if (user?.role === "admin") return adminMenuItems;
//     if (user?.role === "host") return hostMenuItems;
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
//     }
//     return "/dashboard";
//   };

//   const getPanelLabel = () => {
//     if (user?.role === "admin") return "Admin Panel";
//     if (user?.role === "host") return "Host Panel";
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
//   const [notifications, setNotifications] = useState<Notification[]>([
//     {
//       id: 1,
//       title: "Welcome!",
//       message: "Welcome to your dashboard. Start exploring your features.",
//       type: "info",
//       read: false,
//       createdAt: new Date().toISOString(),
//     },
//     {
//       id: 2,
//       title: "New Booking",
//       message: "You have a new booking request from John Doe.",
//       type: "success",
//       read: false,
//       createdAt: new Date(Date.now() - 3600000).toISOString(),
//     },
//     {
//       id: 3,
//       title: "System Update",
//       message: "System maintenance scheduled for tomorrow at 2 AM.",
//       type: "warning",
//       read: true,
//       createdAt: new Date(Date.now() - 86400000).toISOString(),
//     },
//   ]);

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

//       return () => window.removeEventListener("resize", handleResize);
//     } catch (error) {
//       console.error("Error in DashboardLayout:", error);
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       navigate("/");
//     }
//   }, [navigate]);

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

//   const handleMarkAsRead = (id: number) => {
//     setNotifications((prev) =>
//       prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
//     );
//     // Optionally, send API request to mark as read
//   };

//   const handleMarkAllAsRead = () => {
//     setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
//     // Optionally, send API request to mark all as read
//   };

//   const unreadCount = notifications.filter((n) => !n.read).length;

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
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
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
//     location.pathname.startsWith("/host");

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

//         {/* 404 Routes */}
//         <Route path="/404" element={<NotFound />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//       {!isDashboardRoute && <Footer />}
//     </div>
//   );
// }

// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable react-hooks/purity */
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

// // Types
// interface UserData {
//   id: number;
//   name: string;
//   email: string;
//   role: "admin" | "user" | "host";
// }

// interface Notification {
//   id: string;
//   title: string;
//   message: string;
//   type: "info" | "success" | "warning" | "error";
//   read: boolean;
//   createdAt: string;
//   source: "house" | "booking" | "contact" | "request" | "testimonial";
//   data?: any;
// }

// // API endpoints
// const API_BASE_URL = "https://rene-inyumba-nodejs.onrender.com";
// const API_ENDPOINTS = {
//   houses: `${API_BASE_URL}/houses`,
//   bookings: `${API_BASE_URL}/bookings`,
//   contact: `${API_BASE_URL}/contact`,
//   request: `${API_BASE_URL}/request`,
//   testimonials: `${API_BASE_URL}/testimonials`,
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

// // Notifications Component
// const NotificationsModal = ({
//   isOpen,
//   onClose,
//   notifications,
//   onMarkAsRead,
//   onMarkAllAsRead,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   notifications: Notification[];
//   onMarkAsRead: (id: string) => void;
//   onMarkAllAsRead: () => void;
// }) => {
//   const unreadCount = notifications.filter((n) => !n.read).length;

//   if (!isOpen) return null;

//   const getSourceIcon = (source: string) => {
//     switch (source) {
//       case "house":
//         return <HouseIcon className="w-4 h-4 text-green-500" />;
//       case "booking":
//         return <AttachMoneyIcon className="w-4 h-4 text-blue-500" />;
//       case "contact":
//         return <ContactMailIcon className="w-4 h-4 text-orange-500" />;
//       case "request":
//         return <TrendingUpIcon className="w-4 h-4 text-purple-500" />;
//       case "testimonial":
//         return <StarIcon className="w-4 h-4 text-yellow-500" />;
//       default:
//         return <NotificationsIcon className="w-4 h-4 text-gray-500" />;
//     }
//   };

//   const getSourceLabel = (source: string) => {
//     return source.charAt(0).toUpperCase() + source.slice(1);
//   };

//   return (
//     <>
//       <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
//       <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
//         <div className="flex flex-col h-full">
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 border-b border-gray-200">
//             <div>
//               <h2 className="text-lg font-semibold text-gray-800">
//                 Notifications
//               </h2>
//               {unreadCount > 0 && (
//                 <p className="text-sm text-blue-600">
//                   {unreadCount} unread notification{unreadCount > 1 ? "s" : ""}
//                 </p>
//               )}
//             </div>
//             <div className="flex items-center space-x-2">
//               {unreadCount > 0 && (
//                 <button
//                   onClick={onMarkAllAsRead}
//                   className="text-sm text-blue-600 hover:text-blue-800 font-medium"
//                 >
//                   Mark all as read
//                 </button>
//               )}
//               <button
//                 onClick={onClose}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <CloseIcon className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>
//           </div>

//           {/* Notifications List */}
//           <div className="flex-1 overflow-y-auto p-4">
//             {notifications.length === 0 ? (
//               <div className="text-center py-8">
//                 <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <NotificationsIcon className="w-8 h-8 text-gray-400" />
//                 </div>
//                 <p className="text-gray-500">No notifications yet</p>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {notifications.map((notification) => (
//                   <div
//                     key={notification.id}
//                     className={`p-4 rounded-lg border transition-all ${
//                       notification.read
//                         ? "bg-white border-gray-200"
//                         : "bg-blue-50 border-blue-200"
//                     }`}
//                   >
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2 mb-1">
//                           {getSourceIcon(notification.source)}
//                           <span className="text-xs font-medium text-gray-500">
//                             {getSourceLabel(notification.source)}
//                           </span>
//                         </div>
//                         <h3 className="font-medium text-gray-800">
//                           {notification.title}
//                         </h3>
//                         <p className="text-sm text-gray-600 mt-1">
//                           {notification.message}
//                         </p>
//                         <p className="text-xs text-gray-400 mt-2">
//                           {new Date(notification.createdAt).toLocaleDateString(
//                             "en-US",
//                             {
//                               month: "short",
//                               day: "numeric",
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             },
//                           )}
//                         </p>
//                       </div>
//                       {!notification.read && (
//                         <button
//                           onClick={() => onMarkAsRead(notification.id)}
//                           className="ml-2 w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 hover:scale-125 transition-transform"
//                           title="Mark as read"
//                         />
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
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

//   const getMenuItems = () => {
//     if (user?.role === "admin") return adminMenuItems;
//     if (user?.role === "host") return hostMenuItems;
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
//     }
//     return "/dashboard";
//   };

//   const getPanelLabel = () => {
//     if (user?.role === "admin") return "Admin Panel";
//     if (user?.role === "host") return "Host Panel";
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
//   const previousDataRef = useRef<{
//     houses: any[];
//     bookings: any[];
//     contact: any[];
//     requests: any[];
//     testimonials: any[];
//   }>({
//     houses: [],
//     bookings: [],
//     contact: [],
//     requests: [],
//     testimonials: [],
//   });

//   // Fetch data from API and generate notifications
//   const fetchAndProcessData = useCallback(async () => {
//     try {
//       // Fetch all data in parallel
//       const [housesRes, bookingsRes, contactRes, requestsRes, testimonialsRes] =
//         await Promise.all([
//           axios.get(API_ENDPOINTS.houses),
//           axios.get(API_ENDPOINTS.bookings),
//           axios.get(API_ENDPOINTS.contact),
//           axios.get(API_ENDPOINTS.request),
//           axios.get(API_ENDPOINTS.testimonials),
//         ]);

//       const houses = housesRes.data?.data || housesRes.data || [];
//       const bookings = bookingsRes.data?.data || bookingsRes.data || [];
//       const contact = contactRes.data?.data || contactRes.data || [];
//       const requests = requestsRes.data?.data || requestsRes.data || [];
//       const testimonials = testimonialsRes.data?.data || testimonialsRes.data || [];

//       const newNotifications: Notification[] = [];

//       // Check for new houses
//       const prevHouses = previousDataRef.current.houses;
//       if (houses.length > prevHouses.length) {
//         const newHouses = houses.slice(prevHouses.length);
//         newHouses.forEach((house: any) => {
//           newNotifications.push({
//             id: `house-${house._id || Date.now()}-${Math.random()}`,
//             title: "New House Listed",
//             message: `${house.name || "A new house"} has been listed at ${house.pricePerMonth ? `RWF ${house.pricePerMonth}` : "a competitive price"}`,
//             type: "success",
//             read: false,
//             createdAt: house.createdAt || new Date().toISOString(),
//             source: "house",
//             data: house,
//           });
//         });
//       }

//       // Check for new bookings
//       const prevBookings = previousDataRef.current.bookings;
//       if (bookings.length > prevBookings.length) {
//         const newBookings = bookings.slice(prevBookings.length);
//         newBookings.forEach((booking: any) => {
//           newNotifications.push({
//             id: `booking-${booking._id || Date.now()}-${Math.random()}`,
//             title: "New Booking",
//             message: `A new booking has been made${booking.user ? ` by ${booking.user}` : ""}`,
//             type: "info",
//             read: false,
//             createdAt: booking.createdAt || new Date().toISOString(),
//             source: "booking",
//             data: booking,
//           });
//         });
//       }

//       // Check for new contact messages
//       const prevContact = previousDataRef.current.contact;
//       if (contact.length > prevContact.length) {
//         const newContacts = contact.slice(prevContact.length);
//         newContacts.forEach((msg: any) => {
//           newNotifications.push({
//             id: `contact-${msg._id || Date.now()}-${Math.random()}`,
//             title: "New Contact Message",
//             message: `New message from ${msg.name || "someone"}: ${msg.message?.substring(0, 50) || ""}...`,
//             type: "warning",
//             read: false,
//             createdAt: msg.createdAt || new Date().toISOString(),
//             source: "contact",
//             data: msg,
//           });
//         });
//       }

//       // Check for new requests
//       const prevRequests = previousDataRef.current.requests;
//       if (requests.length > prevRequests.length) {
//         const newRequests = requests.slice(prevRequests.length);
//         newRequests.forEach((req: any) => {
//           newNotifications.push({
//             id: `request-${req._id || Date.now()}-${Math.random()}`,
//             title: "New Request",
//             message: `A new request has been submitted${req.user ? ` by ${req.user}` : ""}`,
//             type: "info",
//             read: false,
//             createdAt: req.createdAt || new Date().toISOString(),
//             source: "request",
//             data: req,
//           });
//         });
//       }

//       // Check for new testimonials
//       const prevTestimonials = previousDataRef.current.testimonials;
//       if (testimonials.length > prevTestimonials.length) {
//         const newTestimonials = testimonials.slice(prevTestimonials.length);
//         newTestimonials.forEach((testimonial: any) => {
//           newNotifications.push({
//             id: `testimonial-${testimonial._id || Date.now()}-${Math.random()}`,
//             title: "New Testimonial",
//             message: `${testimonial.name || "Someone"} left a new review: ${testimonial.message?.substring(0, 50) || ""}...`,
//             type: "success",
//             read: false,
//             createdAt: testimonial.createdAt || new Date().toISOString(),
//             source: "testimonial",
//             data: testimonial,
//           });
//         });
//       }

//       // Update previous data
//       previousDataRef.current = {
//         houses,
//         bookings,
//         contact,
//         requests,
//         testimonials,
//       };

//       // Add new notifications
//       if (newNotifications.length > 0) {
//         setNotifications((prev) => [...newNotifications, ...prev]);

//         // Show toast for each new notification
//         newNotifications.slice(0, 5).forEach((notif) => {
//           toast.info(notif.title, {
//             description: notif.message,
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//           });
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching data for notifications:", error);
//     }
//   }, []);

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

//       // Set up polling every 10 seconds for real-time updates
//       const interval = setInterval(fetchAndProcessData, 10000);

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

//   const handleMarkAsRead = (id: string) => {
//     setNotifications((prev) =>
//       prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
//     );
//   };

//   const handleMarkAllAsRead = () => {
//     setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
//   };

//   const unreadCount = notifications.filter((n) => !n.read).length;

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
//     location.pathname.startsWith("/host");

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

//         {/* 404 Routes */}
//         <Route path="/404" element={<NotFound />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//       {!isDashboardRoute && <Footer />}
//     </div>
//   );
// }
// **************************************************************************************************************************************

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

// // Types
// interface UserData {
//   id: number;
//   name: string;
//   email: string;
//   role: "admin" | "user" | "host";
// }

// interface Notification {
//   id: string;
//   title: string;
//   message: string;
//   type: "info" | "success" | "warning" | "error";
//   read: boolean;
//   createdAt: string;
//   source: "house" | "booking" | "contact" | "request" | "testimonial";
//   data?: any;
// }

// // API endpoints
// const API_BASE_URL = "https://rene-inyumba-nodejs.onrender.com";
// const API_ENDPOINTS = {
//   houses: `${API_BASE_URL}/houses/notifications`,
//   bookings: `${API_BASE_URL}/bookings`,
//   contact: `${API_BASE_URL}/contact/notifications`,
//   request: `${API_BASE_URL}/request`,
//   testimonials: `${API_BASE_URL}/testimonials`,
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

// // Centered Notifications Modal - Big and in the center
// const NotificationsModal = ({
//   isOpen,
//   onClose,
//   notifications,
//   onMarkAsRead,
//   onMarkAllAsRead,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   notifications: Notification[];
//   onMarkAsRead: (id: string) => void;
//   onMarkAllAsRead: () => void;
// }) => {
//   const unreadCount = notifications.filter((n) => !n.read).length;

//   if (!isOpen) return null;

//   const getSourceIcon = (source: string) => {
//     switch (source) {
//       case "house":
//         return <HouseIcon className="w-5 h-5 text-green-500" />;
//       case "booking":
//         return <AttachMoneyIcon className="w-5 h-5 text-blue-500" />;
//       case "contact":
//         return <ContactMailIcon className="w-5 h-5 text-orange-500" />;
//       case "request":
//         return <TrendingUpIcon className="w-5 h-5 text-purple-500" />;
//       case "testimonial":
//         return <StarIcon className="w-5 h-5 text-yellow-500" />;
//       default:
//         return <NotificationsIcon className="w-5 h-5 text-gray-500" />;
//     }
//   };

//   const getSourceLabel = (source: string) => {
//     return source.charAt(0).toUpperCase() + source.slice(1);
//   };

//   const getSourceColor = (source: string) => {
//     switch (source) {
//       case "house":
//         return "border-green-200 bg-green-50";
//       case "booking":
//         return "border-blue-200 bg-blue-50";
//       case "contact":
//         return "border-orange-200 bg-orange-50";
//       case "request":
//         return "border-purple-200 bg-purple-50";
//       case "testimonial":
//         return "border-yellow-200 bg-yellow-50";
//       default:
//         return "border-gray-200 bg-gray-50";
//     }
//   };

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
//                   className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
//                 >
//                   Mark all as read
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

//                       {/* Mark as read button */}
//                       {!notification.read && (
//                         <button
//                           onClick={() => onMarkAsRead(notification.id)}
//                           className="flex-shrink-0 w-3 h-3 bg-blue-600 rounded-full hover:scale-125 transition-transform mt-2"
//                           title="Mark as read"
//                         />
//                       )}
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

//   const getMenuItems = () => {
//     if (user?.role === "admin") return adminMenuItems;
//     if (user?.role === "host") return hostMenuItems;
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
//     }
//     return "/dashboard";
//   };

//   const getPanelLabel = () => {
//     if (user?.role === "admin") return "Admin Panel";
//     if (user?.role === "host") return "Host Panel";
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
//   const previousDataRef = useRef<{
//     houses: any[];
//     bookings: any[];
//     contact: any[];
//     requests: any[];
//     testimonials: any[];
//   }>({
//     houses: [],
//     bookings: [],
//     contact: [],
//     requests: [],
//     testimonials: [],
//   });

//   // Fetch data from API and generate notifications
//   const fetchAndProcessData = useCallback(async () => {
//     try {
//       // Fetch all data in parallel
//       const [housesRes, bookingsRes, contactRes, requestsRes, testimonialsRes] =
//         await Promise.all([
//           axios.get(API_ENDPOINTS.houses),
//           axios.get(API_ENDPOINTS.bookings),
//           axios.get(API_ENDPOINTS.contact),
//           axios.get(API_ENDPOINTS.request),
//           axios.get(API_ENDPOINTS.testimonials),
//         ]);

//       const houses = housesRes.data?.data || housesRes.data || [];
//       const bookings = bookingsRes.data?.data || bookingsRes.data || [];
//       const contact = contactRes.data?.data || contactRes.data || [];
//       const requests = requestsRes.data?.data || requestsRes.data || [];
//       const testimonials =
//         testimonialsRes.data?.data || testimonialsRes.data || [];

//       const newNotifications: Notification[] = [];

//       // Check for new houses
//       const prevHouses = previousDataRef.current.houses;
//       if (houses.length > prevHouses.length) {
//         const newHouses = houses.slice(prevHouses.length);
//         newHouses.forEach((house: any) => {
//           newNotifications.push({
//             id: `house-${house._id || Date.now()}-${Math.random()}`,
//             title: "🏠 New House Listed",
//             message: `${house.name || "A new house"} has been listed at ${house.pricePerMonth ? `RWF ${house.pricePerMonth.toLocaleString()}` : "a competitive price"}`,
//             type: "success",
//             read: false,
//             createdAt: house.createdAt || new Date().toISOString(),
//             source: "house",
//             data: house,
//           });
//         });
//       }

//       // Check for new bookings
//       const prevBookings = previousDataRef.current.bookings;
//       if (bookings.length > prevBookings.length) {
//         const newBookings = bookings.slice(prevBookings.length);
//         newBookings.forEach((booking: any) => {
//           newNotifications.push({
//             id: `booking-${booking._id || Date.now()}-${Math.random()}`,
//             title: "📅 New Booking",
//             message: `A new booking has been made${booking.user ? ` by ${booking.user}` : ""}`,
//             type: "info",
//             read: false,
//             createdAt: booking.createdAt || new Date().toISOString(),
//             source: "booking",
//             data: booking,
//           });
//         });
//       }

//       // Check for new contact messages
//       const prevContact = previousDataRef.current.contact;
//       if (contact.length > prevContact.length) {
//         const newContacts = contact.slice(prevContact.length);
//         newContacts.forEach((msg: any) => {
//           newNotifications.push({
//             id: `contact-${msg._id || Date.now()}-${Math.random()}`,
//             title: "✉️ New Contact Message",
//             message: `New message from ${msg.name || "someone"}: ${msg.message?.substring(0, 60) || ""}${msg.message?.length > 60 ? "..." : ""}`,
//             type: "warning",
//             read: false,
//             createdAt: msg.createdAt || new Date().toISOString(),
//             source: "contact",
//             data: msg,
//           });
//         });
//       }

//       // Check for new requests
//       const prevRequests = previousDataRef.current.requests;
//       if (requests.length > prevRequests.length) {
//         const newRequests = requests.slice(prevRequests.length);
//         newRequests.forEach((req: any) => {
//           newNotifications.push({
//             id: `request-${req._id || Date.now()}-${Math.random()}`,
//             title: "📋 New Request",
//             message: `A new request has been submitted${req.user ? ` by ${req.user}` : ""}`,
//             type: "info",
//             read: false,
//             createdAt: req.createdAt || new Date().toISOString(),
//             source: "request",
//             data: req,
//           });
//         });
//       }

//       // Check for new testimonials
//       const prevTestimonials = previousDataRef.current.testimonials;
//       if (testimonials.length > prevTestimonials.length) {
//         const newTestimonials = testimonials.slice(prevTestimonials.length);
//         newTestimonials.forEach((testimonial: any) => {
//           newNotifications.push({
//             id: `testimonial-${testimonial._id || Date.now()}-${Math.random()}`,
//             title: "⭐ New Testimonial",
//             message: `${testimonial.name || "Someone"} left a new review: ${testimonial.message?.substring(0, 60) || ""}${testimonial.message?.length > 60 ? "..." : ""}`,
//             type: "success",
//             read: false,
//             createdAt: testimonial.createdAt || new Date().toISOString(),
//             source: "testimonial",
//             data: testimonial,
//           });
//         });
//       }

//       // Update previous data
//       previousDataRef.current = {
//         houses,
//         bookings,
//         contact,
//         requests,
//         testimonials,
//       };

//       // Add new notifications
//       if (newNotifications.length > 0) {
//         setNotifications((prev) => [...newNotifications, ...prev]);

//         // Show toast for each new notification (limited to 5 at a time)
//         newNotifications.slice(0, 5).forEach((notif) => {
//           // FIX: Use 'body' instead of 'description' for react-toastify
//           toast.info(`${notif.title}`, {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//           });
//           // Optionally show a second toast for the message
//           toast.info(notif.message, {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//           });
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching data for notifications:", error);
//     }
//   }, []);

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

//       // Set up polling every 10 seconds for real-time updates
//       const interval = setInterval(fetchAndProcessData, 10000);

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

//   const handleMarkAsRead = (id: string) => {
//     setNotifications((prev) =>
//       prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
//     );
//   };

//   const handleMarkAllAsRead = () => {
//     setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
//   };

//   const unreadCount = notifications.filter((n) => !n.read).length;

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
//     location.pathname.startsWith("/host");

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

//         {/* 404 Routes */}
//         <Route path="/404" element={<NotFound />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//       {!isDashboardRoute && <Footer />}
//     </div>
//   );
// }
// **************************************************************************************************************************************
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

// // Types
// interface UserData {
//   id: number;
//   name: string;
//   email: string;
//   role: "admin" | "user" | "host";
// }

// // House Notification types based on the API response
// interface HouseNotification {
//   _id: string;
//   type: "house_created" | "house_updated" | "house_status_changed";
//   houseId: {
//     _id: string;
//     houseId: string;
//     name: string;
//     images: Array<{
//       public_id: string;
//       url: string;
//       secure_url: string;
//       _id: string;
//     }>;
//     location: {
//       province: string;
//       district: string;
//       sector: string;
//       cell: string;
//       village: string;
//       coordinates: { lat: number | null; lng: number | null };
//     };
//   };
//   houseName: string;
//   location: {
//     province: string;
//     district: string;
//     sector: string;
//   };
//   message: string;
//   isRead: boolean;
//   isGlobal: boolean;
//   status: "new" | "read";
//   targetRoles: string[];
//   targetUserId: string | null;
//   targetUserEmail: string | null;
//   metadata: {
//     oldStatus?: string;
//     newStatus?: string;
//     changedFields?: string[];
//   };
//   priority: "normal" | "high";
//   readBy: string[];
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

// // User Notification types from auth controller
// interface UserNotification {
//   _id: string;
//   userId: string;
//   type: "welcome" | "verification" | "password_reset" | "profile_update" | "account_deletion" | "booking_created" | "booking_cancelled" | "house_created" | "house_updated" | "house_deleted";
//   title: string;
//   message: string;
//   data?: any;
//   isRead: boolean;
//   isGlobal: boolean;
//   targetRoles?: string[];
//   priority: "normal" | "high";
//   createdAt: string;
//   updatedAt: string;
// }

// // User Activity Notification
// interface ActivityNotification {
//   _id: string;
//   type: string;
//   userId: string;
//   userName: string;
//   userEmail: string;
//   action: string;
//   details: any;
//   message: string;
//   isRead: boolean;
//   createdAt: string;
// }

// // Unified Notification
// interface Notification {
//   id: string;
//   title: string;
//   message: string;
//   type: "info" | "success" | "warning" | "error";
//   read: boolean;
//   createdAt: string;
//   source: "house" | "user" | "activity" | "booking" | "contact" | "request" | "testimonial";
//   data?: any;
// }

// // API endpoints
// const API_BASE_URL = "https://rene-inyumba-nodejs.onrender.com";
// const API_ENDPOINTS = {
//   houses: `${API_BASE_URL}/houses/notifications`,
//   bookings: `${API_BASE_URL}/bookings`,
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
// const getSourceIcon = (source: string) => {
//   switch (source) {
//     case "house":
//       return <HouseIcon className="w-5 h-5 text-green-500" />;
//     case "user":
//       return <PersonIcon className="w-5 h-5 text-purple-500" />;
//     case "activity":
//       return <HistoryIcon className="w-5 h-5 text-indigo-500" />;
//     case "booking":
//       return <AttachMoneyIcon className="w-5 h-5 text-blue-500" />;
//     case "contact":
//       return <ContactMailIcon className="w-5 h-5 text-orange-500" />;
//     case "request":
//       return <TrendingUpIcon className="w-5 h-5 text-purple-500" />;
//     case "testimonial":
//       return <StarIcon className="w-5 h-5 text-yellow-500" />;
//     default:
//       return <NotificationsIcon className="w-5 h-5 text-gray-500" />;
//   }
// };

// const getSourceLabel = (source: string) => {
//   return source.charAt(0).toUpperCase() + source.slice(1);
// };

// const getSourceColor = (source: string) => {
//   switch (source) {
//     case "house":
//       return "border-green-200 bg-green-50";
//     case "user":
//       return "border-purple-200 bg-purple-50";
//     case "activity":
//       return "border-indigo-200 bg-indigo-50";
//     case "booking":
//       return "border-blue-200 bg-blue-50";
//     case "contact":
//       return "border-orange-200 bg-orange-50";
//     case "request":
//       return "border-purple-200 bg-purple-50";
//     case "testimonial":
//       return "border-yellow-200 bg-yellow-50";
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
//   const bgColor = isSuccess ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200";

//   return (
//     <>
//       <div
//         className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1100]"
//         onClick={onClose}
//       />
//       <div className="fixed inset-0 z-[1101] flex items-center justify-center p-4">
//         <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 border-2 ${bgColor} animate-in fade-in zoom-in duration-300`}>
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

//   const getMenuItems = () => {
//     if (user?.role === "admin") return adminMenuItems;
//     if (user?.role === "host") return hostMenuItems;
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
//     }
//     return "/dashboard";
//   };

//   const getPanelLabel = () => {
//     if (user?.role === "admin") return "Admin Panel";
//     if (user?.role === "host") return "Host Panel";
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
//     houseNotifications: HouseNotification[];
//     userNotifications: UserNotification[];
//     activities: ActivityNotification[];
//   }>({
//     houseNotifications: [],
//     userNotifications: [],
//     activities: [],
//   });

//   // Fetch house notifications from API
//   const fetchHouseNotifications = useCallback(async (): Promise<
//     HouseNotification[]
//   > => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(API_ENDPOINTS.houses, {
//         headers: token ? { Authorization: `Bearer ${token}` } : {},
//       });

//       if (response.data?.success && Array.isArray(response.data.data)) {
//         return response.data.data as HouseNotification[];
//       }
//       return [];
//     } catch (error) {
//       console.error("Error fetching house notifications:", error);
//       return [];
//     }
//   }, []);

//   // Fetch user notifications from auth controller
//   const fetchUserNotifications = useCallback(async (): Promise<
//     UserNotification[]
//   > => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return [];

//       const response = await axios.get(API_ENDPOINTS.userNotifications, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.data?.success && Array.isArray(response.data.data)) {
//         return response.data.data as UserNotification[];
//       }
//       if (Array.isArray(response.data)) {
//         return response.data as UserNotification[];
//       }
//       return [];
//     } catch (error) {
//       console.error("Error fetching user notifications:", error);
//       return [];
//     }
//   }, []);

//   // Fetch user activities from API
//   const fetchUserActivities = useCallback(async (): Promise<
//     ActivityNotification[]
//   > => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return [];

//       const response = await axios.get(API_ENDPOINTS.activities, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (Array.isArray(response.data)) {
//         return response.data as ActivityNotification[];
//       }
//       if (response.data?.data && Array.isArray(response.data.data)) {
//         return response.data.data as ActivityNotification[];
//       }
//       return [];
//     } catch (error) {
//       console.error("Error fetching user activities:", error);
//       return [];
//     }
//   }, []);

//   // Process notifications and generate unified format
//   const processNotifications = useCallback(
//     (
//       houseNotifs: HouseNotification[],
//       userNotifs: UserNotification[],
//       activities: ActivityNotification[],
//     ) => {
//       const newNotifications: Notification[] = [];

//       // Process house notifications
//       houseNotifs.forEach((notif) => {
//         const titleMap: Record<string, string> = {
//           house_created: "🏠 New House Listed",
//           house_updated: "📝 House Updated",
//           house_status_changed: "🔄 House Status Changed",
//         };

//         newNotifications.push({
//           id: notif._id,
//           title: titleMap[notif.type] || "🏠 House Notification",
//           message: notif.message,
//           type: "info",
//           read: notif.isRead,
//           createdAt: notif.createdAt,
//           source: "house",
//           data: notif,
//         });
//       });

//       // Process user notifications from auth controller
//       userNotifs.forEach((notif) => {
//         let title = "👤 User Notification";
//         const titleMap: Record<string, string> = {
//           welcome: "👋 Welcome!",
//           verification: "📧 Email Verification",
//           password_reset: "🔑 Password Reset",
//           profile_update: "✏️ Profile Updated",
//           account_deletion: "🗑️ Account Deleted",
//           booking_created: "📅 Booking Created",
//           booking_cancelled: "❌ Booking Cancelled",
//           house_created: "🏠 House Created",
//           house_updated: "📝 House Updated",
//           house_deleted: "🗑️ House Deleted",
//         };

//         title = titleMap[notif.type] || notif.title || "👤 User Notification";

//         newNotifications.push({
//           id: notif._id,
//           title: title,
//           message: notif.message,
//           type: "info",
//           read: notif.isRead,
//           createdAt: notif.createdAt,
//           source: "user",
//           data: notif,
//         });
//       });

//       // Process activity notifications
//       activities.forEach((activity) => {
//         let title = "📋 User Activity";
//         if (activity.action === "login") title = "🔐 User Login";
//         else if (activity.action === "logout") title = "🚪 User Logout";
//         else if (activity.action === "register") title = "📝 New Registration";
//         else if (activity.action === "update_profile") title = "✏️ Profile Updated";
//         else if (activity.action === "booking_created") title = "📅 Booking Created";
//         else if (activity.action === "booking_cancelled") title = "❌ Booking Cancelled";
//         else if (activity.action === "house_created") title = "🏠 House Created";
//         else if (activity.action === "house_updated") title = "📝 House Updated";
//         else if (activity.action === "house_deleted") title = "🗑️ House Deleted";

//         newNotifications.push({
//           id: activity._id,
//           title: title,
//           message: activity.message || `${activity.userName} ${activity.action}`,
//           type: "info",
//           read: activity.isRead || false,
//           createdAt: activity.createdAt,
//           source: "activity",
//           data: activity,
//         });
//       });

//       return newNotifications;
//     },
//     [],
//   );

//   // Fetch and process all data
//   const fetchAndProcessData = useCallback(async () => {
//     try {
//       // Fetch all notifications in parallel
//       const [houseNotifs, userNotifs, activities] = await Promise.all([
//         fetchHouseNotifications(),
//         fetchUserNotifications(),
//         fetchUserActivities(),
//       ]);

//       // Process all notifications into unified format
//       const processedNotifs = processNotifications(
//         houseNotifs,
//         userNotifs,
//         activities,
//       );

//       // Sort by createdAt (newest first)
//       processedNotifs.sort(
//         (a, b) =>
//           new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
//       );

//       // Update state
//       setNotifications(processedNotifs);

//       // Update previous data ref
//       previousDataRef.current = {
//         houseNotifications: houseNotifs,
//         userNotifications: userNotifs,
//         activities: activities,
//       };
//     } catch (error) {
//       console.error("Error fetching notification data:", error);
//     }
//   }, [
//     fetchHouseNotifications,
//     fetchUserNotifications,
//     fetchUserActivities,
//     processNotifications,
//   ]);

//   // Show status modal
//   const showStatusModal = (title: string, message: string, type: "success" | "error") => {
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

//         if (notification.source === "house") {
//           await axios.put(
//             `${API_ENDPOINTS.notifications}/${id}/read`,
//             {},
//             { headers: { Authorization: `Bearer ${token}` } },
//           );
//         } else if (notification.source === "user") {
//           // Mark user notification as read
//           await axios.put(
//             `${API_ENDPOINTS.userNotifications}/${id}/read`,
//             {},
//             { headers: { Authorization: `Bearer ${token}` } },
//           );
//         } else if (notification.source === "activity") {
//           await axios.patch(
//             `${API_ENDPOINTS.activities}/${id}/read`,
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
//         showStatusModal("Error", "Failed to mark notification as read", "error");
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
//       const houseIds = unreadIds.filter((id) =>
//         notifications.find((n) => n.id === id && n.source === "house"),
//       );
//       const userIds = unreadIds.filter((id) =>
//         notifications.find((n) => n.id === id && n.source === "user"),
//       );
//       const activityIds = unreadIds.filter((id) =>
//         notifications.find((n) => n.id === id && n.source === "activity"),
//       );

//       // Mark all as read
//       await Promise.all([
//         houseIds.length > 0
//           ? axios.put(
//               `${API_ENDPOINTS.notifications}/mark-all-read`,
//               {},
//               { headers: { Authorization: `Bearer ${token}` } },
//             )
//           : Promise.resolve(),
//         userIds.length > 0
//           ? axios.put(
//               `${API_ENDPOINTS.userNotifications}/mark-all-read`,
//               {},
//               { headers: { Authorization: `Bearer ${token}` } },
//             )
//           : Promise.resolve(),
//         activityIds.length > 0
//           ? axios.patch(
//               `${API_ENDPOINTS.activities}/read-all`,
//               {},
//               { headers: { Authorization: `Bearer ${token}` } },
//             )
//           : Promise.resolve(),
//       ]);
      
//       showStatusModal("Success", "All notifications marked as read", "success");
//     } catch (error) {
//       console.error("Error marking all notifications as read:", error);
//       // Revert on error
//       setNotifications((prev) =>
//         prev.map((n) =>
//           unreadIds.includes(n.id) ? { ...n, read: false } : n,
//         ),
//       );
//       showStatusModal("Error", "Failed to mark all notifications as read", "error");
//     }
//   }, [notifications]);

//   // Delete a single notification
//   const handleDelete = useCallback(
//     async (id: string) => {
//       // Show confirmation modal first
//       setConfirmationModal({
//         isOpen: true,
//         title: "Delete Notification",
//         message: "Are you sure you want to delete this notification? This action cannot be undone.",
//         confirmText: "Delete",
//         confirmColor: "bg-red-600",
//         onConfirm: async () => {
//           // Close confirmation modal
//           setConfirmationModal(prev => ({ ...prev, isOpen: false }));
          
//           // Optimistically update UI
//           setNotifications((prev) => prev.filter((n) => n.id !== id));

//           try {
//             const token = localStorage.getItem("token");
//             if (!token) return;

//             const notification = notifications.find((n) => n.id === id);
//             if (!notification) return;

//             if (notification.source === "house") {
//               await axios.delete(
//                 `${API_ENDPOINTS.notifications}/${id}`,
//                 { headers: { Authorization: `Bearer ${token}` } },
//               );
//             } else if (notification.source === "user") {
//               await axios.delete(
//                 `${API_ENDPOINTS.userNotifications}/${id}`,
//                 { headers: { Authorization: `Bearer ${token}` } },
//               );
//             } else if (notification.source === "activity") {
//               await axios.delete(
//                 `${API_ENDPOINTS.activities}/${id}`,
//                 { headers: { Authorization: `Bearer ${token}` } },
//               );
//             }
            
//             showStatusModal("Success", "Notification deleted successfully", "success");
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
//       message: "Are you sure you want to delete all notifications? This action cannot be undone.",
//       confirmText: "Delete All",
//       confirmColor: "bg-red-600",
//       onConfirm: async () => {
//         // Close confirmation modal
//         setConfirmationModal(prev => ({ ...prev, isOpen: false }));
        
//         const notificationIds = notifications.map((n) => n.id);

//         // Optimistically update UI
//         setNotifications([]);

//         try {
//           const token = localStorage.getItem("token");
//           if (!token) return;

//           // Separate notifications by source
//           const houseIds = notificationIds.filter((id) =>
//             notifications.find((n) => n.id === id && n.source === "house"),
//           );
//           const userIds = notificationIds.filter((id) =>
//             notifications.find((n) => n.id === id && n.source === "user"),
//           );
//           const activityIds = notificationIds.filter((id) =>
//             notifications.find((n) => n.id === id && n.source === "activity"),
//           );

//           // Delete all notifications
//           await Promise.all([
//             houseIds.length > 0
//               ? axios.delete(
//                   `${API_ENDPOINTS.notifications}/delete-all`,
//                   { headers: { Authorization: `Bearer ${token}` } },
//                 )
//               : Promise.resolve(),
//             userIds.length > 0
//               ? axios.delete(
//                   `${API_ENDPOINTS.userNotifications}/delete-all`,
//                   { headers: { Authorization: `Bearer ${token}` } },
//                 )
//               : Promise.resolve(),
//             activityIds.length > 0
//               ? axios.delete(
//                   `${API_ENDPOINTS.activities}/delete-all`,
//                   { headers: { Authorization: `Bearer ${token}` } },
//                 )
//               : Promise.resolve(),
//           ]);
          
//           showStatusModal("Success", "All notifications deleted successfully", "success");
//         } catch (error) {
//           console.error("Error deleting all notifications:", error);
//           // Revert on error
//           await fetchAndProcessData();
//           showStatusModal("Error", "Failed to delete all notifications", "error");
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
//         onClose={() => setConfirmationModal(prev => ({ ...prev, isOpen: false }))}
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
//         onClose={() => setStatusModal(prev => ({ ...prev, isOpen: false }))}
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
//     location.pathname.startsWith("/host");

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
import { toast, ToastContainer } from "react-toastify";
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
import { AccessTime, HouseRounded, TextSnippet } from "@mui/icons-material";
import { VerificationPage } from "./components/verify/Verification";
import { HouseManagement } from "./components/dashboard/admin/components/house/HouseManagement";

// Types
interface UserData {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "host";
}

// Unified Notification
interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
  source: "house" | "booking" | "contact" | "request" | "user" | "activity" | "testimonial";
  data?: any;
}

// API endpoints
const API_BASE_URL = "https://rene-inyumba-nodejs.onrender.com";
const API_ENDPOINTS = {
  houses: `${API_BASE_URL}/houses/notifications`,
  bookings: `${API_BASE_URL}/bookings/notifications`,
  bookingsByEmail: (email: string) => `${API_BASE_URL}/bookings/notifications/email/${email}`,
  contact: `${API_BASE_URL}/contact/notifications`,
  request: `${API_BASE_URL}/request`,
  testimonials: `${API_BASE_URL}/testimonials`,
  activities: `${API_BASE_URL}/auth/activities`,
  userNotifications: `${API_BASE_URL}/auth/notifications`,
  notifications: `${API_BASE_URL}/houses/notifications`,
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
const getSourceIcon = (source: Notification['source']) => {
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

const getSourceLabel = (source: Notification['source']) => {
  return source.charAt(0).toUpperCase() + source.slice(1);
};

const getSourceColor = (source: Notification['source']) => {
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
  type?: "success" | "error";
}) => {
  if (!isOpen) return null;

  const isSuccess = type === "success";
  const icon = isSuccess ? (
    <CheckCircleIcon className="w-12 h-12 text-green-500" />
  ) : (
    <CancelIcon className="w-12 h-12 text-red-500" />
  );
  const bgColor = isSuccess ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200";

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1100]"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[1101] flex items-center justify-center p-4">
        <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 border-2 ${bgColor} animate-in fade-in zoom-in duration-300`}>
          <div className="text-center">
            <div className="flex justify-center mb-4">{icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600 mb-6">{message}</p>
            <button
              onClick={onClose}
              className={`px-6 py-2.5 text-white rounded-lg hover:opacity-90 transition-opacity font-medium ${
                isSuccess ? "bg-green-600" : "bg-red-600"
              }`}
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
    { id: "logs", label: "Logs", icon: <AccessTime /> },
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

  const getMenuItems = () => {
    if (user?.role === "admin") return adminMenuItems;
    if (user?.role === "host") return hostMenuItems;
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
    }
    return "/dashboard";
  };

  const getPanelLabel = () => {
    if (user?.role === "admin") return "Admin Panel";
    if (user?.role === "host") return "Host Panel";
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
              className="w-full flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
            >
              <LogoutIcon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium text-sm sm:text-base">Logout</span>
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

// Layout with Sidebar
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
    type: "success" | "error";
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

  // Fetch booking notifications based on user role
  const fetchBookingNotifications = useCallback(async (userData: UserData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return [];

      let url = "";
      // Admin and Host get all booking notifications
      if (userData.role === "admin" || userData.role === "host") {
        url = API_ENDPOINTS.bookings;
      } else {
        // Users get booking notifications by email
        url = API_ENDPOINTS.bookingsByEmail(userData.email);
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Handle different response structures
      if (response.data?.success && Array.isArray(response.data.notifications)) {
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

  // Fetch all notifications
  const fetchAllNotifications = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const userDataStr = localStorage.getItem("user");
      const userData = userDataStr ? JSON.parse(userDataStr) : null;
      
      if (!token || !userData) return [];

      // Fetch booking notifications based on role
      const bookingNotifications = await fetchBookingNotifications(userData);

      // Fetch user notifications
      const userResponse = await axios.get(API_ENDPOINTS.userNotifications, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Fetch activities
      const activityResponse = await axios.get(API_ENDPOINTS.activities, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Fetch house notifications
      const houseResponse = await axios.get(API_ENDPOINTS.houses, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Combine all notifications
      let allNotifications: any[] = [];

      // Add booking notifications
      if (Array.isArray(bookingNotifications)) {
        allNotifications = [...allNotifications, ...bookingNotifications];
      }

      // Add user notifications
      if (userResponse.data?.success && Array.isArray(userResponse.data.data)) {
        allNotifications = [...allNotifications, ...userResponse.data.data];
      } else if (Array.isArray(userResponse.data)) {
        allNotifications = [...allNotifications, ...userResponse.data];
      }

      // Add activities
      if (Array.isArray(activityResponse.data)) {
        allNotifications = [...allNotifications, ...activityResponse.data];
      } else if (activityResponse.data?.data && Array.isArray(activityResponse.data.data)) {
        allNotifications = [...allNotifications, ...activityResponse.data.data];
      }

      // Add house notifications
      if (houseResponse.data?.success && Array.isArray(houseResponse.data.data)) {
        allNotifications = [...allNotifications, ...houseResponse.data.data];
      }

      return allNotifications;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return [];
    }
  }, [fetchBookingNotifications]);

  // Process notifications and generate unified format
  const processNotifications = useCallback(
    (rawNotifications: any[]) => {
      const newNotifications: Notification[] = [];

      rawNotifications.forEach((notif) => {
        // Determine source based on notification type
        let source: Notification['source'] = "activity";
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
        else if (notif.type === "contact_created") {
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
          else if (notif.action === "update_profile") title = "✏️ Profile Updated";
          else if (notif.action === "booking_created") title = "📅 Booking Created";
          else if (notif.action === "booking_cancelled") title = "❌ Booking Cancelled";
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

        // Use message from notification or generate one
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
    },
    [],
  );

  // Fetch and process all data
  const fetchAndProcessData = useCallback(async () => {
    try {
      // Fetch all notifications
      const rawNotifications = await fetchAllNotifications();

      // Process all notifications into unified format
      const processedNotifs = processNotifications(rawNotifications);

      // Sort by createdAt (newest first)
      processedNotifs.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

      // Update state
      setNotifications(processedNotifs);

      // Update previous data ref
      previousDataRef.current = {
        notifications: rawNotifications,
      };
    } catch (error) {
      console.error("Error fetching notification data:", error);
    }
  }, [
    fetchAllNotifications,
    processNotifications,
  ]);

  // Show status modal
  const showStatusModal = (title: string, message: string, type: "success" | "error") => {
    setStatusModal({
      isOpen: true,
      title,
      message,
      type,
    });
  };

  // Mark notification as read
  const handleMarkAsRead = useCallback(
    async (id: string) => {
      // Optimistically update UI
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
      );

      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        // Determine which API to call based on notification source
        const notification = notifications.find((n) => n.id === id);
        if (!notification) return;

        const source = notification.source;
        let url = "";

        // Updated routes following the provided booking routes
        if (source === "booking") {
          url = `${API_ENDPOINTS.bookings}/${id}/read`;
        } else if (source === "contact") {
          url = `${API_ENDPOINTS.contact}/${id}/read`;
        } else if (source === "request") {
          url = `${API_ENDPOINTS.request}/${id}/read`;
        } else if (source === "house") {
          url = `${API_ENDPOINTS.notifications}/${id}/read`;
        } else if (source === "user") {
          url = `${API_ENDPOINTS.userNotifications}/${id}/read`;
        } else if (source === "activity") {
          url = `${API_ENDPOINTS.activities}/${id}/read`;
        } else if (source === "testimonial") {
          url = `${API_ENDPOINTS.testimonials}/${id}/read`;
        }

        if (url) {
          await axios.put(
            url,
            {},
            { headers: { Authorization: `Bearer ${token}` } },
          );
        }
      } catch (error) {
        console.error("Error marking notification as read:", error);
        // Revert on error
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, read: false } : n)),
        );
        showStatusModal("Error", "Failed to mark notification as read", "error");
      }
    },
    [notifications],
  );

  // Mark all notifications as read
  const handleMarkAllAsRead = useCallback(async () => {
    const unreadIds = notifications.filter((n) => !n.read).map((n) => n.id);

    // Optimistically update UI
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      // Separate notifications by source
      const sources: Notification['source'][] = ["booking", "contact", "request", "house", "user", "activity", "testimonial"];
      const promises = [];

      for (const source of sources) {
        const ids = unreadIds.filter((id) =>
          notifications.find((n) => n.id === id && n.source === source),
        );

        if (ids.length > 0) {
          let url = "";
          if (source === "booking") url = `${API_ENDPOINTS.bookings}/mark-all-read`;
          else if (source === "contact") url = `${API_ENDPOINTS.contact}/mark-all-read`;
          else if (source === "request") url = `${API_ENDPOINTS.request}/mark-all-read`;
          else if (source === "house") url = `${API_ENDPOINTS.notifications}/mark-all-read`;
          else if (source === "user") url = `${API_ENDPOINTS.userNotifications}/mark-all-read`;
          else if (source === "activity") url = `${API_ENDPOINTS.activities}/read-all`;
          else if (source === "testimonial") url = `${API_ENDPOINTS.testimonials}/mark-all-read`;

          if (url) {
            promises.push(
              axios.put(
                url,
                {},
                { headers: { Authorization: `Bearer ${token}` } },
              )
            );
          }
        }
      }

      await Promise.all(promises);
      
      showStatusModal("Success", "All notifications marked as read", "success");
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      // Revert on error
      setNotifications((prev) =>
        prev.map((n) =>
          unreadIds.includes(n.id) ? { ...n, read: false } : n,
        ),
      );
      showStatusModal("Error", "Failed to mark all notifications as read", "error");
    }
  }, [notifications]);

  // Delete a single notification
  const handleDelete = useCallback(
    async (id: string) => {
      // Show confirmation modal first
      setConfirmationModal({
        isOpen: true,
        title: "Delete Notification",
        message: "Are you sure you want to delete this notification? This action cannot be undone.",
        confirmText: "Delete",
        confirmColor: "bg-red-600",
        onConfirm: async () => {
          // Close confirmation modal
          setConfirmationModal(prev => ({ ...prev, isOpen: false }));
          
          // Optimistically update UI
          setNotifications((prev) => prev.filter((n) => n.id !== id));

          try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const notification = notifications.find((n) => n.id === id);
            if (!notification) return;

            const source = notification.source;
            let url = "";

            // Updated routes following the provided booking routes
            if (source === "booking") {
              url = `${API_ENDPOINTS.bookings}/${id}`;
            } else if (source === "contact") {
              url = `${API_ENDPOINTS.contact}/${id}`;
            } else if (source === "request") {
              url = `${API_ENDPOINTS.request}/${id}`;
            } else if (source === "house") {
              url = `${API_ENDPOINTS.notifications}/${id}`;
            } else if (source === "user") {
              url = `${API_ENDPOINTS.userNotifications}/${id}`;
            } else if (source === "activity") {
              url = `${API_ENDPOINTS.activities}/${id}`;
            } else if (source === "testimonial") {
              url = `${API_ENDPOINTS.testimonials}/${id}`;
            }

            if (url) {
              await axios.delete(
                url,
                { headers: { Authorization: `Bearer ${token}` } },
              );
            }
            
            showStatusModal("Success", "Notification deleted successfully", "success");
          } catch (error) {
            console.error("Error deleting notification:", error);
            // Revert on error
            await fetchAndProcessData();
            showStatusModal("Error", "Failed to delete notification", "error");
          }
        },
        type: "delete",
      });
    },
    [notifications, fetchAndProcessData],
  );

  // Delete all notifications
  const handleDeleteAll = useCallback(async () => {
    // Show confirmation modal first
    setConfirmationModal({
      isOpen: true,
      title: "Delete All Notifications",
      message: "Are you sure you want to delete all notifications? This action cannot be undone.",
      confirmText: "Delete All",
      confirmColor: "bg-red-600",
      onConfirm: async () => {
        // Close confirmation modal
        setConfirmationModal(prev => ({ ...prev, isOpen: false }));
        
        const notificationIds = notifications.map((n) => n.id);

        // Optimistically update UI
        setNotifications([]);

        try {
          const token = localStorage.getItem("token");
          if (!token) return;

          // Separate notifications by source
          const sources: Notification['source'][] = ["booking", "contact", "request", "house", "user", "activity", "testimonial"];
          const promises = [];

          for (const source of sources) {
            const ids = notificationIds.filter((id) =>
              notifications.find((n) => n.id === id && n.source === source),
            );

            if (ids.length > 0) {
              let url = "";
              if (source === "booking") url = `${API_ENDPOINTS.bookings}/delete-all`;
              else if (source === "contact") url = `${API_ENDPOINTS.contact}/delete-all`;
              else if (source === "request") url = `${API_ENDPOINTS.request}/delete-all`;
              else if (source === "house") url = `${API_ENDPOINTS.notifications}/delete-all`;
              else if (source === "user") url = `${API_ENDPOINTS.userNotifications}/delete-all`;
              else if (source === "activity") url = `${API_ENDPOINTS.activities}/delete-all`;
              else if (source === "testimonial") url = `${API_ENDPOINTS.testimonials}/delete-all`;

              if (url) {
                promises.push(
                  axios.delete(
                    url,
                    { headers: { Authorization: `Bearer ${token}` } },
                  )
                );
              }
            }
          }

          await Promise.all(promises);
          
          showStatusModal("Success", "All notifications deleted successfully", "success");
        } catch (error) {
          console.error("Error deleting all notifications:", error);
          // Revert on error
          await fetchAndProcessData();
          showStatusModal("Error", "Failed to delete all notifications", "error");
        }
      },
      type: "delete-all",
    });
  }, [notifications, fetchAndProcessData]);

  const unreadCount = notifications.filter((n) => !n.read).length;

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

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        await axios.post(
          "https://rene-inyumba-nodejs.onrender.com/auth/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userId");
      localStorage.removeItem("isUserMenuOpen");
      localStorage.removeItem("isDashboardOpen");

      toast.success("👋 Logged Out Successfully!");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userId");
      localStorage.removeItem("isUserMenuOpen");
      localStorage.removeItem("isDashboardOpen");

      toast.success("👋 Logged Out Successfully!");
      navigate("/");
    }
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
        onClose={() => setConfirmationModal(prev => ({ ...prev, isOpen: false }))}
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
        onClose={() => setStatusModal(prev => ({ ...prev, isOpen: false }))}
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

export default function App() {
  const location = useLocation();

  const isDashboardRoute =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/user") ||
    location.pathname.startsWith("/host");

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

        {/* 404 Routes */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isDashboardRoute && <Footer />}
    </div>
  );
}