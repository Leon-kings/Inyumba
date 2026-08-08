// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable react-hooks/set-state-in-effect */
// import React, { useState, useEffect, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Cookies from "js-cookie";

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

// interface RequestFormData {
//   name: string;
//   email: string;
//   message: string;
//   image?: File | null;
//   imagePreview?: string;
// }

// // Translations
// const translations = {
//   en: {
//     myRequests: "My Requests",
//     manageRequests: "Create and manage your support requests",
//     newRequest: "New Request",
//     editRequest: "Edit Request",
//     viewRequest: "View Request",
//     deleteRequest: "Delete Request",
//     deleteConfirmation: "Are you sure you want to delete this request?",
//     actionUndone: "This action cannot be undone.",
//     cancel: "Cancel",
//     delete: "Delete",
//     deleting: "Deleting...",
//     requestDeleted: "Request deleted successfully!",
//     deleteFailed: "Failed to delete request",
//     requestCreated: "Request created successfully!",
//     requestUpdated: "Request updated successfully!",
//     createFailed: "Failed to create request",
//     updateFailed: "Failed to update request",
//     total: "Total",
//     pending: "Pending",
//     reviewing: "Reviewing",
//     resolved: "Resolved",
//     rejected: "Rejected",
//     searchRequests: "Search your requests...",
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
//     respond: "Respond",
//     requestDetails: "Request Details",
//     requesterName: "Requester Name",
//     requesterEmail: "Requester Email",
//     requestMessage: "Request Message",
//     attachedImage: "Attached Image",
//     responseLabel: "Response",
//     sendResponse: "Send Response",
//     responsePlaceholder: "Type your response here...",
//     noImage: "No image attached",
//     viewImage: "View Image",
//     close: "Close",
//     send: "Send",
//     sending: "Sending...",
//     createRequest: "Create Request",
//     updateRequest: "Update Request",
//     yourName: "Your Name",
//     yourEmail: "Your Email",
//     yourMessage: "Your Message",
//     attachImage: "Attach Image (optional)",
//     imageRequirements: "JPG, PNG, GIF up to 5MB",
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
//     role: {
//       user: "User",
//       admin: "Admin",
//       host: "Host",
//     },
//     permissions: {
//       adminOnly: "Only admins can change request status",
//       cannotEdit: "You cannot edit this request",
//       cannotDelete: "You cannot delete this request",
//     },
//   },
//   fr: {
//     myRequests: "Mes Demandes",
//     manageRequests: "Créez et gérez vos demandes de support",
//     newRequest: "Nouvelle Demande",
//     editRequest: "Modifier la Demande",
//     viewRequest: "Voir la Demande",
//     deleteRequest: "Supprimer la Demande",
//     deleteConfirmation: "Êtes-vous sûr de vouloir supprimer cette demande ?",
//     actionUndone: "Cette action est irréversible.",
//     cancel: "Annuler",
//     delete: "Supprimer",
//     deleting: "Suppression...",
//     requestDeleted: "Demande supprimée avec succès !",
//     deleteFailed: "Échec de la suppression de la demande",
//     requestCreated: "Demande créée avec succès !",
//     requestUpdated: "Demande mise à jour avec succès !",
//     createFailed: "Échec de la création de la demande",
//     updateFailed: "Échec de la mise à jour de la demande",
//     total: "Total",
//     pending: "En Attente",
//     reviewing: "En Révision",
//     resolved: "Résolu",
//     rejected: "Rejeté",
//     searchRequests: "Rechercher vos demandes...",
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
//     respond: "Répondre",
//     requestDetails: "Détails de la Demande",
//     requesterName: "Nom du Demandeur",
//     requesterEmail: "Email du Demandeur",
//     requestMessage: "Message de la Demande",
//     attachedImage: "Image Jointe",
//     responseLabel: "Réponse",
//     sendResponse: "Envoyer la Réponse",
//     responsePlaceholder: "Tapez votre réponse ici...",
//     noImage: "Aucune image jointe",
//     viewImage: "Voir l'Image",
//     close: "Fermer",
//     send: "Envoyer",
//     sending: "Envoi en cours...",
//     createRequest: "Créer une Demande",
//     updateRequest: "Mettre à Jour la Demande",
//     yourName: "Votre Nom",
//     yourEmail: "Votre Email",
//     yourMessage: "Votre Message",
//     attachImage: "Joindre une Image (optionnel)",
//     imageRequirements: "JPG, PNG, GIF jusqu'à 5MB",
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
//     role: {
//       user: "Utilisateur",
//       admin: "Administrateur",
//       host: "Hôte",
//     },
//     permissions: {
//       adminOnly: "Seuls les administrateurs peuvent changer le statut",
//       cannotEdit: "Vous ne pouvez pas modifier cette demande",
//       cannotDelete: "Vous ne pouvez pas supprimer cette demande",
//     },
//   },
//   rw: {
//     myRequests: "Ibyifuzo Byanjye",
//     manageRequests: "Kora kandi ucunge ibyifuzo byawe",
//     newRequest: "Icyifuzo Gishya",
//     editRequest: "Hindura Icyifuzo",
//     viewRequest: "Reba Icyifuzo",
//     deleteRequest: "Kuraho Icyifuzo",
//     deleteConfirmation: "Uri kwizera ko ushaka gukuraho iki cyifuzo?",
//     actionUndone: "Iki gikorwa ntikishobora guhindurwa.",
//     cancel: "Reka",
//     delete: "Kuraho",
//     deleting: "Birakurwaho...",
//     requestDeleted: "Icyifuzo cyakuweho neza!",
//     deleteFailed: "Kuraho icyifuzo birananiranye",
//     requestCreated: "Icyifuzo cyakozwe neza!",
//     requestUpdated: "Icyifuzo cyavuguruwe neza!",
//     createFailed: "Kora icyifuzo birananiranye",
//     updateFailed: "Kuvugurura icyifuzo birananiranye",
//     total: "Yose",
//     pending: "Bitegereje",
//     reviewing: "Birisuzumwa",
//     resolved: "Byakemutse",
//     rejected: "Byangijwe",
//     searchRequests: "Shakisha ibyifuzo byawe...",
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
//     respond: "Subiza",
//     requestDetails: "Ibisobanuro by'Icyifuzo",
//     requesterName: "Izina ry'Usabye",
//     requesterEmail: "Imeri y'Usabye",
//     requestMessage: "Ubutumwa bw'Icyifuzo",
//     attachedImage: "Ishusho Yashyizweho",
//     responseLabel: "Igisubizo",
//     sendResponse: "Ohereza Igisubizo",
//     responsePlaceholder: "Andika igisubizo cyawe hano...",
//     noImage: "Nta shusho yashyizweho",
//     viewImage: "Reba Ishusho",
//     close: "Funga",
//     send: "Ohereza",
//     sending: "Biremereza...",
//     createRequest: "Kora Icyifuzo",
//     updateRequest: "Vugurura Icyifuzo",
//     yourName: "Izina Ryawe",
//     yourEmail: "Imeri Yawe",
//     yourMessage: "Ubutumwa Bwawe",
//     attachImage: "Shyiramo Ishusho (ntibishoboka)",
//     imageRequirements: "JPG, PNG, GIF kugeza 5MB",
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
//     role: {
//       user: "Umukoresha",
//       admin: "Muyobozi",
//       host: "Umutambyi",
//     },
//     permissions: {
//       adminOnly: "Abayobozi gusa nibo bashobora guhindura ihagaze",
//       cannotEdit: "Ntushobora guhindura iki cyifuzo",
//       cannotDelete: "Ntushobora gukuraho iki cyifuzo",
//     },
//   },
// };

