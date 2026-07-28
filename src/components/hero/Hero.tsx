// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Material-UI Icons - Only imported ones that are used
// import SearchIcon from "@mui/icons-material/Search";
// import CloseIcon from "@mui/icons-material/Close";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import StarIcon from "@mui/icons-material/Star";
// import ApartmentIcon from "@mui/icons-material/Apartment";
// import HomeIcon from "@mui/icons-material/Home";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import RemoveIcon from "@mui/icons-material/Remove";
// import AddIcon from "@mui/icons-material/Add";
// import HotelIcon from "@mui/icons-material/Hotel";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import ErrorIcon from "@mui/icons-material/Error";
// import SchoolIcon from "@mui/icons-material/School";
// import LocationCityIcon from "@mui/icons-material/LocationCity";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import BedIcon from "@mui/icons-material/Bed";
// import BathroomIcon from "@mui/icons-material/Bathroom";
// import KitchenIcon from "@mui/icons-material/Kitchen";
// import WifiIcon from "@mui/icons-material/Wifi";
// import LocalParkingIcon from "@mui/icons-material/LocalParking";
// import SecurityIcon from "@mui/icons-material/Security";
// import BookmarkIcon from "@mui/icons-material/Bookmark";

// // Sample hero images for slideshow - Focus on student housing
// const heroImages = [
//   {
//     url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&h=600&fit=crop",
//     title: "Find Your Perfect Student Home",
//     subtitle: "Affordable housing near universities in Rwanda & East Africa",
//   },
//   {
//     url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&h=600&fit=crop",
//     title: "Safe & Comfortable Living",
//     subtitle: "Verified student accommodations with all amenities",
//   },
//   {
//     url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&h=600&fit=crop",
//     title: "Near Your Campus",
//     subtitle: "Houses and rooms located close to major universities",
//   },
//   {
//     url: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1600&h=600&fit=crop",
//     title: "Student-Friendly Prices",
//     subtitle: "Affordable rates designed for student budgets",
//   },
// ];

// // INYUMBA PROJECT - Student Housing Data based on the documentation
// const studentHouses = [
//   // INES-Ruhengeri Area (Musanze) - Primary focus
//   {
//     id: 1,
//     name: "INES Ruhengeri Student Lodge",
//     type: "House",
//     price: 85,
//     nights: 30,
//     rating: 4.97,
//     category: "student",
//     university: "INES-Ruhengeri",
//     district: "Musanze",
//     sector: "Muhoza",
//     cell: "Cyabararika",
//     village: "Cyabararika",
//     rooms: 4,
//     bathrooms: 2,
//     image:
//       "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
//     description:
//       "Modern student house near INES-Ruhengeri, 5 min walk to campus",
//     amenities: [
//       "WiFi",
//       "Kitchen",
//       "Security",
//       "Parking",
//       "Study Room",
//       "Laundry",
//     ],
//   },
//   {
//     id: 2,
//     name: "Muhoza Student Apartments",
//     type: "Apartment",
//     price: 70,
//     nights: 30,
//     rating: 4.85,
//     category: "student",
//     university: "INES-Ruhengeri",
//     district: "Musanze",
//     sector: "Muhoza",
//     cell: "Kigombe",
//     village: "Kigombe",
//     rooms: 3,
//     bathrooms: 1,
//     image:
//       "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
//     description: "Spacious apartments for students, close to INES-Ruhengeri",
//     amenities: ["WiFi", "Kitchen", "Security", "Parking", "Water Heater"],
//   },
//   {
//     id: 3,
//     name: "Kigombe Student House",
//     type: "House",
//     price: 90,
//     nights: 30,
//     rating: 4.92,
//     category: "student",
//     university: "INES-Ruhengeri",
//     district: "Musanze",
//     sector: "Muhoza",
//     cell: "Kigombe",
//     village: "Gasanzwe",
//     rooms: 5,
//     bathrooms: 2,
//     image:
//       "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
//     description:
//       "Large student house with garden, perfect for group of students",
//     amenities: ["WiFi", "Kitchen", "Garden", "Parking", "Study Area", "BBQ"],
//   },
//   {
//     id: 4,
//     name: "Ruhengeri City Hostel",
//     type: "Room",
//     price: 50,
//     nights: 30,
//     rating: 4.78,
//     category: "student",
//     university: "INES-Ruhengeri",
//     district: "Musanze",
//     sector: "Muhoza",
//     cell: "Ruhengeri",
//     village: "Ruhengeri",
//     rooms: 1,
//     bathrooms: 1,
//     image:
//       "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop",
//     description: "Affordable single rooms for students in central Ruhengeri",
//     amenities: ["WiFi", "Shared Kitchen", "Security", "Common Area"],
//   },
//   {
//     id: 5,
//     name: "Cyabararika Student Lodge",
//     type: "Apartment",
//     price: 75,
//     nights: 30,
//     rating: 4.88,
//     category: "student",
//     university: "INES-Ruhengeri",
//     district: "Musanze",
//     sector: "Muhoza",
//     cell: "Cyabararika",
//     village: "Kabirizi",
//     rooms: 2,
//     bathrooms: 1,
//     image:
//       "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
//     description: "Modern student apartments near INES-Ruhengeri campus",
//     amenities: ["WiFi", "Kitchenette", "Security", "Study Desk", "Laundry"],
//   },
//   // UR-CAVM (Musanze) Area
//   {
//     id: 6,
//     name: "UR-CAVM Student Village",
//     type: "Apartment",
//     price: 80,
//     nights: 30,
//     rating: 4.9,
//     category: "student",
//     university: "UR-CAVM",
//     district: "Musanze",
//     sector: "Busogo",
//     cell: "Busogo",
//     village: "Busogo",
//     rooms: 3,
//     bathrooms: 2,
//     image:
//       "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
//     description: "Student apartments near UR-CAVM campus, Busogo",
//     amenities: ["WiFi", "Kitchen", "Security", "Parking", "Study Room"],
//   },
//   {
//     id: 7,
//     name: "Busogo Student House",
//     type: "House",
//     price: 95,
//     nights: 30,
//     rating: 4.84,
//     category: "student",
//     university: "UR-CAVM",
//     district: "Musanze",
//     sector: "Busogo",
//     cell: "Busogo",
//     village: "Busogo",
//     rooms: 4,
//     bathrooms: 2,
//     image:
//       "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
//     description: "Spacious student house with garden, near UR-CAVM",
//     amenities: ["WiFi", "Kitchen", "Garden", "Parking", "Laundry"],
//   },
//   // IPRC Musanze Area
//   {
//     id: 8,
//     name: "IPRC Musanze Hostel",
//     type: "Room",
//     price: 55,
//     nights: 30,
//     rating: 4.75,
//     category: "student",
//     university: "IPRC Musanze",
//     district: "Musanze",
//     sector: "Muhoza",
//     cell: "Kigombe",
//     village: "Muhe",
//     rooms: 1,
//     bathrooms: 1,
//     image:
//       "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop",
//     description: "Affordable student rooms near IPRC Musanze campus",
//     amenities: ["WiFi", "Shared Kitchen", "Security", "Common Area"],
//   },
//   // UR-Huye Campus Area
//   {
//     id: 9,
//     name: "UR Huye Student Flats",
//     type: "Apartment",
//     price: 72,
//     nights: 30,
//     rating: 4.82,
//     category: "student",
//     university: "UR-Huye Campus",
//     district: "Huye",
//     sector: "Ngoma",
//     cell: "Butare",
//     village: "Ruhande",
//     rooms: 2,
//     bathrooms: 1,
//     image:
//       "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
//     description: "Student apartments near UR Huye campus, Ruhande",
//     amenities: ["WiFi", "Kitchenette", "Security", "Study Area"],
//   },
//   {
//     id: 10,
//     name: "Butare Student Lodge",
//     type: "House",
//     price: 88,
//     nights: 30,
//     rating: 4.79,
//     category: "student",
//     university: "UR-Huye Campus",
//     district: "Huye",
//     sector: "Ngoma",
//     cell: "Butare",
//     village: "Butare",
//     rooms: 3,
//     bathrooms: 2,
//     image:
//       "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
//     description: "Student house in Butare, walking distance to UR Huye",
//     amenities: ["WiFi", "Kitchen", "Garden", "Parking", "Study Room"],
//   },
//   {
//     id: 11,
//     name: "IPRC Huye Hostel",
//     type: "Room",
//     price: 48,
//     nights: 30,
//     rating: 4.7,
//     category: "student",
//     university: "IPRC Huye",
//     district: "Huye",
//     sector: "Ngoma",
//     cell: "Ngoma",
//     village: "Ngoma",
//     rooms: 1,
//     bathrooms: 1,
//     image:
//       "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop",
//     description: "Affordable rooms for IPRC Huye students",
//     amenities: ["WiFi", "Shared Kitchen", "Security", "Study Area"],
//   },
//   // UR-CE (Rwamagana) Area
//   {
//     id: 12,
//     name: "UR-CE Student Village",
//     type: "Apartment",
//     price: 68,
//     nights: 30,
//     rating: 4.76,
//     category: "student",
//     university: "UR-CE (Education)",
//     district: "Rwamagana",
//     sector: "Rukara",
//     cell: "Rukara",
//     village: "Rukara",
//     rooms: 2,
//     bathrooms: 1,
//     image:
//       "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
//     description: "Student housing near UR-CE campus in Rwamagana",
//     amenities: ["WiFi", "Kitchen", "Security", "Parking"],
//   },
//   // UR-Nyagatare Area
//   {
//     id: 13,
//     name: "Nyagatare Student Lodge",
//     type: "House",
//     price: 65,
//     nights: 30,
//     rating: 4.74,
//     category: "student",
//     university: "UR-Nyagatare Campus",
//     district: "Nyagatare",
//     sector: "Nyagatare",
//     cell: "Nyagatare",
//     village: "Nyagatare",
//     rooms: 3,
//     bathrooms: 2,
//     image:
//       "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
//     description: "Student house near UR Nyagatare campus",
//     amenities: ["WiFi", "Kitchen", "Garden", "Parking"],
//   },
//   // Kigali Universities Area
//   {
//     id: 14,
//     name: "Nyarugenge Student Apartments",
//     type: "Apartment",
//     price: 95,
//     nights: 30,
//     rating: 4.89,
//     category: "student",
//     university: "UR-CST",
//     district: "Nyarugenge",
//     sector: "Nyarugenge",
//     cell: "Kiyovu",
//     village: "Kiyovu",
//     rooms: 2,
//     bathrooms: 1,
//     image:
//       "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
//     description: "Modern student apartments near UR-CST in Kiyovu",
//     amenities: ["WiFi", "Kitchen", "Security", "Elevator", "Study Area"],
//   },
//   {
//     id: 15,
//     name: "Kicukiro Student House",
//     type: "House",
//     price: 100,
//     nights: 30,
//     rating: 4.92,
//     category: "student",
//     university: "UR-CBE",
//     district: "Kicukiro",
//     sector: "Gikondo",
//     cell: "Mburabuturo",
//     village: "Mburabuturo",
//     rooms: 4,
//     bathrooms: 2,
//     image:
//       "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
//     description: "Spacious student house near UR-CBE, Gikondo",
//     amenities: ["WiFi", "Kitchen", "Garden", "Parking", "Study Room"],
//   },
//   {
//     id: 16,
//     name: "Gasabo Student Apartments",
//     type: "Apartment",
//     price: 88,
//     nights: 30,
//     rating: 4.86,
//     category: "student",
//     university: "University of Kigali",
//     district: "Gasabo",
//     sector: "Kacyiru",
//     cell: "Kamatamu",
//     village: "Kamatamu",
//     rooms: 2,
//     bathrooms: 1,
//     image:
//       "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
//     description: "Student apartments near University of Kigali in Kamatamu",
//     amenities: ["WiFi", "Kitchenette", "Security", "Parking", "Study Area"],
//   },
//   {
//     id: 17,
//     name: "Gisozi Student Lodge",
//     type: "Room",
//     price: 60,
//     nights: 30,
//     rating: 4.8,
//     category: "student",
//     university: "Kigali Independent University",
//     district: "Gasabo",
//     sector: "Gisozi",
//     cell: "Ruhango",
//     village: "Ruhango",
//     rooms: 1,
//     bathrooms: 1,
//     image:
//       "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop",
//     description: "Student rooms near Kigali Independent University (ULK)",
//     amenities: ["WiFi", "Shared Kitchen", "Security", "Common Area"],
//   },
//   {
//     id: 18,
//     name: "Ndera Student Village",
//     type: "Apartment",
//     price: 78,
//     nights: 30,
//     rating: 4.85,
//     category: "student",
//     university: "Adventist University (AUCA)",
//     district: "Gasabo",
//     sector: "Ndera",
//     cell: "Ndera",
//     village: "Ndera",
//     rooms: 2,
//     bathrooms: 1,
//     image:
//       "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
//     description: "Student apartments near AUCA in Ndera",
//     amenities: ["WiFi", "Kitchen", "Security", "Parking", "Study Area"],
//   },
//   // Regional Universities
//   {
//     id: 19,
//     name: "Muhanga Student Hostel",
//     type: "Room",
//     price: 45,
//     nights: 30,
//     rating: 4.72,
//     category: "student",
//     university: "Catholic Institute (ICK)",
//     district: "Muhanga",
//     sector: "Cyiza",
//     cell: "Kabgayi",
//     village: "Kabgayi",
//     rooms: 1,
//     bathrooms: 1,
//     image:
//       "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop",
//     description: "Affordable student rooms near ICK in Kabgayi",
//     amenities: ["WiFi", "Shared Kitchen", "Security", "Study Area"],
//   },
//   {
//     id: 20,
//     name: "Ruhango Student House",
//     type: "House",
//     price: 70,
//     nights: 30,
//     rating: 4.76,
//     category: "student",
//     university: "University of Gitwe",
//     district: "Ruhango",
//     sector: "Ruhango",
//     cell: "Ruhango",
//     village: "Ruhango",
//     rooms: 3,
//     bathrooms: 2,
//     image:
//       "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
//     description: "Student house near University of Gitwe",
//     amenities: ["WiFi", "Kitchen", "Garden", "Parking"],
//   },
//   {
//     id: 21,
//     name: "Butaro Student Village",
//     type: "Apartment",
//     price: 82,
//     nights: 30,
//     rating: 4.88,
//     category: "student",
//     university: "Univ. of Global Health Equity",
//     district: "Burera",
//     sector: "Butaro",
//     cell: "Butaro",
//     village: "Butaro",
//     rooms: 2,
//     bathrooms: 1,
//     image:
//       "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
//     description: "Student apartments near University of Global Health Equity",
//     amenities: ["WiFi", "Kitchen", "Security", "Study Room", "Laundry"],
//   },
//   {
//     id: 22,
//     name: "Byumba Student Lodge",
//     type: "Room",
//     price: 50,
//     nights: 30,
//     rating: 4.74,
//     category: "student",
//     university: "UTAB",
//     district: "Gicumbi",
//     sector: "Byumba",
//     cell: "Byumba",
//     village: "Byumba",
//     rooms: 1,
//     bathrooms: 1,
//     image:
//       "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop",
//     description: "Student rooms near UTAB in Byumba",
//     amenities: ["WiFi", "Shared Kitchen", "Security"],
//   },
//   {
//     id: 23,
//     name: "Tumba Student Apartments",
//     type: "Apartment",
//     price: 65,
//     nights: 30,
//     rating: 4.8,
//     category: "student",
//     university: "IPRC Tumba",
//     district: "Rulindo",
//     sector: "Tumba",
//     cell: "Tumba",
//     village: "Tumba",
//     rooms: 2,
//     bathrooms: 1,
//     image:
//       "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
//     description: "Student apartments near IPRC Tumba",
//     amenities: ["WiFi", "Kitchenette", "Security", "Parking", "Study Area"],
//   },
//   {
//     id: 24,
//     name: "Gisenyi Student House",
//     type: "House",
//     price: 75,
//     nights: 30,
//     rating: 4.82,
//     category: "student",
//     university: "UTB",
//     district: "Rubavu",
//     sector: "Gisenyi",
//     cell: "Gisenyi",
//     village: "Gisenyi",
//     rooms: 3,
//     bathrooms: 2,
//     image:
//       "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
//     description: "Student house near UTB in Gisenyi, near Lake Kivu",
//     amenities: ["WiFi", "Kitchen", "Garden", "Parking", "Study Room"],
//   },
// ];

// // Categories based on documentation
// const getCategories = (t: any) => [
//   {
//     id: "all",
//     name: t.all || "All Houses",
//     icon: <HomeIcon />,
//     color: "from-[#FF385C] to-pink-400",
//   },
//   {
//     id: "student",
//     name: t.student || "Student Houses",
//     icon: <SchoolIcon />,
//     color: "from-blue-400 to-cyan-500",
//   },
//   {
//     id: "apartments",
//     name: t.apartments || "Apartments",
//     icon: <ApartmentIcon />,
//     color: "from-green-400 to-emerald-500",
//   },
//   {
//     id: "single",
//     name: t.single || "Single Rooms",
//     icon: <BedIcon />,
//     color: "from-orange-400 to-red-500",
//   },
//   {
//     id: "shared",
//     name: t.shared || "Shared Houses",
//     icon: <PeopleAltIcon />,
//     color: "from-purple-400 to-pink-500",
//   },
//   {
//     id: "furnished",
//     name: t.furnished || "Furnished",
//     icon: <HotelIcon />,
//     color: "from-yellow-400 to-amber-500",
//   },
//   {
//     id: "nearcampus",
//     name: t.nearcampus || "Near Campus",
//     icon: <LocationCityIcon />,
//     color: "from-teal-400 to-cyan-500",
//   },
// ];

// // University locations based on documentation
// const universityLocations = [
//   "INES-Ruhengeri (Musanze)",
//   "UR-CAVM (Musanze)",
//   "IPRC Musanze",
//   "UR-Huye Campus",
//   "IPRC Huye",
//   "UR-CE (Rwamagana)",
//   "UR-Nyagatare Campus",
//   "UR-CST (Kigali)",
//   "UR-CBE (Kigali)",
//   "University of Kigali",
//   "Kigali Independent University",
//   "Adventist University (AUCA)",
//   "Catholic Institute (ICK)",
//   "University of Gitwe",
//   "Univ. of Global Health Equity",
//   "UTAB (Byumba)",
//   "IPRC Tumba",
//   "UTB (Gisenyi)",
// ];

// // Location suggestions based on documentation
// const locationSuggestions = [
//   // Musanze Area
//   "Cyabararika, Muhoza, Musanze",
//   "Kigombe, Muhoza, Musanze",
//   "Ruhengeri, Muhoza, Musanze",
//   "Kabirizi, Cyabararika, Musanze",
//   "Busogo, Musanze",
//   // Huye Area
//   "Butare, Huye",
//   "Ruhande, Huye",
//   "Ngoma, Huye",
//   // Kigali Area
//   "Kiyovu, Nyarugenge, Kigali",
//   "Mburabuturo, Gikondo, Kigali",
//   "Kamatamu, Kacyiru, Kigali",
//   "Ruhango, Gisozi, Kigali",
//   "Ndera, Gasabo, Kigali",
//   // Other Areas
//   "Rukara, Rwamagana",
//   "Nyagatare, Nyagatare",
//   "Kabgayi, Muhanga",
//   "Ruhango, Ruhango",
//   "Butaro, Burera",
//   "Byumba, Gicumbi",
//   "Tumba, Rulindo",
//   "Gisenyi, Rubavu",
// ];

// interface HeroProps {
//   onSearch?: (params: any) => void;
//   language?: "en" | "fr" | "rw";
// }

// interface StudentHouse {
//   id: number;
//   name: string;
//   type: string;
//   price: number;
//   nights: number;
//   rating: number;
//   category: string;
//   university: string;
//   district: string;
//   sector: string;
//   cell: string;
//   village: string;
//   rooms: number;
//   bathrooms: number;
//   image: string;
//   description: string;
//   amenities: string[];
// }

