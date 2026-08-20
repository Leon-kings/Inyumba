// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable react-hooks/immutability */
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-toastify";
// import Cookies from 'js-cookie';
// import axios from 'axios';

// // Material-UI Icons
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// import SearchIcon from "@mui/icons-material/Search";
// import HomeIcon from "@mui/icons-material/Home";
// import SchoolIcon from "@mui/icons-material/School";
// import SecurityIcon from "@mui/icons-material/Security";
// import PaymentsIcon from "@mui/icons-material/Payments";
// import SupportAgentIcon from "@mui/icons-material/SupportAgent";
// import VerifiedIcon from "@mui/icons-material/Verified";
// import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
// import CloseIcon from "@mui/icons-material/Close";
// import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
// import { HelpOutlineRounded } from "@mui/icons-material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import CancelIcon from "@mui/icons-material/Cancel";
// import SendIcon from "@mui/icons-material/Send";
// import EmailIcon from "@mui/icons-material/Email";
// import PersonIcon from "@mui/icons-material/Person";
// import ChatIcon from "@mui/icons-material/Chat";

// // API endpoint - replace with your actual API URL
// const API_URL = 'http://localhost:5000/api/contact';

// // Translations
// const translations = {
//   en: {
//     faq: "Frequently Asked Questions",
//     tagline: "Find answers to the most common questions about INYUMBA PROJECT",
//     searchPlaceholder: "Search for answers...",
//     noResults: "No results found for your search.",
//     clearSearch: "Clear search",
//     categories: "Categories",
//     allCategories: "All Categories",
//     general: "General",
//     booking: "Booking & Payment",
//     housing: "Housing & Properties",
//     landlord: "For Landlords",
//     university: "For Universities",
//     askQuestion: "Ask a Question",
//     askQuestionDesc:
//       "Have a question that's not listed? Ask us directly and we'll get back to you.",
//     yourName: "Your Name",
//     yourEmail: "Your Email",
//     yourQuestion: "Your Question",
//     submitQuestion: "Submit Question",
//     submitting: "Submitting...",
//     success:
//       "Your question has been submitted successfully! We'll get back to you soon.",
//     questionRequired: "Please enter your question",
//     questionMin: "Question must be at least 10 characters",
//     emailRequired: "Email is required",
//     emailInvalid: "Please enter a valid email address",
//     nameRequired: "Name is required",
//     nameMin: "Name must be at least 2 characters",
//     stillHaveQuestions: "Still Have Questions?",
//     contactSupport: "Contact our support team for personalized assistance.",
//     contactUs: "Contact Us",
//     faqs: "FAQs",
//     relatedQuestions: "Related Questions",
//     showAnswer: "Show Answer",
//     hideAnswer: "Hide Answer",
//     contactTitle: "Contact Us",
//     contactDesc: "Fill out the form below and we'll get back to you within 24 hours.",
//     subject: "Subject",
//     yourMessage: "Your Message",
//     sendMessage: "Send Message",
//     sending: "Sending...",
//     messageRequired: "Message is required",
//     messageMin: "Message must be at least 10 characters",
//     subjectRequired: "Subject is required",
//     subjectMin: "Subject must be at least 3 characters",
//     successContact: "Message sent successfully! We'll respond within 24 hours.",
//     errorContact: "Failed to send message. Please try again.",
//   },
//   fr: {
//     faq: "Foire Aux Questions",
//     tagline:
//       "Trouvez des réponses aux questions les plus courantes sur INYUMBA PROJECT",
//     searchPlaceholder: "Rechercher des réponses...",
//     noResults: "Aucun résultat trouvé pour votre recherche.",
//     clearSearch: "Effacer la recherche",
//     categories: "Catégories",
//     allCategories: "Toutes les Catégories",
//     general: "Général",
//     booking: "Réservation & Paiement",
//     housing: "Logement & Propriétés",
//     landlord: "Pour les Propriétaires",
//     university: "Pour les Universités",
//     askQuestion: "Poser une Question",
//     askQuestionDesc:
//       "Vous avez une question qui n'est pas listée? Posez-la nous directement et nous vous répondrons.",
//     yourName: "Votre Nom",
//     yourEmail: "Votre Email",
//     yourQuestion: "Votre Question",
//     submitQuestion: "Soumettre la Question",
//     submitting: "Soumission...",
//     success:
//       "Votre question a été soumise avec succès! Nous vous répondrons bientôt.",
//     questionRequired: "Veuillez entrer votre question",
//     questionMin: "La question doit contenir au moins 10 caractères",
//     emailRequired: "L'email est requis",
//     emailInvalid: "Veuillez entrer une adresse email valide",
//     nameRequired: "Le nom est requis",
//     nameMin: "Le nom doit contenir au moins 2 caractères",
//     stillHaveQuestions: "Encore des Questions?",
//     contactSupport:
//       "Contactez notre équipe de support pour une assistance personnalisée.",
//     contactUs: "Contactez-Nous",
//     faqs: "FAQ",
//     relatedQuestions: "Questions Similaires",
//     showAnswer: "Voir la Réponse",
//     hideAnswer: "Cacher la Réponse",
//     contactTitle: "Contactez-Nous",
//     contactDesc: "Remplissez le formulaire ci-dessous et nous vous répondrons dans les 24 heures.",
//     subject: "Sujet",
//     yourMessage: "Votre Message",
//     sendMessage: "Envoyer le Message",
//     sending: "Envoi en cours...",
//     messageRequired: "Le message est requis",
//     messageMin: "Le message doit contenir au moins 10 caractères",
//     subjectRequired: "Le sujet est requis",
//     subjectMin: "Le sujet doit contenir au moins 3 caractères",
//     successContact: "Message envoyé avec succès ! Nous répondrons dans les 24 heures.",
//     errorContact: "Échec de l'envoi du message. Veuillez réessayer.",
//   },
//   rw: {
//     faq: "Ibibazo Bikunze Kubazwa",
//     tagline: "Shakisha ibisubizo kubibazo bikunze kubazwa kuri INYUMBA PROJECT",
//     searchPlaceholder: "Shakisha ibisubizo...",
//     noResults: "Nta bisubizo byabonetse.",
//     clearSearch: "Kuraho ibyashakishijwe",
//     categories: "Ibyiciro",
//     allCategories: "Ibyiciro Byose",
//     general: "Rusange",
//     booking: "Icyemezo & Ubwishyu",
//     housing: "Amazu & Ibyifatanyije",
//     landlord: "Kubatunze Inzu",
//     university: "Kubaminuza",
//     askQuestion: "Baza Ikibazo",
//     askQuestionDesc: "Ufite ikibazo kidahari? Tubaze kandi tuzagusubiza.",
//     yourName: "Izina Ryawe",
//     yourEmail: "Imeri Yawe",
//     yourQuestion: "Ikibazo Kyawe",
//     submitQuestion: "Ohereza Ikibazo",
//     submitting: "Biremereza...",
//     success: "Ikibazo cyawe cyoherejwe neza! Tuzagusubiza vuba.",
//     questionRequired: "Injiza ikibazo cyawe",
//     questionMin: "Ikibazo kigomba kuba nibura inyuguti 10",
//     emailRequired: "Imeri irasabwa",
//     emailInvalid: "Injiza aderesi ya imeri ikwiye",
//     nameRequired: "Izina rirasabwa",
//     nameMin: "Izina rigomba kuba nibura inyuguti 2",
//     stillHaveQuestions: "Ukiri Ikibazo?",
//     contactSupport: "Twandikire kugira ngo tugufashe.",
//     contactUs: "Twandikire",
//     faqs: "FAQ",
//     relatedQuestions: "Ibibazo Bisa",
//     showAnswer: "Reba Igisubizo",
//     hideAnswer: "Hisha Igisubizo",
//     contactTitle: "Twandikire",
//     contactDesc: "Uzura uru rupapuro maze tuzagusubiza mu masaha 24.",
//     subject: "Ikibazo",
//     yourMessage: "Ubutumwa Bwawe",
//     sendMessage: "Ohereza Ubutumwa",
//     sending: "Biremereza...",
//     messageRequired: "Ubutumwa burasabwa",
//     messageMin: "Ubutumwa bugomba kuba nibura inyuguti 10",
//     subjectRequired: "Ikibazo girasabwa",
//     subjectMin: "Ikibazo kigomba kuba nibura inyuguti 3",
//     successContact: "Ubutumwa bwoherejwe neza! Tuzagusubiza mu masaha 24.",
//     errorContact: "Ubutumwa ntabwo bwoherejwe. Ongera ugerageze.",
//   },
// };

// interface FAQItem {
//   id: number;
//   question: string;
//   answer: string;
//   category: "general" | "booking" | "housing" | "landlord" | "university";
//   icon: React.ReactNode;
// }

// // Helper function to get language from cookies
// const getLanguageFromCookies = (): 'en' | 'fr' | 'rw' => {
//   const lang = Cookies.get('language') as 'en' | 'fr' | 'rw';
//   return lang || 'en';
// };

// export const FAQ: React.FC = () => {
//   // Get language from cookies
//   const [lang, setLang] = useState<'en' | 'fr' | 'rw'>(getLanguageFromCookies());
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState<
//     "all" | "general" | "booking" | "housing" | "landlord" | "university"
//   >("all");
//   const [expandedId, setExpandedId] = useState<number | null>(null);
//   const [isAskModalOpen, setIsAskModalOpen] = useState(false);
//   const [isContactModalOpen, setIsContactModalOpen] = useState(false);