// // Helper function to get language from cookies
// const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
//   const lang = Cookies.get("language") as "en" | "fr" | "rw";
//   return lang || "en";
// };

// // Helper function to get user role from cookies
// const getUserRole = (): "admin" | "user" | "host" => {
//   const role = Cookies.get("userRole") as "admin" | "user" | "host";
//   return role || "user";
// };

// // Helper function to get user email from cookies
// const getUserEmail = (): string => {
//   return Cookies.get("userEmail") || "";
// };

// // Helper function to get user name from cookies
// const getUserName = (): string => {
//   return Cookies.get("userName") || "";
// };

// // Mock API functions (replace with actual API calls)
// const mockGetUserRequests = async (email: string): Promise<Request[]> => {
//   await new Promise((resolve) => setTimeout(resolve, 800));

//   // Return mock data for demonstration
//   return [
//     {
//       id: "1",
//       name: "John Doe",
//       email: email || "john@example.com",
//       message: "I need help with finding accommodation near the university.",
//       status: "pending",
//       createdAt: "2024-01-20T10:00:00Z",
//       updatedAt: "2024-01-20T10:00:00Z",
//     },
//     {
//       id: "2",
//       name: "John Doe",
//       email: email || "john@example.com",
//       message: "How can I list my property on the platform?",
//       status: "reviewing",
//       createdAt: "2024-01-18T14:30:00Z",
//       updatedAt: "2024-01-19T09:00:00Z",
//       response: "We are reviewing your request. Please wait for our response.",
//       respondedBy: "Admin User",
//     },
//   ];
// };

// const mockCreateRequest = async (data: Partial<Request>): Promise<Request> => {
//   await new Promise((resolve) => setTimeout(resolve, 1200));
//   return {
//     id: Date.now().toString(),
//     name: data.name || "",
//     email: data.email || "",
//     message: data.message || "",
//     status: "pending",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//     image: data.image,
//   };
// };

// const mockUpdateRequest = async (
//   _id: string,
//   data: Partial<Request>,
// ): Promise<Request> => {
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   return {
//     id: _id,
//     name: data.name || "",
//     email: data.email || "",
//     message: data.message || "",
//     status: data.status || "pending",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//     image: data.image,
//     response: data.response,
//     respondedBy: data.respondedBy,
//   };
// };

// const mockDeleteRequest = async (
//   _id: string,
// ): Promise<{ success: boolean }> => {
//   await new Promise((resolve) => setTimeout(resolve, 800));
//   return { success: true };
// };

// export const UserRequestManagement: React.FC = () => {
//   // Get language and user info from cookies
//   const [lang, setLang] = useState<"en" | "fr" | "rw">(
//     getLanguageFromCookies(),
//   );
//   const userRole = getUserRole();
//   const userEmail = getUserEmail();
//   const userName = getUserName();

//   const [requests, setRequests] = useState<Request[]>([]);
//   const [filteredRequests, setFilteredRequests] = useState<Request[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState<string>("all");
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

//   // Modal states
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isImageModalOpen, setIsImageModalOpen] = useState(false);
//   const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