// // Get translations based on language
// const getTranslations = (lang: string) => {
//   const translations: Record<string, any> = {
//     en: {
//       popularHomes: "Student Houses Available",
//       room: "Room",
//       apartment: "Apartment",
//       nights: "months",
//       where: "Location",
//       searchDestinations: "Search universities or locations in Rwanda",
//       when: "Move-in Date",
//       addDates: "Select move-in date",
//       who: "Students",
//       addGuests: "Number of students",
//       helpCenter: "Help Center",
//       becomeHost: "List Your House",
//       becomeHostDesc:
//         "It's easy to list your student house and earn extra income.",
//       referHost: "Refer a Host",
//       findCoHost: "Find a co-host",
//       giftCards: "Gift cards",
//       login: "Log in",
//       signup: "Sign up",
//       selectLocation: "Select Location",
//       popularLocations: "Popular University Locations",
//       guests: "Students",
//       adults: "Students",
//       children: "Children",
//       infants: "Infants",
//       pets: "Pets",
//       apply: "Apply",
//       clear: "Clear",
//       checkIn: "Move-in",
//       checkOut: "Move-out",
//       search: "Search",
//       bookNow: "Book Now",
//       payWithMomo: "Pay with MOMO",
//       bookingDetails: "Booking Details",
//       totalPrice: "Total Price",
//       favorites: "Saved",
//       removeFavorite: "Remove from saved",
//       addFavorite: "Add to saved",
//       paymentSuccess: "Payment Successful!",
//       paymentFailed: "Payment Failed",
//       enterMomoNumber: "Enter MOMO Number",
//       processingPayment: "Processing Payment...",
//       searchProperties: "Search houses...",
//       noResults: "No houses found matching your criteria.",
//       nightsTotal: "months total",
//       all: "All Houses",
//       student: "Student Houses",
//       apartments: "Apartments",
//       single: "Single Rooms",
//       shared: "Shared Houses",
//       furnished: "Furnished",
//       nearcampus: "Near Campus",
//       price: "Price",
//       perNight: "/ month",
//       amenities: "Amenities",
//       done: "Done",
//       tryAgain: "Try Again",
//       yourBookingConfirmed: "Your booking has been confirmed!",
//       propertyType: "Property Type",
//       location: "in",
//       from: "from",
//       perNightShort: "/month",
//       prev: "Previous",
//       next: "Next",
//       university: "University",
//       district: "District",
//       sector: "Sector",
//       cell: "Cell",
//       village: "Village",
//       rooms: "Rooms",
//       bathrooms: "Bathrooms",
//       viewDetails: "View Details",
//     },
//     fr: {
//       popularHomes: "Maisons étudiantes disponibles",
//       room: "Chambre",
//       apartment: "Appartement",
//       nights: "mois",
//       where: "Emplacement",
//       searchDestinations: "Rechercher des universités ou lieux au Rwanda",
//       when: "Date d'emménagement",
//       addDates: "Sélectionner la date demménagement",
//       who: "Étudiants",
//       addGuests: "Nombre d'étudiants",
//       helpCenter: "Centre d'aide",
//       becomeHost: "Listez votre maison",
//       becomeHostDesc:
//         "Il est facile de lister votre maison étudiante et de gagner un revenu supplémentaire.",
//       referHost: "Parrainer un hôte",
//       findCoHost: "Trouver un co-hôte",
//       giftCards: "Cartes cadeaux",
//       login: "Se connecter",
//       signup: "S'inscrire",
//       selectLocation: "Choisir un emplacement",
//       popularLocations: "Emplacements universitaires populaires",
//       guests: "Étudiants",
//       adults: "Étudiants",
//       children: "Enfants",
//       infants: "Nourrissons",
//       pets: "Animaux",
//       apply: "Appliquer",
//       clear: "Effacer",
//       checkIn: "Arrivée",
//       checkOut: "Départ",
//       search: "Rechercher",
//       bookNow: "Réserver",
//       payWithMomo: "Payer avec MOMO",
//       bookingDetails: "Détails de réservation",
//       totalPrice: "Prix total",
//       favorites: "Favoris",
//       removeFavorite: "Retirer des favoris",
//       addFavorite: "Ajouter aux favoris",
//       paymentSuccess: "Paiement réussi !",
//       paymentFailed: "Paiement échoué",
//       enterMomoNumber: "Entrez le numéro MOMO",
//       processingPayment: "Traitement du paiement...",
//       searchProperties: "Rechercher des maisons...",
//       noResults: "Aucune maison trouvée correspondant à vos critères.",
//       nightsTotal: "mois au total",
//       all: "Toutes les maisons",
//       student: "Maisons étudiantes",
//       apartments: "Appartements",
//       single: "Chambres individuelles",
//       shared: "Maisons partagées",
//       furnished: "Meublé",
//       nearcampus: "Près du campus",
//       price: "Prix",
//       perNight: "/ mois",
//       amenities: "Équipements",
//       done: "Terminé",
//       tryAgain: "Réessayer",
//       yourBookingConfirmed: "Votre réservation a été confirmée !",
//       propertyType: "Type de propriété",
//       location: "à",
//       from: "à partir de",
//       perNightShort: "/mois",
//       prev: "Précédent",
//       next: "Suivant",
//       university: "Université",
//       district: "District",
//       sector: "Secteur",
//       cell: "Cellule",
//       village: "Village",
//       rooms: "Chambres",
//       bathrooms: "Salles de bain",
//       viewDetails: "Voir les détails",
//     },
//     rw: {
//       popularHomes: "Amazu y'abanyeshuri ariboneka",
//       room: "Icyumba",
//       apartment: "Aparitama",
//       nights: "amezi",
//       where: "Aho gihe",
//       searchDestinations: "Shakisha kaminuza cyangwa aho gihe mu Rwanda",
//       when: "Itariki yo kwinjira",
//       addDates: "Hitamo itariki yo kwinjira",
//       who: "Abanyeshuri",
//       addGuests: "Umubare w'abanyeshuri",
//       helpCenter: "Ikigo cy'ubufasha",
//       becomeHost: "Tangaza inzu yawe",
//       becomeHostDesc:
//         "Birakoroshye gutangaza inzu yawe kubanyeshuri kandi ukungura.",
//       referHost: "Vuga abandi bakire",
//       findCoHost: "Shakisha uwakwakira n'uwundi",
//       giftCards: "Ikarita z'impano",
//       login: "Kwinjira",
//       signup: "Kwiyandikisha",
//       selectLocation: "Hitamo aho gihe",
//       popularLocations: "Aho bakunze kujya mu Rwanda",
//       guests: "Abanyeshuri",
//       adults: "Abanyeshuri",
//       children: "Abana",
//       infants: "Impinja",
//       pets: "Amatungo",
//       apply: "Kora",
//       clear: "Kuraho",
//       checkIn: "Kwinjira",
//       checkOut: "Kuvamo",
//       search: "Shakisha",
//       bookNow: "Icyemezo",
//       payWithMomo: "Tanga imbaraga MOMO",
//       bookingDetails: "Ibanga",
//       totalPrice: "Igiciro cyose",
//       favorites: "Ibyakiriwe",
//       removeFavorite: "Kuraho kubyakiriwe",
//       addFavorite: "Ongeraho kubyakiriwe",
//       paymentSuccess: "Ubwishyu bwakunze!",
//       paymentFailed: "Ubwishyu bwananiranye",
//       enterMomoNumber: "Injiza numero ya MOMO",
//       processingPayment: "Ubwishyu burakora...",
//       searchProperties: "Shakisha amazu...",
//       noResults: "Nta mazu yabonetse.",
//       nightsTotal: "amezi yose",
//       all: "Amazu yose",
//       student: "Amazu y'abanyeshuri",
//       apartments: "Aparitama",
//       single: "Ibyumba byonyine",
//       shared: "Amazu asangiwe",
//       furnished: "Ifite ibikoresho",
//       nearcampus: "Hafi ya kaminuza",
//       price: "Igiciro",
//       perNight: "/ ukwezi",
//       amenities: "Ibikoresho",
//       done: "Byakozwe",
//       tryAgain: "Ongera ugerageze",
//       yourBookingConfirmed: "Icyemezo cyawe cyakiriwe!",
//       propertyType: "Ubwoko bw'azu",
//       location: "i",
//       from: "kuva",
//       perNightShort: "/ukwezi",
//       prev: "Ibibanziriza",
//       next: "Ibikurikira",
//       university: "Kaminuza",
//       district: "Akarere",
//       sector: "Umurenge",
//       cell: "Akagari",
//       village: "Umudugudu",
//       rooms: "Ibyumba",
//       bathrooms: "Ahabagirirwa",
//       viewDetails: "Reba ibindi",
//     },
//   };
//   return translations[lang as keyof typeof translations] || translations.en;
// };

// export const Hero: React.FC<HeroProps> = ({ onSearch, language = "en" }) => {
//   const t = getTranslations(language);
//   const categories = getCategories(t);

//   // State for search
//   const [searchLocation, setSearchLocation] = useState("");
//   const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
//   const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
//   const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedUniversity, setSelectedUniversity] = useState("");
//   const [filteredHouses, setFilteredHouses] =
//     useState<StudentHouse[]>(studentHouses);

//   // State for dates
//   const [checkIn, setCheckIn] = useState<Date | null>(null);
//   const [checkOut, setCheckOut] = useState<Date | null>(null);
//   const [tempCheckIn, setTempCheckIn] = useState<Date | null>(null);
//   const [tempCheckOut, setTempCheckOut] = useState<Date | null>(null);
//   const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
//   const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

//   // State for students
//   const [studentCount, setStudentCount] = useState(2);

//   // State for hero slideshow
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const slideIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   // State for property modal
//   const [selectedHouse, setSelectedHouse] = useState<StudentHouse | null>(null);
//   const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);

//   // State for payment
//   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
//   const [momoNumber, setMomoNumber] = useState("");
//   const [isProcessingPayment, setIsProcessingPayment] = useState(false);
//   const [paymentResult, setPaymentResult] = useState<"success" | "fail" | null>(
//     null,
//   );
//   const [showPaymentResult, setShowPaymentResult] = useState(false);

//   // State for favorites
//   const [favorites, setFavorites] = useState<number[]>(() => {
//     const saved = localStorage.getItem("favorites");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 8;

//   // Filter houses when category, search, location, or university changes
//   useEffect(() => {
//     const filterHouses = () => {
//       let filtered = [...studentHouses];

//       if (selectedCategory !== "all") {
//         filtered = filtered.filter((h) => h.category === selectedCategory);
//       }

//       if (searchQuery.trim()) {
//         const query = searchQuery.toLowerCase().trim();
//         filtered = filtered.filter(
//           (h) =>
//             h.name.toLowerCase().includes(query) ||
//             h.type.toLowerCase().includes(query) ||
//             h.description?.toLowerCase().includes(query) ||
//             h.university.toLowerCase().includes(query) ||
//             h.district.toLowerCase().includes(query) ||
//             h.sector.toLowerCase().includes(query) ||
//             h.cell.toLowerCase().includes(query) ||
//             h.village.toLowerCase().includes(query),
//         );
//       }

//       if (searchLocation) {
//         const location = searchLocation.toLowerCase().trim();
//         filtered = filtered.filter(
//           (h) =>
//             h.university.toLowerCase().includes(location) ||
//             h.district.toLowerCase().includes(location) ||
//             h.sector.toLowerCase().includes(location) ||
//             h.cell.toLowerCase().includes(location) ||
//             h.village.toLowerCase().includes(location) ||
//             h.name.toLowerCase().includes(location),
//         );
//       }

//       if (selectedUniversity) {
//         filtered = filtered.filter((h) => h.university === selectedUniversity);
//       }

//       setFilteredHouses(filtered);
//       setCurrentPage(1);
//     };

//     filterHouses();
//   }, [selectedCategory, searchQuery, searchLocation, selectedUniversity]);

//   // Save favorites to localStorage
//   useEffect(() => {
//     localStorage.setItem("favorites", JSON.stringify(favorites));
//   }, [favorites]);

//   // Handle body overflow for modals
//   useEffect(() => {
//     if (isPropertyModalOpen || isPaymentModalOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isPropertyModalOpen, isPaymentModalOpen]);

//   // Auto-play slideshow
//   useEffect(() => {
//     if (isAutoPlaying) {
//       slideIntervalRef.current = setInterval(() => {
//         setCurrentSlide((prev) => (prev + 1) % heroImages.length);
//       }, 5000);
//     }
//     return () => {
//       if (slideIntervalRef.current) {
//         clearInterval(slideIntervalRef.current);
//       }
//     };
//   }, [isAutoPlaying]);

//   // Pagination calculations
//   const totalPages = Math.ceil(filteredHouses.length / itemsPerPage);
//   const paginatedHouses = filteredHouses.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage,
//   );

//   const goToPage = (page: number) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const nextPage = () => {
//     if (currentPage < totalPages) {
//       goToPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       goToPage(currentPage - 1);
//     }
//   };

//   // Generate calendar days
//   const getDaysInMonth = (month: number, year: number) => {
//     return new Date(year, month + 1, 0).getDate();
//   };

//   const getFirstDayOfMonth = (month: number, year: number) => {
//     return new Date(year, month, 1).getDay();
//   };

//   const renderCalendar = () => {
//     const daysInMonth = getDaysInMonth(currentMonth, currentYear);
//     const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
//     const today = new Date();
//     const days = [];

//     for (let i = 0; i < firstDay; i++) {
//       days.push(<div key={`empty-${i}`} className="h-10"></div>);
//     }

//     for (let day = 1; day <= daysInMonth; day++) {
//       const date = new Date(currentYear, currentMonth, day);
//       const isToday = date.toDateString() === today.toDateString();
//       const isCheckIn =
//         tempCheckIn && date.toDateString() === tempCheckIn.toDateString();
//       const isCheckOut =
//         tempCheckOut && date.toDateString() === tempCheckOut.toDateString();
//       const isInRange =
//         tempCheckIn &&
//         tempCheckOut &&
//         date > tempCheckIn &&
//         date < tempCheckOut;
//       const isPast =
//         date < today && date.toDateString() !== today.toDateString();

//       days.push(
//         <motion.button
//           key={day}
//           whileHover={{ scale: isPast ? 1 : 1.05 }}
//           whileTap={{ scale: isPast ? 1 : 0.95 }}
//           onClick={() => handleDateSelect(date)}
//           disabled={isPast}
//           className={`h-10 w-full rounded-full text-sm font-medium transition-colors relative ${
//             isPast
//               ? "text-gray-300 cursor-not-allowed"
//               : isCheckIn || isCheckOut
//                 ? "bg-[#FF385C] text-white"
//                 : isInRange
//                   ? "bg-[#FF385C]/20 text-gray-900"
//                   : isToday
//                     ? "border-2 border-[#FF385C] text-gray-900"
//                     : "text-gray-700"
//           }`}
//         >
//           {day}
//           {isToday && !isCheckIn && !isCheckOut && (
//             <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#FF385C] rounded-full"></span>
//           )}
//         </motion.button>,
//       );
//     }

//     return days;
//   };

//   const handleDateSelect = (date: Date) => {
//     if (!tempCheckIn || (tempCheckIn && tempCheckOut)) {
//       setTempCheckIn(date);
//       setTempCheckOut(null);
//     } else if (tempCheckIn && !tempCheckOut) {
//       if (date < tempCheckIn) {
//         setTempCheckOut(tempCheckIn);
//         setTempCheckIn(date);
//       } else {
//         setTempCheckOut(date);
//       }
//     }
//   };

//   const applyDates = () => {
//     setCheckIn(tempCheckIn);
//     setCheckOut(tempCheckOut);
//     setIsDatePickerOpen(false);
//     if (tempCheckIn && tempCheckOut) {
//       toast.success(
//         `📅 ${tempCheckIn.toLocaleDateString()} - ${tempCheckOut.toLocaleDateString()}`,
//       );
//     }
//   };

//   const clearDates = () => {
//     setTempCheckIn(null);
//     setTempCheckOut(null);
//     setCheckIn(null);
//     setCheckOut(null);
//     setIsDatePickerOpen(false);
//   };

//   const changeMonth = (delta: number) => {
//     const newMonth = currentMonth + delta;
//     if (newMonth < 0) {
//       setCurrentMonth(11);
//       setCurrentYear(currentYear - 1);
//     } else if (newMonth > 11) {
//       setCurrentMonth(0);
//       setCurrentYear(currentYear + 1);
//     } else {
//       setCurrentMonth(newMonth);
//     }
//   };

//   const handleSearch = () => {
//     const searchParams = {
//       location: searchLocation,
//       checkIn,
//       checkOut,
//       students: studentCount,
//       category: selectedCategory,
//       query: searchQuery,
//       university: selectedUniversity,
//     };

//     if (onSearch) {
//       onSearch(searchParams);
//     }

//     toast.info(
//       `🔍 ${t.search}: ${searchLocation || "All universities in Rwanda"}`,
//     );
//     setIsLocationModalOpen(false);
//     setIsDatePickerOpen(false);
//     setIsGuestModalOpen(false);
//   };

//   const getStudentCount = () => {
//     return `${studentCount} ${studentCount !== 1 ? t.guests.toLowerCase() : t.guests.slice(0, -1)}`;
//   };

//   const getDateRange = () => {
//     if (checkIn && checkOut) {
//       return `${checkIn.toLocaleDateString()} - ${checkOut.toLocaleDateString()}`;
//     }
//     return t.addDates;
//   };

