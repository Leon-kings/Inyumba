
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-hooks/set-state-in-effect */
// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Cookies from "js-cookie";
// import axios, { AxiosError } from "axios";

// // API Base URL
// const API_BASE_URL = "https://rene-inyumba-nodejs.onrender.com";

// // ============================================================
// // TRANSLATION HELPER - Google Translate API
// // ============================================================

// const translateContent = async (text: string, targetLang: string): Promise<string> => {
//   if (!text || targetLang === 'en') return text;
//   if (targetLang === 'rw' || targetLang === 'fr') {
//     try {
//       const response = await axios.post(
//         `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
//       );
//       if (response.data && response.data[0] && response.data[0][0]) {
//         return response.data[0][0][0] || text;
//       }
//       return text;
//     } catch (error) {
//       console.error('Translation error for text:', text, error);
//       return text;
//     }
//   }
//   return text;
// };

// // Types based on the House model
// interface Host {
//   name: string;
//   email: string;
//   phone: string;
//   responseRate: number;
//   responseTime: string;
// }

// interface Location {
//   province: string;
//   district: string;
//   sector: string;
//   cell: string;
//   village: string;
//   coordinates?: {
//     lat: number;
//     lng: number;
//   };
// }

// interface Image {
//   public_id: string;
//   url: string;
//   secure_url: string;
//   file?: File;
// }

// interface Availability {
//   startDate: string;
//   endDate: string;
// }

// interface House {
//   _id?: string;
//   houseId: string;
//   name: string;
//   description: string;
//   images: Image[];
//   location: Location;
//   university: string;
//   pricePerMonth: number;
//   bedrooms: number;
//   bathrooms: number;
//   maxGuests: number;
//   amenities: string[];
//   status: "available" | "pending" | "unavailable" | "maintenance";
//   rating: number;
//   totalReviews: number;
//   host: Host;
//   availability: Availability;
//   isActive: boolean;
//   createdAt?: string;
//   updatedAt?: string;
// }

// // Translations
// const translations = {
//   en: {
//     hostManagement: "Host Management",
//     manageHostProfile: "Manage your properties and listings",
//     properties: "Properties",
//     addProperty: "Add Property",
//     editProperty: "Edit Property",
//     deleteProperty: "Delete Property",
//     deleteConfirmation: "Are you sure you want to delete this property?",
//     actionUndone: "This action cannot be undone.",
//     cancel: "Cancel",
//     delete: "Delete",
//     deleting: "Deleting...",
//     propertyDeleted: "Property deleted successfully!",
//     deleteFailed: "Failed to delete property",
//     propertyCreated: "Property created successfully!",
//     propertyUpdated: "Property updated successfully!",
//     createFailed: "Failed to create property",
//     updateFailed: "Failed to update property",
//     totalProperties: "Total Properties",
//     availableProperties: "Available",
//     pendingProperties: "Pending",
//     unavailableProperties: "Unavailable",
//     maintenanceProperties: "Maintenance",
//     totalReviews: "Total Reviews",
//     rating: "Rating",
//     searchProperties: "Search properties...",
//     allStatus: "All Status",
//     property: "Property",
//     location: "Location",
//     status: "Status",
//     price: "Price",
//     actions: "Actions",
//     noProperties: "No properties found",
//     adjustFilters: "Try adjusting your search or filters",
//     showing: "Showing",
//     of: "of",
//     propertiesCount: "properties",
//     viewProperty: "View Property",
//     propertyDetails: "Property Details",
//     propertyName: "Property Name",
//     description: "Description",
//     bedrooms: "Bedrooms",
//     bathrooms: "Bathrooms",
//     maxGuests: "Max Guests",
//     pricePerMonth: "Price per Month",
//     university: "University",
//     province: "Province",
//     district: "District",
//     sector: "Sector",
//     cell: "Cell",
//     village: "Village",
//     amenities: "Amenities",
//     availability: "Availability",
//     images: "Images",
//     close: "Close",
//     save: "Save",
//     saving: "Saving...",
//     create: "Create",
//     update: "Update",
//     name: "Name",
//     email: "Email",
//     phone: "Phone",
//     available: "Available",
//     unavailable: "Unavailable",
//     maintenance: "Maintenance",
//     pending: "Pending",
//     all: "All",
//     selectStatus: "Select Status",
//     enterName: "Enter property name",
//     enterDescription: "Enter property description",
//     enterPrice: "Enter price per month",
//     enterBedrooms: "Enter number of bedrooms",
//     enterBathrooms: "Enter number of bathrooms",
//     enterMaxGuests: "Enter maximum guests",
//     addAmenity: "Add Amenity",
//     remove: "Remove",
//     startDate: "Start Date",
//     endDate: "End Date",
//     provincePlaceholder: "Select province",
//     districtPlaceholder: "Enter district",
//     sectorPlaceholder: "Enter sector",
//     cellPlaceholder: "Enter cell",
//     villagePlaceholder: "Enter village",
//     hostName: "Host Name",
//     hostEmail: "Host Email",
//     hostPhone: "Host Phone",
//     responseRate: "Response Rate %",
//     responseTime: "Response Time",
//     uploadImages: "Upload Images",
//     dropImages: "Drop images here or click to upload",
//     imagePreview: "Image Preview",
//     addImage: "Add Image",
//     noImage: "No image",
//     selectFiles: "Select Files",
//     dragDrop: "Drag & drop images here",
//     loading: "Loading...",
//     validation: {
//       nameRequired: "Property name is required",
//       nameMinLength: "Name must be at least 3 characters",
//       nameMaxLength: "Name cannot exceed 100 characters",
//       descriptionRequired: "Description is required",
//       descriptionMinLength: "Description must be at least 20 characters",
//       descriptionMaxLength: "Description cannot exceed 2000 characters",
//       provinceRequired: "Province is required",
//       districtRequired: "District is required",
//       sectorRequired: "Sector is required",
//       cellRequired: "Cell is required",
//       villageRequired: "Village is required",
//       universityRequired: "University is required",
//       priceRequired: "Price is required",
//       priceMin: "Price must be greater than 0",
//       bedroomsRequired: "Bedrooms is required",
//       bedroomsMin: "Bedrooms must be at least 0",
//       bathroomsRequired: "Bathrooms is required",
//       bathroomsMin: "Bathrooms must be at least 0",
//       maxGuestsRequired: "Max guests is required",
//       maxGuestsMin: "Max guests must be at least 1",
//       hostNameRequired: "Host name is required",
//       hostEmailRequired: "Host email is required",
//       hostEmailInvalid: "Please enter a valid email",
//       imagesRequired: "At least one image is required",
//     },
//   },
//   fr: {
//     hostManagement: "Gestion des Hôtes",
//     manageHostProfile: "Gérez vos propriétés et annonces",
//     properties: "Propriétés",
//     addProperty: "Ajouter une Propriété",
//     editProperty: "Modifier la Propriété",
//     deleteProperty: "Supprimer la Propriété",
//     deleteConfirmation: "Êtes-vous sûr de vouloir supprimer cette propriété ?",
//     actionUndone: "Cette action est irréversible.",
//     cancel: "Annuler",
//     delete: "Supprimer",
//     deleting: "Suppression...",
//     propertyDeleted: "Propriété supprimée avec succès !",
//     deleteFailed: "Échec de la suppression de la propriété",
//     propertyCreated: "Propriété créée avec succès !",
//     propertyUpdated: "Propriété mise à jour avec succès !",
//     createFailed: "Échec de la création de la propriété",
//     updateFailed: "Échec de la mise à jour de la propriété",
//     totalProperties: "Total des Propriétés",
//     availableProperties: "Disponible",
//     pendingProperties: "En Attente",
//     unavailableProperties: "Indisponible",
//     maintenanceProperties: "Maintenance",
//     totalReviews: "Total des Avis",
//     rating: "Évaluation",
//     searchProperties: "Rechercher des propriétés...",
//     allStatus: "Tous les Statuts",
//     property: "Propriété",
//     location: "Emplacement",
//     status: "Statut",
//     price: "Prix",
//     actions: "Actions",
//     noProperties: "Aucune propriété trouvée",
//     adjustFilters: "Essayez d'ajuster votre recherche ou vos filtres",
//     showing: "Affichage",
//     of: "de",
//     propertiesCount: "propriétés",
//     viewProperty: "Voir la Propriété",
//     propertyDetails: "Détails de la Propriété",
//     propertyName: "Nom de la Propriété",
//     description: "Description",
//     bedrooms: "Chambres",
//     bathrooms: "Salles de Bain",
//     maxGuests: "Max Invités",
//     pricePerMonth: "Prix par Mois",
//     university: "Université",
//     province: "Province",
//     district: "District",
//     sector: "Secteur",
//     cell: "Cellule",
//     village: "Village",
//     amenities: "Équipements",
//     availability: "Disponibilité",
//     images: "Images",
//     close: "Fermer",
//     save: "Enregistrer",
//     saving: "Enregistrement...",
//     create: "Créer",
//     update: "Mettre à Jour",
//     name: "Nom",
//     email: "Email",
//     phone: "Téléphone",
//     available: "Disponible",
//     unavailable: "Indisponible",
//     maintenance: "Maintenance",
//     pending: "En Attente",
//     all: "Tous",
//     selectStatus: "Sélectionner le Statut",
//     enterName: "Entrez le nom de la propriété",
//     enterDescription: "Entrez la description de la propriété",
//     enterPrice: "Entrez le prix par mois",
//     enterBedrooms: "Entrez le nombre de chambres",
//     enterBathrooms: "Entrez le nombre de salles de bain",
//     enterMaxGuests: "Entrez le nombre maximum d'invités",
//     addAmenity: "Ajouter un Équipement",
//     remove: "Supprimer",
//     startDate: "Date de Début",
//     endDate: "Date de Fin",
//     provincePlaceholder: "Sélectionner la province",
//     districtPlaceholder: "Entrez le district",
//     sectorPlaceholder: "Entrez le secteur",
//     cellPlaceholder: "Entrez la cellule",
//     villagePlaceholder: "Entrez le village",
//     hostName: "Nom de l'Hôte",
//     hostEmail: "Email de l'Hôte",
//     hostPhone: "Téléphone de l'Hôte",
//     responseRate: "Taux de Réponse %",
//     responseTime: "Temps de Réponse",
//     uploadImages: "Télécharger des Images",
//     dropImages: "Déposez les images ici ou cliquez pour télécharger",
//     imagePreview: "Aperçu de l'Image",
//     addImage: "Ajouter une Image",
//     noImage: "Pas d'image",
//     selectFiles: "Sélectionner des Fichiers",
//     dragDrop: "Glissez-déposez les images ici",
//     loading: "Chargement...",
//     validation: {
//       nameRequired: "Le nom de la propriété est requis",
//       nameMinLength: "Le nom doit contenir au moins 3 caractères",
//       nameMaxLength: "Le nom ne peut pas dépasser 100 caractères",
//       descriptionRequired: "La description est requise",
//       descriptionMinLength:
//         "La description doit contenir au moins 20 caractères",
//       descriptionMaxLength:
//         "La description ne peut pas dépasser 2000 caractères",
//       provinceRequired: "La province est requise",
//       districtRequired: "Le district est requis",
//       sectorRequired: "Le secteur est requis",
//       cellRequired: "La cellule est requise",
//       villageRequired: "Le village est requis",
//       universityRequired: "L'université est requise",
//       priceRequired: "Le prix est requis",
//       priceMin: "Le prix doit être supérieur à 0",
//       bedroomsRequired: "Les chambres sont requises",
//       bedroomsMin: "Les chambres doivent être au moins 0",
//       bathroomsRequired: "Les salles de bain sont requises",
//       bathroomsMin: "Les salles de bain doivent être au moins 0",
//       maxGuestsRequired: "Le nombre max d'invités est requis",
//       maxGuestsMin: "Le nombre max d'invités doit être au moins 1",
//       hostNameRequired: "Le nom de l'hôte est requis",
//       hostEmailRequired: "L'email de l'hôte est requis",
//       hostEmailInvalid: "Veuillez entrer un email valide",
//       imagesRequired: "Au moins une image est requise",
//     },
//   },
//   rw: {
//     hostManagement: "Gucunga Amazu",
//     manageHostProfile: "Gucunga amazu yawe n'amatangazo",
//     properties: "Amazu",
//     addProperty: "Ongera Inzu",
//     editProperty: "Hindura Inzu",
//     deleteProperty: "Kuraho Inzu",
//     deleteConfirmation: "Uri kwizera ko ushaka gukuraho iyi nzu?",
//     actionUndone: "Iki gikorwa ntikishobora guhindurwa.",
//     cancel: "Reka",
//     delete: "Kuraho",
//     deleting: "Birakurwaho...",
//     propertyDeleted: "Inzu yakuweho neza!",
//     deleteFailed: "Kuraho inzu birananiranye",
//     propertyCreated: "Inzu yakozwe neza!",
//     propertyUpdated: "Inzu yavuguruwe neza!",
//     createFailed: "Kora inzu birananiranye",
//     updateFailed: "Kuvugurura inzu birananiranye",
//     totalProperties: "Amazu Yose",
//     availableProperties: "Irahari",
//     pendingProperties: "Bitegereje",
//     unavailableProperties: "Ntaho",
//     maintenanceProperties: "Muri Maintenance",
//     totalReviews: "Ibitekerezo Byose",
//     rating: "Amanota",
//     searchProperties: "Shakisha amazu...",
//     allStatus: "Ihagaze Ryose",
//     property: "Inzu",
//     location: "Aho Gihe",
//     status: "Ihagaze",
//     price: "Igiciro",
//     actions: "Ibikorwa",
//     noProperties: "Nta nzu yabonetse",
//     adjustFilters: "Gerageza guhindura uburyo ushakisha",
//     showing: "Bereka",
//     of: "muri",
//     propertiesCount: "amazu",
//     viewProperty: "Reba Inzu",
//     propertyDetails: "Ibisobanuro by'Inzu",
//     propertyName: "Izina ry'Inzu",
//     description: "Ibisobanuro",
//     bedrooms: "Ibyumba",
//     bathrooms: "Amazu y'isuku",
//     maxGuests: "Abashyitsi Benshi",
//     pricePerMonth: "Igiciro ku Kwezi",
//     university: "Kaminuza",
//     province: "Intara",
//     district: "Akarere",
//     sector: "Umurenge",
//     cell: "Akagari",
//     village: "Umudugudu",
//     amenities: "Ibikoresho",
//     availability: "Kuboneka",
//     images: "Amashusho",
//     close: "Funga",
//     save: "Bika",
//     saving: "Birabikwa...",
//     create: "Kora",
//     update: "Vugurura",
//     name: "Izina",
//     email: "Imeri",
//     phone: "Telefone",
//     available: "Irahari",
//     unavailable: "Ntaho",
//     maintenance: "Muri Maintenance",
//     pending: "Bitegereje",
//     all: "Byose",
//     selectStatus: "Hitamo Ihagaze",
//     enterName: "Andika izina ry'inzu",
//     enterDescription: "Andika ibisobanuro by'inzu",
//     enterPrice: "Andika igiciro ku kwezi",
//     enterBedrooms: "Andika umubare w'ibyumba",
//     enterBathrooms: "Andika umubare w'amazu y'isuku",
//     enterMaxGuests: "Andika umubare w'abashyitsi",
//     addAmenity: "Ongeraho Ibikoresho",
//     remove: "Kuraho",
//     startDate: "Itariki yo Gutangira",
//     endDate: "Itariki yo Kurangira",
//     provincePlaceholder: "Hitamo Intara",
//     districtPlaceholder: "Andika Akarere",
//     sectorPlaceholder: "Andika Umurenge",
//     cellPlaceholder: "Andika Akagari",
//     villagePlaceholder: "Andika Umudugudu",
//     hostName: "Izina ry'Umutambyi",
//     hostEmail: "Imeri y'Umutambyi",
//     hostPhone: "Telefone y'Umutambyi",
//     responseRate: "Ugusubiza %",
//     responseTime: "Igihe cyo Gusubiza",
//     uploadImages: "Ongeraho Amashusho",
//     dropImages: "Shyira amashusho hano cyangwa kanda guterura",
//     imagePreview: "Reba Ishusho",
//     addImage: "Ongeraho Ishusho",
//     noImage: "Nta shusho",
//     selectFiles: "Hitamo Amashusho",
//     dragDrop: "Kurura no gushyira amashusho hano",
//     loading: "Birakoreshwa...",
//     validation: {
//       nameRequired: "Izina ry'inzu rirasabwa",
//       nameMinLength: "Izina rigomba kugira byibura inyuguti 3",
//       nameMaxLength: "Izina ntirigomba kurenga inyuguti 100",
//       descriptionRequired: "Ibisobanuro birakenewe",
//       descriptionMinLength: "Ibisobanuro bigomba kugira byibura inyuguti 20",
//       descriptionMaxLength: "Ibisobanuro ntibigomba kurenga inyuguti 2000",
//       provinceRequired: "Intara irakenewe",
//       districtRequired: "Akarere gakenewe",
//       sectorRequired: "Umurenge urakenewe",
//       cellRequired: "Akagari gakenewe",
//       villageRequired: "Umudugudu urakenewe",
//       universityRequired: "Kaminuza irakenewe",
//       priceRequired: "Igiciro gikenewe",
//       priceMin: "Igiciro kigomba kuba kirenze 0",
//       bedroomsRequired: "Ibyumba birakenewe",
//       bedroomsMin: "Ibyumba bigomba kuba byibura 0",
//       bathroomsRequired: "Amazu y'isuku arakenewe",
//       bathroomsMin: "Amazu y'isuku agomba kuba byibura 0",
//       maxGuestsRequired: "Abashyitsi benshi barakenewe",
//       maxGuestsMin: "Abashyitsi benshi bagomba kuba byibura 1",
//       hostNameRequired: "Izina ry'umutambyi rirakenewe",
//       hostEmailRequired: "Imeri y'umutambyi irakenewe",
//       hostEmailInvalid: "Andika imeri ikwiye",
//       imagesRequired: "Byibura ishusho imwe irakenewe",
//     },
//   },
// };