//   // Form state for Ask Question
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     question: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isFormValid, setIsFormValid] = useState(false);
//   const [isNameValid, setIsNameValid] = useState<boolean | null>(null);
//   const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
//   const [isQuestionValid, setIsQuestionValid] = useState<boolean | null>(null);
//   const [errors, setErrors] = useState<{
//     name?: string;
//     email?: string;
//     question?: string;
//   }>({});

//   // Form state for Contact
//   const [contactFormData, setContactFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });
//   const [isContactSubmitting, setIsContactSubmitting] = useState(false);
//   const [isContactFormValid, setIsContactFormValid] = useState(false);
//   const [isContactNameValid, setIsContactNameValid] = useState<boolean | null>(null);
//   const [isContactEmailValid, setIsContactEmailValid] = useState<boolean | null>(null);
//   const [isSubjectValid, setIsSubjectValid] = useState<boolean | null>(null);
//   const [isMessageValid, setIsMessageValid] = useState<boolean | null>(null);
//   const [contactErrors, setContactErrors] = useState<{
//     name?: string;
//     email?: string;
//     subject?: string;
//     message?: string;
//   }>({});

//   const t = translations[lang];

//   // Listen for language changes in cookies
//   useEffect(() => {
//     const handleCookieChange = () => {
//       const newLang = getLanguageFromCookies();
//       if (newLang !== lang) {
//         setLang(newLang);
//       }
//     };

//     const interval = setInterval(handleCookieChange, 1000);
//     return () => clearInterval(interval);
//   }, [lang]);

//   // Validate Ask Question form on change
//   useEffect(() => {
//     const nameValid = formData.name.length >= 2;
//     const emailValid = validateEmail(formData.email);
//     const questionValid = formData.question.length >= 10;

//     setIsNameValid(formData.name.length > 0 ? nameValid : null);
//     setIsEmailValid(formData.email.length > 0 ? emailValid : null);
//     setIsQuestionValid(formData.question.length > 0 ? questionValid : null);

//     const valid = nameValid && emailValid && questionValid;
//     setIsFormValid(valid);

//     if (nameValid && errors.name) {
//       setErrors((prev) => ({ ...prev, name: undefined }));
//     }
//     if (emailValid && errors.email) {
//       setErrors((prev) => ({ ...prev, email: undefined }));
//     }
//     if (questionValid && errors.question) {
//       setErrors((prev) => ({ ...prev, question: undefined }));
//     }
//   }, [formData.name, formData.email, formData.question]);

//   // Validate Contact form on change
//   useEffect(() => {
//     const nameValid = contactFormData.name.length >= 2;
//     const emailValid = validateEmail(contactFormData.email);
//     const subjectValid = contactFormData.subject.length >= 3;
//     const messageValid = contactFormData.message.length >= 10;

//     setIsContactNameValid(contactFormData.name.length > 0 ? nameValid : null);
//     setIsContactEmailValid(contactFormData.email.length > 0 ? emailValid : null);
//     setIsSubjectValid(contactFormData.subject.length > 0 ? subjectValid : null);
//     setIsMessageValid(contactFormData.message.length > 0 ? messageValid : null);

//     const valid = nameValid && emailValid && subjectValid && messageValid;
//     setIsContactFormValid(valid);

//     if (nameValid && contactErrors.name) {
//       setContactErrors((prev) => ({ ...prev, name: undefined }));
//     }
//     if (emailValid && contactErrors.email) {
//       setContactErrors((prev) => ({ ...prev, email: undefined }));
//     }
//     if (subjectValid && contactErrors.subject) {
//       setContactErrors((prev) => ({ ...prev, subject: undefined }));
//     }
//     if (messageValid && contactErrors.message) {
//       setContactErrors((prev) => ({ ...prev, message: undefined }));
//     }
//   }, [contactFormData]);

//   const validateEmail = (email: string): boolean => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleContactInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     const { name, value } = e.target;
//     setContactFormData({ ...contactFormData, [name]: value });
//   };

//   const validateForm = (): boolean => {
//     const newErrors: { name?: string; email?: string; question?: string } = {};

//     if (!formData.name || formData.name.length < 2) {
//       newErrors.name = t.nameMin;
//     }

//     if (!formData.email) {
//       newErrors.email = t.emailRequired;
//     } else if (!validateEmail(formData.email)) {
//       newErrors.email = t.emailInvalid;
//     }

