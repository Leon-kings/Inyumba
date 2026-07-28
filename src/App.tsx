/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import "./App.css";
// import { Routes, Route } from "react-router-dom";
// import { Navbar } from "./components/navbar/Navbar";
// import { About } from "./pages/about/About";
// import { Services } from "./pages/services/Services";
// import { Home } from "./pages/home/Home";
// import { Footer } from "./components/footer/Footer";
// import { NotFound } from "./pages/notfound/NotFound";
// import { FAQ } from "./components/faq/FAQ";
// import { Help } from "./components/faq/Help";
// import { Dashboard } from "./components/dashboard/admin/Dashboard";

// export default function App() {
//   return (
//     <>
//       <div className="w-full">
//         <Navbar />
//         <Routes>
// <Route path="/" element={<Home />} />
// <Route path="/about" element={<About />} />
// <Route path="/services" element={<Services />} />
// {/* 404 Not Found route - must be last */}
// <Route path="*" element={<NotFound />} />
// <Route path="/faq" element={<FAQ />} />
// <Route path="/help" element={<Help />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Routes>
//         <Footer />
//       </div>
//     </>
//   );
// }

/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
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
import SettingsIcon from "@mui/icons-material/Settings";
import SavingsIcon from "@mui/icons-material/Savings";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Dashboard } from "./components/dashboard/admin/Dashboard";

import { Money } from "@mui/icons-material";
import { Home } from "./pages/home/Home";
import { About } from "./pages/about/About";
import { Services } from "./pages/services/Services";
import { NotFound } from "./pages/notfound/NotFound";
import { FAQ } from "./components/faq/FAQ";
import { Help } from "./components/faq/Help";
import { Navbar } from "./components/navbar/Navbar";
import { Footer } from "./components/footer/Footer";
import { UserManagement } from "./components/dashboard/admin/components/users/UserManagement";

// Types
interface UserData {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "host";
}

interface LoginResponse {
  success: boolean;
  user?: UserData;
}

// Static user data for demo with multiple roles
const DEMO_USERS = {
  admin: {
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    role: "admin" as const,
    id: 1,
  },
  user: {
    email: "user@example.com",
    password: "user123",
    name: "Regular User",
    role: "user" as const,
    id: 2,
  },
  host: {
    email: "host@example.com",
    password: "host123",
    name: "Host User",
    role: "host" as const,
    id: 3,
  },
};

