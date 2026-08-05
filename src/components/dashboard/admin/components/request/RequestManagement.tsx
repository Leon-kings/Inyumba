/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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

// // Types
// interface Request {
//   id: string;
//   name: string;
//   email: string;
//   message: string;
//   image?: {
//     name: string;
//     size: number;
//     type: string;
//     dataUrl: string;
//   };
//   status: "pending" | "reviewing" | "resolved" | "rejected";
//   createdAt: string;
//   updatedAt: string;
//   response?: string;
//   respondedBy?: string;
// }

// // Translations
// const translations = {
//   en: {
//     requestManagement: "Request Management",
//     manageRequests: "Manage support requests and assistance inquiries",
//     total: "Total",
//     pending: "Pending",
//     reviewing: "Reviewing",
//     resolved: "Resolved",
//     rejected: "Rejected",
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
//     statuses: {
//       pending: "Pending",
//       reviewing: "Reviewing",
//       resolved: "Resolved",
//       rejected: "Rejected",
//     },
//     filters: {
//       all: "All Status",
//       pending: "Pending",
//       reviewing: "Reviewing",
//       resolved: "Resolved",
//       rejected: "Rejected",
//     },
//   },
//   fr: {
//     requestManagement: "Gestion des Demandes",
//     manageRequests:
//       "Gérer les demandes de support et les demandes d'assistance",
//     total: "Total",
//     pending: "En Attente",
//     reviewing: "En Révision",
//     resolved: "Résolu",
//     rejected: "Rejeté",
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
//     statuses: {
//       pending: "En Attente",
//       reviewing: "En Révision",
//       resolved: "Résolu",
//       rejected: "Rejeté",
//     },
//     filters: {
//       all: "Tous les Statuts",
//       pending: "En Attente",
//       reviewing: "En Révision",
//       resolved: "Résolu",
//       rejected: "Rejeté",
//     },
//   },
//   rw: {
//     requestManagement: "Gucunga Ibyifuzo",
//     manageRequests: "Gucunga ibyifuzo by'ubufasha n'ibibazo",
//     total: "Yose",
//     pending: "Bitegereje",
//     reviewing: "Birisuzumwa",
//     resolved: "Byakemutse",
//     rejected: "Byangijwe",
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
//     statuses: {
//       pending: "Bitegereje",
//       reviewing: "Birisuzumwa",
//       resolved: "Byakemutse",
//       rejected: "Byangijwe",
//     },
//     filters: {
//       all: "Ihagaze Ryose",
//       pending: "Bitegereje",
//       reviewing: "Birisuzumwa",
//       resolved: "Byakemutse",
//       rejected: "Byangijwe",
//     },
//   },
// };

// // Helper function to get language from cookies
// const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
//   const lang = Cookies.get("language") as "en" | "fr" | "rw";
//   return lang || "en";
// };

