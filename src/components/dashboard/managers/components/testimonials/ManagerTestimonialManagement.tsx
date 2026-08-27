/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import axios from "axios";

// Material-UI Icons
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import VerifiedIcon from "@mui/icons-material/Verified";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import ImageIcon from "@mui/icons-material/Image";
import SaveIcon from "@mui/icons-material/Save";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import SettingsIcon from "@mui/icons-material/Settings";
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// ============================================
// MODAL COMPONENTS
// ============================================

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
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden animate-in fade-in zoom-in duration-300 mx-4 sm:mx-0">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-600" />
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border-4 border-green-200 animate-ping opacity-75" />
              <CheckCircleIcon className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 relative z-10" />
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-2">{title}</h3>
          <p className="text-sm sm:text-base text-gray-600 text-center mb-2">{message}</p>
          {details && <p className="text-xs sm:text-sm text-gray-400 text-center mb-6">{details}</p>}
          <button
            onClick={onClose}
            className="w-full px-4 py-2.5 sm:py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
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
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden animate-in fade-in zoom-in duration-300 mx-4 sm:mx-0">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-red-600" />
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border-4 border-red-200 animate-ping opacity-75" />
              <ErrorIcon className="w-8 h-8 sm:w-10 sm:h-10 text-red-600 relative z-10" />
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-2">{title}</h3>
          <p className="text-sm sm:text-base text-gray-600 text-center mb-2">{message}</p>
          {details && <p className="text-xs sm:text-sm text-gray-400 text-center mb-6">{details}</p>}
          <button
            onClick={onClose}
            className="w-full px-4 py-2.5 sm:py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
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
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden animate-in fade-in zoom-in duration-300 mx-4 sm:mx-0">
        <div className={`absolute top-0 left-0 right-0 h-1 ${colors.buttonBg}`} />
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-center mb-4">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 ${colors.iconBg} rounded-full flex items-center justify-center relative`}>
              <div className={`absolute inset-0 rounded-full border-4 ${colors.iconBorder} animate-ping opacity-75`} />
              <div className={`${colors.iconColor} relative z-10`}>
                {icon || (
                  type === "danger" ? <DeleteIcon className="w-8 h-8 sm:w-10 sm:h-10" /> :
                  type === "warning" ? <ErrorIcon className="w-8 h-8 sm:w-10 sm:h-10" /> :
                  type === "success" ? <CheckCircleIcon className="w-8 h-8 sm:w-10 sm:h-10" /> :
                  <StarIcon className="w-8 h-8 sm:w-10 sm:h-10" />
                )}
              </div>
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-2">{title}</h3>
          <p className="text-sm sm:text-base text-gray-600 text-center mb-6">{message}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 order-2 sm:order-1"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              disabled={isSubmitting}
              className={`flex-1 px-4 py-2.5 ${colors.buttonBg} text-white rounded-xl font-medium ${colors.buttonHover} transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 order-1 sm:order-2`}
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

