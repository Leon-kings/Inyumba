// // /* eslint-disable no-useless-escape */

// // /* eslint-disable react-hooks/set-state-in-effect */
// // import React, { useState, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import Cookies from "js-cookie";

// // // Material-UI Icons
// // import SupportAgentIcon from "@mui/icons-material/SupportAgent";
// // import CloseIcon from "@mui/icons-material/Close";
// // import SearchIcon from "@mui/icons-material/Search";
// // import RefreshIcon from "@mui/icons-material/Refresh";
// // import DeleteIcon from "@mui/icons-material/Delete";
// // import VisibilityIcon from "@mui/icons-material/Visibility";
// // import ImageIcon from "@mui/icons-material/Image";
// // import ClearIcon from "@mui/icons-material/Clear";
// // import AssignmentIcon from "@mui/icons-material/Assignment";
// // import ChatIcon from "@mui/icons-material/Chat";
// // import { Close, Send } from "@mui/icons-material";

// // // Types - Updated to match the request model
// // interface RequestImage {
// //   public_id: string | null;
// //   url: string | null;
// //   format: string | null;
// // }

// // interface RequestNotification {
// //   notificationId: string;
// //   type: string | null;
// //   message: string | null;
// //   targetRoles: ("admin" | "user" | "host")[];
// //   createdAt: string;
// // }

// // interface Request {
// //   _id: string;
// //   name: string;
// //   email: string;
// //   message: string;
// //   language: string;
// //   image: RequestImage;
// //   status: "Pending" | "Approved" | "Rejected" | "Completed";
// //   adminReply: string;
// //   userId: string | null;
// //   notificationId: string | null;
// //   notifications: RequestNotification[];
// //   lastNotification: {
// //     type: string | null;
// //     message: string | null;
// //     status: "new" | "read" | "archived";
// //     createdAt: string | null;
// //   } | null;
// //   createdAt: string;
// //   updatedAt: string;
// //   hasNotification?: boolean;
// // }

// // // Extended type for UI purposes
// // interface RequestUI extends Request {
// //   // UI-specific fields
// //   response: string;
// //   respondedBy: string;
// //   statusLabel: string;
// //   statusColor: string;
// //   displayImage?: {
// //     name: string;
// //     size: number;
// //     type: string;
// //     dataUrl: string;
// //   };
// // }

// // interface RequestFormData {
// //   name: string;
// //   email: string;
// //   message: string;
// //   language: string;
// //   status: "Pending" | "Approved" | "Rejected" | "Completed";
// //   adminReply?: string;
// // }

// // // Form validation errors
// // interface FormErrors {
// //   name?: string;
// //   email?: string;
// //   message?: string;
// // }

// // // Translations
// // const translations = {
// //   en: {
// //     requestManagement: "Request Management",
// //     manageRequests: "Manage support requests and assistance inquiries",
// //     total: "Total",
// //     pending: "Pending",
// //     approved: "Approved",
// //     rejected: "Rejected",
// //     completed: "Completed",
// //     searchRequests: "Search by name, email, or message...",
// //     allStatus: "All Status",
// //     request: "Request",
// //     requester: "Requester",
// //     message: "Message",
// //     status: "Status",
// //     submitted: "Submitted",
// //     actions: "Actions",
// //     noRequests: "No requests found",
// //     adjustFilters: "Try adjusting your search or filters",
// //     showing: "Showing",
// //     of: "of",
// //     requests: "requests",
// //     viewRequest: "View Request",
// //     respond: "Respond",
// //     deleteRequest: "Delete Request",
// //     deleteConfirmation: "Are you sure you want to delete this request?",
// //     actionUndone: "This action cannot be undone.",
// //     cancel: "Cancel",
// //     delete: "Delete",
// //     deleting: "Deleting...",
// //     requestDeleted: "Request deleted successfully!",
// //     deleteFailed: "Failed to delete request",
// //     statusUpdated: "Request status updated successfully!",
// //     statusUpdateFailed: "Failed to update request status",
// //     responseSent: "Response sent successfully!",
// //     responseFailed: "Failed to send response",
// //     requestDetails: "Request Details",
// //     requesterName: "Requester Name",
// //     requesterEmail: "Requester Email",
// //     requestMessage: "Request Message",
// //     attachedImage: "Attached Image",
// //     responseLabel: "Response",
// //     sendResponse: "Send Response",
// //     updateStatus: "Update Status",
// //     selectStatus: "Select Status",
// //     responsePlaceholder: "Type your response here...",
// //     noImage: "No image attached",
// //     viewImage: "View Image",
// //     close: "Close",
// //     send: "Send",
// //     sending: "Sending...",
// //     loading: "Loading...",
// //     fetchError: "Failed to load requests",
// //     nameRequired: "Name is required",
// //     nameMinLength: "Name must be at least 2 characters",
// //     emailRequired: "Email is required",
// //     emailInvalid: "Please enter a valid email",
// //     messageRequired: "Message is required",
// //     messageMinLength: "Message must be at least 10 characters",
// //     messageMaxLength: "Message cannot exceed 1000 characters",
// //     allFieldsValid: "All fields are valid!",
// //     pleaseFixErrors: "Please fix the errors above",
// //     replyTo: "Reply to",
// //     createdAt: "Created At",
// //     updatedAt: "Updated At",
// //     language: "Language",
// //     adminReply: "Admin Reply",
// //     statuses: {
// //       Pending: "Pending",
// //       Approved: "Approved",
// //       Rejected: "Rejected",
// //       Completed: "Completed",
// //     },
// //     filters: {
// //       all: "All Status",
// //       Pending: "Pending",
// //       Approved: "Approved",
// //       Rejected: "Rejected",
// //       Completed: "Completed",
// //     },
// //   },
// //   fr: {
// //     requestManagement: "Gestion des Demandes",
// //     manageRequests: "Gérer les demandes de support et les demandes d'assistance",
// //     total: "Total",
// //     pending: "En Attente",
// //     approved: "Approuvé",
// //     rejected: "Rejeté",
// //     completed: "Terminé",
// //     searchRequests: "Rechercher par nom, email ou message...",
// //     allStatus: "Tous les Statuts",
// //     request: "Demande",
// //     requester: "Demandeur",
// //     message: "Message",
// //     status: "Statut",
// //     submitted: "Soumis",
// //     actions: "Actions",
// //     noRequests: "Aucune demande trouvée",
// //     adjustFilters: "Essayez d'ajuster votre recherche ou vos filtres",
// //     showing: "Affichage",
// //     of: "de",
// //     requests: "demandes",
// //     viewRequest: "Voir la Demande",
// //     respond: "Répondre",
// //     deleteRequest: "Supprimer la Demande",
// //     deleteConfirmation: "Êtes-vous sûr de vouloir supprimer cette demande ?",
// //     actionUndone: "Cette action est irréversible.",
// //     cancel: "Annuler",
// //     delete: "Supprimer",
// //     deleting: "Suppression...",
// //     requestDeleted: "Demande supprimée avec succès !",
// //     deleteFailed: "Échec de la suppression de la demande",
// //     statusUpdated: "Statut de la demande mis à jour avec succès !",
// //     statusUpdateFailed: "Échec de la mise à jour du statut",
// //     responseSent: "Réponse envoyée avec succès !",
// //     responseFailed: "Échec de l'envoi de la réponse",
// //     requestDetails: "Détails de la Demande",
// //     requesterName: "Nom du Demandeur",
// //     requesterEmail: "Email du Demandeur",
// //     requestMessage: "Message de la Demande",
// //     attachedImage: "Image Jointe",
// //     responseLabel: "Réponse",
// //     sendResponse: "Envoyer la Réponse",
// //     updateStatus: "Mettre à Jour le Statut",
// //     selectStatus: "Sélectionner le Statut",
// //     responsePlaceholder: "Tapez votre réponse ici...",
// //     noImage: "Aucune image jointe",
// //     viewImage: "Voir l'Image",
// //     close: "Fermer",
// //     send: "Envoyer",
// //     sending: "Envoi en cours...",
// //     loading: "Chargement...",
// //     fetchError: "Échec du chargement des demandes",
// //     nameRequired: "Le nom est requis",
// //     nameMinLength: "Le nom doit contenir au moins 2 caractères",
// //     emailRequired: "L'email est requis",
// //     emailInvalid: "Veuillez entrer un email valide",
// //     messageRequired: "Le message est requis",
// //     messageMinLength: "Le message doit contenir au moins 10 caractères",
// //     messageMaxLength: "Le message ne peut pas dépasser 1000 caractères",
// //     allFieldsValid: "Tous les champs sont valides !",
// //     pleaseFixErrors: "Veuillez corriger les erreurs ci-dessus",
// //     replyTo: "Répondre à",
// //     createdAt: "Créé le",
// //     updatedAt: "Mis à jour le",
// //     language: "Langue",
// //     adminReply: "Réponse Admin",
// //     statuses: {
// //       Pending: "En Attente",
// //       Approved: "Approuvé",
// //       Rejected: "Rejeté",
// //       Completed: "Terminé",
// //     },
// //     filters: {
// //       all: "Tous les Statuts",
// //       Pending: "En Attente",
// //       Approved: "Approuvé",
// //       Rejected: "Rejeté",
// //       Completed: "Terminé",
// //     },
// //   },
// //   rw: {
// //     requestManagement: "Gucunga Ibyifuzo",
// //     manageRequests: "Gucunga ibyifuzo by'ubufasha n'ibibazo",
// //     total: "Yose",
// //     pending: "Bitegereje",
// //     approved: "Byemewe",
// //     rejected: "Byangijwe",
// //     completed: "Byarangiye",
// //     searchRequests: "Shakisha ukurikije izina, imeri cyangwa ubutumwa...",
// //     allStatus: "Ihagaze Ryose",
// //     request: "Icyifuzo",
// //     requester: "Usabye",
// //     message: "Ubutumwa",
// //     status: "Ihagaze",
// //     submitted: "Byoherejwe",
// //     actions: "Ibikorwa",
// //     noRequests: "Nta cyifuzo cyabonetse",
// //     adjustFilters: "Gerageza guhindura uburyo ushakisha cyangwa amatungo",
// //     showing: "Bereka",
// //     of: "muri",
// //     requests: "ibyifuzo",
// //     viewRequest: "Reba Icyifuzo",
// //     respond: "Subiza",
// //     deleteRequest: "Kuraho Icyifuzo",
// //     deleteConfirmation: "Uri kwizera ko ushaka gukuraho iki cyifuzo?",
// //     actionUndone: "Iki gikorwa ntikishobora guhindurwa.",
// //     cancel: "Reka",
// //     delete: "Kuraho",
// //     deleting: "Birakurwaho...",
// //     requestDeleted: "Icyifuzo cyakuweho neza!",
// //     deleteFailed: "Kuraho icyifuzo birananiranye",
// //     statusUpdated: "Ihagaze ry'icyifuzo ryavuguruwe neza!",
// //     statusUpdateFailed: "Kuvugurura ihagaze birananiranye",
// //     responseSent: "Igisubizo cyoherejwe neza!",
// //     responseFailed: "Kohereza igisubizo birananiranye",
// //     requestDetails: "Ibisobanuro by'Icyifuzo",
// //     requesterName: "Izina ry'Usabye",
// //     requesterEmail: "Imeri y'Usabye",
// //     requestMessage: "Ubutumwa bw'Icyifuzo",
// //     attachedImage: "Ishusho Yashyizweho",
// //     responseLabel: "Igisubizo",
// //     sendResponse: "Ohereza Igisubizo",
// //     updateStatus: "Vugurura Ihagaze",
// //     selectStatus: "Hitamo Ihagaze",
// //     responsePlaceholder: "Andika igisubizo cyawe hano...",
// //     noImage: "Nta shusho yashyizweho",
// //     viewImage: "Reba Ishusho",
// //     close: "Funga",
// //     send: "Ohereza",
// //     sending: "Biremereza...",
// //     loading: "Birakoreshwa...",
// //     fetchError: "Kubura ibyifuzo birananiranye",
// //     nameRequired: "Izina rirasabwa",
// //     nameMinLength: "Izina rigomba kuba ibinyuguti 2 byibuze",
// //     emailRequired: "Imeri irasabwa",
// //     emailInvalid: "Andika imeri ikwiye",
// //     messageRequired: "Ubutumwa burasabwa",
// //     messageMinLength: "Ubutumwa bugomba kuba ibinyuguti 10 byibuze",
// //     messageMaxLength: "Ubutumwa ntibugomba kurenga ibinyuguti 1000",
// //     allFieldsValid: "Ibice byose birimo amakuru akwiye!",
// //     pleaseFixErrors: "Kosora amakosa hejuru",
// //     replyTo: "Subiza kuri",
// //     createdAt: "Byakozwe",
// //     updatedAt: "Byavuguruwe",
// //     language: "Ururimi",
// //     adminReply: "Igisubizo cy'Admin",
// //     statuses: {
// //       Pending: "Bitegereje",
// //       Approved: "Byemewe",
// //       Rejected: "Byangijwe",
// //       Completed: "Byarangiye",
// //     },
// //     filters: {
// //       all: "Ihagaze Ryose",
// //       Pending: "Bitegereje",
// //       Approved: "Byemewe",
// //       Rejected: "Byangijwe",
// //       Completed: "Byarangiye",
// //     },
// //   },
// // };

