// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-hooks/set-state-in-effect */
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Cookies from "js-cookie";

// // Material-UI Icons
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import CloseIcon from "@mui/icons-material/Close";
// import SearchIcon from "@mui/icons-material/Search";
// import RefreshIcon from "@mui/icons-material/Refresh";
// import DeleteIcon from "@mui/icons-material/Delete";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import ClearIcon from "@mui/icons-material/Clear";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import CancelIcon from "@mui/icons-material/Cancel";
// import EditIcon from "@mui/icons-material/Edit";
// import PeopleIcon from "@mui/icons-material/People";
// import HomeIcon from "@mui/icons-material/Home";
// import PaymentIcon from "@mui/icons-material/Payment";
// import Close from "@mui/icons-material/Close";
// import Send from "@mui/icons-material/Send";
// import PhoneIcon from "@mui/icons-material/Phone";
// import EmailIcon from "@mui/icons-material/Email";
// import PersonIcon from "@mui/icons-material/Person";
// import VerifiedIcon from "@mui/icons-material/Verified";
// import ErrorIcon from "@mui/icons-material/Error";

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
//   fullName?: string;
//   email?: string;
//   phone?: string;
//   idNumber?: string;
//   university?: string;
//   studentId?: string;
//   purpose?: string;
//   houseId?: string;
//   houseName?: string;
//   houseType?: string;
//   district?: string;
//   sector?: string;
//   cell?: string;
//   village?: string;
//   ownerName?: string;
//   ownerContact?: string;
//   ownerEmail?: string;
//   checkIn?: string;
//   checkOut?: string;
//   months?: string;
//   guests?: string;
//   monthlyRent?: string;
//   serviceFee?: string;
//   paymentMethod?: string;
//   momoNumber?: string;
// }

// // Translations
// const translations = {
//   en: {
//     bookingManagement: "Booking Management",
//     manageBookings: "Manage all property bookings and reservations",
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
//     deleteBooking: "Delete Booking",
//     deleteConfirmation: "Are you sure you want to delete this booking?",
//     actionUndone: "This action cannot be undone.",
//     cancel: "Cancel",
//     delete: "Delete",
//     deleting: "Deleting...",
//     bookingDeleted: "Booking deleted successfully!",
//     deleteFailed: "Failed to delete booking",
//     statusUpdated: "Booking status updated successfully!",
//     statusUpdateFailed: "Failed to update booking status",
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
//     completedConfirmation: "Are you sure you want to mark this booking as completed?",
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
//     createBooking: "Create New Booking",
//     required: "This field is required",
//     invalidEmail: "Please enter a valid email address",
//     invalidPhone: "Please enter a valid phone number",
//     invalidNumber: "Please enter a valid number",
//     invalidDate: "Please enter a valid date",
//     minValue: "Value must be at least {min}",
//     maxValue: "Value must not exceed {max}",
//     validationError: "Please fix all validation errors",
//     allFieldsVerified: "All fields verified",
//     verifyPayment: "Verify Payment",
//     verifyPaymentConfirmation: "Are you sure you want to verify this payment?",
//     paymentVerified: "Payment verified successfully!",
//     paymentVerificationFailed: "Failed to verify payment",
//     cancelBookingConfirmation: "Are you sure you want to cancel this booking?",
//   },
//   fr: {
//     bookingManagement: "Gestion des Réservations",
//     manageBookings: "Gérer toutes les réservations de propriétés",
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
//     deleteBooking: "Supprimer la Réservation",
//     deleteConfirmation: "Êtes-vous sûr de vouloir supprimer cette réservation ?",
//     actionUndone: "Cette action est irréversible.",
//     cancel: "Annuler",
//     delete: "Supprimer",
//     deleting: "Suppression...",
//     bookingDeleted: "Réservation supprimée avec succès !",
//     deleteFailed: "Échec de la suppression de la réservation",
//     statusUpdated: "Statut de la réservation mis à jour avec succès !",
//     statusUpdateFailed: "Échec de la mise à jour du statut",
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
//     confirmConfirmation: "Êtes-vous sûr de vouloir confirmer cette réservation ?",
//     cancelBooking: "Annuler la Réservation",
//     cancelConfirmation: "Êtes-vous sûr de vouloir annuler cette réservation ?",
//     completedBooking: "Marquer comme Terminé",
//     completedConfirmation: "Êtes-vous sûr de vouloir marquer cette réservation comme terminée ?",
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
//     createBooking: "Créer une Nouvelle Réservation",
//     required: "Ce champ est requis",
//     invalidEmail: "Veuillez entrer une adresse email valide",
//     invalidPhone: "Veuillez entrer un numéro de téléphone valide",
//     invalidNumber: "Veuillez entrer un nombre valide",
//     invalidDate: "Veuillez entrer une date valide",
//     minValue: "La valeur doit être au moins {min}",
//     maxValue: "La valeur ne doit pas dépasser {max}",
//     validationError: "Veuillez corriger toutes les erreurs de validation",
//     allFieldsVerified: "Tous les champs sont vérifiés",
//     verifyPayment: "Vérifier le Paiement",
//     verifyPaymentConfirmation: "Êtes-vous sûr de vouloir vérifier ce paiement ?",
//     paymentVerified: "Paiement vérifié avec succès !",
//     paymentVerificationFailed: "Échec de la vérification du paiement",
//     cancelBookingConfirmation: "Êtes-vous sûr de vouloir annuler cette réservation ?",
//   },
//   rw: {
//     bookingManagement: "Gucunga Ibyanditswe",
//     manageBookings: "Gucunga ibyanditswe byose n'ububiko",
//     total: "Yose",
//     pending: "Bitegereje",
//     confirmed: "Byemejwe",
//     cancelled: "Byahagaritswe",
//     completed: "Byarangiye",
//     searchBookings: "Shakisha ukurikije izina, imeri cyangwa ID y'icyanditswe...",
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
//     deleteBooking: "Kuraho Icyanditswe",
//     deleteConfirmation: "Uri kwizera ko ushaka gukuraho iki cyanditswe?",
//     actionUndone: "Iki gikorwa ntikishobora guhindurwa.",
//     cancel: "Reka",
//     delete: "Kuraho",
//     deleting: "Birakurwaho...",
//     bookingDeleted: "Icyanditswe cyakuweho neza!",
//     deleteFailed: "Kuraho icyanditswe birananiranye",
//     statusUpdated: "Ihagaze ry'icyanditswe ryavuguruwe neza!",
//     statusUpdateFailed: "Kuvugurura ihagaze birananiranye",
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
//     completedConfirmation: "Uri kwizera ko ushaka gushyira iki cyanditswe ku rangiye?",
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
//     createBooking: "Kurema Icyanditswe Gishya",
//     required: "Iki gikurikira kirakenewe",
//     invalidEmail: "Tanga imeri ikoreshwa neza",
//     invalidPhone: "Tanga numero ya telefone ikoreshwa neza",
//     invalidNumber: "Tanga numero ikoreshwa neza",
//     invalidDate: "Tanga itariki ikoreshwa neza",
//     minValue: "Agaciro kagombye kuba byibuze {min}",
//     maxValue: "Agaciro ntikagombye kurenza {max}",
//     validationError: "Kosora amakosa yose yo kwemeza",
//     allFieldsVerified: "Amakosa yose yemejwe",
//     verifyPayment: "Kemeza Amahoro",
//     verifyPaymentConfirmation: "Uri kwizera ko ushaka kwemeza aya mahoro?",
//     paymentVerified: "Amahoro yemejwe neza!",
//     paymentVerificationFailed: "Kwemeza amahoro byananiranye",
//     cancelBookingConfirmation: "Uri kwizera ko ushaka guhagarika iki cyanditswe?",
//   },
// };

// // Helper function to get language from cookies
// const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
//   const lang = Cookies.get("language") as "en" | "fr" | "rw";
//   return lang || "en";
// };

// // API Base URL
// const API_URL = "https://rene-inyumba-nodejs.onrender.com/bookings";

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
//     paymentStatusLabel: paymentStatusLabels[booking.paymentStatus] || booking.paymentStatus,
//     paymentStatusColor: paymentStatusColors[booking.paymentStatus] || "bg-gray-100 text-gray-800",
//     formattedCheckIn: formatDate(booking.checkIn),
//     formattedCheckOut: formatDate(booking.checkOut),
//     formattedTotal: `$${booking.totalAmount.toFixed(2)}`,
//   };
// };

// // Validation functions
// const validateEmail = (email: string): boolean => {
//   const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return re.test(email);
// };

// const validatePhone = (phone: string): boolean => {
//   const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
//   return re.test(phone);
// };

// export const BookingManagement: React.FC = () => {
//   // Get language from cookies
//   const [lang, setLang] = useState<"en" | "fr" | "rw">(
//     getLanguageFromCookies(),
//   );
//   const [bookings, setBookings] = useState<BookingUI[]>([]);
//   const [filteredBookings, setFilteredBookings] = useState<BookingUI[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState<string>("all");

//   // Modal states
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
//   const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
//   const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);
//   const [isImageModalOpen, setIsImageModalOpen] = useState(false);
//   const [isVerifyPaymentModalOpen, setIsVerifyPaymentModalOpen] = useState(false);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState<BookingUI | null>(null);
  
//   // Edit form state
//   const [editFormData, setEditFormData] = useState<Partial<Booking>>({
//     status: "pending",
//     paymentStatus: "pending",
//     notes: "",
//   });

//   // Create form state
//   const [createFormData, setCreateFormData] = useState<Partial<Booking>>({
//     fullName: "",
//     email: "",
//     phone: "",
//     idNumber: "",
//     university: "",
//     studentId: "",
//     purpose: "",
//     houseId: "",
//     houseName: "",
//     houseType: "",
//     district: "",
//     sector: "",
//     cell: "",
//     village: "",
//     ownerName: "",
//     ownerContact: "",
//     ownerEmail: "",
//     checkIn: "",
//     checkOut: "",
//     months: 1,
//     guests: 1,
//     specialRequests: "",
//     monthlyRent: 0,
//     serviceFee: 0,
//     totalAmount: 0,
//     paymentMethod: "momo",
//     momoNumber: "",
//     paymentStatus: "pending",
//     status: "pending",
//     notes: "",
//   });

//   const [formErrors, setFormErrors] = useState<FormErrors>({});
//   const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
//   const [isFormValid, setIsFormValid] = useState(false);

//   // Loading states
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isFetching, setIsFetching] = useState(true);

//   // Statistics
//   const [stats, setStats] = useState({
//     total: 0,
//     pending: 0,
//     confirmed: 0,
//     cancelled: 0,
//     completed: 0,
//   });

//   const t = translations[lang];

//   // Fetch bookings from API
//   const fetchBookings = async () => {
//     setIsFetching(true);
//     try {
//       const response = await fetch(API_URL);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const result = await response.json();
      
//       let bookingsData: Booking[] = [];
//       if (result.success && Array.isArray(result.data)) {
//         bookingsData = result.data;
//       } else if (Array.isArray(result)) {
//         bookingsData = result;
//       } else if (result.data && Array.isArray(result.data)) {
//         bookingsData = result.data;
//       } else if (result.bookings && Array.isArray(result.bookings)) {
//         bookingsData = result.bookings;
//       }
      
//       const transformedBookings = bookingsData.map((booking: Booking) => transformBookingToUI(booking));
//       setBookings(transformedBookings);
//     } catch (error) {
//       console.error("Error fetching bookings:", error);
//       toast.error(`❌ ${t.fetchError}`);
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   // Validate create form
//   const validateCreateForm = (): boolean => {
//     const errors: FormErrors = {};
//     let isValid = true;

//     // Full Name validation
//     if (!createFormData.fullName || createFormData.fullName.trim().length < 2) {
//       errors.fullName = t.required;
//       isValid = false;
//     }

//     // Email validation
//     if (!createFormData.email) {
//       errors.email = t.required;
//       isValid = false;
//     } else if (!validateEmail(createFormData.email)) {
//       errors.email = t.invalidEmail;
//       isValid = false;
//     }

//     // Phone validation
//     if (!createFormData.phone) {
//       errors.phone = t.required;
//       isValid = false;
//     } else if (!validatePhone(createFormData.phone)) {
//       errors.phone = t.invalidPhone;
//       isValid = false;
//     }

//     // ID Number validation
//     if (!createFormData.idNumber || createFormData.idNumber.trim().length < 3) {
//       errors.idNumber = t.required;
//       isValid = false;
//     }

//     // University validation
//     if (!createFormData.university || createFormData.university.trim().length < 2) {
//       errors.university = t.required;
//       isValid = false;
//     }

//     // Student ID validation
//     if (!createFormData.studentId || createFormData.studentId.trim().length < 2) {
//       errors.studentId = t.required;
//       isValid = false;
//     }

//     // Purpose validation
//     if (!createFormData.purpose || createFormData.purpose.trim().length < 2) {
//       errors.purpose = t.required;
//       isValid = false;
//     }

//     // House Name validation
//     if (!createFormData.houseName || createFormData.houseName.trim().length < 2) {
//       errors.houseName = t.required;
//       isValid = false;
//     }

//     // House Type validation
//     if (!createFormData.houseType || createFormData.houseType.trim().length < 2) {
//       errors.houseType = t.required;
//       isValid = false;
//     }

//     // Location validations
//     if (!createFormData.district || createFormData.district.trim().length < 2) {
//       errors.district = t.required;
//       isValid = false;
//     }
//     if (!createFormData.sector || createFormData.sector.trim().length < 2) {
//       errors.sector = t.required;
//       isValid = false;
//     }
//     if (!createFormData.cell || createFormData.cell.trim().length < 2) {
//       errors.cell = t.required;
//       isValid = false;
//     }
//     if (!createFormData.village || createFormData.village.trim().length < 2) {
//       errors.village = t.required;
//       isValid = false;
//     }