// ============================================
// TYPES
// ============================================
interface Testimonial {
  _id?: string;
  name: string;
  university: string;
  location: string;
  rating: number;
  title: string;
  content: string;
  houseName: string;
  image: {
    public_id: string;
    url: string;
    secure_url: string;
  };
  verified: boolean;
  status: 'pending' | 'approved' | 'rejected';
  email?: string;
  featured: boolean;
  date?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface TestimonialFormData {
  name: string;
  university: string;
  location: string;
  rating: number;
  title: string;
  content: string;
  houseName: string;
  image: File | null;
  imagePreview: string;
  email: string;
  verified: boolean;
  status: 'pending' | 'approved' | 'rejected';
  featured: boolean;
  date: string;
}

interface StatusEditData {
  testimonialId: string;
  status: 'pending' | 'approved' | 'rejected';
  verified: boolean;
  featured: boolean;
}

// Translations
const translations = {
  en: {
    testimonialManagement: "Testimonial Management",
    manageTestimonials: "Manage student testimonials and reviews",
    total: "Total",
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    featured: "Featured",
    verified: "Verified",
    searchTestimonials: "Search by name, university, title, or house...",
    allStatus: "All Status",
    allVerified: "All Verification",
    allFeatured: "All Featured",
    name: "Name",
    university: "University",
    location: "Location",
    rating: "Rating",
    title: "Title",
    content: "Content",
    houseName: "House Name",
    email: "Email",
    status: "Status",
    date: "Date",
    actions: "Actions",
    noTestimonials: "No testimonials found",
    adjustFilters: "Try adjusting your search or filters",
    showing: "Showing",
    of: "of",
    testimonials: "testimonials",
    viewDetails: "View Details",
    edit: "Edit",
    delete: "Delete",
    deleteTestimonial: "Delete Testimonial",
    deleteConfirmation: "Are you sure you want to delete this testimonial?",
    actionUndone: "This action cannot be undone.",
    cancel: "Cancel",
    deleting: "Deleting...",
    testimonialDeleted: "Testimonial deleted successfully!",
    deleteFailed: "Failed to delete testimonial",
    statusUpdated: "Testimonial status updated successfully!",
    statusUpdateFailed: "Failed to update testimonial status",
    featuredUpdated: "Featured status updated successfully!",
    featuredUpdateFailed: "Failed to update featured status",
    verifiedUpdated: "Verification status updated successfully!",
    verifiedUpdateFailed: "Failed to update verification status",
    testimonialDetails: "Testimonial Details",
    editDetails: "Edit Details",
    updateStatusVerified: "Update Status & Verification",
    currentStatus: "Current Status",
    currentVerified: "Current Verification",
    currentFeatured: "Current Featured",
    selectStatus: "Select Status",
    selectVerified: "Select Verification",
    selectFeatured: "Select Featured",
    save: "Save",
    saving: "Saving...",
    close: "Close",
    loading: "Loading...",
    fetchError: "Failed to load testimonials",
    success: "Success!",
    error: "Error",
    approve: "Approve",
    reject: "Reject",
    resetToPending: "Reset to Pending",
    makeFeatured: "Make Featured",
    removeFeatured: "Remove Featured",
    editStatusVerified: "Edit Status & Verification",
    filters: "Filters",
    managerAccess: "Manager Access",
    managerViewOnly: "You can view, edit, approve, reject, and delete testimonials",
    view: "View",
  },
  fr: {
    testimonialManagement: "Gestion des Témoignages",
    manageTestimonials: "Gérer les témoignages et avis des étudiants",
    total: "Total",
    pending: "En Attente",
    approved: "Approuvé",
    rejected: "Rejeté",
    featured: "En Vedette",
    verified: "Vérifié",
    searchTestimonials: "Rechercher par nom, université, titre ou maison...",
    allStatus: "Tous les Statuts",
    allVerified: "Toutes les Vérifications",
    allFeatured: "Toutes les Vedettes",
    name: "Nom",
    university: "Université",
    location: "Emplacement",
    rating: "Note",
    title: "Titre",
    content: "Contenu",
    houseName: "Nom de la Maison",
    email: "Email",
    status: "Statut",
    date: "Date",
    actions: "Actions",
    noTestimonials: "Aucun témoignage trouvé",
    adjustFilters: "Essayez d'ajuster votre recherche ou vos filtres",
    showing: "Affichage",
    of: "de",
    testimonials: "témoignages",
    viewDetails: "Voir les Détails",
    edit: "Modifier",
    delete: "Supprimer",
    deleteTestimonial: "Supprimer le Témoignage",
    deleteConfirmation: "Êtes-vous sûr de vouloir supprimer ce témoignage ?",
    actionUndone: "Cette action est irréversible.",
    cancel: "Annuler",
    deleting: "Suppression...",
    testimonialDeleted: "Témoignage supprimé avec succès !",
    deleteFailed: "Échec de la suppression du témoignage",
    statusUpdated: "Statut du témoignage mis à jour avec succès !",
    statusUpdateFailed: "Échec de la mise à jour du statut",
    featuredUpdated: "Statut de vedette mis à jour avec succès !",
    featuredUpdateFailed: "Échec de la mise à jour du statut de vedette",
    verifiedUpdated: "Statut de vérification mis à jour avec succès !",
    verifiedUpdateFailed: "Échec de la mise à jour du statut de vérification",
    testimonialDetails: "Détails du Témoignage",
    editDetails: "Modifier les Détails",
    updateStatusVerified: "Mettre à Jour le Statut et la Vérification",
    currentStatus: "Statut Actuel",
    currentVerified: "Vérification Actuelle",
    currentFeatured: "Vedette Actuelle",
    selectStatus: "Sélectionner le Statut",
    selectVerified: "Sélectionner la Vérification",
    selectFeatured: "Sélectionner la Vedette",
    save: "Enregistrer",
    saving: "Enregistrement...",
    close: "Fermer",
    loading: "Chargement...",
    fetchError: "Échec du chargement des témoignages",
    success: "Succès !",
    error: "Erreur",
    approve: "Approuver",
    reject: "Rejeter",
    resetToPending: "Remettre en Attente",
    makeFeatured: "Mettre en Vedette",
    removeFeatured: "Retirer de la Vedette",
    editStatusVerified: "Modifier le Statut et la Vérification",
    filters: "Filtres",
    managerAccess: "Accès Manager",
    managerViewOnly: "Vous pouvez voir, modifier, approuver, rejeter et supprimer les témoignages",
    view: "Voir",
  },
  rw: {
    testimonialManagement: "Gucunga Ibyemezo",
    manageTestimonials: "Gucunga ibyemezo n'ibitekerezo by'abanyeshuri",
    total: "Yose",
    pending: "Bitegereje",
    approved: "Byemewe",
    rejected: "Byanzwe",
    featured: "Byagaragajwe",
    verified: "Byemejwe",
    searchTestimonials: "Shakisha ukurikije izina, kaminuza, umutwe cyangwa inzu...",
    allStatus: "Ihagaze Ryose",
    allVerified: "Ibyemejwe Byose",
    allFeatured: "Byagaragajwe Byose",
    name: "Izina",
    university: "Kaminuza",
    location: "Ahantu",
    rating: "Amanota",
    title: "Umutwe",
    content: "Ibirimo",
    houseName: "Izina ry'Inzu",
    email: "Imeri",
    status: "Ihagaze",
    date: "Itariki",
    actions: "Ibikorwa",
    noTestimonials: "Nta byemezo byabonetse",
    adjustFilters: "Gerageza guhindura uburyo ushakisha cyangwa amatungo",
    showing: "Bereka",
    of: "muri",
    testimonials: "ibyemezo",
    viewDetails: "Reba Ibisobanuro",
    edit: "Hindura",
    delete: "Kuraho",
    deleteTestimonial: "Kuraho Icyemezo",
    deleteConfirmation: "Uri kwizera ko ushaka gukuraho iki cyemezo?",
    actionUndone: "Iki gikorwa ntikishobora guhindurwa.",
    cancel: "Reka",
    deleting: "Birakurwaho...",
    testimonialDeleted: "Icyemezo cyakuweho neza!",
    deleteFailed: "Kuraho icyemezo birananiranye",
    statusUpdated: "Ihagaze ry'icyemezo ryavuguruwe neza!",
    statusUpdateFailed: "Kuvugurura ihagaze birananiranye",
    featuredUpdated: "Ihagaze ryo kugaragaza ryavuguruwe neza!",
    featuredUpdateFailed: "Kuvugurura ihagaze ryo kugaragaza birananiranye",
    verifiedUpdated: "Ihagaze ryo kwemeza ryavuguruwe neza!",
    verifiedUpdateFailed: "Kuvugurura ihagaze ryo kwemeza birananiranye",
    testimonialDetails: "Ibisobanuro by'Icyemezo",
    editDetails: "Hindura Ibisobanuro",
    updateStatusVerified: "Vugurura Ihagaze no Kwemeza",
    currentStatus: "Ihagaze Iriho",
    currentVerified: "Kwemeza Iriho",
    currentFeatured: "Kugaragaza Iriho",
    selectStatus: "Hitamo Ihagaze",
    selectVerified: "Hitamo Kwemeza",
    selectFeatured: "Hitamo Kugaragaza",
    save: "Bika",
    saving: "Birabikwa...",
    close: "Funga",
    loading: "Birakoreshwa...",
    fetchError: "Kubura ibyemezo birananiranye",
    success: "Byakunze!",
    error: "Ikosa",
    approve: "Emeza",
    reject: "Jya",
    resetToPending: "Subiza mu Bitegereje",
    makeFeatured: "Garagaza",
    removeFeatured: "Kuraho mu byagaragajwe",
    editStatusVerified: "Hindura Ihagaze no Kwemeza",
    filters: "Amatungo",
    managerAccess: "Uburenganzira bwa Manager",
    managerViewOnly: "Urashobora kureba, guhindura, kwemeza, kwanga no gukuraho ibyemezo",
    view: "Reba",
  },
};

// Helper function to get language from cookies
const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
  const lang = Cookies.get("language") as "en" | "fr" | "rw";
  return lang || "en";
};

// API Base URL
const API_URL = "https://rene-inyumba-nodejs.onrender.com/testimonials";

