/* eslint-disable no-useless-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/immutability */
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";

// Material-UI Icons
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { ErrorOutlineRounded, HelpOutlineOutlined } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

// API endpoint
const API_URL = "https://rene-inyumba-nodejs.onrender.com/requests";

const translations = {
  en: {
    title: "Page Not Found",
    subtitle: "Oops! The page you are looking for does not exist.",
    description:
      "It seems you have wandered off the path. Here are some helpful links to get you back on track.",
    goHome: "Go Back Home",
    searchHouses: "Search Houses",
    contactSupport: "Contact Support",
    helpCenter: "Help Center",
    errorCode: "Error 404",
    popularLinks: "Popular Links",
    needHelp: "Need Help?",
    requestAssistance: "Request Assistance",
    assistanceTitle: "Request Assistance",
    assistanceDesc:
      "Having trouble finding what you need? Send us a message with an image and we'll help you out.",
    yourName: "Your Name",
    yourEmail: "Your Email Address",
    yourMessage: "Describe your issue or request",
    attachImage: "Attach Image (Optional)",
    sendRequest: "Send Request",
    sending: "Sending...",
    success: "Request sent successfully! We'll get back to you soon.",
    error: "Failed to send request. Please try again.",
    nameRequired: "Name is required",
    nameMin: "Name must be at least 2 characters",
    emailRequired: "Email is required",
    emailInvalid: "Please enter a valid email address",
    messageRequired: "Message is required",
    messageMin: "Message must be at least 10 characters",
    imageUploaded: "Image uploaded successfully",
    imageRemoved: "Image removed",
    noImage: "No image attached",
    selectImage: "Click or tap to select an image",
    supportTeam:
      "Our support team will review your request and respond within 24 hours.",
    commonQuestions: "Common Questions",
    faq1: "How do I search for houses near my university?",
    faq2: "How do I book a house?",
    faq3: "What is the cancellation policy?",
    faq4: "How do I contact my landlord?",
  },
  fr: {
    title: "Page Non Trouvée",
    subtitle: "Oups ! La page que vous recherchez n'existe pas.",
    description:
      "Il semble que vous vous soyez égaré. Voici quelques liens utiles pour vous remettre sur la bonne voie.",
    goHome: "Retourner à l'Accueil",
    searchHouses: "Rechercher des Maisons",
    contactSupport: "Contacter le Support",
    helpCenter: "Centre d'Aide",
    errorCode: "Erreur 404",
    popularLinks: "Liens Populaires",
    needHelp: "Besoin d'Aide ?",
    requestAssistance: "Demander de l'Aide",
    assistanceTitle: "Demander de l'Aide",
    assistanceDesc:
      "Vous avez du mal à trouver ce dont vous avez besoin ? Envoyez-nous un message avec une image et nous vous aiderons.",
    yourName: "Votre Nom",
    yourEmail: "Votre Adresse Email",
    yourMessage: "Décrivez votre problème ou demande",
    attachImage: "Joindre une Image (Optionnel)",
    sendRequest: "Envoyer la Demande",
    sending: "Envoi en cours...",
    success: "Demande envoyée avec succès ! Nous vous répondrons bientôt.",
    error: "Échec de l'envoi de la demande. Veuillez réessayer.",
    nameRequired: "Le nom est requis",
    nameMin: "Le nom doit contenir au moins 2 caractères",
    emailRequired: "L'email est requis",
    emailInvalid: "Veuillez entrer une adresse email valide",
    messageRequired: "Le message est requis",
    messageMin: "Le message doit contenir au moins 10 caractères",
    imageUploaded: "Image téléchargée avec succès",
    imageRemoved: "Image supprimée",
    noImage: "Aucune image jointe",
    selectImage: "Cliquez ou appuyez pour sélectionner une image",
    supportTeam:
      "Notre équipe de support examinera votre demande et répondra dans les 24 heures.",
    commonQuestions: "Questions Fréquentes",
    faq1: "Comment rechercher des maisons près de mon université ?",
    faq2: "Comment réserver une maison ?",
    faq3: "Quelle est la politique d'annulation ?",
    faq4: "Comment contacter mon propriétaire ?",
  },
  rw: {
    title: "Urupapuro Rutaboneka",
    subtitle: "Oho ! Urupapuro urishakisha ntiruboneka.",
    description:
      "Bisa nk'uko wazimiye. Dore amahitamo akungura kugira ngo usubire mu nzira.",
    goHome: "Subira Ahabanza",
    searchHouses: "Shakisha Amazu",
    contactSupport: "Twandikire Ubufasha",
    helpCenter: "Ikigo cy'Ubufasha",
    errorCode: "Ikosa 404",
    popularLinks: "Amahitamo Akunzwe",
    needHelp: "Ukeneye Ubufasha ?",
    requestAssistance: "Saba Ubufasha",
    assistanceTitle: "Saba Ubufasha",
    assistanceDesc:
      "Ufite ikibazo cyangwa ukeneye ubufasha? Ohereza ubutumwa hamwe n'ishusho kandi tuzagufasha.",
    yourName: "Izina Ryawe",
    yourEmail: "Aderesi ya Imeri",
    yourMessage: "Sobanura ikibazo cyangwa icyifuzo cyawe",
    attachImage: "Ongeraho Ishusho (Ushaka)",
    sendRequest: "Ohereza",
    sending: "Biremereza...",
    success: "Ubutumwa bwoherejwe neza! Tuzagusubiza vuba.",
    error: "Ubutumwa ntabwo bwoherejwe. Ongera ugerageze.",
    nameRequired: "Izina rirasabwa",
    nameMin: "Izina rigomba kuba nibura inyuguti 2",
    emailRequired: "Imeri irasabwa",
    emailInvalid: "Injiza aderesi ya imeri ikwiye",
    messageRequired: "Ubutumwa burasabwa",
    messageMin: "Ubutumwa bugomba kuba nibura inyuguti 10",
    imageUploaded: "Ishusho yoherejwe neza",
    imageRemoved: "Ishusho yakuvanyweho",
    noImage: "Nta shusho yongeweho",
    selectImage: "Kanda cyangwa ugahitamo ishusho",
    supportTeam:
      "Itsinda ryacu ry'ubufasha rizasuzuma ubutumwa bwawe kandi rikagusubiza mu masaha 24.",
    commonQuestions: "Ibibazo Bikunze Kubazwa",
    faq1: "Nshakisha amazu hafi ya kaminuza yanjye nte?",
    faq2: "Niyandikisha inzu nte?",
    faq3: "Amategeko yo guhagarika icyemezo ni ayahe?",
    faq4: "Nshyikirana n'umutunzi w'inzu nte?",
  },
};

