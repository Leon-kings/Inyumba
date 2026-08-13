// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-hooks/immutability */
// /* eslint-disable react-refresh/only-export-components */
// /* eslint-disable react-hooks/set-state-in-effect */
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import "react-toastify/dist/ReactToastify.css";
// import Cookies from 'js-cookie';
// import axios from "axios";

// // Material-UI Icons
// import PersonIcon from "@mui/icons-material/Person";
// import EmailIcon from "@mui/icons-material/Email";
// import PhoneIcon from "@mui/icons-material/Phone";
// import LockIcon from "@mui/icons-material/Lock";
// import CloseIcon from "@mui/icons-material/Close";
// import AddIcon from "@mui/icons-material/Add";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import SearchIcon from "@mui/icons-material/Search";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import CancelIcon from "@mui/icons-material/Cancel";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import WarningIcon from "@mui/icons-material/Warning";
// import SecurityIcon from "@mui/icons-material/Security";
// import VerifiedIcon from "@mui/icons-material/Verified";
// import RefreshIcon from "@mui/icons-material/Refresh";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import InfoIcon from "@mui/icons-material/Info";
// import {
//   CheckCircleOutlineRounded,
//   ErrorOutlineOutlined,
//   ViewAgenda,
// } from "@mui/icons-material";

// // API Configuration
// const API_BASE_URL = "https://rene-inyumba-nodejs.onrender.com";
// const API = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Add token interceptor
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Types
// interface User {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   role: "admin" | "user" | "host";
//   status: "active" | "inactive" | "suspended";
//   createdAt: string;
//   updatedAt: string;
// }

// interface UserFormData {
//   name: string;
//   email: string;
//   phone: string;
//   password: string;
//   confirmPassword: string;
//   role: "admin" | "user" | "host";
//   status: "active" | "inactive" | "suspended";
// }

// // Helper functions for safe user data access
// const safeUserHelpers = {
//   getInitial: (user: User | null | undefined): string => {
//     if (!user || !user.name || user.name.length === 0) return "U";
//     return user.name.charAt(0).toUpperCase();
//   },
  
//   formatRole: (user: User | null | undefined): string => {
//     if (!user || !user.role || user.role.length === 0) return "User";
//     return user.role.charAt(0).toUpperCase() + user.role.slice(1);
//   },
  
//   formatStatus: (user: User | null | undefined): string => {
//     if (!user || !user.status || user.status.length === 0) return "Active";
//     return user.status.charAt(0).toUpperCase() + user.status.slice(1);
//   },
  
//   getDisplayName: (user: User | null | undefined): string => {
//     if (!user || !user.name) return "Unknown User";
//     return user.name;
//   },
  
//   getDisplayEmail: (user: User | null | undefined): string => {
//     if (!user || !user.email) return "No email";
//     return user.email;
//   },
  
//   getDisplayPhone: (user: User | null | undefined): string => {
//     if (!user || !user.phone) return "No phone";
//     return user.phone;
//   },
  
//   getDisplayRole: (user: User | null | undefined): string => {
//     if (!user || !user.role) return "user";
//     return user.role;
//   },
  
//   getDisplayStatus: (user: User | null | undefined): string => {
//     if (!user || !user.status) return "active";
//     return user.status;
//   }
// };

// // Status Modal Component
// interface StatusModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   type: "success" | "error" | "info" | "confirm";
//   title: string;
//   message: string;
//   details?: string;
//   onConfirm?: () => void;
//   confirmText?: string;
//   cancelText?: string;
// }

// const StatusModal: React.FC<StatusModalProps> = ({
//   isOpen,
//   onClose,
//   type,
//   title,
//   message,
//   details,
//   onConfirm,
//   confirmText = "Confirm",
//   cancelText = "Cancel",
// }) => {
//   const getIcon = () => {
//     switch (type) {
//       case "success":
//         return (
//           <CheckCircleOutlineRounded className="w-16 h-16 text-green-500" />
//         );
//       case "error":
//         return <ErrorOutlineOutlined className="w-16 h-16 text-red-500" />;
//       case "info":
//         return <InfoIcon className="w-16 h-16 text-blue-500" />;
//       case "confirm":
//         return <WarningIcon className="w-16 h-16 text-yellow-500" />;
//     }
//   };

//   const getColors = () => {
//     switch (type) {
//       case "success":
//         return {
//           bg: "bg-green-50",
//           border: "border-green-200",
//           text: "text-green-800",
//           button: "bg-green-500 hover:bg-green-600",
//         };
//       case "error":
//         return {
//           bg: "bg-red-50",
//           border: "border-red-200",
//           text: "text-red-800",
//           button: "bg-red-500 hover:bg-red-600",
//         };
//       case "info":
//         return {
//           bg: "bg-blue-50",
//           border: "border-blue-200",
//           text: "text-blue-800",
//           button: "bg-blue-500 hover:bg-blue-600",
//         };
//       case "confirm":
//         return {
//           bg: "bg-yellow-50",
//           border: "border-yellow-200",
//           text: "text-yellow-800",
//           button: "bg-yellow-500 hover:bg-yellow-600",
//         };
//     }
//   };

//   const colors = getColors();

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
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             variants={overlayVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
//             onClick={onClose}
//           />
//           <motion.div
//             variants={modalVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
//             className="fixed inset-0 z-[201] flex items-center justify-center p-4"
//           >
//             <div
//               className={`w-full max-w-md rounded-2xl shadow-2xl border ${colors.border} ${colors.bg} relative overflow-hidden`}
//             >
//               <div className="relative z-10 p-6">
//                 <div className="flex flex-col items-center text-center">
//                   {/* Icon */}
//                   <motion.div
//                     initial={{ scale: 0, rotate: -180 }}
//                     animate={{ scale: 1, rotate: 0 }}
//                     transition={{ duration: 0.5, type: "spring" }}
//                     className="mb-4"
//                   >
//                     {getIcon()}
//                   </motion.div>

//                   {/* Title */}
//                   <motion.h3
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.1 }}
//                     className={`text-2xl font-bold ${colors.text} mb-2`}
//                   >
//                     {title}
//                   </motion.h3>

//                   {/* Message */}
//                   <motion.p
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2 }}
//                     className="text-gray-700 mb-4"
//                   >
//                     {message}
//                   </motion.p>

//                   {/* Details */}
//                   {details && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.3 }}
//                       className="bg-white/50 rounded-lg p-3 mb-4 w-full text-sm text-gray-600"
//                     >
//                       {details}
//                     </motion.div>
//                   )}

//                   {/* Buttons */}
//                   <div className="flex gap-3 w-full">
//                     {type === "confirm" ? (
//                       <>
//                         <motion.button
//                           initial={{ opacity: 0, y: 10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: 0.4 }}
//                           whileHover={{ scale: 1.02 }}
//                           whileTap={{ scale: 0.98 }}
//                           onClick={onClose}
//                           className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
//                         >
//                           {cancelText}
//                         </motion.button>
//                         <motion.button
//                           initial={{ opacity: 0, y: 10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: 0.5 }}
//                           whileHover={{ scale: 1.02 }}
//                           whileTap={{ scale: 0.98 }}
//                           onClick={onConfirm}
//                           className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-all ${colors.button} shadow-lg`}
//                         >
//                           {confirmText}
//                         </motion.button>
//                       </>
//                     ) : (
//                       <motion.button
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.4 }}
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={onClose}
//                         className={`w-full px-6 py-2.5 rounded-lg text-white font-medium transition-all ${colors.button} shadow-lg`}
//                       >
//                         Got it
//                       </motion.button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// // View User Modal
// interface ViewUserModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   user: User | null;
// }

// const ViewUserModal: React.FC<ViewUserModalProps> = ({ isOpen, onClose, user }) => {
//   if (!user) return null;

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

//   const getRoleColor = (role: string): string => {
//     switch (role) {
//       case "admin":
//         return "bg-purple-100 text-purple-800";
//       case "host":
//         return "bg-blue-100 text-blue-800";
//       default:
//         return "bg-green-100 text-green-800";
//     }
//   };

//   const getStatusColor = (status: string): string => {
//     switch (status) {
//       case "active":
//         return "bg-green-100 text-green-800";
//       case "inactive":
//         return "bg-yellow-100 text-yellow-800";
//       case "suspended":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   // Safe user data access
//   const userInitial = safeUserHelpers.getInitial(user);
//   const userDisplayName = safeUserHelpers.getDisplayName(user);
//   const userDisplayEmail = safeUserHelpers.getDisplayEmail(user);
//   const userDisplayRole = safeUserHelpers.getDisplayRole(user);
//   const userDisplayStatus = safeUserHelpers.getDisplayStatus(user);
//   const formattedRole = safeUserHelpers.formatRole(user);
//   const formattedStatus = safeUserHelpers.formatStatus(user);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             variants={overlayVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]"
//             onClick={onClose}
//           />
//           <motion.div
//             variants={modalVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
//             className="fixed inset-0 z-[151] flex items-center justify-center p-4"
//           >
//             <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white relative overflow-hidden">
//               <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
//                 <div className="flex items-center gap-2">
//                   <PersonIcon className="text-[#FF385C] w-5 h-5" />
//                   <h2 className="text-xl font-semibold text-gray-900">
//                     User Details
//                   </h2>
//                 </div>
//                 <motion.button
//                   whileHover={{ rotate: 90, scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={onClose}
//                   className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
//                 >
//                   <CloseIcon className="w-5 h-5" />
//                 </motion.button>
//               </div>

//               <div className="p-6">
//                 <div className="flex flex-col items-center mb-6">
//                   <motion.div
//                     className="w-24 h-24 rounded-full bg-[#FF385C] text-white flex items-center justify-center text-3xl font-bold mb-3"
//                     whileHover={{ scale: 1.1, rotate: 10 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     {userInitial}
//                   </motion.div>
//                   <h3 className="text-xl font-semibold text-gray-900">
//                     {userDisplayName}
//                   </h3>
//                   <p className="text-sm text-gray-500">{userDisplayEmail}</p>
//                   <div className="flex gap-2 mt-2">
//                     <span
//                       className={`px-3 py-1 text-xs font-medium rounded-full ${getRoleColor(
//                         userDisplayRole,
//                       )}`}
//                     >
//                       {formattedRole}
//                     </span>
//                     <span
//                       className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
//                         userDisplayStatus,
//                       )}`}
//                     >
//                       {formattedStatus}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="space-y-3 border-t border-gray-200 pt-4">
//                   <div className="flex justify-between py-2 border-b border-gray-100">
//                     <span className="text-sm text-gray-500">Phone</span>
//                     <span className="text-sm font-medium text-gray-900">
//                       {safeUserHelpers.getDisplayPhone(user)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between py-2 border-b border-gray-100">
//                     <span className="text-sm text-gray-500">User ID</span>
//                     <span className="text-sm font-medium text-gray-900">
//                       {user.id || "N/A"}
//                     </span>
//                   </div>
//                   <div className="flex justify-between py-2 border-b border-gray-100">
//                     <span className="text-sm text-gray-500">Joined</span>
//                     <span className="text-sm font-medium text-gray-900">
//                       {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", {
//                         year: "numeric",
//                         month: "long",
//                         day: "numeric",
//                       }) : "N/A"}
//                     </span>
//                   </div>
//                   <div className="flex justify-between py-2">
//                     <span className="text-sm text-gray-500">Last Updated</span>
//                     <span className="text-sm font-medium text-gray-900">
//                       {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString("en-US", {
//                         year: "numeric",
//                         month: "long",
//                         day: "numeric",
//                       }) : "N/A"}
//                     </span>
//                   </div>
//                 </div>

