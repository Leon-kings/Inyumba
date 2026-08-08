// /* eslint-disable react-hooks/set-state-in-effect */
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Cookies from 'js-cookie';

// // Types
// interface MessageAttachment {
//   name: string;
//   size: number;
//   type: string;
//   dataUrl: string;
// }

// interface Message {
//   id: string;
//   senderId: string;
//   senderName: string;
//   senderEmail: string;
//   recipientId?: string;
//   recipientEmail?: string;
//   subject: string;
//   content: string;
//   attachments?: MessageAttachment[];
//   category: "general" | "support" | "booking" | "payment" | "complaint" | "feedback" | "other";
//   priority: "low" | "medium" | "high" | "urgent";
//   status: "pending" | "read" | "replied" | "resolved" | "archived";
//   isRead: boolean;
//   isFlagged: boolean;
//   isStarred: boolean;
//   labels: string[];
//   createdAt: string;
//   updatedAt: string;
//   repliedAt?: string;
//   repliedBy?: string;
//   replyContent?: string;
//   assignedTo?: string;
//   tags: string[];
//   metadata: {
//     ipAddress?: string;
//     userAgent?: string;
//     pageUrl?: string;
//     browser?: string;
//     os?: string;
//   };
// }

// interface MessageFormData {
//   senderName: string;
//   senderEmail: string;
//   recipientEmail: string;
//   subject: string;
//   content: string;
//   category: Message["category"];
//   priority: Message["priority"];
//   status: Message["status"];
//   labels: string[];
//   tags: string[];
// }

// // Translations
// const translations = {
//   en: {
//     myMessages: "My Messages",
//     manageMessages: "View and manage your messages",
//     total: "Total",
//     pending: "Pending",
//     read: "Read",
//     replied: "Replied",
//     resolved: "Resolved",
//     archived: "Archived",
//     flagged: "Flagged",
//     starred: "Starred",
//     searchMessages: "Search by subject, sender, or content...",
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
//     composeMessage: "Compose Message",
//     newMessage: "New Message",
//     createMessage: "Create Message",
//     messageCreated: "Message created successfully!",
//     createFailed: "Failed to create message",
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
//     permissions: {
//       cannotEdit: "You cannot edit this message",
//       cannotDelete: "You cannot delete this message",
//       adminOnly: "Only admins can change message status",
//     },
//   },
//   fr: {
//     myMessages: "Mes Messages",
//     manageMessages: "Voir et gérer vos messages",
//     total: "Total",
//     pending: "En Attente",
//     read: "Lu",
//     replied: "Répondu",
//     resolved: "Résolu",
//     archived: "Archivé",
//     flagged: "Signalé",
//     starred: "Favori",
//     searchMessages: "Rechercher par sujet, expéditeur ou contenu...",
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
//     composeMessage: "Composer un Message",
//     newMessage: "Nouveau Message",
//     createMessage: "Créer un Message",
//     messageCreated: "Message créé avec succès !",
//     createFailed: "Échec de la création du message",
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
//     permissions: {
//       cannotEdit: "Vous ne pouvez pas modifier ce message",
//       cannotDelete: "Vous ne pouvez pas supprimer ce message",
//       adminOnly: "Seuls les administrateurs peuvent changer le statut",
//     },
//   },
//   rw: {
//     myMessages: "Ubutumwa Bwanjye",
//     manageMessages: "Reba kandi ucunge ubutumwa bwawe",
//     total: "Yose",
//     pending: "Bitegereje",
//     read: "Byasomwe",
//     replied: "Byasubijwe",
//     resolved: "Byakemutse",
//     archived: "Byabitswe",
//     flagged: "Byashyizwe ikimenyetso",
//     starred: "Byakunzwe",
//     searchMessages: "Shakisha ukurikije ikiganiro, uwohereje cyangwa ibiri mu butumwa...",
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
//     composeMessage: "Andika Ubutumwa",
//     newMessage: "Ubutumwa Bushya",
//     createMessage: "Kora Ubutumwa",
//     messageCreated: "Ubutumwa bwakozwe neza!",
//     createFailed: "Kora ubutumwa birananiranye",
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
//     permissions: {
//       cannotEdit: "Ntushobora guhindura ubu butumwa",
//       cannotDelete: "Ntushobora gukuraho ubu butumwa",
//       adminOnly: "Abayobozi gusa nibo bashobora guhindura ihagaze",
//     },
//   }
// };

// // Helper function to get language from cookies
// const getLanguageFromCookies = (): 'en' | 'fr' | 'rw' => {
//   const lang = Cookies.get('language') as 'en' | 'fr' | 'rw';
//   return lang || 'en';
// };

// // Helper function to get user role from cookies
// const getUserRole = (): 'admin' | 'user' | 'host' => {
//   const role = Cookies.get('userRole') as 'admin' | 'user' | 'host';
//   return role || 'user';
// };

// // Helper function to get user email from cookies
// const getUserEmail = (): string => {
//   return Cookies.get('userEmail') || '';
// };

// // Helper function to get user name from cookies
// const getUserName = (): string => {
//   return Cookies.get('userName') || '';
// };

// // Storage key
// const STORAGE_KEY = "user_messages";

// // Generate unique ID
// const generateId = (): string => {
//   return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
// };

// // Initial messages
// const getInitialMessages = (userEmail: string): Message[] => {
//   return [
//     {
//       id: "1",
//       senderId: "admin",
//       senderName: "INYUMBA Support",
//       senderEmail: "support@inyumba.com",
//       recipientEmail: userEmail || "user@example.com",
//       subject: "Welcome to INYUMBA Platform",
//       content: "Welcome to INYUMBA Project! We're excited to have you on board. If you need any assistance, feel free to reach out.",
//       category: "support",
//       priority: "medium",
//       status: "read",
//       isRead: true,
//       isFlagged: false,
//       isStarred: false,
//       labels: ["welcome"],
//       createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
//       updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
//       tags: ["onboarding"],
//       metadata: {},
//     },
//     {
//       id: "2",
//       senderId: "admin",
//       senderName: "INYUMBA Team",
//       senderEmail: "team@inyumba.com",
//       recipientEmail: userEmail || "user@example.com",
//       subject: "Tips for Finding Accommodation",
//       content: "Here are some tips to help you find the perfect accommodation on our platform...",
//       category: "general",
//       priority: "low",
//       status: "pending",
//       isRead: false,
//       isFlagged: false,
//       isStarred: true,
//       labels: ["tips", "accommodation"],
//       createdAt: new Date(Date.now() - 86400000).toISOString(),
//       updatedAt: new Date(Date.now() - 86400000).toISOString(),
//       tags: ["tips", "helpful"],
//       metadata: {},
//     },
//   ];
// };

// // Helper functions
// const getMessages = (userEmail: string): Message[] => {
//   const data = localStorage.getItem(STORAGE_KEY);
//   if (data) {
//     const allMessages = JSON.parse(data);
//     // Filter messages for this user (both sent and received)
//     return allMessages.filter(
//       (msg: Message) => msg.senderEmail === userEmail || msg.recipientEmail === userEmail
//     );
//   }
//   // Initialize with initial data
//   const initialMessages = getInitialMessages(userEmail);
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMessages));
//   return initialMessages;
// };

// const saveMessages = (messages: Message[]): void => {
//   // Get all messages (including other users' messages)
//   const allData = localStorage.getItem(STORAGE_KEY);
//   const allMessages: Message[] = allData ? JSON.parse(allData) : [];
  
//   // Update messages for current user
//   const userEmail = getUserEmail();
//   const otherMessages = allMessages.filter(
//     (msg) => msg.senderEmail !== userEmail && msg.recipientEmail !== userEmail
//   );
  
//   // Combine with updated messages
//   const updatedAll = [...otherMessages, ...messages];
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAll));
// };