// // Initial requests (populated from NotFound.tsx submissions)
// const INITIAL_REQUESTS: Request[] = [
//   {
//     id: "1",
//     name: "Jean Paul Mugisha",
//     email: "jean@example.com",
//     message:
//       "I'm having trouble finding houses near INES-Ruhengeri. Can you help me find accommodation?",
//     status: "pending",
//     createdAt: "2024-01-20T10:00:00Z",
//     updatedAt: "2024-01-20T10:00:00Z",
//   },
//   {
//     id: "2",
//     name: "Marie Claire Uwimana",
//     email: "marie@example.com",
//     message:
//       "I need assistance with the booking process. I found a house but I'm not sure how to complete the payment.",
//     status: "reviewing",
//     createdAt: "2024-01-19T14:30:00Z",
//     updatedAt: "2024-01-20T09:00:00Z",
//     response:
//       "Hi Marie, we've received your request. Our team will guide you through the booking process. Please check your email for detailed instructions.",
//     respondedBy: "Admin User",
//   },
//   {
//     id: "3",
//     name: "David Niyonzima",
//     email: "david@example.com",
//     message:
//       "I'm a landlord and I want to list my property on the platform. What are the requirements?",
//     status: "resolved",
//     createdAt: "2024-01-18T16:00:00Z",
//     updatedAt: "2024-01-19T11:00:00Z",
//     response:
//       "Hi David, thank you for your interest in becoming a host. You can list your property by clicking 'Become a Host' in the navigation. Our team will review and verify your property within 24 hours. Please ensure you have clear photos and accurate property details.",
//     respondedBy: "Admin User",
//   },
//   {
//     id: "4",
//     name: "Grace Uwase",
//     email: "grace@example.com",
//     message:
//       "I want to report an issue with my booking. The landlord is not responding to my messages.",
//     status: "rejected",
//     createdAt: "2024-01-17T09:00:00Z",
//     updatedAt: "2024-01-18T08:00:00Z",
//     response:
//       "Hi Grace, we've reviewed your case and have contacted the landlord. They should respond within 24 hours. If not, please let us know and we'll escalate the matter.",
//     respondedBy: "Admin User",
//   },
//   {
//     id: "5",
//     name: "Eric Kamanzi",
//     email: "eric@example.com",
//     message:
//       "Can you help me find accommodation near UR-Huye campus? I need a 2-bedroom apartment for the upcoming semester.",
//     status: "pending",
//     createdAt: "2024-01-21T08:30:00Z",
//     updatedAt: "2024-01-21T08:30:00Z",
//     image: {
//       name: "room-requirements.jpg",
//       size: 245000,
//       type: "image/jpeg",
//       dataUrl:
//         "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
//     },
//   },
// ];

// export const RequestManagement: React.FC = () => {
//   // Get language from cookies
//   const [lang, setLang] = useState<"en" | "fr" | "rw">(
//     getLanguageFromCookies(),
//   );
//   const [requests, setRequests] = useState<Request[]>(INITIAL_REQUESTS);
//   const [filteredRequests, setFilteredRequests] =
//     useState<Request[]>(INITIAL_REQUESTS);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState<string>("all");

//   // Modal states
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [isRespondModalOpen, setIsRespondModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
//   const [responseText, setResponseText] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState<string>("");
//   const [isImageModalOpen, setIsImageModalOpen] = useState(false);

//   // Loading states
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Statistics
//   const [stats, setStats] = useState({
//     total: 0,
//     pending: 0,
//     reviewing: 0,
//     resolved: 0,
//     rejected: 0,
//   });

//   const t = translations[lang];

//   // Listen for language changes in cookies
//   useEffect(() => {
//     const handleCookieChange = () => {
//       const newLang = getLanguageFromCookies();
//       if (newLang !== lang) {
//         setLang(newLang);
//       }
//     };

//     // Check for cookie changes every second (polling)
//     const interval = setInterval(handleCookieChange, 1000);
//     return () => clearInterval(interval);
//   }, [lang]);

//   // Filter requests
//   useEffect(() => {
//     let filtered = [...requests];

//     // Search filter
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       filtered = filtered.filter(
//         (req) =>
//           req.name.toLowerCase().includes(term) ||
//           req.email.toLowerCase().includes(term) ||
//           req.message.toLowerCase().includes(term),
//       );
//     }

//     // Status filter
//     if (filterStatus !== "all") {
//       filtered = filtered.filter((req) => req.status === filterStatus);
//     }

//     setFilteredRequests(filtered);
//   }, [requests, searchTerm, filterStatus]);

//   // Update statistics
//   useEffect(() => {
//     const total = requests.length;
//     const pending = requests.filter((r) => r.status === "pending").length;
//     const reviewing = requests.filter((r) => r.status === "reviewing").length;
//     const resolved = requests.filter((r) => r.status === "resolved").length;
//     const rejected = requests.filter((r) => r.status === "rejected").length;

//     setStats({ total, pending, reviewing, resolved, rejected });
//   }, [requests]);

//   // Get status badge color
//   const getStatusColor = (status: string): string => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-100 text-yellow-800";
//       case "reviewing":
//         return "bg-blue-100 text-blue-800";
//       case "resolved":
//         return "bg-green-100 text-green-800";
//       case "rejected":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   // Get status label
//   const getStatusLabel = (status: string): string => {
//     switch (status) {
//       case "pending":
//         return t.statuses.pending;
//       case "reviewing":
//         return t.statuses.reviewing;
//       case "resolved":
//         return t.statuses.resolved;
//       case "rejected":
//         return t.statuses.rejected;
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

//   // Open view modal
//   const openViewModal = (request: Request) => {
//     setSelectedRequest(request);
//     setIsViewModalOpen(true);
//   };

//   // Open respond modal
//   const openRespondModal = (request: Request) => {
//     setSelectedRequest(request);
//     setResponseText(request.response || "");
//     setSelectedStatus(request.status);
//     setIsRespondModalOpen(true);
//   };

//   // Open delete modal
//   const openDeleteModal = (request: Request) => {
//     setSelectedRequest(request);
//     setIsDeleteModalOpen(true);
//   };

//   // Handle status update

//   // Handle send response
//   const handleSendResponse = async () => {
//     if (!selectedRequest || !responseText.trim()) {
//       toast.warning("Please enter a response");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       const updatedRequest: Request = {
//         ...selectedRequest,
//         response: responseText,
//         status:
//           selectedStatus === "pending"
//             ? "reviewing"
//             : (selectedStatus as Request["status"]),
//         updatedAt: new Date().toISOString(),
//         respondedBy: "Admin User",
//       };

//       setRequests(
//         requests.map((r) => (r.id === selectedRequest.id ? updatedRequest : r)),
//       );

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

//   // Handle delete request
//   const handleDeleteRequest = async () => {
//     if (!selectedRequest) return;

//     setIsLoading(true);

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 800));

