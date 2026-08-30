
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";

// Material-UI Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import PaymentsIcon from "@mui/icons-material/Payments";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import RefreshIcon from "@mui/icons-material/Refresh";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import VerifiedIcon from "@mui/icons-material/Verified";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// Recharts for graphs
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

// Translations
const translations = {
  en: {
    dashboard: "Dashboard",
    adminDashboard: "Admin Dashboard",
    overview: "Overview",
    users: "Users",
    houses: "Houses",
    bookings: "Bookings",
    universities: "Universities",
    revenue: "Revenue",
    totalUsers: "Total Users",
    totalHouses: "Total Houses",
    totalBookings: "Total Bookings",
    totalRevenue: "Total Revenue",
    activeUsers: "Active Users",
    pendingBookings: "Pending Bookings",
    verifiedHouses: "Verified Houses",
    satisfactionRate: "Satisfaction Rate",
    recentActivity: "Recent Activity",
    topPerformers: "Top Performers",
    quickStats: "Quick Stats",
    viewAll: "View All",
    manageUsers: "Manage Users",
    manageHouses: "Manage Houses",
    manageBookings: "Manage Bookings",
    manageUniversities: "Manage Universities",
    revenueTrend: "Revenue Trend",
    bookingTrend: "Booking Trend",
    houseDistribution: "House Distribution by Category",
    monthlyRevenue: "Monthly Revenue",
    monthlyBookings: "Monthly Bookings",
    userGrowth: "User Growth",
    today: "Today",
    thisWeek: "This Week",
    thisMonth: "This Month",
    thisYear: "This Year",
    loading: "Loading...",
    noData: "No data found",
    refresh: "Refresh",
    export: "Export",
    print: "Print",
  },
  fr: {
    dashboard: "Tableau de Bord",
    adminDashboard: "Tableau de Bord Administrateur",
    overview: "Aperçu",
    users: "Utilisateurs",
    houses: "Maisons",
    bookings: "Réservations",
    universities: "Universités",
    revenue: "Revenu",
    totalUsers: "Total Utilisateurs",
    totalHouses: "Total Maisons",
    totalBookings: "Total Réservations",
    totalRevenue: "Revenu Total",
    activeUsers: "Utilisateurs Actifs",
    pendingBookings: "Réservations en Attente",
    verifiedHouses: "Maisons Vérifiées",
    satisfactionRate: "Taux de Satisfaction",
    recentActivity: "Activité Récente",
    topPerformers: "Meilleurs Performeurs",
    quickStats: "Statistiques Rapides",
    viewAll: "Voir Tout",
    manageUsers: "Gérer les Utilisateurs",
    manageHouses: "Gérer les Maisons",
    manageBookings: "Gérer les Réservations",
    manageUniversities: "Gérer les Universités",
    revenueTrend: "Tendance des Revenus",
    bookingTrend: "Tendance des Réservations",
    houseDistribution: "Distribution des Maisons par Catégorie",
    monthlyRevenue: "Revenus Mensuels",
    monthlyBookings: "Réservations Mensuelles",
    userGrowth: "Croissance des Utilisateurs",
    today: "Aujourd'hui",
    thisWeek: "Cette Semaine",
    thisMonth: "Ce Mois",
    thisYear: "Cette Année",
    loading: "Chargement...",
    noData: "Aucune donnée trouvée",
    refresh: "Rafraîchir",
    export: "Exporter",
    print: "Imprimer",
  },
  rw: {
    dashboard: "Ibikorwa",
    adminDashboard: "Ibikorwa by'Ubuyobozi",
    overview: "Aperçu",
    users: "Abakoresha",
    houses: "Amazu",
    bookings: "Ibyanditswe",
    universities: "Kaminuza",
    revenue: "Amahera",
    totalUsers: "Abakoresha Bose",
    totalHouses: "Amazu Yose",
    totalBookings: "Ibyanditswe Byose",
    totalRevenue: "Amahera Yose",
    activeUsers: "Abakoresha Bakoresha",
    pendingBookings: "Ibyanditswe Bitegereje",
    verifiedHouses: "Amazu Yemejwe",
    satisfactionRate: "Igipimo Cyo Kunyurwa",
    recentActivity: "Ibikorwa Vuba",
    topPerformers: "Abakora Neza",
    quickStats: "Ibibarwa Vuba",
    viewAll: "Reba Byose",
    manageUsers: "Gucunga Abakoresha",
    manageHouses: "Gucunga Amazu",
    manageBookings: "Gucunga Ibyanditswe",
    manageUniversities: "Gucunga Kaminuza",
    revenueTrend: "Imihindagurikire y'Amahera",
    bookingTrend: "Imihindagurikire y'Ibyanditswe",
    houseDistribution: "Ibyiciro by'Amazu",
    monthlyRevenue: "Amahera ku Kwezi",
    monthlyBookings: "Ibyanditswe ku Kwezi",
    userGrowth: "Kwiyongera kw'Abakoresha",
    today: "Uyu Munsi",
    thisWeek: "Iyi Cyumweru",
    thisMonth: "Uku Kwezi",
    thisYear: "Uyu Mwaka",
    loading: "Biremereza...",
    noData: "Nta makuru yabonetse",
    refresh: "Vugurura",
    export: "Kuvanamo",
    print: "Capa",
  },
};

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  color,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -4 }}
    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
  >
    <div className="flex items-center justify-between mb-3">
      <div
        className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white`}
      >
        {icon}
      </div>
      {change !== undefined && (
        <div
          className={`flex items-center gap-1 text-sm font-medium ${change >= 0 ? "text-green-500" : "text-red-500"}`}
        >
          {change >= 0 ? (
            <ArrowUpwardIcon className="w-3 h-3" />
          ) : (
            <ArrowDownwardIcon className="w-3 h-3" />
          )}
          {Math.abs(change)}%
        </div>
      )}
    </div>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
    <p className="text-sm text-gray-500 mt-1">{title}</p>
  </motion.div>
);

// Chart Colors
const COLORS = [
  "#FF385C",
  "#4F46E5",
  "#22C55E",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#F97316",
];

// Helper function to get language from cookies
const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
  const lang = Cookies.get("language") as "en" | "fr" | "rw";
  return lang || "en";
};

// API Response Types
interface UserStats {
  success: boolean;
  statistics: {
    totalUsers: number;
    activeUsers: number;
    inactiveUsers: number;
    verifiedUsers: number;
    unverifiedUsers: number;
    newUsersLast30Days: number;
    usersByRole: Array<{
      count: number;
      role: string;
    }>;
  };
  recentUsers: Array<{
    _id: string;
    name: string;
    email: string;
    phone: string;
    isActive: boolean;
    role: string;
    lastLogin: string | null;
    isEmailVerified: boolean;
    createdAt: string;
    updatedAt: string;
    statistics: {
      totalIncome: number;
      totalExpenses: number;
      totalSavings: number;
      monthlyIncome: number;
      monthlyExpenses: number;
      monthlyBudget: number;
      membersCount: number;
    };
  }>;
}

// Booking Stats Types
interface BookingStats {
  success: boolean;
  data: {
    total: number;
    byStatus: {
      pending: number;
      confirmed: number;
      cancelled: number;
      completed: number;
    };
    byPayment: {
      pending: number;
      verified: number;
      failed: number;
    };
    totalRevenue: number;
    monthlyBookings: Array<{
      _id: {
        year: number;
        month: number;
      };
      count: number;
      revenue: number;
    }>;
  };
}

// House API Response Types
interface House {
  _id: string;
  houseId: string;
  name: string;
  description: string;
  images: Array<{
    public_id: string;
    url: string;
    secure_url: string;
    _id: string;
  }>;
  location: {
    province: string;
    district: string;
    sector: string;
    cell: string;
    village: string;
    coordinates: {
      lat: number | null;
      lng: number | null;
    };
  };
  university: string;
  pricePerMonth: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  amenities: string[];
  status: "available" | "booked" | "maintenance";
  rating: number;
  totalReviews: number;
  host: {
    name: string;
    email: string;
    phone: string;
    responseRate: number;
    responseTime: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface HouseApiResponse {
  success: boolean;
  data: House[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Helper function to format currency in RWF
const formatCurrency = (value: number): string => {
  if (value >= 1000000) {
    return `RWF ${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `RWF ${(value / 1000).toFixed(1)}K`;
  }
  return `RWF ${value}`;
};

