// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import Cookies from 'js-cookie';

// // Material-UI Icons
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import BookingIcon from "@mui/icons-material/BookOnline";
// import PaymentsIcon from "@mui/icons-material/Payments";
// import StarIcon from "@mui/icons-material/Star";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import SchoolIcon from "@mui/icons-material/School";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import EmailIcon from "@mui/icons-material/Email";
// import PhoneIcon from "@mui/icons-material/Phone";
// import EditIcon from "@mui/icons-material/Edit";
// import RefreshIcon from "@mui/icons-material/Refresh";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import VerifiedIcon from "@mui/icons-material/Verified";

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

// // Translations
// const translations = {
//   en: {
//     dashboard: "Dashboard",
//     userDashboard: "User Dashboard",
//     welcome: "Welcome back",
//     overview: "Overview",
//     myProfile: "My Profile",
//     myBookings: "My Bookings",
//     myHouses: "My Houses",
//     payments: "Payments",
//     favorites: "Favorites",
//     settings: "Settings",
//     logout: "Logout",
//     totalBookings: "Total Bookings",
//     activeBookings: "Active Bookings",
//     completedBookings: "Completed Bookings",
//     cancelledBookings: "Cancelled Bookings",
//     totalSpent: "Total Spent",
//     averageRating: "Average Rating",
//     memberSince: "Member Since",
//     email: "Email",
//     phone: "Phone",
//     university: "University",
//     location: "Location",
//     recentBookings: "Recent Bookings",
//     bookingTrend: "Booking Trend",
//     spendingTrend: "Spending Trend",
//     bookingDistribution: "Booking Distribution",
//     monthlySpending: "Monthly Spending",
//     noBookings: "No bookings found",
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
//     nights: "Nights",
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
//     fetchError: "Failed to load dashboard data",
//     noUserEmail: "No user email found. Please login again.",
//     profileUpdateFailed: "Failed to update profile. Please try again.",
//   },
//   fr: {
//     dashboard: "Tableau de Bord",
//     userDashboard: "Tableau de Bord Utilisateur",
//     welcome: "Bon retour",
//     overview: "Aperçu",
//     myProfile: "Mon Profil",
//     myBookings: "Mes Réservations",
//     myHouses: "Mes Maisons",
//     payments: "Paiements",
//     favorites: "Favoris",
//     settings: "Paramètres",
//     logout: "Déconnexion",
//     totalBookings: "Total Réservations",
//     activeBookings: "Réservations Actives",
//     completedBookings: "Réservations Terminées",
//     cancelledBookings: "Réservations Annulées",
//     totalSpent: "Dépenses Totales",
//     averageRating: "Évaluation Moyenne",
//     memberSince: "Membre Depuis",
//     email: "Email",
//     phone: "Téléphone",
//     university: "Université",
//     location: "Emplacement",
//     recentBookings: "Réservations Récentes",
//     bookingTrend: "Tendance des Réservations",
//     spendingTrend: "Tendance des Dépenses",
//     bookingDistribution: "Distribution des Réservations",
//     monthlySpending: "Dépenses Mensuelles",
//     noBookings: "Aucune réservation trouvée",
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
//     fetchError: "Échec du chargement des données du tableau de bord",
//     noUserEmail: "Aucun email utilisateur trouvé. Veuillez vous reconnecter.",
//     profileUpdateFailed: "Échec de la mise à jour du profil. Veuillez réessayer.",
//   },
//   rw: {
//     dashboard: "Ibikorwa",
//     userDashboard: "Ibikorwa by'Umukoresha",
//     welcome: "Turakwinginze",
//     overview: "Aperçu",
//     myProfile: "Ibyawe",
//     myBookings: "Ibyanditswe",
//     myHouses: "Amazu Yanjye",
//     payments: "Ubwishyu",
//     favorites: "Ibyakiriwe",
//     settings: "Igenamiterere",
//     logout: "Gusohoka",
//     totalBookings: "Ibyanditswe Byose",
//     activeBookings: "Ibyanditswe Bigikora",
//     completedBookings: "Ibyanditswe Byarangiye",
//     cancelledBookings: "Ibyanditswe Byahagaritswe",
//     totalSpent: "Amahera Yakoreshejwe",
//     averageRating: "Igipimo Rusange",
//     memberSince: "Yinjiye Kuva",
//     email: "Imeri",
//     phone: "Telefone",
//     university: "Kaminuza",
//     location: "Aho Gihe",
//     recentBookings: "Ibyanditswe Vuba",
//     bookingTrend: "Imihindagurikire y'Ibyanditswe",
//     spendingTrend: "Imihindagurikire y'Amahera",
//     bookingDistribution: "Ibyiciro by'Ibyanditswe",
//     monthlySpending: "Amahera ku Kwezi",
//     noBookings: "Nta byanditswe byabonetse",
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
//     nights: "Ijoro",
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
//     fetchError: "Kubura amakuru ya dashboard birananiranye",
//     noUserEmail: "Nta imeri y'umukoresha yabonetse. Nyamuneka winjire undi munsi.",
//     profileUpdateFailed: "Kuvugurura ibyawe birananiranye. Gerageza undi munsi.",
//   }
// };

