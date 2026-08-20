// /* eslint-disable no-useless-escape */
// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-hooks/set-state-in-effect */
// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import axios from 'axios';
// import { 
//   Star as StarIcon,
//   StarBorder as StarBorderIcon,
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Close as CloseIcon,
//   CheckCircle as CheckCircleIcon,
//   Error as ErrorIcon,
//   Image as ImageIcon,
//   Person as PersonIcon,
//   School as SchoolIcon,
//   LocationOn as LocationOnIcon,
//   Description as DescriptionIcon,
//   Save as SaveIcon,
//   Refresh as RefreshIcon,
//   Visibility as VisibilityIcon,
//   Email as EmailIcon,
//   CalendarToday as CalendarTodayIcon,
//   Home as HomeIcon,
//   Verified as VerifiedIcon,
//   CheckCircle as CheckCircleRoundedIcon,
//   Cancel as CancelIcon,
//   Pending as PendingIcon,
//   StarHalf as StarHalfIcon,
// } from '@mui/icons-material';

// // ============================================
// // TYPES
// // ============================================
// interface Testimonial {
//   _id?: string;
//   name: string;
//   university: string;
//   location: string;
//   rating: number;
//   title: string;
//   content: string;
//   houseName: string;
//   image: {
//     public_id: string;
//     url: string;
//     secure_url: string;
//   };
//   verified: boolean;
//   status: 'pending' | 'approved' | 'rejected';
//   email?: string;
//   featured: boolean;
//   date?: string;
//   createdAt?: string;
//   updatedAt?: string;
// }

// interface TestimonialFormData {
//   name: string;
//   university: string;
//   location: string;
//   rating: number;
//   title: string;
//   content: string;
//   houseName: string;
//   image: File | null;
//   imagePreview: string;
//   email: string;
//   verified: boolean;
//   status: 'pending' | 'approved' | 'rejected';
//   featured: boolean;
//   date: string;
// }

// interface ApiError {
//   field?: string;
//   message: string;
// }

// interface TestimonialResponse {
//   success: boolean;
//   data?: Testimonial | Testimonial[];
//   message?: string;
//   error?: string;
//   errors?: ApiError[];
// }

// // ============================================
// // API CONFIGURATION
// // ============================================
// const API_BASE_URL = 'https://rene-inyumba-nodejs.onrender.com';

// const axiosInstance = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'multipart/form-data',
//   },
// });

// // ============================================
// // TESTIMONIAL MODEL
// // ============================================
// class TestimonialModel {
//   private handleError(error: unknown): never {
//     if (axios.isAxiosError(error)) {
//       // Check for validation errors array
//       if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
//         const errorMessages = error.response.data.errors
//           .map((e: ApiError) => `${e.field}: ${e.message}`)
//           .join(', ');
//         throw new Error(errorMessages);
//       }
//       const message = error.response?.data?.message || error.response?.data?.error || error.message;
//       throw new Error(message);
//     }
//     if (error instanceof Error) {
//       throw error;
//     }
//     throw new Error('An unknown error occurred');
//   }

//   async getAll(): Promise<Testimonial[]> {
//     try {
//       const response = await axiosInstance.get('/testimonials');
//       const result = response.data as TestimonialResponse;
      
//       if (result.success && result.data) {
//         return Array.isArray(result.data) ? result.data : [result.data];
//       }
//       return [];
//     } catch (error) {
//       this.handleError(error);
//     }
//   }

//   async getById(id: string): Promise<Testimonial | null> {
//     try {
//       const response = await axiosInstance.get(`/testimonials/${id}`);
//       const result = response.data as TestimonialResponse;
      
//       if (result.success && result.data) {
//         return Array.isArray(result.data) ? result.data[0] : result.data;
//       }
//       return null;
//     } catch (error) {
//       this.handleError(error);
//     }
//   }

//   async create(data: TestimonialFormData): Promise<Testimonial> {
//     try {
//       const formData = new FormData();
//       formData.append('name', data.name);
//       formData.append('university', data.university);
//       formData.append('location', data.location);
//       formData.append('rating', data.rating.toString());
//       formData.append('title', data.title);
//       formData.append('content', data.content);
//       formData.append('houseName', data.houseName);
//       formData.append('email', data.email || '');
//       formData.append('date', data.date);
      
//       if (data.image) {
//         formData.append('image', data.image);
//       }

//       const response = await axiosInstance.post('/testimonials', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
      
//       const result = response.data as TestimonialResponse;
      
//       if (!result.success) {
//         // Handle validation errors
//         if (result.errors && Array.isArray(result.errors)) {
//           const errorMessages = result.errors
//             .map((e: ApiError) => `${e.field}: ${e.message}`)
//             .join(', ');
//           throw new Error(errorMessages);
//         }
//         throw new Error(result.message || 'Failed to create testimonial');
//       }
      
//       if (!result.data) {
//         throw new Error('No data returned from server');
//       }
      
//       return Array.isArray(result.data) ? result.data[0] : result.data;
//     } catch (error) {
//       this.handleError(error);
//     }
//   }

//   async update(id: string, data: TestimonialFormData): Promise<Testimonial> {
//     try {
//       const formData = new FormData();
//       formData.append('name', data.name);
//       formData.append('university', data.university);
//       formData.append('location', data.location);
//       formData.append('rating', data.rating.toString());
//       formData.append('title', data.title);
//       formData.append('content', data.content);
//       formData.append('houseName', data.houseName);
//       formData.append('email', data.email || '');
//       formData.append('verified', String(data.verified));
//       formData.append('status', data.status);
//       formData.append('featured', String(data.featured));
//       formData.append('date', data.date);
      
//       if (data.image) {
//         formData.append('image', data.image);
//       }

//       const response = await axiosInstance.put(`/testimonials/${id}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
      
//       const result = response.data as TestimonialResponse;
      
//       if (!result.success) {
//         if (result.errors && Array.isArray(result.errors)) {
//           const errorMessages = result.errors
//             .map((e: ApiError) => `${e.field}: ${e.message}`)
//             .join(', ');
//           throw new Error(errorMessages);
//         }
//         throw new Error(result.message || 'Failed to update testimonial');
//       }
      
//       if (!result.data) {
//         throw new Error('No data returned from server');
//       }
      
//       return Array.isArray(result.data) ? result.data[0] : result.data;
//     } catch (error) {
//       this.handleError(error);
//     }
//   }

//   async delete(id: string): Promise<void> {
//     try {
//       const response = await axiosInstance.delete(`/testimonials/${id}`);
//       const result = response.data as TestimonialResponse;
      
//       if (!result.success) {
//         throw new Error(result.message || 'Failed to delete testimonial');
//       }
//     } catch (error) {
//       this.handleError(error);
//     }
//   }

//   async updateStatus(id: string, status: 'pending' | 'approved' | 'rejected'): Promise<Testimonial> {
//     try {
//       const response = await axiosInstance.put(`/testimonials/${id}/status`, { status });
//       const result = response.data as TestimonialResponse;
      
//       if (!result.success) {
//         throw new Error(result.message || 'Failed to update testimonial status');
//       }
      
//       if (!result.data) {
//         throw new Error('No data returned from server');
//       }
      
//       return Array.isArray(result.data) ? result.data[0] : result.data;
//     } catch (error) {
//       this.handleError(error);
//     }
//   }

//   async toggleFeatured(id: string, featured: boolean): Promise<Testimonial> {
//     try {
//       const response = await axiosInstance.patch(`/testimonials/${id}/featured`, { featured });
//       const result = response.data as TestimonialResponse;
      
//       if (!result.success) {
//         throw new Error(result.message || 'Failed to update featured status');
//       }
      
//       if (!result.data) {
//         throw new Error('No data returned from server');
//       }
      
//       return Array.isArray(result.data) ? result.data[0] : result.data;
//     } catch (error) {
//       this.handleError(error);
//     }
//   }

//   validateForm(data: TestimonialFormData, editingItem: Testimonial | null = null): Record<string, string> {
//     const errors: Record<string, string> = {};
    
//     if (!data.name.trim()) {
//       errors.name = 'Name is required';
//     } else if (data.name.trim().length < 2) {
//       errors.name = 'Name must be at least 2 characters';
//     } else if (data.name.trim().length > 100) {
//       errors.name = 'Name cannot exceed 100 characters';
//     }
    
//     if (!data.university.trim()) {
//       errors.university = 'University is required';
//     } else if (data.university.trim().length < 2) {
//       errors.university = 'University must be at least 2 characters';
//     } else if (data.university.trim().length > 200) {
//       errors.university = 'University cannot exceed 200 characters';
//     }
    
//     if (!data.location.trim()) {
//       errors.location = 'Location is required';
//     } else if (data.location.trim().length < 2) {
//       errors.location = 'Location must be at least 2 characters';
//     } else if (data.location.trim().length > 100) {
//       errors.location = 'Location cannot exceed 100 characters';
//     }
    
//     if (!data.rating || data.rating < 1 || data.rating > 5) {
//       errors.rating = 'Rating must be between 1 and 5';
//     }
    
//     if (!data.title.trim()) {
//       errors.title = 'Title is required';
//     } else if (data.title.trim().length < 5) {
//       errors.title = 'Title must be at least 5 characters';
//     } else if (data.title.trim().length > 200) {
//       errors.title = 'Title cannot exceed 200 characters';
//     }
    