//     // Owner validations
//     if (!createFormData.ownerName || createFormData.ownerName.trim().length < 2) {
//       errors.ownerName = t.required;
//       isValid = false;
//     }
//     if (!createFormData.ownerContact || createFormData.ownerContact.trim().length < 5) {
//       errors.ownerContact = t.required;
//       isValid = false;
//     }
//     if (!createFormData.ownerEmail) {
//       errors.ownerEmail = t.required;
//       isValid = false;
//     } else if (!validateEmail(createFormData.ownerEmail)) {
//       errors.ownerEmail = t.invalidEmail;
//       isValid = false;
//     }

//     // Check In validation
//     if (!createFormData.checkIn) {
//       errors.checkIn = t.required;
//       isValid = false;
//     }

//     // Check Out validation
//     if (!createFormData.checkOut) {
//       errors.checkOut = t.required;
//       isValid = false;
//     } else if (createFormData.checkIn && createFormData.checkOut) {
//       const checkInDate = new Date(createFormData.checkIn);
//       const checkOutDate = new Date(createFormData.checkOut);
//       if (checkOutDate <= checkInDate) {
//         errors.checkOut = "Check out must be after check in";
//         isValid = false;
//       }
//     }

//     // Months validation
//     if (!createFormData.months || createFormData.months < 1) {
//       errors.months = t.required;
//       isValid = false;
//     }

//     // Guests validation
//     if (!createFormData.guests || createFormData.guests < 1) {
//       errors.guests = t.required;
//       isValid = false;
//     }

//     // Monthly Rent validation
//     if (!createFormData.monthlyRent || createFormData.monthlyRent <= 0) {
//       errors.monthlyRent = t.required;
//       isValid = false;
//     }

//     // Service Fee validation
//     if (createFormData.serviceFee === undefined || createFormData.serviceFee < 0) {
//       errors.serviceFee = t.required;
//       isValid = false;
//     }

//     // Payment Method validation
//     if (!createFormData.paymentMethod) {
//       errors.paymentMethod = t.required;
//       isValid = false;
//     }

//     // MoMo Number validation (required if payment method is momo)
//     if (createFormData.paymentMethod === "momo" && (!createFormData.momoNumber || createFormData.momoNumber.trim().length < 5)) {
//       errors.momoNumber = t.required;
//       isValid = false;
//     }

//     setFormErrors(errors);
//     setIsFormValid(isValid);
//     return isValid;
//   };

//   // Handle create form field changes
//   const handleCreateFormChange = (field: keyof Booking, value: any) => {
//     setCreateFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));

//     // Mark field as touched
//     setTouchedFields((prev) => new Set(prev).add(field));

//     // Auto-calculate total amount
//     if (field === "monthlyRent" || field === "serviceFee" || field === "months") {
//       const monthlyRent = field === "monthlyRent" ? value : createFormData.monthlyRent || 0;
//       const serviceFee = field === "serviceFee" ? value : createFormData.serviceFee || 0;
//       const months = field === "months" ? value : createFormData.months || 1;
//       const totalAmount = (monthlyRent * months) + serviceFee;
//       setCreateFormData((prev) => ({
//         ...prev,
//         totalAmount,
//       }));
//     }
//   };

//   // Handle create form blur
//   const handleCreateFormBlur = (field: string) => {
//     setTouchedFields((prev) => new Set(prev).add(field));
//     validateCreateForm();
//   };

//   // Create booking
//   const handleCreateBooking = async () => {
//     if (!validateCreateForm()) {
//       toast.error(`❌ ${t.validationError}`);
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(createFormData),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const newBooking = await response.json();
//       const transformedBooking = transformBookingToUI(newBooking);
//       setBookings((prev) => [transformedBooking, ...prev]);

//       toast.success(`✅ Booking created successfully!`);
//       setIsCreateModalOpen(false);
//       resetCreateForm();
//     } catch (error) {
//       toast.error(`❌ Failed to create booking`);
//       console.error("Create booking error:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Reset create form
//   const resetCreateForm = () => {
//     setCreateFormData({
//       fullName: "",
//       email: "",
//       phone: "",
//       idNumber: "",
//       university: "",
//       studentId: "",
//       purpose: "",
//       houseId: "",
//       houseName: "",
//       houseType: "",
//       district: "",
//       sector: "",
//       cell: "",
//       village: "",
//       ownerName: "",
//       ownerContact: "",
//       ownerEmail: "",
//       checkIn: "",
//       checkOut: "",
//       months: 1,
//       guests: 1,
//       specialRequests: "",
//       monthlyRent: 0,
//       serviceFee: 0,
//       totalAmount: 0,
//       paymentMethod: "momo",
//       momoNumber: "",
//       paymentStatus: "pending",
//       status: "pending",
//       notes: "",
//     });
//     setFormErrors({});
//     setTouchedFields(new Set());
//     setIsFormValid(false);
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
//   }, []);

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
//     return `$${amount.toFixed(2)}`;
//   };

//   // CRUD Operations - Following the routes
//   const handleUpdateBooking = async () => {
//     if (!selectedBooking) return;

//     setIsSubmitting(true);

//     try {
//       const response = await fetch(`${API_URL}/${selectedBooking._id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(editFormData),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const updatedBooking = await response.json();
//       const transformedBooking = transformBookingToUI(updatedBooking);

//       const updatedBookings = bookings.map((b) =>
//         b._id === selectedBooking._id ? transformedBooking : b
//       );
//       setBookings(updatedBookings);

//       toast.success(`✅ ${t.statusUpdated}`);
//       setIsEditModalOpen(false);
//       setSelectedBooking(null);
//       setEditFormData({ status: "pending", paymentStatus: "pending", notes: "" });
//     } catch (error) {
//       toast.error(`❌ ${t.statusUpdateFailed}`);
//       console.error("Update booking error:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDeleteBooking = async () => {
//     if (!selectedBooking) return;

//     setIsLoading(true);

//     try {
//       const response = await fetch(`${API_URL}/${selectedBooking._id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       setBookings(bookings.filter((b) => b._id !== selectedBooking._id));
//       toast.success(`🗑️ ${t.bookingDeleted}`);
//       setIsDeleteModalOpen(false);
//       setSelectedBooking(null);
//     } catch (error) {
//       toast.error(`❌ ${t.deleteFailed}`);
//       console.error("Delete booking error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleConfirmBooking = async () => {
//     if (!selectedBooking) return;

//     setIsSubmitting(true);

//     try {
//       const response = await fetch(`${API_URL}/${selectedBooking._id}/status`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ status: "confirmed" }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const updatedBooking = await response.json();
//       const transformedBooking = transformBookingToUI(updatedBooking);

//       const updatedBookings = bookings.map((b) =>
//         b._id === selectedBooking._id ? transformedBooking : b
//       );
//       setBookings(updatedBookings);

//       toast.success(`✅ Booking confirmed successfully!`);
//       setIsConfirmModalOpen(false);
//       setSelectedBooking(null);
//     } catch (error) {
//       toast.error(`❌ Failed to confirm booking`);
//       console.error("Confirm booking error:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleCancelBooking = async () => {
//     if (!selectedBooking) return;

//     setIsSubmitting(true);

//     try {
//       // Using the cancel route
//       const response = await fetch(`${API_URL}/${selectedBooking._id}/cancel`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const updatedBooking = await response.json();
//       const transformedBooking = transformBookingToUI(updatedBooking);

//       const updatedBookings = bookings.map((b) =>
//         b._id === selectedBooking._id ? transformedBooking : b
//       );
//       setBookings(updatedBookings);

//       toast.success(`✅ Booking cancelled successfully!`);
//       setIsCancelModalOpen(false);
//       setSelectedBooking(null);
//     } catch (error) {
//       toast.error(`❌ Failed to cancel booking`);
//       console.error("Cancel booking error:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleCompleteBooking = async () => {
//     if (!selectedBooking) return;

//     setIsSubmitting(true);

//     try {
//       const response = await fetch(`${API_URL}/${selectedBooking._id}/status`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ status: "completed" }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const updatedBooking = await response.json();
//       const transformedBooking = transformBookingToUI(updatedBooking);

//       const updatedBookings = bookings.map((b) =>
//         b._id === selectedBooking._id ? transformedBooking : b
//       );
//       setBookings(updatedBookings);

//       toast.success(`✅ Booking marked as completed!`);
//       setIsCompletedModalOpen(false);
//       setSelectedBooking(null);
//     } catch (error) {
//       toast.error(`❌ Failed to complete booking`);
//       console.error("Complete booking error:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleVerifyPayment = async () => {
//     if (!selectedBooking) return;

//     setIsSubmitting(true);

//     try {
//       const response = await fetch(`${API_URL}/${selectedBooking._id}/verify-payment`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ paymentStatus: "verified" }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const updatedBooking = await response.json();
//       const transformedBooking = transformBookingToUI(updatedBooking);

//       const updatedBookings = bookings.map((b) =>
//         b._id === selectedBooking._id ? transformedBooking : b
//       );
//       setBookings(updatedBookings);

//       toast.success(`✅ ${t.paymentVerified}`);
//       setIsVerifyPaymentModalOpen(false);
//       setSelectedBooking(null);
//     } catch (error) {
//       toast.error(`❌ ${t.paymentVerificationFailed}`);
//       console.error("Verify payment error:", error);
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
//     setIsEditModalOpen(true);
//   };

//   const openDeleteModal = (booking: BookingUI) => {
//     setSelectedBooking(booking);
//     setIsDeleteModalOpen(true);
//   };

//   const openConfirmModal = (booking: BookingUI) => {
//     setSelectedBooking(booking);
//     setIsConfirmModalOpen(true);
//   };

//   const openCancelModal = (booking: BookingUI) => {
//     setSelectedBooking(booking);
//     setIsCancelModalOpen(true);
//   };

//   const openCompletedModal = (booking: BookingUI) => {
//     setSelectedBooking(booking);
//     setIsCompletedModalOpen(true);
//   };

//   const openVerifyPaymentModal = (booking: BookingUI) => {
//     setSelectedBooking(booking);
//     setIsVerifyPaymentModalOpen(true);
//   };

//   const openCreateModal = () => {
//     resetCreateForm();
//     setIsCreateModalOpen(true);
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
//               onClick={openCreateModal}
//               className="px-4 py-2 bg-[#FF385C] text-white rounded-lg hover:bg-[#E31C5F] transition-colors flex items-center gap-2 text-sm font-medium"
//             >
//               <CalendarTodayIcon className="w-4 h-4" />
//               {t.createBooking}
//             </button>
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

//       {/* Bookings Table - Single Line Display */}
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
//                   <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
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
//                       <p className="text-sm text-gray-600">{booking.formattedCheckIn}</p>
//                       <p className="text-xs text-gray-400">{booking.formattedCheckOut}</p>
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
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={() => openEditModal(booking)}
//                           className="p-1 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
//                           title={t.editBooking}
//                         >
//                           <EditIcon className="w-4 h-4" />
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
//                             onClick={() => openCompletedModal(booking)}
//                             className="p-1 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
//                             title={t.completedBooking}
//                           >
//                             <AssignmentIcon className="w-4 h-4" />
//                           </motion.button>
//                         )}
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={() => openDeleteModal(booking)}
//                           className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                           title={t.deleteBooking}
//                         >
//                           <DeleteIcon className="w-4 h-4" />
//                         </motion.button>
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

