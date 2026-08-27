/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

// Material-UI Icons
import MessageIcon from "@mui/icons-material/Message";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FlagIcon from "@mui/icons-material/Flag";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import ReplyIcon from "@mui/icons-material/Reply";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

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
              <CheckCircleIcon className="w-10 h-10 text-green-600 relative z-10" />
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
              <ErrorIcon className="w-10 h-10 text-red-600 relative z-10" />
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
                    <DeleteIcon className="w-10 h-10" />
                  ) : type === "warning" ? (
                    <ErrorIcon className="w-10 h-10" />
                  ) : type === "success" ? (
                    <CheckCircleIcon className="w-10 h-10" />
                  ) : (
                    <MessageIcon className="w-10 h-10" />
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

// Types - Updated to match the contact model
interface Contact {
  id?: string;
  _id: string;
  name: string;
  email: string;
  message: string;
  status: "pending" | "read" | "replied" | "archived";
  ipAddress: string | null;
  userAgent: string | null;
  repliedAt: string | null;
  readAt: string | null;
  replyMessage: string | null;
  createdAt: string;
  updatedAt: string;
  contactWithStatus?: string;
  notificationMessage?: string;
  messagePreview?: string;
  responseTime?: string | null;
}

// Extended type for UI purposes
interface Message extends Contact {
  senderName: string;
  senderEmail: string;
  content: string;
  subject: string;
  isRead: boolean;
  isFlagged: boolean;
  isStarred: boolean;
  category:
    | "general"
    | "support"
    | "booking"
    | "payment"
    | "complaint"
    | "feedback"
    | "other";
  priority: "low" | "medium" | "high" | "urgent";
  labels: string[];
  tags: string[];
  repliedBy?: string;
  attachments?: any[];
  recipientEmail?: string;
  recipientId?: string;
  senderId?: string;
  replyHistory?: { from: string; message: string; timestamp: string }[];
}

interface MessageFormData {
  name: string;
  email: string;
  message: string;
  status: "pending" | "read" | "replied" | "archived";
  replyMessage?: string;
}

// Form validation errors
interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

// Translations
const translations = {
  en: {
    messageManagement: "My Messages",
    manageMessages: "View and manage your messages",
    total: "Total",
    pending: "Pending",
    read: "Read",
    replied: "Replied",
    resolved: "Resolved",
    archived: "Archived",
    flagged: "Flagged",
    starred: "Starred",
    searchMessages: "Search by name, email, or message...",
    allStatus: "All Status",
    allCategories: "All Categories",
    allPriorities: "All Priorities",
    message: "Message",
    sender: "Sender",
    subject: "Subject",
    category: "Category",
    priority: "Priority",
    status: "Status",
    received: "Received",
    actions: "Actions",
    noMessages: "No messages found",
    adjustFilters: "Try adjusting your search or filters",
    showing: "Showing",
    of: "of",
    messages: "messages",
    viewMessage: "View Message",
    reply: "Reply",
    deleteMessage: "Delete Message",
    deleteConfirmation: "Are you sure you want to delete this message?",
    actionUndone: "This action cannot be undone.",
    cancel: "Cancel",
    delete: "Delete",
    deleting: "Deleting...",
    messageDeleted: "Message deleted successfully!",
    deleteFailed: "Failed to delete message",
    statusUpdated: "Message status updated successfully!",
    statusUpdateFailed: "Failed to update message status",
    replySent: "Reply sent successfully!",
    replyFailed: "Failed to send reply",
    messageDetails: "Message Details",
    senderName: "Sender Name",
    senderEmail: "Sender Email",
    recipientEmail: "Recipient Email",
    messageContent: "Message Content",
    attachments: "Attachments",
    replyLabel: "Reply",
    sendReply: "Send Reply",
    updateStatus: "Update Status",
    selectStatus: "Select Status",
    replyPlaceholder: "Type your reply here...",
    noAttachments: "No attachments",
    close: "Close",
    send: "Send",
    sending: "Sending...",
    composeMessage: "Compose Message",
    newMessage: "New Message",
    createMessage: "Create Message",
    messageCreated: "Message created successfully!",
    createFailed: "Failed to create message",
    markAsRead: "Mark as Read",
    markAsUnread: "Mark as Unread",
    toggleStar: "Toggle Star",
    toggleFlag: "Toggle Flag",
    archive: "Archive",
    unarchive: "Unarchive",
    labels: "Labels",
    tags: "Tags",
    addLabel: "Add Label",
    addTag: "Add Tag",
    general: "General",
    support: "Support",
    booking: "Booking",
    payment: "Payment",
    complaint: "Complaint",
    feedback: "Feedback",
    other: "Other",
    low: "Low",
    medium: "Medium",
    high: "High",
    urgent: "Urgent",
    all: "All",
    selectCategory: "Select Category",
    selectPriority: "Select Priority",
    recipient: "Recipient",
    content: "Content",
    attachmentsLabel: "Attachments",
    noImage: "No image attached",
    viewImage: "View Image",
    loading: "Loading...",
    fetchError: "Failed to load messages",
    replyTo: "Reply to",
    nameRequired: "Name is required",
    nameMinLength: "Name must be at least 2 characters",
    emailRequired: "Email is required",
    emailInvalid: "Please enter a valid email",
    messageRequired: "Message is required",
    messageMinLength: "Message must be at least 10 characters",
    messageMaxLength: "Message cannot exceed 1000 characters",
    allFieldsValid: "All fields are valid!",
    pleaseFixErrors: "Please fix the errors above",
    noUserEmail: "No user email found. Please login again.",
    success: "Success!",
    error: "Error",
    confirm: "Confirm",
    replyHistory: "Reply History",
    admin: "Admin",
    you: "You",
  },
  fr: {
    messageManagement: "Mes Messages",
    manageMessages: "Voir et gérer vos messages",
    total: "Total",
    pending: "En Attente",
    read: "Lu",
    replied: "Répondu",
    resolved: "Résolu",
    archived: "Archivé",
    flagged: "Signalé",
    starred: "Favori",
    searchMessages: "Rechercher par nom, email ou contenu...",
    allStatus: "Tous les Statuts",
    allCategories: "Toutes les Catégories",
    allPriorities: "Toutes les Priorités",
    message: "Message",
    sender: "Expéditeur",
    subject: "Sujet",
    category: "Catégorie",
    priority: "Priorité",
    status: "Statut",
    received: "Reçu",
    actions: "Actions",
    noMessages: "Aucun message trouvé",
    adjustFilters: "Essayez d'ajuster votre recherche ou vos filtres",
    showing: "Affichage",
    of: "de",
    messages: "messages",
    viewMessage: "Voir le Message",
    reply: "Répondre",
    deleteMessage: "Supprimer le Message",
    deleteConfirmation: "Êtes-vous sûr de vouloir supprimer ce message ?",
    actionUndone: "Cette action est irréversible.",
    cancel: "Annuler",
    delete: "Supprimer",
    deleting: "Suppression...",
    messageDeleted: "Message supprimé avec succès !",
    deleteFailed: "Échec de la suppression du message",
    statusUpdated: "Statut du message mis à jour avec succès !",
    statusUpdateFailed: "Échec de la mise à jour du statut",
    replySent: "Réponse envoyée avec succès !",
    replyFailed: "Échec de l'envoi de la réponse",
    messageDetails: "Détails du Message",
    senderName: "Nom de l'Expéditeur",
    senderEmail: "Email de l'Expéditeur",
    recipientEmail: "Email du Destinataire",
    messageContent: "Contenu du Message",
    attachments: "Pièces Jointes",
    replyLabel: "Réponse",
    sendReply: "Envoyer la Réponse",
    updateStatus: "Mettre à Jour le Statut",
    selectStatus: "Sélectionner le Statut",
    replyPlaceholder: "Tapez votre réponse ici...",
    noAttachments: "Aucune pièce jointe",
    close: "Fermer",
    send: "Envoyer",
    sending: "Envoi en cours...",
    composeMessage: "Composer un Message",
    newMessage: "Nouveau Message",
    createMessage: "Créer un Message",
    messageCreated: "Message créé avec succès !",
    createFailed: "Échec de la création du message",
    markAsRead: "Marquer comme Lu",
    markAsUnread: "Marquer comme Non Lu",
    toggleStar: "Basculer Favori",
    toggleFlag: "Basculer Signalement",
    archive: "Archiver",
    unarchive: "Désarchiver",
    labels: "Étiquettes",
    tags: "Tags",
    addLabel: "Ajouter une Étiquette",
    addTag: "Ajouter un Tag",
    general: "Général",
    support: "Support",
    booking: "Réservation",
    payment: "Paiement",
    complaint: "Réclamation",
    feedback: "Avis",
    other: "Autre",
    low: "Faible",
    medium: "Moyen",
    high: "Élevé",
    urgent: "Urgent",
    all: "Tous",
    selectCategory: "Sélectionner une Catégorie",
    selectPriority: "Sélectionner une Priorité",
    recipient: "Destinataire",
    content: "Contenu",
    attachmentsLabel: "Pièces Jointes",
    noImage: "Aucune image jointe",
    viewImage: "Voir l'Image",
    loading: "Chargement...",
    fetchError: "Échec du chargement des messages",
    replyTo: "Répondre à",
    nameRequired: "Le nom est requis",
    nameMinLength: "Le nom doit contenir au moins 2 caractères",
    emailRequired: "L'email est requis",
    emailInvalid: "Veuillez entrer un email valide",
    messageRequired: "Le message est requis",
    messageMinLength: "Le message doit contenir au moins 10 caractères",
    messageMaxLength: "Le message ne peut pas dépasser 1000 caractères",
    allFieldsValid: "Tous les champs sont valides !",
    pleaseFixErrors: "Veuillez corriger les erreurs ci-dessus",
    noUserEmail: "Aucun email utilisateur trouvé. Veuillez vous reconnecter.",
    success: "Succès !",
    error: "Erreur",
    confirm: "Confirmer",
    replyHistory: "Historique des Réponses",
    admin: "Admin",
    you: "Vous",
  },
  rw: {
    messageManagement: "Ubutumwa Bwanjye",
    manageMessages: "Reba kandi ucunge ubutumwa bwawe",
    total: "Yose",
    pending: "Bitegereje",
    read: "Byasomwe",
    replied: "Byasubijwe",
    resolved: "Byakemutse",
    archived: "Byabitswe",
    flagged: "Byashyizwe ikimenyetso",
    starred: "Byakunzwe",
    searchMessages:
      "Shakisha ukurikije izina, imeri cyangwa ibiri mu butumwa...",
    allStatus: "Ihagaze Ryose",
    allCategories: "Ibyiciro Byose",
    allPriorities: "Iby'ibanze Byose",
    message: "Ubutumwa",
    sender: "Uwohereje",
    subject: "Ikiganiro",
    category: "Icyiciro",
    priority: "Iby'ibanze",
    status: "Ihagaze",
    received: "Cyakiriwe",
    actions: "Ibikorwa",
    noMessages: "Nta butumwa bwabonetse",
    adjustFilters: "Gerageza guhindura uburyo ushakisha cyangwa amatungo",
    showing: "Bereka",
    of: "muri",
    messages: "ubutumwa",
    viewMessage: "Reba Ubutumwa",
    reply: "Subiza",
    deleteMessage: "Kuraho Ubutumwa",
    deleteConfirmation: "Uri kwizera ko ushaka gukuraho ubu butumwa?",
    actionUndone: "Iki gikorwa ntikishobora guhindurwa.",
    cancel: "Reka",
    delete: "Kuraho",
    deleting: "Birakurwaho...",
    messageDeleted: "Ubutumwa bwakuweho neza!",
    deleteFailed: "Kuraho ubutumwa birananiranye",
    statusUpdated: "Ihagaze ry'ubutumwa ryavuguruwe neza!",
    statusUpdateFailed: "Kuvugurura ihagaze birananiranye",
    replySent: "Igisubizo cyoherejwe neza!",
    replyFailed: "Kohereza igisubizo birananiranye",
    messageDetails: "Ibisobanuro by'Ubutumwa",
    senderName: "Izina ry'Uwohereje",
    senderEmail: "Imeri y'Uwohereje",
    recipientEmail: "Imeri y'Uwakiriye",
    messageContent: "Ibirimo mu Butumwa",
    attachments: "Ibishushanyo",
    replyLabel: "Igisubizo",
    sendReply: "Ohereza Igisubizo",
    updateStatus: "Vugurura Ihagaze",
    selectStatus: "Hitamo Ihagaze",
    replyPlaceholder: "Andika igisubizo cyawe hano...",
    noAttachments: "Nta bishushanyo",
    close: "Funga",
    send: "Ohereza",
    sending: "Biremereza...",
    composeMessage: "Andika Ubutumwa",
    newMessage: "Ubutumwa Bushya",
    createMessage: "Kora Ubutumwa",
    messageCreated: "Ubutumwa bwakozwe neza!",
    createFailed: "Kora ubutumwa birananiranye",
    markAsRead: "Shyira nk'Uwasomye",
    markAsUnread: "Shyira nk'Utarasomye",
    toggleStar: "Hindura Ibyakunzwe",
    toggleFlag: "Hindura Ikimenyetso",
    archive: "Bika",
    unarchive: "Kuraho mu bibitswe",
    labels: "Ibyiciro",
    tags: "Ibimenyetso",
    addLabel: "Ongeraho Icyiciro",
    addTag: "Ongeraho Ikimenyetso",
    general: "Rusange",
    support: "Ubufasha",
    booking: "Icyemezo",
    payment: "Ubwishyu",
    complaint: "Ikirego",
    feedback: "Ibitekerezo",
    other: "Ibindi",
    low: "Gito",
    medium: "Rishoboka",
    high: "Kinini",
    urgent: "Byihutirwa",
    all: "Byose",
    selectCategory: "Hitamo Icyiciro",
    selectPriority: "Hitamo Iby'ibanze",
    recipient: "Uwakiriye",
    content: "Ibirimo",
    attachmentsLabel: "Ibishushanyo",
    noImage: "Nta shusho yashyizweho",
    viewImage: "Reba Ishusho",
    loading: "Birakoreshwa...",
    fetchError: "Kubura ubutumwa birananiranye",
    replyTo: "Subiza kuri",
    nameRequired: "Izina rirasabwa",
    nameMinLength: "Izina rigomba kuba ibinyuguti 2 byibuze",
    emailRequired: "Imeri irasabwa",
    emailInvalid: "Andika imeri ikwiye",
    messageRequired: "Ubutumwa burasabwa",
    messageMinLength: "Ubutumwa bugomba kuba ibinyuguti 10 byibuze",
    messageMaxLength: "Ubutumwa ntibugomba kurenga ibinyuguti 1000",
    allFieldsValid: "Ibice byose birimo amakuru akwiye!",
    pleaseFixErrors: "Kosora amakosa hejuru",
    noUserEmail:
      "Nta imeri y'umukoresha yabonetse. Nyamuneka winjire undi munsi.",
    success: "Byakunze!",
    error: "Ikosa",
    confirm: "Emeza",
    replyHistory: "Amateka y'Ibisubizo",
    admin: "Ubuyobozi",
    you: "Wewe",
  },
};

// Helper function to get language from cookies
const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
  const lang = Cookies.get("language") as "en" | "fr" | "rw";
  return lang || "en";
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
  } catch {
    // Silently handle error
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

// Helper function to get user name from localStorage
const getUserNameFromStorage = (): string => {
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.name) {
        return user.name;
      }
    }
  } catch {
    // Silently handle error
  }
  return "";
};

