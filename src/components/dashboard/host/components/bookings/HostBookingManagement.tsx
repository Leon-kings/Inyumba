// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-hooks/set-state-in-effect */
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Cookies from "js-cookie";
// import axios, { AxiosError } from "axios";

// // Material-UI Icons
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import CloseIcon from "@mui/icons-material/Close";
// import SearchIcon from "@mui/icons-material/Search";
// import RefreshIcon from "@mui/icons-material/Refresh";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import ClearIcon from "@mui/icons-material/Clear";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import CancelIcon from "@mui/icons-material/Cancel";
// import EditIcon from "@mui/icons-material/Edit";
// import PeopleIcon from "@mui/icons-material/People";
// import HomeIcon from "@mui/icons-material/Home";
// import PaymentIcon from "@mui/icons-material/Payment";
// import Send from "@mui/icons-material/Send";
// import PhoneIcon from "@mui/icons-material/Phone";
// import EmailIcon from "@mui/icons-material/Email";
// import PersonIcon from "@mui/icons-material/Person";
// import VerifiedIcon from "@mui/icons-material/Verified";
// import ErrorIcon from "@mui/icons-material/Error";
// import { CheckCircleOutlineOutlined } from "@mui/icons-material";
// import WarningAmberIcon from "@mui/icons-material/WarningAmber";

// // ============================================================
// // TRANSLATION HELPER - Google Translate API
// // ============================================================

// const translateContent = async (
//   text: string,
//   targetLang: string,
// ): Promise<string> => {
//   if (!text || targetLang === "en") return text;
//   if (targetLang === "rw" || targetLang === "fr") {
//     try {
//       const response = await axios.post(
//         `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`,
//       );
//       if (response.data && response.data[0] && response.data[0][0]) {
//         return response.data[0][0][0] || text;
//       }
//       return text;
//     } catch (error) {
//       console.error("Translation error for text:", text, error);
//       return text;
//     }
//   }
//   return text;
// };

// // Types based on the Booking model
// interface PaymentScreenshot {
//   url: string;
//   publicId: string;
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
//   paymentScreenshot: PaymentScreenshot;
//   paymentStatus: "pending" | "verified" | "failed";
//   status: "pending" | "confirmed" | "cancelled" | "completed";
//   notes: string;
//   createdAt: string;
//   updatedAt: string;
// }

// // Extended type for UI purposes
// interface BookingUI extends Booking {
//   statusLabel: string;
//   statusColor: string;
//   paymentStatusLabel: string;
//   paymentStatusColor: string;
//   formattedCheckIn: string;
//   formattedCheckOut: string;
//   formattedTotal: string;
// }

// // Form validation errors interface
// interface FormErrors {
//   status?: string;
//   paymentStatus?: string;
//   notes?: string;
// }

// // Translations
// const translations = {
//   en: {
//     bookingManagement: "Host Booking Management",
//     manageBookings: "Manage bookings for your properties",
//     total: "Total",
//     pending: "Pending",
//     confirmed: "Confirmed",
//     cancelled: "Cancelled",
//     completed: "Completed",
//     searchBookings: "Search by name, email, or booking ID...",
//     allStatus: "All Status",
//     booking: "Booking",
//     guest: "Guest",
//     house: "House",
//     status: "Status",
//     payment: "Payment",
//     checkIn: "Check In",
//     checkOut: "Check Out",
//     totalAmount: "Total Amount",
//     actions: "Actions",
//     noBookings: "No bookings found",
//     adjustFilters: "Try adjusting your search or filters",
//     showing: "Showing",
//     of: "of",
//     bookings: "bookings",
//     viewBooking: "View Booking",
//     editBooking: "Edit Booking",
//     bookingDetails: "Booking Details",
//     guestInformation: "Guest Information",
//     houseInformation: "House Information",
//     bookingInformation: "Booking Information",
//     paymentInformation: "Payment Information",
//     updateStatus: "Update Status",
//     selectStatus: "Select Status",
//     selectPaymentStatus: "Select Payment Status",
//     close: "Close",
//     loading: "Loading...",
//     fetchError: "Failed to load bookings",
//     confirmBooking: "Confirm Booking",
//     confirmConfirmation: "Are you sure you want to confirm this booking?",
//     cancelBooking: "Cancel Booking",
//     cancelConfirmation: "Are you sure you want to cancel this booking?",
//     completedBooking: "Mark as Completed",
//     completedConfirmation:
//       "Are you sure you want to mark this booking as completed?",
//     verified: "Verified",
//     failed: "Failed",
//     paymentStatus: "Payment Status",
//     notes: "Notes",
//     phone: "Phone",
//     email: "Email",
//     idNumber: "ID Number",
//     university: "University",
//     studentId: "Student ID",
//     purpose: "Purpose",
//     houseName: "House Name",
//     houseType: "House Type",
//     location: "Location",
//     owner: "Owner",
//     months: "Months",
//     guests: "Guests",
//     specialRequests: "Special Requests",
//     monthlyRent: "Monthly Rent",
//     serviceFee: "Service Fee",
//     paymentMethod: "Payment Method",
//     momoNumber: "MoMo Number",
//     paymentScreenshot: "Payment Screenshot",
//     viewImage: "View Image",
//     createdAt: "Created At",
//     updatedAt: "Updated At",
//     statuses: {
//       pending: "Pending",
//       confirmed: "Confirmed",
//       cancelled: "Cancelled",
//       completed: "Completed",
//     },
//     paymentStatuses: {
//       pending: "Pending",
//       verified: "Verified",
//       failed: "Failed",
//     },
//     filters: {
//       all: "All Status",
//       pending: "Pending",
//       confirmed: "Confirmed",
//       cancelled: "Cancelled",
//       completed: "Completed",
//     },
//     statusUpdated: "Booking status updated successfully!",
//     statusUpdateFailed: "Failed to update booking status",
//     required: "This field is required",
//     validationError: "Please fix all validation errors",
//     cancel: "Cancel",
//     save: "Save",
//     saving: "Saving...",
//     verifyPayment: "Verify Payment",
//     verifyPaymentConfirmation: "Are you sure you want to verify this payment?",
//     paymentVerified: "Payment verified successfully!",
//     paymentVerificationFailed: "Failed to verify payment",
//     noHostBookings: "No bookings found for your properties",
//     success: "Success",
//     confirmation: "Confirmation",
//     confirm: "Confirm",
//   },
//   fr: {
//     bookingManagement: "Gestion des Réservations de l'Hôte",
//     manageBookings: "Gérer les réservations de vos propriétés",
//     total: "Total",
//     pending: "En Attente",
//     confirmed: "Confirmé",
//     cancelled: "Annulé",
//     completed: "Terminé",
//     searchBookings: "Rechercher par nom, email ou ID de réservation...",
//     allStatus: "Tous les Statuts",
//     booking: "Réservation",
//     guest: "Invité",
//     house: "Logement",
//     status: "Statut",
//     payment: "Paiement",
//     checkIn: "Arrivée",
//     checkOut: "Départ",
//     totalAmount: "Montant Total",
//     actions: "Actions",
//     noBookings: "Aucune réservation trouvée",
//     adjustFilters: "Essayez d'ajuster votre recherche ou vos filtres",
//     showing: "Affichage",
//     of: "de",
//     bookings: "réservations",
//     viewBooking: "Voir la Réservation",
//     editBooking: "Modifier la Réservation",
//     bookingDetails: "Détails de la Réservation",
//     guestInformation: "Informations de l'Invité",
//     houseInformation: "Informations du Logement",
//     bookingInformation: "Informations de Réservation",
//     paymentInformation: "Informations de Paiement",
//     updateStatus: "Mettre à Jour le Statut",
//     selectStatus: "Sélectionner le Statut",
//     selectPaymentStatus: "Sélectionner le Statut de Paiement",
//     close: "Fermer",
//     loading: "Chargement...",
//     fetchError: "Échec du chargement des réservations",
//     confirmBooking: "Confirmer la Réservation",
//     confirmConfirmation:
//       "Êtes-vous sûr de vouloir confirmer cette réservation ?",
//     cancelBooking: "Annuler la Réservation",
//     cancelConfirmation: "Êtes-vous sûr de vouloir annuler cette réservation ?",
//     completedBooking: "Marquer comme Terminé",
//     completedConfirmation:
//       "Êtes-vous sûr de vouloir marquer cette réservation comme terminée ?",
//     verified: "Vérifié",
//     failed: "Échoué",
//     paymentStatus: "Statut de Paiement",
//     notes: "Notes",
//     phone: "Téléphone",
//     email: "Email",
//     idNumber: "Numéro d'Identité",
//     university: "Université",
//     studentId: "ID Étudiant",
//     purpose: "Objectif",
//     houseName: "Nom du Logement",
//     houseType: "Type de Logement",
//     location: "Emplacement",
//     owner: "Propriétaire",
//     months: "Mois",
//     guests: "Invités",
//     specialRequests: "Demandes Spéciales",
//     monthlyRent: "Loyer Mensuel",
//     serviceFee: "Frais de Service",
//     paymentMethod: "Méthode de Paiement",
//     momoNumber: "Numéro MoMo",
//     paymentScreenshot: "Capture d'Écran de Paiement",
//     viewImage: "Voir l'Image",
//     createdAt: "Créé le",
//     updatedAt: "Mis à jour le",
//     statuses: {
//       pending: "En Attente",
//       confirmed: "Confirmé",
//       cancelled: "Annulé",
//       completed: "Terminé",
//     },
//     paymentStatuses: {
//       pending: "En Attente",
//       verified: "Vérifié",
//       failed: "Échoué",
//     },
//     filters: {
//       all: "Tous les Statuts",
//       pending: "En Attente",
//       confirmed: "Confirmé",
//       cancelled: "Annulé",
//       completed: "Terminé",
//     },
//     statusUpdated: "Statut de la réservation mis à jour avec succès !",
//     statusUpdateFailed: "Échec de la mise à jour du statut",
//     required: "Ce champ est requis",
//     validationError: "Veuillez corriger toutes les erreurs de validation",
//     cancel: "Annuler",
//     save: "Enregistrer",
//     saving: "Enregistrement...",
//     verifyPayment: "Vérifier le Paiement",
//     verifyPaymentConfirmation:
//       "Êtes-vous sûr de vouloir vérifier ce paiement ?",
//     paymentVerified: "Paiement vérifié avec succès !",
//     paymentVerificationFailed: "Échec de la vérification du paiement",
//     noHostBookings: "Aucune réservation trouvée pour vos propriétés",
//     success: "Succès",
//     confirmation: "Confirmation",
//     confirm: "Confirmer",
//   },
//   rw: {
//     bookingManagement: "Gucunga Ibyanditswe by'Umutambyi",
//     manageBookings: "Gucunga ibyanditswe by'amazu yawe",
//     total: "Yose",
//     pending: "Bitegereje",
//     confirmed: "Byemejwe",
//     cancelled: "Byahagaritswe",
//     completed: "Byarangiye",
//     searchBookings:
//       "Shakisha ukurikije izina, imeri cyangwa ID y'icyanditswe...",
//     allStatus: "Ihagaze Ryose",
//     booking: "Icyanditswe",
//     guest: "Umushyitsi",
//     house: "Inzu",
//     status: "Ihagaze",
//     payment: "Amahoro",
//     checkIn: "Kwinjira",
//     checkOut: "Kuvamo",
//     totalAmount: "Amahera Yose",
//     actions: "Ibikorwa",
//     noBookings: "Nta cyanditswe cyabonetse",
//     adjustFilters: "Gerageza guhindura uburyo ushakisha cyangwa amatungo",
//     showing: "Bereka",
//     of: "muri",
//     bookings: "ibyanditswe",
//     viewBooking: "Reba Icyanditswe",
//     editBooking: "Hindura Icyanditswe",
//     bookingDetails: "Ibisobanuro by'Icyanditswe",
//     guestInformation: "Amakuru y'Umushyitsi",
//     houseInformation: "Amakuru y'Inzu",
//     bookingInformation: "Amakuru y'Icyanditswe",
//     paymentInformation: "Amakuru y'Amahoro",
//     updateStatus: "Vugurura Ihagaze",
//     selectStatus: "Hitamo Ihagaze",
//     selectPaymentStatus: "Hitamo Ihagaze ry'Amahoro",
//     close: "Funga",
//     loading: "Birakoreshwa...",
//     fetchError: "Kubura ibyanditswe birananiranye",
//     confirmBooking: "Emeza Icyanditswe",
//     confirmConfirmation: "Uri kwizera ko ushaka kwemeza iki cyanditswe?",
//     cancelBooking: "Hagarika Icyanditswe",
//     cancelConfirmation: "Uri kwizera ko ushaka guhagarika iki cyanditswe?",
//     completedBooking: "Shyira ku Rangiye",
//     completedConfirmation:
//       "Uri kwizera ko ushaka gushyira iki cyanditswe ku rangiye?",
//     verified: "Byagenzuwe",
//     failed: "Byananiwe",
//     paymentStatus: "Ihagaze ry'Amahoro",
//     notes: "Inyandiko",
//     phone: "Telefone",
//     email: "Imeri",
//     idNumber: "Numero y'Indangamuntu",
//     university: "Kaminuza",
//     studentId: "ID y'Umunyeshuri",
//     purpose: "Intego",
//     houseName: "Izina ry'Inzu",
//     houseType: "Ubwoko bw'Inzu",
//     location: "Ahantu",
//     owner: "Nyir'inzu",
//     months: "Amezi",
//     guests: "Abashyitsi",
//     specialRequests: "Ibisabwa Bidasanzwe",
//     monthlyRent: "Isaru y'Ukwezi",
//     serviceFee: "Amahoro ya Serivisi",
//     paymentMethod: "Uburyo bwo Kwishyura",
//     momoNumber: "Numero ya MoMo",
//     paymentScreenshot: "Ifoto y'Ubuhisha",
//     viewImage: "Reba Ifoto",
//     createdAt: "Byakozwe",
//     updatedAt: "Byavuguruwe",
//     statuses: {
//       pending: "Bitegereje",
//       confirmed: "Byemejwe",
//       cancelled: "Byahagaritswe",
//       completed: "Byarangiye",
//     },
//     paymentStatuses: {
//       pending: "Bitegereje",
//       verified: "Byagenzuwe",
//       failed: "Byananiwe",
//     },
//     filters: {
//       all: "Ihagaze Ryose",
//       pending: "Bitegereje",
//       confirmed: "Byemejwe",
//       cancelled: "Byahagaritswe",
//       completed: "Byarangiye",
//     },
//     statusUpdated: "Ihagaze ry'icyanditswe ryavuguruwe neza!",
//     statusUpdateFailed: "Kuvugurura ihagaze birananiranye",
//     required: "Iki gikurikira kirakenewe",
//     validationError: "Kosora amakosa yose yo kwemeza",
//     cancel: "Reka",
//     save: "Bika",
//     saving: "Birabikwa...",
//     verifyPayment: "Kemeza Amahoro",
//     verifyPaymentConfirmation: "Uri kwizera ko ushaka kwemeza aya mahoro?",
//     paymentVerified: "Amahoro yemejwe neza!",
//     paymentVerificationFailed: "Kwemeza amahoro byananiranye",
//     noHostBookings: "Nta cyanditswe cyabonetse ku mazu yawe",
//     success: "Byagenze Neza",
//     confirmation: "Kwemeza",
//     confirm: "Emeza",
//   },
// };

// // Helper function to get language from cookies
// const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
//   const lang = Cookies.get("language") as "en" | "fr" | "rw";
//   return lang || "en";
// };