// // ============================================================
// // HELPER FUNCTIONS - UPDATED to use localStorage
// // ============================================================
// const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
//   const lang = Cookies.get("language") as "en" | "fr" | "rw";
//   return lang || "en";
// };

// const getUserEmail = (): string => {
//   try {
//     const userStr = localStorage.getItem("user");
//     if (userStr) {
//       const user = JSON.parse(userStr);
//       return user.email || "";
//     }
//     return "";
//   } catch (error) {
//     console.error("Error reading user email from localStorage:", error);
//     return "";
//   }
// };

// const getUserName = (): string => {
//   try {
//     const userStr = localStorage.getItem("user");
//     if (userStr) {
//       const user = JSON.parse(userStr);
//       return user.name || "";
//     }
//     return "";
//   } catch (error) {
//     console.error("Error reading user name from localStorage:", error);
//     return "";
//   }
// };

// const getToken = (): string => {
//   try {
//     return localStorage.getItem("token") || "";
//   } catch (error) {
//     console.error("Error reading token from localStorage:", error);
//     return "";
//   }
// };

// // ============================================================
// // API SERVICE - UPDATED with token interceptor
// // ============================================================
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

// // House API functions
// const houseApi = {
//   getHouses: async (email: string): Promise<House[]> => {
//     const response = await api.get(`/houses/${email}`);
//     return response.data.data || [];
//   },

//   createHouse: async (formData: FormData): Promise<House> => {
//     const response = await api.post("/houses", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return response.data.data || response.data;
//   },

//   updateHouse: async (id: string, formData: FormData): Promise<House> => {
//     const response = await api.put(`/houses/${id}`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return response.data.data || response.data;
//   },

//   deleteHouse: async (id: string): Promise<void> => {
//     await api.delete(`/houses/${id}`);
//   },
// };

// // Icons
// const Icons = {
//   Home: () => (
//     <svg
//       className="w-6 h-6"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//         d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
//       />
//     </svg>
//   ),
//   Plus: () => (
//     <svg
//       className="w-5 h-5"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//         d="M12 4v16m8-8H4"
//       />
//     </svg>
//   ),
//   Edit: () => (
//     <svg
//       className="w-4 h-4"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//         d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
//       />
//     </svg>
//   ),
//   Delete: () => (
//     <svg
//       className="w-4 h-4"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//         d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//       />
//     </svg>
//   ),
//   View: () => (
//     <svg
//       className="w-4 h-4"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//       />
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//         d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//       />
//     </svg>
//   ),
//   Search: () => (
//     <svg
//       className="w-5 h-5"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//         d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//       />
//     </svg>
//   ),
//   Filter: () => (
//     <svg
//       className="w-5 h-5"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//         d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
//       />
//     </svg>
//   ),
//   Close: () => (
//     <svg
//       className="w-5 h-5"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//         d="M6 18L18 6M6 6l12 12"
//       />
//     </svg>
//   ),
//   Check: () => (
//     <svg
//       className="w-4 h-4"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//         d="M5 13l4 4L19 7"
//       />
//     </svg>
//   ),
//   Upload: () => (
//     <svg
//       className="w-8 h-8"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//         d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//       />
//     </svg>
//   ),
//   Bed: () => (
//     <svg
//       className="w-4 h-4"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//         d="M4 8h16M4 16h16M4 12h16M4 20h16"
//       />
//     </svg>
//   ),
//   Bath: () => (
//     <svg
//       className="w-4 h-4"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//         d="M5 5h14M5 5v14M5 5h14M5 19h14M5 19v-4M5 19H3M19 19v-4"
//       />
//     </svg>
//   ),
//   User: () => (
//     <svg
//       className="w-4 h-4"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//         d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//       />
//     </svg>
//   ),
//   Location: () => (
//     <svg
//       className="w-4 h-4"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//         d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//       />
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//         d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//       />
//     </svg>
//   ),
//   University: () => (
//     <svg
//       className="w-4 h-4"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//         d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2M12 3v4m4-2h.01M4 7h.01M8 7h.01M16 7h.01M4 11h16M4 15h16M4 19h16"
//       />
//     </svg>
//   ),
// };

// export const HostManagement: React.FC = () => {
//   const [lang, setLang] = useState<"en" | "fr" | "rw">(
//     getLanguageFromCookies(),
//   );
//   const userEmail = getUserEmail();
//   const userName = getUserName();

//   const [houses, setHouses] = useState<House[]>([]);
//   const [filteredHouses, setFilteredHouses] = useState<House[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState<string>("all");
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

//   // Modal states
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [selectedHouse, setSelectedHouse] = useState<House | null>(null);

//   // Form validation states
//   const [formErrors, setFormErrors] = useState<Record<string, string>>({});
//   const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
//     {},
//   );

//   // Image upload states
//   const [imageFiles, setImageFiles] = useState<File[]>([]);
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Property form state
//   const [propertyFormData, setPropertyFormData] = useState({
//     name: "",
//     description: "",
//     university: "",
//     location: {
//       province: "",
//       district: "",
//       sector: "",
//       cell: "",
//       village: "",
//     },
//     pricePerMonth: 0,
//     bedrooms: 1,
//     bathrooms: 1,
//     maxGuests: 2,
//     amenities: [] as string[],
//     status: "pending" as House["status"],
//     host: {
//       name: userName || "",
//       email: userEmail || "",
//       phone: "",
//       responseRate: 0,
//       responseTime: "24 hours",
//     },
//   });

//   const [amenityInput, setAmenityInput] = useState("");

//   // Statistics
//   const [stats, setStats] = useState({
//     total: 0,
//     available: 0,
//     pending: 0,
//     unavailable: 0,
//     maintenance: 0,
//     totalReviews: 0,
//     averageRating: 0,
//   });

//   const t = translations[lang];

//   // Listen for language changes
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newLang = getLanguageFromCookies();
//       if (newLang !== lang) setLang(newLang);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [lang]);

//   // Load houses with translation
//   const loadHouses = useCallback(async () => {
//     const email = getUserEmail();
//     console.log("🔍 Loading houses for email:", email);

//     if (!email) {
//       console.warn("⚠️ No email found in localStorage");
//       setLoading(false);
//       return;
//     }
//     try {
//       setLoading(true);
//       const data = await houseApi.getHouses(email);
//       console.log("✅ Houses loaded:", data);
      
//       // Translate house data if language is not English
//       let processedData = data;
//       if (lang !== 'en') {
//         console.log(`Translating ${data.length} houses to ${lang}...`);
//         const translatedHouses = [];
//         for (const house of data) {
//           try {
//             const translatedHouse = {
//               ...house,
//               name: await translateContent(house.name, lang),
//               description: await translateContent(house.description, lang),
//               university: await translateContent(house.university, lang),
//               location: {
//                 ...house.location,
//                 province: await translateContent(house.location.province, lang),
//                 district: await translateContent(house.location.district, lang),
//                 sector: await translateContent(house.location.sector, lang),
//                 cell: await translateContent(house.location.cell, lang),
//                 village: await translateContent(house.location.village, lang),
//               },
//               amenities: await Promise.all(
//                 house.amenities.map((amenity: string) => translateContent(amenity, lang))
//               ),
//               host: {
//                 ...house.host,
//                 name: await translateContent(house.host.name, lang),
//               },
//             };
//             translatedHouses.push(translatedHouse);
//           } catch (err) {
//             console.error('Error translating house:', house._id, err);
//             translatedHouses.push(house);
//           }
//         }
//         processedData = translatedHouses;
//         console.log('Translated houses count:', processedData.length);
//       }

//       const housesWithImages = processedData.map((house) => ({
//         ...house,
//         images: house.images || [],
//       }));
//       setHouses(housesWithImages);
//       setFilteredHouses(housesWithImages);
//     } catch (error) {
//       console.error("❌ Error loading houses:", error);
//       toast.error("Failed to load houses");
//     } finally {
//       setLoading(false);
//     }
//   }, [lang]);

//   useEffect(() => {
//     loadHouses();
//   }, [loadHouses, lang]);