// API Base URL
const API_BASE_URL = "https://rene-inyumba-nodejs.onrender.com";

// Helper function to transform contact to message
const transformContactToMessage = (contact: Contact): Message => {
  const messageText = contact.message || "";

  const msgLower = messageText.toLowerCase();

  // Determine category
  let category: Message["category"] = "general";

  if (
    msgLower.includes("support") ||
    msgLower.includes("help") ||
    msgLower.includes("assist")
  ) {
    category = "support";
  } else if (
    msgLower.includes("book") ||
    msgLower.includes("reserv") ||
    msgLower.includes("housing") ||
    msgLower.includes("house")
  ) {
    category = "booking";
  } else if (
    msgLower.includes("pay") ||
    msgLower.includes("momo") ||
    msgLower.includes("money")
  ) {
    category = "payment";
  } else if (
    msgLower.includes("complaint") ||
    msgLower.includes("issue") ||
    msgLower.includes("problem") ||
    msgLower.includes("report")
  ) {
    category = "complaint";
  } else if (
    msgLower.includes("feedback") ||
    msgLower.includes("suggest") ||
    msgLower.includes("great") ||
    msgLower.includes("good")
  ) {
    category = "feedback";
  }

  // Determine priority
  let priority: Message["priority"] = "medium";

  if (contact.status === "pending") {
    priority = "high";
  }

  if (
    msgLower.includes("urgent") ||
    msgLower.includes("emergency") ||
    msgLower.includes("immediate")
  ) {
    priority = "urgent";
  }

  // Labels and tags
  const labels: string[] = [];
  const tags: string[] = [];

  if (
    msgLower.includes("housing") ||
    msgLower.includes("house") ||
    msgLower.includes("apartment")
  ) {
    labels.push("housing");
    tags.push("accommodation");
  }

  if (msgLower.includes("student")) {
    tags.push("student");
  }

  if (msgLower.includes("landlord") || msgLower.includes("host")) {
    tags.push("landlord");
  }

  if (msgLower.includes("payment") || msgLower.includes("momo")) {
    labels.push("payment");
    tags.push("payment");
  }

  // Build reply history from existing replies
  const replyHistory: { from: string; message: string; timestamp: string }[] =
    [];

  // If there's a reply message, add it to history
  if (contact.replyMessage) {
    replyHistory.push({
      from: "Admin",
      message: contact.replyMessage,
      timestamp: contact.repliedAt || contact.updatedAt,
    });
  }

  return {
    id: contact._id,
    _id: contact._id,
    name: contact.name,
    email: contact.email,
    message: messageText,
    status: contact.status || "pending",
    ipAddress: contact.ipAddress || null,
    userAgent: contact.userAgent || null,
    repliedAt: contact.repliedAt || null,
    readAt: contact.readAt || null,
    replyMessage: contact.replyMessage || null,
    createdAt: contact.createdAt,
    updatedAt: contact.updatedAt,
    senderName: contact.name,
    senderEmail: contact.email,
    content: messageText,
    subject: `Message from ${contact.name}`,
    isRead: contact.status !== "pending",
    isFlagged: false,
    isStarred: false,
    category,
    priority,
    labels,
    tags,
    repliedBy: contact.repliedAt ? "Admin" : undefined,
    replyHistory,
  };
};