// // Helper function to get user email from localStorage
// const getUserEmail = (): string => {
//   try {
//     const userStr = localStorage.getItem("user");
//     if (userStr) {
//       const user = JSON.parse(userStr);
//       return user.email || "";
//     }
//     return "";
//   } catch (error) {
//     console.error("Error reading user email from localStorage:", error);
//     return "";
//   }
// };

// // Helper function to get token from localStorage
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

// // Axios instance with interceptors
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Add request interceptor for authentication
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

// // Helper function to transform booking to UI format
// const transformBookingToUI = (booking: Booking): BookingUI => {
//   const statusColors: Record<string, string> = {
//     pending: "bg-yellow-100 text-yellow-800",
//     confirmed: "bg-green-100 text-green-800",
//     cancelled: "bg-red-100 text-red-800",
//     completed: "bg-blue-100 text-blue-800",
//   };

//   const statusLabels: Record<string, string> = {
//     pending: "Pending",
//     confirmed: "Confirmed",
//     cancelled: "Cancelled",
//     completed: "Completed",
//   };

//   const paymentStatusColors: Record<string, string> = {
//     pending: "bg-yellow-100 text-yellow-800",
//     verified: "bg-green-100 text-green-800",
//     failed: "bg-red-100 text-red-800",
//   };

//   const paymentStatusLabels: Record<string, string> = {
//     pending: "Pending",
//     verified: "Verified",
//     failed: "Failed",
//   };

//   const formatDate = (dateString: string): string => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   return {
//     ...booking,
//     statusLabel: statusLabels[booking.status] || booking.status,
//     statusColor: statusColors[booking.status] || "bg-gray-100 text-gray-800",
//     paymentStatusLabel:
//       paymentStatusLabels[booking.paymentStatus] || booking.paymentStatus,
//     paymentStatusColor:
//       paymentStatusColors[booking.paymentStatus] || "bg-gray-100 text-gray-800",
//     formattedCheckIn: formatDate(booking.checkIn),
//     formattedCheckOut: formatDate(booking.checkOut),
//     formattedTotal: `RWF ${booking.totalAmount.toLocaleString()}`,
//   };
// };

// export const HostBookingManagement: React.FC = () => {
//   // Get language from cookies
//   const [lang, setLang] = useState<"en" | "fr" | "rw">(
//     getLanguageFromCookies(),
//   );
//   const [bookings, setBookings] = useState<BookingUI[]>([]);
//   const [filteredBookings, setFilteredBookings] = useState<BookingUI[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState<string>("all");
//   const [isFetching, setIsFetching] = useState(true);

//   // Modal states
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState<BookingUI | null>(
//     null,
//   );

//   // Confirmation Modal states
//   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
//   const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
//   const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
//   const [isVerifyPaymentModalOpen, setIsVerifyPaymentModalOpen] =
//     useState(false);

//   // Status Modal states (Success/Failure)
//   const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
//   const [statusModalData, setStatusModalData] = useState<{
//     type: "success" | "error";
//     title: string;
//     message: string;
//     details?: string;
//   }>({
//     type: "success",
//     title: "",
//     message: "",
//     details: "",
//   });

//   // Edit form state
//   const [editFormData, setEditFormData] = useState<Partial<Booking>>({
//     status: "pending",
//     paymentStatus: "pending",
//     notes: "",
//   });

//   const [formErrors, setFormErrors] = useState<FormErrors>({});
//   const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

//   // Loading states
//   const [isLoading] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Statistics
//   const [stats, setStats] = useState({
//     total: 0,
//     pending: 0,
//     confirmed: 0,
//     cancelled: 0,
//     completed: 0,
//   });

//   const t = translations[lang];

//   // Show status modal
//   const showStatusModal = (
//     type: "success" | "error",
//     title: string,
//     message: string,
//     details?: string,
//   ) => {
//     setStatusModalData({ type, title, message, details });
//     setIsStatusModalOpen(true);
//   };

//   // Fetch bookings by email from API with translation
//   // const fetchBookings = async () => {
//   //   const email = getUserEmail();

//   //   if (!email) {
//   //     console.warn("⚠️ No email found in localStorage");
//   //     toast.warning("Please login to view bookings");
//   //     setIsFetching(false);
//   //     return;
//   //   }

//   //   setIsFetching(true);
//   //   try {
//   //     const response = await api.get(`/bookings/${email}`);

//   //     let bookingsData: Booking[] = [];
//   //     const result = response.data;

//   //     if (result.success && Array.isArray(result.data)) {
//   //       bookingsData = result.data;
//   //     } else if (Array.isArray(result)) {
//   //       bookingsData = result;
//   //     } else if (result.data && Array.isArray(result.data)) {
//   //       bookingsData = result.data;
//   //     } else if (result.bookings && Array.isArray(result.bookings)) {
//   //       bookingsData = result.bookings;
//   //     }

//   //     // Translate booking data if language is not English
//   //     let processedBookings = bookingsData;
//   //     if (lang !== 'en') {
//   //       console.log(`Translating ${bookingsData.length} bookings to ${lang}...`);
//   //       const translatedBookings = [];
//   //       for (const booking of bookingsData) {
//   //         try {
//   //           const translatedBooking = {
//   //             ...booking,
//   //             fullName: await translateContent(booking.fullName, lang),
//   //             email: await translateContent(booking.email, lang),
//   //             university: await translateContent(booking.university, lang),
//   //             purpose: await translateContent(booking.purpose, lang),
//   //             houseName: await translateContent(booking.houseName, lang),
//   //             houseType: await translateContent(booking.houseType, lang),
//   //             district: await translateContent(booking.district, lang),
//   //             sector: await translateContent(booking.sector, lang),
//   //             cell: await translateContent(booking.cell, lang),
//   //             village: await translateContent(booking.village, lang),
//   //             ownerName: await translateContent(booking.ownerName, lang),
//   //             specialRequests: await translateContent(booking.specialRequests, lang),
//   //             notes: await translateContent(booking.notes, lang),
//   //             // paymentMethod is NOT translated - it's a system value
//   //           };
//   //           translatedBookings.push(translatedBooking);
//   //         } catch (err) {
//   //           console.error('Error translating booking:', booking._id, err);
//   //           translatedBookings.push(booking);
//   //         }
//   //       }
//   //       processedBookings = translatedBookings;
//   //       console.log('Translated bookings count:', processedBookings.length);
//   //     }

//   //     const transformedBookings = processedBookings.map((booking: Booking) =>
//   //       transformBookingToUI(booking),
//   //     );
//   //     setBookings(transformedBookings);
//   //     setFilteredBookings(transformedBookings);

//   //     if (transformedBookings.length === 0) {
//   //       showStatusModal(
//   //         "error",
//   //         t.noHostBookings,
//   //         "No bookings found for your properties",
//   //       );
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching bookings:", error);
//   //     const axiosError = error as AxiosError;

//   //     // Check if it's a 404 error (route doesn't exist)
//   //     if (axiosError.response?.status === 404) {
//   //       // Try alternative endpoint - fetch all bookings and filter
//   //       try {
//   //         const allResponse = await api.get("/bookings");
//   //         let allBookingsData: Booking[] = [];
//   //         const allResult = allResponse.data;

//   //         if (allResult.success && Array.isArray(allResult.data)) {
//   //           allBookingsData = allResult.data;
//   //         } else if (Array.isArray(allResult)) {
//   //           allBookingsData = allResult;
//   //         } else if (allResult.data && Array.isArray(allResult.data)) {
//   //           allBookingsData = allResult.data;
//   //         } else if (allResult.bookings && Array.isArray(allResult.bookings)) {
//   //           allBookingsData = allResult.bookings;
//   //         }

//   //         // Filter bookings by owner email (host)
//   //         const hostEmail = getUserEmail();
//   //         const hostBookings = allBookingsData.filter(
//   //           (booking) => booking.ownerEmail === hostEmail,
//   //         );

//   //         // Translate bookings
//   //         let processedHostBookings = hostBookings;
//   //         if (lang !== 'en') {
//   //           const translatedBookings = [];
//   //           for (const booking of hostBookings) {
//   //             try {
//   //               const translatedBooking = {
//   //                 ...booking,
//   //                 fullName: await translateContent(booking.fullName, lang),
//   //                 email: await translateContent(booking.email, lang),
//   //                 university: await translateContent(booking.university, lang),
//   //                 purpose: await translateContent(booking.purpose, lang),
//   //                 houseName: await translateContent(booking.houseName, lang),
//   //                 houseType: await translateContent(booking.houseType, lang),
//   //                 district: await translateContent(booking.district, lang),
//   //                 sector: await translateContent(booking.sector, lang),
//   //                 cell: await translateContent(booking.cell, lang),
//   //                 village: await translateContent(booking.village, lang),
//   //                 ownerName: await translateContent(booking.ownerName, lang),
//   //                 specialRequests: await translateContent(booking.specialRequests, lang),
//   //                 notes: await translateContent(booking.notes, lang),
//   //                 // paymentMethod is NOT translated - it's a system value
//   //               };
//   //               translatedBookings.push(translatedBooking);
//   //             } catch (err) {
//   //               console.error('Error translating booking:', booking._id, err);
//   //               translatedBookings.push(booking);
//   //             }
//   //           }
//   //           processedHostBookings = translatedBookings;
//   //         }

//   //         const transformedBookings = processedHostBookings.map((booking: Booking) =>
//   //           transformBookingToUI(booking),
//   //         );
//   //         setBookings(transformedBookings);
//   //         setFilteredBookings(transformedBookings);

//   //         if (transformedBookings.length === 0) {
//   //           showStatusModal(
//   //             "error",
//   //             t.noHostBookings,
//   //             "No bookings found for your properties",
//   //           );
//   //         }
//   //       } catch (fallbackError) {
//   //         console.error("❌ Fallback fetch also failed:", fallbackError);
//   //         showStatusModal("error", t.fetchError, "Failed to load bookings");
//   //       }
//   //     } else {
//   //       showStatusModal("error", t.fetchError, "Failed to load bookings");
//   //     }
//   //   } finally {
//   //     setIsFetching(false);
//   //   }
//   // };

//   // Fetch bookings by email from API with translation
//   const fetchBookings = async () => {
//     const email = getUserEmail();

//     if (!email) {
//       console.warn("⚠️ No email found in localStorage");
//       toast.warning("Please login to view bookings");
//       setIsFetching(false);
//       return;
//     }

//     setIsFetching(true);
//     try {
//       const response = await api.get(`/bookings/${email}`);

//       let bookingsData: Booking[] = [];
//       const result = response.data;

//       if (result.success && Array.isArray(result.data)) {
//         bookingsData = result.data;
//       } else if (Array.isArray(result)) {
//         bookingsData = result;
//       } else if (result.data && Array.isArray(result.data)) {
//         bookingsData = result.data;
//       } else if (result.bookings && Array.isArray(result.bookings)) {
//         bookingsData = result.bookings;
//       }

//       // **FILTER: Only show bookings with verified payment status**
//       bookingsData = bookingsData.filter(
//         (booking) => booking.paymentStatus === "verified",
//       );

//       // Translate booking data if language is not English
//       let processedBookings = bookingsData;
//       if (lang !== "en") {
//         console.log(
//           `Translating ${bookingsData.length} bookings to ${lang}...`,
//         );
//         const translatedBookings = [];
//         for (const booking of bookingsData) {
//           try {
//             const translatedBooking = {
//               ...booking,
//               fullName: await translateContent(booking.fullName, lang),
//               email: await translateContent(booking.email, lang),
//               university: await translateContent(booking.university, lang),
//               purpose: await translateContent(booking.purpose, lang),
//               houseName: await translateContent(booking.houseName, lang),
//               houseType: await translateContent(booking.houseType, lang),
//               district: await translateContent(booking.district, lang),
//               sector: await translateContent(booking.sector, lang),
//               cell: await translateContent(booking.cell, lang),
//               village: await translateContent(booking.village, lang),
//               ownerName: await translateContent(booking.ownerName, lang),
//               specialRequests: await translateContent(
//                 booking.specialRequests,
//                 lang,
//               ),
//               notes: await translateContent(booking.notes, lang),
//             };
//             translatedBookings.push(translatedBooking);
//           } catch (err) {
//             console.error("Error translating booking:", booking._id, err);
//             translatedBookings.push(booking);
//           }
//         }
//         processedBookings = translatedBookings;
//         console.log("Translated bookings count:", processedBookings.length);
//       }

//       const transformedBookings = processedBookings.map((booking: Booking) =>
//         transformBookingToUI(booking),
//       );
//       setBookings(transformedBookings);
//       setFilteredBookings(transformedBookings);

//       if (transformedBookings.length === 0) {
//         showStatusModal(
//           "error",
//           "No Verified Payments",
//           "You don't have any bookings with verified payment status.",
//         );
//       }
//     } catch (error) {
//       console.error("Error fetching bookings:", error);
//       const axiosError = error as AxiosError;

//       // Check if it's a 404 error (route doesn't exist)
//       if (axiosError.response?.status === 404) {
//         // Try alternative endpoint - fetch all bookings and filter
//         try {
//           const allResponse = await api.get("/bookings");
//           let allBookingsData: Booking[] = [];
//           const allResult = allResponse.data;

//           if (allResult.success && Array.isArray(allResult.data)) {
//             allBookingsData = allResult.data;
//           } else if (Array.isArray(allResult)) {
//             allBookingsData = allResult;
//           } else if (allResult.data && Array.isArray(allResult.data)) {
//             allBookingsData = allResult.data;
//           } else if (allResult.bookings && Array.isArray(allResult.bookings)) {
//             allBookingsData = allResult.bookings;
//           }

//           // Filter bookings by owner email (host) AND verified payment status
//           const hostEmail = getUserEmail();
//           let hostBookings = allBookingsData.filter(
//             (booking) => booking.ownerEmail === hostEmail,
//           );

//           // **FILTER: Only show bookings with verified payment status**
//           hostBookings = hostBookings.filter(
//             (booking) => booking.paymentStatus === "verified",
//           );

//           // Translate bookings
//           let processedHostBookings = hostBookings;
//           if (lang !== "en") {
//             const translatedBookings = [];
//             for (const booking of hostBookings) {
//               try {
//                 const translatedBooking = {
//                   ...booking,
//                   fullName: await translateContent(booking.fullName, lang),
//                   email: await translateContent(booking.email, lang),
//                   university: await translateContent(booking.university, lang),
//                   purpose: await translateContent(booking.purpose, lang),
//                   houseName: await translateContent(booking.houseName, lang),
//                   houseType: await translateContent(booking.houseType, lang),
//                   district: await translateContent(booking.district, lang),
//                   sector: await translateContent(booking.sector, lang),
//                   cell: await translateContent(booking.cell, lang),
//                   village: await translateContent(booking.village, lang),
//                   ownerName: await translateContent(booking.ownerName, lang),
//                   specialRequests: await translateContent(
//                     booking.specialRequests,
//                     lang,
//                   ),
//                   notes: await translateContent(booking.notes, lang),
//                 };
//                 translatedBookings.push(translatedBooking);
//               } catch (err) {
//                 console.error("Error translating booking:", booking._id, err);
//                 translatedBookings.push(booking);
//               }
//             }
//             processedHostBookings = translatedBookings;
//           }

//           const transformedBookings = processedHostBookings.map(
//             (booking: Booking) => transformBookingToUI(booking),
//           );
//           setBookings(transformedBookings);
//           setFilteredBookings(transformedBookings);

//           if (transformedBookings.length === 0) {
//             showStatusModal(
//               "error",
//               "No Verified Payments",
//               "You don't have any bookings with verified payment status for your properties.",
//             );
//           }
//         } catch (fallbackError) {
//           console.error("❌ Fallback fetch also failed:", fallbackError);
//           showStatusModal("error", t.fetchError, "Failed to load bookings");
//         }
//       } else {
//         showStatusModal("error", t.fetchError, "Failed to load bookings");
//       }
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   // Validate edit form
//   const validateEditForm = (): boolean => {
//     const errors: FormErrors = {};
//     let isValid = true;

//     if (!editFormData.status) {
//       errors.status = t.required;
//       isValid = false;
//     }

//     if (!editFormData.paymentStatus) {
//       errors.paymentStatus = t.required;
//       isValid = false;
//     }

//     setFormErrors(errors);
//     return isValid;
//   };

//   // Handle edit form field changes
//   const handleEditFormChange = (field: keyof Booking, value: any) => {
//     setEditFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));

//     // Mark field as touched
//     setTouchedFields((prev) => new Set(prev).add(field));
//   };

//   // Handle edit form blur
//   const handleEditFormBlur = (field: string) => {
//     setTouchedFields((prev) => new Set(prev).add(field));
//     validateEditForm();
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
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [lang]);

