/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/immutability */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import axios from "axios";

// Material-UI Icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import SchoolIcon from "@mui/icons-material/School";
import CloseIcon from "@mui/icons-material/Close";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import GavelIcon from "@mui/icons-material/Gavel";
import VerifiedIcon from "@mui/icons-material/Verified";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CodeIcon from "@mui/icons-material/Code";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonIcon from "@mui/icons-material/Person";
import {
  CheckCircleOutlineRounded,
  ErrorOutlineOutlined,
} from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";

// API Configuration - Fixed
const API_BASE_URL = "https://inyumbaproject.eu1.hubfly.app";

const CONTACT_API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },

});

// Add request/response interceptors for error handling only (no logging)
CONTACT_API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Silent error handling - no console logs
    if (error.response) {
      // Server responded with error status
      return Promise.reject(error);
    } else if (error.request) {
      // Request made but no response
      return Promise.reject(
        new Error("Network error - no response from server"),
      );
    } else {
      // Request setup error
      return Promise.reject(new Error("Request configuration error"));
    }
  },
);

// Google Maps location - Musanze, INES-Ruhengeri
const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7989.457174818556!2d29.62835915!3d-1.5022738499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca8c8d129807f%3A0x6feccec1255c8e9d!2sINES-Ruhengeri!5e0!3m2!1sen!2srw!4v1700000000000";

// Status Modal Component
interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "success" | "error" | "info";
  title: string;
  message: string;
  details?: string;
}

