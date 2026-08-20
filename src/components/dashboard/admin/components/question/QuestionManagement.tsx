// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-hooks/set-state-in-effect */
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Cookies from "js-cookie";
// import axios from "axios";

// // Material-UI Icons
// import { HelpOutlineRounded } from "@mui/icons-material";
// import CloseIcon from "@mui/icons-material/Close";
// import SearchIcon from "@mui/icons-material/Search";
// import RefreshIcon from "@mui/icons-material/Refresh";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import ClearIcon from "@mui/icons-material/Clear";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ReplyIcon from "@mui/icons-material/Reply";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import PersonIcon from "@mui/icons-material/Person";
// import EmailIcon from "@mui/icons-material/Email";
// import PhoneIcon from "@mui/icons-material/Phone";
// import SendIcon from "@mui/icons-material/Send";
// import WarningAmberIcon from "@mui/icons-material/WarningAmber";
// import { CheckCircleOutlineOutlined } from "@mui/icons-material";

// // ============================================================
// // TRANSLATION HELPER - Google Translate API
// // ============================================================

// const translateContent = async (
//   text: string,
//   targetLang: string,
// ): Promise<string> => {
//   if (!text || targetLang === "en") return text;
//   if (targetLang === "rw" || targetLang === "fr") {
//     try {
//       const response = await axios.post(
//         `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`,
//       );
//       if (response.data && response.data[0] && response.data[0][0]) {
//         return response.data[0][0][0] || text;
//       }
//       return text;
//     } catch (error) {
//       console.error("Translation error for text:", text, error);
//       return text;
//     }
//   }
//   return text;
// };

// // Types based on the Question model
// interface Question {
//   _id: string;
//   userId: string | null;
//   name: string;
//   email: string;
//   phone: string | null;
//   question: string;
//   category: "general" | "house" | "booking" | "payment" | "technical" | "other";
//   status: "pending" | "answered" | "replied" | "archived";
//   priority: "low" | "normal" | "high" | "urgent";
//   replyMessage: string | null;
//   repliedAt: Date | null;
//   repliedBy: string | null;
//   ipAddress: string | null;
//   userAgent: string | null;
//   readAt: Date | null;
//   isActive: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// // Extended type for UI purposes
// interface QuestionUI extends Question {
//   statusLabel: string;
//   statusColor: string;
//   priorityLabel: string;
//   priorityColor: string;
//   categoryLabel: string;
//   formattedDate: string;
//   timeAgo: string;
// }

// // Form validation errors interface
// interface FormErrors {
//   name?: string;
//   email?: string;
//   question?: string;
//   category?: string;
//   priority?: string;
//   status?: string;
//   replyMessage?: string;
// }

// // Translations
// const translations = {
//   en: {
//     questionManagement: "Question Management",
//     manageQuestions: "Manage questions from users and guests",
//     total: "Total",
//     pending: "Pending",
//     answered: "Answered",
//     replied: "Replied",
//     archived: "Archived",
//     searchQuestions: "Search by name, email, or question content...",
//     allStatus: "All Status",
//     allCategories: "All Categories",
//     allPriorities: "All Priorities",
//     question: "Question",
//     from: "From",
//     category: "Category",
//     status: "Status",
//     priority: "Priority",
//     date: "Date",
//     actions: "Actions",
//     noQuestions: "No questions found",
//     adjustFilters: "Try adjusting your search or filters",
//     showing: "Showing",
//     of: "of",
//     questions: "questions",
//     viewQuestion: "View Question",
//     editQuestion: "Edit Question",
//     questionDetails: "Question Details",
//     userInformation: "User Information",
//     questionContent: "Question Content",
//     reply: "Reply",
//     updateStatus: "Update Status",
//     selectStatus: "Select Status",
//     selectCategory: "Select Category",
//     selectPriority: "Select Priority",
//     close: "Close",
//     loading: "Loading...",
//     fetchError: "Failed to load questions",
//     deleteQuestion: "Delete Question",
//     deleteConfirmation: "Are you sure you want to delete this question?",
//     replyToQuestion: "Reply to Question",
//     replyConfirmation: "Are you sure you want to send this reply?",
//     sendReply: "Send Reply",
//     replySent: "Reply sent successfully!",
//     replyFailed: "Failed to send reply",
//     questionDeleted: "Question deleted successfully!",
//     deleteFailed: "Failed to delete question",
//     statusUpdated: "Status updated successfully!",
//     statusUpdateFailed: "Failed to update status",
//     priorityUpdated: "Priority updated successfully!",
//     priorityUpdateFailed: "Failed to update priority",
//     name: "Name",
//     email: "Email",
//     phone: "Phone",
//     questionText: "Question",
//     replyMessage: "Reply Message",
//     enterReply: "Enter your reply message...",
//     ipAddress: "IP Address",
//     userAgent: "User Agent",
//     createdAt: "Created At",
//     updatedAt: "Updated At",
//     readAt: "Read At",
//     repliedAt: "Replied At",
//     required: "This field is required",
//     validationError: "Please fix all validation errors",
//     cancel: "Cancel",
//     save: "Save",
//     saving: "Saving...",
//     delete: "Delete",
//     confirmDelete: "Confirm Delete",
//     categories: {
//       general: "General",
//       house: "House",
//       booking: "Booking",
//       payment: "Payment",
//       technical: "Technical",
//       other: "Other",
//     },
//     statuses: {
//       pending: "Pending",
//       answered: "Answered",
//       replied: "Replied",
//       archived: "Archived",
//     },
//     priorities: {
//       low: "Low",
//       normal: "Normal",
//       high: "High",
//       urgent: "Urgent",
//     },
//     filters: {
//       all: "All",
//       pending: "Pending",
//       answered: "Answered",
//       replied: "Replied",
//       archived: "Archived",
//     },
//     success: "Success",
//     confirmation: "Confirmation",
//     confirm: "Confirm",
//     markAsAnswered: "Mark as Answered",
//     markAsArchived: "Mark as Archived",
//     markAsReplied: "Mark as Replied",
//     noQuestionsFound: "No questions found",
//     failed: "Failed",
//   },
//   fr: {
//     questionManagement: "Gestion des Questions",
//     manageQuestions: "Gérer les questions des utilisateurs et invités",
//     total: "Total",
//     pending: "En Attente",
//     answered: "Répondu",
//     replied: "Répondu",
//     archived: "Archivé",
//     searchQuestions: "Rechercher par nom, email ou contenu...",
//     allStatus: "Tous les Statuts",
//     allCategories: "Toutes les Catégories",
//     allPriorities: "Toutes les Priorités",
//     question: "Question",
//     from: "De",
//     category: "Catégorie",
//     status: "Statut",
//     priority: "Priorité",
//     date: "Date",
//     actions: "Actions",
//     noQuestions: "Aucune question trouvée",
//     adjustFilters: "Essayez d'ajuster votre recherche ou vos filtres",
//     showing: "Affichage",
//     of: "de",
//     questions: "questions",
//     viewQuestion: "Voir la Question",
//     editQuestion: "Modifier la Question",
//     questionDetails: "Détails de la Question",
//     userInformation: "Informations de l'Utilisateur",
//     questionContent: "Contenu de la Question",
//     reply: "Répondre",
//     updateStatus: "Mettre à Jour le Statut",
//     selectStatus: "Sélectionner le Statut",
//     selectCategory: "Sélectionner la Catégorie",
//     selectPriority: "Sélectionner la Priorité",
//     close: "Fermer",
//     loading: "Chargement...",
//     fetchError: "Échec du chargement des questions",
//     deleteQuestion: "Supprimer la Question",
//     deleteConfirmation: "Êtes-vous sûr de vouloir supprimer cette question ?",
//     replyToQuestion: "Répondre à la Question",
//     replyConfirmation: "Êtes-vous sûr de vouloir envoyer cette réponse ?",
//     sendReply: "Envoyer la Réponse",
//     replySent: "Réponse envoyée avec succès !",
//     replyFailed: "Échec de l'envoi de la réponse",
//     questionDeleted: "Question supprimée avec succès !",
//     deleteFailed: "Échec de la suppression de la question",
//     statusUpdated: "Statut mis à jour avec succès !",
//     statusUpdateFailed: "Échec de la mise à jour du statut",
//     priorityUpdated: "Priorité mise à jour avec succès !",
//     priorityUpdateFailed: "Échec de la mise à jour de la priorité",
//     name: "Nom",
//     email: "Email",
//     phone: "Téléphone",
//     questionText: "Question",
//     replyMessage: "Message de Réponse",
//     enterReply: "Entrez votre message de réponse...",
//     ipAddress: "Adresse IP",
//     userAgent: "Agent Utilisateur",
//     createdAt: "Créé le",
//     updatedAt: "Mis à jour le",
//     readAt: "Lu le",
//     repliedAt: "Répondu le",
//     required: "Ce champ est requis",
//     validationError: "Veuillez corriger toutes les erreurs de validation",
//     cancel: "Annuler",
//     save: "Enregistrer",
//     saving: "Enregistrement...",
//     delete: "Supprimer",
//     confirmDelete: "Confirmer la Suppression",
//     categories: {
//       general: "Général",
//       house: "Logement",
//       booking: "Réservation",
//       payment: "Paiement",
//       technical: "Technique",
//       other: "Autre",
//     },
//     statuses: {
//       pending: "En Attente",
//       answered: "Répondu",
//       replied: "Répondu",
//       archived: "Archivé",
//     },
//     priorities: {
//       low: "Basse",
//       normal: "Normale",
//       high: "Élevée",
//       urgent: "Urgente",
//     },
//     filters: {
//       all: "Tous",
//       pending: "En Attente",
//       answered: "Répondu",
//       replied: "Répondu",
//       archived: "Archivé",
//     },
//     success: "Succès",
//     confirmation: "Confirmation",
//     confirm: "Confirmer",
//     markAsAnswered: "Marquer comme Répondu",
//     markAsArchived: "Marquer comme Archivé",
//     markAsReplied: "Marquer comme Répondu",
//     noQuestionsFound: "Aucune question trouvée",
//     failed: "Échoué",
//   },
//   rw: {
//     questionManagement: "Gucunga Ibibazo",
//     manageQuestions: "Gucunga ibibazo by'abakoresha n'abashyitsi",
//     total: "Yose",
//     pending: "Bitegereje",
//     answered: "Byasubijwe",
//     replied: "Byasubijwe",
//     archived: "Byabikwa",
//     searchQuestions: "Shakisha ukurikije izina, imeri cyangwa ibibazo...",
//     allStatus: "Ihagaze Ryose",
//     allCategories: "Ubwoko Bwose",
//     allPriorities: "Iby'ibanze Byose",
//     question: "Ikibazo",
//     from: "Kuva",
//     category: "Ubwoko",
//     status: "Ihagaze",
//     priority: "Iby'ibanze",
//     date: "Itariki",
//     actions: "Ibikorwa",
//     noQuestions: "Nta kibazo cyabonetse",
//     adjustFilters: "Gerageza guhindura uburyo ushakisha cyangwa amatungo",
//     showing: "Bereka",
//     of: "muri",
//     questions: "ibibazo",
//     viewQuestion: "Reba Ikibazo",
//     editQuestion: "Hindura Ikibazo",
//     questionDetails: "Ibisobanuro by'Ikibazo",
//     userInformation: "Amakuru y'Umukoresha",
//     questionContent: "Ibiri mu Kibazo",
//     reply: "Kubasubiza",
//     updateStatus: "Vugurura Ihagaze",
//     selectStatus: "Hitamo Ihagaze",
//     selectCategory: "Hitamo Ubwoko",
//     selectPriority: "Hitamo Iby'ibanze",
//     close: "Funga",
//     loading: "Birakoreshwa...",
//     fetchError: "Kubura ibibazo byananiranye",
//     deleteQuestion: "Gukuraho Ikibazo",
//     deleteConfirmation: "Uri kwizera ko ushaka gukuraho iki kibazo?",
//     replyToQuestion: "Kubasubiza Ikibazo",
//     replyConfirmation: "Uri kwizera ko ushaka kohereza igisubizo?",
//     sendReply: "Kohereza Igisubizo",
//     replySent: "Igisubizo cyoherejwe neza!",
//     replyFailed: "Kohereza igisubizo byananiranye",
//     questionDeleted: "Ikibazo gikuvweho neza!",
//     deleteFailed: "Gukuraho ikibazo byananiranye",
//     statusUpdated: "Ihagaze ry'ikibazo ryavuguruwe neza!",
//     statusUpdateFailed: "Kuvugurura ihagaze byananiranye",
//     priorityUpdated: "Iby'ibanze byavuguruwe neza!",
//     priorityUpdateFailed: "Kuvugurura iby'ibanze byananiranye",
//     name: "Izina",
//     email: "Imeri",
//     phone: "Telefone",
//     questionText: "Ikibazo",
//     replyMessage: "Ubutumwa bw'Igisubizo",
//     enterReply: "Andika ubutumwa bw'igisubizo...",
//     ipAddress: "Adresi ya IP",
//     userAgent: "Agent y'Umukoresha",
//     createdAt: "Byakozwe",
//     updatedAt: "Byavuguruwe",
//     readAt: "Byasomwe",
//     repliedAt: "Byasubijwe",
//     required: "Iki gikurikira kirakenewe",
//     validationError: "Kosora amakosa yose yo kwemeza",
//     cancel: "Reka",
//     save: "Bika",
//     saving: "Birabikwa...",
//     delete: "Gukuraho",
//     confirmDelete: "Emeza Gukuraho",
//     categories: {
//       general: "Rusange",
//       house: "Inzu",
//       booking: "Icyanditswe",
//       payment: "Amahoro",
//       technical: "Ubuhanga",
//       other: "Ikindi",
//     },
//     statuses: {
//       pending: "Bitegereje",
//       answered: "Byasubijwe",
//       replied: "Byasubijwe",
//       archived: "Byabikwa",
//     },
//     priorities: {
//       low: "Ntacyo",
//       normal: "Nk'ukwe",
//       high: "Cyane",
//       urgent: "Byihuse",
//     },
//     filters: {
//       all: "Yose",
//       pending: "Bitegereje",
//       answered: "Byasubijwe",
//       replied: "Byasubijwe",
//       archived: "Byabikwa",
//     },
//     success: "Byagenze Neza",
//     confirmation: "Kwemeza",
//     confirm: "Emeza",
//     markAsAnswered: "Shyira ku Byasubijwe",
//     markAsArchived: "Shyira ku Byabikwa",
//     markAsReplied: "Shyira ku Byasubijwe",
//     noQuestionsFound: "Nta kibazo cyabonetse",
//     failed: "Byananiranye",
//   },
// };

