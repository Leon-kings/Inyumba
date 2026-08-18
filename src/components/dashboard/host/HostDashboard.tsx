// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import Cookies from "js-cookie";
// import axios from "axios";

// // Material-UI Icons
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import BookingIcon from "@mui/icons-material/BookOnline";
// import StarIcon from "@mui/icons-material/Star";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import EmailIcon from "@mui/icons-material/Email";
// import PhoneIcon from "@mui/icons-material/Phone";
// import EditIcon from "@mui/icons-material/Edit";
// import RefreshIcon from "@mui/icons-material/Refresh";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import VerifiedIcon from "@mui/icons-material/Verified";
// import HouseIcon from "@mui/icons-material/House";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import BedIcon from "@mui/icons-material/Bed";
// import BathroomIcon from "@mui/icons-material/Bathroom";

// // Recharts for graphs
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   AreaChart,
//   Area,
// } from "recharts";

// // Types
// interface House {
//   _id: string;
//   houseId: string;
//   name: string;
//   description: string;
//   images: { url: string }[];
//   location: {
//     province: string;
//     district: string;
//     sector: string;
//     cell: string;
//     village: string;
//   };
//   university: string;
//   pricePerMonth: number;
//   bedrooms: number;
//   bathrooms: number;
//   maxGuests: number;
//   amenities: string[];
//   status: "available" | "pending" | "unavailable" | "maintenance";
//   rating: number;
//   totalReviews: number;
//   host: {
//     name: string;
//     email: string;
//     phone: string;
//     responseRate: number;
//     responseTime: string;
//   };
//   availability: {
//     startDate: string;
//     endDate: string;
//   };
//   isActive: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// interface Booking {
//   _id: string;
//   bookingId: string;
//   fullName: string;
//   email: string;
//   phone: string;
//   idNumber: string;
//   university: string;
//   studentId: string;
//   purpose: string;
//   houseId: string;
//   houseName: string;
//   houseType: string;
//   district: string;
//   sector: string;
//   cell: string;
//   village: string;
//   ownerName: string;
//   ownerContact: string;
//   ownerEmail: string;
//   checkIn: string;
//   checkOut: string;
//   months: number;
//   guests: number;
//   specialRequests: string;
//   monthlyRent: number;
//   serviceFee: number;
//   totalAmount: number;
//   paymentMethod: "momo" | "bank" | "cash";
//   momoNumber: string;
//   paymentStatus: "pending" | "verified" | "failed";
//   status: "pending" | "confirmed" | "cancelled" | "completed";
//   notes: string;
//   createdAt: string;
//   updatedAt: string;
// }

