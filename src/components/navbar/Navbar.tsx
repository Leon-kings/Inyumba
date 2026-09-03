/* eslint-disable no-useless-assignment */
// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-hooks/immutability */
// /* eslint-disable react-hooks/refs */
// /* eslint-disable react-refresh/only-export-components */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-hooks/set-state-in-effect */
// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import "react-toastify/dist/ReactToastify.css";
// import Cookies from "js-cookie";
// import axios from "axios";

// // Material-UI Icons
// import PersonIcon from "@mui/icons-material/Person";
// import LanguageIcon from "@mui/icons-material/Language";
// import LoginIcon from "@mui/icons-material/Login";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import CloseIcon from "@mui/icons-material/Close";
// import EmailIcon from "@mui/icons-material/Email";
// import LockIcon from "@mui/icons-material/Lock";
// import SettingsIcon from "@mui/icons-material/Settings";
// import LogoutIcon from "@mui/icons-material/Logout";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import YouTubeIcon from "@mui/icons-material/YouTube";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import CancelIcon from "@mui/icons-material/Cancel";
// import HotelIcon from "@mui/icons-material/Hotel";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PeopleIcon from "@mui/icons-material/People";
// import StarIcon from "@mui/icons-material/Star";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
// import PhoneIcon from "@mui/icons-material/Phone";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import WarningIcon from "@mui/icons-material/Warning";
// import SecurityIcon from "@mui/icons-material/Security";
// import VerifiedIcon from "@mui/icons-material/Verified";
// import {
//   CheckCircleOutlineRounded,
//   ErrorOutlineOutlined,
//   LinkedIn,
// } from "@mui/icons-material";
// import InfoIcon from "@mui/icons-material/Info";
// import { Link, useLocation } from "react-router-dom";

// // API Configuration
// const API_BASE_URL = "https://inyumbaproject.eu1.hubfly.app";
// const API = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Add token interceptor
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // INYUMBA SVG Logo Component with Animation
// const InyumbaLogo = ({ className = "h-12 w-12" }: { className?: string }) => (
//   <motion.svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 500 560"
//     className={className}
//     whileHover={{
//       rotate: [-2, 2, -2, 2, 0],
//       transition: { duration: 0.45 },
//     }}
//   >
//     <path
//       d="M90 120 A180 180 0 0 0 90 430"
//       fill="none"
//       stroke="#36B25A"
//       strokeWidth="7"
//       strokeLinecap="round"
//     />
//     <path
//       d="M410 120 A180 180 0 0 1 410 430"
//       fill="none"
//       stroke="#36B25A"
//       strokeWidth="7"
//       strokeLinecap="round"
//     />
//     <path
//       d="M105 135 A165 165 0 0 0 105 415"
//       fill="none"
//       stroke="#1B4E91"
//       strokeWidth="5"
//       strokeLinecap="round"
//     />
//     <path
//       d="M395 135 A165 165 0 0 1 395 415"
//       fill="none"
//       stroke="#1B4E91"
//       strokeWidth="5"
//       strokeLinecap="round"
//     />
//     <path
//       d="M165 475 A120 120 0 0 0 335 475"
//       fill="none"
//       stroke="#36B25A"
//       strokeWidth="7"
//       strokeLinecap="round"
//     />
//     <path
//       d="M180 462 A104 104 0 0 0 320 462"
//       fill="none"
//       stroke="#1B4E91"
//       strokeWidth="5"
//       strokeLinecap="round"
//     />
//     <g transform="translate(250 95)">
//       <text
//         x="0"
//         y="-18"
//         fontSize="34"
//         fontWeight="800"
//         textAnchor="middle"
//         fill="#1B4E91"
//       >
//         N
//       </text>
//       <circle r="58" fill="none" stroke="#1B4E91" strokeWidth="7" />
//       <polygon points="0,-58 10,-10 0,-22 -10,-10" fill="#1B4E91" />
//       <polygon points="0,58 10,10 0,22 -10,10" fill="#1B4E91" />
//       <polygon points="-58,0 -10,-10 -22,0 -10,10" fill="#1B4E91" />
//       <polygon points="58,0 10,-10 22,0 10,10" fill="#1B4E91" />
//       <polygon points="-40,-40 -8,-12 -12,-8" fill="#1B4E91" />
//       <polygon points="40,-40 8,-12 12,-8" fill="#1B4E91" />
//       <polygon points="-40,40 -8,12 -12,8" fill="#1B4E91" />
//       <polygon points="40,40 8,12 12,8" fill="#1B4E91" />
//     </g>
//     <g>
//       <path
//         d="M150 215 L250 135 L350 215"
//         fill="none"
//         stroke="#36B25A"
//         strokeWidth="14"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <rect x="188" y="215" width="124" height="90" rx="3" fill="#36B25A" />
//       <rect x="305" y="175" width="18" height="55" fill="#36B25A" />
//     </g>
//     <motion.g
//       animate={{ scale: [1, 1.08, 1] }}
//       transition={{ repeat: Infinity, duration: 2 }}
//       transform="translate(250 252)"
//     >
//       <path
//         d="M0-32 C-23-32 -38-15 -38 8 C-38 38 0 72 0 72 C0 72 38 38 38 8 C38-15 23-32 0-32"
//         fill="#1B4E91"
//       />
//       <circle r="13" cy="-3" fill="white" />
//     </motion.g>
//     <g transform="translate(250 320)">
//       <path
//         d="M0 0 C-28 -16 -82 -18 -132 -4 C-120 10 -120 26 -132 40 C-82 20 -30 22 0 42"
//         fill="#1B4E91"
//       />
//       <path
//         d="M0 0 C28 -16 82 -18 132 -4 C120 10 120 26 132 40 C82 20 30 22 0 42"
//         fill="#1B4E91"
//       />
//       <path
//         d="M0 14 C-28 -2 -78 -4 -120 8"
//         stroke="white"
//         strokeWidth="2"
//         fill="none"
//       />
//       <path
//         d="M0 14 C28 -2 78 -4 120 8"
//         stroke="white"
//         strokeWidth="2"
//         fill="none"
//       />
//     </g>
//     <text
//       x="250"
//       y="430"
//       textAnchor="middle"
//       fontSize="60"
//       fontWeight="900"
//       fill="#1B4E91"
//       letterSpacing="2"
//       style={{ fontFamily: "Poppins, Montserrat, Arial, sans-serif" }}
//     >
//       INYUMBA
//     </text>
//     <text
//       x="250"
//       y="462"
//       textAnchor="middle"
//       fontSize="20"
//       fontWeight="700"
//       fill="#36B25A"
//       style={{ fontFamily: "Poppins, Arial, sans-serif" }}
//     >
//       STUDENT ACCOMMODATION
//     </text>
//     <text
//       x="250"
//       y="530"
//       textAnchor="middle"
//       fontSize="24"
//       fontWeight="800"
//       letterSpacing="5"
//       fill="#1B4E91"
//       style={{ fontFamily: "Poppins, Arial, sans-serif" }}
//     >
//       RWANDA
//     </text>
//   </motion.svg>
// );

// // Animated Background SVG
// const AnimatedBackground = () => (
//   <svg
//     className="absolute inset-0 w-full h-full"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <defs>
//       <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
//         <stop offset="0%" style={{ stopColor: "#FF385C", stopOpacity: 0.1 }} />
//         <stop
//           offset="100%"
//           style={{ stopColor: "#FF385C", stopOpacity: 0.05 }}
//         />
//       </linearGradient>
//       <radialGradient id="radial">
//         <stop offset="0%" style={{ stopColor: "#FF385C", stopOpacity: 0.15 }} />
//         <stop offset="100%" style={{ stopColor: "#FF385C", stopOpacity: 0 }} />
//       </radialGradient>
//     </defs>
//     <motion.circle
//       cx="50%"
//       cy="50%"
//       r="40%"
//       fill="url(#radial)"
//       animate={{ scale: [1, 1.2, 1] }}
//       transition={{ duration: 4, repeat: Infinity }}
//     />
//     <motion.rect
//       width="100%"
//       height="100%"
//       fill="url(#grad)"
//       animate={{ opacity: [0.5, 1, 0.5] }}
//       transition={{ duration: 3, repeat: Infinity }}
//     />
//   </svg>
// );

// // Language translations
// const translations = {
//   en: {
//     brand: "INYUMBA",
//     becomeHost: "Become a Host",
//     login: "Log in",
//     signup: "Sign up",
//     logout: "Log out",
//     profile: "Profile",
//     yourHomes: "Your homes",
//     wishlists: "Wishlists",
//     giftCards: "Gift cards",
//     helpCenter: "Help Center",
//     settings: "Settings",
//     welcomeBack: "Welcome back",
//     email: "Email address",
//     password: "Password",
//     confirmPassword: "Confirm password",
//     phoneNumber: "Phone number",
//     fullName: "Full name",
//     createAccount: "Create account",
//     alreadyHaveAccount: "Already have an account?",
//     dontHaveAccount: "Don't have an account?",
//     home: "Home",
//     experience: "Houses",
//     services: "Services",
//     about: "About",
//     testimonials: "Testimonials",
//     helpCenterTitle: "Help Center",
//     becomeHostDesc: "It's easy to start hosting and earn extra income.",
//     referHost: "Refer a Host",
//     findCoHost: "Find a co-host",
//     giftCardsTitle: "Gift cards",
//     dashboard: "Dashboard",
//     adminDashboard: "Admin Dashboard",
//     userDashboard: "My Dashboard",
//     users: "Users",
//     analytics: "Analytics",
//     bookings: "Bookings",
//     totalRevenue: "Total Revenue",
//     activeListings: "Active Listings",
//     totalUsers: "Total Users",
//     recentActivity: "Recent Activity",
//     passwordStrength: "Password strength",
//     weak: "Weak",
//     moderate: "Moderate",
//     strong: "Strong",
//     forgotPassword: "Forgot password?",
//     resetPassword: "Reset Password",
//     sendResetLink: "Send Reset Link",
//     checkEmail: "Check your email",
//     resetLinkSent: "We've sent a password reset link to your email.",
//     enterEmail:
//       "Enter your email address and we'll send you a link to reset your password.",
//     backToLogin: "Back to login",
//     resetPasswordTitle: "Reset Your Password",

//     // Hero Section
//     heroTitle: "Find Your Perfect Student Accommodation",
//     heroSubtitle:
//       "Discover safe, affordable, and comfortable housing near your university",
//     heroButton: "Explore Listings",
//     heroStudents: "Happy Students",
//     heroListings: "Available Listings",
//     heroUniversities: "Partner Universities",

//     // About Section
//     aboutTitle: "About INYUMBA",
//     aboutSubtitle: "Your Trusted Student Housing Platform",
//     aboutDesc1:
//       "INYUMBA is Rwanda's premier student accommodation platform, connecting students with quality housing near their universities.",
//     aboutDesc2:
//       "We understand the challenges of finding safe and affordable accommodation as a student. That's why we've created a platform that makes the search easy and reliable.",
//     aboutMission: "Our Mission",
//     aboutMissionText:
//       "To provide every student in Rwanda with access to safe, affordable, and comfortable accommodation that enhances their academic experience.",
//     aboutVision: "Our Vision",
//     aboutVisionText:
//       "To become Africa's leading student housing platform, transforming how students find and secure accommodation.",
//     aboutValues: "Our Values",
//     aboutValue1: "Safety First",
//     aboutValue2: "Affordability",
//     aboutValue3: "Trust & Transparency",
//     aboutValue4: "Student Success",

//     // Services Section
//     servicesTitle: "Our Services",
//     servicesSubtitle: "Comprehensive Solutions for Student Housing",
//     service1Title: "Find Accommodation",
//     service1Desc:
//       "Browse through hundreds of verified student housing options near your campus.",
//     service2Title: "List Your Property",
//     service2Desc:
//       "Hosts can list their properties and connect with students looking for accommodation.",
//     service3Title: "Verified Listings",
//     service3Desc:
//       "All properties are verified to ensure safety, quality, and fair pricing.",
//     service4Title: "Support & Guidance",
//     service4Desc:
//       "Our team is here to help you every step of the way, from search to move-in.",
//     service5Title: "Secure Payments",
//     service5Desc: "Safe and secure payment processing with full transparency.",
//     service6Title: "Community Building",
//     service6Desc:
//       "Connect with fellow students and build a community in your new home.",

//     // Testimonials Section
//     testimonialsTitle: "What Students Say",
//     testimonialsSubtitle: "Real Stories from Students Who Found Their Home",
//     testimonial1Name: "Marie Uwimana",
//     testimonial1Role: "Student at UR-CAVM",
//     testimonial1Text:
//       "INYUMBA made finding accommodation so easy! I found a great place near my university within days.",
//     testimonial2Name: "Jean Pierre Niyonzima",
//     testimonial2Role: "Student at INES-Ruhengeri",
//     testimonial2Text:
//       "The platform is user-friendly and the properties are verified. I felt safe and confident throughout the process.",
//     testimonial3Name: "Clarisse Mukamana",
//     testimonial3Role: "Student at UR-Musanze",
//     testimonial3Text:
//       "I highly recommend INYUMBA to any student looking for housing. The service is excellent and the staff are helpful.",
//   },
//   fr: {
//     brand: "INYUMBA",
//     becomeHost: "Devenir hôte",
//     login: "Se connecter",
//     signup: "S'inscrire",
//     logout: "Se déconnecter",
//     profile: "Profil",
//     yourHomes: "Vos logements",
//     wishlists: "Listes de souhaits",
//     giftCards: "Cartes cadeaux",
//     helpCenter: "Centre d'aide",
//     settings: "Paramètres",
//     welcomeBack: "Bon retour",
//     email: "Adresse e-mail",
//     password: "Mot de passe",
//     confirmPassword: "Confirmer le mot de passe",
//     phoneNumber: "Numéro de téléphone",
//     fullName: "Nom complet",
//     createAccount: "Créer un compte",
//     alreadyHaveAccount: "Vous avez déjà un compte ?",
//     dontHaveAccount: "Vous n'avez pas de compte ?",
//     home: "Accueil",
//     experience: "Maisons",
//     services: "Services",
//     about: "À propos",
//     testimonials: "Témoignages",
//     helpCenterTitle: "Centre d'aide",
//     becomeHostDesc:
//       "Il est facile de commencer à héberger et de gagner un revenu supplémentaire.",
//     referHost: "Parrainer un hôte",
//     findCoHost: "Trouver un co-hôte",
//     giftCardsTitle: "Cartes cadeaux",
//     dashboard: "Tableau de bord",
//     adminDashboard: "Tableau de bord Admin",
//     userDashboard: "Mon tableau de bord",
//     users: "Utilisateurs",
//     analytics: "Analyses",
//     bookings: "Réservations",
//     totalRevenue: "Revenu total",
//     activeListings: "Annonces actives",
//     totalUsers: "Total des utilisateurs",
//     recentActivity: "Activité récente",
//     passwordStrength: "Force du mot de passe",
//     weak: "Faible",
//     moderate: "Modéré",
//     strong: "Fort",
//     forgotPassword: "Mot de passe oublié ?",
//     resetPassword: "Réinitialiser le mot de passe",
//     sendResetLink: "Envoyer le lien",
//     checkEmail: "Vérifiez votre email",
//     resetLinkSent:
//       "Nous vous avons envoyé un lien pour réinitialiser votre mot de passe.",
//     enterEmail:
//       "Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.",
//     backToLogin: "Retour à la connexion",
//     resetPasswordTitle: "Réinitialiser votre mot de passe",

//     // Hero Section
//     heroTitle: "Trouvez Votre Logement Étudiant Parfait",
//     heroSubtitle:
//       "Découvrez un logement sûr, abordable et confortable près de votre université",
//     heroButton: "Explorer les annonces",
//     heroStudents: "Étudiants Satisfaits",
//     heroListings: "Annonces Disponibles",
//     heroUniversities: "Universités Partenaires",

//     // About Section
//     aboutTitle: "À Propos d'INYUMBA",
//     aboutSubtitle: "Votre Plateforme de Logement Étudiant de Confiance",
//     aboutDesc1:
//       "INYUMBA est la principale plateforme de logement étudiant au Rwanda, mettant en relation les étudiants avec des logements de qualité près de leurs universités.",
//     aboutDesc2:
//       "Nous comprenons les défis liés à la recherche d'un logement sûr et abordable en tant qu'étudiant. C'est pourquoi nous avons créé une plateforme qui rend la recherche facile et fiable.",
//     aboutMission: "Notre Mission",
//     aboutMissionText:
//       "Offrir à chaque étudiant au Rwanda un accès à un logement sûr, abordable et confortable qui améliore son expérience académique.",
//     aboutVision: "Notre Vision",
//     aboutVisionText:
//       "Devenir la principale plateforme de logement étudiant en Afrique, transformant la façon dont les étudiants trouvent et sécurisent leur logement.",
//     aboutValues: "Nos Valeurs",
//     aboutValue1: "Sécurité d'abord",
//     aboutValue2: "Abordabilité",
//     aboutValue3: "Confiance et Transparence",
//     aboutValue4: "Réussite Étudiante",

//     // Services Section
//     servicesTitle: "Nos Services",
//     servicesSubtitle: "Solutions Complètes pour le Logement Étudiant",
//     service1Title: "Trouver un Logement",
//     service1Desc:
//       "Parcourez des centaines d'options de logement étudiant vérifiées près de votre campus.",
//     service2Title: "Listez Votre Propriété",
//     service2Desc:
//       "Les hôtes peuvent lister leurs propriétés et se connecter avec des étudiants à la recherche d'un logement.",
//     service3Title: "Annonces Vérifiées",
//     service3Desc:
//       "Toutes les propriétés sont vérifiées pour garantir sécurité, qualité et prix équitables.",
//     service4Title: "Soutien et Orientation",
//     service4Desc:
//       "Notre équipe est là pour vous aider à chaque étape, de la recherche à l'emménagement.",
//     service5Title: "Paiements Sécurisés",
//     service5Desc:
//       "Traitement des paiements sûr et sécurisé avec une transparence totale.",
//     service6Title: "Construction Communautaire",
//     service6Desc:
//       "Connectez-vous avec d'autres étudiants et construisez une communauté dans votre nouveau foyer.",

//     // Testimonials Section
//     testimonialsTitle: "Ce que Disent les Étudiants",
//     testimonialsSubtitle:
//       "Histoires Vraies d'Étudiants Qui Ont Trouvé Leur Logement",
//     testimonial1Name: "Marie Uwimana",
//     testimonial1Role: "Étudiante à UR-CAVM",
//     testimonial1Text:
//       "INYUMBA a rendu la recherche de logement si facile ! J'ai trouvé un excellent endroit près de mon université en quelques jours.",
//     testimonial2Name: "Jean Pierre Niyonzima",
//     testimonial2Role: "Étudiant à INES-Ruhengeri",
//     testimonial2Text:
//       "La plateforme est conviviale et les propriétés sont vérifiées. Je me suis senti en sécurité et confiant tout au long du processus.",
//     testimonial3Name: "Clarisse Mukamana",
//     testimonial3Role: "Étudiante à UR-Musanze",
//     testimonial3Text:
//       "Je recommande vivement INYUMBA à tout étudiant cherchant un logement. Le service est excellent et le personnel est serviable.",
//   },
//   rw: {
//     brand: "INYUMBA",
//     becomeHost: "Kuba umwakirizi",
//     login: "Kwinjira",
//     signup: "Kwiyandikisha",
//     logout: "Gusohoka",
//     profile: "Ibyawe",
//     yourHomes: "Amazu yawe",
//     wishlists: "Urutonde rw'ibyo wifuza",
//     giftCards: "Ikarita z'impano",
//     helpCenter: "Ikigo cy'ubufasha",
//     settings: "Igenamiterere",
//     welcomeBack: "Turakwinginze",
//     email: "Aderesi ya imeri",
//     password: "Ijambo ry'ibanga",
//     confirmPassword: "Emeza ijambo ry'ibanga",
//     phoneNumber: "Numero ya telefoni",
//     fullName: "Izina ryose",
//     createAccount: "Kora konti",
//     alreadyHaveAccount: "Ufite konti?",
//     dontHaveAccount: "Nta konti ufite?",
//     home: "Ahabanza",
//     experience: "Amazu",
//     services: "Serivisi",
//     about: "Ibijyanye",
//     testimonials: "Ibyababwiye",
//     helpCenterTitle: "Ikigo cy'ubufasha",
//     becomeHostDesc: "Birakoroshye gutangira kwakira abashyitsi kandi ukungura.",
//     referHost: "Vuga abandi bakire",
//     findCoHost: "Shakisha uwakwakira n'uwundi",
//     giftCardsTitle: "Ikarita z'impano",
//     dashboard: "Ibikorwa",
//     adminDashboard: "Ibikorwa by'Ubuyobozi",
//     userDashboard: "Ibikorwa byanjye",
//     users: "Abakoresha",
//     analytics: "Ibisobanuro",
//     bookings: "Ibyanditswe",
//     totalRevenue: "Amahera yose",
//     activeListings: "Amazu akoreshwa",
//     totalUsers: "Abakoresha bose",
//     recentActivity: "Ibikorwa vuba",
//     passwordStrength: "Imbaraga z'ijambo ry'ibanga",
//     weak: "Ntacyo",
//     moderate: "Rishoboka",
//     strong: "Rikomeye",
//     forgotPassword: "Wibagiwe ijambo ry'ibanga?",
//     resetPassword: "Hindura ijambo ry'ibanga",
//     sendResetLink: "Ohereza umurongo",
//     checkEmail: "Reba imeri yawe",
//     resetLinkSent:
//       "Twohereje umurongo wo guhindura ijambo ry'ibanga kuri imeri yawe.",
//     enterEmail:
//       "Andika aderesi ya imeri yawe kandi tuzohereza umurongo wo guhindura ijambo ry'ibanga.",
//     backToLogin: "Garuka kwinjira",
//     resetPasswordTitle: "Hindura ijambo ry'ibanga",