//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={onClose}
//                   className="w-full mt-6 py-2.5 rounded-lg bg-[#FF385C] text-white font-medium hover:bg-[#E31C5F] transition-colors"
//                 >
//                   Close
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// // Translations
// const translations = {
//   en: {
//     userManagement: "User Management",
//     manageUsers: "Manage users, roles, and permissions",
//     addUser: "Add User",
//     total: "Total",
//     active: "Active",
//     inactive: "Inactive",
//     suspended: "Suspended",
//     admins: "Admins",
//     hosts: "Hosts",
//     users: "Users",
//     searchUsers: "Search users by name, email or phone...",
//     allRoles: "All Roles",
//     allStatus: "All Status",
//     user: "User",
//     contact: "Contact",
//     role: "Role",
//     status: "Status",
//     joined: "Joined",
//     actions: "Actions",
//     noUsers: "No users found",
//     adjustFilters: "Try adjusting your search or filters",
//     showing: "Showing",
//     of: "of",
//     usersCount: "users",
//     addNewUser: "Add New User",
//     editUser: "Edit User",
//     fullName: "Full Name",
//     email: "Email",
//     phoneNumber: "Phone Number",
//     password: "Password",
//     confirmPassword: "Confirm Password",
//     createUser: "Create User",
//     updateUser: "Update User",
//     deleteUser: "Delete User",
//     deleteConfirmation: "Are you sure you want to delete",
//     actionUndone: "This action cannot be undone.",
//     cancel: "Cancel",
//     delete: "Delete",
//     creating: "Creating...",
//     updating: "Updating...",
//     deleting: "Deleting...",
//     userCreated: "User created successfully!",
//     userUpdated: "User updated successfully!",
//     userDeleted: "User deleted successfully!",
//     usersDeleted: "users deleted successfully!",
//     createFailed: "Failed to create user",
//     updateFailed: "Failed to update user",
//     deleteFailed: "Failed to delete user",
//     nameRequired: "Full name is required",
//     nameMin: "Name must be at least 2 characters",
//     emailRequired: "Email is required",
//     emailInvalid: "Please enter a valid email address",
//     phoneRequired: "Phone number is required",
//     phoneInvalid: "Please enter a valid Rwandan phone number (ex: 0788123456 or +250788123456)",
//     passwordRequired: "Password is required",
//     passwordMin: "Password must be at least 6 characters",
//     confirmPasswordRequired: "Please confirm your password",
//     passwordsDoNotMatch: "Passwords do not match",
//     passwordWeak: "Please choose a stronger password",
//     validEmail: "Valid email address",
//     validPhone: "Valid phone number",
//     passwordsMatch: "Passwords match",
//     strength: "Strength",
//     weak: "Weak",
//     moderate: "Moderate",
//     strong: "Strong",
//     editPasswordNote: "Password fields are optional for editing.",
//     viewUser: "View User",
//   },
//   fr: {
//     userManagement: "Gestion des Utilisateurs",
//     manageUsers: "Gérer les utilisateurs, les rôles et les permissions",
//     addUser: "Ajouter un Utilisateur",
//     total: "Total",
//     active: "Actif",
//     inactive: "Inactif",
//     suspended: "Suspendu",
//     admins: "Administrateurs",
//     hosts: "Hôtes",
//     users: "Utilisateurs",
//     searchUsers: "Rechercher des utilisateurs par nom, email ou téléphone...",
//     allRoles: "Tous les Rôles",
//     allStatus: "Tous les Statuts",
//     user: "Utilisateur",
//     contact: "Contact",
//     role: "Rôle",
//     status: "Statut",
//     joined: "Inscrit",
//     actions: "Actions",
//     noUsers: "Aucun utilisateur trouvé",
//     adjustFilters: "Essayez d'ajuster votre recherche ou vos filtres",
//     showing: "Affichage",
//     of: "de",
//     usersCount: "utilisateurs",
//     addNewUser: "Ajouter un Nouvel Utilisateur",
//     editUser: "Modifier l'Utilisateur",
//     fullName: "Nom Complet",
//     email: "E-mail",
//     phoneNumber: "Numéro de Téléphone",
//     password: "Mot de Passe",
//     confirmPassword: "Confirmer le Mot de Passe",
//     createUser: "Créer l'Utilisateur",
//     updateUser: "Mettre à Jour l'Utilisateur",
//     deleteUser: "Supprimer l'Utilisateur",
//     deleteConfirmation: "Êtes-vous sûr de vouloir supprimer",
//     actionUndone: "Cette action est irréversible.",
//     cancel: "Annuler",
//     delete: "Supprimer",
//     creating: "Création...",
//     updating: "Mise à jour...",
//     deleting: "Suppression...",
//     userCreated: "Utilisateur créé avec succès !",
//     userUpdated: "Utilisateur mis à jour avec succès !",
//     userDeleted: "Utilisateur supprimé avec succès !",
//     usersDeleted: "utilisateurs supprimés avec succès !",
//     createFailed: "Échec de la création de l'utilisateur",
//     updateFailed: "Échec de la mise à jour de l'utilisateur",
//     deleteFailed: "Échec de la suppression de l'utilisateur",
//     nameRequired: "Le nom complet est requis",
//     nameMin: "Le nom doit contenir au moins 2 caractères",
//     emailRequired: "L'e-mail est requis",
//     emailInvalid: "Veuillez entrer une adresse e-mail valide",
//     phoneRequired: "Le numéro de téléphone est requis",
//     phoneInvalid: "Veuillez entrer un numéro de téléphone rwandais valide (ex: 0788123456 ou +250788123456)",
//     passwordRequired: "Le mot de passe est requis",
//     passwordMin: "Le mot de passe doit contenir au moins 6 caractères",
//     confirmPasswordRequired: "Veuillez confirmer votre mot de passe",
//     passwordsDoNotMatch: "Les mots de passe ne correspondent pas",
//     passwordWeak: "Veuillez choisir un mot de passe plus fort",
//     validEmail: "Adresse e-mail valide",
//     validPhone: "Numéro de téléphone valide",
//     passwordsMatch: "Les mots de passe correspondent",
//     strength: "Force",
//     weak: "Faible",
//     moderate: "Modéré",
//     strong: "Fort",
//     editPasswordNote: "Les champs de mot de passe sont facultatifs pour la modification.",
//     viewUser: "Voir l'Utilisateur",
//   },
//   rw: {
//     userManagement: "Gucunga Abakoresha",
//     manageUsers: "Gucunga abakoresha, imirimo n'uburenganzira",
//     addUser: "Ongeraho Umukoresha",
//     total: "Yose",
//     active: "Agikoresha",
//     inactive: "Ntagikoresha",
//     suspended: "Yahagaritswe",
//     admins: "Abayobozi",
//     hosts: "Abatunze Inzu",
//     users: "Abakoresha",
//     searchUsers: "Shakisha abakoresha ukurikije izina, imeri cyangwa telefone...",
//     allRoles: "Imirimo Yose",
//     allStatus: "Ihagaze Ryose",
//     user: "Umukoresha",
//     contact: "Aho Kuvugana",
//     role: "Umurimo",
//     status: "Ihagaze",
//     joined: "Yinjiye",
//     actions: "Ibikorwa",
//     noUsers: "Nta mukoresha wabonetse",
//     adjustFilters: "Gerageza guhindura uburyo ushakisha cyangwa amatungo",
//     showing: "Bereka",
//     of: "muri",
//     usersCount: "abakoresha",
//     addNewUser: "Ongeraho Umukoresha Mushya",
//     editUser: "Hindura Umukoresha",
//     fullName: "Izina Ryose",
//     email: "Imeri",
//     phoneNumber: "Numero ya Telefone",
//     password: "Ijambo ry'Ibanga",
//     confirmPassword: "Emeza Ijambo ry'Ibanga",
//     createUser: "Kora Umukoresha",
//     updateUser: "Vugurura Umukoresha",
//     deleteUser: "Kuraho Umukoresha",
//     deleteConfirmation: "Uri kwizera ko ushaka gukuraho",
//     actionUndone: "Iki gikorwa ntikishobora guhindurwa.",
//     cancel: "Reka",
//     delete: "Kuraho",
//     creating: "Birakorwa...",
//     updating: "Biravugururwa...",
//     deleting: "Birakurwaho...",
//     userCreated: "Umukoresha yakozwe neza!",
//     userUpdated: "Umukoresha yavuguruwe neza!",
//     userDeleted: "Umukoresha yakuweho neza!",
//     usersDeleted: "abakoresha bakuvweho neza!",
//     createFailed: "Kora umukoresha birananiranye",
//     updateFailed: "Vugurura umukoresha birananiranye",
//     deleteFailed: "Kuraho umukoresha birananiranye",
//     nameRequired: "Izina ryose rirasabwa",
//     nameMin: "Izina rigomba kuba nibura inyuguti 2",
//     emailRequired: "Imeri irasabwa",
//     emailInvalid: "Injiza aderesi ya imeri ikwiye",
//     phoneRequired: "Numero ya telefone irasabwa",
//     phoneInvalid: "Injiza numero ya telefone ikwiye (ex: 0788123456 cyangwa +250788123456)",
//     passwordRequired: "Ijambo ry'ibanga rirasabwa",
//     passwordMin: "Ijambo ry'ibanga rigomba kuba nibura inyuguti 6",
//     confirmPasswordRequired: "Emeza ijambo ry'ibanga",
//     passwordsDoNotMatch: "Amagambo y'ibanga ntagahura",
//     passwordWeak: "Hitamo ijambo ry'ibanga rikomeye",
//     validEmail: "Aderesi ya imeri ikwiye",
//     validPhone: "Numero ya telefone ikwiye",
//     passwordsMatch: "Amagambo y'ibanga ahura",
//     strength: "Imbaraga",
//     weak: "Ntacyo",
//     moderate: "Rishoboka",
//     strong: "Rikomeye",
//     editPasswordNote: "Amagambo y'ibanga ntabwo ari ngombwa mugihe uhindura.",
//     viewUser: "Reba Umukoresha",
//   }
// };

// // Helper function to get language from cookies
// const getLanguageFromCookies = (): 'en' | 'fr' | 'rw' => {
//   const lang = Cookies.get('language') as 'en' | 'fr' | 'rw';
//   return lang || 'en';
// };

// // Helper function to get translations based on cookie language
// export const getTranslations = () => {
//   const lang = getLanguageFromCookies();
//   return translations[lang];
// };

// export const UserManagement: React.FC = () => {
//   // Get language from cookies
//   const [lang, setLang] = useState<'en' | 'fr' | 'rw'>(getLanguageFromCookies());
//   const [users, setUsers] = useState<User[]>([]);
//   const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterRole, setFilterRole] = useState<string>("all");
//   const [filterStatus, setFilterStatus] = useState<string>("all");
//   const [isLoading, setIsLoading] = useState(true);

