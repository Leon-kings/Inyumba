/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/immutability */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

// Material-UI Icons
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { HelpOutlined, HelpOutlineRounded } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import SecurityIcon from "@mui/icons-material/Security";
import PaymentsIcon from "@mui/icons-material/Payments";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import VerifiedIcon from "@mui/icons-material/Verified";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ChatIcon from "@mui/icons-material/Chat";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";
import ArticleIcon from "@mui/icons-material/Article";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import BookIcon from "@mui/icons-material/Book";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Translations
const translations = {
  en: {
    help: "Help Center",
    tagline: "Everything you need to know about INYUMBA PROJECT",
    searchPlaceholder: "Search for help articles...",
    noResults: "No results found for your search.",
    clearSearch: "Clear search",
    categories: "Categories",
    popularArticles: "Popular Articles",
    guide: "Guide",
    video: "Video Tutorial",
    article: "Article",
    gettingStarted: "Getting Started",
    studentGuide: "Student Guide",
    landlordGuide: "Landlord Guide",
    paymentGuide: "Payment Guide",
    safetyTips: "Safety Tips",
    contactSupport: "Contact Support",
    supportDesc:
      "Our support team is available 24/7 to help you with any issues.",
    emailSupport: "Email Support",
    phoneSupport: "Phone Support",
    liveChat: "Live Chat",
    chatOffline: "Chat is currently offline. Please email or call us.",
    onlineNow: "Online Now",
    offline: "Offline",
    sendMessage: "Send a Message",
    yourName: "Your Name",
    yourEmail: "Your Email",
    subject: "Subject",
    yourMessage: "Your Message",
    submit: "Submit",
    submitting: "Submitting...",
    success:
      "Your message has been sent successfully! We'll get back to you soon.",
    nameRequired: "Name is required",
    nameMin: "Name must be at least 2 characters",
    emailRequired: "Email is required",
    emailInvalid: "Please enter a valid email address",
    subjectRequired: "Subject is required",
    subjectMin: "Subject must be at least 5 characters",
    messageRequired: "Message is required",
    messageMin: "Message must be at least 10 characters",
    helpTopics: "Help Topics",
    relatedArticles: "Related Articles",
    readMore: "Read More",
    backToHelp: "Back to Help Center",
    wasThisHelpful: "Was this helpful?",
    yes: "Yes",
    no: "No",
    thankYou: "Thank you for your feedback!",
    quickLinks: "Quick Links",
    faq: "FAQ",
    about: "About Us",
    services: "Services",
    contact: "Contact",
  },
  fr: {
    help: "Centre d'Aide",
    tagline: "Tout ce que vous devez savoir sur INYUMBA PROJECT",
    searchPlaceholder: "Rechercher des articles d'aide...",
    noResults: "Aucun résultat trouvé pour votre recherche.",
    clearSearch: "Effacer la recherche",
    categories: "Catégories",
    popularArticles: "Articles Populaires",
    guide: "Guide",
    video: "Tutoriel Vidéo",
    article: "Article",
    gettingStarted: "Commencer",
    studentGuide: "Guide Étudiant",
    landlordGuide: "Guide Propriétaire",
    paymentGuide: "Guide de Paiement",
    safetyTips: "Conseils de Sécurité",
    contactSupport: "Contacter le Support",
    supportDesc: "Notre équipe de support est disponible 24/7 pour vous aider.",
    emailSupport: "Support par Email",
    phoneSupport: "Support Téléphonique",
    liveChat: "Chat en Direct",
    chatOffline:
      "Le chat est actuellement hors ligne. Veuillez nous envoyer un email ou nous appeler.",
    onlineNow: "En Ligne",
    offline: "Hors Ligne",
    sendMessage: "Envoyer un Message",
    yourName: "Votre Nom",
    yourEmail: "Votre Email",
    subject: "Sujet",
    yourMessage: "Votre Message",
    submit: "Envoyer",
    submitting: "Envoi en cours...",
    success:
      "Votre message a été envoyé avec succès ! Nous vous répondrons bientôt.",
    nameRequired: "Le nom est requis",
    nameMin: "Le nom doit contenir au moins 2 caractères",
    emailRequired: "L'email est requis",
    emailInvalid: "Veuillez entrer une adresse email valide",
    subjectRequired: "Le sujet est requis",
    subjectMin: "Le sujet doit contenir au moins 5 caractères",
    messageRequired: "Le message est requis",
    messageMin: "Le message doit contenir au moins 10 caractères",
    helpTopics: "Sujets d'Aide",
    relatedArticles: "Articles Similaires",
    readMore: "En Savoir Plus",
    backToHelp: "Retour au Centre d'Aide",
    wasThisHelpful: "Ceci était-il utile?",
    yes: "Oui",
    no: "Non",
    thankYou: "Merci pour votre retour!",
    quickLinks: "Liens Rapides",
    faq: "FAQ",
    about: "À Propos",
    services: "Services",
    contact: "Contact",
  },
  rw: {
    help: "Ikigo Cy'ubufasha",
    tagline: "Ibyose ugomba kumenya kuri INYUMBA PROJECT",
    searchPlaceholder: "Shakisha ingingo z'ubufasha...",
    noResults: "Nta bisubizo byabonetse.",
    clearSearch: "Kuraho ibyashakishijwe",
    categories: "Ibyiciro",
    popularArticles: "Ingingo Zikunze Gusomwa",
    guide: "Ubuyobozi",
    video: "Amafirimi",
    article: "Ingingo",
    gettingStarted: "Gutangira",
    studentGuide: "Ubuyobozi kubanyeshuri",
    landlordGuide: "Ubuyobozi kubatunze inzu",
    paymentGuide: "Ubuyobozi kubwishyu",
    safetyTips: "Inama z'umutekano",
    contactSupport: "Twandikire",
    supportDesc: "Itsinda ryacu rishobora kugufasha buri gihe.",
    emailSupport: "Twandikire kuri imeri",
    phoneSupport: "Duhamagare",
    liveChat: "Kuvugana",
    chatOffline:
      "Kuvugana ntibikora. Twandikire kuri imeri cyangwa uduhamagare.",
    onlineNow: "Turimo",
    offline: "Ntiturimo",
    sendMessage: "Ohereza Ubutumwa",
    yourName: "Izina Ryawe",
    yourEmail: "Imeri Yawe",
    subject: "Ikiganiro",
    yourMessage: "Ubutumwa Bwawe",
    submit: "Ohereza",
    submitting: "Biremereza...",
    success: "Ubutumwa bwawe bwoherejwe neza! Tuzagusubiza vuba.",
    nameRequired: "Izina rirasabwa",
    nameMin: "Izina rigomba kuba nibura inyuguti 2",
    emailRequired: "Imeri irasabwa",
    emailInvalid: "Injiza aderesi ya imeri ikwiye",
    subjectRequired: "Ikiganiro kirasabwa",
    subjectMin: "Ikiganiro kigomba kuba nibura inyuguti 5",
    messageRequired: "Ubutumwa burasabwa",
    messageMin: "Ubutumwa bugomba kuba nibura inyuguti 10",
    helpTopics: "Ibyo Kuvugaho",
    relatedArticles: "Ingingo Zisa",
    readMore: "Soma Byinshi",
    backToHelp: "Subira ku Bufasha",
    wasThisHelpful: "Byakugiriye akamaro?",
    yes: "Yego",
    no: "Oya",
    thankYou: "Urakoze kubitekerezo!",
    quickLinks: "Ihuza",
    faq: "FAQ",
    about: "Ibijyanye",
    services: "Serivisi",
    contact: "Twandikire",
  },
};

