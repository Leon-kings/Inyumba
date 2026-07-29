/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

// Material-UI Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookingIcon from "@mui/icons-material/BookOnline";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VerifiedIcon from "@mui/icons-material/Verified";
import AddHomeIcon from "@mui/icons-material/AddHome";
import HouseIcon from "@mui/icons-material/House";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BedIcon from "@mui/icons-material/Bed";
import BathroomIcon from "@mui/icons-material/Bathroom";

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
    hostDashboard: "Host Dashboard",
    welcome: "Welcome back",
    overview: "Overview",
    myProfile: "My Profile",
    myProperties: "My Properties",
    myBookings: "My Bookings",
    earnings: "Earnings",
    reviews: "Reviews",
    settings: "Settings",
    logout: "Logout",
    totalProperties: "Total Properties",
    activeProperties: "Active Properties",
    totalBookings: "Total Bookings",
    totalEarnings: "Total Earnings",
    averageRating: "Average Rating",
    pendingBookings: "Pending Bookings",
    completedBookings: "Completed Bookings",
    cancelledBookings: "Cancelled Bookings",
    memberSince: "Member Since",
    email: "Email",
    phone: "Phone",
    location: "Location",
    recentBookings: "Recent Bookings",
    bookingTrend: "Booking Trend",
    earningsTrend: "Earnings Trend",
    propertyDistribution: "Property Distribution",
    monthlyEarnings: "Monthly Earnings",
    noBookings: "No bookings found",
    noProperties: "No properties listed",
    viewAll: "View All",
    viewDetails: "View Details",
    status: "Status",
    amount: "Amount",
    date: "Date",
    pending: "Pending",
    confirmed: "Confirmed",
    completed: "Completed",
    cancelled: "Cancelled",
    rejected: "Rejected",
    paid: "Paid",
    failed: "Failed",
    refunded: "Refunded",
    checkIn: "Check-in",
    checkOut: "Check-out",
    nights: "Nights",
    totalPrice: "Total Price",
    editProfile: "Edit Profile",
    saveChanges: "Save Changes",
    cancel: "Cancel",
    saving: "Saving...",
    profileUpdated: "Profile updated successfully!",
    updateFailed: "Failed to update profile",
    loading: "Loading...",
    refresh: "Refresh",
    thisYear: "This Year",
    thisMonth: "This Month",
    thisWeek: "This Week",
    today: "Today",
    noData: "No data available",
    addProperty: "Add Property",
    manageProperties: "Manage Properties",
    propertyName: "Property Name",
    propertyType: "Property Type",
    pricePerNight: "Price per Night",
    rooms: "Rooms",
    bathrooms: "Bathrooms",
    amenities: "Amenities",
    address: "Address",
    university: "Near University",
    house: "House",
    apartment: "Apartment",
    room: "Room",
    shared: "Shared",
    viewProperty: "View Property",
    editProperty: "Edit Property",
    deleteProperty: "Delete Property",
  },
  fr: {
    dashboard: "Tableau de Bord",
    hostDashboard: "Tableau de Bord Hôte",
    welcome: "Bon retour",
    overview: "Aperçu",
    myProfile: "Mon Profil",
    myProperties: "Mes Propriétés",
    myBookings: "Mes Réservations",
    earnings: "Gains",
    reviews: "Avis",
    settings: "Paramètres",
    logout: "Déconnexion",
    totalProperties: "Total Propriétés",
    activeProperties: "Propriétés Actives",
    totalBookings: "Total Réservations",
    totalEarnings: "Gains Totaux",
    averageRating: "Évaluation Moyenne",
    pendingBookings: "Réservations en Attente",
    completedBookings: "Réservations Terminées",
    cancelledBookings: "Réservations Annulées",
    memberSince: "Membre Depuis",
    email: "Email",
    phone: "Téléphone",
    location: "Emplacement",
    recentBookings: "Réservations Récentes",
    bookingTrend: "Tendance des Réservations",
    earningsTrend: "Tendance des Gains",
    propertyDistribution: "Distribution des Propriétés",
    monthlyEarnings: "Gains Mensuels",
    noBookings: "Aucune réservation trouvée",
    noProperties: "Aucune propriété listée",
    viewAll: "Voir Tout",
    viewDetails: "Voir les Détails",
    status: "Statut",
    amount: "Montant",
    date: "Date",
    pending: "En Attente",
    confirmed: "Confirmé",
    completed: "Terminé",
    cancelled: "Annulé",
    rejected: "Rejeté",
    paid: "Payé",
    failed: "Échoué",
    refunded: "Remboursé",
    checkIn: "Arrivée",
    checkOut: "Départ",
    nights: "Nuits",
    totalPrice: "Prix Total",
    editProfile: "Modifier le Profil",
    saveChanges: "Enregistrer les Modifications",
    cancel: "Annuler",
    saving: "Enregistrement...",
    profileUpdated: "Profil mis à jour avec succès !",
    updateFailed: "Échec de la mise à jour du profil",
    loading: "Chargement...",
    refresh: "Rafraîchir",
    thisYear: "Cette Année",
    thisMonth: "Ce Mois",
    thisWeek: "Cette Semaine",
    today: "Aujourd'hui",
    noData: "Aucune donnée disponible",
    addProperty: "Ajouter une Propriété",
    manageProperties: "Gérer les Propriétés",
    propertyName: "Nom de la Propriété",
    propertyType: "Type de Propriété",
    pricePerNight: "Prix par Nuit",
    rooms: "Chambres",
    bathrooms: "Salles de Bain",
    amenities: "Équipements",
    address: "Adresse",
    university: "Près de l'Université",
    house: "Maison",
    apartment: "Appartement",
    room: "Chambre",
    shared: "Partagé",
    viewProperty: "Voir la Propriété",
    editProperty: "Modifier la Propriété",
    deleteProperty: "Supprimer la Propriété",
  },
  rw: {
    dashboard: "Ibikorwa",
    hostDashboard: "Ibikorwa by'Umwakirizi",
    welcome: "Turakwinginze",
    overview: "Aperçu",
    myProfile: "Ibyawe",
    myProperties: "Amazu Yanjye",
    myBookings: "Ibyanditswe",
    earnings: "Amahera Yakunze",
    reviews: "Ibitekerezo",
    settings: "Igenamiterere",
    logout: "Gusohoka",
    totalProperties: "Amazu Yose",
    activeProperties: "Amazu Akoreshwa",
    totalBookings: "Ibyanditswe Byose",
    totalEarnings: "Amahera Yose",
    averageRating: "Igipimo Rusange",
    pendingBookings: "Ibyanditswe Bitegereje",
    completedBookings: "Ibyanditswe Byarangiye",
    cancelledBookings: "Ibyanditswe Byahagaritswe",
    memberSince: "Yinjiye Kuva",
    email: "Imeri",
    phone: "Telefone",
    location: "Aho Gihe",
    recentBookings: "Ibyanditswe Vuba",
    bookingTrend: "Imihindagurikire y'Ibyanditswe",
    earningsTrend: "Imihindagurikire y'Amahera",
    propertyDistribution: "Ibyiciro by'Amazu",
    monthlyEarnings: "Amahera ku Kwezi",
    noBookings: "Nta byanditswe byabonetse",
    noProperties: "Nta mazu yanditswe",
    viewAll: "Reba Byose",
    viewDetails: "Reba Ibisobanuro",
    status: "Ihagaze",
    amount: "Amahera",
    date: "Itariki",
    pending: "Bitegereje",
    confirmed: "Byemejwe",
    completed: "Byarangiye",
    cancelled: "Byahagaritswe",
    rejected: "Byangijwe",
    paid: "Byishyuwe",
    failed: "Birananiranye",
    refunded: "Byasubijwe",
    checkIn: "Kwinjira",
    checkOut: "Kuva",
    nights: "Ijoro",
    totalPrice: "Igiciro Cyose",
    editProfile: "Hindura Ibyawe",
    saveChanges: "Bika Ibyahinduwe",
    cancel: "Reka",
    saving: "Biremereza...",
    profileUpdated: "Ibyawe byavuguruwe neza!",
    updateFailed: "Kuvugurura ibyawe birananiranye",
    loading: "Biremereza...",
    refresh: "Vugurura",
    thisYear: "Uyu Mwaka",
    thisMonth: "Uku Kwezi",
    thisWeek: "Iyi Cyumweru",
    today: "Uyu Munsi",
    noData: "Nta makuru yabonetse",
    addProperty: "Ongeraho Inzu",
    manageProperties: "Gucunga Amazu",
    propertyName: "Izina ry'Inzu",
    propertyType: "Ubwoko bw'Inzu",
    pricePerNight: "Igiciro ku Ijoro",
    rooms: "Ibyumba",
    bathrooms: "Ahabagirirwa",
    amenities: "Ibikoresho",
    address: "Aho Gihe",
    university: "Hafi ya Kaminuza",
    house: "Inzu",
    apartment: "Aparitama",
    room: "Icyumba",
    shared: "Bisangiwe",
    viewProperty: "Reba Inzu",
    editProperty: "Hindura Inzu",
    deleteProperty: "Kuraho Inzu",
  }
};

