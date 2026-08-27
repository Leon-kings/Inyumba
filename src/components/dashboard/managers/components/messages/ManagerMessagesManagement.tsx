// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-hooks/set-state-in-effect */
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// import "react-toastify/dist/ReactToastify.css";
// import Cookies from "js-cookie";
// import axios from "axios";

// // Material-UI Icons
// import MessageIcon from "@mui/icons-material/Message";
// import CloseIcon from "@mui/icons-material/Close";
// import SearchIcon from "@mui/icons-material/Search";
// import RefreshIcon from "@mui/icons-material/Refresh";
// import DeleteIcon from "@mui/icons-material/Delete";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import ClearIcon from "@mui/icons-material/Clear";
// import StarIcon from "@mui/icons-material/Star";
// import StarBorderIcon from "@mui/icons-material/StarBorder";
// import FlagIcon from "@mui/icons-material/Flag";
// import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
// import ReplyIcon from "@mui/icons-material/Reply";
// import ArchiveIcon from "@mui/icons-material/Archive";
// import UnarchiveIcon from "@mui/icons-material/Unarchive";
// import SendIcon from "@mui/icons-material/Send";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import ErrorIcon from "@mui/icons-material/Error";

// // ============================================================
// // MODAL COMPONENTS
// // ============================================================

// // Success Modal
// interface SuccessModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   message: string;
//   details?: string;
// }

// const SuccessModal: React.FC<SuccessModalProps> = ({
//   isOpen,
//   onClose,
//   title,
//   message,
//   details,
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[300] flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden animate-in fade-in zoom-in duration-300">
//         <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-600" />
//         <div className="p-6">
//           <div className="flex items-center justify-center mb-4">
//             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center relative">
//               <div className="absolute inset-0 rounded-full border-4 border-green-200 animate-ping opacity-75" />
//               <CheckCircleIcon className="w-10 h-10 text-green-600 relative z-10" />
//             </div>
//           </div>
//           <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
//             {title}
//           </h3>
//           <p className="text-gray-600 text-center mb-2">{message}</p>
//           {details && (
//             <p className="text-sm text-gray-400 text-center mb-6">{details}</p>
//           )}
//           <button
//             onClick={onClose}
//             className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
//           >
//             Got it!
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Error Modal
// interface ErrorModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   message: string;
//   details?: string;
// }

// const ErrorModal: React.FC<ErrorModalProps> = ({
//   isOpen,
//   onClose,
//   title,
//   message,
//   details,
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[300] flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden animate-in fade-in zoom-in duration-300">
//         <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-red-600" />
//         <div className="p-6">
//           <div className="flex items-center justify-center mb-4">
//             <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center relative">
//               <div className="absolute inset-0 rounded-full border-4 border-red-200 animate-ping opacity-75" />
//               <ErrorIcon className="w-10 h-10 text-red-600 relative z-10" />
//             </div>
//           </div>
//           <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
//             {title}
//           </h3>
//           <p className="text-gray-600 text-center mb-2">{message}</p>
//           {details && (
//             <p className="text-sm text-gray-400 text-center mb-6">{details}</p>
//           )}
//           <button
//             onClick={onClose}
//             className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Info Modal
// interface InfoModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   message: string;
//   details?: string;
// }

// const InfoModal: React.FC<InfoModalProps> = ({
//   isOpen,
//   onClose,
//   title,
//   message,
//   details,
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[300] flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden animate-in fade-in zoom-in duration-300">
//         <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600" />
//         <div className="p-6">
//           <div className="flex items-center justify-center mb-4">
//             <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center relative">
//               <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-ping opacity-75" />
//               <MessageIcon className="w-10 h-10 text-blue-600 relative z-10" />
//             </div>
//           </div>
//           <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
//             {title}
//           </h3>
//           <p className="text-gray-600 text-center mb-2">{message}</p>
//           {details && (
//             <p className="text-sm text-gray-400 text-center mb-6">{details}</p>
//           )}
//           <button
//             onClick={onClose}
//             className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
//           >
//             Got it!
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Confirm Modal
// interface ConfirmModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: () => void;
//   title: string;
//   message: string;
//   confirmText?: string;
//   cancelText?: string;
//   icon?: React.ReactNode;
//   isSubmitting?: boolean;
//   type?: "danger" | "warning" | "info" | "success";
// }

// const ConfirmModal: React.FC<ConfirmModalProps> = ({
//   isOpen,
//   onClose,
//   onConfirm,
//   title,
//   message,
//   confirmText = "Confirm",
//   cancelText = "Cancel",
//   icon,
//   isSubmitting = false,
//   type = "warning",
// }) => {
//   if (!isOpen) return null;

//   const getColors = () => {
//     switch (type) {
//       case "danger":
//         return {
//           iconBg: "bg-red-100",
//           iconColor: "text-red-600",
//           iconBorder: "border-red-200",
//           buttonBg: "bg-gradient-to-r from-red-500 to-red-600",
//           buttonHover: "hover:shadow-lg",
//         };
//       case "warning":
//         return {
//           iconBg: "bg-yellow-100",
//           iconColor: "text-yellow-600",
//           iconBorder: "border-yellow-200",
//           buttonBg: "bg-gradient-to-r from-yellow-500 to-yellow-600",
//           buttonHover: "hover:shadow-lg",
//         };
//       case "success":
//         return {
//           iconBg: "bg-green-100",
//           iconColor: "text-green-600",
//           iconBorder: "border-green-200",
//           buttonBg: "bg-gradient-to-r from-green-500 to-green-600",
//           buttonHover: "hover:shadow-lg",
//         };
//       default:
//         return {
//           iconBg: "bg-blue-100",
//           iconColor: "text-blue-600",
//           iconBorder: "border-blue-200",
//           buttonBg: "bg-gradient-to-r from-blue-500 to-blue-600",
//           buttonHover: "hover:shadow-lg",
//         };
//     }
//   };

//   const colors = getColors();

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[300] flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden animate-in fade-in zoom-in duration-300">
//         <div
//           className={`absolute top-0 left-0 right-0 h-1 ${colors.buttonBg}`}
//         />
//         <div className="p-6">
//           <div className="flex items-center justify-center mb-4">
//             <div
//               className={`w-20 h-20 ${colors.iconBg} rounded-full flex items-center justify-center relative`}
//             >
//               <div
//                 className={`absolute inset-0 rounded-full border-4 ${colors.iconBorder} animate-ping opacity-75`}
//               />
//               <div className={`${colors.iconColor} relative z-10`}>
//                 {icon ||
//                   (type === "danger" ? (
//                     <DeleteIcon className="w-10 h-10" />
//                   ) : type === "warning" ? (
//                     <ErrorIcon className="w-10 h-10" />
//                   ) : type === "success" ? (
//                     <CheckCircleIcon className="w-10 h-10" />
//                   ) : (
//                     <MessageIcon className="w-10 h-10" />
//                   ))}
//               </div>
//             </div>
//           </div>
//           <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
//             {title}
//           </h3>
//           <p className="text-gray-600 text-center mb-6">{message}</p>
//           <div className="flex gap-3">
//             <button
//               onClick={onClose}
//               disabled={isSubmitting}
//               className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
//             >
//               {cancelText}
//             </button>
//             <button
//               onClick={onConfirm}
//               disabled={isSubmitting}
//               className={`flex-1 px-4 py-2.5 ${colors.buttonBg} text-white rounded-xl font-medium ${colors.buttonHover} transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2`}
//             >
//               {isSubmitting ? (
//                 <>
//                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                   Loading...
//                 </>
//               ) : (
//                 confirmText
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // API Configuration
// const API_URL = "https://rene-inyumba-nodejs.onrender.com/contact";

// // Types - Updated to match the contact model
// interface Contact {
//   id?: string;
//   _id: string;
//   name: string;
//   email: string;
//   message: string;
//   status: "pending" | "read" | "replied" | "archived";
//   ipAddress: string | null;
//   userAgent: string | null;
//   repliedAt: string | null;
//   readAt: string | null;
//   replyMessage: string | null;
//   createdAt: string;
//   updatedAt: string;
//   contactWithStatus?: string;
//   notificationMessage?: string;
//   messagePreview?: string;
//   responseTime?: string | null;
// }

// // Extended type for UI purposes
// interface Message extends Contact {
//   senderName: string;
//   senderEmail: string;
//   content: string;
//   subject: string;
//   isRead: boolean;
//   isFlagged: boolean;
//   isStarred: boolean;
//   category:
//     | "general"
//     | "support"
//     | "booking"
//     | "payment"
//     | "complaint"
//     | "feedback"
//     | "other";
//   priority: "low" | "medium" | "high" | "urgent";
//   labels: string[];
//   tags: string[];
//   repliedBy?: string;
//   attachments?: any[];
//   recipientEmail?: string;
//   recipientId?: string;
//   senderId?: string;
// }