// // // Helper function to get language from cookies
// // const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
// //   const lang = Cookies.get("language") as "en" | "fr" | "rw";
// //   return lang || "en";
// // };

// // // API Base URL
// // const API_URL = "https://rene-inyumba-nodejs.onrender.com/requests";

// // // Helper function to transform request to UI format
// // const transformRequestToUI = (request: Request): RequestUI => {
// //   const statusColors: Record<string, string> = {
// //     Pending: "bg-yellow-100 text-yellow-800",
// //     Approved: "bg-green-100 text-green-800",
// //     Rejected: "bg-red-100 text-red-800",
// //     Completed: "bg-blue-100 text-blue-800",
// //   };

// //   const statusLabels: Record<string, string> = {
// //     Pending: "Pending",
// //     Approved: "Approved",
// //     Rejected: "Rejected",
// //     Completed: "Completed",
// //   };

// //   // Check if there's an image URL
// //   let displayImage = undefined;
// //   if (request.image && request.image.url) {
// //     displayImage = {
// //       name: request.image.public_id || "image",
// //       size: 0,
// //       type: request.image.format || "image/jpeg",
// //       dataUrl: request.image.url,
// //     };
// //   }

// //   return {
// //     ...request,
// //     response: request.adminReply || "",
// //     respondedBy: "Admin",
// //     statusLabel: statusLabels[request.status] || request.status,
// //     statusColor: statusColors[request.status] || "bg-gray-100 text-gray-800",
// //     displayImage,
// //   };
// // };

// // // Helper function to transform form data to API format
// // const transformFormToRequest = (data: RequestFormData): any => {
// //   return {
// //     name: data.name,
// //     email: data.email,
// //     message: data.message,
// //     language: data.language || "en",
// //     status: data.status || "Pending",
// //     adminReply: data.adminReply || "",
// //   };
// // };

// // export const RequestManagement: React.FC = () => {
// //   // Get language from cookies
// //   const [lang, setLang] = useState<"en" | "fr" | "rw">(
// //     getLanguageFromCookies(),
// //   );
// //   const [requests, setRequests] = useState<RequestUI[]>([]);
// //   const [filteredRequests, setFilteredRequests] = useState<RequestUI[]>([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [filterStatus, setFilterStatus] = useState<string>("all");

// //   // Modal states
// //   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
// //   const [isRespondModalOpen, setIsRespondModalOpen] = useState(false);
// //   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
// //   const [selectedRequest, setSelectedRequest] = useState<RequestUI | null>(null);
// //   const [responseText, setResponseText] = useState("");
// //   const [selectedStatus, setSelectedStatus] = useState<string>("");
// //   const [isImageModalOpen, setIsImageModalOpen] = useState(false);

// //   // Form state for compose
// //   const [formData] = useState<RequestFormData>({
// //     name: "",
// //     email: "",
// //     message: "",
// //     language: "en",
// //     status: "Pending",
// //     adminReply: "",
// //   });

// //   // Loading states
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [isFetching, setIsFetching] = useState(true);

// //   // Statistics
// //   const [stats, setStats] = useState({
// //     total: 0,
// //     Pending: 0,
// //     Approved: 0,
// //     Rejected: 0,
// //     Completed: 0,
// //   });

// //   const t = translations[lang];

// //   // Reset form
// //   const resetForm = () => {
// //     // Form reset functionality removed since formData is not used
// //   };

// //   // Fetch requests from API
// //   const fetchRequests = async () => {
// //     setIsFetching(true);
// //     try {
// //       const response = await fetch(API_URL);
// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }
// //       const data = await response.json();

// //       // Handle both array and single object responses
// //       let requestsData: Request[] = [];
// //       if (Array.isArray(data)) {
// //         requestsData = data;
// //       } else if (data && typeof data === 'object') {
// //         if (data._id) {
// //           requestsData = [data];
// //         } else if (data.data && Array.isArray(data.data)) {
// //           requestsData = data.data;
// //         } else if (data.requests && Array.isArray(data.requests)) {
// //           requestsData = data.requests;
// //         } else {
// //           const possibleArrays = Object.values(data).filter(val => Array.isArray(val));
// //           if (possibleArrays.length > 0) {
// //             requestsData = possibleArrays[0];
// //           }
// //         }
// //       }

// //       const transformedRequests = requestsData.map((req: Request) => transformRequestToUI(req));
// //       setRequests(transformedRequests);
// //     } catch (error) {
// //       console.error("Error fetching requests:", error);
// //       toast.error(`❌ ${t.fetchError}`);
// //     } finally {
// //       setIsFetching(false);
// //     }
// //   };

// //   // Listen for language changes in cookies
// //   useEffect(() => {
// //     const handleCookieChange = () => {
// //       const newLang = getLanguageFromCookies();
// //       if (newLang !== lang) {
// //         setLang(newLang);
// //       }
// //     };

// //     const interval = setInterval(handleCookieChange, 1000);
// //     return () => clearInterval(interval);
// //   }, [lang]);

// //   // Initial fetch
// //   useEffect(() => {
// //     fetchRequests();
// //   }, []);

// //   // Filter requests
// //   useEffect(() => {
// //     let filtered = [...requests];

// //     if (searchTerm) {
// //       const term = searchTerm.toLowerCase();
// //       filtered = filtered.filter(
// //         (req) =>
// //           req.name.toLowerCase().includes(term) ||
// //           req.email.toLowerCase().includes(term) ||
// //           req.message.toLowerCase().includes(term),
// //       );
// //     }

// //     if (filterStatus !== "all") {
// //       filtered = filtered.filter((req) => req.status === filterStatus);
// //     }

// //     setFilteredRequests(filtered);
// //   }, [requests, searchTerm, filterStatus]);

// //   // Update statistics
// //   useEffect(() => {
// //     const total = requests.length;
// //     const Pending = requests.filter((r) => r.status === "Pending").length;
// //     const Approved = requests.filter((r) => r.status === "Approved").length;
// //     const Rejected = requests.filter((r) => r.status === "Rejected").length;
// //     const Completed = requests.filter((r) => r.status === "Completed").length;

// //     setStats({ total, Pending, Approved, Rejected, Completed });
// //   }, [requests]);

// //   // Get status badge color
// //   const getStatusColor = (status: string): string => {
// //     switch (status) {
// //       case "Pending":
// //         return "bg-yellow-100 text-yellow-800";
// //       case "Approved":
// //         return "bg-green-100 text-green-800";
// //       case "Rejected":
// //         return "bg-red-100 text-red-800";
// //       case "Completed":
// //         return "bg-blue-100 text-blue-800";
// //       default:
// //         return "bg-gray-100 text-gray-800";
// //     }
// //   };

// //   // Get status label
// //   const getStatusLabel = (status: string): string => {
// //     switch (status) {
// //       case "Pending":
// //         return t.statuses.Pending;
// //       case "Approved":
// //         return t.statuses.Approved;
// //       case "Rejected":
// //         return t.statuses.Rejected;
// //       case "Completed":
// //         return t.statuses.Completed;
// //       default:
// //         return status;
// //     }
// //   };

// //   // Format date
// //   const formatDate = (dateString: string): string => {
// //     return new Date(dateString).toLocaleDateString("en-US", {
// //       year: "numeric",
// //       month: "short",
// //       day: "numeric",
// //       hour: "2-digit",
// //       minute: "2-digit",
// //     });
// //   };

// //   // CRUD Operations
// //   const handleCreateRequest = async () => {
// //     // Create request functionality removed since formData is not used
// //   };

// //   const handleSendResponse = async () => {
// //     if (!selectedRequest || !responseText.trim()) {
// //       toast.warning("⚠️ Please enter a response");
// //       return;
// //     }

// //     setIsSubmitting(true);

// //     try {
// //       const response = await fetch(`${API_URL}/${selectedRequest._id}`, {
// //         method: "PUT",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           adminReply: responseText,
// //           status: selectedStatus || selectedRequest.status,
// //         }),
// //       });

// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }

// //       const updatedRequest = await response.json();
// //       const transformedRequest = transformRequestToUI(updatedRequest);

// //       const updatedRequests = requests.map((r) =>
// //         r._id === selectedRequest._id ? transformedRequest : r
// //       );
// //       setRequests(updatedRequests);

// //       toast.success(`✅ ${t.responseSent}`);
// //       setIsRespondModalOpen(false);
// //       setSelectedRequest(null);
// //       setResponseText("");
// //       setSelectedStatus("");
// //     } catch (error) {
// //       toast.error(`❌ ${t.responseFailed}`);
// //       console.error("Response send error:", error);
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   const handleDeleteRequest = async () => {
// //     if (!selectedRequest) return;

// //     setIsLoading(true);

// //     try {
// //       const response = await fetch(`${API_URL}/${selectedRequest._id}`, {
// //         method: "DELETE",
// //       });

// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }

// //       setRequests(requests.filter((r) => r._id !== selectedRequest._id));
// //       toast.success(`🗑️ ${t.requestDeleted}`);
// //       setIsDeleteModalOpen(false);
// //       setSelectedRequest(null);
// //     } catch (error) {
// //       toast.error(`❌ ${t.deleteFailed}`);
// //       console.error("Delete request error:", error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleUpdateStatus = async (requestId: string, newStatus: string) => {
// //     try {
// //       const response = await fetch(`${API_URL}/${requestId}`, {
// //         method: "PUT",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ status: newStatus }),
// //       });

// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }

// //       const updatedRequest = await response.json();
// //       const transformedRequest = transformRequestToUI(updatedRequest);

// //       const updatedRequests = requests.map((r) =>
// //         r._id === requestId ? transformedRequest : r
// //       );
// //       setRequests(updatedRequests);

// //       toast.success(`✅ ${t.statusUpdated}`);
// //     } catch (error) {
// //       toast.error(`❌ ${t.statusUpdateFailed}`);
// //       console.error("Status update error:", error);
// //     }
// //   };

// //   // Open modals
// //   const openViewModal = (request: RequestUI) => {
// //     setSelectedRequest(request);
// //     setIsViewModalOpen(true);
// //   };

// //   const openRespondModal = (request: RequestUI) => {
// //     setSelectedRequest(request);
// //     setResponseText(request.adminReply || "");
// //     setSelectedStatus(request.status);
// //     setIsRespondModalOpen(true);
// //   };

// //   const openDeleteModal = (request: RequestUI) => {
// //     setSelectedRequest(request);
// //     setIsDeleteModalOpen(true);
// //   };

// //   // Modal variants
// //   const modalVariants = {
// //     hidden: { opacity: 0, scale: 0.8, y: 30 },
// //     visible: { opacity: 1, scale: 1, y: 0 },
// //     exit: { opacity: 0, scale: 0.8, y: 30 },
// //   };

// //   const overlayVariants = {
// //     hidden: { opacity: 0 },
// //     visible: { opacity: 1 },
// //     exit: { opacity: 0 },
// //   };

// //   if (isFetching) {
// //     return (
// //       <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="w-12 h-12 border-4 border-[#FF385C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
// //           <p className="text-gray-500">{t.loading}</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="p-6 bg-gray-50 min-h-screen">
// //       {/* Header */}
// //       <div className="mb-6">
// //         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// //           <div>
// //             <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
// //               <SupportAgentIcon className="w-7 h-7 text-[#FF385C]" />
// //               {t.requestManagement}
// //             </h1>
// //             <p className="text-sm text-gray-500 mt-1">{t.manageRequests}</p>
// //           </div>
// //           <div className="flex items-center gap-2">
// //             <button
// //               onClick={fetchRequests}
// //               className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
// //               disabled={isLoading}
// //             >
// //               <RefreshIcon
// //                 className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`}
// //               />
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Stats Cards */}
// //       <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
// //         <motion.div
// //           whileHover={{ y: -2 }}
// //           className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
// //         >
// //           <p className="text-xs text-gray-500">{t.total}</p>
// //           <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
// //         </motion.div>
// //         <motion.div
// //           whileHover={{ y: -2 }}
// //           className="bg-yellow-50 rounded-xl p-4 shadow-sm border border-yellow-200"
// //         >
// //           <p className="text-xs text-yellow-600">{t.pending}</p>
// //           <p className="text-2xl font-bold text-yellow-700">{stats.Pending}</p>
// //         </motion.div>
// //         <motion.div
// //           whileHover={{ y: -2 }}
// //           className="bg-green-50 rounded-xl p-4 shadow-sm border border-green-200"
// //         >
// //           <p className="text-xs text-green-600">{t.approved}</p>
// //           <p className="text-2xl font-bold text-green-700">{stats.Approved}</p>
// //         </motion.div>
// //         <motion.div
// //           whileHover={{ y: -2 }}
// //           className="bg-red-50 rounded-xl p-4 shadow-sm border border-red-200"
// //         >
// //           <p className="text-xs text-red-600">{t.rejected}</p>
// //           <p className="text-2xl font-bold text-red-700">{stats.Rejected}</p>
// //         </motion.div>
// //         <motion.div
// //           whileHover={{ y: -2 }}
// //           className="bg-blue-50 rounded-xl p-4 shadow-sm border border-blue-200"
// //         >
// //           <p className="text-xs text-blue-600">{t.completed}</p>
// //           <p className="text-2xl font-bold text-blue-700">{stats.Completed}</p>
// //         </motion.div>
// //       </div>

