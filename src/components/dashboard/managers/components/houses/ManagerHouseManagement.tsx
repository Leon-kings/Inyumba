// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-hooks/set-state-in-effect */
// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import "react-toastify/dist/ReactToastify.css";
// import Cookies from "js-cookie";
// import axios, { AxiosError } from "axios";

// // API Base URL
// const API_BASE_URL = "https://inyumbaproject.eu1.hubfly.app";

// // ============================================================
// // MODAL COMPONENTS (Booking Management Style)
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
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             variants={{
//               hidden: { opacity: 0 },
//               visible: { opacity: 1 },
//               exit: { opacity: 0 },
//             }}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[300]"
//             onClick={onClose}
//           />
//           <motion.div
//             variants={{
//               hidden: { opacity: 0, scale: 0.8, y: 30 },
//               visible: { opacity: 1, scale: 1, y: 0 },
//               exit: { opacity: 0, scale: 0.8, y: 30 },
//             }}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             className="fixed inset-0 z-[301] flex items-center justify-center p-4"
//           >
//             <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white relative overflow-hidden">
//               <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-600" />
//               <div className="p-6">
//                 <div className="flex items-center justify-center mb-4">
//                   <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center relative">
//                     <div className="absolute inset-0 rounded-full border-4 border-green-200 animate-ping opacity-75" />
//                     <svg className="w-10 h-10 text-green-600 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                     </svg>
//                   </div>
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">{title}</h3>
//                 <p className="text-gray-600 text-center mb-2">{message}</p>
//                 {details && <p className="text-sm text-gray-400 text-center mb-6">{details}</p>}
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={onClose}
//                   className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
//                 >
//                   Got it!
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
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
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             variants={{
//               hidden: { opacity: 0 },
//               visible: { opacity: 1 },
//               exit: { opacity: 0 },
//             }}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[300]"
//             onClick={onClose}
//           />
//           <motion.div
//             variants={{
//               hidden: { opacity: 0, scale: 0.8, y: 30 },
//               visible: { opacity: 1, scale: 1, y: 0 },
//               exit: { opacity: 0, scale: 0.8, y: 30 },
//             }}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             className="fixed inset-0 z-[301] flex items-center justify-center p-4"
//           >
//             <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white relative overflow-hidden">
//               <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-red-600" />
//               <div className="p-6">
//                 <div className="flex items-center justify-center mb-4">
//                   <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center relative">
//                     <div className="absolute inset-0 rounded-full border-4 border-red-200 animate-ping opacity-75" />
//                     <svg className="w-10 h-10 text-red-600 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                   </div>
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">{title}</h3>
//                 <p className="text-gray-600 text-center mb-2">{message}</p>
//                 {details && <p className="text-sm text-gray-400 text-center mb-6">{details}</p>}
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={onClose}
//                   className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
//                 >
//                   Try Again
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
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
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             variants={{
//               hidden: { opacity: 0 },
//               visible: { opacity: 1 },
//               exit: { opacity: 0 },
//             }}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[300]"
//             onClick={onClose}
//           />
//           <motion.div
//             variants={{
//               hidden: { opacity: 0, scale: 0.8, y: 30 },
//               visible: { opacity: 1, scale: 1, y: 0 },
//               exit: { opacity: 0, scale: 0.8, y: 30 },
//             }}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             className="fixed inset-0 z-[301] flex items-center justify-center p-4"
//           >
//             <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white relative overflow-hidden">
//               <div className={`absolute top-0 left-0 right-0 h-1 ${colors.buttonBg}`} />
//               <div className="p-6">
//                 <div className="flex items-center justify-center mb-4">
//                   <div className={`w-20 h-20 ${colors.iconBg} rounded-full flex items-center justify-center relative`}>
//                     <div className={`absolute inset-0 rounded-full border-4 ${colors.iconBorder} animate-ping opacity-75`} />
//                     <div className={`${colors.iconColor} relative z-10`}>
//                       {icon || (
//                         type === "danger" ? (
//                           <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                           </svg>
//                         ) : type === "warning" ? (
//                           <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                           </svg>
//                         ) : type === "success" ? (
//                           <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                           </svg>
//                         ) : (
//                           <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//                           </svg>
//                         )
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">{title}</h3>
//                 <p className="text-gray-600 text-center mb-6">{message}</p>
//                 <div className="flex gap-3">
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={onClose}
//                     disabled={isSubmitting}
//                     className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
//                   >
//                     {cancelText}
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={onConfirm}
//                     disabled={isSubmitting}
//                     className={`flex-1 px-4 py-2.5 ${colors.buttonBg} text-white rounded-xl font-medium ${colors.buttonHover} transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2`}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         Loading...
//                       </>
//                     ) : (
//                       confirmText
//                     )}
//                   </motion.button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// // ============================================================
// // TYPES - Matches House Model Exactly
// // ============================================================

// interface Image {
//   public_id: string;
//   url: string;
//   secure_url: string;
//   original_filename?: string;
// }

// interface Location {
//   province: string;
//   district: string;
//   sector: string;
//   cell: string;
//   village: string;
//   address?: string;
//   latitude?: number | null;
//   longitude?: number | null;
// }

// interface Availability {
//   startDate: Date;
//   endDate: Date;
// }

// // Complete House interface matching the Mongoose model
// interface House {
//   _id?: string;
//   houseId: string;
//   name: string;
//   houseType: string;
//   description: string;
//   images: Image[];
//   location: Location;
//   university: string;
//   pricePerMonth: number;
//   currency: string;
//   bedrooms: number;
//   bathrooms: number;
//   guests: number;
//   amenities: string[];
//   status: "available" | "pending" | "booked" | "unavailable" | "maintenance" | "inactive";
//   isActive: boolean;
//   isFeatured?: boolean;
//   availability?: Availability;
//   createdBy?: string;
//   createdByEmail?: string;
//   ownerName: string;
//   ownerEmail: string;
//   ownerContact: string;
//   createdAt?: string;
//   updatedAt?: string;
// }

// // ============================================================
// // TRANSLATIONS
// // ============================================================

// const translations = {
//   en: {
//     hostManagement: "House Management",
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
//     bookedProperties: "Booked",
//     unavailableProperties: "Unavailable",
//     maintenanceProperties: "Maintenance",
//     inactiveProperties: "Inactive",
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
//     houseType: "House Type",
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
//     booked: "Booked",
//     unavailable: "Unavailable",
//     maintenance: "Maintenance",
//     inactive: "Inactive",
//     pending: "Pending",
//     all: "All",
//     selectStatus: "Select Status",
//     enterName: "Enter property name",
//     enterHouseType: "Enter house type (apartment, villa, etc.)",
//     enterDescription: "Enter property description",
//     enterPrice: "Enter price per month",
//     enterBedrooms: "Enter number of bedrooms",
//     enterBathrooms: "Enter number of bathrooms",
//     enterMaxGuests: "Enter maximum guests",
//     addAmenity: "Add Amenity",
//     remove: "Remove",
//     provincePlaceholder: "Select province",
//     districtPlaceholder: "Enter district",
//     sectorPlaceholder: "Enter sector",
//     cellPlaceholder: "Enter cell",
//     villagePlaceholder: "Enter village",
//     ownerName: "Owner Name",
//     ownerEmail: "Owner Email",
//     ownerContact: "Owner Contact",
//     uploadImages: "Upload Images (2-10 images)",
//     dropImages: "Drop images here or click to upload (2-10 images)",
//     imagePreview: "Image Preview",
//     noImage: "No image",
//     success: "Success!",
//     error: "Error",
//     statuses: {
//       available: "Available",
//       pending: "Pending",
//       booked: "Booked",
//       unavailable: "Unavailable",
//       maintenance: "Maintenance",
//       inactive: "Inactive",
//     },
//     validation: {
//       nameRequired: "Property name is required",
//       nameMinLength: "Name must be at least 2 characters",
//       nameMaxLength: "Name cannot exceed 200 characters",
//       houseTypeRequired: "House type is required",
//       descriptionMinLength: "Description must be at least 20 characters",
//       descriptionMaxLength: "Description cannot exceed 5000 characters",
//       provinceRequired: "Province is required",
//       districtRequired: "District is required",
//       sectorRequired: "Sector is required",
//       cellRequired: "Cell is required",
//       villageRequired: "Village is required",
//       priceMin: "Price must be greater than 0",
//       bedroomsMin: "Bedrooms must be at least 0",
//       bathroomsMin: "Bathrooms must be at least 0",
//       maxGuestsMin: "Max guests must be at least 1",
//       ownerEmailInvalid: "Please enter a valid email",
//       imagesMin: "Please upload at least 2 images",
//       imagesMax: "Maximum 10 images allowed",
//     },
//   },
//   fr: {
//     hostManagement: "Gestion des Maisons",
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
//     bookedProperties: "Réservé",
//     unavailableProperties: "Indisponible",
//     maintenanceProperties: "Maintenance",
//     inactiveProperties: "Inactif",
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
//     houseType: "Type de Maison",
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
//     booked: "Réservé",
//     unavailable: "Indisponible",
//     maintenance: "Maintenance",
//     inactive: "Inactif",
//     pending: "En Attente",
//     all: "Tous",
//     selectStatus: "Sélectionner le Statut",
//     enterName: "Entrez le nom de la propriété",
//     enterHouseType: "Entrez le type de maison (appartement, villa, etc.)",
//     enterDescription: "Entrez la description de la propriété",
//     enterPrice: "Entrez le prix par mois",
//     enterBedrooms: "Entrez le nombre de chambres",
//     enterBathrooms: "Entrez le nombre de salles de bain",
//     enterMaxGuests: "Entrez le nombre maximum d'invités",
//     addAmenity: "Ajouter un Équipement",
//     remove: "Supprimer",
//     provincePlaceholder: "Sélectionner la province",
//     districtPlaceholder: "Entrez le district",
//     sectorPlaceholder: "Entrez le secteur",
//     cellPlaceholder: "Entrez la cellule",
//     villagePlaceholder: "Entrez le village",
//     ownerName: "Nom du Propriétaire",
//     ownerEmail: "Email du Propriétaire",
//     ownerContact: "Contact du Propriétaire",
//     uploadImages: "Télécharger des Images (2-10 images)",
//     dropImages: "Déposez les images ici ou cliquez pour télécharger (2-10 images)",
//     imagePreview: "Aperçu de l'Image",
//     noImage: "Pas d'image",
//     success: "Succès !",
//     error: "Erreur",
//     statuses: {
//       available: "Disponible",
//       pending: "En Attente",
//       booked: "Réservé",
//       unavailable: "Indisponible",
//       maintenance: "Maintenance",
//       inactive: "Inactif",
//     },
//     validation: {
//       nameRequired: "Le nom de la propriété est requis",
//       nameMinLength: "Le nom doit contenir au moins 2 caractères",
//       nameMaxLength: "Le nom ne peut pas dépasser 200 caractères",
//       houseTypeRequired: "Le type de maison est requis",
//       descriptionMinLength: "La description doit contenir au moins 20 caractères",
//       descriptionMaxLength: "La description ne peut pas dépasser 5000 caractères",
//       provinceRequired: "La province est requise",
//       districtRequired: "Le district est requis",
//       sectorRequired: "Le secteur est requis",
//       cellRequired: "La cellule est requise",
//       villageRequired: "Le village est requis",
//       priceMin: "Le prix doit être supérieur à 0",
//       bedroomsMin: "Les chambres doivent être au moins 0",
//       bathroomsMin: "Les salles de bain doivent être au moins 0",
//       maxGuestsMin: "Le nombre max d'invités doit être au moins 1",
//       ownerEmailInvalid: "Veuillez entrer un email valide",
//       imagesMin: "Veuillez télécharger au moins 2 images",
//       imagesMax: "Maximum 10 images autorisées",
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
//     bookedProperties: "Byaritswe",
//     unavailableProperties: "Ntaho",
//     maintenanceProperties: "Muri Maintenance",
//     inactiveProperties: "Ntigikora",
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
//     houseType: "Ubwoko bw'Inzu",
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
//     booked: "Byaritswe",
//     unavailable: "Ntaho",
//     maintenance: "Muri Maintenance",
//     inactive: "Ntigikora",
//     pending: "Bitegereje",
//     all: "Byose",
//     selectStatus: "Hitamo Ihagaze",
//     enterName: "Andika izina ry'inzu",
//     enterHouseType: "Andika ubwoko bw'inzu (apartment, villa, nk.)",
//     enterDescription: "Andika ibisobanuro by'inzu",
//     enterPrice: "Andika igiciro ku kwezi",
//     enterBedrooms: "Andika umubare w'ibyumba",
//     enterBathrooms: "Andika umubare w'amazu y'isuku",
//     enterMaxGuests: "Andika umubare w'abashyitsi",
//     addAmenity: "Ongeraho Ibikoresho",
//     remove: "Kuraho",
//     provincePlaceholder: "Hitamo Intara",
//     districtPlaceholder: "Andika Akarere",
//     sectorPlaceholder: "Andika Umurenge",
//     cellPlaceholder: "Andika Akagari",
//     villagePlaceholder: "Andika Umudugudu",
//     ownerName: "Izina ry'Umutambyi",
//     ownerEmail: "Imeri y'Umutambyi",
//     ownerContact: "Telefone y'Umutambyi",
//     uploadImages: "Ongeraho Amashusho (2-10 amashusho)",
//     dropImages: "Shyira amashusho hano cyangwa kanda guterura (2-10 amashusho)",
//     imagePreview: "Reba Ishusho",
//     noImage: "Nta shusho",
//     success: "Byakunze!",
//     error: "Ikosa",
//     statuses: {
//       available: "Irahari",
//       pending: "Bitegereje",
//       booked: "Byaritswe",
//       unavailable: "Ntaho",
//       maintenance: "Muri Maintenance",
//       inactive: "Ntigikora",
//     },
//     validation: {
//       nameRequired: "Izina ry'inzu rirasabwa",
//       nameMinLength: "Izina rigomba kugira byibura inyuguti 2",
//       nameMaxLength: "Izina ntirigomba kurenga inyuguti 200",
//       houseTypeRequired: "Ubwoko bw'inzu burakenewe",
//       descriptionMinLength: "Ibisobanuro bigomba kugira byibura inyuguti 20",
//       descriptionMaxLength: "Ibisobanuro ntibigomba kurenga inyuguti 5000",
//       provinceRequired: "Intara irakenewe",
//       districtRequired: "Akarere gakenewe",
//       sectorRequired: "Umurenge urakenewe",
//       cellRequired: "Akagari gakenewe",
//       villageRequired: "Umudugudu urakenewe",
//       priceMin: "Igiciro kigomba kuba kirenze 0",
//       bedroomsMin: "Ibyumba bigomba kuba byibura 0",
//       bathroomsMin: "Amazu y'isuku agomba kuba byibura 0",
//       maxGuestsMin: "Abashyitsi benshi bagomba kuba byibura 1",
//       ownerEmailInvalid: "Andika imeri ikwiye",
//       imagesMin: "Ongeraho byibura amashusho 2",
//       imagesMax: "Amashusho ntarengwa ni 10",
//     },
//   },
// };

// // ============================================================
// // HELPER FUNCTIONS
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
//   } catch {
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
//   } catch {
//     return "";
//   }
// };

// const getToken = (): string => {
//   try {
//     return localStorage.getItem("token") || "";
//   } catch {
//     return "";
//   }
// };

// const getLocationDisplay = (house: House): string => {
//   if (!house.location) return "Location not specified";
//   const { village, district } = house.location;
//   if (!village && !district) return "Location not specified";
//   return `${village || "N/A"}, ${district || "N/A"}`;
// };

// const getFullLocationDisplay = (house: House): string => {
//   if (!house.location) return "Location not specified";
//   const { village, sector, district, province } = house.location;
//   if (!village && !sector && !district && !province) {
//     return "Location not specified";
//   }
//   return `${village || "N/A"}, ${sector || "N/A"}, ${district || "N/A"}, ${province || "N/A"}`;
// };

// // ============================================================
// // API SERVICE
// // ============================================================

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = getToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// const houseApi = {
//   getHouses: async (): Promise<House[]> => {
//     const response = await api.get("/houses");
//     return response.data.data || [];
//   },

//   createHouse: async (formData: FormData): Promise<House> => {
//     const response = await api.post("/houses", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return response.data.data || response.data;
//   },

//   updateHouse: async (id: string, formData: FormData): Promise<House> => {
//     const response = await api.put(`/houses/${id}`, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return response.data.data || response.data;
//   },

//   deleteHouse: async (id: string): Promise<void> => {
//     await api.delete(`/houses/${id}`);
//   },

//   updateHouseStatus: async (id: string, status: string): Promise<House> => {
//     const response = await api.put(`/houses/${id}/status`, { status });
//     return response.data.data || response.data;
//   },
// };

// // Icons
// const Icons = {
//   Home: () => (
//     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//     </svg>
//   ),
//   Plus: () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
//     </svg>
//   ),
//   Edit: () => (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//     </svg>
//   ),
//   Delete: () => (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//     </svg>
//   ),
//   View: () => (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//     </svg>
//   ),
//   Search: () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//     </svg>
//   ),
//   Filter: () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
//     </svg>
//   ),
//   Close: () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//     </svg>
//   ),
//   Check: () => (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//     </svg>
//   ),
//   Upload: () => (
//     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//     </svg>
//   ),
//   Bed: () => (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16M4 12h16M4 20h16" />
//     </svg>
//   ),
//   Bath: () => (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h14M5 5v14M5 5h14M5 19h14M5 19v-4M5 19H3M19 19v-4" />
//     </svg>
//   ),
//   User: () => (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//     </svg>
//   ),
//   Location: () => (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//     </svg>
//   ),
//   Status: () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//     </svg>
//   ),
// };

// // ============================================================
// // MAIN COMPONENT - ManagerHouseManagement
// // ============================================================

// export const ManagerHouseManagement: React.FC = () => {
//   const [lang, setLang] = useState<"en" | "fr" | "rw">(getLanguageFromCookies());
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
//   const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
//   const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
//   const [newStatus, setNewStatus] = useState<House["status"]>("available");

//   // Success/Error modal states
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

//   // Form validation states
//   const [formErrors, setFormErrors] = useState<Record<string, string>>({});
//   const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

//   // Image upload states
//   const [imageFiles, setImageFiles] = useState<File[]>([]);
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Property form state - Matches Mongoose Model exactly
//   const [propertyFormData, setPropertyFormData] = useState({
//     name: "",
//     houseType: "",
//     description: "",
//     university: "",
//     location: {
//       province: "",
//       district: "",
//       sector: "",
//       cell: "",
//       village: "",
//       address: "",
//       latitude: null as number | null,
//       longitude: null as number | null,
//     },
//     pricePerMonth: 0,
//     currency: "RWF",
//     bedrooms: 1,
//     bathrooms: 1,
//     guests: 2,
//     amenities: [] as string[],
//     status: "pending" as House["status"],
//     ownerName: userName || "",
//     ownerEmail: userEmail || "",
//     ownerContact: "",
//     isActive: true,
//     isFeatured: false,
//   });

//   const [amenityInput, setAmenityInput] = useState("");

//   // Statistics
//   const [stats, setStats] = useState({
//     total: 0,
//     available: 0,
//     pending: 0,
//     booked: 0,
//     unavailable: 0,
//     maintenance: 0,
//     inactive: 0,
//   });

//   const t = translations[lang];

//   const showSuccessModal = (title: string, message: string, details?: string) => {
//     setSuccessModal({ isOpen: true, title, message, details });
//   };

//   const showErrorModal = (title: string, message: string, details?: string) => {
//     setErrorModal({ isOpen: true, title, message, details });
//   };

//   // Listen for language changes
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newLang = getLanguageFromCookies();
//       if (newLang !== lang) setLang(newLang);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [lang]);

//   const loadHouses = useCallback(async () => {
//     try {
//       setLoading(true);
//       const data = await houseApi.getHouses();
//       const housesWithImages = data.map((house) => ({
//         ...house,
//         images: house.images || [],
//         location: {
//           province: house.location?.province || "",
//           district: house.location?.district || "",
//           sector: house.location?.sector || "",
//           cell: house.location?.cell || "",
//           village: house.location?.village || "",
//           address: house.location?.address || "",
//           latitude: house.location?.latitude ?? null,
//           longitude: house.location?.longitude ?? null,
//         },
//         guests: house.guests || 1,
//         currency: house.currency || "RWF",
//         isActive: house.isActive !== undefined ? house.isActive : true,
//         isFeatured: house.isFeatured || false,
//       }));
//       setHouses(housesWithImages);
//       setFilteredHouses(housesWithImages);
//     } catch (error) {
//       showErrorModal(
//         t.error || "Error",
//         "Failed to load houses",
//         error instanceof Error ? error.message : undefined,
//       );
//     } finally {
//       setLoading(false);
//     }
//   }, [t]);

//   // Live validation
//   const validateForm = useCallback(() => {
//     const errors: Record<string, string> = {};
//     const v = t.validation;

//     if (!propertyFormData.name?.trim()) {
//       errors.name = v.nameRequired;
//     } else if (propertyFormData.name.length < 2) {
//       errors.name = v.nameMinLength;
//     } else if (propertyFormData.name.length > 200) {
//       errors.name = v.nameMaxLength;
//     }

//     if (!propertyFormData.houseType?.trim()) {
//       errors.houseType = v.houseTypeRequired;
//     }

//     if (propertyFormData.description && propertyFormData.description.length > 5000) {
//       errors.description = v.descriptionMaxLength;
//     }

//     if (!propertyFormData.location.province) {
//       errors.province = v.provinceRequired;
//     }
//     if (!propertyFormData.location.district?.trim()) {
//       errors.district = v.districtRequired;
//     }
//     if (!propertyFormData.location.sector?.trim()) {
//       errors.sector = v.sectorRequired;
//     }
//     if (!propertyFormData.location.cell?.trim()) {
//       errors.cell = v.cellRequired;
//     }
//     if (!propertyFormData.location.village?.trim()) {
//       errors.village = v.villageRequired;
//     }

//     if (propertyFormData.pricePerMonth <= 0) {
//       errors.pricePerMonth = v.priceMin;
//     } else if (!Number.isInteger(propertyFormData.pricePerMonth)) {
//       errors.pricePerMonth = "Price must be a whole number";
//     }

//     if (propertyFormData.bedrooms < 0) {
//       errors.bedrooms = v.bedroomsMin;
//     }
//     if (propertyFormData.bathrooms < 0) {
//       errors.bathrooms = v.bathroomsMin;
//     }
//     if (propertyFormData.guests < 1) {
//       errors.guests = v.maxGuestsMin;
//     }

//     if (propertyFormData.ownerEmail && !/\S+@\S+\.\S+/.test(propertyFormData.ownerEmail)) {
//       errors.ownerEmail = v.ownerEmailInvalid;
//     }

//     const imageCount = imageFiles.length + (selectedHouse?.images?.length || 0);
//     if (imageCount < 2) errors.images = v.imagesMin;
//     else if (imageCount > 10) errors.images = v.imagesMax;

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   }, [propertyFormData, imageFiles, selectedHouse, t.validation]);

//   // Check if form is valid
//   const isFormValid = useCallback(() => {
//     const hasNoErrors = Object.keys(formErrors).length === 0;
//     const imageCount = imageFiles.length + (selectedHouse?.images?.length || 0);
//     const hasValidImages = imageCount >= 2 && imageCount <= 10;

//     const hasName = propertyFormData.name?.trim().length > 0;
//     const hasHouseType = propertyFormData.houseType?.trim().length > 0;
//     const hasProvince = propertyFormData.location.province?.length > 0;
//     const hasDistrict = propertyFormData.location.district?.trim().length > 0;
//     const hasSector = propertyFormData.location.sector?.trim().length > 0;
//     const hasCell = propertyFormData.location.cell?.trim().length > 0;
//     const hasVillage = propertyFormData.location.village?.trim().length > 0;
//     const hasPrice = propertyFormData.pricePerMonth > 0;
//     const hasGuests = propertyFormData.guests >= 1;

//     const hasRequiredFields = hasName && hasHouseType && hasProvince &&
//       hasDistrict && hasSector && hasCell &&
//       hasVillage && hasPrice && hasGuests;

//     return hasNoErrors && hasValidImages && hasRequiredFields;
//   }, [formErrors, imageFiles, selectedHouse, propertyFormData]);

//   useEffect(() => {
//     loadHouses();
//   }, [loadHouses]);

//   // Filter houses
//   useEffect(() => {
//     let filtered = [...houses];
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       filtered = filtered.filter(
//         (h) =>
//           h.name?.toLowerCase().includes(term) ||
//           h.houseType?.toLowerCase().includes(term) ||
//           h.university?.toLowerCase().includes(term) ||
//           h.location?.district?.toLowerCase().includes(term) ||
//           h.location?.village?.toLowerCase().includes(term),
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
//       booked: houses.filter((h) => h.status === "booked").length,
//       unavailable: houses.filter((h) => h.status === "unavailable").length,
//       maintenance: houses.filter((h) => h.status === "maintenance").length,
//       inactive: houses.filter((h) => h.status === "inactive").length,
//     });
//   }, [houses]);

//   // Get status badge
//   const getStatusColor = (status: string): string => {
//     const colors = {
//       available: "bg-green-100 text-green-800 border-green-200",
//       pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
//       booked: "bg-blue-100 text-blue-800 border-blue-200",
//       unavailable: "bg-gray-100 text-gray-800 border-gray-200",
//       maintenance: "bg-red-100 text-red-800 border-red-200",
//       inactive: "bg-gray-300 text-gray-600 border-gray-300",
//     };
//     return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
//   };

//   const getStatusLabel = (status: string): string => {
//     const labels = {
//       available: t.available,
//       pending: t.pending,
//       booked: t.booked,
//       unavailable: t.unavailable,
//       maintenance: t.maintenance,
//       inactive: t.inactive,
//     };
//     return labels[status as keyof typeof labels] || status;
//   };

//   const formatCurrency = (amount: number): string => {
//     return `RWF ${amount?.toLocaleString() || 0}`;
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
//       amenities: prev.amenities.filter((amenity) => amenity !== amenityToRemove),
//     }));
//   };

//   // Handle field blur
//   const handleFieldBlur = (field: string) => {
//     setTouchedFields((prev) => ({ ...prev, [field]: true }));
//     validateForm();
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

//     const fieldName = field.includes(".") ? field.split(".")[1] : field;
//     if (value && value.toString().trim().length > 0) {
//       setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
//     }
//     validateForm();
//   };

//   const handleLocationChange = (field: string, value: string) => {
//     setPropertyFormData((prev) => ({
//       ...prev,
//       location: { ...prev.location, [field]: value },
//     }));
//     if (value && value.trim().length > 0) {
//       setTouchedFields((prev) => ({ ...prev, [field]: true }));
//     }
//     validateForm();
//   };

//   // Image handling
//   const handleImageUpload = (files: FileList | null) => {
//     if (!files) return;
//     const fileArray = Array.from(files);
//     const currentCount = imageFiles.length + (selectedHouse?.images?.length || 0);
//     const maxAllowed = 10;
//     const remaining = maxAllowed - currentCount;

//     if (remaining <= 0) {
//       showErrorModal(
//         t.error || "Error",
//         t.validation.imagesMax || "Maximum 10 images allowed",
//       );
//       return;
//     }

//     const filesToAdd = fileArray.slice(0, remaining);
//     setImageFiles((prev) => [...prev, ...filesToAdd]);

//     filesToAdd.forEach((file) => {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setImagePreviews((prev) => [...prev, e.target?.result as string]);
//       };
//       reader.readAsDataURL(file);
//     });

//     setTouchedFields((prev) => ({ ...prev, images: true }));
//     validateForm();
//   };

//   const removeImage = (index: number) => {
//     const newImageFiles = imageFiles.filter((_, i) => i !== index);
//     const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
//     const totalImages = newImageFiles.length + (selectedHouse?.images?.length || 0);

//     if (totalImages < 2) {
//       showErrorModal(
//         t.error || "Error",
//         t.validation.imagesMin || "Minimum 2 images required",
//       );
//       return;
//     }

//     setImageFiles(newImageFiles);
//     setImagePreviews(newImagePreviews);
//     validateForm();
//   };

//   // Create FormData for API
//   const createFormData = (): FormData => {
//     const formData = new FormData();

//     formData.append("name", propertyFormData.name || "");
//     formData.append("houseType", propertyFormData.houseType || "apartment");
//     formData.append("description", propertyFormData.description || "");
//     formData.append("university", propertyFormData.university || "");
//     formData.append("pricePerMonth", String(propertyFormData.pricePerMonth || 0));
//     formData.append("currency", propertyFormData.currency || "RWF");

//     const guestValue = propertyFormData.guests || 1;
//     formData.append("guests", String(guestValue));
//     formData.append("maxGuests", String(guestValue));

//     formData.append("bedrooms", String(propertyFormData.bedrooms || 0));
//     formData.append("bathrooms", String(propertyFormData.bathrooms || 0));
//     formData.append("status", propertyFormData.status || "pending");

//     const location = {
//       province: propertyFormData.location.province || "",
//       district: propertyFormData.location.district || "",
//       sector: propertyFormData.location.sector || "",
//       cell: propertyFormData.location.cell || "",
//       village: propertyFormData.location.village || "",
//       address: propertyFormData.location.address || "",
//       latitude: propertyFormData.location.latitude,
//       longitude: propertyFormData.location.longitude,
//     };
//     formData.append("location", JSON.stringify(location));

//     formData.append("ownerName", propertyFormData.ownerName || "");
//     formData.append("ownerEmail", propertyFormData.ownerEmail || "");
//     formData.append("ownerContact", propertyFormData.ownerContact || "");

//     if (propertyFormData.amenities.length > 0) {
//       formData.append("amenities", JSON.stringify(propertyFormData.amenities));
//     }

//     formData.append("isActive", String(propertyFormData.isActive !== false));
//     formData.append("isFeatured", String(propertyFormData.isFeatured || false));

//     if (userEmail) {
//       formData.append("createdByEmail", userEmail);
//     }

//     imageFiles.forEach((file) => {
//       formData.append("images", file);
//     });

//     return formData;
//   };

//   // CRUD Operations
//   const handleCreateProperty = async () => {
//     const isValid = validateForm();

//     const hasName = propertyFormData.name?.trim().length > 0;
//     const hasHouseType = propertyFormData.houseType?.trim().length > 0;
//     const hasProvince = propertyFormData.location.province?.length > 0;
//     const hasDistrict = propertyFormData.location.district?.trim().length > 0;
//     const hasSector = propertyFormData.location.sector?.trim().length > 0;
//     const hasCell = propertyFormData.location.cell?.trim().length > 0;
//     const hasVillage = propertyFormData.location.village?.trim().length > 0;
//     const hasPrice = propertyFormData.pricePerMonth > 0;
//     const hasGuests = propertyFormData.guests >= 1;
//     const hasImages = imageFiles.length + (selectedHouse?.images?.length || 0) >= 2;

//     if (!isValid || !hasName || !hasHouseType || !hasProvince || !hasDistrict ||
//       !hasSector || !hasCell || !hasVillage || !hasPrice || !hasGuests || !hasImages) {
//       showErrorModal(t.error || "Error", "Please fill in all required fields");
//       const allFields = [
//         "name", "houseType", "province", "district", "sector", "cell", "village",
//         "pricePerMonth", "guests", "ownerName", "ownerEmail"
//       ];
//       const touched: Record<string, boolean> = {};
//       allFields.forEach((field) => { touched[field] = true; });
//       setTouchedFields(touched);
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const formData = createFormData();
//       const newHouse = await houseApi.createHouse(formData);

//       const houseWithImages = {
//         ...newHouse,
//         images: newHouse.images || [],
//         location: {
//           province: newHouse.location?.province || "",
//           district: newHouse.location?.district || "",
//           sector: newHouse.location?.sector || "",
//           cell: newHouse.location?.cell || "",
//           village: newHouse.location?.village || "",
//           address: newHouse.location?.address || "",
//           latitude: newHouse.location?.latitude ?? null,
//           longitude: newHouse.location?.longitude ?? null,
//         },
//         guests: newHouse.guests || 1,
//         currency: newHouse.currency || "RWF",
//         isActive: newHouse.isActive !== undefined ? newHouse.isActive : true,
//         isFeatured: newHouse.isFeatured || false,
//       };

//       setHouses((prev) => [houseWithImages, ...prev]);
//       showSuccessModal(
//         t.success || "Success!",
//         t.propertyCreated || "Property created successfully!",
//         `${newHouse.name} has been added to your listings`,
//       );
//       setIsCreateModalOpen(false);
//       resetForm();
//     } catch (error) {
//       const axiosError = error as AxiosError;
//       const responseData = axiosError.response?.data as any;
//       if (responseData?.errors) {
//         const errorMessages = responseData.errors.map((e: any) => `${e.msg} (${e.path})`).join(", ");
//         showErrorModal(t.error || "Error", `Validation failed: ${errorMessages}`);
//       } else {
//         const errorMessage = responseData?.message || t.createFailed;
//         showErrorModal(t.error || "Error", errorMessage);
//       }
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleUpdateProperty = async () => {
//     if (!selectedHouse) return;

//     const isValid = validateForm();

//     const hasName = propertyFormData.name?.trim().length > 0;
//     const hasHouseType = propertyFormData.houseType?.trim().length > 0;
//     const hasProvince = propertyFormData.location.province?.length > 0;
//     const hasDistrict = propertyFormData.location.district?.trim().length > 0;
//     const hasSector = propertyFormData.location.sector?.trim().length > 0;
//     const hasCell = propertyFormData.location.cell?.trim().length > 0;
//     const hasVillage = propertyFormData.location.village?.trim().length > 0;
//     const hasPrice = propertyFormData.pricePerMonth > 0;
//     const hasGuests = propertyFormData.guests >= 1;
//     const hasImages = imageFiles.length + (selectedHouse?.images?.length || 0) >= 2;

//     if (!isValid || !hasName || !hasHouseType || !hasProvince || !hasDistrict ||
//       !hasSector || !hasCell || !hasVillage || !hasPrice || !hasGuests || !hasImages) {
//       showErrorModal(t.error || "Error", "Please fill in all required fields");
//       const allFields = [
//         "name", "houseType", "province", "district", "sector", "cell", "village",
//         "pricePerMonth", "guests", "ownerName", "ownerEmail"
//       ];
//       const touched: Record<string, boolean> = {};
//       allFields.forEach((field) => { touched[field] = true; });
//       setTouchedFields(touched);
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const formData = createFormData();
//       const updatedHouse = await houseApi.updateHouse(selectedHouse._id!, formData);

//       const houseWithImages = {
//         ...updatedHouse,
//         images: updatedHouse.images || [],
//         location: {
//           province: updatedHouse.location?.province || "",
//           district: updatedHouse.location?.district || "",
//           sector: updatedHouse.location?.sector || "",
//           cell: updatedHouse.location?.cell || "",
//           village: updatedHouse.location?.village || "",
//           address: updatedHouse.location?.address || "",
//           latitude: updatedHouse.location?.latitude ?? null,
//           longitude: updatedHouse.location?.longitude ?? null,
//         },
//         guests: updatedHouse.guests || 1,
//         currency: updatedHouse.currency || "RWF",
//         isActive: updatedHouse.isActive !== undefined ? updatedHouse.isActive : true,
//         isFeatured: updatedHouse.isFeatured || false,
//       };

//       setHouses((prev) =>
//         prev.map((h) => (h._id === selectedHouse._id ? houseWithImages : h)),
//       );
//       showSuccessModal(
//         t.success || "Success!",
//         t.propertyUpdated || "Property updated successfully!",
//         `${updatedHouse.name} has been updated`,
//       );
//       setIsEditModalOpen(false);
//       setSelectedHouse(null);
//       resetForm();
//     } catch (error) {
//       const axiosError = error as AxiosError;
//       const errorMessage = axiosError.response?.data
//         ? typeof axiosError.response?.data === "string"
//           ? axiosError.response?.data
//           : JSON.stringify(axiosError.response?.data)
//         : t.updateFailed;
//       showErrorModal(t.error || "Error", errorMessage);
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
//       showSuccessModal(
//         t.success || "Success!",
//         t.propertyDeleted || "Property deleted successfully!",
//         `${selectedHouse.name} has been removed from your listings`,
//       );
//       setIsDeleteModalOpen(false);
//       setSelectedHouse(null);
//     } catch (error) {
//       const axiosError = error as AxiosError;
//       showErrorModal(
//         t.error || "Error",
//         t.deleteFailed || "Failed to delete property",
//         axiosError.response?.data ? String(axiosError.response?.data) : undefined,
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleStatusUpdate = async () => {
//     if (!selectedHouse || !newStatus) return;

//     setSubmitting(true);
//     try {
//       const updatedHouse = await houseApi.updateHouseStatus(selectedHouse._id!, newStatus);

//       const houseWithImages = {
//         ...updatedHouse,
//         images: updatedHouse.images || [],
//         location: {
//           province: updatedHouse.location?.province || "",
//           district: updatedHouse.location?.district || "",
//           sector: updatedHouse.location?.sector || "",
//           cell: updatedHouse.location?.cell || "",
//           village: updatedHouse.location?.village || "",
//           address: updatedHouse.location?.address || "",
//           latitude: updatedHouse.location?.latitude ?? null,
//           longitude: updatedHouse.location?.longitude ?? null,
//         },
//         guests: updatedHouse.guests || 1,
//         currency: updatedHouse.currency || "RWF",
//         isActive: updatedHouse.isActive !== undefined ? updatedHouse.isActive : true,
//         isFeatured: updatedHouse.isFeatured || false,
//       };

//       setHouses((prev) =>
//         prev.map((h) => (h._id === selectedHouse._id ? houseWithImages : h)),
//       );

//       showSuccessModal(
//         t.success || "Success!",
//         "Status updated successfully!",
//         `${selectedHouse.name} is now ${getStatusLabel(newStatus)}`,
//       );

//       setIsStatusModalOpen(false);
//       setSelectedHouse(null);
//     } catch (error) {
//       const axiosError = error as AxiosError;
//       showErrorModal(
//         t.error || "Error",
//         "Failed to update status",
//         axiosError.response?.data ? String(axiosError.response?.data) : undefined,
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Reset form
//   const resetForm = () => {
//     setPropertyFormData({
//       name: "",
//       houseType: "",
//       description: "",
//       university: "",
//       location: {
//         province: "",
//         district: "",
//         sector: "",
//         cell: "",
//         village: "",
//         address: "",
//         latitude: null,
//         longitude: null,
//       },
//       pricePerMonth: 0,
//       currency: "RWF",
//       bedrooms: 1,
//       bathrooms: 1,
//       guests: 2,
//       amenities: [],
//       status: "pending",
//       ownerName: userName || "",
//       ownerEmail: userEmail || "",
//       ownerContact: "",
//       isActive: true,
//       isFeatured: false,
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
//       name: house.name || "",
//       houseType: house.houseType || "",
//       description: house.description || "",
//       university: house.university || "",
//       location: {
//         province: house.location?.province || "",
//         district: house.location?.district || "",
//         sector: house.location?.sector || "",
//         cell: house.location?.cell || "",
//         village: house.location?.village || "",
//         address: house.location?.address || "",
//         latitude: house.location?.latitude ?? null,
//         longitude: house.location?.longitude ?? null,
//       },
//       pricePerMonth: house.pricePerMonth || 0,
//       currency: house.currency || "RWF",
//       bedrooms: house.bedrooms || 1,
//       bathrooms: house.bathrooms || 1,
//       guests: house.guests || 2,
//       amenities: house.amenities || [],
//       status: house.status || "pending",
//       ownerName: house.ownerName || "",
//       ownerEmail: house.ownerEmail || "",
//       ownerContact: house.ownerContact || "",
//       isActive: house.isActive !== undefined ? house.isActive : true,
//       isFeatured: house.isFeatured || false,
//     });
//     setImageFiles([]);
//     setImagePreviews(house.images ? house.images.map((img) => img.url) : []);
//     setTouchedFields({});
//     setFormErrors({});
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

//   const openStatusModal = (house: House) => {
//     setSelectedHouse(house);
//     setNewStatus(house.status || "available");
//     setIsStatusModalOpen(true);
//   };

//   const getStatusOptions = (currentStatus: string): House["status"][] => {
//     const allStatuses: House["status"][] = [
//       "available",
//       "pending",
//       "booked",
//       "unavailable",
//       "maintenance",
//       "inactive",
//     ];
//     return allStatuses.filter((status) => status !== currentStatus);
//   };

//   // Render input with live validation
//   const renderInput = (
//     label: string,
//     field: string,
//     type: string = "text",
//     placeholder: string = "",
//     required: boolean = true,
//     value?: string | number,
//     onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
//   ) => {
//     const fieldName = field.includes(".") ? field.split(".")[1] : field;
//     const error = formErrors[fieldName];
//     const isTouched = touchedFields[fieldName];
//     const showError = isTouched && error;

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
//               showError
//                 ? "border-red-500 bg-red-50"
//                 : isTouched && !error && value && String(value).trim().length > 0
//                 ? "border-green-500 bg-green-50"
//                 : "border-gray-300"
//             }`}
//             placeholder={placeholder}
//           />
//         ) : type === "select" ? (
//           <select
//             value={(value as string) || ""}
//             onChange={onChange}
//             onBlur={() => handleFieldBlur(fieldName)}
//             className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white transition-all ${
//               showError
//                 ? "border-red-500 bg-red-50"
//                 : isTouched && !error && value && String(value).trim().length > 0
//                 ? "border-green-500 bg-green-50"
//                 : "border-gray-300"
//             }`}
//           >
//             {placeholder && <option value="">{placeholder}</option>}
//           </select>
//         ) : (
//           <input
//             type={type}
//             value={(value as string) || ""}
//             onChange={onChange}
//             onBlur={() => handleFieldBlur(fieldName)}
//             className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm transition-all ${
//               showError
//                 ? "border-red-500 bg-red-50"
//                 : isTouched && !error && value && String(value).trim().length > 0
//                 ? "border-green-500 bg-green-50"
//                 : "border-gray-300"
//             }`}
//             placeholder={placeholder}
//             min={type === "number" ? 0 : undefined}
//           />
//         )}
//         {showError && <p className="mt-1 text-sm text-red-500">{error}</p>}
//         {isTouched && !error && value && String(value).trim().length > 0 && (
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
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
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
//           { label: t.totalProperties, value: stats.total, color: "bg-gradient-to-br from-blue-500 to-blue-600" },
//           { label: t.availableProperties, value: stats.available, color: "bg-gradient-to-br from-green-500 to-green-600" },
//           { label: t.pendingProperties, value: stats.pending, color: "bg-gradient-to-br from-yellow-500 to-yellow-600" },
//           { label: t.bookedProperties, value: stats.booked, color: "bg-gradient-to-br from-purple-500 to-purple-600" },
//           { label: t.unavailableProperties, value: stats.unavailable, color: "bg-gradient-to-br from-gray-500 to-gray-600" },
//           { label: t.maintenanceProperties, value: stats.maintenance, color: "bg-gradient-to-br from-red-500 to-red-600" },
//           { label: t.inactiveProperties, value: stats.inactive, color: "bg-gradient-to-br from-gray-400 to-gray-500" },
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
//               <option value="booked">{t.booked}</option>
//               <option value="unavailable">{t.unavailable}</option>
//               <option value="maintenance">{t.maintenance}</option>
//               <option value="inactive">{t.inactive}</option>
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
//                   alt={house.name || "Property"}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute top-3 right-3">
//                   <span
//                     className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(house.status)}`}
//                   >
//                     {getStatusLabel(house.status)}
//                   </span>
//                 </div>
//               </div>
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-900 truncate">
//                   {house.name || "Unnamed Property"}
//                 </h3>
//                 <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
//                   <Icons.Location />
//                   {getLocationDisplay(house)}
//                 </p>
//                 <div className="flex items-center gap-2 mt-2 text-sm">
//                   <span className="flex items-center gap-1 text-gray-600">
//                     <Icons.Bed /> {house.bedrooms || 0}
//                   </span>
//                   <span className="text-gray-300">|</span>
//                   <span className="flex items-center gap-1 text-gray-600">
//                     <Icons.Bath /> {house.bathrooms || 0}
//                   </span>
//                   <span className="text-gray-300">|</span>
//                   <span className="flex items-center gap-1 text-gray-600">
//                     <Icons.User /> {house.guests || 0}
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
//                       title="View Property"
//                     >
//                       <Icons.View />
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => openEditModal(house)}
//                       className="p-2 text-green-600 hover:bg-green-50 rounded-xl transition-all"
//                       title="Edit Property"
//                     >
//                       <Icons.Edit />
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => openStatusModal(house)}
//                       className="p-2 text-purple-600 hover:bg-purple-50 rounded-xl transition-all"
//                       title="Change Status"
//                     >
//                       <Icons.Status />
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => openDeleteModal(house)}
//                       className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all"
//                       title="Delete Property"
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

//       {/* Status Update Modal */}
//       <AnimatePresence>
//         {isStatusModalOpen && selectedHouse && (
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
//                 <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl">
//                   <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//                     <Icons.Status />
//                     Change Status
//                   </h2>
//                   <motion.button
//                     whileHover={{ rotate: 90 }}
//                     onClick={() => {
//                       setIsStatusModalOpen(false);
//                       setSelectedHouse(null);
//                     }}
//                     className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
//                   >
//                     <Icons.Close />
//                   </motion.button>
//                 </div>
//                 <div className="p-6 space-y-4">
//                   <div>
//                     <p className="text-sm text-gray-500">Property</p>
//                     <p className="text-lg font-semibold text-gray-900">
//                       {selectedHouse.name || "Unnamed Property"}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Current Status</p>
//                     <span
//                       className={`px-3 py-1.5 text-sm font-medium rounded-full ${getStatusColor(selectedHouse.status)}`}
//                     >
//                       {getStatusLabel(selectedHouse.status)}
//                     </span>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                       New Status
//                     </label>
//                     <select
//                       value={newStatus}
//                       onChange={(e) => setNewStatus(e.target.value as House["status"])}
//                       className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//                     >
//                       {getStatusOptions(selectedHouse.status).map((status) => (
//                         <option key={status} value={status}>
//                           {getStatusLabel(status)}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="flex gap-3 pt-4 border-t border-gray-200">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handleStatusUpdate}
//                       disabled={submitting}
//                       className={`flex-1 px-6 py-3 rounded-xl text-white font-medium transition-all flex items-center justify-center gap-2 ${
//                         submitting
//                           ? "bg-gray-400 cursor-not-allowed"
//                           : "bg-gradient-to-r from-[#FF385C] to-[#E31C5F] hover:shadow-lg"
//                       }`}
//                     >
//                       {submitting ? (
//                         <>
//                           <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                           Updating...
//                         </>
//                       ) : (
//                         <>
//                           <Icons.Status /> Update Status
//                         </>
//                       )}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => {
//                         setIsStatusModalOpen(false);
//                         setSelectedHouse(null);
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
//                           alt={selectedHouse.name || "Property"}
//                           className={`rounded-xl object-cover h-48 ${index === 0 ? "col-span-2" : ""}`}
//                         />
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="bg-gray-100 rounded-xl h-48 flex items-center justify-center">
//                       <p className="text-gray-500">No images available</p>
//                     </div>
//                   )}
//                   <div className="flex items-center justify-between">
//                     <h3 className="text-2xl font-bold text-gray-900">
//                       {selectedHouse.name || "Unnamed Property"}
//                     </h3>
//                     <span
//                       className={`px-3 py-1.5 text-sm font-medium rounded-full ${getStatusColor(selectedHouse.status)}`}
//                     >
//                       {getStatusLabel(selectedHouse.status)}
//                     </span>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-sm font-medium text-gray-500">
//                         {t.pricePerMonth}
//                       </p>
//                       <p className="text-lg font-bold text-[#FF385C]">
//                         {formatCurrency(selectedHouse.pricePerMonth)}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-500">
//                         {t.university}
//                       </p>
//                       <p className="text-sm text-gray-700">
//                         {selectedHouse.university || "N/A"}
//                       </p>
//                     </div>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">
//                       {t.houseType}
//                     </p>
//                     <p className="text-sm text-gray-700">
//                       {selectedHouse.houseType || "N/A"}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">
//                       {t.description}
//                     </p>
//                     <p className="text-sm text-gray-700 mt-1">
//                       {selectedHouse.description || "No description available"}
//                     </p>
//                   </div>
//                   <div className="grid grid-cols-3 gap-4">
//                     <div>
//                       <p className="text-sm font-medium text-gray-500">
//                         {t.bedrooms}
//                       </p>
//                       <p className="text-lg font-semibold">
//                         {selectedHouse.bedrooms || 0}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-500">
//                         {t.bathrooms}
//                       </p>
//                       <p className="text-lg font-semibold">
//                         {selectedHouse.bathrooms || 0}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-500">
//                         {t.maxGuests}
//                       </p>
//                       <p className="text-lg font-semibold">
//                         {selectedHouse.guests || 0}
//                       </p>
//                     </div>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">
//                       {t.location}
//                     </p>
//                     <p className="text-sm text-gray-700">
//                       {getFullLocationDisplay(selectedHouse)}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">
//                       {t.amenities}
//                     </p>
//                     <div className="flex flex-wrap gap-1 mt-1">
//                       {selectedHouse.amenities && selectedHouse.amenities.length > 0 ? (
//                         selectedHouse.amenities.map((amenity) => (
//                           <span
//                             key={amenity}
//                             className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
//                           >
//                             {amenity}
//                           </span>
//                         ))
//                       ) : (
//                         <span className="text-sm text-gray-400">No amenities</span>
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
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
//                         openStatusModal(selectedHouse);
//                       }}
//                       className="px-4 py-2.5 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors flex items-center gap-2"
//                     >
//                       <Icons.Status /> Change Status
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
//                     (e) => handleInputChange("name", (e.target as HTMLInputElement).value),
//                   )}
//                   {renderInput(
//                     t.houseType,
//                     "houseType",
//                     "text",
//                     t.enterHouseType,
//                     true,
//                     propertyFormData.houseType,
//                     (e) => handleInputChange("houseType", (e.target as HTMLInputElement).value),
//                   )}
//                   {renderInput(
//                     t.description,
//                     "description",
//                     "textarea",
//                     t.enterDescription,
//                     false,
//                     propertyFormData.description,
//                     (e) => handleInputChange("description", (e.target as HTMLTextAreaElement).value),
//                   )}
//                   {renderInput(
//                     t.university,
//                     "university",
//                     "text",
//                     "Enter university name",
//                     false,
//                     propertyFormData.university,
//                     (e) => handleInputChange("university", (e.target as HTMLInputElement).value),
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
//                           onChange={(e) => handleLocationChange("province", e.target.value)}
//                           onBlur={() => handleFieldBlur("province")}
//                           className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white transition-all ${
//                             formErrors.province && touchedFields.province && propertyFormData.location.province
//                               ? "border-red-500 bg-red-50"
//                               : touchedFields.province && !formErrors.province && propertyFormData.location.province
//                               ? "border-green-500 bg-green-50"
//                               : "border-gray-300"
//                           }`}
//                         >
//                           <option value="">{t.provincePlaceholder}</option>
//                           <option value="Kigali">Kigali</option>
//                           <option value="Northern">Northern</option>
//                           <option value="Southern">Southern</option>
//                           <option value="Eastern">Eastern</option>
//                           <option value="Western">Western</option>
//                         </select>
//                         {formErrors.province && touchedFields.province && propertyFormData.location.province && (
//                           <p className="mt-1 text-sm text-red-500">{formErrors.province}</p>
//                         )}
//                         {touchedFields.province && !formErrors.province && propertyFormData.location.province && (
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
//                           onChange={(e) => handleLocationChange("district", e.target.value)}
//                           onBlur={() => handleFieldBlur("district")}
//                           placeholder={t.districtPlaceholder}
//                           className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm transition-all ${
//                             formErrors.district && touchedFields.district && propertyFormData.location.district
//                               ? "border-red-500 bg-red-50"
//                               : touchedFields.district && !formErrors.district && propertyFormData.location.district
//                               ? "border-green-500 bg-green-50"
//                               : "border-gray-300"
//                           }`}
//                         />
//                         {formErrors.district && touchedFields.district && propertyFormData.location.district && (
//                           <p className="mt-1 text-sm text-red-500">{formErrors.district}</p>
//                         )}
//                         {touchedFields.district && !formErrors.district && propertyFormData.location.district && (
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
//                           onChange={(e) => handleLocationChange("sector", e.target.value)}
//                           onBlur={() => handleFieldBlur("sector")}
//                           placeholder={t.sectorPlaceholder}
//                           className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm transition-all ${
//                             formErrors.sector && touchedFields.sector && propertyFormData.location.sector
//                               ? "border-red-500 bg-red-50"
//                               : touchedFields.sector && !formErrors.sector && propertyFormData.location.sector
//                               ? "border-green-500 bg-green-50"
//                               : "border-gray-300"
//                           }`}
//                         />
//                         {formErrors.sector && touchedFields.sector && propertyFormData.location.sector && (
//                           <p className="mt-1 text-sm text-red-500">{formErrors.sector}</p>
//                         )}
//                         {touchedFields.sector && !formErrors.sector && propertyFormData.location.sector && (
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
//                           onChange={(e) => handleLocationChange("cell", e.target.value)}
//                           onBlur={() => handleFieldBlur("cell")}
//                           placeholder={t.cellPlaceholder}
//                           className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm transition-all ${
//                             formErrors.cell && touchedFields.cell && propertyFormData.location.cell
//                               ? "border-red-500 bg-red-50"
//                               : touchedFields.cell && !formErrors.cell && propertyFormData.location.cell
//                               ? "border-green-500 bg-green-50"
//                               : "border-gray-300"
//                           }`}
//                         />
//                         {formErrors.cell && touchedFields.cell && propertyFormData.location.cell && (
//                           <p className="mt-1 text-sm text-red-500">{formErrors.cell}</p>
//                         )}
//                         {touchedFields.cell && !formErrors.cell && propertyFormData.location.cell && (
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
//                         onChange={(e) => handleLocationChange("village", e.target.value)}
//                         onBlur={() => handleFieldBlur("village")}
//                         placeholder={t.villagePlaceholder}
//                         className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm transition-all ${
//                           formErrors.village && touchedFields.village && propertyFormData.location.village
//                             ? "border-red-500 bg-red-50"
//                             : touchedFields.village && !formErrors.village && propertyFormData.location.village
//                             ? "border-green-500 bg-green-50"
//                             : "border-gray-300"
//                         }`}
//                       />
//                       {formErrors.village && touchedFields.village && propertyFormData.location.village && (
//                         <p className="mt-1 text-sm text-red-500">{formErrors.village}</p>
//                       )}
//                       {touchedFields.village && !formErrors.village && propertyFormData.location.village && (
//                         <p className="mt-1 text-sm text-green-500 flex items-center gap-1">
//                           <Icons.Check /> Valid
//                         </p>
//                       )}
//                     </div>
//                     {/* Optional Address field */}
//                     <div className="mt-3">
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         Address (optional)
//                       </label>
//                       <input
//                         type="text"
//                         value={propertyFormData.location.address}
//                         onChange={(e) => handleLocationChange("address", e.target.value)}
//                         placeholder="Enter detailed address"
//                         className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//                       />
//                     </div>
//                   </div>

//                   {/* Pricing and Details */}
//                   <div className="border-t border-gray-200 pt-4">
//                     <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0 3V9m0 6V15m0 6v-3" />
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
//                         (e) => handleInputChange("pricePerMonth", parseFloat((e.target as HTMLInputElement).value) || 0),
//                       )}
//                       {renderInput(
//                         t.bedrooms,
//                         "bedrooms",
//                         "number",
//                         t.enterBedrooms,
//                         false,
//                         propertyFormData.bedrooms,
//                         (e) => handleInputChange("bedrooms", parseInt((e.target as HTMLInputElement).value) || 0),
//                       )}
//                       {renderInput(
//                         t.bathrooms,
//                         "bathrooms",
//                         "number",
//                         t.enterBathrooms,
//                         false,
//                         propertyFormData.bathrooms,
//                         (e) => handleInputChange("bathrooms", parseInt((e.target as HTMLInputElement).value) || 0),
//                       )}
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
//                       {renderInput(
//                         t.maxGuests,
//                         "guests",
//                         "number",
//                         t.enterMaxGuests,
//                         true,
//                         propertyFormData.guests,
//                         (e) => handleInputChange("guests", parseInt((e.target as HTMLInputElement).value) || 1),
//                       )}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                           {t.status} <span className="text-red-500">*</span>
//                         </label>
//                         <select
//                           value={propertyFormData.status}
//                           onChange={(e) => handleInputChange("status", e.target.value)}
//                           className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//                         >
//                           <option value="available">{t.available}</option>
//                           <option value="pending">{t.pending}</option>
//                           <option value="booked">{t.booked}</option>
//                           <option value="unavailable">{t.unavailable}</option>
//                           <option value="maintenance">{t.maintenance}</option>
//                           <option value="inactive">{t.inactive}</option>
//                         </select>
//                       </div>
//                     </div>
//                     {/* Currency */}
//                     <div className="mt-3">
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         Currency
//                       </label>
//                       <select
//                         value={propertyFormData.currency}
//                         onChange={(e) => handleInputChange("currency", e.target.value)}
//                         className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//                       >
//                         <option value="RWF">RWF</option>
//                         <option value="USD">USD</option>
//                         <option value="EUR">EUR</option>
//                       </select>
//                     </div>
//                   </div>

//                   {/* Owner Information */}
//                   <div className="border-t border-gray-200 pt-4">
//                     <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
//                       <Icons.User /> Owner Information
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                       {renderInput(
//                         t.ownerName,
//                         "ownerName",
//                         "text",
//                         "Enter owner name",
//                         false,
//                         propertyFormData.ownerName,
//                         (e) => handleInputChange("ownerName", (e.target as HTMLInputElement).value),
//                       )}
//                       {renderInput(
//                         t.ownerEmail,
//                         "ownerEmail",
//                         "email",
//                         "Enter owner email",
//                         false,
//                         propertyFormData.ownerEmail,
//                         (e) => handleInputChange("ownerEmail", (e.target as HTMLInputElement).value),
//                       )}
//                     </div>
//                     <div className="mt-3">
//                       {renderInput(
//                         t.ownerContact,
//                         "ownerContact",
//                         "text",
//                         "Enter owner phone number",
//                         false,
//                         propertyFormData.ownerContact,
//                         (e) => handleInputChange("ownerContact", (e.target as HTMLInputElement).value),
//                       )}
//                     </div>
//                   </div>

//                   {/* Amenities */}
//                   <div className="border-t border-gray-200 pt-4">
//                     <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
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
//                             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                           </button>
//                         </span>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Image Upload */}
//                   <div className="border-t border-gray-200 pt-4">
//                     <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
//                       <Icons.Upload /> {t.uploadImages} <span className="text-red-500">*</span>
//                     </h3>
//                     <p className="text-xs text-gray-500 mb-2">Upload 2-10 images</p>
//                     <div
//                       className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
//                         formErrors.images && touchedFields.images
//                           ? "border-red-500 bg-red-50"
//                           : imageFiles.length >= 2 && imageFiles.length <= 10
//                           ? "border-green-500 bg-green-50"
//                           : "border-gray-300 hover:border-[#FF385C] hover:bg-gray-50"
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
//                       <p className="mt-2 text-sm text-gray-600">{t.dropImages}</p>
//                       <p className="text-xs text-gray-400 mt-1">
//                         {imageFiles.length + (selectedHouse?.images?.length || 0)} / 10 images
//                       </p>
//                     </div>
//                     {(imagePreviews.length > 0 || (selectedHouse && selectedHouse.images && selectedHouse.images.length > 0)) && (
//                       <div className="mt-3 grid grid-cols-4 gap-2">
//                         {imagePreviews.map((preview, index) => (
//                           <div key={index} className="relative group">
//                             <img src={preview} alt={`Preview ${index}`} className="w-full h-20 object-cover rounded-xl" />
//                             <button
//                               onClick={() => removeImage(index)}
//                               className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
//                             >
//                               <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                               </svg>
//                             </button>
//                           </div>
//                         ))}
//                         {selectedHouse && selectedHouse.images && selectedHouse.images.map((img, index) => (
//                           <div key={`existing-${index}`} className="relative group">
//                             <img src={img.url} alt={`Existing ${index}`} className="w-full h-20 object-cover rounded-xl" />
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                     {formErrors.images && touchedFields.images && (
//                       <p className="mt-1 text-sm text-red-500">{formErrors.images}</p>
//                     )}
//                     {imageFiles.length + (selectedHouse?.images?.length || 0) < 2 && (
//                       <p className="mt-1 text-sm text-yellow-500">⚠️ Minimum 2 images required</p>
//                     )}
//                     {imageFiles.length + (selectedHouse?.images?.length || 0) > 10 && (
//                       <p className="mt-1 text-sm text-red-500">⚠️ Maximum 10 images allowed</p>
//                     )}
//                   </div>

//                   {/* Form Validation Status */}
//                   <div className="flex items-center gap-2 text-sm">
//                     {isFormValid() ? (
//                       <span className="text-green-600 flex items-center gap-1">
//                         <Icons.Check /> All fields are valid
//                       </span>
//                     ) : (
//                       <span className="text-gray-500">
//                         Please fill in all required fields
//                       </span>
//                     )}
//                   </div>

//                   <div className="flex gap-3 pt-4 border-t border-gray-200">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={isEditModalOpen ? handleUpdateProperty : handleCreateProperty}
//                       disabled={submitting || !isFormValid()}
//                       className={`flex-1 px-6 py-3 rounded-xl text-white font-medium transition-all flex items-center justify-center gap-2 ${
//                         submitting || !isFormValid()
//                           ? "bg-gray-400 cursor-not-allowed"
//                           : "bg-gradient-to-r from-[#FF385C] to-[#E31C5F] hover:shadow-lg"
//                       }`}
//                     >
//                       {submitting ? (
//                         <>
//                           <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
//       <ConfirmModal
//         isOpen={isDeleteModalOpen}
//         onClose={() => {
//           setIsDeleteModalOpen(false);
//           setSelectedHouse(null);
//         }}
//         onConfirm={handleDeleteProperty}
//         title={t.deleteProperty}
//         message={t.deleteConfirmation}
//         confirmText={t.delete}
//         cancelText={t.cancel}
//         isSubmitting={submitting}
//         type="danger"
//         icon={
//           <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//           </svg>
//         }
//       />
//     </div>
//   );
// };









/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";

// API Base URL
const API_BASE_URL = "https://inyumbaproject.eu1.hubfly.app";

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
                    <svg className="w-10 h-10 text-green-600 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">{title}</h3>
                <p className="text-gray-600 text-center mb-2">{message}</p>
                {details && <p className="text-sm text-gray-400 text-center mb-6">{details}</p>}
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
                    <svg className="w-10 h-10 text-red-600 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">{title}</h3>
                <p className="text-gray-600 text-center mb-2">{message}</p>
                {details && <p className="text-sm text-gray-400 text-center mb-6">{details}</p>}
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
                          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        ) : type === "warning" ? (
                          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        ) : type === "success" ? (
                          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
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
// TYPES - Matches House Model Exactly
// ============================================================

interface Image {
  public_id: string;
  url: string;
  secure_url: string;
  original_filename?: string;
}

interface Location {
  province: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
  address?: string;
  latitude?: number | null;
  longitude?: number | null;
}

interface Availability {
  startDate: Date;
  endDate: Date;
}

// Complete House interface matching the Mongoose model
interface House {
  _id?: string;
  houseId: string;
  name: string;
  houseType: string;
  description: string;
  images: Image[];
  location: Location;
  university: string;
  pricePerMonth: number;
  currency: string;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  amenities: string[];
  status: "available" | "pending" | "booked" | "unavailable" | "maintenance" | "inactive";
  isActive: boolean;
  isFeatured?: boolean;
  availability?: Availability;
  createdBy?: string;
  createdByEmail?: string;
  ownerName: string;
  ownerEmail: string;
  ownerContact: string;
  createdAt?: string;
  updatedAt?: string;
}

// ============================================================
// TRANSLATIONS
// ============================================================

const translations = {
  en: {
    hostManagement: "House Management",
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
    bookedProperties: "Booked",
    unavailableProperties: "Unavailable",
    maintenanceProperties: "Maintenance",
    inactiveProperties: "Inactive",
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
    houseType: "House Type",
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
    booked: "Booked",
    unavailable: "Unavailable",
    maintenance: "Maintenance",
    inactive: "Inactive",
    pending: "Pending",
    all: "All",
    selectStatus: "Select Status",
    enterName: "Enter property name",
    enterHouseType: "Enter house type (apartment, villa, etc.)",
    enterDescription: "Enter property description",
    enterPrice: "Enter price per month",
    enterBedrooms: "Enter number of bedrooms",
    enterBathrooms: "Enter number of bathrooms",
    enterMaxGuests: "Enter maximum guests",
    addAmenity: "Add Amenity",
    remove: "Remove",
    provincePlaceholder: "Select province",
    districtPlaceholder: "Enter district",
    sectorPlaceholder: "Enter sector",
    cellPlaceholder: "Enter cell",
    villagePlaceholder: "Enter village",
    ownerName: "Owner Name",
    ownerEmail: "Owner Email",
    ownerContact: "Owner Contact",
    uploadImages: "Upload Images (2-10 images)",
    dropImages: "Drop images here or click to upload (2-10 images)",
    imagePreview: "Image Preview",
    noImage: "No image",
    success: "Success!",
    error: "Error",
    statuses: {
      available: "Available",
      pending: "Pending",
      booked: "Booked",
      unavailable: "Unavailable",
      maintenance: "Maintenance",
      inactive: "Inactive",
    },
    validation: {
      nameRequired: "Property name is required",
      nameMinLength: "Name must be at least 2 characters",
      nameMaxLength: "Name cannot exceed 200 characters",
      houseTypeRequired: "House type is required",
      descriptionMinLength: "Description must be at least 20 characters",
      descriptionMaxLength: "Description cannot exceed 5000 characters",
      provinceRequired: "Province is required",
      districtRequired: "District is required",
      sectorRequired: "Sector is required",
      cellRequired: "Cell is required",
      villageRequired: "Village is required",
      priceMin: "Price must be greater than 0",
      bedroomsMin: "Bedrooms must be at least 0",
      bathroomsMin: "Bathrooms must be at least 0",
      maxGuestsMin: "Max guests must be at least 1",
      ownerEmailInvalid: "Please enter a valid email",
      imagesMin: "Please upload at least 2 images",
      imagesMax: "Maximum 10 images allowed",
    },
  },
  fr: {
    hostManagement: "Gestion des Maisons",
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
    bookedProperties: "Réservé",
    unavailableProperties: "Indisponible",
    maintenanceProperties: "Maintenance",
    inactiveProperties: "Inactif",
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
    houseType: "Type de Maison",
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
    booked: "Réservé",
    unavailable: "Indisponible",
    maintenance: "Maintenance",
    inactive: "Inactif",
    pending: "En Attente",
    all: "Tous",
    selectStatus: "Sélectionner le Statut",
    enterName: "Entrez le nom de la propriété",
    enterHouseType: "Entrez le type de maison (appartement, villa, etc.)",
    enterDescription: "Entrez la description de la propriété",
    enterPrice: "Entrez le prix par mois",
    enterBedrooms: "Entrez le nombre de chambres",
    enterBathrooms: "Entrez le nombre de salles de bain",
    enterMaxGuests: "Entrez le nombre maximum d'invités",
    addAmenity: "Ajouter un Équipement",
    remove: "Supprimer",
    provincePlaceholder: "Sélectionner la province",
    districtPlaceholder: "Entrez le district",
    sectorPlaceholder: "Entrez le secteur",
    cellPlaceholder: "Entrez la cellule",
    villagePlaceholder: "Entrez le village",
    ownerName: "Nom du Propriétaire",
    ownerEmail: "Email du Propriétaire",
    ownerContact: "Contact du Propriétaire",
    uploadImages: "Télécharger des Images (2-10 images)",
    dropImages: "Déposez les images ici ou cliquez pour télécharger (2-10 images)",
    imagePreview: "Aperçu de l'Image",
    noImage: "Pas d'image",
    success: "Succès !",
    error: "Erreur",
    statuses: {
      available: "Disponible",
      pending: "En Attente",
      booked: "Réservé",
      unavailable: "Indisponible",
      maintenance: "Maintenance",
      inactive: "Inactif",
    },
    validation: {
      nameRequired: "Le nom de la propriété est requis",
      nameMinLength: "Le nom doit contenir au moins 2 caractères",
      nameMaxLength: "Le nom ne peut pas dépasser 200 caractères",
      houseTypeRequired: "Le type de maison est requis",
      descriptionMinLength: "La description doit contenir au moins 20 caractères",
      descriptionMaxLength: "La description ne peut pas dépasser 5000 caractères",
      provinceRequired: "La province est requise",
      districtRequired: "Le district est requis",
      sectorRequired: "Le secteur est requis",
      cellRequired: "La cellule est requise",
      villageRequired: "Le village est requis",
      priceMin: "Le prix doit être supérieur à 0",
      bedroomsMin: "Les chambres doivent être au moins 0",
      bathroomsMin: "Les salles de bain doivent être au moins 0",
      maxGuestsMin: "Le nombre max d'invités doit être au moins 1",
      ownerEmailInvalid: "Veuillez entrer un email valide",
      imagesMin: "Veuillez télécharger au moins 2 images",
      imagesMax: "Maximum 10 images autorisées",
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
    bookedProperties: "Byaritswe",
    unavailableProperties: "Ntaho",
    maintenanceProperties: "Muri Maintenance",
    inactiveProperties: "Ntigikora",
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
    houseType: "Ubwoko bw'Inzu",
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
    booked: "Byaritswe",
    unavailable: "Ntaho",
    maintenance: "Muri Maintenance",
    inactive: "Ntigikora",
    pending: "Bitegereje",
    all: "Byose",
    selectStatus: "Hitamo Ihagaze",
    enterName: "Andika izina ry'inzu",
    enterHouseType: "Andika ubwoko bw'inzu (apartment, villa, nk.)",
    enterDescription: "Andika ibisobanuro by'inzu",
    enterPrice: "Andika igiciro ku kwezi",
    enterBedrooms: "Andika umubare w'ibyumba",
    enterBathrooms: "Andika umubare w'amazu y'isuku",
    enterMaxGuests: "Andika umubare w'abashyitsi",
    addAmenity: "Ongeraho Ibikoresho",
    remove: "Kuraho",
    provincePlaceholder: "Hitamo Intara",
    districtPlaceholder: "Andika Akarere",
    sectorPlaceholder: "Andika Umurenge",
    cellPlaceholder: "Andika Akagari",
    villagePlaceholder: "Andika Umudugudu",
    ownerName: "Izina ry'Umutambyi",
    ownerEmail: "Imeri y'Umutambyi",
    ownerContact: "Telefone y'Umutambyi",
    uploadImages: "Ongeraho Amashusho (2-10 amashusho)",
    dropImages: "Shyira amashusho hano cyangwa kanda guterura (2-10 amashusho)",
    imagePreview: "Reba Ishusho",
    noImage: "Nta shusho",
    success: "Byakunze!",
    error: "Ikosa",
    statuses: {
      available: "Irahari",
      pending: "Bitegereje",
      booked: "Byaritswe",
      unavailable: "Ntaho",
      maintenance: "Muri Maintenance",
      inactive: "Ntigikora",
    },
    validation: {
      nameRequired: "Izina ry'inzu rirasabwa",
      nameMinLength: "Izina rigomba kugira byibura inyuguti 2",
      nameMaxLength: "Izina ntirigomba kurenga inyuguti 200",
      houseTypeRequired: "Ubwoko bw'inzu burakenewe",
      descriptionMinLength: "Ibisobanuro bigomba kugira byibura inyuguti 20",
      descriptionMaxLength: "Ibisobanuro ntibigomba kurenga inyuguti 5000",
      provinceRequired: "Intara irakenewe",
      districtRequired: "Akarere gakenewe",
      sectorRequired: "Umurenge urakenewe",
      cellRequired: "Akagari gakenewe",
      villageRequired: "Umudugudu urakenewe",
      priceMin: "Igiciro kigomba kuba kirenze 0",
      bedroomsMin: "Ibyumba bigomba kuba byibura 0",
      bathroomsMin: "Amazu y'isuku agomba kuba byibura 0",
      maxGuestsMin: "Abashyitsi benshi bagomba kuba byibura 1",
      ownerEmailInvalid: "Andika imeri ikwiye",
      imagesMin: "Ongeraho byibura amashusho 2",
      imagesMax: "Amashusho ntarengwa ni 10",
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

const getUserEmail = (): string => {
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      return user.email || "";
    }
    return "";
  } catch {
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
  } catch {
    return "";
  }
};

const getToken = (): string => {
  try {
    return localStorage.getItem("token") || "";
  } catch {
    return "";
  }
};

const getLocationDisplay = (house: House): string => {
  if (!house.location) return "Location not specified";
  const { village, district } = house.location;
  if (!village && !district) return "Location not specified";
  return `${village || "N/A"}, ${district || "N/A"}`;
};

const getFullLocationDisplay = (house: House): string => {
  if (!house.location) return "Location not specified";
  const { village, sector, district, province } = house.location;
  if (!village && !sector && !district && !province) {
    return "Location not specified";
  }
  return `${village || "N/A"}, ${sector || "N/A"}, ${district || "N/A"}, ${province || "N/A"}`;
};

// ============================================================
// API SERVICE
// ============================================================

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
  (error) => Promise.reject(error),
);

const houseApi = {
  getHouses: async (): Promise<House[]> => {
    const response = await api.get("/houses");
    return response.data.data || [];
  },

  createHouse: async (formData: FormData): Promise<House> => {
    const response = await api.post("/houses", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data || response.data;
  },

  updateHouse: async (id: string, formData: FormData): Promise<House> => {
    const response = await api.put(`/houses/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data || response.data;
  },

  deleteHouse: async (id: string): Promise<void> => {
    await api.delete(`/houses/${id}`);
  },

  updateHouseStatus: async (id: string, status: string): Promise<House> => {
    const response = await api.put(`/houses/${id}/status`, { status });
    return response.data.data || response.data;
  },
};

// Icons
const Icons = {
  Home: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  Plus: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
    </svg>
  ),
  Edit: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  ),
  Delete: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  View: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  Search: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Filter: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  ),
  Close: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  ),
  Upload: () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  ),
  Bed: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16M4 12h16M4 20h16" />
    </svg>
  ),
  Bath: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h14M5 5v14M5 5h14M5 19h14M5 19v-4M5 19H3M19 19v-4" />
    </svg>
  ),
  User: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Location: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Status: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

// ============================================================
// MAIN COMPONENT - ManagerHouseManagement (FIXED)
// ============================================================

export const ManagerHouseManagement: React.FC = () => {
  const [lang, setLang] = useState<"en" | "fr" | "rw">(getLanguageFromCookies());
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
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
  const [newStatus, setNewStatus] = useState<House["status"]>("available");

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

  // Form validation states
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  // Image upload states
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Property form state - Matches Mongoose Model exactly
  const [propertyFormData, setPropertyFormData] = useState({
    name: "",
    houseType: "",
    description: "",
    university: "",
    location: {
      province: "",
      district: "",
      sector: "",
      cell: "",
      village: "",
      address: "",
      latitude: null as number | null,
      longitude: null as number | null,
    },
    pricePerMonth: 0,
    currency: "RWF",
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    amenities: [] as string[],
    status: "pending" as House["status"],
    ownerName: userName || "",
    ownerEmail: userEmail || "",
    ownerContact: "",
    isActive: true,
    isFeatured: false,
  });

  const [amenityInput, setAmenityInput] = useState("");

  // Statistics
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    pending: 0,
    booked: 0,
    unavailable: 0,
    maintenance: 0,
    inactive: 0,
  });

  const t = translations[lang];

  const showSuccessModal = (title: string, message: string, details?: string) => {
    setSuccessModal({ isOpen: true, title, message, details });
  };

  const showErrorModal = (title: string, message: string, details?: string) => {
    setErrorModal({ isOpen: true, title, message, details });
  };

  // Listen for language changes
  useEffect(() => {
    const interval = setInterval(() => {
      const newLang = getLanguageFromCookies();
      if (newLang !== lang) setLang(newLang);
    }, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  const loadHouses = useCallback(async () => {
    try {
      setLoading(true);
      const data = await houseApi.getHouses();
      const housesWithImages = data.map((house) => ({
        ...house,
        images: house.images || [],
        location: {
          province: house.location?.province || "",
          district: house.location?.district || "",
          sector: house.location?.sector || "",
          cell: house.location?.cell || "",
          village: house.location?.village || "",
          address: house.location?.address || "",
          latitude: house.location?.latitude ?? null,
          longitude: house.location?.longitude ?? null,
        },
        guests: house.guests || 1,
        currency: house.currency || "RWF",
        isActive: house.isActive !== undefined ? house.isActive : true,
        isFeatured: house.isFeatured || false,
      }));
      setHouses(housesWithImages);
      setFilteredHouses(housesWithImages);
    } catch (error) {
      showErrorModal(
        t.error || "Error",
        "Failed to load houses",
        error instanceof Error ? error.message : undefined,
      );
    } finally {
      setLoading(false);
    }
  }, [t]);

  // Live validation
  const validateForm = useCallback(() => {
    const errors: Record<string, string> = {};
    const v = t.validation;

    if (!propertyFormData.name?.trim()) {
      errors.name = v.nameRequired;
    } else if (propertyFormData.name.length < 2) {
      errors.name = v.nameMinLength;
    } else if (propertyFormData.name.length > 200) {
      errors.name = v.nameMaxLength;
    }

    if (!propertyFormData.houseType?.trim()) {
      errors.houseType = v.houseTypeRequired;
    }

    if (propertyFormData.description && propertyFormData.description.length > 5000) {
      errors.description = v.descriptionMaxLength;
    }

    if (!propertyFormData.location.province) {
      errors.province = v.provinceRequired;
    }
    if (!propertyFormData.location.district?.trim()) {
      errors.district = v.districtRequired;
    }
    if (!propertyFormData.location.sector?.trim()) {
      errors.sector = v.sectorRequired;
    }
    if (!propertyFormData.location.cell?.trim()) {
      errors.cell = v.cellRequired;
    }
    if (!propertyFormData.location.village?.trim()) {
      errors.village = v.villageRequired;
    }

    if (propertyFormData.pricePerMonth <= 0) {
      errors.pricePerMonth = v.priceMin;
    } else if (!Number.isInteger(propertyFormData.pricePerMonth)) {
      errors.pricePerMonth = "Price must be a whole number";
    }

    if (propertyFormData.bedrooms < 0) {
      errors.bedrooms = v.bedroomsMin;
    }
    if (propertyFormData.bathrooms < 0) {
      errors.bathrooms = v.bathroomsMin;
    }
    if (propertyFormData.guests < 1) {
      errors.guests = v.maxGuestsMin;
    }

    if (propertyFormData.ownerEmail && !/\S+@\S+\.\S+/.test(propertyFormData.ownerEmail)) {
      errors.ownerEmail = v.ownerEmailInvalid;
    }

    const imageCount = imageFiles.length + (selectedHouse?.images?.length || 0);
    if (imageCount < 2) errors.images = v.imagesMin;
    else if (imageCount > 10) errors.images = v.imagesMax;

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [propertyFormData, imageFiles, selectedHouse, t.validation]);

  // Check if form is valid
  const isFormValid = useCallback(() => {
    const hasNoErrors = Object.keys(formErrors).length === 0;
    const imageCount = imageFiles.length + (selectedHouse?.images?.length || 0);
    const hasValidImages = imageCount >= 2 && imageCount <= 10;

    const hasName = propertyFormData.name?.trim().length > 0;
    const hasHouseType = propertyFormData.houseType?.trim().length > 0;
    const hasProvince = propertyFormData.location.province?.length > 0;
    const hasDistrict = propertyFormData.location.district?.trim().length > 0;
    const hasSector = propertyFormData.location.sector?.trim().length > 0;
    const hasCell = propertyFormData.location.cell?.trim().length > 0;
    const hasVillage = propertyFormData.location.village?.trim().length > 0;
    const hasPrice = propertyFormData.pricePerMonth > 0;
    const hasGuests = propertyFormData.guests >= 1;

    const hasRequiredFields = hasName && hasHouseType && hasProvince &&
      hasDistrict && hasSector && hasCell &&
      hasVillage && hasPrice && hasGuests;

    return hasNoErrors && hasValidImages && hasRequiredFields;
  }, [formErrors, imageFiles, selectedHouse, propertyFormData]);

  useEffect(() => {
    loadHouses();
  }, [loadHouses]);

  // Filter houses
  useEffect(() => {
    let filtered = [...houses];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (h) =>
          h.name?.toLowerCase().includes(term) ||
          h.houseType?.toLowerCase().includes(term) ||
          h.university?.toLowerCase().includes(term) ||
          h.location?.district?.toLowerCase().includes(term) ||
          h.location?.village?.toLowerCase().includes(term),
      );
    }
    if (filterStatus !== "all") {
      filtered = filtered.filter((h) => h.status === filterStatus);
    }
    setFilteredHouses(filtered);
  }, [houses, searchTerm, filterStatus]);

  // Update statistics
  useEffect(() => {
    setStats({
      total: houses.length,
      available: houses.filter((h) => h.status === "available").length,
      pending: houses.filter((h) => h.status === "pending").length,
      booked: houses.filter((h) => h.status === "booked").length,
      unavailable: houses.filter((h) => h.status === "unavailable").length,
      maintenance: houses.filter((h) => h.status === "maintenance").length,
      inactive: houses.filter((h) => h.status === "inactive").length,
    });
  }, [houses]);

  // Get status badge
  const getStatusColor = (status: string): string => {
    const colors = {
      available: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      booked: "bg-blue-100 text-blue-800 border-blue-200",
      unavailable: "bg-gray-100 text-gray-800 border-gray-200",
      maintenance: "bg-red-100 text-red-800 border-red-200",
      inactive: "bg-gray-300 text-gray-600 border-gray-300",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getStatusLabel = (status: string): string => {
    const labels = {
      available: t.available,
      pending: t.pending,
      booked: t.booked,
      unavailable: t.unavailable,
      maintenance: t.maintenance,
      inactive: t.inactive,
    };
    return labels[status as keyof typeof labels] || status;
  };

  const formatCurrency = (amount: number): string => {
    return `RWF ${amount?.toLocaleString() || 0}`;
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
      amenities: prev.amenities.filter((amenity) => amenity !== amenityToRemove),
    }));
  };

  // Handle field blur
  const handleFieldBlur = (field: string) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
    validateForm();
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

    const fieldName = field.includes(".") ? field.split(".")[1] : field;
    if (value && value.toString().trim().length > 0) {
      setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
    }
    validateForm();
  };

  const handleLocationChange = (field: string, value: string) => {
    setPropertyFormData((prev) => ({
      ...prev,
      location: { ...prev.location, [field]: value },
    }));
    if (value && value.trim().length > 0) {
      setTouchedFields((prev) => ({ ...prev, [field]: true }));
    }
    validateForm();
  };

  // Image handling
  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    const currentCount = imageFiles.length + (selectedHouse?.images?.length || 0);
    const maxAllowed = 10;
    const remaining = maxAllowed - currentCount;

    if (remaining <= 0) {
      showErrorModal(
        t.error || "Error",
        t.validation.imagesMax || "Maximum 10 images allowed",
      );
      return;
    }

    const filesToAdd = fileArray.slice(0, remaining);
    setImageFiles((prev) => [...prev, ...filesToAdd]);

    filesToAdd.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews((prev) => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });

    setTouchedFields((prev) => ({ ...prev, images: true }));
    validateForm();
  };

  const removeImage = (index: number) => {
    const newImageFiles = imageFiles.filter((_, i) => i !== index);
    const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
    const totalImages = newImageFiles.length + (selectedHouse?.images?.length || 0);

    if (totalImages < 2) {
      showErrorModal(
        t.error || "Error",
        t.validation.imagesMin || "Minimum 2 images required",
      );
      return;
    }

    setImageFiles(newImageFiles);
    setImagePreviews(newImagePreviews);
    validateForm();
  };

  // ✅ FIXED: Create FormData for API - ONLY sends 'guests' (matches Mongoose model)
  const createFormData = (): FormData => {
    const formData = new FormData();

    // Basic Information
    formData.append("name", propertyFormData.name || "");
    formData.append("houseType", propertyFormData.houseType || "apartment");
    formData.append("description", propertyFormData.description || "");
    formData.append("university", propertyFormData.university || "");

    // Price and Currency
    formData.append("pricePerMonth", String(propertyFormData.pricePerMonth || 0));
    formData.append("currency", propertyFormData.currency || "RWF");

    // ✅ FIXED: ONLY send 'guests' - matches Mongoose model
    const guestValue = propertyFormData.guests || 1;
    formData.append("guests", String(guestValue));
    // ❌ REMOVED: formData.append("maxGuests", String(guestValue));

    formData.append("bedrooms", String(propertyFormData.bedrooms || 0));
    formData.append("bathrooms", String(propertyFormData.bathrooms || 0));

    // Status
    formData.append("status", propertyFormData.status || "pending");

    // Location - send as JSON string
    const location = {
      province: propertyFormData.location.province || "",
      district: propertyFormData.location.district || "",
      sector: propertyFormData.location.sector || "",
      cell: propertyFormData.location.cell || "",
      village: propertyFormData.location.village || "",
      address: propertyFormData.location.address || "",
      latitude: propertyFormData.location.latitude,
      longitude: propertyFormData.location.longitude,
    };
    formData.append("location", JSON.stringify(location));

    // Owner data
    formData.append("ownerName", propertyFormData.ownerName || "");
    formData.append("ownerEmail", propertyFormData.ownerEmail || "");
    formData.append("ownerContact", propertyFormData.ownerContact || "");

    // Amenities - send as JSON string
    if (propertyFormData.amenities.length > 0) {
      formData.append("amenities", JSON.stringify(propertyFormData.amenities));
    }

    // Flags
    formData.append("isActive", String(propertyFormData.isActive !== false));
    formData.append("isFeatured", String(propertyFormData.isFeatured || false));

    // Created by email
    if (userEmail) {
      formData.append("createdByEmail", userEmail);
    }

    // Images
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    return formData;
  };

  // CRUD Operations
  const handleCreateProperty = async () => {
    const isValid = validateForm();

    const hasName = propertyFormData.name?.trim().length > 0;
    const hasHouseType = propertyFormData.houseType?.trim().length > 0;
    const hasProvince = propertyFormData.location.province?.length > 0;
    const hasDistrict = propertyFormData.location.district?.trim().length > 0;
    const hasSector = propertyFormData.location.sector?.trim().length > 0;
    const hasCell = propertyFormData.location.cell?.trim().length > 0;
    const hasVillage = propertyFormData.location.village?.trim().length > 0;
    const hasPrice = propertyFormData.pricePerMonth > 0;
    const hasGuests = propertyFormData.guests >= 1;
    const hasImages = imageFiles.length + (selectedHouse?.images?.length || 0) >= 2;

    if (!isValid || !hasName || !hasHouseType || !hasProvince || !hasDistrict ||
      !hasSector || !hasCell || !hasVillage || !hasPrice || !hasGuests || !hasImages) {
      showErrorModal(t.error || "Error", "Please fill in all required fields");
      const allFields = [
        "name", "houseType", "province", "district", "sector", "cell", "village",
        "pricePerMonth", "guests", "ownerName", "ownerEmail"
      ];
      const touched: Record<string, boolean> = {};
      allFields.forEach((field) => { touched[field] = true; });
      setTouchedFields(touched);
      return;
    }

    setSubmitting(true);
    try {
      const formData = createFormData();
      const newHouse = await houseApi.createHouse(formData);

      const houseWithImages = {
        ...newHouse,
        images: newHouse.images || [],
        location: {
          province: newHouse.location?.province || "",
          district: newHouse.location?.district || "",
          sector: newHouse.location?.sector || "",
          cell: newHouse.location?.cell || "",
          village: newHouse.location?.village || "",
          address: newHouse.location?.address || "",
          latitude: newHouse.location?.latitude ?? null,
          longitude: newHouse.location?.longitude ?? null,
        },
        guests: newHouse.guests || 1,
        currency: newHouse.currency || "RWF",
        isActive: newHouse.isActive !== undefined ? newHouse.isActive : true,
        isFeatured: newHouse.isFeatured || false,
      };

      setHouses((prev) => [houseWithImages, ...prev]);
      showSuccessModal(
        t.success || "Success!",
        t.propertyCreated || "Property created successfully!",
        `${newHouse.name} has been added to your listings`,
      );
      setIsCreateModalOpen(false);
      resetForm();
    } catch (error) {
      const axiosError = error as AxiosError;
      const responseData = axiosError.response?.data as any;
      if (responseData?.errors) {
        const errorMessages = responseData.errors.map((e: any) => `${e.msg} (${e.path})`).join(", ");
        showErrorModal(t.error || "Error", `Validation failed: ${errorMessages}`);
      } else {
        const errorMessage = responseData?.message || t.createFailed;
        showErrorModal(t.error || "Error", errorMessage);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateProperty = async () => {
    if (!selectedHouse) return;

    const isValid = validateForm();

    const hasName = propertyFormData.name?.trim().length > 0;
    const hasHouseType = propertyFormData.houseType?.trim().length > 0;
    const hasProvince = propertyFormData.location.province?.length > 0;
    const hasDistrict = propertyFormData.location.district?.trim().length > 0;
    const hasSector = propertyFormData.location.sector?.trim().length > 0;
    const hasCell = propertyFormData.location.cell?.trim().length > 0;
    const hasVillage = propertyFormData.location.village?.trim().length > 0;
    const hasPrice = propertyFormData.pricePerMonth > 0;
    const hasGuests = propertyFormData.guests >= 1;
    const hasImages = imageFiles.length + (selectedHouse?.images?.length || 0) >= 2;

    if (!isValid || !hasName || !hasHouseType || !hasProvince || !hasDistrict ||
      !hasSector || !hasCell || !hasVillage || !hasPrice || !hasGuests || !hasImages) {
      showErrorModal(t.error || "Error", "Please fill in all required fields");
      const allFields = [
        "name", "houseType", "province", "district", "sector", "cell", "village",
        "pricePerMonth", "guests", "ownerName", "ownerEmail"
      ];
      const touched: Record<string, boolean> = {};
      allFields.forEach((field) => { touched[field] = true; });
      setTouchedFields(touched);
      return;
    }

    setSubmitting(true);
    try {
      const formData = createFormData();
      const updatedHouse = await houseApi.updateHouse(selectedHouse._id!, formData);

      const houseWithImages = {
        ...updatedHouse,
        images: updatedHouse.images || [],
        location: {
          province: updatedHouse.location?.province || "",
          district: updatedHouse.location?.district || "",
          sector: updatedHouse.location?.sector || "",
          cell: updatedHouse.location?.cell || "",
          village: updatedHouse.location?.village || "",
          address: updatedHouse.location?.address || "",
          latitude: updatedHouse.location?.latitude ?? null,
          longitude: updatedHouse.location?.longitude ?? null,
        },
        guests: updatedHouse.guests || 1,
        currency: updatedHouse.currency || "RWF",
        isActive: updatedHouse.isActive !== undefined ? updatedHouse.isActive : true,
        isFeatured: updatedHouse.isFeatured || false,
      };

      setHouses((prev) =>
        prev.map((h) => (h._id === selectedHouse._id ? houseWithImages : h)),
      );
      showSuccessModal(
        t.success || "Success!",
        t.propertyUpdated || "Property updated successfully!",
        `${updatedHouse.name} has been updated`,
      );
      setIsEditModalOpen(false);
      setSelectedHouse(null);
      resetForm();
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data
        ? typeof axiosError.response?.data === "string"
          ? axiosError.response?.data
          : JSON.stringify(axiosError.response?.data)
        : t.updateFailed;
      showErrorModal(t.error || "Error", errorMessage);
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
      showSuccessModal(
        t.success || "Success!",
        t.propertyDeleted || "Property deleted successfully!",
        `${selectedHouse.name} has been removed from your listings`,
      );
      setIsDeleteModalOpen(false);
      setSelectedHouse(null);
    } catch (error) {
      const axiosError = error as AxiosError;
      showErrorModal(
        t.error || "Error",
        t.deleteFailed || "Failed to delete property",
        axiosError.response?.data ? String(axiosError.response?.data) : undefined,
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!selectedHouse || !newStatus) return;

    setSubmitting(true);
    try {
      const updatedHouse = await houseApi.updateHouseStatus(selectedHouse._id!, newStatus);

      const houseWithImages = {
        ...updatedHouse,
        images: updatedHouse.images || [],
        location: {
          province: updatedHouse.location?.province || "",
          district: updatedHouse.location?.district || "",
          sector: updatedHouse.location?.sector || "",
          cell: updatedHouse.location?.cell || "",
          village: updatedHouse.location?.village || "",
          address: updatedHouse.location?.address || "",
          latitude: updatedHouse.location?.latitude ?? null,
          longitude: updatedHouse.location?.longitude ?? null,
        },
        guests: updatedHouse.guests || 1,
        currency: updatedHouse.currency || "RWF",
        isActive: updatedHouse.isActive !== undefined ? updatedHouse.isActive : true,
        isFeatured: updatedHouse.isFeatured || false,
      };

      setHouses((prev) =>
        prev.map((h) => (h._id === selectedHouse._id ? houseWithImages : h)),
      );

      showSuccessModal(
        t.success || "Success!",
        "Status updated successfully!",
        `${selectedHouse.name} is now ${getStatusLabel(newStatus)}`,
      );

      setIsStatusModalOpen(false);
      setSelectedHouse(null);
    } catch (error) {
      const axiosError = error as AxiosError;
      showErrorModal(
        t.error || "Error",
        "Failed to update status",
        axiosError.response?.data ? String(axiosError.response?.data) : undefined,
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setPropertyFormData({
      name: "",
      houseType: "",
      description: "",
      university: "",
      location: {
        province: "",
        district: "",
        sector: "",
        cell: "",
        village: "",
        address: "",
        latitude: null,
        longitude: null,
      },
      pricePerMonth: 0,
      currency: "RWF",
      bedrooms: 1,
      bathrooms: 1,
      guests: 2,
      amenities: [],
      status: "pending",
      ownerName: userName || "",
      ownerEmail: userEmail || "",
      ownerContact: "",
      isActive: true,
      isFeatured: false,
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
      name: house.name || "",
      houseType: house.houseType || "",
      description: house.description || "",
      university: house.university || "",
      location: {
        province: house.location?.province || "",
        district: house.location?.district || "",
        sector: house.location?.sector || "",
        cell: house.location?.cell || "",
        village: house.location?.village || "",
        address: house.location?.address || "",
        latitude: house.location?.latitude ?? null,
        longitude: house.location?.longitude ?? null,
      },
      pricePerMonth: house.pricePerMonth || 0,
      currency: house.currency || "RWF",
      bedrooms: house.bedrooms || 1,
      bathrooms: house.bathrooms || 1,
      guests: house.guests || 2,
      amenities: house.amenities || [],
      status: house.status || "pending",
      ownerName: house.ownerName || "",
      ownerEmail: house.ownerEmail || "",
      ownerContact: house.ownerContact || "",
      isActive: house.isActive !== undefined ? house.isActive : true,
      isFeatured: house.isFeatured || false,
    });
    setImageFiles([]);
    setImagePreviews(house.images ? house.images.map((img) => img.url) : []);
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

  const openStatusModal = (house: House) => {
    setSelectedHouse(house);
    setNewStatus(house.status || "available");
    setIsStatusModalOpen(true);
  };

  const getStatusOptions = (currentStatus: string): House["status"][] => {
    const allStatuses: House["status"][] = [
      "available",
      "pending",
      "booked",
      "unavailable",
      "maintenance",
      "inactive",
    ];
    return allStatuses.filter((status) => status !== currentStatus);
  };

  // Render input with live validation
  const renderInput = (
    label: string,
    field: string,
    type: string = "text",
    placeholder: string = "",
    required: boolean = true,
    value?: string | number,
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
  ) => {
    const fieldName = field.includes(".") ? field.split(".")[1] : field;
    const error = formErrors[fieldName];
    const isTouched = touchedFields[fieldName];
    const showError = isTouched && error;

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
              showError
                ? "border-red-500 bg-red-50"
                : isTouched && !error && value && String(value).trim().length > 0
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
              showError
                ? "border-red-500 bg-red-50"
                : isTouched && !error && value && String(value).trim().length > 0
                ? "border-green-500 bg-green-50"
                : "border-gray-300"
            }`}
          >
            {placeholder && <option value="">{placeholder}</option>}
          </select>
        ) : (
          <input
            type={type}
            value={(value as string) || ""}
            onChange={onChange}
            onBlur={() => handleFieldBlur(fieldName)}
            className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm transition-all ${
              showError
                ? "border-red-500 bg-red-50"
                : isTouched && !error && value && String(value).trim().length > 0
                ? "border-green-500 bg-green-50"
                : "border-gray-300"
            }`}
            placeholder={placeholder}
            min={type === "number" ? 0 : undefined}
          />
        )}
        {showError && <p className="mt-1 text-sm text-red-500">{error}</p>}
        {isTouched && !error && value && String(value).trim().length > 0 && (
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="w-16 h-16 border-4 border-[#FF385C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
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
          { label: t.totalProperties, value: stats.total, color: "bg-gradient-to-br from-blue-500 to-blue-600" },
          { label: t.availableProperties, value: stats.available, color: "bg-gradient-to-br from-green-500 to-green-600" },
          { label: t.pendingProperties, value: stats.pending, color: "bg-gradient-to-br from-yellow-500 to-yellow-600" },
          { label: t.bookedProperties, value: stats.booked, color: "bg-gradient-to-br from-purple-500 to-purple-600" },
          { label: t.unavailableProperties, value: stats.unavailable, color: "bg-gradient-to-br from-gray-500 to-gray-600" },
          { label: t.maintenanceProperties, value: stats.maintenance, color: "bg-gradient-to-br from-red-500 to-red-600" },
          { label: t.inactiveProperties, value: stats.inactive, color: "bg-gradient-to-br from-gray-400 to-gray-500" },
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
              <option value="booked">{t.booked}</option>
              <option value="unavailable">{t.unavailable}</option>
              <option value="maintenance">{t.maintenance}</option>
              <option value="inactive">{t.inactive}</option>
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
                  alt={house.name || "Property"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(house.status)}`}
                  >
                    {getStatusLabel(house.status)}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {house.name || "Unnamed Property"}
                </h3>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                  <Icons.Location />
                  {getLocationDisplay(house)}
                </p>
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <span className="flex items-center gap-1 text-gray-600">
                    <Icons.Bed /> {house.bedrooms || 0}
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="flex items-center gap-1 text-gray-600">
                    <Icons.Bath /> {house.bathrooms || 0}
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="flex items-center gap-1 text-gray-600">
                    <Icons.User /> {house.guests || 0}
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
                      title="View Property"
                    >
                      <Icons.View />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => openEditModal(house)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-xl transition-all"
                      title="Edit Property"
                    >
                      <Icons.Edit />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => openStatusModal(house)}
                      className="p-2 text-purple-600 hover:bg-purple-50 rounded-xl transition-all"
                      title="Change Status"
                    >
                      <Icons.Status />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => openDeleteModal(house)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      title="Delete Property"
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

      {/* Status Update Modal */}
      <AnimatePresence>
        {isStatusModalOpen && selectedHouse && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setIsStatusModalOpen(false)}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            >
              <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white relative">
                <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Icons.Status />
                    Change Status
                  </h2>
                  <motion.button
                    whileHover={{ rotate: 90 }}
                    onClick={() => {
                      setIsStatusModalOpen(false);
                      setSelectedHouse(null);
                    }}
                    className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
                  >
                    <Icons.Close />
                  </motion.button>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Property</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {selectedHouse.name || "Unnamed Property"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Current Status</p>
                    <span
                      className={`px-3 py-1.5 text-sm font-medium rounded-full ${getStatusColor(selectedHouse.status)}`}
                    >
                      {getStatusLabel(selectedHouse.status)}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      New Status
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as House["status"])}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                    >
                      {getStatusOptions(selectedHouse.status).map((status) => (
                        <option key={status} value={status}>
                          {getStatusLabel(status)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleStatusUpdate}
                      disabled={submitting}
                      className={`flex-1 px-6 py-3 rounded-xl text-white font-medium transition-all flex items-center justify-center gap-2 ${
                        submitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-[#FF385C] to-[#E31C5F] hover:shadow-lg"
                      }`}
                    >
                      {submitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Icons.Status /> Update Status
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsStatusModalOpen(false);
                        setSelectedHouse(null);
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
                          alt={selectedHouse.name || "Property"}
                          className={`rounded-xl object-cover h-48 ${index === 0 ? "col-span-2" : ""}`}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-100 rounded-xl h-48 flex items-center justify-center">
                      <p className="text-gray-500">No images available</p>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {selectedHouse.name || "Unnamed Property"}
                    </h3>
                    <span
                      className={`px-3 py-1.5 text-sm font-medium rounded-full ${getStatusColor(selectedHouse.status)}`}
                    >
                      {getStatusLabel(selectedHouse.status)}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {t.pricePerMonth}
                      </p>
                      <p className="text-lg font-bold text-[#FF385C]">
                        {formatCurrency(selectedHouse.pricePerMonth)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {t.university}
                      </p>
                      <p className="text-sm text-gray-700">
                        {selectedHouse.university || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {t.houseType}
                    </p>
                    <p className="text-sm text-gray-700">
                      {selectedHouse.houseType || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {t.description}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      {selectedHouse.description || "No description available"}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {t.bedrooms}
                      </p>
                      <p className="text-lg font-semibold">
                        {selectedHouse.bedrooms || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {t.bathrooms}
                      </p>
                      <p className="text-lg font-semibold">
                        {selectedHouse.bathrooms || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {t.maxGuests}
                      </p>
                      <p className="text-lg font-semibold">
                        {selectedHouse.guests || 0}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {t.location}
                    </p>
                    <p className="text-sm text-gray-700">
                      {getFullLocationDisplay(selectedHouse)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {t.amenities}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedHouse.amenities && selectedHouse.amenities.length > 0 ? (
                        selectedHouse.amenities.map((amenity) => (
                          <span
                            key={amenity}
                            className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                          >
                            {amenity}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-400">No amenities</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
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
                        openStatusModal(selectedHouse);
                      }}
                      className="px-4 py-2.5 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors flex items-center gap-2"
                    >
                      <Icons.Status /> Change Status
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
                    (e) => handleInputChange("name", (e.target as HTMLInputElement).value),
                  )}
                  {renderInput(
                    t.houseType,
                    "houseType",
                    "text",
                    t.enterHouseType,
                    true,
                    propertyFormData.houseType,
                    (e) => handleInputChange("houseType", (e.target as HTMLInputElement).value),
                  )}
                  {renderInput(
                    t.description,
                    "description",
                    "textarea",
                    t.enterDescription,
                    false,
                    propertyFormData.description,
                    (e) => handleInputChange("description", (e.target as HTMLTextAreaElement).value),
                  )}
                  {renderInput(
                    t.university,
                    "university",
                    "text",
                    "Enter university name",
                    false,
                    propertyFormData.university,
                    (e) => handleInputChange("university", (e.target as HTMLInputElement).value),
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
                          onChange={(e) => handleLocationChange("province", e.target.value)}
                          onBlur={() => handleFieldBlur("province")}
                          className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white transition-all ${
                            formErrors.province && touchedFields.province && propertyFormData.location.province
                              ? "border-red-500 bg-red-50"
                              : touchedFields.province && !formErrors.province && propertyFormData.location.province
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
                        {formErrors.province && touchedFields.province && propertyFormData.location.province && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.province}</p>
                        )}
                        {touchedFields.province && !formErrors.province && propertyFormData.location.province && (
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
                          onChange={(e) => handleLocationChange("district", e.target.value)}
                          onBlur={() => handleFieldBlur("district")}
                          placeholder={t.districtPlaceholder}
                          className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm transition-all ${
                            formErrors.district && touchedFields.district && propertyFormData.location.district
                              ? "border-red-500 bg-red-50"
                              : touchedFields.district && !formErrors.district && propertyFormData.location.district
                              ? "border-green-500 bg-green-50"
                              : "border-gray-300"
                          }`}
                        />
                        {formErrors.district && touchedFields.district && propertyFormData.location.district && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.district}</p>
                        )}
                        {touchedFields.district && !formErrors.district && propertyFormData.location.district && (
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
                          onChange={(e) => handleLocationChange("sector", e.target.value)}
                          onBlur={() => handleFieldBlur("sector")}
                          placeholder={t.sectorPlaceholder}
                          className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm transition-all ${
                            formErrors.sector && touchedFields.sector && propertyFormData.location.sector
                              ? "border-red-500 bg-red-50"
                              : touchedFields.sector && !formErrors.sector && propertyFormData.location.sector
                              ? "border-green-500 bg-green-50"
                              : "border-gray-300"
                          }`}
                        />
                        {formErrors.sector && touchedFields.sector && propertyFormData.location.sector && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.sector}</p>
                        )}
                        {touchedFields.sector && !formErrors.sector && propertyFormData.location.sector && (
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
                          onChange={(e) => handleLocationChange("cell", e.target.value)}
                          onBlur={() => handleFieldBlur("cell")}
                          placeholder={t.cellPlaceholder}
                          className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm transition-all ${
                            formErrors.cell && touchedFields.cell && propertyFormData.location.cell
                              ? "border-red-500 bg-red-50"
                              : touchedFields.cell && !formErrors.cell && propertyFormData.location.cell
                              ? "border-green-500 bg-green-50"
                              : "border-gray-300"
                          }`}
                        />
                        {formErrors.cell && touchedFields.cell && propertyFormData.location.cell && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.cell}</p>
                        )}
                        {touchedFields.cell && !formErrors.cell && propertyFormData.location.cell && (
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
                        onChange={(e) => handleLocationChange("village", e.target.value)}
                        onBlur={() => handleFieldBlur("village")}
                        placeholder={t.villagePlaceholder}
                        className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm transition-all ${
                          formErrors.village && touchedFields.village && propertyFormData.location.village
                            ? "border-red-500 bg-red-50"
                            : touchedFields.village && !formErrors.village && propertyFormData.location.village
                            ? "border-green-500 bg-green-50"
                            : "border-gray-300"
                        }`}
                      />
                      {formErrors.village && touchedFields.village && propertyFormData.location.village && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.village}</p>
                      )}
                      {touchedFields.village && !formErrors.village && propertyFormData.location.village && (
                        <p className="mt-1 text-sm text-green-500 flex items-center gap-1">
                          <Icons.Check /> Valid
                        </p>
                      )}
                    </div>
                    {/* Optional Address field */}
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Address (optional)
                      </label>
                      <input
                        type="text"
                        value={propertyFormData.location.address}
                        onChange={(e) => handleLocationChange("address", e.target.value)}
                        placeholder="Enter detailed address"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
                      />
                    </div>
                  </div>

                  {/* Pricing and Details */}
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0 3V9m0 6V15m0 6v-3" />
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
                        (e) => handleInputChange("pricePerMonth", parseFloat((e.target as HTMLInputElement).value) || 0),
                      )}
                      {renderInput(
                        t.bedrooms,
                        "bedrooms",
                        "number",
                        t.enterBedrooms,
                        false,
                        propertyFormData.bedrooms,
                        (e) => handleInputChange("bedrooms", parseInt((e.target as HTMLInputElement).value) || 0),
                      )}
                      {renderInput(
                        t.bathrooms,
                        "bathrooms",
                        "number",
                        t.enterBathrooms,
                        false,
                        propertyFormData.bathrooms,
                        (e) => handleInputChange("bathrooms", parseInt((e.target as HTMLInputElement).value) || 0),
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                      {renderInput(
                        t.maxGuests,
                        "guests",
                        "number",
                        t.enterMaxGuests,
                        true,
                        propertyFormData.guests,
                        (e) => handleInputChange("guests", parseInt((e.target as HTMLInputElement).value) || 1),
                      )}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {t.status} <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={propertyFormData.status}
                          onChange={(e) => handleInputChange("status", e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                        >
                          <option value="available">{t.available}</option>
                          <option value="pending">{t.pending}</option>
                          <option value="booked">{t.booked}</option>
                          <option value="unavailable">{t.unavailable}</option>
                          <option value="maintenance">{t.maintenance}</option>
                          <option value="inactive">{t.inactive}</option>
                        </select>
                      </div>
                    </div>
                    {/* Currency */}
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Currency
                      </label>
                      <select
                        value={propertyFormData.currency}
                        onChange={(e) => handleInputChange("currency", e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                      >
                        <option value="RWF">RWF</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                      </select>
                    </div>
                  </div>

                  {/* Owner Information */}
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <Icons.User /> Owner Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {renderInput(
                        t.ownerName,
                        "ownerName",
                        "text",
                        "Enter owner name",
                        false,
                        propertyFormData.ownerName,
                        (e) => handleInputChange("ownerName", (e.target as HTMLInputElement).value),
                      )}
                      {renderInput(
                        t.ownerEmail,
                        "ownerEmail",
                        "email",
                        "Enter owner email",
                        false,
                        propertyFormData.ownerEmail,
                        (e) => handleInputChange("ownerEmail", (e.target as HTMLInputElement).value),
                      )}
                    </div>
                    <div className="mt-3">
                      {renderInput(
                        t.ownerContact,
                        "ownerContact",
                        "text",
                        "Enter owner phone number",
                        false,
                        propertyFormData.ownerContact,
                        (e) => handleInputChange("ownerContact", (e.target as HTMLInputElement).value),
                      )}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
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
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <Icons.Upload /> {t.uploadImages} <span className="text-red-500">*</span>
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">Upload 2-10 images</p>
                    <div
                      className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                        formErrors.images && touchedFields.images
                          ? "border-red-500 bg-red-50"
                          : imageFiles.length >= 2 && imageFiles.length <= 10
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
                      <p className="mt-2 text-sm text-gray-600">{t.dropImages}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {imageFiles.length + (selectedHouse?.images?.length || 0)} / 10 images
                      </p>
                    </div>
                    {(imagePreviews.length > 0 || (selectedHouse && selectedHouse.images && selectedHouse.images.length > 0)) && (
                      <div className="mt-3 grid grid-cols-4 gap-2">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative group">
                            <img src={preview} alt={`Preview ${index}`} className="w-full h-20 object-cover rounded-xl" />
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                        {selectedHouse && selectedHouse.images && selectedHouse.images.map((img, index) => (
                          <div key={`existing-${index}`} className="relative group">
                            <img src={img.url} alt={`Existing ${index}`} className="w-full h-20 object-cover rounded-xl" />
                          </div>
                        ))}
                      </div>
                    )}
                    {formErrors.images && touchedFields.images && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.images}</p>
                    )}
                    {imageFiles.length + (selectedHouse?.images?.length || 0) < 2 && (
                      <p className="mt-1 text-sm text-yellow-500">⚠️ Minimum 2 images required</p>
                    )}
                    {imageFiles.length + (selectedHouse?.images?.length || 0) > 10 && (
                      <p className="mt-1 text-sm text-red-500">⚠️ Maximum 10 images allowed</p>
                    )}
                  </div>

                  {/* Form Validation Status */}
                  <div className="flex items-center gap-2 text-sm">
                    {isFormValid() ? (
                      <span className="text-green-600 flex items-center gap-1">
                        <Icons.Check /> All fields are valid
                      </span>
                    ) : (
                      <span className="text-gray-500">
                        Please fill in all required fields
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={isEditModalOpen ? handleUpdateProperty : handleCreateProperty}
                      disabled={submitting || !isFormValid()}
                      className={`flex-1 px-6 py-3 rounded-xl text-white font-medium transition-all flex items-center justify-center gap-2 ${
                        submitting || !isFormValid()
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-[#FF385C] to-[#E31C5F] hover:shadow-lg"
                      }`}
                    >
                      {submitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedHouse(null);
        }}
        onConfirm={handleDeleteProperty}
        title={t.deleteProperty}
        message={t.deleteConfirmation}
        confirmText={t.delete}
        cancelText={t.cancel}
        isSubmitting={submitting}
        type="danger"
        icon={
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        }
      />
    </div>
  );
};