// Helper function to get language from cookies
const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
  const lang = Cookies.get("language") as "en" | "fr" | "rw";
  return lang || "en";
};

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState<"en" | "fr" | "rw">(
    getLanguageFromCookies(),
  );
  const [isAssistanceModalOpen, setIsAssistanceModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Success/Fail Modal States
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);
  const [failMessage, setFailMessage] = useState("");
  const [successData, setSuccessData] = useState<any>(null);

  const t = translations[lang];

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
  }, [formData, errors]);

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

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      toast.success(t.imageUploaded);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.info(t.imageRemoved);
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
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData to match the mongoose model and controller
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name.trim());
      formDataToSend.append("email", formData.email.toLowerCase().trim());
      formDataToSend.append("message", formData.message.trim());
      formDataToSend.append("language", lang);

      // The controller expects status to be set automatically to "pending"
      // We don't send status - the controller will set it

      if (selectedImage) {
        formDataToSend.append("image", selectedImage);
      }

      // Send to API - DO NOT set Content-Type header for FormData
      const response = await axios.post(API_URL, formDataToSend);

      if (response.status === 200 || response.status === 201) {
        // Store success data (only non-sensitive data)
        const responseData = response.data?.data || response.data;
        setSuccessData({
          name: formData.name,
          email: formData.email,
          status: responseData?.status || "pending",
          language: lang,
          requestId: responseData?._id || responseData?.id,
          hasImage: !!selectedImage,
          createdAt: responseData?.createdAt,
          updatedAt: responseData?.updatedAt,
        });

        // Show success modal
        setShowSuccessModal(true);

        // Reset form
        setFormData({ name: "", email: "", message: "" });
        setSelectedImage(null);
        setImagePreview(null);
        setIsNameValid(null);
        setIsEmailValid(null);
        setIsMessageValid(null);
        setIsFormValid(false);
        setIsAssistanceModalOpen(false);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error: any) {
      let errorMessage = t.error;

      if (error.code === "ECONNABORTED") {
        errorMessage = "Request timeout. Please try again.";
      } else if (error.response) {
        // Check for validation errors from the controller
        if (error.response.status === 400) {
          errorMessage = error.response.data?.message || "All fields are required";
        } else if (error.response.data?.errors) {
          const validationErrors = error.response.data.errors;
          // Check if there's a status validation error
          const statusError = validationErrors.find(
            (err: any) => err.path === "status"
          );
          if (statusError) {
            errorMessage =
              "Status must be one of: Pending, Approved, Rejected, Completed.";
          } else {
            // Get the first validation error message
            const firstError = validationErrors[0];
            errorMessage = firstError?.message || error.response.data?.message || t.error;
          }
        } else {
          errorMessage =
            error.response.data?.message || error.response.data?.error || t.error;
        }
      } else if (error.request) {
        errorMessage =
          "Cannot connect to server. Please check if the server is running.";
      } else {
        errorMessage = error.message || t.error;
      }

      setFailMessage(errorMessage);
      setShowFailModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const popularLinks = [
    { label: t.goHome, path: "/", icon: <HomeIcon /> },
    { label: t.searchHouses, path: "/houses", icon: <SearchIcon /> },
    { label: t.helpCenter, path: "/help", icon: <HelpOutlineOutlined /> },
    {
      label: t.contactSupport,
      path: "#",
      icon: <SupportAgentIcon />,
      onClick: () => setIsAssistanceModalOpen(true),
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            {/* 404 Error Code */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative inline-block"
            >
              <div className="text-8xl sm:text-9xl font-extrabold text-[#FF385C] opacity-10 select-none">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#FF385C]/10 rounded-full flex items-center justify-center">
                  <ErrorOutlineRounded className="w-16 h-16 sm:w-20 sm:h-20 text-[#FF385C]" />
                </div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mt-4"
            >
              {t.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-gray-600 mt-2"
            >
              {t.subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-gray-500 mt-2 max-w-md mx-auto"
            >
              {t.description}
            </motion.p>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
          >
            {popularLinks.map((link, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (link.onClick) {
                    link.onClick();
                  } else {
                    navigate(link.path);
                  }
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 text-gray-700 hover:text-[#FF385C] hover:border-[#FF385C]"
              >
                <span className="text-[#FF385C]">{link.icon}</span>
                <span className="font-medium text-sm">{link.label}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Help Request Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FF385C]/10 rounded-full flex items-center justify-center text-[#FF385C]">
                  <SupportAgentIcon className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">{t.needHelp}</h3>
                  <p className="text-sm text-gray-500">{t.supportTeam}</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAssistanceModalOpen(true)}
                className="px-6 py-2.5 bg-[#FF385C] text-white rounded-full font-medium hover:bg-[#E31C5F] transition-colors flex items-center gap-2 shadow-lg shadow-[#FF385C]/30"
              >
                <SendIcon className="w-4 h-4" />
                {t.requestAssistance}
              </motion.button>
            </div>

            {/* FAQ Quick Links */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2">{t.commonQuestions}:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {[t.faq1, t.faq2, t.faq3, t.faq4].map((faq, index) => (
                  <button
                    key={index}
                    className="text-xs text-left text-gray-600 hover:text-[#FF385C] transition-colors px-2 py-1 hover:bg-gray-50 rounded"
                  >
                    • {faq}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Error Code Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 text-center"
          >
            <span className="inline-block px-4 py-2 bg-gray-200 rounded-full text-xs font-mono text-gray-600">
              {t.errorCode} • {new Date().toLocaleDateString()}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Assistance Request Modal */}
      <AnimatePresence>
        {isAssistanceModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[600]"
              onClick={() => setIsAssistanceModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-2 xs:inset-4 z-[601] flex items-center justify-center"
            >
              <div className="bg-white rounded-xl xs:rounded-2xl w-full max-w-2xl max-h-[95vh] xs:max-h-[90vh] overflow-hidden shadow-2xl">
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 xs:p-6 flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FF385C]/10 rounded-full flex items-center justify-center text-[#FF385C]">
                      <SupportAgentIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg xs:text-xl font-bold text-gray-900">
                        {t.assistanceTitle}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {t.assistanceDesc}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsAssistanceModalOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <CloseIcon className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-4 xs:p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    noValidate
                  >
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.yourName} <span className="text-red-500">*</span>
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
                          ✓ {t.yourName}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.yourEmail} <span className="text-red-500">*</span>
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
                          ✓ {t.yourEmail}
                        </p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.yourMessage} <span className="text-red-500">*</span>
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
                          placeholder="Describe your issue or request in detail..."
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
                          ✓ {t.yourMessage}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        {formData.message.length}/10 characters minimum
                      </p>
                    </div>

                    {/* Image Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.attachImage}
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept="image/*"
                          onChange={handleImageSelect}
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="w-full flex flex-col items-center justify-center px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#FF385C] hover:bg-[#FF385C]/5 transition-all duration-300"
                        >
                          {imagePreview ? (
                            <div className="relative w-full">
                              <img
                                src={imagePreview}
                                alt="Preview"
                                className="max-h-48 mx-auto rounded-lg object-contain"
                              />
                              <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                              >
                                <DeleteIcon className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="text-center">
                              <CloudUploadIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600">
                                {t.selectImage}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                PNG, JPG, GIF up to 5MB
                              </p>
                            </div>
                          )}
                        </label>
                      </div>
                      {selectedImage && (
                        <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                          <CheckCircleIcon className="w-3 h-3" />
                          {selectedImage.name} (
                          {(selectedImage.size / 1024).toFixed(1)} KB)
                        </p>
                      )}
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
                          {t.sendRequest}
                        </>
                      )}
                    </motion.button>

                    {!isFormValid &&
                      Object.keys(formData).some(
                        (key) =>
                          formData[key as keyof typeof formData].length > 0,
                      ) && (
                        <p className="text-center text-xs text-amber-500">
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

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[700]"
              onClick={() => setShowSuccessModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-4 z-[701] flex items-center justify-center"
            >
              <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircleIcon className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {lang === "en"
                      ? "Request Sent Successfully!"
                      : lang === "fr"
                        ? "Demande Envoyée avec Succès!"
                        : "Ubutumwa Bwoherejwe Neza!"}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {lang === "en"
                      ? "Your request has been received. Our support team will review it and get back to you within 24 hours."
                      : lang === "fr"
                        ? "Votre demande a été reçue. Notre équipe de support l'examinera et vous répondra dans les 24 heures."
                        : "Ubutumwa bwawe bwakiriwe. Itsinda ryacu ry'ubufasha rizabisuzuma kandi rikagusubiza mu masaha 24."}
                  </p>
                  <div className="bg-gray-50 rounded-lg p-3 text-left text-sm mb-4">
                    <div className="flex justify-between py-1 border-b border-gray-200">
                      <span className="text-gray-500">
                        {lang === "en"
                          ? "Name"
                          : lang === "fr"
                            ? "Nom"
                            : "Izina"}
                      </span>
                      <span className="font-medium text-gray-800">
                        {successData?.name || formData.name}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-200">
                      <span className="text-gray-500">
                        {lang === "en"
                          ? "Email"
                          : lang === "fr"
                            ? "Email"
                            : "Imeri"}
                      </span>
                      <span className="font-medium text-gray-800">
                        {successData?.email || formData.email}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-200">
                      <span className="text-gray-500">
                        {lang === "en"
                          ? "Status"
                          : lang === "fr"
                            ? "Statut"
                            : "Imiterere"}
                      </span>
                      <span className="font-medium text-amber-600">
                        {successData?.status || "Pending"}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-200">
                      <span className="text-gray-500">
                        {lang === "en"
                          ? "Language"
                          : lang === "fr"
                            ? "Langue"
                            : "Ururimi"}
                      </span>
                      <span className="font-medium text-gray-800 uppercase">
                        {successData?.language || lang}
                      </span>
                    </div>
                    {successData?.requestId && (
                      <div className="flex justify-between py-1 border-t border-gray-200 mt-1 pt-1">
                        <span className="text-gray-500">Request ID</span>
                        <span className="font-mono text-xs text-gray-600 truncate max-w-[150px]">
                          {successData.requestId}
                        </span>
                      </div>
                    )}
                    {successData?.createdAt && (
                      <div className="flex justify-between py-1 border-t border-gray-200 mt-1 pt-1">
                        <span className="text-gray-500">
                          {lang === "en"
                            ? "Submitted"
                            : lang === "fr"
                              ? "Soumis"
                              : "Byoherejwe"}
                        </span>
                        <span className="text-xs text-gray-600">
                          {new Date(successData.createdAt).toLocaleString()}
                        </span>
                      </div>
                    )}
                    {successData?.hasImage && (
                      <div className="flex justify-between py-1 border-t border-gray-200 mt-1 pt-1">
                        <span className="text-gray-500">Image</span>
                        <span className="text-xs text-green-600">Uploaded</span>
                      </div>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowSuccessModal(false);
                      setSuccessData(null);
                    }}
                    className="w-full py-3 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors"
                  >
                    {lang === "en"
                      ? "Close"
                      : lang === "fr"
                        ? "Fermer"
                        : "Funga"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Fail Modal */}
      <AnimatePresence>
        {showFailModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[700]"
              onClick={() => setShowFailModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-4 z-[701] flex items-center justify-center"
            >
              <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
                <div className="text-center">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CancelIcon className="w-12 h-12 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {lang === "en"
                      ? "Request Failed"
                      : lang === "fr"
                        ? "Échec de la Demande"
                        : "Ubutumwa Ntabwo Bwoherejwe"}
                  </h3>
                  <p className="text-gray-600 mb-4">{failMessage}</p>
                  <div className="bg-red-50 rounded-lg p-3 text-left text-sm mb-4">
                    <p className="text-red-600 flex items-start gap-2">
                      <ErrorOutlineRounded className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>
                        {lang === "en"
                          ? "There was an error submitting your request. Please try again or contact support directly."
                          : lang === "fr"
                            ? "Une erreur s'est produite lors de l'envoi de votre demande. Veuillez réessayer ou contacter le support directement."
                            : "Habaye ikosa ryatumye ubutumwa butawoherezwa. Ongera ugerageze cyangwa wandikire ubufasha."}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setShowFailModal(false);
                        setIsAssistanceModalOpen(true);
                      }}
                      className="flex-1 py-3 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors"
                    >
                      {lang === "en"
                        ? "Try Again"
                        : lang === "fr"
                          ? "Réessayer"
                          : "Ongera Ugerageze"}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setShowFailModal(false);
                        setFailMessage("");
                      }}
                      className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                    >
                      {lang === "en"
                        ? "Close"
                        : lang === "fr"
                          ? "Fermer"
                          : "Funga"}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};