// // Translations
// const translations = {
//   en: {
//     dashboard: "Dashboard",
//     hostDashboard: "Host Dashboard",
//     welcome: "Welcome back",
//     overview: "Overview",
//     myProfile: "My Profile",
//     myProperties: "My Properties",
//     myBookings: "My Bookings",
//     earnings: "Earnings",
//     reviews: "Reviews",
//     settings: "Settings",
//     logout: "Logout",
//     totalProperties: "Total Properties",
//     activeProperties: "Active Properties",
//     totalBookings: "Total Bookings",
//     totalEarnings: "Total Earnings",
//     averageRating: "Average Rating",
//     pendingBookings: "Pending Bookings",
//     completedBookings: "Completed Bookings",
//     cancelledBookings: "Cancelled Bookings",
//     memberSince: "Member Since",
//     email: "Email",
//     phone: "Phone",
//     location: "Location",
//     recentBookings: "Recent Bookings",
//     bookingTrend: "Booking Trend",
//     earningsTrend: "Earnings Trend",
//     propertyDistribution: "Property Distribution",
//     monthlyEarnings: "Monthly Earnings",
//     noBookings: "No bookings found",
//     noProperties: "No properties listed",
//     viewAll: "View All",
//     viewDetails: "View Details",
//     status: "Status",
//     amount: "Amount",
//     date: "Date",
//     pending: "Pending",
//     confirmed: "Confirmed",
//     completed: "Completed",
//     cancelled: "Cancelled",
//     rejected: "Rejected",
//     paid: "Paid",
//     failed: "Failed",
//     refunded: "Refunded",
//     checkIn: "Check-in",
//     checkOut: "Check-out",
//     nights: "Months",
//     totalPrice: "Total Price",
//     editProfile: "Edit Profile",
//     saveChanges: "Save Changes",
//     cancel: "Cancel",
//     saving: "Saving...",
//     profileUpdated: "Profile updated successfully!",
//     updateFailed: "Failed to update profile",
//     loading: "Loading...",
//     refresh: "Refresh",
//     thisYear: "This Year",
//     thisMonth: "This Month",
//     thisWeek: "This Week",
//     today: "Today",
//     noData: "No data available",
//     addProperty: "Add Property",
//     manageProperties: "Manage Properties",
//     propertyName: "Property Name",
//     propertyType: "Property Type",
//     pricePerNight: "Price per Month",
//     rooms: "Bedrooms",
//     bathrooms: "Bathrooms",
//     amenities: "Amenities",
//     address: "Address",
//     university: "Near University",
//     house: "House",
//     apartment: "Apartment",
//     room: "Room",
//     shared: "Shared",
//     viewProperty: "View Property",
//     editProperty: "Edit Property",
//     deleteProperty: "Delete Property",
//   },
//   fr: {
//     dashboard: "Tableau de Bord",
//     hostDashboard: "Tableau de Bord Hôte",
//     welcome: "Bon retour",
//     overview: "Aperçu",
//     myProfile: "Mon Profil",
//     myProperties: "Mes Propriétés",
//     myBookings: "Mes Réservations",
//     earnings: "Gains",
//     reviews: "Avis",
//     settings: "Paramètres",
//     logout: "Déconnexion",
//     totalProperties: "Total Propriétés",
//     activeProperties: "Propriétés Actives",
//     totalBookings: "Total Réservations",
//     totalEarnings: "Gains Totaux",
//     averageRating: "Évaluation Moyenne",
//     pendingBookings: "Réservations en Attente",
//     completedBookings: "Réservations Terminées",
//     cancelledBookings: "Réservations Annulées",
//     memberSince: "Membre Depuis",
//     email: "Email",
//     phone: "Téléphone",
//     location: "Emplacement",
//     recentBookings: "Réservations Récentes",
//     bookingTrend: "Tendance des Réservations",
//     earningsTrend: "Tendance des Gains",
//     propertyDistribution: "Distribution des Propriétés",
//     monthlyEarnings: "Gains Mensuels",
//     noBookings: "Aucune réservation trouvée",
//     noProperties: "Aucune propriété listée",
//     viewAll: "Voir Tout",
//     viewDetails: "Voir les Détails",
//     status: "Statut",
//     amount: "Montant",
//     date: "Date",
//     pending: "En Attente",
//     confirmed: "Confirmé",
//     completed: "Terminé",
//     cancelled: "Annulé",
//     rejected: "Rejeté",
//     paid: "Payé",
//     failed: "Échoué",
//     refunded: "Remboursé",
//     checkIn: "Arrivée",
//     checkOut: "Départ",
//     nights: "Nuits",
//     totalPrice: "Prix Total",
//     editProfile: "Modifier le Profil",
//     saveChanges: "Enregistrer les Modifications",
//     cancel: "Annuler",
//     saving: "Enregistrement...",
//     profileUpdated: "Profil mis à jour avec succès !",
//     updateFailed: "Échec de la mise à jour du profil",
//     loading: "Chargement...",
//     refresh: "Rafraîchir",
//     thisYear: "Cette Année",
//     thisMonth: "Ce Mois",
//     thisWeek: "Cette Semaine",
//     today: "Aujourd'hui",
//     noData: "Aucune donnée disponible",
//     addProperty: "Ajouter une Propriété",
//     manageProperties: "Gérer les Propriétés",
//     propertyName: "Nom de la Propriété",
//     propertyType: "Type de Propriété",
//     pricePerNight: "Prix par Mois",
//     rooms: "Chambres",
//     bathrooms: "Salles de Bain",
//     amenities: "Équipements",
//     address: "Adresse",
//     university: "Près de l'Université",
//     house: "Maison",
//     apartment: "Appartement",
//     room: "Chambre",
//     shared: "Partagé",
//     viewProperty: "Voir la Propriété",
//     editProperty: "Modifier la Propriété",
//     deleteProperty: "Supprimer la Propriété",
//   },
//   rw: {
//     dashboard: "Ibikorwa",
//     hostDashboard: "Ibikorwa by'Umwakirizi",
//     welcome: "Turakwinginze",
//     overview: "Aperçu",
//     myProfile: "Ibyawe",
//     myProperties: "Amazu Yanjye",
//     myBookings: "Ibyanditswe",
//     earnings: "Amahera Yakunze",
//     reviews: "Ibitekerezo",
//     settings: "Igenamiterere",
//     logout: "Gusohoka",
//     totalProperties: "Amazu Yose",
//     activeProperties: "Amazu Akoreshwa",
//     totalBookings: "Ibyanditswe Byose",
//     totalEarnings: "Amahera Yose",
//     averageRating: "Igipimo Rusange",
//     pendingBookings: "Ibyanditswe Bitegereje",
//     completedBookings: "Ibyanditswe Byarangiye",
//     cancelledBookings: "Ibyanditswe Byahagaritswe",
//     memberSince: "Yinjiye Kuva",
//     email: "Imeri",
//     phone: "Telefone",
//     location: "Aho Gihe",
//     recentBookings: "Ibyanditswe Vuba",
//     bookingTrend: "Imihindagurikire y'Ibyanditswe",
//     earningsTrend: "Imihindagurikire y'Amahera",
//     propertyDistribution: "Ibyiciro by'Amazu",
//     monthlyEarnings: "Amahera ku Kwezi",
//     noBookings: "Nta byanditswe byabonetse",
//     noProperties: "Nta mazu yanditswe",
//     viewAll: "Reba Byose",
//     viewDetails: "Reba Ibisobanuro",
//     status: "Ihagaze",
//     amount: "Amahera",
//     date: "Itariki",
//     pending: "Bitegereje",
//     confirmed: "Byemejwe",
//     completed: "Byarangiye",
//     cancelled: "Byahagaritswe",
//     rejected: "Byangijwe",
//     paid: "Byishyuwe",
//     failed: "Birananiranye",
//     refunded: "Byasubijwe",
//     checkIn: "Kwinjira",
//     checkOut: "Kuva",
//     nights: "Amezi",
//     totalPrice: "Igiciro Cyose",
//     editProfile: "Hindura Ibyawe",
//     saveChanges: "Bika Ibyahinduwe",
//     cancel: "Reka",
//     saving: "Biremereza...",
//     profileUpdated: "Ibyawe byavuguruwe neza!",
//     updateFailed: "Kuvugurura ibyawe birananiranye",
//     loading: "Biremereza...",
//     refresh: "Vugurura",
//     thisYear: "Uyu Mwaka",
//     thisMonth: "Uku Kwezi",
//     thisWeek: "Iyi Cyumweru",
//     today: "Uyu Munsi",
//     noData: "Nta makuru yabonetse",
//     addProperty: "Ongeraho Inzu",
//     manageProperties: "Gucunga Amazu",
//     propertyName: "Izina ry'Inzu",
//     propertyType: "Ubwoko bw'Inzu",
//     pricePerNight: "Igiciro ku Kwezi",
//     rooms: "Ibyumba",
//     bathrooms: "Ahabagirirwa",
//     amenities: "Ibikoresho",
//     address: "Aho Gihe",
//     university: "Hafi ya Kaminuza",
//     house: "Inzu",
//     apartment: "Aparitama",
//     room: "Icyumba",
//     shared: "Bisangiwe",
//     viewProperty: "Reba Inzu",
//     editProperty: "Hindura Inzu",
//     deleteProperty: "Kuraho Inzu",
//   },
// };

// // Helper functions
// const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
//   const lang = Cookies.get("language") as "en" | "fr" | "rw";
//   return lang || "en";
// };

// const getUserFromStorage = () => {
//   const user = localStorage.getItem("user");
//   if (user) {
//     try {
//       return JSON.parse(user);
//     } catch (e) {
//       return null;
//     }
//   }
//   return null;
// };

// const getToken = (): string => {
//   try {
//     return localStorage.getItem("token") || "";
//   } catch (error) {
//     console.error("Error reading token from localStorage:", error);
//     return "";
//   }
// };

// // API Base URL
// const API_BASE_URL = "https://rene-inyumba-nodejs.onrender.com";

// // Axios instance
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = getToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// // Chart Colors
// const COLORS = ["#FF385C", "#4F46E5", "#22C55E", "#F59E0B", "#8B5CF6"];

// export const HostDashboard: React.FC = () => {
//   const [lang, setLang] = useState<"en" | "fr" | "rw">(
//     getLanguageFromCookies(),
//   );
//   const [user, setUser] = useState<any>(getUserFromStorage());
//   const [loading, setLoading] = useState(false);
//   const [isFetching, setIsFetching] = useState(true);

//   // Data states
//   const [houses, setHouses] = useState<House[]>([]);
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);

//   // Statistics
//   const [stats, setStats] = useState({
//     totalProperties: 0,
//     activeProperties: 0,
//     totalBookings: 0,
//     totalEarnings: 0,
//     averageRating: 0,
//     pendingBookings: 0,
//     completedBookings: 0,
//     cancelledBookings: 0,
//   });

//   // Chart data
//   const [bookingTrendData, setBookingTrendData] = useState<any[]>([]);
//   const [earningsTrendData, setEarningsTrendData] = useState<any[]>([]);
//   const [propertyDistributionData, setPropertyDistributionData] = useState<
//     any[]
//   >([]);
//   const [monthlyEarningsData, setMonthlyEarningsData] = useState<any[]>([]);

//   // Profile edit state
//   const [isEditing, setIsEditing] = useState(false);
//   const [editForm, setEditForm] = useState({
//     name: user?.name || "",
//     email: user?.email || "",
//     phone: user?.phone || "",
//     location: user?.location || "",
//   });
//   const [isSaving, setIsSaving] = useState(false);