// // Helper function to get language from cookies
// const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
//   const lang = Cookies.get("language") as "en" | "fr" | "rw";
//   return lang || "en";
// };

// // Helper function to get token from localStorage
// const getToken = (): string => {
//   try {
//     return localStorage.getItem("token") || "";
//   } catch (error) {
//     console.error("Error reading token from localStorage:", error);
//     return "";
//   }
// };

// // Helper function to get user from localStorage
// const getUser = (): {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
// } | null => {
//   try {
//     const userStr = localStorage.getItem("user");
//     if (userStr) {
//       return JSON.parse(userStr);
//     }
//     return null;
//   } catch (error) {
//     console.error("Error reading user from localStorage:", error);
//     return null;
//   }
// };

// // API Base URL
// const API_BASE_URL = "https://rene-inyumba-nodejs.onrender.com";

// // Axios instance with interceptors
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Add request interceptor for authentication
// api.interceptors.request.use(
//   (config) => {
//     const token = getToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// // Helper function to transform question to UI format
// const transformQuestionToUI = (question: Question): QuestionUI => {
//   const statusColors: Record<string, string> = {
//     pending: "bg-yellow-100 text-yellow-800",
//     answered: "bg-green-100 text-green-800",
//     replied: "bg-blue-100 text-blue-800",
//     archived: "bg-gray-100 text-gray-800",
//   };

//   const statusLabels: Record<string, string> = {
//     pending: "Pending",
//     answered: "Answered",
//     replied: "Replied",
//     archived: "Archived",
//   };

//   const priorityColors: Record<string, string> = {
//     low: "bg-gray-100 text-gray-600",
//     normal: "bg-blue-100 text-blue-600",
//     high: "bg-orange-100 text-orange-600",
//     urgent: "bg-red-100 text-red-600",
//   };

//   const priorityLabels: Record<string, string> = {
//     low: "Low",
//     normal: "Normal",
//     high: "High",
//     urgent: "Urgent",
//   };

//   const categoryLabels: Record<string, string> = {
//     general: "General",
//     house: "House",
//     booking: "Booking",
//     payment: "Payment",
//     technical: "Technical",
//     other: "Other",
//   };

//   const formatDate = (dateString: string): string => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const getTimeAgo = (dateString: string): string => {
//     const diff = Date.now() - new Date(dateString).getTime();
//     const minutes = Math.floor(diff / 60000);
//     const hours = Math.floor(diff / 3600000);
//     const days = Math.floor(diff / 86400000);
//     const weeks = Math.floor(diff / 604800000);

//     if (minutes < 1) return "Just now";
//     if (minutes < 60) return `${minutes}m ago`;
//     if (hours < 24) return `${hours}h ago`;
//     if (days < 7) return `${days}d ago`;
//     return `${weeks}w ago`;
//   };

//   return {
//     ...question,
//     statusLabel: statusLabels[question.status] || question.status,
//     statusColor: statusColors[question.status] || "bg-gray-100 text-gray-800",
//     priorityLabel: priorityLabels[question.priority] || question.priority,
//     priorityColor:
//       priorityColors[question.priority] || "bg-gray-100 text-gray-600",
//     categoryLabel: categoryLabels[question.category] || question.category,
//     formattedDate: formatDate(question.createdAt),
//     timeAgo: getTimeAgo(question.createdAt),
//   };
// };

// export const QuestionManagement: React.FC = () => {
//   // Get language from cookies
//   const [lang, setLang] = useState<"en" | "fr" | "rw">(
//     getLanguageFromCookies(),
//   );
//   const [questions, setQuestions] = useState<QuestionUI[]>([]);
//   const [filteredQuestions, setFilteredQuestions] = useState<QuestionUI[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState<string>("all");
//   const [filterCategory, setFilterCategory] = useState<string>("all");
//   const [filterPriority, setFilterPriority] = useState<string>("all");
//   const [isFetching, setIsFetching] = useState(true);

//   // Modal states
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
//   const [selectedQuestion, setSelectedQuestion] = useState<QuestionUI | null>(
//     null,
//   );

//   // Confirmation Modal states
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
//   const [statusModalData, setStatusModalData] = useState<{
//     type: "success" | "error";
//     title: string;
//     message: string;
//     details?: string;
//   }>({
//     type: "success",
//     title: "",
//     message: "",
//     details: "",
//   });

//   // Edit form state
//   const [editFormData, setEditFormData] = useState<Partial<Question>>({
//     status: "pending",
//     priority: "normal",
//     category: "general",
//   });

//   // Reply form state
//   const [replyMessage, setReplyMessage] = useState("");

//   const [formErrors, setFormErrors] = useState<FormErrors>({});
//   const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

//   // Loading states
//   const [isLoading] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Statistics
//   const [stats, setStats] = useState({
//     total: 0,
//     pending: 0,
//     answered: 0,
//     replied: 0,
//     archived: 0,
//   });

//   const t = translations[lang];

//   // Show status modal
//   const showStatusModal = (
//     type: "success" | "error",
//     title: string,
//     message: string,
//     details?: string,
//   ) => {
//     setStatusModalData({ type, title, message, details });
//     setIsStatusModalOpen(true);
//   };

//   // Fetch questions from API with translation
//   const fetchQuestions = async () => {
//     setIsFetching(true);
//     try {
//       const response = await api.get("/questions");

//       let questionsData: Question[] = [];
//       const result = response.data;

//       if (result.success && Array.isArray(result.data)) {
//         questionsData = result.data;
//       } else if (Array.isArray(result)) {
//         questionsData = result;
//       } else if (result.data && Array.isArray(result.data)) {
//         questionsData = result.data;
//       } else if (result.questions && Array.isArray(result.questions)) {
//         questionsData = result.questions;
//       }

//       // Translate question data if language is not English
//       let processedQuestions = questionsData;
//       if (lang !== "en") {
//         console.log(
//           `Translating ${questionsData.length} questions to ${lang}...`,
//         );
//         const translatedQuestions = [];
//         for (const question of questionsData) {
//           try {
//             const translatedQuestion = {
//               ...question,
//               name: await translateContent(question.name, lang),
//               question: await translateContent(question.question, lang),
//               replyMessage: question.replyMessage
//                 ? await translateContent(question.replyMessage, lang)
//                 : null,
//             };
//             translatedQuestions.push(translatedQuestion);
//           } catch (err) {
//             console.error("Error translating question:", question._id, err);
//             translatedQuestions.push(question);
//           }
//         }
//         processedQuestions = translatedQuestions;
//         console.log("Translated questions count:", processedQuestions.length);
//       }

//       const transformedQuestions = processedQuestions.map(
//         (question: Question) => transformQuestionToUI(question),
//       );
//       setQuestions(transformedQuestions);
//       setFilteredQuestions(transformedQuestions);
//     } catch (error) {
//       console.error("Error fetching questions:", error);
//       showStatusModal("error", t.fetchError, "Failed to load questions");
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   // Validate edit form
//   const validateEditForm = (): boolean => {
//     const errors: FormErrors = {};
//     let isValid = true;

//     if (!editFormData.status) {
//       errors.status = t.required;
//       isValid = false;
//     }

//     if (!editFormData.priority) {
//       errors.priority = t.required;
//       isValid = false;
//     }

//     if (!editFormData.category) {
//       errors.category = t.required;
//       isValid = false;
//     }

//     setFormErrors(errors);
//     return isValid;
//   };

//   // Validate reply form
//   const validateReplyForm = (): boolean => {
//     const errors: FormErrors = {};
//     let isValid = true;

//     if (!replyMessage || replyMessage.trim().length < 3) {
//       errors.replyMessage = t.required;
//       isValid = false;
//     }

//     setFormErrors(errors);
//     return isValid;
//   };

//   // Handle edit form field changes
//   const handleEditFormChange = (field: keyof Question, value: any) => {
//     setEditFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));

//     setTouchedFields((prev) => new Set(prev).add(field));
//   };

//   // Handle edit form blur
//   const handleEditFormBlur = (field: string) => {
//     setTouchedFields((prev) => new Set(prev).add(field));
//     validateEditForm();
//   };

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

//   // Initial fetch
//   useEffect(() => {
//     fetchQuestions();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [lang]);

//   // Filter questions
//   useEffect(() => {
//     let filtered = [...questions];

//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       filtered = filtered.filter(
//         (question) =>
//           question.name.toLowerCase().includes(term) ||
//           question.email.toLowerCase().includes(term) ||
//           question.question.toLowerCase().includes(term) ||
//           question._id.toLowerCase().includes(term),
//       );
//     }

//     if (filterStatus !== "all") {
//       filtered = filtered.filter(
//         (question) => question.status === filterStatus,
//       );
//     }

//     if (filterCategory !== "all") {
//       filtered = filtered.filter(
//         (question) => question.category === filterCategory,
//       );
//     }

//     if (filterPriority !== "all") {
//       filtered = filtered.filter(
//         (question) => question.priority === filterPriority,
//       );
//     }

//     setFilteredQuestions(filtered);
//   }, [questions, searchTerm, filterStatus, filterCategory, filterPriority]);

//   // Update statistics
//   useEffect(() => {
//     const total = questions.length;
//     const pending = questions.filter((q) => q.status === "pending").length;
//     const answered = questions.filter((q) => q.status === "answered").length;
//     const replied = questions.filter((q) => q.status === "replied").length;
//     const archived = questions.filter((q) => q.status === "archived").length;

//     setStats({ total, pending, answered, replied, archived });
//   }, [questions]);

//   // Get status badge color
//   const getStatusColor = (status: string): string => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-100 text-yellow-800";
//       case "answered":
//         return "bg-green-100 text-green-800";
//       case "replied":
//         return "bg-blue-100 text-blue-800";
//       case "archived":
//         return "bg-gray-100 text-gray-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   // Get status label
//   const getStatusLabel = (status: string): string => {
//     switch (status) {
//       case "pending":
//         return t.statuses.pending;
//       case "answered":
//         return t.statuses.answered;
//       case "replied":
//         return t.statuses.replied;
//       case "archived":
//         return t.statuses.archived;
//       default:
//         return status;
//     }
//   };

