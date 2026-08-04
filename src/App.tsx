/* eslint-disable react-hooks/set-state-in-effect */

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
// import SavingsIcon from "@mui/icons-material/Savings";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import EmailIcon from "@mui/icons-material/Email";

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

// // Types
// interface UserData {
//   id: number;
//   name: string;
//   email: string;
//   role: "admin" | "user" | "host";
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

// // Sidebar Component
// const Sidebar = ({
//   user,
//   onLogout,
//   isOpen,
//   onToggle,
//   location,
// }: {
//   user: UserData | null;
//   onLogout: () => void;
//   isOpen: boolean;
//   onToggle: () => void;
//   location: any;
// }) => {
//   const navigate = useNavigate();

//   const menuItems = [
//     { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
//     { id: "users", label: "Users", icon: <PeopleIcon /> },
//     { id: "bookings", label: "Bookings", icon: <AttachMoneyIcon /> },
//     { id: "requests", label: "Requests", icon: <TrendingUpIcon /> },
//     { id: "messages", label: "Messages", icon: <EmailIcon /> },
//   ];

//   const getItemPath = (itemId: string) => {
//     if (user?.role === "admin") {
//       if (itemId === "dashboard") return "/dashboard";
//       return `/dashboard/${itemId}`;
//     } else if (user?.role === "user") {
//       const pathMap: Record<string, string> = {
//         dashboard: "/user/dashboard",
//         users: "/user/management",
//         bookings: "/user/bookings",
//         requests: "/user/requests",
//         messages: "/user/messages",
//       };
//       return pathMap[itemId] || "/user/dashboard";
//     } else if (user?.role === "host") {
//       const pathMap: Record<string, string> = {
//         dashboard: "/host/dashboard",
//         users: "/host/management",
//         bookings: "/host/bookings",
//         requests: "/host/requests",
//         messages: "/host/messages",
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
//                 <SavingsIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
//               </div>
//               <div className="min-w-0">
//                 <h1 className="text-lg sm:text-xl font-bold text-gray-800 truncate">
//                   HEMS
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

//           <div className="p-3 sm:p-4 border-t border-gray-200">
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

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     toast.success("Logged out successfully!");
//     navigate("/");
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
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/services" element={<Services />} />
//         <Route path="/faq" element={<FAQ />} />
//         <Route path="/help" element={<Help />} />
//         <Route path="/experience" element={<HouseOnRent />} />
//         <Route path="/testimonials" element={<Testimonials />} />

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
//           path="/dashboard/budget"
//           element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//               <DashboardLayout>
//                 <Dashboard />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard/reports"
//           element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//               <DashboardLayout>
//                 <Dashboard />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard/settings"
//           element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//               <DashboardLayout>
//                 <Dashboard />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

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
//           path="/user/messages"
//           element={
//             <ProtectedRoute allowedRoles={["user"]}>
//               <DashboardLayout>
//                 <UserMessageManagement />
//               </DashboardLayout>
//             </ProtectedRoute>
//           }
//         />

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

//         <Route path="/404" element={<NotFound />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//       {!isDashboardRoute && <Footer />}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
  type Location,
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
import SavingsIcon from "@mui/icons-material/Savings";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";

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

// Types
interface UserData {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "host";
}

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

// Sidebar Component
const Sidebar = ({
  user,
  onLogout,
  isOpen,
  onToggle,
  location,
}: {
  user: UserData | null;
  onLogout: () => void;
  isOpen: boolean;
  onToggle: () => void;
  location: Location;
}) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    { id: "users", label: "Users", icon: <PeopleIcon /> },
    { id: "bookings", label: "Bookings", icon: <AttachMoneyIcon /> },
    { id: "requests", label: "Requests", icon: <TrendingUpIcon /> },
    { id: "messages", label: "Messages", icon: <EmailIcon /> },
  ];

  const getItemPath = (itemId: string) => {
    if (user?.role === "admin") {
      if (itemId === "dashboard") return "/dashboard";
      return `/dashboard/${itemId}`;
    } else if (user?.role === "user") {
      const pathMap: Record<string, string> = {
        dashboard: "/user/dashboard",
        users: "/user/management",
        bookings: "/user/bookings",
        requests: "/user/requests",
        messages: "/user/messages",
      };
      return pathMap[itemId] || "/user/dashboard";
    } else if (user?.role === "host") {
      const pathMap: Record<string, string> = {
        dashboard: "/host/dashboard",
        users: "/host/management",
        bookings: "/host/bookings",
        requests: "/host/requests",
        messages: "/host/messages",
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
                <SavingsIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold text-gray-800 truncate">
                  HEMS
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

          <div className="p-3 sm:p-4 border-t border-gray-200">
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

      return () => window.removeEventListener("resize", handleResize);
    } catch (error) {
      console.error("Error in DashboardLayout:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Update app state via localStorage or context if needed
    // These would typically be managed by a global state
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("isUserMenuOpen");
    localStorage.removeItem("isDashboardOpen");

    // Show success message
    toast.success("👋 Logged Out Successfully!");

    // Navigate to home
    navigate("/");
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
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Sidebar
        user={user}
        onLogout={handleLogout}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        location={location}
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
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/help" element={<Help />} />
        <Route path="/house/rent" element={<HouseOnRent />} />
        <Route path="/testimonials" element={<Testimonials />} />

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
          path="/user/messages"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <DashboardLayout>
                <UserMessageManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

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

        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isDashboardRoute && <Footer />}
    </div>
  );
}
