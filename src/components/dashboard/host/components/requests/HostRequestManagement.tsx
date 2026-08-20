// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable react-hooks/purity */
// /* eslint-disable react-hooks/set-state-in-effect */
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Cookies from 'js-cookie';

// // Types
// interface HostRequest {
//   id: string;
//   propertyId: string;
//   propertyName: string;
//   guestId: string;
//   guestName: string;
//   guestEmail: string;
//   guestPhone?: string;
//   subject: string;
//   message: string;
//   category: 'maintenance' | 'cleaning' | 'issue' | 'inquiry' | 'feedback' | 'emergency' | 'general';
//   priority: 'low' | 'medium' | 'high' | 'urgent';
//   status: 'pending' | 'reviewing' | 'in_progress' | 'resolved' | 'rejected' | 'archived';
//   image?: {
//     name: string;
//     size: number;
//     type: string;
//     dataUrl: string;
//   };
//   createdAt: string;
//   updatedAt: string;
//   response?: string;
//   respondedBy?: string;
//   respondedAt?: string;
//   assignedTo?: string;
//   resolutionNotes?: string;
//   relatedBookingId?: string;
//   tags: string[];
//   metadata: {
//     ipAddress?: string;
//     userAgent?: string;
//     pageUrl?: string;
//   };
// }

// interface RequestFormData {
//   propertyId: string;
//   propertyName: string;
//   guestName: string;
//   guestEmail: string;
//   guestPhone: string;
//   subject: string;
//   message: string;
//   category: HostRequest['category'];
//   priority: HostRequest['priority'];
//   status: HostRequest['status'];
//   image?: File | null;
//   imagePreview?: string;
//   tags: string[];
//   relatedBookingId?: string;
// }

// // Translations
// const translations = {
//   en: {
//     hostRequests: 'Host Requests',
//     manageRequests: 'Manage support requests and issues from guests',
//     total: 'Total',
//     pending: 'Pending',
//     reviewing: 'Reviewing',
//     inProgress: 'In Progress',
//     resolved: 'Resolved',
//     rejected: 'Rejected',
//     archived: 'Archived',
//     searchRequests: 'Search by guest, property, or subject...',
//     allStatus: 'All Status',
//     allCategories: 'All Categories',
//     allPriorities: 'All Priorities',
//     request: 'Request',
//     guest: 'Guest',
//     property: 'Property',
//     subject: 'Subject',
//     category: 'Category',
//     priority: 'Priority',
//     status: 'Status',
//     submitted: 'Submitted',
//     actions: 'Actions',
//     noRequests: 'No requests found',
//     adjustFilters: 'Try adjusting your search or filters',
//     showing: 'Showing',
//     of: 'of',
//     requests: 'requests',
//     viewRequest: 'View Request',
//     respond: 'Respond',
//     deleteRequest: 'Delete Request',
//     deleteConfirmation: 'Are you sure you want to delete this request?',
//     actionUndone: 'This action cannot be undone.',
//     cancel: 'Cancel',
//     delete: 'Delete',
//     deleting: 'Deleting...',
//     requestDeleted: 'Request deleted successfully!',
//     deleteFailed: 'Failed to delete request',
//     statusUpdated: 'Request status updated successfully!',
//     statusUpdateFailed: 'Failed to update request status',
//     responseSent: 'Response sent successfully!',
//     responseFailed: 'Failed to send response',
//     requestDetails: 'Request Details',
//     guestName: 'Guest Name',
//     guestEmail: 'Guest Email',
//     guestPhone: 'Guest Phone',
//     propertyName: 'Property Name',
//     requestMessage: 'Request Message',
//     attachedImage: 'Attached Image',
//     responseLabel: 'Response',
//     sendResponse: 'Send Response',
//     updateStatus: 'Update Status',
//     selectStatus: 'Select Status',
//     responsePlaceholder: 'Type your response here...',
//     noImage: 'No image attached',
//     viewImage: 'View Image',
//     close: 'Close',
//     send: 'Send',
//     sending: 'Sending...',
//     composeRequest: 'Compose Request',
//     newRequest: 'New Request',
//     createRequest: 'Create Request',
//     requestCreated: 'Request created successfully!',
//     createFailed: 'Failed to create request',
//     markAsRead: 'Mark as Read',
//     markAsUnread: 'Mark as Unread',
//     toggleStar: 'Toggle Star',
//     toggleFlag: 'Toggle Flag',
//     archive: 'Archive',
//     unarchive: 'Unarchive',
//     labels: 'Labels',
//     tags: 'Tags',
//     addLabel: 'Add Label',
//     addTag: 'Add Tag',
//     general: 'General',
//     maintenance: 'Maintenance',
//     cleaning: 'Cleaning',
//     issue: 'Issue',
//     inquiry: 'Inquiry',
//     feedback: 'Feedback',
//     emergency: 'Emergency',
//     other: 'Other',
//     low: 'Low',
//     medium: 'Medium',
//     high: 'High',
//     urgent: 'Urgent',
//     all: 'All',
//     selectCategory: 'Select Category',
//     selectPriority: 'Select Priority',
//     selectProperty: 'Select Property',
//     relatedBooking: 'Related Booking',
//     assignedTo: 'Assigned To',
//     resolutionNotes: 'Resolution Notes',
//     permissions: {
//       cannotEdit: 'You cannot edit this request',
//       cannotDelete: 'You cannot delete this request',
//     },
//   },
//   fr: {
//     hostRequests: 'Demandes des Hôtes',
//     manageRequests: 'Gérer les demandes de support et les problèmes des invités',
//     total: 'Total',
//     pending: 'En Attente',
//     reviewing: 'En Révision',
//     inProgress: 'En Cours',
//     resolved: 'Résolu',
//     rejected: 'Rejeté',
//     archived: 'Archivé',
//     searchRequests: 'Rechercher par invité, propriété ou sujet...',
//     allStatus: 'Tous les Statuts',
//     allCategories: 'Toutes les Catégories',
//     allPriorities: 'Toutes les Priorités',
//     request: 'Demande',
//     guest: 'Invité',
//     property: 'Propriété',
//     subject: 'Sujet',
//     category: 'Catégorie',
//     priority: 'Priorité',
//     status: 'Statut',
//     submitted: 'Soumis',
//     actions: 'Actions',
//     noRequests: 'Aucune demande trouvée',
//     adjustFilters: 'Essayez d\'ajuster votre recherche ou vos filtres',
//     showing: 'Affichage',
//     of: 'de',
//     requests: 'demandes',
//     viewRequest: 'Voir la Demande',
//     respond: 'Répondre',
//     deleteRequest: 'Supprimer la Demande',
//     deleteConfirmation: 'Êtes-vous sûr de vouloir supprimer cette demande ?',
//     actionUndone: 'Cette action est irréversible.',
//     cancel: 'Annuler',
//     delete: 'Supprimer',
//     deleting: 'Suppression...',
//     requestDeleted: 'Demande supprimée avec succès !',
//     deleteFailed: 'Échec de la suppression de la demande',
//     statusUpdated: 'Statut de la demande mis à jour avec succès !',
//     statusUpdateFailed: 'Échec de la mise à jour du statut',
//     responseSent: 'Réponse envoyée avec succès !',
//     responseFailed: 'Échec de l\'envoi de la réponse',
//     requestDetails: 'Détails de la Demande',
//     guestName: 'Nom de l\'Invité',
//     guestEmail: 'Email de l\'Invité',
//     guestPhone: 'Téléphone de l\'Invité',
//     propertyName: 'Nom de la Propriété',
//     requestMessage: 'Message de la Demande',
//     attachedImage: 'Image Jointe',
//     responseLabel: 'Réponse',
//     sendResponse: 'Envoyer la Réponse',
//     updateStatus: 'Mettre à Jour le Statut',
//     selectStatus: 'Sélectionner le Statut',
//     responsePlaceholder: 'Tapez votre réponse ici...',
//     noImage: 'Aucune image jointe',
//     viewImage: 'Voir l\'Image',
//     close: 'Fermer',
//     send: 'Envoyer',
//     sending: 'Envoi en cours...',
//     composeRequest: 'Composer une Demande',
//     newRequest: 'Nouvelle Demande',
//     createRequest: 'Créer une Demande',
//     requestCreated: 'Demande créée avec succès !',
//     createFailed: 'Échec de la création de la demande',
//     markAsRead: 'Marquer comme Lu',
//     markAsUnread: 'Marquer comme Non Lu',
//     toggleStar: 'Basculer Favori',
//     toggleFlag: 'Basculer Signalement',
//     archive: 'Archiver',
//     unarchive: 'Désarchiver',
//     labels: 'Étiquettes',
//     tags: 'Tags',
//     addLabel: 'Ajouter une Étiquette',
//     addTag: 'Ajouter un Tag',
//     general: 'Général',
//     maintenance: 'Entretien',
//     cleaning: 'Nettoyage',
//     issue: 'Problème',
//     inquiry: 'Demande',
//     feedback: 'Avis',
//     emergency: 'Urgence',
//     other: 'Autre',
//     low: 'Faible',
//     medium: 'Moyen',
//     high: 'Élevé',
//     urgent: 'Urgent',
//     all: 'Tous',
//     selectCategory: 'Sélectionner une Catégorie',
//     selectPriority: 'Sélectionner une Priorité',
//     selectProperty: 'Sélectionner une Propriété',
//     relatedBooking: 'Réservation Associée',
//     assignedTo: 'Assigné à',
//     resolutionNotes: 'Notes de Résolution',
//     permissions: {
//       cannotEdit: 'Vous ne pouvez pas modifier cette demande',
//       cannotDelete: 'Vous ne pouvez pas supprimer cette demande',
//     },
//   },
//   rw: {
//     hostRequests: 'Ibyifuzo by\'Abatambyi',
//     manageRequests: 'Gucunga ibyifuzo n\'ibibazo by\'abashyitsi',
//     total: 'Yose',
//     pending: 'Bitegereje',
//     reviewing: 'Birisuzumwa',
//     inProgress: 'Birakomeza',
//     resolved: 'Byakemutse',
//     rejected: 'Byangijwe',
//     archived: 'Byabitswe',
//     searchRequests: 'Shakisha ukurikije umushyitsi, inzu cyangwa ikiganiro...',
//     allStatus: 'Ihagaze Ryose',
//     allCategories: 'Ibyiciro Byose',
//     allPriorities: 'Iby\'ibanze Byose',
//     request: 'Icyifuzo',
//     guest: 'Umushyitsi',
//     property: 'Inzu',
//     subject: 'Ikiganiro',
//     category: 'Icyiciro',
//     priority: 'Iby\'ibanze',
//     status: 'Ihagaze',
//     submitted: 'Byoherejwe',
//     actions: 'Ibikorwa',
//     noRequests: 'Nta cyifuzo cyabonetse',
//     adjustFilters: 'Gerageza guhindura uburyo ushakisha cyangwa amatungo',
//     showing: 'Bereka',
//     of: 'muri',
//     requests: 'ibyifuzo',
//     viewRequest: 'Reba Icyifuzo',
//     respond: 'Subiza',
//     deleteRequest: 'Kuraho Icyifuzo',
//     deleteConfirmation: 'Uri kwizera ko ushaka gukuraho iki cyifuzo?',
//     actionUndone: 'Iki gikorwa ntikishobora guhindurwa.',
//     cancel: 'Reka',
//     delete: 'Kuraho',
//     deleting: 'Birakurwaho...',
//     requestDeleted: 'Icyifuzo cyakuweho neza!',
//     deleteFailed: 'Kuraho icyifuzo birananiranye',
//     statusUpdated: 'Ihagaze ry\'icyifuzo ryavuguruwe neza!',
//     statusUpdateFailed: 'Kuvugurura ihagaze birananiranye',
//     responseSent: 'Igisubizo cyoherejwe neza!',
//     responseFailed: 'Kohereza igisubizo birananiranye',
//     requestDetails: 'Ibisobanuro by\'Icyifuzo',
//     guestName: 'Izina ry\'Umushyitsi',
//     guestEmail: 'Imeri y\'Umushyitsi',
//     guestPhone: 'Telefone y\'Umushyitsi',
//     propertyName: 'Izina ry\'Inzu',
//     requestMessage: 'Ubutumwa bw\'Icyifuzo',
//     attachedImage: 'Ishusho Yashyizweho',
//     responseLabel: 'Igisubizo',
//     sendResponse: 'Ohereza Igisubizo',
//     updateStatus: 'Vugurura Ihagaze',
//     selectStatus: 'Hitamo Ihagaze',
//     responsePlaceholder: 'Andika igisubizo cyawe hano...',
//     noImage: 'Nta shusho yashyizweho',
//     viewImage: 'Reba Ishusho',
//     close: 'Funga',
//     send: 'Ohereza',
//     sending: 'Biremereza...',
//     composeRequest: 'Andika Icyifuzo',
//     newRequest: 'Icyifuzo Gishya',
//     createRequest: 'Kora Icyifuzo',
//     requestCreated: 'Icyifuzo cyakozwe neza!',
//     createFailed: 'Kora icyifuzo birananiranye',
//     markAsRead: 'Shyira nk\'Uwasomye',
//     markAsUnread: 'Shyira nk\'Utarasomye',
//     toggleStar: 'Hindura Ibyakunzwe',
//     toggleFlag: 'Hindura Ikimenyetso',
//     archive: 'Bika',
//     unarchive: 'Kuraho mu bibitswe',
//     labels: 'Ibyiciro',
//     tags: 'Ibimenyetso',
//     addLabel: 'Ongeraho Icyiciro',
//     addTag: 'Ongeraho Ikimenyetso',
//     general: 'Rusange',
//     maintenance: 'Ubwubatsi',
//     cleaning: 'Isuku',
//     issue: 'Ikibazo',
//     inquiry: 'Ikibazo',
//     feedback: 'Ibitekerezo',
//     emergency: 'Ibyihutirwa',
//     other: 'Ibindi',
//     low: 'Gito',
//     medium: 'Rishoboka',
//     high: 'Kinini',
//     urgent: 'Byihutirwa',
//     all: 'Byose',
//     selectCategory: 'Hitamo Icyiciro',
//     selectPriority: 'Hitamo Iby\'ibanze',
//     selectProperty: 'Hitamo Inzu',
//     relatedBooking: 'Icyemezo Gifitanye Isano',
//     assignedTo: 'Yahawe',
//     resolutionNotes: 'Ibisobanuro by\'Igisubizo',
//     permissions: {
//       cannotEdit: 'Ntushobora guhindura iki cyifuzo',
//       cannotDelete: 'Ntushobora gukuraho iki cyifuzo',
//     },
//   },
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
// const STORAGE_KEY_HOST_REQUESTS = 'host_requests';