// //       {/* Filters */}
// //       <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
// //         <div className="flex flex-col sm:flex-row gap-3">
// //           <div className="flex-1 relative">
// //             <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
// //             <input
// //               type="text"
// //               placeholder={t.searchRequests}
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
// //             />
// //           </div>
// //           <div className="flex gap-2">
// //             <select
// //               value={filterStatus}
// //               onChange={(e) => setFilterStatus(e.target.value)}
// //               className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
// //             >
// //               <option value="all">{t.filters.all}</option>
// //               <option value="Pending">{t.filters.Pending}</option>
// //               <option value="Approved">{t.filters.Approved}</option>
// //               <option value="Rejected">{t.filters.Rejected}</option>
// //               <option value="Completed">{t.filters.Completed}</option>
// //             </select>
// //             <button
// //               onClick={() => {
// //                 setSearchTerm("");
// //                 setFilterStatus("all");
// //               }}
// //               className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
// //             >
// //               <ClearIcon className="w-5 h-5" />
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Requests Table */}
// //       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
// //         <div className="overflow-x-auto">
// //           <table className="w-full">
// //             <thead className="bg-gray-50 border-b border-gray-200">
// //               <tr>
// //                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   {t.request}
// //                 </th>
// //                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
// //                   {t.requester}
// //                 </th>
// //                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   {t.status}
// //                 </th>
// //                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
// //                   {t.submitted}
// //                 </th>
// //                 <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   {t.actions}
// //                 </th>
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-gray-200">
// //               {filteredRequests.length === 0 ? (
// //                 <tr>
// //                   <td
// //                     colSpan={5}
// //                     className="px-4 py-8 text-center text-gray-500"
// //                   >
// //                     <SupportAgentIcon className="w-12 h-12 mx-auto text-gray-300 mb-2" />
// //                     <p>{t.noRequests}</p>
// //                     <p className="text-sm">{t.adjustFilters}</p>
// //                   </td>
// //                 </tr>
// //               ) : (
// //                 filteredRequests.map((request) => (
// //                   <motion.tr
// //                     key={request._id}
// //                     initial={{ opacity: 0 }}
// //                     animate={{ opacity: 1 }}
// //                     className="hover:bg-gray-50 transition-colors"
// //                   >
// //                     <td className="px-4 py-3">
// //                       <div className="flex items-center gap-3">
// //                         <div className="w-10 h-10 rounded-full bg-[#FF385C] text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
// //                           {request.name.charAt(0).toUpperCase()}
// //                         </div>
// //                         <div>
// //                           <p className="font-medium text-gray-900 text-sm line-clamp-1">
// //                             {request.name}
// //                           </p>
// //                           <p className="text-xs text-gray-500 md:hidden line-clamp-1">
// //                             {request.message}
// //                           </p>
// //                         </div>
// //                       </div>
// //                     </td>
// //                     <td className="px-4 py-3 hidden md:table-cell">
// //                       <p className="text-sm text-gray-600 line-clamp-1">
// //                         {request.message}
// //                       </p>
// //                       {request.image && request.image.url && (
// //                         <div className="flex items-center gap-1 mt-1">
// //                           <ImageIcon className="w-3 h-3 text-gray-400" />
// //                           <span className="text-xs text-gray-400">
// //                             {request.image.public_id || "Image"}
// //                           </span>
// //                         </div>
// //                       )}
// //                     </td>
// //                     <td className="px-4 py-3">
// //                       <span
// //                         className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
// //                           request.status,
// //                         )}`}
// //                       >
// //                         {getStatusLabel(request.status)}
// //                       </span>
// //                     </td>
// //                     <td className="px-4 py-3 hidden lg:table-cell">
// //                       <p className="text-sm text-gray-600">
// //                         {formatDate(request.createdAt)}
// //                       </p>
// //                     </td>
// //                     <td className="px-4 py-3">
// //                       <div className="flex items-center justify-center gap-1">
// //                         <motion.button
// //                           whileHover={{ scale: 1.1 }}
// //                           whileTap={{ scale: 0.9 }}
// //                           onClick={() => openViewModal(request)}
// //                           className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
// //                           title={t.viewRequest}
// //                         >
// //                           <VisibilityIcon className="w-4 h-4" />
// //                         </motion.button>
// //                         <motion.button
// //                           whileHover={{ scale: 1.1 }}
// //                           whileTap={{ scale: 0.9 }}
// //                           onClick={() => openRespondModal(request)}
// //                           className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
// //                           title={t.respond}
// //                         >
// //                           <ChatIcon className="w-4 h-4" />
// //                         </motion.button>
// //                         <motion.button
// //                           whileHover={{ scale: 1.1 }}
// //                           whileTap={{ scale: 0.9 }}
// //                           onClick={() => openDeleteModal(request)}
// //                           className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
// //                           title={t.deleteRequest}
// //                         >
// //                           <DeleteIcon className="w-4 h-4" />
// //                         </motion.button>
// //                       </div>
// //                     </td>
// //                   </motion.tr>
// //                 ))
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //         <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
// //           <p className="text-sm text-gray-500">
// //             {t.showing} {filteredRequests.length} {t.of} {requests.length}{" "}
// //             {t.requests}
// //           </p>
// //         </div>
// //       </div>

// //       {/* View Request Modal */}
// //       <AnimatePresence>
// //         {isViewModalOpen && selectedRequest && (
// //           <>
// //             <motion.div
// //               variants={overlayVariants}
// //               initial="hidden"
// //               animate="visible"
// //               exit="exit"
// //               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
// //               onClick={() => setIsViewModalOpen(false)}
// //             />
// //             <motion.div
// //               variants={modalVariants}
// //               initial="hidden"
// //               animate="visible"
// //               exit="exit"
// //               className="fixed inset-0 z-[101] flex items-center justify-center p-4"
// //             >
// //               <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
// //                 <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
// //                   <div className="flex items-center gap-2">
// //                     <AssignmentIcon className="text-[#FF385C] w-5 h-5" />
// //                     <h2 className="text-xl font-semibold text-gray-900">
// //                       {t.requestDetails}
// //                     </h2>
// //                   </div>
// //                   <motion.button
// //                     whileHover={{ rotate: 90, scale: 1.1 }}
// //                     whileTap={{ scale: 0.9 }}
// //                     onClick={() => setIsViewModalOpen(false)}
// //                     className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
// //                   >
// //                     <CloseIcon className="w-5 h-5" />
// //                   </motion.button>
// //                 </div>

// //                 <div className="p-6 space-y-4">
// //                   {/* Requester Info */}
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                     <div>
// //                       <label className="text-xs font-medium text-gray-500">
// //                         {t.requesterName}
// //                       </label>
// //                       <p className="text-sm font-medium text-gray-900 mt-1">
// //                         {selectedRequest.name}
// //                       </p>
// //                     </div>
// //                     <div>
// //                       <label className="text-xs font-medium text-gray-500">
// //                         {t.requesterEmail}
// //                       </label>
// //                       <p className="text-sm font-medium text-gray-900 mt-1">
// //                         {selectedRequest.email}
// //                       </p>
// //                     </div>
// //                   </div>

// //                   {/* Status */}
// //                   <div>
// //                     <label className="text-xs font-medium text-gray-500">
// //                       {t.status}
// //                     </label>
// //                     <div className="mt-1">
// //                       <span
// //                         className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
// //                           selectedRequest.status,
// //                         )}`}
// //                       >
// //                         {getStatusLabel(selectedRequest.status)}
// //                       </span>
// //                     </div>
// //                   </div>

// //                   {/* Message */}
// //                   <div>
// //                     <label className="text-xs font-medium text-gray-500">
// //                       {t.requestMessage}
// //                     </label>
// //                     <div className="mt-1 p-3 bg-gray-50 rounded-lg">
// //                       <p className="text-sm text-gray-700 whitespace-pre-wrap">
// //                         {selectedRequest.message}
// //                       </p>
// //                     </div>
// //                   </div>

// //                   {/* Image */}
// //                   {selectedRequest.image && selectedRequest.image.url && (
// //                     <div>
// //                       <label className="text-xs font-medium text-gray-500">
// //                         {t.attachedImage}
// //                       </label>
// //                       <div className="mt-2">
// //                         <button
// //                           onClick={() => setIsImageModalOpen(true)}
// //                           className="relative rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
// //                         >
// //                           <img
// //                             src={selectedRequest.image.url}
// //                             alt={selectedRequest.image.public_id || "Request image"}
// //                             className="max-h-48 object-contain cursor-pointer"
// //                           />
// //                           <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
// //                             {selectedRequest.image.public_id || "Image"}
// //                           </div>
// //                         </button>
// //                       </div>
// //                     </div>
// //                   )}

// //                   {/* Admin Reply */}
// //                   {selectedRequest.adminReply && (
// //                     <div>
// //                       <label className="text-xs font-medium text-gray-500">
// //                         {t.adminReply}
// //                       </label>
// //                       <div className="mt-1 p-3 bg-green-50 rounded-lg border border-green-200">
// //                         <p className="text-sm text-gray-700 whitespace-pre-wrap">
// //                           {selectedRequest.adminReply}
// //                         </p>
// //                       </div>
// //                     </div>
// //                   )}

// //                   {/* Dates */}
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
// //                     <div>
// //                       <label className="text-xs font-medium text-gray-500">
// //                         {t.createdAt}
// //                       </label>
// //                       <p className="text-sm text-gray-900 mt-1">
// //                         {formatDate(selectedRequest.createdAt)}
// //                       </p>
// //                     </div>
// //                     <div>
// //                       <label className="text-xs font-medium text-gray-500">
// //                         {t.updatedAt}
// //                       </label>
// //                       <p className="text-sm text-gray-900 mt-1">
// //                         {formatDate(selectedRequest.updatedAt)}
// //                       </p>
// //                     </div>
// //                   </div>

// //                   <div className="flex gap-3 pt-4 border-t border-gray-200">
// //                     <motion.button
// //                       whileHover={{ scale: 1.02 }}
// //                       whileTap={{ scale: 0.98 }}
// //                       onClick={() => {
// //                         setIsViewModalOpen(false);
// //                         openRespondModal(selectedRequest);
// //                       }}
// //                       className="flex-1 px-4 py-2.5 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors flex items-center justify-center gap-2"
// //                     >
// //                       <ChatIcon className="w-4 h-4" />
// //                       {t.respond}
// //                     </motion.button>
// //                     <motion.button
// //                       whileHover={{ scale: 1.02 }}
// //                       whileTap={{ scale: 0.98 }}
// //                       onClick={() => setIsViewModalOpen(false)}
// //                       className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
// //                     >
// //                       {t.close}
// //                     </motion.button>
// //                   </div>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           </>
// //         )}
// //       </AnimatePresence>

// //       {/* Respond Modal */}
// //       <AnimatePresence>
// //         {isRespondModalOpen && selectedRequest && (
// //           <>
// //             <motion.div
// //               variants={overlayVariants}
// //               initial="hidden"
// //               animate="visible"
// //               exit="exit"
// //               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
// //               onClick={() => setIsRespondModalOpen(false)}
// //             />
// //             <motion.div
// //               variants={modalVariants}
// //               initial="hidden"
// //               animate="visible"
// //               exit="exit"
// //               className="fixed inset-0 z-[101] flex items-center justify-center p-4"
// //             >
// //               <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
// //                 <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
// //                   <div className="flex items-center gap-2">
// //                     <ChatIcon className="text-[#FF385C] w-5 h-5" />
// //                     <h2 className="text-xl font-semibold text-gray-900">
// //                       {t.replyTo} {selectedRequest.name}
// //                     </h2>
// //                   </div>
// //                   <motion.button
// //                     whileHover={{ rotate: 90, scale: 1.1 }}
// //                     whileTap={{ scale: 0.9 }}
// //                     onClick={() => setIsRespondModalOpen(false)}
// //                     className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
// //                   >
// //                     <CloseIcon className="w-5 h-5" />
// //                   </motion.button>
// //                 </div>