//   // Form state for create/edit
//   const [formData, setFormData] = useState<RequestFormData>({
//     name: userName || "",
//     email: userEmail || "",
//     message: "",
//     image: null,
//     imagePreview: "",
//   });

//   const [formErrors, setFormErrors] = useState<{
//     name?: string;
//     email?: string;
//     message?: string;
//     image?: string;
//   }>({});

//   // Statistics
//   const [stats, setStats] = useState({
//     total: 0,
//     pending: 0,
//     reviewing: 0,
//     resolved: 0,
//     rejected: 0,
//   });

//   const t = translations[lang];
//   const isAdmin = userRole === "admin";

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

//   // Load user requests
//   const loadRequests = useCallback(async () => {
//     try {
//       setLoading(true);
//       const data = await mockGetUserRequests(userEmail);
//       setRequests(data);
//       setFilteredRequests(data);
//     } catch (error) {
//       console.error("Error loading requests:", error);
//       toast.error("Failed to load requests");
//     } finally {
//       setLoading(false);
//     }
//   }, [userEmail]);

//   useEffect(() => {
//     loadRequests();
//   }, [loadRequests]);

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

//   // Validate form
//   const validateForm = (): boolean => {
//     const errors: typeof formErrors = {};
//     let isValid = true;

//     if (!formData.name.trim()) {
//       errors.name = "Name is required";
//       isValid = false;
//     }

//     if (!formData.email.trim()) {
//       errors.email = "Email is required";
//       isValid = false;
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       errors.email = "Invalid email format";
//       isValid = false;
//     }

//     if (!formData.message.trim()) {
//       errors.message = "Message is required";
//       isValid = false;
//     }

//     setFormErrors(errors);
//     return isValid;
//   };

//   // Handle file upload
//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // Check file size (max 5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       toast.error("File size must be less than 5MB");
//       return;
//     }

//     // Check file type
//     const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
//     if (!allowedTypes.includes(file.type)) {
//       toast.error("Only JPG, PNG, and GIF images are allowed");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setFormData({
//         ...formData,
//         image: file,
//         imagePreview: reader.result as string,
//       });
//     };
//     reader.readAsDataURL(file);
//   };

//   // Handle create request
//   const handleCreateRequest = async () => {
//     if (!validateForm()) return;

//     setSubmitting(true);
//     try {
//       const newRequest = await mockCreateRequest({
//         name: formData.name,
//         email: formData.email,
//         message: formData.message,
//         image: formData.image
//           ? {
//               name: formData.image.name,
//               size: formData.image.size,
//               type: formData.image.type,
//               dataUrl: formData.imagePreview || "",
//             }
//           : undefined,
//       });

//       setRequests([newRequest, ...requests]);
//       toast.success(`✅ ${t.requestCreated}`);
//       setIsCreateModalOpen(false);
//       resetForm();
//     } catch (error) {
//       console.error("Error creating request:", error);
//       toast.error(`❌ ${t.createFailed}`);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Handle update request
//   const handleUpdateRequest = async () => {
//     if (!selectedRequest || !validateForm()) return;

//     setSubmitting(true);
//     try {
//       const updated = await mockUpdateRequest(selectedRequest.id, {
//         name: formData.name,
//         email: formData.email,
//         message: formData.message,
//         image: formData.image
//           ? {
//               name: formData.image.name,
//               size: formData.image.size,
//               type: formData.image.type,
//               dataUrl: formData.imagePreview || "",
//             }
//           : selectedRequest.image,
//       });

//       setRequests(
//         requests.map((r) => (r.id === selectedRequest.id ? updated : r)),
//       );
//       toast.success(`✅ ${t.requestUpdated}`);
//       setIsEditModalOpen(false);
//       setSelectedRequest(null);
//       resetForm();
//     } catch (error) {
//       console.error("Error updating request:", error);
//       toast.error(`❌ ${t.updateFailed}`);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Handle delete request
//   const handleDeleteRequest = async () => {
//     if (!selectedRequest) return;

//     setSubmitting(true);
//     try {
//       await mockDeleteRequest(selectedRequest.id);
//       setRequests(requests.filter((r) => r.id !== selectedRequest.id));
//       toast.success(`🗑️ ${t.requestDeleted}`);
//       setIsDeleteModalOpen(false);
//       setSelectedRequest(null);
//     } catch (error) {
//       console.error("Error deleting request:", error);
//       toast.error(`❌ ${t.deleteFailed}`);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Handle refresh
//   const handleRefresh = () => {
//     setLoading(true);
//     toast.info("Refreshing requests...");
//     setTimeout(() => {
//       loadRequests();
//       toast.success("Requests refreshed!");
//     }, 800);
//   };

//   // Reset form
//   const resetForm = () => {
//     setFormData({
//       name: userName || "",
//       email: userEmail || "",
//       message: "",
//       image: null,
//       imagePreview: "",
//     });
//     setFormErrors({});
//   };