// // Translations
// const translations = {
//   en: {
//     messageManagement: "Message Management",
//     manageMessages: "Manage all incoming messages and communications",
//     total: "Total",
//     pending: "Pending",
//     read: "Read",
//     replied: "Replied",
//     resolved: "Resolved",
//     archived: "Archived",
//     flagged: "Flagged",
//     starred: "Starred",
//     searchMessages: "Search by name, email, or message...",
//     allStatus: "All Status",
//     allCategories: "All Categories",
//     allPriorities: "All Priorities",
//     message: "Message",
//     sender: "Sender",
//     subject: "Subject",
//     category: "Category",
//     priority: "Priority",
//     status: "Status",
//     received: "Received",
//     actions: "Actions",
//     noMessages: "No messages found",
//     adjustFilters: "Try adjusting your search or filters",
//     showing: "Showing",
//     of: "of",
//     messages: "messages",
//     viewMessage: "View Message",
//     reply: "Reply",
//     deleteMessage: "Delete Message",
//     deleteConfirmation: "Are you sure you want to delete this message?",
//     actionUndone: "This action cannot be undone.",
//     cancel: "Cancel",
//     delete: "Delete",
//     deleting: "Deleting...",
//     messageDeleted: "Message deleted successfully!",
//     deleteFailed: "Failed to delete message",
//     statusUpdated: "Message status updated successfully!",
//     statusUpdateFailed: "Failed to update message status",
//     replySent: "Reply sent successfully!",
//     replyFailed: "Failed to send reply",
//     messageDetails: "Message Details",
//     senderName: "Sender Name",
//     senderEmail: "Sender Email",
//     recipientEmail: "Recipient Email",
//     messageContent: "Message Content",
//     attachments: "Attachments",
//     replyLabel: "Reply",
//     sendReply: "Send Reply",
//     updateStatus: "Update Status",
//     selectStatus: "Select Status",
//     replyPlaceholder: "Type your reply here...",
//     noAttachments: "No attachments",
//     close: "Close",
//     send: "Send",
//     sending: "Sending...",
//     markAsRead: "Mark as Read",
//     markAsUnread: "Mark as Unread",
//     toggleStar: "Toggle Star",
//     toggleFlag: "Toggle Flag",
//     archive: "Archive",
//     unarchive: "Unarchive",
//     labels: "Labels",
//     tags: "Tags",
//     addLabel: "Add Label",
//     addTag: "Add Tag",
//     general: "General",
//     support: "Support",
//     booking: "Booking",
//     payment: "Payment",
//     complaint: "Complaint",
//     feedback: "Feedback",
//     other: "Other",
//     low: "Low",
//     medium: "Medium",
//     high: "High",
//     urgent: "Urgent",
//     all: "All",
//     selectCategory: "Select Category",
//     selectPriority: "Select Priority",
//     recipient: "Recipient",
//     content: "Content",
//     attachmentsLabel: "Attachments",
//     noImage: "No image attached",
//     viewImage: "View Image",
//     loading: "Loading...",
//     fetchError: "Failed to load messages",
//     replyTo: "Reply to",
//     allFieldsValid: "All fields are valid!",
//     pleaseFixErrors: "Please fix the errors above",
//     managerAccess: "Manager Access",
//     managerViewOnly: "You have view and reply access to messages",
//     success: "Success!",
//     error: "Error",
//     confirm: "Confirm",
//   },
//   fr: {
//     messageManagement: "Gestion des Messages",
//     manageMessages: "Gérer tous les messages et communications entrants",
//     total: "Total",
//     pending: "En Attente",
//     read: "Lu",
//     replied: "Répondu",
//     resolved: "Résolu",
//     archived: "Archivé",
//     flagged: "Signalé",
//     starred: "Favori",
//     searchMessages: "Rechercher par nom, email ou contenu...",
//     allStatus: "Tous les Statuts",
//     allCategories: "Toutes les Catégories",
//     allPriorities: "Toutes les Priorités",
//     message: "Message",
//     sender: "Expéditeur",
//     subject: "Sujet",
//     category: "Catégorie",
//     priority: "Priorité",
//     status: "Statut",
//     received: "Reçu",
//     actions: "Actions",
//     noMessages: "Aucun message trouvé",
//     adjustFilters: "Essayez d'ajuster votre recherche ou vos filtres",
//     showing: "Affichage",
//     of: "de",
//     messages: "messages",
//     viewMessage: "Voir le Message",
//     reply: "Répondre",
//     deleteMessage: "Supprimer le Message",
//     deleteConfirmation: "Êtes-vous sûr de vouloir supprimer ce message ?",
//     actionUndone: "Cette action est irréversible.",
//     cancel: "Annuler",
//     delete: "Supprimer",
//     deleting: "Suppression...",
//     messageDeleted: "Message supprimé avec succès !",
//     deleteFailed: "Échec de la suppression du message",
//     statusUpdated: "Statut du message mis à jour avec succès !",
//     statusUpdateFailed: "Échec de la mise à jour du statut",
//     replySent: "Réponse envoyée avec succès !",
//     replyFailed: "Échec de l'envoi de la réponse",
//     messageDetails: "Détails du Message",
//     senderName: "Nom de l'Expéditeur",
//     senderEmail: "Email de l'Expéditeur",
//     recipientEmail: "Email du Destinataire",
//     messageContent: "Contenu du Message",
//     attachments: "Pièces Jointes",
//     replyLabel: "Réponse",
//     sendReply: "Envoyer la Réponse",
//     updateStatus: "Mettre à Jour le Statut",
//     selectStatus: "Sélectionner le Statut",
//     replyPlaceholder: "Tapez votre réponse ici...",
//     noAttachments: "Aucune pièce jointe",
//     close: "Fermer",
//     send: "Envoyer",
//     sending: "Envoi en cours...",
//     markAsRead: "Marquer comme Lu",
//     markAsUnread: "Marquer comme Non Lu",
//     toggleStar: "Basculer Favori",
//     toggleFlag: "Basculer Signalement",
//     archive: "Archiver",
//     unarchive: "Désarchiver",
//     labels: "Étiquettes",
//     tags: "Tags",
//     addLabel: "Ajouter une Étiquette",
//     addTag: "Ajouter un Tag",
//     general: "Général",
//     support: "Support",
//     booking: "Réservation",
//     payment: "Paiement",
//     complaint: "Réclamation",
//     feedback: "Avis",
//     other: "Autre",
//     low: "Faible",
//     medium: "Moyen",
//     high: "Élevé",
//     urgent: "Urgent",
//     all: "Tous",
//     selectCategory: "Sélectionner une Catégorie",
//     selectPriority: "Sélectionner une Priorité",
//     recipient: "Destinataire",
//     content: "Contenu",
//     attachmentsLabel: "Pièces Jointes",
//     noImage: "Aucune image jointe",
//     viewImage: "Voir l'Image",
//     loading: "Chargement...",
//     fetchError: "Échec du chargement des messages",
//     replyTo: "Répondre à",
//     allFieldsValid: "Tous les champs sont valides !",
//     pleaseFixErrors: "Veuillez corriger les erreurs ci-dessus",
//     managerAccess: "Accès Manager",
//     managerViewOnly:
//       "Vous avez un accès en visualisation et réponse aux messages",
//     success: "Succès !",
//     error: "Erreur",
//     confirm: "Confirmer",
//   },
//   rw: {
//     messageManagement: "Gucunga Ubutumwa",
//     manageMessages: "Gucunga ubutumwa bwose n'itumanaho",
//     total: "Yose",
//     pending: "Bitegereje",
//     read: "Byasomwe",
//     replied: "Byasubijwe",
//     resolved: "Byakemutse",
//     archived: "Byabitswe",
//     flagged: "Byashyizwe ikimenyetso",
//     starred: "Byakunzwe",
//     searchMessages:
//       "Shakisha ukurikije izina, imeri cyangwa ibiri mu butumwa...",
//     allStatus: "Ihagaze Ryose",
//     allCategories: "Ibyiciro Byose",
//     allPriorities: "Iby'ibanze Byose",
//     message: "Ubutumwa",
//     sender: "Uwohereje",
//     subject: "Ikiganiro",
//     category: "Icyiciro",
//     priority: "Iby'ibanze",
//     status: "Ihagaze",
//     received: "Cyakiriwe",
//     actions: "Ibikorwa",
//     noMessages: "Nta butumwa bwabonetse",
//     adjustFilters: "Gerageza guhindura uburyo ushakisha cyangwa amatungo",
//     showing: "Bereka",
//     of: "muri",
//     messages: "ubutumwa",
//     viewMessage: "Reba Ubutumwa",
//     reply: "Subiza",
//     deleteMessage: "Kuraho Ubutumwa",
//     deleteConfirmation: "Uri kwizera ko ushaka gukuraho ubu butumwa?",
//     actionUndone: "Iki gikorwa ntikishobora guhindurwa.",
//     cancel: "Reka",
//     delete: "Kuraho",
//     deleting: "Birakurwaho...",
//     messageDeleted: "Ubutumwa bwakuweho neza!",
//     deleteFailed: "Kuraho ubutumwa birananiranye",
//     statusUpdated: "Ihagaze ry'ubutumwa ryavuguruwe neza!",
//     statusUpdateFailed: "Kuvugurura ihagaze birananiranye",
//     replySent: "Igisubizo cyoherejwe neza!",
//     replyFailed: "Kohereza igisubizo birananiranye",
//     messageDetails: "Ibisobanuro by'Ubutumwa",
//     senderName: "Izina ry'Uwohereje",
//     senderEmail: "Imeri y'Uwohereje",
//     recipientEmail: "Imeri y'Uwakiriye",
//     messageContent: "Ibirimo mu Butumwa",
//     attachments: "Ibishushanyo",
//     replyLabel: "Igisubizo",
//     sendReply: "Ohereza Igisubizo",
//     updateStatus: "Vugurura Ihagaze",
//     selectStatus: "Hitamo Ihagaze",
//     replyPlaceholder: "Andika igisubizo cyawe hano...",
//     noAttachments: "Nta bishushanyo",
//     close: "Funga",
//     send: "Ohereza",
//     sending: "Biremereza...",
//     markAsRead: "Shyira nk'Uwasomye",
//     markAsUnread: "Shyira nk'Utarasomye",
//     toggleStar: "Hindura Ibyakunzwe",
//     toggleFlag: "Hindura Ikimenyetso",
//     archive: "Bika",
//     unarchive: "Kuraho mu bibitswe",
//     labels: "Ibyiciro",
//     tags: "Ibimenyetso",
//     addLabel: "Ongeraho Icyiciro",
//     addTag: "Ongeraho Ikimenyetso",
//     general: "Rusange",
//     support: "Ubufasha",
//     booking: "Icyemezo",
//     payment: "Ubwishyu",
//     complaint: "Ikirego",
//     feedback: "Ibitekerezo",
//     other: "Ibindi",
//     low: "Gito",
//     medium: "Rishoboka",
//     high: "Kinini",
//     urgent: "Byihutirwa",
//     all: "Byose",
//     selectCategory: "Hitamo Icyiciro",
//     selectPriority: "Hitamo Iby'ibanze",
//     recipient: "Uwakiriye",
//     content: "Ibirimo",
//     attachmentsLabel: "Ibishushanyo",
//     noImage: "Nta shusho yashyizweho",
//     viewImage: "Reba Ishusho",
//     loading: "Birakoreshwa...",
//     fetchError: "Kubura ubutumwa birananiranye",
//     replyTo: "Subiza kuri",
//     allFieldsValid: "Ibice byose birimo amakuru akwiye!",
//     pleaseFixErrors: "Kosora amakosa hejuru",
//     managerAccess: "Uburenganzira bwa Manager",
//     managerViewOnly: "Ufite uburenganzira bwo kureba no gusubiza ubutumwa",
//     success: "Byakunze!",
//     error: "Ikosa",
//     confirm: "Emeza",
//   },
// };

// // Helper function to get language from cookies
// const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
//   const lang = Cookies.get("language") as "en" | "fr" | "rw";
//   return lang || "en";
// };

// // Helper function to transform contact to message
// const transformContactToMessage = (contact: Contact): Message => {
//   const messageText = contact.message || "";

//   const msgLower = messageText.toLowerCase();

//   // Determine category
//   let category: Message["category"] = "general";

//   if (
//     msgLower.includes("support") ||
//     msgLower.includes("help") ||
//     msgLower.includes("assist")
//   ) {
//     category = "support";
//   } else if (
//     msgLower.includes("book") ||
//     msgLower.includes("reserv") ||
//     msgLower.includes("housing") ||
//     msgLower.includes("house")
//   ) {
//     category = "booking";
//   } else if (
//     msgLower.includes("pay") ||
//     msgLower.includes("momo") ||
//     msgLower.includes("money")
//   ) {
//     category = "payment";
//   } else if (
//     msgLower.includes("complaint") ||
//     msgLower.includes("issue") ||
//     msgLower.includes("problem") ||
//     msgLower.includes("report")
//   ) {
//     category = "complaint";
//   } else if (
//     msgLower.includes("feedback") ||
//     msgLower.includes("suggest") ||
//     msgLower.includes("great") ||
//     msgLower.includes("good")
//   ) {
//     category = "feedback";
//   }

//   // Determine priority
//   let priority: Message["priority"] = "medium";

//   if (contact.status === "pending") {
//     priority = "high";
//   }

//   if (
//     msgLower.includes("urgent") ||
//     msgLower.includes("emergency") ||
//     msgLower.includes("immediate")
//   ) {
//     priority = "urgent";
//   }