//   // Filter houses
//   useEffect(() => {
//     let filtered = [...houses];
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       filtered = filtered.filter(
//         (h) =>
//           h.name.toLowerCase().includes(term) ||
//           h.university.toLowerCase().includes(term) ||
//           h.location.district.toLowerCase().includes(term) ||
//           h.location.village.toLowerCase().includes(term),
//       );
//     }
//     if (filterStatus !== "all") {
//       filtered = filtered.filter((h) => h.status === filterStatus);
//     }
//     setFilteredHouses(filtered);
//   }, [houses, searchTerm, filterStatus]);

//   // Update statistics
//   useEffect(() => {
//     setStats({
//       total: houses.length,
//       available: houses.filter((h) => h.status === "available").length,
//       pending: houses.filter((h) => h.status === "pending").length,
//       unavailable: houses.filter((h) => h.status === "unavailable").length,
//       maintenance: houses.filter((h) => h.status === "maintenance").length,
//       totalReviews: houses.reduce((sum, h) => sum + h.totalReviews, 0),
//       averageRating:
//         houses.length > 0
//           ? houses.reduce((sum, h) => sum + h.rating, 0) / houses.length
//           : 0,
//     });
//   }, [houses]);

//   // Get status badge
//   const getStatusColor = (status: string): string => {
//     const colors = {
//       available: "bg-green-100 text-green-800 border-green-200",
//       pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
//       unavailable: "bg-gray-100 text-gray-800 border-gray-200",
//       maintenance: "bg-red-100 text-red-800 border-red-200",
//     };
//     return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
//   };

//   const getStatusLabel = (status: string): string => {
//     const labels = {
//       available: t.available,
//       pending: t.pending,
//       unavailable: t.unavailable,
//       maintenance: t.maintenance,
//     };
//     return labels[status as keyof typeof labels] || status;
//   };

//   const formatCurrency = (amount: number): string => {
//     return `RWF ${amount.toLocaleString()}`;
//   };

//   // Amenity functions
//   const addAmenity = () => {
//     if (
//       amenityInput.trim() &&
//       !propertyFormData.amenities.includes(amenityInput.trim())
//     ) {
//       setPropertyFormData((prev) => ({
//         ...prev,
//         amenities: [...prev.amenities, amenityInput.trim()],
//       }));
//       setAmenityInput("");
//     }
//   };

//   const removeAmenity = (amenityToRemove: string) => {
//     setPropertyFormData((prev) => ({
//       ...prev,
//       amenities: prev.amenities.filter(
//         (amenity) => amenity !== amenityToRemove,
//       ),
//     }));
//   };

//   // Validate form
//   const validateForm = () => {
//     const errors: Record<string, string> = {};
//     const v = t.validation;

//     if (!propertyFormData.name.trim()) errors.name = v.nameRequired;
//     else if (propertyFormData.name.length < 3) errors.name = v.nameMinLength;
//     else if (propertyFormData.name.length > 100) errors.name = v.nameMaxLength;

//     if (!propertyFormData.description.trim())
//       errors.description = v.descriptionRequired;
//     else if (propertyFormData.description.length < 20)
//       errors.description = v.descriptionMinLength;
//     else if (propertyFormData.description.length > 2000)
//       errors.description = v.descriptionMaxLength;

//     if (!propertyFormData.location.province)
//       errors.province = v.provinceRequired;
//     if (!propertyFormData.location.district.trim())
//       errors.district = v.districtRequired;
//     if (!propertyFormData.location.sector.trim())
//       errors.sector = v.sectorRequired;
//     if (!propertyFormData.location.cell.trim()) errors.cell = v.cellRequired;
//     if (!propertyFormData.location.village.trim())
//       errors.village = v.villageRequired;

//     if (!propertyFormData.university.trim())
//       errors.university = v.universityRequired;

//     if (propertyFormData.pricePerMonth <= 0) errors.pricePerMonth = v.priceMin;

//     if (propertyFormData.bedrooms < 0) errors.bedrooms = v.bedroomsMin;
//     if (propertyFormData.bathrooms < 0) errors.bathrooms = v.bathroomsMin;
//     if (propertyFormData.maxGuests < 1) errors.maxGuests = v.maxGuestsMin;

//     if (!propertyFormData.host.name.trim())
//       errors.hostName = v.hostNameRequired;
//     if (!propertyFormData.host.email.trim())
//       errors.hostEmail = v.hostEmailRequired;
//     else if (!/\S+@\S+\.\S+/.test(propertyFormData.host.email))
//       errors.hostEmail = v.hostEmailInvalid;

//     if (imageFiles.length === 0 && !selectedHouse)
//       errors.images = v.imagesRequired;

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleFieldBlur = (field: string) => {
//     setTouchedFields((prev) => ({ ...prev, [field]: true }));
//   };

//   const hasError = (field: string): boolean => {
//     return touchedFields[field] && !!formErrors[field];
//   };

//   const isValidField = (field: string): boolean => {
//     return touchedFields[field] && !formErrors[field];
//   };

//   // Handle input change
//   const handleInputChange = (field: string, value: any) => {
//     const keys = field.split(".");
//     if (keys.length > 1) {
//       setPropertyFormData((prev) => ({
//         ...prev,
//         [keys[0]]: {
//           ...(prev[keys[0] as keyof typeof prev] as any),
//           [keys[1]]: value,
//         },
//       }));
//     } else {
//       setPropertyFormData((prev) => ({ ...prev, [field]: value }));
//     }
//     setFormErrors((prev) => {
//       const newErrors = { ...prev };
//       delete newErrors[field];
//       return newErrors;
//     });
//   };

//   const handleLocationChange = (field: string, value: string) => {
//     setPropertyFormData((prev) => ({
//       ...prev,
//       location: { ...prev.location, [field]: value },
//     }));
//     setFormErrors((prev) => {
//       const newErrors = { ...prev };
//       delete newErrors[field];
//       return newErrors;
//     });
//   };

//   // Image handling
//   const handleImageUpload = (files: FileList | null) => {
//     if (!files) return;
//     const fileArray = Array.from(files);
//     setImageFiles((prev) => [...prev, ...fileArray]);

//     fileArray.forEach((file) => {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setImagePreviews((prev) => [...prev, e.target?.result as string]);
//       };
//       reader.readAsDataURL(file);
//     });

//     setFormErrors((prev) => {
//       const newErrors = { ...prev };
//       delete newErrors.images;
//       return newErrors;
//     });
//   };

//   const removeImage = (index: number) => {
//     setImageFiles((prev) => prev.filter((_, i) => i !== index));
//     setImagePreviews((prev) => prev.filter((_, i) => i !== index));
//   };

//   // Create FormData for API
//   const createFormData = (): FormData => {
//     const formData = new FormData();

//     formData.append("name", propertyFormData.name);
//     formData.append("description", propertyFormData.description);
//     formData.append("university", propertyFormData.university);
//     formData.append("pricePerMonth", String(propertyFormData.pricePerMonth));
//     formData.append("bedrooms", String(propertyFormData.bedrooms));
//     formData.append("bathrooms", String(propertyFormData.bathrooms));
//     formData.append("maxGuests", String(propertyFormData.maxGuests));
//     formData.append("status", propertyFormData.status);

//     Object.entries(propertyFormData.location).forEach(([key, value]) => {
//       formData.append(`location[${key}]`, value);
//     });

//     Object.entries(propertyFormData.host).forEach(([key, value]) => {
//       formData.append(`host[${key}]`, String(value));
//     });

//     propertyFormData.amenities.forEach((amenity) => {
//       formData.append("amenities[]", amenity);
//     });

//     imageFiles.forEach((file) => {
//       formData.append("images", file);
//     });

//     return formData;
//   };

//   // CRUD Operations
//   const handleCreateProperty = async () => {
//     if (!validateForm()) {
//       toast.error("Please fix all validation errors");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const formData = createFormData();
//       const newHouse = await houseApi.createHouse(formData);
//       const houseWithImages = {
//         ...newHouse,
//         images: newHouse.images || [],
//       };
//       setHouses((prev) => [houseWithImages, ...prev]);
//       toast.success(`✅ ${t.propertyCreated}`);
//       setIsCreateModalOpen(false);
//       resetForm();
//     } catch (error) {
//       console.error("Error creating property:", error);
//       const axiosError = error as AxiosError;
//       const errorMessage = axiosError.response?.data
//         ? typeof axiosError.response?.data === "string"
//           ? axiosError.response?.data
//           : JSON.stringify(axiosError.response?.data)
//         : t.createFailed;
//       toast.error(`❌ ${errorMessage}`);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleUpdateProperty = async () => {
//     if (!selectedHouse) return;
//     if (!validateForm()) {
//       toast.error("Please fix all validation errors");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const formData = createFormData();
//       const updatedHouse = await houseApi.updateHouse(
//         selectedHouse._id!,
//         formData,
//       );
//       const houseWithImages = {
//         ...updatedHouse,
//         images: updatedHouse.images || [],
//       };
//       setHouses((prev) =>
//         prev.map((h) => (h._id === selectedHouse._id ? houseWithImages : h)),
//       );
//       toast.success(`✅ ${t.propertyUpdated}`);
//       setIsEditModalOpen(false);
//       setSelectedHouse(null);
//       resetForm();
//     } catch (error) {
//       console.error("Error updating property:", error);
//       const axiosError = error as AxiosError;
//       const errorMessage = axiosError.response?.data
//         ? typeof axiosError.response?.data === "string"
//           ? axiosError.response?.data
//           : JSON.stringify(axiosError.response?.data)
//         : t.updateFailed;
//       toast.error(`❌ ${errorMessage}`);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleDeleteProperty = async () => {
//     if (!selectedHouse) return;

//     setSubmitting(true);
//     try {
//       await houseApi.deleteHouse(selectedHouse._id!);
//       setHouses((prev) => prev.filter((h) => h._id !== selectedHouse._id));
//       toast.success(`🗑️ ${t.propertyDeleted}`);
//       setIsDeleteModalOpen(false);
//       setSelectedHouse(null);
//     } catch (error) {
//       console.error("Error deleting property:", error);
//       const axiosError = error as AxiosError;
//       toast.error(`❌ ${axiosError.response?.data || t.deleteFailed}`);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Reset form
//   const resetForm = () => {
//     setPropertyFormData({
//       name: "",
//       description: "",
//       university: "",
//       location: {
//         province: "",
//         district: "",
//         sector: "",
//         cell: "",
//         village: "",
//       },
//       pricePerMonth: 0,
//       bedrooms: 1,
//       bathrooms: 1,
//       maxGuests: 2,
//       amenities: [],
//       status: "pending",
//       host: {
//         name: userName || "",
//         email: userEmail || "",
//         phone: "",
//         responseRate: 0,
//         responseTime: "24 hours",
//       },
//     });
//     setImageFiles([]);
//     setImagePreviews([]);
//     setAmenityInput("");
//     setFormErrors({});
//     setTouchedFields({});
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   // Open modals
//   const openViewModal = (house: House) => {
//     setSelectedHouse(house);
//     setIsViewModalOpen(true);
//   };

//   const openEditModal = (house: House) => {
//     setSelectedHouse(house);
//     setPropertyFormData({
//       name: house.name,
//       description: house.description,
//       university: house.university,
//       location: house.location,
//       pricePerMonth: house.pricePerMonth,
//       bedrooms: house.bedrooms,
//       bathrooms: house.bathrooms,
//       maxGuests: house.maxGuests,
//       amenities: house.amenities || [],
//       status: house.status,
//       host: house.host,
//     });
//     setImageFiles([]);
//     setImagePreviews(house.images ? house.images.map((img) => img.url) : []);
//     setIsEditModalOpen(true);
//   };

//   const openDeleteModal = (house: House) => {
//     setSelectedHouse(house);
//     setIsDeleteModalOpen(true);
//   };

//   const openCreateModal = () => {
//     resetForm();
//     setIsCreateModalOpen(true);
//   };

//   // Render input with validation
//   const renderInput = (
//     label: string,
//     field: string,
//     type: string = "text",
//     placeholder: string = "",
//     required: boolean = true,
//     value?: string | number,
//     onChange?: (
//       e: React.ChangeEvent<
//         HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//       >,
//     ) => void,
//   ) => {
//     const fieldName = field.includes(".") ? field.split(".")[1] : field;
//     const error = formErrors[fieldName];
//     const isTouched = touchedFields[fieldName];
//     const isValid = isTouched && !error;

//     return (
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-1.5">
//           {label} {required && <span className="text-red-500">*</span>}
//         </label>
//         {type === "textarea" ? (
//           <textarea
//             value={(value as string) || ""}
//             onChange={onChange}
//             onBlur={() => handleFieldBlur(fieldName)}
//             rows={3}
//             className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm transition-all resize-none ${
//               hasError(fieldName)
//                 ? "border-red-500 bg-red-50"
//                 : isValid
//                   ? "border-green-500 bg-green-50"
//                   : "border-gray-300"
//             }`}
//             placeholder={placeholder}
//           />
//         ) : type === "select" ? (
//           <select
//             value={(value as string) || ""}
//             onChange={onChange}
//             onBlur={() => handleFieldBlur(fieldName)}
//             className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white transition-all ${
//               hasError(fieldName)
//                 ? "border-red-500 bg-red-50"
//                 : isValid
//                   ? "border-green-500 bg-green-50"
//                   : "border-gray-300"
//             }`}
//           >
//             {placeholder && <option value="">{placeholder}</option>}
//             {onChange && (onChange as any).options}
//           </select>
//         ) : (
//           <input
//             type={type}
//             value={(value as string) || ""}
//             onChange={onChange}
//             onBlur={() => handleFieldBlur(fieldName)}
//             className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm transition-all ${
//               hasError(fieldName)
//                 ? "border-red-500 bg-red-50"
//                 : isValid
//                   ? "border-green-500 bg-green-50"
//                   : "border-gray-300"
//             }`}
//             placeholder={placeholder}
//             min={type === "number" ? 0 : undefined}
//           />
//         )}
//         {hasError(fieldName) && (
//           <p className="mt-1 text-sm text-red-500">{error}</p>
//         )}
//         {isValid && (
//           <p className="mt-1 text-sm text-green-500 flex items-center gap-1">
//             <Icons.Check /> Valid
//           </p>
//         )}
//       </div>
//     );
//   };

//   // Modal variants
//   const modalVariants = {
//     hidden: { opacity: 0, scale: 0.9, y: 20 },
//     visible: { opacity: 1, scale: 1, y: 0 },
//     exit: { opacity: 0, scale: 0.9, y: 20 },
//   };

//   const overlayVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1 },
//     exit: { opacity: 0 },
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <div className="w-16 h-16 border-4 border-[#FF385C] border-t-transparent rounded-full animate-spin"></div>
//         <p className="ml-4 text-gray-500">{t.loading}</p>
//       </div>
//     );
//   }

//   const isFormValid =
//     Object.keys(formErrors).length === 0 &&
//     (imageFiles.length > 0 ||
//       (selectedHouse &&
//         selectedHouse.images &&
//         selectedHouse.images.length > 0)) &&
//     propertyFormData.name.trim().length >= 3 &&
//     propertyFormData.description.trim().length >= 20;

//   return (
//     <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 flex items-center gap-3">
//               <span className="p-2 bg-[#FF385C]/10 rounded-2xl">
//                 <Icons.Home />
//               </span>
//               {t.hostManagement}
//             </h1>
//             <p className="text-sm text-gray-500 mt-1 ml-2">
//               {t.manageHostProfile}
//             </p>
//           </div>
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={openCreateModal}
//             className="px-6 py-3 bg-gradient-to-r from-[#FF385C] to-[#E31C5F] text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2"
//           >
//             <Icons.Plus />
//             {t.addProperty}
//           </motion.button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 mb-8">
//         {[
//           {
//             label: t.totalProperties,
//             value: stats.total,
//             color: "bg-gradient-to-br from-blue-500 to-blue-600",
//           },
//           {
//             label: t.availableProperties,
//             value: stats.available,
//             color: "bg-gradient-to-br from-green-500 to-green-600",
//           },
//           {
//             label: t.pendingProperties,
//             value: stats.pending,
//             color: "bg-gradient-to-br from-yellow-500 to-yellow-600",
//           },
//           {
//             label: t.unavailableProperties,
//             value: stats.unavailable,
//             color: "bg-gradient-to-br from-gray-500 to-gray-600",
//           },
//           {
//             label: t.maintenanceProperties,
//             value: stats.maintenance,
//             color: "bg-gradient-to-br from-red-500 to-red-600",
//           },
//           {
//             label: t.totalReviews,
//             value: stats.totalReviews,
//             color: "bg-gradient-to-br from-purple-500 to-purple-600",
//           },
//           {
//             label: t.rating,
//             value: stats.averageRating.toFixed(1),
//             color: "bg-gradient-to-br from-orange-500 to-orange-600",
//           },
//         ].map((stat, index) => (
//           <motion.div
//             key={index}
//             whileHover={{ y: -2, scale: 1.02 }}
//             className={`${stat.color} rounded-xl p-3 shadow-lg text-white`}
//           >
//             <p className="text-xs opacity-90">{stat.label}</p>
//             <p className="text-2xl font-bold">{stat.value}</p>
//           </motion.div>
//         ))}
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 mb-6">
//         <div className="flex flex-col sm:flex-row gap-3">
//           <div className="flex-1 relative">
//             <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//               <Icons.Search />
//             </span>
//             <input
//               type="text"
//               placeholder={t.searchProperties}
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//             />
//           </div>
//           <div className="flex gap-2">
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//             >
//               <option value="all">{t.allStatus}</option>
//               <option value="available">{t.available}</option>
//               <option value="pending">{t.pending}</option>
//               <option value="unavailable">{t.unavailable}</option>
//               <option value="maintenance">{t.maintenance}</option>
//             </select>
//             <button
//               onClick={() => {
//                 setSearchTerm("");
//                 setFilterStatus("all");
//               }}
//               className="px-4 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
//             >
//               <Icons.Filter />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Properties Grid */}
//       {filteredHouses.length === 0 ? (
//         <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-100">
//           <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
//             <Icons.Home />
//           </div>
//           <h3 className="text-xl font-semibold text-gray-900 mb-2">
//             {t.noProperties}
//           </h3>
//           <p className="text-gray-500">{t.adjustFilters}</p>
//           <button
//             onClick={openCreateModal}
//             className="mt-4 px-6 py-2.5 bg-[#FF385C] text-white rounded-xl hover:bg-[#E31C5F] transition-all"
//           >
//             {t.addProperty}
//           </button>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredHouses.map((house) => (
//             <motion.div
//               key={house._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               whileHover={{ y: -4 }}
//               className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all"
//             >
//               <div className="relative h-48 overflow-hidden">
//                 <img
//                   src={
//                     house.images && house.images.length > 0
//                       ? house.images[0].url
//                       : "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"
//                   }
//                   alt={house.name}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute top-3 right-3">
//                   <span
//                     className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(house.status)}`}
//                   >
//                     {getStatusLabel(house.status)}
//                   </span>
//                 </div>
//                 {house.rating > 0 && (
//                   <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-sm flex items-center gap-1">
//                     ⭐ {house.rating.toFixed(1)}
//                   </div>
//                 )}
//               </div>
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-900 truncate">
//                   {house.name}
//                 </h3>
//                 <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
//                   <Icons.Location />
//                   {house.location.village}, {house.location.district}
//                 </p>
//                 <div className="flex items-center gap-2 mt-2 text-sm">
//                   <span className="flex items-center gap-1 text-gray-600">
//                     <Icons.Bed /> {house.bedrooms}
//                   </span>
//                   <span className="text-gray-300">|</span>
//                   <span className="flex items-center gap-1 text-gray-600">
//                     <Icons.Bath /> {house.bathrooms}
//                   </span>
//                   <span className="text-gray-300">|</span>
//                   <span className="flex items-center gap-1 text-gray-600">
//                     <Icons.User /> {house.maxGuests}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
//                   <div>
//                     <p className="text-sm font-bold text-[#FF385C]">
//                       {formatCurrency(house.pricePerMonth)}
//                     </p>
//                     <p className="text-xs text-gray-500">per month</p>
//                   </div>
//                   <div className="flex gap-1">
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => openViewModal(house)}
//                       className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
//                     >
//                       <Icons.View />
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => openEditModal(house)}
//                       className="p-2 text-green-600 hover:bg-green-50 rounded-xl transition-all"
//                     >
//                       <Icons.Edit />
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => openDeleteModal(house)}
//                       className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all"
//                     >
//                       <Icons.Delete />
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}