//     if (!data.content.trim()) {
//       errors.content = 'Content is required';
//     } else if (data.content.trim().length < 20) {
//       errors.content = 'Content must be at least 20 characters';
//     } else if (data.content.trim().length > 1000) {
//       errors.content = 'Content cannot exceed 1000 characters';
//     }
    
//     if (!data.houseName.trim()) {
//       errors.houseName = 'House name is required';
//     } else if (data.houseName.trim().length < 2) {
//       errors.houseName = 'House name must be at least 2 characters';
//     } else if (data.houseName.trim().length > 200) {
//       errors.houseName = 'House name cannot exceed 200 characters';
//     }
    
//     if (!editingItem && !data.image) {
//       errors.image = 'Image is required';
//     }
    
//     if (data.email && !data.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
//       errors.email = 'Please enter a valid email address';
//     }
    
//     return errors;
//   }
// }

// // ============================================
// // CUSTOM HOOK
// // ============================================
// const useTestimonial = () => {
//   const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

//   const model = new TestimonialModel();

//   const loadTestimonials = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await model.getAll();
//       setTestimonials(data);
//     } catch (err) {
//       const message = err instanceof Error ? err.message : 'Failed to load testimonials';
//       setError(message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const createTestimonial = useCallback(async (data: TestimonialFormData): Promise<Testimonial> => {
//     try {
//       setIsSubmitting(true);
//       setError(null);
//       const newItem = await model.create(data);
//       setTestimonials(prev => [newItem, ...prev]);
//       return newItem;
//     } catch (err) {
//       const message = err instanceof Error ? err.message : 'Failed to create testimonial';
//       setError(message);
//       throw err;
//     } finally {
//       setIsSubmitting(false);
//     }
//   }, []);

//   const updateTestimonial = useCallback(async (id: string, data: TestimonialFormData): Promise<Testimonial> => {
//     try {
//       setIsSubmitting(true);
//       setError(null);
//       const updatedItem = await model.update(id, data);
//       setTestimonials(prev => prev.map(m => m._id === updatedItem._id ? updatedItem : m));
//       return updatedItem;
//     } catch (err) {
//       const message = err instanceof Error ? err.message : 'Failed to update testimonial';
//       setError(message);
//       throw err;
//     } finally {
//       setIsSubmitting(false);
//     }
//   }, []);

//   const deleteTestimonial = useCallback(async (id: string): Promise<void> => {
//     try {
//       setIsSubmitting(true);
//       setError(null);
//       await model.delete(id);
//       setTestimonials(prev => prev.filter(m => m._id !== id));
//     } catch (err) {
//       const message = err instanceof Error ? err.message : 'Failed to delete testimonial';
//       setError(message);
//       throw err;
//     } finally {
//       setIsSubmitting(false);
//     }
//   }, []);

//   const updateStatus = useCallback(async (id: string, status: 'pending' | 'approved' | 'rejected'): Promise<Testimonial> => {
//     try {
//       setIsSubmitting(true);
//       setError(null);
//       const updatedItem = await model.updateStatus(id, status);
//       setTestimonials(prev => prev.map(m => m._id === updatedItem._id ? updatedItem : m));
//       return updatedItem;
//     } catch (err) {
//       const message = err instanceof Error ? err.message : 'Failed to update status';
//       setError(message);
//       throw err;
//     } finally {
//       setIsSubmitting(false);
//     }
//   }, []);

//   const toggleFeatured = useCallback(async (id: string, featured: boolean): Promise<Testimonial> => {
//     try {
//       setIsSubmitting(true);
//       setError(null);
//       const updatedItem = await model.toggleFeatured(id, featured);
//       setTestimonials(prev => prev.map(m => m._id === updatedItem._id ? updatedItem : m));
//       return updatedItem;
//     } catch (err) {
//       const message = err instanceof Error ? err.message : 'Failed to toggle featured';
//       setError(message);
//       throw err;
//     } finally {
//       setIsSubmitting(false);
//     }
//   }, []);

//   const validateForm = useCallback((data: TestimonialFormData, editingItem: Testimonial | null = null): Record<string, string> => {
//     return model.validateForm(data, editingItem);
//   }, []);

//   useEffect(() => {
//     loadTestimonials();
//   }, [loadTestimonials]);

//   return {
//     testimonials,
//     loading,
//     error,
//     isSubmitting,
//     loadTestimonials,
//     createTestimonial,
//     updateTestimonial,
//     deleteTestimonial,
//     updateStatus,
//     toggleFeatured,
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
// // RATING STARS COMPONENT
// // ============================================
// interface RatingStarsProps {
//   rating: number;
//   size?: 'small' | 'medium' | 'large';
//   interactive?: boolean;
//   onChange?: (rating: number) => void;
// }

// const RatingStars: React.FC<RatingStarsProps> = ({ 
//   rating, 
//   size = 'medium', 
//   interactive = false,
//   onChange 
// }) => {
//   const [hoverRating, setHoverRating] = useState<number>(0);
  
//   const sizes = {
//     small: 'w-4 h-4',
//     medium: 'w-6 h-6',
//     large: 'w-8 h-8',
//   };
  
//   const displayRating = hoverRating || rating;
  
//   const handleClick = (value: number) => {
//     if (interactive && onChange) {
//       onChange(value);
//     }
//   };
  
//   return (
//     <div className="flex gap-1">
//       {[1, 2, 3, 4, 5].map((star) => (
//         <button
//           key={star}
//           type="button"
//           className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'} ${interactive ? 'focus:outline-none' : ''}`}
//           onClick={() => handleClick(star)}
//           onMouseEnter={() => interactive && setHoverRating(star)}
//           onMouseLeave={() => interactive && setHoverRating(0)}
//           disabled={!interactive}
//         >
//           {star <= displayRating ? (
//             <StarIcon className={`${sizes[size]} text-yellow-400`} />
//           ) : star - 0.5 <= displayRating ? (
//             <StarHalfIcon className={`${sizes[size]} text-yellow-400`} />
//           ) : (
//             <StarBorderIcon className={`${sizes[size]} text-gray-300`} />
//           )}
//         </button>
//       ))}
//     </div>
//   );
// };

// // ============================================
// // STATUS BADGE COMPONENT
// // ============================================
// interface StatusBadgeProps {
//   status: 'pending' | 'approved' | 'rejected';
// }

// const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
//   const config = {
//     pending: {
//       icon: <PendingIcon className="w-4 h-4" />,
//       label: 'Pending',
//       className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
//     },
//     approved: {
//       icon: <CheckCircleRoundedIcon className="w-4 h-4" />,
//       label: 'Approved',
//       className: 'bg-green-100 text-green-700 border-green-200',
//     },
//     rejected: {
//       icon: <CancelIcon className="w-4 h-4" />,
//       label: 'Rejected',
//       className: 'bg-red-100 text-red-700 border-red-200',
//     },
//   };
  
//   const { icon, label, className } = config[status];
  
//   return (
//     <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${className}`}>
//       {icon}
//       {label}
//     </span>
//   );
// };

// // ============================================
// // VIEW MODAL COMPONENT
// // ============================================
// interface ViewModalProps {
//   testimonial: Testimonial | null;
//   isOpen: boolean;
//   onClose: () => void;
//   onEdit: () => void;
//   onDelete: () => void;
//   onStatusChange?: (status: 'pending' | 'approved' | 'rejected') => void;
//   onToggleFeatured?: () => void;
// }

// const ViewModal: React.FC<ViewModalProps> = ({ 
//   testimonial, 
//   isOpen, 
//   onClose, 
//   onEdit, 
//   onDelete,
//   onStatusChange,
//   onToggleFeatured,
// }) => {
//   if (!isOpen || !testimonial) return null;

//   const formatDate = (dateString?: string) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     }).format(date);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10 rounded-t-xl">
//           <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//             <VisibilityIcon className="w-6 h-6 text-indigo-600" />
//             Testimonial Details
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
//                 src={testimonial.image?.url || testimonial.image?.secure_url}
//                 alt={testimonial.name}
//                 className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100 shadow-lg"
//                 onError={(e) => {
//                   (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                     testimonial.name
//                   )}&size=150&background=indigo&color=fff&font-size=0.5`;
//                 }}
//               />
//             </div>
//           </div>

//           {/* Name & Title */}
//           <div className="text-center mb-6">
//             <h3 className="text-2xl font-bold text-gray-800">{testimonial.name}</h3>
//             <div className="flex justify-center items-center gap-2 mt-1 flex-wrap">
//               <span className="text-gray-500">{testimonial.university}</span>
//               <span className="text-gray-300">•</span>
//               <span className="text-gray-500">{testimonial.location}</span>
//             </div>
//             <div className="flex justify-center items-center gap-3 mt-2">
//               <RatingStars rating={testimonial.rating} size="medium" />
//               <span className="text-sm font-medium text-gray-600">
//                 {testimonial.rating.toFixed(1)}
//               </span>
//             </div>
//           </div>

//           {/* Status & Verification Badges */}
//           <div className="flex flex-wrap justify-center gap-3 mb-6">
//             <StatusBadge status={testimonial.status} />
//             <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
//               testimonial.verified 
//                 ? 'bg-green-100 text-green-700 border-green-200' 
//                 : 'bg-gray-100 text-gray-500 border-gray-200'
//             }`}>
//               <VerifiedIcon className="w-4 h-4" />
//               {testimonial.verified ? 'Verified' : 'Not Verified'}
//             </span>
//             <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
//               testimonial.featured 
//                 ? 'bg-amber-100 text-amber-700 border-amber-200' 
//                 : 'bg-gray-100 text-gray-500 border-gray-200'
//             }`}>
//               {testimonial.featured ? (
//                 <StarIcon className="w-4 h-4" />
//               ) : (
//                 <StarBorderIcon className="w-4 h-4" />
//               )}
//               {testimonial.featured ? 'Featured' : 'Not Featured'}
//             </span>
//           </div>