//   // Filter bookings
//   useEffect(() => {
//     let filtered = [...bookings];

//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       filtered = filtered.filter(
//         (booking) =>
//           booking.fullName.toLowerCase().includes(term) ||
//           booking.email.toLowerCase().includes(term) ||
//           booking.bookingId.toLowerCase().includes(term) ||
//           booking.houseName.toLowerCase().includes(term),
//       );
//     }

//     if (filterStatus !== "all") {
//       filtered = filtered.filter((booking) => booking.status === filterStatus);
//     }

//     setFilteredBookings(filtered);
//   }, [bookings, searchTerm, filterStatus]);

//   // Update statistics
//   useEffect(() => {
//     const total = bookings.length;
//     const pending = bookings.filter((b) => b.status === "pending").length;
//     const confirmed = bookings.filter((b) => b.status === "confirmed").length;
//     const cancelled = bookings.filter((b) => b.status === "cancelled").length;
//     const completed = bookings.filter((b) => b.status === "completed").length;

//     setStats({ total, pending, confirmed, cancelled, completed });
//   }, [bookings]);

//   // Get status badge color
//   const getStatusColor = (status: string): string => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-100 text-yellow-800";
//       case "confirmed":
//         return "bg-green-100 text-green-800";
//       case "cancelled":
//         return "bg-red-100 text-red-800";
//       case "completed":
//         return "bg-blue-100 text-blue-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   // Get status label
//   const getStatusLabel = (status: string): string => {
//     switch (status) {
//       case "pending":
//         return t.statuses.pending;
//       case "confirmed":
//         return t.statuses.confirmed;
//       case "cancelled":
//         return t.statuses.cancelled;
//       case "completed":
//         return t.statuses.completed;
//       default:
//         return status;
//     }
//   };

//   // Get payment status color
//   const getPaymentStatusColor = (status: string): string => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-100 text-yellow-800";
//       case "verified":
//         return "bg-green-100 text-green-800";
//       case "failed":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   // Get payment status label
//   const getPaymentStatusLabel = (status: string): string => {
//     switch (status) {
//       case "pending":
//         return t.paymentStatuses.pending;
//       case "verified":
//         return t.paymentStatuses.verified;
//       case "failed":
//         return t.paymentStatuses.failed;
//       default:
//         return status;
//     }
//   };

//   // Format date
//   const formatDate = (dateString: string): string => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   // Format currency
//   const formatCurrency = (amount: number): string => {
//     return `RWF ${amount.toLocaleString()}`;
//   };

//   // Update booking with translation
//   const handleUpdateBooking = async () => {
//     if (!selectedBooking) return;

//     if (!validateEditForm()) {
//       toast.error(`❌ ${t.validationError}`);
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const response = await api.put(
//         `/bookings/${selectedBooking._id}`,
//         editFormData,
//       );
//       let updatedBooking = response.data;

//       // Translate updated booking if needed
//       if (lang !== "en") {
//         try {
//           updatedBooking = {
//             ...updatedBooking,
//             fullName: await translateContent(updatedBooking.fullName, lang),
//             email: await translateContent(updatedBooking.email, lang),
//             university: await translateContent(updatedBooking.university, lang),
//             purpose: await translateContent(updatedBooking.purpose, lang),
//             houseName: await translateContent(updatedBooking.houseName, lang),
//             houseType: await translateContent(updatedBooking.houseType, lang),
//             district: await translateContent(updatedBooking.district, lang),
//             sector: await translateContent(updatedBooking.sector, lang),
//             cell: await translateContent(updatedBooking.cell, lang),
//             village: await translateContent(updatedBooking.village, lang),
//             ownerName: await translateContent(updatedBooking.ownerName, lang),
//             specialRequests: await translateContent(
//               updatedBooking.specialRequests,
//               lang,
//             ),
//             notes: await translateContent(updatedBooking.notes, lang),
//             // paymentMethod is NOT translated
//           };
//         } catch (err) {
//           console.error("Error translating updated booking:", err);
//         }
//       }

//       const transformedBooking = transformBookingToUI(updatedBooking);

//       const updatedBookings = bookings.map((b) =>
//         b._id === selectedBooking._id ? transformedBooking : b,
//       );
//       setBookings(updatedBookings);

//       showStatusModal("success", t.success, t.statusUpdated);
//       setIsEditModalOpen(false);
//       setSelectedBooking(null);
//       setEditFormData({
//         status: "pending",
//         paymentStatus: "pending",
//         notes: "",
//       });
//     } catch (error) {
//       console.error("Update booking error:", error);
//       showStatusModal("error", t.failed, t.statusUpdateFailed);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Confirm booking with translation
//   const handleConfirmBooking = async () => {
//     if (!selectedBooking) return;

//     setIsSubmitting(true);

//     try {
//       const response = await api.put(
//         `/bookings/${selectedBooking._id}/status`,
//         {
//           status: "confirmed",
//         },
//       );

//       let updatedBooking = response.data;

//       // Translate updated booking if needed
//       if (lang !== "en") {
//         try {
//           updatedBooking = {
//             ...updatedBooking,
//             fullName: await translateContent(updatedBooking.fullName, lang),
//             email: await translateContent(updatedBooking.email, lang),
//             university: await translateContent(updatedBooking.university, lang),
//             purpose: await translateContent(updatedBooking.purpose, lang),
//             houseName: await translateContent(updatedBooking.houseName, lang),
//             houseType: await translateContent(updatedBooking.houseType, lang),
//             district: await translateContent(updatedBooking.district, lang),
//             sector: await translateContent(updatedBooking.sector, lang),
//             cell: await translateContent(updatedBooking.cell, lang),
//             village: await translateContent(updatedBooking.village, lang),
//             ownerName: await translateContent(updatedBooking.ownerName, lang),
//             specialRequests: await translateContent(
//               updatedBooking.specialRequests,
//               lang,
//             ),
//             notes: await translateContent(updatedBooking.notes, lang),
//             // paymentMethod is NOT translated
//           };
//         } catch (err) {
//           console.error("Error translating confirmed booking:", err);
//         }
//       }

//       const transformedBooking = transformBookingToUI(updatedBooking);

//       const updatedBookings = bookings.map((b) =>
//         b._id === selectedBooking._id ? transformedBooking : b,
//       );
//       setBookings(updatedBookings);

//       showStatusModal("success", t.success, "Booking confirmed successfully!");
//       setIsConfirmModalOpen(false);
//       setSelectedBooking(null);
//     } catch (error) {
//       console.error("Confirm booking error:", error);
//       showStatusModal("error", t.failed, "Failed to confirm booking");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Cancel booking with translation
//   const handleCancelBooking = async () => {
//     if (!selectedBooking) return;

//     setIsSubmitting(true);

//     try {
//       const response = await api.put(`/bookings/${selectedBooking._id}/cancel`);
//       let updatedBooking = response.data;

//       // Translate updated booking if needed
//       if (lang !== "en") {
//         try {
//           updatedBooking = {
//             ...updatedBooking,
//             fullName: await translateContent(updatedBooking.fullName, lang),
//             email: await translateContent(updatedBooking.email, lang),
//             university: await translateContent(updatedBooking.university, lang),
//             purpose: await translateContent(updatedBooking.purpose, lang),
//             houseName: await translateContent(updatedBooking.houseName, lang),
//             houseType: await translateContent(updatedBooking.houseType, lang),
//             district: await translateContent(updatedBooking.district, lang),
//             sector: await translateContent(updatedBooking.sector, lang),
//             cell: await translateContent(updatedBooking.cell, lang),
//             village: await translateContent(updatedBooking.village, lang),
//             ownerName: await translateContent(updatedBooking.ownerName, lang),
//             specialRequests: await translateContent(
//               updatedBooking.specialRequests,
//               lang,
//             ),
//             notes: await translateContent(updatedBooking.notes, lang),
//             // paymentMethod is NOT translated
//           };
//         } catch (err) {
//           console.error("Error translating cancelled booking:", err);
//         }
//       }

//       const transformedBooking = transformBookingToUI(updatedBooking);

//       const updatedBookings = bookings.map((b) =>
//         b._id === selectedBooking._id ? transformedBooking : b,
//       );
//       setBookings(updatedBookings);

//       showStatusModal("success", t.success, "Booking cancelled successfully!");
//       setIsCancelModalOpen(false);
//       setSelectedBooking(null);
//     } catch (error) {
//       console.error("Cancel booking error:", error);
//       showStatusModal("error", t.failed, "Failed to cancel booking");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Complete booking with translation
//   const handleCompleteBooking = async () => {
//     if (!selectedBooking) return;

//     setIsSubmitting(true);

//     try {
//       const response = await api.put(
//         `/bookings/${selectedBooking._id}/status`,
//         {
//           status: "completed",
//         },
//       );

//       let updatedBooking = response.data;

//       // Translate updated booking if needed
//       if (lang !== "en") {
//         try {
//           updatedBooking = {
//             ...updatedBooking,
//             fullName: await translateContent(updatedBooking.fullName, lang),
//             email: await translateContent(updatedBooking.email, lang),
//             university: await translateContent(updatedBooking.university, lang),
//             purpose: await translateContent(updatedBooking.purpose, lang),
//             houseName: await translateContent(updatedBooking.houseName, lang),
//             houseType: await translateContent(updatedBooking.houseType, lang),
//             district: await translateContent(updatedBooking.district, lang),
//             sector: await translateContent(updatedBooking.sector, lang),
//             cell: await translateContent(updatedBooking.cell, lang),
//             village: await translateContent(updatedBooking.village, lang),
//             ownerName: await translateContent(updatedBooking.ownerName, lang),
//             specialRequests: await translateContent(
//               updatedBooking.specialRequests,
//               lang,
//             ),
//             notes: await translateContent(updatedBooking.notes, lang),
//             // paymentMethod is NOT translated
//           };
//         } catch (err) {
//           console.error("Error translating completed booking:", err);
//         }
//       }

//       const transformedBooking = transformBookingToUI(updatedBooking);

//       const updatedBookings = bookings.map((b) =>
//         b._id === selectedBooking._id ? transformedBooking : b,
//       );
//       setBookings(updatedBookings);

//       showStatusModal("success", t.success, "Booking marked as completed!");
//       setIsCompleteModalOpen(false);
//       setSelectedBooking(null);
//     } catch (error) {
//       console.error("Complete booking error:", error);
//       showStatusModal("error", t.failed, "Failed to complete booking");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Verify payment with translation
//   const handleVerifyPayment = async () => {
//     if (!selectedBooking) return;

//     setIsSubmitting(true);

//     try {
//       const response = await api.put(
//         `/bookings/${selectedBooking._id}/verify-payment`,
//         {
//           paymentStatus: "verified",
//         },
//       );

//       let updatedBooking = response.data;

//       // Translate updated booking if needed
//       if (lang !== "en") {
//         try {
//           updatedBooking = {
//             ...updatedBooking,
//             fullName: await translateContent(updatedBooking.fullName, lang),
//             email: await translateContent(updatedBooking.email, lang),
//             university: await translateContent(updatedBooking.university, lang),
//             purpose: await translateContent(updatedBooking.purpose, lang),
//             houseName: await translateContent(updatedBooking.houseName, lang),
//             houseType: await translateContent(updatedBooking.houseType, lang),
//             district: await translateContent(updatedBooking.district, lang),
//             sector: await translateContent(updatedBooking.sector, lang),
//             cell: await translateContent(updatedBooking.cell, lang),
//             village: await translateContent(updatedBooking.village, lang),
//             ownerName: await translateContent(updatedBooking.ownerName, lang),
//             specialRequests: await translateContent(
//               updatedBooking.specialRequests,
//               lang,
//             ),
//             notes: await translateContent(updatedBooking.notes, lang),
//             // paymentMethod is NOT translated
//           };
//         } catch (err) {
//           console.error("Error translating verified payment booking:", err);
//         }
//       }

//       const transformedBooking = transformBookingToUI(updatedBooking);

//       const updatedBookings = bookings.map((b) =>
//         b._id === selectedBooking._id ? transformedBooking : b,
//       );
//       setBookings(updatedBookings);

//       showStatusModal("success", t.success, t.paymentVerified);
//       setIsVerifyPaymentModalOpen(false);
//       setSelectedBooking(null);
//     } catch (error) {
//       console.error("Verify payment error:", error);
//       showStatusModal("error", t.failed, t.paymentVerificationFailed);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Open modals
//   const openViewModal = (booking: BookingUI) => {
//     setSelectedBooking(booking);
//     setIsViewModalOpen(true);
//   };

//   const openEditModal = (booking: BookingUI) => {
//     setSelectedBooking(booking);
//     setEditFormData({
//       status: booking.status,
//       paymentStatus: booking.paymentStatus,
//       notes: booking.notes || "",
//     });
//     setFormErrors({});
//     setTouchedFields(new Set());
//     setIsEditModalOpen(true);
//   };

//   // Open confirmation modals
//   const openConfirmModal = (booking: BookingUI) => {
//     setSelectedBooking(booking);
//     setIsConfirmModalOpen(true);
//   };

//   const openCancelModal = (booking: BookingUI) => {
//     setSelectedBooking(booking);
//     setIsCancelModalOpen(true);
//   };

//   const openCompleteModal = (booking: BookingUI) => {
//     setSelectedBooking(booking);
//     setIsCompleteModalOpen(true);
//   };

//   const openVerifyPaymentModal = (booking: BookingUI) => {
//     setSelectedBooking(booking);
//     setIsVerifyPaymentModalOpen(true);
//   };

//   // Modal variants
//   const modalVariants = {
//     hidden: { opacity: 0, scale: 0.8, y: 30 },
//     visible: { opacity: 1, scale: 1, y: 0 },
//     exit: { opacity: 0, scale: 0.8, y: 30 },
//   };

//   const overlayVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1 },
//     exit: { opacity: 0 },
//   };

//   // Render Confirmation Modal
//   const renderConfirmationModal = (
//     isOpen: boolean,
//     onClose: () => void,
//     onConfirm: () => void,
//     title: string,
//     message: string,
//     icon: React.ReactNode,
//     confirmColor: string,
//   ) => {
//     return (
//       <AnimatePresence>
//         {isOpen && selectedBooking && (
//           <>
//             <motion.div
//               variants={overlayVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
//               onClick={onClose}
//             />
//             <motion.div
//               variants={modalVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 z-[101] flex items-center justify-center p-4"
//             >
//               <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white relative">
//                 <div className="p-6">
//                   <div className="flex items-center justify-center mb-4">
//                     <div
//                       className={`w-16 h-16 ${confirmColor} rounded-full flex items-center justify-center`}
//                     >
//                       {icon}
//                     </div>
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
//                     {title}
//                   </h3>
//                   <p className="text-gray-500 text-center mb-6">
//                     {message}
//                     <br />
//                     <span className="text-sm text-gray-400">
//                       Booking: {selectedBooking.bookingId}
//                     </span>
//                   </p>
//                   <div className="flex gap-3">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={onClose}
//                       className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
//                     >
//                       {t.cancel}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={onConfirm}
//                       disabled={isSubmitting}
//                       className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors ${
//                         isSubmitting
//                           ? "bg-gray-400 cursor-not-allowed"
//                           : confirmColor
//                               .replace("bg-", "bg-")
//                               .replace("100", "600")
//                               .replace("hover:bg-", "hover:bg-")
//                               .replace("100", "700")
//                       }`}
//                     >
//                       {isSubmitting ? (
//                         <span className="flex items-center justify-center gap-2">
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           {t.loading}
//                         </span>
//                       ) : (
//                         t.confirm
//                       )}
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     );
//   };