// //                 <div className="p-6 space-y-4">
// //                   {/* Requester Info */}
// //                   <div className="p-3 bg-gray-50 rounded-lg">
// //                     <p className="text-sm text-gray-500">
// //                       <span className="font-medium text-gray-700">From:</span>{" "}
// //                       {selectedRequest.name} ({selectedRequest.email})
// //                     </p>
// //                     <p className="text-sm text-gray-700 mt-1">
// //                       <span className="font-medium text-gray-700">
// //                         Message:
// //                       </span>{" "}
// //                       {selectedRequest.message}
// //                     </p>
// //                   </div>

// //                   {/* Status Update */}
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-1.5">
// //                       {t.updateStatus}
// //                     </label>
// //                     <select
// //                       value={selectedStatus}
// //                       onChange={(e) => setSelectedStatus(e.target.value)}
// //                       className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
// //                     >
// //                       <option value="Pending">{t.statuses.Pending}</option>
// //                       <option value="Approved">{t.statuses.Approved}</option>
// //                       <option value="Rejected">{t.statuses.Rejected}</option>
// //                       <option value="Completed">{t.statuses.Completed}</option>
// //                     </select>
// //                   </div>

// //                   {/* Response Text */}
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-1.5">
// //                       {t.responseLabel}
// //                     </label>
// //                     <textarea
// //                       value={responseText}
// //                       onChange={(e) => setResponseText(e.target.value)}
// //                       rows={5}
// //                       className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none"
// //                       placeholder={t.responsePlaceholder}
// //                     />
// //                   </div>

// //                   <div className="flex gap-3 pt-4 border-t border-gray-200">
// //                     <motion.button
// //                       whileHover={{ scale: 1.02 }}
// //                       whileTap={{ scale: 0.98 }}
// //                       onClick={handleSendResponse}
// //                       disabled={isSubmitting || !responseText.trim()}
// //                       className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 ${
// //                         isSubmitting || !responseText.trim()
// //                           ? "bg-gray-400 cursor-not-allowed"
// //                           : "bg-[#FF385C] hover:bg-[#E31C5F]"
// //                       }`}
// //                     >
// //                       {isSubmitting ? (
// //                         <>
// //                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// //                           {t.sending}
// //                         </>
// //                       ) : (
// //                         <>
// //                           <Send className="w-4 h-4" />
// //                           {t.send}
// //                         </>
// //                       )}
// //                     </motion.button>
// //                     <motion.button
// //                       whileHover={{ scale: 1.02 }}
// //                       whileTap={{ scale: 0.98 }}
// //                       onClick={() => setIsRespondModalOpen(false)}
// //                       className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
// //                     >
// //                       {t.cancel}
// //                     </motion.button>
// //                   </div>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           </>
// //         )}
// //       </AnimatePresence>

// //       {/* Delete Confirmation Modal */}
// //       <AnimatePresence>
// //         {isDeleteModalOpen && selectedRequest && (
// //           <>
// //             <motion.div
// //               variants={overlayVariants}
// //               initial="hidden"
// //               animate="visible"
// //               exit="exit"
// //               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
// //               onClick={() => {
// //                 setIsDeleteModalOpen(false);
// //                 setSelectedRequest(null);
// //               }}
// //             />
// //             <motion.div
// //               variants={modalVariants}
// //               initial="hidden"
// //               animate="visible"
// //               exit="exit"
// //               className="fixed inset-0 z-[101] flex items-center justify-center p-4"
// //             >
// //               <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white relative">
// //                 <div className="p-6">
// //                   <div className="flex items-center justify-center mb-4">
// //                     <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
// //                       <DeleteIcon className="w-8 h-8 text-red-600" />
// //                     </div>
// //                   </div>
// //                   <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
// //                     {t.deleteRequest}
// //                   </h3>
// //                   <p className="text-gray-500 text-center mb-6">
// //                     {t.deleteConfirmation}
// //                     <br />
// //                     <span className="text-sm text-gray-400">
// //                       {t.actionUndone}
// //                     </span>
// //                   </p>
// //                   <div className="flex gap-3">
// //                     <motion.button
// //                       whileHover={{ scale: 1.02 }}
// //                       whileTap={{ scale: 0.98 }}
// //                       onClick={() => {
// //                         setIsDeleteModalOpen(false);
// //                         setSelectedRequest(null);
// //                       }}
// //                       className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
// //                     >
// //                       {t.cancel}
// //                     </motion.button>
// //                     <motion.button
// //                       whileHover={{ scale: 1.02 }}
// //                       whileTap={{ scale: 0.98 }}
// //                       onClick={handleDeleteRequest}
// //                       disabled={isLoading}
// //                       className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors ${
// //                         isLoading
// //                           ? "bg-gray-400 cursor-not-allowed"
// //                           : "bg-red-600 hover:bg-red-700"
// //                       }`}
// //                     >
// //                       {isLoading ? (
// //                         <span className="flex items-center justify-center gap-2">
// //                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// //                           {t.deleting}
// //                         </span>
// //                       ) : (
// //                         t.delete
// //                       )}
// //                     </motion.button>
// //                   </div>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           </>
// //         )}
// //       </AnimatePresence>

// //       {/* Image Preview Modal */}
// //       <AnimatePresence>
// //         {isImageModalOpen && selectedRequest?.image?.url && (
// //           <>
// //             <motion.div
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               exit={{ opacity: 0 }}
// //               className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]"
// //               onClick={() => setIsImageModalOpen(false)}
// //             />
// //             <motion.div
// //               initial={{ opacity: 0, scale: 0.9 }}
// //               animate={{ opacity: 1, scale: 1 }}
// //               exit={{ opacity: 0, scale: 0.9 }}
// //               className="fixed inset-0 z-[201] flex items-center justify-center p-4"
// //             >
// //               <div className="relative max-w-4xl max-h-[90vh]">
// //                 <button
// //                   onClick={() => setIsImageModalOpen(false)}
// //                   className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
// //                 >
// //                   <Close className="w-8 h-8" />
// //                 </button>
// //                 <img
// //                   src={selectedRequest.image.url}
// //                   alt={selectedRequest.image.public_id || "Request image"}
// //                   className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
// //                 />
// //                 <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-sm px-4 py-2 rounded-lg">
// //                   {selectedRequest.image.public_id || "Image"}
// //                   {selectedRequest.image.format && ` (${selectedRequest.image.format})`}
// //                 </div>
// //               </div>
// //             </motion.div>
// //           </>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // };

// /* eslint-disable react-hooks/set-state-in-effect */
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Cookies from "js-cookie";

// // Material-UI Icons
// import SupportAgentIcon from "@mui/icons-material/SupportAgent";
// import CloseIcon from "@mui/icons-material/Close";
// import SearchIcon from "@mui/icons-material/Search";
// import RefreshIcon from "@mui/icons-material/Refresh";
// import DeleteIcon from "@mui/icons-material/Delete";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import ImageIcon from "@mui/icons-material/Image";
// import ClearIcon from "@mui/icons-material/Clear";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import ChatIcon from "@mui/icons-material/Chat";
// import { Close, Send } from "@mui/icons-material";

// // Types - Updated to match the request model
// interface RequestImage {
//   public_id: string | null;
//   url: string | null;
//   format: string | null;
// }

// interface RequestNotification {
//   notificationId: string;
//   type: string | null;
//   message: string | null;
//   targetRoles: ("admin" | "user" | "host")[];
//   createdAt: string;
// }

// interface Request {
//   _id: string;
//   name: string;
//   email: string;
//   message: string;
//   language: string;
//   image: RequestImage;
//   status: "Pending" | "Approved" | "Rejected" | "Completed";
//   adminReply: string;
//   userId: string | null;
//   notificationId: string | null;
//   notifications: RequestNotification[];
//   lastNotification: {
//     type: string | null;
//     message: string | null;
//     status: "new" | "read" | "archived";
//     createdAt: string | null;
//   } | null;
//   createdAt: string;
//   updatedAt: string;
//   hasNotification?: boolean;
// }

// // Extended type for UI purposes
// interface RequestUI extends Request {
//   // UI-specific fields
//   response: string;
//   respondedBy: string;
//   statusLabel: string;
//   statusColor: string;
//   displayImage?: {
//     name: string;
//     size: number;
//     type: string;
//     dataUrl: string;
//   };
// }