//       {/* View Property Modal */}
//       <AnimatePresence>
//         {isViewModalOpen && selectedHouse && (
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
//                 <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl">
//                   <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//                     <Icons.Home />
//                     {t.propertyDetails}
//                   </h2>
//                   <motion.button
//                     whileHover={{ rotate: 90 }}
//                     onClick={() => setIsViewModalOpen(false)}
//                     className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
//                   >
//                     <Icons.Close />
//                   </motion.button>
//                 </div>
//                 <div className="p-6 space-y-4">
//                   {selectedHouse.images && selectedHouse.images.length > 0 ? (
//                     <div className="grid grid-cols-2 gap-2">
//                       {selectedHouse.images.map((img, index) => (
//                         <img
//                           key={index}
//                           src={img.url}
//                           alt={selectedHouse.name}
//                           className={`rounded-xl object-cover h-48 ${index === 0 ? "col-span-2" : ""}`}
//                         />
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="bg-gray-100 rounded-xl h-48 flex items-center justify-center">
//                       <p className="text-gray-500">No images available</p>
//                     </div>
//                   )}
//                   <h3 className="text-2xl font-bold text-gray-900">
//                     {selectedHouse.name}
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-sm font-medium text-gray-500">
//                         {t.status}
//                       </p>
//                       <span
//                         className={`px-2.5 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedHouse.status)}`}
//                       >
//                         {getStatusLabel(selectedHouse.status)}
//                       </span>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-500">
//                         {t.pricePerMonth}
//                       </p>
//                       <p className="text-lg font-bold text-[#FF385C]">
//                         {formatCurrency(selectedHouse.pricePerMonth)}
//                       </p>
//                     </div>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">
//                       {t.description}
//                     </p>
//                     <p className="text-sm text-gray-700 mt-1">
//                       {selectedHouse.description}
//                     </p>
//                   </div>
//                   <div className="grid grid-cols-3 gap-4">
//                     <div>
//                       <p className="text-sm font-medium text-gray-500">
//                         {t.bedrooms}
//                       </p>
//                       <p className="text-lg font-semibold">
//                         {selectedHouse.bedrooms}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-500">
//                         {t.bathrooms}
//                       </p>
//                       <p className="text-lg font-semibold">
//                         {selectedHouse.bathrooms}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-500">
//                         {t.maxGuests}
//                       </p>
//                       <p className="text-lg font-semibold">
//                         {selectedHouse.maxGuests}
//                       </p>
//                     </div>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">
//                       {t.location}
//                     </p>
//                     <p className="text-sm text-gray-700">
//                       {selectedHouse.location.village},{" "}
//                       {selectedHouse.location.sector},<br />
//                       {selectedHouse.location.district},{" "}
//                       {selectedHouse.location.province}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">
//                       {t.amenities}
//                     </p>
//                     <div className="flex flex-wrap gap-1 mt-1">
//                       {selectedHouse.amenities &&
//                       selectedHouse.amenities.length > 0 ? (
//                         selectedHouse.amenities.map((amenity) => (
//                           <span
//                             key={amenity}
//                             className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
//                           >
//                             {amenity}
//                           </span>
//                         ))
//                       ) : (
//                         <span className="text-sm text-gray-400">
//                           No amenities
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex gap-3 pt-4 border-t border-gray-200">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => {
//                         setIsViewModalOpen(false);
//                         openEditModal(selectedHouse);
//                       }}
//                       className="px-4 py-2.5 bg-[#FF385C] text-white rounded-xl hover:bg-[#E31C5F] transition-colors flex items-center gap-2"
//                     >
//                       <Icons.Edit /> {t.editProperty}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => {
//                         setIsViewModalOpen(false);
//                         openDeleteModal(selectedHouse);
//                       }}
//                       className="px-4 py-2.5 border border-red-300 text-red-600 rounded-xl hover:bg-red-50 transition-colors flex items-center gap-2"
//                     >
//                       <Icons.Delete /> {t.delete}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => setIsViewModalOpen(false)}
//                       className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors ml-auto"
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

//       {/* Create/Edit Property Modal */}
//       <AnimatePresence>
//         {(isCreateModalOpen || isEditModalOpen) && (
//           <>
//             <motion.div
//               variants={overlayVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
//               onClick={() => {
//                 setIsCreateModalOpen(false);
//                 setIsEditModalOpen(false);
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
//               <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
//                 <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl">
//                   <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//                     {isEditModalOpen ? <Icons.Edit /> : <Icons.Plus />}
//                     {isEditModalOpen ? t.editProperty : t.addProperty}
//                   </h2>
//                   <motion.button
//                     whileHover={{ rotate: 90 }}
//                     onClick={() => {
//                       setIsCreateModalOpen(false);
//                       setIsEditModalOpen(false);
//                       resetForm();
//                     }}
//                     className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
//                   >
//                     <Icons.Close />
//                   </motion.button>
//                 </div>
//                 <div className="p-6 space-y-4">
//                   {/* Basic Information */}
//                   {renderInput(
//                     t.propertyName,
//                     "name",
//                     "text",
//                     t.enterName,
//                     true,
//                     propertyFormData.name,
//                     (e) =>
//                       handleInputChange(
//                         "name",
//                         (e.target as HTMLInputElement).value,
//                       ),
//                   )}
//                   {renderInput(
//                     t.description,
//                     "description",
//                     "textarea",
//                     t.enterDescription,
//                     true,
//                     propertyFormData.description,
//                     (e) =>
//                       handleInputChange(
//                         "description",
//                         (e.target as HTMLTextAreaElement).value,
//                       ),
//                   )}
//                   {renderInput(
//                     t.university,
//                     "university",
//                     "text",
//                     "Enter university name",
//                     true,
//                     propertyFormData.university,
//                     (e) =>
//                       handleInputChange(
//                         "university",
//                         (e.target as HTMLInputElement).value,
//                       ),
//                   )}