//       {/* Create Booking Modal */}
//       <AnimatePresence>
//         {isCreateModalOpen && (
//           <>
//             <motion.div
//               variants={overlayVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
//               onClick={() => setIsCreateModalOpen(false)}
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
//                       {t.createBooking}
//                     </h2>
//                     {isFormValid && touchedFields.size > 0 && (
//                       <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
//                         <VerifiedIcon className="w-3 h-3" />
//                         {t.allFieldsVerified}
//                       </span>
//                     )}
//                   </div>
//                   <motion.button
//                     whileHover={{ rotate: 90, scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => setIsCreateModalOpen(false)}
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
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Full Name <span className="text-red-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <input
//                             type="text"
//                             value={createFormData.fullName || ""}
//                             onChange={(e) => handleCreateFormChange("fullName", e.target.value)}
//                             onBlur={() => handleCreateFormBlur("fullName")}
//                             className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
//                               formErrors.fullName && touchedFields.has("fullName") ? "border-red-500" : "border-gray-300"
//                             }`}
//                             placeholder="Enter guest full name"
//                           />
//                           {touchedFields.has("fullName") && !formErrors.fullName && (
//                             <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
//                           )}
//                         </div>
//                         {formErrors.fullName && touchedFields.has("fullName") && (
//                           <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
//                             <ErrorIcon className="w-3 h-3" />
//                             {formErrors.fullName}
//                           </p>
//                         )}
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           {t.email} <span className="text-red-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <input
//                             type="email"
//                             value={createFormData.email || ""}
//                             onChange={(e) => handleCreateFormChange("email", e.target.value)}
//                             onBlur={() => handleCreateFormBlur("email")}
//                             className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
//                               formErrors.email && touchedFields.has("email") ? "border-red-500" : "border-gray-300"
//                             }`}
//                             placeholder="Enter guest email"
//                           />
//                           {touchedFields.has("email") && !formErrors.email && createFormData.email && (
//                             <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
//                           )}
//                         </div>
//                         {formErrors.email && touchedFields.has("email") && (
//                           <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
//                             <ErrorIcon className="w-3 h-3" />
//                             {formErrors.email}
//                           </p>
//                         )}
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           {t.phone} <span className="text-red-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <input
//                             type="tel"
//                             value={createFormData.phone || ""}
//                             onChange={(e) => handleCreateFormChange("phone", e.target.value)}
//                             onBlur={() => handleCreateFormBlur("phone")}
//                             className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
//                               formErrors.phone && touchedFields.has("phone") ? "border-red-500" : "border-gray-300"
//                             }`}
//                             placeholder="Enter guest phone number"
//                           />
//                           {touchedFields.has("phone") && !formErrors.phone && createFormData.phone && (
//                             <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
//                           )}
//                         </div>
//                         {formErrors.phone && touchedFields.has("phone") && (
//                           <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
//                             <ErrorIcon className="w-3 h-3" />
//                             {formErrors.phone}
//                           </p>
//                         )}
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           {t.idNumber} <span className="text-red-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <input
//                             type="text"
//                             value={createFormData.idNumber || ""}
//                             onChange={(e) => handleCreateFormChange("idNumber", e.target.value)}
//                             onBlur={() => handleCreateFormBlur("idNumber")}
//                             className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
//                               formErrors.idNumber && touchedFields.has("idNumber") ? "border-red-500" : "border-gray-300"
//                             }`}
//                             placeholder="Enter ID number"
//                           />
//                           {touchedFields.has("idNumber") && !formErrors.idNumber && createFormData.idNumber && (
//                             <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
//                           )}
//                         </div>
//                         {formErrors.idNumber && touchedFields.has("idNumber") && (
//                           <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
//                             <ErrorIcon className="w-3 h-3" />
//                             {formErrors.idNumber}
//                           </p>
//                         )}
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           {t.university} <span className="text-red-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <input
//                             type="text"
//                             value={createFormData.university || ""}
//                             onChange={(e) => handleCreateFormChange("university", e.target.value)}
//                             onBlur={() => handleCreateFormBlur("university")}
//                             className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
//                               formErrors.university && touchedFields.has("university") ? "border-red-500" : "border-gray-300"
//                             }`}
//                             placeholder="Enter university name"
//                           />
//                           {touchedFields.has("university") && !formErrors.university && createFormData.university && (
//                             <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
//                           )}
//                         </div>
//                         {formErrors.university && touchedFields.has("university") && (
//                           <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
//                             <ErrorIcon className="w-3 h-3" />
//                             {formErrors.university}
//                           </p>
//                         )}
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           {t.studentId} <span className="text-red-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <input
//                             type="text"
//                             value={createFormData.studentId || ""}
//                             onChange={(e) => handleCreateFormChange("studentId", e.target.value)}
//                             onBlur={() => handleCreateFormBlur("studentId")}
//                             className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
//                               formErrors.studentId && touchedFields.has("studentId") ? "border-red-500" : "border-gray-300"
//                             }`}
//                             placeholder="Enter student ID"
//                           />
//                           {touchedFields.has("studentId") && !formErrors.studentId && createFormData.studentId && (
//                             <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
//                           )}
//                         </div>
//                         {formErrors.studentId && touchedFields.has("studentId") && (
//                           <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
//                             <ErrorIcon className="w-3 h-3" />
//                             {formErrors.studentId}
//                           </p>
//                         )}
//                       </div>
//                       <div className="md:col-span-2">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           {t.purpose} <span className="text-red-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <input
//                             type="text"
//                             value={createFormData.purpose || ""}
//                             onChange={(e) => handleCreateFormChange("purpose", e.target.value)}
//                             onBlur={() => handleCreateFormBlur("purpose")}
//                             className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
//                               formErrors.purpose && touchedFields.has("purpose") ? "border-red-500" : "border-gray-300"
//                             }`}
//                             placeholder="Enter purpose of booking"
//                           />
//                           {touchedFields.has("purpose") && !formErrors.purpose && createFormData.purpose && (
//                             <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
//                           )}
//                         </div>
//                         {formErrors.purpose && touchedFields.has("purpose") && (
//                           <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
//                             <ErrorIcon className="w-3 h-3" />
//                             {formErrors.purpose}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* House Information */}
//                   <div>
//                     <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                       <HomeIcon className="w-4 h-4 text-[#FF385C]" />
//                       {t.houseInformation}
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           {t.houseName} <span className="text-red-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <input
//                             type="text"
//                             value={createFormData.houseName || ""}
//                             onChange={(e) => handleCreateFormChange("houseName", e.target.value)}
//                             onBlur={() => handleCreateFormBlur("houseName")}
//                             className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
//                               formErrors.houseName && touchedFields.has("houseName") ? "border-red-500" : "border-gray-300"
//                             }`}
//                             placeholder="Enter house name"
//                           />
//                           {touchedFields.has("houseName") && !formErrors.houseName && createFormData.houseName && (
//                             <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
//                           )}
//                         </div>
//                         {formErrors.houseName && touchedFields.has("houseName") && (
//                           <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
//                             <ErrorIcon className="w-3 h-3" />
//                             {formErrors.houseName}
//                           </p>
//                         )}
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           {t.houseType} <span className="text-red-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <input
//                             type="text"
//                             value={createFormData.houseType || ""}
//                             onChange={(e) => handleCreateFormChange("houseType", e.target.value)}
//                             onBlur={() => handleCreateFormBlur("houseType")}
//                             className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
//                               formErrors.houseType && touchedFields.has("houseType") ? "border-red-500" : "border-gray-300"
//                             }`}
//                             placeholder="Enter house type (e.g., Apartment, Villa)"
//                           />
//                           {touchedFields.has("houseType") && !formErrors.houseType && createFormData.houseType && (
//                             <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
//                           )}
//                         </div>
//                         {formErrors.houseType && touchedFields.has("houseType") && (
//                           <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
//                             <ErrorIcon className="w-3 h-3" />
//                             {formErrors.houseType}
//                           </p>
//                         )}
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           District <span className="text-red-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <input
//                             type="text"
//                             value={createFormData.district || ""}
//                             onChange={(e) => handleCreateFormChange("district", e.target.value)}
//                             onBlur={() => handleCreateFormBlur("district")}
//                             className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
//                               formErrors.district && touchedFields.has("district") ? "border-red-500" : "border-gray-300"
//                             }`}
//                             placeholder="Enter district"
//                           />
//                           {touchedFields.has("district") && !formErrors.district && createFormData.district && (
//                             <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
//                           )}
//                         </div>
//                         {formErrors.district && touchedFields.has("district") && (
//                           <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
//                             <ErrorIcon className="w-3 h-3" />
//                             {formErrors.district}
//                           </p>
//                         )}
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Sector <span className="text-red-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <input
//                             type="text"
//                             value={createFormData.sector || ""}
//                             onChange={(e) => handleCreateFormChange("sector", e.target.value)}
//                             onBlur={() => handleCreateFormBlur("sector")}
//                             className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
//                               formErrors.sector && touchedFields.has("sector") ? "border-red-500" : "border-gray-300"
//                             }`}
//                             placeholder="Enter sector"
//                           />
//                           {touchedFields.has("sector") && !formErrors.sector && createFormData.sector && (
//                             <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
//                           )}
//                         </div>
//                         {formErrors.sector && touchedFields.has("sector") && (
//                           <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
//                             <ErrorIcon className="w-3 h-3" />
//                             {formErrors.sector}
//                           </p>
//                         )}
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Cell <span className="text-red-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <input
//                             type="text"
//                             value={createFormData.cell || ""}
//                             onChange={(e) => handleCreateFormChange("cell", e.target.value)}
//                             onBlur={() => handleCreateFormBlur("cell")}
//                             className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
//                               formErrors.cell && touchedFields.has("cell") ? "border-red-500" : "border-gray-300"
//                             }`}
//                             placeholder="Enter cell"
//                           />
//                           {touchedFields.has("cell") && !formErrors.cell && createFormData.cell && (
//                             <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
//                           )}
//                         </div>
//                         {formErrors.cell && touchedFields.has("cell") && (
//                           <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
//                             <ErrorIcon className="w-3 h-3" />
//                             {formErrors.cell}
//                           </p>
//                         )}
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Village <span className="text-red-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <input
//                             type="text"
//                             value={createFormData.village || ""}
//                             onChange={(e) => handleCreateFormChange("village", e.target.value)}
//                             onBlur={() => handleCreateFormBlur("village")}
//                             className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
//                               formErrors.village && touchedFields.has("village") ? "border-red-500" : "border-gray-300"
//                             }`}
//                             placeholder="Enter village"
//                           />
//                           {touchedFields.has("village") && !formErrors.village && createFormData.village && (
//                             <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
//                           )}
//                         </div>
//                         {formErrors.village && touchedFields.has("village") && (
//                           <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
//                             <ErrorIcon className="w-3 h-3" />
//                             {formErrors.village}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Owner Information */}
//                   <div>
//                     <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                       <PersonIcon className="w-4 h-4 text-[#FF385C]" />
//                       {t.owner}
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Owner Name <span className="text-red-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <input
//                             type="text"
//                             value={createFormData.ownerName || ""}
//                             onChange={(e) => handleCreateFormChange("ownerName", e.target.value)}
//                             onBlur={() => handleCreateFormBlur("ownerName")}
//                             className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
//                               formErrors.ownerName && touchedFields.has("ownerName") ? "border-red-500" : "border-gray-300"
//                             }`}
//                             placeholder="Enter owner name"
//                           />
//                           {touchedFields.has("ownerName") && !formErrors.ownerName && createFormData.ownerName && (
//                             <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
//                           )}
//                         </div>
//                         {formErrors.ownerName && touchedFields.has("ownerName") && (
//                           <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
//                             <ErrorIcon className="w-3 h-3" />
//                             {formErrors.ownerName}
//                           </p>
//                         )}
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Owner Contact <span className="text-red-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <input
//                             type="text"
//                             value={createFormData.ownerContact || ""}
//                             onChange={(e) => handleCreateFormChange("ownerContact", e.target.value)}
//                             onBlur={() => handleCreateFormBlur("ownerContact")}
//                             className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
//                               formErrors.ownerContact && touchedFields.has("ownerContact") ? "border-red-500" : "border-gray-300"
//                             }`}
//                             placeholder="Enter owner contact"
//                           />
//                           {touchedFields.has("ownerContact") && !formErrors.ownerContact && createFormData.ownerContact && (
//                             <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
//                           )}
//                         </div>
//                         {formErrors.ownerContact && touchedFields.has("ownerContact") && (
//                           <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
//                             <ErrorIcon className="w-3 h-3" />
//                             {formErrors.ownerContact}
//                           </p>
//                         )}
//                       </div>
//                       <div className="md:col-span-2">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Owner Email <span className="text-red-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <input
//                             type="email"
//                             value={createFormData.ownerEmail || ""}
//                             onChange={(e) => handleCreateFormChange("ownerEmail", e.target.value)}
//                             onBlur={() => handleCreateFormBlur("ownerEmail")}
//                             className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
//                               formErrors.ownerEmail && touchedFields.has("ownerEmail") ? "border-red-500" : "border-gray-300"
//                             }`}
//                             placeholder="Enter owner email"
//                           />
//                           {touchedFields.has("ownerEmail") && !formErrors.ownerEmail && createFormData.ownerEmail && (
//                             <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
//                           )}
//                         </div>
//                         {formErrors.ownerEmail && touchedFields.has("ownerEmail") && (
//                           <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
//                             <ErrorIcon className="w-3 h-3" />
//                             {formErrors.ownerEmail}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Booking Details */}
//                   <div>
//                     <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                       <AssignmentIcon className="w-4 h-4 text-[#FF385C]" />
//                       {t.bookingInformation}
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           {t.checkIn} <span className="text-red-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <input
//                             type="date"
//                             value={createFormData.checkIn || ""}
//                             onChange={(e) => handleCreateFormChange("checkIn", e.target.value)}
//                             onBlur={() => handleCreateFormBlur("checkIn")}
//                             className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
//                               formErrors.checkIn && touchedFields.has("checkIn") ? "border-red-500" : "border-gray-300"
//                             }`}
//                           />
//                           {touchedFields.has("checkIn") && !formErrors.checkIn && createFormData.checkIn && (
//                             <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
//                           )}
//                         </div>
//                         {formErrors.checkIn && touchedFields.has("checkIn") && (
//                           <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
//                             <ErrorIcon className="w-3 h-3" />
//                             {formErrors.checkIn}
//                           </p>
//                         )}
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           {t.checkOut} <span className="text-red-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <input
//                             type="date"
//                             value={createFormData.checkOut || ""}
//                             onChange={(e) => handleCreateFormChange("checkOut", e.target.value)}
//                             onBlur={() => handleCreateFormBlur("checkOut")}
//                             className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
//                               formErrors.checkOut && touchedFields.has("checkOut") ? "border-red-500" : "border-gray-300"
//                             }`}
//                           />
//                           {touchedFields.has("checkOut") && !formErrors.checkOut && createFormData.checkOut && (
//                             <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
//                           )}
//                         </div>
//                         {formErrors.checkOut && touchedFields.has("checkOut") && (
//                           <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
//                             <ErrorIcon className="w-3 h-3" />
//                             {formErrors.checkOut}
//                           </p>
//                         )}
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           {t.months} <span className="text-red-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <input
//                             type="number"
//                             min="1"
//                             max="24"
//                             value={createFormData.months || ""}
//                             onChange={(e) => handleCreateFormChange("months", parseInt(e.target.value) || 0)}
//                             onBlur={() => handleCreateFormBlur("months")}
//                             className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
//                               formErrors.months && touchedFields.has("months") ? "border-red-500" : "border-gray-300"
//                             }`}
//                             placeholder="Number of months"
//                           />
//                           {touchedFields.has("months") && !formErrors.months && createFormData.months && createFormData.months > 0 && (
//                             <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
//                           )}
//                         </div>
//                         {formErrors.months && touchedFields.has("months") && (
//                           <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
//                             <ErrorIcon className="w-3 h-3" />
//                             {formErrors.months}
//                           </p>
//                         )}
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           {t.guests} <span className="text-red-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <input
//                             type="number"
//                             min="1"
//                             max="20"
//                             value={createFormData.guests || ""}
//                             onChange={(e) => handleCreateFormChange("guests", parseInt(e.target.value) || 0)}
//                             onBlur={() => handleCreateFormBlur("guests")}
//                             className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
//                               formErrors.guests && touchedFields.has("guests") ? "border-red-500" : "border-gray-300"
//                             }`}
//                             placeholder="Number of guests"
//                           />
//                           {touchedFields.has("guests") && !formErrors.guests && createFormData.guests && createFormData.guests > 0 && (
//                             <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
//                           )}
//                         </div>
//                         {formErrors.guests && touchedFields.has("guests") && (
//                           <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
//                             <ErrorIcon className="w-3 h-3" />
//                             {formErrors.guests}
//                           </p>
//                         )}
//                       </div>
//                       <div className="md:col-span-3">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           {t.specialRequests}
//                         </label>
//                         <textarea
//                           value={createFormData.specialRequests || ""}
//                           onChange={(e) => handleCreateFormChange("specialRequests", e.target.value)}
//                           rows={2}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none"
//                           placeholder="Any special requests?"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Payment Information */}
//                   <div>
//                     <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                       <PaymentIcon className="w-4 h-4 text-[#FF385C]" />
//                       {t.paymentInformation}
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           {t.monthlyRent} <span className="text-red-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <input
//                             type="number"
//                             min="0"
//                             step="1000"
//                             value={createFormData.monthlyRent || ""}
//                             onChange={(e) => handleCreateFormChange("monthlyRent", parseFloat(e.target.value) || 0)}
//                             onBlur={() => handleCreateFormBlur("monthlyRent")}
//                             className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
//                               formErrors.monthlyRent && touchedFields.has("monthlyRent") ? "border-red-500" : "border-gray-300"
//                             }`}
//                             placeholder="Monthly rent amount"
//                           />
//                           {touchedFields.has("monthlyRent") && !formErrors.monthlyRent && createFormData.monthlyRent && createFormData.monthlyRent > 0 && (
//                             <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
//                           )}
//                         </div>
//                         {formErrors.monthlyRent && touchedFields.has("monthlyRent") && (
//                           <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
//                             <ErrorIcon className="w-3 h-3" />
//                             {formErrors.monthlyRent}
//                           </p>
//                         )}
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           {t.serviceFee} <span className="text-red-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <input
//                             type="number"
//                             min="0"
//                             step="100"
//                             value={createFormData.serviceFee || ""}
//                             onChange={(e) => handleCreateFormChange("serviceFee", parseFloat(e.target.value) || 0)}
//                             onBlur={() => handleCreateFormBlur("serviceFee")}
//                             className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
//                               formErrors.serviceFee && touchedFields.has("serviceFee") ? "border-red-500" : "border-gray-300"
//                             }`}
//                             placeholder="Service fee amount"
//                           />
//                           {touchedFields.has("serviceFee") && !formErrors.serviceFee && createFormData.serviceFee !== undefined && createFormData.serviceFee >= 0 && (
//                             <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
//                           )}
//                         </div>
//                         {formErrors.serviceFee && touchedFields.has("serviceFee") && (
//                           <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
//                             <ErrorIcon className="w-3 h-3" />
//                             {formErrors.serviceFee}
//                           </p>
//                         )}
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           {t.totalAmount}
//                         </label>
//                         <div className="relative">
//                           <input
//                             type="number"
//                             value={createFormData.totalAmount || 0}
//                             readOnly
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-sm font-medium text-gray-900"
//                           />
//                         </div>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           {t.paymentMethod} <span className="text-red-500">*</span>
//                         </label>
//                         <div className="relative">
//                           <select
//                             value={createFormData.paymentMethod || "momo"}
//                             onChange={(e) => handleCreateFormChange("paymentMethod", e.target.value)}
//                             onBlur={() => handleCreateFormBlur("paymentMethod")}
//                             className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white ${
//                               formErrors.paymentMethod && touchedFields.has("paymentMethod") ? "border-red-500" : "border-gray-300"
//                             }`}
//                           >
//                             <option value="momo">MoMo</option>
//                             <option value="bank">Bank</option>
//                             <option value="cash">Cash</option>
//                           </select>
//                           {touchedFields.has("paymentMethod") && !formErrors.paymentMethod && createFormData.paymentMethod && (
//                             <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
//                           )}
//                         </div>
//                         {formErrors.paymentMethod && touchedFields.has("paymentMethod") && (
//                           <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
//                             <ErrorIcon className="w-3 h-3" />
//                             {formErrors.paymentMethod}
//                           </p>
//                         )}
//                       </div>
//                       {createFormData.paymentMethod === "momo" && (
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             {t.momoNumber} <span className="text-red-500">*</span>
//                           </label>
//                           <div className="relative">
//                             <input
//                               type="text"
//                               value={createFormData.momoNumber || ""}
//                               onChange={(e) => handleCreateFormChange("momoNumber", e.target.value)}
//                               onBlur={() => handleCreateFormBlur("momoNumber")}
//                               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
//                                 formErrors.momoNumber && touchedFields.has("momoNumber") ? "border-red-500" : "border-gray-300"
//                               }`}
//                               placeholder="Enter MoMo number"
//                             />
//                             {touchedFields.has("momoNumber") && !formErrors.momoNumber && createFormData.momoNumber && (
//                               <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
//                             )}
//                           </div>
//                           {formErrors.momoNumber && touchedFields.has("momoNumber") && (
//                             <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
//                               <ErrorIcon className="w-3 h-3" />
//                               {formErrors.momoNumber}
//                             </p>
//                           )}
//                         </div>
//                       )}
//                       <div className="md:col-span-3">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           {t.notes}
//                         </label>
//                         <textarea
//                           value={createFormData.notes || ""}
//                           onChange={(e) => handleCreateFormChange("notes", e.target.value)}
//                           rows={2}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none"
//                           placeholder="Additional notes..."
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex gap-3 pt-4 border-t border-gray-200">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handleCreateBooking}
//                       disabled={isSubmitting || !isFormValid}
//                       className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 ${
//                         isSubmitting || !isFormValid
//                           ? "bg-gray-400 cursor-not-allowed"
//                           : "bg-[#FF385C] hover:bg-[#E31C5F]"
//                       }`}
//                     >
//                       {isSubmitting ? (
//                         <>
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           {t.loading}
//                         </>
//                       ) : (
//                         <>
//                           <Send className="w-4 h-4" />
//                           {t.createBooking}
//                         </>
//                       )}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => {
//                         setIsCreateModalOpen(false);
//                         resetCreateForm();
//                       }}
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
//                         <label className="text-xs font-medium text-gray-500">Full Name</label>
//                         <p className="text-sm font-medium text-gray-900">{selectedBooking.fullName}</p>
//                       </div>
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">{t.email}</label>
//                         <p className="text-sm text-gray-900 flex items-center gap-1">
//                           <EmailIcon className="w-3 h-3 text-gray-400" />
//                           {selectedBooking.email}
//                         </p>
//                       </div>
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">{t.phone}</label>
//                         <p className="text-sm text-gray-900 flex items-center gap-1">
//                           <PhoneIcon className="w-3 h-3 text-gray-400" />
//                           {selectedBooking.phone}
//                         </p>
//                       </div>
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">{t.idNumber}</label>
//                         <p className="text-sm text-gray-900">{selectedBooking.idNumber || "N/A"}</p>
//                       </div>
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">{t.university}</label>
//                         <p className="text-sm text-gray-900">{selectedBooking.university || "N/A"}</p>
//                       </div>
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">{t.studentId}</label>
//                         <p className="text-sm text-gray-900">{selectedBooking.studentId || "N/A"}</p>
//                       </div>
//                       <div className="md:col-span-2">
//                         <label className="text-xs font-medium text-gray-500">{t.purpose}</label>
//                         <p className="text-sm text-gray-900">{selectedBooking.purpose || "N/A"}</p>
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
//                         <label className="text-xs font-medium text-gray-500">{t.houseName}</label>
//                         <p className="text-sm font-medium text-gray-900">{selectedBooking.houseName}</p>
//                       </div>
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">{t.houseType}</label>
//                         <p className="text-sm text-gray-900">{selectedBooking.houseType || "N/A"}</p>
//                       </div>
//                       <div className="md:col-span-2">
//                         <label className="text-xs font-medium text-gray-500">{t.location}</label>
//                         <p className="text-sm text-gray-900">
//                           {selectedBooking.district}, {selectedBooking.sector}, {selectedBooking.cell}, {selectedBooking.village}
//                         </p>
//                       </div>
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">{t.owner}</label>
//                         <p className="text-sm text-gray-900">{selectedBooking.ownerName || "N/A"}</p>
//                       </div>
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">Owner Contact</label>
//                         <p className="text-sm text-gray-900">{selectedBooking.ownerContact || "N/A"}</p>
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
//                         <label className="text-xs font-medium text-gray-500">{t.checkIn}</label>
//                         <p className="text-sm text-gray-900">{selectedBooking.formattedCheckIn}</p>
//                       </div>
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">{t.checkOut}</label>
//                         <p className="text-sm text-gray-900">{selectedBooking.formattedCheckOut}</p>
//                       </div>
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">{t.months}</label>
//                         <p className="text-sm text-gray-900">{selectedBooking.months}</p>
//                       </div>
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">{t.guests}</label>
//                         <p className="text-sm text-gray-900 flex items-center gap-1">
//                           <PeopleIcon className="w-3 h-3 text-gray-400" />
//                           {selectedBooking.guests}
//                         </p>
//                       </div>
//                       <div className="md:col-span-2">
//                         <label className="text-xs font-medium text-gray-500">{t.specialRequests}</label>
//                         <p className="text-sm text-gray-900">{selectedBooking.specialRequests || "None"}</p>
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
//                         <label className="text-xs font-medium text-gray-500">{t.monthlyRent}</label>
//                         <p className="text-sm font-medium text-gray-900">{formatCurrency(selectedBooking.monthlyRent)}</p>
//                       </div>
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">{t.serviceFee}</label>
//                         <p className="text-sm text-gray-900">{formatCurrency(selectedBooking.serviceFee)}</p>
//                       </div>
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">{t.totalAmount}</label>
//                         <p className="text-sm font-bold text-gray-900">{selectedBooking.formattedTotal}</p>
//                       </div>
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">{t.paymentMethod}</label>
//                         <p className="text-sm text-gray-900 capitalize">{selectedBooking.paymentMethod}</p>
//                       </div>
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">{t.paymentStatus}</label>
//                         <span className={`mt-1 px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(selectedBooking.paymentStatus)}`}>
//                           {getPaymentStatusLabel(selectedBooking.paymentStatus)}
//                         </span>
//                       </div>
//                       {selectedBooking.momoNumber && (
//                         <div>
//                           <label className="text-xs font-medium text-gray-500">{t.momoNumber}</label>
//                           <p className="text-sm text-gray-900">{selectedBooking.momoNumber}</p>
//                         </div>
//                       )}
//                       {selectedBooking.paymentScreenshot?.url && (
//                         <div className="md:col-span-3">
//                           <label className="text-xs font-medium text-gray-500">{t.paymentScreenshot}</label>
//                           <div className="mt-1">
//                             <button
//                               onClick={() => setIsImageModalOpen(true)}
//                               className="relative rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
//                             >
//                               <img
//                                 src={selectedBooking.paymentScreenshot.url}
//                                 alt="Payment Screenshot"
//                                 className="max-h-48 object-contain cursor-pointer"
//                               />
//                             </button>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Notes */}
//                   {selectedBooking.notes && (
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">{t.notes}</label>
//                       <div className="mt-1 p-3 bg-gray-50 rounded-lg">
//                         <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedBooking.notes}</p>
//                       </div>
//                     </div>
//                   )}