// // Generate unique ID
// const generateId = (): string => {
//   return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
// };

// // Initial requests for host
// const getInitialRequests = (_hostEmail: string): HostRequest[] => {
//   return [
//     {
//       id: '1',
//       propertyId: 'prop_001',
//       propertyName: 'INES Ruhengeri Student Lodge',
//       guestId: 'guest_001', 
//       guestName: 'Jean Paul Mugisha',
//       guestEmail: 'jean@example.com',
//       guestPhone: '+250788123456',
//       subject: 'Maintenance issue - broken desk',
//       message: 'The desk in room 201 is broken and needs immediate repair. The leg is wobbly and it might collapse.',
//       category: 'maintenance',
//       priority: 'high',
//       status: 'pending',
//       createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
//       updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
//       tags: ['furniture', 'repair'],
//       metadata: {},
//     },
//     {
//       id: '2',
//       propertyId: 'prop_002',
//       propertyName: 'Kigombe Student Apartments',
//       guestId: 'guest_002',
//       guestName: 'Marie Claire Uwimana',
//       guestEmail: 'marie@example.com',
//       guestPhone: '+250788123457',
//       subject: 'Cleaning service request',
//       message: 'I would like to request a deep cleaning of the apartment before my check-in next week. Is this possible?',
//       category: 'cleaning',
//       priority: 'medium',
//       status: 'reviewing',
//       createdAt: new Date(Date.now() - 86400000).toISOString(),
//       updatedAt: new Date(Date.now() - 43200000).toISOString(),
//       response: 'Hi Marie, we have scheduled a deep cleaning for the day before your check-in. You will receive a confirmation shortly.',
//       respondedBy: 'Host Admin',
//       respondedAt: new Date(Date.now() - 43200000).toISOString(),
//       tags: ['cleaning', 'check-in'],
//       metadata: {},
//     },
//     {
//       id: '3',
//       propertyId: 'prop_001',
//       propertyName: 'INES Ruhengeri Student Lodge',
//       guestId: 'guest_003',
//       guestName: 'David Niyonzima',
//       guestEmail: 'david@example.com',
//       guestPhone: '+250788123458',
//       subject: 'Internet connectivity issues',
//       message: 'The WiFi has been unstable for the past two days. I need it for my online classes. Can you please fix this?',
//       category: 'issue',
//       priority: 'urgent',
//       status: 'in_progress',
//       createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
//       updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
//       response: 'We are aware of the issue and have contacted the ISP. They will be here today to fix it.',
//       respondedBy: 'Host Admin',
//       respondedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
//       tags: ['wifi', 'internet', 'urgent'],
//       metadata: {},
//     },
//     {
//       id: '4',
//       propertyId: 'prop_002',
//       propertyName: 'Kigombe Student Apartments',
//       guestId: 'guest_004',
//       guestName: 'Grace Uwase',
//       guestEmail: 'grace@example.com',
//       subject: 'Feedback about the apartment',
//       message: 'I really enjoyed my stay at your apartment. The location is perfect and the amenities are great. Thank you!',
//       category: 'feedback',
//       priority: 'low',
//       status: 'resolved',
//       createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
//       updatedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
//       response: 'Thank you for your wonderful feedback! We are glad you enjoyed your stay. You are welcome back anytime.',
//       respondedBy: 'Host Admin',
//       respondedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
//       tags: ['positive', 'review'],
//       metadata: {},
//     },
//     {
//       id: '5',
//       propertyId: 'prop_001',
//       propertyName: 'INES Ruhengeri Student Lodge',
//       guestId: 'guest_005',
//       guestName: 'Eric Kamanzi',
//       guestEmail: 'eric@example.com',
//       subject: 'Emergency - no hot water',
//       message: 'There is no hot water in the bathroom. This is urgent as I need to shower before my exam.',
//       category: 'emergency',
//       priority: 'urgent',
//       status: 'rejected',
//       createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
//       updatedAt: new Date(Date.now() - 43200000).toISOString(),
//       response: 'The water heater has been inspected and is working properly. Please check if the boiler is turned on.',
//       respondedBy: 'Host Admin',
//       respondedAt: new Date(Date.now() - 43200000).toISOString(),
//       tags: ['hot water', 'emergency'],
//       metadata: {},
//     },
//   ];
// };

// // Helper functions
// const getRequests = (hostEmail: string): HostRequest[] => {
//   const data = localStorage.getItem(STORAGE_KEY_HOST_REQUESTS);
//   if (data) {
//     return JSON.parse(data);
//   }
//   const initialRequests = getInitialRequests(hostEmail);
//   localStorage.setItem(STORAGE_KEY_HOST_REQUESTS, JSON.stringify(initialRequests));
//   return initialRequests;
// };

// const saveRequests = (requests: HostRequest[]): void => {
//   localStorage.setItem(STORAGE_KEY_HOST_REQUESTS, JSON.stringify(requests));
// };

// export const HostRequestManagement: React.FC = () => {
//   // Get language and user info from cookies
//   const [lang, setLang] = useState<'en' | 'fr' | 'rw'>(getLanguageFromCookies());
//   const userRole = getUserRole();
//   const userEmail = getUserEmail();
//   const userName = getUserName();
  
//   const [requests, setRequests] = useState<HostRequest[]>(getRequests(userEmail));
//   const [filteredRequests, setFilteredRequests] = useState<HostRequest[]>(getRequests(userEmail));
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState<string>('all');
//   const [filterCategory, setFilterCategory] = useState<string>('all');
//   const [filterPriority, setFilterPriority] = useState<string>('all');

