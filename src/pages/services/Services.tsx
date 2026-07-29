/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/immutability */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

// Material-UI Icons - Only imported ones that are used
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import SecurityIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PaymentsIcon from "@mui/icons-material/Payments";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import VerifiedIcon from "@mui/icons-material/Verified";
import HandshakeIcon from "@mui/icons-material/Handshake";
import BuildIcon from "@mui/icons-material/Build";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PeopleIcon from "@mui/icons-material/People";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WifiIcon from "@mui/icons-material/Wifi";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";

// Translations
const translations = {
  en: {
    services: "Our Services",
    tagline: "Comprehensive Student Housing Solutions",
    description:
      "INYUMBA PROJECT offers a wide range of services designed to make finding and managing student housing simple, safe, and stress-free.",
    ourServices: "What We Offer",
    forStudents: "For Students",
    forLandlords: "For Landlords",
    forUniversities: "For Universities",
    studentServices: "Student Services",
    landlordServices: "Landlord Services",
    universityServices: "University Services",
    serviceList: "Our Services",
    howItWorks: "How It Works",
    process: "Simple 4-Step Process",
    step1: "Search & Discover",
    step1Desc:
      "Browse through our extensive database of verified student houses across Rwanda. Filter by university, location, price, and amenities.",
    step2: "Book & Confirm",
    step2Desc:
      "Select your preferred house and book it instantly. Receive immediate confirmation and contact details of the landlord.",
    step3: "Pay Securely",
    step3Desc:
      "Make secure payments using MOMO. Your payment is protected and only released to the landlord upon your satisfaction.",
    step4: "Move In & Enjoy",
    step4Desc:
      "Move into your new student home with peace of mind. Our team is always available for support.",
    whyChoose: "Why Choose Our Services",
    stats: "Service Impact",
    statsHeading: "Our Service Impact in Numbers",
    activeUsers: "Active Users",
    successfulBookings: "Successful Bookings",
    verifiedHouses: "Verified Houses",
    activeLandlords: "Active Landlords",
    satisfaction: "Service Satisfaction",
    contact: "Get in Touch",
    contactDesc:
      "Have questions about our services? Reach out to us and we'll be happy to help.",
    name: "Your Name",
    email: "Email Address",
    message: "Your Message",
    submit: "Send Message",
    sending: "Sending...",
    success: "Message sent successfully! We'll get back to you soon.",
    address: "Musanze, Northern Province, Rwanda",
    phone: "+250 780 414 088",
    emailAddress: "inyumba@yahoo.fr",
    service1: "Verified House Listings",
    service1Desc:
      "All houses on our platform are verified to ensure quality, safety, and comfort for students.",
    service2: "Student-Friendly Pricing",
    service2Desc:
      "Affordable rates designed specifically for student budgets with flexible payment options.",
    service3: "Secure Booking System",
    service3Desc:
      "Instant booking with secure confirmation and protected payments through MOMO integration.",
    service4: "24/7 Student Support",
    service4Desc:
      "Our dedicated support team is available around the clock to assist with any issues.",
    service5: "Location-Based Search",
    service5Desc:
      "Find houses near your university with our advanced location-based search technology.",
    service6: "Landlord Management",
    service6Desc:
      "Easy listing management for landlords with real-time booking notifications and payment tracking.",
    service7: "University Partnerships",
    service7Desc:
      "Official partnerships with universities to provide verified housing options for students.",
    service8: "Amenity Filtering",
    service8Desc:
      "Filter houses by amenities including WiFi, parking, kitchen, security, and more.",
    service9: "MOMO Payment Integration",
    service9Desc:
      "Secure and convenient payments using MOMO mobile money for easy transactions.",
    service10: "House Management Tools",
    service10Desc:
      "Tools for landlords to manage listings, track bookings, and communicate with students.",
    service11: "Student Feedback System",
    service11Desc:
      "Transparent feedback system allowing students to rate and review houses and landlords.",
    service12: "Property Verification",
    service12Desc:
      "Thorough verification process ensuring all properties meet our quality and safety standards.",
    viewAll: "View All Services",
    readMore: "Read More",
    bookNow: "Book Now",
    becomeHost: "Become a Host",
    partnerWithUs: "Partner With Us",
  },
  fr: {
    services: "Nos Services",
    tagline: "Solutions Complètes de Logement Étudiant",
    description:
      "INYUMBA PROJECT offre une large gamme de services conçus pour rendre la recherche et la gestion de logements étudiants simple, sûre et sans stress.",
    ourServices: "Ce Que Nous Offrons",
    forStudents: "Pour les Étudiants",
    forLandlords: "Pour les Propriétaires",
    forUniversities: "Pour les Universités",
    studentServices: "Services Étudiants",
    landlordServices: "Services Propriétaires",
    universityServices: "Services Universitaires",
    serviceList: "Nos Services",
    howItWorks: "Comment Ça Marche",
    process: "Processus Simple en 4 Étapes",
    step1: "Rechercher & Découvrir",
    step1Desc:
      "Parcourez notre vaste base de données de maisons étudiantes vérifiées à travers le Rwanda. Filtrez par université, emplacement, prix et équipements.",
    step2: "Réserver & Confirmer",
    step2Desc:
      "Sélectionnez votre maison préférée et réservez-la instantanément. Recevez une confirmation immédiate et les coordonnées du propriétaire.",
    step3: "Payer en Toute Sécurité",
    step3Desc:
      "Effectuez des paiements sécurisés avec MOMO. Votre paiement est protégé et n'est versé au propriétaire qu'après votre satisfaction.",
    step4: "Emmenager & Profiter",
    step4Desc:
      "Installez-vous dans votre nouveau logement étudiant en toute tranquillité. Notre équipe est toujours disponible pour vous soutenir.",
    whyChoose: "Pourquoi Choisir Nos Services",
    stats: "Impact des Services",
    statsHeading: "Notre Impact en Chiffres",
    activeUsers: "Utilisateurs Actifs",
    successfulBookings: "Réservations Réussies",
    verifiedHouses: "Maisons Vérifiées",
    activeLandlords: "Propriétaires Actifs",
    satisfaction: "Satisfaction Service",
    contact: "Contactez-Nous",
    contactDesc:
      "Des questions sur nos services? Contactez-nous et nous serons ravis de vous aider.",
    name: "Votre Nom",
    email: "Adresse E-mail",
    message: "Votre Message",
    submit: "Envoyer",
    sending: "Envoi en cours...",
    success: "Message envoyé avec succès ! Nous vous répondrons bientôt.",
    address: "Musanze, Province du Nord, Rwanda",
    phone: "+250 780 414 088",
    emailAddress: "inyumba@yahoo.fr",
    service1: "Annonces Vérifiées",
    service1Desc:
      "Toutes les maisons sur notre plateforme sont vérifiées pour garantir qualité, sécurité et confort.",
    service2: "Prix Étudiants",
    service2Desc:
      "Des tarifs abordables conçus pour les budgets étudiants avec des options de paiement flexibles.",
    service3: "Réservation Sécurisée",
    service3Desc:
      "Réservation instantanée avec confirmation sécurisée et paiements protégés via MOMO.",
    service4: "Support Étudiant 24/7",
    service4Desc:
      "Notre équipe de support dédiée est disponible 24h/24 pour toute assistance.",
    service5: "Recherche par Lieu",
    service5Desc:
      "Trouvez des maisons près de votre université avec notre technologie de recherche avancée.",
    service6: "Gestion des Propriétaires",
    service6Desc:
      "Gestion facile des annonces pour propriétaires avec notifications de réservation en temps réel.",
    service7: "Partenariats Universitaires",
    service7Desc:
      "Partenariats officiels avec les universités pour fournir des options de logement vérifiées.",
    service8: "Filtrage par Équipements",
    service8Desc:
      "Filtrez les maisons par équipements : WiFi, parking, cuisine, sécurité, etc.",
    service9: "Intégration Paiement MOMO",
    service9Desc:
      "Paiements sécurisés et pratiques via MOMO pour des transactions faciles.",
    service10: "Outils de Gestion",
    service10Desc:
      "Outils pour les propriétaires pour gérer les annonces, suivre les réservations et communiquer.",
    service11: "Système d'Avis",
    service11Desc:
      "Système transparent permettant aux étudiants de noter les maisons et propriétaires.",
    service12: "Vérification des Propriétés",
    service12Desc:
      "Processus de vérification approfondi garantissant la qualité et la sécurité.",
    viewAll: "Voir Tous",
    readMore: "En Savoir Plus",
    bookNow: "Réserver",
    becomeHost: "Devenir Hôte",
    partnerWithUs: "Partenariat",
  },
  rw: {
    services: "Serivisi Zacu",
    tagline: "Ibicuruzwa Byuzuye By'amazu y'Abanyeshuri",
    description:
      "INYUMBA PROJECT itanga serivisi nyinshi zateguwe kugira ngo gushaka no kugenzura amazu y'abanyeshuri bibe byoroshye, bifite umutekano, kandi nta mpungenge.",
    ourServices: "Ibyo Dutanga",
    forStudents: "Kubanyeshuri",
    forLandlords: "Kubatunze Inzu",
    forUniversities: "Kubaminuza",
    studentServices: "Serivisi Kubanyeshuri",
    landlordServices: "Serivisi Kubatunze Inzu",
    universityServices: "Serivisi Kubaminuza",
    serviceList: "Serivisi Zacu",
    howItWorks: "Uko Bikora",
    process: "Inzira Yorosheye mu Byiciro 4",
    step1: "Shakisha & Menya",
    step1Desc:
      "Reba amazu y'abanyeshuri yemewe muri database yacu. Hitamo ukurikije kaminuza, aho gihe, igiciro, n'ibikoresho.",
    step2: "Icyemezo & Kwemeza",
    step2Desc:
      "Hitamo inzu ukunda maze uyiyandikishe ako kanya. Ubona ubutumwa bwo kwemeza na numero ya nyir'inzu.",
    step3: "Tanga Imbaraga MOMO",
    step3Desc:
      "Kora ubwishyu bufite umutekano ukoresheje MOMO. Ubwishyu bwawe burabungabungwa kugeza ushyize mu nzu.",
    step4: "Kwinjira & Kwigira",
    step4Desc:
      "Injira mu nzu yawe nta mpungenge. Itsinda ryacu rihorite rishobora kugufasha.",
    whyChoose: "Kuki Wahitamo Serivisi Zacu",
    stats: "Ingaruka Z'umushinga",
    statsHeading: "Ingaruka Zacu Mu Mibare",
    activeUsers: "Abakoresha",
    successfulBookings: "Icyemezo Byakunze",
    verifiedHouses: "Amazu Yemejwe",
    activeLandlords: "Abatunze Inzu",
    satisfaction: "Kunyurwa",
    contact: "Twandikire",
    contactDesc:
      "Ufite ikibazo kuri serivisi zacu? Twandikire kandi turaneze kugufasha.",
    name: "Izina Ryawe",
    email: "Aderesi ya Imeri",
    message: "Ubutumwa Bwawe",
    submit: "Ohereza",
    sending: "Biremereza...",
    success: "Ubutumwa bwoherejwe neza! Tuzagusubiza vuba.",
    address: "Musanze, Intara y'Amajyaruguru, Rwanda",
    phone: "+250 780 414 088",
    emailAddress: "inyumba@yahoo.fr",
    service1: "Amazu Yemejwe",
    service1Desc:
      "Amazu yose kuri urubuga rwacu arajwemezwa kugira ngo habeho ubwiza n'umutekano.",
    service2: "Ibiciro Bya Bunyeshuri",
    service2Desc: "Ibiciro bihendutse biteganyirijwe abanyeshuri.",
    service3: "Kwiyandikisha Bufite Umutekano",
    service3Desc:
      "Kwiyandikisha ako kanya no kwemeza bifite umutekano binyuze muri MOMO.",
    service4: "Serivisi 24/7",
    service4Desc: "Itsinda ryacu ryateguwe rihora riteguye kugufasha.",
    service5: "Kureba Aho Uri",
    service5Desc:
      "Shakisha amazu hafi ya kaminuza yawe ukoresheje tekinoroji nshya.",
    service6: "Gucunga Inzu",
    service6Desc:
      "Gucunga inzu byoroshye kubatunze inzu hamwe n'ubutumwa bwo kwiyandikisha.",
    service7: "Ubufatanye N'amaminuza",
    service7Desc:
      "Ubufatanye bwemewe n'amaminuza gutanga amazu yemewe kubanyeshuri.",
    service8: "Kureba Ibikoresho",
    service8Desc:
      "Hitamo amazu ukurikije ibikoresho nka WiFi, parking, gitebe, umutekano, n'ibindi.",
    service9: "Ubwishyu Bwa MOMO",
    service9Desc: "Ubwishyu buhoroshye kandi bufite umutekano ukoresheje MOMO.",
    service10: "Ibikoresho Byo Gucunga",
    service10Desc:
      "Ibikoresho kubatunze inzu kugira ngo bacunge, barebe icyemezo, kandi bavugane n'abanyeshuri.",
    service11: "Gusuzuma Inzu",
    service11Desc: "Uburyo bwo gusuzuma inzu n'abatunze inzu kubanyeshuri.",
    service12: "Kugenzura Inzu",
    service12Desc: "Kugenzura inzu kugira ngo habeho ubwiza n'umutekano.",
    viewAll: "Reba Zose",
    readMore: "Soma Byinshi",
    bookNow: "Icyemezo",
    becomeHost: "Kuba Umwakirizi",
    partnerWithUs: "Fatanya Na Twe",
  },
};

