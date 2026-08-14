// /* eslint-disable react-hooks/immutability */
// /* eslint-disable react-hooks/set-state-in-effect */

// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-toastify";
// import Cookies from "js-cookie";

// // Material-UI Icons
// import StarIcon from "@mui/icons-material/Star";
// import StarBorderIcon from "@mui/icons-material/StarBorder";
// import StarHalfIcon from "@mui/icons-material/StarHalf";
// import SchoolIcon from "@mui/icons-material/School";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import VerifiedIcon from "@mui/icons-material/Verified";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import HomeIcon from "@mui/icons-material/Home";
// import RateReviewIcon from "@mui/icons-material/RateReview";
// import CloseIcon from "@mui/icons-material/Close";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import PauseIcon from "@mui/icons-material/Pause";

// interface Testimonial {
//   _id: string;
//   name: string;
//   university: string;
//   location: string;
//   rating: number;
//   date: string;
//   title: string;
//   content: string;
//   image: {
//     public_id: string;
//     url: string;
//     secure_url: string;
//   };
//   verified: boolean;
//   status: string;
//   email: string;
//   featured: boolean;
//   houseName?: string;
//   helpful?: number;
//   notHelpful?: number;
//   createdAt?: string;
//   updatedAt?: string;
// }

// interface ApiResponse {
//   success: boolean;
//   data: Testimonial[];
//   pagination: {
//     page: number;
//     limit: number;
//     total: number;
//     pages: number;
//   };
// }

// const translations = {
//   en: {
//     title: "Student Testimonials",
//     subtitle: "Real Stories from Students Who Found Their Perfect Home",
//     description:
//       "Hear from students across Rwanda who found safe, affordable, and comfortable housing through INYUMBA PROJECT.",
//     verified: "Verified Student",
//     rating: "Rating",
//     helpful: "Helpful",
//     notHelpful: "Not Helpful",
//     readMore: "Read Full Review",
//     showLess: "Show Less",
//     from: "Student at",
//     stayed: "Stayed at",
//     months: "months",
//     shareExperience: "Share Your Experience",
//     shareDesc:
//       "Have you found your home through INYUMBA PROJECT? Share your story and help other students!",
//     writeReview: "Write a Review",
//     noTestimonials: "No testimonials found",
//     filterBy: "Filter by University",
//     allUniversities: "All Universities",
//     sortBy: "Sort by",
//     newest: "Newest First",
//     oldest: "Oldest First",
//     highestRated: "Highest Rated",
//     lowestRated: "Lowest Rated",
//     averageRating: "Average Rating",
//     totalReviews: "Total Reviews",
//     verifiedReview: "Verified Review",
//     studentReview: "Student Review",
//     pause: "Pause",
//     play: "Play",
//   },
//   fr: {
//     title: "Témoignages d'Étudiants",
//     subtitle:
//       "Des Histoires Vraies d'Étudiants Qui Ont Trouvé Leur Logement Parfait",
//     description:
//       "Écoutez les étudiants à travers le Rwanda qui ont trouvé un logement sûr, abordable et confortable grâce à INYUMBA PROJECT.",
//     verified: "Étudiant Vérifié",
//     rating: "Évaluation",
//     helpful: "Utile",
//     notHelpful: "Pas Utile",
//     readMore: "Lire l'Avis Complet",
//     showLess: "Voir Moins",
//     from: "Étudiant à",
//     stayed: "A séjourné à",
//     months: "mois",
//     shareExperience: "Partagez Votre Expérience",
//     shareDesc:
//       "Avez-vous trouvé votre logement via INYUMBA PROJECT ? Partagez votre histoire et aidez d'autres étudiants !",
//     writeReview: "Écrire un Avis",
//     noTestimonials: "Aucun témoignage trouvé",
//     filterBy: "Filtrer par Université",
//     allUniversities: "Toutes les Universités",
//     sortBy: "Trier par",
//     newest: "Plus Récents",
//     oldest: "Plus Anciens",
//     highestRated: "Mieux Notés",
//     lowestRated: "Moins Bien Notés",
//     averageRating: "Évaluation Moyenne",
//     totalReviews: "Avis Totaux",
//     verifiedReview: "Avis Vérifié",
//     studentReview: "Avis d'Étudiant",
//     pause: "Pause",
//     play: "Lecture",
//   },
//   rw: {
//     title: "Ibyo Abanyeshuri Bavuga",
//     subtitle: "Inkuru Nyabyo Z'abanyeshuri Babonye Inzu Nziza",
//     description:
//       "Umu abanyeshuri bo mu Rwanda babonye amazu meza, afite umutekano, kandi ari buhendutse binyuze muri INYUMBA PROJECT.",
//     verified: "Umunyeshuri Umejwe",
//     rating: "Igipimo",
//     helpful: "Byagufashije",
//     notHelpful: "Ntabwo byagufashije",
//     readMore: "Soma Byinshi",
//     showLess: "Garagaza Bike",
//     from: "Umunyeshuri i",
//     stayed: "Yabaye i",
//     months: "amezi",
//     shareExperience: "Tanga Ubuhamya Bwawe",
//     shareDesc:
//       "Wabonye inzu yawe binyuze muri INYUMBA PROJECT? Tanga ubuhamya bwawe ugafasha abandi banyeshuri!",
//     writeReview: "Andika Ubuhamya",
//     noTestimonials: "Nta buhamya buboneka",
//     filterBy: "Hitamo Kaminuza",
//     allUniversities: "Kaminuza Zose",
//     sortBy: "Hitamo Uburyo",
//     newest: "Zishya",
//     oldest: "Zishaje",
//     highestRated: "Zifite Igipimo Cyinshi",
//     lowestRated: "Zifite Igipimo Gito",
//     averageRating: "Igipimo Rusange",
//     totalReviews: "Ubuso Bw'ubuhamya",
//     verifiedReview: "Ubuhamya Bwemejwe",
//     studentReview: "Ubuhamya Bw'umunyeshuri",
//     pause: "Hagarika",
//     play: "Kora",
//   },
// };

