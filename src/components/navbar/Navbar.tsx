/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
} from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate, Link } from "react-router-dom";

// Dummy user data for login
const DEMO_USERS = {
  admin: {
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    role: "admin",
    id: 1,
    token: "demo-admin-token-12345",
  },
  user: {
    email: "user@example.com",
    password: "user123",
    name: "Regular User",
    role: "user",
    id: 2,
    token: "demo-user-token-67890",
  },
  host: {
    email: "host@example.com",
    password: "host123",
    name: "Host User",
    role: "host",
    id: 3,
    token: "demo-host-token-11111",
  },
};

// INYUMBA SVG Logo Component with Animation
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

// Animated Background SVG
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

// Language translations
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
    experience: "Houses on rent",
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

    // Hero Section
    heroTitle: "Find Your Perfect Student Accommodation",
    heroSubtitle:
      "Discover safe, affordable, and comfortable housing near your university",
    heroButton: "Explore Listings",
    heroStudents: "Happy Students",
    heroListings: "Available Listings",
    heroUniversities: "Partner Universities",

    // About Section
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

    // Services Section
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

    // Testimonials Section
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
    experience: "Maisons à louer",
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

    // Hero Section
    heroTitle: "Trouvez Votre Logement Étudiant Parfait",
    heroSubtitle:
      "Découvrez un logement sûr, abordable et confortable près de votre université",
    heroButton: "Explorer les annonces",
    heroStudents: "Étudiants Satisfaits",
    heroListings: "Annonces Disponibles",
    heroUniversities: "Universités Partenaires",

    // About Section
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

    // Services Section
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

    // Testimonials Section
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
    experience: "Amazu akodeshwa",
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

    // Hero Section
    heroTitle: "Shakira Aho Uzabera Byiza",
    heroSubtitle:
      "Menya amazu meza, ari mu buryo buhoro kandi ari hafi ya kaminuza yawe",
    heroButton: "Reba Amazu",
    heroStudents: "Abanyeshuri Bunze",
    heroListings: "Amazu Aboneka",
    heroUniversities: "Kaminuza Zifatanya",

    // About Section
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

    // Services Section
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

    // Testimonials Section
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

// Helper function to get language from cookies
const getLanguageFromCookies = (): Language => {
  const lang = Cookies.get("language") as Language;
  return lang || "en";
};

// Helper function to get translations based on cookie language
export const getTranslations = () => {
  const lang = getLanguageFromCookies();
  return translations[lang];
};

// Export translations and types for other components
export type { Language };
export { translations };

// Navigation links object
const navLinks = [
  { id: "home", path: "/", label: "home" },
  { id: "experience", path: "/experience", label: "experience" },
  { id: "services", path: "/services", label: "services" },
  { id: "testimonials", path: "/testimonials", label: "testimonials" },
  { id: "about", path: "/about", label: "about" },
];