// // Helper function to get language from cookies
// const getLanguageFromCookies = (): 'en' | 'fr' | 'rw' => {
//   const lang = Cookies.get('language') as 'en' | 'fr' | 'rw';
//   return lang || 'en';
// };

// // Helper function to get user from localStorage
// const getUserFromStorage = () => {
//   const user = localStorage.getItem('user');
//   if (user) {
//     try {
//       return JSON.parse(user);
//     } catch (e) {
//       return null;
//     }
//   }
//   return null;
// };

// // Helper function to get user email from localStorage
// const getUserEmailFromStorage = (): string => {
//   try {
//     const userStr = localStorage.getItem('user');
//     if (userStr) {
//       const user = JSON.parse(userStr);
//       if (user.email) {
//         return user.email;
//       }
//     }
//   } catch (e) {
//     console.error("Error parsing user from localStorage:", e);
//   }

//   const keys = ["userEmail", "email"];
//   for (const key of keys) {
//     const value = localStorage.getItem(key);
//     if (value) {
//       return value;
//     }
//   }
//   return "";
// };

// // API Base URL
// const API_BASE_URL = "https://inyumbaproject.eu1.hubfly.app";

// // Chart Colors
// const COLORS = ["#FF385C", "#4F46E5", "#22C55E", "#F59E0B", "#8B5CF6"];

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
//   paymentMethod: string;
//   momoNumber: string;
//   paymentStatus: string;
//   status: string;
//   notes: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface DashboardStats {
//   totalBookings: number;
//   activeBookings: number;
//   completedBookings: number;
//   cancelledBookings: number;
//   totalSpent: number;
//   averageRating: number;
// }

// interface BookingDataPoint {
//   month: string;
//   bookings: number;
//   spent: number;
// }

// export const UserDashboard: React.FC = () => {
//   // Get language from cookies
//   const [lang, setLang] = useState<'en' | 'fr' | 'rw'>(getLanguageFromCookies());
//   const [user, setUser] = useState<any>(getUserFromStorage());
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);