//     if (!formData.question || formData.question.length < 10) {
//       newErrors.question = t.questionMin;
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const validateContactForm = (): boolean => {
//     const newErrors: { name?: string; email?: string; subject?: string; message?: string } = {};

//     if (!contactFormData.name || contactFormData.name.length < 2) {
//       newErrors.name = t.nameMin;
//     }

//     if (!contactFormData.email) {
//       newErrors.email = t.emailRequired;
//     } else if (!validateEmail(contactFormData.email)) {
//       newErrors.email = t.emailInvalid;
//     }

//     if (!contactFormData.subject || contactFormData.subject.length < 3) {
//       newErrors.subject = t.subjectMin;
//     }

//     if (!contactFormData.message || contactFormData.message.length < 10) {
//       newErrors.message = t.messageMin;
//     }

//     setContactErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast.error("Please fix the errors before submitting.");
//       return;
//     }

//     setIsSubmitting(true);

//     setTimeout(() => {
//       setIsSubmitting(false);
//       toast.success(t.success);
//       setFormData({ name: "", email: "", question: "" });
//       setIsNameValid(null);
//       setIsEmailValid(null);
//       setIsQuestionValid(null);
//       setIsFormValid(false);
//       setIsAskModalOpen(false);
//     }, 1500);
//   };

//   const handleContactSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateContactForm()) {
//       toast.error("Please fix the errors before submitting.");
//       return;
//     }

//     setIsContactSubmitting(true);

//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('name', contactFormData.name);
//       formDataToSend.append('email', contactFormData.email);
//       formDataToSend.append('subject', contactFormData.subject);
//       formDataToSend.append('message', contactFormData.message);
//       formDataToSend.append('language', lang);

//       const response = await axios.post(API_URL, formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         timeout: 30000,
//       });

//       if (response.status === 200 || response.status === 201) {
//         toast.success(t.successContact);
        
//         setContactFormData({ name: "", email: "", subject: "", message: "" });
//         setIsContactNameValid(null);
//         setIsContactEmailValid(null);
//         setIsSubjectValid(null);
//         setIsMessageValid(null);
//         setIsContactFormValid(false);
//         setIsContactModalOpen(false);
//       } else {
//         throw new Error('Failed to send message');
//       }
//     } catch (error: any) {
//       console.error('Error sending contact message:', error);
      
//       if (error.response) {
//         const errorMessage = error.response.data?.message || t.errorContact;
//         toast.error(errorMessage);
//       } else if (error.request) {
//         toast.error('Network error. Please check your internet connection.');
//       } else {
//         toast.error(t.errorContact);
//       }
//     } finally {
//       setIsContactSubmitting(false);
//     }
//   };

//   const faqData: FAQItem[] = [
//     // General
//     {
//       id: 1,
//       question: "What is INYUMBA PROJECT?",
//       answer:
//         "INYUMBA PROJECT is a student housing platform dedicated to connecting university students with verified, safe, and affordable accommodation near their campuses across Rwanda. We make finding a student home simple and stress-free.",
//       category: "general",
//       icon: <HomeIcon />,
//     },
//     {
//       id: 2,
//       question: "How does INYUMBA PROJECT work?",
//       answer:
//         "Students can search for verified houses near their university, filter by price and amenities, book instantly, and pay securely using MOMO. Landlords can list their properties and manage bookings through our platform. It's a complete solution for student housing.",
//       category: "general",
//       icon: <HelpOutlineRounded />,
//     },
//     {
//       id: 3,
//       question: "Is INYUMBA PROJECT free for students?",
//       answer:
//         "Yes! INYUMBA PROJECT is completely free for students to search, browse, and book houses. We believe in making student housing accessible to everyone.",
//       category: "general",
//       icon: <CheckCircleIcon />,
//     },
//     {
//       id: 4,
//       question: "How do I create an account?",
//       answer:
//         'You can create an account by clicking on the "Sign up" button in the top right corner of our website. Fill in your name, email, and password, and you\'re ready to start finding your perfect student home.',
//       category: "general",
//       icon: <PersonIcon />,
//     },

//     // Booking & Payment
//     {
//       id: 5,
//       question: "How do I book a house?",
//       answer:
//         "Once you find a house you like, click on it to view details. Then click the \"Book Now\" button, select your move-in date, and confirm your booking. You'll receive an instant confirmation with the landlord's contact details.",
//       category: "booking",
//       icon: <PaymentsIcon />,
//     },
//     {
//       id: 6,
//       question: "What payment methods are accepted?",
//       answer:
//         "We accept payments through MOMO (Mobile Money) for secure and convenient transactions. Your payment is protected and only released to the landlord upon your satisfaction.",
//       category: "booking",
//       icon: <PaymentsIcon />,
//     },
//     {
//       id: 7,
//       question: "Is my payment secure?",
//       answer:
//         "Yes! All payments are processed through secure MOMO integration. Your financial information is protected, and payments are only released to landlords after you confirm your satisfaction with the accommodation.",
//       category: "booking",
//       icon: <SecurityIcon />,
//     },
//     {
//       id: 8,
//       question: "Can I cancel my booking?",
//       answer:
//         "Cancellation policies vary by landlord. We recommend checking the specific cancellation policy listed on each property before booking. For any issues, our support team is available 24/7 to assist you.",
//       category: "booking",
//       icon: <SupportAgentIcon />,
//     },

//     // Housing & Properties
//     {
//       id: 9,
//       question: "How are houses verified?",
//       answer:
//         "All houses on our platform undergo a thorough verification process. We inspect properties for quality, safety, and comfort. We also verify that the landlord is legitimate and that the property matches the listing description.",
//       category: "housing",
//       icon: <VerifiedIcon />,
//     },
//     {
//       id: 10,
//       question: "What amenities are available?",
//       answer:
//         "Houses on our platform offer various amenities including WiFi, parking, kitchen facilities, security systems, study areas, and more. You can filter properties by amenities to find exactly what you need.",
//       category: "housing",
//       icon: <HomeIcon />,
//     },
//     {
//       id: 11,
//       question: "Are the houses near universities?",
//       answer:
//         "Yes! All properties on our platform are located within walking distance or a short commute from major universities. We prioritize locations that are convenient for students.",
//       category: "housing",
//       icon: <SchoolIcon />,
//     },
//     {
//       id: 12,
//       question: "Can I view the house before booking?",
//       answer:
//         "While we provide detailed photos and descriptions for all properties, we recommend contacting the landlord directly through our platform to arrange a viewing before booking. This ensures you're completely satisfied with your choice.",
//       category: "housing",
//       icon: <HomeIcon />,
//     },

//     // For Landlords
//     {
//       id: 13,
//       question: "How do I list my property?",
//       answer:
//         'To list your property, click on "Become a Host" in the navigation bar. Fill in the details about your property, upload photos, set your price, and submit for verification. Once approved, your property will be visible to students.',
//       category: "landlord",
//       icon: <HomeIcon />,
//     },
//     {
//       id: 14,
//       question: "How much does it cost to list a property?",
//       answer:
//         "Listing your property on INYUMBA PROJECT is free! We only charge a small commission on successful bookings. This ensures we only make money when you make money.",
//       category: "landlord",
//       icon: <PaymentsIcon />,
//     },
//     {
//       id: 15,
//       question: "How do I manage bookings?",
//       answer:
//         "You can manage all your bookings through your landlord dashboard. You'll receive real-time notifications when a student books your property, and you can track payments, communicate with students, and manage your listings all in one place.",
//       category: "landlord",
//       icon: <SupportAgentIcon />,
//     },
//     {
//       id: 16,
//       question: "How do I get paid?",
//       answer:
//         "Payments are processed through MOMO and are released to you after the student confirms they are satisfied with the accommodation. You'll receive payment notifications and can track all transactions in your dashboard.",
//       category: "landlord",
//       icon: <PaymentsIcon />,
//     },

//     // For Universities
//     {
//       id: 17,
//       question: "Can universities partner with INYUMBA PROJECT?",
//       answer:
//         "Yes! We welcome partnerships with universities to provide verified housing options for their students. Partner universities get access to exclusive housing options and priority support for their students.",
//       category: "university",
//       icon: <SchoolIcon />,
//     },
//     {
//       id: 18,
//       question: "What benefits do partner universities receive?",
//       answer:
//         "Partner universities receive dedicated support, verified housing options for their students, priority listings, and regular reports on housing availability. We work together to ensure students have access to safe and affordable accommodation.",
//       category: "university",
//       icon: <VerifiedIcon />,
//     },
//     {
//       id: 19,
//       question: "How can my university join?",
//       answer:
//         'Contact our team through the "Contact Us" section or email us directly at inyumba@yahoo.fr. We\'ll schedule a meeting to discuss partnership opportunities and how we can support your students.',
//       category: "university",
//       icon: <SupportAgentIcon />,
//     },
//   ];

//   const categories = [
//     { id: "all", label: t.allCategories, icon: <AutoAwesomeIcon /> },
//     { id: "general", label: t.general, icon: <HelpOutlineRounded /> },
//     { id: "booking", label: t.booking, icon: <PaymentsIcon /> },
//     { id: "housing", label: t.housing, icon: <HomeIcon /> },
//     { id: "landlord", label: t.landlord, icon: <VerifiedIcon /> },
//     { id: "university", label: t.university, icon: <SchoolIcon /> },
//   ];

//   const filteredFAQs = faqData.filter((faq) => {
//     const matchesSearch =
//       faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory =
//       selectedCategory === "all" || faq.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const toggleExpand = (id: number) => {
//     setExpandedId(expandedId === id ? null : id);
//   };

//   const getCategoryIcon = (category: string) => {
//     switch (category) {
//       case "general":
//         return <HelpOutlineRounded />;
//       case "booking":
//         return <PaymentsIcon />;
//       case "housing":
//         return <HomeIcon />;
//       case "landlord":
//         return <VerifiedIcon />;
//       case "university":
//         return <SchoolIcon />;
//       default:
//         return <HelpOutlineRounded />;
//     }
//   };

//   const getCategoryColor = (category: string) => {
//     switch (category) {
//       case "general":
//         return "bg-blue-100 text-blue-600";
//       case "booking":
//         return "bg-green-100 text-green-600";
//       case "housing":
//         return "bg-purple-100 text-purple-600";
//       case "landlord":
//         return "bg-orange-100 text-orange-600";
//       case "university":
//         return "bg-pink-100 text-pink-600";
//       default:
//         return "bg-gray-100 text-gray-600";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <section className="relative bg-gradient-to-r from-[#FF385C] to-[#E31C5F] py-16 sm:py-20 md:py-28 overflow-hidden">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-0 right-0 w-72 h-72 bg-white rounded-full -mt-20 -mr-20"></div>
//           <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -mb-40 -ml-40"></div>
//         </div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center text-white"
//           >
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
//               className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6"
//             >
//               <span className="text-sm font-medium flex items-center gap-2">
//                 <QuestionAnswerIcon className="w-4 h-4" />
//                 {t.faqs}
//               </span>
//             </motion.div>
//             <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
//               {t.faq}
//             </h1>
//             <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light">
//               {t.tagline}
//             </p>
//           </motion.div>
//         </div>
//         <div className="absolute bottom-0 left-0 right-0">
//           <svg
//             viewBox="0 0 1440 120"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H0Z"
//               fill="#F9FAFB"
//             />
//           </svg>
//         </div>
//       </section>

//       {/* Search & Filter Section */}
//       <section className="py-8 bg-white border-b border-gray-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col md:flex-row gap-4">
//             {/* Search Bar */}
//             <div className="flex-1 relative">
//               <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                 <SearchIcon className="w-5 h-5" />
//               </div>
//               <input
//                 type="text"
//                 placeholder={t.searchPlaceholder}
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#FF385C] focus:ring-2 focus:ring-[#FF385C]/20 transition-colors"
//               />
//               {searchQuery && (
//                 <button
//                   onClick={() => setSearchQuery("")}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   <CloseIcon className="w-5 h-5" />
//                 </button>
//               )}
//             </div>

//             {/* Ask Question Button */}
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => setIsAskModalOpen(true)}
//               className="px-6 py-3 bg-[#FF385C] text-white rounded-xl font-medium hover:bg-[#E31C5F] transition-colors shadow-lg shadow-[#FF385C]/30 flex items-center justify-center gap-2 whitespace-nowrap"
//             >
//               <QuestionAnswerIcon className="w-5 h-5" />
//               {t.askQuestion}
//             </motion.button>
//           </div>
//         </div>
//       </section>

//       {/* Categories */}
//       <section className="py-6 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-wrap gap-2 justify-center">
//             {categories.map((category) => (
//               <motion.button
//                 key={category.id}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setSelectedCategory(category.id as any)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
//                   selectedCategory === category.id
//                     ? "bg-[#FF385C] text-white shadow-lg shadow-[#FF385C]/30"
//                     : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
//                 }`}
//               >
//                 {category.icon}
//                 {category.label}
//               </motion.button>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FAQ List */}
//       <section className="py-12 bg-gray-50">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           {filteredFAQs.length === 0 ? (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="text-center py-12"
//             >
//               <HelpOutlineRounded className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//               <h3 className="text-xl font-semibold text-gray-700">
//                 {t.noResults}
//               </h3>
//               <button
//                 onClick={() => {
//                   setSearchQuery("");
//                   setSelectedCategory("all");
//                 }}
//                 className="mt-4 text-[#FF385C] font-medium hover:underline"
//               >
//                 {t.clearSearch}
//               </button>
//             </motion.div>
//           ) : (
//             <div className="space-y-4">
//               {filteredFAQs.map((faq, index) => (
//                 <motion.div
//                   key={faq.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.05, duration: 0.3 }}
//                   className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden"
//                 >
//                   <button
//                     onClick={() => toggleExpand(faq.id)}
//                     className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
//                   >
//                     <div className="flex items-start gap-3 flex-1">
//                       <div
//                         className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${getCategoryColor(faq.category)}`}
//                       >
//                         {getCategoryIcon(faq.category)}
//                       </div>
//                       <div className="flex-1">
//                         <div className="flex flex-wrap items-center gap-2">
//                           <span className="text-sm font-semibold text-gray-900">
//                             {faq.question}
//                           </span>
//                           <span
//                             className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(faq.category)}`}
//                           >
//                             {faq.category}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="ml-4 flex-shrink-0 text-gray-400">
//                       {expandedId === faq.id ? (
//                         <ExpandLessIcon className="w-6 h-6" />
//                       ) : (
//                         <ExpandMoreIcon className="w-6 h-6" />
//                       )}
//                     </div>
//                   </button>