//     // Hero Section
//     heroTitle: "Shakira Aho Uzabera Byiza",
//     heroSubtitle:
//       "Menya amazu meza, ari mu buryo buhoro kandi ari hafi ya kaminuza yawe",
//     heroButton: "Reba Amazu",
//     heroStudents: "Abanyeshuri Bunze",
//     heroListings: "Amazu Aboneka",
//     heroUniversities: "Kaminuza Zifatanya",

//     // About Section
//     aboutTitle: "Ibijyanye na INYUMBA",
//     aboutSubtitle: "Urubuga Rwizewe rw'Amazu y'Abanyeshuri",
//     aboutDesc1:
//       "INYUMBA ni urubuga rwambere mu Rwanda ruhuza abanyeshuri n'amazu meza ari hafi ya kaminuza zabo.",
//     aboutDesc2:
//       "Turumva ibibazo abanyeshuri bahura nabyo mu gushaka amazu meza kandi ari mu buryo buhoro. Ni yo mpamvu twakoze urubuga rworoshye kandi rwizewe.",
//     aboutMission: "Intego Yacu",
//     aboutMissionText:
//       "Kugeza buri mnyeshuri mu Rwanda amazu meza, ari mu buryo buhoro kandi ari ahantu heza yo guturamo agatuma amasomo ye agenda neza.",
//     aboutVision: "Icyifuzo Cyacu",
//     aboutVisionText:
//       "Kuba urubuga rwambere muri Afrika ruhuza abanyeshuri n'amazu, rikavugurura uburyo abanyeshuri babonera no gutura amazu.",
//     aboutValues: "Indangagaciro Zacu",
//     aboutValue1: "Umutekano Mbere ya Byose",
//     aboutValue2: "Ishyushya Ryoheye",
//     aboutValue3: "Ikwizera no Guhishura",
//     aboutValue4: "Intsinzi y'Umnyeshuri",

//     // Services Section
//     servicesTitle: "Serivisi Zacu",
//     servicesSubtitle: "Ibikemura Byuzuye ku Mazu y'Abanyeshuri",
//     service1Title: "Shakisha Aho Gutura",
//     service1Desc:
//       "Reba amazu menshi y' abanyeshuri yagenzuwe ari hafi ya kaminuza yawe.",
//     service2Title: "Andika Icyo Utunze",
//     service2Desc:
//       "Abatunze bashobora kwandika amazu yabo no guhuza n'abanyeshuri bashaka aho gutura.",
//     service3Title: "Amazu Yagenzuwe",
//     service3Desc:
//       "Amazu yose aragenzurwa kugira ngo habeho umutekano, ubwiza, n'ibiciro bikwiye.",
//     service4Title: "Ubufasha n'Ubuyobozi",
//     service4Desc:
//       "Itsinda ryacu rihagurukiye gufasha buri ntambwe, kuva mu gushaka no kwinjira mu nzu.",
//     service5Title: "Kwirigira Mu Mutekano",
//     service5Desc: "Kwirigira gukorwa mu mutekano kandi byihishijwe.",
//     service6Title: "Gubaka Umuryango",
//     service6Desc:
//       "Huza n'abandi banyeshuri kandi ubake umuryango mu nzu yawe nshya.",

//     // Testimonials Section
//     testimonialsTitle: "Abanyeshuri Bavuga Bati",
//     testimonialsSubtitle: "Inkuru Nyakuri z'Abanyeshuri Babonye Aho Gutura",
//     testimonial1Name: "Marie Uwimana",
//     testimonial1Role: "Umnyeshuri muri UR-CAVM",
//     testimonial1Text:
//       "INYUMBA yoroshye cyane gushaka aho gutura! Nabonye ahantu heza hafi ya kaminuza yanjye mu minsi mike.",
//     testimonial2Name: "Jean Pierre Niyonzima",
//     testimonial2Role: "Umnyeshuri muri INES-Ruhengeri",
//     testimonial2Text:
//       "Urubuga rworoshye gukoresha kandi amazu aragenzuwe. Numvise umutekano kandi nizeye mu gihe cyose.",
//     testimonial3Name: "Clarisse Mukamana",
//     testimonial3Role: "Umnyeshuri muri UR-Musanze",
//     testimonial3Text:
//       "Nsaba abanyeshuri bose bashaka aho gutura gukoresha INYUMBA. Serivisi nziza kandi abakozi barafasha.",
//   },
// };

// type Language = "en" | "fr" | "rw";

// // Helper function to get language from cookies
// const getLanguageFromCookies = (): Language => {
//   const lang = Cookies.get("language") as Language;
//   return lang || "en";
// };

// // Helper function to get translations based on cookie language
// export const getTranslations = () => {
//   const lang = getLanguageFromCookies();
//   return translations[lang];
// };

// // Export translations and types for other components
// export type { Language };
// export { translations };

// // Navigation links object
// const navLinks = [
//   { id: "home", path: "/", label: "home" },
//   { id: "experience", path: "/house/rent", label: "experience" },
//   { id: "services", path: "/services", label: "services" },
//   { id: "testimonials", path: "/testimonials", label: "testimonials" },
//   { id: "about", path: "/about", label: "about" },
// ];

// // Success/Fail Modal Component
// interface StatusModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   type: "success" | "error" | "info";
//   title: string;
//   message: string;
//   details?: string;
// }

// const StatusModal: React.FC<StatusModalProps> = ({
//   isOpen,
//   onClose,
//   type,
//   title,
//   message,
//   details,
// }) => {
//   const getIcon = () => {
//     switch (type) {
//       case "success":
//         return (
//           <CheckCircleOutlineRounded className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-green-500" />
//         );
//       case "error":
//         return (
//           <ErrorOutlineOutlined className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-red-500" />
//         );
//       case "info":
//         return (
//           <InfoIcon className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-blue-500" />
//         );
//     }
//   };

//   const getColors = () => {
//     switch (type) {
//       case "success":
//         return {
//           bg: "bg-green-50",
//           border: "border-green-200",
//           text: "text-green-800",
//           button: "bg-green-500 hover:bg-green-600",
//         };
//       case "error":
//         return {
//           bg: "bg-red-50",
//           border: "border-red-200",
//           text: "text-red-800",
//           button: "bg-red-500 hover:bg-red-600",
//         };
//       case "info":
//         return {
//           bg: "bg-blue-50",
//           border: "border-blue-200",
//           text: "text-blue-800",
//           button: "bg-blue-500 hover:bg-blue-600",
//         };
//     }
//   };

//   const colors = getColors();

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

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             variants={overlayVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
//             onClick={onClose}
//           />
//           <motion.div
//             variants={modalVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
//             className="fixed inset-0 z-[201] flex items-center justify-center p-3 sm:p-4"
//           >
//             <div
//               className={`w-full max-w-xs sm:max-w-sm md:max-w-md rounded-2xl shadow-2xl border ${colors.border} ${colors.bg} relative overflow-hidden`}
//             >
//               <AnimatedBackground />
//               <div className="relative z-10 p-4 sm:p-5 md:p-6">
//                 <div className="flex flex-col items-center text-center">
//                   {/* Icon */}
//                   <motion.div
//                     initial={{ scale: 0, rotate: -180 }}
//                     animate={{ scale: 1, rotate: 0 }}
//                     transition={{ duration: 0.5, type: "spring" }}
//                     className="mb-3 sm:mb-4"
//                   >
//                     {getIcon()}
//                   </motion.div>

//                   {/* Title */}
//                   <motion.h3
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.1 }}
//                     className={`text-lg sm:text-xl md:text-2xl font-bold ${colors.text} mb-1 sm:mb-2`}
//                   >
//                     {title}
//                   </motion.h3>

//                   {/* Message */}
//                   <motion.p
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2 }}
//                     className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4"
//                   >
//                     {message}
//                   </motion.p>

//                   {/* Details */}
//                   {details && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.3 }}
//                       className="bg-white/50 rounded-lg p-2 sm:p-3 mb-3 sm:mb-4 w-full text-xs sm:text-sm text-gray-600"
//                     >
//                       {details}
//                     </motion.div>
//                   )}

//                   {/* Button */}
//                   <motion.button
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.4 }}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={onClose}
//                     className={`px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-lg text-white font-medium transition-all ${colors.button} shadow-lg text-xs sm:text-sm`}
//                   >
//                     Got it
//                   </motion.button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// // Forget Password Modal Component
// interface ForgetPasswordModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onBackToLogin: () => void;
// }

// const ForgetPasswordModal: React.FC<ForgetPasswordModalProps> = ({
//   isOpen,
//   onClose,
//   onBackToLogin,
// }) => {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [emailSent, setEmailSent] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
//   const t = getTranslations();

//   const validateEmail = (email: string): boolean => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleEmailChange = (value: string) => {
//     setEmail(value);
//     if (value.length > 0) {
//       setIsEmailValid(validateEmail(value));
//     } else {
//       setIsEmailValid(null);
//     }
//     setError(null);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!email || !validateEmail(email)) {
//       setError("Please enter a valid email address");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await API.post("/auth/forgot-password", { email });

//       if (response.data.success) {
//         setEmailSent(true);
//         setError(null);
//       } else {
//         setError(response.data.message || "Failed to send reset link");
//       }
//     } catch (err: any) {
//       setError(
//         err.response?.data?.message || "An error occurred. Please try again.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     setEmail("");
//     setEmailSent(false);
//     setError(null);
//     setIsEmailValid(null);
//     onClose();
//   };

//   const handleBackToLogin = () => {
//     setEmail("");
//     setEmailSent(false);
//     setError(null);
//     setIsEmailValid(null);
//     onBackToLogin();
//   };

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

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             variants={overlayVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]"
//             onClick={handleClose}
//           />
//           <motion.div
//             variants={modalVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
//             className="fixed inset-0 z-[151] flex items-center justify-center p-3 sm:p-4"
//           >
//             <div className="w-full max-w-xs sm:max-w-sm md:max-w-md max-h-[90vh] rounded-2xl shadow-2xl bg-white relative overflow-hidden">
//               <AnimatedBackground />
//               <div className="sticky top-0 px-4 sm:px-5 md:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl relative z-10">
//                 <div className="flex items-center gap-1.5 sm:gap-2">
//                   <LockIcon className="text-[#FF385C] w-4 h-4 sm:w-5 sm:h-5" />
//                   <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
//                     {t.resetPasswordTitle}
//                   </h2>
//                 </div>
//                 <motion.button
//                   whileHover={{ rotate: 90, scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={handleClose}
//                   className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
//                 >
//                   <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
//                 </motion.button>
//               </div>

//               <div className="p-4 sm:p-5 md:p-6 relative z-10">
//                 {!emailSent ? (
//                   <form onSubmit={handleSubmit}>
//                     <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
//                       {t.enterEmail}
//                     </p>

//                     <div className="mb-4 sm:mb-5 md:mb-6">
//                       <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 text-gray-700">
//                         {t.email}
//                       </label>
//                       <div
//                         className={`relative rounded-lg border ${
//                           isEmailValid === true
//                             ? "border-green-500"
//                             : isEmailValid === false
//                               ? "border-red-500"
//                               : "border-gray-300"
//                         } bg-white focus-within:border-[#FF385C] transition-colors duration-300`}
//                       >
//                         <EmailIcon
//                           className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 ${
//                             isEmailValid === true
//                               ? "text-green-500"
//                               : isEmailValid === false
//                                 ? "text-red-500"
//                                 : "text-gray-400"
//                           }`}
//                         />
//                         <input
//                           type="email"
//                           required
//                           value={email}
//                           onChange={(e) => handleEmailChange(e.target.value)}
//                           className="w-full pl-9 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-2.5 rounded-lg outline-none text-xs sm:text-sm bg-white text-gray-900 placeholder-gray-400"
//                           placeholder="you@example.com"
//                           disabled={loading}
//                         />
//                         {isEmailValid === true && (
//                           <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
//                         )}
//                         {isEmailValid === false && (
//                           <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
//                         )}
//                       </div>
//                       {error && (
//                         <p className="text-xs text-red-500 mt-1">{error}</p>
//                       )}
//                       {isEmailValid === true && (
//                         <p className="text-xs text-green-500 mt-1">
//                           ✓ Valid email address
//                         </p>
//                       )}
//                     </div>

//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       type="submit"
//                       disabled={loading || !isEmailValid}
//                       className={`w-full py-2.5 sm:py-3 rounded-lg font-medium relative overflow-hidden transition-colors text-xs sm:text-sm ${
//                         loading || !isEmailValid
//                           ? "bg-gray-400 cursor-not-allowed"
//                           : "bg-[#FF385C] hover:bg-[#E31C5F]"
//                       } text-white`}
//                     >
//                       <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
//                         {loading ? (
//                           <>
//                             <svg
//                               className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white"
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                             >
//                               <circle
//                                 className="opacity-25"
//                                 cx="12"
//                                 cy="12"
//                                 r="10"
//                                 stroke="currentColor"
//                                 strokeWidth="4"
//                               ></circle>
//                               <path
//                                 className="opacity-75"
//                                 fill="currentColor"
//                                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                               ></path>
//                             </svg>
//                             Sending...
//                           </>
//                         ) : (
//                           <>
//                             <EmailIcon className="w-4 h-4 sm:w-5 sm:h-5" />
//                             {t.sendResetLink}
//                           </>
//                         )}
//                       </span>
//                     </motion.button>

//                     <button
//                       type="button"
//                       onClick={handleBackToLogin}
//                       className="w-full text-center text-xs sm:text-sm mt-3 sm:mt-4 text-gray-500 hover:text-[#FF385C] transition-colors"
//                     >
//                       ← {t.backToLogin}
//                     </button>
//                   </form>
//                 ) : (
//                   <div className="text-center py-3 sm:py-4">
//                     <motion.div
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       transition={{ duration: 0.5, type: "spring" }}
//                     >
//                       <CheckCircleOutlineRounded className="w-16 h-16 sm:w-20 sm:h-20 text-green-500 mx-auto mb-3 sm:mb-4" />
//                     </motion.div>
//                     <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
//                       {t.checkEmail}
//                     </h3>
//                     <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
//                       {t.resetLinkSent}
//                     </p>
//                     <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 break-all">
//                       {email}
//                     </p>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handleBackToLogin}
//                       className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-lg bg-[#FF385C] text-white font-medium hover:bg-[#E31C5F] transition-colors text-xs sm:text-sm"
//                     >
//                       {t.backToLogin}
//                     </motion.button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export const Navbar = () => {
//   const [isLoginOpen, setIsLoginOpen] = useState(false);
//   const [isRegisterOpen, setIsRegisterOpen] = useState(false);
//   const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
//   const [isDashboardOpen, setIsDashboardOpen] = useState(false);
//   const [isUserModalOpen, setIsUserModalOpen] = useState(false);
//   const [isForgetPasswordOpen, setIsForgetPasswordOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userName, setUserName] = useState("Guest");
//   const [userEmail, setUserEmail] = useState("");
//   const [userRole, setUserRole] = useState("user");
//   const [, setUserId] = useState("");
//   const [userPhone, setUserPhone] = useState("");
//   const [userCreatedAt, setUserCreatedAt] = useState("");
//   const [, setUserData] = useState<any>(null);

//   // Status Modal state
//   const [statusModal, setStatusModal] = useState<{
//     isOpen: boolean;
//     type: "success" | "error" | "info";
//     title: string;
//     message: string;
//     details?: string;
//   }>({
//     isOpen: false,
//     type: "success",
//     title: "",
//     message: "",
//     details: "",
//   });

//   // Initialize language from cookies
//   const [language, setLanguage] = useState<Language>(() => {
//     return getLanguageFromCookies();
//   });

//   // Login form state
//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");
//   const [loginLoading, setLoginLoading] = useState(false);
//   const [loginErrors, setLoginErrors] = useState<{
//     email?: string;
//     password?: string;
//   }>({});

//   // Register form state
//   const [registerEmail, setRegisterEmail] = useState("");
//   const [registerPassword, setRegisterPassword] = useState("");
//   const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
//   const [registerName, setRegisterName] = useState("");
//   const [registerPhone, setRegisterPhone] = useState("");
//   const [registerLoading, setRegisterLoading] = useState(false);
//   const [registerErrors, setRegisterErrors] = useState<{
//     name?: string;
//     email?: string;
//     phone?: string;
//     password?: string;
//     confirmPassword?: string;
//   }>({});
//   const [passwordStrength, setPasswordStrength] = useState<
//     "weak" | "moderate" | "strong" | null
//   >(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // Email validation state for both forms
//   const [isLoginEmailValid, setIsLoginEmailValid] = useState<boolean | null>(
//     null,
//   );
//   const [isRegisterEmailValid, setIsRegisterEmailValid] = useState<
//     boolean | null
//   >(null);
//   const [isPhoneValid, setIsPhoneValid] = useState<boolean | null>(null);

//   const languageMenuRef = useRef<HTMLDivElement>(null);

//   // Get translation based on language from cookies
//   const t = translations[language];

//   const location = useLocation();

//   // Navigation handler - forces full page refresh
//   const navigateTo = (path: string) => {
//     if (location.pathname !== path) {
//       window.location.href = path;
//     }
//   };

//   // Add these refs inside the Navbar component
//   const scrollContainerRef = useRef<HTMLDivElement>(null);
//   const fieldRefs = {
//     name: useRef<HTMLDivElement>(null),
//     email: useRef<HTMLDivElement>(null),
//     phone: useRef<HTMLDivElement>(null),
//     password: useRef<HTMLDivElement>(null),
//     confirmPassword: useRef<HTMLDivElement>(null),
//   };
//   const fieldKeys = ["name", "email", "phone", "password", "confirmPassword"];
//   const [currentFieldIndex, setCurrentFieldIndex] = useState(0);

//   // Add these navigation functions inside the Navbar component
//   const scrollToTop = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   const scrollToNextField = () => {
//     const nextIndex = (currentFieldIndex + 1) % fieldKeys.length;
//     setCurrentFieldIndex(nextIndex);
//     const targetRef = fieldRefs[fieldKeys[nextIndex] as keyof typeof fieldRefs];
//     if (targetRef?.current) {
//       targetRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
//     }
//   };

//   // Handle click outside menus
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         languageMenuRef.current &&
//         !languageMenuRef.current.contains(event.target as Node)
//       ) {
//         setIsLanguageMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Handle escape key
//   useEffect(() => {
//     const handleEscape = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         setIsLoginOpen(false);
//         setIsRegisterOpen(false);
//         setIsLanguageMenuOpen(false);
//         setIsDashboardOpen(false);
//         setIsUserModalOpen(false);
//         setIsForgetPasswordOpen(false);
//         setStatusModal((prev) => ({ ...prev, isOpen: false }));
//       }
//     };
//     document.addEventListener("keydown", handleEscape);
//     return () => document.removeEventListener("keydown", handleEscape);
//   }, []);

//   // Check for existing session and fetch full user data
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const user = localStorage.getItem("user");
//     if (token && user) {
//       try {
//         const userData = JSON.parse(user);
//         setIsLoggedIn(true);
//         setUserName(userData.name || "User");
//         setUserEmail(userData.email || "");
//         setUserRole(userData.role || "user");
//         setUserId(userData.id || userData._id || "");
//         setUserPhone(userData.phone || "");
//         setUserCreatedAt(userData.createdAt || userData.created_at || "");
//         setUserData(userData);

//         // Fetch full user data from API if needed
//         fetchUserData(userData.id || userData._id);
//       } catch (error) {
//         console.error("Error parsing user data:", error);
//       }
//     }
//   }, []);

//   // Fetch full user data from API
//   const fetchUserData = async (id: string) => {
//     try {
//       const response = await API.get(`/auth/${id}`);
//       if (response.data.success && response.data.user) {
//         const fullUserData = response.data.user;
//         setUserData(fullUserData);
//         setUserName(fullUserData.name || userName);
//         setUserEmail(fullUserData.email || userEmail);
//         setUserRole(fullUserData.role || userRole);
//         setUserPhone(fullUserData.phone || "");
//         setUserCreatedAt(
//           fullUserData.createdAt || fullUserData.created_at || "",
//         );
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   // Listen for cookie changes (for other tabs/windows)
//   useEffect(() => {
//     const handleCookieChange = () => {
//       const newLang = getLanguageFromCookies();
//       if (newLang !== language) {
//         setLanguage(newLang);
//       }
//     };

//     // Check for cookie changes every second (polling)
//     const interval = setInterval(handleCookieChange, 1000);
//     return () => clearInterval(interval);
//   }, [language]);

//   // Validate email format
//   const validateEmail = (email: string): boolean => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   // Validate phone number (Rwandan format)
//   const validatePhone = (phone: string): boolean => {
//     const phoneRegex = /^(?:\+250|0)?[7-9][0-9]{8}$/;
//     return phoneRegex.test(phone.replace(/\s/g, ""));
//   };

//   // Check password strength
//   const checkPasswordStrength = (
//     password: string,
//   ): "weak" | "moderate" | "strong" | null => {
//     if (!password || password.length === 0) return null;
//     let score = 0;
//     if (password.length >= 8) score++;
//     if (password.length >= 12) score++;
//     if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
//     if (/\d/.test(password)) score++;
//     if (/[^a-zA-Z0-9]/.test(password)) score++;
//     if (score <= 2) return "weak";
//     if (score <= 4) return "moderate";
//     return "strong";
//   };

//   // Get password strength color
//   const getPasswordStrengthColor = (
//     strength: "weak" | "moderate" | "strong" | null,
//   ): string => {
//     if (!strength) return "#e5e7eb";
//     switch (strength) {
//       case "weak":
//         return "#ef4444";
//       case "moderate":
//         return "#f59e0b";
//       case "strong":
//         return "#22c55e";
//     }
//   };

//   // Get password strength label
//   const getPasswordStrengthLabel = (
//     strength: "weak" | "moderate" | "strong" | null,
//   ): string => {
//     if (!strength) return "";
//     switch (strength) {
//       case "weak":
//         return t.weak;
//       case "moderate":
//         return t.moderate;
//       case "strong":
//         return t.strong;
//     }
//   };