//   // Get priority color
//   const getPriorityColor = (priority: string): string => {
//     switch (priority) {
//       case "low":
//         return "bg-gray-100 text-gray-600";
//       case "normal":
//         return "bg-blue-100 text-blue-600";
//       case "high":
//         return "bg-orange-100 text-orange-600";
//       case "urgent":
//         return "bg-red-100 text-red-600";
//       default:
//         return "bg-gray-100 text-gray-600";
//     }
//   };

//   // Get priority label
//   const getPriorityLabel = (priority: string): string => {
//     switch (priority) {
//       case "low":
//         return t.priorities.low;
//       case "normal":
//         return t.priorities.normal;
//       case "high":
//         return t.priorities.high;
//       case "urgent":
//         return t.priorities.urgent;
//       default:
//         return priority;
//     }
//   };

//   // Get category label
//   const getCategoryLabel = (category: string): string => {
//     switch (category) {
//       case "general":
//         return t.categories.general;
//       case "house":
//         return t.categories.house;
//       case "booking":
//         return t.categories.booking;
//       case "payment":
//         return t.categories.payment;
//       case "technical":
//         return t.categories.technical;
//       case "other":
//         return t.categories.other;
//       default:
//         return category;
//     }
//   };

//   // Format date
//   const formatDate = (dateString: string): string => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   // Update question status/priority/category
//   const handleUpdateQuestion = async () => {
//     if (!selectedQuestion) return;

//     if (!validateEditForm()) {
//       toast.error(`❌ ${t.validationError}`);
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const response = await api.put(
//         `/questions/${selectedQuestion._id}`,
//         editFormData,
//       );

//       let updatedQuestion = response.data;

//       // Translate updated question if needed
//       if (lang !== "en") {
//         try {
//           updatedQuestion = {
//             ...updatedQuestion,
//             name: await translateContent(updatedQuestion.name, lang),
//             question: await translateContent(updatedQuestion.question, lang),
//             replyMessage: updatedQuestion.replyMessage
//               ? await translateContent(updatedQuestion.replyMessage, lang)
//               : null,
//           };
//         } catch (err) {
//           console.error("Error translating updated question:", err);
//         }
//       }

//       const transformedQuestion = transformQuestionToUI(updatedQuestion);

//       const updatedQuestions = questions.map((q) =>
//         q._id === selectedQuestion._id ? transformedQuestion : q,
//       );
//       setQuestions(updatedQuestions);

//       showStatusModal("success", t.success, t.statusUpdated);
//       setIsEditModalOpen(false);
//       setSelectedQuestion(null);
//       setEditFormData({
//         status: "pending",
//         priority: "normal",
//         category: "general",
//       });
//     } catch (error) {
//       console.error("Update question error:", error);
//       showStatusModal("error", t.failed, t.statusUpdateFailed);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Send reply to question
//   const handleSendReply = async () => {
//     if (!selectedQuestion) return;

//     if (!validateReplyForm()) {
//       toast.error(`❌ ${t.validationError}`);
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const user = getUser();
//       const response = await api.post(
//         `/questions/${selectedQuestion._id}/reply`,
//         {
//           replyMessage: replyMessage,
//           repliedBy: user?.id || null,
//         },
//       );

//       let updatedQuestion = response.data;

//       // Translate updated question if needed
//       if (lang !== "en") {
//         try {
//           updatedQuestion = {
//             ...updatedQuestion,
//             name: await translateContent(updatedQuestion.name, lang),
//             question: await translateContent(updatedQuestion.question, lang),
//             replyMessage: updatedQuestion.replyMessage
//               ? await translateContent(updatedQuestion.replyMessage, lang)
//               : null,
//           };
//         } catch (err) {
//           console.error("Error translating replied question:", err);
//         }
//       }

//       const transformedQuestion = transformQuestionToUI(updatedQuestion);

//       const updatedQuestions = questions.map((q) =>
//         q._id === selectedQuestion._id ? transformedQuestion : q,
//       );
//       setQuestions(updatedQuestions);

//       showStatusModal("success", t.success, t.replySent);
//       setIsReplyModalOpen(false);
//       setSelectedQuestion(null);
//       setReplyMessage("");
//     } catch (error) {
//       console.error("Reply error:", error);
//       showStatusModal("error", t.failed, t.replyFailed);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Delete question
//   const handleDeleteQuestion = async () => {
//     if (!selectedQuestion) return;

//     setIsSubmitting(true);

//     try {
//       await api.delete(`/questions/${selectedQuestion._id}`);

//       const updatedQuestions = questions.filter(
//         (q) => q._id !== selectedQuestion._id,
//       );
//       setQuestions(updatedQuestions);

//       showStatusModal("success", t.success, t.questionDeleted);
//       setIsDeleteModalOpen(false);
//       setSelectedQuestion(null);
//     } catch (error) {
//       console.error("Delete question error:", error);
//       showStatusModal("error", t.failed, t.deleteFailed);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Mark question as answered
//   const handleMarkAsAnswered = async (question: QuestionUI) => {
//     setIsSubmitting(true);
//     try {
//       const response = await api.put(`/questions/${question._id}`, {
//         status: "answered",
//       });

//       let updatedQuestion = response.data;
//       if (lang !== "en") {
//         try {
//           updatedQuestion = {
//             ...updatedQuestion,
//             name: await translateContent(updatedQuestion.name, lang),
//             question: await translateContent(updatedQuestion.question, lang),
//             replyMessage: updatedQuestion.replyMessage
//               ? await translateContent(updatedQuestion.replyMessage, lang)
//               : null,
//           };
//         } catch (err) {
//           console.error("Error translating updated question:", err);
//         }
//       }

//       const transformedQuestion = transformQuestionToUI(updatedQuestion);
//       const updatedQuestions = questions.map((q) =>
//         q._id === question._id ? transformedQuestion : q,
//       );
//       setQuestions(updatedQuestions);
//       showStatusModal("success", t.success, t.statusUpdated);
//     } catch (error) {
//       console.error("Mark as answered error:", error);
//       showStatusModal("error", t.failed, t.statusUpdateFailed);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Mark question as archived
//   const handleMarkAsArchived = async (question: QuestionUI) => {
//     setIsSubmitting(true);
//     try {
//       const response = await api.put(`/questions/${question._id}`, {
//         status: "archived",
//       });

//       let updatedQuestion = response.data;
//       if (lang !== "en") {
//         try {
//           updatedQuestion = {
//             ...updatedQuestion,
//             name: await translateContent(updatedQuestion.name, lang),
//             question: await translateContent(updatedQuestion.question, lang),
//             replyMessage: updatedQuestion.replyMessage
//               ? await translateContent(updatedQuestion.replyMessage, lang)
//               : null,
//           };
//         } catch (err) {
//           console.error("Error translating updated question:", err);
//         }
//       }

//       const transformedQuestion = transformQuestionToUI(updatedQuestion);
//       const updatedQuestions = questions.map((q) =>
//         q._id === question._id ? transformedQuestion : q,
//       );
//       setQuestions(updatedQuestions);
//       showStatusModal("success", t.success, t.statusUpdated);
//     } catch (error) {
//       console.error("Mark as archived error:", error);
//       showStatusModal("error", t.failed, t.statusUpdateFailed);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Open modals
//   const openViewModal = (question: QuestionUI) => {
//     setSelectedQuestion(question);
//     setIsViewModalOpen(true);
//   };

//   const openEditModal = (question: QuestionUI) => {
//     setSelectedQuestion(question);
//     setEditFormData({
//       status: question.status,
//       priority: question.priority,
//       category: question.category,
//     });
//     setFormErrors({});
//     setTouchedFields(new Set());
//     setIsEditModalOpen(true);
//   };

//   const openReplyModal = (question: QuestionUI) => {
//     setSelectedQuestion(question);
//     setReplyMessage("");
//     setFormErrors({});
//     setIsReplyModalOpen(true);
//   };

//   const openDeleteModal = (question: QuestionUI) => {
//     setSelectedQuestion(question);
//     setIsDeleteModalOpen(true);
//   };

//   // Modal variants
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

//   // Render Status Modal (Success/Failure)
//   const renderStatusModal = () => {
//     const { type, title, message, details } = statusModalData;
//     const isSuccess = type === "success";
//     const iconColor = isSuccess ? "bg-green-100" : "bg-red-100";
//     const icon = isSuccess ? (
//       <CheckCircleOutlineOutlined className="w-8 h-8 text-green-600" />
//     ) : (
//       <WarningAmberIcon className="w-8 h-8 text-red-600" />
//     );

//     return (
//       <AnimatePresence>
//         {isStatusModalOpen && (
//           <>
//             <motion.div
//               variants={overlayVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
//               onClick={() => setIsStatusModalOpen(false)}
//             />
//             <motion.div
//               variants={modalVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 z-[101] flex items-center justify-center p-4"
//             >
//               <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white relative">
//                 <div className="p-6">
//                   <div className="flex items-center justify-center mb-4">
//                     <div
//                       className={`w-16 h-16 ${iconColor} rounded-full flex items-center justify-center`}
//                     >
//                       {icon}
//                     </div>
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
//                     {title}
//                   </h3>
//                   <p className="text-gray-500 text-center mb-4">{message}</p>
//                   {details && (
//                     <p className="text-sm text-gray-400 text-center mb-6">
//                       {details}
//                     </p>
//                   )}
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => setIsStatusModalOpen(false)}
//                     className={`w-full px-4 py-2.5 rounded-lg text-white font-medium transition-colors ${
//                       isSuccess
//                         ? "bg-green-600 hover:bg-green-700"
//                         : "bg-red-600 hover:bg-red-700"
//                     }`}
//                   >
//                     {t.close}
//                   </motion.button>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     );
//   };

//   // Render Delete Confirmation Modal
//   const renderDeleteModal = () => {
//     if (!isDeleteModalOpen || !selectedQuestion) return null;

//     return (
//       <AnimatePresence>
//         {isDeleteModalOpen && (
//           <>
//             <motion.div
//               variants={overlayVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
//               onClick={() => setIsDeleteModalOpen(false)}
//             />
//             <motion.div
//               variants={modalVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 z-[101] flex items-center justify-center p-4"
//             >
//               <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white relative">
//                 <div className="p-6">
//                   <div className="flex items-center justify-center mb-4">
//                     <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
//                       <DeleteIcon className="w-8 h-8 text-red-600" />
//                     </div>
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
//                     {t.deleteQuestion}
//                   </h3>
//                   <p className="text-gray-500 text-center mb-2">
//                     {t.deleteConfirmation}
//                   </p>
//                   <p className="text-sm text-gray-400 text-center mb-6">
//                     Question: "{selectedQuestion.question.substring(0, 50)}..."
//                   </p>
//                   <div className="flex gap-3">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => setIsDeleteModalOpen(false)}
//                       className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
//                     >
//                       {t.cancel}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handleDeleteQuestion}
//                       disabled={isSubmitting}
//                       className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition-colors disabled:bg-red-400 disabled:cursor-not-allowed"
//                     >
//                       {isSubmitting ? t.saving : t.confirmDelete}
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     );
//   };