//           {/* Title */}
//           <div className="mb-4">
//             <h4 className="text-lg font-semibold text-gray-800">{testimonial.title}</h4>
//           </div>

//           {/* Content */}
//           <div className="mb-4">
//             <div className="bg-gray-50 rounded-lg p-4">
//               <p className="text-gray-700 leading-relaxed">{testimonial.content}</p>
//             </div>
//           </div>

//           {/* House */}
//           <div className="mb-6">
//             <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">House</h4>
//             <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
//               <HomeIcon className="w-5 h-5 text-gray-400" />
//               <span className="text-gray-700 font-medium">{testimonial.houseName}</span>
//             </div>
//           </div>

//           {/* Email */}
//           {testimonial.email && (
//             <div className="mb-6">
//               <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Email</h4>
//               <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
//                 <EmailIcon className="w-5 h-5 text-gray-400" />
//                 <span className="text-gray-700">{testimonial.email}</span>
//               </div>
//             </div>
//           )}

//           {/* Meta Info */}
//           <div className="border-t border-gray-100 pt-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
//               <div className="flex items-center gap-2 text-gray-500">
//                 <CalendarTodayIcon className="w-4 h-4" />
//                 <span>Created: {formatDate(testimonial.createdAt)}</span>
//               </div>
//               <div className="flex items-center gap-2 text-gray-500">
//                 <RefreshIcon className="w-4 h-4" />
//                 <span>Updated: {formatDate(testimonial.updatedAt)}</span>
//               </div>
//               {testimonial.date && (
//                 <div className="flex items-center gap-2 text-gray-500">
//                   <CalendarTodayIcon className="w-4 h-4" />
//                   <span>Date: {formatDate(testimonial.date)}</span>
//                 </div>
//               )}
//               <div className="flex items-center gap-2 text-gray-500">
//                 <PersonIcon className="w-4 h-4" />
//                 <span>ID: {testimonial._id?.slice(0, 12)}...</span>
//               </div>
//             </div>
//           </div>

//           {/* Status Actions */}
//           {onStatusChange && testimonial.status !== 'approved' && (
//             <div className="mt-4 pt-4 border-t border-gray-100">
//               <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Actions</h4>
//               <div className="flex flex-wrap gap-2">
//                 {testimonial.status === 'pending' && (
//                   <>
//                     <button
//                       onClick={() => onStatusChange('approved')}
//                       className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
//                     >
//                       <CheckCircleRoundedIcon className="w-4 h-4" />
//                       Approve
//                     </button>
//                     <button
//                       onClick={() => onStatusChange('rejected')}
//                       className="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
//                     >
//                       <CancelIcon className="w-4 h-4" />
//                       Reject
//                     </button>
//                   </>
//                 )}
//                 {testimonial.status === 'rejected' && (
//                   <button
//                     onClick={() => onStatusChange('pending')}
//                     className="flex items-center gap-2 px-3 py-1.5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
//                   >
//                     <PendingIcon className="w-4 h-4" />
//                     Reset to Pending
//                   </button>
//                 )}
//                 {onToggleFeatured && (
//                   <button
//                     onClick={onToggleFeatured}
//                     className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors text-sm ${
//                       testimonial.featured 
//                         ? 'bg-gray-600 text-white hover:bg-gray-700' 
//                         : 'bg-amber-600 text-white hover:bg-amber-700'
//                     }`}
//                   >
//                     <StarIcon className="w-4 h-4" />
//                     {testimonial.featured ? 'Remove Featured' : 'Make Featured'}
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}

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
// // VALIDATION INDICATOR COMPONENT
// // ============================================
// interface ValidationIndicatorProps {
//   field: string;
//   formErrors: Record<string, string>;
//   formData: TestimonialFormData;
//   editingItem: Testimonial | null;
// }

// const ValidationIndicator: React.FC<ValidationIndicatorProps> = ({ 
//   field, 
//   formErrors, 
//   formData,
//   editingItem 
// }) => {
//   const error = formErrors[field];
  
//   if (field === 'image') {
//     if (!formData.imagePreview && !editingItem) return null;
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

//   // For optional fields like email
//   if (field === 'email' && !formData.email) return null;

//   const value = formData[field as keyof TestimonialFormData];
//   if (!value && field !== 'email' && field !== 'rating') return null;
  
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
// // MAIN COMPONENT
// // ============================================
// export const TestimonialManagement: React.FC = () => {
//   // Use the custom hook
//   const { 
//     testimonials, 
//     loading, 
//     error, 
//     createTestimonial, 
//     updateTestimonial, 
//     deleteTestimonial,
//     updateStatus,
//     toggleFeatured,
//     validateForm 
//   } = useTestimonial();