//   const goToSlide = (index: number) => {
//     setCurrentSlide(index);
//     setIsAutoPlaying(false);
//     setTimeout(() => setIsAutoPlaying(true), 10000);
//   };

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % heroImages.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide(
//       (prev) => (prev - 1 + heroImages.length) % heroImages.length,
//     );
//   };

//   const toggleFavorite = (houseId: number) => {
//     setFavorites((prev) => {
//       if (prev.includes(houseId)) {
//         toast.info(`💔 ${t.removeFavorite}`);
//         return prev.filter((id) => id !== houseId);
//       } else {
//         toast.success(`❤️ ${t.addFavorite}`);
//         return [...prev, houseId];
//       }
//     });
//   };

//   const openHouseModal = (house: StudentHouse) => {
//     setSelectedHouse(house);
//     setIsPropertyModalOpen(true);
//   };

//   const closeHouseModal = () => {
//     setIsPropertyModalOpen(false);
//     setSelectedHouse(null);
//   };

//   const closePaymentModal = () => {
//     setIsPaymentModalOpen(false);
//     setMomoNumber("");
//     setPaymentResult(null);
//     setShowPaymentResult(false);
//   };

//   const processPayment = () => {
//     if (!momoNumber || momoNumber.length < 9) {
//       toast.error("Please enter a valid MOMO number");
//       return;
//     }

//     setIsProcessingPayment(true);

//     setTimeout(() => {
//       setIsProcessingPayment(false);
//       const isSuccess = Math.random() > 0.2;
//       setPaymentResult(isSuccess ? "success" : "fail");
//       setShowPaymentResult(true);

//       if (isSuccess) {
//         toast.success(`✅ ${t.paymentSuccess}`);
//       } else {
//         toast.error(`❌ ${t.paymentFailed}`);
//       }
//     }, 2000);
//   };

//   const resetPaymentModal = () => {
//     if (paymentResult === "success") {
//       closePaymentModal();
//     } else {
//       setPaymentResult(null);
//       setShowPaymentResult(false);
//       setIsProcessingPayment(false);
//     }
//   };

//   // Get translated type
//   const getTranslatedType = (type: string) => {
//     if (type === "Room") return t.room;
//     if (type === "Apartment") return t.apartment;
//     if (type === "House") return t.student;
//     if (type === "Villa") return "Villa";
//     return type;
//   };

//   // Get location info from house
//   const getLocationInfo = (house: StudentHouse) => {
//     return `${house.village}, ${house.cell}, ${house.sector}, ${house.district}`;
//   };

//   // Get university badge color
//   const getUniversityColor = (university: string) => {
//     const colors: { [key: string]: string } = {
//       "INES-Ruhengeri": "bg-blue-100 text-blue-800",
//       "UR-CAVM": "bg-green-100 text-green-800",
//       "IPRC Musanze": "bg-orange-100 text-orange-800",
//       "UR-Huye Campus": "bg-purple-100 text-purple-800",
//       "IPRC Huye": "bg-pink-100 text-pink-800",
//       "UR-CE (Education)": "bg-indigo-100 text-indigo-800",
//       "UR-Nyagatare Campus": "bg-teal-100 text-teal-800",
//       "UR-CST": "bg-red-100 text-red-800",
//       "UR-CBE": "bg-yellow-100 text-yellow-800",
//       "University of Kigali": "bg-cyan-100 text-cyan-800",
//       "Kigali Independent University": "bg-amber-100 text-amber-800",
//       "Adventist University (AUCA)": "bg-lime-100 text-lime-800",
//       "Catholic Institute (ICK)": "bg-rose-100 text-rose-800",
//       "University of Gitwe": "bg-emerald-100 text-emerald-800",
//       "Univ. of Global Health Equity": "bg-sky-100 text-sky-800",
//       UTAB: "bg-violet-100 text-violet-800",
//       "IPRC Tumba": "bg-fuchsia-100 text-fuchsia-800",
//       UTB: "bg-slate-100 text-slate-800",
//     };
//     return colors[university] || "bg-gray-100 text-gray-800";
//   };

//   return (
//     <div className="w-full">
//       {/* Hero Slideshow - Responsive */}
//       <div className="relative w-full h-[250px] xs:h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] xl:h-[600px] 2xl:h-[650px] overflow-hidden">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentSlide}
//             initial={{ opacity: 0, scale: 1.1 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             transition={{ duration: 0.7 }}
//             className="absolute inset-0"
//           >
//             <div
//               className="w-full h-full bg-cover bg-center"
//               style={{
//                 backgroundImage: `url(${heroImages[currentSlide].url})`,
//               }}
//             >
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
//               <div className="absolute bottom-8 xs:bottom-10 sm:bottom-12 md:bottom-16 lg:bottom-20 left-0 right-0 text-center text-white px-4">
//                 <motion.h2
//                   initial={{ y: 20, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ delay: 0.2 }}
//                   className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-1 sm:mb-2"
//                 >
//                   {heroImages[currentSlide].title}
//                 </motion.h2>
//                 <motion.p
//                   initial={{ y: 20, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ delay: 0.4 }}
//                   className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-black"
//                 >
//                   {heroImages[currentSlide].subtitle}
//                 </motion.p>
//               </div>
//             </div>
//           </motion.div>
//         </AnimatePresence>

//         {/* Slide Navigation Arrows */}
//         <button
//           onClick={prevSlide}
//           className="absolute left-1 xs:left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/80 p-1 xs:p-1.5 sm:p-2 rounded-full shadow-lg transition-all hover:scale-110 z-10"
//         >
//           <ArrowBackIcon className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-gray-800" />
//         </button>
//         <button
//           onClick={nextSlide}
//           className="absolute right-1 xs:right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/80 p-1 xs:p-1.5 sm:p-2 rounded-full shadow-lg transition-all hover:scale-110 z-10"
//         >
//           <ArrowForwardIcon className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-gray-800" />
//         </button>

//         {/* Slide Dots */}
//         <div className="absolute bottom-2 xs:bottom-3 left-1/2 -translate-x-1/2 flex gap-1 xs:gap-1.5 sm:gap-2 z-10">
//           {heroImages.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               className={`h-1 xs:h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
//                 currentSlide === index
//                   ? "w-4 xs:w-5 sm:w-6 md:w-8 bg-white"
//                   : "w-1 xs:w-1.5 sm:w-2 bg-white/50 hover:bg-white/80"
//               }`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Search Bar - Floating - Responsive */}
//       <div className="relative z-20 -mt-6 xs:-mt-8 sm:-mt-10 md:-mt-12 px-2 xs:px-4 sm:px-6">
//         <div className="max-w-4xl mx-auto">
//           <motion.div
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="bg-white rounded-xl xs:rounded-2xl shadow-2xl p-2 xs:p-3 sm:p-4 md:p-5"
//           >
//             <div className="flex flex-col sm:flex-row gap-1 xs:gap-2 sm:gap-3">
//               {/* Where */}
//               <div className="flex-1 min-w-0">
//                 <button
//                   onClick={() => setIsLocationModalOpen(true)}
//                   className="w-full text-left p-1.5 xs:p-2 sm:p-3 rounded-lg xs:rounded-xl transition-colors group"
//                 >
//                   <div className="text-[10px] xs:text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     {t.where}
//                   </div>
//                   <div className="text-xs xs:text-sm sm:text-base text-gray-700 truncate">
//                     <SchoolIcon className="w-3 h-3 xs:w-4 xs:h-4 inline mr-1 text-[#FF385C]" />
//                     {searchLocation ||
//                       selectedUniversity ||
//                       "Any university in Rwanda"}
//                   </div>
//                 </button>
//               </div>

//               {/* When */}
//               <div className="flex-1 min-w-0">
//                 <button
//                   onClick={() => setIsDatePickerOpen(true)}
//                   className="w-full text-left p-1.5 xs:p-2 sm:p-3 rounded-lg xs:rounded-xl transition-colors group"
//                 >
//                   <div className="text-[10px] xs:text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     {t.when}
//                   </div>
//                   <div className="text-xs xs:text-sm sm:text-base text-gray-700 truncate">
//                     {getDateRange()}
//                   </div>
//                 </button>
//               </div>

//               {/* Who */}
//               <div className="flex-1 min-w-0">
//                 <button
//                   onClick={() => setIsGuestModalOpen(true)}
//                   className="w-full text-left p-1.5 xs:p-2 sm:p-3 rounded-lg xs:rounded-xl transition-colors group"
//                 >
//                   <div className="text-[10px] xs:text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     {t.who}
//                   </div>
//                   <div className="text-xs xs:text-sm sm:text-base text-gray-700 truncate">
//                     <PeopleAltIcon className="w-3 h-3 xs:w-4 xs:h-4 inline mr-1 text-[#FF385C]" />
//                     {getStudentCount()}
//                   </div>
//                 </button>
//               </div>

//               {/* Search Button */}
//               <div className="sm:self-center">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={handleSearch}
//                   className="w-full sm:w-auto bg-[#FF385C] text-white px-4 xs:px-6 sm:px-8 py-2 xs:py-2.5 sm:py-3 rounded-lg xs:rounded-xl font-medium hover:bg-[#E31C5F] transition-colors flex items-center justify-center gap-1 xs:gap-2 shadow-lg shadow-[#FF385C]/30 text-xs xs:text-sm sm:text-base"
//                 >
//                   <SearchIcon className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
//                   <span>{t.search}</span>
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Categories - Responsive */}
//       <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8 mt-6 xs:mt-8 sm:mt-12">
//         <div className="flex gap-2 xs:gap-3 sm:gap-4 overflow-x-auto pb-3 xs:pb-4 scrollbar-hide">
//           {categories.map((category) => (
//             <motion.button
//               key={category.id}
//               whileHover={{ y: -2 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setSelectedCategory(category.id)}
//               className={`flex-shrink-0 flex flex-col items-center gap-1 xs:gap-1.5 px-3 xs:px-4 sm:px-5 py-1.5 xs:py-2 sm:py-3 rounded-lg xs:rounded-xl transition-all ${
//                 selectedCategory === category.id
//                   ? "border-b-2 border-[#FF385C] text-[#FF385C]"
//                   : "text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 flex items-center justify-center">
//                 <div
//                   className={`w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-6 sm:h-6 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center text-white`}
//                 >
//                   {React.cloneElement(category.icon, {
//                     className: "w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4",
//                   })}
//                 </div>
//               </div>
//               <span className="text-[10px] xs:text-xs font-medium whitespace-nowrap">
//                 {category.name}
//               </span>
//             </motion.button>
//           ))}
//         </div>
//       </div>

//       {/* Search Input for filtering - Responsive */}
//       <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8 mt-3 xs:mt-4">
//         <div className="relative max-w-xs xs:max-w-sm sm:max-w-md">
//           <SearchIcon className="absolute left-2 xs:left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 xs:w-5 xs:h-5" />
//           <input
//             type="text"
//             placeholder={t.searchProperties}
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-8 xs:pl-10 pr-3 xs:pr-4 py-1.5 xs:py-2 text-xs xs:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] focus:ring-1 focus:ring-[#FF385C] placeholder-gray-400"
//           />
//         </div>
//       </div>

//       {/* Houses Grid - Responsive with Pagination */}
//       <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8 py-6 xs:py-8 sm:py-12">
//         <div className="flex flex-wrap justify-between items-center mb-4 xs:mb-6 sm:mb-8">
//           <div>
//             <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
//               {filteredHouses.length} {t.popularHomes}
//             </h2>
//             {selectedUniversity && (
//               <p className="text-xs xs:text-sm text-gray-500 mt-1">
//                 <SchoolIcon className="w-3 h-3 xs:w-4 xs:h-4 inline mr-1" />
//                 {selectedUniversity}
//               </p>
//             )}
//           </div>
//           <div className="flex items-center gap-1 xs:gap-2">
//             <span className="text-xs xs:text-sm text-gray-500">
//               <BookmarkIcon className="w-3 h-3 xs:w-4 xs:h-4 inline mr-1" />
//               {favorites.length} {t.favorites}
//             </span>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
//           {paginatedHouses.map((house) => (
//             <motion.div
//               key={house.id}
//               whileHover={{ y: -4 }}
//               transition={{ duration: 0.3 }}
//               className="group cursor-pointer"
//               onClick={() => openHouseModal(house)}
//             >
//               <div className="bg-white rounded-lg xs:rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
//                 <div className="relative aspect-[4/3] overflow-hidden">
//                   <img
//                     src={house.image}
//                     alt={house.name}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                   />
//                   <div className="absolute top-1 xs:top-2 right-1 xs:right-2 flex gap-0.5 xs:gap-1">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toggleFavorite(house.id);
//                       }}
//                       className="bg-white rounded-full p-1 xs:p-1.5 shadow-lg hover:scale-110 transition-transform"
//                     >
//                       {favorites.includes(house.id) ? (
//                         <FavoriteIcon className="w-3 h-3 xs:w-4 xs:h-4 text-[#FF385C]" />
//                       ) : (
//                         <FavoriteBorderIcon className="w-3 h-3 xs:w-4 xs:h-4 text-gray-600" />
//                       )}
//                     </button>
//                   </div>
//                   <div className="absolute bottom-1 xs:bottom-2 left-1 xs:left-2 bg-black/70 text-white px-1.5 xs:px-2 py-0.5 rounded text-[10px] xs:text-xs">
//                     {getTranslatedType(house.type)}
//                   </div>
//                   <div className="absolute top-1 xs:top-2 left-1 xs:left-2">
//                     <span
//                       className={`px-1.5 xs:px-2 py-0.5 rounded text-[8px] xs:text-[10px] font-medium ${getUniversityColor(house.university)}`}
//                     >
//                       {house.university}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="p-2 xs:p-3 sm:p-4">
//                   <div className="flex items-start justify-between">
//                     <div className="min-w-0 flex-1">
//                       <h3 className="font-semibold text-xs xs:text-sm sm:text-base text-gray-900 truncate">
//                         {house.name}
//                       </h3>
//                       <p className="text-[10px] xs:text-xs text-gray-500 mt-0.5 truncate">
//                         <LocationOnIcon className="w-2.5 h-2.5 xs:w-3 xs:h-3 inline mr-0.5" />
//                         {house.village}, {house.sector}
//                       </p>
//                       <div className="flex items-center gap-1 xs:gap-2 mt-0.5 xs:mt-1">
//                         <span className="text-[10px] xs:text-xs text-gray-500">
//                           {house.rooms} {t.rooms}
//                         </span>
//                         <span className="text-[10px] xs:text-xs text-gray-300">
//                           •
//                         </span>
//                         <span className="text-[10px] xs:text-xs text-gray-500">
//                           {house.bathrooms} {t.bathrooms}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex flex-col items-end flex-shrink-0 ml-1">
//                       <div className="flex items-center gap-0.5 xs:gap-1 text-xs xs:text-sm font-medium text-gray-700">
//                         <StarIcon className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 text-yellow-400 fill-current" />
//                         {house.rating}
//                       </div>
//                       <p className="text-[10px] xs:text-xs font-semibold text-[#FF385C]">
//                         ${house.price}
//                         {t.perNightShort}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="flex flex-wrap items-center justify-center gap-2 mt-8 xs:mt-10 sm:mt-12"
//           >
//             <button
//               onClick={prevPage}
//               disabled={currentPage === 1}
//               className={`flex items-center gap-1 px-3 xs:px-4 py-1.5 xs:py-2 rounded-lg text-xs xs:text-sm font-medium transition-all ${
//                 currentPage === 1
//                   ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
//               }`}
//             >
//               <ArrowBackIcon className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
//               {t.prev}
//             </button>

//             <div className="flex items-center gap-1 xs:gap-1.5">
//               {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//                 (page) => {
//                   if (
//                     page === 1 ||
//                     page === totalPages ||
//                     Math.abs(page - currentPage) <= 1 ||
//                     (page === 2 && currentPage > 3) ||
//                     (page === totalPages - 1 && currentPage < totalPages - 2)
//                   ) {
//                     return (
//                       <motion.button
//                         key={page}
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => goToPage(page)}
//                         className={`w-8 h-8 xs:w-9 xs:h-9 flex items-center justify-center rounded-lg text-xs xs:text-sm font-medium transition-all ${
//                           currentPage === page
//                             ? "bg-[#FF385C] text-white shadow-lg shadow-[#FF385C]/30"
//                             : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                         }`}
//                       >
//                         {page}
//                       </motion.button>
//                     );
//                   }
//                   if (page === 2 && currentPage > 3) {
//                     return (
//                       <span
//                         key="ellipsis-start"
//                         className="w-8 h-8 flex items-center justify-center text-gray-400"
//                       >
//                         …
//                       </span>
//                     );
//                   }
//                   if (page === totalPages - 1 && currentPage < totalPages - 2) {
//                     return (
//                       <span
//                         key="ellipsis-end"
//                         className="w-8 h-8 flex items-center justify-center text-gray-400"
//                       >
//                         …
//                       </span>
//                     );
//                   }
//                   return null;
//                 },
//               )}
//             </div>

//             <button
//               onClick={nextPage}
//               disabled={currentPage === totalPages}
//               className={`flex items-center gap-1 px-3 xs:px-4 py-1.5 xs:py-2 rounded-lg text-xs xs:text-sm font-medium transition-all ${
//                 currentPage === totalPages
//                   ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
//               }`}
//             >
//               {t.next}
//               <ArrowForwardIcon className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
//             </button>
//           </motion.div>
//         )}

//         {filteredHouses.length === 0 && (
//           <div className="text-center py-8 xs:py-12">
//             <p className="text-gray-500 text-sm xs:text-base">
//               {t.noResults}
//             </p>
//           </div>
//         )}
//       </div>

//       {/* House Detail Modal - Responsive */}
//       <AnimatePresence>
//         {isPropertyModalOpen && selectedHouse && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[300]"
//               onClick={closeHouseModal}
//             />
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9, y: 20 }}
//               className="fixed inset-2 xs:inset-4 z-[301] flex items-center justify-center"
//             >
//               <div className="bg-white rounded-xl xs:rounded-2xl w-full max-w-2xl max-h-[95vh] xs:max-h-[90vh] overflow-hidden shadow-2xl">
//                 <div className="relative">
//                   <img
//                     src={selectedHouse.image}
//                     alt={selectedHouse.name}
//                     className="w-full h-40 xs:h-48 sm:h-56 md:h-64 object-cover"
//                   />
//                   <button
//                     onClick={closeHouseModal}
//                     className="absolute top-2 xs:top-3 right-2 xs:right-3 bg-white/90 p-1.5 xs:p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
//                   >
//                     <CloseIcon className="w-4 h-4 xs:w-5 xs:h-5 text-gray-800" />
//                   </button>
//                   <button
//                     onClick={() => toggleFavorite(selectedHouse.id)}
//                     className="absolute top-2 xs:top-3 right-10 xs:right-14 bg-white/90 p-1.5 xs:p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
//                   >
//                     {favorites.includes(selectedHouse.id) ? (
//                       <FavoriteIcon className="w-4 h-4 xs:w-5 xs:h-5 text-[#FF385C]" />
//                     ) : (
//                       <FavoriteBorderIcon className="w-4 h-4 xs:w-5 xs:h-5 text-gray-800" />
//                     )}
//                   </button>
//                   <div className="absolute bottom-2 xs:bottom-3 left-2 xs:left-3">
//                     <span
//                       className={`px-2 xs:px-3 py-0.5 xs:py-1 rounded text-[10px] xs:text-xs font-medium ${getUniversityColor(selectedHouse.university)}`}
//                     >
//                       <SchoolIcon className="w-3 h-3 xs:w-4 xs:h-4 inline mr-1" />
//                       {selectedHouse.university}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="p-3 xs:p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-200px)] xs:max-h-[calc(90vh-220px)]">
//                   <div className="flex flex-col xs:flex-row items-start justify-between mb-3 xs:mb-4 gap-2">
//                     <div>
//                       <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
//                         {selectedHouse.name}
//                       </h3>
//                       <p className="text-xs xs:text-sm text-gray-500 mt-0.5 xs:mt-1">
//                         <LocationOnIcon className="w-3 h-3 xs:w-4 xs:h-4 inline mr-0.5" />
//                         {getLocationInfo(selectedHouse)}
//                       </p>
//                       <p className="text-xs xs:text-sm text-gray-600 mt-1">
//                         {selectedHouse.description}
//                       </p>
//                     </div>
//                     <div className="flex items-center gap-0.5 xs:gap-1 text-sm xs:text-base md:text-lg font-medium text-gray-700 flex-shrink-0">
//                       <StarIcon className="w-4 h-4 xs:w-5 xs:h-5 text-yellow-400 fill-current" />
//                       {selectedHouse.rating}
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-2 xs:gap-3 mb-3 xs:mb-4">
//                     <div className="bg-gray-50 rounded-lg p-2 xs:p-3">
//                       <p className="text-[10px] xs:text-xs text-gray-500">
//                         {t.rooms}
//                       </p>
//                       <p className="text-sm xs:text-base font-semibold text-gray-900">
//                         <BedIcon className="w-3 h-3 xs:w-4 xs:h-4 inline mr-1" />
//                         {selectedHouse.rooms}
//                       </p>
//                     </div>
//                     <div className="bg-gray-50 rounded-lg p-2 xs:p-3">
//                       <p className="text-[10px] xs:text-xs text-gray-500">
//                         {t.bathrooms}
//                       </p>
//                       <p className="text-sm xs:text-base font-semibold text-gray-900">
//                         <BathroomIcon className="w-3 h-3 xs:w-4 xs:h-4 inline mr-1" />
//                         {selectedHouse.bathrooms}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="border-t border-gray-200 pt-3 xs:pt-4 mt-3 xs:mt-4">
//                     <h4 className="font-semibold text-sm xs:text-base text-gray-900 mb-1.5 xs:mb-2">
//                       {t.amenities}
//                     </h4>
//                     <div className="flex flex-wrap gap-1.5 xs:gap-2">
//                       {selectedHouse.amenities?.map((amenity) => {
//                         let icon = (
//                           <CheckCircleIcon className="w-3 h-3 xs:w-4 xs:h-4 text-[#FF385C]" />
//                         );
//                         if (amenity === "WiFi")
//                           icon = (
//                             <WifiIcon className="w-3 h-3 xs:w-4 xs:h-4 text-blue-500" />
//                           );
//                         if (amenity === "Kitchen" || amenity === "Kitchenette")
//                           icon = (
//                             <KitchenIcon className="w-3 h-3 xs:w-4 xs:h-4 text-orange-500" />
//                           );
//                         if (amenity === "Parking")
//                           icon = (
//                             <LocalParkingIcon className="w-3 h-3 xs:w-4 xs:h-4 text-green-500" />
//                           );
//                         if (amenity === "Security")
//                           icon = (
//                             <SecurityIcon className="w-3 h-3 xs:w-4 xs:h-4 text-red-500" />
//                           );
//                         return (
//                           <span
//                             key={amenity}
//                             className="flex items-center gap-0.5 xs:gap-1 px-2 xs:px-3 py-0.5 xs:py-1 bg-gray-100 rounded-full text-[10px] xs:text-xs sm:text-sm text-gray-700"
//                           >
//                             {icon}
//                             {amenity}
//                           </span>
//                         );
//                       })}
//                     </div>
//                   </div>

