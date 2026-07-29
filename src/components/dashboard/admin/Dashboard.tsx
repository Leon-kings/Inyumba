/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

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

export const Dashboard: React.FC = () => {
  // Get language from cookies
  const [lang, setLang] = useState<"en" | "fr" | "rw">(
    getLanguageFromCookies(),
  );
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState("month");

  const t = translations[lang];

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

  // Monthly Revenue Data
  const monthlyRevenueData = [
    { name: "Jan", revenue: 185000, bookings: 45 },
    { name: "Feb", revenue: 210000, bookings: 52 },
    { name: "Mar", revenue: 195000, bookings: 48 },
    { name: "Apr", revenue: 230000, bookings: 58 },
    { name: "May", revenue: 250000, bookings: 62 },
    { name: "Jun", revenue: 220000, bookings: 55 },
    { name: "Jul", revenue: 280000, bookings: 70 },
    { name: "Aug", revenue: 260000, bookings: 65 },
    { name: "Sep", revenue: 310000, bookings: 78 },
    { name: "Oct", revenue: 290000, bookings: 72 },
    { name: "Nov", revenue: 340000, bookings: 85 },
    { name: "Dec", revenue: 320000, bookings: 80 },
  ];

  // House Distribution by Category
  const houseDistributionData = [
    { name: "Student Houses", value: 85 },
    { name: "Apartments", value: 42 },
    { name: "Single Rooms", value: 18 },
    { name: "Shared Houses", value: 11 },
  ];

  // User Growth Data
  const userGrowthData = [
    { month: "Jul", users: 2450 },
    { month: "Aug", users: 2680 },
    { month: "Sep", users: 2950 },
    { month: "Oct", users: 3210 },
    { month: "Nov", users: 3520 },
    { month: "Dec", users: 3847 },
  ];

  // Stats data
  const stats = [
    {
      title: t.totalUsers,
      value: "3,847",
      icon: <PeopleIcon className="w-6 h-6" />,
      change: 12.5,
      color: "bg-blue-500",
    },
    {
      title: t.totalHouses,
      value: "156",
      icon: <HomeIcon className="w-6 h-6" />,
      change: 8.3,
      color: "bg-green-500",
    },
    {
      title: t.totalBookings,
      value: "2,134",
      icon: <CheckCircleIcon className="w-6 h-6" />,
      change: 23.7,
      color: "bg-purple-500",
    },
    {
      title: t.totalRevenue,
      value: "RWF 2.45M",
      icon: <PaymentsIcon className="w-6 h-6" />,
      change: 15.2,
      color: "bg-orange-500",
    },
  ];

  const quickStats = [
    {
      title: t.activeUsers,
      value: "2,891",
      icon: <PeopleIcon className="w-5 h-5" />,
      color: "text-blue-500 bg-blue-50",
    },
    {
      title: t.pendingBookings,
      value: "47",
      icon: <PendingIcon className="w-5 h-5" />,
      color: "text-yellow-500 bg-yellow-50",
    },
    {
      title: t.verifiedHouses,
      value: "132",
      icon: <VerifiedIcon className="w-5 h-5" />,
      color: "text-green-500 bg-green-50",
    },
    {
      title: t.satisfactionRate,
      value: "98%",
      icon: <StarIcon className="w-5 h-5" />,
      color: "text-purple-500 bg-purple-50",
    },
  ];

  // Recent activity data
  const recentActivities = [
    {
      id: 1,
      user: "Jean Paul Mugisha",
      action: "Booked a house in Cyabararika",
      time: "2 min ago",
      icon: <HomeIcon className="w-4 h-4" />,
      type: "booking",
    },
    {
      id: 2,
      user: "Marie Claire Uwimana",
      action: "Created a new account",
      time: "15 min ago",
      icon: <PersonAddIcon className="w-4 h-4" />,
      type: "user",
    },
    {
      id: 3,
      user: "David Niyonzima",
      action: "Listed a new house in Kigombe",
      time: "1 hour ago",
      icon: <HomeIcon className="w-4 h-4" />,
      type: "house",
    },
    {
      id: 4,
      user: "Grace Uwase",
      action: "Made a payment of RWF 85,000",
      time: "2 hours ago",
      icon: <PaymentsIcon className="w-4 h-4" />,
      type: "payment",
    },
    {
      id: 5,
      user: "Eric Kamanzi",
      action: "Verified a house in Ruhengeri",
      time: "3 hours ago",
      icon: <VerifiedIcon className="w-4 h-4" />,
      type: "house",
    },
  ];

  // Top universities data
  const topUniversities = [
    {
      name: "INES-Ruhengeri",
      students: 847,
      houses: 45,
      revenue: "RWF 720K",
      growth: 15,
    },
    {
      name: "UR-Huye Campus",
      students: 623,
      houses: 32,
      revenue: "RWF 540K",
      growth: 12,
    },
    {
      name: "University of Kigali",
      students: 456,
      houses: 28,
      revenue: "RWF 380K",
      growth: 8,
    },
    {
      name: "UR-CAVM",
      students: 389,
      houses: 22,
      revenue: "RWF 310K",
      growth: 10,
    },
  ];

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
    setLoading(true);
    toast.info("Refreshing dashboard data...");
    setTimeout(() => {
      setLoading(false);
      toast.success("Dashboard refreshed!");
    }, 1500);
  };

  const handleExport = () => {
    toast.success("Exporting data...");
  };

  const handlePrint = () => {
    window.print();
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return `RWF ${(value / 1000).toFixed(1)}K`;
  };

  // Custom tooltip formatter for the charts
  const tooltipFormatter = (value: any) => {
    if (typeof value === "number") {
      return `RWF ${value.toLocaleString()}`;
    }
    return value;
  };

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
          {/* Revenue Trend - Line Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {t.revenueTrend}
              </h3>
              <span className="text-sm text-green-500 font-medium">+23.5%</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRevenueData}>
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
                    tickFormatter={formatCurrency}
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
                +18.7%
              </span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRevenueData}>
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
              {t.houseDistribution}
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
              <span className="text-sm text-blue-500 font-medium">+57%</span>
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

        {/* Two Column Layout: Recent Activity & Top Universities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Recent Activity - Takes 2/3 of space */}
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

          {/* Top Universities */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t.topPerformers}
                </h3>
                <button className="text-sm text-[#FF385C] hover:underline">
                  {t.viewAll}
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                {topUniversities.map((uni, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="px-6 py-4"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <SchoolIcon className="w-4 h-4 text-[#FF385C]" />
                        <span className="font-medium text-gray-900 text-sm">
                          {uni.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-medium text-green-500">
                        <ArrowUpwardIcon className="w-3 h-3" />
                        {uni.growth}%
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>
                        {uni.students} {t.users}
                      </span>
                      <span>
                        {uni.houses} {t.houses}
                      </span>
                      <span className="font-medium text-gray-900">
                        {uni.revenue}
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