// Helper function to format currency for tooltips (full number)
const formatCurrencyFull = (value: number): string => {
  return `RWF ${value.toLocaleString()}`;
};

// Base URL for API
const API_BASE_URL = "https://inyumbaproject.eu1.hubfly.app";

export const Dashboard: React.FC = () => {
  // Get language from cookies
  const [lang, setLang] = useState<"en" | "fr" | "rw">(
    getLanguageFromCookies(),
  );
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState("month");

  // State for API data
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [bookingStats, setBookingStats] = useState<BookingStats | null>(null);
  const [houseData, setHouseData] = useState<HouseApiResponse | null>(null);
  const [, setError] = useState<string | null>(null);

  const t = translations[lang];

  // Fetch user statistics from API using axios
  const fetchUserStats = async () => {
    try {
      const response = await axios.get<UserStats>(
        `${API_BASE_URL}/auth/stats`
      );
      setUserStats(response.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch user statistics";
      setError(errorMessage);
      console.error("Error fetching user stats:", err);
      throw err;
    }
  };

  // Fetch booking stats from API using axios
  const fetchBookingStats = async () => {
    try {
      const response = await axios.get<BookingStats>(
        `${API_BASE_URL}/bookings/stats`
      );
      setBookingStats(response.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch booking stats";
      setError(errorMessage);
      console.error("Error fetching booking stats:", err);
      throw err;
    }
  };

  // Fetch houses from API using axios
  const fetchHouses = async () => {
    try {
      const response = await axios.get<HouseApiResponse>(
        `${API_BASE_URL}/houses`
      );
      setHouseData(response.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch houses";
      setError(errorMessage);
      console.error("Error fetching houses:", err);
      throw err;
    }
  };

  // Fetch all data
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([fetchUserStats(), fetchBookingStats(), fetchHouses()]);
      toast.success("Data loaded successfully!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch data";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, []);

  // Listen for language changes in cookies
  useEffect(() => {
    const handleCookieChange = () => {
      const newLang = getLanguageFromCookies();
      if (newLang !== lang) {
        setLang(newLang);
      }
    };

    // Check for cookie changes every second (polling)
    const interval = setInterval(handleCookieChange, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  // Calculate total revenue from monthly bookings
  const calculateTotalRevenue = (): number => {
    if (!bookingStats || !bookingStats.data.monthlyBookings) {
      return 0;
    }
    // Sum up all revenue from monthly bookings
    return bookingStats.data.monthlyBookings.reduce(
      (sum, item) => sum + (item.revenue || 0),
      0
    );
  };

  // Generate stats from API data - using calculated revenue from monthly bookings
  const getStatsFromApi = () => {
    if (!userStats || !bookingStats || !houseData) {
      return [
        {
          title: t.totalUsers,
          value: "0",
          icon: <PeopleIcon className="w-6 h-6" />,
          change: 0,
          color: "bg-blue-500",
        },
        {
          title: t.totalHouses,
          value: "0",
          icon: <HomeIcon className="w-6 h-6" />,
          change: 0,
          color: "bg-green-500",
        },
        {
          title: t.totalBookings,
          value: "0",
          icon: <CheckCircleIcon className="w-6 h-6" />,
          change: 0,
          color: "bg-purple-500",
        },
        {
          title: t.totalRevenue,
          value: "RWF 0",
          icon: <PaymentsIcon className="w-6 h-6" />,
          change: 0,
          color: "bg-orange-500",
        },
      ];
    }

    const totalUsers = userStats.statistics.totalUsers;
    const totalHouses = houseData.pagination.total;
    const totalBookings = bookingStats.data.total;
    // Calculate total revenue from monthly bookings
    const totalRevenue = calculateTotalRevenue();

    // Calculate changes (using dummy values since we don't have historical data)
    const userChange = totalUsers > 0 ? 12.5 : 0;
    const houseChange = totalHouses > 0 ? 8.3 : 0;
    const bookingChange = totalBookings > 0 ? 23.7 : 0;
    const revenueChange = totalRevenue > 0 ? 15.2 : 0;

    return [
      {
        title: t.totalUsers,
        value: totalUsers.toLocaleString(),
        icon: <PeopleIcon className="w-6 h-6" />,
        change: userChange,
        color: "bg-blue-500",
      },
      {
        title: t.totalHouses,
        value: totalHouses.toLocaleString(),
        icon: <HomeIcon className="w-6 h-6" />,
        change: houseChange,
        color: "bg-green-500",
      },
      {
        title: t.totalBookings,
        value: totalBookings.toLocaleString(),
        icon: <CheckCircleIcon className="w-6 h-6" />,
        change: bookingChange,
        color: "bg-purple-500",
      },
      {
        title: t.totalRevenue,
        value: formatCurrency(totalRevenue),
        icon: <PaymentsIcon className="w-6 h-6" />,
        change: revenueChange,
        color: "bg-orange-500",
      },
    ];
  };

  // Generate quick stats from API data
  const getQuickStatsFromApi = () => {
    if (!userStats || !bookingStats || !houseData) {
      return [
        {
          title: t.activeUsers,
          value: "0",
          icon: <PeopleIcon className="w-5 h-5" />,
          color: "text-blue-500 bg-blue-50",
        },
        {
          title: t.pendingBookings,
          value: "0",
          icon: <PendingIcon className="w-5 h-5" />,
          color: "text-yellow-500 bg-yellow-50",
        },
        {
          title: t.verifiedHouses,
          value: "0",
          icon: <VerifiedIcon className="w-5 h-5" />,
          color: "text-green-500 bg-green-50",
        },
        {
          title: t.satisfactionRate,
          value: "0%",
          icon: <StarIcon className="w-5 h-5" />,
          color: "text-purple-500 bg-purple-50",
        },
      ];
    }

    const activeUsers = userStats.statistics.activeUsers;
    const pendingBookings = bookingStats.data.byStatus.pending;
    const verifiedHouses = houseData.data.filter((h) => h.isActive).length;

    // Calculate satisfaction rate based on active vs total users
    const satisfactionRate =
      userStats.statistics.totalUsers > 0
        ? Math.round(
            (userStats.statistics.activeUsers /
              userStats.statistics.totalUsers) *
              100,
          )
        : 0;

    return [
      {
        title: t.activeUsers,
        value: activeUsers.toLocaleString(),
        icon: <PeopleIcon className="w-5 h-5" />,
        color: "text-blue-500 bg-blue-50",
      },
      {
        title: t.pendingBookings,
        value: pendingBookings.toString(),
        icon: <PendingIcon className="w-5 h-5" />,
        color: "text-yellow-500 bg-yellow-50",
      },
      {
        title: t.verifiedHouses,
        value: verifiedHouses.toString(),
        icon: <VerifiedIcon className="w-5 h-5" />,
        color: "text-green-500 bg-green-50",
      },
      {
        title: t.satisfactionRate,
        value: `${satisfactionRate}%`,
        icon: <StarIcon className="w-5 h-5" />,
        color: "text-purple-500 bg-purple-50",
      },
    ];
  };

  // Get house distribution by location (province)
  const getHouseDistributionData = () => {
    if (!houseData || houseData.data.length === 0) {
      return [
        { name: "No Data", value: 1 },
      ];
    }

    const provinceMap = new Map<string, number>();
    houseData.data.forEach((house) => {
      const province = house.location.province || "Unknown";
      provinceMap.set(province, (provinceMap.get(province) || 0) + 1);
    });

    return Array.from(provinceMap.entries()).map(([name, value]) => ({
      name,
      value,
    }));
  };

  // Generate user growth data from API
  const getUserGrowthData = () => {
    if (!userStats) {
      return [
        { month: "Jul", users: 0 },
        { month: "Aug", users: 0 },
        { month: "Sep", users: 0 },
        { month: "Oct", users: 0 },
        { month: "Nov", users: 0 },
        { month: "Dec", users: 0 },
      ];
    }

    const totalUsers = userStats.statistics.totalUsers;
    const newUsers = userStats.statistics.newUsersLast30Days;

    const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const baseUsers = Math.max(0, totalUsers - newUsers);

    const growthPattern = [0.1, 0.15, 0.2, 0.25, 0.15, 0.15];

    return months.map((month, index) => {
      const cumulativeGrowth = growthPattern
        .slice(0, index + 1)
        .reduce((a, b) => a + b, 0);
      const users = Math.round(baseUsers + newUsers * cumulativeGrowth);
      return { month, users };
    });
  };

  // Generate recent activities from API data
  const getRecentActivitiesFromApi = () => {
    if (!userStats || userStats.recentUsers.length === 0) {
      return [
        {
          id: 1,
          user: "No users found",
          action: "No recent activity",
          time: "N/A",
          icon: <HomeIcon className="w-4 h-4" />,
          type: "user",
        },
      ];
    }

    const recentUsers = userStats.recentUsers.slice(0, 5);

    return recentUsers.map((user, index) => {
      const now = new Date();
      const createdAt = new Date(user.createdAt);
      const diffMs = now.getTime() - createdAt.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      let timeAgo = "Just now";
      if (diffDays > 0) {
        timeAgo = `${diffDays}d ago`;
      } else if (diffHours > 0) {
        timeAgo = `${diffHours}h ago`;
      } else if (diffMins > 0) {
        timeAgo = `${diffMins}m ago`;
      }

      const action = user.isActive
        ? `Active user account created`
        : `User account created (inactive)`;

      return {
        id: index + 1,
        user: user.name,
        action: action,
        time: timeAgo,
        icon:
          user.role === "admin" ? (
            <PeopleIcon className="w-4 h-4" />
          ) : (
            <PersonAddIcon className="w-4 h-4" />
          ),
        type: user.role === "admin" ? "user" : "user",
      };
    });
  };

  // Generate top performers from API data (houses with highest ratings)
  const getTopPerformersFromApi = () => {
    if (!houseData || houseData.data.length === 0) {
      return [
        {
          name: "No data",
          students: 0,
          houses: 0,
          revenue: "RWF 0",
          growth: 0,
        },
      ];
    }

    // Sort houses by rating and get top 4
    const topHouses = [...houseData.data]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);

    return topHouses.map((house) => ({
      name: house.name.length > 15 ? `${house.name.substring(0, 15)}...` : house.name,
      students: house.maxGuests || 0,
      houses: 1,
      revenue: formatCurrency(house.pricePerMonth || 0),
      growth: house.rating > 0 ? Math.min(Math.round(house.rating * 10), 25) : 0,
    }));
  };

  // Get monthly booking data from API
  const getMonthlyBookingData = () => {
    if (!bookingStats || bookingStats.data.monthlyBookings.length === 0) {
      return [
        { name: "Jan", revenue: 0, bookings: 0 },
        { name: "Feb", revenue: 0, bookings: 0 },
        { name: "Mar", revenue: 0, bookings: 0 },
        { name: "Apr", revenue: 0, bookings: 0 },
        { name: "May", revenue: 0, bookings: 0 },
        { name: "Jun", revenue: 0, bookings: 0 },
        { name: "Jul", revenue: 0, bookings: 0 },
        { name: "Aug", revenue: 0, bookings: 0 },
        { name: "Sep", revenue: 0, bookings: 0 },
        { name: "Oct", revenue: 0, bookings: 0 },
        { name: "Nov", revenue: 0, bookings: 0 },
        { name: "Dec", revenue: 0, bookings: 0 },
      ];
    }

    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const monthMap = new Map();
    bookingStats.data.monthlyBookings.forEach((item) => {
      const monthName = monthNames[item._id.month - 1];
      monthMap.set(monthName, {
        name: monthName,
        revenue: item.revenue || 0,
        bookings: item.count || 0,
      });
    });

    return monthNames.map((name) => {
      if (monthMap.has(name)) {
        return monthMap.get(name);
      }
      return { name, revenue: 0, bookings: 0 };
    });
  };

  // Stats data from API
  const stats = getStatsFromApi();
  const quickStats = getQuickStatsFromApi();
  const recentActivities = getRecentActivitiesFromApi();
  const topPerformers = getTopPerformersFromApi();
  const monthlyData = getMonthlyBookingData();
  const userGrowthData = getUserGrowthData();
  const houseDistributionData = getHouseDistributionData();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "user":
        return <PersonAddIcon className="w-4 h-4 text-blue-500" />;
      case "house":
        return <HomeIcon className="w-4 h-4 text-green-500" />;
      case "booking":
        return <CheckCircleIcon className="w-4 h-4 text-purple-500" />;
      case "payment":
        return <PaymentsIcon className="w-4 h-4 text-orange-500" />;
      default:
        return <div className="w-4 h-4" />;
    }
  };

  const getTypeBgColor = (type: string) => {
    switch (type) {
      case "user":
        return "bg-blue-50";
      case "house":
        return "bg-green-50";
      case "booking":
        return "bg-purple-50";
      case "payment":
        return "bg-orange-50";
      default:
        return "bg-gray-50";
    }
  };

  const handleRefresh = () => {
    fetchData();
  };

  const handleExport = () => {
    toast.success("Exporting data...");
  };

  const handlePrint = () => {
    window.print();
  };

  // Custom tooltip formatter for the charts
  const tooltipFormatter = (value: any) => {
    if (typeof value === "number") {
      return formatCurrencyFull(value);
    }
    return value;
  };

  // Calculate total revenue for display
  const totalRevenue = calculateTotalRevenue();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FF385C]/10 rounded-full flex items-center justify-center text-[#FF385C]">
                  <DashboardIcon className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {t.adminDashboard}
                  </h1>
                  <p className="text-sm text-gray-500">{t.overview}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#FF385C] focus:ring-1 focus:ring-[#FF385C]"
              >
                <option value="today">{t.today}</option>
                <option value="week">{t.thisWeek}</option>
                <option value="month">{t.thisMonth}</option>
                <option value="year">{t.thisYear}</option>
              </select>

              <button
                onClick={handleRefresh}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RefreshIcon className="w-5 h-5" />
              </button>

              <button
                onClick={handleExport}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <DownloadIcon className="w-5 h-5" />
              </button>

              <button
                onClick={handlePrint}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <PrintIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {quickStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{stat.title}</p>
                </div>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.color}`}
                >
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Row 1: Revenue Trend & Booking Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue Trend - Area Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {t.revenueTrend}
              </h3>
              <span className="text-sm text-green-500 font-medium">
                {totalRevenue > 0
                  ? formatCurrency(totalRevenue)
                  : "RWF 0"}
              </span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient
                      id="revenueGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#FF385C" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#FF385C" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                    opacity={0.1}
                  />
                  <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                  <YAxis
                    stroke="#6B7280"
                    fontSize={12}
                    tickFormatter={(value) => formatCurrency(value)}
                  />
                  <Tooltip
                    formatter={tooltipFormatter}
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#FF385C"
                    strokeWidth={3}
                    fill="url(#revenueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Booking Trend - Line Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {t.bookingTrend}
              </h3>
              <span className="text-sm text-purple-500 font-medium">
                {bookingStats
                  ? `${bookingStats.data.total} total bookings`
                  : "0 bookings"}
              </span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                    opacity={0.1}
                  />
                  <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="bookings"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    dot={{ fill: "#8B5CF6", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Row 2: House Distribution & User Growth */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* House Distribution - Pie Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              House Distribution by Province
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={houseDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => {
                      const percentValue = percent || 0;
                      return `${name} ${(percentValue * 100).toFixed(0)}%`;
                    }}
                    labelLine={false}
                  >
                    {houseDistributionData.map((_entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* User Growth - Bar Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {t.userGrowth}
              </h3>
              <span className="text-sm text-blue-500 font-medium">
                {userStats && userStats.statistics.newUsersLast30Days > 0
                  ? `+${userStats.statistics.newUsersLast30Days} new users`
                  : "+0"}
              </span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userGrowthData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                    opacity={0.1}
                  />
                  <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="users" fill="#4F46E5" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Two Column Layout: Recent Activity & Top Performers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t.recentActivity}
                </h3>
                <button className="text-sm text-[#FF385C] hover:underline">
                  {t.viewAll}
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                {recentActivities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${getTypeBgColor(activity.type)}`}
                    >
                      {getTypeIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.user}
                      </p>
                      <p className="text-sm text-gray-500">{activity.action}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {activity.time}
                      </span>
                      <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertIcon className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Performers */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Top Rated Houses
                </h3>
                <button className="text-sm text-[#FF385C] hover:underline">
                  {t.viewAll}
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                {topPerformers.map((performer, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="px-6 py-4"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <HomeIcon className="w-4 h-4 text-[#FF385C]" />
                        <span className="font-medium text-gray-900 text-sm">
                          {performer.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-medium text-green-500">
                        <ArrowUpwardIcon className="w-3 h-3" />
                        {performer.growth}%
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>
                        {performer.students} guests
                      </span>
                      <span>
                        {performer.houses} {t.houses}
                      </span>
                      <span className="font-medium text-gray-900">
                        {performer.revenue}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 text-center"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2 text-blue-500">
              <PersonAddIcon className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-gray-700">{t.manageUsers}</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 text-center"
          >
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-2 text-green-500">
              <HomeIcon className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-gray-700">
              {t.manageHouses}
            </p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 text-center"
          >
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-2 text-purple-500">
              <CheckCircleIcon className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-gray-700">
              {t.manageBookings}
            </p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 text-center"
          >
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-2 text-orange-500">
              <SchoolIcon className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-gray-700">
              {t.manageUniversities}
            </p>
          </motion.button>
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[999] flex items-center justify-center">
            <div className="bg-white rounded-2xl p-8 shadow-2xl text-center">
              <div className="w-12 h-12 border-4 border-[#FF385C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">{t.loading}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};