//   // Open edit modal
//   const openEditModal = (request: Request) => {
//     setSelectedRequest(request);
//     setFormData({
//       name: request.name,
//       email: request.email,
//       message: request.message,
//       image: null,
//       imagePreview: request.image?.dataUrl || "",
//     });
//     setIsEditModalOpen(true);
//   };

//   // Open view modal
//   const openViewModal = (request: Request) => {
//     setSelectedRequest(request);
//     setIsViewModalOpen(true);
//   };

//   // Open delete modal
//   const openDeleteModal = (request: Request) => {
//     setSelectedRequest(request);
//     setIsDeleteModalOpen(true);
//   };

//   // Check if user can edit request
//   const canEditRequest = (request: Request): boolean => {
//     return (
//       isAdmin || (request.email === userEmail && request.status === "pending")
//     );
//   };

//   // Check if user can delete request
//   const canDeleteRequest = (request: Request): boolean => {
//     return (
//       isAdmin || (request.email === userEmail && request.status === "pending")
//     );
//   };

//   // Handle status change (admin only)
//   const handleStatusChange = async (
//     request: Request,
//     newStatus: Request["status"],
//   ) => {
//     if (!isAdmin) {
//       toast.warning(t.permissions.adminOnly);
//       return;
//     }

//     try {
//       const updated = await mockUpdateRequest(request.id, {
//         status: newStatus,
//       });
//       setRequests(requests.map((r) => (r.id === request.id ? updated : r)));
//       toast.success(`✅ Status updated to ${getStatusLabel(newStatus)}`);
//     } catch (error) {
//       console.error("Error updating status:", error);
//       toast.error(`❌ Failed to update status`);
//     }
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

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="mb-6">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
//               <svg
//                 className="w-7 h-7 text-[#FF385C]"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
//                 />
//               </svg>
//               {t.myRequests}
//             </h1>
//             <p className="text-sm text-gray-500 mt-1">{t.manageRequests}</p>
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => {
//                 resetForm();
//                 setIsCreateModalOpen(true);
//               }}
//               className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF385C] text-white rounded-xl font-medium hover:bg-[#E31C5F] transition-colors text-sm"
//             >
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M12 4v16m8-8H4"
//                 />
//               </svg>
//               {t.newRequest}
//             </button>
//             <button
//               onClick={handleRefresh}
//               className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//               disabled={loading}
//             >
//               <svg
//                 className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//                 />
//               </svg>
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
//             <svg
//               className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
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
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
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
//                   {t.message}
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
//                     <svg
//                       className="w-12 h-12 mx-auto text-gray-300 mb-2"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//                       />
//                     </svg>
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
//                           <svg
//                             className="w-3 h-3 text-gray-400"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                             />
//                           </svg>
//                           <span className="text-xs text-gray-400">
//                             {request.image.name}
//                           </span>
//                         </div>
//                       )}
//                     </td>
//                     <td className="px-4 py-3">
//                       {isAdmin ? (
//                         <div className="flex items-center gap-2">
//                           <span
//                             className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
//                               request.status,
//                             )}`}
//                           >
//                             {getStatusLabel(request.status)}
//                           </span>
//                           <select
//                             value={request.status}
//                             onChange={(e) =>
//                               handleStatusChange(
//                                 request,
//                                 e.target.value as Request["status"],
//                               )
//                             }
//                             className="px-2 py-1 text-xs border rounded-lg focus:ring-2 focus:ring-[#FF385C] outline-none"
//                           >
//                             <option value="pending">
//                               {t.statuses.pending}
//                             </option>
//                             <option value="reviewing">
//                               {t.statuses.reviewing}
//                             </option>
//                             <option value="resolved">
//                               {t.statuses.resolved}
//                             </option>
//                             <option value="rejected">
//                               {t.statuses.rejected}
//                             </option>
//                           </select>
//                         </div>
//                       ) : (
//                         <span
//                           className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
//                             request.status,
//                           )}`}
//                         >
//                           {getStatusLabel(request.status)}
//                         </span>
//                       )}
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
//                           <svg
//                             className="w-4 h-4"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                             />
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                             />
//                           </svg>
//                         </motion.button>
//                         {canEditRequest(request) && (
//                           <motion.button
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.9 }}
//                             onClick={() => openEditModal(request)}
//                             className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
//                             title={t.editRequest}
//                           >
//                             <svg
//                               className="w-4 h-4"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
//                               />
//                             </svg>
//                           </motion.button>
//                         )}
//                         {canDeleteRequest(request) && (
//                           <motion.button
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.9 }}
//                             onClick={() => openDeleteModal(request)}
//                             className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                             title={t.deleteRequest}
//                           >
//                             <svg
//                               className="w-4 h-4"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                               />
//                             </svg>
//                           </motion.button>
//                         )}
//                         {!canEditRequest(request) &&
//                           !canDeleteRequest(request) &&
//                           !isAdmin && (
//                             <span className="text-xs text-gray-400">
//                               View only
//                             </span>
//                           )}
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