//   // Labels and tags
//   const labels: string[] = [];
//   const tags: string[] = [];

//   if (
//     msgLower.includes("housing") ||
//     msgLower.includes("house") ||
//     msgLower.includes("apartment")
//   ) {
//     labels.push("housing");
//     tags.push("accommodation");
//   }

//   if (msgLower.includes("student")) {
//     tags.push("student");
//   }

//   if (msgLower.includes("landlord") || msgLower.includes("host")) {
//     tags.push("landlord");
//   }

//   if (msgLower.includes("payment") || msgLower.includes("momo")) {
//     labels.push("payment");
//     tags.push("payment");
//   }

//   return {
//     id: contact._id,
//     _id: contact._id,
//     name: contact.name,
//     email: contact.email,
//     message: messageText,
//     status: contact.status || "pending",
//     ipAddress: contact.ipAddress || null,
//     userAgent: contact.userAgent || null,
//     repliedAt: contact.repliedAt || null,
//     readAt: contact.readAt || null,
//     replyMessage: contact.replyMessage || null,
//     createdAt: contact.createdAt,
//     updatedAt: contact.updatedAt,

//     senderName: contact.name,
//     senderEmail: contact.email,
//     content: messageText,
//     subject: `Message from ${contact.name}`,
//     isRead: contact.status !== "pending",
//     isFlagged: false,
//     isStarred: false,
//     category,
//     priority,
//     labels,
//     tags,
//     repliedBy: contact.repliedAt ? "Admin" : undefined,
//   };
// };

// export const ManagerMessageManagement: React.FC = () => {
//   // Get language from cookies
//   const [lang, setLang] = useState<"en" | "fr" | "rw">(
//     getLanguageFromCookies(),
//   );

//   // Success/Error/Info modal states
//   const [successModal, setSuccessModal] = useState<{
//     isOpen: boolean;
//     title: string;
//     message: string;
//     details?: string;
//   }>({
//     isOpen: false,
//     title: "",
//     message: "",
//     details: "",
//   });

//   const [errorModal, setErrorModal] = useState<{
//     isOpen: boolean;
//     title: string;
//     message: string;
//     details?: string;
//   }>({
//     isOpen: false,
//     title: "",
//     message: "",
//     details: "",
//   });

//   const [infoModal, setInfoModal] = useState<{
//     isOpen: boolean;
//     title: string;
//     message: string;
//     details?: string;
//   }>({
//     isOpen: false,
//     title: "",
//     message: "",
//     details: "",
//   });

//   const [messages, setMessages] = useState<Message[]>([]);
//   const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState<string>("all");
//   const [filterCategory, setFilterCategory] = useState<string>("all");
//   const [filterPriority, setFilterPriority] = useState<string>("all");

//   // Modal states
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
//   const [, setIsDeleteModalOpen] = useState(false);
//   const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
//   const [replyContent, setReplyContent] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState<string>("");

//   // Confirm Modal state
//   const [confirmModal, setConfirmModal] = useState<{
//     isOpen: boolean;
//     title: string;
//     message: string;
//     onConfirm: () => void;
//     confirmText?: string;
//     cancelText?: string;
//     type?: "danger" | "warning" | "info" | "success";
//     icon?: React.ReactNode;
//   }>({
//     isOpen: false,
//     title: "",
//     message: "",
//     onConfirm: () => {},
//     confirmText: "Confirm",
//     cancelText: "Cancel",
//     type: "warning",
//   });

//   // Loading states
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isFetching, setIsFetching] = useState(true);

//   // Statistics
//   const [stats, setStats] = useState({
//     total: 0,
//     pending: 0,
//     read: 0,
//     replied: 0,
//     archived: 0,
//     flagged: 0,
//     starred: 0,
//   });

//   const t = translations[lang];

//   const showSuccessModal = (
//     title: string,
//     message: string,
//     details?: string,
//   ) => {
//     setSuccessModal({ isOpen: true, title, message, details });
//   };

//   const showErrorModal = (title: string, message: string, details?: string) => {
//     setErrorModal({ isOpen: true, title, message, details });
//   };


//   const showConfirmModal = (
//     title: string,
//     message: string,
//     onConfirm: () => void,
//     confirmText?: string,
//     cancelText?: string,
//     type?: "danger" | "warning" | "info" | "success",
//     icon?: React.ReactNode,
//   ) => {
//     setConfirmModal({
//       isOpen: true,
//       title,
//       message,
//       onConfirm,
//       confirmText: confirmText || t.confirm || "Confirm",
//       cancelText: cancelText || t.cancel || "Cancel",
//       type: type || "warning",
//       icon,
//     });
//   };

//   const closeConfirmModal = () => {
//     setConfirmModal((prev) => ({ ...prev, isOpen: false }));
//   };

//   // Fetch messages from API using axios
//   const fetchMessages = async () => {
//     setIsFetching(true);
//     try {
//       const response = await axios.get(API_URL);
//       const data = response.data;

//       let contacts: Contact[] = [];
//       if (Array.isArray(data)) {
//         contacts = data;
//       } else if (data && typeof data === "object") {
//         if (data._id) {
//           contacts = [data];
//         } else if (data.data && Array.isArray(data.data)) {
//           contacts = data.data;
//         } else if (data.contacts && Array.isArray(data.contacts)) {
//           contacts = data.contacts;
//         } else {
//           const possibleArrays = Object.values(data).filter((val) =>
//             Array.isArray(val),
//           );
//           if (possibleArrays.length > 0) {
//             contacts = possibleArrays[0];
//           }
//         }
//       }

//       const transformedMessages = contacts.map((contact: Contact) =>
//         transformContactToMessage(contact),
//       );
//       setMessages(transformedMessages);
//     } catch {
//       showErrorModal(
//         t.error || "Error",
//         t.fetchError || "Failed to load messages",
//       );
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
//     fetchMessages();
//   }, []);

//   // Filter messages
//   useEffect(() => {
//     let filtered = [...messages];

//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       filtered = filtered.filter(
//         (msg) =>
//           msg.name.toLowerCase().includes(term) ||
//           msg.email.toLowerCase().includes(term) ||
//           msg.message.toLowerCase().includes(term) ||
//           msg.subject.toLowerCase().includes(term),
//       );
//     }

//     if (filterStatus !== "all") {
//       filtered = filtered.filter((msg) => msg.status === filterStatus);
//     }

//     if (filterCategory !== "all") {
//       filtered = filtered.filter((msg) => msg.category === filterCategory);
//     }

//     if (filterPriority !== "all") {
//       filtered = filtered.filter((msg) => msg.priority === filterPriority);
//     }

//     setFilteredMessages(filtered);
//   }, [messages, searchTerm, filterStatus, filterCategory, filterPriority]);

//   // Update statistics
//   useEffect(() => {
//     const total = messages.length;
//     const pending = messages.filter((m) => m.status === "pending").length;
//     const read = messages.filter((m) => m.status === "read").length;
//     const replied = messages.filter((m) => m.status === "replied").length;
//     const archived = messages.filter((m) => m.status === "archived").length;
//     const flagged = messages.filter((m) => m.isFlagged).length;
//     const starred = messages.filter((m) => m.isStarred).length;

//     setStats({ total, pending, read, replied, archived, flagged, starred });
//   }, [messages]);

//   // Get status badge color
//   const getStatusColor = (status: string): string => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-100 text-yellow-800";
//       case "read":
//         return "bg-blue-100 text-blue-800";
//       case "replied":
//         return "bg-green-100 text-green-800";
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
//         return t.pending;
//       case "read":
//         return t.read;
//       case "replied":
//         return t.replied;
//       case "archived":
//         return t.archived;
//       default:
//         return status;
//     }
//   };

//   // Get category color
//   const getCategoryColor = (category: string): string => {
//     switch (category) {
//       case "general":
//         return "bg-gray-100 text-gray-800";
//       case "support":
//         return "bg-blue-100 text-blue-800";
//       case "booking":
//         return "bg-purple-100 text-purple-800";
//       case "payment":
//         return "bg-green-100 text-green-800";
//       case "complaint":
//         return "bg-red-100 text-red-800";
//       case "feedback":
//         return "bg-yellow-100 text-yellow-800";
//       case "other":
//         return "bg-gray-100 text-gray-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   // Get priority color
//   const getPriorityColor = (priority: string): string => {
//     switch (priority) {
//       case "low":
//         return "bg-gray-100 text-gray-800";
//       case "medium":
//         return "bg-yellow-100 text-yellow-800";
//       case "high":
//         return "bg-orange-100 text-orange-800";
//       case "urgent":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
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

//   // CRUD Operations with axios
//   const handleDeleteMessage = async () => {
//     if (!selectedMessage) return;

//     setIsLoading(true);

//     try {
//       await axios.delete(`${API_URL}/${selectedMessage._id}`);

//       const updatedMessages = messages.filter(
//         (m) => m._id !== selectedMessage._id,
//       );
//       setMessages(updatedMessages);