// // Translations
// const translations = {
//   en: {
//     requestManagement: "Request Management",
//     manageRequests: "Manage support requests and assistance inquiries",
//     total: "Total",
//     pending: "Pending",
//     approved: "Approved",
//     rejected: "Rejected",
//     completed: "Completed",
//     searchRequests: "Search by name, email, or message...",
//     allStatus: "All Status",
//     request: "Request",
//     requester: "Requester",
//     message: "Message",
//     status: "Status",
//     submitted: "Submitted",
//     actions: "Actions",
//     noRequests: "No requests found",
//     adjustFilters: "Try adjusting your search or filters",
//     showing: "Showing",
//     of: "of",
//     requests: "requests",
//     viewRequest: "View Request",
//     respond: "Respond",
//     deleteRequest: "Delete Request",
//     deleteConfirmation: "Are you sure you want to delete this request?",
//     actionUndone: "This action cannot be undone.",
//     cancel: "Cancel",
//     delete: "Delete",
//     deleting: "Deleting...",
//     requestDeleted: "Request deleted successfully!",
//     deleteFailed: "Failed to delete request",
//     statusUpdated: "Request status updated successfully!",
//     statusUpdateFailed: "Failed to update request status",
//     responseSent: "Response sent successfully!",
//     responseFailed: "Failed to send response",
//     requestDetails: "Request Details",
//     requesterName: "Requester Name",
//     requesterEmail: "Requester Email",
//     requestMessage: "Request Message",
//     attachedImage: "Attached Image",
//     responseLabel: "Response",
//     sendResponse: "Send Response",
//     updateStatus: "Update Status",
//     selectStatus: "Select Status",
//     responsePlaceholder: "Type your response here...",
//     noImage: "No image attached",
//     viewImage: "View Image",
//     close: "Close",
//     send: "Send",
//     sending: "Sending...",
//     loading: "Loading...",
//     fetchError: "Failed to load requests",
//     nameRequired: "Name is required",
//     nameMinLength: "Name must be at least 2 characters",
//     emailRequired: "Email is required",
//     emailInvalid: "Please enter a valid email",
//     messageRequired: "Message is required",
//     messageMinLength: "Message must be at least 10 characters",
//     messageMaxLength: "Message cannot exceed 1000 characters",
//     allFieldsValid: "All fields are valid!",
//     pleaseFixErrors: "Please fix the errors above",
//     replyTo: "Reply to",
//     createdAt: "Created At",
//     updatedAt: "Updated At",
//     language: "Language",
//     adminReply: "Admin Reply",
//     statuses: {
//       Pending: "Pending",
//       Approved: "Approved",
//       Rejected: "Rejected",
//       Completed: "Completed",
//     },
//     filters: {
//       all: "All Status",
//       Pending: "Pending",
//       Approved: "Approved",
//       Rejected: "Rejected",
//       Completed: "Completed",
//     },
//   },
//   fr: {
//     requestManagement: "Gestion des Demandes",
//     manageRequests:
//       "Gérer les demandes de support et les demandes d'assistance",
//     total: "Total",
//     pending: "En Attente",
//     approved: "Approuvé",
//     rejected: "Rejeté",
//     completed: "Terminé",
//     searchRequests: "Rechercher par nom, email ou message...",
//     allStatus: "Tous les Statuts",
//     request: "Demande",
//     requester: "Demandeur",
//     message: "Message",
//     status: "Statut",
//     submitted: "Soumis",
//     actions: "Actions",
//     noRequests: "Aucune demande trouvée",
//     adjustFilters: "Essayez d'ajuster votre recherche ou vos filtres",
//     showing: "Affichage",
//     of: "de",
//     requests: "demandes",
//     viewRequest: "Voir la Demande",
//     respond: "Répondre",
//     deleteRequest: "Supprimer la Demande",
//     deleteConfirmation: "Êtes-vous sûr de vouloir supprimer cette demande ?",
//     actionUndone: "Cette action est irréversible.",
//     cancel: "Annuler",
//     delete: "Supprimer",
//     deleting: "Suppression...",
//     requestDeleted: "Demande supprimée avec succès !",
//     deleteFailed: "Échec de la suppression de la demande",
//     statusUpdated: "Statut de la demande mis à jour avec succès !",
//     statusUpdateFailed: "Échec de la mise à jour du statut",
//     responseSent: "Réponse envoyée avec succès !",
//     responseFailed: "Échec de l'envoi de la réponse",
//     requestDetails: "Détails de la Demande",
//     requesterName: "Nom du Demandeur",
//     requesterEmail: "Email du Demandeur",
//     requestMessage: "Message de la Demande",
//     attachedImage: "Image Jointe",
//     responseLabel: "Réponse",
//     sendResponse: "Envoyer la Réponse",
//     updateStatus: "Mettre à Jour le Statut",
//     selectStatus: "Sélectionner le Statut",
//     responsePlaceholder: "Tapez votre réponse ici...",
//     noImage: "Aucune image jointe",
//     viewImage: "Voir l'Image",
//     close: "Fermer",
//     send: "Envoyer",
//     sending: "Envoi en cours...",
//     loading: "Chargement...",
//     fetchError: "Échec du chargement des demandes",
//     nameRequired: "Le nom est requis",
//     nameMinLength: "Le nom doit contenir au moins 2 caractères",
//     emailRequired: "L'email est requis",
//     emailInvalid: "Veuillez entrer un email valide",
//     messageRequired: "Le message est requis",
//     messageMinLength: "Le message doit contenir au moins 10 caractères",
//     messageMaxLength: "Le message ne peut pas dépasser 1000 caractères",
//     allFieldsValid: "Tous les champs sont valides !",
//     pleaseFixErrors: "Veuillez corriger les erreurs ci-dessus",
//     replyTo: "Répondre à",
//     createdAt: "Créé le",
//     updatedAt: "Mis à jour le",
//     language: "Langue",
//     adminReply: "Réponse Admin",
//     statuses: {
//       Pending: "En Attente",
//       Approved: "Approuvé",
//       Rejected: "Rejeté",
//       Completed: "Terminé",
//     },
//     filters: {
//       all: "Tous les Statuts",
//       Pending: "En Attente",
//       Approved: "Approuvé",
//       Rejected: "Rejeté",
//       Completed: "Terminé",
//     },
//   },
//   rw: {
//     requestManagement: "Gucunga Ibyifuzo",
//     manageRequests: "Gucunga ibyifuzo by'ubufasha n'ibibazo",
//     total: "Yose",
//     pending: "Bitegereje",
//     approved: "Byemewe",
//     rejected: "Byangijwe",
//     completed: "Byarangiye",
//     searchRequests: "Shakisha ukurikije izina, imeri cyangwa ubutumwa...",
//     allStatus: "Ihagaze Ryose",
//     request: "Icyifuzo",
//     requester: "Usabye",
//     message: "Ubutumwa",
//     status: "Ihagaze",
//     submitted: "Byoherejwe",
//     actions: "Ibikorwa",
//     noRequests: "Nta cyifuzo cyabonetse",
//     adjustFilters: "Gerageza guhindura uburyo ushakisha cyangwa amatungo",
//     showing: "Bereka",
//     of: "muri",
//     requests: "ibyifuzo",
//     viewRequest: "Reba Icyifuzo",
//     respond: "Subiza",
//     deleteRequest: "Kuraho Icyifuzo",
//     deleteConfirmation: "Uri kwizera ko ushaka gukuraho iki cyifuzo?",
//     actionUndone: "Iki gikorwa ntikishobora guhindurwa.",
//     cancel: "Reka",
//     delete: "Kuraho",
//     deleting: "Birakurwaho...",
//     requestDeleted: "Icyifuzo cyakuweho neza!",
//     deleteFailed: "Kuraho icyifuzo birananiranye",
//     statusUpdated: "Ihagaze ry'icyifuzo ryavuguruwe neza!",
//     statusUpdateFailed: "Kuvugurura ihagaze birananiranye",
//     responseSent: "Igisubizo cyoherejwe neza!",
//     responseFailed: "Kohereza igisubizo birananiranye",
//     requestDetails: "Ibisobanuro by'Icyifuzo",
//     requesterName: "Izina ry'Usabye",
//     requesterEmail: "Imeri y'Usabye",
//     requestMessage: "Ubutumwa bw'Icyifuzo",
//     attachedImage: "Ishusho Yashyizweho",
//     responseLabel: "Igisubizo",
//     sendResponse: "Ohereza Igisubizo",
//     updateStatus: "Vugurura Ihagaze",
//     selectStatus: "Hitamo Ihagaze",
//     responsePlaceholder: "Andika igisubizo cyawe hano...",
//     noImage: "Nta shusho yashyizweho",
//     viewImage: "Reba Ishusho",
//     close: "Funga",
//     send: "Ohereza",
//     sending: "Biremereza...",
//     loading: "Birakoreshwa...",
//     fetchError: "Kubura ibyifuzo birananiranye",
//     nameRequired: "Izina rirasabwa",
//     nameMinLength: "Izina rigomba kuba ibinyuguti 2 byibuze",
//     emailRequired: "Imeri irasabwa",
//     emailInvalid: "Andika imeri ikwiye",
//     messageRequired: "Ubutumwa burasabwa",
//     messageMinLength: "Ubutumwa bugomba kuba ibinyuguti 10 byibuze",
//     messageMaxLength: "Ubutumwa ntibugomba kurenga ibinyuguti 1000",
//     allFieldsValid: "Ibice byose birimo amakuru akwiye!",
//     pleaseFixErrors: "Kosora amakosa hejuru",
//     replyTo: "Subiza kuri",
//     createdAt: "Byakozwe",
//     updatedAt: "Byavuguruwe",
//     language: "Ururimi",
//     adminReply: "Igisubizo cy'Admin",
//     statuses: {
//       Pending: "Bitegereje",
//       Approved: "Byemewe",
//       Rejected: "Byangijwe",
//       Completed: "Byarangiye",
//     },
//     filters: {
//       all: "Ihagaze Ryose",
//       Pending: "Bitegereje",
//       Approved: "Byemewe",
//       Rejected: "Byangijwe",
//       Completed: "Byarangiye",
//     },
//   },
// };

// // Helper function to get language from cookies
// const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
//   const lang = Cookies.get("language") as "en" | "fr" | "rw";
//   return lang || "en";
// };

// // API Base URL
// const API_URL = "https://rene-inyumba-nodejs.onrender.com/requests";

// // Helper function to transform request to UI format
// const transformRequestToUI = (request: Request): RequestUI => {
//   const statusColors: Record<string, string> = {
//     Pending: "bg-yellow-100 text-yellow-800",
//     Approved: "bg-green-100 text-green-800",
//     Rejected: "bg-red-100 text-red-800",
//     Completed: "bg-blue-100 text-blue-800",
//   };

//   const statusLabels: Record<string, string> = {
//     Pending: "Pending",
//     Approved: "Approved",
//     Rejected: "Rejected",
//     Completed: "Completed",
//   };

//   // Check if there's an image URL
//   let displayImage = undefined;
//   if (request.image && request.image.url) {
//     displayImage = {
//       name: request.image.public_id || "image",
//       size: 0,
//       type: request.image.format || "image/jpeg",
//       dataUrl: request.image.url,
//     };
//   }

//   return {
//     ...request,
//     response: request.adminReply || "",
//     respondedBy: "Admin",
//     statusLabel: statusLabels[request.status] || request.status,
//     statusColor: statusColors[request.status] || "bg-gray-100 text-gray-800",
//     displayImage,
//   };
// };

// export const RequestManagement: React.FC = () => {
//   // Get language from cookies
//   const [lang, setLang] = useState<"en" | "fr" | "rw">(
//     getLanguageFromCookies(),
//   );
//   const [requests, setRequests] = useState<RequestUI[]>([]);
//   const [filteredRequests, setFilteredRequests] = useState<RequestUI[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState<string>("all");

