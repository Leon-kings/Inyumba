/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import axios from "axios";

// Material-UI Icons
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ClearIcon from "@mui/icons-material/Clear";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";

import Send from "@mui/icons-material/Send";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";

import { CheckCircleOutlineOutlined } from "@mui/icons-material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ChatIcon from "@mui/icons-material/Chat";
import MessageIcon from "@mui/icons-material/Message";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import ReplyIcon from "@mui/icons-material/Reply";
import GroupsIcon from "@mui/icons-material/Groups";

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

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, title, message, details }) => {
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
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">{title}</h3>
          <p className="text-gray-600 text-center mb-2">{message}</p>
          {details && <p className="text-sm text-gray-400 text-center mb-6">{details}</p>}
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

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose, title, message, details }) => {
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
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">{title}</h3>
          <p className="text-gray-600 text-center mb-2">{message}</p>
          {details && <p className="text-sm text-gray-400 text-center mb-6">{details}</p>}
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

// Info Modal
interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  details?: string;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, title, message, details }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[300] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600" />
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-ping opacity-75" />
              <MarkunreadIcon className="w-10 h-10 text-blue-600 relative z-10" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">{title}</h3>
          <p className="text-gray-600 text-center mb-2">{message}</p>
          {details && <p className="text-sm text-gray-400 text-center mb-6">{details}</p>}
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// TRANSLATION HELPER - Google Translate API
// ============================================================

const translateContent = async (text: string, targetLang: string): Promise<string> => {
  if (!text || targetLang === 'en') return text;
  if (targetLang === 'rw' || targetLang === 'fr') {
    try {
      const response = await axios.post(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
      );
      if (response.data && response.data[0] && response.data[0][0]) {
        return response.data[0][0][0] || text;
      }
      return text;
    } catch {
      return text;
    }
  }
  return text;
};

// Types based on the Booking model
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

// Extended type for UI purposes
interface BookingUI extends Booking {
  statusLabel: string;
  statusColor: string;
  formattedCheckIn: string;
  formattedCheckOut: string;
  formattedTotal: string;
}

// Contact Message Types based on Contact model
interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  userId: string | null;
  status: "pending" | "read" | "replied" | "archived";
  replyMessage: string | null;
  repliedAt: string | null;
  readAt: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
  updatedAt: string;
}