//   // Get password strength icon
//   const getPasswordStrengthIcon = (
//     strength: "weak" | "moderate" | "strong" | null,
//   ) => {
//     if (!strength) return null;
//     switch (strength) {
//       case "weak":
//         return (
//           <WarningIcon
//             className="w-3.5 h-3.5 sm:w-4 sm:h-4"
//             style={{ color: "#ef4444" }}
//           />
//         );
//       case "moderate":
//         return (
//           <SecurityIcon
//             className="w-3.5 h-3.5 sm:w-4 sm:h-4"
//             style={{ color: "#f59e0b" }}
//           />
//         );
//       case "strong":
//         return (
//           <VerifiedIcon
//             className="w-3.5 h-3.5 sm:w-4 sm:h-4"
//             style={{ color: "#22c55e" }}
//           />
//         );
//     }
//   };

//   // Validate login form
//   const validateLoginForm = (): boolean => {
//     const errors: { email?: string; password?: string } = {};
//     if (!loginEmail) {
//       errors.email = "Email is required";
//     } else if (!validateEmail(loginEmail)) {
//       errors.email = "Please enter a valid email address";
//     }
//     if (!loginPassword) {
//       errors.password = "Password is required";
//     } else if (loginPassword.length < 6) {
//       errors.password = "Password must be at least 6 characters";
//     }
//     setLoginErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   // Validate register form
//   const validateRegisterForm = (): boolean => {
//     const errors: {
//       name?: string;
//       email?: string;
//       phone?: string;
//       password?: string;
//       confirmPassword?: string;
//     } = {};
//     if (!registerName) {
//       errors.name = "Full name is required";
//     } else if (registerName.length < 2) {
//       errors.name = "Name must be at least 2 characters";
//     }
//     if (!registerEmail) {
//       errors.email = "Email is required";
//     } else if (!validateEmail(registerEmail)) {
//       errors.email = "Please enter a valid email address";
//     }
//     if (!registerPhone) {
//       errors.phone = "Phone number is required";
//     } else if (!validatePhone(registerPhone)) {
//       errors.phone =
//         "Please enter a valid Rwandan phone number (ex: 0788123456 or +250788123456)";
//     }
//     if (!registerPassword) {
//       errors.password = "Password is required";
//     } else if (registerPassword.length < 6) {
//       errors.password = "Password must be at least 6 characters";
//     }
//     if (!registerConfirmPassword) {
//       errors.confirmPassword = "Please confirm your password";
//     } else if (registerPassword !== registerConfirmPassword) {
//       errors.confirmPassword = "Passwords do not match";
//     }
//     setRegisterErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   // Check if register form is valid
//   const isRegisterFormValid = (): boolean => {
//     return (
//       registerName.length >= 2 &&
//       registerEmail.length > 0 &&
//       validateEmail(registerEmail) &&
//       registerPhone.length > 0 &&
//       validatePhone(registerPhone) &&
//       registerPassword.length >= 6 &&
//       registerConfirmPassword.length >= 6 &&
//       registerPassword === registerConfirmPassword &&
//       passwordStrength !== null &&
//       passwordStrength !== "weak"
//     );
//   };

//   // Check if login form is valid
//   const isLoginFormValid = (): boolean => {
//     return (
//       loginEmail.length > 0 &&
//       validateEmail(loginEmail) &&
//       loginPassword.length >= 6
//     );
//   };

//   // Handle Dashboard navigation based on role
//   const handleDashboardNavigation = () => {
//     if (userRole === "admin") {
//       navigateTo("/dashboard");
//     } else if (userRole === "host") {
//       navigateTo("/host/dashboard");
//     } else if (userRole === "manager") {
//       navigateTo("/manager/dashboard");
//     } else {
//       navigateTo("/user/dashboard");
//     }
//   };

//   // Handle Login with API
//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateLoginForm()) return;
//     setLoginLoading(true);
//     try {
//       const response = await API.post("/auth/login", {
//         email: loginEmail,
//         password: loginPassword,
//       });

//       if (response.data.success) {
//         const { user, token } = response.data;

//         setIsLoggedIn(true);
//         setUserName(user.name || "User");
//         setUserEmail(user.email || "");
//         setUserRole(user.role || "user");
//         setUserId(user.id || user._id || "");
//         setUserPhone(user.phone || "");
//         setUserCreatedAt(user.createdAt || user.created_at || "");
//         setUserData(user);
//         setIsLoginOpen(false);

//         localStorage.setItem("token", token);
//         localStorage.setItem("user", JSON.stringify(user));

//         setLoginEmail("");
//         setLoginPassword("");
//         setLoginErrors({});

//         setStatusModal({
//           isOpen: true,
//           type: "success",
//           title: `🎉 Welcome ${user.name}!`,
//           message: "You have successfully logged in.",
//           details: `Email: ${user.email}`,
//         });

//         // Navigate based on role with full refresh
//         setTimeout(() => {
//           if (user.role === "admin") {
//             window.location.href = "/dashboard";
//           } else if (user.role === "host") {
//             window.location.href = "/host/dashboard";
//           } else if (user.role === "manager") {
//             window.location.href = "/manager/dashboard";
//           } else {
//             window.location.href = "/user/dashboard";
//           }
//         }, 100);
//       } else {
//         setStatusModal({
//           isOpen: true,
//           type: "error",
//           title: "❌ Login Failed",
//           message: response.data.message || "Invalid email or password",
//           details: "Please check your credentials and try again.",
//         });
//       }
//     } catch (error: any) {
//       const errorMessage =
//         error.response?.data?.message || "Login failed. Please try again.";
//       setStatusModal({
//         isOpen: true,
//         type: "error",
//         title: "❌ Login Error",
//         message: errorMessage,
//         details: "Please try again or contact support if the issue persists.",
//       });
//       console.error("Login error:", error);
//     } finally {
//       setLoginLoading(false);
//     }
//   };

//   // Handle Register with API - includes confirmPassword
//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateRegisterForm()) return;
//     if (passwordStrength === "weak") {
//       setStatusModal({
//         isOpen: true,
//         type: "error",
//         title: "⚠️ Weak Password",
//         message: "Please choose a stronger password for better security.",
//         details:
//           "Your password must be at least 8 characters with uppercase, lowercase, numbers, and special characters.",
//       });
//       return;
//     }
//     setRegisterLoading(true);
//     try {
//       const response = await API.post("/auth/register", {
//         name: registerName,
//         email: registerEmail,
//         phone: registerPhone,
//         password: registerPassword,
//         confirmPassword: registerConfirmPassword,
//       });

//       if (response.data.success) {
//         setStatusModal({
//           isOpen: true,
//           type: "success",
//           title: "🎊 Account Created!",
//           message: "Your account has been created successfully.",
//           details: `Welcome, ${registerName}! Please login to continue.`,
//         });

//         setIsRegisterOpen(false);
//         setRegisterName("");
//         setRegisterEmail("");
//         setRegisterPhone("");
//         setRegisterPassword("");
//         setRegisterConfirmPassword("");
//         setRegisterErrors({});
//         setPasswordStrength(null);

//         // Open login modal after a short delay
//         setTimeout(() => {
//           setIsLoginOpen(true);
//         }, 500);
//       } else {
//         setStatusModal({
//           isOpen: true,
//           type: "error",
//           title: "❌ Registration Failed",
//           message: response.data.message || "Registration failed",
//           details: "Please check your information and try again.",
//         });
//       }
//     } catch (error: any) {
//       const errorMessage =
//         error.response?.data?.message ||
//         "Registration failed. Please try again.";
//       setStatusModal({
//         isOpen: true,
//         type: "error",
//         title: "❌ Registration Failed",
//         message: errorMessage,
//         details: "Please check your information and try again.",
//       });
//       console.error("Register error:", error);
//     } finally {
//       setRegisterLoading(false);
//     }
//   };

//   // Handle Logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setIsLoggedIn(false);
//     setUserName("Guest");
//     setUserEmail("");
//     setUserRole("user");
//     setUserId("");
//     setUserPhone("");
//     setUserCreatedAt("");
//     setUserData(null);

//     setStatusModal({
//       isOpen: true,
//       type: "info",
//       title: "👋 Logged Out",
//       message: "You have been logged out successfully.",
//       details: "See you again soon!",
//     });

//     window.location.href = "/";
//   };

//   // Language changer function
//   const handleLanguageChange = (lang: Language) => {
//     Cookies.set("language", lang, { expires: 365, path: "/" });
//     setLanguage(lang);
//     setIsLanguageMenuOpen(false);

//     const langName =
//       lang === "en" ? "English" : lang === "fr" ? "Français" : "Kinyarwanda";

//     setStatusModal({
//       isOpen: true,
//       type: "info",
//       title: "🌍 Language Changed",
//       message: `Language changed to ${langName}`,
//       details: "The page will refresh to apply the new language.",
//     });

//     setTimeout(() => {
//       window.location.reload();
//     }, 1500);
//   };

//   // Handle email validation for login
//   const handleLoginEmailChange = (email: string) => {
//     setLoginEmail(email);
//     if (email.length > 0) {
//       setIsLoginEmailValid(validateEmail(email));
//     } else {
//       setIsLoginEmailValid(null);
//     }
//     if (loginErrors.email) {
//       setLoginErrors({ ...loginErrors, email: undefined });
//     }
//   };

//   // Handle email validation for register
//   const handleRegisterEmailChange = (email: string) => {
//     setRegisterEmail(email);
//     if (email.length > 0) {
//       setIsRegisterEmailValid(validateEmail(email));
//     } else {
//       setIsRegisterEmailValid(null);
//     }
//     if (registerErrors.email) {
//       setRegisterErrors({ ...registerErrors, email: undefined });
//     }
//   };

//   // Handle phone validation
//   const handlePhoneChange = (phone: string) => {
//     setRegisterPhone(phone);
//     if (phone.length > 0) {
//       setIsPhoneValid(validatePhone(phone));
//     } else {
//       setIsPhoneValid(null);
//     }
//     if (registerErrors.phone) {
//       setRegisterErrors({ ...registerErrors, phone: undefined });
//     }
//   };

//   // Handle password change with strength check
//   const handlePasswordChange = (password: string) => {
//     setRegisterPassword(password);
//     const strength = checkPasswordStrength(password);
//     setPasswordStrength(strength);
//     if (registerErrors.password) {
//       setRegisterErrors({ ...registerErrors, password: undefined });
//     }
//     if (registerConfirmPassword && password !== registerConfirmPassword) {
//       setRegisterErrors({
//         ...registerErrors,
//         confirmPassword: "Passwords do not match",
//       });
//     } else if (
//       registerConfirmPassword &&
//       password === registerConfirmPassword
//     ) {
//       setRegisterErrors({ ...registerErrors, confirmPassword: undefined });
//     }
//   };

//   // Handle confirm password change
//   const handleConfirmPasswordChange = (confirmPassword: string) => {
//     setRegisterConfirmPassword(confirmPassword);
//     if (registerPassword && registerPassword !== confirmPassword) {
//       setRegisterErrors({
//         ...registerErrors,
//         confirmPassword: "Passwords do not match",
//       });
//     } else if (registerPassword && registerPassword === confirmPassword) {
//       setRegisterErrors({ ...registerErrors, confirmPassword: undefined });
//     }
//   };

//   // Dashboard data (static for UI, can be replaced with API data)
//   const dashboardStats = [
//     {
//       label: t.totalRevenue,
//       value: "RWF 2,450,000",
//       icon: <TrendingUpIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />,
//       change: "+23%",
//     },
//     {
//       label: t.activeListings,
//       value: "156",
//       icon: <HotelIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />,
//       change: "+12",
//     },
//     {
//       label: "Total Students",
//       value: "3,847",
//       icon: <PeopleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />,
//       change: "+18%",
//     },
//     {
//       label: t.bookings,
//       value: "2,134",
//       icon: (
//         <CalendarTodayIcon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
//       ),
//       change: "+31%",
//     },
//   ];

//   const recentActivities = [
//     {
//       user: "Student from INES-Ruhengeri",
//       action: "Booked a room in Muhoza",
//       time: "5 min ago",
//       icon: <StarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500" />,
//     },
//     {
//       user: "Host in Cyabararika",
//       action: "Listed a new house for students",
//       time: "23 min ago",
//       icon: <HotelIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />,
//     },
//     {
//       user: "Student from UR-CAVM",
//       action: "Left a 5-star review",
//       time: "1 hour ago",
//       icon: <StarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500" />,
//     },
//     {
//       user: "Host in Kigombe",
//       action: "Updated house details and price",
//       time: "3 hours ago",
//       icon: (
//         <SettingsIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
//       ),
//     },
//   ];

//   // Animation variants
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

//   const menuVariants = {
//     hidden: { opacity: 0, y: -10, scale: 0.95 },
//     visible: { opacity: 1, y: 0, scale: 1 },
//     exit: { opacity: 0, y: -10, scale: 0.95 },
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//     hover: { scale: 1.03, transition: { duration: 0.2 } },
//   };

//   // Get dashboard label based on role
//   const getDashboardLabel = () => {
//     if (userRole === "admin") return t.adminDashboard;
//     else if (userRole === "host") return t.dashboard;
//     else if (userRole === "manager") return "Dashboard";
//     else return t.userDashboard;
//   };

//   // Get dashboard icon based on role
//   const getDashboardIcon = () => {
//     if (userRole === "admin")
//       return <AdminPanelSettingsIcon className="w-4 h-4" />;
//     else if (userRole === "host") return <HotelIcon className="w-4 h-4" />;
//     else if (userRole === "manager")
//       return <DashboardIcon className="w-4 h-4" />;
//     else return <DashboardIcon className="w-4 h-4" />;
//   };

//   // Format date
//   const formatDate = (dateString: string) => {
//     if (!dateString) return "N/A";
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       });
//     } catch {
//       return dateString;
//     }
//   };

//   return (
//     <>
//       {/* Status Modal */}
//       <StatusModal
//         isOpen={statusModal.isOpen}
//         onClose={() => setStatusModal((prev) => ({ ...prev, isOpen: false }))}
//         type={statusModal.type}
//         title={statusModal.title}
//         message={statusModal.message}
//         details={statusModal.details}
//       />

//       {/* Forget Password Modal */}
//       <ForgetPasswordModal
//         isOpen={isForgetPasswordOpen}
//         onClose={() => setIsForgetPasswordOpen(false)}
//         onBackToLogin={() => {
//           setIsForgetPasswordOpen(false);
//           setIsLoginOpen(true);
//         }}
//       />

//       {/* Navbar */}
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
//         className="sticky top-0 z-50 border-b bg-white border-gray-200 shadow-sm"
//       >
//         <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-14 sm:h-16 md:h-18 lg:h-20">
//             {/* Logo - Left */}
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2 cursor-pointer"
//               onClick={() => navigateTo("/")}
//             >
//               <div className="text-[#FF385C]">
//                 <InyumbaLogo className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />
//               </div>
//               <span className="font-bold text-[#1B4E91] tracking-tight hidden xs:inline text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
//                 INYUMBA
//               </span>
//               <span className="font-bold text-[#1B4E91] tracking-tight xs:hidden text-sm">
//                 INYUMBA
//               </span>
//             </motion.div>

//             {/* Main Navigation - Desktop */}
//             <div className="hidden lg:flex items-center gap-1 xl:gap-2">
//               {navLinks.map((link) => (
//                 <motion.div
//                   key={link.id}
//                   whileHover={{ y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <button
//                     onClick={() => navigateTo(link.path)}
//                     className="px-3 xl:px-4 py-1.5 xl:py-2 rounded-full text-xs xl:text-sm font-medium transition-colors text-gray-700 hover:bg-gray-100 hover:text-[#FF385C]"
//                   >
//                     {t[link.label as keyof typeof t]}
//                   </button>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Mobile Navigation Menu Toggle */}
//             <div className="flex lg:hidden items-center">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => {
//                   const mobileMenu = document.getElementById("mobile-nav-menu");
//                   if (mobileMenu) {
//                     mobileMenu.classList.toggle("hidden");
//                   }
//                 }}
//                 className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 text-gray-700"
//               >
//                 <svg
//                   className="w-5 h-5 sm:w-6 sm:h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//               </motion.button>
//             </div>

//             {/* Right Section */}
//             <div className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 xl:gap-3 flex-shrink-0">
//               {/* Language Menu */}
//               <div className="relative" ref={languageMenuRef}>
//                 <motion.button
//                   whileHover={{ scale: 1.1, rotate: 10 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
//                   className="p-1.5 sm:p-2 rounded-full transition-colors hover:bg-gray-100 text-gray-700"
//                 >
//                   <LanguageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
//                 </motion.button>

//                 <AnimatePresence>
//                   {isLanguageMenuOpen && (
//                     <motion.div
//                       variants={menuVariants}
//                       initial="hidden"
//                       animate="visible"
//                       exit="exit"
//                       transition={{ duration: 0.2 }}
//                       className="absolute right-0 mt-1 sm:mt-2 w-40 sm:w-44 md:w-48 rounded-xl shadow-lg border bg-white border-gray-100 py-1.5 sm:py-2"
//                     >
//                       {["en", "fr", "rw"].map((lang) => (
//                         <button
//                           key={lang}
//                           onClick={() => handleLanguageChange(lang as Language)}
//                           className={`w-full text-left px-3 sm:px-4 py-1.5 sm:py-2.5 text-xs sm:text-sm flex items-center gap-2 sm:gap-3 transition-colors ${
//                             language === lang
//                               ? "text-[#FF385C] font-semibold"
//                               : "text-gray-700 hover:bg-gray-50"
//                           }`}
//                         >
//                           <span className="text-base sm:text-lg">
//                             {lang === "en" ? "🇬🇧" : lang === "fr" ? "🇫🇷" : "🇷🇼"}
//                           </span>
//                           <span className="truncate">
//                             {lang === "en"
//                               ? "English"
//                               : lang === "fr"
//                                 ? "Français"
//                                 : "Kinyarwanda"}
//                           </span>
//                           {language === lang && (
//                             <CheckCircleIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-auto flex-shrink-0" />
//                           )}
//                         </button>
//                       ))}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               {/* User Avatar / Login / Register Buttons */}
//               {isLoggedIn ? (
//                 <>
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => setIsUserModalOpen(true)}
//                     className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#FF385C]/10 hover:bg-[#FF385C]/20 transition-colors"
//                   >
//                     <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-[#FF385C] text-white flex items-center justify-center text-xs sm:text-sm font-semibold">
//                       {userName.charAt(0).toUpperCase()}
//                     </div>
//                     <span className="hidden xs:inline text-xs sm:text-sm font-medium text-gray-700 max-w-[60px] sm:max-w-[80px] truncate">
//                       {userName}
//                     </span>
//                   </motion.button>

//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="hidden md:block text-xs sm:text-sm font-medium px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full transition-all text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 whitespace-nowrap"
//                     onClick={handleDashboardNavigation}
//                   >
//                     {getDashboardIcon()}
//                     <span className="ml-1 hidden lg:inline">
//                       {getDashboardLabel()}
//                     </span>
//                   </motion.button>

//                   <motion.button
//                     whileHover={{
//                       scale: 1.05,
//                       backgroundColor: "#dc2626",
//                       color: "white",
//                     }}
//                     whileTap={{ scale: 0.95 }}
//                     className="hidden sm:block text-xs sm:text-sm font-medium px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full transition-all text-gray-700 hover:bg-red-600 hover:text-white border border-gray-200 hover:border-red-600 whitespace-nowrap"
//                     onClick={handleLogout}
//                   >
//                     <LogoutIcon className="w-3 h-3 inline mr-0.5 sm:mr-1" />
//                     <span className="hidden md:inline">{t.logout}</span>
//                     <span className="md:hidden">Logout</span>
//                   </motion.button>
//                 </>
//               ) : (
//                 <>
//                   <motion.button
//                     whileHover={{
//                       scale: 1.05,
//                       backgroundColor: "#FF385C",
//                       color: "white",
//                     }}
//                     whileTap={{ scale: 0.95 }}
//                     className="hidden sm:block text-xs sm:text-sm font-medium px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full transition-all text-gray-700 hover:bg-[#FF385C] hover:text-white border border-gray-200 hover:border-[#FF385C] whitespace-nowrap"
//                     onClick={() => setIsLoginOpen(true)}
//                   >
//                     <LoginIcon className="w-3 h-3 inline mr-0.5 sm:mr-1" />
//                     {t.login}
//                   </motion.button>
//                   <motion.button
//                     whileHover={{
//                       scale: 1.05,
//                       backgroundColor: "#1B4E91",
//                       color: "white",
//                     }}
//                     whileTap={{ scale: 0.95 }}
//                     className="hidden sm:block text-xs sm:text-sm font-medium px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full transition-all text-gray-700 hover:bg-[#1B4E91] hover:text-white border border-gray-200 hover:border-[#1B4E91] whitespace-nowrap"
//                     onClick={() => setIsRegisterOpen(true)}
//                   >
//                     <PersonAddIcon className="w-3 h-3 inline mr-0.5 sm:mr-1" />
//                     {t.signup}
//                   </motion.button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </motion.nav>