//                   <AnimatePresence>
//                     {expandedId === faq.id && (
//                       <motion.div
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: "auto", opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         transition={{ duration: 0.3 }}
//                         className="overflow-hidden"
//                       >
//                         <div className="px-6 pb-4 pt-1 border-t border-gray-100">
//                           <div className="flex items-start gap-3">
//                             <div className="w-10 flex-shrink-0">
//                               <div className="w-8 h-8 bg-[#FF385C]/10 rounded-full flex items-center justify-center text-[#FF385C]">
//                                 <CheckCircleIcon className="w-4 h-4" />
//                               </div>
//                             </div>
//                             <div className="flex-1">
//                               <p className="text-gray-600 leading-relaxed">
//                                 {faq.answer}
//                               </p>
//                               <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
//                                 <span>{t.relatedQuestions}</span>
//                                 <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
//                                 <button
//                                   onClick={() => setIsAskModalOpen(true)}
//                                   className="text-[#FF385C] hover:underline"
//                                 >
//                                   {t.askQuestion}
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Still Have Questions */}
//       <section className="py-16 bg-white border-t border-gray-100">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <div className="w-16 h-16 bg-[#FF385C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
//               <ChatIcon className="w-8 h-8 text-[#FF385C]" />
//             </div>
//             <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
//               {t.stillHaveQuestions}
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto mb-6">
//               {t.contactSupport}
//             </p>
//             <div className="flex flex-wrap justify-center gap-4">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setIsAskModalOpen(true)}
//                 className="px-6 py-3 bg-[#FF385C] text-white rounded-xl font-medium hover:bg-[#E31C5F] transition-colors shadow-lg shadow-[#FF385C]/30 flex items-center gap-2"
//               >
//                 <QuestionAnswerIcon className="w-5 h-5" />
//                 {t.askQuestion}
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setIsContactModalOpen(true)}
//                 className="px-6 py-3 border-2 border-[#FF385C] text-[#FF385C] rounded-xl font-medium hover:bg-[#FF385C] hover:text-white transition-colors flex items-center gap-2"
//               >
//                 <EmailIcon className="w-5 h-5" />
//                 {t.contactUs}
//               </motion.button>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Ask Question Modal */}
//       <AnimatePresence>
//         {isAskModalOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
//               onClick={() => setIsAskModalOpen(false)}
//             />
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9, y: 20 }}
//               className="fixed inset-2 xs:inset-4 z-[201] flex items-center justify-center"
//             >
//               <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl">
//                 <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <div className="w-10 h-10 bg-[#FF385C]/10 rounded-full flex items-center justify-center text-[#FF385C]">
//                       <QuestionAnswerIcon className="w-5 h-5" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900">
//                         {t.askQuestion}
//                       </h3>
//                       <p className="text-xs text-gray-500">
//                         {t.askQuestionDesc}
//                       </p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setIsAskModalOpen(false)}
//                     className="p-1 rounded-full hover:bg-gray-100 transition-colors"
//                   >
//                     <CloseIcon className="w-5 h-5 text-gray-500" />
//                   </button>
//                 </div>

//                 <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
//                   <form
//                     onSubmit={handleSubmit}
//                     className="space-y-4"
//                     noValidate
//                   >
//                     {/* Name Field */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         {t.yourName}
//                       </label>
//                       <div className="relative">
//                         <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                           <PersonIcon className="w-5 h-5" />
//                         </div>
//                         <input
//                           type="text"
//                           name="name"
//                           value={formData.name}
//                           onChange={handleInputChange}
//                           className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-1 transition-colors text-sm ${
//                             isNameValid === true
//                               ? "border-green-500 focus:border-green-500 focus:ring-green-500"
//                               : isNameValid === false
//                                 ? "border-red-500 focus:border-red-500 focus:ring-red-500"
//                                 : "border-gray-300 focus:border-[#FF385C] focus:ring-[#FF385C]"
//                           }`}
//                           placeholder="John Doe"
//                         />
//                         {isNameValid === true && (
//                           <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
//                         )}
//                         {isNameValid === false && (
//                           <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
//                         )}
//                       </div>
//                       {errors.name && (
//                         <p className="text-xs text-red-500 mt-1">
//                           {errors.name}
//                         </p>
//                       )}
//                       {isNameValid === true && (
//                         <p className="text-xs text-green-500 mt-1">
//                           ✓ Valid name
//                         </p>
//                       )}
//                     </div>

//                     {/* Email Field */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         {t.yourEmail}
//                       </label>
//                       <div className="relative">
//                         <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                           <EmailIcon className="w-5 h-5" />
//                         </div>
//                         <input
//                           type="email"
//                           name="email"
//                           value={formData.email}
//                           onChange={handleInputChange}
//                           className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-1 transition-colors text-sm ${
//                             isEmailValid === true
//                               ? "border-green-500 focus:border-green-500 focus:ring-green-500"
//                               : isEmailValid === false
//                                 ? "border-red-500 focus:border-red-500 focus:ring-red-500"
//                                 : "border-gray-300 focus:border-[#FF385C] focus:ring-[#FF385C]"
//                           }`}
//                           placeholder="you@example.com"
//                         />
//                         {isEmailValid === true && (
//                           <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
//                         )}
//                         {isEmailValid === false && (
//                           <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
//                         )}
//                       </div>
//                       {errors.email && (
//                         <p className="text-xs text-red-500 mt-1">
//                           {errors.email}
//                         </p>
//                       )}
//                       {isEmailValid === true && (
//                         <p className="text-xs text-green-500 mt-1">
//                           ✓ Valid email
//                         </p>
//                       )}
//                     </div>

//                     {/* Question Field */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         {t.yourQuestion}
//                       </label>
//                       <div className="relative">
//                         <textarea
//                           name="question"
//                           value={formData.question}
//                           onChange={handleInputChange}
//                           rows={4}
//                           className={`w-full px-4 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-1 transition-colors text-sm resize-none ${
//                             isQuestionValid === true
//                               ? "border-green-500 focus:border-green-500 focus:ring-green-500"
//                               : isQuestionValid === false
//                                 ? "border-red-500 focus:border-red-500 focus:ring-red-500"
//                                 : "border-gray-300 focus:border-[#FF385C] focus:ring-[#FF385C]"
//                           }`}
//                           placeholder="Type your question here..."
//                         />
//                         <div className="absolute right-3 top-3">
//                           {isQuestionValid === true && (
//                             <CheckCircleIcon className="w-5 h-5 text-green-500" />
//                           )}
//                           {isQuestionValid === false && (
//                             <CancelIcon className="w-5 h-5 text-red-500" />
//                           )}
//                         </div>
//                       </div>
//                       {errors.question && (
//                         <p className="text-xs text-red-500 mt-1">
//                           {errors.question}
//                         </p>
//                       )}
//                       {isQuestionValid === true && (
//                         <p className="text-xs text-green-500 mt-1">
//                           ✓ Valid question
//                         </p>
//                       )}
//                       <p className="text-xs text-gray-400 mt-1">
//                         {formData.question.length}/10 characters minimum
//                       </p>
//                     </div>

//                     <motion.button
//                       whileHover={{ scale: isFormValid ? 1.02 : 1 }}
//                       whileTap={{ scale: isFormValid ? 0.98 : 1 }}
//                       type="submit"
//                       disabled={!isFormValid || isSubmitting}
//                       className={`w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
//                         isFormValid && !isSubmitting
//                           ? "bg-[#FF385C] text-white hover:bg-[#E31C5F] shadow-lg shadow-[#FF385C]/30 cursor-pointer"
//                           : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                       }`}
//                     >
//                       {isSubmitting ? (
//                         <>
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           {t.submitting}
//                         </>
//                       ) : (
//                         <>
//                           <SendIcon className="w-5 h-5" />
//                           {t.submitQuestion}
//                         </>
//                       )}
//                     </motion.button>

//                     {!isFormValid &&
//                       Object.keys(formData).some(
//                         (key) =>
//                           formData[key as keyof typeof formData].length > 0,
//                       ) && (
//                         <p className="text-center text-xs text-amber-500 mt-2">
//                           Please fill in all fields correctly to enable submit
//                         </p>
//                       )}
//                   </form>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Contact Modal - Without Image Upload */}
//       <AnimatePresence>
//         {isContactModalOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[600]"
//               onClick={() => setIsContactModalOpen(false)}
//             />
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9, y: 20 }}
//               className="fixed inset-2 xs:inset-4 z-[601] flex items-center justify-center"
//             >
//               <div className="bg-white rounded-xl xs:rounded-2xl w-full max-w-2xl max-h-[95vh] xs:max-h-[90vh] overflow-hidden shadow-2xl">
//                 {/* Modal Header */}
//                 <div className="sticky top-0 bg-white border-b border-gray-200 p-4 xs:p-6 flex items-center justify-between z-10">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-[#FF385C]/10 rounded-full flex items-center justify-center text-[#FF385C]">
//                       <EmailIcon className="w-5 h-5" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg xs:text-xl font-bold text-gray-900">
//                         {t.contactTitle}
//                       </h3>
//                       <p className="text-xs text-gray-500">
//                         {t.contactDesc}
//                       </p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setIsContactModalOpen(false)}
//                     className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//                   >
//                     <CloseIcon className="w-5 h-5 text-gray-600" />
//                   </button>
//                 </div>