//   // Modal states
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [isRespondModalOpen, setIsRespondModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
//   const [isImageModalOpen, setIsImageModalOpen] = useState(false);
//   const [selectedRequest, setSelectedRequest] = useState<HostRequest | null>(null);
//   const [responseText, setResponseText] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState<string>('');
//   const [resolutionNotes, setResolutionNotes] = useState('');

//   // Compose form state
//   const [formData, setFormData] = useState<RequestFormData>({
//     propertyId: '',
//     propertyName: '',
//     guestName: '',
//     guestEmail: '',
//     guestPhone: '',
//     subject: '',
//     message: '',
//     category: 'general',
//     priority: 'medium',
//     status: 'pending',
//     image: null,
//     imagePreview: '',
//     tags: [],
//     relatedBookingId: '',
//   });
//   const [tagInput, setTagInput] = useState('');

//   // Properties for dropdown
//   const [hostProperties] = useState<{id: string; name: string}[]>([
//     { id: 'prop_001', name: 'INES Ruhengeri Student Lodge' },
//     { id: 'prop_002', name: 'Kigombe Student Apartments' },
//   ]);

//   // Loading states
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Statistics
//   const [stats, setStats] = useState({
//     total: 0,
//     pending: 0,
//     reviewing: 0,
//     inProgress: 0,
//     resolved: 0,
//     rejected: 0,
//     archived: 0,
//     urgent: 0,
//   });

//   const t = translations[lang];
//   const isAdmin = userRole === 'admin';
//   const isHost = userRole === 'host' || isAdmin;

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

//   // Refresh requests
//   useEffect(() => {
//     const refreshed = getRequests(userEmail);
//     setRequests(refreshed);
//   }, [userEmail]);

//   // Filter requests
//   useEffect(() => {
//     let filtered = [...requests];

//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       filtered = filtered.filter(
//         (req) =>
//           req.subject.toLowerCase().includes(term) ||
//           req.guestName.toLowerCase().includes(term) ||
//           req.message.toLowerCase().includes(term) ||
//           req.guestEmail.toLowerCase().includes(term) ||
//           req.propertyName.toLowerCase().includes(term)
//       );
//     }

//     if (filterStatus !== 'all') {
//       filtered = filtered.filter((req) => req.status === filterStatus);
//     }

//     if (filterCategory !== 'all') {
//       filtered = filtered.filter((req) => req.category === filterCategory);
//     }

//     if (filterPriority !== 'all') {
//       filtered = filtered.filter((req) => req.priority === filterPriority);
//     }

//     setFilteredRequests(filtered);
//   }, [requests, searchTerm, filterStatus, filterCategory, filterPriority]);

//   // Update statistics
//   useEffect(() => {
//     const total = requests.length;
//     const pending = requests.filter((r) => r.status === 'pending').length;
//     const reviewing = requests.filter((r) => r.status === 'reviewing').length;
//     const inProgress = requests.filter((r) => r.status === 'in_progress').length;
//     const resolved = requests.filter((r) => r.status === 'resolved').length;
//     const rejected = requests.filter((r) => r.status === 'rejected').length;
//     const archived = requests.filter((r) => r.status === 'archived').length;
//     const urgent = requests.filter((r) => r.priority === 'urgent').length;

//     setStats({ total, pending, reviewing, inProgress, resolved, rejected, archived, urgent });
//   }, [requests]);

//   // Get status badge color
//   const getStatusColor = (status: string): string => {
//     switch (status) {
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'reviewing':
//         return 'bg-blue-100 text-blue-800';
//       case 'in_progress':
//         return 'bg-purple-100 text-purple-800';
//       case 'resolved':
//         return 'bg-green-100 text-green-800';
//       case 'rejected':
//         return 'bg-red-100 text-red-800';
//       case 'archived':
//         return 'bg-gray-100 text-gray-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   // Get status label
//   const getStatusLabel = (status: string): string => {
//     switch (status) {
//       case 'pending':
//         return t.pending;
//       case 'reviewing':
//         return t.reviewing;
//       case 'in_progress':
//         return t.inProgress;
//       case 'resolved':
//         return t.resolved;
//       case 'rejected':
//         return t.rejected;
//       case 'archived':
//         return t.archived;
//       default:
//         return status;
//     }
//   };

//   // Get category color
//   const getCategoryColor = (category: string): string => {
//     switch (category) {
//       case 'general':
//         return 'bg-gray-100 text-gray-800';
//       case 'maintenance':
//         return 'bg-blue-100 text-blue-800';
//       case 'cleaning':
//         return 'bg-green-100 text-green-800';
//       case 'issue':
//         return 'bg-purple-100 text-purple-800';
//       case 'inquiry':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'feedback':
//         return 'bg-indigo-100 text-indigo-800';
//       case 'emergency':
//         return 'bg-red-100 text-red-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   // Get priority color
//   const getPriorityColor = (priority: string): string => {
//     switch (priority) {
//       case 'low':
//         return 'bg-gray-100 text-gray-800';
//       case 'medium':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'high':
//         return 'bg-orange-100 text-orange-800';
//       case 'urgent':
//         return 'bg-red-100 text-red-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   // Format date
//   const formatDate = (dateString: string): string => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   // Handle file upload
//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (file.size > 5 * 1024 * 1024) {
//       toast.error('File size must be less than 5MB');
//       return;
//     }

//     const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
//     if (!allowedTypes.includes(file.type)) {
//       toast.error('Only JPG, PNG, GIF, and WebP images are allowed');
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

//   // CRUD Operations
//   const handleCreateRequest = async () => {
//     if (!formData.guestName || !formData.guestEmail || !formData.subject || !formData.message) {
//       toast.warning('Please fill in all required fields');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       const newRequest: HostRequest = {
//         id: generateId(),
//         propertyId: formData.propertyId,
//         propertyName: formData.propertyName || 'Unknown Property',
//         guestId: `guest_${Date.now()}`,
//         guestName: formData.guestName,
//         guestEmail: formData.guestEmail,
//         guestPhone: formData.guestPhone,
//         subject: formData.subject,
//         message: formData.message,
//         category: formData.category,
//         priority: formData.priority,
//         status: formData.status,
//         image: formData.image ? {
//           name: formData.image.name,
//           size: formData.image.size,
//           type: formData.image.type,
//           dataUrl: formData.imagePreview || '',
//         } : undefined,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//         tags: formData.tags,
//         relatedBookingId: formData.relatedBookingId,
//         metadata: {},
//       };

//       const updatedRequests = [newRequest, ...requests];
//       setRequests(updatedRequests);
//       saveRequests(updatedRequests);
      
//       toast.success(`✅ ${t.requestCreated}`);
//       resetForm();
//       setIsComposeModalOpen(false);
//     } catch (error) {
//       toast.error(`❌ ${t.createFailed}`);
//       console.error('Create request error:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDeleteRequest = async () => {
//     if (!selectedRequest) return;

//     setIsLoading(true);

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 800));

//       const updatedRequests = requests.filter((r) => r.id !== selectedRequest.id);
//       setRequests(updatedRequests);
//       saveRequests(updatedRequests);
      
//       toast.success(`🗑️ ${t.requestDeleted}`);
//       setIsDeleteModalOpen(false);
//       setSelectedRequest(null);
//     } catch (error) {
//       toast.error(`❌ ${t.deleteFailed}`);
//       console.error('Delete request error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSendResponse = async () => {
//     if (!selectedRequest || !responseText.trim()) {
//       toast.warning('Please enter a response');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       const updatedRequest: HostRequest = {
//         ...selectedRequest,
//         status: selectedStatus as HostRequest['status'] || 'resolved',
//         response: responseText,
//         respondedBy: userName || 'Host',
//         respondedAt: new Date().toISOString(),
//         resolutionNotes: resolutionNotes || '',
//         updatedAt: new Date().toISOString(),
//       };

//       const updatedRequests = requests.map((r) =>
//         r.id === selectedRequest.id ? updatedRequest : r
//       );
//       setRequests(updatedRequests);
//       saveRequests(updatedRequests);

//       toast.success(`✅ ${t.responseSent}`);
//       setIsRespondModalOpen(false);
//       setSelectedRequest(null);
//       setResponseText('');
//       setResolutionNotes('');
//     } catch (error) {
//       toast.error(`❌ ${t.responseFailed}`);
//       console.error('Response error:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleUpdateStatus = async (requestId: string, newStatus: HostRequest['status']) => {
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 500));

//       const updatedRequests = requests.map((r) =>
//         r.id === requestId
//           ? { ...r, status: newStatus, updatedAt: new Date().toISOString() }
//           : r
//       );
//       setRequests(updatedRequests);
//       saveRequests(updatedRequests);

//       toast.success(`✅ ${t.statusUpdated}`);
//     } catch (error) {
//       toast.error(`❌ ${t.statusUpdateFailed}`);
//       console.error('Status update error:', error);
//     }
//   };

//   // Reset form
//   const resetForm = () => {
//     setFormData({
//       propertyId: '',
//       propertyName: '',
//       guestName: '',
//       guestEmail: '',
//       guestPhone: '',
//       subject: '',
//       message: '',
//       category: 'general',
//       priority: 'medium',
//       status: 'pending',
//       image: null,
//       imagePreview: '',
//       tags: [],
//       relatedBookingId: '',
//     });
//     setTagInput('');
//   };

//   // Add tag
//   const addTag = () => {
//     if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
//       setFormData({
//         ...formData,
//         tags: [...formData.tags, tagInput.trim()],
//       });
//       setTagInput('');
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
//   const openViewModal = (request: HostRequest) => {
//     setSelectedRequest(request);
//     setIsViewModalOpen(true);
//   };

//   const openRespondModal = (request: HostRequest) => {
//     setSelectedRequest(request);
//     setResponseText(request.response || '');
//     setSelectedStatus(request.status);
//     setResolutionNotes(request.resolutionNotes || '');
//     setIsRespondModalOpen(true);
//   };

//   const openDeleteModal = (request: HostRequest) => {
//     setSelectedRequest(request);
//     setIsDeleteModalOpen(true);
//   };

//   const openComposeModal = () => {
//     resetForm();
//     setIsComposeModalOpen(true);
//   };

//   // Handle refresh
//   const handleRefresh = () => {
//     const refreshed = getRequests(userEmail);
//     setRequests(refreshed);
//     toast.success('Requests refreshed!');
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