//       {/* Create Request Modal */}
//       <AnimatePresence>
//         {isCreateModalOpen && (
//           <>
//             <motion.div
//               variants={overlayVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
//               onClick={() => {
//                 setIsCreateModalOpen(false);
//                 resetForm();
//               }}
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
//                   <h2 className="text-xl font-semibold text-gray-900">
//                     {t.createRequest}
//                   </h2>
//                   <motion.button
//                     whileHover={{ rotate: 90, scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => {
//                       setIsCreateModalOpen(false);
//                       resetForm();
//                     }}
//                     className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
//                   >
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </motion.button>
//                 </div>

//                 <div className="p-6 space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       {t.yourName}
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.name}
//                       onChange={(e) =>
//                         setFormData({ ...formData, name: e.target.value })
//                       }
//                       className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none ${
//                         formErrors.name ? "border-red-500" : "border-gray-300"
//                       }`}
//                       placeholder={t.yourName}
//                     />
//                     {formErrors.name && (
//                       <p className="mt-1 text-sm text-red-500">
//                         {formErrors.name}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       {t.yourEmail}
//                     </label>
//                     <input
//                       type="email"
//                       value={formData.email}
//                       onChange={(e) =>
//                         setFormData({ ...formData, email: e.target.value })
//                       }
//                       className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none ${
//                         formErrors.email ? "border-red-500" : "border-gray-300"
//                       }`}
//                       placeholder={t.yourEmail}
//                     />
//                     {formErrors.email && (
//                       <p className="mt-1 text-sm text-red-500">
//                         {formErrors.email}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       {t.yourMessage}
//                     </label>
//                     <textarea
//                       value={formData.message}
//                       onChange={(e) =>
//                         setFormData({ ...formData, message: e.target.value })
//                       }
//                       rows={4}
//                       className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none resize-none ${
//                         formErrors.message
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       }`}
//                       placeholder={t.yourMessage}
//                     />
//                     {formErrors.message && (
//                       <p className="mt-1 text-sm text-red-500">
//                         {formErrors.message}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       {t.attachImage}
//                     </label>
//                     <div className="flex items-center gap-4">
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleFileUpload}
//                         className="hidden"
//                         id="image-upload"
//                       />
//                       <label
//                         htmlFor="image-upload"
//                         className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer text-sm"
//                       >
//                         Choose File
//                       </label>
//                       {formData.imagePreview && (
//                         <div className="relative">
//                           <img
//                             src={formData.imagePreview}
//                             alt="Preview"
//                             className="w-16 h-16 object-cover rounded-lg"
//                           />
//                           <button
//                             onClick={() =>
//                               setFormData({
//                                 ...formData,
//                                 image: null,
//                                 imagePreview: "",
//                               })
//                             }
//                             className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
//                           >
//                             <svg
//                               className="w-3 h-3"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M6 18L18 6M6 6l12 12"
//                               />
//                             </svg>
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                     <p className="mt-1 text-xs text-gray-500">
//                       {t.imageRequirements}
//                     </p>
//                   </div>

//                   <div className="flex gap-3 pt-4 border-t border-gray-200">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => {
//                         setIsCreateModalOpen(false);
//                         resetForm();
//                       }}
//                       className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
//                     >
//                       {t.cancel}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handleCreateRequest}
//                       disabled={submitting}
//                       className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 ${
//                         submitting
//                           ? "bg-gray-400 cursor-not-allowed"
//                           : "bg-[#FF385C] hover:bg-[#E31C5F]"
//                       }`}
//                     >
//                       {submitting ? (
//                         <>
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           {t.sending}
//                         </>
//                       ) : (
//                         t.send
//                       )}
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Edit Request Modal */}
//       <AnimatePresence>
//         {isEditModalOpen && selectedRequest && (
//           <>
//             <motion.div
//               variants={overlayVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
//               onClick={() => {
//                 setIsEditModalOpen(false);
//                 setSelectedRequest(null);
//                 resetForm();
//               }}
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
//                   <h2 className="text-xl font-semibold text-gray-900">
//                     {t.editRequest}
//                   </h2>
//                   <motion.button
//                     whileHover={{ rotate: 90, scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => {
//                       setIsEditModalOpen(false);
//                       setSelectedRequest(null);
//                       resetForm();
//                     }}
//                     className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
//                   >
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </motion.button>
//                 </div>

