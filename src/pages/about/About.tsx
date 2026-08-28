
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/immutability */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import axios from "axios";

// Material-UI Icons
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SecurityIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PaymentsIcon from "@mui/icons-material/Payments";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import VerifiedIcon from "@mui/icons-material/Verified";
import HandshakeIcon from "@mui/icons-material/Handshake";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import BuildIcon from "@mui/icons-material/Build";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonIcon from "@mui/icons-material/Person";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import {
  CheckCircleOutlineRounded,
  ErrorOutlineOutlined,
} from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";

// API Configuration
const CONTACT_API_URL = "https://rene-inyumba-nodejs.onrender.com/contact";
const TEAM_API_URL = "https://rene-inyumba-nodejs.onrender.com/team";
const STATS_API_URL = "https://rene-inyumba-nodejs.onrender.com/auth/stats";
const HOUSES_API_URL = "https://rene-inyumba-nodejs.onrender.com/houses";
const GOOGLE_TRANSLATE_API_URL = "https://translate.googleapis.com/translate_a/single";

const CONTACT_API = axios.create({
  baseURL: CONTACT_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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

// Translations
const translations = {
  en: {
    about: "About Us",
    welcome: "Welcome to INYUMBA PROJECT",
    tagline: "Your Trusted Student Housing Partner in Rwanda",
    description:
      "INYUMBA PROJECT is a pioneering student housing platform dedicated to providing safe, affordable, and comfortable accommodation for university students across Rwanda. Founded with the vision of solving the student housing crisis, we connect students with verified landlords who offer quality housing near their campuses.",
    mission: "Our Mission",
    missionText:
      "To bridge the gap between students and quality housing by providing a transparent, reliable, and user-friendly platform that makes finding a student home simple and stress-free.",
    vision: "Our Vision",
    visionText:
      "To become the leading student housing platform in East Africa, creating a community where every student has access to safe, affordable, and comfortable accommodation.",
    values: "Our Core Values",
    stats: "Our Impact",
    team: "Meet Our Team",
    contact: "Contact Us",
    getInTouch: "Get in Touch",
    email: "Email",
    phone: "Phone",
    location: "Location",
    address: "Musanze, Northern Province, Rwanda",
    sendMessage: "Send Message",
    name: "Your Name",
    message: "Your Message",
    submit: "Submit",
    teamMember: "Team Member",
    founder: "Founder & CEO",
    developer: "Lead Developer",
    designer: "UI/UX Designer",
    manager: "Operations Manager",
    valueTransparency: "Transparency",
    valueTrust: "Trust",
    valueExcellence: "Excellence",
    valueCommunity: "Community",
    valueInnovation: "Innovation",
    valueSafety: "Safety",
    transparencyDesc:
      "We believe in complete transparency in all our dealings with students, landlords, and partners.",
    trustDesc:
      "Building trust through verified listings, secure payments, and reliable service.",
    excellenceDesc:
      "Striving for excellence in everything we do, from platform quality to customer service.",
    communityDesc:
      "Building a community of students, landlords, and partners working together.",
    innovationDesc:
      "Continuously innovating to improve the student housing experience.",
    safetyDesc:
      "Prioritizing student safety with verified properties and secure booking systems.",
    housesListed: "Houses Listed",
    studentsHoused: "Students Housed",
    universities: "Universities",
    satisfactionRate: "Satisfaction Rate",
    yearsExperience: "Years Experience",
    activeListings: "Active Listings",
    whyChooseUs: "Why Choose INYUMBA PROJECT?",
    whyDesc:
      "We understand the challenges students face when looking for accommodation. That's why we've built a platform that makes finding a student home easy, safe, and affordable.",
    featureVerified: "Verified Properties",
    featureVerifiedDesc:
      "All properties on our platform are verified to ensure quality and safety.",
    featureStudentFriendly: "Student-Friendly Pricing",
    featureStudentFriendlyDesc:
      "Affordable rates designed with student budgets in mind.",
    featureLocation: "Near Universities",
    featureLocationDesc:
      "All properties are located within walking distance of major universities.",
    featureSupport: "24/7 Support",
    featureSupportDesc: "Our dedicated team is always available to assist you.",
    featureBooking: "Easy Booking",
    featureBookingDesc:
      "Simple and secure booking process with instant confirmation.",
    featurePayment: "Secure Payments",
    featurePaymentDesc: "MOMO integration for safe and convenient payments.",
    readMore: "Read More",
    testimonials: "What Students Say",
    partnerWithUs: "Partner With Us",
    partnerText:
      "Are you a landlord with student housing? Join our platform and connect with thousands of students looking for accommodation.",
    becomePartner: "Become a Partner",
    ourStory: "Our Story",
    storyText:
      "INYUMBA PROJECT was born out of a genuine need to solve the student housing crisis in Rwanda. Founded by NTWARI Jean Rene, a visionary entrepreneur who experienced firsthand the challenges students face when looking for accommodation. The project started as a simple idea - to create a platform that connects students with quality housing near their universities. Today, INYUMBA PROJECT has grown into a trusted brand, helping thousands of students find their perfect home across Rwanda.",
    storyHighlight:
      "From a simple idea to a movement that's changing how students find housing in Rwanda.",
    journeyText:
      "Our journey began in Musanze, near INES-Ruhengeri, where we saw students struggling to find safe and affordable accommodation. We decided to take action and build a platform that would make the process simple, transparent, and accessible to all students regardless of their background.",
    statsHeading: "Our Impact in Numbers",
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
    loadingStats: "Loading statistics...",
    loadingHouses: "Loading houses...",
    translating: "Translating...",
  },
  fr: {
    about: "À Propos de Nous",
    welcome: "Bienvenue à INYUMBA PROJECT",
    tagline: "Votre Partenaire de Logement Étudiant de Confiance au Rwanda",
    description:
      "INYUMBA PROJECT est une plateforme de logement étudiant pionnière dédiée à fournir un hébergement sûr, abordable et confortable aux étudiants universitaires à travers le Rwanda. Fondée avec la vision de résoudre la crise du logement étudiant, nous connectons les étudiants avec des propriétaires vérifiés qui offrent un logement de qualité près de leurs campus.",
    mission: "Notre Mission",
    missionText:
      "Combler le fossé entre les étudiants et les logements de qualité en fournissant une plateforme transparente, fiable et conviviale qui rend la recherche d'un logement étudiant simple et sans stress.",
    vision: "Notre Vision",
    visionText:
      "Devenir la principale plateforme de logement étudiant en Afrique de l'Est, créant une communauté où chaque étudiant a accès à un logement sûr, abordable et confortable.",
    values: "Nos Valeurs",
    stats: "Notre Impact",
    team: "Rencontrez Notre Équipe",
    contact: "Contactez-Nous",
    getInTouch: "Prenez Contact",
    email: "E-mail",
    phone: "Téléphone",
    location: "Emplacement",
    address: "Musanze, Province du Nord, Rwanda",
    sendMessage: "Envoyer un Message",
    name: "Votre Nom",
    message: "Votre Message",
    submit: "Envoyer",
    teamMember: "Membre de l'Équipe",
    founder: "Fondateur & PDG",
    developer: "Développeur Principal",
    designer: "Designer UI/UX",
    manager: "Responsable des Opérations",
    valueTransparency: "Transparence",
    valueTrust: "Confiance",
    valueExcellence: "Excellence",
    valueCommunity: "Communauté",
    valueInnovation: "Innovation",
    valueSafety: "Sécurité",
    transparencyDesc:
      "Nous croyons en une transparence totale dans toutes nos relations avec les étudiants, les propriétaires et les partenaires.",
    trustDesc:
      "Construire la confiance grâce à des annonces vérifiées, des paiements sécurisés et un service fiable.",
    excellenceDesc:
      "Aspirer à l'excellence dans tout ce que nous faisons, de la qualité de la plateforme au service client.",
    communityDesc:
      "Construire une communauté d'étudiants, de propriétaires et de partenaires travaillant ensemble.",
    innovationDesc:
      "Innover continuellement pour améliorer l'expérience de logement étudiant.",
    safetyDesc:
      "Prioriser la sécurité des étudiants avec des propriétés vérifiées et des systèmes de réservation sécurisés.",
    housesListed: "Maisons Inscrites",
    studentsHoused: "Étudiants Logés",
    universities: "Universités",
    satisfactionRate: "Taux de Satisfaction",
    yearsExperience: "Années d'Expérience",
    activeListings: "Annonces Actives",
    whyChooseUs: "Pourquoi Choisir INYUMBA PROJECT?",
    whyDesc:
      "Nous comprenons les défis auxquels les étudiants sont confrontés lors de la recherche d'un logement. C'est pourquoi nous avons construit une plateforme qui rend la recherche d'un logement étudiant facile, sûre et abordable.",
    featureVerified: "Propriétés Vérifiées",
    featureVerifiedDesc:
      "Toutes les propriétés sur notre plateforme sont vérifiées pour garantir qualité et sécurité.",
    featureStudentFriendly: "Prix Étudiant",
    featureStudentFriendlyDesc:
      "Des tarifs abordables conçus avec les budgets des étudiants à l'esprit.",
    featureLocation: "Près des Universités",
    featureLocationDesc:
      "Toutes les propriétés sont situées à distance de marche des principales universités.",
    featureSupport: "Support 24/7",
    featureSupportDesc:
      "Notre équipe dédiée est toujours disponible pour vous assister.",
    featureBooking: "Réservation Facile",
    featureBookingDesc:
      "Processus de réservation simple et sécurisé avec confirmation instantanée.",
    featurePayment: "Paiements Sécurisés",
    featurePaymentDesc:
      "Intégration MOMO pour des paiements sûrs et pratiques.",
    readMore: "En Savoir Plus",
    testimonials: "Ce que disent les étudiants",
    partnerWithUs: "Partenariat",
    partnerText:
      "Êtes-vous propriétaire avec un logement étudiant? Rejoignez notre plateforme et connectez-vous avec des milliers d'étudiants à la recherche d'un logement.",
    becomePartner: "Devenir Partenaire",
    ourStory: "Notre Histoire",
    storyText:
      "INYUMBA PROJECT est né d'un besoin réel de résoudre la crise du logement étudiant au Rwanda. Fondé par NTWARI Jean Rene, un entrepreneur visionnaire qui a vécu de première main les défis auxquels les étudiants sont confrontés lors de la recherche d'un logement. Le projet a commencé comme une idée simple - créer une plateforme qui connecte les étudiants avec des logements de qualité près de leurs universités. Aujourd'hui, INYUMBA PROJECT est devenu une marque de confiance, aidant des milliers d'étudiants à trouver leur maison parfaite à travers le Rwanda.",
    storyHighlight:
      "D'une idée simple à un mouvement qui change la façon dont les étudiants trouvent un logement au Rwanda.",
    journeyText:
      "Notre voyage a commencé à Musanze, près de INES-Ruhengeri, où nous avons vu des étudiants lutter pour trouver un logement sûr et abordable. Nous avons décidé d'agir et de construire une plateforme qui rendrait le processus simple, transparent et accessible à tous les étudiants, quel que soit leur parcours.",
    statsHeading: "Notre Impact en Chiffres",
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
    loadingStats: "Chargement des statistiques...",
    loadingHouses: "Chargement des maisons...",
    translating: "Traduction en cours...",
  },
  rw: {
    about: "Ibijyanye Na Twe",
    welcome: "Murakaza Neza Kuri INYUMBA PROJECT",
    tagline: "Umunyamuryango Wawe Wizewe W'amazu y'Abanyeshuri mu Rwanda",
    description:
      "INYUMBA PROJECT ni urubuga rw'amazu y'abanyeshuri rwateguwe kugira ngo rutange amazu meza, afite umutekano, kandi ari buhendutse kubanyeshuri bo mukaminuza mu Rwanda. Twashingiwe ku kwihangira ikibazo cy'amazu y'abanyeshuri, duhuza abanyeshuri n'abatunze inzu zemejwe zitanga amazu meza hafi ya kaminuza zabo.",
    mission: "Intego Yacu",
    missionText:
      "Guhuza abanyeshuri n'amazu meza mugutanga urubuga rwizewe, rworoshye, kandi rufite ubushobozi bwo kubona inzu y'umunyeshuri byoroshye kandi nta mpungenge.",
    vision: "Icyifuzo Cyacu",
    visionText:
      "Kuba urubuga rwambere rw'amazu y'abanyeshuri mu Burasirazuba bwa Afurika, dushyiraho umuryango aho buri munyeshuri abona amazu meza, afite umutekano, kandi ari buhendutse.",
    values: "Indangagaciro Zacu",
    stats: "Ingaruka Zacu",
    team: "Menya Itsinda Ryacu",
    contact: "Twandikire",
    getInTouch: "Twandikire Ubutumwa",
    email: "Imeri",
    phone: "Telefoni",
    location: "Aho Turi",
    address: "Musanze, Intara y'Amajyaruguru, Rwanda",
    sendMessage: "Ohereza Ubutumwa",
    name: "Izina Ryawe",
    message: "Ubutumwa Bwawe",
    submit: "Ohereza",
    teamMember: "Umunyamuryango",
    founder: "Uwashinze & CEO",
    developer: "Umuhanga Mukuru",
    designer: "UI/UX Designer",
    manager: "Umutware w'Ibyiciro",
    valueTransparency: "Kugaragara",
    valueTrust: "Ikwizera",
    valueExcellence: "Ubwiza",
    valueCommunity: "Umuryango",
    valueInnovation: "Ubuhanga",
    valueSafety: "Umutekano",
    transparencyDesc:
      "Twizera ko tugomba kugaragara mu byose dukora n'abanyeshuri, abatunze inzu, n'abafatanyabikorwa.",
    trustDesc:
      "Kubaka ikwizera binyuze mu mazu yemejwe, ubwishyu bufite umutekano, na serivisi zizewe.",
    excellenceDesc:
      "Guharanira ubwiza mu byose dukora, kuva ku rwego rw'urubuga kugeza ku serivisi zabakiriya.",
    communityDesc:
      "Kubaka umuryango w'abanyeshuri, abatunze inzu, n'abafatanyabikorwa bakorana.",
    innovationDesc:
      "Guhanga ubuhanga bushya buri gihe kugira ngo tuge ku rwego rushya mu mazu y'abanyeshuri.",
    safetyDesc:
      "Gushyira umutekano w'abanyeshuri imbere binyuze mu mazu yemejwe no mu bwishyu bufite umutekano.",
    housesListed: "Amazu Yanditswe",
    studentsHoused: "Abanyeshuri Bakiriwe",
    universities: "Kaminuza",
    satisfactionRate: "Igipimo Cyo Kunyurwa",
    yearsExperience: "Imyaka Y'ubumenyi",
    activeListings: "Amazu Akoreshwa",
    whyChooseUs: "Kuki Wahitamo INYUMBA PROJECT?",
    whyDesc:
      "Tumenye ibibazo abanyeshuri bahura nabyo mugihe bashaka amazu. Ni yo mpamvu twubatse urubuga rutuma gushaka inzu y'umunyeshuri byoroshye, bifite umutekano, kandi ari buhendutse.",
    featureVerified: "Amazu Yemejwe",
    featureVerifiedDesc:
      "Amazu yose kuri urubuga rwacu arajwemezwa kugira ngo habeho ubwiza n'umutekano.",
    featureStudentFriendly: "Ibiciro Bya Bunyeshuri",
    featureStudentFriendlyDesc:
      "Ibiciro bihendutse biteganyirijwe abanyeshuri.",
    featureLocation: "Hafi ya Kaminuza",
    featureLocationDesc:
      "Amazu yose ari hafi ya kaminuza, ashobora kugerwaho n'amaguru.",
    featureSupport: "Serivisi 24/7",
    featureSupportDesc: "Itsinda ryacu ryateguwe rihora riteguye kugufasha.",
    featureBooking: "Kwiyandikisha Byoroshye",
    featureBookingDesc:
      "Inzira yoroshye kandi ifite umutekano yo kwiyandikisha hamwe no kwemeza ako kanya.",
    featurePayment: "Ubwishyu Bufite Umutekano",
    featurePaymentDesc:
      "MOMO ifitanye isano n'urubuga kugira ngo ubwishyu buhoroshye kandi bufite umutekano.",
    readMore: "Soma Byinshi",
    testimonials: "Ibyo Abanyeshuri Bavuga",
    partnerWithUs: "Fatanya Na Twe",
    partnerText:
      "Uri nyir'inzu ufite amazu y'abanyeshuri? Winjire kuri urubuga rwacu ugahuza n'abanyeshuri benshi bashaka amazu.",
    becomePartner: "Kuba Umunyamuryango",
    ourStory: "Inkuru Yacu",
    storyText:
      "INYUMBA PROJECT yavutse mu kugira ikibazo nyacyo cy'amazu y'abanyeshuri mu Rwanda. Yashinzwe na NTWARI Jean Rene, umucuruzi w'ubwenge wabonye ibibazo abanyeshuri bahura nabyo mugihe bashaka amazu. Umushinga watangiriye ku gitekerezo cyoroshye - gukora urubuga ruhuza abanyeshuri n'amazu meza hafi ya kaminuza zabo. Ubu, INYUMBA PROJECT yakuze ikaba ikizamini cyizewe, ifasha abanyeshuri ibihumbi n'ibihumbi kubona inzu nziza mu Rwanda.",
    storyHighlight:
      "Kuva ku gitekerezo cyoroshye kugera ku rugendo ruhindura uko abanyeshuri babona amazu mu Rwanda.",
    journeyText:
      "Urubuga rwacu rwatangiriye i Musanze, hafi ya INES-Ruhengeri, aho twabonye abanyeshuri barwana n'ikibazo cy'amazu meza kandi afite umutekano. Twahisemo gukora urubuga rworoshye, rugaragara, kandi rufite ubushobozi kubanyeshuri bose.",
    statsHeading: "Ingaruka Zacu Mu Mibare",
    nameRequired: "Izina rirasabwa",
    nameMin: "Izina rigomba kuba nibura inyuguti 2",
    emailRequired: "Imeri irasabwa",
    emailInvalid: "Injiza aderesi ya imeri ikwiye",
    messageRequired: "Ubutumwa burasabwa",
    messageMin: "Ubutumwa bugomba kuba nibura inyuguti 10",
    sending: "Biremereza...",
    success: "Ubutumwa bwoherejwe neza! Tuzagusubiza vuba.",
    successTitle: "🎉 Ubutumwa Bwoherejwe!",
    errorTitle: "❌ Ntabwo Bwoherejwe",
    errorMessage: "Ongera ugerageze nyuma.",
    fail: "Ubutumwa ntibwoherejwe. Ongera ugerageze.",
    serverError: "Hari ikibazo kuri seriveri. Ongera ugerageze nyuma.",
    loadingStats: "Biremereza ibarurishamibare...",
    loadingHouses: "Biremereza amazu...",
    translating: "Biremereza ibisobanuro...",
  },
};

// Team member interface matching the API response
interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio: string;
  image: {
    public_id: string;
    url: string;
    secure_url: string;
  };
  social: {
    linkedin?: string;
    twitter?: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface TeamApiResponse {
  success: boolean;
  data: TeamMember[];
}

// Stats interface
interface StatsData {
  statistics?: {
    totalUsers?: number;
    activeUsers?: number;
    inactiveUsers?: number;
    verifiedUsers?: number;
    unverifiedUsers?: number;
    newUsersLast30Days?: number;
    usersByRole?: Array<{
      count: number;
      role: string;
    }>;
  };
  recentUsers?: Array<{
    _id: string;
    name: string;
    email: string;
    phone: string;
    isActive: boolean;
    role: string;
  }>;
}

// Helper function to get language from cookies
const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
  const lang = Cookies.get("language") as "en" | "fr" | "rw";
  return lang || "en";
};

// Helper function to calculate years of experience from July 2026
const calculateYearsOfExperience = (): number => {
  const startDate = new Date(2026, 6, 1);
  const currentDate = new Date();
  let years = currentDate.getFullYear() - startDate.getFullYear();
  const monthDiff = currentDate.getMonth() - startDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < startDate.getDate())) {
    years--;
  }
  return Math.max(0, years + 1);
};