//   // Modal states
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [isRespondModalOpen, setIsRespondModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [selectedRequest, setSelectedRequest] = useState<RequestUI | null>(
//     null,
//   );
//   const [responseText, setResponseText] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState<string>("");
//   const [isImageModalOpen, setIsImageModalOpen] = useState(false);

//   // Loading states
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isFetching, setIsFetching] = useState(true);

//   // Statistics
//   const [stats, setStats] = useState({
//     total: 0,
//     Pending: 0,
//     Approved: 0,
//     Rejected: 0,
//     Completed: 0,
//   });

//   const t = translations[lang];

//   // Fetch requests from API
//   const fetchRequests = async () => {
//     setIsFetching(true);
//     try {
//       const response = await fetch(API_URL);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();

//       // Handle both array and single object responses
//       let requestsData: Request[] = [];
//       if (Array.isArray(data)) {
//         requestsData = data;
//       } else if (data && typeof data === "object") {
//         if (data._id) {
//           requestsData = [data];
//         } else if (data.data && Array.isArray(data.data)) {
//           requestsData = data.data;
//         } else if (data.requests && Array.isArray(data.requests)) {
//           requestsData = data.requests;
//         } else {
//           const possibleArrays = Object.values(data).filter((val) =>
//             Array.isArray(val),
//           );
//           if (possibleArrays.length > 0) {
//             requestsData = possibleArrays[0];
//           }
//         }
//       }

//       const transformedRequests = requestsData.map((req: Request) =>
//         transformRequestToUI(req),
//       );
//       setRequests(transformedRequests);
//     } catch (error) {
//       console.error("Error fetching requests:", error);
//       toast.error(`❌ ${t.fetchError}`);
//     } finally {
//       setIsFetching(false);
//     }
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
//     fetchRequests();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // Filter requests
//   useEffect(() => {
//     let filtered = [...requests];

//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       filtered = filtered.filter(
//         (req) =>
//           req.name.toLowerCase().includes(term) ||
//           req.email.toLowerCase().includes(term) ||
//           req.message.toLowerCase().includes(term),
//       );
//     }

//     if (filterStatus !== "all") {
//       filtered = filtered.filter((req) => req.status === filterStatus);
//     }

//     setFilteredRequests(filtered);
//   }, [requests, searchTerm, filterStatus]);

//   // Update statistics
//   useEffect(() => {
//     const total = requests.length;
//     const Pending = requests.filter((r) => r.status === "Pending").length;
//     const Approved = requests.filter((r) => r.status === "Approved").length;
//     const Rejected = requests.filter((r) => r.status === "Rejected").length;
//     const Completed = requests.filter((r) => r.status === "Completed").length;

//     setStats({ total, Pending, Approved, Rejected, Completed });
//   }, [requests]);

//   // Get status badge color
//   const getStatusColor = (status: string): string => {
//     switch (status) {
//       case "Pending":
//         return "bg-yellow-100 text-yellow-800";
//       case "Approved":
//         return "bg-green-100 text-green-800";
//       case "Rejected":
//         return "bg-red-100 text-red-800";
//       case "Completed":
//         return "bg-blue-100 text-blue-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   // Get status label
//   const getStatusLabel = (status: string): string => {
//     switch (status) {
//       case "Pending":
//         return t.statuses.Pending;
//       case "Approved":
//         return t.statuses.Approved;
//       case "Rejected":
//         return t.statuses.Rejected;
//       case "Completed":
//         return t.statuses.Completed;
//       default:
//         return status;
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

//   const handleSendResponse = async () => {
//     if (!selectedRequest || !responseText.trim()) {
//       toast.warning("⚠️ Please enter a response");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const response = await fetch(`${API_URL}/${selectedRequest._id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           adminReply: responseText,
//           status: selectedStatus || selectedRequest.status,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const updatedRequest = await response.json();
//       const transformedRequest = transformRequestToUI(updatedRequest);

//       const updatedRequests = requests.map((r) =>
//         r._id === selectedRequest._id ? transformedRequest : r,
//       );
//       setRequests(updatedRequests);

//       toast.success(`✅ ${t.responseSent}`);
//       setIsRespondModalOpen(false);
//       setSelectedRequest(null);
//       setResponseText("");
//       setSelectedStatus("");
//     } catch (error) {
//       toast.error(`❌ ${t.responseFailed}`);
//       console.error("Response send error:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDeleteRequest = async () => {
//     if (!selectedRequest) return;

//     setIsLoading(true);

//     try {
//       const response = await fetch(`${API_URL}/${selectedRequest._id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       setRequests(requests.filter((r) => r._id !== selectedRequest._id));
//       toast.success(`🗑️ ${t.requestDeleted}`);
//       setIsDeleteModalOpen(false);
//       setSelectedRequest(null);
//     } catch (error) {
//       toast.error(`❌ ${t.deleteFailed}`);
//       console.error("Delete request error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Open modals
//   const openViewModal = (request: RequestUI) => {
//     setSelectedRequest(request);
//     setIsViewModalOpen(true);
//   };

//   const openRespondModal = (request: RequestUI) => {
//     setSelectedRequest(request);
//     setResponseText(request.adminReply || "");
//     setSelectedStatus(request.status);
//     setIsRespondModalOpen(true);
//   };

//   const openDeleteModal = (request: RequestUI) => {
//     setSelectedRequest(request);
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
//               <SupportAgentIcon className="w-7 h-7 text-[#FF385C]" />
//               {t.requestManagement}
//             </h1>
//             <p className="text-sm text-gray-500 mt-1">{t.manageRequests}</p>
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={fetchRequests}
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
//           <p className="text-2xl font-bold text-yellow-700">{stats.Pending}</p>
//         </motion.div>
//         <motion.div
//           whileHover={{ y: -2 }}
//           className="bg-green-50 rounded-xl p-4 shadow-sm border border-green-200"
//         >
//           <p className="text-xs text-green-600">{t.approved}</p>
//           <p className="text-2xl font-bold text-green-700">{stats.Approved}</p>
//         </motion.div>
//         <motion.div
//           whileHover={{ y: -2 }}
//           className="bg-red-50 rounded-xl p-4 shadow-sm border border-red-200"
//         >
//           <p className="text-xs text-red-600">{t.rejected}</p>
//           <p className="text-2xl font-bold text-red-700">{stats.Rejected}</p>
//         </motion.div>
//         <motion.div
//           whileHover={{ y: -2 }}
//           className="bg-blue-50 rounded-xl p-4 shadow-sm border border-blue-200"
//         >
//           <p className="text-xs text-blue-600">{t.completed}</p>
//           <p className="text-2xl font-bold text-blue-700">{stats.Completed}</p>
//         </motion.div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
//         <div className="flex flex-col sm:flex-row gap-3">
//           <div className="flex-1 relative">
//             <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder={t.searchRequests}
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//             />
//           </div>
//           <div className="flex gap-2">
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//             >
//               <option value="all">{t.filters.all}</option>
//               <option value="Pending">{t.filters.Pending}</option>
//               <option value="Approved">{t.filters.Approved}</option>
//               <option value="Rejected">{t.filters.Rejected}</option>
//               <option value="Completed">{t.filters.Completed}</option>
//             </select>
//             <button
//               onClick={() => {
//                 setSearchTerm("");
//                 setFilterStatus("all");
//               }}
//               className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               <ClearIcon className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Requests Table */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   {t.request}
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
//                   {t.requester}
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   {t.status}
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
//                   {t.submitted}
//                 </th>
//                 <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   {t.actions}
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredRequests.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={5}
//                     className="px-4 py-8 text-center text-gray-500"
//                   >
//                     <SupportAgentIcon className="w-12 h-12 mx-auto text-gray-300 mb-2" />
//                     <p>{t.noRequests}</p>
//                     <p className="text-sm">{t.adjustFilters}</p>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredRequests.map((request) => (
//                   <motion.tr
//                     key={request._id}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="hover:bg-gray-50 transition-colors"
//                   >
//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-full bg-[#FF385C] text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
//                           {request.name.charAt(0).toUpperCase()}
//                         </div>
//                         <div>
//                           <p className="font-medium text-gray-900 text-sm line-clamp-1">
//                             {request.name}
//                           </p>
//                           <p className="text-xs text-gray-500 md:hidden line-clamp-1">
//                             {request.message}
//                           </p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 hidden md:table-cell">
//                       <p className="text-sm text-gray-600 line-clamp-1">
//                         {request.message}
//                       </p>
//                       {request.image && request.image.url && (
//                         <div className="flex items-center gap-1 mt-1">
//                           <ImageIcon className="w-3 h-3 text-gray-400" />
//                           <span className="text-xs text-gray-400">
//                             {request.image.public_id || "Image"}
//                           </span>
//                         </div>
//                       )}
//                     </td>
//                     <td className="px-4 py-3">
//                       <span
//                         className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
//                           request.status,
//                         )}`}
//                       >
//                         {getStatusLabel(request.status)}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 hidden lg:table-cell">
//                       <p className="text-sm text-gray-600">
//                         {formatDate(request.createdAt)}
//                       </p>
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex items-center justify-center gap-1">
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={() => openViewModal(request)}
//                           className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                           title={t.viewRequest}
//                         >
//                           <VisibilityIcon className="w-4 h-4" />
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={() => openRespondModal(request)}
//                           className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
//                           title={t.respond}
//                         >
//                           <ChatIcon className="w-4 h-4" />
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={() => openDeleteModal(request)}
//                           className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                           title={t.deleteRequest}
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
//             {t.showing} {filteredRequests.length} {t.of} {requests.length}{" "}
//             {t.requests}
//           </p>
//         </div>
//       </div>

//       {/* View Request Modal */}
//       <AnimatePresence>
//         {isViewModalOpen && selectedRequest && (
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
//               <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
//                 <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
//                   <div className="flex items-center gap-2">
//                     <AssignmentIcon className="text-[#FF385C] w-5 h-5" />
//                     <h2 className="text-xl font-semibold text-gray-900">
//                       {t.requestDetails}
//                     </h2>
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

//                 <div className="p-6 space-y-4">
//                   {/* Requester Info */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">
//                         {t.requesterName}
//                       </label>
//                       <p className="text-sm font-medium text-gray-900 mt-1">
//                         {selectedRequest.name}
//                       </p>
//                     </div>
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">
//                         {t.requesterEmail}
//                       </label>
//                       <p className="text-sm font-medium text-gray-900 mt-1">
//                         {selectedRequest.email}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Status */}
//                   <div>
//                     <label className="text-xs font-medium text-gray-500">
//                       {t.status}
//                     </label>
//                     <div className="mt-1">
//                       <span
//                         className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
//                           selectedRequest.status,
//                         )}`}
//                       >
//                         {getStatusLabel(selectedRequest.status)}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Message */}
//                   <div>
//                     <label className="text-xs font-medium text-gray-500">
//                       {t.requestMessage}
//                     </label>
//                     <div className="mt-1 p-3 bg-gray-50 rounded-lg">
//                       <p className="text-sm text-gray-700 whitespace-pre-wrap">
//                         {selectedRequest.message}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Image */}
//                   {selectedRequest.image && selectedRequest.image.url && (
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">
//                         {t.attachedImage}
//                       </label>
//                       <div className="mt-2">
//                         <button
//                           onClick={() => setIsImageModalOpen(true)}
//                           className="relative rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
//                         >
//                           <img
//                             src={selectedRequest.image.url}
//                             alt={
//                               selectedRequest.image.public_id || "Request image"
//                             }
//                             className="max-h-48 object-contain cursor-pointer"
//                           />
//                           <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
//                             {selectedRequest.image.public_id || "Image"}
//                           </div>
//                         </button>
//                       </div>
//                     </div>
//                   )}

//                   {/* Admin Reply */}
//                   {selectedRequest.adminReply && (
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">
//                         {t.adminReply}
//                       </label>
//                       <div className="mt-1 p-3 bg-green-50 rounded-lg border border-green-200">
//                         <p className="text-sm text-gray-700 whitespace-pre-wrap">
//                           {selectedRequest.adminReply}
//                         </p>
//                       </div>
//                     </div>
//                   )}

//                   {/* Dates */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">
//                         {t.createdAt}
//                       </label>
//                       <p className="text-sm text-gray-900 mt-1">
//                         {formatDate(selectedRequest.createdAt)}
//                       </p>
//                     </div>
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">
//                         {t.updatedAt}
//                       </label>
//                       <p className="text-sm text-gray-900 mt-1">
//                         {formatDate(selectedRequest.updatedAt)}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex gap-3 pt-4 border-t border-gray-200">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => {
//                         setIsViewModalOpen(false);
//                         openRespondModal(selectedRequest);
//                       }}
//                       className="flex-1 px-4 py-2.5 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors flex items-center justify-center gap-2"
//                     >
//                       <ChatIcon className="w-4 h-4" />
//                       {t.respond}
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

//       {/* Respond Modal */}
//       <AnimatePresence>
//         {isRespondModalOpen && selectedRequest && (
//           <>
//             <motion.div
//               variants={overlayVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
//               onClick={() => setIsRespondModalOpen(false)}
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
//                     <ChatIcon className="text-[#FF385C] w-5 h-5" />
//                     <h2 className="text-xl font-semibold text-gray-900">
//                       {t.replyTo} {selectedRequest.name}
//                     </h2>
//                   </div>
//                   <motion.button
//                     whileHover={{ rotate: 90, scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => setIsRespondModalOpen(false)}
//                     className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
//                   >
//                     <CloseIcon className="w-5 h-5" />
//                   </motion.button>
//                 </div>

//                 <div className="p-6 space-y-4">
//                   {/* Requester Info */}
//                   <div className="p-3 bg-gray-50 rounded-lg">
//                     <p className="text-sm text-gray-500">
//                       <span className="font-medium text-gray-700">From:</span>{" "}
//                       {selectedRequest.name} ({selectedRequest.email})
//                     </p>
//                     <p className="text-sm text-gray-700 mt-1">
//                       <span className="font-medium text-gray-700">
//                         Message:
//                       </span>{" "}
//                       {selectedRequest.message}
//                     </p>
//                   </div>

//                   {/* Status Update */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                       {t.updateStatus}
//                     </label>
//                     <select
//                       value={selectedStatus}
//                       onChange={(e) => setSelectedStatus(e.target.value)}
//                       className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//                     >
//                       <option value="Pending">{t.statuses.Pending}</option>
//                       <option value="Approved">{t.statuses.Approved}</option>
//                       <option value="Rejected">{t.statuses.Rejected}</option>
//                       <option value="Completed">{t.statuses.Completed}</option>
//                     </select>
//                   </div>

//                   {/* Response Text */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                       {t.responseLabel}
//                     </label>
//                     <textarea
//                       value={responseText}
//                       onChange={(e) => setResponseText(e.target.value)}
//                       rows={5}
//                       className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none"
//                       placeholder={t.responsePlaceholder}
//                     />
//                   </div>

//                   <div className="flex gap-3 pt-4 border-t border-gray-200">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handleSendResponse}
//                       disabled={isSubmitting || !responseText.trim()}
//                       className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 ${
//                         isSubmitting || !responseText.trim()
//                           ? "bg-gray-400 cursor-not-allowed"
//                           : "bg-[#FF385C] hover:bg-[#E31C5F]"
//                       }`}
//                     >
//                       {isSubmitting ? (
//                         <>
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           {t.sending}
//                         </>
//                       ) : (
//                         <>
//                           <Send className="w-4 h-4" />
//                           {t.send}
//                         </>
//                       )}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => setIsRespondModalOpen(false)}
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
//       <AnimatePresence>
//         {isDeleteModalOpen && selectedRequest && (
//           <>
//             <motion.div
//               variants={overlayVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
//               onClick={() => {
//                 setIsDeleteModalOpen(false);
//                 setSelectedRequest(null);
//               }}
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
//                     {t.deleteRequest}
//                   </h3>
//                   <p className="text-gray-500 text-center mb-6">
//                     {t.deleteConfirmation}
//                     <br />
//                     <span className="text-sm text-gray-400">
//                       {t.actionUndone}
//                     </span>
//                   </p>
//                   <div className="flex gap-3">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => {
//                         setIsDeleteModalOpen(false);
//                         setSelectedRequest(null);
//                       }}
//                       className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
//                     >
//                       {t.cancel}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handleDeleteRequest}
//                       disabled={isLoading}
//                       className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors ${
//                         isLoading
//                           ? "bg-gray-400 cursor-not-allowed"
//                           : "bg-red-600 hover:bg-red-700"
//                       }`}
//                     >
//                       {isLoading ? (
//                         <span className="flex items-center justify-center gap-2">
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           {t.deleting}
//                         </span>
//                       ) : (
//                         t.delete
//                       )}
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Image Preview Modal */}
//       <AnimatePresence>
//         {isImageModalOpen && selectedRequest?.image?.url && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]"
//               onClick={() => setIsImageModalOpen(false)}
//             />
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               className="fixed inset-0 z-[201] flex items-center justify-center p-4"
//             >
//               <div className="relative max-w-4xl max-h-[90vh]">
//                 <button
//                   onClick={() => setIsImageModalOpen(false)}
//                   className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
//                 >
//                   <Close className="w-8 h-8" />
//                 </button>
//                 <img
//                   src={selectedRequest.image.url}
//                   alt={selectedRequest.image.public_id || "Request image"}
//                   className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
//                 />
//                 <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-sm px-4 py-2 rounded-lg">
//                   {selectedRequest.image.public_id || "Image"}
//                   {selectedRequest.image.format &&
//                     ` (${selectedRequest.image.format})`}
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };




/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

// Material-UI Icons
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ImageIcon from "@mui/icons-material/Image";
import ClearIcon from "@mui/icons-material/Clear";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ChatIcon from "@mui/icons-material/Chat";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { Close, Send } from "@mui/icons-material";

// Types - Updated to match the request model
interface RequestImage {
  public_id: string | null;
  url: string | null;
  format: string | null;
}