const StatusModal: React.FC<StatusModalProps> = ({
  isOpen,
  onClose,
  type,
  title,
  message,
  details,
}) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <CheckCircleOutlineRounded className="w-16 h-16 text-green-500" />
        );
      case "error":
        return <ErrorOutlineOutlined className="w-16 h-16 text-red-500" />;
      case "info":
        return <InfoIcon className="w-16 h-16 text-blue-500" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-green-800",
          button: "bg-green-500 hover:bg-green-600",
        };
      case "error":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          text: "text-red-800",
          button: "bg-red-500 hover:bg-red-600",
        };
      case "info":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-800",
          button: "bg-blue-500 hover:bg-blue-600",
        };
    }
  };

  const colors = getColors();

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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            onClick={onClose}
          />
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
          >
            <div
              className={`w-full max-w-md rounded-2xl shadow-2xl border ${colors.border} ${colors.bg} relative overflow-hidden`}
            >
              <svg
                className="absolute inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient id="modalRadial">
                    <stop
                      offset="0%"
                      style={{
                        stopColor:
                          type === "success"
                            ? "#22c55e"
                            : type === "error"
                              ? "#ef4444"
                              : "#3b82f6",
                        stopOpacity: 0.1,
                      }}
                    />
                    <stop offset="100%" style={{ stopOpacity: 0 }} />
                  </radialGradient>
                </defs>
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="40%"
                  fill="url(#modalRadial)"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </svg>
              <div className="relative z-10 p-6">
                <div className="flex flex-col items-center text-center">
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200/50 transition-colors"
                  >
                    <CloseIcon className="w-5 h-5 text-gray-500" />
                  </button>

                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="mb-4"
                  >
                    {getIcon()}
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`text-2xl font-bold ${colors.text} mb-2`}
                  >
                    {title}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-700 mb-4"
                  >
                    {message}
                  </motion.p>

                  {details && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-white/50 rounded-lg p-3 mb-4 w-full text-sm text-gray-600"
                    >
                      {details}
                    </motion.div>
                  )}

                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className={`px-6 py-2.5 rounded-lg text-white font-medium transition-all ${colors.button} shadow-lg`}
                  >
                    Got it
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const translations = {
  en: {
    about: "About Us",
    description:
      "INYUMBA PROJECT is a pioneering student housing platform dedicated to providing safe, affordable, and comfortable accommodation for university students across Rwanda.",
    quickLinks: "Quick Links",
    home: "Home",
    houses: "Houses",
    aboutPage: "About Us",
    services: "Services",
    contact: "Contact",
    support: "Support",
    faq: "FAQ",
    help: "Help Center",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    legal: "Legal",
    contactUs: "Contact Us",
    address: "Musanze, Northern Province, Rwanda",
    phone: "+250 780 414 088",
    email: "inyumbarental@gmail.com",
    followUs: "Follow Us",
    rights: "All rights reserved.",
    designedBy: "Designed by",
    company: "INYUMBA",
    privacyTitle: "Privacy Policy",
    termsTitle: "Terms and Conditions",
    privacyLastUpdated: "Last Updated: January 2024",
    termsLastUpdated: "Last Updated: January 2024",
    location: "Our Location",
    findUs: "Find Us",
    visitUs: "Visit Us",
    backToTop: "Back to Top",
    contactTitle: "Contact Us",
    contactSubtitle:
      "We'd love to hear from you! Send us a message and we'll respond as soon as possible.",
    contactName: "Full Name",
    contactNamePlaceholder: "Enter your full name",
    contactEmail: "Email Address",
    contactEmailPlaceholder: "Enter your email address",
    contactMessage: "Message",
    contactMessagePlaceholder: "Write your message here...",
    contactSend: "Send Message",
    contactSending: "Sending...",
    contactSuccess: "Message Sent Successfully!",
    contactSuccessMessage:
      "Thank you for reaching out. We'll get back to you shortly.",
    contactError: "Failed to send message",
    contactErrorRetry: "Please try again later.",
    contactClose: "Close",
    contactNameRequired: "Name is required",
    contactNameMin: "Name must be at least 2 characters",
    contactNameMax: "Name cannot exceed 50 characters",
    contactEmailRequired: "Email is required",
    contactEmailValid: "Please enter a valid email",
    contactMessageRequired: "Message is required",
    contactMessageMin: "Message must be at least 10 characters",
    contactMessageMax: "Message cannot exceed 1000 characters",
    successModalTitle: "🎉 Message Sent!",
    successModalMessage:
      "Your message has been sent successfully. We'll get back to you soon!",
    successModalButton: "Got it",
    failModalTitle: "❌ Failed to Send",
    failModalMessage:
      "We couldn't send your message. Please check your internet connection and try again.",
    failModalButton: "Try Again",
    nameRequired: "Name is required",
    nameMin: "Name must be at least 2 characters",
    emailRequired: "Email is required",
    emailInvalid: "Please enter a valid email address",
    messageRequired: "Message is required",
    messageMin: "Message must be at least 10 characters",
    sending: "Sending...",
    success: "Message sent successfully! We'll get back to you soon.",
    successTitle: "🎉 Message Sent!",
    errorTitle: "❌ Failed to Send",
    errorMessage: "Please try again later.",
    fail: "Failed to send message. Please try again.",
    serverError: "Server error. Please try again later.",
  },
  fr: {
    about: "À Propos",
    description:
      "INYUMBA PROJECT est une plateforme pionnière de logement étudiant dédiée à fournir un hébergement sûr, abordable et confortable aux étudiants universitaires à travers le Rwanda.",
    quickLinks: "Liens Rapides",
    home: "Accueil",
    houses: "Maisons",
    aboutPage: "À Propos",
    services: "Services",
    contact: "Contact",
    support: "Support",
    faq: "FAQ",
    help: "Centre d'Aide",
    privacy: "Politique de Confidentialité",
    terms: "Conditions d'Utilisation",
    legal: "Légal",
    contactUs: "Contactez-Nous",
    address: "Musanze, Province du Nord, Rwanda",
    phone: "+250 780 414 088",
    email: "inyumbarental@gmail.com",
    followUs: "Suivez-Nous",
    rights: "Tous droits réservés.",
    designedBy: "Conçu par",
    company: "INYUMBA",
    privacyTitle: "Politique de Confidentialité",
    termsTitle: "Conditions Générales",
    privacyLastUpdated: "Dernière mise à jour: Janvier 2024",
    termsLastUpdated: "Dernière mise à jour: Janvier 2024",
    location: "Notre Emplacement",
    findUs: "Trouvez-Nous",
    visitUs: "Visitez-Nous",
    backToTop: "Retour en Haut",
    contactTitle: "Contactez-Nous",
    contactSubtitle:
      "Nous serions ravis de vous entendre! Envoyez-nous un message et nous vous répondrons dès que possible.",
    contactName: "Nom Complet",
    contactNamePlaceholder: "Entrez votre nom complet",
    contactEmail: "Adresse Email",
    contactEmailPlaceholder: "Entrez votre adresse email",
    contactMessage: "Message",
    contactMessagePlaceholder: "Écrivez votre message ici...",
    contactSend: "Envoyer",
    contactSending: "Envoi en cours...",
    contactSuccess: "Message Envoyé avec Succès!",
    contactSuccessMessage:
      "Merci de nous avoir contactés. Nous vous répondrons bientôt.",
    contactError: "Échec de l'envoi du message",
    contactErrorRetry: "Veuillez réessayer plus tard.",
    contactClose: "Fermer",
    contactNameRequired: "Le nom est requis",
    contactNameMin: "Le nom doit comporter au moins 2 caractères",
    contactNameMax: "Le nom ne peut pas dépasser 50 caractères",
    contactEmailRequired: "L'email est requis",
    contactEmailValid: "Veuillez entrer un email valide",
    contactMessageRequired: "Le message est requis",
    contactMessageMin: "Le message doit comporter au moins 10 caractères",
    contactMessageMax: "Le message ne peut pas dépasser 1000 caractères",
    successModalTitle: "🎉 Message Envoyé!",
    successModalMessage:
      "Votre message a été envoyé avec succès. Nous vous répondrons bientôt!",
    successModalButton: "Terminé",
    failModalTitle: "❌ Échec de l'envoi",
    failModalMessage:
      "Nous n'avons pas pu envoyer votre message. Veuillez vérifier votre connexion internet et réessayer.",
    failModalButton: "Réessayer",
    nameRequired: "Le nom est requis",
    nameMin: "Le nom doit contenir au moins 2 caractères",
    emailRequired: "L'e-mail est requis",
    emailInvalid: "Veuillez entrer une adresse e-mail valide",
    messageRequired: "Le message est requis",
    messageMin: "Le message doit contenir au moins 10 caractères",
    sending: "Envoi en cours...",
    success: "Message envoyé avec succès ! Nous vous répondrons bientôt.",
    successTitle: "🎉 Message Envoyé!",
    errorTitle: "❌ Échec de l'envoi",
    errorMessage: "Veuillez réessayer plus tard.",
    fail: "Échec de l'envoi du message. Veuillez réessayer.",
    serverError: "Erreur du serveur. Veuillez réessayer plus tard.",
  },
  rw: {
    about: "Ibijyanye Na Twe",
    description:
      "INYUMBA PROJECT ni urubuga rw'amazu y'abanyeshuri rwateguwe kugira ngo rutange amazu meza, afite umutekano, kandi ari buhendutse kubanyeshuri bo mukaminuza mu Rwanda.",
    quickLinks: "Ibyo Ukora",
    home: "Ahabanza",
    houses: "Amazu",
    aboutPage: "Ibijyanye Na Twe",
    services: "Serivisi",
    contact: "Twandikire",
    support: "Ubufasha",
    faq: "Ibibazo",
    help: "Ikigo cy'Ubufasha",
    privacy: "Amategeko Y'ibanga",
    terms: "Amategeko n'Amabwiriza",
    legal: "Amategeko",
    contactUs: "Twandikire",
    address: "Musanze, Intara y'Amajyaruguru, Rwanda",
    phone: "+250 780 414 088",
    email: "inyumbarental@gmail.com",
    followUs: "Dukurikire",
    rights: "Uburenganzira bwose buraharanwa.",
    designedBy: "Byakozwe na",
    company: "INYUMBA",
    privacyTitle: "Amategeko Y'ibanga",
    termsTitle: "Amategeko n'Amabwiriza",
    privacyLastUpdated: "Byavuguruwe: Mutarama 2024",
    termsLastUpdated: "Byavuguruwe: Mutarama 2024",
    location: "Aho Turi",
    findUs: "Turebe",
    visitUs: "Udukerere",
    backToTop: "Garuka Hejuru",
    contactTitle: "Twandikire",
    contactSubtitle:
      "Twishimira kumva ubutumwa bwawe! Dutume ubutumwa tuzagusubiza vuba.",
    contactName: "Izina Risoze",
    contactNamePlaceholder: "Andika izina ryawe ryose",
    contactEmail: "Adresi ya Email",
    contactEmailPlaceholder: "Andika adresi ya email yawe",
    contactMessage: "Ubutumwa",
    contactMessagePlaceholder: "Andika ubutumwa bwawe hano...",
    contactSend: "Ohereza Ubutumwa",
    contactSending: "Birambura...",
    contactSuccess: "Ubutumwa Bwoherejwe Neza!",
    contactSuccessMessage: "Urakoze kudutwara. Tuzagusubiza vuba.",
    contactError: "Ubutumwa ntabwo bwoherejwe",
    contactErrorRetry: "Nyamuneka ongera ugerageze nyuma.",
    contactClose: "Funga",
    contactNameRequired: "Izina rirasabwa",
    contactNameMin: "Izina rigomba kugira nibura inyuguti 2",
    contactNameMax: "Izina ntirigomba kurenga inyuguti 50",
    contactEmailRequired: "Email irasabwa",
    contactEmailValid: "Nyamuneka andika email ikwiye",
    contactMessageRequired: "Ubutumwa burasabwa",
    contactMessageMin: "Ubutumwa bugomba kugira nibura inyuguti 10",
    contactMessageMax: "Ubutumwa ntibugomba kurenga inyuguti 1000",
    successModalTitle: "🎉 Ubutumwa Bwoherejwe!",
    successModalMessage: "Ubutumwa bwawe bwoherejwe neza. Tuzagusubiza vuba!",
    successModalButton: "Byakozwe",
    failModalTitle: "❌ Ntabwo Bwoherejwe",
    failModalMessage:
      "Ntabwo twashoboye kohereza ubutumwa bwawe. Nyamuneka reba isanduku ya interineti hanyuma ongera ugerageze.",
    failModalButton: "Ongera Ugerageze",
    nameRequired: "Izina rirasabwa",
    nameMin: "Izina rigomba kugira nibura inyuguti 2",
    emailRequired: "Imeri irasabwa",
    emailInvalid: "Injiza aderesi ya imeri ikwiye",
    messageRequired: "Ubutumwa burasabwa",
    messageMin: "Ubutumwa bugomba kugira nibura inyuguti 10",
    sending: "Biremereza...",
    success: "Ubutumwa bwoherejwe neza! Tuzagusubiza vuba.",
    successTitle: "🎉 Ubutumwa Bwoherejwe!",
    errorTitle: "❌ Ntabwo Bwoherejwe",
    errorMessage: "Ongera ugerageze nyuma.",
    fail: "Ubutumwa ntibwoherejwe. Ongera ugerageze.",
    serverError: "Hari ikibazo kuri seriveri. Ongera ugerageze nyuma.",
  },
};

