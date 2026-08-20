// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-hooks/set-state-in-effect */
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import axios from "axios";
// import {
//   People as PeopleIcon,
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Close as CloseIcon,
//   CheckCircle as CheckCircleIcon,
//   Error as ErrorIcon,
//   LinkedIn as LinkedInIcon,
//   Twitter as TwitterIcon,
//   Image as ImageIcon,
//   Person as PersonIcon,
//   Work as WorkIcon,
//   Description as DescriptionIcon,
//   Save as SaveIcon,
//   Refresh as RefreshIcon,
//   Visibility as VisibilityIcon,
//   Email as EmailIcon,
//   CalendarToday as CalendarTodayIcon,
// } from "@mui/icons-material";

// // ============================================
// // TYPES
// // ============================================
// interface TeamMember {
//   _id?: string;
//   name: string;
//   role: string;
//   bio: string;
//   image: {
//     public_id: string;
//     url: string;
//     secure_url: string;
//   };
//   social: {
//     linkedin: string;
//     twitter: string;
//   };
//   createdAt?: string;
//   updatedAt?: string;
// }

// interface TeamMemberFormData {
//   name: string;
//   role: string;
//   bio: string;
//   image: File | null;
//   imagePreview: string;
//   social: {
//     linkedin: string;
//     twitter: string;
//   };
// }

// interface TeamMemberResponse {
//   success: boolean;
//   data?: TeamMember | TeamMember[];
//   message?: string;
//   error?: string;
// }

// // ============================================
// // API CONFIGURATION
// // ============================================
// const API_BASE_URL = "https://rene-inyumba-nodejs.onrender.com";

// const axiosInstance = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "multipart/form-data",
//   },
// });

// // ============================================
// // TEAM MEMBER MODEL
// // ============================================
// class TeamMemberModel {
//   private handleError(error: unknown): never {
//     if (axios.isAxiosError(error)) {
//       const message =
//         error.response?.data?.message ||
//         error.response?.data?.error ||
//         error.message;
//       throw new Error(message);
//     }
//     if (error instanceof Error) {
//       throw error;
//     }
//     throw new Error("An unknown error occurred");
//   }

//   async getAll(): Promise<TeamMember[]> {
//     try {
//       const response = await axiosInstance.get("/team");
//       const result = response.data as TeamMemberResponse;

//       if (result.success && result.data) {
//         return Array.isArray(result.data) ? result.data : [result.data];
//       }
//       return [];
//     } catch (error) {
//       this.handleError(error);
//     }
//   }

//   async getById(id: string): Promise<TeamMember | null> {
//     try {
//       const response = await axiosInstance.get(`/team/${id}`);
//       const result = response.data as TeamMemberResponse;

//       if (result.success && result.data) {
//         return Array.isArray(result.data) ? result.data[0] : result.data;
//       }
//       return null;
//     } catch (error) {
//       this.handleError(error);
//     }
//   }

//   async create(data: TeamMemberFormData): Promise<TeamMember> {
//     try {
//       const formData = new FormData();
//       formData.append("name", data.name);
//       formData.append("role", data.role);
//       formData.append("bio", data.bio);
//       formData.append("social[linkedin]", data.social.linkedin || "");
//       formData.append("social[twitter]", data.social.twitter || "");

//       if (data.image) {
//         formData.append("image", data.image);
//       }

//       const response = await axiosInstance.post("/team", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       const result = response.data as TeamMemberResponse;

//       if (!result.success || !result.data) {
//         throw new Error(result.message || "Failed to create team member");
//       }

//       return Array.isArray(result.data) ? result.data[0] : result.data;
//     } catch (error) {
//       this.handleError(error);
//     }
//   }

//   async update(id: string, data: TeamMemberFormData): Promise<TeamMember> {
//     try {
//       const formData = new FormData();
//       formData.append("name", data.name);
//       formData.append("role", data.role);
//       formData.append("bio", data.bio);
//       formData.append("social[linkedin]", data.social.linkedin || "");
//       formData.append("social[twitter]", data.social.twitter || "");

//       if (data.image) {
//         formData.append("image", data.image);
//       }

//       const response = await axiosInstance.put(`/team/${id}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       const result = response.data as TeamMemberResponse;

//       if (!result.success || !result.data) {
//         throw new Error(result.message || "Failed to update team member");
//       }

//       return Array.isArray(result.data) ? result.data[0] : result.data;
//     } catch (error) {
//       this.handleError(error);
//     }
//   }

//   async delete(id: string): Promise<void> {
//     try {
//       const response = await axiosInstance.delete(`/team/${id}`);
//       const result = response.data as TeamMemberResponse;

//       if (!result.success) {
//         throw new Error(result.message || "Failed to delete team member");
//       }
//     } catch (error) {
//       this.handleError(error);
//     }
//   }

//   validateForm(
//     data: TeamMemberFormData,
//     editingMember: TeamMember | null = null,
//   ): Record<string, string> {
//     const errors: Record<string, string> = {};

//     if (!data.name.trim()) {
//       errors.name = "Name is required";
//     } else if (data.name.trim().length < 2) {
//       errors.name = "Name must be at least 2 characters";
//     }

//     if (!data.role.trim()) {
//       errors.role = "Role is required";
//     }

//     if (!data.bio.trim()) {
//       errors.bio = "Bio is required";
//     } else if (data.bio.trim().length < 10) {
//       errors.bio = "Bio must be at least 10 characters";
//     }

//     // Image validation - only required if not editing or if editing and no existing image
//     if (!editingMember && !data.image) {
//       errors.image = "Profile image is required";
//     }

//     if (
//       data.social.linkedin &&
//       !data.social.linkedin.match(/^https?:\/\/[^\s]+$/)
//     ) {
//       errors.linkedin = "Invalid LinkedIn URL";
//     }

//     if (
//       data.social.twitter &&
//       !data.social.twitter.match(/^https?:\/\/[^\s]+$/)
//     ) {
//       errors.twitter = "Invalid Twitter URL";
//     }

//     return errors;
//   }
// }

// // ============================================
// // CUSTOM HOOK
// // ============================================
// const useTeamMember = () => {
//   const [members, setMembers] = useState<TeamMember[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

//   const model = new TeamMemberModel();