// // Helper function to get language from cookies
// const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
//   const lang = Cookies.get("language") as "en" | "fr" | "rw";
//   return lang || "en";
// };

// export const Testimonials: React.FC = () => {
//   // Get language from cookies
//   const [lang, setLang] = useState<"en" | "fr" | "rw">(
//     getLanguageFromCookies(),
//   );
//   const [allTestimonials, setAllTestimonials] = useState<Testimonial[]>([]);
//   const [filteredTestimonials, setFilteredTestimonials] = useState<
//     Testimonial[]
//   >([]);
//   const [selectedUniversity, setSelectedUniversity] = useState<string>("all");
//   const [sortBy, setSortBy] = useState<string>("newest");
//   const [isLoading, setIsLoading] = useState(true);

//   const [selectedTestimonial, setSelectedTestimonial] =
//     useState<Testimonial | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Auto-slide states
//   const [slideIndex, setSlideIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [itemsPerSlide, setItemsPerSlide] = useState(2);
//   const slideIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   const t = translations[lang];

//   // Fetch testimonials from API
//   useEffect(() => {
//     const fetchTestimonials = async () => {
//       try {
//         setIsLoading(true);

//         const response = await fetch(
//           "https://rene-inyumba-nodejs.onrender.com/testimonials",
//         );

//         const result: ApiResponse = await response.json();

//         if (result.success) {
//           const testimonialsWithHelpers = (result.data || []).map((item) => ({
//             ...item,
//             helpful: item.helpful ?? 0,
//             notHelpful: item.notHelpful ?? 0,
//           }));

//           setAllTestimonials(testimonialsWithHelpers);
//         } else {
//           toast.error("Failed to load testimonials");
//         }
//       } catch (error) {
//         console.error("Error fetching testimonials:", error);
//         toast.error("Error loading testimonials");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchTestimonials();
//   }, []);

//   // Get unique universities from all testimonials
//   const universities = [
//     "all",
//     ...new Set(allTestimonials.map((t) => t.university).filter(Boolean)),
//   ];

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