//       {/* Mobile Navigation Menu */}
//       <div
//         id="mobile-nav-menu"
//         className="hidden lg:hidden bg-white border-b border-gray-200 shadow-lg"
//       >
//         <div className="px-3 sm:px-4 py-2 sm:py-3 space-y-0.5 sm:space-y-1">
//           {navLinks.map((link) => (
//             <motion.div key={link.id} whileHover={{ x: 5 }}>
//               <button
//                 onClick={() => {
//                   navigateTo(link.path);
//                   const menu = document.getElementById("mobile-nav-menu");
//                   if (menu) menu.classList.add("hidden");
//                 }}
//                 className="block w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-[#FF385C] transition-colors"
//               >
//                 {t[link.label as keyof typeof t]}
//               </button>
//             </motion.div>
//           ))}
//           <div className="pt-2 border-t border-gray-200 space-y-0.5 sm:space-y-1">
//             {isLoggedIn ? (
//               <>
//                 <motion.button
//                   whileHover={{ x: 5 }}
//                   onClick={() => {
//                     setIsUserModalOpen(true);
//                     const menu = document.getElementById("mobile-nav-menu");
//                     if (menu) menu.classList.add("hidden");
//                   }}
//                   className="w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm font-medium text-[#FF385C] hover:bg-[#FF385C]/5 transition-colors flex items-center gap-2"
//                 >
//                   <AccountCircleIcon className="w-4 h-4" />
//                   {t.profile}
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ x: 5 }}
//                   onClick={() => {
//                     const menu = document.getElementById("mobile-nav-menu");
//                     if (menu) menu.classList.add("hidden");
//                     handleDashboardNavigation();
//                   }}
//                   className="w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm font-medium text-[#FF385C] hover:bg-[#FF385C]/5 transition-colors flex items-center gap-2"
//                 >
//                   {getDashboardIcon()}
//                   {getDashboardLabel()}
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ x: 5 }}
//                   onClick={() => {
//                     const menu = document.getElementById("mobile-nav-menu");
//                     if (menu) menu.classList.add("hidden");
//                     handleLogout();
//                   }}
//                   className="w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
//                 >
//                   <LogoutIcon className="w-4 h-4" />
//                   {t.logout}
//                 </motion.button>
//               </>
//             ) : (
//               <>
//                 <motion.button
//                   whileHover={{ x: 5 }}
//                   onClick={() => {
//                     const menu = document.getElementById("mobile-nav-menu");
//                     if (menu) menu.classList.add("hidden");
//                     setIsLoginOpen(true);
//                   }}
//                   className="w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm font-medium text-[#FF385C] hover:bg-[#FF385C]/5 transition-colors flex items-center gap-2"
//                 >
//                   <LoginIcon className="w-4 h-4" />
//                   {t.login}
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ x: 5 }}
//                   onClick={() => {
//                     const menu = document.getElementById("mobile-nav-menu");
//                     if (menu) menu.classList.add("hidden");
//                     setIsRegisterOpen(true);
//                   }}
//                   className="w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm font-medium text-[#1B4E91] hover:bg-[#1B4E91]/5 transition-colors flex items-center gap-2"
//                 >
//                   <PersonAddIcon className="w-4 h-4" />
//                   {t.signup}
//                 </motion.button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Login Modal */}
//       <AnimatePresence>
//         {isLoginOpen && (
//           <>
//             <motion.div
//               variants={overlayVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               transition={{ duration: 0.3 }}
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
//               onClick={() => setIsLoginOpen(false)}
//             />
//             <motion.div
//               variants={modalVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
//               className="fixed inset-0 z-[101] flex items-center justify-center p-3 sm:p-4"
//             >
//               <div className="w-full max-w-xs sm:max-w-sm md:max-w-md max-h-[90vh] rounded-2xl shadow-2xl bg-white relative overflow-hidden">
//                 <AnimatedBackground />
//                 <div className="sticky top-0 px-4 sm:px-5 md:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl relative z-10">
//                   <div className="flex items-center gap-1.5 sm:gap-2">
//                     <AutoAwesomeIcon className="text-[#FF385C] w-4 h-4 sm:w-5 sm:h-5" />
//                     <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
//                       {t.welcomeBack}
//                     </h2>
//                   </div>
//                   <motion.button
//                     whileHover={{ rotate: 90, scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => setIsLoginOpen(false)}
//                     className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
//                   >
//                     <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
//                   </motion.button>
//                 </div>

//                 <motion.div
//                   initial={{ y: 50, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   exit={{ y: 50, opacity: 0 }}
//                   transition={{ duration: 0.4, delay: 0.1 }}
//                   className="overflow-y-auto max-h-[calc(90vh-80px)]"
//                 >
//                   <form
//                     onSubmit={handleLogin}
//                     className="p-4 sm:p-5 md:p-6 relative z-10"
//                   >
//                     <div className="mb-3 sm:mb-4">
//                       <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 text-gray-700">
//                         {t.email}
//                       </label>
//                       <div
//                         className={`relative rounded-lg border ${
//                           isLoginEmailValid === true
//                             ? "border-green-500"
//                             : isLoginEmailValid === false
//                               ? "border-red-500"
//                               : "border-gray-300"
//                         } bg-white focus-within:border-[#FF385C] transition-colors duration-300`}
//                       >
//                         <EmailIcon
//                           className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 ${
//                             isLoginEmailValid === true
//                               ? "text-green-500"
//                               : isLoginEmailValid === false
//                                 ? "text-red-500"
//                                 : "text-gray-400"
//                           }`}
//                         />
//                         <input
//                           type="email"
//                           required
//                           value={loginEmail}
//                           onChange={(e) =>
//                             handleLoginEmailChange(e.target.value)
//                           }
//                           className="w-full pl-9 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-2.5 rounded-lg outline-none text-xs sm:text-sm bg-white text-gray-900 placeholder-gray-400"
//                           placeholder="you@example.com"
//                         />
//                         {isLoginEmailValid === true && (
//                           <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
//                         )}
//                         {isLoginEmailValid === false && (
//                           <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
//                         )}
//                       </div>
//                       {loginErrors.email && (
//                         <p className="text-xs text-red-500 mt-1">
//                           {loginErrors.email}
//                         </p>
//                       )}
//                       {isLoginEmailValid === true && (
//                         <p className="text-xs text-green-500 mt-1">
//                           ✓ Valid email address
//                         </p>
//                       )}
//                     </div>
//                     <div className="mb-3 sm:mb-4">
//                       <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 text-gray-700">
//                         {t.password}
//                       </label>
//                       <div className="relative rounded-lg border border-gray-300 bg-white focus-within:border-[#FF385C] transition-colors duration-300">
//                         <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
//                         <input
//                           type={showPassword ? "text" : "password"}
//                           required
//                           value={loginPassword}
//                           onChange={(e) => {
//                             setLoginPassword(e.target.value);
//                             if (loginErrors.password) {
//                               setLoginErrors({
//                                 ...loginErrors,
//                                 password: undefined,
//                               });
//                             }
//                           }}
//                           className="w-full pl-9 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-2.5 rounded-lg outline-none text-xs sm:text-sm bg-white text-gray-900 placeholder-gray-400"
//                           placeholder="••••••••"
//                           minLength={6}
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                         >
//                           {showPassword ? (
//                             <VisibilityOffIcon className="w-4 h-4 sm:w-5 sm:h-5" />
//                           ) : (
//                             <VisibilityIcon className="w-4 h-4 sm:w-5 sm:h-5" />
//                           )}
//                         </button>
//                       </div>
//                       {loginErrors.password && (
//                         <p className="text-xs text-red-500 mt-1">
//                           {loginErrors.password}
//                         </p>
//                       )}
//                     </div>

//                     {/* Forgot Password Link */}
//                     <div className="text-right mb-3 sm:mb-4">
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setIsLoginOpen(false);
//                           setIsForgetPasswordOpen(true);
//                         }}
//                         className="text-xs sm:text-sm text-[#FF385C] hover:underline font-medium"
//                       >
//                         {t.forgotPassword}
//                       </button>
//                     </div>

//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       type="submit"
//                       disabled={loginLoading || !isLoginFormValid()}
//                       className={`w-full py-2.5 sm:py-3 rounded-lg font-medium relative overflow-hidden group transition-colors text-xs sm:text-sm ${
//                         loginLoading || !isLoginFormValid()
//                           ? "bg-gray-400 cursor-not-allowed"
//                           : "bg-[#FF385C] hover:bg-[#E31C5F]"
//                       } text-white`}
//                     >
//                       <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
//                         {loginLoading ? (
//                           <>
//                             <svg
//                               className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white"
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                             >
//                               <circle
//                                 className="opacity-25"
//                                 cx="12"
//                                 cy="12"
//                                 r="10"
//                                 stroke="currentColor"
//                                 strokeWidth="4"
//                               ></circle>
//                               <path
//                                 className="opacity-75"
//                                 fill="currentColor"
//                                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                               ></path>
//                             </svg>
//                             Logging in...
//                           </>
//                         ) : (
//                           <>
//                             <LoginIcon className="w-4 h-4 sm:w-5 sm:h-5" />
//                             {t.login}
//                           </>
//                         )}
//                       </span>
//                     </motion.button>
//                     <p className="text-center text-xs sm:text-sm mt-3 sm:mt-4 text-gray-500">
//                       {t.dontHaveAccount}{" "}
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setIsLoginOpen(false);
//                           setIsRegisterOpen(true);
//                         }}
//                         className="text-[#FF385C] font-medium hover:underline"
//                       >
//                         {t.signup}
//                       </button>
//                     </p>
//                     <div className="mt-4 sm:mt-6 flex justify-center gap-3 sm:gap-4">
//                       <Link
//                         to={
//                           "https://web.facebook.com/profile.php?id=61593907921662"
//                         }
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         aria-label="Facebook"
//                       >
//                         <FacebookIcon className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-blue-600 text-blue-600" />
//                       </Link>

//                       <Link
//                         to={"https://www.instagram.com/inyumbarental/"}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         aria-label="Instagram"
//                       >
//                         <InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-pink-600 text-pink-600" />
//                       </Link>

//                       <Link
//                         to={"https://x.com/inyumbarental"}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         aria-label="Twitter"
//                       >
//                         <TwitterIcon className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-blue-600 text-indigo-400" />
//                       </Link>

//                       <Link
//                         to={
//                           "https://www.youtube.com/channel/UCUe_TGKGrXPhit85u5u9bDA"
//                         }
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         aria-label="YouTube"
//                       >
//                         <YouTubeIcon className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-red-300 text-red-300" />
//                       </Link>
//                       <Link
//                         to={
//                           "https://www.linkedin.com/in/inyumba-rental-998031432?utm_source=share_via&utm_content=profile&utm_medium=member_android"
//                         }
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         aria-label="YouTube"
//                       >
//                         <LinkedIn className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-red-300 text-red-300" />
//                       </Link>
//                     </div>
//                   </form>
//                 </motion.div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Register Modal */}
//       <AnimatePresence>
//         {isRegisterOpen && (
//           <>
//             <motion.div
//               variants={overlayVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               transition={{ duration: 0.3 }}
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
//               onClick={() => setIsRegisterOpen(false)}
//             />
//             <motion.div
//               variants={modalVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
//               className="fixed inset-0 z-[101] flex items-center justify-center p-3 sm:p-4"
//             >
//               <div className="w-full max-w-xs sm:max-w-sm md:max-w-md max-h-[90vh] rounded-2xl shadow-2xl bg-white relative overflow-hidden">
//                 <AnimatedBackground />
//                 <div className="sticky top-0 px-4 sm:px-5 md:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl relative z-10">
//                   <div className="flex items-center gap-1.5 sm:gap-2">
//                     <AutoAwesomeIcon className="text-[#FF385C] w-4 h-4 sm:w-5 sm:h-5" />
//                     <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
//                       {t.createAccount}
//                     </h2>
//                   </div>
//                   <motion.button
//                     whileHover={{ rotate: 90, scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => setIsRegisterOpen(false)}
//                     className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
//                   >
//                     <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
//                   </motion.button>
//                 </div>

//                 <motion.div
//                   initial={{ y: 50, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   exit={{ y: 50, opacity: 0 }}
//                   transition={{ duration: 0.4, delay: 0.1 }}
//                   className="overflow-y-auto max-h-[calc(90vh-80px)] scroll-smooth"
//                   ref={scrollContainerRef}
//                 >
//                   <form
//                     onSubmit={handleRegister}
//                     className="p-4 sm:p-5 md:p-6 relative z-10"
//                   >
//                     <div className="mb-3 sm:mb-4" ref={fieldRefs.name}>
//                       <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 text-gray-700">
//                         {t.fullName}
//                       </label>
//                       <div
//                         className={`relative rounded-lg border ${
//                           registerErrors.name
//                             ? "border-red-500"
//                             : "border-gray-300"
//                         } bg-white focus-within:border-[#FF385C] transition-colors duration-300`}
//                       >
//                         <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
//                         <input
//                           type="text"
//                           required
//                           value={registerName}
//                           onChange={(e) => {
//                             setRegisterName(e.target.value);
//                             if (registerErrors.name) {
//                               setRegisterErrors({
//                                 ...registerErrors,
//                                 name: undefined,
//                               });
//                             }
//                           }}
//                           className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 rounded-lg outline-none text-xs sm:text-sm bg-white text-gray-900 placeholder-gray-400"
//                           placeholder="John Doe"
//                         />
//                       </div>
//                       {registerErrors.name && (
//                         <p className="text-xs text-red-500 mt-1">
//                           {registerErrors.name}
//                         </p>
//                       )}
//                     </div>
//                     <div className="mb-3 sm:mb-4" ref={fieldRefs.email}>
//                       <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 text-gray-700">
//                         {t.email}
//                       </label>
//                       <div
//                         className={`relative rounded-lg border ${
//                           isRegisterEmailValid === true
//                             ? "border-green-500"
//                             : isRegisterEmailValid === false
//                               ? "border-red-500"
//                               : registerErrors.email
//                                 ? "border-red-500"
//                                 : "border-gray-300"
//                         } bg-white focus-within:border-[#FF385C] transition-colors duration-300`}
//                       >
//                         <EmailIcon
//                           className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 ${
//                             isRegisterEmailValid === true
//                               ? "text-green-500"
//                               : isRegisterEmailValid === false
//                                 ? "text-red-500"
//                                 : "text-gray-400"
//                           }`}
//                         />
//                         <input
//                           type="email"
//                           required
//                           value={registerEmail}
//                           onChange={(e) =>
//                             handleRegisterEmailChange(e.target.value)
//                           }
//                           className="w-full pl-9 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-2.5 rounded-lg outline-none text-xs sm:text-sm bg-white text-gray-900 placeholder-gray-400"
//                           placeholder="you@example.com"
//                         />
//                         {isRegisterEmailValid === true && (
//                           <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
//                         )}
//                         {isRegisterEmailValid === false && (
//                           <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
//                         )}
//                       </div>
//                       {registerErrors.email && (
//                         <p className="text-xs text-red-500 mt-1">
//                           {registerErrors.email}
//                         </p>
//                       )}
//                       {isRegisterEmailValid === true && (
//                         <p className="text-xs text-green-500 mt-1">
//                           ✓ Valid email address
//                         </p>
//                       )}
//                     </div>
//                     <div className="mb-3 sm:mb-4" ref={fieldRefs.phone}>
//                       <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 text-gray-700">
//                         {t.phoneNumber}
//                       </label>
//                       <div
//                         className={`relative rounded-lg border ${
//                           isPhoneValid === true
//                             ? "border-green-500"
//                             : isPhoneValid === false
//                               ? "border-red-500"
//                               : registerErrors.phone
//                                 ? "border-red-500"
//                                 : "border-gray-300"
//                         } bg-white focus-within:border-[#FF385C] transition-colors duration-300`}
//                       >
//                         <PhoneIcon
//                           className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 ${
//                             isPhoneValid === true
//                               ? "text-green-500"
//                               : isPhoneValid === false
//                                 ? "text-red-500"
//                                 : "text-gray-400"
//                           }`}
//                         />
//                         <input
//                           type="tel"
//                           required
//                           value={registerPhone}
//                           onChange={(e) => handlePhoneChange(e.target.value)}
//                           className="w-full pl-9 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-2.5 rounded-lg outline-none text-xs sm:text-sm bg-white text-gray-900 placeholder-gray-400"
//                           placeholder="0788123456"
//                         />
//                         {isPhoneValid === true && (
//                           <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
//                         )}
//                         {isPhoneValid === false && (
//                           <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
//                         )}
//                       </div>
//                       {registerErrors.phone && (
//                         <p className="text-xs text-red-500 mt-1">
//                           {registerErrors.phone}
//                         </p>
//                       )}
//                       {isPhoneValid === true && (
//                         <p className="text-xs text-green-500 mt-1">
//                           ✓ Valid phone number
//                         </p>
//                       )}
//                     </div>
//                     <div className="mb-3 sm:mb-4" ref={fieldRefs.password}>
//                       <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 text-gray-700">
//                         {t.password}
//                       </label>
//                       <div
//                         className={`relative rounded-lg border ${
//                           registerErrors.password
//                             ? "border-red-500"
//                             : "border-gray-300"
//                         } bg-white focus-within:border-[#FF385C] transition-colors duration-300`}
//                       >
//                         <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
//                         <input
//                           type={showPassword ? "text" : "password"}
//                           required
//                           value={registerPassword}
//                           onChange={(e) => handlePasswordChange(e.target.value)}
//                           className="w-full pl-9 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-2.5 rounded-lg outline-none text-xs sm:text-sm bg-white text-gray-900 placeholder-gray-400"
//                           placeholder="••••••••"
//                           minLength={6}
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                         >
//                           {showPassword ? (
//                             <VisibilityOffIcon className="w-4 h-4 sm:w-5 sm:h-5" />
//                           ) : (
//                             <VisibilityIcon className="w-4 h-4 sm:w-5 sm:h-5" />
//                           )}
//                         </button>
//                       </div>
//                       {registerErrors.password && (
//                         <p className="text-xs text-red-500 mt-1">
//                           {registerErrors.password}
//                         </p>
//                       )}
//                       {passwordStrength && (
//                         <div className="mt-1.5 sm:mt-2">
//                           <div className="flex items-center gap-1.5 sm:gap-2">
//                             <div className="flex-1 h-1 sm:h-1.5 bg-gray-200 rounded-full overflow-hidden">
//                               <motion.div
//                                 className="h-full rounded-full transition-all duration-500"
//                                 style={{
//                                   width:
//                                     passwordStrength === "weak"
//                                       ? "33%"
//                                       : passwordStrength === "moderate"
//                                         ? "66%"
//                                         : "100%",
//                                   backgroundColor:
//                                     getPasswordStrengthColor(passwordStrength),
//                                 }}
//                                 initial={{ width: 0 }}
//                                 animate={{
//                                   width:
//                                     passwordStrength === "weak"
//                                       ? "33%"
//                                       : passwordStrength === "moderate"
//                                         ? "66%"
//                                         : "100%",
//                                 }}
//                               />
//                             </div>
//                             <div
//                               className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs font-medium whitespace-nowrap"
//                               style={{
//                                 color:
//                                   getPasswordStrengthColor(passwordStrength),
//                               }}
//                             >
//                               {getPasswordStrengthIcon(passwordStrength)}
//                               <span>
//                                 {t.passwordStrength}:{" "}
//                                 {getPasswordStrengthLabel(passwordStrength)}
//                               </span>
//                             </div>
//                           </div>
//                           {passwordStrength === "weak" && (
//                             <p className="text-[10px] sm:text-xs text-red-500 mt-1">
//                               ⚠️ Password is too weak. Use at least 8 characters
//                               with uppercase, lowercase, numbers, and special
//                               characters.
//                             </p>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                     <div
//                       className="mb-4 sm:mb-5 md:mb-6"
//                       ref={fieldRefs.confirmPassword}
//                     >
//                       <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 text-gray-700">
//                         {t.confirmPassword}
//                       </label>
//                       <div
//                         className={`relative rounded-lg border ${
//                           registerErrors.confirmPassword
//                             ? "border-red-500"
//                             : registerConfirmPassword &&
//                                 registerPassword === registerConfirmPassword &&
//                                 registerConfirmPassword.length > 0
//                               ? "border-green-500"
//                               : "border-gray-300"
//                         } bg-white focus-within:border-[#FF385C] transition-colors duration-300`}
//                       >
//                         <LockIcon
//                           className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 ${
//                             registerConfirmPassword &&
//                             registerPassword === registerConfirmPassword &&
//                             registerConfirmPassword.length > 0
//                               ? "text-green-500"
//                               : "text-gray-400"
//                           }`}
//                         />
//                         <input
//                           type={showConfirmPassword ? "text" : "password"}
//                           required
//                           value={registerConfirmPassword}
//                           onChange={(e) =>
//                             handleConfirmPasswordChange(e.target.value)
//                           }
//                           className="w-full pl-9 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-2.5 rounded-lg outline-none text-xs sm:text-sm bg-white text-gray-900 placeholder-gray-400"
//                           placeholder="••••••••"
//                           minLength={6}
//                         />
//                         <button
//                           type="button"
//                           onClick={() =>
//                             setShowConfirmPassword(!showConfirmPassword)
//                           }
//                           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                         >
//                           {showConfirmPassword ? (
//                             <VisibilityOffIcon className="w-4 h-4 sm:w-5 sm:h-5" />
//                           ) : (
//                             <VisibilityIcon className="w-4 h-4 sm:w-5 sm:h-5" />
//                           )}
//                         </button>
//                         {registerConfirmPassword &&
//                           registerPassword === registerConfirmPassword &&
//                           registerConfirmPassword.length > 0 && (
//                             <CheckCircleIcon className="absolute right-10 sm:right-12 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
//                           )}
//                       </div>
//                       {registerErrors.confirmPassword && (
//                         <p className="text-xs text-red-500 mt-1">
//                           {registerErrors.confirmPassword}
//                         </p>
//                       )}
//                       {registerConfirmPassword &&
//                         registerPassword === registerConfirmPassword &&
//                         registerConfirmPassword.length > 0 && (
//                           <p className="text-xs text-green-500 mt-1">
//                             ✓ Passwords match
//                           </p>
//                         )}
//                     </div>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       type="submit"
//                       disabled={registerLoading || !isRegisterFormValid()}
//                       className={`w-full py-2.5 sm:py-3 rounded-lg font-medium relative overflow-hidden group transition-colors text-xs sm:text-sm ${
//                         registerLoading || !isRegisterFormValid()
//                           ? "bg-gray-400 cursor-not-allowed"
//                           : "bg-[#FF385C] hover:bg-[#E31C5F]"
//                       } text-white`}
//                     >
//                       <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
//                         {registerLoading ? (
//                           <>
//                             <svg
//                               className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white"
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                             >
//                               <circle
//                                 className="opacity-25"
//                                 cx="12"
//                                 cy="12"
//                                 r="10"
//                                 stroke="currentColor"
//                                 strokeWidth="4"
//                               ></circle>
//                               <path
//                                 className="opacity-75"
//                                 fill="currentColor"
//                                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                               ></path>
//                             </svg>
//                             Creating account...
//                           </>
//                         ) : (
//                           <>
//                             <PersonAddIcon className="w-4 h-4 sm:w-5 sm:h-5" />
//                             {t.signup}
//                           </>
//                         )}
//                       </span>
//                     </motion.button>
//                     {!isRegisterFormValid() &&
//                       registerPassword.length > 0 &&
//                       passwordStrength === "weak" && (
//                         <p className="text-center text-[10px] sm:text-xs text-red-500 mt-2">
//                           ⚠️ Please choose a stronger password to enable
//                           registration.
//                         </p>
//                       )}
//                     <p className="text-center text-xs sm:text-sm mt-3 sm:mt-4 text-gray-500">
//                       {t.alreadyHaveAccount}{" "}
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setIsRegisterOpen(false);
//                           setIsLoginOpen(true);
//                         }}
//                         className="text-[#FF385C] font-medium hover:underline"
//                       >
//                         {t.login}
//                       </button>
//                     </p>
//                     <div className="mt-4 sm:mt-6 flex justify-center gap-3 sm:gap-4">
//                       <Link
//                         to={
//                           "https://web.facebook.com/profile.php?id=61593907921662"
//                         }
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         aria-label="Facebook"
//                       >
//                         <FacebookIcon className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-blue-600 text-blue-600" />
//                       </Link>