//                 <div className="p-6 space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       {t.yourName}
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.name}
//                       onChange={(e) =>
//                         setFormData({ ...formData, name: e.target.value })
//                       }
//                       className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none ${
//                         formErrors.name ? "border-red-500" : "border-gray-300"
//                       }`}
//                       placeholder={t.yourName}
//                     />
//                     {formErrors.name && (
//                       <p className="mt-1 text-sm text-red-500">
//                         {formErrors.name}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       {t.yourEmail}
//                     </label>
//                     <input
//                       type="email"
//                       value={formData.email}
//                       onChange={(e) =>
//                         setFormData({ ...formData, email: e.target.value })
//                       }
//                       className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none ${
//                         formErrors.email ? "border-red-500" : "border-gray-300"
//                       }`}
//                       placeholder={t.yourEmail}
//                     />
//                     {formErrors.email && (
//                       <p className="mt-1 text-sm text-red-500">
//                         {formErrors.email}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       {t.yourMessage}
//                     </label>
//                     <textarea
//                       value={formData.message}
//                       onChange={(e) =>
//                         setFormData({ ...formData, message: e.target.value })
//                       }
//                       rows={4}
//                       className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none resize-none ${
//                         formErrors.message
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       }`}
//                       placeholder={t.yourMessage}
//                     />
//                     {formErrors.message && (
//                       <p className="mt-1 text-sm text-red-500">
//                         {formErrors.message}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       {t.attachImage}
//                     </label>
//                     <div className="flex items-center gap-4">
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleFileUpload}
//                         className="hidden"
//                         id="image-upload-edit"
//                       />
//                       <label
//                         htmlFor="image-upload-edit"
//                         className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer text-sm"
//                       >
//                         {formData.imagePreview ? "Change Image" : "Choose File"}
//                       </label>
//                       {formData.imagePreview && (
//                         <div className="relative">
//                           <img
//                             src={formData.imagePreview}
//                             alt="Preview"
//                             className="w-16 h-16 object-cover rounded-lg"
//                           />
//                           <button
//                             onClick={() =>
//                               setFormData({
//                                 ...formData,
//                                 image: null,
//                                 imagePreview: "",
//                               })
//                             }
//                             className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
//                           >
//                             <svg
//                               className="w-3 h-3"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M6 18L18 6M6 6l12 12"
//                               />
//                             </svg>
//                           </button>
//                         </div>
//                       )}
//                       {!formData.imagePreview && selectedRequest.image && (
//                         <div className="relative">
//                           <img
//                             src={selectedRequest.image.dataUrl}
//                             alt="Current"
//                             className="w-16 h-16 object-cover rounded-lg"
//                           />
//                           <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-1 rounded">
//                             current
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                     <p className="mt-1 text-xs text-gray-500">
//                       {t.imageRequirements}
//                     </p>
//                   </div>

//                   <div className="flex gap-3 pt-4 border-t border-gray-200">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => {
//                         setIsEditModalOpen(false);
//                         setSelectedRequest(null);
//                         resetForm();
//                       }}
//                       className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
//                     >
//                       {t.cancel}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handleUpdateRequest}
//                       disabled={submitting}
//                       className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 ${
//                         submitting
//                           ? "bg-gray-400 cursor-not-allowed"
//                           : "bg-[#FF385C] hover:bg-[#E31C5F]"
//                       }`}
//                     >
//                       {submitting ? (
//                         <>
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           {t.sending}
//                         </>
//                       ) : (
//                         t.updateRequest
//                       )}
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

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
//                   <h2 className="text-xl font-semibold text-gray-900">
//                     {t.requestDetails}
//                   </h2>
//                   <motion.button
//                     whileHover={{ rotate: 90, scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => setIsViewModalOpen(false)}
//                     className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
//                   >
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </motion.button>
//                 </div>

//                 <div className="p-6 space-y-4">
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
//                       <svg
//                         className="w-8 h-8 text-red-600"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                         />
//                       </svg>
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
//                       disabled={submitting}
//                       className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors ${
//                         submitting
//                           ? "bg-gray-400 cursor-not-allowed"
//                           : "bg-red-600 hover:bg-red-700"
//                       }`}
//                     >
//                       {submitting ? (
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
//                   <svg
//                     className="w-8 h-8"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
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
import AddIcon from "@mui/icons-material/Add";
import { Close, Send } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

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