//   if (!isHost) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <div className="text-center">
//           <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//           </svg>
//           <h2 className="text-xl font-semibold text-gray-700">Access Denied</h2>
//           <p className="text-gray-500">You need to be a host to access this page.</p>
//         </div>
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
//               <svg className="w-7 h-7 text-[#FF385C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
//               </svg>
//               {t.hostRequests}
//             </h1>
//             <p className="text-sm text-gray-500 mt-1">
//               {t.manageRequests}
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
//               {t.composeRequest}
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
//           <p className="text-xs text-blue-600">{t.reviewing}</p>
//           <p className="text-xl font-bold text-blue-700">{stats.reviewing}</p>
//         </motion.div>
//         <motion.div whileHover={{ y: -2 }} className="bg-purple-50 rounded-xl p-3 shadow-sm border border-purple-200">
//           <p className="text-xs text-purple-600">{t.inProgress}</p>
//           <p className="text-xl font-bold text-purple-700">{stats.inProgress}</p>
//         </motion.div>
//         <motion.div whileHover={{ y: -2 }} className="bg-green-50 rounded-xl p-3 shadow-sm border border-green-200">
//           <p className="text-xs text-green-600">{t.resolved}</p>
//           <p className="text-xl font-bold text-green-700">{stats.resolved}</p>
//         </motion.div>
//         <motion.div whileHover={{ y: -2 }} className="bg-red-50 rounded-xl p-3 shadow-sm border border-red-200">
//           <p className="text-xs text-red-600">{t.rejected}</p>
//           <p className="text-xl font-bold text-red-700">{stats.rejected}</p>
//         </motion.div>
//         <motion.div whileHover={{ y: -2 }} className="bg-gray-50 rounded-xl p-3 shadow-sm border border-gray-200">
//           <p className="text-xs text-gray-500">{t.archived}</p>
//           <p className="text-xl font-bold text-gray-900">{stats.archived}</p>
//         </motion.div>
//         <motion.div whileHover={{ y: -2 }} className="bg-red-50 rounded-xl p-3 shadow-sm border border-red-200">
//           <p className="text-xs text-red-600">{t.urgent}</p>
//           <p className="text-xl font-bold text-red-700">{stats.urgent}</p>
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
//               placeholder={t.searchRequests}
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
//               <option value="reviewing">{t.reviewing}</option>
//               <option value="in_progress">{t.inProgress}</option>
//               <option value="resolved">{t.resolved}</option>
//               <option value="rejected">{t.rejected}</option>
//               <option value="archived">{t.archived}</option>
//             </select>
//             <select
//               value={filterCategory}
//               onChange={(e) => setFilterCategory(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//             >
//               <option value="all">{t.allCategories}</option>
//               <option value="general">{t.general}</option>
//               <option value="maintenance">{t.maintenance}</option>
//               <option value="cleaning">{t.cleaning}</option>
//               <option value="issue">{t.issue}</option>
//               <option value="inquiry">{t.inquiry}</option>
//               <option value="feedback">{t.feedback}</option>
//               <option value="emergency">{t.emergency}</option>
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
//                 setSearchTerm('');
//                 setFilterStatus('all');
//                 setFilterCategory('all');
//                 setFilterPriority('all');
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
//                   {t.guest}
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
//                   {t.property}
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
//                   {t.category}
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
//                   <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
//                     <svg className="w-12 h-12 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
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
//                     className="hover:bg-gray-50 transition-colors cursor-pointer"
//                     onClick={() => openViewModal(request)}
//                   >
//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-3">
//                         <div className="flex-shrink-0">
//                           {request.image && (
//                             <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center">
//                               <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                               </svg>
//                             </div>
//                           )}
//                           {request.priority === 'urgent' && (
//                             <div className="absolute -top-1 -right-1">
//                               <span className="flex h-2 w-2">
//                                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//                                 <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
//                               </span>
//                             </div>
//                           )}
//                         </div>
//                         <div className="min-w-0">
//                           <p className="text-sm font-medium text-gray-900 truncate">
//                             {request.subject}
//                           </p>
//                           <p className="text-xs text-gray-500 truncate md:hidden">
//                             {request.guestName}
//                           </p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 hidden md:table-cell">
//                       <p className="text-sm text-gray-600">{request.guestName}</p>
//                       <p className="text-xs text-gray-400">{request.guestEmail}</p>
//                     </td>
//                     <td className="px-4 py-3 hidden lg:table-cell">
//                       <p className="text-sm text-gray-600">{request.propertyName}</p>
//                     </td>
//                     <td className="px-4 py-3 hidden lg:table-cell">
//                       <span className={`px-2 py-0.5 text-xs rounded-full ${getCategoryColor(request.category)}`}>
//                         {request.category}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex flex-col gap-1">
//                         <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(request.status)}`}>
//                           {getStatusLabel(request.status)}
//                         </span>
//                         {request.priority === 'urgent' && (
//                           <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-800 animate-pulse">
//                             {t.urgent}
//                           </span>
//                         )}
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 hidden lg:table-cell">
//                       <p className="text-sm text-gray-600">{formatDate(request.createdAt)}</p>
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex items-center justify-center gap-1">
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             openViewModal(request);
//                           }}
//                           className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                           title={t.viewRequest}
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
//                             openRespondModal(request);
//                           }}
//                           className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
//                           title={t.respond}
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
//                             openDeleteModal(request);
//                           }}
//                           className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                           title={t.deleteRequest}
//                         >
//                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                           </svg>
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
//             {t.showing} {filteredRequests.length} {t.of} {requests.length} {t.requests}
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
//               <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
//                 <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
//                   <div className="flex items-center gap-2">
//                     <svg className="w-5 h-5 text-[#FF385C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
//                     </svg>
//                     <h2 className="text-xl font-semibold text-gray-900">{t.requestDetails}</h2>
//                   </div>
//                   <motion.button
//                     whileHover={{ rotate: 90, scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => setIsViewModalOpen(false)}
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
//                       <label className="text-xs font-medium text-gray-500">{t.guestName}</label>
//                       <p className="text-sm font-medium text-gray-900 mt-1">{selectedRequest.guestName}</p>
//                     </div>
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">{t.guestEmail}</label>
//                       <p className="text-sm font-medium text-gray-900 mt-1">{selectedRequest.guestEmail}</p>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">{t.propertyName}</label>
//                       <p className="text-sm font-medium text-gray-900 mt-1">{selectedRequest.propertyName}</p>
//                     </div>
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">{t.category}</label>
//                       <p className="mt-1">
//                         <span className={`px-2 py-0.5 text-xs rounded-full ${getCategoryColor(selectedRequest.category)}`}>
//                           {selectedRequest.category}
//                         </span>
//                       </p>
//                     </div>
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">{t.priority}</label>
//                       <p className="mt-1">
//                         <span className={`px-2 py-0.5 text-xs rounded-full ${getPriorityColor(selectedRequest.priority)}`}>
//                           {selectedRequest.priority}
//                         </span>
//                       </p>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="text-xs font-medium text-gray-500">{t.subject}</label>
//                     <p className="text-sm font-semibold text-gray-900 mt-1">{selectedRequest.subject}</p>
//                   </div>

//                   <div>
//                     <label className="text-xs font-medium text-gray-500">{t.requestMessage}</label>
//                     <div className="mt-1 p-4 bg-gray-50 rounded-lg">
//                       <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedRequest.message}</p>
//                     </div>
//                   </div>

//                   {selectedRequest.image && (
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">{t.attachedImage}</label>
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

//                   {selectedRequest.tags.length > 0 && (
//                     <div>
//                       <label className="text-xs font-medium text-gray-500">{t.tags}</label>
//                       <div className="mt-1 flex flex-wrap gap-1">
//                         {selectedRequest.tags.map((tag) => (
//                           <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full text-xs">
//                             #{tag}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {selectedRequest.response && (
//                     <div className="border-t border-gray-200 pt-4 mt-4">
//                       <label className="text-xs font-medium text-gray-500">{t.responseLabel}</label>
//                       <div className="mt-1 p-3 bg-green-50 rounded-lg border border-green-200">
//                         <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedRequest.response}</p>
//                         {selectedRequest.respondedBy && (
//                           <p className="text-xs text-gray-500 mt-2">
//                             Responded by: {selectedRequest.respondedBy} on {formatDate(selectedRequest.respondedAt || '')}
//                           </p>
//                         )}
//                         {selectedRequest.resolutionNotes && (
//                           <p className="text-xs text-gray-500 mt-1">
//                             Resolution Notes: {selectedRequest.resolutionNotes}
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
//                         openRespondModal(selectedRequest);
//                       }}
//                       className="px-4 py-2.5 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors flex items-center gap-2"
//                     >
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
//                       </svg>
//                       {t.respond}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => {
//                         const newStatus = selectedRequest.status === 'archived' ? 'resolved' : 'archived';
//                         handleUpdateStatus(selectedRequest.id, newStatus as HostRequest['status']);
//                         setIsViewModalOpen(false);
//                       }}
//                       className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
//                     >
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
//                       </svg>
//                       {selectedRequest.status === 'archived' ? t.unarchive : t.archive}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => {
//                         setIsViewModalOpen(false);
//                         openDeleteModal(selectedRequest);
//                       }}
//                       className="px-4 py-2.5 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center gap-2"
//                     >
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                       </svg>
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
//                     <svg className="w-5 h-5 text-[#FF385C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
//                     </svg>
//                     <h2 className="text-xl font-semibold text-gray-900">
//                       {t.respond} - {selectedRequest.subject}
//                     </h2>
//                   </div>
//                   <motion.button
//                     whileHover={{ rotate: 90, scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => {
//                       setIsRespondModalOpen(false);
//                       setResponseText('');
//                       setResolutionNotes('');
//                     }}
//                     className="p-1.5 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </motion.button>
//                 </div>

//                 <div className="p-6 space-y-4">
//                   <div className="p-3 bg-gray-50 rounded-lg">
//                     <p className="text-sm text-gray-500">
//                       <span className="font-medium text-gray-700">From:</span> {selectedRequest.guestName} ({selectedRequest.guestEmail})
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       <span className="font-medium text-gray-700">Property:</span> {selectedRequest.propertyName}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       <span className="font-medium text-gray-700">Subject:</span> {selectedRequest.subject}
//                     </p>
//                     <p className="text-sm text-gray-700 mt-1 line-clamp-2">
//                       {selectedRequest.message}
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
//                       <option value="reviewing">{t.reviewing}</option>
//                       <option value="in_progress">{t.inProgress}</option>
//                       <option value="resolved">{t.resolved}</option>
//                       <option value="rejected">{t.rejected}</option>
//                       <option value="archived">{t.archived}</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                       {t.responseLabel}
//                     </label>
//                     <textarea
//                       value={responseText}
//                       onChange={(e) => setResponseText(e.target.value)}
//                       rows={6}
//                       className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none"
//                       placeholder={t.responsePlaceholder}
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                       {t.resolutionNotes}
//                     </label>
//                     <textarea
//                       value={resolutionNotes}
//                       onChange={(e) => setResolutionNotes(e.target.value)}
//                       rows={3}
//                       className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none"
//                       placeholder="Add resolution notes..."
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
//                           ? 'bg-gray-400 cursor-not-allowed'
//                           : 'bg-[#FF385C] hover:bg-[#E31C5F]'
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
//                           {t.sendResponse}
//                         </>
//                       )}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => {
//                         setIsRespondModalOpen(false);
//                         setResponseText('');
//                         setResolutionNotes('');
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
//                       <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                       </svg>
//                     </div>
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">{t.deleteRequest}</h3>
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
//                           ? 'bg-gray-400 cursor-not-allowed'
//                           : 'bg-red-600 hover:bg-red-700'
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