//   const t = translations[lang];

//   // Fetch data from API
//   const fetchData = async () => {
//     const email = user?.email || getUserFromStorage()?.email;
//     if (!email) {
//       toast.warning("Please login to view your dashboard");
//       setIsFetching(false);
//       return;
//     }

//     setIsFetching(true);
//     setLoading(true);

//     try {
//       // Fetch houses by email
//       console.log("🔍 Fetching houses for:", email);
//       const housesResponse = await api.get(`/houses/${email}`);
//       let housesData: House[] = [];
//       if (
//         housesResponse.data.success &&
//         Array.isArray(housesResponse.data.data)
//       ) {
//         housesData = housesResponse.data.data;
//       } else if (Array.isArray(housesResponse.data)) {
//         housesData = housesResponse.data;
//       } else if (
//         housesResponse.data.data &&
//         Array.isArray(housesResponse.data.data)
//       ) {
//         housesData = housesResponse.data.data;
//       }
//       console.log("🏠 Houses loaded:", housesData.length);
//       setHouses(housesData);

//       // Fetch bookings by email
//       console.log("🔍 Fetching bookings for:", email);
//       try {
//         const bookingsResponse = await api.get(`/bookings/${email}`);
//         let bookingsData: Booking[] = [];
//         if (
//           bookingsResponse.data.success &&
//           Array.isArray(bookingsResponse.data.data)
//         ) {
//           bookingsData = bookingsResponse.data.data;
//         } else if (Array.isArray(bookingsResponse.data)) {
//           bookingsData = bookingsResponse.data;
//         } else if (
//           bookingsResponse.data.data &&
//           Array.isArray(bookingsResponse.data.data)
//         ) {
//           bookingsData = bookingsResponse.data.data;
//         }
//         console.log("📊 Bookings loaded:", bookingsData.length);
//         setBookings(bookingsData);
//         setFilteredBookings(bookingsData);
//       } catch (bookingError: any) {
//         console.error("❌ Error fetching bookings:", bookingError);
//         // Try fallback - fetch all bookings and filter
//         if (bookingError.response?.status === 404) {
//           try {
//             console.log("🔄 Trying fallback: fetching all bookings");
//             const allBookingsResponse = await api.get("/bookings");
//             let allBookingsData: Booking[] = [];
//             if (
//               allBookingsResponse.data.success &&
//               Array.isArray(allBookingsResponse.data.data)
//             ) {
//               allBookingsData = allBookingsResponse.data.data;
//             } else if (Array.isArray(allBookingsResponse.data)) {
//               allBookingsData = allBookingsResponse.data;
//             } else if (
//               allBookingsResponse.data.data &&
//               Array.isArray(allBookingsResponse.data.data)
//             ) {
//               allBookingsData = allBookingsResponse.data.data;
//             }
//             // Filter by owner email
//             const hostBookings = allBookingsData.filter(
//               (b) => b.ownerEmail === email,
//             );
//             console.log("📊 Filtered bookings:", hostBookings.length);
//             setBookings(hostBookings);
//             setFilteredBookings(hostBookings);
//           } catch (fallbackError) {
//             console.error("❌ Fallback fetch failed:", fallbackError);
//           }
//         }
//       }
//     } catch (error) {
//       console.error("❌ Error fetching data:", error);
//       toast.error("Failed to load dashboard data");
//     } finally {
//       setIsFetching(false);
//       setLoading(false);
//     }
//   };

//   // Update statistics and charts when data changes
//   useEffect(() => {
//     if (houses.length === 0 && bookings.length === 0) return;

//     // Calculate statistics
//     const totalProperties = houses.length;
//     const activeProperties = houses.filter(
//       (h) => h.status === "available",
//     ).length;
//     const totalBookings = bookings.length;
//     const totalEarnings = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
//     const averageRating =
//       houses.length > 0
//         ? houses.reduce((sum, h) => sum + h.rating, 0) / houses.length
//         : 0;
//     const pendingBookings = bookings.filter(
//       (b) => b.status === "pending",
//     ).length;
//     const completedBookings = bookings.filter(
//       (b) => b.status === "completed",
//     ).length;
//     const cancelledBookings = bookings.filter(
//       (b) => b.status === "cancelled",
//     ).length;

//     setStats({
//       totalProperties,
//       activeProperties,
//       totalBookings,
//       totalEarnings,
//       averageRating,
//       pendingBookings,
//       completedBookings,
//       cancelledBookings,
//     });

//     // Calculate property distribution
//     const distribution: Record<string, number> = {};
//     houses.forEach((house) => {
//       const type = house.houseId?.includes("APT")
//         ? "Apartment"
//         : house.houseId?.includes("RMS")
//           ? "Room"
//           : "House";
//       distribution[type] = (distribution[type] || 0) + 1;
//     });
//     setPropertyDistributionData(
//       Object.entries(distribution).map(([name, value]) => ({ name, value })),
//     );

//     // Calculate monthly trends
//     const monthlyMap: Record<string, { bookings: number; earnings: number }> =
//       {};

//     bookings.forEach((booking) => {
//       const date = new Date(booking.createdAt);
//       const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

//       if (!monthlyMap[monthKey]) {
//         monthlyMap[monthKey] = { bookings: 0, earnings: 0 };
//       }
//       monthlyMap[monthKey].bookings += 1;
//       monthlyMap[monthKey].earnings += booking.totalAmount;
//     });

//     const sortedMonths = Object.keys(monthlyMap).sort();
//     const trendData = sortedMonths.map((key) => ({
//       month: key.split("-")[1],
//       bookings: monthlyMap[key].bookings,
//       earnings: monthlyMap[key].earnings,
//     }));

//     setBookingTrendData(trendData);
//     setEarningsTrendData(trendData);
//     setMonthlyEarningsData(trendData);
//   }, [houses, bookings]);

//   // Initial fetch
//   useEffect(() => {
//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // Listen for language changes
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newLang = getLanguageFromCookies();
//       if (newLang !== lang) {
//         setLang(newLang);
//       }
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [lang]);

//   // Handle profile edit
//   const handleEditProfile = () => {
//     setIsEditing(true);
//   };

//   const handleCancelEdit = () => {
//     setIsEditing(false);
//     setEditForm({
//       name: user?.name || "",
//       email: user?.email || "",
//       phone: user?.phone || "",
//       location: user?.location || "",
//     });
//   };

//   const handleSaveProfile = async () => {
//     setIsSaving(true);
//     try {
//       const updatedUser = { ...user, ...editForm };
//       localStorage.setItem("user", JSON.stringify(updatedUser));
//       setUser(updatedUser);
//       toast.success(`✅ ${t.profileUpdated}`);
//       setIsEditing(false);
//     } catch (error) {
//       toast.error(`❌ ${t.updateFailed}`);
//       console.error("Profile update error:", error);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleRefresh = () => {
//     fetchData();
//     toast.info("Refreshing dashboard...");
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-100 text-yellow-800";
//       case "confirmed":
//         return "bg-blue-100 text-blue-800";
//       case "completed":
//         return "bg-green-100 text-green-800";
//       case "cancelled":
//         return "bg-red-100 text-red-800";
//       case "available":
//         return "bg-green-100 text-green-800";
//       case "unavailable":
//         return "bg-gray-100 text-gray-800";
//       case "maintenance":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getStatusLabel = (status: string) => {
//     const labels: Record<string, string> = {
//       pending: t.pending,
//       confirmed: t.confirmed,
//       completed: t.completed,
//       cancelled: t.cancelled,
//       available: "Available",
//       unavailable: "Unavailable",
//       maintenance: "Maintenance",
//     };
//     return labels[status] || status;
//   };