//   // Booking data
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [stats, setStats] = useState<DashboardStats>({
//     totalBookings: 0,
//     activeBookings: 0,
//     completedBookings: 0,
//     cancelledBookings: 0,
//     totalSpent: 0,
//     averageRating: 4.8,
//   });

//   // Chart data
//   const [bookingData, setBookingData] = useState<BookingDataPoint[]>([]);
//   const [bookingDistributionData, setBookingDistributionData] = useState<{ name: string; value: number }[]>([]);

//   // Profile edit state
//   const [isEditing, setIsEditing] = useState(false);
//   const [editForm, setEditForm] = useState({
//     name: user?.name || "",
//     email: user?.email || "",
//     phone: user?.phone || "",
//     university: user?.university || "",
//     location: user?.location || "",
//   });
//   const [isSaving, setIsSaving] = useState(false);

//   const t = translations[lang];

//   // Fetch bookings from API
//   const fetchBookings = async () => {
//     setFetching(true);
//     try {
//       const userEmail = getUserEmailFromStorage();

//       if (!userEmail) {
//         toast.error(`❌ ${t.noUserEmail}`);
//         setFetching(false);
//         return;
//       }

//       const response = await fetch(`${API_BASE_URL}/bookings/email/${encodeURIComponent(userEmail)}`);

//       if (!response.ok) {
//         if (response.status === 404) {
//           setBookings([]);
//           setFetching(false);
//           return;
//         }
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();

//       let bookingsData: Booking[] = [];
//       if (Array.isArray(data)) {
//         bookingsData = data;
//       } else if (data && typeof data === 'object') {
//         if (data._id) {
//           bookingsData = [data];
//         } else if (data.data && Array.isArray(data.data)) {
//           bookingsData = data.data;
//         } else if (data.bookings && Array.isArray(data.bookings)) {
//           bookingsData = data.bookings;
//         } else {
//           const possibleArrays = Object.values(data).filter(val => Array.isArray(val));
//           if (possibleArrays.length > 0) {
//             bookingsData = possibleArrays[0];
//           }
//         }
//       }

//       setBookings(bookingsData);
//       processBookingData(bookingsData);
//     } catch (error) {
//       console.error("Error fetching bookings:", error);
//       toast.error(`❌ ${t.fetchError}`);
//     } finally {
//       setFetching(false);
//     }
//   };

//   // Process booking data for stats and charts
//   const processBookingData = (bookingsData: Booking[]) => {
//     // Calculate stats
//     const total = bookingsData.length;
//     const active = bookingsData.filter(b => b.status === 'confirmed').length;
//     const completed = bookingsData.filter(b => b.status === 'completed').length;
//     const cancelled = bookingsData.filter(b => b.status === 'cancelled').length;
//     const totalSpent = bookingsData.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

//     setStats({
//       totalBookings: total,
//       activeBookings: active,
//       completedBookings: completed,
//       cancelledBookings: cancelled,
//       totalSpent: totalSpent,
//       averageRating: 4.8, // Default since we don't have ratings
//     });

//     // Process monthly data for charts
//     const monthlyMap: { [key: string]: { bookings: number; spent: number } } = {};
//     const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//     bookingsData.forEach(booking => {
//       const date = new Date(booking.createdAt);
//       const monthName = months[date.getMonth()];
//       if (!monthlyMap[monthName]) {
//         monthlyMap[monthName] = { bookings: 0, spent: 0 };
//       }
//       monthlyMap[monthName].bookings += 1;
//       monthlyMap[monthName].spent += booking.totalAmount || 0;
//     });

//     const chartData = months.map(month => ({
//       month,
//       bookings: monthlyMap[month]?.bookings || 0,
//       spent: monthlyMap[month]?.spent || 0,
//     }));
//     setBookingData(chartData);

//     // Process distribution data
//     const distribution = [
//       { name: 'Active', value: active },
//       { name: 'Completed', value: completed },
//       { name: 'Cancelled', value: cancelled },
//     ].filter(item => item.value > 0);

//     setBookingDistributionData(distribution.length > 0 ? distribution : [{ name: 'No Data', value: 1 }]);
//   };

//   // Listen for language changes in cookies
//   useEffect(() => {
//     const handleCookieChange = () => {
//       const newLang = getLanguageFromCookies();
//       if (newLang !== lang) {
//         setLang(newLang);
//       }
//     };

//     const interval = setInterval(handleCookieChange, 1000);
//     return () => clearInterval(interval);
//   }, [lang]);

//   // Initial fetch
//   useEffect(() => {
//     fetchBookings();
//   }, []);

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
//       university: user?.university || "",
//       location: user?.location || "",
//     });
//   };

//   const handleSaveProfile = async () => {
//     setIsSaving(true);
//     try {
//       const updatedUser = { ...user, ...editForm };
//       localStorage.setItem('user', JSON.stringify(updatedUser));
//       setUser(updatedUser);
//       toast.success(`✅ ${t.profileUpdated}`);
//       setIsEditing(false);
//     } catch (error) {
//       toast.error(`❌ ${t.profileUpdateFailed}`);
//       console.error("Profile update error:", error);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleRefresh = () => {
//     setLoading(true);
//     toast.info("Refreshing dashboard...");
//     fetchBookings();
//     setTimeout(() => {
//       setLoading(false);
//       toast.success("Dashboard refreshed!");
//     }, 500);
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "pending": return "bg-yellow-100 text-yellow-800";
//       case "confirmed": return "bg-blue-100 text-blue-800";
//       case "completed": return "bg-green-100 text-green-800";
//       case "cancelled": return "bg-red-100 text-red-800";
//       case "rejected": return "bg-gray-100 text-gray-800";
//       default: return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getStatusLabel = (status: string) => {
//     switch (status) {
//       case "pending": return t.pending;
//       case "confirmed": return t.confirmed;
//       case "completed": return t.completed;
//       case "cancelled": return t.cancelled;
//       case "rejected": return t.rejected;
//       default: return status;
//     }
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

//   // Get recent bookings (last 5)
//   const recentBookings = bookings
//     .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
//     .slice(0, 5);

//   // Stat cards
//   const statCards = [
//     {
//       title: t.totalBookings,
//       value: stats.totalBookings,
//       icon: <BookingIcon />,
//       color: "bg-blue-500",
//       change: stats.totalBookings > 0 ? "+" + Math.round((stats.totalBookings / 12) * 100) + "%" : "0%",
//     },
//     {
//       title: t.activeBookings,
//       value: stats.activeBookings,
//       icon: <CheckCircleIcon />,
//       color: "bg-green-500",
//       change: stats.activeBookings > 0 ? "+" + Math.round((stats.activeBookings / 12) * 100) + "%" : "0%",
//     },
//     {
//       title: t.totalSpent,
//       value: formatCurrency(stats.totalSpent),
//       icon: <PaymentsIcon />,
//       color: "bg-purple-500",
//       change: stats.totalSpent > 0 ? "+18%" : "0%",
//     },
//     {
//       title: t.averageRating,
//       value: `${stats.averageRating}/5`,
//       icon: <StarIcon />,
//       color: "bg-yellow-500",
//       change: "-2%",
//     },
//   ];

//   if (fetching) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-[#FF385C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
//                     {t.userDashboard}
//                   </h1>
//                   <p className="text-sm text-gray-500">
//                     {t.welcome}, {user?.name || "Guest"}!
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
//                 <RefreshIcon className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
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
//                 {user?.name?.charAt(0).toUpperCase() || "U"}
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold text-gray-900">
//                   {isEditing ? (
//                     <input
//                       type="text"
//                       value={editForm.name}
//                       onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
//                       className="border border-gray-300 rounded-lg px-2 py-1 text-xl font-bold"
//                     />
//                   ) : (
//                     user?.name || "User"
//                   )}
//                 </h2>
//                 <div className="flex items-center gap-2 text-sm text-gray-500">
//                   <EmailIcon className="w-4 h-4" />
//                   <span>{user?.email || "user@example.com"}</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-gray-500">
//                   <PhoneIcon className="w-4 h-4" />
//                   <span>{user?.phone || "Not provided"}</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-gray-500">
//                   <SchoolIcon className="w-4 h-4" />
//                   <span>{user?.university || "Not provided"}</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-gray-500">
//                   <LocationOnIcon className="w-4 h-4" />
//                   <span>{user?.location || "Not provided"}</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
//                   <VerifiedIcon className="w-4 h-4 text-green-500" />
//                   <span className="text-green-600 font-medium">Verified Student</span>
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
//                   onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
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
//                   onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   University
//                 </label>
//                 <input
//                   type="text"
//                   value={editForm.university}
//                   onChange={(e) => setEditForm({ ...editForm, university: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Location
//                 </label>
//                 <input
//                   type="text"
//                   value={editForm.location}
//                   onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
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
//                 <div className="flex items-center gap-1 text-sm font-medium text-green-500">
//                   <TrendingUpIcon className="w-3 h-3" />
//                   {stat.change}
//                 </div>
//               </div>
//               <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//               <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
//             </motion.div>
//           ))}
//         </div>

//         {/* Charts Row 1: Booking Trend & Spending Trend */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//           {/* Booking Trend */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-gray-900">
//                 {t.bookingTrend}
//               </h3>
//               <span className="text-sm text-green-500 font-medium">
//                 {stats.totalBookings > 0 ? "+" + Math.round((stats.totalBookings / 12) * 100) + "%" : "0%"}
//               </span>
//             </div>
//             <div className="h-64">
//               {bookingData.some(d => d.bookings > 0) ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={bookingData}>
//                     <defs>
//                       <linearGradient id="bookingGradient" x1="0" y1="0" x2="0" y2="1">
//                         <stop offset="5%" stopColor="#FF385C" stopOpacity={0.3} />
//                         <stop offset="95%" stopColor="#FF385C" stopOpacity={0} />
//                       </linearGradient>
//                     </defs>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
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

//           {/* Spending Trend */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-gray-900">
//                 {t.spendingTrend}
//               </h3>
//               <span className="text-sm text-green-500 font-medium">
//                 {stats.totalSpent > 0 ? "+18%" : "0%"}
//               </span>
//             </div>
//             <div className="h-64">
//               {bookingData.some(d => d.spent > 0) ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={bookingData}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
//                     <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
//                     <YAxis stroke="#6B7280" fontSize={12} tickFormatter={(value) => `RWF ${value/1000}K`} />
//                     <Tooltip
//                       formatter={(value: any) => `RWF ${value.toLocaleString()}`}
//                       contentStyle={{
//                         backgroundColor: "#1F2937",
//                         border: "none",
//                         borderRadius: "8px",
//                         color: "#fff",
//                       }}
//                     />
//                     <Bar dataKey="spent" fill="#4F46E5" radius={[8, 8, 0, 0]} />
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

//         {/* Charts Row 2: Booking Distribution & Monthly Spending */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//           {/* Booking Distribution - Pie Chart */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               {t.bookingDistribution}
//             </h3>
//             <div className="h-64">
//               {bookingDistributionData.some(d => d.value > 0 && d.name !== 'No Data') ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={bookingDistributionData}
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
//                       {bookingDistributionData.map((_entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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

//           {/* Monthly Spending - Line Chart */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-gray-900">
//                 {t.monthlySpending}
//               </h3>
//               <span className="text-sm text-purple-500 font-medium">
//                 {stats.totalSpent > 0 ? "+15%" : "0%"}
//               </span>
//             </div>
//             <div className="h-64">
//               {bookingData.some(d => d.spent > 0) ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={bookingData}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
//                     <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
//                     <YAxis stroke="#6B7280" fontSize={12} tickFormatter={(value) => `RWF ${value/1000}K`} />
//                     <Tooltip
//                       formatter={(value: any) => `RWF ${value.toLocaleString()}`}
//                       contentStyle={{
//                         backgroundColor: "#1F2937",
//                         border: "none",
//                         borderRadius: "8px",
//                         color: "#fff",
//                       }}
//                     />
//                     <Line
//                       type="monotone"
//                       dataKey="spent"
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

//         {/* Recent Bookings */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//           <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
//             <h3 className="text-lg font-semibold text-gray-900">
//               {t.recentBookings}
//             </h3>
//             <button
//               className="text-sm text-[#FF385C] hover:underline flex items-center gap-1"
//               onClick={() => window.location.href = '/user/bookings'}
//             >
//               {t.viewAll}
//               <ArrowForwardIcon className="w-4 h-4" />
//             </button>
//           </div>
//           <div className="divide-y divide-gray-100">
//             {recentBookings.length === 0 ? (
//               <div className="px-6 py-8 text-center text-gray-500">
//                 <BookingIcon className="w-12 h-12 mx-auto text-gray-300 mb-2" />
//                 <p>{t.noBookings}</p>
//               </div>
//             ) : (
//               recentBookings.map((booking) => (
//                 <motion.div
//                   key={booking._id}
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
//                 >
//                   <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#FF385C]/20 to-[#E31C5F]/20 flex items-center justify-center flex-shrink-0">
//                     <BookingIcon className="w-8 h-8 text-[#FF385C]" />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h4 className="text-sm font-semibold text-gray-900">
//                       {booking.houseName || "House"}
//                     </h4>
//                     <p className="text-xs text-gray-500 flex items-center gap-1">
//                       <LocationOnIcon className="w-3 h-3" />
//                       {booking.district || "Location"}, {booking.sector || ""}
//                     </p>
//                     <div className="flex flex-wrap items-center gap-2 mt-1">
//                       <span className="text-xs text-gray-500">
//                         <CalendarTodayIcon className="w-3 h-3 inline mr-0.5" />
//                         {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
//                       </span>
//                       <span className="text-xs text-gray-500">
//                         • {booking.months} months
//                       </span>
//                     </div>
//                   </div>
//                   <div className="text-right flex-shrink-0">
//                     <p className="text-sm font-bold text-[#FF385C]">
//                       {formatCurrency(booking.totalAmount || 0)}
//                     </p>
//                     <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(booking.status)}`}>
//                       {getStatusLabel(booking.status)}
//                     </span>
//                   </div>
//                 </motion.div>
//               ))
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

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

// Material-UI Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookingIcon from "@mui/icons-material/BookOnline";
import PaymentsIcon from "@mui/icons-material/Payments";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SchoolIcon from "@mui/icons-material/School";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VerifiedIcon from "@mui/icons-material/Verified";

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
    userDashboard: "User Dashboard",
    welcome: "Welcome back",
    overview: "Overview",
    myProfile: "My Profile",
    myBookings: "My Bookings",
    myHouses: "My Houses",
    payments: "Payments",
    favorites: "Favorites",
    settings: "Settings",
    logout: "Logout",
    totalBookings: "Total Bookings",
    activeBookings: "Active Bookings",
    completedBookings: "Completed Bookings",
    cancelledBookings: "Cancelled Bookings",
    totalSpent: "Total Spent",
    averageRating: "Average Rating",
    memberSince: "Member Since",
    email: "Email",
    phone: "Phone",
    university: "University",
    location: "Location",
    recentBookings: "Recent Bookings",
    bookingTrend: "Booking Trend",
    spendingTrend: "Spending Trend",
    bookingDistribution: "Booking Distribution",
    monthlySpending: "Monthly Spending",
    noBookings: "No bookings found",
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
    fetchError: "Failed to load dashboard data",
    noUserEmail: "No user email found. Please login again.",
    profileUpdateFailed: "Failed to update profile. Please try again.",
  },
  fr: {
    dashboard: "Tableau de Bord",
    userDashboard: "Tableau de Bord Utilisateur",
    welcome: "Bon retour",
    overview: "Aperçu",
    myProfile: "Mon Profil",
    myBookings: "Mes Réservations",
    myHouses: "Mes Maisons",
    payments: "Paiements",
    favorites: "Favoris",
    settings: "Paramètres",
    logout: "Déconnexion",
    totalBookings: "Total Réservations",
    activeBookings: "Réservations Actives",
    completedBookings: "Réservations Terminées",
    cancelledBookings: "Réservations Annulées",
    totalSpent: "Dépenses Totales",
    averageRating: "Évaluation Moyenne",
    memberSince: "Membre Depuis",
    email: "Email",
    phone: "Téléphone",
    university: "Université",
    location: "Emplacement",
    recentBookings: "Réservations Récentes",
    bookingTrend: "Tendance des Réservations",
    spendingTrend: "Tendance des Dépenses",
    bookingDistribution: "Distribution des Réservations",
    monthlySpending: "Dépenses Mensuelles",
    noBookings: "Aucune réservation trouvée",
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
    fetchError: "Échec du chargement des données du tableau de bord",
    noUserEmail: "Aucun email utilisateur trouvé. Veuillez vous reconnecter.",
    profileUpdateFailed:
      "Échec de la mise à jour du profil. Veuillez réessayer.",
  },
  rw: {
    dashboard: "Ibikorwa",
    userDashboard: "Ibikorwa by'Umukoresha",
    welcome: "Turakwinginze",
    overview: "Aperçu",
    myProfile: "Ibyawe",
    myBookings: "Ibyanditswe",
    myHouses: "Amazu Yanjye",
    payments: "Ubwishyu",
    favorites: "Ibyakiriwe",
    settings: "Igenamiterere",
    logout: "Gusohoka",
    totalBookings: "Ibyanditswe Byose",
    activeBookings: "Ibyanditswe Bigikora",
    completedBookings: "Ibyanditswe Byarangiye",
    cancelledBookings: "Ibyanditswe Byahagaritswe",
    totalSpent: "Amahera Yakoreshejwe",
    averageRating: "Igipimo Rusange",
    memberSince: "Yinjiye Kuva",
    email: "Imeri",
    phone: "Telefone",
    university: "Kaminuza",
    location: "Aho Gihe",
    recentBookings: "Ibyanditswe Vuba",
    bookingTrend: "Imihindagurikire y'Ibyanditswe",
    spendingTrend: "Imihindagurikire y'Amahera",
    bookingDistribution: "Ibyiciro by'Ibyanditswe",
    monthlySpending: "Amahera ku Kwezi",
    noBookings: "Nta byanditswe byabonetse",
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
    fetchError: "Kubura amakuru ya dashboard birananiranye",
    noUserEmail:
      "Nta imeri y'umukoresha yabonetse. Nyamuneka winjire undi munsi.",
    profileUpdateFailed:
      "Kuvugurura ibyawe birananiranye. Gerageza undi munsi.",
  },
};