// ============================================
// RATING STARS COMPONENT
// ============================================
interface RatingStarsProps {
  rating: number;
  size?: 'small' | 'medium' | 'large';
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  size = 'medium',
  interactive = false,
  onChange
}) => {
  const [hoverRating, setHoverRating] = useState<number>(0);

  const sizes = {
    small: 'w-3 h-3 sm:w-4 sm:h-4',
    medium: 'w-5 h-5 sm:w-6 sm:h-6',
    large: 'w-6 h-6 sm:w-8 sm:h-8',
  };

  const displayRating = hoverRating || rating;

  const handleClick = (value: number) => {
    if (interactive && onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex gap-0.5 sm:gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'} ${interactive ? 'focus:outline-none' : ''}`}
          onClick={() => handleClick(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          disabled={!interactive}
        >
          {star <= displayRating ? (
            <StarIcon className={`${sizes[size]} text-yellow-400`} />
          ) : star - 0.5 <= displayRating ? (
            <StarHalfIcon className={`${sizes[size]} text-yellow-400`} />
          ) : (
            <StarBorderIcon className={`${sizes[size]} text-gray-300`} />
          )}
        </button>
      ))}
    </div>
  );
};

// ============================================
// STATUS BADGE COMPONENT
// ============================================
interface StatusBadgeProps {
  status: 'pending' | 'approved' | 'rejected';
  size?: 'sm' | 'md';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const config = {
    pending: {
      icon: <PendingIcon className={`${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'}`} />,
      label: 'Pending',
      className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    },
    approved: {
      icon: <CheckCircleRoundedIcon className={`${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'}`} />,
      label: 'Approved',
      className: 'bg-green-100 text-green-700 border-green-200',
    },
    rejected: {
      icon: <CancelIcon className={`${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'}`} />,
      label: 'Rejected',
      className: 'bg-red-100 text-red-700 border-red-200',
    },
  };

  const { icon, label, className } = config[status];
  const padding = size === 'sm' ? 'px-1.5 py-0.5' : 'px-2.5 py-0.5';
  const textSize = size === 'sm' ? 'text-[10px]' : 'text-xs';

  return (
    <span className={`inline-flex items-center gap-1 ${padding} rounded-full ${textSize} font-medium border ${className}`}>
      {icon}
      {label}
    </span>
  );
};

// ============================================
// STATUS & VERIFICATION EDIT MODAL
// ============================================
interface StatusEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: StatusEditData) => void;
  testimonial: Testimonial | null;
  isSubmitting?: boolean;
  t: any;
}