//   const loadMembers = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await model.getAll();
//       setMembers(data);
//     } catch (err) {
//       const message =
//         err instanceof Error ? err.message : "Failed to load team members";
//       setError(message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const createMember = useCallback(
//     async (data: TeamMemberFormData): Promise<TeamMember> => {
//       try {
//         setIsSubmitting(true);
//         setError(null);
//         const newMember = await model.create(data);
//         setMembers((prev) => [...prev, newMember]);
//         return newMember;
//       } catch (err) {
//         const message =
//           err instanceof Error ? err.message : "Failed to create team member";
//         setError(message);
//         throw err;
//       } finally {
//         setIsSubmitting(false);
//       }
//     },
//     [],
//   );

//   const updateMember = useCallback(
//     async (id: string, data: TeamMemberFormData): Promise<TeamMember> => {
//       try {
//         setIsSubmitting(true);
//         setError(null);
//         const updatedMember = await model.update(id, data);
//         setMembers((prev) =>
//           prev.map((m) => (m._id === updatedMember._id ? updatedMember : m)),
//         );
//         return updatedMember;
//       } catch (err) {
//         const message =
//           err instanceof Error ? err.message : "Failed to update team member";
//         setError(message);
//         throw err;
//       } finally {
//         setIsSubmitting(false);
//       }
//     },
//     [],
//   );

//   const deleteMember = useCallback(async (id: string): Promise<void> => {
//     try {
//       setIsSubmitting(true);
//       setError(null);
//       await model.delete(id);
//       setMembers((prev) => prev.filter((m) => m._id !== id));
//     } catch (err) {
//       const message =
//         err instanceof Error ? err.message : "Failed to delete team member";
//       setError(message);
//       throw err;
//     } finally {
//       setIsSubmitting(false);
//     }
//   }, []);

//   const validateForm = useCallback(
//     (
//       data: TeamMemberFormData,
//       editingMember: TeamMember | null = null,
//     ): Record<string, string> => {
//       return model.validateForm(data, editingMember);
//     },
//     [],
//   );

//   useEffect(() => {
//     loadMembers();
//   }, [loadMembers]);

//   return {
//     members,
//     loading,
//     error,
//     isSubmitting,
//     loadMembers,
//     createMember,
//     updateMember,
//     deleteMember,
//     validateForm,
//   };
// };

// // ============================================
// // SVG COMPONENTS
// // ============================================
// const SuccessSVG = () => (
//   <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
//     <CheckCircleIcon className="w-6 h-6 text-green-600" />
//   </div>
// );

// const ErrorSVG = () => (
//   <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full">
//     <ErrorIcon className="w-6 h-6 text-red-600" />
//   </div>
// );

// // ============================================
// // VALIDATION INDICATOR COMPONENT
// // ============================================
// interface ValidationIndicatorProps {
//   field: string;
//   formErrors: Record<string, string>;
//   formData: TeamMemberFormData;
//   editingMember: TeamMember | null;
// }

// const ValidationIndicator: React.FC<ValidationIndicatorProps> = ({
//   field,
//   formErrors,
//   formData,
//   editingMember,
// }) => {
//   const error = formErrors[field];

//   if (field === "image") {
//     if (!formData.imagePreview && !editingMember) return null;
//     return (
//       <div className="flex items-center mt-1 text-sm">
//         {error ? (
//           <>
//             <ErrorIcon className="w-4 h-4 text-red-500 mr-1" />
//             <span className="text-red-500">{error}</span>
//           </>
//         ) : (
//           <div className="flex items-center text-green-500">
//             <CheckCircleIcon className="w-4 h-4 mr-1" />
//             <span>Valid</span>
//           </div>
//         )}
//       </div>
//     );
//   }

//   // For social fields, only show if there's a value
//   if (
//     (field === "linkedin" || field === "twitter") &&
//     !formData.social[field as keyof typeof formData.social]
//   ) {
//     return null;
//   }

//   const value = formData[field as keyof TeamMemberFormData];
//   if (!value && field !== "linkedin" && field !== "twitter") return null;

//   return (
//     <div className="flex items-center mt-1 text-sm">
//       {error ? (
//         <>
//           <ErrorIcon className="w-4 h-4 text-red-500 mr-1" />
//           <span className="text-red-500">{error}</span>
//         </>
//       ) : (
//         <div className="flex items-center text-green-500">
//           <CheckCircleIcon className="w-4 h-4 mr-1" />
//           <span>Valid</span>
//         </div>
//       )}
//     </div>
//   );
// };

// // ============================================
// // VIEW MODAL COMPONENT
// // ============================================
// interface ViewModalProps {
//   member: TeamMember | null;
//   isOpen: boolean;
//   onClose: () => void;
//   onEdit: () => void;
//   onDelete: () => void;
// }

// const ViewModal: React.FC<ViewModalProps> = ({
//   member,
//   isOpen,
//   onClose,
//   onEdit,
//   onDelete,
// }) => {
//   if (!isOpen || !member) return null;

//   const formatDate = (dateString?: string) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     }).format(date);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10 rounded-t-xl">
//           <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//             <VisibilityIcon className="w-6 h-6 text-indigo-600" />
//             Team Member Details
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//           >
//             <CloseIcon className="w-6 h-6 text-gray-500" />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           {/* Profile Image */}
//           <div className="flex justify-center mb-6">
//             <div className="relative">
//               <img
//                 src={member.image?.url || member.image?.secure_url}
//                 alt={member.name}
//                 className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100 shadow-lg"
//                 onError={(e) => {
//                   (e.target as HTMLImageElement).src =
//                     `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                       member.name,
//                     )}&size=150&background=indigo&color=fff&font-size=0.5`;
//                 }}
//               />
//               <div className="absolute -bottom-2 -right-2 bg-indigo-100 rounded-full p-2 border-4 border-white">
//                 <PersonIcon className="w-4 h-4 text-indigo-600" />
//               </div>
//             </div>
//           </div>

//           {/* Name & Role */}
//           <div className="text-center mb-6">
//             <h3 className="text-2xl font-bold text-gray-800">{member.name}</h3>
//             <span className="inline-block px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mt-2">
//               {member.role}
//             </span>
//           </div>