// Helper function to get language from cookies
const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
  const lang = Cookies.get("language") as "en" | "fr" | "rw";
  return lang || "en";
};

// Helper function to get user from localStorage
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

// Helper function to get user email from localStorage
const getUserEmailFromStorage = (): string => {
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.email) {
        return user.email;
      }
    }
  } catch (e) {
    console.error("Error parsing user from localStorage:", e);
  }

  const keys = ["userEmail", "email"];
  for (const key of keys) {
    const value = localStorage.getItem(key);
    if (value) {
      return value;
    }
  }
  return "";
};

// API Base URL
const API_BASE_URL = "https://inyumbaproject.eu1.hubfly.app";

// Chart Colors
const COLORS = ["#FF385C", "#4F46E5", "#22C55E", "#F59E0B", "#8B5CF6"];

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
  paymentMethod: string;
  momoNumber: string;
  paymentStatus: string;
  status: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

interface DashboardStats {
  totalBookings: number;
  activeBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalSpent: number;
  averageRating: number;
}

interface BookingDataPoint {
  month: string;
  bookings: number;
  spent: number;
}

export const UserDashboard: React.FC = () => {
  // Get language from cookies
  const [lang, setLang] = useState<"en" | "fr" | "rw">(
    getLanguageFromCookies(),
  );
  const [user, setUser] = useState<any>(getUserFromStorage());
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Booking data
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    activeBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
    totalSpent: 0,
    averageRating: 4.8,
  });

  // Chart data
  const [bookingData, setBookingData] = useState<BookingDataPoint[]>([]);
  const [bookingDistributionData, setBookingDistributionData] = useState<
    { name: string; value: number }[]
  >([]);

  // Profile edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    university: user?.university || "",
    location: user?.location || "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const t = translations[lang];

  // Fetch bookings from API
  const fetchBookings = async () => {
    setFetching(true);
    try {
      const userEmail = getUserEmailFromStorage();

      if (!userEmail) {
        toast.error(`❌ ${t.noUserEmail}`);
        setFetching(false);
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/bookings/email/${encodeURIComponent(userEmail)}`,
      );

      if (!response.ok) {
        if (response.status === 404) {
          setBookings([]);
          setFetching(false);
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      let bookingsData: Booking[] = [];
      if (Array.isArray(data)) {
        bookingsData = data;
      } else if (data && typeof data === "object") {
        if (data._id) {
          bookingsData = [data];
        } else if (data.data && Array.isArray(data.data)) {
          bookingsData = data.data;
        } else if (data.bookings && Array.isArray(data.bookings)) {
          bookingsData = data.bookings;
        } else {
          const possibleArrays = Object.values(data).filter((val) =>
            Array.isArray(val),
          );
          if (possibleArrays.length > 0) {
            bookingsData = possibleArrays[0];
          }
        }
      }

      setBookings(bookingsData);
      processBookingData(bookingsData);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error(`❌ ${t.fetchError}`);
    } finally {
      setFetching(false);
    }
  };

  // Process booking data for stats and charts
  const processBookingData = (bookingsData: Booking[]) => {
    // Calculate stats
    const total = bookingsData.length;
    const active = bookingsData.filter((b) => b.status === "confirmed").length;
    const completed = bookingsData.filter(
      (b) => b.status === "completed",
    ).length;
    const cancelled = bookingsData.filter(
      (b) => b.status === "cancelled",
    ).length;

    // Calculate total spent by adding monthlyRent and serviceFee for each booking
    const totalSpent = bookingsData.reduce((sum, b) => {
      const rent = b.monthlyRent || 0;
      const fee = b.serviceFee || 0;
      return sum + rent + fee;
    }, 0);

    setStats({
      totalBookings: total,
      activeBookings: active,
      completedBookings: completed,
      cancelledBookings: cancelled,
      totalSpent: totalSpent,
      averageRating: 4.8, // Default since we don't have ratings
    });

    // Process monthly data for charts
    const monthlyMap: { [key: string]: { bookings: number; spent: number } } =
      {};
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    bookingsData.forEach((booking) => {
      const date = new Date(booking.createdAt);
      const monthName = months[date.getMonth()];
      if (!monthlyMap[monthName]) {
        monthlyMap[monthName] = { bookings: 0, spent: 0 };
      }
      monthlyMap[monthName].bookings += 1;
      // Calculate spent as monthlyRent + serviceFee
      const rent = booking.monthlyRent || 0;
      const fee = booking.serviceFee || 0;
      monthlyMap[monthName].spent += rent + fee;
    });

    const chartData = months.map((month) => ({
      month,
      bookings: monthlyMap[month]?.bookings || 0,
      spent: monthlyMap[month]?.spent || 0,
    }));
    setBookingData(chartData);

    // Process distribution data
    const distribution = [
      { name: "Active", value: active },
      { name: "Completed", value: completed },
      { name: "Cancelled", value: cancelled },
    ].filter((item) => item.value > 0);

    setBookingDistributionData(
      distribution.length > 0 ? distribution : [{ name: "No Data", value: 1 }],
    );
  };

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

  // Initial fetch
  useEffect(() => {
    fetchBookings();
  }, []);

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
      university: user?.university || "",
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
      toast.error(`❌ ${t.profileUpdateFailed}`);
      console.error("Profile update error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    toast.info("Refreshing dashboard...");
    fetchBookings();
    setTimeout(() => {
      setLoading(false);
      toast.success("Dashboard refreshed!");
    }, 500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "rejected":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return t.pending;
      case "confirmed":
        return t.confirmed;
      case "completed":
        return t.completed;
      case "cancelled":
        return t.cancelled;
      case "rejected":
        return t.rejected;
      default:
        return status;
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

  // Get recent bookings (last 5)
  const recentBookings = bookings
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  // Stat cards
  const statCards = [
    {
      title: t.totalBookings,
      value: stats.totalBookings,
      icon: <BookingIcon />,
      color: "bg-blue-500",
      change:
        stats.totalBookings > 0
          ? "+" + Math.round((stats.totalBookings / 12) * 100) + "%"
          : "0%",
    },
    {
      title: t.activeBookings,
      value: stats.activeBookings,
      icon: <CheckCircleIcon />,
      color: "bg-green-500",
      change:
        stats.activeBookings > 0
          ? "+" + Math.round((stats.activeBookings / 12) * 100) + "%"
          : "0%",
    },
    {
      title: t.totalSpent,
      value: formatCurrency(stats.totalSpent),
      icon: <PaymentsIcon />,
      color: "bg-purple-500",
      change: stats.totalSpent > 0 ? "+18%" : "0%",
    },
    {
      title: t.averageRating,
      value: `${stats.averageRating}/5`,
      icon: <StarIcon />,
      color: "bg-yellow-500",
      change: "-2%",
    },
  ];

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#FF385C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">{t.loading}</p>
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
                    {t.userDashboard}
                  </h1>
                  <p className="text-sm text-gray-500">
                    {t.welcome}, {user?.name || "Guest"}!
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
                {user?.name?.charAt(0).toUpperCase() || "U"}
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
                    user?.name || "User"
                  )}
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <EmailIcon className="w-4 h-4" />
                  <span>{user?.email || "user@example.com"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <PhoneIcon className="w-4 h-4" />
                  <span>{user?.phone || "Not provided"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <SchoolIcon className="w-4 h-4" />
                  <span>{user?.university || "Not provided"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <LocationOnIcon className="w-4 h-4" />
                  <span>{user?.location || "Not provided"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <VerifiedIcon className="w-4 h-4 text-green-500" />
                  <span className="text-green-600 font-medium">
                    Verified Student
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  University
                </label>
                <input
                  type="text"
                  value={editForm.university}
                  onChange={(e) =>
                    setEditForm({ ...editForm, university: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                />
              </div>
              <div>
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

        {/* Charts Row 1: Booking Trend & Spending Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Booking Trend */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {t.bookingTrend}
              </h3>
              <span className="text-sm text-green-500 font-medium">
                {stats.totalBookings > 0
                  ? "+" + Math.round((stats.totalBookings / 12) * 100) + "%"
                  : "0%"}
              </span>
            </div>
            <div className="h-64">
              {bookingData.some((d) => d.bookings > 0) ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={bookingData}>
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

          {/* Spending Trend */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {t.spendingTrend}
              </h3>
              <span className="text-sm text-green-500 font-medium">
                {stats.totalSpent > 0 ? "+18%" : "0%"}
              </span>
            </div>
            <div className="h-64">
              {bookingData.some((d) => d.spent > 0) ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bookingData}>
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
                    <Bar dataKey="spent" fill="#4F46E5" radius={[8, 8, 0, 0]} />
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

        {/* Charts Row 2: Booking Distribution & Monthly Spending */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Booking Distribution - Pie Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t.bookingDistribution}
            </h3>
            <div className="h-64">
              {bookingDistributionData.some(
                (d) => d.value > 0 && d.name !== "No Data",
              ) ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={bookingDistributionData}
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
                      {bookingDistributionData.map((_entry, index) => (
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

          {/* Monthly Spending - Line Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {t.monthlySpending}
              </h3>
              <span className="text-sm text-purple-500 font-medium">
                {stats.totalSpent > 0 ? "+15%" : "0%"}
              </span>
            </div>
            <div className="h-64">
              {bookingData.some((d) => d.spent > 0) ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bookingData}>
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
                      dataKey="spent"
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

        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {t.recentBookings}
            </h3>
            <button
              className="text-sm text-[#FF385C] hover:underline flex items-center gap-1"
              onClick={() => (window.location.href = "/user/bookings")}
            >
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
                  key={booking._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#FF385C]/20 to-[#E31C5F]/20 flex items-center justify-center flex-shrink-0">
                    <BookingIcon className="w-8 h-8 text-[#FF385C]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900">
                      {booking.houseName || "House"}
                    </h4>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <LocationOnIcon className="w-3 h-3" />
                      {booking.district || "Location"}, {booking.sector || ""}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">
                        <CalendarTodayIcon className="w-3 h-3 inline mr-0.5" />
                        {formatDate(booking.checkIn)} -{" "}
                        {formatDate(booking.checkOut)}
                      </span>
                      <span className="text-xs text-gray-500">
                        • {booking.months} months
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-[#FF385C]">
                      {formatCurrency(
                        (booking.monthlyRent || 0) + (booking.serviceFee || 0),
                      )}
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