//   // Handle responsive items per slide
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 640) {
//         setItemsPerSlide(1);
//       } else if (window.innerWidth < 1024) {
//         setItemsPerSlide(2);
//       } else {
//         setItemsPerSlide(3);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Auto-slide effect
//   useEffect(() => {
//     if (isPlaying && filteredTestimonials.length > itemsPerSlide) {
//       slideIntervalRef.current = setInterval(() => {
//         setSlideIndex((prev) => {
//           const nextIndex = prev + itemsPerSlide;
//           return nextIndex >= filteredTestimonials.length ? 0 : nextIndex;
//         });
//       }, 4000);
//     } else {
//       if (slideIntervalRef.current) {
//         clearInterval(slideIntervalRef.current);
//         slideIntervalRef.current = null;
//       }
//     }

//     return () => {
//       if (slideIntervalRef.current) {
//         clearInterval(slideIntervalRef.current);
//         slideIntervalRef.current = null;
//       }
//     };
//   }, [isPlaying, filteredTestimonials, itemsPerSlide]);

//   // Reset slide index when filters change
//   useEffect(() => {
//     setSlideIndex(0);
//   }, [selectedUniversity, sortBy]);

//   // Filter and sort testimonials - Show ALL testimonials (no status filter)
//   useEffect(() => {
//     // Start with all testimonials (no status filter)
//     let filtered = [...allTestimonials];

//     // Then filter by university
//     if (selectedUniversity !== "all") {
//       filtered = filtered.filter((t) => t.university === selectedUniversity);
//     }

//     // Then sort
//     switch (sortBy) {
//       case "newest":
//         filtered.sort(
//           (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
//         );
//         break;
//       case "oldest":
//         filtered.sort(
//           (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
//         );
//         break;
//       case "highest":
//         filtered.sort((a, b) => b.rating - a.rating);
//         break;
//       case "lowest":
//         filtered.sort((a, b) => a.rating - b.rating);
//         break;
//       default:
//         break;
//     }

//     setFilteredTestimonials(filtered);
//   }, [allTestimonials, selectedUniversity, sortBy]);

//   // Calculate statistics - From ALL testimonials
//   const totalReviews = allTestimonials.length;
//   const averageRating =
//     totalReviews > 0
//       ? (
//           allTestimonials.reduce((sum, t) => sum + t.rating, 0) / totalReviews
//         ).toFixed(1)
//       : "0.0";
//   const fiveStarCount = allTestimonials.filter((t) => t.rating === 5).length;

//   const renderStars = (rating: number) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(
//         <StarIcon
//           key={`full-${i}`}
//           className="w-4 h-4 text-yellow-400 fill-current"
//         />,
//       );
//     }

//     if (hasHalfStar) {
//       stars.push(
//         <StarHalfIcon
//           key="half"
//           className="w-4 h-4 text-yellow-400 fill-current"
//         />,
//       );
//     }

//     const remainingStars = 5 - stars.length;
//     for (let i = 0; i < remainingStars; i++) {
//       stars.push(
//         <StarBorderIcon key={`empty-${i}`} className="w-4 h-4 text-gray-300" />,
//       );
//     }

//     return stars;
//   };

//   const openModal = (testimonial: Testimonial) => {
//     setSelectedTestimonial(testimonial);
//     setIsModalOpen(true);
//     document.body.style.overflow = "hidden";
//     setIsPlaying(false);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedTestimonial(null);
//     document.body.style.overflow = "auto";
//     setIsPlaying(true);
//   };

//   const goToSlide = (index: number) => {
//     const maxIndex = Math.max(0, filteredTestimonials.length - itemsPerSlide);
//     setSlideIndex(Math.min(index, maxIndex));
//   };

//   const nextSlide = () => {
//     const nextIndex = slideIndex + itemsPerSlide;
//     setSlideIndex(nextIndex >= filteredTestimonials.length ? 0 : nextIndex);
//   };

//   const prevSlide = () => {
//     const maxIndex = Math.max(0, filteredTestimonials.length - itemsPerSlide);
//     const prevIndex = slideIndex - itemsPerSlide;
//     setSlideIndex(prevIndex < 0 ? maxIndex : prevIndex);
//   };

//   const togglePlay = () => {
//     setIsPlaying(!isPlaying);
//   };

//   // Get current visible testimonials for auto-slide
//   const visibleTestimonials = filteredTestimonials.slice(
//     slideIndex,
//     slideIndex + itemsPerSlide,
//   );

//   const totalSlides = Math.ceil(filteredTestimonials.length / itemsPerSlide);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF385C]"></div>
//           <p className="mt-4 text-gray-600">Loading testimonials...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <section className="relative bg-gradient-to-r from-[#FF385C] to-[#E31C5F] py-16 sm:py-20 md:py-28 overflow-hidden">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-0 right-0 w-72 h-72 bg-white rounded-full -mt-20 -mr-20"></div>
//           <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -mb-40 -ml-40"></div>
//         </div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center text-white"
//           >
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
//               className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6"
//             >
//               <span className="text-sm font-medium flex items-center gap-2">
//                 <RateReviewIcon className="w-4 h-4" />
//                 {t.title}
//               </span>
//             </motion.div>
//             <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
//               {t.subtitle}
//             </h1>
//             <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light">
//               {t.description}
//             </p>
//           </motion.div>
//         </div>
//         <div className="absolute bottom-0 left-0 right-0">
//           <svg
//             viewBox="0 0 1440 120"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H0Z"
//               fill="#F9FAFB"
//             />
//           </svg>
//         </div>
//       </section>

//       {/* Statistics Banner */}
//       <section className="py-8 bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <div className="text-center">
//               <p className="text-3xl font-bold text-[#FF385C]">
//                 {averageRating}
//               </p>
//               <p className="text-sm text-gray-600">{t.averageRating}</p>
//             </div>
//             <div className="text-center">
//               <p className="text-3xl font-bold text-[#FF385C]">
//                 {totalReviews}
//               </p>
//               <p className="text-sm text-gray-600">{t.totalReviews}</p>
//             </div>
//             <div className="text-center">
//               <p className="text-3xl font-bold text-[#FF385C]">
//                 {fiveStarCount}
//               </p>
//               <p className="text-sm text-gray-600">5 {t.rating}</p>
//             </div>
//             <div className="text-center">
//               <p className="text-3xl font-bold text-[#FF385C]">
//                 {totalReviews > 0
//                   ? Math.round((fiveStarCount / totalReviews) * 100)
//                   : 0}
//                 %
//               </p>
//               <p className="text-sm text-gray-600">Satisfaction</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Filters and Sorting */}
//       <section className="py-6 bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
//             <div className="flex flex-wrap gap-3 items-center">
//               <span className="text-sm font-medium text-gray-700">
//                 {t.filterBy}:
//               </span>
//               <select
//                 value={selectedUniversity}
//                 onChange={(e) => setSelectedUniversity(e.target.value)}
//                 className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent"
//               >
//                 {universities.map((uni) => (
//                   <option key={uni} value={uni}>
//                     {uni === "all" ? t.allUniversities : uni}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="flex flex-wrap gap-3 items-center">
//               <span className="text-sm font-medium text-gray-700">
//                 {t.sortBy}:
//               </span>
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent"
//               >
//                 <option value="newest">{t.newest}</option>
//                 <option value="oldest">{t.oldest}</option>
//                 <option value="highest">{t.highestRated}</option>
//                 <option value="lowest">{t.lowestRated}</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Auto-Sliding Testimonials Grid */}
//       <section className="py-12 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {filteredTestimonials.length === 0 ? (
//             <div className="text-center py-12">
//               <p className="text-gray-500">{t.noTestimonials}</p>
//             </div>
//           ) : (
//             <>
//               {/* Controls */}
//               <div className="flex items-center justify-between mb-6">
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={togglePlay}
//                     className="p-2 rounded-full bg-[#FF385C] text-white hover:bg-[#E31C5F] transition-colors shadow-lg shadow-[#FF385C]/30"
//                     aria-label={isPlaying ? t.pause : t.play}
//                   >
//                     {isPlaying ? (
//                       <PauseIcon className="w-5 h-5" />
//                     ) : (
//                       <PlayArrowIcon className="w-5 h-5" />
//                     )}
//                   </button>
//                   <span className="text-sm text-gray-500">
//                     {isPlaying ? t.pause : t.play}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={prevSlide}
//                     className="p-2 rounded-full bg-white border border-gray-200 hover:border-[#FF385C] hover:text-[#FF385C] transition-all"
//                   >
//                     <ArrowBackIcon className="w-4 h-4" />
//                   </button>
//                   <span className="text-sm text-gray-500">
//                     {Math.floor(slideIndex / itemsPerSlide) + 1} / {totalSlides}
//                   </span>
//                   <button
//                     onClick={nextSlide}
//                     className="p-2 rounded-full bg-white border border-gray-200 hover:border-[#FF385C] hover:text-[#FF385C] transition-all"
//                   >
//                     <ArrowForwardIcon className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>

//               {/* Slide Indicators */}
//               <div className="flex justify-center gap-1.5 mb-6">
//                 {Array.from({ length: totalSlides }, (_, i) => i).map((i) => {
//                   const isActive = Math.floor(slideIndex / itemsPerSlide) === i;
//                   return (
//                     <button
//                       key={i}
//                       onClick={() => goToSlide(i * itemsPerSlide)}
//                       className={`h-1.5 rounded-full transition-all duration-300 ${
//                         isActive
//                           ? "w-8 bg-[#FF385C]"
//                           : "w-4 bg-gray-300 hover:bg-gray-400"
//                       }`}
//                     />
//                   );
//                 })}
//               </div>

//               {/* Sliding Cards */}
//               <div className="relative overflow-hidden">
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={slideIndex}
//                     initial={{ opacity: 0, x: 50 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -50 }}
//                     transition={{ duration: 0.5 }}
//                     className={`grid gap-6 ${
//                       itemsPerSlide === 1
//                         ? "grid-cols-1"
//                         : itemsPerSlide === 2
//                           ? "grid-cols-1 sm:grid-cols-2"
//                           : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
//                     }`}
//                   >
//                     {visibleTestimonials.map((testimonial, index) => (
//                       <motion.div
//                         key={testimonial._id}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: index * 0.1 }}
//                         whileHover={{ y: -4 }}
//                         className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
//                       >
//                         {/* Header */}
//                         <div className="flex items-start justify-between mb-3">
//                           <div className="flex items-center gap-3">
//                             <img
//                               src={
//                                 testimonial.image?.url ||
//                                 `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&size=100&background=FF385C&color=fff&font-size=0.5`
//                               }
//                               alt={testimonial.name}
//                               className="w-12 h-12 rounded-full border-2 border-gray-200"
//                             />
//                             <div>
//                               <p className="font-semibold text-gray-900 text-sm">
//                                 {testimonial.name}
//                               </p>
//                               <div className="flex items-center gap-1 text-xs text-gray-500">
//                                 <SchoolIcon className="w-3 h-3" />
//                                 {testimonial.university}
//                               </div>
//                             </div>
//                           </div>
//                           {testimonial.verified && (
//                             <VerifiedIcon className="text-[#FF385C] w-5 h-5" />
//                           )}
//                         </div>

//                         {/* Rating and Date */}
//                         <div className="flex items-center justify-between mb-2">
//                           <div className="flex items-center gap-1">
//                             {renderStars(testimonial.rating)}
//                             <span className="text-xs text-gray-500 ml-1">
//                               ({testimonial.rating})
//                             </span>
//                           </div>
//                           <span className="text-xs text-gray-400">
//                             <CalendarTodayIcon className="w-3 h-3 inline mr-1" />
//                             {new Date(testimonial.date).toLocaleDateString()}
//                           </span>
//                         </div>

//                         {/* House Name */}
//                         {testimonial.houseName && (
//                           <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
//                             <HomeIcon className="w-3 h-3" />
//                             <span>
//                               {t.stayed} {testimonial.houseName}
//                             </span>
//                           </div>
//                         )}

//                         {/* Content */}
//                         <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-3">
//                           {testimonial.content}
//                         </p>

//                         {/* Read More */}
//                         <button
//                           onClick={() => openModal(testimonial)}
//                           className="text-xs text-[#FF385C] font-medium hover:underline"
//                         >
//                           {t.readMore}
//                         </button>
//                       </motion.div>
//                     ))}
//                   </motion.div>
//                 </AnimatePresence>
//               </div>
//             </>
//           )}
//         </div>
//       </section>

//       {/* Share Experience CTA */}
//       <section className="py-12 bg-white">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <div className="bg-gradient-to-r from-[#FF385C] to-[#E31C5F] rounded-3xl p-8 sm:p-12 text-white">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//             >
//               <h3 className="text-2xl sm:text-3xl font-bold mb-3">
//                 {t.shareExperience}
//               </h3>
//               <p className="text-white/90 mb-6 max-w-lg mx-auto">
//                 {t.shareDesc}
//               </p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-8 py-3 bg-white text-[#FF385C] rounded-full font-semibold hover:shadow-lg transition-all duration-300"
//               >
//                 {t.writeReview}
//               </motion.button>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonial Detail Modal */}
//       <AnimatePresence>
//         {isModalOpen && selectedTestimonial && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[700]"
//               onClick={closeModal}
//             />
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9, y: 20 }}
//               className="fixed inset-2 xs:inset-4 z-[701] flex items-center justify-center"
//             >
//               <div className="bg-white rounded-xl xs:rounded-2xl w-full max-w-2xl max-h-[95vh] xs:max-h-[90vh] overflow-hidden shadow-2xl">
//                 <div className="sticky top-0 bg-white border-b border-gray-200 p-4 xs:p-6 flex items-start justify-between z-10">
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={
//                         selectedTestimonial.image?.url ||
//                         `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedTestimonial.name)}&size=100&background=FF385C&color=fff&font-size=0.5`
//                       }
//                       alt={selectedTestimonial.name}
//                       className="w-14 h-14 rounded-full border-2 border-[#FF385C]"
//                     />
//                     <div>
//                       <div className="flex items-center gap-2">
//                         <h3 className="text-lg font-bold text-gray-900">
//                           {selectedTestimonial.name}
//                         </h3>
//                         {selectedTestimonial.verified && (
//                           <VerifiedIcon className="text-[#FF385C] w-4 h-4" />
//                         )}
//                       </div>
//                       <div className="flex items-center gap-2 text-sm text-gray-500">
//                         <SchoolIcon className="w-4 h-4" />
//                         {selectedTestimonial.university}
//                       </div>
//                       {selectedTestimonial.houseName && (
//                         <div className="flex items-center gap-1 text-xs text-gray-400">
//                           <HomeIcon className="w-3 h-3" />
//                           {t.stayed} {selectedTestimonial.houseName}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <button
//                     onClick={closeModal}
//                     className="p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
//                   >
//                     <CloseIcon className="w-5 h-5 text-gray-600" />
//                   </button>
//                 </div>

//                 <div className="p-4 xs:p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
//                   <div className="flex items-center gap-2 mb-4">
//                     {renderStars(selectedTestimonial.rating)}
//                     <span className="text-sm text-gray-500 ml-1">
//                       ({selectedTestimonial.rating}/5)
//                     </span>
//                     <span className="text-xs text-gray-400 ml-auto">
//                       <CalendarTodayIcon className="w-3 h-3 inline mr-1" />
//                       {new Date(selectedTestimonial.date).toLocaleDateString(
//                         "en-US",
//                         {
//                           year: "numeric",
//                           month: "long",
//                           day: "numeric",
//                         },
//                       )}
//                     </span>
//                   </div>

//                   <div className="mb-4">
//                     <h4 className="text-lg font-semibold text-gray-900 mb-2">
//                       {selectedTestimonial.title}
//                     </h4>
//                     <p className="text-gray-600 leading-relaxed whitespace-pre-line">
//                       {selectedTestimonial.content}
//                     </p>
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









/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/set-state-in-effect */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";

// Material-UI Icons
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import SchoolIcon from "@mui/icons-material/School";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VerifiedIcon from "@mui/icons-material/Verified";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HomeIcon from "@mui/icons-material/Home";
import RateReviewIcon from "@mui/icons-material/RateReview";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

interface Testimonial {
  _id: string;
  name: string;
  university: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  image: {
    public_id: string;
    url: string;
    secure_url: string;
  };
  verified: boolean;
  status: string;
  email: string;
  featured: boolean;
  houseName?: string;
  helpful?: number;
  notHelpful?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface ApiResponse {
  success: boolean;
  data: Testimonial[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Translation helper for dynamic content
const translateContent = async (text: string, targetLang: string): Promise<string> => {
  if (!text || targetLang === 'en') return text;
  
  try {
    const response = await axios.post(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
    );
    return response.data[0][0][0] || text;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
};

const translations = {
  en: {
    title: "Student Testimonials",
    subtitle: "Real Stories from Students Who Found Their Perfect Home",
    description:
      "Hear from students across Rwanda who found safe, affordable, and comfortable housing through INYUMBA PROJECT.",
    verified: "Verified Student",
    rating: "Rating",
    helpful: "Helpful",
    notHelpful: "Not Helpful",
    readMore: "Read Full Review",
    showLess: "Show Less",
    from: "Student at",
    stayed: "Stayed at",
    months: "months",
    shareExperience: "Share Your Experience",
    shareDesc:
      "Have you found your home through INYUMBA PROJECT? Share your story and help other students!",
    writeReview: "Write a Review",
    noTestimonials: "No testimonials found",
    filterBy: "Filter by University",
    allUniversities: "All Universities",
    sortBy: "Sort by",
    newest: "Newest First",
    oldest: "Oldest First",
    highestRated: "Highest Rated",
    lowestRated: "Lowest Rated",
    averageRating: "Average Rating",
    totalReviews: "Total Reviews",
    verifiedReview: "Verified Review",
    studentReview: "Student Review",
    pause: "Pause",
    play: "Play",
    loading: "Loading testimonials...",
    satisfaction: "Satisfaction",
  },
  fr: {
    title: "Témoignages d'Étudiants",
    subtitle:
      "Des Histoires Vraies d'Étudiants Qui Ont Trouvé Leur Logement Parfait",
    description:
      "Écoutez les étudiants à travers le Rwanda qui ont trouvé un logement sûr, abordable et confortable grâce à INYUMBA PROJECT.",
    verified: "Étudiant Vérifié",
    rating: "Évaluation",
    helpful: "Utile",
    notHelpful: "Pas Utile",
    readMore: "Lire l'Avis Complet",
    showLess: "Voir Moins",
    from: "Étudiant à",
    stayed: "A séjourné à",
    months: "mois",
    shareExperience: "Partagez Votre Expérience",
    shareDesc:
      "Avez-vous trouvé votre logement via INYUMBA PROJECT ? Partagez votre histoire et aidez d'autres étudiants !",
    writeReview: "Écrire un Avis",
    noTestimonials: "Aucun témoignage trouvé",
    filterBy: "Filtrer par Université",
    allUniversities: "Toutes les Universités",
    sortBy: "Trier par",
    newest: "Plus Récents",
    oldest: "Plus Anciens",
    highestRated: "Mieux Notés",
    lowestRated: "Moins Bien Notés",
    averageRating: "Évaluation Moyenne",
    totalReviews: "Avis Totaux",
    verifiedReview: "Avis Vérifié",
    studentReview: "Avis d'Étudiant",
    pause: "Pause",
    play: "Lecture",
    loading: "Chargement des témoignages...",
    satisfaction: "Satisfaction",
  },
  rw: {
    title: "Ibyo Abanyeshuri Bavuga",
    subtitle: "Inkuru Nyabyo Z'abanyeshuri Babonye Inzu Nziza",
    description:
      "Umu abanyeshuri bo mu Rwanda babonye amazu meza, afite umutekano, kandi ari buhendutse binyuze muri INYUMBA PROJECT.",
    verified: "Umunyeshuri Umejwe",
    rating: "Igipimo",
    helpful: "Byagufashije",
    notHelpful: "Ntabwo byagufashije",
    readMore: "Soma Byinshi",
    showLess: "Garagaza Bike",
    from: "Umunyeshuri i",
    stayed: "Yabaye i",
    months: "amezi",
    shareExperience: "Tanga Ubuhamya Bwawe",
    shareDesc:
      "Wabonye inzu yawe binyuze muri INYUMBA PROJECT? Tanga ubuhamya bwawe ugafasha abandi banyeshuri!",
    writeReview: "Andika Ubuhamya",
    noTestimonials: "Nta buhamya buboneka",
    filterBy: "Hitamo Kaminuza",
    allUniversities: "Kaminuza Zose",
    sortBy: "Hitamo Uburyo",
    newest: "Zishya",
    oldest: "Zishaje",
    highestRated: "Zifite Igipimo Cyinshi",
    lowestRated: "Zifite Igipimo Gito",
    averageRating: "Igipimo Rusange",
    totalReviews: "Ubuso Bw'ubuhamya",
    verifiedReview: "Ubuhamya Bwemejwe",
    studentReview: "Ubuhamya Bw'umunyeshuri",
    pause: "Hagarika",
    play: "Kora",
    loading: "Birakoreshwa...",
    satisfaction: "Kwishimira",
  },
};

// Helper function to get language from cookies
const getLanguageFromCookies = (): "en" | "fr" | "rw" => {
  const lang = Cookies.get("language") as "en" | "fr" | "rw";
  return lang || "en";
};

export const Testimonials: React.FC = () => {
  // Get language from cookies
  const [lang, setLang] = useState<"en" | "fr" | "rw">(
    getLanguageFromCookies(),
  );
  const [allTestimonials, setAllTestimonials] = useState<Testimonial[]>([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState<
    Testimonial[]
  >([]);
  const [selectedUniversity, setSelectedUniversity] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [isLoading, setIsLoading] = useState(true);

  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auto-slide states
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [itemsPerSlide, setItemsPerSlide] = useState(2);
  const slideIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const t = translations[lang];

  // Fetch testimonials from API using axios
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get<ApiResponse>(
          "https://rene-inyumba-nodejs.onrender.com/testimonials",
        );

        const result = response.data;

        if (result.success) {
          const testimonialsWithHelpers = (result.data || []).map((item) => ({
            ...item,
            helpful: item.helpful ?? 0,
            notHelpful: item.notHelpful ?? 0,
          }));

          // Translate all testimonial data if language is not English
          if (lang !== 'en') {
            const translatedTestimonials = await Promise.all(
              testimonialsWithHelpers.map(async (item) => {
                const translatedName = await translateContent(item.name, lang);
                const translatedUniversity = await translateContent(item.university, lang);
                const translatedTitle = await translateContent(item.title, lang);
                const translatedContent = await translateContent(item.content, lang);
                const translatedHouseName = item.houseName ? await translateContent(item.houseName, lang) : undefined;
                const translatedLocation = await translateContent(item.location, lang);

                return {
                  ...item,
                  name: translatedName,
                  university: translatedUniversity,
                  title: translatedTitle,
                  content: translatedContent,
                  houseName: translatedHouseName,
                  location: translatedLocation,
                };
              })
            );
            setAllTestimonials(translatedTestimonials);
          } else {
            setAllTestimonials(testimonialsWithHelpers);
          }
        } else {
          toast.error("Failed to load testimonials");
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        toast.error("Error loading testimonials");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTestimonials();
  }, [lang]);

  // Get unique universities from all testimonials
  const universities = [
    "all",
    ...new Set(allTestimonials.map((t) => t.university).filter(Boolean)),
  ];

  // Listen for language changes in cookies
  useEffect(() => {
    const handleCookieChange = () => {
      const newLang = getLanguageFromCookies();
      if (newLang !== lang) {
        setLang(newLang);
      }
    };

    // Check for cookie changes every second (polling)
    const interval = setInterval(handleCookieChange, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  // Handle responsive items per slide
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (isPlaying && filteredTestimonials.length > itemsPerSlide) {
      slideIntervalRef.current = setInterval(() => {
        setSlideIndex((prev) => {
          const nextIndex = prev + itemsPerSlide;
          return nextIndex >= filteredTestimonials.length ? 0 : nextIndex;
        });
      }, 4000);
    } else {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
        slideIntervalRef.current = null;
      }
    }

    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
        slideIntervalRef.current = null;
      }
    };
  }, [isPlaying, filteredTestimonials, itemsPerSlide]);

  // Reset slide index when filters change
  useEffect(() => {
    setSlideIndex(0);
  }, [selectedUniversity, sortBy]);

  // Filter and sort testimonials - Show ALL testimonials (no status filter)
  useEffect(() => {
    // Start with all testimonials (no status filter)
    let filtered = [...allTestimonials];

    // Then filter by university
    if (selectedUniversity !== "all") {
      filtered = filtered.filter((t) => t.university === selectedUniversity);
    }

    // Then sort
    switch (sortBy) {
      case "newest":
        filtered.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        break;
      case "oldest":
        filtered.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
        break;
      case "highest":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "lowest":
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }

    setFilteredTestimonials(filtered);
  }, [allTestimonials, selectedUniversity, sortBy]);

  // Calculate statistics - From ALL testimonials
  const totalReviews = allTestimonials.length;
  const averageRating =
    totalReviews > 0
      ? (
          allTestimonials.reduce((sum, t) => sum + t.rating, 0) / totalReviews
        ).toFixed(1)
      : "0.0";
  const fiveStarCount = allTestimonials.filter((t) => t.rating === 5).length;

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <StarIcon
          key={`full-${i}`}
          className="w-4 h-4 text-yellow-400 fill-current"
        />,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalfIcon
          key="half"
          className="w-4 h-4 text-yellow-400 fill-current"
        />,
      );
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <StarBorderIcon key={`empty-${i}`} className="w-4 h-4 text-gray-300" />,
      );
    }

    return stars;
  };

  const openModal = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
    setIsPlaying(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTestimonial(null);
    document.body.style.overflow = "auto";
    setIsPlaying(true);
  };

  const goToSlide = (index: number) => {
    const maxIndex = Math.max(0, filteredTestimonials.length - itemsPerSlide);
    setSlideIndex(Math.min(index, maxIndex));
  };

  const nextSlide = () => {
    const nextIndex = slideIndex + itemsPerSlide;
    setSlideIndex(nextIndex >= filteredTestimonials.length ? 0 : nextIndex);
  };

  const prevSlide = () => {
    const maxIndex = Math.max(0, filteredTestimonials.length - itemsPerSlide);
    const prevIndex = slideIndex - itemsPerSlide;
    setSlideIndex(prevIndex < 0 ? maxIndex : prevIndex);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Get current visible testimonials for auto-slide
  const visibleTestimonials = filteredTestimonials.slice(
    slideIndex,
    slideIndex + itemsPerSlide,
  );

  const totalSlides = Math.ceil(filteredTestimonials.length / itemsPerSlide);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF385C]"></div>
          <p className="mt-4 text-gray-600">{t.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#FF385C] to-[#E31C5F] py-16 sm:py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white rounded-full -mt-20 -mr-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -mb-40 -ml-40"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6"
            >
              <span className="text-sm font-medium flex items-center gap-2">
                <RateReviewIcon className="w-4 h-4" />
                {t.title}
              </span>
            </motion.div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {t.subtitle}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light">
              {t.description}
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H0Z"
              fill="#F9FAFB"
            />
          </svg>
        </div>
      </section>

      {/* Statistics Banner */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#FF385C]">
                {averageRating}
              </p>
              <p className="text-sm text-gray-600">{t.averageRating}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#FF385C]">
                {totalReviews}
              </p>
              <p className="text-sm text-gray-600">{t.totalReviews}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#FF385C]">
                {fiveStarCount}
              </p>
              <p className="text-sm text-gray-600">5 {t.rating}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#FF385C]">
                {totalReviews > 0
                  ? Math.round((fiveStarCount / totalReviews) * 100)
                  : 0}
                %
              </p>
              <p className="text-sm text-gray-600">{t.satisfaction}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Sorting */}
      <section className="py-6 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-sm font-medium text-gray-700">
                {t.filterBy}:
              </span>
              <select
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent"
              >
                {universities.map((uni) => (
                  <option key={uni} value={uni}>
                    {uni === "all" ? t.allUniversities : uni}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-sm font-medium text-gray-700">
                {t.sortBy}:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent"
              >
                <option value="newest">{t.newest}</option>
                <option value="oldest">{t.oldest}</option>
                <option value="highest">{t.highestRated}</option>
                <option value="lowest">{t.lowestRated}</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Auto-Sliding Testimonials Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredTestimonials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">{t.noTestimonials}</p>
            </div>
          ) : (
            <>
              {/* Controls */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-full bg-[#FF385C] text-white hover:bg-[#E31C5F] transition-colors shadow-lg shadow-[#FF385C]/30"
                    aria-label={isPlaying ? t.pause : t.play}
                  >
                    {isPlaying ? (
                      <PauseIcon className="w-5 h-5" />
                    ) : (
                      <PlayArrowIcon className="w-5 h-5" />
                    )}
                  </button>
                  <span className="text-sm text-gray-500">
                    {isPlaying ? t.pause : t.play}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    className="p-2 rounded-full bg-white border border-gray-200 hover:border-[#FF385C] hover:text-[#FF385C] transition-all"
                  >
                    <ArrowBackIcon className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-gray-500">
                    {Math.floor(slideIndex / itemsPerSlide) + 1} / {totalSlides}
                  </span>
                  <button
                    onClick={nextSlide}
                    className="p-2 rounded-full bg-white border border-gray-200 hover:border-[#FF385C] hover:text-[#FF385C] transition-all"
                  >
                    <ArrowForwardIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Slide Indicators */}
              <div className="flex justify-center gap-1.5 mb-6">
                {Array.from({ length: totalSlides }, (_, i) => i).map((i) => {
                  const isActive = Math.floor(slideIndex / itemsPerSlide) === i;
                  return (
                    <button
                      key={i}
                      onClick={() => goToSlide(i * itemsPerSlide)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        isActive
                          ? "w-8 bg-[#FF385C]"
                          : "w-4 bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  );
                })}
              </div>

              {/* Sliding Cards */}
              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slideIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className={`grid gap-6 ${
                      itemsPerSlide === 1
                        ? "grid-cols-1"
                        : itemsPerSlide === 2
                          ? "grid-cols-1 sm:grid-cols-2"
                          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    }`}
                  >
                    {visibleTestimonials.map((testimonial, index) => (
                      <motion.div
                        key={testimonial._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -4 }}
                        className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                testimonial.image?.url ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&size=100&background=FF385C&color=fff&font-size=0.5`
                              }
                              alt={testimonial.name}
                              className="w-12 h-12 rounded-full border-2 border-gray-200"
                            />
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">
                                {testimonial.name}
                              </p>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <SchoolIcon className="w-3 h-3" />
                                {testimonial.university}
                              </div>
                            </div>
                          </div>
                          {testimonial.verified && (
                            <VerifiedIcon className="text-[#FF385C] w-5 h-5" />
                          )}
                        </div>

                        {/* Rating and Date */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1">
                            {renderStars(testimonial.rating)}
                            <span className="text-xs text-gray-500 ml-1">
                              ({testimonial.rating})
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">
                            <CalendarTodayIcon className="w-3 h-3 inline mr-1" />
                            {new Date(testimonial.date).toLocaleDateString(
                              lang === 'en' ? 'en-US' : lang === 'fr' ? 'fr-FR' : 'rw-RW'
                            )}
                          </span>
                        </div>

                        {/* House Name */}
                        {testimonial.houseName && (
                          <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                            <HomeIcon className="w-3 h-3" />
                            <span>
                              {t.stayed} {testimonial.houseName}
                            </span>
                          </div>
                        )}

                        {/* Content */}
                        <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-3">
                          {testimonial.content}
                        </p>

                        {/* Read More */}
                        <button
                          onClick={() => openModal(testimonial)}
                          className="text-xs text-[#FF385C] font-medium hover:underline"
                        >
                          {t.readMore}
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Share Experience CTA */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-[#FF385C] to-[#E31C5F] rounded-3xl p-8 sm:p-12 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                {t.shareExperience}
              </h3>
              <p className="text-white/90 mb-6 max-w-lg mx-auto">
                {t.shareDesc}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-[#FF385C] rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              >
                {t.writeReview}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedTestimonial && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[700]"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-2 xs:inset-4 z-[701] flex items-center justify-center"
            >
              <div className="bg-white rounded-xl xs:rounded-2xl w-full max-w-2xl max-h-[95vh] xs:max-h-[90vh] overflow-hidden shadow-2xl">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 xs:p-6 flex items-start justify-between z-10">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        selectedTestimonial.image?.url ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedTestimonial.name)}&size=100&background=FF385C&color=fff&font-size=0.5`
                      }
                      alt={selectedTestimonial.name}
                      className="w-14 h-14 rounded-full border-2 border-[#FF385C]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          {selectedTestimonial.name}
                        </h3>
                        {selectedTestimonial.verified && (
                          <VerifiedIcon className="text-[#FF385C] w-4 h-4" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <SchoolIcon className="w-4 h-4" />
                        {selectedTestimonial.university}
                      </div>
                      {selectedTestimonial.houseName && (
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <HomeIcon className="w-3 h-3" />
                          {t.stayed} {selectedTestimonial.houseName}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
                  >
                    <CloseIcon className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="p-4 xs:p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                  <div className="flex items-center gap-2 mb-4">
                    {renderStars(selectedTestimonial.rating)}
                    <span className="text-sm text-gray-500 ml-1">
                      ({selectedTestimonial.rating}/5)
                    </span>
                    <span className="text-xs text-gray-400 ml-auto">
                      <CalendarTodayIcon className="w-3 h-3 inline mr-1" />
                      {new Date(selectedTestimonial.date).toLocaleDateString(
                        lang === 'en' ? 'en-US' : lang === 'fr' ? 'fr-FR' : 'rw-RW',
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </span>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {selectedTestimonial.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {selectedTestimonial.content}
                    </p>
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