// export const UserMessageManagement: React.FC = () => {
//   // Get language and user info from cookies
//   const [lang, setLang] = useState<'en' | 'fr' | 'rw'>(getLanguageFromCookies());
//   const userRole = getUserRole();
//   const userEmail = getUserEmail();
//   const userName = getUserName();
  
//   const [messages, setMessages] = useState<Message[]>(getMessages(userEmail));
//   const [filteredMessages, setFilteredMessages] = useState<Message[]>(getMessages(userEmail));
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState<string>("all");
//   const [filterCategory, setFilterCategory] = useState<string>("all");
//   const [filterPriority, setFilterPriority] = useState<string>("all");

//   // Modal states
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
//   const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
//   const [replyContent, setReplyContent] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState<string>("");

//   // Compose form state
//   const [formData, setFormData] = useState<MessageFormData>({
//     senderName: userName || "",
//     senderEmail: userEmail || "",
//     recipientEmail: "",
//     subject: "",
//     content: "",
//     category: "general",
//     priority: "medium",
//     status: "pending",
//     labels: [],
//     tags: [],
//   });
//   const [labelInput, setLabelInput] = useState("");
//   const [tagInput, setTagInput] = useState("");

//   // Loading states
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Statistics
//   const [stats, setStats] = useState({
//     total: 0,
//     pending: 0,
//     read: 0,
//     replied: 0,
//     resolved: 0,
//     archived: 0,
//     flagged: 0,
//     starred: 0,
//   });

//   const t = translations[lang];
//   const isAdmin = userRole === 'admin';

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

//   // Refresh messages
//   useEffect(() => {
//     const refreshed = getMessages(userEmail);
//     setMessages(refreshed);
//   }, [userEmail]);

//   // Filter messages
//   useEffect(() => {
//     let filtered = [...messages];

//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       filtered = filtered.filter(
//         (msg) =>
//           msg.subject.toLowerCase().includes(term) ||
//           msg.senderName.toLowerCase().includes(term) ||
//           msg.content.toLowerCase().includes(term) ||
//           msg.senderEmail.toLowerCase().includes(term)
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
//     const resolved = messages.filter((m) => m.status === "resolved").length;
//     const archived = messages.filter((m) => m.status === "archived").length;
//     const flagged = messages.filter((m) => m.isFlagged).length;
//     const starred = messages.filter((m) => m.isStarred).length;

//     setStats({ total, pending, read, replied, resolved, archived, flagged, starred });
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
//       case "resolved":
//         return "bg-emerald-100 text-emerald-800";
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
//       case "resolved":
//         return t.resolved;
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

//   // Check if user can edit/delete message

//   const canDeleteMessage = (message: Message): boolean => {
//     return isAdmin || (message.senderEmail === userEmail && message.status === "pending");
//   };

//   // CRUD Operations
//   const handleCreateMessage = async () => {
//     if (!formData.senderName || !formData.senderEmail || !formData.subject || !formData.content) {
//       toast.warning("Please fill in all required fields");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       const newMessage: Message = {
//         id: generateId(),
//         senderId: userEmail || "user",
//         senderName: formData.senderName,
//         senderEmail: formData.senderEmail,
//         recipientEmail: formData.recipientEmail || "support@inyumba.com",
//         subject: formData.subject,
//         content: formData.content,
//         category: formData.category,
//         priority: formData.priority,
//         status: formData.status,
//         isRead: false,
//         isFlagged: false,
//         isStarred: false,
//         labels: formData.labels,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//         tags: formData.tags,
//         metadata: {},
//       };

//       const updatedMessages = [newMessage, ...messages];
//       setMessages(updatedMessages);
//       saveMessages(updatedMessages);
      
//       toast.success(`✅ ${t.messageCreated}`);
//       resetForm();
//       setIsComposeModalOpen(false);
//     } catch (error) {
//       toast.error(`❌ ${t.createFailed}`);
//       console.error("Create message error:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDeleteMessage = async () => {
//     if (!selectedMessage) return;

//     setIsLoading(true);

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 800));

//       const updatedMessages = messages.filter((m) => m.id !== selectedMessage.id);
//       setMessages(updatedMessages);
//       saveMessages(updatedMessages);
      
//       toast.success(`🗑️ ${t.messageDeleted}`);
//       setIsDeleteModalOpen(false);
//       setSelectedMessage(null);
//     } catch (error) {
//       toast.error(`❌ ${t.deleteFailed}`);
//       console.error("Delete message error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSendReply = async () => {
//     if (!selectedMessage || !replyContent.trim()) {
//       toast.warning("Please enter a reply");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       const updatedMessage: Message = {
//         ...selectedMessage,
//         status: "replied",
//         replyContent: replyContent,
//         repliedBy: userName || "User",
//         repliedAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       };

//       const updatedMessages = messages.map((m) =>
//         m.id === selectedMessage.id ? updatedMessage : m
//       );
//       setMessages(updatedMessages);
//       saveMessages(updatedMessages);

//       toast.success(`✅ ${t.replySent}`);
//       setIsReplyModalOpen(false);
//       setSelectedMessage(null);
//       setReplyContent("");
//     } catch (error) {
//       toast.error(`❌ ${t.replyFailed}`);
//       console.error("Reply error:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleUpdateStatus = async (messageId: string, newStatus: Message["status"]) => {
//     if (!isAdmin) {
//       toast.warning(t.permissions.adminOnly);
//       return;
//     }

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 500));

//       const updatedMessages = messages.map((m) =>
//         m.id === messageId
//           ? { ...m, status: newStatus, updatedAt: new Date().toISOString() }
//           : m
//       );
//       setMessages(updatedMessages);
//       saveMessages(updatedMessages);

//       toast.success(`✅ ${t.statusUpdated}`);
//     } catch (error) {
//       toast.error(`❌ ${t.statusUpdateFailed}`);
//       console.error("Status update error:", error);
//     }
//   };

//   const handleToggleStar = async (messageId: string) => {
//     const message = messages.find((m) => m.id === messageId);
//     if (!message) return;

//     try {
//       const updatedMessages = messages.map((m) =>
//         m.id === messageId
//           ? { ...m, isStarred: !m.isStarred, updatedAt: new Date().toISOString() }
//           : m
//       );
//       setMessages(updatedMessages);
//       saveMessages(updatedMessages);
//     } catch (error) {
//       console.error("Toggle star error:", error);
//     }
//   };

//   const handleToggleFlag = async (messageId: string) => {
//     const message = messages.find((m) => m.id === messageId);
//     if (!message) return;

//     try {
//       const updatedMessages = messages.map((m) =>
//         m.id === messageId
//           ? { ...m, isFlagged: !m.isFlagged, updatedAt: new Date().toISOString() }
//           : m
//       );
//       setMessages(updatedMessages);
//       saveMessages(updatedMessages);
//     } catch (error) {
//       console.error("Toggle flag error:", error);
//     }
//   };

//   const handleMarkAsRead = async (messageId: string) => {
//     try {
//       const updatedMessages = messages.map((m) =>
//         m.id === messageId
//           ? { ...m, isRead: true, status: m.status === "pending" ? "read" : m.status, updatedAt: new Date().toISOString() }
//           : m
//       );
//       setMessages(updatedMessages);
//       saveMessages(updatedMessages);
//     } catch (error) {
//       console.error("Mark as read error:", error);
//     }
//   };

//   // Reset form
//   const resetForm = () => {
//     setFormData({
//       senderName: userName || "",
//       senderEmail: userEmail || "",
//       recipientEmail: "",
//       subject: "",
//       content: "",
//       category: "general",
//       priority: "medium",
//       status: "pending",
//       labels: [],
//       tags: [],
//     });
//     setLabelInput("");
//     setTagInput("");
//   };

//   // Add label
//   const addLabel = () => {
//     if (labelInput.trim() && !formData.labels.includes(labelInput.trim())) {
//       setFormData({
//         ...formData,
//         labels: [...formData.labels, labelInput.trim()],
//       });
//       setLabelInput("");
//     }
//   };