interface RequestNotification {
  notificationId: string;
  type: string | null;
  message: string | null;
  targetRoles: ("admin" | "user" | "host")[];
  createdAt: string;
}

interface Request {
  _id: string;
  name: string;
  email: string;
  message: string;
  language: string;
  image: RequestImage;
  status: "Pending" | "Approved" | "Rejected" | "Completed";
  adminReply: string;
  userId: string | null;
  notificationId: string | null;
  notifications: RequestNotification[];
  lastNotification: {
    type: string | null;
    message: string | null;
    status: "new" | "read" | "archived";
    createdAt: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  hasNotification?: boolean;
}

// Extended type for UI purposes
interface RequestUI extends Request {
  // UI-specific fields
  response: string;
  respondedBy: string;
  statusLabel: string;
  statusColor: string;
  displayImage?: {
    name: string;
    size: number;
    type: string;
    dataUrl: string;
  };
}

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
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-600" />
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border-4 border-green-200 animate-ping opacity-75" />
              <CheckCircleIcon className="w-10 h-10 text-green-600 relative z-10" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">{title}</h3>
          <p className="text-gray-600 text-center mb-2">{message}</p>
          {details && <p className="text-sm text-gray-400 text-center mb-6">{details}</p>}
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
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
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-red-600" />
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border-4 border-red-200 animate-ping opacity-75" />
              <ErrorIcon className="w-10 h-10 text-red-600 relative z-10" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">{title}</h3>
          <p className="text-gray-600 text-center mb-2">{message}</p>
          {details && <p className="text-sm text-gray-400 text-center mb-6">{details}</p>}
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
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
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className={`absolute top-0 left-0 right-0 h-1 ${colors.buttonBg}`} />
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <div className={`w-20 h-20 ${colors.iconBg} rounded-full flex items-center justify-center relative`}>
              <div className={`absolute inset-0 rounded-full border-4 ${colors.iconBorder} animate-ping opacity-75`} />
              <div className={`${colors.iconColor} relative z-10`}>
                {icon || (
                  type === "danger" ? <DeleteIcon className="w-10 h-10" /> :
                  type === "warning" ? <ErrorIcon className="w-10 h-10" /> :
                  type === "success" ? <CheckCircleIcon className="w-10 h-10" /> :
                  <SupportAgentIcon className="w-10 h-10" />
                )}
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">{title}</h3>
          <p className="text-gray-600 text-center mb-6">{message}</p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              disabled={isSubmitting}
              className={`flex-1 px-4 py-2.5 ${colors.buttonBg} text-white rounded-xl font-medium ${colors.buttonHover} transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2`}
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

// Translations
const translations = {
  en: {
    requestManagement: "Request Management",
    manageRequests: "Manage support requests and assistance inquiries",
    total: "Total",
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    completed: "Completed",
    searchRequests: "Search by name, email, or message...",
    allStatus: "All Status",
    request: "Request",
    requester: "Requester",
    message: "Message",
    status: "Status",
    submitted: "Submitted",
    actions: "Actions",
    noRequests: "No requests found",
    adjustFilters: "Try adjusting your search or filters",
    showing: "Showing",
    of: "of",
    requests: "requests",
    viewRequest: "View Request",
    respond: "Respond",
    deleteRequest: "Delete Request",
    deleteConfirmation: "Are you sure you want to delete this request?",
    actionUndone: "This action cannot be undone.",
    cancel: "Cancel",
    delete: "Delete",
    deleting: "Deleting...",
    requestDeleted: "Request deleted successfully!",
    deleteFailed: "Failed to delete request",
    statusUpdated: "Request status updated successfully!",
    statusUpdateFailed: "Failed to update request status",
    responseSent: "Response sent successfully!",
    responseFailed: "Failed to send response",
    requestDetails: "Request Details",
    requesterName: "Requester Name",
    requesterEmail: "Requester Email",
    requestMessage: "Request Message",
    attachedImage: "Attached Image",
    responseLabel: "Response",
    sendResponse: "Send Response",
    updateStatus: "Update Status",
    selectStatus: "Select Status",
    responsePlaceholder: "Type your response here...",
    noImage: "No image attached",
    viewImage: "View Image",
    close: "Close",
    send: "Send",
    sending: "Sending...",
    loading: "Loading...",
    fetchError: "Failed to load requests",
    nameRequired: "Name is required",
    nameMinLength: "Name must be at least 2 characters",
    emailRequired: "Email is required",
    emailInvalid: "Please enter a valid email",
    messageRequired: "Message is required",
    messageMinLength: "Message must be at least 10 characters",
    messageMaxLength: "Message cannot exceed 1000 characters",
    allFieldsValid: "All fields are valid!",
    pleaseFixErrors: "Please fix the errors above",
    replyTo: "Reply to",
    createdAt: "Created At",
    updatedAt: "Updated At",
    language: "Language",
    adminReply: "Admin Reply",
    statuses: {
      Pending: "Pending",
      Approved: "Approved",
      Rejected: "Rejected",
      Completed: "Completed",
    },
    filters: {
      all: "All Status",
      Pending: "Pending",
      Approved: "Approved",
      Rejected: "Rejected",
      Completed: "Completed",
    },
    success: "Success!",
    error: "Error",
  },
  fr: {
    requestManagement: "Gestion des Demandes",
    manageRequests: "Gérer les demandes de support et les demandes d'assistance",
    total: "Total",
    pending: "En Attente",
    approved: "Approuvé",
    rejected: "Rejeté",
    completed: "Terminé",
    searchRequests: "Rechercher par nom, email ou message...",
    allStatus: "Tous les Statuts",
    request: "Demande",
    requester: "Demandeur",
    message: "Message",
    status: "Statut",
    submitted: "Soumis",
    actions: "Actions",
    noRequests: "Aucune demande trouvée",
    adjustFilters: "Essayez d'ajuster votre recherche ou vos filtres",
    showing: "Affichage",
    of: "de",
    requests: "demandes",
    viewRequest: "Voir la Demande",
    respond: "Répondre",
    deleteRequest: "Supprimer la Demande",
    deleteConfirmation: "Êtes-vous sûr de vouloir supprimer cette demande ?",
    actionUndone: "Cette action est irréversible.",
    cancel: "Annuler",
    delete: "Supprimer",
    deleting: "Suppression...",
    requestDeleted: "Demande supprimée avec succès !",
    deleteFailed: "Échec de la suppression de la demande",
    statusUpdated: "Statut de la demande mis à jour avec succès !",
    statusUpdateFailed: "Échec de la mise à jour du statut",
    responseSent: "Réponse envoyée avec succès !",
    responseFailed: "Échec de l'envoi de la réponse",
    requestDetails: "Détails de la Demande",
    requesterName: "Nom du Demandeur",
    requesterEmail: "Email du Demandeur",
    requestMessage: "Message de la Demande",
    attachedImage: "Image Jointe",
    responseLabel: "Réponse",
    sendResponse: "Envoyer la Réponse",
    updateStatus: "Mettre à Jour le Statut",
    selectStatus: "Sélectionner le Statut",
    responsePlaceholder: "Tapez votre réponse ici...",
    noImage: "Aucune image jointe",
    viewImage: "Voir l'Image",
    close: "Fermer",
    send: "Envoyer",
    sending: "Envoi en cours...",
    loading: "Chargement...",
    fetchError: "Échec du chargement des demandes",
    nameRequired: "Le nom est requis",
    nameMinLength: "Le nom doit contenir au moins 2 caractères",
    emailRequired: "L'email est requis",
    emailInvalid: "Veuillez entrer un email valide",
    messageRequired: "Le message est requis",
    messageMinLength: "Le message doit contenir au moins 10 caractères",
    messageMaxLength: "Le message ne peut pas dépasser 1000 caractères",
    allFieldsValid: "Tous les champs sont valides !",
    pleaseFixErrors: "Veuillez corriger les erreurs ci-dessus",
    replyTo: "Répondre à",
    createdAt: "Créé le",
    updatedAt: "Mis à jour le",
    language: "Langue",
    adminReply: "Réponse Admin",
    statuses: {
      Pending: "En Attente",
      Approved: "Approuvé",
      Rejected: "Rejeté",
      Completed: "Terminé",
    },
    filters: {
      all: "Tous les Statuts",
      Pending: "En Attente",
      Approved: "Approuvé",
      Rejected: "Rejeté",
      Completed: "Terminé",
    },
    success: "Succès !",
    error: "Erreur",
  },
  rw: {
    requestManagement: "Gucunga Ibyifuzo",
    manageRequests: "Gucunga ibyifuzo by'ubufasha n'ibibazo",
    total: "Yose",
    pending: "Bitegereje",
    approved: "Byemewe",
    rejected: "Byangijwe",
    completed: "Byarangiye",
    searchRequests: "Shakisha ukurikije izina, imeri cyangwa ubutumwa...",
    allStatus: "Ihagaze Ryose",
    request: "Icyifuzo",
    requester: "Usabye",
    message: "Ubutumwa",
    status: "Ihagaze",
    submitted: "Byoherejwe",
    actions: "Ibikorwa",
    noRequests: "Nta cyifuzo cyabonetse",
    adjustFilters: "Gerageza guhindura uburyo ushakisha cyangwa amatungo",
    showing: "Bereka",
    of: "muri",
    requests: "ibyifuzo",
    viewRequest: "Reba Icyifuzo",
    respond: "Subiza",
    deleteRequest: "Kuraho Icyifuzo",
    deleteConfirmation: "Uri kwizera ko ushaka gukuraho iki cyifuzo?",
    actionUndone: "Iki gikorwa ntikishobora guhindurwa.",
    cancel: "Reka",
    delete: "Kuraho",
    deleting: "Birakurwaho...",
    requestDeleted: "Icyifuzo cyakuweho neza!",
    deleteFailed: "Kuraho icyifuzo birananiranye",
    statusUpdated: "Ihagaze ry'icyifuzo ryavuguruwe neza!",
    statusUpdateFailed: "Kuvugurura ihagaze birananiranye",
    responseSent: "Igisubizo cyoherejwe neza!",
    responseFailed: "Kohereza igisubizo birananiranye",
    requestDetails: "Ibisobanuro by'Icyifuzo",
    requesterName: "Izina ry'Usabye",
    requesterEmail: "Imeri y'Usabye",
    requestMessage: "Ubutumwa bw'Icyifuzo",
    attachedImage: "Ishusho Yashyizweho",
    responseLabel: "Igisubizo",
    sendResponse: "Ohereza Igisubizo",
    updateStatus: "Vugurura Ihagaze",
    selectStatus: "Hitamo Ihagaze",
    responsePlaceholder: "Andika igisubizo cyawe hano...",
    noImage: "Nta shusho yashyizweho",
    viewImage: "Reba Ishusho",
    close: "Funga",
    send: "Ohereza",
    sending: "Biremereza...",
    loading: "Birakoreshwa...",
    fetchError: "Kubura ibyifuzo birananiranye",
    nameRequired: "Izina rirasabwa",
    nameMinLength: "Izina rigomba kuba ibinyuguti 2 byibuze",
    emailRequired: "Imeri irasabwa",
    emailInvalid: "Andika imeri ikwiye",
    messageRequired: "Ubutumwa burasabwa",
    messageMinLength: "Ubutumwa bugomba kuba ibinyuguti 10 byibuze",
    messageMaxLength: "Ubutumwa ntibugomba kurenga ibinyuguti 1000",
    allFieldsValid: "Ibice byose birimo amakuru akwiye!",
    pleaseFixErrors: "Kosora amakosa hejuru",
    replyTo: "Subiza kuri",
    createdAt: "Byakozwe",
    updatedAt: "Byavuguruwe",
    language: "Ururimi",
    adminReply: "Igisubizo cy'Admin",
    statuses: {
      Pending: "Bitegereje",
      Approved: "Byemewe",
      Rejected: "Byangijwe",
      Completed: "Byarangiye",
    },
    filters: {
      all: "Ihagaze Ryose",
      Pending: "Bitegereje",
      Approved: "Byemewe",
      Rejected: "Byangijwe",
      Completed: "Byarangiye",
    },
    success: "Byakunze!",
    error: "Ikosa",
  },
};

// Helper function to get language from cookies
const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
  const lang = Cookies.get("language") as "en" | "fr" | "rw";
  return lang || "en";
};

// API Base URL
const API_URL = "https://rene-inyumba-nodejs.onrender.com/requests";