//       showSuccessModal(
//         t.success || "Success!",
//         t.messageDeleted || "Message deleted successfully!",
//         `Message from ${selectedMessage.senderName} has been removed`,
//       );
//       setIsDeleteModalOpen(false);
//       setSelectedMessage(null);
//       closeConfirmModal();
//     } catch {
//       showErrorModal(
//         t.error || "Error",
//         t.deleteFailed || "Failed to delete message",
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSendReply = async () => {
//     if (!selectedMessage || !replyContent.trim()) {
//       showErrorModal(t.error || "Error", "Please enter a reply");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const response = await axios.put(
//         `${API_URL}/${selectedMessage._id}/reply`,
//         {
//           replyMessage: replyContent,
//           status: selectedStatus || "replied",
//         },
//       );

//       const updatedContact = response.data;
//       const updatedMessage = transformContactToMessage(updatedContact);

//       const updatedMessages = messages.map((m) =>
//         m._id === selectedMessage._id ? updatedMessage : m,
//       );
//       setMessages(updatedMessages);

//       showSuccessModal(
//         t.success || "Success!",
//         t.replySent || "Reply sent successfully!",
//         `Reply sent to ${selectedMessage.senderName}`,
//       );
//       setIsReplyModalOpen(false);
//       setSelectedMessage(null);
//       setReplyContent("");
//     } catch {
//       showErrorModal(
//         t.error || "Error",
//         t.replyFailed || "Failed to send reply",
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleUpdateStatus = async (
//     messageId: string,
//     newStatus: Message["status"],
//   ) => {
//     try {
//       const response = await axios.put(`${API_URL}/${messageId}/status`, {
//         status: newStatus,
//       });

//       const updatedContact = response.data;
//       const updatedMessage = transformContactToMessage(updatedContact);

//       const updatedMessages = messages.map((m) =>
//         m._id === messageId ? updatedMessage : m,
//       );
//       setMessages(updatedMessages);

//       showSuccessModal(
//         t.success || "Success!",
//         t.statusUpdated || "Message status updated successfully!",
//       );
//     } catch {
//       showErrorModal(
//         t.error || "Error",
//         t.statusUpdateFailed || "Failed to update message status",
//       );
//     }
//   };

//   const handleToggleStar = async (messageId: string) => {
//     const message = messages.find((m) => m._id === messageId);
//     if (!message) return;

//     const updatedMessages = messages.map((m) =>
//       m._id === messageId ? { ...m, isStarred: !m.isStarred } : m,
//     );
//     setMessages(updatedMessages);
//   };

//   const handleToggleFlag = async (messageId: string) => {
//     const message = messages.find((m) => m._id === messageId);
//     if (!message) return;

//     const updatedMessages = messages.map((m) =>
//       m._id === messageId ? { ...m, isFlagged: !m.isFlagged } : m,
//     );
//     setMessages(updatedMessages);
//   };

//   const handleMarkAsRead = async (messageId: string) => {
//     try {
//       const response = await axios.put(`${API_URL}/${messageId}/read`);

//       const updatedContact = response.data;
//       const updatedMessage = transformContactToMessage(updatedContact);

//       const updatedMessages = messages.map((m) =>
//         m._id === messageId ? updatedMessage : m,
//       );
//       setMessages(updatedMessages);
//     } catch {
//       // Silent fail for mark as read
//     }
//   };

//   // Open modals
//   const openViewModal = (message: Message) => {
//     setSelectedMessage(message);
//     setIsViewModalOpen(true);
//     if (!message.isRead) {
//       handleMarkAsRead(message._id);
//     }
//   };

//   const openReplyModal = (message: Message) => {
//     setSelectedMessage(message);
//     setReplyContent(message.replyMessage || "");
//     setSelectedStatus(message.status);
//     setIsReplyModalOpen(true);
//   };

//   const openDeleteModal = (message: Message) => {
//     setSelectedMessage(message);
//     showConfirmModal(
//       "⚠️ " + t.deleteMessage || "Delete Message",
//       `${t.deleteConfirmation || "Are you sure you want to delete this message?"} ${t.actionUndone || "This action cannot be undone."}`,
//       handleDeleteMessage,
//       t.delete || "Delete",
//       t.cancel || "Cancel",
//       "danger",
//       <DeleteIcon className="w-10 h-10" />,
//     );
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
//       {/* Success Modal */}
//       <SuccessModal
//         isOpen={successModal.isOpen}
//         onClose={() => setSuccessModal({ ...successModal, isOpen: false })}
//         title={successModal.title}
//         message={successModal.message}
//         details={successModal.details}
//       />

//       {/* Error Modal */}
//       <ErrorModal
//         isOpen={errorModal.isOpen}
//         onClose={() => setErrorModal({ ...errorModal, isOpen: false })}
//         title={errorModal.title}
//         message={errorModal.message}
//         details={errorModal.details}
//       />

//       {/* Info Modal */}
//       <InfoModal
//         isOpen={infoModal.isOpen}
//         onClose={() => setInfoModal({ ...infoModal, isOpen: false })}
//         title={infoModal.title}
//         message={infoModal.message}
//         details={infoModal.details}
//       />

//       {/* Confirm Modal */}
//       <ConfirmModal
//         isOpen={confirmModal.isOpen}
//         onClose={closeConfirmModal}
//         onConfirm={confirmModal.onConfirm}
//         title={confirmModal.title}
//         message={confirmModal.message}
//         confirmText={confirmModal.confirmText}
//         cancelText={confirmModal.cancelText}
//         isSubmitting={isLoading}
//         type={confirmModal.type}
//         icon={confirmModal.icon}
//       />

//       {/* Manager Access Notice */}
//       <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
//         <MessageIcon className="text-blue-600 w-5 h-5" />
//         <div>
//           <p className="text-sm text-blue-700 font-medium">{t.managerAccess}</p>
//           <p className="text-xs text-blue-600">{t.managerViewOnly}</p>
//         </div>
//       </div>

//       {/* Header - Removed Compose button */}
//       <div className="mb-6">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//               <MessageIcon className="w-7 h-7 text-[#FF385C]" />
//               {t.messageManagement}
//             </h1>
//             <p className="text-sm text-gray-500 mt-1">{t.manageMessages}</p>
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={fetchMessages}
//               className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               <RefreshIcon className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
//         <motion.div
//           whileHover={{ y: -2 }}
//           className="bg-white rounded-xl p-3 shadow-sm border border-gray-200"
//         >
//           <p className="text-xs text-gray-500">{t.total}</p>
//           <p className="text-xl font-bold text-gray-900">{stats.total}</p>
//         </motion.div>
//         <motion.div
//           whileHover={{ y: -2 }}
//           className="bg-yellow-50 rounded-xl p-3 shadow-sm border border-yellow-200"
//         >
//           <p className="text-xs text-yellow-600">{t.pending}</p>
//           <p className="text-xl font-bold text-yellow-700">{stats.pending}</p>
//         </motion.div>
//         <motion.div
//           whileHover={{ y: -2 }}
//           className="bg-blue-50 rounded-xl p-3 shadow-sm border border-blue-200"
//         >
//           <p className="text-xs text-blue-600">{t.read}</p>
//           <p className="text-xl font-bold text-blue-700">{stats.read}</p>
//         </motion.div>
//         <motion.div
//           whileHover={{ y: -2 }}
//           className="bg-green-50 rounded-xl p-3 shadow-sm border border-green-200"
//         >
//           <p className="text-xs text-green-600">{t.replied}</p>
//           <p className="text-xl font-bold text-green-700">{stats.replied}</p>
//         </motion.div>
//         <motion.div
//           whileHover={{ y: -2 }}
//           className="bg-gray-50 rounded-xl p-3 shadow-sm border border-gray-200"
//         >
//           <p className="text-xs text-gray-500">{t.archived}</p>
//           <p className="text-xl font-bold text-gray-900">{stats.archived}</p>
//         </motion.div>
//         <motion.div
//           whileHover={{ y: -2 }}
//           className="bg-red-50 rounded-xl p-3 shadow-sm border border-red-200"
//         >
//           <p className="text-xs text-red-600">{t.flagged}</p>
//           <p className="text-xl font-bold text-red-700">{stats.flagged}</p>
//         </motion.div>
//         <motion.div
//           whileHover={{ y: -2 }}
//           className="bg-purple-50 rounded-xl p-3 shadow-sm border border-purple-200"
//         >
//           <p className="text-xs text-purple-600">{t.starred}</p>
//           <p className="text-xl font-bold text-purple-700">{stats.starred}</p>
//         </motion.div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
//         <div className="flex flex-col sm:flex-row gap-3">
//           <div className="flex-1 relative">
//             <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder={t.searchMessages}
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
//               <option value="all">{t.allStatus}</option>
//               <option value="pending">{t.pending}</option>
//               <option value="read">{t.read}</option>
//               <option value="replied">{t.replied}</option>
//               <option value="archived">{t.archived}</option>
//             </select>
//             <select
//               value={filterCategory}
//               onChange={(e) => setFilterCategory(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//             >
//               <option value="all">{t.allCategories}</option>
//               <option value="general">{t.general}</option>
//               <option value="support">{t.support}</option>
//               <option value="booking">{t.booking}</option>
//               <option value="payment">{t.payment}</option>
//               <option value="complaint">{t.complaint}</option>
//               <option value="feedback">{t.feedback}</option>
//               <option value="other">{t.other}</option>
//             </select>
//             <select
//               value={filterPriority}
//               onChange={(e) => setFilterPriority(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//             >
//               <option value="all">{t.allPriorities}</option>
//               <option value="low">{t.low}</option>
//               <option value="medium">{t.medium}</option>
//               <option value="high">{t.high}</option>
//               <option value="urgent">{t.urgent}</option>
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

//       {/* Messages Table */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   <div className="flex items-center gap-2">
//                     <span>{t.message}</span>
//                   </div>
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
//                   {t.sender}
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
//                   {t.category}
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
//                   {t.priority}
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   {t.status}
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
//                   {t.received}
//                 </th>
//                 <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   {t.actions}
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredMessages.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={7}
//                     className="px-4 py-8 text-center text-gray-500"
//                   >
//                     <MessageIcon className="w-12 h-12 mx-auto text-gray-300 mb-2" />
//                     <p>{t.noMessages}</p>
//                     <p className="text-sm">{t.adjustFilters}</p>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredMessages.map((message) => (
//                   <motion.tr
//                     key={message._id}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className={`hover:bg-gray-50 transition-colors cursor-pointer ${!message.isRead ? "bg-blue-50/50" : ""}`}
//                     onClick={() => openViewModal(message)}
//                   >
//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-3">
//                         <div className="flex-shrink-0 flex items-center gap-1">
//                           {message.isStarred && (
//                             <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
//                           )}
//                           {message.isFlagged && (
//                             <FlagIcon className="w-4 h-4 text-red-400 fill-current" />
//                           )}
//                         </div>
//                         <div className="min-w-0">
//                           <p
//                             className={`text-sm ${!message.isRead ? "font-semibold text-gray-900" : "text-gray-900"}`}
//                           >
//                             {message.subject}
//                           </p>
//                           <p className="text-xs text-gray-500 truncate md:hidden">
//                             {message.senderName}
//                           </p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 hidden md:table-cell">
//                       <p className="text-sm text-gray-600">
//                         {message.senderName}
//                       </p>
//                       <p className="text-xs text-gray-400">
//                         {message.senderEmail}
//                       </p>
//                     </td>
//                     <td className="px-4 py-3 hidden lg:table-cell">
//                       <span
//                         className={`px-2 py-0.5 text-xs rounded-full ${getCategoryColor(message.category)}`}
//                       >
//                         {message.category}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 hidden lg:table-cell">
//                       <span
//                         className={`px-2 py-0.5 text-xs rounded-full ${getPriorityColor(message.priority)}`}
//                       >
//                         {message.priority}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3">
//                       <span
//                         className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(message.status)}`}
//                       >
//                         {getStatusLabel(message.status)}
//                       </span>
//                       {!message.isRead && (
//                         <span className="ml-1 w-2 h-2 inline-block bg-blue-500 rounded-full"></span>
//                       )}
//                     </td>
//                     <td className="px-4 py-3 hidden lg:table-cell">
//                       <p className="text-sm text-gray-600">
//                         {formatDate(message.createdAt)}
//                       </p>
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex items-center justify-center gap-1">
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             openViewModal(message);
//                           }}
//                           className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                           title={t.viewMessage}
//                         >
//                           <VisibilityIcon className="w-4 h-4" />
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             openReplyModal(message);
//                           }}
//                           className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
//                           title={t.reply}
//                         >
//                           <ReplyIcon className="w-4 h-4" />
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleToggleStar(message._id);
//                           }}
//                           className={`p-1.5 rounded-lg transition-colors ${message.isStarred ? "text-yellow-400 hover:bg-yellow-50" : "text-gray-400 hover:bg-yellow-50"}`}
//                           title={t.toggleStar}
//                         >
//                           {message.isStarred ? (
//                             <StarIcon className="w-4 h-4" />
//                           ) : (
//                             <StarBorderIcon className="w-4 h-4" />
//                           )}
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleToggleFlag(message._id);
//                           }}
//                           className={`p-1.5 rounded-lg transition-colors ${message.isFlagged ? "text-red-400 hover:bg-red-50" : "text-gray-400 hover:bg-red-50"}`}
//                           title={t.toggleFlag}
//                         >
//                           {message.isFlagged ? (
//                             <FlagIcon className="w-4 h-4" />
//                           ) : (
//                             <FlagOutlinedIcon className="w-4 h-4" />
//                           )}
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             openDeleteModal(message);
//                           }}
//                           className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                           title={t.deleteMessage}
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
//             {t.showing} {filteredMessages.length} {t.of} {messages.length}{" "}
//             {t.messages}
//           </p>
//         </div>
//       </div>

//       {/* View Message Modal */}
//       <AnimatePresence>
//         {isViewModalOpen && selectedMessage && (
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
//                     <MessageIcon className="text-[#FF385C] w-5 h-5" />
//                     <h2 className="text-xl font-semibold text-gray-900">
//                       {t.messageDetails}
//                     </h2>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => handleToggleStar(selectedMessage._id)}
//                       className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
//                     >
//                       {selectedMessage.isStarred ? (
//                         <StarIcon className="w-5 h-5 text-yellow-400" />
//                       ) : (
//                         <StarBorderIcon className="w-5 h-5 text-gray-400" />
//                       )}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => handleToggleFlag(selectedMessage._id)}
//                       className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
//                     >
//                       {selectedMessage.isFlagged ? (
//                         <FlagIcon className="w-5 h-5 text-red-400" />
//                       ) : (
//                         <FlagOutlinedIcon className="w-5 h-5 text-gray-400" />
//                       )}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ rotate: 90, scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => setIsViewModalOpen(false)}
//                       className="p-1.5 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
//                     >
//                       <CloseIcon className="w-5 h-5" />
//                     </motion.button>
//                   </div>
//                 </div>

//                 <div className="p-6 space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">
//                         {t.senderName}
//                       </label>
//                       <p className="text-sm font-medium text-gray-900 mt-1">
//                         {selectedMessage.senderName}
//                       </p>
//                     </div>
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">
//                         {t.senderEmail}
//                       </label>
//                       <p className="text-sm font-medium text-gray-900 mt-1">
//                         {selectedMessage.senderEmail}
//                       </p>
//                     </div>
//                   </div>

//                   {selectedMessage.ipAddress && (
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">
//                         IP Address
//                       </label>
//                       <p className="text-sm text-gray-600 mt-1">
//                         {selectedMessage.ipAddress}
//                       </p>
//                     </div>
//                   )}

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">
//                         {t.subject}
//                       </label>
//                       <p className="text-sm font-medium text-gray-900 mt-1">
//                         {selectedMessage.subject}
//                       </p>
//                     </div>
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">
//                         {t.category}
//                       </label>
//                       <p className="mt-1">
//                         <span
//                           className={`px-2 py-0.5 text-xs rounded-full ${getCategoryColor(selectedMessage.category)}`}
//                         >
//                           {selectedMessage.category}
//                         </span>
//                       </p>
//                     </div>
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">
//                         {t.priority}
//                       </label>
//                       <p className="mt-1">
//                         <span
//                           className={`px-2 py-0.5 text-xs rounded-full ${getPriorityColor(selectedMessage.priority)}`}
//                         >
//                           {selectedMessage.priority}
//                         </span>
//                       </p>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="text-xs font-medium text-gray-500">
//                       {t.messageContent}
//                     </label>
//                     <div className="mt-1 p-4 bg-gray-50 rounded-lg">
//                       <p className="text-sm text-gray-700 whitespace-pre-wrap">
//                         {selectedMessage.message}
//                       </p>
//                     </div>
//                   </div>

//                   {selectedMessage.labels &&
//                     selectedMessage.labels.length > 0 && (
//                       <div>
//                         <label className="text-xs font-medium text-gray-500">
//                           {t.labels}
//                         </label>
//                         <div className="mt-1 flex flex-wrap gap-1">
//                           {selectedMessage.labels.map((label) => (
//                             <span
//                               key={label}
//                               className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs"
//                             >
//                               {label}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                   {selectedMessage.tags && selectedMessage.tags.length > 0 && (
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">
//                         {t.tags}
//                       </label>
//                       <div className="mt-1 flex flex-wrap gap-1">
//                         {selectedMessage.tags.map((tag) => (
//                           <span
//                             key={tag}
//                             className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full text-xs"
//                           >
//                             #{tag}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {selectedMessage.replyMessage && (
//                     <div className="border-t border-gray-200 pt-4 mt-4">
//                       <label className="text-xs font-medium text-gray-500">
//                         {t.replyLabel}
//                       </label>
//                       <div className="mt-1 p-3 bg-green-50 rounded-lg border border-green-200">
//                         <p className="text-sm text-gray-700 whitespace-pre-wrap">
//                           {selectedMessage.replyMessage}
//                         </p>
//                         {selectedMessage.repliedBy && (
//                           <p className="text-xs text-gray-500 mt-2">
//                             Replied by: {selectedMessage.repliedBy} on{" "}
//                             {formatDate(selectedMessage.repliedAt || "")}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   )}

//                   <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => {
//                         setIsViewModalOpen(false);
//                         openReplyModal(selectedMessage);
//                       }}
//                       className="px-4 py-2.5 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors flex items-center gap-2"
//                     >
//                       <ReplyIcon className="w-4 h-4" />
//                       {t.reply}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => {
//                         const newStatus =
//                           selectedMessage.status === "archived"
//                             ? "read"
//                             : "archived";
//                         handleUpdateStatus(
//                           selectedMessage._id,
//                           newStatus as Message["status"],
//                         );
//                         setIsViewModalOpen(false);
//                       }}
//                       className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
//                     >
//                       {selectedMessage.status === "archived" ? (
//                         <UnarchiveIcon className="w-4 h-4" />
//                       ) : (
//                         <ArchiveIcon className="w-4 h-4" />
//                       )}
//                       {selectedMessage.status === "archived"
//                         ? t.unarchive
//                         : t.archive}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => {
//                         setIsViewModalOpen(false);
//                         openDeleteModal(selectedMessage);
//                       }}
//                       className="px-4 py-2.5 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center gap-2"
//                     >
//                       <DeleteIcon className="w-4 h-4" />
//                       {t.delete}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => setIsViewModalOpen(false)}
//                       className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors ml-auto"
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

//       {/* Reply Modal */}
//       <AnimatePresence>
//         {isReplyModalOpen && selectedMessage && (
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
//                       {t.replyTo} {selectedMessage.senderName}
//                     </h2>
//                   </div>
//                   <motion.button
//                     whileHover={{ rotate: 90, scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => {
//                       setIsReplyModalOpen(false);
//                       setReplyContent("");
//                     }}
//                     className="p-1.5 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
//                   >
//                     <CloseIcon className="w-5 h-5" />
//                   </motion.button>
//                 </div>

//                 <div className="p-6 space-y-4">
//                   <div className="p-3 bg-gray-50 rounded-lg">
//                     <p className="text-sm text-gray-500">
//                       <span className="font-medium text-gray-700">From:</span>{" "}
//                       {selectedMessage.senderName} (
//                       {selectedMessage.senderEmail})
//                     </p>
//                     <p className="text-sm text-gray-700 mt-1 line-clamp-2">
//                       {selectedMessage.message}
//                     </p>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                       {t.updateStatus}
//                     </label>
//                     <select
//                       value={selectedStatus}
//                       onChange={(e) => setSelectedStatus(e.target.value)}
//                       className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//                     >
//                       <option value="pending">{t.pending}</option>
//                       <option value="read">{t.read}</option>
//                       <option value="replied">{t.replied}</option>
//                       <option value="archived">{t.archived}</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                       {t.replyLabel}
//                     </label>
//                     <textarea
//                       value={replyContent}
//                       onChange={(e) => setReplyContent(e.target.value)}
//                       rows={6}
//                       className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none"
//                       placeholder={t.replyPlaceholder}
//                     />
//                   </div>

//                   <div className="flex gap-3 pt-4 border-t border-gray-200">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handleSendReply}
//                       disabled={isSubmitting || !replyContent.trim()}
//                       className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 ${
//                         isSubmitting || !replyContent.trim()
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
//                           <SendIcon className="w-4 h-4" />
//                           {t.sendReply}
//                         </>
//                       )}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => {
//                         setIsReplyModalOpen(false);
//                         setReplyContent("");
//                       }}
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
//     </div>
//   );
// };








/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import axios from "axios";

// Material-UI Icons
import MessageIcon from "@mui/icons-material/Message";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ClearIcon from "@mui/icons-material/Clear";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FlagIcon from "@mui/icons-material/Flag";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import ReplyIcon from "@mui/icons-material/Reply";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

// API Configuration
const API_BASE_URL = "https://rene-inyumba-nodejs.onrender.com";
const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token interceptor
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ============================================================
// MODAL COMPONENTS (Booking Management Style)
// ============================================================

// Success Modal
interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  details?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  details,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
              exit: { opacity: 0 },
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[300]"
            onClick={onClose}
          />
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8, y: 30 },
              visible: { opacity: 1, scale: 1, y: 0 },
              exit: { opacity: 0, scale: 0.8, y: 30 },
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[301] flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-600" />
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full border-4 border-green-200 animate-ping opacity-75" />
                    <CheckCircleIcon className="w-10 h-10 text-green-600 relative z-10" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                  {title}
                </h3>
                <p className="text-gray-600 text-center mb-2">{message}</p>
                {details && (
                  <p className="text-sm text-gray-400 text-center mb-6">{details}</p>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                >
                  Got it!
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
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

const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  details,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
              exit: { opacity: 0 },
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[300]"
            onClick={onClose}
          />
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8, y: 30 },
              visible: { opacity: 1, scale: 1, y: 0 },
              exit: { opacity: 0, scale: 0.8, y: 30 },
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[301] flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-red-600" />
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full border-4 border-red-200 animate-ping opacity-75" />
                    <ErrorIcon className="w-10 h-10 text-red-600 relative z-10" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                  {title}
                </h3>
                <p className="text-gray-600 text-center mb-2">{message}</p>
                {details && (
                  <p className="text-sm text-gray-400 text-center mb-6">{details}</p>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                >
                  Try Again
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
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
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
              exit: { opacity: 0 },
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[300]"
            onClick={onClose}
          />
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8, y: 30 },
              visible: { opacity: 1, scale: 1, y: 0 },
              exit: { opacity: 0, scale: 0.8, y: 30 },
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[301] flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white relative overflow-hidden">
              <div className={`absolute top-0 left-0 right-0 h-1 ${colors.buttonBg}`} />
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className={`w-20 h-20 ${colors.iconBg} rounded-full flex items-center justify-center relative`}>
                    <div className={`absolute inset-0 rounded-full border-4 ${colors.iconBorder} animate-ping opacity-75`} />
                    <div className={`${colors.iconColor} relative z-10`}>
                      {icon || (
                        type === "danger" ? (
                          <DeleteIcon className="w-10 h-10" />
                        ) : type === "warning" ? (
                          <ErrorIcon className="w-10 h-10" />
                        ) : type === "success" ? (
                          <CheckCircleIcon className="w-10 h-10" />
                        ) : (
                          <MessageIcon className="w-10 h-10" />
                        )
                      )}
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">{title}</h3>
                <p className="text-gray-600 text-center mb-6">{message}</p>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    {cancelText}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
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

// ============================================================
// CONTACT MODEL - Matches Backend Contact Schema
// ============================================================

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: "pending" | "read" | "replied" | "archived";
  ipAddress: string | null;
  userAgent: string | null;
  repliedAt: string | null;
  readAt: string | null;
  replyMessage: string | null;
  createdAt: string;
  updatedAt: string;
}

// Extended type for UI purposes
interface Message extends Contact {
  senderName: string;
  senderEmail: string;
  content: string;
  subject: string;
  isRead: boolean;
  isFlagged: boolean;
  isStarred: boolean;
  category: "general" | "support" | "booking" | "payment" | "complaint" | "feedback" | "other";
  priority: "low" | "medium" | "high" | "urgent";
  labels: string[];
  tags: string[];
  repliedBy?: string;
}

// ============================================================
// TRANSLATIONS
// ============================================================

const translations = {
  en: {
    messageManagement: "Message Management",
    manageMessages: "Manage all incoming messages and communications",
    total: "Total",
    pending: "Pending",
    read: "Read",
    replied: "Replied",
    archived: "Archived",
    flagged: "Flagged",
    starred: "Starred",
    searchMessages: "Search by name, email, or message...",
    allStatus: "All Status",
    allCategories: "All Categories",
    allPriorities: "All Priorities",
    message: "Message",
    sender: "Sender",
    subject: "Subject",
    category: "Category",
    priority: "Priority",
    status: "Status",
    received: "Received",
    actions: "Actions",
    noMessages: "No messages found",
    adjustFilters: "Try adjusting your search or filters",
    showing: "Showing",
    of: "of",
    messages: "messages",
    viewMessage: "View Message",
    reply: "Reply",
    deleteMessage: "Delete Message",
    deleteConfirmation: "Are you sure you want to delete this message?",
    actionUndone: "This action cannot be undone.",
    cancel: "Cancel",
    delete: "Delete",
    deleting: "Deleting...",
    messageDeleted: "Message deleted successfully!",
    deleteFailed: "Failed to delete message",
    statusUpdated: "Message status updated successfully!",
    statusUpdateFailed: "Failed to update message status",
    replySent: "Reply sent successfully!",
    replyFailed: "Failed to send reply",
    messageDetails: "Message Details",
    senderName: "Sender Name",
    senderEmail: "Sender Email",
    recipientEmail: "Recipient Email",
    messageContent: "Message Content",
    attachments: "Attachments",
    replyLabel: "Reply",
    sendReply: "Send Reply",
    updateStatus: "Update Status",
    selectStatus: "Select Status",
    replyPlaceholder: "Type your reply here...",
    noAttachments: "No attachments",
    close: "Close",
    send: "Send",
    sending: "Sending...",
    markAsRead: "Mark as Read",
    markAsUnread: "Mark as Unread",
    toggleStar: "Toggle Star",
    toggleFlag: "Toggle Flag",
    archive: "Archive",
    unarchive: "Unarchive",
    labels: "Labels",
    tags: "Tags",
    general: "General",
    support: "Support",
    booking: "Booking",
    payment: "Payment",
    complaint: "Complaint",
    feedback: "Feedback",
    other: "Other",
    low: "Low",
    medium: "Medium",
    high: "High",
    urgent: "Urgent",
    all: "All",
    selectCategory: "Select Category",
    selectPriority: "Select Priority",
    recipient: "Recipient",
    content: "Content",
    attachmentsLabel: "Attachments",
    loading: "Loading...",
    fetchError: "Failed to load messages",
    replyTo: "Reply to",
    managerAccess: "Manager Access",
    managerViewOnly: "You have view and reply access to messages",
    success: "Success!",
    error: "Error",
    confirm: "Confirm",
    allFieldsValid: "All fields are valid!",
    pleaseFixErrors: "Please fix the errors above",
  },
  fr: {
    messageManagement: "Gestion des Messages",
    manageMessages: "Gérer tous les messages et communications entrants",
    total: "Total",
    pending: "En Attente",
    read: "Lu",
    replied: "Répondu",
    archived: "Archivé",
    flagged: "Signalé",
    starred: "Favori",
    searchMessages: "Rechercher par nom, email ou contenu...",
    allStatus: "Tous les Statuts",
    allCategories: "Toutes les Catégories",
    allPriorities: "Toutes les Priorités",
    message: "Message",
    sender: "Expéditeur",
    subject: "Sujet",
    category: "Catégorie",
    priority: "Priorité",
    status: "Statut",
    received: "Reçu",
    actions: "Actions",
    noMessages: "Aucun message trouvé",
    adjustFilters: "Essayez d'ajuster votre recherche ou vos filtres",
    showing: "Affichage",
    of: "de",
    messages: "messages",
    viewMessage: "Voir le Message",
    reply: "Répondre",
    deleteMessage: "Supprimer le Message",
    deleteConfirmation: "Êtes-vous sûr de vouloir supprimer ce message ?",
    actionUndone: "Cette action est irréversible.",
    cancel: "Annuler",
    delete: "Supprimer",
    deleting: "Suppression...",
    messageDeleted: "Message supprimé avec succès !",
    deleteFailed: "Échec de la suppression du message",
    statusUpdated: "Statut du message mis à jour avec succès !",
    statusUpdateFailed: "Échec de la mise à jour du statut",
    replySent: "Réponse envoyée avec succès !",
    replyFailed: "Échec de l'envoi de la réponse",
    messageDetails: "Détails du Message",
    senderName: "Nom de l'Expéditeur",
    senderEmail: "Email de l'Expéditeur",
    recipientEmail: "Email du Destinataire",
    messageContent: "Contenu du Message",
    attachments: "Pièces Jointes",
    replyLabel: "Réponse",
    sendReply: "Envoyer la Réponse",
    updateStatus: "Mettre à Jour le Statut",
    selectStatus: "Sélectionner le Statut",
    replyPlaceholder: "Tapez votre réponse ici...",
    noAttachments: "Aucune pièce jointe",
    close: "Fermer",
    send: "Envoyer",
    sending: "Envoi en cours...",
    markAsRead: "Marquer comme Lu",
    markAsUnread: "Marquer comme Non Lu",
    toggleStar: "Basculer Favori",
    toggleFlag: "Basculer Signalement",
    archive: "Archiver",
    unarchive: "Désarchiver",
    labels: "Étiquettes",
    tags: "Tags",
    general: "Général",
    support: "Support",
    booking: "Réservation",
    payment: "Paiement",
    complaint: "Réclamation",
    feedback: "Avis",
    other: "Autre",
    low: "Faible",
    medium: "Moyen",
    high: "Élevé",
    urgent: "Urgent",
    all: "Tous",
    selectCategory: "Sélectionner une Catégorie",
    selectPriority: "Sélectionner une Priorité",
    recipient: "Destinataire",
    content: "Contenu",
    attachmentsLabel: "Pièces Jointes",
    loading: "Chargement...",
    fetchError: "Échec du chargement des messages",
    replyTo: "Répondre à",
    managerAccess: "Accès Manager",
    managerViewOnly: "Vous avez un accès en visualisation et réponse aux messages",
    success: "Succès !",
    error: "Erreur",
    confirm: "Confirmer",
    allFieldsValid: "Tous les champs sont valides !",
    pleaseFixErrors: "Veuillez corriger les erreurs ci-dessus",
  },
  rw: {
    messageManagement: "Gucunga Ubutumwa",
    manageMessages: "Gucunga ubutumwa bwose n'itumanaho",
    total: "Yose",
    pending: "Bitegereje",
    read: "Byasomwe",
    replied: "Byasubijwe",
    archived: "Byabitswe",
    flagged: "Byashyizwe ikimenyetso",
    starred: "Byakunzwe",
    searchMessages: "Shakisha ukurikije izina, imeri cyangwa ibiri mu butumwa...",
    allStatus: "Ihagaze Ryose",
    allCategories: "Ibyiciro Byose",
    allPriorities: "Iby'ibanze Byose",
    message: "Ubutumwa",
    sender: "Uwohereje",
    subject: "Ikiganiro",
    category: "Icyiciro",
    priority: "Iby'ibanze",
    status: "Ihagaze",
    received: "Cyakiriwe",
    actions: "Ibikorwa",
    noMessages: "Nta butumwa bwabonetse",
    adjustFilters: "Gerageza guhindura uburyo ushakisha cyangwa amatungo",
    showing: "Bereka",
    of: "muri",
    messages: "ubutumwa",
    viewMessage: "Reba Ubutumwa",
    reply: "Subiza",
    deleteMessage: "Kuraho Ubutumwa",
    deleteConfirmation: "Uri kwizera ko ushaka gukuraho ubu butumwa?",
    actionUndone: "Iki gikorwa ntikishobora guhindurwa.",
    cancel: "Reka",
    delete: "Kuraho",
    deleting: "Birakurwaho...",
    messageDeleted: "Ubutumwa bwakuweho neza!",
    deleteFailed: "Kuraho ubutumwa birananiranye",
    statusUpdated: "Ihagaze ry'ubutumwa ryavuguruwe neza!",
    statusUpdateFailed: "Kuvugurura ihagaze birananiranye",
    replySent: "Igisubizo cyoherejwe neza!",
    replyFailed: "Kohereza igisubizo birananiranye",
    messageDetails: "Ibisobanuro by'Ubutumwa",
    senderName: "Izina ry'Uwohereje",
    senderEmail: "Imeri y'Uwohereje",
    recipientEmail: "Imeri y'Uwakiriye",
    messageContent: "Ibirimo mu Butumwa",
    attachments: "Ibishushanyo",
    replyLabel: "Igisubizo",
    sendReply: "Ohereza Igisubizo",
    updateStatus: "Vugurura Ihagaze",
    selectStatus: "Hitamo Ihagaze",
    replyPlaceholder: "Andika igisubizo cyawe hano...",
    noAttachments: "Nta bishushanyo",
    close: "Funga",
    send: "Ohereza",
    sending: "Biremereza...",
    markAsRead: "Shyira nk'Uwasomye",
    markAsUnread: "Shyira nk'Utarasomye",
    toggleStar: "Hindura Ibyakunzwe",
    toggleFlag: "Hindura Ikimenyetso",
    archive: "Bika",
    unarchive: "Kuraho mu bibitswe",
    labels: "Ibyiciro",
    tags: "Ibimenyetso",
    general: "Rusange",
    support: "Ubufasha",
    booking: "Icyemezo",
    payment: "Ubwishyu",
    complaint: "Ikirego",
    feedback: "Ibitekerezo",
    other: "Ibindi",
    low: "Gito",
    medium: "Rishoboka",
    high: "Kinini",
    urgent: "Byihutirwa",
    all: "Byose",
    selectCategory: "Hitamo Icyiciro",
    selectPriority: "Hitamo Iby'ibanze",
    recipient: "Uwakiriye",
    content: "Ibirimo",
    attachmentsLabel: "Ibishushanyo",
    loading: "Birakoreshwa...",
    fetchError: "Kubura ubutumwa birananiranye",
    replyTo: "Subiza kuri",
    managerAccess: "Uburenganzira bwa Manager",
    managerViewOnly: "Ufite uburenganzira bwo kureba no gusubiza ubutumwa",
    success: "Byakunze!",
    error: "Ikosa",
    confirm: "Emeza",
    allFieldsValid: "Ibice byose birimo amakuru akwiye!",
    pleaseFixErrors: "Kosora amakosa hejuru",
  },
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
  const lang = Cookies.get("language") as "en" | "fr" | "rw";
  return lang || "en";
};

// Helper function to transform contact to message
const transformContactToMessage = (contact: Contact): Message => {
  const messageText = contact.message || "";
  const msgLower = messageText.toLowerCase();

  // Determine category
  let category: Message["category"] = "general";
  if (msgLower.includes("support") || msgLower.includes("help") || msgLower.includes("assist")) {
    category = "support";
  } else if (msgLower.includes("book") || msgLower.includes("reserv") || msgLower.includes("housing") || msgLower.includes("house")) {
    category = "booking";
  } else if (msgLower.includes("pay") || msgLower.includes("momo") || msgLower.includes("money")) {
    category = "payment";
  } else if (msgLower.includes("complaint") || msgLower.includes("issue") || msgLower.includes("problem") || msgLower.includes("report")) {
    category = "complaint";
  } else if (msgLower.includes("feedback") || msgLower.includes("suggest") || msgLower.includes("great") || msgLower.includes("good")) {
    category = "feedback";
  }

  // Determine priority
  let priority: Message["priority"] = "medium";
  if (contact.status === "pending") {
    priority = "high";
  }
  if (msgLower.includes("urgent") || msgLower.includes("emergency") || msgLower.includes("immediate")) {
    priority = "urgent";
  }

  // Labels and tags
  const labels: string[] = [];
  const tags: string[] = [];

  if (msgLower.includes("housing") || msgLower.includes("house") || msgLower.includes("apartment")) {
    labels.push("housing");
    tags.push("accommodation");
  }
  if (msgLower.includes("student")) {
    tags.push("student");
  }
  if (msgLower.includes("landlord") || msgLower.includes("host")) {
    tags.push("landlord");
  }
  if (msgLower.includes("payment") || msgLower.includes("momo")) {
    labels.push("payment");
    tags.push("payment");
  }

  return {
    _id: contact._id,
    name: contact.name,
    email: contact.email,
    message: messageText,
    status: contact.status || "pending",
    ipAddress: contact.ipAddress || null,
    userAgent: contact.userAgent || null,
    repliedAt: contact.repliedAt || null,
    readAt: contact.readAt || null,
    replyMessage: contact.replyMessage || null,
    createdAt: contact.createdAt,
    updatedAt: contact.updatedAt,
    senderName: contact.name,
    senderEmail: contact.email,
    content: messageText,
    subject: `Message from ${contact.name}`,
    isRead: contact.status !== "pending",
    isFlagged: false,
    isStarred: false,
    category,
    priority,
    labels,
    tags,
    repliedBy: contact.repliedAt ? "Admin" : undefined,
  };
};

// ============================================================
// MAIN COMPONENT - ManagerMessageManagement
// ============================================================

export const ManagerMessageManagement: React.FC = () => {
  const [lang, setLang] = useState<"en" | "fr" | "rw">(getLanguageFromCookies());

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

  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");

  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  // Confirm Modal state
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
    type?: "danger" | "warning" | "info" | "success";
    icon?: React.ReactNode;
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
    confirmText: "Confirm",
    cancelText: "Cancel",
    type: "warning",
  });

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Statistics
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    read: 0,
    replied: 0,
    archived: 0,
    flagged: 0,
    starred: 0,
  });

  const t = translations[lang];

  const showSuccessModal = (title: string, message: string, details?: string) => {
    setSuccessModal({ isOpen: true, title, message, details });
  };

  const showErrorModal = (title: string, message: string, details?: string) => {
    setErrorModal({ isOpen: true, title, message, details });
  };

  const showConfirmModal = (
    title: string,
    message: string,
    onConfirm: () => void,
    confirmText?: string,
    cancelText?: string,
    type?: "danger" | "warning" | "info" | "success",
    icon?: React.ReactNode,
  ) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      onConfirm,
      confirmText: confirmText || t.confirm || "Confirm",
      cancelText: cancelText || t.cancel || "Cancel",
      type: type || "warning",
      icon,
    });
  };

  const closeConfirmModal = () => {
    setConfirmModal((prev) => ({ ...prev, isOpen: false }));
  };

  // Fetch messages from API using axios
  const fetchMessages = async () => {
    setIsFetching(true);
    try {
      const response = await API.get("/contact");
      const data = response.data;

      let contacts: Contact[] = [];
      if (Array.isArray(data)) {
        contacts = data;
      } else if (data && typeof data === "object") {
        if (data._id) {
          contacts = [data];
        } else if (data.data && Array.isArray(data.data)) {
          contacts = data.data;
        } else if (data.contacts && Array.isArray(data.contacts)) {
          contacts = data.contacts;
        } else {
          const possibleArrays = Object.values(data).filter((val) => Array.isArray(val));
          if (possibleArrays.length > 0) {
            contacts = possibleArrays[0];
          }
        }
      }

      const transformedMessages = contacts.map((contact: Contact) =>
        transformContactToMessage(contact),
      );
      setMessages(transformedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      showErrorModal(
        t.error || "Error",
        t.fetchError || "Failed to load messages",
        error instanceof Error ? error.message : undefined,
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
    fetchMessages();
  }, []);

  // Filter messages
  useEffect(() => {
    let filtered = [...messages];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (msg) =>
          msg.name.toLowerCase().includes(term) ||
          msg.email.toLowerCase().includes(term) ||
          msg.message.toLowerCase().includes(term) ||
          msg.subject.toLowerCase().includes(term),
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((msg) => msg.status === filterStatus);
    }

    if (filterCategory !== "all") {
      filtered = filtered.filter((msg) => msg.category === filterCategory);
    }

    if (filterPriority !== "all") {
      filtered = filtered.filter((msg) => msg.priority === filterPriority);
    }

    setFilteredMessages(filtered);
  }, [messages, searchTerm, filterStatus, filterCategory, filterPriority]);

  // Update statistics
  useEffect(() => {
    const total = messages.length;
    const pending = messages.filter((m) => m.status === "pending").length;
    const read = messages.filter((m) => m.status === "read").length;
    const replied = messages.filter((m) => m.status === "replied").length;
    const archived = messages.filter((m) => m.status === "archived").length;
    const flagged = messages.filter((m) => m.isFlagged).length;
    const starred = messages.filter((m) => m.isStarred).length;

    setStats({ total, pending, read, replied, archived, flagged, starred });
  }, [messages]);

  // Get status badge color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "read":
        return "bg-blue-100 text-blue-800";
      case "replied":
        return "bg-green-100 text-green-800";
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
        return t.pending;
      case "read":
        return t.read;
      case "replied":
        return t.replied;
      case "archived":
        return t.archived;
      default:
        return status;
    }
  };

  // Get category color
  const getCategoryColor = (category: string): string => {
    switch (category) {
      case "general":
        return "bg-gray-100 text-gray-800";
      case "support":
        return "bg-blue-100 text-blue-800";
      case "booking":
        return "bg-purple-100 text-purple-800";
      case "payment":
        return "bg-green-100 text-green-800";
      case "complaint":
        return "bg-red-100 text-red-800";
      case "feedback":
        return "bg-yellow-100 text-yellow-800";
      case "other":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get priority color
  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case "low":
        return "bg-gray-100 text-gray-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "urgent":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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

  // CRUD Operations with axios
  const handleDeleteMessage = async () => {
    if (!selectedMessage) return;

    setIsLoading(true);

    try {
      await API.delete(`/contact/${selectedMessage._id}`);

      const updatedMessages = messages.filter((m) => m._id !== selectedMessage._id);
      setMessages(updatedMessages);

      showSuccessModal(
        t.success || "Success!",
        t.messageDeleted || "Message deleted successfully!",
        `Message from ${selectedMessage.senderName} has been removed`,
      );
      setSelectedMessage(null);
      closeConfirmModal();
    } catch (error) {
      console.error("Error deleting message:", error);
      showErrorModal(
        t.error || "Error",
        t.deleteFailed || "Failed to delete message",
        error instanceof Error ? error.message : undefined,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendReply = async () => {
    if (!selectedMessage || !replyContent.trim()) {
      showErrorModal(t.error || "Error", "Please enter a reply");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await API.put(`/contact/${selectedMessage._id}/reply`, {
        replyMessage: replyContent,
        status: selectedStatus || "replied",
      });

      const updatedContact = response.data;
      const updatedMessage = transformContactToMessage(updatedContact);

      const updatedMessages = messages.map((m) =>
        m._id === selectedMessage._id ? updatedMessage : m,
      );
      setMessages(updatedMessages);

      showSuccessModal(
        t.success || "Success!",
        t.replySent || "Reply sent successfully!",
        `Reply sent to ${selectedMessage.senderName}`,
      );
      setIsReplyModalOpen(false);
      setSelectedMessage(null);
      setReplyContent("");
    } catch (error) {
      console.error("Error sending reply:", error);
      showErrorModal(
        t.error || "Error",
        t.replyFailed || "Failed to send reply",
        error instanceof Error ? error.message : undefined,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStatus = async (messageId: string, newStatus: Message["status"]) => {
    try {
      const response = await API.put(`/contact/${messageId}/status`, {
        status: newStatus,
      });

      const updatedContact = response.data;
      const updatedMessage = transformContactToMessage(updatedContact);

      const updatedMessages = messages.map((m) =>
        m._id === messageId ? updatedMessage : m,
      );
      setMessages(updatedMessages);

      showSuccessModal(
        t.success || "Success!",
        t.statusUpdated || "Message status updated successfully!",
      );
    } catch (error) {
      console.error("Error updating status:", error);
      showErrorModal(
        t.error || "Error",
        t.statusUpdateFailed || "Failed to update message status",
        error instanceof Error ? error.message : undefined,
      );
    }
  };

  const handleToggleStar = async (messageId: string) => {
    const message = messages.find((m) => m._id === messageId);
    if (!message) return;

    const updatedMessages = messages.map((m) =>
      m._id === messageId ? { ...m, isStarred: !m.isStarred } : m,
    );
    setMessages(updatedMessages);
  };

  const handleToggleFlag = async (messageId: string) => {
    const message = messages.find((m) => m._id === messageId);
    if (!message) return;

    const updatedMessages = messages.map((m) =>
      m._id === messageId ? { ...m, isFlagged: !m.isFlagged } : m,
    );
    setMessages(updatedMessages);
  };

  const handleMarkAsRead = async (messageId: string) => {
    try {
      const response = await API.put(`/contact/${messageId}/read`);
      const updatedContact = response.data;
      const updatedMessage = transformContactToMessage(updatedContact);

      const updatedMessages = messages.map((m) =>
        m._id === messageId ? updatedMessage : m,
      );
      setMessages(updatedMessages);
    } catch (error) {
      // Silent fail for mark as read
      console.error("Error marking as read:", error);
    }
  };

  // Open modals
  const openViewModal = (message: Message) => {
    setSelectedMessage(message);
    setIsViewModalOpen(true);
    if (!message.isRead) {
      handleMarkAsRead(message._id);
    }
  };

  const openReplyModal = (message: Message) => {
    setSelectedMessage(message);
    setReplyContent(message.replyMessage || "");
    setSelectedStatus(message.status);
    setIsReplyModalOpen(true);
  };

  const openDeleteModal = (message: Message) => {
    setSelectedMessage(message);
    showConfirmModal(
      "⚠️ " + (t.deleteMessage || "Delete Message"),
      `${t.deleteConfirmation || "Are you sure you want to delete this message?"} ${t.actionUndone || "This action cannot be undone."}`,
      handleDeleteMessage,
      t.delete || "Delete",
      t.cancel || "Cancel",
      "danger",
      <DeleteIcon className="w-10 h-10" />,
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

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={closeConfirmModal}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        cancelText={confirmModal.cancelText}
        isSubmitting={isLoading}
        type={confirmModal.type}
        icon={confirmModal.icon}
      />

      {/* Manager Access Notice */}
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
        <MessageIcon className="text-blue-600 w-5 h-5" />
        <div>
          <p className="text-sm text-blue-700 font-medium">{t.managerAccess}</p>
          <p className="text-xs text-blue-600">{t.managerViewOnly}</p>
        </div>
      </div>

      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <MessageIcon className="w-7 h-7 text-[#FF385C]" />
              {t.messageManagement}
            </h1>
            <p className="text-sm text-gray-500 mt-1">{t.manageMessages}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchMessages}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RefreshIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
        <motion.div whileHover={{ y: -2 }} className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
          <p className="text-xs text-gray-500">{t.total}</p>
          <p className="text-xl font-bold text-gray-900">{stats.total}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-yellow-50 rounded-xl p-3 shadow-sm border border-yellow-200">
          <p className="text-xs text-yellow-600">{t.pending}</p>
          <p className="text-xl font-bold text-yellow-700">{stats.pending}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-blue-50 rounded-xl p-3 shadow-sm border border-blue-200">
          <p className="text-xs text-blue-600">{t.read}</p>
          <p className="text-xl font-bold text-blue-700">{stats.read}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-green-50 rounded-xl p-3 shadow-sm border border-green-200">
          <p className="text-xs text-green-600">{t.replied}</p>
          <p className="text-xl font-bold text-green-700">{stats.replied}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-gray-50 rounded-xl p-3 shadow-sm border border-gray-200">
          <p className="text-xs text-gray-500">{t.archived}</p>
          <p className="text-xl font-bold text-gray-900">{stats.archived}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-red-50 rounded-xl p-3 shadow-sm border border-red-200">
          <p className="text-xs text-red-600">{t.flagged}</p>
          <p className="text-xl font-bold text-red-700">{stats.flagged}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-purple-50 rounded-xl p-3 shadow-sm border border-purple-200">
          <p className="text-xs text-purple-600">{t.starred}</p>
          <p className="text-xl font-bold text-purple-700">{stats.starred}</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t.searchMessages}
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
              <option value="all">{t.allStatus}</option>
              <option value="pending">{t.pending}</option>
              <option value="read">{t.read}</option>
              <option value="replied">{t.replied}</option>
              <option value="archived">{t.archived}</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
            >
              <option value="all">{t.allCategories}</option>
              <option value="general">{t.general}</option>
              <option value="support">{t.support}</option>
              <option value="booking">{t.booking}</option>
              <option value="payment">{t.payment}</option>
              <option value="complaint">{t.complaint}</option>
              <option value="feedback">{t.feedback}</option>
              <option value="other">{t.other}</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
            >
              <option value="all">{t.allPriorities}</option>
              <option value="low">{t.low}</option>
              <option value="medium">{t.medium}</option>
              <option value="high">{t.high}</option>
              <option value="urgent">{t.urgent}</option>
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

      {/* Messages Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <span>{t.message}</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  {t.sender}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  {t.category}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  {t.priority}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.status}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  {t.received}
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.actions}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMessages.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    <MessageIcon className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                    <p>{t.noMessages}</p>
                    <p className="text-sm">{t.adjustFilters}</p>
                  </td>
                </tr>
              ) : (
                filteredMessages.map((message) => (
                  <motion.tr
                    key={message._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`hover:bg-gray-50 transition-colors cursor-pointer ${!message.isRead ? "bg-blue-50/50" : ""}`}
                    onClick={() => openViewModal(message)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 flex items-center gap-1">
                          {message.isStarred && (
                            <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                          )}
                          {message.isFlagged && (
                            <FlagIcon className="w-4 h-4 text-red-400 fill-current" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className={`text-sm ${!message.isRead ? "font-semibold text-gray-900" : "text-gray-900"}`}>
                            {message.subject}
                          </p>
                          <p className="text-xs text-gray-500 truncate md:hidden">
                            {message.senderName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-sm text-gray-600">{message.senderName}</p>
                      <p className="text-xs text-gray-400">{message.senderEmail}</p>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className={`px-2 py-0.5 text-xs rounded-full ${getCategoryColor(message.category)}`}>
                        {message.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className={`px-2 py-0.5 text-xs rounded-full ${getPriorityColor(message.priority)}`}>
                        {message.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(message.status)}`}>
                        {getStatusLabel(message.status)}
                      </span>
                      {!message.isRead && (
                        <span className="ml-1 w-2 h-2 inline-block bg-blue-500 rounded-full"></span>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <p className="text-sm text-gray-600">{formatDate(message.createdAt)}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1 flex-nowrap">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            openViewModal(message);
                          }}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title={t.viewMessage}
                        >
                          <VisibilityIcon className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            openReplyModal(message);
                          }}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title={t.reply}
                        >
                          <ReplyIcon className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleStar(message._id);
                          }}
                          className={`p-1.5 rounded-lg transition-colors ${message.isStarred ? "text-yellow-400 hover:bg-yellow-50" : "text-gray-400 hover:bg-yellow-50"}`}
                          title={t.toggleStar}
                        >
                          {message.isStarred ? (
                            <StarIcon className="w-4 h-4" />
                          ) : (
                            <StarBorderIcon className="w-4 h-4" />
                          )}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleFlag(message._id);
                          }}
                          className={`p-1.5 rounded-lg transition-colors ${message.isFlagged ? "text-red-400 hover:bg-red-50" : "text-gray-400 hover:bg-red-50"}`}
                          title={t.toggleFlag}
                        >
                          {message.isFlagged ? (
                            <FlagIcon className="w-4 h-4" />
                          ) : (
                            <FlagOutlinedIcon className="w-4 h-4" />
                          )}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            openDeleteModal(message);
                          }}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title={t.deleteMessage}
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
            {t.showing} {filteredMessages.length} {t.of} {messages.length} {t.messages}
          </p>
        </div>
      </div>

      {/* View Message Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedMessage && (
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
                    <MessageIcon className="text-[#FF385C] w-5 h-5" />
                    <h2 className="text-xl font-semibold text-gray-900">{t.messageDetails}</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleToggleStar(selectedMessage._id)}
                      className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      {selectedMessage.isStarred ? (
                        <StarIcon className="w-5 h-5 text-yellow-400" />
                      ) : (
                        <StarBorderIcon className="w-5 h-5 text-gray-400" />
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleToggleFlag(selectedMessage._id)}
                      className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      {selectedMessage.isFlagged ? (
                        <FlagIcon className="w-5 h-5 text-red-400" />
                      ) : (
                        <FlagOutlinedIcon className="w-5 h-5 text-gray-400" />
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ rotate: 90, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsViewModalOpen(false)}
                      className="p-1.5 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                    >
                      <CloseIcon className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.senderName}</label>
                      <p className="text-sm font-medium text-gray-900 mt-1">{selectedMessage.senderName}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.senderEmail}</label>
                      <p className="text-sm font-medium text-gray-900 mt-1">{selectedMessage.senderEmail}</p>
                    </div>
                  </div>

                  {selectedMessage.ipAddress && (
                    <div>
                      <label className="text-xs font-medium text-gray-500">IP Address</label>
                      <p className="text-sm text-gray-600 mt-1">{selectedMessage.ipAddress}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.subject}</label>
                      <p className="text-sm font-medium text-gray-900 mt-1">{selectedMessage.subject}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.category}</label>
                      <p className="mt-1">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getCategoryColor(selectedMessage.category)}`}>
                          {selectedMessage.category}
                        </span>
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.priority}</label>
                      <p className="mt-1">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getPriorityColor(selectedMessage.priority)}`}>
                          {selectedMessage.priority}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500">{t.messageContent}</label>
                    <div className="mt-1 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>
                  </div>

                  {selectedMessage.labels && selectedMessage.labels.length > 0 && (
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.labels}</label>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {selectedMessage.labels.map((label) => (
                          <span key={label} className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedMessage.tags && selectedMessage.tags.length > 0 && (
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.tags}</label>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {selectedMessage.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedMessage.replyMessage && (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <label className="text-xs font-medium text-gray-500">{t.replyLabel}</label>
                      <div className="mt-1 p-3 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedMessage.replyMessage}</p>
                        {selectedMessage.repliedBy && (
                          <p className="text-xs text-gray-500 mt-2">
                            Replied by: {selectedMessage.repliedBy} on {formatDate(selectedMessage.repliedAt || "")}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsViewModalOpen(false);
                        openReplyModal(selectedMessage);
                      }}
                      className="px-4 py-2.5 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors flex items-center gap-2"
                    >
                      <ReplyIcon className="w-4 h-4" />
                      {t.reply}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        const newStatus = selectedMessage.status === "archived" ? "read" : "archived";
                        handleUpdateStatus(selectedMessage._id, newStatus as Message["status"]);
                        setIsViewModalOpen(false);
                      }}
                      className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      {selectedMessage.status === "archived" ? (
                        <UnarchiveIcon className="w-4 h-4" />
                      ) : (
                        <ArchiveIcon className="w-4 h-4" />
                      )}
                      {selectedMessage.status === "archived" ? t.unarchive : t.archive}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsViewModalOpen(false);
                        openDeleteModal(selectedMessage);
                      }}
                      className="px-4 py-2.5 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center gap-2"
                    >
                      <DeleteIcon className="w-4 h-4" />
                      {t.delete}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsViewModalOpen(false)}
                      className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors ml-auto"
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

      {/* Reply Modal */}
      <AnimatePresence>
        {isReplyModalOpen && selectedMessage && (
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
                      {t.replyTo} {selectedMessage.senderName}
                    </h2>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setIsReplyModalOpen(false);
                      setReplyContent("");
                    }}
                    className="p-1.5 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="p-6 space-y-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-700">From:</span> {selectedMessage.senderName} ({selectedMessage.senderEmail})
                    </p>
                    <p className="text-sm text-gray-700 mt-1 line-clamp-2">{selectedMessage.message}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.updateStatus}</label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                    >
                      <option value="pending">{t.pending}</option>
                      <option value="read">{t.read}</option>
                      <option value="replied">{t.replied}</option>
                      <option value="archived">{t.archived}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.replyLabel}</label>
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      rows={6}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none"
                      placeholder={t.replyPlaceholder}
                    />
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSendReply}
                      disabled={isSubmitting || !replyContent.trim()}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 ${
                        isSubmitting || !replyContent.trim()
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
                          <SendIcon className="w-4 h-4" />
                          {t.sendReply}
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsReplyModalOpen(false);
                        setReplyContent("");
                      }}
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