//   // Remove label
//   const removeLabel = (label: string) => {
//     setFormData({
//       ...formData,
//       labels: formData.labels.filter((l) => l !== label),
//     });
//   };

//   // Add tag
//   const addTag = () => {
//     if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
//       setFormData({
//         ...formData,
//         tags: [...formData.tags, tagInput.trim()],
//       });
//       setTagInput("");
//     }
//   };

//   // Remove tag
//   const removeTag = (tag: string) => {
//     setFormData({
//       ...formData,
//       tags: formData.tags.filter((t) => t !== tag),
//     });
//   };

//   // Open modals
//   const openViewModal = (message: Message) => {
//     setSelectedMessage(message);
//     setIsViewModalOpen(true);
//     if (!message.isRead) {
//       handleMarkAsRead(message.id);
//     }
//   };

//   const openReplyModal = (message: Message) => {
//     setSelectedMessage(message);
//     setReplyContent("");
//     setSelectedStatus(message.status);
//     setIsReplyModalOpen(true);
//   };

//   const openDeleteModal = (message: Message) => {
//     setSelectedMessage(message);
//     setIsDeleteModalOpen(true);
//   };

//   const openComposeModal = () => {
//     resetForm();
//     setIsComposeModalOpen(true);
//   };

//   // Handle refresh
//   const handleRefresh = () => {
//     const refreshed = getMessages(userEmail);
//     setMessages(refreshed);
//     toast.success("Messages refreshed!");
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
//     <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="mb-6">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
//               <svg className="w-7 h-7 text-[#FF385C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg>
//               {t.myMessages}
//             </h1>
//             <p className="text-sm text-gray-500 mt-1">
//               {t.manageMessages}
//             </p>
//           </div>
//           <div className="flex items-center gap-2">
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={openComposeModal}
//               className="px-4 py-2 bg-[#FF385C] text-white rounded-lg text-sm font-medium hover:bg-[#E31C5F] transition-colors flex items-center gap-2"
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
//               </svg>
//               {t.composeMessage}
//             </motion.button>
//             <button
//               onClick={handleRefresh}
//               className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
//         <motion.div whileHover={{ y: -2 }} className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
//           <p className="text-xs text-gray-500">{t.total}</p>
//           <p className="text-xl font-bold text-gray-900">{stats.total}</p>
//         </motion.div>
//         <motion.div whileHover={{ y: -2 }} className="bg-yellow-50 rounded-xl p-3 shadow-sm border border-yellow-200">
//           <p className="text-xs text-yellow-600">{t.pending}</p>
//           <p className="text-xl font-bold text-yellow-700">{stats.pending}</p>
//         </motion.div>
//         <motion.div whileHover={{ y: -2 }} className="bg-blue-50 rounded-xl p-3 shadow-sm border border-blue-200">
//           <p className="text-xs text-blue-600">{t.read}</p>
//           <p className="text-xl font-bold text-blue-700">{stats.read}</p>
//         </motion.div>
//         <motion.div whileHover={{ y: -2 }} className="bg-green-50 rounded-xl p-3 shadow-sm border border-green-200">
//           <p className="text-xs text-green-600">{t.replied}</p>
//           <p className="text-xl font-bold text-green-700">{stats.replied}</p>
//         </motion.div>
//         <motion.div whileHover={{ y: -2 }} className="bg-emerald-50 rounded-xl p-3 shadow-sm border border-emerald-200">
//           <p className="text-xs text-emerald-600">{t.resolved}</p>
//           <p className="text-xl font-bold text-emerald-700">{stats.resolved}</p>
//         </motion.div>
//         <motion.div whileHover={{ y: -2 }} className="bg-gray-50 rounded-xl p-3 shadow-sm border border-gray-200">
//           <p className="text-xs text-gray-500">{t.archived}</p>
//           <p className="text-xl font-bold text-gray-900">{stats.archived}</p>
//         </motion.div>
//         <motion.div whileHover={{ y: -2 }} className="bg-red-50 rounded-xl p-3 shadow-sm border border-red-200">
//           <p className="text-xs text-red-600">{t.flagged}</p>
//           <p className="text-xl font-bold text-red-700">{stats.flagged}</p>
//         </motion.div>
//         <motion.div whileHover={{ y: -2 }} className="bg-purple-50 rounded-xl p-3 shadow-sm border border-purple-200">
//           <p className="text-xs text-purple-600">{t.starred}</p>
//           <p className="text-xl font-bold text-purple-700">{stats.starred}</p>
//         </motion.div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
//         <div className="flex flex-col sm:flex-row gap-3">
//           <div className="flex-1 relative">
//             <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
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
//               <option value="resolved">{t.resolved}</option>
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
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//               </svg>
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
//                   <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
//                     <svg className="w-12 h-12 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                     </svg>
//                     <p>{t.noMessages}</p>
//                     <p className="text-sm">{t.adjustFilters}</p>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredMessages.map((message) => (
//                   <motion.tr
//                     key={message.id}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className={`hover:bg-gray-50 transition-colors cursor-pointer ${!message.isRead ? "bg-blue-50/50" : ""}`}
//                     onClick={() => openViewModal(message)}
//                   >
//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-3">
//                         <div className="flex-shrink-0 flex items-center gap-1">
//                           {message.isStarred && (
//                             <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20" fill="currentColor">
//                               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                             </svg>
//                           )}
//                           {message.isFlagged && (
//                             <svg className="w-4 h-4 text-red-400 fill-current" viewBox="0 0 20 20" fill="currentColor">
//                               <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 01-1-1V6z" clipRule="evenodd" />
//                             </svg>
//                           )}
//                         </div>
//                         <div className="min-w-0">
//                           <p className={`text-sm ${!message.isRead ? "font-semibold text-gray-900" : "text-gray-900"}`}>
//                             {message.subject}
//                           </p>
//                           <p className="text-xs text-gray-500 truncate md:hidden">
//                             {message.senderName}
//                           </p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 hidden md:table-cell">
//                       <p className="text-sm text-gray-600">{message.senderName}</p>
//                       <p className="text-xs text-gray-400">{message.senderEmail}</p>
//                     </td>
//                     <td className="px-4 py-3 hidden lg:table-cell">
//                       <span className={`px-2 py-0.5 text-xs rounded-full ${getCategoryColor(message.category)}`}>
//                         {message.category}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 hidden lg:table-cell">
//                       <span className={`px-2 py-0.5 text-xs rounded-full ${getPriorityColor(message.priority)}`}>
//                         {message.priority}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3">
//                       {isAdmin ? (
//                         <div className="flex items-center gap-2">
//                           <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(message.status)}`}>
//                             {getStatusLabel(message.status)}
//                           </span>
//                           <select
//                             value={message.status}
//                             onChange={(e) => handleUpdateStatus(message.id, e.target.value as Message["status"])}
//                             className="px-2 py-1 text-xs border rounded-lg focus:ring-2 focus:ring-[#FF385C] outline-none"
//                             onClick={(e) => e.stopPropagation()}
//                           >
//                             <option value="pending">{t.pending}</option>
//                             <option value="read">{t.read}</option>
//                             <option value="replied">{t.replied}</option>
//                             <option value="resolved">{t.resolved}</option>
//                             <option value="archived">{t.archived}</option>
//                           </select>
//                         </div>
//                       ) : (
//                         <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(message.status)}`}>
//                           {getStatusLabel(message.status)}
//                         </span>
//                       )}
//                       {!message.isRead && (
//                         <span className="ml-1 w-2 h-2 inline-block bg-blue-500 rounded-full"></span>
//                       )}
//                     </td>
//                     <td className="px-4 py-3 hidden lg:table-cell">
//                       <p className="text-sm text-gray-600">{formatDate(message.createdAt)}</p>
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
//                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                           </svg>
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
//                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
//                           </svg>
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleToggleStar(message.id);
//                           }}
//                           className={`p-1.5 rounded-lg transition-colors ${message.isStarred ? "text-yellow-400 hover:bg-yellow-50" : "text-gray-400 hover:bg-yellow-50"}`}
//                           title={t.toggleStar}
//                         >
//                           <svg className="w-4 h-4" fill={message.isStarred ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//                           </svg>
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleToggleFlag(message.id);
//                           }}
//                           className={`p-1.5 rounded-lg transition-colors ${message.isFlagged ? "text-red-400 hover:bg-red-50" : "text-gray-400 hover:bg-red-50"}`}
//                           title={t.toggleFlag}
//                         >
//                           <svg className="w-4 h-4" fill={message.isFlagged ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
//                           </svg>
//                         </motion.button>
//                         {canDeleteMessage(message) && (
//                           <motion.button
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.9 }}
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               openDeleteModal(message);
//                             }}
//                             className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                             title={t.deleteMessage}
//                           >
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                             </svg>
//                           </motion.button>
//                         )}
//                         {!canDeleteMessage(message) && !isAdmin && (
//                           <span className="text-xs text-gray-400">View only</span>
//                         )}
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
//             {t.showing} {filteredMessages.length} {t.of} {messages.length} {t.messages}
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
//                     <svg className="w-5 h-5 text-[#FF385C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                     </svg>
//                     <h2 className="text-xl font-semibold text-gray-900">
//                       {t.messageDetails}
//                     </h2>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => handleToggleStar(selectedMessage.id)}
//                       className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
//                     >
//                       {selectedMessage.isStarred ? (
//                         <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20" fill="currentColor">
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                       ) : (
//                         <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//                         </svg>
//                       )}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => handleToggleFlag(selectedMessage.id)}
//                       className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
//                     >
//                       {selectedMessage.isFlagged ? (
//                         <svg className="w-5 h-5 text-red-400 fill-current" viewBox="0 0 20 20" fill="currentColor">
//                           <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 01-1-1V6z" clipRule="evenodd" />
//                         </svg>
//                       ) : (
//                         <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
//                         </svg>
//                       )}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ rotate: 90, scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => setIsViewModalOpen(false)}
//                       className="p-1.5 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
//                     >
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                       </svg>
//                     </motion.button>
//                   </div>
//                 </div>

//                 <div className="p-6 space-y-4">
//                   {/* Message Header */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">{t.senderName}</label>
//                       <p className="text-sm font-medium text-gray-900 mt-1">{selectedMessage.senderName}</p>
//                     </div>
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">{t.senderEmail}</label>
//                       <p className="text-sm font-medium text-gray-900 mt-1">{selectedMessage.senderEmail}</p>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">{t.subject}</label>
//                       <p className="text-sm font-medium text-gray-900 mt-1">{selectedMessage.subject}</p>
//                     </div>
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">{t.category}</label>
//                       <p className="mt-1">
//                         <span className={`px-2 py-0.5 text-xs rounded-full ${getCategoryColor(selectedMessage.category)}`}>
//                           {selectedMessage.category}
//                         </span>
//                       </p>
//                     </div>
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">{t.priority}</label>
//                       <p className="mt-1">
//                         <span className={`px-2 py-0.5 text-xs rounded-full ${getPriorityColor(selectedMessage.priority)}`}>
//                           {selectedMessage.priority}
//                         </span>
//                       </p>
//                     </div>
//                   </div>

//                   {/* Message Content */}
//                   <div>
//                     <label className="text-xs font-medium text-gray-500">{t.messageContent}</label>
//                     <div className="mt-1 p-4 bg-gray-50 rounded-lg">
//                       <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedMessage.content}</p>
//                     </div>
//                   </div>

//                   {/* Labels & Tags */}
//                   {selectedMessage.labels.length > 0 && (
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">{t.labels}</label>
//                       <div className="mt-1 flex flex-wrap gap-1">
//                         {selectedMessage.labels.map((label) => (
//                           <span key={label} className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
//                             {label}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {selectedMessage.tags.length > 0 && (
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">{t.tags}</label>
//                       <div className="mt-1 flex flex-wrap gap-1">
//                         {selectedMessage.tags.map((tag) => (
//                           <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full text-xs">
//                             #{tag}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Reply Section */}
//                   {selectedMessage.replyContent && (
//                     <div className="border-t border-gray-200 pt-4 mt-4">
//                       <label className="text-xs font-medium text-gray-500">{t.replyLabel}</label>
//                       <div className="mt-1 p-3 bg-green-50 rounded-lg border border-green-200">
//                         <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedMessage.replyContent}</p>
//                         {selectedMessage.repliedBy && (
//                           <p className="text-xs text-gray-500 mt-2">
//                             Replied by: {selectedMessage.repliedBy} on {formatDate(selectedMessage.repliedAt || "")}
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
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
//                       </svg>
//                       {t.reply}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => {
//                         const newStatus = selectedMessage.status === "archived" ? "read" : "archived";
//                         handleUpdateStatus(selectedMessage.id, newStatus as Message["status"]);
//                         setIsViewModalOpen(false);
//                       }}
//                       className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
//                     >
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
//                       </svg>
//                       {selectedMessage.status === "archived" ? t.unarchive : t.archive}
//                     </motion.button>
//                     {canDeleteMessage(selectedMessage) && (
//                       <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={() => {
//                           setIsViewModalOpen(false);
//                           openDeleteModal(selectedMessage);
//                         }}
//                         className="px-4 py-2.5 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center gap-2"
//                       >
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                         </svg>
//                         {t.delete}
//                       </motion.button>
//                     )}
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
//                     <svg className="w-5 h-5 text-[#FF385C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
//                     </svg>
//                     <h2 className="text-xl font-semibold text-gray-900">
//                       {t.reply} - {selectedMessage.subject}
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
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </motion.button>
//                 </div>

//                 <div className="p-6 space-y-4">
//                   {/* Original Message Preview */}
//                   <div className="p-3 bg-gray-50 rounded-lg">
//                     <p className="text-sm text-gray-500">
//                       <span className="font-medium text-gray-700">From:</span>{" "}
//                       {selectedMessage.senderName} ({selectedMessage.senderEmail})
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       <span className="font-medium text-gray-700">Subject:</span>{" "}
//                       {selectedMessage.subject}
//                     </p>
//                     <p className="text-sm text-gray-700 mt-1 line-clamp-2">
//                       {selectedMessage.content}
//                     </p>
//                   </div>

//                   {/* Status Update - Only for Admin */}
//                   {isAdmin && (
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         {t.updateStatus}
//                       </label>
//                       <select
//                         value={selectedStatus}
//                         onChange={(e) => setSelectedStatus(e.target.value)}
//                         className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//                       >
//                         <option value="pending">{t.pending}</option>
//                         <option value="read">{t.read}</option>
//                         <option value="replied">{t.replied}</option>
//                         <option value="resolved">{t.resolved}</option>
//                         <option value="archived">{t.archived}</option>
//                       </select>
//                     </div>
//                   )}

//                   {/* Reply Content */}
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
//                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//                           </svg>
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

//       {/* Delete Confirmation Modal */}
//       <AnimatePresence>
//         {isDeleteModalOpen && selectedMessage && (
//           <>
//             <motion.div
//               variants={overlayVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
//               onClick={() => {
//                 setIsDeleteModalOpen(false);
//                 setSelectedMessage(null);
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
//                       <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                       </svg>
//                     </div>
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
//                     {t.deleteMessage}
//                   </h3>
//                   <p className="text-gray-500 text-center mb-6">
//                     {t.deleteConfirmation}
//                     <br />
//                     <span className="text-sm text-gray-400">{t.actionUndone}</span>
//                   </p>
//                   <div className="flex gap-3">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => {
//                         setIsDeleteModalOpen(false);
//                         setSelectedMessage(null);
//                       }}
//                       className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
//                     >
//                       {t.cancel}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handleDeleteMessage}
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

//       {/* Compose Message Modal */}
//       <AnimatePresence>
//         {isComposeModalOpen && (
//           <>
//             <motion.div
//               variants={overlayVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
//               onClick={() => {
//                 setIsComposeModalOpen(false);
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
//                   <div className="flex items-center gap-2">
//                     <svg className="w-5 h-5 text-[#FF385C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//                     </svg>
//                     <h2 className="text-xl font-semibold text-gray-900">
//                       {t.newMessage}
//                     </h2>
//                   </div>
//                   <motion.button
//                     whileHover={{ rotate: 90, scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => {
//                       setIsComposeModalOpen(false);
//                       resetForm();
//                     }}
//                     className="p-1.5 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </motion.button>
//                 </div>

//                 <div className="p-6 space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         {t.senderName} *
//                       </label>
//                       <input
//                         type="text"
//                         value={formData.senderName}
//                         onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
//                         className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//                         placeholder="John Doe"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         {t.senderEmail} *
//                       </label>
//                       <input
//                         type="email"
//                         value={formData.senderEmail}
//                         onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
//                         className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//                         placeholder="you@example.com"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                       {t.recipient}
//                     </label>
//                     <input
//                       type="email"
//                       value={formData.recipientEmail}
//                       onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
//                       className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//                       placeholder="recipient@example.com"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                       {t.subject} *
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.subject}
//                       onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
//                       className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//                       placeholder="Message subject"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                       {t.content} *
//                     </label>
//                     <textarea
//                       value={formData.content}
//                       onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//                       rows={5}
//                       className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none"
//                       placeholder="Type your message here..."
//                     />
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         {t.category}
//                       </label>
//                       <select
//                         value={formData.category}
//                         onChange={(e) => setFormData({ ...formData, category: e.target.value as Message["category"] })}
//                         className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//                       >
//                         <option value="general">{t.general}</option>
//                         <option value="support">{t.support}</option>
//                         <option value="booking">{t.booking}</option>
//                         <option value="payment">{t.payment}</option>
//                         <option value="complaint">{t.complaint}</option>
//                         <option value="feedback">{t.feedback}</option>
//                         <option value="other">{t.other}</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         {t.priority}
//                       </label>
//                       <select
//                         value={formData.priority}
//                         onChange={(e) => setFormData({ ...formData, priority: e.target.value as Message["priority"] })}
//                         className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//                       >
//                         <option value="low">{t.low}</option>
//                         <option value="medium">{t.medium}</option>
//                         <option value="high">{t.high}</option>
//                         <option value="urgent">{t.urgent}</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         {t.status}
//                       </label>
//                       <select
//                         value={formData.status}
//                         onChange={(e) => setFormData({ ...formData, status: e.target.value as Message["status"] })}
//                         className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//                       >
//                         <option value="pending">{t.pending}</option>
//                         <option value="read">{t.read}</option>
//                         <option value="replied">{t.replied}</option>
//                         <option value="resolved">{t.resolved}</option>
//                         <option value="archived">{t.archived}</option>
//                       </select>
//                     </div>
//                   </div>