// Helper function to get language from cookies
const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
  const lang = Cookies.get("language") as "en" | "fr" | "rw";
  return lang || "en";
};

const InyumbaLogo = ({
  className = "h-12 w-12 rounded-2xl",
}: {
  className?: string;
}) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 500 560"
    className={className}
    whileHover={{
      rotate: [-2, 2, -2, 2, 0],
      transition: { duration: 0.45 },
    }}
  >
    {/* White Background */}
    <rect width="500" height="560" fill="white" />

    {/* Outer Green Rings */}
    <path
      d="M90 120 A180 180 0 0 0 90 430"
      fill="none"
      stroke="#36B25A"
      strokeWidth="7"
      strokeLinecap="round"
    />

    <path
      d="M410 120 A180 180 0 0 1 410 430"
      fill="none"
      stroke="#36B25A"
      strokeWidth="7"
      strokeLinecap="round"
    />

    {/* Inner Blue Rings */}
    <path
      d="M105 135 A165 165 0 0 0 105 415"
      fill="none"
      stroke="#1B4E91"
      strokeWidth="5"
      strokeLinecap="round"
    />

    <path
      d="M395 135 A165 165 0 0 1 395 415"
      fill="none"
      stroke="#1B4E91"
      strokeWidth="5"
      strokeLinecap="round"
    />

    {/* Bottom Rings */}
    <path
      d="M165 475 A120 120 0 0 0 335 475"
      fill="none"
      stroke="#36B25A"
      strokeWidth="7"
      strokeLinecap="round"
    />

    <path
      d="M180 462 A104 104 0 0 0 320 462"
      fill="none"
      stroke="#1B4E91"
      strokeWidth="5"
      strokeLinecap="round"
    />

    {/* Compass */}
    <g transform="translate(250 95)">
      <text
        x="0"
        y="-18"
        textAnchor="middle"
        fontSize="34"
        fontWeight="800"
        fill="#1B4E91"
        fontFamily="Arial"
      >
        N
      </text>

      <circle r="58" fill="none" stroke="#1B4E91" strokeWidth="7" />

      <polygon points="0,-58 10,-10 0,-22 -10,-10" fill="#1B4E91" />

      <polygon points="0,58 10,10 0,22 -10,10" fill="#1B4E91" />

      <polygon points="-58,0 -10,-10 -22,0 -10,10" fill="#1B4E91" />

      <polygon points="58,0 10,-10 22,0 10,10" fill="#1B4E91" />

      <polygon points="-40,-40 -8,-12 -12,-8" fill="#1B4E91" />

      <polygon points="40,-40 8,-12 12,-8" fill="#1B4E91" />

      <polygon points="-40,40 -8,12 -12,8" fill="#1B4E91" />

      <polygon points="40,40 8,12 12,8" fill="#1B4E91" />
    </g>

    {/* Roof */}
    <path
      d="M150 215 L250 135 L350 215"
      fill="none"
      stroke="#36B25A"
      strokeWidth="14"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Chimney */}
    <rect x="305" y="175" width="18" height="55" fill="#36B25A" />

    {/* House */}
    <rect x="188" y="215" width="124" height="90" fill="#36B25A" />

    {/* Animated Location Pin */}
    <motion.g
      animate={{
        scale: [1, 1.08, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    >
      <path
        d="
          M250 220
          C225 220 208 238 208 262
          C208 292 250 330 250 330
          C250 330 292 292 292 262
          C292 238 275 220 250 220
          Z
        "
        fill="#1B4E91"
      />

      <circle cx="250" cy="255" r="14" fill="white" />
    </motion.g>

    {/* Book */}
    <path
      d="
        M250 320
        C220 305 170 302 118 316
        C128 328 128 346 118 360
        C170 340 220 342 250 362
        Z
      "
      fill="#1B4E91"
    />

    <path
      d="
        M250 320
        C280 305 330 302 382 316
        C372 328 372 346 382 360
        C330 340 280 342 250 362
        Z
      "
      fill="#1B4E91"
    />

    <path d="M250 320 L250 362" stroke="#FFFFFF" strokeWidth="3" />

    {/* Text */}
    <text
      x="250"
      y="430"
      textAnchor="middle"
      fontSize="60"
      fontFamily="Poppins, Arial, sans-serif"
      fontWeight="900"
      fill="#1B4E91"
    >
      INYUMBA
    </text>

    <text
      x="250"
      y="462"
      textAnchor="middle"
      fontSize="20"
      fontFamily="Poppins, Arial, sans-serif"
      fontWeight="700"
      fill="#36B25A"
    >
      STUDENT ACCOMMODATION
    </text>

    <text
      x="250"
      y="530"
      textAnchor="middle"
      fontSize="24"
      fontFamily="Poppins, Arial, sans-serif"
      fontWeight="800"
      letterSpacing="5"
      fill="#1B4E91"
    >
      RWANDA
    </text>
  </motion.svg>
);

export const Footer: React.FC = () => {
  // Get language from cookies
  const [lang, setLang] = useState<"en" | "fr" | "rw">(
    getLanguageFromCookies(),
  );
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Field validation states
  const [isNameValid, setIsNameValid] = useState<boolean | null>(null);
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [isMessageValid, setIsMessageValid] = useState<boolean | null>(null);

  // Status Modal state
  const [statusModal, setStatusModal] = useState<{
    isOpen: boolean;
    type: "success" | "error" | "info";
    title: string;
    message: string;
    details?: string;
  }>({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
    details: "",
  });

  const t = translations[lang];

  // Validate form on change
  useEffect(() => {
    const nameValid = formData.name.length >= 2;
    const emailValid = validateEmail(formData.email);
    const messageValid = formData.message.length >= 10;

    setIsNameValid(formData.name.length > 0 ? nameValid : null);
    setIsEmailValid(formData.email.length > 0 ? emailValid : null);
    setIsMessageValid(formData.message.length > 0 ? messageValid : null);

    const valid = nameValid && emailValid && messageValid;
    setIsFormValid(valid);

    if (nameValid && errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
    if (emailValid && errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
    if (messageValid && errors.message) {
      setErrors((prev) => ({ ...prev, message: undefined }));
    }
  }, [formData, errors.name, errors.email, errors.message]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (): boolean => {
    const newErrors: { name?: string; email?: string; message?: string } = {};

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = t.nameMin;
    }

    if (!formData.email) {
      newErrors.email = t.emailRequired;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t.emailInvalid;
    }

    if (!formData.message || formData.message.length < 10) {
      newErrors.message = t.messageMin;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!validateForm()) {
  //     setStatusModal({
  //       isOpen: true,
  //       type: "error",
  //       title: "⚠️ Invalid Form",
  //       message: "Please fix the errors before submitting.",
  //       details: "Check all fields and try again.",
  //     });
  //     return;
  //   }

  //   setIsSubmitting(true);

  //   try {
  //     // FIXED: Using correct endpoint path
  //     const response = await CONTACT_API.post("/contact", {
  //       name: formData.name.trim(),
  //       email: formData.email.trim().toLowerCase(),
  //       message: formData.message.trim(),
  //     });

  //     if (response.data && response.data.success === true) {
  //       setStatusModal({
  //         isOpen: true,
  //         type: "success",
  //         title: t.successTitle,
  //         message: response.data.message || t.success,
  //         details: `Thank you, ${formData.name}! We'll get back to you soon.`,
  //       });

  //       setFormData({ name: "", email: "", message: "" });
  //       setIsNameValid(null);
  //       setIsEmailValid(null);
  //       setIsMessageValid(null);
  //       setIsFormValid(false);
  //       setIsContactOpen(false);
  //     } else {
  //       const errorMsg = response.data?.message || t.fail;
  //       setStatusModal({
  //         isOpen: true,
  //         type: "error",
  //         title: t.errorTitle,
  //         message: errorMsg,
  //         details: `Please check your input and try again.`,
  //       });
  //       setIsContactOpen(false);
  //     }
  //   } catch (error) {
  //     // Silent error handling - no user data exposed
  //     let errorMessage = t.fail;
  //     let errorDetails = "Please try again or contact support.";

  //     if (axios.isAxiosError(error)) {
  //       if (error.response) {
  //         // Server responded with error
  //         errorMessage = error.response.data?.message || t.serverError;
  //         errorDetails = "We're experiencing technical issues. Please try again later.";
  //       } else if (error.request) {
  //         // No response from server
  //         errorMessage = "Connection Error";
  //         errorDetails = "Unable to reach our servers. Please check your internet connection.";
  //       }
  //     }

  //     setStatusModal({
  //       isOpen: true,
  //       type: "error",
  //       title: t.errorTitle,
  //       message: errorMessage,
  //       details: errorDetails,
  //     });
  //     setIsContactOpen(false);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // Listen for language changes in cookies

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatusModal({
        isOpen: true,
        type: "error",
        title: "⚠️ Invalid Form",
        message: "Please fix the errors before submitting.",
        details: "Check all fields and try again.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await CONTACT_API.post("/contact", {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        message: formData.message.trim(),
      });

      console.log("📨 Contact API response:", response.data);

      // Axios considers 2xx responses successful by default.
      // So if the request reached here, the backend accepted it.
      if (response.status >= 200 && response.status < 300) {
        setStatusModal({
          isOpen: true,
          type: "success",
          title: t.successTitle,
          message:
            response.data?.message ||
            t.success ||
            "Your message was sent successfully.",
          details: `Thank you, ${formData.name}! We'll get back to you soon.`,
        });

        setFormData({
          name: "",
          email: "",
          message: "",
        });

        setIsNameValid(null);
        setIsEmailValid(null);
        setIsMessageValid(null);
        setIsFormValid(false);
        setIsContactOpen(false);
      } else {
        setStatusModal({
          isOpen: true,
          type: "error",
          title: t.errorTitle,
          message:
            response.data?.message || t.fail || "Failed to send your message.",
          details: "Please check your input and try again.",
        });

        setIsContactOpen(false);
      }
    } catch (error) {
      let errorMessage = t.fail;
      let errorDetails = "Please try again or contact support.";

      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("❌ Contact API error:", error.response.data);

          errorMessage =
            error.response.data?.message || t.serverError || "Server error.";

          errorDetails =
            "We're experiencing technical issues. Please try again later.";
        } else if (error.request) {
          console.error("❌ No response from contact API:", error.request);

          errorMessage = "Connection Error";
          errorDetails =
            "Unable to reach our servers. Please check your internet connection.";
        } else {
          console.error("❌ Contact request error:", error.message);

          errorMessage = error.message || t.fail;
        }
      } else {
        console.error("❌ Unexpected contact error:", error);
      }

      setStatusModal({
        isOpen: true,
        type: "error",
        title: t.errorTitle,
        message: errorMessage,
        details: errorDetails,
      });

      setIsContactOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  // Handle scroll to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle back to top click
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePrivacyClick = () => {
    setIsPrivacyOpen(true);
  };

  const handleTermsClick = () => {
    setIsTermsOpen(true);
  };

  const handleContactClick = () => {
    setIsContactOpen(true);
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
    setIsNameValid(null);
    setIsEmailValid(null);
    setIsMessageValid(null);
    setIsFormValid(false);
  };

  const handleCloseContact = () => {
    setIsContactOpen(false);
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
    setIsNameValid(null);
    setIsEmailValid(null);
    setIsMessageValid(null);
    setIsFormValid(false);
  };

  const currentYear = 2026;

  return (
    <>
      <StatusModal
        isOpen={statusModal.isOpen}
        onClose={() => setStatusModal((prev) => ({ ...prev, isOpen: false }))}
        type={statusModal.type}
        title={statusModal.title}
        message={statusModal.message}
        details={statusModal.details}
      />

      <footer className="bg-gray-900 text-gray-300 relative">
        {/* Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={handleBackToTop}
              className="fixed bottom-6 right-6 z-50 bg-[#FF385C] text-white rounded-full p-3 shadow-lg hover:bg-[#E31C5F] transition-all duration-300 hover:scale-110 hover:shadow-2xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUpwardIcon className="w-6 h-6" />
              <span className="sr-only">{t.backToTop}</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About Section */}
            <div>
              <div className="text-[#FF385C]">
                <InyumbaLogo className="h-12 w-12 sm:h-12 sm:w-12 rounded-2xl" />
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                {t.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <LocationOnIcon className="w-4 h-4 text-[#FF385C]" />
                <span>{t.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <PhoneIcon className="w-4 h-4 text-[#FF385C]" />
                <span>{t.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <EmailIcon className="w-4 h-4 text-[#FF385C]" />
                <span>{t.email}</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">
                {t.quickLinks}
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="/"
                    className="text-gray-400 hover:text-[#FF385C] transition-colors"
                  >
                    {t.home}
                  </a>
                </li>
                <li>
                  <a
                    href="/houses"
                    className="text-gray-400 hover:text-[#FF385C] transition-colors"
                  >
                    {t.houses}
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-gray-400 hover:text-[#FF385C] transition-colors"
                  >
                    {t.aboutPage}
                  </a>
                </li>
                <li>
                  <a
                    href="/services"
                    className="text-gray-400 hover:text-[#FF385C] transition-colors"
                  >
                    {t.services}
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleContactClick}
                    className="text-gray-400 hover:text-[#FF385C] transition-colors"
                  >
                    {t.contact}
                  </button>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">{t.support}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="/faq"
                    className="text-gray-400 hover:text-[#FF385C] transition-colors"
                  >
                    {t.faq}
                  </a>
                </li>
                <li>
                  <a
                    href="/help"
                    className="text-gray-400 hover:text-[#FF385C] transition-colors"
                  >
                    {t.help}
                  </a>
                </li>
                <li>
                  <button
                    onClick={handlePrivacyClick}
                    className="text-gray-400 hover:text-[#FF385C] transition-colors"
                  >
                    {t.privacy}
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleTermsClick}
                    className="text-gray-400 hover:text-[#FF385C] transition-colors"
                  >
                    {t.terms}
                  </button>
                </li>
              </ul>
            </div>

            {/* Location / Map */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <LocationOnIcon className="text-[#FF385C]" />
                {t.location}
              </h3>
              <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                <iframe
                  src={MAP_EMBED_URL}
                  width="100%"
                  height="180"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="INES-Ruhengeri Location"
                  className="w-full"
                ></iframe>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                <SchoolIcon className="w-3 h-3 inline mr-1" />
                INES-Ruhengeri, Musanze
              </p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">{t.followUs}</span>
              <div className="mt-4 sm:mt-6 flex justify-center gap-3 sm:gap-4">
                <Link
                  to="https://web.facebook.com/profile.php?id=61593907921662"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-blue-600 text-blue-600" />
                </Link>

                <Link
                  to="https://www.instagram.com/inyumbarental/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-pink-600 text-pink-600" />
                </Link>

                <Link
                  to="https://x.com/inyumbarental"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <TwitterIcon className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-blue-600 text-indigo-400" />
                </Link>

                <Link
                  to="https://www.youtube.com/channel/UCUe_TGKGrXPhit85u5u9bDA"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <YouTubeIcon className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-red-300 text-red-300" />
                </Link>

                <Link
                  to="https://www.linkedin.com/in/inyumba-rental-998031432?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-blue-300 text-red-300" />
                </Link>
              </div>
            </div>

            {/* Copyright and Designer Credit */}
            <div className="text-center">
              <div className="text-sm text-gray-50">
                <span className="text-blue-400 font-bold">
                  {" "}
                  © {currentYear}
                </span>{" "}
                {t.company}. {t.rights}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-1 pt-1 flex items-center justify-center gap-2"
              >
                <CodeIcon className="w-4 h-4 text-green-400" />
                <span className="text-xs text-gray-400">{t.designedBy}</span>
                <span className="text-sm font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Leon
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {isPrivacyOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[500]"
              onClick={() => setIsPrivacyOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-2 xs:inset-4 z-[501] flex items-center justify-center"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl xs:rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl">
                {/* Modal Header */}
                <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 xs:p-6 flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FF385C]/10 rounded-full flex items-center justify-center text-[#FF385C]">
                      <PrivacyTipIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg xs:text-xl font-bold text-gray-900 dark:text-white">
                        {t.privacyTitle}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {t.privacyLastUpdated}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsPrivacyOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <CloseIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-4 xs:p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      1. Information We Collect
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      INYUMBA PROJECT collects information you provide directly,
                      such as your name, email address, phone number, and
                      payment information when you create an account, book a
                      house, or contact us. We also collect information about
                      your use of our platform, including search history,
                      booking history, and interactions with landlords.
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      2. How We Use Your Information
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      We use your information to provide, maintain, and improve
                      our services, to process bookings and payments, to
                      communicate with you about your bookings and account, to
                      send you updates and promotional materials, and to ensure
                      the security and integrity of our platform.
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      3. Information Sharing
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      We share your information with landlords to facilitate
                      bookings, with payment processors to handle transactions,
                      with analytics providers to improve our services, and with
                      law enforcement when required by law. We do not sell your
                      personal information to third parties.
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      4. Data Security
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      We implement appropriate technical and organizational
                      measures to protect your personal information against
                      unauthorized access, alteration, disclosure, or
                      destruction. We use secure encryption for data
                      transmission and storage.
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      5. Your Rights
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      You have the right to access, correct, or delete your
                      personal information. You can update your profile
                      information in your account settings or contact us to
                      exercise these rights. You may also opt out of marketing
                      communications at any time.
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      6. Cookies and Tracking
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      We use cookies and similar tracking technologies to
                      enhance your experience on our platform, analyze usage
                      patterns, and serve relevant advertisements. You can
                      control cookie preferences in your browser settings.
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      7. Contact Us
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      If you have any questions about this Privacy Policy,
                      please contact us at {t.email} or call us at {t.phone}.
                    </p>

                    <div className="mt-6 p-4 bg-[#FF385C]/5 rounded-lg border border-[#FF385C]/20">
                      <p className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                        <VerifiedIcon className="w-5 h-5 text-[#FF385C] flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Our Commitment:</strong> We are committed to
                          protecting your privacy and ensuring the security of
                          your personal information. We regularly review and
                          update our privacy practices to comply with applicable
                          laws and regulations.
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Terms and Conditions Modal */}
      <AnimatePresence>
        {isTermsOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[500]"
              onClick={() => setIsTermsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-2 xs:inset-4 z-[501] flex items-center justify-center"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl xs:rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl">
                {/* Modal Header */}
                <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 xs:p-6 flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FF385C]/10 rounded-full flex items-center justify-center text-[#FF385C]">
                      <GavelIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg xs:text-xl font-bold text-gray-900 dark:text-white">
                        {t.termsTitle}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {t.termsLastUpdated}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsTermsOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <CloseIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-4 xs:p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      1. Acceptance of Terms
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      By using INYUMBA PROJECT's platform, you agree to comply
                      with and be bound by these Terms and Conditions. If you do
                      not agree to these terms, please do not use our services.
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      2. User Accounts
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      To access certain features, you must create an account.
                      You are responsible for maintaining the confidentiality of
                      your account credentials and for all activities that occur
                      under your account. You must provide accurate and complete
                      information when creating your account.
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      3. Booking and Payments
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      When you book a house through our platform, you enter into
                      a contract with the landlord. INYUMBA PROJECT facilitates
                      the transaction but is not responsible for the condition
                      of the property or the landlord's conduct. All payments
                      are processed securely through our payment system.
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      4. User Conduct
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      You agree to use our platform in a lawful and respectful
                      manner. You may not post false or misleading information,
                      infringe on others' rights, or engage in any activity that
                      disrupts the platform's operation.
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      5. Cancellation and Refunds
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Cancellation policies are set by individual landlords and
                      displayed on each property listing. Refunds are processed
                      according to the landlord's cancellation policy and our
                      refund guidelines.
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      6. Intellectual Property
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      All content on our platform, including text, images,
                      logos, and software, is the property of INYUMBA PROJECT or
                      its licensors. You may not use, reproduce, or distribute
                      any content without our prior written permission.
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      7. Disclaimer of Warranties
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Our platform is provided "as is" without any warranties,
                      express or implied. We do not guarantee that the platform
                      will be error-free or uninterrupted.
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      8. Limitation of Liability
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      INYUMBA PROJECT is not liable for any indirect,
                      incidental, special, or consequential damages arising from
                      your use of our platform. Our total liability is limited
                      to the amount you paid for the booking.
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      9. Changes to Terms
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      We may update these terms from time to time. We will
                      notify you of significant changes by posting a notice on
                      our platform. Your continued use of the platform
                      constitutes acceptance of the updated terms.
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      10. Governing Law
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      These terms are governed by the laws of the Republic of
                      Rwanda. Any disputes arising from these terms shall be
                      resolved through arbitration in accordance with Rwandan
                      law.
                    </p>

                    <div className="mt-6 p-4 bg-[#FF385C]/5 rounded-lg border border-[#FF385C]/20">
                      <div className="flex items-start gap-2">
                        <PaymentIcon className="w-5 h-5 text-[#FF385C] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            <strong className="text-gray-900 dark:text-white">
                              Payment Security:
                            </strong>{" "}
                            All transactions are processed securely through our
                            payment system with MOMO integration. Your payment
                            information is encrypted and protected.
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded text-xs">
                              <CheckCircleIcon className="w-3 h-3" />
                              Secure Payments
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded text-xs">
                              <CheckCircleIcon className="w-3 h-3" />
                              Verified Landlords
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded text-xs">
                              <CheckCircleIcon className="w-3 h-3" />
                              Student Protection
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <strong className="text-gray-900 dark:text-white">
                          Contact for Legal Matters:
                        </strong>
                        <br />
                        INYUMBA PROJECT
                        <br />
                        {t.address}
                        <br />
                        {t.phone}
                        <br />
                        {t.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Contact Modal - Styled like About page contact section */}
      <AnimatePresence>
        {isContactOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[500]"
              onClick={handleCloseContact}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-2 xs:inset-4 z-[501] flex items-center justify-center"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl xs:rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
                {/* Modal Header */}
                <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 xs:p-6 flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FF385C]/10 rounded-full flex items-center justify-center text-[#FF385C]">
                      <EmailIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg xs:text-xl font-bold text-gray-900 dark:text-white">
                        {t.contactTitle}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {t.contactSubtitle}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleCloseContact}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <CloseIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>

                {/* Modal Content - Styled like About page contact form */}
                <div className="p-4 xs:p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    noValidate
                  >
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        {t.contactName}
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <PersonIcon className="w-5 h-5" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-1 transition-colors text-sm ${
                            isNameValid === true
                              ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                              : isNameValid === false
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                : "border-gray-300 dark:border-gray-600 focus:border-[#FF385C] focus:ring-[#FF385C]"
                          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                          placeholder={t.contactNamePlaceholder}
                        />
                        {isNameValid === true && (
                          <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                        {isNameValid === false && (
                          <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                        )}
                      </div>
                      {errors.name && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.name}
                        </p>
                      )}
                      {isNameValid === true && (
                        <p className="text-xs text-green-500 mt-1">
                          ✓ Valid name
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        {t.contactEmail}
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <EmailIcon className="w-5 h-5" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-1 transition-colors text-sm ${
                            isEmailValid === true
                              ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                              : isEmailValid === false
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                : "border-gray-300 dark:border-gray-600 focus:border-[#FF385C] focus:ring-[#FF385C]"
                          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                          placeholder={t.contactEmailPlaceholder}
                        />
                        {isEmailValid === true && (
                          <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                        {isEmailValid === false && (
                          <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                        )}
                      </div>
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.email}
                        </p>
                      )}
                      {isEmailValid === true && (
                        <p className="text-xs text-green-500 mt-1">
                          ✓ Valid email address
                        </p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        {t.contactMessage}
                      </label>
                      <div className="relative">
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          className={`w-full px-4 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-1 transition-colors text-sm resize-none ${
                            isMessageValid === true
                              ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                              : isMessageValid === false
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                : "border-gray-300 dark:border-gray-600 focus:border-[#FF385C] focus:ring-[#FF385C]"
                          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                          placeholder={t.contactMessagePlaceholder}
                        />
                        <div className="absolute right-3 top-3">
                          {isMessageValid === true && (
                            <CheckCircleIcon className="w-5 h-5 text-green-500" />
                          )}
                          {isMessageValid === false && (
                            <CancelIcon className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                      </div>
                      {errors.message && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.message}
                        </p>
                      )}
                      {isMessageValid === true && (
                        <p className="text-xs text-green-500 mt-1">
                          ✓ Valid message
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        {formData.message.length}/10 characters minimum
                      </p>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      whileHover={{ scale: isFormValid ? 1.02 : 1 }}
                      whileTap={{ scale: isFormValid ? 0.98 : 1 }}
                      type="submit"
                      disabled={!isFormValid || isSubmitting}
                      className={`w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                        isFormValid && !isSubmitting
                          ? "bg-[#FF385C] text-white hover:bg-[#E31C5F] shadow-lg shadow-[#FF385C]/30 cursor-pointer"
                          : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {t.sending}
                        </>
                      ) : (
                        <>
                          <SendIcon className="w-5 h-5" />
                          {t.contactSend}
                        </>
                      )}
                    </motion.button>

                    {!isFormValid &&
                      Object.keys(formData).some(
                        (key) =>
                          formData[key as keyof typeof formData].length > 0,
                      ) && (
                        <p className="text-center text-xs text-amber-500 mt-2">
                          Please fill in all fields correctly to enable submit
                        </p>
                      )}
                  </form>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