//           {/* Bio */}
//           <div className="mb-6">
//             <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
//               Bio
//             </h4>
//             <div className="bg-gray-50 rounded-lg p-4">
//               <p className="text-gray-700 leading-relaxed">{member.bio}</p>
//             </div>
//           </div>

//           {/* Social Links */}
//           {(member.social?.linkedin || member.social?.twitter) && (
//             <div className="mb-6">
//               <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
//                 Social Links
//               </h4>
//               <div className="flex gap-4">
//                 {member.social?.linkedin && member.social.linkedin !== "#" && (
//                   <a
//                     href={member.social.linkedin}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
//                   >
//                     <LinkedInIcon className="w-5 h-5" />
//                     LinkedIn
//                   </a>
//                 )}
//                 {member.social?.twitter && member.social.twitter !== "#" && (
//                   <a
//                     href={member.social.twitter}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center gap-2 px-4 py-2 bg-sky-50 text-sky-600 rounded-lg hover:bg-sky-100 transition-colors"
//                   >
//                     <TwitterIcon className="w-5 h-5" />
//                     Twitter
//                   </a>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Meta Info */}
//           <div className="border-t border-gray-100 pt-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
//               <div className="flex items-center gap-2 text-gray-500">
//                 <CalendarTodayIcon className="w-4 h-4" />
//                 <span>Created: {formatDate(member.createdAt)}</span>
//               </div>
//               <div className="flex items-center gap-2 text-gray-500">
//                 <RefreshIcon className="w-4 h-4" />
//                 <span>Updated: {formatDate(member.updatedAt)}</span>
//               </div>
//               <div className="flex items-center gap-2 text-gray-500">
//                 <EmailIcon className="w-4 h-4" />
//                 <span>ID: {member._id?.slice(0, 12)}...</span>
//               </div>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
//             <button
//               onClick={onClose}
//               className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               Close
//             </button>
//             <button
//               onClick={onEdit}
//               className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//             >
//               <EditIcon className="w-4 h-4" />
//               Edit
//             </button>
//             <button
//               onClick={onDelete}
//               className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//             >
//               <DeleteIcon className="w-4 h-4" />
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============================================
// // MAIN COMPONENT
// // ============================================
// export const TeamMemberManagement: React.FC = () => {
//   // Use the custom hook
//   const {
//     members,
//     loading,
//     error,
//     createMember,
//     updateMember,
//     deleteMember,
//     validateForm,
//   } = useTeamMember();