//       {/* Compose Request Modal */}
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
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
//                     </svg>
//                     <h2 className="text-xl font-semibold text-gray-900">{t.newRequest}</h2>
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
//                         {t.guestName} *
//                       </label>
//                       <input
//                         type="text"
//                         value={formData.guestName}
//                         onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
//                         className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//                         placeholder="Guest name"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         {t.guestEmail} *
//                       </label>
//                       <input
//                         type="email"
//                         value={formData.guestEmail}
//                         onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
//                         className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//                         placeholder="guest@example.com"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         {t.guestPhone}
//                       </label>
//                       <input
//                         type="text"
//                         value={formData.guestPhone}
//                         onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })}
//                         className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//                         placeholder="+250788123456"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         {t.selectProperty}
//                       </label>
//                       <select
//                         value={formData.propertyId}
//                         onChange={(e) => {
//                           const property = hostProperties.find(p => p.id === e.target.value);
//                           setFormData({ 
//                             ...formData, 
//                             propertyId: e.target.value,
//                             propertyName: property?.name || ''
//                           });
//                         }}
//                         className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//                       >
//                         <option value="">Select a property</option>
//                         {hostProperties.map((prop) => (
//                           <option key={prop.id} value={prop.id}>{prop.name}</option>
//                         ))}
//                       </select>
//                     </div>
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
//                       placeholder="Request subject"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                       {t.requestMessage} *
//                     </label>
//                     <textarea
//                       value={formData.message}
//                       onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                       rows={5}
//                       className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none"
//                       placeholder="Type your request here..."
//                     />
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         {t.category}
//                       </label>
//                       <select
//                         value={formData.category}
//                         onChange={(e) => setFormData({ ...formData, category: e.target.value as HostRequest['category'] })}
//                         className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//                       >
//                         <option value="general">{t.general}</option>
//                         <option value="maintenance">{t.maintenance}</option>
//                         <option value="cleaning">{t.cleaning}</option>
//                         <option value="issue">{t.issue}</option>
//                         <option value="inquiry">{t.inquiry}</option>
//                         <option value="feedback">{t.feedback}</option>
//                         <option value="emergency">{t.emergency}</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         {t.priority}
//                       </label>
//                       <select
//                         value={formData.priority}
//                         onChange={(e) => setFormData({ ...formData, priority: e.target.value as HostRequest['priority'] })}
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
//                         onChange={(e) => setFormData({ ...formData, status: e.target.value as HostRequest['status'] })}
//                         className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//                       >
//                         <option value="pending">{t.pending}</option>
//                         <option value="reviewing">{t.reviewing}</option>
//                         <option value="in_progress">{t.inProgress}</option>
//                         <option value="resolved">{t.resolved}</option>
//                         <option value="rejected">{t.rejected}</option>
//                         <option value="archived">{t.archived}</option>
//                       </select>
//                     </div>
//                   </div>

//                   {/* Image Upload */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                       {t.attachedImage}
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
//                             onClick={() => setFormData({ ...formData, image: null, imagePreview: '' })}
//                             className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
//                           >
//                             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                     <p className="mt-1 text-xs text-gray-500">JPG, PNG, GIF, WebP up to 5MB</p>
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
//                         onKeyPress={(e) => e.key === 'Enter' && addTag()}
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
//                       onClick={handleCreateRequest}
//                       disabled={isSubmitting}
//                       className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 ${
//                         isSubmitting
//                           ? 'bg-gray-400 cursor-not-allowed'
//                           : 'bg-[#FF385C] hover:bg-[#E31C5F]'
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
//                           {t.createRequest}
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
//                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
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








/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/purity */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

// ============================================================
// MODAL COMPONENTS
// ============================================================

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
              <svg className="w-10 h-10 text-green-600 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
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
              <svg className="w-10 h-10 text-red-600 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
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
                  type === "danger" ? (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  ) :
                  type === "warning" ? (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  ) :
                  type === "success" ? (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  )
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

// Types
interface HostRequest {
  id: string;
  propertyId: string;
  propertyName: string;
  guestId: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  subject: string;
  message: string;
  category: 'maintenance' | 'cleaning' | 'issue' | 'inquiry' | 'feedback' | 'emergency' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'reviewing' | 'in_progress' | 'resolved' | 'rejected' | 'archived';
  image?: {
    name: string;
    size: number;
    type: string;
    dataUrl: string;
  };
  createdAt: string;
  updatedAt: string;
  response?: string;
  respondedBy?: string;
  respondedAt?: string;
  assignedTo?: string;
  resolutionNotes?: string;
  relatedBookingId?: string;
  tags: string[];
  metadata: {
    ipAddress?: string;
    userAgent?: string;
    pageUrl?: string;
  };
}

interface RequestFormData {
  propertyId: string;
  propertyName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  subject: string;
  message: string;
  category: HostRequest['category'];
  priority: HostRequest['priority'];
  status: HostRequest['status'];
  image?: File | null;
  imagePreview?: string;
  tags: string[];
  relatedBookingId?: string;
}

// Translations
const translations = {
  en: {
    hostRequests: 'Host Requests',
    manageRequests: 'Manage support requests and issues from guests',
    total: 'Total',
    pending: 'Pending',
    reviewing: 'Reviewing',
    inProgress: 'In Progress',
    resolved: 'Resolved',
    rejected: 'Rejected',
    archived: 'Archived',
    searchRequests: 'Search by guest, property, or subject...',
    allStatus: 'All Status',
    allCategories: 'All Categories',
    allPriorities: 'All Priorities',
    request: 'Request',
    guest: 'Guest',
    property: 'Property',
    subject: 'Subject',
    category: 'Category',
    priority: 'Priority',
    status: 'Status',
    submitted: 'Submitted',
    actions: 'Actions',
    noRequests: 'No requests found',
    adjustFilters: 'Try adjusting your search or filters',
    showing: 'Showing',
    of: 'of',
    requests: 'requests',
    viewRequest: 'View Request',
    respond: 'Respond',
    deleteRequest: 'Delete Request',
    deleteConfirmation: 'Are you sure you want to delete this request?',
    actionUndone: 'This action cannot be undone.',
    cancel: 'Cancel',
    delete: 'Delete',
    deleting: 'Deleting...',
    requestDeleted: 'Request deleted successfully!',
    deleteFailed: 'Failed to delete request',
    statusUpdated: 'Request status updated successfully!',
    statusUpdateFailed: 'Failed to update request status',
    responseSent: 'Response sent successfully!',
    responseFailed: 'Failed to send response',
    requestDetails: 'Request Details',
    guestName: 'Guest Name',
    guestEmail: 'Guest Email',
    guestPhone: 'Guest Phone',
    propertyName: 'Property Name',
    requestMessage: 'Request Message',
    attachedImage: 'Attached Image',
    responseLabel: 'Response',
    sendResponse: 'Send Response',
    updateStatus: 'Update Status',
    selectStatus: 'Select Status',
    responsePlaceholder: 'Type your response here...',
    noImage: 'No image attached',
    viewImage: 'View Image',
    close: 'Close',
    send: 'Send',
    sending: 'Sending...',
    composeRequest: 'Compose Request',
    newRequest: 'New Request',
    createRequest: 'Create Request',
    requestCreated: 'Request created successfully!',
    createFailed: 'Failed to create request',
    markAsRead: 'Mark as Read',
    markAsUnread: 'Mark as Unread',
    toggleStar: 'Toggle Star',
    toggleFlag: 'Toggle Flag',
    archive: 'Archive',
    unarchive: 'Unarchive',
    labels: 'Labels',
    tags: 'Tags',
    addLabel: 'Add Label',
    addTag: 'Add Tag',
    general: 'General',
    maintenance: 'Maintenance',
    cleaning: 'Cleaning',
    issue: 'Issue',
    inquiry: 'Inquiry',
    feedback: 'Feedback',
    emergency: 'Emergency',
    other: 'Other',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    urgent: 'Urgent',
    all: 'All',
    selectCategory: 'Select Category',
    selectPriority: 'Select Priority',
    selectProperty: 'Select Property',
    relatedBooking: 'Related Booking',
    assignedTo: 'Assigned To',
    resolutionNotes: 'Resolution Notes',
    permissions: {
      cannotEdit: 'You cannot edit this request',
      cannotDelete: 'You cannot delete this request',
    },
    success: 'Success!',
    error: 'Error',
    confirm: 'Confirm',
  },
  fr: {
    hostRequests: 'Demandes des Hôtes',
    manageRequests: 'Gérer les demandes de support et les problèmes des invités',
    total: 'Total',
    pending: 'En Attente',
    reviewing: 'En Révision',
    inProgress: 'En Cours',
    resolved: 'Résolu',
    rejected: 'Rejeté',
    archived: 'Archivé',
    searchRequests: 'Rechercher par invité, propriété ou sujet...',
    allStatus: 'Tous les Statuts',
    allCategories: 'Toutes les Catégories',
    allPriorities: 'Toutes les Priorités',
    request: 'Demande',
    guest: 'Invité',
    property: 'Propriété',
    subject: 'Sujet',
    category: 'Catégorie',
    priority: 'Priorité',
    status: 'Statut',
    submitted: 'Soumis',
    actions: 'Actions',
    noRequests: 'Aucune demande trouvée',
    adjustFilters: 'Essayez d\'ajuster votre recherche ou vos filtres',
    showing: 'Affichage',
    of: 'de',
    requests: 'demandes',
    viewRequest: 'Voir la Demande',
    respond: 'Répondre',
    deleteRequest: 'Supprimer la Demande',
    deleteConfirmation: 'Êtes-vous sûr de vouloir supprimer cette demande ?',
    actionUndone: 'Cette action est irréversible.',
    cancel: 'Annuler',
    delete: 'Supprimer',
    deleting: 'Suppression...',
    requestDeleted: 'Demande supprimée avec succès !',
    deleteFailed: 'Échec de la suppression de la demande',
    statusUpdated: 'Statut de la demande mis à jour avec succès !',
    statusUpdateFailed: 'Échec de la mise à jour du statut',
    responseSent: 'Réponse envoyée avec succès !',
    responseFailed: 'Échec de l\'envoi de la réponse',
    requestDetails: 'Détails de la Demande',
    guestName: 'Nom de l\'Invité',
    guestEmail: 'Email de l\'Invité',
    guestPhone: 'Téléphone de l\'Invité',
    propertyName: 'Nom de la Propriété',
    requestMessage: 'Message de la Demande',
    attachedImage: 'Image Jointe',
    responseLabel: 'Réponse',
    sendResponse: 'Envoyer la Réponse',
    updateStatus: 'Mettre à Jour le Statut',
    selectStatus: 'Sélectionner le Statut',
    responsePlaceholder: 'Tapez votre réponse ici...',
    noImage: 'Aucune image jointe',
    viewImage: 'Voir l\'Image',
    close: 'Fermer',
    send: 'Envoyer',
    sending: 'Envoi en cours...',
    composeRequest: 'Composer une Demande',
    newRequest: 'Nouvelle Demande',
    createRequest: 'Créer une Demande',
    requestCreated: 'Demande créée avec succès !',
    createFailed: 'Échec de la création de la demande',
    markAsRead: 'Marquer comme Lu',
    markAsUnread: 'Marquer comme Non Lu',
    toggleStar: 'Basculer Favori',
    toggleFlag: 'Basculer Signalement',
    archive: 'Archiver',
    unarchive: 'Désarchiver',
    labels: 'Étiquettes',
    tags: 'Tags',
    addLabel: 'Ajouter une Étiquette',
    addTag: 'Ajouter un Tag',
    general: 'Général',
    maintenance: 'Entretien',
    cleaning: 'Nettoyage',
    issue: 'Problème',
    inquiry: 'Demande',
    feedback: 'Avis',
    emergency: 'Urgence',
    other: 'Autre',
    low: 'Faible',
    medium: 'Moyen',
    high: 'Élevé',
    urgent: 'Urgent',
    all: 'Tous',
    selectCategory: 'Sélectionner une Catégorie',
    selectPriority: 'Sélectionner une Priorité',
    selectProperty: 'Sélectionner une Propriété',
    relatedBooking: 'Réservation Associée',
    assignedTo: 'Assigné à',
    resolutionNotes: 'Notes de Résolution',
    permissions: {
      cannotEdit: 'Vous ne pouvez pas modifier cette demande',
      cannotDelete: 'Vous ne pouvez pas supprimer cette demande',
    },
    success: 'Succès !',
    error: 'Erreur',
    confirm: 'Confirmer',
  },
  rw: {
    hostRequests: 'Ibyifuzo by\'Abatambyi',
    manageRequests: 'Gucunga ibyifuzo n\'ibibazo by\'abashyitsi',
    total: 'Yose',
    pending: 'Bitegereje',
    reviewing: 'Birisuzumwa',
    inProgress: 'Birakomeza',
    resolved: 'Byakemutse',
    rejected: 'Byangijwe',
    archived: 'Byabitswe',
    searchRequests: 'Shakisha ukurikije umushyitsi, inzu cyangwa ikiganiro...',
    allStatus: 'Ihagaze Ryose',
    allCategories: 'Ibyiciro Byose',
    allPriorities: 'Iby\'ibanze Byose',
    request: 'Icyifuzo',
    guest: 'Umushyitsi',
    property: 'Inzu',
    subject: 'Ikiganiro',
    category: 'Icyiciro',
    priority: 'Iby\'ibanze',
    status: 'Ihagaze',
    submitted: 'Byoherejwe',
    actions: 'Ibikorwa',
    noRequests: 'Nta cyifuzo cyabonetse',
    adjustFilters: 'Gerageza guhindura uburyo ushakisha cyangwa amatungo',
    showing: 'Bereka',
    of: 'muri',
    requests: 'ibyifuzo',
    viewRequest: 'Reba Icyifuzo',
    respond: 'Subiza',
    deleteRequest: 'Kuraho Icyifuzo',
    deleteConfirmation: 'Uri kwizera ko ushaka gukuraho iki cyifuzo?',
    actionUndone: 'Iki gikorwa ntikishobora guhindurwa.',
    cancel: 'Reka',
    delete: 'Kuraho',
    deleting: 'Birakurwaho...',
    requestDeleted: 'Icyifuzo cyakuweho neza!',
    deleteFailed: 'Kuraho icyifuzo birananiranye',
    statusUpdated: 'Ihagaze ry\'icyifuzo ryavuguruwe neza!',
    statusUpdateFailed: 'Kuvugurura ihagaze birananiranye',
    responseSent: 'Igisubizo cyoherejwe neza!',
    responseFailed: 'Kohereza igisubizo birananiranye',
    requestDetails: 'Ibisobanuro by\'Icyifuzo',
    guestName: 'Izina ry\'Umushyitsi',
    guestEmail: 'Imeri y\'Umushyitsi',
    guestPhone: 'Telefone y\'Umushyitsi',
    propertyName: 'Izina ry\'Inzu',
    requestMessage: 'Ubutumwa bw\'Icyifuzo',
    attachedImage: 'Ishusho Yashyizweho',
    responseLabel: 'Igisubizo',
    sendResponse: 'Ohereza Igisubizo',
    updateStatus: 'Vugurura Ihagaze',
    selectStatus: 'Hitamo Ihagaze',
    responsePlaceholder: 'Andika igisubizo cyawe hano...',
    noImage: 'Nta shusho yashyizweho',
    viewImage: 'Reba Ishusho',
    close: 'Funga',
    send: 'Ohereza',
    sending: 'Biremereza...',
    composeRequest: 'Andika Icyifuzo',
    newRequest: 'Icyifuzo Gishya',
    createRequest: 'Kora Icyifuzo',
    requestCreated: 'Icyifuzo cyakozwe neza!',
    createFailed: 'Kora icyifuzo birananiranye',
    markAsRead: 'Shyira nk\'Uwasomye',
    markAsUnread: 'Shyira nk\'Utarasomye',
    toggleStar: 'Hindura Ibyakunzwe',
    toggleFlag: 'Hindura Ikimenyetso',
    archive: 'Bika',
    unarchive: 'Kuraho mu bibitswe',
    labels: 'Ibyiciro',
    tags: 'Ibimenyetso',
    addLabel: 'Ongeraho Icyiciro',
    addTag: 'Ongeraho Ikimenyetso',
    general: 'Rusange',
    maintenance: 'Ubwubatsi',
    cleaning: 'Isuku',
    issue: 'Ikibazo',
    inquiry: 'Ikibazo',
    feedback: 'Ibitekerezo',
    emergency: 'Ibyihutirwa',
    other: 'Ibindi',
    low: 'Gito',
    medium: 'Rishoboka',
    high: 'Kinini',
    urgent: 'Byihutirwa',
    all: 'Byose',
    selectCategory: 'Hitamo Icyiciro',
    selectPriority: 'Hitamo Iby\'ibanze',
    selectProperty: 'Hitamo Inzu',
    relatedBooking: 'Icyemezo Gifitanye Isano',
    assignedTo: 'Yahawe',
    resolutionNotes: 'Ibisobanuro by\'Igisubizo',
    permissions: {
      cannotEdit: 'Ntushobora guhindura iki cyifuzo',
      cannotDelete: 'Ntushobora gukuraho iki cyifuzo',
    },
    success: 'Byakunze!',
    error: 'Ikosa',
    confirm: 'Emeza',
  },
};

