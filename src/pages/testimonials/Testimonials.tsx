/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/set-state-in-effect */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

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
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

interface Testimonial {
  id: number;
  name: string;
  university: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  image: string;
  verified: boolean;
  helpful: number;
  notHelpful: number;
  houseName?: string;
}

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
    featured: "Featured Review",
    pause: "Pause",
    play: "Play",
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
    featured: "Avis en Vedette",
    pause: "Pause",
    play: "Lecture",
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
    featured: "Ubuhamya Bw'umwimerere",
    pause: "Hagarika",
    play: "Kora",
  },
};

// Sample testimonials data
const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "Jean Paul Mugisha",
    university: "INES-Ruhengeri",
    location: "Musanze",
    rating: 5,
    date: "2024-01-15",
    title: "Perfect Location Near Campus",
    content:
      "I found an amazing house just 5 minutes walk from INES-Ruhengeri. The landlord was very welcoming and the price was affordable. The house has everything I need - WiFi, kitchen, and a comfortable study area. I'm really grateful to INYUMBA PROJECT for making this possible.",
    image:
      "https://ui-avatars.com/api/?name=Jean+Paul+Mugisha&size=100&background=FF385C&color=fff&font-size=0.5",
    verified: true,
    helpful: 45,
    notHelpful: 2,
    houseName: "INES Ruhengeri Student Lodge",
  },
  {
    id: 2,
    name: "Marie Claire Uwimana",
    university: "UR-CAVM",
    location: "Musanze",
    rating: 5,
    date: "2024-01-10",
    title: "Safe and Comfortable Living",
    content:
      "Finding accommodation near UR-CAVM was a challenge until I discovered INYUMBA PROJECT. I found a beautiful apartment with security, parking, and a garden. The booking process was simple and the landlord is very responsive. I highly recommend this platform to all students.",
    image:
      "https://ui-avatars.com/api/?name=Marie+Claire+Uwimana&size=100&background=FF6B6B&color=fff&font-size=0.5",
    verified: true,
    helpful: 38,
    notHelpful: 1,
    houseName: "UR-CAVM Student Village",
  },
  {
    id: 3,
    name: "David Niyonzima",
    university: "UR-Huye Campus",
    location: "Huye",
    rating: 4,
    date: "2023-12-20",
    title: "Great Value for Money",
    content:
      "I was looking for affordable housing near UR-Huye and INYUMBA PROJECT delivered. The house is spacious, clean, and close to campus. The MOMO payment system is very convenient. I've been living here for 6 months and I'm very satisfied.",
    image:
      "https://ui-avatars.com/api/?name=David+Niyonzima&size=100&background=4ECDC4&color=fff&font-size=0.5",
    verified: true,
    helpful: 32,
    notHelpful: 3,
    houseName: "UR Huye Student Flats",
  },
  {
    id: 4,
    name: "Grace Uwase",
    university: "University of Kigali",
    location: "Kigali",
    rating: 5,
    date: "2023-12-05",
    title: "Best Decision I Made",
    content:
      "Moving to Kigali for university was stressful, but INYUMBA PROJECT made finding a house easy. I found a modern apartment with all amenities near campus. The support team was very helpful throughout the process. I couldn't be happier!",
    image:
      "https://ui-avatars.com/api/?name=Grace+Uwase&size=100&background=FFB347&color=fff&font-size=0.5",
    verified: true,
    helpful: 56,
    notHelpful: 4,
    houseName: "Gasabo Student Apartments",
  },
  {
    id: 5,
    name: "Eric Kamanzi",
    university: "IPRC Musanze",
    location: "Musanze",
    rating: 4,
    date: "2023-11-28",
    title: "Excellent Service",
    content:
      "The platform is very user-friendly and the houses are exactly as described. I found a great room near IPRC Musanze with all the amenities I needed. The landlord is friendly and the rent is reasonable. I recommend INYUMBA PROJECT to all students.",
    image:
      "https://ui-avatars.com/api/?name=Eric+Kamanzi&size=100&background=FF6B6B&color=fff&font-size=0.5",
    verified: true,
    helpful: 28,
    notHelpful: 2,
    houseName: "IPRC Musanze Hostel",
  },
  {
    id: 6,
    name: "Aline Mukamana",
    university: "Kigali Independent University",
    location: "Kigali",
    rating: 5,
    date: "2023-11-15",
    title: "Amazing Experience",
    content:
      "I was worried about finding accommodation in Kigali, but INYUMBA PROJECT connected me with a wonderful landlord. The house is comfortable, secure, and close to university. The payment process was smooth and the support team was always available.",
    image:
      "https://ui-avatars.com/api/?name=Aline+Mukamana&size=100&background=4ECDC4&color=fff&font-size=0.5",
    verified: true,
    helpful: 42,
    notHelpful: 1,
    houseName: "Gisozi Student Lodge",
  },
  {
    id: 7,
    name: "Pascal Nzabonimpa",
    university: "UR-CST",
    location: "Kigali",
    rating: 3,
    date: "2023-10-30",
    title: "Good Platform with Room for Improvement",
    content:
      "Overall, INYUMBA PROJECT is a helpful platform. I found a house near UR-CST, but the communication with the landlord could be improved. The house itself is good and the price is fair. I hope the platform continues to grow and improve.",
    image:
      "https://ui-avatars.com/api/?name=Pascal+Nzabonimpa&size=100&background=FFB347&color=fff&font-size=0.5",
    verified: true,
    helpful: 15,
    notHelpful: 8,
    houseName: "Nyarugenge Student Apartments",
  },
  {
    id: 8,
    name: "Jeanne d'Arc Uwimana",
    university: "Adventist University (AUCA)",
    location: "Kigali",
    rating: 5,
    date: "2023-10-20",
    title: "Godsend for Students",
    content:
      "INYUMBA PROJECT is a godsend for students looking for housing. I found a beautiful apartment near AUCA with all the amenities I needed. The landlord is kind and the environment is safe. I'm so grateful for this platform.",
    image:
      "https://ui-avatars.com/api/?name=Jeanne+d%27Arc+Uwimana&size=100&background=FF385C&color=fff&font-size=0.5",
    verified: true,
    helpful: 51,
    notHelpful: 2,
    houseName: "Ndera Student Village",
  },
  {
    id: 9,
    name: "Olivier Niyitanga",
    university: "UTB",
    location: "Rubavu",
    rating: 4,
    date: "2023-10-10",
    title: "Great Location near Lake Kivu",
    content:
      "I found a wonderful house near Lake Kivu through INYUMBA PROJECT. The view is amazing and the house is well-maintained. The platform made it easy to connect with the landlord and the booking process was smooth. Highly recommended!",
    image:
      "https://ui-avatars.com/api/?name=Olivier+Niyitanga&size=100&background=4ECDC4&color=fff&font-size=0.5",
    verified: true,
    helpful: 27,
    notHelpful: 3,
    houseName: "Gisenyi Student House",
  },
];

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
  const [filteredTestimonials, setFilteredTestimonials] =
    useState<Testimonial[]>(testimonialsData);
  const [selectedUniversity, setSelectedUniversity] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");

  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auto-slide states
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [itemsPerSlide, setItemsPerSlide] = useState(2);
  const slideIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const t = translations[lang];

  // Get unique universities
  const universities = [
    "all",
    ...new Set(testimonialsData.map((t) => t.university)),
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

  // Filter and sort testimonials
  useEffect(() => {
    let filtered = [...testimonialsData];

    if (selectedUniversity !== "all") {
      filtered = filtered.filter((t) => t.university === selectedUniversity);
    }

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
  }, [selectedUniversity, sortBy]);

  // Calculate statistics
  const totalReviews = testimonialsData.length;
  const averageRating = (
    testimonialsData.reduce((sum, t) => sum + t.rating, 0) / totalReviews
  ).toFixed(1);
  const fiveStarCount = testimonialsData.filter((t) => t.rating === 5).length;

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

  const handleHelpful = (id: number, type: "helpful" | "notHelpful") => {
    const testimonial = testimonialsData.find((t) => t.id === id);
    if (testimonial) {
      if (type === "helpful") {
        toast.success("Thank you for your feedback! 👍");
      } else {
        toast.info("We appreciate your feedback");
      }
    }
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

  // Featured testimonials (top 3 rated)
  const featuredTestimonials = [...testimonialsData]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  // Get current visible testimonials for auto-slide
  const visibleTestimonials = filteredTestimonials.slice(
    slideIndex,
    slideIndex + itemsPerSlide,
  );

  const totalSlides = Math.ceil(filteredTestimonials.length / itemsPerSlide);

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
                {Math.round((fiveStarCount / totalReviews) * 100)}%
              </p>
              <p className="text-sm text-gray-600">Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section className="py-12 bg-gradient-to-br from-[#FF385C]/5 via-white to-[#FF385C]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <FavoriteIcon className="text-[#FF385C]" />
              {t.featured}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-[#FF385C]/20 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#FF385C]/5 rounded-full -mt-10 -mr-10"></div>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-[#FF385C]"
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
                  {testimonial.verified && (
                    <VerifiedIcon className="text-[#FF385C] w-4 h-4 ml-auto" />
                  )}
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {testimonial.content}
                </p>
                <button
                  onClick={() => openModal(testimonial)}
                  className="mt-3 text-xs text-[#FF385C] font-medium hover:underline"
                >
                  {t.readMore}
                </button>
              </motion.div>
            ))}
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
                        key={testimonial.id}
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
                              src={testimonial.image}
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
                            {new Date(testimonial.date).toLocaleDateString()}
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

                        {/* Helpful buttons */}
                        <div className="flex items-center gap-4 pt-3 mt-3 border-t border-gray-100">
                          <button
                            onClick={() =>
                              handleHelpful(testimonial.id, "helpful")
                            }
                            className="flex items-center gap-1 text-xs text-gray-500 hover:text-green-500 transition-colors"
                          >
                            <ThumbUpIcon className="w-3.5 h-3.5" />
                            {testimonial.helpful}
                          </button>
                          <button
                            onClick={() =>
                              handleHelpful(testimonial.id, "notHelpful")
                            }
                            className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 transition-colors"
                          >
                            <ThumbDownIcon className="w-3.5 h-3.5" />
                            {testimonial.notHelpful}
                          </button>
                        </div>
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
                      src={selectedTestimonial.image}
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
                        "en-US",
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

                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleHelpful(selectedTestimonial.id, "helpful")
                        }
                        className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-sm hover:bg-green-100 transition-colors"
                      >
                        <ThumbUpIcon className="w-4 h-4" />
                        {t.helpful} ({selectedTestimonial.helpful})
                      </button>
                      <button
                        onClick={() =>
                          handleHelpful(selectedTestimonial.id, "notHelpful")
                        }
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100 transition-colors"
                      >
                        <ThumbDownIcon className="w-4 h-4" />
                        {t.notHelpful} ({selectedTestimonial.notHelpful})
                      </button>
                    </div>
                    <span className="text-xs text-gray-400 ml-auto">
                      {t.verifiedReview} • {t.studentReview}
                    </span>
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