//                   {/* Dates */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">{t.createdAt}</label>
//                       <p className="text-sm text-gray-900">{formatDate(selectedBooking.createdAt)}</p>
//                     </div>
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">{t.updatedAt}</label>
//                       <p className="text-sm text-gray-900">{formatDate(selectedBooking.updatedAt)}</p>
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
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

//                 <div className="p-6 space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                       {t.status}
//                     </label>
//                     <select
//                       value={editFormData.status || "pending"}
//                       onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value as any })}
//                       className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//                     >
//                       <option value="pending">{t.statuses.pending}</option>
//                       <option value="confirmed">{t.statuses.confirmed}</option>
//                       <option value="cancelled">{t.statuses.cancelled}</option>
//                       <option value="completed">{t.statuses.completed}</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                       {t.paymentStatus}
//                     </label>
//                     <select
//                       value={editFormData.paymentStatus || "pending"}
//                       onChange={(e) => setEditFormData({ ...editFormData, paymentStatus: e.target.value as any })}
//                       className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//                     >
//                       <option value="pending">{t.paymentStatuses.pending}</option>
//                       <option value="verified">{t.paymentStatuses.verified}</option>
//                       <option value="failed">{t.paymentStatuses.failed}</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                       {t.notes}
//                     </label>
//                     <textarea
//                       value={editFormData.notes || ""}
//                       onChange={(e) => setEditFormData({ ...editFormData, notes: e.target.value })}
//                       rows={4}
//                       className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none"
//                       placeholder="Add notes about this booking..."
//                     />
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
//                           {t.loading}
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