// Helper function to get language from cookies
const getLanguageFromCookies = (): 'en' | 'fr' | 'rw' => {
  const lang = Cookies.get('language') as 'en' | 'fr' | 'rw';
  return lang || 'en';
};

// Helper function to get user from localStorage
const getUserFromStorage = () => {
  const user = localStorage.getItem('user');
  if (user) {
    try {
      return JSON.parse(user);
    } catch (e) {
      return null;
    }
  }
  return null;
};

// Chart Colors
const COLORS = ["#FF385C", "#4F46E5", "#22C55E", "#F59E0B", "#8B5CF6"];

export const HostDashboard: React.FC = () => {
  // Get language from cookies
  const [lang, setLang] = useState<'en' | 'fr' | 'rw'>(getLanguageFromCookies());
  const [user, setUser] = useState<any>(getUserFromStorage());
  const [loading, setLoading] = useState(false);

  // Profile edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "+250 788 123 456",
    location: user?.location || "Musanze, Rwanda",
  });
  const [isSaving, setIsSaving] = useState(false);

  // Host statistics
  const [stats, setStats] = useState({
    totalProperties: 5,
    activeProperties: 4,
    totalBookings: 28,
    totalEarnings: 2450000,
    averageRating: 4.8,
    pendingBookings: 3,
    completedBookings: 22,
    cancelledBookings: 3,
  });

  // Booking data for charts
  const [bookingData, setBookingData] = useState([
    { month: "Jan", bookings: 2, earnings: 250000 },
    { month: "Feb", bookings: 3, earnings: 330000 },
    { month: "Mar", bookings: 4, earnings: 440000 },
    { month: "Apr", bookings: 3, earnings: 310000 },
    { month: "May", bookings: 5, earnings: 520000 },
    { month: "Jun", bookings: 4, earnings: 420000 },
  ]);

  const propertyDistributionData = [
    { name: "Houses", value: 3 },
    { name: "Apartments", value: 1 },
    { name: "Rooms", value: 1 },
  ];

  // Properties list
  const properties = [
    {
      id: 1,
      name: "INES Ruhengeri Student Lodge",
      type: "House",
      location: "Cyabararika, Muhoza, Musanze",
      price: 110500,
      rooms: 4,
      bathrooms: 2,
      status: "active",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      name: "Kigombe Student Apartments",
      type: "Apartment",
      location: "Kigombe, Muhoza, Musanze",
      price: 91000,
      rooms: 3,
      bathrooms: 1,
      status: "active",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      name: "Ruhengeri City Hostel",
      type: "Room",
      location: "Ruhengeri, Muhoza, Musanze",
      price: 65000,
      rooms: 1,
      bathrooms: 1,
      status: "active",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=100&h=100&fit=crop",
    },
    {
      id: 4,
      name: "Busogo Student Village",
      type: "House",
      location: "Busogo, Musanze",
      price: 104000,
      rooms: 3,
      bathrooms: 2,
      status: "inactive",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=100&h=100&fit=crop",
    },
    {
      id: 5,
      name: "Muhoza Guest House",
      type: "House",
      location: "Muhoza, Musanze",
      price: 85000,
      rooms: 2,
      bathrooms: 1,
      status: "active",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&h=100&fit=crop",
    },
  ];

  const recentBookings = [
    {
      id: 1,
      propertyName: "INES Ruhengeri Student Lodge",
      studentName: "Jean Paul Mugisha",
      checkIn: "2024-02-01",
      checkOut: "2024-03-01",
      nights: 30,
      amount: 110500,
      status: "confirmed",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      propertyName: "Kigombe Student Apartments",
      studentName: "Marie Claire Uwimana",
      checkIn: "2024-01-15",
      checkOut: "2024-02-15",
      nights: 30,
      amount: 91000,
      status: "completed",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      propertyName: "Busogo Student Village",
      studentName: "David Niyonzima",
      checkIn: "2024-03-01",
      checkOut: "2024-04-01",
      nights: 30,
      amount: 104000,
      status: "pending",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=100&h=100&fit=crop",
    },
  ];

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

  // Handle profile edit
  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "+250 788 123 456",
      location: user?.location || "Musanze, Rwanda",
    });
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const updatedUser = { ...user, ...editForm };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success(`✅ ${t.profileUpdated}`);
      setIsEditing(false);
    } catch (error) {
      toast.error(`❌ ${t.updateFailed}`);
      console.error("Profile update error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    toast.info("Refreshing dashboard...");
    setTimeout(() => {
      setLoading(false);
      toast.success("Dashboard refreshed!");
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "confirmed": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      case "rejected": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return t.pending;
      case "confirmed": return t.confirmed;
      case "completed": return t.completed;
      case "cancelled": return t.cancelled;
      case "rejected": return t.rejected;
      default: return status;
    }
  };

  const formatCurrency = (amount: number) => {
    return `RWF ${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Stat cards
  const statCards = [
    {
      title: t.totalProperties,
      value: stats.totalProperties,
      icon: <HouseIcon />,
      color: "bg-blue-500",
      change: "+20%",
    },
    {
      title: t.totalBookings,
      value: stats.totalBookings,
      icon: <BookingIcon />,
      color: "bg-green-500",
      change: "+18%",
    },
    {
      title: t.totalEarnings,
      value: formatCurrency(stats.totalEarnings),
      icon: <AttachMoneyIcon />,
      color: "bg-purple-500",
      change: "+25%",
    },
    {
      title: t.averageRating,
      value: `${stats.averageRating}/5`,
      icon: <StarIcon />,
      color: "bg-yellow-500",
      change: "+5%",
    },
  ];

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
                    {t.hostDashboard}
                  </h1>
                  <p className="text-sm text-gray-500">
                    {t.welcome}, {user?.name || "Host"}!
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                disabled={loading}
              >
                <RefreshIcon className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Profile Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-[#FF385C] text-white flex items-center justify-center text-3xl font-bold">
                {user?.name?.charAt(0).toUpperCase() || "H"}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="border border-gray-300 rounded-lg px-2 py-1 text-xl font-bold"
                    />
                  ) : (
                    user?.name || "Host User"
                  )}
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <EmailIcon className="w-4 h-4" />
                  <span>{user?.email || "host@example.com"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <PhoneIcon className="w-4 h-4" />
                  <span>{user?.phone || "+250 788 123 456"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <LocationOnIcon className="w-4 h-4" />
                  <span>{user?.location || "Musanze, Rwanda"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <VerifiedIcon className="w-4 h-4 text-green-500" />
                  <span className="text-green-600 font-medium">Verified Host</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="px-4 py-2 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {t.saving}
                      </>
                    ) : (
                      <>
                        <CheckCircleIcon className="w-4 h-4" />
                        {t.saveChanges}
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    {t.cancel}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleEditProfile}
                    className="px-4 py-2 border border-[#FF385C] text-[#FF385C] rounded-lg font-medium hover:bg-[#FF385C] hover:text-white transition-colors flex items-center gap-2"
                  >
                    <EditIcon className="w-4 h-4" />
                    {t.editProfile}
                  </button>
                </>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                />
              </div>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white`}
                >
                  {stat.icon}
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-green-500">
                  <TrendingUpIcon className="w-3 h-3" />
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Row 1: Booking Trend & Earnings Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Booking Trend */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {t.bookingTrend}
              </h3>
              <span className="text-sm text-green-500 font-medium">+18%</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={bookingData}>
                  <defs>
                    <linearGradient id="bookingGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF385C" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#FF385C" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
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
                  <Area
                    type="monotone"
                    dataKey="bookings"
                    stroke="#FF385C"
                    strokeWidth={3}
                    fill="url(#bookingGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Earnings Trend */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {t.earningsTrend}
              </h3>
              <span className="text-sm text-green-500 font-medium">+25%</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bookingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                  <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} tickFormatter={(value) => `RWF ${value/1000}K`} />
                  <Tooltip
                    formatter={(value: any) => `RWF ${value.toLocaleString()}`}
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="earnings" fill="#4F46E5" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Row 2: Property Distribution & Monthly Earnings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Property Distribution - Pie Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t.propertyDistribution}
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={propertyDistributionData}
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
                    {propertyDistributionData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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

          {/* Monthly Earnings - Line Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {t.monthlyEarnings}
              </h3>
              <span className="text-sm text-purple-500 font-medium">+22%</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bookingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                  <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} tickFormatter={(value) => `RWF ${value/1000}K`} />
                  <Tooltip
                    formatter={(value: any) => `RWF ${value.toLocaleString()}`}
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="earnings"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    dot={{ fill: "#8B5CF6", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Properties Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {t.myProperties}
            </h3>
            <div className="flex items-center gap-2">
              <button className="text-sm text-[#FF385C] hover:underline flex items-center gap-1">
                {t.viewAll}
                <ArrowForwardIcon className="w-4 h-4" />
              </button>
              <button className="px-3 py-1.5 bg-[#FF385C] text-white rounded-lg text-sm font-medium hover:bg-[#E31C5F] transition-colors flex items-center gap-1">
                <AddHomeIcon className="w-4 h-4" />
                {t.addProperty}
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {properties.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                <HouseIcon className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                <p>{t.noProperties}</p>
              </div>
            ) : (
              properties.map((property) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900">
                      {property.name}
                    </h4>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <LocationOnIcon className="w-3 h-3" />
                      {property.location}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">
                        <BedIcon className="w-3 h-3 inline mr-0.5" />
                        {property.rooms} rooms
                      </span>
                      <span className="text-xs text-gray-500">
                        <BathroomIcon className="w-3 h-3 inline mr-0.5" />
                        {property.bathrooms} baths
                      </span>
                      <span className="text-xs text-gray-500">
                        <AttachMoneyIcon className="w-3 h-3 inline mr-0.5" />
                        {formatCurrency(property.price)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                      <StarIcon className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                      {property.rating}
                    </div>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${property.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {property.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {t.recentBookings}
            </h3>
            <button className="text-sm text-[#FF385C] hover:underline flex items-center gap-1">
              {t.viewAll}
              <ArrowForwardIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            {recentBookings.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                <BookingIcon className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                <p>{t.noBookings}</p>
              </div>
            ) : (
              recentBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={booking.image}
                    alt={booking.propertyName}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900">
                      {booking.propertyName}
                    </h4>
                    <p className="text-xs text-gray-500">
                      Student: {booking.studentName}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">
                        <CalendarTodayIcon className="w-3 h-3 inline mr-0.5" />
                        {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                      </span>
                      <span className="text-xs text-gray-500">
                        • {booking.nights} {t.nights}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-[#FF385C]">
                      {formatCurrency(booking.amount)}
                    </p>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                      {getStatusLabel(booking.status)}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
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