//   const formatCurrency = (amount: number) => {
//     return `RWF ${amount.toLocaleString()}`;
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   // Stat cards
//   const statCards = [
//     {
//       title: t.totalProperties,
//       value: stats.totalProperties,
//       icon: <HouseIcon />,
//       color: "bg-blue-500",
//     },
//     {
//       title: t.totalBookings,
//       value: stats.totalBookings,
//       icon: <BookingIcon />,
//       color: "bg-green-500",
//     },
//     {
//       title: t.totalEarnings,
//       value: formatCurrency(stats.totalEarnings),
//       icon: <AttachMoneyIcon />,
//       color: "bg-purple-500",
//     },
//     {
//       title: t.averageRating,
//       value: `${stats.averageRating.toFixed(1)}/5`,
//       icon: <StarIcon />,
//       color: "bg-yellow-500",
//     },
//   ];

//   if (isFetching) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-[#FF385C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-500">{t.loading}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Page Header */}
//       <div className="bg-white border-b border-gray-200 py-6 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div>
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-[#FF385C]/10 rounded-full flex items-center justify-center text-[#FF385C]">
//                   <DashboardIcon className="w-5 h-5" />
//                 </div>
//                 <div>
//                   <h1 className="text-2xl font-bold text-gray-900">
//                     {t.hostDashboard}
//                   </h1>
//                   <p className="text-sm text-gray-500">
//                     {t.welcome}, {user?.name || "Host"}!
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={handleRefresh}
//                 className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//                 disabled={loading}
//               >
//                 <RefreshIcon
//                   className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
//                 />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         {/* Profile Section */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div className="flex items-center gap-4">
//               <div className="w-20 h-20 rounded-full bg-[#FF385C] text-white flex items-center justify-center text-3xl font-bold">
//                 {user?.name?.charAt(0).toUpperCase() || "H"}
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold text-gray-900">
//                   {isEditing ? (
//                     <input
//                       type="text"
//                       value={editForm.name}
//                       onChange={(e) =>
//                         setEditForm({ ...editForm, name: e.target.value })
//                       }
//                       className="border border-gray-300 rounded-lg px-2 py-1 text-xl font-bold"
//                     />
//                   ) : (
//                     user?.name || "Host User"
//                   )}
//                 </h2>
//                 <div className="flex items-center gap-2 text-sm text-gray-500">
//                   <EmailIcon className="w-4 h-4" />
//                   <span>{user?.email || "host@example.com"}</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-gray-500">
//                   <PhoneIcon className="w-4 h-4" />
//                   <span>{user?.phone || "Not provided"}</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
//                   <VerifiedIcon className="w-4 h-4 text-green-500" />
//                   <span className="text-green-600 font-medium">
//                     Verified Host
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-2">
//               {isEditing ? (
//                 <>
//                   <button
//                     onClick={handleSaveProfile}
//                     disabled={isSaving}
//                     className="px-4 py-2 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors flex items-center gap-2 disabled:opacity-50"
//                   >
//                     {isSaving ? (
//                       <>
//                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                         {t.saving}
//                       </>
//                     ) : (
//                       <>
//                         <CheckCircleIcon className="w-4 h-4" />
//                         {t.saveChanges}
//                       </>
//                     )}
//                   </button>
//                   <button
//                     onClick={handleCancelEdit}
//                     className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
//                   >
//                     {t.cancel}
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     onClick={handleEditProfile}
//                     className="px-4 py-2 border border-[#FF385C] text-[#FF385C] rounded-lg font-medium hover:bg-[#FF385C] hover:text-white transition-colors flex items-center gap-2"
//                   >
//                     <EditIcon className="w-4 h-4" />
//                     {t.editProfile}
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>

//           {isEditing && (
//             <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   value={editForm.email}
//                   onChange={(e) =>
//                     setEditForm({ ...editForm, email: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Phone
//                 </label>
//                 <input
//                   type="text"
//                   value={editForm.phone}
//                   onChange={(e) =>
//                     setEditForm({ ...editForm, phone: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//                 />
//               </div>
//               <div className="sm:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Location
//                 </label>
//                 <input
//                   type="text"
//                   value={editForm.location}
//                   onChange={(e) =>
//                     setEditForm({ ...editForm, location: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//                 />
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           {statCards.map((stat, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
//             >
//               <div className="flex items-center justify-between mb-3">
//                 <div
//                   className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white`}
//                 >
//                   {stat.icon}
//                 </div>
//               </div>
//               <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//               <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
//             </motion.div>
//           ))}
//         </div>

//         {/* Charts Row 1: Booking Trend & Earnings Trend */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//           {/* Booking Trend */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-gray-900">
//                 {t.bookingTrend}
//               </h3>
//             </div>
//             <div className="h-64">
//               {bookingTrendData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={bookingTrendData}>
//                     <defs>
//                       <linearGradient
//                         id="bookingGradient"
//                         x1="0"
//                         y1="0"
//                         x2="0"
//                         y2="1"
//                       >
//                         <stop
//                           offset="5%"
//                           stopColor="#FF385C"
//                           stopOpacity={0.3}
//                         />
//                         <stop
//                           offset="95%"
//                           stopColor="#FF385C"
//                           stopOpacity={0}
//                         />
//                       </linearGradient>
//                     </defs>
//                     <CartesianGrid
//                       strokeDasharray="3 3"
//                       stroke="#374151"
//                       opacity={0.1}
//                     />
//                     <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
//                     <YAxis stroke="#6B7280" fontSize={12} />
//                     <Tooltip
//                       contentStyle={{
//                         backgroundColor: "#1F2937",
//                         border: "none",
//                         borderRadius: "8px",
//                         color: "#fff",
//                       }}
//                     />
//                     <Area
//                       type="monotone"
//                       dataKey="bookings"
//                       stroke="#FF385C"
//                       strokeWidth={3}
//                       fill="url(#bookingGradient)"
//                     />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <div className="h-full flex items-center justify-center text-gray-400">
//                   {t.noData}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Earnings Trend */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-gray-900">
//                 {t.earningsTrend}
//               </h3>
//             </div>
//             <div className="h-64">
//               {earningsTrendData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={earningsTrendData}>
//                     <CartesianGrid
//                       strokeDasharray="3 3"
//                       stroke="#374151"
//                       opacity={0.1}
//                     />
//                     <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
//                     <YAxis
//                       stroke="#6B7280"
//                       fontSize={12}
//                       tickFormatter={(value) => `RWF ${value / 1000}K`}
//                     />
//                     <Tooltip
//                       formatter={(value: any) =>
//                         `RWF ${value.toLocaleString()}`
//                       }
//                       contentStyle={{
//                         backgroundColor: "#1F2937",
//                         border: "none",
//                         borderRadius: "8px",
//                         color: "#fff",
//                       }}
//                     />
//                     <Bar
//                       dataKey="earnings"
//                       fill="#4F46E5"
//                       radius={[8, 8, 0, 0]}
//                     />
//                   </BarChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <div className="h-full flex items-center justify-center text-gray-400">
//                   {t.noData}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Charts Row 2: Property Distribution & Monthly Earnings */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//           {/* Property Distribution - Pie Chart */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               {t.propertyDistribution}
//             </h3>
//             <div className="h-64">
//               {propertyDistributionData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={propertyDistributionData}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={60}
//                       outerRadius={90}
//                       paddingAngle={2}
//                       dataKey="value"
//                       label={({ name, percent }) => {
//                         const percentValue = percent || 0;
//                         return `${name} ${(percentValue * 100).toFixed(0)}%`;
//                       }}
//                       labelLine={false}
//                     >
//                       {propertyDistributionData.map((_entry, index) => (
//                         <Cell
//                           key={`cell-${index}`}
//                           fill={COLORS[index % COLORS.length]}
//                         />
//                       ))}
//                     </Pie>
//                     <Tooltip
//                       contentStyle={{
//                         backgroundColor: "#1F2937",
//                         border: "none",
//                         borderRadius: "8px",
//                         color: "#fff",
//                       }}
//                     />
//                     <Legend />
//                   </PieChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <div className="h-full flex items-center justify-center text-gray-400">
//                   {t.noData}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Monthly Earnings - Line Chart */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-gray-900">
//                 {t.monthlyEarnings}
//               </h3>
//             </div>
//             <div className="h-64">
//               {monthlyEarningsData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={monthlyEarningsData}>
//                     <CartesianGrid
//                       strokeDasharray="3 3"
//                       stroke="#374151"
//                       opacity={0.1}
//                     />
//                     <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
//                     <YAxis
//                       stroke="#6B7280"
//                       fontSize={12}
//                       tickFormatter={(value) => `RWF ${value / 1000}K`}
//                     />
//                     <Tooltip
//                       formatter={(value: any) =>
//                         `RWF ${value.toLocaleString()}`
//                       }
//                       contentStyle={{
//                         backgroundColor: "#1F2937",
//                         border: "none",
//                         borderRadius: "8px",
//                         color: "#fff",
//                       }}
//                     />
//                     <Line
//                       type="monotone"
//                       dataKey="earnings"
//                       stroke="#8B5CF6"
//                       strokeWidth={3}
//                       dot={{ fill: "#8B5CF6", strokeWidth: 2 }}
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <div className="h-full flex items-center justify-center text-gray-400">
//                   {t.noData}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Properties Section */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
//           <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
//             <h3 className="text-lg font-semibold text-gray-900">
//               {t.myProperties}
//             </h3>
//             <div className="flex items-center gap-2">
//               <button className="text-sm text-[#FF385C] hover:underline flex items-center gap-1">
//                 {t.viewAll}
//                 <ArrowForwardIcon className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//           <div className="divide-y divide-gray-100">
//             {houses.length === 0 ? (
//               <div className="px-6 py-8 text-center text-gray-500">
//                 <HouseIcon className="w-12 h-12 mx-auto text-gray-300 mb-2" />
//                 <p>{t.noProperties}</p>
//               </div>
//             ) : (
//               houses.slice(0, 5).map((house) => (
//                 <motion.div
//                   key={house._id}
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
//                 >
//                   <img
//                     src={
//                       house.images?.[0]?.url ||
//                       "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&h=100&fit=crop"
//                     }
//                     alt={house.name}
//                     className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
//                   />
//                   <div className="flex-1 min-w-0">
//                     <h4 className="text-sm font-semibold text-gray-900">
//                       {house.name}
//                     </h4>
//                     <p className="text-xs text-gray-500 flex items-center gap-1">
//                       <LocationOnIcon className="w-3 h-3" />
//                       {house.location.village}, {house.location.district}
//                     </p>
//                     <div className="flex flex-wrap items-center gap-2 mt-1">
//                       <span className="text-xs text-gray-500">
//                         <BedIcon className="w-3 h-3 inline mr-0.5" />
//                         {house.bedrooms} rooms
//                       </span>
//                       <span className="text-xs text-gray-500">
//                         <BathroomIcon className="w-3 h-3 inline mr-0.5" />
//                         {house.bathrooms} baths
//                       </span>
//                       <span className="text-xs text-gray-500">
//                         <AttachMoneyIcon className="w-3 h-3 inline mr-0.5" />
//                         {formatCurrency(house.pricePerMonth)}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="text-right flex-shrink-0">
//                     <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
//                       <StarIcon className="w-3.5 h-3.5 text-yellow-400 fill-current" />
//                       {house.rating.toFixed(1)}
//                     </div>
//                     <span
//                       className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(house.status)}`}
//                     >
//                       {getStatusLabel(house.status)}
//                     </span>
//                   </div>
//                 </motion.div>
//               ))
//             )}
//             {houses.length > 5 && (
//               <div className="px-6 py-3 text-center text-sm text-gray-500">
//                 And {houses.length - 5} more properties...
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Recent Bookings */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//           <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
//             <h3 className="text-lg font-semibold text-gray-900">
//               {t.recentBookings}
//             </h3>
//             <button className="text-sm text-[#FF385C] hover:underline flex items-center gap-1">
//               {t.viewAll}
//               <ArrowForwardIcon className="w-4 h-4" />
//             </button>
//           </div>
//           <div className="divide-y divide-gray-100">
//             {filteredBookings.length === 0 ? (
//               <div className="px-6 py-8 text-center text-gray-500">
//                 <BookingIcon className="w-12 h-12 mx-auto text-gray-300 mb-2" />
//                 <p>{t.noBookings}</p>
//               </div>
//             ) : (
//               filteredBookings.slice(0, 5).map((booking) => (
//                 <motion.div
//                   key={booking._id}
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
//                 >
//                   <img
//                     src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&h=100&fit=crop"
//                     alt={booking.houseName}
//                     className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
//                   />
//                   <div className="flex-1 min-w-0">
//                     <h4 className="text-sm font-semibold text-gray-900">
//                       {booking.houseName}
//                     </h4>
//                     <p className="text-xs text-gray-500">
//                       Student: {booking.fullName}
//                     </p>
//                     <div className="flex flex-wrap items-center gap-2 mt-1">
//                       <span className="text-xs text-gray-500">
//                         <CalendarTodayIcon className="w-3 h-3 inline mr-0.5" />
//                         {formatDate(booking.checkIn)} -{" "}
//                         {formatDate(booking.checkOut)}
//                       </span>
//                       <span className="text-xs text-gray-500">
//                         • {booking.months} {t.nights}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="text-right flex-shrink-0">
//                     <p className="text-sm font-bold text-[#FF385C]">
//                       {formatCurrency(booking.totalAmount)}
//                     </p>
//                     <span
//                       className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(booking.status)}`}
//                     >
//                       {getStatusLabel(booking.status)}
//                     </span>
//                   </div>
//                 </motion.div>
//               ))
//             )}
//             {filteredBookings.length > 5 && (
//               <div className="px-6 py-3 text-center text-sm text-gray-500">
//                 And {filteredBookings.length - 5} more bookings...
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Loading Overlay */}
//         {loading && (
//           <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[999] flex items-center justify-center">
//             <div className="bg-white rounded-2xl p-8 shadow-2xl text-center">
//               <div className="w-12 h-12 border-4 border-[#FF385C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//               <p className="text-gray-600">{t.loading}</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };









/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";

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
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VerifiedIcon from "@mui/icons-material/Verified";
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

// ============================================
// GOOGLE TRANSLATE API
// ============================================
const GOOGLE_TRANSLATE_API_URL = "https://translate.googleapis.com/translate_a/single";

const translateText = async (text: string, targetLang: string): Promise<string> => {
  if (!text || text.trim() === "") return text;
  if (targetLang === "en") return text;
  
  try {
    const response = await axios.get(GOOGLE_TRANSLATE_API_URL, {
      params: {
        client: "gtx",
        sl: "auto",
        tl: targetLang,
        dt: "t",
        q: text,
      },
    });
    
    if (response.data && Array.isArray(response.data) && response.data[0]) {
      let translated = "";
      for (const part of response.data[0]) {
        if (part && part[0]) {
          translated += part[0];
        }
      }
      return translated || text;
    }
    return text;
  } catch (error) {
    return text;
  }
};

// ============================================
// TYPES
// ============================================
interface House {
  _id: string;
  houseId: string;
  name: string;
  description: string;
  images: { url: string }[];
  location: {
    province: string;
    district: string;
    sector: string;
    cell: string;
    village: string;
  };
  university: string;
  pricePerMonth: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  amenities: string[];
  status: "available" | "pending" | "unavailable" | "maintenance";
  rating: number;
  totalReviews: number;
  host: {
    name: string;
    email: string;
    phone: string;
    responseRate: number;
    responseTime: string;
  };
  availability: {
    startDate: string;
    endDate: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Booking {
  _id: string;
  bookingId: string;
  fullName: string;
  email: string;
  phone: string;
  idNumber: string;
  university: string;
  studentId: string;
  purpose: string;
  houseId: string;
  houseName: string;
  houseType: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
  ownerName: string;
  ownerContact: string;
  ownerEmail: string;
  checkIn: string;
  checkOut: string;
  months: number;
  guests: number;
  specialRequests: string;
  monthlyRent: number;
  serviceFee: number;
  totalAmount: number;
  paymentMethod: "momo" | "bank" | "cash";
  momoNumber: string;
  paymentStatus: "pending" | "verified" | "failed";
  status: "pending" | "confirmed" | "cancelled" | "completed";
  notes: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// TRANSLATIONS
// ============================================
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
    nights: "Months",
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
    pricePerNight: "Price per Month",
    rooms: "Bedrooms",
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
    available: "Available",
    unavailable: "Unavailable",
    maintenance: "Maintenance",
    verifiedHost: "Verified Host",
    notProvided: "Not provided",
    refreshDashboard: "Refreshing dashboard...",
    fetchFailed: "Failed to load dashboard data",
    pleaseLogin: "Please login to view your dashboard",
    translating: "Translating...",
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
    pricePerNight: "Prix par Mois",
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
    available: "Disponible",
    unavailable: "Indisponible",
    maintenance: "Maintenance",
    verifiedHost: "Hôte Vérifié",
    notProvided: "Non fourni",
    refreshDashboard: "Rafraîchissement du tableau de bord...",
    fetchFailed: "Échec du chargement des données du tableau de bord",
    pleaseLogin: "Veuillez vous connecter pour voir votre tableau de bord",
    translating: "Traduction en cours...",
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
    nights: "Amezi",
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
    pricePerNight: "Igiciro ku Kwezi",
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
    available: "Irahari",
    unavailable: "Ntiboneka",
    maintenance: "Irakosorwa",
    verifiedHost: "Umwakirizi Wemejwe",
    notProvided: "Ntabwo byatanzwe",
    refreshDashboard: "Kuvugurura ibikorwa...",
    fetchFailed: "Kubura amakuru birananiranye",
    pleaseLogin: "Nyamuneka winjire kugira ngo urebe ibikorwa byawe",
    translating: "Biremereza ibisobanuro...",
  },
};

// Helper functions
const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
  const lang = Cookies.get("language") as "en" | "fr" | "rw";
  return lang || "en";
};

const getUserFromStorage = () => {
  const user = localStorage.getItem("user");
  if (user) {
    try {
      return JSON.parse(user);
    } catch (e) {
      return null;
    }
  }
  return null;
};

const getToken = (): string => {
  try {
    return localStorage.getItem("token") || "";
  } catch (error) {
    return "";
  }
};

// API Base URL
const API_BASE_URL = "https://rene-inyumba-nodejs.onrender.com";

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Chart Colors
const COLORS = ["#FF385C", "#4F46E5", "#22C55E", "#F59E0B", "#8B5CF6"];

export const HostDashboard: React.FC = () => {
  const [lang, setLang] = useState<"en" | "fr" | "rw">(
    getLanguageFromCookies(),
  );
  const [user, setUser] = useState<any>(getUserFromStorage());
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isTranslating, setIsTranslating] = useState(false);

  // Data states
  const [houses, setHouses] = useState<House[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);

  // Statistics
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeProperties: 0,
    totalBookings: 0,
    totalEarnings: 0,
    averageRating: 0,
    pendingBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
  });

  // Chart data
  const [bookingTrendData, setBookingTrendData] = useState<any[]>([]);
  const [earningsTrendData, setEarningsTrendData] = useState<any[]>([]);
  const [propertyDistributionData, setPropertyDistributionData] = useState<
    any[]
  >([]);
  const [monthlyEarningsData, setMonthlyEarningsData] = useState<any[]>([]);

  // Profile edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const t = translations[lang];

  // Helper function to check if status matches any of the given values (case insensitive)
  const statusMatches = (status: string, values: string[]): boolean => {
    const lowerStatus = status.toLowerCase();
    return values.some(val => lowerStatus === val.toLowerCase());
  };

  // Translate data function
  const translateData = async (housesData: House[], bookingsData: Booking[]) => {
    if (lang === "en") {
      return { housesData, bookingsData };
    }

    setIsTranslating(true);
    try {
      // Translate house names and descriptions
      const translatedHouses = await Promise.all(
        housesData.map(async (house) => ({
          ...house,
          name: await translateText(house.name, lang),
          description: await translateText(house.description, lang),
          location: {
            ...house.location,
            province: await translateText(house.location.province, lang),
            district: await translateText(house.location.district, lang),
            sector: await translateText(house.location.sector, lang),
            cell: await translateText(house.location.cell, lang),
            village: await translateText(house.location.village, lang),
          },
          university: await translateText(house.university, lang),
          amenities: await Promise.all(
            house.amenities.map((amenity) => translateText(amenity, lang))
          ),
          status: await translateText(house.status, lang) as any,
        }))
      );

      // Translate bookings
      const translatedBookings = await Promise.all(
        bookingsData.map(async (booking) => ({
          ...booking,
          fullName: await translateText(booking.fullName, lang),
          email: booking.email,
          phone: booking.phone,
          university: await translateText(booking.university, lang),
          purpose: await translateText(booking.purpose, lang),
          houseName: await translateText(booking.houseName, lang),
          houseType: await translateText(booking.houseType, lang),
          district: await translateText(booking.district, lang),
          sector: await translateText(booking.sector, lang),
          cell: await translateText(booking.cell, lang),
          village: await translateText(booking.village, lang),
          ownerName: await translateText(booking.ownerName, lang),
          status: await translateText(booking.status, lang) as any,
          paymentStatus: await translateText(booking.paymentStatus, lang) as any,
          specialRequests: await translateText(booking.specialRequests, lang),
          notes: await translateText(booking.notes, lang),
        }))
      );

      return { housesData: translatedHouses, bookingsData: translatedBookings };
    } catch (error) {
      return { housesData, bookingsData };
    } finally {
      setIsTranslating(false);
    }
  };

  // Fetch data from API
  const fetchData = async () => {
    const email = user?.email || getUserFromStorage()?.email;
    if (!email) {
      toast.warning(t.pleaseLogin);
      setIsFetching(false);
      return;
    }

    setIsFetching(true);
    setLoading(true);

    try {
      // Fetch houses by email
      const housesResponse = await api.get(`/houses/${email}`);
      let housesData: House[] = [];
      if (
        housesResponse.data.success &&
        Array.isArray(housesResponse.data.data)
      ) {
        housesData = housesResponse.data.data;
      } else if (Array.isArray(housesResponse.data)) {
        housesData = housesResponse.data;
      } else if (
        housesResponse.data.data &&
        Array.isArray(housesResponse.data.data)
      ) {
        housesData = housesResponse.data.data;
      }

      // Fetch bookings by email using the correct endpoint
      let bookingsData: Booking[] = [];
      try {
        const bookingsResponse = await api.get(`/bookings/email/${email}`);
        if (
          bookingsResponse.data.success &&
          Array.isArray(bookingsResponse.data.data)
        ) {
          bookingsData = bookingsResponse.data.data;
        } else if (Array.isArray(bookingsResponse.data)) {
          bookingsData = bookingsResponse.data;
        } else if (
          bookingsResponse.data.data &&
          Array.isArray(bookingsResponse.data.data)
        ) {
          bookingsData = bookingsResponse.data.data;
        }
      } catch (bookingError: any) {
        // Fallback: try fetching all bookings and filter by owner email
        if (bookingError.response?.status === 404) {
          try {
            const allBookingsResponse = await api.get("/bookings");
            let allBookingsData: Booking[] = [];
            if (
              allBookingsResponse.data.success &&
              Array.isArray(allBookingsResponse.data.data)
            ) {
              allBookingsData = allBookingsResponse.data.data;
            } else if (Array.isArray(allBookingsResponse.data)) {
              allBookingsData = allBookingsResponse.data;
            } else if (
              allBookingsResponse.data.data &&
              Array.isArray(allBookingsResponse.data.data)
            ) {
              allBookingsData = allBookingsResponse.data.data;
            }
            // Filter by owner email
            bookingsData = allBookingsData.filter(
              (b) => b.ownerEmail === email
            );
          } catch (fallbackError) {
            // Silent fail
          }
        }
      }

      // Translate data if needed
      const { housesData: translatedHouses, bookingsData: translatedBookings } =
        await translateData(housesData, bookingsData);

      setHouses(translatedHouses);
      setBookings(translatedBookings);
      setFilteredBookings(translatedBookings);
    } catch (error) {
      toast.error(`❌ ${t.fetchFailed}`);
    } finally {
      setIsFetching(false);
      setLoading(false);
    }
  };

  // Update statistics and charts when data changes
  useEffect(() => {
    if (houses.length === 0 && bookings.length === 0) return;

    // Calculate statistics using helper function
    const totalProperties = houses.length;
    const activeProperties = houses.filter(
      (h) => statusMatches(h.status, ["available", "disponible", "irahari"])
    ).length;
    const totalBookings = bookings.length;
    const totalEarnings = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
    const averageRating =
      houses.length > 0
        ? houses.reduce((sum, h) => sum + (h.rating || 0), 0) / houses.length
        : 0;
    const pendingBookings = bookings.filter(
      (b) => statusMatches(b.status, ["pending", "en attente", "bitegereje"])
    ).length;
    const completedBookings = bookings.filter(
      (b) => statusMatches(b.status, ["completed", "terminé", "byarangiye"])
    ).length;
    const cancelledBookings = bookings.filter(
      (b) => statusMatches(b.status, ["cancelled", "annulé", "byahagaritswe"])
    ).length;

    setStats({
      totalProperties,
      activeProperties,
      totalBookings,
      totalEarnings,
      averageRating,
      pendingBookings,
      completedBookings,
      cancelledBookings,
    });

    // Calculate property distribution
    const distribution: Record<string, number> = {};
    houses.forEach((house) => {
      const type = house.houseId?.includes("APT")
        ? "Apartment"
        : house.houseId?.includes("RMS")
          ? "Room"
          : "House";
      distribution[type] = (distribution[type] || 0) + 1;
    });
    setPropertyDistributionData(
      Object.entries(distribution).map(([name, value]) => ({ name, value })),
    );

    // Calculate monthly trends
    const monthlyMap: Record<string, { bookings: number; earnings: number }> =
      {};

    bookings.forEach((booking) => {
      const date = new Date(booking.createdAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

      if (!monthlyMap[monthKey]) {
        monthlyMap[monthKey] = { bookings: 0, earnings: 0 };
      }
      monthlyMap[monthKey].bookings += 1;
      monthlyMap[monthKey].earnings += booking.totalAmount;
    });

    const sortedMonths = Object.keys(monthlyMap).sort();
    const trendData = sortedMonths.map((key) => ({
      month: key.split("-")[1],
      bookings: monthlyMap[key].bookings,
      earnings: monthlyMap[key].earnings,
    }));

    setBookingTrendData(trendData);
    setEarningsTrendData(trendData);
    setMonthlyEarningsData(trendData);
  }, [houses, bookings]);

  // Initial fetch
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-fetch when language changes to translate data
  useEffect(() => {
    if (houses.length > 0 || bookings.length > 0) {
      const reTranslate = async () => {
        const { housesData: translatedHouses, bookingsData: translatedBookings } =
          await translateData(houses, bookings);
        setHouses(translatedHouses);
        setBookings(translatedBookings);
        setFilteredBookings(translatedBookings);
      };
      reTranslate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // Listen for language changes
  useEffect(() => {
    const interval = setInterval(() => {
      const newLang = getLanguageFromCookies();
      if (newLang !== lang) {
        setLang(newLang);
      }
    }, 1000);
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
      phone: user?.phone || "",
      location: user?.location || "",
    });
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const updatedUser = { ...user, ...editForm };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success(`✅ ${t.profileUpdated}`);
      setIsEditing(false);
    } catch (error) {
      toast.error(`❌ ${t.updateFailed}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleRefresh = () => {
    fetchData();
    toast.info(t.refreshDashboard);
  };

  const getStatusColor = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (["pending", "en attente", "bitegereje"].includes(lowerStatus)) {
      return "bg-yellow-100 text-yellow-800";
    }
    if (["confirmed", "confirmé", "byemejwe"].includes(lowerStatus)) {
      return "bg-blue-100 text-blue-800";
    }
    if (["completed", "terminé", "byarangiye"].includes(lowerStatus)) {
      return "bg-green-100 text-green-800";
    }
    if (["cancelled", "annulé", "byahagaritswe"].includes(lowerStatus)) {
      return "bg-red-100 text-red-800";
    }
    if (["available", "disponible", "irahari"].includes(lowerStatus)) {
      return "bg-green-100 text-green-800";
    }
    if (["unavailable", "indisponible", "ntiboneka"].includes(lowerStatus)) {
      return "bg-gray-100 text-gray-800";
    }
    if (["maintenance"].includes(lowerStatus)) {
      return "bg-red-100 text-red-800";
    }
    return "bg-gray-100 text-gray-800";
  };

  const getStatusLabel = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (["pending", "en attente", "bitegereje"].includes(lowerStatus)) {
      return t.pending;
    }
    if (["confirmed", "confirmé", "byemejwe"].includes(lowerStatus)) {
      return t.confirmed;
    }
    if (["completed", "terminé", "byarangiye"].includes(lowerStatus)) {
      return t.completed;
    }
    if (["cancelled", "annulé", "byahagaritswe"].includes(lowerStatus)) {
      return t.cancelled;
    }
    if (["available", "disponible", "irahari"].includes(lowerStatus)) {
      return t.available;
    }
    if (["unavailable", "indisponible", "ntiboneka"].includes(lowerStatus)) {
      return t.unavailable;
    }
    if (["maintenance"].includes(lowerStatus)) {
      return t.maintenance;
    }
    return status;
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
    },
    {
      title: t.totalBookings,
      value: stats.totalBookings,
      icon: <BookingIcon />,
      color: "bg-green-500",
    },
    {
      title: t.totalEarnings,
      value: formatCurrency(stats.totalEarnings),
      icon: <AttachMoneyIcon />,
      color: "bg-purple-500",
    },
    {
      title: t.averageRating,
      value: `${stats.averageRating.toFixed(1)}/5`,
      icon: <StarIcon />,
      color: "bg-yellow-500",
    },
  ];

  if (isFetching || isTranslating) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FF385C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">{isTranslating ? t.translating : t.loading}</p>
        </div>
      </div>
    );
  }

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
                    Landlord
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
                <RefreshIcon
                  className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
                />
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
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
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
                  <span>{user?.phone || t.notProvided}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <VerifiedIcon className="w-4 h-4 text-green-500" />
                  <span className="text-green-600 font-medium">
                    {t.verifiedHost}
                  </span>
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
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
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
                  onChange={(e) =>
                    setEditForm({ ...editForm, phone: e.target.value })
                  }
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
                  onChange={(e) =>
                    setEditForm({ ...editForm, location: e.target.value })
                  }
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
            </div>
            <div className="h-64">
              {bookingTrendData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={bookingTrendData}>
                    <defs>
                      <linearGradient
                        id="bookingGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#FF385C"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#FF385C"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
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
                    <Area
                      type="monotone"
                      dataKey="bookings"
                      stroke="#FF385C"
                      strokeWidth={3}
                      fill="url(#bookingGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  {t.noData}
                </div>
              )}
            </div>
          </div>

          {/* Earnings Trend */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {t.earningsTrend}
              </h3>
            </div>
            <div className="h-64">
              {earningsTrendData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={earningsTrendData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#374151"
                      opacity={0.1}
                    />
                    <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                    <YAxis
                      stroke="#6B7280"
                      fontSize={12}
                      tickFormatter={(value) => `RWF ${value / 1000}K`}
                    />
                    <Tooltip
                      formatter={(value: any) =>
                        `RWF ${value.toLocaleString()}`
                      }
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "none",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                    <Bar
                      dataKey="earnings"
                      fill="#4F46E5"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  {t.noData}
                </div>
              )}
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
              {propertyDistributionData.length > 0 ? (
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
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  {t.noData}
                </div>
              )}
            </div>
          </div>

          {/* Monthly Earnings - Line Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {t.monthlyEarnings}
              </h3>
            </div>
            <div className="h-64">
              {monthlyEarningsData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyEarningsData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#374151"
                      opacity={0.1}
                    />
                    <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                    <YAxis
                      stroke="#6B7280"
                      fontSize={12}
                      tickFormatter={(value) => `RWF ${value / 1000}K`}
                    />
                    <Tooltip
                      formatter={(value: any) =>
                        `RWF ${value.toLocaleString()}`
                      }
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
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  {t.noData}
                </div>
              )}
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
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {houses.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                <HouseIcon className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                <p>{t.noProperties}</p>
              </div>
            ) : (
              houses.slice(0, 5).map((house) => (
                <motion.div
                  key={house._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={
                      house.images?.[0]?.url ||
                      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&h=100&fit=crop"
                    }
                    alt={house.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900">
                      {house.name}
                    </h4>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <LocationOnIcon className="w-3 h-3" />
                      {house.location.village}, {house.location.district}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">
                        <BedIcon className="w-3 h-3 inline mr-0.5" />
                        {house.bedrooms} rooms
                      </span>
                      <span className="text-xs text-gray-500">
                        <BathroomIcon className="w-3 h-3 inline mr-0.5" />
                        {house.bathrooms} baths
                      </span>
                      <span className="text-xs text-gray-500">
                        <AttachMoneyIcon className="w-3 h-3 inline mr-0.5" />
                        {formatCurrency(house.pricePerMonth)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                      <StarIcon className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                      {house.rating.toFixed(1)}
                    </div>
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(house.status)}`}
                    >
                      {getStatusLabel(house.status)}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
            {houses.length > 5 && (
              <div className="px-6 py-3 text-center text-sm text-gray-500">
                And {houses.length - 5} more properties...
              </div>
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
            {filteredBookings.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                <BookingIcon className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                <p>{t.noBookings}</p>
              </div>
            ) : (
              filteredBookings.slice(0, 5).map((booking) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                >
                  <img
                    src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&h=100&fit=crop"
                    alt={booking.houseName}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900">
                      {booking.houseName}
                    </h4>
                    <p className="text-xs text-gray-500">
                      Student: {booking.fullName}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">
                        <CalendarTodayIcon className="w-3 h-3 inline mr-0.5" />
                        {formatDate(booking.checkIn)} -{" "}
                        {formatDate(booking.checkOut)}
                      </span>
                      <span className="text-xs text-gray-500">
                        • {booking.months} {t.nights}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-[#FF385C]">
                      {formatCurrency(booking.totalAmount)}
                    </p>
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(booking.status)}`}
                    >
                      {getStatusLabel(booking.status)}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
            {filteredBookings.length > 5 && (
              <div className="px-6 py-3 text-center text-sm text-gray-500">
                And {filteredBookings.length - 5} more bookings...
              </div>
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