//       {/* Confirm Modal */}
//       <AnimatePresence>
//         {isConfirmModalOpen && selectedBooking && (
//           <>
//             <motion.div
//               variants={overlayVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
//               onClick={() => {
//                 setIsConfirmModalOpen(false);
//                 setSelectedBooking(null);
//               }}
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
//                     <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
//                       <CheckCircleIcon className="w-8 h-8 text-green-600" />
//                     </div>
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
//                     {t.confirmBooking}
//                   </h3>
//                   <p className="text-gray-500 text-center mb-6">
//                     {t.confirmConfirmation}
//                     <br />
//                     <span className="text-sm text-gray-400">
//                       Booking: {selectedBooking.bookingId}
//                     </span>
//                   </p>
//                   <div className="flex gap-3">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => {
//                         setIsConfirmModalOpen(false);
//                         setSelectedBooking(null);
//                       }}
//                       className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
//                     >
//                       {t.cancel}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handleConfirmBooking}
//                       disabled={isSubmitting}
//                       className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors ${
//                         isSubmitting
//                           ? "bg-gray-400 cursor-not-allowed"
//                           : "bg-green-600 hover:bg-green-700"
//                       }`}
//                     >
//                       {isSubmitting ? (
//                         <span className="flex items-center justify-center gap-2">
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           {t.loading}
//                         </span>
//                       ) : (
//                         t.confirmBooking
//                       )}
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Verify Payment Modal */}
//       <AnimatePresence>
//         {isVerifyPaymentModalOpen && selectedBooking && (
//           <>
//             <motion.div
//               variants={overlayVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
//               onClick={() => {
//                 setIsVerifyPaymentModalOpen(false);
//                 setSelectedBooking(null);
//               }}
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
//                     <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
//                       <VerifiedIcon className="w-8 h-8 text-purple-600" />
//                     </div>
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
//                     {t.verifyPayment}
//                   </h3>
//                   <p className="text-gray-500 text-center mb-6">
//                     {t.verifyPaymentConfirmation}
//                     <br />
//                     <span className="text-sm text-gray-400">
//                       Booking: {selectedBooking.bookingId}
//                     </span>
//                     <br />
//                     <span className="text-sm text-gray-400">
//                       Amount: {selectedBooking.formattedTotal}
//                     </span>
//                   </p>
//                   <div className="flex gap-3">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => {
//                         setIsVerifyPaymentModalOpen(false);
//                         setSelectedBooking(null);
//                       }}
//                       className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
//                     >
//                       {t.cancel}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handleVerifyPayment}
//                       disabled={isSubmitting}
//                       className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors ${
//                         isSubmitting
//                           ? "bg-gray-400 cursor-not-allowed"
//                           : "bg-purple-600 hover:bg-purple-700"
//                       }`}
//                     >
//                       {isSubmitting ? (
//                         <span className="flex items-center justify-center gap-2">
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           {t.loading}
//                         </span>
//                       ) : (
//                         t.verifyPayment
//                       )}
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Cancel Modal */}
//       <AnimatePresence>
//         {isCancelModalOpen && selectedBooking && (
//           <>
//             <motion.div
//               variants={overlayVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
//               onClick={() => {
//                 setIsCancelModalOpen(false);
//                 setSelectedBooking(null);
//               }}
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
//                     <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
//                       <CancelIcon className="w-8 h-8 text-orange-600" />
//                     </div>
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
//                     {t.cancelBooking}
//                   </h3>
//                   <p className="text-gray-500 text-center mb-6">
//                     {t.cancelConfirmation}
//                     <br />
//                     <span className="text-sm text-gray-400">
//                       Booking: {selectedBooking.bookingId}
//                     </span>
//                   </p>
//                   <div className="flex gap-3">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => {
//                         setIsCancelModalOpen(false);
//                         setSelectedBooking(null);
//                       }}
//                       className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
//                     >
//                       {t.cancel}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handleCancelBooking}
//                       disabled={isSubmitting}
//                       className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors ${
//                         isSubmitting
//                           ? "bg-gray-400 cursor-not-allowed"
//                           : "bg-orange-600 hover:bg-orange-700"
//                       }`}
//                     >
//                       {isSubmitting ? (
//                         <span className="flex items-center justify-center gap-2">
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           {t.loading}
//                         </span>
//                       ) : (
//                         t.cancelBooking
//                       )}
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Complete Modal */}
//       <AnimatePresence>
//         {isCompletedModalOpen && selectedBooking && (
//           <>
//             <motion.div
//               variants={overlayVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
//               onClick={() => {
//                 setIsCompletedModalOpen(false);
//                 setSelectedBooking(null);
//               }}
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
//                     <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
//                       <AssignmentIcon className="w-8 h-8 text-purple-600" />
//                     </div>
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
//                     {t.completedBooking}
//                   </h3>
//                   <p className="text-gray-500 text-center mb-6">
//                     {t.completedConfirmation}
//                     <br />
//                     <span className="text-sm text-gray-400">
//                       Booking: {selectedBooking.bookingId}
//                     </span>
//                   </p>
//                   <div className="flex gap-3">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => {
//                         setIsCompletedModalOpen(false);
//                         setSelectedBooking(null);
//                       }}
//                       className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
//                     >
//                       {t.cancel}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handleCompleteBooking}
//                       disabled={isSubmitting}
//                       className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors ${
//                         isSubmitting
//                           ? "bg-gray-400 cursor-not-allowed"
//                           : "bg-purple-600 hover:bg-purple-700"
//                       }`}
//                     >
//                       {isSubmitting ? (
//                         <span className="flex items-center justify-center gap-2">
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           {t.loading}
//                         </span>
//                       ) : (
//                         t.completedBooking
//                       )}
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Delete Confirmation Modal */}
//       <AnimatePresence>
//         {isDeleteModalOpen && selectedBooking && (
//           <>
//             <motion.div
//               variants={overlayVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
//               onClick={() => {
//                 setIsDeleteModalOpen(false);
//                 setSelectedBooking(null);
//               }}
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
//                     <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
//                       <DeleteIcon className="w-8 h-8 text-red-600" />
//                     </div>
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
//                     {t.deleteBooking}
//                   </h3>
//                   <p className="text-gray-500 text-center mb-6">
//                     {t.deleteConfirmation}
//                     <br />
//                     <span className="text-sm text-gray-400">
//                       {t.actionUndone}
//                     </span>
//                     <br />
//                     <span className="text-sm text-gray-400">
//                       Booking: {selectedBooking.bookingId}
//                     </span>
//                   </p>
//                   <div className="flex gap-3">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => {
//                         setIsDeleteModalOpen(false);
//                         setSelectedBooking(null);
//                       }}
//                       className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
//                     >
//                       {t.cancel}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handleDeleteBooking}
//                       disabled={isLoading}
//                       className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors ${
//                         isLoading
//                           ? "bg-gray-400 cursor-not-allowed"
//                           : "bg-red-600 hover:bg-red-700"
//                       }`}
//                     >
//                       {isLoading ? (
//                         <span className="flex items-center justify-center gap-2">
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           {t.deleting}
//                         </span>
//                       ) : (
//                         t.delete
//                       )}
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Image Preview Modal */}
//       <AnimatePresence>
//         {isImageModalOpen && selectedBooking?.paymentScreenshot?.url && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]"
//               onClick={() => setIsImageModalOpen(false)}
//             />
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               className="fixed inset-0 z-[201] flex items-center justify-center p-4"
//             >
//               <div className="relative max-w-4xl max-h-[90vh]">
//                 <button
//                   onClick={() => setIsImageModalOpen(false)}
//                   className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
//                 >
//                   <Close className="w-8 h-8" />
//                 </button>
//                 <img
//                   src={selectedBooking.paymentScreenshot.url}
//                   alt="Payment Screenshot"
//                   className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
//                 />
//                 <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-sm px-4 py-2 rounded-lg">
//                   Payment Screenshot
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
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

// Material-UI Icons
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ClearIcon from "@mui/icons-material/Clear";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import PaymentIcon from "@mui/icons-material/Payment";
import Close from "@mui/icons-material/Close";
import Send from "@mui/icons-material/Send";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedIcon from "@mui/icons-material/Verified";
import ErrorIcon from "@mui/icons-material/Error";

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
  fullName?: string;
  email?: string;
  phone?: string;
  idNumber?: string;
  university?: string;
  studentId?: string;
  purpose?: string;
  houseId?: string;
  houseName?: string;
  houseType?: string;
  district?: string;
  sector?: string;
  cell?: string;
  village?: string;
  ownerName?: string;
  ownerContact?: string;
  ownerEmail?: string;
  checkIn?: string;
  checkOut?: string;
  months?: string;
  guests?: string;
  monthlyRent?: string;
  serviceFee?: string;
  paymentMethod?: string;
  momoNumber?: string;
}

// Translations
const translations = {
  en: {
    bookingManagement: "Booking Management",
    manageBookings: "Manage all property bookings and reservations",
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
    deleteBooking: "Delete Booking",
    deleteConfirmation: "Are you sure you want to delete this booking?",
    actionUndone: "This action cannot be undone.",
    cancel: "Cancel",
    delete: "Delete",
    deleting: "Deleting...",
    bookingDeleted: "Booking deleted successfully!",
    deleteFailed: "Failed to delete booking",
    statusUpdated: "Booking status updated successfully!",
    statusUpdateFailed: "Failed to update booking status",
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
    completedConfirmation: "Are you sure you want to mark this booking as completed?",
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
    createBooking: "Create New Booking",
    required: "This field is required",
    invalidEmail: "Please enter a valid email address",
    invalidPhone: "Please enter a valid phone number",
    invalidNumber: "Please enter a valid number",
    invalidDate: "Please enter a valid date",
    minValue: "Value must be at least {min}",
    maxValue: "Value must not exceed {max}",
    validationError: "Please fix all validation errors",
    allFieldsVerified: "All fields verified",
    verifyPayment: "Verify Payment",
    verifyPaymentConfirmation: "Are you sure you want to verify this payment?",
    paymentVerified: "Payment verified successfully!",
    paymentVerificationFailed: "Failed to verify payment",
    cancelBookingConfirmation: "Are you sure you want to cancel this booking?",
  },
  fr: {
    bookingManagement: "Gestion des Réservations",
    manageBookings: "Gérer toutes les réservations de propriétés",
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
    deleteBooking: "Supprimer la Réservation",
    deleteConfirmation: "Êtes-vous sûr de vouloir supprimer cette réservation ?",
    actionUndone: "Cette action est irréversible.",
    cancel: "Annuler",
    delete: "Supprimer",
    deleting: "Suppression...",
    bookingDeleted: "Réservation supprimée avec succès !",
    deleteFailed: "Échec de la suppression de la réservation",
    statusUpdated: "Statut de la réservation mis à jour avec succès !",
    statusUpdateFailed: "Échec de la mise à jour du statut",
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
    confirmConfirmation: "Êtes-vous sûr de vouloir confirmer cette réservation ?",
    cancelBooking: "Annuler la Réservation",
    cancelConfirmation: "Êtes-vous sûr de vouloir annuler cette réservation ?",
    completedBooking: "Marquer comme Terminé",
    completedConfirmation: "Êtes-vous sûr de vouloir marquer cette réservation comme terminée ?",
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
    createBooking: "Créer une Nouvelle Réservation",
    required: "Ce champ est requis",
    invalidEmail: "Veuillez entrer une adresse email valide",
    invalidPhone: "Veuillez entrer un numéro de téléphone valide",
    invalidNumber: "Veuillez entrer un nombre valide",
    invalidDate: "Veuillez entrer une date valide",
    minValue: "La valeur doit être au moins {min}",
    maxValue: "La valeur ne doit pas dépasser {max}",
    validationError: "Veuillez corriger toutes les erreurs de validation",
    allFieldsVerified: "Tous les champs sont vérifiés",
    verifyPayment: "Vérifier le Paiement",
    verifyPaymentConfirmation: "Êtes-vous sûr de vouloir vérifier ce paiement ?",
    paymentVerified: "Paiement vérifié avec succès !",
    paymentVerificationFailed: "Échec de la vérification du paiement",
    cancelBookingConfirmation: "Êtes-vous sûr de vouloir annuler cette réservation ?",
  },
  rw: {
    bookingManagement: "Gucunga Ibyanditswe",
    manageBookings: "Gucunga ibyanditswe byose n'ububiko",
    total: "Yose",
    pending: "Bitegereje",
    confirmed: "Byemejwe",
    cancelled: "Byahagaritswe",
    completed: "Byarangiye",
    searchBookings: "Shakisha ukurikije izina, imeri cyangwa ID y'icyanditswe...",
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
    deleteBooking: "Kuraho Icyanditswe",
    deleteConfirmation: "Uri kwizera ko ushaka gukuraho iki cyanditswe?",
    actionUndone: "Iki gikorwa ntikishobora guhindurwa.",
    cancel: "Reka",
    delete: "Kuraho",
    deleting: "Birakurwaho...",
    bookingDeleted: "Icyanditswe cyakuweho neza!",
    deleteFailed: "Kuraho icyanditswe birananiranye",
    statusUpdated: "Ihagaze ry'icyanditswe ryavuguruwe neza!",
    statusUpdateFailed: "Kuvugurura ihagaze birananiranye",
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
    completedConfirmation: "Uri kwizera ko ushaka gushyira iki cyanditswe ku rangiye?",
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
    createBooking: "Kurema Icyanditswe Gishya",
    required: "Iki gikurikira kirakenewe",
    invalidEmail: "Tanga imeri ikoreshwa neza",
    invalidPhone: "Tanga numero ya telefone ikoreshwa neza",
    invalidNumber: "Tanga numero ikoreshwa neza",
    invalidDate: "Tanga itariki ikoreshwa neza",
    minValue: "Agaciro kagombye kuba byibuze {min}",
    maxValue: "Agaciro ntikagombye kurenza {max}",
    validationError: "Kosora amakosa yose yo kwemeza",
    allFieldsVerified: "Amakosa yose yemejwe",
    verifyPayment: "Kemeza Amahoro",
    verifyPaymentConfirmation: "Uri kwizera ko ushaka kwemeza aya mahoro?",
    paymentVerified: "Amahoro yemejwe neza!",
    paymentVerificationFailed: "Kwemeza amahoro byananiranye",
    cancelBookingConfirmation: "Uri kwizera ko ushaka guhagarika iki cyanditswe?",
  },
};