// Google Translate API function
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
    
    // Parse the response
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
    // If translation fails, return original text
    console.error(error);
    return text;
  }
};

// Translate team member data using Google Translate API
const translateTeamMember = async (
  member: TeamMember, 
  targetLang: "en" | "fr" | "rw"
): Promise<TeamMember> => {
  if (targetLang === "en") {
    return member;
  }
  
  try {
    // Translate role and bio
    const [translatedRole, translatedBio] = await Promise.all([
      translateText(member.role, targetLang),
      translateText(member.bio, targetLang),
    ]);
    
    return {
      ...member,
      role: translatedRole,
      bio: translatedBio,
    };
  } catch (error) {
    // If translation fails, return original member
    console.error(error);
    return member;
  }
};

export const About: React.FC = () => {
  // Get language from cookies
  const [lang, setLang] = useState<"en" | "fr" | "rw">(
    getLanguageFromCookies(),
  );
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

  // Team members state
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [translatedTeamMembers, setTranslatedTeamMembers] = useState<TeamMember[]>([]);
  const [isTeamLoading, setIsTeamLoading] = useState(true);
  const [isTeamTranslating, setIsTeamTranslating] = useState(false);
  const [teamError, setTeamError] = useState<string | null>(null);

  // Stats state
  const [statsData, setStatsData] = useState<StatsData | null>(null);
  const [isStatsLoading, setIsStatsLoading] = useState(true);
  const [, setStatsError] = useState<string | null>(null);

  // Houses state for listed houses count
  const [listedHouses, setListedHouses] = useState<number>(0);
  const [isHousesLoading, setIsHousesLoading] = useState(true);
  const [, setHousesError] = useState<string | null>(null);

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

  // Get translations based on current language
  const t = translations[lang];

  // Fetch team members from API
  useEffect(() => {
    const fetchTeamMembers = async () => {
      setIsTeamLoading(true);
      setTeamError(null);
      try {
        const response = await axios.get<TeamApiResponse>(TEAM_API_URL);
        if (response.data && response.data.success && response.data.data) {
          setTeamMembers(response.data.data);
        } else {
          setTeamError("Failed to load team members");
        }
      } catch {
        setTeamError("Failed to load team members. Please try again later.");
      } finally {
        setIsTeamLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // Translate team members when language changes using Google Translate API
  useEffect(() => {
    const translateMembers = async () => {
      if (teamMembers.length === 0) return;
      
      setIsTeamTranslating(true);
      try {
        // Translate each team member
        const translated = await Promise.all(
          teamMembers.map(member => translateTeamMember(member, lang))
        );
        setTranslatedTeamMembers(translated);
      } catch (error) {
        // If translation fails, use original members
        console.error(error);
        setTranslatedTeamMembers(teamMembers);
      } finally {
        setIsTeamTranslating(false);
      }
    };

    translateMembers();
  }, [teamMembers, lang]);

  // Fetch stats from API
  useEffect(() => {
    const fetchStats = async () => {
      setIsStatsLoading(true);
      setStatsError(null);
      try {
        const response = await axios.get(STATS_API_URL);
        if (response.data) {
          setStatsData(response.data);
        } else {
          setStatsError("Failed to load statistics");
        }
      } catch {
        setStatsError("Failed to load statistics. Please try again later.");
      } finally {
        setIsStatsLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Fetch houses count
  useEffect(() => {
    const fetchHouses = async () => {
      setIsHousesLoading(true);
      setHousesError(null);
      try {
        const response = await axios.get(HOUSES_API_URL);
        if (response.data && Array.isArray(response.data)) {
          setListedHouses(response.data.length);
        } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
          setListedHouses(response.data.data.length);
        } else {
          setListedHouses(0);
        }
      } catch {
        setHousesError("Failed to load houses data.");
      } finally {
        setIsHousesLoading(false);
      }
    };

    fetchHouses();
  }, []);

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
      const response = await CONTACT_API.post("/", {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      if (response.data && response.data.success === true) {
        setStatusModal({
          isOpen: true,
          type: "success",
          title: t.successTitle,
          message: response.data.message || t.success,
          details: `Thank you, ${formData.name}! We'll get back to you soon.`,
        });

        setFormData({ name: "", email: "", message: "" });
        setIsNameValid(null);
        setIsEmailValid(null);
        setIsMessageValid(null);
        setIsFormValid(false);
      } else {
        const errorMsg = response.data?.message || t.fail;
        setStatusModal({
          isOpen: true,
          type: "error",
          title: t.errorTitle,
          message: errorMsg,
          details: `Please check your input and try again.`,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorMessage =
            error.response.data?.message ||
            error.response.data?.error ||
            t.serverError;
          const errorDetails = `Status: ${error.response.status}`;

          setStatusModal({
            isOpen: true,
            type: "error",
            title: t.errorTitle,
            message: errorMessage,
            details: errorDetails,
          });
        } else if (error.request) {
          setStatusModal({
            isOpen: true,
            type: "error",
            title: t.errorTitle,
            message: "No response from server",
            details: "Please check your internet connection and try again.",
          });
        } else {
          setStatusModal({
            isOpen: true,
            type: "error",
            title: t.errorTitle,
            message: t.fail,
            details: error.message || "Please try again or contact support.",
          });
        }
      } else {
        setStatusModal({
          isOpen: true,
          type: "error",
          title: t.errorTitle,
          message: t.fail,
          details: "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get stats values with fallbacks - properly accessing the nested structure
  const totalUsers = statsData?.statistics?.totalUsers || 0;
  const yearsExperience = calculateYearsOfExperience();
  const universitiesCount = 18;
  const satisfactionRate = "98%";
  const listedHousesCount = listedHouses || 0;
  const activeListingsCount = listedHouses || 0;

  const stats = [
    { value: `${listedHousesCount}+`, label: t.housesListed, icon: <HomeIcon /> },
    { value: `${totalUsers}`, label: t.studentsHoused, icon: <PeopleIcon /> },
    { value: `${universitiesCount}`, label: t.universities, icon: <SchoolIcon /> },
    { value: satisfactionRate, label: t.satisfactionRate, icon: <StarIcon /> },
    { value: `${yearsExperience}+`, label: t.yearsExperience, icon: <TrendingUpIcon /> },
    { value: `${activeListingsCount}+`, label: t.activeListings, icon: <VerifiedIcon /> },
  ];

  const values = [
    {
      title: t.valueTransparency,
      icon: <HandshakeIcon />,
      color: "from-blue-400 to-blue-600",
      desc: t.transparencyDesc,
    },
    {
      title: t.valueTrust,
      icon: <VerifiedIcon />,
      color: "from-green-400 to-green-600",
      desc: t.trustDesc,
    },
    {
      title: t.valueExcellence,
      icon: <StarIcon />,
      color: "from-yellow-400 to-yellow-600",
      desc: t.excellenceDesc,
    },
    {
      title: t.valueCommunity,
      icon: <Diversity3Icon />,
      color: "from-purple-400 to-purple-600",
      desc: t.communityDesc,
    },
    {
      title: t.valueInnovation,
      icon: <BuildIcon />,
      color: "from-red-400 to-red-600",
      desc: t.innovationDesc,
    },
    {
      title: t.valueSafety,
      icon: <SecurityIcon />,
      color: "from-indigo-400 to-indigo-600",
      desc: t.safetyDesc,
    },
  ];

  const features = [
    {
      icon: <VerifiedIcon className="text-white" />,
      title: t.featureVerified,
      desc: t.featureVerifiedDesc,
      color: "bg-green-500",
    },
    {
      icon: <PaymentsIcon className="text-white" />,
      title: t.featureStudentFriendly,
      desc: t.featureStudentFriendlyDesc,
      color: "bg-blue-500",
    },
    {
      icon: <LocationCityIcon className="text-white" />,
      title: t.featureLocation,
      desc: t.featureLocationDesc,
      color: "bg-purple-500",
    },
    {
      icon: <SupportAgentIcon className="text-white" />,
      title: t.featureSupport,
      desc: t.featureSupportDesc,
      color: "bg-orange-500",
    },
    {
      icon: <AssignmentIcon className="text-white" />,
      title: t.featureBooking,
      desc: t.featureBookingDesc,
      color: "bg-red-500",
    },
    {
      icon: <SecurityIcon className="text-white" />,
      title: t.featurePayment,
      desc: t.featurePaymentDesc,
      color: "bg-indigo-500",
    },
  ];

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

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-[#FF385C] to-[#E31C5F] py-16 sm:py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white rounded-full -mt-20 -mr-20"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -mb-40 -ml-40"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center text-white"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6"
              >
                <span className="text-sm font-medium flex items-center gap-2">
                  <AutoAwesomeIcon className="w-4 h-4" />
                  {t.about}
                </span>
              </motion.div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {t.welcome}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light">
                {t.tagline}
              </p>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H0Z"
                fill="#F9FAFB"
              />
            </svg>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  {t.ourStory}
                </h2>
                <div className="w-20 h-1 bg-[#FF385C] rounded-full mb-6"></div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {t.storyText}
                </p>
                <p className="text-gray-600 leading-relaxed">{t.journeyText}</p>
                <div className="mt-6 p-4 bg-[#FF385C]/5 rounded-xl border border-[#FF385C]/20">
                  <p className="text-[#FF385C] font-medium italic">
                    "{t.storyHighlight}"
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-[#FF385C] to-[#E31C5F] rounded-2xl p-6 text-white h-32 flex flex-col justify-center">
                      <p className="text-3xl font-bold">{listedHousesCount}+</p>
                      <p className="text-sm opacity-90">{t.housesListed}</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white h-32 flex flex-col justify-center">
                      <p className="text-3xl font-bold">{totalUsers}</p>
                      <p className="text-sm opacity-90">{t.studentsHoused}</p>
                    </div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white h-32 flex flex-col justify-center">
                      <p className="text-3xl font-bold">{universitiesCount}</p>
                      <p className="text-sm opacity-90">{t.universities}</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white h-32 flex flex-col justify-center">
                      <p className="text-3xl font-bold">{satisfactionRate}</p>
                      <p className="text-sm opacity-90">{t.satisfactionRate}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#FF385C]/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                {t.statsHeading}
              </h2>
              <div className="w-20 h-1 bg-[#FF385C] rounded-full mx-auto mt-4"></div>
            </motion.div>
            {(isStatsLoading || isHousesLoading) ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-[#FF385C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-500">{t.loadingStats}</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-2xl p-4 sm:p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FF385C]/10 rounded-full flex items-center justify-center mx-auto mb-3 text-[#FF385C]">
                      {stat.icon}
                    </div>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#FF385C]/10 rounded-full blur-xl"></div>
                <div className="relative bg-gradient-to-br from-[#FF385C]/5 to-[#E31C5F]/5 rounded-2xl p-6 sm:p-8 border border-[#FF385C]/20 hover:border-[#FF385C]/40 transition-colors">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FF385C]/20 rounded-full flex items-center justify-center mb-4">
                    <SchoolIcon className="w-6 h-6 sm:w-7 sm:h-7 text-[#FF385C]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                    {t.mission}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t.missionText}
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
                <div className="relative bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl p-6 sm:p-8 border border-blue-200/30 hover:border-blue-400/50 transition-colors">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                    <LocationOnIcon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-500" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                    {t.vision}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t.visionText}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                {t.values}
              </h2>
              <div className="w-20 h-1 bg-[#FF385C] rounded-full mx-auto mt-4"></div>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                >
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300`}
                  >
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {value.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                {t.whyChooseUs}
              </h2>
              <div className="w-20 h-1 bg-[#FF385C] rounded-full mx-auto mt-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                {t.whyDesc}
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  className="flex gap-4 p-4 rounded-xl bg-gray-50 hover:bg-white transition-all duration-300 border border-gray-100 hover:shadow-lg"
                >
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                      {feature.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section - With Google Translate API translations */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                {t.team}
              </h2>
              <div className="w-20 h-1 bg-[#FF385C] rounded-full mx-auto mt-4"></div>
            </motion.div>

            {isTeamLoading || isTeamTranslating ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-[#FF385C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-500">{isTeamTranslating ? t.translating : "Loading team members..."}</p>
                </div>
              </div>
            ) : teamError ? (
              <div className="text-center py-12">
                <div className="text-red-500 mb-2">
                  <ErrorOutlineOutlined className="w-12 h-12 mx-auto" />
                </div>
                <p className="text-gray-700">{teamError}</p>
              </div>
            ) : translatedTeamMembers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {translatedTeamMembers.map((member, index) => (
                  <motion.div
                    key={member._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4 }}
                    className="bg-gray-50 rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-xl border border-gray-100"
                  >
                    <img
                      src={member.image?.url || member.image?.secure_url}
                      alt={member.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-4 border-4 border-[#FF385C]/20 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            member.name,
                          )}&size=150&background=FF385C&color=fff&font-size=0.5`;
                      }}
                    />
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                      {member.name}
                    </h4>
                    <p className="text-xs text-[#FF385C] font-medium mt-1">
                      {member.role}
                    </p>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>
                    <div className="flex justify-center gap-3 mt-4">
                      {member.social?.linkedin && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-[#FF385C] transition-colors"
                        >
                          <LinkedInIcon className="w-5 h-5" />
                        </a>
                      )}
                      {member.social?.twitter && (
                        <a
                          href={member.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-[#FF385C] transition-colors"
                        >
                          <TwitterIcon className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No team members found.</p>
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                {t.contact}
              </h2>
              <div className="w-20 h-1 bg-[#FF385C] rounded-full mx-auto mt-4"></div>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {t.getInTouch}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#FF385C]/10 rounded-full flex items-center justify-center text-[#FF385C]">
                        <EmailIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">{t.email}</p>
                        <p className="text-sm text-gray-900">
                          inyumbarental@gmail.com
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#FF385C]/10 rounded-full flex items-center justify-center text-[#FF385C]">
                        <PhoneIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">{t.phone}</p>
                        <p className="text-sm text-gray-900">
                          +250 780 414 088
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#FF385C]/10 rounded-full flex items-center justify-center text-[#FF385C]">
                        <LocationOnIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">{t.location}</p>
                        <p className="text-sm text-gray-900">{t.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {t.partnerWithUs}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">{t.partnerText}</p>
                  <button className="px-6 py-2 bg-[#FF385C] text-white rounded-full font-medium hover:bg-[#E31C5F] transition-colors text-sm">
                    {t.becomePartner}
                  </button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {t.sendMessage}
                  </h3>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    noValidate
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.name}
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
                                : "border-gray-300 focus:border-[#FF385C] focus:ring-[#FF385C]"
                          }`}
                          placeholder="John Doe"
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

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.email}
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
                                : "border-gray-300 focus:border-[#FF385C] focus:ring-[#FF385C]"
                          }`}
                          placeholder="you@example.com"
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

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.message}
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
                                : "border-gray-300 focus:border-[#FF385C] focus:ring-[#FF385C]"
                          }`}
                          placeholder="Your message here..."
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

                    <motion.button
                      whileHover={{ scale: isFormValid ? 1.02 : 1 }}
                      whileTap={{ scale: isFormValid ? 0.98 : 1 }}
                      type="submit"
                      disabled={!isFormValid || isSubmitting}
                      className={`w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                        isFormValid && !isSubmitting
                          ? "bg-[#FF385C] text-white hover:bg-[#E31C5F] shadow-lg shadow-[#FF385C]/30 cursor-pointer"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
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
                          {t.submit}
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
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};