// Helper function to get language from cookies
const getLanguageFromCookies = (): 'en' | 'fr' | 'rw' => {
  const lang = Cookies.get('language') as 'en' | 'fr' | 'rw';
  return lang || 'en';
};

// Helper function to get user role from cookies
const getUserRole = (): 'admin' | 'user' | 'host' => {
  const role = Cookies.get('userRole') as 'admin' | 'user' | 'host';
  return role || 'user';
};

// Helper function to get user email from cookies
const getUserEmail = (): string => {
  return Cookies.get('userEmail') || '';
};

// Helper function to get user name from cookies
const getUserName = (): string => {
  return Cookies.get('userName') || '';
};

// Storage key
const STORAGE_KEY_HOST_REQUESTS = 'host_requests';

// Generate unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};

// Initial requests for host
const getInitialRequests = (_hostEmail: string): HostRequest[] => {
  return [
    {
      id: '1',
      propertyId: 'prop_001',
      propertyName: 'INES Ruhengeri Student Lodge',
      guestId: 'guest_001', 
      guestName: 'Jean Paul Mugisha',
      guestEmail: 'jean@example.com',
      guestPhone: '+250788123456',
      subject: 'Maintenance issue - broken desk',
      message: 'The desk in room 201 is broken and needs immediate repair. The leg is wobbly and it might collapse.',
      category: 'maintenance',
      priority: 'high',
      status: 'pending',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      tags: ['furniture', 'repair'],
      metadata: {},
    },
    {
      id: '2',
      propertyId: 'prop_002',
      propertyName: 'Kigombe Student Apartments',
      guestId: 'guest_002',
      guestName: 'Marie Claire Uwimana',
      guestEmail: 'marie@example.com',
      guestPhone: '+250788123457',
      subject: 'Cleaning service request',
      message: 'I would like to request a deep cleaning of the apartment before my check-in next week. Is this possible?',
      category: 'cleaning',
      priority: 'medium',
      status: 'reviewing',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 43200000).toISOString(),
      response: 'Hi Marie, we have scheduled a deep cleaning for the day before your check-in. You will receive a confirmation shortly.',
      respondedBy: 'Host Admin',
      respondedAt: new Date(Date.now() - 43200000).toISOString(),
      tags: ['cleaning', 'check-in'],
      metadata: {},
    },
    {
      id: '3',
      propertyId: 'prop_001',
      propertyName: 'INES Ruhengeri Student Lodge',
      guestId: 'guest_003',
      guestName: 'David Niyonzima',
      guestEmail: 'david@example.com',
      guestPhone: '+250788123458',
      subject: 'Internet connectivity issues',
      message: 'The WiFi has been unstable for the past two days. I need it for my online classes. Can you please fix this?',
      category: 'issue',
      priority: 'urgent',
      status: 'in_progress',
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      response: 'We are aware of the issue and have contacted the ISP. They will be here today to fix it.',
      respondedBy: 'Host Admin',
      respondedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      tags: ['wifi', 'internet', 'urgent'],
      metadata: {},
    },
    {
      id: '4',
      propertyId: 'prop_002',
      propertyName: 'Kigombe Student Apartments',
      guestId: 'guest_004',
      guestName: 'Grace Uwase',
      guestEmail: 'grace@example.com',
      subject: 'Feedback about the apartment',
      message: 'I really enjoyed my stay at your apartment. The location is perfect and the amenities are great. Thank you!',
      category: 'feedback',
      priority: 'low',
      status: 'resolved',
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      updatedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
      response: 'Thank you for your wonderful feedback! We are glad you enjoyed your stay. You are welcome back anytime.',
      respondedBy: 'Host Admin',
      respondedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
      tags: ['positive', 'review'],
      metadata: {},
    },
    {
      id: '5',
      propertyId: 'prop_001',
      propertyName: 'INES Ruhengeri Student Lodge',
      guestId: 'guest_005',
      guestName: 'Eric Kamanzi',
      guestEmail: 'eric@example.com',
      subject: 'Emergency - no hot water',
      message: 'There is no hot water in the bathroom. This is urgent as I need to shower before my exam.',
      category: 'emergency',
      priority: 'urgent',
      status: 'rejected',
      createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      updatedAt: new Date(Date.now() - 43200000).toISOString(),
      response: 'The water heater has been inspected and is working properly. Please check if the boiler is turned on.',
      respondedBy: 'Host Admin',
      respondedAt: new Date(Date.now() - 43200000).toISOString(),
      tags: ['hot water', 'emergency'],
      metadata: {},
    },
  ];
};

// Helper functions
const getRequests = (hostEmail: string): HostRequest[] => {
  const data = localStorage.getItem(STORAGE_KEY_HOST_REQUESTS);
  if (data) {
    return JSON.parse(data);
  }
  const initialRequests = getInitialRequests(hostEmail);
  localStorage.setItem(STORAGE_KEY_HOST_REQUESTS, JSON.stringify(initialRequests));
  return initialRequests;
};