// Translations
const translations = {
  en: {
    clientManagement: "Client Management",
    manageClients: "Manage clients who booked your properties",
    total: "Total Clients",
    completed: "Completed",
    searchClients: "Search by name, email, or booking ID...",
    client: "Client",
    house: "House",
    checkIn: "Check In",
    checkOut: "Check Out",
    totalAmount: "Total Amount",
    actions: "Actions",
    noClientsFound: "No clients found",
    adjustFilters: "Try adjusting your search",
    showing: "Showing",
    of: "of",
    clients: "clients",
    viewDetails: "View Details",
    clientDetails: "Client Details",
    guestInformation: "Guest Information",
    houseInformation: "House Information",
    bookingInformation: "Booking Information",
    close: "Close",
    loading: "Loading...",
    fetchError: "Failed to load clients",
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
    createdAt: "Created At",
    updatedAt: "Updated At",
    chat: "Contact",
    sendMessage: "Send Message",
    messagePlaceholder: "Type your message here...",
    messageSent: "Message sent successfully!",
    messageFailed: "Failed to send message",
    send: "Send",
    sending: "Sending...",
    chatWith: "Contact",
    chatHistory: "Conversation History",
    noMessages: "No messages yet",
    newMessage: "Start a conversation",
    reply: "Reply",
    markAsRead: "Mark as Read",
    replied: "Replied",
    read: "Read",
    pending: "Pending",
    archived: "Archived",
    statuses: {
      pending: "Pending",
      read: "Read",
      replied: "Replied",
      archived: "Archived",
    },
    success: "Success",
    error: "Error",
    messageToGuest: "Message to Guest",
    noBookingsFound: "No house booked yet !",
    viewBooking: "View Booking",
    bookingDetails: "Booking Details",
    paymentInformation: "Payment Information",
    paymentStatus: "Payment Status",
    status: "Status",
    payment: "Payment",
    verified: "Verified",
    failed: "Failed",
    replySent: "Reply sent successfully!",
    replyFailed: "Failed to send reply",
    messageRead: "Message marked as read",
    messageReadFailed: "Failed to mark message as read",
    replyingTo: "Replying to",
    typeReply: "Type your reply...",
    sendReply: "Send Reply",
    noMessagesFound: "No messages found for this client",
    info: "Info",
  },
  fr: {
    clientManagement: "Gestion des Clients",
    manageClients: "Gérer les clients qui ont réservé vos propriétés",
    total: "Total Clients",
    completed: "Terminé",
    searchClients: "Rechercher par nom, email ou ID de réservation...",
    client: "Client",
    house: "Logement",
    checkIn: "Arrivée",
    checkOut: "Départ",
    totalAmount: "Montant Total",
    actions: "Actions",
    noClientsFound: "Aucun client trouvé",
    adjustFilters: "Essayez d'ajuster votre recherche",
    showing: "Affichage",
    of: "de",
    clients: "clients",
    viewDetails: "Voir les Détails",
    clientDetails: "Détails du Client",
    guestInformation: "Informations de l'Invité",
    houseInformation: "Informations du Logement",
    bookingInformation: "Informations de Réservation",
    close: "Fermer",
    loading: "Chargement...",
    fetchError: "Échec du chargement des clients",
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
    createdAt: "Créé le",
    updatedAt: "Mis à jour le",
    chat: "Contacter",
    sendMessage: "Envoyer un Message",
    messagePlaceholder: "Écrivez votre message ici...",
    messageSent: "Message envoyé avec succès!",
    messageFailed: "Échec de l'envoi du message",
    send: "Envoyer",
    sending: "Envoi en cours...",
    chatWith: "Contacter",
    chatHistory: "Historique des Messages",
    noMessages: "Aucun message encore",
    newMessage: "Commencer une conversation",
    reply: "Répondre",
    markAsRead: "Marquer comme Lu",
    replied: "Répondu",
    read: "Lu",
    pending: "En Attente",
    archived: "Archivé",
    statuses: {
      pending: "En Attente",
      read: "Lu",
      replied: "Répondu",
      archived: "Archivé",
    },
    success: "Succès",
    error: "Erreur",
    messageToGuest: "Message à l'Invité",
    noBookingsFound: "Aucun client n'a réservé vos propriétés",
    viewBooking: "Voir la Réservation",
    bookingDetails: "Détails de la Réservation",
    paymentInformation: "Informations de Paiement",
    paymentStatus: "Statut de Paiement",
    status: "Statut",
    payment: "Paiement",
    verified: "Vérifié",
    failed: "Échoué",
    replySent: "Réponse envoyée avec succès!",
    replyFailed: "Échec de l'envoi de la réponse",
    messageRead: "Message marqué comme lu",
    messageReadFailed: "Échec du marquage du message comme lu",
    replyingTo: "Répondre à",
    typeReply: "Écrivez votre réponse...",
    sendReply: "Envoyer la Réponse",
    noMessagesFound: "Aucun message trouvé pour ce client",
    info: "Info",
  },
  rw: {
    clientManagement: "Gucunga Abakiriya",
    manageClients: "Gucunga abakiriya bakoze reservation ku mazu yawe",
    total: "Abakiriya Bose",
    completed: "Byarangiye",
    searchClients: "Shakisha ukurikije izina, imeri cyangwa ID y'icyanditswe...",
    client: "Umukiriya",
    house: "Inzu",
    checkIn: "Kwinjira",
    checkOut: "Kuvamo",
    totalAmount: "Amahera Yose",
    actions: "Ibikorwa",
    noClientsFound: "Nta mukiriya wabonetse",
    adjustFilters: "Gerageza guhindura uburyo ushakisha",
    showing: "Bereka",
    of: "muri",
    clients: "abakiriya",
    viewDetails: "Reba Ibisobanuro",
    clientDetails: "Ibisobanuro by'Umukiriya",
    guestInformation: "Amakuru y'Umushyitsi",
    houseInformation: "Amakuru y'Inzu",
    bookingInformation: "Amakuru y'Icyanditswe",
    close: "Funga",
    loading: "Birakoreshwa...",
    fetchError: "Kubura abakiriya birananiranye",
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
    createdAt: "Byakozwe",
    updatedAt: "Byavuguruwe",
    chat: "Kuvugisha",
    sendMessage: "Ohereza Ubutumwa",
    messagePlaceholder: "Andika ubutumwa bwawe hano...",
    messageSent: "Ubutumwa bwoherejwe neza!",
    messageFailed: "Kohereza ubutumwa byananiranye",
    send: "Ohereza",
    sending: "Birambura...",
    chatWith: "Kuvugisha",
    chatHistory: "Amateka y'Ubutumwa",
    noMessages: "Nta butumwa buracyari",
    newMessage: "Tangira kuganira",
    reply: "Subiza",
    markAsRead: "Shyira ku Somye",
    replied: "Byasubijwe",
    read: "Byasomwe",
    pending: "Bitegereje",
    archived: "Byabikwe",
    statuses: {
      pending: "Bitegereje",
      read: "Byasomwe",
      replied: "Byasubijwe",
      archived: "Byabikwe",
    },
    success: "Byagenze Neza",
    error: "Ikosa",
    messageToGuest: "Ubutumwa ku Mushyitsi",
    noBookingsFound: "Nta mukiriya wakoze reservation ku mazu yawe",
    viewBooking: "Reba Icyanditswe",
    bookingDetails: "Ibisobanuro by'Icyanditswe",
    paymentInformation: "Amakuru y'Amahoro",
    paymentStatus: "Ihagaze ry'Amahoro",
    status: "Ihagaze",
    payment: "Amahoro",
    verified: "Byagenzuwe",
    failed: "Byananiwe",
    replySent: "Igisubizo cyoherejwe neza!",
    replyFailed: "Kohereza igisubizo byananiranye",
    messageRead: "Ubutumwa bwasomwe",
    messageReadFailed: "Gushyira ubutumwa ku somwe byananiranye",
    replyingTo: "Kubaza",
    typeReply: "Andika igisubizo cyawe...",
    sendReply: "Ohereza Igisubizo",
    noMessagesFound: "Nta butumwa bubonetse kuri uyu mukiriya",
    info: "Amakuru",
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

// Helper function to get user name from localStorage
const getUserName = (): string => {
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      return user.name || "";
    }
    return "";
  } catch {
    return "";
  }
};