// Helper function to get language from cookies
const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
  const lang = Cookies.get("language") as "en" | "fr" | "rw";
  return lang || "en";
};

// API Base URL
const API_URL = "https://rene-inyumba-nodejs.onrender.com/bookings";

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
    paymentStatusLabel: paymentStatusLabels[booking.paymentStatus] || booking.paymentStatus,
    paymentStatusColor: paymentStatusColors[booking.paymentStatus] || "bg-gray-100 text-gray-800",
    formattedCheckIn: formatDate(booking.checkIn),
    formattedCheckOut: formatDate(booking.checkOut),
    formattedTotal: `$${booking.totalAmount.toFixed(2)}`,
  };
};

// Validation functions
const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePhone = (phone: string): boolean => {
  const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return re.test(phone);
};

export const BookingManagement: React.FC = () => {
  // Get language from cookies
  const [lang, setLang] = useState<"en" | "fr" | "rw">(
    getLanguageFromCookies(),
  );
  const [bookings, setBookings] = useState<BookingUI[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<BookingUI[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isVerifyPaymentModalOpen, setIsVerifyPaymentModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingUI | null>(null);
  
  // Edit form state
  const [editFormData, setEditFormData] = useState<Partial<Booking>>({
    status: "pending",
    paymentStatus: "pending",
    notes: "",
  });

  // Create form state
  const [createFormData, setCreateFormData] = useState<Partial<Booking>>({
    fullName: "",
    email: "",
    phone: "",
    idNumber: "",
    university: "",
    studentId: "",
    purpose: "",
    houseId: "",
    houseName: "",
    houseType: "",
    district: "",
    sector: "",
    cell: "",
    village: "",
    ownerName: "",
    ownerContact: "",
    ownerEmail: "",
    checkIn: "",
    checkOut: "",
    months: 1,
    guests: 1,
    specialRequests: "",
    monthlyRent: 0,
    serviceFee: 0,
    totalAmount: 0,
    paymentMethod: "momo",
    momoNumber: "",
    paymentStatus: "pending",
    status: "pending",
    notes: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [isFormValid, setIsFormValid] = useState(false);

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Statistics
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
    completed: 0,
  });

  const t = translations[lang];

  // Fetch bookings from API
  const fetchBookings = async () => {
    setIsFetching(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      
      let bookingsData: Booking[] = [];
      if (result.success && Array.isArray(result.data)) {
        bookingsData = result.data;
      } else if (Array.isArray(result)) {
        bookingsData = result;
      } else if (result.data && Array.isArray(result.data)) {
        bookingsData = result.data;
      } else if (result.bookings && Array.isArray(result.bookings)) {
        bookingsData = result.bookings;
      }
      
      const transformedBookings = bookingsData.map((booking: Booking) => transformBookingToUI(booking));
      setBookings(transformedBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error(`❌ ${t.fetchError}`);
    } finally {
      setIsFetching(false);
    }
  };

  // Validate create form
  const validateCreateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    // Full Name validation
    if (!createFormData.fullName || createFormData.fullName.trim().length < 2) {
      errors.fullName = t.required;
      isValid = false;
    }

    // Email validation
    if (!createFormData.email) {
      errors.email = t.required;
      isValid = false;
    } else if (!validateEmail(createFormData.email)) {
      errors.email = t.invalidEmail;
      isValid = false;
    }

    // Phone validation
    if (!createFormData.phone) {
      errors.phone = t.required;
      isValid = false;
    } else if (!validatePhone(createFormData.phone)) {
      errors.phone = t.invalidPhone;
      isValid = false;
    }

    // ID Number validation
    if (!createFormData.idNumber || createFormData.idNumber.trim().length < 3) {
      errors.idNumber = t.required;
      isValid = false;
    }

    // University validation
    if (!createFormData.university || createFormData.university.trim().length < 2) {
      errors.university = t.required;
      isValid = false;
    }

    // Student ID validation
    if (!createFormData.studentId || createFormData.studentId.trim().length < 2) {
      errors.studentId = t.required;
      isValid = false;
    }

    // Purpose validation
    if (!createFormData.purpose || createFormData.purpose.trim().length < 2) {
      errors.purpose = t.required;
      isValid = false;
    }

    // House Name validation
    if (!createFormData.houseName || createFormData.houseName.trim().length < 2) {
      errors.houseName = t.required;
      isValid = false;
    }

    // House Type validation
    if (!createFormData.houseType || createFormData.houseType.trim().length < 2) {
      errors.houseType = t.required;
      isValid = false;
    }

    // Location validations
    if (!createFormData.district || createFormData.district.trim().length < 2) {
      errors.district = t.required;
      isValid = false;
    }
    if (!createFormData.sector || createFormData.sector.trim().length < 2) {
      errors.sector = t.required;
      isValid = false;
    }
    if (!createFormData.cell || createFormData.cell.trim().length < 2) {
      errors.cell = t.required;
      isValid = false;
    }
    if (!createFormData.village || createFormData.village.trim().length < 2) {
      errors.village = t.required;
      isValid = false;
    }

    // Owner validations
    if (!createFormData.ownerName || createFormData.ownerName.trim().length < 2) {
      errors.ownerName = t.required;
      isValid = false;
    }
    if (!createFormData.ownerContact || createFormData.ownerContact.trim().length < 5) {
      errors.ownerContact = t.required;
      isValid = false;
    }
    if (!createFormData.ownerEmail) {
      errors.ownerEmail = t.required;
      isValid = false;
    } else if (!validateEmail(createFormData.ownerEmail)) {
      errors.ownerEmail = t.invalidEmail;
      isValid = false;
    }

    // Check In validation
    if (!createFormData.checkIn) {
      errors.checkIn = t.required;
      isValid = false;
    }

    // Check Out validation
    if (!createFormData.checkOut) {
      errors.checkOut = t.required;
      isValid = false;
    } else if (createFormData.checkIn && createFormData.checkOut) {
      const checkInDate = new Date(createFormData.checkIn);
      const checkOutDate = new Date(createFormData.checkOut);
      if (checkOutDate <= checkInDate) {
        errors.checkOut = "Check out must be after check in";
        isValid = false;
      }
    }

    // Months validation
    if (!createFormData.months || createFormData.months < 1) {
      errors.months = t.required;
      isValid = false;
    }

    // Guests validation
    if (!createFormData.guests || createFormData.guests < 1) {
      errors.guests = t.required;
      isValid = false;
    }

    // Monthly Rent validation
    if (!createFormData.monthlyRent || createFormData.monthlyRent <= 0) {
      errors.monthlyRent = t.required;
      isValid = false;
    }

    // Service Fee validation
    if (createFormData.serviceFee === undefined || createFormData.serviceFee < 0) {
      errors.serviceFee = t.required;
      isValid = false;
    }

    // Payment Method validation
    if (!createFormData.paymentMethod) {
      errors.paymentMethod = t.required;
      isValid = false;
    }

    // MoMo Number validation (required if payment method is momo)
    if (createFormData.paymentMethod === "momo" && (!createFormData.momoNumber || createFormData.momoNumber.trim().length < 5)) {
      errors.momoNumber = t.required;
      isValid = false;
    }

    setFormErrors(errors);
    setIsFormValid(isValid);
    return isValid;
  };

  // Handle create form field changes
  const handleCreateFormChange = (field: keyof Booking, value: any) => {
    setCreateFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Mark field as touched
    setTouchedFields((prev) => new Set(prev).add(field));

    // Auto-calculate total amount
    if (field === "monthlyRent" || field === "serviceFee" || field === "months") {
      const monthlyRent = field === "monthlyRent" ? value : createFormData.monthlyRent || 0;
      const serviceFee = field === "serviceFee" ? value : createFormData.serviceFee || 0;
      const months = field === "months" ? value : createFormData.months || 1;
      const totalAmount = (monthlyRent * months) + serviceFee;
      setCreateFormData((prev) => ({
        ...prev,
        totalAmount,
      }));
    }
  };

  // Handle create form blur
  const handleCreateFormBlur = (field: string) => {
    setTouchedFields((prev) => new Set(prev).add(field));
    validateCreateForm();
  };

  // Create booking
  const handleCreateBooking = async () => {
    if (!validateCreateForm()) {
      toast.error(`❌ ${t.validationError}`);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createFormData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newBooking = await response.json();
      const transformedBooking = transformBookingToUI(newBooking);
      setBookings((prev) => [transformedBooking, ...prev]);

      toast.success(`✅ Booking created successfully!`);
      setIsCreateModalOpen(false);
      resetCreateForm();
    } catch (error) {
      toast.error(`❌ Failed to create booking`);
      console.error("Create booking error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset create form
  const resetCreateForm = () => {
    setCreateFormData({
      fullName: "",
      email: "",
      phone: "",
      idNumber: "",
      university: "",
      studentId: "",
      purpose: "",
      houseId: "",
      houseName: "",
      houseType: "",
      district: "",
      sector: "",
      cell: "",
      village: "",
      ownerName: "",
      ownerContact: "",
      ownerEmail: "",
      checkIn: "",
      checkOut: "",
      months: 1,
      guests: 1,
      specialRequests: "",
      monthlyRent: 0,
      serviceFee: 0,
      totalAmount: 0,
      paymentMethod: "momo",
      momoNumber: "",
      paymentStatus: "pending",
      status: "pending",
      notes: "",
    });
    setFormErrors({});
    setTouchedFields(new Set());
    setIsFormValid(false);
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
  }, []);

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
    return `$${amount.toFixed(2)}`;
  };

  // CRUD Operations - Following the routes
  const handleUpdateBooking = async () => {
    if (!selectedBooking) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/${selectedBooking._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedBooking = await response.json();
      const transformedBooking = transformBookingToUI(updatedBooking);

      const updatedBookings = bookings.map((b) =>
        b._id === selectedBooking._id ? transformedBooking : b
      );
      setBookings(updatedBookings);

      toast.success(`✅ ${t.statusUpdated}`);
      setIsEditModalOpen(false);
      setSelectedBooking(null);
      setEditFormData({ status: "pending", paymentStatus: "pending", notes: "" });
    } catch (error) {
      toast.error(`❌ ${t.statusUpdateFailed}`);
      console.error("Update booking error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBooking = async () => {
    if (!selectedBooking) return;

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/${selectedBooking._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setBookings(bookings.filter((b) => b._id !== selectedBooking._id));
      toast.success(`🗑️ ${t.bookingDeleted}`);
      setIsDeleteModalOpen(false);
      setSelectedBooking(null);
    } catch (error) {
      toast.error(`❌ ${t.deleteFailed}`);
      console.error("Delete booking error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmBooking = async () => {
    if (!selectedBooking) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/${selectedBooking._id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "confirmed" }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedBooking = await response.json();
      const transformedBooking = transformBookingToUI(updatedBooking);

      const updatedBookings = bookings.map((b) =>
        b._id === selectedBooking._id ? transformedBooking : b
      );
      setBookings(updatedBookings);

      toast.success(`✅ Booking confirmed successfully!`);
      setIsConfirmModalOpen(false);
      setSelectedBooking(null);
    } catch (error) {
      toast.error(`❌ Failed to confirm booking`);
      console.error("Confirm booking error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelBooking = async () => {
    if (!selectedBooking) return;

    setIsSubmitting(true);

    try {
      // Using the cancel route
      const response = await fetch(`${API_URL}/${selectedBooking._id}/cancel`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedBooking = await response.json();
      const transformedBooking = transformBookingToUI(updatedBooking);

      const updatedBookings = bookings.map((b) =>
        b._id === selectedBooking._id ? transformedBooking : b
      );
      setBookings(updatedBookings);

      toast.success(`✅ Booking cancelled successfully!`);
      setIsCancelModalOpen(false);
      setSelectedBooking(null);
    } catch (error) {
      toast.error(`❌ Failed to cancel booking`);
      console.error("Cancel booking error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCompleteBooking = async () => {
    if (!selectedBooking) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/${selectedBooking._id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "completed" }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedBooking = await response.json();
      const transformedBooking = transformBookingToUI(updatedBooking);

      const updatedBookings = bookings.map((b) =>
        b._id === selectedBooking._id ? transformedBooking : b
      );
      setBookings(updatedBookings);

      toast.success(`✅ Booking marked as completed!`);
      setIsCompletedModalOpen(false);
      setSelectedBooking(null);
    } catch (error) {
      toast.error(`❌ Failed to complete booking`);
      console.error("Complete booking error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyPayment = async () => {
    if (!selectedBooking) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/${selectedBooking._id}/verify-payment`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentStatus: "verified" }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedBooking = await response.json();
      const transformedBooking = transformBookingToUI(updatedBooking);

      const updatedBookings = bookings.map((b) =>
        b._id === selectedBooking._id ? transformedBooking : b
      );
      setBookings(updatedBookings);

      toast.success(`✅ ${t.paymentVerified}`);
      setIsVerifyPaymentModalOpen(false);
      setSelectedBooking(null);
    } catch (error) {
      toast.error(`❌ ${t.paymentVerificationFailed}`);
      console.error("Verify payment error:", error);
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
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (booking: BookingUI) => {
    setSelectedBooking(booking);
    setIsDeleteModalOpen(true);
  };

  const openConfirmModal = (booking: BookingUI) => {
    setSelectedBooking(booking);
    setIsConfirmModalOpen(true);
  };

  const openCancelModal = (booking: BookingUI) => {
    setSelectedBooking(booking);
    setIsCancelModalOpen(true);
  };

  const openCompletedModal = (booking: BookingUI) => {
    setSelectedBooking(booking);
    setIsCompletedModalOpen(true);
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

      {/* Bookings Table - Single Line Display */}
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
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
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
                      <p className="text-sm text-gray-600">{booking.formattedCheckIn}</p>
                      <p className="text-xs text-gray-400">{booking.formattedCheckOut}</p>
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
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openEditModal(booking)}
                          className="p-1 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title={t.editBooking}
                        >
                          <EditIcon className="w-4 h-4" />
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
                            onClick={() => openCompletedModal(booking)}
                            className="p-1 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                            title={t.completedBooking}
                          >
                            <AssignmentIcon className="w-4 h-4" />
                          </motion.button>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openDeleteModal(booking)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title={t.deleteBooking}
                        >
                          <DeleteIcon className="w-4 h-4" />
                        </motion.button>
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

      {/* Create Booking Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setIsCreateModalOpen(false)}
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
                      {t.createBooking}
                    </h2>
                    {isFormValid && touchedFields.size > 0 && (
                      <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                        <VerifiedIcon className="w-3 h-3" />
                        {t.allFieldsVerified}
                      </span>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsCreateModalOpen(false)}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={createFormData.fullName || ""}
                            onChange={(e) => handleCreateFormChange("fullName", e.target.value)}
                            onBlur={() => handleCreateFormBlur("fullName")}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
                              formErrors.fullName && touchedFields.has("fullName") ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter guest full name"
                          />
                          {touchedFields.has("fullName") && !formErrors.fullName && (
                            <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                          )}
                        </div>
                        {formErrors.fullName && touchedFields.has("fullName") && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <ErrorIcon className="w-3 h-3" />
                            {formErrors.fullName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.email} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            value={createFormData.email || ""}
                            onChange={(e) => handleCreateFormChange("email", e.target.value)}
                            onBlur={() => handleCreateFormBlur("email")}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
                              formErrors.email && touchedFields.has("email") ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter guest email"
                          />
                          {touchedFields.has("email") && !formErrors.email && createFormData.email && (
                            <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                          )}
                        </div>
                        {formErrors.email && touchedFields.has("email") && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <ErrorIcon className="w-3 h-3" />
                            {formErrors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.phone} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            value={createFormData.phone || ""}
                            onChange={(e) => handleCreateFormChange("phone", e.target.value)}
                            onBlur={() => handleCreateFormBlur("phone")}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
                              formErrors.phone && touchedFields.has("phone") ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter guest phone number"
                          />
                          {touchedFields.has("phone") && !formErrors.phone && createFormData.phone && (
                            <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                          )}
                        </div>
                        {formErrors.phone && touchedFields.has("phone") && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <ErrorIcon className="w-3 h-3" />
                            {formErrors.phone}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.idNumber} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={createFormData.idNumber || ""}
                            onChange={(e) => handleCreateFormChange("idNumber", e.target.value)}
                            onBlur={() => handleCreateFormBlur("idNumber")}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
                              formErrors.idNumber && touchedFields.has("idNumber") ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter ID number"
                          />
                          {touchedFields.has("idNumber") && !formErrors.idNumber && createFormData.idNumber && (
                            <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                          )}
                        </div>
                        {formErrors.idNumber && touchedFields.has("idNumber") && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <ErrorIcon className="w-3 h-3" />
                            {formErrors.idNumber}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.university} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={createFormData.university || ""}
                            onChange={(e) => handleCreateFormChange("university", e.target.value)}
                            onBlur={() => handleCreateFormBlur("university")}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
                              formErrors.university && touchedFields.has("university") ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter university name"
                          />
                          {touchedFields.has("university") && !formErrors.university && createFormData.university && (
                            <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                          )}
                        </div>
                        {formErrors.university && touchedFields.has("university") && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <ErrorIcon className="w-3 h-3" />
                            {formErrors.university}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.studentId} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={createFormData.studentId || ""}
                            onChange={(e) => handleCreateFormChange("studentId", e.target.value)}
                            onBlur={() => handleCreateFormBlur("studentId")}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
                              formErrors.studentId && touchedFields.has("studentId") ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter student ID"
                          />
                          {touchedFields.has("studentId") && !formErrors.studentId && createFormData.studentId && (
                            <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                          )}
                        </div>
                        {formErrors.studentId && touchedFields.has("studentId") && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <ErrorIcon className="w-3 h-3" />
                            {formErrors.studentId}
                          </p>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.purpose} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={createFormData.purpose || ""}
                            onChange={(e) => handleCreateFormChange("purpose", e.target.value)}
                            onBlur={() => handleCreateFormBlur("purpose")}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
                              formErrors.purpose && touchedFields.has("purpose") ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter purpose of booking"
                          />
                          {touchedFields.has("purpose") && !formErrors.purpose && createFormData.purpose && (
                            <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                          )}
                        </div>
                        {formErrors.purpose && touchedFields.has("purpose") && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <ErrorIcon className="w-3 h-3" />
                            {formErrors.purpose}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* House Information */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <HomeIcon className="w-4 h-4 text-[#FF385C]" />
                      {t.houseInformation}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.houseName} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={createFormData.houseName || ""}
                            onChange={(e) => handleCreateFormChange("houseName", e.target.value)}
                            onBlur={() => handleCreateFormBlur("houseName")}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
                              formErrors.houseName && touchedFields.has("houseName") ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter house name"
                          />
                          {touchedFields.has("houseName") && !formErrors.houseName && createFormData.houseName && (
                            <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                          )}
                        </div>
                        {formErrors.houseName && touchedFields.has("houseName") && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <ErrorIcon className="w-3 h-3" />
                            {formErrors.houseName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.houseType} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={createFormData.houseType || ""}
                            onChange={(e) => handleCreateFormChange("houseType", e.target.value)}
                            onBlur={() => handleCreateFormBlur("houseType")}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
                              formErrors.houseType && touchedFields.has("houseType") ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter house type (e.g., Apartment, Villa)"
                          />
                          {touchedFields.has("houseType") && !formErrors.houseType && createFormData.houseType && (
                            <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                          )}
                        </div>
                        {formErrors.houseType && touchedFields.has("houseType") && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <ErrorIcon className="w-3 h-3" />
                            {formErrors.houseType}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          District <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={createFormData.district || ""}
                            onChange={(e) => handleCreateFormChange("district", e.target.value)}
                            onBlur={() => handleCreateFormBlur("district")}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
                              formErrors.district && touchedFields.has("district") ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter district"
                          />
                          {touchedFields.has("district") && !formErrors.district && createFormData.district && (
                            <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                          )}
                        </div>
                        {formErrors.district && touchedFields.has("district") && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <ErrorIcon className="w-3 h-3" />
                            {formErrors.district}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Sector <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input                            type="text"
                            value={createFormData.sector || ""}
                            onChange={(e) => handleCreateFormChange("sector", e.target.value)}
                            onBlur={() => handleCreateFormBlur("sector")}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
                              formErrors.sector && touchedFields.has("sector") ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter sector"
                          />
                          {touchedFields.has("sector") && !formErrors.sector && createFormData.sector && (
                            <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                          )}
                        </div>
                        {formErrors.sector && touchedFields.has("sector") && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <ErrorIcon className="w-3 h-3" />
                            {formErrors.sector}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Cell <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={createFormData.cell || ""}
                            onChange={(e) => handleCreateFormChange("cell", e.target.value)}
                            onBlur={() => handleCreateFormBlur("cell")}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
                              formErrors.cell && touchedFields.has("cell") ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter cell"
                          />
                          {touchedFields.has("cell") && !formErrors.cell && createFormData.cell && (
                            <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                          )}
                        </div>
                        {formErrors.cell && touchedFields.has("cell") && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <ErrorIcon className="w-3 h-3" />
                            {formErrors.cell}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Village <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={createFormData.village || ""}
                            onChange={(e) => handleCreateFormChange("village", e.target.value)}
                            onBlur={() => handleCreateFormBlur("village")}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
                              formErrors.village && touchedFields.has("village") ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter village"
                          />
                          {touchedFields.has("village") && !formErrors.village && createFormData.village && (
                            <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                          )}
                        </div>
                        {formErrors.village && touchedFields.has("village") && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <ErrorIcon className="w-3 h-3" />
                            {formErrors.village}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Owner Information */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <PersonIcon className="w-4 h-4 text-[#FF385C]" />
                      {t.owner}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Owner Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={createFormData.ownerName || ""}
                            onChange={(e) => handleCreateFormChange("ownerName", e.target.value)}
                            onBlur={() => handleCreateFormBlur("ownerName")}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
                              formErrors.ownerName && touchedFields.has("ownerName") ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter owner name"
                          />
                          {touchedFields.has("ownerName") && !formErrors.ownerName && createFormData.ownerName && (
                            <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                          )}
                        </div>
                        {formErrors.ownerName && touchedFields.has("ownerName") && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <ErrorIcon className="w-3 h-3" />
                            {formErrors.ownerName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Owner Contact <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={createFormData.ownerContact || ""}
                            onChange={(e) => handleCreateFormChange("ownerContact", e.target.value)}
                            onBlur={() => handleCreateFormBlur("ownerContact")}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
                              formErrors.ownerContact && touchedFields.has("ownerContact") ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter owner contact"
                          />
                          {touchedFields.has("ownerContact") && !formErrors.ownerContact && createFormData.ownerContact && (
                            <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                          )}
                        </div>
                        {formErrors.ownerContact && touchedFields.has("ownerContact") && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <ErrorIcon className="w-3 h-3" />
                            {formErrors.ownerContact}
                          </p>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Owner Email <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            value={createFormData.ownerEmail || ""}
                            onChange={(e) => handleCreateFormChange("ownerEmail", e.target.value)}
                            onBlur={() => handleCreateFormBlur("ownerEmail")}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
                              formErrors.ownerEmail && touchedFields.has("ownerEmail") ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter owner email"
                          />
                          {touchedFields.has("ownerEmail") && !formErrors.ownerEmail && createFormData.ownerEmail && (
                            <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                          )}
                        </div>
                        {formErrors.ownerEmail && touchedFields.has("ownerEmail") && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <ErrorIcon className="w-3 h-3" />
                            {formErrors.ownerEmail}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <AssignmentIcon className="w-4 h-4 text-[#FF385C]" />
                      {t.bookingInformation}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.checkIn} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            value={createFormData.checkIn || ""}
                            onChange={(e) => handleCreateFormChange("checkIn", e.target.value)}
                            onBlur={() => handleCreateFormBlur("checkIn")}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
                              formErrors.checkIn && touchedFields.has("checkIn") ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                          {touchedFields.has("checkIn") && !formErrors.checkIn && createFormData.checkIn && (
                            <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                          )}
                        </div>
                        {formErrors.checkIn && touchedFields.has("checkIn") && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <ErrorIcon className="w-3 h-3" />
                            {formErrors.checkIn}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.checkOut} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            value={createFormData.checkOut || ""}
                            onChange={(e) => handleCreateFormChange("checkOut", e.target.value)}
                            onBlur={() => handleCreateFormBlur("checkOut")}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
                              formErrors.checkOut && touchedFields.has("checkOut") ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                          {touchedFields.has("checkOut") && !formErrors.checkOut && createFormData.checkOut && (
                            <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                          )}
                        </div>
                        {formErrors.checkOut && touchedFields.has("checkOut") && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <ErrorIcon className="w-3 h-3" />
                            {formErrors.checkOut}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.months} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min="1"
                            max="24"
                            value={createFormData.months || ""}
                            onChange={(e) => handleCreateFormChange("months", parseInt(e.target.value) || 0)}
                            onBlur={() => handleCreateFormBlur("months")}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
                              formErrors.months && touchedFields.has("months") ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Number of months"
                          />
                          {touchedFields.has("months") && !formErrors.months && createFormData.months && createFormData.months > 0 && (
                            <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                          )}
                        </div>
                        {formErrors.months && touchedFields.has("months") && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <ErrorIcon className="w-3 h-3" />
                            {formErrors.months}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.guests} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min="1"
                            max="20"
                            value={createFormData.guests || ""}
                            onChange={(e) => handleCreateFormChange("guests", parseInt(e.target.value) || 0)}
                            onBlur={() => handleCreateFormBlur("guests")}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
                              formErrors.guests && touchedFields.has("guests") ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Number of guests"
                          />
                          {touchedFields.has("guests") && !formErrors.guests && createFormData.guests && createFormData.guests > 0 && (
                            <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                          )}
                        </div>
                        {formErrors.guests && touchedFields.has("guests") && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <ErrorIcon className="w-3 h-3" />
                            {formErrors.guests}
                          </p>
                        )}
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.specialRequests}
                        </label>
                        <textarea
                          value={createFormData.specialRequests || ""}
                          onChange={(e) => handleCreateFormChange("specialRequests", e.target.value)}
                          rows={2}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none"
                          placeholder="Any special requests?"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <PaymentIcon className="w-4 h-4 text-[#FF385C]" />
                      {t.paymentInformation}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.monthlyRent} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            step="1000"
                            value={createFormData.monthlyRent || ""}
                            onChange={(e) => handleCreateFormChange("monthlyRent", parseFloat(e.target.value) || 0)}
                            onBlur={() => handleCreateFormBlur("monthlyRent")}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
                              formErrors.monthlyRent && touchedFields.has("monthlyRent") ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Monthly rent amount"
                          />
                          {touchedFields.has("monthlyRent") && !formErrors.monthlyRent && createFormData.monthlyRent && createFormData.monthlyRent > 0 && (
                            <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                          )}
                        </div>
                        {formErrors.monthlyRent && touchedFields.has("monthlyRent") && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <ErrorIcon className="w-3 h-3" />
                            {formErrors.monthlyRent}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.serviceFee} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            step="100"
                            value={createFormData.serviceFee || ""}
                            onChange={(e) => handleCreateFormChange("serviceFee", parseFloat(e.target.value) || 0)}
                            onBlur={() => handleCreateFormBlur("serviceFee")}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
                              formErrors.serviceFee && touchedFields.has("serviceFee") ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Service fee amount"
                          />
                          {touchedFields.has("serviceFee") && !formErrors.serviceFee && createFormData.serviceFee !== undefined && createFormData.serviceFee >= 0 && (
                            <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                          )}
                        </div>
                        {formErrors.serviceFee && touchedFields.has("serviceFee") && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <ErrorIcon className="w-3 h-3" />
                            {formErrors.serviceFee}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.totalAmount}
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={createFormData.totalAmount || 0}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-sm font-medium text-gray-900"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.paymentMethod} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={createFormData.paymentMethod || "momo"}
                            onChange={(e) => handleCreateFormChange("paymentMethod", e.target.value)}
                            onBlur={() => handleCreateFormBlur("paymentMethod")}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white ${
                              formErrors.paymentMethod && touchedFields.has("paymentMethod") ? "border-red-500" : "border-gray-300"
                            }`}
                          >
                            <option value="momo">MoMo</option>
                            <option value="bank">Bank</option>
                            <option value="cash">Cash</option>
                          </select>
                          {touchedFields.has("paymentMethod") && !formErrors.paymentMethod && createFormData.paymentMethod && (
                            <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                          )}
                        </div>
                        {formErrors.paymentMethod && touchedFields.has("paymentMethod") && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <ErrorIcon className="w-3 h-3" />
                            {formErrors.paymentMethod}
                          </p>
                        )}
                      </div>
                      {createFormData.paymentMethod === "momo" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t.momoNumber} <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={createFormData.momoNumber || ""}
                              onChange={(e) => handleCreateFormChange("momoNumber", e.target.value)}
                              onBlur={() => handleCreateFormBlur("momoNumber")}
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
                                formErrors.momoNumber && touchedFields.has("momoNumber") ? "border-red-500" : "border-gray-300"
                              }`}
                              placeholder="Enter MoMo number"
                            />
                            {touchedFields.has("momoNumber") && !formErrors.momoNumber && createFormData.momoNumber && (
                              <VerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                            )}
                          </div>
                          {formErrors.momoNumber && touchedFields.has("momoNumber") && (
                            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                              <ErrorIcon className="w-3 h-3" />
                              {formErrors.momoNumber}
                            </p>
                          )}
                        </div>
                      )}
                      <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.notes}
                        </label>
                        <textarea
                          value={createFormData.notes || ""}
                          onChange={(e) => handleCreateFormChange("notes", e.target.value)}
                          rows={2}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none"
                          placeholder="Additional notes..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCreateBooking}
                      disabled={isSubmitting || !isFormValid}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 ${
                        isSubmitting || !isFormValid
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#FF385C] hover:bg-[#E31C5F]"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {t.loading}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          {t.createBooking}
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsCreateModalOpen(false);
                        resetCreateForm();
                      }}
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
                        <label className="text-xs font-medium text-gray-500">Full Name</label>
                        <p className="text-sm font-medium text-gray-900">{selectedBooking.fullName}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">{t.email}</label>
                        <p className="text-sm text-gray-900 flex items-center gap-1">
                          <EmailIcon className="w-3 h-3 text-gray-400" />
                          {selectedBooking.email}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">{t.phone}</label>
                        <p className="text-sm text-gray-900 flex items-center gap-1">
                          <PhoneIcon className="w-3 h-3 text-gray-400" />
                          {selectedBooking.phone}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">{t.idNumber}</label>
                        <p className="text-sm text-gray-900">{selectedBooking.idNumber || "N/A"}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">{t.university}</label>
                        <p className="text-sm text-gray-900">{selectedBooking.university || "N/A"}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">{t.studentId}</label>
                        <p className="text-sm text-gray-900">{selectedBooking.studentId || "N/A"}</p>
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-xs font-medium text-gray-500">{t.purpose}</label>
                        <p className="text-sm text-gray-900">{selectedBooking.purpose || "N/A"}</p>
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
                        <label className="text-xs font-medium text-gray-500">{t.houseName}</label>
                        <p className="text-sm font-medium text-gray-900">{selectedBooking.houseName}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">{t.houseType}</label>
                        <p className="text-sm text-gray-900">{selectedBooking.houseType || "N/A"}</p>
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-xs font-medium text-gray-500">{t.location}</label>
                        <p className="text-sm text-gray-900">
                          {selectedBooking.district}, {selectedBooking.sector}, {selectedBooking.cell}, {selectedBooking.village}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">{t.owner}</label>
                        <p className="text-sm text-gray-900">{selectedBooking.ownerName || "N/A"}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">Owner Contact</label>
                        <p className="text-sm text-gray-900">{selectedBooking.ownerContact || "N/A"}</p>
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
                        <label className="text-xs font-medium text-gray-500">{t.checkIn}</label>
                        <p className="text-sm text-gray-900">{selectedBooking.formattedCheckIn}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">{t.checkOut}</label>
                        <p className="text-sm text-gray-900">{selectedBooking.formattedCheckOut}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">{t.months}</label>
                        <p className="text-sm text-gray-900">{selectedBooking.months}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">{t.guests}</label>
                        <p className="text-sm text-gray-900 flex items-center gap-1">
                          <PeopleIcon className="w-3 h-3 text-gray-400" />
                          {selectedBooking.guests}
                        </p>
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-xs font-medium text-gray-500">{t.specialRequests}</label>
                        <p className="text-sm text-gray-900">{selectedBooking.specialRequests || "None"}</p>
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
                        <label className="text-xs font-medium text-gray-500">{t.monthlyRent}</label>
                        <p className="text-sm font-medium text-gray-900">{formatCurrency(selectedBooking.monthlyRent)}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">{t.serviceFee}</label>
                        <p className="text-sm text-gray-900">{formatCurrency(selectedBooking.serviceFee)}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">{t.totalAmount}</label>
                        <p className="text-sm font-bold text-gray-900">{selectedBooking.formattedTotal}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">{t.paymentMethod}</label>
                        <p className="text-sm text-gray-900 capitalize">{selectedBooking.paymentMethod}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">{t.paymentStatus}</label>
                        <span className={`mt-1 px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(selectedBooking.paymentStatus)}`}>
                          {getPaymentStatusLabel(selectedBooking.paymentStatus)}
                        </span>
                      </div>
                      {selectedBooking.momoNumber && (
                        <div>
                          <label className="text-xs font-medium text-gray-500">{t.momoNumber}</label>
                          <p className="text-sm text-gray-900">{selectedBooking.momoNumber}</p>
                        </div>
                      )}
                      {selectedBooking.paymentScreenshot?.url && (
                        <div className="md:col-span-3">
                          <label className="text-xs font-medium text-gray-500">{t.paymentScreenshot}</label>
                          <div className="mt-1">
                            <button
                              onClick={() => setIsImageModalOpen(true)}
                              className="relative rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                            >
                              <img
                                src={selectedBooking.paymentScreenshot.url}
                                alt="Payment Screenshot"
                                className="max-h-48 object-contain cursor-pointer"
                              />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Notes */}
                  {selectedBooking.notes && (
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.notes}</label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedBooking.notes}</p>
                      </div>
                    </div>
                  )}

                  {/* Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.createdAt}</label>
                      <p className="text-sm text-gray-900">{formatDate(selectedBooking.createdAt)}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.updatedAt}</label>
                      <p className="text-sm text-gray-900">{formatDate(selectedBooking.updatedAt)}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
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

                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.status}
                    </label>
                    <select
                      value={editFormData.status || "pending"}
                      onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value as any })}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                    >
                      <option value="pending">{t.statuses.pending}</option>
                      <option value="confirmed">{t.statuses.confirmed}</option>
                      <option value="cancelled">{t.statuses.cancelled}</option>
                      <option value="completed">{t.statuses.completed}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.paymentStatus}
                    </label>
                    <select
                      value={editFormData.paymentStatus || "pending"}
                      onChange={(e) => setEditFormData({ ...editFormData, paymentStatus: e.target.value as any })}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                    >
                      <option value="pending">{t.paymentStatuses.pending}</option>
                      <option value="verified">{t.paymentStatuses.verified}</option>
                      <option value="failed">{t.paymentStatuses.failed}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.notes}
                    </label>
                    <textarea
                      value={editFormData.notes || ""}
                      onChange={(e) => setEditFormData({ ...editFormData, notes: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none"
                      placeholder="Add notes about this booking..."
                    />
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
                          {t.loading}
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

      {/* Confirm Modal */}
      <AnimatePresence>
        {isConfirmModalOpen && selectedBooking && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => {
                setIsConfirmModalOpen(false);
                setSelectedBooking(null);
              }}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            >
              <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white relative">
                <div className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircleIcon className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                    {t.confirmBooking}
                  </h3>
                  <p className="text-gray-500 text-center mb-6">
                    {t.confirmConfirmation}
                    <br />
                    <span className="text-sm text-gray-400">
                      Booking: {selectedBooking.bookingId}
                    </span>
                  </p>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsConfirmModalOpen(false);
                        setSelectedBooking(null);
                      }}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      {t.cancel}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleConfirmBooking}
                      disabled={isSubmitting}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors ${
                        isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {t.loading}
                        </span>
                      ) : (
                        t.confirmBooking
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Verify Payment Modal */}
      <AnimatePresence>
        {isVerifyPaymentModalOpen && selectedBooking && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => {
                setIsVerifyPaymentModalOpen(false);
                setSelectedBooking(null);
              }}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            >
              <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white relative">
                <div className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                      <VerifiedIcon className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                    {t.verifyPayment}
                  </h3>
                  <p className="text-gray-500 text-center mb-6">
                    {t.verifyPaymentConfirmation}
                    <br />
                    <span className="text-sm text-gray-400">
                      Booking: {selectedBooking.bookingId}
                    </span>
                    <br />
                    <span className="text-sm text-gray-400">
                      Amount: {selectedBooking.formattedTotal}
                    </span>
                  </p>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsVerifyPaymentModalOpen(false);
                        setSelectedBooking(null);
                      }}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      {t.cancel}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleVerifyPayment}
                      disabled={isSubmitting}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors ${
                        isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-purple-600 hover:bg-purple-700"
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {t.loading}
                        </span>
                      ) : (
                        t.verifyPayment
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cancel Modal */}
      <AnimatePresence>
        {isCancelModalOpen && selectedBooking && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => {
                setIsCancelModalOpen(false);
                setSelectedBooking(null);
              }}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            >
              <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white relative">
                <div className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                      <CancelIcon className="w-8 h-8 text-orange-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                    {t.cancelBooking}
                  </h3>
                  <p className="text-gray-500 text-center mb-6">
                    {t.cancelConfirmation}
                    <br />
                    <span className="text-sm text-gray-400">
                      Booking: {selectedBooking.bookingId}
                    </span>
                  </p>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsCancelModalOpen(false);
                        setSelectedBooking(null);
                      }}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      {t.cancel}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCancelBooking}
                      disabled={isSubmitting}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors ${
                        isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-orange-600 hover:bg-orange-700"
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {t.loading}
                        </span>
                      ) : (
                        t.cancelBooking
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Complete Modal */}
      <AnimatePresence>
        {isCompletedModalOpen && selectedBooking && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => {
                setIsCompletedModalOpen(false);
                setSelectedBooking(null);
              }}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            >
              <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white relative">
                <div className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                      <AssignmentIcon className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                    {t.completedBooking}
                  </h3>
                  <p className="text-gray-500 text-center mb-6">
                    {t.completedConfirmation}
                    <br />
                    <span className="text-sm text-gray-400">
                      Booking: {selectedBooking.bookingId}
                    </span>
                  </p>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsCompletedModalOpen(false);
                        setSelectedBooking(null);
                      }}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      {t.cancel}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCompleteBooking}
                      disabled={isSubmitting}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors ${
                        isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-purple-600 hover:bg-purple-700"
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {t.loading}
                        </span>
                      ) : (
                        t.completedBooking
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && selectedBooking && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedBooking(null);
              }}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            >
              <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white relative">
                <div className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                      <DeleteIcon className="w-8 h-8 text-red-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                    {t.deleteBooking}
                  </h3>
                  <p className="text-gray-500 text-center mb-6">
                    {t.deleteConfirmation}
                    <br />
                    <span className="text-sm text-gray-400">
                      {t.actionUndone}
                    </span>
                    <br />
                    <span className="text-sm text-gray-400">
                      Booking: {selectedBooking.bookingId}
                    </span>
                  </p>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsDeleteModalOpen(false);
                        setSelectedBooking(null);
                      }}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      {t.cancel}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDeleteBooking}
                      disabled={isLoading}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors ${
                        isLoading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {t.deleting}
                        </span>
                      ) : (
                        t.delete
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {isImageModalOpen && selectedBooking?.paymentScreenshot?.url && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]"
              onClick={() => setIsImageModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            >
              <div className="relative max-w-4xl max-h-[90vh]">
                <button
                  onClick={() => setIsImageModalOpen(false)}
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                >
                  <Close className="w-8 h-8" />
                </button>
                <img
                  src={selectedBooking.paymentScreenshot.url}
                  alt="Payment Screenshot"
                  className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-sm px-4 py-2 rounded-lg">
                  Payment Screenshot
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};