//   if (isFetching) {
//     return (
//       <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-[#FF385C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-500">{t.loading}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="mb-6">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//               <HelpOutlineRounded className="w-7 h-7 text-[#FF385C]" />
//               {t.questionManagement}
//             </h1>
//             <p className="text-sm text-gray-500 mt-1">{t.manageQuestions}</p>
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={fetchQuestions}
//               className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//               disabled={isLoading}
//             >
//               <RefreshIcon
//                 className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`}
//               />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
//         <motion.div
//           whileHover={{ y: -2 }}
//           className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
//         >
//           <p className="text-xs text-gray-500">{t.total}</p>
//           <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
//         </motion.div>
//         <motion.div
//           whileHover={{ y: -2 }}
//           className="bg-yellow-50 rounded-xl p-4 shadow-sm border border-yellow-200"
//         >
//           <p className="text-xs text-yellow-600">{t.pending}</p>
//           <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
//         </motion.div>
//         <motion.div
//           whileHover={{ y: -2 }}
//           className="bg-green-50 rounded-xl p-4 shadow-sm border border-green-200"
//         >
//           <p className="text-xs text-green-600">{t.answered}</p>
//           <p className="text-2xl font-bold text-green-700">{stats.answered}</p>
//         </motion.div>
//         <motion.div
//           whileHover={{ y: -2 }}
//           className="bg-blue-50 rounded-xl p-4 shadow-sm border border-blue-200"
//         >
//           <p className="text-xs text-blue-600">{t.replied}</p>
//           <p className="text-2xl font-bold text-blue-700">{stats.replied}</p>
//         </motion.div>
//         <motion.div
//           whileHover={{ y: -2 }}
//           className="bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-200"
//         >
//           <p className="text-xs text-gray-500">{t.archived}</p>
//           <p className="text-2xl font-bold text-gray-700">{stats.archived}</p>
//         </motion.div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
//         <div className="flex flex-col sm:flex-row gap-3">
//           <div className="flex-1 relative">
//             <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder={t.searchQuestions}
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//             />
//           </div>
//           <div className="flex flex-wrap gap-2">
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//             >
//               <option value="all">{t.filters.all}</option>
//               <option value="pending">{t.filters.pending}</option>
//               <option value="answered">{t.filters.answered}</option>
//               <option value="replied">{t.filters.replied}</option>
//               <option value="archived">{t.filters.archived}</option>
//             </select>
//             <select
//               value={filterCategory}
//               onChange={(e) => setFilterCategory(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//             >
//               <option value="all">{t.allCategories}</option>
//               <option value="general">{t.categories.general}</option>
//               <option value="house">{t.categories.house}</option>
//               <option value="booking">{t.categories.booking}</option>
//               <option value="payment">{t.categories.payment}</option>
//               <option value="technical">{t.categories.technical}</option>
//               <option value="other">{t.categories.other}</option>
//             </select>
//             <select
//               value={filterPriority}
//               onChange={(e) => setFilterPriority(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//             >
//               <option value="all">{t.allPriorities}</option>
//               <option value="low">{t.priorities.low}</option>
//               <option value="normal">{t.priorities.normal}</option>
//               <option value="high">{t.priorities.high}</option>
//               <option value="urgent">{t.priorities.urgent}</option>
//             </select>
//             <button
//               onClick={() => {
//                 setSearchTerm("");
//                 setFilterStatus("all");
//                 setFilterCategory("all");
//                 setFilterPriority("all");
//               }}
//               className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               <ClearIcon className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Questions Table */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
//                   {t.question}
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
//                   {t.from}
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
//                   {t.category}
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
//                   {t.status}
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
//                   {t.priority}
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
//                   {t.date}
//                 </th>
//                 <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
//                   {t.actions}
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredQuestions.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={7}
//                     className="px-4 py-8 text-center text-gray-500"
//                   >
//                     <HelpOutlineRounded className="w-12 h-12 mx-auto text-gray-300 mb-2" />
//                     <p>{t.noQuestions}</p>
//                     <p className="text-sm">{t.adjustFilters}</p>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredQuestions.map((question) => (
//                   <motion.tr
//                     key={question._id}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="hover:bg-gray-50 transition-colors"
//                   >
//                     <td className="px-4 py-3">
//                       <div>
//                         <p className="font-medium text-gray-900 text-sm truncate max-w-[200px]">
//                           {question.question}
//                         </p>
//                         <p className="text-xs text-gray-400 truncate max-w-[200px]">
//                           ID: {question._id.substring(0, 12)}...
//                         </p>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap">
//                       <p className="text-sm text-gray-600 truncate max-w-[120px]">
//                         {question.name}
//                       </p>
//                       <p className="text-xs text-gray-400 truncate max-w-[120px]">
//                         {question.email}
//                       </p>
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap">
//                       <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
//                         {getCategoryLabel(question.category)}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap">
//                       <span
//                         className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
//                           question.status,
//                         )}`}
//                       >
//                         {getStatusLabel(question.status)}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap">
//                       <span
//                         className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
//                           question.priority,
//                         )}`}
//                       >
//                         {getPriorityLabel(question.priority)}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap">
//                       <p className="text-sm text-gray-600">
//                         {question.formattedDate}
//                       </p>
//                       <p className="text-xs text-gray-400">
//                         {question.timeAgo}
//                       </p>
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex items-center justify-center gap-0.5 flex-nowrap">
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={() => openViewModal(question)}
//                           className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                           title={t.viewQuestion}
//                         >
//                           <VisibilityIcon className="w-4 h-4" />
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={() => openEditModal(question)}
//                           className="p-1 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
//                           title={t.editQuestion}
//                         >
//                           <EditIcon className="w-4 h-4" />
//                         </motion.button>
//                         {question.status === "pending" && (
//                           <motion.button
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.9 }}
//                             onClick={() => openReplyModal(question)}
//                             className="p-1 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
//                             title={t.replyToQuestion}
//                           >
//                             <ReplyIcon className="w-4 h-4" />
//                           </motion.button>
//                         )}
//                         {question.status === "pending" && (
//                           <motion.button
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.9 }}
//                             onClick={() => handleMarkAsAnswered(question)}
//                             className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                             title={t.markAsAnswered}
//                           >
//                             <CheckCircleIcon className="w-4 h-4" />
//                           </motion.button>
//                         )}
//                         {question.status !== "archived" && (
//                           <motion.button
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.9 }}
//                             onClick={() => handleMarkAsArchived(question)}
//                             className="p-1 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
//                             title={t.markAsArchived}
//                           >
//                             <AssignmentIcon className="w-4 h-4" />
//                           </motion.button>
//                         )}
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={() => openDeleteModal(question)}
//                           className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                           title={t.deleteQuestion}
//                         >
//                           <DeleteIcon className="w-4 h-4" />
//                         </motion.button>
//                       </div>
//                     </td>
//                   </motion.tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//         <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
//           <p className="text-sm text-gray-500">
//             {t.showing} {filteredQuestions.length} {t.of} {questions.length}{" "}
//             {t.questions}
//           </p>
//         </div>
//       </div>

//       {/* View Question Modal */}
//       <AnimatePresence>
//         {isViewModalOpen && selectedQuestion && (
//           <>
//             <motion.div
//               variants={overlayVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
//               onClick={() => setIsViewModalOpen(false)}
//             />
//             <motion.div
//               variants={modalVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 z-[101] flex items-center justify-center p-4"
//             >
//               <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
//                 <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
//                   <div className="flex items-center gap-2">
//                     <HelpOutlineRounded className="text-[#FF385C] w-5 h-5" />
//                     <h2 className="text-xl font-semibold text-gray-900">
//                       {t.questionDetails}
//                     </h2>
//                     <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
//                       {selectedQuestion._id.substring(0, 8)}...
//                     </span>
//                   </div>
//                   <motion.button
//                     whileHover={{ rotate: 90, scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => setIsViewModalOpen(false)}
//                     className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
//                   >
//                     <CloseIcon className="w-5 h-5" />
//                   </motion.button>
//                 </div>

//                 <div className="p-6 space-y-6">
//                   {/* User Information */}
//                   <div>
//                     <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                       <PersonIcon className="w-4 h-4 text-[#FF385C]" />
//                       {t.userInformation}
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">
//                           {t.name}
//                         </label>
//                         <p className="text-sm font-medium text-gray-900">
//                           {selectedQuestion.name}
//                         </p>
//                       </div>
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">
//                           {t.email}
//                         </label>
//                         <p className="text-sm text-gray-900 flex items-center gap-1">
//                           <EmailIcon className="w-3 h-3 text-gray-400" />
//                           {selectedQuestion.email}
//                         </p>
//                       </div>
//                       {selectedQuestion.phone && (
//                         <div>
//                           <label className="text-xs font-medium text-gray-500">
//                             {t.phone}
//                           </label>
//                           <p className="text-sm text-gray-900 flex items-center gap-1">
//                             <PhoneIcon className="w-3 h-3 text-gray-400" />
//                             {selectedQuestion.phone}
//                           </p>
//                         </div>
//                       )}
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">
//                           {t.category}
//                         </label>
//                         <p className="text-sm text-gray-900">
//                           <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
//                             {getCategoryLabel(selectedQuestion.category)}
//                           </span>
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Question Content */}
//                   <div>
//                     <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                       <HelpOutlineRounded className="w-4 h-4 text-[#FF385C]" />
//                       {t.questionContent}
//                     </h3>
//                     <div className="bg-gray-50 rounded-lg p-4">
//                       <p className="text-gray-900 whitespace-pre-wrap">
//                         {selectedQuestion.question}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Status & Priority */}
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">
//                         {t.status}
//                       </label>
//                       <p className="mt-1">
//                         <span
//                           className={`px-2 py-1 text-sm font-medium rounded-full ${getStatusColor(
//                             selectedQuestion.status,
//                           )}`}
//                         >
//                           {getStatusLabel(selectedQuestion.status)}
//                         </span>
//                       </p>
//                     </div>
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">
//                         {t.priority}
//                       </label>
//                       <p className="mt-1">
//                         <span
//                           className={`px-2 py-1 text-sm font-medium rounded-full ${getPriorityColor(
//                             selectedQuestion.priority,
//                           )}`}
//                         >
//                           {getPriorityLabel(selectedQuestion.priority)}
//                         </span>
//                       </p>
//                     </div>
//                   </div>

//                   {/* Reply Message */}
//                   {selectedQuestion.replyMessage && (
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">
//                         {t.replyMessage}
//                       </label>
//                       <div className="mt-1 p-3 bg-blue-50 rounded-lg border border-blue-200">
//                         <p className="text-sm text-gray-700 whitespace-pre-wrap">
//                           {selectedQuestion.replyMessage}
//                         </p>
//                         {selectedQuestion.repliedAt && (
//                           <p className="text-xs text-gray-400 mt-2">
//                             {t.repliedAt}:{" "}
//                             {formatDate(selectedQuestion.repliedAt.toString())}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   )}

//                   {/* Metadata */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">
//                         {t.createdAt}
//                       </label>
//                       <p className="text-sm text-gray-900">
//                         {formatDate(selectedQuestion.createdAt)}
//                       </p>
//                     </div>
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">
//                         {t.updatedAt}
//                       </label>
//                       <p className="text-sm text-gray-900">
//                         {formatDate(selectedQuestion.updatedAt)}
//                       </p>
//                     </div>
//                     {selectedQuestion.readAt && (
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">
//                           {t.readAt}
//                         </label>
//                         <p className="text-sm text-gray-900">
//                           {formatDate(selectedQuestion.readAt.toString())}
//                         </p>
//                       </div>
//                     )}
//                     {selectedQuestion.ipAddress && (
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">
//                           {t.ipAddress}
//                         </label>
//                         <p className="text-sm text-gray-900">
//                           {selectedQuestion.ipAddress}
//                         </p>
//                       </div>
//                     )}
//                   </div>

//                   <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
//                     {selectedQuestion.status === "pending" && (
//                       <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={() => {
//                           setIsViewModalOpen(false);
//                           openReplyModal(selectedQuestion);
//                         }}
//                         className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
//                       >
//                         <ReplyIcon className="w-4 h-4" />
//                         {t.replyToQuestion}
//                       </motion.button>
//                     )}
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => {
//                         setIsViewModalOpen(false);
//                         openEditModal(selectedQuestion);
//                       }}
//                       className="flex-1 px-4 py-2.5 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors flex items-center justify-center gap-2"
//                     >
//                       <EditIcon className="w-4 h-4" />
//                       {t.editQuestion}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => setIsViewModalOpen(false)}
//                       className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
//                     >
//                       {t.close}
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Edit Modal */}
//       <AnimatePresence>
//         {isEditModalOpen && selectedQuestion && (
//           <>
//             <motion.div
//               variants={overlayVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
//               onClick={() => setIsEditModalOpen(false)}
//             />
//             <motion.div
//               variants={modalVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 z-[101] flex items-center justify-center p-4"
//             >
//               <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
//                 <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
//                   <div className="flex items-center gap-2">
//                     <EditIcon className="text-[#FF385C] w-5 h-5" />
//                     <h2 className="text-xl font-semibold text-gray-900">
//                       {t.editQuestion}
//                     </h2>
//                   </div>
//                   <motion.button
//                     whileHover={{ rotate: 90, scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => setIsEditModalOpen(false)}
//                     className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
//                   >
//                     <CloseIcon className="w-5 h-5" />
//                   </motion.button>
//                 </div>