//                 {/* Modal Content */}
//                 <div className="p-4 xs:p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
//                   <form onSubmit={handleContactSubmit} className="space-y-4" noValidate>
//                     {/* Name Field */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         {t.yourName} <span className="text-red-500">*</span>
//                       </label>
//                       <div className="relative">
//                         <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                           <PersonIcon className="w-5 h-5" />
//                         </div>
//                         <input
//                           type="text"
//                           name="name"
//                           value={contactFormData.name}
//                           onChange={handleContactInputChange}
//                           className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-1 transition-colors text-sm ${
//                             isContactNameValid === true
//                               ? "border-green-500 focus:border-green-500 focus:ring-green-500"
//                               : isContactNameValid === false
//                                 ? "border-red-500 focus:border-red-500 focus:ring-red-500"
//                                 : "border-gray-300 focus:border-[#FF385C] focus:ring-[#FF385C]"
//                           }`}
//                           placeholder="John Doe"
//                         />
//                         {isContactNameValid === true && (
//                           <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
//                         )}
//                         {isContactNameValid === false && (
//                           <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
//                         )}
//                       </div>
//                       {contactErrors.name && (
//                         <p className="text-xs text-red-500 mt-1">{contactErrors.name}</p>
//                       )}
//                     </div>

//                     {/* Email Field */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         {t.yourEmail} <span className="text-red-500">*</span>
//                       </label>
//                       <div className="relative">
//                         <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                           <EmailIcon className="w-5 h-5" />
//                         </div>
//                         <input
//                           type="email"
//                           name="email"
//                           value={contactFormData.email}
//                           onChange={handleContactInputChange}
//                           className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-1 transition-colors text-sm ${
//                             isContactEmailValid === true
//                               ? "border-green-500 focus:border-green-500 focus:ring-green-500"
//                               : isContactEmailValid === false
//                                 ? "border-red-500 focus:border-red-500 focus:ring-red-500"
//                                 : "border-gray-300 focus:border-[#FF385C] focus:ring-[#FF385C]"
//                           }`}
//                           placeholder="you@example.com"
//                         />
//                         {isContactEmailValid === true && (
//                           <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
//                         )}
//                         {isContactEmailValid === false && (
//                           <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
//                         )}
//                       </div>
//                       {contactErrors.email && (
//                         <p className="text-xs text-red-500 mt-1">{contactErrors.email}</p>
//                       )}
//                     </div>

//                     {/* Subject Field */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         {t.subject} <span className="text-red-500">*</span>
//                       </label>
//                       <div className="relative">
//                         <input
//                           type="text"
//                           name="subject"
//                           value={contactFormData.subject}
//                           onChange={handleContactInputChange}
//                           className={`w-full pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-1 transition-colors text-sm px-4 ${
//                             isSubjectValid === true
//                               ? "border-green-500 focus:border-green-500 focus:ring-green-500"
//                               : isSubjectValid === false
//                                 ? "border-red-500 focus:border-red-500 focus:ring-red-500"
//                                 : "border-gray-300 focus:border-[#FF385C] focus:ring-[#FF385C]"
//                           }`}
//                           placeholder="Subject of your message"
//                         />
//                         {isSubjectValid === true && (
//                           <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
//                         )}
//                         {isSubjectValid === false && (
//                           <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
//                         )}
//                       </div>
//                       {contactErrors.subject && (
//                         <p className="text-xs text-red-500 mt-1">{contactErrors.subject}</p>
//                       )}
//                     </div>

//                     {/* Message Field */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         {t.yourMessage} <span className="text-red-500">*</span>
//                       </label>
//                       <div className="relative">
//                         <textarea
//                           name="message"
//                           value={contactFormData.message}
//                           onChange={handleContactInputChange}
//                           rows={4}
//                           className={`w-full pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-1 transition-colors text-sm resize-none px-4 ${
//                             isMessageValid === true
//                               ? "border-green-500 focus:border-green-500 focus:ring-green-500"
//                               : isMessageValid === false
//                                 ? "border-red-500 focus:border-red-500 focus:ring-red-500"
//                                 : "border-gray-300 focus:border-[#FF385C] focus:ring-[#FF385C]"
//                           }`}
//                           placeholder="Describe your inquiry or request in detail..."
//                         />
//                         <div className="absolute right-3 top-3">
//                           {isMessageValid === true && (
//                             <CheckCircleIcon className="w-5 h-5 text-green-500" />
//                           )}
//                           {isMessageValid === false && (
//                             <CancelIcon className="w-5 h-5 text-red-500" />
//                           )}
//                         </div>
//                       </div>
//                       {contactErrors.message && (
//                         <p className="text-xs text-red-500 mt-1">{contactErrors.message}</p>
//                       )}
//                       <p className="text-xs text-gray-400 mt-1">
//                         {contactFormData.message.length}/10 characters minimum
//                       </p>
//                     </div>

//                     {/* Submit Button */}
//                     <motion.button
//                       whileHover={{ scale: isContactFormValid ? 1.02 : 1 }}
//                       whileTap={{ scale: isContactFormValid ? 0.98 : 1 }}
//                       type="submit"
//                       disabled={!isContactFormValid || isContactSubmitting}
//                       className={`w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
//                         isContactFormValid && !isContactSubmitting
//                           ? "bg-[#FF385C] text-white hover:bg-[#E31C5F] shadow-lg shadow-[#FF385C]/30 cursor-pointer"
//                           : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                       }`}
//                     >
//                       {isContactSubmitting ? (
//                         <>
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           {t.sending}
//                         </>
//                       ) : (
//                         <>
//                           <SendIcon className="w-5 h-5" />
//                           {t.sendMessage}
//                         </>
//                       )}
//                     </motion.button>

//                     {!isContactFormValid &&
//                       Object.keys(contactFormData).some(
//                         (key) => contactFormData[key as keyof typeof contactFormData].length > 0,
//                       ) && (
//                         <p className="text-center text-xs text-amber-500">
//                           Please fill in all fields correctly to enable submit
//                         </p>
//                       )}
//                   </form>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };









/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/immutability */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import axios from 'axios';

// Material-UI Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import SecurityIcon from "@mui/icons-material/Security";
import PaymentsIcon from "@mui/icons-material/Payments";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import VerifiedIcon from "@mui/icons-material/Verified";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CloseIcon from "@mui/icons-material/Close";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { HelpOutlineRounded } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import ErrorIcon from "@mui/icons-material/Error";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

// API endpoints
const CONTACT_API_URL = 'https://rene-inyumba-nodejs.onrender.com/contact';
const QUESTIONS_API_URL = 'https://rene-inyumba-nodejs.onrender.com/questions/submit';