//   // Render Status Modal (Success/Failure)
//   const renderStatusModal = () => {
//     const { type, title, message, details } = statusModalData;
//     const isSuccess = type === "success";
//     const iconColor = isSuccess ? "bg-green-100" : "bg-red-100";
//     const icon = isSuccess ? (
//       <CheckCircleOutlineOutlined className="w-8 h-8 text-green-600" />
//     ) : (
//       <WarningAmberIcon className="w-8 h-8 text-red-600" />
//     );

//     return (
//       <AnimatePresence>
//         {isStatusModalOpen && (
//           <>
//             <motion.div
//               variants={overlayVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
//               onClick={() => setIsStatusModalOpen(false)}
//             />
//             <motion.div
//               variants={modalVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 z-[101] flex items-center justify-center p-4"
//             >
//               <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white relative">
//                 <div className="p-6">
//                   <div className="flex items-center justify-center mb-4">
//                     <div
//                       className={`w-16 h-16 ${iconColor} rounded-full flex items-center justify-center`}
//                     >
//                       {icon}
//                     </div>
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
//                     {title}
//                   </h3>
//                   <p className="text-gray-500 text-center mb-4">{message}</p>
//                   {details && (
//                     <p className="text-sm text-gray-400 text-center mb-6">
//                       {details}
//                     </p>
//                   )}
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => setIsStatusModalOpen(false)}
//                     className={`w-full px-4 py-2.5 rounded-lg text-white font-medium transition-colors ${
//                       isSuccess
//                         ? "bg-green-600 hover:bg-green-700"
//                         : "bg-red-600 hover:bg-red-700"
//                     }`}
//                   >
//                     {t.close}
//                   </motion.button>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     );
//   };

//   if (isFetching) {
//     return (
//       <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-[#FF385C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-500">{t.loading}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="mb-6">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//               <CalendarTodayIcon className="w-7 h-7 text-[#FF385C]" />
//               {t.bookingManagement}
//             </h1>
//             <p className="text-sm text-gray-500 mt-1">{t.manageBookings}</p>
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={fetchBookings}
//               className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//               disabled={isLoading}
//             >
//               <RefreshIcon
//                 className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`}
//               />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
//         <motion.div
//           whileHover={{ y: -2 }}
//           className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
//         >
//           <p className="text-xs text-gray-500">{t.total}</p>
//           <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
//         </motion.div>
//         <motion.div
//           whileHover={{ y: -2 }}
//           className="bg-yellow-50 rounded-xl p-4 shadow-sm border border-yellow-200"
//         >
//           <p className="text-xs text-yellow-600">{t.pending}</p>
//           <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
//         </motion.div>
//         <motion.div
//           whileHover={{ y: -2 }}
//           className="bg-green-50 rounded-xl p-4 shadow-sm border border-green-200"
//         >
//           <p className="text-xs text-green-600">{t.confirmed}</p>
//           <p className="text-2xl font-bold text-green-700">{stats.confirmed}</p>
//         </motion.div>
//         <motion.div
//           whileHover={{ y: -2 }}
//           className="bg-red-50 rounded-xl p-4 shadow-sm border border-red-200"
//         >
//           <p className="text-xs text-red-600">{t.cancelled}</p>
//           <p className="text-2xl font-bold text-red-700">{stats.cancelled}</p>
//         </motion.div>
//         <motion.div
//           whileHover={{ y: -2 }}
//           className="bg-blue-50 rounded-xl p-4 shadow-sm border border-blue-200"
//         >
//           <p className="text-xs text-blue-600">{t.completed}</p>
//           <p className="text-2xl font-bold text-blue-700">{stats.completed}</p>
//         </motion.div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
//         <div className="flex flex-col sm:flex-row gap-3">
//           <div className="flex-1 relative">
//             <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder={t.searchBookings}
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//             />
//           </div>
//           <div className="flex gap-2">
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//             >
//               <option value="all">{t.filters.all}</option>
//               <option value="pending">{t.filters.pending}</option>
//               <option value="confirmed">{t.filters.confirmed}</option>
//               <option value="cancelled">{t.filters.cancelled}</option>
//               <option value="completed">{t.filters.completed}</option>
//             </select>
//             <button
//               onClick={() => {
//                 setSearchTerm("");
//                 setFilterStatus("all");
//               }}
//               className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               <ClearIcon className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Bookings Table */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
//                   {t.booking}
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
//                   {t.guest}
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
//                   {t.house}
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
//                   {t.status}
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
//                   {t.payment}
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
//                   {t.checkIn}
//                 </th>
//                 <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
//                   {t.actions}
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredBookings.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={7}
//                     className="px-4 py-8 text-center text-gray-500"
//                   >
//                     <CalendarTodayIcon className="w-12 h-12 mx-auto text-gray-300 mb-2" />
//                     <p>{t.noBookings}</p>
//                     <p className="text-sm">{t.adjustFilters}</p>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredBookings.map((booking) => (
//                   <motion.tr
//                     key={booking._id}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="hover:bg-gray-50 transition-colors"
//                   >
//                     <td className="px-4 py-3 whitespace-nowrap">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-full bg-[#FF385C] text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
//                           {booking.fullName.charAt(0).toUpperCase()}
//                         </div>
//                         <div>
//                           <p className="font-medium text-gray-900 text-sm truncate max-w-[120px]">
//                             {booking.fullName}
//                           </p>
//                           <p className="text-xs text-gray-500 truncate max-w-[120px]">
//                             {booking.bookingId}
//                           </p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap">
//                       <p className="text-sm text-gray-600 truncate max-w-[150px]">
//                         {booking.email}
//                       </p>
//                       <p className="text-xs text-gray-400 truncate max-w-[150px]">
//                         {booking.phone}
//                       </p>
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap">
//                       <p className="text-sm text-gray-600 truncate max-w-[120px]">
//                         {booking.houseName}
//                       </p>
//                       <p className="text-xs text-gray-400 truncate max-w-[120px]">
//                         {booking.houseType}
//                       </p>
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap">
//                       <span
//                         className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
//                           booking.status,
//                         )}`}
//                       >
//                         {getStatusLabel(booking.status)}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap">
//                       <div className="flex flex-col gap-0.5">
//                         <span
//                           className={`px-2 py-0.5 text-xs font-medium rounded-full ${getPaymentStatusColor(
//                             booking.paymentStatus,
//                           )}`}
//                         >
//                           {getPaymentStatusLabel(booking.paymentStatus)}
//                         </span>
//                         <span className="text-xs font-medium text-gray-900">
//                           {booking.formattedTotal}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap">
//                       <p className="text-sm text-gray-600">
//                         {booking.formattedCheckIn}
//                       </p>
//                       <p className="text-xs text-gray-400">
//                         {booking.formattedCheckOut}
//                       </p>
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex items-center justify-center gap-0.5 flex-nowrap">
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={() => openViewModal(booking)}
//                           className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                           title={t.viewBooking}
//                         >
//                           <VisibilityIcon className="w-4 h-4" />
//                         </motion.button>

//                         {booking.status === "pending" && (
//                           <motion.button
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.9 }}
//                             onClick={() => openConfirmModal(booking)}
//                             className="p-1 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
//                             title={t.confirmBooking}
//                           >
//                             <CheckCircleIcon className="w-4 h-4" />
//                           </motion.button>
//                         )}
//                         {booking.paymentStatus === "pending" && (
//                           <motion.button
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.9 }}
//                             disabled
//                             onClick={() => openVerifyPaymentModal(booking)}
//                             className="p-1 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
//                             title={t.verifyPayment}
//                           >
//                             <VerifiedIcon className="w-4 h-4" />
//                           </motion.button>
//                         )}
//                         {booking.status === "pending" && (
//                           <motion.button
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.9 }}
//                             onClick={() => openCancelModal(booking)}
//                             className="p-1 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
//                             title={t.cancelBooking}
//                           >
//                             <CancelIcon className="w-4 h-4" />
//                           </motion.button>
//                         )}
//                         {booking.status === "confirmed" && (
//                           <motion.button
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.9 }}
//                             onClick={() => openCompleteModal(booking)}
//                             className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                             title={t.completedBooking}
//                           >
//                             <VerifiedIcon className="w-4 h-4" />
//                           </motion.button>
//                         )}
//                       </div>
//                     </td>
//                   </motion.tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//         <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
//           <p className="text-sm text-gray-500">
//             {t.showing} {filteredBookings.length} {t.of} {bookings.length}{" "}
//             {t.bookings}
//           </p>
//         </div>
//       </div>

//       {/* View Booking Modal */}
//       <AnimatePresence>
//         {isViewModalOpen && selectedBooking && (
//           <>
//             <motion.div
//               variants={overlayVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
//               onClick={() => setIsViewModalOpen(false)}
//             />
//             <motion.div
//               variants={modalVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 z-[101] flex items-center justify-center p-4"
//             >
//               <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
//                 <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
//                   <div className="flex items-center gap-2">
//                     <CalendarTodayIcon className="text-[#FF385C] w-5 h-5" />
//                     <h2 className="text-xl font-semibold text-gray-900">
//                       {t.bookingDetails}
//                     </h2>
//                     <span className="ml-2 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
//                       {selectedBooking.bookingId}
//                     </span>
//                   </div>
//                   <motion.button
//                     whileHover={{ rotate: 90, scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => setIsViewModalOpen(false)}
//                     className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
//                   >
//                     <CloseIcon className="w-5 h-5" />
//                   </motion.button>
//                 </div>

//                 <div className="p-6 space-y-6">
//                   {/* Guest Information */}
//                   <div>
//                     <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                       <PersonIcon className="w-4 h-4 text-[#FF385C]" />
//                       {t.guestInformation}
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">
//                           Full Name
//                         </label>
//                         <p className="text-sm font-medium text-gray-900">
//                           {selectedBooking.fullName}
//                         </p>
//                       </div>
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">
//                           {t.email}
//                         </label>
//                         <p className="text-sm text-gray-900 flex items-center gap-1">
//                           <EmailIcon className="w-3 h-3 text-gray-400" />
//                           {selectedBooking.email}
//                         </p>
//                       </div>
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">
//                           {t.phone}
//                         </label>
//                         <p className="text-sm text-gray-900 flex items-center gap-1">
//                           <PhoneIcon className="w-3 h-3 text-gray-400" />
//                           {selectedBooking.phone}
//                         </p>
//                       </div>
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">
//                           {t.idNumber}
//                         </label>
//                         <p className="text-sm text-gray-900">
//                           {selectedBooking.idNumber || "N/A"}
//                         </p>
//                       </div>
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">
//                           {t.university}
//                         </label>
//                         <p className="text-sm text-gray-900">
//                           {selectedBooking.university || "N/A"}
//                         </p>
//                       </div>
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">
//                           {t.studentId}
//                         </label>
//                         <p className="text-sm text-gray-900">
//                           {selectedBooking.studentId || "N/A"}
//                         </p>
//                       </div>
//                       <div className="md:col-span-2">
//                         <label className="text-xs font-medium text-gray-500">
//                           {t.purpose}
//                         </label>
//                         <p className="text-sm text-gray-900">
//                           {selectedBooking.purpose || "N/A"}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* House Information */}
//                   <div>
//                     <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                       <HomeIcon className="w-4 h-4 text-[#FF385C]" />
//                       {t.houseInformation}
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">
//                           {t.houseName}
//                         </label>
//                         <p className="text-sm font-medium text-gray-900">
//                           {selectedBooking.houseName}
//                         </p>
//                       </div>
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">
//                           {t.houseType}
//                         </label>
//                         <p className="text-sm text-gray-900">
//                           {selectedBooking.houseType || "N/A"}
//                         </p>
//                       </div>
//                       <div className="md:col-span-2">
//                         <label className="text-xs font-medium text-gray-500">
//                           {t.location}
//                         </label>
//                         <p className="text-sm text-gray-900">
//                           {selectedBooking.district}, {selectedBooking.sector},{" "}
//                           {selectedBooking.cell}, {selectedBooking.village}
//                         </p>
//                       </div>
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">
//                           {t.owner}
//                         </label>
//                         <p className="text-sm text-gray-900">
//                           {selectedBooking.ownerName || "N/A"}
//                         </p>
//                       </div>
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">
//                           Owner Contact
//                         </label>
//                         <p className="text-sm text-gray-900">
//                           {selectedBooking.ownerContact || "N/A"}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Booking Information */}
//                   <div>
//                     <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                       <AssignmentIcon className="w-4 h-4 text-[#FF385C]" />
//                       {t.bookingInformation}
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">
//                           {t.checkIn}
//                         </label>
//                         <p className="text-sm text-gray-900">
//                           {selectedBooking.formattedCheckIn}
//                         </p>
//                       </div>
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">
//                           {t.checkOut}
//                         </label>
//                         <p className="text-sm text-gray-900">
//                           {selectedBooking.formattedCheckOut}
//                         </p>
//                       </div>
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">
//                           {t.months}
//                         </label>
//                         <p className="text-sm text-gray-900">
//                           {selectedBooking.months}
//                         </p>
//                       </div>
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">
//                           {t.guests}
//                         </label>
//                         <p className="text-sm text-gray-900 flex items-center gap-1">
//                           <PeopleIcon className="w-3 h-3 text-gray-400" />
//                           {selectedBooking.guests}
//                         </p>
//                       </div>
//                       <div className="md:col-span-2">
//                         <label className="text-xs font-medium text-gray-500">
//                           {t.specialRequests}
//                         </label>
//                         <p className="text-sm text-gray-900">
//                           {selectedBooking.specialRequests || "None"}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Payment Information */}
//                   <div>
//                     <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                       <PaymentIcon className="w-4 h-4 text-[#FF385C]" />
//                       {t.paymentInformation}
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">
//                           {t.monthlyRent}
//                         </label>
//                         <p className="text-sm font-medium text-gray-900">
//                           {formatCurrency(selectedBooking.monthlyRent)}
//                         </p>
//                       </div>
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">
//                           {t.serviceFee}
//                         </label>
//                         <p className="text-sm text-gray-900">
//                           {formatCurrency(selectedBooking.serviceFee)}
//                         </p>
//                       </div>
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">
//                           {t.totalAmount}
//                         </label>
//                         <p className="text-sm font-bold text-gray-900">
//                           {selectedBooking.formattedTotal}
//                         </p>
//                       </div>
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">
//                           {t.paymentMethod}
//                         </label>
//                         <p className="text-sm text-gray-900 capitalize">
//                           {selectedBooking.paymentMethod}
//                         </p>
//                       </div>
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">
//                           {t.paymentStatus}
//                         </label>
//                         <span
//                           className={`mt-1 px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(selectedBooking.paymentStatus)}`}
//                         >
//                           {getPaymentStatusLabel(selectedBooking.paymentStatus)}
//                         </span>
//                       </div>
//                       {selectedBooking.momoNumber && (
//                         <div>
//                           <label className="text-xs font-medium text-gray-500">
//                             {t.momoNumber}
//                           </label>
//                           <p className="text-sm text-gray-900">
//                             {selectedBooking.momoNumber}
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Notes */}
//                   {selectedBooking.notes && (
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">
//                         {t.notes}
//                       </label>
//                       <div className="mt-1 p-3 bg-gray-50 rounded-lg">
//                         <p className="text-sm text-gray-700 whitespace-pre-wrap">
//                           {selectedBooking.notes}
//                         </p>
//                       </div>
//                     </div>
//                   )}