//                   <div className="border-t border-gray-200 pt-3 xs:pt-4 pb-6 mt-3 xs:mt-4">
//                     <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 xs:gap-4">
//                       <div>
//                         <p className="text-xs xs:text-sm text-gray-500">
//                           {t.price}
//                         </p>
//                         <p className="text-lg xs:text-xl md:text-2xl font-bold text-gray-900">
//                           ${selectedHouse.price}{" "}
//                           <span className="text-xs xs:text-sm font-normal text-gray-500">
//                             {t.perNight}
//                           </span>
//                         </p>
//                         <p className="text-xs xs:text-sm text-gray-500 mt-0.5 xs:mt-1">
//                           {selectedHouse.nights} {t.nightsTotal}: $
//                           {selectedHouse.price * selectedHouse.nights}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Payment Modal - Responsive */}
//       <AnimatePresence>
//         {isPaymentModalOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[400]"
//               onClick={closePaymentModal}
//             />
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9, y: 20 }}
//               className="fixed inset-2 xs:inset-4 z-[401] flex items-center justify-center"
//             >
//               <div className="bg-white rounded-xl xs:rounded-2xl w-full max-w-md max-h-[95vh] xs:max-h-[90vh] overflow-hidden shadow-2xl">
//                 <div className="p-3 xs:p-4 border-b border-gray-200 flex items-center justify-between">
//                   <h3 className="text-base xs:text-lg font-semibold">
//                     {t.payWithMomo}
//                   </h3>
//                   <button
//                     onClick={closePaymentModal}
//                     className="p-1 rounded-full transition-colors"
//                   >
//                     <CloseIcon className="w-4 h-4 xs:w-5 xs:h-5" />
//                   </button>
//                 </div>
//                 <div className="p-3 xs:p-4 sm:p-6">
//                   {showPaymentResult ? (
//                     <div className="text-center py-6 xs:py-8">
//                       {paymentResult === "success" ? (
//                         <div>
//                           <div className="w-16 h-16 xs:w-20 xs:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 xs:mb-4">
//                             <CheckCircleIcon className="w-8 h-8 xs:w-10 xs:h-10 text-green-500" />
//                           </div>
//                           <h4 className="text-xl xs:text-2xl font-bold text-green-500 mb-1 xs:mb-2">
//                             {t.paymentSuccess}
//                           </h4>
//                           <p className="text-xs xs:text-sm text-gray-500 mb-4 xs:mb-6">
//                             {t.yourBookingConfirmed}
//                           </p>
//                           <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={resetPaymentModal}
//                             className="px-4 xs:px-6 py-1.5 xs:py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors text-sm xs:text-base"
//                           >
//                             {t.done}
//                           </motion.button>
//                         </div>
//                       ) : (
//                         <div>
//                           <div className="w-16 h-16 xs:w-20 xs:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 xs:mb-4">
//                             <ErrorIcon className="w-8 h-8 xs:w-10 xs:h-10 text-red-500" />
//                           </div>
//                           <h4 className="text-xl xs:text-2xl font-bold text-red-500 mb-1 xs:mb-2">
//                             {t.paymentFailed}
//                           </h4>
//                           <p className="text-xs xs:text-sm text-gray-500 mb-4 xs:mb-6">
//                             Please check your MOMO number and try again.
//                           </p>
//                           <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={resetPaymentModal}
//                             className="px-4 xs:px-6 py-1.5 xs:py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors text-sm xs:text-base"
//                           >
//                             {t.tryAgain}
//                           </motion.button>
//                         </div>
//                       )}
//                     </div>
//                   ) : (
//                     <>
//                       <div className="mb-3 xs:mb-4">
//                         <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1 xs:mb-2">
//                           {t.enterMomoNumber}
//                         </label>
//                         <input
//                           type="tel"
//                           value={momoNumber}
//                           onChange={(e) => setMomoNumber(e.target.value)}
//                           placeholder="07XX XXX XXX"
//                           className="w-full px-3 xs:px-4 py-2 xs:py-3 text-sm xs:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] focus:ring-1 focus:ring-[#FF385C]"
//                           disabled={isProcessingPayment}
//                         />
//                       </div>
//                       <div className="bg-gray-50 rounded-lg p-3 xs:p-4 mb-4 xs:mb-6">
//                         <h4 className="font-semibold text-xs xs:text-sm text-gray-900 mb-1 xs:mb-2">
//                           {t.bookingDetails}
//                         </h4>
//                         <p className="text-[10px] xs:text-xs text-gray-500">
//                           {selectedHouse?.name}
//                         </p>
//                         <p className="text-[10px] xs:text-xs text-gray-500">
//                           {selectedHouse?.university}
//                         </p>
//                         <p className="text-[10px] xs:text-xs text-gray-500">
//                           {selectedHouse?.nights} {t.nights} × $
//                           {selectedHouse?.price} = $
//                           {selectedHouse?.price && selectedHouse?.nights
//                             ? selectedHouse.price * selectedHouse.nights
//                             : 0}
//                         </p>
//                         <p className="text-sm xs:text-base md:text-lg font-bold text-gray-900 mt-1 xs:mt-2">
//                           {t.totalPrice}: $
//                           {selectedHouse?.price && selectedHouse?.nights
//                             ? selectedHouse.price * selectedHouse.nights
//                             : 0}
//                         </p>
//                       </div>
//                       <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={processPayment}
//                         disabled={isProcessingPayment}
//                         className="w-full py-2.5 xs:py-3 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm xs:text-base"
//                       >
//                         {isProcessingPayment ? (
//                           <>
//                             <div className="w-4 h-4 xs:w-5 xs:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                             {t.processingPayment}
//                           </>
//                         ) : (
//                           t.payWithMomo
//                         )}
//                       </motion.button>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Location Modal - Responsive */}
//       <AnimatePresence>
//         {isLocationModalOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
//               onClick={() => setIsLocationModalOpen(false)}
//             />
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9, y: 20 }}
//               className="fixed inset-2 xs:inset-4 z-[201] flex items-center justify-center p-2 xs:p-4"
//             >
//               <div className="bg-white rounded-xl xs:rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden shadow-2xl">
//                 <div className="p-3 xs:p-4 border-b border-gray-200 flex items-center justify-between">
//                   <h3 className="text-base xs:text-lg font-semibold">
//                     {t.selectLocation}
//                   </h3>
//                   <button
//                     onClick={() => setIsLocationModalOpen(false)}
//                     className="p-1 rounded-full transition-colors"
//                   >
//                     <CloseIcon className="w-4 h-4 xs:w-5 xs:h-5" />
//                   </button>
//                 </div>
//                 <div className="p-3 xs:p-4">
//                   <div className="relative mb-3 xs:mb-4">
//                     <LocationOnIcon className="absolute left-2.5 xs:left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 xs:w-5 xs:h-5" />
//                     <input
//                       type="text"
//                       placeholder={t.searchDestinations}
//                       value={searchLocation}
//                       onChange={(e) => setSearchLocation(e.target.value)}
//                       className="w-full pl-8 xs:pl-10 pr-3 xs:pr-4 py-2 xs:py-2.5 text-sm xs:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] focus:ring-1 focus:ring-[#FF385C] placeholder-gray-400"
//                       autoFocus
//                     />
//                   </div>