// Request Form Data
interface RequestFormData {
  name: string;
  email: string;
  message: string;
  language: string;
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
    requestManagement: "My Support Requests",
    manageRequests: "Create and manage your support requests",
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
    noUserEmail: "No user email found. Please login again.",
    createRequest: "Create New Request",
    createRequestTitle: "Submit a Support Request",
    yourName: "Your Name",
    yourEmail: "Your Email",
    yourMessage: "Your Message",
    messagePlaceholder: "Describe your issue or request in detail...",
    submitting: "Submitting...",
    createSuccess: "Request created successfully!",
    createFailed: "Failed to create request",
    success: "Success",
    failure: "Failure",
    requestCreated: "Your support request has been created successfully.",
    requestCreatedDetails: "Our team will review your request and get back to you shortly.",
    requestFailed: "Failed to create your support request.",
    requestFailedDetails: "Please try again or contact support directly if the issue persists.",
    nameRequired: "Name is required",
    emailRequired: "Email is required",
    emailInvalid: "Please enter a valid email",
    messageMinLength: "Message must be at least 10 characters",
    messageMaxLength: "Message cannot exceed 1000 characters",
    pleaseFixErrors: "Please fix the errors above",
  },
  fr: {
    requestManagement: "Mes Demandes de Support",
    manageRequests: "Créer et gérer vos demandes de support",
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
    noUserEmail: "Aucun email utilisateur trouvé. Veuillez vous reconnecter.",
    createRequest: "Créer une Nouvelle Demande",
    createRequestTitle: "Soumettre une Demande de Support",
    yourName: "Votre Nom",
    yourEmail: "Votre Email",
    yourMessage: "Votre Message",
    messagePlaceholder: "Décrivez votre problème ou demande en détail...",
    submitting: "Soumission en cours...",
    createSuccess: "Demande créée avec succès !",
    createFailed: "Échec de la création de la demande",
    success: "Succès",
    failure: "Échec",
    requestCreated: "Votre demande de support a été créée avec succès.",
    requestCreatedDetails: "Notre équipe examinera votre demande et vous répondra sous peu.",
    requestFailed: "Échec de la création de votre demande de support.",
    requestFailedDetails: "Veuillez réessayer ou contacter le support directement si le problème persiste.",
    nameRequired: "Le nom est requis",
    emailRequired: "L'email est requis",
    emailInvalid: "Veuillez entrer un email valide",
    messageMinLength: "Le message doit contenir au moins 10 caractères",
    messageMaxLength: "Le message ne peut pas dépasser 1000 caractères",
    pleaseFixErrors: "Veuillez corriger les erreurs ci-dessus",
  },
  rw: {
    requestManagement: "Ibyifuzo Byanjye",
    manageRequests: "Kurema no gucunga ibyifuzo byawe",
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
    noUserEmail: "Nta imeri y'umukoresha yabonetse. Nyamuneka winjire undi munsi.",
    createRequest: "Kurema Icyifuzo Gishya",
    createRequestTitle: "Ohereza Icyifuzo cy'Ubufasha",
    yourName: "Izina Ryawe",
    yourEmail: "Imeri Yawe",
    yourMessage: "Ubutumwa Bwawe",
    messagePlaceholder: "Sobanura ikibazo cyawe cyangwa icyifuzo mu buryo bwihariye...",
    submitting: "Birakoherezwa...",
    createSuccess: "Icyifuzo cyakozwe neza!",
    createFailed: "Kurema icyifuzo birananiranye",
    success: "Byakunze",
    failure: "Byananiwe",
    requestCreated: "Icyifuzo cyawe cyoherejwe neza.",
    requestCreatedDetails: "Itsinda ryacu rizasuzuma icyifuzo cyawe kikagusubiza vuba.",
    requestFailed: "Kohereza icyifuzo cyawe byananiwe.",
    requestFailedDetails: "Gerageza undi munsi cyangwa uvuge n'ubufasha mu buryo butaziguye niba ikibazo kigikomeza.",
    nameRequired: "Izina rirasabwa",
    emailRequired: "Imeri irasabwa",
    emailInvalid: "Andika imeri ikwiye",
    messageMinLength: "Ubutumwa bugomba kuba ibinyuguti 10 byibuze",
    messageMaxLength: "Ubutumwa ntibugomba kurenga ibinyuguti 1000",
    pleaseFixErrors: "Kosora amakosa hejuru",
  },
};

// Helper function to get language from cookies
const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
  const lang = Cookies.get("language") as "en" | "fr" | "rw";
  return lang || "en";
};

// Helper function to get user email from localStorage
const getUserEmailFromStorage = (): string => {
  // First try to get from user object (set during login)
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.email) {
        return user.email;
      }
    }
  } catch (e) {
    console.error("Error parsing user from localStorage:", e);
  }
  
  // Try individual keys as fallback
  const keys = ["userEmail", "email"];
  for (const key of keys) {
    const value = localStorage.getItem(key);
    if (value) {
      return value;
    }
  }
  
  return "";
};

// Helper function to get user name from localStorage
const getUserNameFromStorage = (): string => {
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.name) {
        return user.name;
      }
    }
  } catch (e) {
    console.error("Error parsing user from localStorage:", e);
  }
  return "";
};

// API Base URL
const API_BASE_URL = "https://rene-inyumba-nodejs.onrender.com";

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