//                   {/* Location */}
//                   <div className="border-t border-gray-200 pt-4">
//                     <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
//                       <Icons.Location /> {t.location}
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                           {t.province} <span className="text-red-500">*</span>
//                         </label>
//                         <select
//                           value={propertyFormData.location.province}
//                           onChange={(e) =>
//                             handleLocationChange("province", e.target.value)
//                           }
//                           onBlur={() => handleFieldBlur("province")}
//                           className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white transition-all ${
//                             hasError("province")
//                               ? "border-red-500 bg-red-50"
//                               : isValidField("province")
//                                 ? "border-green-500 bg-green-50"
//                                 : "border-gray-300"
//                           }`}
//                         >
//                           <option value="">{t.provincePlaceholder}</option>
//                           <option value="Kigali">Kigali</option>
//                           <option value="Northern">Northern</option>
//                           <option value="Southern">Southern</option>
//                           <option value="Eastern">Eastern</option>
//                           <option value="Western">Western</option>
//                         </select>
//                         {hasError("province") && (
//                           <p className="mt-1 text-sm text-red-500">
//                             {formErrors.province}
//                           </p>
//                         )}
//                         {isValidField("province") && (
//                           <p className="mt-1 text-sm text-green-500 flex items-center gap-1">
//                             <Icons.Check /> Valid
//                           </p>
//                         )}
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                           {t.district} <span className="text-red-500">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           value={propertyFormData.location.district}
//                           onChange={(e) =>
//                             handleLocationChange("district", e.target.value)
//                           }
//                           onBlur={() => handleFieldBlur("district")}
//                           placeholder={t.districtPlaceholder}
//                           className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm transition-all ${
//                             hasError("district")
//                               ? "border-red-500 bg-red-50"
//                               : isValidField("district")
//                                 ? "border-green-500 bg-green-50"
//                                 : "border-gray-300"
//                           }`}
//                         />
//                         {hasError("district") && (
//                           <p className="mt-1 text-sm text-red-500">
//                             {formErrors.district}
//                           </p>
//                         )}
//                         {isValidField("district") && (
//                           <p className="mt-1 text-sm text-green-500 flex items-center gap-1">
//                             <Icons.Check /> Valid
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                           {t.sector} <span className="text-red-500">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           value={propertyFormData.location.sector}
//                           onChange={(e) =>
//                             handleLocationChange("sector", e.target.value)
//                           }
//                           onBlur={() => handleFieldBlur("sector")}
//                           placeholder={t.sectorPlaceholder}
//                           className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm transition-all ${
//                             hasError("sector")
//                               ? "border-red-500 bg-red-50"
//                               : isValidField("sector")
//                                 ? "border-green-500 bg-green-50"
//                                 : "border-gray-300"
//                           }`}
//                         />
//                         {hasError("sector") && (
//                           <p className="mt-1 text-sm text-red-500">
//                             {formErrors.sector}
//                           </p>
//                         )}
//                         {isValidField("sector") && (
//                           <p className="mt-1 text-sm text-green-500 flex items-center gap-1">
//                             <Icons.Check /> Valid
//                           </p>
//                         )}
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                           {t.cell} <span className="text-red-500">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           value={propertyFormData.location.cell}
//                           onChange={(e) =>
//                             handleLocationChange("cell", e.target.value)
//                           }
//                           onBlur={() => handleFieldBlur("cell")}
//                           placeholder={t.cellPlaceholder}
//                           className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm transition-all ${
//                             hasError("cell")
//                               ? "border-red-500 bg-red-50"
//                               : isValidField("cell")
//                                 ? "border-green-500 bg-green-50"
//                                 : "border-gray-300"
//                           }`}
//                         />
//                         {hasError("cell") && (
//                           <p className="mt-1 text-sm text-red-500">
//                             {formErrors.cell}
//                           </p>
//                         )}
//                         {isValidField("cell") && (
//                           <p className="mt-1 text-sm text-green-500 flex items-center gap-1">
//                             <Icons.Check /> Valid
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                     <div className="mt-3">
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         {t.village} <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         value={propertyFormData.location.village}
//                         onChange={(e) =>
//                           handleLocationChange("village", e.target.value)
//                         }
//                         onBlur={() => handleFieldBlur("village")}
//                         placeholder={t.villagePlaceholder}
//                         className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm transition-all ${
//                           hasError("village")
//                             ? "border-red-500 bg-red-50"
//                             : isValidField("village")
//                               ? "border-green-500 bg-green-50"
//                               : "border-gray-300"
//                         }`}
//                       />
//                       {hasError("village") && (
//                         <p className="mt-1 text-sm text-red-500">
//                           {formErrors.village}
//                         </p>
//                       )}
//                       {isValidField("village") && (
//                         <p className="mt-1 text-sm text-green-500 flex items-center gap-1">
//                           <Icons.Check /> Valid
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Pricing and Details */}
//                   <div className="border-t border-gray-200 pt-4">
//                     <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
//                       <svg
//                         className="w-4 h-4"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0 3V9m0 6V15m0 6v-3"
//                         />
//                       </svg>
//                       Pricing & Details
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                       {renderInput(
//                         t.pricePerMonth,
//                         "pricePerMonth",
//                         "number",
//                         t.enterPrice,
//                         true,
//                         propertyFormData.pricePerMonth,
//                         (e) =>
//                           handleInputChange(
//                             "pricePerMonth",
//                             parseFloat((e.target as HTMLInputElement).value) ||
//                               0,
//                           ),
//                       )}
//                       {renderInput(
//                         t.bedrooms,
//                         "bedrooms",
//                         "number",
//                         t.enterBedrooms,
//                         true,
//                         propertyFormData.bedrooms,
//                         (e) =>
//                           handleInputChange(
//                             "bedrooms",
//                             parseInt((e.target as HTMLInputElement).value) || 0,
//                           ),
//                       )}
//                       {renderInput(
//                         t.bathrooms,
//                         "bathrooms",
//                         "number",
//                         t.enterBathrooms,
//                         true,
//                         propertyFormData.bathrooms,
//                         (e) =>
//                           handleInputChange(
//                             "bathrooms",
//                             parseInt((e.target as HTMLInputElement).value) || 0,
//                           ),
//                       )}
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
//                       {renderInput(
//                         t.maxGuests,
//                         "maxGuests",
//                         "number",
//                         t.enterMaxGuests,
//                         true,
//                         propertyFormData.maxGuests,
//                         (e) =>
//                           handleInputChange(
//                             "maxGuests",
//                             parseInt((e.target as HTMLInputElement).value) || 0,
//                           ),
//                       )}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                           {t.status} <span className="text-red-500">*</span>
//                         </label>
//                         <select
//                           value={propertyFormData.status}
//                           onChange={(e) =>
//                             handleInputChange("status", e.target.value)
//                           }
//                           className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//                         >
//                           <option value="pending">{t.pending}</option>
//                           <option value="available">{t.available}</option>
//                           <option value="unavailable">{t.unavailable}</option>
//                           <option value="maintenance">{t.maintenance}</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Host Information */}
//                   <div className="border-t border-gray-200 pt-4">
//                     <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
//                       <Icons.User /> Host Information
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                       {renderInput(
//                         t.hostName,
//                         "hostName",
//                         "text",
//                         "Enter host name",
//                         true,
//                         propertyFormData.host.name,
//                         (e) =>
//                           handleInputChange(
//                             "host.name",
//                             (e.target as HTMLInputElement).value,
//                           ),
//                       )}
//                       {renderInput(
//                         t.hostEmail,
//                         "hostEmail",
//                         "email",
//                         "Enter host email",
//                         true,
//                         propertyFormData.host.email,
//                         (e) =>
//                           handleInputChange(
//                             "host.email",
//                             (e.target as HTMLInputElement).value,
//                           ),
//                       )}
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
//                       {renderInput(
//                         t.hostPhone,
//                         "hostPhone",
//                         "text",
//                         "Enter host phone",
//                         false,
//                         propertyFormData.host.phone,
//                         (e) =>
//                           handleInputChange(
//                             "host.phone",
//                             (e.target as HTMLInputElement).value,
//                           ),
//                       )}
//                       {renderInput(
//                         t.responseRate,
//                         "responseRate",
//                         "number",
//                         "0-100",
//                         false,
//                         propertyFormData.host.responseRate,
//                         (e) =>
//                           handleInputChange(
//                             "host.responseRate",
//                             parseFloat((e.target as HTMLInputElement).value) ||
//                               0,
//                           ),
//                       )}
//                     </div>
//                   </div>

//                   {/* Amenities */}
//                   <div className="border-t border-gray-200 pt-4">
//                     <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
//                       <svg
//                         className="w-4 h-4"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M5 13l4 4L19 7"
//                         />
//                       </svg>
//                       {t.amenities}
//                     </h3>
//                     <div className="flex gap-2">
//                       <input
//                         type="text"
//                         value={amenityInput}
//                         onChange={(e) => setAmenityInput(e.target.value)}
//                         onKeyPress={(e) => e.key === "Enter" && addAmenity()}
//                         className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//                         placeholder="Add amenity..."
//                       />
//                       <button
//                         onClick={addAmenity}
//                         className="px-4 py-2.5 bg-[#FF385C] text-white rounded-xl hover:bg-[#E31C5F] transition-colors"
//                       >
//                         <Icons.Plus />
//                       </button>
//                     </div>
//                     <div className="mt-2 flex flex-wrap gap-1.5">
//                       {propertyFormData.amenities.map((amenity) => (
//                         <span
//                           key={amenity}
//                           className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs flex items-center gap-1.5 border border-blue-200"
//                         >
//                           {amenity}
//                           <button
//                             onClick={() => removeAmenity(amenity)}
//                             className="hover:text-red-500"
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
//                         </span>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Image Upload */}
//                   <div className="border-t border-gray-200 pt-4">
//                     <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
//                       <Icons.Upload /> {t.uploadImages}{" "}
//                       <span className="text-red-500">*</span>
//                     </h3>
//                     <div
//                       className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
//                         hasError("images")
//                           ? "border-red-500 bg-red-50"
//                           : imageFiles.length > 0 || imagePreviews.length > 0
//                             ? "border-green-500 bg-green-50"
//                             : "border-gray-300 hover:border-[#FF385C] hover:bg-gray-50"
//                       }`}
//                       onClick={() => fileInputRef.current?.click()}
//                       onDrop={(e) => {
//                         e.preventDefault();
//                         handleImageUpload(e.dataTransfer.files);
//                       }}
//                       onDragOver={(e) => e.preventDefault()}
//                     >
//                       <input
//                         ref={fileInputRef}
//                         type="file"
//                         multiple
//                         accept="image/*"
//                         className="hidden"
//                         onChange={(e) => handleImageUpload(e.target.files)}
//                       />
//                       <Icons.Upload />
//                       <p className="mt-2 text-sm text-gray-600">{t.dragDrop}</p>
//                       <p className="text-xs text-gray-400 mt-1">
//                         PNG, JPG, JPEG up to 5MB
//                       </p>
//                     </div>
//                     {(imagePreviews.length > 0 ||
//                       (selectedHouse &&
//                         selectedHouse.images &&
//                         selectedHouse.images.length > 0)) && (
//                       <div className="mt-3 grid grid-cols-4 gap-2">
//                         {imagePreviews.map((preview, index) => (
//                           <div key={index} className="relative group">
//                             <img
//                               src={preview}
//                               alt={`Preview ${index}`}
//                               className="w-full h-20 object-cover rounded-xl"
//                             />
//                             <button
//                               onClick={() => removeImage(index)}
//                               className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
//                             >
//                               <svg
//                                 className="w-3.5 h-3.5"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth="2"
//                                   d="M6 18L18 6M6 6l12 12"
//                                 />
//                               </svg>
//                             </button>
//                           </div>
//                         ))}
//                         {selectedHouse &&
//                           selectedHouse.images &&
//                           selectedHouse.images.map((img, index) => (
//                             <div
//                               key={`existing-${index}`}
//                               className="relative group"
//                             >
//                               <img
//                                 src={img.url}
//                                 alt={`Existing ${index}`}
//                                 className="w-full h-20 object-cover rounded-xl"
//                               />
//                             </div>
//                           ))}
//                       </div>
//                     )}
//                     {hasError("images") && (
//                       <p className="mt-1 text-sm text-red-500">
//                         {formErrors.images}
//                       </p>
//                     )}
//                   </div>

//                   <div className="flex gap-3 pt-4 border-t border-gray-200">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={
//                         isEditModalOpen
//                           ? handleUpdateProperty
//                           : handleCreateProperty
//                       }
//                       disabled={submitting || !isFormValid}
//                       className={`flex-1 px-6 py-3 rounded-xl text-white font-medium transition-all flex items-center justify-center gap-2 ${(
//                         submitting || !isFormValid
//                       ) ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-[#FF385C] to-[#E31C5F] hover:shadow-lg"}`}
//                     >
//                       {submitting ? (
//                         <>
//                           <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           {t.saving}
//                         </>
//                       ) : (
//                         <>
//                           {isEditModalOpen ? <Icons.Edit /> : <Icons.Plus />}
//                           {isEditModalOpen ? t.update : t.create}
//                         </>
//                       )}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => {
//                         setIsCreateModalOpen(false);
//                         setIsEditModalOpen(false);
//                         resetForm();
//                       }}
//                       className="flex-1 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
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
//         {isDeleteModalOpen && selectedHouse && (
//           <>
//             <motion.div
//               variants={overlayVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
//               onClick={() => {
//                 setIsDeleteModalOpen(false);
//                 setSelectedHouse(null);
//               }}
//             />
//             <motion.div
//               variants={modalVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 z-[101] flex items-center justify-center p-4"
//             >
//               <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white">
//                 <div className="p-6 text-center">
//                   <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
//                     <Icons.Delete />
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                     {t.deleteProperty}
//                   </h3>
//                   <p className="text-gray-500 mb-2">{t.deleteConfirmation}</p>
//                   <p className="text-sm text-gray-400">{t.actionUndone}</p>
//                   <div className="flex gap-3 mt-6">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => {
//                         setIsDeleteModalOpen(false);
//                         setSelectedHouse(null);
//                       }}
//                       className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
//                     >
//                       {t.cancel}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handleDeleteProperty}
//                       disabled={submitting}
//                       className={`flex-1 px-4 py-2.5 rounded-xl text-white font-medium transition-colors ${
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
//     </div>
//   );
// };














/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";

// API Base URL
const API_BASE_URL = "https://rene-inyumba-nodejs.onrender.com";

// ============================================================
// TRANSLATION HELPER - Google Translate API
// ============================================================

const translateContent = async (text: string, targetLang: string): Promise<string> => {
  if (!text || targetLang === 'en') return text;
  if (targetLang === 'rw' || targetLang === 'fr') {
    try {
      const response = await axios.post(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
      );
      if (response.data && response.data[0] && response.data[0][0]) {
        return response.data[0][0][0] || text;
      }
      return text;
    } catch (error) {
      console.error('Translation error for text:', text, error);
      return text;
    }
  }
  return text;
};

// Types based on the House model
interface Host {
  name: string;
  email: string;
  phone: string;
  responseRate: number;
  responseTime: string;
}

interface Location {
  province: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface Image {
  public_id: string;
  url: string;
  secure_url: string;
  file?: File;
}

interface Availability {
  startDate: string;
  endDate: string;
}

interface House {
  _id?: string;
  houseId: string;
  name: string;
  description: string;
  images: Image[];
  location: Location;
  university: string;
  pricePerMonth: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  amenities: string[];
  status: "available" | "pending" | "unavailable" | "maintenance";
  rating: number;
  totalReviews: number;
  host: Host;
  availability: Availability;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Translations
const translations = {
  en: {
    hostManagement: "Host Management",
    manageHostProfile: "Manage your properties and listings",
    properties: "Properties",
    addProperty: "Add Property",
    editProperty: "Edit Property",
    deleteProperty: "Delete Property",
    deleteConfirmation: "Are you sure you want to delete this property?",
    actionUndone: "This action cannot be undone.",
    cancel: "Cancel",
    delete: "Delete",
    deleting: "Deleting...",
    propertyDeleted: "Property deleted successfully!",
    deleteFailed: "Failed to delete property",
    propertyCreated: "Property created successfully!",
    propertyUpdated: "Property updated successfully!",
    createFailed: "Failed to create property",
    updateFailed: "Failed to update property",
    totalProperties: "Total Properties",
    availableProperties: "Available",
    pendingProperties: "Pending",
    unavailableProperties: "Unavailable",
    maintenanceProperties: "Maintenance",
    totalReviews: "Total Reviews",
    rating: "Rating",
    searchProperties: "Search properties...",
    allStatus: "All Status",
    property: "Property",
    location: "Location",
    status: "Status",
    price: "Price",
    actions: "Actions",
    noProperties: "No properties found",
    adjustFilters: "Try adjusting your search or filters",
    showing: "Showing",
    of: "of",
    propertiesCount: "properties",
    viewProperty: "View Property",
    propertyDetails: "Property Details",
    propertyName: "Property Name",
    description: "Description",
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    maxGuests: "Max Guests",
    pricePerMonth: "Price per Month",
    university: "University",
    province: "Province",
    district: "District",
    sector: "Sector",
    cell: "Cell",
    village: "Village",
    amenities: "Amenities",
    availability: "Availability",
    images: "Images",
    close: "Close",
    save: "Save",
    saving: "Saving...",
    create: "Create",
    update: "Update",
    name: "Name",
    email: "Email",
    phone: "Phone",
    available: "Available",
    unavailable: "Unavailable",
    maintenance: "Maintenance",
    pending: "Pending",
    all: "All",
    selectStatus: "Select Status",
    enterName: "Enter property name",
    enterDescription: "Enter property description",
    enterPrice: "Enter price per month",
    enterBedrooms: "Enter number of bedrooms",
    enterBathrooms: "Enter number of bathrooms",
    enterMaxGuests: "Enter maximum guests",
    addAmenity: "Add Amenity",
    remove: "Remove",
    startDate: "Start Date",
    endDate: "End Date",
    provincePlaceholder: "Select province",
    districtPlaceholder: "Enter district",
    sectorPlaceholder: "Enter sector",
    cellPlaceholder: "Enter cell",
    villagePlaceholder: "Enter village",
    hostName: "Host Name",
    hostEmail: "Host Email",
    hostPhone: "Host Phone",
    responseRate: "Response Rate %",
    responseTime: "Response Time",
    uploadImages: "Upload Images",
    dropImages: "Drop images here or click to upload",
    imagePreview: "Image Preview",
    addImage: "Add Image",
    noImage: "No image",
    selectFiles: "Select Files",
    dragDrop: "Drag & drop images here",
    loading: "Loading...",
    validation: {
      nameRequired: "Property name is required",
      nameMinLength: "Name must be at least 3 characters",
      nameMaxLength: "Name cannot exceed 100 characters",
      descriptionRequired: "Description is required",
      descriptionMinLength: "Description must be at least 20 characters",
      descriptionMaxLength: "Description cannot exceed 2000 characters",
      provinceRequired: "Province is required",
      districtRequired: "District is required",
      sectorRequired: "Sector is required",
      cellRequired: "Cell is required",
      villageRequired: "Village is required",
      universityRequired: "University is required",
      priceRequired: "Price is required",
      priceMin: "Price must be greater than 0",
      bedroomsRequired: "Bedrooms is required",
      bedroomsMin: "Bedrooms must be at least 0",
      bathroomsRequired: "Bathrooms is required",
      bathroomsMin: "Bathrooms must be at least 0",
      maxGuestsRequired: "Max guests is required",
      maxGuestsMin: "Max guests must be at least 1",
      hostNameRequired: "Host name is required",
      hostEmailRequired: "Host email is required",
      hostEmailInvalid: "Please enter a valid email",
      imagesRequired: "At least one image is required",
    },
  },
  fr: {
    hostManagement: "Gestion des Hôtes",
    manageHostProfile: "Gérez vos propriétés et annonces",
    properties: "Propriétés",
    addProperty: "Ajouter une Propriété",
    editProperty: "Modifier la Propriété",
    deleteProperty: "Supprimer la Propriété",
    deleteConfirmation: "Êtes-vous sûr de vouloir supprimer cette propriété ?",
    actionUndone: "Cette action est irréversible.",
    cancel: "Annuler",
    delete: "Supprimer",
    deleting: "Suppression...",
    propertyDeleted: "Propriété supprimée avec succès !",
    deleteFailed: "Échec de la suppression de la propriété",
    propertyCreated: "Propriété créée avec succès !",
    propertyUpdated: "Propriété mise à jour avec succès !",
    createFailed: "Échec de la création de la propriété",
    updateFailed: "Échec de la mise à jour de la propriété",
    totalProperties: "Total des Propriétés",
    availableProperties: "Disponible",
    pendingProperties: "En Attente",
    unavailableProperties: "Indisponible",
    maintenanceProperties: "Maintenance",
    totalReviews: "Total des Avis",
    rating: "Évaluation",
    searchProperties: "Rechercher des propriétés...",
    allStatus: "Tous les Statuts",
    property: "Propriété",
    location: "Emplacement",
    status: "Statut",
    price: "Prix",
    actions: "Actions",
    noProperties: "Aucune propriété trouvée",
    adjustFilters: "Essayez d'ajuster votre recherche ou vos filtres",
    showing: "Affichage",
    of: "de",
    propertiesCount: "propriétés",
    viewProperty: "Voir la Propriété",
    propertyDetails: "Détails de la Propriété",
    propertyName: "Nom de la Propriété",
    description: "Description",
    bedrooms: "Chambres",
    bathrooms: "Salles de Bain",
    maxGuests: "Max Invités",
    pricePerMonth: "Prix par Mois",
    university: "Université",
    province: "Province",
    district: "District",
    sector: "Secteur",
    cell: "Cellule",
    village: "Village",
    amenities: "Équipements",
    availability: "Disponibilité",
    images: "Images",
    close: "Fermer",
    save: "Enregistrer",
    saving: "Enregistrement...",
    create: "Créer",
    update: "Mettre à Jour",
    name: "Nom",
    email: "Email",
    phone: "Téléphone",
    available: "Disponible",
    unavailable: "Indisponible",
    maintenance: "Maintenance",
    pending: "En Attente",
    all: "Tous",
    selectStatus: "Sélectionner le Statut",
    enterName: "Entrez le nom de la propriété",
    enterDescription: "Entrez la description de la propriété",
    enterPrice: "Entrez le prix par mois",
    enterBedrooms: "Entrez le nombre de chambres",
    enterBathrooms: "Entrez le nombre de salles de bain",
    enterMaxGuests: "Entrez le nombre maximum d'invités",
    addAmenity: "Ajouter un Équipement",
    remove: "Supprimer",
    startDate: "Date de Début",
    endDate: "Date de Fin",
    provincePlaceholder: "Sélectionner la province",
    districtPlaceholder: "Entrez le district",
    sectorPlaceholder: "Entrez le secteur",
    cellPlaceholder: "Entrez la cellule",
    villagePlaceholder: "Entrez le village",
    hostName: "Nom de l'Hôte",
    hostEmail: "Email de l'Hôte",
    hostPhone: "Téléphone de l'Hôte",
    responseRate: "Taux de Réponse %",
    responseTime: "Temps de Réponse",
    uploadImages: "Télécharger des Images",
    dropImages: "Déposez les images ici ou cliquez pour télécharger",
    imagePreview: "Aperçu de l'Image",
    addImage: "Ajouter une Image",
    noImage: "Pas d'image",
    selectFiles: "Sélectionner des Fichiers",
    dragDrop: "Glissez-déposez les images ici",
    loading: "Chargement...",
    validation: {
      nameRequired: "Le nom de la propriété est requis",
      nameMinLength: "Le nom doit contenir au moins 3 caractères",
      nameMaxLength: "Le nom ne peut pas dépasser 100 caractères",
      descriptionRequired: "La description est requise",
      descriptionMinLength:
        "La description doit contenir au moins 20 caractères",
      descriptionMaxLength:
        "La description ne peut pas dépasser 2000 caractères",
      provinceRequired: "La province est requise",
      districtRequired: "Le district est requis",
      sectorRequired: "Le secteur est requis",
      cellRequired: "La cellule est requise",
      villageRequired: "Le village est requis",
      universityRequired: "L'université est requise",
      priceRequired: "Le prix est requis",
      priceMin: "Le prix doit être supérieur à 0",
      bedroomsRequired: "Les chambres sont requises",
      bedroomsMin: "Les chambres doivent être au moins 0",
      bathroomsRequired: "Les salles de bain sont requises",
      bathroomsMin: "Les salles de bain doivent être au moins 0",
      maxGuestsRequired: "Le nombre max d'invités est requis",
      maxGuestsMin: "Le nombre max d'invités doit être au moins 1",
      hostNameRequired: "Le nom de l'hôte est requis",
      hostEmailRequired: "L'email de l'hôte est requis",
      hostEmailInvalid: "Veuillez entrer un email valide",
      imagesRequired: "Au moins une image est requise",
    },
  },
  rw: {
    hostManagement: "Gucunga Amazu",
    manageHostProfile: "Gucunga amazu yawe n'amatangazo",
    properties: "Amazu",
    addProperty: "Ongera Inzu",
    editProperty: "Hindura Inzu",
    deleteProperty: "Kuraho Inzu",
    deleteConfirmation: "Uri kwizera ko ushaka gukuraho iyi nzu?",
    actionUndone: "Iki gikorwa ntikishobora guhindurwa.",
    cancel: "Reka",
    delete: "Kuraho",
    deleting: "Birakurwaho...",
    propertyDeleted: "Inzu yakuweho neza!",
    deleteFailed: "Kuraho inzu birananiranye",
    propertyCreated: "Inzu yakozwe neza!",
    propertyUpdated: "Inzu yavuguruwe neza!",
    createFailed: "Kora inzu birananiranye",
    updateFailed: "Kuvugurura inzu birananiranye",
    totalProperties: "Amazu Yose",
    availableProperties: "Irahari",
    pendingProperties: "Bitegereje",
    unavailableProperties: "Ntaho",
    maintenanceProperties: "Muri Maintenance",
    totalReviews: "Ibitekerezo Byose",
    rating: "Amanota",
    searchProperties: "Shakisha amazu...",
    allStatus: "Ihagaze Ryose",
    property: "Inzu",
    location: "Aho Gihe",
    status: "Ihagaze",
    price: "Igiciro",
    actions: "Ibikorwa",
    noProperties: "Nta nzu yabonetse",
    adjustFilters: "Gerageza guhindura uburyo ushakisha",
    showing: "Bereka",
    of: "muri",
    propertiesCount: "amazu",
    viewProperty: "Reba Inzu",
    propertyDetails: "Ibisobanuro by'Inzu",
    propertyName: "Izina ry'Inzu",
    description: "Ibisobanuro",
    bedrooms: "Ibyumba",
    bathrooms: "Amazu y'isuku",
    maxGuests: "Abashyitsi Benshi",
    pricePerMonth: "Igiciro ku Kwezi",
    university: "Kaminuza",
    province: "Intara",
    district: "Akarere",
    sector: "Umurenge",
    cell: "Akagari",
    village: "Umudugudu",
    amenities: "Ibikoresho",
    availability: "Kuboneka",
    images: "Amashusho",
    close: "Funga",
    save: "Bika",
    saving: "Birabikwa...",
    create: "Kora",
    update: "Vugurura",
    name: "Izina",
    email: "Imeri",
    phone: "Telefone",
    available: "Irahari",
    unavailable: "Ntaho",
    maintenance: "Muri Maintenance",
    pending: "Bitegereje",
    all: "Byose",
    selectStatus: "Hitamo Ihagaze",
    enterName: "Andika izina ry'inzu",
    enterDescription: "Andika ibisobanuro by'inzu",
    enterPrice: "Andika igiciro ku kwezi",
    enterBedrooms: "Andika umubare w'ibyumba",
    enterBathrooms: "Andika umubare w'amazu y'isuku",
    enterMaxGuests: "Andika umubare w'abashyitsi",
    addAmenity: "Ongeraho Ibikoresho",
    remove: "Kuraho",
    startDate: "Itariki yo Gutangira",
    endDate: "Itariki yo Kurangira",
    provincePlaceholder: "Hitamo Intara",
    districtPlaceholder: "Andika Akarere",
    sectorPlaceholder: "Andika Umurenge",
    cellPlaceholder: "Andika Akagari",
    villagePlaceholder: "Andika Umudugudu",
    hostName: "Izina ry'Umutambyi",
    hostEmail: "Imeri y'Umutambyi",
    hostPhone: "Telefone y'Umutambyi",
    responseRate: "Ugusubiza %",
    responseTime: "Igihe cyo Gusubiza",
    uploadImages: "Ongeraho Amashusho",
    dropImages: "Shyira amashusho hano cyangwa kanda guterura",
    imagePreview: "Reba Ishusho",
    addImage: "Ongeraho Ishusho",
    noImage: "Nta shusho",
    selectFiles: "Hitamo Amashusho",
    dragDrop: "Kurura no gushyira amashusho hano",
    loading: "Birakoreshwa...",
    validation: {
      nameRequired: "Izina ry'inzu rirasabwa",
      nameMinLength: "Izina rigomba kugira byibura inyuguti 3",
      nameMaxLength: "Izina ntirigomba kurenga inyuguti 100",
      descriptionRequired: "Ibisobanuro birakenewe",
      descriptionMinLength: "Ibisobanuro bigomba kugira byibura inyuguti 20",
      descriptionMaxLength: "Ibisobanuro ntibigomba kurenga inyuguti 2000",
      provinceRequired: "Intara irakenewe",
      districtRequired: "Akarere gakenewe",
      sectorRequired: "Umurenge urakenewe",
      cellRequired: "Akagari gakenewe",
      villageRequired: "Umudugudu urakenewe",
      universityRequired: "Kaminuza irakenewe",
      priceRequired: "Igiciro gikenewe",
      priceMin: "Igiciro kigomba kuba kirenze 0",
      bedroomsRequired: "Ibyumba birakenewe",
      bedroomsMin: "Ibyumba bigomba kuba byibura 0",
      bathroomsRequired: "Amazu y'isuku arakenewe",
      bathroomsMin: "Amazu y'isuku agomba kuba byibura 0",
      maxGuestsRequired: "Abashyitsi benshi barakenewe",
      maxGuestsMin: "Abashyitsi benshi bagomba kuba byibura 1",
      hostNameRequired: "Izina ry'umutambyi rirakenewe",
      hostEmailRequired: "Imeri y'umutambyi irakenewe",
      hostEmailInvalid: "Andika imeri ikwiye",
      imagesRequired: "Byibura ishusho imwe irakenewe",
    },
  },
};

// ============================================================
// HELPER FUNCTIONS - UPDATED to use localStorage
// ============================================================
const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
  const lang = Cookies.get("language") as "en" | "fr" | "rw";
  return lang || "en";
};

const getUserEmail = (): string => {
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      return user.email || "";
    }
    return "";
  } catch (error) {
    console.error("Error reading user email from localStorage:", error);
    return "";
  }
};

const getUserName = (): string => {
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      return user.name || "";
    }
    return "";
  } catch (error) {
    console.error("Error reading user name from localStorage:", error);
    return "";
  }
};

const getToken = (): string => {
  try {
    return localStorage.getItem("token") || "";
  } catch (error) {
    console.error("Error reading token from localStorage:", error);
    return "";
  }
};

// ============================================================
// API SERVICE - UPDATED with token interceptor
// ============================================================
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for authentication
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

// House API functions
const houseApi = {
  getHouses: async (email: string): Promise<House[]> => {
    const response = await api.get(`/houses/${email}`);
    return response.data.data || [];
  },

  createHouse: async (formData: FormData): Promise<House> => {
    const response = await api.post("/houses", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data || response.data;
  },

  updateHouse: async (id: string, formData: FormData): Promise<House> => {
    const response = await api.put(`/houses/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data || response.data;
  },

  deleteHouse: async (id: string): Promise<void> => {
    await api.delete(`/houses/${id}`);
  },
};

// Icons
const Icons = {
  Home: () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  ),
  Plus: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 4v16m8-8H4"
      />
    </svg>
  ),
  Edit: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      />
    </svg>
  ),
  Delete: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  ),
  View: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  ),
  Search: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  ),
  Filter: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
      />
    </svg>
  ),
  Close: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ),
  Check: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      />
    </svg>
  ),
  Upload: () => (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
      />
    </svg>
  ),
  Bed: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 8h16M4 16h16M4 12h16M4 20h16"
      />
    </svg>
  ),
  Bath: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 5h14M5 5v14M5 5h14M5 19h14M5 19v-4M5 19H3M19 19v-4"
      />
    </svg>
  ),
  User: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  ),
  Location: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
  University: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2M12 3v4m4-2h.01M4 7h.01M8 7h.01M16 7h.01M4 11h16M4 15h16M4 19h16"
      />
    </svg>
  ),
};

export const HostManagement: React.FC = () => {
  const [lang, setLang] = useState<"en" | "fr" | "rw">(
    getLanguageFromCookies(),
  );
  const userEmail = getUserEmail();
  const userName = getUserName();

  const [houses, setHouses] = useState<House[]>([]);
  const [filteredHouses, setFilteredHouses] = useState<House[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);

  // Form validation states
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {},
  );

  // Image upload states
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Property form state
  const [propertyFormData, setPropertyFormData] = useState({
    name: "",
    description: "",
    university: "",
    location: {
      province: "",
      district: "",
      sector: "",
      cell: "",
      village: "",
    },
    pricePerMonth: 0,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: [] as string[],
    status: "pending" as House["status"],
    host: {
      name: userName || "",
      email: userEmail || "",
      phone: "",
      responseRate: 0,
      responseTime: "24 hours",
    },
  });

  const [amenityInput, setAmenityInput] = useState("");

  // Statistics
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    pending: 0,
    unavailable: 0,
    maintenance: 0,
    totalReviews: 0,
    averageRating: 0,
  });

  const t = translations[lang];

  // ✅ HOOK 1: Listen for language changes
  useEffect(() => {
    const interval = setInterval(() => {
      const newLang = getLanguageFromCookies();
      if (newLang !== lang) setLang(newLang);
    }, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  // ✅ HOOK 2: loadHouses useCallback
  const loadHouses = useCallback(async () => {
    const email = getUserEmail();
    console.log("🔍 Loading houses for email:", email);

    if (!email) {
      console.warn("⚠️ No email found in localStorage");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await houseApi.getHouses(email);
      console.log("✅ Houses loaded:", data);
      
      // Translate house data if language is not English
      let processedData = data;
      if (lang !== 'en') {
        console.log(`Translating ${data.length} houses to ${lang}...`);
        const translatedHouses = [];
        for (const house of data) {
          try {
            const translatedHouse = {
              ...house,
              name: await translateContent(house.name, lang),
              description: await translateContent(house.description, lang),
              university: await translateContent(house.university, lang),
              location: {
                ...house.location,
                province: await translateContent(house.location.province, lang),
                district: await translateContent(house.location.district, lang),
                sector: await translateContent(house.location.sector, lang),
                cell: await translateContent(house.location.cell, lang),
                village: await translateContent(house.location.village, lang),
              },
              amenities: await Promise.all(
                house.amenities.map((amenity: string) => translateContent(amenity, lang))
              ),
              host: {
                ...house.host,
                name: await translateContent(house.host.name, lang),
              },
            };
            translatedHouses.push(translatedHouse);
          } catch (err) {
            console.error('Error translating house:', house._id, err);
            translatedHouses.push(house);
          }
        }
        processedData = translatedHouses;
        console.log('Translated houses count:', processedData.length);
      }

      const housesWithImages = processedData.map((house) => ({
        ...house,
        images: house.images || [],
      }));
      setHouses(housesWithImages);
      setFilteredHouses(housesWithImages);
    } catch (error) {
      console.error("❌ Error loading houses:", error);
      toast.error("Failed to load houses");
    } finally {
      setLoading(false);
    }
  }, [lang]);

  // ✅ HOOK 3: useEffect for loadHouses
  useEffect(() => {
    loadHouses();
  }, [loadHouses, lang]);

  // ✅ HOOK 4: Filter houses
  useEffect(() => {
    let filtered = [...houses];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (h) =>
          h.name.toLowerCase().includes(term) ||
          h.university.toLowerCase().includes(term) ||
          h.location.district.toLowerCase().includes(term) ||
          h.location.village.toLowerCase().includes(term),
      );
    }
    if (filterStatus !== "all") {
      filtered = filtered.filter((h) => h.status === filterStatus);
    }
    setFilteredHouses(filtered);
  }, [houses, searchTerm, filterStatus]);

  // ✅ HOOK 5: Update statistics
  useEffect(() => {
    setStats({
      total: houses.length,
      available: houses.filter((h) => h.status === "available").length,
      pending: houses.filter((h) => h.status === "pending").length,
      unavailable: houses.filter((h) => h.status === "unavailable").length,
      maintenance: houses.filter((h) => h.status === "maintenance").length,
      totalReviews: houses.reduce((sum, h) => sum + h.totalReviews, 0),
      averageRating:
        houses.length > 0
          ? houses.reduce((sum, h) => sum + h.rating, 0) / houses.length
          : 0,
    });
  }, [houses]);

  // ============================================================
  // ALL HOOKS ABOVE - NOW WE CAN HAVE CONDITIONAL RETURNS
  // ============================================================

  // Get status badge
  const getStatusColor = (status: string): string => {
    const colors = {
      available: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      unavailable: "bg-gray-100 text-gray-800 border-gray-200",
      maintenance: "bg-red-100 text-red-800 border-red-200",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getStatusLabel = (status: string): string => {
    const labels = {
      available: t.available,
      pending: t.pending,
      unavailable: t.unavailable,
      maintenance: t.maintenance,
    };
    return labels[status as keyof typeof labels] || status;
  };

  const formatCurrency = (amount: number): string => {
    return `RWF ${amount.toLocaleString()}`;
  };

  // Amenity functions
  const addAmenity = () => {
    if (
      amenityInput.trim() &&
      !propertyFormData.amenities.includes(amenityInput.trim())
    ) {
      setPropertyFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, amenityInput.trim()],
      }));
      setAmenityInput("");
    }
  };

  const removeAmenity = (amenityToRemove: string) => {
    setPropertyFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter(
        (amenity) => amenity !== amenityToRemove,
      ),
    }));
  };

  // ✅ FIXED: Validate form - returns errors without setting state
  const validateForm = (): Record<string, string> => {
    const errors: Record<string, string> = {};
    const v = t.validation;

    if (!propertyFormData.name.trim()) errors.name = v.nameRequired;
    else if (propertyFormData.name.length < 3) errors.name = v.nameMinLength;
    else if (propertyFormData.name.length > 100) errors.name = v.nameMaxLength;

    if (!propertyFormData.description.trim())
      errors.description = v.descriptionRequired;
    else if (propertyFormData.description.length < 20)
      errors.description = v.descriptionMinLength;
    else if (propertyFormData.description.length > 2000)
      errors.description = v.descriptionMaxLength;

    if (!propertyFormData.location.province)
      errors.province = v.provinceRequired;
    if (!propertyFormData.location.district.trim())
      errors.district = v.districtRequired;
    if (!propertyFormData.location.sector.trim())
      errors.sector = v.sectorRequired;
    if (!propertyFormData.location.cell.trim()) errors.cell = v.cellRequired;
    if (!propertyFormData.location.village.trim())
      errors.village = v.villageRequired;

    if (!propertyFormData.university.trim())
      errors.university = v.universityRequired;

    if (propertyFormData.pricePerMonth <= 0) errors.pricePerMonth = v.priceMin;

    if (propertyFormData.bedrooms < 0) errors.bedrooms = v.bedroomsMin;
    if (propertyFormData.bathrooms < 0) errors.bathrooms = v.bathroomsMin;
    if (propertyFormData.maxGuests < 1) errors.maxGuests = v.maxGuestsMin;

    if (!propertyFormData.host.name.trim())
      errors.hostName = v.hostNameRequired;
    if (!propertyFormData.host.email.trim())
      errors.hostEmail = v.hostEmailRequired;
    else if (!/\S+@\S+\.\S+/.test(propertyFormData.host.email))
      errors.hostEmail = v.hostEmailInvalid;

    if (imageFiles.length === 0 && !selectedHouse)
      errors.images = v.imagesRequired;

    return errors;
  };

  // ✅ FIXED: Validate and set errors - only called when needed
  const validateAndSetErrors = () => {
    const errors = validateForm();
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFieldBlur = (field: string) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
    // ✅ Only validate on blur - this will set errors
    validateAndSetErrors();
  };

  const hasError = (field: string): boolean => {
    // ✅ Only show error if field has been touched AND there's an error
    return touchedFields[field] && !!formErrors[field];
  };

  const isValidField = (field: string): boolean => {
    // ✅ Only show valid if field has been touched AND no error
    return touchedFields[field] && !formErrors[field];
  };

  // Handle input change
  const handleInputChange = (field: string, value: any) => {
    const keys = field.split(".");
    if (keys.length > 1) {
      setPropertyFormData((prev) => ({
        ...prev,
        [keys[0]]: {
          ...(prev[keys[0] as keyof typeof prev] as any),
          [keys[1]]: value,
        },
      }));
    } else {
      setPropertyFormData((prev) => ({ ...prev, [field]: value }));
    }
    // ✅ Clear error for this field when user types
    setFormErrors((prev) => {
      const newErrors = { ...prev };
      const fieldName = field.includes(".") ? field.split(".")[1] : field;
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  const handleLocationChange = (field: string, value: string) => {
    setPropertyFormData((prev) => ({
      ...prev,
      location: { ...prev.location, [field]: value },
    }));
    // ✅ Clear error for this field when user types
    setFormErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  // Image handling
  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    setImageFiles((prev) => [...prev, ...fileArray]);

    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews((prev) => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });

    // ✅ Clear image error when images are added
    setFormErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.images;
      return newErrors;
    });
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    // ✅ Re-validate images when removing
    validateAndSetErrors();
  };

  // Create FormData for API
  const createFormData = (): FormData => {
    const formData = new FormData();

    formData.append("name", propertyFormData.name);
    formData.append("description", propertyFormData.description);
    formData.append("university", propertyFormData.university);
    formData.append("pricePerMonth", String(propertyFormData.pricePerMonth));
    formData.append("bedrooms", String(propertyFormData.bedrooms));
    formData.append("bathrooms", String(propertyFormData.bathrooms));
    formData.append("maxGuests", String(propertyFormData.maxGuests));
    formData.append("status", propertyFormData.status);

    Object.entries(propertyFormData.location).forEach(([key, value]) => {
      formData.append(`location[${key}]`, value);
    });

    Object.entries(propertyFormData.host).forEach(([key, value]) => {
      formData.append(`host[${key}]`, String(value));
    });

    propertyFormData.amenities.forEach((amenity) => {
      formData.append("amenities[]", amenity);
    });

    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    return formData;
  };

  // ✅ FIXED: CRUD Operations - validate only on submit
  const handleCreateProperty = async () => {
    // ✅ Touch all fields before validation
    const allFields = [
      "name",
      "description",
      "university",
      "province",
      "district",
      "sector",
      "cell",
      "village",
      "pricePerMonth",
      "bedrooms",
      "bathrooms",
      "maxGuests",
      "hostName",
      "hostEmail",
      "images",
    ];
    const touched: Record<string, boolean> = {};
    allFields.forEach((field) => {
      touched[field] = true;
    });
    setTouchedFields(touched);

    // ✅ Validate and set errors
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix all validation errors");
      return;
    }

    setSubmitting(true);
    try {
      const formData = createFormData();
      const newHouse = await houseApi.createHouse(formData);
      const houseWithImages = {
        ...newHouse,
        images: newHouse.images || [],
      };
      setHouses((prev) => [houseWithImages, ...prev]);
      toast.success(`✅ ${t.propertyCreated}`);
      setIsCreateModalOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error creating property:", error);
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data
        ? typeof axiosError.response?.data === "string"
          ? axiosError.response?.data
          : JSON.stringify(axiosError.response?.data)
        : t.createFailed;
      toast.error(`❌ ${errorMessage}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateProperty = async () => {
    if (!selectedHouse) return;

    // ✅ Touch all fields before validation
    const allFields = [
      "name",
      "description",
      "university",
      "province",
      "district",
      "sector",
      "cell",
      "village",
      "pricePerMonth",
      "bedrooms",
      "bathrooms",
      "maxGuests",
      "hostName",
      "hostEmail",
      "images",
    ];
    const touched: Record<string, boolean> = {};
    allFields.forEach((field) => {
      touched[field] = true;
    });
    setTouchedFields(touched);

    // ✅ Validate and set errors
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix all validation errors");
      return;
    }

    setSubmitting(true);
    try {
      const formData = createFormData();
      const updatedHouse = await houseApi.updateHouse(
        selectedHouse._id!,
        formData,
      );
      const houseWithImages = {
        ...updatedHouse,
        images: updatedHouse.images || [],
      };
      setHouses((prev) =>
        prev.map((h) => (h._id === selectedHouse._id ? houseWithImages : h)),
      );
      toast.success(`✅ ${t.propertyUpdated}`);
      setIsEditModalOpen(false);
      setSelectedHouse(null);
      resetForm();
    } catch (error) {
      console.error("Error updating property:", error);
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data
        ? typeof axiosError.response?.data === "string"
          ? axiosError.response?.data
          : JSON.stringify(axiosError.response?.data)
        : t.updateFailed;
      toast.error(`❌ ${errorMessage}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProperty = async () => {
    if (!selectedHouse) return;

    setSubmitting(true);
    try {
      await houseApi.deleteHouse(selectedHouse._id!);
      setHouses((prev) => prev.filter((h) => h._id !== selectedHouse._id));
      toast.success(`🗑️ ${t.propertyDeleted}`);
      setIsDeleteModalOpen(false);
      setSelectedHouse(null);
    } catch (error) {
      console.error("Error deleting property:", error);
      const axiosError = error as AxiosError;
      toast.error(`❌ ${axiosError.response?.data || t.deleteFailed}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setPropertyFormData({
      name: "",
      description: "",
      university: "",
      location: {
        province: "",
        district: "",
        sector: "",
        cell: "",
        village: "",
      },
      pricePerMonth: 0,
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 2,
      amenities: [],
      status: "pending",
      host: {
        name: userName || "",
        email: userEmail || "",
        phone: "",
        responseRate: 0,
        responseTime: "24 hours",
      },
    });
    setImageFiles([]);
    setImagePreviews([]);
    setAmenityInput("");
    setFormErrors({});
    setTouchedFields({});
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Open modals
  const openViewModal = (house: House) => {
    setSelectedHouse(house);
    setIsViewModalOpen(true);
  };

  const openEditModal = (house: House) => {
    setSelectedHouse(house);
    setPropertyFormData({
      name: house.name,
      description: house.description,
      university: house.university,
      location: house.location,
      pricePerMonth: house.pricePerMonth,
      bedrooms: house.bedrooms,
      bathrooms: house.bathrooms,
      maxGuests: house.maxGuests,
      amenities: house.amenities || [],
      status: house.status,
      host: house.host,
    });
    setImageFiles([]);
    setImagePreviews(house.images ? house.images.map((img) => img.url) : []);
    // ✅ Reset touched fields and errors for edit modal
    setTouchedFields({});
    setFormErrors({});
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (house: House) => {
    setSelectedHouse(house);
    setIsDeleteModalOpen(true);
  };

  const openCreateModal = () => {
    resetForm();
    setIsCreateModalOpen(true);
  };

  // Render input with validation
  const renderInput = (
    label: string,
    field: string,
    type: string = "text",
    placeholder: string = "",
    required: boolean = true,
    value?: string | number,
    onChange?: (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => void,
  ) => {
    const fieldName = field.includes(".") ? field.split(".")[1] : field;
    const error = formErrors[fieldName];
    const isTouched = touchedFields[fieldName];
    const isValid = isTouched && !error;

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {type === "textarea" ? (
          <textarea
            value={(value as string) || ""}
            onChange={onChange}
            onBlur={() => handleFieldBlur(fieldName)}
            rows={3}
            className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm transition-all resize-none ${
              hasError(fieldName)
                ? "border-red-500 bg-red-50"
                : isValid
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300"
            }`}
            placeholder={placeholder}
          />
        ) : type === "select" ? (
          <select
            value={(value as string) || ""}
            onChange={onChange}
            onBlur={() => handleFieldBlur(fieldName)}
            className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white transition-all ${
              hasError(fieldName)
                ? "border-red-500 bg-red-50"
                : isValid
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300"
            }`}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {onChange && (onChange as any).options}
          </select>
        ) : (
          <input
            type={type}
            value={(value as string) || ""}
            onChange={onChange}
            onBlur={() => handleFieldBlur(fieldName)}
            className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm transition-all ${
              hasError(fieldName)
                ? "border-red-500 bg-red-50"
                : isValid
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300"
            }`}
            placeholder={placeholder}
            min={type === "number" ? 0 : undefined}
          />
        )}
        {hasError(fieldName) && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
        {isValid && (
          <p className="mt-1 text-sm text-green-500 flex items-center gap-1">
            <Icons.Check /> Valid
          </p>
        )}
      </div>
    );
  };

  // Modal variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 20 },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // ✅ CONDITIONAL RETURN - AFTER ALL HOOKS HAVE BEEN CALLED
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="w-16 h-16 border-4 border-[#FF385C] border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-4 text-gray-500">{t.loading}</p>
      </div>
    );
  }

  // ✅ FIXED: isFormValid checks only touched fields
  const isFormValid = () => {
    // Check if all required fields have been touched
    const requiredFields = [
      "name",
      "description",
      "university",
      "province",
      "district",
      "sector",
      "cell",
      "village",
      "pricePerMonth",
      "bedrooms",
      "bathrooms",
      "maxGuests",
      "hostName",
      "hostEmail",
      "images",
    ];
    const allTouched = requiredFields.every((field) => touchedFields[field]);
    
    // If not all touched, form is not ready for submission
    if (!allTouched) return false;
    
    // Check if there are any errors
    return Object.keys(formErrors).length === 0;
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 flex items-center gap-3">
              <span className="p-2 bg-[#FF385C]/10 rounded-2xl">
                <Icons.Home />
              </span>
              {t.hostManagement}
            </h1>
            <p className="text-sm text-gray-500 mt-1 ml-2">
              {t.manageHostProfile}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={openCreateModal}
            className="px-6 py-3 bg-gradient-to-r from-[#FF385C] to-[#E31C5F] text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Icons.Plus />
            {t.addProperty}
          </motion.button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 mb-8">
        {[
          {
            label: t.totalProperties,
            value: stats.total,
            color: "bg-gradient-to-br from-blue-500 to-blue-600",
          },
          {
            label: t.availableProperties,
            value: stats.available,
            color: "bg-gradient-to-br from-green-500 to-green-600",
          },
          {
            label: t.pendingProperties,
            value: stats.pending,
            color: "bg-gradient-to-br from-yellow-500 to-yellow-600",
          },
          {
            label: t.unavailableProperties,
            value: stats.unavailable,
            color: "bg-gradient-to-br from-gray-500 to-gray-600",
          },
          {
            label: t.maintenanceProperties,
            value: stats.maintenance,
            color: "bg-gradient-to-br from-red-500 to-red-600",
          },
          {
            label: t.totalReviews,
            value: stats.totalReviews,
            color: "bg-gradient-to-br from-purple-500 to-purple-600",
          },
          {
            label: t.rating,
            value: stats.averageRating.toFixed(1),
            color: "bg-gradient-to-br from-orange-500 to-orange-600",
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -2, scale: 1.02 }}
            className={`${stat.color} rounded-xl p-3 shadow-lg text-white`}
          >
            <p className="text-xs opacity-90">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Icons.Search />
            </span>
            <input
              type="text"
              placeholder={t.searchProperties}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
            >
              <option value="all">{t.allStatus}</option>
              <option value="available">{t.available}</option>
              <option value="pending">{t.pending}</option>
              <option value="unavailable">{t.unavailable}</option>
              <option value="maintenance">{t.maintenance}</option>
            </select>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("all");
              }}
              className="px-4 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
            >
              <Icons.Filter />
            </button>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      {filteredHouses.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-100">
          <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Icons.Home />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {t.noProperties}
          </h3>
          <p className="text-gray-500">{t.adjustFilters}</p>
          <button
            onClick={openCreateModal}
            className="mt-4 px-6 py-2.5 bg-[#FF385C] text-white rounded-xl hover:bg-[#E31C5F] transition-all"
          >
            {t.addProperty}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHouses.map((house) => (
            <motion.div
              key={house._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={
                    house.images && house.images.length > 0
                      ? house.images[0].url
                      : "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"
                  }
                  alt={house.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(house.status)}`}
                  >
                    {getStatusLabel(house.status)}
                  </span>
                </div>
                {house.rating > 0 && (
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-sm flex items-center gap-1">
                    ⭐ {house.rating.toFixed(1)}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {house.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                  <Icons.Location />
                  {house.location.village}, {house.location.district}
                </p>
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <span className="flex items-center gap-1 text-gray-600">
                    <Icons.Bed /> {house.bedrooms}
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="flex items-center gap-1 text-gray-600">
                    <Icons.Bath /> {house.bathrooms}
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="flex items-center gap-1 text-gray-600">
                    <Icons.User /> {house.maxGuests}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <div>
                    <p className="text-sm font-bold text-[#FF385C]">
                      {formatCurrency(house.pricePerMonth)}
                    </p>
                    <p className="text-xs text-gray-500">per month</p>
                  </div>
                  <div className="flex gap-1">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => openViewModal(house)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                    >
                      <Icons.View />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => openEditModal(house)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-xl transition-all"
                    >
                      <Icons.Edit />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => openDeleteModal(house)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Icons.Delete />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* View Property Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedHouse && (
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
                <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Icons.Home />
                    {t.propertyDetails}
                  </h2>
                  <motion.button
                    whileHover={{ rotate: 90 }}
                    onClick={() => setIsViewModalOpen(false)}
                    className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
                  >
                    <Icons.Close />
                  </motion.button>
                </div>
                <div className="p-6 space-y-4">
                  {selectedHouse.images && selectedHouse.images.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {selectedHouse.images.map((img, index) => (
                        <img
                          key={index}
                          src={img.url}
                          alt={selectedHouse.name}
                          className={`rounded-xl object-cover h-48 ${index === 0 ? "col-span-2" : ""}`}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-100 rounded-xl h-48 flex items-center justify-center">
                      <p className="text-gray-500">No images available</p>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedHouse.name}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {t.status}
                      </p>
                      <span
                        className={`px-2.5 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedHouse.status)}`}
                      >
                        {getStatusLabel(selectedHouse.status)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {t.pricePerMonth}
                      </p>
                      <p className="text-lg font-bold text-[#FF385C]">
                        {formatCurrency(selectedHouse.pricePerMonth)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {t.description}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      {selectedHouse.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {t.bedrooms}
                      </p>
                      <p className="text-lg font-semibold">
                        {selectedHouse.bedrooms}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {t.bathrooms}
                      </p>
                      <p className="text-lg font-semibold">
                        {selectedHouse.bathrooms}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {t.maxGuests}
                      </p>
                      <p className="text-lg font-semibold">
                        {selectedHouse.maxGuests}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {t.location}
                    </p>
                    <p className="text-sm text-gray-700">
                      {selectedHouse.location.village},{" "}
                      {selectedHouse.location.sector},<br />
                      {selectedHouse.location.district},{" "}
                      {selectedHouse.location.province}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {t.amenities}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedHouse.amenities &&
                      selectedHouse.amenities.length > 0 ? (
                        selectedHouse.amenities.map((amenity) => (
                          <span
                            key={amenity}
                            className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                          >
                            {amenity}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-400">
                          No amenities
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsViewModalOpen(false);
                        openEditModal(selectedHouse);
                      }}
                      className="px-4 py-2.5 bg-[#FF385C] text-white rounded-xl hover:bg-[#E31C5F] transition-colors flex items-center gap-2"
                    >
                      <Icons.Edit /> {t.editProperty}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsViewModalOpen(false);
                        openDeleteModal(selectedHouse);
                      }}
                      className="px-4 py-2.5 border border-red-300 text-red-600 rounded-xl hover:bg-red-50 transition-colors flex items-center gap-2"
                    >
                      <Icons.Delete /> {t.delete}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsViewModalOpen(false)}
                      className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors ml-auto"
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

      {/* Create/Edit Property Modal */}
      <AnimatePresence>
        {(isCreateModalOpen || isEditModalOpen) && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => {
                setIsCreateModalOpen(false);
                setIsEditModalOpen(false);
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
              <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
                <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    {isEditModalOpen ? <Icons.Edit /> : <Icons.Plus />}
                    {isEditModalOpen ? t.editProperty : t.addProperty}
                  </h2>
                  <motion.button
                    whileHover={{ rotate: 90 }}
                    onClick={() => {
                      setIsCreateModalOpen(false);
                      setIsEditModalOpen(false);
                      resetForm();
                    }}
                    className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
                  >
                    <Icons.Close />
                  </motion.button>
                </div>
                <div className="p-6 space-y-4">
                  {/* Basic Information */}
                  {renderInput(
                    t.propertyName,
                    "name",
                    "text",
                    t.enterName,
                    true,
                    propertyFormData.name,
                    (e) =>
                      handleInputChange(
                        "name",
                        (e.target as HTMLInputElement).value,
                      ),
                  )}
                  {renderInput(
                    t.description,
                    "description",
                    "textarea",
                    t.enterDescription,
                    true,
                    propertyFormData.description,
                    (e) =>
                      handleInputChange(
                        "description",
                        (e.target as HTMLTextAreaElement).value,
                      ),
                  )}
                  {renderInput(
                    t.university,
                    "university",
                    "text",
                    "Enter university name",
                    true,
                    propertyFormData.university,
                    (e) =>
                      handleInputChange(
                        "university",
                        (e.target as HTMLInputElement).value,
                      ),
                  )}

                  {/* Location */}
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <Icons.Location /> {t.location}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {t.province} <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={propertyFormData.location.province}
                          onChange={(e) =>
                            handleLocationChange("province", e.target.value)
                          }
                          onBlur={() => handleFieldBlur("province")}
                          className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white transition-all ${
                            hasError("province")
                              ? "border-red-500 bg-red-50"
                              : isValidField("province")
                                ? "border-green-500 bg-green-50"
                                : "border-gray-300"
                          }`}
                        >
                          <option value="">{t.provincePlaceholder}</option>
                          <option value="Kigali">Kigali</option>
                          <option value="Northern">Northern</option>
                          <option value="Southern">Southern</option>
                          <option value="Eastern">Eastern</option>
                          <option value="Western">Western</option>
                        </select>
                        {hasError("province") && (
                          <p className="mt-1 text-sm text-red-500">
                            {formErrors.province}
                          </p>
                        )}
                        {isValidField("province") && (
                          <p className="mt-1 text-sm text-green-500 flex items-center gap-1">
                            <Icons.Check /> Valid
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {t.district} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={propertyFormData.location.district}
                          onChange={(e) =>
                            handleLocationChange("district", e.target.value)
                          }
                          onBlur={() => handleFieldBlur("district")}
                          placeholder={t.districtPlaceholder}
                          className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm transition-all ${
                            hasError("district")
                              ? "border-red-500 bg-red-50"
                              : isValidField("district")
                                ? "border-green-500 bg-green-50"
                                : "border-gray-300"
                          }`}
                        />
                        {hasError("district") && (
                          <p className="mt-1 text-sm text-red-500">
                            {formErrors.district}
                          </p>
                        )}
                        {isValidField("district") && (
                          <p className="mt-1 text-sm text-green-500 flex items-center gap-1">
                            <Icons.Check /> Valid
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {t.sector} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={propertyFormData.location.sector}
                          onChange={(e) =>
                            handleLocationChange("sector", e.target.value)
                          }
                          onBlur={() => handleFieldBlur("sector")}
                          placeholder={t.sectorPlaceholder}
                          className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm transition-all ${
                            hasError("sector")
                              ? "border-red-500 bg-red-50"
                              : isValidField("sector")
                                ? "border-green-500 bg-green-50"
                                : "border-gray-300"
                          }`}
                        />
                        {hasError("sector") && (
                          <p className="mt-1 text-sm text-red-500">
                            {formErrors.sector}
                          </p>
                        )}
                        {isValidField("sector") && (
                          <p className="mt-1 text-sm text-green-500 flex items-center gap-1">
                            <Icons.Check /> Valid
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {t.cell} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={propertyFormData.location.cell}
                          onChange={(e) =>
                            handleLocationChange("cell", e.target.value)
                          }
                          onBlur={() => handleFieldBlur("cell")}
                          placeholder={t.cellPlaceholder}
                          className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm transition-all ${
                            hasError("cell")
                              ? "border-red-500 bg-red-50"
                              : isValidField("cell")
                                ? "border-green-500 bg-green-50"
                                : "border-gray-300"
                          }`}
                        />
                        {hasError("cell") && (
                          <p className="mt-1 text-sm text-red-500">
                            {formErrors.cell}
                          </p>
                        )}
                        {isValidField("cell") && (
                          <p className="mt-1 text-sm text-green-500 flex items-center gap-1">
                            <Icons.Check /> Valid
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.village} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={propertyFormData.location.village}
                        onChange={(e) =>
                          handleLocationChange("village", e.target.value)
                        }
                        onBlur={() => handleFieldBlur("village")}
                        placeholder={t.villagePlaceholder}
                        className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm transition-all ${
                          hasError("village")
                            ? "border-red-500 bg-red-50"
                            : isValidField("village")
                              ? "border-green-500 bg-green-50"
                              : "border-gray-300"
                        }`}
                      />
                      {hasError("village") && (
                        <p className="mt-1 text-sm text-red-500">
                          {formErrors.village}
                        </p>
                      )}
                      {isValidField("village") && (
                        <p className="mt-1 text-sm text-green-500 flex items-center gap-1">
                          <Icons.Check /> Valid
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Pricing and Details */}
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0 3V9m0 6V15m0 6v-3"
                        />
                      </svg>
                      Pricing & Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {renderInput(
                        t.pricePerMonth,
                        "pricePerMonth",
                        "number",
                        t.enterPrice,
                        true,
                        propertyFormData.pricePerMonth,
                        (e) =>
                          handleInputChange(
                            "pricePerMonth",
                            parseFloat((e.target as HTMLInputElement).value) ||
                              0,
                          ),
                      )}
                      {renderInput(
                        t.bedrooms,
                        "bedrooms",
                        "number",
                        t.enterBedrooms,
                        true,
                        propertyFormData.bedrooms,
                        (e) =>
                          handleInputChange(
                            "bedrooms",
                            parseInt((e.target as HTMLInputElement).value) || 0,
                          ),
                      )}
                      {renderInput(
                        t.bathrooms,
                        "bathrooms",
                        "number",
                        t.enterBathrooms,
                        true,
                        propertyFormData.bathrooms,
                        (e) =>
                          handleInputChange(
                            "bathrooms",
                            parseInt((e.target as HTMLInputElement).value) || 0,
                          ),
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                      {renderInput(
                        t.maxGuests,
                        "maxGuests",
                        "number",
                        t.enterMaxGuests,
                        true,
                        propertyFormData.maxGuests,
                        (e) =>
                          handleInputChange(
                            "maxGuests",
                            parseInt((e.target as HTMLInputElement).value) || 0,
                          ),
                      )}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {t.status} <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={propertyFormData.status}
                          onChange={(e) =>
                            handleInputChange("status", e.target.value)
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                        >
                          <option value="pending">{t.pending}</option>
                          <option value="available">{t.available}</option>
                          <option value="unavailable">{t.unavailable}</option>
                          <option value="maintenance">{t.maintenance}</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Host Information */}
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <Icons.User /> Host Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {renderInput(
                        t.hostName,
                        "hostName",
                        "text",
                        "Enter host name",
                        true,
                        propertyFormData.host.name,
                        (e) =>
                          handleInputChange(
                            "host.name",
                            (e.target as HTMLInputElement).value,
                          ),
                      )}
                      {renderInput(
                        t.hostEmail,
                        "hostEmail",
                        "email",
                        "Enter host email",
                        true,
                        propertyFormData.host.email,
                        (e) =>
                          handleInputChange(
                            "host.email",
                            (e.target as HTMLInputElement).value,
                          ),
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                      {renderInput(
                        t.hostPhone,
                        "hostPhone",
                        "text",
                        "Enter host phone",
                        false,
                        propertyFormData.host.phone,
                        (e) =>
                          handleInputChange(
                            "host.phone",
                            (e.target as HTMLInputElement).value,
                          ),
                      )}
                      {renderInput(
                        t.responseRate,
                        "responseRate",
                        "number",
                        "0-100",
                        false,
                        propertyFormData.host.responseRate,
                        (e) =>
                          handleInputChange(
                            "host.responseRate",
                            parseFloat((e.target as HTMLInputElement).value) ||
                              0,
                          ),
                      )}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {t.amenities}
                    </h3>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={amenityInput}
                        onChange={(e) => setAmenityInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addAmenity()}
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                        placeholder="Add amenity..."
                      />
                      <button
                        onClick={addAmenity}
                        className="px-4 py-2.5 bg-[#FF385C] text-white rounded-xl hover:bg-[#E31C5F] transition-colors"
                      >
                        <Icons.Plus />
                      </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {propertyFormData.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs flex items-center gap-1.5 border border-blue-200"
                        >
                          {amenity}
                          <button
                            onClick={() => removeAmenity(amenity)}
                            className="hover:text-red-500"
                          >
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <Icons.Upload /> {t.uploadImages}{" "}
                      <span className="text-red-500">*</span>
                    </h3>
                    <div
                      className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                        hasError("images")
                          ? "border-red-500 bg-red-50"
                          : imageFiles.length > 0 || imagePreviews.length > 0
                            ? "border-green-500 bg-green-50"
                            : "border-gray-300 hover:border-[#FF385C] hover:bg-gray-50"
                      }`}
                      onClick={() => fileInputRef.current?.click()}
                      onDrop={(e) => {
                        e.preventDefault();
                        handleImageUpload(e.dataTransfer.files);
                      }}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e.target.files)}
                      />
                      <Icons.Upload />
                      <p className="mt-2 text-sm text-gray-600">{t.dragDrop}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        PNG, JPG, JPEG up to 5MB
                      </p>
                    </div>
                    {(imagePreviews.length > 0 ||
                      (selectedHouse &&
                        selectedHouse.images &&
                        selectedHouse.images.length > 0)) && (
                      <div className="mt-3 grid grid-cols-4 gap-2">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={preview}
                              alt={`Preview ${index}`}
                              className="w-full h-20 object-cover rounded-xl"
                            />
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                        {selectedHouse &&
                          selectedHouse.images &&
                          selectedHouse.images.map((img, index) => (
                            <div
                              key={`existing-${index}`}
                              className="relative group"
                            >
                              <img
                                src={img.url}
                                alt={`Existing ${index}`}
                                className="w-full h-20 object-cover rounded-xl"
                              />
                            </div>
                          ))}
                      </div>
                    )}
                    {hasError("images") && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.images}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={
                        isEditModalOpen
                          ? handleUpdateProperty
                          : handleCreateProperty
                      }
                      disabled={submitting || !isFormValid()}
                      className={`flex-1 px-6 py-3 rounded-xl text-white font-medium transition-all flex items-center justify-center gap-2 ${
                        submitting || !isFormValid()
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-[#FF385C] to-[#E31C5F] hover:shadow-lg"
                      }`}
                    >
                      {submitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {t.saving}
                        </>
                      ) : (
                        <>
                          {isEditModalOpen ? <Icons.Edit /> : <Icons.Plus />}
                          {isEditModalOpen ? t.update : t.create}
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsCreateModalOpen(false);
                        setIsEditModalOpen(false);
                        resetForm();
                      }}
                      className="flex-1 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
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
        {isDeleteModalOpen && selectedHouse && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedHouse(null);
              }}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            >
              <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white">
                <div className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <Icons.Delete />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t.deleteProperty}
                  </h3>
                  <p className="text-gray-500 mb-2">{t.deleteConfirmation}</p>
                  <p className="text-sm text-gray-400">{t.actionUndone}</p>
                  <div className="flex gap-3 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsDeleteModalOpen(false);
                        setSelectedHouse(null);
                      }}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      {t.cancel}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDeleteProperty}
                      disabled={submitting}
                      className={`flex-1 px-4 py-2.5 rounded-xl text-white font-medium transition-colors ${
                        submitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      {submitting ? (
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
    </div>
  );
};