//   // Local state
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
//   const [viewingItem, setViewingItem] = useState<Testimonial | null>(null);
//   const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
//   const [deletingItemId, setDeletingItemId] = useState<string | null>(null);
//   const [formData, setFormData] = useState<TestimonialFormData>({
//     name: '',
//     university: '',
//     location: '',
//     rating: 5,
//     title: '',
//     content: '',
//     houseName: '',
//     image: null,
//     imagePreview: '',
//     email: '',
//     verified: false,
//     status: 'pending',
//     featured: false,
//     date: new Date().toISOString().split('T')[0],
//   });
//   const [formErrors, setFormErrors] = useState<Record<string, string>>({});
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [notification, setNotification] = useState<{
//     type: 'success' | 'error';
//     message: string;
//     visible: boolean;
//   }>({ type: 'success', message: '', visible: false });
//   const [isFormValid, setIsFormValid] = useState<boolean>(false);
//   const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
//   const [searchTerm, setSearchTerm] = useState<string>('');
  
//   // Refs
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Filter testimonials
//   const filteredTestimonials = testimonials
//     .filter(t => filterStatus === 'all' || t.status === filterStatus)
//     .filter(t => 
//       t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       t.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       t.houseName.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//   // Check form validity
//   useEffect(() => {
//     const errors = validateForm(formData, editingItem);
//     setFormErrors(errors);
//     setIsFormValid(Object.keys(errors).length === 0);
//   }, [formData, editingItem, validateForm]);

//   const showNotification = (type: 'success' | 'error', message: string) => {
//     setNotification({ type, message, visible: true });
//     setTimeout(() => {
//       setNotification(prev => ({ ...prev, visible: false }));
//     }, 5000);
//   };

//   const handleOpenModal = (item?: Testimonial) => {
//     if (item) {
//       setEditingItem(item);
//       setFormData({
//         name: item.name,
//         university: item.university,
//         location: item.location,
//         rating: item.rating,
//         title: item.title,
//         content: item.content,
//         houseName: item.houseName,
//         image: null,
//         imagePreview: item.image?.url || item.image?.secure_url || '',
//         email: item.email || '',
//         verified: item.verified || false,
//         status: item.status || 'pending',
//         featured: item.featured || false,
//         date: item.date ? new Date(item.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
//       });
//     } else {
//       setEditingItem(null);
//       setFormData({
//         name: '',
//         university: '',
//         location: '',
//         rating: 5,
//         title: '',
//         content: '',
//         houseName: '',
//         image: null,
//         imagePreview: '',
//         email: '',
//         verified: false,
//         status: 'pending',
//         featured: false,
//         date: new Date().toISOString().split('T')[0],
//       });
//     }
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setEditingItem(null);
//     setFormData({
//       name: '',
//       university: '',
//       location: '',
//       rating: 5,
//       title: '',
//       content: '',
//       houseName: '',
//       image: null,
//       imagePreview: '',
//       email: '',
//       verified: false,
//       status: 'pending',
//       featured: false,
//       date: new Date().toISOString().split('T')[0],
//     });
//     setFormErrors({});
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const handleViewItem = (item: Testimonial) => {
//     setViewingItem(item);
//     setIsViewModalOpen(true);
//   };

//   const handleCloseViewModal = () => {
//     setIsViewModalOpen(false);
//     setViewingItem(null);
//   };

//   const handleEditFromView = () => {
//     if (viewingItem) {
//       handleCloseViewModal();
//       handleOpenModal(viewingItem);
//     }
//   };

//   const handleDeleteFromView = () => {
//     if (viewingItem?._id) {
//       setDeletingItemId(viewingItem._id);
//       setIsDeleteModalOpen(true);
//       handleCloseViewModal();
//     }
//   };

//   const handleStatusChangeFromView = async (status: 'pending' | 'approved' | 'rejected') => {
//     if (viewingItem?._id) {
//       try {
//         await updateStatus(viewingItem._id, status);
//         showNotification('success', `Testimonial ${status} successfully!`);
//         handleCloseViewModal();
//       } catch (err) {
//         const message = err instanceof Error ? err.message : 'Failed to update status';
//         showNotification('error', message);
//       }
//     }
//   };

//   const handleToggleFeaturedFromView = async () => {
//     if (viewingItem?._id) {
//       try {
//         await toggleFeatured(viewingItem._id, !viewingItem.featured);
//         showNotification('success', `Featured status updated successfully!`);
//         handleCloseViewModal();
//       } catch (err) {
//         const message = err instanceof Error ? err.message : 'Failed to update featured status';
//         showNotification('error', message);
//       }
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
    
//     if (type === 'checkbox') {
//       const checked = (e.target as HTMLInputElement).checked;
//       setFormData(prev => ({
//         ...prev,
//         [name]: checked,
//       }));
//     } else if (name === 'rating') {
//       setFormData(prev => ({
//         ...prev,
//         rating: parseInt(value) || 0,
//       }));
//     } else {
//       setFormData(prev => ({
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
//         setFormErrors(prev => ({ ...prev, image: 'Image size should be less than 5MB' }));
//         return;
//       }
      
//       // Validate file type
//       if (!file.type.startsWith('image/')) {
//         setFormErrors(prev => ({ ...prev, image: 'File must be an image' }));
//         return;
//       }

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData(prev => ({
//           ...prev,
//           image: file,
//           imagePreview: reader.result as string,
//         }));
//         // Clear image error if it exists
//         if (formErrors.image) {
//           setFormErrors(prev => {
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
//     setFormData(prev => ({
//       ...prev,
//       image: null,
//       imagePreview: '',
//     }));
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     const errors = validateForm(formData, editingItem);
//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       if (editingItem) {
//         await updateTestimonial(editingItem._id!, formData);
//         showNotification('success', 'Testimonial updated successfully!');
//       } else {
//         await createTestimonial(formData);
//         showNotification('success', 'Testimonial added successfully!');
//       }
//       handleCloseModal();
//     } catch (err) {
//       const message = err instanceof Error ? err.message : 'Failed to save testimonial';
//       showNotification('error', message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!deletingItemId) return;
    
//     setIsSubmitting(true);
//     try {
//       await deleteTestimonial(deletingItemId);
//       showNotification('success', 'Testimonial deleted successfully!');
//       setIsDeleteModalOpen(false);
//       setDeletingItemId(null);
//     } catch (err) {
//       const message = err instanceof Error ? err.message : 'Failed to delete testimonial';
//       showNotification('error', message);
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
//           <p className="mt-4 text-gray-600">Loading testimonials...</p>
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
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Testimonials</h3>
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
//         <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 p-4 rounded-lg shadow-lg transform transition-all duration-500 ${
//           notification.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
//         }`}>
//           {notification.type === 'success' ? <SuccessSVG /> : <ErrorSVG />}
//           <div>
//             <h3 className={`font-semibold ${notification.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
//               {notification.type === 'success' ? 'Success!' : 'Error!'}
//             </h3>
//             <p className={`text-sm ${notification.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
//               {notification.message}
//             </p>
//           </div>
//           <button 
//             onClick={() => setNotification(prev => ({ ...prev, visible: false }))}
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
//               <StarIcon className="w-8 h-8 text-yellow-400" />
//               Testimonial Management
//             </h1>
//             <p className="text-gray-500 mt-1">Manage student testimonials and reviews</p>
//           </div>
//           <button
//             onClick={() => handleOpenModal()}
//             className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-md"
//           >
//             <AddIcon className="w-5 h-5" />
//             Add Testimonial
//           </button>
//         </div>

//         {/* Filters */}
//         <div className="flex flex-col sm:flex-row gap-4 mb-6">
//           <div className="flex-1">
//             <input
//               type="text"
//               placeholder="Search by name, university, title, or house..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
//             />
//           </div>
//           <div className="flex gap-2">
//             <button
//               onClick={() => setFilterStatus('all')}
//               className={`px-4 py-2 rounded-lg transition-all ${
//                 filterStatus === 'all'
//                   ? 'bg-indigo-600 text-white'
//                   : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
//               }`}
//             >
//               All
//             </button>
//             <button
//               onClick={() => setFilterStatus('pending')}
//               className={`px-4 py-2 rounded-lg transition-all ${
//                 filterStatus === 'pending'
//                   ? 'bg-yellow-600 text-white'
//                   : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
//               }`}
//             >
//               Pending
//             </button>
//             <button
//               onClick={() => setFilterStatus('approved')}
//               className={`px-4 py-2 rounded-lg transition-all ${
//                 filterStatus === 'approved'
//                   ? 'bg-green-600 text-white'
//                   : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
//               }`}
//             >
//               Approved
//             </button>
//             <button
//               onClick={() => setFilterStatus('rejected')}
//               className={`px-4 py-2 rounded-lg transition-all ${
//                 filterStatus === 'rejected'
//                   ? 'bg-red-600 text-white'
//                   : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
//               }`}
//             >
//               Rejected
//             </button>
//           </div>
//         </div>

//         {/* Testimonials Grid */}
//         {filteredTestimonials.length === 0 ? (
//           <div className="bg-white rounded-xl shadow-lg p-12 text-center">
//             <StarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-gray-600 mb-2">No Testimonials Found</h3>
//             <p className="text-gray-500 mb-4">
//               {searchTerm || filterStatus !== 'all' 
//                 ? 'Try adjusting your search or filter criteria.'
//                 : 'Start collecting testimonials by adding the first one.'}
//             </p>
//             {!searchTerm && filterStatus === 'all' && (
//               <button
//                 onClick={() => handleOpenModal()}
//                 className="inline-flex items-center gap-2 px-4 py-2 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
//               >
//                 <AddIcon className="w-5 h-5" />
//                 Add Your First Testimonial
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredTestimonials.map((item) => (
//               <div
//                 key={item._id}
//                 className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
//               >
//                 <div className="relative h-48 bg-gradient-to-r from-indigo-500 to-purple-600">
//                   <img
//                     src={item.image?.url || item.image?.secure_url}
//                     alt={item.name}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                         item.name
//                       )}&size=200&background=indigo&color=fff&font-size=0.5`;
//                     }}
//                   />
//                   <div className="absolute inset-0 bg-opacity-20 flex items-end p-4">
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => handleViewItem(item)}
//                         className="p-2 bg-white rounded-full hover:bg-indigo-50 transition-colors shadow-md"
//                         title="View Details"
//                       >
//                         <VisibilityIcon className="w-4 h-4 text-indigo-600" />
//                       </button>
//                       <button
//                         onClick={() => handleOpenModal(item)}
//                         className="p-2 bg-white rounded-full hover:bg-indigo-50 transition-colors shadow-md"
//                         title="Edit"
//                       >
//                         <EditIcon className="w-4 h-4 text-indigo-600" />
//                       </button>
//                       <button
//                         onClick={() => {
//                           setDeletingItemId(item._id!);
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
//                   <div className="flex items-start justify-between">
//                     <div className="flex-1">
//                       <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{item.name}</h3>
//                       <p className="text-sm text-gray-500 line-clamp-1">{item.university}</p>
//                     </div>
//                     <StatusBadge status={item.status} />
//                   </div>
//                   <div className="mt-2 flex items-center gap-2">
//                     <RatingStars rating={item.rating} size="small" />
//                     <span className="text-xs text-gray-500">{item.rating.toFixed(1)}</span>
//                   </div>
//                   <p className="text-sm font-medium text-gray-700 mt-2 line-clamp-1">{item.title}</p>
//                   <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.content}</p>
//                   <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
//                     <HomeIcon className="w-4 h-4 text-gray-400" />
//                     <span className="text-xs text-gray-500 line-clamp-1">{item.houseName}</span>
//                   </div>
//                   <div className="flex gap-3 mt-3">
//                     {item.verified && (
//                       <span className="inline-flex items-center gap-1 text-xs text-green-600">
//                         <VerifiedIcon className="w-3 h-3" />
//                         Verified
//                       </span>
//                     )}
//                     {item.featured && (
//                       <span className="inline-flex items-center gap-1 text-xs text-amber-600">
//                         <StarIcon className="w-3 h-3" />
//                         Featured
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* View Modal */}
//         <ViewModal
//           testimonial={viewingItem}
//           isOpen={isViewModalOpen}
//           onClose={handleCloseViewModal}
//           onEdit={handleEditFromView}
//           onDelete={handleDeleteFromView}
//           onStatusChange={handleStatusChangeFromView}
//           onToggleFeatured={handleToggleFeaturedFromView}
//         />

//         {/* Create/Edit Modal */}
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
//                 <h2 className="text-2xl font-bold text-gray-800">
//                   {editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
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
//                         formErrors.name ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                       placeholder="Enter full name"
//                     />
//                     <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                       {formData.name && (
//                         formErrors.name ? (
//                           <ErrorIcon className="w-5 h-5 text-red-500" />
//                         ) : (
//                           <CheckCircleIcon className="w-5 h-5 text-green-500" />
//                         )
//                       )}
//                     </div>
//                   </div>
//                   <ValidationIndicator 
//                     field="name" 
//                     formErrors={formErrors} 
//                     formData={formData}
//                     editingItem={editingItem}
//                   />
//                 </div>

//                 {/* University */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     University <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <SchoolIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="text"
//                       name="university"
//                       value={formData.university}
//                       onChange={handleInputChange}
//                       className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all ${
//                         formErrors.university ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                       placeholder="e.g., University of Rwanda"
//                     />
//                     <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                       {formData.university && (
//                         formErrors.university ? (
//                           <ErrorIcon className="w-5 h-5 text-red-500" />
//                         ) : (
//                           <CheckCircleIcon className="w-5 h-5 text-green-500" />
//                         )
//                       )}
//                     </div>
//                   </div>
//                   <ValidationIndicator 
//                     field="university" 
//                     formErrors={formErrors} 
//                     formData={formData}
//                     editingItem={editingItem}
//                   />
//                 </div>

//                 {/* Location */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Location <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <LocationOnIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="text"
//                       name="location"
//                       value={formData.location}
//                       onChange={handleInputChange}
//                       className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all ${
//                         formErrors.location ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                       placeholder="e.g., Kigali, Rwanda"
//                     />
//                     <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                       {formData.location && (
//                         formErrors.location ? (
//                           <ErrorIcon className="w-5 h-5 text-red-500" />
//                         ) : (
//                           <CheckCircleIcon className="w-5 h-5 text-green-500" />
//                         )
//                       )}
//                     </div>
//                   </div>
//                   <ValidationIndicator 
//                     field="location" 
//                     formErrors={formErrors} 
//                     formData={formData}
//                     editingItem={editingItem}
//                   />
//                 </div>

//                 {/* Rating */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Rating <span className="text-red-500">*</span>
//                   </label>
//                   <div className="flex items-center gap-4">
//                     <RatingStars 
//                       rating={formData.rating} 
//                       size="large" 
//                       interactive={true}
//                       onChange={(value) => {
//                         setFormData(prev => ({ ...prev, rating: value }));
//                         if (formErrors.rating) {
//                           setFormErrors(prev => {
//                             const newErrors = { ...prev };
//                             delete newErrors.rating;
//                             return newErrors;
//                           });
//                         }
//                       }}
//                     />
//                     <span className="text-sm font-medium text-gray-600">
//                       {formData.rating.toFixed(1)}
//                     </span>
//                   </div>
//                   {formErrors.rating && (
//                     <div className="flex items-center mt-1 text-sm text-red-500">
//                       <ErrorIcon className="w-4 h-4 mr-1" />
//                       <span>{formErrors.rating}</span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Title */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Title <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <DescriptionIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="text"
//                       name="title"
//                       value={formData.title}
//                       onChange={handleInputChange}
//                       className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all ${
//                         formErrors.title ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                       placeholder="e.g., Amazing Experience!"
//                     />
//                     <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                       {formData.title && (
//                         formErrors.title ? (
//                           <ErrorIcon className="w-5 h-5 text-red-500" />
//                         ) : (
//                           <CheckCircleIcon className="w-5 h-5 text-green-500" />
//                         )
//                       )}
//                     </div>
//                   </div>
//                   <ValidationIndicator 
//                     field="title" 
//                     formErrors={formErrors} 
//                     formData={formData}
//                     editingItem={editingItem}
//                   />
//                 </div>

//                 {/* Content */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Content <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <DescriptionIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
//                     <textarea
//                       name="content"
//                       value={formData.content}
//                       onChange={handleInputChange}
//                       rows={4}
//                       className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none ${
//                         formErrors.content ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                       placeholder="Write the testimonial content..."
//                     />
//                     <div className="absolute right-3 top-3">
//                       {formData.content && (
//                         formErrors.content ? (
//                           <ErrorIcon className="w-5 h-5 text-red-500" />
//                         ) : (
//                           <CheckCircleIcon className="w-5 h-5 text-green-500" />
//                         )
//                       )}
//                     </div>
//                   </div>
//                   <ValidationIndicator 
//                     field="content" 
//                     formErrors={formErrors} 
//                     formData={formData}
//                     editingItem={editingItem}
//                   />
//                   <p className="text-xs text-gray-400 mt-1">
//                     {formData.content.length}/20 characters minimum
//                   </p>
//                 </div>

//                 {/* House Name */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     House Name <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <HomeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="text"
//                       name="houseName"
//                       value={formData.houseName}
//                       onChange={handleInputChange}
//                       className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all ${
//                         formErrors.houseName ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                       placeholder="e.g., Golden Apartments"
//                     />
//                     <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                       {formData.houseName && (
//                         formErrors.houseName ? (
//                           <ErrorIcon className="w-5 h-5 text-red-500" />
//                         ) : (
//                           <CheckCircleIcon className="w-5 h-5 text-green-500" />
//                         )
//                       )}
//                     </div>
//                   </div>
//                   <ValidationIndicator 
//                     field="houseName" 
//                     formErrors={formErrors} 
//                     formData={formData}
//                     editingItem={editingItem}
//                   />
//                 </div>

//                 {/* Image Upload */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Profile Image {!editingItem && <span className="text-red-500">*</span>}
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
//                           formErrors.image ? 'border-red-500' : 'border-gray-300 hover:border-indigo-500'
//                         }`}
//                       >
//                         <ImageIcon className="w-5 h-5 text-gray-400" />
//                         <span className="text-gray-600">
//                           {formData.imagePreview ? 'Change Image' : 'Upload Image'}
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
//                           className="absolute -top-1 -right-1 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
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
//                     editingItem={editingItem}
//                   />
//                   <p className="text-xs text-gray-500 mt-1">Max file size: 5MB. Supported formats: JPEG, PNG, GIF</p>
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Email
//                   </label>
//                   <div className="relative">
//                     <EmailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all ${
//                         formErrors.email ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                       placeholder="student@example.com (optional)"
//                     />
//                     <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                       {formData.email && (
//                         formErrors.email ? (
//                           <ErrorIcon className="w-5 h-5 text-red-500" />
//                         ) : (
//                           <CheckCircleIcon className="w-5 h-5 text-green-500" />
//                         )
//                       )}
//                     </div>
//                   </div>
//                   <ValidationIndicator 
//                     field="email" 
//                     formErrors={formErrors} 
//                     formData={formData}
//                     editingItem={editingItem}
//                   />
//                 </div>

//                 {/* Date */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Date
//                   </label>
//                   <div className="relative">
//                     <CalendarTodayIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="date"
//                       name="date"
//                       value={formData.date}
//                       onChange={handleInputChange}
//                       className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
//                     />
//                   </div>
//                 </div>

//                 {/* Verified & Featured */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="flex items-center gap-3">
//                     <input
//                       type="checkbox"
//                       name="verified"
//                       checked={formData.verified}
//                       onChange={handleInputChange}
//                       className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
//                     />
//                     <label className="text-sm font-medium text-gray-700">
//                       Verified
//                     </label>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <input
//                       type="checkbox"
//                       name="featured"
//                       checked={formData.featured}
//                       onChange={handleInputChange}
//                       className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
//                     />
//                     <label className="text-sm font-medium text-gray-700">
//                       Featured
//                     </label>
//                   </div>
//                 </div>

//                 {/* Status */}
//                 {editingItem && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Status
//                     </label>
//                     <select
//                       name="status"
//                       value={formData.status}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
//                     >
//                       <option value="pending">Pending</option>
//                       <option value="approved">Approved</option>
//                       <option value="rejected">Rejected</option>
//                     </select>
//                   </div>
//                 )}

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
//                         ? 'bg-indigo-600 hover:bg-indigo-700'
//                         : 'bg-gray-400 cursor-not-allowed'
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
//                         {editingItem ? 'Update' : 'Create'}
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
//                 Delete Testimonial
//               </h3>
//               <p className="text-gray-600 text-center mb-6">
//                 Are you sure you want to delete this testimonial? This action cannot be undone.
//               </p>
//               <div className="flex justify-center gap-3">
//                 <button
//                   onClick={() => {
//                     setIsDeleteModalOpen(false);
//                     setDeletingItemId(null);
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




/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { 
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Image as ImageIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  LocationOn as LocationOnIcon,
  Description as DescriptionIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
  Visibility as VisibilityIcon,
  Email as EmailIcon,
  CalendarToday as CalendarTodayIcon,
  Home as HomeIcon,
  Verified as VerifiedIcon,
  CheckCircle as CheckCircleRoundedIcon,
  Cancel as CancelIcon,
  Pending as PendingIcon,
  StarHalf as StarHalfIcon,
} from '@mui/icons-material';

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
                  <StarIcon className="w-10 h-10" />
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

// ============================================
// TYPES
// ============================================
interface Testimonial {
  _id?: string;
  name: string;
  university: string;
  location: string;
  rating: number;
  title: string;
  content: string;
  houseName: string;
  image: {
    public_id: string;
    url: string;
    secure_url: string;
  };
  verified: boolean;
  status: 'pending' | 'approved' | 'rejected';
  email?: string;
  featured: boolean;
  date?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface TestimonialFormData {
  name: string;
  university: string;
  location: string;
  rating: number;
  title: string;
  content: string;
  houseName: string;
  image: File | null;
  imagePreview: string;
  email: string;
  verified: boolean;
  status: 'pending' | 'approved' | 'rejected';
  featured: boolean;
  date: string;
}

interface ApiError {
  field?: string;
  message: string;
}

interface TestimonialResponse {
  success: boolean;
  data?: Testimonial | Testimonial[];
  message?: string;
  error?: string;
  errors?: ApiError[];
}

// ============================================
// API CONFIGURATION
// ============================================
const API_BASE_URL = 'https://rene-inyumba-nodejs.onrender.com';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// ============================================
// TESTIMONIAL MODEL
// ============================================
class TestimonialModel {
  private handleError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        const errorMessages = error.response.data.errors
          .map((e: ApiError) => `${e.field}: ${e.message}`)
          .join(', ');
        throw new Error(errorMessages);
      }
      const message = error.response?.data?.message || error.response?.data?.error || error.message;
      throw new Error(message);
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unknown error occurred');
  }

  async getAll(): Promise<Testimonial[]> {
    try {
      const response = await axiosInstance.get('/testimonials');
      const result = response.data as TestimonialResponse;
      
      if (result.success && result.data) {
        return Array.isArray(result.data) ? result.data : [result.data];
      }
      return [];
    } catch (error) {
      this.handleError(error);
    }
  }

  async getById(id: string): Promise<Testimonial | null> {
    try {
      const response = await axiosInstance.get(`/testimonials/${id}`);
      const result = response.data as TestimonialResponse;
      
      if (result.success && result.data) {
        return Array.isArray(result.data) ? result.data[0] : result.data;
      }
      return null;
    } catch (error) {
      this.handleError(error);
    }
  }

  async create(data: TestimonialFormData): Promise<Testimonial> {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('university', data.university);
      formData.append('location', data.location);
      formData.append('rating', data.rating.toString());
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('houseName', data.houseName);
      formData.append('email', data.email || '');
      formData.append('date', data.date);
      
      if (data.image) {
        formData.append('image', data.image);
      }

      const response = await axiosInstance.post('/testimonials', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const result = response.data as TestimonialResponse;
      
      if (!result.success) {
        if (result.errors && Array.isArray(result.errors)) {
          const errorMessages = result.errors
            .map((e: ApiError) => `${e.field}: ${e.message}`)
            .join(', ');
          throw new Error(errorMessages);
        }
        throw new Error(result.message || 'Failed to create testimonial');
      }
      
      if (!result.data) {
        throw new Error('No data returned from server');
      }
      
      return Array.isArray(result.data) ? result.data[0] : result.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: string, data: TestimonialFormData): Promise<Testimonial> {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('university', data.university);
      formData.append('location', data.location);
      formData.append('rating', data.rating.toString());
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('houseName', data.houseName);
      formData.append('email', data.email || '');
      formData.append('verified', String(data.verified));
      formData.append('status', data.status);
      formData.append('featured', String(data.featured));
      formData.append('date', data.date);
      
      if (data.image) {
        formData.append('image', data.image);
      }

      const response = await axiosInstance.put(`/testimonials/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const result = response.data as TestimonialResponse;
      
      if (!result.success) {
        if (result.errors && Array.isArray(result.errors)) {
          const errorMessages = result.errors
            .map((e: ApiError) => `${e.field}: ${e.message}`)
            .join(', ');
          throw new Error(errorMessages);
        }
        throw new Error(result.message || 'Failed to update testimonial');
      }
      
      if (!result.data) {
        throw new Error('No data returned from server');
      }
      
      return Array.isArray(result.data) ? result.data[0] : result.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const response = await axiosInstance.delete(`/testimonials/${id}`);
      const result = response.data as TestimonialResponse;
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to delete testimonial');
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateStatus(id: string, status: 'pending' | 'approved' | 'rejected'): Promise<Testimonial> {
    try {
      const response = await axiosInstance.put(`/testimonials/${id}/status`, { status });
      const result = response.data as TestimonialResponse;
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to update testimonial status');
      }
      
      if (!result.data) {
        throw new Error('No data returned from server');
      }
      
      return Array.isArray(result.data) ? result.data[0] : result.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async toggleFeatured(id: string, featured: boolean): Promise<Testimonial> {
    try {
      const response = await axiosInstance.patch(`/testimonials/${id}/featured`, { featured });
      const result = response.data as TestimonialResponse;
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to update featured status');
      }
      
      if (!result.data) {
        throw new Error('No data returned from server');
      }
      
      return Array.isArray(result.data) ? result.data[0] : result.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  validateForm(data: TestimonialFormData, editingItem: Testimonial | null = null): Record<string, string> {
    const errors: Record<string, string> = {};
    
    if (!data.name.trim()) {
      errors.name = 'Name is required';
    } else if (data.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    } else if (data.name.trim().length > 100) {
      errors.name = 'Name cannot exceed 100 characters';
    }
    
    if (!data.university.trim()) {
      errors.university = 'University is required';
    } else if (data.university.trim().length < 2) {
      errors.university = 'University must be at least 2 characters';
    } else if (data.university.trim().length > 200) {
      errors.university = 'University cannot exceed 200 characters';
    }
    
    if (!data.location.trim()) {
      errors.location = 'Location is required';
    } else if (data.location.trim().length < 2) {
      errors.location = 'Location must be at least 2 characters';
    } else if (data.location.trim().length > 100) {
      errors.location = 'Location cannot exceed 100 characters';
    }
    
    if (!data.rating || data.rating < 1 || data.rating > 5) {
      errors.rating = 'Rating must be between 1 and 5';
    }
    
    if (!data.title.trim()) {
      errors.title = 'Title is required';
    } else if (data.title.trim().length < 5) {
      errors.title = 'Title must be at least 5 characters';
    } else if (data.title.trim().length > 200) {
      errors.title = 'Title cannot exceed 200 characters';
    }
    
    if (!data.content.trim()) {
      errors.content = 'Content is required';
    } else if (data.content.trim().length < 20) {
      errors.content = 'Content must be at least 20 characters';
    } else if (data.content.trim().length > 1000) {
      errors.content = 'Content cannot exceed 1000 characters';
    }
    
    if (!data.houseName.trim()) {
      errors.houseName = 'House name is required';
    } else if (data.houseName.trim().length < 2) {
      errors.houseName = 'House name must be at least 2 characters';
    } else if (data.houseName.trim().length > 200) {
      errors.houseName = 'House name cannot exceed 200 characters';
    }
    
    if (!editingItem && !data.image) {
      errors.image = 'Image is required';
    }
    
    if (data.email && !data.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      errors.email = 'Please enter a valid email address';
    }
    
    return errors;
  }
}

// ============================================
// CUSTOM HOOK
// ============================================
const useTestimonial = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const model = new TestimonialModel();

  const loadTestimonials = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await model.getAll();
      setTestimonials(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load testimonials';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTestimonial = useCallback(async (data: TestimonialFormData): Promise<Testimonial> => {
    try {
      setIsSubmitting(true);
      setError(null);
      const newItem = await model.create(data);
      setTestimonials(prev => [newItem, ...prev]);
      return newItem;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create testimonial';
      setError(message);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const updateTestimonial = useCallback(async (id: string, data: TestimonialFormData): Promise<Testimonial> => {
    try {
      setIsSubmitting(true);
      setError(null);
      const updatedItem = await model.update(id, data);
      setTestimonials(prev => prev.map(m => m._id === updatedItem._id ? updatedItem : m));
      return updatedItem;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update testimonial';
      setError(message);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const deleteTestimonial = useCallback(async (id: string): Promise<void> => {
    try {
      setIsSubmitting(true);
      setError(null);
      await model.delete(id);
      setTestimonials(prev => prev.filter(m => m._id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete testimonial';
      setError(message);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const updateStatus = useCallback(async (id: string, status: 'pending' | 'approved' | 'rejected'): Promise<Testimonial> => {
    try {
      setIsSubmitting(true);
      setError(null);
      const updatedItem = await model.updateStatus(id, status);
      setTestimonials(prev => prev.map(m => m._id === updatedItem._id ? updatedItem : m));
      return updatedItem;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update status';
      setError(message);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const toggleFeatured = useCallback(async (id: string, featured: boolean): Promise<Testimonial> => {
    try {
      setIsSubmitting(true);
      setError(null);
      const updatedItem = await model.toggleFeatured(id, featured);
      setTestimonials(prev => prev.map(m => m._id === updatedItem._id ? updatedItem : m));
      return updatedItem;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to toggle featured';
      setError(message);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const validateForm = useCallback((data: TestimonialFormData, editingItem: Testimonial | null = null): Record<string, string> => {
    return model.validateForm(data, editingItem);
  }, []);

  useEffect(() => {
    loadTestimonials();
  }, [loadTestimonials]);

  return {
    testimonials,
    loading,
    error,
    isSubmitting,
    loadTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    updateStatus,
    toggleFeatured,
    validateForm,
  };
};

// ============================================
// RATING STARS COMPONENT
// ============================================
interface RatingStarsProps {
  rating: number;
  size?: 'small' | 'medium' | 'large';
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

const RatingStars: React.FC<RatingStarsProps> = ({ 
  rating, 
  size = 'medium', 
  interactive = false,
  onChange 
}) => {
  const [hoverRating, setHoverRating] = useState<number>(0);
  
  const sizes = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
  };
  
  const displayRating = hoverRating || rating;
  
  const handleClick = (value: number) => {
    if (interactive && onChange) {
      onChange(value);
    }
  };
  
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'} ${interactive ? 'focus:outline-none' : ''}`}
          onClick={() => handleClick(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          disabled={!interactive}
        >
          {star <= displayRating ? (
            <StarIcon className={`${sizes[size]} text-yellow-400`} />
          ) : star - 0.5 <= displayRating ? (
            <StarHalfIcon className={`${sizes[size]} text-yellow-400`} />
          ) : (
            <StarBorderIcon className={`${sizes[size]} text-gray-300`} />
          )}
        </button>
      ))}
    </div>
  );
};

// ============================================
// STATUS BADGE COMPONENT
// ============================================
interface StatusBadgeProps {
  status: 'pending' | 'approved' | 'rejected';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = {
    pending: {
      icon: <PendingIcon className="w-4 h-4" />,
      label: 'Pending',
      className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    },
    approved: {
      icon: <CheckCircleRoundedIcon className="w-4 h-4" />,
      label: 'Approved',
      className: 'bg-green-100 text-green-700 border-green-200',
    },
    rejected: {
      icon: <CancelIcon className="w-4 h-4" />,
      label: 'Rejected',
      className: 'bg-red-100 text-red-700 border-red-200',
    },
  };
  
  const { icon, label, className } = config[status];
  
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${className}`}>
      {icon}
      {label}
    </span>
  );
};

// ============================================
// VIEW MODAL COMPONENT
// ============================================
interface ViewModalProps {
  testimonial: Testimonial | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange?: (status: 'pending' | 'approved' | 'rejected') => void;
  onToggleFeatured?: () => void;
}

const ViewModal: React.FC<ViewModalProps> = ({ 
  testimonial, 
  isOpen, 
  onClose, 
  onEdit, 
  onDelete,
  onStatusChange,
  onToggleFeatured,
}) => {
  if (!isOpen || !testimonial) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10 rounded-t-xl">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <VisibilityIcon className="w-6 h-6 text-indigo-600" />
            Testimonial Details
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
                src={testimonial.image?.url || testimonial.image?.secure_url}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100 shadow-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    testimonial.name
                  )}&size=150&background=indigo&color=fff&font-size=0.5`;
                }}
              />
            </div>
          </div>

          {/* Name & Title */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">{testimonial.name}</h3>
            <div className="flex justify-center items-center gap-2 mt-1 flex-wrap">
              <span className="text-gray-500">{testimonial.university}</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500">{testimonial.location}</span>
            </div>
            <div className="flex justify-center items-center gap-3 mt-2">
              <RatingStars rating={testimonial.rating} size="medium" />
              <span className="text-sm font-medium text-gray-600">
                {testimonial.rating.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Status & Verification Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <StatusBadge status={testimonial.status} />
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
              testimonial.verified 
                ? 'bg-green-100 text-green-700 border-green-200' 
                : 'bg-gray-100 text-gray-500 border-gray-200'
            }`}>
              <VerifiedIcon className="w-4 h-4" />
              {testimonial.verified ? 'Verified' : 'Not Verified'}
            </span>
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
              testimonial.featured 
                ? 'bg-amber-100 text-amber-700 border-amber-200' 
                : 'bg-gray-100 text-gray-500 border-gray-200'
            }`}>
              {testimonial.featured ? (
                <StarIcon className="w-4 h-4" />
              ) : (
                <StarBorderIcon className="w-4 h-4" />
              )}
              {testimonial.featured ? 'Featured' : 'Not Featured'}
            </span>
          </div>

          {/* Title */}
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-gray-800">{testimonial.title}</h4>
          </div>

          {/* Content */}
          <div className="mb-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed">{testimonial.content}</p>
            </div>
          </div>

          {/* House */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">House</h4>
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
              <HomeIcon className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700 font-medium">{testimonial.houseName}</span>
            </div>
          </div>

          {/* Email */}
          {testimonial.email && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Email</h4>
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
                <EmailIcon className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{testimonial.email}</span>
              </div>
            </div>
          )}

          {/* Meta Info */}
          <div className="border-t border-gray-100 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <CalendarTodayIcon className="w-4 h-4" />
                <span>Created: {formatDate(testimonial.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <RefreshIcon className="w-4 h-4" />
                <span>Updated: {formatDate(testimonial.updatedAt)}</span>
              </div>
              {testimonial.date && (
                <div className="flex items-center gap-2 text-gray-500">
                  <CalendarTodayIcon className="w-4 h-4" />
                  <span>Date: {formatDate(testimonial.date)}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-500">
                <PersonIcon className="w-4 h-4" />
                <span>ID: {testimonial._id?.slice(0, 12)}...</span>
              </div>
            </div>
          </div>

          {/* Status Actions */}
          {onStatusChange && testimonial.status !== 'approved' && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Actions</h4>
              <div className="flex flex-wrap gap-2">
                {testimonial.status === 'pending' && (
                  <>
                    <button
                      onClick={() => onStatusChange('approved')}
                      className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      <CheckCircleRoundedIcon className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => onStatusChange('rejected')}
                      className="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                      <CancelIcon className="w-4 h-4" />
                      Reject                    </button>
                  </>
                )}
                {testimonial.status === 'rejected' && (
                  <button
                    onClick={() => onStatusChange('pending')}
                    className="flex items-center gap-2 px-3 py-1.5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
                  >
                    <PendingIcon className="w-4 h-4" />
                    Reset to Pending
                  </button>
                )}
                {onToggleFeatured && (
                  <button
                    onClick={onToggleFeatured}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors text-sm ${
                      testimonial.featured 
                        ? 'bg-gray-600 text-white hover:bg-gray-700' 
                        : 'bg-amber-600 text-white hover:bg-amber-700'
                    }`}
                  >
                    <StarIcon className="w-4 h-4" />
                    {testimonial.featured ? 'Remove Featured' : 'Make Featured'}
                  </button>
                )}
              </div>
            </div>
          )}

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
// VALIDATION INDICATOR COMPONENT
// ============================================
interface ValidationIndicatorProps {
  field: string;
  formErrors: Record<string, string>;
  formData: TestimonialFormData;
  editingItem: Testimonial | null;
}

const ValidationIndicator: React.FC<ValidationIndicatorProps> = ({ 
  field, 
  formErrors, 
  formData,
  editingItem 
}) => {
  const error = formErrors[field];
  
  if (field === 'image') {
    if (!formData.imagePreview && !editingItem) return null;
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

  if (field === 'email' && !formData.email) return null;

  const value = formData[field as keyof TestimonialFormData];
  if (!value && field !== 'email' && field !== 'rating') return null;
  
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
// MAIN COMPONENT
// ============================================
export const TestimonialManagement: React.FC = () => {
  // Use the custom hook
  const { 
    testimonials, 
    loading, 
    error, 
    createTestimonial, 
    updateTestimonial, 
    deleteTestimonial,
    updateStatus,
    toggleFeatured,
    validateForm 
  } = useTestimonial();

  // Local state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [viewingItem, setViewingItem] = useState<Testimonial | null>(null);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);
  const [formData, setFormData] = useState<TestimonialFormData>({
    name: '',
    university: '',
    location: '',
    rating: 5,
    title: '',
    content: '',
    houseName: '',
    image: null,
    imagePreview: '',
    email: '',
    verified: false,
    status: 'pending',
    featured: false,
    date: new Date().toISOString().split('T')[0],
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

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
  
  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showSuccessModal = (title: string, message: string, details?: string) => {
    setSuccessModal({ isOpen: true, title, message, details });
  };

  const showErrorModal = (title: string, message: string, details?: string) => {
    setErrorModal({ isOpen: true, title, message, details });
  };

  // Filter testimonials
  const filteredTestimonials = testimonials
    .filter(t => filterStatus === 'all' || t.status === filterStatus)
    .filter(t => 
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.houseName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Check form validity
  useEffect(() => {
    const errors = validateForm(formData, editingItem);
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  }, [formData, editingItem, validateForm]);

  const handleOpenModal = (item?: Testimonial) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        university: item.university,
        location: item.location,
        rating: item.rating,
        title: item.title,
        content: item.content,
        houseName: item.houseName,
        image: null,
        imagePreview: item.image?.url || item.image?.secure_url || '',
        email: item.email || '',
        verified: item.verified || false,
        status: item.status || 'pending',
        featured: item.featured || false,
        date: item.date ? new Date(item.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        university: '',
        location: '',
        rating: 5,
        title: '',
        content: '',
        houseName: '',
        image: null,
        imagePreview: '',
        email: '',
        verified: false,
        status: 'pending',
        featured: false,
        date: new Date().toISOString().split('T')[0],
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({
      name: '',
      university: '',
      location: '',
      rating: 5,
      title: '',
      content: '',
      houseName: '',
      image: null,
      imagePreview: '',
      email: '',
      verified: false,
      status: 'pending',
      featured: false,
      date: new Date().toISOString().split('T')[0],
    });
    setFormErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleViewItem = (item: Testimonial) => {
    setViewingItem(item);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setViewingItem(null);
  };

  const handleEditFromView = () => {
    if (viewingItem) {
      handleCloseViewModal();
      handleOpenModal(viewingItem);
    }
  };

  const handleDeleteFromView = () => {
    if (viewingItem?._id) {
      setDeletingItemId(viewingItem._id);
      setIsDeleteModalOpen(true);
      handleCloseViewModal();
    }
  };

  const handleStatusChangeFromView = async (status: 'pending' | 'approved' | 'rejected') => {
    if (viewingItem?._id) {
      try {
        await updateStatus(viewingItem._id, status);
        showSuccessModal(
          'Success!',
          `Testimonial ${status} successfully!`,
          `${viewingItem.name}'s testimonial has been ${status}`
        );
        handleCloseViewModal();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to update status';
        showErrorModal('Error', message);
      }
    }
  };

  const handleToggleFeaturedFromView = async () => {
    if (viewingItem?._id) {
      try {
        await toggleFeatured(viewingItem._id, !viewingItem.featured);
        showSuccessModal(
          'Success!',
          `Featured status updated successfully!`,
          `${viewingItem.name}'s testimonial is now ${!viewingItem.featured ? 'featured' : 'not featured'}`
        );
        handleCloseViewModal();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to update featured status';
        showErrorModal('Error', message);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked,
      }));
    } else if (name === 'rating') {
      setFormData(prev => ({
        ...prev,
        rating: parseInt(value) || 0,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFormErrors(prev => ({ ...prev, image: 'Image size should be less than 5MB' }));
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setFormErrors(prev => ({ ...prev, image: 'File must be an image' }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result as string,
        }));
        if (formErrors.image) {
          setFormErrors(prev => {
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
    setFormData(prev => ({
      ...prev,
      image: null,
      imagePreview: '',
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm(formData, editingItem);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingItem) {
        const updated = await updateTestimonial(editingItem._id!, formData);
        showSuccessModal(
          'Success!',
          'Testimonial updated successfully!',
          `${updated.name}'s testimonial has been updated`
        );
      } else {
        const created = await createTestimonial(formData);
        showSuccessModal(
          'Success!',
          'Testimonial added successfully!',
          `${created.name}'s testimonial has been added`
        );
      }
      handleCloseModal();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save testimonial';
      showErrorModal('Error', message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingItemId) return;
    
    setIsSubmitting(true);
    try {
      await deleteTestimonial(deletingItemId);
      showSuccessModal(
        'Success!',
        'Testimonial deleted successfully!',
        'The testimonial has been removed from the system'
      );
      setIsDeleteModalOpen(false);
      setDeletingItemId(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete testimonial';
      showErrorModal('Error', message);
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
          <p className="mt-4 text-gray-600">Loading testimonials...</p>
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
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Testimonials</h3>
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
              <StarIcon className="w-8 h-8 text-yellow-400" />
              Testimonial Management
            </h1>
            <p className="text-gray-500 mt-1">Manage student testimonials and reviews</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-md"
          >
            <AddIcon className="w-5 h-5" />
            Add Testimonial
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, university, title, or house..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg transition-all ${
                filterStatus === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-4 py-2 rounded-lg transition-all ${
                filterStatus === 'pending'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilterStatus('approved')}
              className={`px-4 py-2 rounded-lg transition-all ${
                filterStatus === 'approved'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setFilterStatus('rejected')}
              className={`px-4 py-2 rounded-lg transition-all ${
                filterStatus === 'rejected'
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              Rejected
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        {filteredTestimonials.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <StarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Testimonials Found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Start collecting testimonials by adding the first one.'}
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <button
                onClick={() => handleOpenModal()}
                className="inline-flex items-center gap-2 px-4 py-2 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                <AddIcon className="w-5 h-5" />
                Add Your First Testimonial
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonials.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-48 bg-gradient-to-r from-indigo-500 to-purple-600">
                  <img
                    src={item.image?.url || item.image?.secure_url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        item.name
                      )}&size=200&background=indigo&color=fff&font-size=0.5`;
                    }}
                  />
                  <div className="absolute inset-0 bg-opacity-20 flex items-end p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewItem(item)}
                        className="p-2 bg-white rounded-full hover:bg-indigo-50 transition-colors shadow-md"
                        title="View Details"
                      >
                        <VisibilityIcon className="w-4 h-4 text-indigo-600" />
                      </button>
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="p-2 bg-white rounded-full hover:bg-indigo-50 transition-colors shadow-md"
                        title="Edit"
                      >
                        <EditIcon className="w-4 h-4 text-indigo-600" />
                      </button>
                      <button
                        onClick={() => {
                          setDeletingItemId(item._id!);
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
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{item.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-1">{item.university}</p>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <RatingStars rating={item.rating} size="small" />
                    <span className="text-xs text-gray-500">{item.rating.toFixed(1)}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-700 mt-2 line-clamp-1">{item.title}</p>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.content}</p>
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                    <HomeIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500 line-clamp-1">{item.houseName}</span>
                  </div>
                  <div className="flex gap-3 mt-3">
                    {item.verified && (
                      <span className="inline-flex items-center gap-1 text-xs text-green-600">
                        <VerifiedIcon className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                    {item.featured && (
                      <span className="inline-flex items-center gap-1 text-xs text-amber-600">
                        <StarIcon className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View Modal */}
        <ViewModal
          testimonial={viewingItem}
          isOpen={isViewModalOpen}
          onClose={handleCloseViewModal}
          onEdit={handleEditFromView}
          onDelete={handleDeleteFromView}
          onStatusChange={handleStatusChangeFromView}
          onToggleFeatured={handleToggleFeaturedFromView}
        />

        {/* Create/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
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
                        formErrors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter full name"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {formData.name && (
                        formErrors.name ? (
                          <ErrorIcon className="w-5 h-5 text-red-500" />
                        ) : (
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        )
                      )}
                    </div>
                  </div>
                  <ValidationIndicator 
                    field="name" 
                    formErrors={formErrors} 
                    formData={formData}
                    editingItem={editingItem}
                  />
                </div>

                {/* University */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    University <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <SchoolIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="university"
                      value={formData.university}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all ${
                        formErrors.university ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., University of Rwanda"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {formData.university && (
                        formErrors.university ? (
                          <ErrorIcon className="w-5 h-5 text-red-500" />
                        ) : (
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        )
                      )}
                    </div>
                  </div>
                  <ValidationIndicator 
                    field="university" 
                    formErrors={formErrors} 
                    formData={formData}
                    editingItem={editingItem}
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <LocationOnIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all ${
                        formErrors.location ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Kigali, Rwanda"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {formData.location && (
                        formErrors.location ? (
                          <ErrorIcon className="w-5 h-5 text-red-500" />
                        ) : (
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        )
                      )}
                    </div>
                  </div>
                  <ValidationIndicator 
                    field="location" 
                    formErrors={formErrors} 
                    formData={formData}
                    editingItem={editingItem}
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-4">
                    <RatingStars 
                      rating={formData.rating} 
                      size="large" 
                      interactive={true}
                      onChange={(value) => {
                        setFormData(prev => ({ ...prev, rating: value }));
                        if (formErrors.rating) {
                          setFormErrors(prev => {
                            const newErrors = { ...prev };
                            delete newErrors.rating;
                            return newErrors;
                          });
                        }
                      }}
                    />
                    <span className="text-sm font-medium text-gray-600">
                      {formData.rating.toFixed(1)}
                    </span>
                  </div>
                  {formErrors.rating && (
                    <div className="flex items-center mt-1 text-sm text-red-500">
                      <ErrorIcon className="w-4 h-4 mr-1" />
                      <span>{formErrors.rating}</span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DescriptionIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all ${
                        formErrors.title ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Amazing Experience!"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {formData.title && (
                        formErrors.title ? (
                          <ErrorIcon className="w-5 h-5 text-red-500" />
                        ) : (
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        )
                      )}
                    </div>
                  </div>
                  <ValidationIndicator 
                    field="title" 
                    formErrors={formErrors} 
                    formData={formData}
                    editingItem={editingItem}
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DescriptionIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none ${
                        formErrors.content ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Write the testimonial content..."
                    />
                    <div className="absolute right-3 top-3">
                      {formData.content && (
                        formErrors.content ? (
                          <ErrorIcon className="w-5 h-5 text-red-500" />
                        ) : (
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        )
                      )}
                    </div>
                  </div>
                  <ValidationIndicator 
                    field="content" 
                    formErrors={formErrors} 
                    formData={formData}
                    editingItem={editingItem}
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    {formData.content.length}/20 characters minimum
                  </p>
                </div>

                {/* House Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    House Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <HomeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="houseName"
                      value={formData.houseName}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all ${
                        formErrors.houseName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Golden Apartments"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {formData.houseName && (
                        formErrors.houseName ? (
                          <ErrorIcon className="w-5 h-5 text-red-500" />
                        ) : (
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        )
                      )}
                    </div>
                  </div>
                  <ValidationIndicator 
                    field="houseName" 
                    formErrors={formErrors} 
                    formData={formData}
                    editingItem={editingItem}
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Image {!editingItem && <span className="text-red-500">*</span>}
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
                          formErrors.image ? 'border-red-500' : 'border-gray-300 hover:border-indigo-500'
                        }`}
                      >
                        <ImageIcon className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-600">
                          {formData.imagePreview ? 'Change Image' : 'Upload Image'}
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
                          className="absolute -top-1 -right-1 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
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
                    editingItem={editingItem}
                  />
                  <p className="text-xs text-gray-500 mt-1">Max file size: 5MB. Supported formats: JPEG, PNG, GIF</p>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <EmailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all ${
                        formErrors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="student@example.com (optional)"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {formData.email && (
                        formErrors.email ? (
                          <ErrorIcon className="w-5 h-5 text-red-500" />
                        ) : (
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        )
                      )}
                    </div>
                  </div>
                  <ValidationIndicator 
                    field="email" 
                    formErrors={formErrors} 
                    formData={formData}
                    editingItem={editingItem}
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <div className="relative">
                    <CalendarTodayIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Verified & Featured */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="verified"
                      checked={formData.verified}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label className="text-sm font-medium text-gray-700">
                      Verified
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label className="text-sm font-medium text-gray-700">
                      Featured
                    </label>
                  </div>
                </div>

                {/* Status */}
                {editingItem && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                )}

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
                        ? 'bg-indigo-600 hover:bg-indigo-700'
                        : 'bg-gray-400 cursor-not-allowed'
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
                        {editingItem ? 'Update' : 'Create'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeletingItemId(null);
          }}
          onConfirm={handleDelete}
          title="Delete Testimonial"
          message="Are you sure you want to delete this testimonial? This action cannot be undone."
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