//                       <Link
//                         to={"https://www.instagram.com/inyumbarental/"}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         aria-label="Instagram"
//                       >
//                         <InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-pink-600 text-pink-600" />
//                       </Link>

//                       <Link
//                         to={"https://x.com/inyumbarental"}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         aria-label="Twitter"
//                       >
//                         <TwitterIcon className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-blue-600 text-indigo-400" />
//                       </Link>

//                       <Link
//                         to={
//                           "https://www.youtube.com/channel/UCUe_TGKGrXPhit85u5u9bDA"
//                         }
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         aria-label="YouTube"
//                       >
//                         <YouTubeIcon className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-red-300 text-red-300" />
//                       </Link>
//                       <Link
//                         to={
//                           "https://www.linkedin.com/in/inyumba-rental-998031432?utm_source=share_via&utm_content=profile&utm_medium=member_android"
//                         }
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         aria-label="YouTube"
//                       >
//                         <LinkedIn className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-red-300 text-red-300" />
//                       </Link>
//                     </div>
//                   </form>
//                 </motion.div>

//                 {/* Navigation Buttons - positioned on the right edge */}
//                 <div className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1.5 sm:gap-2">
//                   <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={scrollToTop}
//                     className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-gray-600 hover:bg-white hover:text-[#FF385C] transition-all border border-gray-200"
//                     title="Scroll to top"
//                   >
//                     <svg
//                       className="w-3.5 h-3.5 sm:w-4 sm:h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M5 15l7-7 7 7"
//                       />
//                     </svg>
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={scrollToNextField}
//                     className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-gray-600 hover:bg-white hover:text-[#FF385C] transition-all border border-gray-200"
//                     title="Scroll to next field"
//                   >
//                     <svg
//                       className="w-3.5 h-3.5 sm:w-4 sm:h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M19 9l-7 7-7-7"
//                       />
//                     </svg>
//                   </motion.button>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* User Profile Modal - Shows Full User Data */}
//       <AnimatePresence>
//         {isUserModalOpen && (
//           <>
//             <motion.div
//               variants={overlayVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               transition={{ duration: 0.3 }}
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
//               onClick={() => setIsUserModalOpen(false)}
//             />
//             <motion.div
//               variants={modalVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
//               className="fixed inset-0 z-[101] flex items-center justify-center p-3 sm:p-4"
//             >
//               <div className="w-full max-w-xs sm:max-w-sm md:max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative flex flex-col">
//                 <AnimatedBackground />
//                 {/* Header - NOT sticky, stays at top of flex container */}
//                 <div className="px-4 sm:px-5 md:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl relative z-10 flex-shrink-0">
//                   <div className="flex items-center gap-1.5 sm:gap-2">
//                     <AccountCircleIcon className="text-[#FF385C] w-4 h-4 sm:w-5 sm:h-5" />
//                     <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
//                       {t.profile}
//                     </h2>
//                   </div>
//                   <motion.button
//                     whileHover={{ rotate: 90, scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => setIsUserModalOpen(false)}
//                     className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
//                   >
//                     <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
//                   </motion.button>
//                 </div>

//                 {/* Scrollable content area */}
//                 <div className="p-4 sm:p-5 md:p-6 relative z-10 overflow-y-auto flex-1">
//                   {/* User Avatar & Name */}
//                   <div className="flex flex-col items-center mb-4 sm:mb-5 md:mb-6">
//                     <motion.div
//                       className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-[#FF385C] text-white flex items-center justify-center text-2xl sm:text-3xl font-bold mb-2 sm:mb-3"
//                       whileHover={{ scale: 1.1, rotate: 10 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       {userName.charAt(0).toUpperCase()}
//                     </motion.div>
//                     <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 text-center">
//                       {userName}
//                     </h3>
//                     <p className="text-xs sm:text-sm text-gray-500 text-center break-all">
//                       {userEmail}
//                     </p>
//                     <span
//                       className={`inline-block mt-1.5 sm:mt-2 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full font-medium ${
//                         userRole === "admin"
//                           ? "bg-red-100 text-red-700"
//                           : userRole === "host"
//                             ? "bg-blue-100 text-blue-700"
//                             : userRole === "manager"
//                               ? "bg-purple-100 text-purple-700"
//                               : "bg-green-100 text-green-700"
//                       }`}
//                     >
//                       {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
//                     </span>
//                   </div>

//                   {/* User Details Grid */}
//                   <div className="border-t border-gray-200 pt-3 sm:pt-4 space-y-2 sm:space-y-3">
//                     <div className="grid grid-cols-2 gap-2 sm:gap-3">
//                       <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
//                         <p className="text-[10px] sm:text-xs text-gray-500">
//                           Full Name
//                         </p>
//                         <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
//                           {userName}
//                         </p>
//                       </div>
//                       <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
//                         <p className="text-[10px] sm:text-xs text-gray-500">
//                           Role
//                         </p>
//                         <p className="text-xs sm:text-sm font-medium text-gray-900 capitalize">
//                           {userRole}
//                         </p>
//                       </div>
//                       <div className="bg-gray-50 rounded-lg p-2 sm:p-3 col-span-2">
//                         <p className="text-[10px] sm:text-xs text-gray-500">
//                           Email
//                         </p>
//                         <p className="text-xs sm:text-sm font-medium text-gray-900 truncate break-all">
//                           {userEmail}
//                         </p>
//                       </div>
//                       <div className="bg-gray-50 rounded-lg p-2 sm:p-3 col-span-2">
//                         <p className="text-[10px] sm:text-xs text-gray-500">
//                           Phone
//                         </p>
//                         <p className="text-xs sm:text-sm font-medium text-gray-900">
//                           {userPhone || "N/A"}
//                         </p>
//                       </div>
//                       <div className="bg-gray-50 rounded-lg p-2 sm:p-3 col-span-2">
//                         <p className="text-[10px] sm:text-xs text-gray-500">
//                           Member Since
//                         </p>
//                         <p className="text-xs sm:text-sm font-medium text-gray-900">
//                           {formatDate(userCreatedAt)}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="border-t border-gray-200 mt-3 sm:mt-4 pt-3 sm:pt-4 space-y-1.5 sm:space-y-2">
//                     <motion.button
//                       whileHover={{ x: 5 }}
//                       className="w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm flex items-center gap-2 sm:gap-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
//                       onClick={() => {
//                         setIsUserModalOpen(false);
//                         handleDashboardNavigation();
//                       }}
//                     >
//                       {getDashboardIcon()}
//                       {getDashboardLabel()}
//                     </motion.button>

//                     <motion.button
//                       whileHover={{ x: 5 }}
//                       className="w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm flex items-center gap-2 sm:gap-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                       onClick={() => {
//                         setIsUserModalOpen(false);
//                         handleLogout();
//                       }}
//                     >
//                       <LogoutIcon className="w-4 h-4" />
//                       {t.logout}
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Dashboard Modal */}
//       <AnimatePresence>
//         {isDashboardOpen && (
//           <>
//             <motion.div
//               variants={overlayVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               transition={{ duration: 0.3 }}
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
//               onClick={() => setIsDashboardOpen(false)}
//             />
//             <motion.div
//               variants={modalVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
//               className="fixed inset-0 z-[101] flex items-center justify-center p-3 sm:p-4"
//             >
//               <div className="w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
//                 <AnimatedBackground />
//                 <div className="sticky top-0 px-4 sm:px-5 md:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl relative z-10">
//                   <div className="flex items-center gap-1.5 sm:gap-2">
//                     <DashboardIcon className="text-[#FF385C] w-4 h-4 sm:w-5 sm:h-5" />
//                     <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
//                       {getDashboardLabel()}
//                     </h2>
//                     <span className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-xs rounded-full bg-[#FF385C]/10 text-[#FF385C]">
//                       {userRole}
//                     </span>
//                   </div>
//                   <motion.button
//                     whileHover={{ rotate: 90, scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => setIsDashboardOpen(false)}
//                     className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
//                   >
//                     <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
//                   </motion.button>
//                 </div>
//                 <div className="p-4 sm:p-5 md:p-6 relative z-10">
//                   <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6">
//                     {dashboardStats.map((stat, index) => (
//                       <motion.div
//                         key={index}
//                         variants={cardVariants}
//                         initial="hidden"
//                         animate="visible"
//                         transition={{ delay: index * 0.1 }}
//                         whileHover="hover"
//                         className="bg-gray-50 rounded-xl p-2 sm:p-3 md:p-4 shadow-sm"
//                       >
//                         <div className="flex items-center justify-between">
//                           <span className="text-[10px] sm:text-xs md:text-sm text-gray-500">
//                             {stat.label}
//                           </span>
//                           {stat.icon}
//                         </div>
//                         <p className="text-base sm:text-lg md:text-2xl font-bold text-gray-900 mt-1 sm:mt-2">
//                           {stat.value}
//                         </p>
//                         <p className="text-[10px] sm:text-xs text-green-500 mt-0.5 sm:mt-1">
//                           {stat.change}
//                         </p>
//                       </motion.div>
//                     ))}
//                   </div>
//                   <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
//                     <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
//                       {t.recentActivity}
//                     </h3>
//                     <div className="space-y-2 sm:space-y-3">
//                       {recentActivities.map((activity, index) => (
//                         <motion.div
//                           key={index}
//                           initial={{ opacity: 0, x: -20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ delay: index * 0.1 }}
//                           className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg hover:bg-white transition-colors"
//                         >
//                           <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
//                             {activity.icon}
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
//                               {activity.user}
//                             </p>
//                             <p className="text-[10px] sm:text-xs text-gray-500 truncate">
//                               {activity.action}
//                             </p>
//                           </div>
//                           <span className="text-[10px] sm:text-xs text-gray-400 flex-shrink-0">
//                             {activity.time}
//                           </span>
//                         </motion.div>
//                       ))}
//                     </div>
//                   </div>
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="w-full mt-3 sm:mt-4 bg-[#FF385C] text-white py-2 sm:py-2.5 md:py-3 rounded-lg font-medium hover:bg-[#E31C5F] transition-colors text-xs sm:text-sm"
//                     onClick={() => {
//                       setIsDashboardOpen(false);
//                       handleDashboardNavigation();
//                     }}
//                   >
//                     <DashboardIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
//                     View Full Dashboard
//                   </motion.button>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };













/* eslint-disable react-hooks/refs */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import axios from "axios";

// Material-UI Icons
import PersonIcon from "@mui/icons-material/Person";
import LanguageIcon from "@mui/icons-material/Language";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HotelIcon from "@mui/icons-material/Hotel";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import StarIcon from "@mui/icons-material/Star";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PhoneIcon from "@mui/icons-material/Phone";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import WarningIcon from "@mui/icons-material/Warning";
import SecurityIcon from "@mui/icons-material/Security";
import VerifiedIcon from "@mui/icons-material/Verified";
import {
  CheckCircleOutlineRounded,
  ErrorOutlineOutlined,
  LinkedIn,
} from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import { Link, useLocation } from "react-router-dom";

// ===================== API CONFIGURATION =====================
const API_BASE_URL = "https://inyumbaproject.eu1.hubfly.app";
const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token interceptor
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log error for debugging
    console.error("API Error:", error.response?.data || error.message);
    
    // Handle network errors
    if (!error.response) {
      return Promise.reject({
        success: false,
        message: "Network error. Please check your internet connection.",
        details: "Unable to connect to the server. Please try again later.",
      });
    }
    
    // Handle specific HTTP status codes
    const status = error.response.status;
    let errorMessage = error.response?.data?.message || "An unexpected error occurred.";
    
    switch (status) {
      case 400:
        errorMessage = error.response?.data?.message || "Bad request. Please check your input.";
        break;
      case 401:
        errorMessage = "Unauthorized. Please log in again.";
        // Clear invalid token
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        break;
      case 403:
        errorMessage = "Forbidden. You don't have permission to perform this action.";
        break;
      case 404:
        errorMessage = error.response?.data?.message || "Resource not found. Please try again.";
        break;
      case 409:
        errorMessage = error.response?.data?.message || "Conflict. This resource may already exist.";
        break;
      case 422:
        errorMessage = error.response?.data?.message || "Validation error. Please check your input.";
        break;
      case 429:
        errorMessage = "Too many requests. Please wait a moment and try again.";
        break;
      case 500:
        errorMessage = "Server error. Please try again later.";
        break;
      case 502:
        errorMessage = "Bad gateway. The server is temporarily unavailable.";
        break;
      case 503:
        errorMessage = "Service unavailable. Please try again later.";
        break;
      default:
        errorMessage = error.response?.data?.message || `Error ${status}: ${error.message}`;
    }
    
    return Promise.reject({
      success: false,
      status: status,
      message: errorMessage,
      details: error.response?.data?.details || error.response?.data?.error || "Please try again or contact support.",
      data: error.response?.data,
    });
  }
);

// ===================== INYUMBA SVG LOGO =====================
const InyumbaLogo = ({ className = "h-12 w-12" }: { className?: string }) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 500 560"
    className={className}
    whileHover={{
      rotate: [-2, 2, -2, 2, 0],
      transition: { duration: 0.45 },
    }}
  >
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
    <g transform="translate(250 95)">
      <text
        x="0"
        y="-18"
        fontSize="34"
        fontWeight="800"
        textAnchor="middle"
        fill="#1B4E91"
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
    <g>
      <path
        d="M150 215 L250 135 L350 215"
        fill="none"
        stroke="#36B25A"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="188" y="215" width="124" height="90" rx="3" fill="#36B25A" />
      <rect x="305" y="175" width="18" height="55" fill="#36B25A" />
    </g>
    <motion.g
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ repeat: Infinity, duration: 2 }}
      transform="translate(250 252)"
    >
      <path
        d="M0-32 C-23-32 -38-15 -38 8 C-38 38 0 72 0 72 C0 72 38 38 38 8 C38-15 23-32 0-32"
        fill="#1B4E91"
      />
      <circle r="13" cy="-3" fill="white" />
    </motion.g>
    <g transform="translate(250 320)">
      <path
        d="M0 0 C-28 -16 -82 -18 -132 -4 C-120 10 -120 26 -132 40 C-82 20 -30 22 0 42"
        fill="#1B4E91"
      />
      <path
        d="M0 0 C28 -16 82 -18 132 -4 C120 10 120 26 132 40 C82 20 30 22 0 42"
        fill="#1B4E91"
      />
      <path
        d="M0 14 C-28 -2 -78 -4 -120 8"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M0 14 C28 -2 78 -4 120 8"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
    </g>
    <text
      x="250"
      y="430"
      textAnchor="middle"
      fontSize="60"
      fontWeight="900"
      fill="#1B4E91"
      letterSpacing="2"
      style={{ fontFamily: "Poppins, Montserrat, Arial, sans-serif" }}
    >
      INYUMBA
    </text>
    <text
      x="250"
      y="462"
      textAnchor="middle"
      fontSize="20"
      fontWeight="700"
      fill="#36B25A"
      style={{ fontFamily: "Poppins, Arial, sans-serif" }}
    >
      STUDENT ACCOMMODATION
    </text>
    <text
      x="250"
      y="530"
      textAnchor="middle"
      fontSize="24"
      fontWeight="800"
      letterSpacing="5"
      fill="#1B4E91"
      style={{ fontFamily: "Poppins, Arial, sans-serif" }}
    >
      RWANDA
    </text>
  </motion.svg>
);

// ===================== ANIMATED BACKGROUND =====================
const AnimatedBackground = () => (
  <svg
    className="absolute inset-0 w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#FF385C", stopOpacity: 0.1 }} />
        <stop
          offset="100%"
          style={{ stopColor: "#FF385C", stopOpacity: 0.05 }}
        />
      </linearGradient>
      <radialGradient id="radial">
        <stop offset="0%" style={{ stopColor: "#FF385C", stopOpacity: 0.15 }} />
        <stop offset="100%" style={{ stopColor: "#FF385C", stopOpacity: 0 }} />
      </radialGradient>
    </defs>
    <motion.circle
      cx="50%"
      cy="50%"
      r="40%"
      fill="url(#radial)"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 4, repeat: Infinity }}
    />
    <motion.rect
      width="100%"
      height="100%"
      fill="url(#grad)"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
  </svg>
);