//       setRequests(requests.filter((r) => r.id !== selectedRequest.id));
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

//   // Handle refresh
//   const handleRefresh = () => {
//     setIsLoading(true);
//     toast.info("Refreshing requests...");
//     setTimeout(() => {
//       setIsLoading(false);
//       toast.success("Requests refreshed!");
//     }, 800);
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
//               onClick={handleRefresh}
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
//           className="bg-blue-50 rounded-xl p-4 shadow-sm border border-blue-200"
//         >
//           <p className="text-xs text-blue-600">{t.reviewing}</p>
//           <p className="text-2xl font-bold text-blue-700">{stats.reviewing}</p>
//         </motion.div>
//         <motion.div
//           whileHover={{ y: -2 }}
//           className="bg-green-50 rounded-xl p-4 shadow-sm border border-green-200"
//         >
//           <p className="text-xs text-green-600">{t.resolved}</p>
//           <p className="text-2xl font-bold text-green-700">{stats.resolved}</p>
//         </motion.div>
//         <motion.div
//           whileHover={{ y: -2 }}
//           className="bg-red-50 rounded-xl p-4 shadow-sm border border-red-200"
//         >
//           <p className="text-xs text-red-600">{t.rejected}</p>
//           <p className="text-2xl font-bold text-red-700">{stats.rejected}</p>
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
//               <option value="pending">{t.filters.pending}</option>
//               <option value="reviewing">{t.filters.reviewing}</option>
//               <option value="resolved">{t.filters.resolved}</option>
//               <option value="rejected">{t.filters.rejected}</option>
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
//                     key={request.id}
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
//                       {request.image && (
//                         <div className="flex items-center gap-1 mt-1">
//                           <ImageIcon className="w-3 h-3 text-gray-400" />
//                           <span className="text-xs text-gray-400">
//                             {request.image.name}
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
//                   {selectedRequest.image && (
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
//                             src={selectedRequest.image.dataUrl}
//                             alt={selectedRequest.image.name}
//                             className="max-h-48 object-contain cursor-pointer"
//                           />
//                           <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
//                             {selectedRequest.image.name}
//                           </div>
//                         </button>
//                       </div>
//                     </div>
//                   )}