//                   <div className="mb-3 xs:mb-4">
//                     <h4 className="text-xs xs:text-sm font-medium text-gray-500 mb-1.5 xs:mb-2">
//                       <SchoolIcon className="w-3 h-3 xs:w-4 xs:h-4 inline mr-1" />
//                       {t.popularLocations}
//                     </h4>
//                     <div className="max-h-40 overflow-y-auto space-y-0.5">
//                       {universityLocations.map((uni) => (
//                         <button
//                           key={uni}
//                           onClick={() => {
//                             setSelectedUniversity(uni);
//                             setSearchLocation(uni);
//                             setIsLocationModalOpen(false);
//                           }}
//                           className="w-full text-left px-2 xs:px-3 py-1.5 xs:py-2 rounded-lg transition-colors flex items-center gap-1.5 xs:gap-2"
//                         >
//                           <SchoolIcon className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-[#FF385C]" />
//                           <span className="text-xs xs:text-sm">
//                             {uni}
//                           </span>
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   <div>
//                     <h4 className="text-xs xs:text-sm font-medium text-gray-500 mb-1.5 xs:mb-2">
//                       <LocationCityIcon className="w-3 h-3 xs:w-4 xs:h-4 inline mr-1" />
//                       Locations in Rwanda
//                     </h4>
//                     <div className="max-h-40 overflow-y-auto space-y-0.5">
//                       {locationSuggestions.map((location) => (
//                         <button
//                           key={location}
//                           onClick={() => {
//                             setSearchLocation(location);
//                             setSelectedUniversity("");
//                             setIsLocationModalOpen(false);
//                           }}
//                           className="w-full text-left px-2 xs:px-3 py-1.5 xs:py-2 rounded-lg transition-colors flex items-center gap-1.5 xs:gap-2"
//                         >
//                           <LocationOnIcon className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-[#FF385C]" />
//                           <span className="text-xs xs:text-sm">
//                             {location}
//                           </span>
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Date Picker Modal - Responsive */}
//       <AnimatePresence>
//         {isDatePickerOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
//               onClick={() => setIsDatePickerOpen(false)}
//             />
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9, y: 20 }}
//               className="fixed inset-2 xs:inset-4 z-[201] flex items-center justify-center p-2 xs:p-4"
//             >
//               <div className="bg-white rounded-xl xs:rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
//                 <div className="p-3 xs:p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-2">
//                   <h3 className="text-base xs:text-lg font-semibold">
//                     {t.when}
//                   </h3>
//                   <div className="flex items-center gap-1 xs:gap-2">
//                     <button
//                       onClick={clearDates}
//                       className="text-xs xs:text-sm text-gray-500 hover:text-gray-700 transition-colors"
//                     >
//                       {t.clear}
//                     </button>
//                     <button
//                       onClick={() => setIsDatePickerOpen(false)}
//                       className="p-1 rounded-full transition-colors"
//                     >
//                       <CloseIcon className="w-4 h-4 xs:w-5 xs:h-5" />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="p-3 xs:p-4 overflow-y-auto">
//                   <div className="flex items-center justify-between mb-3 xs:mb-4">
//                     <button
//                       onClick={() => changeMonth(-1)}
//                       className="p-1.5 xs:p-2 rounded-full transition-colors"
//                     >
//                       <ArrowBackIcon className="w-4 h-4 xs:w-5 xs:h-5" />
//                     </button>
//                     <h4 className="font-semibold text-sm xs:text-base">
//                       {new Date(currentYear, currentMonth).toLocaleString(
//                         "default",
//                         { month: "long", year: "numeric" },
//                       )}
//                     </h4>
//                     <button
//                       onClick={() => changeMonth(1)}
//                       className="p-1.5 xs:p-2 rounded-full transition-colors"
//                     >
//                       <ArrowForwardIcon className="w-4 h-4 xs:w-5 xs:h-5" />
//                     </button>
//                   </div>
//                   <div className="grid grid-cols-7 gap-0.5 xs:gap-1 mb-1.5 xs:mb-2">
//                     {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
//                       <div
//                         key={day}
//                         className="text-center text-[10px] xs:text-xs font-medium text-gray-500 py-0.5 xs:py-1"
//                       >
//                         {day}
//                       </div>
//                     ))}
//                   </div>
//                   <div className="grid grid-cols-7 gap-0.5 xs:gap-1">
//                     {renderCalendar()}
//                   </div>
//                   <div className="mt-3 xs:mt-4 flex flex-wrap items-center justify-between border-t border-gray-200 pt-3 xs:pt-4 gap-2">
//                     <div className="flex flex-wrap gap-1 xs:gap-2">
//                       {tempCheckIn && (
//                         <span className="text-[10px] xs:text-xs sm:text-sm">
//                           {t.checkIn}: {tempCheckIn.toLocaleDateString()}
//                         </span>
//                       )}
//                       {tempCheckOut && (
//                         <span className="text-[10px] xs:text-xs sm:text-sm">
//                           {t.checkOut}: {tempCheckOut.toLocaleDateString()}
//                         </span>
//                       )}
//                     </div>
//                     <button
//                       onClick={applyDates}
//                       disabled={!tempCheckIn || !tempCheckOut}
//                       className="px-3 xs:px-4 py-1.5 xs:py-2 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs xs:text-sm"
//                     >
//                       {t.apply}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Guest/Student Modal - Responsive */}
//       <AnimatePresence>
//         {isGuestModalOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
//               onClick={() => setIsGuestModalOpen(false)}
//             />
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9, y: 20 }}
//               className="fixed inset-2 xs:inset-4 z-[201] flex items-center justify-center p-2 xs:p-4"
//             >
//               <div className="bg-white rounded-xl xs:rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden shadow-2xl">
//                 <div className="p-3 xs:p-4 border-b border-gray-200 flex items-center justify-between">
//                   <h3 className="text-base xs:text-lg font-semibold">
//                     <PeopleAltIcon className="w-4 h-4 xs:w-5 xs:h-5 inline mr-2 text-[#FF385C]" />
//                     {t.guests}
//                   </h3>
//                   <button
//                     onClick={() => setIsGuestModalOpen(false)}
//                     className="p-1 rounded-full transition-colors"
//                   >
//                     <CloseIcon className="w-4 h-4 xs:w-5 xs:h-5" />
//                   </button>
//                 </div>
//                 <div className="p-3 xs:p-4 space-y-3 xs:space-y-4">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-1.5 xs:gap-2">
//                       <div className="text-gray-500">
//                         <PeopleAltIcon className="w-4 h-4 xs:w-5 xs:h-5" />
//                       </div>
//                       <span className="font-medium text-sm xs:text-base">
//                         {t.students || "Students"}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2 xs:gap-3">
//                       <button
//                         onClick={() =>
//                           setStudentCount(Math.max(1, studentCount - 1))
//                         }
//                         className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center transition-colors"
//                       >
//                         <RemoveIcon className="w-3 h-3 xs:w-4 xs:h-4" />
//                       </button>
//                       <span className="w-5 xs:w-6 text-center font-medium text-sm xs:text-base">
//                         {studentCount}
//                       </span>
//                       <button
//                         onClick={() => setStudentCount(studentCount + 1)}
//                         className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center transition-colors"
//                       >
//                         <AddIcon className="w-3 h-3 xs:w-4 xs:h-4" />
//                       </button>
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => {
//                       setIsGuestModalOpen(false);
//                       toast.success(`👥 ${getStudentCount()}`);
//                     }}
//                     className="w-full py-2.5 xs:py-3 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors text-sm xs:text-base"
//                   >
//                     {t.apply}
//                   </button>
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
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Material-UI Icons
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import BedIcon from "@mui/icons-material/Bed";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SchoolIcon from "@mui/icons-material/School";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BathroomIcon from "@mui/icons-material/Bathroom";
import KitchenIcon from "@mui/icons-material/Kitchen";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import SecurityIcon from "@mui/icons-material/Security";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import InfoIcon from "@mui/icons-material/Info";
import HotelIcon from "@mui/icons-material/Hotel";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";
import LoginIcon from "@mui/icons-material/Login";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SaveIcon from "@mui/icons-material/Save";

// ============================================================
// 1. DATA FROM THE PROVIDED DOCUMENTS
// ============================================================

interface StudentHouse {
  id: number;
  name: string;
  type: string;
  price: number;
  priceRWF: number;
  nights: number;
  rating: number;
  category: string;
  university: string;
  province: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
  code_vil_1?: string;
  rooms: number;
  bathrooms: number;
  image: string;
  description: string;
  amenities: string[];
  owner: string;
  contact: string;
  bookingStatus: "available" | "booked" | "pending";
  minutesFromCampus: number;
  features: string[];
  yearBuilt: number;
}

const studentHousesData: StudentHouse[] = [
  // ===================== KIGALI CITY - Nyarugenge =====================
  {
    id: 1,
    name: "Gihanga Student Lodge",
    type: "House",
    price: 85,
    priceRWF: 110500,
    nights: 30,
    rating: 4.8,
    category: "student",
    university: "UR - CST (Science & Tech)",
    province: "Kigali City",
    district: "Nyarugenge",
    sector: "Gitega",
    cell: "Akabahizi",
    village: "Gihanga",
    code_vil_1: "11010104",
    rooms: 4,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    description:
      "Modern student house in Gihanga, near UR-CST campus. Fully furnished with study area.",
    amenities: [
      "WiFi",
      "Kitchen",
      "Security",
      "Parking",
      "Study Room",
      "Laundry",
    ],
    owner: "Ntwari Jean Rene",
    contact: "+250 780414088",
    bookingStatus: "available",
    minutesFromCampus: 5,
    features: ["Solar Panels", "Water Heater", "Study Desk"],
    yearBuilt: 2022,
  },
  {
    id: 2,
    name: "Iterambere Student Apartments",
    type: "Apartment",
    price: 70,
    priceRWF: 91000,
    nights: 30,
    rating: 4.7,
    category: "student",
    university: "UR - CST (Science & Tech)",
    province: "Kigali City",
    district: "Nyarugenge",
    sector: "Gitega",
    cell: "Akabahizi",
    village: "Iterambere",
    code_vil_1: "11010105",
    rooms: 2,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    description: "Spacious apartments near UR-CST, perfect for students.",
    amenities: ["WiFi", "Kitchen", "Security", "Water Heater"],
    owner: "Mukamana Alice",
    contact: "+250 788123456",
    bookingStatus: "available",
    minutesFromCampus: 8,
    features: ["Water Heater", "Balcony"],
    yearBuilt: 2021,
  },
  {
    id: 3,
    name: "Izuba Student House",
    type: "House",
    price: 95,
    priceRWF: 123500,
    nights: 30,
    rating: 4.9,
    category: "student",
    university: "UR - CST (Science & Tech)",
    province: "Kigali City",
    district: "Nyarugenge",
    sector: "Gitega",
    cell: "Akabahizi",
    village: "Izuba",
    code_vil_1: "11010106",
    rooms: 5,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
    description: "Large student house with garden, near UR-CST.",
    amenities: ["WiFi", "Kitchen", "Garden", "Parking", "Study Area", "BBQ"],
    owner: "Habimana Jean",
    contact: "+250 788654321",
    bookingStatus: "available",
    minutesFromCampus: 10,
    features: ["Garden", "BBQ Area"],
    yearBuilt: 2020,
  },
  {
    id: 4,
    name: "Akinyambo Student Hostel",
    type: "Room",
    price: 50,
    priceRWF: 65000,
    nights: 30,
    rating: 4.5,
    category: "student",
    university: "UR - CST (Science & Tech)",
    province: "Kigali City",
    district: "Nyarugenge",
    sector: "Gitega",
    cell: "Akabeza",
    village: "Akinyambo",
    code_vil_1: "11010202",
    rooms: 1,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop",
    description: "Affordable single rooms for students near UR-CST.",
    amenities: ["WiFi", "Shared Kitchen", "Security", "Common Area"],
    owner: "Uwimana Marie",
    contact: "+250 788987654",
    bookingStatus: "available",
    minutesFromCampus: 7,
    features: ["Common Lounge"],
    yearBuilt: 2019,
  },
  {
    id: 5,
    name: "Amayaga Student Apartments",
    type: "Apartment",
    price: 75,
    priceRWF: 97500,
    nights: 30,
    rating: 4.8,
    category: "student",
    university: "UR - CST (Science & Tech)",
    province: "Kigali City",
    district: "Nyarugenge",
    sector: "Gitega",
    cell: "Akabeza",
    village: "Amayaga",
    code_vil_1: "11010203",
    rooms: 2,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    description: "Modern student apartments in Amayaga, close to UR-CST.",
    amenities: ["WiFi", "Kitchenette", "Security", "Study Desk", "Laundry"],
    owner: "Niyonkuru David",
    contact: "+250 788456789",
    bookingStatus: "available",
    minutesFromCampus: 6,
    features: ["Study Desk", "Laundry"],
    yearBuilt: 2023,
  },
  {
    id: 6,
    name: "Kiyovu Student Flats",
    type: "Apartment",
    price: 90,
    priceRWF: 117000,
    nights: 30,
    rating: 4.9,
    category: "student",
    university: "UR - CST (Science & Tech)",
    province: "Kigali City",
    district: "Nyarugenge",
    sector: "Nyarugenge",
    cell: "Kiyovu",
    village: "Amizero",
    code_vil_1: "11090301",
    rooms: 2,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    description:
      "Premium student apartments in Kiyovu, walking distance to UR-CST.",
    amenities: ["WiFi", "Kitchen", "Security", "Elevator", "Study Area"],
    owner: "Rukundo Jean",
    contact: "+250 788444666",
    bookingStatus: "available",
    minutesFromCampus: 3,
    features: ["Elevator", "Study Area"],
    yearBuilt: 2023,
  },
  {
    id: 7,
    name: "Kamatamu Student Village",
    type: "Apartment",
    price: 80,
    priceRWF: 104000,
    nights: 30,
    rating: 4.7,
    category: "student",
    university: "University of Kigali (UoK)",
    province: "Kigali City",
    district: "Gasabo",
    sector: "Kacyiru",
    cell: "Kamatamu",
    village: "Amajyambere",
    code_vil_1: "12070101",
    rooms: 3,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    description: "Student apartments near University of Kigali in Kamatamu.",
    amenities: ["WiFi", "Kitchen", "Security", "Parking", "Study Room"],
    owner: "Kagabo Eric",
    contact: "+250 788111222",
    bookingStatus: "available",
    minutesFromCampus: 5,
    features: ["Study Room", "Garden"],
    yearBuilt: 2022,
  },
  {
    id: 8,
    name: "Ruhango Student Lodge",
    type: "House",
    price: 85,
    priceRWF: 110500,
    nights: 30,
    rating: 4.6,
    category: "student",
    university: "Kigali Independent Univ. (ULK)",
    province: "Kigali City",
    district: "Gasabo",
    sector: "Gisozi",
    cell: "Ruhango",
    village: "Kanyinya",
    code_vil_1: "12040201",
    rooms: 4,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
    description: "Spacious student house near ULK in Gisozi.",
    amenities: ["WiFi", "Kitchen", "Garden", "Parking", "Study Area"],
    owner: "Muhire Jean",
    contact: "+250 788333444",
    bookingStatus: "available",
    minutesFromCampus: 8,
    features: ["Garden", "Study Room"],
    yearBuilt: 2021,
  },
  {
    id: 9,
    name: "Masoro Student Hostel",
    type: "Room",
    price: 55,
    priceRWF: 71500,
    nights: 30,
    rating: 4.4,
    category: "student",
    university: "Adventist Univ. (AUCA)",
    province: "Kigali City",
    district: "Gasabo",
    sector: "Masoro",
    cell: "Kivugiza",
    village: "Gasenga",
    code_vil_1: "12090301",
    rooms: 1,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop",
    description: "Affordable student rooms near AUCA in Masoro.",
    amenities: ["WiFi", "Shared Kitchen", "Security", "Common Area"],
    owner: "Dusabimana Grace",
    contact: "+250 788555666",
    bookingStatus: "available",
    minutesFromCampus: 5,
    features: ["Common Area"],
    yearBuilt: 2020,
  },
  {
    id: 10,
    name: "Ndera Student Village",
    type: "Apartment",
    price: 95,
    priceRWF: 123500,
    nights: 30,
    rating: 4.9,
    category: "student",
    university: "Carnegie Mellon (CMU-Africa)",
    province: "Kigali City",
    district: "Gasabo",
    sector: "Ndera",
    cell: "Bwiza",
    village: "Akarwasa",
    code_vil_1: "12110101",
    rooms: 2,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    description: "Premium student apartments near CMU-Africa in Ndera.",
    amenities: ["WiFi", "Kitchen", "Security", "Elevator", "Study Area"],
    owner: "Niyomugabo Eric",
    contact: "+250 788222666",
    bookingStatus: "available",
    minutesFromCampus: 5,
    features: ["Elevator", "Study Area"],
    yearBuilt: 2023,
  },
  {
    id: 11,
    name: "Mburabuturo Student House",
    type: "House",
    price: 88,
    priceRWF: 114400,
    nights: 30,
    rating: 4.8,
    category: "student",
    university: "UR - CBE (Business & Econ)",
    province: "Kigali City",
    district: "Kicukiro",
    sector: "Gikondo",
    cell: "Mburabuturo",
    village: "Rebero",
    code_vil_1: "13030106",
    rooms: 4,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    description: "Spacious student house near UR-CBE in Gikondo.",
    amenities: ["WiFi", "Kitchen", "Garden", "Parking", "Study Room"],
    owner: "Niyomugabo Eric",
    contact: "+250 788555777",
    bookingStatus: "available",
    minutesFromCampus: 7,
    features: ["Garden", "Study Room"],
    yearBuilt: 2022,
  },
  {
    id: 12,
    name: "Niboye Student Hostel",
    type: "Room",
    price: 48,
    priceRWF: 62400,
    nights: 30,
    rating: 4.5,
    category: "student",
    university: "IPRC Kigali",
    province: "Kigali City",
    district: "Kicukiro",
    sector: "Niboye",
    cell: "Niboye",
    village: "Buhoro",
    code_vil_1: "13090201",
    rooms: 1,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop",
    description: "Affordable rooms for IPRC Kigali students.",
    amenities: ["WiFi", "Shared Kitchen", "Security", "Study Area"],
    owner: "Rwabugiri John",
    contact: "+250 788111333",
    bookingStatus: "available",
    minutesFromCampus: 5,
    features: ["Study Area"],
    yearBuilt: 2021,
  },
  {
    id: 13,
    name: "Ruhande Student Flats",
    type: "Apartment",
    price: 72,
    priceRWF: 93600,
    nights: 30,
    rating: 4.7,
    category: "student",
    university: "UR - Huye Campus",
    province: "Southern",
    district: "Huye",
    sector: "Ngoma",
    cell: "Butare",
    village: "Ruhande",
    code_vil_1: "24090101",
    rooms: 2,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    description: "Student apartments near UR Huye campus in Ruhande.",
    amenities: ["WiFi", "Kitchenette", "Security", "Study Area"],
    owner: "Niyigena Jean",
    contact: "+250 788777888",
    bookingStatus: "available",
    minutesFromCampus: 5,
    features: ["Study Area"],
    yearBuilt: 2021,
  },
  {
    id: 14,
    name: "Butare Student Lodge",
    type: "House",
    price: 88,
    priceRWF: 114400,
    nights: 30,
    rating: 4.6,
    category: "student",
    university: "UR - Huye Campus",
    province: "Southern",
    district: "Huye",
    sector: "Ngoma",
    cell: "Butare",
    village: "Butare",
    code_vil_1: "24090102",
    rooms: 3,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
    description: "Student house in Butare, walking distance to UR Huye campus.",
    amenities: ["WiFi", "Kitchen", "Garden", "Parking", "Study Room"],
    owner: "Mukeshimana Anna",
    contact: "+250 788999000",
    bookingStatus: "available",
    minutesFromCampus: 10,
    features: ["Garden", "Study Room"],
    yearBuilt: 2020,
  },
  {
    id: 15,
    name: "IPRC Huye Hostel",
    type: "Room",
    price: 45,
    priceRWF: 58500,
    nights: 30,
    rating: 4.3,
    category: "student",
    university: "IPRC Huye",
    province: "Southern",
    district: "Huye",
    sector: "Ngoma",
    cell: "Ngoma",
    village: "Ngoma I",
    code_vil_1: "24090402",
    rooms: 1,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop",
    description: "Affordable rooms for IPRC Huye students.",
    amenities: ["WiFi", "Shared Kitchen", "Security", "Study Area"],
    owner: "Rwabugiri John",
    contact: "+250 788999111",
    bookingStatus: "available",
    minutesFromCampus: 7,
    features: ["Study Area"],
    yearBuilt: 2019,
  },
  {
    id: 16,
    name: "Kabgayi Student Hostel",
    type: "Room",
    price: 42,
    priceRWF: 54600,
    nights: 30,
    rating: 4.4,
    category: "student",
    university: "Catholic Institute (ICK)",
    province: "Southern",
    district: "Muhanga",
    sector: "Cyiza",
    cell: "Kabgayi",
    village: "Kabgayi",
    code_vil_1: "27020201",
    rooms: 1,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop",
    description: "Affordable student rooms near ICK in Kabgayi.",
    amenities: ["WiFi", "Shared Kitchen", "Security", "Study Area"],
    owner: "Uwimana Jean",
    contact: "+250 788999111",
    bookingStatus: "available",
    minutesFromCampus: 8,
    features: ["Study Area"],
    yearBuilt: 2020,
  },
  {
    id: 17,
    name: "Gitwe Student House",
    type: "House",
    price: 70,
    priceRWF: 91000,
    nights: 30,
    rating: 4.5,
    category: "student",
    university: "University of Gitwe",
    province: "Southern",
    district: "Ruhango",
    sector: "Ruhango",
    cell: "Ruhango",
    village: "Ruhango",
    code_vil_1: "26090101",
    rooms: 3,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
    description: "Student house near University of Gitwe.",
    amenities: ["WiFi", "Kitchen", "Garden", "Parking"],
    owner: "Niyomugabo Jean",
    contact: "+250 788111444",
    bookingStatus: "available",
    minutesFromCampus: 10,
    features: ["Garden"],
    yearBuilt: 2020,
  },
  {
    id: 18,
    name: "INES Ruhengeri Student Lodge",
    type: "House",
    price: 85,
    priceRWF: 110500,
    nights: 30,
    rating: 4.9,
    category: "student",
    university: "INES-Ruhengeri",
    province: "Northern",
    district: "Musanze",
    sector: "Muhoza",
    cell: "Cyabararika",
    village: "Cyabararika",
    code_vil_1: "43080101",
    rooms: 4,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    description:
      "Modern student house near INES-Ruhengeri, 5 min walk to campus.",
    amenities: [
      "WiFi",
      "Kitchen",
      "Security",
      "Parking",
      "Study Room",
      "Laundry",
    ],
    owner: "Ntwari Jean Rene",
    contact: "+250 780414088",
    bookingStatus: "available",
    minutesFromCampus: 5,
    features: ["Solar Panels", "Water Heater", "Study Desk"],
    yearBuilt: 2022,
  },
  {
    id: 19,
    name: "Kigombe Student Apartments",
    type: "Apartment",
    price: 70,
    priceRWF: 91000,
    nights: 30,
    rating: 4.7,
    category: "student",
    university: "INES-Ruhengeri",
    province: "Northern",
    district: "Musanze",
    sector: "Muhoza",
    cell: "Kigombe",
    village: "Kigombe",
    code_vil_1: "43080201",
    rooms: 3,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    description: "Spacious apartments for students, close to INES-Ruhengeri.",
    amenities: ["WiFi", "Kitchen", "Security", "Parking", "Water Heater"],
    owner: "Mukamana Alice",
    contact: "+250 788123456",
    bookingStatus: "available",
    minutesFromCampus: 8,
    features: ["Water Heater", "Balcony"],
    yearBuilt: 2021,
  },
  {
    id: 20,
    name: "Ruhengeri City Hostel",
    type: "Room",
    price: 50,
    priceRWF: 65000,
    nights: 30,
    rating: 4.6,
    category: "student",
    university: "INES-Ruhengeri",
    province: "Northern",
    district: "Musanze",
    sector: "Muhoza",
    cell: "Ruhengeri",
    village: "Ruhengeri",
    code_vil_1: "43080401",
    rooms: 1,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop",
    description: "Affordable single rooms for students in central Ruhengeri.",
    amenities: ["WiFi", "Shared Kitchen", "Security", "Common Area"],
    owner: "Uwimana Marie",
    contact: "+250 788987654",
    bookingStatus: "available",
    minutesFromCampus: 15,
    features: ["Common Lounge"],
    yearBuilt: 2019,
  },
  {
    id: 21,
    name: "Busogo Student Village",
    type: "Apartment",
    price: 80,
    priceRWF: 104000,
    nights: 30,
    rating: 4.8,
    category: "student",
    university: "UR - CAVM (Agriculture)",
    province: "Northern",
    district: "Musanze",
    sector: "Busogo",
    cell: "Busogo",
    village: "Busogo",
    code_vil_1: "43010101",
    rooms: 3,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    description: "Student apartments near UR-CAVM campus in Busogo.",
    amenities: ["WiFi", "Kitchen", "Security", "Parking", "Study Room"],
    owner: "Kagabo Eric",
    contact: "+250 788111222",
    bookingStatus: "available",
    minutesFromCampus: 5,
    features: ["Study Room"],
    yearBuilt: 2022,
  },
  {
    id: 22,
    name: "IPRC Musanze Hostel",
    type: "Room",
    price: 55,
    priceRWF: 71500,
    nights: 30,
    rating: 4.4,
    category: "student",
    university: "IPRC Musanze",
    province: "Northern",
    district: "Musanze",
    sector: "Muhoza",
    cell: "Mpenge",
    village: "Mpenge",
    code_vil_1: "43080301",
    rooms: 1,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop",
    description: "Affordable student rooms near IPRC Musanze campus.",
    amenities: ["WiFi", "Shared Kitchen", "Security", "Common Area"],
    owner: "Dusabimana Grace",
    contact: "+250 788555666",
    bookingStatus: "available",
    minutesFromCampus: 5,
    features: ["Common Area"],
    yearBuilt: 2020,
  },
  {
    id: 23,
    name: "Butaro Student Village",
    type: "Apartment",
    price: 82,
    priceRWF: 106600,
    nights: 30,
    rating: 4.8,
    category: "student",
    university: "Univ. of Global Health Equity",
    province: "Northern",
    district: "Burera",
    sector: "Butaro",
    cell: "Butaro",
    village: "Butaro",
    code_vil_1: "44020502",
    rooms: 2,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    description: "Student apartments near University of Global Health Equity.",
    amenities: ["WiFi", "Kitchen", "Security", "Study Room", "Laundry"],
    owner: "Rukundo Paul",
    contact: "+250 788222555",
    bookingStatus: "available",
    minutesFromCampus: 5,
    features: ["Study Room", "Laundry"],
    yearBuilt: 2022,
  },
  {
    id: 24,
    name: "Rukara Student Village",
    type: "Apartment",
    price: 68,
    priceRWF: 88400,
    nights: 30,
    rating: 4.6,
    category: "student",
    university: "UR - CE (Education)",
    province: "Eastern",
    district: "Rwamagana",
    sector: "Rukara",
    cell: "Rukara",
    village: "Rukara",
    code_vil_1: "54100201",
    rooms: 2,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    description: "Student housing near UR-CE campus in Rwamagana.",
    amenities: ["WiFi", "Kitchen", "Security", "Parking"],
    owner: "Uwimana Jean",
    contact: "+250 788222444",
    bookingStatus: "available",
    minutesFromCampus: 5,
    features: ["Parking"],
    yearBuilt: 2022,
  },
  {
    id: 25,
    name: "Nyagatare Student Lodge",
    type: "House",
    price: 65,
    priceRWF: 84500,
    nights: 30,
    rating: 4.5,
    category: "student",
    university: "UR - Nyagatare Campus",
    province: "Eastern",
    district: "Nyagatare",
    sector: "Nyagatare",
    cell: "Nyagatare",
    village: "Nyagatare I",
    code_vil_1: "52100703",
    rooms: 3,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
    description: "Student house near UR Nyagatare campus.",
    amenities: ["WiFi", "Kitchen", "Garden", "Parking"],
    owner: "Muhirwa Albert",
    contact: "+250 788333555",
    bookingStatus: "available",
    minutesFromCampus: 8,
    features: ["Garden"],
    yearBuilt: 2021,
  },
  {
    id: 26,
    name: "Gashora Student Lodge",
    type: "Room",
    price: 55,
    priceRWF: 71500,
    nights: 30,
    rating: 4.5,
    category: "student",
    university: "RICA (Conservation Agric.)",
    province: "Eastern",
    district: "Bugesera",
    sector: "Gashora",
    cell: "Gashora",
    village: "Gashora",
    code_vil_1: "57010101",
    rooms: 1,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop",
    description: "Student rooms near RICA in Gashora.",
    amenities: ["WiFi", "Shared Kitchen", "Security", "Study Area"],
    owner: "Mukamana Alice",
    contact: "+250 788999222",
    bookingStatus: "available",
    minutesFromCampus: 5,
    features: ["Study Area"],
    yearBuilt: 2022,
  },
  {
    id: 27,
    name: "Karongi Student Hostel",
    type: "Room",
    price: 50,
    priceRWF: 65000,
    nights: 30,
    rating: 4.4,
    category: "student",
    university: "IPRC Karongi",
    province: "Western",
    district: "Karongi",
    sector: "Bwishyura",
    cell: "Bwishyura",
    village: "Bwishyura",
    code_vil_1: "31010703",
    rooms: 1,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop",
    description: "Affordable student rooms near IPRC Karongi.",
    amenities: ["WiFi", "Shared Kitchen", "Security"],
    owner: "Uwimana Marie",
    contact: "+250 788666999",
    bookingStatus: "available",
    minutesFromCampus: 6,
    features: ["Shared Kitchen"],
    yearBuilt: 2020,
  },
  {
    id: 28,
    name: "Gisenyi Student House",
    type: "House",
    price: 75,
    priceRWF: 97500,
    nights: 30,
    rating: 4.7,
    category: "student",
    university: "UTB (Tourism & Business)",
    province: "Western",
    district: "Rubavu",
    sector: "Gisenyi",
    cell: "Gisenyi",
    village: "Gisenyi",
    code_vil_1: "33040201",
    rooms: 3,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
    description: "Student house near UTB in Gisenyi, close to Lake Kivu.",
    amenities: ["WiFi", "Kitchen", "Garden", "Parking", "Study Room"],
    owner: "Habimana Jean",
    contact: "+250 788555888",
    bookingStatus: "available",
    minutesFromCampus: 8,
    features: ["Garden", "Lake View"],
    yearBuilt: 2021,
  },
];

// ============================================================
// 2. TYPES & TRANSLATIONS
// ============================================================

interface HeroProps {
  onSearch?: (params: any) => void;
  language?: "en" | "fr" | "rw";
}

const getTranslations = (lang: string) => {
  const translations: Record<string, any> = {
    en: {
      popularHomes: "Student Houses Available",
      room: "Room",
      apartment: "Apartment",
      nights: "months",
      where: "Location",
      searchDestinations: "Search universities or locations in Rwanda",
      when: "Move-in Date",
      addDates: "Select move-in date",
      who: "Students",
      addGuests: "Number of students",
      helpCenter: "Help Center",
      becomeHost: "List Your House",
      becomeHostDesc:
        "It's easy to list your student house and earn extra income.",
      referHost: "Refer a Host",
      findCoHost: "Find a co-host",
      giftCards: "Gift cards",
      login: "Log in",
      signup: "Sign up",
      selectLocation: "Select Location",
      popularLocations: "Popular University Locations",
      guests: "Students",
      adults: "Students",
      apply: "Apply",
      clear: "Clear",
      checkIn: "Move-in",
      checkOut: "Move-out",
      search: "Search",
      bookNow: "Book Now",
      payWithMomo: "Pay with MOMO",
      bookingDetails: "Booking Details",
      totalPrice: "Total Price",
      favorites: "Saved",
      removeFavorite: "Remove from saved",
      addFavorite: "Add to saved",
      paymentSuccess: "Payment Successful!",
      paymentFailed: "Payment Failed",
      enterMomoNumber: "Enter MOMO Number",
      processingPayment: "Processing Payment...",
      searchProperties: "Search houses...",
      noResults: "No houses found matching your criteria.",
      nightsTotal: "months total",
      all: "All Houses",
      student: "Student Houses",
      apartments: "Apartments",
      single: "Single Rooms",
      shared: "Shared Houses",
      furnished: "Furnished",
      nearcampus: "Near Campus",
      price: "Price",
      perNight: "/ month",
      amenities: "Amenities",
      done: "Done",
      tryAgain: "Try Again",
      yourBookingConfirmed: "Your booking has been confirmed!",
      propertyType: "Property Type",
      location: "in",
      from: "from",
      perNightShort: "/month",
      prev: "Previous",
      next: "Next",
      university: "University",
      district: "District",
      sector: "Sector",
      cell: "Cell",
      village: "Village",
      rooms: "Rooms",
      bathrooms: "Bathrooms",
      viewDetails: "View Details",
      owner: "Owner",
      contact: "Contact",
      bookingStatus: "Status",
      statusAvailable: "Available",
      statusBooked: "Booked",
      statusPending: "Pending",
      province: "Province",
      minutesFromCampus: "Minutes from Campus",
      features: "Features",
      yearBuilt: "Year Built",
      priceRWF: "Price in RWF",
      advancedSearch: "Advanced Search",
      filters: "Filters",
      searchBy: "Search by",
      campus: "Campus",
      districtLabel: "District",
      cellLabel: "Cell",
      villageLabel: "Village",
      minFromCampus: "Minutes from Campus",
      loginRequired: "Login Required",
      loginToOrder: "Please login to order this house",
      orderNow: "Order Now",
      loginNow: "Login",
      registerNow: "Register",
      or: "or",
      houseDetails: "House Details",
      orderHouse: "Order This House",
      priceInRWF: "Price in RWF",
      code: "Village Code",
      aboutProject: "About Inyumba Project",
      ourMission: "Our Mission",
      ourVision: "Our Vision",
      ourExpectations: "Our Expectations",
      whatWeProvide: "What We Provide",
      yearsOfExperience: "Years of Experience",
      happyStudents: "Happy Students",
      partnerUniversities: "Partner Universities",
      propertiesAvailable: "Properties Available",
      learnMore: "Learn More About Inyumba Project",
      ourStory: "Our Story",
      whyChooseUs: "Why Choose Us",
      ourValues: "Our Values",
      testimonials: "What Our Students Say",
      viewAllProperties: "View All Properties",
      filterBy: "Filter by",
      priceRange: "Price Range",
      minPrice: "Min Price",
      maxPrice: "Max Price",
      applyFilters: "Apply Filters",
      resetFilters: "Reset Filters",
      sortBy: "Sort by",
      priceLowHigh: "Price: Low to High",
      priceHighLow: "Price: High to Low",
      ratingHighLow: "Rating: High to Low",
      nearestFirst: "Nearest First",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      phone: "Phone",
      showLess: "Show Less",
      save: "Save",
      saving: "Saving...",
      saveSuccess: "Saved successfully!",
      saveFailed: "Failed to save. Please try again.",
    },
    fr: {
      popularHomes: "Maisons étudiantes disponibles",
      room: "Chambre",
      apartment: "Appartement",
      nights: "mois",
      where: "Emplacement",
      searchDestinations: "Rechercher des universités ou lieux au Rwanda",
      when: "Date d'emménagement",
      addDates: "Sélectionner la date d'emménagement",
      who: "Étudiants",
      addGuests: "Nombre d'étudiants",
      helpCenter: "Centre d'aide",
      becomeHost: "Listez votre maison",
      becomeHostDesc:
        "Il est facile de lister votre maison étudiante et de gagner un revenu supplémentaire.",
      referHost: "Parrainer un hôte",
      findCoHost: "Trouver un co-hôte",
      giftCards: "Cartes cadeaux",
      login: "Se connecter",
      signup: "S'inscrire",
      selectLocation: "Choisir un emplacement",
      popularLocations: "Emplacements universitaires populaires",
      guests: "Étudiants",
      adults: "Étudiants",
      apply: "Appliquer",
      clear: "Effacer",
      checkIn: "Arrivée",
      checkOut: "Départ",
      search: "Rechercher",
      bookNow: "Réserver",
      payWithMomo: "Payer avec MOMO",
      bookingDetails: "Détails de réservation",
      totalPrice: "Prix total",
      favorites: "Favoris",
      removeFavorite: "Retirer des favoris",
      addFavorite: "Ajouter aux favoris",
      paymentSuccess: "Paiement réussi !",
      paymentFailed: "Paiement échoué",
      enterMomoNumber: "Entrez le numéro MOMO",
      processingPayment: "Traitement du paiement...",
      searchProperties: "Rechercher des maisons...",
      noResults: "Aucune maison trouvée correspondant à vos critères.",
      nightsTotal: "mois au total",
      all: "Toutes les maisons",
      student: "Maisons étudiantes",
      apartments: "Appartements",
      single: "Chambres individuelles",
      shared: "Maisons partagées",
      furnished: "Meublé",
      nearcampus: "Près du campus",
      price: "Prix",
      perNight: "/ mois",
      amenities: "Équipements",
      done: "Terminé",
      tryAgain: "Réessayer",
      yourBookingConfirmed: "Votre réservation a été confirmée !",
      propertyType: "Type de propriété",
      location: "à",
      from: "à partir de",
      perNightShort: "/mois",
      prev: "Précédent",
      next: "Suivant",
      university: "Université",
      district: "District",
      sector: "Secteur",
      cell: "Cellule",
      village: "Village",
      rooms: "Chambres",
      bathrooms: "Salles de bain",
      viewDetails: "Voir les détails",
      owner: "Propriétaire",
      contact: "Contact",
      bookingStatus: "Statut",
      statusAvailable: "Disponible",
      statusBooked: "Réservé",
      statusPending: "En attente",
      province: "Province",
      minutesFromCampus: "Minutes du campus",
      features: "Caractéristiques",
      yearBuilt: "Année de construction",
      priceRWF: "Prix en RWF",
      advancedSearch: "Recherche avancée",
      filters: "Filtres",
      searchBy: "Rechercher par",
      campus: "Campus",
      districtLabel: "District",
      cellLabel: "Cellule",
      villageLabel: "Village",
      minFromCampus: "Minutes du campus",
      loginRequired: "Connexion requise",
      loginToOrder: "Veuillez vous connecter pour commander cette maison",
      orderNow: "Commander maintenant",
      loginNow: "Se connecter",
      registerNow: "S'inscrire",
      or: "ou",
      houseDetails: "Détails de la maison",
      orderHouse: "Commander cette maison",
      priceInRWF: "Prix en RWF",
      code: "Code du village",
      aboutProject: "À propos du projet Inyumba",
      ourMission: "Notre mission",
      ourVision: "Notre vision",
      ourExpectations: "Nos attentes",
      whatWeProvide: "Ce que nous offrons",
      yearsOfExperience: "Années d'expérience",
      happyStudents: "Étudiants satisfaits",
      partnerUniversities: "Universités partenaires",
      propertiesAvailable: "Propriétés disponibles",
      learnMore: "En savoir plus sur le projet Inyumba",
      ourStory: "Notre histoire",
      whyChooseUs: "Pourquoi nous choisir",
      ourValues: "Nos valeurs",
      testimonials: "Ce que disent nos étudiants",
      viewAllProperties: "Voir toutes les propriétés",
      filterBy: "Filtrer par",
      priceRange: "Gamme de prix",
      minPrice: "Prix minimum",
      maxPrice: "Prix maximum",
      applyFilters: "Appliquer les filtres",
      resetFilters: "Réinitialiser les filtres",
      sortBy: "Trier par",
      priceLowHigh: "Prix: Croissant",
      priceHighLow: "Prix: Décroissant",
      ratingHighLow: "Note: Décroissante",
      nearestFirst: "Plus proche d'abord",
      email: "E-mail",
      password: "Mot de passe",
      confirmPassword: "Confirmer le mot de passe",
      phone: "Téléphone",
      showLess: "Afficher moins",
      save: "Enregistrer",
      saving: "Enregistrement...",
      saveSuccess: "Enregistré avec succès !",
      saveFailed: "Échec de l'enregistrement. Veuillez réessayer.",
    },
    rw: {
      popularHomes: "Amazu y'abanyeshuri ariboneka",
      room: "Icyumba",
      apartment: "Aparitama",
      nights: "amezi",
      where: "Aho gihe",
      searchDestinations: "Shakisha kaminuza cyangwa aho gihe mu Rwanda",
      when: "Itariki yo kwinjira",
      addDates: "Hitamo itariki yo kwinjira",
      who: "Abanyeshuri",
      addGuests: "Umubare w'abanyeshuri",
      helpCenter: "Ikigo cy'ubufasha",
      becomeHost: "Tangaza inzu yawe",
      becomeHostDesc:
        "Birakoroshye gutangaza inzu yawe kubanyeshuri kandi ukungura.",
      referHost: "Vuga abandi bakire",
      findCoHost: "Shakisha uwakwakira n'uwundi",
      giftCards: "Ikarita z'impano",
      login: "Kwinjira",
      signup: "Kwiyandikisha",
      selectLocation: "Hitamo aho gihe",
      popularLocations: "Aho bakunze kujya mu Rwanda",
      guests: "Abanyeshuri",
      adults: "Abanyeshuri",
      apply: "Kora",
      clear: "Kuraho",
      checkIn: "Kwinjira",
      checkOut: "Kuvamo",
      search: "Shakisha",
      bookNow: "Icyemezo",
      payWithMomo: "Tanga imbaraga MOMO",
      bookingDetails: "Ibanga",
      totalPrice: "Igiciro cyose",
      favorites: "Ibyakiriwe",
      removeFavorite: "Kuraho kubyakiriwe",
      addFavorite: "Ongeraho kubyakiriwe",
      paymentSuccess: "Ubwishyu bwakunze!",
      paymentFailed: "Ubwishyu bwananiranye",
      enterMomoNumber: "Injiza numero ya MOMO",
      processingPayment: "Ubwishyu burakora...",
      searchProperties: "Shakisha amazu...",
      noResults: "Nta mazu yabonetse.",
      nightsTotal: "amezi yose",
      all: "Amazu yose",
      student: "Amazu y'abanyeshuri",
      apartments: "Aparitama",
      single: "Ibyumba byonyine",
      shared: "Amazu asangiwe",
      furnished: "Ifite ibikoresho",
      nearcampus: "Hafi ya kaminuza",
      price: "Igiciro",
      perNight: "/ ukwezi",
      amenities: "Ibikoresho",
      done: "Byakozwe",
      tryAgain: "Ongera ugerageze",
      yourBookingConfirmed: "Icyemezo cyawe cyakiriwe!",
      propertyType: "Ubwoko bw'azu",
      location: "i",
      from: "kuva",
      perNightShort: "/ukwezi",
      prev: "Ibibanziriza",
      next: "Ibikurikira",
      university: "Kaminuza",
      district: "Akarere",
      sector: "Umurenge",
      cell: "Akagari",
      village: "Umudugudu",
      rooms: "Ibyumba",
      bathrooms: "Ahabagirirwa",
      viewDetails: "Reba ibindi",
      owner: "Nyiri nzu",
      contact: "Numero",
      bookingStatus: "Ihagaze",
      statusAvailable: "Irahari",
      statusBooked: "Yakozweho icyemezo",
      statusPending: "Irateganijwe",
      province: "Intara",
      minutesFromCampus: "Iminota uva kuri kaminuza",
      features: "Ibiranga",
      yearBuilt: "Umwaka wubatswe",
      priceRWF: "Igiciro mu Rwanda",
      advancedSearch: "Ubushakashatsi buhanitse",
      filters: "Imyunyu",
      searchBy: "Shakisha ukurikije",
      campus: "Kaminuza",
      districtLabel: "Akarere",
      cellLabel: "Akagari",
      villageLabel: "Umudugudu",
      minFromCampus: "Iminota uva kuri kaminuza",
      loginRequired: "Kwinjira birakenewe",
      loginToOrder: "Nyamuneka winjire mbere yo gutegura iyi nzu",
      orderNow: "Tegura Nono",
      loginNow: "Kwinjira",
      registerNow: "Iyandikisha",
      or: "cyangwa",
      houseDetails: "Ibisobanuro by'azu",
      orderHouse: "Tegura iyi nzu",
      priceInRWF: "Igiciro mu Rwanda",
      code: "Kode y'umudugudu",
      aboutProject: "Kubyerekeye Umushinga Inyumba",
      ourMission: "Intego yacu",
      ourVision: "Icyerekezo cyacu",
      ourExpectations: "Ibyo twiteze",
      whatWeProvide: "Ibyo dutanga",
      yearsOfExperience: "Imyaka y'ubumenyi",
      happyStudents: "Abanyeshuri bishimye",
      partnerUniversities: "Kaminuza zikorana natwe",
      propertiesAvailable: "Amazu ariboneka",
      learnMore: "Menya byinshi kuri Umushinga Inyumba",
      ourStory: "Amateka yacu",
      whyChooseUs: "Kuki utuhitamo",
      ourValues: "Indangagaciro zacu",
      testimonials: "Ibyo abanyeshuri bacu bavuga",
      viewAllProperties: "Reba amazu yose",
      filterBy: "Tungura ukurikije",
      priceRange: "Igiciro kiri hagati",
      minPrice: "Igiciro gito",
      maxPrice: "Igiciro kinini",
      applyFilters: "Kora iyo myunyu",
      resetFilters: "Kuraho iyo myunyu",
      sortBy: "Tondeka ukurikije",
      priceLowHigh: "Igiciro: Gito kuri kinini",
      priceHighLow: "Igiciro: Kinini kuri gito",
      ratingHighLow: "Amanota: Hejuru kuri hasi",
      nearestFirst: "Buri hafi mbere",
      email: "Imeli",
      password: "Ijambo ryibanga",
      confirmPassword: "Emeza ijambo ryibanga",
      phone: "Telefone",
      showLess: "Garuka",
      save: "Bika",
      saving: "Birabikwa...",
      saveSuccess: "Byabitswe neza!",
      saveFailed: "Ntabwo byabitswe. Ongera ugerageze.",
    },
  };
  return translations[lang as keyof typeof translations] || translations.en;
};

const InyumbaLogo = ({ className = "h-12 w-12" }: { className?: string }) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 500 560"
    className={className}
    whileHover={{
      rotate: [-2, 2, -2, 2, 0],
      transition: { duration: 0.45 },
    }}
  >
    {/* ================= OUTER RINGS ================= */}

    <path
      d="M90 120 A180 180 0 0 0 90 430"
      fill="none"
      stroke="#36B25A"
      strokeWidth="7"
      strokeLinecap="round"
    />

    <path
      d="M410 120 A180 180 0 0 1 410 430"
      fill="none"
      stroke="#36B25A"
      strokeWidth="7"
      strokeLinecap="round"
    />

    <path
      d="M105 135 A165 165 0 0 0 105 415"
      fill="none"
      stroke="#1B4E91"
      strokeWidth="5"
      strokeLinecap="round"
    />

    <path
      d="M395 135 A165 165 0 0 1 395 415"
      fill="none"
      stroke="#1B4E91"
      strokeWidth="5"
      strokeLinecap="round"
    />

    <path
      d="M165 475 A120 120 0 0 0 335 475"
      fill="none"
      stroke="#36B25A"
      strokeWidth="7"
      strokeLinecap="round"
    />

    <path
      d="M180 462 A104 104 0 0 0 320 462"
      fill="none"
      stroke="#1B4E91"
      strokeWidth="5"
      strokeLinecap="round"
    />

    {/* ================= COMPASS ================= */}

    <g transform="translate(250 95)">
      <text
        x="0"
        y="-18"
        fontSize="34"
        fontWeight="800"
        textAnchor="middle"
        fill="#1B4E91"
      >
        N
      </text>

      <circle r="58" fill="none" stroke="#1B4E91" strokeWidth="7" />

      <polygon points="0,-58 10,-10 0,-22 -10,-10" fill="#1B4E91" />

      <polygon points="0,58 10,10 0,22 -10,10" fill="#1B4E91" />

      <polygon points="-58,0 -10,-10 -22,0 -10,10" fill="#1B4E91" />

      <polygon points="58,0 10,-10 22,0 10,10" fill="#1B4E91" />

      <polygon points="-40,-40 -8,-12 -12,-8" fill="#1B4E91" />

      <polygon points="40,-40 8,-12 12,-8" fill="#1B4E91" />

      <polygon points="-40,40 -8,12 -12,8" fill="#1B4E91" />

      <polygon points="40,40 8,12 12,8" fill="#1B4E91" />
    </g>

    {/* ================= HOUSE ================= */}

    <g>
      <path
        d="M150 215 L250 135 L350 215"
        fill="none"
        stroke="#36B25A"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <rect x="188" y="215" width="124" height="90" rx="3" fill="#36B25A" />

      <rect x="305" y="175" width="18" height="55" fill="#36B25A" />
    </g>

    {/* ================= LOCATION PIN ================= */}

    <motion.g
      animate={{
        scale: [1, 1.08, 1],
      }}
      transition={{
        repeat: Infinity,
        duration: 2,
      }}
      transform="translate(250 252)"
    >
      <path
        d="M0-32
           C-23-32 -38-15 -38 8
           C-38 38 0 72 0 72
           C0 72 38 38 38 8
           C38-15 23-32 0-32"
        fill="#1B4E91"
      />

      <circle r="13" cy="-3" fill="white" />
    </motion.g>

    {/* ================= OPEN BOOK ================= */}

    <g transform="translate(250 320)">
      <path
        d="M0 0
           C-28 -16 -82 -18 -132 -4
           C-120 10 -120 26 -132 40
           C-82 20 -30 22 0 42"
        fill="#1B4E91"
      />

      <path
        d="M0 0
           C28 -16 82 -18 132 -4
           C120 10 120 26 132 40
           C82 20 30 22 0 42"
        fill="#1B4E91"
      />

      <path
        d="M0 14
           C-28 -2 -78 -4 -120 8"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />

      <path
        d="M0 14
           C28 -2 78 -4 120 8"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
    </g>

    {/* ================= TEXT ================= */}

    <text
      x="250"
      y="430"
      textAnchor="middle"
      fontSize="60"
      fontWeight="900"
      fill="#1B4E91"
      letterSpacing="2"
      style={{
        fontFamily: "Poppins, Montserrat, Arial, sans-serif",
      }}
    >
      INYUMBA
    </text>

    <text
      x="250"
      y="462"
      textAnchor="middle"
      fontSize="20"
      fontWeight="700"
      fill="#36B25A"
      style={{
        fontFamily: "Poppins, Arial, sans-serif",
      }}
    >
      STUDENT ACCOMMODATION
    </text>

    <text
      x="250"
      y="530"
      textAnchor="middle"
      fontSize="24"
      fontWeight="800"
      letterSpacing="5"
      fill="#1B4E91"
      style={{
        fontFamily: "Poppins, Arial, sans-serif",
      }}
    >
      RWANDA
    </text>
  </motion.svg>
);