//                   {/* Labels */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                       {t.labels}
//                     </label>
//                     <div className="flex gap-2">
//                       <input
//                         type="text"
//                         value={labelInput}
//                         onChange={(e) => setLabelInput(e.target.value)}
//                         onKeyPress={(e) => e.key === "Enter" && addLabel()}
//                         className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//                         placeholder="Add a label..."
//                       />
//                       <button
//                         onClick={addLabel}
//                         className="px-3 py-2 bg-[#FF385C] text-white rounded-lg hover:bg-[#E31C5F] transition-colors"
//                       >
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
//                         </svg>
//                       </button>
//                     </div>
//                     <div className="mt-2 flex flex-wrap gap-1">
//                       {formData.labels.map((label) => (
//                         <span key={label} className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center gap-1">
//                           {label}
//                           <button onClick={() => removeLabel(label)} className="hover:text-red-500">
//                             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                           </button>
//                         </span>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Tags */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                       {t.tags}
//                     </label>
//                     <div className="flex gap-2">
//                       <input
//                         type="text"
//                         value={tagInput}
//                         onChange={(e) => setTagInput(e.target.value)}
//                         onKeyPress={(e) => e.key === "Enter" && addTag()}
//                         className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//                         placeholder="Add a tag..."
//                       />
//                       <button
//                         onClick={addTag}
//                         className="px-3 py-2 bg-[#FF385C] text-white rounded-lg hover:bg-[#E31C5F] transition-colors"
//                       >
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
//                         </svg>
//                       </button>
//                     </div>
//                     <div className="mt-2 flex flex-wrap gap-1">
//                       {formData.tags.map((tag) => (
//                         <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full text-xs flex items-center gap-1">
//                           #{tag}
//                           <button onClick={() => removeTag(tag)} className="hover:text-red-500">
//                             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                           </button>
//                         </span>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="flex gap-3 pt-4 border-t border-gray-200">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handleCreateMessage}
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
//                           {t.sending}
//                         </>
//                       ) : (
//                         <>
//                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//                           </svg>
//                           {t.createMessage}
//                         </>
//                       )}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => {
//                         setIsComposeModalOpen(false);
//                         resetForm();
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
/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