// Translations
const translations = {
  en: {
    faq: "Frequently Asked Questions",
    tagline: "Find answers to the most common questions about INYUMBA PROJECT",
    searchPlaceholder: "Search for answers...",
    noResults: "No results found for your search.",
    clearSearch: "Clear search",
    categories: "Categories",
    allCategories: "All Categories",
    general: "General",
    booking: "Booking & Payment",
    housing: "Housing & Properties",
    landlord: "For Landlords",
    university: "For Universities",
    askQuestion: "Ask a Question",
    askQuestionDesc:
      "Have a question that's not listed? Ask us directly and we'll get back to you.",
    yourName: "Your Name",
    yourEmail: "Your Email",
    yourQuestion: "Your Question",
    submitQuestion: "Submit Question",
    submitting: "Submitting...",
    success: "Your question has been submitted successfully! We'll get back to you soon.",
    successTitle: "Question Submitted!",
    successDesc: "Thank you for your question. Our team will review it and get back to you shortly.",
    questionRequired: "Please enter your question",
    questionMin: "Question must be at least 10 characters",
    emailRequired: "Email is required",
    emailInvalid: "Please enter a valid email address",
    nameRequired: "Name is required",
    nameMin: "Name must be at least 2 characters",
    stillHaveQuestions: "Still Have Questions?",
    contactSupport: "Contact our support team for personalized assistance.",
    contactUs: "Contact Us",
    faqs: "FAQs",
    relatedQuestions: "Related Questions",
    showAnswer: "Show Answer",
    hideAnswer: "Hide Answer",
    contactTitle: "Contact Us",
    contactDesc: "Fill out the form below and we'll get back to you within 24 hours.",
    yourMessage: "Your Message",
    sendMessage: "Send Message",
    sending: "Sending...",
    messageRequired: "Message is required",
    messageMin: "Message must be at least 10 characters",
    successContact: "Message sent successfully! We'll respond within 24 hours.",
    successContactTitle: "Message Sent!",
    successContactDesc: "Thank you for contacting us. Our team will respond within 24 hours.",
    errorContact: "Failed to send message. Please try again.",
    errorTitle: "Submission Failed",
    errorDesc: "Something went wrong. Please try again or contact us directly.",
    errorNetwork: "Network Error",
    errorNetworkDesc: "Please check your internet connection and try again.",
    tryAgain: "Try Again",
    close: "Close",
    gotIt: "Got It",
    category: "Category",
    categoryOptional: "Category (Optional)",
  },
  fr: {
    faq: "Foire Aux Questions",
    tagline:
      "Trouvez des réponses aux questions les plus courantes sur INYUMBA PROJECT",
    searchPlaceholder: "Rechercher des réponses...",
    noResults: "Aucun résultat trouvé pour votre recherche.",
    clearSearch: "Effacer la recherche",
    categories: "Catégories",
    allCategories: "Toutes les Catégories",
    general: "Général",
    booking: "Réservation & Paiement",
    housing: "Logement & Propriétés",
    landlord: "Pour les Propriétaires",
    university: "Pour les Universités",
    askQuestion: "Poser une Question",
    askQuestionDesc:
      "Vous avez une question qui n'est pas listée? Posez-la nous directement et nous vous répondrons.",
    yourName: "Votre Nom",
    yourEmail: "Votre Email",
    yourQuestion: "Votre Question",
    submitQuestion: "Soumettre la Question",
    submitting: "Soumission...",
    success: "Votre question a été soumise avec succès! Nous vous répondrons bientôt.",
    successTitle: "Question Soumise!",
    successDesc: "Merci pour votre question. Notre équipe l'examinera et vous répondra bientôt.",
    questionRequired: "Veuillez entrer votre question",
    questionMin: "La question doit contenir au moins 10 caractères",
    emailRequired: "L'email est requis",
    emailInvalid: "Veuillez entrer une adresse email valide",
    nameRequired: "Le nom est requis",
    nameMin: "Le nom doit contenir au moins 2 caractères",
    stillHaveQuestions: "Encore des Questions?",
    contactSupport:
      "Contactez notre équipe de support pour une assistance personnalisée.",
    contactUs: "Contactez-Nous",
    faqs: "FAQ",
    relatedQuestions: "Questions Similaires",
    showAnswer: "Voir la Réponse",
    hideAnswer: "Cacher la Réponse",
    contactTitle: "Contactez-Nous",
    contactDesc: "Remplissez le formulaire ci-dessous et nous vous répondrons dans les 24 heures.",
    yourMessage: "Votre Message",
    sendMessage: "Envoyer le Message",
    sending: "Envoi en cours...",
    messageRequired: "Le message est requis",
    messageMin: "Le message doit contenir au moins 10 caractères",
    successContact: "Message envoyé avec succès ! Nous répondrons dans les 24 heures.",
    successContactTitle: "Message Envoyé!",
    successContactDesc: "Merci de nous avoir contactés. Notre équipe vous répondra dans les 24 heures.",
    errorContact: "Échec de l'envoi du message. Veuillez réessayer.",
    errorTitle: "Échec de la Soumission",
    errorDesc: "Quelque chose s'est mal passé. Veuillez réessayer ou nous contacter directement.",
    errorNetwork: "Erreur Réseau",
    errorNetworkDesc: "Veuillez vérifier votre connexion internet et réessayer.",
    tryAgain: "Réessayer",
    close: "Fermer",
    gotIt: "Compris",
    category: "Catégorie",
    categoryOptional: "Catégorie (Optionnel)",
  },
  rw: {
    faq: "Ibibazo Bikunze Kubazwa",
    tagline: "Shakisha ibisubizo kubibazo bikunze kubazwa kuri INYUMBA PROJECT",
    searchPlaceholder: "Shakisha ibisubizo...",
    noResults: "Nta bisubizo byabonetse.",
    clearSearch: "Kuraho ibyashakishijwe",
    categories: "Ibyiciro",
    allCategories: "Ibyiciro Byose",
    general: "Rusange",
    booking: "Icyemezo & Ubwishyu",
    housing: "Amazu & Ibyifatanyije",
    landlord: "Kubatunze Inzu",
    university: "Kubaminuza",
    askQuestion: "Baza Ikibazo",
    askQuestionDesc: "Ufite ikibazo kidahari? Tubaze kandi tuzagusubiza.",
    yourName: "Izina Ryawe",
    yourEmail: "Imeri Yawe",
    yourQuestion: "Ikibazo Kyawe",
    submitQuestion: "Ohereza Ikibazo",
    submitting: "Biremereza...",
    success: "Ikibazo cyawe cyoherejwe neza! Tuzagusubiza vuba.",
    successTitle: "Ikibazo Cyoherejwe!",
    successDesc: "Urakoze kubaza ikibazo. Itsinda ryacu rirazisuzuma kandi rizagusubiza vuba.",
    questionRequired: "Injiza ikibazo cyawe",
    questionMin: "Ikibazo kigomba kuba nibura inyuguti 10",
    emailRequired: "Imeri irasabwa",
    emailInvalid: "Injiza aderesi ya imeri ikwiye",
    nameRequired: "Izina rirasabwa",
    nameMin: "Izina rigomba kuba nibura inyuguti 2",
    stillHaveQuestions: "Ukiri Ikibazo?",
    contactSupport: "Twandikire kugira ngo tugufashe.",
    contactUs: "Twandikire",
    faqs: "FAQ",
    relatedQuestions: "Ibibazo Bisa",
    showAnswer: "Reba Igisubizo",
    hideAnswer: "Hisha Igisubizo",
    contactTitle: "Twandikire",
    contactDesc: "Uzura uru rupapuro maze tuzagusubiza mu masaha 24.",
    yourMessage: "Ubutumwa Bwawe",
    sendMessage: "Ohereza Ubutumwa",
    sending: "Biremereza...",
    messageRequired: "Ubutumwa burasabwa",
    messageMin: "Ubutumwa bugomba kuba nibura inyuguti 10",
    successContact: "Ubutumwa bwoherejwe neza! Tuzagusubiza mu masaha 24.",
    successContactTitle: "Ubutumwa Bwoherejwe!",
    successContactDesc: "Urakoze kutwandikira. Itsinda ryacu rizagusubiza mu masaha 24.",
    errorContact: "Ubutumwa ntabwo bwoherejwe. Ongera ugerageze.",
    errorTitle: "Ntabwo Byagenze Neza",
    errorDesc: "Hari ikintu kitagenze neza. Ongera ugerageze cyangwa utwandikire.",
    errorNetwork: "Ikibazo cy'Umurongo",
    errorNetworkDesc: "Reba ko ufite isaba ry'umurongo hanyuma ugerageze.",
    tryAgain: "Ongera Ugerageze",
    close: "Funga",
    gotIt: "Nabyumvise",
    category: "Icyiciro",
    categoryOptional: "Icyiciro (Ntibisabwa)",
  },
};

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: "general" | "booking" | "housing" | "landlord" | "university";
  icon: React.ReactNode;
}

// Helper function to get language from cookies
const getLanguageFromCookies = (): 'en' | 'fr' | 'rw' => {
  const lang = Cookies.get('language') as 'en' | 'fr' | 'rw';
  return lang || 'en';
};