// ============================================================
// 3. MAIN COMPONENT
// ============================================================

export const Hero: React.FC<HeroProps> = ({ onSearch, language = "en" }) => {
  const t = getTranslations(language);

  const categories = [
    {
      id: "all",
      name: t.all || "All Houses",
      icon: <HomeIcon />,
      color: "from-[#FF385C] to-pink-400",
    },
    {
      id: "student",
      name: t.student || "Student Houses",
      icon: <SchoolIcon />,
      color: "from-blue-400 to-cyan-500",
    },
    {
      id: "apartments",
      name: t.apartments || "Apartments",
      icon: <ApartmentIcon />,
      color: "from-green-400 to-emerald-500",
    },
    {
      id: "single",
      name: t.single || "Single Rooms",
      icon: <BedIcon />,
      color: "from-orange-400 to-red-500",
    },
    {
      id: "shared",
      name: t.shared || "Shared Houses",
      icon: <PeopleAltIcon />,
      color: "from-purple-400 to-pink-500",
    },
    {
      id: "furnished",
      name: t.furnished || "Furnished",
      icon: <HotelIcon />,
      color: "from-yellow-400 to-amber-500",
    },
    {
      id: "nearcampus",
      name: t.nearcampus || "Near Campus",
      icon: <LocationCityIcon />,
      color: "from-teal-400 to-cyan-500",
    },
  ];

  // ===== State =====
  const [searchLocation, setSearchLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedCell, setSelectedCell] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [maxMinutesFromCampus, setMaxMinutesFromCampus] = useState<number>(30);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [filteredHouses, setFilteredHouses] =
    useState<StudentHouse[]>(studentHousesData);

  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(200000);
  const [sortOption, setSortOption] = useState<string>("");

  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [tempCheckIn, setTempCheckIn] = useState<Date | null>(null);
  const [tempCheckOut, setTempCheckOut] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const [studentCount, setStudentCount] = useState(2);

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [isLoginRequiredModalOpen, setIsLoginRequiredModalOpen] = useState(false);

  const [selectedHouse, setSelectedHouse] = useState<StudentHouse | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // ===== Effects =====
  useEffect(() => {
    const filterHouses = () => {
      let filtered = [...studentHousesData];

      if (selectedCategory !== "all") {
        filtered = filtered.filter((h) => h.category === selectedCategory);
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        filtered = filtered.filter(
          (h) =>
            h.name.toLowerCase().includes(query) ||
            h.type.toLowerCase().includes(query) ||
            h.description?.toLowerCase().includes(query) ||
            h.university.toLowerCase().includes(query) ||
            h.district.toLowerCase().includes(query) ||
            h.sector.toLowerCase().includes(query) ||
            h.cell.toLowerCase().includes(query) ||
            h.village.toLowerCase().includes(query) ||
            h.province.toLowerCase().includes(query) ||
            h.code_vil_1?.includes(query),
        );
      }

      if (searchLocation) {
        const location = searchLocation.toLowerCase().trim();
        filtered = filtered.filter(
          (h) =>
            h.university.toLowerCase().includes(location) ||
            h.district.toLowerCase().includes(location) ||
            h.sector.toLowerCase().includes(location) ||
            h.cell.toLowerCase().includes(location) ||
            h.village.toLowerCase().includes(location) ||
            h.name.toLowerCase().includes(location) ||
            h.province.toLowerCase().includes(location) ||
            h.code_vil_1?.includes(location),
        );
      }

      if (selectedUniversity) {
        filtered = filtered.filter((h) => h.university === selectedUniversity);
      }

      if (selectedDistrict) {
        filtered = filtered.filter((h) => h.district === selectedDistrict);
      }

      if (selectedSector) {
        filtered = filtered.filter((h) => h.sector === selectedSector);
      }

      if (selectedCell) {
        filtered = filtered.filter((h) => h.cell === selectedCell);
      }

      if (selectedVillage) {
        filtered = filtered.filter((h) => h.village === selectedVillage);
      }

      if (maxMinutesFromCampus) {
        filtered = filtered.filter(
          (h) => h.minutesFromCampus <= maxMinutesFromCampus,
        );
      }

      if (minPrice > 0) {
        filtered = filtered.filter((h) => h.priceRWF >= minPrice);
      }
      if (maxPrice < 200000) {
        filtered = filtered.filter((h) => h.priceRWF <= maxPrice);
      }

      if (sortOption === "priceLowHigh") {
        filtered.sort((a, b) => a.priceRWF - b.priceRWF);
      } else if (sortOption === "priceHighLow") {
        filtered.sort((a, b) => b.priceRWF - a.priceRWF);
      } else if (sortOption === "ratingHighLow") {
        filtered.sort((a, b) => b.rating - a.rating);
      } else if (sortOption === "nearestFirst") {
        filtered.sort((a, b) => a.minutesFromCampus - b.minutesFromCampus);
      }

      setFilteredHouses(filtered);
      setCurrentPage(1);
    };

    filterHouses();
  }, [
    selectedCategory,
    searchQuery,
    searchLocation,
    selectedUniversity,
    selectedDistrict,
    selectedSector,
    selectedCell,
    selectedVillage,
    maxMinutesFromCampus,
    minPrice,
    maxPrice,
    sortOption,
  ]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (isPropertyModalOpen || isLoginRequiredModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPropertyModalOpen, isLoginRequiredModalOpen]);

  // ===== API Call Function =====
  const saveOrderToAPI = async (orderData: any) => {
    try {
      const response = await fetch("https://your-api-endpoint.com/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error saving order:", error);
      throw error;
    }
  };

  // ===== Handlers =====
  const totalPages = Math.ceil(filteredHouses.length / itemsPerPage);
  const paginatedHouses = filteredHouses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const today = new Date();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = date.toDateString() === today.toDateString();
      const isCheckIn =
        tempCheckIn && date.toDateString() === tempCheckIn.toDateString();
      const isCheckOut =
        tempCheckOut && date.toDateString() === tempCheckOut.toDateString();
      const isInRange =
        tempCheckIn &&
        tempCheckOut &&
        date > tempCheckIn &&
        date < tempCheckOut;
      const isPast =
        date < today && date.toDateString() !== today.toDateString();

      days.push(
        <motion.button
          key={day}
          whileHover={{ scale: isPast ? 1 : 1.05 }}
          whileTap={{ scale: isPast ? 1 : 0.95 }}
          onClick={() => handleDateSelect(date)}
          disabled={isPast}
          className={`h-10 w-full rounded-full text-sm font-medium transition-colors relative ${
            isPast
              ? "text-gray-300 cursor-not-allowed"
              : isCheckIn || isCheckOut
                ? "bg-[#FF385C] text-white"
                : isInRange
                  ? "bg-[#FF385C]/20 text-gray-900"
                  : isToday
                    ? "border-2 border-[#FF385C] text-gray-900"
                    : "text-gray-700"
          }`}
        >
          {day}
          {isToday && !isCheckIn && !isCheckOut && (
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#FF385C] rounded-full"></span>
          )}
        </motion.button>,
      );
    }

    return days;
  };

  const handleDateSelect = (date: Date) => {
    if (!tempCheckIn || (tempCheckIn && tempCheckOut)) {
      setTempCheckIn(date);
      setTempCheckOut(null);
    } else if (tempCheckIn && !tempCheckOut) {
      if (date < tempCheckIn) {
        setTempCheckOut(tempCheckIn);
        setTempCheckIn(date);
      } else {
        setTempCheckOut(date);
      }
    }
  };

  const applyDates = () => {
    setCheckIn(tempCheckIn);
    setCheckOut(tempCheckOut);
    setIsDatePickerOpen(false);
    if (tempCheckIn && tempCheckOut) {
      toast.success(
        `📅 ${tempCheckIn.toLocaleDateString()} - ${tempCheckOut.toLocaleDateString()}`,
      );
    }
  };

  const clearDates = () => {
    setTempCheckIn(null);
    setTempCheckOut(null);
    setCheckIn(null);
    setCheckOut(null);
    setIsDatePickerOpen(false);
  };

  const changeMonth = (delta: number) => {
    const newMonth = currentMonth + delta;
    if (newMonth < 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else if (newMonth > 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(newMonth);
    }
  };

  const handleSearch = () => {
    const searchParams = {
      location: searchLocation,
      checkIn,
      checkOut,
      students: studentCount,
      category: selectedCategory,
      query: searchQuery,
      university: selectedUniversity,
      district: selectedDistrict,
      sector: selectedSector,
      cell: selectedCell,
      village: selectedVillage,
      maxMinutes: maxMinutesFromCampus,
      minPrice,
      maxPrice,
      sort: sortOption,
    };

    if (onSearch) {
      onSearch(searchParams);
    }

    toast.info(
      `🔍 ${t.search}: ${searchLocation || selectedUniversity || "All universities in Rwanda"}`,
    );
    setIsLocationModalOpen(false);
    setIsDatePickerOpen(false);
    setIsGuestModalOpen(false);
    setIsAdvancedSearchOpen(false);
  };

  const clearAllFilters = () => {
    setSearchLocation("");
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedUniversity("");
    setSelectedDistrict("");
    setSelectedSector("");
    setSelectedCell("");
    setSelectedVillage("");
    setMaxMinutesFromCampus(30);
    setCheckIn(null);
    setCheckOut(null);
    setStudentCount(2);
    setMinPrice(0);
    setMaxPrice(200000);
    setSortOption("");
    toast.info("🧹 All filters cleared");
  };

  const getStudentCount = () => {
    return `${studentCount} ${studentCount !== 1 ? t.guests.toLowerCase() : t.guests.slice(0, -1)}`;
  };

  const getDateRange = () => {
    if (checkIn && checkOut) {
      return `${checkIn.toLocaleDateString()} - ${checkOut.toLocaleDateString()}`;
    }
    return t.addDates;
  };

  const toggleFavorite = (houseId: number) => {
    setFavorites((prev) => {
      if (prev.includes(houseId)) {
        toast.info(`💔 ${t.removeFavorite}`);
        return prev.filter((id) => id !== houseId);
      } else {
        toast.success(`❤️ ${t.addFavorite}`);
        return [...prev, houseId];
      }
    });
  };

  const openHouseModal = (house: StudentHouse) => {
    setSelectedHouse(house);
    setIsPropertyModalOpen(true);
  };

  const closeHouseModal = () => {
    setIsPropertyModalOpen(false);
    setSelectedHouse(null);
  };

  const handleOrderClick = () => {
    setIsLoginRequiredModalOpen(true);
  };

  const handleSaveOrder = async () => {
    if (!selectedHouse) return;

    setIsSaving(true);
    try {
      const orderData = {
        houseId: selectedHouse.id,
        houseName: selectedHouse.name,
        priceRWF: selectedHouse.priceRWF,
        nights: selectedHouse.nights,
        totalPrice: selectedHouse.priceRWF * selectedHouse.nights,
        university: selectedHouse.university,
        district: selectedHouse.district,
        sector: selectedHouse.sector,
        cell: selectedHouse.cell,
        village: selectedHouse.village,
        checkIn: checkIn ? checkIn.toISOString() : null,
        checkOut: checkOut ? checkOut.toISOString() : null,
        students: studentCount,
        timestamp: new Date().toISOString(),
      };

      const response = await saveOrderToAPI(orderData);
      toast.success(`✅ ${t.saveSuccess}`);
      console.log("Order saved successfully:", response);
      setIsLoginRequiredModalOpen(false);
      closeHouseModal();
    } catch (error) {
      toast.error(`❌ ${t.saveFailed}`);
      console.error("Save error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const getTranslatedType = (type: string) => {
    if (type === "Room") return t.room;
    if (type === "Apartment") return t.apartment;
    if (type === "House") return t.student;
    return type;
  };

  const getLocationInfo = (house: StudentHouse) => {
    let location = `${house.village}, ${house.cell}, ${house.sector}, ${house.district} (${house.province})`;
    if (house.code_vil_1) {
      location += ` • Code: ${house.code_vil_1}`;
    }
    return location;
  };

  const getUniversityColor = (university: string) => {
    const colors: { [key: string]: string } = {
      "UR - CST (Science & Tech)": "bg-blue-100 text-blue-800",
      "UR - CBE (Business & Econ)": "bg-yellow-100 text-yellow-800",
      "UR - CMHS (Health Sciences)": "bg-red-100 text-red-800",
      "IPRC Kigali": "bg-orange-100 text-orange-800",
      "University of Kigali (UoK)": "bg-cyan-100 text-cyan-800",
      "Kigali Independent Univ. (ULK)": "bg-amber-100 text-amber-800",
      "Adventist Univ. (AUCA)": "bg-lime-100 text-lime-800",
      "Carnegie Mellon (CMU-Africa)": "bg-cyan-100 text-cyan-800",
      "African Leadership Univ. (ALU)": "bg-indigo-100 text-indigo-800",
      "JKUAT - Rwanda Campus": "bg-blue-100 text-blue-800",
      "Mount Kigali University": "bg-purple-100 text-purple-800",
      "UR - Huye Campus": "bg-purple-100 text-purple-800",
      "IPRC Huye": "bg-pink-100 text-pink-800",
      "Catholic Institute (ICK)": "bg-rose-100 text-rose-800",
      "University of Gitwe": "bg-emerald-100 text-emerald-800",
      "Catholic University of Rwanda": "bg-rose-100 text-rose-800",
      "ILPD (Law Institute)": "bg-amber-100 text-amber-800",
      "UR - CAVM (Agriculture)": "bg-green-100 text-green-800",
      "IPRC Musanze": "bg-orange-100 text-orange-800",
      "INES-Ruhengeri": "bg-blue-100 text-blue-800",
      "Univ. of Global Health Equity": "bg-sky-100 text-sky-800",
      "Univ. of Tech & Arts (UTAB)": "bg-violet-100 text-violet-800",
      "IPRC Tumba": "bg-fuchsia-100 text-fuchsia-800",
      "UR - CE (Education)": "bg-indigo-100 text-indigo-800",
      "UR - Nyagatare Campus": "bg-teal-100 text-teal-800",
      "IPRC Ngoma": "bg-rose-100 text-rose-800",
      "RICA (Conservation Agric.)": "bg-lime-100 text-lime-800",
      "Rwanda Military Academy": "bg-stone-100 text-stone-800",
      "IPRC Karongi": "bg-rose-100 text-rose-800",
      "IPRC Rusizi": "bg-teal-100 text-teal-800",
      "UTB (Tourism & Business)": "bg-slate-100 text-slate-800",
      "Kibogora Polytechnic": "bg-emerald-100 text-emerald-800",
    };
    return colors[university] || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "booked":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return t.statusAvailable;
      case "booked":
        return t.statusBooked;
      case "pending":
        return t.statusPending;
      default:
        return status;
    }
  };

  const uniqueUniversities = [
    ...new Set(studentHousesData.map((h) => h.university)),
  ];
  const uniqueDistricts = [
    ...new Set(studentHousesData.map((h) => h.district)),
  ];
  const uniqueSectors = [...new Set(studentHousesData.map((h) => h.sector))];
  const uniqueCells = [...new Set(studentHousesData.map((h) => h.cell))];
  const uniqueVillages = [...new Set(studentHousesData.map((h) => h.village))];

  return (
    <div className="w-full">
      {/* ===== PROJECT HEADER WITH PERMANENT ABOUT SECTION - WHITE BACKGROUND ===== */}
      <div className="bg-white py-8 md:py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <InyumbaLogo className="h-12 w-12 sm:h-12 sm:w-12" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                INYUMBA
              </h1>
            </div>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              {language === "rw"
                ? "GUKORA URUBUGA ABANYESHURI BA KAMINUZA BAZAJYA BAJYAHO BAKABONA AMAZU YO GUKONDESHA KUBURYO BUBOREHEYE"
                : language === "fr"
                  ? "Location de maisons pour étudiants près des universités au Rwanda"
                  : "Student housing rental platform near universities in Rwanda"}
            </p>
          </div>

          {/* ===== PERMANENT ABOUT SECTION - WHITE BACKGROUND WITH ATTRACTIVE DESIGN ===== */}
          <div className="mt-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5 text-center border border-blue-200 hover:shadow-lg transition-shadow duration-300">
                <div className="text-3xl font-bold text-blue-600">5+</div>
                <div className="text-sm text-gray-600 font-medium mt-1">
                  {t.yearsOfExperience}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">Since 2021</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 text-center border border-green-200 hover:shadow-lg transition-shadow duration-300">
                <div className="text-3xl font-bold text-green-600">500+</div>
                <div className="text-sm text-gray-600 font-medium mt-1">
                  {t.happyStudents}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  Across Rwanda
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-5 text-center border border-purple-200 hover:shadow-lg transition-shadow duration-300">
                <div className="text-3xl font-bold text-purple-600">31+</div>
                <div className="text-sm text-gray-600 font-medium mt-1">
                  {t.partnerUniversities}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">Nationwide</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-5 text-center border border-orange-200 hover:shadow-lg transition-shadow duration-300">
                <div className="text-3xl font-bold text-orange-600">28+</div>
                <div className="text-sm text-gray-600 font-medium mt-1">
                  {t.propertiesAvailable}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">And growing</div>
              </div>
            </div>

            {/* Mission, Vision, Expectations - 3 Column Grid with Icons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200 hover:shadow-lg transition-shadow duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-500/30 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">
                      {t.ourMission}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {language === "rw"
                        ? "Intego yacu ni uguhuza abanyeshuri n'amazu meza, ari hafi ya kaminuza, ku giciro gito."
                        : language === "fr"
                          ? "Notre mission est de mettre en relation les étudiants avec des logements de qualité, proches des universités, à des prix abordables."
                          : "Our mission is to connect students with quality housing, close to universities, at affordable prices."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-shadow duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">👁️</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">
                      {t.ourVision}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {language === "rw"
                        ? "Icyerekezo cyacu ni ukugira urubuga rw'amazu y'abanyeshuri ruzwi cyane mu Rwanda."
                        : language === "fr"
                          ? "Notre vision est de devenir la plateforme de référence pour le logement étudiant au Rwanda."
                          : "Our vision is to become the leading student housing platform in Rwanda."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200 hover:shadow-lg transition-shadow duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">
                      {t.ourExpectations}
                    </h4>
                    <ul className="text-sm text-gray-600 leading-relaxed list-disc list-inside space-y-1">
                      {language === "rw" ? (
                        <>
                          <li>Gutanga amazu meza kubanyeshuri bose</li>
                          <li>Urubuga rworoheje rwo gushakisha</li>
                          <li>Gukoresha ikoranabuhanga riheza</li>
                        </>
                      ) : language === "fr" ? (
                        <>
                          <li>Fournir des logements de qualité</li>
                          <li>Plateforme facile à utiliser</li>
                          <li>Technologie moderne</li>
                        </>
                      ) : (
                        <>
                          <li>Provide quality housing to all students</li>
                          <li>Easy-to-use platform for searching</li>
                          <li>Use modern technology</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* What We Provide & Values - 2 Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                    <span className="text-lg">🎁</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800">
                    {t.whatWeProvide}
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/70 rounded-xl p-3 text-center">
                    <div className="text-2xl">🏠</div>
                    <div className="text-xs font-medium text-gray-700 mt-1">
                      Student Houses
                    </div>
                  </div>
                  <div className="bg-white/70 rounded-xl p-3 text-center">
                    <div className="text-2xl">📱</div>
                    <div className="text-xs font-medium text-gray-700 mt-1">
                      Easy Search
                    </div>
                  </div>
                  <div className="bg-white/70 rounded-xl p-3 text-center">
                    <div className="text-2xl">💰</div>
                    <div className="text-xs font-medium text-gray-700 mt-1">
                      Fair Prices
                    </div>
                  </div>
                  <div className="bg-white/70 rounded-xl p-3 text-center">
                    <div className="text-2xl">🤝</div>
                    <div className="text-xs font-medium text-gray-700 mt-1">
                      Support
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 border border-pink-200 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/30">
                    <span className="text-lg">💎</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800">
                    {t.ourValues}
                  </h4>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/70 rounded-xl p-4 text-center">
                    <div className="text-3xl">💎</div>
                    <div className="text-xs font-semibold text-gray-700 mt-1">
                      Quality
                    </div>
                    <div className="text-[10px] text-gray-500">Excellence</div>
                  </div>
                  <div className="bg-white/70 rounded-xl p-4 text-center">
                    <div className="text-3xl">🤝</div>
                    <div className="text-xs font-semibold text-gray-700 mt-1">
                      Respect
                    </div>
                    <div className="text-[10px] text-gray-500">Integrity</div>
                  </div>
                  <div className="bg-white/70 rounded-xl p-4 text-center">
                    <div className="text-3xl">🚀</div>
                    <div className="text-xs font-semibold text-gray-700 mt-1">
                      Innovation
                    </div>
                    <div className="text-[10px] text-gray-500">Growth</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ===== SEARCH BAR ===== */}
      <div className="relative z-20 -mt-6 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl p-4 md:p-5"
          >
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => setIsLocationModalOpen(true)}
                  className="w-full text-left p-2 sm:p-3 rounded-xl transition-colors hover:bg-gray-50"
                >
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.where}
                  </div>
                  <div className="text-sm sm:text-base text-gray-700 truncate">
                    <SchoolIcon className="w-4 h-4 inline mr-1 text-[#FF385C]" />
                    {searchLocation ||
                      selectedUniversity ||
                      "Any university in Rwanda"}
                  </div>
                </button>
              </div>

              <div className="flex-1 min-w-0">
                <button
                  onClick={() => setIsDatePickerOpen(true)}
                  className="w-full text-left p-2 sm:p-3 rounded-xl transition-colors hover:bg-gray-50"
                >
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.when}
                  </div>
                  <div className="text-sm sm:text-base text-gray-700 truncate">
                    {getDateRange()}
                  </div>
                </button>
              </div>

              <div className="flex-1 min-w-0">
                <button
                  onClick={() => setIsGuestModalOpen(true)}
                  className="w-full text-left p-2 sm:p-3 rounded-xl transition-colors hover:bg-gray-50"
                >
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.who}
                  </div>
                  <div className="text-sm sm:text-base text-gray-700 truncate">
                    <PeopleAltIcon className="w-4 h-4 inline mr-1 text-[#FF385C]" />
                    {getStudentCount()}
                  </div>
                </button>
              </div>

              <div className="sm:self-center flex gap-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSearch}
                  className="bg-[#FF385C] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#E31C5F] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#FF385C]/30 text-sm"
                >
                  <SearchIcon className="w-4 h-4" />
                  <span>{t.search}</span>
                </motion.button>
                <button
                  onClick={() => setIsAdvancedSearchOpen(!isAdvancedSearchOpen)}
                  className="bg-gray-100 text-gray-700 px-3 py-2.5 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <FilterListIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {isAdvancedSearchOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-gray-200 mt-3 pt-3 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.university}
                      </label>
                      <select
                        value={selectedUniversity}
                        onChange={(e) => setSelectedUniversity(e.target.value)}
                        className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] bg-white"
                      >
                        <option value="">All Universities</option>
                        {uniqueUniversities.map((uni) => (
                          <option key={uni} value={uni}>
                            {uni}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.district}
                      </label>
                      <select
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] bg-white"
                      >
                        <option value="">All Districts</option>
                        {uniqueDistricts.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.sector}
                      </label>
                      <select
                        value={selectedSector}
                        onChange={(e) => setSelectedSector(e.target.value)}
                        className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] bg-white"
                      >
                        <option value="">All Sectors</option>
                        {uniqueSectors.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.cell}
                      </label>
                      <select
                        value={selectedCell}
                        onChange={(e) => setSelectedCell(e.target.value)}
                        className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] bg-white"
                      >
                        <option value="">All Cells</option>
                        {uniqueCells.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.village}
                      </label>
                      <select
                        value={selectedVillage}
                        onChange={(e) => setSelectedVillage(e.target.value)}
                        className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] bg-white"
                      >
                        <option value="">All Villages</option>
                        {uniqueVillages.map((v) => (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.minutesFromCampus}
                      </label>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="range"
                          min="0"
                          max="60"
                          value={maxMinutesFromCampus}
                          onChange={(e) =>
                            setMaxMinutesFromCampus(parseInt(e.target.value))
                          }
                          className="flex-1 accent-[#FF385C]"
                        />
                        <span className="text-sm font-medium text-gray-700 min-w-[30px]">
                          {maxMinutesFromCampus}m
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.priceRange}
                      </label>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="number"
                          value={minPrice}
                          onChange={(e) => setMinPrice(Number(e.target.value))}
                          placeholder={t.minPrice}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C]"
                        />
                        <span className="text-gray-400">-</span>
                        <input
                          type="number"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(Number(e.target.value))}
                          placeholder={t.maxPrice}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-500">
                        {t.sortBy}
                      </label>
                      <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] bg-white"
                      >
                        <option value="">Default</option>
                        <option value="priceLowHigh">{t.priceLowHigh}</option>
                        <option value="priceHighLow">{t.priceHighLow}</option>
                        <option value="ratingHighLow">{t.ratingHighLow}</option>
                        <option value="nearestFirst">{t.nearestFirst}</option>
                      </select>
                    </div>

                    <div className="flex items-end">
                      <button
                        onClick={clearAllFilters}
                        className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
                      >
                        <ClearIcon className="w-4 h-4" />
                        {t.resetFilters}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* ===== CATEGORIES ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                selectedCategory === category.id
                  ? "border-b-2 border-[#FF385C] text-[#FF385C]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <div
                  className={`w-6 h-6 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center text-white`}
                >
                  {React.cloneElement(category.icon, {
                    className: "w-3.5 h-3.5",
                  })}
                </div>
              </div>
              <span className="text-xs font-medium whitespace-nowrap">
                {category.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ===== SEARCH INPUT ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="relative max-w-sm">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={t.searchProperties}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C] focus:ring-1 focus:ring-[#FF385C] placeholder-gray-400"
          />
        </div>
      </div>

      {/* ===== HOUSES GRID ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {filteredHouses.length} {t.popularHomes}
            </h2>
            {selectedUniversity && (
              <p className="text-sm text-gray-500 mt-1">
                <SchoolIcon className="w-4 h-4 inline mr-1" />
                {selectedUniversity}
              </p>
            )}
            {selectedDistrict && (
              <p className="text-sm text-gray-500 mt-1">
                <LocationCityIcon className="w-4 h-4 inline mr-1" />
                {selectedDistrict}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              <BookmarkIcon className="w-4 h-4 inline mr-1" />
              {favorites.length} {t.favorites}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {paginatedHouses.map((house) => (
            <motion.div
              key={house.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="group cursor-pointer"
              onClick={() => openHouseModal(house)}
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={house.image}
                    alt={house.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(house.id);
                      }}
                      className="bg-white rounded-full p-1.5 shadow-lg hover:scale-110 transition-transform"
                    >
                      {favorites.includes(house.id) ? (
                        <FavoriteIcon className="w-4 h-4 text-[#FF385C]" />
                      ) : (
                        <FavoriteBorderIcon className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-0.5 rounded text-xs">
                    {getTranslatedType(house.type)}
                  </div>
                  <div className="absolute top-2 left-2">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${getUniversityColor(house.university)}`}
                    >
                      {house.university}
                    </span>
                  </div>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(house.bookingStatus)}`}
                    >
                      {getStatusText(house.bookingStatus)}
                    </span>
                  </div>
                  {house.code_vil_1 && (
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-0.5 rounded text-[10px]">
                      Code: {house.code_vil_1}
                    </div>
                  )}
                  <div className="absolute bottom-2 left-20 bg-black/70 text-white px-2 py-0.5 rounded text-xs">
                    {house.minutesFromCampus}m from campus
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-sm sm:text-base text-gray-900 truncate">
                        {house.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">
                        <LocationOnIcon className="w-3 h-3 inline mr-0.5" />
                        {house.village}, {house.sector}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">
                          {house.rooms} {t.rooms}
                        </span>
                        <span className="text-xs text-gray-300">•</span>
                        <span className="text-xs text-gray-500">
                          {house.bathrooms} {t.bathrooms}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end flex-shrink-0 ml-2">
                      <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                        <StarIcon className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                        {house.rating}
                      </div>
                      <p className="text-xs font-semibold text-[#FF385C]">
                        {house.priceRWF.toLocaleString()} RWF
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-center gap-2 mt-10"
          >
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
              }`}
            >
              <ArrowBackIcon className="w-4 h-4" />
              {t.prev}
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => {
                  if (
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - currentPage) <= 1 ||
                    (page === 2 && currentPage > 3) ||
                    (page === totalPages - 1 && currentPage < totalPages - 2)
                  ) {
                    return (
                      <motion.button
                        key={page}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => goToPage(page)}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                          currentPage === page
                            ? "bg-[#FF385C] text-white shadow-lg shadow-[#FF385C]/30"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {page}
                      </motion.button>
                    );
                  }
                  if (page === 2 && currentPage > 3) {
                    return (
                      <span
                        key="ellipsis-start"
                        className="w-9 h-9 flex items-center justify-center text-gray-400"
                      >
                        …
                      </span>
                    );
                  }
                  if (page === totalPages - 1 && currentPage < totalPages - 2) {
                    return (
                      <span
                        key="ellipsis-end"
                        className="w-9 h-9 flex items-center justify-center text-gray-400"
                      >
                        …
                      </span>
                    );
                  }
                  return null;
                },
              )}
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
              }`}
            >
              {t.next}
              <ArrowForwardIcon className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {filteredHouses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">{t.noResults}</p>
          </div>
        )}
      </div>

      {/* ============================================================
          PROPERTY DETAIL MODAL
          ============================================================ */}
      <AnimatePresence>
        {isPropertyModalOpen && selectedHouse && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[300]"
              onClick={closeHouseModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-4 z-[301] flex items-center justify-center"
            >
              <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
                <div className="relative">
                  <img
                    src={selectedHouse.image}
                    alt={selectedHouse.name}
                    className="w-full h-56 md:h-64 object-cover"
                  />
                  <button
                    onClick={closeHouseModal}
                    className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                  >
                    <CloseIcon className="w-5 h-5 text-gray-800" />
                  </button>
                  <button
                    onClick={() => toggleFavorite(selectedHouse.id)}
                    className="absolute top-3 right-14 bg-white/90 p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                  >
                    {favorites.includes(selectedHouse.id) ? (
                      <FavoriteIcon className="w-5 h-5 text-[#FF385C]" />
                    ) : (
                      <FavoriteBorderIcon className="w-5 h-5 text-gray-800" />
                    )}
                  </button>
                  <div className="absolute bottom-3 left-3">
                    <span
                      className={`px-3 py-1 rounded text-xs font-medium ${getUniversityColor(selectedHouse.university)}`}
                    >
                      <SchoolIcon className="w-4 h-4 inline mr-1" />
                      {selectedHouse.university}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span
                      className={`px-3 py-1 rounded text-xs font-medium ${getStatusColor(selectedHouse.bookingStatus)}`}
                    >
                      {getStatusText(selectedHouse.bookingStatus)}
                    </span>
                  </div>
                  {selectedHouse.code_vil_1 && (
                    <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1 rounded text-xs">
                      📍 Code: {selectedHouse.code_vil_1}
                    </div>
                  )}
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-280px)]">
                  <div className="flex flex-col md:flex-row items-start justify-between mb-4 gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {selectedHouse.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        <LocationOnIcon className="w-4 h-4 inline mr-0.5" />
                        {getLocationInfo(selectedHouse)}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {selectedHouse.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-lg font-medium text-gray-700 flex-shrink-0">
                      <StarIcon className="w-5 h-5 text-yellow-400 fill-current" />
                      {selectedHouse.rating}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                      <AccessTimeIcon className="w-3 h-3 inline mr-0.5" />
                      {selectedHouse.minutesFromCampus}m from campus
                    </span>
                    <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                      <CalendarTodayIcon className="w-3 h-3 inline mr-0.5" />
                      Built {selectedHouse.yearBuilt}
                    </span>
                    <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                      <AttachMoneyIcon className="w-3 h-3 inline mr-0.5" />
                      {selectedHouse.priceRWF.toLocaleString()} RWF/month
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">{t.province}</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {selectedHouse.province}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">{t.district}</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {selectedHouse.district}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">{t.sector}</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {selectedHouse.sector}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">{t.cell}</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {selectedHouse.cell}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 col-span-2">
                      <p className="text-xs text-gray-500">{t.village}</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {selectedHouse.village}
                      </p>
                      {selectedHouse.code_vil_1 && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          Code: {selectedHouse.code_vil_1}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">{t.rooms}</p>
                      <p className="text-sm font-semibold text-gray-900">
                        <BedIcon className="w-4 h-4 inline mr-1" />
                        {selectedHouse.rooms}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">{t.bathrooms}</p>
                      <p className="text-sm font-semibold text-gray-900">
                        <BathroomIcon className="w-4 h-4 inline mr-1" />
                        {selectedHouse.bathrooms}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h4 className="font-semibold text-sm text-gray-900 mb-2">
                      <InfoIcon className="w-4 h-4 inline mr-1 text-[#FF385C]" />
                      {t.features}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedHouse.features?.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Owner section removed as requested */}

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h4 className="font-semibold text-sm text-gray-900 mb-2">
                      {t.amenities}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedHouse.amenities?.map((amenity) => {
                        let icon = (
                          <CheckCircleIcon className="w-4 h-4 text-[#FF385C]" />
                        );
                        if (amenity === "WiFi")
                          icon = <WifiIcon className="w-4 h-4 text-blue-500" />;
                        if (amenity === "Kitchen" || amenity === "Kitchenette")
                          icon = (
                            <KitchenIcon className="w-4 h-4 text-orange-500" />
                          );
                        if (amenity === "Parking")
                          icon = (
                            <LocalParkingIcon className="w-4 h-4 text-green-500" />
                          );
                        if (amenity === "Security")
                          icon = (
                            <SecurityIcon className="w-4 h-4 text-red-500" />
                          );
                        return (
                          <span
                            key={amenity}
                            className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700"
                          >
                            {icon}
                            {amenity}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          {t.price} ({t.priceInRWF})
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {selectedHouse.priceRWF.toLocaleString()} RWF
                          <span className="text-sm font-normal text-gray-500">
                            {" "}
                            {t.perNight}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          ${selectedHouse.price} USD • {selectedHouse.nights}{" "}
                          {t.nightsTotal}
                        </p>
                      </div>
                      {selectedHouse.bookingStatus === "available" && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOrderClick();
                          }}
                          className="bg-[#FF385C] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#E31C5F] transition-colors shadow-lg shadow-[#FF385C]/30 flex items-center gap-2"
                        >
                          <LoginIcon className="w-4 h-4" />
                          {t.orderNow}
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

      {/* ============================================================
          LOGIN REQUIRED MODAL (Simplified - no login/register forms)
          ============================================================ */}
      <AnimatePresence>
        {isLoginRequiredModalOpen && selectedHouse && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[350]"
              onClick={() => setIsLoginRequiredModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-4 z-[351] flex items-center justify-center"
            >
              <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden shadow-2xl">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{t.loginRequired}</h3>
                  <button
                    onClick={() => setIsLoginRequiredModalOpen(false)}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-[#FF385C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <LoginIcon className="w-10 h-10 text-[#FF385C]" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {t.loginRequired}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {t.loginToOrder}
                    </p>
                    <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">
                        <strong>{selectedHouse.name}</strong> •{" "}
                        {selectedHouse.priceRWF.toLocaleString()} RWF/month
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSaveOrder}
                      disabled={isSaving}
                      className="w-full py-3 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSaving ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {t.saving}
                        </>
                      ) : (
                        <>
                          <SaveIcon className="w-4 h-4" />
                          {t.save}
                        </>
                      )}
                    </motion.button>
                    <button
                      onClick={() => setIsLoginRequiredModalOpen(false)}
                      className="w-full py-2.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {t.done}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ============================================================
          LOCATION MODAL
          ============================================================ */}
      <AnimatePresence>
        {isLocationModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
              onClick={() => setIsLocationModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-4 z-[201] flex items-center justify-center"
            >
              <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden shadow-2xl">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{t.selectLocation}</h3>
                  <button
                    onClick={() => setIsLocationModalOpen(false)}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4 overflow-y-auto max-h-[calc(80vh-80px)]">
                  <div className="relative mb-4">
                    <LocationOnIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder={t.searchDestinations}
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF385C]"
                      autoFocus
                    />
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                      <SchoolIcon className="w-4 h-4 text-[#FF385C]" />
                      {t.popularLocations}
                    </h4>
                    <div className="max-h-40 overflow-y-auto space-y-1 border rounded-lg p-1">
                      {uniqueUniversities.length > 0 ? (
                        uniqueUniversities.map((uni) => (
                          <button
                            key={uni}
                            onClick={() => {
                              setSelectedUniversity(uni);
                              setSearchLocation(uni);
                              setSelectedDistrict("");
                              setIsLocationModalOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm"
                          >
                            <SchoolIcon className="w-4 h-4 text-[#FF385C]" />
                            <span>{uni}</span>
                          </button>
                        ))
                      ) : (
                        <p className="text-sm text-gray-400 px-3 py-2">
                          No universities found
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                      <LocationCityIcon className="w-4 h-4 text-[#FF385C]" />
                      {t.districtLabel || "Districts"}
                    </h4>
                    <div className="max-h-40 overflow-y-auto space-y-1 border rounded-lg p-1">
                      {uniqueDistricts.length > 0 ? (
                        uniqueDistricts.map((district) => (
                          <button
                            key={district}
                            onClick={() => {
                              setSelectedDistrict(district);
                              setSearchLocation(district);
                              setSelectedUniversity("");
                              setIsLocationModalOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm"
                          >
                            <LocationCityIcon className="w-4 h-4 text-[#FF385C]" />
                            <span>{district}</span>
                          </button>
                        ))
                      ) : (
                        <p className="text-sm text-gray-400 px-3 py-2">
                          No districts found
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ============================================================
          DATE PICKER MODAL
          ============================================================ */}
      <AnimatePresence>
        {isDatePickerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
              onClick={() => setIsDatePickerOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-4 z-[201] flex items-center justify-center"
            >
              <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
                <div className="p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold">{t.when}</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={clearDates}
                      className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {t.clear}
                    </button>
                    <button
                      onClick={() => setIsDatePickerOpen(false)}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <CloseIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-4 overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => changeMonth(-1)}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <ArrowBackIcon className="w-5 h-5" />
                    </button>
                    <h4 className="font-semibold">
                      {new Date(currentYear, currentMonth).toLocaleString(
                        "default",
                        { month: "long", year: "numeric" },
                      )}
                    </h4>
                    <button
                      onClick={() => changeMonth(1)}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <ArrowForwardIcon className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                      <div
                        key={day}
                        className="text-center text-xs font-medium text-gray-500 py-1"
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {renderCalendar()}
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between border-t border-gray-200 pt-4 gap-2">
                    <div className="flex flex-wrap gap-2">
                      {tempCheckIn && (
                        <span className="text-sm">
                          {t.checkIn}: {tempCheckIn.toLocaleDateString()}
                        </span>
                      )}
                      {tempCheckOut && (
                        <span className="text-sm">
                          {t.checkOut}: {tempCheckOut.toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={applyDates}
                      disabled={!tempCheckIn || !tempCheckOut}
                      className="px-4 py-2 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      {t.apply}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ============================================================
          GUEST MODAL
          ============================================================ */}
      <AnimatePresence>
        {isGuestModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
              onClick={() => setIsGuestModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-4 z-[201] flex items-center justify-center"
            >
              <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden shadow-2xl">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    <PeopleAltIcon className="w-5 h-5 inline mr-2 text-[#FF385C]" />
                    {t.guests}
                  </h3>
                  <button
                    onClick={() => setIsGuestModalOpen(false)}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <PeopleAltIcon className="w-5 h-5 text-gray-500" />
                      <span className="font-medium">
                        {t.students || "Students"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          setStudentCount(Math.max(1, studentCount - 1))
                        }
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <RemoveIcon className="w-4 h-4" />
                      </button>
                      <span className="w-6 text-center font-medium">
                        {studentCount}
                      </span>
                      <button
                        onClick={() => setStudentCount(studentCount + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <AddIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsGuestModalOpen(false);
                      toast.success(`👥 ${getStudentCount()}`);
                    }}
                    className="w-full py-3 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E31C5F] transition-colors"
                  >
                    {t.apply}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};