// Helper function to transform request to UI format
const transformRequestToUI = (request: Request): RequestUI => {
  const statusColors: Record<string, string> = {
    Pending: "bg-yellow-100 text-yellow-800",
    Approved: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
    Completed: "bg-blue-100 text-blue-800",
  };

  const statusLabels: Record<string, string> = {
    Pending: "Pending",
    Approved: "Approved",
    Rejected: "Rejected",
    Completed: "Completed",
  };

  // Check if there's an image URL
  let displayImage = undefined;
  if (request.image && request.image.url) {
    displayImage = {
      name: request.image.public_id || "image",
      size: 0,
      type: request.image.format || "image/jpeg",
      dataUrl: request.image.url,
    };
  }

  return {
    ...request,
    response: request.adminReply || "",
    respondedBy: "Admin",
    statusLabel: statusLabels[request.status] || request.status,
    statusColor: statusColors[request.status] || "bg-gray-100 text-gray-800",
    displayImage,
  };
};

export const RequestManagement: React.FC = () => {
  // Get language from cookies
  const [lang, setLang] = useState<"en" | "fr" | "rw">(
    getLanguageFromCookies(),
  );
  const [requests, setRequests] = useState<RequestUI[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<RequestUI[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isRespondModalOpen, setIsRespondModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<RequestUI | null>(null);
  const [responseText, setResponseText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

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

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Statistics
  const [stats, setStats] = useState({
    total: 0,
    Pending: 0,
    Approved: 0,
    Rejected: 0,
    Completed: 0,
  });

  const t = translations[lang];

  const showSuccessModal = (title: string, message: string, details?: string) => {
    setSuccessModal({ isOpen: true, title, message, details });
  };

  const showErrorModal = (title: string, message: string, details?: string) => {
    setErrorModal({ isOpen: true, title, message, details });
  };

  // Fetch requests from API
  const fetchRequests = async () => {
    setIsFetching(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Handle both array and single object responses
      let requestsData: Request[] = [];
      if (Array.isArray(data)) {
        requestsData = data;
      } else if (data && typeof data === "object") {
        if (data._id) {
          requestsData = [data];
        } else if (data.data && Array.isArray(data.data)) {
          requestsData = data.data;
        } else if (data.requests && Array.isArray(data.requests)) {
          requestsData = data.requests;
        } else {
          const possibleArrays = Object.values(data).filter((val) =>
            Array.isArray(val),
          );
          if (possibleArrays.length > 0) {
            requestsData = possibleArrays[0];
          }
        }
      }

      const transformedRequests = requestsData.map((req: Request) =>
        transformRequestToUI(req),
      );
      setRequests(transformedRequests);
    } catch (error) {
      console.error("Error fetching requests:", error);
      showErrorModal(
        t.error || "Error",
        t.fetchError || "Failed to load requests",
        error instanceof Error ? error.message : undefined
      );
    } finally {
      setIsFetching(false);
    }
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
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter requests
  useEffect(() => {
    let filtered = [...requests];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (req) =>
          req.name.toLowerCase().includes(term) ||
          req.email.toLowerCase().includes(term) ||
          req.message.toLowerCase().includes(term),
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((req) => req.status === filterStatus);
    }

    setFilteredRequests(filtered);
  }, [requests, searchTerm, filterStatus]);

  // Update statistics
  useEffect(() => {
    const total = requests.length;
    const Pending = requests.filter((r) => r.status === "Pending").length;
    const Approved = requests.filter((r) => r.status === "Approved").length;
    const Rejected = requests.filter((r) => r.status === "Rejected").length;
    const Completed = requests.filter((r) => r.status === "Completed").length;

    setStats({ total, Pending, Approved, Rejected, Completed });
  }, [requests]);

  // Get status badge color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get status label
  const getStatusLabel = (status: string): string => {
    switch (status) {
      case "Pending":
        return t.statuses.Pending;
      case "Approved":
        return t.statuses.Approved;
      case "Rejected":
        return t.statuses.Rejected;
      case "Completed":
        return t.statuses.Completed;
      default:
        return status;
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

  const handleSendResponse = async () => {
    if (!selectedRequest || !responseText.trim()) {
      showErrorModal(
        t.error || "Error",
        "Please enter a response",
        "Response message cannot be empty"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/${selectedRequest._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminReply: responseText,
          status: selectedStatus || selectedRequest.status,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedRequest = await response.json();
      const transformedRequest = transformRequestToUI(updatedRequest);

      const updatedRequests = requests.map((r) =>
        r._id === selectedRequest._id ? transformedRequest : r,
      );
      setRequests(updatedRequests);

      showSuccessModal(
        t.success || "Success!",
        t.responseSent || "Response sent successfully!",
        `Reply sent to ${selectedRequest.name}`
      );

      setIsRespondModalOpen(false);
      setSelectedRequest(null);
      setResponseText("");
      setSelectedStatus("");
    } catch (error) {
      showErrorModal(
        t.error || "Error",
        t.responseFailed || "Failed to send response",
        error instanceof Error ? error.message : undefined
      );
      console.error("Response send error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteRequest = async () => {
    if (!selectedRequest) return;

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/${selectedRequest._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setRequests(requests.filter((r) => r._id !== selectedRequest._id));

      showSuccessModal(
        t.success || "Success!",
        t.requestDeleted || "Request deleted successfully!",
        `Request from ${selectedRequest.name} has been removed`
      );

      setIsDeleteModalOpen(false);
      setSelectedRequest(null);
    } catch (error) {
      showErrorModal(
        t.error || "Error",
        t.deleteFailed || "Failed to delete request",
        error instanceof Error ? error.message : undefined
      );
      console.error("Delete request error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Open modals
  const openViewModal = (request: RequestUI) => {
    setSelectedRequest(request);
    setIsViewModalOpen(true);
  };

  const openRespondModal = (request: RequestUI) => {
    setSelectedRequest(request);
    setResponseText(request.adminReply || "");
    setSelectedStatus(request.status);
    setIsRespondModalOpen(true);
  };

  const openDeleteModal = (request: RequestUI) => {
    setSelectedRequest(request);
    setIsDeleteModalOpen(true);
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

      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <SupportAgentIcon className="w-7 h-7 text-[#FF385C]" />
              {t.requestManagement}
            </h1>
            <p className="text-sm text-gray-500 mt-1">{t.manageRequests}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchRequests}
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
          <p className="text-2xl font-bold text-yellow-700">{stats.Pending}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-green-50 rounded-xl p-4 shadow-sm border border-green-200"
        >
          <p className="text-xs text-green-600">{t.approved}</p>
          <p className="text-2xl font-bold text-green-700">{stats.Approved}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-red-50 rounded-xl p-4 shadow-sm border border-red-200"
        >
          <p className="text-xs text-red-600">{t.rejected}</p>
          <p className="text-2xl font-bold text-red-700">{stats.Rejected}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-blue-50 rounded-xl p-4 shadow-sm border border-blue-200"
        >
          <p className="text-xs text-blue-600">{t.completed}</p>
          <p className="text-2xl font-bold text-blue-700">{stats.Completed}</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t.searchRequests}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
            >
              <option value="all">{t.filters.all}</option>
              <option value="Pending">{t.filters.Pending}</option>
              <option value="Approved">{t.filters.Approved}</option>
              <option value="Rejected">{t.filters.Rejected}</option>
              <option value="Completed">{t.filters.Completed}</option>
            </select>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("all");
              }}
              className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ClearIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.request}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  {t.requester}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.status}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  {t.submitted}
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.actions}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    <SupportAgentIcon className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                    <p>{t.noRequests}</p>
                    <p className="text-sm">{t.adjustFilters}</p>
                  </td>
                </tr>
              ) : (
                filteredRequests.map((request) => (
                  <motion.tr
                    key={request._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#FF385C] text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
                          {request.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm line-clamp-1">
                            {request.name}
                          </p>
                          <p className="text-xs text-gray-500 md:hidden line-clamp-1">
                            {request.message}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-sm text-gray-600 line-clamp-1">
                        {request.message}
                      </p>
                      {request.image && request.image.url && (
                        <div className="flex items-center gap-1 mt-1">
                          <ImageIcon className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-400">
                            {request.image.public_id || "Image"}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          request.status,
                        )}`}
                      >
                        {getStatusLabel(request.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <p className="text-sm text-gray-600">
                        {formatDate(request.createdAt)}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openViewModal(request)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title={t.viewRequest}
                        >
                          <VisibilityIcon className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openRespondModal(request)}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title={t.respond}
                        >
                          <ChatIcon className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openDeleteModal(request)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title={t.deleteRequest}
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
            {t.showing} {filteredRequests.length} {t.of} {requests.length}{" "}
            {t.requests}
          </p>
        </div>
      </div>

      {/* View Request Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedRequest && (
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
              <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
                <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
                  <div className="flex items-center gap-2">
                    <AssignmentIcon className="text-[#FF385C] w-5 h-5" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      {t.requestDetails}
                    </h2>
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

                <div className="p-6 space-y-4">
                  {/* Requester Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.requesterName}
                      </label>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {selectedRequest.name}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.requesterEmail}
                      </label>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {selectedRequest.email}
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      {t.status}
                    </label>
                    <div className="mt-1">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          selectedRequest.status,
                        )}`}
                      >
                        {getStatusLabel(selectedRequest.status)}
                      </span>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      {t.requestMessage}
                    </label>
                    <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {selectedRequest.message}
                      </p>
                    </div>
                  </div>

                  {/* Image */}
                  {selectedRequest.image && selectedRequest.image.url && (
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.attachedImage}
                      </label>
                      <div className="mt-2">
                        <button
                          onClick={() => setIsImageModalOpen(true)}
                          className="relative rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                        >
                          <img
                            src={selectedRequest.image.url}
                            alt={selectedRequest.image.public_id || "Request image"}
                            className="max-h-48 object-contain cursor-pointer"
                          />
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {selectedRequest.image.public_id || "Image"}
                          </div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Admin Reply */}
                  {selectedRequest.adminReply && (
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.adminReply}
                      </label>
                      <div className="mt-1 p-3 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">
                          {selectedRequest.adminReply}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.createdAt}
                      </label>
                      <p className="text-sm text-gray-900 mt-1">
                        {formatDate(selectedRequest.createdAt)}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.updatedAt}
                      </label>
                      <p className="text-sm text-gray-900 mt-1">
                        {formatDate(selectedRequest.updatedAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsViewModalOpen(false);
                        openRespondModal(selectedRequest);
                      }}
                      className="flex-1 px-4 py-2.5 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors flex items-center justify-center gap-2"
                    >
                      <ChatIcon className="w-4 h-4" />
                      {t.respond}
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

      {/* Respond Modal */}
      <AnimatePresence>
        {isRespondModalOpen && selectedRequest && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setIsRespondModalOpen(false)}
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
                    <ChatIcon className="text-[#FF385C] w-5 h-5" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      {t.replyTo} {selectedRequest.name}
                    </h2>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsRespondModalOpen(false)}
                    className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="p-6 space-y-4">
                  {/* Requester Info */}
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-700">From:</span>{" "}
                      {selectedRequest.name} ({selectedRequest.email})
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      <span className="font-medium text-gray-700">
                        Message:
                      </span>{" "}
                      {selectedRequest.message}
                    </p>
                  </div>

                  {/* Status Update */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.updateStatus}
                    </label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                    >
                      <option value="Pending">{t.statuses.Pending}</option>
                      <option value="Approved">{t.statuses.Approved}</option>
                      <option value="Rejected">{t.statuses.Rejected}</option>
                      <option value="Completed">{t.statuses.Completed}</option>
                    </select>
                  </div>

                  {/* Response Text */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.responseLabel}
                    </label>
                    <textarea
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      rows={5}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none"
                      placeholder={t.responsePlaceholder}
                    />
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSendResponse}
                      disabled={isSubmitting || !responseText.trim()}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 ${
                        isSubmitting || !responseText.trim()
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#FF385C] hover:bg-[#E31C5F]"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {t.sending}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          {t.send}
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsRespondModalOpen(false)}
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

      {/* Delete Confirmation Modal - Using the new ConfirmModal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedRequest(null);
        }}
        onConfirm={handleDeleteRequest}
        title={t.deleteRequest}
        message={t.deleteConfirmation}
        confirmText={t.delete}
        cancelText={t.cancel}
        isSubmitting={isLoading}
        type="danger"
        icon={<DeleteIcon className="w-10 h-10" />}
      />

      {/* Image Preview Modal */}
      <AnimatePresence>
        {isImageModalOpen && selectedRequest?.image?.url && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]"
              onClick={() => setIsImageModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            >
              <div className="relative max-w-4xl max-h-[90vh]">
                <button
                  onClick={() => setIsImageModalOpen(false)}
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                >
                  <Close className="w-8 h-8" />
                </button>
                <img
                  src={selectedRequest.image.url}
                  alt={selectedRequest.image.public_id || "Request image"}
                  className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-sm px-4 py-2 rounded-lg">
                  {selectedRequest.image.public_id || "Image"}
                  {selectedRequest.image.format &&
                    ` (${selectedRequest.image.format})`}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};