// ===================== TRANSLATIONS =====================
const translations = {
  en: {
    brand: "INYUMBA",
    becomeHost: "Become a Host",
    login: "Log in",
    signup: "Sign up",
    logout: "Log out",
    profile: "Profile",
    yourHomes: "Your homes",
    wishlists: "Wishlists",
    giftCards: "Gift cards",
    helpCenter: "Help Center",
    settings: "Settings",
    welcomeBack: "Welcome back",
    email: "Email address",
    password: "Password",
    confirmPassword: "Confirm password",
    phoneNumber: "Phone number",
    fullName: "Full name",
    createAccount: "Create account",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",
    home: "Home",
    experience: "Houses",
    services: "Services",
    about: "About",
    testimonials: "Testimonials",
    helpCenterTitle: "Help Center",
    becomeHostDesc: "It's easy to start hosting and earn extra income.",
    referHost: "Refer a Host",
    findCoHost: "Find a co-host",
    giftCardsTitle: "Gift cards",
    dashboard: "Dashboard",
    adminDashboard: "Admin Dashboard",
    userDashboard: "My Dashboard",
    users: "Users",
    analytics: "Analytics",
    bookings: "Bookings",
    totalRevenue: "Total Revenue",
    activeListings: "Active Listings",
    totalUsers: "Total Users",
    recentActivity: "Recent Activity",
    passwordStrength: "Password strength",
    weak: "Weak",
    moderate: "Moderate",
    strong: "Strong",
    forgotPassword: "Forgot password?",
    resetPassword: "Reset Password",
    sendResetLink: "Send Reset Link",
    checkEmail: "Check your email",
    resetLinkSent: "We've sent a password reset link to your email.",
    enterEmail:
      "Enter your email address and we'll send you a link to reset your password.",
    backToLogin: "Back to login",
    resetPasswordTitle: "Reset Your Password",
    heroTitle: "Find Your Perfect Student Accommodation",
    heroSubtitle:
      "Discover safe, affordable, and comfortable housing near your university",
    heroButton: "Explore Listings",
    heroStudents: "Happy Students",
    heroListings: "Available Listings",
    heroUniversities: "Partner Universities",
    aboutTitle: "About INYUMBA",
    aboutSubtitle: "Your Trusted Student Housing Platform",
    aboutDesc1:
      "INYUMBA is Rwanda's premier student accommodation platform, connecting students with quality housing near their universities.",
    aboutDesc2:
      "We understand the challenges of finding safe and affordable accommodation as a student. That's why we've created a platform that makes the search easy and reliable.",
    aboutMission: "Our Mission",
    aboutMissionText:
      "To provide every student in Rwanda with access to safe, affordable, and comfortable accommodation that enhances their academic experience.",
    aboutVision: "Our Vision",
    aboutVisionText:
      "To become Africa's leading student housing platform, transforming how students find and secure accommodation.",
    aboutValues: "Our Values",
    aboutValue1: "Safety First",
    aboutValue2: "Affordability",
    aboutValue3: "Trust & Transparency",
    aboutValue4: "Student Success",
    servicesTitle: "Our Services",
    servicesSubtitle: "Comprehensive Solutions for Student Housing",
    service1Title: "Find Accommodation",
    service1Desc:
      "Browse through hundreds of verified student housing options near your campus.",
    service2Title: "List Your Property",
    service2Desc:
      "Hosts can list their properties and connect with students looking for accommodation.",
    service3Title: "Verified Listings",
    service3Desc:
      "All properties are verified to ensure safety, quality, and fair pricing.",
    service4Title: "Support & Guidance",
    service4Desc:
      "Our team is here to help you every step of the way, from search to move-in.",
    service5Title: "Secure Payments",
    service5Desc: "Safe and secure payment processing with full transparency.",
    service6Title: "Community Building",
    service6Desc:
      "Connect with fellow students and build a community in your new home.",
    testimonialsTitle: "What Students Say",
    testimonialsSubtitle: "Real Stories from Students Who Found Their Home",
    testimonial1Name: "Marie Uwimana",
    testimonial1Role: "Student at UR-CAVM",
    testimonial1Text:
      "INYUMBA made finding accommodation so easy! I found a great place near my university within days.",
    testimonial2Name: "Jean Pierre Niyonzima",
    testimonial2Role: "Student at INES-Ruhengeri",
    testimonial2Text:
      "The platform is user-friendly and the properties are verified. I felt safe and confident throughout the process.",
    testimonial3Name: "Clarisse Mukamana",
    testimonial3Role: "Student at UR-Musanze",
    testimonial3Text:
      "I highly recommend INYUMBA to any student looking for housing. The service is excellent and the staff are helpful.",
  },
  fr: {
    brand: "INYUMBA",
    becomeHost: "Devenir hôte",
    login: "Se connecter",
    signup: "S'inscrire",
    logout: "Se déconnecter",
    profile: "Profil",
    yourHomes: "Vos logements",
    wishlists: "Listes de souhaits",
    giftCards: "Cartes cadeaux",
    helpCenter: "Centre d'aide",
    settings: "Paramètres",
    welcomeBack: "Bon retour",
    email: "Adresse e-mail",
    password: "Mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    phoneNumber: "Numéro de téléphone",
    fullName: "Nom complet",
    createAccount: "Créer un compte",
    alreadyHaveAccount: "Vous avez déjà un compte ?",
    dontHaveAccount: "Vous n'avez pas de compte ?",
    home: "Accueil",
    experience: "Maisons",
    services: "Services",
    about: "À propos",
    testimonials: "Témoignages",
    helpCenterTitle: "Centre d'aide",
    becomeHostDesc:
      "Il est facile de commencer à héberger et de gagner un revenu supplémentaire.",
    referHost: "Parrainer un hôte",
    findCoHost: "Trouver un co-hôte",
    giftCardsTitle: "Cartes cadeaux",
    dashboard: "Tableau de bord",
    adminDashboard: "Tableau de bord Admin",
    userDashboard: "Mon tableau de bord",
    users: "Utilisateurs",
    analytics: "Analyses",
    bookings: "Réservations",
    totalRevenue: "Revenu total",
    activeListings: "Annonces actives",
    totalUsers: "Total des utilisateurs",
    recentActivity: "Activité récente",
    passwordStrength: "Force du mot de passe",
    weak: "Faible",
    moderate: "Modéré",
    strong: "Fort",
    forgotPassword: "Mot de passe oublié ?",
    resetPassword: "Réinitialiser le mot de passe",
    sendResetLink: "Envoyer le lien",
    checkEmail: "Vérifiez votre email",
    resetLinkSent:
      "Nous vous avons envoyé un lien pour réinitialiser votre mot de passe.",
    enterEmail:
      "Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.",
    backToLogin: "Retour à la connexion",
    resetPasswordTitle: "Réinitialiser votre mot de passe",
    heroTitle: "Trouvez Votre Logement Étudiant Parfait",
    heroSubtitle:
      "Découvrez un logement sûr, abordable et confortable près de votre université",
    heroButton: "Explorer les annonces",
    heroStudents: "Étudiants Satisfaits",
    heroListings: "Annonces Disponibles",
    heroUniversities: "Universités Partenaires",
    aboutTitle: "À Propos d'INYUMBA",
    aboutSubtitle: "Votre Plateforme de Logement Étudiant de Confiance",
    aboutDesc1:
      "INYUMBA est la principale plateforme de logement étudiant au Rwanda, mettant en relation les étudiants avec des logements de qualité près de leurs universités.",
    aboutDesc2:
      "Nous comprenons les défis liés à la recherche d'un logement sûr et abordable en tant qu'étudiant. C'est pourquoi nous avons créé une plateforme qui rend la recherche facile et fiable.",
    aboutMission: "Notre Mission",
    aboutMissionText:
      "Offrir à chaque étudiant au Rwanda un accès à un logement sûr, abordable et confortable qui améliore son expérience académique.",
    aboutVision: "Notre Vision",
    aboutVisionText:
      "Devenir la principale plateforme de logement étudiant en Afrique, transformant la façon dont les étudiants trouvent et sécurisent leur logement.",
    aboutValues: "Nos Valeurs",
    aboutValue1: "Sécurité d'abord",
    aboutValue2: "Abordabilité",
    aboutValue3: "Confiance et Transparence",
    aboutValue4: "Réussite Étudiante",
    servicesTitle: "Nos Services",
    servicesSubtitle: "Solutions Complètes pour le Logement Étudiant",
    service1Title: "Trouver un Logement",
    service1Desc:
      "Parcourez des centaines d'options de logement étudiant vérifiées près de votre campus.",
    service2Title: "Listez Votre Propriété",
    service2Desc:
      "Les hôtes peuvent lister leurs propriétés et se connecter avec des étudiants à la recherche d'un logement.",
    service3Title: "Annonces Vérifiées",
    service3Desc:
      "Toutes les propriétés sont vérifiées pour garantir sécurité, qualité et prix équitables.",
    service4Title: "Soutien et Orientation",
    service4Desc:
      "Notre équipe est là pour vous aider à chaque étape, de la recherche à l'emménagement.",
    service5Title: "Paiements Sécurisés",
    service5Desc:
      "Traitement des paiements sûr et sécurisé avec une transparence totale.",
    service6Title: "Construction Communautaire",
    service6Desc:
      "Connectez-vous avec d'autres étudiants et construisez une communauté dans votre nouveau foyer.",
    testimonialsTitle: "Ce que Disent les Étudiants",
    testimonialsSubtitle:
      "Histoires Vraies d'Étudiants Qui Ont Trouvé Leur Logement",
    testimonial1Name: "Marie Uwimana",
    testimonial1Role: "Étudiante à UR-CAVM",
    testimonial1Text:
      "INYUMBA a rendu la recherche de logement si facile ! J'ai trouvé un excellent endroit près de mon université en quelques jours.",
    testimonial2Name: "Jean Pierre Niyonzima",
    testimonial2Role: "Étudiant à INES-Ruhengeri",
    testimonial2Text:
      "La plateforme est conviviale et les propriétés sont vérifiées. Je me suis senti en sécurité et confiant tout au long du processus.",
    testimonial3Name: "Clarisse Mukamana",
    testimonial3Role: "Étudiante à UR-Musanze",
    testimonial3Text:
      "Je recommande vivement INYUMBA à tout étudiant cherchant un logement. Le service est excellent et le personnel est serviable.",
  },
  rw: {
    brand: "INYUMBA",
    becomeHost: "Kuba umwakirizi",
    login: "Kwinjira",
    signup: "Kwiyandikisha",
    logout: "Gusohoka",
    profile: "Ibyawe",
    yourHomes: "Amazu yawe",
    wishlists: "Urutonde rw'ibyo wifuza",
    giftCards: "Ikarita z'impano",
    helpCenter: "Ikigo cy'ubufasha",
    settings: "Igenamiterere",
    welcomeBack: "Turakwinginze",
    email: "Aderesi ya imeri",
    password: "Ijambo ry'ibanga",
    confirmPassword: "Emeza ijambo ry'ibanga",
    phoneNumber: "Numero ya telefoni",
    fullName: "Izina ryose",
    createAccount: "Kora konti",
    alreadyHaveAccount: "Ufite konti?",
    dontHaveAccount: "Nta konti ufite?",
    home: "Ahabanza",
    experience: "Amazu",
    services: "Serivisi",
    about: "Ibijyanye",
    testimonials: "Ibyababwiye",
    helpCenterTitle: "Ikigo cy'ubufasha",
    becomeHostDesc: "Birakoroshye gutangira kwakira abashyitsi kandi ukungura.",
    referHost: "Vuga abandi bakire",
    findCoHost: "Shakisha uwakwakira n'uwundi",
    giftCardsTitle: "Ikarita z'impano",
    dashboard: "Ibikorwa",
    adminDashboard: "Ibikorwa by'Ubuyobozi",
    userDashboard: "Ibikorwa byanjye",
    users: "Abakoresha",
    analytics: "Ibisobanuro",
    bookings: "Ibyanditswe",
    totalRevenue: "Amahera yose",
    activeListings: "Amazu akoreshwa",
    totalUsers: "Abakoresha bose",
    recentActivity: "Ibikorwa vuba",
    passwordStrength: "Imbaraga z'ijambo ry'ibanga",
    weak: "Ntacyo",
    moderate: "Rishoboka",
    strong: "Rikomeye",
    forgotPassword: "Wibagiwe ijambo ry'ibanga?",
    resetPassword: "Hindura ijambo ry'ibanga",
    sendResetLink: "Ohereza umurongo",
    checkEmail: "Reba imeri yawe",
    resetLinkSent:
      "Twohereje umurongo wo guhindura ijambo ry'ibanga kuri imeri yawe.",
    enterEmail:
      "Andika aderesi ya imeri yawe kandi tuzohereza umurongo wo guhindura ijambo ry'ibanga.",
    backToLogin: "Garuka kwinjira",
    resetPasswordTitle: "Hindura ijambo ry'ibanga",
    heroTitle: "Shakira Aho Uzabera Byiza",
    heroSubtitle:
      "Menya amazu meza, ari mu buryo buhoro kandi ari hafi ya kaminuza yawe",
    heroButton: "Reba Amazu",
    heroStudents: "Abanyeshuri Bunze",
    heroListings: "Amazu Aboneka",
    heroUniversities: "Kaminuza Zifatanya",
    aboutTitle: "Ibijyanye na INYUMBA",
    aboutSubtitle: "Urubuga Rwizewe rw'Amazu y'Abanyeshuri",
    aboutDesc1:
      "INYUMBA ni urubuga rwambere mu Rwanda ruhuza abanyeshuri n'amazu meza ari hafi ya kaminuza zabo.",
    aboutDesc2:
      "Turumva ibibazo abanyeshuri bahura nabyo mu gushaka amazu meza kandi ari mu buryo buhoro. Ni yo mpamvu twakoze urubuga rworoshye kandi rwizewe.",
    aboutMission: "Intego Yacu",
    aboutMissionText:
      "Kugeza buri mnyeshuri mu Rwanda amazu meza, ari mu buryo buhoro kandi ari ahantu heza yo guturamo agatuma amasomo ye agenda neza.",
    aboutVision: "Icyifuzo Cyacu",
    aboutVisionText:
      "Kuba urubuga rwambere muri Afrika ruhuza abanyeshuri n'amazu, rikavugurura uburyo abanyeshuri babonera no gutura amazu.",
    aboutValues: "Indangagaciro Zacu",
    aboutValue1: "Umutekano Mbere ya Byose",
    aboutValue2: "Ishyushya Ryoheye",
    aboutValue3: "Ikwizera no Guhishura",
    aboutValue4: "Intsinzi y'Umnyeshuri",
    servicesTitle: "Serivisi Zacu",
    servicesSubtitle: "Ibikemura Byuzuye ku Mazu y'Abanyeshuri",
    service1Title: "Shakisha Aho Gutura",
    service1Desc:
      "Reba amazu menshi y' abanyeshuri yagenzuwe ari hafi ya kaminuza yawe.",
    service2Title: "Andika Icyo Utunze",
    service2Desc:
      "Abatunze bashobora kwandika amazu yabo no guhuza n'abanyeshuri bashaka aho gutura.",
    service3Title: "Amazu Yagenzuwe",
    service3Desc:
      "Amazu yose aragenzurwa kugira ngo habeho umutekano, ubwiza, n'ibiciro bikwiye.",
    service4Title: "Ubufasha n'Ubuyobozi",
    service4Desc:
      "Itsinda ryacu rihagurukiye gufasha buri ntambwe, kuva mu gushaka no kwinjira mu nzu.",
    service5Title: "Kwirigira Mu Mutekano",
    service5Desc: "Kwirigira gukorwa mu mutekano kandi byihishijwe.",
    service6Title: "Gubaka Umuryango",
    service6Desc:
      "Huza n'abandi banyeshuri kandi ubake umuryango mu nzu yawe nshya.",
    testimonialsTitle: "Abanyeshuri Bavuga Bati",
    testimonialsSubtitle: "Inkuru Nyakuri z'Abanyeshuri Babonye Aho Gutura",
    testimonial1Name: "Marie Uwimana",
    testimonial1Role: "Umnyeshuri muri UR-CAVM",
    testimonial1Text:
      "INYUMBA yoroshye cyane gushaka aho gutura! Nabonye ahantu heza hafi ya kaminuza yanjye mu minsi mike.",
    testimonial2Name: "Jean Pierre Niyonzima",
    testimonial2Role: "Umnyeshuri muri INES-Ruhengeri",
    testimonial2Text:
      "Urubuga rworoshye gukoresha kandi amazu aragenzuwe. Numvise umutekano kandi nizeye mu gihe cyose.",
    testimonial3Name: "Clarisse Mukamana",
    testimonial3Role: "Umnyeshuri muri UR-Musanze",
    testimonial3Text:
      "Nsaba abanyeshuri bose bashaka aho gutura gukoresha INYUMBA. Serivisi nziza kandi abakozi barafasha.",
  },
};

type Language = "en" | "fr" | "rw";

// ===================== HELPER FUNCTIONS =====================
const getLanguageFromCookies = (): Language => {
  const lang = Cookies.get("language") as Language;
  return lang || "en";
};

export const getTranslations = () => {
  const lang = getLanguageFromCookies();
  return translations[lang];
};

export type { Language };
export { translations };

// ===================== NAVIGATION LINKS =====================
const navLinks = [
  { id: "home", path: "/", label: "home" },
  { id: "experience", path: "/house/rent", label: "experience" },
  { id: "services", path: "/services", label: "services" },
  { id: "testimonials", path: "/testimonials", label: "testimonials" },
  { id: "about", path: "/about", label: "about" },
];

// ===================== STATUS MODAL COMPONENT =====================
interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "success" | "error" | "info";
  title: string;
  message: string;
  details?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

const StatusModal: React.FC<StatusModalProps> = ({
  isOpen,
  onClose,
  type,
  title,
  message,
  details,
  onRetry,
  retryLabel = "Try Again",
}) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <CheckCircleOutlineRounded className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-green-500" />
        );
      case "error":
        return (
          <ErrorOutlineOutlined className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-red-500" />
        );
      case "info":
        return (
          <InfoIcon className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-blue-500" />
        );
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
            className="fixed inset-0 z-[201] flex items-center justify-center p-3 sm:p-4"
          >
            <div
              className={`w-full max-w-xs sm:max-w-sm md:max-w-md rounded-2xl shadow-2xl border ${colors.border} ${colors.bg} relative overflow-hidden`}
            >
              <AnimatedBackground />
              <div className="relative z-10 p-4 sm:p-5 md:p-6">
                <div className="flex flex-col items-center text-center">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="mb-3 sm:mb-4"
                  >
                    {getIcon()}
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`text-lg sm:text-xl md:text-2xl font-bold ${colors.text} mb-1 sm:mb-2`}
                  >
                    {title}
                  </motion.h3>

                  {/* Message */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4"
                  >
                    {message}
                  </motion.p>

                  {/* Details */}
                  {details && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-white/50 rounded-lg p-2 sm:p-3 mb-3 sm:mb-4 w-full text-xs sm:text-sm text-gray-600 max-h-32 overflow-y-auto"
                    >
                      {details}
                    </motion.div>
                  )}

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onClose}
                      className={`px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-lg text-white font-medium transition-all ${colors.button} shadow-lg text-xs sm:text-sm flex-1`}
                    >
                      Got it
                    </motion.button>
                    {onRetry && type === "error" && (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onRetry}
                        className="px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-lg text-white font-medium transition-all bg-gray-600 hover:bg-gray-700 shadow-lg text-xs sm:text-sm flex-1"
                      >
                        {retryLabel}
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ===================== FORGET PASSWORD MODAL =====================
interface ForgetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToLogin: () => void;
}