interface Service {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  category: "student" | "landlord" | "university";
  color: string;
  bgColor: string;
  features?: string[];
}

// Helper function to get language from cookies
const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
  const lang = Cookies.get("language") as "en" | "fr" | "rw";
  return lang || "en";
};

export const Services: React.FC = () => {
  // Get language from cookies
  const [lang, setLang] = useState<"en" | "fr" | "rw">(
    getLanguageFromCookies(),
  );
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "student" | "landlord" | "university"
  >("all");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState<boolean | null>(null);
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [isMessageValid, setIsMessageValid] = useState<boolean | null>(null);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const t = translations[lang];

  // Listen for language changes in cookies
  useEffect(() => {
    const handleCookieChange = () => {
      const newLang = getLanguageFromCookies();
      if (newLang !== lang) {
        setLang(newLang);
      }
    };

    // Check for cookie changes every second (polling)
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

    // Clear errors when field becomes valid
    if (nameValid && errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
    if (emailValid && errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
    if (messageValid && errors.message) {
      setErrors((prev) => ({ ...prev, message: undefined }));
    }
  }, [formData.name, formData.email, formData.message]);

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
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message || formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(t.success);
      setFormData({ name: "", email: "", message: "" });
      setIsNameValid(null);
      setIsEmailValid(null);
      setIsMessageValid(null);
      setIsFormValid(false);
    }, 1500);
  };

  const services: Service[] = [
    // Student Services
    {
      id: 1,
      icon: <VerifiedIcon />,
      title: t.service1,
      description: t.service1Desc,
      category: "student",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      features: ["Quality Assurance", "Safety Checks", "Photo Verification"],
    },
    {
      id: 2,
      icon: <PaymentsIcon />,
      title: t.service2,
      description: t.service2Desc,
      category: "student",
      color: "text-green-500",
      bgColor: "bg-green-50",
      features: ["Student Budgets", "Flexible Payment", "No Hidden Fees"],
    },
    {
      id: 3,
      icon: <SecurityIcon />,
      title: t.service3,
      description: t.service3Desc,
      category: "student",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      features: ["Instant Booking", "Secure Confirmation", "MOMO Integration"],
    },
    {
      id: 4,
      icon: <SupportAgentIcon />,
      title: t.service4,
      description: t.service4Desc,
      category: "student",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      features: ["24/7 Support", "Live Chat", "Emergency Assistance"],
    },
    {
      id: 5,
      icon: <LocationCityIcon />,
      title: t.service5,
      description: t.service5Desc,
      category: "student",
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
      features: ["Near Campus", "GPS Location", "Interactive Map"],
    },
    {
      id: 8,
      icon: <WifiIcon />,
      title: t.service8,
      description: t.service8Desc,
      category: "student",
      color: "text-cyan-500",
      bgColor: "bg-cyan-50",
      features: [
        "WiFi Filter",
        "Parking Filter",
        "Kitchen Filter",
        "Security Filter",
      ],
    },
    {
      id: 9,
      icon: <PaymentsIcon />,
      title: t.service9,
      description: t.service9Desc,
      category: "student",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
      features: ["Mobile Money", "Secure Transactions", "Instant Confirmation"],
    },
    {
      id: 11,
      icon: <StarIcon />,
      title: t.service11,
      description: t.service11Desc,
      category: "student",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      features: ["Ratings", "Reviews", "Transparent Feedback"],
    },
    // Landlord Services
    {
      id: 6,
      icon: <BuildIcon />,
      title: t.service6,
      description: t.service6Desc,
      category: "landlord",
      color: "text-red-500",
      bgColor: "bg-red-50",
      features: ["Listing Management", "Booking Tracking", "Payment Reports"],
    },
    {
      id: 10,
      icon: <AssignmentIcon />,
      title: t.service10,
      description: t.service10Desc,
      category: "landlord",
      color: "text-teal-500",
      bgColor: "bg-teal-50",
      features: ["Dashboard", "Analytics", "Communication Tools"],
    },
    {
      id: 12,
      icon: <HandshakeIcon />,
      title: t.service12,
      description: t.service12Desc,
      category: "landlord",
      color: "text-rose-500",
      bgColor: "bg-rose-50",
      features: [
        "Property Inspection",
        "Quality Standards",
        "Safety Compliance",
      ],
    },
    // University Services
    {
      id: 7,
      icon: <SchoolIcon />,
      title: t.service7,
      description: t.service7Desc,
      category: "university",
      color: "text-sky-500",
      bgColor: "bg-sky-50",
      features: [
        "Official Partnerships",
        "Verified Housing",
        "Student Support",
      ],
    },
  ];

  const filteredServices =
    selectedCategory === "all"
      ? services
      : services.filter((s) => s.category === selectedCategory);

  const stats = [
    { value: "5,000+", label: t.activeUsers, icon: <PeopleIcon /> },
    { value: "2,134", label: t.successfulBookings, icon: <CheckCircleIcon /> },
    { value: "156", label: t.verifiedHouses, icon: <HomeIcon /> },
    { value: "48", label: t.activeLandlords, icon: <HandshakeIcon /> },
    { value: "98%", label: t.satisfaction, icon: <StarIcon /> },
  ];

  const steps = [
    {
      icon: "🔍",
      title: t.step1,
      desc: t.step1Desc,
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: "✅",
      title: t.step2,
      desc: t.step2Desc,
      color: "from-green-400 to-green-600",
    },
    {
      icon: "💰",
      title: t.step3,
      desc: t.step3Desc,
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: "🏠",
      title: t.step4,
      desc: t.step4Desc,
      color: "from-orange-400 to-orange-600",
    },
  ];

  const categoryButtons = [
    { id: "all", label: "All Services", icon: <AutoAwesomeIcon /> },
    { id: "student", label: t.forStudents, icon: <PeopleIcon /> },
    { id: "landlord", label: t.forLandlords, icon: <HomeIcon /> },
    { id: "university", label: t.forUniversities, icon: <SchoolIcon /> },
  ];

  return (
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
                {t.services}
              </span>
            </motion.div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {t.tagline}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light">
              {t.description}
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

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-[#FF385C]/10 rounded-full flex items-center justify-center mx-auto mb-3 text-[#FF385C]">
                  {stat.icon}
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categoryButtons.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  setSelectedCategory(
                    category.id as
                      | "all"
                      | "student"
                      | "landlord"
                      | "university",
                  )
                }
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? "bg-[#FF385C] text-white shadow-lg shadow-[#FF385C]/30"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category.icon}
                {category.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {t.serviceList}
            </h2>
            <div className="w-20 h-1 bg-[#FF385C] rounded-full mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              {selectedCategory === "all"
                ? "Explore all our services"
                : selectedCategory === "student"
                  ? t.studentServices
                  : selectedCategory === "landlord"
                    ? t.landlordServices
                    : t.universityServices}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div
                  className={`w-14 h-14 ${service.bgColor} rounded-xl flex items-center justify-center mb-4 ${service.color}`}
                >
                  {React.cloneElement(service.icon as React.ReactElement<any>, {
                    className: "w-7 h-7",
                  })}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                {service.features && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {service.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="inline-block px-3 py-1 bg-[#FF385C]/10 text-[#FF385C] rounded-full text-xs font-medium">
                    {service.category === "student"
                      ? t.forStudents
                      : service.category === "landlord"
                        ? t.forLandlords
                        : t.forUniversities}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
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
              {t.process}
            </h2>
            <div className="w-20 h-1 bg-[#FF385C] rounded-full mx-auto mt-4"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="relative"
              >
                <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4`}
                  >
                    {index + 1}
                  </div>
                  <div className="text-4xl mb-3">{step.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-gray-300">
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
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
              {t.whyChoose}
            </h2>
            <div className="w-20 h-1 bg-[#FF385C] rounded-full mx-auto mt-4"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <VerifiedIcon />,
                title: "Verified Properties",
                desc: "Every property is verified for quality and safety",
                color: "bg-green-500",
              },
              {
                icon: <SecurityIcon />,
                title: "Secure Payments",
                desc: "Protected transactions with MOMO integration",
                color: "bg-blue-500",
              },
              {
                icon: <SupportAgentIcon />,
                title: "24/7 Support",
                desc: "Dedicated team always ready to help",
                color: "bg-purple-500",
              },
              {
                icon: <LocationCityIcon />,
                title: "Near Campus",
                desc: "Properties located close to universities",
                color: "bg-orange-500",
              },
              {
                icon: <PaymentsIcon />,
                title: "Student Budgets",
                desc: "Affordable rates for students",
                color: "bg-red-500",
              },
              {
                icon: <HandshakeIcon />,
                title: "Trusted Platform",
                desc: "Building trust through transparency",
                color: "bg-indigo-500",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex items-start gap-4"
              >
                <div
                  className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0 text-white`}
                >
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with Form */}
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
              {t.contact}
            </h2>
            <div className="w-20 h-1 bg-[#FF385C] rounded-full mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              {t.contactDesc}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Get in Touch
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FF385C]/10 rounded-full flex items-center justify-center text-[#FF385C]">
                      <EmailIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm text-gray-900">{t.emailAddress}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FF385C]/10 rounded-full flex items-center justify-center text-[#FF385C]">
                      <PhoneIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm text-gray-900">{t.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FF385C]/10 rounded-full flex items-center justify-center text-[#FF385C]">
                      <LocationOnIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm text-gray-900">{t.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Quick Actions
                </h4>
                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 bg-[#FF385C] text-white rounded-full font-medium hover:bg-[#E31C5F] transition-colors text-sm">
                    {t.bookNow}
                  </button>
                  <button className="px-4 py-2 border border-[#FF385C] text-[#FF385C] rounded-full font-medium hover:bg-[#FF385C] hover:text-white transition-colors text-sm">
                    {t.becomeHost}
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300 transition-colors text-sm">
                    {t.partnerWithUs}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Send a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.name}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-1 transition-colors text-sm ${
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
                      <p className="text-xs text-red-500 mt-1">{errors.name}</p>
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
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-1 transition-colors text-sm ${
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
                        ✓ Valid email
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
  );
};