interface HelpArticle {
  id: number;
  title: string;
  description: string;
  content: string;
  category: "getting-started" | "student" | "landlord" | "payment" | "safety";
  icon: React.ReactNode;
  type: "guide" | "video" | "article";
  readTime?: string;
  videoUrl?: string;
}

// Helper function to get language from cookies
const getLanguageFromCookies = (): 'en' | 'fr' | 'rw' => {
  const lang = Cookies.get('language') as 'en' | 'fr' | 'rw';
  return lang || 'en';
};

export const Help: React.FC = () => {
  // Get language from cookies
  const [lang, setLang] = useState<'en' | 'fr' | 'rw'>(getLanguageFromCookies());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(
    null,
  );
  const [isArticleOpen, setIsArticleOpen] = useState(false);
  const [feedback, setFeedback] = useState<"yes" | "no" | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState<boolean | null>(null);
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [isSubjectValid, setIsSubjectValid] = useState<boolean | null>(null);
  const [isMessageValid, setIsMessageValid] = useState<boolean | null>(null);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    subject?: string;
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
    const subjectValid = formData.subject.length >= 5;
    const messageValid = formData.message.length >= 10;

    setIsNameValid(formData.name.length > 0 ? nameValid : null);
    setIsEmailValid(formData.email.length > 0 ? emailValid : null);
    setIsSubjectValid(formData.subject.length > 0 ? subjectValid : null);
    setIsMessageValid(formData.message.length > 0 ? messageValid : null);

    const valid = nameValid && emailValid && subjectValid && messageValid;
    setIsFormValid(valid);

    if (nameValid && errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
    if (emailValid && errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
    if (subjectValid && errors.subject) {
      setErrors((prev) => ({ ...prev, subject: undefined }));
    }
    if (messageValid && errors.message) {
      setErrors((prev) => ({ ...prev, message: undefined }));
    }
  }, [formData.name, formData.email, formData.subject, formData.message]);

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
    const newErrors: {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    } = {};

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = t.nameMin;
    }

    if (!formData.email) {
      newErrors.email = t.emailRequired;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t.emailInvalid;
    }

    if (!formData.subject || formData.subject.length < 5) {
      newErrors.subject = t.subjectMin;
    }

    if (!formData.message || formData.message.length < 10) {
      newErrors.message = t.messageMin;
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
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsNameValid(null);
      setIsEmailValid(null);
      setIsSubjectValid(null);
      setIsMessageValid(null);
      setIsFormValid(false);
    }, 1500);
  };

  const helpArticles: HelpArticle[] = [
    // Getting Started
    {
      id: 1,
      title: "How to Create an Account",
      description:
        "Learn how to create your INYUMBA PROJECT account in just a few simple steps.",
      content:
        "Creating an account on INYUMBA PROJECT is quick and easy. Click the \"Sign up\" button in the top right corner. Fill in your name, email address, and create a password. Once you confirm your email, you're ready to start searching for your perfect student home. You can also sign up using your Google account for even faster registration. After creating your account, you'll have access to all features including saving favorite houses, booking properties, and managing your reservations.",
      category: "getting-started",
      icon: <PersonIcon />,
      type: "guide",
      readTime: "3 min read",
    },
    {
      id: 2,
      title: "How to Search for Houses",
      description:
        "Master the search features to find the perfect student accommodation.",
      content:
        "Use the search bar on the homepage to find houses near your university. You can filter by location, price range, amenities, and property type. Our advanced search allows you to filter by specific universities, districts, and even villages. You can also save your search preferences for quick access later. Don't forget to check the map view to see exactly where each property is located relative to your campus.",
      category: "getting-started",
      icon: <SearchIcon />,
      type: "guide",
      readTime: "4 min read",
    },
    {
      id: 3,
      title: "Understanding Your Dashboard",
      description:
        "Learn how to navigate and use your personal dashboard effectively.",
      content:
        "Your dashboard is your command center on INYUMBA PROJECT. From here, you can view your saved properties, manage your bookings, update your profile, and track your payment history. You can also access your wishlist, view your booking history, and manage your notifications. For landlords, the dashboard provides additional tools for managing listings and tracking bookings.",
      category: "getting-started",
      icon: <HomeIcon />,
      type: "video",
      readTime: "5 min read",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },

    // Student Guide
    {
      id: 4,
      title: "How to Book a House",
      description: "Step-by-step guide to booking your student accommodation.",
      content:
        'Once you find a house you like, click on it to view full details. Check all the amenities, photos, and location information. Click the "Book Now" button, select your move-in and move-out dates, and confirm your booking. You\'ll receive an instant confirmation via email and SMS. The landlord will also be notified and will contact you within 24 hours to arrange the move-in details.',
      category: "student",
      icon: <HomeIcon />,
      type: "guide",
      readTime: "4 min read",
    },
    {
      id: 5,
      title: "Student Safety Tips",
      description:
        "Important safety tips for students looking for accommodation.",
      content:
        "Always verify the property before making any payment. Use our secure MOMO payment system for all transactions. Never share your personal financial information with anyone. Meet the landlord in person before moving in. Check the property thoroughly and ensure all amenities are functioning. If something feels wrong, trust your instincts and contact our support team immediately.",
      category: "safety",
      icon: <SecurityIcon />,
      type: "article",
      readTime: "3 min read",
    },
    {
      id: 6,
      title: "Payment Guide for Students",
      description:
        "Everything you need to know about making payments on the platform.",
      content:
        "We use MOMO for all payments on our platform. When you book a house, you'll be prompted to make a payment through MOMO. Your payment is held securely and only released to the landlord after you confirm your satisfaction with the accommodation. You can track all your payments in your dashboard. If you have any payment issues, our support team is available 24/7 to help.",
      category: "payment",
      icon: <PaymentsIcon />,
      type: "guide",
      readTime: "3 min read",
    },
    {
      id: 7,
      title: "Video Tutorial: Booking Process",
      description:
        "Watch this video tutorial to see how the booking process works.",
      content:
        "This video walks you through the entire booking process on INYUMBA PROJECT. From searching for houses to making your first booking, everything is explained in detail. Watch along and follow the steps to become a booking expert.",
      category: "student",
      icon: <VideoLibraryIcon />,
      type: "video",
      readTime: "6 min read",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },

    // Landlord Guide
    {
      id: 8,
      title: "How to List Your Property",
      description:
        "A complete guide for landlords to list their property on our platform.",
      content:
        'To list your property, click on "Become a Host" in the navigation menu. Fill in all the details about your property including location, amenities, price, and upload high-quality photos. Our team will review your listing and verify the property. Once approved, your property will be visible to thousands of students looking for accommodation. You can manage your listing and track bookings from your landlord dashboard.',
      category: "landlord",
      icon: <VerifiedIcon />,
      type: "guide",
      readTime: "5 min read",
    },
    {
      id: 9,
      title: "Managing Bookings as a Landlord",
      description:
        "Learn how to manage and track your property bookings effectively.",
      content:
        "Your landlord dashboard gives you full control over your property bookings. You'll receive instant notifications when a student books your property. You can view all upcoming and past bookings, communicate with students, and track payments. You can also update your property availability, adjust prices, and manage multiple properties from one dashboard.",
      category: "landlord",
      icon: <SupportAgentIcon />,
      type: "guide",
      readTime: "4 min read",
    },
    {
      id: 10,
      title: "Landlord FAQ: Common Questions",
      description:
        "Answers to the most common questions from landlords on our platform.",
      content:
        "Q: How much does it cost to list? A: Listing is free! We only charge a small commission on successful bookings. Q: How do I get paid? A: Payments are processed through MOMO and released after student confirmation. Q: Can I list multiple properties? A: Yes! You can manage multiple properties from your dashboard.",
      category: "landlord",
      icon: <QuestionAnswerIcon />,
      type: "article",
      readTime: "3 min read",
    },

    // Payment Guide
    {
      id: 11,
      title: "MOMO Payment Guide",
      description:
        "Complete guide to using MOMO for secure payments on our platform.",
      content:
        "MOMO is the preferred payment method on INYUMBA PROJECT. To make a payment, simply select MOMO as your payment option when booking. Enter your MOMO number and confirm the payment. You'll receive an instant confirmation via SMS. Your payment is held securely and only released to the landlord after you confirm your satisfaction with the accommodation.",
      category: "payment",
      icon: <PaymentsIcon />,
      type: "guide",
      readTime: "3 min read",
    },
    {
      id: 12,
      title: "Payment Security and Fraud Prevention",
      description:
        "Learn how we protect your payments and prevent fraud on our platform.",
      content:
        "Your security is our top priority. All payments are processed through secure MOMO integration. We never store your financial information. Our platform uses advanced encryption to protect all transactions. If you suspect any fraudulent activity, contact our support team immediately. We investigate all fraud reports within 24 hours.",
      category: "payment",
      icon: <SecurityIcon />,
      type: "article",
      readTime: "4 min read",
    },

    // Safety Tips
    {
      id: 13,
      title: "Student Safety: What to Look For",
      description:
        "Important safety considerations for students when viewing properties.",
      content:
        "When viewing a property, check for proper locks on all doors and windows. Ensure the area is well-lit and safe. Check for working smoke detectors and fire extinguishers. Verify that the property has emergency exits. Ask about the neighborhood safety and talk to current tenants if possible. Always share the property address with a friend or family member.",
      category: "safety",
      icon: <SecurityIcon />,
      type: "article",
      readTime: "4 min read",
    },
    {
      id: 14,
      title: "Scam Prevention Tips",
      description:
        "How to identify and avoid scams when looking for student housing.",
      content:
        "Never pay for a property without viewing it first. Always use our secure MOMO payment system. Be wary of deals that seem too good to be true. Verify the landlord's identity before making any payments. Don't share your personal financial information with anyone. If you suspect a scam, report it to our support team immediately.",
      category: "safety",
      icon: <SecurityIcon />,
      type: "article",
      readTime: "3 min read",
    },
  ];

  const categories = [
    {
      id: "all",
      label: t.categories || "All Categories",
      icon: <AutoAwesomeIcon />,
    },
    {
      id: "getting-started",
      label: t.gettingStarted || "Getting Started",
      icon: <HelpOutlined />,
    },
    {
      id: "student",
      label: t.studentGuide || "Student Guide",
      icon: <SchoolIcon />,
    },
    {
      id: "landlord",
      label: t.landlordGuide || "Landlord Guide",
      icon: <VerifiedIcon />,
    },
    {
      id: "payment",
      label: t.paymentGuide || "Payment Guide",
      icon: <PaymentsIcon />,
    },
    {
      id: "safety",
      label: t.safetyTips || "Safety Tips",
      icon: <SecurityIcon />,
    },
  ];

  const getCategoryLabel = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.label : categoryId;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "guide":
        return <BookIcon className="w-4 h-4" />;
      case "video":
        return <VideoLibraryIcon className="w-4 h-4" />;
      case "article":
        return <ArticleIcon className="w-4 h-4" />;
      default:
        return <ArticleIcon className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "guide":
        return "bg-blue-100 text-blue-600";
      case "video":
        return "bg-red-100 text-red-600";
      case "article":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const filteredArticles = helpArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularArticles = helpArticles.filter((a) => a.id <= 4);

  const openArticle = (article: HelpArticle) => {
    setSelectedArticle(article);
    setIsArticleOpen(true);
    setFeedback(null);
  };

  const closeArticle = () => {
    setIsArticleOpen(false);
    setSelectedArticle(null);
  };

  const handleFeedback = (response: "yes" | "no") => {
    setFeedback(response);
    toast.success(t.thankYou);
  };

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
                <HelpOutlineRounded className="w-4 h-4" />
                {t.help}
              </span>
            </motion.div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {t.tagline}
            </h1>
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

      {/* Search & Filter Section */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <SearchIcon className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#FF385C] focus:ring-2 focus:ring-[#FF385C]/20 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? "bg-[#FF385C] text-white shadow-lg shadow-[#FF385C]/30"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.icon}
                  {category.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {t.popularArticles}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {popularArticles.map((article) => (
              <motion.div
                key={article.id}
                whileHover={{ y: -4 }}
                onClick={() => openArticle(article)}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${getTypeColor(article.type)}`}
                  >
                    {getTypeIcon(article.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {article.title}
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {article.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${getTypeColor(article.type)}`}
                  >
                    {article.type}
                  </span>
                  {article.readTime && (
                    <span className="text-xs text-gray-400">
                      {article.readTime}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Articles */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {t.helpTopics}
          </h2>
          {filteredArticles.length === 0 ? (
            <div className="text-center py-8">
              <HelpOutlineRounded className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">{t.noResults}</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-2 text-[#FF385C] hover:underline text-sm"
              >
                {t.clearSearch}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredArticles.map((article) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  onClick={() => openArticle(article)}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getTypeColor(article.type)}`}
                    >
                      {getTypeIcon(article.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {article.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${getTypeColor(article.type)}`}
                        >
                          {article.type}
                        </span>
                        <span className="text-xs text-gray-400">
                          {article.readTime}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-400">
                          {getCategoryLabel(article.category)}
                        </span>
                      </div>
                    </div>
                    <ArrowForwardIcon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-2" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t.contactSupport}
              </h2>
              <p className="text-gray-600 mb-6">{t.supportDesc}</p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <EmailIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {t.emailSupport}
                    </p>
                    <p className="text-sm text-gray-500">inyumbarental@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <PhoneIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {t.phoneSupport}
                    </p>
                    <p className="text-sm text-gray-500">+250 780 414 088</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                    <ChatIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {t.liveChat}
                    </p>
                    <p className="text-sm text-green-500">{t.onlineNow}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-sm text-amber-700 flex items-center gap-2">
                  <span className="text-lg">💬</span>
                  {t.chatOffline}
                </p>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t.sendMessage}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.yourName}
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
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.yourEmail}
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
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.subject}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={`w-full px-4 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-1 transition-colors text-sm ${
                          isSubjectValid === true
                            ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                            : isSubjectValid === false
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:border-[#FF385C] focus:ring-[#FF385C]"
                        }`}
                        placeholder="Subject of your message"
                      />
                      {isSubjectValid === true && (
                        <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                      {isSubjectValid === false && (
                        <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                      )}
                    </div>
                    {errors.subject && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.yourMessage}
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
                        placeholder="Type your message here..."
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
                        {t.submitting}
                      </>
                    ) : (
                      <>
                        <SendIcon className="w-5 h-5" />
                        {t.submit}
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {isArticleOpen && selectedArticle && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[300]"
              onClick={closeArticle}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-2 xs:inset-4 z-[301] flex items-center justify-center"
            >
              <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl">
                <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between">
                  <button
                    onClick={closeArticle}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ArrowBackIcon className="w-5 h-5" />
                    <span className="text-sm">{t.backToHelp}</span>
                  </button>
                  <button
                    onClick={closeArticle}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <CloseIcon className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${getTypeColor(selectedArticle.type)}`}
                    >
                      {getTypeIcon(selectedArticle.type)}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {selectedArticle.title}
                      </h2>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${getTypeColor(selectedArticle.type)}`}
                        >
                          {selectedArticle.type}
                        </span>
                        <span className="text-xs text-gray-400">
                          {selectedArticle.readTime}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-400">
                          {getCategoryLabel(selectedArticle.category)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedArticle.type === "video" &&
                    selectedArticle.videoUrl && (
                      <div className="mb-6 aspect-video bg-gray-100 rounded-xl overflow-hidden">
                        <iframe
                          src={selectedArticle.videoUrl}
                          title={selectedArticle.title}
                          className="w-full h-full"
                          allowFullScreen
                        />
                      </div>
                    )}

                  <div className="prose max-w-none">
                    {selectedArticle.content
                      .split("\n")
                      .map((paragraph, index) => (
                        <p
                          key={index}
                          className="text-gray-700 leading-relaxed mb-4"
                        >
                          {paragraph}
                        </p>
                      ))}
                  </div>

                  {/* Feedback Section */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-3">
                      {t.wasThisHelpful}
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleFeedback("yes")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          feedback === "yes"
                            ? "bg-green-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {t.yes} 👍
                      </button>
                      <button
                        onClick={() => handleFeedback("no")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          feedback === "no"
                            ? "bg-red-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {t.no} 👎
                      </button>
                    </div>
                    {feedback && (
                      <p className="text-sm text-green-500 mt-2">
                        {t.thankYou}
                      </p>
                    )}
                  </div>

                  {/* Related Articles */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">
                      {t.relatedArticles}
                    </h4>
                    <div className="space-y-2">
                      {helpArticles
                        .filter(
                          (a) =>
                            a.id !== selectedArticle.id &&
                            a.category === selectedArticle.category,
                        )
                        .slice(0, 3)
                        .map((related) => (
                          <button
                            key={related.id}
                            onClick={() => openArticle(related)}
                            className="w-full text-left px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-between"
                          >
                            <span className="text-sm text-gray-700">
                              {related.title}
                            </span>
                            <ArrowForwardIcon className="w-4 h-4 text-gray-400" />
                          </button>
                        ))}
                    </div>
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