//                   {/* Dates */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">
//                         {t.createdAt}
//                       </label>
//                       <p className="text-sm text-gray-900">
//                         {formatDate(selectedBooking.createdAt)}
//                       </p>
//                     </div>
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">
//                         {t.updatedAt}
//                       </label>
//                       <p className="text-sm text-gray-900">
//                         {formatDate(selectedBooking.updatedAt)}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => {
//                         setIsViewModalOpen(false);
//                         openEditModal(selectedBooking);
//                       }}
//                       className="flex-1 px-4 py-2.5 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors flex items-center justify-center gap-2"
//                     >
//                       <EditIcon className="w-4 h-4" />
//                       {t.editBooking}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => setIsViewModalOpen(false)}
//                       className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
//                     >
//                       {t.close}
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Edit Modal */}
//       <AnimatePresence>
//         {isEditModalOpen && selectedBooking && (
//           <>
//             <motion.div
//               variants={overlayVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
//               onClick={() => setIsEditModalOpen(false)}
//             />
//             <motion.div
//               variants={modalVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 z-[101] flex items-center justify-center p-4"
//             >
//               <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
//                 <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
//                   <div className="flex items-center gap-2">
//                     <EditIcon className="text-[#FF385C] w-5 h-5" />
//                     <h2 className="text-xl font-semibold text-gray-900">
//                       {t.editBooking} - {selectedBooking.bookingId}
//                     </h2>
//                   </div>
//                   <motion.button
//                     whileHover={{ rotate: 90, scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => setIsEditModalOpen(false)}
//                     className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
//                   >
//                     <CloseIcon className="w-5 h-5" />
//                   </motion.button>
//                 </div>

//                 <div className="p-6 space-y-6">
//                   {/* Quick Action Buttons */}
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//                     {selectedBooking.status === "pending" && (
//                       <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={() => {
//                           setIsEditModalOpen(false);
//                           openConfirmModal(selectedBooking);
//                         }}
//                         className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-1"
//                       >
//                         <CheckCircleIcon className="w-4 h-4" />
//                         {t.confirmBooking}
//                       </motion.button>
//                     )}
//                     {selectedBooking.paymentStatus === "pending" && (
//                       <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={() => {
//                           setIsEditModalOpen(false);
//                           openVerifyPaymentModal(selectedBooking);
//                         }}
//                         className="px-3 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-1"
//                       >
//                         <VerifiedIcon className="w-4 h-4" />
//                         {t.verifyPayment}
//                       </motion.button>
//                     )}
//                     {selectedBooking.status === "pending" && (
//                       <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={() => {
//                           setIsEditModalOpen(false);
//                           openCancelModal(selectedBooking);
//                         }}
//                         className="px-3 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors flex items-center justify-center gap-1"
//                       >
//                         <CancelIcon className="w-4 h-4" />
//                         {t.cancelBooking}
//                       </motion.button>
//                     )}
//                     {selectedBooking.status === "confirmed" && (
//                       <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={() => {
//                           setIsEditModalOpen(false);
//                           openCompleteModal(selectedBooking);
//                         }}
//                         className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
//                       >
//                         <AssignmentIcon className="w-4 h-4" />
//                         {t.completedBooking}
//                       </motion.button>
//                     )}
//                   </div>

//                   <div className="border-t border-gray-200 pt-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         {t.status} <span className="text-red-500">*</span>
//                       </label>
//                       <select
//                         value={editFormData.status || "pending"}
//                         onChange={(e) =>
//                           handleEditFormChange("status", e.target.value)
//                         }
//                         onBlur={() => handleEditFormBlur("status")}
//                         className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white ${
//                           formErrors.status && touchedFields.has("status")
//                             ? "border-red-500"
//                             : "border-gray-300"
//                         }`}
//                       >
//                         <option value="pending">{t.statuses.pending}</option>
//                         <option value="confirmed">
//                           {t.statuses.confirmed}
//                         </option>
//                         <option value="cancelled">
//                           {t.statuses.cancelled}
//                         </option>
//                         <option value="completed">
//                           {t.statuses.completed}
//                         </option>
//                       </select>
//                       {formErrors.status && touchedFields.has("status") && (
//                         <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
//                           <ErrorIcon className="w-3 h-3" />
//                           {formErrors.status}
//                         </p>
//                       )}
//                     </div>

//                     <div className="mt-4">
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         {t.paymentStatus}{" "}
//                         <span className="text-red-500">*</span>
//                       </label>
//                       <select
//                         value={editFormData.paymentStatus || "pending"}
//                         onChange={(e) =>
//                           handleEditFormChange("paymentStatus", e.target.value)
//                         }
//                         onBlur={() => handleEditFormBlur("paymentStatus")}
//                         className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white ${
//                           formErrors.paymentStatus &&
//                           touchedFields.has("paymentStatus")
//                             ? "border-red-500"
//                             : "border-gray-300"
//                         }`}
//                       >
//                         <option value="pending">
//                           {t.paymentStatuses.pending}
//                         </option>
//                         <option value="verified">
//                           {t.paymentStatuses.verified}
//                         </option>
//                         <option value="failed">
//                           {t.paymentStatuses.failed}
//                         </option>
//                       </select>
//                       {formErrors.paymentStatus &&
//                         touchedFields.has("paymentStatus") && (
//                           <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
//                             <ErrorIcon className="w-3 h-3" />
//                             {formErrors.paymentStatus}
//                           </p>
//                         )}
//                     </div>

//                     <div className="mt-4">
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         {t.notes}
//                       </label>
//                       <textarea
//                         value={editFormData.notes || ""}
//                         onChange={(e) =>
//                           handleEditFormChange("notes", e.target.value)
//                         }
//                         rows={4}
//                         className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none"
//                         placeholder="Add notes about this booking..."
//                       />
//                     </div>
//                   </div>

//                   <div className="flex gap-3 pt-4 border-t border-gray-200">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handleUpdateBooking}
//                       disabled={isSubmitting}
//                       className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 ${
//                         isSubmitting
//                           ? "bg-gray-400 cursor-not-allowed"
//                           : "bg-[#FF385C] hover:bg-[#E31C5F]"
//                       }`}
//                     >
//                       {isSubmitting ? (
//                         <>
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           {t.saving}
//                         </>
//                       ) : (
//                         <>
//                           <Send className="w-4 h-4" />
//                           {t.updateStatus}
//                         </>
//                       )}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => setIsEditModalOpen(false)}
//                       className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
//                     >
//                       {t.cancel}
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Confirmation Modals */}
//       {renderConfirmationModal(
//         isConfirmModalOpen,
//         () => {
//           setIsConfirmModalOpen(false);
//           setSelectedBooking(null);
//         },
//         handleConfirmBooking,
//         t.confirmBooking,
//         t.confirmConfirmation,
//         <CheckCircleIcon className="w-8 h-8 text-green-600" />,
//         "bg-green-100",
//       )}

//       {renderConfirmationModal(
//         isCancelModalOpen,
//         () => {
//           setIsCancelModalOpen(false);
//           setSelectedBooking(null);
//         },
//         handleCancelBooking,
//         t.cancelBooking,
//         t.cancelConfirmation,
//         <CancelIcon className="w-8 h-8 text-orange-600" />,
//         "bg-orange-100",
//       )}

//       {renderConfirmationModal(
//         isCompleteModalOpen,
//         () => {
//           setIsCompleteModalOpen(false);
//           setSelectedBooking(null);
//         },
//         handleCompleteBooking,
//         t.completedBooking,
//         t.completedConfirmation,
//         <AssignmentIcon className="w-8 h-8 text-blue-600" />,
//         "bg-blue-100",
//       )}

//       {renderConfirmationModal(
//         isVerifyPaymentModalOpen,
//         () => {
//           setIsVerifyPaymentModalOpen(false);
//           setSelectedBooking(null);
//         },
//         handleVerifyPayment,
//         t.verifyPayment,
//         t.verifyPaymentConfirmation,
//         <VerifiedIcon className="w-8 h-8 text-purple-600" />,
//         "bg-purple-100",
//       )}

//       {/* Status Modal (Success/Failure) */}
//       {renderStatusModal()}
//     </div>
//   );
// };

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";

// Material-UI Icons
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ClearIcon from "@mui/icons-material/Clear";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import PaymentIcon from "@mui/icons-material/Payment";
import Send from "@mui/icons-material/Send";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedIcon from "@mui/icons-material/Verified";
import ErrorIcon from "@mui/icons-material/Error";
import { CheckCircleOutlineOutlined } from "@mui/icons-material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

// ============================================================
// MODAL COMPONENTS
// ============================================================

// Success Modal
interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  details?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  details,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[300] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-600" />
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border-4 border-green-200 animate-ping opacity-75" />
              <CheckCircleOutlineOutlined className="w-10 h-10 text-green-600 relative z-10" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
            {title}
          </h3>
          <p className="text-gray-600 text-center mb-2">{message}</p>
          {details && (
            <p className="text-sm text-gray-400 text-center mb-6">{details}</p>
          )}
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

// Error Modal
interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  details?: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  details,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[300] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-red-600" />
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border-4 border-red-200 animate-ping opacity-75" />
              <WarningAmberIcon className="w-10 h-10 text-red-600 relative z-10" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
            {title}
          </h3>
          <p className="text-gray-600 text-center mb-2">{message}</p>
          {details && (
            <p className="text-sm text-gray-400 text-center mb-6">{details}</p>
          )}
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

// Confirm Modal
interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  icon?: React.ReactNode;
  isSubmitting?: boolean;
  type?: "danger" | "warning" | "info" | "success";
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  icon,
  isSubmitting = false,
  type = "warning",
}) => {
  if (!isOpen) return null;

  const getColors = () => {
    switch (type) {
      case "danger":
        return {
          iconBg: "bg-red-100",
          iconColor: "text-red-600",
          iconBorder: "border-red-200",
          buttonBg: "bg-gradient-to-r from-red-500 to-red-600",
          buttonHover: "hover:shadow-lg",
        };
      case "warning":
        return {
          iconBg: "bg-yellow-100",
          iconColor: "text-yellow-600",
          iconBorder: "border-yellow-200",
          buttonBg: "bg-gradient-to-r from-yellow-500 to-yellow-600",
          buttonHover: "hover:shadow-lg",
        };
      case "success":
        return {
          iconBg: "bg-green-100",
          iconColor: "text-green-600",
          iconBorder: "border-green-200",
          buttonBg: "bg-gradient-to-r from-green-500 to-green-600",
          buttonHover: "hover:shadow-lg",
        };
      default:
        return {
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
          iconBorder: "border-blue-200",
          buttonBg: "bg-gradient-to-r from-blue-500 to-blue-600",
          buttonHover: "hover:shadow-lg",
        };
    }
  };

  const colors = getColors();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[300] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden animate-in fade-in zoom-in duration-300">
        <div
          className={`absolute top-0 left-0 right-0 h-1 ${colors.buttonBg}`}
        />
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <div
              className={`w-20 h-20 ${colors.iconBg} rounded-full flex items-center justify-center relative`}
            >
              <div
                className={`absolute inset-0 rounded-full border-4 ${colors.iconBorder} animate-ping opacity-75`}
              />
              <div className={`${colors.iconColor} relative z-10`}>
                {icon ||
                  (type === "danger" ? (
                    <CancelIcon className="w-10 h-10" />
                  ) : type === "warning" ? (
                    <WarningAmberIcon className="w-10 h-10" />
                  ) : type === "success" ? (
                    <CheckCircleIcon className="w-10 h-10" />
                  ) : (
                    <CalendarTodayIcon className="w-10 h-10" />
                  ))}
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
            {title}
          </h3>
          <p className="text-gray-600 text-center mb-6">{message}</p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              disabled={isSubmitting}
              className={`flex-1 px-4 py-2.5 ${colors.buttonBg} text-white rounded-xl font-medium ${colors.buttonHover} transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Loading...
                </>
              ) : (
                confirmText
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// TRANSLATION HELPER - Google Translate API
// ============================================================

const translateContent = async (
  text: string,
  targetLang: string,
): Promise<string> => {
  if (!text || targetLang === "en") return text;
  if (targetLang === "rw" || targetLang === "fr") {
    try {
      const response = await axios.post(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`,
      );
      if (response.data && response.data[0] && response.data[0][0]) {
        return response.data[0][0][0] || text;
      }
      return text;
    } catch (error) {
      return text;
      console.log(error);
    }
  }
  return text;
};

// Types based on the Booking model
interface PaymentScreenshot {
  url: string;
  publicId: string;
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
  paymentScreenshot: PaymentScreenshot;
  paymentStatus: "pending" | "verified" | "failed";
  status: "pending" | "confirmed" | "cancelled" | "completed";
  notes: string;
  createdAt: string;
  updatedAt: string;
}

// Extended type for UI purposes
interface BookingUI extends Booking {
  statusLabel: string;
  statusColor: string;
  paymentStatusLabel: string;
  paymentStatusColor: string;
  formattedCheckIn: string;
  formattedCheckOut: string;
  formattedTotal: string;
}

// Form validation errors interface
interface FormErrors {
  status?: string;
  paymentStatus?: string;
  notes?: string;
}