//                   {/* Response */}
//                   {selectedRequest.response && (
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">
//                         {t.responseLabel}
//                       </label>
//                       <div className="mt-1 p-3 bg-green-50 rounded-lg border border-green-200">
//                         <p className="text-sm text-gray-700 whitespace-pre-wrap">
//                           {selectedRequest.response}
//                         </p>
//                         {selectedRequest.respondedBy && (
//                           <p className="text-xs text-gray-500 mt-2">
//                             Responded by: {selectedRequest.respondedBy}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   )}

//                   {/* Dates */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">
//                         {t.submitted}
//                       </label>
//                       <p className="text-sm text-gray-900 mt-1">
//                         {formatDate(selectedRequest.createdAt)}
//                       </p>
//                     </div>
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">
//                         Updated
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
//                       {t.respond}
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
//                       <option value="">{t.selectStatus}</option>
//                       <option value="pending">{t.statuses.pending}</option>
//                       <option value="reviewing">{t.statuses.reviewing}</option>
//                       <option value="resolved">{t.statuses.resolved}</option>
//                       <option value="rejected">{t.statuses.rejected}</option>
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
//         {isImageModalOpen && selectedRequest?.image && (
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
//                   src={selectedRequest.image.dataUrl}
//                   alt={selectedRequest.image.name}
//                   className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
//                 />
//                 <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-sm px-4 py-2 rounded-lg">
//                   {selectedRequest.image.name} (
//                   {(selectedRequest.image.size / 1024).toFixed(1)} KB)
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
import { toast } from "react-toastify";
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

interface RequestFormData {
  name: string;
  email: string;
  message: string;
  language: string;
  status: "Pending" | "Approved" | "Rejected" | "Completed";
  adminReply?: string;
}

// Form validation errors
interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

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