const ForgetPasswordModal: React.FC<ForgetPasswordModalProps> = ({
  isOpen,
  onClose,
  onBackToLogin,
}) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const t = getTranslations();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (value.length > 0) {
      setIsEmailValid(validateEmail(value));
    } else {
      setIsEmailValid(null);
    }
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await API.post("/auth/forgot-password", { email });

      if (response.data.success) {
        setEmailSent(true);
        setError(null);
      } else {
        setError(response.data.message || "Failed to send reset link");
      }
    } catch (err: any) {
      if (err.response?.data) {
        setError(err.response.data.message || "Failed to send reset link");
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setEmailSent(false);
    setError(null);
    setIsEmailValid(null);
    onClose();
  };

  const handleBackToLogin = () => {
    setEmail("");
    setEmailSent(false);
    setError(null);
    setIsEmailValid(null);
    onBackToLogin();
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]"
            onClick={handleClose}
          />
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
            className="fixed inset-0 z-[151] flex items-center justify-center p-3 sm:p-4"
          >
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md max-h-[90vh] rounded-2xl shadow-2xl bg-white relative overflow-hidden">
              <AnimatedBackground />
              <div className="sticky top-0 px-4 sm:px-5 md:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl relative z-10">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <LockIcon className="text-[#FF385C] w-4 h-4 sm:w-5 sm:h-5" />
                  <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
                    {t.resetPasswordTitle}
                  </h2>
                </div>
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                >
                  <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              </div>

              <div className="p-4 sm:p-5 md:p-6 relative z-10">
                {!emailSent ? (
                  <form onSubmit={handleSubmit}>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                      {t.enterEmail}
                    </p>

                    <div className="mb-4 sm:mb-5 md:mb-6">
                      <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 text-gray-700">
                        {t.email}
                      </label>
                      <div
                        className={`relative rounded-lg border ${
                          isEmailValid === true
                            ? "border-green-500"
                            : isEmailValid === false
                              ? "border-red-500"
                              : "border-gray-300"
                        } bg-white focus-within:border-[#FF385C] transition-colors duration-300`}
                      >
                        <EmailIcon
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                            isEmailValid === true
                              ? "text-green-500"
                              : isEmailValid === false
                                ? "text-red-500"
                                : "text-gray-400"
                          }`}
                        />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => handleEmailChange(e.target.value)}
                          className="w-full pl-9 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-2.5 rounded-lg outline-none text-xs sm:text-sm bg-white text-gray-900 placeholder-gray-400"
                          placeholder="you@example.com"
                          disabled={loading}
                        />
                        {isEmailValid === true && (
                          <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                        )}
                        {isEmailValid === false && (
                          <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                        )}
                      </div>
                      {error && (
                        <p className="text-xs text-red-500 mt-1">{error}</p>
                      )}
                      {isEmailValid === true && (
                        <p className="text-xs text-green-500 mt-1">
                          ✓ Valid email address
                        </p>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading || !isEmailValid}
                      className={`w-full py-2.5 sm:py-3 rounded-lg font-medium relative overflow-hidden transition-colors text-xs sm:text-sm ${
                        loading || !isEmailValid
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#FF385C] hover:bg-[#E31C5F]"
                      } text-white`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                        {loading ? (
                          <>
                            <svg
                              className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <EmailIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            {t.sendResetLink}
                          </>
                        )}
                      </span>
                    </motion.button>

                    <button
                      type="button"
                      onClick={handleBackToLogin}
                      className="w-full text-center text-xs sm:text-sm mt-3 sm:mt-4 text-gray-500 hover:text-[#FF385C] transition-colors"
                    >
                      ← {t.backToLogin}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-3 sm:py-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, type: "spring" }}
                    >
                      <CheckCircleOutlineRounded className="w-16 h-16 sm:w-20 sm:h-20 text-green-500 mx-auto mb-3 sm:mb-4" />
                    </motion.div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
                      {t.checkEmail}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
                      {t.resetLinkSent}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 break-all">
                      {email}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleBackToLogin}
                      className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-lg bg-[#FF385C] text-white font-medium hover:bg-[#E31C5F] transition-colors text-xs sm:text-sm"
                    >
                      {t.backToLogin}
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ===================== NAVBAR COMPONENT =====================
export const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isForgetPasswordOpen, setIsForgetPasswordOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("user");
  const [, setUserId] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userCreatedAt, setUserCreatedAt] = useState("");
  const [, setUserData] = useState<any>(null);

  // Status Modal state
  const [statusModal, setStatusModal] = useState<{
    isOpen: boolean;
    type: "success" | "error" | "info";
    title: string;
    message: string;
    details?: string;
    onRetry?: () => void;
    retryLabel?: string;
  }>({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
    details: "",
  });

  // Initialize language from cookies
  const [language, setLanguage] = useState<Language>(() => {
    return getLanguageFromCookies();
  });

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginErrors, setLoginErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  // Register form state
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerErrors, setRegisterErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [passwordStrength, setPasswordStrength] = useState<
    "weak" | "moderate" | "strong" | null
  >(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Email validation state for both forms
  const [isLoginEmailValid, setIsLoginEmailValid] = useState<boolean | null>(
    null,
  );
  const [isRegisterEmailValid, setIsRegisterEmailValid] = useState<
    boolean | null
  >(null);
  const [isPhoneValid, setIsPhoneValid] = useState<boolean | null>(null);

  const languageMenuRef = useRef<HTMLDivElement>(null);
  const t = translations[language];
  const location = useLocation();

  // Navigation handler - forces full page refresh
  const navigateTo = (path: string) => {
    if (location.pathname !== path) {
      window.location.href = path;
    }
  };

  // Scroll refs for register form
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const fieldRefs = {
    name: useRef<HTMLDivElement>(null),
    email: useRef<HTMLDivElement>(null),
    phone: useRef<HTMLDivElement>(null),
    password: useRef<HTMLDivElement>(null),
    confirmPassword: useRef<HTMLDivElement>(null),
  };
  const fieldKeys = ["name", "email", "phone", "password", "confirmPassword"];
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToNextField = () => {
    const nextIndex = (currentFieldIndex + 1) % fieldKeys.length;
    setCurrentFieldIndex(nextIndex);
    const targetRef = fieldRefs[fieldKeys[nextIndex] as keyof typeof fieldRefs];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Handle click outside menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target as Node)
      ) {
        setIsLanguageMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLoginOpen(false);
        setIsRegisterOpen(false);
        setIsLanguageMenuOpen(false);
        setIsDashboardOpen(false);
        setIsUserModalOpen(false);
        setIsForgetPasswordOpen(false);
        setStatusModal((prev) => ({ ...prev, isOpen: false }));
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // ===================== CHECK SESSION - USE LOCALSTORAGE ONLY =====================
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    
    if (token && user) {
      try {
        const userData = JSON.parse(user);
        setIsLoggedIn(true);
        setUserName(userData.name || "User");
        setUserEmail(userData.email || "");
        setUserRole(userData.role || "user");
        setUserId(userData.id || userData._id || "");
        setUserPhone(userData.phone || "");
        setUserCreatedAt(userData.createdAt || userData.created_at || "");
        setUserData(userData);
        
        // No API call needed - using cached data only
        console.log("User session restored from localStorage");
      } catch (error) {
        console.error("Error parsing user data:", error);
        // Clear invalid data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Listen for cookie changes (for other tabs/windows)
  useEffect(() => {
    const handleCookieChange = () => {
      const newLang = getLanguageFromCookies();
      if (newLang !== language) {
        setLanguage(newLang);
      }
    };

    const interval = setInterval(handleCookieChange, 1000);
    return () => clearInterval(interval);
  }, [language]);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(?:\+250|0)?[7-9][0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const checkPasswordStrength = (
    password: string,
  ): "weak" | "moderate" | "strong" | null => {
    if (!password || password.length === 0) return null;
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    if (score <= 2) return "weak";
    if (score <= 4) return "moderate";
    return "strong";
  };

  const getPasswordStrengthColor = (
    strength: "weak" | "moderate" | "strong" | null,
  ): string => {
    if (!strength) return "#e5e7eb";
    switch (strength) {
      case "weak":
        return "#ef4444";
      case "moderate":
        return "#f59e0b";
      case "strong":
        return "#22c55e";
    }
  };

  const getPasswordStrengthLabel = (
    strength: "weak" | "moderate" | "strong" | null,
  ): string => {
    if (!strength) return "";
    switch (strength) {
      case "weak":
        return t.weak;
      case "moderate":
        return t.moderate;
      case "strong":
        return t.strong;
    }
  };

  const getPasswordStrengthIcon = (
    strength: "weak" | "moderate" | "strong" | null,
  ) => {
    if (!strength) return null;
    switch (strength) {
      case "weak":
        return (
          <WarningIcon
            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
            style={{ color: "#ef4444" }}
          />
        );
      case "moderate":
        return (
          <SecurityIcon
            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
            style={{ color: "#f59e0b" }}
          />
        );
      case "strong":
        return (
          <VerifiedIcon
            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
            style={{ color: "#22c55e" }}
          />
        );
    }
  };

  const validateLoginForm = (): boolean => {
    const errors: { email?: string; password?: string } = {};
    if (!loginEmail) {
      errors.email = "Email is required";
    } else if (!validateEmail(loginEmail)) {
      errors.email = "Please enter a valid email address";
    }
    if (!loginPassword) {
      errors.password = "Password is required";
    } else if (loginPassword.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateRegisterForm = (): boolean => {
    const errors: {
      name?: string;
      email?: string;
      phone?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    if (!registerName) {
      errors.name = "Full name is required";
    } else if (registerName.length < 2) {
      errors.name = "Name must be at least 2 characters";
    }
    if (!registerEmail) {
      errors.email = "Email is required";
    } else if (!validateEmail(registerEmail)) {
      errors.email = "Please enter a valid email address";
    }
    if (!registerPhone) {
      errors.phone = "Phone number is required";
    } else if (!validatePhone(registerPhone)) {
      errors.phone =
        "Please enter a valid Rwandan phone number (ex: 0788123456 or +250788123456)";
    }
    if (!registerPassword) {
      errors.password = "Password is required";
    } else if (registerPassword.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!registerConfirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (registerPassword !== registerConfirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    setRegisterErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isRegisterFormValid = (): boolean => {
    return (
      registerName.length >= 2 &&
      registerEmail.length > 0 &&
      validateEmail(registerEmail) &&
      registerPhone.length > 0 &&
      validatePhone(registerPhone) &&
      registerPassword.length >= 6 &&
      registerConfirmPassword.length >= 6 &&
      registerPassword === registerConfirmPassword &&
      passwordStrength !== null &&
      passwordStrength !== "weak"
    );
  };

  const isLoginFormValid = (): boolean => {
    return (
      loginEmail.length > 0 &&
      validateEmail(loginEmail) &&
      loginPassword.length >= 6
    );
  };

  const handleDashboardNavigation = () => {
    if (userRole === "admin") {
      navigateTo("/dashboard");
    } else if (userRole === "host") {
      navigateTo("/host/dashboard");
    } else if (userRole === "manager") {
      navigateTo("/manager/dashboard");
    } else {
      navigateTo("/user/dashboard");
    }
  };

  // ===================== LOGIN HANDLER =====================
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLoginForm()) return;
    setLoginLoading(true);
    try {
      const response = await API.post("/auth/login", {
        email: loginEmail,
        password: loginPassword,
      });

      if (response.data.success) {
        const { user, token } = response.data;

        setIsLoggedIn(true);
        setUserName(user.name || "User");
        setUserEmail(user.email || "");
        setUserRole(user.role || "user");
        setUserId(user.id || user._id || "");
        setUserPhone(user.phone || "");
        setUserCreatedAt(user.createdAt || user.created_at || "");
        setUserData(user);
        setIsLoginOpen(false);

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setLoginEmail("");
        setLoginPassword("");
        setLoginErrors({});

        setStatusModal({
          isOpen: true,
          type: "success",
          title: `🎉 Welcome ${user.name}!`,
          message: "You have successfully logged in.",
          details: `Email: ${user.email} | Role: ${user.role}`,
        });

        // Navigate based on role with full refresh
        setTimeout(() => {
          if (user.role === "admin") {
            window.location.href = "/dashboard";
          } else if (user.role === "host") {
            window.location.href = "/host/dashboard";
          } else if (user.role === "manager") {
            window.location.href = "/manager/dashboard";
          } else {
            window.location.href = "/user/dashboard";
          }
        }, 1500);
      } else {
        setStatusModal({
          isOpen: true,
          type: "error",
          title: "❌ Login Failed",
          message: response.data.message || "Invalid email or password",
          details: "Please check your credentials and try again.",
          onRetry: () => handleLogin(e),
          retryLabel: "Retry",
        });
      }
    } catch (error: any) {
      const errorMessage = error.message || "Login failed. Please try again.";
      const errorDetails = error.details || "Please try again or contact support if the issue persists.";
      
      setStatusModal({
        isOpen: true,
        type: "error",
        title: "❌ Login Error",
        message: errorMessage,
        details: errorDetails,
        onRetry: () => handleLogin(e),
        retryLabel: "Retry",
      });
      console.error("Login error:", error);
    } finally {
      setLoginLoading(false);
    }
  };

  // ===================== REGISTER HANDLER =====================
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRegisterForm()) return;
    if (passwordStrength === "weak") {
      setStatusModal({
        isOpen: true,
        type: "error",
        title: "⚠️ Weak Password",
        message: "Please choose a stronger password for better security.",
        details:
          "Your password must be at least 8 characters with uppercase, lowercase, numbers, and special characters.",
      });
      return;
    }
    setRegisterLoading(true);
    try {
      const response = await API.post("/auth/register", {
        name: registerName,
        email: registerEmail,
        phone: registerPhone,
        password: registerPassword,
        confirmPassword: registerConfirmPassword,
      });

      if (response.data.success) {
        setStatusModal({
          isOpen: true,
          type: "success",
          title: "🎊 Account Created!",
          message: "Your account has been created successfully.",
          details: `Welcome, ${registerName}! Please login to continue.`,
        });

        setIsRegisterOpen(false);
        setRegisterName("");
        setRegisterEmail("");
        setRegisterPhone("");
        setRegisterPassword("");
        setRegisterConfirmPassword("");
        setRegisterErrors({});
        setPasswordStrength(null);

        // Open login modal after a short delay
        setTimeout(() => {
          setIsLoginOpen(true);
        }, 500);
      } else {
        setStatusModal({
          isOpen: true,
          type: "error",
          title: "❌ Registration Failed",
          message: response.data.message || "Registration failed",
          details: "Please check your information and try again.",
          onRetry: () => handleRegister(e),
          retryLabel: "Retry",
        });
      }
    } catch (error: any) {
      const errorMessage = error.message || "Registration failed. Please try again.";
      const errorDetails = error.details || "Please check your information and try again.";
      
      setStatusModal({
        isOpen: true,
        type: "error",
        title: "❌ Registration Failed",
        message: errorMessage,
        details: errorDetails,
        onRetry: () => handleRegister(e),
        retryLabel: "Retry",
      });
      console.error("Register error:", error);
    } finally {
      setRegisterLoading(false);
    }
  };

  // ===================== LOGOUT HANDLER =====================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName("Guest");
    setUserEmail("");
    setUserRole("user");
    setUserId("");
    setUserPhone("");
    setUserCreatedAt("");
    setUserData(null);

    setStatusModal({
      isOpen: true,
      type: "info",
      title: "👋 Logged Out",
      message: "You have been logged out successfully.",
      details: "See you again soon!",
    });

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  // ===================== LANGUAGE CHANGE HANDLER =====================
  const handleLanguageChange = (lang: Language) => {
    Cookies.set("language", lang, { expires: 365, path: "/" });
    setLanguage(lang);
    setIsLanguageMenuOpen(false);

    const langName =
      lang === "en" ? "English" : lang === "fr" ? "Français" : "Kinyarwanda";

    setStatusModal({
      isOpen: true,
      type: "info",
      title: "🌍 Language Changed",
      message: `Language changed to ${langName}`,
      details: "The page will refresh to apply the new language.",
    });

    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  // Email validation handlers
  const handleLoginEmailChange = (email: string) => {
    setLoginEmail(email);
    if (email.length > 0) {
      setIsLoginEmailValid(validateEmail(email));
    } else {
      setIsLoginEmailValid(null);
    }
    if (loginErrors.email) {
      setLoginErrors({ ...loginErrors, email: undefined });
    }
  };

  const handleRegisterEmailChange = (email: string) => {
    setRegisterEmail(email);
    if (email.length > 0) {
      setIsRegisterEmailValid(validateEmail(email));
    } else {
      setIsRegisterEmailValid(null);
    }
    if (registerErrors.email) {
      setRegisterErrors({ ...registerErrors, email: undefined });
    }
  };

  const handlePhoneChange = (phone: string) => {
    setRegisterPhone(phone);
    if (phone.length > 0) {
      setIsPhoneValid(validatePhone(phone));
    } else {
      setIsPhoneValid(null);
    }
    if (registerErrors.phone) {
      setRegisterErrors({ ...registerErrors, phone: undefined });
    }
  };

  const handlePasswordChange = (password: string) => {
    setRegisterPassword(password);
    const strength = checkPasswordStrength(password);
    setPasswordStrength(strength);
    if (registerErrors.password) {
      setRegisterErrors({ ...registerErrors, password: undefined });
    }
    if (registerConfirmPassword && password !== registerConfirmPassword) {
      setRegisterErrors({
        ...registerErrors,
        confirmPassword: "Passwords do not match",
      });
    } else if (
      registerConfirmPassword &&
      password === registerConfirmPassword
    ) {
      setRegisterErrors({ ...registerErrors, confirmPassword: undefined });
    }
  };

  const handleConfirmPasswordChange = (confirmPassword: string) => {
    setRegisterConfirmPassword(confirmPassword);
    if (registerPassword && registerPassword !== confirmPassword) {
      setRegisterErrors({
        ...registerErrors,
        confirmPassword: "Passwords do not match",
      });
    } else if (registerPassword && registerPassword === confirmPassword) {
      setRegisterErrors({ ...registerErrors, confirmPassword: undefined });
    }
  };

  // Dashboard data
  const dashboardStats = [
    {
      label: t.totalRevenue,
      value: "RWF 2,450,000",
      icon: <TrendingUpIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />,
      change: "+23%",
    },
    {
      label: t.activeListings,
      value: "156",
      icon: <HotelIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />,
      change: "+12",
    },
    {
      label: "Total Students",
      value: "3,847",
      icon: <PeopleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />,
      change: "+18%",
    },
    {
      label: t.bookings,
      value: "2,134",
      icon: (
        <CalendarTodayIcon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
      ),
      change: "+31%",
    },
  ];

  const recentActivities = [
    {
      user: "Student from INES-Ruhengeri",
      action: "Booked a room in Muhoza",
      time: "5 min ago",
      icon: <StarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500" />,
    },
    {
      user: "Host in Cyabararika",
      action: "Listed a new house for students",
      time: "23 min ago",
      icon: <HotelIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />,
    },
    {
      user: "Student from UR-CAVM",
      action: "Left a 5-star review",
      time: "1 hour ago",
      icon: <StarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500" />,
    },
    {
      user: "Host in Kigombe",
      action: "Updated house details and price",
      time: "3 hours ago",
      icon: (
        <SettingsIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
      ),
    },
  ];

  // Animation variants
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

  const menuVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.03, transition: { duration: 0.2 } },
  };

  const getDashboardLabel = () => {
    if (userRole === "admin") return t.adminDashboard;
    else if (userRole === "host") return t.dashboard;
    else if (userRole === "manager") return "Dashboard";
    else return t.userDashboard;
  };

  const getDashboardIcon = () => {
    if (userRole === "admin")
      return <AdminPanelSettingsIcon className="w-4 h-4" />;
    else if (userRole === "host") return <HotelIcon className="w-4 h-4" />;
    else if (userRole === "manager")
      return <DashboardIcon className="w-4 h-4" />;
    else return <DashboardIcon className="w-4 h-4" />;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // ===================== RENDER =====================
  return (
    <>
      {/* Status Modal */}
      <StatusModal
        isOpen={statusModal.isOpen}
        onClose={() => setStatusModal((prev) => ({ ...prev, isOpen: false }))}
        type={statusModal.type}
        title={statusModal.title}
        message={statusModal.message}
        details={statusModal.details}
        onRetry={statusModal.onRetry}
        retryLabel={statusModal.retryLabel}
      />

      {/* Forget Password Modal */}
      <ForgetPasswordModal
        isOpen={isForgetPasswordOpen}
        onClose={() => setIsForgetPasswordOpen(false)}
        onBackToLogin={() => {
          setIsForgetPasswordOpen(false);
          setIsLoginOpen(true);
        }}
      />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="sticky top-0 z-50 border-b bg-white border-gray-200 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-18 lg:h-20">
            {/* Logo - Left */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2 cursor-pointer"
              onClick={() => navigateTo("/")}
            >
              <div className="text-[#FF385C]">
                <InyumbaLogo className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />
              </div>
              <span className="font-bold text-[#1B4E91] tracking-tight hidden xs:inline text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                INYUMBA
              </span>
              <span className="font-bold text-[#1B4E91] tracking-tight xs:hidden text-sm">
                INYUMBA
              </span>
            </motion.div>

            {/* Main Navigation - Desktop */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <motion.div
                  key={link.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => navigateTo(link.path)}
                    className="px-3 xl:px-4 py-1.5 xl:py-2 rounded-full text-xs xl:text-sm font-medium transition-colors text-gray-700 hover:bg-gray-100 hover:text-[#FF385C]"
                  >
                    {t[link.label as keyof typeof t]}
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Mobile Navigation Menu Toggle */}
            <div className="flex lg:hidden items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const mobileMenu = document.getElementById("mobile-nav-menu");
                  if (mobileMenu) {
                    mobileMenu.classList.toggle("hidden");
                  }
                }}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 text-gray-700"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </motion.button>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 xl:gap-3 flex-shrink-0">
              {/* Language Menu */}
              <div className="relative" ref={languageMenuRef}>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  className="p-1.5 sm:p-2 rounded-full transition-colors hover:bg-gray-100 text-gray-700"
                >
                  <LanguageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>

                <AnimatePresence>
                  {isLanguageMenuOpen && (
                    <motion.div
                      variants={menuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-1 sm:mt-2 w-40 sm:w-44 md:w-48 rounded-xl shadow-lg border bg-white border-gray-100 py-1.5 sm:py-2"
                    >
                      {["en", "fr", "rw"].map((lang) => (
                        <button
                          key={lang}
                          onClick={() => handleLanguageChange(lang as Language)}
                          className={`w-full text-left px-3 sm:px-4 py-1.5 sm:py-2.5 text-xs sm:text-sm flex items-center gap-2 sm:gap-3 transition-colors ${
                            language === lang
                              ? "text-[#FF385C] font-semibold"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <span className="text-base sm:text-lg">
                            {lang === "en" ? "🇬🇧" : lang === "fr" ? "🇫🇷" : "🇷🇼"}
                          </span>
                          <span className="truncate">
                            {lang === "en"
                              ? "English"
                              : lang === "fr"
                                ? "Français"
                                : "Kinyarwanda"}
                          </span>
                          {language === lang && (
                            <CheckCircleIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-auto flex-shrink-0" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Avatar / Login / Register Buttons */}
              {isLoggedIn ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsUserModalOpen(true)}
                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#FF385C]/10 hover:bg-[#FF385C]/20 transition-colors"
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-[#FF385C] text-white flex items-center justify-center text-xs sm:text-sm font-semibold">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden xs:inline text-xs sm:text-sm font-medium text-gray-700 max-w-[60px] sm:max-w-[80px] truncate">
                      {userName}
                    </span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden md:block text-xs sm:text-sm font-medium px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full transition-all text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 whitespace-nowrap"
                    onClick={handleDashboardNavigation}
                  >
                    {getDashboardIcon()}
                    <span className="ml-1 hidden lg:inline">
                      {getDashboardLabel()}
                    </span>
                  </motion.button>

                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "#dc2626",
                      color: "white",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden sm:block text-xs sm:text-sm font-medium px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full transition-all text-gray-700 hover:bg-red-600 hover:text-white border border-gray-200 hover:border-red-600 whitespace-nowrap"
                    onClick={handleLogout}
                  >
                    <LogoutIcon className="w-3 h-3 inline mr-0.5 sm:mr-1" />
                    <span className="hidden md:inline">{t.logout}</span>
                    <span className="md:hidden">Logout</span>
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "#FF385C",
                      color: "white",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden sm:block text-xs sm:text-sm font-medium px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full transition-all text-gray-700 hover:bg-[#FF385C] hover:text-white border border-gray-200 hover:border-[#FF385C] whitespace-nowrap"
                    onClick={() => setIsLoginOpen(true)}
                  >
                    <LoginIcon className="w-3 h-3 inline mr-0.5 sm:mr-1" />
                    {t.login}
                  </motion.button>
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "#1B4E91",
                      color: "white",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden sm:block text-xs sm:text-sm font-medium px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full transition-all text-gray-700 hover:bg-[#1B4E91] hover:text-white border border-gray-200 hover:border-[#1B4E91] whitespace-nowrap"
                    onClick={() => setIsRegisterOpen(true)}
                  >
                    <PersonAddIcon className="w-3 h-3 inline mr-0.5 sm:mr-1" />
                    {t.signup}
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu */}
      <div
        id="mobile-nav-menu"
        className="hidden lg:hidden bg-white border-b border-gray-200 shadow-lg"
      >
        <div className="px-3 sm:px-4 py-2 sm:py-3 space-y-0.5 sm:space-y-1">
          {navLinks.map((link) => (
            <motion.div key={link.id} whileHover={{ x: 5 }}>
              <button
                onClick={() => {
                  navigateTo(link.path);
                  const menu = document.getElementById("mobile-nav-menu");
                  if (menu) menu.classList.add("hidden");
                }}
                className="block w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-[#FF385C] transition-colors"
              >
                {t[link.label as keyof typeof t]}
              </button>
            </motion.div>
          ))}
          <div className="pt-2 border-t border-gray-200 space-y-0.5 sm:space-y-1">
            {isLoggedIn ? (
              <>
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => {
                    setIsUserModalOpen(true);
                    const menu = document.getElementById("mobile-nav-menu");
                    if (menu) menu.classList.add("hidden");
                  }}
                  className="w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm font-medium text-[#FF385C] hover:bg-[#FF385C]/5 transition-colors flex items-center gap-2"
                >
                  <AccountCircleIcon className="w-4 h-4" />
                  {t.profile}
                </motion.button>
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => {
                    const menu = document.getElementById("mobile-nav-menu");
                    if (menu) menu.classList.add("hidden");
                    handleDashboardNavigation();
                  }}
                  className="w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm font-medium text-[#FF385C] hover:bg-[#FF385C]/5 transition-colors flex items-center gap-2"
                >
                  {getDashboardIcon()}
                  {getDashboardLabel()}
                </motion.button>
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => {
                    const menu = document.getElementById("mobile-nav-menu");
                    if (menu) menu.classList.add("hidden");
                    handleLogout();
                  }}
                  className="w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                >
                  <LogoutIcon className="w-4 h-4" />
                  {t.logout}
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => {
                    const menu = document.getElementById("mobile-nav-menu");
                    if (menu) menu.classList.add("hidden");
                    setIsLoginOpen(true);
                  }}
                  className="w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm font-medium text-[#FF385C] hover:bg-[#FF385C]/5 transition-colors flex items-center gap-2"
                >
                  <LoginIcon className="w-4 h-4" />
                  {t.login}
                </motion.button>
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => {
                    const menu = document.getElementById("mobile-nav-menu");
                    if (menu) menu.classList.add("hidden");
                    setIsRegisterOpen(true);
                  }}
                  className="w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm font-medium text-[#1B4E91] hover:bg-[#1B4E91]/5 transition-colors flex items-center gap-2"
                >
                  <PersonAddIcon className="w-4 h-4" />
                  {t.signup}
                </motion.button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ==================== LOGIN MODAL ==================== */}
      <AnimatePresence>
        {isLoginOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setIsLoginOpen(false)}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-3 sm:p-4"
            >
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md max-h-[90vh] rounded-2xl shadow-2xl bg-white relative overflow-hidden">
                <AnimatedBackground />
                <div className="sticky top-0 px-4 sm:px-5 md:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl relative z-10">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <AutoAwesomeIcon className="text-[#FF385C] w-4 h-4 sm:w-5 sm:h-5" />
                    <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
                      {t.welcomeBack}
                    </h2>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsLoginOpen(false)}
                    className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                </div>

                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="overflow-y-auto max-h-[calc(90vh-80px)]"
                >
                  <form
                    onSubmit={handleLogin}
                    className="p-4 sm:p-5 md:p-6 relative z-10"
                  >
                    <div className="mb-3 sm:mb-4">
                      <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 text-gray-700">
                        {t.email}
                      </label>
                      <div
                        className={`relative rounded-lg border ${
                          isLoginEmailValid === true
                            ? "border-green-500"
                            : isLoginEmailValid === false
                              ? "border-red-500"
                              : "border-gray-300"
                        } bg-white focus-within:border-[#FF385C] transition-colors duration-300`}
                      >
                        <EmailIcon
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                            isLoginEmailValid === true
                              ? "text-green-500"
                              : isLoginEmailValid === false
                                ? "text-red-500"
                                : "text-gray-400"
                          }`}
                        />
                        <input
                          type="email"
                          required
                          value={loginEmail}
                          onChange={(e) =>
                            handleLoginEmailChange(e.target.value)
                          }
                          className="w-full pl-9 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-2.5 rounded-lg outline-none text-xs sm:text-sm bg-white text-gray-900 placeholder-gray-400"
                          placeholder="you@example.com"
                        />
                        {isLoginEmailValid === true && (
                          <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                        )}
                        {isLoginEmailValid === false && (
                          <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                        )}
                      </div>
                      {loginErrors.email && (
                        <p className="text-xs text-red-500 mt-1">
                          {loginErrors.email}
                        </p>
                      )}
                      {isLoginEmailValid === true && (
                        <p className="text-xs text-green-500 mt-1">
                          ✓ Valid email address
                        </p>
                      )}
                    </div>
                    <div className="mb-3 sm:mb-4">
                      <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 text-gray-700">
                        {t.password}
                      </label>
                      <div className="relative rounded-lg border border-gray-300 bg-white focus-within:border-[#FF385C] transition-colors duration-300">
                        <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={loginPassword}
                          onChange={(e) => {
                            setLoginPassword(e.target.value);
                            if (loginErrors.password) {
                              setLoginErrors({
                                ...loginErrors,
                                password: undefined,
                              });
                            }
                          }}
                          className="w-full pl-9 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-2.5 rounded-lg outline-none text-xs sm:text-sm bg-white text-gray-900 placeholder-gray-400"
                          placeholder="••••••••"
                          minLength={6}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                          ) : (
                            <VisibilityIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                          )}
                        </button>
                      </div>
                      {loginErrors.password && (
                        <p className="text-xs text-red-500 mt-1">
                          {loginErrors.password}
                        </p>
                      )}
                    </div>

                    {/* Forgot Password Link */}
                    <div className="text-right mb-3 sm:mb-4">
                      <button
                        type="button"
                        onClick={() => {
                          setIsLoginOpen(false);
                          setIsForgetPasswordOpen(true);
                        }}
                        className="text-xs sm:text-sm text-[#FF385C] hover:underline font-medium"
                      >
                        {t.forgotPassword}
                      </button>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loginLoading || !isLoginFormValid()}
                      className={`w-full py-2.5 sm:py-3 rounded-lg font-medium relative overflow-hidden group transition-colors text-xs sm:text-sm ${
                        loginLoading || !isLoginFormValid()
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#FF385C] hover:bg-[#E31C5F]"
                      } text-white`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                        {loginLoading ? (
                          <>
                            <svg
                              className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Logging in...
                          </>
                        ) : (
                          <>
                            <LoginIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            {t.login}
                          </>
                        )}
                      </span>
                    </motion.button>
                    <p className="text-center text-xs sm:text-sm mt-3 sm:mt-4 text-gray-500">
                      {t.dontHaveAccount}{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setIsLoginOpen(false);
                          setIsRegisterOpen(true);
                        }}
                        className="text-[#FF385C] font-medium hover:underline"
                      >
                        {t.signup}
                      </button>
                    </p>
                    <div className="mt-4 sm:mt-6 flex justify-center gap-3 sm:gap-4">
                      <Link
                        to={
                          "https://web.facebook.com/profile.php?id=61593907921662"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                      >
                        <FacebookIcon className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-blue-600 text-blue-600" />
                      </Link>
                      <Link
                        to={"https://www.instagram.com/inyumbarental/"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                      >
                        <InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-pink-600 text-pink-600" />
                      </Link>
                      <Link
                        to={"https://x.com/inyumbarental"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                      >
                        <TwitterIcon className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-blue-600 text-indigo-400" />
                      </Link>
                      <Link
                        to={
                          "https://www.youtube.com/channel/UCUe_TGKGrXPhit85u5u9bDA"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="YouTube"
                      >
                        <YouTubeIcon className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-red-300 text-red-300" />
                      </Link>
                      <Link
                        to={
                          "https://www.linkedin.com/in/inyumba-rental-998031432?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                      >
                        <LinkedIn className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-red-300 text-red-300" />
                      </Link>
                    </div>
                  </form>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ==================== REGISTER MODAL ==================== */}
      <AnimatePresence>
        {isRegisterOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setIsRegisterOpen(false)}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-3 sm:p-4"
            >
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md max-h-[90vh] rounded-2xl shadow-2xl bg-white relative overflow-hidden">
                <AnimatedBackground />
                <div className="sticky top-0 px-4 sm:px-5 md:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl relative z-10">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <AutoAwesomeIcon className="text-[#FF385C] w-4 h-4 sm:w-5 sm:h-5" />
                    <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
                      {t.createAccount}
                    </h2>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsRegisterOpen(false)}
                    className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                </div>

                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="overflow-y-auto max-h-[calc(90vh-80px)] scroll-smooth"
                  ref={scrollContainerRef}
                >
                  <form
                    onSubmit={handleRegister}
                    className="p-4 sm:p-5 md:p-6 relative z-10"
                  >
                    <div className="mb-3 sm:mb-4" ref={fieldRefs.name}>
                      <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 text-gray-700">
                        {t.fullName}
                      </label>
                      <div
                        className={`relative rounded-lg border ${
                          registerErrors.name
                            ? "border-red-500"
                            : "border-gray-300"
                        } bg-white focus-within:border-[#FF385C] transition-colors duration-300`}
                      >
                        <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={registerName}
                          onChange={(e) => {
                            setRegisterName(e.target.value);
                            if (registerErrors.name) {
                              setRegisterErrors({
                                ...registerErrors,
                                name: undefined,
                              });
                            }
                          }}
                          className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 rounded-lg outline-none text-xs sm:text-sm bg-white text-gray-900 placeholder-gray-400"
                          placeholder="John Doe"
                        />
                      </div>
                      {registerErrors.name && (
                        <p className="text-xs text-red-500 mt-1">
                          {registerErrors.name}
                        </p>
                      )}
                    </div>

                    <div className="mb-3 sm:mb-4" ref={fieldRefs.email}>
                      <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 text-gray-700">
                        {t.email}
                      </label>
                      <div
                        className={`relative rounded-lg border ${
                          isRegisterEmailValid === true
                            ? "border-green-500"
                            : isRegisterEmailValid === false
                              ? "border-red-500"
                              : registerErrors.email
                                ? "border-red-500"
                                : "border-gray-300"
                        } bg-white focus-within:border-[#FF385C] transition-colors duration-300`}
                      >
                        <EmailIcon                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                            isRegisterEmailValid === true
                              ? "text-green-500"
                              : isRegisterEmailValid === false
                                ? "text-red-500"
                                : "text-gray-400"
                          }`}
                        />
                        <input
                          type="email"
                          required
                          value={registerEmail}
                          onChange={(e) =>
                            handleRegisterEmailChange(e.target.value)
                          }
                          className="w-full pl-9 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-2.5 rounded-lg outline-none text-xs sm:text-sm bg-white text-gray-900 placeholder-gray-400"
                          placeholder="you@example.com"
                        />
                        {isRegisterEmailValid === true && (
                          <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                        )}
                        {isRegisterEmailValid === false && (
                          <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                        )}
                      </div>
                      {registerErrors.email && (
                        <p className="text-xs text-red-500 mt-1">
                          {registerErrors.email}
                        </p>
                      )}
                      {isRegisterEmailValid === true && (
                        <p className="text-xs text-green-500 mt-1">
                          ✓ Valid email address
                        </p>
                      )}
                    </div>

                    <div className="mb-3 sm:mb-4" ref={fieldRefs.phone}>
                      <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 text-gray-700">
                        {t.phoneNumber}
                      </label>
                      <div
                        className={`relative rounded-lg border ${
                          isPhoneValid === true
                            ? "border-green-500"
                            : isPhoneValid === false
                              ? "border-red-500"
                              : registerErrors.phone
                                ? "border-red-500"
                                : "border-gray-300"
                        } bg-white focus-within:border-[#FF385C] transition-colors duration-300`}
                      >
                        <PhoneIcon
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                            isPhoneValid === true
                              ? "text-green-500"
                              : isPhoneValid === false
                                ? "text-red-500"
                                : "text-gray-400"
                          }`}
                        />
                        <input
                          type="tel"
                          required
                          value={registerPhone}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          className="w-full pl-9 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-2.5 rounded-lg outline-none text-xs sm:text-sm bg-white text-gray-900 placeholder-gray-400"
                          placeholder="0788123456"
                        />
                        {isPhoneValid === true && (
                          <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                        )}
                        {isPhoneValid === false && (
                          <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                        )}
                      </div>
                      {registerErrors.phone && (
                        <p className="text-xs text-red-500 mt-1">
                          {registerErrors.phone}
                        </p>
                      )}
                      {isPhoneValid === true && (
                        <p className="text-xs text-green-500 mt-1">
                          ✓ Valid phone number
                        </p>
                      )}
                    </div>

                    <div className="mb-3 sm:mb-4" ref={fieldRefs.password}>
                      <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 text-gray-700">
                        {t.password}
                      </label>
                      <div
                        className={`relative rounded-lg border ${
                          registerErrors.password
                            ? "border-red-500"
                            : "border-gray-300"
                        } bg-white focus-within:border-[#FF385C] transition-colors duration-300`}
                      >
                        <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={registerPassword}
                          onChange={(e) => handlePasswordChange(e.target.value)}
                          className="w-full pl-9 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-2.5 rounded-lg outline-none text-xs sm:text-sm bg-white text-gray-900 placeholder-gray-400"
                          placeholder="••••••••"
                          minLength={6}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                          ) : (
                            <VisibilityIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                          )}
                        </button>
                      </div>
                      {registerErrors.password && (
                        <p className="text-xs text-red-500 mt-1">
                          {registerErrors.password}
                        </p>
                      )}
                      {passwordStrength && (
                        <div className="mt-1.5 sm:mt-2">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className="flex-1 h-1 sm:h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                  width:
                                    passwordStrength === "weak"
                                      ? "33%"
                                      : passwordStrength === "moderate"
                                        ? "66%"
                                        : "100%",
                                  backgroundColor:
                                    getPasswordStrengthColor(passwordStrength),
                                }}
                                initial={{ width: 0 }}
                                animate={{
                                  width:
                                    passwordStrength === "weak"
                                      ? "33%"
                                      : passwordStrength === "moderate"
                                        ? "66%"
                                        : "100%",
                                }}
                              />
                            </div>
                            <div
                              className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs font-medium whitespace-nowrap"
                              style={{
                                color:
                                  getPasswordStrengthColor(passwordStrength),
                              }}
                            >
                              {getPasswordStrengthIcon(passwordStrength)}
                              <span>
                                {t.passwordStrength}:{" "}
                                {getPasswordStrengthLabel(passwordStrength)}
                              </span>
                            </div>
                          </div>
                          {passwordStrength === "weak" && (
                            <p className="text-[10px] sm:text-xs text-red-500 mt-1">
                              ⚠️ Password is too weak. Use at least 8 characters
                              with uppercase, lowercase, numbers, and special
                              characters.
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    <div
                      className="mb-4 sm:mb-5 md:mb-6"
                      ref={fieldRefs.confirmPassword}
                    >
                      <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 text-gray-700">
                        {t.confirmPassword}
                      </label>
                      <div
                        className={`relative rounded-lg border ${
                          registerErrors.confirmPassword
                            ? "border-red-500"
                            : registerConfirmPassword &&
                                registerPassword === registerConfirmPassword &&
                                registerConfirmPassword.length > 0
                              ? "border-green-500"
                              : "border-gray-300"
                        } bg-white focus-within:border-[#FF385C] transition-colors duration-300`}
                      >
                        <LockIcon
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                            registerConfirmPassword &&
                            registerPassword === registerConfirmPassword &&
                            registerConfirmPassword.length > 0
                              ? "text-green-500"
                              : "text-gray-400"
                          }`}
                        />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          required
                          value={registerConfirmPassword}
                          onChange={(e) =>
                            handleConfirmPasswordChange(e.target.value)
                          }
                          className="w-full pl-9 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-2.5 rounded-lg outline-none text-xs sm:text-sm bg-white text-gray-900 placeholder-gray-400"
                          placeholder="••••••••"
                          minLength={6}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOffIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                          ) : (
                            <VisibilityIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                          )}
                        </button>
                        {registerConfirmPassword &&
                          registerPassword === registerConfirmPassword &&
                          registerConfirmPassword.length > 0 && (
                            <CheckCircleIcon className="absolute right-10 sm:right-12 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                          )}
                      </div>
                      {registerErrors.confirmPassword && (
                        <p className="text-xs text-red-500 mt-1">
                          {registerErrors.confirmPassword}
                        </p>
                      )}
                      {registerConfirmPassword &&
                        registerPassword === registerConfirmPassword &&
                        registerConfirmPassword.length > 0 && (
                          <p className="text-xs text-green-500 mt-1">
                            ✓ Passwords match
                          </p>
                        )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={registerLoading || !isRegisterFormValid()}
                      className={`w-full py-2.5 sm:py-3 rounded-lg font-medium relative overflow-hidden group transition-colors text-xs sm:text-sm ${
                        registerLoading || !isRegisterFormValid()
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#FF385C] hover:bg-[#E31C5F]"
                      } text-white`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                        {registerLoading ? (
                          <>
                            <svg
                              className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Creating account...
                          </>
                        ) : (
                          <>
                            <PersonAddIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            {t.signup}
                          </>
                        )}
                      </span>
                    </motion.button>
                    {!isRegisterFormValid() &&
                      registerPassword.length > 0 &&
                      passwordStrength === "weak" && (
                        <p className="text-center text-[10px] sm:text-xs text-red-500 mt-2">
                          ⚠️ Please choose a stronger password to enable
                          registration.
                        </p>
                      )}
                    <p className="text-center text-xs sm:text-sm mt-3 sm:mt-4 text-gray-500">
                      {t.alreadyHaveAccount}{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setIsRegisterOpen(false);
                          setIsLoginOpen(true);
                        }}
                        className="text-[#FF385C] font-medium hover:underline"
                      >
                        {t.login}
                      </button>
                    </p>
                    <div className="mt-4 sm:mt-6 flex justify-center gap-3 sm:gap-4">
                      <Link
                        to={
                          "https://web.facebook.com/profile.php?id=61593907921662"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                      >
                        <FacebookIcon className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-blue-600 text-blue-600" />
                      </Link>
                      <Link
                        to={"https://www.instagram.com/inyumbarental/"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                      >
                        <InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-pink-600 text-pink-600" />
                      </Link>
                      <Link
                        to={"https://x.com/inyumbarental"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                      >
                        <TwitterIcon className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-blue-600 text-indigo-400" />
                      </Link>
                      <Link
                        to={
                          "https://www.youtube.com/channel/UCUe_TGKGrXPhit85u5u9bDA"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="YouTube"
                      >
                        <YouTubeIcon className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-red-300 text-red-300" />
                      </Link>
                      <Link
                        to={
                          "https://www.linkedin.com/in/inyumba-rental-998031432?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                      >
                        <LinkedIn className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-red-300 text-red-300" />
                      </Link>
                    </div>
                  </form>
                </motion.div>

                {/* Navigation Buttons */}
                <div className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1.5 sm:gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-gray-600 hover:bg-white hover:text-[#FF385C] transition-all border border-gray-200"
                    title="Scroll to top"
                  >
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToNextField}
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-gray-600 hover:bg-white hover:text-[#FF385C] transition-all border border-gray-200"
                    title="Scroll to next field"
                  >
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ==================== USER PROFILE MODAL ==================== */}
      <AnimatePresence>
        {isUserModalOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setIsUserModalOpen(false)}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-3 sm:p-4"
            >
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative flex flex-col">
                <AnimatedBackground />
                {/* Header */}
                <div className="px-4 sm:px-5 md:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl relative z-10 flex-shrink-0">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <AccountCircleIcon className="text-[#FF385C] w-4 h-4 sm:w-5 sm:h-5" />
                    <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
                      {t.profile}
                    </h2>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsUserModalOpen(false)}
                    className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                </div>

                {/* Scrollable content */}
                <div className="p-4 sm:p-5 md:p-6 relative z-10 overflow-y-auto flex-1">
                  <div className="flex flex-col items-center mb-4 sm:mb-5 md:mb-6">
                    <motion.div
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-[#FF385C] text-white flex items-center justify-center text-2xl sm:text-3xl font-bold mb-2 sm:mb-3"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {userName.charAt(0).toUpperCase()}
                    </motion.div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 text-center">
                      {userName}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 text-center break-all">
                      {userEmail}
                    </p>
                    <span
                      className={`inline-block mt-1.5 sm:mt-2 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full font-medium ${
                        userRole === "admin"
                          ? "bg-red-100 text-red-700"
                          : userRole === "host"
                            ? "bg-blue-100 text-blue-700"
                            : userRole === "manager"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-green-100 text-green-700"
                      }`}
                    >
                      {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-3 sm:pt-4 space-y-2 sm:space-y-3">
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                        <p className="text-[10px] sm:text-xs text-gray-500">
                          Full Name
                        </p>
                        <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                          {userName}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                        <p className="text-[10px] sm:text-xs text-gray-500">
                          Role
                        </p>
                        <p className="text-xs sm:text-sm font-medium text-gray-900 capitalize">
                          {userRole}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2 sm:p-3 col-span-2">
                        <p className="text-[10px] sm:text-xs text-gray-500">
                          Email
                        </p>
                        <p className="text-xs sm:text-sm font-medium text-gray-900 truncate break-all">
                          {userEmail}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2 sm:p-3 col-span-2">
                        <p className="text-[10px] sm:text-xs text-gray-500">
                          Phone
                        </p>
                        <p className="text-xs sm:text-sm font-medium text-gray-900">
                          {userPhone || "N/A"}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2 sm:p-3 col-span-2">
                        <p className="text-[10px] sm:text-xs text-gray-500">
                          Member Since
                        </p>
                        <p className="text-xs sm:text-sm font-medium text-gray-900">
                          {formatDate(userCreatedAt)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 mt-3 sm:mt-4 pt-3 sm:pt-4 space-y-1.5 sm:space-y-2">
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm flex items-center gap-2 sm:gap-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => {
                        setIsUserModalOpen(false);
                        handleDashboardNavigation();
                      }}
                    >
                      {getDashboardIcon()}
                      {getDashboardLabel()}
                    </motion.button>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm flex items-center gap-2 sm:gap-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      onClick={() => {
                        setIsUserModalOpen(false);
                        handleLogout();
                      }}
                    >
                      <LogoutIcon className="w-4 h-4" />
                      {t.logout}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ==================== DASHBOARD MODAL ==================== */}
      <AnimatePresence>
        {isDashboardOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setIsDashboardOpen(false)}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-3 sm:p-4"
            >
              <div className="w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
                <AnimatedBackground />
                <div className="sticky top-0 px-4 sm:px-5 md:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl relative z-10">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <DashboardIcon className="text-[#FF385C] w-4 h-4 sm:w-5 sm:h-5" />
                    <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
                      {getDashboardLabel()}
                    </h2>
                    <span className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-xs rounded-full bg-[#FF385C]/10 text-[#FF385C]">
                      {userRole}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsDashboardOpen(false)}
                    className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                </div>
                <div className="p-4 sm:p-5 md:p-6 relative z-10">
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6">
                    {dashboardStats.map((stat, index) => (
                      <motion.div
                        key={index}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.1 }}
                        whileHover="hover"
                        className="bg-gray-50 rounded-xl p-2 sm:p-3 md:p-4 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] sm:text-xs md:text-sm text-gray-500">
                            {stat.label}
                          </span>
                          {stat.icon}
                        </div>
                        <p className="text-base sm:text-lg md:text-2xl font-bold text-gray-900 mt-1 sm:mt-2">
                          {stat.value}
                        </p>
                        <p className="text-[10px] sm:text-xs text-green-500 mt-0.5 sm:mt-1">
                          {stat.change}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      {t.recentActivity}
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                      {recentActivities.map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg hover:bg-white transition-colors"
                        >
                          <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                            {activity.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                              {activity.user}
                            </p>
                            <p className="text-[10px] sm:text-xs text-gray-500 truncate">
                              {activity.action}
                            </p>
                          </div>
                          <span className="text-[10px] sm:text-xs text-gray-400 flex-shrink-0">
                            {activity.time}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-3 sm:mt-4 bg-[#FF385C] text-white py-2 sm:py-2.5 md:py-3 rounded-lg font-medium hover:bg-[#E31C5F] transition-colors text-xs sm:text-sm"
                    onClick={() => {
                      setIsDashboardOpen(false);
                      handleDashboardNavigation();
                    }}
                  >
                    <DashboardIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
                    View Full Dashboard
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};