//   // Modal states
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [, setIsDeleteModalOpen] = useState(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

//   // Status Modal state
//   const [statusModal, setStatusModal] = useState<{
//     isOpen: boolean;
//     type: "success" | "error" | "info" | "confirm";
//     title: string;
//     message: string;
//     details?: string;
//     onConfirm?: () => void;
//     confirmText?: string;
//     cancelText?: string;
//   }>({
//     isOpen: false,
//     type: "success",
//     title: "",
//     message: "",
//     details: "",
//   });

//   // Form states
//   const [formData, setFormData] = useState<UserFormData>({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     role: "user",
//     status: "active",
//   });

//   // Form validation states
//   const [errors, setErrors] = useState<{
//     name?: string;
//     email?: string;
//     phone?: string;
//     password?: string;
//     confirmPassword?: string;
//     role?: string;
//     status?: string;
//   }>({});

//   const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
//   const [isPhoneValid, setIsPhoneValid] = useState<boolean | null>(null);
//   const [passwordStrength, setPasswordStrength] = useState<
//     "weak" | "moderate" | "strong" | null
//   >(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Statistics
//   const [stats, setStats] = useState({
//     total: 0,
//     active: 0,
//     inactive: 0,
//     suspended: 0,
//     admins: 0,
//     hosts: 0,
//     users: 0,
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

//     const interval = setInterval(handleCookieChange, 1000);
//     return () => clearInterval(interval);
//   }, [lang]);

//   // Fetch users from API with data sanitization
//   const fetchUsers = async () => {
//     setIsLoading(true);
//     try {
//       const response = await API.get("/auth");
//       if (response.data.success) {
//         const userData = response.data.users || response.data.data || [];
        
//         // Sanitize user data to ensure required fields exist
//         const sanitizedUsers = userData.map((user: any) => ({
//           id: user.id || user._id || `user_${Math.random()}`,
//           name: user.name || user.fullName || "Unknown User",
//           email: user.email || "no-email@example.com",
//           phone: user.phone || user.phoneNumber || "N/A",
//           role: user.role || "user",
//           status: user.status || "active",
//           createdAt: user.createdAt || new Date().toISOString(),
//           updatedAt: user.updatedAt || new Date().toISOString(),
//         }));
        
//         setUsers(sanitizedUsers);
//         setFilteredUsers(sanitizedUsers);
//       } else {
//         showStatusModal("error", "Error", response.data.message || "Failed to fetch users");
//       }
//     } catch (error: any) {
//       console.error("Error fetching users:", error);
//       showStatusModal(
//         "error",
//         "Error",
//         error.response?.data?.message || "Failed to fetch users. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Load users on mount
//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Filter and search users
//   useEffect(() => {
//     let filtered = [...users];

//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       filtered = filtered.filter(
//         (user) =>
//           (user.name && user.name.toLowerCase().includes(term)) ||
//           (user.email && user.email.toLowerCase().includes(term)) ||
//           (user.phone && user.phone.includes(term)),
//       );
//     }

//     if (filterRole !== "all") {
//       filtered = filtered.filter((user) => user.role === filterRole);
//     }

//     if (filterStatus !== "all") {
//       filtered = filtered.filter((user) => user.status === filterStatus);
//     }

//     setFilteredUsers(filtered);
//   }, [users, searchTerm, filterRole, filterStatus]);

//   // Update statistics
//   useEffect(() => {
//     const total = users.length;
//     const active = users.filter((u) => u.status === "active").length;
//     const inactive = users.filter((u) => u.status === "inactive").length;
//     const suspended = users.filter((u) => u.status === "suspended").length;
//     const admins = users.filter((u) => u.role === "admin").length;
//     const hosts = users.filter((u) => u.role === "host").length;
//     const userCount = users.filter((u) => u.role === "user").length;

//     setStats({ total, active, inactive, suspended, admins, hosts, users: userCount });
//   }, [users]);

//   // Show status modal
//   const showStatusModal = (
//     type: "success" | "error" | "info" | "confirm",
//     title: string,
//     message: string,
//     details?: string,
//     onConfirm?: () => void,
//     confirmText?: string,
//     cancelText?: string
//   ) => {
//     setStatusModal({
//       isOpen: true,
//       type,
//       title,
//       message,
//       details,
//       onConfirm,
//       confirmText,
//       cancelText,
//     });
//   };

//   // Close status modal
//   const closeStatusModal = () => {
//     setStatusModal((prev) => ({ ...prev, isOpen: false }));
//   };

//   // Validation functions
//   const validateEmail = (email: string): boolean => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const validatePhone = (phone: string): boolean => {
//     const phoneRegex = /^(?:\+250|0)?[7-9][0-9]{8}$/;
//     return phoneRegex.test(phone.replace(/\s/g, ""));
//   };

//   const checkPasswordStrength = (
//     password: string,
//   ): "weak" | "moderate" | "strong" | null => {
//     if (!password || password.length === 0) return null;

//     let score = 0;
//     if (password.length >= 8) score++;
//     if (password.length >= 12) score++;
//     if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
//     if (/\d/.test(password)) score++;
//     if (/[^a-zA-Z0-9]/.test(password)) score++;

//     if (score <= 2) return "weak";
//     if (score <= 4) return "moderate";
//     return "strong";
//   };

//   const getPasswordStrengthColor = (
//     strength: "weak" | "moderate" | "strong" | null,
//   ): string => {
//     if (!strength) return "#e5e7eb";
//     switch (strength) {
//       case "weak":
//         return "#ef4444";
//       case "moderate":
//         return "#f59e0b";
//       case "strong":
//         return "#22c55e";
//     }
//   };

//   const getPasswordStrengthLabel = (
//     strength: "weak" | "moderate" | "strong" | null,
//   ): string => {
//     if (!strength) return "";
//     switch (strength) {
//       case "weak":
//         return t.weak;
//       case "moderate":
//         return t.moderate;
//       case "strong":
//         return t.strong;
//     }
//   };

//   const getPasswordStrengthIcon = (
//     strength: "weak" | "moderate" | "strong" | null,
//   ) => {
//     if (!strength) return null;
//     switch (strength) {
//       case "weak":
//         return <WarningIcon className="w-4 h-4" style={{ color: "#ef4444" }} />;
//       case "moderate":
//         return (
//           <SecurityIcon className="w-4 h-4" style={{ color: "#f59e0b" }} />
//         );
//       case "strong":
//         return (
//           <VerifiedIcon className="w-4 h-4" style={{ color: "#22c55e" }} />
//         );
//     }
//   };

//   const validateForm = (): boolean => {
//     const newErrors: {
//       name?: string;
//       email?: string;
//       phone?: string;
//       password?: string;
//       confirmPassword?: string;
//       role?: string;
//       status?: string;
//     } = {};

//     if (!formData.name) {
//       newErrors.name = t.nameRequired;
//     } else if (formData.name.length < 2) {
//       newErrors.name = t.nameMin;
//     }

//     if (!formData.email) {
//       newErrors.email = t.emailRequired;
//     } else if (!validateEmail(formData.email)) {
//       newErrors.email = t.emailInvalid;
//     }

//     if (!formData.phone) {
//       newErrors.phone = t.phoneRequired;
//     } else if (!validatePhone(formData.phone)) {
//       newErrors.phone = t.phoneInvalid;
//     }

//     // Only validate password for create mode
//     if (!selectedUser) {
//       if (!formData.password) {
//         newErrors.password = t.passwordRequired;
//       } else if (formData.password.length < 6) {
//         newErrors.password = t.passwordMin;
//       }

//       if (!formData.confirmPassword) {
//         newErrors.confirmPassword = t.confirmPasswordRequired;
//       } else if (formData.password !== formData.confirmPassword) {
//         newErrors.confirmPassword = t.passwordsDoNotMatch;
//       }

//       if (passwordStrength === "weak") {
//         newErrors.password = t.passwordWeak;
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const isFormValid = (): boolean => {
//     if (selectedUser) {
//       // Edit mode - only validate basic fields
//       return (
//         formData.name.length >= 2 &&
//         formData.email.length > 0 &&
//         validateEmail(formData.email) &&
//         formData.phone.length > 0 &&
//         validatePhone(formData.phone)
//       );
//     } else {
//       // Create mode - validate all fields
//       return (
//         formData.name.length >= 2 &&
//         formData.email.length > 0 &&
//         validateEmail(formData.email) &&
//         formData.phone.length > 0 &&
//         validatePhone(formData.phone) &&
//         formData.password.length >= 6 &&
//         formData.confirmPassword.length >= 6 &&
//         formData.password === formData.confirmPassword &&
//         passwordStrength !== null &&
//         passwordStrength !== "weak"
//       );
//     }
//   };

//   // CRUD Operations with API integration
//   const handleCreateUser = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsSubmitting(true);

//     try {
//       const response = await API.post("/auth/register", {
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         password: formData.password,
//         confirmPassword: formData.confirmPassword,
//         role: formData.role,
       
//       });

//       if (response.data.success) {
//         showStatusModal(
//           "success",
//           "✅ " + t.userCreated,
//           t.userCreated,
//           `Name: ${formData.name}\nEmail: ${formData.email}`
//         );
//         await fetchUsers();
//         resetForm();
//         setIsCreateModalOpen(false);
//       } else {
//         showStatusModal(
//           "error",
//           "❌ " + t.createFailed,
//           response.data.message || t.createFailed
//         );
//       }
//     } catch (error: any) {
//       console.error("Create user error:", error);
//       showStatusModal(
//         "error",
//         "❌ " + t.createFailed,
//         error.response?.data?.message || t.createFailed
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleEditUser = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateForm() || !selectedUser) return;

//     setIsSubmitting(true);

//     try {
//       const updateData: any = {
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         role: formData.role,
//         status: formData.status,
//       };

//       // Only include password if provided
//       if (formData.password) {
//         updateData.password = formData.password;
//         updateData.confirmPassword = formData.confirmPassword;
//       }

//       const response = await API.put(`/auth/${selectedUser.id}`, updateData);

//       if (response.data.success) {
//         showStatusModal(
//           "success",
//           "✅ " + t.userUpdated,
//           t.userUpdated,
//           `Name: ${formData.name}\nEmail: ${formData.email}`
//         );
//         await fetchUsers();
//         resetForm();
//         setIsEditModalOpen(false);
//         setSelectedUser(null);
//       } else {
//         showStatusModal(
//           "error",
//           "❌ " + t.updateFailed,
//           response.data.message || t.updateFailed
//         );
//       }
//     } catch (error: any) {
//       console.error("Update user error:", error);
//       showStatusModal(
//         "error",
//         "❌ " + t.updateFailed,
//         error.response?.data?.message || t.updateFailed
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDeleteUser = async () => {
//     if (!selectedUser) return;

//     try {
//       const response = await API.delete(`/auth/${selectedUser.id}`);

//       if (response.data.success) {
//         showStatusModal(
//           "success",
//           "🗑️ " + t.userDeleted,
//           t.userDeleted,
//           `User: ${selectedUser.name}`
//         );
//         await fetchUsers();
//         setIsDeleteModalOpen(false);
//         setSelectedUser(null);
//       } else {
//         showStatusModal(
//           "error",
//           "❌ " + t.deleteFailed,
//           response.data.message || t.deleteFailed
//         );
//       }
//     } catch (error: any) {
//       console.error("Delete user error:", error);
//       showStatusModal(
//         "error",
//         "❌ " + t.deleteFailed,
//         error.response?.data?.message || t.deleteFailed
//       );
//     }
//   };

//   const handleBulkDelete = async () => {
//     if (selectedUsers.length === 0) {
//       showStatusModal("info", "Info", "Please select users to delete");
//       return;
//     }

//     showStatusModal(
//       "confirm",
//       "⚠️ Confirm Bulk Delete",
//       `Are you sure you want to delete ${selectedUsers.length} users?`,
//       "This action cannot be undone.",
//       async () => {
//         setIsSubmitting(true);
//         try {
//           const response = await API.delete("/auth/bulk", {
//             data: { userIds: selectedUsers },
//           });

//           if (response.data.success) {
//             showStatusModal(
//               "success",
//               "🗑️ " + selectedUsers.length + " " + t.usersDeleted,
//               selectedUsers.length + " " + t.usersDeleted
//             );
//             await fetchUsers();
//             setSelectedUsers([]);
//           } else {
//             showStatusModal(
//               "error",
//               "❌ " + t.deleteFailed,
//               response.data.message || t.deleteFailed
//             );
//           }
//         } catch (error: any) {
//           console.error("Bulk delete error:", error);
//           showStatusModal(
//             "error",
//             "❌ " + t.deleteFailed,
//             error.response?.data?.message || t.deleteFailed
//           );
//         } finally {
//           setIsSubmitting(false);
//           closeStatusModal();
//         }
//       },
//       t.delete,
//       t.cancel
//     );
//   };

//   // Reset form
//   const resetForm = () => {
//     setFormData({
//       name: "",
//       email: "",
//       phone: "",
//       password: "",
//       confirmPassword: "",
//       role: "user",
//       status: "active",
//     });
//     setErrors({});
//     setIsEmailValid(null);
//     setIsPhoneValid(null);
//     setPasswordStrength(null);
//     setShowPassword(false);
//     setShowConfirmPassword(false);
//   };

//   // Open edit modal with user data
//   const openEditModal = (user: User) => {
//     setSelectedUser(user);
//     setFormData({
//       name: user.name || "",
//       email: user.email || "",
//       phone: user.phone || "",
//       password: "",
//       confirmPassword: "",
//       role: user.role || "user",
//       status: user.status || "active",
//     });
//     setIsEmailValid(user.email ? validateEmail(user.email) : null);
//     setIsPhoneValid(user.phone ? validatePhone(user.phone) : null);
//     setIsEditModalOpen(true);
//   };

//   // Open view modal
//   const openViewModal = (user: User) => {
//     setSelectedUser(user);
//     setIsViewModalOpen(true);
//   };

//   // Open delete confirmation
//   const openDeleteModal = (user: User) => {
//     setSelectedUser(user);
//     showStatusModal(
//       "confirm",
//       "⚠️ " + t.deleteUser,
//       `${t.deleteConfirmation} "${user.name || 'Unknown User'}"?`,
//       t.actionUndone,
//       handleDeleteUser,
//       t.delete,
//       t.cancel
//     );
//   };

//   // Handle form field changes
//   const handleInputChange = (field: keyof UserFormData, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));

//     // Clear errors for this field
//     if (errors[field as keyof typeof errors]) {
//       setErrors((prev) => ({ ...prev, [field]: undefined }));
//     }

//     // Email validation
//     if (field === "email") {
//       if (value.length > 0) {
//         setIsEmailValid(validateEmail(value));
//       } else {
//         setIsEmailValid(null);
//       }
//     }

//     // Phone validation
//     if (field === "phone") {
//       if (value.length > 0) {
//         setIsPhoneValid(validatePhone(value));
//       } else {
//         setIsPhoneValid(null);
//       }
//     }

//     // Password strength check
//     if (field === "password") {
//       const strength = checkPasswordStrength(value);
//       setPasswordStrength(strength);

//       if (formData.confirmPassword && value !== formData.confirmPassword) {
//         setErrors((prev) => ({
//           ...prev,
//           confirmPassword: t.passwordsDoNotMatch,
//         }));
//       } else if (
//         formData.confirmPassword &&
//         value === formData.confirmPassword
//       ) {
//         setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
//       }
//     }

//     // Confirm password check
//     if (field === "confirmPassword") {
//       if (formData.password && formData.password !== value) {
//         setErrors((prev) => ({
//           ...prev,
//           confirmPassword: t.passwordsDoNotMatch,
//         }));
//       } else if (formData.password && formData.password === value) {
//         setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
//       }
//     }
//   };

//   // Toggle user selection for bulk actions
//   const toggleUserSelection = (userId: string) => {
//     setSelectedUsers((prev) =>
//       prev.includes(userId)
//         ? prev.filter((id) => id !== userId)
//         : [...prev, userId],
//     );
//   };

//   // Toggle select all
//   const toggleSelectAll = () => {
//     if (selectedUsers.length === filteredUsers.length) {
//       setSelectedUsers([]);
//     } else {
//       setSelectedUsers(filteredUsers.map((user) => user.id));
//     }
//   };

//   // Get role badge color
//   const getRoleColor = (role: string): string => {
//     switch (role) {
//       case "admin":
//         return "bg-purple-100 text-purple-800";
//       case "host":
//         return "bg-blue-100 text-blue-800";
//       default:
//         return "bg-green-100 text-green-800";
//     }
//   };

//   // Get status badge color
//   const getStatusColor = (status: string): string => {
//     switch (status) {
//       case "active":
//         return "bg-green-100 text-green-800";
//       case "inactive":
//         return "bg-yellow-100 text-yellow-800";
//       case "suspended":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
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

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Status Modal */}
//       <StatusModal
//         isOpen={statusModal.isOpen}
//         onClose={closeStatusModal}
//         type={statusModal.type}
//         title={statusModal.title}
//         message={statusModal.message}
//         details={statusModal.details}
//         onConfirm={statusModal.onConfirm}
//         confirmText={statusModal.confirmText}
//         cancelText={statusModal.cancelText}
//       />

//       {/* View User Modal */}
//       <ViewUserModal
//         isOpen={isViewModalOpen}
//         onClose={() => {
//           setIsViewModalOpen(false);
//           setSelectedUser(null);
//         }}
//         user={selectedUser}
//       />

//       {/* Header */}
//       <div className="mb-6">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//               <PersonIcon className="w-7 h-7 text-[#FF385C]" />
//               {t.userManagement}
//             </h1>
//             <p className="text-sm text-gray-500 mt-1">
//               {t.manageUsers}
//             </p>
//           </div>
//           <div className="flex items-center gap-2">
//             {selectedUsers.length > 0 && (
//               <motion.button
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 onClick={handleBulkDelete}
//                 disabled={isSubmitting}
//                 className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <DeleteIcon className="w-4 h-4" />
//                 {t.delete} ({selectedUsers.length})
//               </motion.button>
//             )}
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => {
//                 resetForm();
//                 setIsCreateModalOpen(true);
//               }}
//               className="px-4 py-2 bg-[#FF385C] text-white rounded-lg text-sm font-medium hover:bg-[#E31C5F] transition-colors flex items-center gap-2"
//             >
//               <AddIcon className="w-4 h-4" />
//               {t.addUser}
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={fetchUsers}
//               disabled={isLoading}
//               className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2 disabled:opacity-50"
//             >
//               <RefreshIcon className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
//             </motion.button>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
//         <motion.div
//           whileHover={{ y: -2 }}
//           className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
//         >
//           <p className="text-xs text-gray-500">{t.total}</p>
//           <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
//         </motion.div>
//         <motion.div
//           whileHover={{ y: -2 }}
//           className="bg-green-50 rounded-xl p-4 shadow-sm border border-green-200"
//         >
//           <p className="text-xs text-green-600">{t.active}</p>
//           <p className="text-2xl font-bold text-green-700">{stats.active}</p>
//         </motion.div>
//         <motion.div
//           whileHover={{ y: -2 }}
//           className="bg-yellow-50 rounded-xl p-4 shadow-sm border border-yellow-200"
//         >
//           <p className="text-xs text-yellow-600">{t.inactive}</p>
//           <p className="text-2xl font-bold text-yellow-700">{stats.inactive}</p>
//         </motion.div>
//         <motion.div
//           whileHover={{ y: -2 }}
//           className="bg-red-50 rounded-xl p-4 shadow-sm border border-red-200"
//         >
//           <p className="text-xs text-red-600">{t.suspended}</p>
//           <p className="text-2xl font-bold text-red-700">{stats.suspended}</p>
//         </motion.div>
//         <motion.div
//           whileHover={{ y: -2 }}
//           className="bg-purple-50 rounded-xl p-4 shadow-sm border border-purple-200"
//         >
//           <p className="text-xs text-purple-600">{t.admins}</p>
//           <p className="text-2xl font-bold text-purple-700">{stats.admins}</p>
//         </motion.div>
//         <motion.div
//           whileHover={{ y: -2 }}
//           className="bg-blue-50 rounded-xl p-4 shadow-sm border border-blue-200"
//         >
//           <p className="text-xs text-blue-600">{t.hosts}</p>
//           <p className="text-2xl font-bold text-blue-700">{stats.hosts}</p>
//         </motion.div>
//         <motion.div
//           whileHover={{ y: -2 }}
//           className="bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-200"
//         >
//           <p className="text-xs text-gray-500">{t.users}</p>
//           <p className="text-2xl font-bold text-gray-900">{stats.users}</p>
//         </motion.div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
//         <div className="flex flex-col sm:flex-row gap-3">
//           <div className="flex-1 relative">
//             <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder={t.searchUsers}
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
//             />
//           </div>
//           <div className="flex gap-2">
//             <select
//               value={filterRole}
//               onChange={(e) => setFilterRole(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//             >
//               <option value="all">{t.allRoles}</option>
//               <option value="admin">{t.admins}</option>
//               <option value="host">{t.hosts}</option>
//               <option value="user">{t.users}</option>
//             </select>
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//             >
//               <option value="all">{t.allStatus}</option>
//               <option value="active">{t.active}</option>
//               <option value="inactive">{t.inactive}</option>
//               <option value="suspended">{t.suspended}</option>
//             </select>
//             <button
//               onClick={() => {
//                 setSearchTerm("");
//                 setFilterRole("all");
//                 setFilterStatus("all");
//               }}
//               className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               <RefreshIcon className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Users Table */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         {isLoading ? (
//           <div className="flex items-center justify-center py-12">
//             <svg
//               className="animate-spin h-8 w-8 text-[#FF385C]"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//               />
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//               />
//             </svg>
//             <span className="ml-3 text-gray-500">Loading users...</span>
//           </div>
//         ) : (
//           <>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50 border-b border-gray-200">
//                   <tr>
//                     <th className="px-4 py-3 text-left">
//                       <input
//                         type="checkbox"
//                         checked={
//                           filteredUsers.length > 0 &&
//                           selectedUsers.length === filteredUsers.length
//                         }
//                         onChange={toggleSelectAll}
//                         className="rounded border-gray-300 text-[#FF385C] focus:ring-[#FF385C]"
//                       />
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       {t.user}
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
//                       {t.contact}
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       {t.role}
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       {t.status}
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
//                       {t.joined}
//                     </th>
//                     <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       {t.actions}
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {filteredUsers.length === 0 ? (
//                     <tr>
//                       <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
//                         <PersonIcon className="w-12 h-12 mx-auto text-gray-300 mb-2" />
//                         <p>{t.noUsers}</p>
//                         <p className="text-sm">{t.adjustFilters}</p>
//                       </td>
//                     </tr>
//                   ) : (
//                     filteredUsers.map((user) => (
//                       <motion.tr
//                         key={user.id}
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         className="hover:bg-gray-50 transition-colors"
//                       >
//                         <td className="px-4 py-3">
//                           <input
//                             type="checkbox"
//                             checked={selectedUsers.includes(user.id)}
//                             onChange={() => toggleUserSelection(user.id)}
//                             className="rounded border-gray-300 text-[#FF385C] focus:ring-[#FF385C]"
//                           />
//                         </td>
//                         <td className="px-4 py-3">
//                           <div className="flex items-center gap-3">
//                             <div className="w-10 h-10 rounded-full bg-[#FF385C] text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
//                               {safeUserHelpers.getInitial(user)}
//                             </div>
//                             <div>
//                               <p className="font-medium text-gray-900 text-sm">
//                                 {safeUserHelpers.getDisplayName(user)}
//                               </p>
//                               <p className="text-xs text-gray-500 md:hidden">
//                                 {safeUserHelpers.getDisplayEmail(user)}
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-4 py-3 hidden md:table-cell">
//                           <p className="text-sm text-gray-600">{safeUserHelpers.getDisplayEmail(user)}</p>
//                           <p className="text-xs text-gray-400">{safeUserHelpers.getDisplayPhone(user)}</p>
//                         </td>
//                         <td className="px-4 py-3">
//                           <span
//                             className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(
//                               safeUserHelpers.getDisplayRole(user),
//                             )}`}
//                           >
//                             {safeUserHelpers.formatRole(user)}
//                           </span>
//                         </td>
//                         <td className="px-4 py-3">
//                           <span
//                             className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
//                               safeUserHelpers.getDisplayStatus(user),
//                             )}`}
//                           >
//                             {safeUserHelpers.formatStatus(user)}
//                           </span>
//                         </td>
//                         <td className="px-4 py-3 hidden lg:table-cell">
//                           <p className="text-sm text-gray-600">
//                             {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", {
//                               year: "numeric",
//                               month: "short",
//                               day: "numeric",
//                             }) : "N/A"}
//                           </p>
//                         </td>
//                         <td className="px-4 py-3">
//                           <div className="flex items-center justify-center gap-1">
//                             <motion.button
//                               whileHover={{ scale: 1.1 }}
//                               whileTap={{ scale: 0.9 }}
//                               onClick={() => openViewModal(user)}
//                               className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//                               title={t.viewUser}
//                             >
//                               <ViewAgenda className="w-4 h-4" />
//                             </motion.button>
//                             <motion.button
//                               whileHover={{ scale: 1.1 }}
//                               whileTap={{ scale: 0.9 }}
//                               onClick={() => openEditModal(user)}
//                               className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                               title={t.editUser}
//                             >
//                               <EditIcon className="w-4 h-4" />
//                             </motion.button>
//                             <motion.button
//                               whileHover={{ scale: 1.1 }}
//                               whileTap={{ scale: 0.9 }}
//                               onClick={() => openDeleteModal(user)}
//                               className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                               title={t.deleteUser}
//                             >
//                               <DeleteIcon className="w-4 h-4" />
//                             </motion.button>
//                           </div>
//                         </td>
//                       </motion.tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//             <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
//               <p className="text-sm text-gray-500">
//                 {t.showing} {filteredUsers.length} {t.of} {users.length} {t.usersCount}
//               </p>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Create User Modal */}
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
//               <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
//                 <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
//                   <div className="flex items-center gap-2">
//                     <PersonAddIcon className="text-[#FF385C] w-5 h-5" />
//                     <h2 className="text-xl font-semibold text-gray-900">
//                       {t.addNewUser}
//                     </h2>
//                   </div>
//                   <motion.button
//                     whileHover={{ rotate: 90, scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => {
//                       setIsCreateModalOpen(false);
//                       resetForm();
//                     }}
//                     className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
//                   >
//                     <CloseIcon className="w-5 h-5" />
//                   </motion.button>
//                 </div>

//                 <form onSubmit={handleCreateUser} className="p-6">
//                   {/* Name */}
//                   <div className="mb-4">
//                     <label className="block text-sm font-medium mb-1.5 text-gray-700">
//                       {t.fullName} *
//                     </label>
//                     <div
//                       className={`relative rounded-lg border ${
//                         errors.name ? "border-red-500" : "border-gray-300"
//                       } bg-white focus-within:border-[#FF385C] transition-colors`}
//                     >
//                       <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                       <input
//                         type="text"
//                         value={formData.name}
//                         onChange={(e) =>
//                           handleInputChange("name", e.target.value)
//                         }
//                         className={`w-full pl-10 pr-3 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400 ${
//                           formData.name.length >= 2 && !errors.name ? "border-green-500" : ""
//                         }`}
//                         placeholder="John Doe"
//                       />
//                       {formData.name.length >= 2 && !errors.name && (
//                         <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
//                       )}
//                     </div>
//                     {errors.name && (
//                       <p className="text-xs text-red-500 mt-1">{errors.name}</p>
//                     )}
//                     {formData.name.length >= 2 && !errors.name && (
//                       <p className="text-xs text-green-500 mt-1">✓ Valid name</p>
//                     )}
//                   </div>

//                   {/* Email */}
//                   <div className="mb-4">
//                     <label className="block text-sm font-medium mb-1.5 text-gray-700">
//                       {t.email} *
//                     </label>
//                     <div
//                       className={`relative rounded-lg border ${
//                         isEmailValid === true
//                           ? "border-green-500"
//                           : isEmailValid === false
//                           ? "border-red-500"
//                           : errors.email
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       } bg-white focus-within:border-[#FF385C] transition-colors`}
//                     >
//                       <EmailIcon
//                         className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
//                           isEmailValid === true
//                             ? "text-green-500"
//                             : isEmailValid === false
//                             ? "text-red-500"
//                             : "text-gray-400"
//                         }`}
//                       />
//                       <input
//                         type="email"
//                         value={formData.email}
//                         onChange={(e) =>
//                           handleInputChange("email", e.target.value)
//                         }
//                         className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
//                         placeholder="you@example.com"
//                       />
//                       {isEmailValid === true && (
//                         <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
//                       )}
//                       {isEmailValid === false && (
//                         <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
//                       )}
//                     </div>
//                     {errors.email && (
//                       <p className="text-xs text-red-500 mt-1">
//                         {errors.email}
//                       </p>
//                     )}
//                     {isEmailValid === true && (
//                       <p className="text-xs text-green-500 mt-1">
//                         ✓ {t.validEmail}
//                       </p>
//                     )}
//                   </div>

//                   {/* Phone */}
//                   <div className="mb-4">
//                     <label className="block text-sm font-medium mb-1.5 text-gray-700">
//                       {t.phoneNumber} *
//                     </label>
//                     <div
//                       className={`relative rounded-lg border ${
//                         isPhoneValid === true
//                           ? "border-green-500"
//                           : isPhoneValid === false
//                           ? "border-red-500"
//                           : errors.phone
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       } bg-white focus-within:border-[#FF385C] transition-colors`}
//                     >
//                       <PhoneIcon
//                         className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
//                           isPhoneValid === true
//                             ? "text-green-500"
//                             : isPhoneValid === false
//                             ? "text-red-500"
//                             : "text-gray-400"
//                         }`}
//                       />
//                       <input
//                         type="tel"
//                         value={formData.phone}
//                         onChange={(e) =>
//                           handleInputChange("phone", e.target.value)
//                         }
//                         className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
//                         placeholder="0788123456 or +250788123456"
//                       />
//                       {isPhoneValid === true && (
//                         <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
//                       )}
//                       {isPhoneValid === false && (
//                         <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
//                       )}
//                     </div>
//                     {errors.phone && (
//                       <p className="text-xs text-red-500 mt-1">
//                         {errors.phone}
//                       </p>
//                     )}
//                     {isPhoneValid === true && (
//                       <p className="text-xs text-green-500 mt-1">
//                         ✓ {t.validPhone}
//                       </p>
//                     )}
//                   </div>

//                   {/* Password */}
//                   <div className="mb-4">
//                     <label className="block text-sm font-medium mb-1.5 text-gray-700">
//                       {t.password} *
//                     </label>
//                     <div
//                       className={`relative rounded-lg border ${
//                         errors.password ? "border-red-500" : 
//                         formData.password.length >= 6 && passwordStrength !== "weak" && passwordStrength !== null
//                           ? "border-green-500"
//                           : "border-gray-300"
//                       } bg-white focus-within:border-[#FF385C] transition-colors`}
//                     >
//                       <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                       <input
//                         type={showPassword ? "text" : "password"}
//                         value={formData.password}
//                         onChange={(e) =>
//                           handleInputChange("password", e.target.value)
//                         }
//                         className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
//                         placeholder="••••••••"
//                         minLength={6}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                       >
//                         {showPassword ? (
//                           <VisibilityOffIcon className="w-5 h-5" />
//                         ) : (
//                           <VisibilityIcon className="w-5 h-5" />
//                         )}
//                       </button>
//                       {formData.password.length >= 6 && passwordStrength !== "weak" && passwordStrength !== null && (
//                         <CheckCircleIcon className="absolute right-12 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
//                       )}
//                     </div>
//                     {errors.password && (
//                       <p className="text-xs text-red-500 mt-1">
//                         {errors.password}
//                       </p>
//                     )}

//                     {passwordStrength && (
//                       <div className="mt-2">
//                         <div className="flex items-center gap-2">
//                           <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
//                             <motion.div
//                               className="h-full rounded-full transition-all duration-500"
//                               style={{
//                                 width:
//                                   passwordStrength === "weak"
//                                     ? "33%"
//                                     : passwordStrength === "moderate"
//                                     ? "66%"
//                                     : "100%",
//                                 backgroundColor:
//                                   getPasswordStrengthColor(passwordStrength),
//                               }}
//                               initial={{ width: 0 }}
//                               animate={{
//                                 width:
//                                   passwordStrength === "weak"
//                                     ? "33%"
//                                     : passwordStrength === "moderate"
//                                     ? "66%"
//                                     : "100%",
//                               }}
//                             />
//                           </div>
//                           <div
//                             className="flex items-center gap-1 text-xs font-medium"
//                             style={{
//                               color: getPasswordStrengthColor(passwordStrength),
//                             }}
//                           >
//                             {getPasswordStrengthIcon(passwordStrength)}
//                             <span>
//                               {t.strength}: {getPasswordStrengthLabel(passwordStrength)}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   {/* Confirm Password */}
//                   <div className="mb-4">
//                     <label className="block text-sm font-medium mb-1.5 text-gray-700">
//                       {t.confirmPassword} *
//                     </label>
//                     <div
//                       className={`relative rounded-lg border ${
//                         errors.confirmPassword
//                           ? "border-red-500"
//                           : formData.confirmPassword &&
//                             formData.password === formData.confirmPassword &&
//                             formData.confirmPassword.length > 0
//                           ? "border-green-500"
//                           : "border-gray-300"
//                       } bg-white focus-within:border-[#FF385C] transition-colors`}
//                     >
//                       <LockIcon
//                         className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
//                           formData.confirmPassword &&
//                           formData.password === formData.confirmPassword &&
//                           formData.confirmPassword.length > 0
//                             ? "text-green-500"
//                             : "text-gray-400"
//                         }`}
//                       />
//                       <input
//                         type={showConfirmPassword ? "text" : "password"}
//                         value={formData.confirmPassword}
//                         onChange={(e) =>
//                           handleInputChange("confirmPassword", e.target.value)
//                         }
//                         className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
//                         placeholder="••••••••"
//                         minLength={6}
//                       />
//                       <button
//                         type="button"
//                         onClick={() =>
//                           setShowConfirmPassword(!showConfirmPassword)
//                         }
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                       >
//                         {showConfirmPassword ? (
//                           <VisibilityOffIcon className="w-5 h-5" />
//                         ) : (
//                           <VisibilityIcon className="w-5 h-5" />
//                         )}
//                       </button>
//                       {formData.confirmPassword &&
//                         formData.password === formData.confirmPassword &&
//                         formData.confirmPassword.length > 0 && (
//                           <CheckCircleIcon className="absolute right-12 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
//                         )}
//                     </div>
//                     {errors.confirmPassword && (
//                       <p className="text-xs text-red-500 mt-1">
//                         {errors.confirmPassword}
//                       </p>
//                     )}
//                     {formData.confirmPassword &&
//                       formData.password === formData.confirmPassword &&
//                       formData.confirmPassword.length > 0 && (
//                         <p className="text-xs text-green-500 mt-1">
//                           ✓ {t.passwordsMatch}
//                         </p>
//                       )}
//                   </div>

//                   {/* Role & Status Row */}
//                   <div className="grid grid-cols-2 gap-4 mb-4">
//                     <div>
//                       <label className="block text-sm font-medium mb-1.5 text-gray-700">
//                         {t.role} *
//                       </label>
//                       <select
//                         value={formData.role}
//                         onChange={(e) =>
//                           handleInputChange(
//                             "role",
//                             e.target.value as UserFormData["role"],
//                           )
//                         }
//                         className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//                       >
//                         <option value="user">{t.users}</option>
//                         <option value="host">{t.hosts}</option>
//                         <option value="admin">{t.admins}</option>
//                       </select>
//                       {errors.role && (
//                         <p className="text-xs text-red-500 mt-1">
//                           {errors.role}
//                         </p>
//                       )}
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-1.5 text-gray-700">
//                         {t.status} *
//                       </label>
//                       <select
//                         value={formData.status}
//                         onChange={(e) =>
//                           handleInputChange(
//                             "status",
//                             e.target.value as UserFormData["status"],
//                           )
//                         }
//                         className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//                       >
//                         <option value="active">{t.active}</option>
//                         <option value="inactive">{t.inactive}</option>
//                         <option value="suspended">{t.suspended}</option>
//                       </select>
//                       {errors.status && (
//                         <p className="text-xs text-red-500 mt-1">
//                           {errors.status}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     type="submit"
//                     disabled={isSubmitting || !isFormValid()}
//                     className={`w-full py-3 rounded-lg font-medium relative overflow-hidden group transition-colors ${
//                       isSubmitting || !isFormValid()
//                         ? "bg-gray-400 cursor-not-allowed"
//                         : "bg-[#FF385C] hover:bg-[#E31C5F]"
//                     } text-white`}
//                   >
//                     <span className="relative z-10 flex items-center justify-center gap-2">
//                       {isSubmitting ? (
//                         <>
//                           <svg
//                             className="animate-spin h-5 w-5 text-white"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                           >
//                             <circle
//                               className="opacity-25"
//                               cx="12"
//                               cy="12"
//                               r="10"
//                               stroke="currentColor"
//                               strokeWidth="4"
//                             />
//                             <path
//                               className="opacity-75"
//                               fill="currentColor"
//                               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                             />
//                           </svg>
//                           {t.creating}
//                         </>
//                       ) : (
//                         <>
//                           <PersonAddIcon className="w-5 h-5" />
//                           {t.createUser}
//                         </>
//                       )}
//                     </span>
//                   </motion.button>
//                 </form>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Edit User Modal */}
//       <AnimatePresence>
//         {isEditModalOpen && (
//           <>
//             <motion.div
//               variants={overlayVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
//               onClick={() => {
//                 setIsEditModalOpen(false);
//                 resetForm();
//                 setSelectedUser(null);
//               }}
//             />
//             <motion.div
//               variants={modalVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed inset-0 z-[101] flex items-center justify-center p-4"
//             >
//               <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
//                 <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
//                   <div className="flex items-center gap-2">
//                     <EditIcon className="text-[#FF385C] w-5 h-5" />
//                     <h2 className="text-xl font-semibold text-gray-900">
//                       {t.editUser}
//                     </h2>
//                   </div>
//                   <motion.button
//                     whileHover={{ rotate: 90, scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => {
//                       setIsEditModalOpen(false);
//                       resetForm();
//                       setSelectedUser(null);
//                     }}
//                     className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
//                   >
//                     <CloseIcon className="w-5 h-5" />
//                   </motion.button>
//                 </div>

//                 <form onSubmit={handleEditUser} className="p-6">
//                   {/* Name */}
//                   <div className="mb-4">
//                     <label className="block text-sm font-medium mb-1.5 text-gray-700">
//                       {t.fullName} *
//                     </label>
//                     <div
//                       className={`relative rounded-lg border ${
//                         errors.name ? "border-red-500" : "border-gray-300"
//                       } bg-white focus-within:border-[#FF385C] transition-colors`}
//                     >
//                       <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                       <input
//                         type="text"
//                         value={formData.name}
//                         onChange={(e) =>
//                           handleInputChange("name", e.target.value)
//                         }
//                         className={`w-full pl-10 pr-3 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400 ${
//                           formData.name.length >= 2 && !errors.name ? "border-green-500" : ""
//                         }`}
//                         placeholder="John Doe"
//                       />
//                       {formData.name.length >= 2 && !errors.name && (
//                         <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
//                       )}
//                     </div>
//                     {errors.name && (
//                       <p className="text-xs text-red-500 mt-1">{errors.name}</p>
//                     )}
//                     {formData.name.length >= 2 && !errors.name && (
//                       <p className="text-xs text-green-500 mt-1">✓ Valid name</p>
//                     )}
//                   </div>

//                   {/* Email */}
//                   <div className="mb-4">
//                     <label className="block text-sm font-medium mb-1.5 text-gray-700">
//                       {t.email} *
//                     </label>
//                     <div
//                       className={`relative rounded-lg border ${
//                         isEmailValid === true
//                           ? "border-green-500"
//                           : isEmailValid === false
//                           ? "border-red-500"
//                           : errors.email
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       } bg-white focus-within:border-[#FF385C] transition-colors`}
//                     >
//                       <EmailIcon
//                         className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
//                           isEmailValid === true
//                             ? "text-green-500"
//                             : isEmailValid === false
//                             ? "text-red-500"
//                             : "text-gray-400"
//                         }`}
//                       />
//                       <input
//                         type="email"
//                         value={formData.email}
//                         onChange={(e) =>
//                           handleInputChange("email", e.target.value)
//                         }
//                         className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
//                         placeholder="you@example.com"
//                       />
//                       {isEmailValid === true && (
//                         <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
//                       )}
//                       {isEmailValid === false && (
//                         <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
//                       )}
//                     </div>
//                     {errors.email && (
//                       <p className="text-xs text-red-500 mt-1">
//                         {errors.email}
//                       </p>
//                     )}
//                     {isEmailValid === true && (
//                       <p className="text-xs text-green-500 mt-1">
//                         ✓ {t.validEmail}
//                       </p>
//                     )}
//                   </div>

//                   {/* Phone */}
//                   <div className="mb-4">
//                     <label className="block text-sm font-medium mb-1.5 text-gray-700">
//                       {t.phoneNumber} *
//                     </label>
//                     <div
//                       className={`relative rounded-lg border ${
//                         isPhoneValid === true
//                           ? "border-green-500"
//                           : isPhoneValid === false
//                           ? "border-red-500"
//                           : errors.phone
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       } bg-white focus-within:border-[#FF385C] transition-colors`}
//                     >
//                       <PhoneIcon
//                         className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
//                           isPhoneValid === true
//                             ? "text-green-500"
//                             : isPhoneValid === false
//                             ? "text-red-500"
//                             : "text-gray-400"
//                         }`}
//                       />
//                       <input
//                         type="tel"
//                         value={formData.phone}
//                         onChange={(e) =>
//                           handleInputChange("phone", e.target.value)
//                         }
//                         className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
//                         placeholder="0788123456 or +250788123456"
//                       />
//                       {isPhoneValid === true && (
//                         <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
//                       )}
//                       {isPhoneValid === false && (
//                         <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
//                       )}
//                     </div>
//                     {errors.phone && (
//                       <p className="text-xs text-red-500 mt-1">
//                         {errors.phone}
//                       </p>
//                     )}
//                     {isPhoneValid === true && (
//                       <p className="text-xs text-green-500 mt-1">
//                         ✓ {t.validPhone}
//                       </p>
//                     )}
//                   </div>

//                   {/* Role & Status Row */}
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium mb-1.5 text-gray-700">
//                         {t.role} *
//                       </label>
//                       <select
//                         value={formData.role}
//                         onChange={(e) =>
//                           handleInputChange(
//                             "role",
//                             e.target.value as UserFormData["role"],
//                           )
//                         }
//                         className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//                       >
//                         <option value="user">{t.users}</option>
//                         <option value="host">{t.hosts}</option>
//                         <option value="admin">{t.admins}</option>
//                       </select>
//                       {errors.role && (
//                         <p className="text-xs text-red-500 mt-1">
//                           {errors.role}
//                         </p>
//                       )}
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-1.5 text-gray-700">
//                         {t.status} *
//                       </label>
//                       <select
//                         value={formData.status}
//                         onChange={(e) =>
//                           handleInputChange(
//                             "status",
//                             e.target.value as UserFormData["status"],
//                           )
//                         }
//                         className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
//                       >
//                         <option value="active">{t.active}</option>
//                         <option value="inactive">{t.inactive}</option>
//                         <option value="suspended">{t.suspended}</option>
//                       </select>
//                       {errors.status && (
//                         <p className="text-xs text-red-500 mt-1">
//                           {errors.status}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="mt-4 text-xs text-gray-500">
//                     <p>{t.editPasswordNote}</p>
//                   </div>

//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     type="submit"
//                     disabled={isSubmitting || !isFormValid()}
//                     className={`w-full mt-4 py-3 rounded-lg font-medium relative overflow-hidden group transition-colors ${
//                       isSubmitting || !isFormValid()
//                         ? "bg-gray-400 cursor-not-allowed"
//                         : "bg-[#FF385C] hover:bg-[#E31C5F]"
//                     } text-white`}
//                   >
//                     <span className="relative z-10 flex items-center justify-center gap-2">
//                       {isSubmitting ? (
//                         <>
//                           <svg
//                             className="animate-spin h-5 w-5 text-white"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                           >
//                             <circle
//                               className="opacity-25"
//                               cx="12"
//                               cy="12"
//                               r="10"
//                               stroke="currentColor"
//                               strokeWidth="4"
//                             />
//                             <path
//                               className="opacity-75"
//                               fill="currentColor"
//                               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                             />
//                           </svg>
//                           {t.updating}
//                         </>
//                       ) : (
//                         <>
//                           <EditIcon className="w-5 h-5" />
//                           {t.updateUser}
//                         </>
//                       )}
//                     </span>
//                   </motion.button>
//                 </form>
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
/* eslint-disable react-hooks/immutability */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import Cookies from 'js-cookie';
import axios from "axios";

// Material-UI Icons
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import WarningIcon from "@mui/icons-material/Warning";
import SecurityIcon from "@mui/icons-material/Security";
import VerifiedIcon from "@mui/icons-material/Verified";
import RefreshIcon from "@mui/icons-material/Refresh";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import InfoIcon from "@mui/icons-material/Info";
import {
  CheckCircleOutlineRounded,
  ErrorOutlineOutlined,
  ViewAgenda,
} from "@mui/icons-material";

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

// Types matching the backend model
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "user" | "host" | "manager";
  isActive: boolean;
  isEmailVerified: boolean;
  lastLogin?: string | null;
  createdAt: string;
  updatedAt: string;
  statistics?: {
    totalIncome: number;
    totalExpenses: number;
    totalSavings: number;
    monthlyIncome: number;
    monthlyExpenses: number;
    monthlyBudget: number;
    membersCount: number;
  };
}

interface UserFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: "admin" | "user" | "host" | "manager";
  isActive: boolean;
}

// Helper functions for safe user data access
const safeUserHelpers = {
  getInitial: (user: User | null | undefined): string => {
    if (!user || !user.name || user.name.length === 0) return "U";
    return user.name.charAt(0).toUpperCase();
  },
  
  formatRole: (user: User | null | undefined): string => {
    if (!user || !user.role || user.role.length === 0) return "User";
    return user.role.charAt(0).toUpperCase() + user.role.slice(1);
  },
  
  formatStatus: (user: User | null | undefined): string => {
    if (!user) return "Active";
    return user.isActive ? "Active" : "Inactive";
  },
  
  getDisplayName: (user: User | null | undefined): string => {
    if (!user || !user.name) return "Unknown User";
    return user.name;
  },
  
  getDisplayEmail: (user: User | null | undefined): string => {
    if (!user || !user.email) return "No email";
    return user.email;
  },
  
  getDisplayPhone: (user: User | null | undefined): string => {
    if (!user || !user.phone) return "No phone";
    return user.phone;
  },
  
  getDisplayRole: (user: User | null | undefined): string => {
    if (!user || !user.role) return "user";
    return user.role;
  },
  
  getDisplayStatus: (user: User | null | undefined): string => {
    if (!user) return "active";
    return user.isActive ? "active" : "inactive";
  }
};

// Status Modal Component
interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "success" | "error" | "info" | "confirm";
  title: string;
  message: string;
  details?: string;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const StatusModal: React.FC<StatusModalProps> = ({
  isOpen,
  onClose,
  type,
  title,
  message,
  details,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <CheckCircleOutlineRounded className="w-16 h-16 text-green-500" />
        );
      case "error":
        return <ErrorOutlineOutlined className="w-16 h-16 text-red-500" />;
      case "info":
        return <InfoIcon className="w-16 h-16 text-blue-500" />;
      case "confirm":
        return <WarningIcon className="w-16 h-16 text-yellow-500" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-green-800",
          button: "bg-green-500 hover:bg-green-600",
        };
      case "error":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          text: "text-red-800",
          button: "bg-red-500 hover:bg-red-600",
        };
      case "info":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-800",
          button: "bg-blue-500 hover:bg-blue-600",
        };
      case "confirm":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          text: "text-yellow-800",
          button: "bg-yellow-500 hover:bg-yellow-600",
        };
    }
  };

  const colors = getColors();

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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            onClick={onClose}
          />
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
          >
            <div
              className={`w-full max-w-md rounded-2xl shadow-2xl border ${colors.border} ${colors.bg} relative overflow-hidden`}
            >
              <div className="relative z-10 p-6">
                <div className="flex flex-col items-center text-center">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="mb-4"
                  >
                    {getIcon()}
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`text-2xl font-bold ${colors.text} mb-2`}
                  >
                    {title}
                  </motion.h3>

                  {/* Message */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-700 mb-4"
                  >
                    {message}
                  </motion.p>

                  {/* Details */}
                  {details && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-white/50 rounded-lg p-3 mb-4 w-full text-sm text-gray-600"
                    >
                      {details}
                    </motion.div>
                  )}

                  {/* Buttons */}
                  <div className="flex gap-3 w-full">
                    {type === "confirm" ? (
                      <>
                        <motion.button
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={onClose}
                          className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                        >
                          {cancelText}
                        </motion.button>
                        <motion.button
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={onConfirm}
                          className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-all ${colors.button} shadow-lg`}
                        >
                          {confirmText}
                        </motion.button>
                      </>
                    ) : (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onClose}
                        className={`w-full px-6 py-2.5 rounded-lg text-white font-medium transition-all ${colors.button} shadow-lg`}
                      >
                        Got it
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// View User Modal
interface ViewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

const ViewUserModal: React.FC<ViewUserModalProps> = ({ isOpen, onClose, user }) => {
  if (!user) return null;

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

  const getRoleColor = (role: string): string => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "host":
        return "bg-blue-100 text-blue-800";
      case "manager":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  const getStatusColor = (isActive: boolean): string => {
    return isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";
  };

  // Safe user data access
  const userInitial = safeUserHelpers.getInitial(user);
  const userDisplayName = safeUserHelpers.getDisplayName(user);
  const userDisplayEmail = safeUserHelpers.getDisplayEmail(user);
  const userDisplayRole = safeUserHelpers.getDisplayRole(user);
  const formattedRole = safeUserHelpers.formatRole(user);
  const formattedStatus = safeUserHelpers.formatStatus(user);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]"
            onClick={onClose}
          />
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
            className="fixed inset-0 z-[151] flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white relative overflow-hidden">
              <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
                <div className="flex items-center gap-2">
                  <PersonIcon className="text-[#FF385C] w-5 h-5" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    User Details
                  </h2>
                </div>
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                >
                  <CloseIcon className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <motion.div
                    className="w-24 h-24 rounded-full bg-[#FF385C] text-white flex items-center justify-center text-3xl font-bold mb-3"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {userInitial}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {userDisplayName}
                  </h3>
                  <p className="text-sm text-gray-500">{userDisplayEmail}</p>
                  <div className="flex gap-2 mt-2">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${getRoleColor(
                        userDisplayRole,
                      )}`}
                    >
                      {formattedRole}
                    </span>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        user.isActive,
                      )}`}
                    >
                      {formattedStatus}
                    </span>
                    {user.isEmailVerified && (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        Verified
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-3 border-t border-gray-200 pt-4">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Phone</span>
                    <span className="text-sm font-medium text-gray-900">
                      {safeUserHelpers.getDisplayPhone(user)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">User ID</span>
                    <span className="text-sm font-medium text-gray-900">
                      {user.id || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Joined</span>
                    <span className="text-sm font-medium text-gray-900">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }) : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-gray-500">Last Updated</span>
                    <span className="text-sm font-medium text-gray-900">
                      {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }) : "N/A"}
                    </span>
                  </div>
                  {user.lastLogin && (
                    <div className="flex justify-between py-2">
                      <span className="text-sm text-gray-500">Last Login</span>
                      <span className="text-sm font-medium text-gray-900">
                        {new Date(user.lastLogin).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="w-full mt-6 py-2.5 rounded-lg bg-[#FF385C] text-white font-medium hover:bg-[#E31C5F] transition-colors"
                >
                  Close
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Translations
const translations = {
  en: {
    userManagement: "User Management",
    manageUsers: "Manage users, roles, and permissions",
    addUser: "Add User",
    total: "Total",
    active: "Active",
    inactive: "Inactive",
    suspended: "Suspended",
    admins: "Admins",
    hosts: "Hosts",
    managers: "Managers",
    users: "Users",
    searchUsers: "Search users by name, email or phone...",
    allRoles: "All Roles",
    allStatus: "All Status",
    user: "User",
    contact: "Contact",
    role: "Role",
    status: "Status",
    joined: "Joined",
    actions: "Actions",
    noUsers: "No users found",
    adjustFilters: "Try adjusting your search or filters",
    showing: "Showing",
    of: "of",
    usersCount: "users",
    addNewUser: "Add New User",
    editUser: "Edit User",
    fullName: "Full Name",
    email: "Email",
    phoneNumber: "Phone Number",
    password: "Password",
    confirmPassword: "Confirm Password",
    createUser: "Create User",
    updateUser: "Update User",
    deleteUser: "Delete User",
    deleteConfirmation: "Are you sure you want to delete",
    actionUndone: "This action cannot be undone.",
    cancel: "Cancel",
    delete: "Delete",
    creating: "Creating...",
    updating: "Updating...",
    deleting: "Deleting...",
    userCreated: "User created successfully!",
    userUpdated: "User updated successfully!",
    userDeleted: "User deleted successfully!",
    usersDeleted: "users deleted successfully!",
    createFailed: "Failed to create user",
    updateFailed: "Failed to update user",
    deleteFailed: "Failed to delete user",
    nameRequired: "Full name is required",
    nameMin: "Name must be at least 2 characters",
    emailRequired: "Email is required",
    emailInvalid: "Please enter a valid email address",
    phoneRequired: "Phone number is required",
    phoneInvalid: "Please enter a valid phone number",
    passwordRequired: "Password is required",
    passwordMin: "Password must be at least 8 characters",
    confirmPasswordRequired: "Please confirm your password",
    passwordsDoNotMatch: "Passwords do not match",
    passwordWeak: "Please choose a stronger password",
    validEmail: "Valid email address",
    validPhone: "Valid phone number",
    passwordsMatch: "Passwords match",
    strength: "Strength",
    weak: "Weak",
    moderate: "Moderate",
    strong: "Strong",
    editPasswordNote: "Password fields are optional for editing.",
    viewUser: "View User",
  },
  fr: {
    userManagement: "Gestion des Utilisateurs",
    manageUsers: "Gérer les utilisateurs, les rôles et les permissions",
    addUser: "Ajouter un Utilisateur",
    total: "Total",
    active: "Actif",
    inactive: "Inactif",
    suspended: "Suspendu",
    admins: "Administrateurs",
    hosts: "Hôtes",
    managers: "Gestionnaires",
    users: "Utilisateurs",
    searchUsers: "Rechercher des utilisateurs par nom, email ou téléphone...",
    allRoles: "Tous les Rôles",
    allStatus: "Tous les Statuts",
    user: "Utilisateur",
    contact: "Contact",
    role: "Rôle",
    status: "Statut",
    joined: "Inscrit",
    actions: "Actions",
    noUsers: "Aucun utilisateur trouvé",
    adjustFilters: "Essayez d'ajuster votre recherche ou vos filtres",
    showing: "Affichage",
    of: "de",
    usersCount: "utilisateurs",
    addNewUser: "Ajouter un Nouvel Utilisateur",
    editUser: "Modifier l'Utilisateur",
    fullName: "Nom Complet",
    email: "E-mail",
    phoneNumber: "Numéro de Téléphone",
    password: "Mot de Passe",
    confirmPassword: "Confirmer le Mot de Passe",
    createUser: "Créer l'Utilisateur",
    updateUser: "Mettre à Jour l'Utilisateur",
    deleteUser: "Supprimer l'Utilisateur",
    deleteConfirmation: "Êtes-vous sûr de vouloir supprimer",
    actionUndone: "Cette action est irréversible.",
    cancel: "Annuler",
    delete: "Supprimer",
    creating: "Création...",
    updating: "Mise à jour...",
    deleting: "Suppression...",
    userCreated: "Utilisateur créé avec succès !",
    userUpdated: "Utilisateur mis à jour avec succès !",
    userDeleted: "Utilisateur supprimé avec succès !",
    usersDeleted: "utilisateurs supprimés avec succès !",
    createFailed: "Échec de la création de l'utilisateur",
    updateFailed: "Échec de la mise à jour de l'utilisateur",
    deleteFailed: "Échec de la suppression de l'utilisateur",
    nameRequired: "Le nom complet est requis",
    nameMin: "Le nom doit contenir au moins 2 caractères",
    emailRequired: "L'e-mail est requis",
    emailInvalid: "Veuillez entrer une adresse e-mail valide",
    phoneRequired: "Le numéro de téléphone est requis",
    phoneInvalid: "Veuillez entrer un numéro de téléphone valide",
    passwordRequired: "Le mot de passe est requis",
    passwordMin: "Le mot de passe doit contenir au moins 8 caractères",
    confirmPasswordRequired: "Veuillez confirmer votre mot de passe",
    passwordsDoNotMatch: "Les mots de passe ne correspondent pas",
    passwordWeak: "Veuillez choisir un mot de passe plus fort",
    validEmail: "Adresse e-mail valide",
    validPhone: "Numéro de téléphone valide",
    passwordsMatch: "Les mots de passe correspondent",
    strength: "Force",
    weak: "Faible",
    moderate: "Modéré",
    strong: "Fort",
    editPasswordNote: "Les champs de mot de passe sont facultatifs pour la modification.",
    viewUser: "Voir l'Utilisateur",
  },
  rw: {
    userManagement: "Gucunga Abakoresha",
    manageUsers: "Gucunga abakoresha, imirimo n'uburenganzira",
    addUser: "Ongeraho Umukoresha",
    total: "Yose",
    active: "Agikoresha",
    inactive: "Ntagikoresha",
    suspended: "Yahagaritswe",
    admins: "Abayobozi",
    hosts: "Abatunze Inzu",
    managers: "Abagenzuzi",
    users: "Abakoresha",
    searchUsers: "Shakisha abakoresha ukurikije izina, imeri cyangwa telefone...",
    allRoles: "Imirimo Yose",
    allStatus: "Ihagaze Ryose",
    user: "Umukoresha",
    contact: "Aho Kuvugana",
    role: "Umurimo",
    status: "Ihagaze",
    joined: "Yinjiye",
    actions: "Ibikorwa",
    noUsers: "Nta mukoresha wabonetse",
    adjustFilters: "Gerageza guhindura uburyo ushakisha cyangwa amatungo",
    showing: "Bereka",
    of: "muri",
    usersCount: "abakoresha",
    addNewUser: "Ongeraho Umukoresha Mushya",
    editUser: "Hindura Umukoresha",
    fullName: "Izina Ryose",
    email: "Imeri",
    phoneNumber: "Numero ya Telefone",
    password: "Ijambo ry'Ibanga",
    confirmPassword: "Emeza Ijambo ry'Ibanga",
    createUser: "Kora Umukoresha",
    updateUser: "Vugurura Umukoresha",
    deleteUser: "Kuraho Umukoresha",
    deleteConfirmation: "Uri kwizera ko ushaka gukuraho",
    actionUndone: "Iki gikorwa ntikishobora guhindurwa.",
    cancel: "Reka",
    delete: "Kuraho",
    creating: "Birakorwa...",
    updating: "Biravugururwa...",
    deleting: "Birakurwaho...",
    userCreated: "Umukoresha yakozwe neza!",
    userUpdated: "Umukoresha yavuguruwe neza!",
    userDeleted: "Umukoresha yakuweho neza!",
    usersDeleted: "abakoresha bakuvweho neza!",
    createFailed: "Kora umukoresha birananiranye",
    updateFailed: "Vugurura umukoresha birananiranye",
    deleteFailed: "Kuraho umukoresha birananiranye",
    nameRequired: "Izina ryose rirasabwa",
    nameMin: "Izina rigomba kuba nibura inyuguti 2",
    emailRequired: "Imeri irasabwa",
    emailInvalid: "Injiza aderesi ya imeri ikwiye",
    phoneRequired: "Numero ya telefone irasabwa",
    phoneInvalid: "Injiza numero ya telefone ikwiye",
    passwordRequired: "Ijambo ry'ibanga rirasabwa",
    passwordMin: "Ijambo ry'ibanga rigomba kuba nibura inyuguti 8",
    confirmPasswordRequired: "Emeza ijambo ry'ibanga",
    passwordsDoNotMatch: "Amagambo y'ibanga ntagahura",
    passwordWeak: "Hitamo ijambo ry'ibanga rikomeye",
    validEmail: "Aderesi ya imeri ikwiye",
    validPhone: "Numero ya telefone ikwiye",
    passwordsMatch: "Amagambo y'ibanga ahura",
    strength: "Imbaraga",
    weak: "Ntacyo",
    moderate: "Rishoboka",
    strong: "Rikomeye",
    editPasswordNote: "Amagambo y'ibanga ntabwo ari ngombwa mugihe uhindura.",
    viewUser: "Reba Umukoresha",
  }
};

// Helper function to get language from cookies
const getLanguageFromCookies = (): 'en' | 'fr' | 'rw' => {
  const lang = Cookies.get('language') as 'en' | 'fr' | 'rw';
  return lang || 'en';
};

// Helper function to get translations based on cookie language
export const getTranslations = () => {
  const lang = getLanguageFromCookies();
  return translations[lang];
};

export const UserManagement: React.FC = () => {
  // Get language from cookies
  const [lang, setLang] = useState<'en' | 'fr' | 'rw'>(getLanguageFromCookies());
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Status Modal state
  const [statusModal, setStatusModal] = useState<{
    isOpen: boolean;
    type: "success" | "error" | "info" | "confirm";
    title: string;
    message: string;
    details?: string;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
  }>({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
    details: "",
  });

  // Form states
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "user",
    isActive: true,
  });

  // Form validation states
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    role?: string;
    isActive?: string;
  }>({});

  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [isPhoneValid, setIsPhoneValid] = useState<boolean | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<
    "weak" | "moderate" | "strong" | null
  >(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Statistics
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    admins: 0,
    hosts: 0,
    managers: 0,
    users: 0,
  });

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

  // Fetch users from API with data sanitization
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await API.get("/auth");
      if (response.data.success) {
        const userData = response.data.users || response.data.data || [];
        
        // Sanitize user data to ensure required fields exist
        const sanitizedUsers = userData.map((user: any) => ({
          id: user.id || user._id || `user_${Math.random()}`,
          name: user.name || user.fullName || "Unknown User",
          email: user.email || "no-email@example.com",
          phone: user.phone || user.phoneNumber || "N/A",
          role: user.role || "user",
          isActive: user.isActive !== undefined ? user.isActive : true,
          isEmailVerified: user.isEmailVerified || false,
          lastLogin: user.lastLogin || null,
          createdAt: user.createdAt || new Date().toISOString(),
          updatedAt: user.updatedAt || new Date().toISOString(),
          statistics: user.statistics || {
            totalIncome: 0,
            totalExpenses: 0,
            totalSavings: 0,
            monthlyIncome: 0,
            monthlyExpenses: 0,
            monthlyBudget: 0,
            membersCount: 1,
          },
        }));
        
        setUsers(sanitizedUsers);
        setFilteredUsers(sanitizedUsers);
      } else {
        showStatusModal("error", "Error", response.data.message || "Failed to fetch users");
      }
    } catch (error: any) {
      console.error("Error fetching users:", error);
      showStatusModal(
        "error",
        "Error",
        error.response?.data?.message || "Failed to fetch users. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Load users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter and search users
  useEffect(() => {
    let filtered = [...users];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          (user.name && user.name.toLowerCase().includes(term)) ||
          (user.email && user.email.toLowerCase().includes(term)) ||
          (user.phone && user.phone.includes(term)),
      );
    }

    if (filterRole !== "all") {
      filtered = filtered.filter((user) => user.role === filterRole);
    }

    if (filterStatus !== "all") {
      const isActive = filterStatus === "active";
      filtered = filtered.filter((user) => user.isActive === isActive);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, filterRole, filterStatus]);

  // Update statistics
  useEffect(() => {
    const total = users.length;
    const active = users.filter((u) => u.isActive === true).length;
    const inactive = users.filter((u) => u.isActive === false).length;
    const admins = users.filter((u) => u.role === "admin").length;
    const hosts = users.filter((u) => u.role === "host").length;
    const managers = users.filter((u) => u.role === "manager").length;
    const userCount = users.filter((u) => u.role === "user").length;

    setStats({ total, active, inactive, admins, hosts, managers, users: userCount });
  }, [users]);

  // Show status modal
  const showStatusModal = (
    type: "success" | "error" | "info" | "confirm",
    title: string,
    message: string,
    details?: string,
    onConfirm?: () => void,
    confirmText?: string,
    cancelText?: string
  ) => {
    setStatusModal({
      isOpen: true,
      type,
      title,
      message,
      details,
      onConfirm,
      confirmText,
      cancelText,
    });
  };

  // Close status modal
  const closeStatusModal = () => {
    setStatusModal((prev) => ({ ...prev, isOpen: false }));
  };

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+?[0-9]{7,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const checkPasswordStrength = (
    password: string,
  ): "weak" | "moderate" | "strong" | null => {
    if (!password || password.length === 0) return null;

    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 2) return "weak";
    if (score <= 4) return "moderate";
    return "strong";
  };

  const getPasswordStrengthColor = (
    strength: "weak" | "moderate" | "strong" | null,
  ): string => {
    if (!strength) return "#e5e7eb";
    switch (strength) {
      case "weak":
        return "#ef4444";
      case "moderate":
        return "#f59e0b";
      case "strong":
        return "#22c55e";
    }
  };

  const getPasswordStrengthLabel = (
    strength: "weak" | "moderate" | "strong" | null,
  ): string => {
    if (!strength) return "";
    switch (strength) {
      case "weak":
        return t.weak;
      case "moderate":
        return t.moderate;
      case "strong":
        return t.strong;
    }
  };

  const getPasswordStrengthIcon = (
    strength: "weak" | "moderate" | "strong" | null,
  ) => {
    if (!strength) return null;
    switch (strength) {
      case "weak":
        return <WarningIcon className="w-4 h-4" style={{ color: "#ef4444" }} />;
      case "moderate":
        return (
          <SecurityIcon className="w-4 h-4" style={{ color: "#f59e0b" }} />
        );
      case "strong":
        return (
          <VerifiedIcon className="w-4 h-4" style={{ color: "#22c55e" }} />
        );
    }
  };

  const validateForm = (): boolean => {
    const newErrors: {
      name?: string;
      email?: string;
      phone?: string;
      password?: string;
      confirmPassword?: string;
      role?: string;
      isActive?: string;
    } = {};

    if (!formData.name) {
      newErrors.name = t.nameRequired;
    } else if (formData.name.length < 2) {
      newErrors.name = t.nameMin;
    }

    if (!formData.email) {
      newErrors.email = t.emailRequired;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t.emailInvalid;
    }

    if (!formData.phone) {
      newErrors.phone = t.phoneRequired;
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = t.phoneInvalid;
    }

    // Only validate password for create mode
    if (!selectedUser) {
      if (!formData.password) {
        newErrors.password = t.passwordRequired;
      } else if (formData.password.length < 8) {
        newErrors.password = t.passwordMin;
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = t.confirmPasswordRequired;
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = t.passwordsDoNotMatch;
      }

      if (passwordStrength === "weak") {
        newErrors.password = t.passwordWeak;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = (): boolean => {
    if (selectedUser) {
      // Edit mode - only validate basic fields
      return (
        formData.name.length >= 2 &&
        formData.email.length > 0 &&
        validateEmail(formData.email) &&
        formData.phone.length > 0 &&
        validatePhone(formData.phone)
      );
    } else {
      // Create mode - validate all fields
      return (
        formData.name.length >= 2 &&
        formData.email.length > 0 &&
        validateEmail(formData.email) &&
        formData.phone.length > 0 &&
        validatePhone(formData.phone) &&
        formData.password.length >= 8 &&
        formData.confirmPassword.length >= 8 &&
        formData.password === formData.confirmPassword &&
        passwordStrength !== null &&
        passwordStrength !== "weak"
      );
    }
  };

  // CRUD Operations with API integration
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: formData.role,
      });

      if (response.data.success) {
        showStatusModal(
          "success",
          "✅ " + t.userCreated,
          t.userCreated,
          `Name: ${formData.name}\nEmail: ${formData.email}`
        );
        await fetchUsers();
        resetForm();
        setIsCreateModalOpen(false);
      } else {
        showStatusModal(
          "error",
          "❌ " + t.createFailed,
          response.data.message || t.createFailed
        );
      }
    } catch (error: any) {
      console.error("Create user error:", error);
      showStatusModal(
        "error",
        "❌ " + t.createFailed,
        error.response?.data?.message || t.createFailed
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !selectedUser) return;

    setIsSubmitting(true);

    try {
      const updateData: any = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        isActive: formData.isActive,
      };

      // Only include password if provided
      if (formData.password) {
        updateData.password = formData.password;
        updateData.confirmPassword = formData.confirmPassword;
      }

      const response = await API.put(`/auth/${selectedUser.id}`, updateData);

      if (response.data.success) {
        showStatusModal(
          "success",
          "✅ " + t.userUpdated,
          t.userUpdated,
          `Name: ${formData.name}\nEmail: ${formData.email}`
        );
        await fetchUsers();
        resetForm();
        setIsEditModalOpen(false);
        setSelectedUser(null);
      } else {
        showStatusModal(
          "error",
          "❌ " + t.updateFailed,
          response.data.message || t.updateFailed
        );
      }
    } catch (error: any) {
      console.error("Update user error:", error);
      showStatusModal(
        "error",
        "❌ " + t.updateFailed,
        error.response?.data?.message || t.updateFailed
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      const response = await API.delete(`/auth/${selectedUser.id}`);

      if (response.data.success) {
        showStatusModal(
          "success",
          "🗑️ " + t.userDeleted,
          t.userDeleted,
          `User: ${selectedUser.name}`
        );
        await fetchUsers();
        setIsDeleteModalOpen(false);
        setSelectedUser(null);
      } else {
        showStatusModal(
          "error",
          "❌ " + t.deleteFailed,
          response.data.message || t.deleteFailed
        );
      }
    } catch (error: any) {
      console.error("Delete user error:", error);
      showStatusModal(
        "error",
        "❌ " + t.deleteFailed,
        error.response?.data?.message || t.deleteFailed
      );
    }
  };

  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0) {
      showStatusModal("info", "Info", "Please select users to delete");
      return;
    }

    showStatusModal(
      "confirm",
      "⚠️ Confirm Bulk Delete",
      `Are you sure you want to delete ${selectedUsers.length} users?`,
      "This action cannot be undone.",
      async () => {
        setIsSubmitting(true);
        try {
          const response = await API.delete("/auth/bulk", {
            data: { userIds: selectedUsers },
          });

          if (response.data.success) {
            showStatusModal(
              "success",
              "🗑️ " + selectedUsers.length + " " + t.usersDeleted,
              selectedUsers.length + " " + t.usersDeleted
            );
            await fetchUsers();
            setSelectedUsers([]);
          } else {
            showStatusModal(
              "error",
              "❌ " + t.deleteFailed,
              response.data.message || t.deleteFailed
            );
          }
        } catch (error: any) {
          console.error("Bulk delete error:", error);
          showStatusModal(
            "error",
            "❌ " + t.deleteFailed,
            error.response?.data?.message || t.deleteFailed
          );
        } finally {
          setIsSubmitting(false);
          closeStatusModal();
        }
      },
      t.delete,
      t.cancel
    );
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "user",
      isActive: true,
    });
    setErrors({});
    setIsEmailValid(null);
    setIsPhoneValid(null);
    setPasswordStrength(null);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  // Open edit modal with user data
  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      password: "",
      confirmPassword: "",
      role: user.role || "user",
      isActive: user.isActive !== undefined ? user.isActive : true,
    });
    setIsEmailValid(user.email ? validateEmail(user.email) : null);
    setIsPhoneValid(user.phone ? validatePhone(user.phone) : null);
    setIsEditModalOpen(true);
  };

  // Open view modal
  const openViewModal = (user: User) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  // Open delete confirmation
  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    showStatusModal(
      "confirm",
      "⚠️ " + t.deleteUser,
      `${t.deleteConfirmation} "${user.name || 'Unknown User'}"?`,
      t.actionUndone,
      handleDeleteUser,
      t.delete,
      t.cancel
    );
  };

  // Handle form field changes
  const handleInputChange = (field: keyof UserFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear errors for this field
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    // Email validation
    if (field === "email" && typeof value === "string") {
      if (value.length > 0) {
        setIsEmailValid(validateEmail(value));
      } else {
        setIsEmailValid(null);
      }
    }

    // Phone validation
    if (field === "phone" && typeof value === "string") {
      if (value.length > 0) {
        setIsPhoneValid(validatePhone(value));
      } else {
        setIsPhoneValid(null);
      }
    }

    // Password strength check
    if (field === "password" && typeof value === "string") {
      const strength = checkPasswordStrength(value);
      setPasswordStrength(strength);

      if (formData.confirmPassword && value !== formData.confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: t.passwordsDoNotMatch,
        }));
      } else if (
        formData.confirmPassword &&
        value === formData.confirmPassword
      ) {
        setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
      }
    }

    // Confirm password check
    if (field === "confirmPassword" && typeof value === "string") {
      if (formData.password && formData.password !== value) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: t.passwordsDoNotMatch,
        }));
      } else if (formData.password && formData.password === value) {
        setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
      }
    }
  };

  // Toggle user selection for bulk actions
  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  // Toggle select all
  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id));
    }
  };

  // Get role badge color
  const getRoleColor = (role: string): string => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "host":
        return "bg-blue-100 text-blue-800";
      case "manager":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  // Get status badge color
  const getStatusColor = (isActive: boolean): string => {
    return isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";
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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Status Modal */}
      <StatusModal
        isOpen={statusModal.isOpen}
        onClose={closeStatusModal}
        type={statusModal.type}
        title={statusModal.title}
        message={statusModal.message}
        details={statusModal.details}
        onConfirm={statusModal.onConfirm}
        confirmText={statusModal.confirmText}
        cancelText={statusModal.cancelText}
      />

      {/* View User Modal */}
      <ViewUserModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />

      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <PersonIcon className="w-7 h-7 text-[#FF385C]" />
              {t.userManagement}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {t.manageUsers}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {selectedUsers.length > 0 && (
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={handleBulkDelete}
                disabled={isSubmitting}
                className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <DeleteIcon className="w-4 h-4" />
                {t.delete} ({selectedUsers.length})
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                resetForm();
                setIsCreateModalOpen(true);
              }}
              className="px-4 py-2 bg-[#FF385C] text-white rounded-lg text-sm font-medium hover:bg-[#E31C5F] transition-colors flex items-center gap-2"
            >
              <AddIcon className="w-4 h-4" />
              {t.addUser}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={fetchUsers}
              disabled={isLoading}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshIcon className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
        >
          <p className="text-xs text-gray-500">{t.total}</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-green-50 rounded-xl p-4 shadow-sm border border-green-200"
        >
          <p className="text-xs text-green-600">{t.active}</p>
          <p className="text-2xl font-bold text-green-700">{stats.active}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-200"
        >
          <p className="text-xs text-gray-500">{t.inactive}</p>
          <p className="text-2xl font-bold text-gray-700">{stats.inactive}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-purple-50 rounded-xl p-4 shadow-sm border border-purple-200"
        >
          <p className="text-xs text-purple-600">{t.admins}</p>
          <p className="text-2xl font-bold text-purple-700">{stats.admins}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-blue-50 rounded-xl p-4 shadow-sm border border-blue-200"
        >
          <p className="text-xs text-blue-600">{t.hosts}</p>
          <p className="text-2xl font-bold text-blue-700">{stats.hosts}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-indigo-50 rounded-xl p-4 shadow-sm border border-indigo-200"
        >
          <p className="text-xs text-indigo-600">{t.managers}</p>
          <p className="text-2xl font-bold text-indigo-700">{stats.managers}</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-200"
        >
          <p className="text-xs text-gray-500">{t.users}</p>
          <p className="text-2xl font-bold text-gray-900">{stats.users}</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t.searchUsers}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
            >
              <option value="all">{t.allRoles}</option>
              <option value="admin">{t.admins}</option>
              <option value="host">{t.hosts}</option>
              <option value="manager">{t.managers}</option>
              <option value="user">{t.users}</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
            >
              <option value="all">{t.allStatus}</option>
              <option value="active">{t.active}</option>
              <option value="inactive">{t.inactive}</option>
            </select>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterRole("all");
                setFilterStatus("all");
              }}
              className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <RefreshIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <svg
              className="animate-spin h-8 w-8 text-[#FF385C]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="ml-3 text-gray-500">Loading users...</span>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={
                          filteredUsers.length > 0 &&
                          selectedUsers.length === filteredUsers.length
                        }
                        onChange={toggleSelectAll}
                        className="rounded border-gray-300 text-[#FF385C] focus:ring-[#FF385C]"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.user}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      {t.contact}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.role}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.status}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                      {t.joined}
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.actions}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                        <PersonIcon className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                        <p>{t.noUsers}</p>
                        <p className="text-sm">{t.adjustFilters}</p>
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => toggleUserSelection(user.id)}
                            className="rounded border-gray-300 text-[#FF385C] focus:ring-[#FF385C]"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#FF385C] text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
                              {safeUserHelpers.getInitial(user)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-sm">
                                {safeUserHelpers.getDisplayName(user)}
                              </p>
                              <p className="text-xs text-gray-500 md:hidden">
                                {safeUserHelpers.getDisplayEmail(user)}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <p className="text-sm text-gray-600">{safeUserHelpers.getDisplayEmail(user)}</p>
                          <p className="text-xs text-gray-400">{safeUserHelpers.getDisplayPhone(user)}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(
                              safeUserHelpers.getDisplayRole(user),
                            )}`}
                          >
                            {safeUserHelpers.formatRole(user)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                              user.isActive,
                            )}`}
                          >
                            {safeUserHelpers.formatStatus(user)}
                          </span>
                          {user.isEmailVerified && (
                            <span className="ml-1 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                              ✓
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <p className="text-sm text-gray-600">
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }) : "N/A"}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => openViewModal(user)}
                              className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                              title={t.viewUser}
                            >
                              <ViewAgenda className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => openEditModal(user)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title={t.editUser}
                            >
                              <EditIcon className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => openDeleteModal(user)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title={t.deleteUser}
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
                {t.showing} {filteredUsers.length} {t.of} {users.length} {t.usersCount}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Create User Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => {
                setIsCreateModalOpen(false);
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
              <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
                <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
                  <div className="flex items-center gap-2">
                    <PersonAddIcon className="text-[#FF385C] w-5 h-5" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      {t.addNewUser}
                    </h2>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setIsCreateModalOpen(false);
                      resetForm();
                    }}
                    className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </motion.button>
                </div>

                <form onSubmit={handleCreateUser} className="p-6">
                  {/* Name */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1.5 text-gray-700">
                      {t.fullName} *
                    </label>
                    <div
                      className={`relative rounded-lg border ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      } bg-white focus-within:border-[#FF385C] transition-colors`}
                    >
                      <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className={`w-full pl-10 pr-3 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400 ${
                          formData.name.length >= 2 && !errors.name ? "border-green-500" : ""
                        }`}
                        placeholder="John Doe"
                      />
                      {formData.name.length >= 2 && !errors.name && (
                        <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                    </div>
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                    )}
                    {formData.name.length >= 2 && !errors.name && (
                      <p className="text-xs text-green-500 mt-1">✓ Valid name</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1.5 text-gray-700">
                      {t.email} *
                    </label>
                    <div
                      className={`relative rounded-lg border ${
                        isEmailValid === true
                          ? "border-green-500"
                          : isEmailValid === false
                          ? "border-red-500"
                          : errors.email
                          ? "border-red-500"
                          : "border-gray-300"
                      } bg-white focus-within:border-[#FF385C] transition-colors`}
                    >
                      <EmailIcon
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                          isEmailValid === true
                            ? "text-green-500"
                            : isEmailValid === false
                            ? "text-red-500"
                            : "text-gray-400"
                        }`}
                      />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
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
                        ✓ {t.validEmail}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1.5 text-gray-700">
                      {t.phoneNumber} *
                    </label>
                    <div
                      className={`relative rounded-lg border ${
                        isPhoneValid === true
                          ? "border-green-500"
                          : isPhoneValid === false
                          ? "border-red-500"
                          : errors.phone
                          ? "border-red-500"
                          : "border-gray-300"
                      } bg-white focus-within:border-[#FF385C] transition-colors`}
                    >
                      <PhoneIcon
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                          isPhoneValid === true
                            ? "text-green-500"
                            : isPhoneValid === false
                            ? "text-red-500"
                            : "text-gray-400"
                        }`}
                      />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                        placeholder="0788123456 or +250788123456"
                      />
                      {isPhoneValid === true && (
                        <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                      {isPhoneValid === false && (
                        <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                      )}
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.phone}
                      </p>
                    )}
                    {isPhoneValid === true && (
                      <p className="text-xs text-green-500 mt-1">
                        ✓ {t.validPhone}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1.5 text-gray-700">
                      {t.password} *
                    </label>
                    <div
                      className={`relative rounded-lg border ${
                        errors.password ? "border-red-500" : 
                        formData.password.length >= 8 && passwordStrength !== "weak" && passwordStrength !== null
                          ? "border-green-500"
                          : "border-gray-300"
                      } bg-white focus-within:border-[#FF385C] transition-colors`}
                    >
                      <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                        placeholder="••••••••"
                        minLength={8}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <VisibilityOffIcon className="w-5 h-5" />
                        ) : (
                          <VisibilityIcon className="w-5 h-5" />
                        )}
                      </button>
                      {formData.password.length >= 8 && passwordStrength !== "weak" && passwordStrength !== null && (
                        <CheckCircleIcon className="absolute right-12 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                    </div>
                    {errors.password && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.password}
                      </p>
                    )}

                    {passwordStrength && (
                      <div className="mt-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width:
                                  passwordStrength === "weak"
                                    ? "33%"
                                    : passwordStrength === "moderate"
                                    ? "66%"
                                    : "100%",
                                backgroundColor:
                                  getPasswordStrengthColor(passwordStrength),
                              }}
                              initial={{ width: 0 }}
                              animate={{
                                width:
                                  passwordStrength === "weak"
                                    ? "33%"
                                    : passwordStrength === "moderate"
                                    ? "66%"
                                    : "100%",
                              }}
                            />
                          </div>
                          <div
                            className="flex items-center gap-1 text-xs font-medium"
                            style={{
                              color: getPasswordStrengthColor(passwordStrength),
                            }}
                          >
                            {getPasswordStrengthIcon(passwordStrength)}
                            <span>
                              {t.strength}: {getPasswordStrengthLabel(passwordStrength)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1.5 text-gray-700">
                      {t.confirmPassword} *
                    </label>
                    <div
                      className={`relative rounded-lg border ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : formData.confirmPassword &&
                            formData.password === formData.confirmPassword &&
                            formData.confirmPassword.length > 0
                          ? "border-green-500"
                          : "border-gray-300"
                      } bg-white focus-within:border-[#FF385C] transition-colors`}
                    >
                      <LockIcon
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                          formData.confirmPassword &&
                          formData.password === formData.confirmPassword &&
                          formData.confirmPassword.length > 0
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                      />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          handleInputChange("confirmPassword", e.target.value)
                        }
                        className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                        placeholder="••••••••"
                        minLength={8}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOffIcon className="w-5 h-5" />
                        ) : (
                          <VisibilityIcon className="w-5 h-5" />
                        )}
                      </button>
                      {formData.confirmPassword &&
                        formData.password === formData.confirmPassword &&
                        formData.confirmPassword.length > 0 && (
                          <CheckCircleIcon className="absolute right-12 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                    {formData.confirmPassword &&
                      formData.password === formData.confirmPassword &&
                      formData.confirmPassword.length > 0 && (
                        <p className="text-xs text-green-500 mt-1">
                          ✓ {t.passwordsMatch}
                        </p>
                      )}
                  </div>

                  {/* Role & Status Row */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        {t.role} *
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) =>
                          handleInputChange(
                            "role",
                            e.target.value as UserFormData["role"],
                          )
                        }
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                      >
                        <option value="user">{t.users}</option>
                        <option value="host">{t.hosts}</option>
                        <option value="manager">{t.managers}</option>
                        <option value="admin">{t.admins}</option>
                      </select>
                      {errors.role && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.role}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        {t.status} *
                      </label>
                      <select
                        value={formData.isActive ? "active" : "inactive"}
                        onChange={(e) =>
                          handleInputChange(
                            "isActive",
                            e.target.value === "active"
                          )
                        }
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                      >
                        <option value="active">{t.active}</option>
                        <option value="inactive">{t.inactive}</option>
                      </select>
                      {errors.isActive && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.isActive}
                        </p>
                      )}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting || !isFormValid()}
                    className={`w-full py-3 rounded-lg font-medium relative overflow-hidden group transition-colors ${
                      isSubmitting || !isFormValid()
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#FF385C] hover:bg-[#E31C5F]"
                    } text-white`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          {t.creating}
                        </>
                      ) : (
                        <>
                          <PersonAddIcon className="w-5 h-5" />
                          {t.createUser}
                        </>
                      )}
                    </span>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Edit User Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => {
                setIsEditModalOpen(false);
                resetForm();
                setSelectedUser(null);
              }}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            >
              <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white relative">
                <div className="sticky top-0 px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm rounded-t-2xl z-10">
                  <div className="flex items-center gap-2">
                    <EditIcon className="text-[#FF385C] w-5 h-5" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      {t.editUser}
                    </h2>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setIsEditModalOpen(false);
                      resetForm();
                      setSelectedUser(null);
                    }}
                    className="p-1 rounded-full transition-colors hover:bg-gray-100 text-gray-500"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </motion.button>
                </div>

                <form onSubmit={handleEditUser} className="p-6">
                  {/* Name */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1.5 text-gray-700">
                      {t.fullName} *
                    </label>
                    <div
                      className={`relative rounded-lg border ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      } bg-white focus-within:border-[#FF385C] transition-colors`}
                    >
                      <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className={`w-full pl-10 pr-3 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400 ${
                          formData.name.length >= 2 && !errors.name ? "border-green-500" : ""
                        }`}
                        placeholder="John Doe"
                      />
                      {formData.name.length >= 2 && !errors.name && (
                        <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                    </div>
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                    )}
                    {formData.name.length >= 2 && !errors.name && (
                      <p className="text-xs text-green-500 mt-1">✓ Valid name</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1.5 text-gray-700">
                      {t.email} *
                    </label>
                    <div
                      className={`relative rounded-lg border ${
                        isEmailValid === true
                          ? "border-green-500"
                          : isEmailValid === false
                          ? "border-red-500"
                          : errors.email
                          ? "border-red-500"
                          : "border-gray-300"
                      } bg-white focus-within:border-[#FF385C] transition-colors`}
                    >
                      <EmailIcon
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                          isEmailValid === true
                            ? "text-green-500"
                            : isEmailValid === false
                            ? "text-red-500"
                            : "text-gray-400"
                        }`}
                      />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
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
                        ✓ {t.validEmail}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1.5 text-gray-700">
                      {t.phoneNumber} *
                    </label>
                    <div
                      className={`relative rounded-lg border ${
                        isPhoneValid === true
                          ? "border-green-500"
                          : isPhoneValid === false
                          ? "border-red-500"
                          : errors.phone
                          ? "border-red-500"
                          : "border-gray-300"
                      } bg-white focus-within:border-[#FF385C] transition-colors`}
                    >
                      <PhoneIcon
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                          isPhoneValid === true
                            ? "text-green-500"
                            : isPhoneValid === false
                            ? "text-red-500"
                            : "text-gray-400"
                        }`}
                      />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm bg-white text-gray-900 placeholder-gray-400"
                        placeholder="0788123456 or +250788123456"
                      />
                      {isPhoneValid === true && (
                        <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                      {isPhoneValid === false && (
                        <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                      )}
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.phone}
                      </p>
                    )}
                    {isPhoneValid === true && (
                      <p className="text-xs text-green-500 mt-1">
                        ✓ {t.validPhone}
                      </p>
                    )}
                  </div>

                  {/* Role & Status Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        {t.role} *
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) =>
                          handleInputChange(
                            "role",
                            e.target.value as UserFormData["role"],
                          )
                        }
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                      >
                        <option value="user">{t.users}</option>
                        <option value="host">{t.hosts}</option>
                        <option value="manager">{t.managers}</option>
                        <option value="admin">{t.admins}</option>
                      </select>
                      {errors.role && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.role}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-gray-700">
                        {t.status} *
                      </label>
                      <select
                        value={formData.isActive ? "active" : "inactive"}
                        onChange={(e) =>
                          handleInputChange(
                            "isActive",
                            e.target.value === "active"
                          )
                        }
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF385C] focus:border-transparent outline-none text-sm bg-white"
                      >
                        <option value="active">{t.active}</option>
                        <option value="inactive">{t.inactive}</option>
                      </select>
                      {errors.isActive && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.isActive}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 text-xs text-gray-500">
                    <p>{t.editPasswordNote}</p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting || !isFormValid()}
                    className={`w-full mt-4 py-3 rounded-lg font-medium relative overflow-hidden group transition-colors ${
                      isSubmitting || !isFormValid()
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#FF385C] hover:bg-[#E31C5F]"
                    } text-white`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          {t.updating}
                        </>
                      ) : (
                        <>
                          <EditIcon className="w-5 h-5" />
                          {t.updateUser}
                        </>
                      )}
                    </span>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};