// Helper function to transform form data to API format
const transformFormToRequest = (data: RequestFormData): any => {
  return {
    name: data.name,
    email: data.email,
    message: data.message,
    language: data.language || "en",
    status: data.status || "Pending",
    adminReply: data.adminReply || "",
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

  // Form state for compose
  const [formData, setFormData] = useState<RequestFormData>({
    name: "",
    email: "",
    message: "",
    language: "en",
    status: "Pending",
    adminReply: "",
  });

  // Form validation
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<{ name: boolean; email: boolean; message: boolean }>({
    name: false,
    email: false,
    message: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);

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

  // Validation functions
  const validateName = (name: string): string | undefined => {
    if (!name || name.trim() === '') {
      return t.nameRequired;
    }
    if (name.trim().length < 2) {
      return t.nameMinLength;
    }
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email || email.trim() === '') {
      return t.emailRequired;
    }
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email.trim())) {
      return t.emailInvalid;
    }
    return undefined;
  };

  const validateMessage = (message: string): string | undefined => {
    if (!message || message.trim() === '') {
      return t.messageRequired;
    }
    if (message.trim().length < 10) {
      return t.messageMinLength;
    }
    if (message.trim().length > 1000) {
      return t.messageMaxLength;
    }
    return undefined;
  };

  // Validate all form fields
  const validateForm = () => {
    const errors: FormErrors = {};
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const messageError = validateMessage(formData.message);

    if (nameError) errors.name = nameError;
    if (emailError) errors.email = emailError;
    if (messageError) errors.message = messageError;

    setFormErrors(errors);
    const valid = Object.keys(errors).length === 0;
    setIsFormValid(valid);
    return valid;
  };

  // Handle field blur (mark as touched)
  const handleFieldBlur = (field: 'name' | 'email' | 'message') => {
    setTouchedFields(prev => ({ ...prev, [field]: true }));
    validateForm();
  };

  // Handle field change with validation
  const handleFieldChange = (field: keyof RequestFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    let error: string | undefined;
    if (field === 'name') error = validateName(value);
    else if (field === 'email') error = validateEmail(value);
    else if (field === 'message') error = validateMessage(value);
    
    setFormErrors(prev => ({ ...prev, [field]: error }));
    
    const nameError = field === 'name' ? error : validateName(formData.name);
    const emailError = field === 'email' ? error : validateEmail(formData.email);
    const messageError = field === 'message' ? error : validateMessage(formData.message);
    
    const valid = !nameError && !emailError && !messageError;
    setIsFormValid(valid);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      message: "",
      language: "en",
      status: "Pending",
      adminReply: "",
    });
    setFormErrors({});
    setTouchedFields({
      name: false,
      email: false,
      message: false,
    });
    setIsFormValid(false);
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
      } else if (data && typeof data === 'object') {
        if (data._id) {
          requestsData = [data];
        } else if (data.data && Array.isArray(data.data)) {
          requestsData = data.data;
        } else if (data.requests && Array.isArray(data.requests)) {
          requestsData = data.requests;
        } else {
          const possibleArrays = Object.values(data).filter(val => Array.isArray(val));
          if (possibleArrays.length > 0) {
            requestsData = possibleArrays[0];
          }
        }
      }
      
      const transformedRequests = requestsData.map((req: Request) => transformRequestToUI(req));
      setRequests(transformedRequests);
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error(`❌ ${t.fetchError}`);
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

  // CRUD Operations
  const handleCreateRequest = async () => {
    const isValid = validateForm();
    if (!isValid) {
      toast.warning(`⚠️ ${t.pleaseFixErrors}`);
      setTouchedFields({
        name: true,
        email: true,
        message: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const requestData = transformFormToRequest(formData);
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const newRequest = await response.json();
      const transformedRequest = transformRequestToUI(newRequest);
      
      setRequests([transformedRequest, ...requests]);
      toast.success(`✅ Request created successfully!`);
      resetForm();
    } catch (error: any) {
      toast.error(`❌ Failed to create request: ${error.message}`);
      console.error("Create request error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendResponse = async () => {
    if (!selectedRequest || !responseText.trim()) {
      toast.warning("⚠️ Please enter a response");
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
        r._id === selectedRequest._id ? transformedRequest : r
      );
      setRequests(updatedRequests);

      toast.success(`✅ ${t.responseSent}`);
      setIsRespondModalOpen(false);
      setSelectedRequest(null);
      setResponseText("");
      setSelectedStatus("");
    } catch (error) {
      toast.error(`❌ ${t.responseFailed}`);
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
      toast.success(`🗑️ ${t.requestDeleted}`);
      setIsDeleteModalOpen(false);
      setSelectedRequest(null);
    } catch (error) {
      toast.error(`❌ ${t.deleteFailed}`);
      console.error("Delete request error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (requestId: string, newStatus: string) => {
    try {
      const response = await fetch(`${API_URL}/${requestId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedRequest = await response.json();
      const transformedRequest = transformRequestToUI(updatedRequest);

      const updatedRequests = requests.map((r) =>
        r._id === requestId ? transformedRequest : r
      );
      setRequests(updatedRequests);

      toast.success(`✅ ${t.statusUpdated}`);
    } catch (error) {
      toast.error(`❌ ${t.statusUpdateFailed}`);
      console.error("Status update error:", error);
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

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && selectedRequest && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedRequest(null);
              }}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            >
              <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white relative">
                <div className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                      <DeleteIcon className="w-8 h-8 text-red-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                    {t.deleteRequest}
                  </h3>
                  <p className="text-gray-500 text-center mb-6">
                    {t.deleteConfirmation}
                    <br />
                    <span className="text-sm text-gray-400">
                      {t.actionUndone}
                    </span>
                  </p>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsDeleteModalOpen(false);
                        setSelectedRequest(null);
                      }}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      {t.cancel}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDeleteRequest}
                      disabled={isLoading}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors ${
                        isLoading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {t.deleting}
                        </span>
                      ) : (
                        t.delete
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
                  {selectedRequest.image.format && ` (${selectedRequest.image.format})`}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};