// Protected Route Component - FIXED
const ProtectedRoute = ({
  children,
  allowedRoles = [],
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) => {
  const token = localStorage.getItem("token");
  const userData = JSON.parse(
    localStorage.getItem("user") || "null",
  ) as UserData | null;

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
  location: any;
}) => {
  const navigate = useNavigate();

  const adminMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
    },
    {
      id: "users",
      label: "Users",
      icon: <PeopleIcon />,
      path: "/dashboard/users",
    },
    {
      id: "expenses",
      label: "Expenses",
      icon: <AttachMoneyIcon />,
      path: "/dashboard/expenses",
    },
    {
      id: "income",
      label: "Income",
      icon: <TrendingUpIcon />,
      path: "/dashboard/income",
    },
    {
      id: "savings",
      label: "Savings",
      icon: <SavingsIcon />,
      path: "/dashboard/savings",
    },
    {
      id: "budget",
      label: "Budget",
      icon: <Money />,
      path: "/dashboard/budget",
    },

    {
      id: "reports",
      label: "Reports",
      icon: <BarChartIcon />,
      path: "/dashboard/reports",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <SettingsIcon />,
      path: "/dashboard/settings",
    },
  ];

  const userMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <DashboardIcon />,
      path: "/user/dashboard",
    },
    {
      id: "expenses",
      label: "My Expenses",
      icon: <AttachMoneyIcon />,
      path: "/user/expenses",
    },
    {
      id: "income",
      label: "My Income",
      icon: <TrendingUpIcon />,
      path: "/user/income",
    },
    {
      id: "budget",
      label: "My Budget",
      icon: <Money />,
      path: "/user/budget",
    },
    {
      id: "savings",
      label: "My Savings",
      icon: <SavingsIcon />,
      path: "/user/savings",
    },

    {
      id: "reports",
      label: "Reports",
      icon: <BarChartIcon />,
      path: "/user/reports",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <SettingsIcon />,
      path: "/user/settings",
    },
  ];

  const hostMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <DashboardIcon />,
      path: "/host/dashboard",
    },
    {
      id: "properties",
      label: "My Properties",
      icon: <PeopleIcon />,
      path: "/host/properties",
    },
    {
      id: "bookings",
      label: "Bookings",
      icon: <AttachMoneyIcon />,
      path: "/host/bookings",
    },
    {
      id: "earnings",
      label: "Earnings",
      icon: <TrendingUpIcon />,
      path: "/host/earnings",
    },
    {
      id: "reports",
      label: "Reports",
      icon: <BarChartIcon />,
      path: "/host/reports",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <SettingsIcon />,
      path: "/host/settings",
    },
  ];

  let menuItems;
  if (user?.role === "admin") {
    menuItems = adminMenuItems;
  } else if (user?.role === "host") {
    menuItems = hostMenuItems;
  } else {
    menuItems = userMenuItems;
  }

  const isAdmin = user?.role === "admin";
  const isHost = user?.role === "host";

  const getPanelLabel = () => {
    if (isAdmin) return "Admin Panel";
    if (isHost) return "Host Panel";
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
      {/* Mobile Menu Button */}
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

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64 sm:w-72 md:w-80 lg:w-64 xl:w-72 2xl:w-80`}
      >
        <div className="flex flex-col h-full">
          {/* Brand */}
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

          {/* User Info */}
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

          {/* Menu Items */}
          <nav className="flex-1 p-3 sm:p-4 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all duration-200 mb-1 ${
                  location.pathname === item.path
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span className="w-5 h-5 flex-shrink-0">{item.icon}</span>
                <span className="font-medium text-sm sm:text-base truncate">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          {/* Bottom Actions */}
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

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
};

// Layout with Sidebar - FIXED
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(
      localStorage.getItem("user") || "null",
    ) as UserData | null;

    if (!token || !userData) {
      navigate("/");
      return;
    }

    setUser(userData);

    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1536) {
        setIsSidebarOpen(true);
      } else if (width >= 1280) {
        setIsSidebarOpen(true);
      } else if (width >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
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

      {/* Main Content */}
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

// Login handler for Front component - FIXED
export const handleLogin = (email: string, password: string): LoginResponse => {
  if (
    email === DEMO_USERS.admin.email &&
    password === DEMO_USERS.admin.password
  ) {
    const userData: UserData = {
      id: DEMO_USERS.admin.id,
      name: DEMO_USERS.admin.name,
      email: DEMO_USERS.admin.email,
      role: DEMO_USERS.admin.role,
    };

    localStorage.setItem("token", "demo-admin-token-12345");
    localStorage.setItem("user", JSON.stringify(userData));

    toast.success("Welcome Admin! Redirecting to dashboard...");
    return { success: true, user: userData };
  }

  if (
    email === DEMO_USERS.user.email &&
    password === DEMO_USERS.user.password
  ) {
    const userData: UserData = {
      id: DEMO_USERS.user.id,
      name: DEMO_USERS.user.name,
      email: DEMO_USERS.user.email,
      role: DEMO_USERS.user.role,
    };

    localStorage.setItem("token", "demo-user-token-67890");
    localStorage.setItem("user", JSON.stringify(userData));

    toast.success("Welcome User! Redirecting to dashboard...");
    return { success: true, user: userData };
  }

  if (
    email === DEMO_USERS.host.email &&
    password === DEMO_USERS.host.password
  ) {
    const userData: UserData = {
      id: DEMO_USERS.host.id,
      name: DEMO_USERS.host.name,
      email: DEMO_USERS.host.email,
      role: DEMO_USERS.host.role,
    };

    localStorage.setItem("token", "demo-host-token-11111");
    localStorage.setItem("user", JSON.stringify(userData));

    toast.success("Welcome Host! Redirecting to dashboard...");
    return { success: true, user: userData };
  }

  toast.error("Invalid email or password. Please try again.");
  return { success: false };
};

export default function App() {
  const location = useLocation();

  // Check if current path is a dashboard route
  const isDashboardRoute =
    location.pathname === "/dashboard" ||
    location.pathname === "/user/dashboard" ||
    location.pathname === "/host/dashboard";

  return (
    <>
      <div className="w-full">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/help" element={<Help />} />

          {/* Admin Dashboard Routes */}
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

          {/* User Dashboard Routes */}
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <DashboardLayout>
                  <div className="p-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                      User Dashboard
                    </h2>
                    <p className="text-gray-600 mt-2">
                      Welcome to your personal dashboard.
                    </p>
                  </div>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Host Dashboard Routes */}
          <Route
            path="/host/dashboard"
            element={
              <ProtectedRoute allowedRoles={["host"]}>
                <DashboardLayout>
                  <div className="p-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Host Dashboard
                    </h2>
                    <p className="text-gray-600 mt-2">
                      Welcome to your hosting dashboard.
                    </p>
                  </div>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* 404 Not Found route */}
          <Route path="/404" element={<NotFound />} />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {/* Only render Footer if not on dashboard routes */}
        {!isDashboardRoute && <Footer />}
      </div>
    </>
  );
}