// Helper function to get userId from localStorage
const getUserId = (): string | null => {
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      return user.id || user._id || null;
    }
    return null;
  } catch {
    return null;
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
const API_BASE_URL = "https://inyumbaproject.eu1.hubfly.app";

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
    formattedCheckIn: formatDate(booking.checkIn),
    formattedCheckOut: formatDate(booking.checkOut),
    formattedTotal: `RWF ${booking.totalAmount.toLocaleString()}`,
  };
};

export const HostClientManagement: React.FC = () => {
  // Get language from cookies
  const [lang, setLang] = useState<"en" | "fr" | "rw">(
    getLanguageFromCookies(),
  );
  const [bookings, setBookings] = useState<BookingUI[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<BookingUI[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingUI | null>(null);

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

  const [infoModal, setInfoModal] = useState<{
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

  // Chat states
  const [chatMessages, setChatMessages] = useState<ContactMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [replyingTo, setReplyingTo] = useState<ContactMessage | null>(null);

  // Statistics
  const [stats, setStats] = useState({
    total: 0,
  });

  const t = translations[lang];

  const showSuccessModal = (title: string, message: string, details?: string) => {
    setSuccessModal({ isOpen: true, title, message, details });
  };

  const showErrorModal = (title: string, message: string, details?: string) => {
    setErrorModal({ isOpen: true, title, message, details });
  };

  const showInfoModal = (title: string, message: string, details?: string) => {
    setInfoModal({ isOpen: true, title, message, details });
  };

  // Fetch completed bookings by email from API with translation
  const fetchBookings = async () => {
    const email = getUserEmail();

    if (!email) {
      showErrorModal("Error", "Please login to view bookings");
      setIsFetching(false);
      return;
    }

    setIsFetching(true);
    try {
      const response = await api.get("/bookings");

      let allBookingsData: Booking[] = [];
      const result = response.data;

      if (result.success && Array.isArray(result.data)) {
        allBookingsData = result.data;
      } else if (Array.isArray(result)) {
        allBookingsData = result;
      } else if (result.data && Array.isArray(result.data)) {
        allBookingsData = result.data;
      } else if (result.bookings && Array.isArray(result.bookings)) {
        allBookingsData = result.bookings;
      }

      // Filter by owner email and status = completed
      const hostEmail = getUserEmail();
      const completedBookings = allBookingsData.filter(
        (booking) => booking.ownerEmail === hostEmail && booking.status === "completed",
      );

      // Translate bookings
      let processedBookings = completedBookings;
      if (lang !== 'en') {
        const translatedBookings = [];
        for (const booking of completedBookings) {
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
              specialRequests: await translateContent(booking.specialRequests, lang),
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
        showInfoModal(
          t.info || "Info",
          t.noBookingsFound || "No house booked yet!",
        );
      }
    } catch {
      showErrorModal(t.error || "Error", t.fetchError || "Failed to load clients");
    } finally {
      setIsFetching(false);
    }
  };

  // Fetch chat messages for a booking from /contact endpoint by email
  const fetchChatMessages = async (booking: BookingUI) => {
    setIsLoadingMessages(true);
    try {
      const response = await api.get(`/contact/email/${booking.email}`);

      let messages: ContactMessage[] = [];
      const result = response.data;

      if (result.success && Array.isArray(result.data)) {
        messages = result.data;
      } else if (Array.isArray(result)) {
        messages = result;
      } else if (result.messages && Array.isArray(result.messages)) {
        messages = result.messages;
      }

      // Translate messages if needed
      if (lang !== 'en' && messages.length > 0) {
        const translatedMessages = [];
        for (const msg of messages) {
          try {
            const translatedMsg = {
              ...msg,
              name: await translateContent(msg.name, lang),
              message: await translateContent(msg.message, lang),
              replyMessage: msg.replyMessage ? await translateContent(msg.replyMessage, lang) : null,
            };
            translatedMessages.push(translatedMsg);
          } catch {
            translatedMessages.push(msg);
          }
        }
        messages = translatedMessages;
      }

      // Sort messages by createdAt (oldest first)
      messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

      setChatMessages(messages);

      if (messages.length === 0) {
        showInfoModal(t.info || "Info", t.noMessagesFound || "No messages found for this client");
      }
    } catch {
      setChatMessages([]);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  // Send a message to guest via /contact endpoint
  const sendMessage = async () => {
    if (!newMessage.trim()) {
      showErrorModal(t.error || "Error", "Please enter a message");
      return;
    }

    if (!selectedBooking) return;

    setIsSendingMessage(true);

    try {
      const userId = getUserId();
      const userName = getUserName();

      const messageData = {
        name: userName || selectedBooking.ownerName || "Host",
        email: selectedBooking.ownerEmail || getUserEmail(),
        message: newMessage.trim(),
        userId: userId,
      };

      const response = await api.post("/contact", messageData);

      if (response.data && response.data.success !== false) {
        const newMsg: ContactMessage = {
          _id: response.data._id || Date.now().toString(),
          name: messageData.name,
          email: messageData.email,
          message: messageData.message,
          userId: userId,
          status: "pending",
          replyMessage: null,
          repliedAt: null,
          readAt: null,
          ipAddress: null,
          userAgent: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        setChatMessages((prev) => [...prev, newMsg]);
        setNewMessage("");
        showSuccessModal(t.success || "Success", t.messageSent || "Message sent successfully!");
      } else {
        throw new Error("Failed to send message");
      }
    } catch {
      showErrorModal(t.error || "Error", t.messageFailed || "Failed to send message");
    } finally {
      setIsSendingMessage(false);
    }
  };

  // Send a reply to a message via /contact/:id/reply endpoint
  const sendReply = async () => {
    if (!replyMessage.trim()) {
      showErrorModal(t.error || "Error", "Please enter a reply");
      return;
    }

    if (!selectedBooking || !replyingTo) return;

    setIsSendingMessage(true);

    try {
      const replyData = {
        replyMessage: replyMessage.trim(),
        status: "replied",
      };

      const response = await api.put(`/contact/${replyingTo._id}/reply`, replyData);

      if (response.data && response.data.success !== false) {
        const updatedMessages = chatMessages.map((msg) => {
          if (msg._id === replyingTo._id) {
            return {
              ...msg,
              status: "replied" as const,
              replyMessage: replyData.replyMessage,
              repliedAt: new Date().toISOString(),
            };
          }
          return msg;
        });

        setChatMessages(updatedMessages);
        setReplyMessage("");
        setReplyingTo(null);
        showSuccessModal(t.success || "Success", t.replySent || "Reply sent successfully!");
      } else {
        throw new Error("Failed to send reply");
      }
    } catch {
      showErrorModal(t.error || "Error", t.replyFailed || "Failed to send reply");
    } finally {
      setIsSendingMessage(false);
    }
  };

  // Mark message as read via /contact/:id/status endpoint
  const markAsRead = async (messageId: string) => {
    try {
      const response = await api.put(`/contact/${messageId}/status`, {
        status: "read",
      });

      if (response.data && response.data.success !== false) {
        setChatMessages((prev) =>
          prev.map((msg) =>
            msg._id === messageId
              ? { ...msg, status: "read" as const, readAt: new Date().toISOString() }
              : msg
          )
        );
        showSuccessModal(t.success || "Success", t.messageRead || "Message marked as read");
      } else {
        throw new Error("Failed to mark as read");
      }
    } catch {
      showErrorModal(t.error || "Error", t.messageReadFailed || "Failed to mark message as read");
    }
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

    setFilteredBookings(filtered);
  }, [bookings, searchTerm]);

  // Update statistics
  useEffect(() => {
    const total = bookings.length;
    setStats({ total });
  }, [bookings]);

  // Open modals
  const openViewModal = (booking: BookingUI) => {
    setSelectedBooking(booking);
    setIsViewModalOpen(true);
  };

  const openChatModal = async (booking: BookingUI) => {
    setSelectedBooking(booking);
    setNewMessage("");
    setReplyMessage("");
    setReplyingTo(null);
    setIsChatModalOpen(true);
    await fetchChatMessages(booking);
  };

  // Get status label for messages
  const getMessageStatusLabel = (status: string): string => {
    switch (status) {
      case "pending": return t.statuses.pending;
      case "read": return t.statuses.read;
      case "replied": return t.statuses.replied;
      case "archived": return t.statuses.archived;
      default: return status;
    }
  };

  // Get status color for messages
  const getMessageStatusColor = (status: string): string => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "read": return "bg-blue-100 text-blue-700";
      case "replied": return "bg-green-100 text-green-700";
      case "archived": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

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

      {/* Info Modal */}
      <InfoModal
        isOpen={infoModal.isOpen}
        onClose={() => setInfoModal({ ...infoModal, isOpen: false })}
        title={infoModal.title}
        message={infoModal.message}
        details={infoModal.details}
      />

      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <GroupsIcon className="w-7 h-7 text-[#FF385C]" />
              {t.clientManagement}
            </h1>
            <p className="text-sm text-gray-500 mt-1">{t.manageClients}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchBookings}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RefreshIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
        >
          <p className="text-xs text-gray-500">{t.total}</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-green-50 rounded-xl p-4 shadow-sm border border-green-200"
        >
          <p className="text-xs text-green-600">{t.completed}</p>
          <p className="text-2xl font-bold text-green-700">{stats.total}</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t.searchClients}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
            />
          </div>
          <button
            onClick={() => setSearchTerm("")}
            className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ClearIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  {t.client}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  {t.house}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  {t.checkIn}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  {t.totalAmount}
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  {t.actions}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    <AssignmentIcon className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                    <p>{t.noClientsFound}</p>
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
                          <p className="text-xs text-gray-400 truncate max-w-[120px]">
                            {booking.email}
                          </p>
                        </div>
                      </div>
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
                      <p className="text-sm text-gray-600">
                        {booking.formattedCheckIn}
                      </p>
                      <p className="text-xs text-gray-400">
                        {booking.formattedCheckOut}
                      </p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">
                        {booking.formattedTotal}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1 flex-nowrap">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openViewModal(booking)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title={t.viewDetails}
                        >
                          <VisibilityIcon className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openChatModal(booking)}
                          className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title={t.chat}
                        >
                          <ChatIcon className="w-4 h-4" />
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
            {t.clients}
          </p>
        </div>
      </div>

      {/* View Details Modal */}
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
                    <AssignmentIcon className="text-[#FF385C] w-5 h-5" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      {t.clientDetails}
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
                      <CalendarTodayIcon className="w-4 h-4 text-[#FF385C]" />
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

                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsViewModalOpen(false);
                        openChatModal(selectedBooking);
                      }}
                      className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <ChatIcon className="w-4 h-4" />
                      {t.chat}
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

      {/* Chat Modal */}
      <AnimatePresence>
        {isChatModalOpen && selectedBooking && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setIsChatModalOpen(false)}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            >
              <div className="w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl bg-white relative flex flex-col">
                {/* Chat Header */}
                <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <ChatIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        {t.chatWith} {selectedBooking.fullName}
                      </h2>
                      <p className="text-xs text-gray-500">
                        {selectedBooking.bookingId} • {selectedBooking.houseName}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsChatModalOpen(false)}
                    className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-3 min-h-[300px] max-h-[400px] bg-gray-50">
                  {isLoadingMessages ? (
                    <div className="flex justify-center items-center h-full">
                      <div className="text-center">
                        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                        <p className="text-sm text-gray-500">{t.loading}</p>
                      </div>
                    </div>
                  ) : chatMessages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <MessageIcon className="w-12 h-12 text-gray-300 mb-3" />
                      <p className="text-gray-500">{t.noMessages}</p>
                      <p className="text-sm text-gray-400">{t.newMessage}</p>
                    </div>
                  ) : (
                    chatMessages.map((msg) => {
                      const isOwnMessage = msg.email === getUserEmail() || msg.userId === getUserId();
                      const isFromGuest = msg.email === selectedBooking.email;

                      return (
                        <motion.div
                          key={msg._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              isOwnMessage
                                ? "bg-purple-600 text-white"
                                : "bg-white border border-gray-200 text-gray-900"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-xs font-medium">
                                {isOwnMessage ? "You" : isFromGuest ? selectedBooking.fullName : msg.name}
                              </span>
                              <span className="text-xs opacity-70">
                                {new Date(msg.createdAt).toLocaleTimeString()}
                              </span>
                              {msg.status && (
                                <span className={`text-xs px-1.5 py-0.5 rounded ${getMessageStatusColor(msg.status)}`}>
                                  {getMessageStatusLabel(msg.status)}
                                </span>
                              )}
                              {msg.replyMessage && (
                                <span className="text-xs text-green-500 flex items-center gap-1">
                                  <ReplyIcon className="w-3 h-3" />
                                  Replied
                                </span>
                              )}
                            </div>
                            <p className="text-sm whitespace-pre-wrap">{msg.message}</p>

                            {/* Reply Button for messages from guest that haven't been replied to */}
                            {!isOwnMessage && !msg.replyMessage && (
                              <div className="mt-2 flex gap-2">
                                <button
                                  onClick={() => {
                                    setReplyingTo(msg);
                                    setReplyMessage("");
                                  }}
                                  className="text-xs text-purple-600 hover:text-purple-800 font-medium flex items-center gap-1"
                                >
                                  <ReplyIcon className="w-3 h-3" />
                                  {t.reply}
                                </button>
                                {msg.status !== "read" && msg.status !== "replied" && (
                                  <button
                                    onClick={() => markAsRead(msg._id)}
                                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                                  >
                                    {t.markAsRead}
                                  </button>
                                )}
                              </div>
                            )}

                            {/* Show reply if exists */}
                            {msg.replyMessage && (
                              <div className="mt-2 pt-2 border-t border-gray-200/30">
                                <p className="text-xs text-gray-400">Reply:</p>
                                <p className="text-sm">{msg.replyMessage}</p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </div>

                {/* Reply Input (when replying to a specific message) */}
                {replyingTo && (
                  <div className="px-6 py-3 border-t border-gray-200 bg-blue-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-700">
                        {t.replyingTo} {selectedBooking.fullName}:
                      </span>
                      <button
                        onClick={() => setReplyingTo(null)}
                        className="text-sm text-gray-500 hover:text-gray-700"
                      >
                        <CloseIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            sendReply();
                          }
                        }}
                        placeholder={t.typeReply}
                        className="flex-1 px-4 py-2.5 border border-blue-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm"
                        disabled={isSendingMessage}
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={sendReply}
                        disabled={isSendingMessage || !replyMessage.trim()}
                        className={`px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                          isSendingMessage || !replyMessage.trim()
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-purple-600 text-white hover:bg-purple-700"
                        }`}
                      >
                        {isSendingMessage ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            {t.sending}
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            {t.sendReply}
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* Message Input */}
                <div className="px-6 py-4 border-t border-gray-200 bg-white">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey && !replyingTo) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      placeholder={replyingTo ? t.typeReply : t.messagePlaceholder}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm"
                      disabled={isSendingMessage || !!replyingTo}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={sendMessage}
                      disabled={isSendingMessage || !newMessage.trim() || !!replyingTo}
                      className={`px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                        isSendingMessage || !newMessage.trim() || !!replyingTo
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-purple-600 text-white hover:bg-purple-700"
                      }`}
                    >
                      {isSendingMessage ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {t.sending}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          {t.send}
                        </>
                      )}
                    </motion.button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {t.messageToGuest}: {selectedBooking.fullName} ({selectedBooking.email})
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};