const StatusEditModal: React.FC<StatusEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  testimonial,
  isSubmitting = false,
  t,
}) => {
  if (!isOpen || !testimonial) return null;

  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>(testimonial.status);
  const [verified, setVerified] = useState<boolean>(testimonial.verified);
  const [featured, setFeatured] = useState<boolean>(testimonial.featured);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (testimonial._id) {
      onSave({
        testimonialId: testimonial._id,
        status,
        verified,
        featured,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden animate-in fade-in zoom-in duration-300 mx-2 sm:mx-4">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 to-indigo-600" />
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <SettingsIcon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">{t.updateStatusVerified}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {/* Current Status Display - Grid layout for responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs sm:text-sm text-gray-500">{t.currentStatus}</p>
                <div className="mt-1">
                  <StatusBadge status={testimonial.status} size="sm" />
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs sm:text-sm text-gray-500">{t.currentVerified}</p>
                <div className="mt-1">
                  <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium border ${
                    testimonial.verified
                      ? 'bg-green-100 text-green-700 border-green-200'
                      : 'bg-gray-100 text-gray-500 border-gray-200'
                  }`}>
                    <VerifiedIcon className="w-3 h-3" />
                    {testimonial.verified ? 'Verified' : 'Not Verified'}
                  </span>
                </div>
              </div>
            </div>

            {/* Current Featured */}
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs sm:text-sm text-gray-500">{t.currentFeatured}</p>
              <div className="mt-1">
                <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium border ${
                  testimonial.featured
                    ? 'bg-amber-100 text-amber-700 border-amber-200'
                    : 'bg-gray-100 text-gray-500 border-gray-200'
                }`}>
                  {testimonial.featured ? (
                    <StarIcon className="w-3 h-3" />
                  ) : (
                    <StarBorderIcon className="w-3 h-3" />
                  )}
                  {testimonial.featured ? 'Featured' : 'Not Featured'}
                </span>
              </div>
            </div>

            {/* Status Selection */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                {t.selectStatus}
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'pending' | 'approved' | 'rejected')}
                className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm bg-white"
              >
                <option value="pending">{t.pending}</option>
                <option value="approved">{t.approved}</option>
                <option value="rejected">{t.rejected}</option>
              </select>
            </div>

            {/* Verified Selection */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                {t.selectVerified}
              </label>
              <select
                value={verified ? 'true' : 'false'}
                onChange={(e) => setVerified(e.target.value === 'true')}
                className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm bg-white"
              >
                <option value="true">Verified</option>
                <option value="false">Not Verified</option>
              </select>
            </div>

            {/* Featured Selection */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                {t.selectFeatured}
              </label>
              <select
                value={featured ? 'true' : 'false'}
                onChange={(e) => setFeatured(e.target.value === 'true')}
                className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm bg-white"
              >
                <option value="true">Featured</option>
                <option value="false">Not Featured</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 order-1 sm:order-1 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t.saving}
                  </>
                ) : (
                  <>
                    <SaveIcon className="w-4 h-4" />
                    {t.save}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors order-2 sm:order-2"
              >
                {t.cancel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// ============================================
// VIEW MODAL COMPONENT
// ============================================
interface ViewModalProps {
  testimonial: Testimonial | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onStatusEdit: () => void;
  onStatusChange?: (status: 'pending' | 'approved' | 'rejected') => void;
  onToggleFeatured?: () => void;
  t: any;
}

const ViewModal: React.FC<ViewModalProps> = ({
  testimonial,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onStatusChange,
  onToggleFeatured,
  t,
}) => {
  if (!isOpen || !testimonial) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto mx-2 sm:mx-4">
        {/* Header */}
        <div className="sticky top-0 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
            <VisibilityIcon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
            <span className="hidden sm:inline">{t.testimonialDetails}</span>
            <span className="sm:hidden">Details</span>
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <CloseIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Profile Image */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative">
              <img
                src={testimonial.image?.url || testimonial.image?.secure_url}
                alt={testimonial.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-indigo-100 shadow-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    testimonial.name
                  )}&size=150&background=indigo&color=fff&font-size=0.5`;
                }}
              />
            </div>
          </div>

          {/* Name & Title */}
          <div className="text-center mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{testimonial.name}</h3>
            <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 mt-1">
              <span className="text-sm sm:text-base text-gray-600">{testimonial.university}</span>
              <span className="text-gray-300 hidden sm:inline">•</span>
              <span className="text-sm sm:text-base text-gray-600">{testimonial.location}</span>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-2">
              <RatingStars rating={testimonial.rating} size="small" />
              <span className="text-sm font-medium text-gray-600">
                {testimonial.rating.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Status & Verification Badges */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <StatusBadge status={testimonial.status} size="sm" />
          </div>

          {/* Title */}
          <div className="mb-3 sm:mb-4">
            <h4 className="text-base sm:text-lg font-semibold text-gray-900">{testimonial.title}</h4>
          </div>

          {/* Content */}
          <div className="mb-3 sm:mb-4">
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{testimonial.content}</p>
            </div>
          </div>

          {/* House */}
          <div className="mb-4 sm:mb-6">
            <h4 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1 sm:mb-2">House</h4>
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 sm:p-3">
              <HomeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <span className="text-sm sm:text-base text-gray-700 font-medium">{testimonial.houseName}</span>
            </div>
          </div>

          {/* Email */}
          {testimonial.email && (
            <div className="mb-4 sm:mb-6">
              <h4 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1 sm:mb-2">Email</h4>
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 sm:p-3">
                <EmailIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <span className="text-sm sm:text-base text-gray-700 break-all">{testimonial.email}</span>
              </div>
            </div>
          )}

          {/* Meta Info */}
          <div className="border-t border-gray-200 pt-3 sm:pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <CalendarTodayIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Created: {formatDate(testimonial.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <RefreshIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Updated: {formatDate(testimonial.updatedAt)}</span>
              </div>
              {testimonial.date && (
                <div className="flex items-center gap-2 text-gray-500">
                  <CalendarTodayIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Date: {formatDate(testimonial.date)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Status Actions */}
          {onStatusChange && testimonial.status !== 'approved' && (
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
              <h4 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Quick Actions</h4>
              <div className="flex flex-wrap gap-2">
                {testimonial.status === 'pending' && (
                  <>
                    <button
                      onClick={() => onStatusChange('approved')}
                      className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs sm:text-sm"
                    >
                      <CheckCircleRoundedIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">{t.approve}</span>
                    </button>
                    <button
                      onClick={() => onStatusChange('rejected')}
                      className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs sm:text-sm"
                    >
                      <CancelIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">{t.reject}</span>
                    </button>
                  </>
                )}
                {testimonial.status === 'rejected' && (
                  <button
                    onClick={() => onStatusChange('pending')}
                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-xs sm:text-sm"
                  >
                    <PendingIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">{t.resetToPending}</span>
                  </button>
                )}
                {onToggleFeatured && (
                  <button
                    onClick={onToggleFeatured}
                    className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                      testimonial.featured
                        ? 'bg-gray-600 text-white hover:bg-gray-700'
                        : 'bg-amber-600 text-white hover:bg-amber-700'
                    }`}
                  >
                    <StarIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">{testimonial.featured ? t.removeFeatured : t.makeFeatured}</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base order-3 sm:order-1 ml-auto sm:ml-0"
            >
              {t.close}
            </button>
            <button
              onClick={onEdit}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base order-2 sm:order-3"
            >
              <EditIcon className="w-4 h-4" />
              <span className="hidden xs:inline">{t.edit}</span>
            </button>
            <button
              onClick={onDelete}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-sm sm:text-base order-4 sm:order-4"
            >
              <DeleteIcon className="w-4 h-4" />
              <span className="hidden xs:inline">{t.delete}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN COMPONENT - ManagerTestimonialManagement
// ============================================
export const ManagerTestimonialManagement: React.FC = () => {
  // Get language from cookies
  const [lang, setLang] = useState<"en" | "fr" | "rw">(getLanguageFromCookies());

  // State
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState<Testimonial[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterVerified, setFilterVerified] = useState<string>("all");
  const [filterFeatured, setFilterFeatured] = useState<string>("all");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isStatusEditModalOpen, setIsStatusEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [viewingItem, setViewingItem] = useState<Testimonial | null>(null);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);

  // Form data
  const [formData, setFormData] = useState<TestimonialFormData>({
    name: '',
    university: '',
    location: '',
    rating: 5,
    title: '',
    content: '',
    houseName: '',
    image: null,
    imagePreview: '',
    email: '',
    verified: false,
    status: 'pending',
    featured: false,
    date: new Date().toISOString().split('T')[0],
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  // Loading states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

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

  // Statistics
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    featured: 0,
    verified: 0,
  });

  const t = translations[lang];

  const showSuccessModal = (title: string, message: string, details?: string) => {
    setSuccessModal({ isOpen: true, title, message, details });
  };

  const showErrorModal = (title: string, message: string, details?: string) => {
    setErrorModal({ isOpen: true, title, message, details });
  };

  // Validation
  const validateForm = (data: TestimonialFormData, editingItem: Testimonial | null = null): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!data.name.trim()) {
      errors.name = 'Name is required';
    } else if (data.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    } else if (data.name.trim().length > 100) {
      errors.name = 'Name cannot exceed 100 characters';
    }

    if (!data.university.trim()) {
      errors.university = 'University is required';
    } else if (data.university.trim().length < 2) {
      errors.university = 'University must be at least 2 characters';
    } else if (data.university.trim().length > 200) {
      errors.university = 'University cannot exceed 200 characters';
    }

    if (!data.location.trim()) {
      errors.location = 'Location is required';
    } else if (data.location.trim().length < 2) {
      errors.location = 'Location must be at least 2 characters';
    } else if (data.location.trim().length > 100) {
      errors.location = 'Location cannot exceed 100 characters';
    }

    if (!data.rating || data.rating < 1 || data.rating > 5) {
      errors.rating = 'Rating must be between 1 and 5';
    }

    if (!data.title.trim()) {
      errors.title = 'Title is required';
    } else if (data.title.trim().length < 5) {
      errors.title = 'Title must be at least 5 characters';
    } else if (data.title.trim().length > 200) {
      errors.title = 'Title cannot exceed 200 characters';
    }

    if (!data.content.trim()) {
      errors.content = 'Content is required';
    } else if (data.content.trim().length < 20) {
      errors.content = 'Content must be at least 20 characters';
    } else if (data.content.trim().length > 1000) {
      errors.content = 'Content cannot exceed 1000 characters';
    }

    if (!data.houseName.trim()) {
      errors.houseName = 'House name is required';
    } else if (data.houseName.trim().length < 2) {
      errors.houseName = 'House name must be at least 2 characters';
    } else if (data.houseName.trim().length > 200) {
      errors.houseName = 'House name cannot exceed 200 characters';
    }

    if (!editingItem && !data.image) {
      errors.image = 'Image is required';
    }

    if (data.email && !data.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      errors.email = 'Please enter a valid email address';
    }

    return errors;
  };

  // Fetch testimonials
  const fetchTestimonials = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(API_URL);
      const data = response.data;

      let testimonialsData: Testimonial[] = [];
      if (Array.isArray(data)) {
        testimonialsData = data;
      } else if (data && typeof data === 'object') {
        if (data.data && Array.isArray(data.data)) {
          testimonialsData = data.data;
        } else if (data.testimonials && Array.isArray(data.testimonials)) {
          testimonialsData = data.testimonials;
        } else if (data.success && data.data) {
          testimonialsData = Array.isArray(data.data) ? data.data : [data.data];
        } else {
          const possibleArrays = Object.values(data).filter((val) => Array.isArray(val));
          if (possibleArrays.length > 0) {
            testimonialsData = possibleArrays[0];
          }
        }
      }

      setTestimonials(testimonialsData);
    } catch (error) {
      showErrorModal(
        t.error || "Error",
        t.fetchError || "Failed to load testimonials",
        error instanceof Error ? error.message : undefined
      );
    } finally {
      setIsFetching(false);
    }
  };

  // Listen for language changes
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
    fetchTestimonials();
  }, []);

  // Filter testimonials
  useEffect(() => {
    let filtered = [...testimonials];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          item.university.toLowerCase().includes(term) ||
          item.title.toLowerCase().includes(term) ||
          item.houseName.toLowerCase().includes(term)
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((item) => item.status === filterStatus);
    }

    if (filterVerified !== "all") {
      filtered = filtered.filter((item) => item.verified === (filterVerified === "true"));
    }

    if (filterFeatured !== "all") {
      filtered = filtered.filter((item) => item.featured === (filterFeatured === "true"));
    }

    setFilteredTestimonials(filtered);
  }, [testimonials, searchTerm, filterStatus, filterVerified, filterFeatured]);

  // Update statistics
  useEffect(() => {
    const total = testimonials.length;
    const pending = testimonials.filter((m) => m.status === "pending").length;
    const approved = testimonials.filter((m) => m.status === "approved").length;
    const rejected = testimonials.filter((m) => m.status === "rejected").length;
    const featured = testimonials.filter((m) => m.featured).length;
    const verified = testimonials.filter((m) => m.verified).length;

    setStats({ total, pending, approved, rejected, featured, verified });
  }, [testimonials]);

  // Check form validity
  useEffect(() => {
    const errors = validateForm(formData, editingItem);
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  }, [formData, editingItem]);

  // CRUD Operations
  const handleUpdateTestimonial = async (id: string, data: TestimonialFormData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('university', data.university);
    formData.append('location', data.location);
    formData.append('rating', data.rating.toString());
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('houseName', data.houseName);
    formData.append('email', data.email || '');
    formData.append('verified', String(data.verified));
    formData.append('status', data.status);
    formData.append('featured', String(data.featured));
    formData.append('date', data.date);

    if (data.image) {
      formData.append('image', data.image);
    }

    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  };

  const handleDeleteTestimonial = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
  };

  const handleUpdateStatus = async (id: string, status: 'pending' | 'approved' | 'rejected') => {
    const response = await axios.patch(`${API_URL}/${id}/status`, { status });
    return response.data;
  };

  const handleToggleFeatured = async (id: string, featured: boolean) => {
    const response = await axios.put(`${API_URL}/${id}/featured`, { featured });
    return response.data;
  };

  const handleUpdateStatusVerified = async (data: StatusEditData) => {
    await handleUpdateStatus(data.testimonialId, data.status);

    const item = testimonials.find(t => t._id === data.testimonialId);
    if (item) {
      const formDataToUpdate: TestimonialFormData = {
        name: item.name,
        university: item.university,
        location: item.location,
        rating: item.rating,
        title: item.title,
        content: item.content,
        houseName: item.houseName,
        image: null,
        imagePreview: item.image?.url || '',
        email: item.email || '',
        verified: data.verified,
        featured: data.featured,
        status: data.status,
        date: item.date ? new Date(item.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      };
      await handleUpdateTestimonial(data.testimonialId, formDataToUpdate);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm(formData, editingItem);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingItem) {
        await handleUpdateTestimonial(editingItem._id!, formData);
        showSuccessModal(
          t.success || "Success!",
          'Testimonial updated successfully!',
          `${formData.name}'s testimonial has been updated`
        );
      }
      await fetchTestimonials();
      handleCloseModal();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save testimonial';
      showErrorModal(t.error || "Error", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingItemId) return;

    setIsSubmitting(true);
    try {
      await handleDeleteTestimonial(deletingItemId);
      showSuccessModal(
        t.success || "Success!",
        t.testimonialDeleted || "Testimonial deleted successfully!",
        'The testimonial has been removed from the system'
      );
      setIsDeleteModalOpen(false);
      setDeletingItemId(null);
      await fetchTestimonials();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete testimonial';
      showErrorModal(t.error || "Error", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusEditSave = async (data: StatusEditData) => {
    setIsSubmitting(true);
    try {
      await handleUpdateStatusVerified(data);
      showSuccessModal(
        t.success || "Success!",
        t.statusUpdated || "Status updated successfully!",
        `Testimonial status, verification, and featured status have been updated`
      );
      setIsStatusEditModalOpen(false);
      setViewingItem(null);
      await fetchTestimonials();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update status';
      showErrorModal(t.error || "Error", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Modal handlers
  const handleOpenModal = (item: Testimonial) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      university: item.university,
      location: item.location,
      rating: item.rating,
      title: item.title,
      content: item.content,
      houseName: item.houseName,
      image: null,
      imagePreview: item.image?.url || item.image?.secure_url || '',
      email: item.email || '',
      verified: item.verified || false,
      status: item.status || 'pending',
      featured: item.featured || false,
      date: item.date ? new Date(item.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    });
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingItem(null);
    setFormData({
      name: '',
      university: '',
      location: '',
      rating: 5,
      title: '',
      content: '',
      houseName: '',
      image: null,
      imagePreview: '',
      email: '',
      verified: false,
      status: 'pending',
      featured: false,
      date: new Date().toISOString().split('T')[0],
    });
    setFormErrors({});
  };

  const handleViewItem = (item: Testimonial) => {
    setViewingItem(item);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setViewingItem(null);
  };

  const handleEditFromView = () => {
    if (viewingItem) {
      handleCloseViewModal();
      handleOpenModal(viewingItem);
    }
  };

  const handleDeleteFromView = () => {
    if (viewingItem?._id) {
      setDeletingItemId(viewingItem._id);
      setIsDeleteModalOpen(true);
      handleCloseViewModal();
    }
  };

  const handleStatusEditFromView = () => {
    if (viewingItem) {
      handleCloseViewModal();
      setIsStatusEditModalOpen(true);
    }
  };

  const handleStatusChangeFromView = async (status: 'pending' | 'approved' | 'rejected') => {
    if (viewingItem?._id) {
      try {
        await handleUpdateStatus(viewingItem._id, status);
        showSuccessModal(
          t.success || "Success!",
          t.statusUpdated || "Status updated successfully!",
          `${viewingItem.name}'s testimonial has been ${status}`
        );
        handleCloseViewModal();
        await fetchTestimonials();
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to update status';
        showErrorModal(t.error || "Error", message);
      }
    }
  };

  const handleToggleFeaturedFromView = async () => {
    if (viewingItem?._id) {
      try {
        await handleToggleFeatured(viewingItem._id, !viewingItem.featured);
        showSuccessModal(
          t.success || "Success!",
          t.featuredUpdated || "Featured status updated successfully!",
          `${viewingItem.name}'s testimonial is now ${!viewingItem.featured ? 'featured' : 'not featured'}`
        );
        handleCloseViewModal();
        await fetchTestimonials();
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to update featured status';
        showErrorModal(t.error || "Error", message);
      }
    }
  };

  // Loading state
  if (isFetching) {
    return (
      <div className="p-4 sm:p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3 sm:mb-4"></div>
          <p className="text-sm sm:text-base text-gray-500">{t.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
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

      {/* Manager Access Notice */}
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
        <StarIcon className="text-blue-600 w-5 h-5" />
        <div>
          <p className="text-sm text-blue-700 font-medium">{t.managerAccess}</p>
          <p className="text-xs text-blue-600">{t.managerViewOnly}</p>
        </div>
      </div>

      {/* Header - Removed Add button */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <StarIcon className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-400" />
              <span className="hidden xs:inline">{t.testimonialManagement}</span>
              <span className="xs:hidden">Testimonials</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1 hidden sm:block">{t.manageTestimonials}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchTestimonials}
              className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RefreshIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards - Responsive grid */}
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-4 sm:mb-6">
        <motion.div whileHover={{ y: -2 }} className="bg-white rounded-xl p-2 sm:p-3 shadow-sm border border-gray-200">
          <p className="text-[10px] sm:text-xs text-gray-500">{t.total}</p>
          <p className="text-base sm:text-xl font-bold text-gray-900">{stats.total}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-yellow-50 rounded-xl p-2 sm:p-3 shadow-sm border border-yellow-200">
          <p className="text-[10px] sm:text-xs text-yellow-600">{t.pending}</p>
          <p className="text-base sm:text-xl font-bold text-yellow-700">{stats.pending}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-green-50 rounded-xl p-2 sm:p-3 shadow-sm border border-green-200">
          <p className="text-[10px] sm:text-xs text-green-600">{t.approved}</p>
          <p className="text-base sm:text-xl font-bold text-green-700">{stats.approved}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-red-50 rounded-xl p-2 sm:p-3 shadow-sm border border-red-200">
          <p className="text-[10px] sm:text-xs text-red-600">{t.rejected}</p>
          <p className="text-base sm:text-xl font-bold text-red-700">{stats.rejected}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-amber-50 rounded-xl p-2 sm:p-3 shadow-sm border border-amber-200">
          <p className="text-[10px] sm:text-xs text-amber-600">{t.featured}</p>
          <p className="text-base sm:text-xl font-bold text-amber-700">{stats.featured}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-blue-50 rounded-xl p-2 sm:p-3 shadow-sm border border-blue-200">
          <p className="text-[10px] sm:text-xs text-blue-600">{t.verified}</p>
          <p className="text-base sm:text-xl font-bold text-blue-700">{stats.verified}</p>
        </motion.div>
      </div>

      {/* Filters - Responsive */}
      <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t.searchTestimonials}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-xs sm:text-sm"
            />
          </div>
          
          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="sm:hidden flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-sm"
          >
            <FilterListIcon className="w-4 h-4" />
            {t.filters}
            <ExpandMoreIcon className={`w-4 h-4 transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
          </button>

          {/* Filters - Desktop */}
          <div className="hidden sm:flex flex-wrap gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-xs sm:text-sm bg-white"
            >
              <option value="all">{t.allStatus}</option>
              <option value="pending">{t.pending}</option>
              <option value="approved">{t.approved}</option>
              <option value="rejected">{t.rejected}</option>
            </select>
            <select
              value={filterVerified}
              onChange={(e) => setFilterVerified(e.target.value)}
              className="px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-xs sm:text-sm bg-white"
            >
              <option value="all">{t.allVerified}</option>
              <option value="true">Verified</option>
              <option value="false">Not Verified</option>
            </select>
            <select
              value={filterFeatured}
              onChange={(e) => setFilterFeatured(e.target.value)}
              className="px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-xs sm:text-sm bg-white"
            >
              <option value="all">{t.allFeatured}</option>
              <option value="true">Featured</option>
              <option value="false">Not Featured</option>
            </select>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("all");
                setFilterVerified("all");
                setFilterFeatured("all");
              }}
              className="px-2 sm:px-3 py-1.5 sm:py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ClearIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Filters */}
        {showMobileFilters && (
          <div className="mt-3 pt-3 border-t border-gray-200 flex flex-wrap gap-2 sm:hidden">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex-1 min-w-[100px] px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-xs bg-white"
            >
              <option value="all">{t.allStatus}</option>
              <option value="pending">{t.pending}</option>
              <option value="approved">{t.approved}</option>
              <option value="rejected">{t.rejected}</option>
            </select>
            <select
              value={filterVerified}
              onChange={(e) => setFilterVerified(e.target.value)}
              className="flex-1 min-w-[100px] px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-xs bg-white"
            >
              <option value="all">{t.allVerified}</option>
              <option value="true">Verified</option>
              <option value="false">Not Verified</option>
            </select>
            <select
              value={filterFeatured}
              onChange={(e) => setFilterFeatured(e.target.value)}
              className="flex-1 min-w-[100px] px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-xs bg-white"
            >
              <option value="all">{t.allFeatured}</option>
              <option value="true">Featured</option>
              <option value="false">Not Featured</option>
            </select>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("all");
                setFilterVerified("all");
                setFilterFeatured("all");
              }}
              className="px-3 py-1.5 text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Testimonials Grid - Responsive */}
      {filteredTestimonials.length === 0 ? (
        <div className="bg-white rounded-xl p-8 sm:p-12 text-center shadow-sm border border-gray-200">
          <StarIcon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
          <h3 className="text-base sm:text-xl font-semibold text-gray-600 mb-2">{t.noTestimonials}</h3>
          <p className="text-sm sm:text-base text-gray-500">{t.adjustFilters}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {filteredTestimonials.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => handleViewItem(item)}
            >
              <div className="relative h-40 sm:h-48 bg-gradient-to-r from-indigo-500 to-purple-600">
                <img
                  src={item.image?.url || item.image?.secure_url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      item.name
                    )}&size=200&background=indigo&color=fff&font-size=0.5`;
                  }}
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewItem(item);
                    }}
                    className="p-1 bg-white rounded-full hover:bg-indigo-50 transition-colors shadow-md"
                    title={t.viewDetails}
                  >
                    <VisibilityIcon className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModal(item);
                    }}
                    className="p-1 bg-white rounded-full hover:bg-indigo-50 transition-colors shadow-md"
                    title={t.edit}
                  >
                    <EditIcon className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeletingItemId(item._id!);
                      setIsDeleteModalOpen(true);
                    }}
                    className="p-1 bg-white rounded-full hover:bg-red-50 transition-colors shadow-md"
                    title={t.delete}
                  >
                    <DeleteIcon className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                  </button>
                </div>
                <div className="absolute bottom-2 left-2">
                  <StatusBadge status={item.status} size="sm" />
                </div>
              </div>
              <div className="p-3 sm:p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-lg font-bold text-gray-900 truncate">{item.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 truncate">{item.university}</p>
                  </div>
                </div>
                <div className="mt-1.5 sm:mt-2 flex items-center gap-1.5 sm:gap-2">
                  <RatingStars rating={item.rating} size="small" />
                  <span className="text-[10px] sm:text-xs text-gray-500">{item.rating.toFixed(1)}</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-gray-700 mt-1.5 sm:mt-2 truncate">{item.title}</p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2 hidden xs:block">{item.content}</p>
                <div className="flex items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100">
                  <HomeIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                  <span className="text-[10px] sm:text-xs text-gray-500 truncate">{item.houseName}</span>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3 mt-1.5 sm:mt-2">
                  {item.verified && (
                    <span className="inline-flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-green-600">
                      <VerifiedIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span className="hidden xs:inline">Verified</span>
                    </span>
                  )}
                  {item.featured && (
                    <span className="inline-flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-amber-600">
                      <StarIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span className="hidden xs:inline">Featured</span>
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination Info */}
      <div className="mt-4 px-3 sm:px-4 py-2 sm:py-3 bg-white rounded-xl shadow-sm border border-gray-200">
        <p className="text-xs sm:text-sm text-gray-500">
          {t.showing} {filteredTestimonials.length} {t.of} {testimonials.length} {t.testimonials}
        </p>
      </div>

      {/* View Modal */}
      <ViewModal
        testimonial={viewingItem}
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        onEdit={handleEditFromView}
        onDelete={handleDeleteFromView}
        onStatusEdit={handleStatusEditFromView}
        onStatusChange={handleStatusChangeFromView}
        onToggleFeatured={handleToggleFeaturedFromView}
        t={t}
      />

      {/* Status Edit Modal */}
      <StatusEditModal
        isOpen={isStatusEditModalOpen}
        onClose={() => {
          setIsStatusEditModalOpen(false);
          setViewingItem(null);
        }}
        onSave={handleStatusEditSave}
        testimonial={viewingItem}
        isSubmitting={isSubmitting}
        t={t}
      />

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={handleCloseModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-3 sm:p-4"
            >
              <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative mx-2 sm:mx-0">
                <div className="sticky top-0 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
                  <div className="flex items-center gap-2">
                    <EditIcon className="text-indigo-600 w-4 h-4 sm:w-5 sm:h-5" />
                    <h2 className="text-base sm:text-xl font-semibold text-gray-900">
                      {t.editDetails}
                    </h2>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCloseModal}
                    className="p-1.5 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  {/* Form fields - Same as TestimonialManagement but without create option */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                        {t.name} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`w-full pl-9 sm:pl-10 pr-8 sm:pr-10 py-1.5 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-xs sm:text-sm transition-colors ${
                            formErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                          }`}
                          placeholder="Enter full name"
                        />
                        {formData.name && (
                          <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2">
                            {formErrors.name ? (
                              <ErrorIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                            ) : (
                              <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                            )}
                          </div>
                        )}
                      </div>
                      {formErrors.name && (
                        <p className="mt-1 text-[10px] sm:text-xs text-red-600 flex items-center gap-1">
                          <ErrorIcon className="w-3 h-3" />
                          {formErrors.name}
                        </p>
                      )}
                    </div>

                    {/* University */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                        {t.university} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <SchoolIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                        <input
                          type="text"
                          name="university"
                          value={formData.university}
                          onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                          className={`w-full pl-9 sm:pl-10 pr-8 sm:pr-10 py-1.5 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-xs sm:text-sm transition-colors ${
                            formErrors.university ? 'border-red-500 bg-red-50' : 'border-gray-300'
                          }`}
                          placeholder="e.g., University of Rwanda"
                        />
                        {formData.university && (
                          <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2">
                            {formErrors.university ? (
                              <ErrorIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                            ) : (
                              <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                            )}
                          </div>
                        )}
                      </div>
                      {formErrors.university && (
                        <p className="mt-1 text-[10px] sm:text-xs text-red-600 flex items-center gap-1">
                          <ErrorIcon className="w-3 h-3" />
                          {formErrors.university}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                      {t.location} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <LocationOnIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className={`w-full pl-9 sm:pl-10 pr-8 sm:pr-10 py-1.5 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-xs sm:text-sm transition-colors ${
                          formErrors.location ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="e.g., Kigali, Rwanda"
                      />
                      {formData.location && (
                        <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2">
                          {formErrors.location ? (
                            <ErrorIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                          ) : (
                            <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                          )}
                        </div>
                      )}
                    </div>
                    {formErrors.location && (
                      <p className="mt-1 text-[10px] sm:text-xs text-red-600 flex items-center gap-1">
                        <ErrorIcon className="w-3 h-3" />
                        {formErrors.location}
                      </p>
                    )}
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                      {t.rating} <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                      <RatingStars
                        rating={formData.rating}
                        size="medium"
                        interactive={true}
                        onChange={(value) => {
                          setFormData(prev => ({ ...prev, rating: value }));
                          if (formErrors.rating) {
                            setFormErrors(prev => {
                              const newErrors = { ...prev };
                              delete newErrors.rating;
                              return newErrors;
                            });
                          }
                        }}
                      />
                      <span className="text-xs sm:text-sm font-medium text-gray-600">
                        {formData.rating.toFixed(1)}
                      </span>
                    </div>
                    {formErrors.rating && (
                      <div className="flex items-center mt-1 text-xs text-red-500">
                        <ErrorIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        <span>{formErrors.rating}</span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                      {t.title} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <DescriptionIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className={`w-full pl-9 sm:pl-10 pr-8 sm:pr-10 py-1.5 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-xs sm:text-sm transition-colors ${
                          formErrors.title ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="e.g., Amazing Experience!"
                      />
                      {formData.title && (
                        <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2">
                          {formErrors.title ? (
                            <ErrorIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                          ) : (
                            <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                          )}
                        </div>
                      )}
                    </div>
                    {formErrors.title && (
                      <p className="mt-1 text-[10px] sm:text-xs text-red-600 flex items-center gap-1">
                        <ErrorIcon className="w-3 h-3" />
                        {formErrors.title}
                      </p>
                    )}
                  </div>

                  {/* Content */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                      {t.content} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <DescriptionIcon className="absolute left-3 top-2.5 sm:top-3 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                      <textarea
                        name="content"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        rows={3}
                        className={`w-full pl-9 sm:pl-10 pr-8 sm:pr-10 py-1.5 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-xs sm:text-sm resize-none transition-colors ${
                          formErrors.content ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Write the testimonial content..."
                      />
                      {formData.content && (
                        <div className="absolute right-2 sm:right-3 top-2.5 sm:top-3">
                          {formErrors.content ? (
                            <ErrorIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                          ) : (
                            <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                          )}
                        </div>
                      )}
                    </div>
                    {formErrors.content && (
                      <p className="mt-1 text-[10px] sm:text-xs text-red-600 flex items-center gap-1">
                        <ErrorIcon className="w-3 h-3" />
                        {formErrors.content}
                      </p>
                    )}
                    <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">
                      {formData.content.length}/20 characters minimum
                    </p>
                  </div>

                  {/* House Name */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                      {t.houseName} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <HomeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                      <input
                        type="text"
                        name="houseName"
                        value={formData.houseName}
                        onChange={(e) => setFormData({ ...formData, houseName: e.target.value })}
                        className={`w-full pl-9 sm:pl-10 pr-8 sm:pr-10 py-1.5 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-xs sm:text-sm transition-colors ${
                          formErrors.houseName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="e.g., Golden Apartments"
                      />
                      {formData.houseName && (
                        <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2">
                          {formErrors.houseName ? (
                            <ErrorIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                          ) : (
                            <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                          )}
                        </div>
                      )}
                    </div>
                    {formErrors.houseName && (
                      <p className="mt-1 text-[10px] sm:text-xs text-red-600 flex items-center gap-1">
                        <ErrorIcon className="w-3 h-3" />
                        {formErrors.houseName}
                      </p>
                    )}
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                      Profile Image
                    </label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                      <div className="w-full sm:flex-1">
                        <input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              if (file.size > 5 * 1024 * 1024) {
                                setFormErrors(prev => ({ ...prev, image: 'Image size should be less than 5MB' }));
                                return;
                              }
                              if (!file.type.startsWith('image/')) {
                                setFormErrors(prev => ({ ...prev, image: 'File must be an image' }));
                                return;
                              }
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setFormData(prev => ({
                                  ...prev,
                                  image: file,
                                  imagePreview: reader.result as string,
                                }));
                                if (formErrors.image) {
                                  setFormErrors(prev => {
                                    const newErrors = { ...prev };
                                    delete newErrors.image;
                                    return newErrors;
                                  });
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          accept="image/*"
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className={`w-full px-3 sm:px-4 py-1.5 sm:py-2.5 border-2 border-dashed rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm ${
                            formErrors.image ? 'border-red-500' : 'border-gray-300 hover:border-indigo-500'
                          }`}
                        >
                          <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                          <span className="text-gray-600">
                            {formData.imagePreview ? 'Change Image' : 'Upload Image'}
                          </span>
                        </label>
                      </div>
                      {formData.imagePreview && (
                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={formData.imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, image: null, imagePreview: '' }));
                            }}
                            className="absolute -top-1 -right-1 p-0.5 sm:p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                          >
                            <CloseIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                    {formErrors.image && (
                      <p className="mt-1 text-[10px] sm:text-xs text-red-600 flex items-center gap-1">
                        <ErrorIcon className="w-3 h-3" />
                        {formErrors.image}
                      </p>
                    )}
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">Max file size: 5MB. Supported formats: JPEG, PNG, GIF</p>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                      {t.email}
                    </label>
                    <div className="relative">
                      <EmailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full pl-9 sm:pl-10 pr-8 sm:pr-10 py-1.5 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-xs sm:text-sm transition-colors ${
                          formErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="student@example.com (optional)"
                      />
                      {formData.email && (
                        <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2">
                          {formErrors.email ? (
                            <ErrorIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                          ) : (
                            <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                          )}
                        </div>
                      )}
                    </div>
                    {formErrors.email && (
                      <p className="mt-1 text-[10px] sm:text-xs text-red-600 flex items-center gap-1">
                        <ErrorIcon className="w-3 h-3" />
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                      {t.date}
                    </label>
                    <div className="relative">
                      <CalendarTodayIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Verified & Featured */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <input
                        type="checkbox"
                        name="verified"
                        checked={formData.verified}
                        onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <label className="text-xs sm:text-sm font-medium text-gray-700">
                        Verified
                      </label>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <label className="text-xs sm:text-sm font-medium text-gray-700">
                        Featured
                      </label>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                      {t.status}
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as 'pending' | 'approved' | 'rejected' })}
                      className="w-full px-3 sm:px-4 py-1.5 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-xs sm:text-sm bg-white"
                    >
                      <option value="pending">{t.pending}</option>
                      <option value="approved">{t.approved}</option>
                      <option value="rejected">{t.rejected}</option>
                    </select>
                  </div>

                  {/* Submit */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                    <button
                      type="submit"
                      disabled={!isFormValid || isSubmitting}
                      className={`flex-1 px-4 py-2 sm:py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base ${
                        isFormValid && !isSubmitting
                          ? 'bg-indigo-600 hover:bg-indigo-700'
                          : 'bg-gray-400 cursor-not-allowed'
                      } order-1 sm:order-1`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {t.saving}
                        </>
                      ) : (
                        <>
                          <SaveIcon className="w-4 h-4" />
                          {t.save}
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="flex-1 px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base order-2 sm:order-2"
                    >
                      {t.cancel}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingItemId(null);
        }}
        onConfirm={handleDelete}
        title={t.deleteTestimonial}
        message={t.deleteConfirmation}
        confirmText={t.delete}
        cancelText={t.cancel}
        isSubmitting={isSubmitting}
        type="danger"
        icon={<DeleteIcon className="w-8 h-8 sm:w-10 sm:h-10" />}
      />
    </div>
  );
};