//   // Local state
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
//   const [viewingMember, setViewingMember] = useState<TeamMember | null>(null);
//   const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
//   const [deletingMemberId, setDeletingMemberId] = useState<string | null>(null);
//   const [formData, setFormData] = useState<TeamMemberFormData>({
//     name: "",
//     role: "",
//     bio: "",
//     image: null,
//     imagePreview: "",
//     social: {
//       linkedin: "",
//       twitter: "",
//     },
//   });
//   const [formErrors, setFormErrors] = useState<Record<string, string>>({});
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [notification, setNotification] = useState<{
//     type: "success" | "error";
//     message: string;
//     visible: boolean;
//   }>({ type: "success", message: "", visible: false });
//   const [isFormValid, setIsFormValid] = useState<boolean>(false);

//   // Refs
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Check form validity
//   useEffect(() => {
//     const errors = validateForm(formData, editingMember);
//     setFormErrors(errors);
//     setIsFormValid(Object.keys(errors).length === 0);
//   }, [formData, editingMember, validateForm]);

//   const showNotification = (type: "success" | "error", message: string) => {
//     setNotification({ type, message, visible: true });
//     setTimeout(() => {
//       setNotification((prev) => ({ ...prev, visible: false }));
//     }, 5000);
//   };

//   const handleOpenModal = (member?: TeamMember) => {
//     if (member) {
//       setEditingMember(member);
//       setFormData({
//         name: member.name,
//         role: member.role,
//         bio: member.bio,
//         image: null,
//         imagePreview: member.image.url,
//         social: member.social,
//       });
//     } else {
//       setEditingMember(null);
//       setFormData({
//         name: "",
//         role: "",
//         bio: "",
//         image: null,
//         imagePreview: "",
//         social: {
//           linkedin: "",
//           twitter: "",
//         },
//       });
//     }
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setEditingMember(null);
//     setFormData({
//       name: "",
//       role: "",
//       bio: "",
//       image: null,
//       imagePreview: "",
//       social: {
//         linkedin: "",
//         twitter: "",
//       },
//     });
//     setFormErrors({});
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const handleViewMember = (member: TeamMember) => {
//     setViewingMember(member);
//     setIsViewModalOpen(true);
//   };

//   const handleCloseViewModal = () => {
//     setIsViewModalOpen(false);
//     setViewingMember(null);
//   };

//   const handleEditFromView = () => {
//     if (viewingMember) {
//       handleCloseViewModal();
//       handleOpenModal(viewingMember);
//     }
//   };

//   const handleDeleteFromView = () => {
//     if (viewingMember?._id) {
//       setDeletingMemberId(viewingMember._id);
//       setIsDeleteModalOpen(true);
//       handleCloseViewModal();
//     }
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     const { name, value } = e.target;

//     if (name.includes(".")) {
//       const [parent, child] = name.split(".");
//       setFormData((prev) => ({
//         ...prev,
//         [parent]: {
//           ...(prev[parent as keyof TeamMemberFormData] as Record<
//             string,
//             string
//           >),
//           [child]: value,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       // Validate file size (max 5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         setFormErrors((prev) => ({
//           ...prev,
//           image: "Image size should be less than 5MB",
//         }));
//         return;
//       }

//       // Validate file type
//       if (!file.type.startsWith("image/")) {
//         setFormErrors((prev) => ({ ...prev, image: "File must be an image" }));
//         return;
//       }

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData((prev) => ({
//           ...prev,
//           image: file,
//           imagePreview: reader.result as string,
//         }));
//         // Clear image error if it exists
//         if (formErrors.image) {
//           setFormErrors((prev) => {
//             const newErrors = { ...prev };
//             delete newErrors.image;
//             return newErrors;
//           });
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleRemoveImage = () => {
//     setFormData((prev) => ({
//       ...prev,
//       image: null,
//       imagePreview: "",
//     }));
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const errors = validateForm(formData, editingMember);
//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       if (editingMember) {
//         await updateMember(editingMember._id!, formData);
//         showNotification("success", "Team member updated successfully!");
//       } else {
//         await createMember(formData);
//         showNotification("success", "Team member added successfully!");
//       }
//       handleCloseModal();
//     } catch (err) {
//       const message =
//         err instanceof Error ? err.message : "Failed to save team member";
//       showNotification("error", message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!deletingMemberId) return;

//     setIsSubmitting(true);
//     try {
//       await deleteMember(deletingMemberId);
//       showNotification("success", "Team member deleted successfully!");
//       setIsDeleteModalOpen(false);
//       setDeletingMemberId(null);
//     } catch (err) {
//       const message =
//         err instanceof Error ? err.message : "Failed to delete team member";
//       showNotification("error", message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading team members...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="text-center">
//           <ErrorIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">
//             Error Loading Team Members
//           </h3>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
//       {/* Notification */}
//       {notification.visible && (
//         <div
//           className={`fixed top-4 right-4 z-50 flex items-center gap-3 p-4 rounded-lg shadow-lg transform transition-all duration-500 ${
//             notification.type === "success"
//               ? "bg-green-50 border border-green-200"
//               : "bg-red-50 border border-red-200"
//           }`}
//         >
//           {notification.type === "success" ? <SuccessSVG /> : <ErrorSVG />}
//           <div>
//             <h3
//               className={`font-semibold ${notification.type === "success" ? "text-green-800" : "text-red-800"}`}
//             >
//               {notification.type === "success" ? "Success!" : "Error!"}
//             </h3>
//             <p
//               className={`text-sm ${notification.type === "success" ? "text-green-600" : "text-red-600"}`}
//             >
//               {notification.message}
//             </p>
//           </div>
//           <button
//             onClick={() =>
//               setNotification((prev) => ({ ...prev, visible: false }))
//             }
//             className="ml-4 text-gray-400 hover:text-gray-600"
//           >
//             <CloseIcon className="w-5 h-5" />
//           </button>
//         </div>
//       )}

//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
//               <PeopleIcon className="w-8 h-8 text-indigo-600" />
//               Team Management
//             </h1>
//             <p className="text-gray-500 mt-1">
//               Manage your team members and their information
//             </p>
//           </div>
//           <button
//             onClick={() => handleOpenModal()}
//             className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-md"
//           >
//             <AddIcon className="w-5 h-5" />
//             Add Member
//           </button>
//         </div>

//         {/* Team Members Grid */}
//         {members.length === 0 ? (
//           <div className="bg-white rounded-xl shadow-lg p-12 text-center">
//             <PeopleIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-gray-600 mb-2">
//               No Team Members Yet
//             </h3>
//             <p className="text-gray-500 mb-4">
//               Start building your team by adding the first member.
//             </p>
//             <button
//               onClick={() => handleOpenModal()}
//               className="inline-flex items-center gap-2 px-4 py-2 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
//             >
//               <AddIcon className="w-5 h-5" />
//               Add Your First Member
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {members.map((member) => (
//               <div
//                 key={member._id}
//                 className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
//               >
//                 <div className="relative h-48 bg-gradient-to-r from-indigo-500 to-purple-600">
//                   <img
//                     src={member.image.url}
//                     alt={member.name}
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute inset-0 bg-opacity-20 flex items-end p-4">
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => handleViewMember(member)}
//                         className="p-2 bg-white rounded-full hover:bg-indigo-50 transition-colors shadow-md"
//                         title="View Details"
//                       >
//                         <VisibilityIcon className="w-4 h-4 text-indigo-600" />
//                       </button>
//                       <button
//                         onClick={() => handleOpenModal(member)}
//                         className="p-2 bg-white rounded-full hover:bg-indigo-50 transition-colors shadow-md"
//                         title="Edit"
//                       >
//                         <EditIcon className="w-4 h-4 text-indigo-600" />
//                       </button>
//                       <button
//                         onClick={() => {
//                           setDeletingMemberId(member._id!);
//                           setIsDeleteModalOpen(true);
//                         }}
//                         className="p-2 bg-white rounded-full hover:bg-red-50 transition-colors shadow-md"
//                         title="Delete"
//                       >
//                         <DeleteIcon className="w-4 h-4 text-red-600" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold text-gray-800">
//                     {member.name}
//                   </h3>
//                   <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mt-1 mb-2">
//                     {member.role}
//                   </span>
//                   <p className="text-gray-600 text-sm mt-2 line-clamp-2">
//                     {member.bio}
//                   </p>
//                   <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
//                     {member.social.linkedin &&
//                       member.social.linkedin !== "#" && (
//                         <a
//                           href={member.social.linkedin}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-gray-400 hover:text-indigo-600 transition-colors"
//                         >
//                           <LinkedInIcon className="w-5 h-5" />
//                         </a>
//                       )}
//                     {member.social.twitter && member.social.twitter !== "#" && (
//                       <a
//                         href={member.social.twitter}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-gray-400 hover:text-indigo-600 transition-colors"
//                       >
//                         <TwitterIcon className="w-5 h-5" />
//                       </a>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* View Modal */}
//         <ViewModal
//           member={viewingMember}
//           isOpen={isViewModalOpen}
//           onClose={handleCloseViewModal}
//           onEdit={handleEditFromView}
//           onDelete={handleDeleteFromView}
//         />

//         {/* Create/Edit Modal */}
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
//                 <h2 className="text-2xl font-bold text-gray-800">
//                   {editingMember ? "Edit Team Member" : "Add Team Member"}
//                 </h2>
//                 <button
//                   onClick={handleCloseModal}
//                   className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                 >
//                   <CloseIcon className="w-6 h-6 text-gray-500" />
//                 </button>
//               </div>
//               <form onSubmit={handleSubmit} className="p-6 space-y-6">
//                 {/* Name */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Name <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all ${
//                         formErrors.name ? "border-red-500" : "border-gray-300"
//                       }`}
//                       placeholder="Enter full name"
//                     />
//                     <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                       {formData.name &&
//                         (formErrors.name ? (
//                           <ErrorIcon className="w-5 h-5 text-red-500" />
//                         ) : (
//                           <CheckCircleIcon className="w-5 h-5 text-green-500" />
//                         ))}
//                     </div>
//                   </div>
//                   <ValidationIndicator
//                     field="name"
//                     formErrors={formErrors}
//                     formData={formData}
//                     editingMember={editingMember}
//                   />
//                 </div>

//                 {/* Role */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Role <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <WorkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="text"
//                       name="role"
//                       value={formData.role}
//                       onChange={handleInputChange}
//                       className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all ${
//                         formErrors.role ? "border-red-500" : "border-gray-300"
//                       }`}
//                       placeholder="e.g., CEO, Developer"
//                     />
//                     <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                       {formData.role &&
//                         (formErrors.role ? (
//                           <ErrorIcon className="w-5 h-5 text-red-500" />
//                         ) : (
//                           <CheckCircleIcon className="w-5 h-5 text-green-500" />
//                         ))}
//                     </div>
//                   </div>
//                   <ValidationIndicator
//                     field="role"
//                     formErrors={formErrors}
//                     formData={formData}
//                     editingMember={editingMember}
//                   />
//                 </div>

//                 {/* Bio */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Bio <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <DescriptionIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
//                     <textarea
//                       name="bio"
//                       value={formData.bio}
//                       onChange={handleInputChange}
//                       rows={4}
//                       className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none ${
//                         formErrors.bio ? "border-red-500" : "border-gray-300"
//                       }`}
//                       placeholder="Write a brief bio..."
//                     />
//                     <div className="absolute right-3 top-3">
//                       {formData.bio &&
//                         (formErrors.bio ? (
//                           <ErrorIcon className="w-5 h-5 text-red-500" />
//                         ) : (
//                           <CheckCircleIcon className="w-5 h-5 text-green-500" />
//                         ))}
//                     </div>
//                   </div>
//                   <ValidationIndicator
//                     field="bio"
//                     formErrors={formErrors}
//                     formData={formData}
//                     editingMember={editingMember}
//                   />
//                 </div>

//                 {/* Image Upload */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Profile Image <span className="text-red-500">*</span>
//                   </label>
//                   <div className="flex items-center gap-4">
//                     <div className="flex-1">
//                       <input
//                         type="file"
//                         ref={fileInputRef}
//                         onChange={handleImageUpload}
//                         accept="image/*"
//                         className="hidden"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => fileInputRef.current?.click()}
//                         className={`w-full px-4 py-2 border-2 border-dashed rounded-lg transition-colors flex items-center justify-center gap-2 ${
//                           formErrors.image
//                             ? "border-red-500"
//                             : "border-gray-300 hover:border-indigo-500"
//                         }`}
//                       >
//                         <ImageIcon className="w-5 h-5 text-gray-400" />
//                         <span className="text-gray-600">
//                           {formData.imagePreview
//                             ? "Change Image"
//                             : "Upload Image"}
//                         </span>
//                       </button>
//                     </div>
//                     {formData.imagePreview && (
//                       <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
//                         <img
//                           src={formData.imagePreview}
//                           alt="Preview"
//                           className="w-full h-full object-cover"
//                         />
//                         <button
//                           type="button"
//                           onClick={handleRemoveImage}
//                           className="absolute -top-1 -right-1 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
//                         >
//                           <CloseIcon className="w-3 h-3" />
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                   <ValidationIndicator
//                     field="image"
//                     formErrors={formErrors}
//                     formData={formData}
//                     editingMember={editingMember}
//                   />
//                   <p className="text-xs text-gray-500 mt-1">
//                     Max file size: 5MB. Supported formats: JPEG, PNG, GIF
//                   </p>
//                 </div>

//                 {/* Social Links */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       LinkedIn URL
//                     </label>
//                     <div className="relative">
//                       <LinkedInIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                       <input
//                         type="url"
//                         name="social.linkedin"
//                         value={formData.social.linkedin}
//                         onChange={handleInputChange}
//                         className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all ${
//                           formErrors.linkedin
//                             ? "border-red-500"
//                             : "border-gray-300"
//                         }`}
//                         placeholder="https://linkedin.com/in/username"
//                       />
//                     </div>
//                     <ValidationIndicator
//                       field="linkedin"
//                       formErrors={formErrors}
//                       formData={formData}
//                       editingMember={editingMember}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Twitter URL
//                     </label>
//                     <div className="relative">
//                       <TwitterIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                       <input
//                         type="url"
//                         name="social.twitter"
//                         value={formData.social.twitter}
//                         onChange={handleInputChange}
//                         className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all ${
//                           formErrors.twitter
//                             ? "border-red-500"
//                             : "border-gray-300"
//                         }`}
//                         placeholder="https://twitter.com/username"
//                       />
//                     </div>
//                     <ValidationIndicator
//                       field="twitter"
//                       formErrors={formErrors}
//                       formData={formData}
//                       editingMember={editingMember}
//                     />
//                   </div>
//                 </div>

//                 {/* Submit */}
//                 <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
//                   <button
//                     type="button"
//                     onClick={handleCloseModal}
//                     className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={!isFormValid || isSubmitting}
//                     className={`flex items-center gap-2 px-6 py-2 rounded-lg text-white transition-all ${
//                       isFormValid && !isSubmitting
//                         ? "bg-indigo-600 hover:bg-indigo-700"
//                         : "bg-gray-400 cursor-not-allowed"
//                     }`}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <RefreshIcon className="w-5 h-5 animate-spin" />
//                         Saving...
//                       </>
//                     ) : (
//                       <>
//                         <SaveIcon className="w-5 h-5" />
//                         {editingMember ? "Update" : "Create"}
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Delete Confirmation Modal */}
//         {isDeleteModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
//               <div className="flex items-center justify-center mb-4">
//                 <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
//                   <DeleteIcon className="w-8 h-8 text-red-600" />
//                 </div>
//               </div>
//               <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
//                 Delete Team Member
//               </h3>
//               <p className="text-gray-600 text-center mb-6">
//                 Are you sure you want to delete this team member? This action
//                 cannot be undone.
//               </p>
//               <div className="flex justify-center gap-3">
//                 <button
//                   onClick={() => {
//                     setIsDeleteModalOpen(false);
//                     setDeletingMemberId(null);
//                   }}
//                   className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   disabled={isSubmitting}
//                   className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <RefreshIcon className="w-5 h-5 animate-spin" />
//                       Deleting...
//                     </>
//                   ) : (
//                     <>
//                       <DeleteIcon className="w-5 h-5" />
//                       Delete
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };


/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import {
  People as PeopleIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Image as ImageIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  Description as DescriptionIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
  Visibility as VisibilityIcon,
  Email as EmailIcon,
  CalendarToday as CalendarTodayIcon,
} from "@mui/icons-material";

// ============================================
// TYPES
// ============================================
interface TeamMember {
  _id?: string;
  name: string;
  role: string;
  bio: string;
  image: {
    public_id: string;
    url: string;
    secure_url: string;
  };
  social: {
    linkedin: string;
    twitter: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

interface TeamMemberFormData {
  name: string;
  role: string;
  bio: string;
  image: File | null;
  imagePreview: string;
  social: {
    linkedin: string;
    twitter: string;
  };
}

interface TeamMemberResponse {
  success: boolean;
  data?: TeamMember | TeamMember[];
  message?: string;
  error?: string;
}

// ============================================
// API CONFIGURATION
// ============================================
const API_BASE_URL = "https://rene-inyumba-nodejs.onrender.com";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// ============================================
// TEAM MEMBER MODEL
// ============================================
class TeamMemberModel {
  private handleError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message;
      throw new Error(message);
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unknown error occurred");
  }

  async getAll(): Promise<TeamMember[]> {
    try {
      const response = await axiosInstance.get("/team");
      const result = response.data as TeamMemberResponse;

      if (result.success && result.data) {
        return Array.isArray(result.data) ? result.data : [result.data];
      }
      return [];
    } catch (error) {
      this.handleError(error);
    }
  }

  async getById(id: string): Promise<TeamMember | null> {
    try {
      const response = await axiosInstance.get(`/team/${id}`);
      const result = response.data as TeamMemberResponse;

      if (result.success && result.data) {
        return Array.isArray(result.data) ? result.data[0] : result.data;
      }
      return null;
    } catch (error) {
      this.handleError(error);
    }
  }

  async create(data: TeamMemberFormData): Promise<TeamMember> {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("role", data.role);
      formData.append("bio", data.bio);
      formData.append("social[linkedin]", data.social.linkedin || "");
      formData.append("social[twitter]", data.social.twitter || "");

      if (data.image) {
        formData.append("image", data.image);
      }

      const response = await axiosInstance.post("/team", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = response.data as TeamMemberResponse;

      if (!result.success || !result.data) {
        throw new Error(result.message || "Failed to create team member");
      }

      return Array.isArray(result.data) ? result.data[0] : result.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: string, data: TeamMemberFormData): Promise<TeamMember> {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("role", data.role);
      formData.append("bio", data.bio);
      formData.append("social[linkedin]", data.social.linkedin || "");
      formData.append("social[twitter]", data.social.twitter || "");

      if (data.image) {
        formData.append("image", data.image);
      }

      const response = await axiosInstance.put(`/team/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = response.data as TeamMemberResponse;

      if (!result.success || !result.data) {
        throw new Error(result.message || "Failed to update team member");
      }

      return Array.isArray(result.data) ? result.data[0] : result.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const response = await axiosInstance.delete(`/team/${id}`);
      const result = response.data as TeamMemberResponse;

      if (!result.success) {
        throw new Error(result.message || "Failed to delete team member");
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  validateForm(
    data: TeamMemberFormData,
    editingMember: TeamMember | null = null,
  ): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!data.name.trim()) {
      errors.name = "Name is required";
    } else if (data.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!data.role.trim()) {
      errors.role = "Role is required";
    }

    if (!data.bio.trim()) {
      errors.bio = "Bio is required";
    } else if (data.bio.trim().length < 10) {
      errors.bio = "Bio must be at least 10 characters";
    }

    // Image validation - only required if not editing or if editing and no existing image
    if (!editingMember && !data.image) {
      errors.image = "Profile image is required";
    }

    if (
      data.social.linkedin &&
      !data.social.linkedin.match(/^https?:\/\/[^\s]+$/)
    ) {
      errors.linkedin = "Invalid LinkedIn URL";
    }

    if (
      data.social.twitter &&
      !data.social.twitter.match(/^https?:\/\/[^\s]+$/)
    ) {
      errors.twitter = "Invalid Twitter URL";
    }

    return errors;
  }
}

// ============================================
// CUSTOM HOOK
// ============================================
const useTeamMember = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const model = new TeamMemberModel();

  const loadMembers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await model.getAll();
      setMembers(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load team members";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createMember = useCallback(
    async (data: TeamMemberFormData): Promise<TeamMember> => {
      try {
        setIsSubmitting(true);
        setError(null);
        const newMember = await model.create(data);
        setMembers((prev) => [...prev, newMember]);
        return newMember;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to create team member";
        setError(message);
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [],
  );

  const updateMember = useCallback(
    async (id: string, data: TeamMemberFormData): Promise<TeamMember> => {
      try {
        setIsSubmitting(true);
        setError(null);
        const updatedMember = await model.update(id, data);
        setMembers((prev) =>
          prev.map((m) => (m._id === updatedMember._id ? updatedMember : m)),
        );
        return updatedMember;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to update team member";
        setError(message);
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [],
  );

  const deleteMember = useCallback(async (id: string): Promise<void> => {
    try {
      setIsSubmitting(true);
      setError(null);
      await model.delete(id);
      setMembers((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete team member";
      setError(message);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const validateForm = useCallback(
    (
      data: TeamMemberFormData,
      editingMember: TeamMember | null = null,
    ): Record<string, string> => {
      return model.validateForm(data, editingMember);
    },
    [],
  );

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  return {
    members,
    loading,
    error,
    isSubmitting,
    loadMembers,
    createMember,
    updateMember,
    deleteMember,
    validateForm,
  };
};

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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
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
                  <PeopleIcon className="w-10 h-10" />
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
                  <RefreshIcon className="w-4 h-4 animate-spin" />
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

// ============================================
// VALIDATION INDICATOR COMPONENT
// ============================================
interface ValidationIndicatorProps {
  field: string;
  formErrors: Record<string, string>;
  formData: TeamMemberFormData;
  editingMember: TeamMember | null;
}

const ValidationIndicator: React.FC<ValidationIndicatorProps> = ({
  field,
  formErrors,
  formData,
  editingMember,
}) => {
  const error = formErrors[field];

  if (field === "image") {
    if (!formData.imagePreview && !editingMember) return null;
    return (
      <div className="flex items-center mt-1 text-sm">
        {error ? (
          <>
            <ErrorIcon className="w-4 h-4 text-red-500 mr-1" />
            <span className="text-red-500">{error}</span>
          </>
        ) : (
          <div className="flex items-center text-green-500">
            <CheckCircleIcon className="w-4 h-4 mr-1" />
            <span>Valid</span>
          </div>
        )}
      </div>
    );
  }

  // For social fields, only show if there's a value
  if (
    (field === "linkedin" || field === "twitter") &&
    !formData.social[field as keyof typeof formData.social]
  ) {
    return null;
  }

  const value = formData[field as keyof TeamMemberFormData];
  if (!value && field !== "linkedin" && field !== "twitter") return null;

  return (
    <div className="flex items-center mt-1 text-sm">
      {error ? (
        <>
          <ErrorIcon className="w-4 h-4 text-red-500 mr-1" />
          <span className="text-red-500">{error}</span>
        </>
      ) : (
        <div className="flex items-center text-green-500">
          <CheckCircleIcon className="w-4 h-4 mr-1" />
          <span>Valid</span>
        </div>
      )}
    </div>
  );
};

// ============================================
// VIEW MODAL COMPONENT
// ============================================
interface ViewModalProps {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ViewModal: React.FC<ViewModalProps> = ({
  member,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) => {
  if (!isOpen || !member) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10 rounded-t-xl">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <VisibilityIcon className="w-6 h-6 text-indigo-600" />
            Team Member Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <CloseIcon className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Profile Image */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src={member.image?.url || member.image?.secure_url}
                alt={member.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100 shadow-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      member.name,
                    )}&size=150&background=indigo&color=fff&font-size=0.5`;
                }}
              />
              <div className="absolute -bottom-2 -right-2 bg-indigo-100 rounded-full p-2 border-4 border-white">
                <PersonIcon className="w-4 h-4 text-indigo-600" />
              </div>
            </div>
          </div>

          {/* Name & Role */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">{member.name}</h3>
            <span className="inline-block px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mt-2">
              {member.role}
            </span>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Bio
            </h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed">{member.bio}</p>
            </div>
          </div>

          {/* Social Links */}
          {(member.social?.linkedin || member.social?.twitter) && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Social Links
              </h4>
              <div className="flex gap-4">
                {member.social?.linkedin && member.social.linkedin !== "#" && (
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <LinkedInIcon className="w-5 h-5" />
                    LinkedIn
                  </a>
                )}
                {member.social?.twitter && member.social.twitter !== "#" && (
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-sky-50 text-sky-600 rounded-lg hover:bg-sky-100 transition-colors"
                  >
                    <TwitterIcon className="w-5 h-5" />
                    Twitter
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Meta Info */}
          <div className="border-t border-gray-100 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <CalendarTodayIcon className="w-4 h-4" />
                <span>Created: {formatDate(member.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <RefreshIcon className="w-4 h-4" />
                <span>Updated: {formatDate(member.updatedAt)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <EmailIcon className="w-4 h-4" />
                <span>ID: {member._id?.slice(0, 12)}...</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <EditIcon className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={onDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <DeleteIcon className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
export const TeamMemberManagement: React.FC = () => {
  // Use the custom hook
  const {
    members,
    loading,
    error,
    createMember,
    updateMember,
    deleteMember,
    validateForm,
  } = useTeamMember();

  // Local state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [viewingMember, setViewingMember] = useState<TeamMember | null>(null);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [deletingMemberId, setDeletingMemberId] = useState<string | null>(null);
  const [formData, setFormData] = useState<TeamMemberFormData>({
    name: "",
    role: "",
    bio: "",
    image: null,
    imagePreview: "",
    social: {
      linkedin: "",
      twitter: "",
    },
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  // Modal states for success/error
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

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check form validity
  useEffect(() => {
    const errors = validateForm(formData, editingMember);
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  }, [formData, editingMember, validateForm]);

  const showSuccessModal = (title: string, message: string, details?: string) => {
    setSuccessModal({ isOpen: true, title, message, details });
  };

  const showErrorModal = (title: string, message: string, details?: string) => {
    setErrorModal({ isOpen: true, title, message, details });
  };

  const handleOpenModal = (member?: TeamMember) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        name: member.name,
        role: member.role,
        bio: member.bio,
        image: null,
        imagePreview: member.image.url,
        social: member.social,
      });
    } else {
      setEditingMember(null);
      setFormData({
        name: "",
        role: "",
        bio: "",
        image: null,
        imagePreview: "",
        social: {
          linkedin: "",
          twitter: "",
        },
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
    setFormData({
      name: "",
      role: "",
      bio: "",
      image: null,
      imagePreview: "",
      social: {
        linkedin: "",
        twitter: "",
      },
    });
    setFormErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleViewMember = (member: TeamMember) => {
    setViewingMember(member);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setViewingMember(null);
  };

  const handleEditFromView = () => {
    if (viewingMember) {
      handleCloseViewModal();
      handleOpenModal(viewingMember);
    }
  };

  const handleDeleteFromView = () => {
    if (viewingMember?._id) {
      setDeletingMemberId(viewingMember._id);
      setIsDeleteModalOpen(true);
      handleCloseViewModal();
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof TeamMemberFormData] as Record<
            string,
            string
          >),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFormErrors((prev) => ({
          ...prev,
          image: "Image size should be less than 5MB",
        }));
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setFormErrors((prev) => ({ ...prev, image: "File must be an image" }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: file,
          imagePreview: reader.result as string,
        }));
        // Clear image error if it exists
        if (formErrors.image) {
          setFormErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.image;
            return newErrors;
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
      imagePreview: "",
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm(formData, editingMember);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingMember) {
        const updated = await updateMember(editingMember._id!, formData);
        showSuccessModal(
          "Success!",
          "Team member updated successfully!",
          `${updated.name} has been updated.`
        );
      } else {
        const created = await createMember(formData);
        showSuccessModal(
          "Success!",
          "Team member added successfully!",
          `${created.name} has been added to the team.`
        );
      }
      handleCloseModal();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to save team member";
      showErrorModal("Error", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingMemberId) return;

    setIsSubmitting(true);
    try {
      await deleteMember(deletingMemberId);
      showSuccessModal(
        "Success!",
        "Team member deleted successfully!",
        "The team member has been removed from the team."
      );
      setIsDeleteModalOpen(false);
      setDeletingMemberId(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete team member";
      showErrorModal("Error", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading team members...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <ErrorIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Error Loading Team Members
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
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

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <PeopleIcon className="w-8 h-8 text-indigo-600" />
              Team Management
            </h1>
            <p className="text-gray-500 mt-1">
              Manage your team members and their information
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-md"
          >
            <AddIcon className="w-5 h-5" />
            Add Member
          </button>
        </div>

        {/* Team Members Grid */}
        {members.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <PeopleIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No Team Members Yet
            </h3>
            <p className="text-gray-500 mb-4">
              Start building your team by adding the first member.
            </p>
            <button
              onClick={() => handleOpenModal()}
              className="inline-flex items-center gap-2 px-4 py-2 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              <AddIcon className="w-5 h-5" />
              Add Your First Member
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
              <div
                key={member._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-48 bg-gradient-to-r from-indigo-500 to-purple-600">
                  <img
                    src={member.image.url}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-opacity-20 flex items-end p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewMember(member)}
                        className="p-2 bg-white rounded-full hover:bg-indigo-50 transition-colors shadow-md"
                        title="View Details"
                      >
                        <VisibilityIcon className="w-4 h-4 text-indigo-600" />
                      </button>
                      <button
                        onClick={() => handleOpenModal(member)}
                        className="p-2 bg-white rounded-full hover:bg-indigo-50 transition-colors shadow-md"
                        title="Edit"
                      >
                        <EditIcon className="w-4 h-4 text-indigo-600" />
                      </button>
                      <button
                        onClick={() => {
                          setDeletingMemberId(member._id!);
                          setIsDeleteModalOpen(true);
                        }}
                        className="p-2 bg-white rounded-full hover:bg-red-50 transition-colors shadow-md"
                        title="Delete"
                      >
                        <DeleteIcon className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800">
                    {member.name}
                  </h3>
                  <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mt-1 mb-2">
                    {member.role}
                  </span>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {member.bio}
                  </p>
                  <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                    {member.social.linkedin &&
                      member.social.linkedin !== "#" && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-indigo-600 transition-colors"
                        >
                          <LinkedInIcon className="w-5 h-5" />
                        </a>
                      )}
                    {member.social.twitter && member.social.twitter !== "#" && (
                      <a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-indigo-600 transition-colors"
                      >
                        <TwitterIcon className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View Modal */}
        <ViewModal
          member={viewingMember}
          isOpen={isViewModalOpen}
          onClose={handleCloseViewModal}
          onEdit={handleEditFromView}
          onDelete={handleDeleteFromView}
        />

        {/* Create/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingMember ? "Edit Team Member" : "Add Team Member"}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <CloseIcon className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all ${
                        formErrors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter full name"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {formData.name &&
                        (formErrors.name ? (
                          <ErrorIcon className="w-5 h-5 text-red-500" />
                        ) : (
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        ))}
                    </div>
                  </div>
                  <ValidationIndicator
                    field="name"
                    formErrors={formErrors}
                    formData={formData}
                    editingMember={editingMember}
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <WorkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all ${
                        formErrors.role ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="e.g., CEO, Developer"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {formData.role &&
                        (formErrors.role ? (
                          <ErrorIcon className="w-5 h-5 text-red-500" />
                        ) : (
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        ))}
                    </div>
                  </div>
                  <ValidationIndicator
                    field="role"
                    formErrors={formErrors}
                    formData={formData}
                    editingMember={editingMember}
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DescriptionIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none ${
                        formErrors.bio ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Write a brief bio..."
                    />
                    <div className="absolute right-3 top-3">
                      {formData.bio &&
                        (formErrors.bio ? (
                          <ErrorIcon className="w-5 h-5 text-red-500" />
                        ) : (
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        ))}
                    </div>
                  </div>
                  <ValidationIndicator
                    field="bio"
                    formErrors={formErrors}
                    formData={formData}
                    editingMember={editingMember}
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Image <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className={`w-full px-4 py-2 border-2 border-dashed rounded-lg transition-colors flex items-center justify-center gap-2 ${
                          formErrors.image
                            ? "border-red-500"
                            : "border-gray-300 hover:border-indigo-500"
                        }`}
                      >
                        <ImageIcon className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-600">
                          {formData.imagePreview
                            ? "Change Image"
                            : "Upload Image"}
                        </span>
                      </button>
                    </div>
                    {formData.imagePreview && (
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={formData.imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute -top-1 -right-1 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                        >
                          <CloseIcon className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                  <ValidationIndicator
                    field="image"
                    formErrors={formErrors}
                    formData={formData}
                    editingMember={editingMember}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Max file size: 5MB. Supported formats: JPEG, PNG, GIF
                  </p>
                </div>

                {/* Social Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn URL
                    </label>
                    <div className="relative">
                      <LinkedInIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="url"
                        name="social.linkedin"
                        value={formData.social.linkedin}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all ${
                          formErrors.linkedin
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    <ValidationIndicator
                      field="linkedin"
                      formErrors={formErrors}
                      formData={formData}
                      editingMember={editingMember}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Twitter URL
                    </label>
                    <div className="relative">
                      <TwitterIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="url"
                        name="social.twitter"
                        value={formData.social.twitter}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all ${
                          formErrors.twitter
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="https://twitter.com/username"
                      />
                    </div>
                    <ValidationIndicator
                      field="twitter"
                      formErrors={formErrors}
                      formData={formData}
                      editingMember={editingMember}
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg text-white transition-all ${
                      isFormValid && !isSubmitting
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshIcon className="w-5 h-5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <SaveIcon className="w-5 h-5" />
                        {editingMember ? "Update" : "Create"}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal - Using the new ConfirmModal */}
        <ConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeletingMemberId(null);
          }}
          onConfirm={handleDelete}
          title="Delete Team Member"
          message="Are you sure you want to delete this team member? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          isSubmitting={isSubmitting}
          type="danger"
          icon={<DeleteIcon className="w-10 h-10" />}
        />
      </div>
    </div>
  );
};