// Material-UI Icons
import MessageIcon from "@mui/icons-material/Message";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
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

// Types - Updated to match the contact model
interface Contact {
  id?: string;
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
  contactWithStatus?: string;
  notificationMessage?: string;
  messagePreview?: string;
  responseTime?: string | null;
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
  category:
    | "general"
    | "support"
    | "booking"
    | "payment"
    | "complaint"
    | "feedback"
    | "other";
  priority: "low" | "medium" | "high" | "urgent";
  labels: string[];
  tags: string[];
  repliedBy?: string;
  attachments?: any[];
  recipientEmail?: string;
  recipientId?: string;
  senderId?: string;
}

interface MessageFormData {
  name: string;
  email: string;
  message: string;
  status: "pending" | "read" | "replied" | "archived";
  replyMessage?: string;
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
    messageManagement: "My Messages",
    manageMessages: "View and manage your messages",
    total: "Total",
    pending: "Pending",
    read: "Read",
    replied: "Replied",
    resolved: "Resolved",
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
    composeMessage: "Compose Message",
    newMessage: "New Message",
    createMessage: "Create Message",
    messageCreated: "Message created successfully!",
    createFailed: "Failed to create message",
    markAsRead: "Mark as Read",
    markAsUnread: "Mark as Unread",
    toggleStar: "Toggle Star",
    toggleFlag: "Toggle Flag",
    archive: "Archive",
    unarchive: "Unarchive",
    labels: "Labels",
    tags: "Tags",
    addLabel: "Add Label",
    addTag: "Add Tag",
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
    noImage: "No image attached",
    viewImage: "View Image",
    loading: "Loading...",
    fetchError: "Failed to load messages",
    replyTo: "Reply to",
    nameRequired: "Name is required",
    nameMinLength: "Name must be at least 2 characters",
    emailRequired: "Email is required",
    emailInvalid: "Please enter a valid email",
    messageRequired: "Message is required",
    messageMinLength: "Message must be at least 10 characters",
    messageMaxLength: "Message cannot exceed 1000 characters",
    allFieldsValid: "All fields are valid!",
    pleaseFixErrors: "Please fix the errors above",
    noUserEmail: "No user email found. Please login again.",
  },
  fr: {
    messageManagement: "Mes Messages",
    manageMessages: "Voir et gérer vos messages",
    total: "Total",
    pending: "En Attente",
    read: "Lu",
    replied: "Répondu",
    resolved: "Résolu",
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
    composeMessage: "Composer un Message",
    newMessage: "Nouveau Message",
    createMessage: "Créer un Message",
    messageCreated: "Message créé avec succès !",
    createFailed: "Échec de la création du message",
    markAsRead: "Marquer comme Lu",
    markAsUnread: "Marquer comme Non Lu",
    toggleStar: "Basculer Favori",
    toggleFlag: "Basculer Signalement",
    archive: "Archiver",
    unarchive: "Désarchiver",
    labels: "Étiquettes",
    tags: "Tags",
    addLabel: "Ajouter une Étiquette",
    addTag: "Ajouter un Tag",
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
    noImage: "Aucune image jointe",
    viewImage: "Voir l'Image",
    loading: "Chargement...",
    fetchError: "Échec du chargement des messages",
    replyTo: "Répondre à",
    nameRequired: "Le nom est requis",
    nameMinLength: "Le nom doit contenir au moins 2 caractères",
    emailRequired: "L'email est requis",
    emailInvalid: "Veuillez entrer un email valide",
    messageRequired: "Le message est requis",
    messageMinLength: "Le message doit contenir au moins 10 caractères",
    messageMaxLength: "Le message ne peut pas dépasser 1000 caractères",
    allFieldsValid: "Tous les champs sont valides !",
    pleaseFixErrors: "Veuillez corriger les erreurs ci-dessus",
    noUserEmail: "Aucun email utilisateur trouvé. Veuillez vous reconnecter.",
  },
  rw: {
    messageManagement: "Ubutumwa Bwanjye",
    manageMessages: "Reba kandi ucunge ubutumwa bwawe",
    total: "Yose",
    pending: "Bitegereje",
    read: "Byasomwe",
    replied: "Byasubijwe",
    resolved: "Byakemutse",
    archived: "Byabitswe",
    flagged: "Byashyizwe ikimenyetso",
    starred: "Byakunzwe",
    searchMessages:
      "Shakisha ukurikije izina, imeri cyangwa ibiri mu butumwa...",
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
    composeMessage: "Andika Ubutumwa",
    newMessage: "Ubutumwa Bushya",
    createMessage: "Kora Ubutumwa",
    messageCreated: "Ubutumwa bwakozwe neza!",
    createFailed: "Kora ubutumwa birananiranye",
    markAsRead: "Shyira nk'Uwasomye",
    markAsUnread: "Shyira nk'Utarasomye",
    toggleStar: "Hindura Ibyakunzwe",
    toggleFlag: "Hindura Ikimenyetso",
    archive: "Bika",
    unarchive: "Kuraho mu bibitswe",
    labels: "Ibyiciro",
    tags: "Ibimenyetso",
    addLabel: "Ongeraho Icyiciro",
    addTag: "Ongeraho Ikimenyetso",
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
    noImage: "Nta shusho yashyizweho",
    viewImage: "Reba Ishusho",
    loading: "Birakoreshwa...",
    fetchError: "Kubura ubutumwa birananiranye",
    replyTo: "Subiza kuri",
    nameRequired: "Izina rirasabwa",
    nameMinLength: "Izina rigomba kuba ibinyuguti 2 byibuze",
    emailRequired: "Imeri irasabwa",
    emailInvalid: "Andika imeri ikwiye",
    messageRequired: "Ubutumwa burasabwa",
    messageMinLength: "Ubutumwa bugomba kuba ibinyuguti 10 byibuze",
    messageMaxLength: "Ubutumwa ntibugomba kurenga ibinyuguti 1000",
    allFieldsValid: "Ibice byose birimo amakuru akwiye!",
    pleaseFixErrors: "Kosora amakosa hejuru",
    noUserEmail: "Nta imeri y'umukoresha yabonetse. Nyamuneka winjire undi munsi.",
  },
};