//                 <div className="p-6 space-y-6">
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         {t.status} <span className="text-red-500">*</span>
//                       </label>
//                       <select
//                         value={editFormData.status || "pending"}
//                         onChange={(e) =>
//                           handleEditFormChange("status", e.target.value)
//                         }
//                         onBlur={() => handleEditFormBlur("status")}
//                         className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white ${
//                           formErrors.status && touchedFields.has("status")
//                             ? "border-red-500"
//                             : "border-gray-300"
//                         }`}
//                       >
//                         <option value="pending">{t.statuses.pending}</option>
//                         <option value="answered">{t.statuses.answered}</option>
//                         <option value="replied">{t.statuses.replied}</option>
//                         <option value="archived">{t.statuses.archived}</option>
//                       </select>
//                       {formErrors.status && touchedFields.has("status") && (
//                         <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
//                           <WarningAmberIcon className="w-3 h-3" />
//                           {formErrors.status}
//                         </p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         {t.priority} <span className="text-red-500">*</span>
//                       </label>
//                       <select
//                         value={editFormData.priority || "normal"}
//                         onChange={(e) =>
//                           handleEditFormChange("priority", e.target.value)
//                         }
//                         onBlur={() => handleEditFormBlur("priority")}
//                         className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white ${
//                           formErrors.priority && touchedFields.has("priority")
//                             ? "border-red-500"
//                             : "border-gray-300"
//                         }`}
//                       >
//                         <option value="low">{t.priorities.low}</option>
//                         <option value="normal">{t.priorities.normal}</option>
//                         <option value="high">{t.priorities.high}</option>
//                         <option value="urgent">{t.priorities.urgent}</option>
//                       </select>
//                       {formErrors.priority && touchedFields.has("priority") && (
//                         <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
//                           <WarningAmberIcon className="w-3 h-3" />
//                           {formErrors.priority}
//                         </p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         {t.category} <span className="text-red-500">*</span>
//                       </label>
//                       <select
//                         value={editFormData.category || "general"}
//                         onChange={(e) =>
//                           handleEditFormChange("category", e.target.value)
//                         }
//                         onBlur={() => handleEditFormBlur("category")}
//                         className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white ${
//                           formErrors.category && touchedFields.has("category")
//                             ? "border-red-500"
//                             : "border-gray-300"
//                         }`}
//                       >
//                         <option value="general">{t.categories.general}</option>
//                         <option value="house">{t.categories.house}</option>
//                         <option value="booking">{t.categories.booking}</option>
//                         <option value="payment">{t.categories.payment}</option>
//                         <option value="technical">
//                           {t.categories.technical}
//                         </option>
//                         <option value="other">{t.categories.other}</option>
//                       </select>
//                       {formErrors.category && touchedFields.has("category") && (
//                         <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
//                           <WarningAmberIcon className="w-3 h-3" />
//                           {formErrors.category}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex gap-3 pt-4 border-t border-gray-200">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handleUpdateQuestion}
//                       disabled={isSubmitting}
//                       className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 ${
//                         isSubmitting
//                           ? "bg-gray-400 cursor-not-allowed"
//                           : "bg-[#FF385C] hover:bg-[#E31C5F]"
//                       }`}
//                     >
//                       {isSubmitting ? (
//                         <>
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           {t.saving}
//                         </>
//                       ) : (
//                         <>
//                           <SendIcon className="w-4 h-4" />
//                           {t.save}
//                         </>
//                       )}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => setIsEditModalOpen(false)}
//                       className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
//                     >
//                       {t.cancel}
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Reply Modal */}
//       <AnimatePresence>
//         {isReplyModalOpen && selectedQuestion && (
//           <>
//             <motion.div
//               variants={overlayVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
//               onClick={() => setIsReplyModalOpen(false)}
//             />
//             <motion.div
//               variants={modalVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 z-[101] flex items-center justify-center p-4"
//             >
//               <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
//                 <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
//                   <div className="flex items-center gap-2">
//                     <ReplyIcon className="text-[#FF385C] w-5 h-5" />
//                     <h2 className="text-xl font-semibold text-gray-900">
//                       {t.replyToQuestion}
//                     </h2>
//                   </div>
//                   <motion.button
//                     whileHover={{ rotate: 90, scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => setIsReplyModalOpen(false)}
//                     className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
//                   >
//                     <CloseIcon className="w-5 h-5" />
//                   </motion.button>
//                 </div>

//                 <div className="p-6 space-y-6">
//                   <div>
//                     <label className="text-sm font-medium text-gray-700">
//                       {t.questionText}
//                     </label>
//                     <div className="mt-1 p-3 bg-gray-50 rounded-lg">
//                       <p className="text-sm text-gray-900">
//                         {selectedQuestion.question}
//                       </p>
//                     </div>
//                     <p className="text-xs text-gray-400 mt-1">
//                       From: {selectedQuestion.name} ({selectedQuestion.email})
//                     </p>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                       {t.replyMessage} <span className="text-red-500">*</span>
//                     </label>
//                     <textarea
//                       value={replyMessage}
//                       onChange={(e) => {
//                         setReplyMessage(e.target.value);
//                         if (e.target.value.trim().length >= 3) {
//                           setFormErrors((prev) => ({
//                             ...prev,
//                             replyMessage: undefined,
//                           }));
//                         }
//                       }}
//                       onBlur={() => {
//                         if (!replyMessage || replyMessage.trim().length < 3) {
//                           setFormErrors((prev) => ({
//                             ...prev,
//                             replyMessage: t.required,
//                           }));
//                         }
//                       }}
//                       rows={6}
//                       className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none ${
//                         formErrors.replyMessage
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       }`}
//                       placeholder={t.enterReply}
//                     />
//                     {formErrors.replyMessage && (
//                       <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
//                         <WarningAmberIcon className="w-3 h-3" />
//                         {formErrors.replyMessage}
//                       </p>
//                     )}
//                   </div>

//                   <div className="flex gap-3 pt-4 border-t border-gray-200">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handleSendReply}
//                       disabled={isSubmitting}
//                       className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 ${
//                         isSubmitting
//                           ? "bg-gray-400 cursor-not-allowed"
//                           : "bg-green-600 hover:bg-green-700"
//                       }`}
//                     >
//                       {isSubmitting ? (
//                         <>
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           {t.saving}
//                         </>
//                       ) : (
//                         <>
//                           <SendIcon className="w-4 h-4" />
//                           {t.sendReply}
//                         </>
//                       )}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => setIsReplyModalOpen(false)}
//                       className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
//                     >
//                       {t.cancel}
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Delete Confirmation Modal */}
//       {renderDeleteModal()}

//       {/* Status Modal */}
//       {renderStatusModal()}
//     </div>
//   );
// };

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";

// Material-UI Icons
import { HelpOutlineRounded } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SendIcon from "@mui/icons-material/Send";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

// ============================================================
// MODAL TYPES
// ============================================================
type ModalType = "success" | "confirm" | "fail" | null;