// Translations
const translations = {
  en: {
    bookingManagement: "Host Booking Management",
    manageBookings: "Manage bookings for your properties",
    total: "Total",
    pending: "Pending",
    confirmed: "Confirmed",
    cancelled: "Cancelled",
    completed: "Completed",
    searchBookings: "Search by name, email, or booking ID...",
    allStatus: "All Status",
    booking: "Booking",
    guest: "Guest",
    house: "House",
    status: "Status",
    payment: "Payment",
    checkIn: "Check In",
    checkOut: "Check Out",
    totalAmount: "Total Amount",
    actions: "Actions",
    noBookings: "No bookings found",
    adjustFilters: "Try adjusting your search or filters",
    showing: "Showing",
    of: "of",
    bookings: "bookings",
    viewBooking: "View Booking",
    editBooking: "Edit Booking",
    bookingDetails: "Booking Details",
    guestInformation: "Guest Information",
    houseInformation: "House Information",
    bookingInformation: "Booking Information",
    paymentInformation: "Payment Information",
    updateStatus: "Update Status",
    selectStatus: "Select Status",
    selectPaymentStatus: "Select Payment Status",
    close: "Close",
    loading: "Loading...",
    fetchError: "Failed to load bookings",
    confirmBooking: "Confirm Booking",
    confirmConfirmation: "Are you sure you want to confirm this booking?",
    cancelBooking: "Cancel Booking",
    cancelConfirmation: "Are you sure you want to cancel this booking?",
    completedBooking: "Mark as Completed",
    completedConfirmation:
      "Are you sure you want to mark this booking as completed?",
    verified: "Verified",
    failed: "Failed",
    paymentStatus: "Payment Status",
    notes: "Notes",
    phone: "Phone",
    email: "Email",
    idNumber: "ID Number",
    university: "University",
    studentId: "Student ID",
    purpose: "Purpose",
    houseName: "House Name",
    houseType: "House Type",
    location: "Location",
    owner: "Owner",
    months: "Months",
    guests: "Guests",
    specialRequests: "Special Requests",
    monthlyRent: "Monthly Rent",
    serviceFee: "Service Fee",
    paymentMethod: "Payment Method",
    momoNumber: "MoMo Number",
    paymentScreenshot: "Payment Screenshot",
    viewImage: "View Image",
    createdAt: "Created At",
    updatedAt: "Updated At",
    statuses: {
      pending: "Pending",
      confirmed: "Confirmed",
      cancelled: "Cancelled",
      completed: "Completed",
    },
    paymentStatuses: {
      pending: "Pending",
      verified: "Verified",
      failed: "Failed",
    },
    filters: {
      all: "All Status",
      pending: "Pending",
      confirmed: "Confirmed",
      cancelled: "Cancelled",
      completed: "Completed",
    },
    statusUpdated: "Booking status updated successfully!",
    statusUpdateFailed: "Failed to update booking status",
    required: "This field is required",
    validationError: "Please fix all validation errors",
    cancel: "Cancel",
    save: "Save",
    saving: "Saving...",
    verifyPayment: "Verify Payment",
    verifyPaymentConfirmation: "Are you sure you want to verify this payment?",
    paymentVerified: "Payment verified successfully!",
    paymentVerificationFailed: "Failed to verify payment",
    noHostBookings: "No bookings found for your properties",
    success: "Success",
    confirmation: "Confirmation",
    confirm: "Confirm",
    error: "Error",
  },
  fr: {
    bookingManagement: "Gestion des Réservations de l'Hôte",
    manageBookings: "Gérer les réservations de vos propriétés",
    total: "Total",
    pending: "En Attente",
    confirmed: "Confirmé",
    cancelled: "Annulé",
    completed: "Terminé",
    searchBookings: "Rechercher par nom, email ou ID de réservation...",
    allStatus: "Tous les Statuts",
    booking: "Réservation",
    guest: "Invité",
    house: "Logement",
    status: "Statut",
    payment: "Paiement",
    checkIn: "Arrivée",
    checkOut: "Départ",
    totalAmount: "Montant Total",
    actions: "Actions",
    noBookings: "Aucune réservation trouvée",
    adjustFilters: "Essayez d'ajuster votre recherche ou vos filtres",
    showing: "Affichage",
    of: "de",
    bookings: "réservations",
    viewBooking: "Voir la Réservation",
    editBooking: "Modifier la Réservation",
    bookingDetails: "Détails de la Réservation",
    guestInformation: "Informations de l'Invité",
    houseInformation: "Informations du Logement",
    bookingInformation: "Informations de Réservation",
    paymentInformation: "Informations de Paiement",
    updateStatus: "Mettre à Jour le Statut",
    selectStatus: "Sélectionner le Statut",
    selectPaymentStatus: "Sélectionner le Statut de Paiement",
    close: "Fermer",
    loading: "Chargement...",
    fetchError: "Échec du chargement des réservations",
    confirmBooking: "Confirmer la Réservation",
    confirmConfirmation:
      "Êtes-vous sûr de vouloir confirmer cette réservation ?",
    cancelBooking: "Annuler la Réservation",
    cancelConfirmation: "Êtes-vous sûr de vouloir annuler cette réservation ?",
    completedBooking: "Marquer comme Terminé",
    completedConfirmation:
      "Êtes-vous sûr de vouloir marquer cette réservation comme terminée ?",
    verified: "Vérifié",
    failed: "Échoué",
    paymentStatus: "Statut de Paiement",
    notes: "Notes",
    phone: "Téléphone",
    email: "Email",
    idNumber: "Numéro d'Identité",
    university: "Université",
    studentId: "ID Étudiant",
    purpose: "Objectif",
    houseName: "Nom du Logement",
    houseType: "Type de Logement",
    location: "Emplacement",
    owner: "Propriétaire",
    months: "Mois",
    guests: "Invités",
    specialRequests: "Demandes Spéciales",
    monthlyRent: "Loyer Mensuel",
    serviceFee: "Frais de Service",
    paymentMethod: "Méthode de Paiement",
    momoNumber: "Numéro MoMo",
    paymentScreenshot: "Capture d'Écran de Paiement",
    viewImage: "Voir l'Image",
    createdAt: "Créé le",
    updatedAt: "Mis à jour le",
    statuses: {
      pending: "En Attente",
      confirmed: "Confirmé",
      cancelled: "Annulé",
      completed: "Terminé",
    },
    paymentStatuses: {
      pending: "En Attente",
      verified: "Vérifié",
      failed: "Échoué",
    },
    filters: {
      all: "Tous les Statuts",
      pending: "En Attente",
      confirmed: "Confirmé",
      cancelled: "Annulé",
      completed: "Terminé",
    },
    statusUpdated: "Statut de la réservation mis à jour avec succès !",
    statusUpdateFailed: "Échec de la mise à jour du statut",
    required: "Ce champ est requis",
    validationError: "Veuillez corriger toutes les erreurs de validation",
    cancel: "Annuler",
    save: "Enregistrer",
    saving: "Enregistrement...",
    verifyPayment: "Vérifier le Paiement",
    verifyPaymentConfirmation:
      "Êtes-vous sûr de vouloir vérifier ce paiement ?",
    paymentVerified: "Paiement vérifié avec succès !",
    paymentVerificationFailed: "Échec de la vérification du paiement",
    noHostBookings: "Aucune réservation trouvée pour vos propriétés",
    success: "Succès",
    confirmation: "Confirmation",
    confirm: "Confirmer",
    error: "Erreur",
  },
  rw: {
    bookingManagement: "Gucunga Ibyanditswe by'Umutambyi",
    manageBookings: "Gucunga ibyanditswe by'amazu yawe",
    total: "Yose",
    pending: "Bitegereje",
    confirmed: "Byemejwe",
    cancelled: "Byahagaritswe",
    completed: "Byarangiye",
    searchBookings:
      "Shakisha ukurikije izina, imeri cyangwa ID y'icyanditswe...",
    allStatus: "Ihagaze Ryose",
    booking: "Icyanditswe",
    guest: "Umushyitsi",
    house: "Inzu",
    status: "Ihagaze",
    payment: "Amahoro",
    checkIn: "Kwinjira",
    checkOut: "Kuvamo",
    totalAmount: "Amahera Yose",
    actions: "Ibikorwa",
    noBookings: "Nta cyanditswe cyabonetse",
    adjustFilters: "Gerageza guhindura uburyo ushakisha cyangwa amatungo",
    showing: "Bereka",
    of: "muri",
    bookings: "ibyanditswe",
    viewBooking: "Reba Icyanditswe",
    editBooking: "Hindura Icyanditswe",
    bookingDetails: "Ibisobanuro by'Icyanditswe",
    guestInformation: "Amakuru y'Umushyitsi",
    houseInformation: "Amakuru y'Inzu",
    bookingInformation: "Amakuru y'Icyanditswe",
    paymentInformation: "Amakuru y'Amahoro",
    updateStatus: "Vugurura Ihagaze",
    selectStatus: "Hitamo Ihagaze",
    selectPaymentStatus: "Hitamo Ihagaze ry'Amahoro",
    close: "Funga",
    loading: "Birakoreshwa...",
    fetchError: "Kubura ibyanditswe birananiranye",
    confirmBooking: "Emeza Icyanditswe",
    confirmConfirmation: "Uri kwizera ko ushaka kwemeza iki cyanditswe?",
    cancelBooking: "Hagarika Icyanditswe",
    cancelConfirmation: "Uri kwizera ko ushaka guhagarika iki cyanditswe?",
    completedBooking: "Shyira ku Rangiye",
    completedConfirmation:
      "Uri kwizera ko ushaka gushyira iki cyanditswe ku rangiye?",
    verified: "Byagenzuwe",
    failed: "Byananiwe",
    paymentStatus: "Ihagaze ry'Amahoro",
    notes: "Inyandiko",
    phone: "Telefone",
    email: "Imeri",
    idNumber: "Numero y'Indangamuntu",
    university: "Kaminuza",
    studentId: "ID y'Umunyeshuri",
    purpose: "Intego",
    houseName: "Izina ry'Inzu",
    houseType: "Ubwoko bw'Inzu",
    location: "Ahantu",
    owner: "Nyir'inzu",
    months: "Amezi",
    guests: "Abashyitsi",
    specialRequests: "Ibisabwa Bidasanzwe",
    monthlyRent: "Isaru y'Ukwezi",
    serviceFee: "Amahoro ya Serivisi",
    paymentMethod: "Uburyo bwo Kwishyura",
    momoNumber: "Numero ya MoMo",
    paymentScreenshot: "Ifoto y'Ubuhisha",
    viewImage: "Reba Ifoto",
    createdAt: "Byakozwe",
    updatedAt: "Byavuguruwe",
    statuses: {
      pending: "Bitegereje",
      confirmed: "Byemejwe",
      cancelled: "Byahagaritswe",
      completed: "Byarangiye",
    },
    paymentStatuses: {
      pending: "Bitegereje",
      verified: "Byagenzuwe",
      failed: "Byananiwe",
    },
    filters: {
      all: "Ihagaze Ryose",
      pending: "Bitegereje",
      confirmed: "Byemejwe",
      cancelled: "Byahagaritswe",
      completed: "Byarangiye",
    },
    statusUpdated: "Ihagaze ry'icyanditswe ryavuguruwe neza!",
    statusUpdateFailed: "Kuvugurura ihagaze birananiranye",
    required: "Iki gikurikira kirakenewe",
    validationError: "Kosora amakosa yose yo kwemeza",
    cancel: "Reka",
    save: "Bika",
    saving: "Birabikwa...",
    verifyPayment: "Kemeza Amahoro",
    verifyPaymentConfirmation: "Uri kwizera ko ushaka kwemeza aya mahoro?",
    paymentVerified: "Amahoro yemejwe neza!",
    paymentVerificationFailed: "Kwemeza amahoro byananiranye",
    noHostBookings: "Nta cyanditswe cyabonetse ku mazu yawe",
    success: "Byagenze Neza",
    confirmation: "Kwemeza",
    confirm: "Emeza",
    error: "Ikosa",
  },
};

// Helper function to get language from cookies
const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
  const lang = Cookies.get("language") as "en" | "fr" | "rw";
  return lang || "en";
};

// Helper function to get user email from localStorage
const getUserEmail = (): string => {
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      return user.email || "";
    }
    return "";
  } catch {
    return "";
  }
};

// Helper function to get token from localStorage
const getToken = (): string => {
  try {
    return localStorage.getItem("token") || "";
  } catch {
    return "";
  }
};

// API Base URL
const API_BASE_URL = "https://rene-inyumba-nodejs.onrender.com";

// Axios instance with interceptors
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for authentication
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

// Helper function to transform booking to UI format
const transformBookingToUI = (booking: Booking): BookingUI => {
  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    completed: "bg-blue-100 text-blue-800",
  };

  const statusLabels: Record<string, string> = {
    pending: "Pending",
    confirmed: "Confirmed",
    cancelled: "Cancelled",
    completed: "Completed",
  };

  const paymentStatusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    verified: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
  };

  const paymentStatusLabels: Record<string, string> = {
    pending: "Pending",
    verified: "Verified",
    failed: "Failed",
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return {
    ...booking,
    statusLabel: statusLabels[booking.status] || booking.status,
    statusColor: statusColors[booking.status] || "bg-gray-100 text-gray-800",
    paymentStatusLabel:
      paymentStatusLabels[booking.paymentStatus] || booking.paymentStatus,
    paymentStatusColor:
      paymentStatusColors[booking.paymentStatus] || "bg-gray-100 text-gray-800",
    formattedCheckIn: formatDate(booking.checkIn),
    formattedCheckOut: formatDate(booking.checkOut),
    formattedTotal: `RWF ${booking.totalAmount.toLocaleString()}`,
  };
};