// Helper function to transform message to contact for API
const transformMessageToContact = (message: MessageFormData): any => {
  return {
    name: message.name,
    email: message.email,
    message: message.message,
  };
};

export const UserMessageManagement: React.FC = () => {
  // Get language from cookies
  const [lang, setLang] = useState<"en" | "fr" | "rw">(
    getLanguageFromCookies(),
  );

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

  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");

  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [, setIsDeleteModalOpen] = useState(false);
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyContent, setReplyContent] = useState("");

  // Confirm Modal state
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
    type?: "danger" | "warning" | "info" | "success";
    icon?: React.ReactNode;
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
    confirmText: "Confirm",
    cancelText: "Cancel",
    type: "warning",
  });

  // Compose form state
  const [formData, setFormData] = useState<MessageFormData>({
    name: "",
    email: "",
    message: "",
    status: "pending",
  });

  // Form validation
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<{
    name: boolean;
    email: boolean;
    message: boolean;
  }>({
    name: false,
    email: false,
    message: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Statistics
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    read: 0,
    replied: 0,
    archived: 0,
    flagged: 0,
    starred: 0,
  });

  const t = translations[lang];

  // Get user email from localStorage
  const userEmail = getUserEmailFromStorage();
  const userName = getUserNameFromStorage();

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

  const showConfirmModal = (
    title: string,
    message: string,
    onConfirm: () => void,
    confirmText?: string,
    cancelText?: string,
    type?: "danger" | "warning" | "info" | "success",
    icon?: React.ReactNode,
  ) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      onConfirm,
      confirmText: confirmText || t.confirm || "Confirm",
      cancelText: cancelText || t.cancel || "Cancel",
      type: type || "warning",
      icon,
    });
  };

  const closeConfirmModal = () => {
    setConfirmModal((prev) => ({ ...prev, isOpen: false }));
  };

  // Initialize form with user data
  useEffect(() => {
    if (userName) {
      setFormData((prev) => ({ ...prev, name: userName }));
    }
    if (userEmail) {
      setFormData((prev) => ({ ...prev, email: userEmail }));
    }
  }, [userName, userEmail]);

  // Validation functions
  const validateName = (name: string): string | undefined => {
    if (!name || name.trim() === "") {
      return t.nameRequired;
    }
    if (name.trim().length < 2) {
      return t.nameMinLength;
    }
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email || email.trim() === "") {
      return t.emailRequired;
    }
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email.trim())) {
      return t.emailInvalid;
    }
    return undefined;
  };

  const validateMessage = (message: string): string | undefined => {
    if (!message || message.trim() === "") {
      return t.messageRequired;
    }
    if (message.trim().length < 10) {
      return t.messageMinLength;
    }
    if (message.trim().length > 1000) {
      return t.messageMaxLength;
    }
    return undefined;
  };

  // Validate all form fields
  const validateForm = () => {
    const errors: FormErrors = {};
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const messageError = validateMessage(formData.message);

    if (nameError) errors.name = nameError;
    if (emailError) errors.email = emailError;
    if (messageError) errors.message = messageError;

    setFormErrors(errors);
    const valid = Object.keys(errors).length === 0;
    setIsFormValid(valid);
    return valid;
  };

  // Handle field blur (mark as touched)
  const handleFieldBlur = (field: "name" | "email" | "message") => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
    validateForm();
  };

  // Handle field change with validation
  const handleFieldChange = (field: keyof MessageFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    let error: string | undefined;
    if (field === "name") error = validateName(value);
    else if (field === "email") error = validateEmail(value);
    else if (field === "message") error = validateMessage(value);

    setFormErrors((prev) => ({ ...prev, [field]: error }));

    const nameError = field === "name" ? error : validateName(formData.name);
    const emailError =
      field === "email" ? error : validateEmail(formData.email);
    const messageError =
      field === "message" ? error : validateMessage(formData.message);

    const valid = !nameError && !emailError && !messageError;
    setIsFormValid(valid);
  };

  // Fetch messages by user email - GET /contact/email/:email
  const fetchMessages = async () => {
    setIsFetching(true);
    try {
      const currentEmail = getUserEmailFromStorage();

      if (!currentEmail) {
        showErrorModal(
          t.error || "Error",
          t.noUserEmail || "No user email found. Please login again.",
        );
        setIsFetching(false);
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/contact/email/${encodeURIComponent(currentEmail)}`,
      );

      if (!response.ok) {
        if (response.status === 404) {
          setMessages([]);
          setIsFetching(false);
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      let contacts: Contact[] = [];
      if (Array.isArray(data)) {
        contacts = data;
      } else if (data && typeof data === "object") {
        if (data._id) {
          contacts = [data];
        } else if (data.data && Array.isArray(data.data)) {
          contacts = data.data;
        } else if (data.contacts && Array.isArray(data.contacts)) {
          contacts = data.contacts;
        } else {
          const possibleArrays = Object.values(data).filter((val) =>
            Array.isArray(val),
          );
          if (possibleArrays.length > 0) {
            contacts = possibleArrays[0];
          }
        }
      }

      const transformedMessages = contacts.map((contact: Contact) =>
        transformContactToMessage(contact),
      );
      setMessages(transformedMessages);
    } catch {
      showErrorModal(
        t.error || "Error",
        t.fetchError || "Failed to load messages",
      );
    } finally {
      setIsFetching(false);
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
    fetchMessages();
  }, []);

  // Filter messages
  useEffect(() => {
    let filtered = [...messages];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (msg) =>
          msg.name.toLowerCase().includes(term) ||
          msg.email.toLowerCase().includes(term) ||
          msg.message.toLowerCase().includes(term) ||
          msg.subject.toLowerCase().includes(term),
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((msg) => msg.status === filterStatus);
    }

    if (filterCategory !== "all") {
      filtered = filtered.filter((msg) => msg.category === filterCategory);
    }

    if (filterPriority !== "all") {
      filtered = filtered.filter((msg) => msg.priority === filterPriority);
    }

    setFilteredMessages(filtered);
  }, [messages, searchTerm, filterStatus, filterCategory, filterPriority]);

  // Update statistics
  useEffect(() => {
    const total = messages.length;
    const pending = messages.filter((m) => m.status === "pending").length;
    const read = messages.filter((m) => m.status === "read").length;
    const replied = messages.filter((m) => m.status === "replied").length;
    const archived = messages.filter((m) => m.status === "archived").length;
    const flagged = messages.filter((m) => m.isFlagged).length;
    const starred = messages.filter((m) => m.isStarred).length;

    setStats({ total, pending, read, replied, archived, flagged, starred });
  }, [messages]);

  // Get status badge color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "read":
        return "bg-blue-100 text-blue-800";
      case "replied":
        return "bg-green-100 text-green-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get status label
  const getStatusLabel = (status: string): string => {
    switch (status) {
      case "pending":
        return t.pending;
      case "read":
        return t.read;
      case "replied":
        return t.replied;
      case "archived":
        return t.archived;
      default:
        return status;
    }
  };

  // Get category color
  const getCategoryColor = (category: string): string => {
    switch (category) {
      case "general":
        return "bg-gray-100 text-gray-800";
      case "support":
        return "bg-blue-100 text-blue-800";
      case "booking":
        return "bg-purple-100 text-purple-800";
      case "payment":
        return "bg-green-100 text-green-800";
      case "complaint":
        return "bg-red-100 text-red-800";
      case "feedback":
        return "bg-yellow-100 text-yellow-800";
      case "other":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get priority color
  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case "low":
        return "bg-gray-100 text-gray-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "urgent":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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

  // CRUD Operations
  const handleCreateMessage = async () => {
    const isValid = validateForm();

    if (!isValid) {
      showErrorModal(
        t.error || "Error",
        t.pleaseFixErrors || "Please fix the errors above",
      );
      setTouchedFields({
        name: true,
        email: true,
        message: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const contactData = transformMessageToContact(formData);

      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to submit contact form");
      }

      if (!result.data) {
        throw new Error("Invalid response from server");
      }

      const newMessage = transformContactToMessage(result.data);
      setMessages((prev) => [newMessage, ...prev]);

      showSuccessModal(
        t.success || "Success!",
        t.messageCreated || "Message created successfully!",
        `Your message has been sent`,
      );

      resetForm();
      setIsComposeModalOpen(false);
    } catch {
      showErrorModal(
        t.error || "Error",
        t.createFailed || "Failed to create message",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMessage = async () => {
    if (!selectedMessage) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/contact/${selectedMessage._id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedMessages = messages.filter(
        (m) => m._id !== selectedMessage._id,
      );
      setMessages(updatedMessages);

      showSuccessModal(
        t.success || "Success!",
        t.messageDeleted || "Message deleted successfully!",
        `Message from ${selectedMessage.senderName} has been removed`,
      );
      setIsDeleteModalOpen(false);
      setSelectedMessage(null);
      closeConfirmModal();
    } catch {
      showErrorModal(
        t.error || "Error",
        t.deleteFailed || "Failed to delete message",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendReply = async () => {
    if (!selectedMessage || !replyContent.trim()) {
      showErrorModal(t.error || "Error", "Please enter a reply");
      return;
    }

    setIsSubmitting(true);

    try {
      // Get existing reply history
      const existingHistory = selectedMessage.replyHistory || [];

      // Add user's new reply to history
      const newReply = {
        from: "You",
        message: replyContent,
        timestamp: new Date().toISOString(),
      };

      const updatedHistory = [...existingHistory, newReply];

      // For the API, we'll update the replyMessage field with the latest reply
      const response = await fetch(
        `${API_BASE_URL}/contact/${selectedMessage._id}/reply`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            replyMessage: replyContent,
            status: "read", // Set to read when user replies
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedContact = await response.json();
      const updatedMessage = transformContactToMessage(updatedContact);

      // Preserve the reply history
      updatedMessage.replyHistory = updatedHistory;

      const updatedMessages = messages.map((m) =>
        m._id === selectedMessage._id ? updatedMessage : m,
      );
      setMessages(updatedMessages);

      showSuccessModal(
        t.success || "Success!",
        t.replySent || "Reply sent successfully!",
        `Your reply has been sent to ${selectedMessage.senderName}`,
      );
      setIsReplyModalOpen(false);
      setSelectedMessage(null);
      setReplyContent("");
    } catch {
      showErrorModal(
        t.error || "Error",
        t.replyFailed || "Failed to send reply",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStar = async (messageId: string) => {
    const message = messages.find((m) => m._id === messageId);
    if (!message) return;

    const updatedMessages = messages.map((m) =>
      m._id === messageId ? { ...m, isStarred: !m.isStarred } : m,
    );
    setMessages(updatedMessages);
  };

  const handleToggleFlag = async (messageId: string) => {
    const message = messages.find((m) => m._id === messageId);
    if (!message) return;

    const updatedMessages = messages.map((m) =>
      m._id === messageId ? { ...m, isFlagged: !m.isFlagged } : m,
    );
    setMessages(updatedMessages);
  };

  const handleMarkAsRead = async (messageId: string) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/contact/${messageId}/read`,
        {
          method: "PUT",
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedContact = await response.json();
      const updatedMessage = transformContactToMessage(updatedContact);

      const updatedMessages = messages.map((m) =>
        m._id === messageId ? updatedMessage : m,
      );
      setMessages(updatedMessages);
    } catch {
      // Silently handle error
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: userName || "",
      email: userEmail || "",
      message: "",
      status: "pending",
      replyMessage: "",
    });
    setFormErrors({});
    setTouchedFields({
      name: false,
      email: false,
      message: false,
    });
    setIsFormValid(false);
  };

  // Open modals
  const openViewModal = (message: Message) => {
    setSelectedMessage(message);
    setIsViewModalOpen(true);
    if (!message.isRead) {
      handleMarkAsRead(message._id);
    }
  };

  const openReplyModal = (message: Message) => {
    setSelectedMessage(message);
    setReplyContent("");
    setIsReplyModalOpen(true);
  };

  const openDeleteModal = (message: Message) => {
    setSelectedMessage(message);
    showConfirmModal(
      "⚠️ " + t.deleteMessage || "Delete Message",
      `${t.deleteConfirmation || "Are you sure you want to delete this message?"} ${t.actionUndone || "This action cannot be undone."}`,
      handleDeleteMessage,
      t.delete || "Delete",
      t.cancel || "Cancel",
      "danger",
      <DeleteIcon className="w-10 h-10" />,
    );
  };

  const openComposeModal = () => {
    resetForm();
    setIsComposeModalOpen(true);
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

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={closeConfirmModal}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        cancelText={confirmModal.cancelText}
        isSubmitting={isLoading}
        type={confirmModal.type}
        icon={confirmModal.icon}
      />

      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <MessageIcon className="w-7 h-7 text-[#FF385C]" />
              {t.messageManagement}
            </h1>
            <p className="text-sm text-gray-500 mt-1">{t.manageMessages}</p>
            {userEmail && (
              <p className="text-xs text-gray-400 mt-1">
                Messages for: {userEmail}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={openComposeModal}
              className="px-4 py-2 bg-[#FF385C] text-white rounded-lg text-sm font-medium hover:bg-[#E31C5F] transition-colors flex items-center gap-2"
            >
              <AddIcon className="w-4 h-4" />
              {t.composeMessage}
            </motion.button>
            <button
              onClick={fetchMessages}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RefreshIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white rounded-xl p-3 shadow-sm border border-gray-200"
        >
          <p className="text-xs text-gray-500">{t.total}</p>
          <p className="text-xl font-bold text-gray-900">{stats.total}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-yellow-50 rounded-xl p-3 shadow-sm border border-yellow-200"
        >
          <p className="text-xs text-yellow-600">{t.pending}</p>
          <p className="text-xl font-bold text-yellow-700">{stats.pending}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-blue-50 rounded-xl p-3 shadow-sm border border-blue-200"
        >
          <p className="text-xs text-blue-600">{t.read}</p>
          <p className="text-xl font-bold text-blue-700">{stats.read}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-green-50 rounded-xl p-3 shadow-sm border border-green-200"
        >
          <p className="text-xs text-green-600">{t.replied}</p>
          <p className="text-xl font-bold text-green-700">{stats.replied}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-gray-50 rounded-xl p-3 shadow-sm border border-gray-200"
        >
          <p className="text-xs text-gray-500">{t.archived}</p>
          <p className="text-xl font-bold text-gray-900">{stats.archived}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-red-50 rounded-xl p-3 shadow-sm border border-red-200"
        >
          <p className="text-xs text-red-600">{t.flagged}</p>
          <p className="text-xl font-bold text-red-700">{stats.flagged}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-purple-50 rounded-xl p-3 shadow-sm border border-purple-200"
        >
          <p className="text-xs text-purple-600">{t.starred}</p>
          <p className="text-xl font-bold text-purple-700">{stats.starred}</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t.searchMessages}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
            >
              <option value="all">{t.allStatus}</option>
              <option value="pending">{t.pending}</option>
              <option value="read">{t.read}</option>
              <option value="replied">{t.replied}</option>
              <option value="archived">{t.archived}</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
            >
              <option value="all">{t.allCategories}</option>
              <option value="general">{t.general}</option>
              <option value="support">{t.support}</option>
              <option value="booking">{t.booking}</option>
              <option value="payment">{t.payment}</option>
              <option value="complaint">{t.complaint}</option>
              <option value="feedback">{t.feedback}</option>
              <option value="other">{t.other}</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
            >
              <option value="all">{t.allPriorities}</option>
              <option value="low">{t.low}</option>
              <option value="medium">{t.medium}</option>
              <option value="high">{t.high}</option>
              <option value="urgent">{t.urgent}</option>
            </select>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("all");
                setFilterCategory("all");
                setFilterPriority("all");
              }}
              className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ClearIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <span>{t.message}</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  {t.sender}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  {t.category}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  {t.priority}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.status}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  {t.received}
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.actions}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMessages.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    <MessageIcon className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                    <p>{t.noMessages}</p>
                    <p className="text-sm">{t.adjustFilters}</p>
                  </td>
                </tr>
              ) : (
                filteredMessages.map((message) => (
                  <motion.tr
                    key={message._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`hover:bg-gray-50 transition-colors cursor-pointer ${!message.isRead ? "bg-blue-50/50" : ""}`}
                    onClick={() => openViewModal(message)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 flex items-center gap-1">
                          {message.isStarred && (
                            <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                          )}
                          {message.isFlagged && (
                            <FlagIcon className="w-4 h-4 text-red-400 fill-current" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p
                            className={`text-sm ${!message.isRead ? "font-semibold text-gray-900" : "text-gray-900"}`}
                          >
                            {message.subject}
                          </p>
                          <p className="text-xs text-gray-500 truncate md:hidden">
                            {message.senderName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-sm text-gray-600">
                        {message.senderName}
                      </p>
                      <p className="text-xs text-gray-400">
                        {message.senderEmail}
                      </p>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${getCategoryColor(message.category)}`}
                      >
                        {message.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${getPriorityColor(message.priority)}`}
                      >
                        {message.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(message.status)}`}
                      >
                        {getStatusLabel(message.status)}
                      </span>
                      {!message.isRead && (
                        <span className="ml-1 w-2 h-2 inline-block bg-blue-500 rounded-full"></span>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <p className="text-sm text-gray-600">
                        {formatDate(message.createdAt)}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            openViewModal(message);
                          }}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title={t.viewMessage}
                        >
                          <VisibilityIcon className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            openReplyModal(message);
                          }}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title={t.reply}
                        >
                          <ReplyIcon className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleStar(message._id);
                          }}
                          className={`p-1.5 rounded-lg transition-colors ${message.isStarred ? "text-yellow-400 hover:bg-yellow-50" : "text-gray-400 hover:bg-yellow-50"}`}
                          title={t.toggleStar}
                        >
                          {message.isStarred ? (
                            <StarIcon className="w-4 h-4" />
                          ) : (
                            <StarBorderIcon className="w-4 h-4" />
                          )}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleFlag(message._id);
                          }}
                          className={`p-1.5 rounded-lg transition-colors ${message.isFlagged ? "text-red-400 hover:bg-red-50" : "text-gray-400 hover:bg-red-50"}`}
                          title={t.toggleFlag}
                        >
                          {message.isFlagged ? (
                            <FlagIcon className="w-4 h-4" />
                          ) : (
                            <FlagOutlinedIcon className="w-4 h-4" />
                          )}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            openDeleteModal(message);
                          }}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title={t.deleteMessage}
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
            {t.showing} {filteredMessages.length} {t.of} {messages.length}{" "}
            {t.messages}
          </p>
        </div>
      </div>

      {/* View Message Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedMessage && (
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
              <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
                <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
                  <div className="flex items-center gap-2">
                    <MessageIcon className="text-[#FF385C] w-5 h-5" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      {t.messageDetails}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleToggleStar(selectedMessage._id)}
                      className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      {selectedMessage.isStarred ? (
                        <StarIcon className="w-5 h-5 text-yellow-400" />
                      ) : (
                        <StarBorderIcon className="w-5 h-5 text-gray-400" />
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleToggleFlag(selectedMessage._id)}
                      className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      {selectedMessage.isFlagged ? (
                        <FlagIcon className="w-5 h-5 text-red-400" />
                      ) : (
                        <FlagOutlinedIcon className="w-5 h-5 text-gray-400" />
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ rotate: 90, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsViewModalOpen(false)}
                      className="p-1.5 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                    >
                      <CloseIcon className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.senderName}
                      </label>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {selectedMessage.senderName}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.senderEmail}
                      </label>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {selectedMessage.senderEmail}
                      </p>
                    </div>
                  </div>

                  {selectedMessage.ipAddress && (
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        IP Address
                      </label>
                      <p className="text-sm text-gray-600 mt-1">
                        {selectedMessage.ipAddress}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.subject}
                      </label>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {selectedMessage.subject}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.category}
                      </label>
                      <p className="mt-1">
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full ${getCategoryColor(selectedMessage.category)}`}
                        >
                          {selectedMessage.category}
                        </span>
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.priority}
                      </label>
                      <p className="mt-1">
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full ${getPriorityColor(selectedMessage.priority)}`}
                        >
                          {selectedMessage.priority}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      {t.messageContent}
                    </label>
                    <div className="mt-1 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {selectedMessage.message}
                      </p>
                    </div>
                  </div>

                  {/* Reply History */}
                  {selectedMessage.replyHistory &&
                    selectedMessage.replyHistory.length > 0 && (
                      <div className="border-t border-gray-200 pt-4">
                        <label className="text-xs font-medium text-gray-500">
                          {t.replyHistory}
                        </label>
                        <div className="mt-2 space-y-3">
                          {selectedMessage.replyHistory.map((reply, index) => (
                            <div
                              key={index}
                              className={`p-3 rounded-lg ${reply.from === "Admin" ? "bg-blue-50 border border-blue-200" : "bg-green-50 border border-green-200"}`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span
                                  className={`text-xs font-semibold ${reply.from === "Admin" ? "text-blue-700" : "text-green-700"}`}
                                >
                                  {reply.from === "Admin" ? t.admin : t.you}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {formatDate(reply.timestamp)}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                {reply.message}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsViewModalOpen(false);
                        openReplyModal(selectedMessage);
                      }}
                      className="px-4 py-2.5 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors flex items-center gap-2"
                    >
                      <ReplyIcon className="w-4 h-4" />
                      {t.reply}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsViewModalOpen(false);
                        openDeleteModal(selectedMessage);
                      }}
                      className="px-4 py-2.5 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center gap-2"
                    >
                      <DeleteIcon className="w-4 h-4" />
                      {t.delete}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsViewModalOpen(false)}
                      className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors ml-auto"
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

      {/* Reply Modal */}
      <AnimatePresence>
        {isReplyModalOpen && selectedMessage && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setIsReplyModalOpen(false)}
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
                    <ReplyIcon className="text-[#FF385C] w-5 h-5" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      {t.replyTo} {selectedMessage.senderName}
                    </h2>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setIsReplyModalOpen(false);
                      setReplyContent("");
                    }}
                    className="p-1.5 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="p-6 space-y-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-700">From:</span>{" "}
                      {selectedMessage.senderName} (
                      {selectedMessage.senderEmail})
                    </p>
                    <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                      {selectedMessage.message}
                    </p>
                  </div>

                  {/* Show reply history in reply modal */}
                  {selectedMessage.replyHistory &&
                    selectedMessage.replyHistory.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {t.replyHistory}
                        </label>
                        <div className="max-h-40 overflow-y-auto space-y-2 p-2 bg-gray-50 rounded-lg">
                          {selectedMessage.replyHistory.map((reply, index) => (
                            <div
                              key={index}
                              className={`p-2 rounded-lg ${reply.from === "Admin" ? "bg-blue-100" : "bg-green-100"}`}
                            >
                              <div className="flex items-center justify-between">
                                <span
                                  className={`text-xs font-semibold ${reply.from === "Admin" ? "text-blue-700" : "text-green-700"}`}
                                >
                                  {reply.from === "Admin" ? t.admin : t.you}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {formatDate(reply.timestamp)}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                {reply.message}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.replyLabel}
                    </label>
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      rows={6}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none"
                      placeholder={t.replyPlaceholder}
                    />
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSendReply}
                      disabled={isSubmitting || !replyContent.trim()}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 ${
                        isSubmitting || !replyContent.trim()
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#FF385C] hover:bg-[#E31C5F]"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {t.sending}
                        </>
                      ) : (
                        <>
                          <SendIcon className="w-4 h-4" />
                          {t.sendReply}
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsReplyModalOpen(false);
                        setReplyContent("");
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

      {/* Compose Message Modal */}
      <AnimatePresence>
        {isComposeModalOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => {
                setIsComposeModalOpen(false);
                resetForm();
              }}
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
                    <SendIcon className="text-[#FF385C] w-5 h-5" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      {t.newMessage}
                    </h2>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setIsComposeModalOpen(false);
                      resetForm();
                    }}
                    className="p-1.5 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="p-6 space-y-4">
                  {isFormValid &&
                    touchedFields.name &&
                    touchedFields.email &&
                    touchedFields.message && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                        <CheckCircleIcon className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-green-700 font-medium">
                          {t.allFieldsValid}
                        </span>
                      </div>
                    )}

                  {!isFormValid &&
                    (touchedFields.name ||
                      touchedFields.email ||
                      touchedFields.message) && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                        <ErrorIcon className="w-5 h-5 text-red-600" />
                        <span className="text-sm text-red-700 font-medium">
                          {t.pleaseFixErrors}
                        </span>
                      </div>
                    )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.senderName} *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            handleFieldChange("name", e.target.value)
                          }
                          onBlur={() => handleFieldBlur("name")}
                          className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm transition-colors ${
                            touchedFields.name && formErrors.name
                              ? "border-red-500 bg-red-50"
                              : touchedFields.name &&
                                  !formErrors.name &&
                                  formData.name
                                ? "border-green-500 bg-green-50"
                                : "border-gray-300"
                          }`}
                          placeholder="John Doe"
                        />
                        {touchedFields.name &&
                          !formErrors.name &&
                          formData.name && (
                            <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                          )}
                        {touchedFields.name && formErrors.name && (
                          <ErrorIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                        )}
                      </div>
                      {touchedFields.name && formErrors.name && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <ErrorIcon className="w-3 h-3" />
                          {formErrors.name}
                        </p>
                      )}
                      {touchedFields.name &&
                        !formErrors.name &&
                        formData.name && (
                          <p className="mt-1 text-xs text-green-600 flex items-center gap-1">
                            <CheckCircleIcon className="w-3 h-3" />
                            Valid
                          </p>
                        )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.senderEmail} *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleFieldChange("email", e.target.value)
                          }
                          onBlur={() => handleFieldBlur("email")}
                          className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm transition-colors ${
                            touchedFields.email && formErrors.email
                              ? "border-red-500 bg-red-50"
                              : touchedFields.email &&
                                  !formErrors.email &&
                                  formData.email
                                ? "border-green-500 bg-green-50"
                                : "border-gray-300"
                          }`}
                          placeholder="you@example.com"
                        />
                        {touchedFields.email &&
                          !formErrors.email &&
                          formData.email && (
                            <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                          )}
                        {touchedFields.email && formErrors.email && (
                          <ErrorIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                        )}
                      </div>
                      {touchedFields.email && formErrors.email && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <ErrorIcon className="w-3 h-3" />
                          {formErrors.email}
                        </p>
                      )}
                      {touchedFields.email &&
                        !formErrors.email &&
                        formData.email && (
                          <p className="mt-1 text-xs text-green-600 flex items-center gap-1">
                            <CheckCircleIcon className="w-3 h-3" />
                            Valid
                          </p>
                        )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.content} *
                    </label>
                    <div className="relative">
                      <textarea
                        value={formData.message}
                        onChange={(e) =>
                          handleFieldChange("message", e.target.value)
                        }
                        onBlur={() => handleFieldBlur("message")}
                        rows={5}
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none transition-colors ${
                          touchedFields.message && formErrors.message
                            ? "border-red-500 bg-red-50"
                            : touchedFields.message &&
                                !formErrors.message &&
                                formData.message
                              ? "border-green-500 bg-green-50"
                              : "border-gray-300"
                        }`}
                        placeholder="Type your message here..."
                      />
                      {touchedFields.message &&
                        !formErrors.message &&
                        formData.message && (
                          <CheckCircleIcon className="absolute right-3 top-3 w-5 h-5 text-green-500" />
                        )}
                      {touchedFields.message && formErrors.message && (
                        <ErrorIcon className="absolute right-3 top-3 w-5 h-5 text-red-500" />
                      )}
                    </div>
                    {touchedFields.message && formErrors.message && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <ErrorIcon className="w-3 h-3" />
                        {formErrors.message}
                      </p>
                    )}
                    {touchedFields.message &&
                      !formErrors.message &&
                      formData.message && (
                        <p className="mt-1 text-xs text-green-600 flex items-center gap-1">
                          <CheckCircleIcon className="w-3 h-3" />
                          Valid ({formData.message.length}/1000 characters)
                        </p>
                      )}
                    <p className="mt-1 text-xs text-gray-400 text-right">
                      {formData.message.length}/1000 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.status}
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as Message["status"],
                        })
                      }
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                    >
                      <option value="pending">{t.pending}</option>
                      <option value="read">{t.read}</option>
                      <option value="replied">{t.replied}</option>
                      <option value="archived">{t.archived}</option>
                    </select>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCreateMessage}
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
                          {t.sending}
                        </>
                      ) : (
                        <>
                          <SendIcon className="w-4 h-4" />
                          {t.createMessage}
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsComposeModalOpen(false);
                        resetForm();
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
    </div>
  );
};