const saveRequests = (requests: HostRequest[]): void => {
  localStorage.setItem(STORAGE_KEY_HOST_REQUESTS, JSON.stringify(requests));
};

export const HostRequestManagement: React.FC = () => {
  // Get language and user info from cookies
  const [lang, setLang] = useState<'en' | 'fr' | 'rw'>(getLanguageFromCookies());
  const userRole = getUserRole();
  const userEmail = getUserEmail();
  const userName = getUserName();

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

  const [requests, setRequests] = useState<HostRequest[]>(getRequests(userEmail));
  const [filteredRequests, setFilteredRequests] = useState<HostRequest[]>(getRequests(userEmail));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isRespondModalOpen, setIsRespondModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<HostRequest | null>(null);
  const [responseText, setResponseText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [resolutionNotes, setResolutionNotes] = useState('');

  // Compose form state
  const [formData, setFormData] = useState<RequestFormData>({
    propertyId: '',
    propertyName: '',
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    subject: '',
    message: '',
    category: 'general',
    priority: 'medium',
    status: 'pending',
    image: null,
    imagePreview: '',
    tags: [],
    relatedBookingId: '',
  });
  const [tagInput, setTagInput] = useState('');

  // Properties for dropdown
  const [hostProperties] = useState<{id: string; name: string}[]>([
    { id: 'prop_001', name: 'INES Ruhengeri Student Lodge' },
    { id: 'prop_002', name: 'Kigombe Student Apartments' },
  ]);

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Statistics
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    reviewing: 0,
    inProgress: 0,
    resolved: 0,
    rejected: 0,
    archived: 0,
    urgent: 0,
  });

  const t = translations[lang];
  const isHost = userRole === 'host' || userRole === 'admin';

  const showSuccessModal = (title: string, message: string, details?: string) => {
    setSuccessModal({ isOpen: true, title, message, details });
  };

  const showErrorModal = (title: string, message: string, details?: string) => {
    setErrorModal({ isOpen: true, title, message, details });
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

  // Refresh requests
  useEffect(() => {
    const refreshed = getRequests(userEmail);
    setRequests(refreshed);
  }, [userEmail]);

  // Filter requests
  useEffect(() => {
    let filtered = [...requests];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (req) =>
          req.subject.toLowerCase().includes(term) ||
          req.guestName.toLowerCase().includes(term) ||
          req.message.toLowerCase().includes(term) ||
          req.guestEmail.toLowerCase().includes(term) ||
          req.propertyName.toLowerCase().includes(term)
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter((req) => req.status === filterStatus);
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter((req) => req.category === filterCategory);
    }

    if (filterPriority !== 'all') {
      filtered = filtered.filter((req) => req.priority === filterPriority);
    }

    setFilteredRequests(filtered);
  }, [requests, searchTerm, filterStatus, filterCategory, filterPriority]);

  // Update statistics
  useEffect(() => {
    const total = requests.length;
    const pending = requests.filter((r) => r.status === 'pending').length;
    const reviewing = requests.filter((r) => r.status === 'reviewing').length;
    const inProgress = requests.filter((r) => r.status === 'in_progress').length;
    const resolved = requests.filter((r) => r.status === 'resolved').length;
    const rejected = requests.filter((r) => r.status === 'rejected').length;
    const archived = requests.filter((r) => r.status === 'archived').length;
    const urgent = requests.filter((r) => r.priority === 'urgent').length;

    setStats({ total, pending, reviewing, inProgress, resolved, rejected, archived, urgent });
  }, [requests]);

  // Get status badge color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewing':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-purple-100 text-purple-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status label
  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'pending':
        return t.pending;
      case 'reviewing':
        return t.reviewing;
      case 'in_progress':
        return t.inProgress;
      case 'resolved':
        return t.resolved;
      case 'rejected':
        return t.rejected;
      case 'archived':
        return t.archived;
      default:
        return status;
    }
  };

  // Get category color
  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'general':
        return 'bg-gray-100 text-gray-800';
      case 'maintenance':
        return 'bg-blue-100 text-blue-800';
      case 'cleaning':
        return 'bg-green-100 text-green-800';
      case 'issue':
        return 'bg-purple-100 text-purple-800';
      case 'inquiry':
        return 'bg-yellow-100 text-yellow-800';
      case 'feedback':
        return 'bg-indigo-100 text-indigo-800';
      case 'emergency':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get priority color
  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'low':
        return 'bg-gray-100 text-gray-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'urgent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format date
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showErrorModal(t.error || 'Error', 'File size must be less than 5MB');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      showErrorModal(t.error || 'Error', 'Only JPG, PNG, GIF, and WebP images are allowed');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: file,
        imagePreview: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  // CRUD Operations
  const handleCreateRequest = async () => {
    if (!formData.guestName || !formData.guestEmail || !formData.subject || !formData.message) {
      showErrorModal(t.error || 'Error', 'Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newRequest: HostRequest = {
        id: generateId(),
        propertyId: formData.propertyId,
        propertyName: formData.propertyName || 'Unknown Property',
        guestId: `guest_${Date.now()}`,
        guestName: formData.guestName,
        guestEmail: formData.guestEmail,
        guestPhone: formData.guestPhone,
        subject: formData.subject,
        message: formData.message,
        category: formData.category,
        priority: formData.priority,
        status: formData.status,
        image: formData.image ? {
          name: formData.image.name,
          size: formData.image.size,
          type: formData.image.type,
          dataUrl: formData.imagePreview || '',
        } : undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: formData.tags,
        relatedBookingId: formData.relatedBookingId,
        metadata: {},
      };

      const updatedRequests = [newRequest, ...requests];
      setRequests(updatedRequests);
      saveRequests(updatedRequests);

      showSuccessModal(
        t.success || 'Success!',
        t.requestCreated || 'Request created successfully!',
        `Request from ${newRequest.guestName} has been created`
      );
      resetForm();
      setIsComposeModalOpen(false);
    } catch (error) {
      showErrorModal(t.error || 'Error', t.createFailed || 'Failed to create request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteRequest = async () => {
    if (!selectedRequest) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const updatedRequests = requests.filter((r) => r.id !== selectedRequest.id);
      setRequests(updatedRequests);
      saveRequests(updatedRequests);

      showSuccessModal(
        t.success || 'Success!',
        t.requestDeleted || 'Request deleted successfully!',
        `Request from ${selectedRequest.guestName} has been removed`
      );
      setIsDeleteModalOpen(false);
      setSelectedRequest(null);
    } catch (error) {
      showErrorModal(t.error || 'Error', t.deleteFailed || 'Failed to delete request');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendResponse = async () => {
    if (!selectedRequest || !responseText.trim()) {
      showErrorModal(t.error || 'Error', 'Please enter a response');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedRequest: HostRequest = {
        ...selectedRequest,
        status: selectedStatus as HostRequest['status'] || 'resolved',
        response: responseText,
        respondedBy: userName || 'Host',
        respondedAt: new Date().toISOString(),
        resolutionNotes: resolutionNotes || '',
        updatedAt: new Date().toISOString(),
      };

      const updatedRequests = requests.map((r) =>
        r.id === selectedRequest.id ? updatedRequest : r
      );
      setRequests(updatedRequests);
      saveRequests(updatedRequests);

      showSuccessModal(
        t.success || 'Success!',
        t.responseSent || 'Response sent successfully!',
        `Response sent to ${selectedRequest.guestName}`
      );
      setIsRespondModalOpen(false);
      setSelectedRequest(null);
      setResponseText('');
      setResolutionNotes('');
    } catch (error) {
      showErrorModal(t.error || 'Error', t.responseFailed || 'Failed to send response');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStatus = async (requestId: string, newStatus: HostRequest['status']) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const updatedRequests = requests.map((r) =>
        r.id === requestId
          ? { ...r, status: newStatus, updatedAt: new Date().toISOString() }
          : r
      );
      setRequests(updatedRequests);
      saveRequests(updatedRequests);

      showSuccessModal(t.success || 'Success!', t.statusUpdated || 'Request status updated successfully!');
    } catch (error) {
      showErrorModal(t.error || 'Error', t.statusUpdateFailed || 'Failed to update request status');
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      propertyId: '',
      propertyName: '',
      guestName: '',
      guestEmail: '',
      guestPhone: '',
      subject: '',
      message: '',
      category: 'general',
      priority: 'medium',
      status: 'pending',
      image: null,
      imagePreview: '',
      tags: [],
      relatedBookingId: '',
    });
    setTagInput('');
  };

  // Add tag
  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  // Remove tag
  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  // Open modals
  const openViewModal = (request: HostRequest) => {
    setSelectedRequest(request);
    setIsViewModalOpen(true);
  };

  const openRespondModal = (request: HostRequest) => {
    setSelectedRequest(request);
    setResponseText(request.response || '');
    setSelectedStatus(request.status);
    setResolutionNotes(request.resolutionNotes || '');
    setIsRespondModalOpen(true);
  };

  const openDeleteModal = (request: HostRequest) => {
    setSelectedRequest(request);
    setIsDeleteModalOpen(true);
  };

  const openComposeModal = () => {
    resetForm();
    setIsComposeModalOpen(true);
  };

  // Handle refresh
  const handleRefresh = () => {
    const refreshed = getRequests(userEmail);
    setRequests(refreshed);
    showSuccessModal(t.success || 'Success!', 'Requests refreshed!');
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

  if (!isHost) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h2 className="text-xl font-semibold text-gray-700">Access Denied</h2>
          <p className="text-gray-500">You need to be a host to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
              <svg className="w-7 h-7 text-[#FF385C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
              {t.hostRequests}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {t.manageRequests}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={openComposeModal}
              className="px-4 py-2 bg-[#FF385C] text-white rounded-lg text-sm font-medium hover:bg-[#E31C5F] transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              {t.composeRequest}
            </motion.button>
            <button
              onClick={handleRefresh}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
        <motion.div whileHover={{ y: -2 }} className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
          <p className="text-xs text-gray-500">{t.total}</p>
          <p className="text-xl font-bold text-gray-900">{stats.total}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-yellow-50 rounded-xl p-3 shadow-sm border border-yellow-200">
          <p className="text-xs text-yellow-600">{t.pending}</p>
          <p className="text-xl font-bold text-yellow-700">{stats.pending}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-blue-50 rounded-xl p-3 shadow-sm border border-blue-200">
          <p className="text-xs text-blue-600">{t.reviewing}</p>
          <p className="text-xl font-bold text-blue-700">{stats.reviewing}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-purple-50 rounded-xl p-3 shadow-sm border border-purple-200">
          <p className="text-xs text-purple-600">{t.inProgress}</p>
          <p className="text-xl font-bold text-purple-700">{stats.inProgress}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-green-50 rounded-xl p-3 shadow-sm border border-green-200">
          <p className="text-xs text-green-600">{t.resolved}</p>
          <p className="text-xl font-bold text-green-700">{stats.resolved}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-red-50 rounded-xl p-3 shadow-sm border border-red-200">
          <p className="text-xs text-red-600">{t.rejected}</p>
          <p className="text-xl font-bold text-red-700">{stats.rejected}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-gray-50 rounded-xl p-3 shadow-sm border border-gray-200">
          <p className="text-xs text-gray-500">{t.archived}</p>
          <p className="text-xl font-bold text-gray-900">{stats.archived}</p>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="bg-red-50 rounded-xl p-3 shadow-sm border border-red-200">
          <p className="text-xs text-red-600">{t.urgent}</p>
          <p className="text-xl font-bold text-red-700">{stats.urgent}</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder={t.searchRequests}
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
              <option value="reviewing">{t.reviewing}</option>
              <option value="in_progress">{t.inProgress}</option>
              <option value="resolved">{t.resolved}</option>
              <option value="rejected">{t.rejected}</option>
              <option value="archived">{t.archived}</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
            >
              <option value="all">{t.allCategories}</option>
              <option value="general">{t.general}</option>
              <option value="maintenance">{t.maintenance}</option>
              <option value="cleaning">{t.cleaning}</option>
              <option value="issue">{t.issue}</option>
              <option value="inquiry">{t.inquiry}</option>
              <option value="feedback">{t.feedback}</option>
              <option value="emergency">{t.emergency}</option>
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
                setSearchTerm('');
                setFilterStatus('all');
                setFilterCategory('all');
                setFilterPriority('all');
              }}
              className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
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
                  {t.guest}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  {t.property}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  {t.category}
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
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    <svg className="w-12 h-12 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                    <p>{t.noRequests}</p>
                    <p className="text-sm">{t.adjustFilters}</p>
                  </td>
                </tr>
              ) : (
                filteredRequests.map((request) => (
                  <motion.tr
                    key={request.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => openViewModal(request)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 relative">
                          {request.image && (
                            <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center">
                              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                          {request.priority === 'urgent' && (
                            <div className="absolute -top-1 -right-1">
                              <span className="flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {request.subject}
                          </p>
                          <p className="text-xs text-gray-500 truncate md:hidden">
                            {request.guestName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-sm text-gray-600">{request.guestName}</p>
                      <p className="text-xs text-gray-400">{request.guestEmail}</p>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <p className="text-sm text-gray-600">{request.propertyName}</p>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className={`px-2 py-0.5 text-xs rounded-full ${getCategoryColor(request.category)}`}>
                        {request.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(request.status)}`}>
                          {getStatusLabel(request.status)}
                        </span>
                        {request.priority === 'urgent' && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-800 animate-pulse">
                            {t.urgent}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <p className="text-sm text-gray-600">{formatDate(request.createdAt)}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            openViewModal(request);
                          }}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title={t.viewRequest}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            openRespondModal(request);
                          }}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title={t.respond}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                          </svg>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            openDeleteModal(request);
                          }}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title={t.deleteRequest}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
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
            {t.showing} {filteredRequests.length} {t.of} {requests.length} {t.requests}
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
              <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
                <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#FF385C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                    <h2 className="text-xl font-semibold text-gray-900">{t.requestDetails}</h2>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsViewModalOpen(false)}
                    className="p-1.5 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.guestName}</label>
                      <p className="text-sm font-medium text-gray-900 mt-1">{selectedRequest.guestName}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.guestEmail}</label>
                      <p className="text-sm font-medium text-gray-900 mt-1">{selectedRequest.guestEmail}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.propertyName}</label>
                      <p className="text-sm font-medium text-gray-900 mt-1">{selectedRequest.propertyName}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.category}</label>
                      <p className="mt-1">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getCategoryColor(selectedRequest.category)}`}>
                          {selectedRequest.category}
                        </span>
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.priority}</label>
                      <p className="mt-1">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getPriorityColor(selectedRequest.priority)}`}>
                          {selectedRequest.priority}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500">{t.subject}</label>
                    <p className="text-sm font-semibold text-gray-900 mt-1">{selectedRequest.subject}</p>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500">{t.requestMessage}</label>
                    <div className="mt-1 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedRequest.message}</p>
                    </div>
                  </div>

                  {selectedRequest.image && (
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.attachedImage}</label>
                      <div className="mt-2">
                        <button
                          onClick={() => setIsImageModalOpen(true)}
                          className="relative rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                        >
                          <img
                            src={selectedRequest.image.dataUrl}
                            alt={selectedRequest.image.name}
                            className="max-h-48 object-contain cursor-pointer"
                          />
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {selectedRequest.image.name}
                          </div>
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedRequest.tags.length > 0 && (
                    <div>
                      <label className="text-xs font-medium text-gray-500">{t.tags}</label>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {selectedRequest.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedRequest.response && (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <label className="text-xs font-medium text-gray-500">{t.responseLabel}</label>
                      <div className="mt-1 p-3 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedRequest.response}</p>
                        {selectedRequest.respondedBy && (
                          <p className="text-xs text-gray-500 mt-2">
                            Responded by: {selectedRequest.respondedBy} on {formatDate(selectedRequest.respondedAt || '')}
                          </p>
                        )}
                        {selectedRequest.resolutionNotes && (
                          <p className="text-xs text-gray-500 mt-1">
                            Resolution Notes: {selectedRequest.resolutionNotes}
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
                        openRespondModal(selectedRequest);
                      }}
                      className="px-4 py-2.5 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                      {t.respond}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        const newStatus = selectedRequest.status === 'archived' ? 'resolved' : 'archived';
                        handleUpdateStatus(selectedRequest.id, newStatus as HostRequest['status']);
                        setIsViewModalOpen(false);
                      }}
                      className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                      {selectedRequest.status === 'archived' ? t.unarchive : t.archive}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsViewModalOpen(false);
                        openDeleteModal(selectedRequest);
                      }}
                      className="px-4 py-2.5 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
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
                    <svg className="w-5 h-5 text-[#FF385C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {t.respond} - {selectedRequest.subject}
                    </h2>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setIsRespondModalOpen(false);
                      setResponseText('');
                      setResolutionNotes('');
                    }}
                    className="p-1.5 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                <div className="p-6 space-y-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-700">From:</span> {selectedRequest.guestName} ({selectedRequest.guestEmail})
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-700">Property:</span> {selectedRequest.propertyName}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-700">Subject:</span> {selectedRequest.subject}
                    </p>
                    <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                      {selectedRequest.message}
                    </p>
                  </div>

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
                      <option value="reviewing">{t.reviewing}</option>
                      <option value="in_progress">{t.inProgress}</option>
                      <option value="resolved">{t.resolved}</option>
                      <option value="rejected">{t.rejected}</option>
                      <option value="archived">{t.archived}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.responseLabel}
                    </label>
                    <textarea
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      rows={6}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none"
                      placeholder={t.responsePlaceholder}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.resolutionNotes}
                    </label>
                    <textarea
                      value={resolutionNotes}
                      onChange={(e) => setResolutionNotes(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none"
                      placeholder="Add resolution notes..."
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
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-[#FF385C] hover:bg-[#E31C5F]'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {t.sending}
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          {t.sendResponse}
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsRespondModalOpen(false);
                        setResponseText('');
                        setResolutionNotes('');
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
        icon={
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        }
      />

      {/* Compose Request Modal */}
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
                    <svg className="w-5 h-5 text-[#FF385C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <h2 className="text-xl font-semibold text-gray-900">{t.newRequest}</h2>
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
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.guestName} *
                      </label>
                      <input
                        type="text"
                        value={formData.guestName}
                        onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                        placeholder="Guest name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.guestEmail} *
                      </label>
                      <input
                        type="email"
                        value={formData.guestEmail}
                        onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                        placeholder="guest@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.guestPhone}
                      </label>
                      <input
                        type="text"
                        value={formData.guestPhone}
                        onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                        placeholder="+250788123456"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.selectProperty}
                      </label>
                      <select
                        value={formData.propertyId}
                        onChange={(e) => {
                          const property = hostProperties.find(p => p.id === e.target.value);
                          setFormData({ 
                            ...formData, 
                            propertyId: e.target.value,
                            propertyName: property?.name || ''
                          });
                        }}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                      >
                        <option value="">Select a property</option>
                        {hostProperties.map((prop) => (
                          <option key={prop.id} value={prop.id}>{prop.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.subject} *
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                      placeholder="Request subject"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.requestMessage} *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm resize-none"
                      placeholder="Type your request here..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.category}
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as HostRequest['category'] })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                      >
                        <option value="general">{t.general}</option>
                        <option value="maintenance">{t.maintenance}</option>
                        <option value="cleaning">{t.cleaning}</option>
                        <option value="issue">{t.issue}</option>
                        <option value="inquiry">{t.inquiry}</option>
                        <option value="feedback">{t.feedback}</option>
                        <option value="emergency">{t.emergency}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.priority}
                      </label>
                      <select
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value as HostRequest['priority'] })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                      >
                        <option value="low">{t.low}</option>
                        <option value="medium">{t.medium}</option>
                        <option value="high">{t.high}</option>
                        <option value="urgent">{t.urgent}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.status}
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as HostRequest['status'] })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                      >
                        <option value="pending">{t.pending}</option>
                        <option value="reviewing">{t.reviewing}</option>
                        <option value="in_progress">{t.inProgress}</option>
                        <option value="resolved">{t.resolved}</option>
                        <option value="rejected">{t.rejected}</option>
                        <option value="archived">{t.archived}</option>
                      </select>
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.attachedImage}
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer text-sm"
                      >
                        Choose File
                      </label>
                      {formData.imagePreview && (
                        <div className="relative">
                          <img
                            src={formData.imagePreview}
                            alt="Preview"
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => setFormData({ ...formData, image: null, imagePreview: '' })}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-gray-500">JPG, PNG, GIF, WebP up to 5MB</p>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.tags}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                        placeholder="Add a tag..."
                      />
                      <button
                        onClick={addTag}
                        className="px-3 py-2 bg-[#FF385C] text-white rounded-lg hover:bg-[#E31C5F] transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {formData.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full text-xs flex items-center gap-1">
                          #{tag}
                          <button onClick={() => removeTag(tag)} className="hover:text-red-500">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </span>
                      ))}
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
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-[#FF385C] hover:bg-[#E31C5F]'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {t.sending}
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          {t.createRequest}
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

      {/* Image Preview Modal */}
      <AnimatePresence>
        {isImageModalOpen && selectedRequest?.image && (
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
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <img
                  src={selectedRequest.image.dataUrl}
                  alt={selectedRequest.image.name}
                  className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-sm px-4 py-2 rounded-lg">
                  {selectedRequest.image.name} ({(selectedRequest.image.size / 1024).toFixed(1)} KB)
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};