export const UserRequestManagement: React.FC = () => {
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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<RequestUI | null>(
    null,
  );
  const [responseText, setResponseText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [successDetails, setSuccessDetails] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorDetails, setErrorDetails] = useState("");

  // Create form state
  const [createFormData, setCreateFormData] = useState<RequestFormData>({
    name: "",
    email: "",
    message: "",
    language: "en",
  });

  // Form validation errors
  const [formErrors, setFormErrors] = useState<FormErrors>({});

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

  // Get user email from localStorage
  const userEmail = getUserEmailFromStorage();
  const userName = getUserNameFromStorage();

  // Initialize form with user data
  useEffect(() => {
    if (userName) {
      setCreateFormData(prev => ({ ...prev, name: userName }));
    }
    if (userEmail) {
      setCreateFormData(prev => ({ ...prev, email: userEmail }));
    }
  }, [userName, userEmail]);

  // Validate create form
  const validateCreateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    if (!createFormData.name || createFormData.name.trim().length < 2) {
      errors.name = t.nameRequired;
      isValid = false;
    }

    if (!createFormData.email) {
      errors.email = t.emailRequired;
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(createFormData.email)) {
      errors.email = t.emailInvalid;
      isValid = false;
    }

    if (!createFormData.message || createFormData.message.trim().length < 10) {
      errors.message = t.messageMinLength;
      isValid = false;
    } else if (createFormData.message.trim().length > 1000) {
      errors.message = t.messageMaxLength;
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Handle create form field changes
  const handleCreateFormChange = (field: keyof RequestFormData, value: string) => {
    setCreateFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field
    if (field !== 'language' && formErrors[field as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [field as keyof FormErrors]: undefined }));
    }
  };

  // Fetch requests by user email - GET /requests/email/:email
  const fetchRequests = async () => {
    setIsFetching(true);
    try {
      const currentEmail = getUserEmailFromStorage();
      
      if (!currentEmail) {
        toast.error(`❌ ${t.noUserEmail}`);
        setIsFetching(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/requests/email/${encodeURIComponent(currentEmail)}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setRequests([]);
          setIsFetching(false);
          return;
        }
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
      toast.error(`❌ ${t.fetchError}`);
    } finally {
      setIsFetching(false);
    }
  };

  // Create new request
  const handleCreateRequest = async () => {
    if (!validateCreateForm()) {
      toast.warning(`⚠️ ${t.pleaseFixErrors}`);
      return;
    }

    setIsSubmitting(true);

    try {
      const requestData = {
        name: createFormData.name,
        email: createFormData.email,
        message: createFormData.message,
        language: createFormData.language || "en",
      };

      const response = await fetch(`${API_BASE_URL}/requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create request");
      }

      const newRequest = await response.json();
      const transformedRequest = transformRequestToUI(newRequest);
      
      setRequests((prev) => [transformedRequest, ...prev]);
      
      // Show success modal
      setSuccessMessage(t.requestCreated);
      setSuccessDetails(t.requestCreatedDetails);
      setIsSuccessModalOpen(true);
      
      // Reset form
      setCreateFormData({
        name: userName || "",
        email: userEmail || "",
        message: "",
        language: "en",
      });
      setFormErrors({});
      setIsCreateModalOpen(false);
      
    } catch (error) {
      console.error("Create request error:", error);
      // Show error modal
      setErrorMessage(t.requestFailed);
      setErrorDetails(t.requestFailedDetails);
      setIsErrorModalOpen(true);
    } finally {
      setIsSubmitting(false);
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
      toast.warning("⚠️ Please enter a response");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/requests/${selectedRequest._id}`, {
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
      const response = await fetch(`${API_BASE_URL}/requests/${selectedRequest._id}`, {
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
            {userEmail && (
              <p className="text-xs text-gray-400 mt-1">Requests for: {userEmail}</p>
            )}
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
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors flex items-center gap-2 text-sm"
            >
              <AddIcon className="w-4 h-4" />
              {t.createRequest}
            </motion.button>
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
                        {request.status === "Pending" && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => openRespondModal(request)}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title={t.respond}
                          >
                            <ChatIcon className="w-4 h-4" />
                          </motion.button>
                        )}
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

      {/* Create Request Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setIsCreateModalOpen(false)}
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
                    <SupportAgentIcon className="text-[#FF385C] w-5 h-5" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      {t.createRequestTitle}
                    </h2>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsCreateModalOpen(false)}
                    className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="p-6 space-y-4">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.yourName} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={createFormData.name}
                      onChange={(e) => handleCreateFormChange("name", e.target.value)}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
                        formErrors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your full name"
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-xs text-red-500">{formErrors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.yourEmail} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={createFormData.email}
                      onChange={(e) => handleCreateFormChange("email", e.target.value)}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm ${
                        formErrors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your email address"
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-xs text-red-500">{formErrors.email}</p>
                    )}
                  </div>

                  {/* Language Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.language}
                    </label>
                    <select
                      value={createFormData.language}
                      onChange={(e) => handleCreateFormChange("language", e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                    >
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                      <option value="rw">Kinyarwanda</option>
                    </select>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.yourMessage} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={createFormData.message}
                      onChange={(e) => handleCreateFormChange("message", e.target.value)}
                      rows={5}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none ${
                        formErrors.message ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={t.messagePlaceholder}
                    />
                    <div className="flex justify-between mt-1">
                      {formErrors.message ? (
                        <p className="text-xs text-red-500">{formErrors.message}</p>
                      ) : (
                        <p className="text-xs text-gray-400">
                          {createFormData.message.length}/1000 characters
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCreateRequest}
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
                          {t.submitting}
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
                      onClick={() => setIsCreateModalOpen(false)}
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

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccessModalOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
              onClick={() => setIsSuccessModalOpen(false)}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            >
              <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white relative">
                <div className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircleIcon className="w-10 h-10 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                    {t.success}
                  </h3>
                  <p className="text-gray-700 text-center mb-2">
                    {successMessage}
                  </p>
                  <p className="text-sm text-gray-500 text-center mb-6">
                    {successDetails}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsSuccessModalOpen(false);
                      fetchRequests();
                    }}
                    className="w-full px-4 py-2.5 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors"
                  >
                    {t.close}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Error Modal */}
      <AnimatePresence>
        {isErrorModalOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
              onClick={() => setIsErrorModalOpen(false)}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            >
              <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white relative">
                <div className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                      <ErrorIcon className="w-10 h-10 text-red-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                    {t.failure}
                  </h3>
                  <p className="text-gray-700 text-center mb-2">
                    {errorMessage}
                  </p>
                  <p className="text-sm text-gray-500 text-center mb-6">
                    {errorDetails}
                  </p>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsErrorModalOpen(false);
                        setIsCreateModalOpen(true);
                      }}
                      className="flex-1 px-4 py-2.5 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors"
                    >
                      Try Again
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsErrorModalOpen(false)}
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
                            alt={
                              selectedRequest.image.public_id || "Request image"
                            }
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
                    {selectedRequest.status === "Pending" && (
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
                    )}
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