export const HostBookingManagement: React.FC = () => {
  // Get language from cookies
  const [lang, setLang] = useState<"en" | "fr" | "rw">(
    getLanguageFromCookies(),
  );
  const [bookings, setBookings] = useState<BookingUI[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<BookingUI[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isFetching, setIsFetching] = useState(true);

  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingUI | null>(
    null,
  );

  // Confirmation Modal states
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isVerifyPaymentModalOpen, setIsVerifyPaymentModalOpen] =
    useState(false);

  // Success/Error modal states
  const [successModal, setSuccessModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    details?: string;
  }>({
    isOpen: false,
    title: "",
    message: "",
    details: "",
  });

  const [errorModal, setErrorModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    details?: string;
  }>({
    isOpen: false,
    title: "",
    message: "",
    details: "",
  });

  // Edit form state
  const [editFormData, setEditFormData] = useState<Partial<Booking>>({
    status: "pending",
    paymentStatus: "pending",
    notes: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  // Loading states
  const [isLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Statistics
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
    completed: 0,
  });

  const t = translations[lang];

  const showSuccessModal = (
    title: string,
    message: string,
    details?: string,
  ) => {
    setSuccessModal({ isOpen: true, title, message, details });
  };

  const showErrorModal = (title: string, message: string, details?: string) => {
    setErrorModal({ isOpen: true, title, message, details });
  };

  // Fetch bookings by email from API with translation
  const fetchBookings = async () => {
    const email = getUserEmail();

    if (!email) {
      toast.warning("Please login to view bookings");
      setIsFetching(false);
      return;
    }

    setIsFetching(true);
    try {
      const response = await api.get(`/bookings/${email}`);

      let bookingsData: Booking[] = [];
      const result = response.data;

      if (result.success && Array.isArray(result.data)) {
        bookingsData = result.data;
      } else if (Array.isArray(result)) {
        bookingsData = result;
      } else if (result.data && Array.isArray(result.data)) {
        bookingsData = result.data;
      } else if (result.bookings && Array.isArray(result.bookings)) {
        bookingsData = result.bookings;
      }

      // **FILTER: Only show bookings with verified payment status**
      bookingsData = bookingsData.filter(
        (booking) => booking.paymentStatus === "verified",
      );

      // Translate booking data if language is not English
      let processedBookings = bookingsData;
      if (lang !== "en") {
        const translatedBookings = [];
        for (const booking of bookingsData) {
          try {
            const translatedBooking = {
              ...booking,
              fullName: await translateContent(booking.fullName, lang),
              email: await translateContent(booking.email, lang),
              university: await translateContent(booking.university, lang),
              purpose: await translateContent(booking.purpose, lang),
              houseName: await translateContent(booking.houseName, lang),
              houseType: await translateContent(booking.houseType, lang),
              district: await translateContent(booking.district, lang),
              sector: await translateContent(booking.sector, lang),
              cell: await translateContent(booking.cell, lang),
              village: await translateContent(booking.village, lang),
              ownerName: await translateContent(booking.ownerName, lang),
              specialRequests: await translateContent(
                booking.specialRequests,
                lang,
              ),
              notes: await translateContent(booking.notes, lang),
            };
            translatedBookings.push(translatedBooking);
          } catch {
            translatedBookings.push(booking);
          }
        }
        processedBookings = translatedBookings;
      }

      const transformedBookings = processedBookings.map((booking: Booking) =>
        transformBookingToUI(booking),
      );
      setBookings(transformedBookings);
      setFilteredBookings(transformedBookings);

      if (transformedBookings.length === 0) {
        showErrorModal(
          "No Verified Payments",
          "You don't have any bookings with verified payment status.",
        );
      }
    } catch (error) {
      const axiosError = error as AxiosError;

      // Try alternative endpoint - fetch all bookings and filter
      if (axiosError.response?.status === 404) {
        try {
          const allResponse = await api.get("/bookings");
          let allBookingsData: Booking[] = [];
          const allResult = allResponse.data;

          if (allResult.success && Array.isArray(allResult.data)) {
            allBookingsData = allResult.data;
          } else if (Array.isArray(allResult)) {
            allBookingsData = allResult;
          } else if (allResult.data && Array.isArray(allResult.data)) {
            allBookingsData = allResult.data;
          } else if (allResult.bookings && Array.isArray(allResult.bookings)) {
            allBookingsData = allResult.bookings;
          }

          // Filter bookings by owner email AND verified payment status
          const hostEmail = getUserEmail();
          let hostBookings = allBookingsData.filter(
            (booking) => booking.ownerEmail === hostEmail,
          );

          hostBookings = hostBookings.filter(
            (booking) => booking.paymentStatus === "verified",
          );

          // Translate bookings
          let processedHostBookings = hostBookings;
          if (lang !== "en") {
            const translatedBookings = [];
            for (const booking of hostBookings) {
              try {
                const translatedBooking = {
                  ...booking,
                  fullName: await translateContent(booking.fullName, lang),
                  email: await translateContent(booking.email, lang),
                  university: await translateContent(booking.university, lang),
                  purpose: await translateContent(booking.purpose, lang),
                  houseName: await translateContent(booking.houseName, lang),
                  houseType: await translateContent(booking.houseType, lang),
                  district: await translateContent(booking.district, lang),
                  sector: await translateContent(booking.sector, lang),
                  cell: await translateContent(booking.cell, lang),
                  village: await translateContent(booking.village, lang),
                  ownerName: await translateContent(booking.ownerName, lang),
                  specialRequests: await translateContent(
                    booking.specialRequests,
                    lang,
                  ),
                  notes: await translateContent(booking.notes, lang),
                };
                translatedBookings.push(translatedBooking);
              } catch {
                translatedBookings.push(booking);
              }
            }
            processedHostBookings = translatedBookings;
          }

          const transformedBookings = processedHostBookings.map(
            (booking: Booking) => transformBookingToUI(booking),
          );
          setBookings(transformedBookings);
          setFilteredBookings(transformedBookings);

          if (transformedBookings.length === 0) {
            showErrorModal(
              "No Verified Payments",
              "You don't have any bookings with verified payment status for your properties.",
            );
          }
        } catch (fallbackError) {
          showErrorModal(
            t.error || "Error",
            t.fetchError || "Failed to load bookings",
          );
          console.error(fallbackError);
        }
      } else {
        showErrorModal(
          t.error || "Error",
          t.fetchError || "Failed to load bookings",
        );
      }
    } finally {
      setIsFetching(false);
    }
  };

  // Validate edit form
  const validateEditForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    if (!editFormData.status) {
      errors.status = t.required;
      isValid = false;
    }

    if (!editFormData.paymentStatus) {
      errors.paymentStatus = t.required;
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Handle edit form field changes
  const handleEditFormChange = (field: keyof Booking, value: any) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setTouchedFields((prev) => new Set(prev).add(field));
  };

  // Handle edit form blur
  const handleEditFormBlur = (field: string) => {
    setTouchedFields((prev) => new Set(prev).add(field));
    validateEditForm();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // Filter bookings
  useEffect(() => {
    let filtered = [...bookings];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (booking) =>
          booking.fullName.toLowerCase().includes(term) ||
          booking.email.toLowerCase().includes(term) ||
          booking.bookingId.toLowerCase().includes(term) ||
          booking.houseName.toLowerCase().includes(term),
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((booking) => booking.status === filterStatus);
    }

    setFilteredBookings(filtered);
  }, [bookings, searchTerm, filterStatus]);

  // Update statistics
  useEffect(() => {
    const total = bookings.length;
    const pending = bookings.filter((b) => b.status === "pending").length;
    const confirmed = bookings.filter((b) => b.status === "confirmed").length;
    const cancelled = bookings.filter((b) => b.status === "cancelled").length;
    const completed = bookings.filter((b) => b.status === "completed").length;

    setStats({ total, pending, confirmed, cancelled, completed });
  }, [bookings]);

  // Get status badge color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get status label
  const getStatusLabel = (status: string): string => {
    switch (status) {
      case "pending":
        return t.statuses.pending;
      case "confirmed":
        return t.statuses.confirmed;
      case "cancelled":
        return t.statuses.cancelled;
      case "completed":
        return t.statuses.completed;
      default:
        return status;
    }
  };

  // Get payment status color
  const getPaymentStatusColor = (status: string): string => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "verified":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get payment status label
  const getPaymentStatusLabel = (status: string): string => {
    switch (status) {
      case "pending":
        return t.paymentStatuses.pending;
      case "verified":
        return t.paymentStatuses.verified;
      case "failed":
        return t.paymentStatuses.failed;
      default:
        return status;
    }
  };

  // Format date
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format currency
  const formatCurrency = (amount: number): string => {
    return `RWF ${amount.toLocaleString()}`;
  };

  // Update booking with translation
  const handleUpdateBooking = async () => {
    if (!selectedBooking) return;

    if (!validateEditForm()) {
      showErrorModal(
        t.error || "Error",
        t.validationError || "Please fix all validation errors",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.put(
        `/bookings/${selectedBooking._id}`,
        editFormData,
      );
      let updatedBooking = response.data;

      // Translate updated booking if needed
      if (lang !== "en") {
        try {
          updatedBooking = {
            ...updatedBooking,
            fullName: await translateContent(updatedBooking.fullName, lang),
            email: await translateContent(updatedBooking.email, lang),
            university: await translateContent(updatedBooking.university, lang),
            purpose: await translateContent(updatedBooking.purpose, lang),
            houseName: await translateContent(updatedBooking.houseName, lang),
            houseType: await translateContent(updatedBooking.houseType, lang),
            district: await translateContent(updatedBooking.district, lang),
            sector: await translateContent(updatedBooking.sector, lang),
            cell: await translateContent(updatedBooking.cell, lang),
            village: await translateContent(updatedBooking.village, lang),
            ownerName: await translateContent(updatedBooking.ownerName, lang),
            specialRequests: await translateContent(
              updatedBooking.specialRequests,
              lang,
            ),
            notes: await translateContent(updatedBooking.notes, lang),
          };
        } catch {
          // Use original booking if translation fails
        }
      }

      const transformedBooking = transformBookingToUI(updatedBooking);

      const updatedBookings = bookings.map((b) =>
        b._id === selectedBooking._id ? transformedBooking : b,
      );
      setBookings(updatedBookings);

      showSuccessModal(
        t.success || "Success",
        t.statusUpdated || "Booking status updated successfully!",
      );
      setIsEditModalOpen(false);
      setSelectedBooking(null);
      setEditFormData({
        status: "pending",
        paymentStatus: "pending",
        notes: "",
      });
    } catch (error) {
      showErrorModal(
        t.error || "Error",
        t.statusUpdateFailed || "Failed to update booking status",
      );
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Confirm booking with translation
  const handleConfirmBooking = async () => {
    if (!selectedBooking) return;

    setIsSubmitting(true);

    try {
      const response = await api.put(
        `/bookings/${selectedBooking._id}/status`,
        {
          status: "confirmed",
        },
      );

      let updatedBooking = response.data;

      if (lang !== "en") {
        try {
          updatedBooking = {
            ...updatedBooking,
            fullName: await translateContent(updatedBooking.fullName, lang),
            email: await translateContent(updatedBooking.email, lang),
            university: await translateContent(updatedBooking.university, lang),
            purpose: await translateContent(updatedBooking.purpose, lang),
            houseName: await translateContent(updatedBooking.houseName, lang),
            houseType: await translateContent(updatedBooking.houseType, lang),
            district: await translateContent(updatedBooking.district, lang),
            sector: await translateContent(updatedBooking.sector, lang),
            cell: await translateContent(updatedBooking.cell, lang),
            village: await translateContent(updatedBooking.village, lang),
            ownerName: await translateContent(updatedBooking.ownerName, lang),
            specialRequests: await translateContent(
              updatedBooking.specialRequests,
              lang,
            ),
            notes: await translateContent(updatedBooking.notes, lang),
          };
        } catch {
          // Use original booking if translation fails
        }
      }

      const transformedBooking = transformBookingToUI(updatedBooking);

      const updatedBookings = bookings.map((b) =>
        b._id === selectedBooking._id ? transformedBooking : b,
      );
      setBookings(updatedBookings);

      showSuccessModal(
        t.success || "Success",
        "Booking confirmed successfully!",
      );
      setIsConfirmModalOpen(false);
      setSelectedBooking(null);
    } catch (error) {
      showErrorModal(t.error || "Error", "Failed to confirm booking");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cancel booking with translation
  const handleCancelBooking = async () => {
    if (!selectedBooking) return;

    setIsSubmitting(true);

    try {
      const response = await api.put(`/bookings/${selectedBooking._id}/cancel`);
      let updatedBooking = response.data;

      if (lang !== "en") {
        try {
          updatedBooking = {
            ...updatedBooking,
            fullName: await translateContent(updatedBooking.fullName, lang),
            email: await translateContent(updatedBooking.email, lang),
            university: await translateContent(updatedBooking.university, lang),
            purpose: await translateContent(updatedBooking.purpose, lang),
            houseName: await translateContent(updatedBooking.houseName, lang),
            houseType: await translateContent(updatedBooking.houseType, lang),
            district: await translateContent(updatedBooking.district, lang),
            sector: await translateContent(updatedBooking.sector, lang),
            cell: await translateContent(updatedBooking.cell, lang),
            village: await translateContent(updatedBooking.village, lang),
            ownerName: await translateContent(updatedBooking.ownerName, lang),
            specialRequests: await translateContent(
              updatedBooking.specialRequests,
              lang,
            ),
            notes: await translateContent(updatedBooking.notes, lang),
          };
        } catch {
          // Use original booking if translation fails
        }
      }

      const transformedBooking = transformBookingToUI(updatedBooking);

      const updatedBookings = bookings.map((b) =>
        b._id === selectedBooking._id ? transformedBooking : b,
      );
      setBookings(updatedBookings);

      showSuccessModal(
        t.success || "Success",
        "Booking cancelled successfully!",
      );
      setIsCancelModalOpen(false);
      setSelectedBooking(null);
    } catch (error) {
      showErrorModal(t.error || "Error", "Failed to cancel booking");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Complete booking with translation
  const handleCompleteBooking = async () => {
    if (!selectedBooking) return;

    setIsSubmitting(true);

    try {
      const response = await api.put(
        `/bookings/${selectedBooking._id}/status`,
        {
          status: "completed",
        },
      );

      let updatedBooking = response.data;

      if (lang !== "en") {
        try {
          updatedBooking = {
            ...updatedBooking,
            fullName: await translateContent(updatedBooking.fullName, lang),
            email: await translateContent(updatedBooking.email, lang),
            university: await translateContent(updatedBooking.university, lang),
            purpose: await translateContent(updatedBooking.purpose, lang),
            houseName: await translateContent(updatedBooking.houseName, lang),
            houseType: await translateContent(updatedBooking.houseType, lang),
            district: await translateContent(updatedBooking.district, lang),
            sector: await translateContent(updatedBooking.sector, lang),
            cell: await translateContent(updatedBooking.cell, lang),
            village: await translateContent(updatedBooking.village, lang),
            ownerName: await translateContent(updatedBooking.ownerName, lang),
            specialRequests: await translateContent(
              updatedBooking.specialRequests,
              lang,
            ),
            notes: await translateContent(updatedBooking.notes, lang),
          };
        } catch {
          // Use original booking if translation fails
        }
      }

      const transformedBooking = transformBookingToUI(updatedBooking);

      const updatedBookings = bookings.map((b) =>
        b._id === selectedBooking._id ? transformedBooking : b,
      );
      setBookings(updatedBookings);

      showSuccessModal(t.success || "Success", "Booking marked as completed!");
      setIsCompleteModalOpen(false);
      setSelectedBooking(null);
    } catch (error) {
      showErrorModal(t.error || "Error", "Failed to complete booking");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Verify payment with translation
  const handleVerifyPayment = async () => {
    if (!selectedBooking) return;

    setIsSubmitting(true);

    try {
      const response = await api.put(
        `/bookings/${selectedBooking._id}/verify-payment`,
        {
          paymentStatus: "verified",
        },
      );

      let updatedBooking = response.data;

      if (lang !== "en") {
        try {
          updatedBooking = {
            ...updatedBooking,
            fullName: await translateContent(updatedBooking.fullName, lang),
            email: await translateContent(updatedBooking.email, lang),
            university: await translateContent(updatedBooking.university, lang),
            purpose: await translateContent(updatedBooking.purpose, lang),
            houseName: await translateContent(updatedBooking.houseName, lang),
            houseType: await translateContent(updatedBooking.houseType, lang),
            district: await translateContent(updatedBooking.district, lang),
            sector: await translateContent(updatedBooking.sector, lang),
            cell: await translateContent(updatedBooking.cell, lang),
            village: await translateContent(updatedBooking.village, lang),
            ownerName: await translateContent(updatedBooking.ownerName, lang),
            specialRequests: await translateContent(
              updatedBooking.specialRequests,
              lang,
            ),
            notes: await translateContent(updatedBooking.notes, lang),
          };
        } catch {
          // Use original booking if translation fails
        }
      }

      const transformedBooking = transformBookingToUI(updatedBooking);

      const updatedBookings = bookings.map((b) =>
        b._id === selectedBooking._id ? transformedBooking : b,
      );
      setBookings(updatedBookings);

      showSuccessModal(
        t.success || "Success",
        t.paymentVerified || "Payment verified successfully!",
      );
      setIsVerifyPaymentModalOpen(false);
      setSelectedBooking(null);
    } catch (error) {
      showErrorModal(
        t.error || "Error",
        t.paymentVerificationFailed || "Failed to verify payment",
      );
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open modals
  const openViewModal = (booking: BookingUI) => {
    setSelectedBooking(booking);
    setIsViewModalOpen(true);
  };

  const openEditModal = (booking: BookingUI) => {
    setSelectedBooking(booking);
    setEditFormData({
      status: booking.status,
      paymentStatus: booking.paymentStatus,
      notes: booking.notes || "",
    });
    setFormErrors({});
    setTouchedFields(new Set());
    setIsEditModalOpen(true);
  };

  // Open confirmation modals
  const openConfirmModal = (booking: BookingUI) => {
    setSelectedBooking(booking);
    setIsConfirmModalOpen(true);
  };

  const openCancelModal = (booking: BookingUI) => {
    setSelectedBooking(booking);
    setIsCancelModalOpen(true);
  };

  const openCompleteModal = (booking: BookingUI) => {
    setSelectedBooking(booking);
    setIsCompleteModalOpen(true);
  };

  const openVerifyPaymentModal = (booking: BookingUI) => {
    setSelectedBooking(booking);
    setIsVerifyPaymentModalOpen(true);
  };

  // Modal variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: 30 },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  if (isFetching) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#FF385C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">{t.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Success Modal */}
      <SuccessModal
        isOpen={successModal.isOpen}
        onClose={() => setSuccessModal({ ...successModal, isOpen: false })}
        title={successModal.title}
        message={successModal.message}
        details={successModal.details}
      />

      {/* Error Modal */}
      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ ...errorModal, isOpen: false })}
        title={errorModal.title}
        message={errorModal.message}
        details={errorModal.details}
      />

      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <CalendarTodayIcon className="w-7 h-7 text-[#FF385C]" />
              {t.bookingManagement}
            </h1>
            <p className="text-sm text-gray-500 mt-1">{t.manageBookings}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchBookings}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={isLoading}
            >
              <RefreshIcon
                className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
        >
          <p className="text-xs text-gray-500">{t.total}</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-yellow-50 rounded-xl p-4 shadow-sm border border-yellow-200"
        >
          <p className="text-xs text-yellow-600">{t.pending}</p>
          <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-green-50 rounded-xl p-4 shadow-sm border border-green-200"
        >
          <p className="text-xs text-green-600">{t.confirmed}</p>
          <p className="text-2xl font-bold text-green-700">{stats.confirmed}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-red-50 rounded-xl p-4 shadow-sm border border-red-200"
        >
          <p className="text-xs text-red-600">{t.cancelled}</p>
          <p className="text-2xl font-bold text-red-700">{stats.cancelled}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-blue-50 rounded-xl p-4 shadow-sm border border-blue-200"
        >
          <p className="text-xs text-blue-600">{t.completed}</p>
          <p className="text-2xl font-bold text-blue-700">{stats.completed}</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t.searchBookings}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
            >
              <option value="all">{t.filters.all}</option>
              <option value="pending">{t.filters.pending}</option>
              <option value="confirmed">{t.filters.confirmed}</option>
              <option value="cancelled">{t.filters.cancelled}</option>
              <option value="completed">{t.filters.completed}</option>
            </select>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("all");
              }}
              className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ClearIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  {t.booking}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  {t.guest}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  {t.house}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  {t.status}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  {t.payment}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  {t.checkIn}
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  {t.actions}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    <CalendarTodayIcon className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                    <p>{t.noBookings}</p>
                    <p className="text-sm">{t.adjustFilters}</p>
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <motion.tr
                    key={booking._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#FF385C] text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
                          {booking.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm truncate max-w-[120px]">
                            {booking.fullName}
                          </p>
                          <p className="text-xs text-gray-500 truncate max-w-[120px]">
                            {booking.bookingId}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="text-sm text-gray-600 truncate max-w-[150px]">
                        {booking.email}
                      </p>
                      <p className="text-xs text-gray-400 truncate max-w-[150px]">
                        {booking.phone}
                      </p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="text-sm text-gray-600 truncate max-w-[120px]">
                        {booking.houseName}
                      </p>
                      <p className="text-xs text-gray-400 truncate max-w-[120px]">
                        {booking.houseType}
                      </p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          booking.status,
                        )}`}
                      >
                        {getStatusLabel(booking.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex flex-col gap-0.5">
                        <span
                          className={`px-2 py-0.5 text-xs font-medium rounded-full ${getPaymentStatusColor(
                            booking.paymentStatus,
                          )}`}
                        >
                          {getPaymentStatusLabel(booking.paymentStatus)}
                        </span>
                        <span className="text-xs font-medium text-gray-900">
                          {booking.formattedTotal}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="text-sm text-gray-600">
                        {booking.formattedCheckIn}
                      </p>
                      <p className="text-xs text-gray-400">
                        {booking.formattedCheckOut}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-0.5 flex-nowrap">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openViewModal(booking)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title={t.viewBooking}
                        >
                          <VisibilityIcon className="w-4 h-4" />
                        </motion.button>

                        {booking.status === "pending" && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => openConfirmModal(booking)}
                            className="p-1 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title={t.confirmBooking}
                          >
                            <CheckCircleIcon className="w-4 h-4" />
                          </motion.button>
                        )}
                        {booking.paymentStatus === "pending" && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            disabled
                            onClick={() => openVerifyPaymentModal(booking)}
                            className="p-1 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                            title={t.verifyPayment}
                          >
                            <VerifiedIcon className="w-4 h-4" />
                          </motion.button>
                        )}
                        {booking.status === "pending" && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => openCancelModal(booking)}
                            className="p-1 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                            title={t.cancelBooking}
                          >
                            <CancelIcon className="w-4 h-4" />
                          </motion.button>
                        )}
                        {booking.status === "confirmed" && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => openCompleteModal(booking)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title={t.completedBooking}
                          >
                            <VerifiedIcon className="w-4 h-4" />
                          </motion.button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-500">
            {t.showing} {filteredBookings.length} {t.of} {bookings.length}{" "}
            {t.bookings}
          </p>
        </div>
      </div>

      {/* View Booking Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedBooking && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setIsViewModalOpen(false)}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            >
              <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
                <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
                  <div className="flex items-center gap-2">
                    <CalendarTodayIcon className="text-[#FF385C] w-5 h-5" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      {t.bookingDetails}
                    </h2>
                    <span className="ml-2 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {selectedBooking.bookingId}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsViewModalOpen(false)}
                    className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="p-6 space-y-6">
                  {/* Guest Information */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <PersonIcon className="w-4 h-4 text-[#FF385C]" />
                      {t.guestInformation}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                      <div>
                        <label className="text-xs font-medium text-gray-500">
                          Full Name
                        </label>
                        <p className="text-sm font-medium text-gray-900">
                          {selectedBooking.fullName}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">
                          {t.email}
                        </label>
                        <p className="text-sm text-gray-900 flex items-center gap-1">
                          <EmailIcon className="w-3 h-3 text-gray-400" />
                          {selectedBooking.email}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">
                          {t.phone}
                        </label>
                        <p className="text-sm text-gray-900 flex items-center gap-1">
                          <PhoneIcon className="w-3 h-3 text-gray-400" />
                          {selectedBooking.phone}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">
                          {t.idNumber}
                        </label>
                        <p className="text-sm text-gray-900">
                          {selectedBooking.idNumber || "N/A"}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">
                          {t.university}
                        </label>
                        <p className="text-sm text-gray-900">
                          {selectedBooking.university || "N/A"}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">
                          {t.studentId}
                        </label>
                        <p className="text-sm text-gray-900">
                          {selectedBooking.studentId || "N/A"}
                        </p>
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-xs font-medium text-gray-500">
                          {t.purpose}
                        </label>
                        <p className="text-sm text-gray-900">
                          {selectedBooking.purpose || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* House Information */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <HomeIcon className="w-4 h-4 text-[#FF385C]" />
                      {t.houseInformation}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                      <div>
                        <label className="text-xs font-medium text-gray-500">
                          {t.houseName}
                        </label>
                        <p className="text-sm font-medium text-gray-900">
                          {selectedBooking.houseName}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">
                          {t.houseType}
                        </label>
                        <p className="text-sm text-gray-900">
                          {selectedBooking.houseType || "N/A"}
                        </p>
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-xs font-medium text-gray-500">
                          {t.location}
                        </label>
                        <p className="text-sm text-gray-900">
                          {selectedBooking.district}, {selectedBooking.sector},{" "}
                          {selectedBooking.cell}, {selectedBooking.village}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">
                          {t.owner}
                        </label>
                        <p className="text-sm text-gray-900">
                          {selectedBooking.ownerName || "N/A"}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">
                          Owner Contact
                        </label>
                        <p className="text-sm text-gray-900">
                          {selectedBooking.ownerContact || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Booking Information */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <AssignmentIcon className="w-4 h-4 text-[#FF385C]" />
                      {t.bookingInformation}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
                      <div>
                        <label className="text-xs font-medium text-gray-500">
                          {t.checkIn}
                        </label>
                        <p className="text-sm text-gray-900">
                          {selectedBooking.formattedCheckIn}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">
                          {t.checkOut}
                        </label>
                        <p className="text-sm text-gray-900">
                          {selectedBooking.formattedCheckOut}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">
                          {t.months}
                        </label>
                        <p className="text-sm text-gray-900">
                          {selectedBooking.months}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">
                          {t.guests}
                        </label>
                        <p className="text-sm text-gray-900 flex items-center gap-1">
                          <PeopleIcon className="w-3 h-3 text-gray-400" />
                          {selectedBooking.guests}
                        </p>
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-xs font-medium text-gray-500">
                          {t.specialRequests}
                        </label>
                        <p className="text-sm text-gray-900">
                          {selectedBooking.specialRequests || "None"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <PaymentIcon className="w-4 h-4 text-[#FF385C]" />
                      {t.paymentInformation}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
                      <div>
                        <label className="text-xs font-medium text-gray-500">
                          {t.monthlyRent}
                        </label>
                        <p className="text-sm font-medium text-gray-900">
                          {formatCurrency(selectedBooking.monthlyRent)}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">
                          {t.serviceFee}
                        </label>
                        <p className="text-sm text-gray-900">
                          {formatCurrency(selectedBooking.serviceFee)}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">
                          {t.totalAmount}
                        </label>
                        <p className="text-sm font-bold text-gray-900">
                          {selectedBooking.formattedTotal}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">
                          {t.paymentMethod}
                        </label>
                        <p className="text-sm text-gray-900 capitalize">
                          {selectedBooking.paymentMethod}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">
                          {t.paymentStatus}
                        </label>
                        <span
                          className={`mt-1 px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(selectedBooking.paymentStatus)}`}
                        >
                          {getPaymentStatusLabel(selectedBooking.paymentStatus)}
                        </span>
                      </div>
                      {selectedBooking.momoNumber && (
                        <div>
                          <label className="text-xs font-medium text-gray-500">
                            {t.momoNumber}
                          </label>
                          <p className="text-sm text-gray-900">
                            {selectedBooking.momoNumber}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Notes */}
                  {selectedBooking.notes && (
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.notes}
                      </label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">
                          {selectedBooking.notes}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.createdAt}
                      </label>
                      <p className="text-sm text-gray-900">
                        {formatDate(selectedBooking.createdAt)}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.updatedAt}
                      </label>
                      <p className="text-sm text-gray-900">
                        {formatDate(selectedBooking.updatedAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsViewModalOpen(false);
                        openEditModal(selectedBooking);
                      }}
                      className="flex-1 px-4 py-2.5 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors flex items-center justify-center gap-2"
                    >
                      <EditIcon className="w-4 h-4" />
                      {t.editBooking}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsViewModalOpen(false)}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      {t.close}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditModalOpen && selectedBooking && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setIsEditModalOpen(false)}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            >
              <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
                <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
                  <div className="flex items-center gap-2">
                    <EditIcon className="text-[#FF385C] w-5 h-5" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      {t.editBooking} - {selectedBooking.bookingId}
                    </h2>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsEditModalOpen(false)}
                    className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="p-6 space-y-6">
                  {/* Quick Action Buttons */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {selectedBooking.status === "pending" && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setIsEditModalOpen(false);
                          openConfirmModal(selectedBooking);
                        }}
                        className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-1"
                      >
                        <CheckCircleIcon className="w-4 h-4" />
                        {t.confirmBooking}
                      </motion.button>
                    )}
                    {selectedBooking.paymentStatus === "pending" && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setIsEditModalOpen(false);
                          openVerifyPaymentModal(selectedBooking);
                        }}
                        className="px-3 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-1"
                      >
                        <VerifiedIcon className="w-4 h-4" />
                        {t.verifyPayment}
                      </motion.button>
                    )}
                    {selectedBooking.status === "pending" && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setIsEditModalOpen(false);
                          openCancelModal(selectedBooking);
                        }}
                        className="px-3 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors flex items-center justify-center gap-1"
                      >
                        <CancelIcon className="w-4 h-4" />
                        {t.cancelBooking}
                      </motion.button>
                    )}
                    {selectedBooking.status === "confirmed" && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setIsEditModalOpen(false);
                          openCompleteModal(selectedBooking);
                        }}
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                      >
                        <AssignmentIcon className="w-4 h-4" />
                        {t.completedBooking}
                      </motion.button>
                    )}
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.status} <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={editFormData.status || "pending"}
                        onChange={(e) =>
                          handleEditFormChange("status", e.target.value)
                        }
                        onBlur={() => handleEditFormBlur("status")}
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white ${
                          formErrors.status && touchedFields.has("status")
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="pending">{t.statuses.pending}</option>
                        <option value="confirmed">
                          {t.statuses.confirmed}
                        </option>
                        <option value="cancelled">
                          {t.statuses.cancelled}
                        </option>
                        <option value="completed">
                          {t.statuses.completed}
                        </option>
                      </select>
                      {formErrors.status && touchedFields.has("status") && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <ErrorIcon className="w-3 h-3" />
                          {formErrors.status}
                        </p>
                      )}
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.paymentStatus}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={editFormData.paymentStatus || "pending"}
                        onChange={(e) =>
                          handleEditFormChange("paymentStatus", e.target.value)
                        }
                        onBlur={() => handleEditFormBlur("paymentStatus")}
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white ${
                          formErrors.paymentStatus &&
                          touchedFields.has("paymentStatus")
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="pending">
                          {t.paymentStatuses.pending}
                        </option>
                        <option value="verified">
                          {t.paymentStatuses.verified}
                        </option>
                        <option value="failed">
                          {t.paymentStatuses.failed}
                        </option>
                      </select>
                      {formErrors.paymentStatus &&
                        touchedFields.has("paymentStatus") && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <ErrorIcon className="w-3 h-3" />
                            {formErrors.paymentStatus}
                          </p>
                        )}
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.notes}
                      </label>
                      <textarea
                        value={editFormData.notes || ""}
                        onChange={(e) =>
                          handleEditFormChange("notes", e.target.value)
                        }
                        rows={4}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none"
                        placeholder="Add notes about this booking..."
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleUpdateBooking}
                      disabled={isSubmitting}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 ${
                        isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#FF385C] hover:bg-[#E31C5F]"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {t.saving}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          {t.updateStatus}
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsEditModalOpen(false)}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      {t.cancel}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Confirmation Modals using ConfirmModal */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => {
          setIsConfirmModalOpen(false);
          setSelectedBooking(null);
        }}
        onConfirm={handleConfirmBooking}
        title={t.confirmBooking}
        message={t.confirmConfirmation}
        confirmText={t.confirm}
        cancelText={t.cancel}
        isSubmitting={isSubmitting}
        type="success"
        icon={<CheckCircleIcon className="w-10 h-10" />}
      />

      <ConfirmModal
        isOpen={isCancelModalOpen}
        onClose={() => {
          setIsCancelModalOpen(false);
          setSelectedBooking(null);
        }}
        onConfirm={handleCancelBooking}
        title={t.cancelBooking}
        message={t.cancelConfirmation}
        confirmText={t.confirm}
        cancelText={t.cancel}
        isSubmitting={isSubmitting}
        type="warning"
        icon={<CancelIcon className="w-10 h-10" />}
      />

      <ConfirmModal
        isOpen={isCompleteModalOpen}
        onClose={() => {
          setIsCompleteModalOpen(false);
          setSelectedBooking(null);
        }}
        onConfirm={handleCompleteBooking}
        title={t.completedBooking}
        message={t.completedConfirmation}
        confirmText={t.confirm}
        cancelText={t.cancel}
        isSubmitting={isSubmitting}
        type="info"
        icon={<AssignmentIcon className="w-10 h-10" />}
      />

      <ConfirmModal
        isOpen={isVerifyPaymentModalOpen}
        onClose={() => {
          setIsVerifyPaymentModalOpen(false);
          setSelectedBooking(null);
        }}
        onConfirm={handleVerifyPayment}
        title={t.verifyPayment}
        message={t.verifyPaymentConfirmation}
        confirmText={t.confirm}
        cancelText={t.cancel}
        isSubmitting={isSubmitting}
        type="info"
        icon={<VerifiedIcon className="w-10 h-10" />}
      />
    </div>
  );
};