// Helper function to get language from cookies
const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
  const lang = Cookies.get("language") as "en" | "fr" | "rw";
  return lang || "en";
};

// Helper function to get user email from localStorage
const getUserEmailFromStorage = (): string => {
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

// Helper function to transform contact to message
const transformContactToMessage = (contact: Contact): Message => {
  const messageText = contact.message || "";

  const msgLower = messageText.toLowerCase();

  // Determine category
  let category: Message["category"] = "general";

  if (
    msgLower.includes("support") ||
    msgLower.includes("help") ||
    msgLower.includes("assist")
  ) {
    category = "support";
  } else if (
    msgLower.includes("book") ||
    msgLower.includes("reserv") ||
    msgLower.includes("housing") ||
    msgLower.includes("house")
  ) {
    category = "booking";
  } else if (
    msgLower.includes("pay") ||
    msgLower.includes("momo") ||
    msgLower.includes("money")
  ) {
    category = "payment";
  } else if (
    msgLower.includes("complaint") ||
    msgLower.includes("issue") ||
    msgLower.includes("problem") ||
    msgLower.includes("report")
  ) {
    category = "complaint";
  } else if (
    msgLower.includes("feedback") ||
    msgLower.includes("suggest") ||
    msgLower.includes("great") ||
    msgLower.includes("good")
  ) {
    category = "feedback";
  }

  // Determine priority
  let priority: Message["priority"] = "medium";

  if (contact.status === "pending") {
    priority = "high";
  }

  if (
    msgLower.includes("urgent") ||
    msgLower.includes("emergency") ||
    msgLower.includes("immediate")
  ) {
    priority = "urgent";
  }

  // Labels and tags
  const labels: string[] = [];
  const tags: string[] = [];

  if (
    msgLower.includes("housing") ||
    msgLower.includes("house") ||
    msgLower.includes("apartment")
  ) {
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
    id: contact._id,
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

// Helper function to transform message to contact for API
const transformMessageToContact = (message: MessageFormData): any => {
  return {
    name: message.name,
    email: message.email,
    message: message.message,
  };
};

export const UserMessageManagement: React.FC = () => {
  // Get language from cookies
  const [lang, setLang] = useState<"en" | "fr" | "rw">(
    getLanguageFromCookies(),
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");

  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  // Compose form state
  const [formData, setFormData] = useState<MessageFormData>({
    name: "",
    email: "",
    message: "",
    status: "pending",
  });

  // Form validation
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<{
    name: boolean;
    email: boolean;
    message: boolean;
  }>({
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
    pending: 0,
    read: 0,
    replied: 0,
    archived: 0,
    flagged: 0,
    starred: 0,
  });

  const t = translations[lang];

  // Get user email from localStorage
  const userEmail = getUserEmailFromStorage();
  const userName = getUserNameFromStorage();

  // Initialize form with user data
  useEffect(() => {
    if (userName) {
      setFormData(prev => ({ ...prev, name: userName }));
    }
    if (userEmail) {
      setFormData(prev => ({ ...prev, email: userEmail }));
    }
  }, [userName, userEmail]);

  // Validation functions
  const validateName = (name: string): string | undefined => {
    if (!name || name.trim() === "") {
      return t.nameRequired;
    }
    if (name.trim().length < 2) {
      return t.nameMinLength;
    }
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email || email.trim() === "") {
      return t.emailRequired;
    }
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email.trim())) {
      return t.emailInvalid;
    }
    return undefined;
  };

  const validateMessage = (message: string): string | undefined => {
    if (!message || message.trim() === "") {
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
  const handleFieldBlur = (field: "name" | "email" | "message") => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
    validateForm();
  };

  // Handle field change with validation
  const handleFieldChange = (field: keyof MessageFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Validate the specific field
    let error: string | undefined;
    if (field === "name") error = validateName(value);
    else if (field === "email") error = validateEmail(value);
    else if (field === "message") error = validateMessage(value);

    setFormErrors((prev) => ({ ...prev, [field]: error }));

    // Update form validity
    const nameError = field === "name" ? error : validateName(formData.name);
    const emailError =
      field === "email" ? error : validateEmail(formData.email);
    const messageError =
      field === "message" ? error : validateMessage(formData.message);

    const valid = !nameError && !emailError && !messageError;
    setIsFormValid(valid);
  };

  // Fetch messages by user email - GET /contact/email/:email
  const fetchMessages = async () => {
    setIsFetching(true);
    try {
      const currentEmail = getUserEmailFromStorage();
      
      if (!currentEmail) {
        toast.error(`❌ ${t.noUserEmail}`);
        setIsFetching(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/contact/email/${encodeURIComponent(currentEmail)}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setMessages([]);
          setIsFetching(false);
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();

      // Handle both array and single object responses
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
          const possibleArrays = Object.values(data).filter((val) =>
            Array.isArray(val),
          );
          if (possibleArrays.length > 0) {
            contacts = possibleArrays[0];
          }
        }
      }

      // Transform API data to Message format
      const transformedMessages = contacts.map((contact: Contact) =>
        transformContactToMessage(contact),
      );
      setMessages(transformedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
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
    fetchMessages();
  }, []);

  // Filter messages
  useEffect(() => {
    let filtered = [...messages];

    // Search filter
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

    // Status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter((msg) => msg.status === filterStatus);
    }

    // Category filter
    if (filterCategory !== "all") {
      filtered = filtered.filter((msg) => msg.category === filterCategory);
    }

    // Priority filter
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

  // CRUD Operations
  const handleCreateMessage = async () => {
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
      const contactData = transformMessageToContact(formData);

      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to submit contact form");
      }

      if (!result.data) {
        throw new Error("Invalid response from server");
      }

      const newMessage = transformContactToMessage(result.data);
      setMessages((prev) => [newMessage, ...prev]);

      toast.success(`✅ ${t.messageCreated}`);

      resetForm();
      setIsComposeModalOpen(false);
    } catch (error) {
      console.error("Create message error:", error);
      toast.error(`❌ ${t.createFailed}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMessage = async () => {
    if (!selectedMessage) return;

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/contact/${selectedMessage._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedMessages = messages.filter(
        (m) => m._id !== selectedMessage._id,
      );
      setMessages(updatedMessages);

      toast.success(`✅ ${t.messageDeleted}`);
      setIsDeleteModalOpen(false);
      setSelectedMessage(null);
    } catch (error) {
      toast.error(`❌ ${t.deleteFailed}`);
      console.error("Delete message error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendReply = async () => {
    if (!selectedMessage || !replyContent.trim()) {
      toast.warning("⚠️ Please enter a reply");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/contact/${selectedMessage._id}/reply`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          replyMessage: replyContent,
          status: selectedStatus || "replied",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedContact = await response.json();
      const updatedMessage = transformContactToMessage(updatedContact);

      const updatedMessages = messages.map((m) =>
        m._id === selectedMessage._id ? updatedMessage : m,
      );
      setMessages(updatedMessages);

      toast.success(`✅ ${t.replySent}`);
      setIsReplyModalOpen(false);
      setSelectedMessage(null);
      setReplyContent("");
    } catch (error) {
      toast.error(`❌ ${t.replyFailed}`);
      console.error("Reply error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStatus = async (
    messageId: string,
    newStatus: Message["status"],
  ) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/${messageId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedContact = await response.json();
      const updatedMessage = transformContactToMessage(updatedContact);

      const updatedMessages = messages.map((m) =>
        m._id === messageId ? updatedMessage : m,
      );
      setMessages(updatedMessages);

      toast.success(`✅ ${t.statusUpdated}`);
    } catch (error) {
      toast.error(`❌ ${t.statusUpdateFailed}`);
      console.error("Status update error:", error);
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
      const response = await fetch(`${API_BASE_URL}/contact/${messageId}/read`, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedContact = await response.json();
      const updatedMessage = transformContactToMessage(updatedContact);

      const updatedMessages = messages.map((m) =>
        m._id === messageId ? updatedMessage : m,
      );
      setMessages(updatedMessages);
    } catch (error) {
      console.error("Mark as read error:", error);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: userName || "",
      email: userEmail || "",
      message: "",
      status: "pending",
      replyMessage: "",
    });
    setFormErrors({});
    setTouchedFields({
      name: false,
      email: false,
      message: false,
    });
    setIsFormValid(false);
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
    setIsDeleteModalOpen(true);
  };

  const openComposeModal = () => {
    resetForm();
    setIsComposeModalOpen(true);
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
              <MessageIcon className="w-7 h-7 text-[#FF385C]" />
              {t.messageManagement}
            </h1>
            <p className="text-sm text-gray-500 mt-1">{t.manageMessages}</p>
            {userEmail && (
              <p className="text-xs text-gray-400 mt-1">Messages for: {userEmail}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={openComposeModal}
              className="px-4 py-2 bg-[#FF385C] text-white rounded-lg text-sm font-medium hover:bg-[#E31C5F] transition-colors flex items-center gap-2"
            >
              <AddIcon className="w-4 h-4" />
              {t.composeMessage}
            </motion.button>
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
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white rounded-xl p-3 shadow-sm border border-gray-200"
        >
          <p className="text-xs text-gray-500">{t.total}</p>
          <p className="text-xl font-bold text-gray-900">{stats.total}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-yellow-50 rounded-xl p-3 shadow-sm border border-yellow-200"
        >
          <p className="text-xs text-yellow-600">{t.pending}</p>
          <p className="text-xl font-bold text-yellow-700">{stats.pending}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-blue-50 rounded-xl p-3 shadow-sm border border-blue-200"
        >
          <p className="text-xs text-blue-600">{t.read}</p>
          <p className="text-xl font-bold text-blue-700">{stats.read}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-green-50 rounded-xl p-3 shadow-sm border border-green-200"
        >
          <p className="text-xs text-green-600">{t.replied}</p>
          <p className="text-xl font-bold text-green-700">{stats.replied}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-gray-50 rounded-xl p-3 shadow-sm border border-gray-200"
        >
          <p className="text-xs text-gray-500">{t.archived}</p>
          <p className="text-xl font-bold text-gray-900">{stats.archived}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-red-50 rounded-xl p-3 shadow-sm border border-red-200"
        >
          <p className="text-xs text-red-600">{t.flagged}</p>
          <p className="text-xl font-bold text-red-700">{stats.flagged}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-purple-50 rounded-xl p-3 shadow-sm border border-purple-200"
        >
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
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-gray-500"
                  >
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
                          <p
                            className={`text-sm ${!message.isRead ? "font-semibold text-gray-900" : "text-gray-900"}`}
                          >
                            {message.subject}
                          </p>
                          <p className="text-xs text-gray-500 truncate md:hidden">
                            {message.senderName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-sm text-gray-600">
                        {message.senderName}
                      </p>
                      <p className="text-xs text-gray-400">
                        {message.senderEmail}
                      </p>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${getCategoryColor(message.category)}`}
                      >
                        {message.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${getPriorityColor(message.priority)}`}
                      >
                        {message.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(message.status)}`}
                      >
                        {getStatusLabel(message.status)}
                      </span>
                      {!message.isRead && (
                        <span className="ml-1 w-2 h-2 inline-block bg-blue-500 rounded-full"></span>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <p className="text-sm text-gray-600">
                        {formatDate(message.createdAt)}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
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
                          className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
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
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
            {t.showing} {filteredMessages.length} {t.of} {messages.length}{" "}
            {t.messages}
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
                    <h2 className="text-xl font-semibold text-gray-900">
                      {t.messageDetails}
                    </h2>
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
                  {/* Message Header */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.senderName}
                      </label>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {selectedMessage.senderName}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.senderEmail}
                      </label>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {selectedMessage.senderEmail}
                      </p>
                    </div>
                  </div>

                  {selectedMessage.ipAddress && (
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        IP Address
                      </label>
                      <p className="text-sm text-gray-600 mt-1">
                        {selectedMessage.ipAddress}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.subject}
                      </label>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {selectedMessage.subject}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.category}
                      </label>
                      <p className="mt-1">
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full ${getCategoryColor(selectedMessage.category)}`}
                        >
                          {selectedMessage.category}
                        </span>
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.priority}
                      </label>
                      <p className="mt-1">
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full ${getPriorityColor(selectedMessage.priority)}`}
                        >
                          {selectedMessage.priority}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      {t.messageContent}
                    </label>
                    <div className="mt-1 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {selectedMessage.message}
                      </p>
                    </div>
                  </div>

                  {/* Labels & Tags */}
                  {selectedMessage.labels &&
                    selectedMessage.labels.length > 0 && (
                      <div>
                        <label className="text-xs font-medium text-gray-500">
                          {t.labels}
                        </label>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {selectedMessage.labels.map((label) => (
                            <span
                              key={label}
                              className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs"
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {selectedMessage.tags && selectedMessage.tags.length > 0 && (
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.tags}
                      </label>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {selectedMessage.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reply Section */}
                  {selectedMessage.replyMessage && (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <label className="text-xs font-medium text-gray-500">
                        {t.replyLabel}
                      </label>
                      <div className="mt-1 p-3 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">
                          {selectedMessage.replyMessage}
                        </p>
                        {selectedMessage.repliedBy && (
                          <p className="text-xs text-gray-500 mt-2">
                            Replied by: {selectedMessage.repliedBy} on{" "}
                            {formatDate(selectedMessage.repliedAt || "")}
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
                        const newStatus =
                          selectedMessage.status === "archived"
                            ? "read"
                            : "archived";
                        handleUpdateStatus(
                          selectedMessage._id,
                          newStatus as Message["status"],
                        );
                        setIsViewModalOpen(false);
                      }}
                      className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      {selectedMessage.status === "archived" ? (
                        <UnarchiveIcon className="w-4 h-4" />
                      ) : (
                        <ArchiveIcon className="w-4 h-4" />
                      )}
                      {selectedMessage.status === "archived"
                        ? t.unarchive
                        : t.archive}
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
                  {/* Original Message Preview */}
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-700">From:</span>{" "}
                      {selectedMessage.senderName} (
                      {selectedMessage.senderEmail})
                    </p>
                    <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                      {selectedMessage.message}
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
                      <option value="pending">{t.pending}</option>
                      <option value="read">{t.read}</option>
                      <option value="replied">{t.replied}</option>
                      <option value="archived">{t.archived}</option>
                    </select>
                  </div>

                  {/* Reply Content */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.replyLabel}
                    </label>
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

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && selectedMessage && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedMessage(null);
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
                    {t.deleteMessage}
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
                        setSelectedMessage(null);
                      }}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      {t.cancel}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDeleteMessage}
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

      {/* Compose Message Modal */}
      <AnimatePresence>
        {isComposeModalOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => {
                setIsComposeModalOpen(false);
                resetForm();
              }}
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
                    <SendIcon className="text-[#FF385C] w-5 h-5" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      {t.newMessage}
                    </h2>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setIsComposeModalOpen(false);
                      resetForm();
                    }}
                    className="p-1.5 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="p-6 space-y-4">
                  {/* Form Validation Status */}
                  {isFormValid &&
                    touchedFields.name &&
                    touchedFields.email &&
                    touchedFields.message && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                        <CheckCircleIcon className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-green-700 font-medium">
                          {t.allFieldsValid}
                        </span>
                      </div>
                    )}

                  {!isFormValid &&
                    (touchedFields.name ||
                      touchedFields.email ||
                      touchedFields.message) && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                        <ErrorIcon className="w-5 h-5 text-red-600" />
                        <span className="text-sm text-red-700 font-medium">
                          {t.pleaseFixErrors}
                        </span>
                      </div>
                    )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.senderName} *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            handleFieldChange("name", e.target.value)
                          }
                          onBlur={() => handleFieldBlur("name")}
                          className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm transition-colors ${
                            touchedFields.name && formErrors.name
                              ? "border-red-500 bg-red-50"
                              : touchedFields.name &&
                                  !formErrors.name &&
                                  formData.name
                                ? "border-green-500 bg-green-50"
                                : "border-gray-300"
                          }`}
                          placeholder="John Doe"
                        />
                        {touchedFields.name &&
                          !formErrors.name &&
                          formData.name && (
                            <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                          )}
                        {touchedFields.name && formErrors.name && (
                          <ErrorIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                        )}
                      </div>
                      {touchedFields.name && formErrors.name && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <ErrorIcon className="w-3 h-3" />
                          {formErrors.name}
                        </p>
                      )}
                      {touchedFields.name &&
                        !formErrors.name &&
                        formData.name && (
                          <p className="mt-1 text-xs text-green-600 flex items-center gap-1">
                            <CheckCircleIcon className="w-3 h-3" />
                            Valid
                          </p>
                        )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.senderEmail} *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleFieldChange("email", e.target.value)
                          }
                          onBlur={() => handleFieldBlur("email")}
                          className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm transition-colors ${
                            touchedFields.email && formErrors.email
                              ? "border-red-500 bg-red-50"
                              : touchedFields.email &&
                                  !formErrors.email &&
                                  formData.email
                                ? "border-green-500 bg-green-50"
                                : "border-gray-300"
                          }`}
                          placeholder="you@example.com"
                        />
                        {touchedFields.email &&
                          !formErrors.email &&
                          formData.email && (
                            <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                          )}
                        {touchedFields.email && formErrors.email && (
                          <ErrorIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                        )}
                      </div>
                      {touchedFields.email && formErrors.email && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <ErrorIcon className="w-3 h-3" />
                          {formErrors.email}
                        </p>
                      )}
                      {touchedFields.email &&
                        !formErrors.email &&
                        formData.email && (
                          <p className="mt-1 text-xs text-green-600 flex items-center gap-1">
                            <CheckCircleIcon className="w-3 h-3" />
                            Valid
                          </p>
                        )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.content} *
                    </label>
                    <div className="relative">
                      <textarea
                        value={formData.message}
                        onChange={(e) =>
                          handleFieldChange("message", e.target.value)
                        }
                        onBlur={() => handleFieldBlur("message")}
                        rows={5}
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none transition-colors ${
                          touchedFields.message && formErrors.message
                            ? "border-red-500 bg-red-50"
                            : touchedFields.message &&
                                !formErrors.message &&
                                formData.message
                              ? "border-green-500 bg-green-50"
                              : "border-gray-300"
                        }`}
                        placeholder="Type your message here..."
                      />
                      {touchedFields.message &&
                        !formErrors.message &&
                        formData.message && (
                          <CheckCircleIcon className="absolute right-3 top-3 w-5 h-5 text-green-500" />
                        )}
                      {touchedFields.message && formErrors.message && (
                        <ErrorIcon className="absolute right-3 top-3 w-5 h-5 text-red-500" />
                      )}
                    </div>
                    {touchedFields.message && formErrors.message && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <ErrorIcon className="w-3 h-3" />
                        {formErrors.message}
                      </p>
                    )}
                    {touchedFields.message &&
                      !formErrors.message &&
                      formData.message && (
                        <p className="mt-1 text-xs text-green-600 flex items-center gap-1">
                          <CheckCircleIcon className="w-3 h-3" />
                          Valid ({formData.message.length}/1000 characters)
                        </p>
                      )}
                    <p className="mt-1 text-xs text-gray-400 text-right">
                      {formData.message.length}/1000 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.status}
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as Message["status"],
                        })
                      }
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                    >
                      <option value="pending">{t.pending}</option>
                      <option value="read">{t.read}</option>
                      <option value="replied">{t.replied}</option>
                      <option value="archived">{t.archived}</option>
                    </select>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCreateMessage}
                      disabled={isSubmitting || !isFormValid}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 ${
                        isSubmitting || !isFormValid
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
                          {t.createMessage}
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsComposeModalOpen(false);
                        resetForm();
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