export const FAQ: React.FC = () => {
  // Get language from cookies
  const [lang, setLang] = useState<'en' | 'fr' | 'rw'>(getLanguageFromCookies());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "general" | "booking" | "housing" | "landlord" | "university"
  >("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  // Success/Error Modal States
  const [successModal, setSuccessModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'question' | 'contact';
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'question'
  });
  
  const [errorModal, setErrorModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    isNetworkError: boolean;
    onRetry?: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    isNetworkError: false,
  });

  // Form state for Ask Question
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    question: "",
    category: "general" as "general" | "house" | "booking" | "payment" | "technical" | "other",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState<boolean | null>(null);
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [isQuestionValid, setIsQuestionValid] = useState<boolean | null>(null);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    question?: string;
  }>({});

  // Form state for Contact
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [isContactFormValid, setIsContactFormValid] = useState(false);
  const [isContactNameValid, setIsContactNameValid] = useState<boolean | null>(null);
  const [isContactEmailValid, setIsContactEmailValid] = useState<boolean | null>(null);
  const [isMessageValid, setIsMessageValid] = useState<boolean | null>(null);
  const [contactErrors, setContactErrors] = useState<{
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

    const interval = setInterval(handleCookieChange, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  // Validate Ask Question form on change
  useEffect(() => {
    const nameValid = formData.name.length >= 2;
    const emailValid = validateEmail(formData.email);
    const questionValid = formData.question.length >= 10;

    setIsNameValid(formData.name.length > 0 ? nameValid : null);
    setIsEmailValid(formData.email.length > 0 ? emailValid : null);
    setIsQuestionValid(formData.question.length > 0 ? questionValid : null);

    const valid = nameValid && emailValid && questionValid;
    setIsFormValid(valid);

    if (nameValid && errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
    if (emailValid && errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
    if (questionValid && errors.question) {
      setErrors((prev) => ({ ...prev, question: undefined }));
    }
  }, [formData.name, formData.email, formData.question]);

  // Validate Contact form on change
  useEffect(() => {
    const nameValid = contactFormData.name.length >= 2;
    const emailValid = validateEmail(contactFormData.email);
    const messageValid = contactFormData.message.length >= 10;

    setIsContactNameValid(contactFormData.name.length > 0 ? nameValid : null);
    setIsContactEmailValid(contactFormData.email.length > 0 ? emailValid : null);
    setIsMessageValid(contactFormData.message.length > 0 ? messageValid : null);

    const valid = nameValid && emailValid && messageValid;
    setIsContactFormValid(valid);

    if (nameValid && contactErrors.name) {
      setContactErrors((prev) => ({ ...prev, name: undefined }));
    }
    if (emailValid && contactErrors.email) {
      setContactErrors((prev) => ({ ...prev, email: undefined }));
    }
    if (messageValid && contactErrors.message) {
      setContactErrors((prev) => ({ ...prev, message: undefined }));
    }
  }, [contactFormData]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContactInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setContactFormData({ ...contactFormData, [name]: value });
  };

  const validateForm = (): boolean => {
    const newErrors: { name?: string; email?: string; question?: string } = {};

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = t.nameMin;
    }

    if (!formData.email) {
      newErrors.email = t.emailRequired;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t.emailInvalid;
    }

    if (!formData.question || formData.question.length < 10) {
      newErrors.question = t.questionMin;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateContactForm = (): boolean => {
    const newErrors: { name?: string; email?: string; message?: string } = {};

    if (!contactFormData.name || contactFormData.name.length < 2) {
      newErrors.name = t.nameMin;
    }

    if (!contactFormData.email) {
      newErrors.email = t.emailRequired;
    } else if (!validateEmail(contactFormData.email)) {
      newErrors.email = t.emailInvalid;
    }

    if (!contactFormData.message || contactFormData.message.length < 10) {
      newErrors.message = t.messageMin;
    }

    setContactErrors(newErrors);
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
      const questionData = {
        name: formData.name,
        email: formData.email,
        question: formData.question,
        category: formData.category || "general",
      };

      const response = await axios.post(QUESTIONS_API_URL, questionData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      });

      if (response.status === 200 || response.status === 201) {
        setFormData({ name: "", email: "", question: "", category: "general" });
        setIsNameValid(null);
        setIsEmailValid(null);
        setIsQuestionValid(null);
        setIsFormValid(false);
        setIsAskModalOpen(false);
        
        // Show success modal
        setSuccessModal({
          isOpen: true,
          title: t.successTitle,
          message: t.successDesc,
          type: 'question'
        });
      } else {
        throw new Error('Failed to submit question');
      }
    } catch (error: any) {
      console.error('Error submitting question:', error);
      
      if (error.response) {
        const errorMessage = error.response.data?.message || 'Failed to submit question. Please try again.';
        setErrorModal({
          isOpen: true,
          title: t.errorTitle,
          message: errorMessage,
          isNetworkError: false,
          onRetry: () => handleSubmit(e),
        });
      } else if (error.request) {
        setErrorModal({
          isOpen: true,
          title: t.errorNetwork,
          message: t.errorNetworkDesc,
          isNetworkError: true,
          onRetry: () => handleSubmit(e),
        });
      } else {
        setErrorModal({
          isOpen: true,
          title: t.errorTitle,
          message: t.errorDesc,
          isNetworkError: false,
          onRetry: () => handleSubmit(e),
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateContactForm()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setIsContactSubmitting(true);

    try {
      const contactData = {
        name: contactFormData.name,
        email: contactFormData.email,
        message: contactFormData.message,
      };

      const response = await axios.post(CONTACT_API_URL, contactData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      });

      if (response.status === 200 || response.status === 201) {
        setContactFormData({ name: "", email: "", message: "" });
        setIsContactNameValid(null);
        setIsContactEmailValid(null);
        setIsMessageValid(null);
        setIsContactFormValid(false);
        setIsContactModalOpen(false);
        
        // Show success modal
        setSuccessModal({
          isOpen: true,
          title: t.successContactTitle,
          message: t.successContactDesc,
          type: 'contact'
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error: any) {
      console.error('Error sending contact message:', error);
      
      if (error.response) {
        const errorMessage = error.response.data?.message || t.errorContact;
        setErrorModal({
          isOpen: true,
          title: t.errorTitle,
          message: errorMessage,
          isNetworkError: false,
          onRetry: () => handleContactSubmit(e),
        });
      } else if (error.request) {
        setErrorModal({
          isOpen: true,
          title: t.errorNetwork,
          message: t.errorNetworkDesc,
          isNetworkError: true,
          onRetry: () => handleContactSubmit(e),
        });
      } else {
        setErrorModal({
          isOpen: true,
          title: t.errorTitle,
          message: t.errorDesc,
          isNetworkError: false,
          onRetry: () => handleContactSubmit(e),
        });
      }
    } finally {
      setIsContactSubmitting(false);
    }
  };

  const faqData: FAQItem[] = [
    // General
    {
      id: 1,
      question: "What is INYUMBA PROJECT?",
      answer:
        "INYUMBA PROJECT is a student housing platform dedicated to connecting university students with verified, safe, and affordable accommodation near their campuses across Rwanda. We make finding a student home simple and stress-free.",
      category: "general",
      icon: <HomeIcon />,
    },
    {
      id: 2,
      question: "How does INYUMBA PROJECT work?",
      answer:
        "Students can search for verified houses near their university, filter by price and amenities, book instantly, and pay securely using MOMO. Landlords can list their properties and manage bookings through our platform. It's a complete solution for student housing.",
      category: "general",
      icon: <HelpOutlineRounded />,
    },
    {
      id: 3,
      question: "Is INYUMBA PROJECT free for students?",
      answer:
        "Yes! INYUMBA PROJECT is completely free for students to search, browse, and book houses. We believe in making student housing accessible to everyone.",
      category: "general",
      icon: <CheckCircleIcon />,
    },
    {
      id: 4,
      question: "How do I create an account?",
      answer:
        'You can create an account by clicking on the "Sign up" button in the top right corner of our website. Fill in your name, email, and password, and you\'re ready to start finding your perfect student home.',
      category: "general",
      icon: <PersonIcon />,
    },

    // Booking & Payment
    {
      id: 5,
      question: "How do I book a house?",
      answer:
        "Once you find a house you like, click on it to view details. Then click the \"Book Now\" button, select your move-in date, and confirm your booking. You'll receive an instant confirmation with the landlord's contact details.",
      category: "booking",
      icon: <PaymentsIcon />,
    },
    {
      id: 6,
      question: "What payment methods are accepted?",
      answer:
        "We accept payments through MOMO (Mobile Money) for secure and convenient transactions. Your payment is protected and only released to the landlord upon your satisfaction.",
      category: "booking",
      icon: <PaymentsIcon />,
    },
    {
      id: 7,
      question: "Is my payment secure?",
      answer:
        "Yes! All payments are processed through secure MOMO integration. Your financial information is protected, and payments are only released to landlords after you confirm your satisfaction with the accommodation.",
      category: "booking",
      icon: <SecurityIcon />,
    },
    {
      id: 8,
      question: "Can I cancel my booking?",
      answer:
        "Cancellation policies vary by landlord. We recommend checking the specific cancellation policy listed on each property before booking. For any issues, our support team is available 24/7 to assist you.",
      category: "booking",
      icon: <SupportAgentIcon />,
    },

    // Housing & Properties
    {
      id: 9,
      question: "How are houses verified?",
      answer:
        "All houses on our platform undergo a thorough verification process. We inspect properties for quality, safety, and comfort. We also verify that the landlord is legitimate and that the property matches the listing description.",
      category: "housing",
      icon: <VerifiedIcon />,
    },
    {
      id: 10,
      question: "What amenities are available?",
      answer:
        "Houses on our platform offer various amenities including WiFi, parking, kitchen facilities, security systems, study areas, and more. You can filter properties by amenities to find exactly what you need.",
      category: "housing",
      icon: <HomeIcon />,
    },
    {
      id: 11,
      question: "Are the houses near universities?",
      answer:
        "Yes! All properties on our platform are located within walking distance or a short commute from major universities. We prioritize locations that are convenient for students.",
      category: "housing",
      icon: <SchoolIcon />,
    },
    {
      id: 12,
      question: "Can I view the house before booking?",
      answer:
        "While we provide detailed photos and descriptions for all properties, we recommend contacting the landlord directly through our platform to arrange a viewing before booking. This ensures you're completely satisfied with your choice.",
      category: "housing",
      icon: <HomeIcon />,
    },

    // For Landlords
    {
      id: 13,
      question: "How do I list my property?",
      answer:
        'To list your property, click on "Become a Host" in the navigation bar. Fill in the details about your property, upload photos, set your price, and submit for verification. Once approved, your property will be visible to students.',
      category: "landlord",
      icon: <HomeIcon />,
    },
    {
      id: 14,
      question: "How much does it cost to list a property?",
      answer:
        "Listing your property on INYUMBA PROJECT is free! We only charge a small commission on successful bookings. This ensures we only make money when you make money.",
      category: "landlord",
      icon: <PaymentsIcon />,
    },
    {
      id: 15,
      question: "How do I manage bookings?",
      answer:
        "You can manage all your bookings through your landlord dashboard. You'll receive real-time notifications when a student books your property, and you can track payments, communicate with students, and manage your listings all in one place.",
      category: "landlord",
      icon: <SupportAgentIcon />,
    },
    {
      id: 16,
      question: "How do I get paid?",
      answer:
        "Payments are processed through MOMO and are released to you after the student confirms they are satisfied with the accommodation. You'll receive payment notifications and can track all transactions in your dashboard.",
      category: "landlord",
      icon: <PaymentsIcon />,
    },

    // For Universities
    {
      id: 17,
      question: "Can universities partner with INYUMBA PROJECT?",
      answer:
        "Yes! We welcome partnerships with universities to provide verified housing options for their students. Partner universities get access to exclusive housing options and priority support for their students.",
      category: "university",
      icon: <SchoolIcon />,
    },
    {
      id: 18,
      question: "What benefits do partner universities receive?",
      answer:
        "Partner universities receive dedicated support, verified housing options for their students, priority listings, and regular reports on housing availability. We work together to ensure students have access to safe and affordable accommodation.",
      category: "university",
      icon: <VerifiedIcon />,
    },
    {
      id: 19,
      question: "How can my university join?",
      answer:
        'Contact our team through the "Contact Us" section or email us directly at inyumba@yahoo.fr. We\'ll schedule a meeting to discuss partnership opportunities and how we can support your students.',
      category: "university",
      icon: <SupportAgentIcon />,
    },
  ];

  const categories = [
    { id: "all", label: t.allCategories, icon: <AutoAwesomeIcon /> },
    { id: "general", label: t.general, icon: <HelpOutlineRounded /> },
    { id: "booking", label: t.booking, icon: <PaymentsIcon /> },
    { id: "housing", label: t.housing, icon: <HomeIcon /> },
    { id: "landlord", label: t.landlord, icon: <VerifiedIcon /> },
    { id: "university", label: t.university, icon: <SchoolIcon /> },
  ];

  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "general":
        return <HelpOutlineRounded />;
      case "booking":
        return <PaymentsIcon />;
      case "housing":
        return <HomeIcon />;
      case "landlord":
        return <VerifiedIcon />;
      case "university":
        return <SchoolIcon />;
      default:
        return <HelpOutlineRounded />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "general":
        return "bg-blue-100 text-blue-600";
      case "booking":
        return "bg-green-100 text-green-600";
      case "housing":
        return "bg-purple-100 text-purple-600";
      case "landlord":
        return "bg-orange-100 text-orange-600";
      case "university":
        return "bg-pink-100 text-pink-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
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
                <QuestionAnswerIcon className="w-4 h-4" />
                {t.faqs}
              </span>
            </motion.div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {t.faq}
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

      {/* Search & Filter Section */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
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

            {/* Ask Question Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsAskModalOpen(true)}
              className="px-6 py-3 bg-[#FF385C] text-white rounded-xl font-medium hover:bg-[#E31C5F] transition-colors shadow-lg shadow-[#FF385C]/30 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <QuestionAnswerIcon className="w-5 h-5" />
              {t.askQuestion}
            </motion.button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id as any)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
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

      {/* FAQ List */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <HelpOutlineRounded className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700">
                {t.noResults}
              </h3>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-4 text-[#FF385C] font-medium hover:underline"
              >
                {t.clearSearch}
              </button>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${getCategoryColor(faq.category)}`}
                      >
                        {getCategoryIcon(faq.category)}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900">
                            {faq.question}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(faq.category)}`}
                          >
                            {faq.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0 text-gray-400">
                      {expandedId === faq.id ? (
                        <ExpandLessIcon className="w-6 h-6" />
                      ) : (
                        <ExpandMoreIcon className="w-6 h-6" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedId === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4 pt-1 border-t border-gray-100">
                          <div className="flex items-start gap-3">
                            <div className="w-10 flex-shrink-0">
                              <div className="w-8 h-8 bg-[#FF385C]/10 rounded-full flex items-center justify-center text-[#FF385C]">
                                <CheckCircleIcon className="w-4 h-4" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-600 leading-relaxed">
                                {faq.answer}
                              </p>
                              <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                                <span>{t.relatedQuestions}</span>
                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                <button
                                  onClick={() => setIsAskModalOpen(true)}
                                  className="text-[#FF385C] hover:underline"
                                >
                                  {t.askQuestion}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-[#FF385C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChatIcon className="w-8 h-8 text-[#FF385C]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              {t.stillHaveQuestions}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              {t.contactSupport}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAskModalOpen(true)}
                className="px-6 py-3 bg-[#FF385C] text-white rounded-xl font-medium hover:bg-[#E31C5F] transition-colors shadow-lg shadow-[#FF385C]/30 flex items-center gap-2"
              >
                <QuestionAnswerIcon className="w-5 h-5" />
                {t.askQuestion}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsContactModalOpen(true)}
                className="px-6 py-3 border-2 border-[#FF385C] text-[#FF385C] rounded-xl font-medium hover:bg-[#FF385C] hover:text-white transition-colors flex items-center gap-2"
              >
                <EmailIcon className="w-5 h-5" />
                {t.contactUs}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ask Question Modal */}
      <AnimatePresence>
        {isAskModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
              onClick={() => setIsAskModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-2 xs:inset-4 z-[201] flex items-center justify-center"
            >
              <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl">
                <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-[#FF385C]/10 rounded-full flex items-center justify-center text-[#FF385C]">
                      <QuestionAnswerIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {t.askQuestion}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {t.askQuestionDesc}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsAskModalOpen(false)}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <CloseIcon className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    noValidate
                  >
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.yourName}
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

                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.yourEmail}
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
                          ✓ Valid email
                        </p>
                      )}
                    </div>

                    {/* Category Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.categoryOptional}
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] focus:ring-1 focus:ring-[#FF385C] transition-colors text-sm"
                      >
                        <option value="general">General</option>
                        <option value="house">House</option>
                        <option value="booking">Booking</option>
                        <option value="payment">Payment</option>
                        <option value="technical">Technical</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Question Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.yourQuestion}
                      </label>
                      <div className="relative">
                        <textarea
                          name="question"
                          value={formData.question}
                          onChange={handleInputChange}
                          rows={4}
                          className={`w-full px-4 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-1 transition-colors text-sm resize-none ${
                            isQuestionValid === true
                              ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                              : isQuestionValid === false
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:border-[#FF385C] focus:ring-[#FF385C]"
                          }`}
                          placeholder="Type your question here..."
                        />
                        <div className="absolute right-3 top-3">
                          {isQuestionValid === true && (
                            <CheckCircleIcon className="w-5 h-5 text-green-500" />
                          )}
                          {isQuestionValid === false && (
                            <CancelIcon className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                      </div>
                      {errors.question && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.question}
                        </p>
                      )}
                      {isQuestionValid === true && (
                        <p className="text-xs text-green-500 mt-1">
                          ✓ Valid question
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        {formData.question.length}/10 characters minimum
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
                          {t.submitQuestion}
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

      {/* Contact Modal */}
      <AnimatePresence>
        {isContactModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[600]"
              onClick={() => setIsContactModalOpen(false)}
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
                      <EmailIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg xs:text-xl font-bold text-gray-900">
                        {t.contactTitle}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {t.contactDesc}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsContactModalOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <CloseIcon className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-4 xs:p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                  <form onSubmit={handleContactSubmit} className="space-y-4" noValidate>
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
                          value={contactFormData.name}
                          onChange={handleContactInputChange}
                          className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-1 transition-colors text-sm ${
                            isContactNameValid === true
                              ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                              : isContactNameValid === false
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:border-[#FF385C] focus:ring-[#FF385C]"
                          }`}
                          placeholder="John Doe"
                        />
                        {isContactNameValid === true && (
                          <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                        {isContactNameValid === false && (
                          <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                        )}
                      </div>
                      {contactErrors.name && (
                        <p className="text-xs text-red-500 mt-1">{contactErrors.name}</p>
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
                          value={contactFormData.email}
                          onChange={handleContactInputChange}
                          className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-1 transition-colors text-sm ${
                            isContactEmailValid === true
                              ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                              : isContactEmailValid === false
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:border-[#FF385C] focus:ring-[#FF385C]"
                          }`}
                          placeholder="you@example.com"
                        />
                        {isContactEmailValid === true && (
                          <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                        {isContactEmailValid === false && (
                          <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                        )}
                      </div>
                      {contactErrors.email && (
                        <p className="text-xs text-red-500 mt-1">{contactErrors.email}</p>
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
                          value={contactFormData.message}
                          onChange={handleContactInputChange}
                          rows={4}
                          className={`w-full pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-1 transition-colors text-sm resize-none px-4 ${
                            isMessageValid === true
                              ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                              : isMessageValid === false
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:border-[#FF385C] focus:ring-[#FF385C]"
                          }`}
                          placeholder="Describe your inquiry or request in detail..."
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
                      {contactErrors.message && (
                        <p className="text-xs text-red-500 mt-1">{contactErrors.message}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        {contactFormData.message.length}/10 characters minimum
                      </p>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      whileHover={{ scale: isContactFormValid ? 1.02 : 1 }}
                      whileTap={{ scale: isContactFormValid ? 0.98 : 1 }}
                      type="submit"
                      disabled={!isContactFormValid || isContactSubmitting}
                      className={`w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                        isContactFormValid && !isContactSubmitting
                          ? "bg-[#FF385C] text-white hover:bg-[#E31C5F] shadow-lg shadow-[#FF385C]/30 cursor-pointer"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {isContactSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {t.sending}
                        </>
                      ) : (
                        <>
                          <SendIcon className="w-5 h-5" />
                          {t.sendMessage}
                        </>
                      )}
                    </motion.button>

                    {!isContactFormValid &&
                      Object.keys(contactFormData).some(
                        (key) => contactFormData[key as keyof typeof contactFormData].length > 0,
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
        {successModal.isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[800]"
              onClick={() => setSuccessModal({ ...successModal, isOpen: false })}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-2 xs:inset-4 z-[801] flex items-center justify-center"
            >
              <div className="bg-white rounded-2xl w-full max-w-md p-6 xs:p-8 shadow-2xl">
                <div className="text-center">
                  {/* Success Icon */}
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ThumbUpIcon className="w-10 h-10 text-green-600" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {successModal.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    {successModal.message}
                  </p>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSuccessModal({ ...successModal, isOpen: false })}
                    className="w-full py-3 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors shadow-lg shadow-[#FF385C]/30"
                  >
                    {t.gotIt}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Error Modal */}
      <AnimatePresence>
        {errorModal.isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[800]"
              onClick={() => setErrorModal({ ...errorModal, isOpen: false })}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-2 xs:inset-4 z-[801] flex items-center justify-center"
            >
              <div className="bg-white rounded-2xl w-full max-w-md p-6 xs:p-8 shadow-2xl">
                <div className="text-center">
                  {/* Error Icon */}
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    errorModal.isNetworkError ? 'bg-yellow-100' : 'bg-red-100'
                  }`}>
                    <ErrorIcon className={`w-10 h-10 ${
                      errorModal.isNetworkError ? 'text-yellow-600' : 'text-red-600'
                    }`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {errorModal.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    {errorModal.message}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    {errorModal.onRetry && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setErrorModal({ ...errorModal, isOpen: false });
                          if (errorModal.onRetry) {
                            errorModal.onRetry();
                          }
                        }}
                        className="flex-1 py-3 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors shadow-lg shadow-[#FF385C]/30"
                      >
                        {t.tryAgain}
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setErrorModal({ ...errorModal, isOpen: false })}
                      className={`flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors ${
                        !errorModal.onRetry ? 'w-full' : ''
                      }`}
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
    </div>
  );
};