interface ModalState {
  type: ModalType;
  isOpen: boolean;
  title: string;
  message: string;
  details?: string;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

// ============================================================
// TRANSLATION HELPER - Google Translate API
// ============================================================

const translateContent = async (
  text: string,
  targetLang: string,
): Promise<string> => {
  if (!text || targetLang === "en") return text;
  if (targetLang === "rw" || targetLang === "fr") {
    try {
      const response = await axios.get(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`,
      );
      if (response.data && response.data[0] && response.data[0][0]) {
        return response.data[0][0][0] || text;
      }
      return text;
    } catch {
      return text;
    }
  }
  return text;
};

// ============================================================
// TYPES
// ============================================================
interface Question {
  _id: string;
  userId: string | null;
  name: string;
  email: string;
  phone: string | null;
  question: string;
  category: "general" | "house" | "booking" | "payment" | "technical" | "other";
  status: "pending" | "answered" | "replied" | "archived";
  priority: "low" | "normal" | "high" | "urgent";
  replyMessage: string | null;
  repliedAt: Date | null;
  repliedBy: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  readAt: Date | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface QuestionUI extends Question {
  statusLabel: string;
  statusColor: string;
  priorityLabel: string;
  priorityColor: string;
  categoryLabel: string;
  formattedDate: string;
  timeAgo: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  question?: string;
  category?: string;
  priority?: string;
  status?: string;
  replyMessage?: string;
}

// ============================================================
// ICONS FOR MODALS
// ============================================================
const SuccessSVG = () => (
  <svg
    className="w-12 h-12"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const WarningSVG = () => (
  <svg
    className="w-12 h-12"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
);

const ErrorSVG = () => (
  <svg
    className="w-12 h-12"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// ============================================================
// TRANSLATIONS
// ============================================================
const translations = {
  en: {
    questionManagement: "Question Management",
    manageQuestions: "Manage questions from users and guests",
    total: "Total",
    pending: "Pending",
    answered: "Answered",
    replied: "Replied",
    archived: "Archived",
    searchQuestions: "Search by name, email, or question content...",
    allStatus: "All Status",
    allCategories: "All Categories",
    allPriorities: "All Priorities",
    question: "Question",
    from: "From",
    category: "Category",
    status: "Status",
    priority: "Priority",
    date: "Date",
    actions: "Actions",
    noQuestions: "No questions found",
    adjustFilters: "Try adjusting your search or filters",
    showing: "Showing",
    of: "of",
    questions: "questions",
    viewQuestion: "View Question",
    editQuestion: "Edit Question",
    questionDetails: "Question Details",
    userInformation: "User Information",
    questionContent: "Question Content",
    reply: "Reply",
    updateStatus: "Update Status",
    selectStatus: "Select Status",
    selectCategory: "Select Category",
    selectPriority: "Select Priority",
    close: "Close",
    loading: "Loading...",
    fetchError: "Failed to load questions",
    deleteQuestion: "Delete Question",
    deleteConfirmation: "Are you sure you want to delete this question?",
    replyToQuestion: "Reply to Question",
    replyConfirmation: "Are you sure you want to send this reply?",
    sendReply: "Send Reply",
    replySent: "Reply sent successfully!",
    replyFailed: "Failed to send reply",
    questionDeleted: "Question deleted successfully!",
    deleteFailed: "Failed to delete question",
    statusUpdated: "Status updated successfully!",
    statusUpdateFailed: "Failed to update status",
    priorityUpdated: "Priority updated successfully!",
    priorityUpdateFailed: "Failed to update priority",
    name: "Name",
    email: "Email",
    phone: "Phone",
    questionText: "Question",
    replyMessage: "Reply Message",
    enterReply: "Enter your reply message...",
    ipAddress: "IP Address",
    userAgent: "User Agent",
    createdAt: "Created At",
    updatedAt: "Updated At",
    readAt: "Read At",
    repliedAt: "Replied At",
    required: "This field is required",
    validationError: "Please fix all validation errors",
    cancel: "Cancel",
    save: "Save",
    saving: "Saving...",
    delete: "Delete",
    confirmDelete: "Confirm Delete",
    categories: {
      general: "General",
      house: "House",
      booking: "Booking",
      payment: "Payment",
      technical: "Technical",
      other: "Other",
    },
    statuses: {
      pending: "Pending",
      answered: "Answered",
      replied: "Replied",
      archived: "Archived",
    },
    priorities: {
      low: "Low",
      normal: "Normal",
      high: "High",
      urgent: "Urgent",
    },
    filters: {
      all: "All",
      pending: "Pending",
      answered: "Answered",
      replied: "Replied",
      archived: "Archived",
    },
    success: "Success",
    confirmation: "Confirmation",
    confirm: "Confirm",
    markAsAnswered: "Mark as Answered",
    markAsArchived: "Mark as Archived",
    markAsReplied: "Mark as Replied",
    noQuestionsFound: "No questions found",
    failed: "Failed",
    modal: {
      success: "Operation Successful",
      confirm: "Confirm Action",
      fail: "Operation Failed",
    },
  },
  fr: {
    questionManagement: "Gestion des Questions",
    manageQuestions: "Gérer les questions des utilisateurs et invités",
    total: "Total",
    pending: "En Attente",
    answered: "Répondu",
    replied: "Répondu",
    archived: "Archivé",
    searchQuestions: "Rechercher par nom, email ou contenu...",
    allStatus: "Tous les Statuts",
    allCategories: "Toutes les Catégories",
    allPriorities: "Toutes les Priorités",
    question: "Question",
    from: "De",
    category: "Catégorie",
    status: "Statut",
    priority: "Priorité",
    date: "Date",
    actions: "Actions",
    noQuestions: "Aucune question trouvée",
    adjustFilters: "Essayez d'ajuster votre recherche ou vos filtres",
    showing: "Affichage",
    of: "de",
    questions: "questions",
    viewQuestion: "Voir la Question",
    editQuestion: "Modifier la Question",
    questionDetails: "Détails de la Question",
    userInformation: "Informations de l'Utilisateur",
    questionContent: "Contenu de la Question",
    reply: "Répondre",
    updateStatus: "Mettre à Jour le Statut",
    selectStatus: "Sélectionner le Statut",
    selectCategory: "Sélectionner la Catégorie",
    selectPriority: "Sélectionner la Priorité",
    close: "Fermer",
    loading: "Chargement...",
    fetchError: "Échec du chargement des questions",
    deleteQuestion: "Supprimer la Question",
    deleteConfirmation: "Êtes-vous sûr de vouloir supprimer cette question ?",
    replyToQuestion: "Répondre à la Question",
    replyConfirmation: "Êtes-vous sûr de vouloir envoyer cette réponse ?",
    sendReply: "Envoyer la Réponse",
    replySent: "Réponse envoyée avec succès !",
    replyFailed: "Échec de l'envoi de la réponse",
    questionDeleted: "Question supprimée avec succès !",
    deleteFailed: "Échec de la suppression de la question",
    statusUpdated: "Statut mis à jour avec succès !",
    statusUpdateFailed: "Échec de la mise à jour du statut",
    priorityUpdated: "Priorité mise à jour avec succès !",
    priorityUpdateFailed: "Échec de la mise à jour de la priorité",
    name: "Nom",
    email: "Email",
    phone: "Téléphone",
    questionText: "Question",
    replyMessage: "Message de Réponse",
    enterReply: "Entrez votre message de réponse...",
    ipAddress: "Adresse IP",
    userAgent: "Agent Utilisateur",
    createdAt: "Créé le",
    updatedAt: "Mis à jour le",
    readAt: "Lu le",
    repliedAt: "Répondu le",
    required: "Ce champ est requis",
    validationError: "Veuillez corriger toutes les erreurs de validation",
    cancel: "Annuler",
    save: "Enregistrer",
    saving: "Enregistrement...",
    delete: "Supprimer",
    confirmDelete: "Confirmer la Suppression",
    categories: {
      general: "Général",
      house: "Logement",
      booking: "Réservation",
      payment: "Paiement",
      technical: "Technique",
      other: "Autre",
    },
    statuses: {
      pending: "En Attente",
      answered: "Répondu",
      replied: "Répondu",
      archived: "Archivé",
    },
    priorities: {
      low: "Basse",
      normal: "Normale",
      high: "Élevée",
      urgent: "Urgente",
    },
    filters: {
      all: "Tous",
      pending: "En Attente",
      answered: "Répondu",
      replied: "Répondu",
      archived: "Archivé",
    },
    success: "Succès",
    confirmation: "Confirmation",
    confirm: "Confirmer",
    markAsAnswered: "Marquer comme Répondu",
    markAsArchived: "Marquer comme Archivé",
    markAsReplied: "Marquer comme Répondu",
    noQuestionsFound: "Aucune question trouvée",
    failed: "Échoué",
    modal: {
      success: "Opération Réussie",
      confirm: "Confirmer l'Action",
      fail: "Échec de l'Opération",
    },
  },
  rw: {
    questionManagement: "Gucunga Ibibazo",
    manageQuestions: "Gucunga ibibazo by'abakoresha n'abashyitsi",
    total: "Yose",
    pending: "Bitegereje",
    answered: "Byasubijwe",
    replied: "Byasubijwe",
    archived: "Byabikwa",
    searchQuestions: "Shakisha ukurikije izina, imeri cyangwa ibibazo...",
    allStatus: "Ihagaze Ryose",
    allCategories: "Ubwoko Bwose",
    allPriorities: "Iby'ibanze Byose",
    question: "Ikibazo",
    from: "Kuva",
    category: "Ubwoko",
    status: "Ihagaze",
    priority: "Iby'ibanze",
    date: "Itariki",
    actions: "Ibikorwa",
    noQuestions: "Nta kibazo cyabonetse",
    adjustFilters: "Gerageza guhindura uburyo ushakisha cyangwa amatungo",
    showing: "Bereka",
    of: "muri",
    questions: "ibibazo",
    viewQuestion: "Reba Ikibazo",
    editQuestion: "Hindura Ikibazo",
    questionDetails: "Ibisobanuro by'Ikibazo",
    userInformation: "Amakuru y'Umukoresha",
    questionContent: "Ibiri mu Kibazo",
    reply: "Kubasubiza",
    updateStatus: "Vugurura Ihagaze",
    selectStatus: "Hitamo Ihagaze",
    selectCategory: "Hitamo Ubwoko",
    selectPriority: "Hitamo Iby'ibanze",
    close: "Funga",
    loading: "Birakoreshwa...",
    fetchError: "Kubura ibibazo byananiranye",
    deleteQuestion: "Gukuraho Ikibazo",
    deleteConfirmation: "Uri kwizera ko ushaka gukuraho iki kibazo?",
    replyToQuestion: "Kubasubiza Ikibazo",
    replyConfirmation: "Uri kwizera ko ushaka kohereza igisubizo?",
    sendReply: "Kohereza Igisubizo",
    replySent: "Igisubizo cyoherejwe neza!",
    replyFailed: "Kohereza igisubizo byananiranye",
    questionDeleted: "Ikibazo gikuvweho neza!",
    deleteFailed: "Gukuraho ikibazo byananiranye",
    statusUpdated: "Ihagaze ry'ikibazo ryavuguruwe neza!",
    statusUpdateFailed: "Kuvugurura ihagaze byananiranye",
    priorityUpdated: "Iby'ibanze byavuguruwe neza!",
    priorityUpdateFailed: "Kuvugurura iby'ibanze byananiranye",
    name: "Izina",
    email: "Imeri",
    phone: "Telefone",
    questionText: "Ikibazo",
    replyMessage: "Ubutumwa bw'Igisubizo",
    enterReply: "Andika ubutumwa bw'igisubizo...",
    ipAddress: "Adresi ya IP",
    userAgent: "Agent y'Umukoresha",
    createdAt: "Byakozwe",
    updatedAt: "Byavuguruwe",
    readAt: "Byasomwe",
    repliedAt: "Byasubijwe",
    required: "Iki gikurikira kirakenewe",
    validationError: "Kosora amakosa yose yo kwemeza",
    cancel: "Reka",
    save: "Bika",
    saving: "Birabikwa...",
    delete: "Gukuraho",
    confirmDelete: "Emeza Gukuraho",
    categories: {
      general: "Rusange",
      house: "Inzu",
      booking: "Icyanditswe",
      payment: "Amahoro",
      technical: "Ubuhanga",
      other: "Ikindi",
    },
    statuses: {
      pending: "Bitegereje",
      answered: "Byasubijwe",
      replied: "Byasubijwe",
      archived: "Byabikwa",
    },
    priorities: {
      low: "Ntacyo",
      normal: "Nk'ukwe",
      high: "Cyane",
      urgent: "Byihuse",
    },
    filters: {
      all: "Yose",
      pending: "Bitegereje",
      answered: "Byasubijwe",
      replied: "Byasubijwe",
      archived: "Byabikwa",
    },
    success: "Byagenze Neza",
    confirmation: "Kwemeza",
    confirm: "Emeza",
    markAsAnswered: "Shyira ku Byasubijwe",
    markAsArchived: "Shyira ku Byabikwa",
    markAsReplied: "Shyira ku Byasubijwe",
    noQuestionsFound: "Nta kibazo cyabonetse",
    failed: "Byananiranye",
    modal: {
      success: "Ibikorwa Byakunze",
      confirm: "Emeza Ibikorwa",
      fail: "Ibikorwa Byananiranye",
    },
  },
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================
const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
  const lang = Cookies.get("language") as "en" | "fr" | "rw";
  return lang || "en";
};

const getToken = (): string => {
  try {
    return localStorage.getItem("token") || "";
  } catch {
    return "";
  }
};

const getUser = (): {
  id: string;
  name: string;
  email: string;
  role: string;
} | null => {
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  } catch {
    return null;
  }
};

// API Base URL
const API_BASE_URL = "https://rene-inyumba-nodejs.onrender.com";

// Axios instance with interceptors
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Helper function to transform question to UI format
const transformQuestionToUI = (question: Question): QuestionUI => {
  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    answered: "bg-green-100 text-green-800",
    replied: "bg-blue-100 text-blue-800",
    archived: "bg-gray-100 text-gray-800",
  };

  const statusLabels: Record<string, string> = {
    pending: "Pending",
    answered: "Answered",
    replied: "Replied",
    archived: "Archived",
  };

  const priorityColors: Record<string, string> = {
    low: "bg-gray-100 text-gray-600",
    normal: "bg-blue-100 text-blue-600",
    high: "bg-orange-100 text-orange-600",
    urgent: "bg-red-100 text-red-600",
  };

  const priorityLabels: Record<string, string> = {
    low: "Low",
    normal: "Normal",
    high: "High",
    urgent: "Urgent",
  };

  const categoryLabels: Record<string, string> = {
    general: "General",
    house: "House",
    booking: "Booking",
    payment: "Payment",
    technical: "Technical",
    other: "Other",
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTimeAgo = (dateString: string): string => {
    const diff = Date.now() - new Date(dateString).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    const weeks = Math.floor(diff / 604800000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return `${weeks}w ago`;
  };

  return {
    ...question,
    statusLabel: statusLabels[question.status] || question.status,
    statusColor: statusColors[question.status] || "bg-gray-100 text-gray-800",
    priorityLabel: priorityLabels[question.priority] || question.priority,
    priorityColor:
      priorityColors[question.priority] || "bg-gray-100 text-gray-600",
    categoryLabel: categoryLabels[question.category] || question.category,
    formattedDate: formatDate(question.createdAt),
    timeAgo: getTimeAgo(question.createdAt),
  };
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export const QuestionManagement: React.FC = () => {
  const [lang, setLang] = useState<"en" | "fr" | "rw">(
    getLanguageFromCookies(),
  );
  const [questions, setQuestions] = useState<QuestionUI[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<QuestionUI[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [isFetching, setIsFetching] = useState(true);

  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionUI | null>(
    null,
  );

  // Custom Modal State
  const [modalState, setModalState] = useState<ModalState>({
    type: null,
    isOpen: false,
    title: "",
    message: "",
  });

  // Edit form state
  const [editFormData, setEditFormData] = useState<Partial<Question>>({
    status: "pending",
    priority: "normal",
    category: "general",
  });

  // Reply form state
  const [replyMessage, setReplyMessage] = useState("");

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  // Loading states
  const [isLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Statistics
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    answered: 0,
    replied: 0,
    archived: 0,
  });

  const t = translations[lang];

  // Show custom modal
  const showModal = (
    type: ModalType,
    title: string,
    message: string,
    details?: string,
    onConfirm?: () => void,
    confirmText?: string,
    cancelText?: string,
  ) => {
    setModalState({
      type,
      isOpen: true,
      title,
      message,
      details,
      onConfirm,
      confirmText: confirmText || t.confirm,
      cancelText: cancelText || t.cancel,
    });
  };

  // Close custom modal
  const closeModal = () => {
    setModalState({
      type: null,
      isOpen: false,
      title: "",
      message: "",
    });
  };

  // Handle modal confirm
  const handleModalConfirm = () => {
    if (modalState.onConfirm) {
      modalState.onConfirm();
    }
    closeModal();
  };

  // Fetch questions from API with translation
  const fetchQuestions = async () => {
    setIsFetching(true);
    try {
      const response = await api.get("/questions");

      let questionsData: Question[] = [];
      const result = response.data;

      if (result.success && Array.isArray(result.data)) {
        questionsData = result.data;
      } else if (Array.isArray(result)) {
        questionsData = result;
      } else if (result.data && Array.isArray(result.data)) {
        questionsData = result.data;
      } else if (result.questions && Array.isArray(result.questions)) {
        questionsData = result.questions;
      }

      let processedQuestions = questionsData;
      if (lang !== "en") {
        const translatedQuestions = [];
        for (const question of questionsData) {
          try {
            const translatedQuestion = {
              ...question,
              name: await translateContent(question.name, lang),
              question: await translateContent(question.question, lang),
              replyMessage: question.replyMessage
                ? await translateContent(question.replyMessage, lang)
                : null,
            };
            translatedQuestions.push(translatedQuestion);
          } catch {
            translatedQuestions.push(question);
          }
        }
        processedQuestions = translatedQuestions;
      }

      const transformedQuestions = processedQuestions.map(
        (question: Question) => transformQuestionToUI(question),
      );
      setQuestions(transformedQuestions);
      setFilteredQuestions(transformedQuestions);
    } catch (error) {
      showModal("fail", "Error", "Failed to load questions. Please try again.");
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  // Validate edit form
  const validateEditForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    if (!editFormData.status) {
      errors.status = t.required;
      isValid = false;
    }

    if (!editFormData.priority) {
      errors.priority = t.required;
      isValid = false;
    }

    if (!editFormData.category) {
      errors.category = t.required;
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Validate reply form
  const validateReplyForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    if (!replyMessage || replyMessage.trim().length < 3) {
      errors.replyMessage = t.required;
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Handle edit form field changes
  const handleEditFormChange = (field: keyof Question, value: any) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setTouchedFields((prev) => new Set(prev).add(field));
  };

  // Handle edit form blur
  const handleEditFormBlur = (field: string) => {
    setTouchedFields((prev) => new Set(prev).add(field));
    validateEditForm();
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
    fetchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // Filter questions
  useEffect(() => {
    let filtered = [...questions];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (question) =>
          question.name.toLowerCase().includes(term) ||
          question.email.toLowerCase().includes(term) ||
          question.question.toLowerCase().includes(term) ||
          question._id.toLowerCase().includes(term),
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter(
        (question) => question.status === filterStatus,
      );
    }

    if (filterCategory !== "all") {
      filtered = filtered.filter(
        (question) => question.category === filterCategory,
      );
    }

    if (filterPriority !== "all") {
      filtered = filtered.filter(
        (question) => question.priority === filterPriority,
      );
    }

    setFilteredQuestions(filtered);
  }, [questions, searchTerm, filterStatus, filterCategory, filterPriority]);

  // Update statistics
  useEffect(() => {
    const total = questions.length;
    const pending = questions.filter((q) => q.status === "pending").length;
    const answered = questions.filter((q) => q.status === "answered").length;
    const replied = questions.filter((q) => q.status === "replied").length;
    const archived = questions.filter((q) => q.status === "archived").length;

    setStats({ total, pending, answered, replied, archived });
  }, [questions]);

  // Get status badge color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "answered":
        return "bg-green-100 text-green-800";
      case "replied":
        return "bg-blue-100 text-blue-800";
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
        return t.statuses.pending;
      case "answered":
        return t.statuses.answered;
      case "replied":
        return t.statuses.replied;
      case "archived":
        return t.statuses.archived;
      default:
        return status;
    }
  };

  // Get priority color
  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case "low":
        return "bg-gray-100 text-gray-600";
      case "normal":
        return "bg-blue-100 text-blue-600";
      case "high":
        return "bg-orange-100 text-orange-600";
      case "urgent":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // Get priority label
  const getPriorityLabel = (priority: string): string => {
    switch (priority) {
      case "low":
        return t.priorities.low;
      case "normal":
        return t.priorities.normal;
      case "high":
        return t.priorities.high;
      case "urgent":
        return t.priorities.urgent;
      default:
        return priority;
    }
  };

  // Get category label
  const getCategoryLabel = (category: string): string => {
    switch (category) {
      case "general":
        return t.categories.general;
      case "house":
        return t.categories.house;
      case "booking":
        return t.categories.booking;
      case "payment":
        return t.categories.payment;
      case "technical":
        return t.categories.technical;
      case "other":
        return t.categories.other;
      default:
        return category;
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

  // Update question status/priority/category - FIXED
  const handleUpdateQuestion = async () => {
    if (!selectedQuestion) return;

    if (!validateEditForm()) {
      showModal(
        "fail",
        "Validation Error",
        "Please fix all validation errors before submitting.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Use status from form data
      const statusToUpdate = editFormData.status || selectedQuestion.status;
      const priorityToUpdate =
        editFormData.priority || selectedQuestion.priority;
      const categoryToUpdate =
        editFormData.category || selectedQuestion.category;

      const response = await api.put(`/questions/${selectedQuestion._id}`, {
        status: statusToUpdate,
        priority: priorityToUpdate,
        category: categoryToUpdate,
      });

      let updatedQuestion = response.data;

      // Translate updated question if needed
      if (lang !== "en") {
        try {
          updatedQuestion = {
            ...updatedQuestion,
            name: await translateContent(updatedQuestion.name, lang),
            question: await translateContent(updatedQuestion.question, lang),
            replyMessage: updatedQuestion.replyMessage
              ? await translateContent(updatedQuestion.replyMessage, lang)
              : null,
          };
        } catch {
          // Keep original if translation fails
        }
      }

      const transformedQuestion = transformQuestionToUI(updatedQuestion);

      const updatedQuestions = questions.map((q) =>
        q._id === selectedQuestion._id ? transformedQuestion : q,
      );
      setQuestions(updatedQuestions);

      showModal("success", "Success", t.statusUpdated);
      setIsEditModalOpen(false);
      setSelectedQuestion(null);
      setEditFormData({
        status: "pending",
        priority: "normal",
        category: "general",
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data
        ? typeof axiosError.response?.data === "string"
          ? axiosError.response?.data
          : JSON.stringify(axiosError.response?.data)
        : t.statusUpdateFailed;
      showModal("fail", "Failed", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Send reply to question
  const handleSendReply = async () => {
    if (!selectedQuestion) return;

    if (!validateReplyForm()) {
      showModal(
        "fail",
        "Validation Error",
        "Please enter a reply message before sending.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const user = getUser();
      const response = await api.post(
        `/questions/${selectedQuestion._id}/reply`,
        {
          replyMessage: replyMessage,
          repliedBy: user?.id || null,
        },
      );

      let updatedQuestion = response.data;

      if (lang !== "en") {
        try {
          updatedQuestion = {
            ...updatedQuestion,
            name: await translateContent(updatedQuestion.name, lang),
            question: await translateContent(updatedQuestion.question, lang),
            replyMessage: updatedQuestion.replyMessage
              ? await translateContent(updatedQuestion.replyMessage, lang)
              : null,
          };
        } catch {
          // Keep original if translation fails
        }
      }

      const transformedQuestion = transformQuestionToUI(updatedQuestion);

      const updatedQuestions = questions.map((q) =>
        q._id === selectedQuestion._id ? transformedQuestion : q,
      );
      setQuestions(updatedQuestions);

      showModal("success", "Success", t.replySent);
      setIsReplyModalOpen(false);
      setSelectedQuestion(null);
      setReplyMessage("");
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data
        ? typeof axiosError.response?.data === "string"
          ? axiosError.response?.data
          : JSON.stringify(axiosError.response?.data)
        : t.replyFailed;
      showModal("fail", "Failed", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete question
  const handleDeleteQuestion = async () => {
    if (!selectedQuestion) return;

    setIsSubmitting(true);

    try {
      await api.delete(`/questions/${selectedQuestion._id}`);

      const updatedQuestions = questions.filter(
        (q) => q._id !== selectedQuestion._id,
      );
      setQuestions(updatedQuestions);

      showModal("success", "Success", t.questionDeleted);
      setModalState((prev) => ({ ...prev, isOpen: false }));
      setSelectedQuestion(null);
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data
        ? typeof axiosError.response?.data === "string"
          ? axiosError.response?.data
          : JSON.stringify(axiosError.response?.data)
        : t.deleteFailed;
      showModal("fail", "Failed", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mark question as answered - FIXED
  const handleMarkAsAnswered = async (question: QuestionUI) => {
    setIsSubmitting(true);
    try {
      const response = await api.put(`/questions/${question._id}`, {
        status: "answered",
      });

      let updatedQuestion = response.data;
      if (lang !== "en") {
        try {
          updatedQuestion = {
            ...updatedQuestion,
            name: await translateContent(updatedQuestion.name, lang),
            question: await translateContent(updatedQuestion.question, lang),
            replyMessage: updatedQuestion.replyMessage
              ? await translateContent(updatedQuestion.replyMessage, lang)
              : null,
          };
        } catch {
          // Keep original if translation fails
        }
      }

      const transformedQuestion = transformQuestionToUI(updatedQuestion);
      const updatedQuestions = questions.map((q) =>
        q._id === question._id ? transformedQuestion : q,
      );
      setQuestions(updatedQuestions);
      showModal("success", "Success", t.statusUpdated);
      setModalState((prev) => ({ ...prev, isOpen: false }));
    } catch (error) {
      console.error(error);
      showModal("fail", "Failed", t.statusUpdateFailed);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mark question as archived - FIXED
  const handleMarkAsArchived = async (question: QuestionUI) => {
    setIsSubmitting(true);
    try {
      const response = await api.put(`/questions/${question._id}`, {
        status: "archived",
      });

      let updatedQuestion = response.data;
      if (lang !== "en") {
        try {
          updatedQuestion = {
            ...updatedQuestion,
            name: await translateContent(updatedQuestion.name, lang),
            question: await translateContent(updatedQuestion.question, lang),
            replyMessage: updatedQuestion.replyMessage
              ? await translateContent(updatedQuestion.replyMessage, lang)
              : null,
          };
        } catch {
          // Keep original if translation fails
        }
      }

      const transformedQuestion = transformQuestionToUI(updatedQuestion);
      const updatedQuestions = questions.map((q) =>
        q._id === question._id ? transformedQuestion : q,
      );
      setQuestions(updatedQuestions);
      showModal("success", "Success", t.statusUpdated);
      setModalState((prev) => ({ ...prev, isOpen: false }));
    } catch (error) {
      console.error(error);
      showModal("fail", "Failed", t.statusUpdateFailed);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open modals
  const openViewModal = (question: QuestionUI) => {
    setSelectedQuestion(question);
    setIsViewModalOpen(true);
  };

  const openEditModal = (question: QuestionUI) => {
    setSelectedQuestion(question);
    setEditFormData({
      status: question.status,
      priority: question.priority,
      category: question.category,
    });
    setFormErrors({});
    setTouchedFields(new Set());
    setIsEditModalOpen(true);
  };

  const openReplyModal = (question: QuestionUI) => {
    setSelectedQuestion(question);
    setReplyMessage("");
    setFormErrors({});
    setIsReplyModalOpen(true);
  };

  const openDeleteModal = (question: QuestionUI) => {
    setSelectedQuestion(question);
    showModal(
      "confirm",
      "Confirm Delete",
      t.deleteConfirmation,
      `Question: "${question.question.substring(0, 50)}..."`,
      handleDeleteQuestion,
      "Delete",
      "Cancel",
    );
  };

  const openMarkAsAnsweredConfirm = (question: QuestionUI) => {
    showModal(
      "confirm",
      "Confirm Action",
      "Are you sure you want to mark this question as answered?",
      undefined,
      () => handleMarkAsAnswered(question),
      "Confirm",
      "Cancel",
    );
  };

  const openMarkAsArchivedConfirm = (question: QuestionUI) => {
    showModal(
      "confirm",
      "Confirm Action",
      "Are you sure you want to archive this question?",
      undefined,
      () => handleMarkAsArchived(question),
      "Confirm",
      "Cancel",
    );
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
      {/* Custom Modal */}
      <AnimatePresence>
        {modalState.isOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
              onClick={closeModal}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            >
              <motion.div className="w-full max-w-md rounded-2xl shadow-2xl bg-white overflow-hidden">
                <div className="p-6 text-center">
                  <div
                    className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
                      modalState.type === "success"
                        ? "bg-green-100 text-green-600"
                        : modalState.type === "confirm"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                    }`}
                  >
                    {modalState.type === "success" && <SuccessSVG />}
                    {modalState.type === "confirm" && <WarningSVG />}
                    {modalState.type === "fail" && <ErrorSVG />}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {modalState.title}
                  </h3>
                  <p className="text-gray-500 mb-2">{modalState.message}</p>
                  {modalState.details && (
                    <p className="text-sm text-gray-400 mb-4">
                      {modalState.details}
                    </p>
                  )}
                  <div className="flex gap-3">
                    {modalState.type === "confirm" ? (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={closeModal}
                          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                        >
                          {modalState.cancelText}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleModalConfirm}
                          className="flex-1 px-4 py-2.5 bg-[#FF385C] rounded-xl text-white font-medium hover:bg-[#E31C5F] transition-colors"
                        >
                          {modalState.confirmText}
                        </motion.button>
                      </>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={closeModal}
                        className={`flex-1 px-4 py-2.5 rounded-xl text-white font-medium transition-colors ${
                          modalState.type === "success"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-[#FF385C] hover:bg-[#E31C5F]"
                        }`}
                      >
                        {t.close}
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <HelpOutlineRounded className="w-7 h-7 text-[#FF385C]" />
              {t.questionManagement}
            </h1>
            <p className="text-sm text-gray-500 mt-1">{t.manageQuestions}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchQuestions}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={isLoading}
            >
              <RefreshIcon
                className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
        >
          <p className="text-xs text-gray-500">{t.total}</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-yellow-50 rounded-xl p-4 shadow-sm border border-yellow-200"
        >
          <p className="text-xs text-yellow-600">{t.pending}</p>
          <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-green-50 rounded-xl p-4 shadow-sm border border-green-200"
        >
          <p className="text-xs text-green-600">{t.answered}</p>
          <p className="text-2xl font-bold text-green-700">{stats.answered}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-blue-50 rounded-xl p-4 shadow-sm border border-blue-200"
        >
          <p className="text-xs text-blue-600">{t.replied}</p>
          <p className="text-2xl font-bold text-blue-700">{stats.replied}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-200"
        >
          <p className="text-xs text-gray-500">{t.archived}</p>
          <p className="text-2xl font-bold text-gray-700">{stats.archived}</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t.searchQuestions}
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
              <option value="all">{t.filters.all}</option>
              <option value="pending">{t.filters.pending}</option>
              <option value="answered">{t.filters.answered}</option>
              <option value="replied">{t.filters.replied}</option>
              <option value="archived">{t.filters.archived}</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
            >
              <option value="all">{t.allCategories}</option>
              <option value="general">{t.categories.general}</option>
              <option value="house">{t.categories.house}</option>
              <option value="booking">{t.categories.booking}</option>
              <option value="payment">{t.categories.payment}</option>
              <option value="technical">{t.categories.technical}</option>
              <option value="other">{t.categories.other}</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
            >
              <option value="all">{t.allPriorities}</option>
              <option value="low">{t.priorities.low}</option>
              <option value="normal">{t.priorities.normal}</option>
              <option value="high">{t.priorities.high}</option>
              <option value="urgent">{t.priorities.urgent}</option>
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

      {/* Questions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  {t.question}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  {t.from}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  {t.category}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  {t.status}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  {t.priority}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  {t.date}
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  {t.actions}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredQuestions.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    <HelpOutlineRounded className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                    <p>{t.noQuestions}</p>
                    <p className="text-sm">{t.adjustFilters}</p>
                  </td>
                </tr>
              ) : (
                filteredQuestions.map((question) => (
                  <motion.tr
                    key={question._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900 text-sm truncate max-w-[200px]">
                          {question.question}
                        </p>
                        <p className="text-xs text-gray-400 truncate max-w-[200px]">
                          ID: {question._id.substring(0, 12)}...
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="text-sm text-gray-600 truncate max-w-[120px]">
                        {question.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate max-w-[120px]">
                        {question.email}
                      </p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                        {getCategoryLabel(question.category)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          question.status,
                        )}`}
                      >
                        {getStatusLabel(question.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                          question.priority,
                        )}`}
                      >
                        {getPriorityLabel(question.priority)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="text-sm text-gray-600">
                        {question.formattedDate}
                      </p>
                      <p className="text-xs text-gray-400">
                        {question.timeAgo}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-0.5 flex-nowrap">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openViewModal(question)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title={t.viewQuestion}
                        >
                          <VisibilityIcon className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openEditModal(question)}
                          className="p-1 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title={t.editQuestion}
                        >
                          <EditIcon className="w-4 h-4" />
                        </motion.button>
                        {question.status === "pending" && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => openReplyModal(question)}
                            className="p-1 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title={t.replyToQuestion}
                          >
                            <ReplyIcon className="w-4 h-4" />
                          </motion.button>
                        )}
                        {question.status === "pending" && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => openMarkAsAnsweredConfirm(question)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title={t.markAsAnswered}
                          >
                            <CheckCircleIcon className="w-4 h-4" />
                          </motion.button>
                        )}
                        {question.status !== "archived" && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => openMarkAsArchivedConfirm(question)}
                            className="p-1 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                            title={t.markAsArchived}
                          >
                            <AssignmentIcon className="w-4 h-4" />
                          </motion.button>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openDeleteModal(question)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title={t.deleteQuestion}
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
            {t.showing} {filteredQuestions.length} {t.of} {questions.length}{" "}
            {t.questions}
          </p>
        </div>
      </div>

      {/* View Question Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedQuestion && (
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
                    <HelpOutlineRounded className="text-[#FF385C] w-5 h-5" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      {t.questionDetails}
                    </h2>
                    <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {selectedQuestion._id.substring(0, 8)}...
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsViewModalOpen(false)}
                    className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="p-6 space-y-6">
                  {/* User Information */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <PersonIcon className="w-4 h-4 text-[#FF385C]" />
                      {t.userInformation}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                      <div>
                        <label className="text-xs font-medium text-gray-500">
                          {t.name}
                        </label>
                        <p className="text-sm font-medium text-gray-900">
                          {selectedQuestion.name}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">
                          {t.email}
                        </label>
                        <p className="text-sm text-gray-900 flex items-center gap-1">
                          <EmailIcon className="w-3 h-3 text-gray-400" />
                          {selectedQuestion.email}
                        </p>
                      </div>
                      {selectedQuestion.phone && (
                        <div>
                          <label className="text-xs font-medium text-gray-500">
                            {t.phone}
                          </label>
                          <p className="text-sm text-gray-900 flex items-center gap-1">
                            <PhoneIcon className="w-3 h-3 text-gray-400" />
                            {selectedQuestion.phone}
                          </p>
                        </div>
                      )}
                      <div>
                        <label className="text-xs font-medium text-gray-500">
                          {t.category}
                        </label>
                        <p className="text-sm text-gray-900">
                          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                            {getCategoryLabel(selectedQuestion.category)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Question Content */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <HelpOutlineRounded className="w-4 h-4 text-[#FF385C]" />
                      {t.questionContent}
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-900 whitespace-pre-wrap">
                        {selectedQuestion.question}
                      </p>
                    </div>
                  </div>

                  {/* Status & Priority */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.status}
                      </label>
                      <p className="mt-1">
                        <span
                          className={`px-2 py-1 text-sm font-medium rounded-full ${getStatusColor(
                            selectedQuestion.status,
                          )}`}
                        >
                          {getStatusLabel(selectedQuestion.status)}
                        </span>
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.priority}
                      </label>
                      <p className="mt-1">
                        <span
                          className={`px-2 py-1 text-sm font-medium rounded-full ${getPriorityColor(
                            selectedQuestion.priority,
                          )}`}
                        >
                          {getPriorityLabel(selectedQuestion.priority)}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Reply Message */}
                  {selectedQuestion.replyMessage && (
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.replyMessage}
                      </label>
                      <div className="mt-1 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">
                          {selectedQuestion.replyMessage}
                        </p>
                        {selectedQuestion.repliedAt && (
                          <p className="text-xs text-gray-400 mt-2">
                            {t.repliedAt}:{" "}
                            {formatDate(selectedQuestion.repliedAt.toString())}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Metadata */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.createdAt}
                      </label>
                      <p className="text-sm text-gray-900">
                        {formatDate(selectedQuestion.createdAt)}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.updatedAt}
                      </label>
                      <p className="text-sm text-gray-900">
                        {formatDate(selectedQuestion.updatedAt)}
                      </p>
                    </div>
                    {selectedQuestion.readAt && (
                      <div>
                        <label className="text-xs font-medium text-gray-500">
                          {t.readAt}
                        </label>
                        <p className="text-sm text-gray-900">
                          {formatDate(selectedQuestion.readAt.toString())}
                        </p>
                      </div>
                    )}
                    {selectedQuestion.ipAddress && (
                      <div>
                        <label className="text-xs font-medium text-gray-500">
                          {t.ipAddress}
                        </label>
                        <p className="text-sm text-gray-900">
                          {selectedQuestion.ipAddress}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                    {selectedQuestion.status === "pending" && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setIsViewModalOpen(false);
                          openReplyModal(selectedQuestion);
                        }}
                        className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <ReplyIcon className="w-4 h-4" />
                        {t.replyToQuestion}
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsViewModalOpen(false);
                        openEditModal(selectedQuestion);
                      }}
                      className="flex-1 px-4 py-2.5 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors flex items-center justify-center gap-2"
                    >
                      <EditIcon className="w-4 h-4" />
                      {t.editQuestion}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsViewModalOpen(false)}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
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

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditModalOpen && selectedQuestion && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setIsEditModalOpen(false)}
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
                    <EditIcon className="text-[#FF385C] w-5 h-5" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      {t.editQuestion}
                    </h2>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsEditModalOpen(false)}
                    className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.status} <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={editFormData.status || "pending"}
                        onChange={(e) =>
                          handleEditFormChange("status", e.target.value)
                        }
                        onBlur={() => handleEditFormBlur("status")}
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white ${
                          formErrors.status && touchedFields.has("status")
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="pending">{t.statuses.pending}</option>
                        <option value="answered">{t.statuses.answered}</option>
                        <option value="replied">{t.statuses.replied}</option>
                        <option value="archived">{t.statuses.archived}</option>
                      </select>
                      {formErrors.status && touchedFields.has("status") && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <WarningAmberIcon className="w-3 h-3" />
                          {formErrors.status}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.priority} <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={editFormData.priority || "normal"}
                        onChange={(e) =>
                          handleEditFormChange("priority", e.target.value)
                        }
                        onBlur={() => handleEditFormBlur("priority")}
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white ${
                          formErrors.priority && touchedFields.has("priority")
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="low">{t.priorities.low}</option>
                        <option value="normal">{t.priorities.normal}</option>
                        <option value="high">{t.priorities.high}</option>
                        <option value="urgent">{t.priorities.urgent}</option>
                      </select>
                      {formErrors.priority && touchedFields.has("priority") && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <WarningAmberIcon className="w-3 h-3" />
                          {formErrors.priority}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.category} <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={editFormData.category || "general"}
                        onChange={(e) =>
                          handleEditFormChange("category", e.target.value)
                        }
                        onBlur={() => handleEditFormBlur("category")}
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white ${
                          formErrors.category && touchedFields.has("category")
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="general">{t.categories.general}</option>
                        <option value="house">{t.categories.house}</option>
                        <option value="booking">{t.categories.booking}</option>
                        <option value="payment">{t.categories.payment}</option>
                        <option value="technical">
                          {t.categories.technical}
                        </option>
                        <option value="other">{t.categories.other}</option>
                      </select>
                      {formErrors.category && touchedFields.has("category") && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <WarningAmberIcon className="w-3 h-3" />
                          {formErrors.category}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleUpdateQuestion}
                      disabled={isSubmitting}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 ${
                        isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#FF385C] hover:bg-[#E31C5F]"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {t.saving}
                        </>
                      ) : (
                        <>
                          <SendIcon className="w-4 h-4" />
                          {t.save}
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsEditModalOpen(false)}
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

      {/* Reply Modal */}
      <AnimatePresence>
        {isReplyModalOpen && selectedQuestion && (
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
                      {t.replyToQuestion}
                    </h2>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsReplyModalOpen(false)}
                    className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      {t.questionText}
                    </label>
                    <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-900">
                        {selectedQuestion.question}
                      </p>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      From: {selectedQuestion.name} ({selectedQuestion.email})
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.replyMessage} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={replyMessage}
                      onChange={(e) => {
                        setReplyMessage(e.target.value);
                        if (e.target.value.trim().length >= 3) {
                          setFormErrors((prev) => ({
                            ...prev,
                            replyMessage: undefined,
                          }));
                        }
                      }}
                      onBlur={() => {
                        if (!replyMessage || replyMessage.trim().length < 3) {
                          setFormErrors((prev) => ({
                            ...prev,
                            replyMessage: t.required,
                          }));
                        }
                      }}
                      rows={6}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none ${
                        formErrors.replyMessage
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder={t.enterReply}
                    />
                    {formErrors.replyMessage && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <WarningAmberIcon className="w-3 h-3" />
                        {formErrors.replyMessage}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSendReply}
                      disabled={isSubmitting}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 ${
                        isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {t.saving}
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
                      onClick={() => setIsReplyModalOpen(false)}
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