// Success/Fail Modal Component
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
              <AnimatedBackground />
              <div className="relative z-10 p-6">
                <div className="flex flex-col items-center text-center">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="mb-4"
                  >
                    {getIcon()}
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`text-2xl font-bold ${colors.text} mb-2`}
                  >
                    {title}
                  </motion.h3>

                  {/* Message */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-700 mb-4"
                  >
                    {message}
                  </motion.p>

                  {/* Details */}
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

                  {/* Button */}
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

export const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("user");
  const [, setUserId] = useState("");

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

  const userMenuRef = useRef<HTMLDivElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);

  // Get translation based on language from cookies
  const t = translations[language];

  const navigate = useNavigate();

  // Handle click outside menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
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
        setIsUserMenuOpen(false);
        setIsLanguageMenuOpen(false);
        setIsDashboardOpen(false);
        setIsUserModalOpen(false);
        setStatusModal((prev) => ({ ...prev, isOpen: false }));
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Check for existing session
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
      } catch (error) {
        console.error("Error parsing user data:", error);
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

    // Check for cookie changes every second (polling)
    const interval = setInterval(handleCookieChange, 1000);
    return () => clearInterval(interval);
  }, [language]);

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate phone number (Rwandan format)
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(?:\+250|0)?[7-9][0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  // Check password strength
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

  // Get password strength color
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

  // Get password strength label
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

  // Get password strength icon
  const getPasswordStrengthIcon = (
    strength: "weak" | "moderate" | "strong" | null,
  ) => {
    if (!strength) return null;
    switch (strength) {
      case "weak":
        return <WarningIcon className="w-4 h-4" style={{ color: "#ef4444" }} />;
      case "moderate":
        return (
          <SecurityIcon className="w-4 h-4" style={{ color: "#f59e0b" }} />
        );
      case "strong":
        return (
          <VerifiedIcon className="w-4 h-4" style={{ color: "#22c55e" }} />
        );
    }
  };

  // Validate login form
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

  // Validate register form
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

  // Check if register form is valid
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

  // Check if login form is valid
  const isLoginFormValid = (): boolean => {
    return (
      loginEmail.length > 0 &&
      validateEmail(loginEmail) &&
      loginPassword.length >= 6
    );
  };

  // Navigation handler - FIXED: Using navigate instead of window.location
  const navigateTo = (path: string) => {
    navigate(path);
  };

  // Handle Dashboard navigation based on role - FIXED: Removed :id from path
  const handleDashboardNavigation = () => {
    setIsUserMenuOpen(false);
    if (userRole === "admin") {
      navigateTo("/dashboard");
    } else if (userRole === "host") {
      navigateTo("/host/dashboard");
    } else {
      navigateTo("/user/dashboard");
    }
  };

  // Handle Login with dummy data - FIXED: Using navigate instead of window.location.href
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLoginForm()) return;
    setLoginLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      let userData: any = null;
      let token: string = "";

      if (
        loginEmail === DEMO_USERS.admin.email &&
        loginPassword === DEMO_USERS.admin.password
      ) {
        userData = {
          id: DEMO_USERS.admin.id,
          name: DEMO_USERS.admin.name,
          email: DEMO_USERS.admin.email,
          role: DEMO_USERS.admin.role,
        };
        token = DEMO_USERS.admin.token;

        // Show success modal
        setStatusModal({
          isOpen: true,
          type: "success",
          title: "🎉 Welcome Admin!",
          message: "You have successfully logged in as an administrator.",
          details: `Email: ${DEMO_USERS.admin.email}`,
        });
      } else if (
        loginEmail === DEMO_USERS.user.email &&
        loginPassword === DEMO_USERS.user.password
      ) {
        userData = {
          id: DEMO_USERS.user.id,
          name: DEMO_USERS.user.name,
          email: DEMO_USERS.user.email,
          role: DEMO_USERS.user.role,
        };
        token = DEMO_USERS.user.token;

        setStatusModal({
          isOpen: true,
          type: "success",
          title: "🎉 Welcome User!",
          message: "You have successfully logged in as a regular user.",
          details: `Email: ${DEMO_USERS.user.email}`,
        });
      } else if (
        loginEmail === DEMO_USERS.host.email &&
        loginPassword === DEMO_USERS.host.password
      ) {
        userData = {
          id: DEMO_USERS.host.id,
          name: DEMO_USERS.host.name,
          email: DEMO_USERS.host.email,
          role: DEMO_USERS.host.role,
        };
        token = DEMO_USERS.host.token;

        setStatusModal({
          isOpen: true,
          type: "success",
          title: "🎉 Welcome Host!",
          message: "You have successfully logged in as a host.",
          details: `Email: ${DEMO_USERS.host.email}`,
        });
      } else {
        setStatusModal({
          isOpen: true,
          type: "error",
          title: "❌ Login Failed",
          message: "Invalid email or password. Please try again.",
          details: "Please check your credentials and try again.",
        });
        setLoginLoading(false);
        return;
      }

      setIsLoggedIn(true);
      setUserName(userData.name || "User");
      setUserEmail(userData.email || "");
      setUserRole(userData.role || "user");
      setUserId(userData.id.toString());
      setIsLoginOpen(false);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setLoginEmail("");
      setLoginPassword("");
      setLoginErrors({});

      // Use navigate instead of window.location.href
      // Adding a small delay to ensure state updates are processed
      setTimeout(() => {
        if (userData.role === "admin") {
          navigate("/dashboard", { replace: true });
        } else if (userData.role === "host") {
          navigate("/host/dashboard", { replace: true });
        } else {
          navigate("/user/dashboard", { replace: true });
        }
      }, 100);
    } catch (error: any) {
      const errorMessage = error?.message || "Login failed. Please try again.";
      setStatusModal({
        isOpen: true,
        type: "error",
        title: "❌ Login Error",
        message: errorMessage,
        details: "Please try again or contact support if the issue persists.",
      });
      console.error("Login error:", error);
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Register
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
      await new Promise((resolve) => setTimeout(resolve, 1000));

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
    } catch (error: any) {
      const errorMessage =
        error?.message || "Registration failed. Please try again.";
      setStatusModal({
        isOpen: true,
        type: "error",
        title: "❌ Registration Failed",
        message: errorMessage,
        details: "Please check your information and try again.",
      });
      console.error("Register error:", error);
    } finally {
      setRegisterLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName("Guest");
    setUserEmail("");
    setUserRole("user");
    setUserId("");
    setIsUserMenuOpen(false);
    setIsDashboardOpen(false);

    setStatusModal({
      isOpen: true,
      type: "info",
      title: "👋 Logged Out",
      message: "You have been logged out successfully.",
      details: "See you again soon!",
    });

    navigate("/");
  };

  // ============================================================
  // LANGUAGE CHANGER FUNCTION - SAVES TO COOKIES AND REFRESHES
  // ============================================================
  const handleLanguageChange = (lang: Language) => {
    // Save language to cookie (expires in 365 days)
    Cookies.set("language", lang, { expires: 365, path: "/" });

    // Update the language state
    setLanguage(lang);

    // Close the language menu
    setIsLanguageMenuOpen(false);

    // Show a toast notification
    const langName =
      lang === "en" ? "English" : lang === "fr" ? "Français" : "Kinyarwanda";

    setStatusModal({
      isOpen: true,
      type: "info",
      title: "🌍 Language Changed",
      message: `Language changed to ${langName}`,
      details: "The page will refresh to apply the new language.",
    });

    // REFRESH THE ENTIRE WEBSITE
    // Small delay to let the modal show before refresh
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  // Handle email validation for login
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

  // Handle email validation for register
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

  // Handle phone validation
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

  // Handle password change with strength check
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

  // Handle confirm password change
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
      icon: <TrendingUpIcon className="w-5 h-5 text-green-500" />,
      change: "+23%",
    },
    {
      label: t.activeListings,
      value: "156",
      icon: <HotelIcon className="w-5 h-5 text-blue-500" />,
      change: "+12",
    },
    {
      label: "Total Students",
      value: "3,847",
      icon: <PeopleIcon className="w-5 h-5 text-purple-500" />,
      change: "+18%",
    },
    {
      label: t.bookings,
      value: "2,134",
      icon: <CalendarTodayIcon className="w-5 h-5 text-orange-500" />,
      change: "+31%",
    },
  ];

  const recentActivities = [
    {
      user: "Student from INES-Ruhengeri",
      action: "Booked a room in Muhoza",
      time: "5 min ago",
      icon: <StarIcon className="w-4 h-4 text-yellow-500" />,
    },
    {
      user: "Host in Cyabararika",
      action: "Listed a new house for students",
      time: "23 min ago",
      icon: <HotelIcon className="w-4 h-4 text-blue-500" />,
    },
    {
      user: "Student from UR-CAVM",
      action: "Left a 5-star review",
      time: "1 hour ago",
      icon: <StarIcon className="w-4 h-4 text-yellow-500" />,
    },
    {
      user: "Host in Kigombe",
      action: "Updated house details and price",
      time: "3 hours ago",
      icon: <SettingsIcon className="w-4 h-4 text-gray-500" />,
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

  // Get dashboard label based on role
  const getDashboardLabel = () => {
    if (userRole === "admin") return t.adminDashboard;
    else if (userRole === "host") return t.dashboard;
    else return t.userDashboard;
  };

  // Get dashboard icon based on role
  const getDashboardIcon = () => {
    if (userRole === "admin")
      return <AdminPanelSettingsIcon className="w-4 h-4" />;
    else if (userRole === "host") return <HotelIcon className="w-4 h-4" />;
    else return <DashboardIcon className="w-4 h-4" />;
  };

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
      />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="sticky top-0 z-50 border-b bg-white border-gray-200 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo - Left - Updated with INYUMBA text */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
              onClick={() => navigateTo("/")}
            >
              <div className="text-[#FF385C]">
                <InyumbaLogo className="h-10 w-10 sm:h-12 sm:w-12" />
              </div>
              {/* INYUMBA text - visible on all screen sizes with responsive font sizes */}
              <span className="font-bold text-[#1B4E91] tracking-tight hidden sm:inline text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                INYUMBA
              </span>
              {/* For very small screens, show abbreviated version */}
              <span className="font-bold text-[#1B4E91] tracking-tight sm:hidden text-sm">
                INYUMBA
              </span>
            </motion.div>

            {/* Main Navigation - Using Link from react-router-dom */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <motion.div
                  key={link.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={link.path}
                    className="px-3 lg:px-4 py-2 rounded-full text-sm font-medium transition-colors text-gray-700 hover:bg-gray-100 hover:text-[#FF385C]"
                  >
                    {t[link.label as keyof typeof t]}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Navigation */}
            <div className="flex md:hidden items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const mobileMenu = document.getElementById("mobile-nav-menu");
                  if (mobileMenu) {
                    mobileMenu.classList.toggle("hidden");
                  }
                }}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-700"
              >
                <svg
                  className="w-6 h-6"
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
            <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 flex-shrink-0">
              {/* Language Menu */}
              <div className="relative" ref={languageMenuRef}>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  className="p-2 rounded-full transition-colors hover:bg-gray-100 text-gray-700"
                >
                  <LanguageIcon className="w-5 h-5" />
                </motion.button>

                <AnimatePresence>
                  {isLanguageMenuOpen && (
                    <motion.div
                      variants={menuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg border bg-white border-gray-100 py-2"
                    >
                      {["en", "fr", "rw"].map((lang) => (
                        <button
                          key={lang}
                          onClick={() => handleLanguageChange(lang as Language)}
                          className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 transition-colors ${
                            language === lang
                              ? "text-[#FF385C] font-semibold"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <span className="text-lg">
                            {lang === "en" ? "🇬🇧" : lang === "fr" ? "🇫🇷" : "🇷🇼"}
                          </span>
                          {lang === "en"
                            ? "English"
                            : lang === "fr"
                              ? "Français"
                              : "Kinyarwanda"}
                          {language === lang && (
                            <CheckCircleIcon className="w-4 h-4 ml-auto" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Become a Host / Dashboard Button */}
              {isLoggedIn ? (
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#FF385C",
                    color: "white",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden sm:block text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all bg-[#FF385C] text-white hover:bg-[#E31C5F] whitespace-nowrap"
                  onClick={handleDashboardNavigation}
                >
                  <DashboardIcon className="w-4 h-4 inline mr-1" />
                  {getDashboardLabel()}
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#FF385C",
                    color: "white",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden sm:block text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all text-gray-700 hover:bg-[#FF385C] hover:text-white border border-gray-200 hover:border-[#FF385C] whitespace-nowrap"
                  onClick={() => setIsLoginOpen(true)}
                >
                  {t.becomeHost}
                </motion.button>
              )}

              {/* User Menu */}
              <div className="relative" ref={userMenuRef}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 border border-gray-200 rounded-full px-2 sm:px-3 py-1.5 transition-all duration-300 bg-white hover:shadow-md"
                >
                  {isLoggedIn ? (
                    <motion.div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold bg-[#FF385C] text-white"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {userName.charAt(0).toUpperCase()}
                    </motion.div>
                  ) : (
                    <PersonIcon className="w-4 h-4 text-gray-700" />
                  )}
                  <ExpandMoreIcon className="w-4 h-4 hidden sm:block text-gray-700" />
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      variants={menuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-64 rounded-xl shadow-lg border bg-white border-gray-100 py-2"
                    >
                      {isLoggedIn ? (
                        <>
                          <div className="px-4 py-2 border-b border-gray-100">
                            <p className="font-semibold text-sm text-gray-900">
                              {userName}
                            </p>
                            <p className="text-xs text-gray-500">{userEmail}</p>
                            <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-[#FF385C]/10 text-[#FF385C]">
                              {userRole.charAt(0).toUpperCase() +
                                userRole.slice(1)}
                            </span>
                          </div>
                          <motion.button
                            whileHover={{ x: 5 }}
                            className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 text-gray-700 hover:bg-gray-50"
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              setIsUserModalOpen(true);
                            }}
                          >
                            <AccountCircleIcon className="w-4 h-4" />
                            {t.profile}
                          </motion.button>
                          <motion.button
                            whileHover={{ x: 5 }}
                            className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 transition-colors ${
                              userRole === "admin"
                                ? "text-purple-600 hover:bg-purple-50"
                                : userRole === "host"
                                  ? "text-blue-600 hover:bg-blue-50"
                                  : "text-[#FF385C] hover:bg-[#FF385C]/5"
                            }`}
                            onClick={handleDashboardNavigation}
                          >
                            {getDashboardIcon()}
                            {getDashboardLabel()}
                            {userRole === "admin" && (
                              <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-600">
                                Admin
                              </span>
                            )}
                            {userRole === "host" && (
                              <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-600">
                                Host
                              </span>
                            )}
                          </motion.button>
                          <hr className="my-1 border-gray-200" />
                          <motion.button
                            whileHover={{ x: 5 }}
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 text-red-600 hover:bg-red-50"
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
                              setIsUserMenuOpen(false);
                              setIsLoginOpen(true);
                            }}
                            className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 text-gray-700 hover:bg-gray-50"
                          >
                            <LoginIcon className="w-4 h-4" />
                            {t.login}
                          </motion.button>
                          <motion.button
                            whileHover={{ x: 5 }}
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              setIsRegisterOpen(true);
                            }}
                            className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 text-gray-700 hover:bg-gray-50"
                          >
                            <PersonAddIcon className="w-4 h-4" />
                            {t.signup}
                          </motion.button>
                          <hr className="my-1 border-gray-200" />
                          <div className="px-4 py-2 text-gray-500">
                            <p className="text-xs">{t.becomeHostDesc}</p>
                          </div>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu - Using Link */}
      <div
        id="mobile-nav-menu"
        className="hidden md:hidden bg-white border-b border-gray-200 shadow-lg"
      >
        <div className="px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <motion.div key={link.id} whileHover={{ x: 5 }}>
              <Link
                to={link.path}
                className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-[#FF385C] transition-colors"
              >
                {t[link.label as keyof typeof t]}
              </Link>
            </motion.div>
          ))}
          <div className="pt-2 border-t border-gray-200">
            {isLoggedIn ? (
              <motion.button
                whileHover={{ x: 5 }}
                onClick={handleDashboardNavigation}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-[#FF385C] hover:bg-[#FF385C]/5 transition-colors"
              >
                <DashboardIcon className="w-4 h-4 inline mr-2" />
                {getDashboardLabel()}
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ x: 5 }}
                onClick={() => setIsLoginOpen(true)}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-[#FF385C] hover:bg-[#FF385C]/5 transition-colors"
              >
                {t.becomeHost}
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Login Modal */}
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
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            >
              <div className="w-full max-w-md max-h-[90vh] rounded-2xl shadow-2xl bg-white relative overflow-hidden">
                <AnimatedBackground />
                <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl relative z-10">
                  <div className="flex items-center gap-2">
                    <AutoAwesomeIcon className="text-[#FF385C] w-5 h-5" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      {t.welcomeBack}
                    </h2>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsLoginOpen(false)}
                    className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Slide animation container */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="overflow-y-auto max-h-[calc(90vh-80px)]"
                >
                  <form onSubmit={handleLogin} className="p-6 relative z-10">
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        {t.email}
                      </label>
                      <div
                        className={`relative rounded-lg border ${isLoginEmailValid === true ? "border-green-500" : isLoginEmailValid === false ? "border-red-500" : "border-gray-300"} bg-white focus-within:border-[#FF385C] transition-colors duration-300`}
                      >
                        <EmailIcon
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isLoginEmailValid === true ? "text-green-500" : isLoginEmailValid === false ? "text-red-500" : "text-gray-400"}`}
                        />
                        <input
                          type="email"
                          required
                          value={loginEmail}
                          onChange={(e) =>
                            handleLoginEmailChange(e.target.value)
                          }
                          className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                          placeholder="you@example.com"
                        />
                        {isLoginEmailValid === true && (
                          <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                        {isLoginEmailValid === false && (
                          <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
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
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        {t.password}
                      </label>
                      <div className="relative rounded-lg border border-gray-300 bg-white focus-within:border-[#FF385C] transition-colors duration-300">
                        <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
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
                          className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                          placeholder="••••••••"
                          minLength={6}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon className="w-5 h-5" />
                          ) : (
                            <VisibilityIcon className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {loginErrors.password && (
                        <p className="text-xs text-red-500 mt-1">
                          {loginErrors.password}
                        </p>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loginLoading || !isLoginFormValid()}
                      className={`w-full py-3 rounded-lg font-medium relative overflow-hidden group transition-colors ${loginLoading || !isLoginFormValid() ? "bg-gray-400 cursor-not-allowed" : "bg-[#FF385C] hover:bg-[#E31C5F]"} text-white`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {loginLoading ? (
                          <>
                            <svg
                              className="animate-spin h-5 w-5 text-white"
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
                            <LoginIcon className="w-5 h-5" />
                            {t.login}
                          </>
                        )}
                      </span>
                    </motion.button>
                    <p className="text-center text-sm mt-4 text-gray-500">
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
                    <div className="mt-6 flex justify-center gap-4">
                      <FacebookIcon className="w-5 h-5 cursor-pointer transition-colors hover:text-blue-600 text-blue-600" />
                      <InstagramIcon className="w-5 h-5 cursor-pointer transition-colors hover:text-pink-600 text-pink-600" />
                      <TwitterIcon className="w-5 h-5 cursor-pointer transition-colors hover:text-blue-600 text-indigo-400" />
                      <YouTubeIcon className="w-5 h-5 cursor-pointer transition-colors hover:text-red-300 text-red-300" />
                    </div>
                  </form>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Register Modal */}

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
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            >
              <div className="w-full max-w-md max-h-[90vh] rounded-2xl shadow-2xl bg-white relative overflow-hidden">
                <AnimatedBackground />
                <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl relative z-10">
                  <div className="flex items-center gap-2">
                    <AutoAwesomeIcon className="text-[#FF385C] w-5 h-5" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      {t.createAccount}
                    </h2>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsRegisterOpen(false)}
                    className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Slide animation container */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="overflow-y-auto max-h-[calc(90vh-80px)]"
                >
                  <form onSubmit={handleRegister} className="p-6 relative z-10">
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        {t.fullName}
                      </label>
                      <div
                        className={`relative rounded-lg border ${registerErrors.name ? "border-red-500" : "border-gray-300"} bg-white focus-within:border-[#FF385C] transition-colors duration-300`}
                      >
                        <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
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
                          className="w-full pl-10 pr-3 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                          placeholder="John Doe"
                        />
                      </div>
                      {registerErrors.name && (
                        <p className="text-xs text-red-500 mt-1">
                          {registerErrors.name}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        {t.email}
                      </label>
                      <div
                        className={`relative rounded-lg border ${isRegisterEmailValid === true ? "border-green-500" : isRegisterEmailValid === false ? "border-red-500" : registerErrors.email ? "border-red-500" : "border-gray-300"} bg-white focus-within:border-[#FF385C] transition-colors duration-300`}
                      >
                        <EmailIcon
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isRegisterEmailValid === true ? "text-green-500" : isRegisterEmailValid === false ? "text-red-500" : "text-gray-400"}`}
                        />
                        <input
                          type="email"
                          required
                          value={registerEmail}
                          onChange={(e) =>
                            handleRegisterEmailChange(e.target.value)
                          }
                          className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                          placeholder="you@example.com"
                        />
                        {isRegisterEmailValid === true && (
                          <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                        {isRegisterEmailValid === false && (
                          <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
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
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        {t.phoneNumber}
                      </label>
                      <div
                        className={`relative rounded-lg border ${isPhoneValid === true ? "border-green-500" : isPhoneValid === false ? "border-red-500" : registerErrors.phone ? "border-red-500" : "border-gray-300"} bg-white focus-within:border-[#FF385C] transition-colors duration-300`}
                      >
                        <PhoneIcon
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isPhoneValid === true ? "text-green-500" : isPhoneValid === false ? "text-red-500" : "text-gray-400"}`}
                        />
                        <input
                          type="tel"
                          required
                          value={registerPhone}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                          placeholder="0788123456 or +250788123456"
                        />
                        {isPhoneValid === true && (
                          <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                        {isPhoneValid === false && (
                          <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
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
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        {t.password}
                      </label>
                      <div
                        className={`relative rounded-lg border ${registerErrors.password ? "border-red-500" : "border-gray-300"} bg-white focus-within:border-[#FF385C] transition-colors duration-300`}
                      >
                        <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={registerPassword}
                          onChange={(e) => handlePasswordChange(e.target.value)}
                          className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                          placeholder="••••••••"
                          minLength={6}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon className="w-5 h-5" />
                          ) : (
                            <VisibilityIcon className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {registerErrors.password && (
                        <p className="text-xs text-red-500 mt-1">
                          {registerErrors.password}
                        </p>
                      )}
                      {passwordStrength && (
                        <div className="mt-2">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
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
                              className="flex items-center gap-1 text-xs font-medium"
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
                            <p className="text-xs text-red-500 mt-1">
                              ⚠️ Password is too weak. Use at least 8 characters
                              with uppercase, lowercase, numbers, and special
                              characters.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        {t.confirmPassword}
                      </label>
                      <div
                        className={`relative rounded-lg border ${registerErrors.confirmPassword ? "border-red-500" : registerConfirmPassword && registerPassword === registerConfirmPassword && registerConfirmPassword.length > 0 ? "border-green-500" : "border-gray-300"} bg-white focus-within:border-[#FF385C] transition-colors duration-300`}
                      >
                        <LockIcon
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${registerConfirmPassword && registerPassword === registerConfirmPassword && registerConfirmPassword.length > 0 ? "text-green-500" : "text-gray-400"}`}
                        />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          required
                          value={registerConfirmPassword}
                          onChange={(e) =>
                            handleConfirmPasswordChange(e.target.value)
                          }
                          className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
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
                            <VisibilityOffIcon className="w-5 h-5" />
                          ) : (
                            <VisibilityIcon className="w-5 h-5" />
                          )}
                        </button>
                        {registerConfirmPassword &&
                          registerPassword === registerConfirmPassword &&
                          registerConfirmPassword.length > 0 && (
                            <CheckCircleIcon className="absolute right-12 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
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
                      className={`w-full py-3 rounded-lg font-medium relative overflow-hidden group transition-colors ${registerLoading || !isRegisterFormValid() ? "bg-gray-400 cursor-not-allowed" : "bg-[#FF385C] hover:bg-[#E31C5F]"} text-white`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {registerLoading ? (
                          <>
                            <svg
                              className="animate-spin h-5 w-5 text-white"
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
                            <PersonAddIcon className="w-5 h-5" />
                            {t.signup}
                          </>
                        )}
                      </span>
                    </motion.button>
                    {!isRegisterFormValid() &&
                      registerPassword.length > 0 &&
                      passwordStrength === "weak" && (
                        <p className="text-center text-xs text-red-500 mt-2">
                          ⚠️ Please choose a stronger password to enable
                          registration.
                        </p>
                      )}
                    <p className="text-center text-sm mt-4 text-gray-500">
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
                    <div className="mt-6 flex justify-center gap-4">
                      <FacebookIcon className="w-5 h-5 cursor-pointer transition-colors hover:text-blue-600 text-blue-600" />
                      <InstagramIcon className="w-5 h-5 cursor-pointer transition-colors hover:text-pink-600 text-pink-600" />
                      <TwitterIcon className="w-5 h-5 cursor-pointer transition-colors hover:text-blue-600 text-indigo-400" />
                      <YouTubeIcon className="w-5 h-5 cursor-pointer transition-colors hover:text-red-300 text-red-300" />
                    </div>
                  </form>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* User Profile Modal */}
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
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            >
              <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
                <AnimatedBackground />
                <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl relative z-10">
                  <div className="flex items-center gap-2">
                    <AccountCircleIcon className="text-[#FF385C] w-5 h-5" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      {t.profile}
                    </h2>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsUserModalOpen(false)}
                    className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </motion.button>
                </div>
                <div className="p-6 relative z-10">
                  <div className="flex flex-col items-center mb-6">
                    <motion.div
                      className="w-24 h-24 rounded-full bg-[#FF385C] text-white flex items-center justify-center text-3xl font-bold mb-3"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {userName.charAt(0).toUpperCase()}
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {userName}
                    </h3>
                    <p className="text-sm text-gray-500">{userEmail}</p>
                    <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-[#FF385C]/10 text-[#FF385C] font-medium">
                      {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 text-gray-700 hover:bg-gray-50 rounded-lg"
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
                      className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 text-red-600 hover:bg-red-50 rounded-lg"
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

      {/* Dashboard Modal */}
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
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            >
              <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
                <AnimatedBackground />
                <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl relative z-10">
                  <div className="flex items-center gap-2">
                    <DashboardIcon className="text-[#FF385C] w-5 h-5" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      {getDashboardLabel()}
                    </h2>
                    <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-[#FF385C]/10 text-[#FF385C]">
                      {userRole}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsDashboardOpen(false)}
                    className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </motion.button>
                </div>
                <div className="p-6 relative z-10">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {dashboardStats.map((stat, index) => (
                      <motion.div
                        key={index}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.1 }}
                        whileHover="hover"
                        className="bg-gray-50 rounded-xl p-4 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            {stat.label}
                          </span>
                          {stat.icon}
                        </div>
                        <p className="text-2xl font-bold text-gray-900 mt-2">
                          {stat.value}
                        </p>
                        <p className="text-xs text-green-500 mt-1">
                          {stat.change}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                      {t.recentActivity}
                    </h3>
                    <div className="space-y-3">
                      {recentActivities.map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors"
                        >
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                            {activity.icon}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {activity.user}
                            </p>
                            <p className="text-xs text-gray-500">
                              {activity.action}
                            </p>
                          </div>
                          <span className="text-xs text-gray-400">
                            {activity.time}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-4 bg-[#FF385C] text-white py-3 rounded-lg font-medium hover:bg-[#E31C5F] transition-colors"
                    onClick={() => {
                      setIsDashboardOpen(false);
                      handleDashboardNavigation();
                    }}
                  >
                    <DashboardIcon className="w-4 h-4 inline mr-2" />
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
